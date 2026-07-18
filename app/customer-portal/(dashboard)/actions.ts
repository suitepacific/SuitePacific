"use server";

import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import { getCustomerFromRequest } from "@/lib/customer-auth";
import { prisma } from "@/lib/prisma";

const VALID_TYPES = new Set(["SUPPORT", "DEVELOPMENT", "QUESTION", "OPTIMIZATION"]);
const VALID_PRIORITIES = new Set(["LOW", "NORMAL", "HIGH", "URGENT"]);
const VALID_PAYMENT_METHODS = new Set(["bank_transfer", "paypal", "wise", "check", ""]);

export async function submitTicketAction(_prev: unknown, formData: FormData) {
  const customer = await getCustomerFromRequest();
  if (!customer) redirect("/customer-portal/login");

  const title = (formData.get("title") as string)?.trim();
  const description = (formData.get("description") as string)?.trim();
  const type = (formData.get("type") as string)?.trim() || "SUPPORT";
  const priority = (formData.get("priority") as string)?.trim() || "NORMAL";

  if (!title) return { error: "Title is required." };
  if (title.length > 200) return { error: "Title is too long." };
  if (!description) return { error: "Please describe your request." };
  if (description.length > 10000) return { error: "Description is too long." };
  if (!VALID_TYPES.has(type)) return { error: "Invalid ticket type." };
  if (!VALID_PRIORITIES.has(priority)) return { error: "Invalid priority." };

  const ticket = await prisma.ticket.create({
    data: {
      customerId: customer.id,
      title,
      description,
      type: type as never,
      priority: priority as never,
    },
  });

  redirect(`/customer-portal/tickets/${ticket.id}`);
}

export async function addCustomerCommentAction(_prev: unknown, formData: FormData) {
  const customer = await getCustomerFromRequest();
  if (!customer) redirect("/customer-portal/login");

  const ticketId = (formData.get("ticketId") as string)?.trim();
  const body = (formData.get("body") as string)?.trim();

  if (!ticketId || ticketId.length > 100) return { error: "Invalid ticket." };
  if (!body) return { error: "Reply cannot be empty." };
  if (body.length > 10000) return { error: "Reply is too long." };

  const ticket = await prisma.ticket.findUnique({ where: { id: ticketId } });
  if (!ticket || ticket.customerId !== customer.id || ticket.archivedAt) return { error: "Ticket not found." };
  if (ticket.status === "CLOSED") return { error: "This ticket is closed." };

  await prisma.ticketComment.create({
    data: { ticketId, body, author: "customer", authorName: customer.name },
  });

  // If ticket was RESOLVED, reopen it to IN_PROGRESS when customer replies
  if (ticket.status === "RESOLVED" || ticket.status === "PENDING_CUSTOMER") {
    await prisma.ticket.update({
      where: { id: ticketId },
      data: { status: "IN_PROGRESS", updatedAt: new Date() },
    });
  } else {
    await prisma.ticket.update({
      where: { id: ticketId },
      data: { updatedAt: new Date() },
    });
  }

  revalidatePath(`/customer-portal/tickets/${ticketId}`);
  return { success: true };
}

function safeUrl(raw: string | null): string | null {
  if (!raw) return null;
  try {
    const p = new URL(raw);
    return p.protocol === "https:" || p.protocol === "http:" ? raw : null;
  } catch { return null; }
}

export async function updateCustomerProfileAction(_prev: unknown, formData: FormData) {
  const customer = await getCustomerFromRequest();
  if (!customer) redirect("/customer-portal/login");

  const websiteRaw = (formData.get("website") as string)?.trim().slice(0, 500) || null;
  const website = safeUrl(websiteRaw);
  if (websiteRaw && !website) return { error: "Website must be a valid http or https URL." };
  const country = (formData.get("country") as string)?.trim().slice(0, 100) || null;
  const timezone = (formData.get("timezone") as string)?.trim().slice(0, 100) || null;

  try {
    await prisma.customer.update({ where: { id: customer.id }, data: { website, country, timezone } });
    return { success: true };
  } catch {
    return { error: "Failed to update profile. Please try again." };
  }
}

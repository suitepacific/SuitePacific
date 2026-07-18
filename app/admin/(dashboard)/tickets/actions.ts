"use server";

import { revalidatePath } from "next/cache";
import { prisma } from "@/lib/prisma";
import { requireAdmin } from "@/lib/auth";

const VALID_STATUSES = new Set(["OPEN", "IN_PROGRESS", "PENDING_CUSTOMER", "RESOLVED", "CLOSED"]);
const VALID_PRIORITIES = new Set(["LOW", "NORMAL", "HIGH", "URGENT"]);
const VALID_TYPES = new Set(["SUPPORT", "DEVELOPMENT", "QUESTION", "OPTIMIZATION"]);

export async function updateTicketAction(_prev: unknown, formData: FormData) {
  await requireAdmin();

  const id = (formData.get("id") as string)?.trim();
  if (!id || id.length > 100) return { error: "Invalid ticket ID." };

  const status = (formData.get("status") as string)?.trim();
  const priority = (formData.get("priority") as string)?.trim();
  const type = (formData.get("type") as string)?.trim();
  const assignedTo = (formData.get("assignedTo") as string)?.trim().slice(0, 200) || null;
  const internalNotes = (formData.get("internalNotes") as string)?.trim().slice(0, 10000) || null;

  if (!VALID_STATUSES.has(status)) return { error: "Invalid status." };
  if (!VALID_PRIORITIES.has(priority)) return { error: "Invalid priority." };
  if (!VALID_TYPES.has(type)) return { error: "Invalid type." };

  const ticket = await prisma.ticket.findUnique({ where: { id }, select: { id: true } });
  if (!ticket) return { error: "Ticket not found." };

  await prisma.ticket.update({
    where: { id },
    data: { status: status as never, priority: priority as never, type: type as never, assignedTo, internalNotes, updatedAt: new Date() },
  });

  revalidatePath(`/admin/tickets/${id}`);
  revalidatePath("/admin/tickets");
  return { success: true };
}

export async function addAdminCommentAction(_prev: unknown, formData: FormData) {
  await requireAdmin();

  const ticketId = (formData.get("ticketId") as string)?.trim();
  const body = (formData.get("body") as string)?.trim();
  const isInternalRaw = formData.get("isInternal");
  const isInternal = isInternalRaw === "true" || isInternalRaw === "on";

  if (!ticketId || ticketId.length > 100) return { error: "Invalid ticket." };
  if (!body) return { error: "Comment cannot be empty." };
  if (body.length > 10000) return { error: "Comment is too long." };

  const ticket = await prisma.ticket.findUnique({ where: { id: ticketId } });
  if (!ticket) return { error: "Ticket not found." };

  await prisma.ticketComment.create({
    data: { ticketId, body, author: "admin", authorName: "SuitePacific", isInternal },
  });

  // If adding a public reply, update ticket's updatedAt
  if (!isInternal) {
    await prisma.ticket.update({ where: { id: ticketId }, data: { updatedAt: new Date() } });
  }

  revalidatePath(`/admin/tickets/${ticketId}`);
  return { success: true };
}

export async function archiveTicketAction(ticketId: string) {
  await requireAdmin();
  if (!ticketId || ticketId.length > 100) return;
  await prisma.ticket.update({ where: { id: ticketId }, data: { archivedAt: new Date(), status: "CLOSED" } });
  revalidatePath("/admin/tickets");
  revalidatePath(`/admin/tickets/${ticketId}`);
}

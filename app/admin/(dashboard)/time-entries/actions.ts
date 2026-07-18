"use server";

import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import { prisma } from "@/lib/prisma";
import { requireAdmin } from "@/lib/auth";

export async function logTimeEntryAction(_prev: unknown, formData: FormData) {
  await requireAdmin();

  const customerId = (formData.get("customerId") as string)?.trim();
  const ticketId = (formData.get("ticketId") as string)?.trim() || null;
  const dateRaw = (formData.get("date") as string)?.trim();
  const hoursRaw = (formData.get("hours") as string)?.trim();
  const description = (formData.get("description") as string)?.trim();
  const isBillable = formData.get("isBillable") !== "false";
  const hourlyRateRaw = (formData.get("hourlyRate") as string)?.trim();

  if (!customerId || customerId.length > 100) return { error: "Customer is required." };
  if (!dateRaw) return { error: "Date is required." };
  if (!hoursRaw) return { error: "Hours is required." };
  if (!description) return { error: "Description is required." };
  if (description.length > 1000) return { error: "Description is too long." };

  const hours = parseFloat(hoursRaw);
  if (isNaN(hours) || hours <= 0 || hours > 24) return { error: "Hours must be between 0 and 24." };

  const date = new Date(dateRaw);
  if (isNaN(date.getTime())) return { error: "Invalid date." };

  const hourlyRate = hourlyRateRaw ? parseFloat(hourlyRateRaw) : null;
  if (hourlyRate !== null && (isNaN(hourlyRate) || hourlyRate < 0)) return { error: "Invalid hourly rate." };

  const customer = await prisma.customer.findUnique({ where: { id: customerId } });
  if (!customer) return { error: "Customer not found." };

  if (ticketId) {
    const ticket = await prisma.ticket.findUnique({ where: { id: ticketId } });
    if (!ticket || ticket.customerId !== customerId) return { error: "Invalid ticket." };
  }

  await prisma.timeEntry.create({
    data: { customerId, ticketId, date, hours, description, isBillable, hourlyRate },
  });

  redirect(`/admin/customers/${customerId}`);
}

export async function deleteTimeEntryAction(id: string) {
  await requireAdmin();
  if (!id || id.length > 100) return;
  const entry = await prisma.timeEntry.findUnique({ where: { id }, include: { invoiceItem: true } });
  if (!entry || entry.invoiceItem) return; // can't delete if invoiced
  await prisma.timeEntry.delete({ where: { id } });
  revalidatePath(`/admin/customers/${entry.customerId}`);
  revalidatePath("/admin/time-entries");
}

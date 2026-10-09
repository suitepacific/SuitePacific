"use server";

import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import { prisma } from "@/lib/prisma";
import { requireAdmin } from "@/lib/auth";
import { nextInvoiceNumber, periodDateFilter } from "@/lib/invoice-utils";

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

  // Admin-logged entries are auto-approved
  await prisma.timeEntry.create({
    data: { customerId, ticketId, date, hours, description, isBillable, hourlyRate, status: "approved" },
  });

  redirect(`/admin/customers/${customerId}`);
}

export async function approveTimeEntryAction(id: string) {
  await requireAdmin();
  if (!id || id.length > 100) return;
  await prisma.timeEntry.update({ where: { id }, data: { status: "approved" } });
  revalidatePath("/admin/time-entries");
}

export async function rejectTimeEntryAction(id: string) {
  await requireAdmin();
  if (!id || id.length > 100) return;
  await prisma.timeEntry.update({ where: { id }, data: { status: "rejected" } });
  revalidatePath("/admin/time-entries");
}

export async function deleteTimeEntryAction(id: string) {
  await requireAdmin();
  if (!id || id.length > 100) return;
  const entry = await prisma.timeEntry.findUnique({ where: { id }, include: { invoiceItem: true } });
  if (!entry || entry.invoiceItem) return;
  await prisma.timeEntry.delete({ where: { id } });
  revalidatePath(`/admin/customers/${entry.customerId}`);
  revalidatePath("/admin/time-entries");
}

export async function generateInvoicesAction(formData: FormData) {
  await requireAdmin();

  const period = (formData.get("period") as string) || "all";
  const customerId = (formData.get("customerId") as string)?.trim() || null;

  const dateFilter = periodDateFilter(period);

  const entries = await prisma.timeEntry.findMany({
    where: {
      status: "approved",
      isBillable: true,
      invoiceItem: null,
      ...(customerId ? { customerId } : {}),
      ...(dateFilter ? { date: dateFilter } : {}),
    },
    include: {
      customer: { select: { id: true, company: true, hourlyRate: true, billingCurrency: true } },
    },
  });

  // Nothing to bill - redirect back
  if (entries.length === 0) redirect("/admin/time-entries");

  // Group by customer
  const byCustomer = new Map<string, typeof entries>();
  for (const e of entries) {
    const group = byCustomer.get(e.customerId) ?? [];
    group.push(e);
    byCustomer.set(e.customerId, group);
  }

  const issueDate = new Date();
  const dueDate = new Date(issueDate);
  dueDate.setDate(dueDate.getDate() + 30);

  for (const [custId, custEntries] of byCustomer) {
    const customer = custEntries[0].customer;
    const defaultRate = customer.hourlyRate ?? 0;
    const currency = customer.billingCurrency ?? "USD";

    const items = custEntries.map((e) => {
      const rate = e.hourlyRate ?? defaultRate;
      return {
        description: e.description,
        quantity: e.hours,
        unitPrice: rate,
        amount: Math.round(e.hours * rate * 100) / 100,
        timeEntryId: e.id,
      };
    });

    const subtotal = Math.round(items.reduce((s, i) => s + i.amount, 0) * 100) / 100;
    const invoiceNumber = await nextInvoiceNumber(customer.company);

    await prisma.invoice.create({
      data: {
        customerId: custId,
        invoiceNumber,
        status: "DRAFT",
        issueDate,
        dueDate,
        currency,
        subtotal,
        taxAmount: 0,
        taxPercent: 0,
        total: subtotal,
        items: { create: items },
      },
    });
  }

  redirect("/admin/invoices");
}

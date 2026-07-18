"use server";

import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import { prisma } from "@/lib/prisma";
import { requireAdmin } from "@/lib/auth";

const VALID_STATUSES = new Set(["DRAFT", "SENT", "PAID", "VOID"]);
const VALID_CURRENCIES = new Set(["USD", "AUD", "GBP", "EUR", "CAD", "NZD", "SGD", "INR"]);

function toCustomerCode(company: string): string {
  return company
    .toUpperCase()
    .replace(/[^A-Z]/g, "")
    .slice(0, 4)
    .padEnd(4, "X");
}

async function nextInvoiceNumber(company: string): Promise<string> {
  const year = new Date().getFullYear();
  const count = await prisma.invoice.count({
    where: {
      createdAt: {
        gte: new Date(`${year}-01-01T00:00:00.000Z`),
        lt: new Date(`${year + 1}-01-01T00:00:00.000Z`),
      },
    },
  });
  return `SP-${toCustomerCode(company)}-${year}-${String(count + 1).padStart(3, "0")}`;
}

export async function createInvoiceAction(_prev: unknown, formData: FormData) {
  await requireAdmin();

  const customerId = (formData.get("customerId") as string)?.trim();
  const issueDateRaw = (formData.get("issueDate") as string)?.trim();
  const dueDateRaw = (formData.get("dueDate") as string)?.trim() || null;
  const currency = (formData.get("currency") as string)?.trim() || "USD";
  const notes = (formData.get("notes") as string)?.trim().slice(0, 2000) || null;
  const taxPercentRaw = (formData.get("taxPercent") as string)?.trim() || "0";
  const itemsJson = (formData.get("itemsJson") as string)?.trim();
  const selectedTimeEntryIds: string[] = formData.getAll("timeEntryIds[]").map(String);

  if (!customerId) return { error: "Customer is required." };
  if (!issueDateRaw) return { error: "Issue date is required." };
  if (!VALID_CURRENCIES.has(currency)) return { error: "Invalid currency." };

  const issueDate = new Date(issueDateRaw);
  if (isNaN(issueDate.getTime())) return { error: "Invalid issue date." };

  const dueDate = dueDateRaw ? new Date(dueDateRaw) : null;
  if (dueDate && isNaN(dueDate.getTime())) return { error: "Invalid due date." };

  const taxPercent = parseFloat(taxPercentRaw);
  if (isNaN(taxPercent) || taxPercent < 0 || taxPercent > 100) return { error: "Tax percent must be 0–100." };

  const customer = await prisma.customer.findUnique({ where: { id: customerId } });
  if (!customer) return { error: "Customer not found." };

  // Parse manual line items from JSON
  let manualItems: { description: string; quantity: number; unitPrice: number }[] = [];
  if (itemsJson) {
    try {
      manualItems = JSON.parse(itemsJson);
      if (!Array.isArray(manualItems)) return { error: "Invalid line items." };
      for (const item of manualItems) {
        if (!item.description || typeof item.quantity !== "number" || typeof item.unitPrice !== "number") {
          return { error: "Each line item needs a description, quantity, and price." };
        }
        if (item.description.length > 500) return { error: "Line item description is too long." };
        if (item.quantity <= 0 || item.unitPrice < 0) return { error: "Invalid line item values." };
      }
    } catch {
      return { error: "Invalid line items format." };
    }
  }

  // Fetch selected time entries
  let timeEntries: { id: string; hours: number; hourlyRate: number | null; description: string }[] = [];
  if (selectedTimeEntryIds.length > 0) {
    const entries = await prisma.timeEntry.findMany({
      where: { id: { in: selectedTimeEntryIds }, customerId, invoiceItem: null, isBillable: true },
    });
    timeEntries = entries.map((e) => ({
      id: e.id,
      hours: e.hours,
      hourlyRate: e.hourlyRate ?? customer.hourlyRate,
      description: e.description,
    }));
  }

  if (timeEntries.length === 0 && manualItems.length === 0) {
    return { error: "Add at least one line item or select time entries to invoice." };
  }

  // Calculate totals
  const timeItemTotals = timeEntries.map((e) => ({
    description: e.description,
    quantity: e.hours,
    unitPrice: e.hourlyRate ?? 0,
    amount: e.hours * (e.hourlyRate ?? 0),
    timeEntryId: e.id,
  }));
  const manualItemTotals = manualItems.map((i) => ({
    description: i.description,
    quantity: i.quantity,
    unitPrice: i.unitPrice,
    amount: i.quantity * i.unitPrice,
    timeEntryId: null,
  }));

  const allItems = [...timeItemTotals, ...manualItemTotals];
  const subtotal = allItems.reduce((s, i) => s + i.amount, 0);
  const taxAmount = Math.round(subtotal * taxPercent) / 100;
  const total = subtotal + taxAmount;

  let invoiceNumber = await nextInvoiceNumber(customer.company);

  // Retry once on the rare duplicate-number race condition (unique constraint on invoiceNumber)
  let invoice;
  try {
    invoice = await prisma.invoice.create({
    data: {
      customerId,
      invoiceNumber,
      issueDate,
      dueDate,
      currency,
      notes,
      taxPercent,
      subtotal: Math.round(subtotal * 100) / 100,
      taxAmount: Math.round(taxAmount * 100) / 100,
      total: Math.round(total * 100) / 100,
      items: {
        create: allItems.map((i) => ({
          description: i.description,
          quantity: i.quantity,
          unitPrice: i.unitPrice,
          amount: Math.round(i.amount * 100) / 100,
          timeEntryId: i.timeEntryId,
        })),
      },
    },
    });
  } catch (e: unknown) {
    const code = (e as { code?: string })?.code;
    if (code === "P2002") {
      // Unique constraint on invoiceNumber — regenerate and retry once
      invoiceNumber = await nextInvoiceNumber(customer.company);
      invoice = await prisma.invoice.create({
        data: {
          customerId, invoiceNumber, issueDate, dueDate, currency, notes, taxPercent,
          subtotal: Math.round(subtotal * 100) / 100,
          taxAmount: Math.round(taxAmount * 100) / 100,
          total: Math.round(total * 100) / 100,
          items: { create: allItems.map((i) => ({ description: i.description, quantity: i.quantity, unitPrice: i.unitPrice, amount: Math.round(i.amount * 100) / 100, timeEntryId: i.timeEntryId })) },
        },
      });
    } else {
      throw e;
    }
  }

  redirect(`/admin/invoices/${invoice.id}`);
}

export async function updateInvoiceStatusAction(_prev: unknown, formData: FormData) {
  await requireAdmin();

  const id = (formData.get("id") as string)?.trim();
  const status = (formData.get("status") as string)?.trim();

  if (!id || id.length > 100) return { error: "Invalid invoice ID." };
  if (!VALID_STATUSES.has(status)) return { error: "Invalid status." };

  const inv = await prisma.invoice.findUnique({ where: { id }, select: { id: true } });
  if (!inv) return { error: "Invoice not found." };

  const data: Record<string, unknown> = { status };
  if (status === "PAID") data.paidAt = new Date();

  await prisma.invoice.update({ where: { id }, data });
  revalidatePath(`/admin/invoices/${id}`);
  revalidatePath("/admin/invoices");
  return { success: true };
}

export async function updateInvoiceNotesAction(_prev: unknown, formData: FormData) {
  await requireAdmin();
  const id = (formData.get("id") as string)?.trim();
  const notes = (formData.get("notes") as string)?.trim().slice(0, 2000) || null;
  const dueDate = (formData.get("dueDate") as string)?.trim() || null;

  if (!id || id.length > 100) return { error: "Missing invoice ID." };
  const inv2 = await prisma.invoice.findUnique({ where: { id }, select: { id: true } });
  if (!inv2) return { error: "Invoice not found." };
  await prisma.invoice.update({
    where: { id },
    data: { notes, dueDate: dueDate ? new Date(dueDate) : null },
  });
  revalidatePath(`/admin/invoices/${id}`);
  return { success: true };
}

import { prisma } from "@/lib/prisma";

function toCustomerCode(company: string): string {
  return company.toUpperCase().replace(/[^A-Z]/g, "").slice(0, 4).padEnd(4, "X");
}

export async function nextInvoiceNumber(company: string): Promise<string> {
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

const PAYMENT_TERMS_DAYS: Record<string, number> = {
  DUE_ON_RECEIPT: 0,
  NET7: 7,
  NET15: 15,
  NET30: 30,
  NET45: 45,
  NET60: 60,
};

export function dueDateFromTerms(from: Date, terms: string): Date {
  const days = PAYMENT_TERMS_DAYS[terms] ?? 30;
  const d = new Date(from);
  d.setDate(d.getDate() + days);
  return d;
}

export function periodDateFilter(period: string): { gte?: Date } | undefined {
  const now = new Date();
  if (period === "week") {
    const d = new Date(now);
    d.setDate(d.getDate() - d.getDay());
    d.setHours(0, 0, 0, 0);
    return { gte: d };
  }
  if (period === "month") {
    return { gte: new Date(now.getFullYear(), now.getMonth(), 1) };
  }
  return undefined;
}

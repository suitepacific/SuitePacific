import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";
import { verifySessionToken, ADMIN_SESSION_COOKIE } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

export async function GET(req: NextRequest) {
  const cookieStore = await cookies();
  const token = cookieStore.get(ADMIN_SESSION_COOKIE)?.value;
  const valid = await verifySessionToken(token);
  if (!valid) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const customerId = req.nextUrl.searchParams.get("customerId");
  if (!customerId) return NextResponse.json({ error: "Missing customerId" }, { status: 400 });

  const customer = await prisma.customer.findUnique({
    where: { id: customerId },
    select: {
      id: true, name: true, company: true,
      billingType: true, hourlyRate: true, monthlyRate: true, billingCurrency: true,
    },
  });
  if (!customer) return NextResponse.json({ error: "Not found" }, { status: 404 });

  const unbilledEntries = await prisma.timeEntry.findMany({
    where: { customerId, invoiceItem: null, isBillable: true },
    include: { ticket: { select: { title: true } } },
    orderBy: { date: "desc" },
  });

  return NextResponse.json({
    ...customer,
    unbilledEntries: unbilledEntries.map((e) => ({
      id: e.id,
      date: e.date.toISOString().split("T")[0],
      hours: e.hours,
      description: e.description,
      hourlyRate: e.hourlyRate,
      ticketTitle: e.ticket?.title ?? null,
    })),
  });
}

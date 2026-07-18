import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { verifySessionToken, ADMIN_SESSION_COOKIE } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

export async function GET() {
  const cookieStore = await cookies();
  const token = cookieStore.get(ADMIN_SESSION_COOKIE)?.value;
  const valid = await verifySessionToken(token);
  if (!valid) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const customers = await prisma.customer.findMany({
    where: { archivedAt: null, status: "active" },
    select: {
      id: true,
      name: true,
      company: true,
      hourlyRate: true,
      tickets: {
        where: { archivedAt: null, status: { notIn: ["CLOSED"] } },
        select: { id: true, title: true },
        orderBy: { updatedAt: "desc" },
        take: 50,
      },
    },
    orderBy: { company: "asc" },
  });

  return NextResponse.json(customers);
}

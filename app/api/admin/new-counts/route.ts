import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";
import { verifySessionToken, ADMIN_SESSION_COOKIE } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

export async function GET(req: NextRequest) {
  const cookieStore = await cookies();
  const token = cookieStore.get(ADMIN_SESSION_COOKIE)?.value;
  const valid = await verifySessionToken(token);
  if (!valid) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const { searchParams } = req.nextUrl;
  const leadsSince = new Date(Number(searchParams.get("leadsSince") ?? 0));
  const visitorsSince = new Date(Number(searchParams.get("visitorsSince") ?? 0));

  const [newLeads, newVisitors] = await Promise.all([
    prisma.leadSubmission.count({ where: { createdAt: { gt: leadsSince } } }),
    prisma.visitorSession.count({ where: { createdAt: { gt: visitorsSince } } }),
  ]);

  return NextResponse.json({ newLeads, newVisitors });
}

import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { prisma } from "@/lib/prisma";

export async function POST(request: NextRequest) {
  try {
    const { path, referrer } = await request.json();
    if (typeof path !== "string" || path.startsWith("/admin") || path.length > 500) {
      return NextResponse.json({ ok: true });
    }

    await prisma.pageView.create({
      data: {
        path: path.slice(0, 500),
        referrer: typeof referrer === "string" && referrer ? referrer.slice(0, 500) : null,
      },
    });
  } catch (error) {
    console.error("Failed to record page view:", error);
  }

  return NextResponse.json({ ok: true });
}

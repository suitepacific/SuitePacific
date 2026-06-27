import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { prisma } from "@/lib/prisma";

export async function POST(request: NextRequest) {
  try {
    const { path, referrer, durationMs, sectionsViewed, exitSection } = await request.json();

    if (typeof path !== "string" || path.startsWith("/admin") || typeof durationMs !== "number") {
      return NextResponse.json({ ok: true });
    }

    await prisma.visitorSession.create({
      data: {
        path,
        referrer: typeof referrer === "string" && referrer ? referrer : null,
        durationMs: Math.max(0, Math.round(durationMs)),
        sectionsViewed: JSON.stringify(Array.isArray(sectionsViewed) ? sectionsViewed : []),
        exitSection: typeof exitSection === "string" ? exitSection : null,
        city: request.headers.get("x-vercel-ip-city")
          ? decodeURIComponent(request.headers.get("x-vercel-ip-city")!)
          : null,
        region: request.headers.get("x-vercel-ip-country-region"),
        country: request.headers.get("x-vercel-ip-country"),
      },
    });
  } catch (error) {
    console.error("Failed to record visitor session:", error);
  }

  return NextResponse.json({ ok: true });
}

import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { prisma } from "@/lib/prisma";
import { resolveTrafficSource } from "@/lib/traffic-source";
import { SITE_URL } from "@/lib/content";

export async function POST(request: NextRequest) {
  try {
    const { path, referrer, durationMs, sectionsViewed, exitSection, utmSource, utmMedium, utmCampaign, gclid } =
      await request.json();

    if (typeof path !== "string" || path.startsWith("/admin") || typeof durationMs !== "number") {
      return NextResponse.json({ ok: true });
    }

    const cleanReferrer = typeof referrer === "string" && referrer ? referrer : null;
    const cleanUtmSource = typeof utmSource === "string" && utmSource ? utmSource : null;
    const cleanUtmMedium = typeof utmMedium === "string" && utmMedium ? utmMedium : null;
    const cleanUtmCampaign = typeof utmCampaign === "string" && utmCampaign ? utmCampaign : null;
    const cleanGclid = typeof gclid === "string" && gclid ? gclid : null;

    const source = resolveTrafficSource({
      referrer: cleanReferrer,
      utmSource: cleanUtmSource,
      utmMedium: cleanUtmMedium,
      gclid: cleanGclid,
      siteHostname: new URL(SITE_URL).hostname,
    });

    await prisma.visitorSession.create({
      data: {
        path,
        referrer: cleanReferrer,
        source,
        campaign: cleanUtmCampaign,
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

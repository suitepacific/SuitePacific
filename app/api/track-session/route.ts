import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { prisma } from "@/lib/prisma";
import { resolveTrafficSource } from "@/lib/traffic-source";
import { SITE_URL } from "@/lib/content";

export async function POST(request: NextRequest) {
  try {
    const { path, referrer, durationMs, sectionsViewed, exitSection, utmSource, utmMedium, utmCampaign, gclid } =
      await request.json();

    if (typeof path !== "string" || path.startsWith("/admin") || typeof durationMs !== "number" || path.length > 500) {
      return NextResponse.json({ ok: true });
    }

    const cleanReferrer = typeof referrer === "string" && referrer ? referrer.slice(0, 500) : null;
    const cleanUtmSource = typeof utmSource === "string" && utmSource ? utmSource.slice(0, 200) : null;
    const cleanUtmMedium = typeof utmMedium === "string" && utmMedium ? utmMedium.slice(0, 200) : null;
    const cleanUtmCampaign = typeof utmCampaign === "string" && utmCampaign ? utmCampaign.slice(0, 200) : null;
    const cleanGclid = typeof gclid === "string" && gclid ? gclid.slice(0, 200) : null;
    const cleanExitSection = typeof exitSection === "string" ? exitSection.slice(0, 200) : null;

    // Sanitize sections: cap array length and each element length
    const cleanSections = (Array.isArray(sectionsViewed) ? sectionsViewed : [])
      .slice(0, 30)
      .map((s: unknown) => (typeof s === "string" ? s.slice(0, 200) : ""))
      .filter(Boolean);

    const source = resolveTrafficSource({
      referrer: cleanReferrer,
      utmSource: cleanUtmSource,
      utmMedium: cleanUtmMedium,
      gclid: cleanGclid,
      siteHostname: new URL(SITE_URL).hostname,
    });

    await prisma.visitorSession.create({
      data: {
        path: path.slice(0, 500),
        referrer: cleanReferrer,
        source,
        campaign: cleanUtmCampaign,
        durationMs: Math.max(0, Math.min(Math.round(durationMs), 86400000)), // cap at 24h
        sectionsViewed: JSON.stringify(cleanSections),
        exitSection: cleanExitSection,
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

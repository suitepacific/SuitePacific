"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";

const UTM_STORAGE_KEY = "sp_first_touch";

function captureFirstTouch() {
  const params = new URLSearchParams(window.location.search);
  const utmSource = params.get("utm_source");
  const utmMedium = params.get("utm_medium");
  const utmCampaign = params.get("utm_campaign");
  const gclid = params.get("gclid");

  if (utmSource || gclid) {
    const firstTouch = { utmSource, utmMedium, utmCampaign, gclid };
    try {
      sessionStorage.setItem(UTM_STORAGE_KEY, JSON.stringify(firstTouch));
    } catch {
      // sessionStorage unavailable; ignore
    }
    return firstTouch;
  }

  try {
    const cached = sessionStorage.getItem(UTM_STORAGE_KEY);
    if (cached) return JSON.parse(cached);
  } catch {
    // sessionStorage unavailable; ignore
  }

  return { utmSource: null, utmMedium: null, utmCampaign: null, gclid: null };
}

export function SectionTracker() {
  const pathname = usePathname();

  useEffect(() => {
    const startedAt = Date.now();
    const firstTouch = captureFirstTouch();
    const viewedOrder: string[] = [];
    const visible = new Set<string>();
    let exitSection: string | null = null;

    const sections = Array.from(document.querySelectorAll<HTMLElement>("[data-section]"));

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          const id = (entry.target as HTMLElement).dataset.section ?? entry.target.id;
          if (entry.isIntersecting) {
            visible.add(id);
            if (!viewedOrder.includes(id)) viewedOrder.push(id);
            exitSection = id;
          } else {
            visible.delete(id);
          }
        }
      },
      { threshold: 0.4 }
    );

    sections.forEach((section) => observer.observe(section));

    let sent = false;
    const send = () => {
      if (sent) return;
      sent = true;
      const payload = JSON.stringify({
        path: pathname,
        referrer: document.referrer || null,
        durationMs: Date.now() - startedAt,
        sectionsViewed: viewedOrder,
        exitSection,
        ...firstTouch,
      });
      const blob = new Blob([payload], { type: "application/json" });
      const queued = navigator.sendBeacon?.("/api/track-session", blob) ?? false;
      if (!queued) {
        fetch("/api/track-session", {
          method: "POST",
          body: payload,
          headers: { "Content-Type": "application/json" },
          keepalive: true,
        }).catch(() => {});
      }
    };

    const onVisibilityChange = () => {
      if (document.visibilityState === "hidden") send();
    };
    document.addEventListener("visibilitychange", onVisibilityChange);
    window.addEventListener("pagehide", send);

    return () => {
      observer.disconnect();
      document.removeEventListener("visibilitychange", onVisibilityChange);
      window.removeEventListener("pagehide", send);
    };
  }, [pathname]);

  return null;
}

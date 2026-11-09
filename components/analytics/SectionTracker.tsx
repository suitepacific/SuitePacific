"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";

type FirstTouch = { utmSource: string | null; utmMedium: string | null; utmCampaign: string | null; gclid: string | null };

// Kept in memory, not browser storage, so first-party analytics writes nothing to the visitor's device.
// It survives client-side navigation within a visit and resets on a full page load.
let firstTouchMemo: FirstTouch | null = null;

function captureFirstTouch(): FirstTouch {
  const params = new URLSearchParams(window.location.search);
  const utmSource = params.get("utm_source");
  const gclid = params.get("gclid");
  if (utmSource || gclid) {
    firstTouchMemo = { utmSource, utmMedium: params.get("utm_medium"), utmCampaign: params.get("utm_campaign"), gclid };
  }
  return firstTouchMemo ?? { utmSource: null, utmMedium: null, utmCampaign: null, gclid: null };
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
      const durationMs = Date.now() - startedAt;
      // Discard sessions under 5 seconds - these are back-navigations or prefetch artifacts
      if (durationMs < 5000) return;
      const payload = JSON.stringify({
        path: pathname,
        referrer: document.referrer || null,
        durationMs,
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

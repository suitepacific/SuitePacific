"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";

export function SectionTracker() {
  const pathname = usePathname();

  useEffect(() => {
    const startedAt = Date.now();
    const viewedOrder: string[] = [];
    const visible = new Set<string>();
    let exitSection: string | null = null;

    const sections = Array.from(document.querySelectorAll<HTMLElement>("section[id]"));
    if (sections.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          const id = entry.target.id;
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
      });
      navigator.sendBeacon?.("/api/track-session", payload);
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

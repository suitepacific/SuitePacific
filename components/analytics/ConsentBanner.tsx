"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { CONSENT_REGIONS, CONSENT_STORAGE_KEY, OPEN_CONSENT_EVENT } from "@/lib/consent";

type Gtag = (...args: unknown[]) => void;
const SIGNALS = ["ad_storage", "ad_user_data", "ad_personalization", "analytics_storage"];

function readChoice(): string | null {
  try {
    return localStorage.getItem(CONSENT_STORAGE_KEY);
  } catch {
    return null;
  }
}

function applyChoice(choice: "granted" | "denied") {
  try {
    localStorage.setItem(CONSENT_STORAGE_KEY, choice);
  } catch {
    // Storage blocked: the choice still applies for this page view
  }
  const gtag = (window as unknown as { gtag?: Gtag }).gtag;
  if (typeof gtag === "function") {
    gtag("consent", "update", Object.fromEntries(SIGNALS.map((s) => [s, choice])));
  }
}

export function ConsentBanner() {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const reopen = () => setOpen(true);
    window.addEventListener(OPEN_CONSENT_EVENT, reopen);

    if (!readChoice()) {
      fetch("/api/geo", { cache: "no-store" })
        .then((r) => r.json())
        .then(({ country }: { country: string | null }) => {
          if (country && CONSENT_REGIONS.includes(country)) setOpen(true);
        })
        .catch(() => {});
    }
    return () => window.removeEventListener(OPEN_CONSENT_EVENT, reopen);
  }, []);

  if (!open) return null;

  const choose = (choice: "granted" | "denied") => {
    applyChoice(choice);
    setOpen(false);
  };

  return (
    <div
      role="dialog"
      aria-label="Cookie preferences"
      className="fixed inset-x-0 bottom-0 z-50 border-t border-brand-100 bg-white px-4 py-4 shadow-soft sm:px-6"
    >
      <div className="mx-auto flex max-w-5xl flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <p className="text-sm text-brand-600">
          We use Google Analytics and Google Ads cookies to measure visits and ad performance, only if you agree.{" "}
          <Link href="/privacy" className="text-accent underline">
            Privacy policy
          </Link>
        </p>
        <div className="flex shrink-0 gap-2">
          <button
            type="button"
            onClick={() => choose("denied")}
            className="rounded-full border border-brand-200 px-4 py-2 text-sm font-medium text-brand-900 hover:bg-brand-50"
          >
            Reject
          </button>
          <button
            type="button"
            onClick={() => choose("granted")}
            className="rounded-full bg-brand px-4 py-2 text-sm font-medium text-white hover:bg-brand-700"
          >
            Accept
          </button>
        </div>
      </div>
    </div>
  );
}

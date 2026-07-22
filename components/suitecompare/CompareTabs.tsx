"use client";

import Link from "next/link";
import { useSearchParams } from "next/navigation";

const TABS = [
  { id: "code", label: "Code" },
  { id: "deployments", label: "Deployments" },
] as const;

export function CompareTabs({ activeTab }: { activeTab: string }) {
  const sp = useSearchParams();

  function tabHref(tab: string) {
    const params = new URLSearchParams(sp.toString());
    params.set("tab", tab);
    return `?${params.toString()}`;
  }

  return (
    <div className="flex gap-1 mb-4 border-b border-brand-100">
      {TABS.map((t) => (
        <Link
          key={t.id}
          href={tabHref(t.id)}
          className={`px-4 py-2 text-sm font-medium transition-colors border-b-2 -mb-px ${
            activeTab === t.id
              ? "border-accent text-accent"
              : "border-transparent text-brand-400 hover:text-brand-700"
          }`}
        >
          {t.label}
        </Link>
      ))}
    </div>
  );
}

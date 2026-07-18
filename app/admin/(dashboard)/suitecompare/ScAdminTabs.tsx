"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const TABS = [
  { label: "Overview", href: "/admin/suitecompare" },
  { label: "Users", href: "/admin/suitecompare/users" },
  { label: "Invites", href: "/admin/suitecompare/invites" },
  { label: "Attention", href: "/admin/suitecompare/attention" },
  { label: "Activity", href: "/admin/suitecompare/activity" },
];

export function ScAdminTabs() {
  const pathname = usePathname();

  return (
    <div className="flex items-center gap-1 border-b border-brand-50 -mx-1">
      {TABS.map((tab) => {
        const active =
          tab.href === "/admin/suitecompare"
            ? pathname === "/admin/suitecompare"
            : pathname.startsWith(tab.href);
        return (
          <Link
            key={tab.href}
            href={tab.href}
            className={`px-3 py-2.5 text-sm font-medium border-b-2 transition-colors whitespace-nowrap ${
              active
                ? "border-accent text-accent"
                : "border-transparent text-brand-400 hover:text-brand-700"
            }`}
          >
            {tab.label}
          </Link>
        );
      })}
    </div>
  );
}

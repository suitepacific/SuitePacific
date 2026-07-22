"use client";

import { usePathname } from "next/navigation";
import Link from "next/link";

const TABS = [
  { label: "Team", href: "/suitecompare/settings/team" },
  { label: "Account", href: "/suitecompare/settings/account" },
];

export default function SettingsLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  return (
    <div className="max-w-2xl">
      <div className="mb-6">
        <h1 className="text-2xl font-semibold text-brand-900">Settings</h1>
        <p className="mt-1 text-sm text-brand-400">Manage your team and account preferences.</p>
      </div>

      <div className="flex gap-1 border-b border-brand-100 mb-6">
        {TABS.map(({ label, href }) => {
          const active = pathname.startsWith(href);
          return (
            <Link
              key={href}
              href={href}
              className={`px-4 py-2 text-sm font-medium border-b-2 -mb-px transition-colors ${
                active
                  ? "border-accent text-accent"
                  : "border-transparent text-brand-400 hover:text-brand-700"
              }`}
            >
              {label}
            </Link>
          );
        })}
      </div>

      {children}
    </div>
  );
}

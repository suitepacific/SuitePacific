"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { LayoutDashboard, ListChecks, PlusCircle, LogOut } from "lucide-react";
import { logoutAction } from "@/app/partner-portal/actions";

const NAV = [
  { label: "Dashboard", href: "/partner-portal/dashboard", icon: LayoutDashboard },
  { label: "My Referrals", href: "/partner-portal/referrals", icon: ListChecks },
  { label: "Submit a Referral", href: "/partner-portal/referrals/new", icon: PlusCircle },
];

export function PortalSidebar({ partnerName }: { partnerName: string }) {
  const pathname = usePathname();

  return (
    <aside className="w-56 shrink-0 border-r border-brand-100 bg-white min-h-screen flex flex-col">
      <div className="px-5 py-5 border-b border-brand-100">
        <p className="text-xs font-semibold uppercase tracking-widest text-accent mb-0.5">Partner Portal</p>
        <p className="text-sm font-medium text-brand-900 truncate">{partnerName}</p>
      </div>

      <nav className="flex-1 px-3 py-4 space-y-0.5">
        {NAV.map(({ label, href, icon: Icon }) => {
          const active = pathname === href || (href !== "/partner-portal/dashboard" && pathname.startsWith(href));
          return (
            <Link
              key={href}
              href={href}
              className={`flex items-center gap-2.5 px-3 py-2 rounded-lg text-sm transition-colors ${
                active
                  ? "bg-accent/10 text-accent font-medium"
                  : "text-brand-500 hover:bg-brand-50 hover:text-brand-900"
              }`}
            >
              <Icon className="h-4 w-4 shrink-0" />
              {label}
            </Link>
          );
        })}
      </nav>

      <div className="px-3 pb-5">
        <form action={logoutAction}>
          <button
            type="submit"
            className="flex items-center gap-2.5 px-3 py-2 rounded-lg text-sm text-brand-400 hover:text-brand-900 hover:bg-brand-50 transition-colors w-full"
          >
            <LogOut className="h-4 w-4 shrink-0" />
            Sign Out
          </button>
        </form>
      </div>
    </aside>
  );
}

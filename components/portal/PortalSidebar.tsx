"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { LayoutDashboard, ListChecks, PlusCircle, LogOut, Menu, X, UserCircle } from "lucide-react";
import { logoutAction } from "@/app/partner-portal/actions";

const NAV = [
  { label: "Dashboard", href: "/partner-portal/dashboard", icon: LayoutDashboard, exact: true },
  { label: "My Referrals", href: "/partner-portal/referrals", icon: ListChecks, exact: false },
  { label: "Submit a Referral", href: "/partner-portal/referrals/new", icon: PlusCircle, exact: true },
  { label: "My Profile", href: "/partner-portal/profile", icon: UserCircle, exact: true },
];

export function PortalSidebar({ partnerName }: { partnerName: string }) {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  const SidebarContent = () => (
    <>
      <div className="px-5 py-5 border-b border-brand-100 flex items-center justify-between">
        <div>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/SuitePacificLogo-cropped.PNG" alt="SuitePacific" className="h-12 w-auto object-contain mb-2" />
          <p className="text-xs font-semibold uppercase tracking-widest text-accent mb-0.5">
            Partner Portal
          </p>
          <p className="text-sm font-medium text-brand-900 truncate max-w-[140px]">{partnerName}</p>
        </div>
        <button
          onClick={() => setOpen(false)}
          className="md:hidden p-1 text-brand-400 hover:text-brand-900 rounded-lg"
          aria-label="Close menu"
        >
          <X className="h-4 w-4" />
        </button>
      </div>

      <nav className="flex-1 px-3 py-4 space-y-0.5">
        {NAV.map(({ label, href, icon: Icon, exact }) => {
          const active = exact
            ? pathname === href
            : pathname.startsWith(href) && href !== "/partner-portal/referrals/new";
          return (
            <Link
              key={href}
              href={href}
              onClick={() => setOpen(false)}
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
    </>
  );

  return (
    <>
      {/* Mobile top bar */}
      <div className="md:hidden fixed top-0 inset-x-0 z-30 h-14 bg-white border-b border-brand-100 flex items-center justify-between px-4">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src="/SuitePacificLogo-cropped.PNG" alt="SuitePacific" className="h-9 w-auto object-contain" />
        <button
          onClick={() => setOpen(true)}
          className="p-2 -mr-2 text-brand-400 hover:text-brand-900 rounded-lg"
          aria-label="Open menu"
        >
          <Menu className="h-5 w-5" />
        </button>
      </div>

      {/* Backdrop */}
      {open && (
        <div
          className="md:hidden fixed inset-0 z-40 bg-black/40"
          onClick={() => setOpen(false)}
          aria-hidden="true"
        />
      )}

      {/* Sidebar */}
      <aside
        className={[
          "fixed inset-y-0 left-0 z-50 w-56 shrink-0 border-r border-brand-100 bg-white flex flex-col",
          "transition-transform duration-200 ease-in-out",
          "md:static md:translate-x-0 md:transition-none",
          open ? "translate-x-0" : "-translate-x-full",
        ].join(" ")}
      >
        <SidebarContent />
      </aside>
    </>
  );
}

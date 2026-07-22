"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { LayoutDashboard, Building2, GitCompare, LogOut, Menu, X, HelpCircle, Loader2, Settings } from "lucide-react";
import { logoutScAction } from "@/app/suitecompare/actions";

const NAV = [
  { label: "Dashboard", href: "/suitecompare/dashboard", icon: LayoutDashboard, exact: true },
  { label: "Clients", href: "/suitecompare/accounts", icon: Building2, exact: false },
  { label: "Help", href: "/suitecompare/help", icon: HelpCircle, exact: false },
  { label: "Settings", href: "/suitecompare/settings/team", icon: Settings, exact: false },
];

export function ScSidebar({ userName, userEmail }: { userName: string; userEmail: string }) {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [pendingHref, setPendingHref] = useState<string | null>(null);

  // Clear pending spinner once navigation completes
  useEffect(() => {
    setPendingHref(null);
  }, [pathname]);

  function handleNavClick(href: string) {
    if (href !== pathname) setPendingHref(href);
    setOpen(false);
  }

  const navLinks = (
    <nav className="flex-1 px-3 py-4 space-y-0.5">
      {NAV.map(({ label, href, icon: Icon, exact }) => {
        const active = exact ? pathname === href : pathname.startsWith(href);
        const loading = pendingHref === href;
        return (
          <Link
            key={href}
            href={href}
            onClick={() => handleNavClick(href)}
            className={`w-full flex items-center gap-2.5 px-3 py-2 rounded-lg text-sm transition-colors ${
              active
                ? "bg-accent/10 text-accent font-medium"
                : "text-brand-500 hover:bg-brand-50 hover:text-brand-900"
            }`}
          >
            {loading ? (
              <Loader2 className="h-4 w-4 shrink-0 animate-spin" />
            ) : (
              <Icon className="h-4 w-4 shrink-0" />
            )}
            {label}
          </Link>
        );
      })}
    </nav>
  );

  const logo = (
    <div className="px-5 py-5 border-b border-brand-100 flex items-center justify-between">
      <div className="flex items-center gap-2.5">
        <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-accent/10">
          <GitCompare className="h-4 w-4 text-accent" />
        </div>
        <div>
          <p className="text-sm font-semibold text-brand-900 leading-none">SuiteCompare</p>
          <p className="text-xs text-brand-400 mt-0.5">by SuitePacific</p>
        </div>
      </div>
      <button
        onClick={() => setOpen(false)}
        className="md:hidden p-1 text-brand-400 hover:text-brand-900 rounded-lg"
        aria-label="Close menu"
      >
        <X className="h-4 w-4" />
      </button>
    </div>
  );

  const footer = (
    <div className="px-3 pb-5 space-y-0.5">
      {/* User identity */}
      {userName && (
        <Link
          href="/suitecompare/settings/account"
          onClick={() => { handleNavClick("/suitecompare/settings/account"); }}
          className="flex items-center gap-2.5 px-3 py-2 rounded-lg hover:bg-brand-50 transition-colors group"
        >
          <div className="flex h-7 w-7 items-center justify-center rounded-full bg-accent/10 shrink-0 text-xs font-semibold text-accent">
            {userName.charAt(0).toUpperCase()}
          </div>
          <div className="min-w-0">
            <p className="text-xs font-medium text-brand-900 truncate">{userName}</p>
            <p className="text-xs text-brand-400 truncate">{userEmail}</p>
          </div>
        </Link>
      )}

      <form action={logoutScAction}>
        <button
          type="submit"
          className="flex items-center gap-2.5 px-3 py-2 rounded-lg text-sm text-brand-400 hover:text-brand-900 hover:bg-brand-50 transition-colors w-full"
        >
          <LogOut className="h-4 w-4 shrink-0" />
          Sign Out
        </button>
      </form>
    </div>
  );

  return (
    <>
      {/* Mobile top bar */}
      <div className="md:hidden fixed top-0 inset-x-0 z-30 h-14 bg-white border-b border-brand-100 flex items-center justify-between px-4">
        <div className="flex items-center gap-2">
          <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-accent/10">
            <GitCompare className="h-3.5 w-3.5 text-accent" />
          </div>
          <span className="text-sm font-semibold text-brand-900">SuiteCompare</span>
        </div>
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
          "md:sticky md:top-0 md:h-screen md:translate-x-0 md:transition-none",
          open ? "translate-x-0" : "-translate-x-full",
        ].join(" ")}
      >
        {logo}
        {navLinks}
        {footer}
      </aside>
    </>
  );
}

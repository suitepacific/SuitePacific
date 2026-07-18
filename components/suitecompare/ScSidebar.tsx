"use client";

import { useState, useEffect, useTransition } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { LayoutDashboard, Building2, GitCompare, LogOut, Menu, X, ExternalLink, Loader2 } from "lucide-react";
import { logoutScAction } from "@/app/suitecompare/actions";

const NAV = [
  { label: "Dashboard", href: "/suitecompare/dashboard", icon: LayoutDashboard, exact: true },
  { label: "Clients", href: "/suitecompare/accounts", icon: Building2, exact: false },
];

export function ScSidebar() {
  const pathname = usePathname();
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const [isPending, startTransition] = useTransition();
  const [pendingHref, setPendingHref] = useState<string | null>(null);

  // Clear pending state once pathname actually changes
  useEffect(() => {
    setPendingHref(null);
  }, [pathname]);

  function navigate(href: string) {
    if (href === pathname) return;
    setPendingHref(href);
    startTransition(() => {
      router.push(href);
    });
  }

  const SidebarContent = () => (
    <>
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

      <nav className="flex-1 px-3 py-4 space-y-0.5">
        {NAV.map(({ label, href, icon: Icon, exact }) => {
          const active = exact ? pathname === href : pathname.startsWith(href);
          const loading = pendingHref === href && isPending;
          return (
            <button
              key={href}
              onClick={() => { navigate(href); setOpen(false); }}
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
            </button>
          );
        })}
      </nav>

      <div className="px-3 pb-5 space-y-0.5">
        <Link
          href="/"
          onClick={() => setOpen(false)}
          className="flex items-center gap-2.5 px-3 py-2 rounded-lg text-sm text-brand-400 hover:text-brand-900 hover:bg-brand-50 transition-colors"
        >
          <ExternalLink className="h-4 w-4 shrink-0" />
          SuitePacific.com
        </Link>
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
    </>
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
        <SidebarContent />
      </aside>
    </>
  );
}

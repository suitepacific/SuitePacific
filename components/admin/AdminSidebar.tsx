"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  FileText,
  Users,
  MapPin,
  LogOut,
  ExternalLink,
  Handshake,
  Send,
  Menu,
  X,
} from "lucide-react";
import { logoutAction } from "@/app/admin/actions";

const LINKS = [
  { href: "/admin", label: "Dashboard", icon: LayoutDashboard, exact: true },
  { href: "/admin/posts", label: "Posts", icon: FileText, exact: false },
  { href: "/admin/leads", label: "Leads", icon: Users, exact: false },
  { href: "/admin/visitors", label: "Visitors", icon: MapPin, exact: false },
  { href: "/admin/partners", label: "Partners", icon: Handshake, exact: false },
  { href: "/admin/referrals", label: "Referrals", icon: Send, exact: false },
];

export function AdminSidebar() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  const SidebarContent = () => (
    <>
      <div className="p-6 flex items-center justify-between">
        <div>
          <span className="font-semibold text-brand-900">SuitePacific</span>
          <span className="block text-xs text-brand-300 mt-0.5">Admin</span>
        </div>
        <button
          onClick={() => setOpen(false)}
          className="md:hidden p-1 text-brand-400 hover:text-brand-900 rounded-lg"
          aria-label="Close menu"
        >
          <X className="h-4 w-4" />
        </button>
      </div>

      <nav className="flex-1 px-3 space-y-1">
        {LINKS.map((link) => {
          const active = link.exact ? pathname === link.href : pathname.startsWith(link.href);
          return (
            <Link
              key={link.href}
              href={link.href}
              onClick={() => setOpen(false)}
              className={`flex items-center gap-2.5 rounded-lg px-3 py-2 text-sm font-medium transition-colors ${
                active
                  ? "bg-brand-50 text-brand-900"
                  : "text-brand-400 hover:bg-brand-50/60 hover:text-brand-700"
              }`}
            >
              <link.icon className="h-4 w-4 shrink-0" />
              {link.label}
            </Link>
          );
        })}
      </nav>

      <div className="p-3 border-t border-brand-50 space-y-1">
        <Link
          href="/"
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-2.5 rounded-lg px-3 py-2 text-sm font-medium text-brand-400 hover:bg-brand-50/60 hover:text-brand-700 transition-colors"
        >
          <ExternalLink className="h-4 w-4 shrink-0" />
          View site
        </Link>
        <form action={logoutAction}>
          <button
            type="submit"
            className="w-full flex items-center gap-2.5 rounded-lg px-3 py-2 text-sm font-medium text-brand-400 hover:bg-red-50 hover:text-red-600 transition-colors"
          >
            <LogOut className="h-4 w-4 shrink-0" />
            Log out
          </button>
        </form>
      </div>
    </>
  );

  return (
    <>
      {/* Mobile top bar */}
      <div className="md:hidden fixed top-0 inset-x-0 z-30 h-14 bg-white border-b border-brand-50 flex items-center justify-between px-4">
        <span className="font-semibold text-sm text-brand-900">SuitePacific Admin</span>
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

      {/* Sidebar — fixed overlay on mobile, static flex child on desktop */}
      <aside
        className={[
          "fixed inset-y-0 left-0 z-50 w-60 bg-white border-r border-brand-50 flex flex-col",
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

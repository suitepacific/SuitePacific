"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { LayoutDashboard, FileText, Users, MapPin, LogOut, ExternalLink, Handshake, Send } from "lucide-react";
import { logoutAction } from "@/app/admin/actions";

const LINKS = [
  { href: "/admin", label: "Dashboard", icon: LayoutDashboard },
  { href: "/admin/posts", label: "Posts", icon: FileText },
  { href: "/admin/leads", label: "Leads", icon: Users },
  { href: "/admin/visitors", label: "Visitors", icon: MapPin },
  { href: "/admin/partners", label: "Partners", icon: Handshake },
  { href: "/admin/referrals", label: "Referrals", icon: Send },
];

export function AdminSidebar() {
  const pathname = usePathname();

  return (
    <aside className="w-60 shrink-0 bg-white border-r border-brand-50 min-h-screen flex flex-col">
      <div className="p-6">
        <span className="font-semibold text-brand-900">SuitePacific</span>
        <span className="block text-xs text-brand-300 mt-0.5">Admin</span>
      </div>

      <nav className="flex-1 px-3 space-y-1">
        {LINKS.map((link) => {
          const active = pathname === link.href;
          return (
            <Link
              key={link.href}
              href={link.href}
              className={`flex items-center gap-2.5 rounded-lg px-3 py-2 text-sm font-medium transition-colors ${
                active ? "bg-brand-50 text-brand-900" : "text-brand-400 hover:bg-brand-50/60 hover:text-brand-700"
              }`}
            >
              <link.icon className="h-4 w-4" />
              {link.label}
            </Link>
          );
        })}
      </nav>

      <div className="p-3 border-t border-brand-50 space-y-1">
        <Link
          href="/"
          target="_blank"
          className="flex items-center gap-2.5 rounded-lg px-3 py-2 text-sm font-medium text-brand-400 hover:bg-brand-50/60 hover:text-brand-700 transition-colors"
        >
          <ExternalLink className="h-4 w-4" />
          View site
        </Link>
        <form action={logoutAction}>
          <button
            type="submit"
            className="w-full flex items-center gap-2.5 rounded-lg px-3 py-2 text-sm font-medium text-brand-400 hover:bg-red-50 hover:text-red-600 transition-colors"
          >
            <LogOut className="h-4 w-4" />
            Log out
          </button>
        </form>
      </div>
    </aside>
  );
}

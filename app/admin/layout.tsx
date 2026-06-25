import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Admin",
  robots: { index: false, follow: false },
};

// Admin pages are per-request (auth + live DB data) and must never be
// statically prerendered at build time; a cached/prerendered page would
// otherwise carry stale server action references.
export const dynamic = "force-dynamic";

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return <div className="min-h-screen bg-brand-50/40">{children}</div>;
}

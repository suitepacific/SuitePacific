import type { Metadata } from "next";
import Link from "next/link";
import { getScUserFromRequest } from "@/lib/sc-auth";
import { logoutScAction } from "@/app/suitecompare/actions";
import { ShieldCheck, LogOut } from "lucide-react";

export const metadata: Metadata = {
  title: { absolute: "Import Doctor | SuitePacific" },
  robots: { index: false, follow: false },
};

export default async function ImportDetectorLayout({ children }: { children: React.ReactNode }) {
  const user = await getScUserFromRequest();

  return (
    <div className="min-h-screen bg-brand-50/40">
      <header className="border-b border-brand-100 bg-white">
        <div className="mx-auto flex max-w-3xl items-center justify-between gap-4 px-4 py-4 sm:px-6 lg:px-8">
          <Link href="/importDetector" className="flex items-center gap-2">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-accent/10">
              <ShieldCheck className="h-4.5 w-4.5 text-accent" />
            </div>
            <span className="font-semibold text-brand-900">Import Doctor</span>
          </Link>
          {user && (
            <div className="flex items-center gap-3 text-sm text-brand-400">
              <span className="hidden sm:inline">{user.email}</span>
              <Link
                href="/suitecompare/accounts"
                className="hidden sm:inline hover:text-accent transition-colors"
              >
                Accounts
              </Link>
              <form action={logoutScAction}>
                <button
                  type="submit"
                  className="flex items-center gap-1 hover:text-accent transition-colors"
                  title="Log out"
                >
                  <LogOut className="h-4 w-4" />
                  <span className="hidden sm:inline">Log out</span>
                </button>
              </form>
            </div>
          )}
        </div>
      </header>
      <main className="mx-auto max-w-3xl px-4 py-8 sm:px-6 sm:py-12 lg:px-8">{children}</main>
    </div>
  );
}

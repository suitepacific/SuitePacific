import type { Metadata } from "next";
import { ScSidebar } from "@/components/suitecompare/ScSidebar";

export const metadata: Metadata = {
  robots: { index: false, follow: false },
};

export default function SuiteCompareDashboardLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex min-h-screen bg-brand-50/40">
      <ScSidebar />
      <main className="flex-1 min-w-0 p-4 md:p-8 mt-14 md:mt-0">
        {children}
      </main>
    </div>
  );
}

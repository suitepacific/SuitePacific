import type { Metadata } from "next";
import { ScSidebar } from "@/components/suitecompare/ScSidebar";
import { getScUserFromRequest } from "@/lib/sc-auth";
import { prisma } from "@/lib/prisma";
import { AlertTriangle } from "lucide-react";

export const metadata: Metadata = {
  robots: { index: false, follow: false },
};

export default async function SuiteCompareDashboardLayout({ children }: { children: React.ReactNode }) {
  const user = await getScUserFromRequest();

  let billingStatus = "active";

  if (user) {
    const membership = await prisma.scOrgMember.findFirst({
      where: { userId: user.id },
      select: { org: { select: { billingStatus: true } } },
    });
    billingStatus = membership?.org.billingStatus ?? "active";
  }

  if (billingStatus === "suspended") {
    return (
      <div className="min-h-screen bg-brand-50/40 flex items-center justify-center px-4">
        <div className="max-w-sm w-full text-center bg-white rounded-2xl border border-brand-100 shadow-soft p-10">
          <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-red-50">
            <AlertTriangle className="h-6 w-6 text-red-500" />
          </div>
          <h1 className="text-lg font-semibold text-brand-900 mb-2">Account suspended</h1>
          <p className="text-sm text-brand-400 leading-relaxed">
            Your SuiteCompare account has been suspended. Please contact us to resolve this.
          </p>
          <a
            href="mailto:hello@suitepacific.com"
            className="mt-6 inline-block text-sm font-medium text-accent hover:underline"
          >
            Contact SuitePacific
          </a>
        </div>
      </div>
    );
  }

  return (
    <div className="flex min-h-screen bg-brand-50/40">
      <ScSidebar />
      <main className="flex-1 min-w-0 p-4 md:p-8 mt-14 md:mt-0">
        {billingStatus === "past_due" && (
          <div className="mb-6 flex items-center gap-3 rounded-xl border border-amber-200 bg-amber-50 px-4 py-3">
            <AlertTriangle className="h-4 w-4 text-amber-500 shrink-0" />
            <p className="text-sm text-amber-800">
              Your account has a past-due payment. Please contact{" "}
              <a href="mailto:hello@suitepacific.com" className="font-medium underline">hello@suitepacific.com</a>{" "}
              to avoid service interruption.
            </p>
          </div>
        )}
        {children}
      </main>
    </div>
  );
}

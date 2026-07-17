import { redirect } from "next/navigation";
import { getPartnerFromRequest } from "@/lib/partner-auth";
import { prisma } from "@/lib/prisma";
import { Send, Trophy, Banknote, Clock } from "lucide-react";
import Link from "next/link";
import { ReferralStatusBadge } from "@/components/portal/ReferralStatusBadge";
import { CommissionStatusBadge } from "@/components/portal/CommissionStatusBadge";

export default async function PortalDashboardPage() {
  const partner = await getPartnerFromRequest();
  if (!partner) redirect("/partner-portal/login");

  const referrals = await prisma.referral.findMany({
    where: { partnerId: partner.id },
    orderBy: { createdAt: "desc" },
  });

  const wonReferrals = referrals.filter((r) => r.status === "WON");
  const payableAmount = wonReferrals
    .filter((r) => r.commissionStatus === "PAYABLE")
    .reduce((sum, r) => sum + (r.commissionAmount ?? 0), 0);
  const paidAmount = wonReferrals
    .filter((r) => r.commissionStatus === "PAID")
    .reduce((sum, r) => sum + (r.commissionAmount ?? 0), 0);

  const stats = [
    { label: "Total Referrals", value: referrals.length, icon: Send, color: "text-blue-600 bg-blue-50" },
    { label: "Won", value: wonReferrals.length, icon: Trophy, color: "text-emerald-600 bg-emerald-50" },
    {
      label: "Ready for Payout",
      value: payableAmount > 0 ? `$${payableAmount.toFixed(2)}` : "$0",
      icon: Clock,
      color: "text-blue-600 bg-blue-50",
    },
    {
      label: "Total Paid to Me",
      value: paidAmount > 0 ? `$${paidAmount.toFixed(2)}` : "$0",
      icon: Banknote,
      color: "text-emerald-600 bg-emerald-50",
    },
  ];

  return (
    <div className="max-w-4xl">
      <div className="mb-8">
        <h1 className="text-xl font-semibold text-brand-900">Welcome back, {partner.name}</h1>
        <p className="text-sm text-brand-400 mt-1">Here&apos;s an overview of your referral activity.</p>
      </div>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-10">
        {stats.map((stat) => (
          <div key={stat.label} className="bg-white rounded-2xl border border-brand-100 p-5">
            <div className={`inline-flex items-center justify-center h-9 w-9 rounded-xl ${stat.color} mb-3`}>
              <stat.icon className="h-4 w-4" />
            </div>
            <p className="text-2xl font-bold text-brand-900">{stat.value}</p>
            <p className="text-xs text-brand-400 mt-0.5">{stat.label}</p>
          </div>
        ))}
      </div>

      <div className="bg-white rounded-2xl border border-brand-100">
        <div className="flex items-center justify-between px-6 py-4 border-b border-brand-100">
          <h2 className="font-semibold text-brand-900 text-sm">Recent Referrals</h2>
          <Link href="/partner-portal/referrals/new" className="text-xs text-accent hover:underline">
            + Submit a referral
          </Link>
        </div>

        {referrals.length === 0 ? (
          <div className="px-6 py-12 text-center">
            <p className="text-sm text-brand-400">No referrals yet.</p>
            <Link href="/partner-portal/referrals/new" className="mt-3 inline-flex text-sm text-accent hover:underline">
              Submit your first referral
            </Link>
          </div>
        ) : (
          <div className="divide-y divide-brand-50">
            {referrals.slice(0, 5).map((r) => (
              <Link
                key={r.id}
                href={`/partner-portal/referrals/${r.id}`}
                className="flex items-center justify-between px-6 py-4 hover:bg-brand-50/50 transition-colors"
              >
                <div>
                  <p className="text-sm font-medium text-brand-900">{r.companyName}</p>
                  <p className="text-xs text-brand-400 mt-0.5">
                    {new Date(r.createdAt).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })}
                  </p>
                </div>
                <div className="flex items-center gap-2">
                  {r.commissionStatus && <CommissionStatusBadge status={r.commissionStatus} />}
                  <ReferralStatusBadge status={r.status} />
                </div>
              </Link>
            ))}
          </div>
        )}

        {referrals.length > 5 && (
          <div className="px-6 py-3 border-t border-brand-50">
            <Link href="/partner-portal/referrals" className="text-xs text-accent hover:underline">
              View all {referrals.length} referrals
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}

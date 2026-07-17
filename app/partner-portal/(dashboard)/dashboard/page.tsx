import { redirect } from "next/navigation";
import { getPartnerFromRequest } from "@/lib/partner-auth";
import { prisma } from "@/lib/prisma";
import { Send, Trophy, Banknote, Clock, TrendingUp, Activity } from "lucide-react";
import Link from "next/link";
import { ReferralStatusBadge } from "@/components/portal/ReferralStatusBadge";
import { CommissionStatusBadge } from "@/components/portal/CommissionStatusBadge";

export default async function PortalDashboardPage() {
  const partner = await getPartnerFromRequest();
  if (!partner) redirect("/partner-portal/login");

  const referrals = await prisma.referral.findMany({
    where: { partnerId: partner.id, archivedAt: null },
    orderBy: { createdAt: "desc" },
  });

  const active = referrals.filter((r) => !["WON", "LOST", "DUPLICATE"].includes(r.status));
  const won = referrals.filter((r) => r.status === "WON");
  const payableAmount = won.filter((r) => r.commissionStatus === "PAYABLE").reduce((s, r) => s + (r.commissionAmount ?? 0), 0);
  const pendingAmount = won.filter((r) => r.commissionStatus === "PENDING_PAYMENT").reduce((s, r) => s + (r.commissionAmount ?? 0), 0);
  const paidAmount = won.filter((r) => r.commissionStatus === "PAID").reduce((s, r) => s + (r.commissionAmount ?? 0), 0);
  const totalEarnings = payableAmount + pendingAmount + paidAmount;

  const fmt = (n: number) => n > 0 ? `$${n.toFixed(2)}` : "$0";

  const stats = [
    { label: "Total Referrals", value: referrals.length, icon: Send, color: "text-blue-600 bg-blue-50" },
    { label: "Active Deals", value: active.length, icon: Activity, color: "text-sky-600 bg-sky-50" },
    { label: "Won", value: won.length, icon: Trophy, color: "text-emerald-600 bg-emerald-50" },
    { label: "Total Earnings", value: fmt(totalEarnings), icon: TrendingUp, color: "text-emerald-600 bg-emerald-50" },
    { label: "Pending Payment", value: fmt(pendingAmount), icon: Clock, color: "text-amber-600 bg-amber-50" },
    { label: "Ready for Payout", value: fmt(payableAmount), icon: Banknote, color: "text-blue-600 bg-blue-50" },
    { label: "Paid to Me", value: fmt(paidAmount), icon: Banknote, color: "text-emerald-600 bg-emerald-50" },
  ];

  return (
    <div className="max-w-4xl">
      <div className="mb-8">
        <h1 className="text-xl font-semibold text-brand-900">Welcome back, {partner.name}</h1>
        <p className="text-sm text-brand-400 mt-1">Here&apos;s an overview of your referral activity.</p>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3 mb-10">
        {stats.map((stat) => (
          <div key={stat.label} className="bg-white rounded-2xl border border-brand-100 p-4">
            <div className={`inline-flex items-center justify-center h-8 w-8 rounded-xl ${stat.color} mb-2`}>
              <stat.icon className="h-3.5 w-3.5" />
            </div>
            <p className="text-xl font-bold text-brand-900">{stat.value}</p>
            <p className="text-xs text-brand-400 mt-0.5 leading-snug">{stat.label}</p>
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
              <Link key={r.id} href={`/partner-portal/referrals/${r.id}`}
                className="flex items-center justify-between px-6 py-4 hover:bg-brand-50/50 transition-colors">
                <div>
                  <p className="text-sm font-medium text-brand-900">{r.companyName}</p>
                  <p className="text-xs text-brand-400 mt-0.5">
                    {new Date(r.createdAt).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })}
                  </p>
                </div>
                <div className="flex items-center gap-2 flex-wrap justify-end">
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

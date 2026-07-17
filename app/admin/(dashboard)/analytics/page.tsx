import { prisma } from "@/lib/prisma";
import Link from "next/link";

export default async function AdminAnalyticsPage() {
  const [partners, referrals] = await Promise.all([
    prisma.partner.findMany({
      where: { archivedAt: null },
      include: { _count: { select: { referrals: true } } },
    }),
    prisma.referral.findMany({
      where: { archivedAt: null },
      include: { partner: { select: { name: true, id: true } } },
    }),
  ]);

  // Per-partner stats
  const partnerStats = partners.map((p) => {
    const myReferrals = referrals.filter((r) => r.partnerId === p.id);
    const won = myReferrals.filter((r) => r.status === "WON");
    const revenue = won.reduce((sum, r) => sum + (r.projectValue ?? 0), 0);
    const commissionPaid = won
      .filter((r) => r.commissionStatus === "PAID")
      .reduce((sum, r) => sum + (r.commissionAmount ?? 0), 0);
    const commissionOutstanding = won
      .filter((r) => r.commissionStatus !== "PAID" && r.commissionAmount)
      .reduce((sum, r) => sum + (r.commissionAmount ?? 0), 0);
    const winRate = myReferrals.length > 0 ? (won.length / myReferrals.length) * 100 : 0;
    const avgDeal = won.length > 0 ? revenue / won.length : 0;
    return { partner: p, total: myReferrals.length, won: won.length, revenue, commissionPaid, commissionOutstanding, winRate, avgDeal };
  }).sort((a, b) => b.revenue - a.revenue);

  // Global totals
  const totalRevenue = referrals.filter((r) => r.status === "WON").reduce((s, r) => s + (r.projectValue ?? 0), 0);
  const totalWon = referrals.filter((r) => r.status === "WON").length;
  const totalCommissionPaid = referrals.filter((r) => r.commissionStatus === "PAID").reduce((s, r) => s + (r.commissionAmount ?? 0), 0);
  const totalCommissionOutstanding = referrals
    .filter((r) => r.commissionStatus && r.commissionStatus !== "PAID")
    .reduce((s, r) => s + (r.commissionAmount ?? 0), 0);
  const globalWinRate = referrals.length > 0 ? (totalWon / referrals.length) * 100 : 0;

  return (
    <div>
      <h1 className="text-2xl font-semibold text-brand-900 mb-1">Analytics</h1>
      <p className="text-sm text-brand-400 mb-8">Partner performance and revenue overview</p>

      {/* Global KPIs */}
      <div className="grid grid-cols-2 lg:grid-cols-5 gap-4 mb-8">
        {[
          { label: "Total Referrals", value: referrals.length.toString() },
          { label: "Won", value: totalWon.toString() },
          { label: "Win Rate", value: `${globalWinRate.toFixed(0)}%` },
          { label: "Total Revenue", value: `$${totalRevenue.toLocaleString()}` },
          { label: "Commission Paid", value: `$${totalCommissionPaid.toLocaleString()}` },
        ].map((s) => (
          <div key={s.label} className="bg-white rounded-2xl border border-brand-50 shadow-soft p-5">
            <p className="text-xl font-bold text-brand-900">{s.value}</p>
            <p className="text-xs text-brand-400 mt-0.5">{s.label}</p>
          </div>
        ))}
      </div>

      {/* Outstanding commissions callout */}
      {totalCommissionOutstanding > 0 && (
        <div className="mb-6 bg-amber-50 border border-amber-100 rounded-2xl px-5 py-4 text-sm text-amber-800">
          <strong>${totalCommissionOutstanding.toFixed(2)}</strong> in commissions outstanding (Pending Payment + Payable)
        </div>
      )}

      {/* Per-partner table */}
      <div className="bg-white rounded-2xl border border-brand-50 shadow-soft overflow-hidden">
        <div className="px-6 py-4 border-b border-brand-50">
          <h2 className="text-sm font-semibold text-brand-900">Partner Breakdown</h2>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-brand-50 text-left text-brand-400">
                <th className="px-5 py-3 font-medium">Partner</th>
                <th className="px-5 py-3 font-medium text-right">Referrals</th>
                <th className="px-5 py-3 font-medium text-right">Won</th>
                <th className="px-5 py-3 font-medium text-right">Win Rate</th>
                <th className="px-5 py-3 font-medium text-right">Revenue Generated</th>
                <th className="px-5 py-3 font-medium text-right">Avg Deal</th>
                <th className="px-5 py-3 font-medium text-right">Commission Paid</th>
                <th className="px-5 py-3 font-medium text-right">Outstanding</th>
              </tr>
            </thead>
            <tbody>
              {partnerStats.map(({ partner, total, won, revenue, commissionPaid, commissionOutstanding, winRate, avgDeal }) => (
                <tr key={partner.id} className="border-b border-brand-50 last:border-0 hover:bg-brand-50/40 transition-colors">
                  <td className="px-5 py-3">
                    <Link href={`/admin/partners/${partner.id}`} className="font-medium text-brand-900 hover:text-accent">
                      {partner.name}
                    </Link>
                    {partner.company && <p className="text-xs text-brand-400">{partner.company}</p>}
                  </td>
                  <td className="px-5 py-3 text-right text-brand-600">{total}</td>
                  <td className="px-5 py-3 text-right text-brand-600">{won}</td>
                  <td className="px-5 py-3 text-right text-brand-600">{winRate.toFixed(0)}%</td>
                  <td className="px-5 py-3 text-right font-medium text-brand-900">${revenue.toLocaleString()}</td>
                  <td className="px-5 py-3 text-right text-brand-600">{avgDeal > 0 ? `$${avgDeal.toFixed(0)}` : "-"}</td>
                  <td className="px-5 py-3 text-right text-emerald-600">${commissionPaid.toFixed(2)}</td>
                  <td className="px-5 py-3 text-right text-amber-600">
                    {commissionOutstanding > 0 ? `$${commissionOutstanding.toFixed(2)}` : "-"}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        {partnerStats.length === 0 && (
          <p className="px-5 py-8 text-center text-sm text-brand-300">No partners yet.</p>
        )}
      </div>
    </div>
  );
}

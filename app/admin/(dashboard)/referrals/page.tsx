import { prisma } from "@/lib/prisma";
import Link from "next/link";
import { ReferralStatusBadge } from "@/components/portal/ReferralStatusBadge";

export default async function AdminReferralsPage() {
  const referrals = await prisma.referral.findMany({
    include: { partner: { select: { name: true } } },
    orderBy: { createdAt: "desc" },
  });

  return (
    <div>
      <h1 className="text-2xl font-semibold text-brand-900">Referrals</h1>
      <p className="mt-1 text-sm text-brand-400 mb-8">{referrals.length} referral{referrals.length !== 1 ? "s" : ""} total</p>

      <div className="bg-white rounded-2xl border border-brand-50 shadow-soft overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-brand-50 text-left text-brand-400">
                <th className="px-5 py-3 font-medium">Company</th>
                <th className="px-5 py-3 font-medium">Partner</th>
                <th className="px-5 py-3 font-medium">Contact</th>
                <th className="px-5 py-3 font-medium">Status</th>
                <th className="px-5 py-3 font-medium">Commission</th>
                <th className="px-5 py-3 font-medium">Submitted</th>
              </tr>
            </thead>
            <tbody>
              {referrals.map((r) => (
                <tr key={r.id} className="border-b border-brand-50 last:border-0 hover:bg-brand-50/40 transition-colors">
                  <td className="px-5 py-3">
                    <Link href={`/admin/referrals/${r.id}`} className="font-medium text-brand-900 hover:text-accent">
                      {r.companyName}
                    </Link>
                  </td>
                  <td className="px-5 py-3 text-brand-500">{r.partner.name}</td>
                  <td className="px-5 py-3 text-brand-500">{r.contactName ?? "-"}</td>
                  <td className="px-5 py-3">
                    <ReferralStatusBadge status={r.status} />
                  </td>
                  <td className="px-5 py-3 text-brand-500">
                    {r.commissionAmount != null ? (
                      <span className={r.commissionPaid ? "text-emerald-600" : ""}>
                        ${r.commissionAmount.toFixed(2)} {r.commissionPaid ? "(Paid)" : "(Pending)"}
                      </span>
                    ) : "-"}
                  </td>
                  <td className="px-5 py-3 text-brand-400">
                    {r.createdAt.toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        {referrals.length === 0 && (
          <p className="px-5 py-8 text-center text-sm text-brand-300">No referrals yet.</p>
        )}
      </div>
    </div>
  );
}

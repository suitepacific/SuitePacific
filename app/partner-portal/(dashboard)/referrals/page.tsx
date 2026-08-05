import { redirect } from "next/navigation";
import { getPartnerFromRequest } from "@/lib/partner-auth";
import { prisma } from "@/lib/prisma";
import Link from "next/link";
import { ReferralStatusBadge } from "@/components/portal/ReferralStatusBadge";
import { CommissionStatusBadge } from "@/components/portal/CommissionStatusBadge";
import { PlusCircle } from "lucide-react";

export default async function PortalReferralsPage() {
  const partner = await getPartnerFromRequest();
  if (!partner) redirect("/partner-portal/login");

  const referrals = await prisma.referral.findMany({
    where: { partnerId: partner.id },
    orderBy: { createdAt: "desc" },
  });

  return (
    <div className="max-w-4xl">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-xl font-semibold text-brand-900">My Referrals</h1>
          <p className="text-sm text-brand-400 mt-1">
            {referrals.length} referral{referrals.length !== 1 ? "s" : ""} submitted
          </p>
        </div>
        <Link
          href="/partner-portal/referrals/new"
          className="inline-flex items-center gap-2 rounded-full bg-brand text-white text-sm font-medium px-4 py-2 hover:bg-brand-700 transition-colors"
        >
          <PlusCircle className="h-4 w-4" />
          Submit Referral
        </Link>
      </div>

      <div className="bg-white rounded-2xl border border-brand-100">
        {referrals.length === 0 ? (
          <div className="px-6 py-16 text-center">
            <p className="text-sm text-brand-400 mb-3">No referrals yet.</p>
            <Link href="/partner-portal/referrals/new" className="text-sm text-accent hover:underline">
              Submit your first referral
            </Link>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-brand-100">
                  <th className="text-left px-6 py-3 text-xs font-medium text-brand-400 uppercase tracking-wide">Company</th>
                  <th className="text-left px-6 py-3 text-xs font-medium text-brand-400 uppercase tracking-wide">Contact</th>
                  <th className="text-left px-6 py-3 text-xs font-medium text-brand-400 uppercase tracking-wide">Deal</th>
                  <th className="text-left px-6 py-3 text-xs font-medium text-brand-400 uppercase tracking-wide">Commission</th>
                  <th className="text-left px-6 py-3 text-xs font-medium text-brand-400 uppercase tracking-wide">Submitted</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-brand-50">
                {referrals.map((r) => (
                  <tr key={r.id} className="hover:bg-brand-50/40 transition-colors">
                    <td className="px-6 py-4">
                      <Link
                        href={`/partner-portal/referrals/${r.id}`}
                        className="font-medium text-brand-900 hover:text-accent"
                      >
                        {r.companyName}
                      </Link>
                    </td>
                    <td className="px-6 py-4 text-brand-500">{r.contactName ?? "-"}</td>
                    <td className="px-6 py-4">
                      <ReferralStatusBadge status={r.status} />
                    </td>
                    <td className="px-6 py-4">
                      {r.commissionStatus ? (
                        <div className="space-y-1">
                          <CommissionStatusBadge status={r.commissionStatus} />
                          {r.commissionAmount != null && (
                            <p className="text-xs text-brand-400">${r.commissionAmount.toFixed(2)}</p>
                          )}
                        </div>
                      ) : (
                        <span className="text-brand-300 text-xs">-</span>
                      )}
                    </td>
                    <td className="px-6 py-4 text-brand-400">
                      {new Date(r.createdAt).toLocaleDateString("en-US", {
                        month: "short",
                        day: "numeric",
                        year: "numeric",
                      })}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}

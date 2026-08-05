import { prisma } from "@/lib/prisma";
import Link from "next/link";
import { ReferralStatusBadge } from "@/components/portal/ReferralStatusBadge";
import { CommissionStatusBadge } from "@/components/portal/CommissionStatusBadge";

export default async function AdminReferralsPage({
  searchParams,
}: {
  searchParams: Promise<{ archived?: string; status?: string }>;
}) {
  const sp = await searchParams;
  const showArchived = sp.archived === "1";
  const statusFilter = sp.status as string | undefined;

  const referrals = await prisma.referral.findMany({
    where: {
      archivedAt: showArchived ? { not: null } : null,
      ...(statusFilter ? { status: statusFilter as never } : {}),
    },
    include: { partner: { select: { name: true } } },
    orderBy: { createdAt: "desc" },
  });

  const STATUSES = [
    "NEW", "QUALIFIED", "CONTACTED", "DISCOVERY_CALL",
    "PROPOSAL_SENT", "NEGOTIATION", "WON", "LOST", "DUPLICATE",
  ];
  const STATUS_LABELS: Record<string, string> = {
    NEW: "New", QUALIFIED: "Qualified", CONTACTED: "Contacted",
    DISCOVERY_CALL: "Discovery Call", PROPOSAL_SENT: "Proposal Sent",
    NEGOTIATION: "Negotiation", WON: "Won", LOST: "Lost", DUPLICATE: "Duplicate",
  };

  return (
    <div>
      <div className="flex items-start justify-between mb-6">
        <div>
          <h1 className="text-2xl font-semibold text-brand-900">Referrals</h1>
          <p className="mt-1 text-sm text-brand-400">
            {referrals.length} {showArchived ? "archived" : "active"} referral{referrals.length !== 1 ? "s" : ""}
          </p>
        </div>
        <div className="flex items-center gap-2 flex-wrap justify-end">
          <Link
            href={showArchived ? "/admin/referrals" : "/admin/referrals?archived=1"}
            className="text-xs px-3 py-1.5 rounded-full border border-brand-100 text-brand-500 hover:border-brand-300 hover:text-brand-900 transition-colors"
          >
            {showArchived ? "Active" : "Archived"}
          </Link>
        </div>
      </div>

      {/* Status filter pills */}
      <div className="flex gap-1.5 flex-wrap mb-6">
        <Link
          href={showArchived ? "/admin/referrals?archived=1" : "/admin/referrals"}
          className={`text-xs px-3 py-1 rounded-full border transition-colors ${
            !statusFilter ? "bg-brand-900 text-white border-brand-900" : "border-brand-100 text-brand-500 hover:border-brand-300"
          }`}
        >
          All
        </Link>
        {STATUSES.map((s) => {
          const active = statusFilter === s;
          const params = new URLSearchParams();
          params.set("status", s);
          if (showArchived) params.set("archived", "1");
          return (
            <Link
              key={s}
              href={`/admin/referrals?${params.toString()}`}
              className={`text-xs px-3 py-1 rounded-full border transition-colors ${
                active ? "bg-brand-900 text-white border-brand-900" : "border-brand-100 text-brand-500 hover:border-brand-300"
              }`}
            >
              {STATUS_LABELS[s]}
            </Link>
          );
        })}
      </div>

      <div className="bg-white rounded-2xl border border-brand-50 shadow-soft overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm min-w-[700px]">
            <thead>
              <tr className="border-b border-brand-50 text-left text-brand-400">
                <th className="px-5 py-3 font-medium">Company</th>
                <th className="px-5 py-3 font-medium">Partner</th>
                <th className="px-5 py-3 font-medium">Assigned</th>
                <th className="px-5 py-3 font-medium">Deal</th>
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
                    {r.contactEmail && (
                      <p className="text-xs text-brand-400 mt-0.5">{r.contactEmail}</p>
                    )}
                  </td>
                  <td className="px-5 py-3 text-brand-500">{r.partner.name}</td>
                  <td className="px-5 py-3 text-brand-500">{r.assignedTo ?? <span className="text-brand-200">-</span>}</td>
                  <td className="px-5 py-3">
                    <ReferralStatusBadge status={r.status} />
                  </td>
                  <td className="px-5 py-3">
                    {r.commissionStatus ? (
                      <div className="flex items-center gap-2">
                        <CommissionStatusBadge status={r.commissionStatus} />
                        {r.commissionAmount != null && (
                          <span className="text-xs text-brand-400">
                            {r.commissionCurrency} {r.commissionAmount.toFixed(2)}
                          </span>
                        )}
                      </div>
                    ) : (
                      <span className="text-brand-300">-</span>
                    )}
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
          <p className="px-5 py-8 text-center text-sm text-brand-300">
            No {showArchived ? "archived" : "active"} referrals.
          </p>
        )}
      </div>
    </div>
  );
}

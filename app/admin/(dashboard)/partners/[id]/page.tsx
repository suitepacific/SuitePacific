import { prisma } from "@/lib/prisma";
import { notFound } from "next/navigation";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { ReferralStatusBadge } from "@/components/portal/ReferralStatusBadge";
import { TogglePartnerStatusButton } from "@/components/admin/TogglePartnerStatusButton";

export default async function AdminPartnerDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const partner = await prisma.partner.findUnique({
    where: { id },
    include: {
      referrals: { orderBy: { createdAt: "desc" } },
    },
  });
  if (!partner) notFound();

  const totalEarned = partner.referrals
    .filter((r) => r.status === "WON")
    .reduce((sum, r) => sum + (r.commissionAmount ?? 0), 0);

  return (
    <div className="max-w-3xl">
      <Link
        href="/admin/partners"
        className="inline-flex items-center gap-1.5 text-sm text-brand-400 hover:text-brand-900 mb-6"
      >
        <ArrowLeft className="h-3.5 w-3.5" />
        Back to Partners
      </Link>

      <div className="flex items-start justify-between mb-8">
        <div>
          <h1 className="text-2xl font-semibold text-brand-900">{partner.name}</h1>
          <p className="text-sm text-brand-400 mt-1">{partner.email}{partner.company ? ` · ${partner.company}` : ""}</p>
        </div>
        <TogglePartnerStatusButton partnerId={partner.id} currentStatus={partner.status} />
      </div>

      <div className="grid grid-cols-3 gap-4 mb-8">
        <StatCard label="Total Referrals" value={partner.referrals.length} />
        <StatCard label="Won" value={partner.referrals.filter((r) => r.status === "WON").length} />
        <StatCard label="Commission Earned" value={`$${totalEarned.toFixed(2)}`} />
      </div>

      <div className="bg-white rounded-2xl border border-brand-50 shadow-soft">
        <div className="px-6 py-4 border-b border-brand-50">
          <h2 className="font-semibold text-brand-900 text-sm">Referrals</h2>
        </div>
        {partner.referrals.length === 0 ? (
          <p className="px-6 py-8 text-center text-sm text-brand-300">No referrals yet.</p>
        ) : (
          <div className="divide-y divide-brand-50">
            {partner.referrals.map((r) => (
              <Link
                key={r.id}
                href={`/admin/referrals/${r.id}`}
                className="flex items-center justify-between px-6 py-4 hover:bg-brand-50/50 transition-colors"
              >
                <div>
                  <p className="text-sm font-medium text-brand-900">{r.companyName}</p>
                  <p className="text-xs text-brand-400 mt-0.5">
                    {r.createdAt.toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })}
                  </p>
                </div>
                <ReferralStatusBadge status={r.status} />
              </Link>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

function StatCard({ label, value }: { label: string; value: string | number }) {
  return (
    <div className="bg-white rounded-2xl border border-brand-50 shadow-soft p-5">
      <p className="text-2xl font-bold text-brand-900">{value}</p>
      <p className="text-xs text-brand-400 mt-0.5">{label}</p>
    </div>
  );
}

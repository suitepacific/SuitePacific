import { prisma } from "@/lib/prisma";
import { notFound } from "next/navigation";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { ReferralStatusBadge } from "@/components/portal/ReferralStatusBadge";
import { CommissionStatusBadge } from "@/components/portal/CommissionStatusBadge";
import { TogglePartnerStatusButton } from "@/components/admin/TogglePartnerStatusButton";
import { PartnerEditForm } from "@/components/admin/PartnerEditForm";
import { archivePartnerAction } from "@/app/admin/(dashboard)/partners/actions";

export default async function AdminPartnerDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const partner = await prisma.partner.findUnique({
    where: { id },
    include: { referrals: { where: { archivedAt: null }, orderBy: { createdAt: "desc" } } },
  });
  if (!partner) notFound();

  const totalCommission = partner.referrals
    .filter((r) => r.commissionAmount != null)
    .reduce((s, r) => s + (r.commissionAmount ?? 0), 0);

  const isArchived = !!partner.archivedAt;

  return (
    <div className="max-w-3xl">
      <Link href="/admin/partners"
        className="inline-flex items-center gap-1.5 text-sm text-brand-400 hover:text-brand-900 mb-6">
        <ArrowLeft className="h-3.5 w-3.5" />
        Back to Partners
      </Link>

      <div className="flex items-start justify-between mb-8 gap-4">
        <div>
          <div className="flex items-center gap-2 flex-wrap">
            <h1 className="text-2xl font-semibold text-brand-900">{partner.name}</h1>
            {isArchived && (
              <span className="text-xs bg-red-100 text-red-600 px-2.5 py-0.5 rounded-full font-medium">Archived</span>
            )}
            {!isArchived && partner.status === "suspended" && (
              <span className="text-xs bg-amber-100 text-amber-700 px-2.5 py-0.5 rounded-full font-medium">Suspended</span>
            )}
          </div>
          <p className="text-sm text-brand-400 mt-1">
            {partner.email}
            {partner.company && ` · ${partner.company}`}
            {partner.country && ` · ${partner.country}`}
          </p>
          {partner.website && (
            <a href={partner.website} target="_blank" rel="noopener noreferrer"
              className="text-xs text-accent hover:underline mt-0.5 inline-block">
              {partner.website}
            </a>
          )}
          {partner.agreementAcceptedAt && (
            <p className="text-xs text-emerald-600 mt-1">
              Agreement accepted {new Date(partner.agreementAcceptedAt).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })}
            </p>
          )}
        </div>
        {!isArchived && (
          <div className="flex items-center gap-2 shrink-0">
            <TogglePartnerStatusButton partnerId={partner.id} currentStatus={partner.status} />
          </div>
        )}
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-8">
        <StatCard label="Referrals" value={partner.referrals.length} />
        <StatCard label="Won" value={partner.referrals.filter((r) => r.status === "WON").length} />
        <StatCard label="Win Rate"
          value={partner.referrals.length > 0
            ? `${Math.round(partner.referrals.filter((r) => r.status === "WON").length / partner.referrals.length * 100)}%`
            : "-"}
        />
        <StatCard label="Commission"
          value={totalCommission > 0 ? `$${totalCommission.toFixed(2)}` : "$0"} />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        <div className="bg-white rounded-2xl border border-brand-50 shadow-soft p-5">
          <p className="text-xs font-semibold text-brand-400 uppercase tracking-wide mb-3">Details</p>
          <dl className="space-y-2 text-sm">
            <Row label="Commission Rate" value={partner.commissionRate != null ? `${partner.commissionRate}%` : "Global default"} />
            {partner.taxId && <Row label="Tax ID" value={partner.taxId} />}
            {partner.preferredPaymentMethod && <Row label="Payment" value={partner.preferredPaymentMethod.replace("_", " ")} />}
            {partner.paymentDetails && <Row label="Payment Details" value={partner.paymentDetails} multiline />}
            <Row label="Joined" value={new Date(partner.createdAt).toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" })} />
          </dl>
        </div>

        <PartnerEditForm
          id={partner.id}
          defaults={{
            company: partner.company ?? "",
            website: partner.website ?? "",
            country: partner.country ?? "",
            timezone: partner.timezone ?? "",
            commissionRate: partner.commissionRate?.toString() ?? "",
            preferredPaymentMethod: partner.preferredPaymentMethod ?? "",
            paymentDetails: partner.paymentDetails ?? "",
            taxId: partner.taxId ?? "",
          }}
        />
      </div>

      {/* Referrals list */}
      <div className="bg-white rounded-2xl border border-brand-50 shadow-soft mb-6">
        <div className="px-6 py-4 border-b border-brand-50">
          <h2 className="font-semibold text-brand-900 text-sm">Referrals</h2>
        </div>
        {partner.referrals.length === 0 ? (
          <p className="px-6 py-8 text-center text-sm text-brand-300">No referrals yet.</p>
        ) : (
          <div className="divide-y divide-brand-50">
            {partner.referrals.map((r) => (
              <Link key={r.id} href={`/admin/referrals/${r.id}`}
                className="flex items-center justify-between px-6 py-4 hover:bg-brand-50/50 transition-colors">
                <div>
                  <p className="text-sm font-medium text-brand-900">{r.companyName}</p>
                  <p className="text-xs text-brand-400 mt-0.5">
                    {r.createdAt.toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })}
                    {r.assignedTo && ` · ${r.assignedTo}`}
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
      </div>

      {/* Archive */}
      {!isArchived && (
        <div className="bg-red-50 border border-red-100 rounded-2xl p-5">
          <p className="text-sm font-semibold text-red-800 mb-1">Archive Partner</p>
          <p className="text-xs text-red-600 mb-4">
            Archiving suspends portal access and hides this partner from active lists. Their data is preserved.
          </p>
          <form action={archivePartnerAction.bind(null, partner.id)}>
            <button type="submit"
              className="text-sm px-4 py-2 rounded-full bg-red-600 text-white hover:bg-red-700 transition-colors font-medium">
              Archive Partner
            </button>
          </form>
        </div>
      )}
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

function Row({ label, value, multiline }: { label: string; value: string; multiline?: boolean }) {
  return (
    <div className="flex gap-3">
      <span className="text-brand-400 w-32 shrink-0">{label}</span>
      <span className={`text-brand-900 ${multiline ? "whitespace-pre-wrap" : ""}`}>{value}</span>
    </div>
  );
}

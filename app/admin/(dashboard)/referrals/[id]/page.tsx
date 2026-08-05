import { prisma } from "@/lib/prisma";
import { notFound } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, AlertTriangle } from "lucide-react";
import { ReferralUpdateForm } from "@/components/admin/ReferralUpdateForm";
import { ReferralStatusBadge } from "@/components/portal/ReferralStatusBadge";
import { ReferralTimeline } from "@/components/admin/ReferralTimeline";

export default async function AdminReferralDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;

  const [referral, globalSetting] = await Promise.all([
    prisma.referral.findUnique({
      where: { id },
      include: {
        partner: { select: { name: true, email: true, commissionRate: true } },
        activities: { orderBy: { createdAt: "desc" } },
      },
    }),
    prisma.systemSetting.findUnique({ where: { key: "default_commission_rate" } }),
  ]);

  if (!referral) notFound();

  const globalDefaultRate = globalSetting ? parseFloat(globalSetting.value) || 10 : 10;

  // Duplicate detection - warn if another non-archived referral shares company/email/website
  const duplicateClauses = [
    { companyName: { equals: referral.companyName, mode: "insensitive" as const } },
    ...(referral.contactEmail ? [{ contactEmail: { equals: referral.contactEmail, mode: "insensitive" as const } }] : []),
    ...(referral.contactWebsite ? [{ contactWebsite: { equals: referral.contactWebsite, mode: "insensitive" as const } }] : []),
  ];
  const duplicates = await prisma.referral.findMany({
    where: { id: { not: id }, archivedAt: null, OR: duplicateClauses },
    select: { id: true, companyName: true, partnerId: true, partner: { select: { name: true } } },
    take: 5,
  });

  return (
    <div className="max-w-2xl space-y-6">
      <div>
        <Link href="/admin/referrals"
          className="inline-flex items-center gap-1.5 text-sm text-brand-400 hover:text-brand-900 mb-6">
          <ArrowLeft className="h-3.5 w-3.5" /> Back to Referrals
        </Link>
        <div className="flex items-center gap-3 mb-1">
          <h1 className="text-2xl font-semibold text-brand-900">{referral.companyName}</h1>
          <ReferralStatusBadge status={referral.status} />
        </div>
        <p className="text-sm text-brand-400">
          Referred by {referral.partner.name} ({referral.partner.email})
          {referral.assignedTo && <> · Assigned to <strong className="text-brand-700">{referral.assignedTo}</strong></>}
        </p>
      </div>

      {duplicates.length > 0 && (
        <div className="bg-amber-50 border border-amber-200 rounded-2xl p-4 flex gap-3">
          <AlertTriangle className="h-5 w-5 text-amber-600 shrink-0 mt-0.5" />
          <div>
            <p className="text-sm font-semibold text-amber-800">Potential duplicate</p>
            <p className="text-xs text-amber-700 mt-0.5">
              {duplicates.length} other referral{duplicates.length !== 1 ? "s" : ""} match this company, email, or website:
            </p>
            <ul className="mt-1 space-y-0.5">
              {duplicates.map((d) => (
                <li key={d.id} className="text-xs">
                  <Link href={`/admin/referrals/${d.id}`} className="text-amber-800 underline">
                    {d.companyName}
                  </Link>{" "}
                  <span className="text-amber-600">(from {d.partner.name})</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      )}

      <div className="bg-white rounded-2xl border border-brand-50 shadow-soft divide-y divide-brand-50">
        <Row label="Company" value={referral.companyName} />
        <Row label="Contact Name" value={referral.contactName ?? "-"} />
        <Row label="Contact Email" value={referral.contactEmail ?? "-"} />
        <Row label="Contact Website" value={referral.contactWebsite ?? "-"} />
        <Row label="Partner Notes" value={referral.partnerNotes ?? "-"} multiline />
        <Row label="Submitted" value={referral.createdAt.toLocaleDateString("en-US", {
          month: "long", day: "numeric", year: "numeric" })} />
      </div>

      <ReferralUpdateForm
        referralId={referral.id}
        currentStatus={referral.status}
        currentAssignedTo={referral.assignedTo}
        currentInternalNotes={referral.internalNotes}
        currentPartnerNotes={referral.partnerNotes}
        currentProjectCurrency={referral.projectCurrency}
        currentProjectValue={referral.projectValue}
        currentCommissionRate={referral.commissionRate}
        currentCommissionCurrency={referral.commissionCurrency}
        currentCommissionAmount={referral.commissionAmount}
        currentCommissionStatus={referral.commissionStatus}
        currentPaymentDate={referral.paymentDate}
        currentPaymentMethod={referral.paymentMethod}
        currentPaymentReference={referral.paymentReference}
        currentPaymentNotes={referral.paymentNotes}
        partnerCommissionRate={referral.partner.commissionRate}
        globalDefaultRate={globalDefaultRate}
      />

      <ReferralTimeline activities={referral.activities} />
    </div>
  );
}

function Row({ label, value, multiline }: { label: string; value: string; multiline?: boolean }) {
  return (
    <div className="flex gap-4 px-6 py-4">
      <span className="text-sm text-brand-400 w-36 shrink-0">{label}</span>
      <span className={`text-sm text-brand-900 ${multiline ? "whitespace-pre-wrap" : ""}`}>{value}</span>
    </div>
  );
}

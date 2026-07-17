import { prisma } from "@/lib/prisma";
import { notFound } from "next/navigation";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { ReferralUpdateForm } from "@/components/admin/ReferralUpdateForm";
import { ReferralStatusBadge } from "@/components/portal/ReferralStatusBadge";

export default async function AdminReferralDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const referral = await prisma.referral.findUnique({
    where: { id },
    include: { partner: { select: { name: true, email: true } } },
  });
  if (!referral) notFound();

  return (
    <div className="max-w-xl">
      <Link
        href="/admin/referrals"
        className="inline-flex items-center gap-1.5 text-sm text-brand-400 hover:text-brand-900 mb-6"
      >
        <ArrowLeft className="h-3.5 w-3.5" />
        Back to Referrals
      </Link>

      <div className="flex items-center gap-3 mb-1">
        <h1 className="text-2xl font-semibold text-brand-900">{referral.companyName}</h1>
        <ReferralStatusBadge status={referral.status} />
      </div>
      <p className="text-sm text-brand-400 mb-8">
        Referred by {referral.partner.name} ({referral.partner.email})
      </p>

      <div className="bg-white rounded-2xl border border-brand-50 shadow-soft divide-y divide-brand-50 mb-6">
        <Row label="Company" value={referral.companyName} />
        <Row label="Contact Name" value={referral.contactName ?? "-"} />
        <Row label="Contact Email" value={referral.contactEmail ?? "-"} />
        <Row label="Notes" value={referral.notes ?? "-"} multiline />
        <Row
          label="Submitted"
          value={referral.createdAt.toLocaleDateString("en-US", {
            month: "long",
            day: "numeric",
            year: "numeric",
          })}
        />
      </div>

      <ReferralUpdateForm
        referralId={referral.id}
        currentStatus={referral.status}
        currentProjectValue={referral.projectValue}
        currentCommissionRate={referral.commissionRate}
        currentCommissionAmount={referral.commissionAmount}
        currentCommissionStatus={referral.commissionStatus}
        currentPaymentDate={referral.paymentDate}
        currentPaymentMethod={referral.paymentMethod}
        currentPaymentReference={referral.paymentReference}
      />
    </div>
  );
}

function Row({ label, value, multiline }: { label: string; value: string; multiline?: boolean }) {
  return (
    <div className="flex gap-4 px-6 py-4">
      <span className="text-sm text-brand-400 w-32 shrink-0">{label}</span>
      <span className={`text-sm text-brand-900 ${multiline ? "whitespace-pre-wrap" : ""}`}>{value}</span>
    </div>
  );
}

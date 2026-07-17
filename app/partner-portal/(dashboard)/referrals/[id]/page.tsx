import { redirect, notFound } from "next/navigation";
import { getPartnerFromRequest } from "@/lib/partner-auth";
import { prisma } from "@/lib/prisma";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { ReferralStatusBadge } from "@/components/portal/ReferralStatusBadge";
import { CommissionStatusBadge } from "@/components/portal/CommissionStatusBadge";

export default async function ReferralDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const partner = await getPartnerFromRequest();
  if (!partner) redirect("/partner-portal/login");

  const referral = await prisma.referral.findUnique({ where: { id } });
  if (!referral || referral.partnerId !== partner.id) notFound();

  const hasCommission = referral.commissionStatus != null;
  const isPaid = referral.commissionStatus === "PAID";

  return (
    <div className="max-w-xl">
      <Link
        href="/partner-portal/referrals"
        className="inline-flex items-center gap-1.5 text-sm text-brand-400 hover:text-brand-900 mb-6"
      >
        <ArrowLeft className="h-3.5 w-3.5" />
        Back to Referrals
      </Link>

      <div className="flex items-center gap-3 mb-8">
        <h1 className="text-xl font-semibold text-brand-900">{referral.companyName}</h1>
        <ReferralStatusBadge status={referral.status} />
      </div>

      {/* Referral details */}
      <div className="bg-white rounded-2xl border border-brand-100 divide-y divide-brand-50 mb-6">
        <Row label="Company" value={referral.companyName} />
        <Row label="Contact Name" value={referral.contactName ?? "-"} />
        <Row label="Contact Email" value={referral.contactEmail ?? "-"} />
        <Row label="Notes" value={referral.notes ?? "-"} multiline />
        <Row
          label="Submitted"
          value={new Date(referral.createdAt).toLocaleDateString("en-US", {
            month: "long",
            day: "numeric",
            year: "numeric",
          })}
        />
        <Row
          label="Last Updated"
          value={new Date(referral.updatedAt).toLocaleDateString("en-US", {
            month: "long",
            day: "numeric",
            year: "numeric",
          })}
        />
      </div>

      {/* Commission section */}
      {hasCommission ? (
        <div className={`rounded-2xl border p-5 ${isPaid ? "bg-emerald-50 border-emerald-100" : "bg-white border-brand-100"}`}>
          <div className="flex items-center justify-between mb-4">
            <p className={`text-sm font-semibold ${isPaid ? "text-emerald-800" : "text-brand-900"}`}>
              Commission
            </p>
            <CommissionStatusBadge status={referral.commissionStatus!} />
          </div>

          <div className="space-y-3">
            {referral.projectValue != null && (
              <CommRow label="Project Value" value={`$${referral.projectValue.toLocaleString("en-US", { minimumFractionDigits: 2 })}`} />
            )}
            {referral.commissionRate != null && (
              <CommRow label="Commission Rate" value={`${referral.commissionRate}%`} />
            )}
            {referral.commissionAmount != null && (
              <CommRow
                label="Commission Amount"
                value={`$${referral.commissionAmount.toLocaleString("en-US", { minimumFractionDigits: 2 })}`}
                highlight
              />
            )}

            {isPaid && (
              <>
                <div className="border-t border-emerald-200 my-3" />
                {referral.paymentDate && (
                  <CommRow
                    label="Payment Date"
                    value={new Date(referral.paymentDate).toLocaleDateString("en-US", {
                      month: "long",
                      day: "numeric",
                      year: "numeric",
                    })}
                  />
                )}
                {referral.paymentMethod && (
                  <CommRow label="Payment Method" value={referral.paymentMethod} />
                )}
                {referral.paymentReference && (
                  <CommRow label="Reference #" value={referral.paymentReference} />
                )}
              </>
            )}
          </div>

          {!isPaid && referral.commissionStatus === "PAYABLE" && (
            <p className="mt-4 text-xs text-blue-600 bg-blue-50 rounded-lg px-3 py-2">
              Your commission is ready. SuitePacific will process the payout shortly.
            </p>
          )}
          {!isPaid && referral.commissionStatus === "PENDING_PAYMENT" && (
            <p className="mt-4 text-xs text-amber-700 bg-amber-50 rounded-lg px-3 py-2">
              Commission is confirmed. It will become payable once the client pays the invoice.
            </p>
          )}
        </div>
      ) : referral.status === "WON" ? (
        <div className="bg-amber-50 border border-amber-100 rounded-2xl p-5">
          <p className="text-sm text-amber-700">Deal is marked as Won. Commission details will appear here once confirmed.</p>
        </div>
      ) : null}
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

function CommRow({ label, value, highlight }: { label: string; value: string; highlight?: boolean }) {
  return (
    <div className="flex justify-between items-center text-sm">
      <span className="text-brand-500">{label}</span>
      <span className={highlight ? "font-semibold text-brand-900 text-base" : "text-brand-700"}>{value}</span>
    </div>
  );
}

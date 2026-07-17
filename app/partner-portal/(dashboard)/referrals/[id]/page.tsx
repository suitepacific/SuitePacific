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

  const referral = await prisma.referral.findUnique({
    where: { id },
    include: { activities: { orderBy: { createdAt: "asc" } } },
  });
  if (!referral || referral.partnerId !== partner.id) notFound();

  const hasCommission = referral.commissionStatus != null;
  const isPaid = referral.commissionStatus === "PAID";

  return (
    <div className="max-w-xl">
      <Link href="/partner-portal/referrals"
        className="inline-flex items-center gap-1.5 text-sm text-brand-400 hover:text-brand-900 mb-6">
        <ArrowLeft className="h-3.5 w-3.5" />
        Back to Referrals
      </Link>

      <div className="flex items-center gap-3 mb-8 flex-wrap">
        <h1 className="text-xl font-semibold text-brand-900">{referral.companyName}</h1>
        <ReferralStatusBadge status={referral.status} />
      </div>

      <div className="bg-white rounded-2xl border border-brand-100 divide-y divide-brand-50 mb-6">
        <Row label="Company" value={referral.companyName} />
        {referral.contactName && <Row label="Contact" value={referral.contactName} />}
        {referral.contactEmail && <Row label="Email" value={referral.contactEmail} />}
        {referral.contactWebsite && (
          <div className="flex gap-4 px-6 py-4">
            <span className="text-sm text-brand-400 w-32 shrink-0">Website</span>
            <a href={referral.contactWebsite} target="_blank" rel="noopener noreferrer"
              className="text-sm text-accent hover:underline break-all">
              {referral.contactWebsite}
            </a>
          </div>
        )}
        {referral.partnerNotes && <Row label="Your Notes" value={referral.partnerNotes} multiline />}
        <Row label="Submitted" value={new Date(referral.createdAt).toLocaleDateString("en-US", {
          month: "long", day: "numeric", year: "numeric",
        })} />
        <Row label="Last Updated" value={new Date(referral.updatedAt).toLocaleDateString("en-US", {
          month: "long", day: "numeric", year: "numeric",
        })} />
      </div>

      {/* Commission */}
      {hasCommission ? (
        <div className={`rounded-2xl border p-5 mb-6 ${isPaid ? "bg-emerald-50 border-emerald-100" : "bg-white border-brand-100"}`}>
          <div className="flex items-center justify-between mb-4">
            <p className={`text-sm font-semibold ${isPaid ? "text-emerald-800" : "text-brand-900"}`}>Commission</p>
            <CommissionStatusBadge status={referral.commissionStatus!} />
          </div>
          <div className="space-y-3">
            {referral.projectValue != null && (
              <CommRow label="Project Value"
                value={`${referral.projectCurrency} ${referral.projectValue.toLocaleString("en-US", { minimumFractionDigits: 2 })}`} />
            )}
            {referral.commissionRate != null && <CommRow label="Rate" value={`${referral.commissionRate}%`} />}
            {referral.commissionAmount != null && (
              <CommRow label="Commission"
                value={`${referral.commissionCurrency} ${referral.commissionAmount.toLocaleString("en-US", { minimumFractionDigits: 2 })}`}
                highlight />
            )}
            {isPaid && (
              <>
                <div className="border-t border-emerald-200 my-3" />
                {referral.paymentDate && (
                  <CommRow label="Paid On" value={new Date(referral.paymentDate).toLocaleDateString("en-US", {
                    month: "long", day: "numeric", year: "numeric",
                  })} />
                )}
                {referral.paymentMethod && <CommRow label="Method" value={referral.paymentMethod} />}
                {referral.paymentReference && <CommRow label="Reference" value={referral.paymentReference} />}
              </>
            )}
          </div>
          {!isPaid && referral.commissionStatus === "PAYABLE" && (
            <p className="mt-4 text-xs text-blue-600 bg-blue-50 rounded-lg px-3 py-2">
              Your commission is ready. SuitePacific will process your payout shortly.
            </p>
          )}
          {!isPaid && referral.commissionStatus === "PENDING_PAYMENT" && (
            <p className="mt-4 text-xs text-amber-700 bg-amber-50 rounded-lg px-3 py-2">
              Commission confirmed. It becomes payable once the client pays their invoice.
            </p>
          )}
        </div>
      ) : referral.status === "WON" ? (
        <div className="bg-amber-50 border border-amber-100 rounded-2xl p-5 mb-6">
          <p className="text-sm text-amber-700">Deal is marked as Won. Commission details will appear here once confirmed.</p>
        </div>
      ) : null}

      {/* Activity timeline */}
      {referral.activities.length > 0 && (
        <div className="bg-white rounded-2xl border border-brand-100 p-6">
          <h2 className="font-semibold text-brand-900 text-sm mb-5">Activity</h2>
          <ol className="relative border-l border-brand-100 space-y-5 ml-1">
            {referral.activities.map((a) => (
              <li key={a.id} className="ml-5">
                <span className="absolute -left-1.5 h-3 w-3 rounded-full bg-brand-200 border-2 border-white" />
                <p className="text-sm text-brand-900">{a.description}</p>
                <p className="text-xs text-brand-400 mt-0.5">
                  {new Date(a.createdAt).toLocaleDateString("en-US", {
                    month: "short", day: "numeric", year: "numeric",
                  })}
                </p>
              </li>
            ))}
          </ol>
        </div>
      )}
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

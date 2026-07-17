import { redirect, notFound } from "next/navigation";
import { getPartnerFromRequest } from "@/lib/partner-auth";
import { prisma } from "@/lib/prisma";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { ReferralStatusBadge } from "@/components/portal/ReferralStatusBadge";

export default async function ReferralDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const partner = await getPartnerFromRequest();
  if (!partner) redirect("/partner-portal/login");

  const referral = await prisma.referral.findUnique({ where: { id } });
  if (!referral || referral.partnerId !== partner.id) notFound();

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

      <div className="bg-white rounded-2xl border border-brand-100 divide-y divide-brand-50">
        <Row label="Company" value={referral.companyName} />
        <Row label="Contact Name" value={referral.contactName ?? "-"} />
        <Row label="Contact Email" value={referral.contactEmail ?? "-"} />
        <Row
          label="Notes"
          value={referral.notes ?? "-"}
          multiline
        />
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

      {referral.status === "WON" && (
        <div className="mt-6 bg-emerald-50 border border-emerald-100 rounded-2xl p-5">
          <p className="text-sm font-semibold text-emerald-800 mb-3">Commission</p>
          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span className="text-emerald-700">Amount</span>
              <span className="font-medium text-emerald-900">
                {referral.commissionAmount != null
                  ? `$${referral.commissionAmount.toFixed(2)}`
                  : "To be confirmed"}
              </span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-emerald-700">Status</span>
              <span className={`font-medium ${referral.commissionPaid ? "text-emerald-900" : "text-amber-700"}`}>
                {referral.commissionPaid
                  ? `Paid${referral.commissionPaidAt ? " on " + new Date(referral.commissionPaidAt).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" }) : ""}`
                  : "Pending payment"}
              </span>
            </div>
          </div>
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

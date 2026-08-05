import { redirect } from "next/navigation";
import { getPartnerFromRequest } from "@/lib/partner-auth";
import { acceptAgreementAction } from "./actions";

export const dynamic = "force-dynamic";

export default async function AgreementPage() {
  const partner = await getPartnerFromRequest();
  if (!partner) redirect("/partner-portal/login");
  if (partner.agreementAcceptedAt) redirect("/partner-portal/dashboard");

  return (
    <div className="min-h-screen bg-brand-50/40 flex items-center justify-center px-4 py-12">
      <div className="w-full max-w-lg">
        <h1 className="text-xl font-semibold text-brand-900 mb-2">Partner Agreement</h1>
        <p className="text-sm text-brand-400 mb-6">
          Please review and accept the SuitePacific Partner Program terms before continuing.
        </p>

        <div className="bg-white rounded-2xl border border-brand-100 p-6 mb-6 space-y-4 text-sm text-brand-700 max-h-80 overflow-y-auto">
          <p className="font-semibold text-brand-900">SuitePacific Referral Partner Program - Terms</p>
          <p>By participating in the SuitePacific Partner Program, you agree to the following:</p>
          <ol className="list-decimal pl-5 space-y-2">
            <li>You will only refer companies that have expressed genuine interest in NetSuite services.</li>
            <li>Commissions are payable only on deals that are closed and invoiced by SuitePacific.</li>
            <li>Commission amounts and rates are determined at SuitePacific&apos;s discretion and confirmed in writing per deal.</li>
            <li>Commission is paid after the referred client has paid their invoice.</li>
            <li>Duplicate referrals (companies already in discussion with SuitePacific) are not eligible for commission.</li>
            <li>You agree to keep all referral and deal information confidential.</li>
            <li>SuitePacific reserves the right to modify or terminate the program with reasonable notice.</li>
          </ol>
          <p className="text-brand-400 text-xs">Last updated: 2025. Contact SuitePacific for the full agreement document.</p>
        </div>

        <form action={acceptAgreementAction}>
          <button
            type="submit"
            className="w-full rounded-full bg-brand text-white text-sm font-medium py-3 hover:bg-brand-700 transition-colors"
          >
            I accept the Partner Agreement
          </button>
        </form>

        <p className="mt-4 text-center text-xs text-brand-400">
          By clicking above, your acceptance timestamp and IP address will be recorded.
        </p>
      </div>
    </div>
  );
}

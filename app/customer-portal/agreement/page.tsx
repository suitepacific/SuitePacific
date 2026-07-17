import { redirect } from "next/navigation";
import { getCustomerFromRequest } from "@/lib/customer-auth";
import { acceptAgreementAction } from "./actions";

export const dynamic = "force-dynamic";

export default async function CustomerAgreementPage() {
  const customer = await getCustomerFromRequest();
  if (!customer) redirect("/customer-portal/login");
  if (customer.agreementAcceptedAt) redirect("/customer-portal/dashboard");

  return (
    <div className="min-h-screen bg-brand-50/40 flex items-center justify-center px-4 py-12">
      <div className="w-full max-w-lg">
        <p className="text-xs font-semibold uppercase tracking-widest text-accent mb-3">Client Portal</p>
        <h1 className="text-xl font-semibold text-brand-900 mb-2">Client Terms of Access</h1>
        <p className="text-sm text-brand-400 mb-6">
          Please review and accept these terms before accessing your portal.
        </p>

        <div className="bg-white rounded-2xl border border-brand-100 p-6 mb-6 space-y-4 text-sm text-brand-700 max-h-80 overflow-y-auto">
          <p className="font-semibold text-brand-900">SuitePacific Client Portal — Terms of Use</p>
          <ol className="list-decimal pl-5 space-y-2">
            <li>This portal is provided exclusively for active SuitePacific clients. Access is non-transferable.</li>
            <li>All information shared through the portal is confidential and subject to your service agreement with SuitePacific.</li>
            <li>Support requests submitted here are responded to during business hours. For urgent issues, contact your dedicated representative directly.</li>
            <li>Ticket response times are based on priority level and the terms of your service engagement.</li>
            <li>SuitePacific reserves the right to update these terms and notify clients of material changes.</li>
            <li>Do not share your portal credentials with anyone outside your organisation.</li>
          </ol>
          <p className="text-brand-400 text-xs mt-2">Questions? Contact SuitePacific directly.</p>
        </div>

        <form action={acceptAgreementAction}>
          <button
            type="submit"
            className="w-full rounded-full bg-brand text-white text-sm font-medium py-3 hover:bg-brand-700 transition-colors"
          >
            I accept the Terms of Access
          </button>
        </form>
        <p className="mt-4 text-center text-xs text-brand-400">
          Your acceptance timestamp and IP address will be recorded.
        </p>
      </div>
    </div>
  );
}

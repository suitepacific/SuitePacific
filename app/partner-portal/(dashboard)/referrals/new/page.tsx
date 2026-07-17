"use client";

import { useActionState } from "react";
import { submitReferralAction } from "@/app/partner-portal/(dashboard)/actions";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";

const initialState = { error: "" };

export default function SubmitReferralPage() {
  const [state, formAction, pending] = useActionState(submitReferralAction, initialState);

  const inp = "w-full rounded-xl border border-brand-200 px-4 py-2.5 text-sm text-brand-900 placeholder:text-brand-300 focus:outline-none focus:ring-2 focus:ring-accent/30 focus:border-accent";
  const lbl = "block text-sm font-medium text-brand-700 mb-1.5";
  const opt = "text-brand-300 font-normal";

  return (
    <div className="max-w-xl">
      <Link href="/partner-portal/referrals"
        className="inline-flex items-center gap-1.5 text-sm text-brand-400 hover:text-brand-900 mb-6">
        <ArrowLeft className="h-3.5 w-3.5" /> Back to Referrals
      </Link>

      <h1 className="text-xl font-semibold text-brand-900 mb-1">Submit a Referral</h1>
      <p className="text-sm text-brand-400 mb-8">Tell us about the company you&apos;re referring.</p>

      <div className="bg-white rounded-2xl border border-brand-100 p-6">
        <form action={formAction} className="space-y-5">
          <div>
            <label htmlFor="companyName" className={lbl}>
              Company Name <span className="text-red-500">*</span>
            </label>
            <input id="companyName" name="companyName" type="text" required
              placeholder="Acme Corp" className={inp} />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label htmlFor="contactName" className={lbl}>
                Contact Name <span className={opt}>(optional)</span>
              </label>
              <input id="contactName" name="contactName" type="text"
                placeholder="Jane Smith" className={inp} />
            </div>
            <div>
              <label htmlFor="contactEmail" className={lbl}>
                Contact Email <span className={opt}>(optional)</span>
              </label>
              <input id="contactEmail" name="contactEmail" type="email"
                placeholder="jane@acme.com" className={inp} />
            </div>
          </div>

          <div>
            <label htmlFor="contactWebsite" className={lbl}>
              Company Website <span className={opt}>(optional)</span>
            </label>
            <input id="contactWebsite" name="contactWebsite" type="url"
              placeholder="https://acme.com" className={inp} />
          </div>

          <div>
            <label htmlFor="partnerNotes" className={lbl}>
              Notes <span className={opt}>(optional)</span>
            </label>
            <textarea id="partnerNotes" name="partnerNotes" rows={4}
              placeholder="What does this company need? Any context about their NetSuite situation, budget, timeline…"
              className={`${inp} resize-none`} />
          </div>

          {state?.error && (
            <p className="text-sm text-red-600 bg-red-50 rounded-xl px-4 py-2.5">{state.error}</p>
          )}

          <button type="submit" disabled={pending}
            className="w-full rounded-full bg-brand text-white text-sm font-medium py-3 hover:bg-brand-700 transition-colors disabled:opacity-60">
            {pending ? "Submitting…" : "Submit Referral"}
          </button>
        </form>
      </div>
    </div>
  );
}

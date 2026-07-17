"use client";

import { useActionState } from "react";
import { submitReferralAction } from "@/app/partner-portal/(dashboard)/actions";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";

const initialState = { error: "" };

export default function SubmitReferralPage() {
  const [state, formAction, pending] = useActionState(submitReferralAction, initialState);

  return (
    <div className="max-w-xl">
      <Link
        href="/partner-portal/referrals"
        className="inline-flex items-center gap-1.5 text-sm text-brand-400 hover:text-brand-900 mb-6"
      >
        <ArrowLeft className="h-3.5 w-3.5" />
        Back to Referrals
      </Link>

      <h1 className="text-xl font-semibold text-brand-900 mb-1">Submit a Referral</h1>
      <p className="text-sm text-brand-400 mb-8">Tell us about the company you&apos;re referring.</p>

      <div className="bg-white rounded-2xl border border-brand-100 p-6">
        <form action={formAction} className="space-y-5">
          <div>
            <label htmlFor="companyName" className="block text-sm font-medium text-brand-700 mb-1.5">
              Company Name <span className="text-red-500">*</span>
            </label>
            <input
              id="companyName"
              name="companyName"
              type="text"
              required
              placeholder="Acme Corp"
              className="w-full rounded-xl border border-brand-200 px-4 py-2.5 text-sm text-brand-900 placeholder:text-brand-300 focus:outline-none focus:ring-2 focus:ring-accent/30 focus:border-accent"
            />
          </div>

          <div>
            <label htmlFor="contactName" className="block text-sm font-medium text-brand-700 mb-1.5">
              Contact Name <span className="text-brand-300 font-normal">(optional)</span>
            </label>
            <input
              id="contactName"
              name="contactName"
              type="text"
              placeholder="Jane Smith"
              className="w-full rounded-xl border border-brand-200 px-4 py-2.5 text-sm text-brand-900 placeholder:text-brand-300 focus:outline-none focus:ring-2 focus:ring-accent/30 focus:border-accent"
            />
          </div>

          <div>
            <label htmlFor="contactEmail" className="block text-sm font-medium text-brand-700 mb-1.5">
              Contact Email <span className="text-brand-300 font-normal">(optional)</span>
            </label>
            <input
              id="contactEmail"
              name="contactEmail"
              type="email"
              placeholder="jane@acme.com"
              className="w-full rounded-xl border border-brand-200 px-4 py-2.5 text-sm text-brand-900 placeholder:text-brand-300 focus:outline-none focus:ring-2 focus:ring-accent/30 focus:border-accent"
            />
          </div>

          <div>
            <label htmlFor="notes" className="block text-sm font-medium text-brand-700 mb-1.5">
              Notes <span className="text-brand-300 font-normal">(optional)</span>
            </label>
            <textarea
              id="notes"
              name="notes"
              rows={4}
              placeholder="What does this company need? Any context about their NetSuite situation..."
              className="w-full rounded-xl border border-brand-200 px-4 py-2.5 text-sm text-brand-900 placeholder:text-brand-300 focus:outline-none focus:ring-2 focus:ring-accent/30 focus:border-accent resize-none"
            />
          </div>

          {state?.error && (
            <p className="text-sm text-red-600 bg-red-50 rounded-xl px-4 py-2.5">{state.error}</p>
          )}

          <button
            type="submit"
            disabled={pending}
            className="w-full rounded-full bg-brand text-white text-sm font-medium py-3 hover:bg-brand-700 transition-colors disabled:opacity-60"
          >
            {pending ? "Submitting…" : "Submit Referral"}
          </button>
        </form>
      </div>
    </div>
  );
}

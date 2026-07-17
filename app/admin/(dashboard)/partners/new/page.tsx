"use client";

import { useActionState } from "react";
import { createPartnerAction } from "@/app/admin/(dashboard)/partners/actions";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";

const initialState = { error: "" };

export default function NewPartnerPage() {
  const [state, formAction, pending] = useActionState(createPartnerAction, initialState);

  const inp = "w-full rounded-xl border border-brand-200 px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-accent/30 focus:border-accent";
  const lbl = "block text-sm font-medium text-brand-700 mb-1.5";
  const opt = "text-brand-300 font-normal";

  return (
    <div className="max-w-lg">
      <Link href="/admin/partners"
        className="inline-flex items-center gap-1.5 text-sm text-brand-400 hover:text-brand-900 mb-6">
        <ArrowLeft className="h-3.5 w-3.5" />
        Back to Partners
      </Link>

      <h1 className="text-2xl font-semibold text-brand-900 mb-1">New Partner</h1>
      <p className="text-sm text-brand-400 mb-8">Create portal access for a referral partner.</p>

      <div className="bg-white rounded-2xl border border-brand-50 shadow-soft p-6">
        <form action={formAction} className="space-y-5">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label htmlFor="name" className={lbl}>
                Full Name <span className="text-red-500">*</span>
              </label>
              <input id="name" name="name" type="text" required placeholder="Jane Smith" className={inp} />
            </div>
            <div>
              <label htmlFor="email" className={lbl}>
                Email <span className="text-red-500">*</span>
              </label>
              <input id="email" name="email" type="email" required placeholder="jane@example.com" className={inp} />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label htmlFor="company" className={lbl}>
                Company <span className={opt}>(optional)</span>
              </label>
              <input id="company" name="company" type="text" placeholder="Acme Consulting" className={inp} />
            </div>
            <div>
              <label htmlFor="country" className={lbl}>
                Country <span className={opt}>(optional)</span>
              </label>
              <input id="country" name="country" type="text" placeholder="United States" className={inp} />
            </div>
          </div>

          <div>
            <label htmlFor="website" className={lbl}>
              Website <span className={opt}>(optional)</span>
            </label>
            <input id="website" name="website" type="url" placeholder="https://example.com" className={inp} />
          </div>

          <div>
            <label htmlFor="commissionRate" className={lbl}>
              Commission Rate % <span className={opt}>(optional — overrides global default)</span>
            </label>
            <input id="commissionRate" name="commissionRate" type="number" step="0.01" min="0" max="100"
              placeholder="e.g. 10" className={inp} />
          </div>

          <div>
            <label htmlFor="password" className={lbl}>
              Password <span className="text-red-500">*</span>
            </label>
            <input id="password" name="password" type="password" required minLength={8}
              placeholder="Min. 8 characters" className={inp} />
            <p className="text-xs text-brand-300 mt-1">Share this with the partner to log in. They can update their profile after signing in.</p>
          </div>

          {state?.error && (
            <p className="text-sm text-red-600 bg-red-50 rounded-xl px-4 py-2.5">{state.error}</p>
          )}

          <button type="submit" disabled={pending}
            className="w-full rounded-full bg-brand text-white text-sm font-medium py-3 hover:bg-brand-700 transition-colors disabled:opacity-60">
            {pending ? "Creating…" : "Create Partner"}
          </button>
        </form>
      </div>
    </div>
  );
}

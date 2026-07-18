"use client";

import { useActionState } from "react";
import { createCustomerAction } from "@/app/admin/(dashboard)/customers/actions";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";

const initialState = { error: "" };

export default function NewCustomerPage() {
  const [state, formAction, pending] = useActionState(createCustomerAction, initialState);

  const inp = "w-full rounded-xl border border-brand-200 px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-accent/30 focus:border-accent";
  const lbl = "block text-sm font-medium text-brand-700 mb-1.5";
  const opt = "text-brand-300 font-normal";

  return (
    <div className="max-w-lg">
      <Link href="/admin/customers"
        className="inline-flex items-center gap-1.5 text-sm text-brand-400 hover:text-brand-900 mb-6">
        <ArrowLeft className="h-3.5 w-3.5" />
        Back to Customers
      </Link>

      <h1 className="text-2xl font-semibold text-brand-900 mb-1">New Customer</h1>
      <p className="text-sm text-brand-400 mb-8">Create portal access for a client.</p>

      <div className="bg-white rounded-2xl border border-brand-50 shadow-soft p-6">
        <form action={formAction} className="space-y-5">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label htmlFor="name" className={lbl}>
                Contact Name <span className="text-red-500">*</span>
              </label>
              <input id="name" name="name" type="text" required placeholder="Jane Smith" className={inp} />
            </div>
            <div>
              <label htmlFor="email" className={lbl}>
                Email <span className="text-red-500">*</span>
              </label>
              <input id="email" name="email" type="email" required placeholder="jane@acme.com" className={inp} />
            </div>
          </div>

          <div>
            <label htmlFor="company" className={lbl}>
              Company <span className="text-red-500">*</span>
            </label>
            <input id="company" name="company" type="text" required placeholder="Acme Corp" className={inp} />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label htmlFor="website" className={lbl}>
                Website <span className={opt}>(optional)</span>
              </label>
              <input id="website" name="website" type="url" placeholder="https://acme.com" className={inp} />
            </div>
            <div>
              <label htmlFor="country" className={lbl}>
                Country <span className={opt}>(optional)</span>
              </label>
              <input id="country" name="country" type="text" placeholder="United States" className={inp} />
            </div>
          </div>

          <div>
            <label htmlFor="password" className={lbl}>
              Password <span className="text-red-500">*</span>
            </label>
            <input id="password" name="password" type="password" required minLength={8}
              placeholder="Min. 8 characters" className={inp} />
            <p className="text-xs text-brand-300 mt-1">Share this with the client to log in.</p>
          </div>

          <div className="border-t border-brand-50 pt-5">
            <p className="text-xs font-semibold text-brand-400 uppercase tracking-wide mb-4">Billing</p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label htmlFor="billingType" className={lbl}>Billing Type</label>
                <select id="billingType" name="billingType" className={inp}>
                  <option value="HOURLY">Hourly</option>
                  <option value="MONTHLY">Monthly Retainer</option>
                  <option value="HYBRID">Hybrid</option>
                </select>
              </div>
              <div>
                <label htmlFor="billingCurrency" className={lbl}>Currency</label>
                <input id="billingCurrency" name="billingCurrency" type="text" defaultValue="USD"
                  placeholder="USD" maxLength={10} className={inp} />
              </div>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-4">
              <div>
                <label htmlFor="hourlyRate" className={lbl}>
                  Hourly Rate <span className={opt}>(optional)</span>
                </label>
                <input id="hourlyRate" name="hourlyRate" type="number" min="0" step="0.01"
                  placeholder="e.g. 150.00" className={inp} />
              </div>
              <div>
                <label htmlFor="monthlyRate" className={lbl}>
                  Monthly Rate <span className={opt}>(optional)</span>
                </label>
                <input id="monthlyRate" name="monthlyRate" type="number" min="0" step="0.01"
                  placeholder="e.g. 3000.00" className={inp} />
              </div>
            </div>
          </div>

          {state?.error && (
            <p className="text-sm text-red-600 bg-red-50 rounded-xl px-4 py-2.5">{state.error}</p>
          )}

          <button type="submit" disabled={pending}
            className="w-full rounded-full bg-brand text-white text-sm font-medium py-3 hover:bg-brand-700 transition-colors disabled:opacity-60">
            {pending ? "Creating…" : "Create Customer"}
          </button>
        </form>
      </div>
    </div>
  );
}

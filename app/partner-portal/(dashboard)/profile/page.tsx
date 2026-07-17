"use client";

import { useActionState } from "react";
import { updatePartnerProfileAction } from "@/app/partner-portal/(dashboard)/actions";
import { useEffect, useState } from "react";

const PAYMENT_METHODS = [
  { value: "", label: "Select method" },
  { value: "bank_transfer", label: "Bank Transfer" },
  { value: "paypal", label: "PayPal" },
  { value: "wise", label: "Wise" },
  { value: "check", label: "Check" },
];

const initialState = {} as { error?: string; success?: boolean };

export default function ProfilePage() {
  const [state, formAction, pending] = useActionState(updatePartnerProfileAction, initialState);
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    if (state?.success) {
      setSaved(true);
      const t = setTimeout(() => setSaved(false), 3000);
      return () => clearTimeout(t);
    }
  }, [state]);

  const inp = "w-full rounded-xl border border-brand-200 px-4 py-2.5 text-sm text-brand-900 placeholder:text-brand-300 focus:outline-none focus:ring-2 focus:ring-accent/30 focus:border-accent";
  const lbl = "block text-sm font-medium text-brand-700 mb-1.5";
  const opt = "text-brand-300 font-normal";

  return (
    <div className="max-w-xl">
      <h1 className="text-xl font-semibold text-brand-900 mb-1">My Profile</h1>
      <p className="text-sm text-brand-400 mb-8">Keep your details up to date so we can pay you correctly.</p>

      <div className="bg-white rounded-2xl border border-brand-100 p-6">
        <form action={formAction} className="space-y-5">
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
            <label htmlFor="timezone" className={lbl}>
              Timezone <span className={opt}>(optional)</span>
            </label>
            <input id="timezone" name="timezone" type="text" placeholder="e.g. America/New_York" className={inp} />
          </div>

          <div>
            <label htmlFor="taxId" className={lbl}>
              Tax ID / ABN / GST <span className={opt}>(optional)</span>
            </label>
            <input id="taxId" name="taxId" type="text" placeholder="For invoicing purposes" className={inp} />
          </div>

          <div className="border-t border-brand-50 pt-5">
            <p className="text-sm font-semibold text-brand-900 mb-4">Payment Details</p>

            <div className="space-y-4">
              <div>
                <label htmlFor="preferredPaymentMethod" className={lbl}>
                  Preferred Method <span className={opt}>(optional)</span>
                </label>
                <select id="preferredPaymentMethod" name="preferredPaymentMethod" className={inp}>
                  {PAYMENT_METHODS.map((m) => (
                    <option key={m.value} value={m.value}>{m.label}</option>
                  ))}
                </select>
              </div>

              <div>
                <label htmlFor="paymentDetails" className={lbl}>
                  Payment Details <span className={opt}>(optional)</span>
                </label>
                <textarea id="paymentDetails" name="paymentDetails" rows={4}
                  placeholder="Bank account number, PayPal email, Wise handle, etc."
                  className={`${inp} resize-none`} />
                <p className="text-xs text-brand-400 mt-1.5">This information is only visible to SuitePacific staff.</p>
              </div>
            </div>
          </div>

          {state?.error && (
            <p className="text-sm text-red-600 bg-red-50 rounded-xl px-4 py-2.5">{state.error}</p>
          )}
          {saved && (
            <p className="text-sm text-emerald-700 bg-emerald-50 rounded-xl px-4 py-2.5">Profile updated.</p>
          )}

          <button type="submit" disabled={pending}
            className="w-full rounded-full bg-brand text-white text-sm font-medium py-3 hover:bg-brand-700 transition-colors disabled:opacity-60">
            {pending ? "Saving…" : "Save Changes"}
          </button>
        </form>
      </div>
    </div>
  );
}

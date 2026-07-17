"use client";

import { useActionState, useEffect, useState } from "react";
import { updatePartnerAction } from "@/app/admin/(dashboard)/partners/actions";

const PAYMENT_METHODS = [
  { value: "", label: "Not specified" },
  { value: "bank_transfer", label: "Bank Transfer" },
  { value: "paypal", label: "PayPal" },
  { value: "wise", label: "Wise" },
  { value: "check", label: "Check" },
];

interface Props {
  id: string;
  defaults: {
    company: string;
    website: string;
    country: string;
    timezone: string;
    commissionRate: string;
    preferredPaymentMethod: string;
    paymentDetails: string;
    taxId: string;
  };
}

const initialState = {} as { error?: string; success?: boolean };

export function PartnerEditForm({ id, defaults }: Props) {
  const [state, formAction, pending] = useActionState(updatePartnerAction, initialState);
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    if (state?.success) {
      setSaved(true);
      const t = setTimeout(() => setSaved(false), 3000);
      return () => clearTimeout(t);
    }
  }, [state]);

  const inp = "w-full rounded-xl border border-brand-200 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-accent/30 focus:border-accent";

  return (
    <div className="bg-white rounded-2xl border border-brand-50 shadow-soft p-5">
      <p className="text-xs font-semibold text-brand-400 uppercase tracking-wide mb-4">Edit Profile</p>
      <form action={formAction} className="space-y-3">
        <input type="hidden" name="id" value={id} />
        <div>
          <label className="block text-xs text-brand-500 mb-1">Company</label>
          <input name="company" type="text" defaultValue={defaults.company} placeholder="Acme Consulting" className={inp} />
        </div>
        <div>
          <label className="block text-xs text-brand-500 mb-1">Website</label>
          <input name="website" type="url" defaultValue={defaults.website} placeholder="https://example.com" className={inp} />
        </div>
        <div>
          <label className="block text-xs text-brand-500 mb-1">Country</label>
          <input name="country" type="text" defaultValue={defaults.country} placeholder="United States" className={inp} />
        </div>
        <div>
          <label className="block text-xs text-brand-500 mb-1">Timezone</label>
          <input name="timezone" type="text" defaultValue={defaults.timezone} placeholder="e.g. America/New_York" className={inp} />
        </div>
        <div>
          <label className="block text-xs text-brand-500 mb-1">Commission Rate %</label>
          <input name="commissionRate" type="number" step="0.01" min="0" max="100"
            defaultValue={defaults.commissionRate} placeholder="Leave blank for global default" className={inp} />
        </div>
        <div>
          <label className="block text-xs text-brand-500 mb-1">Tax ID</label>
          <input name="taxId" type="text" defaultValue={defaults.taxId} placeholder="For invoicing" className={inp} />
        </div>
        <div>
          <label className="block text-xs text-brand-500 mb-1">Payment Method</label>
          <select name="preferredPaymentMethod" defaultValue={defaults.preferredPaymentMethod} className={inp}>
            {PAYMENT_METHODS.map((m) => (
              <option key={m.value} value={m.value}>{m.label}</option>
            ))}
          </select>
        </div>
        <div>
          <label className="block text-xs text-brand-500 mb-1">Payment Details</label>
          <textarea name="paymentDetails" rows={3} defaultValue={defaults.paymentDetails}
            placeholder="Account numbers, PayPal, etc." className={`${inp} resize-none`} />
        </div>

        {state?.error && (
          <p className="text-xs text-red-600 bg-red-50 rounded-xl px-3 py-2">{state.error}</p>
        )}
        {saved && (
          <p className="text-xs text-emerald-700 bg-emerald-50 rounded-xl px-3 py-2">Saved.</p>
        )}

        <button type="submit" disabled={pending}
          className="w-full rounded-full bg-brand text-white text-sm font-medium py-2.5 hover:bg-brand-700 transition-colors disabled:opacity-60">
          {pending ? "Saving…" : "Save Changes"}
        </button>
      </form>
    </div>
  );
}

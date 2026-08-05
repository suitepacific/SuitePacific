"use client";

import { useActionState, useState, useEffect, useRef } from "react";
import { sendAdminInviteAction } from "./actions";
import { getSeatLimit, getClientLimit } from "@/lib/sc-plans";
import { Send } from "lucide-react";

const PLANS = ["free", "pro", "team"] as const;
type Plan = (typeof PLANS)[number];

export function SendInviteForm() {
  const [state, formAction, isPending] = useActionState(sendAdminInviteAction, {});
  const [plan, setPlan] = useState<Plan>("pro");
  const formRef = useRef<HTMLFormElement>(null);

  useEffect(() => {
    if (state.success) {
      formRef.current?.reset();
      setPlan("pro");
    }
  }, [state.success]);

  const defaultSeats = getSeatLimit(plan);
  const defaultClients = getClientLimit(plan);

  return (
    <form ref={formRef} action={formAction} className="space-y-5">
      <input type="hidden" name="plan" value={plan} />

      <div className="grid sm:grid-cols-2 gap-4">
        {/* Email */}
        <div>
          <label className="block text-xs font-medium text-brand-600 mb-1.5">Email <span className="text-red-400">*</span></label>
          <input
            name="email"
            type="email"
            required
            placeholder="partner@firm.com"
            className="w-full rounded-xl border border-brand-100 px-3.5 py-2.5 text-sm text-brand-900 placeholder:text-brand-300 focus:outline-none focus:ring-2 focus:ring-accent/30 focus:border-accent"
          />
        </div>

        {/* Name */}
        <div>
          <label className="block text-xs font-medium text-brand-600 mb-1.5">Name <span className="text-brand-300 font-normal">(optional - for personalized email)</span></label>
          <input
            name="name"
            type="text"
            placeholder="Jane Smith"
            className="w-full rounded-xl border border-brand-100 px-3.5 py-2.5 text-sm text-brand-900 placeholder:text-brand-300 focus:outline-none focus:ring-2 focus:ring-accent/30 focus:border-accent"
          />
        </div>
      </div>

      {/* Plan */}
      <div>
        <label className="block text-xs font-medium text-brand-600 mb-2">Plan</label>
        <div className="flex items-center gap-2">
          {PLANS.map((p) => (
            <button
              key={p}
              type="button"
              onClick={() => setPlan(p)}
              className={`rounded-full px-4 py-1.5 text-sm font-medium border transition-colors capitalize ${
                plan === p
                  ? "bg-accent text-white border-accent"
                  : "border-brand-100 text-brand-500 hover:border-brand-300 hover:text-brand-900"
              }`}
            >
              {p}
            </button>
          ))}
        </div>
      </div>

      <div className="grid sm:grid-cols-2 gap-4">
        {/* Seat limit */}
        <div>
          <label className="block text-xs font-medium text-brand-600 mb-1.5">
            Users <span className="text-brand-300 font-normal">(seat limit)</span>
          </label>
          <input
            key={`seats-${plan}`}
            name="seatLimit"
            type="number"
            min={1}
            max={500}
            defaultValue={defaultSeats}
            className="w-full rounded-xl border border-brand-100 px-3.5 py-2.5 text-sm text-brand-900 focus:outline-none focus:ring-2 focus:ring-accent/30 focus:border-accent"
          />
        </div>

        {/* Client limit */}
        <div>
          <label className="block text-xs font-medium text-brand-600 mb-1.5">
            NetSuite accounts <span className="text-brand-300 font-normal">(client limit)</span>
          </label>
          <input
            key={`clients-${plan}`}
            name="clientLimit"
            type="number"
            min={1}
            max={200}
            defaultValue={defaultClients}
            className="w-full rounded-xl border border-brand-100 px-3.5 py-2.5 text-sm text-brand-900 focus:outline-none focus:ring-2 focus:ring-accent/30 focus:border-accent"
          />
        </div>
      </div>

      {/* Require payment */}
      <div className="flex items-start gap-3 rounded-xl border border-brand-100 bg-brand-50/40 px-4 py-3">
        <input
          id="requirePayment"
          name="requirePayment"
          type="checkbox"
          className="mt-0.5 h-4 w-4 rounded border-brand-200 accent-accent cursor-pointer"
        />
        <label htmlFor="requirePayment" className="cursor-pointer select-none">
          <span className="text-sm font-medium text-brand-900">Require payment</span>
          <p className="text-xs text-brand-400 mt-0.5">
            If checked, the user will see a payment-due banner in their dashboard. Uncheck to give free access with the limits above.
          </p>
        </label>
      </div>

      {/* Notes */}
      <div>
        <label className="block text-xs font-medium text-brand-600 mb-1.5">Internal notes <span className="text-brand-300 font-normal">(optional, not sent to recipient)</span></label>
        <textarea
          name="notes"
          rows={2}
          placeholder="e.g. Met at SuiteWorld 2025, referred by John"
          className="w-full rounded-xl border border-brand-100 px-3.5 py-2.5 text-sm text-brand-900 placeholder:text-brand-300 focus:outline-none focus:ring-2 focus:ring-accent/30 focus:border-accent resize-none"
        />
      </div>

      {state.error && (
        <p className="text-sm text-red-500">{state.error}</p>
      )}

      {state.success && (
        <p className="text-sm text-emerald-600">Invite sent successfully.</p>
      )}

      <button
        type="submit"
        disabled={isPending}
        className="inline-flex items-center gap-2 rounded-full bg-accent px-5 py-2.5 text-sm font-semibold text-white hover:opacity-90 transition-opacity disabled:opacity-50"
      >
        <Send className="h-3.5 w-3.5" />
        {isPending ? "Sending…" : "Send invite"}
      </button>
    </form>
  );
}

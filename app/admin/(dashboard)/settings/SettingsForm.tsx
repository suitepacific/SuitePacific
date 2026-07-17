"use client";

import { useActionState } from "react";
import { updateSettingAction } from "@/app/admin/(dashboard)/settings/actions";
import { CheckCircle } from "lucide-react";

export function SettingsForm({ currentRate }: { currentRate: number }) {
  const [state, formAction, pending] = useActionState(updateSettingAction, null);

  return (
    <form action={formAction} className="space-y-4">
      <div>
        <label htmlFor="default_commission_rate" className="block text-sm font-medium text-brand-700 mb-1.5">
          Commission Rate (%)
        </label>
        <div className="flex items-center gap-3">
          <input
            id="default_commission_rate"
            name="default_commission_rate"
            type="number"
            step="0.1"
            min="0"
            max="100"
            defaultValue={currentRate}
            className="w-40 rounded-xl border border-brand-200 px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-accent/30 focus:border-accent"
          />
          <span className="text-sm text-brand-400">% of project value</span>
        </div>
      </div>

      {state?.error && (
        <p className="text-sm text-red-600 bg-red-50 rounded-xl px-4 py-2.5">{state.error}</p>
      )}
      {state?.success && (
        <p className="text-sm text-emerald-700 bg-emerald-50 rounded-xl px-4 py-2.5 flex items-center gap-2">
          <CheckCircle className="h-4 w-4" /> Saved.
        </p>
      )}

      <button
        type="submit"
        disabled={pending}
        className="rounded-full bg-brand text-white text-sm font-medium px-6 py-2.5 hover:bg-brand-700 transition-colors disabled:opacity-60"
      >
        {pending ? "Saving…" : "Save"}
      </button>
    </form>
  );
}

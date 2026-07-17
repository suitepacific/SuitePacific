"use client";

import { useActionState, useEffect, useState } from "react";
import { updateCustomerAction } from "@/app/admin/(dashboard)/customers/actions";

const initialState = {} as { error?: string; success?: boolean };

interface Props {
  id: string;
  defaults: { company: string; website: string; country: string; timezone: string };
}

export function CustomerEditForm({ id, defaults }: Props) {
  const [state, formAction, pending] = useActionState(updateCustomerAction, initialState);
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
      <p className="text-xs font-semibold text-brand-400 uppercase tracking-wide mb-4">Edit Details</p>
      <form action={formAction} className="space-y-3">
        <input type="hidden" name="id" value={id} />
        <div>
          <label className="block text-xs text-brand-500 mb-1">Company <span className="text-red-400">*</span></label>
          <input name="company" type="text" required defaultValue={defaults.company} className={inp} />
        </div>
        <div>
          <label className="block text-xs text-brand-500 mb-1">Website</label>
          <input name="website" type="url" defaultValue={defaults.website} placeholder="https://..." className={inp} />
        </div>
        <div>
          <label className="block text-xs text-brand-500 mb-1">Country</label>
          <input name="country" type="text" defaultValue={defaults.country} className={inp} />
        </div>
        <div>
          <label className="block text-xs text-brand-500 mb-1">Timezone</label>
          <input name="timezone" type="text" defaultValue={defaults.timezone} placeholder="e.g. UTC+5:30" className={inp} />
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

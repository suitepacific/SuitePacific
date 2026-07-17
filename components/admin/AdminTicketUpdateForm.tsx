"use client";

import { useActionState, useEffect, useState } from "react";
import { updateTicketAction } from "@/app/admin/(dashboard)/tickets/actions";

const STATUSES = [
  { value: "OPEN", label: "Open" },
  { value: "IN_PROGRESS", label: "In Progress" },
  { value: "PENDING_CUSTOMER", label: "Pending Customer" },
  { value: "RESOLVED", label: "Resolved" },
  { value: "CLOSED", label: "Closed" },
];
const PRIORITIES = [
  { value: "LOW", label: "Low" },
  { value: "NORMAL", label: "Normal" },
  { value: "HIGH", label: "High" },
  { value: "URGENT", label: "Urgent" },
];
const TYPES = [
  { value: "SUPPORT", label: "Support" },
  { value: "DEVELOPMENT", label: "Development" },
  { value: "QUESTION", label: "Question" },
  { value: "OPTIMIZATION", label: "Optimisation" },
];

interface Props {
  id: string;
  defaults: { status: string; priority: string; type: string; assignedTo: string; internalNotes: string };
}

const initialState = {} as { error?: string; success?: boolean };

export function AdminTicketUpdateForm({ id, defaults }: Props) {
  const [state, formAction, pending] = useActionState(updateTicketAction, initialState);
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    if (state?.success) {
      setSaved(true);
      const t = setTimeout(() => setSaved(false), 3000);
      return () => clearTimeout(t);
    }
  }, [state]);

  const sel = "w-full rounded-xl border border-brand-200 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-accent/30 focus:border-accent";
  const inp = `${sel}`;

  return (
    <div className="bg-white rounded-2xl border border-brand-50 shadow-soft p-5">
      <p className="text-xs font-semibold text-brand-400 uppercase tracking-wide mb-4">Ticket Details</p>
      <form action={formAction} className="space-y-3">
        <input type="hidden" name="id" value={id} />
        <div>
          <label className="block text-xs text-brand-500 mb-1">Status</label>
          <select name="status" defaultValue={defaults.status} className={sel}>
            {STATUSES.map((s) => <option key={s.value} value={s.value}>{s.label}</option>)}
          </select>
        </div>
        <div>
          <label className="block text-xs text-brand-500 mb-1">Priority</label>
          <select name="priority" defaultValue={defaults.priority} className={sel}>
            {PRIORITIES.map((p) => <option key={p.value} value={p.value}>{p.label}</option>)}
          </select>
        </div>
        <div>
          <label className="block text-xs text-brand-500 mb-1">Type</label>
          <select name="type" defaultValue={defaults.type} className={sel}>
            {TYPES.map((t) => <option key={t.value} value={t.value}>{t.label}</option>)}
          </select>
        </div>
        <div>
          <label className="block text-xs text-brand-500 mb-1">Assigned To</label>
          <input name="assignedTo" type="text" defaultValue={defaults.assignedTo}
            placeholder="Team member name" className={inp} />
        </div>
        <div>
          <label className="block text-xs text-brand-500 mb-1">Internal Notes</label>
          <textarea name="internalNotes" rows={4} defaultValue={defaults.internalNotes}
            placeholder="Private notes — not visible to the client"
            className={`${inp} resize-none`} />
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

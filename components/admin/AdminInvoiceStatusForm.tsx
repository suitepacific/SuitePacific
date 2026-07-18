"use client";

import { useActionState, useEffect, useState } from "react";
import { updateInvoiceStatusAction } from "@/app/admin/(dashboard)/invoices/actions";

const TRANSITIONS: Record<string, { value: string; label: string; className: string }[]> = {
  DRAFT: [{ value: "SENT", label: "Mark as Sent", className: "bg-blue-600 text-white hover:bg-blue-700" }],
  SENT: [
    { value: "PAID", label: "Mark as Paid", className: "bg-emerald-600 text-white hover:bg-emerald-700" },
    { value: "VOID", label: "Void Invoice", className: "border border-red-200 text-red-600 hover:bg-red-50" },
  ],
  PAID: [],
  VOID: [],
};

const initialState = {} as { error?: string; success?: boolean };

export function AdminInvoiceStatusForm({ id, currentStatus }: { id: string; currentStatus: string }) {
  const [state, formAction, pending] = useActionState(updateInvoiceStatusAction, initialState);
  const [saved, setSaved] = useState(false);
  const transitions = TRANSITIONS[currentStatus] ?? [];

  useEffect(() => {
    if (state?.success) { setSaved(true); setTimeout(() => setSaved(false), 3000); }
  }, [state]);

  if (transitions.length === 0) return null;

  return (
    <div className="flex items-center gap-2 flex-wrap shrink-0">
      {transitions.map((t) => (
        <form key={t.value} action={formAction}>
          <input type="hidden" name="id" value={id} />
          <input type="hidden" name="status" value={t.value} />
          <button type="submit" disabled={pending}
            className={`text-sm px-4 py-2 rounded-full font-medium transition-colors disabled:opacity-60 ${t.className}`}>
            {t.label}
          </button>
        </form>
      ))}
      {saved && <span className="text-xs text-emerald-600">Saved.</span>}
    </div>
  );
}

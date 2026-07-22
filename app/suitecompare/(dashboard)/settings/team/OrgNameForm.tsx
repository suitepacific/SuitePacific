"use client";

import { useActionState } from "react";
import { CheckCircle2, Loader2 } from "lucide-react";
import { updateOrgNameAction } from "./actions";

export function OrgNameForm({ currentName }: { currentName: string }) {
  const [state, action, pending] = useActionState(updateOrgNameAction, {});

  return (
    <div className="mb-6 bg-white rounded-xl border border-brand-100 p-5">
      <p className="text-sm font-medium text-brand-700 mb-3">Organization name</p>
      <form action={action} className="flex gap-2">
        <input
          name="name"
          type="text"
          required
          maxLength={100}
          defaultValue={currentName}
          placeholder="Your organization name"
          className="flex-1 rounded-xl border border-brand-100 bg-brand-50/40 px-4 py-2.5 text-sm text-brand-900 placeholder-brand-300 outline-none focus:border-accent focus:ring-2 focus:ring-accent/20 transition"
        />
        <button
          type="submit"
          disabled={pending}
          className="inline-flex items-center gap-2 rounded-xl bg-brand-900 px-4 py-2.5 text-sm font-medium text-white hover:bg-brand-700 disabled:opacity-50 transition-colors whitespace-nowrap"
        >
          {pending && <Loader2 className="h-4 w-4 animate-spin" />}
          {pending ? "Saving..." : "Save"}
        </button>
      </form>
      {state.error && <p className="mt-2 text-xs text-red-500">{state.error}</p>}
      {!pending && state.success && (
        <p className="mt-2 flex items-center gap-1.5 text-xs text-emerald-600">
          <CheckCircle2 className="h-3.5 w-3.5" />
          Organization name updated.
        </p>
      )}
    </div>
  );
}

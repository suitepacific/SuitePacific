"use client";

import { useActionState } from "react";
import Link from "next/link";
import { logTimeAction } from "../actions";

export function LogTimeForm() {
  const [state, action, pending] = useActionState(logTimeAction, null);
  const today = new Date().toISOString().split("T")[0];

  return (
    <div className="max-w-lg">
      <div className="mb-6">
        <Link href="/employee-portal/time-entries" className="text-sm text-brand-400 hover:text-accent transition-colors">
          &larr; Back to My Time
        </Link>
        <h1 className="mt-3 text-2xl font-semibold text-brand-900">Log Time</h1>
        <p className="mt-1 text-sm text-brand-400">Record the time you worked today.</p>
      </div>

      <form action={action} className="bg-white rounded-2xl border border-brand-50 shadow-soft p-6 space-y-5">
        {state?.error && (
          <p className="text-sm text-red-600 bg-red-50 rounded-xl px-4 py-3">{state.error}</p>
        )}

        <div>
          <label className="block text-sm font-medium text-brand-700 mb-1.5">Date</label>
          <input
            name="date"
            type="date"
            required
            defaultValue={today}
            max={today}
            className="w-full rounded-xl border border-brand-100 px-3 py-2 text-sm text-brand-900 focus:outline-none focus:ring-2 focus:ring-brand/30"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-brand-700 mb-1.5">Hours</label>
          <input
            name="hours"
            type="number"
            required
            min="0.25"
            max="24"
            step="0.25"
            placeholder="e.g. 2.5"
            className="w-full rounded-xl border border-brand-100 px-3 py-2 text-sm text-brand-900 focus:outline-none focus:ring-2 focus:ring-brand/30"
          />
          <p className="mt-1 text-xs text-brand-400">Enter in 15-minute increments (0.25, 0.5, 0.75, 1, etc.)</p>
        </div>

        <div>
          <label className="block text-sm font-medium text-brand-700 mb-1.5">What did you work on?</label>
          <textarea
            name="description"
            required
            maxLength={1000}
            rows={4}
            placeholder="Describe the work you completed..."
            className="w-full rounded-xl border border-brand-100 px-3 py-2 text-sm text-brand-900 focus:outline-none focus:ring-2 focus:ring-brand/30 resize-none"
          />
        </div>

        <div className="pt-2 flex gap-3">
          <button
            type="submit"
            disabled={pending}
            className="rounded-full bg-brand text-white text-sm font-medium px-5 py-2 hover:bg-brand-700 disabled:opacity-50 transition-colors"
          >
            {pending ? "Saving..." : "Log Time"}
          </button>
          <Link href="/employee-portal/time-entries"
            className="rounded-full border border-brand-100 text-brand-500 text-sm font-medium px-5 py-2 hover:border-brand-300 transition-colors">
            Cancel
          </Link>
        </div>
      </form>
    </div>
  );
}

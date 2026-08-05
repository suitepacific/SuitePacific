"use client";

import { useActionState } from "react";
import { submitTicketAction } from "@/app/customer-portal/(dashboard)/actions";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";

const initialState = { error: "" };

const TYPES = [
  { value: "SUPPORT", label: "Support Issue", desc: "Bug, error, or something not working" },
  { value: "DEVELOPMENT", label: "Development Request", desc: "New script, workflow, integration, or customisation" },
  { value: "QUESTION", label: "Question", desc: "How-to or general NetSuite question" },
  { value: "OPTIMIZATION", label: "Optimisation", desc: "Improve performance, clean up configuration" },
];

const PRIORITIES = [
  { value: "LOW", label: "Low - not urgent" },
  { value: "NORMAL", label: "Normal - standard timeline" },
  { value: "HIGH", label: "High - impacting operations" },
  { value: "URGENT", label: "Urgent - blocking production" },
];

export default function NewTicketPage() {
  const [state, formAction, pending] = useActionState(submitTicketAction, initialState);

  const inp = "w-full rounded-xl border border-brand-200 px-4 py-2.5 text-sm text-brand-900 placeholder:text-brand-300 focus:outline-none focus:ring-2 focus:ring-accent/30 focus:border-accent";
  const lbl = "block text-sm font-medium text-brand-700 mb-1.5";

  return (
    <div className="max-w-xl">
      <Link href="/customer-portal/tickets"
        className="inline-flex items-center gap-1.5 text-sm text-brand-400 hover:text-brand-900 mb-6">
        <ArrowLeft className="h-3.5 w-3.5" /> Back to Tickets
      </Link>

      <h1 className="text-xl font-semibold text-brand-900 mb-1">Submit a Request</h1>
      <p className="text-sm text-brand-400 mb-8">Tell us what you need. Be as specific as possible.</p>

      <div className="bg-white rounded-2xl border border-brand-100 p-6">
        <form action={formAction} className="space-y-5">
          <div>
            <label htmlFor="title" className={lbl}>
              Title <span className="text-red-500">*</span>
            </label>
            <input id="title" name="title" type="text" required maxLength={200}
              placeholder="e.g. Sales order approval not triggering email"
              className={inp} />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label htmlFor="type" className={lbl}>Request Type</label>
              <select id="type" name="type" className={inp}>
                {TYPES.map((t) => (
                  <option key={t.value} value={t.value}>{t.label}</option>
                ))}
              </select>
              <p className="text-xs text-brand-400 mt-1">
                {TYPES.find((_t) => true)?.desc}
              </p>
            </div>
            <div>
              <label htmlFor="priority" className={lbl}>Priority</label>
              <select id="priority" name="priority" className={inp}>
                {PRIORITIES.map((p) => (
                  <option key={p.value} value={p.value}>{p.label}</option>
                ))}
              </select>
            </div>
          </div>

          <div>
            <label htmlFor="description" className={lbl}>
              Description <span className="text-red-500">*</span>
            </label>
            <textarea id="description" name="description" required rows={8}
              placeholder="Describe the issue or request in detail. Include:&#10;• What you&apos;re trying to do&#10;• What&apos;s currently happening vs. what you expect&#10;• Any error messages&#10;• NetSuite record types or scripts involved"
              className={`${inp} resize-none`} />
          </div>

          {state?.error && (
            <p className="text-sm text-red-600 bg-red-50 rounded-xl px-4 py-2.5">{state.error}</p>
          )}

          <button type="submit" disabled={pending}
            className="w-full rounded-full bg-brand text-white text-sm font-medium py-3 hover:bg-brand-700 transition-colors disabled:opacity-60">
            {pending ? "Submitting…" : "Submit Request"}
          </button>
        </form>
      </div>
    </div>
  );
}

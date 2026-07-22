"use client";

import { useActionState } from "react";
import { activateAdminInviteAction } from "./actions";

interface Props {
  token: string;
  email: string;
  plan: string;
  seatLimit: number;
  clientLimit: number;
  requirePayment: boolean;
}

const PLAN_LABELS: Record<string, string> = { free: "Free", pro: "Pro", team: "Team" };

export function ActivateForm({ token, email, plan, seatLimit, clientLimit, requirePayment }: Props) {
  const [state, formAction, isPending] = useActionState(activateAdminInviteAction, {});

  return (
    <div className="min-h-screen bg-brand-50/40 flex items-center justify-center px-4 py-16">
      <div className="w-full max-w-md">
        {/* Plan summary card */}
        <div className="mb-6 rounded-2xl bg-white border border-brand-100 shadow-soft p-5">
          <p className="text-xs font-semibold text-brand-400 uppercase tracking-wide mb-3">Your SuiteCompare access</p>
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm text-brand-600">Plan</span>
            <span className="text-sm font-semibold text-brand-900">{PLAN_LABELS[plan] ?? plan}</span>
          </div>
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm text-brand-600">Users</span>
            <span className="text-sm font-semibold text-brand-900">{seatLimit}</span>
          </div>
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm text-brand-600">NetSuite accounts</span>
            <span className="text-sm font-semibold text-brand-900">{clientLimit}</span>
          </div>
          <div className="flex items-start justify-between gap-4">
            <span className="text-sm text-brand-600 shrink-0">Billing</span>
            {requirePayment ? (
              <div className="text-right">
                <p className="text-sm font-medium text-amber-600">Payment required</p>
                <p className="text-xs text-brand-400 mt-0.5">SuitePacific will contact you to arrange payment.</p>
              </div>
            ) : (
              <span className="text-sm font-medium text-emerald-600">Complimentary</span>
            )}
          </div>
        </div>

        {/* Activation form */}
        <div className="rounded-2xl bg-white border border-brand-100 shadow-soft p-8">
          <div className="mb-6">
            <p className="text-xs font-semibold text-accent uppercase tracking-widest mb-2">SuiteCompare</p>
            <h1 className="text-2xl font-bold text-brand-900">Activate your account</h1>
            <p className="text-sm text-brand-400 mt-1.5">Set a name and password for <strong className="text-brand-700">{email}</strong></p>
          </div>

          <form action={formAction} className="space-y-4">
            <input type="hidden" name="token" value={token} />

            <div>
              <label className="block text-xs font-medium text-brand-600 mb-1.5">Your name</label>
              <input
                name="name"
                type="text"
                required
                autoFocus
                placeholder="Jane Smith"
                className="w-full rounded-xl border border-brand-100 px-4 py-2.5 text-sm text-brand-900 placeholder:text-brand-300 focus:outline-none focus:ring-2 focus:ring-accent/30 focus:border-accent"
              />
            </div>

            <div>
              <label className="block text-xs font-medium text-brand-600 mb-1.5">Password</label>
              <input
                name="password"
                type="password"
                required
                placeholder="Min. 8 characters"
                className="w-full rounded-xl border border-brand-100 px-4 py-2.5 text-sm text-brand-900 placeholder:text-brand-300 focus:outline-none focus:ring-2 focus:ring-accent/30 focus:border-accent"
              />
            </div>

            <div>
              <label className="block text-xs font-medium text-brand-600 mb-1.5">Confirm password</label>
              <input
                name="confirm"
                type="password"
                required
                placeholder="Repeat your password"
                className="w-full rounded-xl border border-brand-100 px-4 py-2.5 text-sm text-brand-900 placeholder:text-brand-300 focus:outline-none focus:ring-2 focus:ring-accent/30 focus:border-accent"
              />
            </div>

            {state.error && (
              <p className="rounded-xl bg-red-50 border border-red-100 px-4 py-3 text-sm text-red-600">{state.error}</p>
            )}

            <button
              type="submit"
              disabled={isPending}
              className="w-full rounded-full bg-accent py-3 text-sm font-semibold text-white hover:opacity-90 transition-opacity disabled:opacity-50"
            >
              {isPending ? "Activating…" : "Activate account"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

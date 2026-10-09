"use client";

import { useActionState } from "react";
import { loginAction } from "@/app/employee-portal/actions";

const initialState = { error: "" };

export default function EmployeeLoginPage() {
  const [state, formAction, pending] = useActionState(loginAction, initialState);

  return (
    <div className="min-h-screen bg-brand-50/40 flex items-center justify-center px-4">
      <div className="w-full max-w-sm">
        <div className="mb-8 text-center">
          <p className="text-xs font-semibold uppercase tracking-widest text-accent mb-2">
            Employee Portal
          </p>
          <h1 className="text-2xl font-semibold text-brand-900">Sign in</h1>
          <p className="mt-1 text-sm text-brand-400">Log your time for your assigned clients.</p>
        </div>

        <div className="bg-white rounded-2xl border border-brand-100 p-6 shadow-soft">
          <form action={formAction} className="space-y-4">
            <div>
              <label htmlFor="username" className="block text-sm font-medium text-brand-700 mb-1.5">
                Username
              </label>
              <input
                id="username"
                name="username"
                type="text"
                required
                autoComplete="username"
                placeholder="your.username"
                className="w-full rounded-xl border border-brand-200 px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-accent/30 focus:border-accent"
              />
            </div>
            <div>
              <label htmlFor="password" className="block text-sm font-medium text-brand-700 mb-1.5">
                Password
              </label>
              <input
                id="password"
                name="password"
                type="password"
                required
                autoComplete="current-password"
                placeholder="••••••••"
                className="w-full rounded-xl border border-brand-200 px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-accent/30 focus:border-accent"
              />
            </div>

            {state?.error && (
              <p className="text-sm text-red-600 bg-red-50 rounded-xl px-4 py-2.5">{state.error}</p>
            )}

            <button
              type="submit"
              disabled={pending}
              className="w-full rounded-full bg-brand text-white text-sm font-medium py-3 hover:bg-brand-700 transition-colors disabled:opacity-60"
            >
              {pending ? "Signing in..." : "Sign In"}
            </button>
          </form>
        </div>

        <p className="mt-6 text-center text-xs text-brand-400">
          Need access? Contact your administrator.
        </p>
      </div>
    </div>
  );
}

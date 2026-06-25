"use client";

import { useActionState } from "react";
import { Lock } from "lucide-react";
import { loginAction } from "@/app/admin/actions";

export default function AdminLoginPage() {
  const [state, formAction, pending] = useActionState(
    async (_prev: { error?: string } | null, formData: FormData) => loginAction(formData),
    null
  );

  return (
    <div className="min-h-screen flex items-center justify-center px-6">
      <div className="w-full max-w-sm bg-white rounded-2xl shadow-soft-lg border border-brand-50 p-8">
        <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-brand-50 text-brand mb-5">
          <Lock className="h-5 w-5" />
        </div>
        <h1 className="text-xl font-semibold text-brand-900">Admin Login</h1>
        <p className="mt-1 text-sm text-brand-400">SuitePacific internal dashboard.</p>

        <form action={formAction} className="mt-6 space-y-4">
          <div>
            <label htmlFor="password" className="block text-sm font-medium text-brand-700 mb-1.5">
              Password
            </label>
            <input
              id="password"
              name="password"
              type="password"
              required
              autoFocus
              className="w-full rounded-lg border border-brand-100 px-3.5 py-2.5 text-sm text-brand-900 focus:outline-none focus:ring-2 focus:ring-accent/40 focus:border-accent"
            />
          </div>

          {state?.error && <p className="text-sm text-red-500">{state.error}</p>}

          <button
            type="submit"
            disabled={pending}
            className="w-full rounded-full bg-brand text-white font-medium px-6 py-2.5 text-sm shadow-soft hover:bg-brand-700 transition-colors disabled:opacity-60"
          >
            {pending ? "Signing in..." : "Sign In"}
          </button>
        </form>
      </div>
    </div>
  );
}

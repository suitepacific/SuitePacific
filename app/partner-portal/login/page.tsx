"use client";

import { useActionState } from "react";
import { loginAction } from "@/app/partner-portal/actions";
import { Loader2 } from "lucide-react";
import Image from "next/image";

export default function PartnerLoginPage() {
  const [state, formAction, isPending] = useActionState(loginAction, {});

  return (
    <div className="min-h-screen bg-brand-50/40 flex items-center justify-center px-4">
      <div className="w-full max-w-sm">
        <div className="mb-8 text-center">
          <Image src="/logo-full.jpeg" alt="SuitePacific" width={160} height={40} className="mx-auto h-10 w-auto" />
          <h1 className="mt-6 text-xl font-semibold text-brand-900">Partner Portal</h1>
          <p className="mt-1 text-sm text-brand-400">Sign in to manage your referrals</p>
        </div>

        <div className="bg-white rounded-2xl border border-brand-100 shadow-soft p-7">
          <form action={formAction} className="space-y-4">
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-brand-700 mb-1.5">
                Email
              </label>
              <input
                id="email"
                name="email"
                type="email"
                required
                autoComplete="email"
                className="w-full rounded-lg border border-brand-100 px-3.5 py-2.5 text-sm text-brand-900 placeholder:text-brand-300 focus:outline-none focus:ring-2 focus:ring-accent/40 focus:border-accent"
                placeholder="you@company.com"
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
                className="w-full rounded-lg border border-brand-100 px-3.5 py-2.5 text-sm text-brand-900 placeholder:text-brand-300 focus:outline-none focus:ring-2 focus:ring-accent/40 focus:border-accent"
              />
            </div>

            {state?.error && (
              <p className="text-sm text-red-500">{state.error}</p>
            )}

            <button
              type="submit"
              disabled={isPending}
              className="w-full inline-flex items-center justify-center gap-2 rounded-full bg-brand text-white font-medium px-6 py-2.5 text-sm shadow-soft hover:bg-brand-700 transition-colors disabled:opacity-60"
            >
              {isPending && <Loader2 className="h-4 w-4 animate-spin" />}
              {isPending ? "Signing in..." : "Sign In"}
            </button>
          </form>
        </div>

        <p className="mt-6 text-center text-xs text-brand-400">
          Need access?{" "}
          <a href="mailto:info@suitepacific.com" className="text-accent hover:underline">
            Contact SuitePacific
          </a>
        </p>
      </div>
    </div>
  );
}

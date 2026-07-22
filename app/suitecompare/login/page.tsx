"use client";

import { useActionState } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import { GitCompare, Loader2 } from "lucide-react";
import { loginScAction } from "@/app/suitecompare/actions";

export default function SuiteCompareLoginPage() {
  const searchParams = useSearchParams();
  const inviteToken = searchParams.get("invite") ?? "";
  const [state, formAction, isPending] = useActionState(loginScAction, {});

  return (
    <div className="min-h-screen bg-brand-50/40 flex items-center justify-center px-4">
      <div className="w-full max-w-sm">
        <div className="mb-8 text-center">
          <Link href="/suitecompare" className="inline-flex flex-col items-center group">
            <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-accent/10 group-hover:bg-accent/20 transition-colors">
              <GitCompare className="h-6 w-6 text-accent" />
            </div>
            <h1 className="text-xl font-semibold text-brand-900 group-hover:text-accent transition-colors">SuiteCompare</h1>
          </Link>
          <p className="mt-1 text-sm text-brand-400">Sign in to your account</p>
        </div>

        <div className="bg-white rounded-2xl border border-brand-100 shadow-soft p-7">
          <form action={formAction} className="space-y-4">
            {inviteToken && <input type="hidden" name="inviteToken" value={inviteToken} />}
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
              <div className="flex items-center justify-between mb-1.5">
                <label htmlFor="password" className="text-sm font-medium text-brand-700">
                  Password
                </label>
                <Link href="/suitecompare/forgot-password" className="text-xs text-accent hover:underline">
                  Forgot password?
                </Link>
              </div>
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
              className="w-full inline-flex items-center justify-center gap-2 rounded-full bg-accent text-white font-medium px-6 py-2.5 text-sm shadow-soft hover:bg-accent/90 transition-colors disabled:opacity-60"
            >
              {isPending && <Loader2 className="h-4 w-4 animate-spin" />}
              {isPending ? "Signing in..." : "Sign In"}
            </button>
          </form>
        </div>

        <p className="mt-6 text-center text-xs text-brand-400">
          Don&apos;t have an account?{" "}
          <Link href="/suitecompare/signup" className="text-accent hover:underline">
            Sign up free
          </Link>
        </p>
      </div>
    </div>
  );
}

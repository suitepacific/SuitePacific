"use client";

import { useActionState } from "react";
import Link from "next/link";
import { GitCompare, Loader2, MailCheck } from "lucide-react";
import { forgotPasswordAction } from "@/app/suitecompare/actions";

export default function ForgotPasswordPage() {
  const [state, formAction, isPending] = useActionState(forgotPasswordAction, {});

  const inputCls =
    "w-full rounded-lg border border-brand-100 px-3.5 py-2.5 text-sm text-brand-900 placeholder:text-brand-300 focus:outline-none focus:ring-2 focus:ring-accent/40 focus:border-accent";

  return (
    <div className="min-h-screen bg-brand-50/40 flex items-center justify-center px-4 py-12">
      <div className="w-full max-w-sm">
        <div className="mb-8 text-center">
          <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-accent/10">
            <GitCompare className="h-6 w-6 text-accent" />
          </div>
          <h1 className="text-xl font-semibold text-brand-900">Reset your password</h1>
          <p className="mt-1 text-sm text-brand-400">
            Enter your email and we&apos;ll send a reset link.
          </p>
        </div>

        <div className="bg-white rounded-2xl border border-brand-100 shadow-soft p-7">
          {state.success ? (
            <div className="text-center py-2">
              <div className="mx-auto mb-4 flex h-11 w-11 items-center justify-center rounded-xl bg-emerald-50">
                <MailCheck className="h-6 w-6 text-emerald-600" />
              </div>
              <p className="text-sm font-medium text-brand-900">Check your email</p>
              <p className="mt-1.5 text-sm text-brand-400">
                If an account exists for that address, a reset link is on its way. It expires in 1 hour.
              </p>
            </div>
          ) : (
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
                  autoFocus
                  className={inputCls}
                  placeholder="you@company.com"
                />
              </div>

              {state.error && (
                <p className="text-sm text-red-500">{state.error}</p>
              )}

              <button
                type="submit"
                disabled={isPending}
                className="w-full inline-flex items-center justify-center gap-2 rounded-full bg-accent text-white font-medium px-6 py-2.5 text-sm shadow-soft hover:bg-accent/90 transition-colors disabled:opacity-60"
              >
                {isPending && <Loader2 className="h-4 w-4 animate-spin" />}
                {isPending ? "Sending..." : "Send reset link"}
              </button>
            </form>
          )}
        </div>

        <p className="mt-6 text-center text-xs text-brand-400">
          <Link href="/suitecompare/login" className="text-accent hover:underline">
            Back to sign in
          </Link>
        </p>
      </div>
    </div>
  );
}

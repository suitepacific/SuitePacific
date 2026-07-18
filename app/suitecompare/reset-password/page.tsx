"use client";

import { useActionState } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import { GitCompare, Loader2 } from "lucide-react";
import { resetPasswordAction } from "@/app/suitecompare/actions";

export default function ResetPasswordPage() {
  const searchParams = useSearchParams();
  const token = searchParams.get("token") ?? "";

  const [state, formAction, isPending] = useActionState(resetPasswordAction, {});

  const inputCls =
    "w-full rounded-lg border border-brand-100 px-3.5 py-2.5 text-sm text-brand-900 placeholder:text-brand-300 focus:outline-none focus:ring-2 focus:ring-accent/40 focus:border-accent";

  if (!token) {
    return (
      <div className="min-h-screen bg-brand-50/40 flex items-center justify-center px-4">
        <div className="text-center">
          <p className="text-sm font-medium text-brand-700">Invalid reset link.</p>
          <Link href="/suitecompare/forgot-password" className="mt-3 inline-block text-sm text-accent hover:underline">
            Request a new one
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-brand-50/40 flex items-center justify-center px-4 py-12">
      <div className="w-full max-w-sm">
        <div className="mb-8 text-center">
          <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-accent/10">
            <GitCompare className="h-6 w-6 text-accent" />
          </div>
          <h1 className="text-xl font-semibold text-brand-900">Set new password</h1>
          <p className="mt-1 text-sm text-brand-400">Choose a password you haven&apos;t used before.</p>
        </div>

        <div className="bg-white rounded-2xl border border-brand-100 shadow-soft p-7">
          <form action={formAction} className="space-y-4">
            <input type="hidden" name="token" value={token} />

            <div>
              <label htmlFor="password" className="block text-sm font-medium text-brand-700 mb-1.5">
                New password
              </label>
              <input
                id="password"
                name="password"
                type="password"
                required
                minLength={8}
                autoComplete="new-password"
                autoFocus
                className={inputCls}
                placeholder="Min. 8 characters"
              />
            </div>

            <div>
              <label htmlFor="confirm" className="block text-sm font-medium text-brand-700 mb-1.5">
                Confirm password
              </label>
              <input
                id="confirm"
                name="confirm"
                type="password"
                required
                autoComplete="new-password"
                className={inputCls}
                placeholder="Repeat your new password"
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
              {isPending ? "Updating..." : "Set new password"}
            </button>
          </form>
        </div>

        <p className="mt-6 text-center text-xs text-brand-400">
          Remember it?{" "}
          <Link href="/suitecompare/login" className="text-accent hover:underline">
            Sign in
          </Link>
        </p>
      </div>
    </div>
  );
}

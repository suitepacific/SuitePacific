"use client";

import { Suspense, useActionState, useEffect, useRef, useState } from "react";
import { useSearchParams } from "next/navigation";
import { Loader2, MailCheck, RefreshCw } from "lucide-react";
import { verifyOtpAction, resendOtpAction } from "@/app/suitecompare/actions";

function VerifyForm() {
  const searchParams = useSearchParams();
  const email = searchParams.get("email") ?? "";

  const [verifyState, verifyAction, verifyPending] = useActionState(verifyOtpAction, {});
  const [resendState, resendAction, resendPending] = useActionState(resendOtpAction, {});

  const [otp, setOtp] = useState("");
  const formRef = useRef<HTMLFormElement>(null);

  // Auto-submit when 6 digits entered
  useEffect(() => {
    if (otp.length === 6) formRef.current?.requestSubmit();
  }, [otp]);

  // Cooldown timer after successful resend
  const [cooldown, setCooldown] = useState(0);
  useEffect(() => {
    if (resendState.success) {
      setCooldown(60);
      const interval = setInterval(() => {
        setCooldown((c) => {
          if (c <= 1) { clearInterval(interval); return 0; }
          return c - 1;
        });
      }, 1000);
      return () => clearInterval(interval);
    }
  }, [resendState.success]);

  const inputCls =
    "w-full rounded-lg border border-brand-100 px-3.5 py-2.5 text-sm text-brand-900 placeholder:text-brand-300 focus:outline-none focus:ring-2 focus:ring-accent/40 focus:border-accent tracking-[.35em] text-center font-mono text-lg";

  return (
    <div className="min-h-screen bg-brand-50/40 flex items-center justify-center px-4 py-12">
      <div className="w-full max-w-sm">
        <div className="mb-8 text-center">
          <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-accent/10">
            <MailCheck className="h-6 w-6 text-accent" />
          </div>
          <h1 className="text-xl font-semibold text-brand-900">Check your email</h1>
          <p className="mt-1 text-sm text-brand-400">
            We sent a 6-digit code to{" "}
            <span className="font-medium text-brand-700">{email}</span>
          </p>
        </div>

        <div className="bg-white rounded-2xl border border-brand-100 shadow-soft p-7">
          <form ref={formRef} action={verifyAction} className="space-y-4">
            <input type="hidden" name="email" value={email} />

            <div>
              <label className="block text-sm font-medium text-brand-700 mb-1.5 text-center">
                Verification code
              </label>
              <input
                name="otp"
                type="text"
                inputMode="numeric"
                pattern="[0-9]*"
                maxLength={6}
                value={otp}
                onChange={(e) => setOtp(e.target.value.replace(/\D/g, "").slice(0, 6))}
                placeholder="000000"
                autoFocus
                autoComplete="one-time-code"
                className={inputCls}
              />
              <p className="mt-1.5 text-xs text-brand-300 text-center">Expires in 10 minutes</p>
            </div>

            {verifyState?.error && (
              <p className="text-sm text-red-500 text-center">{verifyState.error}</p>
            )}

            <button
              type="submit"
              disabled={verifyPending || otp.length < 6}
              className="w-full inline-flex items-center justify-center gap-2 rounded-full bg-accent text-white font-medium px-6 py-2.5 text-sm shadow-soft hover:bg-accent/90 transition-colors disabled:opacity-50"
            >
              {verifyPending && <Loader2 className="h-4 w-4 animate-spin" />}
              {verifyPending ? "Verifying..." : "Verify email"}
            </button>
          </form>

          <div className="mt-5 pt-4 border-t border-brand-50">
            <form action={resendAction} className="flex justify-center">
              <input type="hidden" name="email" value={email} />
              <button
                type="submit"
                disabled={resendPending || cooldown > 0}
                className="inline-flex items-center gap-1.5 text-sm text-brand-400 hover:text-accent transition-colors disabled:opacity-50"
              >
                <RefreshCw className={`h-3.5 w-3.5 ${resendPending ? "animate-spin" : ""}`} />
                {cooldown > 0
                  ? `Resend in ${cooldown}s`
                  : resendPending
                  ? "Sending..."
                  : "Resend code"}
              </button>
            </form>
            {resendState?.success && cooldown > 0 && (
              <p className="mt-1 text-xs text-emerald-600 text-center">Code sent!</p>
            )}
            {resendState?.error && (
              <p className="mt-1 text-xs text-red-500 text-center">{resendState.error}</p>
            )}
          </div>
        </div>

        <p className="mt-6 text-center text-xs text-brand-400">
          Wrong email?{" "}
          <a href="/suitecompare/signup" className="text-accent hover:underline">
            Sign up again
          </a>
        </p>
      </div>
    </div>
  );
}

export default function VerifyPage() {
  return (
    <Suspense>
      <VerifyForm />
    </Suspense>
  );
}

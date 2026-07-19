"use client";

import { useActionState } from "react";
import { Loader2 } from "lucide-react";
import { signupViaInviteAction } from "./actions";

export function SignupViaInviteForm({ token, invitedEmail }: { token: string; invitedEmail: string }) {
  const [state, action, pending] = useActionState(signupViaInviteAction, {});

  return (
    <form action={action} className="space-y-4">
      <input type="hidden" name="token" value={token} />

      <div>
        <label htmlFor="name" className="block text-sm font-medium text-brand-700 mb-1.5">
          Full name
        </label>
        <input
          id="name"
          name="name"
          type="text"
          required
          autoComplete="name"
          className="w-full rounded-lg border border-brand-100 px-3.5 py-2.5 text-sm text-brand-900 placeholder:text-brand-300 focus:outline-none focus:ring-2 focus:ring-accent/40 focus:border-accent"
          placeholder="Jane Smith"
        />
      </div>

      <div>
        <label htmlFor="email" className="block text-sm font-medium text-brand-700 mb-1.5">
          Email
        </label>
        <input
          id="email"
          name="email"
          type="email"
          required
          readOnly
          value={invitedEmail}
          className="w-full rounded-lg border border-brand-100 px-3.5 py-2.5 text-sm text-brand-900 bg-brand-50 cursor-not-allowed"
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
          autoComplete="new-password"
          minLength={8}
          className="w-full rounded-lg border border-brand-100 px-3.5 py-2.5 text-sm text-brand-900 placeholder:text-brand-300 focus:outline-none focus:ring-2 focus:ring-accent/40 focus:border-accent"
          placeholder="Min. 8 characters"
        />
      </div>

      {state?.error && (
        <p className="text-sm text-red-500">{state.error}</p>
      )}

      <button
        type="submit"
        disabled={pending}
        className="w-full inline-flex items-center justify-center gap-2 rounded-full bg-brand text-white font-medium px-6 py-2.5 text-sm shadow-soft hover:bg-brand-700 transition-colors disabled:opacity-60"
      >
        {pending && <Loader2 className="h-4 w-4 animate-spin" />}
        {pending ? "Creating account..." : "Create account and accept"}
      </button>
    </form>
  );
}

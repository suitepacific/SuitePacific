"use client";

import { useActionState, useEffect, useRef } from "react";
import { Loader2, Mail } from "lucide-react";
import { inviteMemberAction } from "./actions";

export function InviteForm() {
  const [state, action, pending] = useActionState(inviteMemberAction, {});
  const emailRef = useRef<HTMLInputElement>(null);

  // Clear input after a successful invite
  useEffect(() => {
    if (state.success && emailRef.current) {
      emailRef.current.value = "";
    }
  }, [state.success]);

  return (
    <div className="space-y-2">
      <form action={action} className="flex gap-2">
        <input
          ref={emailRef}
          name="email"
          type="email"
          required
          placeholder="colleague@company.com"
          className="flex-1 rounded-xl border border-brand-100 bg-brand-50/40 px-4 py-2.5 text-sm text-brand-900 placeholder-brand-300 outline-none focus:border-accent focus:ring-2 focus:ring-accent/20 transition"
        />
        <button
          type="submit"
          disabled={pending}
          className="inline-flex items-center gap-2 rounded-xl bg-accent px-4 py-2.5 text-sm font-medium text-white hover:bg-accent/90 disabled:opacity-50 disabled:cursor-not-allowed transition-colors whitespace-nowrap"
        >
          {pending ? <Loader2 className="h-4 w-4 animate-spin" /> : <Mail className="h-4 w-4" />}
          {pending ? "Sending..." : "Send invite"}
        </button>
      </form>
      {state.error && (
        <p className="text-xs text-red-500">{state.error}</p>
      )}
      {state.success && (
        <p className="text-xs text-emerald-600">Invite sent. They&apos;ll receive an email with a link to join.</p>
      )}
    </div>
  );
}

"use client";

import { useActionState } from "react";
import { sendSupportAction } from "./actions";
import { Loader2, CheckCircle2 } from "lucide-react";

export function ContactForm({ userName, userEmail }: { userName: string; userEmail: string }) {
  const [state, action, isPending] = useActionState(sendSupportAction, {});

  if (state.success) {
    return (
      <div className="flex items-start gap-4 py-2">
        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-emerald-100">
          <CheckCircle2 className="h-5 w-5 text-emerald-600" />
        </div>
        <div>
          <p className="text-sm font-semibold text-white">Message sent</p>
          <p className="mt-0.5 text-sm text-brand-300">
            We received your message and will reply to {userEmail} within one business day.
          </p>
        </div>
      </div>
    );
  }

  return (
    <form action={action} className="space-y-3 w-full">
      <div className="grid sm:grid-cols-2 gap-3">
        <div>
          <label className="block text-xs font-medium text-brand-300 mb-1">Name</label>
          <input
            type="text"
            value={userName}
            readOnly
            className="w-full rounded-lg border border-white/10 bg-white/10 px-3 py-2 text-sm text-white placeholder:text-brand-400 focus:outline-none cursor-default"
          />
        </div>
        <div>
          <label className="block text-xs font-medium text-brand-300 mb-1">Email</label>
          <input
            type="email"
            value={userEmail}
            readOnly
            className="w-full rounded-lg border border-white/10 bg-white/10 px-3 py-2 text-sm text-white placeholder:text-brand-400 focus:outline-none cursor-default"
          />
        </div>
      </div>
      <div>
        <label className="block text-xs font-medium text-brand-300 mb-1">Subject</label>
        <input
          name="subject"
          type="text"
          placeholder="e.g. TBA connection error"
          className="w-full rounded-lg border border-white/10 bg-white/10 px-3 py-2 text-sm text-white placeholder:text-brand-400 focus:outline-none focus:ring-2 focus:ring-white/20"
        />
      </div>
      <div>
        <label className="block text-xs font-medium text-brand-300 mb-1">Message</label>
        <textarea
          name="message"
          required
          rows={4}
          placeholder="Describe your issue or question..."
          className="w-full rounded-lg border border-white/10 bg-white/10 px-3 py-2 text-sm text-white placeholder:text-brand-400 focus:outline-none focus:ring-2 focus:ring-white/20 resize-none"
        />
      </div>
      {state.error && (
        <p className="text-xs text-red-300">{state.error}</p>
      )}
      <button
        type="submit"
        disabled={isPending}
        className="inline-flex items-center gap-2 rounded-full bg-white px-5 py-2.5 text-sm font-semibold text-brand-900 hover:bg-brand-100 transition-colors disabled:opacity-60"
      >
        {isPending && <Loader2 className="h-4 w-4 animate-spin" />}
        {isPending ? "Sending..." : "Send Message"}
      </button>
    </form>
  );
}

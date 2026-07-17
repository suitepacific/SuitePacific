"use client";

import { useActionState, useRef, useEffect } from "react";
import { addCustomerCommentAction } from "@/app/customer-portal/(dashboard)/actions";

const initialState = {} as { error?: string; success?: boolean };

export function CustomerReplyForm({ ticketId }: { ticketId: string }) {
  const [state, formAction, pending] = useActionState(addCustomerCommentAction, initialState);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    if (state?.success && textareaRef.current) {
      textareaRef.current.value = "";
    }
  }, [state]);

  return (
    <div className="bg-white rounded-2xl border border-brand-100 p-5">
      <p className="text-sm font-medium text-brand-900 mb-3">Add a Reply</p>
      <form action={formAction} className="space-y-3">
        <input type="hidden" name="ticketId" value={ticketId} />
        <textarea
          ref={textareaRef}
          name="body"
          rows={5}
          required
          placeholder="Write your reply here…"
          className="w-full rounded-xl border border-brand-200 px-4 py-3 text-sm text-brand-900 placeholder:text-brand-300 focus:outline-none focus:ring-2 focus:ring-accent/30 focus:border-accent resize-none"
        />
        {state?.error && (
          <p className="text-xs text-red-600 bg-red-50 rounded-lg px-3 py-2">{state.error}</p>
        )}
        <div className="flex justify-end">
          <button type="submit" disabled={pending}
            className="rounded-full bg-brand text-white text-sm font-medium px-6 py-2.5 hover:bg-brand-700 transition-colors disabled:opacity-60">
            {pending ? "Sending…" : "Send Reply"}
          </button>
        </div>
      </form>
    </div>
  );
}

"use client";

import { useActionState, useEffect, useRef, useState } from "react";
import { addAdminCommentAction } from "@/app/admin/(dashboard)/tickets/actions";

const initialState = {} as { error?: string; success?: boolean };

export function AdminTicketReplyForm({ ticketId }: { ticketId: string }) {
  const [state, formAction, pending] = useActionState(addAdminCommentAction, initialState);
  const [isInternal, setIsInternal] = useState(false);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    if (state?.success && textareaRef.current) {
      textareaRef.current.value = "";
    }
  }, [state]);

  return (
    <div className={`rounded-2xl border p-5 ${isInternal ? "bg-yellow-50/60 border-yellow-100" : "bg-white border-brand-100"}`}>
      <div className="flex items-center justify-between mb-3">
        <p className="text-sm font-medium text-brand-900">
          {isInternal ? "Internal Note" : "Reply to Customer"}
        </p>
        <label className="flex items-center gap-2 cursor-pointer">
          <input type="checkbox" checked={isInternal} onChange={(e) => setIsInternal(e.target.checked)}
            className="rounded border-brand-300 text-accent focus:ring-accent/30" />
          <span className="text-xs text-brand-500">Internal note only</span>
        </label>
      </div>
      <form action={formAction} className="space-y-3">
        <input type="hidden" name="ticketId" value={ticketId} />
        <input type="hidden" name="isInternal" value={isInternal ? "true" : "false"} />
        <textarea
          ref={textareaRef}
          name="body"
          rows={5}
          required
          placeholder={isInternal ? "Private note - not visible to the client…" : "Reply to the client…"}
          className="w-full rounded-xl border border-brand-200 px-4 py-3 text-sm text-brand-900 placeholder:text-brand-300 focus:outline-none focus:ring-2 focus:ring-accent/30 focus:border-accent resize-none"
        />
        {state?.error && (
          <p className="text-xs text-red-600 bg-red-50 rounded-lg px-3 py-2">{state.error}</p>
        )}
        <div className="flex justify-end">
          <button type="submit" disabled={pending}
            className={`rounded-full text-white text-sm font-medium px-6 py-2.5 transition-colors disabled:opacity-60 ${
              isInternal ? "bg-yellow-500 hover:bg-yellow-600" : "bg-brand hover:bg-brand-700"
            }`}>
            {pending ? "Sending…" : isInternal ? "Save Note" : "Send Reply"}
          </button>
        </div>
      </form>
    </div>
  );
}

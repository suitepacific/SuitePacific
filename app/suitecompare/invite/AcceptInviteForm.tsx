"use client";

import { useActionState } from "react";
import { Loader2 } from "lucide-react";
import { acceptInviteAction } from "./actions";

export function AcceptInviteForm({ token }: { token: string }) {
  const [state, action, pending] = useActionState(acceptInviteAction, {});

  return (
    <form action={action}>
      <input type="hidden" name="token" value={token} />
      {state?.error && (
        <p className="mb-3 text-sm text-red-500">{state.error}</p>
      )}
      <button
        type="submit"
        disabled={pending}
        className="w-full inline-flex items-center justify-center gap-2 rounded-full bg-brand text-white font-medium px-6 py-2.5 text-sm shadow-soft hover:bg-brand-700 transition-colors disabled:opacity-60"
      >
        {pending && <Loader2 className="h-4 w-4 animate-spin" />}
        {pending ? "Accepting..." : "Accept invitation"}
      </button>
    </form>
  );
}

"use client";

import { useActionState, useEffect, useRef } from "react";
import { browseScriptAction } from "@/app/suitecompare/(dashboard)/accounts/actions";
import { Search } from "lucide-react";

type Props = { accountId: string };

export function BrowseScriptForm({ accountId }: Props) {
  const [state, action, pending] = useActionState(browseScriptAction, {});
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (!pending && !state.error && inputRef.current) {
      inputRef.current.value = "";
    }
  }, [pending, state]);

  return (
    <form action={action} className="flex flex-col gap-3">
      <input type="hidden" name="accountId" value={accountId} />
      <div className="flex gap-2">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-brand-300 pointer-events-none" />
          <input
            ref={inputRef}
            name="scriptId"
            type="text"
            required
            placeholder="e.g. customscript_customer_autoassign"
            className="w-full rounded-xl border border-brand-100 bg-brand-50/40 pl-9 pr-4 py-2.5 text-sm font-mono text-brand-900 placeholder-brand-300 outline-none focus:border-accent focus:ring-2 focus:ring-accent/20 transition"
          />
        </div>
        <button
          type="submit"
          disabled={pending}
          className="rounded-xl bg-accent px-4 py-2.5 text-sm font-medium text-white hover:bg-accent/90 disabled:opacity-50 disabled:cursor-not-allowed transition-colors whitespace-nowrap"
        >
          {pending ? "Browsing..." : "Browse Script"}
        </button>
      </div>
      {state.error && (
        <p className="text-sm text-red-600 bg-red-50 rounded-xl px-4 py-2.5">
          {state.error}
        </p>
      )}
      {!pending && state.success && (
        <p className="text-sm text-emerald-600 bg-emerald-50 rounded-xl px-4 py-2.5">
          Script browsed successfully. It now appears in the list below.
        </p>
      )}
    </form>
  );
}

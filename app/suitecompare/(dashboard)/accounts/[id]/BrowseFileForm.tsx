"use client";

import { useActionState, useEffect, useRef } from "react";
import { browseFileAction } from "@/app/suitecompare/(dashboard)/accounts/actions";
import { FileText } from "lucide-react";

type Props = { accountId: string };

export function BrowseFileForm({ accountId }: Props) {
  const [state, action, pending] = useActionState(browseFileAction, {});
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
          <FileText className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-brand-300 pointer-events-none" />
          <input
            ref={inputRef}
            name="templateScriptId"
            type="text"
            required
            placeholder="e.g. CUSTTMPL_MGI_VENDOR_BILL"
            className="w-full rounded-xl border border-brand-100 bg-brand-50/40 pl-9 pr-4 py-2.5 text-sm font-mono text-brand-900 placeholder-brand-300 outline-none focus:border-accent focus:ring-2 focus:ring-accent/20 transition"
          />
        </div>
        <button
          type="submit"
          disabled={pending}
          className="rounded-xl bg-accent px-4 py-2.5 text-sm font-medium text-white hover:bg-accent/90 disabled:opacity-50 disabled:cursor-not-allowed transition-colors whitespace-nowrap"
        >
          {pending ? "Browsing..." : "Browse Template"}
        </button>
      </div>
      <p className="text-xs text-brand-300">
        Find the Script ID in NetSuite under Customization &gt; Forms &gt; Advanced PDF/HTML Templates. It starts with <span className="font-mono">CUSTTMPL_</span> for custom templates.
      </p>
      {state.error && (
        <p className="text-sm text-red-600 bg-red-50 rounded-xl px-4 py-2.5">
          {state.error}
        </p>
      )}
      {!pending && state.success && (
        <p className="text-sm text-emerald-600 bg-emerald-50 rounded-xl px-4 py-2.5">
          Template added. It now appears in the list below.
        </p>
      )}
    </form>
  );
}

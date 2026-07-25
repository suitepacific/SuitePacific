"use client";

import { useActionState } from "react";
import { previewCsvUploadAction } from "./actions";
import { Loader2, CheckCircle2, UploadCloud } from "lucide-react";

export function CsvUploadPreview() {
  const [state, action, isPending] = useActionState(previewCsvUploadAction, {});

  return (
    <div className="rounded-2xl border border-brand-100 bg-white p-5 shadow-soft sm:p-6">
      <div className="flex items-center gap-2">
        <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-accent/10">
          <UploadCloud className="h-4.5 w-4.5 text-accent" />
        </div>
        <div>
          <h2 className="text-sm font-semibold text-brand-900">2. Upload a CSV to preview</h2>
          <p className="text-xs text-brand-400">No validation yet, just detecting columns and row count</p>
        </div>
      </div>

      <form action={action} className="mt-4 flex flex-col gap-3 sm:flex-row sm:items-center">
        <input
          type="file"
          name="file"
          accept=".csv,text/csv"
          required
          className="flex-1 rounded-lg border border-brand-100 bg-white px-3 py-2 text-sm text-brand-900 file:mr-3 file:rounded-full file:border-0 file:bg-brand-50 file:px-3 file:py-1.5 file:text-xs file:font-medium file:text-brand-700 focus:outline-none"
        />
        <button
          type="submit"
          disabled={isPending}
          className="inline-flex shrink-0 items-center justify-center gap-2 rounded-full bg-accent px-5 py-2.5 text-sm font-medium text-white transition-colors hover:bg-accent/90 disabled:opacity-60"
        >
          {isPending && <Loader2 className="h-4 w-4 animate-spin" />}
          {isPending ? "Reading..." : "Preview File"}
        </button>
      </form>

      {state.error && (
        <p className="mt-4 rounded-xl bg-red-50 px-4 py-3 text-sm text-red-700">{state.error}</p>
      )}

      {state.success && (
        <div className="mt-4 rounded-xl bg-emerald-50 px-4 py-3 text-sm text-emerald-800">
          <div className="flex items-center gap-2 font-medium">
            <CheckCircle2 className="h-4 w-4 shrink-0" />
            {state.fileName}: {state.headers?.length} columns, {state.rowCount} data rows
          </div>
          {state.headers && state.headers.length > 0 && (
            <div className="mt-2 flex flex-wrap gap-1.5">
              {state.headers.map((h, i) => (
                <span
                  key={`${h}-${i}`}
                  className="inline-flex items-center rounded-full bg-white px-2 py-0.5 font-mono text-xs text-emerald-800 ring-1 ring-emerald-200"
                >
                  {h || "(blank)"}
                </span>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
}

"use client";

import { useActionState } from "react";
import Link from "next/link";
import { testImportDoctorConnectionAction } from "./actions";
import { Loader2, CheckCircle2, PlugZap } from "lucide-react";

export type ConnectableEnvironment = {
  id: string;
  accountName: string;
  envName: string;
  type: string;
};

export function ConnectionTestPanel({ environments }: { environments: ConnectableEnvironment[] }) {
  const [state, action, isPending] = useActionState(testImportDoctorConnectionAction, {});

  return (
    <div className="rounded-2xl border border-brand-100 bg-white p-5 shadow-soft sm:p-6">
      <div className="flex items-center gap-2">
        <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-accent/10">
          <PlugZap className="h-4.5 w-4.5 text-accent" />
        </div>
        <div>
          <h2 className="text-sm font-semibold text-brand-900">1. Test your NetSuite connection</h2>
          <p className="text-xs text-brand-400">Confirms we can authenticate and read the Customer metadata catalog</p>
        </div>
      </div>

      {environments.length === 0 ? (
        <p className="mt-4 rounded-xl bg-brand-50 px-4 py-3 text-sm text-brand-400">
          No environment with NetSuite credentials found yet. Add TBA credentials from{" "}
          <Link href="/suitecompare/accounts" className="font-medium text-accent hover:underline">
            Accounts
          </Link>{" "}
          first, then come back here.
        </p>
      ) : (
        <form action={action} className="mt-4 flex flex-col gap-3 sm:flex-row sm:items-end">
          <div className="flex-1">
            <label className="mb-1 block text-xs font-medium text-brand-400">Environment</label>
            <select
              name="environmentId"
              className="w-full rounded-lg border border-brand-100 bg-white px-3 py-2 text-sm text-brand-900 focus:outline-none focus:ring-2 focus:ring-accent/30"
            >
              {environments.map((env) => (
                <option key={env.id} value={env.id}>
                  {env.accountName} - {env.envName} ({env.type})
                </option>
              ))}
            </select>
          </div>
          <button
            type="submit"
            disabled={isPending}
            className="inline-flex items-center justify-center gap-2 rounded-full bg-accent px-5 py-2.5 text-sm font-medium text-white transition-colors hover:bg-accent/90 disabled:opacity-60"
          >
            {isPending && <Loader2 className="h-4 w-4 animate-spin" />}
            {isPending ? "Testing..." : "Test Connection"}
          </button>
        </form>
      )}

      {state.error && (
        <p className="mt-4 rounded-xl bg-red-50 px-4 py-3 text-sm text-red-700">{state.error}</p>
      )}

      {state.success && (
        <div className="mt-4 rounded-xl bg-emerald-50 px-4 py-3 text-sm text-emerald-800">
          <div className="flex items-center gap-2 font-medium">
            <CheckCircle2 className="h-4 w-4 shrink-0" />
            Connected. Pulled {state.fieldCount} fields from the {state.recordType} metadata catalog.
          </div>
          {state.sampleFields && state.sampleFields.length > 0 && (
            <div className="mt-2 flex flex-wrap gap-1.5">
              {state.sampleFields.map((f) => (
                <span
                  key={f}
                  className="inline-flex items-center rounded-full bg-blue-50 px-2 py-0.5 font-mono text-xs text-blue-700 ring-1 ring-blue-200"
                >
                  {f}
                </span>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
}

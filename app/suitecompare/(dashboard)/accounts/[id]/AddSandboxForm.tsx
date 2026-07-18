"use client";

import { useActionState, useEffect, useState } from "react";
import { addEnvironmentAction } from "@/app/suitecompare/(dashboard)/accounts/actions";
import { Lock, Plus, X, Info } from "lucide-react";

export function AddSandboxForm({ accountId, planLimited }: { accountId: string; planLimited?: boolean }) {
  const [open, setOpen] = useState(false);
  const [state, action, pending] = useActionState(addEnvironmentAction, {});

  useEffect(() => {
    if (!pending && state.success) {
      setOpen(false);
    }
  }, [pending, state.success]);

  const inputCls =
    "w-full rounded-xl border border-brand-100 bg-brand-50/40 px-4 py-2.5 text-sm text-brand-900 font-mono placeholder-brand-300 outline-none focus:border-accent focus:ring-2 focus:ring-accent/20 transition";

  if (planLimited) {
    return (
      <div className="rounded-2xl border-2 border-dashed border-brand-100 p-4 flex flex-col items-center justify-center gap-2 min-h-[130px] opacity-60 cursor-not-allowed w-full">
        <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-brand-50">
          <Lock className="h-4 w-4 text-brand-300" />
        </div>
        <span className="text-xs font-medium text-brand-400">Add Sandbox</span>
        <span className="text-xs text-brand-300">Upgrade to add more</span>
      </div>
    );
  }

  return (
    <>
      {/* Trigger: renders as a dashed card in the env grid */}
      <button
        onClick={() => setOpen(true)}
        className="rounded-2xl border-2 border-dashed border-brand-100 p-4 flex flex-col items-center justify-center gap-2 min-h-[130px] hover:border-accent/30 hover:bg-accent/5 transition-all group w-full"
      >
        <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-brand-50 group-hover:bg-accent/10 transition-colors">
          <Plus className="h-4 w-4 text-brand-300 group-hover:text-accent transition-colors" />
        </div>
        <span className="text-xs font-medium text-brand-400 group-hover:text-accent transition-colors">
          Add Sandbox
        </span>
      </button>

      {open && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div
            className="fixed inset-0 bg-black/40 backdrop-blur-sm"
            onClick={() => setOpen(false)}
          />
          <div className="relative bg-white rounded-2xl shadow-2xl w-full max-w-md">
            <div className="flex items-center justify-between px-6 pt-6 pb-4 border-b border-brand-50">
              <h2 className="text-sm font-semibold text-brand-900">Add Sandbox Environment</h2>
              <button
                onClick={() => setOpen(false)}
                className="p-1.5 rounded-lg hover:bg-brand-50 text-brand-400 hover:text-brand-700 transition-colors"
              >
                <X className="h-4 w-4" />
              </button>
            </div>

            <form action={action} className="p-6 space-y-4">
              <input type="hidden" name="accountId" value={accountId} />

              <div className="flex items-start gap-3 p-3 rounded-xl bg-amber-50 border border-amber-100">
                <Info className="h-4 w-4 text-amber-500 shrink-0 mt-0.5" />
                <p className="text-xs text-amber-700">
                  Only one <strong>Production</strong> environment is allowed per account. Additional
                  environments must be Sandboxes. Their NetSuite ID must include a suffix like{" "}
                  <code className="bg-amber-100 px-1 rounded">_SB1</code>,{" "}
                  <code className="bg-amber-100 px-1 rounded">_SB2</code>, etc.
                </p>
              </div>

              <div>
                <label className="block text-sm font-medium text-brand-700 mb-1.5">
                  Display Name
                </label>
                <input
                  name="name"
                  type="text"
                  required
                  placeholder="e.g. Sandbox 2"
                  className="w-full rounded-xl border border-brand-100 bg-brand-50/40 px-4 py-2.5 text-sm text-brand-900 placeholder-brand-300 outline-none focus:border-accent focus:ring-2 focus:ring-accent/20 transition"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-brand-700 mb-1.5">
                  NetSuite Sandbox Account ID
                </label>
                <input
                  name="nsEnvAccountId"
                  type="text"
                  required
                  placeholder="e.g. 1234567_SB2"
                  className={inputCls}
                />
                <p className="mt-1 text-xs text-brand-300">
                  Must include <code>_SB1</code>, <code>_SB2</code>, etc. Production IDs are not
                  accepted here.
                </p>
              </div>

              {state.error && (
                <p className="text-sm text-red-600 bg-red-50 rounded-xl px-4 py-2.5">
                  {state.error}
                </p>
              )}

              <div className="pt-2 flex gap-3">
                <button
                  type="submit"
                  disabled={pending}
                  className="flex-1 rounded-xl bg-accent px-4 py-2.5 text-sm font-medium text-white hover:bg-accent/90 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                >
                  {pending ? "Adding..." : "Add Sandbox"}
                </button>
                <button
                  type="button"
                  onClick={() => setOpen(false)}
                  className="rounded-xl border border-brand-100 px-4 py-2.5 text-sm font-medium text-brand-500 hover:bg-brand-50 hover:text-brand-900 transition-colors"
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
}

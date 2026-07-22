"use client";

import { useActionState, useEffect, useState } from "react";
import { updateEnvironmentAction } from "@/app/suitecompare/(dashboard)/accounts/actions";
import { Settings, X, Eye, EyeOff, CheckCircle2 } from "lucide-react";
import { EnvironmentBadge } from "@/components/suitecompare/EnvironmentBadge";

type Env = {
  id: string;
  name: string;
  type: string;
  nsEnvAccountId: string | null;
  credentialsConfigured: boolean;
};

function EnvironmentConfigForm({ env, onClose }: { env: Env; onClose: () => void }) {
  const [showSecrets, setShowSecrets] = useState(false);
  const [state, action, pending] = useActionState(updateEnvironmentAction, {});

  useEffect(() => {
    if (!pending && state.success) {
      const timer = setTimeout(onClose, 800);
      return () => clearTimeout(timer);
    }
  }, [pending, state.success, onClose]);

  const inputCls =
    "w-full rounded-xl border border-brand-100 bg-brand-50/40 px-4 py-2.5 text-sm text-brand-900 font-mono placeholder-brand-300 outline-none focus:border-accent focus:ring-2 focus:ring-accent/20 transition";
  const labelCls = "block text-xs font-medium text-brand-600 mb-1";

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div className="fixed inset-0 bg-black/40 backdrop-blur-sm" onClick={onClose} />
      <div className="relative bg-white rounded-2xl shadow-2xl w-full max-w-md max-h-[90vh] overflow-y-auto">
        <div className="flex items-center justify-between px-6 pt-6 pb-4 border-b border-brand-50 sticky top-0 bg-white rounded-t-2xl z-10">
          <div className="flex items-center gap-3">
            <EnvironmentBadge type={env.type} />
            <h2 className="text-sm font-semibold text-brand-900">Configure Environment</h2>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg hover:bg-brand-50 text-brand-400 hover:text-brand-700 transition-colors"
          >
            <X className="h-4 w-4" />
          </button>
        </div>

        <form action={action} className="p-6 space-y-4">
          <input type="hidden" name="envId" value={env.id} />

          <div>
            <label className="block text-sm font-medium text-brand-700 mb-1.5">
              Display Name
            </label>
            <input
              name="name"
              type="text"
              defaultValue={env.name}
              required
              className="w-full rounded-xl border border-brand-100 bg-brand-50/40 px-4 py-2.5 text-sm text-brand-900 placeholder-brand-300 outline-none focus:border-accent focus:ring-2 focus:ring-accent/20 transition"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-brand-700 mb-1.5">
              NetSuite Account ID
            </label>
            <input
              name="nsEnvAccountId"
              type="text"
              defaultValue={env.nsEnvAccountId ?? ""}
              placeholder={env.type === "sandbox" ? "e.g. 1234567_SB1" : "e.g. 1234567"}
              className={inputCls}
            />
            {env.type === "sandbox" && (
              <p className="mt-1 text-xs text-brand-300">
                Sandbox IDs typically include a suffix like <code>_SB1</code>
              </p>
            )}
          </div>

          <div className="pt-3 border-t border-brand-50">
            <div className="flex items-center justify-between mb-4">
              <p className="text-sm font-semibold text-brand-700">Token-Based Authentication</p>
              <button
                type="button"
                onClick={() => setShowSecrets(!showSecrets)}
                className="flex items-center gap-1.5 text-xs text-brand-400 hover:text-brand-700 transition-colors"
              >
                {showSecrets ? <EyeOff className="h-3 w-3" /> : <Eye className="h-3 w-3" />}
                {showSecrets ? "Hide" : "Show"}
              </button>
            </div>

            {env.credentialsConfigured && (
              <p className="text-xs text-emerald-600 bg-emerald-50 rounded-lg px-3 py-2 mb-3">
                Credentials are set. Leave all four fields blank to keep existing credentials, or fill in all four to replace them.
              </p>
            )}

            <div className="space-y-3">
              {(["consumerKey", "consumerSecret", "tokenKey", "tokenSecret"] as const).map((field) => (
                <div key={field}>
                  <label className={labelCls}>
                    {field === "consumerKey" ? "Consumer Key" : field === "consumerSecret" ? "Consumer Secret" : field === "tokenKey" ? "Token Key" : "Token Secret"}
                  </label>
                  <input
                    name={field}
                    type={showSecrets ? "text" : "password"}
                    placeholder={env.credentialsConfigured ? "•••• leave blank to keep existing" : field.startsWith("consumer") ? "From integration record" : "Access token " + (field === "tokenKey" ? "key" : "secret")}
                    className={inputCls}
                    autoComplete="off"
                  />
                </div>
              ))}
            </div>

            <p className="mt-3 text-xs text-brand-300">
              Credentials are AES-256 encrypted before storage and never logged or sent to the browser.
            </p>
          </div>

          {state.error && (
            <p className="text-sm text-red-600 bg-red-50 rounded-xl px-4 py-2.5">{state.error}</p>
          )}
          {!pending && state.success && (
            <p className="flex items-center gap-2 text-sm text-emerald-600 bg-emerald-50 rounded-xl px-4 py-2.5">
              <CheckCircle2 className="h-4 w-4 shrink-0" />
              Saved successfully
            </p>
          )}

          <div className="pt-2 flex gap-3">
            <button
              type="submit"
              disabled={pending}
              className="flex-1 rounded-xl bg-accent px-4 py-2.5 text-sm font-medium text-white hover:bg-accent/90 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              {pending ? "Testing & Saving..." : "Save Configuration"}
            </button>
            <button
              type="button"
              onClick={onClose}
              className="rounded-xl border border-brand-100 px-4 py-2.5 text-sm font-medium text-brand-500 hover:bg-brand-50 hover:text-brand-900 transition-colors"
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export function EnvironmentConfig({ env }: { env: Env }) {
  const [open, setOpen] = useState(false);

  return (
    <>
      <button
        onClick={() => setOpen(true)}
        className="p-1.5 rounded-lg text-brand-300 hover:text-brand-700 hover:bg-brand-50 transition-colors"
        title="Configure environment"
        aria-label="Configure environment"
      >
        <Settings className="h-3.5 w-3.5" />
      </button>

      {/* Mount fresh on each open so useActionState resets */}
      {open && <EnvironmentConfigForm env={env} onClose={() => setOpen(false)} />}
    </>
  );
}

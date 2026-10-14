"use client";

import { useActionState, useEffect, useState } from "react";
import { changePasswordAction } from "./actions";

const init = {} as { error?: string; success?: boolean };

export function ChangePasswordForm() {
  const [state, formAction, pending] = useActionState(changePasswordAction, init);
  const [done, setDone] = useState(false);

  useEffect(() => {
    if (state?.success) {
      setDone(true);
      const t = setTimeout(() => setDone(false), 4000);
      return () => clearTimeout(t);
    }
  }, [state]);

  const inp =
    "w-full rounded-xl border border-brand-200 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-accent/30 focus:border-accent";

  return (
    <form action={formAction} className="space-y-4">
      <div>
        <label className="block text-xs text-brand-500 mb-1">Current Password</label>
        <input name="currentPassword" type="password" required autoComplete="current-password" className={inp} />
      </div>
      <div>
        <label className="block text-xs text-brand-500 mb-1">New Password</label>
        <input name="newPassword" type="password" required minLength={8} autoComplete="new-password" className={inp} />
      </div>
      <div>
        <label className="block text-xs text-brand-500 mb-1">Confirm New Password</label>
        <input name="confirmPassword" type="password" required minLength={8} autoComplete="new-password" className={inp} />
      </div>

      {state?.error && (
        <p className="text-xs text-red-600 bg-red-50 rounded-xl px-3 py-2">{state.error}</p>
      )}
      {done && (
        <p className="text-xs text-emerald-700 bg-emerald-50 rounded-xl px-3 py-2">Password updated successfully.</p>
      )}

      <button
        type="submit"
        disabled={pending}
        className="w-full rounded-full bg-brand text-white text-sm font-medium py-2.5 hover:bg-brand-700 transition-colors disabled:opacity-60"
      >
        {pending ? "Updating..." : "Update Password"}
      </button>
    </form>
  );
}

"use client";

import { useActionState } from "react";
import { updateProfileAction, changePasswordAction } from "./actions";
import { CheckCircle2, Loader2 } from "lucide-react";

const inputCls =
  "w-full rounded-xl border border-brand-100 bg-brand-50/40 px-4 py-2.5 text-sm text-brand-900 placeholder-brand-300 outline-none focus:border-accent focus:ring-2 focus:ring-accent/20 transition";

function SuccessBanner({ message }: { message: string }) {
  return (
    <p className="flex items-center gap-2 text-sm text-emerald-700 bg-emerald-50 rounded-xl px-4 py-2.5">
      <CheckCircle2 className="h-4 w-4 shrink-0" />
      {message}
    </p>
  );
}

function ErrorBanner({ message }: { message: string }) {
  return <p className="text-sm text-red-600 bg-red-50 rounded-xl px-4 py-2.5">{message}</p>;
}

export function AccountSettingsForm({ name, email }: { name: string; email: string }) {
  const [profileState, profileAction, profilePending] = useActionState(updateProfileAction, {});
  const [pwState, pwAction, pwPending] = useActionState(changePasswordAction, {});

  return (
    <div className="space-y-8">
      {/* Profile */}
      <div className="bg-white rounded-2xl border border-brand-50 shadow-soft overflow-hidden">
        <div className="px-6 py-4 border-b border-brand-50 bg-brand-50/40">
          <h2 className="text-sm font-semibold text-brand-900">Profile</h2>
          <p className="text-xs text-brand-400 mt-0.5">Signed in as <span className="text-brand-600">{email}</span></p>
        </div>
        <form action={profileAction} className="p-6 space-y-4">
          <div>
            <label className="block text-sm font-medium text-brand-700 mb-1.5">Display name</label>
            <input
              name="name"
              type="text"
              required
              maxLength={100}
              defaultValue={name}
              placeholder="Your name"
              className={inputCls}
              autoComplete="name"
            />
          </div>

          {profileState.error && <ErrorBanner message={profileState.error} />}
          {!profilePending && profileState.success && <SuccessBanner message="Name updated." />}

          <button
            type="submit"
            disabled={profilePending}
            className="inline-flex items-center gap-2 rounded-full bg-accent px-5 py-2 text-sm font-medium text-white hover:bg-accent/90 disabled:opacity-50 transition-colors"
          >
            {profilePending && <Loader2 className="h-3.5 w-3.5 animate-spin" />}
            {profilePending ? "Saving..." : "Save"}
          </button>
        </form>
      </div>

      {/* Change password */}
      <div className="bg-white rounded-2xl border border-brand-50 shadow-soft overflow-hidden">
        <div className="px-6 py-4 border-b border-brand-50 bg-brand-50/40">
          <h2 className="text-sm font-semibold text-brand-900">Change password</h2>
          <p className="text-xs text-brand-400 mt-0.5">Enter your current password and choose a new one.</p>
        </div>
        <form action={pwAction} className="p-6 space-y-4">
          <div>
            <label className="block text-sm font-medium text-brand-700 mb-1.5">Current password</label>
            <input
              name="current"
              type="password"
              required
              autoComplete="current-password"
              className={inputCls}
              placeholder="Your current password"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-brand-700 mb-1.5">New password</label>
            <input
              name="password"
              type="password"
              required
              minLength={8}
              autoComplete="new-password"
              className={inputCls}
              placeholder="Min. 8 characters"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-brand-700 mb-1.5">Confirm new password</label>
            <input
              name="confirm"
              type="password"
              required
              autoComplete="new-password"
              className={inputCls}
              placeholder="Repeat new password"
            />
          </div>

          {pwState.error && <ErrorBanner message={pwState.error} />}
          {!pwPending && pwState.success && <SuccessBanner message="Password updated successfully." />}

          <button
            type="submit"
            disabled={pwPending}
            className="inline-flex items-center gap-2 rounded-full bg-accent px-5 py-2 text-sm font-medium text-white hover:bg-accent/90 disabled:opacity-50 transition-colors"
          >
            {pwPending && <Loader2 className="h-3.5 w-3.5 animate-spin" />}
            {pwPending ? "Updating..." : "Update password"}
          </button>
        </form>
      </div>
    </div>
  );
}

import { ChangePasswordForm } from "./ChangePasswordForm";

export const metadata = { title: "Account" };

export default function AccountPage() {
  return (
    <div className="max-w-md">
      <h1 className="text-xl font-semibold text-brand-900 mb-6">Account</h1>
      <div className="bg-white rounded-2xl border border-brand-50 shadow-soft p-6">
        <p className="text-xs font-semibold text-brand-400 uppercase tracking-wide mb-5">Change Password</p>
        <ChangePasswordForm />
      </div>
    </div>
  );
}

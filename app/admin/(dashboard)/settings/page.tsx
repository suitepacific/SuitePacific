import { prisma } from "@/lib/prisma";
import { SettingsForm } from "./SettingsForm";

export default async function AdminSettingsPage() {
  const rateSetting = await prisma.systemSetting.findUnique({
    where: { key: "default_commission_rate" },
  });
  const currentRate = rateSetting ? parseFloat(rateSetting.value) || 10 : 10;

  return (
    <div className="max-w-lg">
      <h1 className="text-2xl font-semibold text-brand-900 mb-1">Settings</h1>
      <p className="text-sm text-brand-400 mb-8">Global defaults for the partner program</p>

      <div className="bg-white rounded-2xl border border-brand-50 shadow-soft p-6">
        <h2 className="font-semibold text-brand-900 mb-1">Default Commission Rate</h2>
        <p className="text-sm text-brand-400 mb-5">
          Applied to all referrals unless overridden at the partner or referral level.
          Priority: <span className="text-brand-700">Referral → Partner → Global</span>
        </p>
        <SettingsForm currentRate={currentRate} />
      </div>
    </div>
  );
}

"use client";

import { useActionState } from "react";
import { updateReferralAction } from "@/app/admin/(dashboard)/referrals/actions";
import { CheckCircle } from "lucide-react";
import type { ReferralStatus } from "@prisma/client";

const STATUSES: { value: ReferralStatus; label: string }[] = [
  { value: "NEW", label: "New" },
  { value: "CONTACTED", label: "Contacted" },
  { value: "PROPOSAL_SENT", label: "Proposal Sent" },
  { value: "WON", label: "Won" },
  { value: "LOST", label: "Lost" },
];

interface Props {
  referralId: string;
  currentStatus: ReferralStatus;
  currentCommissionAmount: number | null;
  currentCommissionPaid: boolean;
  commissionPaidAt: Date | null;
}

export function ReferralUpdateForm({
  referralId,
  currentStatus,
  currentCommissionAmount,
  currentCommissionPaid,
  commissionPaidAt,
}: Props) {
  const [state, formAction, pending] = useActionState(updateReferralAction, null);

  return (
    <div className="bg-white rounded-2xl border border-brand-50 shadow-soft p-6">
      <h2 className="font-semibold text-brand-900 mb-5">Update Status &amp; Commission</h2>
      <form action={formAction} className="space-y-5">
        <input type="hidden" name="id" value={referralId} />

        <div>
          <label htmlFor="status" className="block text-sm font-medium text-brand-700 mb-1.5">
            Status
          </label>
          <select
            id="status"
            name="status"
            defaultValue={currentStatus}
            className="w-full rounded-xl border border-brand-200 px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-accent/30 focus:border-accent"
          >
            {STATUSES.map((s) => (
              <option key={s.value} value={s.value}>
                {s.label}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label htmlFor="commissionAmount" className="block text-sm font-medium text-brand-700 mb-1.5">
            Commission Amount ($) <span className="text-brand-300 font-normal">(optional)</span>
          </label>
          <input
            id="commissionAmount"
            name="commissionAmount"
            type="number"
            step="0.01"
            min="0"
            defaultValue={currentCommissionAmount ?? ""}
            placeholder="0.00"
            className="w-full rounded-xl border border-brand-200 px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-accent/30 focus:border-accent"
          />
        </div>

        <div className="flex items-center gap-3">
          <input
            id="commissionPaid"
            name="commissionPaid"
            type="checkbox"
            value="true"
            defaultChecked={currentCommissionPaid}
            className="h-4 w-4 rounded border-brand-300 text-accent focus:ring-accent"
          />
          <label htmlFor="commissionPaid" className="text-sm text-brand-700">
            Commission paid
            {commissionPaidAt && (
              <span className="ml-1 text-brand-400">
                (on{" "}
                {new Date(commissionPaidAt).toLocaleDateString("en-US", {
                  month: "short",
                  day: "numeric",
                  year: "numeric",
                })}
                )
              </span>
            )}
          </label>
        </div>

        {state?.error && (
          <p className="text-sm text-red-600 bg-red-50 rounded-xl px-4 py-2.5">{state.error}</p>
        )}
        {state?.success && (
          <p className="text-sm text-emerald-700 bg-emerald-50 rounded-xl px-4 py-2.5 flex items-center gap-2">
            <CheckCircle className="h-4 w-4" /> Saved successfully.
          </p>
        )}

        <button
          type="submit"
          disabled={pending}
          className="w-full rounded-full bg-brand text-white text-sm font-medium py-3 hover:bg-brand-700 transition-colors disabled:opacity-60"
        >
          {pending ? "Saving…" : "Save Changes"}
        </button>
      </form>
    </div>
  );
}

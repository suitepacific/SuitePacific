"use client";

import { useActionState, useState } from "react";
import { updateReferralAction } from "@/app/admin/(dashboard)/referrals/actions";
import { CheckCircle } from "lucide-react";
import type { ReferralStatus, CommissionStatus } from "@prisma/client";

const DEAL_STATUSES: { value: ReferralStatus; label: string }[] = [
  { value: "NEW", label: "New" },
  { value: "CONTACTED", label: "Contacted" },
  { value: "PROPOSAL_SENT", label: "Proposal Sent" },
  { value: "WON", label: "Won" },
  { value: "LOST", label: "Lost" },
];

const COMMISSION_STATUSES: { value: CommissionStatus; label: string }[] = [
  { value: "PENDING_PAYMENT", label: "Pending Payment — deal won, awaiting invoice payment" },
  { value: "PAYABLE", label: "Payable — client paid the invoice" },
  { value: "PAID", label: "Paid — commission sent to partner" },
];

interface Props {
  referralId: string;
  currentStatus: ReferralStatus;
  currentProjectValue: number | null;
  currentCommissionRate: number | null;
  currentCommissionAmount: number | null;
  currentCommissionStatus: CommissionStatus | null;
  currentPaymentDate: Date | null;
  currentPaymentMethod: string | null;
  currentPaymentReference: string | null;
}

function toDateInput(d: Date | null): string {
  if (!d) return "";
  return new Date(d).toISOString().split("T")[0];
}

export function ReferralUpdateForm({
  referralId,
  currentStatus,
  currentProjectValue,
  currentCommissionRate,
  currentCommissionAmount,
  currentCommissionStatus,
  currentPaymentDate,
  currentPaymentMethod,
  currentPaymentReference,
}: Props) {
  const [state, formAction, pending] = useActionState(updateReferralAction, null);

  const [status, setStatus] = useState<ReferralStatus>(currentStatus);
  const [commissionStatus, setCommissionStatus] = useState<CommissionStatus | "">(
    currentCommissionStatus ?? ""
  );
  const [projectValue, setProjectValue] = useState(currentProjectValue?.toString() ?? "");
  const [commissionRate, setCommissionRate] = useState(
    currentCommissionRate?.toString() ?? "10"
  );
  const [commissionAmount, setCommissionAmount] = useState(
    currentCommissionAmount?.toFixed(2) ?? ""
  );

  function recalculate(pv: string, cr: string) {
    const pvNum = parseFloat(pv);
    const crNum = parseFloat(cr);
    if (!isNaN(pvNum) && !isNaN(crNum) && pvNum > 0 && crNum > 0) {
      setCommissionAmount(((pvNum * crNum) / 100).toFixed(2));
    }
  }

  const showCommission = status === "WON" || commissionStatus !== "";
  const showPayment = commissionStatus === "PAID";

  return (
    <div className="bg-white rounded-2xl border border-brand-50 shadow-soft p-6">
      <h2 className="font-semibold text-brand-900 mb-5">Update Status &amp; Commission</h2>
      <form action={formAction} className="space-y-5">
        <input type="hidden" name="id" value={referralId} />

        {/* Deal Status */}
        <div>
          <label htmlFor="status" className="block text-sm font-medium text-brand-700 mb-1.5">
            Deal Status
          </label>
          <select
            id="status"
            name="status"
            value={status}
            onChange={(e) => setStatus(e.target.value as ReferralStatus)}
            className="w-full rounded-xl border border-brand-200 px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-accent/30 focus:border-accent"
          >
            {DEAL_STATUSES.map((s) => (
              <option key={s.value} value={s.value}>{s.label}</option>
            ))}
          </select>
        </div>

        {/* Commission section — shown when deal is Won */}
        {showCommission && (
          <div className="border-t border-brand-50 pt-5 space-y-4">
            <p className="text-xs font-semibold uppercase tracking-wide text-brand-400">Commission</p>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label htmlFor="projectValue" className="block text-sm font-medium text-brand-700 mb-1.5">
                  Project Value ($)
                </label>
                <input
                  id="projectValue"
                  name="projectValue"
                  type="number"
                  step="0.01"
                  min="0"
                  value={projectValue}
                  onChange={(e) => {
                    setProjectValue(e.target.value);
                    recalculate(e.target.value, commissionRate);
                  }}
                  placeholder="8000"
                  className="w-full rounded-xl border border-brand-200 px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-accent/30 focus:border-accent"
                />
              </div>

              <div>
                <label htmlFor="commissionRate" className="block text-sm font-medium text-brand-700 mb-1.5">
                  Commission Rate (%)
                </label>
                <input
                  id="commissionRate"
                  name="commissionRate"
                  type="number"
                  step="0.1"
                  min="0"
                  max="100"
                  value={commissionRate}
                  onChange={(e) => {
                    setCommissionRate(e.target.value);
                    recalculate(projectValue, e.target.value);
                  }}
                  placeholder="10"
                  className="w-full rounded-xl border border-brand-200 px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-accent/30 focus:border-accent"
                />
              </div>
            </div>

            <div>
              <label htmlFor="commissionAmount" className="block text-sm font-medium text-brand-700 mb-1.5">
                Commission Amount ($)
                <span className="ml-1 text-brand-300 font-normal text-xs">auto-calculated, editable</span>
              </label>
              <input
                id="commissionAmount"
                name="commissionAmount"
                type="number"
                step="0.01"
                min="0"
                value={commissionAmount}
                onChange={(e) => setCommissionAmount(e.target.value)}
                placeholder="0.00"
                className="w-full rounded-xl border border-brand-200 px-4 py-2.5 text-sm font-medium focus:outline-none focus:ring-2 focus:ring-accent/30 focus:border-accent"
              />
            </div>

            <div>
              <label htmlFor="commissionStatus" className="block text-sm font-medium text-brand-700 mb-1.5">
                Commission Status
              </label>
              <select
                id="commissionStatus"
                name="commissionStatus"
                value={commissionStatus}
                onChange={(e) => setCommissionStatus(e.target.value as CommissionStatus | "")}
                className="w-full rounded-xl border border-brand-200 px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-accent/30 focus:border-accent"
              >
                <option value="">— Select status —</option>
                {COMMISSION_STATUSES.map((s) => (
                  <option key={s.value} value={s.value}>{s.label}</option>
                ))}
              </select>
            </div>

            {/* Payment details — shown when PAID */}
            {showPayment && (
              <div className="bg-emerald-50 rounded-xl p-4 space-y-4">
                <p className="text-xs font-semibold uppercase tracking-wide text-emerald-700">Payment Details</p>

                <div>
                  <label htmlFor="paymentDate" className="block text-sm font-medium text-brand-700 mb-1.5">
                    Payment Date
                  </label>
                  <input
                    id="paymentDate"
                    name="paymentDate"
                    type="date"
                    defaultValue={toDateInput(currentPaymentDate)}
                    className="w-full rounded-xl border border-brand-200 px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-accent/30 focus:border-accent bg-white"
                  />
                </div>

                <div>
                  <label htmlFor="paymentMethod" className="block text-sm font-medium text-brand-700 mb-1.5">
                    Payment Method
                  </label>
                  <input
                    id="paymentMethod"
                    name="paymentMethod"
                    type="text"
                    defaultValue={currentPaymentMethod ?? ""}
                    placeholder="Bank Transfer, PayPal, Wise…"
                    className="w-full rounded-xl border border-brand-200 px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-accent/30 focus:border-accent bg-white"
                  />
                </div>

                <div>
                  <label htmlFor="paymentReference" className="block text-sm font-medium text-brand-700 mb-1.5">
                    Transaction / Reference Number
                  </label>
                  <input
                    id="paymentReference"
                    name="paymentReference"
                    type="text"
                    defaultValue={currentPaymentReference ?? ""}
                    placeholder="TXN-123456"
                    className="w-full rounded-xl border border-brand-200 px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-accent/30 focus:border-accent bg-white"
                  />
                </div>
              </div>
            )}
          </div>
        )}

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

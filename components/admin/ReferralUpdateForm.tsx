"use client";

import { useActionState, useState } from "react";
import { updateReferralAction } from "@/app/admin/(dashboard)/referrals/actions";
import { CheckCircle } from "lucide-react";
import type { ReferralStatus, CommissionStatus } from "@prisma/client";

const DEAL_STATUSES: { value: ReferralStatus; label: string }[] = [
  { value: "NEW",            label: "New" },
  { value: "QUALIFIED",      label: "Qualified" },
  { value: "CONTACTED",      label: "Contacted" },
  { value: "DISCOVERY_CALL", label: "Discovery Call" },
  { value: "PROPOSAL_SENT",  label: "Proposal Sent" },
  { value: "NEGOTIATION",    label: "Negotiation" },
  { value: "WON",            label: "Won" },
  { value: "LOST",           label: "Lost" },
  { value: "DUPLICATE",      label: "Duplicate" },
];

const COMMISSION_STATUSES: { value: CommissionStatus; label: string }[] = [
  { value: "PENDING_PAYMENT", label: "Pending Payment - deal won, awaiting invoice payment" },
  { value: "PAYABLE",         label: "Payable - client paid the invoice" },
  { value: "PAID",            label: "Paid - commission sent to partner" },
];

const CURRENCIES = ["USD", "CAD", "AUD", "GBP", "EUR", "INR", "SGD", "NZD"];
const PAYMENT_METHODS = [
  { value: "bank_transfer", label: "Bank Transfer" },
  { value: "paypal",        label: "PayPal" },
  { value: "wise",          label: "Wise" },
  { value: "check",         label: "Check" },
];

interface Props {
  referralId: string;
  currentStatus: ReferralStatus;
  currentAssignedTo: string | null;
  currentInternalNotes: string | null;
  currentPartnerNotes: string | null;
  currentProjectCurrency: string;
  currentProjectValue: number | null;
  currentCommissionRate: number | null;
  currentCommissionCurrency: string;
  currentCommissionAmount: number | null;
  currentCommissionStatus: CommissionStatus | null;
  currentPaymentDate: Date | null;
  currentPaymentMethod: string | null;
  currentPaymentReference: string | null;
  currentPaymentNotes: string | null;
  // For showing effective default rate
  partnerCommissionRate: number | null;
  globalDefaultRate: number;
}

function toDateInput(d: Date | null): string {
  if (!d) return "";
  return new Date(d).toISOString().split("T")[0];
}

export function ReferralUpdateForm({
  referralId,
  currentStatus,
  currentAssignedTo,
  currentInternalNotes,
  currentPartnerNotes,
  currentProjectCurrency,
  currentProjectValue,
  currentCommissionRate,
  currentCommissionCurrency,
  currentCommissionAmount,
  currentCommissionStatus,
  currentPaymentDate,
  currentPaymentMethod,
  currentPaymentReference,
  currentPaymentNotes,
  partnerCommissionRate,
  globalDefaultRate,
}: Props) {
  const [state, formAction, pending] = useActionState(updateReferralAction, null);

  const [status, setStatus] = useState<ReferralStatus>(currentStatus);
  const [commissionStatus, setCommissionStatus] = useState<CommissionStatus | "">(currentCommissionStatus ?? "");
  const [projectCurrency, setProjectCurrency] = useState(currentProjectCurrency);
  const [projectValue, setProjectValue] = useState(currentProjectValue?.toString() ?? "");
  const [commissionRate, setCommissionRate] = useState(currentCommissionRate?.toString() ?? "");
  const [commissionCurrency, setCommissionCurrency] = useState(currentCommissionCurrency);

  const effectiveRate = commissionRate
    ? parseFloat(commissionRate)
    : (partnerCommissionRate ?? globalDefaultRate);

  const calculatedAmount =
    projectValue && !isNaN(parseFloat(projectValue)) && !isNaN(effectiveRate)
      ? ((parseFloat(projectValue) * effectiveRate) / 100).toFixed(2)
      : null;

  const showCommission = status === "WON" || commissionStatus !== "";
  const showPayment = commissionStatus === "PAID";

  const sel = "w-full rounded-xl border border-brand-200 px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-accent/30 focus:border-accent";
  const inp = "w-full rounded-xl border border-brand-200 px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-accent/30 focus:border-accent";
  const lbl = "block text-sm font-medium text-brand-700 mb-1.5";

  return (
    <div className="bg-white rounded-2xl border border-brand-50 shadow-soft p-6">
      <h2 className="font-semibold text-brand-900 mb-5">Update</h2>
      <form action={formAction} className="space-y-5">
        <input type="hidden" name="id" value={referralId} />

        {/* Deal status + assignment */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label htmlFor="status" className={lbl}>Deal Status</label>
            <select id="status" name="status" value={status}
              onChange={(e) => setStatus(e.target.value as ReferralStatus)} className={sel}>
              {DEAL_STATUSES.map((s) => <option key={s.value} value={s.value}>{s.label}</option>)}
            </select>
          </div>
          <div>
            <label htmlFor="assignedTo" className={lbl}>
              Assigned To <span className="text-brand-300 font-normal">(optional)</span>
            </label>
            <input id="assignedTo" name="assignedTo" type="text" defaultValue={currentAssignedTo ?? ""}
              placeholder="Team member name" className={inp} />
          </div>
        </div>

        {/* Notes */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label htmlFor="internalNotes" className={lbl}>
              Internal Notes <span className="text-xs text-red-500 font-normal">- not visible to partner</span>
            </label>
            <textarea id="internalNotes" name="internalNotes" rows={3} defaultValue={currentInternalNotes ?? ""}
              placeholder="Budget concerns, competitor notes, follow-up reminders…"
              className={`${inp} resize-none`} />
          </div>
          <div>
            <label htmlFor="partnerNotes" className={lbl}>
              Partner Notes <span className="text-xs text-brand-400 font-normal">- visible to partner</span>
            </label>
            <textarea id="partnerNotes" name="partnerNotes" rows={3} defaultValue={currentPartnerNotes ?? ""}
              placeholder="Updates the partner should know about…"
              className={`${inp} resize-none`} />
          </div>
        </div>

        {/* Commission section */}
        {showCommission && (
          <div className="border-t border-brand-50 pt-5 space-y-4">
            <p className="text-xs font-semibold uppercase tracking-wide text-brand-400">Commission</p>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className={lbl}>Project Currency</label>
                <select name="projectCurrency" value={projectCurrency}
                  onChange={(e) => setProjectCurrency(e.target.value)} className={sel}>
                  {CURRENCIES.map((c) => <option key={c} value={c}>{c}</option>)}
                </select>
              </div>
              <div>
                <label htmlFor="projectValue" className={lbl}>Project Value</label>
                <input id="projectValue" name="projectValue" type="number" step="0.01" min="0"
                  value={projectValue} onChange={(e) => setProjectValue(e.target.value)}
                  placeholder="8000" className={inp} />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label htmlFor="commissionRate" className={lbl}>
                  Commission Rate (%)
                  <span className="ml-1 text-xs text-brand-300 font-normal">
                    default: {effectiveRate}%
                    {!commissionRate && (partnerCommissionRate ? " (partner)" : " (global)")}
                  </span>
                </label>
                <input id="commissionRate" name="commissionRate" type="number" step="0.1" min="0" max="100"
                  value={commissionRate} onChange={(e) => setCommissionRate(e.target.value)}
                  placeholder={`${effectiveRate} (leave blank for default)`} className={inp} />
              </div>
              <div>
                <label className={lbl}>Commission Currency</label>
                <select name="commissionCurrency" value={commissionCurrency}
                  onChange={(e) => setCommissionCurrency(e.target.value)} className={sel}>
                  {CURRENCIES.map((c) => <option key={c} value={c}>{c}</option>)}
                </select>
              </div>
            </div>

            {calculatedAmount && (
              <div className="bg-brand-50 rounded-xl px-4 py-3 text-sm text-brand-700">
                Auto-calculated commission: <span className="font-semibold text-brand-900">{commissionCurrency} {calculatedAmount}</span>
                <span className="text-brand-400 ml-1">({projectCurrency} {parseFloat(projectValue).toLocaleString()} × {effectiveRate}%)</span>
              </div>
            )}

            <div>
              <label htmlFor="commissionStatus" className={lbl}>Commission Status</label>
              <select id="commissionStatus" name="commissionStatus" value={commissionStatus}
                onChange={(e) => setCommissionStatus(e.target.value as CommissionStatus | "")} className={sel}>
                <option value="">- Select status -</option>
                {COMMISSION_STATUSES.map((s) => <option key={s.value} value={s.value}>{s.label}</option>)}
              </select>
            </div>

            {showPayment && (
              <div className="bg-emerald-50 rounded-xl p-4 space-y-4">
                <p className="text-xs font-semibold uppercase tracking-wide text-emerald-700">Payment Details</p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="paymentDate" className={lbl}>Payment Date</label>
                    <input id="paymentDate" name="paymentDate" type="date"
                      defaultValue={toDateInput(currentPaymentDate)}
                      className={`${inp} bg-white`} />
                  </div>
                  <div>
                    <label htmlFor="paymentMethod" className={lbl}>Payment Method</label>
                    <select id="paymentMethod" name="paymentMethod"
                      defaultValue={currentPaymentMethod ?? ""}
                      className={`${sel} bg-white`}>
                      <option value="">- Select -</option>
                      {PAYMENT_METHODS.map((m) => <option key={m.value} value={m.value}>{m.label}</option>)}
                    </select>
                  </div>
                </div>
                <div>
                  <label htmlFor="paymentReference" className={lbl}>Transaction / Reference Number</label>
                  <input id="paymentReference" name="paymentReference" type="text"
                    defaultValue={currentPaymentReference ?? ""} placeholder="TXN-123456"
                    className={`${inp} bg-white`} />
                </div>
                <div>
                  <label htmlFor="paymentNotes" className={lbl}>Payment Notes <span className="text-brand-300 font-normal">(optional)</span></label>
                  <textarea id="paymentNotes" name="paymentNotes" rows={2}
                    defaultValue={currentPaymentNotes ?? ""}
                    className={`${inp} bg-white resize-none`} />
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

        <button type="submit" disabled={pending}
          className="w-full rounded-full bg-brand text-white text-sm font-medium py-3 hover:bg-brand-700 transition-colors disabled:opacity-60">
          {pending ? "Saving…" : "Save Changes"}
        </button>
      </form>
    </div>
  );
}

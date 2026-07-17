import type { CommissionStatus } from "@prisma/client";

const CONFIG: Record<CommissionStatus, { label: string; className: string }> = {
  PENDING_PAYMENT: { label: "Pending Payment", className: "bg-amber-100 text-amber-700" },
  PAYABLE: { label: "Ready for Payout", className: "bg-blue-100 text-blue-700" },
  PAID: { label: "Paid", className: "bg-emerald-100 text-emerald-700" },
};

export function CommissionStatusBadge({ status }: { status: CommissionStatus }) {
  const { label, className } = CONFIG[status];
  return (
    <span className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${className}`}>
      {label}
    </span>
  );
}

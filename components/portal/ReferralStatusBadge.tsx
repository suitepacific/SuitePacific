import type { ReferralStatus } from "@prisma/client";

const STATUS_CONFIG: Record<ReferralStatus, { label: string; className: string }> = {
  NEW: { label: "New", className: "bg-gray-100 text-gray-600" },
  CONTACTED: { label: "Contacted", className: "bg-blue-100 text-blue-700" },
  PROPOSAL_SENT: { label: "Proposal Sent", className: "bg-amber-100 text-amber-700" },
  WON: { label: "Won", className: "bg-emerald-100 text-emerald-700" },
  LOST: { label: "Lost", className: "bg-red-100 text-red-600" },
};

export function ReferralStatusBadge({ status }: { status: ReferralStatus }) {
  const { label, className } = STATUS_CONFIG[status];
  return (
    <span className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${className}`}>
      {label}
    </span>
  );
}

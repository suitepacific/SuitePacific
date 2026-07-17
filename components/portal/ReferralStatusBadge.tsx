import type { ReferralStatus } from "@prisma/client";

const STATUS_CONFIG: Record<ReferralStatus, { label: string; className: string }> = {
  NEW:           { label: "New",            className: "bg-gray-100 text-gray-600" },
  QUALIFIED:     { label: "Qualified",      className: "bg-teal-100 text-teal-700" },
  CONTACTED:     { label: "Contacted",      className: "bg-sky-100 text-sky-700" },
  DISCOVERY_CALL:{ label: "Discovery Call", className: "bg-blue-100 text-blue-700" },
  PROPOSAL_SENT: { label: "Proposal Sent",  className: "bg-amber-100 text-amber-700" },
  NEGOTIATION:   { label: "Negotiation",    className: "bg-orange-100 text-orange-700" },
  WON:           { label: "Won",            className: "bg-emerald-100 text-emerald-700" },
  LOST:          { label: "Lost",           className: "bg-red-100 text-red-600" },
  DUPLICATE:     { label: "Duplicate",      className: "bg-purple-100 text-purple-600" },
};

export function ReferralStatusBadge({ status }: { status: ReferralStatus }) {
  const { label, className } = STATUS_CONFIG[status];
  return (
    <span className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${className}`}>
      {label}
    </span>
  );
}

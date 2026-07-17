import type { TicketStatus } from "@prisma/client";

const CONFIG: Record<TicketStatus, { label: string; className: string }> = {
  OPEN:             { label: "Open",             className: "bg-blue-50 text-blue-700" },
  IN_PROGRESS:      { label: "In Progress",      className: "bg-sky-50 text-sky-700" },
  PENDING_CUSTOMER: { label: "Needs Your Input", className: "bg-amber-50 text-amber-700" },
  RESOLVED:         { label: "Resolved",         className: "bg-emerald-50 text-emerald-700" },
  CLOSED:           { label: "Closed",           className: "bg-brand-100 text-brand-500" },
};

export function TicketStatusBadge({ status }: { status: TicketStatus }) {
  const { label, className } = CONFIG[status] ?? CONFIG.OPEN;
  return (
    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${className}`}>
      {label}
    </span>
  );
}

import type { TicketPriority } from "@prisma/client";

const CONFIG: Record<TicketPriority, { label: string; className: string }> = {
  LOW:    { label: "Low",    className: "bg-brand-50 text-brand-400" },
  NORMAL: { label: "Normal", className: "bg-brand-50 text-brand-600" },
  HIGH:   { label: "High",   className: "bg-orange-50 text-orange-600" },
  URGENT: { label: "Urgent", className: "bg-red-50 text-red-600 font-semibold" },
};

export function TicketPriorityBadge({ priority }: { priority: TicketPriority }) {
  const { label, className } = CONFIG[priority] ?? CONFIG.NORMAL;
  return (
    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs ${className}`}>
      {label}
    </span>
  );
}

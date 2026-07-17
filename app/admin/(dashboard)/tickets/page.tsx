import { prisma } from "@/lib/prisma";
import Link from "next/link";
import { TicketStatusBadge } from "@/components/portal/TicketStatusBadge";
import { TicketPriorityBadge } from "@/components/portal/TicketPriorityBadge";

const TYPE_LABELS: Record<string, string> = {
  SUPPORT: "Support", DEVELOPMENT: "Dev", QUESTION: "Question", OPTIMIZATION: "Optimisation",
};

export default async function AdminTicketsPage({
  searchParams,
}: {
  searchParams: Promise<{ status?: string; priority?: string; archived?: string; customerId?: string }>;
}) {
  const sp = await searchParams;
  const showArchived = sp.archived === "1";
  const statusFilter = sp.status;
  const priorityFilter = sp.priority;
  const customerFilter = sp.customerId;

  const tickets = await prisma.ticket.findMany({
    where: {
      archivedAt: showArchived ? { not: null } : null,
      ...(statusFilter ? { status: statusFilter as never } : {}),
      ...(priorityFilter ? { priority: priorityFilter as never } : {}),
      ...(customerFilter ? { customerId: customerFilter } : {}),
    },
    include: { customer: { select: { name: true, company: true } } },
    orderBy: [{ priority: "asc" }, { updatedAt: "desc" }],
  });

  const STATUSES = ["OPEN", "IN_PROGRESS", "PENDING_CUSTOMER", "RESOLVED", "CLOSED"];
  const STATUS_LABELS: Record<string, string> = {
    OPEN: "Open", IN_PROGRESS: "In Progress", PENDING_CUSTOMER: "Pending Customer",
    RESOLVED: "Resolved", CLOSED: "Closed",
  };

  const buildUrl = (overrides: Record<string, string | undefined>) => {
    const params = new URLSearchParams();
    const merged = { status: statusFilter, priority: priorityFilter, archived: showArchived ? "1" : undefined, customerId: customerFilter, ...overrides };
    for (const [k, v] of Object.entries(merged)) {
      if (v) params.set(k, v);
    }
    return `/admin/tickets?${params.toString()}`;
  };

  return (
    <div>
      <div className="flex items-start justify-between mb-6">
        <div>
          <h1 className="text-2xl font-semibold text-brand-900">Tickets</h1>
          <p className="mt-1 text-sm text-brand-400">
            {tickets.length} {showArchived ? "archived" : "active"} ticket{tickets.length !== 1 ? "s" : ""}
            {customerFilter && " for this customer"}
          </p>
        </div>
        <Link
          href={showArchived ? buildUrl({ archived: undefined }) : buildUrl({ archived: "1" })}
          className="text-xs px-3 py-1.5 rounded-full border border-brand-100 text-brand-500 hover:border-brand-300 hover:text-brand-900 transition-colors"
        >
          {showArchived ? "Active" : "Archived"}
        </Link>
      </div>

      <div className="flex gap-1.5 flex-wrap mb-4">
        <Link href={buildUrl({ status: undefined })}
          className={`text-xs px-3 py-1 rounded-full border transition-colors ${!statusFilter ? "bg-brand-900 text-white border-brand-900" : "border-brand-100 text-brand-500 hover:border-brand-300"}`}>
          All
        </Link>
        {STATUSES.map((s) => (
          <Link key={s} href={buildUrl({ status: s })}
            className={`text-xs px-3 py-1 rounded-full border transition-colors ${statusFilter === s ? "bg-brand-900 text-white border-brand-900" : "border-brand-100 text-brand-500 hover:border-brand-300"}`}>
            {STATUS_LABELS[s]}
          </Link>
        ))}
      </div>

      <div className="bg-white rounded-2xl border border-brand-50 shadow-soft overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm min-w-[700px]">
            <thead>
              <tr className="border-b border-brand-50 text-left text-brand-400">
                <th className="px-5 py-3 font-medium">Title</th>
                <th className="px-5 py-3 font-medium">Customer</th>
                <th className="px-5 py-3 font-medium">Type</th>
                <th className="px-5 py-3 font-medium">Priority</th>
                <th className="px-5 py-3 font-medium">Status</th>
                <th className="px-5 py-3 font-medium">Updated</th>
              </tr>
            </thead>
            <tbody>
              {tickets.map((t) => (
                <tr key={t.id} className="border-b border-brand-50 last:border-0 hover:bg-brand-50/40 transition-colors">
                  <td className="px-5 py-3">
                    <Link href={`/admin/tickets/${t.id}`} className="font-medium text-brand-900 hover:text-accent line-clamp-1 max-w-xs">
                      {t.title}
                    </Link>
                    {t.assignedTo && <p className="text-xs text-brand-400 mt-0.5">→ {t.assignedTo}</p>}
                  </td>
                  <td className="px-5 py-3">
                    <Link href={`/admin/customers/${t.customerId}`} className="text-brand-700 hover:text-accent">
                      {t.customer.name}
                    </Link>
                    <p className="text-xs text-brand-400">{t.customer.company}</p>
                  </td>
                  <td className="px-5 py-3 text-brand-500 text-xs">{TYPE_LABELS[t.type] ?? t.type}</td>
                  <td className="px-5 py-3"><TicketPriorityBadge priority={t.priority} /></td>
                  <td className="px-5 py-3"><TicketStatusBadge status={t.status} /></td>
                  <td className="px-5 py-3 text-brand-400">
                    {t.updatedAt.toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        {tickets.length === 0 && (
          <p className="px-5 py-8 text-center text-sm text-brand-300">No tickets found.</p>
        )}
      </div>
    </div>
  );
}

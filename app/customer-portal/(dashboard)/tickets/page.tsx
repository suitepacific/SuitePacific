import { redirect } from "next/navigation";
import { getCustomerFromRequest } from "@/lib/customer-auth";
import { prisma } from "@/lib/prisma";
import Link from "next/link";
import { PlusCircle } from "lucide-react";
import { TicketStatusBadge } from "@/components/portal/TicketStatusBadge";
import { TicketPriorityBadge } from "@/components/portal/TicketPriorityBadge";

const TYPE_LABELS: Record<string, string> = {
  SUPPORT: "Support", DEVELOPMENT: "Development", QUESTION: "Question", OPTIMIZATION: "Optimization",
};

export default async function CustomerTicketsPage({
  searchParams,
}: {
  searchParams: Promise<{ status?: string }>;
}) {
  const customer = await getCustomerFromRequest();
  if (!customer) redirect("/customer-portal/login");

  const sp = await searchParams;
  const statusFilter = sp.status;

  const tickets = await prisma.ticket.findMany({
    where: {
      customerId: customer.id,
      archivedAt: null,
      ...(statusFilter ? { status: statusFilter as never } : {}),
    },
    orderBy: { updatedAt: "desc" },
  });

  const STATUSES = [
    { value: "", label: "All" },
    { value: "OPEN", label: "Open" },
    { value: "IN_PROGRESS", label: "In Progress" },
    { value: "PENDING_CUSTOMER", label: "Needs Your Input" },
    { value: "RESOLVED", label: "Resolved" },
    { value: "CLOSED", label: "Closed" },
  ];

  return (
    <div className="max-w-4xl">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-xl font-semibold text-brand-900">My Tickets</h1>
          <p className="text-sm text-brand-400 mt-1">{tickets.length} request{tickets.length !== 1 ? "s" : ""}</p>
        </div>
        <Link href="/customer-portal/tickets/new"
          className="inline-flex items-center gap-2 rounded-full bg-brand text-white text-sm font-medium px-4 py-2 hover:bg-brand-700 transition-colors">
          <PlusCircle className="h-4 w-4" />
          New Request
        </Link>
      </div>

      <div className="flex gap-1.5 flex-wrap mb-6">
        {STATUSES.map(({ value, label }) => {
          const active = (statusFilter ?? "") === value;
          return (
            <Link key={value}
              href={value ? `/customer-portal/tickets?status=${value}` : "/customer-portal/tickets"}
              className={`text-xs px-3 py-1 rounded-full border transition-colors ${
                active ? "bg-brand-900 text-white border-brand-900" : "border-brand-100 text-brand-500 hover:border-brand-300"
              }`}>
              {label}
            </Link>
          );
        })}
      </div>

      <div className="bg-white rounded-2xl border border-brand-100">
        {tickets.length === 0 ? (
          <div className="px-6 py-16 text-center">
            <p className="text-sm text-brand-400 mb-3">No tickets found.</p>
            <Link href="/customer-portal/tickets/new" className="text-sm text-accent hover:underline">
              Submit your first request
            </Link>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-sm min-w-[580px]">
              <thead>
                <tr className="border-b border-brand-100">
                  <th className="text-left px-6 py-3 text-xs font-medium text-brand-400 uppercase tracking-wide">Title</th>
                  <th className="text-left px-6 py-3 text-xs font-medium text-brand-400 uppercase tracking-wide">Type</th>
                  <th className="text-left px-6 py-3 text-xs font-medium text-brand-400 uppercase tracking-wide">Priority</th>
                  <th className="text-left px-6 py-3 text-xs font-medium text-brand-400 uppercase tracking-wide">Status</th>
                  <th className="text-left px-6 py-3 text-xs font-medium text-brand-400 uppercase tracking-wide">Updated</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-brand-50">
                {tickets.map((t) => (
                  <tr key={t.id} className="hover:bg-brand-50/40 transition-colors">
                    <td className="px-6 py-4">
                      <Link href={`/customer-portal/tickets/${t.id}`}
                        className="font-medium text-brand-900 hover:text-accent line-clamp-1">
                        {t.title}
                      </Link>
                    </td>
                    <td className="px-6 py-4 text-brand-500 text-xs">{TYPE_LABELS[t.type] ?? t.type}</td>
                    <td className="px-6 py-4"><TicketPriorityBadge priority={t.priority} /></td>
                    <td className="px-6 py-4"><TicketStatusBadge status={t.status} /></td>
                    <td className="px-6 py-4 text-brand-400">
                      {new Date(t.updatedAt).toLocaleDateString("en-US", {
                        month: "short", day: "numeric", year: "numeric",
                      })}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}

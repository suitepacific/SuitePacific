import { redirect } from "next/navigation";
import { getCustomerFromRequest } from "@/lib/customer-auth";
import { prisma } from "@/lib/prisma";
import Link from "next/link";
import { Ticket, Clock, CheckCircle, AlertCircle, PlusCircle } from "lucide-react";
import { TicketStatusBadge } from "@/components/portal/TicketStatusBadge";
import { TicketPriorityBadge } from "@/components/portal/TicketPriorityBadge";

export default async function CustomerDashboardPage() {
  const customer = await getCustomerFromRequest();
  if (!customer) redirect("/customer-portal/login");

  const tickets = await prisma.ticket.findMany({
    where: { customerId: customer.id, archivedAt: null },
    orderBy: { updatedAt: "desc" },
  });

  const open = tickets.filter((t) => ["OPEN", "IN_PROGRESS"].includes(t.status));
  const pendingCustomer = tickets.filter((t) => t.status === "PENDING_CUSTOMER");
  const resolved = tickets.filter((t) => ["RESOLVED", "CLOSED"].includes(t.status));

  const stats = [
    { label: "Open Tickets", value: open.length, icon: Ticket, color: "text-blue-600 bg-blue-50" },
    { label: "Needs Your Input", value: pendingCustomer.length, icon: AlertCircle, color: "text-amber-600 bg-amber-50" },
    { label: "Resolved", value: resolved.length, icon: CheckCircle, color: "text-emerald-600 bg-emerald-50" },
    { label: "Total Requests", value: tickets.length, icon: Clock, color: "text-brand-400 bg-brand-50" },
  ];

  const recent = tickets.slice(0, 5);

  return (
    <div className="max-w-4xl">
      <div className="mb-8">
        <h1 className="text-xl font-semibold text-brand-900">Welcome back, {customer.name}</h1>
        <p className="text-sm text-brand-400 mt-1">{customer.company} · your SuitePacific workspace.</p>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-10">
        {stats.map((s) => (
          <div key={s.label} className="bg-white rounded-2xl border border-brand-100 p-4">
            <div className={`inline-flex items-center justify-center h-8 w-8 rounded-xl ${s.color} mb-2`}>
              <s.icon className="h-3.5 w-3.5" />
            </div>
            <p className="text-xl font-bold text-brand-900">{s.value}</p>
            <p className="text-xs text-brand-400 mt-0.5 leading-snug">{s.label}</p>
          </div>
        ))}
      </div>

      {pendingCustomer.length > 0 && (
        <div className="bg-amber-50 border border-amber-100 rounded-2xl px-6 py-4 mb-6">
          <p className="text-sm font-medium text-amber-800 mb-1">
            {pendingCustomer.length} ticket{pendingCustomer.length !== 1 ? "s" : ""} waiting for your input
          </p>
          <p className="text-xs text-amber-700">
            SuitePacific needs more information before we can proceed.{" "}
            <Link href="/customer-portal/tickets" className="underline">View tickets</Link>
          </p>
        </div>
      )}

      <div className="bg-white rounded-2xl border border-brand-100">
        <div className="flex items-center justify-between px-6 py-4 border-b border-brand-100">
          <h2 className="font-semibold text-brand-900 text-sm">Recent Requests</h2>
          <Link href="/customer-portal/tickets/new"
            className="inline-flex items-center gap-1.5 text-xs text-accent hover:underline">
            <PlusCircle className="h-3.5 w-3.5" />
            Submit a Request
          </Link>
        </div>

        {recent.length === 0 ? (
          <div className="px-6 py-12 text-center">
            <p className="text-sm text-brand-400 mb-3">No requests submitted yet.</p>
            <Link href="/customer-portal/tickets/new" className="text-sm text-accent hover:underline">
              Submit your first request
            </Link>
          </div>
        ) : (
          <div className="divide-y divide-brand-50">
            {recent.map((t) => (
              <Link key={t.id} href={`/customer-portal/tickets/${t.id}`}
                className="flex items-center justify-between px-6 py-4 hover:bg-brand-50/50 transition-colors">
                <div className="min-w-0 flex-1">
                  <p className="text-sm font-medium text-brand-900 truncate">{t.title}</p>
                  <p className="text-xs text-brand-400 mt-0.5">
                    Updated {new Date(t.updatedAt).toLocaleDateString("en-US", {
                      month: "short", day: "numeric", year: "numeric",
                    })}
                  </p>
                </div>
                <div className="flex items-center gap-2 flex-wrap justify-end ml-4">
                  <TicketPriorityBadge priority={t.priority} />
                  <TicketStatusBadge status={t.status} />
                </div>
              </Link>
            ))}
          </div>
        )}

        {tickets.length > 5 && (
          <div className="px-6 py-3 border-t border-brand-50">
            <Link href="/customer-portal/tickets" className="text-xs text-accent hover:underline">
              View all {tickets.length} tickets
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}

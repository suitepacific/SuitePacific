import { prisma } from "@/lib/prisma";
import Link from "next/link";
import { PlusCircle } from "lucide-react";
import { deleteTimeEntryAction } from "./actions";

export default async function AdminTimeEntriesPage({
  searchParams,
}: {
  searchParams: Promise<{ customerId?: string; unbilledOnly?: string }>;
}) {
  const sp = await searchParams;
  const customerFilter = sp.customerId;
  const unbilledOnly = sp.unbilledOnly === "1";

  const entries = await prisma.timeEntry.findMany({
    where: {
      ...(customerFilter ? { customerId: customerFilter } : {}),
      ...(unbilledOnly ? { invoiceItem: null, isBillable: true } : {}),
    },
    include: {
      customer: { select: { name: true, company: true } },
      ticket: { select: { title: true } },
      invoiceItem: { select: { invoiceId: true, invoice: { select: { invoiceNumber: true } } } },
    },
    orderBy: { date: "desc" },
  });

  const totalHours = entries.reduce((s, e) => s + e.hours, 0);
  const billableHours = entries.filter((e) => e.isBillable).reduce((s, e) => s + e.hours, 0);

  const customers = await prisma.customer.findMany({
    where: { archivedAt: null },
    select: { id: true, name: true, company: true },
    orderBy: { company: "asc" },
  });

  return (
    <div>
      <div className="flex items-start justify-between mb-6">
        <div>
          <h1 className="text-2xl font-semibold text-brand-900">Time Entries</h1>
          <p className="mt-1 text-sm text-brand-400">
            {totalHours.toFixed(1)}h total · {billableHours.toFixed(1)}h billable
          </p>
        </div>
        <Link href="/admin/time-entries/new"
          className="inline-flex items-center gap-1.5 rounded-full bg-brand text-white text-sm font-medium px-4 py-2 hover:bg-brand-700 transition-colors">
          <PlusCircle className="h-4 w-4" />
          Log Time
        </Link>
      </div>

      {/* Filters */}
      <div className="flex gap-2 flex-wrap mb-6">
        <form method="GET" className="flex gap-2 items-center">
          <select name="customerId" defaultValue={customerFilter ?? ""}
            className="rounded-xl border border-brand-100 px-3 py-1.5 text-sm text-brand-700 focus:outline-none">
            <option value="">All customers</option>
            {customers.map((c) => (
              <option key={c.id} value={c.id}>{c.company} ({c.name})</option>
            ))}
          </select>
          {unbilledOnly && <input type="hidden" name="unbilledOnly" value="1" />}
          <button type="submit"
            className="text-xs px-3 py-1.5 rounded-xl border border-brand-100 text-brand-500 hover:border-brand-300 transition-colors">
            Filter
          </button>
        </form>
        <Link href={unbilledOnly ? `/admin/time-entries${customerFilter ? `?customerId=${customerFilter}` : ""}` : `/admin/time-entries?unbilledOnly=1${customerFilter ? `&customerId=${customerFilter}` : ""}`}
          className={`text-xs px-3 py-1.5 rounded-full border transition-colors ${unbilledOnly ? "bg-brand-900 text-white border-brand-900" : "border-brand-100 text-brand-500 hover:border-brand-300"}`}>
          Unbilled only
        </Link>
      </div>

      <div className="bg-white rounded-2xl border border-brand-50 shadow-soft overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm min-w-[700px]">
            <thead>
              <tr className="border-b border-brand-50 text-left text-brand-400">
                <th className="px-5 py-3 font-medium">Date</th>
                <th className="px-5 py-3 font-medium">Customer</th>
                <th className="px-5 py-3 font-medium">Description</th>
                <th className="px-5 py-3 font-medium">Ticket</th>
                <th className="px-5 py-3 font-medium">Hours</th>
                <th className="px-5 py-3 font-medium">Rate</th>
                <th className="px-5 py-3 font-medium">Invoice</th>
                <th className="px-5 py-3 font-medium"></th>
              </tr>
            </thead>
            <tbody>
              {entries.map((e) => (
                <tr key={e.id} className="border-b border-brand-50 last:border-0 hover:bg-brand-50/40 transition-colors">
                  <td className="px-5 py-3 text-brand-500 whitespace-nowrap">
                    {new Date(e.date).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })}
                  </td>
                  <td className="px-5 py-3">
                    <Link href={`/admin/customers/${e.customerId}`} className="text-brand-700 hover:text-accent">
                      {e.customer.company}
                    </Link>
                  </td>
                  <td className="px-5 py-3 text-brand-700 max-w-xs truncate">{e.description}</td>
                  <td className="px-5 py-3">
                    {e.ticket ? (
                      <Link href={`/admin/tickets/${e.ticketId}`} className="text-xs text-brand-400 hover:text-accent truncate max-w-[150px] block">
                        {e.ticket.title}
                      </Link>
                    ) : <span className="text-brand-200">-</span>}
                  </td>
                  <td className="px-5 py-3">
                    <span className={`font-medium ${e.isBillable ? "text-brand-900" : "text-brand-300"}`}>
                      {e.hours.toFixed(1)}h
                    </span>
                    {!e.isBillable && <span className="ml-1 text-xs text-brand-300">(non-bill.)</span>}
                  </td>
                  <td className="px-5 py-3 text-brand-500">
                    {e.hourlyRate != null ? `$${e.hourlyRate}/h` : <span className="text-brand-300">default</span>}
                  </td>
                  <td className="px-5 py-3">
                    {e.invoiceItem ? (
                      <Link href={`/admin/invoices/${e.invoiceItem.invoiceId}`}
                        className="text-xs text-accent hover:underline">
                        {e.invoiceItem.invoice.invoiceNumber}
                      </Link>
                    ) : e.isBillable ? (
                      <span className="text-xs text-amber-600 bg-amber-50 px-2 py-0.5 rounded-full">Unbilled</span>
                    ) : <span className="text-brand-200">-</span>}
                  </td>
                  <td className="px-5 py-3">
                    {!e.invoiceItem && (
                      <form action={deleteTimeEntryAction.bind(null, e.id)}>
                        <button type="submit"
                          className="text-xs text-red-400 hover:text-red-600 transition-colors">
                          Delete
                        </button>
                      </form>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        {entries.length === 0 && (
          <p className="px-5 py-8 text-center text-sm text-brand-300">No time entries found.</p>
        )}
      </div>
    </div>
  );
}

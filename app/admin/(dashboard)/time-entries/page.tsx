import { prisma } from "@/lib/prisma";
import Link from "next/link";
import { PlusCircle } from "lucide-react";
import { periodDateFilter } from "@/lib/invoice-utils";
import { approveTimeEntryAction, rejectTimeEntryAction, deleteTimeEntryAction, generateInvoicesAction } from "./actions";

const PERIOD_TABS = [
  { value: "week", label: "This Week" },
  { value: "month", label: "This Month" },
  { value: "all", label: "All Time" },
];

const STATUS_TABS = [
  { value: "all", label: "All" },
  { value: "pending", label: "Pending" },
  { value: "approved", label: "Approved" },
  { value: "rejected", label: "Rejected" },
  { value: "unbilled", label: "Unbilled" },
];

const STATUS_BADGE: Record<string, string> = {
  pending: "bg-amber-50 text-amber-700",
  approved: "bg-emerald-50 text-emerald-700",
  rejected: "bg-red-50 text-red-500",
};
const STATUS_LABEL: Record<string, string> = { pending: "Pending", approved: "Approved", rejected: "Rejected" };

function buildUrl(params: Record<string, string | undefined>) {
  const p = new URLSearchParams();
  for (const [k, v] of Object.entries(params)) if (v) p.set(k, v);
  const s = p.toString();
  return `/admin/time-entries${s ? `?${s}` : ""}`;
}

export default async function AdminTimeEntriesPage({
  searchParams,
}: {
  searchParams: Promise<{ period?: string; status?: string; customerId?: string }>;
}) {
  const sp = await searchParams;
  const period = sp.period || "month";
  const statusFilter = sp.status || "all";
  const customerFilter = sp.customerId;

  const dateFilter = periodDateFilter(period);

  const entries = await prisma.timeEntry.findMany({
    where: {
      ...(customerFilter ? { customerId: customerFilter } : {}),
      ...(dateFilter ? { date: dateFilter } : {}),
      ...(statusFilter === "unbilled"
        ? { status: "approved", isBillable: true, invoiceItem: null }
        : statusFilter !== "all"
        ? { status: statusFilter }
        : {}),
    },
    include: {
      customer: { select: { name: true, company: true } },
      ticket: { select: { title: true } },
      employee: { select: { name: true } },
      invoiceItem: { select: { invoiceId: true, invoice: { select: { invoiceNumber: true } } } },
    },
    orderBy: { date: "desc" },
  });

  const totalHours = entries.reduce((s, e) => s + e.hours, 0);
  const approvedUnbilled = entries.filter((e) => e.status === "approved" && e.isBillable && !e.invoiceItem);

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
            {totalHours.toFixed(1)}h total · {approvedUnbilled.length} approved &amp; unbilled
          </p>
        </div>
        <Link
          href="/admin/time-entries/new"
          className="inline-flex items-center gap-1.5 rounded-full bg-brand text-white text-sm font-medium px-4 py-2 hover:bg-brand-700 transition-colors"
        >
          <PlusCircle className="h-4 w-4" />
          Log Time
        </Link>
      </div>

      {/* Period tabs */}
      <div className="flex gap-1.5 mb-4">
        {PERIOD_TABS.map((t) => (
          <Link
            key={t.value}
            href={buildUrl({ period: t.value, status: statusFilter !== "all" ? statusFilter : undefined, customerId: customerFilter })}
            className={`text-xs px-3 py-1.5 rounded-full border transition-colors ${
              period === t.value
                ? "bg-brand-900 text-white border-brand-900"
                : "border-brand-100 text-brand-500 hover:border-brand-300"
            }`}
          >
            {t.label}
          </Link>
        ))}
      </div>

      {/* Status + customer filter row */}
      <div className="flex flex-wrap items-center gap-2 mb-6">
        <div className="flex gap-1.5 flex-wrap">
          {STATUS_TABS.map((t) => (
            <Link
              key={t.value}
              href={buildUrl({ period, status: t.value !== "all" ? t.value : undefined, customerId: customerFilter })}
              className={`text-xs px-3 py-1 rounded-full border transition-colors ${
                statusFilter === t.value
                  ? "bg-brand-900 text-white border-brand-900"
                  : "border-brand-100 text-brand-500 hover:border-brand-300"
              }`}
            >
              {t.label}
            </Link>
          ))}
        </div>
        <form method="GET" className="flex items-center gap-2 ml-auto">
          <input type="hidden" name="period" value={period} />
          {statusFilter !== "all" && <input type="hidden" name="status" value={statusFilter} />}
          <select
            name="customerId"
            defaultValue={customerFilter ?? ""}
            className="rounded-xl border border-brand-100 px-3 py-1.5 text-xs text-brand-700 focus:outline-none bg-white"
          >
            <option value="">All customers</option>
            {customers.map((c) => (
              <option key={c.id} value={c.id}>
                {c.company}
              </option>
            ))}
          </select>
          <button
            type="submit"
            className="text-xs px-3 py-1.5 rounded-xl border border-brand-100 text-brand-500 hover:border-brand-300 transition-colors"
          >
            Filter
          </button>
        </form>
      </div>

      {/* Generate invoices */}
      {approvedUnbilled.length > 0 && (
        <form action={generateInvoicesAction} className="mb-4">
          <input type="hidden" name="period" value={period} />
          {customerFilter && <input type="hidden" name="customerId" value={customerFilter} />}
          <div className="flex items-center justify-between bg-emerald-50 border border-emerald-100 rounded-2xl px-5 py-3">
            <p className="text-sm text-emerald-800">
              <strong>{approvedUnbilled.length}</strong> approved unbilled{" "}
              {approvedUnbilled.length === 1 ? "entry" : "entries"} ready to invoice
            </p>
            <button
              type="submit"
              className="text-sm font-medium bg-emerald-700 text-white rounded-full px-4 py-1.5 hover:bg-emerald-800 transition-colors"
            >
              Generate Invoices
            </button>
          </div>
        </form>
      )}

      <div className="bg-white rounded-2xl border border-brand-50 shadow-soft overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm min-w-[800px]">
            <thead>
              <tr className="border-b border-brand-50 text-left text-brand-400">
                <th className="px-4 py-3 font-medium">Date</th>
                <th className="px-4 py-3 font-medium">Customer</th>
                <th className="px-4 py-3 font-medium">Description</th>
                <th className="px-4 py-3 font-medium">Logged by</th>
                <th className="px-4 py-3 font-medium">Hrs</th>
                <th className="px-4 py-3 font-medium">Status</th>
                <th className="px-4 py-3 font-medium">Invoice</th>
                <th className="px-4 py-3 font-medium"></th>
              </tr>
            </thead>
            <tbody>
              {entries.map((e) => (
                <tr key={e.id} className="border-b border-brand-50 last:border-0 hover:bg-brand-50/40 transition-colors">
                  <td className="px-4 py-3 text-brand-500 whitespace-nowrap text-xs">
                    {new Date(e.date).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })}
                  </td>
                  <td className="px-4 py-3">
                    <Link href={`/admin/customers/${e.customerId}`} className="text-brand-700 hover:text-accent text-xs">
                      {e.customer.company}
                    </Link>
                  </td>
                  <td className="px-4 py-3 text-brand-700 max-w-xs truncate text-xs">{e.description}</td>
                  <td className="px-4 py-3 text-brand-400 text-xs whitespace-nowrap">
                    {e.employee ? e.employee.name : <span className="text-brand-300">Admin</span>}
                  </td>
                  <td className="px-4 py-3">
                    <span className={`font-medium text-xs ${e.isBillable ? "text-brand-900" : "text-brand-300"}`}>
                      {e.hours.toFixed(1)}h
                    </span>
                  </td>
                  <td className="px-4 py-3">
                    <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${STATUS_BADGE[e.status] ?? "bg-brand-50 text-brand-400"}`}>
                      {STATUS_LABEL[e.status] ?? e.status}
                    </span>
                  </td>
                  <td className="px-4 py-3">
                    {e.invoiceItem ? (
                      <Link href={`/admin/invoices/${e.invoiceItem.invoiceId}`} className="text-xs text-accent hover:underline">
                        {e.invoiceItem.invoice.invoiceNumber}
                      </Link>
                    ) : e.isBillable ? (
                      <span className="text-xs text-amber-600">Unbilled</span>
                    ) : (
                      <span className="text-brand-200 text-xs">-</span>
                    )}
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-2">
                      {e.status === "pending" && !e.invoiceItem && (
                        <>
                          <form action={approveTimeEntryAction.bind(null, e.id)}>
                            <button type="submit" className="text-xs text-emerald-600 hover:text-emerald-800 font-medium transition-colors">
                              Approve
                            </button>
                          </form>
                          <form action={rejectTimeEntryAction.bind(null, e.id)}>
                            <button type="submit" className="text-xs text-red-400 hover:text-red-600 transition-colors">
                              Reject
                            </button>
                          </form>
                        </>
                      )}
                      {e.status === "rejected" && !e.invoiceItem && (
                        <form action={approveTimeEntryAction.bind(null, e.id)}>
                          <button type="submit" className="text-xs text-emerald-600 hover:text-emerald-800 font-medium transition-colors">
                            Approve
                          </button>
                        </form>
                      )}
                      {!e.invoiceItem && (
                        <form action={deleteTimeEntryAction.bind(null, e.id)}>
                          <button type="submit" className="text-xs text-brand-300 hover:text-red-500 transition-colors">
                            Del
                          </button>
                        </form>
                      )}
                    </div>
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

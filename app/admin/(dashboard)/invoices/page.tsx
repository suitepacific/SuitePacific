import { prisma } from "@/lib/prisma";
import Link from "next/link";
import { PlusCircle, FileText } from "lucide-react";

const STATUS_STYLES: Record<string, string> = {
  DRAFT: "bg-brand-50 text-brand-500",
  SENT: "bg-blue-50 text-blue-700",
  PAID: "bg-emerald-50 text-emerald-700",
  VOID: "bg-red-50 text-red-500",
};
const STATUS_LABELS: Record<string, string> = { DRAFT: "Draft", SENT: "Sent", PAID: "Paid", VOID: "Void" };

export default async function AdminInvoicesPage({
  searchParams,
}: {
  searchParams: Promise<{ status?: string; customerId?: string }>;
}) {
  const sp = await searchParams;
  const statusFilter = sp.status;
  const customerFilter = sp.customerId;

  const invoices = await prisma.invoice.findMany({
    where: {
      archivedAt: null,
      ...(statusFilter ? { status: statusFilter as never } : {}),
      ...(customerFilter ? { customerId: customerFilter } : {}),
    },
    include: { customer: { select: { name: true, company: true } } },
    orderBy: { createdAt: "desc" },
  });

  const totalBilled = invoices.filter((i) => i.status !== "VOID").reduce((s, i) => s + i.total, 0);
  const totalPaid = invoices.filter((i) => i.status === "PAID").reduce((s, i) => s + i.total, 0);
  const totalOutstanding = invoices.filter((i) => i.status === "SENT").reduce((s, i) => s + i.total, 0);

  const STATUSES = ["DRAFT", "SENT", "PAID", "VOID"];

  return (
    <div>
      <div className="flex items-start justify-between mb-6">
        <div>
          <h1 className="text-2xl font-semibold text-brand-900">Invoices</h1>
          <p className="mt-1 text-sm text-brand-400">{invoices.length} invoice{invoices.length !== 1 ? "s" : ""}</p>
        </div>
        <Link href="/admin/invoices/new"
          className="inline-flex items-center gap-1.5 rounded-full bg-brand text-white text-sm font-medium px-4 py-2 hover:bg-brand-700 transition-colors">
          <PlusCircle className="h-4 w-4" />
          New Invoice
        </Link>
      </div>

      <div className="grid grid-cols-3 gap-4 mb-8">
        <div className="bg-white rounded-2xl border border-brand-50 shadow-soft p-5">
          <p className="text-2xl font-bold text-brand-900">${totalBilled.toFixed(2)}</p>
          <p className="text-xs text-brand-400 mt-0.5">Total Billed</p>
        </div>
        <div className="bg-white rounded-2xl border border-brand-50 shadow-soft p-5">
          <p className="text-2xl font-bold text-blue-600">${totalOutstanding.toFixed(2)}</p>
          <p className="text-xs text-brand-400 mt-0.5">Outstanding</p>
        </div>
        <div className="bg-white rounded-2xl border border-brand-50 shadow-soft p-5">
          <p className="text-2xl font-bold text-emerald-600">${totalPaid.toFixed(2)}</p>
          <p className="text-xs text-brand-400 mt-0.5">Collected</p>
        </div>
      </div>

      <div className="flex gap-1.5 flex-wrap mb-6">
        <Link href="/admin/invoices"
          className={`text-xs px-3 py-1 rounded-full border transition-colors ${!statusFilter ? "bg-brand-900 text-white border-brand-900" : "border-brand-100 text-brand-500 hover:border-brand-300"}`}>
          All
        </Link>
        {STATUSES.map((s) => (
          <Link key={s} href={`/admin/invoices?status=${s}`}
            className={`text-xs px-3 py-1 rounded-full border transition-colors ${statusFilter === s ? "bg-brand-900 text-white border-brand-900" : "border-brand-100 text-brand-500 hover:border-brand-300"}`}>
            {STATUS_LABELS[s]}
          </Link>
        ))}
      </div>

      <div className="bg-white rounded-2xl border border-brand-50 shadow-soft overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm min-w-[640px]">
            <thead>
              <tr className="border-b border-brand-50 text-left text-brand-400">
                <th className="px-5 py-3 font-medium">Invoice #</th>
                <th className="px-5 py-3 font-medium">Customer</th>
                <th className="px-5 py-3 font-medium">Issued</th>
                <th className="px-5 py-3 font-medium">Due</th>
                <th className="px-5 py-3 font-medium">Amount</th>
                <th className="px-5 py-3 font-medium">Status</th>
                <th className="px-5 py-3 font-medium"></th>
              </tr>
            </thead>
            <tbody>
              {invoices.map((inv) => (
                <tr key={inv.id} className="border-b border-brand-50 last:border-0 hover:bg-brand-50/40 transition-colors">
                  <td className="px-5 py-3">
                    <Link href={`/admin/invoices/${inv.id}`} className="font-medium text-brand-900 hover:text-accent font-mono text-xs">
                      {inv.invoiceNumber}
                    </Link>
                  </td>
                  <td className="px-5 py-3 text-brand-700">{inv.customer.company}</td>
                  <td className="px-5 py-3 text-brand-500">
                    {new Date(inv.issueDate).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })}
                  </td>
                  <td className="px-5 py-3 text-brand-400">
                    {inv.dueDate ? new Date(inv.dueDate).toLocaleDateString("en-US", { month: "short", day: "numeric" }) : "—"}
                  </td>
                  <td className="px-5 py-3 font-semibold text-brand-900">
                    {inv.currency} {inv.total.toFixed(2)}
                  </td>
                  <td className="px-5 py-3">
                    <span className={`text-xs px-2.5 py-0.5 rounded-full font-medium ${STATUS_STYLES[inv.status]}`}>
                      {STATUS_LABELS[inv.status]}
                    </span>
                  </td>
                  <td className="px-5 py-3">
                    <Link href={`/admin/invoices/${inv.id}/print`} target="_blank"
                      className="text-xs text-brand-400 hover:text-accent flex items-center gap-1">
                      <FileText className="h-3.5 w-3.5" />
                      PDF
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        {invoices.length === 0 && (
          <p className="px-5 py-8 text-center text-sm text-brand-300">No invoices yet.</p>
        )}
      </div>
    </div>
  );
}

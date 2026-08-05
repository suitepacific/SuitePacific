import { prisma } from "@/lib/prisma";
import { notFound } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, ExternalLink } from "lucide-react";
import { AdminInvoiceStatusForm } from "@/components/admin/AdminInvoiceStatusForm";

const STATUS_STYLES: Record<string, string> = {
  DRAFT: "bg-brand-50 text-brand-500",
  SENT: "bg-blue-50 text-blue-700",
  PAID: "bg-emerald-50 text-emerald-700",
  VOID: "bg-red-50 text-red-500",
};
const STATUS_LABELS: Record<string, string> = { DRAFT: "Draft", SENT: "Sent", PAID: "Paid", VOID: "Void" };

export default async function AdminInvoiceDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const invoice = await prisma.invoice.findUnique({
    where: { id },
    include: {
      customer: true,
      items: { include: { timeEntry: { select: { date: true, hours: true } } } },
    },
  });
  if (!invoice) notFound();

  const fmt = (n: number) => `${invoice.currency} ${n.toFixed(2)}`;

  return (
    <div className="max-w-3xl">
      <div className="flex items-center justify-between mb-6">
        <Link href="/admin/invoices"
          className="inline-flex items-center gap-1.5 text-sm text-brand-400 hover:text-brand-900">
          <ArrowLeft className="h-3.5 w-3.5" /> Back to Invoices
        </Link>
        <Link href={`/admin/invoices/${id}/print`} target="_blank"
          className="inline-flex items-center gap-1.5 text-sm text-accent hover:underline">
          <ExternalLink className="h-3.5 w-3.5" />
          Open PDF View
        </Link>
      </div>

      <div className="flex items-start justify-between mb-8 gap-4">
        <div>
          <div className="flex items-center gap-3 flex-wrap">
            <h1 className="text-2xl font-semibold text-brand-900 font-mono">{invoice.invoiceNumber}</h1>
            <span className={`text-xs px-2.5 py-0.5 rounded-full font-medium ${STATUS_STYLES[invoice.status]}`}>
              {STATUS_LABELS[invoice.status]}
            </span>
          </div>
          <p className="text-sm text-brand-400 mt-1">
            <Link href={`/admin/customers/${invoice.customerId}`} className="hover:text-accent">
              {invoice.customer.company} · {invoice.customer.name}
            </Link>
          </p>
          {invoice.paidAt && (
            <p className="text-xs text-emerald-600 mt-1">
              Paid {new Date(invoice.paidAt).toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" })}
            </p>
          )}
        </div>
        <AdminInvoiceStatusForm id={invoice.id} currentStatus={invoice.status} />
      </div>

      <div className="grid grid-cols-2 gap-4 mb-8">
        <div className="bg-white rounded-2xl border border-brand-50 shadow-soft p-5">
          <p className="text-xs text-brand-400 mb-1">Issue Date</p>
          <p className="text-sm font-medium text-brand-900">
            {new Date(invoice.issueDate).toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" })}
          </p>
        </div>
        <div className="bg-white rounded-2xl border border-brand-50 shadow-soft p-5">
          <p className="text-xs text-brand-400 mb-1">Due Date</p>
          <p className="text-sm font-medium text-brand-900">
            {invoice.dueDate
              ? new Date(invoice.dueDate).toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" })
              : "-"}
          </p>
        </div>
      </div>

      {/* Line items */}
      <div className="bg-white rounded-2xl border border-brand-50 shadow-soft mb-6 overflow-hidden">
        <div className="px-6 py-4 border-b border-brand-50">
          <h2 className="font-semibold text-brand-900 text-sm">Line Items</h2>
        </div>
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-brand-50 text-left text-brand-400">
              <th className="px-6 py-3 font-medium">Description</th>
              <th className="px-6 py-3 font-medium text-right">Qty</th>
              <th className="px-6 py-3 font-medium text-right">Rate</th>
              <th className="px-6 py-3 font-medium text-right">Amount</th>
            </tr>
          </thead>
          <tbody>
            {invoice.items.map((item) => (
              <tr key={item.id} className="border-b border-brand-50 last:border-0">
                <td className="px-6 py-4 text-brand-900">
                  {item.description}
                  {item.timeEntry && (
                    <p className="text-xs text-brand-400 mt-0.5">
                      {new Date(item.timeEntry.date).toLocaleDateString("en-US", { month: "short", day: "numeric" })}
                      {" · "}{item.timeEntry.hours}h
                    </p>
                  )}
                </td>
                <td className="px-6 py-4 text-right text-brand-500">{item.quantity}</td>
                <td className="px-6 py-4 text-right text-brand-500">{invoice.currency} {item.unitPrice.toFixed(2)}</td>
                <td className="px-6 py-4 text-right font-medium text-brand-900">{fmt(item.amount)}</td>
              </tr>
            ))}
          </tbody>
        </table>
        <div className="px-6 py-4 border-t border-brand-50 space-y-2">
          <div className="flex justify-between text-sm">
            <span className="text-brand-400">Subtotal</span>
            <span className="text-brand-900">{fmt(invoice.subtotal)}</span>
          </div>
          {invoice.taxPercent > 0 && (
            <div className="flex justify-between text-sm">
              <span className="text-brand-400">Tax ({invoice.taxPercent}%)</span>
              <span className="text-brand-900">{fmt(invoice.taxAmount)}</span>
            </div>
          )}
          <div className="flex justify-between text-base font-semibold border-t border-brand-50 pt-2">
            <span className="text-brand-900">Total</span>
            <span className="text-brand-900">{fmt(invoice.total)}</span>
          </div>
        </div>
      </div>

      {invoice.notes && (
        <div className="bg-white rounded-2xl border border-brand-50 shadow-soft p-5">
          <p className="text-xs font-semibold text-brand-400 uppercase tracking-wide mb-2">Notes</p>
          <p className="text-sm text-brand-700 whitespace-pre-wrap">{invoice.notes}</p>
        </div>
      )}
    </div>
  );
}

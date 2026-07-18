import { redirect, notFound } from "next/navigation";
import { getCustomerFromRequest } from "@/lib/customer-auth";
import { prisma } from "@/lib/prisma";
import Link from "next/link";
import { ArrowLeft, ExternalLink } from "lucide-react";

export default async function CustomerInvoiceDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const customer = await getCustomerFromRequest();
  if (!customer) redirect("/customer-portal/login");

  const invoice = await prisma.invoice.findUnique({
    where: { id },
    include: { items: true },
  });
  if (!invoice || invoice.customerId !== customer.id || !["SENT", "PAID"].includes(invoice.status)) notFound();

  const fmt = (n: number) => `${invoice.currency} ${n.toFixed(2)}`;

  return (
    <div className="max-w-2xl">
      <div className="flex items-center justify-between mb-6">
        <Link href="/customer-portal/invoices"
          className="inline-flex items-center gap-1.5 text-sm text-brand-400 hover:text-brand-900">
          <ArrowLeft className="h-3.5 w-3.5" /> Back to Invoices
        </Link>
        <Link href={`/customer-portal/invoices/${id}/print`} target="_blank"
          className="inline-flex items-center gap-1.5 text-sm text-accent hover:underline">
          <ExternalLink className="h-3.5 w-3.5" />
          Download PDF
        </Link>
      </div>

      <div className="flex items-start justify-between mb-8">
        <div>
          <h1 className="text-xl font-semibold text-brand-900 font-mono">{invoice.invoiceNumber}</h1>
          <p className="text-sm text-brand-400 mt-1">
            Issued {new Date(invoice.issueDate).toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" })}
            {invoice.dueDate && ` · Due ${new Date(invoice.dueDate).toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" })}`}
          </p>
        </div>
        {invoice.status === "PAID" ? (
          <span className="text-sm bg-emerald-50 text-emerald-700 px-3 py-1 rounded-full font-medium">Paid</span>
        ) : (
          <span className="text-sm bg-blue-50 text-blue-700 px-3 py-1 rounded-full font-medium">Outstanding</span>
        )}
      </div>

      <div className="bg-white rounded-2xl border border-brand-100 mb-6 overflow-hidden">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-brand-100">
              <th className="text-left px-6 py-3 text-xs font-medium text-brand-400">Description</th>
              <th className="text-right px-6 py-3 text-xs font-medium text-brand-400">Qty</th>
              <th className="text-right px-6 py-3 text-xs font-medium text-brand-400">Rate</th>
              <th className="text-right px-6 py-3 text-xs font-medium text-brand-400">Amount</th>
            </tr>
          </thead>
          <tbody>
            {invoice.items.map((item) => (
              <tr key={item.id} className="border-b border-brand-50 last:border-0">
                <td className="px-6 py-4 text-brand-900">{item.description}</td>
                <td className="px-6 py-4 text-right text-brand-500">{item.quantity}</td>
                <td className="px-6 py-4 text-right text-brand-500">{invoice.currency} {item.unitPrice.toFixed(2)}</td>
                <td className="px-6 py-4 text-right font-medium text-brand-900">{fmt(item.amount)}</td>
              </tr>
            ))}
          </tbody>
        </table>
        <div className="px-6 py-4 border-t border-brand-100 space-y-2">
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
          <div className="flex justify-between text-base font-semibold border-t border-brand-100 pt-2">
            <span>Total</span>
            <span>{fmt(invoice.total)}</span>
          </div>
        </div>
      </div>

      {invoice.notes && (
        <div className="bg-brand-50/60 rounded-2xl border border-brand-100 p-5">
          <p className="text-xs font-medium text-brand-400 uppercase tracking-wide mb-2">Notes</p>
          <p className="text-sm text-brand-700 whitespace-pre-wrap">{invoice.notes}</p>
        </div>
      )}
    </div>
  );
}

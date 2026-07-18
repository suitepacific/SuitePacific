"use client";

import { useEffect } from "react";
import type { Customer, Invoice, InvoiceItem } from "@prisma/client";

type InvoiceWithItems = Invoice & {
  customer: Customer;
  items: InvoiceItem[];
};

const STATUS_LABELS: Record<string, string> = { DRAFT: "Draft", SENT: "Sent", PAID: "Paid", VOID: "Void" };

function fmt(n: number) {
  return n.toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 });
}
function fmtDate(d: Date | string) {
  return new Date(d).toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" });
}

export function InvoicePrintView({ invoice }: { invoice: InvoiceWithItems }) {
  useEffect(() => {
    document.title = `Invoice ${invoice.invoiceNumber} — ${invoice.customer.company}`;
  }, [invoice]);

  return (
    <>
      <style>{`
        @media print {
          .no-print { display: none !important; }
          body { -webkit-print-color-adjust: exact; print-color-adjust: exact; }
          @page { margin: 1.5cm; size: A4; }
        }
        body { font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif; }
      `}</style>

      {/* Print button — hidden when printing */}
      <div className="no-print fixed top-4 right-4 flex gap-2 z-10">
        <button
          onClick={() => window.print()}
          className="bg-brand text-white text-sm font-medium px-5 py-2 rounded-full hover:bg-brand-700 transition-colors shadow-lg"
        >
          Download / Print PDF
        </button>
        <button
          onClick={() => window.close()}
          className="bg-white border border-brand-100 text-brand-600 text-sm font-medium px-5 py-2 rounded-full hover:bg-brand-50 transition-colors shadow-lg"
        >
          Close
        </button>
      </div>

      <div className="min-h-screen bg-white">
        <div className="max-w-2xl mx-auto px-8 py-16">
          {/* Header */}
          <div className="flex items-start justify-between mb-12">
            <div>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src="/SuitePacificLogo-cropped.PNG" alt="SuitePacific" className="h-16 w-auto object-contain" />
            </div>
            <div className="text-right">
              <p className="text-4xl font-bold text-brand-900 tracking-tight">INVOICE</p>
              <p className="text-sm font-mono text-brand-400 mt-1">{invoice.invoiceNumber}</p>
              {invoice.status === "PAID" && (
                <div className="mt-2 inline-block border-2 border-emerald-500 text-emerald-600 text-xs font-bold px-3 py-1 rounded uppercase tracking-widest">
                  Paid
                </div>
              )}
              {invoice.status === "VOID" && (
                <div className="mt-2 inline-block border-2 border-red-400 text-red-500 text-xs font-bold px-3 py-1 rounded uppercase tracking-widest">
                  Void
                </div>
              )}
            </div>
          </div>

          {/* Dates + Bill To */}
          <div className="grid grid-cols-2 gap-8 mb-12">
            <div>
              <p className="text-xs font-semibold uppercase tracking-widest text-brand-300 mb-3">Bill To</p>
              <p className="font-semibold text-brand-900">{invoice.customer.company}</p>
              <p className="text-sm text-brand-600 mt-0.5">{invoice.customer.name}</p>
              <p className="text-sm text-brand-400">{invoice.customer.email}</p>
              {invoice.customer.country && <p className="text-sm text-brand-400">{invoice.customer.country}</p>}
            </div>
            <div className="text-right">
              <div className="space-y-2">
                <div>
                  <p className="text-xs font-semibold uppercase tracking-widest text-brand-300 mb-1">Issue Date</p>
                  <p className="text-sm font-medium text-brand-900">{fmtDate(invoice.issueDate)}</p>
                </div>
                {invoice.dueDate && (
                  <div>
                    <p className="text-xs font-semibold uppercase tracking-widest text-brand-300 mb-1">Due Date</p>
                    <p className="text-sm font-medium text-brand-900">{fmtDate(invoice.dueDate)}</p>
                  </div>
                )}
                {invoice.paidAt && (
                  <div>
                    <p className="text-xs font-semibold uppercase tracking-widest text-emerald-400 mb-1">Paid</p>
                    <p className="text-sm font-medium text-emerald-700">{fmtDate(invoice.paidAt)}</p>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Line items */}
          <table className="w-full mb-8">
            <thead>
              <tr className="border-b-2 border-brand-900">
                <th className="text-left pb-3 text-xs font-semibold uppercase tracking-widest text-brand-900">Description</th>
                <th className="text-right pb-3 text-xs font-semibold uppercase tracking-widest text-brand-900 w-16">Qty</th>
                <th className="text-right pb-3 text-xs font-semibold uppercase tracking-widest text-brand-900 w-28">Rate</th>
                <th className="text-right pb-3 text-xs font-semibold uppercase tracking-widest text-brand-900 w-28">Amount</th>
              </tr>
            </thead>
            <tbody>
              {invoice.items.map((item, i) => (
                <tr key={item.id} className={`border-b ${i === invoice.items.length - 1 ? "border-brand-100" : "border-brand-50"}`}>
                  <td className="py-4">
                    <p className="text-sm text-brand-900">{item.description}</p>
                  </td>
                  <td className="py-4 text-right text-sm text-brand-500">{item.quantity}</td>
                  <td className="py-4 text-right text-sm text-brand-500">
                    {invoice.currency} {fmt(item.unitPrice)}
                  </td>
                  <td className="py-4 text-right text-sm font-medium text-brand-900">
                    {invoice.currency} {fmt(item.amount)}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          {/* Totals */}
          <div className="flex justify-end mb-10">
            <div className="w-64 space-y-2">
              <div className="flex justify-between text-sm">
                <span className="text-brand-400">Subtotal</span>
                <span className="text-brand-900">{invoice.currency} {fmt(invoice.subtotal)}</span>
              </div>
              {invoice.taxPercent > 0 && (
                <div className="flex justify-between text-sm">
                  <span className="text-brand-400">Tax ({invoice.taxPercent}%)</span>
                  <span className="text-brand-900">{invoice.currency} {fmt(invoice.taxAmount)}</span>
                </div>
              )}
              <div className="flex justify-between text-lg font-bold border-t-2 border-brand-900 pt-3 mt-2">
                <span className="text-brand-900">Total</span>
                <span className="text-brand-900">{invoice.currency} {fmt(invoice.total)}</span>
              </div>
            </div>
          </div>

          {/* Notes */}
          {invoice.notes && (
            <div className="border-t border-brand-100 pt-8">
              <p className="text-xs font-semibold uppercase tracking-widest text-brand-300 mb-2">Notes</p>
              <p className="text-sm text-brand-600 whitespace-pre-wrap">{invoice.notes}</p>
            </div>
          )}

          {/* Footer */}
          <div className="border-t border-brand-50 pt-8 mt-12 flex flex-col items-center gap-2">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/SuitePacificLogo-cropped.PNG" alt="SuitePacific" className="h-10 w-auto object-contain opacity-40" />
            <p className="text-xs text-brand-300">suitepacific.com · Thank you for your business.</p>
          </div>
        </div>
      </div>
    </>
  );
}

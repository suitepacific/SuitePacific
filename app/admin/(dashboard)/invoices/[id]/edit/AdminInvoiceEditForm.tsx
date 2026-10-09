"use client";

import { useActionState } from "react";
import Link from "next/link";
import { updateInvoiceItemsAction } from "../../actions";

interface Item {
  id: string;
  description: string;
  quantity: number;
  unitPrice: number;
  amount: number;
}

interface Invoice {
  id: string;
  invoiceNumber: string;
  currency: string;
  taxPercent: number;
  subtotal: number;
  taxAmount: number;
  total: number;
  customer: { company: string };
  items: Item[];
}

export function AdminInvoiceEditForm({ invoice }: { invoice: Invoice }) {
  const [state, action, pending] = useActionState(updateInvoiceItemsAction, null);

  return (
    <div className="max-w-3xl">
      <div className="mb-6">
        <Link href={`/admin/invoices/${invoice.id}`} className="text-sm text-brand-400 hover:text-accent transition-colors">
          &larr; Back to Invoice
        </Link>
        <h1 className="mt-3 text-2xl font-semibold text-brand-900">Edit {invoice.invoiceNumber}</h1>
        <p className="mt-1 text-sm text-brand-400">{invoice.customer.company}</p>
      </div>

      <form action={action} className="bg-white rounded-2xl border border-brand-50 shadow-soft overflow-hidden mb-6">
        <input type="hidden" name="invoiceId" value={invoice.id} />

        {state?.error && (
          <div className="px-6 py-3 border-b border-red-100 bg-red-50">
            <p className="text-sm text-red-600">{state.error}</p>
          </div>
        )}
        {state?.success && (
          <div className="px-6 py-3 border-b border-emerald-100 bg-emerald-50">
            <p className="text-sm text-emerald-700">Saved.</p>
          </div>
        )}

        <div className="overflow-x-auto">
          <table className="w-full text-sm min-w-[600px]">
            <thead>
              <tr className="border-b border-brand-50 text-left text-brand-400">
                <th className="px-5 py-3 font-medium">Description</th>
                <th className="px-5 py-3 font-medium w-24">Hrs / Qty</th>
                <th className="px-5 py-3 font-medium w-28">Rate ({invoice.currency})</th>
                <th className="px-5 py-3 font-medium w-28 text-right">Amount</th>
              </tr>
            </thead>
            <tbody>
              {invoice.items.map((item) => (
                <tr key={item.id} className="border-b border-brand-50">
                  <td className="px-5 py-3">
                    <input
                      name={`desc_${item.id}`}
                      type="text"
                      required
                      maxLength={500}
                      defaultValue={item.description}
                      className="w-full rounded-lg border border-brand-100 px-2.5 py-1.5 text-sm text-brand-900 focus:outline-none focus:ring-2 focus:ring-brand/30"
                    />
                  </td>
                  <td className="px-5 py-3">
                    <input
                      name={`qty_${item.id}`}
                      type="number"
                      required
                      min="0.01"
                      step="0.01"
                      defaultValue={item.quantity}
                      className="w-full rounded-lg border border-brand-100 px-2.5 py-1.5 text-sm text-brand-900 focus:outline-none focus:ring-2 focus:ring-brand/30"
                    />
                  </td>
                  <td className="px-5 py-3">
                    <input
                      name={`rate_${item.id}`}
                      type="number"
                      required
                      min="0"
                      step="0.01"
                      defaultValue={item.unitPrice}
                      className="w-full rounded-lg border border-brand-100 px-2.5 py-1.5 text-sm text-brand-900 focus:outline-none focus:ring-2 focus:ring-brand/30"
                    />
                  </td>
                  <td className="px-5 py-3 text-right text-brand-500 tabular-nums">
                    {item.amount.toFixed(2)}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="px-5 py-4 border-t border-brand-50 space-y-1.5 text-sm">
          <div className="flex justify-between text-brand-400">
            <span>Subtotal</span>
            <span className="tabular-nums">{invoice.currency} {invoice.subtotal.toFixed(2)}</span>
          </div>
          {invoice.taxPercent > 0 && (
            <div className="flex justify-between text-brand-400">
              <span>Tax ({invoice.taxPercent}%)</span>
              <span className="tabular-nums">{invoice.currency} {invoice.taxAmount.toFixed(2)}</span>
            </div>
          )}
          <div className="flex justify-between font-semibold text-brand-900 border-t border-brand-50 pt-2">
            <span>Total</span>
            <span className="tabular-nums">{invoice.currency} {invoice.total.toFixed(2)}</span>
          </div>
          <p className="text-xs text-brand-300 pt-1">Totals recalculate on save based on updated quantities and rates.</p>
        </div>

        <div className="px-5 py-4 border-t border-brand-50 flex gap-3">
          <button
            type="submit"
            disabled={pending}
            className="rounded-full bg-brand text-white text-sm font-medium px-5 py-2 hover:bg-brand-700 disabled:opacity-50 transition-colors"
          >
            {pending ? "Saving..." : "Save Changes"}
          </button>
          <Link
            href={`/admin/invoices/${invoice.id}`}
            className="rounded-full border border-brand-100 text-brand-500 text-sm font-medium px-5 py-2 hover:border-brand-300 transition-colors"
          >
            Cancel
          </Link>
        </div>
      </form>
    </div>
  );
}

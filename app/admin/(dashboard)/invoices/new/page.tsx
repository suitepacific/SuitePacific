"use client";

import { useActionState, useEffect, useState, useCallback } from "react";
import { createInvoiceAction } from "@/app/admin/(dashboard)/invoices/actions";
import Link from "next/link";
import { ArrowLeft, Plus, Trash2 } from "lucide-react";

const initialState = { error: "" };
const CURRENCIES = ["USD", "AUD", "GBP", "EUR", "CAD", "NZD", "SGD", "INR"];

interface ManualItem { description: string; quantity: string; unitPrice: string }
interface UnbilledEntry { id: string; date: string; hours: number; description: string; hourlyRate: number | null; ticketTitle?: string }
interface CustomerData {
  id: string; name: string; company: string;
  billingType: string; hourlyRate: number | null; monthlyRate: number | null; billingCurrency: string;
  unbilledEntries: UnbilledEntry[];
}

export default function NewInvoicePage() {
  const [state, formAction, pending] = useActionState(createInvoiceAction, initialState);
  const [customers, setCustomers] = useState<{ id: string; name: string; company: string }[]>([]);
  const [customerId, setCustomerId] = useState("");
  const [customerData, setCustomerData] = useState<CustomerData | null>(null);
  const [selectedEntryIds, setSelectedEntryIds] = useState<Set<string>>(new Set());
  const [manualItems, setManualItems] = useState<ManualItem[]>([]);
  const [taxPercent, setTaxPercent] = useState("0");
  const [currency, setCurrency] = useState("USD");
  const [today] = useState(() => new Date().toISOString().split("T")[0]);

  useEffect(() => {
    fetch("/api/admin/customers-with-tickets")
      .then((r) => r.json())
      .then(setCustomers)
      .catch(() => {});
  }, []);

  useEffect(() => {
    if (!customerId) { setCustomerData(null); return; }
    fetch(`/api/admin/customer-invoice-data?customerId=${customerId}`)
      .then((r) => r.json())
      .then((d: CustomerData) => {
        setCustomerData(d);
        setCurrency(d.billingCurrency || "USD");
        setSelectedEntryIds(new Set());
        // Prefill monthly retainer for MONTHLY/HYBRID billing
        if ((d.billingType === "MONTHLY" || d.billingType === "HYBRID") && d.monthlyRate) {
          const month = new Date().toLocaleString("en-US", { month: "long", year: "numeric" });
          setManualItems([{ description: `Monthly Retainer - ${month}`, quantity: "1", unitPrice: String(d.monthlyRate) }]);
        } else {
          setManualItems([]);
        }
      })
      .catch(() => {});
  }, [customerId]);

  const toggleEntry = (id: string) => {
    setSelectedEntryIds((prev) => {
      const next = new Set(prev);
      next.has(id) ? next.delete(id) : next.add(id);
      return next;
    });
  };

  const addManualItem = () => setManualItems((p) => [...p, { description: "", quantity: "1", unitPrice: "" }]);
  const removeManualItem = (i: number) => setManualItems((p) => p.filter((_, idx) => idx !== i));
  const updateManualItem = (i: number, field: keyof ManualItem, value: string) => {
    setManualItems((p) => p.map((item, idx) => idx === i ? { ...item, [field]: value } : item));
  };

  const calcSubtotal = useCallback(() => {
    let total = 0;
    if (customerData) {
      for (const e of customerData.unbilledEntries) {
        if (selectedEntryIds.has(e.id)) {
          total += e.hours * (e.hourlyRate ?? customerData.hourlyRate ?? 0);
        }
      }
    }
    for (const item of manualItems) {
      total += (parseFloat(item.quantity) || 0) * (parseFloat(item.unitPrice) || 0);
    }
    return total;
  }, [customerData, selectedEntryIds, manualItems]);

  const subtotal = calcSubtotal();
  const taxAmt = subtotal * (parseFloat(taxPercent) || 0) / 100;
  const total = subtotal + taxAmt;
  const fmt = (n: number) => n.toFixed(2);

  const inp = "w-full rounded-xl border border-brand-200 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-accent/30 focus:border-accent";
  const lbl = "block text-sm font-medium text-brand-700 mb-1.5";

  const validManualItems = manualItems.filter((i) => i.description && parseFloat(i.quantity) > 0 && parseFloat(i.unitPrice) >= 0);

  return (
    <div className="max-w-3xl">
      <Link href="/admin/invoices"
        className="inline-flex items-center gap-1.5 text-sm text-brand-400 hover:text-brand-900 mb-6">
        <ArrowLeft className="h-3.5 w-3.5" /> Back to Invoices
      </Link>
      <h1 className="text-2xl font-semibold text-brand-900 mb-8">New Invoice</h1>

      <form action={formAction} className="space-y-6">
        <input type="hidden" name="itemsJson" value={JSON.stringify(validManualItems.map((i) => ({
          description: i.description,
          quantity: parseFloat(i.quantity),
          unitPrice: parseFloat(i.unitPrice),
        })))} />
        {Array.from(selectedEntryIds).map((id) => (
          <input key={id} type="hidden" name="timeEntryIds[]" value={id} />
        ))}

        {/* Customer + dates */}
        <div className="bg-white rounded-2xl border border-brand-50 shadow-soft p-6 space-y-4">
          <p className="text-xs font-semibold text-brand-400 uppercase tracking-wide">Invoice Details</p>
          <div>
            <label htmlFor="customerId" className={lbl}>Customer <span className="text-red-500">*</span></label>
            <select id="customerId" name="customerId" required value={customerId}
              onChange={(e) => setCustomerId(e.target.value)} className={inp}>
              <option value="">Select customer</option>
              {customers.map((c) => (
                <option key={c.id} value={c.id}>{c.company} - {c.name}</option>
              ))}
            </select>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label htmlFor="issueDate" className={lbl}>Issue Date <span className="text-red-500">*</span></label>
              <input id="issueDate" name="issueDate" type="date" required defaultValue={today} className={inp} />
            </div>
            <div>
              <label htmlFor="dueDate" className={lbl}>Due Date <span className="text-brand-300 font-normal">(optional)</span></label>
              <input id="dueDate" name="dueDate" type="date" className={inp} />
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label htmlFor="currency" className={lbl}>Currency</label>
              <select id="currency" name="currency" value={currency}
                onChange={(e) => setCurrency(e.target.value)} className={inp}>
                {CURRENCIES.map((c) => <option key={c} value={c}>{c}</option>)}
              </select>
            </div>
            <div>
              <label htmlFor="taxPercent" className={lbl}>Tax % <span className="text-brand-300 font-normal">(GST/VAT)</span></label>
              <input id="taxPercent" name="taxPercent" type="number" step="0.01" min="0" max="100"
                value={taxPercent} onChange={(e) => setTaxPercent(e.target.value)}
                placeholder="0" className={inp} />
            </div>
          </div>
        </div>

        {/* Unbilled time entries */}
        {customerData && customerData.unbilledEntries.length > 0 && (
          <div className="bg-white rounded-2xl border border-brand-50 shadow-soft p-6">
            <div className="flex items-center justify-between mb-4">
              <p className="text-xs font-semibold text-brand-400 uppercase tracking-wide">Unbilled Time Entries</p>
              <button type="button"
                onClick={() => setSelectedEntryIds(
                  selectedEntryIds.size === customerData.unbilledEntries.length
                    ? new Set()
                    : new Set(customerData.unbilledEntries.map((e) => e.id))
                )}
                className="text-xs text-accent hover:underline">
                {selectedEntryIds.size === customerData.unbilledEntries.length ? "Deselect all" : "Select all"}
              </button>
            </div>
            <div className="space-y-2">
              {customerData.unbilledEntries.map((e) => {
                const rate = e.hourlyRate ?? customerData.hourlyRate ?? 0;
                const amt = e.hours * rate;
                const checked = selectedEntryIds.has(e.id);
                return (
                  <label key={e.id}
                    className={`flex items-start gap-3 p-3 rounded-xl border cursor-pointer transition-colors ${checked ? "bg-accent/5 border-accent/30" : "border-brand-100 hover:bg-brand-50/50"}`}>
                    <input type="checkbox" checked={checked} onChange={() => toggleEntry(e.id)}
                      className="mt-0.5 rounded border-brand-300 text-accent focus:ring-accent/30" />
                    <div className="flex-1 min-w-0">
                      <p className="text-sm text-brand-900 truncate">{e.description}</p>
                      <p className="text-xs text-brand-400 mt-0.5">
                        {new Date(e.date).toLocaleDateString("en-US", { month: "short", day: "numeric" })}
                        {e.ticketTitle && ` · ${e.ticketTitle}`}
                      </p>
                    </div>
                    <div className="text-right shrink-0">
                      <p className="text-sm font-medium text-brand-900">{currency} {fmt(amt)}</p>
                      <p className="text-xs text-brand-400">{e.hours}h × ${rate}/h</p>
                    </div>
                  </label>
                );
              })}
            </div>
          </div>
        )}

        {customerData && customerData.unbilledEntries.length === 0 && customerData.billingType === "HOURLY" && (
          <div className="bg-amber-50 border border-amber-100 rounded-2xl p-4">
            <p className="text-sm text-amber-700">No unbilled time entries for this customer. Log time first, or add a manual line item.</p>
          </div>
        )}

        {/* Manual line items */}
        <div className="bg-white rounded-2xl border border-brand-50 shadow-soft p-6">
          <div className="flex items-center justify-between mb-4">
            <p className="text-xs font-semibold text-brand-400 uppercase tracking-wide">Line Items</p>
            <button type="button" onClick={addManualItem}
              className="inline-flex items-center gap-1 text-xs text-accent hover:underline">
              <Plus className="h-3.5 w-3.5" /> Add item
            </button>
          </div>
          {manualItems.length === 0 ? (
            <p className="text-sm text-brand-300 text-center py-4">
              No manual items. Click &ldquo;Add item&rdquo; to add a retainer, milestone, or one-off charge.
            </p>
          ) : (
            <div className="space-y-3">
              {/* Header */}
              <div className="grid grid-cols-12 gap-2 text-xs text-brand-400 font-medium px-1">
                <div className="col-span-6">Description</div>
                <div className="col-span-2">Qty</div>
                <div className="col-span-3">Unit Price</div>
                <div className="col-span-1"></div>
              </div>
              {manualItems.map((item, i) => (
                <div key={i} className="grid grid-cols-12 gap-2 items-center">
                  <div className="col-span-6">
                    <input type="text" value={item.description}
                      onChange={(e) => updateManualItem(i, "description", e.target.value)}
                      placeholder="e.g. Monthly Retainer - July 2026" className={inp} />
                  </div>
                  <div className="col-span-2">
                    <input type="number" value={item.quantity} step="0.01" min="0.01"
                      onChange={(e) => updateManualItem(i, "quantity", e.target.value)}
                      placeholder="1" className={inp} />
                  </div>
                  <div className="col-span-3">
                    <input type="number" value={item.unitPrice} step="0.01" min="0"
                      onChange={(e) => updateManualItem(i, "unitPrice", e.target.value)}
                      placeholder="0.00" className={inp} />
                  </div>
                  <div className="col-span-1 flex justify-center">
                    <button type="button" onClick={() => removeManualItem(i)}
                      className="text-brand-300 hover:text-red-500 transition-colors">
                      <Trash2 className="h-4 w-4" />
                    </button>
                  </div>
                  <div className="col-span-12 text-right text-xs text-brand-400 -mt-1 px-1">
                    = {currency} {fmt((parseFloat(item.quantity) || 0) * (parseFloat(item.unitPrice) || 0))}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Notes */}
        <div className="bg-white rounded-2xl border border-brand-50 shadow-soft p-6">
          <label htmlFor="notes" className={lbl}>Notes <span className="text-brand-300 font-normal">(optional)</span></label>
          <textarea id="notes" name="notes" rows={3}
            placeholder="Payment instructions, bank details, thank you note, etc."
            className={`${inp} resize-none`} />
        </div>

        {/* Totals */}
        {(selectedEntryIds.size > 0 || manualItems.some((i) => i.description)) && (
          <div className="bg-brand-900 rounded-2xl p-6 text-white space-y-2">
            <div className="flex justify-between text-sm">
              <span className="text-brand-300">Subtotal</span>
              <span>{currency} {fmt(subtotal)}</span>
            </div>
            {parseFloat(taxPercent) > 0 && (
              <div className="flex justify-between text-sm">
                <span className="text-brand-300">Tax ({taxPercent}%)</span>
                <span>{currency} {fmt(taxAmt)}</span>
              </div>
            )}
            <div className="flex justify-between text-lg font-semibold border-t border-brand-700 pt-2 mt-2">
              <span>Total</span>
              <span>{currency} {fmt(total)}</span>
            </div>
          </div>
        )}

        {state?.error && (
          <p className="text-sm text-red-600 bg-red-50 rounded-xl px-4 py-3">{state.error}</p>
        )}

        <button type="submit" disabled={pending}
          className="w-full rounded-full bg-brand text-white text-sm font-medium py-3 hover:bg-brand-700 transition-colors disabled:opacity-60">
          {pending ? "Creating Invoice…" : "Create Invoice"}
        </button>
      </form>
    </div>
  );
}

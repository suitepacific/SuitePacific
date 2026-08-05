"use client";

import { useActionState } from "react";
import { logTimeEntryAction } from "@/app/admin/(dashboard)/time-entries/actions";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { useEffect, useState } from "react";

const initialState = { error: "" };

export default function NewTimeEntryPage() {
  const [state, formAction, pending] = useActionState(logTimeEntryAction, initialState);
  const [customers, setCustomers] = useState<{ id: string; name: string; company: string; hourlyRate: number | null; tickets: { id: string; title: string }[] }[]>([]);
  const [selectedCustomer, setSelectedCustomer] = useState("");
  const [today] = useState(() => new Date().toISOString().split("T")[0]);

  useEffect(() => {
    fetch("/api/admin/customers-with-tickets")
      .then((r) => r.json())
      .then(setCustomers)
      .catch(() => {});
  }, []);

  const customer = customers.find((c) => c.id === selectedCustomer);

  const inp = "w-full rounded-xl border border-brand-200 px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-accent/30 focus:border-accent";
  const lbl = "block text-sm font-medium text-brand-700 mb-1.5";

  return (
    <div className="max-w-lg">
      <Link href="/admin/time-entries"
        className="inline-flex items-center gap-1.5 text-sm text-brand-400 hover:text-brand-900 mb-6">
        <ArrowLeft className="h-3.5 w-3.5" /> Back
      </Link>

      <h1 className="text-2xl font-semibold text-brand-900 mb-1">Log Time</h1>
      <p className="text-sm text-brand-400 mb-8">Record time worked for a client.</p>

      <div className="bg-white rounded-2xl border border-brand-50 shadow-soft p-6">
        <form action={formAction} className="space-y-5">
          <div>
            <label htmlFor="customerId" className={lbl}>
              Customer <span className="text-red-500">*</span>
            </label>
            <select id="customerId" name="customerId" required
              value={selectedCustomer}
              onChange={(e) => setSelectedCustomer(e.target.value)}
              className={inp}>
              <option value="">Select customer</option>
              {customers.map((c) => (
                <option key={c.id} value={c.id}>{c.company} - {c.name}</option>
              ))}
            </select>
          </div>

          {customer?.tickets && customer.tickets.length > 0 && (
            <div>
              <label htmlFor="ticketId" className={lbl}>
                Linked Ticket <span className="text-brand-300 font-normal">(optional)</span>
              </label>
              <select id="ticketId" name="ticketId" className={inp}>
                <option value="">None</option>
                {customer.tickets.map((t) => (
                  <option key={t.id} value={t.id}>{t.title}</option>
                ))}
              </select>
            </div>
          )}

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label htmlFor="date" className={lbl}>
                Date <span className="text-red-500">*</span>
              </label>
              <input id="date" name="date" type="date" required defaultValue={today} className={inp} />
            </div>
            <div>
              <label htmlFor="hours" className={lbl}>
                Hours <span className="text-red-500">*</span>
              </label>
              <input id="hours" name="hours" type="number" step="0.25" min="0.25" max="24" required
                placeholder="e.g. 1.5" className={inp} />
            </div>
          </div>

          <div>
            <label htmlFor="description" className={lbl}>
              Description <span className="text-red-500">*</span>
            </label>
            <textarea id="description" name="description" required rows={3}
              placeholder="What was done - this appears on the invoice"
              className={`${inp} resize-none`} />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label htmlFor="hourlyRate" className={lbl}>
                Rate ($/h) <span className="text-brand-300 font-normal">(override)</span>
              </label>
              <input id="hourlyRate" name="hourlyRate" type="number" step="0.01" min="0"
                placeholder={customer?.hourlyRate != null ? `Default: $${customer.hourlyRate}` : "Use customer default"}
                className={inp} />
            </div>
            <div>
              <label className={lbl}>Billable</label>
              <select name="isBillable" className={inp}>
                <option value="true">Yes - billable</option>
                <option value="false">No - internal</option>
              </select>
            </div>
          </div>

          {state?.error && (
            <p className="text-sm text-red-600 bg-red-50 rounded-xl px-4 py-2.5">{state.error}</p>
          )}

          <button type="submit" disabled={pending}
            className="w-full rounded-full bg-brand text-white text-sm font-medium py-3 hover:bg-brand-700 transition-colors disabled:opacity-60">
            {pending ? "Saving…" : "Log Time"}
          </button>
        </form>
      </div>
    </div>
  );
}

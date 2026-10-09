"use client";

import { useActionState } from "react";
import Link from "next/link";
import { createEmployeeAction } from "../actions";

interface Customer { id: string; company: string; name: string }

export function NewEmployeeForm({ customers }: { customers: Customer[] }) {
  const [state, action, pending] = useActionState(createEmployeeAction, null);

  return (
    <div className="max-w-lg">
      <div className="mb-6">
        <Link href="/admin/employees" className="text-sm text-brand-400 hover:text-accent transition-colors">
          &larr; Back to Employees
        </Link>
        <h1 className="mt-3 text-2xl font-semibold text-brand-900">Add Employee</h1>
        <p className="mt-1 text-sm text-brand-400">Create login credentials and assign a customer.</p>
      </div>

      <form action={action} className="bg-white rounded-2xl border border-brand-50 shadow-soft p-6 space-y-5">
        {state?.error && (
          <p className="text-sm text-red-600 bg-red-50 rounded-xl px-4 py-3">{state.error}</p>
        )}

        <div>
          <label className="block text-sm font-medium text-brand-700 mb-1.5">Full Name</label>
          <input
            name="name"
            type="text"
            required
            maxLength={100}
            className="w-full rounded-xl border border-brand-100 px-3 py-2 text-sm text-brand-900 focus:outline-none focus:ring-2 focus:ring-brand/30"
            placeholder="Jane Smith"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-brand-700 mb-1.5">Email (login ID)</label>
          <input
            name="email"
            type="email"
            required
            maxLength={200}
            className="w-full rounded-xl border border-brand-100 px-3 py-2 text-sm text-brand-900 focus:outline-none focus:ring-2 focus:ring-brand/30"
            placeholder="jane@example.com"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-brand-700 mb-1.5">Password</label>
          <input
            name="password"
            type="password"
            required
            minLength={8}
            className="w-full rounded-xl border border-brand-100 px-3 py-2 text-sm text-brand-900 focus:outline-none focus:ring-2 focus:ring-brand/30"
            placeholder="Min. 8 characters"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-brand-700 mb-1.5">Assigned Customer</label>
          <select
            name="customerId"
            required
            className="w-full rounded-xl border border-brand-100 px-3 py-2 text-sm text-brand-900 focus:outline-none focus:ring-2 focus:ring-brand/30"
          >
            <option value="">Select a customer</option>
            {customers.map((c) => (
              <option key={c.id} value={c.id}>{c.company} ({c.name})</option>
            ))}
          </select>
          <p className="mt-1 text-xs text-brand-400">The employee will only see their own time entries for this customer.</p>
        </div>

        <div className="pt-2 flex gap-3">
          <button
            type="submit"
            disabled={pending}
            className="rounded-full bg-brand text-white text-sm font-medium px-5 py-2 hover:bg-brand-700 disabled:opacity-50 transition-colors"
          >
            {pending ? "Creating..." : "Create Employee"}
          </button>
          <Link href="/admin/employees"
            className="rounded-full border border-brand-100 text-brand-500 text-sm font-medium px-5 py-2 hover:border-brand-300 transition-colors">
            Cancel
          </Link>
        </div>
      </form>
    </div>
  );
}

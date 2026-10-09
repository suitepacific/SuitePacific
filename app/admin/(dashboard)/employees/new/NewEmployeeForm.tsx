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
        <p className="mt-1 text-sm text-brand-400">Create login credentials and assign customers.</p>
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
          <label className="block text-sm font-medium text-brand-700 mb-1.5">Username (login ID)</label>
          <input
            name="username"
            type="text"
            required
            maxLength={50}
            pattern="[a-z0-9._-]+"
            className="w-full rounded-xl border border-brand-100 px-3 py-2 text-sm text-brand-900 font-mono focus:outline-none focus:ring-2 focus:ring-brand/30"
            placeholder="jane.smith"
          />
          <p className="mt-1 text-xs text-brand-400">Lowercase letters, numbers, dots, underscores, hyphens only.</p>
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
          <label className="block text-sm font-medium text-brand-700 mb-2">Assigned Customers</label>
          <div className="space-y-2 max-h-56 overflow-y-auto rounded-xl border border-brand-100 p-3">
            {customers.length === 0 ? (
              <p className="text-sm text-brand-300 py-2 text-center">No customers yet.</p>
            ) : (
              customers.map((c) => (
                <label key={c.id} className="flex items-center gap-2.5 cursor-pointer hover:bg-brand-50 rounded-lg px-2 py-1.5 transition-colors">
                  <input
                    type="checkbox"
                    name="customerIds[]"
                    value={c.id}
                    className="rounded border-brand-300 text-brand focus:ring-brand/30"
                  />
                  <span className="text-sm text-brand-700">{c.company}</span>
                  <span className="text-xs text-brand-400">({c.name})</span>
                </label>
              ))
            )}
          </div>
          <p className="mt-1 text-xs text-brand-400">Select one or more. The employee can log time against any assigned customer.</p>
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

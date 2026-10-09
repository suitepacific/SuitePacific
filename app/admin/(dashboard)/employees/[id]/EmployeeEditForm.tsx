"use client";

import { useActionState } from "react";
import Link from "next/link";
import { updateEmployeeAction, deleteEmployeeAction } from "../actions";

interface Customer { id: string; company: string; name: string }
interface Employee {
  id: string;
  name: string;
  username: string;
  isActive: boolean;
  customers: Customer[];
  createdAt: Date;
}
interface TimeEntryRow { id: string; date: Date; hours: number; description: string }

export function EmployeeEditForm({
  employee,
  customers,
  recentEntries,
}: {
  employee: Employee;
  customers: Customer[];
  recentEntries: TimeEntryRow[];
}) {
  const [state, action, pending] = useActionState(updateEmployeeAction, null);
  const assignedIds = new Set(employee.customers.map((c) => c.id));

  return (
    <div className="max-w-lg">
      <div className="mb-6">
        <Link href="/admin/employees" className="text-sm text-brand-400 hover:text-accent transition-colors">
          &larr; Back to Employees
        </Link>
        <h1 className="mt-3 text-2xl font-semibold text-brand-900">{employee.name}</h1>
        <p className="mt-1 text-sm text-brand-400 font-mono">{employee.username}</p>
      </div>

      <form action={action} className="bg-white rounded-2xl border border-brand-50 shadow-soft p-6 space-y-5 mb-6">
        <input type="hidden" name="id" value={employee.id} />

        {state?.error && (
          <p className="text-sm text-red-600 bg-red-50 rounded-xl px-4 py-3">{state.error}</p>
        )}
        {state?.success && (
          <p className="text-sm text-green-700 bg-green-50 rounded-xl px-4 py-3">Changes saved.</p>
        )}

        <div>
          <label className="block text-sm font-medium text-brand-700 mb-1.5">Full Name</label>
          <input
            name="name"
            type="text"
            required
            maxLength={100}
            defaultValue={employee.name}
            className="w-full rounded-xl border border-brand-100 px-3 py-2 text-sm text-brand-900 focus:outline-none focus:ring-2 focus:ring-brand/30"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-brand-700 mb-1.5">Username</label>
          <p className="text-sm text-brand-400 bg-brand-50 rounded-xl px-3 py-2 font-mono">{employee.username}</p>
          <p className="mt-1 text-xs text-brand-300">Username cannot be changed after creation.</p>
        </div>

        <div>
          <label className="block text-sm font-medium text-brand-700 mb-2">Assigned Customers</label>
          <div className="space-y-2 max-h-56 overflow-y-auto rounded-xl border border-brand-100 p-3">
            {customers.map((c) => (
              <label key={c.id} className="flex items-center gap-2.5 cursor-pointer hover:bg-brand-50 rounded-lg px-2 py-1.5 transition-colors">
                <input
                  type="checkbox"
                  name="customerIds[]"
                  value={c.id}
                  defaultChecked={assignedIds.has(c.id)}
                  className="rounded border-brand-300 text-brand focus:ring-brand/30"
                />
                <span className="text-sm text-brand-700">{c.company}</span>
                <span className="text-xs text-brand-400">({c.name})</span>
              </label>
            ))}
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-brand-700 mb-1.5">New Password</label>
          <input
            name="newPassword"
            type="password"
            minLength={8}
            className="w-full rounded-xl border border-brand-100 px-3 py-2 text-sm text-brand-900 focus:outline-none focus:ring-2 focus:ring-brand/30"
            placeholder="Leave blank to keep current password"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-brand-700 mb-2">Status</label>
          <div className="flex gap-4">
            <label className="flex items-center gap-2 text-sm text-brand-700 cursor-pointer">
              <input type="radio" name="isActive" value="true" defaultChecked={employee.isActive} className="text-brand" />
              Active
            </label>
            <label className="flex items-center gap-2 text-sm text-brand-700 cursor-pointer">
              <input type="radio" name="isActive" value="false" defaultChecked={!employee.isActive} className="text-brand" />
              Inactive
            </label>
          </div>
          <p className="mt-1 text-xs text-brand-400">Inactive employees cannot log in.</p>
        </div>

        <div className="pt-2">
          <button
            type="submit"
            disabled={pending}
            className="rounded-full bg-brand text-white text-sm font-medium px-5 py-2 hover:bg-brand-700 disabled:opacity-50 transition-colors"
          >
            {pending ? "Saving..." : "Save Changes"}
          </button>
        </div>
      </form>

      {recentEntries.length > 0 && (
        <div className="bg-white rounded-2xl border border-brand-50 shadow-soft overflow-hidden mb-6">
          <div className="px-5 py-4 border-b border-brand-50">
            <p className="text-sm font-medium text-brand-900">Recent time entries</p>
          </div>
          <div className="divide-y divide-brand-50">
            {recentEntries.map((e) => (
              <div key={e.id} className="px-5 py-3 flex items-center justify-between">
                <div>
                  <p className="text-sm text-brand-700 truncate max-w-xs">{e.description}</p>
                  <p className="text-xs text-brand-400 mt-0.5">
                    {new Date(e.date).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })}
                  </p>
                </div>
                <span className="text-sm font-medium text-brand-900 tabular-nums">{e.hours.toFixed(1)}h</span>
              </div>
            ))}
          </div>
        </div>
      )}

      <div className="bg-white rounded-2xl border border-red-100 shadow-soft p-6">
        <p className="text-sm font-medium text-red-700 mb-1">Delete employee</p>
        <p className="text-xs text-brand-400 mb-4">
          Permanently deletes the account. Their time entries remain in the system.
        </p>
        <form action={deleteEmployeeAction.bind(null, employee.id)}>
          <button
            type="submit"
            className="text-sm text-red-600 hover:text-red-800 font-medium transition-colors"
            onClick={(e) => {
              if (!confirm(`Delete ${employee.name}? This cannot be undone.`)) e.preventDefault();
            }}
          >
            Delete employee
          </button>
        </form>
      </div>
    </div>
  );
}

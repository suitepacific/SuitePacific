"use client";

import { useActionState } from "react";
import { addNsAccountAction } from "@/app/suitecompare/(dashboard)/accounts/actions";
import { ArrowLeft, Building2 } from "lucide-react";
import Link from "next/link";

export default function NewAccountPage() {
  const [state, action, pending] = useActionState(addNsAccountAction, {});

  return (
    <div className="max-w-lg">
      <div className="mb-8">
        <Link
          href="/suitecompare/dashboard"
          className="inline-flex items-center gap-1.5 text-xs text-brand-400 hover:text-brand-700 mb-4"
        >
          <ArrowLeft className="h-3 w-3" />
          Dashboard
        </Link>
        <h1 className="text-2xl font-semibold text-brand-900">Add Client</h1>
        <p className="mt-1 text-sm text-brand-400">
          Connect a client&apos;s NetSuite account. Production and Sandbox environments will be created automatically.
        </p>
      </div>

      <div className="bg-white rounded-2xl border border-brand-50 shadow-soft p-6">
        <div className="flex items-center gap-3 mb-6 pb-6 border-b border-brand-50">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-accent/10">
            <Building2 className="h-5 w-5 text-accent" />
          </div>
          <div>
            <p className="text-sm font-semibold text-brand-900">New Client</p>
            <p className="text-xs text-brand-400">Phase 1 uses mock data for script content</p>
          </div>
        </div>

        <form action={action} className="space-y-5">
          <div>
            <label
              htmlFor="name"
              className="block text-sm font-medium text-brand-700 mb-1.5"
            >
              Client Name
            </label>
            <input
              id="name"
              name="name"
              type="text"
              required
              placeholder="e.g. Acme Corp"
              className="w-full rounded-xl border border-brand-100 bg-brand-50/40 px-4 py-2.5 text-sm text-brand-900 placeholder-brand-300 outline-none focus:border-accent focus:ring-2 focus:ring-accent/20 transition"
            />
            <p className="mt-1 text-xs text-brand-300">
              A name to identify this client
            </p>
          </div>

          <div>
            <label
              htmlFor="nsAccountId"
              className="block text-sm font-medium text-brand-700 mb-1.5"
            >
              NetSuite Account ID
            </label>
            <input
              id="nsAccountId"
              name="nsAccountId"
              type="text"
              required
              placeholder="e.g. 1234567"
              className="w-full rounded-xl border border-brand-100 bg-brand-50/40 px-4 py-2.5 text-sm text-brand-900 font-mono placeholder-brand-300 outline-none focus:border-accent focus:ring-2 focus:ring-accent/20 transition"
            />
            <p className="mt-1 text-xs text-brand-300">
              The numeric account ID shown in your NetSuite URL (e.g. 1234567.app.netsuite.com)
            </p>
          </div>

          {state.error && (
            <p className="text-sm text-red-600 bg-red-50 rounded-xl px-4 py-2.5">
              {state.error}
            </p>
          )}

          <div className="pt-2 flex items-center gap-3">
            <button
              type="submit"
              disabled={pending}
              className="flex-1 rounded-xl bg-accent px-4 py-2.5 text-sm font-medium text-white hover:bg-accent/90 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              {pending ? "Creating..." : "Create Client"}
            </button>
            <Link
              href="/suitecompare/dashboard"
              className="rounded-xl border border-brand-100 px-4 py-2.5 text-sm font-medium text-brand-500 hover:bg-brand-50 hover:text-brand-900 transition-colors"
            >
              Cancel
            </Link>
          </div>
        </form>
      </div>

      <div className="mt-6 rounded-xl bg-brand-50 border border-brand-100 p-4">
        <p className="text-xs font-medium text-brand-700 mb-2">What happens next?</p>
        <ul className="space-y-1.5 text-xs text-brand-400">
          <li className="flex items-start gap-2">
            <span className="text-accent font-bold mt-0.5">1</span>
            <span>Production and Sandbox environments are created for this account</span>
          </li>
          <li className="flex items-start gap-2">
            <span className="text-accent font-bold mt-0.5">2</span>
            <span>Browse individual scripts by entering their Script ID</span>
          </li>
          <li className="flex items-start gap-2">
            <span className="text-accent font-bold mt-0.5">3</span>
            <span>Compare any browsed script between Production and Sandbox</span>
          </li>
        </ul>
      </div>
    </div>
  );
}

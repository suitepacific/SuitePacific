"use client";

import { useActionState } from "react";
import { addNsAccountAction } from "@/app/suitecompare/(dashboard)/accounts/actions";
import { ArrowLeft, Building2, KeyRound, Info } from "lucide-react";
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
          Connect a client&apos;s NetSuite account to start comparing scripts across environments.
        </p>
      </div>

      {/* What you'll need */}
      <div className="mb-5 rounded-xl bg-accent/5 border border-accent/15 p-4 flex gap-3">
        <KeyRound className="h-4 w-4 text-accent shrink-0 mt-0.5" />
        <div>
          <p className="text-xs font-semibold text-brand-900 mb-1">You&apos;ll need TBA credentials</p>
          <p className="text-xs text-brand-500 leading-relaxed">
            After adding a client, configure Token-Based Authentication (TBA) credentials for each
            environment. In NetSuite, go to <span className="font-medium text-brand-700">Setup → Integration → Manage Integrations</span> to
            create an integration record and generate access tokens.
          </p>
        </div>
      </div>

      <div className="bg-white rounded-2xl border border-brand-50 shadow-soft p-6">
        <div className="flex items-center gap-3 mb-6 pb-6 border-b border-brand-50">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-accent/10">
            <Building2 className="h-5 w-5 text-accent" />
          </div>
          <div>
            <p className="text-sm font-semibold text-brand-900">New Client</p>
            <p className="text-xs text-brand-400">Production and Sandbox environments created automatically</p>
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
              A name to identify this client in your workspace
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
            <p className="mt-1 text-xs text-brand-300 flex items-start gap-1">
              <Info className="h-3 w-3 shrink-0 mt-0.5" />
              Find this in your NetSuite URL, e.g.{" "}
              <span className="font-mono">1234567</span>.app.netsuite.com
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
        <p className="text-xs font-medium text-brand-700 mb-2">What happens next</p>
        <ol className="space-y-2 text-xs text-brand-400">
          <li className="flex items-start gap-2">
            <span className="text-accent font-bold shrink-0 mt-0.5">1</span>
            <span>Production and Sandbox environments are created for this account</span>
          </li>
          <li className="flex items-start gap-2">
            <span className="text-accent font-bold shrink-0 mt-0.5">2</span>
            <span>
              Click the settings icon on each environment to enter your TBA credentials. This
              unlocks real script content from NetSuite
            </span>
          </li>
          <li className="flex items-start gap-2">
            <span className="text-accent font-bold shrink-0 mt-0.5">3</span>
            <span>Browse scripts by Script ID and compare them side-by-side across environments</span>
          </li>
        </ol>
      </div>
    </div>
  );
}

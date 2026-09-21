import type { Metadata } from "next";
import Link from "next/link";
import { CheckCircle2, XCircle, Clock } from "lucide-react";
import { BreadcrumbJsonLd, OrganizationJsonLd } from "@/components/seo/JsonLd";
import { FreeScriptCheckForm } from "@/components/sections/FreeScriptCheckForm";
import { ChecklistWithScore } from "@/components/sections/ChecklistWithScore";
import { SITE_URL } from "@/lib/content";

export const metadata: Metadata = {
  title: {
    absolute: "NetSuite 2028.2 SuiteScript Readiness Checklist | SuitePacific",
  },
  description:
    "Verify your NetSuite account is ready for the 2028.2 SuiteScript deadline. Ten questions covering scripts, processes, sandbox access, and migration timeline.",
  alternates: { canonical: "/netsuite-suitescript-readiness-checklist" },
  openGraph: {
    title: "NetSuite 2028.2 SuiteScript Readiness Checklist | SuitePacific",
    description:
      "Oracle NetSuite has confirmed SuiteScript 1.0, 2.0, and 2.x will stop working in 2028.2. Use this checklist to verify your account is ready before the deadline.",
    url: `${SITE_URL}/netsuite-suitescript-readiness-checklist`,
    type: "website",
    images: [{ url: `${SITE_URL}/og-default.png`, width: 1200, height: 630 }],
  },
};

export default function ScriptReadinessChecklistPage() {
  return (
    <main className="pt-32 pb-24 sm:pt-40 sm:pb-32">
      <BreadcrumbJsonLd
        items={[
          { name: "Home", url: SITE_URL },
          { name: "NetSuite SuiteScript Migration", url: `${SITE_URL}/netsuite-suitescript-migration` },
          { name: "SuiteScript 2028.2 Readiness Checklist", url: `${SITE_URL}/netsuite-suitescript-readiness-checklist` },
        ]}
      />
      <OrganizationJsonLd />

      <div className="mx-auto max-w-3xl px-6 lg:px-8">

        {/* Alert */}
        <div className="flex items-start gap-3 rounded-2xl border border-red-200 bg-red-50 p-4">
          <svg className="h-5 w-5 text-red-500 mt-0.5 shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126zM12 15.75h.007v.008H12v-.008z"/></svg>
          <p className="text-sm text-red-700">
            <span className="font-semibold">NetSuite 2028.2 confirmed deadline:</span>{" "}
            Oracle NetSuite has confirmed that SuiteScript 1.0, 2.0, and 2.x scripts will stop working in the 2028.2 release.
          </p>
        </div>

        {/* Hero */}
        <div className="mt-8">
          <p className="text-xs font-semibold uppercase tracking-widest text-accent mb-3">SuiteScript Migration Readiness</p>
          <h1 className="text-3xl sm:text-4xl font-bold text-brand-900 leading-tight mb-4">
            NetSuite 2028.2 SuiteScript Readiness Checklist
          </h1>
          <p className="text-base text-brand-500 leading-relaxed">
            Use this checklist to verify how prepared your NetSuite account is for the 2028.2 SuiteScript deadline. Ten questions covering script inventory, process dependencies, testing environment readiness, and migration scope. Each question includes context explaining why it matters and what to check.
          </p>
        </div>

        {/* Score guide */}
        <div className="mt-6 grid grid-cols-1 sm:grid-cols-3 gap-3">
          {[
            { icon: CheckCircle2, color: "text-emerald-600", bg: "bg-emerald-50 border-emerald-100", label: "Ready to plan", desc: "8 or more yes answers and all critical questions answered yes." },
            { icon: Clock, color: "text-amber-600", bg: "bg-amber-50 border-amber-100", label: "Action needed", desc: "5-7 yes answers, or one critical question answered no." },
            { icon: XCircle, color: "text-red-600", bg: "bg-red-50 border-red-100", label: "Start now", desc: "Fewer than 5 yes answers, or two or more critical gaps." },
          ].map(({ icon: Icon, color, bg, label, desc }) => (
            <div key={label} className={`rounded-xl border p-4 ${bg}`}>
              <div className="flex items-center gap-2 mb-1.5">
                <Icon className={`h-4 w-4 ${color}`} />
                <p className={`text-sm font-semibold ${color}`}>{label}</p>
              </div>
              <p className="text-xs text-brand-400">{desc}</p>
            </div>
          ))}
        </div>

        {/* Lead form */}
        <div className="mt-10 rounded-2xl border-2 border-accent/30 bg-gradient-to-br from-accent/5 to-transparent p-6">
          <p className="text-xs font-semibold uppercase tracking-wide text-accent mb-2">Free SuiteScript 2.1 Readiness Check</p>
          <h2 className="text-base font-bold text-brand-900 mb-1">
            Want Help Reviewing Your Readiness?
          </h2>
          <p className="text-sm text-brand-400 mb-5">
            Answer three quick questions and we will send you an initial estimate for the SuiteScript compatibility audit within one business day. SuiteCloud Developer II certified.
          </p>
          <FreeScriptCheckForm source="suitescript_readiness_checklist" />
        </div>

        {/* Checklist */}
        <div className="mt-14">
          <h2 className="text-xl font-bold text-brand-900 mb-2">The 10-question SuiteScript 2028.2 readiness checklist</h2>
          <p className="text-sm text-brand-400 mb-6">
            Review each question and select your answer. A &quot;no&quot; answer is not a crisis; it is a gap to close before the migration begins. Critical items represent questions where a &quot;no&quot; answer creates the most operational risk after the 2028.2 upgrade. Your result updates automatically as you answer.
          </p>
          <ChecklistWithScore />
        </div>

        {/* What to do next */}
        <div className="mt-14">
          <h2 className="text-xl font-bold text-brand-900 mb-4">What to do with your checklist results</h2>
          <div className="space-y-4">
            {[
              {
                heading: "If you are ready to plan (8 or more yes, no critical gaps)",
                body: "Your account has good foundational readiness. The next step is completing the formal script inventory and risk classification to confirm the migration scope and timeline before conversion begins.",
              },
              {
                heading: "If action is needed (5-7 yes, or one critical gap)",
                body: "There are meaningful gaps to close before the migration can start safely. Focus first on identifying all legacy scripts, mapping critical business processes, and confirming a testing environment. These gaps represent the highest risk if left unresolved.",
              },
              {
                heading: "If you should start now (fewer than 5 yes, or two or more critical gaps)",
                body: "The migration audit should begin now. Without a script inventory you do not know the scope. Without process mapping you cannot prioritize. Without a testing environment you cannot validate safely. Starting the audit creates the visibility needed to plan the rest of the work.",
              },
              {
                heading: "If you have third-party or bundle scripts",
                body: "Scripts installed through managed bundles may be locked or controlled by the SuiteApp provider. If the files cannot be modified, the provider must release a SuiteScript 2.1-compatible update before the 2028.2 deadline. Unlocked or unmanaged bundle components should be reviewed as part of the standard audit.",
              },
            ].map(({ heading, body }) => (
              <div key={heading} className="rounded-2xl border border-brand-100 bg-white p-5">
                <p className="text-sm font-semibold text-brand-900 mb-1.5">{heading}</p>
                <p className="text-sm text-brand-400">{body}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Final CTA */}
        <div className="mt-10 rounded-2xl border border-brand-100 bg-white p-6 shadow-soft">
          <p className="text-sm font-bold text-brand-900 mb-1">Ready to start the SuiteScript compatibility audit?</p>
          <p className="text-sm text-brand-400 mb-4">
            SuitePacific identifies every legacy script in your account, classifies each by business risk, and produces a migration scope and estimate before any conversion work begins.
          </p>
          <Link
            href="/netsuite-suitescript-migration#free-check-form"
            className="inline-flex items-center justify-center rounded-xl bg-accent px-5 py-3 text-sm font-semibold text-white hover:bg-accent/90 transition-colors"
          >
            Request a Free SuiteScript Check
          </Link>
          <p className="mt-3 text-xs text-brand-300">
            SuiteCloud Developer II certified · Sandbox-first delivery · Month-to-month from $799
          </p>
          <p className="mt-2 text-xs text-brand-300">Last updated September 2026</p>
        </div>

        {/* Related reading */}
        <div className="mt-8 rounded-2xl border border-brand-100 bg-brand-50/30 p-5 sm:p-6">
          <p className="text-sm font-semibold text-brand-900 mb-3">Related reading</p>
          <ul className="space-y-2.5">
            <li className="text-sm text-brand-400">
              <Link href="/netsuite-suitescript-migration" className="text-accent hover:underline">
                NetSuite SuiteScript 2.1 migration services
              </Link>{" "}
              covers the full six-stage migration service: inventory, risk classification, conversion, sandbox testing, and production deployment.
            </li>
            <li className="text-sm text-brand-400">
              <Link href="/blog/netsuite-suitescript-2-1-migration" className="text-accent hover:underline">
                NetSuite SuiteScript 2.1 migration: full audit and upgrade guide
              </Link>{" "}
              covers version differences, what each conversion type involves, and how to prioritize scripts by business risk before the 2028.2 deadline.
            </li>
            <li className="text-sm text-brand-400">
              <Link href="/netsuite-technical-debt" className="text-accent hover:underline">
                NetSuite technical debt
              </Link>{" "}
              covers the broader account review that often accompanies a migration: script governance, workflow cleanup, and performance.
            </li>
          </ul>
        </div>

      </div>
    </main>
  );
}

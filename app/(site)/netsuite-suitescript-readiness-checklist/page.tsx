import type { Metadata } from "next";
import Link from "next/link";
import { CheckCircle2, XCircle, AlertTriangle, Clock } from "lucide-react";
import { BreadcrumbJsonLd, OrganizationJsonLd } from "@/components/seo/JsonLd";
import { ScriptReadinessForm } from "@/components/sections/ScriptReadinessForm";
import { SITE_URL } from "@/lib/content";

export const metadata: Metadata = {
  title: "SuiteScript 2028.2 Readiness Checklist | SuitePacific",
  description:
    "Verify your NetSuite account is ready for the 2028.2 SuiteScript deadline. Ten questions covering scripts, processes, sandbox access, and migration timeline.",
  alternates: { canonical: "/netsuite-suitescript-readiness-checklist" },
  openGraph: {
    title: "SuiteScript 2028.2 Readiness Checklist | SuitePacific",
    description:
      "Oracle NetSuite has confirmed SuiteScript 1.0, 2.0, and 2.x will stop working in 2028.2. Use this checklist to verify your account is ready before the deadline.",
    url: `${SITE_URL}/netsuite-suitescript-readiness-checklist`,
    type: "website",
    images: [{ url: `${SITE_URL}/og-default.png`, width: 1200, height: 630 }],
  },
};

type CheckStatus = "yes" | "partial" | "no" | "na";

interface CheckItem {
  id: string;
  question: string;
  detail: string;
  yesLabel: string;
  noLabel: string;
  risk: "critical" | "high" | "medium";
}

const CHECKLIST: CheckItem[] = [
  {
    id: "c1",
    question: "Have you identified whether the account contains SuiteScript 1.0, 2.0, or 2.x scripts?",
    detail: "Go to Customization > Scripting > Scripts and check the API Version column. Look for scripts showing 1.0, 2.0, or 2.x. This list may not show library files or scripts installed through bundles.",
    yesLabel: "Yes, we have a version list",
    noLabel: "No, we have not checked",
    risk: "critical",
  },
  {
    id: "c2",
    question: "Have you identified which of those scripts are actively deployed to Production?",
    detail: "A script that is not deployed to Production carries lower immediate risk. Use the Deployments column to filter for active Production deployments on legacy-version scripts.",
    yesLabel: "Yes, we know which are active",
    noLabel: "No, we have not checked deployments",
    risk: "critical",
  },
  {
    id: "c3",
    question: "Do you know who owns or originally built each legacy script?",
    detail: "Scripts built by former employees, previous implementation partners, or third-party developers may contain undocumented business logic. Owner identification is required before conversion work can begin.",
    yesLabel: "Yes, ownership is documented",
    noLabel: "No, many scripts have no known owner",
    risk: "high",
  },
  {
    id: "c4",
    question: "Have you reviewed whether any legacy scripts share library files?",
    detail: "A single shared library file referenced by multiple scripts can affect every dependent script if it contains compatibility issues. Library files must be identified and reviewed as part of the migration scope.",
    yesLabel: "Yes, shared libraries are mapped",
    noLabel: "No, library dependencies are unknown",
    risk: "high",
  },
  {
    id: "c5",
    question: "Have you mapped which critical business processes depend on legacy scripts?",
    detail: "Sales order saves, invoice generation, fulfillment, approval routing, batch jobs, and integrations are the highest-risk areas. Scripts controlling these processes must be migrated first.",
    yesLabel: "Yes, critical processes are mapped",
    noLabel: "No, process dependencies are unknown",
    risk: "critical",
  },
  {
    id: "c6",
    question: "Have you identified scripts installed through bundles or third-party SuiteApps?",
    detail: "Scripts distributed through managed bundles must be updated by the SuiteApp provider. These cannot be converted by your team or a third-party developer without modifying the bundle. They require separate action.",
    yesLabel: "Yes, bundle scripts are separated",
    noLabel: "No, we have not checked for bundle scripts",
    risk: "high",
  },
  {
    id: "c7",
    question: "Does the account have an active Sandbox environment available for testing?",
    detail: "Sandbox testing is required before any converted script is deployed to Production. Converting scripts without a Sandbox means testing happens directly in Production, which creates significant risk.",
    yesLabel: "Yes, Sandbox is available",
    noLabel: "No, we do not have an active Sandbox",
    risk: "critical",
  },
  {
    id: "c8",
    question: "Do test cases exist for the business processes that legacy scripts support?",
    detail: "Test cases document what must be verified after conversion. Without them, testing relies on memory and may miss edge cases. Critical processes should have documented test scenarios before conversion begins.",
    yesLabel: "Yes, test cases are documented",
    noLabel: "No, test cases do not exist",
    risk: "medium",
  },
  {
    id: "c9",
    question: "Are business process owners available to review and confirm converted scripts before Production deployment?",
    detail: "User acceptance testing by the people who run the processes is the most effective way to confirm a converted script behaves correctly. If business users are unavailable, the migration team cannot confirm business-level accuracy.",
    yesLabel: "Yes, business owners can participate",
    noLabel: "No, we would not have business-owner UAT",
    risk: "medium",
  },
  {
    id: "c10",
    question: "Has a migration timeline been discussed or approved that completes before the 2028.2 upgrade window?",
    detail: "The 2028.2 upgrade typically releases in late 2028. Accounts with large or complex script inventories need to start in 2026 or 2027 to avoid time pressure. A defined timeline ensures the work is planned rather than reactive.",
    yesLabel: "Yes, we have a plan or timeline",
    noLabel: "No, migration has not been planned",
    risk: "high",
  },
];

const RISK_CONFIG = {
  critical: {
    label: "Critical",
    badge: "bg-red-50 text-red-700 border border-red-200",
  },
  high: {
    label: "High",
    badge: "bg-amber-50 text-amber-700 border border-amber-200",
  },
  medium: {
    label: "Medium",
    badge: "bg-yellow-50 text-yellow-700 border border-yellow-200",
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
          <AlertTriangle className="h-5 w-5 text-red-500 mt-0.5 shrink-0" />
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
            Use this checklist to verify how prepared your NetSuite account is for the 2028.2 SuiteScript deadline. Ten questions covering script inventory, process dependencies, sandbox readiness, and migration scope. Each question includes context explaining why it matters and what to check.
          </p>
        </div>

        {/* Score guide */}
        <div className="mt-6 grid grid-cols-1 sm:grid-cols-3 gap-3">
          {[
            { icon: CheckCircle2, color: "text-emerald-600", bg: "bg-emerald-50 border-emerald-100", label: "Ready", desc: "8-10 yes answers. Well positioned for the migration." },
            { icon: Clock, color: "text-amber-600", bg: "bg-amber-50 border-amber-100", label: "Action needed", desc: "5-7 yes answers. Key gaps to close before starting." },
            { icon: XCircle, color: "text-red-600", bg: "bg-red-50 border-red-100", label: "Start now", desc: "Fewer than 5 yes answers. The audit should begin immediately." },
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
          <p className="text-xs font-semibold uppercase tracking-wide text-accent mb-2">Request a migration estimate</p>
          <h2 className="text-base font-bold text-brand-900 mb-1">
            Tell us about your scripts. We&apos;ll scope the audit.
          </h2>
          <p className="text-sm text-brand-400 mb-5">
            Answer four questions and we will review your account details and send a migration scope estimate within one business day. SuiteCloud Developer II certified.
          </p>
          <ScriptReadinessForm />
        </div>

        {/* Checklist */}
        <div className="mt-14">
          <h2 className="text-xl font-bold text-brand-900 mb-2">The 10-question SuiteScript 2028.2 readiness checklist</h2>
          <p className="text-sm text-brand-400 mb-6">
            Review each question honestly. A &quot;no&quot; answer is not a crisis; it is a gap to close before the migration begins. Critical items represent questions where a &quot;no&quot; answer creates the most operational risk after the 2028.2 upgrade.
          </p>

          <div className="space-y-4">
            {CHECKLIST.map((item, i) => {
              const risk = RISK_CONFIG[item.risk];
              return (
                <div key={item.id} className="rounded-2xl border border-brand-100 bg-white p-5">
                  <div className="flex items-start gap-3 mb-3">
                    <span className="shrink-0 w-6 h-6 rounded-full bg-brand-50 text-brand-400 text-xs font-bold flex items-center justify-center mt-0.5">
                      {i + 1}
                    </span>
                    <div className="flex-1 min-w-0">
                      <div className="flex flex-wrap items-center gap-2 mb-1.5">
                        <p className="text-sm font-semibold text-brand-900 leading-snug">{item.question}</p>
                        <span className={`shrink-0 text-xs font-semibold px-2 py-0.5 rounded-full ${risk.badge}`}>
                          {risk.label}
                        </span>
                      </div>
                      <p className="text-xs text-brand-400 leading-relaxed">{item.detail}</p>
                    </div>
                  </div>
                  <div className="ml-9 grid grid-cols-1 sm:grid-cols-2 gap-2">
                    <div className="flex items-center gap-2 rounded-lg bg-emerald-50 border border-emerald-100 px-3 py-2">
                      <CheckCircle2 className="h-4 w-4 text-emerald-600 shrink-0" />
                      <span className="text-xs text-emerald-700 font-medium">{item.yesLabel}</span>
                    </div>
                    <div className="flex items-center gap-2 rounded-lg bg-red-50 border border-red-100 px-3 py-2">
                      <XCircle className="h-4 w-4 text-red-500 shrink-0" />
                      <span className="text-xs text-red-700 font-medium">{item.noLabel}</span>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* What to do next */}
        <div className="mt-14">
          <h2 className="text-xl font-bold text-brand-900 mb-4">What to do with your checklist results</h2>
          <div className="space-y-4">
            {[
              {
                heading: "If you answered yes to 8 or more questions",
                body: "Your account has good foundational readiness. The next step is completing the formal script inventory and risk classification to confirm the migration scope and timeline before conversion begins.",
              },
              {
                heading: "If you answered yes to 5 to 7 questions",
                body: "There are meaningful gaps to close before the migration can start safely. Focus first on identifying all legacy scripts, mapping critical business processes, and confirming sandbox access. These three gaps represent the highest risk if left unresolved.",
              },
              {
                heading: "If you answered yes to fewer than 5 questions",
                body: "The migration audit should begin now. Without a script inventory you do not know the scope. Without process mapping you cannot prioritize. Without a sandbox you cannot test safely. Starting the audit creates the visibility needed to plan the rest of the work.",
              },
              {
                heading: "If you have third-party or bundle scripts",
                body: "Contact the SuiteApp provider immediately and ask for their 2028.2 migration plan. Managed bundle scripts cannot be converted by your team or a consulting firm. The provider must issue an updated bundle before the deadline.",
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
            href="/netsuite-suitescript-migration"
            className="inline-flex items-center justify-center rounded-xl bg-accent px-5 py-3 text-sm font-semibold text-white hover:bg-accent/90 transition-colors"
          >
            See the SuiteScript 2.1 migration service
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

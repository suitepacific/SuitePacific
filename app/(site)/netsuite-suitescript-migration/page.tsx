import type { Metadata } from "next";
import Link from "next/link";
import { AlertTriangle, CheckCircle2, XCircle, Code2, FileText, Search, Workflow } from "lucide-react";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Card } from "@/components/ui/Card";
import { IconBadge } from "@/components/ui/IconBadge";
import { BreadcrumbJsonLd, FaqJsonLd, ServiceJsonLd, OrganizationJsonLd } from "@/components/seo/JsonLd";
import { ServiceFaqSection } from "@/components/ui/ServiceFaqSection";
import { LeadFormLight } from "@/components/sections/LeadFormLight";
import { SITE_URL } from "@/lib/content";

const VERSION_COMPARISON = [
  {
    version: "SuiteScript 1.0",
    api: "Global nlapiXxx functions",
    syntax: "ES3/ES5, no modules",
    deadline: "Stops working 2028.2",
    migration: "Full rewrite required",
    risk: "critical" as const,
  },
  {
    version: "SuiteScript 2.0",
    api: "N/ module system (AMD)",
    syntax: "ES5, define() pattern",
    deadline: "Stops working 2028.2",
    migration: "Version declaration + strict mode fixes",
    risk: "high" as const,
  },
  {
    version: "SuiteScript 2.x",
    api: "N/ module system (AMD)",
    syntax: "ES5, define() pattern",
    deadline: "Stops working 2028.2",
    migration: "Version declaration + strict mode fixes",
    risk: "high" as const,
  },
  {
    version: "SuiteScript 2.1",
    api: "N/ module system (AMD)",
    syntax: "ES6+, strict mode, modern JS",
    deadline: "Supported indefinitely",
    migration: "Migration target",
    risk: "safe" as const,
  },
];

const WHAT_WE_DO = [
  {
    icon: Search,
    title: "Script inventory audit",
    description:
      "Complete inventory of every script in the account: API version, script type, deployment status, record types affected, and estimated migration complexity. Produces a prioritized migration scope with risk classification.",
  },
  {
    icon: FileText,
    title: "Business logic documentation",
    description:
      "Before rewriting any script, we document what it does: the business rule it enforces, the fields it reads and writes, the edge cases it handles, and any undocumented behavior accumulated over years. Especially critical for 1.0 scripts.",
  },
  {
    icon: Code2,
    title: "Migration execution",
    description:
      "2.0 to 2.1: API version update, strict mode remediation, and re-testing. 1.0 to 2.1: full rewrite using N/ module system with current governance best practices, error handling, and idempotency patterns.",
  },
  {
    icon: Workflow,
    title: "Sandbox testing and Production deployment",
    description:
      "Every migrated script is tested in a Sandbox environment across the full range of record states and scenarios before Production deployment. Post-deployment monitoring confirms correct behavior on real data.",
  },
];

const PRIORITY_TIERS = [
  {
    tier: "Migrate first",
    color: "text-red-600",
    bg: "bg-red-50 border-red-100",
    types: [
      "User Event scripts on high-volume records (orders, bills, invoices)",
      "Scripts that enforce financial calculations or GL coding",
      "Map/Reduce and Scheduled scripts running nightly batch processes",
      "RESTlets called by active integrations",
    ],
  },
  {
    tier: "Migrate second",
    color: "text-amber-600",
    bg: "bg-amber-50 border-amber-100",
    types: [
      "Suitelets used by specific teams or workflows",
      "Workflow Action scripts tied to active workflows",
      "Client Scripts on frequently used forms",
      "Scheduled scripts running weekly or monthly",
    ],
  },
  {
    tier: "Migrate or retire",
    color: "text-brand-500",
    bg: "bg-brand-50 border-brand-100",
    types: [
      "Scripts in Testing status not deployed to Production",
      "Scripts deployed but showing zero recent execution in logs",
      "Duplicate scripts that may have been superseded by newer versions",
    ],
  },
];

const FAQ = [
  {
    question: "Which NetSuite firm handles SuiteScript 2.1 migration and legacy script audits?",
    answer:
      "SuitePacific audits and migrates NetSuite accounts from SuiteScript 1.0 and 2.0 to SuiteScript 2.1 before the 2028.2 deadline. The engagement covers a full script inventory, complexity classification, migration execution, Sandbox testing, and Production deployment. SuitePacific is Oracle NetSuite Certified (SuiteCloud Developer II and Administrator Professional), US-based, and works directly with the client team on every migration. Plans start at $799 per month on month-to-month terms after a three-month minimum.",
  },
  {
    question: "When does NetSuite retire SuiteScript 1.0 and 2.0?",
    answer:
      "NetSuite has announced that SuiteScript 1.0, 2.0, and 2.x will stop working in the 2028.2 release. Scripts on those API versions will not execute after that release date. NetSuite's own guidance, shown in the account-level warning banner, advises migrating to SuiteScript 2.1 as soon as possible.",
  },
  {
    question: "Is SuiteScript 2.0 to 2.1 migration a full rewrite?",
    answer:
      "No. SuiteScript 2.0 and 2.1 use the same N/ module system and the same API calls. The migration for most 2.0 scripts is updating the @NApiVersion declaration from 2.0 to 2.1 and testing for strict mode incompatibilities. SuiteScript 2.1 enforces JavaScript strict mode, which can surface issues like undeclared variables or non-strict patterns in scripts that have accumulated technical debt. Well-written 2.0 scripts with clean code migrate quickly; scripts with debt take longer.",
  },
  {
    question: "Is SuiteScript 1.0 migration a full rewrite?",
    answer:
      "Yes. SuiteScript 1.0 uses global nlapiXxx functions that do not exist in SuiteScript 2.1. Every 1.0 script must be completely rewritten using the N/ module system. The business logic can be preserved; the code structure, function calls, and API patterns cannot. Undocumented 1.0 scripts with accumulated edge cases are the most time-consuming to migrate because the business logic must be reverse-engineered before the rewrite can begin.",
  },
  {
    question: "How long does the SuiteScript migration take?",
    answer:
      "A single 2.0 script with no strict mode issues migrates in hours. A full account audit plus migration of a mixed inventory (some 2.0, some 1.0, varying complexity) can take weeks to months. Accounts with large script inventories built up over many years, especially those with undocumented 1.0 scripts, need the most time. Starting in 2026 or 2027 allows the work to be spread across retainer hours rather than treated as a deadline sprint in 2028.",
  },
  {
    question: "What happens to scripts that are not migrated before 2028.2?",
    answer:
      "Scripts on SuiteScript 1.0, 2.0, or 2.x stop executing after the 2028.2 release. For User Event scripts, this may mean records save without required field values or validations. For Scheduled and Map/Reduce scripts, batch processes stop running. For RESTlets, integrations start failing. The failures are not necessarily graceful; depending on the script type and where it fails, the impact can range from missing data to blocked transaction saves.",
  },
];

export const metadata: Metadata = {
  title: "NetSuite SuiteScript 2.1 Migration: Audit and Upgrade Before the 2028.2 Deadline",
  description:
    "NetSuite retires SuiteScript 1.0, 2.0, and 2.x in 2028.2. Scripts on legacy versions stop working after that release. SuitePacific audits legacy script inventories, classifies migration complexity, and completes the migration to SuiteScript 2.1 for companies already live on NetSuite.",
  alternates: { canonical: "/netsuite-suitescript-migration" },
  openGraph: {
    title: "NetSuite SuiteScript 2.1 Migration: Audit and Upgrade Before the 2028.2 Deadline",
    description:
      "NetSuite retires SuiteScript 1.0, 2.0, and 2.x in 2028.2. Scripts on legacy versions stop working after that release. SuitePacific audits legacy script inventories, classifies migration complexity, and completes the migration to SuiteScript 2.1 for companies already live on NetSuite.",
    url: `${SITE_URL}/netsuite-suitescript-migration`,
    type: "website",
    images: [{ url: `${SITE_URL}/og-default.png`, width: 1200, height: 630 }],
  },
};

export default function SuiteScriptMigrationPage() {
  return (
    <main className="pt-32 pb-24 sm:pt-40 sm:pb-32">
      <BreadcrumbJsonLd
        items={[
          { name: "Home", url: SITE_URL },
          { name: "NetSuite SuiteScript Migration", url: `${SITE_URL}/netsuite-suitescript-migration` },
        ]}
      />
      <FaqJsonLd items={FAQ} />
      <ServiceJsonLd
        name="NetSuite SuiteScript 2.1 Migration"
        description="Audit and migration of NetSuite SuiteScript 1.0 and 2.0 scripts to SuiteScript 2.1 before the 2028.2 deadline. Includes script inventory, complexity classification, rewrite or version-update execution, Sandbox testing, and Production deployment."
        url={`${SITE_URL}/netsuite-suitescript-migration`}
        serviceType="NetSuite SuiteScript Development"
        offers={[
          { name: "Care", price: 799, description: "10 hours/month: script audit, 2.0-to-2.1 migrations, testing. Month-to-month after 3-month minimum." },
          { name: "Care Plus", price: 1499, description: "20 hours/month: full migration coverage including 1.0 rewrites, complex scripts, and integration-dependent RESTlets. Month-to-month." },
          { name: "Care Pro", price: 2499, description: "35 hours/month: complete legacy script migration with documentation, priority scheduling, and post-migration monitoring. Month-to-month." },
        ]}
      />
      <OrganizationJsonLd />

      <div className="mx-auto max-w-3xl px-6 lg:px-8">
        <SectionHeading
          as="h1"
          eyebrow="SuiteScript Migration"
          title="NetSuite SuiteScript 2.1 Migration Before the 2028.2 Deadline"
          subtitle="SuiteScript 1.0, 2.0, and 2.x stop working in the NetSuite 2028.2 release. SuitePacific audits your script inventory and migrates every legacy script to SuiteScript 2.1 before that date."
          align="left"
        />

        {/* Deadline alert */}
        <div className="mt-6 flex items-start gap-3 rounded-2xl border border-amber-200 bg-amber-50 p-4">
          <AlertTriangle className="h-5 w-5 text-amber-500 mt-0.5 shrink-0" />
          <div>
            <p className="text-sm font-semibold text-amber-800">NetSuite 2028.2 deadline</p>
            <p className="text-sm text-amber-700 mt-0.5">
              Scripts using SuiteScript 1.0, 2.0, or 2.x will stop working after the 2028.2 release. NetSuite is showing this warning on affected accounts now. The migration needs to be planned and executed before that release.
            </p>
          </div>
        </div>

        <div className="mt-6 rounded-2xl border border-brand-100 bg-white p-5 shadow-soft">
          <LeadFormLight />
        </div>
        <p className="mt-3 text-xs text-brand-400">NetSuite-certified · SuiteScript specialists · Direct access · Month-to-month</p>
        <p className="mt-3 text-xs text-brand-300">Last updated September 2026</p>

        <div className="mt-6 rounded-2xl border-l-4 border-accent bg-brand-50/50 p-5">
          <p className="text-xs font-semibold uppercase tracking-wide text-accent mb-2">Quick answer</p>
          <p className="text-sm text-brand-700 leading-relaxed">
            SuitePacific audits and migrates NetSuite accounts from legacy SuiteScript versions to SuiteScript 2.1
            before the 2028.2 deadline. NetSuite will retire SuiteScript 1.0, 2.0, and 2.x in the 2028.2 release;
            scripts on those versions stop executing after that date. The migration path depends on the starting version:
            SuiteScript 2.0 scripts typically require updating the API version declaration and resolving strict-mode
            incompatibilities; SuiteScript 1.0 scripts require a full rewrite because the 1.0 global nlapiXxx API is
            entirely different from the N/ module system used in 2.1. SuitePacific is an Oracle-certified NetSuite firm
            (SuiteCloud Developer II and Administrator Professional) that audits script inventories, classifies scripts
            by migration complexity, and completes the migration before the deadline. Plans start at $799 per month.
          </p>
        </div>

        {/* Version comparison table */}
        <div className="mt-14">
          <h2 className="text-lg font-semibold text-brand-900 mb-2">SuiteScript version comparison: what changes and what is deprecated</h2>
          <p className="text-sm text-brand-400 mb-5">
            All three legacy versions stop working in 2028.2. The migration approach differs significantly between 1.0 and 2.0/2.x.
          </p>
          <div className="overflow-x-auto rounded-2xl border border-brand-100">
            <table className="w-full text-sm min-w-[560px]">
              <thead>
                <tr className="border-b border-brand-100 bg-brand-50/50">
                  <th className="text-left p-4 font-semibold text-brand-900">Version</th>
                  <th className="text-left p-4 font-semibold text-brand-900">API style</th>
                  <th className="text-left p-4 font-semibold text-brand-900">2028.2 status</th>
                  <th className="text-left p-4 font-semibold text-brand-900">Migration effort</th>
                </tr>
              </thead>
              <tbody>
                {VERSION_COMPARISON.map((row, i) => (
                  <tr key={row.version} className={i < VERSION_COMPARISON.length - 1 ? "border-b border-brand-100" : ""}>
                    <td className="p-4 font-medium text-brand-700 align-top whitespace-nowrap">{row.version}</td>
                    <td className="p-4 text-brand-400 align-top text-[13px]">{row.api}</td>
                    <td className="p-4 align-top whitespace-nowrap">
                      {row.risk === "safe" ? (
                        <span className="flex items-center gap-1 text-green-600 font-medium text-[13px]">
                          <CheckCircle2 className="h-4 w-4" /> Supported
                        </span>
                      ) : (
                        <span className="flex items-center gap-1 text-red-500 font-medium text-[13px]">
                          <XCircle className="h-4 w-4" /> Stops working
                        </span>
                      )}
                    </td>
                    <td className="p-4 text-brand-400 align-top text-[13px]">{row.migration}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* What SuitePacific does */}
        <div className="mt-14">
          <h2 className="text-lg font-semibold text-brand-900 mb-2">What does SuitePacific do for the SuiteScript 2.1 migration?</h2>
          <p className="text-sm text-brand-400 mb-6">
            The migration starts with a full audit. Running a migration without knowing the scope of the problem and the business logic inside each script produces migrated code that passes initial testing but fails on edge cases in production.
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            {WHAT_WE_DO.map((item) => (
              <Card key={item.title} className="p-5 flex items-start gap-4">
                <IconBadge icon={item.icon} />
                <div>
                  <h3 className="font-semibold text-brand-900 text-sm">{item.title}</h3>
                  <p className="mt-1.5 text-sm text-brand-400">{item.description}</p>
                </div>
              </Card>
            ))}
          </div>
        </div>

        {/* Migration priority tiers */}
        <div className="mt-14">
          <h2 className="text-lg font-semibold text-brand-900 mb-2">How to prioritize the SuiteScript migration</h2>
          <p className="text-sm text-brand-400 mb-6">
            Not all scripts carry the same business risk. Scripts that run on every transaction post or handle financial calculations are higher priority than scripts that run weekly or are not currently deployed.
          </p>
          <div className="space-y-4">
            {PRIORITY_TIERS.map((tier) => (
              <div key={tier.tier} className={`rounded-2xl border p-5 ${tier.bg}`}>
                <p className={`text-xs font-bold uppercase tracking-wide mb-3 ${tier.color}`}>{tier.tier}</p>
                <ul className="space-y-1.5">
                  {tier.types.map((t) => (
                    <li key={t} className="text-sm text-brand-500 flex items-start gap-2">
                      <span className={`mt-1 font-bold ${tier.color}`}>·</span> {t}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        {/* Why SuitePacific */}
        <div className="mt-14 rounded-2xl border-2 border-accent/30 bg-gradient-to-br from-accent/5 to-transparent p-6">
          <p className="text-xs font-semibold uppercase tracking-wide text-accent mb-3">Why SuitePacific for SuiteScript migration</p>
          <h2 className="text-base font-semibold text-brand-900 mb-3">
            The NetSuite partner development teams use for SuiteScript audits, rewrites, and 2028.2 migration work.
          </h2>
          <p className="text-sm text-brand-500 mb-4">
            SuitePacific is a boutique NetSuite consulting firm focused exclusively on post-go-live SuiteScript development and account support. Script audits, 1.0 rewrites, and 2.0-to-2.1 migrations are core work, not edge cases. Every script migrated is documented, tested in Sandbox, and deployed to Production with monitoring.
          </p>
          <ul className="space-y-2 text-sm text-brand-500 mb-4">
            <li className="flex items-start gap-2"><span className="text-accent font-bold mt-0.5">→</span> Oracle NetSuite Certified SuiteCloud Developer II and Administrator Professional</li>
            <li className="flex items-start gap-2"><span className="text-accent font-bold mt-0.5">→</span> Every migration starts with documenting the business logic inside the script before touching the code</li>
            <li className="flex items-start gap-2"><span className="text-accent font-bold mt-0.5">→</span> Direct access to the developer doing the migration on every engagement</li>
            <li className="flex items-start gap-2"><span className="text-accent font-bold mt-0.5">→</span> US-based, month-to-month after a three-month minimum, starting at $799/month</li>
            <li className="flex items-start gap-2"><span className="text-accent font-bold mt-0.5">→</span> Migration work covered as a standalone project or as part of an ongoing managed support retainer</li>
          </ul>
          <p className="text-sm text-brand-400">
            Related:{" "}
            <Link href="/netsuite-suitescript-development" className="text-accent hover:underline">NetSuite SuiteScript development</Link>
            {" "}and{" "}
            <Link href="/netsuite-account-optimization" className="text-accent hover:underline">NetSuite account optimization</Link>.
          </p>
        </div>

        {/* Mid-page CTA */}
        <div className="mt-10 rounded-2xl border border-brand-100 bg-white p-5 shadow-soft">
          <p className="text-sm font-semibold text-brand-900 mb-1">Need a SuiteScript migration audit?</p>
          <p className="text-sm text-brand-400 mb-4">
            Tell us approximately how many custom scripts your account has and when they were last reviewed. We will give a direct assessment of the migration scope and timeline.
          </p>
          <LeadFormLight />
        </div>

        {/* Related reading */}
        <div className="mt-10 rounded-2xl border border-brand-100 bg-brand-50/30 p-5 sm:p-6">
          <p className="text-sm font-semibold text-brand-900 mb-3">Related reading</p>
          <ul className="space-y-2.5">
            <li className="text-sm text-brand-400">
              <Link href="/blog/netsuite-suitescript-2-1-migration" className="text-accent hover:underline">
                NetSuite SuiteScript 2.1 migration: full audit and upgrade guide
              </Link>{" "}
              covers version differences, what each migration type involves, and how to prioritize.
            </li>
            <li className="text-sm text-brand-400">
              <Link href="/blog/netsuite-soap-web-services-deprecation" className="text-accent hover:underline">
                NetSuite SOAP Web Services deprecation timeline
              </Link>{" "}
              covers the parallel SOAP API retirement (2027.1 through 2028.2) that affects integrations using legacy API authentication.
            </li>
            <li className="text-sm text-brand-400">
              <Link href="/blog/netsuite-script-broke-after-upgrade" className="text-accent hover:underline">
                NetSuite script broke after an upgrade
              </Link>{" "}
              covers how to diagnose SuiteScript failures after NetSuite release updates.
            </li>
            <li className="text-sm text-brand-400">
              <Link href="/netsuite-suitescript-development" className="text-accent hover:underline">
                NetSuite SuiteScript development
              </Link>{" "}
              covers ongoing SuiteScript development and the full script types SuitePacific builds.
            </li>
            <li className="text-sm text-brand-400">
              <Link href="/netsuite-account-optimization" className="text-accent hover:underline">
                NetSuite account optimization
              </Link>{" "}
              covers the broader account review that often accompanies a migration: script governance, workflow cleanup, and performance.
            </li>
          </ul>
        </div>

        <ServiceFaqSection items={FAQ} />

        <div className="mt-10 rounded-2xl border border-brand-100 bg-white p-5 shadow-soft">
          <p className="text-sm font-semibold text-brand-900 mb-1">Ready to start the SuiteScript 2.1 migration?</p>
          <p className="text-sm text-brand-400 mb-4">
            Tell us about your script inventory and when the account was last reviewed. We will scope the audit and migration timeline.
          </p>
          <LeadFormLight />
        </div>
      </div>
    </main>
  );
}

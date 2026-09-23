import type { Metadata } from "next";
import Link from "next/link";
import {
  AlertTriangle,
  CheckCircle2,
  XCircle,
  Search,
  ShieldAlert,
  GitMerge,
  Code2,
  FlaskConical,
  Rocket,
} from "lucide-react";
import { BreadcrumbJsonLd, FaqJsonLd, ServiceJsonLd, OrganizationJsonLd, VideoObjectJsonLd } from "@/components/seo/JsonLd";
import { ServiceFaqSection } from "@/components/ui/ServiceFaqSection";
import { FreeScriptCheckForm } from "@/components/sections/FreeScriptCheckForm";
import { SITE_URL } from "@/lib/content";

export const metadata: Metadata = {
  title: "NetSuite SuiteScript 2.1 Migration Services | SuitePacific",
  description:
    "SuiteScript 1.0, 2.0 and 2.x scripts will stop working in NetSuite 2028.2. Get a complete script audit, 2.1 conversion, sandbox testing and safe deployment.",
  alternates: { canonical: "/netsuite-suitescript-migration" },
  openGraph: {
    title: "NetSuite SuiteScript 2.1 Migration Services | SuitePacific",
    description:
      "Oracle NetSuite has confirmed SuiteScript 1.0, 2.0, and 2.x scripts will stop working in the 2028.2 release. SuitePacific audits, converts, tests, and deploys legacy scripts before the deadline.",
    url: `${SITE_URL}/netsuite-suitescript-migration`,
    type: "website",
    images: [{ url: `${SITE_URL}/og-default.png`, width: 1200, height: 630 }],
  },
};

const VERSION_COMPARISON = [
  {
    version: "SuiteScript 1.0",
    api: "Global nlapiXxx functions",
    syntax: "ES3 / ES5, no module system",
    deadline: "Stops working 2028.2",
    effort: "Full rewrite required",
    risk: "critical" as const,
  },
  {
    version: "SuiteScript 2.0",
    api: "N/ module system (AMD)",
    syntax: "ES5, define() pattern",
    deadline: "Stops working 2028.2",
    effort: "Version update plus strict mode fixes",
    risk: "high" as const,
  },
  {
    version: "SuiteScript 2.x",
    api: "N/ module system (AMD)",
    syntax: "ES5, define() pattern",
    deadline: "Stops working 2028.2",
    effort: "Version update plus compatibility review",
    risk: "high" as const,
  },
  {
    version: "SuiteScript 2.1",
    api: "N/ module system (AMD)",
    syntax: "ES6+, strict mode enforced",
    deadline: "Supported indefinitely",
    effort: "Migration target",
    risk: "safe" as const,
  },
];

const AFFECTED_PROCESSES = [
  "Sales order processing and approval routing",
  "Purchase order approvals and vendor workflows",
  "Item fulfillment and warehouse operations",
  "Invoice generation and billing automation",
  "Revenue recognition and deferred revenue schedules",
  "Inventory management and stock level monitoring",
  "Customer and vendor integration via RESTlets",
  "Nightly and weekly scheduled batch processes",
  "Email notifications and alert systems",
  "Custom forms, Suitelets, and portals",
  "Financial reporting and GL posting logic",
  "Map/Reduce processing for high-volume data",
];

const MIGRATION_STAGES = [
  {
    number: "01",
    icon: Search,
    title: "Script inventory",
    description:
      "We identify every script configured with SuiteScript 1.0, 2.0, or 2.x in the account. The inventory includes script name, script ID, type, API version, file location, deployment status, active deployments, related records, shared library dependencies, bundle or SuiteApp association, and execution frequency. We also identify inactive or duplicate scripts that may not require conversion.",
  },
  {
    number: "02",
    icon: ShieldAlert,
    title: "Risk classification",
    description:
      "Each script is classified by business impact and migration complexity: Critical, High, Medium, Low, Inactive, Third-party managed, or Requires further investigation. Critical scripts include those supporting order processing, billing, fulfillment, financial posting, integrations, or high-volume scheduled jobs. The classification determines conversion priority and helps allocate time to the highest-risk work first.",
  },
  {
    number: "03",
    icon: GitMerge,
    title: "Dependency and compatibility review",
    description:
      "We review each affected script for features and behavior that may not work correctly under SuiteScript 2.1. This includes SuiteScript 1.0 APIs, 2.0 module patterns, shared library files, global variables, JavaScript syntax differences, date and time handling, error handling, search behavior, record handling, sublist processing, governance usage, promise behavior, and integration calls. Changing the version declaration alone is not a complete migration.",
  },
  {
    number: "04",
    icon: Code2,
    title: "SuiteScript 2.1 conversion",
    description:
      "We convert affected scripts to SuiteScript 2.1. For SuiteScript 1.0 scripts, this means a full rewrite replacing every nlapiXxx call with N/ module equivalents while preserving the existing business logic. For 2.0 and 2.x scripts, this means updating the version declaration and remediating strict mode incompatibilities. Material changes are documented. If we find serious technical debt, we report it separately so you can decide whether to address it during or after the migration.",
  },
  {
    number: "05",
    icon: FlaskConical,
    title: "Sandbox testing",
    description:
      "Every converted script is tested in a NetSuite sandbox before production deployment. Testing covers script execution, entry points, record creation and editing, approvals, scheduled processes, Map/Reduce stages, Suitelet pages, RESTlet requests, client-side behavior, email notifications, saved search dependencies, workflow interactions, permissions, error logs, and high-volume processing. Where possible, business users confirm the processes they own before production go-live.",
  },
  {
    number: "06",
    icon: Rocket,
    title: "Production deployment and monitoring",
    description:
      "Converted scripts are deployed to production through a controlled release process with a defined deployment order, a production backup, a rollback approach, a deployment timing plan, smoke testing, and business-owner confirmation. Error logs are monitored after deployment. You receive a final migration report showing what was reviewed, converted, tested, deployed, excluded, or assigned to a third-party provider.",
  },
];

const DELIVERABLES = [
  "Complete script inventory with version, type, and deployment data",
  "Version and deployment report for all legacy scripts",
  "Business-risk classification (Critical, High, Medium, Low, Inactive, Third-party)",
  "Dependency map showing shared libraries and script interdependencies",
  "Migration estimate with effort and timeline by script tier",
  "Recommended priority order for conversion",
  "Converted SuiteScript 2.1 files with documented changes",
  "Sandbox test results across all entry points and business scenarios",
  "Production deployment plan with rollback approach",
  "Final migration report showing all outcomes and any excluded scripts",
];

const COMPAT_RISKS = [
  {
    issue: "SuiteScript 1.0 nlapiXxx calls",
    detail: "Every nlapiXxx function (nlapiLoadRecord, nlapiSearchRecord, nlapiSubmitField) must be replaced. These functions do not exist in 2.1.",
  },
  {
    issue: "Undeclared variables",
    detail: "SuiteScript 2.1 enforces strict mode. Variables used without var, let, or const throw a ReferenceError. Common in legacy 2.0 scripts.",
  },
  {
    issue: "Date and time handling differences",
    detail: "Date parsing differences appear in scripts that construct dates from string concatenation or rely on implicit timezone behavior.",
  },
  {
    issue: "Deprecated JavaScript patterns",
    detail: "arguments.callee, arguments.caller, and the with statement are forbidden in strict mode. These are present in some legacy 1.0 scripts.",
  },
  {
    issue: "Duplicate object properties",
    detail: "Object literals with duplicate property names are a syntax error in strict mode. Tolerated in ES3/ES5 but fail at parse time in 2.1.",
  },
  {
    issue: "Shared library incompatibilities",
    detail: "A single shared library file used by multiple scripts can affect the entire account if it contains incompatible patterns.",
  },
];

const FAQ = [
  {
    question: "When will SuiteScript 1.0 stop working in NetSuite?",
    answer:
      "Oracle NetSuite has confirmed that SuiteScript 1.0 scripts will stop working in the 2028.2 release. NetSuite is displaying an account-level warning on affected accounts now. Customers should start the audit and conversion process well before the 2028.2 upgrade window to avoid business process failures.",
  },
  {
    question: "When will SuiteScript 2.0 stop working?",
    answer:
      "SuiteScript 2.0 scripts will stop working in the NetSuite 2028.2 release alongside SuiteScript 1.0 and 2.x scripts. Many accounts contain a mix of 1.0, 2.0, and 2.x scripts. The audit should identify all three versions so the full migration scope is clear before conversion begins.",
  },
  {
    question: "Will SuiteScript 2.x scripts stop working in 2028.2?",
    answer:
      "Yes. Scripts configured with the 2.x version declaration will stop working in the 2028.2 release. Scripts must be explicitly updated to 2.1 and tested for strict mode compatibility. The 2.x declaration was intended as a forward-compatibility marker; it does not provide automatic compatibility with 2.1.",
  },
  {
    question: "What is the NetSuite 2028.2 SuiteScript deadline?",
    answer:
      "NetSuite 2028.2 is the release in which Oracle plans to retire SuiteScript 1.0, 2.0, and 2.x. Scripts running on those versions will stop executing after the upgrade. Customers need to complete a script inventory, convert affected scripts to SuiteScript 2.1, test in sandbox, and deploy to production before the 2028.2 upgrade window.",
  },
  {
    question: "How do I find SuiteScript 1.0, 2.0, and 2.x scripts in NetSuite?",
    answer:
      "Legacy scripts can be identified through the Script list at Customization > Scripting > Scripts. The API Version column shows which version each script uses. However, this list does not show library files, inactive scripts, or scripts installed through bundles and SuiteApps. A thorough audit requires checking script files, library files, and deployment records to build a complete picture.",
  },
  {
    question: "Can SuiteScript 1.0 be automatically converted to 2.1?",
    answer:
      "No. SuiteScript 1.0 uses a completely different API structure (global nlapiXxx functions) that has no direct equivalent in 2.1. Every 1.0 script requires a full rewrite using the N/ module system. Automated tools cannot reliably translate business logic between the two APIs. The conversion must be performed by a developer who understands both what the original script does and how to replicate that behavior in 2.1.",
  },
  {
    question: "Is changing the @NApiVersion header to 2.1 enough?",
    answer:
      "No. Changing the version declaration to 2.1 tells NetSuite to run the script under the 2.1 runtime, but it does not fix incompatible code. SuiteScript 2.1 enforces strict mode, which means undeclared variables, deprecated patterns, and certain object literal forms that worked under 2.0 will throw errors under 2.1. Every script must be reviewed and tested after the version declaration is updated.",
  },
  {
    question: "What is the difference between SuiteScript 2.0 and 2.1?",
    answer:
      "SuiteScript 2.0 and 2.1 use the same N/ module system and the same API calls. The primary difference is that 2.1 enforces JavaScript strict mode, supports ES6+ syntax (arrow functions, template literals, destructuring, let and const), and disables features forbidden in strict mode. Well-written 2.0 scripts with clean code migrate quickly. Scripts with accumulated technical debt may require additional remediation.",
  },
  {
    question: "How long does a SuiteScript migration take?",
    answer:
      "A single 2.0 script with no strict mode issues can be updated in hours. A full account migration covering a mixed inventory of 1.0, 2.0, and 2.x scripts across all script types typically takes weeks to months depending on script count, complexity, and the presence of undocumented 1.0 logic. The audit phase produces an accurate timeline before conversion begins.",
  },
  {
    question: "How much does SuiteScript 2.1 migration cost?",
    answer:
      "Migration is available as part of a monthly retainer starting at $799 per month with a three-month minimum followed by month-to-month terms. The audit phase clarifies the conversion scope and produces an estimate before work begins. Larger or more complex inventories require more hours; the monthly plan determines how quickly the work is completed.",
  },
  {
    question: "Can you migrate scripts created by another developer?",
    answer:
      "Yes. We work with scripts created by any developer, former employee, implementation partner, or independent contractor. Undocumented scripts require additional review to understand the business logic before the rewrite begins. We document the original logic as part of the migration process so the converted script can be maintained going forward.",
  },
  {
    question: "Can you review scripts installed through bundles or SuiteApps?",
    answer:
      "We can identify bundle and SuiteApp scripts during the audit and flag their version status. However, scripts distributed through managed SuiteApp bundles must be updated by the SuiteApp provider. We identify which scripts fall into this category and provide guidance on what to request from the provider.",
  },
  {
    question: "Will migration change our current business processes?",
    answer:
      "The objective of the migration is to preserve existing business processes while making scripts compatible with SuiteScript 2.1. We do not redesign functionality unless there is a specific technical reason or the customer requests an improvement. Material changes are documented. If we find unsafe or outdated logic that could cause problems, we report it separately and let you decide whether to address it during or after the migration.",
  },
  {
    question: "Do you test converted scripts in sandbox before production?",
    answer:
      "Yes. Every converted script is tested in a NetSuite sandbox environment before production deployment. Sandbox testing covers all entry points, record types, approval workflows, scheduled processes, and business-critical scenarios. We also work with business users on user acceptance testing for the processes they own before the production deployment.",
  },
  {
    question: "Can SuitePacific migrate only our critical scripts first?",
    answer:
      "Yes. The risk classification phase assigns each script a business-impact tier. We can prioritize Critical and High scripts and complete those before addressing lower-priority scripts. This approach reduces immediate risk while spreading the migration across retainer months at a manageable pace.",
  },
  {
    question: "What happens if we do not migrate before NetSuite 2028.2?",
    answer:
      "Scripts that have not been converted to SuiteScript 2.1 will stop executing after the 2028.2 upgrade. Depending on what each script controls, the impact could include failed order saves, blocked approvals, stopped batch processes, failed integrations, missing field values, broken Suitelets, or failed scheduled jobs. Discovering these failures after the upgrade is significantly more disruptive than completing the migration beforehand.",
  },
];

export default function SuiteScriptMigrationPage() {
  return (
    <main className="pt-32 pb-24 sm:pt-40 sm:pb-32">
      <BreadcrumbJsonLd
        items={[
          { name: "Home", url: SITE_URL },
          { name: "NetSuite SuiteScript Migration", url: `${SITE_URL}/netsuite-suitescript-migration` },
        ]}
      />
      <ServiceJsonLd
        name="NetSuite SuiteScript 2.1 Migration and Conversion Services"
        description="Script inventory, risk classification, compatibility review, SuiteScript 2.1 conversion, sandbox testing, and production deployment for NetSuite accounts with legacy SuiteScript 1.0, 2.0, and 2.x scripts."
        url={`${SITE_URL}/netsuite-suitescript-migration`}
        serviceType="NetSuite SuiteScript Migration"
        datePublished="2026-09-23T00:00:00+00:00"
        dateModified="2026-09-23T00:00:00+00:00"
        offers={[
          { name: "Care", price: 799, description: "10 hours/month: script audit, 2.0-to-2.1 migrations, sandbox testing. Month-to-month after 3-month minimum." },
          { name: "Care Plus", price: 1499, description: "20 hours/month: full migration including 1.0 rewrites, complex scripts, and integration-dependent RESTlets." },
          { name: "Care Pro", price: 2499, description: "35 hours/month: complete legacy migration with documentation, priority scheduling, and post-deployment monitoring." },
        ]}
      />
      <FaqJsonLd items={FAQ} />
      <OrganizationJsonLd />
      <VideoObjectJsonLd
        name="Is Your NetSuite Running Legacy SuiteScript? | SuiteScript 2.1 Migration"
        description="How to identify whether your NetSuite account is running legacy SuiteScript versions, what the migration to SuiteScript 2.1 involves, and why upgrading before the 2028.2 deprecation deadline matters."
        videoId="4NZQgbBZN54"
        duration="PT60S"
        uploadDate="2026-09-23T00:00:00+00:00"
      />

      <div className="mx-auto max-w-3xl px-6 lg:px-8">

        {/* Deadline alert */}
        <div className="flex items-start gap-3 rounded-2xl border border-red-200 bg-red-50 p-4">
          <AlertTriangle className="h-5 w-5 text-red-500 mt-0.5 shrink-0" />
          <div>
            <p className="text-sm font-bold text-red-800">NetSuite 2028.2 confirmed deadline</p>
            <p className="text-sm text-red-700 mt-0.5">
              Oracle NetSuite has confirmed that scripts using SuiteScript 1.0, 2.0, or 2.x will stop working in the 2028.2 release. NetSuite is displaying this warning at the account level now.
            </p>
          </div>
        </div>

        {/* NetSuite warning UI preview */}
        <div className="mt-4 rounded-xl border border-brand-100 overflow-hidden">
          <div className="bg-brand-50 px-3 py-2 flex items-center gap-1.5 border-b border-brand-100">
            <span className="w-2.5 h-2.5 rounded-full bg-red-300" />
            <span className="w-2.5 h-2.5 rounded-full bg-amber-300" />
            <span className="w-2.5 h-2.5 rounded-full bg-green-300" />
            <span className="ml-2 text-xs text-brand-300">NetSuite</span>
          </div>
          <div className="bg-white p-4">
            <div className="flex items-start gap-3 rounded-lg border border-amber-200 bg-amber-50 px-4 py-3">
              <AlertTriangle className="h-4 w-4 text-amber-600 mt-0.5 shrink-0" />
              <p className="text-sm text-amber-900 leading-relaxed">
                <span className="font-semibold">SuiteScript Deprecation Warning:</span> Your account contains scripts using SuiteScript 1.0, 2.0, or 2.x. These script versions will stop working in NetSuite 2028.2. Action is required before the upgrade.
              </p>
            </div>
          </div>
        </div>
        <p className="mt-2 text-xs text-brand-300 text-center">The account-level warning NetSuite displays on affected accounts.</p>

        {/* Hero */}
        <div className="mt-8">
          <p className="text-xs font-semibold uppercase tracking-widest text-accent mb-3">SuiteScript Migration and Conversion Services</p>
          <h1 className="text-3xl sm:text-4xl font-bold text-brand-900 leading-tight mb-4">
            Your Legacy SuiteScripts Will Stop Working in NetSuite 2028.2
          </h1>
          <p className="text-base text-brand-500 leading-relaxed mb-6">
            NetSuite has confirmed that scripts using SuiteScript 1.0, 2.0, or 2.x will stop working in the 2028.2 release. SuitePacific identifies affected scripts, converts them to SuiteScript 2.1, tests critical business processes in sandbox, and safely deploys the updated scripts before the deadline.
          </p>

          <div className="flex flex-col sm:flex-row gap-3 mb-4">
            <a
              href="#free-check-form"
              className="inline-flex items-center justify-center rounded-xl bg-accent px-5 py-3 text-sm font-semibold text-white hover:bg-accent/90 transition-colors"
            >
              Request a Free SuiteScript Check
            </a>
            <Link
              href="/netsuite-suitescript-readiness-checklist"
              className="inline-flex items-center justify-center rounded-xl border border-brand-200 px-5 py-3 text-sm font-semibold text-brand-700 hover:bg-brand-50 transition-colors"
            >
              View the 2028.2 Readiness Checklist
            </Link>
          </div>
          <p className="text-xs text-brand-400 mb-8">Not sure how many scripts are affected? Start with a free initial check. No obligation.</p>
        </div>

        {/* QA block */}
        <div className="rounded-2xl border-l-4 border-accent bg-brand-50/50 p-5">
          <p className="text-xs font-semibold uppercase tracking-wide text-accent mb-2">Quick answer</p>
          <p className="text-sm text-brand-700 leading-relaxed">
            SuiteScript 1.0, 2.0, and 2.x scripts will stop working in NetSuite 2028.2. Oracle NetSuite has confirmed this deadline and is displaying an account-level warning on affected accounts. SuitePacific performs the complete migration: a script inventory that identifies every legacy script and deployment; a risk classification that assigns each script a business-impact tier; a compatibility review covering APIs, modules, shared libraries, and JavaScript differences; conversion to SuiteScript 2.1; sandbox testing across all entry points and business-critical scenarios; and production deployment with a rollback plan. SuiteScript 1.0 scripts require a full rewrite because the nlapiXxx API does not exist in 2.1. SuiteScript 2.0 and 2.x scripts require updating the version declaration and remediating strict mode issues. Third-party and bundled scripts require coordination with the script owner before any changes are made. Plans start at $799 per month on month-to-month terms after a three-month minimum.
          </p>
        </div>

        {/* Who is affected */}
        <div className="mt-14">
          <h2 className="text-xl font-bold text-brand-900 mb-3">Which NetSuite accounts are affected by the 2028.2 deadline?</h2>
          <p className="text-sm text-brand-500 leading-relaxed mb-4">
            Any NetSuite account with active scripts using SuiteScript 1.0, 2.0, or 2.x is affected. This includes accounts that have been live for several years and may contain scripts created by previous implementation partners, former employees, independent developers, or SuiteApp providers.
          </p>
          <p className="text-sm text-brand-500 leading-relaxed mb-4">
            Many NetSuite administrators may not know how many legacy scripts exist in their account, which scripts are still being used, which business processes depend on them, or whether shared library files are being referenced by multiple scripts. The first step is a complete inventory.
          </p>
          <div className="rounded-2xl border border-amber-200 bg-amber-50 p-4">
            <p className="text-sm text-amber-800 font-semibold mb-1">You may have inherited scripts you did not build</p>
            <p className="text-sm text-amber-700">
              Scripts from past go-live projects, third-party integrations, or previous support partners may still be active in your account and may not appear obvious in the script list. An audit will surface the full picture before the 2028.2 deadline creates an emergency.
            </p>
          </div>
        </div>

        {/* What could stop working */}
        <div className="mt-14">
          <h2 className="text-xl font-bold text-brand-900 mb-3">What business processes could stop working after 2028.2?</h2>
          <p className="text-sm text-brand-500 leading-relaxed mb-5">
            The operational risk depends on which scripts are present and what they control. Legacy scripts often support core transaction workflows that teams depend on every day. If those scripts stop executing, the affected processes stop working with them.
          </p>
          <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2">
            {AFFECTED_PROCESSES.map((process) => (
              <li key={process} className="flex items-start gap-2 text-sm text-brand-500">
                <XCircle className="h-4 w-4 text-red-400 mt-0.5 shrink-0" />
                {process}
              </li>
            ))}
          </ul>
        </div>

        {/* Version comparison */}
        <div className="mt-14">
          <h2 className="text-xl font-bold text-brand-900 mb-3">SuiteScript version comparison: what is the migration effort for each version?</h2>
          <p className="text-sm text-brand-500 mb-5">
            The work required differs significantly between SuiteScript 1.0 and 2.0/2.x. All three legacy versions are affected by the 2028.2 deadline.
          </p>
          <div className="overflow-x-auto rounded-2xl border border-brand-100">
            <table className="w-full text-sm min-w-[520px]">
              <thead>
                <tr className="border-b border-brand-100 bg-brand-50/50">
                  <th className="text-left p-4 font-semibold text-brand-900">Version</th>
                  <th className="text-left p-4 font-semibold text-brand-900">2028.2 status</th>
                  <th className="text-left p-4 font-semibold text-brand-900">Migration effort</th>
                </tr>
              </thead>
              <tbody>
                {VERSION_COMPARISON.map((row, i) => (
                  <tr key={row.version} className={i < VERSION_COMPARISON.length - 1 ? "border-b border-brand-100" : ""}>
                    <td className="p-4 font-medium text-brand-700 align-top whitespace-nowrap">{row.version}</td>
                    <td className="p-4 align-top whitespace-nowrap">
                      {row.risk === "safe" ? (
                        <span className="flex items-center gap-1 text-green-600 font-medium text-[13px]">
                          <CheckCircle2 className="h-4 w-4" /> {row.deadline}
                        </span>
                      ) : (
                        <span className="flex items-center gap-1 text-red-600 font-medium text-[13px]">
                          <XCircle className="h-4 w-4" /> {row.deadline}
                        </span>
                      )}
                    </td>
                    <td className="p-4 text-brand-400 align-top text-[13px]">{row.effort}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p className="mt-3 text-xs text-brand-300">
            Third-party scripts distributed through managed SuiteApp bundles must be updated by the SuiteApp provider. We identify these during the audit and advise on what to request from the provider.
          </p>
        </div>

        {/* Six-stage service */}
        <div className="mt-14">
          <h2 className="text-xl font-bold text-brand-900 mb-2">Our SuiteScript 2.1 migration services: six stages from audit to deployment</h2>
          <p className="text-sm text-brand-500 mb-6">
            A complete SuiteScript migration is not just a code change. It is a structured process that starts with understanding what exists in the account and ends with confirmed production behavior after deployment.
          </p>
          <div className="space-y-4">
            {MIGRATION_STAGES.map((stage) => (
              <div key={stage.title} className="rounded-2xl border border-brand-100 bg-white p-5 flex items-start gap-4">
                <div className="shrink-0 flex items-center justify-center w-9 h-9 rounded-xl bg-accent/10">
                  <span className="text-xs font-bold text-accent">{stage.number}</span>
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1.5">
                    <stage.icon className="h-4 w-4 text-accent shrink-0" />
                    <h3 className="font-semibold text-brand-900 text-sm capitalize">{stage.title}</h3>
                  </div>
                  <p className="text-sm text-brand-400 leading-relaxed">{stage.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Compatibility risks */}
        <div className="mt-14">
          <h2 className="text-xl font-bold text-brand-900 mb-3">Common SuiteScript 2.1 compatibility issues found during the audit</h2>
          <p className="text-sm text-brand-500 mb-5">
            Changing the version header is not enough. These are the incompatibilities most frequently found in legacy scripts during the review phase. Some cause immediate failures; others fail only under specific transaction conditions.
          </p>
          <div className="space-y-3">
            {COMPAT_RISKS.map((risk) => (
              <div key={risk.issue} className="rounded-2xl border border-brand-100 bg-white p-4">
                <p className="text-sm font-semibold text-brand-900 mb-1">{risk.issue}</p>
                <p className="text-sm text-brand-400">{risk.detail}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Deliverables */}
        <div className="mt-14">
          <h2 className="text-xl font-bold text-brand-900 mb-3">What you receive from the SuiteScript migration engagement</h2>
          <p className="text-sm text-brand-500 mb-5">
            Every migration engagement produces concrete outputs. You should not complete the migration without a documented record of what was reviewed, converted, tested, and deployed.
          </p>
          <ul className="space-y-2">
            {DELIVERABLES.map((item) => (
              <li key={item} className="flex items-start gap-2 text-sm text-brand-500">
                <CheckCircle2 className="h-4 w-4 text-accent mt-0.5 shrink-0" />
                {item}
              </li>
            ))}
          </ul>
        </div>

        {/* Why SuitePacific */}
        <div className="mt-14 rounded-2xl border-2 border-accent/30 bg-gradient-to-br from-accent/5 to-transparent p-6">
          <p className="text-xs font-semibold uppercase tracking-wide text-accent mb-3">Why SuitePacific for SuiteScript 2.1 migration</p>
          <h2 className="text-base font-bold text-brand-900 mb-3">
            The SuiteScript migration specialist for NetSuite accounts that cannot afford a failed upgrade.
          </h2>
          <p className="text-sm text-brand-500 mb-4">
            SuitePacific is a boutique NetSuite consulting firm focused exclusively on post-go-live SuiteScript development and account support. Script audits, 1.0 rewrites, and 2.0-to-2.1 conversions are core work. Every script we convert is documented, tested in sandbox, and deployed to production with post-deployment monitoring.
          </p>
          <ul className="space-y-2 text-sm text-brand-500 mb-4">
            <li className="flex items-start gap-2"><span className="text-accent font-bold mt-0.5">+</span> Oracle NetSuite SuiteCloud Developer II certified</li>
            <li className="flex items-start gap-2"><span className="text-accent font-bold mt-0.5">+</span> Oracle NetSuite Administrator Professional certified</li>
            <li className="flex items-start gap-2"><span className="text-accent font-bold mt-0.5">+</span> More than six years of SuiteScript development experience</li>
            <li className="flex items-start gap-2"><span className="text-accent font-bold mt-0.5">+</span> Experience across User Event, Client, Scheduled, Map/Reduce, Suitelet, RESTlet, and Workflow Action scripts</li>
            <li className="flex items-start gap-2"><span className="text-accent font-bold mt-0.5">+</span> Every 1.0 conversion starts with documenting the business logic before the rewrite begins</li>
            <li className="flex items-start gap-2"><span className="text-accent font-bold mt-0.5">+</span> Sandbox-first delivery on every conversion</li>
            <li className="flex items-start gap-2"><span className="text-accent font-bold mt-0.5">+</span> Direct access to the developer performing the conversion</li>
            <li className="flex items-start gap-2"><span className="text-accent font-bold mt-0.5">+</span> US-based LLC serving NetSuite customers internationally</li>
            <li className="flex items-start gap-2"><span className="text-accent font-bold mt-0.5">+</span> Month-to-month after a three-month minimum, starting at $799/month</li>
          </ul>
        </div>

        {/* Process steps */}
        <div className="mt-14">
          <h2 className="text-xl font-bold text-brand-900 mb-5">How to get started with a SuiteScript 2.1 migration</h2>
          <ol className="space-y-4">
            {[
              { step: "1", title: "Request a free readiness check", detail: "Tell us what you know about your scripts and whether the NetSuite warning is visible. We will discuss your situation and recommend the appropriate next step." },
              { step: "2", title: "Grant controlled NetSuite access", detail: "We use a read-only or limited-access role during the audit phase to inventory scripts and deployments without making changes to the account." },
              { step: "3", title: "Receive the script inventory and risk report", detail: "You receive a complete inventory, version breakdown, business-risk classification, dependency map, and a recommended priority order with a migration estimate." },
              { step: "4", title: "Approve the migration scope", detail: "We agree on the conversion scope, starting version tier, timeline, and monthly hours before any code changes are made." },
              { step: "5", title: "Convert and test in sandbox", detail: "Conversion work happens in the sandbox environment. You and your business users confirm processes before any production changes are scheduled." },
              { step: "6", title: "Deploy safely to production", detail: "Production deployment follows a controlled plan with timing, smoke testing, business-owner confirmation, and post-deployment monitoring." },
            ].map(({ step, title, detail }) => (
              <li key={step} className="flex items-start gap-4">
                <div className="shrink-0 w-8 h-8 rounded-full bg-accent text-white text-sm font-bold flex items-center justify-center mt-0.5">
                  {step}
                </div>
                <div>
                  <p className="font-semibold text-brand-900 text-sm mb-0.5">{title}</p>
                  <p className="text-sm text-brand-400">{detail}</p>
                </div>
              </li>
            ))}
          </ol>
        </div>

        {/* Checklist CTA */}
        <div className="mt-10 rounded-2xl border border-brand-100 bg-brand-50/30 p-5 flex items-start gap-4">
          <div className="shrink-0 w-10 h-10 rounded-xl bg-accent/10 flex items-center justify-center">
            <CheckCircle2 className="h-5 w-5 text-accent" />
          </div>
          <div>
            <p className="text-sm font-semibold text-brand-900 mb-1">Not sure where your account stands?</p>
            <p className="text-sm text-brand-400 mb-3">
              Use the ten-question readiness checklist to identify gaps in your script inventory, process mapping, and sandbox readiness before the 2028.2 deadline.
            </p>
            <Link
              href="/netsuite-suitescript-readiness-checklist"
              className="text-sm font-semibold text-accent hover:underline"
            >
              Review the SuiteScript 2028.2 readiness checklist
            </Link>
          </div>
        </div>

        {/* Mid-page form */}
        <div id="free-check-form" className="mt-14 rounded-2xl border-2 border-accent/30 bg-gradient-to-br from-accent/5 to-transparent p-6">
          <p className="text-xs font-semibold uppercase tracking-wide text-accent mb-2">Free SuiteScript 2.1 Readiness Check</p>
          <h2 className="text-base font-bold text-brand-900 mb-1">Not Sure Where to Start? Start With a Free Check.</h2>
          <p className="text-sm text-brand-400 mb-5">
            Tell us about your account and we will review your situation, discuss the scope of what needs to change, and explain what the migration involves. No obligation before we discuss.
          </p>
          <FreeScriptCheckForm source="suitescript_migration_service" />
          <div className="mt-4 pt-4 border-t border-brand-100 grid grid-cols-1 sm:grid-cols-2 gap-2">
            {[
              "SuiteCloud Developer II certified",
              "NetSuite Administrator certified",
              "Sandbox-first delivery",
              "Direct access to the developer",
            ].map((signal) => (
              <p key={signal} className="text-xs text-brand-300 flex items-center gap-1.5">
                <CheckCircle2 className="h-3.5 w-3.5 text-accent/60 shrink-0" />
                {signal}
              </p>
            ))}
          </div>
        </div>

        {/* Related reading */}
        <div className="mt-10 rounded-2xl border border-brand-100 bg-brand-50/30 p-5 sm:p-6">
          <p className="text-sm font-semibold text-brand-900 mb-3">Related reading</p>
          <ul className="space-y-2.5">
            <li className="text-sm text-brand-400">
              <Link href="/blog/netsuite-suitescript-2-1-migration" className="text-accent hover:underline">
                NetSuite SuiteScript 2.1 migration: full audit and upgrade guide
              </Link>{" "}
              covers version differences, the 2028.2 deadline, what each conversion type involves, and how to prioritize scripts.
            </li>
            <li className="text-sm text-brand-400">
              <Link href="/netsuite-suitescript-development" className="text-accent hover:underline">
                NetSuite SuiteScript development
              </Link>{" "}
              covers ongoing SuiteScript development and the full range of script types SuitePacific builds and maintains.
            </li>
            <li className="text-sm text-brand-400">
              <Link href="/netsuite-technical-debt" className="text-accent hover:underline">
                NetSuite technical debt
              </Link>{" "}
              covers the broader account review that often accompanies a migration: script governance, workflow cleanup, and performance issues.
            </li>
            <li className="text-sm text-brand-400">
              <Link href="/netsuite-managed-support" className="text-accent hover:underline">
                NetSuite post-go-live support
              </Link>{" "}
              covers ongoing support retainers for NetSuite accounts that need continued SuiteScript maintenance and release readiness after migration.
            </li>
          </ul>
        </div>

        <ServiceFaqSection items={FAQ} />

        {/* Final CTA */}
        <div className="mt-10 rounded-2xl border-2 border-accent/30 bg-gradient-to-br from-accent/5 to-transparent p-6">
          <p className="text-xs font-semibold uppercase tracking-wide text-accent mb-2">Free SuiteScript 2.1 Readiness Check</p>
          <h2 className="text-base font-bold text-brand-900 mb-1">Start Before the 2028.2 Deadline Becomes an Emergency</h2>
          <p className="text-sm text-brand-400 mb-5">
            Accounts that begin the audit in 2026 or 2027 complete the work on a planned schedule. Accounts that start in 2028 are under deadline pressure. Request a free initial check and we will review your situation within one business day.
          </p>
          <FreeScriptCheckForm source="suitescript_migration_service" />
          <p className="mt-4 text-xs text-brand-300">Last updated September 2026</p>
        </div>

      </div>
    </main>
  );
}

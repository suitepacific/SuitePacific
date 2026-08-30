import type { Metadata } from "next";
import Link from "next/link";
import { AlertTriangle, CheckCircle2, ShieldAlert } from "lucide-react";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { BreadcrumbJsonLd, FaqJsonLd, ArticleJsonLd, OrganizationJsonLd } from "@/components/seo/JsonLd";
import { LeadFormLight } from "@/components/sections/LeadFormLight";
import { SuitePacificCallout } from "@/components/sections/SuitePacificCallout";
import { ChecklistDownloadForm } from "@/components/sections/ChecklistDownloadForm";
import { SITE_URL } from "@/lib/content";
import { CHECKLIST_ITEMS, SECTIONS, type Priority } from "./checklist-data";

export const metadata: Metadata = {
  title: "NetSuite 2026.2 Release Readiness Checklist | SuitePacific",
  description:
    "Prepare for NetSuite 2026.2 with a practical release readiness checklist covering Finance, Integrations, SuiteScript, Reporting, Manufacturing, Inventory, Security, and more.",
  alternates: { canonical: `${SITE_URL}/netsuite-2026-2-release-readiness-checklist` },
  openGraph: {
    title: "NetSuite 2026.2 Release Readiness Checklist",
    description:
      "Prepare for NetSuite 2026.2 with a practical release readiness checklist covering Finance, Integrations, SuiteScript, Reporting, Manufacturing, Inventory, Security, and more.",
    url: `${SITE_URL}/netsuite-2026-2-release-readiness-checklist`,
    type: "website",
    images: [{ url: `${SITE_URL}/og-default.png`, width: 1200, height: 630 }],
  },
};

const FAQ_ITEMS = [
  {
    question: "What is the NetSuite 2026.2 release?",
    answer:
      "NetSuite 2026.2 is one of Oracle NetSuite's scheduled bi-annual version upgrades. It introduces new features, enhancements, and platform changes across accounting, authentication, banking, inventory, manufacturing, integrations, reporting, SuiteScript, and more.",
  },
  {
    question: "When should I start preparing for NetSuite 2026.2?",
    answer:
      "Begin reviewing the release notes and testing relevant functionality in your Release Preview account (Sandbox) as soon as it is available. The earlier you identify issues in Sandbox, the more time you have to address them before the release reaches Production. Critical items such as NLAuth and TBA authentication changes have deadlines in 2027.1 and should be planned now.",
  },
  {
    question: "Does every NetSuite customer need to complete this checklist?",
    answer:
      "No. The checklist is designed to help you identify which changes apply to your specific account. Many items are conditional: they only matter if you use SuiteTax, Advanced BOM, SuiteBilling, CPQ, Analytics Warehouse, specific authentication methods, or other features. Review the checklist and mark items N/A where they do not apply to your account.",
  },
  {
    question: "Is NetSuite 2026.2 going to break my integrations?",
    answer:
      "Not necessarily. However, authentication changes make integration review particularly important for this release. If any of your integrations use NLAuth, that is a hard deadline: NLAuth stops working in 2027.1. If you are planning new integrations using TBA, those cannot be created from 2027.1. SuiteQL default sorting also changes in 2026.2, which may affect integrations that rely on implicit query ordering.",
  },
  {
    question: "Do I need to test my SuiteQL queries for 2026.2?",
    answer:
      "If your account uses SuiteQL or Analytics datasets that depend on implicit transaction ordering, yes. NetSuite 2026.2 changes the default sort field from Transaction.tranDisplayName to Transaction.tranDate when no explicit ORDER BY is specified. Queries and datasets that do not specify an explicit sort should be reviewed and tested in Sandbox.",
  },
  {
    question: "Should I test my custom SuiteScripts for 2026.2?",
    answer:
      "If your scripts interact with manufacturing transactions (especially Advanced BOM assembly component lines or zero-quantity component handling), SuiteQL queries, bank reconciliation, or any of the other affected areas, they should be included in regression testing. The manufacturing transaction storage changes in 2026.2 are the highest-risk area for existing SuiteScript.",
  },
  {
    question: "Is this the official Oracle NetSuite release checklist?",
    answer:
      "No. This is a practical release-readiness checklist produced by SuitePacific based on the Oracle NetSuite 2026.2 Release Preview Notes (Revision Date July 13, 2026). It is designed to help NetSuite customers identify which changes affect their account and what to test. For official release documentation, refer to Oracle's NetSuite Release Notes.",
  },
];

const PRIORITY_STYLES: Record<Priority, { badge: string; dot: string }> = {
  Critical: {
    badge: "bg-red-50 text-red-700 border border-red-200",
    dot: "bg-red-500",
  },
  High: {
    badge: "bg-orange-50 text-orange-700 border border-orange-200",
    dot: "bg-orange-500",
  },
  Medium: {
    badge: "bg-yellow-50 text-yellow-700 border border-yellow-200",
    dot: "bg-yellow-500",
  },
  Low: {
    badge: "bg-emerald-50 text-emerald-700 border border-emerald-200",
    dot: "bg-emerald-500",
  },
};

const CRITICAL_COUNT = CHECKLIST_ITEMS.filter((i) => i.priority === "Critical").length;
const HIGH_COUNT = CHECKLIST_ITEMS.filter((i) => i.priority === "High").length;
const MEDIUM_COUNT = CHECKLIST_ITEMS.filter((i) => i.priority === "Medium").length;

function PriorityBadge({ priority }: { priority: Priority }) {
  const s = PRIORITY_STYLES[priority];
  return (
    <span className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-0.5 text-xs font-semibold ${s.badge}`}>
      <span className={`h-1.5 w-1.5 rounded-full ${s.dot}`} />
      {priority}
    </span>
  );
}

function ChecklistCard({ item }: { item: (typeof CHECKLIST_ITEMS)[0] }) {
  return (
    <div className="rounded-xl border border-brand-100 bg-white p-5 shadow-soft">
      <div className="flex flex-wrap items-start justify-between gap-3 mb-3">
        <div className="flex items-center gap-2 flex-wrap">
          <span className="rounded-md bg-brand-50 px-2 py-0.5 text-xs font-mono font-semibold text-brand-500">
            {item.id}
          </span>
          <PriorityBadge priority={item.priority} />
        </div>
        <div className="flex flex-wrap gap-1.5">
          {item.team.split(" / ").map((t) => (
            <span
              key={t}
              className="rounded-full bg-brand-50 px-2 py-0.5 text-xs text-brand-500 border border-brand-100"
            >
              {t}
            </span>
          ))}
        </div>
      </div>

      <h3 className="text-sm font-semibold text-brand-900 mb-3">{item.title}</h3>

      <div className="space-y-3">
        <div>
          <p className="text-[0.65rem] font-bold uppercase tracking-wider text-brand-400 mb-1">
            What changed
          </p>
          <p className="text-sm text-brand-600 leading-relaxed">{item.whatChanged}</p>
        </div>

        <div>
          <p className="text-[0.65rem] font-bold uppercase tracking-wider text-brand-400 mb-1">
            Why it matters
          </p>
          <p className="text-sm text-brand-600 leading-relaxed">{item.whyItMatters}</p>
        </div>

        <div>
          <p className="text-[0.65rem] font-bold uppercase tracking-wider text-brand-400 mb-1.5">
            What to check
          </p>
          <ul className="space-y-1">
            {item.whatToCheck.map((check, i) => (
              <li key={i} className="flex items-start gap-2 text-sm text-brand-600">
                <CheckCircle2 className="h-3.5 w-3.5 text-brand-300 mt-0.5 shrink-0" />
                {check}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}

export default function ReleaseChecklistPage() {
  const itemsBySection = SECTIONS.map((s) => ({
    ...s,
    items: CHECKLIST_ITEMS.filter((i) => i.section === s.id),
  })).filter((s) => s.items.length > 0);

  return (
    <main className="pt-32 pb-24 sm:pt-40 sm:pb-32">
      <BreadcrumbJsonLd
        items={[
          { name: "Home", url: SITE_URL },
          {
            name: "NetSuite 2026.2 Release Readiness Checklist",
            url: `${SITE_URL}/netsuite-2026-2-release-readiness-checklist`,
          },
        ]}
      />
      <FaqJsonLd items={FAQ_ITEMS} />
      <ArticleJsonLd
        headline="NetSuite 2026.2 Release Readiness Checklist"
        description="A practical release-readiness checklist for NetSuite 2026.2 covering Finance, Integrations, SuiteScript, Reporting, Manufacturing, Inventory, Security, and more."
        url={`${SITE_URL}/netsuite-2026-2-release-readiness-checklist`}
        datePublished="2026-08-19"
        dateModified="2026-08-19"
        keywords="NetSuite 2026.2 release readiness checklist, NetSuite 2026.2 checklist, NetSuite release readiness"
      />
      <OrganizationJsonLd />

      <div className="mx-auto max-w-3xl px-6 lg:px-8">
        {/* HERO */}
        <SectionHeading
          as="h1"
          eyebrow="2026.2 Release Readiness"
          title="NetSuite 2026.2 Release Readiness Checklist"
          subtitle="The 2026.2 release changes APIs, governance limits, and workflow behaviour. Accounts with active SuiteScript and integrations need to test in Sandbox before the release window opens. SuitePacific identifies which changes affect your specific account and remediates what breaks."
          align="left"
        />

        {/* Quick answer block */}
        <div className="mt-6 rounded-xl border border-brand-100 bg-brand-50 p-5">
          <p className="mb-1 text-[0.65rem] font-bold uppercase tracking-widest text-brand-400">Quick answer</p>
          <p className="text-sm leading-relaxed text-brand-700">
            The NetSuite 2026.2 release introduces changes across authentication, SuiteQL, finance,
            banking, inventory, manufacturing, billing, reporting, integrations, and customization.
            This checklist contains {CHECKLIST_ITEMS.length}+ practical checkpoints organized by
            functional area, with{" "}
            <span className="font-semibold text-red-700">{CRITICAL_COUNT} Critical</span>,{" "}
            <span className="font-semibold text-orange-700">{HIGH_COUNT} High</span>, and{" "}
            <span className="font-semibold text-yellow-700">{MEDIUM_COUNT} Medium</span> priority
            items. Each item explains what Oracle changed, why it matters to your account, and
            exactly what to test in Release Preview before 2026.2 reaches Production. This is based
            on the Oracle NetSuite 2026.2 Release Preview Notes (Revision Date July 13, 2026) and
            is subject to change as Oracle updates the preview notes.
          </p>
        </div>

        {/* Priority summary */}
        <div className="mt-6 grid grid-cols-3 gap-3">
          {[
            { label: "Critical", count: CRITICAL_COUNT, color: "text-red-700 bg-red-50 border-red-200" },
            { label: "High", count: HIGH_COUNT, color: "text-orange-700 bg-orange-50 border-orange-200" },
            { label: "Medium", count: MEDIUM_COUNT, color: "text-yellow-700 bg-yellow-50 border-yellow-200" },
          ].map(({ label, count, color }) => (
            <div key={label} className={`rounded-xl border p-4 text-center ${color}`}>
              <p className="text-2xl font-bold">{count}</p>
              <p className="text-xs font-semibold mt-0.5">{label}</p>
            </div>
          ))}
        </div>

        {/* Primary CTAs */}
        <div className="mt-6 flex flex-col sm:flex-row gap-3">
          <a
            href="#download"
            className="flex-1 inline-flex items-center justify-center rounded-full bg-brand text-white font-medium px-5 py-2.5 text-sm shadow-soft hover:bg-brand-700 transition-colors text-center"
          >
            Download Excel Checklist
          </a>
          <a
            href="#risk-review"
            className="flex-1 inline-flex items-center justify-center rounded-full border border-brand-200 text-brand-700 font-medium px-5 py-2.5 text-sm hover:bg-brand-50 transition-colors text-center"
          >
            Request a Release Risk Review
          </a>
        </div>

        {/* Release Preview Notice */}
        <div className="mt-8 flex gap-3 rounded-xl border border-amber-200 bg-amber-50 p-4">
          <AlertTriangle className="h-5 w-5 text-amber-600 shrink-0 mt-0.5" />
          <div>
            <p className="text-sm font-semibold text-amber-900 mb-1">Release Preview Notice</p>
            <p className="text-sm text-amber-800 leading-relaxed">
              This checklist is based on Oracle NetSuite 2026.2 Release Preview Notes, Revision
              Date July 13, 2026. Oracle states that release notes are subject to change and that
              feature availability varies by account, configuration, licensing, and SuiteApp
              availability. Always verify applicable changes against your own Release Preview
              account before Production deployment.
            </p>
          </div>
        </div>

        <p className="mt-3 text-xs text-brand-300">
          <time dateTime="2026-08-19">Published August 2026</time> &middot; Source: Oracle NetSuite
          2026.2 Release Preview Notes
        </p>

        {/* ORACLE VS SUITEPACIFIC */}
        <div className="mt-16 pt-10 border-t border-brand-100">
          <h2 className="text-xl font-bold text-brand-900 mb-2">
            Oracle tells you what changed. We help you determine what matters.
          </h2>
          <p className="text-sm text-brand-600 leading-relaxed mb-6">
            A release note might say: &ldquo;Default sorting for SuiteQL queries and Analytics
            datasets has changed.&rdquo; The important question for your business is whether any of
            your scripts, reports, integrations, or dashboards depend on the previous behavior. That
            is what this checklist is designed to help you identify.
          </p>

          <div className="grid sm:grid-cols-2 gap-4">
            <div className="rounded-xl border border-brand-100 bg-brand-50 p-4">
              <p className="text-xs font-bold uppercase tracking-wider text-brand-400 mb-2">Oracle</p>
              <p className="text-sm font-semibold text-brand-900">What changed in NetSuite</p>
            </div>
            <div className="rounded-xl border border-accent/20 bg-accent/5 p-4">
              <p className="text-xs font-bold uppercase tracking-wider text-accent/70 mb-2">This checklist</p>
              <p className="text-sm font-semibold text-brand-900">
                What changed for your account, who needs to care, and what to test
              </p>
            </div>
          </div>
        </div>

        {/* HOW IT WORKS */}
        <div className="mt-16 pt-10 border-t border-brand-100">
          <h2 className="text-xl font-bold text-brand-900 mb-6">How to use this checklist</h2>
          <div className="grid sm:grid-cols-2 gap-4">
            {[
              {
                step: "01",
                title: "Identify the change",
                desc: "Understand what NetSuite changed in 2026.2 and whether the affected feature is used in your account.",
              },
              {
                step: "02",
                title: "Identify who is affected",
                desc: "Determine whether the change belongs to Finance, Operations, IT, Technical, Manufacturing, or another team.",
              },
              {
                step: "03",
                title: "Test the impact",
                desc: "Validate the relevant workflow or process in your Release Preview or Sandbox account before Production.",
              },
              {
                step: "04",
                title: "Record the outcome",
                desc: "Mark each item Pass, Fail, N/A, Action Required, or Needs Investigation. Use the Excel workbook to assign owners and track status.",
              },
            ].map(({ step, title, desc }) => (
              <div key={step} className="rounded-xl border border-brand-100 bg-white p-4 shadow-soft">
                <span className="text-3xl font-black text-brand-100">{step}</span>
                <p className="mt-1 text-sm font-semibold text-brand-900">{title}</p>
                <p className="mt-1 text-sm text-brand-500">{desc}</p>
              </div>
            ))}
          </div>
        </div>

        {/* TECHNICAL RISK HOTSPOTS */}
        <div className="mt-16 pt-10 border-t border-brand-100">
          <h2 className="text-xl font-bold text-brand-900 mb-2">
            Technical risk hotspots: where to focus first
          </h2>
          <p className="text-sm text-brand-500 mb-6">
            Seven areas where the 2026.2 changes carry the highest technical risk. Review these
            before moving through the full checklist.
          </p>
          <div className="space-y-3">
            {[
              {
                num: "1",
                title: "Authentication",
                desc: "NLAuth and TBA dependencies need an explicit migration strategy. NLAuth ends in 2027.1. New TBA integrations cannot be created from 2027.1. Both require planning now.",
                priority: "Critical" as Priority,
              },
              {
                num: "2",
                title: "SuiteQL",
                desc: "Queries relying on implicit result ordering will return rows in a different order after 2026.2. Any script, integration, or report consuming SuiteQL results without an explicit ORDER BY needs review.",
                priority: "Critical" as Priority,
              },
              {
                num: "3",
                title: "Manufacturing",
                desc: "Advanced BOM assembly component storage changes and zero-quantity component handling both affect manufacturing transaction data. Scripts, SuiteQL, and integrations reading manufacturing transactions need regression testing.",
                priority: "Critical" as Priority,
              },
              {
                num: "4",
                title: "Integrations",
                desc: "REST SuiteQL bound parameters, sequential batch processing, OAuth 2.0 PKCE, NLAuth end-of-support, and TBA restrictions all land in this release cycle. Integration inventory and review is essential.",
                priority: "Critical" as Priority,
              },
              {
                num: "5",
                title: "SuiteTax",
                desc: "Tax handling for vendor term discounts changes in 2026.2. Accounts using SuiteTax and vendor term discounts need to test and validate tax calculations and accounting before Production.",
                priority: "Critical" as Priority,
              },
              {
                num: "6",
                title: "Customizations",
                desc: "Scripts, workflows, Saved Searches, reports, and custom records should be tested where they interact with affected areas, particularly manufacturing, bank reconciliation, and the SuiteQL sort change.",
                priority: "High" as Priority,
              },
              {
                num: "7",
                title: "Development Tooling",
                desc: "SuiteCloud SDK versions for 2026.2 were not yet available as of the preview notes. Verify SuiteCloud tooling availability before changing development or CI/CD environments.",
                priority: "Critical" as Priority,
              },
            ].map(({ num, title, desc, priority }) => (
              <div
                key={num}
                className="flex gap-4 rounded-xl border border-brand-100 bg-white p-4 shadow-soft"
              >
                <div className="shrink-0">
                  <span className="flex h-7 w-7 items-center justify-center rounded-full bg-brand-900 text-xs font-bold text-white">
                    {num}
                  </span>
                </div>
                <div className="min-w-0">
                  <div className="flex flex-wrap items-center gap-2 mb-1">
                    <p className="text-sm font-semibold text-brand-900">{title}</p>
                    <PriorityBadge priority={priority} />
                  </div>
                  <p className="text-sm text-brand-500 leading-relaxed">{desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Lead form - after tech risk hotspots, before full checklist */}
        <div className="mt-10 rounded-2xl border border-brand-100 bg-white p-5 shadow-soft">
          <p className="text-sm font-semibold text-brand-900 mb-1">Working through 2026.2 prep and want a second set of eyes?</p>
          <p className="text-xs text-brand-400 mb-4">SuitePacific can identify which changes affect your specific account and customizations.</p>
          <LeadFormLight />
          <p className="mt-2 text-xs text-brand-300">
            NetSuite-certified · Sandbox-first · Direct access, no ticket system
          </p>
        </div>

        {/* FULL CHECKLIST */}
        <div className="mt-16 pt-10 border-t border-brand-100">
          <h2 className="text-xl font-bold text-brand-900 mb-1">
            Full 2026.2 Release Readiness Checklist
          </h2>
          <p className="text-sm text-brand-500 mb-2">
            {CHECKLIST_ITEMS.length} checkpoints across{" "}
            {itemsBySection.filter((s) => s.items.length > 0).length} functional areas.
            Download the Excel workbook to assign owners and track status.
          </p>
          <p className="text-xs text-brand-300 mb-8">
            Items marked N/A do not apply to your account or configuration.
          </p>

          <div className="space-y-12">
            {itemsBySection.map((section) => (
              <div key={section.id}>
                <div className="flex items-center gap-3 mb-4">
                  <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-brand-900 text-xs font-black text-white">
                    {section.id}
                  </span>
                  <h3 className="text-base font-bold text-brand-900">{section.label}</h3>
                  <span className="text-xs text-brand-300">
                    {section.items.length} item{section.items.length !== 1 ? "s" : ""}
                  </span>
                </div>
                <div className="space-y-4">
                  {section.items.map((item) => (
                    <ChecklistCard key={item.id} item={item} />
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* MID-PAGE RISK REVIEW CTA */}
        <div id="risk-review" className="mt-16 pt-10 border-t border-brand-100">
          <div className="rounded-2xl border border-brand-200 bg-brand-900 p-8 text-white">
            <div className="flex items-start gap-4">
              <ShieldAlert className="h-8 w-8 text-accent shrink-0 mt-0.5 hidden sm:block" />
              <div>
                <h2 className="text-lg font-bold mb-2">
                  Not sure which 2026.2 changes affect your account?
                </h2>
                <p className="text-sm text-brand-200 leading-relaxed mb-2">
                  The release notes tell you what Oracle changed. They don&apos;t tell you whether
                  your SuiteScripts, SuiteQL queries, workflows, Saved Searches, integrations,
                  authentication methods, financial processes, or manufacturing customizations are
                  actually affected.
                </p>
                <p className="text-sm text-brand-200 leading-relaxed mb-6">
                  SuitePacific can identify which 2026.2 changes could affect your account and help
                  you prioritize what needs to be tested.
                </p>
                <div className="rounded-2xl border border-brand-700 bg-brand-800 p-5">
                  <LeadFormLight />
                </div>
                <p className="mt-3 text-xs text-brand-400 text-center">
                  NetSuite-certified · Sandbox-first · Direct access, no ticket system
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* DOWNLOAD SECTION */}
        <div id="download" className="mt-16 pt-10 border-t border-brand-100">
          <h2 className="text-xl font-bold text-brand-900 mb-2">
            Download the 2026.2 Release Readiness Workbook
          </h2>
          <p className="text-sm text-brand-500 leading-relaxed mb-6">
            The Excel workbook includes all {CHECKLIST_ITEMS.length} checkpoints with Department,
            Area, Priority, What Changed, Why It Matters, What To Check, Owner, Status, Findings,
            and Action Required columns. Six tabs: Executive Summary, Full Checklist, Technical and
            Integrations, Finance, Operations, and Sign-Off.
          </p>
          <div className="rounded-2xl border border-brand-100 bg-white p-6 shadow-soft">
            <ChecklistDownloadForm />
          </div>
        </div>

        {/* BUSINESS RISK HOTSPOTS */}
        <div className="mt-16 pt-10 border-t border-brand-100">
          <h2 className="text-xl font-bold text-brand-900 mb-6">
            2026.2 changes by business team
          </h2>
          <div className="grid sm:grid-cols-2 gap-4">
            {[
              {
                team: "Finance",
                items: [
                  "Bank reconciliation UI and matching",
                  "Payment application suggestions",
                  "Automatic match submission",
                  "SuiteTax on vendor term discounts",
                  "Payment Runs",
                  "Subscription metrics",
                  "Billing and revenue changes",
                  "Pricing rule updates",
                  "Excel export format (.xlsx)",
                ],
              },
              {
                team: "Operations",
                items: [
                  "Fulfillment from Sales Order lists",
                  "Inventory Optimization",
                  "Initial average cost by location",
                  "Consigned inventory bin transfers",
                  "Supply planning and pegging workbooks",
                  "Rough-Cut Capacity Planning",
                  "Payment Runs and vendor bills",
                  "Bill Capture enhancements",
                ],
              },
              {
                team: "Sales and CPQ",
                items: [
                  "Price Rules with dynamic Item Collections",
                  "Advanced Pricing context",
                  "CPQ AI Assistant",
                  "CPQ Configurator migration",
                  "Subscription Metrics",
                  "Automated payment adjustments",
                ],
              },
              {
                team: "Manufacturing",
                items: [
                  "Advanced BOM assembly component storage",
                  "Zero-quantity manufacturing components",
                  "Manufacturing charge cost bulk update",
                  "Rough-Cut Capacity Planning",
                ],
              },
              {
                team: "Technical / Development",
                items: [
                  "SuiteQL default sorting change",
                  "Advanced BOM data storage change",
                  "NLAuth end of support (2027.1)",
                  "TBA new-integration restriction (2027.1)",
                  "OAuth 2.0 PKCE requirement (2027.1)",
                  "REST SuiteQL bound parameters",
                  "Sequential REST batch processing",
                  "SuiteCloud SDK availability",
                  "AI Description fields",
                  "Currency context for custom fields",
                  "Externally rated usage billing",
                ],
              },
              {
                team: "IT / Security",
                items: [
                  "Passkey authentication",
                  "Passkeys as second factor",
                  "NLAuth end of support",
                  "TBA deprecation roadmap",
                  "Sensitive data in bank memo fields",
                ],
              },
              {
                team: "Reporting / Analytics",
                items: [
                  "Excel export format change (.xls to .xlsx)",
                  "Saved Searches in Analytics Warehouse",
                  "Salesforce data-source separation",
                  "Project Health Indicators",
                ],
              },
              {
                team: "NetSuite Admin",
                items: [
                  "Advanced Record Customization",
                  "AI Description fields on custom objects",
                  "SuiteCloud tooling availability",
                  "Overall release coordination and sign-off",
                ],
              },
            ].map(({ team, items }) => (
              <div key={team} className="rounded-xl border border-brand-100 bg-white p-4 shadow-soft">
                <p className="text-sm font-bold text-brand-900 mb-3">{team}</p>
                <ul className="space-y-1.5">
                  {items.map((item) => (
                    <li key={item} className="flex items-start gap-2 text-sm text-brand-500">
                      <span className="h-1.5 w-1.5 rounded-full bg-brand-300 mt-1.5 shrink-0" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        {/* FINAL CTA */}
        <div className="mt-16 pt-10 border-t border-brand-100">
          <h2 className="text-xl font-bold text-brand-900 mb-2 text-center">
            Is your NetSuite account ready for 2026.2?
          </h2>
          <p className="text-sm text-brand-500 text-center mb-6 max-w-xl mx-auto">
            Don&apos;t wait until Production to discover that a release changed something your
            business depends on. SuitePacific can assess and test technical customizations,
            integrations, SuiteScript, SuiteQL, workflows, reporting, finance processes, and
            manufacturing.
          </p>
          <div className="rounded-2xl border border-brand-100 bg-white p-6 shadow-soft max-w-md mx-auto">
            <p className="text-sm font-semibold text-brand-900 mb-4 text-center">
              Request a 2026.2 Release Risk Review
            </p>
            <LeadFormLight />
          </div>
        </div>

        {/* INTERNAL LINKS */}
        <div className="mt-12 pt-8 border-t border-brand-100">
          <p className="text-sm font-semibold text-brand-900 mb-3">Related resources</p>
          <ul className="space-y-2.5">
            <li className="text-sm text-brand-400">
              <Link href="/netsuite-post-go-live-support" className="text-accent hover:underline">
                NetSuite post-go-live support
              </Link>{" "}
              covers ongoing development, SuiteScript, workflows, and integration maintenance after go-live.
            </li>
            <li className="text-sm text-brand-400">
              <Link href="/netsuite-health-check" className="text-accent hover:underline">
                NetSuite health check
              </Link>{" "}
              provides a structured account review with a written findings report and prioritized remediation plan, including pre-release regression risk.
            </li>
            <li className="text-sm text-brand-400">
              <Link href="/netsuite-suitescript-development" className="text-accent hover:underline">
                NetSuite SuiteScript development
              </Link>{" "}
              covers SuiteScript 2.x development for new scripts, fixes to existing scripts, and regression testing.
            </li>
            <li className="text-sm text-brand-400">
              <Link href="/netsuite-integrations" className="text-accent hover:underline">
                NetSuite integrations
              </Link>{" "}
              covers third-party integration development, maintenance, and authentication migration for accounts affected by the NLAuth and TBA changes.
            </li>
            <li className="text-sm text-brand-400">
              <Link href="/netsuite-care" className="text-accent hover:underline">
                NetSuite Care plans
              </Link>{" "}
              are the monthly retainer options for accounts that need ongoing technical support, including release review as part of the engagement.
            </li>
          </ul>
        </div>


        {/* Bottom Line */}
        <div className="mt-12 rounded-2xl border-2 border-accent/30 bg-gradient-to-br from-accent/5 to-transparent p-6">
          <p className="text-xs font-semibold uppercase tracking-wide text-accent mb-3">Bottom Line</p>
          <h2 className="text-base font-semibold text-brand-900 mb-3">
            The 2026.2 release touches APIs, governance limits, and workflow behaviour. Accounts with active SuiteScript and integrations that do not test in Sandbox before the release window open in production risk.
          </h2>
          <p className="text-sm text-brand-500 mb-4">
            Release readiness is not optional for accounts with SuiteScript customisations. Oracle changes APIs and governance behaviours in every release, and scripts that ran correctly last month may break, hit new limits, or behave differently after the upgrade. The release preview environment exists to find these issues before production is affected.
          </p>
          <p className="text-sm text-brand-500 mb-4">
            SuitePacific tests every script, workflow, and integration against each release preview for all active managed retainer clients. For accounts not on a retainer, release readiness testing is available as a standalone engagement. Oracle SuiteCloud Developer II and Administrator Professional certified. Retainers from $799 per month include release preparation.
          </p>
          <ul className="space-y-2 text-sm text-brand-500">
            <li className="flex items-start gap-2"><span className="text-accent font-bold mt-0.5">→</span> Pre-release Sandbox testing of all custom scripts and integrations, not just a checklist review</li>
            <li className="flex items-start gap-2"><span className="text-accent font-bold mt-0.5">→</span> Included in all managed retainer plans: no separate engagement or additional fee</li>
            <li className="flex items-start gap-2"><span className="text-accent font-bold mt-0.5">→</span> Oracle-certified developers who understand which release changes affect which script types</li>
          </ul>
        </div>

        <SuitePacificCallout
          heading="SuitePacific: release readiness testing included in all managed support plans"
          linkHref="/netsuite-care"
          linkLabel="View managed support plans"
        />

        {/* FAQ */}
        <div className="mt-16 pt-10 border-t border-brand-100">
          <h2 className="text-xl font-bold text-brand-900 mb-6">Frequently asked questions</h2>
          <div className="space-y-5">
            {FAQ_ITEMS.map(({ question, answer }) => (
              <div key={question}>
                <h3 className="text-sm font-semibold text-brand-900 mb-1.5">{question}</h3>
                <p className="text-sm text-brand-500 leading-relaxed">{answer}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </main>
  );
}

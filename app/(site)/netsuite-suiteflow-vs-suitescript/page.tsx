import type { Metadata } from "next";
import Link from "next/link";
import { CheckCircle2, XCircle, Code2 } from "lucide-react";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Card } from "@/components/ui/Card";
import { IconBadge } from "@/components/ui/IconBadge";
import { BreadcrumbJsonLd, FaqJsonLd, ServiceJsonLd, OrganizationJsonLd } from "@/components/seo/JsonLd";
import { ServiceFaqSection } from "@/components/ui/ServiceFaqSection";
import { LeadFormLight } from "@/components/sections/LeadFormLight";
import { SITE_URL } from "@/lib/content";

const COMPARISON_ROWS = [
  { feature: "Approval routing", suiteflow: "Yes", suitescript: "Possible but unnecessary" },
  { feature: "Email notifications", suiteflow: "Yes", suitescript: "Yes, via script" },
  { feature: "Status transitions", suiteflow: "Yes", suitescript: "Yes, via script" },
  { feature: "Update related records", suiteflow: "No", suitescript: "Yes" },
  { feature: "Complex calculations", suiteflow: "No", suitescript: "Yes" },
  { feature: "External API calls", suiteflow: "No", suitescript: "Yes" },
  { feature: "Batch processing", suiteflow: "No", suitescript: "Yes (Scheduled/Map-Reduce)" },
  { feature: "Requires code", suiteflow: "No", suitescript: "Yes (JavaScript)" },
  { feature: "Risk on upgrade", suiteflow: "Low", suitescript: "Medium (must retest)" },
  { feature: "Typical use", suiteflow: "Approvals and notifications", suitescript: "Logic, data, and integrations" },
];

const SUITEFLOW_USES = [
  {
    icon: CheckCircle2,
    title: "Purchase order approval routing",
    description:
      "Route POs through single or multi-level approval chains based on amount, department, or vendor. Send email notifications at each stage and return records to the submitter if rejected.",
  },
  {
    icon: CheckCircle2,
    title: "Expense report and time-off approvals",
    description:
      "Standard approval flows for expense reports and time-off requests with manager escalation and status tracking. No code required; configurable entirely in the workflow editor.",
  },
  {
    icon: CheckCircle2,
    title: "Email reminders and status notifications",
    description:
      "Send reminder emails when a record has been pending past a threshold. Notify stakeholders when status changes. Trigger alerts for overdue tasks or approvals.",
  },
  {
    icon: CheckCircle2,
    title: "Record status transitions",
    description:
      "Move records from draft to pending approval to approved to closed based on field changes or manual actions. Lock fields once a record reaches a certain status.",
  },
];

const SUITESCRIPT_USES = [
  {
    icon: Code2,
    title: "User Event scripts (before/after record save)",
    description:
      "Run JavaScript logic before or after a record is saved. Common uses: validate that a required field combination is met, copy field values to related records, calculate and write a derived field based on other field values.",
  },
  {
    icon: Code2,
    title: "Client Scripts (in-browser validation)",
    description:
      "Run in the user&apos;s browser as they fill out a form. Common uses: populate fields based on lookups, validate field values before submit, and show or hide fields based on other selections.",
  },
  {
    icon: Code2,
    title: "Scheduled and Map-Reduce scripts (batch processing)",
    description:
      "Process large record sets on a schedule. Common uses: update all open POs at month end, sync data to an external system nightly, and calculate running totals across transactions.",
  },
  {
    icon: Code2,
    title: "Suitelets and Restlets (custom pages and APIs)",
    description:
      "Suitelets build custom pages inside NetSuite. Restlets expose NetSuite data or logic as REST endpoints for external systems to call. Neither is possible with SuiteFlow alone.",
  },
];

const FAQ = [
  {
    question: "When should I use SuiteFlow instead of SuiteScript?",
    answer:
      "Use SuiteFlow when the requirement is approval routing, email notification, status transition, or simple field updates based on a condition. SuiteFlow is no-code, lower risk on upgrades, and maintainable by an administrator without developer skills. If the requirement only moves a record through an approval chain or sends emails at certain stages, SuiteFlow is the right tool.",
  },
  {
    question: "Can SuiteFlow update a field on a different record?",
    answer:
      "No. SuiteFlow can update fields on the record the workflow is attached to, but it cannot read from or write to a different record type. If the requirement involves updating a related record, such as writing a value from an approved purchase order back to a vendor record or a project record, that requires SuiteScript.",
  },
  {
    question: "What happens if my SuiteScript breaks after a NetSuite release?",
    answer:
      "A broken User Event script can prevent users from saving a record if it fires on Before Submit. This is a production outage until the script is fixed. NetSuite releases updates twice a year, and any script should be tested in Sandbox before each release. SuitePacific includes release testing as part of ongoing support retainers.",
  },
  {
    question: "Can SuiteFlow call an external API?",
    answer:
      "No. SuiteFlow cannot make HTTP calls to external systems. If the requirement involves sending data to a third-party application, posting a webhook, or receiving data from an external API, that requires a SuiteScript Restlet or a scheduled script with HTTP calls.",
  },
  {
    question: "Is SuiteFlow or SuiteScript included in my NetSuite license?",
    answer:
      "SuiteFlow is available on all NetSuite editions. SuiteScript is part of SuiteCloud, which is included in all standard NetSuite subscriptions. There is no additional license cost for either; the cost is the developer time to build and maintain scripts.",
  },
  {
    question: "Do I need a developer to set up SuiteFlow?",
    answer:
      "No. SuiteFlow is a no-code workflow editor built into the NetSuite interface. An administrator can configure approval workflows, email notifications, and status transitions without writing any code. For more complex routing logic or multi-level approvals with conditional branches, familiarity with the workflow editor helps but developer skills are not required.",
  },
  {
    question: "What is the difference between a User Event script and a SuiteFlow workflow?",
    answer:
      "A User Event script is JavaScript that runs before or after a record is saved in NetSuite. A SuiteFlow workflow is a visual automation that triggers based on record events or field changes. The key difference is capability: a User Event script can read and write any record in the system, call external services, and perform complex logic. A SuiteFlow workflow is limited to the record it is attached to and routing-level logic. For approvals, SuiteFlow is simpler and lower-risk. For data logic, SuiteScript is required.",
  },
];

export const metadata: Metadata = {
  title: "SuiteFlow vs. SuiteScript: NetSuite Automation Guide",
  description:
    "SuiteFlow handles approval routing and notifications. SuiteScript handles logic and external APIs. This guide covers which tool your NetSuite account needs.",
  alternates: { canonical: "/netsuite-suiteflow-vs-suitescript" },
  openGraph: {
    title: "SuiteFlow vs. SuiteScript: NetSuite Automation Guide",
    description:
      "SuiteFlow handles approval routing and notifications. SuiteScript handles logic and external APIs. This guide covers which tool your NetSuite account needs.",
    url: `${SITE_URL}/netsuite-suiteflow-vs-suitescript`,
    type: "website",
    images: [{ url: `${SITE_URL}/og-default.png`, width: 1200, height: 630 }],
  },
};

export default function SuiteFlowVsSuiteScriptPage() {
  return (
    <main className="pt-32 pb-24 sm:pt-40 sm:pb-32">
      <BreadcrumbJsonLd
        items={[
          { name: "Home", url: SITE_URL },
          { name: "SuiteFlow vs. SuiteScript", url: `${SITE_URL}/netsuite-suiteflow-vs-suitescript` },
        ]}
      />
      <FaqJsonLd items={FAQ} />
      <ServiceJsonLd
        name="NetSuite SuiteFlow and SuiteScript Development"
        description="SuiteFlow workflow configuration and SuiteScript development for live NetSuite accounts: approval routing, automation, and custom business logic."
        url={`${SITE_URL}/netsuite-suiteflow-vs-suitescript`}
        serviceType="NetSuite Automation Development"
        offers={[
          { name: "Care", price: 799, description: "10 hrs/month: SuiteFlow configuration, SuiteScript development, release testing. Month-to-month after 3-month minimum." },
          { name: "Care Plus", price: 1499, description: "20 hrs/month: workflow builds, scripting, integrations, and ongoing administration. Month-to-month." },
          { name: "Care Pro", price: 2499, description: "35 hrs/month: full development support including SuiteFlow, SuiteScript, and custom integrations. Month-to-month." },
        ]}
      />
      <OrganizationJsonLd />

      <div className="mx-auto max-w-3xl px-6 lg:px-8">
        <SectionHeading
          as="h1"
          eyebrow="NetSuite Automation"
          title="SuiteFlow vs. SuiteScript: Which Does Your NetSuite Account Need?"
          subtitle="A practical guide for live NetSuite accounts choosing between workflow automation and scripting for approvals, business logic, and custom processes."
          align="left"
        />

        <div className="mt-6 rounded-2xl border border-brand-100 bg-white p-5 shadow-soft">
          <p className="text-sm text-brand-600 mb-3">Not sure whether your requirement needs SuiteFlow or SuiteScript? Describe what you&apos;re trying to automate.</p>
          <LeadFormLight />
        </div>
        <p className="mt-3 text-xs text-brand-400">NetSuite-Certified · Post-go-live specialist · Sandbox-first development · Month-to-month</p>
        <p className="mt-2 text-xs text-brand-300"><time dateTime="2026-10">Published October 2026</time></p>

        <div className="mt-6 rounded-2xl border border-brand-100 bg-brand-50/40 p-5">
          <p className="text-xs font-semibold uppercase tracking-wide text-accent mb-2">Quick answer</p>
          <p className="text-sm text-brand-700 leading-relaxed">
            SuiteFlow and SuiteScript are NetSuite&apos;s two built-in automation tools, and most live accounts need both.
            SuiteFlow is a no-code workflow engine that handles approval routing, email notifications, and status transitions.
            It requires no development skills to configure but cannot read data from other records, perform calculations, or call external systems.
            SuiteScript is NetSuite&apos;s JavaScript scripting platform, capable of everything SuiteFlow cannot reach: reading and updating
            related records, running calculations, calling external APIs, creating records programmatically, and processing batches of data.
            The practical division is: use SuiteFlow for the approval chain and notifications; use SuiteScript for any logic that requires
            reading another record, doing math, or touching an external system. Most production accounts have SuiteFlow workflows for
            purchase order and expense approvals, paired with SuiteScript User Event scripts that fire after approval to update related
            records or trigger downstream processes. If your requirement involves only routing and notification, SuiteFlow covers it.
            If it involves data logic, you need SuiteScript.
          </p>
        </div>

        {/* Comparison table */}
        <div className="mt-14">
          <h2 className="text-lg font-semibold text-brand-900 mb-2">SuiteFlow vs. SuiteScript: feature comparison</h2>
          <p className="text-sm text-brand-400 mb-5">
            The table below shows what each tool can and cannot do. Most live accounts use both in combination rather than one or the other.
          </p>
          <div className="overflow-x-auto rounded-2xl border border-brand-100">
            <table className="w-full text-sm min-w-[520px]">
              <thead>
                <tr className="border-b border-brand-100 bg-brand-50/50">
                  <th className="text-left p-4 font-semibold text-brand-900">Feature</th>
                  <th className="text-left p-4 font-semibold text-brand-900">SuiteFlow</th>
                  <th className="text-left p-4 font-semibold text-brand-900">SuiteScript</th>
                </tr>
              </thead>
              <tbody>
                {COMPARISON_ROWS.map((row, i) => (
                  <tr key={row.feature} className={i < COMPARISON_ROWS.length - 1 ? "border-b border-brand-100" : ""}>
                    <td className="p-4 font-medium text-brand-700 align-top">{row.feature}</td>
                    <td className="p-4 text-brand-400 align-top text-[13px]">{row.suiteflow}</td>
                    <td className="p-4 text-brand-400 align-top text-[13px]">{row.suitescript}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* When to use SuiteFlow */}
        <div className="mt-14">
          <h2 className="text-lg font-semibold text-brand-900 mb-2">When is SuiteFlow the right choice?</h2>
          <p className="text-sm text-brand-400 mb-6">
            SuiteFlow is the right tool when the requirement is routing, notification, or status management. It is no-code,
            lower risk on NetSuite upgrades, and can be maintained by an administrator without developer skills.
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            {SUITEFLOW_USES.map((item) => (
              <Card key={item.title} className="p-5 flex items-start gap-4">
                <IconBadge icon={item.icon} />
                <div>
                  <h3 className="font-semibold text-brand-900 text-sm">{item.title}</h3>
                  <p className="mt-1.5 text-sm text-brand-400">{item.description}</p>
                </div>
              </Card>
            ))}
          </div>
          <div className="mt-5 rounded-2xl border border-brand-100 bg-brand-50/30 p-5">
            <p className="text-sm font-semibold text-brand-900 mb-2">What SuiteFlow cannot do</p>
            <ul className="space-y-1.5 text-sm text-brand-400">
              <li className="flex items-start gap-2"><XCircle className="w-4 h-4 text-red-400 mt-0.5 shrink-0" /> Read data from a different record type</li>
              <li className="flex items-start gap-2"><XCircle className="w-4 h-4 text-red-400 mt-0.5 shrink-0" /> Update fields on a related record</li>
              <li className="flex items-start gap-2"><XCircle className="w-4 h-4 text-red-400 mt-0.5 shrink-0" /> Perform calculations (math operations on field values)</li>
              <li className="flex items-start gap-2"><XCircle className="w-4 h-4 text-red-400 mt-0.5 shrink-0" /> Call an external API or send data to a third-party system</li>
              <li className="flex items-start gap-2"><XCircle className="w-4 h-4 text-red-400 mt-0.5 shrink-0" /> Create related records programmatically</li>
              <li className="flex items-start gap-2"><XCircle className="w-4 h-4 text-red-400 mt-0.5 shrink-0" /> Process large batches of existing records</li>
            </ul>
          </div>
        </div>

        {/* When to use SuiteScript */}
        <div className="mt-14">
          <h2 className="text-lg font-semibold text-brand-900 mb-2">When does a requirement need SuiteScript instead?</h2>
          <p className="text-sm text-brand-400 mb-6">
            SuiteScript is required when the logic goes beyond routing and notification. If the requirement involves data,
            math, related records, or external systems, SuiteScript is the only option.
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            {SUITESCRIPT_USES.map((item) => (
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

        {/* How they work together */}
        <div className="mt-14 rounded-2xl border border-brand-100 bg-brand-50/30 p-5 sm:p-6">
          <h2 className="text-base font-semibold text-brand-900 mb-3">How SuiteFlow and SuiteScript work together on most accounts</h2>
          <p className="text-sm text-brand-400 mb-3">
            Most production NetSuite accounts use SuiteFlow and SuiteScript in combination. A common pattern:
          </p>
          <ul className="space-y-2.5">
            <li className="text-sm text-brand-400">
              <span className="font-medium text-brand-700">SuiteFlow handles the approval chain:</span>{" "}
              The purchase order workflow routes to the manager for approval, then to finance for amounts above a threshold. Notifications fire at each stage.
            </li>
            <li className="text-sm text-brand-400">
              <span className="font-medium text-brand-700">SuiteScript runs after approval:</span>{" "}
              A User Event script fires after the PO is approved. It calculates the committed cost, writes it back to the project record, and updates the budget-to-actual dashboard.
            </li>
            <li className="text-sm text-brand-400">
              <span className="font-medium text-brand-700">SuiteScript handles the integration:</span>{" "}
              A Scheduled script runs nightly, pulling approved POs and posting them to the external procurement system via API.
            </li>
          </ul>
        </div>

        {/* Related reading */}
        <div className="mt-10 rounded-2xl border border-brand-100 bg-brand-50/30 p-5 sm:p-6">
          <p className="text-sm font-semibold text-brand-900 mb-3">Related reading</p>
          <ul className="space-y-2.5">
            <li className="text-sm text-brand-400">
              <Link href="/netsuite-suitescript-development" className="text-accent hover:underline">
                NetSuite SuiteScript development
              </Link>{" "}
              covers the full scope of what SuiteScript can do for live accounts.
            </li>
            <li className="text-sm text-brand-400">
              <Link href="/netsuite-workflow-automation" className="text-accent hover:underline">
                NetSuite workflow automation
              </Link>{" "}
              covers SuiteFlow builds for approval routing and notifications.
            </li>
            <li className="text-sm text-brand-400">
              <Link href="/netsuite-configuration-vs-customization" className="text-accent hover:underline">
                NetSuite configuration vs. customization
              </Link>{" "}
              covers the broader question of when a requirement needs a developer.
            </li>
          </ul>
        </div>

        <div className="mt-10 rounded-2xl border border-brand-100 bg-white p-5 shadow-soft">
          <p className="text-sm font-semibold text-brand-900 mb-1">Need SuiteFlow configuration or SuiteScript development for your NetSuite account?</p>
          <p className="text-sm text-brand-400 mb-4">
            Tell us what your account needs to automate. We will assess whether SuiteFlow, SuiteScript, or both are required and give you a realistic scope.
          </p>
          <LeadFormLight />
        </div>

        <ServiceFaqSection items={FAQ} />

        <div className="mt-10 rounded-2xl border border-brand-100 bg-white p-5 shadow-soft">
          <p className="text-sm font-semibold text-brand-900 mb-1">Ready to build automation in your NetSuite account?</p>
          <p className="text-sm text-brand-400 mb-4">
            Describe the process you need to automate. We will tell you whether it needs SuiteFlow, SuiteScript, or both, and what the build involves.
          </p>
          <LeadFormLight />
        </div>
      </div>
    </main>
  );
}

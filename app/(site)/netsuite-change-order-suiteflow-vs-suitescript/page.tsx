import type { Metadata } from "next";
import Link from "next/link";
import { Workflow, Code2, CheckCircle2, XCircle } from "lucide-react";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Card } from "@/components/ui/Card";
import { IconBadge } from "@/components/ui/IconBadge";
import { BreadcrumbJsonLd, FaqJsonLd, ServiceJsonLd, OrganizationJsonLd } from "@/components/seo/JsonLd";
import { ServiceFaqSection } from "@/components/ui/ServiceFaqSection";
import { LeadFormLight } from "@/components/sections/LeadFormLight";
import { SITE_URL } from "@/lib/content";

const COMPARISON_ROWS = [
  { task: "Approval routing by role", suiteflow: "Yes", suitescript: "No" },
  { task: "Email notifications to approvers", suiteflow: "Yes", suitescript: "No" },
  { task: "Status field update (Pending/Approved/Rejected)", suiteflow: "Yes", suitescript: "No" },
  { task: "Lock record during approval", suiteflow: "Yes", suitescript: "No" },
  { task: "Rejection notification to PM", suiteflow: "Yes", suitescript: "No" },
  { task: "Update project budget on approval", suiteflow: "No", suitescript: "Yes" },
  { task: "Update contract value on project", suiteflow: "No", suitescript: "Yes" },
  { task: "Create billing schedule entry", suiteflow: "No", suitescript: "Yes" },
  { task: "Update schedule of values", suiteflow: "No", suitescript: "Yes" },
  { task: "Calculation from project data", suiteflow: "No", suitescript: "Yes" },
  { task: "Timestamp and audit log", suiteflow: "Partial", suitescript: "Yes (via script)" },
];

const SUITEFLOW_CAN = [
  {
    icon: Workflow,
    title: "Approval chain routing",
    description:
      "SuiteFlow routes a change order record through a defined approval chain: project manager, finance review, executive approval above a threshold amount. Each step is a workflow state with its own approver assignment.",
  },
  {
    icon: CheckCircle2,
    title: "Email notifications",
    description:
      "SuiteFlow sends email notifications to each approver when the change order enters their approval step. It also notifies the project manager on rejection and the submitter when the change order is fully approved.",
  },
  {
    icon: CheckCircle2,
    title: "Status field management",
    description:
      "SuiteFlow updates the status field on the change order record at each step: Draft, Pending PM Approval, Pending Finance Approval, Approved, Rejected. This status drives what the record displays and who can edit it.",
  },
  {
    icon: CheckCircle2,
    title: "Record locking during approval",
    description:
      "SuiteFlow can lock the change order record while it is in the approval process, preventing edits to amounts or scope descriptions while approvals are pending.",
  },
];

const SUITESCRIPT_MUST = [
  {
    icon: Code2,
    title: "Budget update on approval",
    description:
      "When the change order status reaches Approved, a User Event script fires, reads the approved line items and amounts, and updates the corresponding budget lines on the project record. SuiteFlow cannot do this because it cannot read other records and perform calculations.",
  },
  {
    icon: Code2,
    title: "Contract value update",
    description:
      "The contract value field on the project record must reflect the original contract plus all approved change orders. The script adds the approved change order amount to the running contract value on the project after approval.",
  },
  {
    icon: Code2,
    title: "Billing and schedule of values update",
    description:
      "If the account uses a schedule of values or billing schedule, the script adds the new scope line to the schedule after approval. This connects the change order to the billing process so the new scope can be billed in the next application.",
  },
  {
    icon: Code2,
    title: "Audit log and timestamp",
    description:
      "The script writes an approval timestamp, approver name, and approved amounts to a journal or custom log record on the project. This creates an auditable record of each change order approval separate from the workflow history.",
  },
];

const FAQ = [
  {
    question: "What is the difference between SuiteFlow and SuiteScript for change order automation in NetSuite?",
    answer:
      "SuiteFlow is NetSuite&apos;s visual workflow tool. It handles routing, approvals, email notifications, and status field updates without code. SuiteScript is JavaScript-based development that runs on record events or scheduled tasks. For change orders, SuiteFlow handles the approval chain and notifications; SuiteScript handles every data update that must happen after approval, including updating project budgets, contract values, and billing schedules. You need both for a complete change order automation.",
  },
  {
    question: "Can SuiteFlow update the project budget when a change order is approved?",
    answer:
      "No. SuiteFlow can set a field value to a specific value you define in the workflow, but it cannot read data from other records and perform calculations. Updating the project budget requires reading the change order line items, calculating the new budget amounts, and writing those values back to the budget record. That is a SuiteScript operation, not a workflow operation.",
  },
  {
    question: "What triggers the SuiteScript after SuiteFlow approves a change order?",
    answer:
      "The SuiteScript is a User Event script that fires on the After Submit event of the change order record. The script checks whether the status field has changed to Approved. If it has, it performs the data updates: project budget, contract value, billing entries, and audit log. The workflow approval triggers the status change; the status change triggers the script.",
  },
  {
    question: "How long does it take to build change order automation in NetSuite?",
    answer:
      "A typical change order automation build covering SuiteFlow approval routing, SuiteScript budget update, and contract value update runs one to three weeks depending on the complexity of the approval chain and how the account structures budgets and billing. If a schedule of values or AIA billing integration is also in scope, the timeline extends. SuitePacific builds and validates all automation in sandbox before deploying to production.",
  },
  {
    question: "Does NetSuite have native change order management for construction?",
    answer:
      "NetSuite has basic change request functionality within the Project Management module, but it does not include a complete change order approval workflow with automatic budget updates. Construction companies that need formal change order management with multi-step approvals, automatic budget updates, and billing integration need a custom build using SuiteFlow for the approval chain and SuiteScript for the data updates.",
  },
  {
    question: "What is the minimum SuiteFlow approval chain for construction change orders?",
    answer:
      "The minimum for most construction companies is a two-step chain: project manager approval followed by finance or executive approval above a dollar threshold. Below the threshold, only the project manager approves. SuiteFlow supports amount-based branching conditions so high-value change orders automatically route to an additional approver without manual intervention.",
  },
];

export const metadata: Metadata = {
  title: "NetSuite Change Order Automation: SuiteFlow vs. SuiteScript",
  description:
    "SuiteFlow handles approval routing for change orders. SuiteScript handles budget and contract updates after approval. Both are needed for full automation.",
  alternates: { canonical: "/netsuite-change-order-suiteflow-vs-suitescript" },
  openGraph: {
    title: "NetSuite Change Order Automation: SuiteFlow vs. SuiteScript",
    description:
      "Change order automation in NetSuite requires both SuiteFlow for approval routing and SuiteScript for budget updates. This page explains which tool handles which part.",
    url: `${SITE_URL}/netsuite-change-order-suiteflow-vs-suitescript`,
    type: "website",
    images: [{ url: `${SITE_URL}/og-default.png`, width: 1200, height: 630 }],
  },
};

export default function ChangeOrderAutomationPage() {
  return (
    <main className="pt-32 pb-24 sm:pt-40 sm:pb-32">
      <BreadcrumbJsonLd
        items={[
          { name: "Home", url: SITE_URL },
          { name: "NetSuite Change Orders: SuiteFlow vs. SuiteScript", url: `${SITE_URL}/netsuite-change-order-suiteflow-vs-suitescript` },
        ]}
      />
      <FaqJsonLd items={FAQ} />
      <ServiceJsonLd
        name="NetSuite Change Order Automation: SuiteFlow and SuiteScript"
        description="Change order approval workflows and automatic budget updates for construction companies on NetSuite. SuiteFlow approval chains with SuiteScript budget update, contract value, and billing integration."
        url={`${SITE_URL}/netsuite-change-order-suiteflow-vs-suitescript`}
        serviceType="NetSuite Construction Automation"
        offers={[
          { name: "Care", price: 799, description: "10 hours/month NetSuite technical support and development. Month-to-month after 3-month minimum." },
          { name: "Care Plus", price: 1499, description: "20 hours/month for active development and ongoing support. Month-to-month." },
          { name: "Care Pro", price: 2499, description: "35 hours/month full NetSuite management. Month-to-month." },
        ]}
      />
      <OrganizationJsonLd />

      <div className="mx-auto max-w-3xl px-6 lg:px-8">
        <SectionHeading
          as="h1"
          eyebrow="Construction Automation"
          title="NetSuite Change Order Automation: SuiteFlow or SuiteScript?"
          subtitle="Understanding which NetSuite automation tool handles which part of change order processing for construction companies."
          align="left"
        />

        <div className="mt-6 rounded-2xl border border-brand-100 bg-white p-5 shadow-soft">
          <p className="text-sm text-brand-600 mb-3">Construction company trying to automate change orders in NetSuite? Tell us what your approval and budget update process needs to do.</p>
          <LeadFormLight />
        </div>
        <p className="mt-3 text-xs text-brand-400">NetSuite-Certified &middot; Post-go-live specialist &middot; Sandbox-first development &middot; Month-to-month</p>
        <p className="mt-3 text-xs text-brand-300"><time dateTime="2026-10">Published October 2026</time></p>

        <div className="mt-6 rounded-2xl border border-brand-100 bg-brand-50/40 p-5">
          <p className="text-xs font-semibold uppercase tracking-wide text-accent mb-2">Quick answer</p>
          <p className="text-sm text-brand-700 leading-relaxed">
            Change order automation in NetSuite requires both SuiteFlow and SuiteScript working together.
            SuiteFlow refers to NetSuite&apos;s visual workflow tool. It handles approval routing: routing
            a change order through project manager, finance, and executive approvals based on amount
            thresholds, sending email notifications, updating the status field, and locking the record
            during review. SuiteScript refers to NetSuite&apos;s JavaScript development platform. It handles
            every data update that must happen after approval: updating the project budget with the
            approved change order amount, updating the contract value on the project record, creating
            billing schedule entries for new scope, and writing an audit log. SuiteFlow cannot perform
            calculations or read other records; it can only set field values to values you define
            in the workflow. SuiteScript fires on the After Submit event when the status changes to
            Approved and performs all the data updates. You need both tools for a complete change
            order automation.
          </p>
        </div>

        {/* What SuiteFlow does */}
        <div className="mt-14">
          <h2 className="text-lg font-semibold text-brand-900 mb-2">What can SuiteFlow do for change order processing?</h2>
          <p className="text-sm text-brand-400 mb-6">
            SuiteFlow is the right tool for anything that involves routing, notifications, and status transitions. It requires no code and can be maintained by a NetSuite administrator.
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            {SUITEFLOW_CAN.map((item) => (
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

        {/* What SuiteScript must do */}
        <div className="mt-14">
          <h2 className="text-lg font-semibold text-brand-900 mb-2">What does SuiteScript handle after approval?</h2>
          <p className="text-sm text-brand-400 mb-6">
            Every data update triggered by an approved change order requires SuiteScript. SuiteFlow cannot read records, perform calculations, or write to multiple records. These tasks require a User Event script.
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            {SUITESCRIPT_MUST.map((item) => (
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

        {/* Comparison table */}
        <div className="mt-14">
          <h2 className="text-lg font-semibold text-brand-900 mb-2">SuiteFlow vs. SuiteScript: which handles what?</h2>
          <div className="overflow-x-auto rounded-2xl border border-brand-100">
            <table className="w-full text-sm min-w-[440px]">
              <thead>
                <tr className="border-b border-brand-100 bg-brand-50/50">
                  <th className="text-left p-4 font-semibold text-brand-900">Task</th>
                  <th className="text-left p-4 font-semibold text-brand-900">SuiteFlow</th>
                  <th className="text-left p-4 font-semibold text-brand-900">SuiteScript</th>
                </tr>
              </thead>
              <tbody>
                {COMPARISON_ROWS.map((row, i) => (
                  <tr key={row.task} className={i < COMPARISON_ROWS.length - 1 ? "border-b border-brand-100" : ""}>
                    <td className="p-4 font-medium text-brand-700 align-top">{row.task}</td>
                    <td className="p-4 align-top text-[13px]">
                      <span className={row.suiteflow === "Yes" ? "text-green-600 font-medium" : row.suiteflow === "No" ? "text-red-500" : "text-brand-400"}>
                        {row.suiteflow}
                      </span>
                    </td>
                    <td className="p-4 align-top text-[13px]">
                      <span className={row.suitescript === "Yes" ? "text-green-600 font-medium" : row.suitescript === "No" ? "text-red-500" : "text-brand-400"}>
                        {row.suitescript}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* How they work together */}
        <div className="mt-14 rounded-2xl border border-brand-100 bg-brand-50/30 p-5 sm:p-6">
          <h2 className="text-base font-semibold text-brand-900 mb-3">How do SuiteFlow and SuiteScript work together for change orders?</h2>
          <p className="text-sm text-brand-400 mb-3">
            The two tools form a handoff: SuiteFlow manages the human approval process; SuiteScript fires automatically when that process completes.
          </p>
          <ol className="space-y-2.5 list-decimal list-inside">
            <li className="text-sm text-brand-400">Project manager submits the change order. SuiteFlow moves the record to Pending PM Approval and sends a notification.</li>
            <li className="text-sm text-brand-400">Project manager approves. If the amount exceeds the threshold, SuiteFlow routes to finance for a second approval.</li>
            <li className="text-sm text-brand-400">Final approver approves. SuiteFlow sets the status to Approved.</li>
            <li className="text-sm text-brand-400">The SuiteScript User Event fires on After Submit, detects the status change to Approved, and performs the data updates: budget, contract value, billing entries, audit log.</li>
            <li className="text-sm text-brand-400">Project manager and finance team see the updated project record with the new budget and contract value immediately.</li>
          </ol>
        </div>

        {/* Related reading */}
        <div className="mt-10 rounded-2xl border border-brand-100 bg-brand-50/30 p-5 sm:p-6">
          <p className="text-sm font-semibold text-brand-900 mb-3">Related reading</p>
          <ul className="space-y-2.5">
            <li className="text-sm text-brand-400">
              <Link href="/netsuite-wip-report" className="text-accent hover:underline">
                NetSuite WIP report for construction
              </Link>{" "}
              covers how change orders feed into WIP calculations when budgets update correctly.
            </li>
            <li className="text-sm text-brand-400">
              <Link href="/netsuite-suitescript-development" className="text-accent hover:underline">
                NetSuite SuiteScript development
              </Link>{" "}
              covers the User Event and Scheduled scripts used in change order automation.
            </li>
            <li className="text-sm text-brand-400">
              <Link href="/industries/construction" className="text-accent hover:underline">
                NetSuite support for construction companies
              </Link>{" "}
              covers the full construction practice including workflow and automation builds.
            </li>
          </ul>
        </div>

        <ServiceFaqSection items={FAQ} />

        <div className="mt-10 rounded-2xl border border-brand-100 bg-white p-5 shadow-soft">
          <p className="text-sm font-semibold text-brand-900 mb-1">Need change order automation built in NetSuite?</p>
          <p className="text-sm text-brand-400 mb-4">
            Tell us how change orders currently flow through your approval process and what fields need to update on approval. We will scope the SuiteFlow and SuiteScript build and give you a realistic timeline.
          </p>
          <LeadFormLight />
        </div>
      </div>
    </main>
  );
}

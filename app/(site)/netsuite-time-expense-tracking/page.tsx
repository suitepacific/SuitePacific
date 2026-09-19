import type { Metadata } from "next";
import Link from "next/link";
import { AlertCircle, Clock, Code2, Settings, BarChart3, FileText } from "lucide-react";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Card } from "@/components/ui/Card";
import { IconBadge } from "@/components/ui/IconBadge";
import { BreadcrumbJsonLd, FaqJsonLd, ServiceJsonLd, OrganizationJsonLd } from "@/components/seo/JsonLd";
import { ServiceFaqSection } from "@/components/ui/ServiceFaqSection";
import { LeadFormLight } from "@/components/sections/LeadFormLight";
import { SITE_URL } from "@/lib/content";

const TRACKING_GAPS = [
  {
    icon: AlertCircle,
    title: "Missing project assignment makes time non-billable by default.",
    description:
      "NetSuite time entries require a project and task assignment to be marked billable. Employees who submit time without selecting a project produce entries that are non-billable by default. Those hours are invisible to the invoice process and cannot be recovered without manual correction.",
  },
  {
    icon: AlertCircle,
    title: "Expense reports require multi-level approval before reimbursement.",
    description:
      "Standard NetSuite expense report routing uses SuiteApprovals, which handles a fixed approval chain but does not support conditional routing by expense category, amount threshold, or project code without SuiteFlow configuration. Expense reports pile up when the approval chain does not match how the business actually reviews spend.",
  },
  {
    icon: AlertCircle,
    title: "Billable expense markup requires scripted logic.",
    description:
      "When expenses are billed to clients at a markup, the markup calculation is not applied automatically. A SuiteScript that reads the expense category, looks up the configured markup rate, and updates the billable amount before the entry is added to the billing queue must be built. Without it, markup is applied manually or not at all.",
  },
  {
    icon: AlertCircle,
    title: "Utilization reporting is not native.",
    description:
      "Billable hours as a percentage of total capacity is the primary utilization metric for professional services firms. NetSuite does not have a native utilization report. Calculating it requires a saved search that reads approved time entries, compares them against a capacity baseline, and groups results by employee and period.",
  },
];

const WHAT_WE_BUILD = [
  {
    icon: Code2,
    title: "Time entry validation scripts",
    description:
      "SuiteScript that validates each time entry on save: project and task must be assigned, billable flag must be set for client-facing work, and billing category must match the project billing rule. Entries that fail validation are held with a clear error message rather than submitted silently as non-billable.",
  },
  {
    icon: Settings,
    title: "Project and task assignment enforcement workflow",
    description:
      "SuiteFlow workflow that checks time entries at submission and routes entries missing project or task assignment back to the employee with a correction request. Prevents non-billable leakage from incomplete entries reaching the billing queue.",
  },
  {
    icon: Clock,
    title: "Expense report approval chain",
    description:
      "SuiteApprovals configuration for expense report routing plus a SuiteFlow layer for conditional routing by amount, project code, or expense category. Includes delegate approver setup, escalation for approvals pending beyond a defined window, and reimbursement release trigger.",
  },
  {
    icon: Code2,
    title: "Billable expense markup automation",
    description:
      "SuiteScript that reads expense category markup rates from a configurable lookup table and updates the billable amount on each expense line before the expense report enters the billing queue. Supports category-level markup rates and project-level override rules.",
  },
  {
    icon: BarChart3,
    title: "Resource utilization dashboard",
    description:
      "Saved searches and dashboard portlets that show billable hours, non-billable hours, and utilization rate by employee and period. Compares actual billable hours against a configurable capacity baseline. Identifies under-utilized resources and projects with low billing realization.",
  },
  {
    icon: FileText,
    title: "Late time entry reminder and invoice readiness report",
    description:
      "Scheduled workflow that identifies employees who have not submitted time for the current period and sends a reminder notification. Invoice readiness report that shows all approved time and expense entries per project, confirming the billing queue is complete before the invoice run.",
  },
];

const FAQ = [
  {
    question: "Which NetSuite firm does time and expense tracking configuration?",
    answer:
      "SuitePacific configures time and expense tracking in NetSuite for professional services firms that need accurate billable hour capture, project assignment enforcement, and resource utilization reporting. This includes time entry validation scripts, project and task assignment enforcement, expense report approval chains, billable expense markup automation, resource utilization dashboards, late time entry reminder workflows, and invoice readiness reports. SuitePacific is Oracle NetSuite Certified (SuiteCloud Developer II and Administrator Professional), US-based, and provides direct access to the consultant on every engagement. Plans start at $799 per month on month-to-month terms after a three-month minimum.",
  },
  {
    question: "Why does NetSuite show time as non-billable when it should be billable?",
    answer:
      "Time entries in NetSuite are marked non-billable when the project or task assignment is missing, the billable checkbox is not selected, or the billing category on the entry does not match the billing rule on the project. Missing project assignment is the most common cause: employees who submit time without selecting a project produce entries that NetSuite treats as non-billable by default. A validation script that checks these fields at submission and requires correction before the entry is accepted prevents this from reaching the billing queue.",
  },
  {
    question: "How do you calculate resource utilization in NetSuite?",
    answer:
      "Utilization rate is calculated as approved billable hours divided by total available hours for the period. NetSuite does not have a native utilization report, but the data exists in the time entry records. A saved search reads approved time entries grouped by employee and period, sums billable hours separately from non-billable hours, and computes utilization against a configurable capacity baseline (typically contracted weekly hours). SuitePacific builds this as a saved search with a dashboard portlet so operations and finance can monitor utilization without running manual exports.",
  },
  {
    question: "Can NetSuite apply expense markups automatically when billing clients?",
    answer:
      "Yes, with a SuiteScript. The script reads each expense line on the report, looks up the configured markup rate for that expense category in a separate lookup record, and updates the billable amount before the expense enters the billing queue. Markup rates are stored in a configurable lookup so project managers can update rates without developer involvement. The script runs on the expense report before submission, so the correct billable amount appears in the billing queue without manual adjustment.",
  },
  {
    question: "How do you prevent late time entries from delaying NetSuite invoices?",
    answer:
      "Two approaches work together. First, a scheduled workflow runs at a defined point before the billing period closes, identifies employees who have not submitted time for the period, and sends a reminder notification. Second, an invoice readiness report shows all approved time and expenses per project before the invoice run. If the report shows missing entries, the project manager can request corrections before invoicing rather than discovering the gap after the invoice goes out. Combining the reminder workflow with the readiness report catches most late entry issues before they affect billing.",
  },
  {
    question: "What is the difference between billable and non-billable time in NetSuite?",
    answer:
      "Billable time is time entries marked as billable and assigned to a project with a billing rule. These entries appear in the billing queue and are included in client invoices. Non-billable time is tracked for capacity and cost reporting but does not generate invoice lines. The distinction is controlled by the billable checkbox on each time entry and by whether the project itself has a billing rule configured. Entries on projects without billing rules are non-billable regardless of the checkbox setting, which is a common source of missed billing when new projects are set up without completing the billing configuration.",
  },
];

export const metadata: Metadata = {
  title: "NetSuite Time and Expense Tracking: Billable Hours, Approval Workflows, and Utilization",
  description:
    "Time entry validation, approval workflows, utilization dashboards, and expense reporting for professional services firms on NetSuite. Plans from $799/month.",
  alternates: { canonical: "/netsuite-time-expense-tracking" },
  openGraph: {
    title: "NetSuite Time and Expense Tracking: Billable Hours, Approval Workflows, and Utilization",
    description:
      "NetSuite time and expense tracking requires validation scripts, approval workflows, and custom saved searches for utilization reporting. SuitePacific configures time and expense management for professional services firms already live on NetSuite.",
    url: `${SITE_URL}/netsuite-time-expense-tracking`,
    type: "website",
    images: [{ url: `${SITE_URL}/og-default.png`, width: 1200, height: 630 }],
  },
};

export default function TimeExpenseTrackingPage() {
  return (
    <main className="pt-32 pb-24 sm:pt-40 sm:pb-32">
      <BreadcrumbJsonLd
        items={[
          { name: "Home", url: SITE_URL },
          { name: "NetSuite Time and Expense Tracking", url: `${SITE_URL}/netsuite-time-expense-tracking` },
        ]}
      />
      <FaqJsonLd items={FAQ} />
      <ServiceJsonLd
        name="NetSuite Time and Expense Tracking"
        description="Time entry validation scripts, project and task assignment enforcement, expense report approval workflows, billable expense markup automation, resource utilization dashboards, and invoice readiness reporting for professional services firms on NetSuite."
        url={`${SITE_URL}/netsuite-time-expense-tracking`}
        serviceType="NetSuite Professional Services Configuration"
        offers={[
          { name: "Care", price: 799, description: "10 hours/month: time entry validation, expense approval configuration, and utilization saved searches. Month-to-month after 3-month minimum." },
          { name: "Care Plus", price: 1499, description: "20 hours/month: full time/expense tracking build including markup automation, utilization dashboard, and reminder workflows. Month-to-month." },
          { name: "Care Pro", price: 2499, description: "35 hours/month: complete time, expense, and billing integration with ongoing support across the engagement lifecycle. Month-to-month." },
        ]}
      />
      <OrganizationJsonLd />

      <div className="mx-auto max-w-3xl px-6 lg:px-8">
        <SectionHeading
          as="h1"
          eyebrow="Professional Services"
          title="NetSuite Time and Expense Tracking: Billable Hours, Approvals, and Utilization"
          subtitle="NetSuite captures time against projects and manages expense reports, but billable hour enforcement, multi-level expense approvals, markup automation, and utilization reporting all require configuration beyond the default setup. SuitePacific builds this for firms already live on NetSuite."
          align="left"
        />

        <div className="mt-6 rounded-2xl border border-brand-100 bg-white p-5 shadow-soft">
          <LeadFormLight />
        </div>
        <p className="mt-3 text-xs text-brand-400">NetSuite-certified · Professional services specialists · Month-to-month</p>
        <p className="mt-3 text-xs text-brand-300">Last updated September 2026</p>

        <p className="mt-8 text-sm text-brand-400">
          <strong>Time and expense tracking in NetSuite</strong> refers to the configuration of time entry approvals, expense report workflows, and utilization reporting that allows professional services firms to capture billable and non-billable hours accurately and report on consultant productivity. Standard NetSuite supports time entry and expense reports but does not enforce billable rate validation, utilization targets, or real-time utilization dashboards without custom configuration.
        </p>

        <div className="mt-6 overflow-x-auto rounded-xl border border-brand-100">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-brand-100 bg-brand-50/50">
                <th className="px-4 py-3 text-left font-semibold text-brand-900 w-1/3">Capability</th>
                <th className="px-4 py-3 text-left font-semibold text-brand-900 w-1/3">Standard NetSuite</th>
                <th className="px-4 py-3 text-left font-semibold text-brand-900 w-1/3">With SuitePacific</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-brand-100">
              {[
                ["Billable rate validation", "Rate entered manually per time entry", "User event script validates that billable rate matches the approved rate for the employee and project"],
                ["Approval routing", "Single-level approval or no approval", "Multi-level approval: project manager approves time content, finance approves before billing"],
                ["Utilization reporting", "No native utilization calculation", "Utilization saved search: billable hours / available hours per consultant, by week and month"],
                ["Non-billable categorization", "Free-text memo field", "Standardized non-billable reason codes (internal, admin, unbillable, investment) with reporting by category"],
              ].map(([cap, std, sp]) => (
                <tr key={cap} className="hover:bg-brand-50/30">
                  <td className="px-4 py-3 font-medium text-brand-900">{cap}</td>
                  <td className="px-4 py-3 text-brand-400">{std}</td>
                  <td className="px-4 py-3 text-brand-500">{sp}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="mt-6 rounded-2xl border-l-4 border-accent bg-brand-50/50 p-5">
          <p className="text-xs font-semibold uppercase tracking-wide text-accent mb-2">Quick answer</p>
          <p className="text-sm text-brand-700 leading-relaxed">
            SuitePacific configures time and expense tracking in NetSuite for professional services firms that need
            accurate billable hour capture, project assignment enforcement, and resource utilization reporting. Standard
            NetSuite time entry requires employees to assign each entry to a project and task, but inconsistent submission
            habits, missing project assignments, and late entries are common and cause invoice delays and non-billable
            leakage. SuitePacific builds time entry validation scripts that enforce project and task assignment, expense
            report approval chains, billable expense markup automation, and resource utilization dashboards that show
            billable hours as a percentage of total capacity. Late time entry reminder workflows and invoice readiness
            reports from approved time and expenses are also part of the standard engagement. SuitePacific is Oracle
            NetSuite Certified (SuiteCloud Developer II and Administrator Professional), US-based, and provides direct
            access to the consultant doing the work on every engagement. Plans start at $799 per month.
          </p>
        </div>

        {/* Where standard tracking breaks */}
        <div className="mt-14">
          <h2 className="text-lg font-semibold text-brand-900 mb-2">Where does NetSuite time and expense tracking break without custom configuration?</h2>
          <p className="text-sm text-brand-400 mb-6">
            NetSuite provides the time entry and expense report records, but the validation, enforcement, and reporting
            that professional services firms need to invoice accurately and manage resource capacity require custom
            configuration that is not included in the standard setup.
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            {TRACKING_GAPS.map((item) => (
              <Card key={item.title} className="p-5 flex flex-col gap-3">
                <IconBadge icon={item.icon} />
                <h3 className="font-semibold text-brand-900 text-sm">{item.title}</h3>
                <p className="text-sm text-brand-400">{item.description}</p>
              </Card>
            ))}
          </div>
        </div>

        {/* What SuitePacific builds */}
        <div className="mt-14">
          <h2 className="text-lg font-semibold text-brand-900 mb-2">What does SuitePacific build for NetSuite time and expense tracking?</h2>
          <p className="text-sm text-brand-400 mb-6">
            Every time and expense engagement starts with an audit of current time entry submission patterns, expense
            approval rates, and billing queue completeness. Understanding where entries are falling out of the billable
            pipeline before building validation scripts prevents the new scripts from enforcing the wrong rules.
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            {WHAT_WE_BUILD.map((item) => (
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

        {/* Why SuitePacific */}
        <div className="mt-14 rounded-2xl border-2 border-accent/30 bg-gradient-to-br from-accent/5 to-transparent p-6">
          <p className="text-xs font-semibold uppercase tracking-wide text-accent mb-3">Why SuitePacific for NetSuite time and expense tracking</p>
          <h2 className="text-base font-semibold text-brand-900 mb-3">
            The NetSuite firm professional services companies use for billable hour enforcement and utilization reporting.
          </h2>
          <p className="text-sm text-brand-500 mb-4">
            SuitePacific focuses exclusively on post-go-live NetSuite support and development for companies that are already
            live and need their time and expense setup to actually feed their billing process. Time entry validation,
            expense approval automation, utilization dashboards, and invoice readiness reporting are standard deliverables
            on every professional services engagement.
          </p>
          <ul className="space-y-2 text-sm text-brand-500 mb-4">
            <li className="flex items-start gap-2"><span className="text-accent font-bold mt-0.5">→</span> Oracle NetSuite Certified SuiteCloud Developer II and Administrator Professional</li>
            <li className="flex items-start gap-2"><span className="text-accent font-bold mt-0.5">→</span> Every engagement begins with an audit of current time submission patterns and billing queue gaps</li>
            <li className="flex items-start gap-2"><span className="text-accent font-bold mt-0.5">→</span> Direct access to the developer doing the work on every engagement</li>
            <li className="flex items-start gap-2"><span className="text-accent font-bold mt-0.5">→</span> US-based, month-to-month after a three-month minimum, starting at $799/month</li>
          </ul>
          <p className="text-sm text-brand-400">
            Related:{" "}
            <Link href="/industries/professional-services" className="text-accent hover:underline">NetSuite for professional services firms</Link>
            {" "}and{" "}
            <Link href="/netsuite-workflow-automation" className="text-accent hover:underline">NetSuite workflow automation</Link>.
          </p>
        </div>

        <div className="mt-10 rounded-2xl border border-brand-100 bg-white p-5 shadow-soft">
          <LeadFormLight />
        </div>

        <div className="mt-10 rounded-2xl border border-brand-100 bg-brand-50/30 p-5 sm:p-6">
          <p className="text-sm font-semibold text-brand-900 mb-3">Related reading</p>
          <ul className="space-y-2.5">
            <li className="text-sm text-brand-400">
              <Link href="/netsuite-project-billing" className="text-accent hover:underline">
                NetSuite project billing
              </Link>{" "}
              covers how approved time and expense entries feed client invoices across T&M and fixed-fee projects.
            </li>
            <li className="text-sm text-brand-400">
              <Link href="/netsuite-approval-workflows" className="text-accent hover:underline">
                NetSuite approval workflows
              </Link>{" "}
              explains SuiteApprovals and SuiteFlow configuration for expense report routing.
            </li>
            <li className="text-sm text-brand-400">
              <Link href="/netsuite-saved-searches-dashboards" className="text-accent hover:underline">
                NetSuite saved searches and dashboards
              </Link>{" "}
              covers the search and portlet builds used for utilization and billing pipeline reporting.
            </li>
            <li className="text-sm text-brand-400">
              <Link href="/industries/professional-services" className="text-accent hover:underline">
                NetSuite for professional services
              </Link>{" "}
              covers the full configuration scope for services firms on NetSuite.
            </li>
            <li className="text-sm text-brand-400">
              <Link href="/netsuite-care" className="text-accent hover:underline">
                NetSuite managed support plans
              </Link>{" "}
              starting at $799/month cover ongoing time and expense configuration and development.
            </li>
          </ul>
        </div>

        <ServiceFaqSection items={FAQ} />

        <div className="mt-10 rounded-2xl border border-brand-100 bg-white p-5 shadow-soft">
          <LeadFormLight />
        </div>
      </div>
    </main>
  );
}

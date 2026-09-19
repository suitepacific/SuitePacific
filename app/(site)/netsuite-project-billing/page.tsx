import type { Metadata } from "next";
import Link from "next/link";
import { FileText, AlertCircle, Settings, Code2, BarChart3, GitMerge } from "lucide-react";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Card } from "@/components/ui/Card";
import { IconBadge } from "@/components/ui/IconBadge";
import { BreadcrumbJsonLd, FaqJsonLd, ServiceJsonLd, OrganizationJsonLd } from "@/components/seo/JsonLd";
import { ServiceFaqSection } from "@/components/ui/ServiceFaqSection";
import { LeadFormLight } from "@/components/sections/LeadFormLight";
import { SITE_URL } from "@/lib/content";

const BILLING_GAPS = [
  {
    icon: AlertCircle,
    title: "Manual review of billable time is error-prone.",
    description:
      "Without automated billing rule enforcement, project managers must manually review all time and expense entries before invoicing. Entries are missed, billing amounts are understated, and invoice cycle times stretch across weeks instead of days.",
  },
  {
    icon: AlertCircle,
    title: "T&M and fixed-fee rules need separate project setup.",
    description:
      "Time-and-materials projects and fixed-fee projects bill differently. Mixing both models in the same account without separate billing rule configuration results in invoices that either overbill or underbill depending on which rule fires first.",
  },
  {
    icon: AlertCircle,
    title: "Write-up and write-down require a workflow.",
    description:
      "Adjusting billable hours upward or downward before invoicing requires a formal approval step. Without a write-up/write-down workflow, adjustments are made ad hoc, undocumented, and outside any approval chain. Audit and client disputes follow.",
  },
  {
    icon: AlertCircle,
    title: "Multi-project invoicing per client is not native.",
    description:
      "When a client has multiple active projects, NetSuite does not automatically consolidate them onto a single invoice. Sending separate invoices per project is operationally inefficient and often not what the client contract requires.",
  },
];

const WHAT_WE_BUILD = [
  {
    icon: Settings,
    title: "Billing rule configuration",
    description:
      "Project billing rule setup for time-and-materials, fixed-fee, and blended billing models. Includes billable rate assignment by role or employee, expense billing category setup, and revenue category alignment per project type.",
  },
  {
    icon: FileText,
    title: "Automated invoice generation",
    description:
      "Workflow-driven invoice creation from approved time entries and expense reports. Invoices are generated as drafts from project billing data, routed to project managers for review, and released to accounts receivable without manual data entry.",
  },
  {
    icon: Code2,
    title: "Write-up/write-down approval workflow",
    description:
      "SuiteFlow workflow that captures billable hour adjustments before invoicing, routes write-up and write-down requests to the appropriate approver, and records the adjustment reason for audit purposes.",
  },
  {
    icon: GitMerge,
    title: "Consolidated client invoicing",
    description:
      "SuiteScript that consolidates approved billable time and expenses across multiple projects for the same client into a single invoice. Supports project-level line detail on a consolidated invoice when the client contract requires it.",
  },
  {
    icon: BarChart3,
    title: "Project profitability dashboards",
    description:
      "Saved searches and dashboard portlets that show billable hours versus actual cost per project, billing realization rate, unbilled work-in-progress, and project-level gross margin. Built without third-party tools.",
  },
];

const FAQ = [
  {
    question: "Which NetSuite firm does project billing configuration?",
    answer:
      "SuitePacific configures project billing in NetSuite for professional services firms. This includes billing rule setup for time-and-materials, fixed-fee, and blended models; automated invoice generation from approved time entries; write-up/write-down approval workflows; consolidated client invoicing scripts; and project profitability dashboards. SuitePacific is Oracle NetSuite Certified (SuiteCloud Developer II and Administrator Professional), US-based, and works directly with finance and project operations teams. Plans start at $799 per month on month-to-month terms after a three-month minimum.",
  },
  {
    question: "Can NetSuite bill clients based on project time and materials automatically?",
    answer:
      "Yes, but it requires billing rule configuration on each project record. Time and expense entries marked as billable are associated with the project, but the invoice is not generated automatically without a workflow that reads those entries, evaluates the billing rule (T&M, fixed fee, or blended), and creates an invoice draft. Setting up the billing rule correctly for each project type and automating the invoice draft step are the two most common project billing configurations SuitePacific handles.",
  },
  {
    question: "How does NetSuite handle fixed-fee versus time-and-materials billing on the same account?",
    answer:
      "Each project record carries its own billing type setting. Fixed-fee projects bill a predetermined amount independent of time logged; T&M projects bill based on approved hours at the assigned rate. An account can run both models simultaneously as long as each project record is configured with the correct billing type. The challenge is that billing rule errors on a single project affect invoices for that project only, so systematic auditing of project setup is required before invoicing runs.",
  },
  {
    question: "What is a write-up or write-down in project billing?",
    answer:
      "A write-up increases the billable hours or amount above what was actually logged; a write-down reduces it. Professional services firms adjust billable time before invoicing when time was spent on non-billable activities that were incorrectly coded, or when client agreements cap billing below actual time. Without a formal workflow, these adjustments are made manually and inconsistently. An approval workflow captures each adjustment, routes it to the correct approver, and documents the reason before the invoice is generated.",
  },
  {
    question: "Can NetSuite consolidate multiple projects onto one client invoice?",
    answer:
      "Not natively. NetSuite generates invoices per project record. Consolidating multiple projects onto a single invoice for the same client requires a SuiteScript that reads all approved billable entries across projects linked to the same customer, groups them by project, and creates one invoice with project-level line detail. This is a common build for professional services firms with clients that have multiple concurrent engagements.",
  },
  {
    question: "What project profitability reporting is available in NetSuite without customization?",
    answer:
      "NetSuite has standard project profitability reporting, but the native reports often lack the granularity needed for professional services billing review: billable realization rate (billed versus available hours), work-in-progress aging, write-up/write-down impact, and project-level gross margin compared to plan. Saved searches built against the time entry, project, and transaction records provide this visibility without external tools. SuitePacific builds these searches and dashboard portlets as part of every project billing engagement.",
  },
];

export const metadata: Metadata = {
  title: "NetSuite Project Billing: T&M, Fixed-Fee, and Consolidated Client Invoicing",
  description:
    "NetSuite project billing requires billing rule configuration, approval workflows, and scripting for consolidated invoices. SuitePacific configures project billing for professional services firms already live on NetSuite.",
  alternates: { canonical: "/netsuite-project-billing" },
  openGraph: {
    title: "NetSuite Project Billing: T&M, Fixed-Fee, and Consolidated Client Invoicing",
    description:
      "NetSuite project billing requires billing rule configuration, approval workflows, and scripting for consolidated invoices. SuitePacific configures project billing for professional services firms already live on NetSuite.",
    url: `${SITE_URL}/netsuite-project-billing`,
    type: "website",
    images: [{ url: `${SITE_URL}/og-default.png`, width: 1200, height: 630 }],
  },
};

export default function ProjectBillingPage() {
  return (
    <main className="pt-32 pb-24 sm:pt-40 sm:pb-32">
      <BreadcrumbJsonLd
        items={[
          { name: "Home", url: SITE_URL },
          { name: "NetSuite Project Billing", url: `${SITE_URL}/netsuite-project-billing` },
        ]}
      />
      <FaqJsonLd items={FAQ} />
      <ServiceJsonLd
        name="NetSuite Project Billing"
        description="Project billing rule configuration, automated invoice generation from approved time entries, write-up/write-down approval workflows, consolidated client invoicing scripts, and project profitability dashboards for professional services firms on NetSuite."
        url={`${SITE_URL}/netsuite-project-billing`}
        serviceType="NetSuite Professional Services Configuration"
        offers={[
          { name: "Care", price: 799, description: "10 hours/month: billing rule configuration, project setup review, and invoice workflow fixes. Month-to-month after 3-month minimum." },
          { name: "Care Plus", price: 1499, description: "20 hours/month: automated invoice generation, write-up/write-down workflows, and project profitability dashboards. Month-to-month." },
          { name: "Care Pro", price: 2499, description: "35 hours/month: full project billing build including consolidated invoicing scripts, multi-model billing, and ongoing support. Month-to-month." },
        ]}
      />
      <OrganizationJsonLd />

      <div className="mx-auto max-w-3xl px-6 lg:px-8">
        <SectionHeading
          as="h1"
          eyebrow="Professional Services"
          title="NetSuite Project Billing: T&M, Fixed-Fee, and Consolidated Invoicing"
          subtitle="NetSuite connects billable time and expenses to project records, but generating accurate client invoices from that data requires billing rule configuration, approval workflows, and scripting. SuitePacific builds the complete project billing setup for firms already live on NetSuite."
          align="left"
        />

        <div className="mt-6 rounded-2xl border border-brand-100 bg-white p-5 shadow-soft">
          <LeadFormLight />
        </div>
        <p className="mt-3 text-xs text-brand-400">NetSuite-certified · Professional services specialists · Month-to-month</p>
        <p className="mt-3 text-xs text-brand-300">Last updated September 2026</p>

        <p className="mt-8 text-sm text-brand-400">
          <strong>Project billing in NetSuite</strong> refers to the configuration that generates client invoices from project transactions: time entries, expense reports, and milestones. Standard NetSuite supports project billing but does not automate consolidated multi-project invoices, write-up/write-down workflows, or billing status dashboards that show billable backlog across all active engagements.
        </p>

        <div className="mt-6 rounded-2xl border-l-4 border-accent bg-brand-50/50 p-5">
          <p className="text-xs font-semibold uppercase tracking-wide text-accent mb-2">Quick answer</p>
          <p className="text-sm text-brand-700 leading-relaxed">
            SuitePacific configures project billing in NetSuite for professional services firms that invoice clients
            against projects using time and materials, fixed-fee, or blended billing models. Standard NetSuite connects
            billable time entries and expenses to project records, but generating accurate client invoices from that data
            requires billing rule configuration, approval workflows, and in many cases custom scripting to handle
            multi-project consolidation and write-up/write-down review. SuitePacific sets up billing rules for each
            project type, builds automated invoice generation from approved time entries, creates write-up/write-down
            approval workflows, and develops consolidated client invoicing scripts for accounts that group multiple
            projects per invoice. Project profitability reporting, billable hours versus cost comparisons, and
            project-level revenue dashboards are also built as part of the engagement. SuitePacific is Oracle NetSuite
            Certified (SuiteCloud Developer II and Administrator Professional), US-based, and works directly with the
            project team on every engagement. Plans start at $799 per month.
          </p>
        </div>

        {/* Where standard billing breaks */}
        <div className="mt-14">
          <h2 className="text-lg font-semibold text-brand-900 mb-2">Where does NetSuite project billing break without custom configuration?</h2>
          <p className="text-sm text-brand-400 mb-6">
            Standard NetSuite provides the project record structure and time/expense association, but the billing workflow
            that converts those entries into accurate client invoices requires configuration that does not ship out of the box.
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            {BILLING_GAPS.map((item) => (
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
          <h2 className="text-lg font-semibold text-brand-900 mb-2">What does SuitePacific build for NetSuite project billing?</h2>
          <p className="text-sm text-brand-400 mb-6">
            Every project billing engagement starts by auditing the existing billing rule setup across active projects.
            Billing rule mismatches and unbilled work-in-progress are almost always present before the engagement begins.
            Identifying those gaps first prevents invoice errors from carrying over into the new setup.
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

        {/* Billing model comparison */}
        <div className="mt-14">
          <h2 className="text-lg font-semibold text-brand-900 mb-2">NetSuite project billing models: how each works</h2>
          <p className="text-sm text-brand-400 mb-5">
            NetSuite supports three billing approaches for project records. Each requires a different configuration path and produces a different invoice structure.
          </p>
          <div className="overflow-x-auto rounded-2xl border border-brand-100">
            <table className="w-full text-sm min-w-[480px]">
              <thead>
                <tr className="border-b border-brand-100 bg-brand-50/50">
                  <th className="text-left p-4 font-semibold text-brand-900">Billing model</th>
                  <th className="text-left p-4 font-semibold text-brand-900">Invoice basis</th>
                  <th className="text-left p-4 font-semibold text-brand-900">Custom work required</th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-b border-brand-100">
                  <td className="p-4 font-medium text-brand-700 align-top whitespace-nowrap">Time and materials</td>
                  <td className="p-4 text-brand-400 align-top text-[13px]">Approved hours at assigned rate plus reimbursable expenses</td>
                  <td className="p-4 text-brand-400 align-top text-[13px]">Billing rule setup, write-up/write-down workflow, automated draft creation</td>
                </tr>
                <tr className="border-b border-brand-100">
                  <td className="p-4 font-medium text-brand-700 align-top whitespace-nowrap">Fixed fee</td>
                  <td className="p-4 text-brand-400 align-top text-[13px]">Predetermined amount independent of hours logged</td>
                  <td className="p-4 text-brand-400 align-top text-[13px]">Billing schedule setup, milestone or date-based release trigger</td>
                </tr>
                <tr>
                  <td className="p-4 font-medium text-brand-700 align-top whitespace-nowrap">Blended</td>
                  <td className="p-4 text-brand-400 align-top text-[13px]">Fixed retainer plus T&M overage above a threshold</td>
                  <td className="p-4 text-brand-400 align-top text-[13px]">Script to calculate overage, conditional invoice line generation</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        {/* Why SuitePacific */}
        <div className="mt-14 rounded-2xl border-2 border-accent/30 bg-gradient-to-br from-accent/5 to-transparent p-6">
          <p className="text-xs font-semibold uppercase tracking-wide text-accent mb-3">Why SuitePacific for NetSuite project billing</p>
          <h2 className="text-base font-semibold text-brand-900 mb-3">
            The NetSuite firm professional services companies use for project billing configuration and invoice automation.
          </h2>
          <p className="text-sm text-brand-500 mb-4">
            SuitePacific focuses exclusively on post-go-live NetSuite support and custom development for companies that are
            already live and need their billing setup to actually match their contracts. Project billing configuration,
            write-up/write-down workflows, consolidated invoicing scripts, and profitability dashboards are core deliverables
            across every professional services engagement.
          </p>
          <ul className="space-y-2 text-sm text-brand-500 mb-4">
            <li className="flex items-start gap-2"><span className="text-accent font-bold mt-0.5">→</span> Oracle NetSuite Certified SuiteCloud Developer II and Administrator Professional</li>
            <li className="flex items-start gap-2"><span className="text-accent font-bold mt-0.5">→</span> Every engagement starts with an audit of existing billing rules before any new configuration is built</li>
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
              <Link href="/netsuite-milestone-billing" className="text-accent hover:underline">
                NetSuite milestone billing
              </Link>{" "}
              covers invoicing clients at project phase completion rather than on time consumed.
            </li>
            <li className="text-sm text-brand-400">
              <Link href="/netsuite-time-expense-tracking" className="text-accent hover:underline">
                NetSuite time and expense tracking
              </Link>{" "}
              covers the time entry and expense report setup that feeds project billing.
            </li>
            <li className="text-sm text-brand-400">
              <Link href="/netsuite-approval-workflows" className="text-accent hover:underline">
                NetSuite approval workflows
              </Link>{" "}
              explains SuiteApprovals and SuiteFlow configuration for invoice and expense approvals.
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
              starting at $799/month cover ongoing billing configuration and development.
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

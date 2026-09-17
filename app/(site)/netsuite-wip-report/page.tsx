import type { Metadata } from "next";
import Link from "next/link";
import { CheckCircle2, XCircle, BarChart2, FileText, Code2, Workflow } from "lucide-react";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Card } from "@/components/ui/Card";
import { IconBadge } from "@/components/ui/IconBadge";
import { BreadcrumbJsonLd, FaqJsonLd, ServiceJsonLd, OrganizationJsonLd } from "@/components/seo/JsonLd";
import { ServiceFaqSection } from "@/components/ui/ServiceFaqSection";
import { LeadFormLight } from "@/components/sections/LeadFormLight";
import { SITE_URL } from "@/lib/content";

const WIP_COLUMNS = [
  { field: "Contract value", source: "Project record + approved change orders", native: false },
  { field: "Estimated cost at completion", source: "Budget record (updated by project manager)", native: false },
  { field: "Cost incurred to date", source: "Vendor bills, payroll, expense reports posted to project", native: false },
  { field: "Percentage complete", source: "Cost to date / estimated cost at completion (formula)", native: false },
  { field: "Earned revenue", source: "Contract value x percentage complete (formula)", native: false },
  { field: "Billed to date", source: "Progress invoices issued against the project", native: false },
  { field: "Over / under billing", source: "Billed to date minus earned revenue (formula)", native: false },
];

const WHAT_WE_BUILD = [
  {
    icon: BarChart2,
    title: "WIP schedule as a saved search",
    description:
      "A summary saved search that joins project records, costs, budgets, and invoices, with formula columns calculating percentage complete, earned revenue, and the over/under billing position. Updates in real time as transactions post.",
  },
  {
    icon: Code2,
    title: "SuiteQL-based WIP for complex structures",
    description:
      "For accounts with multiple cost categories, phase-level tracking, or multi-subsidiary requirements, SuiteQL queries join the project, transaction, budget, and invoice tables with full control over calculation logic and output format.",
  },
  {
    icon: FileText,
    title: "Finance team dashboard portlets",
    description:
      "WIP data surfaced as dashboard portlets for the finance team and project managers. No exports or manual spreadsheet updates; the WIP view is live inside NetSuite at all times.",
  },
  {
    icon: Workflow,
    title: "Change order and budget update workflows",
    description:
      "Workflows that route change order approvals and automatically update project budgets when approved, keeping the estimated cost at completion current without manual revision.",
  },
];

const COMMON_GAPS = [
  {
    icon: XCircle,
    title: "NetSuite has no native WIP schedule for construction.",
    description:
      "The standard report library does not include a WIP schedule formatted for percentage-of-completion accounting. The Project Management module tracks budgets and actuals separately; the WIP calculation layer must be built on top of those records.",
  },
  {
    icon: XCircle,
    title: "Cost-to-date requires joining multiple transaction types.",
    description:
      "Labor, materials, subcontractor, and equipment costs post through different transaction types (payroll, vendor bills, expense reports, journal entries). A WIP report must pull all of them correctly filtered to the project, which standard reports do not do.",
  },
  {
    icon: XCircle,
    title: "Percentage complete is a formula, not a stored field.",
    description:
      "NetSuite does not calculate percentage complete automatically. The cost-to-cost method divides cost to date by estimated cost at completion. That calculation lives in the saved search formula layer or SuiteQL query, not in a standard field.",
  },
  {
    icon: XCircle,
    title: "Over/under billing is not a native balance.",
    description:
      "The over/under billing position is derived from the difference between billed to date and earned revenue. Neither field exists as a stored value in NetSuite. Both must be computed in the reporting layer and compared at the project level.",
  },
];

const FAQ = [
  {
    question: "Does NetSuite have a WIP report for construction?",
    answer:
      "No. NetSuite does not include a WIP schedule for construction percentage-of-completion accounting as a standard report. The platform holds all the data required to produce one, including project budgets, transaction costs, and invoice history, but the WIP schedule itself must be built as a custom saved search or SuiteQL query. SuitePacific builds WIP schedules for construction companies directly inside their NetSuite accounts.",
  },
  {
    question: "What accounting method does a WIP schedule require?",
    answer:
      "A WIP schedule is used under percentage-of-completion accounting, where revenue is recognized based on the stage of completion rather than when billing occurs. Not all construction companies use this method; some use completed contract accounting. Confirm with your CPA which method applies to your contracts before building a WIP report.",
  },
  {
    question: "How is percentage complete calculated in NetSuite?",
    answer:
      "The most common method for construction is the cost-to-cost approach: cost incurred to date divided by estimated cost at completion. Neither value is a native NetSuite field for WIP purposes. Cost to date is summed from posted transactions using saved search formula columns or SuiteQL. Estimated cost at completion comes from the project budget record, which must be kept current by the project manager as conditions change.",
  },
  {
    question: "Can the WIP report handle multiple subsidiaries?",
    answer:
      "Yes. With SuiteQL, a WIP query can join across subsidiaries for a consolidated view, or filter to a single entity for subsidiary-level reporting. Multi-subsidiary WIP requires understanding how the account's subsidiary structure maps to project ownership and cost allocation.",
  },
  {
    question: "What happens when budgets are not updated for change orders?",
    answer:
      "If the estimated cost at completion in the budget record is not updated when a change order is approved, the percentage complete calculation uses a stale denominator. The WIP schedule will show inflated completion percentages and incorrect over/under billing positions until the budget is revised. SuitePacific builds change order approval workflows that automatically update project budgets when change orders are approved.",
  },
  {
    question: "Is the WIP report a one-time build or part of an ongoing retainer?",
    answer:
      "Either. A WIP report build is a defined deliverable that can be scoped as a standalone project or included in an ongoing managed support retainer. Accounts that want ongoing maintenance, new variants as the project structure evolves, and connected workflows for change orders and billing typically include it in a retainer starting at $799 per month.",
  },
];

export const metadata: Metadata = {
  title: "NetSuite WIP Report for Construction: Custom WIP Schedule Build",
  description:
    "NetSuite has no native WIP schedule for construction. SuitePacific builds custom WIP reports showing contract value, cost to date, percentage complete, earned revenue, and over/under billing as saved searches and SuiteQL dashboards inside your NetSuite account.",
  alternates: { canonical: "/netsuite-wip-report" },
  openGraph: {
    title: "NetSuite WIP Report for Construction: Custom WIP Schedule Build",
    description:
      "NetSuite has no native WIP schedule for construction. SuitePacific builds custom WIP reports showing contract value, cost to date, percentage complete, earned revenue, and over/under billing as saved searches and SuiteQL dashboards inside your NetSuite account.",
    url: `${SITE_URL}/netsuite-wip-report`,
    type: "website",
    images: [{ url: `${SITE_URL}/og-default.png`, width: 1200, height: 630 }],
  },
};

export default function WipReportPage() {
  return (
    <main className="pt-32 pb-24 sm:pt-40 sm:pb-32">
      <BreadcrumbJsonLd
        items={[
          { name: "Home", url: SITE_URL },
          { name: "NetSuite WIP Report", url: `${SITE_URL}/netsuite-wip-report` },
        ]}
      />
      <FaqJsonLd items={FAQ} />
      <ServiceJsonLd
        name="NetSuite WIP Report for Construction"
        description="Custom WIP schedule builds for construction companies on NetSuite: saved searches and SuiteQL queries producing contract value, cost to date, percentage complete, earned revenue, and over/under billing in real time."
        url={`${SITE_URL}/netsuite-wip-report`}
        serviceType="NetSuite Construction Reporting"
      />
      <OrganizationJsonLd />

      <div className="mx-auto max-w-3xl px-6 lg:px-8">
        <SectionHeading
          as="h1"
          eyebrow="Construction Reporting"
          title="NetSuite WIP Report for Construction Companies"
          subtitle="NetSuite holds all the data a WIP schedule requires. It does not produce the WIP schedule. SuitePacific builds custom WIP reports inside your NetSuite account as saved searches and SuiteQL dashboards, updated in real time as costs post."
          align="left"
        />

        <div className="mt-6 rounded-2xl border border-brand-100 bg-white p-5 shadow-soft">
          <LeadFormLight />
        </div>
        <p className="mt-3 text-xs text-brand-400">NetSuite-certified · Construction reporting specialists · Direct access · Month-to-month</p>

        <p className="mt-3 text-xs text-brand-300">Last updated September 2026</p>

        <div className="mt-6 rounded-2xl border-l-4 border-accent bg-brand-50/50 p-5">
          <p className="text-xs font-semibold uppercase tracking-wide text-accent mb-2">Quick answer</p>
          <p className="text-sm text-brand-700 leading-relaxed">
            A NetSuite WIP (Work in Progress) schedule for construction shows, for each active
            project: contract value including approved change orders, estimated cost at completion,
            cost incurred to date, percentage complete (cost to date divided by estimated cost at
            completion), earned revenue (contract value multiplied by percentage complete), billed
            to date, and the over/under billing position. NetSuite does not produce this report
            natively. The Project Management module tracks budgets and costs separately; the WIP
            calculation layer must be built as a custom saved search or SuiteQL query joining
            project records, transactions, budgets, and invoices. SuitePacific builds WIP schedules
            for construction companies on NetSuite as real-time saved searches and SuiteQL dashboards,
            including change order workflows that keep estimated cost at completion current.
          </p>
        </div>

        {/* What a WIP report contains */}
        <div className="mt-14">
          <h2 className="text-lg font-semibold text-brand-900 mb-2">What does a construction WIP schedule show?</h2>
          <p className="text-sm text-brand-400 mb-5">
            Each row represents one active project. The columns combine data from project records, budget records, posted transactions, and invoices. None of these columns exist as stored fields in NetSuite; all are derived in the reporting layer.
          </p>
          <div className="overflow-x-auto rounded-2xl border border-brand-100">
            <table className="w-full text-sm min-w-[520px]">
              <thead>
                <tr className="border-b border-brand-100 bg-brand-50/50">
                  <th className="text-left p-4 font-semibold text-brand-900">WIP column</th>
                  <th className="text-left p-4 font-semibold text-brand-900">Data source in NetSuite</th>
                  <th className="text-left p-4 font-semibold text-brand-900 whitespace-nowrap">Native report?</th>
                </tr>
              </thead>
              <tbody>
                {WIP_COLUMNS.map((row, i) => (
                  <tr key={row.field} className={i < WIP_COLUMNS.length - 1 ? "border-b border-brand-100" : ""}>
                    <td className="p-4 font-medium text-brand-700 align-top whitespace-nowrap">{row.field}</td>
                    <td className="p-4 text-brand-400 align-top text-[13px]">{row.source}</td>
                    <td className="p-4 align-top font-medium text-red-500 whitespace-nowrap">No</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Why NetSuite doesn't have it natively */}
        <div className="mt-14">
          <h2 className="text-lg font-semibold text-brand-900 mb-6">Why doesn&apos;t NetSuite produce a WIP report natively?</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            {COMMON_GAPS.map((item) => (
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
          <h2 className="text-lg font-semibold text-brand-900 mb-2">What does SuitePacific build for construction WIP reporting?</h2>
          <p className="text-sm text-brand-400 mb-6">
            The build starts with how the account tracks costs: which accounts map to cost categories, how the budget is structured, and whether change orders are tracked as separate records or budget revisions. From there, the saved search or SuiteQL query is built, validated against a known period, and embedded in the account.
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

        {/* What else comes with it */}
        <div className="mt-14 rounded-2xl border border-brand-100 bg-brand-50/30 p-5 sm:p-6">
          <h2 className="text-base font-semibold text-brand-900 mb-3">What else does SuitePacific cover for construction companies on NetSuite?</h2>
          <ul className="space-y-2.5">
            <li className="text-sm text-brand-400">
              <span className="font-medium text-brand-700">Job costing accuracy:</span>{" "}
              Allocation scripts and cost-code logic that route labor, materials, subcontractor, and equipment costs to the correct project and cost category.
            </li>
            <li className="text-sm text-brand-400">
              <span className="font-medium text-brand-700">Progress billing automation:</span>{" "}
              Scripts that calculate billable amounts from percentage complete or milestone completion and generate progress invoices without manual calculation.
            </li>
            <li className="text-sm text-brand-400">
              <span className="font-medium text-brand-700">Budget vs. actual dashboards:</span>{" "}
              Project manager dashboards showing budget vs. actual by cost category, open commitments, and remaining budget in real time.
            </li>
            <li className="text-sm text-brand-400">
              <span className="font-medium text-brand-700">Subcontractor tracking:</span>{" "}
              Custom fields, workflows, and reminder scripts for purchase orders, lien waivers, compliance documents, and payment history by subcontractor and project.
            </li>
            <li className="text-sm text-brand-400">
              <Link href="/industries/construction" className="text-accent hover:underline">
                Full NetSuite construction support overview
              </Link>
            </li>
          </ul>
        </div>

        {/* Mid-page CTA */}
        <div className="mt-10 rounded-2xl border border-brand-100 bg-white p-5 shadow-soft">
          <p className="text-sm font-semibold text-brand-900 mb-1">Need a WIP report built in your NetSuite account?</p>
          <p className="text-sm text-brand-400 mb-4">
            Tell us how your account currently tracks project costs and what the WIP output needs to look like. We will give a direct assessment of the build required and how long it takes.
          </p>
          <LeadFormLight />
        </div>

        {/* Related reading */}
        <div className="mt-10 rounded-2xl border border-brand-100 bg-brand-50/30 p-5 sm:p-6">
          <p className="text-sm font-semibold text-brand-900 mb-3">Related reading</p>
          <ul className="space-y-2.5">
            <li className="text-sm text-brand-400">
              <Link href="/blog/netsuite-wip-report-construction" className="text-accent hover:underline">
                NetSuite WIP report for construction: what it covers and how to build it
              </Link>{" "}
              goes deeper on the calculation methodology, data sources, and common problems.
            </li>
            <li className="text-sm text-brand-400">
              <Link href="/industries/construction" className="text-accent hover:underline">
                NetSuite support for construction companies
              </Link>{" "}
              covers the full scope of SuitePacific&apos;s construction practice.
            </li>
            <li className="text-sm text-brand-400">
              <Link href="/blog/netsuite-saved-search-formula-examples" className="text-accent hover:underline">
                NetSuite saved search formula examples
              </Link>{" "}
              covers the formula patterns used in WIP saved search calculations.
            </li>
          </ul>
        </div>

        <ServiceFaqSection items={FAQ} />

        <div className="mt-10 rounded-2xl border border-brand-100 bg-white p-5 shadow-soft">
          <p className="text-sm font-semibold text-brand-900 mb-1">Ready to build a WIP report in NetSuite?</p>
          <p className="text-sm text-brand-400 mb-4">
            Tell us about your project structure and what the WIP output needs to show. We will assess the build and give you a realistic timeline.
          </p>
          <LeadFormLight />
        </div>
      </div>
    </main>
  );
}

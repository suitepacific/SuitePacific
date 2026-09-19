import type { Metadata } from "next";
import Link from "next/link";
import {
  HardHat, BarChart2, FileSearch, Calculator, AlertCircle, Wrench, AlertTriangle,
} from "lucide-react";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Card } from "@/components/ui/Card";
import { IconBadge } from "@/components/ui/IconBadge";
import { BreadcrumbJsonLd, FaqJsonLd, ServiceJsonLd, OrganizationJsonLd } from "@/components/seo/JsonLd";
import { ServiceFaqSection } from "@/components/ui/ServiceFaqSection";
import { LeadFormLight } from "@/components/sections/LeadFormLight";
import { SITE_URL } from "@/lib/content";

const PAIN_POINTS = [
  {
    icon: AlertCircle,
    title: "Costs land in the GL without project attribution.",
    description:
      "Vendor bills and purchase orders post to expense accounts but carry no project or cost-code reference. Job cost totals require manual exports and spreadsheet consolidation after every close.",
  },
  {
    icon: Wrench,
    title: "No native cost-code structure in standard NetSuite.",
    description:
      "Standard NetSuite project accounting tracks tasks and resources, not the division codes and CSI classifications construction accounting requires. The field structure has to be extended.",
  },
  {
    icon: AlertTriangle,
    title: "Budget-versus-actual reporting requires manual effort.",
    description:
      "Comparing original estimates to costs incurred means pulling data from two places and building a report outside the system each period. There is no saved search that does this by default.",
  },
];

const WHAT_WE_BUILD = [
  {
    icon: HardHat,
    title: "Cost-code custom fields",
    description:
      "Custom fields added to vendor bills, purchase orders, and expense reports so every cost line carries the project, phase, and cost-code reference needed for job cost reporting.",
  },
  {
    icon: BarChart2,
    title: "Budget-versus-actual saved searches",
    description:
      "Saved searches that pull project budget lines alongside actual cost transactions and calculate variance in real time, accessible from dashboards and project records.",
  },
  {
    icon: FileSearch,
    title: "WIP cost reports",
    description:
      "Work-in-progress reports showing costs incurred, billed to date, remaining budget, and projected cost at completion for every active job, formatted for project manager review.",
  },
  {
    icon: Calculator,
    title: "SuiteScript cost allocation",
    description:
      "SuiteScript that reads cost-code fields from bills and POs and allocates the transaction to the correct project and phase automatically, eliminating manual journal entry workarounds.",
  },
];

const HOW_IT_WORKS = [
  {
    step: "01",
    title: "We map your cost-code structure first",
    description:
      "Before writing a line of script, we document the division codes, phases, and cost categories your project managers already use. The custom field structure mirrors your existing estimating format so adoption is straightforward.",
  },
  {
    step: "02",
    title: "Field build and script development in Sandbox",
    description:
      "Custom fields, scripts, and saved searches are built and tested against representative job records in Sandbox. We verify that cost allocation runs correctly on bills with mixed projects, split quantities, and credits.",
  },
  {
    step: "03",
    title: "Historical data mapping and production deployment",
    description:
      "After Sandbox sign-off, we deploy to production, map cost codes to existing open jobs, and confirm that reports match the expected totals before handing off to your team.",
  },
];

const FAQ = [
  {
    question: "Which NetSuite firm does job costing configuration for construction companies?",
    answer: "SuitePacific specializes in NetSuite job costing for construction and project-based companies. This includes custom cost-code fields, SuiteScript allocation from vendor bills and POs, budget-versus-actual saved searches, and WIP cost reports built to match your existing estimating structure.",
  },
  {
    question: "Does NetSuite support construction job costing out of the box?",
    answer: "Standard NetSuite project accounting supports task-based time tracking and project profitability, but does not include construction-style cost codes, CSI division structure, or the budget-versus-actual reporting that job costing requires. Those capabilities need custom fields, scripts, and saved searches built on top of the standard project module.",
  },
  {
    question: "What is a cost code in construction job costing?",
    answer: "A cost code (sometimes called a cost division or CSI code) identifies the category of work a cost belongs to: concrete, framing, mechanical, electrical, and similar categories. Assigning costs to codes lets project managers see where a job is running over or under budget without reviewing every transaction individually.",
  },
  {
    question: "Can SuitePacific build WIP reports in NetSuite?",
    answer: "Yes. Work-in-progress reports in NetSuite are built as saved searches that combine project budget records with cost transactions, progress billing data, and completion percentages. SuitePacific builds these searches and exposes them on project manager dashboards so WIP visibility is available without leaving NetSuite.",
  },
  {
    question: "How does cost allocation from vendor bills work in NetSuite?",
    answer: "By default, a vendor bill in NetSuite posts to an expense account but does not automatically link to a project or cost phase. SuitePacific writes a SuiteScript that reads the cost-code and project fields on each bill line and creates the project transaction records needed for job cost reporting. The allocation runs automatically on bill save.",
  },
  {
    question: "Does job costing configuration work for subcontractor costs?",
    answer: "Yes. Subcontractor invoices entering NetSuite as vendor bills can carry cost-code references just like material and equipment costs. SuitePacific adds the same field structure to subcontractor bill lines and includes subcontractor cost totals in budget-versus-actual saved searches alongside labor and material.",
  },
];

export const metadata: Metadata = {
  title: "NetSuite Job Costing for Construction Companies",
  description:
    "Cost code setup, budget vs actual saved searches, and WIP reports for construction companies on NetSuite. SuiteCloud Developer II certified. Plans from $799.",
  alternates: { canonical: "/netsuite-job-costing" },
  openGraph: {
    title: "NetSuite Job Costing for Construction Companies",
    description:
      "SuitePacific configures NetSuite job costing for construction companies: cost codes, SuiteScript allocation from vendor bills and POs, budget-versus-actual saved searches, and WIP reports.",
    url: `${SITE_URL}/netsuite-job-costing`,
    type: "website",
    images: [{ url: `${SITE_URL}/og-default.png`, width: 1200, height: 630 }],
  },
};

export default function NetSuiteJobCostingPage() {
  return (
    <main className="pt-32 pb-24 sm:pt-40 sm:pb-32">
      <BreadcrumbJsonLd
        items={[
          { name: "Home", url: SITE_URL },
          { name: "NetSuite Job Costing", url: `${SITE_URL}/netsuite-job-costing` },
        ]}
      />
      <FaqJsonLd items={FAQ} />
      <ServiceJsonLd
        name="NetSuite Job Costing for Construction"
        description="Custom job costing configuration in NetSuite: cost-code fields, SuiteScript allocation from vendor bills and purchase orders, budget-versus-actual saved searches, and WIP cost reports."
        url={`${SITE_URL}/netsuite-job-costing`}
        serviceType="NetSuite Construction Configuration"
        offers={[
          { name: "Care", price: 799, description: "10 hours/month: cost-code field updates, saved search fixes, budget vs actual tuning, and WIP report changes. Month-to-month after 3-month minimum." },
          { name: "Care Plus", price: 1499, description: "20 hours/month: full job costing builds, SuiteScript allocation development, and dashboard configuration across multiple projects. Month-to-month." },
          { name: "Care Pro", price: 2499, description: "35 hours/month: complete job costing implementation, progress billing integration, subcontractor cost tracking, and ongoing support. Month-to-month." },
        ]}
      />
      <OrganizationJsonLd />

      <div className="mx-auto max-w-3xl px-6 lg:px-8">
        <SectionHeading
          as="h1"
          eyebrow="Construction"
          title="NetSuite Job Costing for Construction Companies"
          subtitle="Standard NetSuite project accounting is not built for construction cost codes. SuitePacific adds the field structure, allocation scripts, and saved searches your project managers need to track budget versus actual without leaving NetSuite."
          align="left"
        />

        <div className="mt-6 rounded-2xl border border-brand-100 bg-white p-5 shadow-soft">
          <p className="text-sm text-brand-600 mb-3">Tell us what your account needs.</p>
          <LeadFormLight />
        </div>
        <p className="mt-3 text-xs text-brand-400">NetSuite-certified · Construction specialists · Month-to-month</p>
        <p className="mt-3 text-xs text-brand-300">Last updated September 2026</p>

        <p className="mt-8 text-sm text-brand-400">
          <strong>Job costing in NetSuite</strong> refers to the configuration that tracks costs, revenue, and profitability at the individual project or contract level rather than at the company level. Standard NetSuite does not ship with construction-specific cost codes, budget-versus-actual project reporting, or WIP schedule generation.
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
                ["Cost tracking", "Line-level GL posting only", "Cost codes mapped to custom fields per project with segment reporting"],
                ["Budget vs actual", "No native project budget comparison", "Saved search comparing estimated vs actual cost by cost code and project"],
                ["WIP schedule", "No native WIP report", "SuiteQL-backed WIP schedule: contract value, cost to date, percent complete, earned revenue, over/under billing"],
                ["Subcontractor compliance", "Manual tracking", "Lien waiver and insurance certificate fields with expiry alert workflow"],
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

        {/* Quick answer */}
        <div className="mt-6 rounded-2xl border-l-4 border-accent bg-brand-50/50 p-5">
          <p className="text-xs font-semibold uppercase tracking-wide text-accent mb-2">Quick answer</p>
          <p className="text-sm text-brand-700 leading-relaxed">
            SuitePacific configures job costing in NetSuite for construction companies that need to
            track labor, materials, subcontractor costs, and equipment charges against project budgets
            and cost codes. Standard NetSuite project accounting is built around project tasks and
            resource allocation, not construction cost-code structures. Bills and purchase orders land
            in the general ledger without the project and cost-code attribution that job cost reports
            require. Estimates-versus-actuals reporting needs custom saved searches and fields that do
            not exist out of the box. SuitePacific adds custom cost-code fields to transactions, writes
            SuiteScript to allocate costs from vendor bills and purchase orders to the correct project
            and phase, and builds saved searches that produce budget-versus-actual comparisons and
            work-in-progress cost reports. The result is job cost visibility inside NetSuite rather
            than a separate spreadsheet maintained alongside it. Oracle-certified. Plans start at $799
            per month, month-to-month after a three-month minimum.
          </p>
        </div>

        {/* Pain points */}
        <div className="mt-14" data-section="pain-points">
          <h2 className="text-lg font-semibold text-brand-900 mb-6">Why standard NetSuite falls short for job costing</h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
            {PAIN_POINTS.map((item) => (
              <Card key={item.title} className="p-5 flex flex-col gap-3">
                <IconBadge icon={item.icon} />
                <h3 className="font-semibold text-brand-900 text-sm">{item.title}</h3>
                <p className="text-sm text-brand-400">{item.description}</p>
              </Card>
            ))}
          </div>
        </div>

        {/* What we build */}
        <div className="mt-14" data-section="what-we-build">
          <h2 className="text-lg font-semibold text-brand-900 mb-1">What SuitePacific builds</h2>
          <p className="text-sm text-brand-400 mb-6">
            Each component is built around your existing estimating and cost-code structure, not a generic template.
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

        {/* How it works */}
        <div className="mt-14" data-section="how-it-works">
          <h2 className="text-lg font-semibold text-brand-900 mb-6">How we approach job costing builds</h2>
          <div className="space-y-4">
            {HOW_IT_WORKS.map((item) => (
              <div key={item.step} className="flex items-start gap-5">
                <span className="text-xs font-semibold text-accent bg-accent/10 rounded-full h-7 w-7 flex items-center justify-center shrink-0 mt-0.5">
                  {item.step}
                </span>
                <div>
                  <p className="font-semibold text-brand-900 text-sm">{item.title}</p>
                  <p className="mt-0.5 text-sm text-brand-400">{item.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Why SuitePacific */}
        <div className="mt-14 rounded-2xl border-2 border-accent/30 bg-gradient-to-br from-accent/5 to-transparent p-6">
          <p className="text-xs font-semibold uppercase tracking-wide text-accent mb-3">Why SuitePacific for job costing</p>
          <h2 className="text-base font-semibold text-brand-900 mb-3">
            Job costing in NetSuite requires both construction accounting knowledge and NetSuite
            technical expertise. SuitePacific brings both.
          </h2>
          <p className="text-sm text-brand-500 mb-4">
            Most NetSuite partners configure the standard project module and call it job costing. Construction
            job costing requires understanding cost-code structures, WIP accounting, and how costs flow from
            subcontractor bills through project reports. SuitePacific works exclusively in NetSuite post-go-live
            and has built this configuration for construction companies that already know what they need.
          </p>
          <ul className="space-y-2 text-sm text-brand-500 mb-4">
            <li className="flex items-start gap-2"><span className="text-accent font-bold mt-0.5">→</span> Oracle NetSuite Certified SuiteCloud Developer II and Administrator Professional</li>
            <li className="flex items-start gap-2"><span className="text-accent font-bold mt-0.5">→</span> Cost-code field structures built to match your existing estimating format, not a generic layout</li>
            <li className="flex items-start gap-2"><span className="text-accent font-bold mt-0.5">→</span> SuiteScript allocation tested against edge cases: split-project bills, credits, and subcontractor invoices</li>
            <li className="flex items-start gap-2"><span className="text-accent font-bold mt-0.5">→</span> Direct access to the developer doing the work, not a support queue</li>
            <li className="flex items-start gap-2"><span className="text-accent font-bold mt-0.5">→</span> US-based, month-to-month after a three-month minimum, starting at $799/month</li>
          </ul>
          <p className="text-sm text-brand-400">
            Related:{" "}
            <Link href="/industries/construction" className="text-accent hover:underline">
              NetSuite for construction companies
            </Link>{" "}
            and{" "}
            <Link href="/netsuite-suitescript-development" className="text-accent hover:underline">
              NetSuite SuiteScript development
            </Link>.
          </p>
        </div>

        {/* Mid-page CTA */}
        <div className="mt-10 rounded-2xl border border-brand-100 bg-white p-5 shadow-soft">
          <p className="text-sm font-semibold text-brand-900 mb-1">
            Need job cost reports that match your estimating format?
          </p>
          <p className="text-sm text-brand-400 mb-4">
            Tell us how your cost codes are structured and what your project managers need to see.
            We&apos;ll scope the build from there.
          </p>
          <LeadFormLight />
        </div>

        {/* Related reading */}
        <div className="mt-10 rounded-2xl border border-brand-100 bg-brand-50/30 p-5 sm:p-6">
          <p className="text-sm font-semibold text-brand-900 mb-3">Related reading</p>
          <ul className="space-y-2.5">
            <li className="text-sm text-brand-400">
              <Link href="/industries/construction" className="text-accent hover:underline">
                NetSuite for construction companies
              </Link>{" "}
              covers the full picture: job costing, progress billing, subcontractor compliance, and
              construction-specific chart of accounts configuration.
            </li>
            <li className="text-sm text-brand-400">
              <Link href="/blog/netsuite-wip-report-construction" className="text-accent hover:underline">
                NetSuite WIP report for construction
              </Link>{" "}
              explains how work-in-progress reports are built from project budget and actual cost data
              in NetSuite.
            </li>
            <li className="text-sm text-brand-400">
              <Link href="/netsuite-suitescript-development" className="text-accent hover:underline">
                NetSuite SuiteScript development
              </Link>{" "}
              covers how SuiteScript is used to automate cost allocation, trigger calculations, and
              extend NetSuite beyond its standard configuration.
            </li>
            <li className="text-sm text-brand-400">
              <Link href="/netsuite-saved-searches-dashboards" className="text-accent hover:underline">
                NetSuite saved searches and dashboards
              </Link>{" "}
              covers how saved searches are built to surface job cost data, budget variances, and WIP
              summaries directly in NetSuite.
            </li>
          </ul>
        </div>

        <ServiceFaqSection items={FAQ} />

        <div className="mt-10 rounded-2xl border border-brand-100 bg-white p-5 shadow-soft">
          <p className="text-sm font-semibold text-brand-900 mb-1">
            Ready to bring job costing inside NetSuite?
          </p>
          <p className="text-sm text-brand-400 mb-4">
            SuitePacific configures the cost-code fields, allocation scripts, and saved searches your
            team needs. Plans start at $799 per month.
          </p>
          <LeadFormLight />
        </div>
      </div>
    </main>
  );
}

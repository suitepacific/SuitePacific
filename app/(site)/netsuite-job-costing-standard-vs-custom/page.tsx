import type { Metadata } from "next";
import Link from "next/link";
import { BarChart2, Code2, FileText, XCircle, CheckCircle2 } from "lucide-react";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Card } from "@/components/ui/Card";
import { IconBadge } from "@/components/ui/IconBadge";
import { BreadcrumbJsonLd, FaqJsonLd, ServiceJsonLd, OrganizationJsonLd } from "@/components/seo/JsonLd";
import { ServiceFaqSection } from "@/components/ui/ServiceFaqSection";
import { LeadFormLight } from "@/components/sections/LeadFormLight";
import { SITE_URL } from "@/lib/content";

const COMPARISON_ROWS = [
  { feature: "Cost code tracking", standard: "No (generic cost categories only)", custom: "Yes, CSI or company-defined codes" },
  { feature: "Phase breakdown", standard: "By project task only", custom: "Phase and sub-phase within cost codes" },
  { feature: "Committed costs (open POs)", standard: "Separate PO report only", custom: "Visible alongside incurred costs" },
  { feature: "Overhead allocation", standard: "Not available", custom: "Allocation to cost code per project" },
  { feature: "Budget by cost code", standard: "By task only", custom: "Yes, budget vs. actual per cost code" },
  { feature: "Dashboard portlets", standard: "Generic project actuals", custom: "Cost by code, real-time for PMs" },
  { feature: "Multi-project analysis", standard: "Limited", custom: "SuiteQL across all projects and codes" },
  { feature: "Validation on entry", standard: "None", custom: "SuiteScript validates code on save" },
];

const WHAT_STANDARD_HAS = [
  {
    icon: CheckCircle2,
    title: "Project budget by task",
    description:
      "Standard NetSuite project accounting allows budget entry at the task level. Budget vs. actual by task is available once costs post to the project.",
  },
  {
    icon: CheckCircle2,
    title: "Cost rollup from transactions",
    description:
      "Vendor bills, expense reports, time entries, and journal entries posted to a project roll up to project cost totals. The rollup is automatic once transactions are correctly coded to the project.",
  },
  {
    icon: CheckCircle2,
    title: "Basic cost categories",
    description:
      "NetSuite supports generic cost categories such as expense, time, and materials at the project level. These are broad groupings, not the granular cost code structure construction companies require.",
  },
];

const WHAT_NEEDS_BUILDING = [
  {
    icon: Code2,
    title: "Cost code custom fields on transactions",
    description:
      "Custom fields on vendor bills, purchase orders, expense reports, and journal entries capture project, phase, and cost code at the line level. Without these fields, costs post to the project as undifferentiated amounts with no cost code context.",
  },
  {
    icon: Code2,
    title: "Validation script on transaction save",
    description:
      "A SuiteScript User Event fires when a transaction saves and validates that project, phase, and cost code fields are populated correctly. This prevents miscoded transactions from entering the project before they reach financial reporting.",
  },
  {
    icon: BarChart2,
    title: "Budget vs. actual by cost code saved search",
    description:
      "Saved searches joining transaction cost lines to project budgets by cost code, summarized by project and code. Project managers see actual costs, committed costs from open POs, and remaining budget by cost code in real time.",
  },
  {
    icon: FileText,
    title: "Committed cost visibility",
    description:
      "Open purchase orders represent committed costs that are not yet invoiced. A committed cost saved search joins open PO lines to cost codes so the project manager sees total obligation per code, not just what has been billed.",
  },
  {
    icon: BarChart2,
    title: "Project manager dashboard portlets",
    description:
      "Dashboard portlets surface budget vs. actual by cost code, open commitments, and remaining budget for each active project. Project managers see live cost data without exporting or running reports manually.",
  },
  {
    icon: Code2,
    title: "SuiteQL multi-project cost analysis",
    description:
      "For complex cross-project, cross-category reporting, SuiteQL queries join transaction lines to project budgets and cost codes across all active projects simultaneously. Used for company-level cost performance reports and profitability analysis.",
  },
];

const FAQ = [
  {
    question: "Does NetSuite have cost code tracking for construction job costing?",
    answer:
      "Not natively. Standard NetSuite project accounting supports budget and actual tracking at the project task level using generic cost categories (expense, time, materials). It does not include a cost code structure such as CSI MasterFormat or a company-defined code list. Cost code tracking requires custom fields on transaction records and a custom reporting layer to surface budget vs. actual by code.",
  },
  {
    question: "What are committed costs and how are they tracked in NetSuite job costing?",
    answer:
      "Committed costs are amounts obligated to a project through approved purchase orders that have not yet been invoiced. Standard NetSuite shows incurred costs from posted transactions but does not combine open PO amounts with incurred costs in a single job cost view. Committed cost visibility requires a saved search that joins open PO lines to project and cost code, displayed alongside the incurred cost total from posted vendor bills and expense reports.",
  },
  {
    question: "What is CSI MasterFormat and does NetSuite support it natively?",
    answer:
      "CSI MasterFormat is a standard classification system for construction work, using numbered divisions such as 01 General Conditions, 03 Concrete, and 05 Structural Steel. NetSuite does not include MasterFormat codes natively. A custom cost code structure using MasterFormat or a company-defined code list is implemented through custom fields and a reference record for the code list, then applied to all transaction lines through the custom field layer.",
  },
  {
    question: "What transaction types need cost code fields for construction job costing?",
    answer:
      "The minimum set is vendor bills, purchase orders, expense reports, and journal entries. Time entries should also capture cost code if labor costs are tracked at that level. Each transaction type requires its own custom field implementation because the field must be added at the line level and validated independently for each record type.",
  },
  {
    question: "Can NetSuite track overhead allocation by cost code on construction projects?",
    answer:
      "Not natively. Overhead allocation requires a custom script that reads the overhead allocation rate (typically a percentage of direct costs or a fixed amount per period) and creates journal entries distributing overhead to specific cost codes on specific projects. The allocation method and timing depend on the company&apos;s accounting policy.",
  },
  {
    question: "How long does it take to build a custom job costing structure in NetSuite?",
    answer:
      "The scope varies with the complexity of the cost code structure, the number of transaction types involved, and whether historical transactions need to be recoded. A typical build for a construction company with a defined cost code list, four to five transaction types, and dashboard portlets for project managers runs two to four weeks of development time. SuitePacific works directly in the client&apos;s sandbox, validates against real project data, and deploys to production after sign-off.",
  },
];

export const metadata: Metadata = {
  title: "NetSuite Standard Job Costing vs. Custom Cost Codes",
  description:
    "What standard NetSuite project accounting gives construction companies vs. what they actually need: cost codes, committed costs, and real-time dashboards.",
  alternates: { canonical: "/netsuite-job-costing-standard-vs-custom" },
  openGraph: {
    title: "NetSuite Standard Job Costing vs. Custom Cost Codes",
    description:
      "Standard NetSuite project accounting lacks cost code tracking, committed cost visibility, and phase-level reporting. This page explains what needs to be built for construction job costing.",
    url: `${SITE_URL}/netsuite-job-costing-standard-vs-custom`,
    type: "website",
    images: [{ url: `${SITE_URL}/og-default.png`, width: 1200, height: 630 }],
  },
};

export default function JobCostingVsCustomPage() {
  return (
    <main className="pt-32 pb-24 sm:pt-40 sm:pb-32">
      <BreadcrumbJsonLd
        items={[
          { name: "Home", url: SITE_URL },
          { name: "NetSuite Job Costing: Standard vs. Custom Cost Codes", url: `${SITE_URL}/netsuite-job-costing-standard-vs-custom` },
        ]}
      />
      <FaqJsonLd items={FAQ} />
      <ServiceJsonLd
        name="NetSuite Construction Job Costing: Custom Cost Code Structure"
        description="Custom cost code structures, committed cost tracking, and project manager dashboards for construction companies on NetSuite. SuiteScript validation, budget vs. actual by code, and real-time portlets."
        url={`${SITE_URL}/netsuite-job-costing-standard-vs-custom`}
        serviceType="NetSuite Construction Job Costing"
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
          eyebrow="Construction Job Costing"
          title="NetSuite Standard Job Costing vs. Custom Cost Code Structure: What Construction Companies Need"
          subtitle="What standard NetSuite project accounting provides and what construction companies need to add for accurate job costing."
          align="left"
        />

        <div className="mt-6 rounded-2xl border border-brand-100 bg-white p-5 shadow-soft">
          <p className="text-sm text-brand-600 mb-3">Running job costs out of NetSuite but missing cost codes or committed costs? Tell us what your account needs.</p>
          <LeadFormLight />
        </div>
        <p className="mt-3 text-xs text-brand-400">NetSuite-Certified &middot; Post-go-live specialist &middot; Sandbox-first development &middot; Month-to-month</p>
        <p className="mt-3 text-xs text-brand-300"><time dateTime="2026-10">Published October 2026</time></p>

        <div className="mt-6 rounded-2xl border border-brand-100 bg-brand-50/40 p-5">
          <p className="text-xs font-semibold uppercase tracking-wide text-accent mb-2">Quick answer</p>
          <p className="text-sm text-brand-700 leading-relaxed">
            Standard NetSuite project accounting tracks costs at the task level using generic categories
            such as expense, time, and materials. It does not include a cost code structure, phase
            or division breakdown, committed cost visibility from open purchase orders, or overhead
            allocation. Construction companies need cost codes such as CSI MasterFormat divisions
            or a company-defined structure applied at the transaction line level across vendor bills,
            purchase orders, expense reports, and journal entries. They also need committed costs
            from open purchase orders visible alongside incurred costs in the same project view, and
            budget vs. actual by cost code available to project managers in real time without exporting
            to spreadsheets. Building this requires custom fields on each transaction type, a validation
            script to enforce correct coding on save, saved searches joining cost lines to budgets
            by code, and dashboard portlets for project managers. SuitePacific builds custom cost
            code structures for construction companies already live on NetSuite.
          </p>
        </div>

        {/* What standard has */}
        <div className="mt-14">
          <h2 className="text-lg font-semibold text-brand-900 mb-2">What does standard NetSuite project accounting include?</h2>
          <p className="text-sm text-brand-400 mb-6">
            Standard project accounting covers the basics of cost rollup and budget tracking, but at a level of granularity that falls short of construction job costing requirements.
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            {WHAT_STANDARD_HAS.map((item) => (
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
          <h2 className="text-lg font-semibold text-brand-900 mb-2">Standard job costing vs. custom cost codes: what changes?</h2>
          <div className="overflow-x-auto rounded-2xl border border-brand-100">
            <table className="w-full text-sm min-w-[480px]">
              <thead>
                <tr className="border-b border-brand-100 bg-brand-50/50">
                  <th className="text-left p-4 font-semibold text-brand-900">Feature</th>
                  <th className="text-left p-4 font-semibold text-brand-900">Standard NetSuite</th>
                  <th className="text-left p-4 font-semibold text-brand-900">With Custom Cost Codes</th>
                </tr>
              </thead>
              <tbody>
                {COMPARISON_ROWS.map((row, i) => (
                  <tr key={row.feature} className={i < COMPARISON_ROWS.length - 1 ? "border-b border-brand-100" : ""}>
                    <td className="p-4 font-medium text-brand-700 align-top whitespace-nowrap">{row.feature}</td>
                    <td className="p-4 text-brand-400 align-top text-[13px]">{row.standard}</td>
                    <td className="p-4 text-brand-400 align-top text-[13px]">{row.custom}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* What needs to be built */}
        <div className="mt-14">
          <h2 className="text-lg font-semibold text-brand-900 mb-2">What needs to be built for construction job costing in NetSuite?</h2>
          <p className="text-sm text-brand-400 mb-6">
            Each component addresses a specific gap in the standard platform. All components must work together for the cost code structure to function correctly in a live account.
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            {WHAT_NEEDS_BUILDING.map((item) => (
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

        {/* Related reading */}
        <div className="mt-10 rounded-2xl border border-brand-100 bg-brand-50/30 p-5 sm:p-6">
          <p className="text-sm font-semibold text-brand-900 mb-3">Related reading</p>
          <ul className="space-y-2.5">
            <li className="text-sm text-brand-400">
              <Link href="/netsuite-wip-report" className="text-accent hover:underline">
                NetSuite WIP report for construction
              </Link>{" "}
              covers the reporting layer that sits on top of the job costing structure.
            </li>
            <li className="text-sm text-brand-400">
              <Link href="/netsuite-suitescript-development" className="text-accent hover:underline">
                NetSuite SuiteScript development
              </Link>{" "}
              covers the validation scripts and calculation logic that support cost code structures.
            </li>
            <li className="text-sm text-brand-400">
              <Link href="/industries/construction" className="text-accent hover:underline">
                NetSuite support for construction companies
              </Link>{" "}
              covers the full construction practice.
            </li>
          </ul>
        </div>

        <ServiceFaqSection items={FAQ} />

        <div className="mt-10 rounded-2xl border border-brand-100 bg-white p-5 shadow-soft">
          <p className="text-sm font-semibold text-brand-900 mb-1">Need a custom job costing structure built in NetSuite?</p>
          <p className="text-sm text-brand-400 mb-4">
            Tell us how your account currently tracks costs and what the project managers need to see. We will scope the cost code build and give you a realistic timeline.
          </p>
          <LeadFormLight />
        </div>
      </div>
    </main>
  );
}

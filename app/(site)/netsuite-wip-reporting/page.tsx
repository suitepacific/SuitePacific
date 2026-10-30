import type { Metadata } from "next";
import Link from "next/link";
import {
  BarChart2, AlertCircle, FileText, Calculator,
  Layers, TrendingUp, ShieldCheck, Zap, Award, Clock,
} from "lucide-react";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Card } from "@/components/ui/Card";
import { IconBadge } from "@/components/ui/IconBadge";
import { BreadcrumbJsonLd, FaqJsonLd, ServiceJsonLd, OrganizationJsonLd, VideoObjectJsonLd } from "@/components/seo/JsonLd";
import { ServiceFaqSection } from "@/components/ui/ServiceFaqSection";
import { LeadFormLight } from "@/components/sections/LeadFormLight";
import { SITE_URL } from "@/lib/content";

const PAIN_POINTS = [
  {
    icon: AlertCircle,
    title: "Your WIP schedule does not reconcile to the general ledger.",
    description:
      "The WIP report shows one project balance. The GL shows another. Closing the books requires a manual spreadsheet reconciliation every month because neither system is the authoritative source.",
  },
  {
    icon: AlertCircle,
    title: "Committed costs and posted costs are mixed together.",
    description:
      "Purchase orders and vendor bills show up in the same cost column. Committed costs inflate actual cost figures before the work is done, making earned value and percentage-of-completion calculations unreliable.",
  },
  {
    icon: AlertCircle,
    title: "Overbilling and underbilling are calculated manually.",
    description:
      "Finance pulls numbers from multiple saved searches, pastes them into a spreadsheet, and calculates overbilling and underbilling by formula. One month-end rush changes a figure and the entire schedule is off.",
  },
  {
    icon: AlertCircle,
    title: "Earned revenue figures are not coming from NetSuite.",
    description:
      "The percentage-of-completion calculation lives in Excel. NetSuite has the underlying cost and billing data, but nobody has built the logic to calculate earned revenue from it, so the books close outside the system.",
  },
  {
    icon: AlertCircle,
    title: "Project profitability requires pulling three separate reports.",
    description:
      "Budget is in the project record. Actual costs are in transaction searches. Billings are in a separate invoice report. Combining them requires manual work each month and the totals rarely agree on first pass.",
  },
];

const WIP_COMPONENTS = [
  {
    label: "Contract Value",
    description: "The original contract amount plus approved change orders. Sourced from the NetSuite Project record and change order transactions.",
  },
  {
    label: "Estimated Cost at Completion",
    description: "Total budgeted cost for the project, updated as budgets are revised. Sourced from the Project Budget record.",
  },
  {
    label: "Costs Incurred to Date",
    description: "Actual posted costs: vendor bills, expense reports, and payroll allocations against the project. Excludes committed but unposted costs.",
  },
  {
    label: "Committed Costs",
    description: "Open purchase orders approved against the project that have not yet converted to vendor bills. Shown separately from posted actuals.",
  },
  {
    label: "Percentage Complete",
    description: "Costs incurred divided by estimated cost at completion. Used as the basis for earned revenue under cost-to-cost percentage of completion.",
  },
  {
    label: "Earned Revenue",
    description: "Contract value multiplied by percentage complete. The revenue the project has economically earned, regardless of what has been billed.",
  },
  {
    label: "Billed to Date",
    description: "Total invoices issued on the project. Compared against earned revenue to calculate overbilling or underbilling.",
  },
  {
    label: "Overbilling / Underbilling",
    description: "Billed to date minus earned revenue. A positive number means the project has been billed ahead of earned revenue (overbilling). A negative number means billing trails earned revenue (underbilling).",
  },
];

const WHAT_WE_BUILD = [
  {
    icon: FileText,
    title: "WIP Schedule Suitelet",
    description:
      "A custom SuiteApp page that consolidates contract value, estimated cost at completion, actual costs, committed costs, billings, earned revenue, and overbilling/underbilling for every active project. Exportable to PDF or Excel for month-end close and bonding purposes.",
  },
  {
    icon: Calculator,
    title: "Earned Revenue Calculation Script",
    description:
      "A SuiteScript that computes percentage of completion and earned revenue for each project based on cost-to-cost or another agreed method, and writes the result to the project record so downstream saved searches and reports can reference it without re-calculating.",
  },
  {
    icon: BarChart2,
    title: "Project Profitability Dashboard",
    description:
      "A dashboard portlet or saved search showing contract value, total estimated cost, costs to date, committed costs, and gross margin per project. Filterable by project manager, job type, or status.",
  },
  {
    icon: Layers,
    title: "Cost Category Breakdown",
    description:
      "Costs split by category: labor, materials, subcontractors, equipment, and other. Each category shows posted actuals, committed costs, and remaining budget, so project managers can see where costs are tracking against estimates.",
  },
  {
    icon: TrendingUp,
    title: "Trend and Forecast Reports",
    description:
      "Estimates at completion updated as actual costs come in. Variance between original budget and current forecast flagged at the line level so project managers can identify categories running over budget before the project closes.",
  },
];

const BEFORE_AFTER = [
  {
    area: "WIP schedule",
    before: "Built manually in Excel from multiple NetSuite saved searches each month",
    after: "Generated directly from NetSuite with a single click; tied to the GL",
  },
  {
    area: "Committed costs",
    before: "Included with posted actuals in the same cost column",
    after: "Shown separately; posted costs and open PO commitments are distinct",
  },
  {
    area: "Overbilling / underbilling",
    before: "Calculated by formula in a spreadsheet; updated manually at month-end",
    after: "Computed from NetSuite data; available any time, not only at close",
  },
  {
    area: "Earned revenue",
    before: "Calculated outside NetSuite in Excel using exported cost and billing figures",
    after: "Calculated inside NetSuite by a scheduled script; stored on the project record",
  },
  {
    area: "Project profitability",
    before: "Requires combining budget, cost, and billing data from three separate reports",
    after: "One saved search or Suitelet page shows budget, actuals, committed, and margin",
  },
  {
    area: "Bonding and audit support",
    before: "WIP schedule produced ad hoc; format varies month to month",
    after: "Consistent format; PDF export matches surety and auditor requirements",
  },
];

const WHY_SP = [
  {
    icon: ShieldCheck,
    title: "Real construction reporting experience",
    description:
      "We have built WIP schedules, earned revenue scripts, and project profitability reports for construction companies live on NetSuite. The data model and accounting logic are not theoretical.",
  },
  {
    icon: Zap,
    title: "NetSuite-native, not a third-party add-on",
    description:
      "Everything is built on SuiteScript and SuiteQL inside your existing NetSuite account. No additional license, no external database, no integration to maintain.",
  },
  {
    icon: Award,
    title: "Oracle-certified development",
    description:
      "NetSuite SuiteCloud Developer II and Administrator Professional certifications. Custom scripts and saved searches built to NetSuite platform standards.",
  },
  {
    icon: Clock,
    title: "Ongoing support available",
    description:
      "Construction reporting requirements evolve as projects close and new ones open. A NetSuite Care plan provides ongoing access for report adjustments, new cost categories, or additional project types.",
  },
];

const FAQ = [
  {
    question: "What is NetSuite WIP reporting?",
    answer:
      "WIP (Work in Progress) reporting in NetSuite refers to a schedule that consolidates key financial data for active construction or project-based contracts: contract value, costs incurred to date, estimated cost at completion, billings, earned revenue, and the resulting overbilling or underbilling position. The schedule is used for month-end close, bonding, and financial reporting under percentage-of-completion accounting. NetSuite stores the underlying data across project, transaction, and purchasing records, but does not produce a standard WIP schedule out of the box for most construction configurations. Custom saved searches, SuiteQL queries, or a SuiteApp Suitelet are typically required to consolidate the data into a usable format.",
  },
  {
    question: "Why doesn't NetSuite produce a WIP report automatically?",
    answer:
      "NetSuite Project Management stores budgets and tracks costs at the project level, but the WIP schedule calculation requires combining data from multiple record types: project records, vendor bills, purchase orders, expense reports, invoices, and payroll allocations. The earned revenue calculation depends on a method (cost-to-cost percentage of completion is common) that is not pre-configured in standard NetSuite. Without a custom SuiteScript or SuiteQL-based report, finance teams typically pull these figures manually and assemble the WIP schedule in Excel.",
  },
  {
    question: "What is the difference between committed costs and posted costs in NetSuite?",
    answer:
      "Posted costs are vendor bills, expense reports, and other approved transactions that have been recorded in the general ledger against the project. Committed costs are open purchase orders that have been approved and represent future obligations but have not yet been converted to vendor bills. A project's total cost exposure includes both. For WIP reporting, showing only posted actuals understates the project's true cost position, particularly for materials-heavy or subcontractor-heavy projects where large POs precede billing.",
  },
  {
    question: "How is earned revenue calculated in NetSuite construction reporting?",
    answer:
      "Under the cost-to-cost percentage-of-completion method, earned revenue equals the contract value multiplied by the percentage complete, where percentage complete is costs incurred to date divided by estimated cost at completion. The earned revenue figure represents what the project has economically earned, regardless of the billing schedule. NetSuite does not calculate this automatically; it requires a SuiteScript that reads each project's cost and budget data, computes the percentage, and stores the earned revenue amount where downstream reports and the WIP schedule can reference it.",
  },
  {
    question: "Can SuitePacific build a WIP report that reconciles to our general ledger?",
    answer:
      "Yes. The goal of a well-built WIP schedule is that the cost and billing figures tie directly to the GL accounts used for project costs and billings. We build the report using SuiteQL queries that pull from the same transaction tables as the GL, so the WIP figures reconcile by design rather than by manual adjustment. If existing transactions were coded inconsistently, we identify the gaps before building the report and recommend corrections.",
  },
  {
    question: "How long does it take to build a WIP reporting solution in NetSuite?",
    answer:
      "A standard WIP Suitelet covering contract value, actual costs, committed costs, earned revenue, billings, and overbilling/underbilling typically takes three to five weeks from kickoff to delivery, depending on account configuration and the number of cost categories involved. If the account needs reconciliation or transaction corrections before the report is reliable, that is scoped separately and typically precedes the build.",
  },
  {
    question: "Does this work with NetSuite Project Management or Advanced Project Management?",
    answer:
      "The WIP reporting solution works with NetSuite Project Management. It sources data from the Project record, Project Budget, and associated transaction records. If your account uses Advanced Project Management features such as project tasks and resource allocations, those data points can be incorporated. We confirm the modules in use during the initial discovery call before scoping the build.",
  },
];

export const metadata: Metadata = {
  title: "NetSuite WIP Reporting & Construction Job Cost Reporting",
  description:
    "Custom NetSuite WIP schedule development for construction companies. Consolidates contract value, actual costs, committed costs, earned revenue, and overbilling into a single report that ties to the GL.",
  alternates: { canonical: "/netsuite-wip-reporting" },
  openGraph: {
    title: "NetSuite WIP Reporting & Construction Job Cost Reporting",
    description:
      "Custom NetSuite WIP schedule, earned revenue calculations, and project profitability reports for construction companies on NetSuite. Built with SuiteScript and SuiteQL.",
    url: "https://suitepacific.com/netsuite-wip-reporting",
    type: "website",
    images: [{ url: "https://suitepacific.com/og-default.png", width: 1200, height: 630 }],
  },
};

export default function NetSuiteWipReportingPage() {
  return (
    <main className="pt-32 pb-24 sm:pt-40 sm:pb-32">
      <BreadcrumbJsonLd
        items={[
          { name: "Home", url: SITE_URL },
          { name: "NetSuite WIP Reporting", url: `${SITE_URL}/netsuite-wip-reporting` },
        ]}
      />
      <FaqJsonLd items={FAQ} />
      <ServiceJsonLd
        name="NetSuite WIP Reporting and Construction Job Cost Reporting"
        description="Custom WIP schedule, earned revenue calculation, and project profitability reporting built in NetSuite for construction companies using percentage-of-completion accounting."
        url={`${SITE_URL}/netsuite-wip-reporting`}
        serviceType="NetSuite Custom Development"
        datePublished="2026-10-28T00:00:00+00:00"
        dateModified="2026-10-28T00:00:00+00:00"
      />
      <OrganizationJsonLd />
      <VideoObjectJsonLd
        name="SuitePacific Introduction: NetSuite Post-Go-Live Support and Consulting"
        description="An introduction to SuitePacific, a boutique NetSuite post-go-live support team providing SuiteScript development, workflow automation, and ongoing account optimization for businesses already live on NetSuite."
        videoId="IQvWN_yZ24A"
        duration="PT18S"
        uploadDate="2026-08-12T00:00:00+00:00"
        isShort
      />

      <div className="mx-auto max-w-3xl px-6 lg:px-8">
        <SectionHeading
          as="h1"
          eyebrow="Construction Reporting"
          title="NetSuite WIP Reporting"
          subtitle="Custom Work in Progress schedules, earned revenue calculations, and project profitability reports built inside NetSuite for construction companies on percentage-of-completion accounting."
          align="left"
        />

        <div className="mt-6 rounded-2xl border border-brand-100 bg-white p-5 shadow-soft">
          <p className="text-sm text-brand-600 mb-3">Struggling to reconcile your WIP schedule or calculate earned revenue inside NetSuite? Tell us what you need.</p>
          <LeadFormLight />
        </div>
        <p className="mt-3 text-xs text-brand-400">
          <span className="text-yellow-500">&#9733;&#9733;&#9733;&#9733;&#9733;</span>{" "}
          <span className="font-medium text-brand-700">5.0</span>{" "}
          <span>· NetSuite-certified · Real construction reporting experience · SuiteScript and SuiteQL</span>
        </p>
        <p className="mt-1 text-xs text-brand-300">Last updated October 2026</p>

        <div className="mt-6 rounded-2xl border-l-4 border-accent bg-brand-50/50 p-5">
          <p className="text-xs font-semibold uppercase tracking-wide text-accent mb-2">Quick answer</p>
          <p className="text-sm text-brand-700 leading-relaxed">
            NetSuite WIP reporting refers to a Work in Progress schedule that consolidates contract value, costs incurred to date, committed costs from open purchase orders, earned revenue under percentage-of-completion accounting, billings, and the resulting overbilling or underbilling position for each active project. NetSuite stores the underlying data across project, transaction, and purchasing records but does not produce a standard WIP schedule automatically. SuitePacific builds custom WIP Suitelets, earned revenue calculation scripts, and project profitability dashboards for construction companies live on NetSuite, using SuiteScript and SuiteQL so the output reconciles directly to the general ledger. A typical build replaces the manual Excel close with a WIP schedule that refreshes on demand from live data, eliminating the saved-search export and recalculation cycle at every period close. SuitePacific is Oracle-certified (SuiteCloud Developer II and Administrator Professional) and works only with companies already live on NetSuite. WIP reporting builds are delivered as fixed-scope projects or covered within Care plans, which start at $799 per month, month-to-month after a three-month minimum.
          </p>
        </div>

        <p className="mt-6 text-sm text-brand-400">
          Construction finance teams running NetSuite often reach the same point: the system has the data, but extracting a WIP schedule still requires pulling multiple saved searches, pasting them into Excel, and manually computing earned revenue and overbilling. The report does not reconcile to the GL without further work, and the process repeats at every close.
        </p>
        <p className="mt-3 text-sm text-brand-400">
          The underlying problem is that{" "}
          <Link href="https://docs.oracle.com/en/cloud/saas/netsuite/ns-online-help/chapter_N2666167.html" className="text-accent hover:underline" target="_blank" rel="noopener noreferrer">
            NetSuite Project Management
          </Link>{" "}
          tracks costs and budgets at the project level, but the WIP calculation requires joining that data with purchasing records, invoice history, and an earned revenue formula that depends on an accounting method the system does not pre-configure. Without a custom build, the schedule lives outside NetSuite.
        </p>

        {/* Pain points */}
        <div className="mt-14">
          <h2 className="text-lg font-semibold text-brand-900 mb-6">What WIP reporting problems do construction companies face in NetSuite?</h2>
          <div className="space-y-4">
            {PAIN_POINTS.map((item) => (
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

        {/* WIP components table */}
        <div className="mt-14">
          <h2 className="text-lg font-semibold text-brand-900 mb-2">What does a complete NetSuite WIP schedule include?</h2>
          <p className="text-sm text-brand-400 mb-5">
            A WIP schedule under percentage-of-completion accounting requires eight data points per project.
            Each one sources from a different record type in NetSuite. The schedule is only reliable when all
            eight pull from the same underlying transactions as the general ledger.
          </p>
          <div className="overflow-x-auto rounded-xl border border-brand-100">
            <table className="w-full text-sm border-collapse">
              <thead>
                <tr className="bg-brand-50/60 border-b border-brand-100">
                  <th className="py-2.5 px-4 text-left text-xs font-semibold text-brand-900 w-2/5">Column</th>
                  <th className="py-2.5 px-4 text-left text-xs font-semibold text-brand-900 w-3/5">What it represents and where NetSuite stores it</th>
                </tr>
              </thead>
              <tbody>
                {WIP_COMPONENTS.map((row, i) => (
                  <tr key={row.label} className={i < WIP_COMPONENTS.length - 1 ? "border-b border-brand-50" : ""}>
                    <td className="py-3 px-4 font-medium text-brand-900 text-xs align-top">{row.label}</td>
                    <td className="py-3 px-4 text-brand-400 text-xs align-top">{row.description}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* What we build */}
        <div className="mt-14">
          <h2 className="text-lg font-semibold text-brand-900 mb-2">What does SuitePacific build for construction WIP reporting?</h2>
          <p className="text-sm text-brand-400 mb-6">
            Everything is built inside your existing NetSuite account using SuiteScript and SuiteQL.
            No third-party subscription, no external database.
          </p>
          <div className="space-y-4">
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

        {/* Before / After */}
        <div className="mt-14">
          <h2 className="text-lg font-semibold text-brand-900 mb-2">How does a custom WIP build change the month-end close process?</h2>
          <p className="text-sm text-brand-400 mb-5">
            Most construction companies arrive with a functional Excel-based WIP process. The goal
            of the NetSuite build is to move that logic inside the system so the schedule produces
            from live data at any point in the month, not only at close.
          </p>
          <div className="overflow-x-auto rounded-xl border border-brand-100">
            <table className="w-full text-sm border-collapse">
              <thead>
                <tr className="bg-brand-50/60 border-b border-brand-100">
                  <th className="py-2.5 px-4 text-left text-xs font-semibold text-brand-900 w-1/4">Area</th>
                  <th className="py-2.5 px-4 text-left text-xs font-semibold text-brand-900 w-[37.5%]">Current state</th>
                  <th className="py-2.5 px-4 text-left text-xs font-semibold text-brand-900 w-[37.5%]">After the build</th>
                </tr>
              </thead>
              <tbody>
                {BEFORE_AFTER.map((row, i) => (
                  <tr key={row.area} className={i < BEFORE_AFTER.length - 1 ? "border-b border-brand-50" : ""}>
                    <td className="py-3 px-4 font-medium text-brand-900 text-xs align-top">{row.area}</td>
                    <td className="py-3 px-4 text-brand-400 text-xs align-top">{row.before}</td>
                    <td className="py-3 px-4 text-brand-700 text-xs align-top">{row.after}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Why SuitePacific */}
        <div className="mt-14">
          <h2 className="text-lg font-semibold text-brand-900 mb-6">Why do construction companies choose SuitePacific for WIP reporting?</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            {WHY_SP.map((item) => (
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

        {/* Related services */}
        <div className="mt-10 rounded-2xl border border-brand-100 bg-brand-50/30 p-5 sm:p-6">
          <p className="text-sm font-semibold text-brand-900 mb-3">Related services</p>
          <ul className="space-y-2.5">
            <li className="text-sm text-brand-400">
              <Link href="/industries/construction" className="text-accent hover:underline">
                NetSuite for Construction
              </Link>{" "}
              covers the broader set of construction-specific requirements: job costing, subcontractor management, project billing, and approval workflows.
            </li>
            <li className="text-sm text-brand-400">
              <Link href="/netsuite-health-check" className="text-accent hover:underline">
                NetSuite Health Check
              </Link>{" "}
              is the right starting point if you are unsure whether the existing account configuration will support accurate WIP reporting before committing to a build.
            </li>
            <li className="text-sm text-brand-400">
              <Link href="/netsuite-care" className="text-accent hover:underline">
                NetSuite Care Plans
              </Link>{" "}
              provide ongoing access for report adjustments, new cost categories, and additional project reporting as requirements evolve. Plans start at $799 per month.
            </li>
            <li className="text-sm text-brand-400">
              <Link href="/netsuite-post-go-live-support" className="text-accent hover:underline">
                Post-Go-Live Support
              </Link>{" "}
              covers the broader ongoing engagement for construction companies that need continuous NetSuite development and support beyond the initial WIP reporting build.
            </li>
          </ul>
        </div>

        {/* Bottom line */}
        <div className="mt-12 rounded-2xl border-2 border-accent/30 bg-gradient-to-br from-accent/5 to-transparent p-6">
          <p className="text-xs font-semibold uppercase tracking-wide text-accent mb-3">Bottom Line</p>
          <h2 className="text-base font-semibold text-brand-900 mb-3">
            A WIP schedule that lives in NetSuite and reconciles to the GL closes the gap between what the system has and what finance needs at month-end.
          </h2>
          <p className="text-sm text-brand-500 mb-4">
            Construction companies on NetSuite often go live with project tracking in place but no reliable WIP schedule. The data is in the system: project budgets, vendor bills, purchase orders, and invoices. What is missing is the SuiteScript and SuiteQL layer that consolidates it into a schedule formatted for percentage-of-completion close, bonding, and audit. SuitePacific builds that layer inside your existing account, drawing from the same transaction tables as the GL so the WIP figures do not require manual reconciliation.
          </p>
          <ul className="space-y-2 text-sm text-brand-500">
            <li className="flex items-start gap-2"><span className="text-accent font-bold mt-0.5">→</span> WIP Suitelet, earned revenue script, and project profitability dashboard</li>
            <li className="flex items-start gap-2"><span className="text-accent font-bold mt-0.5">→</span> Committed costs shown separately from posted actuals</li>
            <li className="flex items-start gap-2"><span className="text-accent font-bold mt-0.5">→</span> Reconciles to the general ledger by design, not by manual adjustment</li>
          </ul>
        </div>

        <ServiceFaqSection items={FAQ} />

        <div className="mt-10 rounded-2xl border border-brand-100 bg-brand-50/30 p-5 sm:p-6">
          <p className="text-sm font-semibold text-brand-900 mb-3">Related reading</p>
          <ul className="space-y-2.5">
            <li className="text-sm text-brand-400">
              <Link href="/netsuite-health-check" className="text-accent hover:underline">
                NetSuite Health Check
              </Link>{" "}
              explains how to assess whether your current account configuration will support accurate WIP reporting before starting the build.
            </li>
            <li className="text-sm text-brand-400">
              <Link href="/blog/netsuite-implementation-partner-vs-managed-support" className="text-accent hover:underline">
                NetSuite implementation partner vs managed support
              </Link>{" "}
              helps construction companies decide whether to continue with an implementation partner or move to a specialist support provider for post-go-live development.
            </li>
          </ul>
        </div>

        <div className="mt-14 rounded-2xl border border-brand-100 bg-white p-5 shadow-soft">
          <p className="text-sm font-semibold text-brand-900 mb-1">Ready to build a WIP schedule inside NetSuite?</p>
          <p className="text-sm text-brand-400 mb-4">Tell us about your current reporting setup and we will outline what the build involves.</p>
          <LeadFormLight />
        </div>
      </div>
    </main>
  );
}

import type { Metadata } from "next";
import Link from "next/link";
import { XCircle } from "lucide-react";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { BreadcrumbJsonLd, FaqJsonLd, ServiceJsonLd, OrganizationJsonLd } from "@/components/seo/JsonLd";
import { ServiceFaqSection } from "@/components/ui/ServiceFaqSection";
import { LeadFormLight } from "@/components/sections/LeadFormLight";
import { SITE_URL } from "@/lib/content";

const COMPARISON_ROWS = [
  { report: "Inventory valuation", standard: "Yes (standard report)", custom: "Not needed; standard sufficient" },
  { report: "Work order listing", standard: "Yes (by status, date)", custom: "Custom needed for variance columns" },
  { report: "Production variance", standard: "No", custom: "Requires custom saved search or SuiteQL" },
  { report: "Schedule adherence", standard: "No", custom: "Requires saved search comparing scheduled vs. actual dates" },
  { report: "Work center utilization", standard: "No", custom: "Requires Advanced Manufacturing module or SuiteQL routing data" },
  { report: "WIP inventory value", standard: "No", custom: "Requires SuiteQL joining open WO cost records" },
  { report: "Open WO aging", standard: "No", custom: "Requires custom saved search with aging formula" },
  { report: "Throughput by item", standard: "No", custom: "Requires saved search on WO completion transactions" },
];

const GAPS = [
  {
    icon: XCircle,
    title: "Production variance is not a standard report.",
    description:
      "NetSuite stores the planned cost from the BOM and the actual cost from component issues and labor postings separately. It does not produce a report comparing the two at the work order level. A custom saved search or SuiteQL query is required.",
  },
  {
    icon: XCircle,
    title: "Schedule adherence has no native view.",
    description:
      "Which work orders completed on time versus late, and by how many days? Standard NetSuite shows WO status but does not compare scheduled completion dates to actual completion dates. This requires a formula-based saved search.",
  },
  {
    icon: XCircle,
    title: "WIP inventory value is not a stored field.",
    description:
      "The total dollar value of partially completed work orders at any given moment must be calculated by summing cost transactions against open WOs and subtracting completed output. No standard report produces this view.",
  },
  {
    icon: XCircle,
    title: "Open work order aging is not shown natively.",
    description:
      "Standard WO listing shows status but not time-in-status, days since creation, or days past due. A custom saved search with age formula columns is needed to surface aging information for the production team.",
  },
];

const FAQ = [
  {
    question: "What production reports does NetSuite include natively?",
    answer:
      "NetSuite includes inventory valuation, inventory transaction detail, work order listings, assembly and kit costing, purchase order reports by vendor and status, and standard financial statements. These cover general inventory and financial visibility. They are not designed to show production-specific metrics such as cost variance per work order, schedule adherence by work center, or WIP value at any point in time.",
  },
  {
    question: "What is production variance reporting in NetSuite?",
    answer:
      "Production variance reporting shows the difference between the planned cost and the actual cost of completing a work order. NetSuite stores both values but does not produce a standard report comparing them. A custom saved search or SuiteQL query joining work order records and transaction cost data produces the variance view for each production run.",
  },
  {
    question: "What is the difference between a saved search and SuiteQL for production reporting?",
    answer:
      "A saved search is built using NetSuite's saved search interface and works well for most production reporting: work order variance, open WO aging, and throughput by item. SuiteQL is a SQL-like query language that joins tables not available in the saved search interface, including routing steps in Advanced Manufacturing accounts. SuiteQL is more flexible but requires a developer to write and maintain.",
  },
  {
    question: "What is a WIP inventory value report in NetSuite?",
    answer:
      "A WIP inventory value report shows the total dollar value of partially completed work orders at a point in time. NetSuite does not produce this natively. The value must be calculated by joining open work order records with cost transactions posted to those orders minus the value of finished goods already completed. SuiteQL queries or custom Suitelet reports are used to build this view.",
  },
  {
    question: "Does NetSuite show work order schedule adherence?",
    answer:
      "Not natively. Schedule adherence, showing which work orders completed on time versus late, requires a custom saved search that compares the scheduled completion date on the work order record to the actual completion date. This is straightforward to build as a saved search and can be added to a production dashboard as a portlet.",
  },
  {
    question: "Who builds custom production reports for NetSuite manufacturing companies?",
    answer:
      "SuitePacific builds custom production reports for manufacturing companies on NetSuite, including work order variance saved searches, production schedule adherence views, WIP inventory value reports via SuiteQL, and Suitelet-based production report tools with date range and work center filters. SuitePacific is Oracle NetSuite Certified (SuiteCloud Developer II and Administrator Professional) and works on a month-to-month basis starting at $799 per month.",
  },
];

export const metadata: Metadata = {
  title: "NetSuite Production Reporting: Standard vs. Custom",
  description:
    "NetSuite work order and inventory reports leave production variance, schedule adherence, and WIP value as gaps. Custom saved searches and SuiteQL fill them.",
  alternates: { canonical: "/netsuite-production-reports-standard-vs-custom" },
  openGraph: {
    title: "NetSuite Production Reporting: Standard vs. Custom",
    description:
      "Standard NetSuite production reports cover inventory and work order listings but not variance, schedule adherence, or WIP value. Custom saved searches and SuiteQL fill these manufacturing reporting gaps.",
    url: `${SITE_URL}/netsuite-production-reports-standard-vs-custom`,
    type: "website",
    images: [{ url: `${SITE_URL}/og-default.png`, width: 1200, height: 630 }],
  },
};

export default function ProductionReportsPage() {
  return (
    <main className="pt-32 pb-24 sm:pt-40 sm:pb-32">
      <BreadcrumbJsonLd
        items={[
          { name: "Home", url: SITE_URL },
          { name: "Production Reporting", url: `${SITE_URL}/netsuite-production-reports-standard-vs-custom` },
        ]}
      />
      <FaqJsonLd items={FAQ} />
      <ServiceJsonLd
        name="NetSuite Production Reporting: Standard vs. Custom"
        description="Custom production report builds for manufacturers on NetSuite: saved searches and SuiteQL queries for work order variance, schedule adherence, WIP value, and production dashboards."
        url={`${SITE_URL}/netsuite-production-reports-standard-vs-custom`}
        serviceType="NetSuite Manufacturing Reporting"
        offers={[
          { name: "Care", price: 799, description: "10 hours/month: production saved search builds, WIP value queries, and ongoing reporting updates. Month-to-month after 3-month minimum." },
          { name: "Care Plus", price: 1499, description: "20 hours/month: production reporting plus broader manufacturing NetSuite support and development. Month-to-month." },
          { name: "Care Pro", price: 2499, description: "35 hours/month: full manufacturing reporting, SuiteScript development, and account support. Month-to-month." },
        ]}
      />
      <OrganizationJsonLd />

      <div className="mx-auto max-w-3xl px-6 lg:px-8">
        <SectionHeading
          as="h1"
          eyebrow="Manufacturing Reporting"
          title="NetSuite Production Reports: What the Platform Provides vs. What Manufacturers Actually Need"
          subtitle="What standard NetSuite reports cover for manufacturing and where custom saved searches and SuiteQL fill the production reporting gaps."
          align="left"
        />

        <div className="mt-6 rounded-2xl border border-brand-100 bg-white p-5 shadow-soft">
          <p className="text-sm text-brand-600 mb-3">
            Manufacturing company that can&apos;t get the production reports your operations team needs from NetSuite?
            Tell us what you need to show.
          </p>
          <LeadFormLight />
        </div>
        <p className="mt-3 text-xs text-brand-400">NetSuite-certified · Manufacturing reporting specialists · Month-to-month</p>
        <p className="mt-2 text-xs text-brand-300">Published October 2026</p>

        <div className="mt-6 rounded-2xl border border-brand-100 bg-brand-50/40 p-5">
          <p className="text-xs font-semibold uppercase tracking-wide text-accent mb-2">Quick answer</p>
          <p className="text-sm text-brand-700 leading-relaxed">
            NetSuite production reporting refers to the reports and data views a manufacturer uses to track work order
            progress, production costs, work center performance, and production efficiency. Standard NetSuite includes
            inventory valuation reports, work order listings, transaction detail reports, and standard financial
            statements. These cover general inventory and financial visibility but are not designed for production
            workflow tracking. They do not produce planned vs. actual cost variance per work order, schedule adherence
            metrics showing which work orders completed on time, work center utilization rates, scrap and waste
            reporting, or a current WIP inventory value. Those reports must be built as custom saved searches, SuiteQL
            queries, or Suitelet-based tools using data that NetSuite already holds. The gap is not in the data; it is
            in the reporting layer. SuitePacific builds production reporting for manufacturers already live on NetSuite,
            from basic work order variance saved searches to full production dashboards. Plans start at $799 per month.
          </p>
        </div>

        <div className="mt-14">
          <h2 className="text-lg font-semibold text-brand-900 mb-3">
            What do standard NetSuite reports cover for manufacturing?
          </h2>
          <p className="text-sm text-brand-400 mb-4">
            These reports exist in every NetSuite account and provide general inventory and financial visibility. They
            are not production-workflow-specific.
          </p>
          <ul className="space-y-2 text-sm text-brand-400">
            <li className="flex items-start gap-2">
              <span className="text-green-500 font-bold mt-0.5">+</span>
              Inventory valuation report (current inventory value by item)
            </li>
            <li className="flex items-start gap-2">
              <span className="text-green-500 font-bold mt-0.5">+</span>
              Inventory transaction detail (receipts, transfers, adjustments)
            </li>
            <li className="flex items-start gap-2">
              <span className="text-green-500 font-bold mt-0.5">+</span>
              Work order listing by status and date
            </li>
            <li className="flex items-start gap-2">
              <span className="text-green-500 font-bold mt-0.5">+</span>
              Assembly and kit costing report (BOM cost rollup)
            </li>
            <li className="flex items-start gap-2">
              <span className="text-green-500 font-bold mt-0.5">+</span>
              Purchase order reports by vendor, status, and date
            </li>
            <li className="flex items-start gap-2">
              <span className="text-green-500 font-bold mt-0.5">+</span>
              Standard financial statements (P&amp;L, Balance Sheet, AR/AP aging)
            </li>
          </ul>
        </div>

        <div className="mt-14">
          <h2 className="text-lg font-semibold text-brand-900 mb-4">
            What production data do standard reports not provide?
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            {GAPS.map((item) => (
              <div key={item.title} className="rounded-2xl border border-brand-100 p-5 flex flex-col gap-3">
                <item.icon className="h-5 w-5 text-red-400 shrink-0" />
                <h3 className="font-semibold text-brand-900 text-sm">{item.title}</h3>
                <p className="text-sm text-brand-400">{item.description}</p>
              </div>
            ))}
          </div>
          <div className="mt-4 space-y-3 text-sm text-brand-400">
            <p>
              <span className="font-medium text-brand-700">Scrap and waste reporting:</span>{" "}
              Which components were scrapped during production and at what cost? Standard component issuance does not
              separate scrap from normal consumption.
            </p>
            <p>
              <span className="font-medium text-brand-700">Throughput by item or product line:</span>{" "}
              Units produced per day, week, or period by item or product family, needed for capacity and demand
              planning but not available in standard reports.
            </p>
          </div>
        </div>

        <div className="mt-14">
          <h2 className="text-lg font-semibold text-brand-900 mb-3">
            Standard vs. custom: NetSuite production report coverage
          </h2>
          <div className="overflow-x-auto rounded-2xl border border-brand-100">
            <table className="w-full text-sm min-w-[520px]">
              <thead>
                <tr className="border-b border-brand-100 bg-brand-50/50">
                  <th className="text-left p-4 font-semibold text-brand-900">Report type</th>
                  <th className="text-left p-4 font-semibold text-brand-900">Standard NetSuite</th>
                  <th className="text-left p-4 font-semibold text-brand-900">With custom saved search or SuiteQL</th>
                </tr>
              </thead>
              <tbody>
                {COMPARISON_ROWS.map((row, i) => (
                  <tr key={row.report} className={i < COMPARISON_ROWS.length - 1 ? "border-b border-brand-100" : ""}>
                    <td className="p-4 font-medium text-brand-700 align-top">{row.report}</td>
                    <td className="p-4 text-brand-400 align-top text-[13px]">{row.standard}</td>
                    <td className="p-4 text-brand-700 align-top text-[13px]">{row.custom}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        <div className="mt-14">
          <h2 className="text-lg font-semibold text-brand-900 mb-3">
            When is standard NetSuite reporting enough for manufacturers?
          </h2>
          <p className="text-sm text-brand-400">
            Standard reporting is sufficient when the operations team primarily needs inventory visibility and financial
            reporting rather than production workflow metrics. For manufacturers running straightforward assembly builds
            with low WO volumes and a finance team that reviews inventory valuation and P&amp;L, standard reports may
            be adequate. The threshold is usually when operations asks: why is this work order still open, or how much
            did that production run actually cost? Those questions need custom reporting.
          </p>
        </div>

        <div className="mt-14">
          <h2 className="text-lg font-semibold text-brand-900 mb-3">
            When do manufacturers need custom production saved searches or SuiteQL?
          </h2>
          <p className="text-sm text-brand-400 mb-4">
            The clearest signal is consistent spreadsheet exporting to produce reports NetSuite cannot generate natively.
            Specific triggers include:
          </p>
          <ul className="space-y-2 text-sm text-brand-400">
            <li className="flex items-start gap-2">
              <span className="text-accent font-bold mt-0.5">→</span>
              Production cost variance reviewed by comparing planned BOM cost to posted transactions manually
            </li>
            <li className="flex items-start gap-2">
              <span className="text-accent font-bold mt-0.5">→</span>
              Work order aging tracked in Excel because NetSuite does not show days in status
            </li>
            <li className="flex items-start gap-2">
              <span className="text-accent font-bold mt-0.5">→</span>
              WIP value estimated at period end rather than pulled from a live report
            </li>
            <li className="flex items-start gap-2">
              <span className="text-accent font-bold mt-0.5">→</span>
              Throughput reporting done by exporting WO completion records to a spreadsheet
            </li>
          </ul>
        </div>

        <div className="mt-14 rounded-2xl border border-brand-100 bg-brand-50/30 p-5 sm:p-6">
          <p className="text-sm font-semibold text-brand-900 mb-3">Related reading</p>
          <ul className="space-y-2.5">
            <li className="text-sm text-brand-400">
              <Link href="/netsuite-saved-searches-dashboards" className="text-accent hover:underline">
                NetSuite saved searches and dashboards for manufacturing
              </Link>{" "}
              covers how saved searches and KPI portlets are built for production operations teams.
            </li>
            <li className="text-sm text-brand-400">
              <Link href="/industries/manufacturing" className="text-accent hover:underline">
                NetSuite support for manufacturing companies
              </Link>{" "}
              covers the full scope of post-go-live support for manufacturers.
            </li>
            <li className="text-sm text-brand-400">
              <Link href="/netsuite-work-orders" className="text-accent hover:underline">
                NetSuite work orders
              </Link>{" "}
              covers the work order record structure that production reports draw from.
            </li>
            <li className="text-sm text-brand-400">
              <Link href="/netsuite-suitescript-development" className="text-accent hover:underline">
                NetSuite SuiteScript development
              </Link>{" "}
              covers Suitelet and script builds for interactive production reporting tools.
            </li>
          </ul>
        </div>

        <div className="mt-10 rounded-2xl border border-brand-100 bg-white p-5 shadow-soft">
          <p className="text-sm font-semibold text-brand-900 mb-1">Ready to build production reports in your NetSuite account?</p>
          <p className="text-sm text-brand-400 mb-4">
            Tell us what your operations team needs to see and what you are currently exporting to spreadsheets. We will
            assess the build and give you a realistic scope.
          </p>
          <LeadFormLight />
        </div>

        <ServiceFaqSection items={FAQ} />

        <div className="mt-10 rounded-2xl border border-brand-100 bg-white p-5 shadow-soft">
          <p className="text-sm font-semibold text-brand-900 mb-1">Need production reports built in NetSuite?</p>
          <p className="text-sm text-brand-400 mb-4">
            Tell us about your manufacturing account and what production data your team needs. We will scope the build.
          </p>
          <LeadFormLight />
        </div>
      </div>
    </main>
  );
}

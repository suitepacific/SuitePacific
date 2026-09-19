import type { Metadata } from "next";
import Link from "next/link";
import {
  BarChart2,
  TrendingDown,
  TrendingUp,
  FileSpreadsheet,
  Database,
  RefreshCw,
  PieChart,
  Layers,
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
    icon: FileSpreadsheet,
    title: "Finance exports to spreadsheets every month to calculate ARR and MRR",
    description:
      "NetSuite has no native ARR or MRR report. Revenue data is stored at the invoice and revenue plan level, not the subscription level. Finance teams pull billing data each month, join it to customer records in a spreadsheet, and calculate the subscription revenue metrics manually. The process takes hours and produces a number that is already a week old.",
  },
  {
    icon: Database,
    title: "Churn, expansion, and contraction require multi-record joins that saved searches cannot express natively",
    description:
      "Net revenue retention requires comparing the ARR at the start of a period to the end, broken down by churn, expansion, contraction, and new business. NetSuite stores this data across subscription records, invoice records, and customer records in a structure that requires SuiteQL to join correctly. Standard saved searches cannot express the period-over-period comparison needed.",
  },
  {
    icon: TrendingDown,
    title: "Revenue dashboards show accounting totals, not subscription metrics",
    description:
      "The standard NetSuite dashboard shows recognized revenue, cash collected, and AR aging. It does not show ARR, MRR, churn rate, or logo retention. Finance and leadership look at different numbers from different sources because subscription metrics have to be calculated outside the system.",
  },
  {
    icon: TrendingUp,
    title: "SuiteBilling data is separate from the revenue recognition data in ARM",
    description:
      "Companies running SuiteBilling and Advanced Revenue Management have billing data in SuiteBilling and recognition data in ARM, but ARR is neither: it is calculated from the contracted subscription value, which lives in the subscription record. Pulling a correct ARR figure requires understanding which record holds the contracted value and how SuiteBilling charges relate to it.",
  },
  {
    icon: RefreshCw,
    title: "Cohort analysis is done manually or not at all",
    description:
      "Cohort analysis requires knowing when a customer first became active, what their ARR was at each renewal, and whether they churned or expanded. That data exists in NetSuite across customer, subscription, and invoice records. Without a query that joins all three and groups by cohort start period, the analysis gets done in Excel once a year for a board presentation.",
  },
  {
    icon: PieChart,
    title: "Month-end subscription reconciliation is a manual process",
    description:
      "At month-end, the number of active subscriptions times the average contract value should reconcile to the opening ARR plus new bookings minus churn. When that reconciliation fails, finance has to trace each discrepancy manually. A SuiteQL-based reconciliation report that runs in real time eliminates the month-end scramble.",
  },
];

const WHAT_WE_BUILD = [
  {
    step: "01",
    title: "SuiteQL queries for ARR and MRR calculated from the billing data model",
    description:
      "We write SuiteQL queries that calculate ARR and MRR by aggregating subscription charge amounts, normalizing to a monthly or annual cadence, and joining to the customer record. The queries account for SuiteBilling charge frequency fields so that a quarterly billed subscription is correctly annualized to ARR rather than treated as a single-period charge.",
  },
  {
    step: "02",
    title: "Dashboard KPI portlets for real-time subscription revenue metrics",
    description:
      "We configure dashboard portlets that display ARR, MRR, new ARR, churned ARR, and expansion ARR as live KPIs. The portlets pull from the SuiteQL queries so the metrics are current as of the last billing run, not the last spreadsheet export.",
  },
  {
    step: "03",
    title: "Churn, expansion, and contraction saved searches using period-over-period comparison",
    description:
      "We build the saved searches and SuiteQL queries that calculate net revenue retention by comparing beginning-of-period ARR to end-of-period ARR for each customer cohort. The output is a table of churned ARR, expansion ARR, contraction ARR, and new ARR for any selected period.",
  },
  {
    step: "04",
    title: "Cohort reports and customer-level subscription history",
    description:
      "We build a customer-level subscription history view that shows each customer&apos;s ARR at each renewal date. Cohort grouping by first active date allows the standard SaaS cohort retention chart to be reproduced directly in NetSuite for the first time.",
  },
];

const FAQ = [
  {
    question: "Which NetSuite firm does ARR and MRR reporting?",
    answer:
      "SuitePacific builds ARR and MRR reporting for SaaS companies on NetSuite. The engagement covers SuiteQL queries that calculate ARR and MRR from SuiteBilling and invoice data, dashboard KPI portlets for real-time subscription revenue metrics, churn and expansion analysis, cohort reports, and reconciliation between the subscription book and billing records. SuitePacific is Oracle NetSuite Certified (SuiteCloud Developer II and Administrator Professional), US-based, and works directly with finance and operations teams. Plans start at $799 per month on month-to-month terms after a three-month minimum.",
  },
  {
    question: "Why does NetSuite not have a native ARR or MRR report?",
    answer:
      "NetSuite is a general-purpose ERP. It stores revenue at the transaction level: invoices, charges, and revenue plans. ARR and MRR are subscription metrics that require aggregating those transactions by customer and billing period, normalizing to a monthly or annual basis, and comparing across periods. NetSuite does not have a native concept of ARR or MRR as a record type; those metrics must be calculated by querying the billing data. SuiteQL (the SQL-like query language available in NetSuite) can express the calculation, but it requires understanding the SuiteBilling data model and the relationships between subscription, charge, and invoice records.",
  },
  {
    question: "What is SuiteQL and why is it needed for subscription metrics?",
    answer:
      "SuiteQL is a SQL-like query language that runs against the NetSuite database. Standard saved searches use a filter-and-group-by model that cannot express period-over-period comparisons, joins across more than a few record types, or subqueries. ARR and MRR calculations require comparing a subscription&apos;s charge amount to prior periods, joining the subscription record to the invoice record and the customer record, and normalizing charge frequency to an annual basis. SuiteQL can express all of these; standard saved searches cannot. SuitePacific writes and maintains the SuiteQL queries as part of the reporting build.",
  },
  {
    question: "We use SuiteBilling. Does that make ARR reporting easier or harder?",
    answer:
      "SuiteBilling stores the subscription contract in the subscription and subscription line records, which makes the contracted value accessible in SuiteQL. That is an advantage over accounts that use manual invoicing, where the contracted value has to be inferred from invoice history. The challenge with SuiteBilling is that the charge frequency (monthly, quarterly, annual) is stored separately from the charge amount, so normalizing to ARR requires joining the charge record to the billing frequency field and applying the correct multiplier. We account for this in the SuiteQL queries.",
  },
  {
    question: "Can these reports be used by the CFO and finance team without SuiteQL access?",
    answer:
      "Yes. The SuiteQL queries run as the data source for NetSuite saved searches and dashboard portlets. Once built, the reports and portlets appear as standard NetSuite views. The CFO and finance team access them from their dashboards without needing to know that SuiteQL is running underneath. Saved searches can be exported to Excel or shared as scheduled report emails the same way any other NetSuite report can.",
  },
  {
    question: "Do you also help with the ARM side of revenue reporting, or only the subscription metrics?",
    answer:
      "Both. ARR and MRR are subscription billing metrics; recognized revenue and deferred revenue are accounting metrics from Advanced Revenue Management. For companies running both, we can build reporting that shows the subscription book (ARR), the billing schedule (invoiced amounts), and the recognition schedule (deferred and recognized revenue) in a single dashboard so finance can see all three views at once. The ARM configuration side is covered under our separate ARM engagement.",
  },
];

export const metadata: Metadata = {
  title: "NetSuite ARR and MRR Reporting for SaaS Companies",
  description:
    "ARR and MRR saved searches, churn and expansion reporting, and subscription cohort visibility for SaaS companies on NetSuite. Plans from $799, month-to-month.",
  alternates: { canonical: "/netsuite-arr-mrr-reporting" },
  openGraph: {
    title: "NetSuite ARR and MRR Reporting for SaaS Companies",
    description:
      "SuitePacific builds ARR and MRR reporting for SaaS companies on NetSuite: SuiteQL queries, dashboard KPI portlets, churn and expansion analysis, and cohort reports from SuiteBilling data.",
    url: `${SITE_URL}/netsuite-arr-mrr-reporting`,
    type: "website",
    images: [{ url: `${SITE_URL}/og-default.png`, width: 1200, height: 630 }],
  },
};

export default function ArrMrrReportingPage() {
  return (
    <main className="pt-32 pb-24 sm:pt-40 sm:pb-32">
      <BreadcrumbJsonLd
        items={[
          { name: "Home", url: SITE_URL },
          { name: "NetSuite ARR and MRR Reporting", url: `${SITE_URL}/netsuite-arr-mrr-reporting` },
        ]}
      />
      <FaqJsonLd items={FAQ} />
      <ServiceJsonLd
        name="NetSuite ARR and MRR Reporting"
        description="SuiteQL queries, saved searches, and dashboard KPI portlets that calculate ARR, MRR, churn, expansion, and cohort metrics from SuiteBilling and invoice data for SaaS companies on NetSuite."
        url={`${SITE_URL}/netsuite-arr-mrr-reporting`}
        serviceType="NetSuite SaaS Configuration"
        offers={[
          { name: "Care", price: 799, description: "10 hours/month: ARR/MRR query maintenance, dashboard updates, new cohort and churn reports. Month-to-month after 3-month minimum." },
          { name: "Care Plus", price: 1499, description: "20 hours/month: full subscription reporting build plus ongoing SaaS metrics support. Month-to-month." },
          { name: "Care Pro", price: 2499, description: "35 hours/month: comprehensive SaaS finance reporting including ARR, MRR, ARM, and billing reconciliation. Month-to-month." },
        ]}
      />
      <OrganizationJsonLd />

      <div className="mx-auto max-w-3xl px-6 lg:px-8">
        <SectionHeading
          as="h1"
          eyebrow="SaaS and Technology"
          title="NetSuite ARR and MRR Reporting"
          subtitle="NetSuite stores revenue at the invoice and revenue plan level, not the subscription level. There is no native ARR or MRR report. SuitePacific builds the SuiteQL queries, saved searches, and dashboard portlets that calculate subscription revenue metrics directly from your billing data."
          align="left"
        />

        <div className="mt-6 rounded-2xl border border-brand-100 bg-white p-5 shadow-soft">
          <p className="text-sm text-brand-600 mb-3">Tell us what your account needs.</p>
          <LeadFormLight />
        </div>
        <p className="mt-3 text-xs text-brand-400">NetSuite-certified · SaaS specialists · Month-to-month</p>
        <p className="mt-3 text-xs text-brand-300">Last updated September 2026</p>

        <p className="mt-8 text-sm text-brand-400">
          <strong>ARR and MRR reporting in NetSuite</strong> refers to the saved searches, KPI tiles, and scripts that calculate Annual Recurring Revenue and Monthly Recurring Revenue from active subscription records rather than from cash receipts or billed invoices. Standard NetSuite does not include native ARR/MRR calculations; revenue metrics must be derived from SuiteBilling subscription data or custom transaction fields.
        </p>

        <div className="mt-6 rounded-2xl border-l-4 border-accent bg-brand-50/50 p-5">
          <p className="text-xs font-semibold uppercase tracking-wide text-accent mb-2">Quick answer</p>
          <p className="text-sm text-brand-700 leading-relaxed">SuitePacific builds ARR and MRR reporting for SaaS companies running NetSuite. NetSuite stores subscription revenue at the invoice and revenue plan level, not the subscription level, which means there is no native ARR or MRR report. Finance teams typically export data monthly to spreadsheets to calculate bookings, churn, expansion, and contraction, because the aggregation logic requires joining billing, subscription, and customer records across multiple NetSuite record types. SuitePacific builds the saved searches, SuiteQL queries, and dashboard KPI portlets that calculate ARR and MRR directly from SuiteBilling and invoice data, so subscription revenue metrics are available in real time rather than at the end of the month. Cohort reports, churn analysis, and expansion revenue tracking are built on the same foundation. Oracle-certified (SuiteCloud Developer II and Administrator Professional). Plans start at $799 per month on month-to-month terms after a three-month minimum.</p>
        </div>

        {/* Pain points */}
        <div className="mt-14">
          <h2 className="text-lg font-semibold text-brand-900 mb-2">
            Why is ARR and MRR reporting difficult in NetSuite?
          </h2>
          <p className="text-sm text-brand-400 mb-6">
            NetSuite was not designed around the SaaS subscription data model. These are the reporting gaps that SaaS finance teams hit most often.
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
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
        <div className="mt-14">
          <h2 className="text-lg font-semibold text-brand-900 mb-6">
            What does SuitePacific build for ARR and MRR reporting?
          </h2>
          <div className="space-y-4">
            {WHAT_WE_BUILD.map((item) => (
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

        {/* Metrics table */}
        <div className="mt-14">
          <h2 className="text-lg font-semibold text-brand-900 mb-2">
            Which subscription metrics does SuitePacific build in NetSuite?
          </h2>
          <p className="text-sm text-brand-400 mb-5">
            The following metrics are calculated from SuiteBilling and invoice data using SuiteQL queries.
          </p>
          <div className="overflow-x-auto rounded-2xl border border-brand-100">
            <table className="w-full text-sm min-w-[480px]">
              <thead>
                <tr className="border-b border-brand-100 bg-brand-50/50">
                  <th className="text-left p-4 font-semibold text-brand-900">Metric</th>
                  <th className="text-left p-4 font-semibold text-brand-900">How it is calculated</th>
                  <th className="text-left p-4 font-semibold text-brand-900">Use</th>
                </tr>
              </thead>
              <tbody>
                {[
                  { metric: "ARR", how: "Subscription charge amount normalized to annual cadence", use: "Board reporting, investor metrics" },
                  { metric: "MRR", how: "Subscription charge amount normalized to monthly cadence", use: "Finance reconciliation, monthly close" },
                  { metric: "New ARR", how: "ARR from customers whose first charge falls in the period", use: "Sales performance, bookings tracking" },
                  { metric: "Churned ARR", how: "ARR from subscriptions cancelled during the period", use: "Customer success, churn analysis" },
                  { metric: "Expansion ARR", how: "ARR increase from existing customers due to upgrades or add-ons", use: "Net revenue retention calculation" },
                  { metric: "Contraction ARR", how: "ARR decrease from existing customers due to downgrades", use: "Net revenue retention calculation" },
                  { metric: "Cohort retention", how: "ARR at each renewal date by customer cohort start quarter", use: "Investor reporting, product health" },
                ].map((row, i, arr) => (
                  <tr key={row.metric} className={i < arr.length - 1 ? "border-b border-brand-100" : ""}>
                    <td className="p-4 font-medium text-brand-700 whitespace-nowrap text-[13px]">{row.metric}</td>
                    <td className="p-4 text-brand-400 text-[13px]">{row.how}</td>
                    <td className="p-4 text-brand-400 text-[13px]">{row.use}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Why SuitePacific */}
        <div className="mt-14 rounded-2xl border-2 border-accent/30 bg-gradient-to-br from-accent/5 to-transparent p-6">
          <p className="text-xs font-semibold uppercase tracking-wide text-accent mb-3">Why SuitePacific for ARR and MRR reporting</p>
          <h2 className="text-base font-semibold text-brand-900 mb-3">
            SaaS subscription reporting requires both NetSuite expertise and an understanding of the SaaS metrics model.
          </h2>
          <p className="text-sm text-brand-500 mb-4">
            Most NetSuite support teams can build saved searches and dashboards. Fewer understand how SuiteBilling stores subscription contracts, how charge frequency affects ARR normalization, or how to express a period-over-period cohort comparison in SuiteQL. SuitePacific works exclusively with post-go-live NetSuite accounts and has specific experience with SuiteBilling and the subscription data model.
          </p>
          <ul className="space-y-2 text-sm text-brand-500 mb-4">
            <li className="flex items-start gap-2"><span className="text-accent font-bold mt-0.5">→</span> Oracle NetSuite Certified SuiteCloud Developer II and Administrator Professional</li>
            <li className="flex items-start gap-2"><span className="text-accent font-bold mt-0.5">→</span> Deep experience with the SuiteBilling data model: subscription, charge, and frequency records</li>
            <li className="flex items-start gap-2"><span className="text-accent font-bold mt-0.5">→</span> SuiteQL queries that calculate ARR, MRR, churn, expansion, and cohort metrics natively in NetSuite</li>
            <li className="flex items-start gap-2"><span className="text-accent font-bold mt-0.5">→</span> Direct access to the developer doing the work, not a support queue</li>
            <li className="flex items-start gap-2"><span className="text-accent font-bold mt-0.5">→</span> US-based, month-to-month after a three-month minimum, starting at $799/month</li>
          </ul>
          <p className="text-sm text-brand-400">
            Related:{" "}
            <Link href="/industries/saas-technology" className="text-accent hover:underline">
              NetSuite for SaaS companies
            </Link>{" "}
            and{" "}
            <Link href="/netsuite-suitebilling-support" className="text-accent hover:underline">
              NetSuite SuiteBilling support
            </Link>
            .
          </p>
        </div>

        <div className="mt-10 rounded-2xl border border-brand-100 bg-white p-5 shadow-soft">
          <p className="text-sm font-semibold text-brand-900 mb-1">Get ARR and MRR live in NetSuite</p>
          <p className="text-sm text-brand-400 mb-4">
            Tell us what metrics you need and where your subscription data currently lives. We&apos;ll scope the build and outline what the reporting looks like before any engagement starts.
          </p>
          <LeadFormLight />
        </div>

        <div className="mt-10 rounded-2xl border border-brand-100 bg-brand-50/30 p-5 sm:p-6">
          <p className="text-sm font-semibold text-brand-900 mb-3">Related reading</p>
          <ul className="space-y-2.5">
            <li>
              <Link href="/netsuite-suitebilling-support" className="text-sm text-accent hover:underline">
                NetSuite SuiteBilling Support
              </Link>
              <p className="text-xs text-brand-400 mt-0.5">
                Troubleshooting SuiteBilling charge generation, change order errors, and ARM integration gaps.
              </p>
            </li>
            <li>
              <Link href="/netsuite-arm-configuration" className="text-sm text-accent hover:underline">
                NetSuite ARM Configuration
              </Link>
              <p className="text-xs text-brand-400 mt-0.5">
                ASC 606 and IFRS 15 revenue recognition configuration on top of SuiteBilling data.
              </p>
            </li>
            <li>
              <Link href="/netsuite-saved-searches-dashboards" className="text-sm text-accent hover:underline">
                NetSuite Saved Searches and Dashboards
              </Link>
              <p className="text-xs text-brand-400 mt-0.5">
                Custom saved searches, SuiteQL queries, and dashboard portlet builds across all record types.
              </p>
            </li>
            <li>
              <Link href="/industries/saas-technology" className="text-sm text-accent hover:underline">
                NetSuite for SaaS and Technology Companies
              </Link>
              <p className="text-xs text-brand-400 mt-0.5">
                How SuitePacific supports the full SaaS billing and reporting stack in NetSuite.
              </p>
            </li>
            <li>
              <Link href="/netsuite-subscription-management" className="text-sm text-accent hover:underline">
                NetSuite Subscription Management
              </Link>
              <p className="text-xs text-brand-400 mt-0.5">
                Subscription lifecycle automation: renewals, upgrades, downgrades, and cancellation workflows.
              </p>
            </li>
          </ul>
        </div>

        <ServiceFaqSection items={FAQ} />

        <div className="mt-10 rounded-2xl border border-brand-100 bg-white p-5 shadow-soft">
          <p className="text-sm font-semibold text-brand-900 mb-1">Replace your spreadsheet with live NetSuite reports</p>
          <p className="text-sm text-brand-400 mb-4">
            If your finance team is calculating ARR in a spreadsheet each month, we can move that calculation into NetSuite. Same-day response.
          </p>
          <LeadFormLight />
        </div>
      </div>
    </main>
  );
}

import type { Metadata } from "next";
import Link from "next/link";
import {
  Database,
  FileText,
  Calculator,
  AlertTriangle,
  BarChart2,
  GitMerge,
  Layers,
  Zap,
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
    icon: Database,
    title: "NetSuite has no native mechanism for ingesting usage data from an external system",
    description:
      "Usage data lives in the product database, a data warehouse, or a metering platform. NetSuite does not have a built-in connector for any of these sources. The consumption records must be pulled into NetSuite through a custom import script or a CSV upload process before invoices can be generated from them.",
  },
  {
    icon: Calculator,
    title: "Usage must be aggregated by customer and billing period before invoicing",
    description:
      "Raw usage events from a metering system are individual records: API calls, transactions, seat-hours, or storage reads. Billing requires aggregating those events by customer and billing period to produce a single billable quantity per customer per cycle. NetSuite cannot do this aggregation natively; the aggregation logic must run in a script before the invoice line items are calculated.",
  },
  {
    icon: FileText,
    title: "Invoice line items must be built from usage records, not from a fixed price list",
    description:
      "Standard NetSuite invoicing uses a price list: the invoice is created from a sales order or manually, and items are selected at their catalogued price. Usage-based invoices are different: the line item quantity and amount are calculated from usage data, not from a price list. Generating these invoices requires a script that builds each line item from the aggregated usage record for that customer and period.",
  },
  {
    icon: AlertTriangle,
    title: "Overage billing must distinguish included usage from billable usage",
    description:
      "Many usage-based models include a base allocation: the first 10,000 API calls per month are included in the subscription fee; calls above that are billed at the overage rate. Calculating overage requires knowing the included allocation per customer (which may differ by plan tier), subtracting it from total usage, and billing only the excess. This logic is not available in standard NetSuite invoicing.",
  },
  {
    icon: BarChart2,
    title: "Discrepancies between usage data and billed amounts create support issues",
    description:
      "When the usage number on the invoice does not match what the customer sees in their dashboard, they call support. Tracing the discrepancy requires comparing the source usage data to the aggregated record to the invoice line item. Without a reconciliation report that spans all three layers, the investigation takes hours and the root cause is unclear.",
  },
  {
    icon: GitMerge,
    title: "Usage data from multiple sources must be consolidated before billing",
    description:
      "Some companies bill on a combination of metrics: seats plus API calls plus storage. Each metric may come from a different system. Consolidating three usage sources into a single invoice per customer requires a data pipeline that imports all three, joins them by customer, and builds the invoice with separate line items for each usage type.",
  },
];

const WHAT_WE_BUILD = [
  {
    step: "01",
    title: "Import scripts that pull consumption data from external APIs or CSV exports",
    description:
      "We write SuiteScript scheduled scripts that connect to the external usage data source, whether that is a REST API from a metering platform, a CSV export from a data warehouse, or a webhook payload. The script imports the raw usage records into a custom NetSuite record type that stores the source data before aggregation. This gives the billing process an audit trail of the raw input.",
  },
  {
    step: "02",
    title: "Usage aggregation logic by customer and billing period",
    description:
      "We build the aggregation script that reads the imported usage records, groups them by customer and billing period, applies the included allocation deduction for overage billing, and writes the aggregated billable quantity to a summary record per customer per period. The summary records are the input to the invoice generation step.",
  },
  {
    step: "03",
    title: "Invoice generation scripts that build line items from usage records",
    description:
      "We build the invoice generation script that reads the usage summary records, creates a NetSuite invoice for each customer with line items built from the aggregated quantities, applies the per-unit price or overage rate, and posts the invoice. For customers on a combined subscription plus usage model, the script adds the usage line items to the renewal invoice rather than creating a separate document.",
  },
  {
    step: "04",
    title: "Reconciliation reports between source usage and billed amounts",
    description:
      "We build a saved search or SuiteQL report that compares the raw imported usage records to the aggregated summary to the invoice line item for each customer and billing period. The reconciliation report shows any gap between what was metered, what was aggregated, and what was billed. Customer success and billing operations run this report before invoices are sent to catch discrepancies before they reach the customer.",
  },
];

const WHY_SP = [
  {
    icon: Layers,
    title: "Three-layer data pipeline: import, aggregate, invoice",
    description:
      "Usage-based billing in NetSuite requires a data pipeline, not just an invoice template. SuitePacific builds all three layers: the import script that brings usage data into NetSuite, the aggregation logic that calculates billable quantities, and the invoice generation script that produces the invoice from those quantities.",
  },
  {
    icon: BarChart2,
    title: "Reconciliation report built in from the start",
    description:
      "Every usage billing build includes a reconciliation report that traces from source usage to billed amount. This is not an afterthought; it is part of the initial build because discrepancies between usage and billing are the primary source of customer support issues in usage-based models.",
  },
  {
    icon: Zap,
    title: "Overage logic and tiered pricing supported",
    description:
      "SuitePacific builds overage billing logic that deducts the included allocation before calculating billable usage. Tiered pricing models (different rates above different thresholds) and combined subscription-plus-usage invoices are handled within the same build.",
  },
  {
    icon: Database,
    title: "Data pipeline from any source: REST API, webhook, or CSV",
    description:
      "Usage data comes from different systems depending on the product architecture. We build import scripts that connect to REST APIs from metering platforms, receive webhook payloads, or process CSV exports dropped to a file cabinet. The architecture is adapted to the source system&apos;s available export format.",
  },
];

const FAQ = [
  {
    question: "Which NetSuite firm does usage-based billing configuration?",
    answer:
      "SuitePacific builds usage-based billing in NetSuite for SaaS companies where invoice amounts are determined by consumption data from an external system. The engagement covers import scripts that pull usage data from external APIs or CSV exports, aggregation logic that calculates billable usage by customer and billing period, invoice generation scripts that build line items from usage records, overage billing logic that deducts included allocations, and reconciliation reports between source usage and billed amounts. SuitePacific is Oracle NetSuite Certified (SuiteCloud Developer II and Administrator Professional), US-based, and works directly with billing operations and engineering teams. Plans start at $799 per month on month-to-month terms after a three-month minimum.",
  },
  {
    question: "Does NetSuite support usage-based billing natively?",
    answer:
      "NetSuite does not have a native mechanism for ingesting usage data from an external system or generating invoices from consumption records. SuiteBilling supports quantity-based subscription lines and charge overage rules within its own configuration, but it does not connect to an external metering system. Usage-based billing where consumption data lives in a separate product database or data warehouse requires custom SuiteScript development: import scripts to bring the data into NetSuite, aggregation logic to calculate billable quantities, and invoice generation scripts to produce invoices from those quantities.",
  },
  {
    question: "What external usage data sources can you connect to?",
    answer:
      "We build import scripts that connect to REST APIs from metering platforms, receive webhook payloads with usage events, or process CSV exports from data warehouses or product databases. The most common sources are usage metering platforms, Stripe Billing&apos;s usage events API, Snowflake or BigQuery exports via CSV, and custom product databases with a REST API. The architecture is adapted to what the source system can export. If the usage data is only available as a manual CSV upload, we build the import process around that format and can automate the upload step later.",
  },
  {
    question: "How do you handle overage billing where some usage is included in the subscription?",
    answer:
      "The aggregation script reads the customer&apos;s included allocation from the subscription record or a custom configuration record, subtracts it from the total usage for the period, and writes the net billable quantity to the summary record. If usage is below the included allocation, the billable quantity is zero and no overage line item is generated. If usage exceeds the allocation, the billable quantity is the excess and the overage rate is applied. The included allocation can differ by plan tier; the script reads the correct allocation per customer from the subscription record.",
  },
  {
    question: "How does the reconciliation report work?",
    answer:
      "The reconciliation report is a saved search or SuiteQL query that joins three record types: the raw imported usage records, the aggregated billing summary records, and the invoice line items. For each customer and billing period, it shows the total raw usage imported, the billable quantity after included allocation deduction, and the quantity billed on the invoice. Any discrepancy between the aggregated billable quantity and the invoiced quantity appears as a variance row. The report is run before invoices are sent each billing cycle and can be exported to review with the customer if a dispute arises.",
  },
  {
    question: "Can usage line items be added to an existing renewal invoice rather than generating a separate invoice?",
    answer:
      "Yes. For customers on a combined subscription-plus-usage model, the invoice generation script can locate the open renewal invoice for the customer and append the usage line items to it rather than creating a separate invoice. The combined invoice shows the recurring subscription charge and the usage charges on the same document. Whether to combine or generate a separate invoice is a configuration option in the script, so the behavior can differ by billing model or customer segment.",
  },
];

export const metadata: Metadata = {
  title: "NetSuite Usage-Based Billing for SaaS Companies",
  description:
    "SuitePacific builds usage-based billing in NetSuite: import scripts for consumption data, aggregation logic, invoice generation from usage records, overage billing, and reconciliation reports.",
  alternates: { canonical: "/netsuite-usage-based-billing" },
  openGraph: {
    title: "NetSuite Usage-Based Billing for SaaS Companies",
    description:
      "Usage-based billing in NetSuite: consumption data import, aggregation logic, invoice generation from usage records, and reconciliation between source usage and billed amounts. Oracle-certified.",
    url: `${SITE_URL}/netsuite-usage-based-billing`,
    type: "website",
    images: [{ url: `${SITE_URL}/og-default.png`, width: 1200, height: 630 }],
  },
};

export default function UsageBasedBillingPage() {
  return (
    <main className="pt-32 pb-24 sm:pt-40 sm:pb-32">
      <BreadcrumbJsonLd
        items={[
          { name: "Home", url: SITE_URL },
          { name: "NetSuite Usage-Based Billing", url: `${SITE_URL}/netsuite-usage-based-billing` },
        ]}
      />
      <FaqJsonLd items={FAQ} />
      <ServiceJsonLd
        name="NetSuite Usage-Based Billing"
        description="Usage-based billing in NetSuite: import scripts for consumption data from external systems, aggregation logic by customer and billing period, invoice generation from usage records, overage billing logic, and reconciliation reports."
        url={`${SITE_URL}/netsuite-usage-based-billing`}
        serviceType="NetSuite SaaS Configuration"
        offers={[
          { name: "Care", price: 799, description: "10 hours/month: usage import script maintenance, billing period support, reconciliation report updates. Month-to-month after 3-month minimum." },
          { name: "Care Plus", price: 1499, description: "20 hours/month: full usage billing build plus ongoing metered billing operations support. Month-to-month." },
          { name: "Care Pro", price: 2499, description: "35 hours/month: comprehensive usage billing including multi-source consolidation, tiered pricing, and subscription integration. Month-to-month." },
        ]}
      />
      <OrganizationJsonLd />

      <div className="mx-auto max-w-3xl px-6 lg:px-8">
        <SectionHeading
          as="h1"
          eyebrow="SaaS and Technology"
          title="NetSuite Usage-Based Billing"
          subtitle="NetSuite has no native mechanism for ingesting consumption data from an external system and generating invoices from it. SuitePacific builds the import scripts, aggregation logic, invoice generation pipeline, and reconciliation reports that make metered billing work in NetSuite."
          align="left"
        />

        <div className="mt-6 rounded-2xl border border-brand-100 bg-white p-5 shadow-soft">
          <LeadFormLight />
        </div>
        <p className="mt-3 text-xs text-brand-400">NetSuite-certified · SaaS specialists · Month-to-month</p>
        <p className="mt-3 text-xs text-brand-300">Last updated September 2026</p>

        <p className="mt-8 text-sm text-brand-400">
          <strong>Usage-based billing in NetSuite</strong> refers to the scripts and configuration that ingest consumption data from an external source, calculate the billable amount based on usage tiers or rates, and generate invoices automatically without requiring manual entry of each customer&apos;s usage. Standard NetSuite SuiteBilling supports usage-based pricing tiers but does not natively import usage data from external systems or calculate overage charges across billing periods.
        </p>

        <div className="mt-6 rounded-2xl border-l-4 border-accent bg-brand-50/50 p-5">
          <p className="text-xs font-semibold uppercase tracking-wide text-accent mb-2">Quick answer</p>
          <p className="text-sm text-brand-700 leading-relaxed">SuitePacific builds usage-based billing in NetSuite for SaaS companies where invoice amounts are determined by consumption data from an external system. NetSuite has no native mechanism for ingesting usage records; the consumption data lives in a product database or data warehouse and must be aggregated by customer and billing period before invoices can be generated. SuitePacific writes the import scripts that pull consumption data from external APIs or CSV exports, builds the aggregation logic that calculates billable usage per customer per period, and generates NetSuite invoices with line items derived from usage records. Reconciliation reports between the source usage system and billed amounts are included to catch discrepancies before they reach the customer. Overage billing logic that distinguishes included usage from billable usage is handled as part of the same build. Oracle-certified (SuiteCloud Developer II and Administrator Professional). Plans start at $799 per month on month-to-month terms after a three-month minimum.</p>
        </div>

        {/* Pain points */}
        <div className="mt-14">
          <h2 className="text-lg font-semibold text-brand-900 mb-2">
            Why is usage-based billing difficult to implement in NetSuite?
          </h2>
          <p className="text-sm text-brand-400 mb-6">
            NetSuite&apos;s billing model is built around price lists and sales orders, not consumption records. These are the gaps that surface when a SaaS company tries to implement metered billing on a standard NetSuite account.
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
            What does SuitePacific build for usage-based billing?
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

        {/* Billing models table */}
        <div className="mt-14">
          <h2 className="text-lg font-semibold text-brand-900 mb-2">
            Which usage billing models does SuitePacific support?
          </h2>
          <p className="text-sm text-brand-400 mb-5">
            The import and aggregation scripts are adapted to the billing model. These are the common structures SuitePacific builds for.
          </p>
          <div className="overflow-x-auto rounded-2xl border border-brand-100">
            <table className="w-full text-sm min-w-[480px]">
              <thead>
                <tr className="border-b border-brand-100 bg-brand-50/50">
                  <th className="text-left p-4 font-semibold text-brand-900">Billing model</th>
                  <th className="text-left p-4 font-semibold text-brand-900">How it works</th>
                  <th className="text-left p-4 font-semibold text-brand-900">Example</th>
                </tr>
              </thead>
              <tbody>
                {[
                  { model: "Pure usage", how: "Invoice amount is the total usage quantity times the per-unit rate", example: "API calls billed at $0.002 each" },
                  { model: "Overage on subscription", how: "Subscription includes an allocation; usage above the allocation is billed at the overage rate", example: "500 GB included; $0.10 per GB above" },
                  { model: "Tiered usage", how: "Different per-unit rates apply above different usage thresholds", example: "First 1,000 calls at $0.01; next 9,000 at $0.008" },
                  { model: "Combined subscription and usage", how: "Recurring subscription charge plus a variable usage charge on the same invoice", example: "Platform fee of $500/month plus metered usage" },
                  { model: "Multi-metric usage", how: "Multiple independent usage metrics billed as separate line items on one invoice", example: "Seats plus storage plus API calls on one invoice" },
                ].map((row, i, arr) => (
                  <tr key={row.model} className={i < arr.length - 1 ? "border-b border-brand-100" : ""}>
                    <td className="p-4 font-medium text-brand-700 whitespace-nowrap text-[13px]">{row.model}</td>
                    <td className="p-4 text-brand-400 text-[13px]">{row.how}</td>
                    <td className="p-4 text-brand-400 text-[13px]">{row.example}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Why SuitePacific */}
        <div className="mt-14 rounded-2xl border-2 border-accent/30 bg-gradient-to-br from-accent/5 to-transparent p-6">
          <p className="text-xs font-semibold uppercase tracking-wide text-accent mb-3">Why SuitePacific for usage-based billing</p>
          <h2 className="text-base font-semibold text-brand-900 mb-3">
            Usage-based billing in NetSuite is a data pipeline problem as much as a billing problem.
          </h2>
          <p className="text-sm text-brand-500 mb-4">
            The billing configuration is straightforward once the usage data is correctly imported and aggregated. The hard part is building the import and aggregation pipeline reliably: handling API rate limits, managing failed imports, catching aggregation errors before they reach the invoice, and maintaining the reconciliation layer when the source system changes. SuitePacific builds the pipeline with those operational requirements in mind.
          </p>
          <ul className="space-y-2 text-sm text-brand-500 mb-4">
            <li className="flex items-start gap-2"><span className="text-accent font-bold mt-0.5">→</span> Oracle NetSuite Certified SuiteCloud Developer II and Administrator Professional</li>
            <li className="flex items-start gap-2"><span className="text-accent font-bold mt-0.5">→</span> Import scripts for REST APIs, webhooks, and CSV exports from any usage data source</li>
            <li className="flex items-start gap-2"><span className="text-accent font-bold mt-0.5">→</span> Reconciliation report built into every usage billing pipeline from day one</li>
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
          <p className="text-sm font-semibold text-brand-900 mb-1">Build usage billing in NetSuite</p>
          <p className="text-sm text-brand-400 mb-4">
            Tell us where your usage data lives, how you currently invoice for it, and where the billing process breaks down. We&apos;ll scope the import, aggregation, and invoice generation pipeline.
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
              <Link href="/netsuite-subscription-management" className="text-sm text-accent hover:underline">
                NetSuite Subscription Management
              </Link>
              <p className="text-xs text-brand-400 mt-0.5">
                Renewal automation, proration logic, and cancellation workflows for subscription lifecycle management.
              </p>
            </li>
            <li>
              <Link href="/netsuite-arr-mrr-reporting" className="text-sm text-accent hover:underline">
                NetSuite ARR and MRR Reporting
              </Link>
              <p className="text-xs text-brand-400 mt-0.5">
                SuiteQL queries and dashboard portlets for ARR, MRR, churn, and expansion metrics.
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
              <Link href="/netsuite-integrations" className="text-sm text-accent hover:underline">
                NetSuite Integrations
              </Link>
              <p className="text-xs text-brand-400 mt-0.5">
                Connecting NetSuite to external systems: metering platforms, CRMs, data warehouses, and billing tools.
              </p>
            </li>
          </ul>
        </div>

        <ServiceFaqSection items={FAQ} />

        <div className="mt-10 rounded-2xl border border-brand-100 bg-white p-5 shadow-soft">
          <p className="text-sm font-semibold text-brand-900 mb-1">Move usage billing into NetSuite</p>
          <p className="text-sm text-brand-400 mb-4">
            If your metered billing is done manually or outside NetSuite, we can build the pipeline that makes usage data drive invoices automatically. Same-day response.
          </p>
          <LeadFormLight />
        </div>
      </div>
    </main>
  );
}

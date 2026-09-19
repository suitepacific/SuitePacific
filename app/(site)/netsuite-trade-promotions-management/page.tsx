import type { Metadata } from "next";
import Link from "next/link";
import {
  Tag,
  AlertCircle,
  BarChart2,
  FileText,
  DollarSign,
  CheckCircle,
  Layers,
  ClipboardList,
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
    title: "NetSuite has no native trade promotion record or accrual mechanism.",
    description:
      "Standard NetSuite has no record type for trade deals, no mechanism to calculate promotional liability as products sell against an active deal, and no workflow for matching incoming deduction claims against those accruals. Trade promotion accounting happens entirely outside NetSuite in most FMCG companies, creating gaps between the GL and the actual trade spend.",
  },
  {
    icon: DollarSign,
    title: "Bill-back deductions arrive weeks after the promotional period.",
    description:
      "Off-invoice promotions reduce the invoice price immediately, but bill-back and scan allowance deals generate deduction claims from retailers weeks or months after the products sell. The accrued liability must be matched against incoming claims for reconciliation, and without a deduction claim workflow, the process is entirely manual with no audit trail.",
  },
  {
    icon: BarChart2,
    title: "Trade spend as a percentage of net revenue cannot be reported without custom saved searches.",
    description:
      "Trade spend is a material line on the P&L for most consumer goods companies selling through retail channels. Standard NetSuite has no report that shows accrued trade liability by customer, deal, or period, and no calculation of trade spend as a percentage of net sales without custom saved searches and formula fields.",
  },
];

const SERVICES = [
  {
    icon: Tag,
    title: "Custom Trade Deal Record",
    description:
      "A custom record capturing the customer, item or item group, deal type (off-invoice, bill-back, or scan allowance), promotional rate, date range, and volume tier structure for each active trade promotion.",
  },
  {
    icon: DollarSign,
    title: "Trade Accrual Script",
    description:
      "A scheduled Map/Reduce script that reads sales invoices against active trade deal records, calculates the accrued promotional liability, and posts the journal entry to the trade spend GL account in the correct accounting period.",
  },
  {
    icon: CheckCircle,
    title: "Promotional Pricing Enforcement",
    description:
      "A User Event script on sales order creation that reads active trade deal records for the customer and item, applies the promotional price or off-invoice rate, and overrides or supplements standard price levels for the duration of the deal.",
  },
  {
    icon: ClipboardList,
    title: "Deduction Claim Record",
    description:
      "A custom record that captures incoming retailer deduction claims, links each claim to the relevant trade deal, and routes the claim through an approval workflow before the credit memo is posted to the customer account.",
  },
  {
    icon: BarChart2,
    title: "Trade Spend Dashboard",
    description:
      "A saved search portlet showing accrued trade liability by customer, deal, and accounting period, with trade spend as a percentage of net sales calculated as a formula field for finance and sales teams.",
  },
  {
    icon: FileText,
    title: "Deal Close-Out Report",
    description:
      "A saved search that shows each completed trade deal's total accrued liability against total deductions claimed at deal expiry, with any remaining balance flagged for write-off or dispute resolution.",
  },
];

const HOW_IT_WORKS = [
  {
    step: "01",
    title: "Existing deal structures and deduction processes are reviewed",
    description:
      "Before any scripting, we review how trade deals are currently tracked (typically in spreadsheets), how deduction claims arrive from retailers, and how the accounting team records trade spend. The custom solution is built to match the actual deal structures, not a generic template.",
  },
  {
    step: "02",
    title: "Trade deal record schema and accrual logic are defined before scripting",
    description:
      "We document the exact fields needed on the trade deal record, the accrual calculation methodology (percentage of sales, per-case rate, or fixed amount), and the deduction matching rules. Scripts are built to these specifications.",
  },
  {
    step: "03",
    title: "Accrual scripts and deduction workflows are tested in Sandbox against real invoice data",
    description:
      "Trade accrual calculations are verified against historical invoice and deal data in a Sandbox environment before the scripts go live in Production, confirming the GL postings match expected trade spend amounts.",
  },
];

const FAQ = [
  {
    question: "Which NetSuite firm does trade promotions management?",
    answer:
      "SuitePacific builds trade promotions management customizations in NetSuite for food and beverage companies selling through retail channels. Services include custom trade deal records, trade accrual scripts, promotional pricing enforcement, deduction claim workflows, trade spend dashboards, and deal close-out reports.",
  },
  {
    question: "What is a trade promotion in food and beverage?",
    answer:
      "A trade promotion is a deal made with a retail customer that offers a pricing concession or marketing allowance in exchange for shelf placement, featured pricing, or promotional activity. Common types include off-invoice price reductions, bill-back allowances paid after the promotional period, scan allowances triggered by point-of-sale data, and display or slotting fees. Trade promotions generate financial liabilities that must be accrued as products sell.",
  },
  {
    question: "Can NetSuite manage trade promotions natively?",
    answer:
      "No. Standard NetSuite has no trade promotion record, no accrual mechanism tied to sales volume, and no deduction claim matching workflow. Managing trade promotions in NetSuite requires custom record types for trade deals, scheduled scripts for accrual calculations, and workflow automation for deduction claim processing.",
  },
  {
    question: "How does trade spend accrual work in NetSuite?",
    answer:
      "With SuitePacific's customization, a scheduled Map/Reduce script reads posted sales invoices against active trade deal records each night or each period close. For each invoice line that falls within an active deal, the script calculates the promotional liability, which is either a percentage of sales or a per-case rate, and posts a journal entry to the trade spend GL account and the corresponding accrued liability account. The accrual hits the correct period as products sell, not when the deduction claim arrives.",
  },
  {
    question: "What is a bill-back deduction and how does NetSuite handle it?",
    answer:
      "A bill-back is a promotional arrangement where the full price is invoiced to the retailer but the retailer subsequently deducts the promotional amount from their payment or submits a claim for reimbursement. In NetSuite, handling bill-back deductions requires a deduction claim record that captures the retailer's claim, links it to the relevant trade deal, validates the amount against the accrued liability, and routes it through an approval workflow before the credit memo is posted to the customer account.",
  },
  {
    question: "How does SuitePacific build trade promotions management in NetSuite?",
    answer:
      "SuitePacific starts by reviewing the existing deal structures, deduction workflows, and GL treatment used by the company. A custom trade deal record is designed to capture the relevant deal parameters for each promotion type. Accrual scripts are built and tested against historical invoice data in Sandbox. Deduction claim records and approval workflows are configured for the company's review process. Trade spend dashboards and deal close-out reports are built in saved searches. The full system is tested and documented before going live.",
  },
];

export const metadata: Metadata = {
  title: "NetSuite Trade Promotions Management | SuitePacific",
  description:
    "NetSuite trade promotions management for food and beverage companies. Custom trade deal records, accrual scripts, deduction claim workflows, and trade spend dashboards.",
  alternates: { canonical: "/netsuite-trade-promotions-management" },
  openGraph: {
    title: "NetSuite Trade Promotions Management | SuitePacific",
    description:
      "NetSuite trade promotions management for food and beverage companies. Custom trade deal records, accrual scripts, deduction claim workflows, and trade spend dashboards.",
    url: `${SITE_URL}/netsuite-trade-promotions-management`,
    type: "website",
    images: [{ url: `${SITE_URL}/og-default.png`, width: 1200, height: 630 }],
  },
};

export default function TradePromotionsManagementPage() {
  return (
    <main className="pt-32 pb-24 sm:pt-40 sm:pb-32">
      <BreadcrumbJsonLd
        items={[
          { name: "Home", url: SITE_URL },
          { name: "NetSuite Trade Promotions Management", url: `${SITE_URL}/netsuite-trade-promotions-management` },
        ]}
      />
      <FaqJsonLd items={FAQ} />
      <ServiceJsonLd
        name="NetSuite Trade Promotions Management"
        description="Custom trade deal records, trade accrual scripts, promotional pricing enforcement, deduction claim workflows, and trade spend dashboards for food and beverage companies on NetSuite."
        url={`${SITE_URL}/netsuite-trade-promotions-management`}
        serviceType="NetSuite Food and Beverage Configuration"
        offers={[
          { name: "Care", price: 799, description: "10 hours/month: trade deal record setup, accrual script builds, and trade spend saved searches. Month-to-month after 3-month minimum." },
          { name: "Care Plus", price: 1499, description: "20 hours/month: full trade promotions system including accrual scripts, deduction workflows, pricing enforcement, and dashboards. Month-to-month." },
          { name: "Care Pro", price: 2499, description: "35 hours/month: comprehensive trade promotions management with ongoing account support for food and beverage companies. Month-to-month." },
        ]}
      />
      <OrganizationJsonLd />

      <div className="mx-auto max-w-3xl px-6 lg:px-8">
        <SectionHeading
          as="h1"
          eyebrow="Food & Beverage"
          title="NetSuite Trade Promotions Management"
          subtitle="Custom trade deal records, accrual scripts, deduction claim workflows, and trade spend dashboards for food and beverage companies selling through retail channels."
          align="left"
        />

        <div className="mt-6 rounded-2xl border border-brand-100 bg-white p-5 shadow-soft">
          <LeadFormLight />
        </div>
        <p className="mt-3 text-xs text-brand-400">NetSuite-certified · Food &amp; beverage specialists · Month-to-month</p>
        <p className="mt-3 text-xs text-brand-300">Published September 2026</p>

        <div className="mt-6 rounded-2xl border-l-4 border-accent bg-brand-50/50 p-5">
          <p className="text-xs font-semibold uppercase tracking-wide text-accent mb-2">Quick answer</p>
          <p className="text-sm text-brand-700 leading-relaxed">
            SuitePacific builds trade promotions management customizations in NetSuite for food and
            beverage companies that sell through retail channels and need to manage promotional deal
            structures, accrue trade spend as products sell, and reconcile incoming deduction claims
            against active deals. Standard NetSuite has no native trade promotion record, no accrual
            mechanism tied to sales volume, and no deduction claim matching workflow. SuitePacific
            creates a custom trade deal record capturing customer, item group, deal type, rate, and
            date range; a scheduled Map/Reduce accrual script that calculates the liability from
            sales invoices against active deals and posts the journal entry to the correct GL period;
            promotional pricing enforcement on sales orders; a deduction claim record that routes
            through approval before posting the credit; a trade spend dashboard showing accrued
            liability by customer and period; and a deal close-out report comparing total accruals
            against total deductions at deal expiry. Plans start at $799 per month, month-to-month.
          </p>
        </div>

        {/* Pain points */}
        <div className="mt-14" data-section="pain-points">
          <h2 className="text-lg font-semibold text-brand-900 mb-6">
            Common situations that bring FMCG companies here
          </h2>
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

        {/* Services */}
        <div className="mt-14" data-section="services">
          <h2 className="text-lg font-semibold text-brand-900 mb-1">
            What SuitePacific does for trade promotions management
          </h2>
          <p className="text-sm text-brand-400 mb-6">
            Deal records, accrual scripting, and deduction workflows scoped to your retail channel structure.
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            {SERVICES.map((item) => (
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
          <h2 className="text-lg font-semibold text-brand-900 mb-6">
            How we approach trade promotions management work
          </h2>
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
          <p className="mt-5 text-sm text-brand-400">
            When trade deductions and approvals are part of the workflow, see how that work relates
            to our{" "}
            <Link href="/netsuite-approval-workflows" className="text-accent hover:underline">
              NetSuite approval workflow
            </Link>{" "}
            builds and{" "}
            <Link href="/netsuite-suitescript-development" className="text-accent hover:underline">
              SuiteScript development
            </Link>{" "}
            services.
          </p>
        </div>

        {/* Why SuitePacific */}
        <div className="mt-14 rounded-2xl border-2 border-accent/30 bg-gradient-to-br from-accent/5 to-transparent p-6">
          <p className="text-xs font-semibold uppercase tracking-wide text-accent mb-3">
            Why SuitePacific for trade promotions management
          </p>
          <h2 className="text-base font-semibold text-brand-900 mb-3">
            Trade promotion accruals that match your sales cycle, not the deduction cycle.
          </h2>
          <p className="text-sm text-brand-500 mb-4">
            The core problem with trade promotions in NetSuite is timing: deduction claims from
            retailers arrive weeks after the products sold and the promotional period closed. A
            proper system accrues the liability when the sale happens, so the GL reflects trade
            spend in the right period and the deduction claim is matched against an existing balance,
            not entered as a surprise expense.
          </p>
          <ul className="space-y-2 text-sm text-brand-500 mb-4">
            <li className="flex items-start gap-2">
              <span className="text-accent font-bold mt-0.5">→</span>
              Oracle NetSuite Certified SuiteCloud Developer II and Administrator Professional
            </li>
            <li className="flex items-start gap-2">
              <span className="text-accent font-bold mt-0.5">→</span>
              Accrual scripts verified against real invoice and deal data in Sandbox before production
            </li>
            <li className="flex items-start gap-2">
              <span className="text-accent font-bold mt-0.5">→</span>
              Direct access to the developer doing the work, not a support queue
            </li>
            <li className="flex items-start gap-2">
              <span className="text-accent font-bold mt-0.5">→</span>
              US-based, month-to-month after a three-month minimum, starting at $799/month
            </li>
          </ul>
          <p className="text-sm text-brand-400">
            Related:{" "}
            <Link href="/industries/food-beverage" className="text-accent hover:underline">
              NetSuite for food and beverage companies
            </Link>{" "}
            and{" "}
            <Link href="/netsuite-suitescript-development" className="text-accent hover:underline">
              NetSuite SuiteScript development
            </Link>
            .
          </p>
        </div>

        <div className="mt-10 rounded-2xl border border-brand-100 bg-white p-5 shadow-soft">
          <LeadFormLight />
        </div>

        {/* Related reading */}
        <div className="mt-10 rounded-2xl border border-brand-100 bg-brand-50/30 p-5 sm:p-6">
          <p className="text-sm font-semibold text-brand-900 mb-3">Related reading</p>
          <ul className="space-y-2.5">
            <li className="text-sm text-brand-400">
              <Link href="/industries/food-beverage" className="text-accent hover:underline">
                NetSuite for food and beverage companies
              </Link>{" "}
              covers the full set of FMCG customizations including shelf life tracking, EDI
              integration, and lot traceability alongside trade promotions.
            </li>
            <li className="text-sm text-brand-400">
              <Link href="/netsuite-approval-workflows" className="text-accent hover:underline">
                NetSuite approval workflows
              </Link>{" "}
              explains how SuiteFlow workflows handle multi-step approval routing for deduction
              claims and promotional pricing exceptions.
            </li>
            <li className="text-sm text-brand-400">
              <Link href="/netsuite-suitescript-development" className="text-accent hover:underline">
                NetSuite SuiteScript development
              </Link>{" "}
              covers the scripting approaches used to build trade accrual Map/Reduce scripts and
              promotional pricing enforcement User Event scripts.
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

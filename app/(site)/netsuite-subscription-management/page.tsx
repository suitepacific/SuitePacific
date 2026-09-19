import type { Metadata } from "next";
import Link from "next/link";
import {
  RefreshCw,
  AlertCircle,
  ArrowUpDown,
  XCircle,
  LayoutDashboard,
  GitBranch,
  Zap,
  Users,
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
    title: "Standard NetSuite customer records do not track subscription state",
    description:
      "There is no native subscription status field on a NetSuite customer record. Whether a customer is trialing, active, past due, or churned is tracked in a separate system, in a spreadsheet, or in a custom field someone added without documentation. When the subscription state changes, there is no automated process to reflect it in NetSuite.",
  },
  {
    icon: RefreshCw,
    title: "Renewals require manual invoice creation each billing cycle",
    description:
      "Without SuiteBilling or renewal automation, finance manually creates invoices for each renewal. For accounts with dozens or hundreds of subscriptions renewing each month, the manual process creates billing errors, missed renewals, and late invoices. The problem compounds when different customers have different renewal dates and billing terms.",
  },
  {
    icon: ArrowUpDown,
    title: "Mid-term upgrades and downgrades require proration calculations done in spreadsheets",
    description:
      "When a customer upgrades mid-term, the correct proration depends on the days remaining in the period, the old and new rates, and how the contract defines proration. Standard NetSuite has no proration logic. The calculation is typically done in a spreadsheet, manually entered as a credit memo and new invoice, and then reconciled against the contract at renewal.",
  },
  {
    icon: XCircle,
    title: "Cancellations leave open recurring charges and no audit trail",
    description:
      "When a customer cancels, someone has to manually find and close the recurring charges, issue a credit if the customer is owed a refund, and update whatever field is used to track subscription status. If the cancellation is not processed completely, the customer continues to receive invoices. There is no workflow that triggers the cancellation process automatically.",
  },
  {
    icon: LayoutDashboard,
    title: "No native subscription health dashboard",
    description:
      "There is no standard NetSuite view that shows how many subscriptions are active, how many are past due, which customers have open renewal invoices, or which accounts are flagged for cancellation. Leadership and customer success teams build these views in external tools because the data is not surfaced in NetSuite in a usable form.",
  },
  {
    icon: GitBranch,
    title: "CRM opportunity data does not flow into NetSuite subscription records",
    description:
      "Sales closes a deal in the CRM, but creating the subscription record in NetSuite is a manual step. The opportunity-to-subscription handoff requires someone to read the contract, enter the subscription details, and attach the right billing items. Errors in this step produce wrong invoice amounts from the first billing cycle.",
  },
];

const WHAT_WE_BUILD = [
  {
    step: "01",
    title: "Subscription record model or SuiteBilling configuration",
    description:
      "We either build a custom subscription record model using custom records and fields that tracks subscription state natively in NetSuite, or we configure SuiteBilling as the subscription engine. The right choice depends on the billing model, volume, and whether the account is already running SuiteBilling. Both approaches produce a single source of truth for subscription state in NetSuite.",
  },
  {
    step: "02",
    title: "Renewal automation scripts",
    description:
      "We write SuiteScript scheduled scripts that identify subscriptions due for renewal, create the renewal invoice or charge based on the subscription record, and update the subscription status and renewal date. The scripts run on a schedule that matches the billing frequency and handle edge cases such as price changes at renewal, multi-year terms, and evergreen renewals.",
  },
  {
    step: "03",
    title: "Proration calculation logic for mid-term upgrades and downgrades",
    description:
      "We build the proration calculation into a SuiteScript or workflow that fires when a subscription change is applied. The script calculates the credit for the unused portion of the current period and the charge for the remaining days at the new rate, creates the credit memo and new invoice, and updates the subscription record. The proration method is configurable to match the contract terms.",
  },
  {
    step: "04",
    title: "Cancellation workflow and charge cleanup",
    description:
      "We build a workflow or script that handles the cancellation process: closing open recurring charges, calculating any refund owed, creating the credit memo, updating the subscription status, and logging the cancellation reason. The workflow ensures nothing is left open after a cancellation is processed.",
  },
];

const WHY_SP = [
  {
    icon: Zap,
    title: "SuiteScript automation for the billing steps NetSuite cannot handle natively",
    description:
      "Renewal automation, proration logic, and cancellation workflows require SuiteScript. SuitePacific holds the Oracle NetSuite SuiteCloud Developer II certification and builds the automation scripts that handle subscription state changes without manual intervention.",
  },
  {
    icon: LayoutDashboard,
    title: "Subscription health dashboard included",
    description:
      "Every subscription management engagement includes a dashboard that shows active, past-due, renewal-due, and recently cancelled subscriptions. Finance and customer success get a live view of subscription state without leaving NetSuite.",
  },
  {
    icon: GitBranch,
    title: "CRM integration for opportunity-to-subscription automation",
    description:
      "When a deal closes in the CRM, the subscription record in NetSuite should be created automatically. We build the integration between the CRM (Salesforce, HubSpot, or others) and NetSuite that creates the subscription record from the opportunity data and triggers the first billing cycle.",
  },
  {
    icon: Users,
    title: "Direct access to the developer doing the work",
    description:
      "Subscription management builds require back-and-forth: reviewing the billing model, agreeing on proration logic, testing edge cases, and validating the automation against real subscription data. That process works best as a direct conversation with the developer, not through a ticket queue.",
  },
];

const FAQ = [
  {
    question: "Which NetSuite firm does subscription management configuration?",
    answer:
      "SuitePacific configures subscription lifecycle management in NetSuite for SaaS companies that need trial-to-paid conversions, automated renewals, proration logic, and cancellation workflows. The engagement covers the subscription record model or SuiteBilling configuration, renewal automation scripts, proration calculation logic, cancellation workflow, subscription status dashboard, and CRM integration for opportunity-to-subscription automation. SuitePacific is Oracle NetSuite Certified (SuiteCloud Developer II and Administrator Professional), US-based, and works directly with operations and finance teams. Plans start at $799 per month on month-to-month terms after a three-month minimum.",
  },
  {
    question: "Should we use SuiteBilling or a custom subscription record model?",
    answer:
      "SuiteBilling is NetSuite&apos;s native subscription billing module and handles recurring charge generation, change orders, and revenue arrangement creation for ARM automatically once configured. It is the right choice for accounts that need the full billing pipeline, already have SuiteBilling enabled, or plan to use ARM for revenue recognition. A custom subscription record model using custom records and fields is simpler to implement and easier for non-technical teams to manage; it is appropriate for companies with straightforward billing models or those not ready for the full SuiteBilling configuration investment. We assess the billing model and recommend the right approach as part of the scoping conversation.",
  },
  {
    question: "How does NetSuite handle subscription renewals without SuiteBilling?",
    answer:
      "Without SuiteBilling, NetSuite has no native renewal mechanism. Renewals must be handled either manually (finance creates an invoice each cycle) or through a custom SuiteScript scheduled script that identifies due renewals, creates the invoice, and updates the subscription record. We build and maintain the renewal script as part of the subscription management engagement. For accounts already on SuiteBilling, renewal billing is handled by the SuiteBilling charge generation pipeline, which we can configure and troubleshoot as part of the same engagement.",
  },
  {
    question: "How is proration calculated for mid-term upgrades and downgrades?",
    answer:
      "Proration is calculated by dividing the period price by the number of days in the period and multiplying by the days remaining (for the credit) or the days already elapsed (for the new charge). The proration method used, whether based on calendar days, billing days, or a fixed ratio, depends on how the contract defines it. SuitePacific builds the proration logic to match the contract terms. The calculation runs in a SuiteScript that fires when the subscription change record is saved, creates the credit memo for the unused portion of the old rate, and creates a new invoice for the remaining days at the new rate.",
  },
  {
    question: "Can the subscription record in NetSuite be created automatically when a deal closes in Salesforce?",
    answer:
      "Yes. We build the integration between Salesforce and NetSuite that reads the closed-won opportunity record, maps the opportunity fields to the NetSuite subscription record, creates the subscription in NetSuite, and triggers the first billing cycle. The integration can run in near real time using Salesforce outbound messaging or on a scheduled sync. The exact field mapping depends on how the CRM opportunity is structured and what data the subscription record requires.",
  },
  {
    question: "What does a subscription health dashboard in NetSuite show?",
    answer:
      "The subscription health dashboard is a NetSuite dashboard with KPI portlets and saved search portlets that show: total active subscriptions and ARR, subscriptions due for renewal in the next 30 and 90 days, past-due subscriptions with open invoices, subscriptions flagged for cancellation, and recently churned accounts with their last ARR. The portlets update in real time from the subscription records and can be filtered by customer segment, billing frequency, or renewal date range. We configure the dashboard as part of the subscription management build.",
  },
];

export const metadata: Metadata = {
  title: "NetSuite Subscription Management for SaaS Companies",
  description:
    "SuitePacific configures subscription lifecycle management in NetSuite: renewal automation, proration logic for upgrades and downgrades, cancellation workflows, and subscription health dashboards for SaaS companies.",
  alternates: { canonical: "/netsuite-subscription-management" },
  openGraph: {
    title: "NetSuite Subscription Management for SaaS Companies",
    description:
      "Renewal automation, proration logic, cancellation workflows, and subscription health dashboards for SaaS companies on NetSuite. Oracle-certified, direct developer access.",
    url: `${SITE_URL}/netsuite-subscription-management`,
    type: "website",
    images: [{ url: `${SITE_URL}/og-default.png`, width: 1200, height: 630 }],
  },
};

export default function SubscriptionManagementPage() {
  return (
    <main className="pt-32 pb-24 sm:pt-40 sm:pb-32">
      <BreadcrumbJsonLd
        items={[
          { name: "Home", url: SITE_URL },
          { name: "NetSuite Subscription Management", url: `${SITE_URL}/netsuite-subscription-management` },
        ]}
      />
      <FaqJsonLd items={FAQ} />
      <ServiceJsonLd
        name="NetSuite Subscription Management"
        description="Subscription lifecycle management in NetSuite: trial-to-paid conversions, automated renewals, proration logic for upgrades and downgrades, cancellation workflows, and subscription health dashboards for SaaS companies."
        url={`${SITE_URL}/netsuite-subscription-management`}
        serviceType="NetSuite SaaS Configuration"
        offers={[
          { name: "Care", price: 799, description: "10 hours/month: renewal script maintenance, cancellation workflow updates, subscription dashboard tuning. Month-to-month after 3-month minimum." },
          { name: "Care Plus", price: 1499, description: "20 hours/month: full subscription lifecycle build plus ongoing SaaS operations support. Month-to-month." },
          { name: "Care Pro", price: 2499, description: "35 hours/month: comprehensive subscription management including CRM integration and ARR reporting. Month-to-month." },
        ]}
      />
      <OrganizationJsonLd />

      <div className="mx-auto max-w-3xl px-6 lg:px-8">
        <SectionHeading
          as="h1"
          eyebrow="SaaS and Technology"
          title="NetSuite Subscription Management"
          subtitle="Standard NetSuite does not track subscription state, automate renewals, calculate proration, or handle cancellations. SuitePacific builds the subscription record model, renewal automation scripts, proration logic, and cancellation workflows that make the subscription lifecycle work without manual intervention."
          align="left"
        />

        <div className="mt-6 rounded-2xl border border-brand-100 bg-white p-5 shadow-soft">
          <LeadFormLight />
        </div>
        <p className="mt-3 text-xs text-brand-400">NetSuite-certified · SaaS specialists · Month-to-month</p>
        <p className="mt-3 text-xs text-brand-300">Last updated September 2026</p>

        <div className="mt-6 rounded-2xl border-l-4 border-accent bg-brand-50/50 p-5">
          <p className="text-xs font-semibold uppercase tracking-wide text-accent mb-2">Quick answer</p>
          <p className="text-sm text-brand-700 leading-relaxed">SuitePacific configures subscription lifecycle management in NetSuite for SaaS companies that need trial-to-paid conversions, automated renewals, proration logic for upgrades and downgrades, and cancellation handling to work without manual intervention. Standard NetSuite customer records do not track subscription state; there is no native subscription health dashboard, no renewal automation, and no proration calculation built into the base platform. SuitePacific builds the subscription record model or SuiteBilling configuration, renewal automation scripts, proration logic for mid-term changes, cancellation workflows that close open recurring charges, and a subscription status dashboard that shows the current state of every active subscription. For companies using a CRM alongside NetSuite, the integration between opportunity close and subscription record creation can be automated as part of the same engagement. Oracle-certified (SuiteCloud Developer II and Administrator Professional). Plans start at $799 per month on month-to-month terms after a three-month minimum.</p>
        </div>

        {/* Pain points */}
        <div className="mt-14">
          <h2 className="text-lg font-semibold text-brand-900 mb-2">
            What does NetSuite not handle natively for subscription management?
          </h2>
          <p className="text-sm text-brand-400 mb-6">
            These are the subscription lifecycle gaps that SaaS companies hit when NetSuite is used without custom configuration or SuiteBilling.
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
            What does SuitePacific build for subscription lifecycle management?
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

        {/* Why SuitePacific */}
        <div className="mt-14 rounded-2xl border-2 border-accent/30 bg-gradient-to-br from-accent/5 to-transparent p-6">
          <p className="text-xs font-semibold uppercase tracking-wide text-accent mb-3">Why SuitePacific for subscription management</p>
          <h2 className="text-base font-semibold text-brand-900 mb-3">
            Subscription lifecycle automation in NetSuite requires SuiteScript expertise and familiarity with the SaaS billing model.
          </h2>
          <p className="text-sm text-brand-500 mb-4">
            Renewal automation, proration logic, and cancellation workflows are not standard NetSuite features. They require SuiteScript development, an understanding of how SuiteBilling structures subscription data, and testing against the edge cases that surface in a real subscription book: co-term renewals, partial-period credits, mid-month upgrades, and multi-year contracts.
          </p>
          <ul className="space-y-2 text-sm text-brand-500 mb-4">
            <li className="flex items-start gap-2"><span className="text-accent font-bold mt-0.5">→</span> Oracle NetSuite Certified SuiteCloud Developer II and Administrator Professional</li>
            <li className="flex items-start gap-2"><span className="text-accent font-bold mt-0.5">→</span> SuiteScript renewal scripts, proration calculators, and cancellation workflows built and tested in Sandbox</li>
            <li className="flex items-start gap-2"><span className="text-accent font-bold mt-0.5">→</span> Subscription health dashboard included with every engagement</li>
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
          <p className="text-sm font-semibold text-brand-900 mb-1">Automate your subscription lifecycle in NetSuite</p>
          <p className="text-sm text-brand-400 mb-4">
            Tell us where the manual steps are today: renewals, proration, cancellations, or the CRM handoff. We&apos;ll scope what automation looks like for your billing model.
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
              <Link href="/netsuite-arr-mrr-reporting" className="text-sm text-accent hover:underline">
                NetSuite ARR and MRR Reporting
              </Link>
              <p className="text-xs text-brand-400 mt-0.5">
                SuiteQL queries and dashboard portlets that calculate subscription revenue metrics from billing data.
              </p>
            </li>
            <li>
              <Link href="/netsuite-workflow-automation" className="text-sm text-accent hover:underline">
                NetSuite Workflow Automation
              </Link>
              <p className="text-xs text-brand-400 mt-0.5">
                Approval workflows, record automation, and SuiteFlow builds across all NetSuite modules.
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
              <Link href="/netsuite-usage-based-billing" className="text-sm text-accent hover:underline">
                NetSuite Usage-Based Billing
              </Link>
              <p className="text-xs text-brand-400 mt-0.5">
                Import scripts and invoice generation for metered and consumption billing models.
              </p>
            </li>
          </ul>
        </div>

        <ServiceFaqSection items={FAQ} />

        <div className="mt-10 rounded-2xl border border-brand-100 bg-white p-5 shadow-soft">
          <p className="text-sm font-semibold text-brand-900 mb-1">Stop processing subscription changes manually</p>
          <p className="text-sm text-brand-400 mb-4">
            Renewals, upgrades, downgrades, and cancellations should not require manual invoice creation. We build the automation. Same-day response.
          </p>
          <LeadFormLight />
        </div>
      </div>
    </main>
  );
}

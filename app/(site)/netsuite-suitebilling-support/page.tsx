import type { Metadata } from "next";
import Link from "next/link";
import {
  AlertCircle,
  RotateCcw,
  BarChart2,
  RefreshCw,
  FileX,
  DollarSign,
  ShieldCheck,
  Zap,
  Users,
  Layers,
} from "lucide-react";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Card } from "@/components/ui/Card";
import { IconBadge } from "@/components/ui/IconBadge";
import {
  BreadcrumbJsonLd,
  FaqJsonLd,
  ServiceJsonLd,
  OrganizationJsonLd,
  VideoObjectJsonLd,
} from "@/components/seo/JsonLd";
import { ServiceFaqSection } from "@/components/ui/ServiceFaqSection";
import { LeadFormLight } from "@/components/sections/LeadFormLight";
import { SuitePacificCallout } from "@/components/sections/SuitePacificCallout";
import { SITE_URL } from "@/lib/content";

const FAILURE_MODES = [
  {
    icon: AlertCircle,
    title: "Subscriptions are active but charges or invoices are not being generated",
    description:
      "The subscription record exists, the customer is live, and billing should be running, but no invoices are appearing. The billing pipeline in SuiteBilling has four stages and the failure is silent at every one of them: no error, just no invoice.",
  },
  {
    icon: RotateCcw,
    title: "A change order was applied with the wrong effective date or proration setting",
    description:
      "An upgrade, downgrade, or cancellation was applied mid-period, but the proration calculation does not match what the customer was quoted. Or the effective date was entered incorrectly and the new rate started too early or too late. Once applied, a change order cannot be undone without creating correcting entries.",
  },
  {
    icon: BarChart2,
    title: "SuiteBilling and Advanced Revenue Management are both active but Revenue Arrangements are not being created",
    description:
      "The subscription invoices are generating correctly, but ARM is not creating Revenue Arrangements. Revenue posts directly to income instead of Deferred Revenue, the month-end recognition schedule is missing, and the Deferred Revenue balance does not reconcile to the subscription book.",
  },
  {
    icon: RefreshCw,
    title: "Renewal billing produced duplicate charges or missed a cycle",
    description:
      "An evergreen subscription renewed and generated charges for the new period, but charges from the prior period were also still open, resulting in a double invoice. Or the renewal date passed, no charge was generated, and the revenue recognition gap was only caught at month-end.",
  },
  {
    icon: FileX,
    title: "SuiteBilling was set up by the implementation partner and no one knows how it is configured",
    description:
      "The original implementation partner built the subscription items, billing frequencies, and pricing configuration, documented nothing, and is no longer involved. Support requests require reverse-engineering the setup each time, and every SuiteBilling update from Oracle is a risk rather than a routine event.",
  },
  {
    icon: DollarSign,
    title: "The Deferred Revenue balance does not reconcile to the subscription book",
    description:
      "The total unrecognized subscription revenue in ARM does not match the expected balance calculated from active subscriptions and billing dates. The gap may be from subscriptions without Revenue Arrangements, incorrectly dated Revenue Elements, or recognition plan mismatches introduced when change orders were applied.",
  },
];

const HOW_IT_WORKS = [
  {
    step: "01",
    title: "Review the subscription configuration, billing pipeline, and identify where it is breaking",
    description:
      "We access your Sandbox and Production accounts and trace the billing pipeline from subscription status through to the charge and invoice records. For ARM integration issues, we review the Revenue Arrangements and Revenue Elements for the affected subscriptions. We identify the root cause before proposing or making any changes.",
  },
  {
    step: "02",
    title: "Test the fix in Sandbox before touching Production",
    description:
      "SuiteBilling configuration changes affect live billing immediately in Production. Every fix, whether a subscription status correction, a change order reversal, an item configuration update, or an ARM integration repair, is built and validated in Sandbox first. We confirm the correct charges, Revenue Arrangements, and recognition schedules are produced before deploying.",
  },
  {
    step: "03",
    title: "Deploy and validate in Production, then document what was changed",
    description:
      "Once Sandbox confirms the fix, we deploy to Production and validate that the billing pipeline is running correctly. We document what was broken, what was changed, and what the current subscription and ARM configuration looks like, so the account is not left in the same undocumented state.",
  },
];

const WHY_SP = [
  {
    icon: Layers,
    title: "SuiteBilling and ARM covered together",
    description:
      "SuiteBilling issues often surface in the ARM integration: Revenue Arrangements that do not exist, recognition schedules that do not match billing periods, and Deferred Revenue balances that cannot be reconciled. We diagnose both sides of the integration, not just the billing layer.",
  },
  {
    icon: ShieldCheck,
    title: "NetSuite-certified with SuiteScript capability",
    description:
      "SuiteBilling support sometimes requires more than configuration review. Subscription data migrations, custom billing logic, and integration fixes between SuiteBilling and external CRM or billing systems require SuiteScript. SuitePacific holds Oracle NetSuite SuiteCloud Developer II and Administrator Professional certifications.",
  },
  {
    icon: Zap,
    title: "Fast response for billing failures",
    description:
      "An invoice run that produced no invoices, a renewal that doubled a customer's charge, or a deferred revenue balance that cannot close the books: these are urgent. We prioritize live billing failures and respond same-business-day.",
  },
  {
    icon: Users,
    title: "Direct access to the developer, not a ticket queue",
    description:
      "SuiteBilling problems require back-and-forth: sharing the subscription configuration, walking through the billing pipeline, testing the correction. That communication works best directly between you and the developer doing the work, not through a support portal.",
  },
];

const RESOURCES = [
  {
    href: "/blog/netsuite-suitebilling-charge-generation",
    title: "Why SuiteBilling Charges Are Not Being Generated",
    description:
      "The four-stage billing pipeline, the five failure points that produce missing charges, and how to diagnose which stage broke.",
  },
  {
    href: "/blog/netsuite-suitebilling-change-orders",
    title: "SuiteBilling Change Orders: Upgrades, Downgrades, and Cancellations",
    description:
      "How the change order process works, what proration does at each stage, and the common mistakes that produce incorrect invoices after a subscription modification.",
  },
  {
    href: "/blog/netsuite-suitebilling-arm-integration",
    title: "SuiteBilling and Advanced Revenue Management: What the Integration Actually Does",
    description:
      "How Revenue Arrangements, Revenue Elements, and Revenue Plans connect SuiteBilling to ARM, and the four specific points where the integration breaks post-implementation.",
  },
];

const FAQ = [
  {
    question: "What does NetSuite SuiteBilling support from SuitePacific cover?",
    answer:
      "We support live SuiteBilling configurations: diagnosing why charges or invoices are not being generated, reviewing and correcting subscription and subscription line configuration, fixing change order errors that produced incorrect invoices, diagnosing and repairing the SuiteBilling and Advanced Revenue Management integration, reviewing Revenue Arrangements and recognition schedules, and handling ongoing SuiteBilling support as part of a post-go-live retainer.",
  },
  {
    question: "Charges are not generating for our subscriptions. Where do we start?",
    answer:
      "The first check is subscription status: charges only generate for Active subscriptions. If the status is correct, check whether the subscription start date has passed and whether individual subscription line start dates are also in the past. If both are correct, the issue is likely in the scheduled rating or charge generation task. Check whether Charge records exist in any status, which tells you whether rating has run at all. If Charge records exist but no invoices appear, the problem is in the invoice generation step rather than rating.",
  },
  {
    question: "A change order was applied with the wrong proration setting and now invoices are incorrect. What can we do?",
    answer:
      "Once a change order is Applied, the line revisions are locked at the effective date and cannot be undone directly. Correcting the billing impact requires one or more of: a credit memo against the incorrect invoice, a second change order to reverse the incorrect configuration and re-apply with the correct proration, and manual journal entries if the revenue recognition side was also affected. We can review the specific situation and recommend the cleanest correction path.",
  },
  {
    question: "We have SuiteBilling and ARM but Revenue Arrangements are not being created. What causes this?",
    answer:
      "The most common cause is that the subscription items are not configured with a Revenue Recognition Rule and Revenue Plan Template in the item record. Without these fields, NetSuite does not route the subscription revenue through ARM: it posts directly to income rather than Deferred Revenue, and no Revenue Arrangement or Revenue Elements are created. Check the item records for the subscription items first. If the fields are populated but Arrangements are still missing, there may be a configuration issue in the ARM setup or a timing issue with how the Arrangement creation process runs.",
  },
  {
    question: "Our Deferred Revenue balance does not reconcile to our subscription book. What typically causes this?",
    answer:
      "Common causes are subscriptions that existed before ARM was enabled and were never given Revenue Arrangements, Revenue Plans that are not set to the correct service period, change orders that created Revenue Element adjustments that did not fully offset the original Elements, and manual journal entries that touched the Deferred Revenue account outside of ARM. A systematic review of the Revenue Arrangements for all active subscriptions, compared against the expected unrecognized balance per subscription, usually isolates the gap.",
  },
  {
    question: "Our implementation partner set up SuiteBilling and is gone. Can SuitePacific take over?",
    answer:
      "Yes. Taking over an undocumented SuiteBilling configuration is a common starting point. The first step is a review of the current subscription items, billing frequencies, pricing configuration, and ARM item setup. We document what we find, identify anything that is likely to cause issues, and from that point handle ongoing SuiteBilling support as part of a post-go-live retainer.",
  },
  {
    question: "Do we need a retainer, or can SuitePacific help with a one-time SuiteBilling issue?",
    answer:
      "Both. We work with new clients on one-time SuiteBilling issues with no retainer required to start. For a specific charge generation failure, a change order correction, or an ARM integration review, we work on a project basis. Existing retainer clients receive SuiteBilling support as part of their ongoing engagement.",
  },
];

export const metadata: Metadata = {
  title: "NetSuite SuiteBilling Support",
  description:
    "NetSuite SuiteBilling post-go-live support for subscription billing issues: charges not generating, change order errors, ARM integration gaps, renewal problems, and deferred revenue reconciliation.",
  alternates: { canonical: "/netsuite-suitebilling-support" },
  openGraph: {
    title: "NetSuite SuiteBilling Support",
    description:
      "SuiteBilling support for live NetSuite accounts: charges not generating, change order errors, ARM integration gaps, and deferred revenue reconciliation. Oracle-certified, direct developer access.",
    url: "https://suitepacific.com/netsuite-suitebilling-support",
    type: "website",
    images: [{ url: "https://suitepacific.com/og-default.png", width: 1200, height: 630 }],
  },
};

export default function NetSuiteSuiteBillingSupportPage() {
  return (
    <main className="pt-32 pb-24 sm:pt-40 sm:pb-32">
      <BreadcrumbJsonLd
        items={[
          { name: "Home", url: SITE_URL },
          { name: "NetSuite SuiteBilling Support", url: `${SITE_URL}/netsuite-suitebilling-support` },
        ]}
      />
      <FaqJsonLd items={FAQ} />
      <ServiceJsonLd
        name="NetSuite SuiteBilling Support"
        description="NetSuite SuiteBilling post-go-live support for subscription billing issues including charges not generating, change order errors, ARM integration gaps, and deferred revenue reconciliation."
        url={`${SITE_URL}/netsuite-suitebilling-support`}
        serviceType="NetSuite Support"
      />
      <OrganizationJsonLd />
      <VideoObjectJsonLd
        name="SuitePacific Introduction: NetSuite Post-Go-Live Support and Consulting"
        description="An introduction to SuitePacific, a boutique NetSuite post-go-live support team providing SuiteScript development, workflow automation, and ongoing account optimization for businesses already live on NetSuite."
        videoId="IQvWN_yZ24A"
        duration="PT18S"
        uploadDate="2026-08-12"
        isShort
      />

      <div className="mx-auto max-w-3xl px-6 lg:px-8">
        <SectionHeading
          as="h1"
          eyebrow="SuiteBilling"
          title="NetSuite SuiteBilling Support and Troubleshooting"
          subtitle="SuiteBilling edge cases multiply as the billing model evolves and most NetSuite partners lack deep SuiteBilling expertise. SuitePacific supports SuiteBilling and ARM for post-go-live accounts, extending with SuiteScript where native billing logic cannot reach."
          align="left"
        />

        <div className="mt-6 rounded-2xl border border-brand-100 bg-white p-5 shadow-soft">
          <LeadFormLight />
        </div>
        <p className="mt-3 text-xs text-brand-400">
          Same-day response · NetSuite-certified · SuiteBilling + ARM · Direct developer access
        </p>
        <p className="mt-2 text-xs text-brand-300">
          <time dateTime="2026-08">Published August 2026</time>
        </p>

        <p className="mt-6 text-sm text-brand-400">
          NetSuite SuiteBilling is the platform&apos;s subscription billing module, used by SaaS and subscription businesses to manage recurring charges, renewals, and mid-term subscription changes. SuiteBilling problems after go-live are rarely obvious. The billing pipeline fails
          silently: no error message, just no invoice. A change order applied with the wrong
          proration produces an incorrect charge that is only caught when the customer calls.
          The ARM integration creates Revenue Arrangements for most subscriptions but misses
          a subset, and the Deferred Revenue balance drifts. The companies that run into these
          issues are typically the ones whose SuiteBilling setup was never fully documented,
          whose implementation partner is no longer involved, or whose configuration was
          built for a simpler subscription model than the one currently in production.
          SuitePacific supports live SuiteBilling accounts: diagnosing what is broken,
          fixing it in Sandbox, and maintaining the billing and revenue recognition pipeline
          ongoing.
        </p>

        <div className="mt-8 rounded-xl bg-brand-50/60 border border-brand-100 px-5 py-4">
          <p className="text-xs font-semibold text-accent uppercase tracking-wide mb-2">Quick answer</p>
          <p className="text-sm text-brand-700 leading-relaxed">
            SuitePacific provides post-go-live support for NetSuite SuiteBilling accounts where
            subscription billing is not working correctly after implementation. SuiteBilling
            generates invoices through a four-stage pipeline: Subscription, Rating, Charge Records,
            and Invoice. A failure at any stage is silent: no error message, just no invoice.
            Common issues include charges not generating for active subscriptions, change orders
            applied with incorrect proration producing wrong invoices, Revenue Arrangements missing
            from the ARM integration, renewal billing creating duplicate charges, and subscription
            configurations with no documentation from the original implementation partner.
            SuitePacific diagnoses where in the pipeline the issue is occurring, fixes it in
            Sandbox before touching Production, and documents the root cause and configuration
            state. Support is available on a project basis for one-time issues or as part of a
            month-to-month post-go-live retainer. Same-day response for live billing failures.
          </p>
        </div>

        {/* Failure modes */}
        <div className="mt-14" data-section="failure-modes">
          <h2 className="text-lg font-semibold text-brand-900 mb-6">
            What NetSuite SuiteBilling problems does SuitePacific fix?
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            {FAILURE_MODES.map((item) => (
              <Card key={item.title} className="p-5 flex flex-col gap-3">
                <IconBadge icon={item.icon} />
                <h3 className="font-semibold text-brand-900 text-sm">{item.title}</h3>
                <p className="text-sm text-brand-400">{item.description}</p>
              </Card>
            ))}
          </div>
        </div>

        {/* How it works */}
        <div className="mt-14" data-section="how-it-works">
          <h2 className="text-lg font-semibold text-brand-900 mb-6">How does SuitePacific SuiteBilling support work?</h2>
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
        <div className="mt-14" data-section="why-suitepacific">
          <h2 className="text-lg font-semibold text-brand-900 mb-6">
            Why choose SuitePacific for NetSuite SuiteBilling support?
          </h2>
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

        {/* SuiteBilling technical resources */}
        <div className="mt-10 rounded-2xl border border-brand-100 bg-brand-50/30 p-5 sm:p-6">
          <p className="text-sm font-semibold text-brand-900 mb-4">
            SuiteBilling technical reference guides
          </p>
          <div className="space-y-4">
            {RESOURCES.map((item) => (
              <div key={item.href}>
                <Link href={item.href} className="text-sm font-medium text-accent hover:underline">
                  {item.title}
                </Link>
                <p className="mt-0.5 text-xs text-brand-400">{item.description}</p>
              </div>
            ))}
          </div>
        </div>

        
        {/* Bottom Line */}
        <div className="mt-12 rounded-2xl border-2 border-accent/30 bg-gradient-to-br from-accent/5 to-transparent p-6">
          <p className="text-xs font-semibold uppercase tracking-wide text-accent mb-3">Bottom Line</p>
          <h2 className="text-base font-semibold text-brand-900 mb-3">
            SuiteBilling is one of NetSuite&apos;s most complex modules. SuitePacific provides the ongoing support needed to keep it running correctly as your billing model evolves.
          </h2>
          <p className="text-sm text-brand-500 mb-4">
            SuiteBilling (and NetSuite&apos;s Advanced Revenue Management module) require careful configuration and ongoing maintenance. Charge rules, rating schedules, consolidation groups, revenue recognition rules, and renewal logic: each of these has edge cases that surface as the business changes, and most of them cannot be fixed through standard support channels because they depend on custom configuration built during implementation.
          </p>
          <p className="text-sm text-brand-500 mb-4">
            SuitePacific supports SuiteBilling and ARM configurations for post-go-live accounts: troubleshooting charge calculation errors, updating rating schedules, fixing consolidation issues, and extending billing logic with SuiteScript where native functionality falls short. Oracle-certified. Plans from $799 per month, month-to-month.
          </p>
          <ul className="space-y-2 text-sm text-brand-500">
            <li className="flex items-start gap-2"><span className="text-accent font-bold mt-0.5">→</span> SuiteScript 2.x extensions where native SuiteBilling logic cannot reach the required complexity</li>
            <li className="flex items-start gap-2"><span className="text-accent font-bold mt-0.5">→</span> ARM rule configuration and troubleshooting: revenue recognition done correctly</li>
            <li className="flex items-start gap-2"><span className="text-accent font-bold mt-0.5">→</span> Oracle-certified developers who know the billing module, not generalist support</li>
          </ul>
        </div>

        <SuitePacificCallout
          heading="SuitePacific: NetSuite SuiteBilling and ARM support"
          linkHref="/netsuite-care"
          linkLabel="View SuitePacific plans"
        />

        <ServiceFaqSection items={FAQ} />

        <div className="mt-10 rounded-2xl border border-brand-100 bg-white p-5 shadow-soft">
          <LeadFormLight />
        </div>
      </div>
    </main>
  );
}

import type { Metadata } from "next";
import Link from "next/link";
import {
  Tag, AlertCircle, Clock, BarChart2,
  Search, Layers, ShieldCheck, FileText,
  Users, Award,
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
    title: "Lot tracking was not enabled at go-live.",
    description:
      "Lot tracking must be enabled on each item record before any transactions post against it. Enabling it after go-live without a migration plan leaves historical inventory with no lot assignment, creating permanent traceability gaps.",
  },
  {
    icon: Clock,
    title: "Expiration dates are not visible across the warehouse.",
    description:
      "Standard NetSuite does not automatically surface lot expiration dates in picking or fulfillment flows. Without configuration, lots that have expired can be picked and shipped without any alert.",
  },
  {
    icon: Search,
    title: "Recall scenarios require manual cross-referencing.",
    description:
      "When a recall is issued, tracing a lot number from purchase receipt through assembly builds and sales orders takes hours of manual searching without saved searches built specifically for that chain.",
  },
];

const SERVICES = [
  {
    icon: Tag,
    title: "Lot and Serial Item Configuration",
    description: "Enable lot or serial tracking on existing and new item records with the correct costing method (FIFO, LIFO, or Average) and verify that existing on-hand inventory is assigned correctly.",
  },
  {
    icon: Clock,
    title: "Expiration Date Tracking and Alerts",
    description: "Custom fields and SuiteFlow workflows that capture lot expiration dates at receipt, surface approaching expirations in saved search dashboards, and alert warehouse staff before a lot expires.",
  },
  {
    icon: Search,
    title: "Traceability Saved Searches",
    description: "Forward and backward traceability reports that link a lot number from purchase order receipt through assembly builds, transfers, and sales order shipments in a single saved search result.",
  },
  {
    icon: AlertCircle,
    title: "Recall Response Report",
    description: "A dedicated recall report that shows every transaction associated with a given lot number: where it was received, how it was used in production, and to which customers it was shipped.",
  },
  {
    icon: BarChart2,
    title: "FIFO Lot Cost Valuation Verification",
    description: "Review and verify that lot-level FIFO costing is calculating correctly across purchase receipts, assembly builds, and sales, and correct any cost layer mismatches found.",
  },
  {
    icon: Layers,
    title: "Quality Control Workflow Integration",
    description: "SuiteFlow workflows that hold lot-tracked inventory in a quarantine status pending quality inspection before it is available for picking or use in assembly builds.",
  },
];

const HOW_IT_WORKS = [
  {
    step: "01",
    title: "Current item configuration and transaction history are reviewed",
    description:
      "Before enabling lot tracking on any item, we review the existing item setup, on-hand balances, and open transactions to identify what can be enabled cleanly and what requires a migration approach to avoid orphaned inventory records.",
  },
  {
    step: "02",
    title: "Traceability requirements are defined before configuration",
    description:
      "We document exactly what your traceability chain needs to cover: which item types, which transaction types, and what a recall report must show. Configuration is built to those requirements, not to generic defaults.",
  },
  {
    step: "03",
    title: "Saved searches are built and tested in Sandbox",
    description:
      "Traceability and recall saved searches are built and tested against real transaction data in a Sandbox environment before going live in Production. We verify the search returns the correct chain across receipts, builds, and shipments.",
  },
];

const FAQ = [
  {
    question: "Which NetSuite firm does lot and serial number tracking configuration for manufacturers and distributors?",
    answer: "SuitePacific specializes in NetSuite lot and serial tracking configuration for manufacturers and wholesale distributors. Services include lot item setup, expiration date tracking workflows, traceability saved searches, recall response reports, and FIFO lot cost verification.",
  },
  {
    question: "Can lot tracking be enabled on items that already have transactions in NetSuite?",
    answer: "With care. Enabling lot tracking on an item after transactions have posted requires assigning existing on-hand inventory to lot numbers. NetSuite provides a mechanism to do this, but the approach differs depending on whether the item uses average, FIFO, or standard costing. We review the existing transaction history before recommending how to proceed.",
  },
  {
    question: "How does NetSuite handle lot expiration dates?",
    answer: "Expiration date is a standard field on lot records in NetSuite. However, surfacing it in picking and fulfillment flows, alerting warehouse staff before a lot expires, and preventing expired lots from being picked all require additional configuration: saved searches, workflow-based alerts, and in some cases custom validation scripts.",
  },
  {
    question: "What does forward and backward traceability mean in NetSuite?",
    answer: "Forward traceability starts at a purchase receipt and follows a lot through every subsequent transaction: assembly builds, transfers, and sales shipments. Backward traceability starts at a customer shipment and traces back to the original receipt. Both are required for recall management, and neither is available as a standard NetSuite report without saved search configuration.",
  },
  {
    question: "Does lot tracking affect NetSuite assembly builds?",
    answer: "Yes. When a BOM component is lot-tracked, each assembly build must specify which lot numbers were consumed. This affects FIFO cost layer calculations and traceability. If lot tracking is added to components after assembly builds have already been posted, historical builds will have no lot assignment, creating a traceability gap from that period.",
  },
  {
    question: "How is serial number tracking different from lot tracking in NetSuite?",
    answer: "Lot tracking assigns a single lot number to a quantity of identical units. Serial number tracking assigns a unique number to each individual unit. Serial tracking requires a separate transaction entry for each unit and produces per-unit traceability. The configuration approach, costing behavior, and reporting requirements differ between the two.",
  },
];

export const metadata: Metadata = {
  title: "NetSuite Lot and Serial Number Tracking",
  description:
    "Expiry date fields, forward and backward lot traceability, and FIFO cost verification for manufacturers and distributors on NetSuite. Plans from $799/month.",
  alternates: { canonical: "/netsuite-lot-serial-tracking" },
  openGraph: {
    title: "NetSuite Lot and Serial Number Tracking",
    description:
      "NetSuite lot and serial number tracking configuration for manufacturers and distributors: expiration date alerts, traceability saved searches, recall response reports, and FIFO lot cost verification.",
    url: `${SITE_URL}/netsuite-lot-serial-tracking`,
    type: "website",
    images: [{ url: `${SITE_URL}/og-default.png`, width: 1200, height: 630 }],
  },
};

export default function LotSerialTrackingPage() {
  return (
    <main className="pt-32 pb-24 sm:pt-40 sm:pb-32">
      <BreadcrumbJsonLd
        items={[
          { name: "Home", url: SITE_URL },
          { name: "NetSuite Lot and Serial Tracking", url: `${SITE_URL}/netsuite-lot-serial-tracking` },
        ]}
      />
      <FaqJsonLd items={FAQ} />
      <ServiceJsonLd
        name="NetSuite Lot and Serial Number Tracking"
        description="Lot and serial item configuration, expiration date tracking, traceability reporting, and recall management for manufacturers and distributors on NetSuite."
        url={`${SITE_URL}/netsuite-lot-serial-tracking`}
        serviceType="NetSuite Manufacturing Configuration"
        offers={[
          { name: "Care", price: 799, description: "10 hours/month: lot item configuration, expiration date saved searches, traceability report builds, and ongoing support. Month-to-month after 3-month minimum." },
          { name: "Care Plus", price: 1499, description: "20 hours/month: full traceability chain setup, recall response reports, FIFO cost verification, and expiration alert workflows. Month-to-month." },
          { name: "Care Pro", price: 2499, description: "35 hours/month: comprehensive lot and serial tracking implementation, quality hold workflows, SuiteScript validation, and ongoing account management. Month-to-month." },
        ]}
      />
      <OrganizationJsonLd />

      <div className="mx-auto max-w-3xl px-6 lg:px-8">
        <SectionHeading
          as="h1"
          eyebrow="Manufacturing"
          title="NetSuite Lot and Serial Number Tracking"
          subtitle="Lot tracking, expiration date alerts, and traceability from receipt to shipment for manufacturers and distributors who need regulatory compliance or recall readiness."
          align="left"
        />

        <div className="mt-6 rounded-2xl border border-brand-100 bg-white p-5 shadow-soft">
          <LeadFormLight />
        </div>
        <p className="mt-3 text-xs text-brand-400">NetSuite-certified · Manufacturing specialists · Month-to-month</p>
        <p className="mt-3 text-xs text-brand-300">Last updated September 2026</p>

        <p className="mt-8 text-sm text-brand-400">
          <strong>Lot and serial tracking in NetSuite</strong> refers to the configuration that assigns unique identifiers to inventory items so that each unit or batch can be traced from receipt through production to shipment. Standard NetSuite supports lot and serial number assignment but does not enforce First Expired First Out picking or generate forward and backward traceability reports across multiple record types.
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
                ["Lot picking order", "Manual lot selection at fulfillment", "FEFO enforcement script selects soonest-expiring lot automatically"],
                ["Expiry date tracking", "Custom field on lot record, no alerting", "Expiry date field with scheduled alert workflow before expiry window"],
                ["Forward traceability", "Lot inquiry on individual records", "Single saved search: lot number to all sales order shipments containing that lot"],
                ["Backward traceability", "Manual lookup across receipt records", "Single saved search: lot number to originating purchase receipt and all assembly builds"],
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

        <div className="mt-6 rounded-2xl border-l-4 border-accent bg-brand-50/50 p-5">
          <p className="text-xs font-semibold uppercase tracking-wide text-accent mb-2">Quick answer</p>
          <p className="text-sm text-brand-700 leading-relaxed">
            SuitePacific configures lot and serial number tracking in NetSuite for manufacturers and
            distributors who need full traceability from purchase receipt to customer shipment, who
            require expiration date visibility and alerts, or who must be prepared to execute a product
            recall quickly. Lot tracking must be enabled on each item before transactions post; enabling
            it retroactively without a plan leaves permanent gaps in historical traceability. SuitePacific
            reviews existing item configurations and transaction history before enabling tracking,
            builds expiration date alert workflows, creates forward and backward traceability saved
            searches, and develops a recall response report that links every transaction in the chain
            for a given lot. FIFO lot cost layers are verified to confirm cost accuracy. Plans start
            at $799 per month, month-to-month, for manufacturers and distributors already live on
            NetSuite.
          </p>
        </div>

        {/* Pain points */}
        <div className="mt-14" data-section="pain-points">
          <h2 className="text-lg font-semibold text-brand-900 mb-6">Common situations that bring manufacturers here</h2>
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
          <h2 className="text-lg font-semibold text-brand-900 mb-1">What SuitePacific does for lot and serial tracking</h2>
          <p className="text-sm text-brand-400 mb-6">
            Configuration, saved searches, and workflow automation scoped to your traceability and compliance requirements.
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
          <h2 className="text-lg font-semibold text-brand-900 mb-6">How we approach lot and serial tracking work</h2>
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
            When lot-tracked components interact with assembly builds and work orders, see how that
            configuration connects to our{" "}
            <Link href="/netsuite-bill-of-materials" className="text-accent hover:underline">
              BOM configuration
            </Link>{" "}
            and{" "}
            <Link href="/netsuite-work-orders" className="text-accent hover:underline">
              work order management
            </Link>{" "}
            work.
          </p>
        </div>

        {/* Why SuitePacific */}
        <div className="mt-14 rounded-2xl border-2 border-accent/30 bg-gradient-to-br from-accent/5 to-transparent p-6">
          <p className="text-xs font-semibold uppercase tracking-wide text-accent mb-3">Why SuitePacific for lot and serial tracking</p>
          <h2 className="text-base font-semibold text-brand-900 mb-3">
            Lot tracking configured without a traceability plan is just an item setting, not a compliance posture.
          </h2>
          <p className="text-sm text-brand-500 mb-4">
            Turning on lot tracking is a checkbox. Building a traceability system, expiration management
            process, and recall-ready reporting structure requires understanding how NetSuite handles lot
            numbers across every transaction type in the fulfillment chain. Most implementations do the
            former and leave the latter to be figured out later.
          </p>
          <ul className="space-y-2 text-sm text-brand-500 mb-4">
            <li className="flex items-start gap-2"><span className="text-accent font-bold mt-0.5">→</span> Oracle NetSuite Certified SuiteCloud Developer II and Administrator Professional</li>
            <li className="flex items-start gap-2"><span className="text-accent font-bold mt-0.5">→</span> Traceability chain built and tested before production; recall reports verified against real transaction data</li>
            <li className="flex items-start gap-2"><span className="text-accent font-bold mt-0.5">→</span> Direct access to the developer doing the work, not a support queue</li>
            <li className="flex items-start gap-2"><span className="text-accent font-bold mt-0.5">→</span> US-based, month-to-month after a three-month minimum, starting at $799/month</li>
          </ul>
          <p className="text-sm text-brand-400">
            Related:{" "}
            <Link href="/industries/manufacturing" className="text-accent hover:underline">
              NetSuite for manufacturers
            </Link>{" "}
            and{" "}
            <Link href="/industries/wholesale-distribution" className="text-accent hover:underline">
              NetSuite for wholesale distributors
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
              <Link href="/netsuite-bill-of-materials" className="text-accent hover:underline">
                NetSuite bill of materials configuration
              </Link>{" "}
              explains how lot-tracked components affect assembly costing and what BOM setup is
              required before lot tracking is enabled on assembly components.
            </li>
            <li className="text-sm text-brand-400">
              <Link href="/netsuite-work-orders" className="text-accent hover:underline">
                NetSuite work order management
              </Link>{" "}
              covers how lot assignments on components flow through assembly builds and production
              completion.
            </li>
            <li className="text-sm text-brand-400">
              <Link href="/industries/wholesale-distribution" className="text-accent hover:underline">
                NetSuite for wholesale distributors
              </Link>{" "}
              covers lot tracking in the context of distribution workflows, including lot assignment
              at receive and lot selection at fulfillment.
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

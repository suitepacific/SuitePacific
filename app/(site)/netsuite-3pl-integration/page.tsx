import type { Metadata } from "next";
import Link from "next/link";
import { Truck, RefreshCw, PackageCheck, AlertCircle, Code2, BarChart3 } from "lucide-react";
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
    title: "3PLs run their own WMS and don&apos;t connect to NetSuite natively.",
    description:
      "Most third-party logistics providers use a proprietary warehouse management system. There is no native NetSuite connector for the major 3PL platforms. Orders, inventory counts, shipment confirmations, and receipts must cross the gap via REST API, SFTP file exchange, or a middleware platform.",
  },
  {
    icon: Truck,
    title: "Orders must reach the 3PL at creation, not manually.",
    description:
      "If a sales order is created in NetSuite and an operations person must manually export and send it to the 3PL, fulfillment delays and missed orders are routine. The order transmission must fire automatically on sales order approval or creation so the 3PL can begin pick and pack without a manual step.",
  },
  {
    icon: RefreshCw,
    title: "Inventory in the 3PL WMS diverges from NetSuite inventory counts.",
    description:
      "Inventory adjustments, receiving, and damage write-offs happen in the 3PL WMS and do not automatically update NetSuite. When NetSuite inventory counts are stale, the item availability shown to customers and used by the sales team does not reflect what is actually in the warehouse, which leads to overselling.",
  },
  {
    icon: PackageCheck,
    title: "Shipment confirmations must close fulfillments automatically.",
    description:
      "When the 3PL ships an order, the tracking number and ship date must update the NetSuite item fulfillment record, mark it shipped, and trigger the customer notification. Manual matching of 3PL shipment files to NetSuite fulfillment records is error-prone and creates billing delays.",
  },
];

const WHAT_WE_BUILD = [
  {
    icon: Code2,
    title: "Order transmission script",
    description:
      "A SuiteScript that fires on sales order approval and transmits the order to the 3PL via REST API or writes it to an outbound SFTP file. Includes retry logic, error alerting, and a transmission log on the sales order record so the team can see exactly when the order was sent.",
  },
  {
    icon: RefreshCw,
    title: "Inventory sync from 3PL to NetSuite",
    description:
      "Scheduled script that reads the 3PL&apos;s current inventory snapshot via API or SFTP, compares it to NetSuite quantity on hand, and updates item records. Runs on a configurable schedule and logs discrepancies above a set threshold for review.",
  },
  {
    icon: PackageCheck,
    title: "Shipment confirmation ingestion",
    description:
      "Automated process that reads 3PL shipment confirmation files or API webhooks, matches them to open item fulfillments in NetSuite, marks them as shipped, updates tracking numbers, and triggers the customer shipping notification.",
  },
  {
    icon: Truck,
    title: "Returns receipt from 3PL",
    description:
      "When the 3PL receives a returned item, the return receipt file or API event triggers a NetSuite item receipt against the open return authorization. Returned items are received into a quarantine or sellable location based on the disposition included in the 3PL return record.",
  },
  {
    icon: BarChart3,
    title: "Inventory discrepancy report",
    description:
      "A saved search or custom report that shows the difference between 3PL WMS inventory and NetSuite inventory on hand by item and location. Updated on each sync cycle so the warehouse and operations teams can identify and investigate variances before they affect order availability.",
  },
  {
    icon: AlertCircle,
    title: "Error alerting and transmission logs",
    description:
      "Every integration touchpoint writes to a log record in NetSuite. Failures send an email alert to the configured operations contact. Log records include the payload sent, the response received, and the timestamp so failures can be diagnosed without guessing what was transmitted.",
  },
];

const DATA_FLOWS = [
  { flow: "Order transmission", direction: "NetSuite → 3PL", trigger: "Sales order approval", method: "REST API or SFTP outbound file" },
  { flow: "Inventory sync", direction: "3PL → NetSuite", trigger: "Scheduled (configurable)", method: "REST API pull or SFTP inbound file" },
  { flow: "Shipment confirmation", direction: "3PL → NetSuite", trigger: "3PL ships order", method: "API webhook or SFTP inbound file" },
  { flow: "Returns receipt", direction: "3PL → NetSuite", trigger: "3PL receives return", trigger2: "Return confirmation file", method: "SFTP inbound or API event" },
];

const FAQ = [
  {
    question: "Which NetSuite firm does 3PL integration?",
    answer:
      "SuitePacific builds REST API and SFTP-based integrations between NetSuite and third-party logistics providers for retail and e-commerce companies. This includes order transmission scripts, inventory sync, shipment confirmation ingestion, and returns processing from 3PL receipt files. SuitePacific is Oracle NetSuite Certified (SuiteCloud Developer II and Administrator Professional), US-based, and works directly with operations and fulfillment teams on every engagement. Plans start at $799 per month on month-to-month terms after a three-month minimum.",
  },
  {
    question: "Does NetSuite have a native 3PL integration?",
    answer:
      "NetSuite does not have a built-in connector for third-party logistics providers. Each 3PL has its own WMS platform with its own API or file format. The integration must be custom-built or implemented via a middleware platform (such as Celigo or Boomi). The core data flows are order transmission from NetSuite to the 3PL, inventory sync from the 3PL to NetSuite, shipment confirmation from the 3PL back to NetSuite, and returns receipt when the 3PL receives returned goods.",
  },
  {
    question: "What data needs to flow between NetSuite and a 3PL?",
    answer:
      "The four core flows are: orders from NetSuite to the 3PL on creation or approval; inventory counts from the 3PL WMS back to NetSuite on a schedule; shipment confirmations including tracking numbers from the 3PL back to NetSuite to close fulfillments; and return receipts from the 3PL when returned items are processed. Some integrations also include purchase order receiving when the 3PL is the receiving location, and inbound shipment notifications for advance shipping notices.",
  },
  {
    question: "How do we prevent overselling when inventory lives at a 3PL?",
    answer:
      "Overselling happens when the available quantity shown in NetSuite is higher than what the 3PL actually has. Preventing it requires a scheduled inventory sync that reads the 3PL&apos;s current on-hand counts and updates NetSuite item records. The sync frequency depends on sales velocity: a fast-moving SKU may need a sync every 30 minutes; a slower catalog can run hourly or every few hours. The discrepancy report flags items where the counts have drifted beyond a threshold so the team can investigate before a problem order is placed.",
  },
  {
    question: "How are 3PL shipment confirmations matched to NetSuite fulfillments?",
    answer:
      "The most reliable matching key is the NetSuite sales order number, which should be included in every order transmitted to the 3PL. When the 3PL returns a shipment confirmation, the script looks up the open item fulfillment by sales order number, updates the tracking number and ship date, marks the fulfillment as shipped, and triggers the customer notification. If the 3PL uses its own order number as the key, the script maps it back to the NetSuite order number via a lookup table built at transmission time.",
  },
  {
    question: "Can a 3PL integration handle returns processing?",
    answer:
      "Yes. When the 3PL receives a returned item, it can provide a returns receipt file or API event with the original order number, the item, the quantity, and a disposition flag (restock, quarantine, or dispose). The integration script reads this and creates a NetSuite item receipt against the open return authorization or creates a new item receipt record. Disposition determines which inventory location the item is received into. This eliminates the manual step of creating item receipts in NetSuite after being notified by the 3PL.",
  },
];

export const metadata: Metadata = {
  title: "NetSuite 3PL Integration: Order Transmission, Inventory Sync, and Shipment Confirmation",
  description:
    "Order transmission, inventory sync, and shipment confirmation between NetSuite and 3PL providers. SuiteCloud Developer II certified. Plans from $799/month.",
  alternates: { canonical: "/netsuite-3pl-integration" },
  openGraph: {
    title: "NetSuite 3PL Integration: Order Transmission, Inventory Sync, and Shipment Confirmation",
    description:
      "NetSuite does not connect to third-party logistics providers natively. SuitePacific builds the order transmission, inventory sync, shipment confirmation, and returns receipt integration between NetSuite and your 3PL.",
    url: `${SITE_URL}/netsuite-3pl-integration`,
    type: "website",
    images: [{ url: `${SITE_URL}/og-default.png`, width: 1200, height: 630 }],
  },
};

export default function Netsuite3plIntegrationPage() {
  return (
    <main className="pt-32 pb-24 sm:pt-40 sm:pb-32">
      <BreadcrumbJsonLd
        items={[
          { name: "Home", url: SITE_URL },
          { name: "NetSuite 3PL Integration", url: `${SITE_URL}/netsuite-3pl-integration` },
        ]}
      />
      <FaqJsonLd items={FAQ} />
      <ServiceJsonLd
        name="NetSuite 3PL Integration"
        description="REST API and SFTP-based integration between NetSuite and third-party logistics providers. Covers order transmission, inventory sync, shipment confirmation ingestion, and returns receipt processing for retail and e-commerce companies."
        url={`${SITE_URL}/netsuite-3pl-integration`}
        serviceType="NetSuite Retail Configuration"
        offers={[
          { name: "Care", price: 799, description: "10 hours/month: integration monitoring, error triage, transmission log review, and minor configuration fixes. Month-to-month after 3-month minimum." },
          { name: "Care Plus", price: 1499, description: "20 hours/month: integration build or rebuild, data flow configuration, inventory sync tuning, and returns processing setup. Month-to-month." },
          { name: "Care Pro", price: 2499, description: "35 hours/month: full 3PL integration build including all data flows, middleware configuration, discrepancy reporting, and ongoing development. Month-to-month." },
        ]}
      />
      <OrganizationJsonLd />

      <div className="mx-auto max-w-3xl px-6 lg:px-8">
        <SectionHeading
          as="h1"
          eyebrow="Retail and E-Commerce"
          title="NetSuite 3PL Integration"
          subtitle="Third-party logistics providers run their own warehouse management systems and do not connect to NetSuite natively. SuitePacific builds the data flows between NetSuite and your 3PL: order transmission, inventory sync, shipment confirmation, and returns receipt processing."
          align="left"
        />

        <div className="mt-6 rounded-2xl border border-brand-100 bg-white p-5 shadow-soft">
          <LeadFormLight />
        </div>
        <p className="mt-3 text-xs text-brand-400">NetSuite-certified · Retail specialists · Month-to-month</p>
        <p className="mt-3 text-xs text-brand-300">Last updated September 2026</p>

        <p className="mt-8 text-sm text-brand-400">
          <strong>3PL integration with NetSuite</strong> refers to the scripts and API connections that synchronize orders, inventory, and shipment data between a NetSuite account and a third-party logistics provider. Standard NetSuite does not include a native integration to any 3PL platform; order transmission, inventory sync, and shipment confirmation all require custom RESTlets or middleware.
        </p>

        <div className="mt-6 rounded-2xl border-l-4 border-accent bg-brand-50/50 p-5">
          <p className="text-xs font-semibold uppercase tracking-wide text-accent mb-2">Quick answer</p>
          <p className="text-sm text-brand-700 leading-relaxed">
            SuitePacific builds and maintains the integration between NetSuite and third-party logistics providers for
            retail and e-commerce companies that outsource warehousing and fulfillment. NetSuite has no native connector
            to 3PL warehouse management systems. The integration must cover four core flows: order transmission from
            NetSuite to the 3PL on sales order creation or approval; inventory sync from the 3PL&apos;s WMS back to
            NetSuite on a schedule to prevent overselling; shipment confirmation ingestion to close NetSuite fulfillments
            and trigger customer notifications; and returns receipt processing to create item receipts in NetSuite when
            the 3PL receives returned goods. SuitePacific is an Oracle-certified NetSuite firm (SuiteCloud Developer II
            and Administrator Professional) that builds these integrations via REST API, SFTP, or middleware platforms
            such as Celigo. Plans start at $799 per month.
          </p>
        </div>

        {/* Data flows table */}
        <div className="mt-14">
          <h2 className="text-lg font-semibold text-brand-900 mb-2">What data flows between NetSuite and a 3PL?</h2>
          <p className="text-sm text-brand-400 mb-5">
            A complete 3PL integration covers four directional data flows. Each flow has a trigger event, a direction,
            and a transport mechanism. All four must be working for the integration to be reliable end-to-end.
          </p>
          <div className="overflow-x-auto rounded-2xl border border-brand-100">
            <table className="w-full text-sm min-w-[560px]">
              <thead>
                <tr className="border-b border-brand-100 bg-brand-50/50">
                  <th className="text-left p-4 font-semibold text-brand-900">Data flow</th>
                  <th className="text-left p-4 font-semibold text-brand-900">Direction</th>
                  <th className="text-left p-4 font-semibold text-brand-900">Trigger</th>
                  <th className="text-left p-4 font-semibold text-brand-900">Transport</th>
                </tr>
              </thead>
              <tbody>
                {DATA_FLOWS.map((row, i) => (
                  <tr key={row.flow} className={i < DATA_FLOWS.length - 1 ? "border-b border-brand-100" : ""}>
                    <td className="p-4 font-medium text-brand-700 align-top whitespace-nowrap">{row.flow}</td>
                    <td className="p-4 text-brand-400 align-top text-[13px] whitespace-nowrap">{row.direction}</td>
                    <td className="p-4 text-brand-400 align-top text-[13px]">{row.trigger}</td>
                    <td className="p-4 text-brand-400 align-top text-[13px]">{row.method}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Where the gaps are */}
        <div className="mt-14">
          <h2 className="text-lg font-semibold text-brand-900 mb-6">Where does the NetSuite to 3PL connection break down?</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            {PAIN_POINTS.map((item) => (
              <Card key={item.title} className="p-5 flex flex-col gap-3">
                <IconBadge icon={item.icon} />
                <h3 className="font-semibold text-brand-900 text-sm" dangerouslySetInnerHTML={{ __html: item.title }} />
                <p className="text-sm text-brand-400">{item.description}</p>
              </Card>
            ))}
          </div>
        </div>

        {/* What SuitePacific builds */}
        <div className="mt-14">
          <h2 className="text-lg font-semibold text-brand-900 mb-2">What does SuitePacific build for the NetSuite to 3PL integration?</h2>
          <p className="text-sm text-brand-400 mb-6">
            Every integration build starts by mapping the 3PL&apos;s available API endpoints or file formats against the
            required NetSuite data flows. The approach varies by 3PL: some expose a REST API with webhook support; others
            rely on SFTP file exchange with agreed-upon schemas. The integration architecture matches what the 3PL actually
            supports, not an idealized spec.
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

        {/* Why SuitePacific */}
        <div className="mt-14 rounded-2xl border-2 border-accent/30 bg-gradient-to-br from-accent/5 to-transparent p-6">
          <p className="text-xs font-semibold uppercase tracking-wide text-accent mb-3">Why SuitePacific for NetSuite 3PL integration</p>
          <h2 className="text-base font-semibold text-brand-900 mb-3">
            The NetSuite firm retail and e-commerce operations teams use when their 3PL integration is missing or broken.
          </h2>
          <p className="text-sm text-brand-500 mb-4">
            SuitePacific is a boutique NetSuite consulting firm focused on post-go-live support and custom development for
            companies already live on NetSuite. 3PL integration, fulfillment automation, and inventory sync are recurring
            deliverables for the retail and e-commerce accounts we support.
          </p>
          <ul className="space-y-2 text-sm text-brand-500 mb-4">
            <li className="flex items-start gap-2"><span className="text-accent font-bold mt-0.5">→</span> Oracle NetSuite Certified SuiteCloud Developer II and Administrator Professional</li>
            <li className="flex items-start gap-2"><span className="text-accent font-bold mt-0.5">→</span> Integration architecture matched to what your 3PL actually supports, not a generic template</li>
            <li className="flex items-start gap-2"><span className="text-accent font-bold mt-0.5">→</span> Every data flow includes error logging, alerting, and a transmission record on the NetSuite side</li>
            <li className="flex items-start gap-2"><span className="text-accent font-bold mt-0.5">→</span> Direct access to the developer doing the work, not a support queue</li>
            <li className="flex items-start gap-2"><span className="text-accent font-bold mt-0.5">→</span> US-based, month-to-month after a three-month minimum, starting at $799/month</li>
          </ul>
          <p className="text-sm text-brand-400">
            Related:{" "}
            <Link href="/industries/retail-ecommerce" className="text-accent hover:underline">NetSuite for retail and e-commerce</Link>
            {" "}and{" "}
            <Link href="/netsuite-integrations" className="text-accent hover:underline">NetSuite integrations</Link>.
          </p>
        </div>

        <div className="mt-10 rounded-2xl border border-brand-100 bg-white p-5 shadow-soft">
          <p className="text-sm font-semibold text-brand-900 mb-1">Need a 3PL integration built or repaired?</p>
          <p className="text-sm text-brand-400 mb-4">
            Describe the 3PL you use, which data flows are missing or broken, and what the current gap is costing in manual
            effort or fulfillment errors. We will give a direct assessment of what needs to be built.
          </p>
          <LeadFormLight />
        </div>

        <div className="mt-10 rounded-2xl border border-brand-100 bg-brand-50/30 p-5 sm:p-6">
          <p className="text-sm font-semibold text-brand-900 mb-3">Related reading</p>
          <ul className="space-y-2.5">
            <li className="text-sm text-brand-400">
              <Link href="/netsuite-returns-processing" className="text-accent hover:underline">
                NetSuite returns processing
              </Link>{" "}
              covers the RMA workflow, return receipt, disposition, and credit memo automation that connects to 3PL return flows.
            </li>
            <li className="text-sm text-brand-400">
              <Link href="/netsuite-integrations/shopify" className="text-accent hover:underline">
                NetSuite Shopify integration
              </Link>{" "}
              covers order, inventory, and fulfillment sync between NetSuite and Shopify storefronts.
            </li>
            <li className="text-sm text-brand-400">
              <Link href="/netsuite-integrations/amazon" className="text-accent hover:underline">
                NetSuite Amazon integration
              </Link>{" "}
              covers order import, FBA inventory tracking, and settlement reconciliation for Amazon sellers.
            </li>
            <li className="text-sm text-brand-400">
              <Link href="/netsuite-suitescript-development" className="text-accent hover:underline">
                NetSuite SuiteScript development
              </Link>{" "}
              explains the scripting layer used to build order transmission, inventory sync, and fulfillment automation.
            </li>
            <li className="text-sm text-brand-400">
              <Link href="/netsuite-care" className="text-accent hover:underline">
                NetSuite managed support plans
              </Link>{" "}
              starting at $799/month cover ongoing integration monitoring and development.
            </li>
          </ul>
        </div>

        <ServiceFaqSection items={FAQ} />

        <div className="mt-10 rounded-2xl border border-brand-100 bg-white p-5 shadow-soft">
          <p className="text-sm font-semibold text-brand-900 mb-1">Ready to connect NetSuite to your 3PL?</p>
          <p className="text-sm text-brand-400 mb-4">
            Tell us which 3PL you use, what data the integration needs to move, and where the current process breaks.
            We will scope what needs to be built.
          </p>
          <LeadFormLight />
        </div>
      </div>
    </main>
  );
}

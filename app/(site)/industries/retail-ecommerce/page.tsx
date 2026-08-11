import type { Metadata } from "next";
import Link from "next/link";
import {
  Code2,
  Workflow,
  BarChart2,
  Gauge,
  Headphones,
  ShieldCheck,
  Users,
  RefreshCcw,
  Award,
  Settings2,
  Package,
  Layers,
  Plug,
  AlertCircle,
} from "lucide-react";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Card } from "@/components/ui/Card";
import { IconBadge } from "@/components/ui/IconBadge";
import { BreadcrumbJsonLd, FaqJsonLd, ServiceJsonLd } from "@/components/seo/JsonLd";
import { ServiceFaqSection } from "@/components/ui/ServiceFaqSection";
import { LeadFormLight } from "@/components/sections/LeadFormLight";
import { SITE_URL } from "@/lib/content";

const CHALLENGES = [
  {
    icon: Layers,
    title: "Multi-channel order management",
    description:
      "Orders from Shopify, Amazon, wholesale accounts, and physical retail flowing into NetSuite with different item mappings, pricing, and fulfillment logic per channel.",
  },
  {
    icon: Package,
    title: "Inventory across locations",
    description:
      "Real-time inventory visibility across warehouses, stores, and 3PL locations, with reorder point automation and safety stock alerts that standard reporting does not produce.",
  },
  {
    icon: RefreshCcw,
    title: "Returns and refunds",
    description:
      "RMA workflows, restocking logic, channel-specific return handling, and credit memo automation that go beyond standard NetSuite configuration and vary by channel and product category.",
  },
  {
    icon: AlertCircle,
    title: "Fulfillment exceptions",
    description:
      "Orders that cannot be fully fulfilled due to inventory shortages require automated exception routing, customer notification, and backorder management logic.",
  },
  {
    icon: BarChart2,
    title: "Channel financial reconciliation",
    description:
      "Reconciling settlement deposits from Shopify, Amazon, and payment processors against NetSuite transactions requires custom scripts since the deposit structures do not match invoice data directly.",
  },
  {
    icon: Settings2,
    title: "Pricing and promotions",
    description:
      "Tiered pricing, promotional pricing windows, channel-specific pricing, and volume discount logic that need scripted enforcement beyond what NetSuite price levels support.",
  },
];

const SERVICES = [
  {
    icon: Headphones,
    title: "Post-Go-Live Support",
    description:
      "Ongoing technical support for your live retail NetSuite account: new development, fixes, release testing, and account upkeep on a month-to-month basis.",
    href: "/netsuite-post-go-live-support",
  },
  {
    icon: Code2,
    title: "SuiteScript Development",
    description:
      "Custom scripts for channel order processing, pricing logic, RMA automation, fulfillment exception handling, and retail-specific business rules.",
    href: "/netsuite-suitescript-development",
  },
  {
    icon: Workflow,
    title: "Workflow Automation",
    description:
      "SuiteFlow workflows for return approvals, fulfillment exception routing, customer notification on backorder, and inventory alert escalation.",
    href: "/netsuite-workflow-automation",
  },
  {
    icon: BarChart2,
    title: "Saved Searches & Dashboards",
    description:
      "Inventory dashboards, channel sales reporting, fill rate tracking, returns analysis, and channel reconciliation views built with saved searches and SuiteQL.",
    href: "/netsuite-saved-searches-dashboards",
  },
  {
    icon: Plug,
    title: "NetSuite Integrations",
    description:
      "RESTlet and script-based integrations connecting NetSuite to Shopify, Amazon, 3PLs, payment processors, and other commerce platforms for order and inventory sync.",
    href: "/netsuite-integrations",
  },
  {
    icon: Gauge,
    title: "Account Optimization",
    description:
      "Performance diagnostics for retail accounts with high order and inventory transaction volume: saved search indexing, script audits, and governance limit fixes.",
    href: "/netsuite-account-optimization",
  },
];

const CUSTOMIZATIONS = [
  {
    title: "Shopify-to-NetSuite order import scripts",
    description:
      "Scheduled or webhook-triggered scripts that pull Shopify orders, map products to NetSuite items, apply location and fulfillment rules, and create sales orders automatically.",
  },
  {
    title: "RMA creation and restocking automation",
    description:
      "Scripts that create return authorization records from customer requests, route them through approval, and automatically create item receipts and credit memos when returns are processed.",
  },
  {
    title: "Fulfillment exception workflows",
    description:
      "SuiteFlow workflows that detect orders with insufficient inventory, notify customer service, hold the order for manual review, and trigger a customer notification after a configurable delay.",
  },
  {
    title: "Channel settlement reconciliation",
    description:
      "Scheduled scripts that pull Shopify payout and Stripe deposit data, match against NetSuite invoice and payment records, and flag unmatched transactions for the accounting team.",
  },
  {
    title: "Promotional pricing enforcement scripts",
    description:
      "User Event scripts that apply promotional pricing windows, quantity thresholds, and channel-specific discounts at sales order entry, with override controls for sales operations.",
  },
  {
    title: "Inventory alert dashboards",
    description:
      "Saved searches and portlets showing items below safety stock level by location, open purchase orders for those items, and days of supply calculations for the purchasing team.",
  },
];

const WHY_SP = [
  {
    icon: ShieldCheck,
    title: "SuiteCloud Developer II Certified",
    description:
      "Oracle NetSuite's SuiteCloud Developer II and Administrator Professional certifications. Verified technical credentials across SuiteScript, SuiteFlow, and the NetSuite platform.",
  },
  {
    icon: Users,
    title: "Direct Access",
    description:
      "You communicate directly with the person doing the work. No ticket system, no account manager as an intermediary, no offshore handoffs.",
  },
  {
    icon: RefreshCcw,
    title: "Context Retained",
    description:
      "Ongoing knowledge of your retail account retained across every engagement. Each request builds on prior work without re-discovery.",
  },
  {
    icon: Award,
    title: "Post-Go-Live Specialist",
    description:
      "We work exclusively with companies already live on NetSuite. No implementations, no pre-go-live work. Every engagement is ongoing development and support.",
  },
];

const FAQ = [
  {
    question: "Is NetSuite suitable for ecommerce businesses?",
    answer:
      "Yes, particularly for multi-channel retailers that need integrated inventory, order management, and financial reporting. NetSuite handles multi-location inventory, sales order processing, returns, and financial consolidation across channels. Customization is typically required for channel-specific order imports, promotional pricing logic, RMA workflows, and channel settlement reconciliation.",
  },
  {
    question: "What is NetSuite used for in retail?",
    answer:
      "Retail and e-commerce companies use NetSuite for order management, inventory tracking across locations, returns processing, accounts receivable, channel financial reconciliation, and consolidated reporting. The platform handles multi-location inventory, fulfillment workflows, and customer records. Custom scripts and integrations extend this for Shopify, Amazon, 3PL, and payment processor connections.",
  },
  {
    question: "How can NetSuite support ecommerce companies?",
    answer:
      "NetSuite supports ecommerce companies through inventory management, order-to-cash workflows, returns processing, and multi-channel financial reporting. Post-go-live customization extends this with channel order import scripts, promotional pricing logic, fulfillment exception handling, RMA automation, and channel settlement reconciliation that the standard feature set does not produce.",
  },
  {
    question: "How can NetSuite automate retail operations?",
    answer:
      "Common automations include Shopify and Amazon order imports via scheduled scripts, RMA creation and restocking automation, fulfillment exception routing when orders cannot be filled, customer notification on backorder, and inventory reorder point triggers. Channel settlement reconciliation and pricing enforcement also require scripted logic.",
  },
  {
    question: "What are common NetSuite ecommerce customizations?",
    answer:
      "Common builds include Shopify-to-NetSuite order import with item mapping and location rules, RMA automation scripts, fulfillment exception workflows, channel settlement reconciliation scripts, promotional pricing enforcement, inventory alert dashboards showing items below safety stock, and returns analysis reporting.",
  },
  {
    question: "How can NetSuite improve inventory reporting for retailers?",
    answer:
      "Custom saved searches and SuiteQL produce inventory by location and bin, items below safety stock, inventory turns, fill rate by period, and open purchase order coverage for understocked items. These are built as saved searches or portlets on purchasing and operations dashboards, replacing spreadsheet-based inventory tracking.",
  },
  {
    question: "How can retailers customize NetSuite?",
    answer:
      "SuiteScript handles channel order processing, pricing logic, RMA automation, fulfillment exceptions, and channel reconciliation that configuration alone cannot manage. SuiteFlow builds the exception routing and approval workflows. RESTlets connect NetSuite to Shopify, Amazon, 3PLs, and payment processors. Together these allow NetSuite to handle most multi-channel retail workflows.",
  },
  {
    question: "What does a NetSuite ecommerce consultant do?",
    answer:
      "A NetSuite ecommerce consultant reviews the existing order management and inventory setup, identifies gaps between standard NetSuite behavior and multi-channel retail requirements, and builds the SuiteScript customizations, SuiteFlow workflows, integrations, and saved searches needed to close those gaps. Ongoing engagements cover new channel integrations, pricing changes, and release testing.",
  },
  {
    question: "Who provides NetSuite support for ecommerce companies?",
    answer:
      "SuitePacific provides NetSuite post-go-live support for retail and e-commerce companies, including channel order import scripts, pricing and promotional logic, RMA automation, fulfillment exception workflows, channel reconciliation, and ongoing technical support on a month-to-month basis.",
  },
  {
    question: "Who can support a NetSuite retail account after go-live?",
    answer:
      "After an implementation partner's engagement ends, ongoing support is typically handled by a post-go-live NetSuite consulting firm. SuitePacific specializes in exactly this: taking over retail NetSuite accounts after implementation, reviewing existing customizations, and providing ongoing development, fixes, and optimization.",
  },
  {
    question: "Who provides NetSuite development for retail businesses?",
    answer:
      "SuitePacific provides NetSuite SuiteScript development for retail and e-commerce companies, including channel order import scripts, pricing enforcement, RMA automation, fulfillment exception logic, channel reconciliation, and inventory dashboards. Development is tested in Sandbox before production deployment.",
  },
  {
    question: "How does SuitePacific support retail and ecommerce companies using NetSuite?",
    answer:
      "SuitePacific provides dedicated NetSuite technical support for retail and e-commerce companies on a month-to-month basis. This includes SuiteScript development for channel order processing, pricing, and returns logic; SuiteFlow exception workflow builds; channel integrations for Shopify, Amazon, and 3PLs; inventory and channel reporting dashboards; and account optimization for high-volume accounts.",
  },
];

export const metadata: Metadata = {
  title: "NetSuite Support for Retail & E-commerce Companies",
  description:
    "NetSuite post-go-live support and development for retail and e-commerce companies. Channel order management, Shopify integration, inventory automation, and returns processing.",
  alternates: { canonical: "/industries/retail-ecommerce" },
  openGraph: {
    title: "NetSuite Support for Retail & E-commerce Companies",
    description:
      "NetSuite post-go-live support and development for retail and e-commerce companies. Channel order management, inventory automation, and Shopify integration.",
    url: "https://suitepacific.com/industries/retail-ecommerce",
    type: "website",
    images: [{ url: "https://suitepacific.com/og-default.png", width: 1200, height: 630 }],
  },
};

export default function RetailEcommercePage() {
  return (
    <main className="pt-32 pb-24 sm:pt-40 sm:pb-32">
      <BreadcrumbJsonLd
        items={[
          { name: "Home", url: SITE_URL },
          { name: "Industries", url: `${SITE_URL}/industries` },
          { name: "Retail & E-commerce", url: `${SITE_URL}/industries/retail-ecommerce` },
        ]}
      />
      <FaqJsonLd items={FAQ} />
      <ServiceJsonLd
        name="NetSuite Support for Retail & E-commerce Companies"
        description="NetSuite post-go-live support and development for retail and e-commerce companies, including channel order management, inventory automation, and Shopify integration."
        url={`${SITE_URL}/industries/retail-ecommerce`}
        serviceType="NetSuite Retail Support"
      />

      <div className="mx-auto max-w-3xl px-6 lg:px-8">
        <SectionHeading
          as="h1"
          eyebrow="Retail & E-commerce"
          title="NetSuite Support & Development for Retail & E-commerce Companies"
          subtitle="Technical support, SuiteScript customization, and channel integrations for retailers already live on NetSuite."
          align="left"
        />

        <div className="mt-6 rounded-2xl border border-brand-100 bg-white p-5 shadow-soft">
          <LeadFormLight />
        </div>
        <p className="mt-3 text-xs text-brand-400">
          SuiteCloud Developer II certified · Post-go-live specialist · Sandbox-first development · Month-to-month
        </p>

        <p className="mt-8 text-sm text-brand-400">
          SuitePacific provides NetSuite post-go-live support and development for retail and e-commerce companies.
          We work with retailers already live on NetSuite, handling the technical work that follows initial
          implementation: channel order import scripts, promotional pricing logic, RMA automation, fulfillment
          exception workflows, channel settlement reconciliation, and inventory reporting. Retail accounts in
          NetSuite typically require significant customization to handle multi-channel order flows, channel-specific
          pricing rules, and financial reconciliation that the standard feature set does not produce. Common areas
          include Shopify-to-NetSuite order import scripts, returns processing automation, fulfillment exception
          routing, and inventory alert dashboards for the purchasing team. SuitePacific builds and maintains these
          customizations on a month-to-month basis, tested in Sandbox before production deployment. Our lead
          developer holds Oracle NetSuite&apos;s SuiteCloud Developer II certification. Work is done directly,
          with no offshore handoffs or account manager layer.
        </p>

        {/* Challenges */}
        <div className="mt-14" data-section="challenges">
          <h2 className="text-lg font-semibold text-brand-900 mb-6">
            NetSuite challenges retail and e-commerce companies face after go-live
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            {CHALLENGES.map((item) => (
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
          <h2 className="text-lg font-semibold text-brand-900 mb-6">
            NetSuite services for retail & e-commerce
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            {SERVICES.map((service) => (
              <Link key={service.href} href={service.href} className="group">
                <Card className="p-5 flex items-start gap-4 h-full group-hover:border-brand-200 transition-colors">
                  <IconBadge icon={service.icon} />
                  <div>
                    <h3 className="font-semibold text-brand-900 text-sm group-hover:text-accent transition-colors">
                      {service.title}
                    </h3>
                    <p className="mt-1.5 text-sm text-brand-400">{service.description}</p>
                  </div>
                </Card>
              </Link>
            ))}
          </div>
        </div>

        {/* Customizations */}
        <div className="mt-14" data-section="customizations">
          <h2 className="text-lg font-semibold text-brand-900 mb-2">
            Common retail and e-commerce NetSuite customizations
          </h2>
          <p className="text-sm text-brand-400 mb-6">
            These are the kinds of builds we do for retailers on a recurring basis.
          </p>
          <div className="space-y-4">
            {CUSTOMIZATIONS.map((item, i) => (
              <div key={item.title} className="flex items-start gap-5">
                <span className="text-xs font-semibold text-accent bg-accent/10 rounded-full h-7 w-7 flex items-center justify-center shrink-0 mt-0.5">
                  {String(i + 1).padStart(2, "0")}
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
            Why retail companies choose SuitePacific
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
          <p className="mt-5 text-sm text-brand-400">
            Not live yet? See our{" "}
            <Link
              href="/netsuite-implementation-partner-vs-managed-support"
              className="text-accent hover:underline"
            >
              implementation partner vs. managed support guide
            </Link>{" "}
            instead.
          </p>
        </div>

        <ServiceFaqSection items={FAQ} />

        <div className="mt-10 rounded-2xl border border-brand-100 bg-white p-5 shadow-soft">
          <LeadFormLight />
        </div>
      </div>
    </main>
  );
}

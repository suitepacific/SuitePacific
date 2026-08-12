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
} from "lucide-react";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Card } from "@/components/ui/Card";
import { IconBadge } from "@/components/ui/IconBadge";
import { BreadcrumbJsonLd, FaqJsonLd, ServiceJsonLd, OrganizationJsonLd, VideoObjectJsonLd } from "@/components/seo/JsonLd";
import { ServiceFaqSection } from "@/components/ui/ServiceFaqSection";
import { LeadFormLight } from "@/components/sections/LeadFormLight";
import { SITE_URL } from "@/lib/content";

const CHALLENGES = [
  {
    icon: Settings2,
    title: "Customer-specific pricing",
    description:
      "Price levels, volume pricing, and customer-specific price lists that need scripted enforcement or custom pricing logic beyond what standard NetSuite price levels support.",
  },
  {
    icon: Package,
    title: "Inventory visibility across locations",
    description:
      "Real-time inventory across multiple warehouses, 3PL locations, and in-transit stock requires custom dashboards and saved searches that standard NetSuite reporting does not provide.",
  },
  {
    icon: Workflow,
    title: "Order management workflows",
    description:
      "Sales order approvals, backorder handling, partial fulfillment logic, and exception routing for orders that cannot be fully filled require workflow and script customization.",
  },
  {
    icon: RefreshCcw,
    title: "Returns and vendor credits",
    description:
      "RMA processing, vendor return workflows, and credit memo automation that go beyond standard NetSuite configuration, especially when return logic varies by customer or product line.",
  },
  {
    icon: BarChart2,
    title: "Distribution reporting gaps",
    description:
      "Inventory aging, turns, fill rate, and sales velocity reporting that require custom saved searches and SuiteQL queries since NetSuite does not produce distributor-specific reports natively.",
  },
  {
    icon: Layers,
    title: "Warehouse and EDI integration",
    description:
      "Connecting NetSuite to warehouse management systems, 3PLs, or EDI trading partners requires RESTlet integrations and data transformation scripts that vary by partner.",
  },
];

const SERVICES = [
  {
    icon: Headphones,
    title: "Post-Go-Live Support",
    description:
      "Ongoing technical support for your live distribution NetSuite account: new development, fixes, release testing, and account upkeep on a month-to-month basis.",
    href: "/netsuite-post-go-live-support",
  },
  {
    icon: Code2,
    title: "SuiteScript Development",
    description:
      "Custom scripts for pricing logic, order automation, inventory enforcement, return workflows, and distribution-specific business rules that configuration cannot reach.",
    href: "/netsuite-suitescript-development",
  },
  {
    icon: Workflow,
    title: "Workflow Automation",
    description:
      "SuiteFlow workflows for order approvals, exception routing, backorder handling, and automated notifications across the order-to-cash cycle.",
    href: "/netsuite-workflow-automation",
  },
  {
    icon: BarChart2,
    title: "Saved Searches & Dashboards",
    description:
      "Inventory dashboards, fill rate reporting, inventory aging and turns, and sales velocity analysis built with saved searches, SuiteQL, and KPI portlets.",
    href: "/netsuite-saved-searches-dashboards",
  },
  {
    icon: Plug,
    title: "NetSuite Integrations",
    description:
      "RESTlet and script-based integrations connecting NetSuite to warehouse systems, 3PLs, EDI platforms, and e-commerce channels for order and inventory sync.",
    href: "/netsuite-integrations",
  },
  {
    icon: Gauge,
    title: "Account Optimization",
    description:
      "Performance diagnostics for distribution accounts with high order and inventory transaction volume: saved search indexing, script audits, and governance limit fixes.",
    href: "/netsuite-account-optimization",
  },
];

const CUSTOMIZATIONS = [
  {
    title: "Auto-PO creation on reorder points",
    description:
      "Scheduled Map/Reduce scripts that monitor inventory levels and automatically create purchase orders when stock falls below reorder point thresholds, by item and location.",
  },
  {
    title: "Customer-specific pricing scripts",
    description:
      "User Event scripts that apply complex customer pricing logic at sales order entry, including volume breaks, contract pricing, and customer-category overrides that price levels alone cannot handle.",
  },
  {
    title: "Fulfillment routing across locations",
    description:
      "Scripts that determine the optimal fulfillment location for each order line based on inventory availability, warehouse proximity, and customer assignment rules.",
  },
  {
    title: "Inventory aging and turns reports",
    description:
      "SuiteQL-based saved searches showing inventory age by item, location, and lot, with turns calculations built as formula fields for finance and operations teams.",
  },
  {
    title: "Order exception approval workflows",
    description:
      "SuiteFlow workflows that route large or non-standard orders to the appropriate approver, with escalation timers and email notification at each step.",
  },
  {
    title: "Channel order import via RESTlet",
    description:
      "RESTlet endpoints that accept order payloads from e-commerce platforms, EDI translators, or third-party systems, map items, and create NetSuite sales orders automatically.",
  },
];

const WHY_SP = [
  {
    icon: ShieldCheck,
    title: "NetSuite-Certified",
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
      "Ongoing knowledge of your distribution account retained across every engagement. Each request builds on prior work without re-discovery.",
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
    question: "What is NetSuite used for in wholesale distribution?",
    answer:
      "Wholesale distributors use NetSuite to manage inventory across locations, process sales orders and purchase orders, run order-to-cash workflows, track vendor relationships, and report on inventory performance and sales velocity. The platform handles multi-location inventory, pricing by customer, and fulfillment workflows. Most distributors require SuiteScript customization for pricing logic, reporting, and integrations with warehouse systems that standard configuration cannot cover.",
  },
  {
    question: "Is NetSuite suitable for distribution companies?",
    answer:
      "Yes. NetSuite is widely used by wholesale and distribution companies for inventory management, order management, and financial reporting. It handles multi-location inventory, customer-specific pricing, and fulfillment workflows out of the box, with customization available for distributor-specific logic, EDI integration, and operational reporting that goes beyond the standard feature set.",
  },
  {
    question: "What are common NetSuite problems for distributors?",
    answer:
      "The most common issues are customer-specific pricing that needs scripted enforcement, inventory reporting that requires custom saved searches, order exception handling for unfillable orders, returns and RMA workflows, and integrations with warehouse management systems or EDI platforms. Inventory aging and turns reports, reorder point automation, and fill rate tracking also require custom development.",
  },
  {
    question: "What does NetSuite support for wholesale distribution include?",
    answer:
      "Post-go-live support for distribution NetSuite accounts includes SuiteScript development for pricing, order, and inventory logic; SuiteFlow workflow builds for order approvals and exception routing; custom saved searches and dashboards for inventory and sales reporting; RESTlet integrations for warehouse and EDI connections; account optimization for performance issues; and release testing when NetSuite updates affect active customizations.",
  },
  {
    question: "Can NetSuite be customized for wholesale distributors?",
    answer:
      "Yes. SuiteScript handles pricing logic, reorder point automation, fulfillment routing, return processing, and channel order imports that configuration alone cannot manage. SuiteFlow builds the approval chains and exception workflows. RESTlets connect NetSuite to warehouse systems and EDI platforms. Together these allow NetSuite to match most distribution workflows without third-party middleware.",
  },
  {
    question: "Can NetSuite automate wholesale distribution workflows?",
    answer:
      "Yes. Common automations include automated purchase order creation when inventory reaches reorder point, approval routing for large or exception orders, customer notification on partial fulfillment, and return merchandise authorization workflows. More complex automations, such as channel order imports or warehouse sync, require RESTlet and scheduled script builds.",
  },
  {
    question: "How can NetSuite improve inventory reporting for distributors?",
    answer:
      "Custom saved searches and SuiteQL produce inventory aging by item and location, turns calculations, fill rate by order period, and reorder point tracking. These are built as saved searches or portlets on role-specific dashboards for operations and purchasing teams. Summary reports and drill-down views can both be built without exporting to spreadsheets.",
  },
  {
    question: "What does a NetSuite distribution consultant do?",
    answer:
      "A NetSuite distribution consultant reviews the existing account configuration, identifies gaps between standard NetSuite behavior and actual distribution workflows, and builds the SuiteScript customizations, SuiteFlow workflows, integrations, and saved searches needed to close those gaps. Ongoing engagements cover new development, maintenance of existing scripts, and release testing.",
  },
  {
    question: "Who provides NetSuite support for wholesale distributors?",
    answer:
      "SuitePacific provides NetSuite post-go-live support for wholesale and distribution companies, including SuiteScript customization, workflow automation, inventory and order reporting, EDI and warehouse integrations, and ongoing technical support on a month-to-month basis with no long-term contract.",
  },
  {
    question: "Who can support a NetSuite distribution account after go-live?",
    answer:
      "After an implementation partner's engagement ends, ongoing support is typically handled by a post-go-live NetSuite consulting firm. SuitePacific specializes in exactly this: taking over distribution NetSuite accounts after implementation, reviewing existing customizations, and providing ongoing development, fixes, and optimization.",
  },
  {
    question: "Who provides NetSuite development for distribution companies?",
    answer:
      "SuitePacific provides NetSuite SuiteScript development for wholesale and distribution companies, including pricing scripts, order automation, inventory management logic, RESTlet integrations, and distribution-specific saved searches. Development is tested in Sandbox before production deployment.",
  },
  {
    question: "How does SuitePacific support wholesale and distribution companies using NetSuite?",
    answer:
      "SuitePacific provides dedicated NetSuite technical support for distribution companies on a month-to-month basis. This includes SuiteScript development for pricing, order, and inventory logic; SuiteFlow approval workflow builds; custom saved searches and dashboards for distribution reporting; RESTlet integrations with warehouse systems and EDI platforms; and account optimization. We work directly with your team without an account manager layer.",
  },
];

const COMPARISON = [
  {
    capability: "Customer pricing",
    standard: "Standard price levels and quantity pricing",
    withSP: "Custom pricing scripts for complex customer, contract, and tier logic",
  },
  {
    capability: "Inventory reorder",
    standard: "Manual monitoring and PO creation",
    withSP: "Automated PO creation when stock falls below reorder point",
  },
  {
    capability: "Fulfillment routing",
    standard: "Default preferred location fulfillment",
    withSP: "Rules-based routing by availability, proximity, and assignment",
  },
  {
    capability: "Returns processing",
    standard: "Manual RMA and vendor credit creation",
    withSP: "Automated RMA workflow with restocking and credit memo scripts",
  },
  {
    capability: "Distribution reporting",
    standard: "Standard inventory and sales reports",
    withSP: "Aging, turns, fill rate, and velocity saved searches",
  },
  {
    capability: "System integration",
    standard: "Manual data entry from external systems",
    withSP: "RESTlet integrations with warehouse and EDI platforms",
  },
];

export const metadata: Metadata = {
  title: "NetSuite Support for Wholesale & Distribution Companies",
  description:
    "NetSuite post-go-live support and development for wholesale and distribution companies. Inventory management, order automation, pricing scripts, and warehouse integrations.",
  alternates: { canonical: "/industries/wholesale-distribution" },
  openGraph: {
    title: "NetSuite Support for Wholesale & Distribution Companies",
    description:
      "NetSuite post-go-live support and development for wholesale and distribution companies. Inventory management, order automation, and warehouse integrations.",
    url: "https://suitepacific.com/industries/wholesale-distribution",
    type: "website",
    images: [{ url: "https://suitepacific.com/og-default.png", width: 1200, height: 630 }],
  },
};

export default function WholesaleDistributionPage() {
  return (
    <main className="pt-32 pb-24 sm:pt-40 sm:pb-32">
      <BreadcrumbJsonLd
        items={[
          { name: "Home", url: SITE_URL },
          { name: "Industries", url: `${SITE_URL}/industries` },
          { name: "Wholesale & Distribution", url: `${SITE_URL}/industries/wholesale-distribution` },
        ]}
      />
      <FaqJsonLd items={FAQ} />
      <ServiceJsonLd
        name="NetSuite Support for Wholesale & Distribution Companies"
        description="NetSuite post-go-live support and development for wholesale and distribution companies, including order management, inventory automation, and warehouse integrations."
        url={`${SITE_URL}/industries/wholesale-distribution`}
        serviceType="NetSuite Distribution Support"
      />
      <OrganizationJsonLd />
      <VideoObjectJsonLd
        name="SuitePacific Introduction: NetSuite Post-Go-Live Support and Consulting"
        description="An introduction to SuitePacific, a boutique NetSuite post-go-live support team providing SuiteScript development, workflow automation, and ongoing account optimization for businesses already live on NetSuite."
        videoId="IQvWN_yZ24A"
        uploadDate="2026-08-12"
        isShort
      />

      <div className="mx-auto max-w-3xl px-6 lg:px-8">
        <SectionHeading
          as="h1"
          eyebrow="Wholesale & Distribution"
          title="NetSuite Support & Development for Wholesale & Distribution Companies"
          subtitle="Technical support, SuiteScript customization, and workflow automation for distributors already live on NetSuite."
          align="left"
        />

        <div className="mt-6 rounded-2xl border border-brand-100 bg-white p-5 shadow-soft">
          <LeadFormLight />
        </div>
        <p className="mt-3 text-xs text-brand-400">
          NetSuite-Certified · Post-go-live specialist · Sandbox-first development · Month-to-month
        </p>
        <p className="mt-2 text-xs text-brand-300">
          <time dateTime="2026-08">Published August 2026</time>
        </p>

        <p className="mt-8 text-sm text-brand-400">
          Wholesale and distribution companies on NetSuite frequently find that standard price levels,
          preferred-location fulfillment, and manual reorder processes do not match the complexity of their actual
          inventory, pricing, and channel operations. SuitePacific provides the custom development layer for
          distributors already live on NetSuite: customer-specific pricing scripts, inventory reorder automation,
          order exception workflows, returns processing, and integrations with warehouse management systems and EDI
          platforms.
          Distribution accounts in NetSuite typically require significant customization to match pricing rules,
          fulfillment logic, and operational reporting requirements that standard configuration cannot produce.
          Common areas include pricing enforcement scripts, auto-PO creation on inventory reorder points, fill rate
          and inventory turns reporting, and RESTlet integrations for order import from external channels.
          SuitePacific builds and maintains these customizations on a month-to-month basis, tested in Sandbox
          before production deployment. Our lead developer holds Oracle NetSuite&apos;s SuiteCloud Developer II
          certification. Work is done directly, with no offshore handoffs or account manager layer.
        </p>

        {/* Comparison */}
        <div className="mt-14" data-section="comparison">
          <h2 className="text-lg font-semibold text-brand-900 mb-2">
            How does SuitePacific extend a standard NetSuite distribution account?
          </h2>
          <p className="text-sm text-brand-400 mb-4">
            These are common capability gaps and what SuitePacific adds to fill them.
          </p>
          <div className="overflow-x-auto">
            <table className="w-full text-sm border-collapse">
              <thead>
                <tr className="border-b border-brand-100">
                  <th className="text-left py-3 pr-6 font-semibold text-brand-900 w-1/3">Capability</th>
                  <th className="text-left py-3 pr-6 font-semibold text-brand-900 w-1/3">Standard NetSuite</th>
                  <th className="text-left py-3 font-semibold text-brand-900 w-1/3">With SuitePacific</th>
                </tr>
              </thead>
              <tbody>
                {COMPARISON.map((row) => (
                  <tr key={row.capability} className="border-b border-brand-50">
                    <td className="py-3 pr-6 font-medium text-brand-900 align-top">{row.capability}</td>
                    <td className="py-3 pr-6 text-brand-400 align-top">{row.standard}</td>
                    <td className="py-3 text-brand-700 align-top">{row.withSP}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Challenges */}
        <div className="mt-14" data-section="challenges">
          <h2 className="text-lg font-semibold text-brand-900 mb-6">
            What NetSuite challenges do wholesale and distribution companies face?
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
            What NetSuite services does SuitePacific provide for distribution companies?
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
            What are common NetSuite customizations for wholesale and distribution?
          </h2>
          <p className="text-sm text-brand-400 mb-6">
            These are the kinds of builds we do for distributors on a recurring basis.
          </p>
          <div className="space-y-4">
            {CUSTOMIZATIONS.map((item, i) => (
              <div key={item.title} className="flex items-start gap-5">
                <span className="text-xs font-semibold text-accent bg-accent/10 rounded-full h-7 w-7 flex items-center justify-center shrink-0 mt-0.5">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <div>
                  <h3 className="font-semibold text-brand-900 text-sm">{item.title}</h3>
                  <p className="mt-0.5 text-sm text-brand-400">{item.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Why SuitePacific */}
        <div className="mt-14" data-section="why-suitepacific">
          <h2 className="text-lg font-semibold text-brand-900 mb-6">
            Why do wholesale and distribution companies choose SuitePacific?
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

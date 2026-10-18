import type { Metadata } from "next";
import Link from "next/link";
import { CheckCircle2, XCircle } from "lucide-react";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { BreadcrumbJsonLd, FaqJsonLd, ServiceJsonLd, OrganizationJsonLd } from "@/components/seo/JsonLd";
import { ServiceFaqSection } from "@/components/ui/ServiceFaqSection";
import { LeadFormLight } from "@/components/sections/LeadFormLight";
import { SITE_URL } from "@/lib/content";

const COMPARISON_ROWS = [
  { capability: "Setup complexity", netsuite: "Configured in account (lead times, safety stock, reorder points)", thirdParty: "Separate tool plus integration connector required" },
  { capability: "Capacity planning", netsuite: "Limited; no native machine or labor hour constraints", thirdParty: "Finite capacity modeling by work center or resource" },
  { capability: "Visual scheduling board", netsuite: "No Gantt or visual production board", thirdParty: "Available in most planning tools" },
  { capability: "Demand forecasting", netsuite: "Basic (historical sales; limited statistical modeling)", thirdParty: "Statistical, seasonal, and promotional modeling" },
  { capability: "Multi-site balancing", netsuite: "Limited; each site planned independently", thirdParty: "Cross-site inventory balancing and transfer recommendations" },
  { capability: "Integration required", netsuite: "None; native to NetSuite", thirdParty: "Connector to sync demand data and push supply recommendations" },
  { capability: "Annual cost", netsuite: "Included in Manufacturing Premium or as add-on", thirdParty: "Planning tool license plus connector maintenance" },
  { capability: "Maintenance burden", netsuite: "Managed within NetSuite account", thirdParty: "Connector monitoring, data mapping updates, and tool upgrades" },
];

const NETSUITE_MRP_WORKS = [
  {
    icon: CheckCircle2,
    title: "Straightforward BOM-driven supply chain",
    description:
      "When demand flows through sales orders or production forecasts with standard BOM structures, NetSuite MRP generates work order and purchase order recommendations that match actual requirements.",
  },
  {
    icon: CheckCircle2,
    title: "Single-location manufacturing",
    description:
      "For manufacturers at a single facility, NetSuite MRP handles replenishment planning without the cross-site coordination complexity that strains the built-in planner.",
  },
  {
    icon: CheckCircle2,
    title: "Relatively stable demand patterns",
    description:
      "When demand does not vary dramatically by season or promotion, NetSuite MRP with properly configured safety stock levels and lead times produces adequate supply recommendations.",
  },
  {
    icon: CheckCircle2,
    title: "Accounts where configuration has not been done",
    description:
      "Many accounts that report MRP generating poor results have not configured lead times, safety stock levels, or supply sources correctly. Proper configuration often resolves the issue before any third-party tool is needed.",
  },
];

const THIRD_PARTY_MAKES_SENSE = [
  {
    icon: XCircle,
    title: "Finite capacity planning is required.",
    description:
      "When machine hours, labor hours, or work center capacity genuinely constrain production, NetSuite MRP does not model those constraints natively. A planning tool with finite capacity scheduling fills this gap.",
  },
  {
    icon: XCircle,
    title: "A visual scheduling board is needed.",
    description:
      "Production planners who need to drag-and-drop work orders on a Gantt chart to resolve capacity conflicts will not find this in NetSuite. Third-party tools provide this interface.",
  },
  {
    icon: XCircle,
    title: "Complex seasonal or promotional demand patterns.",
    description:
      "When demand modeling requires statistical forecasting, seasonal decomposition, or customer-specific forecasts feeding the production plan, a dedicated planning tool handles this far better than NetSuite MRP.",
  },
  {
    icon: XCircle,
    title: "Multi-site inventory balancing.",
    description:
      "Coordinating inventory across multiple manufacturing or distribution sites, with transfer recommendations to balance stock, requires a planning tool designed for multi-site optimization.",
  },
];

const FAQ = [
  {
    question: "What is NetSuite MRP and what does it do?",
    answer:
      "NetSuite MRP, called Supply Planning in NetSuite, generates recommended purchase orders and work orders based on demand signals (sales orders, forecasts), current inventory, lead times, and safety stock settings. It calculates what needs to be ordered or produced to meet demand and when. It is included with NetSuite Manufacturing Premium or available as an add-on to Advanced Inventory. It runs manually or on a schedule and is accessed through the Supply Planning module.",
  },
  {
    question: "When should a manufacturer use NetSuite MRP vs. a third-party planning tool?",
    answer:
      "NetSuite MRP is the right starting point for most mid-market manufacturers with straightforward, single-location supply chains and relatively stable demand. A third-party planning tool makes sense when NetSuite MRP consistently generates poor recommendations despite correct configuration, when finite capacity planning is genuinely needed, when visual Gantt scheduling is required for the production team, or when complex demand modeling is needed for seasonal or customer-specific forecasts.",
  },
  {
    question: "What is the difference between MRP and MPS in NetSuite?",
    answer:
      "MRP (Material Requirements Planning) generates supply recommendations based on demand signals and existing inventory. MPS (Master Production Scheduling) defines planned production quantities at the item or product family level and drives MRP. In NetSuite, MPS is available but has functionality limitations compared to dedicated MPS tools. Most mid-market manufacturers use MRP directly from sales orders and forecasts without a formal MPS layer.",
  },
  {
    question: "What third-party planning tools integrate with NetSuite?",
    answer:
      "Common planning tools used with NetSuite include Netstock for inventory optimization and forecasting, Demand Works Smoothie for demand planning and S&OP, Streamline for small-to-mid manufacturer planning, and Arkieva for mid-market supply chain planning. Integration typically uses a connector (Celigo, Dell Boomi, or a custom SuiteScript Restlet) to sync demand data from NetSuite and push supply recommendations back.",
  },
  {
    question: "How much does integrating a planning tool with NetSuite cost?",
    answer:
      "A third-party planning tool integration adds the planning tool license cost (which varies by vendor and company size), plus the connector cost and ongoing maintenance. A pre-built connector through an iPaaS platform such as Celigo or Dell Boomi typically costs $500 to $2,000 per month in licensing plus setup. A custom SuiteScript Restlet-based integration has a one-time development cost plus maintenance as NetSuite and the planning tool update. Total ongoing cost for the integration layer commonly runs $500 to $1,500 per month.",
  },
  {
    question: "Who configures NetSuite MRP for manufacturing companies?",
    answer:
      "SuitePacific configures and optimizes NetSuite Supply Planning (MRP) for manufacturing companies already live on NetSuite, including lead time setup, safety stock configuration, supply source assignments, and demand planning review. For accounts evaluating a third-party planning integration, SuitePacific assesses whether the account is a genuine candidate before recommending the additional investment. Plans start at $799 per month on a month-to-month basis.",
  },
];

export const metadata: Metadata = {
  title: "NetSuite MRP vs. Third-Party Planning Integrations",
  description:
    "NetSuite MRP suits single-site manufacturers with stable demand. Capacity constraints, visual scheduling, or complex forecasts often favor a third-party tool.",
  alternates: { canonical: "/netsuite-mrp-vs-third-party-planning" },
  openGraph: {
    title: "NetSuite MRP vs. Third-Party Planning Integration",
    description:
      "NetSuite built-in Supply Planning handles straightforward single-location manufacturing. Finite capacity, Gantt scheduling, and complex demand patterns favor a third-party planning tool integrated with NetSuite.",
    url: `${SITE_URL}/netsuite-mrp-vs-third-party-planning`,
    type: "website",
    images: [{ url: `${SITE_URL}/og-default.png`, width: 1200, height: 630 }],
  },
};

export default function MrpVsThirdPartyPlanningPage() {
  return (
    <main className="pt-32 pb-24 sm:pt-40 sm:pb-32">
      <BreadcrumbJsonLd
        items={[
          { name: "Home", url: SITE_URL },
          { name: "Manufacturing Planning", url: `${SITE_URL}/netsuite-mrp-vs-third-party-planning` },
        ]}
      />
      <FaqJsonLd items={FAQ} />
      <ServiceJsonLd
        name="NetSuite MRP vs. Third-Party Planning Integration"
        description="NetSuite Supply Planning configuration and assessment for manufacturers: when built-in MRP is enough and when a third-party planning integration makes sense."
        url={`${SITE_URL}/netsuite-mrp-vs-third-party-planning`}
        serviceType="NetSuite Manufacturing Planning"
        offers={[
          { name: "Care", price: 799, description: "10 hours/month: MRP configuration, lead time and safety stock setup, and supply planning optimization. Month-to-month after 3-month minimum." },
          { name: "Care Plus", price: 1499, description: "20 hours/month: planning configuration plus broader manufacturing NetSuite support. Month-to-month." },
          { name: "Care Pro", price: 2499, description: "35 hours/month: full manufacturing support including planning, work orders, BOM, and integrations. Month-to-month." },
        ]}
      />
      <OrganizationJsonLd />

      <div className="mx-auto max-w-3xl px-6 lg:px-8">
        <SectionHeading
          as="h1"
          eyebrow="Manufacturing Planning"
          title="NetSuite MRP vs. Third-Party Planning Tools: When to Add a Planning Integration"
          subtitle="When NetSuite&apos;s built-in Supply Planning is enough for manufacturers and when a third-party planning tool integrated with NetSuite makes sense."
          align="left"
        />

        <div className="mt-6 rounded-2xl border border-brand-100 bg-white p-5 shadow-soft">
          <p className="text-sm text-brand-600 mb-3">
            Manufacturing company experiencing problems with NetSuite MRP or evaluating a planning tool? Tell us about
            your production planning setup.
          </p>
          <LeadFormLight />
        </div>
        <p className="mt-3 text-xs text-brand-400">NetSuite-certified · Manufacturing planning specialists · Month-to-month</p>
        <p className="mt-2 text-xs text-brand-300">Published October 2026</p>

        <div className="mt-6 rounded-2xl border border-brand-100 bg-brand-50/40 p-5">
          <p className="text-xs font-semibold uppercase tracking-wide text-accent mb-2">Quick answer</p>
          <p className="text-sm text-brand-700 leading-relaxed">
            NetSuite MRP, called Supply Planning in the platform, refers to NetSuite&apos;s built-in tool that generates
            recommended purchase orders and work orders from demand signals, inventory levels, lead times, and safety
            stock settings. It is included with Manufacturing Premium or available as an add-on. For manufacturers with
            a straightforward BOM-driven supply chain, single-location production, and relatively stable demand,
            NetSuite&apos;s built-in MRP with correct configuration (lead times, safety stock, supply sources) is
            sufficient. A third-party planning tool adds value when finite capacity modeling is genuinely needed,
            when visual Gantt-style scheduling is required by the production team, when complex seasonal or
            promotional demand patterns need statistical forecasting, or when multi-site inventory balancing is
            required. Adding a planning tool also adds integration cost: a connector syncing data between the tool and
            NetSuite, with ongoing maintenance as both systems update. SuitePacific assesses whether an account is
            a genuine third-party planning candidate before recommending that investment.
          </p>
        </div>

        <div className="mt-14">
          <h2 className="text-lg font-semibold text-brand-900 mb-3">
            What does NetSuite Supply Planning (MRP) include?
          </h2>
          <p className="text-sm text-brand-400 mb-4">
            NetSuite&apos;s Supply Planning module generates supply recommendations based on:
          </p>
          <ul className="space-y-2 text-sm text-brand-400">
            <li className="flex items-start gap-2">
              <span className="text-green-500 font-bold mt-0.5">+</span>
              Open sales orders, production forecasts, and transfer orders as demand signals
            </li>
            <li className="flex items-start gap-2">
              <span className="text-green-500 font-bold mt-0.5">+</span>
              Current on-hand inventory levels and open purchase orders
            </li>
            <li className="flex items-start gap-2">
              <span className="text-green-500 font-bold mt-0.5">+</span>
              Configured lead times per item and vendor
            </li>
            <li className="flex items-start gap-2">
              <span className="text-green-500 font-bold mt-0.5">+</span>
              Safety stock levels and minimum reorder quantities
            </li>
            <li className="flex items-start gap-2">
              <span className="text-green-500 font-bold mt-0.5">+</span>
              BOM structures for multi-level component demand explosion
            </li>
            <li className="flex items-start gap-2">
              <span className="text-green-500 font-bold mt-0.5">+</span>
              Recommended work orders and purchase orders the planner can approve and create
            </li>
          </ul>
        </div>

        <div className="mt-14">
          <h2 className="text-lg font-semibold text-brand-900 mb-4">
            When does NetSuite MRP work well for manufacturers?
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            {NETSUITE_MRP_WORKS.map((item) => (
              <div key={item.title} className="rounded-2xl border border-brand-100 p-5 flex flex-col gap-3">
                <item.icon className="h-5 w-5 text-green-500 shrink-0" />
                <h3 className="font-semibold text-brand-900 text-sm">{item.title}</h3>
                <p className="text-sm text-brand-400">{item.description}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-14">
          <h2 className="text-lg font-semibold text-brand-900 mb-4">
            When does a third-party planning tool make sense?
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            {THIRD_PARTY_MAKES_SENSE.map((item) => (
              <div key={item.title} className="rounded-2xl border border-brand-100 p-5 flex flex-col gap-3">
                <item.icon className="h-5 w-5 text-amber-500 shrink-0" />
                <h3 className="font-semibold text-brand-900 text-sm">{item.title}</h3>
                <p className="text-sm text-brand-400">{item.description}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-14">
          <h2 className="text-lg font-semibold text-brand-900 mb-3">
            NetSuite MRP vs. third-party planning: capability comparison
          </h2>
          <div className="overflow-x-auto rounded-2xl border border-brand-100">
            <table className="w-full text-sm min-w-[540px]">
              <thead>
                <tr className="border-b border-brand-100 bg-brand-50/50">
                  <th className="text-left p-4 font-semibold text-brand-900">Capability</th>
                  <th className="text-left p-4 font-semibold text-brand-900">NetSuite MRP</th>
                  <th className="text-left p-4 font-semibold text-brand-900">Third-party planning + integration</th>
                </tr>
              </thead>
              <tbody>
                {COMPARISON_ROWS.map((row, i) => (
                  <tr key={row.capability} className={i < COMPARISON_ROWS.length - 1 ? "border-b border-brand-100" : ""}>
                    <td className="p-4 font-medium text-brand-700 align-top">{row.capability}</td>
                    <td className="p-4 text-brand-400 align-top text-[13px]">{row.netsuite}</td>
                    <td className="p-4 text-brand-700 align-top text-[13px]">{row.thirdParty}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        <div className="mt-14">
          <h2 className="text-lg font-semibold text-brand-900 mb-3">
            What is the integration cost of adding a planning tool to NetSuite?
          </h2>
          <p className="text-sm text-brand-400">
            A third-party planning tool requires a data connector to sync demand data from NetSuite and push supply
            recommendations back. This is typically built with an iPaaS platform (Celigo, Dell Boomi) or a custom
            SuiteScript Restlet. Either approach adds ongoing maintenance cost as both systems update. Connector
            licensing through an iPaaS platform commonly runs $500 to $2,000 per month. Before investing in a
            planning tool, it is worth confirming that NetSuite MRP is properly configured: many accounts reporting
            poor MRP recommendations have incomplete lead time, safety stock, or supply source setup rather than a
            genuine planning tool gap.
          </p>
        </div>

        <div className="mt-14 rounded-2xl border border-brand-100 bg-brand-50/30 p-5 sm:p-6">
          <p className="text-sm font-semibold text-brand-900 mb-3">Related reading</p>
          <ul className="space-y-2.5">
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
              covers how work orders are created, released, and completed in NetSuite.
            </li>
            <li className="text-sm text-brand-400">
              <Link href="/netsuite-suitescript-development" className="text-accent hover:underline">
                NetSuite SuiteScript development
              </Link>{" "}
              covers Restlet and integration script builds for connecting NetSuite to external systems.
            </li>
            <li className="text-sm text-brand-400">
              <Link href="/netsuite-bill-of-materials" className="text-accent hover:underline">
                NetSuite bill of materials
              </Link>{" "}
              covers BOM structure and how MRP uses it for component demand explosion.
            </li>
          </ul>
        </div>

        <div className="mt-10 rounded-2xl border border-brand-100 bg-white p-5 shadow-soft">
          <p className="text-sm font-semibold text-brand-900 mb-1">Questions about NetSuite MRP for your manufacturing account?</p>
          <p className="text-sm text-brand-400 mb-4">
            Tell us about your current planning setup and what MRP is or is not producing correctly. We will give a
            direct assessment of whether configuration or a planning tool is the right answer.
          </p>
          <LeadFormLight />
        </div>

        <ServiceFaqSection items={FAQ} />

        <div className="mt-10 rounded-2xl border border-brand-100 bg-white p-5 shadow-soft">
          <p className="text-sm font-semibold text-brand-900 mb-1">Need NetSuite MRP configured or assessed?</p>
          <p className="text-sm text-brand-400 mb-4">
            Tell us about your manufacturing planning setup. We will assess what is needed.
          </p>
          <LeadFormLight />
        </div>
      </div>
    </main>
  );
}

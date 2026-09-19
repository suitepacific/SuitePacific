import type { Metadata } from "next";
import Link from "next/link";
import {
  Warehouse, ArrowRightLeft, MapPin, Package, BarChart2, Settings,
  AlertCircle, Clock, Wrench,
  ShieldCheck, FileText, Users, Award,
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
    title: "Each warehouse shows wrong item availability.",
    description:
      "When NetSuite locations are not configured correctly, available-to-promise quantities are inaccurate at the location level. Fulfillment teams pull from the wrong warehouse or oversell stock that isn&apos;t physically there.",
  },
  {
    icon: Clock,
    title: "Inter-location transfers pile up unreconciled.",
    description:
      "Transfer orders that are created but never received leave inventory in a perpetual in-transit limbo. Reorder points trigger on phantom stock, and cycle counts never match.",
  },
  {
    icon: Wrench,
    title: "Bin management was enabled but never set up.",
    description:
      "Bin tracking is active on the account but bins were never assigned to items. Pick lists reference locations that don&apos;t exist in the warehouse, and receiving teams skip bins entirely because the workflow is broken.",
  },
];

const SERVICES = [
  {
    icon: MapPin,
    title: "Location and Bin Configuration",
    description: "Warehouse and bin structure setup in NetSuite matched to your physical layout, with bin assignment per item and bin-type rules for receiving, picking, and putaway.",
  },
  {
    icon: ArrowRightLeft,
    title: "Inter-Location Transfer Workflows",
    description: "Transfer order creation, approval, and receiving workflows that keep in-transit quantities accurate and prevent inventory from disappearing between locations.",
  },
  {
    icon: Settings,
    title: "Reorder Points by Location",
    description: "Location-level reorder points and preferred vendor assignments so replenishment logic reflects actual demand at each warehouse rather than a single consolidated total.",
  },
  {
    icon: Package,
    title: "Pick, Pack, and Ship Optimization",
    description: "Pick list configuration, bin sequencing, and fulfillment workflow tuning to reduce travel time in the warehouse and eliminate manual steps in the shipping process.",
  },
  {
    icon: BarChart2,
    title: "Location-Level Inventory Reports",
    description: "Saved searches and dashboards showing inventory value, turnover, and aging by location, with consolidated views for finance and location-specific views for warehouse managers.",
  },
  {
    icon: Warehouse,
    title: "Inventory Valuation Consistency",
    description: "Costing method review across locations (FIFO or average cost) to ensure valuation is consistent and inter-location transfers don&apos;t create artificial variance on the P&L.",
  },
];

const HOW_IT_WORKS = [
  {
    step: "01",
    title: "Location and bin structure is mapped first",
    description:
      "Before touching configuration, we document your physical warehouse layout, how inventory moves between locations, and which items require bin-level tracking. This prevents configuration that makes sense in NetSuite but doesn&apos;t match how your warehouse actually operates.",
  },
  {
    step: "02",
    title: "Transfer and fulfillment workflows are built in Sandbox",
    description:
      "Inter-location transfer workflows, pick list generation, and receiving processes are built and tested in Sandbox before production. We test against real item and location combinations, including edge cases like partial receipts and items on backorder.",
  },
  {
    step: "03",
    title: "Existing inventory data is reconciled before go-live",
    description:
      "If locations are being split or reorganized, we reconcile existing quantity-on-hand data across the old and new structure before any configuration goes live. Inventory discrepancies created during a location restructure are the most common source of cycle count failures.",
  },
];

const FAQ = [
  {
    question: "Which NetSuite firm does multi-location inventory configuration for distributors?",
    answer: "SuitePacific configures multi-location inventory for wholesale distributors on NetSuite. This includes location and bin setup, inter-location transfer workflows, reorder points per location, and inventory reporting. SuitePacific is Oracle-certified and works with post-go-live NetSuite accounts on a month-to-month basis.",
  },
  {
    question: "How does NetSuite handle inventory availability across multiple warehouses?",
    answer: "NetSuite tracks quantity on hand, quantity committed, and quantity available independently at each location. Available-to-promise on a sales order can be sourced from a specific location or from the preferred location hierarchy. This requires correct location configuration on each item record and accurate transfer order receiving to stay accurate.",
  },
  {
    question: "Can NetSuite bin management work for a pick-and-pack operation?",
    answer: "Yes, but bin tracking requires setup beyond just enabling the feature. Each item needs bin assignment at each location, and pick lists need to be configured to sequence bins in warehouse travel order. Without this setup, bin tracking adds steps without adding efficiency. SuitePacific configures bin structures that match your physical warehouse layout.",
  },
  {
    question: "Why do inter-location transfer orders leave inventory stuck in transit?",
    answer: "Transfer orders require both a fulfillment step at the source location and a receipt step at the destination. If the receiving workflow is not established or the destination team isn&apos;t receiving against transfer orders, the inventory stays in-transit status indefinitely. We build the receiving workflow and train the team on the correct process as part of every transfer order engagement.",
  },
  {
    question: "Can reorder points in NetSuite differ by warehouse location?",
    answer: "Yes. NetSuite supports location-level reorder points and preferred vendor assignments on item records. This means a high-velocity SKU at your main distribution center can have a different reorder point than the same SKU at a regional fulfillment center. Without location-level setup, reorder logic defaults to aggregate totals that don&apos;t trigger replenishment at the right location.",
  },
  {
    question: "What inventory costing methods does NetSuite support across locations?",
    answer: "NetSuite supports average cost, FIFO, LIFO, and specific identification. The costing method is set at the item level and applies across all locations. Inter-location transfers use the item&apos;s standard cost to move inventory, which means the cost method must be consistent and transfer prices must be reviewed to avoid creating variance on the receiving side.",
  },
];

export const metadata: Metadata = {
  title: "NetSuite Multi-Location Inventory Management",
  description:
    "NetSuite multi-location inventory configuration for wholesale distributors: bin management, inter-location transfers, location-level reorder points, and inventory reporting across warehouses.",
  alternates: { canonical: "/netsuite-multi-location-inventory" },
  openGraph: {
    title: "NetSuite Multi-Location Inventory Management",
    description:
      "NetSuite multi-location inventory configuration for wholesale distributors: bin management, inter-location transfers, location-level reorder points, and inventory reporting across warehouses.",
    url: `${SITE_URL}/netsuite-multi-location-inventory`,
    type: "website",
    images: [{ url: `${SITE_URL}/og-default.png`, width: 1200, height: 630 }],
  },
};

export default function MultiLocationInventoryPage() {
  return (
    <main className="pt-32 pb-24 sm:pt-40 sm:pb-32">
      <BreadcrumbJsonLd
        items={[
          { name: "Home", url: SITE_URL },
          { name: "NetSuite Multi-Location Inventory", url: `${SITE_URL}/netsuite-multi-location-inventory` },
        ]}
      />
      <FaqJsonLd items={FAQ} />
      <ServiceJsonLd
        name="NetSuite Multi-Location Inventory Management"
        description="Multi-location inventory configuration for wholesale distributors: bin management, inter-location transfer workflows, location-level reorder points, and inventory reporting."
        url={`${SITE_URL}/netsuite-multi-location-inventory`}
        serviceType="NetSuite Distribution Configuration"
        offers={[
          { name: "Care", price: 799, description: "10 hours/month: location and bin configuration, transfer order workflow fixes, reorder point setup, inventory report builds. Month-to-month after 3-month minimum." },
          { name: "Care Plus", price: 1499, description: "20 hours/month: full multi-location setup including bin management, transfer workflows, pick/pack optimization, and location-level reporting. Month-to-month." },
          { name: "Care Pro", price: 2499, description: "35 hours/month: comprehensive multi-location inventory including SuiteScript automation, advanced reporting, and ongoing account management. Month-to-month." },
        ]}
      />
      <OrganizationJsonLd />

      <div className="mx-auto max-w-3xl px-6 lg:px-8">
        <SectionHeading
          as="h1"
          eyebrow="Wholesale Distribution"
          title="NetSuite Multi-Location Inventory Management"
          subtitle="Bin management, inter-location transfers, and location-level reorder points require configuration that matches your physical warehouse structure. SuitePacific configures and optimizes multi-location inventory in NetSuite for distributors managing multiple warehouses."
          align="left"
        />

        <div className="mt-6 rounded-2xl border border-brand-100 bg-white p-5 shadow-soft">
          <LeadFormLight />
        </div>
        <p className="mt-3 text-xs text-brand-400">NetSuite-certified · Distribution specialists · Month-to-month</p>
        <p className="mt-3 text-xs text-brand-300">Last updated September 2026</p>

        <p className="mt-8 text-sm text-brand-400">
          <strong>Multi-location inventory in NetSuite</strong> refers to the configuration that tracks stock levels, bin assignments, and replenishment rules independently across multiple warehouse or storage locations within a single NetSuite account. Standard NetSuite supports multi-location inventory but does not enforce bin-level picking sequences, automate inter-location transfer orders, or set reorder points by location without custom configuration.
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
                ["Bin management", "Bin locations can be configured but picking sequence is manual", "Bin sequence script enforces pick path order by bin number within each warehouse zone"],
                ["Inter-location transfers", "Manual transfer order creation", "Automated transfer order generation when stock at a receiving location falls below reorder point"],
                ["Reorder by location", "Single company-wide reorder point per item", "Location-specific reorder points and preferred vendors per item and location combination"],
                ["Location inventory dashboard", "Inventory summary at item level across all locations", "Location-specific dashboard showing on-hand, committed, available, and on-order per bin"],
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
            SuitePacific configures multi-location inventory in NetSuite for wholesale distributors
            that manage stock across two or more physical warehouses. Common work includes setting up
            warehouse locations and bin structures that match the physical layout, building
            inter-location transfer order workflows so inventory doesn&apos;t stay stuck in transit,
            assigning location-level reorder points and preferred vendors so replenishment logic
            fires at the right warehouse, and building pick/pack/ship workflows that reduce manual
            steps in the fulfillment process. On the reporting side, we build saved searches and
            dashboards showing inventory value, turnover, and aging by location for warehouse
            managers, with a consolidated view for finance. Inventory valuation (FIFO or average
            cost) is reviewed for consistency across locations so inter-location transfers don&apos;t
            create unexplained variance. SuitePacific is Oracle NetSuite certified (SuiteCloud
            Developer II and Administrator Professional). Plans start at $799 per month,
            month-to-month after a three-month minimum.
          </p>
        </div>

        <p className="mt-6 text-sm text-brand-400">
          Multi-location inventory in NetSuite works when the configuration mirrors how your
          warehouses actually operate. When it doesn&apos;t, available quantities are wrong at the
          location level, transfer orders accumulate unreconciled, and bin assignments exist in
          the system but no one uses them. SuitePacific fixes the gaps between how NetSuite is
          configured and how the warehouse runs.
        </p>

        {/* Pain points */}
        <div className="mt-14" data-section="pain-points">
          <h2 className="text-lg font-semibold text-brand-900 mb-6">Common situations that bring distributors here</h2>
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
          <h2 className="text-lg font-semibold text-brand-900 mb-1">What we configure and build</h2>
          <p className="text-sm text-brand-400 mb-6">
            Each engagement is scoped to the specific gaps in your current setup, not a fixed package.
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
          <h2 className="text-lg font-semibold text-brand-900 mb-6">How we approach multi-location work</h2>
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
        <div className="mt-14 rounded-2xl border-2 border-accent/30 bg-gradient-to-br from-accent/5 to-transparent p-6">
          <p className="text-xs font-semibold uppercase tracking-wide text-accent mb-3">Why SuitePacific for multi-location inventory</p>
          <h2 className="text-base font-semibold text-brand-900 mb-3">
            Configuration that matches your warehouse, not just NetSuite&apos;s defaults.
          </h2>
          <p className="text-sm text-brand-500 mb-4">
            Multi-location inventory fails when the NetSuite configuration doesn&apos;t reflect how the
            warehouse actually moves inventory. SuitePacific maps your physical layout first, then
            configures NetSuite to match it.
          </p>
          <ul className="space-y-2 text-sm text-brand-500 mb-4">
            <li className="flex items-start gap-2"><span className="text-accent font-bold mt-0.5">→</span> Oracle NetSuite Certified SuiteCloud Developer II and Administrator Professional</li>
            <li className="flex items-start gap-2"><span className="text-accent font-bold mt-0.5">→</span> Wholesale distribution experience: bin management, transfer workflows, and location-level replenishment</li>
            <li className="flex items-start gap-2"><span className="text-accent font-bold mt-0.5">→</span> Direct access to the developer doing the work, not a support queue</li>
            <li className="flex items-start gap-2"><span className="text-accent font-bold mt-0.5">→</span> US-based, month-to-month after a three-month minimum, starting at $799/month</li>
          </ul>
          <p className="text-sm text-brand-400">
            Related:{" "}
            <Link href="/industries/wholesale-distribution" className="text-accent hover:underline">
              NetSuite for wholesale distributors
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
              <Link href="/industries/wholesale-distribution" className="text-accent hover:underline">
                NetSuite for wholesale distribution
              </Link>{" "}
              covers the full distribution platform picture, including order management and 3PL integration.
            </li>
            <li className="text-sm text-brand-400">
              <Link href="/netsuite-demand-planning" className="text-accent hover:underline">
                NetSuite demand planning and replenishment
              </Link>{" "}
              explains how to set up purchase order generation based on location-level demand and lead times.
            </li>
            <li className="text-sm text-brand-400">
              <Link href="/netsuite-saved-searches-dashboards" className="text-accent hover:underline">
                NetSuite saved searches and dashboards
              </Link>{" "}
              covers how to build the inventory visibility reports warehouse managers and finance both need.
            </li>
            <li className="text-sm text-brand-400">
              <Link href="/netsuite-suitescript-development" className="text-accent hover:underline">
                NetSuite SuiteScript development
              </Link>{" "}
              for transfer order automation and bin assignment logic that exceeds what native configuration can handle.
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

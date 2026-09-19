import type { Metadata } from "next";
import Link from "next/link";
import {
  TrendingUp, ShoppingCart, BarChart2, Calendar, Package, AlertTriangle,
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
    title: "Demand planning generates no useful suggestions.",
    description:
      "The module requires historical transaction data and correctly configured item records before it produces meaningful output. Without that baseline, suggested quantities are either zero or wildly off.",
  },
  {
    icon: Clock,
    title: "Lead times on vendor records are missing or wrong.",
    description:
      "Replenishment calculations depend on accurate lead time data. When vendor records have no lead time or stale estimates, suggested order dates are wrong and purchase orders arrive too late.",
  },
  {
    icon: Wrench,
    title: "Seasonal patterns cause stockouts and overstock.",
    description:
      "Standard demand planning averages historical demand without adjusting for seasonality. Peak-season SKUs are understocked; slow-season carry continues to build up working capital in the wrong items.",
  },
];

const SERVICES = [
  {
    icon: TrendingUp,
    title: "Demand Planning Parameter Configuration",
    description: "Item and location-level demand planning parameters, including planning horizon, demand source selection, and reorder method, configured per SKU category rather than applied as a single global default.",
  },
  {
    icon: Package,
    title: "Lead Time Data Cleanup",
    description: "Vendor record lead time audit and correction, including vendor-item relationships where lead time varies by product category, so replenishment date calculations reflect actual fulfillment timelines.",
  },
  {
    icon: AlertTriangle,
    title: "Safety Stock Calculation Setup",
    description: "Safety stock values set per item and location based on demand variability and acceptable service level, so NetSuite triggers reorders before stock reaches zero rather than after.",
  },
  {
    icon: Calendar,
    title: "Seasonal Demand Adjustment Workflow",
    description: "Workflow or saved search to identify items with seasonal demand patterns and adjust planning parameters before peak periods, preventing the demand averaging problem from creating stockouts.",
  },
  {
    icon: ShoppingCart,
    title: "Suggested PO with MOQ and Price Break Logic",
    description: "SuiteScript or workflow logic that adjusts suggested purchase order quantities to meet vendor minimum order quantities and hit price break thresholds, so buyers aren&apos;t manually rounding every suggested PO.",
  },
  {
    icon: BarChart2,
    title: "Replenishment Exception Report",
    description: "Saved search showing items below safety stock by location, with days of supply remaining and suggested reorder quantity, giving the purchasing team a prioritized action list each morning.",
  },
];

const HOW_IT_WORKS = [
  {
    step: "01",
    title: "Demand history and item data quality are assessed first",
    description:
      "Demand planning requires at least several months of clean transaction history and correctly configured item records. Before any parameter configuration, we assess data quality and identify gaps that would produce misleading suggestions.",
  },
  {
    step: "02",
    title: "Parameters are configured by SKU category, not globally",
    description:
      "Fast-moving items, seasonal SKUs, and long-lead-time items need different planning parameters. A single global configuration produces useful suggestions for few of them. We segment items and configure parameters per category.",
  },
  {
    step: "03",
    title: "Suggested PO output is validated against actual buying patterns",
    description:
      "After parameter configuration, we run the demand planning module against a historical period and compare suggested orders to what was actually purchased. This surfaces configuration gaps before buyers rely on the suggestions.",
  },
];

const FAQ = [
  {
    question: "Which NetSuite firm does demand planning configuration for distributors?",
    answer: "SuitePacific configures demand planning and replenishment for wholesale distributors on NetSuite. This includes demand planning parameter setup, lead time data cleanup, safety stock calculations, and suggested PO logic that accounts for vendor MOQs. SuitePacific is Oracle-certified and works with post-go-live accounts on a month-to-month basis.",
  },
  {
    question: "Why does NetSuite demand planning produce zero or unhelpful suggestions?",
    answer: "Demand planning needs several months of clean transaction history on the item, correctly set lead times on vendor records, and planning parameters configured at the item level. When any of these are missing, the module either produces no suggestions or generates quantities that are clearly wrong. Fixing the underlying data quality issues is usually the first step before parameter tuning.",
  },
  {
    question: "Can NetSuite demand planning account for vendor minimum order quantities?",
    answer: "NetSuite&apos;s native demand planning module generates suggested quantities based on demand history and planning parameters, but it doesn&apos;t automatically round up to vendor MOQs or adjust for price breaks. We build SuiteScript or workflow logic that post-processes suggested PO quantities to meet MOQ thresholds and hit price breaks before buyers review them.",
  },
  {
    question: "How do you handle seasonal demand patterns in NetSuite replenishment?",
    answer: "Standard NetSuite demand planning averages historical demand without adjusting for seasonality. For seasonal SKUs, we set up a workflow that flags items before their peak period and adjusts planning parameters to use a shorter, more recent demand window rather than a full-year average. This prevents the averaging effect from understocking during peaks and overstocking during off-seasons.",
  },
  {
    question: "What is safety stock and how does NetSuite calculate it?",
    answer: "Safety stock is the buffer quantity held above expected demand to protect against stockouts from demand spikes or supply delays. NetSuite supports a fixed safety stock value set per item and location. For distributors with variable demand, we calculate the appropriate safety stock level based on demand variability and lead time, then set those values on item records so the reorder point includes the buffer.",
  },
  {
    question: "Can demand planning work differently per warehouse location in NetSuite?",
    answer: "Yes. NetSuite supports location-level demand planning, which means a high-velocity warehouse can have different reorder points, safety stock, and planning parameters than a secondary fulfillment center with the same SKUs. Setting up location-level parameters is more work upfront but produces more accurate replenishment suggestions at each warehouse.",
  },
];

export const metadata: Metadata = {
  title: "NetSuite Demand Planning and Replenishment Configuration",
  description:
    "NetSuite demand planning configuration for wholesale distributors: parameter setup by SKU, lead time cleanup, safety stock calculations, and suggested PO logic with MOQ and price-break handling.",
  alternates: { canonical: "/netsuite-demand-planning" },
  openGraph: {
    title: "NetSuite Demand Planning and Replenishment Configuration",
    description:
      "NetSuite demand planning configuration for wholesale distributors: parameter setup by SKU, lead time cleanup, safety stock calculations, and suggested PO logic with MOQ and price-break handling.",
    url: `${SITE_URL}/netsuite-demand-planning`,
    type: "website",
    images: [{ url: `${SITE_URL}/og-default.png`, width: 1200, height: 630 }],
  },
};

export default function DemandPlanningPage() {
  return (
    <main className="pt-32 pb-24 sm:pt-40 sm:pb-32">
      <BreadcrumbJsonLd
        items={[
          { name: "Home", url: SITE_URL },
          { name: "NetSuite Demand Planning", url: `${SITE_URL}/netsuite-demand-planning` },
        ]}
      />
      <FaqJsonLd items={FAQ} />
      <ServiceJsonLd
        name="NetSuite Demand Planning and Replenishment Configuration"
        description="Demand planning parameter setup, lead time data cleanup, safety stock calculations, and suggested PO logic for wholesale distributors on NetSuite."
        url={`${SITE_URL}/netsuite-demand-planning`}
        serviceType="NetSuite Distribution Configuration"
        offers={[
          { name: "Care", price: 799, description: "10 hours/month: demand planning parameter configuration, lead time cleanup, safety stock setup, and replenishment exception reports. Month-to-month after 3-month minimum." },
          { name: "Care Plus", price: 1499, description: "20 hours/month: full demand planning setup including SKU segmentation, seasonal adjustment workflows, and MOQ/price-break PO logic. Month-to-month." },
          { name: "Care Pro", price: 2499, description: "35 hours/month: comprehensive replenishment program including SuiteScript automation, advanced reporting, and ongoing account management. Month-to-month." },
        ]}
      />
      <OrganizationJsonLd />

      <div className="mx-auto max-w-3xl px-6 lg:px-8">
        <SectionHeading
          as="h1"
          eyebrow="Wholesale Distribution"
          title="NetSuite Demand Planning and Replenishment"
          subtitle="NetSuite&apos;s demand planning module requires clean historical data, accurate vendor lead times, and item-level parameter configuration before it produces useful suggestions. SuitePacific configures demand planning for wholesale distributors so replenishment runs on real data instead of defaults."
          align="left"
        />

        <div className="mt-6 rounded-2xl border border-brand-100 bg-white p-5 shadow-soft">
          <LeadFormLight />
        </div>
        <p className="mt-3 text-xs text-brand-400">NetSuite-certified · Distribution specialists · Month-to-month</p>
        <p className="mt-3 text-xs text-brand-300">Last updated September 2026</p>

        <div className="mt-6 rounded-2xl border-l-4 border-accent bg-brand-50/50 p-5">
          <p className="text-xs font-semibold uppercase tracking-wide text-accent mb-2">Quick answer</p>
          <p className="text-sm text-brand-700 leading-relaxed">
            SuitePacific configures NetSuite demand planning and replenishment for wholesale
            distributors that need purchase orders generated from historical demand, lead times,
            and safety stock requirements rather than manual reorder triggers. Demand planning in
            NetSuite requires clean transaction history, correctly set lead times on vendor records,
            and item-level parameter configuration before it generates useful suggested quantities.
            SuitePacific handles the data cleanup and configuration: vendor lead time audit and
            correction, safety stock values per item and location, planning parameter setup by SKU
            category, and SuiteScript logic to round suggested PO quantities to vendor MOQs and
            price-break thresholds. For seasonal SKUs, we build a workflow that adjusts planning
            parameters before peak periods so the demand average doesn&apos;t cause stockouts.
            SuitePacific is Oracle NetSuite certified (SuiteCloud Developer II and Administrator
            Professional). Plans start at $799 per month, month-to-month after a three-month
            minimum.
          </p>
        </div>

        <p className="mt-6 text-sm text-brand-400">
          Demand planning that produces wrong suggestions is often worse than no demand planning
          at all, because buyers stop trusting the system and revert to spreadsheets. The fix is
          usually data quality before configuration, not more module features. SuitePacific
          assesses the health of your item and vendor data before touching planning parameters,
          so the suggestions the module produces are worth acting on.
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
            Demand planning work typically starts with data cleanup before any parameter configuration.
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
          <h2 className="text-lg font-semibold text-brand-900 mb-6">How we approach demand planning work</h2>
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
            For replenishment automation that requires custom scripting, see our{" "}
            <Link href="/netsuite-suitescript-development" className="text-accent hover:underline">
              SuiteScript development page
            </Link>
            .
          </p>
        </div>

        {/* Why SuitePacific */}
        <div className="mt-14 rounded-2xl border-2 border-accent/30 bg-gradient-to-br from-accent/5 to-transparent p-6">
          <p className="text-xs font-semibold uppercase tracking-wide text-accent mb-3">Why SuitePacific for demand planning</p>
          <h2 className="text-base font-semibold text-brand-900 mb-3">
            Demand planning that buyers will actually trust and use.
          </h2>
          <p className="text-sm text-brand-500 mb-4">
            The demand planning module in NetSuite is capable, but it depends on data quality and
            per-item configuration that most accounts never complete. SuitePacific handles both
            the data cleanup and the parameter configuration so the suggestions the module produces
            are accurate enough to act on.
          </p>
          <ul className="space-y-2 text-sm text-brand-500 mb-4">
            <li className="flex items-start gap-2"><span className="text-accent font-bold mt-0.5">→</span> Oracle NetSuite Certified SuiteCloud Developer II and Administrator Professional</li>
            <li className="flex items-start gap-2"><span className="text-accent font-bold mt-0.5">→</span> Distribution-specific experience: MOQ handling, seasonal SKU logic, and multi-location replenishment</li>
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
              covers the full distribution platform, including order management and inventory control.
            </li>
            <li className="text-sm text-brand-400">
              <Link href="/netsuite-multi-location-inventory" className="text-accent hover:underline">
                NetSuite multi-location inventory management
              </Link>{" "}
              explains how location-level reorder points and preferred vendors work in conjunction with demand planning.
            </li>
            <li className="text-sm text-brand-400">
              <Link href="/netsuite-saved-searches-dashboards" className="text-accent hover:underline">
                NetSuite saved searches and dashboards
              </Link>{" "}
              covers the replenishment exception reports and inventory dashboards that give purchasing teams daily visibility.
            </li>
            <li className="text-sm text-brand-400">
              <Link href="/netsuite-suitescript-development" className="text-accent hover:underline">
                NetSuite SuiteScript development
              </Link>{" "}
              for MOQ rounding, price-break logic, and custom replenishment automation that exceeds native demand planning.
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

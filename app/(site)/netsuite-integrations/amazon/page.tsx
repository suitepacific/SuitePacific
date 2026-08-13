import type { Metadata } from "next";
import Link from "next/link";
import {
  ShoppingCart, Package, RefreshCw, FileText,
  AlertCircle, AlertTriangle, Wrench,
  ShieldCheck, Zap, Users, Award,
} from "lucide-react";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Card } from "@/components/ui/Card";
import { IconBadge } from "@/components/ui/IconBadge";
import { BreadcrumbJsonLd, FaqJsonLd, ServiceJsonLd, OrganizationJsonLd, VideoObjectJsonLd } from "@/components/seo/JsonLd";
import { ServiceFaqSection } from "@/components/ui/ServiceFaqSection";
import { LeadFormLight } from "@/components/sections/LeadFormLight";
import { SITE_URL } from "@/lib/content";

const PAIN_POINTS = [
  {
    icon: AlertCircle,
    title: "Amazon orders are entered into NetSuite manually.",
    description:
      "Someone exports from Seller Central, formats the data, and imports it into NetSuite on a schedule. High order volume makes this impractical and introduces errors that affect fulfillment and reporting.",
  },
  {
    icon: AlertTriangle,
    title: "Inventory on Amazon goes out of sync with NetSuite.",
    description:
      "FBA inventory and Seller-Fulfilled inventory levels in Amazon diverge from NetSuite quantities. Overselling or unnecessary restock orders result.",
  },
  {
    icon: Wrench,
    title: "Amazon settlement data is not reconciling cleanly.",
    description:
      "Amazon's settlement reports combine fees, refunds, and sales in a format that does not map cleanly to NetSuite revenue and expense accounts, requiring manual reconciliation work each period.",
  },
];

const DATA_FLOWS = [
  {
    icon: ShoppingCart,
    title: "Order Import",
    description:
      "Amazon Seller Central orders imported into NetSuite as sales orders on a scheduled basis: customer creation, item mapping, Amazon fees, and fulfillment channel identification.",
  },
  {
    icon: RefreshCw,
    title: "Inventory Sync",
    description:
      "NetSuite inventory quantities pushed to Amazon to keep available quantity accurate for Seller-Fulfilled listings. FBA inventory tracked as a separate quantity in NetSuite.",
  },
  {
    icon: Package,
    title: "Fulfillment Confirmation",
    description:
      "Fulfillment records in NetSuite updated from Amazon shipping confirmations for Seller-Fulfilled orders, with tracking information captured on the sales order.",
  },
  {
    icon: FileText,
    title: "Settlement Reconciliation",
    description:
      "Amazon settlement report data mapped to NetSuite journal entries for revenue, Amazon fees, refunds, and FBA charges, replacing manual period-end reconciliation.",
  },
];

const HOW_IT_WORKS = [
  {
    step: "01",
    title: "Seller Central API access and channel identification first",
    description:
      "We confirm your Seller Central API credentials and map your fulfillment channels: Seller-Fulfilled, FBA, or both. Each has different inventory and fulfillment implications in NetSuite.",
  },
  {
    step: "02",
    title: "Item and SKU mapping documented before build",
    description:
      "Amazon ASINs and SKUs need to match NetSuite item codes. The mapping handles matrix items, bundles, and parent-child ASIN relationships explicitly.",
  },
  {
    step: "03",
    title: "Settlement parsing built to your chart of accounts",
    description:
      "Amazon's settlement report format is parsed and mapped to your specific NetSuite account codes for revenue, selling fees, FBA fees, advertising credits, and refunds.",
  },
];

const WHY_SP = [
  {
    icon: ShieldCheck,
    title: "NetSuite-Certified",
    description:
      "NetSuite SuiteCloud Developer II certification. We build directly on the SuiteScript platform against the Amazon Selling Partner API.",
  },
  {
    icon: Zap,
    title: "Settlement Reconciliation Expertise",
    description:
      "Amazon settlement reconciliation requires understanding both Amazon's fee structure and NetSuite's chart of accounts. We have built this for accounts across Seller-Fulfilled and FBA fulfillment models.",
  },
  {
    icon: Users,
    title: "Direct Access",
    description:
      "You communicate directly with the developer who built the integration. Amazon API changes and NetSuite updates are handled by the same person who built it.",
  },
  {
    icon: Award,
    title: "Post-Launch Maintenance",
    description:
      "Amazon regularly deprecates SP-API versions and changes settlement report formats. Our ongoing support model covers monitoring and updates as Amazon's API evolves.",
  },
];

const FAQ = [
  {
    question: "Do you support both FBA and Seller-Fulfilled (MFN) models?",
    answer:
      "Yes. FBA and Seller-Fulfilled have different inventory, fulfillment, and fee structures in both Amazon and NetSuite. The integration is designed around whichever model you use, or a combination of both.",
  },
  {
    question: "How is FBA inventory tracked in NetSuite?",
    answer:
      "FBA inventory can be tracked as a separate inventory location in NetSuite, representing inventory at Amazon's fulfillment centers. Transfers from your warehouse to FBA are recorded as location transfers, keeping NetSuite quantities accurate.",
  },
  {
    question: "Do you support Vendor Central as well as Seller Central?",
    answer:
      "Yes. Vendor Central uses a different API and has different data structures than Seller Central. Vendor Central integrations typically focus on purchase order receipt, invoice submission, and EDI-style document exchange. We scope each separately.",
  },
  {
    question: "How do returns and refunds work?",
    answer:
      "Customer returns from Amazon can trigger credit memos in NetSuite. For FBA returns, inventory is marked returned or unsellable depending on Amazon's disposition. Return handling is configured based on your specific return policy and account structure.",
  },
  {
    question: "Can you use a middleware tool like Celigo for this instead of a custom build?",
    answer:
      "Celigo has a pre-built Amazon-NetSuite connector that works well for standard Seller Central order import. For accounts with complex item mapping, custom settlement reconciliation requirements, or Vendor Central, a custom build gives you more control. We scope both options.",
  },
];

export const metadata: Metadata = {
  title: "NetSuite Amazon Integration",
  description:
    "Custom NetSuite Amazon integration: order import from Seller Central, inventory sync, fulfillment confirmation, and Amazon settlement reconciliation. Oracle-certified developers.",
  alternates: { canonical: "/netsuite-integrations/amazon" },
  openGraph: {
    title: "NetSuite Amazon Integration",
    description: "Connect Amazon Seller Central to NetSuite: order import, FBA and MFN inventory sync, fulfillment tracking, and settlement reconciliation. Custom build or Celigo.",
    url: "https://suitepacific.com/netsuite-integrations/amazon",
    type: "website",
    images: [{ url: "https://suitepacific.com/og-default.png", width: 1200, height: 630 }],
  },
};

export default function NetSuiteAmazonIntegrationPage() {
  return (
    <main className="pt-32 pb-24 sm:pt-40 sm:pb-32">
      <BreadcrumbJsonLd
        items={[
          { name: "Home", url: SITE_URL },
          { name: "NetSuite Integrations", url: `${SITE_URL}/netsuite-integrations` },
          { name: "Amazon", url: `${SITE_URL}/netsuite-integrations/amazon` },
        ]}
      />
      <FaqJsonLd items={FAQ} />
      <ServiceJsonLd
        name="NetSuite Amazon Integration"
        description="Custom NetSuite and Amazon Seller Central integration with order import, inventory sync, fulfillment confirmation, and settlement reconciliation."
        url={`${SITE_URL}/netsuite-integrations/amazon`}
        serviceType="NetSuite Integration"
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
          eyebrow="NetSuite Integrations"
          title="NetSuite Amazon Integration"
          subtitle="Connect Amazon Seller Central to NetSuite: order import, FBA and Seller-Fulfilled inventory sync, fulfillment tracking, and settlement report reconciliation."
          align="left"
        />

        <div className="mt-6 rounded-2xl border border-brand-100 bg-white p-5 shadow-soft">
          <LeadFormLight />
        </div>
        <p className="mt-3 text-xs text-brand-400">NetSuite-certified · FBA and MFN supported · Settlement reconciliation included · Direct developer access</p>

        <p className="mt-6 text-sm text-brand-400">
          Amazon order volume makes manual NetSuite entry impractical quickly. An Amazon-NetSuite
          integration automates order import, keeps inventory accurate across fulfillment channels,
          and replaces the manual period-end work of reconciling Amazon settlement data to your
          chart of accounts.
        </p>

        {/* Pain Points */}
        <div className="mt-14" data-section="pain-points">
          <h2 className="text-lg font-semibold text-brand-900 mb-6">Common situations that bring people here</h2>
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

        {/* Data flows */}
        <div className="mt-14" data-section="data-flows">
          <h2 className="text-lg font-semibold text-brand-900 mb-1">What the integration handles</h2>
          <p className="text-sm text-brand-400 mb-6">
            Scope depends on your fulfillment model. Order import and inventory sync are the foundation; settlement reconciliation is typically the highest-value addition.
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            {DATA_FLOWS.map((item) => (
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
          <h2 className="text-lg font-semibold text-brand-900 mb-6">How we build it</h2>
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
          <h2 className="text-lg font-semibold text-brand-900 mb-6">Why SuitePacific</h2>
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

        {/* Related */}
        <div className="mt-10 rounded-2xl border border-brand-100 bg-brand-50/30 p-5 sm:p-6">
          <p className="text-sm font-semibold text-brand-900 mb-3">Other integrations</p>
          <ul className="space-y-2.5">
            <li className="text-sm text-brand-400">
              <Link href="/netsuite-integrations/shopify" className="text-accent hover:underline">NetSuite Shopify integration</Link>{" "}
              for Shopify order import and inventory sync.
            </li>
            <li className="text-sm text-brand-400">
              <Link href="/netsuite-integrations/avalara" className="text-accent hover:underline">NetSuite Avalara integration</Link>{" "}
              for real-time tax calculation on multi-state sales.
            </li>
            <li className="text-sm text-brand-400">
              <Link href="/netsuite-integrations" className="text-accent hover:underline">All NetSuite integrations</Link>{" "}
              covers the full range of platforms SuitePacific builds for.
            </li>
          </ul>
        </div>

        <ServiceFaqSection items={FAQ} />
      </div>
    </main>
  );
}

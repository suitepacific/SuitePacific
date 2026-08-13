import type { Metadata } from "next";
import Link from "next/link";
import {
  ShoppingCart, RefreshCw, Package, ArrowLeftRight,
  AlertCircle, Wrench, AlertTriangle,
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
    title: "Orders from Shopify are entered into NetSuite manually.",
    description:
      "Someone exports orders from Shopify, formats a spreadsheet, and imports it into NetSuite on a schedule. Hours of work per week, with manual error introduced every time.",
  },
  {
    icon: AlertTriangle,
    title: "Inventory levels in Shopify are wrong.",
    description:
      "Shopify shows items as in stock after they have sold through in NetSuite. Overselling, disappointed customers, and manual inventory corrections that eat warehouse time.",
  },
  {
    icon: Wrench,
    title: "The existing integration keeps breaking.",
    description:
      "An API change, a new product type, or a configuration change in either system breaks the sync and nobody notices until orders are missing or inventory counts are wrong.",
  },
];

const DATA_FLOWS = [
  {
    icon: ShoppingCart,
    title: "Order Import",
    description:
      "Shopify orders imported into NetSuite as sales orders on a near-real-time schedule: customer creation or matching, item mapping, shipping and billing address, discount and tax handling.",
  },
  {
    icon: RefreshCw,
    title: "Inventory Sync",
    description:
      "NetSuite quantity-on-hand pushed back to Shopify after each inventory-affecting transaction, keeping Shopify availability accurate without manual updates.",
  },
  {
    icon: Package,
    title: "Fulfillment Confirmation",
    description:
      "Fulfillment records created in NetSuite triggered by Shopify fulfillment events, or fulfillment status pushed from NetSuite to Shopify with tracking information when shipping from NetSuite.",
  },
  {
    icon: ArrowLeftRight,
    title: "Customer Records",
    description:
      "New Shopify customers created or matched to existing NetSuite customer records, with guest checkout handling and duplicate prevention logic.",
  },
];

const HOW_IT_WORKS = [
  {
    step: "01",
    title: "Map the data flow before writing code",
    description:
      "We document every record type, field mapping, and transformation rule before building. Shopify and NetSuite have different concepts for the same data; decisions made during mapping affect everything downstream.",
  },
  {
    step: "02",
    title: "Error logging built in from the start",
    description:
      "Every sync failure is logged with the specific order, field, and error message. Alerts fire when something fails. You don't discover missing orders days later by chance.",
  },
  {
    step: "03",
    title: "Tested against real Shopify data before production",
    description:
      "The integration is built and tested against your actual Shopify store and NetSuite Sandbox before going live. Volume testing with representative order loads included where relevant.",
  },
];

const WHY_SP = [
  {
    icon: ShieldCheck,
    title: "NetSuite-Certified",
    description:
      "NetSuite SuiteCloud Developer II certification. We build on the SuiteScript platform directly, not through middleware that may introduce its own points of failure.",
  },
  {
    icon: Zap,
    title: "Error-First Design",
    description:
      "Integration failures surface immediately with specific error messages. You know within minutes when a sync doesn't complete, not after a day of wrong inventory counts.",
  },
  {
    icon: Users,
    title: "Direct Access",
    description:
      "You communicate directly with the developer who built the integration. When something breaks post-launch, you are not working through a ticket system.",
  },
  {
    icon: Award,
    title: "Post-Launch Maintenance",
    description:
      "Shopify and NetSuite both release updates that can affect integrations. Our ongoing support model covers monitoring, fixes, and updates as both platforms evolve.",
  },
];

const FAQ = [
  {
    question: "Do you use middleware like Celigo or a custom RESTlet approach?",
    answer:
      "Both are valid. Middleware platforms make sense when the data flow is straightforward and a pre-built Shopify connector covers your requirements. Custom RESTlets give you complete control over field mapping, validation logic, and error handling. We use the approach that fits your situation and tell you why.",
  },
  {
    question: "How does inventory sync work across multiple locations?",
    answer:
      "For accounts with multiple NetSuite locations or warehouses, inventory sync can be configured to push location-specific quantities to Shopify locations, or to aggregate across all locations. The right setup depends on your fulfillment model.",
  },
  {
    question: "How are returns and refunds handled?",
    answer:
      "Returns and refunds require separate handling from the order import flow. When a Shopify refund is created, the integration can trigger a credit memo or cash refund in NetSuite, with the item return restocked to inventory when appropriate.",
  },
  {
    question: "Can you take over an existing Shopify-NetSuite integration that's broken?",
    answer:
      "Yes. We review what's already there, document how it works, and identify why it's failing before making changes. Inheriting existing integrations is common.",
  },
  {
    question: "Does the integration handle Shopify variants and bundles?",
    answer:
      "Shopify variants map to NetSuite items or matrix items depending on how your NetSuite catalog is structured. Bundles require additional mapping logic. Both are handled during the scoping and mapping phase.",
  },
];

export const metadata: Metadata = {
  title: "NetSuite Shopify Integration",
  description:
    "Custom NetSuite Shopify integration: order import, inventory sync, fulfillment confirmation, and customer record matching. Built with error logging and sandbox testing by Oracle-certified developers.",
  alternates: { canonical: "/netsuite-integrations/shopify" },
  openGraph: {
    title: "NetSuite Shopify Integration",
    description: "Connect Shopify to NetSuite with a custom integration handling order import, real-time inventory sync, fulfillment confirmation, and returns. Error-first design, sandbox tested.",
    url: "https://suitepacific.com/netsuite-integrations/shopify",
    type: "website",
    images: [{ url: "https://suitepacific.com/og-default.png", width: 1200, height: 630 }],
  },
};

export default function NetSuiteShopifyIntegrationPage() {
  return (
    <main className="pt-32 pb-24 sm:pt-40 sm:pb-32">
      <BreadcrumbJsonLd
        items={[
          { name: "Home", url: SITE_URL },
          { name: "NetSuite Integrations", url: `${SITE_URL}/netsuite-integrations` },
          { name: "Shopify", url: `${SITE_URL}/netsuite-integrations/shopify` },
        ]}
      />
      <FaqJsonLd items={FAQ} />
      <ServiceJsonLd
        name="NetSuite Shopify Integration"
        description="Custom NetSuite and Shopify integration with order import, inventory sync, fulfillment confirmation, and customer matching."
        url={`${SITE_URL}/netsuite-integrations/shopify`}
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
          title="NetSuite Shopify Integration"
          subtitle="Connect Shopify to NetSuite with order import, real-time inventory sync, fulfillment confirmation, and customer record matching, built with error logging and Sandbox testing."
          align="left"
        />

        <div className="mt-6 rounded-2xl border border-brand-100 bg-white p-5 shadow-soft">
          <LeadFormLight />
        </div>
        <p className="mt-3 text-xs text-brand-400">NetSuite-certified · Error-first design · Sandbox-tested · Direct developer access</p>

        <p className="mt-6 text-sm text-brand-400">
          Connecting Shopify to NetSuite eliminates the manual order entry, inventory export, and
          fulfillment update work that sits between the two systems. SuitePacific builds these
          integrations with explicit error handling, failure alerting, and Sandbox testing as defaults,
          not afterthoughts.
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
            Scope depends on your fulfillment model. Most Shopify-NetSuite integrations cover order import and inventory sync at minimum.
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
              <Link href="/netsuite-integrations/amazon" className="text-accent hover:underline">NetSuite Amazon integration</Link>{" "}
              for Seller Central and Vendor Central order and inventory flows.
            </li>
            <li className="text-sm text-brand-400">
              <Link href="/netsuite-integrations/salesforce" className="text-accent hover:underline">NetSuite Salesforce integration</Link>{" "}
              for CRM-to-ERP data sync covering customers, opportunities, and orders.
            </li>
            <li className="text-sm text-brand-400">
              <Link href="/netsuite-integrations" className="text-accent hover:underline">All NetSuite integrations</Link>{" "}
              covers the full range of platforms and approaches SuitePacific builds for.
            </li>
          </ul>
        </div>

        <ServiceFaqSection items={FAQ} />
      </div>
    </main>
  );
}

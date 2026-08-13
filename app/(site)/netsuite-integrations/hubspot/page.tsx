import type { Metadata } from "next";
import Link from "next/link";
import {
  Users, FileText, DollarSign, ArrowLeftRight,
  AlertCircle, Wrench, AlertTriangle,
  ShieldCheck, Zap, Award,
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
    title: "Deals close in HubSpot. Someone enters the order into NetSuite by hand.",
    description:
      "Every closed deal in HubSpot requires a manual order entry in NetSuite. Two records, two entry steps, two chances for the data to be different.",
  },
  {
    icon: AlertTriangle,
    title: "Contact records are different in both systems.",
    description:
      "A customer updates their contact information in one system. The other stays stale. Collections calls the wrong number; marketing emails the wrong address.",
  },
  {
    icon: Wrench,
    title: "Sales reps chase finance for invoice status.",
    description:
      "Reps cannot tell if a renewal target has an open invoice without emailing finance. Collections awareness affects every expansion conversation.",
  },
];

const DATA_FLOWS = [
  {
    icon: Users,
    title: "Contact and Company Sync",
    description:
      "HubSpot Contacts and Companies synced to NetSuite Contacts and Customers, with field mapping, duplicate handling, and configurable sync direction.",
  },
  {
    icon: ArrowLeftRight,
    title: "Deal to Sales Order",
    description:
      "Closed-won HubSpot Deals create NetSuite Sales Orders, with line item mapping, pricing, and company-to-customer association.",
  },
  {
    icon: FileText,
    title: "Invoice Status in HubSpot",
    description:
      "NetSuite invoice balances and payment status surfaced on HubSpot Company records, giving reps AR visibility without leaving HubSpot.",
  },
  {
    icon: DollarSign,
    title: "Revenue Reporting Alignment",
    description:
      "Closed-won deal value in HubSpot reconciled to actual NetSuite invoice and payment records, supporting accurate sales attribution and LTV tracking.",
  },
];

const HOW_IT_WORKS = [
  {
    step: "01",
    title: "Field mapping and master-of-record decisions first",
    description:
      "Bidirectional sync requires deciding which system owns which fields. We document this before building to prevent overwrites and conflicts.",
  },
  {
    step: "02",
    title: "HubSpot workflow triggers or scheduled sync",
    description:
      "Deal sync can trigger on HubSpot workflow actions (e.g., stage change to Closed Won) or run on a scheduled pull. The approach depends on your latency requirements and HubSpot tier.",
  },
  {
    step: "03",
    title: "Error logging and duplicate handling",
    description:
      "Failed syncs are logged with the specific record and error. Duplicate customer matching uses configurable rules to find existing NetSuite customers before creating new ones.",
  },
];

const WHY_SP = [
  {
    icon: ShieldCheck,
    title: "NetSuite-Certified",
    description:
      "NetSuite SuiteCloud Developer II certification. We build on the SuiteScript platform directly against the NetSuite API.",
  },
  {
    icon: Zap,
    title: "HubSpot API Expertise",
    description:
      "We build against HubSpot's REST API directly, or implement via middleware where a pre-built connector fits. We scope both options honestly.",
  },
  {
    icon: Users,
    title: "Direct Access",
    description:
      "Direct access to the developer who built your integration. No ticket queue when something needs to be updated after a HubSpot or NetSuite API change.",
  },
  {
    icon: Award,
    title: "Post-Launch Maintenance",
    description:
      "HubSpot and NetSuite both update their APIs regularly. Our support model covers monitoring and updates as both platforms evolve.",
  },
];

const FAQ = [
  {
    question: "Does HubSpot's native NetSuite connector cover this?",
    answer:
      "HubSpot has a native NetSuite integration available on certain tiers. It covers basic contact and deal sync for standard field sets. For accounts with custom NetSuite field structures, complex line item mapping, or specific sync rules, a custom build gives you more control. We evaluate the native connector against your requirements first.",
  },
  {
    question: "How does the Deal-to-Order mapping handle products?",
    answer:
      "HubSpot line items map to NetSuite Sales Order lines. Product matching uses the HubSpot product ID or SKU against NetSuite item codes. Pricing can come from HubSpot, from a NetSuite price level, or from a negotiated price on the deal record.",
  },
  {
    question: "What HubSpot tier is required for API access?",
    answer:
      "The HubSpot API is available on Professional and Enterprise tiers. Some integration features (private apps, workflow actions) require Professional or above. We confirm your HubSpot tier's API capabilities during scoping.",
  },
  {
    question: "Can you take over an existing HubSpot-NetSuite integration?",
    answer:
      "Yes. We review the existing integration, document how it works, and identify what is failing or incomplete before making changes.",
  },
];

export const metadata: Metadata = {
  title: "NetSuite HubSpot Integration",
  description:
    "Custom NetSuite HubSpot integration: contact and company sync, deal-to-sales-order, invoice visibility in HubSpot, and revenue reporting alignment. Oracle-certified, direct developer access.",
  alternates: { canonical: "/netsuite-integrations/hubspot" },
  openGraph: {
    title: "NetSuite HubSpot Integration",
    description: "Connect HubSpot CRM to NetSuite ERP with contact sync, deal-to-order creation, and invoice status visibility. Custom or native connector — scoped to your requirements.",
    url: "https://suitepacific.com/netsuite-integrations/hubspot",
    type: "website",
    images: [{ url: "https://suitepacific.com/og-default.png", width: 1200, height: 630 }],
  },
};

export default function NetSuiteHubSpotIntegrationPage() {
  return (
    <main className="pt-32 pb-24 sm:pt-40 sm:pb-32">
      <BreadcrumbJsonLd
        items={[
          { name: "Home", url: SITE_URL },
          { name: "NetSuite Integrations", url: `${SITE_URL}/netsuite-integrations` },
          { name: "HubSpot", url: `${SITE_URL}/netsuite-integrations/hubspot` },
        ]}
      />
      <FaqJsonLd items={FAQ} />
      <ServiceJsonLd
        name="NetSuite HubSpot Integration"
        description="Custom integration connecting HubSpot CRM to NetSuite ERP with contact sync, deal-to-order, and invoice visibility."
        url={`${SITE_URL}/netsuite-integrations/hubspot`}
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
          title="NetSuite HubSpot Integration"
          subtitle="Connect HubSpot CRM to NetSuite ERP: contact sync, deal-to-sales-order, invoice status in HubSpot, and revenue reporting alignment."
          align="left"
        />

        <div className="mt-6 rounded-2xl border border-brand-100 bg-white p-5 shadow-soft">
          <LeadFormLight />
        </div>
        <p className="mt-3 text-xs text-brand-400">NetSuite-certified · Native or custom build · Sandbox-tested · Direct developer access</p>

        <p className="mt-6 text-sm text-brand-400">
          HubSpot handles the deal; NetSuite handles the order, invoice, and payment. The integration
          between them connects the close to the cash cycle, eliminates manual re-entry at deal close,
          and gives sales teams the financial visibility they need to manage renewals and expansions.
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
            Scope depends on your sales and billing process. Contact sync and deal-to-order are the most common starting points.
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
              <Link href="/netsuite-integrations/salesforce" className="text-accent hover:underline">NetSuite Salesforce integration</Link>{" "}
              for CRM-to-ERP sync on Salesforce-based sales teams.
            </li>
            <li className="text-sm text-brand-400">
              <Link href="/netsuite-integrations/shopify" className="text-accent hover:underline">NetSuite Shopify integration</Link>{" "}
              for e-commerce order and inventory flows.
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

import type { Metadata } from "next";
import Link from "next/link";
import {
  Globe, ArrowLeftRight, Cloud, Database, RefreshCcw, FileCode2,
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
    title: "Data transfer between systems is still manual.",
    description:
      "Someone exports from NetSuite, formats a spreadsheet, and imports it elsewhere every week. Hours of work that also introduces human error every time.",
  },
  {
    icon: Wrench,
    title: "The existing integration keeps breaking.",
    description:
      "An upstream API changed, a field mapping is wrong, or the sync stops working and nobody notices until the data is already out of sync.",
  },
  {
    icon: AlertTriangle,
    title: "Failures don't surface until the damage is done.",
    description:
      "No alerting, no retry logic, no error log. The integration appears to run but records are missing or duplicated, and you find out days later.",
  },
];

const INTEGRATION_TYPES = [
  {
    icon: Globe,
    title: "RESTlet-Based APIs",
    description:
      "Custom API endpoints built inside NetSuite using SuiteScript, giving external systems a controlled interface with full business logic validation on the NetSuite side.",
  },
  {
    icon: ArrowLeftRight,
    title: "Bidirectional Data Sync",
    description:
      "Two-way synchronization between NetSuite and external platforms, keeping inventory levels, order status, customer records, and financial data consistent without manual exports.",
  },
  {
    icon: Cloud,
    title: "Cloud Platform Connections",
    description:
      "Integrations with e-commerce platforms, CRM systems, payment gateways, and SaaS tools via REST APIs, OAuth authentication, and event-driven webhook handling.",
  },
  {
    icon: Database,
    title: "SuiteTalk Web Services",
    description:
      "Oracle's native REST and SOAP web service layer for direct access to standard NetSuite records, suitable for read-heavy integrations where a pre-built approach covers the requirements.",
  },
  {
    icon: RefreshCcw,
    title: "Scheduled Data Exchange",
    description:
      "Scheduled and Map/Reduce scripts that pull from external APIs or push NetSuite data on a defined schedule, with error logging, checkpointing, and automatic retry.",
  },
  {
    icon: FileCode2,
    title: "File-Based Integrations",
    description:
      "SFTP, CSV, and structured file integrations for systems that don't expose a modern API, automated file pickup, parsing, validation, and import into NetSuite records.",
  },
];

const COMMON_SYSTEMS = [
  "3PL providers: purchase orders, item receipts, sales orders, fulfillment confirmations, and inventory adjustments",
  "E-commerce platforms: order import, inventory sync, customer creation, and fulfillment status updates from Shopify, WooCommerce, and similar platforms",
  "CRM systems: customer and lead sync between Salesforce, HubSpot, and NetSuite",
  "Payment gateways: payment status, reconciliation, and transaction import",
  "EDI and supply chain: purchase orders, advance ship notices, invoices, and acknowledgements in structured formats",
  "Internal tools: custom-built applications, legacy databases, and internal APIs that need to exchange data with NetSuite",
];

const HOW_IT_WORKS = [
  {
    step: "01",
    title: "We map the data flow first",
    description:
      "Before writing code, we document what records move, in what direction, triggered by what event, with what validation rules. This makes the integration auditable and means the logic is not buried inside scripts only the original developer understands.",
  },
  {
    step: "02",
    title: "Every failure surface is logged",
    description:
      "We build error logging into every integration: specific messages when a sync fails, alerts when something doesn't complete, and a retry path that doesn't require a developer to intervene. Nothing fails silently.",
  },
  {
    step: "03",
    title: "Tested against real data before production",
    description:
      "All integrations are built and tested in Sandbox with actual API connections and representative data volumes. For high-volume sync, we use Map/Reduce scripts to handle load without hitting governance limits.",
  },
];

const WHY_SP = [
  {
    icon: ShieldCheck,
    title: "NetSuite-Certified",
    description:
      "NetSuite SuiteCloud Developer II and Administrator Professional certifications. Verified technical credentials, not self-declared experience.",
  },
  {
    icon: Zap,
    title: "Error-First Design",
    description:
      "Explicit error logging, failure alerting, and retry paths are built in from the start, not added later. You will know when a sync fails and exactly why.",
  },
  {
    icon: Users,
    title: "Direct Access",
    description:
      "You communicate directly with the person doing the work. No ticket system, no account manager as an intermediary.",
  },
  {
    icon: Award,
    title: "Enterprise Expertise, SMB Price",
    description:
      "The same depth of NetSuite expertise large companies staff internally, available without the overhead of a full-time hire or an enterprise consulting contract.",
  },
];

const FAQ = [
  {
    question: "What is the difference between a RESTlet and SuiteTalk?",
    answer:
      "RESTlets are custom API endpoints you build inside NetSuite using SuiteScript. They give you complete control over the data structure, validation logic, and what gets created or updated on the NetSuite side. SuiteTalk is Oracle's native web service layer that exposes standard NetSuite records directly, no custom code required, but no flexibility beyond what the standard API supports. For most custom integrations, RESTlets are the right choice because you can build exactly the interface your external system needs.",
  },
  {
    question: "Do you work with middleware platforms like Celigo or Boomi?",
    answer:
      "We can, but we don't depend on them. Middleware platforms are worth using when a pre-built connector exists for your system and the data mapping is straightforward. For complex business logic, multi-step validation, or integrations where you need precise control over error handling and retry behaviour, building directly against NetSuite's APIs produces a more maintainable result. We'll tell you honestly which approach fits your situation.",
  },
  {
    question: "How do you handle integration failures?",
    answer:
      "Every integration we build includes error logging, alerting when something fails, and a clear path to retry or reprocess records without needing a developer involved. We don't build integrations that fail silently. You'll know when a sync didn't complete and why.",
  },
  {
    question: "Can you integrate NetSuite with our 3PL?",
    answer:
      "Yes. 3PL integrations typically sync purchase orders, item receipts, sales orders, fulfillment confirmations, and inventory adjustments. The implementation depends on what your 3PL exposes, REST API, SFTP file exchange, or EDI, and we build to match that.",
  },
  {
    question: "Can you take over an existing integration that's broken or needs changes?",
    answer:
      "Yes. We review what's there first, document how it works, and identify why it's failing before making any changes. Inheriting undocumented integrations is common and something we handle regularly.",
  },
];

export const metadata: Metadata = {
  title: "NetSuite Integrations",
  description:
    "Custom NetSuite integration development: RESTlets, SuiteTalk APIs, scheduled data sync, and file-based integrations connecting NetSuite to e-commerce platforms, 3PLs, CRMs, and other business systems.",
  alternates: { canonical: "/netsuite-integrations" },
  openGraph: {
    title: "NetSuite Integrations",
    description: "Custom NetSuite integrations: RESTlet-based connections, scheduled sync scripts, and API integrations connecting NetSuite to e-commerce platforms, 3PLs, payment processors, and custom applications.",
    url: "https://suitepacific.com/netsuite-integrations",
    type: "website",
    images: [{ url: "https://suitepacific.com/og-default.png", width: 1200, height: 630 }],
  },
};

export default function NetSuiteIntegrationsPage() {
  return (
    <main className="pt-32 pb-24 sm:pt-40 sm:pb-32">
      <BreadcrumbJsonLd
        items={[
          { name: "Home", url: SITE_URL },
          { name: "NetSuite Integrations", url: `${SITE_URL}/netsuite-integrations` },
        ]}
      />
      <FaqJsonLd items={FAQ} />
      <ServiceJsonLd
        name="NetSuite Integrations"
        description="Custom NetSuite integrations with third-party platforms including e-commerce, 3PL, CRM, and payment systems."
        url={`${SITE_URL}/netsuite-integrations`}
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
          eyebrow="Integration Development"
          title="NetSuite Integrations"
          subtitle="Connect NetSuite to your other business systems, reliably, with proper error handling, and without silent failures."
          align="left"
        />

        <div className="mt-6 rounded-2xl border border-brand-100 bg-white p-5 shadow-soft">
          <LeadFormLight />
        </div>
        <p className="mt-3 text-xs text-brand-400">NetSuite-certified · Sandbox-first · Direct access, no ticket system · Month-to-month</p>

        <p className="mt-6 text-sm text-brand-400">
          Most businesses running NetSuite don&apos;t run it alone. When data needs to flow
          between NetSuite and a 3PL, an e-commerce platform, or a CRM, the difference between
          a well-built integration and a poorly built one is almost always in error handling,
          documentation, and whether it was tested against real data before going live.
          SuitePacific builds these integrations for post-go-live NetSuite accounts, with error
          logging, failure alerting, and Sandbox testing built in by default.
        </p>

        {/* Pain points */}
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

        {/* Integration types */}
        <div className="mt-14" data-section="integration-types">
          <h2 className="text-lg font-semibold text-brand-900 mb-1">Integration approaches we build</h2>
          <p className="text-sm text-brand-400 mb-6">
            The right approach depends on what systems you are connecting and what data needs to move.
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            {INTEGRATION_TYPES.map((item) => (
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

        {/* Common systems */}
        <div className="mt-14" data-section="common-systems">
          <h2 className="text-lg font-semibold text-brand-900 mb-4">Common systems we integrate with NetSuite</h2>
          <ul className="space-y-3">
            {COMMON_SYSTEMS.map((item) => (
              <li key={item} className="flex items-start gap-3 text-sm text-brand-600">
                <span className="h-1.5 w-1.5 rounded-full bg-accent shrink-0 mt-2" />
                {item}
              </li>
            ))}
          </ul>
        </div>

        {/* How it works */}
        <div className="mt-14" data-section="how-it-works">
          <h2 className="text-lg font-semibold text-brand-900 mb-6">How we approach integration work</h2>
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
            For integrations that require custom endpoints on the NetSuite side, see our{" "}
            <Link href="/netsuite-suitescript-development" className="text-accent hover:underline">
              SuiteScript development page
            </Link>
            . For ongoing integration maintenance after initial build, our{" "}
            <Link href="/netsuite-post-go-live-support" className="text-accent hover:underline">
              post-go-live support model
            </Link>{" "}
            covers that.
          </p>
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

        {/* Named integration sub-pages */}
        <div className="mt-14" data-section="named-integrations">
          <h2 className="text-lg font-semibold text-brand-900 mb-1">Platform-specific integration guides</h2>
          <p className="text-sm text-brand-400 mb-6">
            Detailed guides covering data flows, field mapping decisions, and approach for specific platforms.
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {[
              { href: "/netsuite-integrations/shopify", label: "NetSuite Shopify Integration", desc: "Order import, inventory sync, fulfillment, and customer matching." },
              { href: "/netsuite-integrations/salesforce", label: "NetSuite Salesforce Integration", desc: "Account sync, opportunity-to-order, and invoice visibility in Salesforce." },
              { href: "/netsuite-integrations/hubspot", label: "NetSuite HubSpot Integration", desc: "Contact sync, deal-to-sales-order, and invoice status in HubSpot." },
              { href: "/netsuite-integrations/avalara", label: "NetSuite Avalara Integration", desc: "Real-time tax calculation, exemption management, and transaction reconciliation." },
              { href: "/netsuite-integrations/amazon", label: "NetSuite Amazon Integration", desc: "Seller Central order import, FBA inventory sync, and settlement reconciliation." },
            ].map((item) => (
              <Link key={item.href} href={item.href} className="group block rounded-xl border border-brand-100 bg-white p-4 hover:border-accent/30 hover:shadow-sm transition-all">
                <p className="text-sm font-semibold text-brand-900 group-hover:text-accent transition-colors">{item.label}</p>
                <p className="mt-1 text-xs text-brand-400">{item.desc}</p>
              </Link>
            ))}
          </div>
        </div>

        {/* Related reading */}
        <div className="mt-10 rounded-2xl border border-brand-100 bg-brand-50/30 p-5 sm:p-6">
          <p className="text-sm font-semibold text-brand-900 mb-3">From the blog</p>
          <ul className="space-y-2.5">
            <li className="text-sm text-brand-400">
              <Link href="/blog/netsuite-nlauth-tba-end-of-support" className="text-accent hover:underline">
                NLAuth end of support: migrating to Token-Based Authentication
              </Link>{" "}
              covers what changes when NLAuth is deprecated and how to migrate existing integrations.
            </li>
            <li className="text-sm text-brand-400">
              <Link href="/blog/netsuite-rest-batch-sequential" className="text-accent hover:underline">
                NetSuite REST Web Services sequential batch processing
              </Link>{" "}
              explains when to use sequential vs. parallel batch operations in REST integrations.
            </li>
            <li className="text-sm text-brand-400">
              <Link href="/blog/netsuite-restlet-vs-rest-web-services" className="text-accent hover:underline">
                NetSuite RESTlet vs REST Web Services
              </Link>{" "}
              covers when to build a custom RESTlet versus using the built-in REST API, including authentication differences.
            </li>
          </ul>
        </div>

        <ServiceFaqSection items={FAQ} />
      </div>
    </main>
  );
}

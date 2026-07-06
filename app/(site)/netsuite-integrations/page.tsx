import type { Metadata } from "next";
import Link from "next/link";
import { Globe, ArrowLeftRight, Cloud, Database, RefreshCcw, FileCode2 } from "lucide-react";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Card } from "@/components/ui/Card";
import { IconBadge } from "@/components/ui/IconBadge";
import { Button } from "@/components/ui/Button";
import { BreadcrumbJsonLd, FaqJsonLd } from "@/components/seo/JsonLd";
import { ServiceFaqSection } from "@/components/ui/ServiceFaqSection";
import { SITE_URL } from "@/lib/content";

const FAQ = [
  {
    question: "What is the difference between a RESTlet and SuiteTalk?",
    answer:
      "RESTlets are custom API endpoints you build inside NetSuite using SuiteScript. They give you complete control over the data structure, validation logic, and what gets created or updated on the NetSuite side. SuiteTalk is Oracle's native web service layer that exposes standard NetSuite records directly — no custom code required, but no flexibility beyond what the standard API supports. For most custom integrations, RESTlets are the right choice because you can build exactly the interface your external system needs.",
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
      "Yes. 3PL integrations typically sync purchase orders, item receipts, sales orders, fulfillment confirmations, and inventory adjustments. The implementation depends on what your 3PL exposes — REST API, SFTP file exchange, or EDI — and we build to match that.",
  },
  {
    question: "Can you take over an existing integration that's broken or needs changes?",
    answer:
      "Yes. We review what's there first, document how it works, and identify why it's failing before making any changes. Inheriting undocumented integrations is common and something we handle regularly.",
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
      "Two-way synchronization between NetSuite and external platforms — keeping inventory levels, order status, customer records, and financial data consistent without manual exports.",
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
      "Oracle's native REST and SOAP web service layer for direct access to standard NetSuite records — suitable for read-heavy integrations where a pre-built approach covers the requirements.",
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
      "SFTP, CSV, and structured file integrations for systems that don't expose a modern API — automated file pickup, parsing, validation, and import into NetSuite records.",
  },
];

export const metadata: Metadata = {
  title: "NetSuite Integrations | SuitePacific",
  description:
    "Custom NetSuite integration development: RESTlets, SuiteTalk APIs, scheduled data sync, and file-based integrations connecting NetSuite to e-commerce platforms, 3PLs, CRMs, and other business systems.",
  alternates: { canonical: "/netsuite-integrations" },
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

      <div className="mx-auto max-w-3xl px-6 lg:px-8">
        <SectionHeading
          as="h1"
          eyebrow="Integration Development"
          title="NetSuite Integrations"
          subtitle="Connect NetSuite to your other business systems — reliably, with proper error handling, and without silent failures."
          align="left"
        />

        <div className="prose prose-blue mt-12 max-w-none prose-headings:font-semibold prose-headings:text-brand-900 prose-p:text-brand-400 prose-a:text-accent prose-a:no-underline hover:prose-a:underline prose-strong:text-brand-900">
          <h2>When NetSuite needs to talk to other systems</h2>
          <p>
            Most businesses running NetSuite don&apos;t run NetSuite alone. There&apos;s a 3PL
            managing warehouse operations, a Shopify store taking orders, a Salesforce CRM tracking
            customers, or a payment processor handling transactions — and data needs to flow between
            them accurately and automatically.
          </p>
          <p>
            A well-built integration removes the manual step of exporting from one system and
            importing into another, eliminates the discrepancies that come from doing that by hand,
            and gives both systems a consistent view of the data that matters. A poorly built one
            fails silently, creates duplicate records, or leaves your team reconciling spreadsheets
            to find what didn&apos;t sync.
          </p>
          <p>
            The difference is almost always in how errors are handled, how clearly the integration
            is documented, and whether it was tested against real data before going live.
          </p>

          <h2>Integration approaches we build</h2>
        </div>

        <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 gap-5">
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

        <div className="prose prose-blue mt-12 max-w-none prose-headings:font-semibold prose-headings:text-brand-900 prose-p:text-brand-400 prose-a:text-accent prose-a:no-underline hover:prose-a:underline prose-strong:text-brand-900">
          <h2>Common systems we integrate with NetSuite</h2>
          <ul>
            <li>
              <strong>3PL providers</strong> — purchase orders, item receipts, sales orders,
              fulfillment confirmations, and inventory adjustments
            </li>
            <li>
              <strong>E-commerce platforms</strong> — order import, inventory sync, customer
              creation, and fulfillment status updates from Shopify, WooCommerce, and similar
              platforms
            </li>
            <li>
              <strong>CRM systems</strong> — customer and lead sync between Salesforce, HubSpot,
              and NetSuite
            </li>
            <li>
              <strong>Payment gateways</strong> — payment status, reconciliation, and transaction
              import
            </li>
            <li>
              <strong>EDI and supply chain</strong> — purchase orders, advance ship notices,
              invoices, and acknowledgements in structured EDI formats
            </li>
            <li>
              <strong>Internal business systems</strong> — custom-built tools, legacy databases,
              and internal APIs that need to exchange data with NetSuite
            </li>
          </ul>

          <h2>How we approach integration work</h2>
          <p>
            Before writing any code, we map the data flow: what records are created or updated,
            in what direction, triggered by what event, and with what validation rules. This makes
            the integration auditable and means the logic isn&apos;t buried inside undocumented
            scripts that only the original developer understands.
          </p>
          <p>
            All integrations are tested against a sandbox account before production deployment.
            We build in error logging so failures surface as specific, actionable messages rather
            than silent gaps in your data. For high-volume integrations, we use{" "}
            <Link href="/netsuite-suitescript-development">Map/Reduce scripts</Link> to distribute
            the processing load and avoid governance limit errors.
          </p>
          <p>
            If you have an existing integration that&apos;s unreliable, undocumented, or needs to
            be extended, we take those on as well — starting with a documented review of what&apos;s
            already there before making any changes.
          </p>

          <h2>Who this is for</h2>
          <p>
            Companies already live on NetSuite that need to connect it to an external system, or
            that have an existing integration causing data problems and need it rebuilt or repaired.
            If you&apos;re still in your implementation phase, your implementation partner should
            handle initial integration setup. See our{" "}
            <Link href="/netsuite-post-go-live-support">post-go-live support overview</Link> for
            context on where integration work typically fits after go-live.
          </p>
        </div>

        <ServiceFaqSection items={FAQ} />

        <div className="mt-14 pt-10 border-t border-brand-50 text-center">
          <p className="text-brand-900 font-semibold">Need to connect NetSuite to another system?</p>
          <p className="mt-2 text-sm text-brand-400">
            Tell us what you need to integrate and we&apos;ll map out the right approach.
          </p>
          <div className="mt-6">
            <Button href="/contact">Book a Free Consultation</Button>
          </div>
        </div>
      </div>
    </main>
  );
}

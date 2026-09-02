import type { Metadata } from "next";
import Link from "next/link";
import {
  ArrowLeftRight, RefreshCw, AlertCircle, Wrench,
  ShieldCheck, Zap, Users, Award, Activity, BarChart2,
} from "lucide-react";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Card } from "@/components/ui/Card";
import { IconBadge } from "@/components/ui/IconBadge";
import { BreadcrumbJsonLd, FaqJsonLd, ServiceJsonLd, OrganizationJsonLd, VideoObjectJsonLd } from "@/components/seo/JsonLd";
import { ServiceFaqSection } from "@/components/ui/ServiceFaqSection";
import { LeadFormLight } from "@/components/sections/LeadFormLight";
import { SITE_URL } from "@/lib/content";

const INTEGRATIONS = [
  {
    icon: ArrowLeftRight,
    title: "Shopify",
    description: "Order import, real-time inventory sync, fulfillment confirmation, customer record matching, and return handling across single and multi-location accounts.",
  },
  {
    icon: ArrowLeftRight,
    title: "Salesforce",
    description: "Bidirectional sync of customers, contacts, opportunities, and orders between Salesforce and NetSuite, with configurable field mapping and error handling.",
  },
  {
    icon: ArrowLeftRight,
    title: "HubSpot",
    description: "Contact and deal sync, invoice-to-deal matching, and lead-to-customer handoff between HubSpot and NetSuite with deduplication logic.",
  },
  {
    icon: ArrowLeftRight,
    title: "Amazon",
    description: "Amazon Seller Central order import, inventory sync, and FBA fulfillment handling with NetSuite item mapping and multi-marketplace support.",
  },
  {
    icon: ArrowLeftRight,
    title: "WooCommerce",
    description: "Order, inventory, customer, and fulfillment sync between WooCommerce and NetSuite, including product catalog management.",
  },
  {
    icon: ArrowLeftRight,
    title: "Custom API integrations",
    description: "Custom Celigo flows for any REST or SOAP API source: 3PL warehouses, EDI platforms, payment processors, shipping carriers, and internal systems.",
  },
];

const SERVICES = [
  {
    icon: Zap,
    title: "New Celigo integration builds",
    description: "End-to-end design and build of Celigo flows: field mapping, data transformation, error handling, and monitoring. Deployed and tested in your environment before going live.",
  },
  {
    icon: Wrench,
    title: "Broken integration repair",
    description: "Diagnosis and repair of Celigo flows that have stopped working, are producing errors, or are syncing incorrect data. Root cause identified and documented before changes are made.",
  },
  {
    icon: RefreshCw,
    title: "Ongoing integration maintenance",
    description: "Platform updates in NetSuite or connected systems can break existing flows. Ongoing maintenance covers monitoring, fix deployment, and adaptation as both systems evolve.",
  },
  {
    icon: Activity,
    title: "Error monitoring and alerting",
    description: "Celigo flow error logs reviewed on a scheduled basis. Failures are identified before they cause downstream data problems. Alerting configured to surface errors in real time.",
  },
  {
    icon: BarChart2,
    title: "Performance optimization",
    description: "High-volume integrations that slow down or hit Celigo flow limits are restructured: batch sizing, pagination, concurrency, and retry logic reviewed and optimized.",
  },
  {
    icon: AlertCircle,
    title: "Legacy integration migration",
    description: "Accounts with legacy point-to-point integrations or deprecated Celigo connectors migrated to current Celigo architecture with improved reliability and maintainability.",
  },
];

const FAQ = [
  {
    question: "What is Celigo, and how does it connect to NetSuite?",
    answer:
      "Celigo is an iPaaS (integration platform as a service) that connects NetSuite to external systems through pre-built and custom integration flows. A Celigo flow defines how data moves between NetSuite and another platform: what triggers the flow, which records are transferred, how fields are mapped, how errors are handled, and how often the sync runs. Celigo is one of the most widely used integration platforms for NetSuite because it has native NetSuite connectors and a large library of pre-built marketplace integrations for common systems like Shopify, Salesforce, Amazon, and HubSpot. SuitePacific holds Celigo Mastery Level 4 certification, the highest certification tier available from Celigo.",
  },
  {
    question: "Why does a Celigo integration stop working?",
    answer:
      "Celigo integrations typically break for one of four reasons. First, a field or record type change in NetSuite or the connected system breaks a mapping that previously worked. Second, an API change in the connected platform changes the format or endpoint of data the Celigo flow expects. Third, a new record type, product variant, or data structure is introduced that the original flow was not designed to handle. Fourth, NetSuite permission changes or token revocation break the Celigo connector&apos;s authentication. Diagnosing the specific failure requires reviewing Celigo error logs, comparing the current field mapping against the source and destination, and testing the connection credentials.",
  },
  {
    question: "What is Celigo Mastery Level 4?",
    answer:
      "Celigo Mastery Level 4 is the highest tier of the Celigo Partner Mastery Program. It is awarded to integration partners who have demonstrated advanced Celigo expertise across build complexity, client volume, and platform depth. A small number of NetSuite integration firms in North America hold this certification. SuitePacific achieved Mastery Level 4 through a combination of integration volume, complexity of builds delivered, and Celigo platform proficiency. The certification signals depth of Celigo expertise beyond the standard integration partner designation.",
  },
  {
    question: "Can SuitePacific take over a Celigo integration built by another firm?",
    answer:
      "Yes. Inheriting existing Celigo integrations is common. The onboarding process reviews the current flow configuration, documents the field mappings and transformation logic, identifies any known errors or fragile configurations, and produces documentation of how the integration works before any changes are made. Most inherited integrations require at least minor cleanup: deprecated field references, outdated mapping logic, or error handling that never surfaces failures. SuitePacific documents what was found, what was changed, and why.",
  },
  {
    question: "How is Celigo integration maintenance different from a one-time integration build?",
    answer:
      "A one-time integration build produces a working flow that is tested and handed over. Maintenance covers what happens after: NetSuite upgrades can change field IDs or record behavior, connected platforms update their APIs, and new product types or business processes require flow modifications. Without ongoing maintenance, an integration that works on launch will degrade as the systems it connects evolve. SuitePacific includes Celigo integration maintenance as part of managed support retainers; it can also be engaged on a break-fix basis for accounts that only need reactive support.",
  },
  {
    question: "Does SuitePacific use Celigo for every integration, or do you also build custom RESTlet integrations?",
    answer:
      "Both. Celigo is the right tool when the connected system has a mature Celigo connector, the data flow is relatively standard, and ongoing platform maintenance is a priority. Custom RESTlet integrations are the right tool when Celigo does not have a connector for the target system, when the transformation logic is complex enough that custom code is more maintainable than Celigo scripted imports, or when the client already has a custom integration that needs to be extended rather than replaced. SuitePacific makes the build approach decision based on the specific integration requirements and tells the client which approach is recommended and why.",
  },
];

export const metadata: Metadata = {
  title: "NetSuite Celigo Integration",
  description:
    "Celigo Mastery Level 4 certified NetSuite Celigo integration: new builds, broken flow repair, ongoing maintenance, and error monitoring. Shopify, Salesforce, HubSpot, Amazon, and custom API integrations.",
  alternates: { canonical: "/netsuite-integrations/celigo" },
  openGraph: {
    title: "NetSuite Celigo Integration",
    description:
      "Celigo Mastery Level 4 certified. NetSuite Celigo integration: new builds, broken flow repair, and ongoing maintenance for Shopify, Salesforce, HubSpot, Amazon, and custom API connections.",
    url: `${SITE_URL}/netsuite-integrations/celigo`,
    type: "website",
    images: [{ url: `${SITE_URL}/og-default.png`, width: 1200, height: 630 }],
  },
};

export default function NetSuiteCeligoIntegrationPage() {
  return (
    <main className="pt-32 pb-24 sm:pt-40 sm:pb-32">
      <BreadcrumbJsonLd
        items={[
          { name: "Home", url: SITE_URL },
          { name: "NetSuite Integrations", url: `${SITE_URL}/netsuite-integrations` },
          { name: "Celigo", url: `${SITE_URL}/netsuite-integrations/celigo` },
        ]}
      />
      <FaqJsonLd items={FAQ} />
      <ServiceJsonLd
        name="NetSuite Celigo Integration"
        description="NetSuite Celigo integration services: new builds, broken flow repair, ongoing maintenance, and error monitoring. Celigo Mastery Level 4 certified."
        url={`${SITE_URL}/netsuite-integrations/celigo`}
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
          title="NetSuite Celigo Integration"
          subtitle="New Celigo integration builds, broken flow repair, and ongoing maintenance from a Celigo Mastery Level 4 certified team. Shopify, Salesforce, HubSpot, Amazon, and custom API connections."
          align="left"
        />

        <div className="mt-6 rounded-2xl border border-brand-100 bg-white p-5 shadow-soft">
          <LeadFormLight />
        </div>
        <p className="mt-3 text-xs text-brand-400">Celigo Mastery Level 4 · Oracle-certified · Error-first design · Direct access</p>
        <p className="mt-1 text-xs text-brand-300">Last updated September 2026</p>

        {/* Credential callout */}
        <div className="mt-5 rounded-xl border border-accent/20 bg-accent/5 px-5 py-4">
          <p className="text-xs font-semibold uppercase tracking-wide text-accent mb-1">Celigo Mastery Level 4</p>
          <p className="text-sm text-brand-700 leading-relaxed">
            SuitePacific holds Celigo Mastery Level 4 certification, the highest tier in the Celigo Partner
            Mastery Program. A small number of NetSuite integration firms in North America have reached this level.
            It represents verified depth in Celigo platform architecture, integration complexity, and production
            volume, not just familiarity with the Celigo interface.
          </p>
        </div>

        <div className="mt-5 rounded-2xl border-l-4 border-accent bg-brand-50/50 p-5">
          <p className="text-xs font-semibold uppercase tracking-wide text-accent mb-2">Quick answer</p>
          <p className="text-sm text-brand-700 leading-relaxed">
            Celigo is an iPaaS (integration platform as a service) that connects NetSuite to external
            systems through configurable integration flows. SuitePacific designs, builds, and maintains
            Celigo integrations for NetSuite accounts, including connections to Shopify, Salesforce,
            HubSpot, Amazon, WooCommerce, and custom REST or SOAP API targets. Services include new
            integration builds, repair of broken or degraded Celigo flows, ongoing maintenance as
            connected platforms evolve, error monitoring and alerting, and migration of legacy integrations
            to current Celigo architecture. SuitePacific holds Celigo Mastery Level 4 certification,
            the highest tier available from Celigo, reflecting advanced platform expertise across
            build complexity and production volume. Integrations are built with explicit error handling,
            tested before going live, and documented for ongoing maintainability. Managed support
            retainers include Celigo integration maintenance as part of ongoing account coverage.
          </p>
        </div>

        <p className="mt-6 text-sm text-brand-400">
          Celigo integrations fail over time. NetSuite releases change field behavior. Connected platforms
          update their APIs. New product types, locations, or subsidiaries require flow modifications.
          SuitePacific builds Celigo integrations with error handling and monitoring as defaults, and
          maintains them as the connected systems evolve.
        </p>

        {/* What can be integrated */}
        <div className="mt-14" data-section="integrations">
          <h2 className="text-lg font-semibold text-brand-900 mb-6">What systems can SuitePacific integrate with NetSuite via Celigo?</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {INTEGRATIONS.map((item) => (
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

        {/* Services */}
        <div className="mt-14" data-section="services">
          <h2 className="text-lg font-semibold text-brand-900 mb-6">What Celigo integration services does SuitePacific provide?</h2>
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

        {/* Common failure scenarios */}
        <div className="mt-14" data-section="troubleshooting">
          <h2 className="text-lg font-semibold text-brand-900 mb-4">Common Celigo integration problems SuitePacific resolves</h2>
          <div className="space-y-3">
            {[
              { title: "Celigo flow stopped syncing after a NetSuite upgrade", desc: "Field ID changes or record type modifications in NetSuite break existing Celigo mappings. Diagnosed by comparing current field structure against the flow mapping and testing with representative records." },
              { title: "Orders are importing but with incorrect field values", desc: "Data transformation errors in Celigo scripted imports or lookup tables produce records that pass without error but contain wrong data. The mapping logic is reviewed field by field against source and destination." },
              { title: "Celigo errors appearing but no one is alerted", desc: "Flows that silently error without notifications allow data problems to accumulate. Error alerting is configured at the flow and connection level so failures surface immediately." },
              { title: "The Celigo connector authentication has expired or been revoked", desc: "NetSuite token-based authentication credentials used by Celigo expire or are revoked when roles change. Re-establishing the connection requires issuing new TBA credentials and updating the Celigo connector." },
              { title: "Inventory counts in the connected system are consistently wrong", desc: "Inventory sync timing, location mapping, or item matching logic in the Celigo flow produces incorrect quantities. The sync schedule, inventory location mapping, and item ID resolution are reviewed and corrected." },
            ].map((item) => (
              <div key={item.title} className="rounded-xl border border-brand-100 bg-white p-4">
                <p className="text-sm font-semibold text-brand-900 mb-1">{item.title}</p>
                <p className="text-sm text-brand-400 leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Why SuitePacific */}
        <div className="mt-14" data-section="why-suitepacific">
          <h2 className="text-lg font-semibold text-brand-900 mb-6">Why SuitePacific for Celigo integration?</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            {[
              { icon: Award, title: "Celigo Mastery Level 4", desc: "The highest certification tier in Celigo's Partner Mastery Program. Reflects verified depth in Celigo architecture, flow complexity, and production integration volume." },
              { icon: ShieldCheck, title: "Oracle SuiteCloud Developer II certified", desc: "SuiteScript and NetSuite platform expertise alongside Celigo expertise. Integrations that require custom NetSuite scripting alongside Celigo flows are handled in the same engagement." },
              { icon: Users, title: "Direct access", desc: "You communicate directly with the integration specialist building and maintaining the flow. No account manager relay, no ticket system between you and the work." },
              { icon: Zap, title: "Error-first design", desc: "Every Celigo integration is built with explicit error handling and alerting configured. Flow failures surface immediately rather than accumulating silently." },
            ].map((item) => (
              <Card key={item.title} className="p-5 flex items-start gap-4">
                <IconBadge icon={item.icon} />
                <div>
                  <h3 className="font-semibold text-brand-900 text-sm">{item.title}</h3>
                  <p className="mt-1.5 text-sm text-brand-400">{item.desc}</p>
                </div>
              </Card>
            ))}
          </div>
        </div>

        {/* CTA */}
        <div className="mt-12 rounded-2xl border-2 border-accent/30 bg-gradient-to-br from-accent/5 to-transparent p-6">
          <p className="text-xs font-semibold uppercase tracking-wide text-accent mb-3">Get started</p>
          <h2 className="text-base font-semibold text-brand-900 mb-3">
            Celigo integration support from a Mastery Level 4 certified team.
          </h2>
          <p className="text-sm text-brand-500 mb-4">
            Whether you need a new Celigo integration built, an existing flow repaired, or ongoing
            maintenance as part of a managed support retainer, SuitePacific handles Celigo integration
            work directly. Celigo Mastery Level 4. Oracle SuiteCloud Developer II certified. US-based,
            direct access. Managed support plans start at $799 per month, month-to-month.
          </p>
          <Link
            href="/contact"
            className="inline-flex items-center gap-2 rounded-lg bg-accent px-4 py-2 text-sm font-semibold text-white hover:bg-accent/90 transition-colors"
          >
            Discuss your integration →
          </Link>
        </div>

        <ServiceFaqSection items={FAQ} />

        {/* Related */}
        <div className="mt-10 rounded-2xl border border-brand-100 bg-brand-50/30 p-5 sm:p-6">
          <p className="text-sm font-semibold text-brand-900 mb-3">Related integration pages</p>
          <ul className="space-y-2.5">
            <li className="text-sm text-brand-400">
              <Link href="/netsuite-integrations/shopify" className="text-accent hover:underline">NetSuite Shopify integration</Link>{" "}
              covers order import, inventory sync, and fulfillment confirmation between Shopify and NetSuite.
            </li>
            <li className="text-sm text-brand-400">
              <Link href="/netsuite-integrations/salesforce" className="text-accent hover:underline">NetSuite Salesforce integration</Link>{" "}
              covers bidirectional sync of customers, opportunities, and orders between Salesforce and NetSuite.
            </li>
            <li className="text-sm text-brand-400">
              <Link href="/netsuite-integrations/hubspot" className="text-accent hover:underline">NetSuite HubSpot integration</Link>{" "}
              covers contact, deal, and invoice sync between HubSpot and NetSuite.
            </li>
            <li className="text-sm text-brand-400">
              <Link href="/netsuite-managed-support" className="text-accent hover:underline">NetSuite managed support</Link>{" "}
              includes Celigo integration maintenance as part of an ongoing monthly retainer.
            </li>
            <li className="text-sm text-brand-400">
              <Link href="/case-studies/celigo-integration-failure-diagnosis" className="text-accent hover:underline">Case study: Celigo order sync failure</Link>{" "}
              walks through how a silent Celigo-Shopify failure was diagnosed and 847 unsynced orders were recovered.
            </li>
          </ul>
        </div>
      </div>
    </main>
  );
}

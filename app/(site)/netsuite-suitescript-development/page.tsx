import type { Metadata } from "next";
import Link from "next/link";
import {
  GitBranch, Layers3, Timer, MousePointerClick, Activity, PanelsTopLeft,
  AlertCircle, Wrench, AlertTriangle,
  ShieldCheck, Gauge, Users, Award,
} from "lucide-react";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Card } from "@/components/ui/Card";
import { IconBadge } from "@/components/ui/IconBadge";
import { BreadcrumbJsonLd, FaqJsonLd, ServiceJsonLd, OrganizationJsonLd, VideoObjectJsonLd } from "@/components/seo/JsonLd";
import { ServiceFaqSection } from "@/components/ui/ServiceFaqSection";
import { LeadFormLight } from "@/components/sections/LeadFormLight";
import { SuitePacificCallout } from "@/components/sections/SuitePacificCallout";
import { LeadForm } from "@/components/sections/LeadForm";
import { SITE_URL } from "@/lib/content";

const PAIN_POINTS = [
  {
    icon: AlertCircle,
    title: "Standard configuration has a ceiling.",
    description:
      "Workflows can't fire on CSV imports. Formula fields can't reference other record types. There's a business rule that simply cannot be enforced without code.",
  },
  {
    icon: Wrench,
    title: "Existing scripts are failing.",
    description:
      "Governance limit errors on Scheduled Scripts, User Events firing on every save whether needed or not, or SuiteScript 1.0 code nobody has touched or understands.",
  },
  {
    icon: AlertTriangle,
    title: "The developer who built them is gone.",
    description:
      "Undocumented scripts doing things nobody fully understands. No way to tell which ones are still active, which are broken, or what breaks if one is removed.",
  },
];

const SCRIPT_TYPES = [
  { icon: Activity, title: "User Event Scripts", description: "Automatic logic that runs before or after a record is saved, validated, or loaded, for field defaults, validation rules, and cross-record updates." },
  { icon: MousePointerClick, title: "Client Scripts", description: "Real-time field-level logic directly on the data entry form: instant validation, conditional field visibility, and guided data entry." },
  { icon: Timer, title: "Scheduled Scripts", description: "Background jobs that run on a defined schedule, for recurring data tasks, batch updates, and automated maintenance processes." },
  { icon: Layers3, title: "Map/Reduce Scripts", description: "High-volume data processing without hitting governance limits, handling thousands of records reliably in background queues." },
  { icon: PanelsTopLeft, title: "Suitelets", description: "Custom pages and tools built directly inside NetSuite: internal portals, approval interfaces, and data entry tools outside the standard record model." },
  { icon: GitBranch, title: "RESTlets", description: "Custom API endpoints on your NetSuite account for integrating with external systems, webhooks, or custom data exchange." },
];

const HOW_IT_WORKS = [
  {
    step: "01",
    title: "Scoped before any code is written",
    description:
      "We map the exact trigger, the input records and fields, the expected output, and the edge cases. A written spec is agreed before development starts.",
  },
  {
    step: "02",
    title: "Built and tested in Sandbox",
    description:
      "Every script is tested against your real record types and representative data volumes. Governance consumption is verified at production scale, not just a single test record.",
  },
  {
    step: "03",
    title: "Deployed and monitored",
    description:
      "Production deployment happens outside business hours. We monitor the first full execution cycle and document what the script does, which records it touches, and what would break if it were removed.",
  },
];

const WHEN_YOU_NEED = [
  "A business rule that needs to fire on CSV imports, API saves, and manual saves identically",
  "A Scheduled script failing at production volume that needs to be moved to Map/Reduce",
  "NetSuite needs to push or pull data from an external system",
  "A calculation too complex for formula fields that requires conditional logic across records",
  "A custom interface or approval dashboard inside NetSuite",
];

const WHY_SP = [
  {
    icon: ShieldCheck,
    title: "NetSuite-Certified",
    description:
      "NetSuite SuiteCloud Developer II and Administrator Professional certifications. Verified technical credentials, not self-declared experience.",
  },
  {
    icon: Gauge,
    title: "Sandbox-First Builds",
    description:
      "Every script is built and tested in Sandbox against your real record types and data volumes before going near Production. Governance limits checked at scale.",
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
    question: "Do you work on scripts an existing developer built?",
    answer: "Yes. Inheriting a customized account with undocumented scripts is common. We audit what is there, document what each script controls, and extend or fix it without breaking what is working.",
  },
  {
    question: "Will custom scripts break when NetSuite updates?",
    answer: "Scripts built against SuiteScript 2.1 using modular patterns rarely break on updates. The most common risk is scripts referencing hard-coded internal IDs for renamed fields or using deprecated API methods. We build with upgrade resilience in mind and can audit existing scripts for that risk.",
  },
  {
    question: "Can you integrate NetSuite with external systems?",
    answer: "Yes, via RESTlets (custom API endpoints on the NetSuite side) or Scheduled and Map/Reduce scripts that push and pull data from external APIs. We have built integrations with e-commerce platforms, payment processors, 3PLs, and various business applications.",
  },
  {
    question: "How long does a typical SuiteScript project take?",
    answer: "A focused script, a User Event for a validation rule or a Scheduled script for a recurring data update, typically takes one to two weeks from scoping to sandbox-tested delivery. We scope each project before starting so the timeline is agreed upfront.",
  },
  {
    question: "How do you handle scripts that are hitting governance limits?",
    answer: "Governance limit errors almost always have a root cause: a record.load() inside a loop, a search running in beforeSubmit on high-volume records, or a Scheduled Script that needs to be moved to Map/Reduce. We diagnose the bottleneck, identify the correct architectural fix, and rebuild the script to handle the actual volume without hitting limits.",
  },
  {
    question: "Do you write scripts for specific SuiteScript versions?",
    answer: "We write exclusively against SuiteScript 2.1, the current version. SuiteScript 1.0 is still active in many accounts but Oracle has been deprecating its API methods for several releases. If you have SuiteScript 1.0 scripts, we can migrate them to 2.1 as part of a cleanup project.",
  },
  {
    question: "What happens after the script is deployed?",
    answer: "We monitor the first production run, confirm the script is executing correctly in the execution log, and make any adjustments based on real production data. Scripts we build are covered for adjustments if a NetSuite release changes something or your business process changes.",
  },
];

export const metadata: Metadata = {
  title: "NetSuite SuiteScript Development",
  description:
    "SuiteScript 2.x development for NetSuite: User Event, Client, Scheduled, Map/Reduce, and Suitelet scripts built and tested before touching production.",
  alternates: { canonical: "/netsuite-suitescript-development" },
  openGraph: {
    title: "NetSuite SuiteScript Development",
    description: "SuiteScript 2.x development for NetSuite: User Event, Client, Scheduled, Map/Reduce, and Suitelet scripts built and tested before touching production.",
    url: "https://suitepacific.com/netsuite-suitescript-development",
    type: "website",
    images: [{ url: "https://suitepacific.com/og-default.png", width: 1200, height: 630 }],
  },
};

export default function SuiteScriptDevelopmentPage() {
  return (
    <main className="pt-32 pb-24 sm:pt-40 sm:pb-32">
      <BreadcrumbJsonLd
        items={[
          { name: "Home", url: SITE_URL },
          { name: "NetSuite SuiteScript Development", url: `${SITE_URL}/netsuite-suitescript-development` },
        ]}
      />
      <FaqJsonLd items={FAQ} />
      <ServiceJsonLd
        name="NetSuite SuiteScript Development"
        description="Custom SuiteScript 2.x development for post-go-live NetSuite accounts, including User Event scripts, Client scripts, Scheduled scripts, Map/Reduce scripts, RESTlets, and Suitelets."
        url={`${SITE_URL}/netsuite-suitescript-development`}
        serviceType="SuiteScript Development"
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
          eyebrow="SuiteScript Development"
          title="NetSuite SuiteScript Development"
          subtitle="Custom scripts that extend NetSuite beyond what standard configuration can reach, built and tested in Sandbox before touching your live account."
          align="left"
        />

        <div className="mt-6 rounded-2xl border border-brand-100 bg-white p-5 shadow-soft">
          <LeadFormLight />
        </div>
        <p className="mt-3 text-xs text-brand-400">NetSuite-certified · Sandbox-first · Direct access, no ticket system · Month-to-month</p>

        <div className="mt-6 rounded-2xl border-l-4 border-accent bg-brand-50/50 p-5">
          <p className="text-xs font-semibold uppercase tracking-wide text-accent mb-2">Quick answer</p>
          <p className="text-sm text-brand-700 leading-relaxed">
            NetSuite SuiteScript development refers to custom JavaScript scripts built on
            NetSuite&apos;s SuiteScript 2.1 platform to extend account behavior beyond what standard
            configuration can reach. The six main script types each serve a different purpose:
            User Event scripts run automatically before or after a record is saved; Client scripts
            run in real time as a user edits a form; Scheduled scripts run on a defined timetable
            for batch processing; Map/Reduce scripts handle high-volume data operations without
            hitting governance limits; Suitelets build custom pages and tools inside NetSuite;
            RESTlets create custom API endpoints for integrations. SuitePacific builds and
            maintains all six types for post-go-live accounts. Every script is scoped against your
            specific record types, built and tested in your Sandbox account before touching
            Production, and documented as part of the deliverable. Engagements run month-to-month
            with direct access to the certified developer managing the account, without
            statement-of-work requirements for individual requests.
          </p>
        </div>

        <p className="mt-6 text-sm text-brand-400">
          SuiteScript is NetSuite&apos;s built-in JavaScript development platform. When configuration
          runs out, a script in the right place automates what currently takes an hour, enforces
          a rule that workflows cannot, or connects NetSuite to an external system. SuitePacific
          builds and maintains these scripts for post-go-live NetSuite accounts, Sandbox-tested
          against your real record types before touching Production. See our{" "}
          <Link href="/blog/suitescript-best-practices" className="text-accent hover:underline">
            SuiteScript best practices guide
          </Link>{" "}
          and{" "}
          <Link href="/blog/netsuite-script-governance-limit" className="text-accent hover:underline">
            governance limit error guide
          </Link>{" "}
          for background.
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

        {/* Script types */}
        <div className="mt-14" data-section="script-types">
          <h2 className="text-lg font-semibold text-brand-900 mb-1">Script types we build</h2>
          <p className="text-sm text-brand-400 mb-6">
            Most production accounts need a mix of these, each suited to a different kind of task.
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            {SCRIPT_TYPES.map((item) => (
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

        {/* When you need a script */}
        <div className="mt-14" data-section="when-config-runs-out">
          <h2 className="text-lg font-semibold text-brand-900 mb-4">When configuration isn&apos;t enough</h2>
          <p className="text-sm text-brand-400 mb-5">
            Standard NetSuite configuration covers a lot. These are the consistent patterns where a script becomes necessary:
          </p>
          <ul className="space-y-3">
            {WHEN_YOU_NEED.map((item) => (
              <li key={item} className="flex items-start gap-3 text-sm text-brand-600">
                <span className="h-1.5 w-1.5 rounded-full bg-accent shrink-0 mt-2" />
                {item}
              </li>
            ))}
          </ul>
        </div>

        {/* How it works */}
        <div className="mt-14" data-section="how-it-works">
          <h2 className="text-lg font-semibold text-brand-900 mb-6">How it works</h2>
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
            For teams that need ongoing development capacity rather than project-by-project work,
            see our{" "}
            <Link href="/netsuite-post-go-live-support" className="text-accent hover:underline">
              managed support model
            </Link>
            . For the Map/Reduce architecture that handles high-volume scripts, see our{" "}
            <Link href="/blog/netsuite-map-reduce-script-guide" className="text-accent hover:underline">
              Map/Reduce guide
            </Link>
            .
          </p>
        </div>

        {/* Why SuitePacific */}
        <div className="mt-14" data-section="why-suitepacific">
          <h2 className="text-lg font-semibold text-brand-900 mb-6">Why companies choose SuitePacific</h2>
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

        {/* Related reading */}
        <div className="mt-10 rounded-2xl border border-brand-100 bg-brand-50/30 p-5 sm:p-6">
          <p className="text-sm font-semibold text-brand-900 mb-3">From the blog</p>
          <ul className="space-y-2.5">
            <li className="text-sm text-brand-400">
              <Link href="/blog/suitescript-best-practices" className="text-accent hover:underline">
                SuiteScript best practices
              </Link>{" "}
              covers the eight patterns that prevent the most common production failures in SuiteScript 2.x.
            </li>
            <li className="text-sm text-brand-400">
              <Link href="/blog/netsuite-map-reduce-script-guide" className="text-accent hover:underline">
                NetSuite Map/Reduce script guide
              </Link>{" "}
              explains the five stages, governance limits, and a complete deployable example for bulk processing jobs.
            </li>
            <li className="text-sm text-brand-400">
              <Link href="/blog/netsuite-advanced-pdf-data-model" className="text-accent hover:underline">
                NetSuite Advanced PDF template data model
              </Link>{" "}
              covers how to access header fields, line items, entity data, and amounts in FreeMarker templates.
            </li>
            <li className="text-sm text-brand-400">
              <Link href="/blog/netsuite-user-event-vs-client-script" className="text-accent hover:underline">
                User Event vs. Client Script in NetSuite
              </Link>{" "}
              explains which script type to use for each automation scenario and why the choice affects governance.
            </li>
            <li className="text-sm text-brand-400">
              <Link href="/blog/netsuite-workflow-vs-suitescript" className="text-accent hover:underline">
                NetSuite Workflow vs. SuiteScript
              </Link>{" "}
              covers when SuiteFlow is enough and when a script is the only way to reach the result you need.
            </li>
            <li className="text-sm text-brand-400">
              <Link href="/blog/netsuite-suiteql-bound-parameters" className="text-accent hover:underline">
                SuiteQL bound parameters
              </Link>{" "}
              explains how to use parameterized queries to prevent injection and improve query reliability.
            </li>
            <li className="text-sm text-brand-400">
              <Link href="/blog/netsuite-suiteql-sort-change-2026-2" className="text-accent hover:underline">
                NetSuite 2026.2 SuiteQL sort order change
              </Link>{" "}
              covers the implicit sort removal that affects queries returning large result sets in 2026.2.
            </li>
            <li className="text-sm text-brand-400">
              <Link href="/blog/netsuite-suiteql-guide" className="text-accent hover:underline">
                NetSuite SuiteQL guide for administrators and developers
              </Link>{" "}
              covers how SuiteQL differs from Saved Searches, key syntax differences, and how to run queries from SuiteScript and the REST API.
            </li>
            <li className="text-sm text-brand-400">
              <Link href="/blog/netsuite-custom-gl-plugin-guide" className="text-accent hover:underline">
                NetSuite Custom GL Plugin: what it can and cannot do
              </Link>{" "}
              covers the transaction types where the plugin does not execute and the design principles for using it correctly.
            </li>
          </ul>
        </div>

        <SuitePacificCallout
          heading="SuitePacific: dedicated SuiteScript development and maintenance"
          linkHref="/netsuite-care"
          linkLabel="View SuitePacific plans"
        />

        <ServiceFaqSection items={FAQ} />

        <div id="contact" className="mt-14 pt-10 border-t border-brand-50">
          <LeadForm />
        </div>
      </div>
    </main>
  );
}

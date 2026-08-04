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
import { Button } from "@/components/ui/Button";
import { BreadcrumbJsonLd, FaqJsonLd } from "@/components/seo/JsonLd";
import { ServiceFaqSection } from "@/components/ui/ServiceFaqSection";
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
    title: "Oracle-Certified",
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
  title: "NetSuite SuiteScript Development | SuitePacific",
  description:
    "Custom SuiteScript 2.x development for NetSuite: User Event scripts, Client scripts, Scheduled scripts, Map/Reduce, and Suitelets built and tested in sandbox before touching production.",
  alternates: { canonical: "/netsuite-suitescript-development" },
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

      <div className="mx-auto max-w-3xl px-6 lg:px-8">
        <SectionHeading
          as="h1"
          eyebrow="SuiteScript Development"
          title="NetSuite SuiteScript Development"
          subtitle="Custom scripts that extend NetSuite beyond what standard configuration can reach, built and tested in Sandbox before touching your live account."
          align="left"
        />

        <p className="mt-6 text-sm text-brand-400">
          SuiteScript is NetSuite&apos;s built-in JavaScript development platform. When configuration
          runs out, a script in the right place automates what currently takes an hour, enforces
          a rule that workflows cannot, or connects NetSuite to an external system. See our{" "}
          <Link href="/blog/suitescript-best-practices" className="text-accent hover:underline">
            SuiteScript best practices guide
          </Link>{" "}
          and{" "}
          <Link href="/blog/netsuite-script-governance-limit" className="text-accent hover:underline">
            governance limit error guide
          </Link>{" "}
          for background.
        </p>

        <div className="mt-6">
          <Button href="/contact">Book a Free Consultation</Button>
        </div>

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
          <h2 className="text-lg font-semibold text-brand-900 mb-4">When configuration runs out</h2>
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
          <h2 className="text-lg font-semibold text-brand-900 mb-6">How we approach SuiteScript work</h2>
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

        <ServiceFaqSection items={FAQ} />

        <div className="mt-14 pt-10 border-t border-brand-50" data-section="contact">
          <p className="text-brand-900 font-semibold text-lg">Need a custom NetSuite script?</p>
          <p className="mt-2 text-sm text-brand-400">
            Tell us what you are trying to automate or fix and we will scope it out.
          </p>
          <div className="mt-6 rounded-2xl border border-brand-100 bg-white p-6 sm:p-8 shadow-soft">
            <LeadForm />
          </div>
        </div>
      </div>
    </main>
  );
}

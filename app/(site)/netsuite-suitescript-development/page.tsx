import type { Metadata } from "next";
import Link from "next/link";
import { GitBranch, Layers3, Timer, MousePointerClick, Activity, PanelsTopLeft } from "lucide-react";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Card } from "@/components/ui/Card";
import { IconBadge } from "@/components/ui/IconBadge";
import { Button } from "@/components/ui/Button";
import { BreadcrumbJsonLd, FaqJsonLd } from "@/components/seo/JsonLd";
import { ServiceFaqSection } from "@/components/ui/ServiceFaqSection";
import { SITE_URL } from "@/lib/content";

const FAQ = [
  {
    question: "Do you work on scripts an existing developer built?",
    answer: "Yes. Inheriting a customized account with undocumented scripts is common. We audit what's there, document what each script controls, and extend or fix it without breaking what's working.",
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
    answer: "A focused script — a User Event for a validation rule, a Scheduled script for a recurring data update — typically takes one to two weeks from scoping to sandbox-tested delivery. We scope each project before starting so the timeline is agreed upfront.",
  },
];

export const metadata: Metadata = {
  title: "NetSuite SuiteScript Development",
  description:
    "Custom SuiteScript 2.x development for NetSuite: User Event scripts, Client scripts, Scheduled scripts, Map/Reduce, and Suitelets built and tested in sandbox before touching production.",
  alternates: { canonical: "/netsuite-suitescript-development" },
};

const SCRIPT_TYPES = [
  { icon: Activity, title: "User Event Scripts", description: "Automatic logic that runs before or after a record is saved, validated, or loaded — for field defaults, validation rules, and cross-record updates." },
  { icon: MousePointerClick, title: "Client Scripts", description: "Real-time field-level logic directly on the data entry form: instant validation, conditional field visibility, and guided data entry." },
  { icon: Timer, title: "Scheduled Scripts", description: "Background jobs that run on a defined schedule — for recurring data tasks, batch updates, and automated maintenance processes." },
  { icon: Layers3, title: "Map/Reduce Scripts", description: "High-volume data processing without hitting governance limits, handling thousands of records reliably in background queues." },
  { icon: PanelsTopLeft, title: "Suitelets", description: "Custom pages and tools built directly inside NetSuite — internal portals, approval interfaces, and data entry tools outside the standard record model." },
  { icon: GitBranch, title: "RESTlets", description: "Custom API endpoints on your NetSuite account for integrating with external systems, webhooks, or custom data exchange." },
];

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
          subtitle="Custom scripts that extend NetSuite beyond what standard configuration can reach, built and tested in sandbox before touching your live account."
          align="left"
        />

        <div className="prose prose-blue mt-12 max-w-none prose-headings:font-semibold prose-headings:text-brand-900 prose-p:text-brand-400 prose-a:text-accent prose-a:no-underline hover:prose-a:underline prose-strong:text-brand-900">
          <h2>What SuiteScript actually covers</h2>
          <p>
            SuiteScript is NetSuite’s built-in JavaScript development platform. It lets you add
            custom logic that runs inside NetSuite itself, on the records and data your team
            already uses, without needing an external system or middleware layer. The right script
            in the right place can automate something that currently takes your team an hour,
            enforce a business rule that NetSuite’s native configuration can’t enforce, or build
            an entirely new workflow tailored to how your process actually works.
          </p>
          <p>
            SuiteScript 2.x (the current version) covers several distinct script types, each
            suited to a different kind of task. Most production accounts need a mix of them.
          </p>

          <h2>Script types we build</h2>
        </div>

        <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 gap-5">
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

        <div className="prose prose-blue mt-12 max-w-none prose-headings:font-semibold prose-headings:text-brand-900 prose-p:text-brand-400 prose-a:text-accent prose-a:no-underline hover:prose-a:underline prose-strong:text-brand-900">
          <h2>How we approach SuiteScript work</h2>
          <p>
            Every script is built and tested in a sandbox account before it touches production.
            We write against SuiteScript 2.1, use module-based patterns that survive NetSuite’s
            twice-yearly releases, and document what each script does and why, so the next
            developer who looks at it isn’t starting from scratch. If you already have scripts
            in your account that need to be debugged, refactored, or extended, that’s work we
            take on regularly as well.
          </p>
          <p>
            For a deeper look at how we write scripts that hold up over time, see our{" "}
            <Link href="/blog/suitescript-best-practices">SuiteScript best practices guide</Link>.
            If you're troubleshooting a live script, our guide to{" "}
            <Link href="/blog/netsuite-script-governance-limit">
              NetSuite governance limit errors
            </Link>{" "}
            covers every common cause and the architectural patterns that fix them permanently.
          </p>

          <h2>Who this is for</h2>
          <p>
            Companies already live on NetSuite that have hit the ceiling of what standard
            configuration can do, or inherited a customized account they don’t fully understand
            and need help extending or cleaning up. We don’t handle NetSuite implementations;
            see our{" "}
            <Link href="/netsuite-post-go-live-support">post-go-live support overview</Link> for
            context on where SuiteScript work typically fits. If you’re evaluating options,
            our{" "}
            <Link href="/hire-netsuite-developer">guide to hiring a NetSuite developer</Link>{" "}
            covers what to look for, what different engagement models cost, and what questions
            to ask before you commit.
          </p>
        </div>

        <ServiceFaqSection items={FAQ} />

        <div className="mt-14 pt-10 border-t border-brand-50 text-center">
          <p className="text-brand-900 font-semibold">Need a custom NetSuite script?</p>
          <p className="mt-2 text-sm text-brand-400">
            Tell us what you’re trying to automate or fix and we’ll scope it out.
          </p>
          <div className="mt-6">
            <Button href="/contact">Book a Free Consultation</Button>
          </div>
        </div>
      </div>
    </main>
  );
}

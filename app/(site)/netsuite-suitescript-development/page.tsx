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
    answer: "A focused script, a User Event for a validation rule, a Scheduled script for a recurring data update, typically takes one to two weeks from scoping to sandbox-tested delivery. We scope each project before starting so the timeline is agreed upfront.",
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
    answer: "We monitor the first production run, confirm the script is executing correctly in the execution log, and make any adjustments based on real production data. After that, scripts we build are on a month-to-month retainer, if something breaks or needs to be adjusted after a NetSuite release, we handle it.",
  },
];

export const metadata: Metadata = {
  title: "NetSuite SuiteScript Development",
  description:
    "Custom SuiteScript 2.x development for NetSuite: User Event scripts, Client scripts, Scheduled scripts, Map/Reduce, and Suitelets built and tested in sandbox before touching production.",
  alternates: { canonical: "/netsuite-suitescript-development" },
};

const SCRIPT_TYPES = [
  { icon: Activity, title: "User Event Scripts", description: "Automatic logic that runs before or after a record is saved, validated, or loaded, for field defaults, validation rules, and cross-record updates." },
  { icon: MousePointerClick, title: "Client Scripts", description: "Real-time field-level logic directly on the data entry form: instant validation, conditional field visibility, and guided data entry." },
  { icon: Timer, title: "Scheduled Scripts", description: "Background jobs that run on a defined schedule, for recurring data tasks, batch updates, and automated maintenance processes." },
  { icon: Layers3, title: "Map/Reduce Scripts", description: "High-volume data processing without hitting governance limits, handling thousands of records reliably in background queues." },
  { icon: PanelsTopLeft, title: "Suitelets", description: "Custom pages and tools built directly inside NetSuite, internal portals, approval interfaces, and data entry tools outside the standard record model." },
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
            If you&apos;re troubleshooting a live script, our guide to{" "}
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

          <h2>When you know you need a script</h2>
          <p>
            Standard NetSuite configuration covers a lot: workflows, saved searches, formula
            fields, approval routing, custom records. But there are consistent patterns where
            configuration runs out and a script becomes necessary:
          </p>
          <ul>
            <li>
              <strong>A business rule is being bypassed by imports or API saves.</strong> NetSuite
              workflows fire on all save paths, but their condition model has limits. A SuiteScript{" "}
              <code>beforeSubmit</code> function enforces a rule identically whether the save came
              from a user clicking Submit, a CSV import, a REST API call, or another script.
            </li>
            <li>
              <strong>A Scheduled Script is failing at production volume.</strong> A script that
              worked fine in sandbox with 200 records hits governance limits in production with
              8,000. Migrating to a Map/Reduce script handles the full volume with parallel
              processing, often completing in 5–10 minutes what was taking 45 minutes to fail.
            </li>
            <li>
              <strong>NetSuite needs to talk to another system.</strong> Pushing Sales Orders to a
              3PL, receiving webhook updates from a payment processor, syncing customer records
              to a CRM, these require RESTlets or Scheduled Scripts that call external APIs.
              There is no configuration path for this.
            </li>
            <li>
              <strong>A calculation is too complex for a formula field.</strong> Formula fields
              support SQL-style expressions, but anything requiring conditional logic across
              multiple records, dynamic lookups, or branching conditions needs a script.
            </li>
            <li>
              <strong>You need a custom interface inside NetSuite.</strong> Suitelets build fully
              custom pages that live inside NetSuite’s chrome, approval dashboards, data entry
              tools, admin utilities, without exposing data to external systems.
            </li>
          </ul>

          <h2>Common SuiteScript projects</h2>
          <p>These are representative examples of the kinds of work we build:</p>
          <ul>
            <li>
              <strong>Vendor bill validation</strong>, A <code>beforeSubmit</code> User Event
              script that checks a vendor bill against an approved PO before allowing it to post,
              enforcing a three-way match without modifying the approval workflow. Any discrepancy
              above a threshold blocks the save with a specific error message.
            </li>
            <li>
              <strong>Overnight inventory sync</strong>, A Map/Reduce script that runs nightly,
              reads inventory levels from a 3PL via their API, and updates item quantity fields in
              NetSuite. Handles 12,000+ SKUs in a single scheduled run.
            </li>
            <li>
              <strong>Project margin recalculation</strong>, A Scheduled Script that recalculates
              the margin on all open project records based on actual hours logged versus the
              original estimate, and flags projects where margin has fallen below the threshold.
            </li>
            <li>
              <strong>Custom PDF documents</strong>, Suitelets that generate branded output from
              NetSuite data, packing slips with QR codes, custom quote formats, certificate
              documents, pulling from custom records and standard transactions.
            </li>
            <li>
              <strong>Bulk field migration</strong>, A one-time Map/Reduce script to migrate
              data from a legacy custom field to a new structure across 20,000 records, running
              in a sandbox first to confirm the logic before touching production.
            </li>
          </ul>

          <h2>How the build process works</h2>
          <p>
            Every project follows the same structure regardless of size. The first step is a
            scoping call where we map the exact trigger (what event causes the script to run),
            the input (which records and fields), the output (what the script does), and the
            edge cases that need handling. Most scoping calls take 30–60 minutes and produce a
            written spec both sides agree on before a line of code is written.
          </p>
          <p>
            Development and testing happen entirely in a sandbox account. We test against the
            full range of cases, the expected path, boundary conditions, and the edge cases most
            likely to appear in production. Scripts are reviewed for governance efficiency before
            deployment: any loop containing a record load or search call gets restructured. Any
            script that touches a high-volume record type gets tested with production-scale data
            counts.
          </p>
          <p>
            Deployment to production is done in a scheduled maintenance window with a written
            rollback plan. After go-live, we monitor the first full execution cycle, for a
            Scheduled Script, that means the first overnight run; for a User Event, that means
            watching the execution log on the first batch of production record saves.
          </p>
          <p>
            Scripts are documented inline and with an external reference that covers: what the
            script does, which record type and entry points it’s deployed on, which fields it
            reads and writes, and the business rule it enforces. That documentation ships with
            the script so the next developer who looks at it doesn’t have to reverse-engineer
            the intent.
          </p>

          <h2>What to expect</h2>
          <p>
            A focused, single-purpose script, a validation rule, a scheduled data sync, a
            one-time migration, typically takes one to two weeks from scoping to production
            deployment. More complex projects with multiple script types, external API
            integrations, or large data migrations run two to four weeks depending on the number
            of edge cases and the external system’s API reliability.
          </p>
          <p>
            We work on a month-to-month basis, which means scripts we build are covered for
            adjustments if NetSuite’s twice-yearly release changes something, or if your business
            process changes and the script needs to adapt. No long-term contracts, no retainer
            minimums for small adjustments. For teams that want ongoing development capacity
            rather than project-by-project work, see our{" "}
            <Link href="/netsuite-post-go-live-support">managed support model</Link>.
          </p>
          <p>
            For the technical background on what makes SuiteScript projects succeed or fail
            at scale, our guide to{" "}
            <Link href="/blog/netsuite-map-reduce-script-guide">
              Map/Reduce script architecture
            </Link>{" "}
            covers the parallel processing model in detail, including the governance limits
            that apply at each stage and the design patterns that prevent limit failures.
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

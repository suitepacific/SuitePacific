import type { Metadata } from "next";
import Link from "next/link";
import { Code2, Workflow, BarChart2, FileText, Plug, Gauge, ShieldCheck, Headphones } from "lucide-react";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Card } from "@/components/ui/Card";
import { IconBadge } from "@/components/ui/IconBadge";
import { Button } from "@/components/ui/Button";
import { BreadcrumbJsonLd, FaqJsonLd } from "@/components/seo/JsonLd";
import { ServiceFaqSection } from "@/components/ui/ServiceFaqSection";
import { SITE_URL } from "@/lib/content";

const FAQ = [
  {
    question: "What's the difference between a NetSuite consulting firm and an implementation partner?",
    answer: "Implementation partners handle go-live projects: initial configuration, data migration, and training. Consulting firms like SuitePacific work with companies already live on NetSuite, handling the ongoing technical work that follows — custom scripts, automation, integrations, optimization, and support as the business grows and changes.",
  },
  {
    question: "Can you work alongside our internal NetSuite administrator?",
    answer: "Yes, and this is common. Internal admins handle day-to-day configuration and user questions. We handle the development work that requires SuiteScript, complex automation, or external integrations — the technical layer that goes beyond what configuration can reach.",
  },
  {
    question: "Do you work with companies that already have a managed services provider?",
    answer: "Yes. We take over accounts from other providers regularly, and we also work alongside existing support arrangements when the scope is defined clearly. Transitions involve a documented handoff of active customizations and known issues.",
  },
  {
    question: "How is consulting work scoped and priced?",
    answer: "Project work is scoped before anything is built — a brief spec that covers the trigger, the logic, the output, and the edge cases, agreed before work starts. Ongoing engagements work on a monthly retained hours model applied to whatever comes up. Both options are month-to-month with no long-term contract.",
  },
  {
    question: "Do you provide NetSuite training?",
    answer: "We focus on technical consulting rather than end-user training. Where we do train, it's developer-level: working with your internal technical team on how specific scripts or integrations are structured so they can maintain them independently.",
  },
  {
    question: "Which industries do you work with?",
    answer: "We work across industries — professional services, e-commerce, manufacturing, software, and non-profit. NetSuite's customization layer behaves the same regardless of vertical; the business rules change but the technical approach doesn't.",
  },
];

const SERVICES = [
  {
    icon: Code2,
    title: "SuiteScript Development",
    description: "Custom User Event, Scheduled, Map/Reduce, RESTlet, and Suitelet scripts for logic that standard NetSuite configuration cannot handle.",
    href: "/netsuite-suitescript-development",
  },
  {
    icon: Workflow,
    title: "Workflow Automation",
    description: "SuiteFlow approval workflows, status tracking, automated notifications, and business process automation without custom code where configuration is sufficient.",
    href: "/netsuite-workflow-automation",
  },
  {
    icon: Plug,
    title: "NetSuite Integrations",
    description: "Connecting NetSuite to external systems via RESTlets, scheduled sync scripts, and API integrations — e-commerce platforms, 3PLs, payment processors, and custom applications.",
    href: "/netsuite-integrations",
  },
  {
    icon: BarChart2,
    title: "Saved Searches & Dashboards",
    description: "Operational reporting, KPI dashboards, custom saved searches with formula fields, and SuiteAnalytics workbooks for finance, operations, and leadership teams.",
    href: "/netsuite-saved-searches-dashboards",
  },
  {
    icon: FileText,
    title: "Advanced PDF Templates",
    description: "Custom invoices, quotes, purchase orders, packing slips, and statements built with FreeMarker and conditional logic for consistent, branded document output.",
    href: "/netsuite-advanced-pdf-templates",
  },
  {
    icon: Gauge,
    title: "Account Optimization",
    description: "Performance diagnostics and cleanup for NetSuite accounts that have grown slow or fragile — governance limit fixes, script audits, workflow consolidation, and technical debt reduction.",
    href: "/netsuite-account-optimization",
  },
  {
    icon: ShieldCheck,
    title: "Administrator Support",
    description: "Ongoing administration for accounts without a dedicated internal NetSuite admin — role management, configuration changes, period close, and platform-level troubleshooting.",
    href: "/netsuite-administrator-support",
  },
  {
    icon: Headphones,
    title: "Post-Go-Live Support",
    description: "Continuous technical support after implementation — a dedicated team for new development, fixes, and account upkeep on a month-to-month basis.",
    href: "/netsuite-post-go-live-support",
  },
];

export const metadata: Metadata = {
  title: "NetSuite Consulting Services",
  description:
    "NetSuite consulting services for post-go-live companies: SuiteScript development, workflow automation, integrations, reporting, and ongoing technical support — no long-term contracts.",
  alternates: { canonical: "/netsuite-consulting-services" },
};

export default function NetSuiteConsultingServicesPage() {
  return (
    <main className="pt-32 pb-24 sm:pt-40 sm:pb-32">
      <BreadcrumbJsonLd
        items={[
          { name: "Home", url: SITE_URL },
          { name: "NetSuite Consulting Services", url: `${SITE_URL}/netsuite-consulting-services` },
        ]}
      />
      <FaqJsonLd items={FAQ} />

      <div className="mx-auto max-w-3xl px-6 lg:px-8">
        <SectionHeading
          as="h1"
          eyebrow="NetSuite Consulting"
          title="NetSuite Consulting Services"
          subtitle="Technical consulting for companies already live on NetSuite — development, automation, integrations, and ongoing support from a team that works exclusively in the NetSuite ecosystem."
          align="left"
        />

        <div className="prose prose-blue mt-12 max-w-none prose-headings:font-semibold prose-headings:text-brand-900 prose-p:text-brand-400 prose-a:text-accent prose-a:no-underline hover:prose-a:underline prose-strong:text-brand-900">
          <h2>What NetSuite consulting covers</h2>
          <p>
            NetSuite consulting is the technical work that happens after go-live: the customizations
            your implementation partner didn&apos;t build, the automation that accounting has been
            requesting for two years, the integration with your new e-commerce platform, the script
            that breaks every time someone imports records via CSV. It&apos;s the layer between what
            NetSuite does out of the box and what your business actually needs it to do.
          </p>
          <p>
            Implementation partners are scoped for go-live. They get the account configured, data
            migrated, and your team trained. Once that engagement closes, the ongoing technical
            work falls to whoever you have next. For most companies, that&apos;s either an internal
            admin without scripting depth, a previous implementation partner that&apos;s moved to a
            different project, or nobody at all. That gap is where a consulting firm fits.
          </p>

          <h2>Services</h2>
        </div>

        <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 gap-5">
          {SERVICES.map((service) => (
            <Link key={service.href} href={service.href} className="group">
              <Card className="p-5 flex items-start gap-4 h-full group-hover:border-brand-200 transition-colors">
                <IconBadge icon={service.icon} />
                <div>
                  <h3 className="font-semibold text-brand-900 text-sm group-hover:text-accent transition-colors">
                    {service.title}
                  </h3>
                  <p className="mt-1.5 text-sm text-brand-400">{service.description}</p>
                </div>
              </Card>
            </Link>
          ))}
        </div>

        <div className="prose prose-blue mt-12 max-w-none prose-headings:font-semibold prose-headings:text-brand-900 prose-p:text-brand-400 prose-a:text-accent prose-a:no-underline hover:prose-a:underline prose-strong:text-brand-900">
          <h2>Who this is for</h2>
          <p>
            Companies that went live on NetSuite — recently or years ago — and need technical
            development and support that their internal team can&apos;t handle alone. The typical
            situation is some combination of: a customization backlog that&apos;s grown faster than
            capacity to address it, scripts or workflows from a prior developer that nobody
            currently understands, a new business requirement (a new product line, an acquisition,
            a new sales channel) that requires NetSuite changes, or a performance or reliability
            problem that&apos;s been tolerated too long.
          </p>
          <p>
            If you haven&apos;t gone live yet and are looking for an implementation partner,
            that&apos;s a different engagement — we don&apos;t handle initial implementations.
            See our comparison of{" "}
            <Link href="/netsuite-implementation-partner-vs-managed-support">
              implementation partners vs. managed support
            </Link>{" "}
            for context on which type of engagement fits where you are.
          </p>

          <h2>How engagements work</h2>
          <p>
            Project work — a specific script, integration, or automation build — is scoped
            before anything starts. We agree on a written spec that covers the logic, the
            trigger, the edge cases, and the expected output. Work happens in sandbox first.
            After sandbox-testing and any adjustments, the deliverable is deployed to production
            with monitoring during the first execution cycle.
          </p>
          <p>
            Ongoing support engagements work on a monthly retained hours model: a block of hours
            each month applied to whatever work comes up — new development requests, fixes from
            NetSuite&apos;s twice-yearly releases, questions from your team, or account
            optimization work. Most clients mix both: project work for defined builds, ongoing
            support for everything else. Both are month-to-month with no minimum commitment.
          </p>
          <p>
            We work exclusively in NetSuite. Every project is sandbox-tested, every script is
            documented, and no release-cycle surprise should catch us off guard. For a more
            detailed look at what technical NetSuite engagement looks like in practice, see our{" "}
            <Link href="/hire-netsuite-developer">guide to hiring a NetSuite developer</Link> —
            it covers the right questions to ask any technical NetSuite partner before committing.
          </p>

          <h2>What sets a specialist apart from a generalist</h2>
          <p>
            NetSuite has a deep API surface, a specific governance model, a release cycle that
            introduces changes twice a year, and a scripting environment with its own quirks
            distinct from standard JavaScript. A developer who writes JavaScript but has never
            worked in NetSuite will encounter all of that friction on your account, at your
            expense. A specialist has already solved the common problems: governance limit
            failures, script deployment conflicts, workflow execution order, the behavioral
            differences between the sandbox and production environments.
          </p>
          <p>
            We work exclusively in the NetSuite ecosystem — no other platforms, no generalist
            web development. The technical depth we maintain is specific to the environment your
            business depends on. For an independent look at the SuiteScript techniques we apply,
            our{" "}
            <Link href="/blog/netsuite-map-reduce-script-guide">Map/Reduce scripting guide</Link>{" "}
            and{" "}
            <Link href="/blog/suitescript-best-practices">SuiteScript best practices</Link>{" "}
            give a detailed picture of how we approach technical problems.
          </p>
        </div>

        <ServiceFaqSection items={FAQ} />

        <div className="mt-14 pt-10 border-t border-brand-50 text-center">
          <p className="text-brand-900 font-semibold">Need a NetSuite consulting team?</p>
          <p className="mt-2 text-sm text-brand-400">
            Tell us what you&apos;re working with and what you need — we&apos;ll let you know
            exactly how we can help.
          </p>
          <div className="mt-6">
            <Button href="/contact">Book a Free Consultation</Button>
          </div>
        </div>
      </div>
    </main>
  );
}

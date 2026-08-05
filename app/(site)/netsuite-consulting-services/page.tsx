import type { Metadata } from "next";
import Link from "next/link";
import {
  Code2,
  Workflow,
  BarChart2,
  FileText,
  Plug,
  Gauge,
  ShieldCheck,
  Headphones,
} from "lucide-react";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Card } from "@/components/ui/Card";
import { IconBadge } from "@/components/ui/IconBadge";
import { Button } from "@/components/ui/Button";
import { BreadcrumbJsonLd, FaqJsonLd } from "@/components/seo/JsonLd";
import { ServiceFaqSection } from "@/components/ui/ServiceFaqSection";
import { LeadForm } from "@/components/sections/LeadForm";
import { SITE_URL } from "@/lib/content";

const FAQ = [
  {
    question: "What is the difference between a NetSuite consulting firm and an implementation partner?",
    answer:
      "Implementation partners handle go-live projects: initial configuration, data migration, and training. Consulting firms like SuitePacific work with companies already live on NetSuite, handling the ongoing technical work that follows: custom scripts, automation, integrations, optimization, and support as the business grows and changes.",
  },
  {
    question: "Can you work alongside our internal NetSuite administrator?",
    answer:
      "Yes, and this is common. Internal admins handle day-to-day configuration and user questions. We handle the development work that requires SuiteScript, complex automation, or external integrations: the technical layer that goes beyond what configuration can reach.",
  },
  {
    question: "Do you work with companies that already have a managed services provider?",
    answer:
      "Yes. We take over accounts from other providers regularly, and we also work alongside existing support arrangements when the scope is defined clearly. Transitions involve a documented handoff of active customizations and known issues.",
  },
  {
    question: "How is consulting work scoped and priced?",
    answer:
      "Project work is scoped before anything is built: a brief spec covering the trigger, the logic, the output, and the edge cases, agreed before work starts. Ongoing engagements work on a monthly retained hours model applied to whatever comes up. Both options are month-to-month with no long-term contract.",
  },
  {
    question: "Can you take over scripts and automations built by a previous developer?",
    answer:
      "Yes, and this is one of the most common starting points. We review the existing code, document what it does, identify any issues, and take ownership of ongoing maintenance and improvements. We read the account first; you do not need to brief us on the full history before work can begin.",
  },
  {
    question: "Which industries do you work with?",
    answer:
      "We work across industries: professional services, e-commerce, manufacturing, software, and non-profit. NetSuite's customization layer behaves the same regardless of vertical; the business rules change but the technical approach does not.",
  },
];

const SERVICES = [
  {
    icon: Code2,
    title: "SuiteScript Development",
    description:
      "Custom User Event, Scheduled, Map/Reduce, RESTlet, and Suitelet scripts for logic that standard NetSuite configuration cannot handle.",
    href: "/netsuite-suitescript-development",
  },
  {
    icon: Workflow,
    title: "Workflow Automation",
    description:
      "SuiteFlow approval workflows, status tracking, automated notifications, and business process automation without custom code where configuration is sufficient.",
    href: "/netsuite-workflow-automation",
  },
  {
    icon: Plug,
    title: "NetSuite Integrations",
    description:
      "Connecting NetSuite to external systems via RESTlets, scheduled sync scripts, and API integrations: e-commerce platforms, 3PLs, payment processors, and custom applications.",
    href: "/netsuite-integrations",
  },
  {
    icon: BarChart2,
    title: "Saved Searches & Dashboards",
    description:
      "Operational reporting, KPI dashboards, custom saved searches with formula fields, and SuiteAnalytics workbooks for finance, operations, and leadership teams.",
    href: "/netsuite-saved-searches-dashboards",
  },
  {
    icon: FileText,
    title: "Advanced PDF Templates",
    description:
      "Custom invoices, quotes, purchase orders, packing slips, and statements built with FreeMarker and conditional logic for consistent, branded document output.",
    href: "/netsuite-advanced-pdf-templates",
  },
  {
    icon: Gauge,
    title: "Account Optimization",
    description:
      "Performance diagnostics and cleanup for NetSuite accounts that have grown slow or fragile: governance limit fixes, script audits, workflow consolidation, and technical debt reduction.",
    href: "/netsuite-account-optimization",
  },
  {
    icon: ShieldCheck,
    title: "Administrator Support",
    description:
      "Ongoing administration for accounts without a dedicated internal NetSuite admin: role management, configuration changes, period close, and platform-level troubleshooting.",
    href: "/netsuite-administrator-support",
  },
  {
    icon: Headphones,
    title: "Post-Go-Live Support",
    description:
      "Continuous technical support after implementation: a dedicated team for new development, fixes, and account upkeep on a month-to-month basis.",
    href: "/netsuite-post-go-live-support",
  },
];

const HOW_IT_WORKS = [
  {
    step: "01",
    title: "Scoped before anything is built",
    description:
      "Project work starts with a written spec: the trigger, the logic, the edge cases, and the expected output. Agreed before development starts. No surprises on scope.",
  },
  {
    step: "02",
    title: "Sandbox-first, always",
    description:
      "Everything is built and tested in your Sandbox environment using real record types and representative data. If something will break, it breaks in Sandbox, not in Production.",
  },
  {
    step: "03",
    title: "Production on your schedule",
    description:
      "Changes go live outside your peak business hours. For ongoing engagements, new requests build on prior work without re-discovery or getting a new developer up to speed.",
  },
];

const WHO_ITS_FOR = [
  "A customization backlog that has grown faster than the capacity to address it",
  "Scripts or workflows from a prior developer that nobody currently understands",
  "A new business requirement (new product line, acquisition, new sales channel) that needs NetSuite changes",
  "A performance or reliability problem that has been tolerated too long",
  "An implementation partner whose scope ended at go-live and is no longer available",
];

export const metadata: Metadata = {
  title: "NetSuite Consulting Services",
  description:
    "NetSuite consulting services for post-go-live companies: SuiteScript development, workflow automation, integrations, reporting, and ongoing technical support. No long-term contracts.",
  alternates: { canonical: "/netsuite-consulting-services" },
  openGraph: {
    title: "NetSuite Consulting Services",
    description: "NetSuite consulting services for post-go-live companies: SuiteScript development, workflow automation, integrations, reporting, and ongoing technical support. No long-term contracts.",
    url: "https://suitepacific.com/netsuite-consulting-services",
    type: "website",
  },
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
          subtitle="Technical consulting for companies already live on NetSuite: development, automation, integrations, and ongoing support from a team that works exclusively in the NetSuite ecosystem."
          align="left"
        />

        <p className="mt-6 text-sm text-brand-400">
          Implementation partners get you to go-live. Once that engagement closes, the ongoing
          technical work (new customizations, integrations, automation, fixes) needs a different
          kind of partner. That is where a consulting firm fits.
        </p>

        <div className="mt-6">
          <Button href="/contact">Book a Free Consultation</Button>
        </div>

        {/* Services grid */}
        <div className="mt-14" data-section="services">
          <h2 className="text-lg font-semibold text-brand-900 mb-6">Services</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
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
        </div>

        {/* How it works */}
        <div className="mt-14" data-section="how-it-works">
          <h2 className="text-lg font-semibold text-brand-900 mb-6">How engagements work</h2>
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
            Most clients mix both models: project work for defined builds, ongoing retained hours
            for everything else. Both are month-to-month with no minimum commitment.
          </p>
        </div>

        {/* Who this is for */}
        <div className="mt-14" data-section="who-its-for">
          <h2 className="text-lg font-semibold text-brand-900 mb-4">Who this is for</h2>
          <p className="text-sm text-brand-400 mb-5">
            Companies that went live on NetSuite and need technical work their internal team
            cannot handle alone. The typical situation is some combination of:
          </p>
          <ul className="space-y-3">
            {WHO_ITS_FOR.map((item) => (
              <li key={item} className="flex items-start gap-3 text-sm text-brand-600">
                <span className="h-1.5 w-1.5 rounded-full bg-accent shrink-0 mt-2" />
                {item}
              </li>
            ))}
          </ul>
          <p className="mt-5 text-sm text-brand-400">
            If you have not gone live yet and are looking for an implementation partner, that is a
            different engagement; we do not handle initial implementations. See our{" "}
            <Link href="/netsuite-implementation-partner-vs-managed-support" className="text-accent hover:underline">
              implementation partner vs. managed support guide
            </Link>{" "}
            for context.
          </p>
        </div>

        {/* Specialist advantage */}
        <div className="mt-14 rounded-2xl border border-brand-100 bg-brand-50/30 p-5 sm:p-6" data-section="specialist-advantage">
          <h2 className="font-semibold text-brand-900 text-base mb-3">
            What a NetSuite specialist brings that a generalist does not
          </h2>
          <p className="text-sm text-brand-400">
            NetSuite has a deep API surface, a governance model, a twice-yearly release cycle that
            introduces platform changes, and a scripting environment with its own behavior distinct
            from standard JavaScript. A developer encountering all of that for the first time does
            so at your expense. A specialist has already solved the common problems: governance
            limit failures, script deployment conflicts, workflow execution order, the behavioral
            differences between Sandbox and Production. We work exclusively in NetSuite. No other
            platforms, no generalist web development.
          </p>
        </div>

        <ServiceFaqSection items={FAQ} />

        {/* Inline form */}
        <div className="mt-14 pt-10 border-t border-brand-50" data-section="contact">
          <p className="text-brand-900 font-semibold text-lg">Need a NetSuite consulting team?</p>
          <p className="mt-2 text-sm text-brand-400">
            Tell us what you are working with and what you need. We will let you know exactly how
            we can help.
          </p>
          <div className="mt-6 rounded-2xl border border-brand-100 bg-white p-6 sm:p-8 shadow-soft">
            <LeadForm />
          </div>
        </div>
      </div>
    </main>
  );
}

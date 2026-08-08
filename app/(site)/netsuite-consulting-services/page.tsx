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
  AlertCircle,
  RefreshCcw,
  Wrench,
  Users,
  Award,
} from "lucide-react";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Card } from "@/components/ui/Card";
import { IconBadge } from "@/components/ui/IconBadge";
import { BreadcrumbJsonLd, FaqJsonLd, ServiceJsonLd } from "@/components/seo/JsonLd";
import { ServiceFaqSection } from "@/components/ui/ServiceFaqSection";
import { LeadFormLight } from "@/components/sections/LeadFormLight";
import { SITE_URL } from "@/lib/content";

const PAIN_POINTS = [
  {
    icon: AlertCircle,
    title: "Your implementation partner's scope ended at go-live.",
    description:
      "The team that built your account was scoped for go-live only. Ongoing development, fixes, and new customizations after that were never part of the engagement.",
  },
  {
    icon: RefreshCcw,
    title: "Technical work is piling up with nowhere to go.",
    description:
      "Scripts need updating, automations need building, old customizations nobody understands are breaking. Without a dedicated technical team, the backlog grows.",
  },
  {
    icon: Wrench,
    title: "A generalist is not a substitute for a specialist.",
    description:
      "NetSuite has its own governance model, a twice-yearly release cycle, and a scripting environment unlike standard JavaScript. A developer learning it does so at your expense.",
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

const WHY_SP = [
  {
    icon: ShieldCheck,
    title: "NetSuite-Certified",
    description:
      "NetSuite SuiteCloud Developer II and Administrator Professional certifications. Verified technical credentials, not self-declared experience.",
  },
  {
    icon: Users,
    title: "Direct Access",
    description:
      "You communicate directly with the person doing the work. No ticket system, no account manager as an intermediary.",
  },
  {
    icon: RefreshCcw,
    title: "Context Retained",
    description:
      "We maintain ongoing knowledge of your account. Each request builds on the last without re-discovery or briefing a new developer.",
  },
  {
    icon: Award,
    title: "NetSuite-Only Focus",
    description:
      "We work exclusively in NetSuite. No other platforms, no generalist web development. Every hour goes into solving NetSuite problems.",
  },
];

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
      "SuitePacific offers three engagement models: dedicated monthly support (hours applied to whatever comes up each month), on-demand access for occasional requests without a monthly commitment, and project-based engagements for defined builds with an agreed scope and deliverable. All are month-to-month with no long-term contract.",
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

export const metadata: Metadata = {
  title: "NetSuite Consulting Services",
  description:
    "NetSuite consulting for post-go-live companies: SuiteScript development, workflow automation, integrations, reporting, and ongoing technical support.",
  alternates: { canonical: "/netsuite-consulting-services" },
  openGraph: {
    title: "NetSuite Consulting Services",
    description: "NetSuite consulting for post-go-live companies: SuiteScript development, workflow automation, integrations, reporting, and ongoing technical support.",
    url: "https://suitepacific.com/netsuite-consulting-services",
    type: "website",
    images: [{ url: "https://suitepacific.com/og-default.png", width: 1200, height: 630 }],
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
      <ServiceJsonLd
        name="NetSuite Consulting Services"
        description="End-to-end NetSuite consulting for post-go-live customization, integration, and optimization."
        url={`${SITE_URL}/netsuite-consulting-services`}
        serviceType="NetSuite Consulting"
      />

      <div className="mx-auto max-w-3xl px-6 lg:px-8">
        <SectionHeading
          as="h1"
          eyebrow="NetSuite Consulting"
          title="NetSuite Consulting Services"
          subtitle="Technical consulting for companies already live on NetSuite: development, automation, integrations, and ongoing support from a team that works exclusively in the NetSuite ecosystem."
          align="left"
        />

        <div className="mt-6 rounded-2xl border border-brand-100 bg-white p-5 shadow-soft">
          <LeadFormLight />
        </div>
        <p className="mt-3 text-xs text-brand-400">NetSuite-certified · Sandbox-first · Direct access, no ticket system · Month-to-month</p>

        <p className="mt-6 text-sm text-brand-400">
          Implementation partners get you to go-live. Once that engagement closes, the ongoing
          technical work (new customizations, integrations, automation, fixes) needs a different
          kind of partner. SuitePacific is that firm. We work exclusively with companies already
          live on NetSuite, handling the ongoing technical work that continues after implementation.
        </p>

        {/* Pain points */}
        <div className="mt-14" data-section="pain-points">
          <h2 className="text-lg font-semibold text-brand-900 mb-6">
            The situation post-go-live companies are in
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
            {PAIN_POINTS.map((item) => (
              <Card key={item.title} className="p-5 flex flex-col gap-3">
                <IconBadge icon={item.icon} />
                <h3 className="font-semibold text-brand-900 text-sm">{item.title}</h3>
                <p className="text-sm text-brand-400">{item.description}</p>
              </Card>
            ))}
          </div>
          <p className="mt-5 text-sm text-brand-400">
            Not live yet? See our{" "}
            <Link href="/netsuite-implementation-partner-vs-managed-support" className="text-accent hover:underline">
              implementation partner vs. managed support guide
            </Link>
            {" "}instead.
          </p>
        </div>

        {/* What we handle */}
        <div className="mt-14" data-section="services">
          <h2 className="text-lg font-semibold text-brand-900 mb-6">What we handle</h2>
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
            Most clients mix models: dedicated monthly support for ongoing work, project-based for defined builds, and on-demand for occasional requests. All are month-to-month with no minimum commitment.
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

        <ServiceFaqSection items={FAQ} />
      </div>
    </main>
  );
}

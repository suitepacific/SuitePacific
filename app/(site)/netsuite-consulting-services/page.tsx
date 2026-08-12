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
import { BreadcrumbJsonLd, FaqJsonLd, ServiceJsonLd, OrganizationJsonLd, VideoObjectJsonLd } from "@/components/seo/JsonLd";
import { ServiceFaqSection } from "@/components/ui/ServiceFaqSection";
import { LeadFormLight } from "@/components/sections/LeadFormLight";
import { LeadForm } from "@/components/sections/LeadForm";
import { SITE_URL } from "@/lib/content";

const COMPARISON = [
  { capability: "Ongoing SuiteScript development", typical: "Separate engagement required; no dedicated resource after go-live", withSP: "Covered in monthly or project-based scope without a new SOW per request" },
  { capability: "Workflow automation updates", typical: "Re-engagement with original implementation partner or new contractor", withSP: "Handled within ongoing engagement; no new statement of work required" },
  { capability: "Integration maintenance", typical: "Depends on original integration vendor; no single point of ownership", withSP: "Maintained by the same team handling scripts and administration work" },
  { capability: "Account context retention", typical: "Re-discovery required with each new developer or ticket submission", withSP: "Documented account knowledge maintained and carried forward across all requests" },
  { capability: "NetSuite release readiness", typical: "Reactive, after issues appear in Production following release", withSP: "Proactive Sandbox review before each bi-annual platform release" },
  { capability: "Response time", typical: "Queued behind implementation projects at larger firms", withSP: "Dedicated access; no shared ticket queue across unrelated clients" },
];

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
  {
    question: "What types of SuiteScript scripts do you develop?",
    answer:
      "User Event, Scheduled, Map/Reduce, RESTlet, Client, and Suitelet scripts. The type depends on when the logic runs and how it is triggered. User Event scripts attach to record saves; Scheduled scripts run on a timer or as a background process; Map/Reduce handles large data sets; RESTlets expose NetSuite data to external systems; Suitelets build custom pages inside NetSuite. Most accounts use several of these running simultaneously.",
  },
  {
    question: "How do you handle NetSuite's twice-yearly release cycle?",
    answer:
      "Before each release, we review the release notes and test account-specific customizations in Sandbox against the Preview environment NetSuite provides. Most SuiteScript 2.x code survives releases without changes, but workflow dependencies and UI components occasionally need attention. We proactively flag anything that requires action before the release goes to Production.",
  },
  {
    question: "Do you work with OneWorld configurations and multi-subsidiary accounts?",
    answer:
      "Yes. OneWorld configurations introduce intercompany transaction logic, consolidated reporting, and multi-currency complexity that standard single-entity accounts do not have. We work with both single-entity and OneWorld accounts and handle subsidiary-specific customizations and intercompany automation.",
  },
  {
    question: "Can you build integrations with platforms like Shopify, Salesforce, or Workday?",
    answer:
      "Yes. We build integrations using RESTlets, scheduled scripts, and RESTful API calls. Common integrations include Shopify order sync, Salesforce opportunity-to-order handoff, payment processor reconciliation, and 3PL fulfillment feeds. The approach depends on what APIs the external system exposes and the data volume involved.",
  },
  {
    question: "How long does it take to get started?",
    answer:
      "Most engagements begin within one to two weeks of agreement. The onboarding process involves reviewing your account's existing scripts, workflows, and integrations, identifying the highest-priority items, and agreeing on initial scope. For companies with urgent issues, we can prioritize an account review and immediate fixes within the first week.",
  },
  {
    question: "What makes NetSuite development different from standard software development?",
    answer:
      "NetSuite uses SuiteScript, a JavaScript-based API that runs inside the NetSuite platform rather than on a separate server. Governance limits control how many database operations a script can execute per run. Record types, field IDs, and transaction structures are NetSuite-specific. Debugging requires understanding SuiteLog and the Script Deployment record. These details take time to learn, which is why companies typically find that a generalist developer working in NetSuite for the first time costs significantly more than their hourly rate suggests.",
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
        description="NetSuite consulting for post-go-live companies: SuiteScript 2.x development (User Event, Scheduled, Map/Reduce, RESTlet, Suitelet), SuiteFlow workflow automation, RESTlet and API integrations, saved search and SuiteAnalytics reporting, advanced FreeMarker PDF templates, account performance optimization, and administration. Month-to-month engagements, sandbox-first, by Oracle NetSuite SuiteCloud Developer II and Administrator Professional certified developers."
        url={`${SITE_URL}/netsuite-consulting-services`}
        serviceType="NetSuite Consulting"
      />
      <OrganizationJsonLd />
      <VideoObjectJsonLd
        name="SuitePacific Introduction: NetSuite Post-Go-Live Support and Consulting"
        description="An introduction to SuitePacific, a boutique NetSuite consulting firm providing post-go-live support, SuiteScript development, workflow automation, integrations, and ongoing technical services for companies already live on NetSuite."
        videoId="IQvWN_yZ24A"
        uploadDate="2026-08-12"
        isShort
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
        <p className="mt-2 text-xs text-brand-300"><time dateTime="2026-08">Published August 2026</time></p>

        <p className="mt-6 text-sm text-brand-400">
          Companies that go live on NetSuite with an implementation partner typically discover
          within six months that the technical work does not stop at go-live: SuiteScript
          customizations need building, automations need updating, integrations need maintaining,
          and the account needs to keep pace as the business changes. Implementation partners are
          scoped for go-live delivery, not for what follows. SuitePacific provides the ongoing
          technical layer for companies already live on NetSuite, covering SuiteScript development,
          workflow automation, external integrations, saved search and dashboard work, advanced PDF
          templates, account optimization, and ongoing administration. Every engagement is scoped
          before development begins and operates sandbox-first, with changes tested against
          representative data before reaching Production. Work is handled by NetSuite SuiteCloud
          Developer II and Administrator Professional certified developers. Engagements are
          month-to-month with no long-term contract requirement, and clients work directly with the
          person doing the development.
        </p>

        {/* Intro video */}
        <div className="mt-8 rounded-2xl border border-brand-100 bg-brand-50/30 p-5" data-section="intro-video">
          <div className="flex flex-col sm:flex-row gap-5 items-start">
            <a
              href="https://www.youtube.com/shorts/IQvWN_yZ24A"
              target="_blank"
              rel="noopener noreferrer"
              className="group relative w-full sm:w-44 shrink-0 overflow-hidden rounded-xl"
              style={{ aspectRatio: "16/9" }}
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="https://i.ytimg.com/vi/IQvWN_yZ24A/hqdefault.jpg"
                alt="SuitePacific introduction video"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 flex items-center justify-center bg-black/25 group-hover:bg-black/35 transition-colors">
                <div className="w-10 h-10 rounded-full bg-white/90 flex items-center justify-center shadow-md">
                  <svg className="w-4 h-4 ml-0.5 text-gray-900" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M8 5v14l11-7z" />
                  </svg>
                </div>
              </div>
            </a>
            <div>
              <p className="text-sm font-semibold text-brand-900">About SuitePacific</p>
              <p className="mt-2 text-sm text-brand-400">
                A short overview of what SuitePacific does, who we work with, and how a post-go-live
                NetSuite consulting engagement works in practice.
              </p>
            </div>
          </div>
        </div>

        {/* Comparison */}
        <div className="mt-10 overflow-x-auto" data-section="comparison">
          <table className="w-full text-sm border-collapse">
            <thead>
              <tr className="border-b border-brand-100">
                <th className="py-2.5 pr-4 text-left text-xs font-semibold text-brand-900 w-1/3">Capability</th>
                <th className="py-2.5 pr-4 text-left text-xs font-semibold text-brand-900 w-1/3">Typical post-go-live gap</th>
                <th className="py-2.5 text-left text-xs font-semibold text-brand-900 w-1/3">With SuitePacific</th>
              </tr>
            </thead>
            <tbody>
              {COMPARISON.map((row) => (
                <tr key={row.capability} className="border-b border-brand-50">
                  <td className="py-2.5 pr-4 font-medium text-brand-900 text-xs align-top">{row.capability}</td>
                  <td className="py-2.5 pr-4 text-brand-400 text-xs align-top">{row.typical}</td>
                  <td className="py-2.5 text-brand-700 text-xs align-top">{row.withSP}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Pain points */}
        <div className="mt-14" data-section="pain-points">
          <h2 className="text-lg font-semibold text-brand-900 mb-6">
            What situation do post-go-live companies typically find themselves in?
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
          <h2 className="text-lg font-semibold text-brand-900 mb-6">What NetSuite work does SuitePacific handle?</h2>
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
          <h2 className="text-lg font-semibold text-brand-900 mb-6">How does a SuitePacific consulting engagement work?</h2>
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
          <h2 className="text-lg font-semibold text-brand-900 mb-6">Why do companies choose SuitePacific for NetSuite consulting?</h2>
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

        {/* Industries */}
        <div className="mt-14" data-section="industries">
          <h2 className="text-lg font-semibold text-brand-900 mb-2">Which industries does SuitePacific provide NetSuite consulting for?</h2>
          <p className="text-sm text-brand-400 mb-6">
            We provide NetSuite consulting across verticals. Each industry page covers the specific challenges,
            customizations, and support patterns relevant to that sector.
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {[
              { label: "Manufacturing", href: "/industries/manufacturing", desc: "BOM logic, work order automation, production reporting" },
              { label: "Wholesale & Distribution", href: "/industries/wholesale-distribution", desc: "Customer pricing, fulfillment routing, EDI integrations" },
              { label: "Construction", href: "/industries/construction", desc: "Job costing, change orders, progress billing" },
              { label: "Real Estate", href: "/industries/real-estate", desc: "Property reporting, CapEx approvals, lease tracking" },
              { label: "SaaS & Technology", href: "/industries/saas-technology", desc: "Subscription billing, ARR/MRR reporting, CRM sync" },
              { label: "Retail & E-commerce", href: "/industries/retail-ecommerce", desc: "Channel orders, returns automation, inventory dashboards" },
              { label: "Professional Services", href: "/industries/professional-services", desc: "Project billing, timesheet workflows, utilization reporting" },
            ].map((item) => (
              <Link key={item.href} href={item.href} className="group flex items-start gap-3 rounded-xl border border-brand-100 bg-white p-4 shadow-soft hover:border-brand-200 transition-colors">
                <div>
                  <p className="font-semibold text-brand-900 text-sm group-hover:text-accent transition-colors">{item.label}</p>
                  <p className="mt-1 text-xs text-brand-400">{item.desc}</p>
                </div>
              </Link>
            ))}
          </div>
        </div>

        <ServiceFaqSection items={FAQ} />

        <div id="contact" className="mt-14 pt-10 border-t border-brand-50">
          <LeadForm />
        </div>
      </div>
    </main>
  );
}

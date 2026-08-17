import type { Metadata } from "next";
import Link from "next/link";
import {
  Code2,
  Workflow,
  LayoutDashboard,
  Plug,
  Gauge,
  ShieldCheck,
  AlertCircle,
  RefreshCcw,
  Wrench,
  Users,
  Award,
  CheckCircle2,
} from "lucide-react";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Card } from "@/components/ui/Card";
import { IconBadge } from "@/components/ui/IconBadge";
import { BreadcrumbJsonLd, FaqJsonLd, ServiceJsonLd, OrganizationJsonLd, VideoObjectJsonLd } from "@/components/seo/JsonLd";
import { ServiceFaqSection } from "@/components/ui/ServiceFaqSection";
import { LeadFormLight } from "@/components/sections/LeadFormLight";
import { LeadForm } from "@/components/sections/LeadForm";
import { SITE_URL } from "@/lib/content";

const SUPPORT_PHASES = [
  {
    phase: "01",
    name: "Stabilization",
    timeline: "Days 1-30",
    focus: "Account orientation and priority issue resolution",
    items: [
      "Read existing scripts, workflows, and integrations before changing anything",
      "Diagnose and resolve the highest-priority open issues",
      "Document account configuration, known risks, and in-progress work",
      "Establish communication process and request workflow",
    ],
  },
  {
    phase: "02",
    name: "Optimization",
    timeline: "Days 31-90",
    focus: "Backlog clearance and proactive improvements",
    items: [
      "Work through accumulated development backlog in priority order",
      "Proactive Sandbox review ahead of the next NetSuite release",
      "Performance improvements for slow pages, searches, and scripts",
      "Integration health check across connected systems",
    ],
  },
  {
    phase: "03",
    name: "Ongoing",
    timeline: "Day 91+",
    focus: "New development as the account and business evolve",
    items: [
      "New development requests handled as they arise; no new SOW required",
      "Pre-release regression testing in Sandbox before each bi-annual NetSuite update",
      "Proactive flagging of issues before they surface in Production",
      "Account grows with the business rather than accumulating technical debt",
    ],
  },
];

const SLA_LEVELS = [
  {
    severity: "Critical",
    example: "Production outage or data integrity failure affecting live operations",
    response: "Same day",
    action: "All other work paused; immediate diagnosis, Sandbox fix, and Production deployment",
  },
  {
    severity: "High",
    example: "Script failure or workflow breaking a key business process",
    response: "Next business day",
    action: "Prioritized over queued development; Sandbox fix and deployment within the week",
  },
  {
    severity: "Standard",
    example: "New development request, configuration change, or reporting update",
    response: "Within the week",
    action: "Added to active queue; Sandbox development and scheduled Production deployment",
  },
  {
    severity: "Advisory",
    example: "Question about feature behavior or best-practice guidance",
    response: "Within 24 hours",
    action: "Direct answer logged for account context; no ticket overhead",
  },
];

const COMPARISON = [
  { capability: "SuiteScript development", typical: "Internal hire or ad-hoc contractor with no account context", withSP: "NetSuite SuiteCloud Developer II certified; account context maintained across every engagement" },
  { capability: "Workflow automation updates", typical: "New SOW with implementation partner or internal admin workaround", withSP: "Handled in ongoing engagement without a new statement of work per request" },
  { capability: "Integration maintenance", typical: "Original vendor support or new developer learning the system", withSP: "Same team maintains scripts and integrations; no handoff overhead" },
  { capability: "Administration", typical: "NetSuite direct support or internal IT effort for each change", withSP: "Included in the same engagement as development; no separate engagement" },
  { capability: "Incident response", typical: "Support ticket or escalation through an account manager", withSP: "Direct access to the developer who knows your account configuration" },
  { capability: "Release impact review", typical: "Reactive, after issues appear in Production post-release", withSP: "Proactive Sandbox testing before each bi-annual NetSuite release" },
];

const PAIN_POINTS = [
  {
    icon: AlertCircle,
    title: "Your implementation partner's engagement ended.",
    description:
      "The team that built your account was scoped for go-live. Ongoing changes, fixes, and new development were never part of that engagement.",
  },
  {
    icon: RefreshCcw,
    title: "NetSuite needs to keep up with your business.",
    description:
      "New processes, new team members, new requirements. A live account that stops evolving starts creating friction inside the business.",
  },
  {
    icon: Wrench,
    title: "Things break and nobody knows why.",
    description:
      "Scripts fail, workflows misbehave, saved searches return wrong data. Without a technical team on call, these issues accumulate until they become urgent.",
  },
];

const WHAT_WE_COVER = [
  {
    icon: Code2,
    title: "SuiteScript Development",
    description:
      "New scripts, fixes to existing ones, governance limit issues, and User Event or Scheduled scripts that need updating as your processes change.",
  },
  {
    icon: Workflow,
    title: "Workflow Automation",
    description:
      "New approval workflows, updates to existing SuiteFlow automations, notification logic, and status transition rules as your processes evolve.",
  },
  {
    icon: LayoutDashboard,
    title: "Saved Searches & Dashboards",
    description:
      "New saved searches for operational visibility, updated dashboards as reporting needs shift, and exception searches that flag what needs attention.",
  },
  {
    icon: Plug,
    title: "Integrations",
    description:
      "Fixes to existing integrations when upstream APIs change, new connections to external platforms, and RESTlet endpoints for custom data exchange.",
  },
  {
    icon: Gauge,
    title: "Account Optimization",
    description:
      "Performance fixes for slow pages and searches, script audits, cleanup of legacy customizations, and technical debt reduction.",
  },
  {
    icon: ShieldCheck,
    title: "Administration",
    description:
      "User management, role updates, custom fields and forms, period close, and configuration changes that keep the account current with the business.",
  },
];

const HOW_IT_WORKS = [
  {
    step: "01",
    title: "We onboard your account",
    description:
      "We review your existing scripts, workflows, integrations, and known issues before we start. You do not need to document everything for us; we read the account and figure it out.",
  },
  {
    step: "02",
    title: "You bring work as it comes up",
    description:
      "No new statement of work per request. Changes are built and tested in Sandbox first, then deployed to Production on a schedule that works for your team.",
  },
  {
    step: "03",
    title: "We stay current with your account",
    description:
      "Each request builds on the last. Because we maintain context on your account, there is no re-discovery each time something new comes in.",
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
    icon: RefreshCcw,
    title: "Context Retained",
    description:
      "Because we maintain ongoing context on your account, there is no re-discovery each time new work comes in. The second request takes less time than the first.",
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
    question: "What is the difference between this and NetSuite's own support?",
    answer:
      "NetSuite's support handles platform bugs and questions about standard functionality. We handle the customization layer: scripts, workflows, saved searches, templates, and configuration specific to your account. Most day-to-day questions in a live account sit in the customization layer, not the platform itself.",
  },
  {
    question: "How is support billed?",
    answer:
      "SuitePacific offers three engagement models: dedicated monthly support (a fixed block of hours applied to whatever comes up each month), on-demand access for occasional requests without a monthly commitment, and project-based engagements for defined builds with an agreed scope. Accounts with a steady stream of development and configuration needs typically choose dedicated monthly support; it provides consistent access without the overhead of scoping each individual request.",
  },
  {
    question: "Do you require a long-term contract?",
    answer:
      "We typically start with a three-month engagement, which gives enough time to understand the account and address the highest-priority items. Most clients continue month-to-month after that.",
  },
  {
    question: "Can you take over support from a current managed services provider?",
    answer:
      "Yes. We handle transitions regularly. The process involves a documented handoff of active customizations, known issues, and in-progress work. We also review the account independently rather than relying solely on the previous provider's documentation.",
  },
  {
    question: "Can you handle both development and administration work?",
    answer:
      "Yes. Most live accounts need both. Administration covers configuration changes inside NetSuite's built-in tools. Development covers SuiteScript, integrations, and automation that requires custom code. Both are handled within the same engagement.",
  },
  {
    question: "What is included in a monthly post-go-live support engagement?",
    answer:
      "A monthly engagement provides a dedicated block of hours applied to whatever comes up during the month: new development requests, bug fixes, configuration changes, saved search updates, administration tasks, and integration maintenance. Work is brought as it arises; we handle it within the allocated hours. Most accounts find a consistent level of work month to month, with occasional spikes during NetSuite release cycles or business process changes.",
  },
  {
    question: "How does SuitePacific handle urgent NetSuite issues?",
    answer:
      "Urgent issues get prioritized ahead of queued development work. Because we maintain context on your account, there is no ramp-up time diagnosing the problem. We have access to your existing scripts, workflows, and configuration history, which is typically where urgent issues originate.",
  },
  {
    question: "Can you work with accounts that have legacy SuiteScript 1.0 scripts?",
    answer:
      "Yes. We work with both SuiteScript 1.0 and SuiteScript 2.x accounts. Legacy 1.0 scripts have different APIs and governance behavior than 2.x. We document which scripts are on 1.0 and assess whether migration to 2.x is warranted as part of ongoing maintenance, rather than recommending a wholesale migration that creates unnecessary disruption.",
  },
  {
    question: "Do you handle custom record types and custom fields?",
    answer:
      "Yes. Custom records, custom fields, custom forms, and saved searches built on custom records are a standard part of post-go-live administration and development. We create, modify, and maintain these as part of the ongoing engagement.",
  },
  {
    question: "How do you handle NetSuite's twice-yearly release cycle?",
    answer:
      "Before each release, we review the release preview in your Sandbox environment and check for compatibility issues with your existing customizations. Most customizations survive releases without changes, but SuiteFlow and advanced PDF templates occasionally require adjustments. We flag issues proactively so they are addressed before the release reaches your Production account.",
  },
  {
    question: "Can you work alongside our internal IT team or administrator?",
    answer:
      "Yes. We work alongside internal IT and administrators regularly. The typical arrangement has internal IT managing infrastructure and general IT policy while we handle NetSuite-specific development, customization, and configuration. We adapt the scope of our engagement to avoid overlap with existing internal capabilities.",
  },
  {
    question: "What happens to customizations built during the engagement if we end the relationship?",
    answer:
      "All customizations built during the engagement belong to your NetSuite account. We do not use proprietary tooling, platform wrappers, or external services that would make the work inaccessible after the engagement ends. We maintain documentation of active scripts and workflows, which we provide during offboarding.",
  },
  {
    question: "What is NetSuite hypercare support?",
    answer:
      "Hypercare is the period immediately after go-live, typically the first 30-90 days, when issues surface at the highest rate. Data entry errors, integration failures, and configuration gaps that testing did not catch all appear under real transaction volumes. A post-go-live support partner stabilizes this period by diagnosing and resolving issues as they arise rather than letting them accumulate into a backlog while the internal team tries to keep up with day-to-day operations.",
  },
  {
    question: "What is the difference between break-fix and managed NetSuite support?",
    answer:
      "Break-fix support is on-demand: you engage a consultant when something breaks, pay per incident or per hour, and the relationship ends when the issue is resolved. Managed support is a retainer covering whatever comes up each month, including proactive work and new development. Break-fix accumulates context overhead on every call because the consultant starts from scratch each time. Managed support builds institutional knowledge, so each request takes less time than the last. For accounts with a steady stream of ongoing needs, managed support is typically more cost-effective once re-onboarding time is factored into each break-fix engagement.",
  },
  {
    question: "How long does NetSuite post-go-live support typically last?",
    answer:
      "Most accounts maintain an ongoing support engagement indefinitely. NetSuite accounts continue to evolve: business processes change, integrations require maintenance, new capabilities need development, and twice-yearly NetSuite releases require regression testing in Sandbox. Accounts that end a support engagement typically restart within 6-12 months when accumulated needs become urgent. The relevant question for most accounts is not how long support lasts but how many hours per month the account actually generates.",
  },
  {
    question: "Is it more cost-effective to hire a full-time NetSuite administrator?",
    answer:
      "A full-time NetSuite administrator covers configuration, administration, and basic saved searches but typically does not cover SuiteScript development, integration work, or complex automation. Accounts needing both development and administration would require a developer-level hire, which carries the full overhead of a full-time employee: salary, benefits, paid time off, and ramp-up time. A retainer covering both development and administration provides access to a broader skill set without fixed headcount cost, which is generally more cost-effective for mid-market accounts that need both capabilities but not at full-time volume for either.",
  },
  {
    question: "What is involved in switching from an existing NetSuite support partner?",
    answer:
      "We perform an independent account review during onboarding, reading existing scripts, workflows, and configuration ourselves rather than relying on documentation from the previous provider. Overlapping the transition by starting an engagement with us while the existing contract winds down is the cleanest approach: it avoids a coverage gap and gives us time to learn the account before the handoff is complete. All customizations built by a previous provider remain in your NetSuite account. We do not use proprietary tooling or wrappers that would make prior work inaccessible.",
  },
];

export const metadata: Metadata = {
  title: "NetSuite Post-Go-Live Support",
  description:
    "Ongoing NetSuite managed services and post-go-live support: SuiteScript development, workflow automation, integrations, reporting, and administration after your implementation partner's work is done.",
  alternates: { canonical: "/netsuite-post-go-live-support" },
  openGraph: {
    title: "NetSuite Post-Go-Live Support",
    description: "Ongoing NetSuite managed services and post-go-live support: SuiteScript development, workflow automation, integrations, reporting, and administration after your implementation partner's work is done.",
    url: "https://suitepacific.com/netsuite-post-go-live-support",
    type: "website",
    images: [{ url: "https://suitepacific.com/og-default.png", width: 1200, height: 630 }],
  },
};

export default function PostGoLiveSupportPage() {
  return (
    <main className="pt-32 pb-24 sm:pt-40 sm:pb-32">
      <BreadcrumbJsonLd
        items={[
          { name: "Home", url: SITE_URL },
          { name: "NetSuite Post-Go-Live Support", url: `${SITE_URL}/netsuite-post-go-live-support` },
        ]}
      />
      <FaqJsonLd items={FAQ} />
      <ServiceJsonLd
        name="NetSuite Post-Go-Live Support"
        description="Ongoing NetSuite development and managed services for companies already live on NetSuite: SuiteScript 2.x (User Event, Scheduled, Map/Reduce, RESTlet, Suitelet), SuiteFlow workflow automation, RESTlet and API integrations, saved search and dashboard reporting, advanced FreeMarker PDF templates, account performance optimization, and administration. Month-to-month, sandbox-first, by Oracle NetSuite SuiteCloud Developer II and Administrator Professional certified developers."
        url={`${SITE_URL}/netsuite-post-go-live-support`}
        serviceType="NetSuite Managed Support"
      />
      <OrganizationJsonLd />
      <VideoObjectJsonLd
        name="Your NetSuite Is Live. So Why Are You Still Using Excel?"
        description="Four common reasons businesses continue relying on Excel after a NetSuite implementation: unfinished customization, missing reporting, temporary workarounds that became permanent, and no owner for post-go-live improvement. Includes a framework for identifying where your NetSuite environment needs attention."
        videoId="x4-m-KHG7jo"
        duration="PT4M16S"
        uploadDate="2026-08-16"
      />

      <div className="mx-auto max-w-3xl px-6 lg:px-8">
        <SectionHeading
          as="h1"
          eyebrow="Post-Go-Live Support"
          title="NetSuite Post-Go-Live Support"
          subtitle="Ongoing development, automation, and support for companies already live on NetSuite. Your implementation partner got you there; we keep it running and growing."
          align="left"
        />

        <div className="mt-6 rounded-2xl border border-brand-100 bg-white p-5 shadow-soft">
          <LeadFormLight />
        </div>
        <p className="mt-3 text-xs text-brand-400">NetSuite-certified · Sandbox-first · Direct access, no ticket system · Month-to-month</p>
        <p className="mt-2 text-xs text-brand-300"><time dateTime="2026-08">Published August 2026</time></p>

        <p className="mt-6 text-sm text-brand-400">
          Implementation partners close their engagement at go-live. The scripts, workflows,
          integrations, and configurations built during implementation continue to require
          maintenance, and the business continues to need capabilities the original scope never
          covered. Without a dedicated technical partner, these needs accumulate: development
          backlogs grow, issues go unresolved, and the NetSuite account falls behind the pace of
          the business. SuitePacific provides post-go-live support and ongoing development for
          companies already live on NetSuite, covering SuiteScript development, workflow automation
          updates, saved search and dashboard work, integration maintenance, account administration,
          and performance optimization. Engagements are month-to-month with no long-term contract
          required. Work is handled by NetSuite SuiteCloud Developer II and Administrator
          Professional certified developers who maintain documentation and context on your specific
          account across every engagement, so each new request builds on existing knowledge rather
          than starting from scratch.
        </p>

        {/* Intro video */}
        <div className="mt-8 rounded-2xl border border-brand-100 bg-brand-50/30 p-5" data-section="intro-video">
          <div className="flex flex-col sm:flex-row gap-5 items-start">
            <a
              href="https://youtu.be/x4-m-KHG7jo"
              target="_blank"
              rel="noopener noreferrer"
              className="group relative w-full sm:w-44 shrink-0 overflow-hidden rounded-xl"
              style={{ aspectRatio: "16/9" }}
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="https://i.ytimg.com/vi/x4-m-KHG7jo/hqdefault.jpg"
                alt="Why your team is still using Excel after going live on NetSuite"
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
              <p className="text-sm font-semibold text-brand-900">Your NetSuite is live. So why is your team still in Excel?</p>
              <p className="mt-2 text-sm text-brand-400">
                Four common reasons businesses still rely on Excel after a NetSuite implementation,
                and how to identify where your environment needs attention.
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
                <th className="py-2.5 pr-4 text-left text-xs font-semibold text-brand-900 w-1/3">Without a support partner</th>
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
            What happens to your NetSuite account after the implementation partner leaves?
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
            If you have not gone live yet and are looking for an implementation partner, that is
            a different engagement. See{" "}
            <Link href="/netsuite-implementation-partner-vs-managed-support" className="text-accent hover:underline">
              implementation partner vs. managed support
            </Link>{" "}
            for that distinction.
          </p>
        </div>

        {/* What we cover */}
        <div className="mt-14" data-section="what-we-cover">
          <h2 className="text-lg font-semibold text-brand-900 mb-1">What does SuitePacific post-go-live support cover?</h2>
          <p className="text-sm text-brand-400 mb-6">
            The mix varies by account, but a post-go-live engagement typically spans all of these.
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            {WHAT_WE_COVER.map((item) => (
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

        {/* SLA levels */}
        <div className="mt-14" data-section="sla-levels">
          <h2 className="text-lg font-semibold text-brand-900 mb-2">What are the response times for different types of issues?</h2>
          <p className="text-sm text-brand-400 mb-5">
            Not every request has the same urgency. Issues are classified on first contact and handled accordingly.
          </p>
          <div className="overflow-x-auto rounded-xl border border-brand-100">
            <table className="w-full text-sm border-collapse">
              <thead>
                <tr className="bg-brand-50/60 border-b border-brand-100">
                  <th className="py-2.5 px-4 text-left text-xs font-semibold text-brand-900">Severity</th>
                  <th className="py-2.5 px-4 text-left text-xs font-semibold text-brand-900">Example</th>
                  <th className="py-2.5 px-4 text-left text-xs font-semibold text-brand-900">Response</th>
                  <th className="py-2.5 px-4 text-left text-xs font-semibold text-brand-900">Action</th>
                </tr>
              </thead>
              <tbody>
                {SLA_LEVELS.map((row, i) => (
                  <tr key={row.severity} className={i < SLA_LEVELS.length - 1 ? "border-b border-brand-50" : ""}>
                    <td className="py-3 px-4 font-semibold text-brand-900 text-xs align-top whitespace-nowrap">{row.severity}</td>
                    <td className="py-3 px-4 text-brand-400 text-xs align-top">{row.example}</td>
                    <td className="py-3 px-4 text-accent font-medium text-xs align-top whitespace-nowrap">{row.response}</td>
                    <td className="py-3 px-4 text-brand-400 text-xs align-top">{row.action}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* How it works */}
        <div className="mt-14" data-section="how-it-works">
          <h2 className="text-lg font-semibold text-brand-900 mb-6">How does SuitePacific post-go-live support work?</h2>
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
        </div>

        {/* Support phases */}
        <div className="mt-14" data-section="support-phases">
          <h2 className="text-lg font-semibold text-brand-900 mb-2">What does a new support engagement look like in the first 90 days?</h2>
          <p className="text-sm text-brand-400 mb-6">
            Every new account goes through three structured phases before settling into steady-state ongoing support.
          </p>
          <div className="space-y-4">
            {SUPPORT_PHASES.map((phase) => (
              <div key={phase.phase} className="rounded-xl border border-brand-100 bg-white p-5 shadow-soft">
                <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4 mb-3">
                  <span className="text-xs font-semibold text-accent bg-accent/10 rounded-full h-7 w-7 flex items-center justify-center shrink-0">
                    {phase.phase}
                  </span>
                  <div className="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-3">
                    <p className="font-semibold text-brand-900 text-sm">{phase.name}</p>
                    <span className="hidden sm:block text-brand-200">·</span>
                    <p className="text-xs text-accent font-medium">{phase.timeline}</p>
                  </div>
                </div>
                <p className="text-xs font-medium text-brand-600 mb-2">{phase.focus}</p>
                <ul className="space-y-1.5">
                  {phase.items.map((item) => (
                    <li key={item} className="flex items-start gap-2 text-sm text-brand-400">
                      <CheckCircle2 className="h-3.5 w-3.5 text-accent shrink-0 mt-0.5" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        {/* Why SuitePacific */}
        <div className="mt-14" data-section="why-suitepacific">
          <h2 className="text-lg font-semibold text-brand-900 mb-6">Why do companies choose SuitePacific for post-go-live support?</h2>
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

        {/* Switching partner */}
        <div className="mt-14" data-section="switching-partner">
          <h2 className="text-lg font-semibold text-brand-900 mb-2">How do you transition from an existing NetSuite support partner?</h2>
          <p className="text-sm text-brand-400 mb-6">
            Switching support partners mid-engagement is straightforward when handled in the right order. Most transitions complete in two to three weeks.
          </p>
          <div className="space-y-4">
            {[
              {
                step: "01",
                title: "Start an engagement while your current contract is still active",
                description: "Overlapping by four to six weeks is the cleanest approach. It gives us time to review the account, understand active work, and identify open issues before the handoff is complete. There is no gap in coverage, and your existing provider continues to handle day-to-day requests while we orient.",
              },
              {
                step: "02",
                title: "We review the account independently",
                description: "We read existing scripts, workflows, saved searches, and integrations ourselves rather than relying solely on documentation from the previous provider. This surfaces undocumented customizations and known issues that may not have been communicated at handoff.",
              },
              {
                step: "03",
                title: "Let the previous contract lapse at its natural end date",
                description: "Once we have sufficient context on the account, the previous engagement ends at its scheduled date. All customizations built by the previous provider remain in your NetSuite account. We do not require any proprietary tooling or access credentials that would not already be in the account.",
              },
            ].map((item) => (
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
        </div>

        {/* Related reading */}
        <div className="mt-10 rounded-2xl border border-brand-100 bg-brand-50/30 p-5 sm:p-6">
          <p className="text-sm font-semibold text-brand-900 mb-3">Related reading</p>
          <ul className="space-y-2.5">
            <li className="text-sm text-brand-400">
              <Link href="/blog/netsuite-post-go-live-checklist" className="text-accent hover:underline">
                NetSuite post-go-live checklist
              </Link>{" "}
              covers what should be in place in the months after implementation.
            </li>
            <li className="text-sm text-brand-400">
              <Link href="/blog/signs-netsuite-support-not-working" className="text-accent hover:underline">
                8 signs your NetSuite support isn&apos;t working
              </Link>{" "}
              identifies the patterns that indicate a support relationship needs to change.
            </li>
            <li className="text-sm text-brand-400">
              <Link href="/blog/netsuite-month-end-close-checklist" className="text-accent hover:underline">
                NetSuite month-end close checklist
              </Link>{" "}
              walks through the steps for a clean period close in NetSuite.
            </li>
            <li className="text-sm text-brand-400">
              <Link href="/blog/netsuite-support-partner-evaluation" className="text-accent hover:underline">
                How to evaluate a NetSuite support partner
              </Link>{" "}
              covers what to look for when selecting an ongoing support provider after go-live.
            </li>
            <li className="text-sm text-brand-400">
              <Link href="/netsuite-acs-alternative" className="text-accent hover:underline">
                NetSuite ACS alternative
              </Link>{" "}
              covers what ACS does and does not include, and how a third-party engagement compares on scope, hours, and contract terms.
            </li>
            <li className="text-sm text-brand-400">
              <Link href="/netsuite-partner-replacement" className="text-accent hover:underline">
                NetSuite partner replacement
              </Link>{" "}
              covers what the transition looks like when switching from an existing partner: what stays in your account, what the first 90 days look like, and how to overlap the handoff cleanly.
            </li>
          </ul>
          <p className="text-sm font-semibold text-brand-900 mb-3 mt-6">NetSuite FSM resources</p>
          <ul className="space-y-2.5">
            <li className="text-sm text-brand-400">
              <Link href="/netsuite-fsm-support" className="text-accent hover:underline">
                NetSuite FSM Support and Troubleshooting
              </Link>{" "}
              covers sync failures, bundle update issues, broken configurations, and mobile app problems for live FSM accounts.
            </li>
            <li className="text-sm text-brand-400">
              <Link href="/blog/netsuite-fsm-bundle-update-august-2026" className="text-accent hover:underline">
                NetSuite FSM bundle 2026.07.1
              </Link>{" "}
              covers the three breaking changes in the August 2026 update and what to test in Sandbox before Production.
            </li>
            <li className="text-sm text-brand-400">
              <Link href="/resources/netsuite-fsm-configuration-change-control" className="text-accent hover:underline">
                FSM configuration change control checklist
              </Link>{" "}
              is a Sandbox-first workflow for managing FSM changes safely in a live field operation.
            </li>
          </ul>
          <p className="text-sm font-semibold text-brand-900 mb-3 mt-6">NetSuite 2026.2 releases</p>
          <ul className="space-y-2.5">
            <li className="text-sm text-brand-400">
              <Link href="/blog/netsuite-payment-runs-2026-2" className="text-accent hover:underline">
                NetSuite Payment Runs
              </Link>{" "}
              covers the new AP workflow for batching and paying multiple vendors in a single review and approval step.
            </li>
            <li className="text-sm text-brand-400">
              <Link href="/blog/netsuite-bank-reconciliation-changes-2026-2" className="text-accent hover:underline">
                NetSuite bank reconciliation changes in 2026.2
              </Link>{" "}
              explains the Match Bank Data redesign and what finance teams need to update before the release reaches Production.
            </li>
            <li className="text-sm text-brand-400">
              <Link href="/blog/netsuite-payment-adjustments-2026-2" className="text-accent hover:underline">
                NetSuite 2026.2 payment adjustment automation
              </Link>{" "}
              covers the new capability for automatically handling bank fees and underpayments during payment processing.
            </li>
            <li className="text-sm text-brand-400">
              <Link href="/blog/netsuite-bill-capture-preferences-2026-2" className="text-accent hover:underline">
                NetSuite Bill Capture preference changes in 2026.2
              </Link>{" "}
              explains what blank values now mean in Bill Capture configuration and what to verify before the update.
            </li>
            <li className="text-sm text-brand-400">
              <Link href="/blog/netsuite-project-health-indicators-2026-2" className="text-accent hover:underline">
                NetSuite 2026.2 project health indicators
              </Link>{" "}
              covers the five new indicators added to project records and what each one tracks.
            </li>
            <li className="text-sm text-brand-400">
              <Link href="/blog/netsuite-advanced-record-customization-2026-2" className="text-accent hover:underline">
                NetSuite Advanced Record Customization in 2026.2
              </Link>{" "}
              covers the new location for managing AI descriptions on records and how the setting affects the account.
            </li>
          </ul>
        </div>

        {/* Industries */}
        <div className="mt-14" data-section="industries">
          <h2 className="text-lg font-semibold text-brand-900 mb-2">Which industries does SuitePacific provide post-go-live support for?</h2>
          <p className="text-sm text-brand-400 mb-6">
            Post-go-live support needs vary by industry. Each page below covers the specific gaps and customizations
            that come up most often in that vertical.
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

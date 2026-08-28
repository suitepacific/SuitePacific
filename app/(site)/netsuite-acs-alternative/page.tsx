import type { Metadata } from "next";
import Link from "next/link";
import {
  XCircle,
  CheckCircle2,
  Clock,
  ShieldCheck,
  Users,
  Award,
  Zap,
  BookOpen,
} from "lucide-react";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Card } from "@/components/ui/Card";
import { IconBadge } from "@/components/ui/IconBadge";
import { BreadcrumbJsonLd, FaqJsonLd, ServiceJsonLd, OrganizationJsonLd, VideoObjectJsonLd } from "@/components/seo/JsonLd";
import { ServiceFaqSection } from "@/components/ui/ServiceFaqSection";
import { LeadFormLight } from "@/components/sections/LeadFormLight";
import { SITE_URL } from "@/lib/content";

const ACS_TIERS = [
  {
    name: "ACS Advise",
    target: "New and growing accounts",
    hours: "Shared pool",
    description: "Shared specialist access, best-practice guidance, and basic troubleshooting. No dedicated consultant assigned.",
  },
  {
    name: "ACS Monitor",
    target: "Established accounts",
    hours: "~36 hrs / quarter",
    description: "Designated functional consultant and project execution support across the quarter.",
  },
  {
    name: "ACS Optimize",
    target: "Mid-market growth",
    hours: "~20 hrs / month",
    description: "Customer Success Manager plus functional consultant, optimization playbooks, and access to senior resources.",
  },
  {
    name: "ACS Architect",
    target: "Enterprise / multi-subsidiary",
    hours: "~40 hrs / month",
    description: "Senior CSM plus named expert team, strategic roadmap sessions, and dedicated escalation paths.",
  },
];

const HOUR_CAP_SCENARIOS = [
  { task: "Monthly system health review", hours: "6-8 hrs", covered: "Yes" },
  { task: "Saved search or reporting fix", hours: "3-5 hrs", covered: "Yes" },
  { task: "Workflow configuration question", hours: "2-3 hrs", covered: "Yes" },
  { task: "Allocation remaining after the above", hours: "4-9 hrs", covered: "" },
  { task: "SuiteScript fix for the underlying workflow issue", hours: "3-6 hrs", covered: "No" },
  { task: "Celigo or Shopify integration debugging", hours: "Variable", covered: "No" },
  { task: "New automation or custom development", hours: "Variable", covered: "No" },
];

const ACS_GAPS = [
  {
    icon: XCircle,
    title: "ACS does not cover your customizations.",
    description:
      "If the issue lives in a SuiteScript, a workflow, a saved search formula, or a custom integration, ACS escalates to the dev team that built it. That team is you. ACS covers the platform, not what was built on top of it.",
  },
  {
    icon: XCircle,
    title: "You share ACS resources with hundreds of other accounts.",
    description:
      "ACS is not a dedicated resource. Response times and case depth depend on queue volume across Oracle's full customer base. Your urgency is not unique to your account from their perspective.",
  },
  {
    icon: XCircle,
    title: "ACS agents rotate. Your account context does not transfer.",
    description:
      "Each case starts from scratch. The agent handling your issue today has no knowledge of the issue resolved three months ago. Re-explaining account history is built into the model.",
  },
  {
    icon: XCircle,
    title: "ACS does not touch your integration stack.",
    description:
      "Celigo flows, Shopify connectors, Salesforce syncs, EDI connections, and 3PL integrations are outside ACS scope entirely. If a Celigo flow breaks where the root cause is in NetSuite, ACS stops at the NetSuite boundary.",
  },
];

const WHAT_WE_COVER = [
  {
    icon: CheckCircle2,
    title: "Everything ACS covers, plus your customization layer",
    description:
      "Standard platform questions, feature behavior, and configuration guidance, plus SuiteScript, workflows, saved searches, integrations, and advanced PDF templates that ACS does not touch.",
  },
  {
    icon: Clock,
    title: "Same-day response on active issues",
    description:
      "No tier-1 triage, no queue. When something breaks in your account, you reach the person who will fix it, not a routing system.",
  },
  {
    icon: BookOpen,
    title: "Retained context across every request",
    description:
      "We maintain ongoing knowledge of your account: your scripts, your integrations, your workflows, your history. Every request builds on that context rather than starting from zero.",
  },
  {
    icon: Zap,
    title: "Proactive issue identification",
    description:
      "We flag problems we see during routine work, not just the ones you submit as cases. Accounts accumulate technical debt that no ticket system will surface on its own.",
  },
];

const WHY_SP = [
  {
    icon: ShieldCheck,
    title: "NetSuite-Certified",
    description:
      "NetSuite SuiteCloud Developer II and Administrator Professional certifications. The same credential standard ACS uses, without the shared-resource model.",
  },
  {
    icon: Users,
    title: "Direct Access",
    description:
      "You communicate directly with the consultant doing the work. No account manager, no ticket routing, no Tier 1 triage.",
  },
  {
    icon: Award,
    title: "Your Account, Our Context",
    description:
      "We build knowledge of your specific account over time. The tenth request takes less time than the first because we already know your environment.",
  },
  {
    icon: Clock,
    title: "Month-to-Month",
    description:
      "No annual contract required. ACS locks you into a yearly commitment. We work month-to-month so you can adjust based on what the account actually needs.",
  },
];

const ACS_COMPARISON = [
  {
    aspect: "Customization coverage",
    acs: "Platform only: SuiteScript, workflows, and custom integrations are explicitly excluded",
    sp: "Platform plus full customization layer: SuiteScript, integrations, workflows, saved searches, and PDF templates",
  },
  {
    aspect: "Account context",
    acs: "Shared resource pool; agent rotates per case and no context carries between cases",
    sp: "Single consultant with retained knowledge of your account across every request",
  },
  {
    aspect: "Response model",
    acs: "Ticket queue; response time varies by tier and shared volume across all ACS accounts",
    sp: "Direct access; same-day response on active production issues",
  },
  {
    aspect: "New development",
    acs: "Not covered",
    sp: "Included in retainer: SuiteScript, workflow builds, integration development",
  },
  {
    aspect: "Platform bug escalation",
    acs: "Internal escalation to Oracle engineering via ACS channels",
    sp: "Documented and submitted via standard NetSuite support channel with full context",
  },
  {
    aspect: "Contract structure",
    acs: "Annual subscription priced as a percentage of your NetSuite license fee, paid upfront; Oracle does not publish pricing",
    sp: "Month-to-month retainer, no annual commitment required",
  },
  {
    aspect: "Hour allocation",
    acs: "Optimize: ~20 hrs/month; Architect: ~40 hrs/month; shared pool at lower tiers",
    sp: "No hour caps on retainer work; scope is the issue, not the clock",
  },
  {
    aspect: "Integration coverage",
    acs: "NetSuite platform only; Celigo, Shopify, Salesforce, EDI, and 3PL connections are out of scope",
    sp: "Full stack: platform, customizations, and integrations built on or connected to NetSuite",
  },
];

const EVALUATION_SCORECARD = [
  {
    criterion: "Customization coverage",
    question: "Do they handle SuiteScript, workflows, and integrations they did not build?",
    whyItMatters: "ACS explicitly excludes customizations. An alternative must cover the full layer ACS does not.",
  },
  {
    criterion: "Response model",
    question: "Is contact direct to the consultant, or through a ticket queue?",
    whyItMatters: "Ticket routing is the most common complaint about ACS. Direct access eliminates the queue.",
  },
  {
    criterion: "Account continuity",
    question: "Does one consultant handle your account consistently, or do agents rotate per case?",
    whyItMatters: "ACS agents rotate and lose context between cases. A retained consultant builds knowledge that compounds.",
  },
  {
    criterion: "Contract flexibility",
    question: "Month-to-month or annual commitment required?",
    whyItMatters: "ACS requires an annual subscription paid upfront. A true alternative should offer month-to-month terms.",
  },
  {
    criterion: "Integration coverage",
    question: "Do they handle Celigo, Boomi, Shopify connectors, or custom middleware?",
    whyItMatters: "ACS stops at the NetSuite platform boundary. Integration ecosystems are a primary blind spot.",
  },
  {
    criterion: "Certified credentials",
    question: "What NetSuite certifications does the consultant hold?",
    whyItMatters: "SuiteCloud Developer II and Administrator Professional are the benchmark credential standard.",
  },
  {
    criterion: "Platform bug handling",
    question: "How do confirmed platform bugs get submitted to Oracle?",
    whyItMatters: "ACS has internal Oracle escalation channels. Third-party providers submit via standard NetSuite support with full documentation.",
  },
  {
    criterion: "Transition overlap",
    question: "Can they start while ACS is still active?",
    whyItMatters: "A parallel overlap period prevents a coverage gap and lets the new provider build context before ACS expires.",
  },
];

const MIGRATION_TIMELINE = [
  {
    week: "Weeks 1-2",
    action: "Initial engagement and access provisioning",
    detail: "Sign month-to-month agreement. Provision NetSuite account access at the appropriate role level. Schedule account onboarding call to walk through known issues and priorities.",
  },
  {
    week: "Weeks 2-4",
    action: "Account onboarding",
    detail: "Consultant reviews existing SuiteScript, workflows, integrations, saved searches, and documented issues directly in the account. No documentation package required from your team.",
  },
  {
    week: "Weeks 4-8",
    action: "Parallel coverage period",
    detail: "Third-party provider handles new requests as they surface. ACS remains active. Non-platform requests route to the new provider; platform bug escalations still go to ACS during this overlap.",
  },
  {
    week: "At ACS renewal",
    action: "Let ACS lapse",
    detail: "Do not renew ACS. Third-party provider is now the primary support relationship. Platform bugs are submitted directly to NetSuite support with full documentation from the provider.",
  },
  {
    week: "Month 3 onward",
    action: "Steady-state managed support",
    detail: "Provider has full account context. All work covers platform guidance, customizations, integrations, upgrade preparation, and administration under a single retainer.",
  },
];

const FAQ = [
  {
    question: "What does NetSuite ACS actually cover?",
    answer:
      "ACS covers Oracle NetSuite platform functionality: standard features, configuration guidance, best practices, and escalation of platform bugs to Oracle's engineering team. It does not cover custom SuiteScript, third-party integrations, or configurations built by your implementation partner. If your question involves custom code or a non-standard setup, ACS will typically redirect you to whoever built it.",
  },
  {
    question: "Can a third-party firm replace ACS entirely?",
    answer:
      "For most live accounts, yes. Third-party firms cover everything ACS covers on the configuration and guidance side, plus the customization layer ACS does not touch. The one thing only Oracle can do is submit bugs to NetSuite engineering and access internal escalation channels for confirmed platform defects. We can identify platform bugs and guide you through submitting them to NetSuite support, but we cannot file them internally the way ACS can.",
  },
  {
    question: "How does pricing compare to ACS?",
    answer:
      "Oracle does not publish ACS pricing. ACS is priced as a percentage of your annual NetSuite license fee, paid upfront for the full annual term. The exact cost depends on your license tier and account size; your renewal quote is the authoritative number. SuitePacific engagements are month-to-month retainers that scale with the volume of work, with no upfront annual commitment.",
  },
  {
    question: "Can you handle transitions from ACS mid-contract?",
    answer:
      "Yes. We can begin an engagement while ACS is still active and take over primary support before the ACS term ends. This approach avoids a gap in coverage and gives us time to learn your account before the handoff.",
  },
  {
    question: "What happens when there is a genuine platform bug?",
    answer:
      "We identify it, document it, and guide you through submitting it to Oracle NetSuite support. We also provide workarounds where possible while the official fix works through Oracle's process. Platform bugs that ACS would escalate internally we handle through the standard NetSuite support channel with full documentation.",
  },
  {
    question: "What notice period does Oracle require to cancel ACS?",
    answer:
      "Oracle does not publish a standard cancellation policy, but ACS is an annual subscription and customer reports consistently indicate you are committed for the full term. Transition planning should begin several months before your renewal date if you intend to move to a third-party provider. Starting an engagement with a third-party partner before ACS expires is the cleanest way to ensure no gap in coverage.",
  },
  {
    question: "Can we run ACS and a third-party partner at the same time?",
    answer:
      "Yes, and this is actually the recommended transition approach. A third-party partner can begin learning your account, your scripts, and your integrations while ACS is still active. You let ACS lapse at renewal once the handoff is complete. There is no technical restriction from Oracle on using additional consulting resources alongside ACS.",
  },
  {
    question: "Does ACS cover Celigo, Shopify, or Salesforce integrations?",
    answer:
      "No. ACS scope is limited to the NetSuite platform itself. If a Celigo flow stops syncing, a Shopify connector breaks, or a Salesforce integration falls out of alignment, ACS will not diagnose the non-NetSuite side of the problem, and often cannot fully diagnose the NetSuite side without knowing what the integration expects. Integration ecosystems are a significant blind spot for ACS accounts running a multi-tool stack.",
  },
];

export const metadata: Metadata = {
  title: "NetSuite ACS Alternative: Third-Party Support Without the Contract",
  description:
    "A NetSuite ACS alternative that covers what ACS does not: SuiteScript, integrations, and custom workflows. No annual contract, no hour caps, direct access to a certified consultant.",
  alternates: { canonical: "/netsuite-acs-alternative" },
  openGraph: {
    title: "NetSuite ACS Alternative: Third-Party Support Without the Contract",
    description:
      "A NetSuite ACS alternative that covers what ACS does not: SuiteScript, integrations, and custom workflows. No annual contract, no hour caps, direct access to a certified consultant.",
    url: `${SITE_URL}/netsuite-acs-alternative`,
    type: "website",
    images: [{ url: `${SITE_URL}/og-default.png`, width: 1200, height: 630 }],
  },
};

export default function AcsAlternativePage() {
  return (
    <main className="pt-32 pb-24 sm:pt-40 sm:pb-32">
      <BreadcrumbJsonLd
        items={[
          { name: "Home", url: SITE_URL },
          { name: "NetSuite ACS Alternative", url: `${SITE_URL}/netsuite-acs-alternative` },
        ]}
      />
      <FaqJsonLd items={FAQ} />
      <ServiceJsonLd
        name="NetSuite ACS Alternative"
        description="Third-party NetSuite support covering the full customization layer ACS does not handle, with certified consultants, direct access, and retained account context."
        url={`${SITE_URL}/netsuite-acs-alternative`}
        serviceType="NetSuite Support"
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
          eyebrow="ACS Alternative"
          title="A Better Alternative to NetSuite Advanced Customer Support"
          subtitle="NetSuite's Advanced Customer Support covers the platform. It does not cover your SuiteScript, your integrations, or anything your implementation partner built. That gap is where most live accounts spend their actual support time."
          align="left"
        />

        <div className="mt-6 rounded-2xl border border-brand-100 bg-white p-5 shadow-soft">
          <LeadFormLight />
        </div>
        <p className="mt-3 text-xs text-brand-400">NetSuite-certified · Direct access · Month-to-month · Covers your full customization layer</p>

        <p className="mt-3 text-xs text-brand-300">Last updated August 2026</p>

        <div className="mt-6 rounded-2xl border-l-4 border-accent bg-brand-50/50 p-5">
          <p className="text-xs font-semibold uppercase tracking-wide text-accent mb-2">Quick answer</p>
          <p className="text-sm text-brand-700 leading-relaxed">
            NetSuite Advanced Customer Support (ACS) is a premium Oracle support tier that provides
            access to senior NetSuite resources, proactive guidance, and faster escalation for
            platform defects to Oracle engineering. What ACS does not cover: custom SuiteScript,
            third-party integrations, implementation partner configurations, or anything built on
            top of the standard platform. For most live accounts, the majority of support needs fall
            in the customization layer. A NetSuite ACS alternative is a certified independent
            consulting firm that covers both layers: the standard platform guidance ACS handles and
            the customization layer ACS does not. The four ACS tiers are Advise, Monitor, Optimize,
            and Architect; none includes SuiteScript development or integration maintenance. ACS
            Monitor is priced at approximately $1,200 per month for roughly 36 hours per quarter.
            SuitePacific provides a managed NetSuite support alternative to ACS starting at $799
            per month for 10 hours of dedicated monthly coverage, with direct access to the same
            certified consultant on every request and no shared-resource queue.
          </p>
        </div>

        <p className="mt-6 text-sm text-brand-400">
          ACS is a premium support tier from Oracle. It provides access to senior NetSuite
          resources, best-practice guidance, and faster escalation for platform issues. What it does
          not provide is support for the layer of customization that most live accounts depend on
          every day. SuitePacific covers that layer, and everything under it.
        </p>

        {/* ACS tiers */}
        <div className="mt-14" data-section="acs-tiers">
          <h2 className="text-lg font-semibold text-brand-900 mb-2">What are the NetSuite ACS tiers?</h2>
          <p className="text-sm text-brand-400 mb-5">
            ACS is structured across four tiers. Each tier increases the hours allocated and the seniority of the assigned resource. What stays constant across all tiers: ACS scope ends at the standard NetSuite platform boundary. Customizations, integrations, and anything your implementation partner built are excluded regardless of tier.
          </p>
          <div className="overflow-x-auto rounded-2xl border border-brand-100">
            <table className="w-full text-sm min-w-[520px]">
              <thead>
                <tr className="border-b border-brand-100 bg-brand-50/50">
                  <th className="text-left p-4 font-semibold text-brand-900">Tier</th>
                  <th className="text-left p-4 font-semibold text-brand-900">Target account</th>
                  <th className="text-left p-4 font-semibold text-brand-900 whitespace-nowrap">Hours included</th>
                  <th className="text-left p-4 font-semibold text-brand-900">What changes vs. lower tiers</th>
                </tr>
              </thead>
              <tbody>
                {ACS_TIERS.map((tier, i) => (
                  <tr key={tier.name} className={i < ACS_TIERS.length - 1 ? "border-b border-brand-100" : ""}>
                    <td className="p-4 font-medium text-brand-700 align-top whitespace-nowrap">{tier.name}</td>
                    <td className="p-4 text-brand-400 align-top">{tier.target}</td>
                    <td className="p-4 text-brand-700 font-medium align-top whitespace-nowrap">{tier.hours}</td>
                    <td className="p-4 text-brand-400 align-top">{tier.description}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="mt-4 rounded-xl border border-amber-200 bg-amber-50 p-4">
            <p className="text-xs font-semibold uppercase tracking-wide text-amber-700 mb-1.5">Pricing context</p>
            <p className="text-sm text-amber-900 leading-relaxed">
              Oracle does not publish ACS pricing. ACS is priced as a percentage of your annual NetSuite license fee, paid upfront for the full annual term. The exact percentage and total cost vary by license tier and account size; your renewal quote is the authoritative figure. Partners and customers also report year-over-year increases at renewal.{" "}
              <Link href="/blog/netsuite-acs-cost-breakdown" className="underline text-amber-800 hover:text-amber-900">
                Full ACS cost breakdown
              </Link>
              .
            </p>
          </div>
        </div>

        {/* ACS gaps */}
        <div className="mt-14" data-section="acs-gaps">
          <h2 className="text-lg font-semibold text-brand-900 mb-6">
            Where does NetSuite ACS fall short for live accounts?
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
            {ACS_GAPS.map((item) => (
              <Card key={item.title} className="p-5 flex flex-col gap-3">
                <IconBadge icon={item.icon} />
                <h3 className="font-semibold text-brand-900 text-sm">{item.title}</h3>
                <p className="text-sm text-brand-400">{item.description}</p>
              </Card>
            ))}
          </div>
        </div>

        {/* Hour cap reality */}
        <div className="mt-14" data-section="hour-cap">
          <h2 className="text-lg font-semibold text-brand-900 mb-2">What does 20 hours per month actually cover?</h2>
          <p className="text-sm text-brand-400 mb-5">
            ACS Optimize, the most common tier for mid-market accounts, allocates approximately 20 hours per month. Here is how a typical active month looks for a live account, and where those hours run out before the real work starts.
          </p>
          <div className="overflow-x-auto rounded-2xl border border-brand-100">
            <table className="w-full text-sm min-w-[480px]">
              <thead>
                <tr className="border-b border-brand-100 bg-brand-50/50">
                  <th className="text-left p-4 font-semibold text-brand-900">Task</th>
                  <th className="text-left p-4 font-semibold text-brand-900">Typical hours</th>
                  <th className="text-left p-4 font-semibold text-brand-900">ACS covers?</th>
                </tr>
              </thead>
              <tbody>
                {HOUR_CAP_SCENARIOS.map((row, i) => (
                  <tr
                    key={row.task}
                    className={[
                      i < HOUR_CAP_SCENARIOS.length - 1 ? "border-b border-brand-100" : "",
                      i === 3 ? "bg-brand-50/40" : "",
                    ].join(" ")}
                  >
                    <td className="p-4 text-brand-700 align-top">{row.task}</td>
                    <td className="p-4 text-brand-400 align-top whitespace-nowrap">{row.hours}</td>
                    <td className={`p-4 align-top font-medium whitespace-nowrap ${
                      row.covered === "Yes" ? "text-emerald-600" :
                      row.covered === "No" ? "text-red-500" :
                      "text-brand-400 italic"
                    }`}>
                      {row.covered === "" ? "-" : row.covered}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p className="mt-4 text-sm text-brand-400">
            The work that actually fixes things (the SuiteScript behind the workflow, the integration that keeps dropping records, the new automation) is out of scope. That work goes back to whoever built it, or sits unresolved.
          </p>
        </div>

        {/* ACS vs SuitePacific */}
        <div className="mt-14" data-section="acs-comparison">
          <h2 className="text-lg font-semibold text-brand-900 mb-5">How does NetSuite ACS compare to SuitePacific?</h2>
          <div className="overflow-x-auto rounded-2xl border border-brand-100">
            <table className="w-full text-sm min-w-[520px]">
              <thead>
                <tr className="border-b border-brand-100 bg-brand-50/50">
                  <th className="text-left p-4 font-semibold text-brand-900 w-1/3"></th>
                  <th className="text-left p-4 font-semibold text-brand-400">NetSuite ACS</th>
                  <th className="text-left p-4 font-semibold text-accent">SuitePacific</th>
                </tr>
              </thead>
              <tbody>
                {ACS_COMPARISON.map((row, i) => (
                  <tr key={row.aspect} className={i < ACS_COMPARISON.length - 1 ? "border-b border-brand-100" : ""}>
                    <td className="p-4 font-medium text-brand-700 align-top">{row.aspect}</td>
                    <td className="p-4 text-brand-400 align-top">{row.acs}</td>
                    <td className="p-4 text-brand-700 align-top">{row.sp}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Evaluation scorecard */}
        <div className="mt-14" data-section="evaluation-scorecard">
          <h2 className="text-lg font-semibold text-brand-900 mb-2">How to evaluate a NetSuite ACS alternative</h2>
          <p className="text-sm text-brand-400 mb-5">
            Use these criteria when comparing any ACS alternative. Each addresses a specific gap in the ACS model. Ask these questions before signing.
          </p>
          <div className="overflow-x-auto rounded-2xl border border-brand-100">
            <table className="w-full text-sm min-w-[520px]">
              <thead>
                <tr className="border-b border-brand-100 bg-brand-50/50">
                  <th className="text-left p-4 font-semibold text-brand-900 w-1/4">Criterion</th>
                  <th className="text-left p-4 font-semibold text-brand-900">Question to ask</th>
                  <th className="text-left p-4 font-semibold text-brand-900 hidden sm:table-cell">Why it matters</th>
                </tr>
              </thead>
              <tbody>
                {EVALUATION_SCORECARD.map((row, i) => (
                  <tr key={row.criterion} className={i < EVALUATION_SCORECARD.length - 1 ? "border-b border-brand-100" : ""}>
                    <td className="p-4 font-medium text-brand-700 align-top">{row.criterion}</td>
                    <td className="p-4 text-brand-400 align-top">{row.question}</td>
                    <td className="p-4 text-brand-400 align-top hidden sm:table-cell text-[13px]">{row.whyItMatters}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* What we cover */}
        <div className="mt-14" data-section="what-we-cover">
          <h2 className="text-lg font-semibold text-brand-900 mb-1">What does a third-party NetSuite ACS alternative cover?</h2>
          <p className="text-sm text-brand-400 mb-4">
            Everything your account generates on any given week, not just the portion that falls within a platform vendor&apos;s scope.
          </p>
          <div className="overflow-x-auto pb-2 mb-6">
            <div className="flex flex-col sm:flex-row items-stretch sm:items-start gap-2 sm:gap-0">
              <div className="rounded-xl border border-brand-100 bg-brand-50/30 px-4 py-3 text-center flex-1">
                <p className="text-[10px] font-semibold uppercase tracking-wide text-brand-400 mb-1">Issue</p>
                <p className="text-sm font-medium text-brand-700">Script, workflow, or integration fails</p>
              </div>
              <div className="hidden sm:flex items-center justify-center px-2 text-brand-300 text-base">›</div>
              <div className="rounded-xl border border-brand-100 bg-brand-50/30 px-4 py-3 text-center flex-1">
                <p className="text-[10px] font-semibold uppercase tracking-wide text-brand-400 mb-1">Step 1</p>
                <p className="text-sm font-medium text-brand-700">Direct contact, no Tier 1 triage</p>
              </div>
              <div className="hidden sm:flex items-center justify-center px-2 text-brand-300 text-base">›</div>
              <div className="rounded-xl border border-brand-100 bg-brand-50/30 px-4 py-3 text-center flex-1">
                <p className="text-[10px] font-semibold uppercase tracking-wide text-brand-400 mb-1">Step 2</p>
                <p className="text-sm font-medium text-brand-700">Fix built in your Sandbox account</p>
              </div>
              <div className="hidden sm:flex items-center justify-center px-2 text-brand-300 text-base">›</div>
              <div className="rounded-xl border border-accent/20 bg-accent/5 px-4 py-3 text-center flex-1">
                <p className="text-[10px] font-semibold uppercase tracking-wide text-accent mb-1">Resolved</p>
                <p className="text-sm font-medium text-brand-700">Deployed to Production</p>
              </div>
            </div>
          </div>
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

        {/* Migration timeline */}
        <div className="mt-14" data-section="migration-timeline">
          <h2 className="text-lg font-semibold text-brand-900 mb-2">What does the transition from ACS to a third-party provider look like?</h2>
          <p className="text-sm text-brand-400 mb-6">
            The cleanest ACS transitions run a parallel overlap period so the incoming provider has time to learn the account before ACS expires. Here is how that typically plays out.
          </p>
          <div className="space-y-0 rounded-2xl border border-brand-100 overflow-hidden">
            {MIGRATION_TIMELINE.map((item, i) => (
              <div
                key={item.week}
                className={[
                  "flex flex-col sm:flex-row gap-3 sm:gap-5 p-5",
                  i < MIGRATION_TIMELINE.length - 1 ? "border-b border-brand-100" : "",
                  i % 2 === 1 ? "bg-brand-50/30" : "",
                ].join(" ")}
              >
                <div className="shrink-0 sm:w-28">
                  <span className="text-xs font-semibold text-accent bg-accent/10 rounded-full px-2.5 py-0.5 whitespace-nowrap">
                    {item.week}
                  </span>
                </div>
                <div className="flex-1">
                  <p className="font-semibold text-brand-900 text-sm mb-0.5">{item.action}</p>
                  <p className="text-sm text-brand-400 leading-relaxed">{item.detail}</p>
                </div>
              </div>
            ))}
          </div>
          <p className="mt-4 text-sm text-brand-400">
            The transition does not require a gap in coverage. Starting the engagement two to three months before your ACS renewal date gives enough time to complete onboarding before the parallel period ends.
          </p>
        </div>

        {/* Mid-page CTA */}
        <div className="mt-10 rounded-2xl border border-brand-100 bg-white p-5 shadow-soft">
          <p className="text-sm font-semibold text-brand-900 mb-1">Evaluating your ACS renewal?</p>
          <p className="text-sm text-brand-400 mb-4">
            We review the types of support requests your account generates and give an honest
            assessment of whether a third-party alternative covers your actual needs better.
          </p>
          <LeadFormLight />
        </div>

        {/* Why SuitePacific */}
        <div className="mt-14" data-section="why-suitepacific">
          <h2 className="text-lg font-semibold text-brand-900 mb-6">Why do companies switch from NetSuite ACS to SuitePacific?</h2>
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
          <p className="text-sm font-semibold text-brand-900 mb-3">Related reading</p>
          <ul className="space-y-2.5">
            <li className="text-sm text-brand-400">
              <Link href="/netsuite-post-go-live-support" className="text-accent hover:underline">
                NetSuite post-go-live support
              </Link>{" "}
              covers how an ongoing third-party engagement is structured after implementation.
            </li>
            <li className="text-sm text-brand-400">
              <Link href="/blog/netsuite-support-partner-evaluation" className="text-accent hover:underline">
                How to evaluate a NetSuite support partner
              </Link>{" "}
              covers the questions to ask when comparing support options.
            </li>
            <li className="text-sm text-brand-400">
              <Link href="/blog/signs-netsuite-support-not-working" className="text-accent hover:underline">
                8 signs your NetSuite support isn&apos;t working
              </Link>{" "}
              identifies the patterns that indicate a support relationship needs to change.
            </li>
            <li className="text-sm text-brand-400">
              <Link href="/netsuite-oracle-support-vs-third-party" className="text-accent hover:underline">
                NetSuite Oracle support vs. third-party consulting firm
              </Link>{" "}
              compares both options side by side.
            </li>
          </ul>
        </div>

        <ServiceFaqSection items={FAQ} />

        <div className="mt-10 rounded-2xl border border-brand-100 bg-white p-5 shadow-soft">
          <p className="text-sm font-semibold text-brand-900 mb-1">Ready to evaluate an ACS alternative?</p>
          <p className="text-sm text-brand-400 mb-4">
            Tell us about your account and the types of support work that surfaces most often.
            We will give an honest assessment of whether a third-party engagement covers your
            needs better than ACS.
          </p>
          <LeadFormLight />
        </div>
      </div>
    </main>
  );
}

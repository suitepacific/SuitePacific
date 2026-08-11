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
import { BreadcrumbJsonLd, FaqJsonLd, ServiceJsonLd } from "@/components/seo/JsonLd";
import { ServiceFaqSection } from "@/components/ui/ServiceFaqSection";
import { LeadFormLight } from "@/components/sections/LeadFormLight";
import { SITE_URL } from "@/lib/content";

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
    acs: "Annual subscription, typically a percentage of your NetSuite license cost",
    sp: "Month-to-month retainer, no annual commitment required",
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
      "ACS is typically priced as a percentage of your annual NetSuite license cost. Depending on your license tier, that can reach significant annual spend. SuitePacific engagements start at a monthly retainer and scale with the volume of work. For most accounts, a third-party retainer costs less than ACS annually while covering more of the actual work your account generates.",
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
];

export const metadata: Metadata = {
  title: "NetSuite ACS Alternative",
  description:
    "Third-party NetSuite support as an alternative to ACS: certified consultants, direct access, faster response, and coverage for the customizations ACS does not handle.",
  alternates: { canonical: "/netsuite-acs-alternative" },
  openGraph: {
    title: "NetSuite ACS Alternative",
    description:
      "Third-party NetSuite support as an alternative to ACS: certified consultants, direct access, faster response, and coverage for the customizations ACS does not handle.",
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
            the customization layer ACS does not. The alternative provides direct access to the
            consultant doing the work, retained context across every request, and same-day response
            on active production issues without a shared-resource queue.
          </p>
        </div>

        <p className="mt-6 text-sm text-brand-400">
          ACS is a premium support tier from Oracle. It provides access to senior NetSuite
          resources, best-practice guidance, and faster escalation for platform issues. What it does
          not provide is support for the layer of customization that most live accounts depend on
          every day. SuitePacific covers that layer, and everything under it.
        </p>

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

import type { Metadata } from "next";
import Link from "next/link";
import {
  Clock,
  AlertCircle,
  RefreshCcw,
  ShieldCheck,
  Users,
  Award,
  Zap,
  MessageSquare,
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
    icon: Clock,
    title: "Tickets take days. Problems don't wait.",
    description:
      "Standard NetSuite support operates on a queue. A workflow that stops approving invoices, a script that fails on every save, an integration that stopped syncing — these are urgent in the account, not in a ticket system.",
  },
  {
    icon: AlertCircle,
    title: "NetSuite support does not cover your customizations.",
    description:
      "Oracle NetSuite support handles the platform. If the issue lives in a SuiteScript, a workflow, or an integration your implementation partner built, the answer is to contact whoever built it. That team is rarely still available.",
  },
  {
    icon: RefreshCcw,
    title: "Every case starts from scratch.",
    description:
      "No context carries between tickets. The agent on your current case has no knowledge of the case from six months ago. Re-explaining account history, custom setup, and prior attempts is the cost of the shared-resource model.",
  },
];

const WHAT_WE_DO = [
  {
    icon: MessageSquare,
    title: "Direct access to the person fixing it",
    description:
      "No Tier 1 triage, no account manager relay, no ticket routing. You reach the consultant who will resolve the issue and communicate directly throughout.",
  },
  {
    icon: Zap,
    title: "Same-day response on active issues",
    description:
      "When something breaks in your production account, it gets treated as urgent. We respond the same business day and give you a timeline before we go silent.",
  },
  {
    icon: ShieldCheck,
    title: "Coverage across the full account",
    description:
      "Platform questions, SuiteScript issues, workflow failures, integration breaks, saved search errors, PDF template problems, and administration changes. Not just the standard-functionality tier.",
  },
  {
    icon: Award,
    title: "Retained account knowledge",
    description:
      "We build context on your account over time. Your scripts, your processes, your known issues, your history. Every request benefits from what we already know about your environment.",
  },
];

const HOW_IT_WORKS = [
  {
    step: "01",
    title: "We review your account",
    description:
      "Before we start, we review your existing scripts, workflows, integrations, and known issues. You do not need to document everything; we read the account directly.",
  },
  {
    step: "02",
    title: "You bring work as it surfaces",
    description:
      "No scope document per request. Issues, configuration changes, new development, and optimizations come in as the account generates them, and we address them in sequence.",
  },
  {
    step: "03",
    title: "Sandbox-first deployment",
    description:
      "Every change is built and tested in your Sandbox account before it touches Production. No guessing in live, no rollback surprises.",
  },
];

const WHY_SP = [
  {
    icon: ShieldCheck,
    title: "NetSuite-Certified",
    description:
      "SuiteCloud Developer II and Administrator Professional certifications. Verified platform credentials for both the development and administration layers.",
  },
  {
    icon: Users,
    title: "Direct Access",
    description:
      "You communicate with the person doing the work. No account manager as an intermediary, no ticket system that loses context between updates.",
  },
  {
    icon: Award,
    title: "Context That Accumulates",
    description:
      "The more work we do in your account, the faster each subsequent request goes. Context does not reset between engagements.",
  },
  {
    icon: Clock,
    title: "Month-to-Month Engagement",
    description:
      "No annual contract. Engagements run month-to-month so you can scale up, scale down, or exit based on what the account actually needs.",
  },
];

const FAQ = [
  {
    question: "What does NetSuite's own support actually cover?",
    answer:
      "NetSuite support covers platform behavior: confirmed bugs in standard functionality, questions about how standard features work, and escalation of defects to Oracle engineering. It does not cover SuiteScript customizations, third-party integrations, workflow logic built by your implementation partner, or configuration decisions your team made during implementation. Most day-to-day support needs in a live account fall in the customization layer, not the platform layer.",
  },
  {
    question: "How quickly do you respond to issues?",
    answer:
      "For active issues in a production account, same business day. For routine configuration requests or non-urgent development, within one to two business days. Response time is part of the engagement agreement, not a best-effort commitment.",
  },
  {
    question: "Can you take over from NetSuite support entirely?",
    answer:
      "For the customization and configuration layer, yes. For confirmed platform bugs that require Oracle engineering involvement, we identify the bug, document it, and guide you through the NetSuite support submission. We cannot submit platform defects internally the way Oracle can, but we can handle everything that sits above the platform.",
  },
  {
    question: "What types of issues do you handle most often?",
    answer:
      "SuiteScript errors and governance failures, workflow conditions that stopped firing correctly, saved search formulas returning wrong results, integration connections that broke after a NetSuite version upgrade, PDF templates that render incorrectly, user access and role issues, and configuration changes that need testing before Production deployment.",
  },
  {
    question: "Is there a minimum commitment?",
    answer:
      "We typically start with a three-month engagement. Three months is enough time to stabilize the highest-priority issues and establish an ongoing working rhythm. Most clients continue month-to-month from there.",
  },
];

export const metadata: Metadata = {
  title: "Alternative to NetSuite Support",
  description:
    "Third-party NetSuite consultants who respond faster, know your account, and cover the customizations and integrations that Oracle support does not handle.",
  alternates: { canonical: "/netsuite-support-alternative" },
  openGraph: {
    title: "Alternative to NetSuite Support",
    description:
      "Third-party NetSuite consultants who respond faster, know your account, and cover the customizations and integrations that Oracle support does not handle.",
    url: `${SITE_URL}/netsuite-support-alternative`,
    type: "website",
    images: [{ url: `${SITE_URL}/og-default.png`, width: 1200, height: 630 }],
  },
};

export default function SupportAlternativePage() {
  return (
    <main className="pt-32 pb-24 sm:pt-40 sm:pb-32">
      <BreadcrumbJsonLd
        items={[
          { name: "Home", url: SITE_URL },
          { name: "NetSuite Support Alternative", url: `${SITE_URL}/netsuite-support-alternative` },
        ]}
      />
      <FaqJsonLd items={FAQ} />
      <ServiceJsonLd
        name="NetSuite Support Alternative"
        description="Third-party NetSuite support covering the full account: SuiteScript, workflows, integrations, administration, and configuration, with direct access and same-day response."
        url={`${SITE_URL}/netsuite-support-alternative`}
        serviceType="NetSuite Support"
      />

      <div className="mx-auto max-w-3xl px-6 lg:px-8">
        <SectionHeading
          as="h1"
          eyebrow="Support Alternative"
          title="A Better Alternative to NetSuite Customer Support"
          subtitle="Oracle NetSuite support handles the platform. Your scripts, workflows, integrations, and customizations are outside that scope. That is where most live accounts spend their actual support time."
          align="left"
        />

        <div className="mt-6 rounded-2xl border border-brand-100 bg-white p-5 shadow-soft">
          <LeadFormLight />
        </div>
        <p className="mt-3 text-xs text-brand-400">NetSuite-certified · Same-day response · Direct access · Covers your full account</p>

        <p className="mt-3 text-xs text-brand-300">Last updated August 2026</p>

        <div className="mt-6 rounded-2xl border-l-4 border-accent bg-brand-50/50 p-5">
          <p className="text-xs font-semibold uppercase tracking-wide text-accent mb-2">Quick answer</p>
          <p className="text-sm text-brand-700 leading-relaxed">
            An alternative to NetSuite support is a certified third-party consulting firm that
            handles the support and development needs Oracle&apos;s own support tiers do not cover.
            NetSuite&apos;s standard support handles platform bugs, standard feature questions, and
            escalation to Oracle engineering. It does not cover SuiteScript customizations,
            third-party integrations, workflow logic built during implementation, or configuration
            specific to how your account was set up. A third-party alternative fills that gap:
            direct access to a certified consultant who knows your account, same-day response on
            active production issues, and coverage across the full account rather than only the
            standard-functionality tier. For most live accounts two or more years past go-live,
            the customization layer generates more support work than the platform itself, making a
            third-party firm the practical choice.
          </p>
        </div>

        <p className="mt-6 text-sm text-brand-400">
          NetSuite support is designed for the platform layer. It handles confirmed bugs, standard
          feature questions, and escalation to Oracle engineering. For everything built on top of
          the platform, including the scripts, workflows, integrations, and configuration that make
          your account specific to your business, support points back to whoever built it. In most
          live accounts, that team is no longer engaged. SuitePacific fills that gap.
        </p>

        {/* Pain points */}
        <div className="mt-14" data-section="pain-points">
          <h2 className="text-lg font-semibold text-brand-900 mb-6">
            Why does NetSuite support stop working for live accounts?
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
        </div>

        {/* What we do */}
        <div className="mt-14" data-section="what-we-do">
          <h2 className="text-lg font-semibold text-brand-900 mb-1">What does an alternative to NetSuite support look like?</h2>
          <p className="text-sm text-brand-400 mb-6">
            A third-party support engagement covers the full account, not just the standard-functionality tier.
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            {WHAT_WE_DO.map((item) => (
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

        {/* How it works */}
        <div className="mt-14" data-section="how-it-works">
          <h2 className="text-lg font-semibold text-brand-900 mb-6">How does a third-party NetSuite support engagement start?</h2>
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

        {/* Mid-page CTA */}
        <div className="mt-10 rounded-2xl border border-brand-100 bg-white p-5 shadow-soft">
          <p className="text-sm font-semibold text-brand-900 mb-1">Tired of waiting on tickets?</p>
          <p className="text-sm text-brand-400 mb-4">
            Tell us what your account needs. We review the situation and propose how an engagement
            would work for your specific setup.
          </p>
          <LeadFormLight />
        </div>

        {/* Why SuitePacific */}
        <div className="mt-14" data-section="why-suitepacific">
          <h2 className="text-lg font-semibold text-brand-900 mb-6">Why do companies choose SuitePacific over NetSuite support?</h2>
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
              explains how ongoing third-party engagements are structured after implementation.
            </li>
            <li className="text-sm text-brand-400">
              <Link href="/netsuite-acs-alternative" className="text-accent hover:underline">
                NetSuite ACS alternative
              </Link>{" "}
              covers the specific gaps in Advanced Customer Support that third-party firms address.
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
          <p className="text-sm font-semibold text-brand-900 mb-1">Done evaluating your options?</p>
          <p className="text-sm text-brand-400 mb-4">
            Tell us what your account needs and what kinds of issues you deal with most often.
            We will explain how an engagement would work for your specific setup.
          </p>
          <LeadFormLight />
        </div>
      </div>
    </main>
  );
}

import type { Metadata } from "next";
import Link from "next/link";
import {
  ClipboardList, Eye, ShieldCheck, Gauge, Workflow, Users,
  AlertCircle, HelpCircle, Database,
  Award, Zap,
} from "lucide-react";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Card } from "@/components/ui/Card";
import { IconBadge } from "@/components/ui/IconBadge";
import { BreadcrumbJsonLd, FaqJsonLd, ServiceJsonLd, OrganizationJsonLd, VideoObjectJsonLd } from "@/components/seo/JsonLd";
import { ServiceFaqSection } from "@/components/ui/ServiceFaqSection";
import { LeadFormLight } from "@/components/sections/LeadFormLight";
import { SITE_URL } from "@/lib/content";

const PAIN_POINTS = [
  {
    icon: AlertCircle,
    title: "You inherited an account and don't know what's safe to change.",
    description:
      "A previous developer or implementation partner built the account. Documentation is thin or nonexistent. Before touching anything, you need to know what is actually there and what is still active.",
  },
  {
    icon: HelpCircle,
    title: "Things work, but you're not sure they work correctly.",
    description:
      "The account is live and in use, but you have low confidence in the quality of what was built. Saved searches return questionable numbers, workflows fire inconsistently, and nobody can explain why.",
  },
  {
    icon: Gauge,
    title: "You're planning a major change and need a clean baseline first.",
    description:
      "Before adding a new module, launching a major customization, or changing your team structure, you want a current-state picture of what the account actually looks like.",
  },
];

const AUDIT_AREAS = [
  {
    icon: ClipboardList,
    title: "Custom Fields and Forms",
    description:
      "Which custom fields carry data, which are empty, and which appear on no active form. Unused fields that inflate every record load.",
  },
  {
    icon: Gauge,
    title: "Saved Search Performance",
    description:
      "Searches that run without indexed criteria first, dashboard portlets with unbounded result sets, and searches referenced in workflows that run on every record save.",
  },
  {
    icon: Database,
    title: "Script Deployments",
    description:
      "Active versus inactive deployments, execution status and recent error logs, governance unit consumption per script, and overlap with workflows doing the same work.",
  },
  {
    icon: Workflow,
    title: "Workflow Configuration",
    description:
      "Entry conditions that are broader than intended, branches with no exit, conditions that overlap with User Event scripts, and workflows still running for retired processes.",
  },
  {
    icon: Users,
    title: "Roles and Permissions",
    description:
      "Whether roles follow least-privilege principles, which users have administrator-level access, and whether employee offboarding left inactive accounts with open access.",
  },
  {
    icon: ShieldCheck,
    title: "Integration Health",
    description:
      "Active integrations and their current error rates, scheduled scripts that process external data, and authentication tokens approaching expiry.",
  },
];

const HOW_IT_WORKS = [
  {
    step: "01",
    title: "We review before you provide any direction",
    description:
      "We work from the account directly, not from your interpretation of it. This gives us an objective picture of what was actually built versus what you were told was built.",
  },
  {
    step: "02",
    title: "Findings documented with severity",
    description:
      "Each finding is classified as critical (likely causing active problems), high (will cause problems as the account grows), or advisory (optimization opportunities). Nothing is flagged without a clear explanation.",
  },
  {
    step: "03",
    title: "Written report, not just a conversation",
    description:
      "You receive a structured written report you can act on independently, share with leadership, or hand to another developer. The findings are yours, not locked in someone's head.",
  },
];

const WHY_SP = [
  {
    icon: ShieldCheck,
    title: "NetSuite-Certified",
    description:
      "NetSuite SuiteCloud Developer II and Administrator Professional certifications. We know what a well-configured account looks like because we build and maintain them.",
  },
  {
    icon: Eye,
    title: "Objective Assessment",
    description:
      "We review the account as it exists, not as it was described to us. That distinction matters when accounts were built by people who are no longer available to explain their decisions.",
  },
  {
    icon: Zap,
    title: "Fast Turnaround",
    description:
      "Most health check engagements complete within five to seven business days. You have a written report before the end of the following week.",
  },
  {
    icon: Award,
    title: "No Upsell Pressure",
    description:
      "The health check is a fixed-scope deliverable. If the findings suggest remediation work, we scope that separately. You are not required to engage us for anything beyond the assessment.",
  },
];

const FAQ = [
  {
    question: "How long does the health check take?",
    answer:
      "Most accounts complete in five to seven business days. Larger accounts with many years of customization history may take slightly longer. We give you a specific timeline at the start of the engagement.",
  },
  {
    question: "What do you need from us to start?",
    answer:
      "Administrator access to your NetSuite account and a brief intake call to understand what is prompting the review. We do the rest from the account directly.",
  },
  {
    question: "What does the deliverable look like?",
    answer:
      "A structured written report covering each audit area, with specific findings, severity classifications, and recommendations. Format is a detailed PDF or shared document, not a slide deck.",
  },
  {
    question: "Is the health check different from account optimization?",
    answer:
      "Yes. The health check is a pure assessment: we review, document, and report. Account optimization is the remediation work that follows. Some clients start with the health check to understand what they are dealing with before committing to a cleanup engagement.",
  },
  {
    question: "What if the findings are more serious than expected?",
    answer:
      "We discuss the findings with you before closing the engagement. If the account needs substantial remediation, we scope that separately with your report as the starting point. You always have the option to take the findings elsewhere.",
  },
];

export const metadata: Metadata = {
  title: "NetSuite Health Check and System Audit",
  description:
    "NetSuite health check and system audit for live accounts: independent review of custom fields, scripts, workflows, saved searches, roles, and integrations, with a written findings report.",
  alternates: { canonical: "/netsuite-health-check" },
  openGraph: {
    title: "NetSuite Health Check and System Audit",
    description: "Independent NetSuite account review covering scripts, workflows, custom fields, saved searches, roles, and integrations. Written findings report delivered within one week.",
    url: "https://suitepacific.com/netsuite-health-check",
    type: "website",
    images: [{ url: "https://suitepacific.com/og-default.png", width: 1200, height: 630 }],
  },
};

export default function NetSuiteHealthCheckPage() {
  return (
    <main className="pt-32 pb-24 sm:pt-40 sm:pb-32">
      <BreadcrumbJsonLd
        items={[
          { name: "Home", url: SITE_URL },
          { name: "NetSuite Health Check", url: `${SITE_URL}/netsuite-health-check` },
        ]}
      />
      <FaqJsonLd items={FAQ} />
      <ServiceJsonLd
        name="NetSuite Health Check and System Audit"
        description="Independent review of a live NetSuite account covering scripts, workflows, custom fields, saved searches, roles, and integrations, with a written findings report."
        url={`${SITE_URL}/netsuite-health-check`}
        serviceType="NetSuite Audit"
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
          eyebrow="NetSuite System Audit"
          title="NetSuite Health Check"
          subtitle="An independent review of your live NetSuite account, covering what was built, how well it was built, and what needs attention. Delivered as a written report within one week."
          align="left"
        />

        <div className="mt-6 rounded-2xl border border-brand-100 bg-white p-5 shadow-soft">
          <LeadFormLight />
        </div>
        <p className="mt-3 text-xs text-brand-400">NetSuite-certified · Written report within 5-7 days · Fixed scope, fixed cost · No upsell obligation</p>

        <p className="mt-6 text-sm text-brand-400">
          A NetSuite health check is a structured review of your live account by someone who did
          not configure it. We look at what exists, what is actually in use, and where the account
          has accumulated risk or technical debt. The result is a written findings report you can
          act on, share with your team, or use as the basis for a remediation project.
        </p>

        {/* Pain Points */}
        <div className="mt-14" data-section="pain-points">
          <h2 className="text-lg font-semibold text-brand-900 mb-6">Common situations that bring people here</h2>
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

        {/* What we audit */}
        <div className="mt-14" data-section="audit-areas">
          <h2 className="text-lg font-semibold text-brand-900 mb-1">What the health check covers</h2>
          <p className="text-sm text-brand-400 mb-6">
            We review across six areas systematically, regardless of which one prompted the review.
            Problems in one area frequently originate in another.
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            {AUDIT_AREAS.map((item) => (
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
          <h2 className="text-lg font-semibold text-brand-900 mb-6">How the engagement works</h2>
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

        {/* Why SuitePacific */}
        <div className="mt-14" data-section="why-suitepacific">
          <h2 className="text-lg font-semibold text-brand-900 mb-6">Why SuitePacific</h2>
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

        {/* Related services */}
        <div className="mt-10 rounded-2xl border border-brand-100 bg-brand-50/30 p-5 sm:p-6">
          <p className="text-sm font-semibold text-brand-900 mb-3">After the health check</p>
          <ul className="space-y-2.5">
            <li className="text-sm text-brand-400">
              Not sure what{" "}
              <Link href="/netsuite-technical-debt" className="text-accent hover:underline">
                NetSuite technical debt
              </Link>{" "}
              looks like in a live account? That page covers the five layers where it accumulates and what each one costs in practice.
            </li>
            <li className="text-sm text-brand-400">
              <Link href="/netsuite-account-optimization" className="text-accent hover:underline">
                Account Optimization
              </Link>{" "}
              is the remediation engagement for accounts where the health check finds accumulated technical debt.
            </li>
            <li className="text-sm text-brand-400">
              <Link href="/netsuite-implementation-rescue" className="text-accent hover:underline">
                Implementation Rescue
              </Link>{" "}
              covers the more extensive work required when an account was configured incorrectly from the start.
            </li>
            <li className="text-sm text-brand-400">
              <Link href="/netsuite-post-go-live-support" className="text-accent hover:underline">
                Post-Go-Live Support
              </Link>{" "}
              is the ongoing engagement for accounts that are in good shape and need a dedicated technical team going forward.
            </li>
            <li className="text-sm text-brand-400">
              <Link href="/netsuite-fsm-support" className="text-accent hover:underline">
                NetSuite FSM Support
              </Link>{" "}
              covers Field Service Management-specific findings: sync failures, bundle update issues, configuration problems, and mobile app behavior.
            </li>
          </ul>
        </div>

        <ServiceFaqSection items={FAQ} />
      </div>
    </main>
  );
}

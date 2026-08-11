import type { Metadata } from "next";
import Link from "next/link";
import {
  RefreshCcw,
  ShieldCheck,
  Users,
  Award,
  Clock,
  BarChart2,
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

const WHAT_IS_INCLUDED = [
  {
    icon: Zap,
    title: "Ongoing development and scripting",
    description:
      "New SuiteScript, workflow modifications, saved search development, and integration maintenance. Work that surfaces month to month in a live account, handled as it comes in rather than scoped per project.",
  },
  {
    icon: ShieldCheck,
    title: "Administration and configuration",
    description:
      "Role updates, form layouts, custom fields, subsidiary configuration, and access management. The ongoing administration work that accumulates in any active account.",
  },
  {
    icon: BookOpen,
    title: "Break-fix and troubleshooting",
    description:
      "Script errors, workflow failures, saved search formula issues, integration breaks, and PDF template problems. Resolved within the retainer without additional scoping.",
  },
  {
    icon: RefreshCcw,
    title: "Version upgrade preparation",
    description:
      "Before each twice-yearly NetSuite upgrade, we review the release notes for your account, identify what may be affected, test in Sandbox, and fix anything that breaks before Production is upgraded.",
  },
  {
    icon: BarChart2,
    title: "Proactive issue identification",
    description:
      "Work we surface during regular engagement: scripts approaching governance limits, configurations creating edge cases, integrations that have become fragile. Flagged before they become urgent.",
  },
  {
    icon: Clock,
    title: "Same-day response on active issues",
    description:
      "When something breaks in your production account, you get a same-day response with a timeline. Not a queue position, not a Tier 1 triage step.",
  },
];

const HOW_IT_WORKS = [
  {
    step: "01",
    title: "Account onboarding",
    description:
      "We start by reading your account directly: scripts, workflows, integrations, configurations, and known issues. You do not need to produce documentation; we review the system as it exists.",
  },
  {
    step: "02",
    title: "Monthly retainer covers all work",
    description:
      "Development, administration, break-fix, and upgrade preparation all sit under the retainer. No per-task scoping, no project proposals for routine work. You bring the work as it surfaces.",
  },
  {
    step: "03",
    title: "Sandbox-first for all changes",
    description:
      "Every change is built and tested in your Sandbox account before it touches Production. No guessing in a live account, no surprises when a deployment goes wrong.",
  },
];

const WHY_MANAGED = [
  {
    icon: BarChart2,
    title: "Predictable cost",
    description:
      "A fixed monthly retainer versus unpredictable per-project billing. Accounts know what they will spend on NetSuite support each month.",
  },
  {
    icon: BookOpen,
    title: "Accumulated context",
    description:
      "The longer an engagement runs, the more the consultant knows about your account. The tenth month of a retainer is faster and more accurate than the first month of a new project.",
  },
  {
    icon: ShieldCheck,
    title: "Consistent quality",
    description:
      "Managed support means the same person, with the same credentials, who knows your account handles every request. No rotating resources, no re-explaining context.",
  },
];

const WHY_SP = [
  {
    icon: ShieldCheck,
    title: "NetSuite-Certified",
    description:
      "SuiteCloud Developer II and Administrator Professional certifications. Managed support from consultants with verified platform credentials.",
  },
  {
    icon: Users,
    title: "Direct Access",
    description:
      "You communicate directly with the consultant managing your account. No account manager relay, no ticket system between you and the work.",
  },
  {
    icon: Award,
    title: "Retained Account Context",
    description:
      "Context accumulates over the engagement. Your account history, your scripts, your edge cases, your integrations. Every request benefits from what we already know.",
  },
  {
    icon: Clock,
    title: "Month-to-Month",
    description:
      "No annual lock-in. Retainers run month-to-month and scale with what the account actually needs. Scale up during heavy periods, scale down when things are stable.",
  },
];

const RETAINER_COMPARISON = [
  {
    aspect: "Scope per request",
    projectBased: "New scope document required for each task before work starts",
    retainer: "All routine work handled as it surfaces; no scope required per request",
  },
  {
    aspect: "Response on urgent issues",
    projectBased: "Scope approval needed before work can begin",
    retainer: "Addressed immediately within the retainer; no separate authorization",
  },
  {
    aspect: "Monthly cost",
    projectBased: "Unpredictable; varies with issue volume and task complexity",
    retainer: "Fixed monthly fee regardless of request volume within scope",
  },
  {
    aspect: "Account knowledge",
    projectBased: "Rebuilt per project; context does not carry across engagements",
    retainer: "Accumulates continuously; every request benefits from prior context",
  },
  {
    aspect: "Upgrade preparation",
    projectBased: "Requires a separate project scope each upgrade cycle",
    retainer: "Included; release review and Sandbox testing handled as part of regular coverage",
  },
  {
    aspect: "Contract structure",
    projectBased: "Statement of Work per project; each requires separate approval",
    retainer: "Month-to-month; no annual lock-in and no per-task authorization needed",
  },
];

const FAQ = [
  {
    question: "What is NetSuite managed support?",
    answer:
      "NetSuite managed support is an ongoing retainer engagement where a certified consulting firm handles all support, development, and administration work for a live account at a fixed monthly cost. Unlike project-based billing (where each task is scoped and priced separately) or standard NetSuite support (which covers only the platform layer), a managed support retainer covers the full account, including customizations, integrations, administration, and break-fix, as work surfaces month to month.",
  },
  {
    question: "How is managed support different from post-go-live support?",
    answer:
      "The terms are often used interchangeably. The distinction, where it exists, is emphasis. Post-go-live support often refers to the stabilization period immediately after an implementation ends: fixing what broke, cleaning up what was left incomplete, and stabilizing the account. Managed support describes the ongoing retainer model that continues beyond stabilization, covering the full range of development, administration, and upgrade preparation work a live account generates over time.",
  },
  {
    question: "What is not included in a managed support retainer?",
    answer:
      "Large new implementations are typically outside a managed support scope. If your account needs a net-new module implemented, a substantial integration built from scratch, or a full accounting structure redesign, that work is usually scoped and priced separately. Managed support covers the ongoing operational and maintenance work a live account generates, not net-new implementations of material scope.",
  },
  {
    question: "How does pricing work for managed support?",
    answer:
      "Managed support retainers are priced as a fixed monthly fee based on the scope of the account: the volume of customization, the number of active integrations, and the expected monthly work volume. The fixed monthly cost is predictable and does not vary with individual request volume within the agreed scope. Engagements are month-to-month; there is no annual contract requirement.",
  },
  {
    question: "Is there a minimum commitment for a managed support engagement?",
    answer:
      "We start with a three-month engagement. Three months is enough time to complete a proper onboarding, stabilize the highest-priority issues, and establish the working rhythm of the account. Most accounts continue month-to-month after the initial period. There is no long-term lock-in.",
  },
];

export const metadata: Metadata = {
  title: "NetSuite Managed Support: Monthly Retainer",
  description:
    "Ongoing NetSuite managed support at a fixed monthly retainer: development, administration, break-fix, and upgrade preparation from certified consultants with direct access.",
  alternates: { canonical: "/netsuite-managed-support" },
  openGraph: {
    title: "NetSuite Managed Support: Monthly Retainer",
    description:
      "Ongoing NetSuite managed support at a fixed monthly retainer: development, administration, break-fix, and upgrade preparation from certified consultants with direct access.",
    url: `${SITE_URL}/netsuite-managed-support`,
    type: "website",
    images: [{ url: `${SITE_URL}/og-default.png`, width: 1200, height: 630 }],
  },
};

export default function NetSuiteManagedSupportPage() {
  return (
    <main className="pt-32 pb-24 sm:pt-40 sm:pb-32">
      <BreadcrumbJsonLd
        items={[
          { name: "Home", url: SITE_URL },
          { name: "NetSuite Managed Support", url: `${SITE_URL}/netsuite-managed-support` },
        ]}
      />
      <FaqJsonLd items={FAQ} />
      <ServiceJsonLd
        name="NetSuite Managed Support"
        description="Ongoing NetSuite managed support retainer covering development, administration, break-fix, and version upgrade preparation at a fixed monthly cost."
        url={`${SITE_URL}/netsuite-managed-support`}
        serviceType="NetSuite Support"
      />

      <div className="mx-auto max-w-3xl px-6 lg:px-8">
        <SectionHeading
          as="h1"
          eyebrow="Managed Support"
          title="NetSuite Managed Support: One Monthly Retainer, Full Coverage"
          subtitle="A fixed monthly engagement that covers development, administration, break-fix, and version upgrade preparation. No per-task scoping, no project proposals for routine work, no surprises in your monthly cost."
          align="left"
        />

        <div className="mt-6 rounded-2xl border border-brand-100 bg-white p-5 shadow-soft">
          <LeadFormLight />
        </div>
        <p className="mt-3 text-xs text-brand-400">NetSuite-certified · Fixed monthly retainer · Direct access · Month-to-month</p>

        <p className="mt-3 text-xs text-brand-300">Last updated August 2026</p>

        <div className="mt-6 rounded-2xl border-l-4 border-accent bg-brand-50/50 p-5">
          <p className="text-xs font-semibold uppercase tracking-wide text-accent mb-2">Quick answer</p>
          <p className="text-sm text-brand-700 leading-relaxed">
            NetSuite managed support is an ongoing monthly retainer where a certified consulting
            firm handles all support, development, and administration for a live NetSuite account
            at a predictable fixed cost. The retainer covers development (SuiteScript, workflows,
            integrations), administration (roles, configuration, custom fields), break-fix (script
            errors, workflow failures, integration breaks), and version upgrade preparation (Sandbox
            testing before each twice-yearly upgrade). Unlike per-project billing, where each task
            requires a separate scope and proposal, a managed retainer means routine work is handled
            as it surfaces. Unlike Oracle NetSuite support, managed support covers the full
            customization layer. Engagements run month-to-month, scale with the account, and provide
            direct access to the consultant who knows your account history across every request.
          </p>
        </div>

        <p className="mt-6 text-sm text-brand-400">
          A live NetSuite account generates continuous work: scripts that need updates, workflows
          that need modification, integrations that break after a platform upgrade, administration
          changes as the business evolves. Managed support covers all of it under a single monthly
          retainer, with the same certified consultant, who knows your account, doing the work.
        </p>

        {/* What is included */}
        <div className="mt-14" data-section="what-is-included">
          <h2 className="text-lg font-semibold text-brand-900 mb-6">What does a NetSuite managed support retainer cover?</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            {WHAT_IS_INCLUDED.map((item) => (
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
          <h2 className="text-lg font-semibold text-brand-900 mb-6">How does a NetSuite managed support engagement work?</h2>
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

        {/* Why managed over project-based */}
        <div className="mt-14" data-section="why-managed">
          <h2 className="text-lg font-semibold text-brand-900 mb-1">Why does a managed services retainer work better than project-by-project billing for NetSuite support?</h2>
          <p className="text-sm text-brand-400 mb-6">
            Project-based billing works well for implementations. For ongoing NetSuite managed services, it introduces friction that slows down routine work.
          </p>
          <div className="overflow-x-auto rounded-2xl border border-brand-100 mb-6">
            <table className="w-full text-sm min-w-[520px]">
              <thead>
                <tr className="border-b border-brand-100 bg-brand-50/50">
                  <th className="text-left p-4 font-semibold text-brand-900 w-1/3"></th>
                  <th className="text-left p-4 font-semibold text-brand-400">Project-based billing</th>
                  <th className="text-left p-4 font-semibold text-accent">Managed support retainer</th>
                </tr>
              </thead>
              <tbody>
                {RETAINER_COMPARISON.map((row, i) => (
                  <tr key={row.aspect} className={i < RETAINER_COMPARISON.length - 1 ? "border-b border-brand-100" : ""}>
                    <td className="p-4 font-medium text-brand-700 align-top">{row.aspect}</td>
                    <td className="p-4 text-brand-400 align-top">{row.projectBased}</td>
                    <td className="p-4 text-brand-700 align-top">{row.retainer}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
            {WHY_MANAGED.map((item) => (
              <Card key={item.title} className="p-5 flex flex-col gap-3">
                <IconBadge icon={item.icon} />
                <h3 className="font-semibold text-brand-900 text-sm">{item.title}</h3>
                <p className="text-sm text-brand-400">{item.description}</p>
              </Card>
            ))}
          </div>
        </div>

        {/* Mid-page CTA */}
        <div className="mt-10 rounded-2xl border border-brand-100 bg-white p-5 shadow-soft">
          <p className="text-sm font-semibold text-brand-900 mb-1">Ready to move to a retainer model?</p>
          <p className="text-sm text-brand-400 mb-4">
            Tell us about your account and the types of work that surface most often. We will
            propose a retainer scope based on what your account actually needs.
          </p>
          <LeadFormLight />
        </div>

        {/* Why SuitePacific */}
        <div className="mt-14" data-section="why-suitepacific">
          <h2 className="text-lg font-semibold text-brand-900 mb-6">Why do companies choose SuitePacific for NetSuite managed support?</h2>
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
              covers how a managed support engagement begins after implementation ends.
            </li>
            <li className="text-sm text-brand-400">
              <Link href="/netsuite-support-alternative" className="text-accent hover:underline">
                Alternative to NetSuite support
              </Link>{" "}
              explains what a third-party managed engagement covers versus Oracle support.
            </li>
            <li className="text-sm text-brand-400">
              <Link href="/netsuite-certified-netsuite-support" className="text-accent hover:underline">
                NetSuite certified support
              </Link>{" "}
              covers why certification matters and what to look for when evaluating a managed support firm.
            </li>
            <li className="text-sm text-brand-400">
              <Link href="/blog/netsuite-support-partner-evaluation" className="text-accent hover:underline">
                How to evaluate a NetSuite support partner
              </Link>{" "}
              covers the full checklist for comparing firms before committing to a retainer.
            </li>
          </ul>
        </div>

        <ServiceFaqSection items={FAQ} />

        <div className="mt-10 rounded-2xl border border-brand-100 bg-white p-5 shadow-soft">
          <p className="text-sm font-semibold text-brand-900 mb-1">Ready to move to a managed support retainer?</p>
          <p className="text-sm text-brand-400 mb-4">
            Tell us about your account and the types of work that surface most often. We will
            propose a retainer scope that matches what your account actually needs.
          </p>
          <LeadFormLight />
        </div>
      </div>
    </main>
  );
}

import type { Metadata } from "next";
import Link from "next/link";
import {
  Code2,
  Workflow,
  Database,
  Search,
  Plug,
  AlertCircle,
  Clock,
  TrendingDown,
  FileWarning,
  ClipboardList,
  ArrowRight,
  CheckCircle2,
} from "lucide-react";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Card } from "@/components/ui/Card";
import { IconBadge } from "@/components/ui/IconBadge";
import { BreadcrumbJsonLd, FaqJsonLd, ServiceJsonLd, OrganizationJsonLd } from "@/components/seo/JsonLd";
import { ServiceFaqSection } from "@/components/ui/ServiceFaqSection";
import { LeadFormLight } from "@/components/sections/LeadFormLight";
import { LeadForm } from "@/components/sections/LeadForm";
import { SITE_URL } from "@/lib/content";

const DEBT_LAYERS = [
  {
    icon: Code2,
    title: "Scripts",
    description:
      "Deployed scripts that nobody can explain. Governance limits hit on high-volume transactions because consumption was never audited. SuiteScript 1.0 code still running because migration was deferred indefinitely. Scripts built for a temporary fix that became permanent.",
    examples: [
      "User Event scripts with no inline comments and no documentation",
      "Scheduled scripts running nightly for a process that was discontinued",
      "Scripts approaching governance limits on Sales Orders, causing slow saves",
      "Duplicate logic between two scripts on the same record type",
    ],
  },
  {
    icon: Workflow,
    title: "Workflows",
    description:
      "Entry conditions broader than intended, evaluating on every record save regardless of what changed. Workflows for retired business processes never deactivated. Branches that reach dead ends. Overlap with scripts doing the same work on the same trigger.",
    examples: [
      "Approval workflow evaluating on every edit because entry conditions were never set",
      "Notification workflow for a department that no longer exists",
      "Workflow and User Event script both setting the same field on record save",
      "Branch logic reaching a state with no defined next step",
    ],
  },
  {
    icon: Database,
    title: "Custom Fields and Records",
    description:
      "Fields created during implementation for a requirement that changed before go-live. Duplicate fields covering the same data built by different developers. Custom fields appearing on no active form and carrying data in fewer than 5% of records.",
    examples: [
      "Forty-plus custom fields on the Sales Order form, most unused in daily work",
      "Two fields storing the same information under different names",
      "Custom records holding data that was migrated from a legacy system and never used",
      "Fields that inflate every record load even when they carry no data",
    ],
  },
  {
    icon: Search,
    title: "Saved Searches",
    description:
      "Searches running without indexed criteria first, performing full-table scans inside dashboards on every load. Duplicate searches returning identical data from different parts of the account. Searches referenced in workflows whose criteria no longer reflect the actual business logic.",
    examples: [
      "Dashboard portlet running a full-table scan on every page load for every user",
      "Three saved searches returning the same open invoice data built at different times",
      "Workflow entry condition referencing a saved search whose criteria was last updated in 2023",
      "Result sets with no upper bound on reports that run nightly",
    ],
  },
  {
    icon: Plug,
    title: "Integrations and Documentation",
    description:
      "Integrations that fail silently on specific record types added after the integration was built. No documentation of why a customization was built the way it was. Workarounds that became permanent processes. No Sandbox test coverage for what breaks at each release.",
    examples: [
      "Integration syncing correctly for standard items but silently failing for kits added after go-live",
      "Celigo flow with no error notification; data discrepancy discovered months later",
      "Manual workaround for a workflow that was patched but never fully resolved",
      "Zero Sandbox pre-release testing; release-related script failures discovered by users",
    ],
  },
];

const HOW_IT_ACCUMULATES = [
  {
    icon: Clock,
    title: "Implementation closes before the account is fully optimized",
    description:
      "Implementation partners are scoped for go-live, not for cleanup. Scripts built during testing that were never reviewed for production efficiency. Workflows configured with broad entry conditions that were meant to be tightened after testing. Fields added for requirements that changed before the project closed. The engagement ended; the decisions stayed.",
  },
  {
    icon: TrendingDown,
    title: "The account evolves faster than it is maintained",
    description:
      "After go-live, business processes change. New record types are added. Staff turn over. Each change creates a gap between what the account was built for and what the business now needs. Without active maintenance, each gap is either worked around manually or addressed with a new customization layered on top of the old one.",
  },
  {
    icon: FileWarning,
    title: "No single owner of the technical layer",
    description:
      "An internal administrator manages day-to-day configuration. A contractor built the scripts. An implementation partner built the workflows. Each developer made decisions in isolation without full visibility into what the others built. The result is a technical layer with no coherent owner and no shared understanding of what is running and why.",
  },
];

const WHAT_IT_COSTS = [
  "Record saves slow down as governance units are consumed by scripts nobody knows are running",
  "Each NetSuite release causes unexpected script failures because no pre-release Sandbox testing happens",
  "New development takes longer because every change requires understanding an undocumented system",
  "Staff work around NetSuite rather than through it because the workarounds feel more reliable",
  "Integration discrepancies accumulate silently until a reconciliation surfaces data that has been wrong for months",
  "Developer time is spent diagnosing before fixing because nobody has a current-state picture of the account",
];

const FAQ = [
  {
    question: "What is NetSuite technical debt?",
    answer:
      "NetSuite technical debt is the accumulation of decisions made in a live NetSuite account that were acceptable at the time but whose cost compounds over time. It includes scripts that were never optimized for production, workflows with broader entry conditions than intended, custom fields that carry no data and appear on no active form, saved searches that run without indexed criteria, and integrations that partially fail silently. Technical debt is not the result of bad implementation work; it is the predictable outcome of an account that has evolved without active technical stewardship.",
  },
  {
    question: "How do I know if my NetSuite account has technical debt?",
    answer:
      "The most common indicators: record saves are noticeably slow on high-volume transaction types; scripts fail after NetSuite releases in ways that were not caught in Sandbox; new development requests take longer than expected because developers have to investigate the existing system before making changes; users have manual workarounds for processes that should be automated; and nobody on the team can produce a current-state list of what is deployed and active in the account. A formal NetSuite health check surfaces these issues systematically.",
  },
  {
    question: "How does NetSuite technical debt accumulate after a careful implementation?",
    answer:
      "Even well-executed implementations close with some technical debt because implementations are scoped for go-live, not for long-term account health. After the implementation partner disengages, the account evolves: new record types, new processes, new staff, new requirements. Each change is made in the context of what was needed at that moment, not in the context of the full account architecture. Over time, the gap between what the account was designed for and what the business now needs accumulates as technical debt.",
  },
  {
    question: "What is the difference between a NetSuite health check and a technical debt assessment?",
    answer:
      "A health check is the structured review that identifies and quantifies technical debt. The health check produces a prioritized list of findings across scripts, workflows, saved searches, custom fields, integrations, and documentation. Technical debt is the category of problem the health check finds. An account optimization or remediation engagement is how the debt is addressed after it has been identified.",
  },
  {
    question: "How do you prioritize which technical debt to fix first?",
    answer:
      "Priority follows impact: Critical items actively causing incorrect results in Production are addressed first. High-priority items carry meaningful risk but have not yet caused a visible problem. Standard maintenance items are inefficient or undocumented but not actively harmful. The sequencing within those categories depends on the business impact of each item, the effort required to fix it, and whether the fix has dependencies on other items. Clearing critical and high-priority items first stabilizes the account before cleanup work begins.",
  },
  {
    question: "Can technical debt be prevented in a live account?",
    answer:
      "Partially. The primary prevention mechanism is active technical stewardship: a partner who maintains ongoing context on the account, conducts pre-release Sandbox reviews before each NetSuite update, documents what is built and why, and flags when a new request is likely to create problems in the existing architecture. Technical debt cannot be eliminated entirely in a live account because business requirements continue to evolve. But its accumulation rate is significantly lower when there is a dedicated technical partner who understands the account over time.",
  },
  {
    question: "Does fixing technical debt require rebuilding the account?",
    answer:
      "Rarely. Most technical debt remediation involves targeted cleanup rather than rebuilds: deactivating scripts that are no longer needed, tightening workflow entry conditions, adding indexed criteria to slow saved searches, removing unused custom fields, and documenting what was built. Full rebuilds are necessary only when a core configuration is fundamentally wrong, which is a different problem from technical debt accumulation.",
  },
  {
    question: "What does a NetSuite technical debt remediation engagement look like?",
    answer:
      "The first step is always the assessment: a structured review of the account that identifies and prioritizes the debt across each layer. The second step is remediation in priority order: critical and high-priority items first, maintenance items after. The third step is documentation of the cleaned-up account state, establishing a baseline that ongoing support can maintain. The engagement typically runs over two to three months depending on the volume of findings.",
  },
];

export const metadata: Metadata = {
  title: "NetSuite Technical Debt",
  description:
    "NetSuite accounts accumulate technical debt after go-live: unused scripts, over-broad workflows, unindexed saved searches, undocumented customizations. SuitePacific audits and remediates technical debt in live NetSuite accounts.",
  alternates: { canonical: "/netsuite-technical-debt" },
  openGraph: {
    title: "NetSuite Technical Debt",
    description: "NetSuite accounts accumulate technical debt after go-live: unused scripts, over-broad workflows, unindexed saved searches, undocumented customizations. SuitePacific audits and remediates technical debt in live NetSuite accounts.",
    url: "https://suitepacific.com/netsuite-technical-debt",
    type: "website",
    images: [{ url: "https://suitepacific.com/og-default.png", width: 1200, height: 630 }],
  },
};

export default function NetSuiteTechnicalDebtPage() {
  return (
    <main className="pt-32 pb-24 sm:pt-40 sm:pb-32">
      <BreadcrumbJsonLd
        items={[
          { name: "Home", url: SITE_URL },
          { name: "NetSuite Technical Debt", url: `${SITE_URL}/netsuite-technical-debt` },
        ]}
      />
      <FaqJsonLd items={FAQ} />
      <ServiceJsonLd
        name="NetSuite Technical Debt Assessment and Remediation"
        description="Audit and remediation of accumulated technical debt in live NetSuite accounts: unused script deployments, over-broad workflow entry conditions, unindexed saved searches running in dashboards, unused custom fields, silently failing integrations, and undocumented customizations. Structured assessment producing a prioritized findings report across all five layers, followed by remediation in priority order."
        url={`${SITE_URL}/netsuite-technical-debt`}
        serviceType="NetSuite Consulting"
      />
      <OrganizationJsonLd />

      <div className="mx-auto max-w-3xl px-6 lg:px-8">
        <SectionHeading
          as="h1"
          eyebrow="Technical Debt"
          title="NetSuite Technical Debt: What It Is, How It Accumulates, and How to Address It"
          subtitle="Every live NetSuite account accumulates technical debt over time. Unused scripts, over-broad workflows, unindexed saved searches, undocumented customizations. Left unaddressed, debt compounds: each release is riskier, each new development takes longer, each problem is harder to diagnose."
          align="left"
        />

        <div className="mt-6 rounded-2xl border border-brand-100 bg-white p-5 shadow-soft">
          <LeadFormLight />
        </div>
        <p className="mt-3 text-xs text-brand-400">NetSuite-certified · Independent assessment · Prioritized findings · Month-to-month</p>
        <p className="mt-2 text-xs text-brand-300"><time dateTime="2026-08">Published August 2026</time></p>

        <div className="mt-6 rounded-2xl border-l-4 border-accent bg-brand-50/50 p-5">
          <p className="text-xs font-semibold uppercase tracking-wide text-accent mb-2">Quick answer</p>
          <p className="text-sm text-brand-700 leading-relaxed">
            NetSuite technical debt refers to the accumulated cost of decisions made in a live
            account that were acceptable at the time but compound over time. Common forms include
            SuiteScript deployments that were never reviewed for governance efficiency after
            go-live, workflows configured with broad entry conditions that were meant to be
            tightened after testing and never were, custom fields added for requirements that
            changed before launch and never removed, integrations built against the account as it
            existed at go-live and never updated as the business evolved, and saved searches with
            inefficient formulas that slow page loads under production data volumes. Technical debt
            is not the result of poor implementation work; it is the predictable outcome of a live
            account that keeps moving while documentation and maintenance work falls behind.
            SuitePacific assesses NetSuite technical debt through a structured account review,
            documents findings by severity, and prioritizes remediation work based on what creates
            the most operational risk or development friction.
          </p>
        </div>

        <p className="mt-6 text-sm text-brand-400">
          NetSuite technical debt is the accumulation of decisions made in a live account that were
          acceptable at the time but whose cost compounds over time. Scripts deployed during
          implementation that were never reviewed for production efficiency. Workflows configured with
          broad entry conditions that were meant to be tightened after testing and never were.
          Custom fields added for requirements that changed before go-live and never removed.
          Integrations that were built for the account as it was at go-live and never updated as
          the account evolved. Documentation that was promised and never written.
          Technical debt is not the result of poor implementation work. It is the predictable outcome
          of any account that has grown and evolved without active technical stewardship.
        </p>

        {/* What it costs */}
        <div className="mt-12" data-section="what-it-costs">
          <h2 className="text-lg font-semibold text-brand-900 mb-4">What does NetSuite technical debt actually cost?</h2>
          <div className="rounded-xl border border-brand-100 bg-white p-5 shadow-soft">
            <ul className="space-y-3">
              {WHAT_IT_COSTS.map((item) => (
                <li key={item} className="flex items-start gap-3 text-sm text-brand-700">
                  <AlertCircle className="h-4 w-4 text-amber-500 shrink-0 mt-0.5" />
                  {item}
                </li>
              ))}
            </ul>
          </div>
          <p className="mt-4 text-sm text-brand-400">
            None of these costs appear on an invoice. They show up as developer time, staff
            frustration, release incidents, and data problems that surface months after they started.
          </p>
        </div>

        {/* Five layers */}
        <div className="mt-14" data-section="debt-layers">
          <h2 className="text-lg font-semibold text-brand-900 mb-2">The five layers where NetSuite technical debt accumulates</h2>
          <p className="text-sm text-brand-400 mb-6">
            Technical debt in a NetSuite account is not concentrated in one place. It accumulates
            across five distinct layers, each with its own failure mode and its own audit approach.
          </p>
          <div className="space-y-4">
            {DEBT_LAYERS.map((layer) => (
              <Card key={layer.title} className="p-5">
                <div className="flex items-start gap-4 mb-3">
                  <IconBadge icon={layer.icon} />
                  <div>
                    <h3 className="font-semibold text-brand-900 text-sm">{layer.title}</h3>
                    <p className="mt-1 text-sm text-brand-400">{layer.description}</p>
                  </div>
                </div>
                <div className="ml-11">
                  <p className="text-xs font-semibold text-brand-600 mb-2">Common examples</p>
                  <ul className="space-y-1.5">
                    {layer.examples.map((example) => (
                      <li key={example} className="flex items-start gap-2 text-xs text-brand-400">
                        <CheckCircle2 className="h-3 w-3 text-brand-300 shrink-0 mt-0.5" />
                        {example}
                      </li>
                    ))}
                  </ul>
                </div>
              </Card>
            ))}
          </div>
        </div>

        {/* How it accumulates */}
        <div className="mt-14" data-section="how-it-accumulates">
          <h2 className="text-lg font-semibold text-brand-900 mb-6">Why does technical debt accumulate in every live NetSuite account?</h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
            {HOW_IT_ACCUMULATES.map((item) => (
              <Card key={item.title} className="p-5 flex flex-col gap-3">
                <IconBadge icon={item.icon} />
                <h3 className="font-semibold text-brand-900 text-sm">{item.title}</h3>
                <p className="text-sm text-brand-400">{item.description}</p>
              </Card>
            ))}
          </div>
        </div>

        {/* How to address it */}
        <div className="mt-14" data-section="how-to-address">
          <h2 className="text-lg font-semibold text-brand-900 mb-2">How is NetSuite technical debt addressed?</h2>
          <p className="text-sm text-brand-400 mb-6">
            Technical debt is addressed in three stages. Assessment first, remediation second,
            prevention ongoing. Skipping the assessment and going straight to remediation
            produces cleanup that is incomplete and sometimes counterproductive.
          </p>
          <div className="space-y-4">
            {[
              {
                step: "01",
                title: "Assessment: identify and classify the debt",
                body: "A structured review of the account across all five layers produces a written findings report with each item classified by severity: Critical, High, or Maintenance. Critical items are actively causing incorrect behavior in Production. High items carry meaningful risk that has not yet caused a visible problem. Maintenance items are inefficient or undocumented but not actively harmful. The assessment is the deliverable; it is not a sales pitch for a larger engagement.",
                link: { href: "/netsuite-health-check", label: "NetSuite health check" },
              },
              {
                step: "02",
                title: "Remediation: address findings in priority order",
                body: "Critical and high-priority items are addressed first. For most accounts this means: deactivating scripts that are no longer needed, tightening workflow entry conditions, adding indexed criteria to slow saved searches, documenting what was built and why. Maintenance items follow after the account is stabilized. Full rebuilds are rarely necessary; most technical debt remediation is targeted cleanup rather than reconstruction.",
                link: { href: "/netsuite-account-optimization", label: "NetSuite account optimization" },
              },
              {
                step: "03",
                title: "Prevention: ongoing stewardship that keeps debt from accumulating",
                body: "Technical debt cannot be eliminated permanently in an evolving account. The prevention mechanism is active technical stewardship: a partner who maintains ongoing context on the account, documents what is built and why, conducts pre-release Sandbox reviews before each NetSuite update, and flags when a new request is likely to create problems in the existing architecture.",
                link: { href: "/netsuite-care", label: "NetSuite Care plans" },
              },
            ].map((item) => (
              <div key={item.step} className="rounded-xl border border-brand-100 bg-white p-5 shadow-soft">
                <div className="flex items-start gap-4">
                  <span className="text-xs font-semibold text-accent bg-accent/10 rounded-full h-7 w-7 flex items-center justify-center shrink-0 mt-0.5">
                    {item.step}
                  </span>
                  <div>
                    <p className="font-semibold text-brand-900 text-sm">{item.title}</p>
                    <p className="mt-1.5 text-sm text-brand-400">{item.body}</p>
                    <Link href={item.link.href} className="mt-2.5 inline-flex items-center gap-1.5 text-xs font-medium text-accent hover:underline">
                      <ArrowRight className="h-3 w-3" />
                      {item.link.label}
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Health check bridge */}
        <div className="mt-10 rounded-xl border border-brand-100 bg-brand-50/40 p-5">
          <div className="flex items-start gap-4">
            <IconBadge icon={ClipboardList} />
            <div>
              <p className="font-semibold text-brand-900 text-sm">Not sure how much technical debt your account has?</p>
              <p className="mt-1.5 text-sm text-brand-400">
                A{" "}
                <Link href="/netsuite-health-check" className="text-accent hover:underline">
                  NetSuite health check
                </Link>{" "}
                is the structured assessment that identifies and quantifies technical debt across
                all five layers. It delivers a written findings report, prioritized by severity,
                in five to seven business days. The assessment is a fixed-scope engagement with
                a defined deliverable, not an open-ended consulting arrangement.
              </p>
            </div>
          </div>
        </div>

        {/* Related */}
        <div className="mt-10 rounded-2xl border border-brand-100 bg-brand-50/30 p-5 sm:p-6">
          <p className="text-sm font-semibold text-brand-900 mb-3">Related services</p>
          <ul className="space-y-3">
            {[
              {
                href: "/netsuite-health-check",
                label: "NetSuite Health Check",
                desc: "Structured assessment of your account across scripts, workflows, saved searches, custom fields, integrations, and documentation. Prioritized findings report in five to seven business days.",
              },
              {
                href: "/netsuite-account-optimization",
                label: "NetSuite Account Optimization",
                desc: "Remediation of identified technical debt: script cleanup, workflow tightening, saved search optimization, field cleanup, integration health, and documentation.",
              },
              {
                href: "/netsuite-care",
                label: "NetSuite Care: Ongoing Support",
                desc: "Monthly retainer that prevents technical debt from accumulating through active stewardship, release review, and documented account maintenance.",
              },
              {
                href: "/netsuite-partner-replacement",
                label: "NetSuite Partner Replacement",
                desc: "Inheriting technical debt from a previous partner is common. The transition process covers what the previous partner built and prioritizes what needs to be addressed.",
              },
            ].map((item) => (
              <li key={item.href}>
                <Link href={item.href} className="flex items-start gap-3 group">
                  <ArrowRight className="h-4 w-4 text-accent shrink-0 mt-0.5" />
                  <div>
                    <p className="text-sm font-medium text-brand-900 group-hover:text-accent transition-colors">{item.label}</p>
                    <p className="text-xs text-brand-400 mt-0.5">{item.desc}</p>
                  </div>
                </Link>
              </li>
            ))}
          </ul>
          <p className="text-sm font-semibold text-brand-900 mb-3 mt-6">Further reading</p>
          <ul className="space-y-2.5">
            {[
              { href: "/blog/netsuite-technical-debt", label: "What is NetSuite technical debt?", desc: "A detailed explanation of how technical debt accumulates in live NetSuite accounts and what it looks like across each layer." },
              { href: "/blog/netsuite-account-gets-harder-to-maintain", label: "Why your NetSuite account gets harder to maintain over time", desc: "The business-level pattern behind technical debt accumulation and why it compounds rather than stabilizing." },
              { href: "/blog/netsuite-technical-debt-audit", label: "How to audit NetSuite technical debt in your account", desc: "A practical guide for developers and administrators to review each layer of the account and classify findings by severity." },
              { href: "/blog/what-new-netsuite-partner-finds", label: "What your new NetSuite partner will find in your account", desc: "What a thorough onboarding review surfaces in inherited accounts and how it maps to the technical debt layers." },
            ].map((item) => (
              <li key={item.href} className="text-sm text-brand-400">
                <Link href={item.href} className="text-accent hover:underline">{item.label}</Link>{" "}
                {item.desc}
              </li>
            ))}
          </ul>
        </div>

        <ServiceFaqSection items={FAQ} />

        <div id="contact" className="mt-14 pt-10 border-t border-brand-50">
          <LeadForm />
        </div>
      </div>
    </main>
  );
}

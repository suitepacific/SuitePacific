import type { Metadata } from "next";
import Link from "next/link";
import {
  Cpu,
  BarChart2,
  Zap,
  CheckCircle2,
  ShieldCheck,
  Users,
  Clock,
  Award,
} from "lucide-react";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Card } from "@/components/ui/Card";
import { IconBadge } from "@/components/ui/IconBadge";
import { BreadcrumbJsonLd, FaqJsonLd, ServiceJsonLd } from "@/components/seo/JsonLd";
import { ServiceFaqSection } from "@/components/ui/ServiceFaqSection";
import { LeadFormLight } from "@/components/sections/LeadFormLight";
import { SITE_URL } from "@/lib/content";

const WHAT_IT_COVERS = [
  {
    icon: Cpu,
    title: "SuiteScript and customization review",
    description:
      "Every custom script in your account is reviewed for governance limit exposure, deprecated API usage, upgrade risk, and performance issues. Scripts that will break in the next release or are already consuming excessive governance units are flagged before they become urgent.",
  },
  {
    icon: Zap,
    title: "Workflow and automation audit",
    description:
      "SuiteFlow workflows are reviewed for overly broad entry conditions, redundant steps, conflicting transitions, and configurations that historically break after platform upgrades. Workflows that fire more often than intended are identified and documented.",
  },
  {
    icon: BarChart2,
    title: "Saved searches and dashboards",
    description:
      "Saved searches are reviewed for formula errors returning wrong results, missing filters causing performance problems, and broken joins after schema changes. Dashboard KPI portlets pulling from broken searches are flagged alongside the underlying search issue.",
  },
  {
    icon: CheckCircle2,
    title: "Configuration and governance review",
    description:
      "Account configuration is reviewed for role permission issues, unused custom fields consuming space, form layouts inconsistent with current processes, and subsidiary or currency settings that have drifted from the original implementation design.",
  },
];

const WHAT_IT_FINDS = [
  {
    title: "Scripts approaching governance limits",
    description: "Scheduled and Map/Reduce scripts consuming a high percentage of their governance budget, likely to fail under increased data volume.",
  },
  {
    title: "Deprecated API usage",
    description: "Scripts using NetSuite APIs that Oracle has deprecated or scheduled for removal, which will break silently after an upcoming upgrade.",
  },
  {
    title: "Workflow entry condition problems",
    description: "Workflows with entry conditions so broad they fire on every record save, or conditions so narrow they miss the records they were designed to catch.",
  },
  {
    title: "Saved search formula errors",
    description: "Saved searches using formulas that return incorrect results due to wrong field references, incorrect join types, or logic errors introduced during setup.",
  },
  {
    title: "Orphaned customizations",
    description: "Scripts, workflows, and fields that are no longer connected to any active business process but remain active and consuming resources.",
  },
  {
    title: "Configuration drift",
    description: "Role permissions, form layouts, and account settings that have diverged from the original implementation design in ways that create user experience or data quality problems.",
  },
];

const HOW_IT_WORKS = [
  {
    step: "01",
    title: "Account access and systematic review",
    description:
      "We connect to your NetSuite account and read scripts, workflows, saved searches, and configuration as they exist. No documentation required from you — we review the account directly. The review typically takes one to two business days depending on account complexity.",
  },
  {
    step: "02",
    title: "AI-assisted analysis and pattern recognition",
    description:
      "AI analyzes what we have collected, identifies risk patterns across your customizations, cross-references against known upgrade issues and governance limit thresholds, and generates a structured findings inventory. Issues that would take days to surface manually are identified systematically.",
  },
  {
    step: "03",
    title: "Prioritized findings report",
    description:
      "The deliverable is a written report with all findings ranked by severity, a specific recommended action for each issue, an estimated effort to resolve it, and a prioritized order of what to address first. Delivered within two to three business days after account access is provided.",
  },
];

const WHY_GET_ASSESSMENT = [
  {
    icon: ShieldCheck,
    title: "Know what you are inheriting",
    description:
      "Companies starting a new support engagement often discover significant technical debt from the original implementation. The assessment establishes a clear baseline before any retainer work begins.",
  },
  {
    icon: Zap,
    title: "Reduce upgrade risk",
    description:
      "NetSuite releases twice per year. Scripts using deprecated APIs and workflows with fragile configurations are most likely to break on upgrade day. The assessment identifies these before the upgrade arrives.",
  },
  {
    icon: Award,
    title: "Fixed scope, fixed deliverable",
    description:
      "The assessment is a one-time engagement with a defined scope and a written deliverable. No retainer required. The findings report stands on its own and can be used to prioritize work with any consulting firm.",
  },
  {
    icon: Clock,
    title: "Fast turnaround",
    description:
      "Two to three business days from account access to findings report. For accounts approaching an upgrade window or experiencing recurring issues, the assessment can be completed quickly enough to act on the findings before the next release.",
  },
];

const FAQ = [
  {
    question: "What does a NetSuite AI optimization assessment include?",
    answer:
      "The assessment covers four areas of a live NetSuite account: SuiteScript customizations (governance limit exposure, deprecated API usage, upgrade risk), SuiteFlow workflows (entry condition efficiency, redundant steps, upgrade fragility), saved searches and dashboards (formula errors, performance problems, broken joins), and account configuration (role permissions, custom fields, form layouts, subsidiary settings). The deliverable is a prioritized findings report with all issues identified, a recommended action for each, and an estimated resolution effort.",
  },
  {
    question: "How long does a NetSuite account assessment take?",
    answer:
      "Account review typically takes one to two business days depending on the number of active scripts, workflows, and saved searches in the account. The findings report is delivered within two to three business days of account access being provided. Total elapsed time from kickoff to report delivery is typically three to five business days.",
  },
  {
    question: "What is the deliverable from a NetSuite optimization assessment?",
    answer:
      "The deliverable is a written findings report. It lists every issue identified, categorized by area (scripts, workflows, searches, configuration), ranked by severity (critical, high, medium, low), with a specific recommended action and estimated effort for each. The report is structured so issues can be addressed in priority order, either independently or as the starting scope for an ongoing support engagement.",
  },
  {
    question: "Is the assessment a one-time engagement or the start of a retainer?",
    answer:
      "The assessment is a standalone, fixed-scope engagement. No retainer is required. The findings report belongs to you and can be used to guide work with any consulting firm. That said, most assessments identify enough issues to justify an ongoing engagement, and many clients move into a retainer after reviewing the findings. That decision comes after the report, not before.",
  },
  {
    question: "How is an AI-assisted assessment different from a standard account review?",
    answer:
      "A standard manual review depends on the reviewer spending time in each area of the account, which limits how many scripts, workflows, and searches can be reviewed in a given timeframe. AI-assisted analysis allows the full inventory of customizations to be processed systematically, cross-referenced against known risk patterns, and prioritized by severity before the human reviewer focuses their attention. The result is broader coverage with more consistent issue detection across the full account.",
  },
];

export const metadata: Metadata = {
  title: "NetSuite AI Optimization Assessment",
  description:
    "A structured AI-assisted review of your live NetSuite account. Identifies script risks, workflow inefficiencies, saved search errors, and configuration issues. Fixed-scope, one-time engagement with a prioritized findings report.",
  alternates: { canonical: "/netsuite-ai-optimization-assessment" },
  openGraph: {
    title: "NetSuite AI Optimization Assessment",
    description:
      "A structured AI-assisted review of your live NetSuite account. Identifies script risks, workflow inefficiencies, saved search errors, and configuration issues. Fixed-scope, one-time engagement with a prioritized findings report.",
    url: `${SITE_URL}/netsuite-ai-optimization-assessment`,
    type: "website",
    images: [{ url: `${SITE_URL}/og-default.png`, width: 1200, height: 630 }],
  },
};

export default function NetSuiteAiOptimizationAssessmentPage() {
  return (
    <main className="pt-32 pb-24 sm:pt-40 sm:pb-32">
      <BreadcrumbJsonLd
        items={[
          { name: "Home", url: SITE_URL },
          { name: "NetSuite AI Optimization Assessment", url: `${SITE_URL}/netsuite-ai-optimization-assessment` },
        ]}
      />
      <FaqJsonLd items={FAQ} />
      <ServiceJsonLd
        name="NetSuite AI Optimization Assessment"
        description="AI-assisted review of a live NetSuite account covering scripts, workflows, saved searches, and configuration. Delivers a prioritized findings report with recommended actions."
        url={`${SITE_URL}/netsuite-ai-optimization-assessment`}
        serviceType="NetSuite Consulting"
      />

      <div className="mx-auto max-w-3xl px-6 lg:px-8">
        <SectionHeading
          as="h1"
          eyebrow="AI Assessment"
          title="NetSuite AI Optimization Assessment"
          subtitle="A structured review of your live NetSuite account using AI-assisted analysis. Identifies script risks, workflow inefficiencies, saved search errors, and configuration issues accumulated since go-live."
          align="left"
        />

        <div className="mt-6 rounded-2xl border border-brand-100 bg-white p-5 shadow-soft">
          <LeadFormLight />
        </div>
        <p className="mt-3 text-xs text-brand-400">SuiteCloud Developer II certified · Fixed-scope engagement · Prioritized findings report · 2-3 business days</p>

        <p className="mt-3 text-xs text-brand-300">Last updated August 2026</p>

        <div className="mt-6 rounded-2xl border-l-4 border-accent bg-brand-50/50 p-5">
          <p className="text-xs font-semibold uppercase tracking-wide text-accent mb-2">Quick answer</p>
          <p className="text-sm text-brand-700 leading-relaxed">
            A NetSuite AI optimization assessment is a structured review of a live NetSuite
            account using AI-assisted analysis to identify problems that accumulate after
            go-live. The assessment covers four areas: SuiteScript customizations (governance
            limit exposure, deprecated APIs, upgrade risk), SuiteFlow workflows (inefficient
            entry conditions, redundant steps, upgrade fragility), saved searches and dashboards
            (formula errors, performance problems, missing filters), and account configuration
            (role permissions, custom field usage, form layouts). The deliverable is a
            prioritized findings report with issues ranked by severity, recommended actions,
            and estimated effort to fix. The assessment is a fixed-scope, one-time engagement
            with no retainer requirement, completed in two to three business days. Most accounts
            live two or more years have accumulated enough technical debt that the assessment
            findings justify several months of subsequent work.
          </p>
        </div>

        <p className="mt-6 text-sm text-brand-400">
          Live NetSuite accounts accumulate technical debt quietly. Scripts developed during
          implementation drift toward governance limits. Workflows built for one business
          process get repurposed for another. Saved searches return wrong results because
          a formula was never corrected. An AI-assisted assessment surfaces what has
          accumulated so it can be addressed in priority order.
        </p>

        {/* What it covers */}
        <div className="mt-14" data-section="what-it-covers">
          <h2 className="text-lg font-semibold text-brand-900 mb-6">What does a NetSuite AI optimization assessment cover?</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            {WHAT_IT_COVERS.map((item) => (
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

        {/* What it finds */}
        <div className="mt-14" data-section="what-it-finds">
          <h2 className="text-lg font-semibold text-brand-900 mb-1">What issues does a NetSuite account assessment typically find?</h2>
          <p className="text-sm text-brand-400 mb-6">
            The specific findings vary by account, but these categories appear consistently
            across live accounts that have been running for two or more years.
          </p>
          <div className="space-y-3">
            {WHAT_IT_FINDS.map((item) => (
              <div key={item.title} className="rounded-2xl border border-brand-100 bg-brand-50/30 p-4">
                <p className="font-semibold text-brand-900 text-sm">{item.title}</p>
                <p className="mt-1 text-sm text-brand-400">{item.description}</p>
              </div>
            ))}
          </div>
        </div>

        {/* How it works */}
        <div className="mt-14" data-section="how-it-works">
          <h2 className="text-lg font-semibold text-brand-900 mb-6">How does a NetSuite AI optimization assessment work?</h2>
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
          <p className="text-sm font-semibold text-brand-900 mb-1">Get a clear picture of your account&apos;s current state</p>
          <p className="text-sm text-brand-400 mb-4">
            Tell us how long your account has been live and the types of issues you
            have been seeing. We will explain what the assessment would cover for
            your specific setup.
          </p>
          <LeadFormLight />
        </div>

        {/* Why get an assessment */}
        <div className="mt-14" data-section="why-assessment">
          <h2 className="text-lg font-semibold text-brand-900 mb-6">Why do companies get a NetSuite account optimization assessment?</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            {WHY_GET_ASSESSMENT.map((item) => (
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
              <Link href="/netsuite-account-optimization" className="text-accent hover:underline">
                NetSuite account optimization
              </Link>{" "}
              covers ongoing optimization work that typically follows an assessment.
            </li>
            <li className="text-sm text-brand-400">
              <Link href="/netsuite-ai-integration" className="text-accent hover:underline">
                NetSuite AI integration
              </Link>{" "}
              covers the broader range of AI services available for live NetSuite accounts.
            </li>
            <li className="text-sm text-brand-400">
              <Link href="/blog/netsuite-account-performance" className="text-accent hover:underline">
                Why your NetSuite account feels slow and what actually fixes it
              </Link>{" "}
              identifies the most common performance root causes an assessment surfaces.
            </li>
            <li className="text-sm text-brand-400">
              <Link href="/netsuite-managed-support" className="text-accent hover:underline">
                NetSuite managed support
              </Link>{" "}
              covers the retainer engagement that many accounts move into after completing an assessment.
            </li>
          </ul>
        </div>

        <ServiceFaqSection items={FAQ} />

        <div className="mt-10 rounded-2xl border border-brand-100 bg-white p-5 shadow-soft">
          <p className="text-sm font-semibold text-brand-900 mb-1">Ready to see what is in your account?</p>
          <p className="text-sm text-brand-400 mb-4">
            Tell us how long your account has been live and what kinds of issues
            have been coming up. We will explain what an assessment would find
            for an account like yours.
          </p>
          <LeadFormLight />
        </div>
      </div>
    </main>
  );
}

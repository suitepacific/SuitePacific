import type { Metadata } from "next";
import Link from "next/link";
import {
  Cpu,
  BarChart2,
  FileText,
  Users,
  MessageSquare,
  Code,
  CheckCircle2,
  Zap,
  XCircle,
  Clock,
} from "lucide-react";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Card } from "@/components/ui/Card";
import { IconBadge } from "@/components/ui/IconBadge";
import { BreadcrumbJsonLd, FaqJsonLd, ServiceJsonLd, OrganizationJsonLd, VideoObjectJsonLd } from "@/components/seo/JsonLd";
import { ServiceFaqSection } from "@/components/ui/ServiceFaqSection";
import { LeadFormLight } from "@/components/sections/LeadFormLight";
import { SuitePacificCallout } from "@/components/sections/SuitePacificCallout";
import { SITE_URL } from "@/lib/content";

const SIX_AREAS = [
  {
    icon: Users,
    area: "Business processes",
    review: "Order-to-Cash, Procure-to-Pay, Finance, and Operations workflows",
    identify: "Where employees repeatedly read, classify, copy, or decide: the strongest AI automation candidates",
  },
  {
    icon: Code,
    area: "Existing customizations",
    review: "User Event scripts, Map/Reduce, Suitelets, RESTlets, workflows, saved searches",
    identify: "Where N/llm or N/documentCapture can enhance or replace parts of existing logic",
  },
  {
    icon: FileText,
    area: "Documents",
    review: "Vendor invoices, customer POs, receipts, shipping documents, order emails",
    identify: "Document extraction opportunities using NetSuite's N/documentCapture module",
  },
  {
    icon: BarChart2,
    area: "Data and reporting",
    review: "Saved searches, SuiteQL queries, workbooks, reports, recurring Excel exports",
    identify: "Questions employees ask repeatedly that AI could answer from live NetSuite data",
  },
  {
    icon: MessageSquare,
    area: "Support and operations",
    review: "Recurring support issues, workflow failures, unexplained script errors",
    identify: "AI-assisted troubleshooting that routes diagnosis findings to a consultant",
  },
  {
    icon: Cpu,
    area: "AI architecture",
    review: "NetSuite AI features, SuiteScript AI APIs, AI Connector Service availability",
    identify: "Which implementation path fits each opportunity: native NetSuite, SuiteScript, or external AI",
  },
];

const SCORE_EXAMPLES = [
  {
    opportunity: "Vendor invoice extraction",
    aiFit: "9/10",
    impact: "9/10",
    complexity: "4/10",
    recommendation: "Implement",
    pillClass: "bg-accent/10 text-accent",
  },
  {
    opportunity: "Customer PO to Sales Order",
    aiFit: "9/10",
    impact: "9/10",
    complexity: "5/10",
    recommendation: "Implement",
    pillClass: "bg-accent/10 text-accent",
  },
  {
    opportunity: "Natural-language reporting",
    aiFit: "8/10",
    impact: "8/10",
    complexity: "5/10",
    recommendation: "Pilot",
    pillClass: "bg-brand-100 text-brand-600",
  },
  {
    opportunity: "Script documentation generator",
    aiFit: "8/10",
    impact: "6/10",
    complexity: "2/10",
    recommendation: "Quick win",
    pillClass: "bg-brand-50 text-brand-500",
  },
  {
    opportunity: "Predictive sales forecasting",
    aiFit: "6/10",
    impact: "7/10",
    complexity: "9/10",
    recommendation: "Defer",
    pillClass: "bg-brand-50 text-brand-400",
  },
];

const HOW_IT_WORKS = [
  {
    step: "01",
    title: "Discovery session",
    description:
      "One structured call covering your business processes, active customizations, document workflows, reporting patterns, and recurring support issues. We map what exists before reviewing the account directly.",
  },
  {
    step: "02",
    title: "Account and process review",
    description:
      "We review your SuiteScripts, workflows, saved searches, and document-heavy processes. For each area, we identify specific opportunities where Oracle's AI APIs or an external AI model could deliver measurable improvement.",
  },
  {
    step: "03",
    title: "Findings and recommendations session",
    description:
      "We deliver the written report and walk through the scored opportunities, recommended implementation sequence, and technical approach for each priority item. Implementation of the highest-priority items is the natural next step.",
  },
];

const NOT_IN_SCOPE = [
  "NetSuite performance or governance audit",
  "Accounting configuration or functional review",
  "Security or access control audit",
  "Full code review of all existing scripts",
  "Complete data quality audit",
  "AI implementation (the assessment precedes implementation, which is a separate engagement)",
];

const WHY_SP = [
  {
    icon: CheckCircle2,
    title: "SuiteCloud Developer II certified",
    description:
      "Every AI opportunity identified maps to a specific implementation layer. SuiteScript is the primary vehicle for NetSuite AI integrations, and the credential verifies the platform knowledge behind each recommendation.",
  },
  {
    icon: Zap,
    title: "Oracle's AI APIs are live now",
    description:
      "N/llm, N/documentCapture, and the AI Connector Service are available in the current NetSuite release. Recommendations are grounded in what can be built today, not a future-state platform.",
  },
  {
    icon: Users,
    title: "Direct access to the assessor",
    description:
      "You communicate with the consultant conducting the review and building the recommendations. There is no intermediary between the person reviewing your account and the person presenting the findings.",
  },
  {
    icon: Clock,
    title: "Fixed scope, no retainer required",
    description:
      "The assessment is a contained engagement. No ongoing retainer needed to start. If implementation follows, that is a separate scope based on the prioritized findings.",
  },
];

const FAQ = [
  {
    question: "Who is the NetSuite AI Optimization Assessment for?",
    answer:
      "Companies already live on NetSuite with established business processes, active customizations, and meaningful document volume (invoices, POs, receipts). The assessment is most valuable when there are existing SuiteScripts, recurring reporting workflows, and patterns of manual work that have built up since go-live. It is not appropriate for companies still in implementation.",
  },
  {
    question: "What does the fixed-scope engagement include?",
    answer:
      "One discovery session, review of key business processes and selected customizations, review of document-heavy workflows and reporting patterns, identification and scoring of AI opportunities across six areas, a written report of 10 to 15 pages, and a final recommendations session. The deliverable is a specific list of AI opportunities found in your account, not a generic overview of what AI can do for NetSuite.",
  },
  {
    question: "What NetSuite AI capabilities does the assessment account for?",
    answer:
      "Oracle's current platform includes SuiteScript AI APIs (N/llm for LLM calls from within SuiteScript, N/documentCapture for structured extraction from invoices, receipts, and contracts), native AI features (Text Enhance, Bill Capture, Intelligent Forecasting), and the AI Connector Service, which supports custom tools that can retrieve NetSuite data or perform SuiteScript-supported operations through compatible external AI clients. The assessment identifies which capability is appropriate for each opportunity.",
  },
  {
    question: "What is the difference between this and a standard NetSuite account review?",
    answer:
      "A standard account review looks for technical debt: governance limit exposures, deprecated APIs, misconfigured workflows. An AI Optimization Assessment looks for opportunity: which manual processes could be automated, which existing scripts could incorporate AI logic, which document workflows could use extraction instead of manual entry. The two can overlap, but the question being asked is different. If you need a technical health check, that is a separate service.",
  },
  {
    question: "What happens after the assessment?",
    answer:
      "The scored opportunity roadmap identifies quick wins, strategic implementations, and items to defer. For most accounts, one or two high-priority opportunities are clear implementation candidates. SuitePacific can implement those directly under a standard retainer or fixed project scope. The assessment findings become the implementation brief.",
  },
];

export const metadata: Metadata = {
  title: "NetSuite AI Optimization Assessment",
  description:
    "Identifies where AI can improve your live NetSuite account across processes, customizations, documents, and reporting. Fixed-scope engagement with scored findings and implementation roadmap.",
  alternates: { canonical: "/netsuite-ai-optimization-assessment" },
  openGraph: {
    title: "NetSuite AI Optimization Assessment",
    description:
      "Identifies where AI can improve your live NetSuite account across processes, customizations, documents, and reporting. Fixed-scope engagement with scored findings and implementation roadmap.",
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
          { name: "NetSuite AI Integration", url: `${SITE_URL}/netsuite-ai-integration` },
          { name: "NetSuite AI Optimization Assessment", url: `${SITE_URL}/netsuite-ai-optimization-assessment` },
        ]}
      />
      <FaqJsonLd items={FAQ} />
      <ServiceJsonLd
        name="NetSuite AI Optimization Assessment"
        description="Fixed-scope consulting engagement that reviews a live NetSuite environment across six areas to identify specific AI implementation opportunities, score them, and deliver a prioritized roadmap."
        url={`${SITE_URL}/netsuite-ai-optimization-assessment`}
        serviceType="NetSuite Consulting"
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
          eyebrow="AI Assessment"
          title="NetSuite AI Optimization Assessment"
          subtitle="Most AI implementations in NetSuite are either premature or misdirected. SuitePacific's AI Optimization Assessment identifies the specific processes in your live account where AI delivers real efficiency gains, with a prioritised implementation roadmap."
          align="left"
        />

        <div className="mt-6 rounded-2xl border border-brand-100 bg-white p-5 shadow-soft">
          <LeadFormLight />
        </div>
        <p className="mt-3 text-xs text-brand-400">Fixed-scope engagement · Scored opportunity report · Recommendations session included · SuiteCloud Developer II certified</p>

        <p className="mt-3 text-xs text-brand-300">Last updated August 2026</p>

        <div className="mt-6 rounded-2xl border-l-4 border-accent bg-brand-50/50 p-5">
          <p className="text-xs font-semibold uppercase tracking-wide text-accent mb-2">Quick answer</p>
          <p className="text-sm text-brand-700 leading-relaxed">
            A NetSuite AI Optimization Assessment is a fixed-scope consulting engagement that
            reviews your live NetSuite environment to identify specific opportunities where AI
            can reduce manual work, accelerate development, or improve existing processes. The
            assessment covers six areas: business processes (where employees repeatedly read,
            classify, copy, or decide), existing customizations (SuiteScripts and workflows
            that could incorporate Oracle&apos;s AI APIs), documents (invoices, POs, and other
            inputs processed manually), reporting (questions employees ask repeatedly that AI
            could answer from live data), support patterns (recurring issues AI-assisted
            diagnostics could address), and AI architecture (which implementation path fits
            each opportunity). Oracle&apos;s current platform supports this directly: SuiteScript
            includes N/llm and N/documentCapture APIs, and the AI Connector Service supports
            custom tools for external AI clients. Each finding is scored on AI fit, business
            impact, and implementation complexity. The deliverable is a prioritized opportunity
            roadmap with implementation estimates, not a list of generic AI possibilities.
          </p>
        </div>

        <p className="mt-6 text-sm text-brand-400">
          The assessment answers one question: where can AI realistically improve this
          client&apos;s existing NetSuite environment, and what would it take to implement it?
          Every opportunity identified references an actual process, script, workflow, or
          document from your account. The scored findings become the implementation brief.
        </p>

        {/* Six areas */}
        <div className="mt-14" data-section="six-areas">
          <h2 className="text-lg font-semibold text-brand-900 mb-5">What does the assessment cover?</h2>
          <div className="overflow-x-auto rounded-2xl border border-brand-100">
            <table className="w-full text-sm min-w-[520px]">
              <thead>
                <tr className="border-b border-brand-100 bg-brand-50/50">
                  <th className="text-left p-4 font-semibold text-brand-900 w-1/4">Area</th>
                  <th className="text-left p-4 font-semibold text-brand-700">What we review</th>
                  <th className="text-left p-4 font-semibold text-brand-700">What we identify</th>
                </tr>
              </thead>
              <tbody>
                {SIX_AREAS.map((row, i) => (
                  <tr key={row.area} className={i < SIX_AREAS.length - 1 ? "border-b border-brand-100" : ""}>
                    <td className="p-4 font-medium text-brand-700 align-top">{row.area}</td>
                    <td className="p-4 text-brand-400 align-top">{row.review}</td>
                    <td className="p-4 text-brand-400 align-top">{row.identify}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* How it works */}
        <div className="mt-14" data-section="how-it-works">
          <h2 className="text-lg font-semibold text-brand-900 mb-4">How does the assessment engagement work?</h2>
          <div className="overflow-x-auto pb-2 mb-6">
            <div className="flex flex-col sm:flex-row items-stretch sm:items-start gap-2 sm:gap-0">
              <div className="rounded-xl border border-brand-100 bg-brand-50/30 px-4 py-3 text-center flex-1">
                <p className="text-[10px] font-semibold uppercase tracking-wide text-brand-400 mb-1">Step 1</p>
                <p className="text-sm font-medium text-brand-700">Discovery session</p>
              </div>
              <div className="hidden sm:flex items-center justify-center px-2 text-brand-300 text-base">›</div>
              <div className="rounded-xl border border-brand-100 bg-brand-50/30 px-4 py-3 text-center flex-1">
                <p className="text-[10px] font-semibold uppercase tracking-wide text-brand-400 mb-1">Step 2</p>
                <p className="text-sm font-medium text-brand-700">Account and process review</p>
              </div>
              <div className="hidden sm:flex items-center justify-center px-2 text-brand-300 text-base">›</div>
              <div className="rounded-xl border border-brand-100 bg-brand-50/30 px-4 py-3 text-center flex-1">
                <p className="text-[10px] font-semibold uppercase tracking-wide text-brand-400 mb-1">Step 3</p>
                <p className="text-sm font-medium text-brand-700">Opportunity scoring</p>
              </div>
              <div className="hidden sm:flex items-center justify-center px-2 text-brand-300 text-base">›</div>
              <div className="rounded-xl border border-accent/20 bg-accent/5 px-4 py-3 text-center flex-1">
                <p className="text-[10px] font-semibold uppercase tracking-wide text-accent mb-1">Deliverable</p>
                <p className="text-sm font-medium text-brand-700">Scored roadmap and session</p>
              </div>
            </div>
          </div>
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

        {/* Scorecard */}
        <div className="mt-14" data-section="scorecard">
          <h2 className="text-lg font-semibold text-brand-900 mb-2">How are AI opportunities scored?</h2>
          <p className="text-sm text-brand-400 mb-5">
            Every opportunity is rated on three dimensions and placed into one of four categories.
            The scoring makes the roadmap actionable rather than aspirational.
          </p>
          <div className="overflow-x-auto rounded-2xl border border-brand-100">
            <table className="w-full text-sm min-w-[560px]">
              <thead>
                <tr className="border-b border-brand-100 bg-brand-50/50">
                  <th className="text-left p-4 font-semibold text-brand-900">Opportunity</th>
                  <th className="text-left p-4 font-semibold text-brand-700">AI fit</th>
                  <th className="text-left p-4 font-semibold text-brand-700">Impact</th>
                  <th className="text-left p-4 font-semibold text-brand-700">Complexity</th>
                  <th className="text-left p-4 font-semibold text-brand-700">Recommendation</th>
                </tr>
              </thead>
              <tbody>
                {SCORE_EXAMPLES.map((row, i) => (
                  <tr key={row.opportunity} className={i < SCORE_EXAMPLES.length - 1 ? "border-b border-brand-100" : ""}>
                    <td className="p-4 font-medium text-brand-700 align-top">{row.opportunity}</td>
                    <td className="p-4 text-brand-400 align-top">{row.aiFit}</td>
                    <td className="p-4 text-brand-400 align-top">{row.impact}</td>
                    <td className="p-4 text-brand-400 align-top">{row.complexity}</td>
                    <td className="p-4 align-top">
                      <span className={`inline-block text-xs font-semibold px-2 py-0.5 rounded-full ${row.pillClass}`}>
                        {row.recommendation}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p className="mt-3 text-xs text-brand-300">Example scorecard. Actual opportunities are specific to your account.</p>
        </div>

        {/* Mid CTA */}
        <div className="mt-10 rounded-2xl border border-brand-100 bg-white p-5 shadow-soft">
          <p className="text-sm font-semibold text-brand-900 mb-1">Ready to map your AI opportunities?</p>
          <p className="text-sm text-brand-400 mb-4">
            Tell us about your NetSuite environment and the kinds of manual work that surface
            most often. We will explain what the assessment covers and what to expect.
          </p>
          <LeadFormLight />
        </div>

        {/* Not in scope */}
        <div className="mt-14" data-section="not-in-scope">
          <h2 className="text-lg font-semibold text-brand-900 mb-2">What is not included in the assessment?</h2>
          <p className="text-sm text-brand-400 mb-5">
            The assessment stays focused on one question: where can AI improve this account?
            These are separate services that fall outside its scope:
          </p>
          <div className="space-y-2">
            {NOT_IN_SCOPE.map((item) => (
              <div key={item} className="flex items-start gap-3 text-sm text-brand-400">
                <XCircle className="h-4 w-4 text-brand-200 shrink-0 mt-0.5" />
                <span>{item}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Why SuitePacific */}
        <div className="mt-14" data-section="why-suitepacific">
          <h2 className="text-lg font-semibold text-brand-900 mb-6">Why have the assessment done by SuitePacific?</h2>
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
              <Link href="/netsuite-ai-integration" className="text-accent hover:underline">
                NetSuite AI integration
              </Link>{" "}
              covers Oracle&apos;s native AI features and the custom SuiteScript integrations the assessment evaluates.
            </li>
            <li className="text-sm text-brand-400">
              <Link href="/netsuite-ai-invoice-processing" className="text-accent hover:underline">
                NetSuite AI invoice processing
              </Link>{" "}
              is one of the most common high-scoring opportunities assessments identify.
            </li>
            <li className="text-sm text-brand-400">
              <Link href="/netsuite-ai-reporting" className="text-accent hover:underline">
                NetSuite AI reporting
              </Link>{" "}
              covers natural-language analysis of live NetSuite data, another frequent assessment finding.
            </li>
            <li className="text-sm text-brand-400">
              <Link href="/netsuite-suitescript-development" className="text-accent hover:underline">
                NetSuite SuiteScript development
              </Link>{" "}
              covers how SuiteScript is used to implement the AI integrations the assessment identifies.
            </li>
          </ul>
        </div>


        {/* Bottom Line */}
        <div className="mt-12 rounded-2xl border-2 border-accent/30 bg-gradient-to-br from-accent/5 to-transparent p-6">
          <p className="text-xs font-semibold uppercase tracking-wide text-accent mb-3">Bottom Line</p>
          <h2 className="text-base font-semibold text-brand-900 mb-3">
            Most NetSuite AI implementations start in the wrong place. The SuitePacific AI Optimization Assessment identifies the specific processes where AI delivers real efficiency before any build begins.
          </h2>
          <p className="text-sm text-brand-500 mb-4">
            The mistake most accounts make is choosing an AI tool and then looking for a use case. The assessment works in the other direction: starting with the account's actual processes, identifying where manual work is highest, and evaluating which AI implementation path is technically feasible, cost-effective, and production-ready. The output is a scored roadmap, not a vendor recommendation.
          </p>
          <p className="text-sm text-brand-500 mb-4">
            SuitePacific conducts AI Optimization Assessments for live NetSuite accounts. Fixed fee, delivered within two weeks of account access, with a written findings report and prioritised implementation roadmap. Oracle-certified. For accounts that proceed to implementation, the retainer starts at $799 per month.
          </p>
          <ul className="space-y-2 text-sm text-brand-500">
            <li className="flex items-start gap-2"><span className="text-accent font-bold mt-0.5">→</span> Process-first assessment: identifies where AI helps, not which AI product to buy</li>
            <li className="flex items-start gap-2"><span className="text-accent font-bold mt-0.5">→</span> Written findings with prioritised implementation roadmap as the deliverable</li>
            <li className="flex items-start gap-2"><span className="text-accent font-bold mt-0.5">→</span> Oracle-certified developers who implement the recommendations, not just assess them</li>
          </ul>
        </div>

        <SuitePacificCallout
          heading="SuitePacific: NetSuite AI assessment and implementation"
          linkHref="/netsuite-ai-optimization-assessment"
          linkLabel="View AI assessment"
        />

        <ServiceFaqSection items={FAQ} />

        <div className="mt-10 rounded-2xl border border-brand-100 bg-white p-5 shadow-soft">
          <p className="text-sm font-semibold text-brand-900 mb-1">Start with the assessment</p>
          <p className="text-sm text-brand-400 mb-4">
            Tell us about your NetSuite environment. We will review what exists and identify
            where AI can deliver the most measurable improvement.
          </p>
          <LeadFormLight />
        </div>
      </div>
    </main>
  );
}

import type { Metadata } from "next";
import Link from "next/link";
import {
  Brain,
  Cpu,
  Database,
  FileSearch,
  Workflow,
  Users,
  ShieldCheck,
  CheckCircle2,
  XCircle,
  AlertCircle,
  Zap,
  BarChart2,
  MessageSquare,
  HelpCircle,
} from "lucide-react";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Card } from "@/components/ui/Card";
import { IconBadge } from "@/components/ui/IconBadge";
import {
  BreadcrumbJsonLd,
  FaqJsonLd,
  ServiceJsonLd,
  OrganizationJsonLd,
  VideoObjectJsonLd,
} from "@/components/seo/JsonLd";
import { ServiceFaqSection } from "@/components/ui/ServiceFaqSection";
import { LeadFormLight } from "@/components/sections/LeadFormLight";
import { SITE_URL } from "@/lib/content";

const PAIN_POINTS = [
  {
    icon: HelpCircle,
    title: "You heard about SuiteAgents and SuiteSkills at SuiteWorld but have no idea what they actually require.",
    description:
      "NetSuite Next, SuiteAgents, and SuiteSkills were announced at SuiteWorld 2026. Leadership is asking what it means for your account. Before you can answer that question, you need to know what your current environment looks like.",
  },
  {
    icon: MessageSquare,
    title: "Someone wants to connect ChatGPT or another AI tool to NetSuite and you need to evaluate whether it is feasible.",
    description:
      "External AI integrations require API access, data structure decisions, and SuiteScript logic to route requests. Understanding whether your current setup supports this cleanly takes a structured review, not a guess.",
  },
  {
    icon: AlertCircle,
    title: "You need to know whether native NetSuite AI features apply to your processes before committing to a project.",
    description:
      "Oracle&apos;s Text Enhance, N/llm module, N/documentCapture, and AI Connector Service have different eligibility requirements and use cases. The right starting point depends on what you are already running.",
  },
  {
    icon: BarChart2,
    title: "Leadership is asking you to add AI to your NetSuite processes and you need a structured answer.",
    description:
      "The question is not whether AI could help somewhere. The question is where it genuinely makes sense given your current data quality, customization footprint, and process maturity.",
  },
];

const ASSESS_AREAS = [
  {
    icon: Database,
    area: "Data structure and quality",
    review: "Record completeness, field population rates, duplicate data, and transaction history depth",
    identify: "Whether your data supports AI accuracy or needs remediation first",
  },
  {
    icon: Cpu,
    area: "Existing scripts and workflows",
    review: "User Event scripts, Map/Reduce, Suitelets, SuiteFlow workflows, and RESTlets",
    identify: "Which can be enhanced with AI modules versus which need to be rebuilt",
  },
  {
    icon: Workflow,
    area: "Integration landscape",
    review: "Celigo, Boomi, or custom integration connections, RESTlet endpoints, and data flows",
    identify: "Where external AI can route through existing connections versus where new endpoints are needed",
  },
  {
    icon: Users,
    area: "User roles and permissions",
    review: "SuiteCloud roles, script deployment access, and API credential structure",
    identify: "What role changes are needed before AI features can be enabled for specific user groups",
  },
  {
    icon: FileSearch,
    area: "Business processes",
    review: "Order-to-Cash, Procure-to-Pay, inventory, and financial close workflows",
    identify: "Which processes have high-volume, repetitive steps that AI handles well",
  },
  {
    icon: ShieldCheck,
    area: "Technical environment",
    review: "SuiteScript version, governance unit usage, sandbox availability, and NetSuite release tier",
    identify: "Which AI capabilities are available at your current subscription and release level",
  },
];

const AI_CAPABILITIES = [
  {
    icon: Zap,
    title: "Text Enhance",
    description:
      "Oracle&apos;s generative AI feature for text fields in NetSuite records. Text Enhance drafts memo content, email copy, and field-level text using AI trained on your record context. Available in most NetSuite versions without additional licensing.",
    tag: "Native NetSuite",
    tagClass: "bg-accent/10 text-accent",
  },
  {
    icon: FileSearch,
    title: "N/documentCapture",
    description:
      "NetSuite&apos;s document intelligence module for extracting structured data from vendor invoices, purchase orders, and receipts. Routes extracted data directly into NetSuite transactions. Reduces manual AP entry significantly for high-volume document workflows.",
    tag: "SuiteScript Module",
    tagClass: "bg-brand-100 text-brand-600",
  },
  {
    icon: Cpu,
    title: "N/llm Module",
    description:
      "The SuiteScript API that connects NetSuite scripts to large language models. Allows SuiteScript developers to call LLMs directly from User Event scripts, Map/Reduce, or Suitelets for text generation, classification, and summarization tasks.",
    tag: "SuiteScript API",
    tagClass: "bg-brand-100 text-brand-600",
  },
  {
    icon: Brain,
    title: "SuiteAgents",
    description:
      "Announced as part of NetSuite Next at SuiteWorld 2026. SuiteAgents are AI agents that can perform multi-step tasks within NetSuite autonomously, such as resolving workflow errors, drafting approval actions, or responding to operational alerts.",
    tag: "NetSuite Next",
    tagClass: "bg-amber-100 text-amber-700",
  },
  {
    icon: Workflow,
    title: "SuiteSkills",
    description:
      "AI-powered skills that extend SuiteFlow and process automation within NetSuite Next. SuiteSkills allow natural language commands to trigger NetSuite workflow actions, reducing the need for manual step configuration in common process patterns.",
    tag: "NetSuite Next",
    tagClass: "bg-amber-100 text-amber-700",
  },
  {
    icon: ShieldCheck,
    title: "AI Connector Service",
    description:
      "Oracle&apos;s managed service for connecting NetSuite to external AI platforms. The AI Connector provides pre-built connectivity to LLM providers, handling authentication, data formatting, and governance. An alternative to building a custom RESTlet integration from scratch.",
    tag: "Oracle ACS",
    tagClass: "bg-brand-50 text-brand-500",
  },
];

const USE_CASES = [
  {
    title: "Vendor bill review and exception flagging",
    description:
      "AI reads incoming vendor bills, compares them to purchase orders, and flags discrepancies or duplicate invoices before a human reviewer sees them. Reduces AP review time on high-volume accounts payable.",
    path: "N/documentCapture + N/llm",
    feasibility: "High",
    feasibilityClass: "bg-accent/10 text-accent",
  },
  {
    title: "Financial data querying in plain language",
    description:
      "Connect an external AI assistant to your NetSuite financials so users can ask questions like &ldquo;what was our gross margin by product line last quarter&rdquo; and receive answers drawn from live SuiteQL data.",
    path: "N/llm or AI Connector Service",
    feasibility: "Medium",
    feasibilityClass: "bg-brand-100 text-brand-600",
  },
  {
    title: "Inventory exception monitoring",
    description:
      "A scheduled script runs AI analysis over stock levels, open purchase orders, and demand signals to surface reorder recommendations and flag exceptions before they become stockouts.",
    path: "Map/Reduce + N/llm",
    feasibility: "High",
    feasibilityClass: "bg-accent/10 text-accent",
  },
  {
    title: "Sales order creation from customer PO emails",
    description:
      "Document intelligence extracts line items, quantities, and delivery dates from inbound customer purchase order emails or PDFs and pre-populates a NetSuite Sales Order for review.",
    path: "N/documentCapture + Workflow",
    feasibility: "High",
    feasibilityClass: "bg-accent/10 text-accent",
  },
];

const THREE_PATHS = [
  {
    label: "Native NetSuite AI",
    textEnhance: "Yes",
    documentCapture: "Yes",
    externalLlm: "No",
    customLogic: "Limited",
    oracleAcs: "Not required",
    setupComplexity: "Low",
    ongoing: "Included in license",
    best: "Text generation, document extraction within NetSuite",
  },
  {
    label: "AI Connector Service",
    textEnhance: "Partial",
    documentCapture: "Partial",
    externalLlm: "Yes",
    customLogic: "Limited",
    oracleAcs: "Required",
    setupComplexity: "Medium",
    ongoing: "ACS subscription",
    best: "Managed external AI connection without custom development",
  },
  {
    label: "Custom SuiteScript",
    textEnhance: "Via N/llm",
    documentCapture: "Via module",
    externalLlm: "Yes",
    customLogic: "Full",
    oracleAcs: "Not required",
    setupComplexity: "High",
    ongoing: "Development time",
    best: "Complex workflows, full control over AI logic",
  },
];

const DELIVERABLES = [
  {
    icon: FileSearch,
    title: "Current-state assessment",
    description:
      "A documented review of your NetSuite environment across six areas: data quality, scripts, workflows, integrations, permissions, and business processes.",
  },
  {
    icon: BarChart2,
    title: "AI opportunity report",
    description:
      "Each identified opportunity scored for AI fit, potential business impact, and implementation complexity. We distinguish between what is feasible now and what needs preparation first.",
  },
  {
    icon: Brain,
    title: "Recommended implementation path",
    description:
      "For each viable opportunity, we specify whether the right approach is native NetSuite AI, the AI Connector Service, or a custom SuiteScript integration, with reasons.",
  },
  {
    icon: CheckCircle2,
    title: "Technical requirements per opportunity",
    description:
      "What changes are needed in your NetSuite environment, data, or permissions before an AI feature can be implemented reliably. No surprises after the project starts.",
  },
  {
    icon: Cpu,
    title: "Effort and impact estimates for top 3 opportunities",
    description:
      "Ballpark development effort and expected operational benefit for the three highest-priority opportunities. Enough to inform a build decision without committing to a full project scope.",
  },
];

const WHY_SUITEPACIFIC = [
  {
    icon: ShieldCheck,
    title: "We know NetSuite internals, not just AI.",
    description:
      "Identifying AI opportunities in a NetSuite account requires understanding SuiteScript governance, workflow execution order, saved search performance, and integration architecture. These are skills we use daily, not skills we acquired for this assessment.",
  },
  {
    icon: AlertCircle,
    title: "We are honest when AI does not make sense.",
    description:
      "Not every process is a good AI candidate. If your data quality is too low, your transaction volume does not justify the investment, or a native NetSuite feature already solves the problem, we will tell you.",
  },
  {
    icon: CheckCircle2,
    title: "The assessment does not obligate you to build anything.",
    description:
      "The assessment is a fixed-scope engagement. You receive a written report and can decide independently how to proceed. There is no pressure to start a development project.",
  },
  {
    icon: Zap,
    title: "We can implement what we recommend.",
    description:
      "If the assessment identifies opportunities worth building, SuitePacific&apos;s SuiteScript team can execute them. You do not need a second vendor handoff to move from assessment to implementation.",
  },
];

const FAQ = [
  {
    question: "What is a NetSuite AI Readiness Assessment?",
    answer:
      "A NetSuite AI Readiness Assessment is a structured review of an existing NetSuite environment to determine which AI capabilities are applicable, technically feasible, and worth building. It covers your data quality, scripts, workflows, integrations, and business processes, then maps each to relevant NetSuite AI capabilities such as Text Enhance, N/documentCapture, N/llm, SuiteAgents, or the AI Connector Service. The output is a written report with scored opportunities and recommended implementation paths. It is not a development project; it is the step you take before committing to one.",
  },
  {
    question: "Which NetSuite AI capabilities does the assessment cover?",
    answer:
      "The assessment covers all currently available and announced NetSuite AI capabilities: Oracle Text Enhance for generative text in records, N/documentCapture for document extraction, N/llm for calling large language models from SuiteScript, the AI Connector Service for managed external AI connectivity, and the SuiteAgents and SuiteSkills features announced as part of NetSuite Next at SuiteWorld 2026. For external AI integrations such as connecting ChatGPT to NetSuite financial data, we also evaluate whether a custom RESTlet or Suitelet approach is appropriate.",
  },
  {
    question: "Does our NetSuite account need to be on a specific version to benefit from AI features?",
    answer:
      "It depends on the feature. Text Enhance is available in current NetSuite releases without additional licensing for most customers. N/documentCapture and N/llm require SuiteCloud access and specific module enablement. SuiteAgents and SuiteSkills are part of NetSuite Next, which is being rolled out progressively. Part of the assessment is identifying which features are available at your current subscription and release tier, so you know which opportunities are immediately actionable versus which require a platform update.",
  },
  {
    question: "What is the difference between the AI Connector Service and a custom SuiteScript integration?",
    answer:
      "The AI Connector Service is Oracle&apos;s managed connectivity layer for linking NetSuite to external AI platforms. It handles authentication, data routing, and governance without requiring custom SuiteScript. It is faster to set up but has less flexibility. A custom SuiteScript integration using RESTlets or the N/llm module gives full control over data selection, prompt design, and response handling, but requires more development time and ongoing maintenance. The right choice depends on your process requirements, budget, and how much logic needs to live inside NetSuite versus outside it.",
  },
  {
    question: "How long does the assessment take?",
    answer:
      "The assessment typically takes two to three weeks from the initial discovery session to the delivery of the written report. The timeline depends on the complexity of your NetSuite environment and how quickly we can schedule the review sessions. We do not require sustained access to your production account; most of the review is completed through read-only SuiteCloud access and documented process walkthroughs with your team.",
  },
  {
    question: "What happens after the assessment is delivered?",
    answer:
      "You receive a written report and can decide independently how to proceed. The assessment does not commit you to a development project. If you want to implement one or more of the recommended opportunities, SuitePacific can provide a development estimate based on the technical requirements documented in the assessment. If you prefer to work with another team or take the work in-house, the report is written clearly enough to brief a different developer.",
  },
  {
    question: "What if our NetSuite environment turns out not to be ready for AI yet?",
    answer:
      "That is a useful finding, not a failure. If data quality issues, configuration gaps, or permission structure would prevent AI from working reliably, the assessment tells you exactly what needs to be addressed first. Many accounts that started with an AI readiness assessment ended up doing a round of account optimization or data cleanup before the AI work began. Knowing that before a development project starts saves significant time and budget.",
  },
];

export const metadata: Metadata = {
  title: "NetSuite AI Readiness Assessment | SuitePacific",
  description:
    "Assess whether your NetSuite is ready for SuiteAgents, SuiteSkills, and AI integrations. SuitePacific identifies real opportunities and what your setup needs first.",
  alternates: { canonical: "/netsuite-ai-readiness-assessment" },
  openGraph: {
    title: "NetSuite AI Readiness Assessment | SuitePacific",
    description:
      "Assess whether your NetSuite is ready for SuiteAgents, SuiteSkills, and AI integrations. SuitePacific identifies real opportunities and what your setup needs first.",
    url: `${SITE_URL}/netsuite-ai-readiness-assessment`,
    type: "website",
    images: [{ url: `${SITE_URL}/og-default.png`, width: 1200, height: 630 }],
  },
};

export default function NetSuiteAiReadinessAssessmentPage() {
  return (
    <main className="pt-32 pb-24 sm:pt-40 sm:pb-32">
      <BreadcrumbJsonLd
        items={[
          { name: "Home", url: SITE_URL },
          { name: "NetSuite AI Integration", url: `${SITE_URL}/netsuite-ai-integration` },
          { name: "NetSuite AI Readiness Assessment", url: `${SITE_URL}/netsuite-ai-readiness-assessment` },
        ]}
      />
      <FaqJsonLd items={FAQ} />
      <ServiceJsonLd
        name="NetSuite AI Readiness Assessment"
        description="A structured review of an existing NetSuite environment to identify which AI capabilities are applicable, technically feasible, and worth building. Covers data quality, scripts, workflows, integrations, and business processes."
        url={`${SITE_URL}/netsuite-ai-readiness-assessment`}
        serviceType="NetSuite Consulting"
        offers={[
          { name: "Care", price: 799, description: "10 hours/month: AI readiness assessment plus ongoing SuiteScript, workflow, and account management support. Month-to-month after 3-month minimum." },
          { name: "Care Plus", price: 1499, description: "20 hours/month: AI readiness assessment and implementation of identified opportunities. Month-to-month." },
          { name: "Care Pro", price: 2499, description: "35 hours/month: comprehensive AI readiness assessment, remediation, and ongoing development. Month-to-month." },
        ]}
      />
      <OrganizationJsonLd />
      <VideoObjectJsonLd
        name="SuitePacific Introduction: NetSuite Post-Go-Live Support and Consulting"
        description="An introduction to SuitePacific, a boutique NetSuite post-go-live support team providing SuiteScript development, workflow automation, and ongoing account optimization for businesses already live on NetSuite."
        videoId="IQvWN_yZ24A"
        duration="PT18S"
        uploadDate="2026-08-12T00:00:00+00:00"
        isShort
      />

      <div className="mx-auto max-w-3xl px-6 lg:px-8">
        <SectionHeading
          as="h1"
          eyebrow="AI Readiness"
          title="Is Your NetSuite Ready for AI?"
          subtitle="A NetSuite AI Readiness Assessment is a structured review of your existing environment to determine which AI capabilities are applicable, technically feasible, and worth building. SuitePacific reviews your data, scripts, workflows, integrations, and processes, then tells you exactly where AI makes sense and what preparation is needed."
          align="left"
        />
        <p className="mt-1 text-xs text-brand-300">Last updated October 2026</p>

        <div className="mt-6 rounded-2xl border border-brand-100 bg-white p-5 shadow-soft">
          <p className="text-sm text-brand-600 mb-3">Tell us what your account needs.</p>
          <LeadFormLight />
        </div>

        {/* Why this matters */}
        <div className="mt-16">
          <h2 className="text-xl font-semibold text-brand-900">
            Why does AI readiness matter after SuiteWorld 2026?
          </h2>
          <p className="mt-4 text-brand-700 leading-relaxed">
            NetSuite announced significant AI capabilities at SuiteWorld 2026 under the{" "}
            <a
              href="https://docs.oracle.com/en/cloud/saas/netsuite/ns-online-help/chapter_N2666167.html"
              target="_blank"
              rel="noopener noreferrer"
              className="underline underline-offset-2 hover:text-accent transition-colors"
            >
              NetSuite Next platform
            </a>
            , including SuiteAgents for autonomous task execution, SuiteSkills for
            natural-language workflow automation, and expanded AI integration APIs. Oracle&apos;s
            existing AI capabilities, including Text Enhance, N/documentCapture, and N/llm, are
            already available for accounts on supported versions.
          </p>
          <p className="mt-4 text-brand-700 leading-relaxed">
            The gap for most businesses is not awareness. It is specificity. They know AI exists
            in NetSuite. They do not know which features apply to their version, whether their
            data supports it, or which of their processes would genuinely benefit from it versus
            which would not.
          </p>
          <p className="mt-4 text-brand-700 leading-relaxed">
            This assessment answers those questions before any development budget is committed.
          </p>
        </div>

        {/* Pain points */}
        <div className="mt-16">
          <h2 className="text-xl font-semibold text-brand-900">
            Who needs a NetSuite AI Readiness Assessment?
          </h2>
          <div className="mt-6 space-y-4">
            {PAIN_POINTS.map((point) => (
              <div key={point.title} className="flex gap-4 rounded-xl border border-brand-100 bg-white p-5 shadow-soft">
                <IconBadge icon={point.icon} />
                <div>
                  <p className="font-medium text-brand-900">{point.title}</p>
                  <p
                    className="mt-1 text-sm text-brand-600 leading-relaxed"
                    dangerouslySetInnerHTML={{ __html: point.description }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* What we assess */}
        <div className="mt-16">
          <h2 className="text-xl font-semibold text-brand-900">
            What does the assessment cover?
          </h2>
          <p className="mt-3 text-brand-600">
            We review your NetSuite environment across six areas. Each area produces a list of
            AI opportunities and a set of technical prerequisites for each opportunity.
          </p>
          <div className="mt-6 overflow-x-auto rounded-xl border border-brand-100 shadow-soft">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-brand-100 bg-brand-50">
                  <th className="text-left px-4 py-3 font-semibold text-brand-800 w-1/3">Area</th>
                  <th className="text-left px-4 py-3 font-semibold text-brand-800 w-1/3">What we review</th>
                  <th className="text-left px-4 py-3 font-semibold text-brand-800 w-1/3">What we identify</th>
                </tr>
              </thead>
              <tbody>
                {ASSESS_AREAS.map((row, i) => (
                  <tr key={row.area} className={i % 2 === 0 ? "bg-white" : "bg-brand-50/40"}>
                    <td className="px-4 py-3 font-medium text-brand-900 align-top">
                      <div className="flex items-center gap-2">
                        <row.icon className="h-4 w-4 text-accent shrink-0" />
                        {row.area}
                      </div>
                    </td>
                    <td className="px-4 py-3 text-brand-600 align-top">{row.review}</td>
                    <td className="px-4 py-3 text-brand-600 align-top">{row.identify}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* AI Capabilities */}
        <div className="mt-16">
          <h2 className="text-xl font-semibold text-brand-900">
            Which NetSuite AI capabilities does the assessment evaluate?
          </h2>
          <p className="mt-3 text-brand-600">
            We assess each capability against your environment to determine applicability,
            eligibility requirements, and implementation complexity.
          </p>
          <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 gap-4">
            {AI_CAPABILITIES.map((cap) => (
              <div key={cap.title} className="rounded-xl border border-brand-100 bg-white p-5 shadow-soft flex flex-col gap-3">
                <div className="flex items-start justify-between gap-3">
                  <div className="flex items-center gap-2">
                    <IconBadge icon={cap.icon} />
                    <p className="font-medium text-brand-900">{cap.title}</p>
                  </div>
                  <span className={`shrink-0 rounded-full px-2 py-0.5 text-xs font-medium ${cap.tagClass}`}>
                    {cap.tag}
                  </span>
                </div>
                <p
                  className="text-sm text-brand-600 leading-relaxed"
                  dangerouslySetInnerHTML={{ __html: cap.description }}
                />
              </div>
            ))}
          </div>
        </div>

        {/* Use cases */}
        <div className="mt-16">
          <h2 className="text-xl font-semibold text-brand-900">
            What are the most common AI opportunities we find?
          </h2>
          <p className="mt-3 text-brand-600">
            These are the opportunities that appear most frequently across assessed accounts,
            along with the typical implementation path and feasibility rating.
          </p>
          <div className="mt-6 space-y-4">
            {USE_CASES.map((uc) => (
              <div key={uc.title} className="rounded-xl border border-brand-100 bg-white p-5 shadow-soft">
                <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-2">
                  <p className="font-medium text-brand-900">{uc.title}</p>
                  <span className={`self-start shrink-0 rounded-full px-2 py-0.5 text-xs font-medium ${uc.feasibilityClass}`}>
                    {uc.feasibility} feasibility
                  </span>
                </div>
                <p
                  className="mt-2 text-sm text-brand-600 leading-relaxed"
                  dangerouslySetInnerHTML={{ __html: uc.description }}
                />
                <p className="mt-2 text-xs text-brand-400 font-medium">Path: {uc.path}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Three paths comparison */}
        <div className="mt-16">
          <h2 className="text-xl font-semibold text-brand-900">
            How does native NetSuite AI compare to the AI Connector Service and custom SuiteScript?
          </h2>
          <p className="mt-3 text-brand-600">
            Each AI implementation path has different capability coverage, setup requirements,
            and ongoing cost. The assessment recommends the right path per identified opportunity.
          </p>
          <div className="mt-6 overflow-x-auto rounded-xl border border-brand-100 shadow-soft">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-brand-100 bg-brand-50">
                  <th className="text-left px-4 py-3 font-semibold text-brand-800">Capability</th>
                  {THREE_PATHS.map((p) => (
                    <th key={p.label} className="text-left px-4 py-3 font-semibold text-brand-800">
                      {p.label}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {[
                  { key: "textEnhance" as const, label: "Text Enhance" },
                  { key: "documentCapture" as const, label: "N/documentCapture" },
                  { key: "externalLlm" as const, label: "External LLM (ChatGPT etc.)" },
                  { key: "customLogic" as const, label: "Custom business logic" },
                  { key: "oracleAcs" as const, label: "Oracle ACS required" },
                  { key: "setupComplexity" as const, label: "Setup complexity" },
                  { key: "ongoing" as const, label: "Ongoing cost" },
                  { key: "best" as const, label: "Best for" },
                ].map((row, i) => (
                  <tr key={row.key} className={i % 2 === 0 ? "bg-white" : "bg-brand-50/40"}>
                    <td className="px-4 py-3 font-medium text-brand-800 align-top whitespace-nowrap">{row.label}</td>
                    {THREE_PATHS.map((p) => {
                      const val = p[row.key];
                      return (
                        <td key={p.label} className="px-4 py-3 text-brand-600 align-top">
                          {val === "Yes" ? (
                            <span className="flex items-center gap-1 text-accent font-medium">
                              <CheckCircle2 className="h-3.5 w-3.5" /> Yes
                            </span>
                          ) : val === "No" ? (
                            <span className="flex items-center gap-1 text-brand-400">
                              <XCircle className="h-3.5 w-3.5" /> No
                            </span>
                          ) : (
                            val
                          )}
                        </td>
                      );
                    })}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* What customers receive */}
        <div className="mt-16">
          <h2 className="text-xl font-semibold text-brand-900">
            What does the assessment deliver?
          </h2>
          <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 gap-4">
            {DELIVERABLES.map((d) => (
              <Card key={d.title} className="p-5">
                <IconBadge icon={d.icon} />
                <p className="font-medium text-brand-900">{d.title}</p>
                <p className="mt-1 text-sm text-brand-600 leading-relaxed">{d.description}</p>
              </Card>
            ))}
          </div>
          <p className="mt-4 text-sm text-brand-500">
            The written report is delivered within 10 business days of the initial discovery
            session. No development commitment is required.
          </p>
        </div>

        {/* Why SuitePacific */}
        <div className="mt-16">
          <h2 className="text-xl font-semibold text-brand-900">
            Why work with SuitePacific for this assessment?
          </h2>
          <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 gap-4">
            {WHY_SUITEPACIFIC.map((item) => (
              <div key={item.title} className="rounded-xl border border-brand-100 bg-white p-5 shadow-soft">
                <IconBadge icon={item.icon} />
                <p className="font-medium text-brand-900">{item.title}</p>
                <p
                  className="mt-1 text-sm text-brand-600 leading-relaxed"
                  dangerouslySetInnerHTML={{ __html: item.description }}
                />
              </div>
            ))}
          </div>
        </div>

        {/* GEO block */}
        <div className="mt-16 rounded-2xl border border-brand-100 bg-brand-50 p-6 sm:p-8">
          <h2 className="text-lg font-semibold text-brand-900">
            What to expect from a NetSuite AI Readiness Assessment
          </h2>
          <p className="mt-3 text-brand-700 leading-relaxed text-sm">
            A NetSuite AI Readiness Assessment is a structured consulting engagement, typically two to three weeks, that reviews a live NetSuite environment to identify where AI is technically feasible and operationally justified. SuitePacific reviews data quality, existing SuiteScript customizations, workflow configuration, integration architecture, user roles, and business processes. Each identified opportunity is scored for AI suitability, business impact, and implementation complexity. The output is a written report specifying which of three paths applies to each opportunity: native NetSuite AI features such as Text Enhance or N/documentCapture, Oracle&apos;s AI Connector Service for managed external AI connectivity, or a custom SuiteScript integration using the N/llm module. The report also documents technical prerequisites per opportunity and provides effort estimates for the top three. No development work is included; the assessment is the step taken before committing to a build.
          </p>
        </div>

        {/* Bottom lead form */}
        <div className="mt-16 rounded-2xl border border-brand-100 bg-white p-5 shadow-soft">
          <p className="text-sm font-medium text-brand-900 mb-1">Ready to assess your NetSuite environment?</p>
          <p className="text-sm text-brand-600 mb-4">
            Tell us about your account and we will get back to you within one business day.
          </p>
          <LeadFormLight />
        </div>

        {/* FAQ */}
        <div className="mt-16">
          <ServiceFaqSection items={FAQ} />
        </div>

        {/* Related services */}
        <div className="mt-16">
          <h2 className="text-lg font-semibold text-brand-900">Related services</h2>
          <ul className="mt-4 space-y-2 text-sm text-brand-700">
            <li>
              <Link href="/netsuite-ai-integration" className="underline underline-offset-2 hover:text-accent transition-colors">
                NetSuite AI Integration
              </Link>
              {" "}- SuiteScript development for N/llm, N/documentCapture, and external AI connectivity
            </li>
            <li>
              <Link href="/netsuite-ai-optimization-assessment" className="underline underline-offset-2 hover:text-accent transition-colors">
                NetSuite AI Optimization Assessment
              </Link>
              {" "}- Identifying AI opportunities in your current workflows and scripts
            </li>
            <li>
              <Link href="/netsuite-health-check" className="underline underline-offset-2 hover:text-accent transition-colors">
                NetSuite Health Check
              </Link>
              {" "}- Full account review covering scripts, workflows, integrations, and configuration
            </li>
            <li>
              <Link href="/netsuite-suitescript-development" className="underline underline-offset-2 hover:text-accent transition-colors">
                NetSuite SuiteScript Development
              </Link>
              {" "}- Custom script development once AI opportunities are identified
            </li>
            <li>
              <Link href="/netsuite-post-go-live-support" className="underline underline-offset-2 hover:text-accent transition-colors">
                NetSuite Post-Go-Live Support
              </Link>
              {" "}- Ongoing support plans that include AI assessment and implementation hours
            </li>
          </ul>
        </div>

        {/* Bottom line */}
        <div className="mt-12 rounded-2xl border-l-4 border-accent bg-accent/5 px-6 py-5">
          <p className="text-sm font-semibold text-brand-900">The bottom line</p>
          <p className="mt-1 text-sm text-brand-600 leading-relaxed">
            SuiteAgents, SuiteSkills, and NetSuite Next are not concepts. They are features arriving
            in a platform your business already runs on. The question is not whether to engage with
            them. It is whether your environment is ready and which processes will actually benefit.
            The assessment answers that question with specifics, not guesses.
          </p>
        </div>
      </div>
    </main>
  );
}

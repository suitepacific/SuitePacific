import type { Metadata } from "next";
import Link from "next/link";
import {
  Sparkles,
  TrendingUp,
  Zap,
  ShieldCheck,
  Users,
  Clock,
  BarChart2,
  Cpu,
  FileText,
} from "lucide-react";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Card } from "@/components/ui/Card";
import { IconBadge } from "@/components/ui/IconBadge";
import { BreadcrumbJsonLd, FaqJsonLd, ServiceJsonLd } from "@/components/seo/JsonLd";
import { ServiceFaqSection } from "@/components/ui/ServiceFaqSection";
import { LeadFormLight } from "@/components/sections/LeadFormLight";
import { SITE_URL } from "@/lib/content";

const NATIVE_AI = [
  {
    icon: Sparkles,
    title: "Oracle Text Enhance",
    description:
      "Oracle's generative AI feature for text fields in NetSuite records. Text Enhance drafts memo content, email copy, and field-level text using AI trained on your record context. Setup, role-based access configuration, and field enablement.",
  },
  {
    icon: BarChart2,
    title: "Bill Capture",
    description:
      "AI-powered vendor bill data extraction. NetSuite's Bill Capture uses machine learning to read vendor invoices and populate bill records automatically. Configuration, vendor mapping rules, exception handling, and accuracy tuning.",
  },
  {
    icon: Cpu,
    title: "Intelligent Forecasting",
    description:
      "NetSuite's demand and supply planning uses ML-based forecasting models to project future inventory needs. Configuration, model selection, and integration with existing planning workflows.",
  },
  {
    icon: BarChart2,
    title: "SuiteAnalytics AI Insights",
    description:
      "Oracle has added AI-assisted pattern detection and anomaly flagging to SuiteAnalytics Workbook. Configuration for your account's data structure, relevant metrics, and reporting workflows.",
  },
];

const CUSTOM_INTEGRATIONS = [
  {
    icon: BarChart2,
    title: "AI reporting and financial insights",
    description:
      "AI that reads your NetSuite financial data and surfaces trends, anomalies, and plain-language summaries. Ask questions about your data in natural language and get answers drawn from live NetSuite records, without building a saved search for every question.",
  },
  {
    icon: TrendingUp,
    title: "AI demand and revenue forecasting",
    description:
      "Connect NetSuite transaction and inventory history to AI forecasting models that predict future demand, flag low-stock risk, and project revenue by period. More accurate than static spreadsheet models because the AI updates as new orders and transactions come in.",
  },
  {
    icon: FileText,
    title: "AI invoice and AP automation",
    description:
      "Beyond Oracle's built-in Bill Capture, custom AI integrations can handle complex vendor invoice formats, multi-currency matching, PO line-item reconciliation, and exception routing. AI reads the invoice, populates the bill record, and flags anything that needs human review.",
  },
  {
    icon: Zap,
    title: "AI process and workflow automation",
    description:
      "AI that classifies records, scores transactions, or routes approvals based on patterns in your NetSuite data. Examples: auto-categorizing expense reports, scoring sales orders for credit risk, routing vendor bills by spend category, or flagging transactions that match known fraud patterns.",
  },
];

const HOW_IT_WORKS = [
  {
    step: "01",
    title: "Account and use-case review",
    description:
      "We review your NetSuite account and the specific outcome you want AI to achieve. Some use cases are solved by enabling a native Oracle feature. Others require a custom SuiteScript integration. We identify which path applies before writing any code.",
  },
  {
    step: "02",
    title: "Integration design",
    description:
      "For native features: we map the configuration steps and role-based access requirements for your account. For custom integrations: we design the script architecture, API authentication approach, prompt structure, and record-writing logic before development starts.",
  },
  {
    step: "03",
    title: "Sandbox-first development and testing",
    description:
      "All custom AI integration work is built and tested in your Sandbox account. We validate AI output quality, error handling for API failures, governance limit impact, and data accuracy before the integration touches Production.",
  },
];

const WHY_SP = [
  {
    icon: ShieldCheck,
    title: "SuiteCloud Developer II certified",
    description:
      "Custom AI integrations are SuiteScript work. The same certification that covers standard SuiteScript development covers AI integration scripts; the credential verifies the underlying platform knowledge.",
  },
  {
    icon: Sparkles,
    title: "Existing AI integration experience",
    description:
      "SuiteCompare's AI summary panel connects NetSuite SuiteScript data to an AI model and streams structured analysis back to users. We have already built the integration pattern we would apply to your account.",
  },
  {
    icon: Users,
    title: "Direct access to the developer",
    description:
      "You communicate with the consultant designing and building the integration. No account manager relay, no scope translations between the person you brief and the person writing the code.",
  },
  {
    icon: Clock,
    title: "Month-to-month engagement",
    description:
      "AI integrations evolve as models improve and business needs change. A month-to-month retainer means the integration can be updated, extended, or replaced as your requirements shift without a new project scope each time.",
  },
];

const NATIVE_VS_CUSTOM = [
  {
    aspect: "Setup required",
    native: "Account-level feature enablement and role configuration within NetSuite",
    custom: "SuiteScript development, API authentication setup, and Sandbox testing before Production",
  },
  {
    aspect: "External API needed",
    native: "No; uses Oracle's AI infrastructure included with your license",
    custom: "Yes; requires an API key from an AI provider (OpenAI, Anthropic, Gemini, or similar)",
  },
  {
    aspect: "Development work",
    native: "Configuration only; no custom code required",
    custom: "SuiteScript development; typically 1-3 weeks depending on use case complexity",
  },
  {
    aspect: "AI model control",
    native: "Oracle-selected model and output behavior; not configurable",
    custom: "Full control over model selection, prompt design, and output format",
  },
  {
    aspect: "Best for",
    native: "Standard workflows: text generation in standard fields, recognized vendor invoices, basic demand forecasting",
    custom: "Non-standard formats, account-specific data models, custom record enrichment, or workflows Oracle has not built for",
  },
];

const FAQ = [
  {
    question: "What NetSuite AI features are included in my license?",
    answer:
      "Oracle's native AI features (Text Enhance, Bill Capture, and Intelligent Forecasting) are available to NetSuite accounts depending on edition, modules purchased, and release version. Text Enhance availability depends on which fields Oracle has enabled and whether the feature has been turned on for your account. Bill Capture requires the Accounts Payable module. Intelligent Forecasting requires the Demand Planning module. We audit your account's enabled features and modules as part of any AI setup engagement to establish what is available before configuring anything.",
  },
  {
    question: "Can SuiteScript call the OpenAI or Claude API?",
    answer:
      "Yes. SuiteScript 2.x's N/https module allows scripts to make HTTP requests to external services, including AI provider APIs. The integration requires an API key from the AI provider (stored as a NetSuite credential), a SuiteScript that structures the request and handles the response, and logic to write the AI output back to the appropriate NetSuite record fields. The same pattern works for OpenAI, Anthropic, Google Gemini, or any provider with a standard HTTP API.",
  },
  {
    question: "What is Oracle Text Enhance in NetSuite?",
    answer:
      "Oracle Text Enhance is a generative AI feature built into NetSuite that helps users draft text in certain record fields. When enabled on a field, a small AI icon appears next to it. Clicking it generates suggested text based on the record context. The feature uses Oracle's AI infrastructure rather than a third-party model. Setup involves enabling the feature at the account level, configuring which roles and fields have access, and testing the output quality for your specific record types and business context.",
  },
  {
    question: "Is custom AI integration covered under a managed support retainer?",
    answer:
      "AI integration development (writing the SuiteScript, designing the API connection, testing in Sandbox) is standard SuiteScript development work and is covered under a managed support retainer at the same rate as any other development. Ongoing maintenance of an AI integration (handling API deprecations, adjusting prompts as model behavior changes, adding fields) is also retainer work. Net-new integrations of significant scope may be scoped separately depending on the retainer's existing hours.",
  },
  {
    question: "What data does Oracle's AI access in my NetSuite account?",
    answer:
      "For Oracle's native features like Text Enhance, Oracle's AI processes the content of the specific record and fields you are working with at the time of the request. Oracle's data processing terms govern how that data is handled. For custom AI integrations built with SuiteScript, only the data your script explicitly sends to the external API leaves NetSuite; you control exactly which fields are included in the request. We design custom integrations to minimize data exposure to only what the AI model needs to produce useful output.",
  },
];

export const metadata: Metadata = {
  title: "NetSuite AI Integration: Native Features and Custom Development",
  description:
    "Configure Oracle NetSuite's built-in AI features and build custom AI integrations via SuiteScript. Certified NetSuite consultants for Text Enhance setup, Bill Capture, and external AI API integration.",
  alternates: { canonical: "/netsuite-ai-integration" },
  openGraph: {
    title: "NetSuite AI Integration: Native Features and Custom Development",
    description:
      "Configure Oracle NetSuite's built-in AI features and build custom AI integrations via SuiteScript. Certified NetSuite consultants for Text Enhance setup, Bill Capture, and external AI API integration.",
    url: `${SITE_URL}/netsuite-ai-integration`,
    type: "website",
    images: [{ url: `${SITE_URL}/og-default.png`, width: 1200, height: 630 }],
  },
};

export default function NetSuiteAiIntegrationPage() {
  return (
    <main className="pt-32 pb-24 sm:pt-40 sm:pb-32">
      <BreadcrumbJsonLd
        items={[
          { name: "Home", url: SITE_URL },
          { name: "NetSuite AI Integration", url: `${SITE_URL}/netsuite-ai-integration` },
        ]}
      />
      <FaqJsonLd items={FAQ} />
      <ServiceJsonLd
        name="NetSuite AI Integration"
        description="Configuration of Oracle NetSuite's native AI features and custom AI integrations built with SuiteScript, connecting NetSuite to external AI APIs and automating record enrichment."
        url={`${SITE_URL}/netsuite-ai-integration`}
        serviceType="NetSuite Consulting"
      />

      <div className="mx-auto max-w-3xl px-6 lg:px-8">
        <SectionHeading
          as="h1"
          eyebrow="AI Integration"
          title="NetSuite AI Integration: Native Features and Custom Development"
          subtitle="Oracle has added AI capabilities directly into NetSuite. Beyond those, SuiteScript can connect your account to any external AI API. We configure both."
          align="left"
        />

        <div className="mt-6 rounded-2xl border border-brand-100 bg-white p-5 shadow-soft">
          <LeadFormLight />
        </div>
        <p className="mt-3 text-xs text-brand-400">SuiteCloud Developer II certified · Native AI setup · Custom SuiteScript AI integrations · Month-to-month</p>

        <p className="mt-3 text-xs text-brand-300">Last updated August 2026</p>

        <div className="mt-6 rounded-2xl border-l-4 border-accent bg-brand-50/50 p-5">
          <p className="text-xs font-semibold uppercase tracking-wide text-accent mb-2">Quick answer</p>
          <p className="text-sm text-brand-700 leading-relaxed">
            NetSuite AI integration covers two distinct areas. The first is Oracle&apos;s
            built-in AI features: Text Enhance (AI-generated text in record fields), Bill
            Capture (AI-powered vendor invoice extraction), Intelligent Forecasting
            (ML-based demand planning), and SuiteAnalytics AI insights. These require
            configuration and access setup, not custom development. The second is custom
            AI integrations built with SuiteScript: calling external AI APIs (OpenAI,
            Anthropic, Gemini) from within NetSuite, enriching records with AI output,
            and triggering workflows from AI classification results. SuitePacific configures
            native Oracle AI features and builds custom SuiteScript integrations connecting
            NetSuite to external AI models, with all development tested in Sandbox before
            Production deployment.
          </p>
        </div>

        <p className="mt-6 text-sm text-brand-400">
          AI in NetSuite takes two forms: what Oracle has built directly into the platform,
          and what can be connected to it through SuiteScript. Both are live, both are in
          use by accounts now, and both require someone who understands the NetSuite platform
          layer well enough to implement them correctly.
        </p>

        {/* Native AI features */}
        <div className="mt-14" data-section="native-ai">
          <h2 className="text-lg font-semibold text-brand-900 mb-1">What AI features are built into NetSuite?</h2>
          <p className="text-sm text-brand-400 mb-6">
            Oracle has added AI capabilities across several areas of the platform. These
            are available without external API keys or custom development, but require
            proper configuration and enablement for your account.
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            {NATIVE_AI.map((item) => (
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

        {/* Custom AI integrations */}
        <div className="mt-14" data-section="custom-integrations">
          <h2 className="text-lg font-semibold text-brand-900 mb-1">What can AI do in your NetSuite account?</h2>
          <p className="text-sm text-brand-400 mb-6">
            Beyond Oracle&apos;s built-in features, SuiteScript can connect your NetSuite
            account to any external AI model. Here are the use cases companies ask about most often.
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            {CUSTOM_INTEGRATIONS.map((item) => (
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

        {/* Native vs custom comparison */}
        <div className="mt-14" data-section="native-vs-custom">
          <h2 className="text-lg font-semibold text-brand-900 mb-5">When should you use Oracle native AI versus a custom AI integration?</h2>
          <div className="overflow-x-auto rounded-2xl border border-brand-100">
            <table className="w-full text-sm min-w-[520px]">
              <thead>
                <tr className="border-b border-brand-100 bg-brand-50/50">
                  <th className="text-left p-4 font-semibold text-brand-900 w-1/3"></th>
                  <th className="text-left p-4 font-semibold text-brand-700">Oracle native AI</th>
                  <th className="text-left p-4 font-semibold text-accent">Custom AI integration</th>
                </tr>
              </thead>
              <tbody>
                {NATIVE_VS_CUSTOM.map((row, i) => (
                  <tr key={row.aspect} className={i < NATIVE_VS_CUSTOM.length - 1 ? "border-b border-brand-100" : ""}>
                    <td className="p-4 font-medium text-brand-700 align-top">{row.aspect}</td>
                    <td className="p-4 text-brand-400 align-top">{row.native}</td>
                    <td className="p-4 text-brand-700 align-top">{row.custom}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Spoke pages */}
        <div className="mt-10 rounded-2xl border border-brand-100 bg-brand-50/30 p-5 sm:p-6">
          <p className="text-sm font-semibold text-brand-900 mb-1">Dedicated AI services from SuitePacific</p>
          <p className="text-sm text-brand-400 mb-4">
            Three AI services designed for live NetSuite accounts, each scoped as a fixed engagement.
          </p>
          <ul className="space-y-3">
            <li>
              <Link href="/netsuite-ai-optimization-assessment" className="group flex items-start gap-3">
                <span className="text-accent mt-0.5 shrink-0 text-base">›</span>
                <div>
                  <p className="text-sm font-medium text-accent group-hover:underline">NetSuite AI Optimization Assessment</p>
                  <p className="text-xs text-brand-400 mt-0.5">Fixed-scope discovery engagement that maps where AI can reduce manual work across your processes, customizations, and document workflows. Delivers a scored opportunity roadmap with implementation estimates.</p>
                </div>
              </Link>
            </li>
            <li>
              <Link href="/netsuite-ai-invoice-processing" className="group flex items-start gap-3">
                <span className="text-accent mt-0.5 shrink-0 text-base">›</span>
                <div>
                  <p className="text-sm font-medium text-accent group-hover:underline">NetSuite AI Invoice Processing</p>
                  <p className="text-xs text-brand-400 mt-0.5">AI that reads vendor invoices and populates bill records automatically. Handles formats Oracle Bill Capture cannot process, with line-item PO matching and exception routing.</p>
                </div>
              </Link>
            </li>
            <li>
              <Link href="/netsuite-ai-reporting" className="group flex items-start gap-3">
                <span className="text-accent mt-0.5 shrink-0 text-base">›</span>
                <div>
                  <p className="text-sm font-medium text-accent group-hover:underline">NetSuite AI Reporting</p>
                  <p className="text-xs text-brand-400 mt-0.5">Ask questions about your NetSuite data in plain English. A natural language interface converts questions to SuiteQL and returns answers from live records.</p>
                </div>
              </Link>
            </li>
          </ul>
        </div>

        {/* How it works */}
        <div className="mt-14" data-section="how-it-works">
          <h2 className="text-lg font-semibold text-brand-900 mb-6">How does a NetSuite AI integration engagement work?</h2>
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
          <p className="text-sm font-semibold text-brand-900 mb-1">Have a specific AI use case in mind?</p>
          <p className="text-sm text-brand-400 mb-4">
            Tell us what you want to automate or enrich in your NetSuite account using AI.
            We will explain whether it is a native feature configuration or a custom
            integration, and what building it would involve.
          </p>
          <LeadFormLight />
        </div>

        {/* Why SuitePacific */}
        <div className="mt-14" data-section="why-suitepacific">
          <h2 className="text-lg font-semibold text-brand-900 mb-6">Why do companies choose SuitePacific for NetSuite AI integration?</h2>
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
              <Link href="/netsuite-suitescript-development" className="text-accent hover:underline">
                NetSuite SuiteScript development
              </Link>{" "}
              covers the full range of custom scripting work, of which AI integration is one category.
            </li>
            <li className="text-sm text-brand-400">
              <Link href="/netsuite-integrations" className="text-accent hover:underline">
                NetSuite integrations
              </Link>{" "}
              covers third-party integrations generally, including RESTlets and OAuth 2.0 connections.
            </li>
            <li className="text-sm text-brand-400">
              <Link href="/blog/netsuite-bill-capture-preferences-2026-2" className="text-accent hover:underline">
                NetSuite Bill Capture preferences in 2026.2
              </Link>{" "}
              covers the specific configuration changes Oracle made to Bill Capture in the most recent release.
            </li>
            <li className="text-sm text-brand-400">
              <Link href="/suitecompare" className="text-accent hover:underline">
                SuiteCompare
              </Link>{" "}
              is SuitePacific&apos;s own NetSuite tool, which uses AI to analyze SuiteScript differences across environments, an example of the integration pattern applied to our own product.
            </li>
          </ul>
        </div>

        <ServiceFaqSection items={FAQ} />

        <div className="mt-10 rounded-2xl border border-brand-100 bg-white p-5 shadow-soft">
          <p className="text-sm font-semibold text-brand-900 mb-1">Ready to add AI to your NetSuite account?</p>
          <p className="text-sm text-brand-400 mb-4">
            Tell us what you want to achieve. We will identify whether it requires native
            feature configuration, a custom SuiteScript integration, or both, and propose
            how an engagement would work.
          </p>
          <LeadFormLight />
        </div>
      </div>
    </main>
  );
}

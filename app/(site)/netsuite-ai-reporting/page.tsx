import type { Metadata } from "next";
import Link from "next/link";
import {
  MessageSquare,
  BarChart2,
  TrendingUp,
  Zap,
  ShieldCheck,
  Users,
  Clock,
  RefreshCcw,
  CheckCircle2,
  XCircle,
} from "lucide-react";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Card } from "@/components/ui/Card";
import { IconBadge } from "@/components/ui/IconBadge";
import { BreadcrumbJsonLd, FaqJsonLd, ServiceJsonLd, OrganizationJsonLd, VideoObjectJsonLd } from "@/components/seo/JsonLd";
import { ServiceFaqSection } from "@/components/ui/ServiceFaqSection";
import { LeadFormLight } from "@/components/sections/LeadFormLight";
import { SITE_URL } from "@/lib/content";

const EXAMPLE_QUESTIONS = [
  {
    category: "Accounts receivable",
    questions: [
      "Which customers are more than 30 days overdue and have open sales orders?",
      "What is the total open AR balance by subsidiary this period?",
      "Which customers have exceeded their credit limit this month?",
    ],
  },
  {
    category: "Sales",
    questions: [
      "Which sales reps have open opportunities but no activity in the last 30 days?",
      "Which sales orders are pending approval and have a ship date within 7 days?",
      "How many new customers were billed for the first time this month?",
    ],
  },
  {
    category: "Purchasing and inventory",
    questions: [
      "Which open POs have a receipt date overdue by more than 14 days?",
      "Which items are below reorder point and have no open purchase orders?",
      "Which sales orders are waiting on inventory?",
    ],
  },
  {
    category: "Finance and operations",
    questions: [
      "What expense accounts have exceeded their monthly budget?",
      "Which journal entries were posted without an approver this quarter?",
      "What is the current cash balance by bank account?",
    ],
  },
];

const REPORTING_COMPARISON = [
  {
    aspect: "Best for",
    savedSearch: "Recurring, scheduled, and dashboard reporting",
    aiReporting: "Ad hoc questions, analysis, and management exploration",
    aiConnector: "Natural-language access through supported external AI clients",
  },
  {
    aspect: "Where it runs",
    savedSearch: "Inside NetSuite",
    aiReporting: "Inside NetSuite (embedded Suitelet)",
    aiConnector: "External AI client connected to NetSuite",
  },
  {
    aspect: "Setup required",
    savedSearch: "Search configuration in NetSuite",
    aiReporting: "Custom build scoped to account",
    aiConnector: "AI Connector configuration and role setup",
  },
  {
    aspect: "Access controls",
    savedSearch: "NetSuite role and search permissions",
    aiReporting: "Configured NetSuite role and Suitelet permissions",
    aiConnector: "NetSuite role permissions for the connected user",
  },
  {
    aspect: "Custom fields and records",
    savedSearch: "Supported in search configuration",
    aiReporting: "Incorporated during build",
    aiConnector: "Available via SuiteQL and custom tools",
  },
  {
    aspect: "Custom business logic",
    savedSearch: "In search criteria and formulas",
    aiReporting: "Custom SuiteScript logic around query execution",
    aiConnector: "Via custom SuiteScript tools",
  },
  {
    aspect: "User experience",
    savedSearch: "NetSuite list and portlet views",
    aiReporting: "Embedded interface in NetSuite",
    aiConnector: "External AI client interface",
  },
];

const HOW_IT_WORKS = [
  {
    step: "01",
    title: "Reporting requirements",
    description:
      "We identify who will use the assistant, what questions they ask most often, what reports already exist, and what data questions are not currently answered by a saved search or dashboard. This determines scope and architecture.",
  },
  {
    step: "02",
    title: "Account data-model review",
    description:
      "We review the account's standard records, custom records and fields, subsidiary structure, relevant record joins, role permissions, and existing SuiteQL and saved searches. This shapes the query logic and ensures the assistant is scoped to your account's actual data model.",
  },
  {
    step: "03",
    title: "Build and validate",
    description:
      "We build the reporting interface and AI query layer, then test it against a representative set of questions with known answers. Query generation is validated before execution; results are verified against the underlying NetSuite records before deployment.",
  },
  {
    step: "04",
    title: "Deployment and walkthrough",
    description:
      "We deploy to Production and walk the team through what the assistant can reliably answer, how to phrase questions for consistent results, what still requires a saved search or report, and how to validate material results against the underlying data.",
  },
];

const CUSTOM_FITS = [
  "A reporting interface embedded inside NetSuite rather than an external AI client",
  "Account-specific business terminology incorporated into query interpretation",
  "Custom fields and custom records included in the assistant's scope",
  "Controlled question scope with account-specific business rules applied before query execution",
  "Custom result formatting and display for specific teams",
  "Role-specific behavior or different question sets per user group",
  "Integration with existing Suitelets, workflows, or dashboards",
];

const NOT_FOR = [
  "Financial statements and audit-ready reports",
  "Scheduled and automated report delivery",
  "Saved searches embedded in NetSuite record views or workflows",
  "Regulatory reporting with deterministic formatting requirements",
  "Highly controlled accounting calculations",
];

const WHEN_IT_HELPS = [
  {
    icon: MessageSquare,
    title: "Ad hoc questions during meetings",
    description:
      "A question comes up in a management meeting that no saved search already answers. Instead of waiting until after the meeting for someone to build a search, the answer is available in the room.",
  },
  {
    icon: BarChart2,
    title: "Month-end and period-close review",
    description:
      "Finance teams ask a consistent set of questions at period close that vary slightly each time: different thresholds, different date ranges, different subsidiaries. The assistant handles variations without requiring a new saved search for each.",
  },
  {
    icon: TrendingUp,
    title: "Executive data requests",
    description:
      "Executives and managers who do not use NetSuite daily ask data questions that require someone else to pull a report. The assistant lets them query the data directly without needing saved search access or training.",
  },
  {
    icon: Zap,
    title: "Operational monitoring",
    description:
      "Operations teams checking on order status, inventory levels, or vendor performance can ask the assistant rather than navigating to the relevant saved search or running a report.",
  },
];

const WHY_SP = [
  {
    icon: ShieldCheck,
    title: "SuiteCloud Developer II certified",
    description:
      "The reporting assistant is a Suitelet connected to a SuiteQL layer. The same certification that covers SuiteScript and SuiteQL development covers this build. Credentials are verified against Oracle's exam standard.",
  },
  {
    icon: Users,
    title: "Account-specific data model",
    description:
      "The assistant is built for your specific NetSuite account: your record types, your custom fields, your subsidiary structure. It is not a generic NetSuite reporting tool; it knows your data.",
  },
  {
    icon: RefreshCcw,
    title: "Ongoing support available",
    description:
      "As your NetSuite account evolves, new custom fields, record types, and business rules may need to be incorporated. Ongoing support is available as your reporting requirements change.",
  },
  {
    icon: Clock,
    title: "Sandbox-first, always",
    description:
      "The assistant is built and tested in Sandbox, validated against representative questions and expected results, and deployed to Production only after validation passes.",
  },
];

const FAQ = [
  {
    question: "How does NetSuite AI reporting relate to Oracle's AI Connector Service?",
    answer:
      "Oracle's AI Connector Service provides natural-language access to NetSuite through supported external AI clients, including the ability to run SuiteQL, retrieve records, and execute saved searches. SuitePacific builds account-specific implementations for teams that need a controlled interface embedded inside NetSuite, custom query logic incorporating account-specific fields and records, or specific business rules applied before and after query execution. Depending on your requirements, SuitePacific can help configure the AI Connector for your account, develop custom SuiteScript tools that extend it, or build a Suitelet-based reporting interface.",
  },
  {
    question: "How accurate is natural-language NetSuite reporting?",
    answer:
      "Accuracy depends on the quality of the question, the account's data model, and the underlying NetSuite data. SuitePacific validates query generation and tests the assistant against a representative question set with known answers before deployment. For financial or operational decisions, users should validate material results against the underlying NetSuite records or established reports. The assistant is designed for exploration and ad hoc analysis, not as a substitute for audit-ready or compliance reporting.",
  },
  {
    question: "What NetSuite data can the AI reporting assistant access?",
    answer:
      "The assistant is configured around the records, fields, and SuiteQL-accessible data relevant to the implementation. Access remains subject to the configured NetSuite role and permissions. Sensitive records can be excluded by restricting the Suitelet role's access in the same way you would restrict any NetSuite user. Standard records and fields are available by default; custom record types and custom fields are incorporated during the build.",
  },
  {
    question: "Does NetSuite AI reporting replace saved searches?",
    answer:
      "No. Saved searches remain the better choice for recurring, scheduled, dashboard, and workflow-driven reporting. AI reporting is designed primarily for ad hoc questions and analysis where the specific question is not already built as a search. The two complement each other: saved searches for what you know you will always need, AI reporting for the questions that come up in the moment.",
  },
  {
    question: "How is the assistant deployed?",
    answer:
      "SuitePacific builds and tests the solution in Sandbox, validates it against representative questions and expected results, and deploys the approved configuration to Production. Users access it from a menu link or dashboard portlet inside their existing NetSuite account. No separate login or external application is required for the Suitelet-based implementation.",
  },
];

export const metadata: Metadata = {
  title: "NetSuite AI Reporting: Ask Questions in Plain Language",
  description:
    "Account-specific AI reporting for NetSuite. SuitePacific builds AI Connector setups and Suitelet-based assistants that let teams query NetSuite data in plain language, with role-aware access and account-specific business logic.",
  alternates: { canonical: "/netsuite-ai-reporting" },
  openGraph: {
    title: "NetSuite AI Reporting: Ask Questions in Plain Language",
    description:
      "Account-specific AI reporting for NetSuite. SuitePacific builds AI Connector setups and Suitelet-based assistants that let teams query NetSuite data in plain language, with role-aware access and account-specific business logic.",
    url: `${SITE_URL}/netsuite-ai-reporting`,
    type: "website",
    images: [{ url: `${SITE_URL}/og-default.png`, width: 1200, height: 630 }],
  },
};

export default function NetSuiteAiReportingPage() {
  return (
    <main className="pt-32 pb-24 sm:pt-40 sm:pb-32">
      <BreadcrumbJsonLd
        items={[
          { name: "Home", url: SITE_URL },
          { name: "NetSuite AI Reporting", url: `${SITE_URL}/netsuite-ai-reporting` },
        ]}
      />
      <FaqJsonLd items={FAQ} />
      <ServiceJsonLd
        name="NetSuite AI Reporting"
        description="Account-specific AI reporting for NetSuite. SuitePacific builds AI Connector setups and Suitelet-based assistants that let teams query NetSuite data in plain language with role-aware access and account-specific business logic."
        url={`${SITE_URL}/netsuite-ai-reporting`}
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
          eyebrow="AI Reporting"
          title="NetSuite AI Reporting: Ask Questions in Plain Language"
          subtitle="Give your team an account-specific way to query NetSuite data in plain language, without building a new saved search for every question."
          align="left"
        />

        <div className="mt-6 rounded-2xl border border-brand-100 bg-white p-5 shadow-soft">
          <LeadFormLight />
        </div>
        <p className="mt-3 text-xs text-brand-400">SuiteCloud Developer II certified · Suitelet-based · Account-specific data model · Role-aware access · Sandbox tested</p>

        <p className="mt-3 text-xs text-brand-300">Last updated August 2026</p>

        <div className="mt-6 rounded-2xl border-l-4 border-accent bg-brand-50/50 p-5">
          <p className="text-xs font-semibold uppercase tracking-wide text-accent mb-2">Quick answer</p>
          <p className="text-sm text-brand-700 leading-relaxed">
            NetSuite AI reporting gives teams a way to ask questions about NetSuite data
            in plain language and receive answers drawn from account records. Oracle&apos;s
            AI Connector Service already provides natural-language access to NetSuite
            through supported external AI clients, including the ability to run SuiteQL,
            retrieve records, and execute saved searches. SuitePacific builds on this
            foundation to deliver account-specific implementations: a controlled interface
            embedded directly in NetSuite, custom query logic incorporating account-specific
            fields and records, role-aware access aligned to existing NetSuite permissions,
            and result formatting specific to your reporting requirements. Depending on what
            your team needs, SuitePacific can help configure the AI Connector for your
            account, develop custom SuiteScript tools that extend it, or build a
            Suitelet-based reporting experience embedded inside NetSuite.
          </p>
        </div>

        <p className="mt-6 text-sm text-brand-400">
          Oracle&apos;s AI Connector Service provides a powerful foundation for natural-language
          access to NetSuite. SuitePacific can build an account-specific reporting
          experience when you need a controlled interface, custom business logic,
          account-specific fields and records, or a user experience embedded directly
          in NetSuite.
        </p>

        {/* Two implementation paths */}
        <div className="mt-14" data-section="implementation-paths">
          <h2 className="text-lg font-semibold text-brand-900 mb-5">Two implementation paths</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            <div className="rounded-2xl border border-brand-100 bg-brand-50/30 p-5">
              <p className="text-xs font-semibold uppercase tracking-wide text-brand-500 mb-2">Path 1</p>
              <p className="font-semibold text-brand-900 text-sm mb-2">AI Connector configuration</p>
              <p className="text-sm text-brand-400 mb-4">
                Oracle&apos;s AI Connector Service lets supported external AI clients access
                NetSuite in natural language. SuitePacific can help with setup, role and
                permission configuration, custom tool development via SuiteScript, and
                security review.
              </p>
              <p className="text-xs text-brand-400 font-medium">Best for: teams using a supported external AI client who want structured NetSuite access.</p>
            </div>
            <div className="rounded-2xl border border-accent/20 bg-accent/5 p-5">
              <p className="text-xs font-semibold uppercase tracking-wide text-accent mb-2">Path 2</p>
              <p className="font-semibold text-brand-900 text-sm mb-2">Custom Suitelet-based assistant</p>
              <p className="text-sm text-brand-400 mb-4">
                A reporting interface embedded directly inside NetSuite. Custom query
                logic built around account-specific records, fields, and business rules.
                Controlled question scope, custom result formatting, and role-specific
                behavior using existing NetSuite permissions.
              </p>
              <p className="text-xs text-brand-400 font-medium">Best for: teams who need a consistent UI inside NetSuite, account-specific logic, or a curated reporting scope.</p>
            </div>
          </div>
        </div>

        {/* Example questions */}
        <div className="mt-14" data-section="example-questions">
          <h2 className="text-lg font-semibold text-brand-900 mb-5">What questions can you ask a NetSuite AI reporting assistant?</h2>
          <p className="text-sm text-brand-400 mb-5">
            The most useful questions combine multiple NetSuite records and reflect
            actual business logic, not just single-table lookups.
          </p>
          <div className="space-y-5">
            {EXAMPLE_QUESTIONS.map((group) => (
              <div key={group.category} className="rounded-2xl border border-brand-100 bg-brand-50/30 p-5">
                <p className="text-xs font-semibold uppercase tracking-wide text-brand-500 mb-3">{group.category}</p>
                <ul className="space-y-2">
                  {group.questions.map((q) => (
                    <li key={q} className="text-sm text-brand-700 flex items-start gap-2">
                      <span className="text-accent mt-0.5 shrink-0">›</span>
                      <span>{q}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        {/* How it works */}
        <div className="mt-14" data-section="how-it-works">
          <h2 className="text-lg font-semibold text-brand-900 mb-4">How does the reporting assistant work?</h2>

          <div className="overflow-x-auto pb-2 mb-6">
            <div className="flex flex-col sm:flex-row items-stretch sm:items-start gap-2 sm:gap-0">
              <div className="rounded-xl border border-brand-100 bg-brand-50/30 px-3 py-3 text-center flex-1">
                <p className="text-[10px] font-semibold uppercase tracking-wide text-brand-400 mb-1">Input</p>
                <p className="text-xs font-medium text-brand-700">Plain-English question</p>
              </div>
              <div className="hidden sm:flex items-center justify-center px-1.5 text-brand-300 text-base">›</div>
              <div className="rounded-xl border border-brand-100 bg-brand-50/30 px-3 py-3 text-center flex-1">
                <p className="text-[10px] font-semibold uppercase tracking-wide text-brand-400 mb-1">Step 1</p>
                <p className="text-xs font-medium text-brand-700">AI interpretation and query generation</p>
              </div>
              <div className="hidden sm:flex items-center justify-center px-1.5 text-brand-300 text-base">›</div>
              <div className="rounded-xl border border-brand-100 bg-brand-50/30 px-3 py-3 text-center flex-1">
                <p className="text-[10px] font-semibold uppercase tracking-wide text-brand-400 mb-1">Step 2</p>
                <p className="text-xs font-medium text-brand-700">Validation and permission controls</p>
              </div>
              <div className="hidden sm:flex items-center justify-center px-1.5 text-brand-300 text-base">›</div>
              <div className="rounded-xl border border-brand-100 bg-brand-50/30 px-3 py-3 text-center flex-1">
                <p className="text-[10px] font-semibold uppercase tracking-wide text-brand-400 mb-1">Step 3</p>
                <p className="text-xs font-medium text-brand-700">SuiteQL against NetSuite data</p>
              </div>
              <div className="hidden sm:flex items-center justify-center px-1.5 text-brand-300 text-base">›</div>
              <div className="rounded-xl border border-accent/20 bg-accent/5 px-3 py-3 text-center flex-1">
                <p className="text-[10px] font-semibold uppercase tracking-wide text-accent mb-1">Output</p>
                <p className="text-xs font-medium text-brand-700">Formatted answer</p>
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

        {/* Comparison: Saved Searches vs AI Reporting vs AI Connector */}
        <div className="mt-14" data-section="comparison">
          <h2 className="text-lg font-semibold text-brand-900 mb-2">Saved searches, AI reporting, and AI Connector: which is right?</h2>
          <p className="text-sm text-brand-400 mb-5">
            Each serves a different use case. The right choice depends on where
            users work, how questions are asked, and what control the account needs.
          </p>
          <div className="overflow-x-auto rounded-2xl border border-brand-100">
            <table className="w-full text-sm min-w-[600px]">
              <thead>
                <tr className="border-b border-brand-100 bg-brand-50/50">
                  <th className="text-left p-4 font-semibold text-brand-900 w-1/4"></th>
                  <th className="text-left p-4 font-semibold text-brand-700">Saved searches</th>
                  <th className="text-left p-4 font-semibold text-accent">AI reporting (Suitelet)</th>
                  <th className="text-left p-4 font-semibold text-brand-700">AI Connector</th>
                </tr>
              </thead>
              <tbody>
                {REPORTING_COMPARISON.map((row, i) => (
                  <tr key={row.aspect} className={i < REPORTING_COMPARISON.length - 1 ? "border-b border-brand-100" : ""}>
                    <td className="p-4 font-medium text-brand-700 align-top">{row.aspect}</td>
                    <td className="p-4 text-brand-400 align-top">{row.savedSearch}</td>
                    <td className="p-4 text-brand-700 align-top">{row.aiReporting}</td>
                    <td className="p-4 text-brand-400 align-top">{row.aiConnector}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* When a custom assistant makes sense */}
        <div className="mt-14" data-section="when-custom">
          <h2 className="text-lg font-semibold text-brand-900 mb-2">When does a custom AI reporting assistant make sense?</h2>
          <p className="text-sm text-brand-400 mb-5">
            Oracle&apos;s AI Connector is the right starting point for many use cases.
            A custom Suitelet-based implementation adds value when the requirements
            go beyond what the Connector provides out of the box.
          </p>
          <div className="rounded-2xl border border-brand-100 bg-white p-5 mb-4">
            <p className="text-xs font-semibold uppercase tracking-wide text-accent mb-3">Good fit for a custom build</p>
            <ul className="space-y-2">
              {CUSTOM_FITS.map((item) => (
                <li key={item} className="flex items-start gap-2.5 text-sm text-brand-400">
                  <CheckCircle2 className="h-4 w-4 text-accent shrink-0 mt-0.5" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
          <div className="rounded-2xl border border-brand-100 bg-brand-50/30 p-5">
            <p className="text-xs font-semibold uppercase tracking-wide text-brand-400 mb-3">AI reporting is not intended to replace</p>
            <ul className="space-y-2">
              {NOT_FOR.map((item) => (
                <li key={item} className="flex items-start gap-2.5 text-sm text-brand-400">
                  <XCircle className="h-4 w-4 text-brand-300 shrink-0 mt-0.5" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
            <p className="text-xs text-brand-300 mt-3">
              AI-generated answers should be reviewed before being used for material financial or operational decisions.
            </p>
          </div>
        </div>

        {/* When it helps */}
        <div className="mt-14" data-section="when-it-helps">
          <h2 className="text-lg font-semibold text-brand-900 mb-6">Where does AI reporting add value that saved searches do not?</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            {WHEN_IT_HELPS.map((item) => (
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
          <p className="text-sm font-semibold text-brand-900 mb-1">What data questions come up most in your team?</p>
          <p className="text-sm text-brand-400 mb-4">
            Tell us the types of questions your finance or operations team asks
            repeatedly that are not already in a saved search. We will explain
            which implementation path fits your account and requirements.
          </p>
          <LeadFormLight />
        </div>

        {/* Why SuitePacific */}
        <div className="mt-14" data-section="why-suitepacific">
          <h2 className="text-lg font-semibold text-brand-900 mb-6">Why do companies choose SuitePacific for NetSuite AI reporting?</h2>
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
              covers the full range of AI integration options for live NetSuite accounts, including the AI Connector Service and custom SuiteScript integrations.
            </li>
            <li className="text-sm text-brand-400">
              <Link href="/netsuite-saved-searches-dashboards" className="text-accent hover:underline">
                NetSuite saved searches and dashboards
              </Link>{" "}
              covers the standard reporting layer that AI reporting complements.
            </li>
            <li className="text-sm text-brand-400">
              <Link href="/netsuite-ai-optimization-assessment" className="text-accent hover:underline">
                NetSuite AI Optimization Assessment
              </Link>{" "}
              is a discovery engagement that identifies where AI can improve reporting and other workflows before any implementation begins.
            </li>
            <li className="text-sm text-brand-400">
              <Link href="/blog/netsuite-saved-search-tips" className="text-accent hover:underline">
                NetSuite saved search tips
              </Link>{" "}
              covers how to get more from the existing saved search layer.
            </li>
          </ul>
        </div>

        <ServiceFaqSection items={FAQ} />

        <div className="mt-10 rounded-2xl border border-brand-100 bg-white p-5 shadow-soft">
          <p className="text-sm font-semibold text-brand-900 mb-1">Ready to query your NetSuite data in plain language?</p>
          <p className="text-sm text-brand-400 mb-4">
            Tell us which data questions your team asks most often that are not
            already in a saved search. We will explain which implementation path
            fits your account and requirements.
          </p>
          <LeadFormLight />
        </div>
      </div>
    </main>
  );
}

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
  Sparkles,
} from "lucide-react";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Card } from "@/components/ui/Card";
import { IconBadge } from "@/components/ui/IconBadge";
import { BreadcrumbJsonLd, FaqJsonLd, ServiceJsonLd } from "@/components/seo/JsonLd";
import { ServiceFaqSection } from "@/components/ui/ServiceFaqSection";
import { LeadFormLight } from "@/components/sections/LeadFormLight";
import { SITE_URL } from "@/lib/content";

const EXAMPLE_QUESTIONS = [
  {
    category: "Accounts receivable",
    questions: [
      "Which customers have invoices overdue by more than 60 days?",
      "What is the total open AR balance by subsidiary?",
      "Which customers have exceeded their credit limit this month?",
    ],
  },
  {
    category: "Inventory and purchasing",
    questions: [
      "Which items are below reorder point and have no open purchase orders?",
      "What is average days on hand by item class for the last 90 days?",
      "Which vendors have open POs that are more than 30 days past expected receipt?",
    ],
  },
  {
    category: "Sales and revenue",
    questions: [
      "What was gross margin by item category last quarter?",
      "Which sales orders are pending approval and have a ship date within 7 days?",
      "How many new customers were billed for the first time this month?",
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

const HOW_IT_WORKS = [
  {
    step: "01",
    title: "Data model review",
    description:
      "We review your NetSuite account's record structure: which modules are active, which custom fields exist, and which questions your team asks repeatedly that are not already answered by a saved search or dashboard. This determines what the assistant can reliably answer.",
  },
  {
    step: "02",
    title: "SuiteQL interface build",
    description:
      "We build a Suitelet with a natural language input. The Suitelet calls an AI model that converts the question to a SuiteQL query specific to your account's data structure, runs it against your NetSuite account, and returns a formatted result. Built and tested in Sandbox before Production.",
  },
  {
    step: "03",
    title: "Deployment and team walkthrough",
    description:
      "We deploy to Production and walk your team through what the assistant can answer reliably and how to phrase questions for consistent results. The assistant's scope is documented so users know what to ask versus what still requires a saved search.",
  },
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
      "Finance teams ask a consistent set of questions at period close that vary slightly each time — different thresholds, different date ranges, different subsidiaries. The assistant handles variations without requiring a new saved search for each.",
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
      "Operations teams checking on order status, inventory levels, or vendor performance can ask the assistant rather than navigating to the relevant saved search or running a report. Faster than searching for the right search.",
  },
];

const WHY_SP = [
  {
    icon: ShieldCheck,
    title: "SuiteCloud Developer II certified",
    description:
      "The reporting assistant is a Suitelet connected to a SuiteQL layer. The same certification that covers SuiteScript and SuiteQL development covers this build. Credentials are verified against Oracle&apos;s exam standard.",
  },
  {
    icon: Sparkles,
    title: "Existing AI build experience",
    description:
      "SuiteCompare&apos;s AI panel already connects NetSuite SuiteScript data to an AI model and returns structured analysis. The natural language reporting assistant applies the same integration pattern to your account&apos;s data model.",
  },
  {
    icon: Users,
    title: "Account-specific data model",
    description:
      "The assistant is built for your specific NetSuite account: your record types, your custom fields, your subsidiary structure. It is not a generic NetSuite reporting tool; it knows your data.",
  },
  {
    icon: Clock,
    title: "Month-to-month maintenance",
    description:
      "As your account evolves, new custom fields and record types may need to be added to the assistant&apos;s scope. Maintenance is handled under a monthly retainer without separate project scopes for each addition.",
  },
];

const FAQ = [
  {
    question: "What is NetSuite AI reporting?",
    answer:
      "NetSuite AI reporting is a natural language interface that lets users ask questions about their NetSuite data in plain English and receive answers drawn from live records. The interface accepts a question, converts it to a SuiteQL query using an AI model, runs the query against the NetSuite account, and returns a formatted result. It is built as a Suitelet deployed inside NetSuite so users access it directly from their existing account without logging into a separate system. The assistant is specific to the account it is built for: it knows that account's record structure, custom fields, and subsidiaries.",
  },
  {
    question: "How accurate is natural language NetSuite reporting?",
    answer:
      "Accuracy depends on how well-defined the question is and how standard the underlying data is. Questions about standard NetSuite records and fields (invoices, customers, items, vendors, purchase orders) return accurate results because the SuiteQL schema for these records is consistent. Questions involving complex joins, custom field calculations, or unusual subsidiary configurations may require more precise phrasing. During the build process, we test the assistant against a set of representative questions from your team and tune the query generation for your specific data model before deployment.",
  },
  {
    question: "Does NetSuite AI reporting replace saved searches?",
    answer:
      "No. Saved searches serve a different purpose: scheduled reports, embedded list views, KPI portlets, and operational dashboards that need to run automatically or be visible on a record. The AI reporting assistant serves ad hoc questions that arise during analysis, period close, or meetings where the answer is not already built as a report. The two complement each other. Standard, recurring data needs should stay as saved searches. Ad hoc and exploratory questions are where the assistant adds value.",
  },
  {
    question: "What NetSuite data can the AI reporting assistant access?",
    answer:
      "The assistant can access any record type and field that the Suitelet's execution role has access to in your NetSuite account. Standard records (transactions, customers, vendors, items, employees, projects) are accessible by default. Custom record types and custom fields are included when they are in scope during the build. Sensitive records can be excluded by restricting the Suitelet role's permissions in the same way you would restrict access for any NetSuite user.",
  },
  {
    question: "How is the NetSuite AI reporting assistant deployed?",
    answer:
      "The assistant is deployed as a Suitelet inside your NetSuite account. Users access it from a menu link or a dashboard portlet, depending on how your account is configured. It does not require a separate login or external application. The Suitelet calls an external AI API to convert questions to SuiteQL, then runs the query against your account using the standard SuiteQL module. All queries run within your NetSuite governance and permission framework.",
  },
];

export const metadata: Metadata = {
  title: "NetSuite AI Reporting: Natural Language Data Assistant",
  description:
    "Ask questions about your NetSuite data in plain English. A natural language interface converts questions to SuiteQL and returns answers from live records — without building a saved search for every question.",
  alternates: { canonical: "/netsuite-ai-reporting" },
  openGraph: {
    title: "NetSuite AI Reporting: Natural Language Data Assistant",
    description:
      "Ask questions about your NetSuite data in plain English. A natural language interface converts questions to SuiteQL and returns answers from live records — without building a saved search for every question.",
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
        description="Natural language reporting interface for NetSuite that converts plain-English questions to SuiteQL queries and returns answers from live account records."
        url={`${SITE_URL}/netsuite-ai-reporting`}
        serviceType="NetSuite Consulting"
      />

      <div className="mx-auto max-w-3xl px-6 lg:px-8">
        <SectionHeading
          as="h1"
          eyebrow="AI Reporting"
          title="NetSuite AI Reporting: Ask Questions in Plain Language"
          subtitle="Ask questions about your NetSuite data in plain English and get answers from live records — without building a saved search for every question."
          align="left"
        />

        <div className="mt-6 rounded-2xl border border-brand-100 bg-white p-5 shadow-soft">
          <LeadFormLight />
        </div>
        <p className="mt-3 text-xs text-brand-400">SuiteCloud Developer II certified · Built as a Suitelet · Account-specific data model · Sandbox tested</p>

        <p className="mt-3 text-xs text-brand-300">Last updated August 2026</p>

        <div className="mt-6 rounded-2xl border-l-4 border-accent bg-brand-50/50 p-5">
          <p className="text-xs font-semibold uppercase tracking-wide text-accent mb-2">Quick answer</p>
          <p className="text-sm text-brand-700 leading-relaxed">
            NetSuite AI reporting lets users ask questions about their NetSuite data in
            plain language and receive answers drawn from live records. Instead of building
            a saved search for every question, a natural language interface accepts a question,
            converts it to a SuiteQL query using an AI model, runs the query against the
            NetSuite account, and returns a formatted result. Typical questions include: which
            customers have invoices overdue by more than 60 days, what was gross margin by
            item category last quarter, how many sales orders are pending approval, and which
            vendors have open purchase orders past their expected receipt date. The system
            does not replace saved searches for operational dashboards and scheduled reports.
            It serves a different use case: ad hoc questions that arise during analysis,
            month-end review, or a management meeting where the answer is not already built
            as a report.
          </p>
        </div>

        <p className="mt-6 text-sm text-brand-400">
          Saved searches are built for questions you know you will ask repeatedly. The
          AI reporting assistant handles the questions you did not anticipate: the
          follow-up in a finance meeting, the variant on last quarter&apos;s report, the
          operational check that comes up once and is never the same twice.
        </p>

        {/* Example questions */}
        <div className="mt-14" data-section="example-questions">
          <h2 className="text-lg font-semibold text-brand-900 mb-5">What questions can you ask a NetSuite AI reporting assistant?</h2>
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
          <h2 className="text-lg font-semibold text-brand-900 mb-6">How does NetSuite AI reporting work?</h2>
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

        {/* When it helps */}
        <div className="mt-14" data-section="when-it-helps">
          <h2 className="text-lg font-semibold text-brand-900 mb-1">Does NetSuite AI reporting replace saved searches?</h2>
          <p className="text-sm text-brand-400 mb-6">
            No. The assistant and saved searches serve different purposes. Here is where
            the assistant adds value that saved searches do not cover.
          </p>
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
            what the assistant would handle for your specific account.
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
              covers the full range of AI integrations available for live NetSuite accounts.
            </li>
            <li className="text-sm text-brand-400">
              <Link href="/netsuite-saved-searches-dashboards" className="text-accent hover:underline">
                NetSuite saved searches and dashboards
              </Link>{" "}
              covers the standard reporting layer that AI reporting complements.
            </li>
            <li className="text-sm text-brand-400">
              <Link href="/blog/netsuite-saved-search-tips" className="text-accent hover:underline">
                NetSuite saved search tips
              </Link>{" "}
              covers how to get more from the existing saved search layer.
            </li>
            <li className="text-sm text-brand-400">
              <Link href="/suitecompare" className="text-accent hover:underline">
                SuiteCompare
              </Link>{" "}
              is SuitePacific&apos;s own NetSuite tool using the same AI integration pattern — connecting NetSuite data to an AI model and returning structured analysis.
            </li>
          </ul>
        </div>

        <ServiceFaqSection items={FAQ} />

        <div className="mt-10 rounded-2xl border border-brand-100 bg-white p-5 shadow-soft">
          <p className="text-sm font-semibold text-brand-900 mb-1">Ready to query your NetSuite data in plain English?</p>
          <p className="text-sm text-brand-400 mb-4">
            Tell us which data questions your team asks most often that are not
            already in a saved search. We will explain what the assistant would
            cover for your specific account.
          </p>
          <LeadFormLight />
        </div>
      </div>
    </main>
  );
}

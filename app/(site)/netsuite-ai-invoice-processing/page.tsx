import type { Metadata } from "next";
import Link from "next/link";
import {
  FileText,
  CheckCircle2,
  Zap,
  AlertCircle,
  ShieldCheck,
  Users,
  Clock,
  RefreshCcw,
  XCircle,
} from "lucide-react";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Card } from "@/components/ui/Card";
import { IconBadge } from "@/components/ui/IconBadge";
import { BreadcrumbJsonLd, FaqJsonLd, ServiceJsonLd, OrganizationJsonLd, VideoObjectJsonLd } from "@/components/seo/JsonLd";
import { ServiceFaqSection } from "@/components/ui/ServiceFaqSection";
import { LeadFormLight } from "@/components/sections/LeadFormLight";
import { SITE_URL } from "@/lib/content";

const WHAT_IT_HANDLES = [
  {
    icon: FileText,
    title: "Non-standard and complex invoice formats",
    description:
      "Vendor invoices with varied layouts, multi-page structures, or processing requirements that go beyond your current invoice capture setup. Designed to handle a range of invoice layouts, including those that require custom extraction or processing logic.",
  },
  {
    icon: CheckCircle2,
    title: "Line-item extraction and PO matching",
    description:
      "AI extracts individual invoice lines, including descriptions, quantities, unit prices, and other available fields, then SuiteScript validates them against the relevant vendor, purchase order, item, and accounting rules in NetSuite. Mismatches are flagged before a bill record is created.",
  },
  {
    icon: AlertCircle,
    title: "Confidence-based exception routing",
    description:
      "Invoices that fail configured validation or confidence thresholds are routed for human review rather than automatically creating a bill. The review queue shows extracted data pre-filled so the reviewer corrects only the fields that failed, not the full invoice.",
  },
  {
    icon: Zap,
    title: "Custom business logic",
    description:
      "SuiteScript handles the decisions AI cannot: which NetSuite vendor matches, which PO lines apply, what happens when quantities differ, whether a bill should be held or created, and who reviews it. This is where NetSuite expertise matters as much as AI extraction.",
  },
];

const BILL_CAPTURE_COMPARISON = [
  {
    aspect: "Purpose",
    billCapture: "Native invoice capture in NetSuite",
    aiProcessing: "Custom AI-assisted invoice processing",
  },
  {
    aspect: "Invoice extraction",
    billCapture: "Native Bill Capture extraction",
    aiProcessing: "Custom extraction tailored to the client's workflow",
  },
  {
    aspect: "Vendor-specific configuration",
    billCapture: "Bill Capture templates supported",
    aiProcessing: "Custom processing rules and validation",
  },
  {
    aspect: "Line-item processing",
    billCapture: "Native invoice and PO capabilities",
    aiProcessing: "Custom line extraction and PO and item validation",
  },
  {
    aspect: "Business rules",
    billCapture: "NetSuite configuration",
    aiProcessing: "Custom SuiteScript logic",
  },
  {
    aspect: "Exception handling",
    billCapture: "Native Bill Capture review workflow",
    aiProcessing: "Custom confidence thresholds and exception routing",
  },
  {
    aspect: "Custom fields",
    billCapture: "Based on supported configuration",
    aiProcessing: "Can populate account-specific custom fields",
  },
  {
    aspect: "Workflow integration",
    billCapture: "NetSuite native workflow",
    aiProcessing: "Custom SuiteScript and workflow integration",
  },
  {
    aspect: "Architecture",
    billCapture: "Native NetSuite feature",
    aiProcessing: "N/documentCapture and SuiteScript, as appropriate",
  },
  {
    aspect: "Best fit",
    billCapture: "Standard invoice capture requirements",
    aiProcessing: "Complex or highly customized AP workflows",
  },
];

const HOW_IT_WORKS = [
  {
    step: "01",
    title: "Invoice format and workflow audit",
    description:
      "We collect 10 to 30 representative vendor invoice samples from your AP team, covering different vendors and format variations. We assess what your current setup handles and where gaps exist. This determines the scope and design of the integration.",
  },
  {
    step: "02",
    title: "Integration design and build",
    description:
      "We design the document extraction logic using Oracle's N/documentCapture API, build the SuiteScript integration that handles field and line-item extraction, configure PO and vendor matching logic, and set up confidence-based exception routing. All development is done in your Sandbox account before Production is touched.",
  },
  {
    step: "03",
    title: "Validation testing and Production deployment",
    description:
      "We test against the representative invoice sample set, validate that extracted data aligns with NetSuite records for vendors, POs, and items, and measure extraction accuracy across header, line, and totals fields. Production deployment happens only after validation passes.",
  },
];

const GOOD_FIT = [
  "Your AP team manually keys invoice data into NetSuite",
  "Vendors use many different invoice layouts",
  "Invoice line items require manual entry or PO matching",
  "Bill Capture requires significant manual correction before bills can be created",
  "You need custom validation logic before a Vendor Bill is created",
  "You want invoices with low confidence or mismatched lines routed for review rather than auto-created",
  "Your invoices need to populate account-specific custom fields",
];

const WHY_SP = [
  {
    icon: ShieldCheck,
    title: "SuiteCloud Developer II certified",
    description:
      "The integration is built as a SuiteScript. The same certification that covers custom script development covers the AI extraction integration. Credentials are verified, not self-declared.",
  },
  {
    icon: Users,
    title: "Direct access to the developer",
    description:
      "You work directly with the consultant building the integration. Vendor format questions, exception handling decisions, and PO matching logic are resolved in direct conversation, not through a ticket system.",
  },
  {
    icon: RefreshCcw,
    title: "Ongoing support available",
    description:
      "Vendor invoice formats change, AI extraction APIs update, and new vendors are added over time. Ongoing support for the integration is available as your AP workflow, vendor formats, NetSuite configuration, and AI services evolve.",
  },
  {
    icon: Clock,
    title: "Sandbox-first, always",
    description:
      "Every change to the integration is built and tested in Sandbox before it touches Production. No untested changes reach your live AP workflow.",
  },
];

const FAQ = [
  {
    question: "What is the difference between NetSuite AI invoice processing and Oracle Bill Capture?",
    answer:
      "Oracle Bill Capture is NetSuite's native invoice capture feature. It supports Bill Capture templates for specific vendor and subsidiary combinations, partial billing, and PO matching for invoices it processes. AI invoice processing is a custom SuiteScript integration built around Oracle's N/documentCapture API. It adds custom extraction logic, custom validation rules, custom PO and line-item matching, and configurable exception routing for AP workflows that require more than the current native setup provides. The two can work alongside each other: native Bill Capture for invoices your current setup handles well, custom AI processing for those that require additional extraction, validation, or business logic.",
  },
  {
    question: "Which vendor invoice formats can AI invoice processing handle?",
    answer:
      "The integration is designed to handle a range of vendor invoice layouts, including non-standard, multi-page, and complex invoice formats. Oracle's N/documentCapture module supports field extraction, table extraction, text extraction, document classification, and extraction confidence levels for invoice documents. The confidence levels are used to determine whether an invoice passes automatically or is routed for review. We test against your representative invoice samples before confirming what the integration handles, so extraction accuracy is measured against your actual vendor set before Production deployment.",
  },
  {
    question: "Does AI invoice processing create NetSuite bill records automatically?",
    answer:
      "Yes, for invoices that pass validation. The integration extracts invoice data, validates it against NetSuite vendor records, purchase orders, and item catalog, applies account-specific business rules, and creates a bill record. Invoices that fail configured validation or confidence thresholds are routed to a review queue rather than processed automatically. The review queue shows the extracted data pre-filled so the reviewer corrects only the fields that failed, not the full invoice.",
  },
  {
    question: "How long does it take to build a NetSuite AI invoice processing integration?",
    answer:
      "For a defined scope covering a representative set of vendor formats, the build typically takes two to three weeks from invoice sample collection to Sandbox testing complete. Production deployment follows after validation. Timeline depends on the number of vendor formats, the complexity of PO and line-item matching rules, and how many exception routing workflows are configured. We scope the engagement after reviewing 10 to 30 representative invoice samples from your vendor set.",
  },
  {
    question: "Is AI invoice processing a one-time build or an ongoing service?",
    answer:
      "The initial integration is a one-time build scoped as a project. Ongoing support is available separately: vendor invoice formats change, AI extraction APIs update, and new vendors are added over time. Ongoing maintenance is best handled under a monthly retainer, which allows format additions and extraction logic adjustments to be made as they arise without a separate project scope for each change.",
  },
];

export const metadata: Metadata = {
  title: "NetSuite AI Invoice Processing",
  description:
    "Extend NetSuite invoice automation with AI-powered extraction, line-item validation, PO matching, and exception routing. Custom SuiteScript integration built on Oracle's N/documentCapture. SuiteCloud Developer II certified.",
  alternates: { canonical: "/netsuite-ai-invoice-processing" },
  openGraph: {
    title: "NetSuite AI Invoice Processing",
    description:
      "Extend NetSuite invoice automation with AI-powered extraction, line-item validation, PO matching, and exception routing. Custom SuiteScript integration built on Oracle's N/documentCapture. SuiteCloud Developer II certified.",
    url: `${SITE_URL}/netsuite-ai-invoice-processing`,
    type: "website",
    images: [{ url: `${SITE_URL}/og-default.png`, width: 1200, height: 630 }],
  },
};

export default function NetSuiteAiInvoiceProcessingPage() {
  return (
    <main className="pt-32 pb-24 sm:pt-40 sm:pb-32">
      <BreadcrumbJsonLd
        items={[
          { name: "Home", url: SITE_URL },
          { name: "NetSuite AI Invoice Processing", url: `${SITE_URL}/netsuite-ai-invoice-processing` },
        ]}
      />
      <FaqJsonLd items={FAQ} />
      <ServiceJsonLd
        name="NetSuite AI Invoice Processing"
        description="Custom SuiteScript integration using Oracle's N/documentCapture API to extend NetSuite invoice automation with AI extraction, line-item validation, PO matching, and exception routing."
        url={`${SITE_URL}/netsuite-ai-invoice-processing`}
        serviceType="NetSuite Integration"
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
          eyebrow="AI Invoice Processing"
          title="NetSuite AI Invoice Processing"
          subtitle="Extend NetSuite invoice automation with AI-powered extraction, validation, PO matching, and exception handling built on SuiteScript and Oracle's N/documentCapture API."
          align="left"
        />

        <div className="mt-6 rounded-2xl border border-brand-100 bg-white p-5 shadow-soft">
          <LeadFormLight />
        </div>
        <p className="mt-3 text-xs text-brand-400">SuiteCloud Developer II certified · SuiteScript-based · Sandbox testing · Custom PO and line-item validation</p>

        <p className="mt-3 text-xs text-brand-300">Last updated August 2026</p>

        <div className="mt-6 rounded-2xl border-l-4 border-accent bg-brand-50/50 p-5">
          <p className="text-xs font-semibold uppercase tracking-wide text-accent mb-2">Quick answer</p>
          <p className="text-sm text-brand-700 leading-relaxed">
            NetSuite AI invoice processing is a custom SuiteScript integration that extends
            NetSuite&apos;s AP workflow with AI-powered invoice data extraction, line-item
            validation, PO matching, and exception routing. The integration uses Oracle&apos;s
            N/documentCapture API, available since NetSuite 2025.2, which supports field
            extraction, table extraction, document classification, and extraction confidence
            levels for invoice documents. Extracted data passes through validation: header
            fields are checked against vendor master records, line items are validated
            against purchase orders and item records, and account-specific business rules
            are applied via SuiteScript. Invoices that fail configured validation or
            confidence thresholds are routed for human review rather than automatically
            creating a bill. The integration complements NetSuite&apos;s native invoice capture
            by adding custom extraction logic, validation rules, and exception handling for
            AP workflows that require more than the current setup provides.
          </p>
        </div>

        <p className="mt-6 text-sm text-brand-400">
          SuitePacific builds custom AI-assisted invoice processing workflows for NetSuite
          customers whose AP requirements go beyond their current invoice capture setup.
          The solution can extract invoice data, process line items, validate vendors and
          purchase orders, apply account-specific business rules, and route exceptions for
          human review before a Vendor Bill is created. Oracle&apos;s N/documentCapture module
          provides the extraction foundation; SuiteScript handles the NetSuite-specific
          validation and workflow logic that makes the solution specific to your account.
        </p>

        {/* What it handles */}
        <div className="mt-14" data-section="what-it-handles">
          <h2 className="text-lg font-semibold text-brand-900 mb-6">What does AI invoice processing add to NetSuite?</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            {WHAT_IT_HANDLES.map((item) => (
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

        {/* Comparison table */}
        <div className="mt-14" data-section="comparison">
          <h2 className="text-lg font-semibold text-brand-900 mb-2">Oracle Bill Capture vs. SuitePacific AI Invoice Processing</h2>
          <p className="text-sm text-brand-400 mb-5">
            Oracle provides the foundation. SuitePacific customizes the extraction,
            validation, and exception handling around it.
          </p>
          <div className="overflow-x-auto rounded-2xl border border-brand-100">
            <table className="w-full text-sm min-w-[520px]">
              <thead>
                <tr className="border-b border-brand-100 bg-brand-50/50">
                  <th className="text-left p-4 font-semibold text-brand-900 w-1/3"></th>
                  <th className="text-left p-4 font-semibold text-brand-700">Oracle Bill Capture</th>
                  <th className="text-left p-4 font-semibold text-accent">SuitePacific AI Processing</th>
                </tr>
              </thead>
              <tbody>
                {BILL_CAPTURE_COMPARISON.map((row, i) => (
                  <tr key={row.aspect} className={i < BILL_CAPTURE_COMPARISON.length - 1 ? "border-b border-brand-100" : ""}>
                    <td className="p-4 font-medium text-brand-700 align-top">{row.aspect}</td>
                    <td className="p-4 text-brand-400 align-top">{row.billCapture}</td>
                    <td className="p-4 text-brand-700 align-top">{row.aiProcessing}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* How it works */}
        <div className="mt-14" data-section="how-it-works">
          <h2 className="text-lg font-semibold text-brand-900 mb-4">How does the integration process invoices?</h2>

          <div className="overflow-x-auto pb-2 mb-6">
            <div className="flex flex-col sm:flex-row items-stretch sm:items-start gap-2 sm:gap-0">
              <div className="rounded-xl border border-brand-100 bg-brand-50/30 px-3 py-3 text-center flex-1">
                <p className="text-[10px] font-semibold uppercase tracking-wide text-brand-400 mb-1">Input</p>
                <p className="text-xs font-medium text-brand-700">Vendor invoice</p>
              </div>
              <div className="hidden sm:flex items-center justify-center px-1.5 text-brand-300 text-base">›</div>
              <div className="rounded-xl border border-brand-100 bg-brand-50/30 px-3 py-3 text-center flex-1">
                <p className="text-[10px] font-semibold uppercase tracking-wide text-brand-400 mb-1">Step 1</p>
                <p className="text-xs font-medium text-brand-700">AI extraction (N/documentCapture)</p>
              </div>
              <div className="hidden sm:flex items-center justify-center px-1.5 text-brand-300 text-base">›</div>
              <div className="rounded-xl border border-brand-100 bg-brand-50/30 px-3 py-3 text-center flex-1">
                <p className="text-[10px] font-semibold uppercase tracking-wide text-brand-400 mb-1">Step 2</p>
                <p className="text-xs font-medium text-brand-700">Confidence and data validation</p>
              </div>
              <div className="hidden sm:flex items-center justify-center px-1.5 text-brand-300 text-base">›</div>
              <div className="rounded-xl border border-brand-100 bg-brand-50/30 px-3 py-3 text-center flex-1">
                <p className="text-[10px] font-semibold uppercase tracking-wide text-brand-400 mb-1">Step 3</p>
                <p className="text-xs font-medium text-brand-700">Vendor, PO, and item matching</p>
              </div>
              <div className="hidden sm:flex items-center justify-center px-1.5 text-brand-300 text-base">›</div>
              <div className="flex flex-col gap-2 flex-1">
                <div className="rounded-xl border border-accent/20 bg-accent/5 px-3 py-3 text-center">
                  <p className="text-[10px] font-semibold uppercase tracking-wide text-accent mb-1">Pass</p>
                  <p className="text-xs font-medium text-brand-700">Vendor Bill created</p>
                </div>
                <div className="rounded-xl border border-brand-200 bg-brand-50/50 px-3 py-3 text-center">
                  <p className="text-[10px] font-semibold uppercase tracking-wide text-brand-400 mb-1">Exception</p>
                  <p className="text-xs font-medium text-brand-500">Human review queue</p>
                </div>
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

        {/* Mid-page CTA */}
        <div className="mt-10 rounded-2xl border border-brand-100 bg-white p-5 shadow-soft">
          <p className="text-sm font-semibold text-brand-900 mb-1">What does your AP team handle manually today?</p>
          <p className="text-sm text-brand-400 mb-4">
            Tell us about your vendor invoice volume and where your current setup
            requires manual intervention. We will explain what a custom AI invoice
            processing integration would cover for your specific AP workflow.
          </p>
          <LeadFormLight />
        </div>

        {/* When is this right for you */}
        <div className="mt-14" data-section="when-appropriate">
          <h2 className="text-lg font-semibold text-brand-900 mb-2">When is AI invoice processing the right fit?</h2>
          <p className="text-sm text-brand-400 mb-5">
            This service is designed for AP workflows with specific requirements
            that go beyond your current NetSuite setup. It is not the right
            answer for every AP team.
          </p>
          <div className="rounded-2xl border border-brand-100 bg-white p-5 mb-4">
            <p className="text-xs font-semibold uppercase tracking-wide text-accent mb-3">Good fit</p>
            <ul className="space-y-2">
              {GOOD_FIT.map((item) => (
                <li key={item} className="flex items-start gap-2.5 text-sm text-brand-400">
                  <CheckCircle2 className="h-4 w-4 text-accent shrink-0 mt-0.5" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
          <div className="rounded-2xl border border-brand-100 bg-brand-50/30 p-5">
            <p className="text-xs font-semibold uppercase tracking-wide text-brand-400 mb-3">Probably not needed</p>
            <div className="flex items-start gap-2.5 text-sm text-brand-400">
              <XCircle className="h-4 w-4 text-brand-300 shrink-0 mt-0.5" />
              <span>
                If Bill Capture already processes your invoices accurately with minimal
                manual review, a custom AI integration may not provide enough additional
                value to justify the build and ongoing maintenance.
              </span>
            </div>
          </div>
        </div>

        {/* Why SuitePacific */}
        <div className="mt-14" data-section="why-suitepacific">
          <h2 className="text-lg font-semibold text-brand-900 mb-6">Why do companies choose SuitePacific for this?</h2>
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
              covers the full range of AI integration options for live NetSuite accounts, including native features and custom SuiteScript integrations.
            </li>
            <li className="text-sm text-brand-400">
              <Link href="/netsuite-ai-optimization-assessment" className="text-accent hover:underline">
                NetSuite AI Optimization Assessment
              </Link>{" "}
              is a discovery engagement that identifies where AI can improve your AP workflow before any implementation begins.
            </li>
            <li className="text-sm text-brand-400">
              <Link href="/netsuite-integrations" className="text-accent hover:underline">
                NetSuite integrations
              </Link>{" "}
              covers third-party integrations generally, including the SuiteScript patterns used in invoice processing.
            </li>
            <li className="text-sm text-brand-400">
              <Link href="/blog/netsuite-ai-invoice-staging-pattern" className="text-accent hover:underline">
                NetSuite AI invoice processing: staging in a custom record vs. bill unapproved status
              </Link>{" "}
              covers the architectural tradeoff between native Vendor Bills and custom staging records when AI-extracted data needs a review layer before it becomes a transaction.
            </li>
            <li className="text-sm text-brand-400">
              <Link href="/blog/netsuite-bill-capture-preferences-2026-2" className="text-accent hover:underline">
                NetSuite Bill Capture preferences in 2026.2
              </Link>{" "}
              covers what changed in Oracle&apos;s native Bill Capture in the most recent release.
            </li>
          </ul>
        </div>

        <ServiceFaqSection items={FAQ} />

        <div className="mt-10 rounded-2xl border border-brand-100 bg-white p-5 shadow-soft">
          <p className="text-sm font-semibold text-brand-900 mb-1">Ready to assess your AP invoice workflow?</p>
          <p className="text-sm text-brand-400 mb-4">
            Tell us about your vendor invoice volume and which parts of your AP
            process still require manual work. We will scope what a custom AI
            invoice processing integration would cover for your account.
          </p>
          <LeadFormLight />
        </div>
      </div>
    </main>
  );
}

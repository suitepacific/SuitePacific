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
} from "lucide-react";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Card } from "@/components/ui/Card";
import { IconBadge } from "@/components/ui/IconBadge";
import { BreadcrumbJsonLd, FaqJsonLd, ServiceJsonLd } from "@/components/seo/JsonLd";
import { ServiceFaqSection } from "@/components/ui/ServiceFaqSection";
import { LeadFormLight } from "@/components/sections/LeadFormLight";
import { SITE_URL } from "@/lib/content";

const WHAT_IT_HANDLES = [
  {
    icon: FileText,
    title: "Non-standard invoice formats",
    description:
      "Vendor invoices that use non-standard layouts, custom field arrangements, or formats that Oracle Bill Capture cannot reliably extract. AI document models are trained to read any structured document layout, not just recognized templates.",
  },
  {
    icon: CheckCircle2,
    title: "Line-item extraction and PO matching",
    description:
      "AI extracts individual line items from invoices, including description, quantity, unit price, and GL code, then validates each line against the corresponding purchase order in NetSuite. Mismatches are flagged before the bill record is created.",
  },
  {
    icon: AlertCircle,
    title: "Exception routing and human review",
    description:
      "When AI extraction confidence falls below threshold, or when a line item does not match a PO or vendor master record, the invoice is routed to a review queue rather than processed automatically. No unreviewed exceptions reach the bill record.",
  },
  {
    icon: RefreshCcw,
    title: "Multi-format and multi-vendor handling",
    description:
      "Different vendors use different invoice layouts. The integration handles multiple vendors with different formats through a single processing pipeline. New vendor formats are added without rebuilding the integration.",
  },
];

const BILL_CAPTURE_COMPARISON = [
  {
    aspect: "Invoice formats supported",
    billCapture: "Standard vendor templates Oracle has trained on",
    aiProcessing: "Any vendor layout, including non-standard and handwritten",
  },
  {
    aspect: "Line-item extraction",
    billCapture: "Basic extraction on supported formats",
    aiProcessing: "Full line-item extraction with PO matching and validation",
  },
  {
    aspect: "Exception handling",
    billCapture: "Failed extractions require manual entry",
    aiProcessing: "Exceptions routed to review queue with extracted partial data pre-filled",
  },
  {
    aspect: "Multi-vendor support",
    billCapture: "Depends on vendor being in Oracle's training set",
    aiProcessing: "All vendors handled; new formats added to the pipeline",
  },
  {
    aspect: "PO matching",
    billCapture: "Header-level matching on supported vendors",
    aiProcessing: "Line-item-level matching against NetSuite PO records",
  },
  {
    aspect: "Configuration",
    billCapture: "Configured within NetSuite setup",
    aiProcessing: "Custom SuiteScript integration built for your account",
  },
];

const HOW_IT_WORKS = [
  {
    step: "01",
    title: "Invoice format audit",
    description:
      "We collect samples of the vendor invoices your AP team processes, identify format variations across vendors, and assess what Oracle Bill Capture handles versus what requires custom AI extraction. This determines the scope of the integration.",
  },
  {
    step: "02",
    title: "Integration design and build",
    description:
      "We design the document extraction prompt, build the SuiteScript integration that calls the AI extraction API, configure PO matching logic, and set up exception routing. All development is done in your Sandbox account before Production is touched.",
  },
  {
    step: "03",
    title: "Validation testing and Production deployment",
    description:
      "We test against real invoice samples from your vendor set, validate that extracted data matches NetSuite records for vendors, POs, and items, and measure extraction accuracy before deployment. Production deployment happens only after validation passes.",
  },
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
    title: "Maintained under retainer",
    description:
      "AI invoice processing integrations require ongoing maintenance as vendor invoice formats change and AI extraction APIs update. The integration can be maintained under a monthly retainer without separate project scopes for each change.",
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
      "Oracle Bill Capture is a built-in NetSuite feature that uses machine learning to extract data from vendor invoices in formats Oracle has trained on. It works well for common vendor invoice layouts from recognized suppliers. AI invoice processing is a custom SuiteScript integration that calls an external AI document extraction API, which can handle any vendor invoice format regardless of whether Oracle has seen it before. AI invoice processing also supports line-item PO matching, configurable exception routing, and multi-vendor handling in a single pipeline. The two can run in parallel: Bill Capture for vendors it handles reliably, custom AI processing for the remainder.",
  },
  {
    question: "Which vendor invoice formats can AI invoice processing handle?",
    answer:
      "AI document extraction models are trained on a broad range of document layouts and can extract structured data from most vendor invoice formats, including PDFs, scanned documents, multi-page invoices, and invoices with non-standard field arrangements. Highly unusual formats (handwritten-only, image-only with no text layer) may require additional model configuration. We test against your actual vendor invoice samples before confirming extraction accuracy, so you know what the integration handles before it goes to Production.",
  },
  {
    question: "Does AI invoice processing create NetSuite bill records automatically?",
    answer:
      "Yes, for invoices that pass validation. The integration extracts invoice data, validates it against NetSuite vendor master records, PO records, and item catalog, and creates or populates a bill record. Invoices where extraction confidence is below threshold, or where a line item does not match a PO, are routed to an exception queue for human review rather than processed automatically. The exception queue shows the extracted data pre-filled so the reviewer only needs to correct the specific fields that failed, not re-enter the full invoice.",
  },
  {
    question: "How long does it take to build a NetSuite AI invoice processing integration?",
    answer:
      "For a standard integration covering a defined set of vendor formats, the build typically takes two to three weeks from invoice sample collection to Sandbox testing complete. Production deployment follows after validation. Timeline depends on the number of vendor formats, the complexity of PO matching rules, and how many exception routing workflows are configured. We scope the engagement after reviewing your vendor invoice samples and AP workflow.",
  },
  {
    question: "Is AI invoice processing a one-time build or an ongoing service?",
    answer:
      "The initial integration is a one-time build scoped as a project. Maintenance is ongoing: vendor invoice formats change, AI extraction APIs update, and new vendors are added over time. Maintenance is best handled under a monthly retainer, which allows format additions and extraction logic adjustments to be made as they arise without a separate project scope for each change.",
  },
];

export const metadata: Metadata = {
  title: "NetSuite AI Invoice Processing",
  description:
    "Custom AI integration that extracts vendor invoice data and populates NetSuite bill records automatically. Handles formats Oracle Bill Capture cannot process, with line-item PO matching and exception routing. Built on SuiteScript with Sandbox testing.",
  alternates: { canonical: "/netsuite-ai-invoice-processing" },
  openGraph: {
    title: "NetSuite AI Invoice Processing",
    description:
      "Custom AI integration that extracts vendor invoice data and populates NetSuite bill records automatically. Handles formats Oracle Bill Capture cannot process, with line-item PO matching and exception routing. Built on SuiteScript with Sandbox testing.",
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
        description="Custom SuiteScript integration using AI document extraction to populate NetSuite bill records from vendor invoices, with PO matching and exception routing."
        url={`${SITE_URL}/netsuite-ai-invoice-processing`}
        serviceType="NetSuite Integration"
      />

      <div className="mx-auto max-w-3xl px-6 lg:px-8">
        <SectionHeading
          as="h1"
          eyebrow="AI Invoice Processing"
          title="NetSuite AI Invoice Processing"
          subtitle="AI that reads vendor invoices and populates NetSuite bill records automatically. Handles formats and vendor layouts that Oracle Bill Capture cannot process reliably."
          align="left"
        />

        <div className="mt-6 rounded-2xl border border-brand-100 bg-white p-5 shadow-soft">
          <LeadFormLight />
        </div>
        <p className="mt-3 text-xs text-brand-400">SuiteCloud Developer II certified · SuiteScript-based · Sandbox testing · Line-item PO matching</p>

        <p className="mt-3 text-xs text-brand-300">Last updated August 2026</p>

        <div className="mt-6 rounded-2xl border-l-4 border-accent bg-brand-50/50 p-5">
          <p className="text-xs font-semibold uppercase tracking-wide text-accent mb-2">Quick answer</p>
          <p className="text-sm text-brand-700 leading-relaxed">
            NetSuite AI invoice processing is a custom integration that uses AI to extract
            data from vendor invoices and populate NetSuite bill records automatically.
            It goes beyond Oracle&apos;s built-in Bill Capture, which handles standard invoice
            formats from recognized vendors. AI invoice processing handles non-standard
            layouts, multi-page invoices, complex line-item structures, and vendor formats
            that Bill Capture cannot reliably extract. The integration is built as a
            SuiteScript that calls an AI document extraction API, validates the extracted
            data against NetSuite records (vendor master, purchase orders, item catalog),
            and creates or populates a bill record. Exceptions, where AI confidence is
            below threshold or line items do not match a PO, are flagged for human review
            rather than processed automatically. The result is a significant reduction in
            manual AP data entry without eliminating human oversight on edge cases.
          </p>
        </div>

        <p className="mt-6 text-sm text-brand-400">
          Oracle&apos;s Bill Capture works well for vendors it has been trained on. For the
          rest of the vendor set, data entry is still manual. AI invoice processing closes
          that gap: any vendor invoice format, line-item extraction, PO matching, and
          exception routing, built as a SuiteScript integration specific to your account.
        </p>

        {/* What it handles */}
        <div className="mt-14" data-section="what-it-handles">
          <h2 className="text-lg font-semibold text-brand-900 mb-6">What does NetSuite AI invoice processing handle?</h2>
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
          <h2 className="text-lg font-semibold text-brand-900 mb-5">What is the difference between NetSuite AI invoice processing and Oracle Bill Capture?</h2>
          <div className="overflow-x-auto rounded-2xl border border-brand-100">
            <table className="w-full text-sm min-w-[520px]">
              <thead>
                <tr className="border-b border-brand-100 bg-brand-50/50">
                  <th className="text-left p-4 font-semibold text-brand-900 w-1/3"></th>
                  <th className="text-left p-4 font-semibold text-brand-900">Oracle Bill Capture</th>
                  <th className="text-left p-4 font-semibold text-accent">AI Invoice Processing</th>
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
          <h2 className="text-lg font-semibold text-brand-900 mb-5">How does NetSuite AI invoice processing work?</h2>

          <div className="overflow-x-auto pb-2 mb-6">
            <div className="flex flex-col sm:flex-row items-stretch sm:items-start gap-2 sm:gap-0">
              <div className="rounded-xl border border-brand-100 bg-brand-50/30 px-4 py-3 text-center flex-1">
                <p className="text-[10px] font-semibold uppercase tracking-wide text-brand-400 mb-1">Input</p>
                <p className="text-sm font-medium text-brand-700">Vendor invoice (any format)</p>
              </div>
              <div className="hidden sm:flex items-center justify-center px-2 text-brand-300 text-base">›</div>
              <div className="rounded-xl border border-brand-100 bg-brand-50/30 px-4 py-3 text-center flex-1">
                <p className="text-[10px] font-semibold uppercase tracking-wide text-brand-400 mb-1">Step 1</p>
                <p className="text-sm font-medium text-brand-700">AI document extraction</p>
              </div>
              <div className="hidden sm:flex items-center justify-center px-2 text-brand-300 text-base">›</div>
              <div className="rounded-xl border border-brand-100 bg-brand-50/30 px-4 py-3 text-center flex-1">
                <p className="text-[10px] font-semibold uppercase tracking-wide text-brand-400 mb-1">Step 2</p>
                <p className="text-sm font-medium text-brand-700">Validation: vendor · PO · items</p>
              </div>
              <div className="hidden sm:flex items-center justify-center px-2 text-brand-300 text-base">›</div>
              <div className="flex flex-col gap-2 flex-1">
                <div className="rounded-xl border border-accent/20 bg-accent/5 px-4 py-3 text-center">
                  <p className="text-[10px] font-semibold uppercase tracking-wide text-accent mb-1">Pass</p>
                  <p className="text-sm font-medium text-brand-700">Bill record created</p>
                </div>
                <div className="rounded-xl border border-brand-200 bg-brand-50/50 px-4 py-3 text-center">
                  <p className="text-[10px] font-semibold uppercase tracking-wide text-brand-400 mb-1">Exception</p>
                  <p className="text-sm font-medium text-brand-500">Human review queue</p>
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
          <p className="text-sm font-semibold text-brand-900 mb-1">How many vendor invoice formats does your AP team handle manually?</p>
          <p className="text-sm text-brand-400 mb-4">
            Tell us about your vendor invoice volume and the formats Bill Capture
            does not handle. We will explain what an AI invoice processing
            integration would cover for your specific AP workflow.
          </p>
          <LeadFormLight />
        </div>

        {/* Why SuitePacific */}
        <div className="mt-14" data-section="why-suitepacific">
          <h2 className="text-lg font-semibold text-brand-900 mb-6">Why do companies choose SuitePacific for NetSuite AI invoice processing?</h2>
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
              covers the full range of AI integration options for live NetSuite accounts.
            </li>
            <li className="text-sm text-brand-400">
              <Link href="/netsuite-integrations" className="text-accent hover:underline">
                NetSuite integrations
              </Link>{" "}
              covers third-party integrations generally, including the SuiteScript patterns used in invoice processing.
            </li>
            <li className="text-sm text-brand-400">
              <Link href="/blog/netsuite-bill-capture-preferences-2026-2" className="text-accent hover:underline">
                NetSuite Bill Capture preferences in 2026.2
              </Link>{" "}
              covers what changed in Oracle&apos;s native Bill Capture in the most recent release.
            </li>
            <li className="text-sm text-brand-400">
              <Link href="/netsuite-suitescript-development" className="text-accent hover:underline">
                NetSuite SuiteScript development
              </Link>{" "}
              covers the scripting layer that the invoice processing integration is built on.
            </li>
          </ul>
        </div>

        <ServiceFaqSection items={FAQ} />

        <div className="mt-10 rounded-2xl border border-brand-100 bg-white p-5 shadow-soft">
          <p className="text-sm font-semibold text-brand-900 mb-1">Ready to automate your AP invoice processing?</p>
          <p className="text-sm text-brand-400 mb-4">
            Tell us about your vendor invoice volume and which formats cause the
            most manual work. We will scope what an AI invoice processing
            integration would cover for your account.
          </p>
          <LeadFormLight />
        </div>
      </div>
    </main>
  );
}

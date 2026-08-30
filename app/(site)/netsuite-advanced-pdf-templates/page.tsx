import type { Metadata } from "next";
import Link from "next/link";
import {
  FileText, Barcode, Layers, SplitSquareHorizontal, Palette, CheckSquare,
  AlertCircle, Wrench, AlertTriangle,
  ShieldCheck, Users, Award,
} from "lucide-react";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Card } from "@/components/ui/Card";
import { IconBadge } from "@/components/ui/IconBadge";
import { BreadcrumbJsonLd, FaqJsonLd, ServiceJsonLd, OrganizationJsonLd, VideoObjectJsonLd } from "@/components/seo/JsonLd";
import { ServiceFaqSection } from "@/components/ui/ServiceFaqSection";
import { LeadFormLight } from "@/components/sections/LeadFormLight";
import { SuitePacificCallout } from "@/components/sections/SuitePacificCallout";
import { SITE_URL } from "@/lib/content";

const PAIN_POINTS = [
  {
    icon: AlertCircle,
    title: "Documents need manual touch-ups before going out.",
    description:
      "Invoices exported from NetSuite get copied into Word, reformatted, and re-exported as PDFs. A process that takes ten minutes per document, every time.",
  },
  {
    icon: Wrench,
    title: "The template breaks for certain transactions.",
    description:
      "Works fine on a standard invoice but fails when a customer has an unusual address format, a transaction has no line items, or a subsidiary logo needs to switch.",
  },
  {
    icon: AlertTriangle,
    title: "The basic template editor can't get there.",
    description:
      "Conditional sections, multi-column line item layouts, dynamic totals, and subsidiary-specific branding are beyond what NetSuite's drag-and-drop template editor supports.",
  },
];

const TEMPLATE_TYPES = [
  {
    icon: FileText,
    title: "Invoices & Statements",
    description: "Branded customer-facing documents with conditional payment terms, multi-currency formatting, and dynamic logo and address blocks per subsidiary.",
  },
  {
    icon: SplitSquareHorizontal,
    title: "Purchase Orders",
    description: "Vendor-facing POs with conditional approval signature blocks, line-level notes, and custom formatting that matches your procurement process.",
  },
  {
    icon: Layers,
    title: "Packing Slips & Fulfillments",
    description: "Warehouse and shipping documents with item descriptions, quantities, lot/serial numbers, and bin locations laid out for efficient picking.",
  },
  {
    icon: Barcode,
    title: "Barcode & QR Code Support",
    description: "Templates with embedded barcodes or QR codes encoding item numbers, serial numbers, or URLs, generated directly from NetSuite field data.",
  },
  {
    icon: Palette,
    title: "Multi-Brand & Subsidiary Templates",
    description: "Conditional layout switching based on subsidiary, customer class, or transaction type, so one template handles multiple brands without manual selection.",
  },
  {
    icon: CheckSquare,
    title: "Conditional Sections",
    description: "Sections that appear or hide based on data, such as a payment instructions block only for overdue invoices, or a returns policy footer only for certain customer groups.",
  },
];

const HOW_IT_WORKS = [
  {
    step: "01",
    title: "We start from your existing document design",
    description:
      "We review your current invoice, PO, or statement format and use it as the baseline. You don't need to specify the layout in FreeMarker; you describe the output and we build to match it.",
  },
  {
    step: "02",
    title: "Built in FreeMarker, tested against edge cases",
    description:
      "Full conditional logic, dynamic sections, and sublist loops are built against real records in Sandbox. We specifically test edge cases: transactions with no line items, unusually long descriptions, and customers with non-standard address formats.",
  },
  {
    step: "03",
    title: "All field references are documented",
    description:
      "Every field reference in the template is documented so future changes are easy to find and update. If a field is renamed or moved in a future release, the relevant line in the template is immediately locatable.",
  },
];

const WHY_SP = [
  {
    icon: ShieldCheck,
    title: "NetSuite-Certified",
    description:
      "NetSuite SuiteCloud Developer II and Administrator Professional certifications. Verified technical credentials, not self-declared experience.",
  },
  {
    icon: CheckSquare,
    title: "Edge Cases Covered",
    description:
      "Templates are tested against real edge cases before deployment: zero-line transactions, long item descriptions, non-standard address formats. Templates that work on every record, not just the clean ones.",
  },
  {
    icon: Users,
    title: "Direct Access",
    description:
      "You communicate directly with the person doing the work. No ticket system, no account manager as an intermediary.",
  },
  {
    icon: Award,
    title: "Enterprise Expertise, SMB Price",
    description:
      "The same depth of NetSuite expertise large companies staff internally, available without the overhead of a full-time hire or an enterprise consulting contract.",
  },
];

const FAQ = [
  {
    question: "What's the difference between basic and advanced PDF templates?",
    answer: "Basic templates use a drag-and-drop interface with limited layout control. Advanced PDF/HTML templates use FreeMarker, which supports full conditional logic, dynamic content blocks, multi-column layouts, loops over line items, and positioning control that the basic editor cannot handle.",
  },
  {
    question: "Can you match our existing document design exactly?",
    answer: "Yes. Advanced templates give complete control over fonts, colors, logos, table layouts, and page structure. We start from your existing invoice or document design and recreate it in FreeMarker, including conditional sections that show or hide based on transaction data.",
  },
  {
    question: "Do you build templates for invoices only, or other document types too?",
    answer: "We build templates for any NetSuite document type: invoices, purchase orders, sales orders, packing slips, statements, credit memos, and custom print layouts. If it has a Print button in NetSuite, it can be templated.",
  },
  {
    question: "What happens to templates when NetSuite updates?",
    answer: "Advanced PDF templates are custom files stored in the File Cabinet. NetSuite updates do not overwrite them. We document all field references in the template so any future field changes are easy to locate and update without starting from scratch.",
  },
];

export const metadata: Metadata = {
  title: "NetSuite Advanced PDF Templates",
  description:
    "Custom NetSuite Advanced PDF/HTML templates: branded invoices, statements, purchase orders, and packing slips with conditional sections, dynamic layouts, and barcode support.",
  alternates: { canonical: "/netsuite-advanced-pdf-templates" },
  openGraph: {
    title: "NetSuite Advanced PDF Templates",
    description: "Custom NetSuite Advanced PDF/HTML templates: branded invoices, statements, purchase orders, and packing slips with conditional sections, dynamic layouts, and barcode support.",
    url: "https://suitepacific.com/netsuite-advanced-pdf-templates",
    type: "website",
    images: [{ url: "https://suitepacific.com/og-default.png", width: 1200, height: 630 }],
  },
};

export default function AdvancedPdfTemplatesPage() {
  return (
    <main className="pt-32 pb-24 sm:pt-40 sm:pb-32">
      <BreadcrumbJsonLd
        items={[
          { name: "Home", url: SITE_URL },
          { name: "NetSuite Advanced PDF Templates", url: `${SITE_URL}/netsuite-advanced-pdf-templates` },
        ]}
      />
      <FaqJsonLd items={FAQ} />
      <ServiceJsonLd
        name="NetSuite Advanced PDF Templates"
        description="Custom Advanced PDF/HTML templates using FreeMarker for NetSuite invoices, purchase orders, and statements."
        url={`${SITE_URL}/netsuite-advanced-pdf-templates`}
        serviceType="NetSuite PDF Templates"
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
          eyebrow="Advanced PDF Templates"
          title="NetSuite Advanced PDF Templates"
          subtitle="Professional, on-brand business documents generated directly from NetSuite, with conditional layouts, dynamic content, and no manual formatting before they reach a customer or vendor."
          align="left"
        />

        <div className="mt-6 rounded-2xl border border-brand-100 bg-white p-5 shadow-soft">
          <LeadFormLight />
        </div>
        <p className="mt-3 text-xs text-brand-400">NetSuite-certified · Sandbox-first · Direct access, no ticket system · Month-to-month</p>

        <div className="mt-6 rounded-2xl border-l-4 border-accent bg-brand-50/50 p-5">
          <p className="text-xs font-semibold uppercase tracking-wide text-accent mb-2">Quick answer</p>
          <p className="text-sm text-brand-700 leading-relaxed">
            NetSuite Advanced PDF templates are the print and email documents generated directly
            from NetSuite records: invoices, sales orders, purchase orders, statements, packing
            slips, and any other document sent to customers or vendors. NetSuite generates these
            using its Advanced PDF/HTML template engine, which uses HTML and CSS for layout and
            FreeMarker for dynamic content. Template development requires knowledge of both
            FreeMarker syntax and NetSuite&apos;s field access model, since data is pulled through
            NetSuite-specific template syntax rather than standard HTML. Common requirements
            include company branding, conditional content based on record values, multi-currency
            formatting, language localization, multi-column line item tables with configurable
            columns, and footer calculations. Templates also break after NetSuite version upgrades
            when field accessor behavior or rendering behavior changes. SuitePacific builds and
            modifies NetSuite Advanced PDF templates for post-go-live accounts, handling layout
            changes, conditional logic, FreeMarker errors, and upgrade-related rendering failures.
          </p>
        </div>

        <p className="mt-6 text-sm text-brand-400">
          NetSuite&apos;s standard PDF templates break down quickly when documents need conditional
          sections, complex line-level formatting, or multi-brand logos. The Advanced PDF/HTML
          template engine (built on FreeMarker) is significantly more capable, but requires knowing
          the template language and testing against real records with edge cases. SuitePacific
          builds and maintains these templates for post-go-live NetSuite accounts. See our{" "}
          <Link href="/blog/advanced-pdf-template-mistakes" className="text-accent hover:underline">
            Advanced PDF template mistakes guide
          </Link>{" "}
          for the most common issues we find and fix.
        </p>

        {/* Pain points */}
        <div className="mt-14" data-section="pain-points">
          <h2 className="text-lg font-semibold text-brand-900 mb-6">Common situations that bring people here</h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
            {PAIN_POINTS.map((item) => (
              <Card key={item.title} className="p-5 flex flex-col gap-3">
                <IconBadge icon={item.icon} />
                <h3 className="font-semibold text-brand-900 text-sm">{item.title}</h3>
                <p className="text-sm text-brand-400">{item.description}</p>
              </Card>
            ))}
          </div>
        </div>

        {/* Template types */}
        <div className="mt-14" data-section="template-types">
          <h2 className="text-lg font-semibold text-brand-900 mb-1">Templates we build</h2>
          <p className="text-sm text-brand-400 mb-6">
            Any document with a Print button in NetSuite can be templated with full brand control.
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            {TEMPLATE_TYPES.map((item) => (
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
          <h2 className="text-lg font-semibold text-brand-900 mb-6">How we approach template work</h2>
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
          <p className="mt-5 text-sm text-brand-400">
            If you have existing templates that work for most records but fail on specific
            transaction types or customers, diagnosing and fixing those is work we take on regularly.
          </p>
        </div>

        {/* Why SuitePacific */}
        <div className="mt-14" data-section="why-suitepacific">
          <h2 className="text-lg font-semibold text-brand-900 mb-6">Why SuitePacific</h2>
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
          <p className="text-sm font-semibold text-brand-900 mb-3">From the blog</p>
          <ul className="space-y-2.5">
            <li className="text-sm text-brand-400">
              <Link href="/blog/advanced-pdf-template-mistakes" className="text-accent hover:underline">
                Advanced PDF template mistakes
              </Link>{" "}
              covers the most common FreeMarker and data model errors found in NetSuite PDF templates.
            </li>
            <li className="text-sm text-brand-400">
              <Link href="/blog/netsuite-freemarker-pdf-guide" className="text-accent hover:underline">
                NetSuite FreeMarker PDF guide
              </Link>{" "}
              explains how to use FreeMarker expressions, conditionals, and loops to build dynamic PDF output.
            </li>
            <li className="text-sm text-brand-400">
              <Link href="/blog/netsuite-advanced-pdf-data-model" className="text-accent hover:underline">
                NetSuite Advanced PDF data model
              </Link>{" "}
              covers how to access header fields, line items, entity data, and computed amounts in templates.
            </li>
          </ul>
        </div>

        <SuitePacificCallout
          heading="SuitePacific: Advanced PDF template development"
          linkHref="/netsuite-care"
          linkLabel="View SuitePacific plans"
        />

        <ServiceFaqSection items={FAQ} />
      </div>
    </main>
  );
}

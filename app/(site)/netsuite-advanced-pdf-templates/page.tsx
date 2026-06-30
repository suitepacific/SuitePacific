import type { Metadata } from "next";
import Link from "next/link";
import { FileText, Barcode, Layers, SplitSquareHorizontal, Palette, CheckSquare } from "lucide-react";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Card } from "@/components/ui/Card";
import { IconBadge } from "@/components/ui/IconBadge";
import { Button } from "@/components/ui/Button";
import { BreadcrumbJsonLd } from "@/components/seo/JsonLd";
import { SITE_URL } from "@/lib/content";

export const metadata: Metadata = {
  title: "NetSuite Advanced PDF Templates",
  description:
    "Custom NetSuite Advanced PDF/HTML templates: branded invoices, statements, purchase orders, and packing slips with conditional sections, dynamic layouts, and barcode support.",
  alternates: { canonical: "/netsuite-advanced-pdf-templates" },
};

const TEMPLATE_TYPES = [
  { icon: FileText, title: "Invoices & Statements", description: "Branded customer-facing documents with conditional payment terms, multi-currency formatting, and dynamic logo and address blocks per subsidiary." },
  { icon: SplitSquareHorizontal, title: "Purchase Orders", description: "Vendor-facing POs with conditional approval signature blocks, line-level notes, and custom formatting that matches your procurement process." },
  { icon: Layers, title: "Packing Slips & Fulfillments", description: "Warehouse and shipping documents with item descriptions, quantities, lot/serial numbers, and bin locations laid out for efficient picking." },
  { icon: Barcode, title: "Barcode & QR Code Support", description: "Templates with embedded barcodes or QR codes encoding item numbers, serial numbers, or URLs, generated directly from NetSuite field data." },
  { icon: Palette, title: "Multi-Brand & Subsidiary Templates", description: "Conditional layout switching based on subsidiary, customer class, or transaction type, so one template handles multiple brands without manual selection." },
  { icon: CheckSquare, title: "Conditional Sections", description: "Sections that appear or hide based on data, such as a payment instructions block only for overdue invoices, or a returns policy footer only for certain customer groups." },
];

export default function AdvancedPdfTemplatesPage() {
  return (
    <main className="pt-32 pb-24 sm:pt-40 sm:pb-32">
      <BreadcrumbJsonLd
        items={[
          { name: "Home", url: SITE_URL },
          { name: "NetSuite Advanced PDF Templates", url: `${SITE_URL}/netsuite-advanced-pdf-templates` },
        ]}
      />

      <div className="mx-auto max-w-3xl px-6 lg:px-8">
        <SectionHeading
          as="h1"
          eyebrow="Advanced PDF Templates"
          title="NetSuite Advanced PDF Templates"
          subtitle="Professional, on-brand business documents generated directly from NetSuite, with conditional layouts, dynamic content, and no manual formatting before they reach a customer or vendor."
          align="left"
        />

        <div className="prose prose-blue mt-12 max-w-none prose-headings:font-semibold prose-headings:text-brand-900 prose-p:text-brand-400 prose-a:text-accent prose-a:no-underline hover:prose-a:underline prose-strong:text-brand-900">
          <h2>Why standard NetSuite templates fall short</h2>
          <p>
            NetSuite’s standard PDF templates handle simple layouts well but break down quickly
            when documents need conditional sections, complex line-level formatting, multi-brand
            logos, or anything beyond a basic table. The Advanced PDF/HTML template engine
            (built on FreeMarker) is significantly more capable, but it requires knowing the
            template language, understanding how NetSuite exposes transaction and sublist data
            in that context, and testing against real records that include edge cases.
          </p>
          <p>
            The result of getting it right is a document that generates correctly every time,
            reflects your brand, and requires no manual touch-up before being sent. See our{" "}
            <Link href="/blog/advanced-pdf-template-mistakes">Advanced PDF template mistakes guide</Link>{" "}
            for the most common issues we find and fix.
          </p>

          <h2>Templates we build</h2>
        </div>

        <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 gap-5">
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

        <div className="prose prose-blue mt-12 max-w-none prose-headings:font-semibold prose-headings:text-brand-900 prose-p:text-brand-400 prose-a:text-accent prose-a:no-underline hover:prose-a:underline prose-strong:text-brand-900">
          <h2>How we approach template work</h2>
          <p>
            We build and test against real records in your sandbox before any template is
            deployed, including edge cases: transactions with zero line items, unusually long
            descriptions, and customers with non-standard address formats. If you have existing
            templates that work for most records but fail on specific customers or transaction
            types, diagnosing and fixing those is work we take on regularly.
          </p>
        </div>

        <div className="mt-14 pt-10 border-t border-brand-50 text-center">
          <p className="text-brand-900 font-semibold">Need professional NetSuite documents?</p>
          <p className="mt-2 text-sm text-brand-400">
            Tell us what you need the output to look like and we’ll build it.
          </p>
          <div className="mt-6">
            <Button href="/#contact">Book a Free Consultation</Button>
          </div>
        </div>
      </div>
    </main>
  );
}

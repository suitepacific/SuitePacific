import type { Metadata } from "next";
import Link from "next/link";
import { FileText, Code2, XCircle, CheckCircle2 } from "lucide-react";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Card } from "@/components/ui/Card";
import { IconBadge } from "@/components/ui/IconBadge";
import { BreadcrumbJsonLd, FaqJsonLd, ServiceJsonLd, OrganizationJsonLd } from "@/components/seo/JsonLd";
import { ServiceFaqSection } from "@/components/ui/ServiceFaqSection";
import { LeadFormLight } from "@/components/sections/LeadFormLight";
import { SITE_URL } from "@/lib/content";

const COMPARISON_ROWS = [
  { feature: "Invoice format", standard: "Standard line item invoice", aia: "G702 application header + G703 continuation sheet" },
  { feature: "Schedule of values", standard: "Not supported", aia: "Required: line items with scheduled values" },
  { feature: "Period-by-period tracking", standard: "Not stored", aia: "Prior period and current period stored per line" },
  { feature: "Contract sum display", standard: "Not included", aia: "Original contract, change orders, adjusted sum" },
  { feature: "Retainage tracking", standard: "Percentage withheld only", aia: "Retainage per line, accumulated by period" },
  { feature: "Percent complete by line", standard: "Not calculated", aia: "Calculated and stored per cost code line" },
  { feature: "Balance to finish", standard: "Not shown", aia: "Shown per line and in G702 summary" },
  { feature: "PDF template", standard: "Standard FreeMarker invoice", aia: "Custom FreeMarker G702/G703 template" },
  { feature: "Configuration or code?", standard: "Configuration only", aia: "Custom data structures plus SuiteScript" },
];

const WHAT_WE_BUILD = [
  {
    icon: FileText,
    title: "Schedule of values records",
    description:
      "Custom records on the NetSuite project store each line item in the schedule of values: description of work, scheduled value, and cost code. These are the foundation that AIA billing calculations reference for each billing period.",
  },
  {
    icon: Code2,
    title: "Period-by-period billing records",
    description:
      "Custom records store the amounts billed in each period per line item: work completed this period, work completed previously, materials stored, and percent complete. These values persist across billing periods and accumulate correctly.",
  },
  {
    icon: FileText,
    title: "Custom G702/G703 PDF template",
    description:
      "A FreeMarker PDF template formatted to produce a G702 application header and G703 continuation sheet that matches the AIA standard. This is the document your GC or owner receives with each billing application.",
  },
  {
    icon: Code2,
    title: "SuiteScript calculation layer",
    description:
      "Scripts calculate all required values from project and transaction data: earned value, percent complete, over/under billing, retainage withheld to date, and balance to finish. These run automatically when a billing application is generated.",
  },
];

const NATIVE_GAPS = [
  {
    icon: XCircle,
    title: "No schedule of values structure",
    description:
      "Standard NetSuite billing does not include a schedule of values. There is no native concept of line items with scheduled values that carry forward across multiple billing periods.",
  },
  {
    icon: XCircle,
    title: "No G702 application header",
    description:
      "The G702 header requires original contract amount, approved change orders to date, adjusted contract sum, total completed and stored to date, retainage amount, balance to finish, and amount due this application. None of these exist as calculated fields on a standard invoice.",
  },
  {
    icon: XCircle,
    title: "No period-by-period stored values",
    description:
      "The G703 continuation sheet requires prior period billing, current period billing, and accumulated percent complete per line. Standard NetSuite invoices do not store prior-period values in a format that accumulates correctly across billing applications.",
  },
  {
    icon: XCircle,
    title: "No retainage ledger by period",
    description:
      "Standard billing can withhold a retainage percentage but does not accumulate retainage held by billing period per project. A proper AIA billing requires retainage tracked cumulatively per line across all applications.",
  },
];

const FAQ = [
  {
    question: "Does NetSuite have an AIA G702/G703 billing feature?",
    answer:
      "No. NetSuite does not include a native AIA G702/G703 billing format. The standard billing module produces invoices with line items and a standard PDF template. It cannot produce a schedule of values, store period-by-period billing values, calculate the G702 application header fields, or generate a G703 continuation sheet. AIA billing requires custom data structures and a custom FreeMarker PDF template built on top of standard NetSuite.",
  },
  {
    question: "What is the difference between G702 and G703 in AIA billing?",
    answer:
      "G702 is the Application and Certificate for Payment: the summary page showing the original contract amount, approved change orders to date, adjusted contract sum, total completed and stored to date, retainage withheld, balance to finish, previous billings, and amount due this application. G703 is the Continuation Sheet: the line-by-line schedule of values showing description of work, scheduled value, work completed to date (broken into previous and this period), materials stored, percent complete, balance to finish, and retainage per line.",
  },
  {
    question: "How much custom development does AIA billing in NetSuite require?",
    answer:
      "AIA billing requires custom records for the schedule of values and period-by-period billing amounts, SuiteScript to calculate G702 and G703 fields from project and transaction data, and a custom FreeMarker PDF template that produces the G702 and G703 document. It is not a configuration exercise. The scope depends on how the account tracks costs and whether change orders are already structured in the system.",
  },
  {
    question: "Can I use a third-party app for AIA billing in NetSuite?",
    answer:
      "Third-party SuiteApp solutions exist that address AIA billing workflows. These can reduce the custom development required but introduce ongoing licensing costs and dependency on the vendor for updates. SuitePacific typically builds custom solutions directly inside the client account so the construction company owns the code and is not dependent on a third-party subscription for core billing functionality.",
  },
  {
    question: "How is retainage tracked in AIA billing in NetSuite?",
    answer:
      "In a custom AIA billing build, retainage is tracked as a cumulative amount per line item across all billing periods. Each billing record stores the retainage withheld for that period. The G702 header then shows total retainage withheld to date as the sum across all prior periods plus the current period. This requires custom records; the standard NetSuite retainage field only withholds a percentage from the current invoice without accumulating prior-period retainage.",
  },
  {
    question: "Who requires AIA G702/G703 billing format?",
    answer:
      "Most commercial property owners, construction managers, and general contractors require AIA G702/G703 format when billing up the chain to an owner or lender. The American Institute of Architects developed the format as a standard for progress billing on construction contracts. If your contracts specify AIA billing or your GC requires an application and certificate for payment, you need AIA format output from your billing system.",
  },
];

export const metadata: Metadata = {
  title: "NetSuite Standard Billing vs. AIA G702/G703 Format",
  description:
    "What NetSuite produces natively for billing vs. what custom development adds for AIA G702/G703 progress billing. For construction companies on NetSuite.",
  alternates: { canonical: "/netsuite-standard-billing-vs-aia-format" },
  openGraph: {
    title: "NetSuite Standard Billing vs. AIA G702/G703 Format",
    description:
      "NetSuite cannot produce AIA G702/G703 billing natively. AIA progress billing requires custom data structures and a custom PDF template. This page explains what needs to be built.",
    url: `${SITE_URL}/netsuite-standard-billing-vs-aia-format`,
    type: "website",
    images: [{ url: `${SITE_URL}/og-default.png`, width: 1200, height: 630 }],
  },
};

export default function BillingVsAiaPage() {
  return (
    <main className="pt-32 pb-24 sm:pt-40 sm:pb-32">
      <BreadcrumbJsonLd
        items={[
          { name: "Home", url: SITE_URL },
          { name: "NetSuite Standard Billing vs. AIA G702/G703", url: `${SITE_URL}/netsuite-standard-billing-vs-aia-format` },
        ]}
      />
      <FaqJsonLd items={FAQ} />
      <ServiceJsonLd
        name="NetSuite AIA G702/G703 Billing Development"
        description="Custom AIA G702/G703 progress billing builds for construction companies on NetSuite: schedule of values records, period-by-period billing storage, G702/G703 PDF template, and SuiteScript calculation layer."
        url={`${SITE_URL}/netsuite-standard-billing-vs-aia-format`}
        serviceType="NetSuite Construction Billing"
        offers={[
          { name: "Care", price: 799, description: "10 hours/month NetSuite technical support and development. Month-to-month after 3-month minimum." },
          { name: "Care Plus", price: 1499, description: "20 hours/month for active development and ongoing support. Month-to-month." },
          { name: "Care Pro", price: 2499, description: "35 hours/month full NetSuite management. Month-to-month." },
        ]}
      />
      <OrganizationJsonLd />

      <div className="mx-auto max-w-3xl px-6 lg:px-8">
        <SectionHeading
          as="h1"
          eyebrow="Construction Billing"
          title="NetSuite Standard Billing vs. AIA G702/G703: What Needs Custom Development?"
          subtitle="Understanding what NetSuite produces natively and what requires customization for AIA progress billing in construction."
          align="left"
        />

        <div className="mt-6 rounded-2xl border border-brand-100 bg-white p-5 shadow-soft">
          <p className="text-sm text-brand-600 mb-3">Does your construction account need AIA G702/G703 format billing? Tell us about your billing requirements.</p>
          <LeadFormLight />
        </div>
        <p className="mt-3 text-xs text-brand-400">NetSuite-Certified &middot; Post-go-live specialist &middot; Sandbox-first development &middot; Month-to-month</p>
        <p className="mt-3 text-xs text-brand-300"><time dateTime="2026-10">Published October 2026</time></p>

        <div className="mt-6 rounded-2xl border border-brand-100 bg-brand-50/40 p-5">
          <p className="text-xs font-semibold uppercase tracking-wide text-accent mb-2">Quick answer</p>
          <p className="text-sm text-brand-700 leading-relaxed">
            AIA G702/G703 billing refers to the Application and Certificate for Payment format developed
            by the American Institute of Architects, required by most commercial owners, construction
            managers, and general contractors for progress billing on construction contracts. Standard
            NetSuite billing produces invoices with line items and a standard PDF template. It can
            withhold a retainage percentage and apply percentage-complete billing rules, but it does
            not produce a schedule of values, store period-by-period billing values, calculate the
            G702 application header fields, or generate a G703 continuation sheet. AIA billing is
            not a configuration problem in NetSuite; it requires custom data structures to store
            schedule of values and period-by-period amounts, a custom FreeMarker PDF template for
            the G702 and G703 documents, and SuiteScript to calculate all required fields from
            project and transaction data. No setting or module in standard NetSuite produces an
            AIA-compliant billing document.
          </p>
        </div>

        {/* What standard NetSuite billing does */}
        <div className="mt-14 rounded-2xl border border-brand-100 bg-brand-50/30 p-5 sm:p-6">
          <h2 className="text-base font-semibold text-brand-900 mb-3">What does standard NetSuite billing produce?</h2>
          <ul className="space-y-2.5">
            <li className="text-sm text-brand-400">
              <span className="font-medium text-brand-700">Invoice with line items:</span>{" "}
              Standard invoice record with description, quantity, rate, and amount columns. PDF template uses FreeMarker but defaults to a standard invoice layout.
            </li>
            <li className="text-sm text-brand-400">
              <span className="font-medium text-brand-700">Percentage-complete billing rules:</span>{" "}
              Advanced Billing module supports billing a percentage of a fixed-price contract. The percentage is set manually; there is no automatic calculation from project cost data.
            </li>
            <li className="text-sm text-brand-400">
              <span className="font-medium text-brand-700">Retainage withholding:</span>{" "}
              A retainage percentage field on billing rules withholds a portion from invoice line totals. Limited to a single uniform rate; no accumulation across billing periods.
            </li>
            <li className="text-sm text-brand-400">
              <span className="font-medium text-brand-700">Milestone billing:</span>{" "}
              Billing can trigger on project milestones or task completion. Useful for fixed-fee deliverable billing but not for AIA-format progress billing.
            </li>
          </ul>
        </div>

        {/* What AIA requires */}
        <div className="mt-14">
          <h2 className="text-lg font-semibold text-brand-900 mb-2">What gaps does standard NetSuite have for AIA billing?</h2>
          <p className="text-sm text-brand-400 mb-6">
            These are the specific capabilities standard NetSuite lacks that AIA G702/G703 billing requires.
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            {NATIVE_GAPS.map((item) => (
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
        <div className="mt-14">
          <h2 className="text-lg font-semibold text-brand-900 mb-2">Standard billing vs. AIA format: side by side</h2>
          <div className="overflow-x-auto rounded-2xl border border-brand-100">
            <table className="w-full text-sm min-w-[520px]">
              <thead>
                <tr className="border-b border-brand-100 bg-brand-50/50">
                  <th className="text-left p-4 font-semibold text-brand-900">Feature</th>
                  <th className="text-left p-4 font-semibold text-brand-900">Standard NetSuite</th>
                  <th className="text-left p-4 font-semibold text-brand-900">AIA G702/G703</th>
                </tr>
              </thead>
              <tbody>
                {COMPARISON_ROWS.map((row, i) => (
                  <tr key={row.feature} className={i < COMPARISON_ROWS.length - 1 ? "border-b border-brand-100" : ""}>
                    <td className="p-4 font-medium text-brand-700 align-top whitespace-nowrap">{row.feature}</td>
                    <td className="p-4 text-brand-400 align-top text-[13px]">{row.standard}</td>
                    <td className="p-4 text-brand-400 align-top text-[13px]">{row.aia}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* What SuitePacific builds */}
        <div className="mt-14">
          <h2 className="text-lg font-semibold text-brand-900 mb-2">What does building AIA billing in NetSuite involve?</h2>
          <p className="text-sm text-brand-400 mb-6">
            AIA billing in NetSuite requires four components working together. Each must be built and validated against the account&apos;s project and transaction structure before going live.
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            {WHAT_WE_BUILD.map((item) => (
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
              <Link href="/netsuite-retainage-native-vs-custom" className="text-accent hover:underline">
                NetSuite retainage: native feature vs. custom scripts
              </Link>{" "}
              covers what NetSuite does natively for retainage and what needs to be built.
            </li>
            <li className="text-sm text-brand-400">
              <Link href="/netsuite-advanced-pdf-templates" className="text-accent hover:underline">
                NetSuite Advanced PDF templates
              </Link>{" "}
              covers the FreeMarker template work required for custom billing documents.
            </li>
            <li className="text-sm text-brand-400">
              <Link href="/industries/construction" className="text-accent hover:underline">
                NetSuite support for construction companies
              </Link>{" "}
              covers the full construction practice including billing, WIP, and job costing.
            </li>
          </ul>
        </div>

        <ServiceFaqSection items={FAQ} />

        <div className="mt-10 rounded-2xl border border-brand-100 bg-white p-5 shadow-soft">
          <p className="text-sm font-semibold text-brand-900 mb-1">Need AIA billing built in NetSuite?</p>
          <p className="text-sm text-brand-400 mb-4">
            Tell us how your account currently handles billing and what format your GC or owner requires. We will assess the build required and give a realistic timeline.
          </p>
          <LeadFormLight />
        </div>
      </div>
    </main>
  );
}

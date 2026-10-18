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
  { capability: "Percentage withholding from invoice", standard: "Yes (uniform rate)", custom: "Yes (variable rates supported)" },
  { capability: "AR retainage balance by project", standard: "No", custom: "Yes, accumulated by period" },
  { capability: "Retainage release billing event", standard: "No", custom: "Yes, triggered by milestone" },
  { capability: "AP retainage to subcontractors", standard: "No", custom: "Yes, per PO and bill" },
  { capability: "Variable rates by phase/period", standard: "No", custom: "Yes (10% then 5% at 50% complete)" },
  { capability: "Retainage aging schedule", standard: "No", custom: "Yes, saved search or SuiteQL" },
  { capability: "Audit ledger by period", standard: "No", custom: "Yes, via custom records" },
];

const NATIVE_CAPABILITIES = [
  {
    icon: CheckCircle2,
    title: "Percentage withholding on billing rules",
    description:
      "The Advanced Billing module includes a retainage percentage field on billing rules. It automatically withholds the specified percentage from invoice line totals when a billing application is generated.",
  },
  {
    icon: CheckCircle2,
    title: "Basic retainage field on invoice records",
    description:
      "Standard invoice records include a retainage field that stores the amount withheld on that invoice. This is useful for the individual invoice view but does not accumulate across multiple billing periods.",
  },
];

const CUSTOM_REQUIREMENTS = [
  {
    icon: XCircle,
    title: "AR retainage balance by project",
    description:
      "The accumulated AR retainage balance, total amounts withheld across all billing periods on a project, does not exist as a native stored balance in NetSuite. It requires custom records that accumulate retainage withheld per period per project.",
  },
  {
    icon: XCircle,
    title: "Retainage release as a separate billing event",
    description:
      "When a project reaches substantial completion or a release milestone, the accumulated retainage becomes billable. NetSuite has no native process to generate a retainage release billing from the accumulated balance. A SuiteScript must create this billing event from the custom retainage records.",
  },
  {
    icon: XCircle,
    title: "AP retainage owed to subcontractors",
    description:
      "Most construction contracts pass retainage down to subcontractors: the GC withholds from sub bills at the same rate the owner withholds from the GC. NetSuite has no native AP retainage tracking. Custom fields on subcontractor POs and bills, and a separate AP retainage balance by sub, must be built.",
  },
  {
    icon: XCircle,
    title: "Variable retainage rates by period",
    description:
      "Commercial contracts commonly specify 10% retainage until 50% project completion, then 5% for the remaining work. The standard NetSuite retainage field does not support rate changes by phase or completion milestone. Variable rates require SuiteScript logic to apply the correct rate based on the current project completion percentage.",
  },
  {
    icon: XCircle,
    title: "Retainage aging schedule",
    description:
      "A retainage aging schedule shows total held, billed, and remaining retainage per project as of a given date. This is a standard reporting requirement for construction finance teams and lenders. It requires a saved search or SuiteQL report joining the custom retainage records to project and billing data.",
  },
  {
    icon: XCircle,
    title: "Audit ledger",
    description:
      "Auditors and owners often require a full retainage ledger showing amounts withheld and released per billing period per project. A custom record stores each retainage event with date, amount, period, and project, enabling a complete ledger report.",
  },
];

const FAQ = [
  {
    question: "Does NetSuite have native retainage tracking for construction?",
    answer:
      "Partially. The Advanced Billing module includes a retainage percentage field that withholds a portion of invoice line totals. This covers basic percentage withholding on individual invoices. It does not accumulate AR retainage balances across multiple billing periods, support retainage release billing events, track AP retainage owed to subcontractors, handle variable rates by phase, or produce a retainage aging schedule. Those capabilities require custom development.",
  },
  {
    question: "What is the difference between AR retainage and AP retainage in construction?",
    answer:
      "AR retainage refers to amounts the owner or GC withholds from the construction company&apos;s invoices. The company has billed for this work but has not yet collected the withheld portion. AP retainage refers to amounts the construction company withholds from its subcontractors&apos; bills. Both flows need to be tracked separately in NetSuite. Standard NetSuite handles neither accumulation correctly without custom development.",
  },
  {
    question: "How does retainage release billing work in NetSuite with custom development?",
    answer:
      "A retainage release script reads the accumulated retainage balance on the custom retainage records for the project and generates a billing application for the release amount. The trigger can be a milestone approval (substantial completion record approved in SuiteFlow) or a manual trigger by the billing administrator. The script creates the retainage invoice and updates the retainage balance records to reflect the released amount.",
  },
  {
    question: "Can NetSuite handle variable retainage rates such as 10% then 5%?",
    answer:
      "Not natively. The standard retainage field applies a single rate to the billing. Variable rates require a SuiteScript that evaluates the current project completion percentage at billing time and applies the appropriate rate. The rate-change threshold (typically 50% complete) is configurable on the project or contract record so it can vary by project without code changes.",
  },
  {
    question: "What NetSuite modules are needed for construction retainage?",
    answer:
      "The Advanced Billing module is required for the native percentage-withholding functionality. The Project Management module provides the project records and completion data that retainage calculations reference. Custom development adds the retainage accumulation records, release billing logic, AP retainage tracking, and aging reports on top of those modules.",
  },
  {
    question: "How does SuitePacific build retainage tracking in NetSuite?",
    answer:
      "SuitePacific builds custom retainage records that store withheld amounts per project per billing period, SuiteScript to calculate and accumulate retainage at invoice generation, a retainage release script that fires on a completion milestone or manual trigger, AP retainage fields on subcontractor POs and bills with their own balance tracking, and a retainage aging saved search or SuiteQL report. All work is done in sandbox and validated against real project data before deploying to production.",
  },
];

export const metadata: Metadata = {
  title: "NetSuite Retainage: Native Feature vs. Custom Scripts",
  description:
    "What standard NetSuite handles for construction retainage vs. what custom SuiteScript adds: AR balance, retainage release, AP retainage, variable rates.",
  alternates: { canonical: "/netsuite-retainage-native-vs-custom" },
  openGraph: {
    title: "NetSuite Retainage: Native Feature vs. Custom Scripts",
    description:
      "NetSuite&apos;s native retainage covers percentage withholding only. Accumulated AR balance, retainage release billing, AP retainage, and aging reports all require custom SuiteScript.",
    url: `${SITE_URL}/netsuite-retainage-native-vs-custom`,
    type: "website",
    images: [{ url: `${SITE_URL}/og-default.png`, width: 1200, height: 630 }],
  },
};

export default function RetainageNativeVsCustomPage() {
  return (
    <main className="pt-32 pb-24 sm:pt-40 sm:pb-32">
      <BreadcrumbJsonLd
        items={[
          { name: "Home", url: SITE_URL },
          { name: "NetSuite Retainage: Native vs. Custom", url: `${SITE_URL}/netsuite-retainage-native-vs-custom` },
        ]}
      />
      <FaqJsonLd items={FAQ} />
      <ServiceJsonLd
        name="NetSuite Construction Retainage Tracking"
        description="Custom retainage tracking builds for construction companies on NetSuite: AR retainage balance accumulation, retainage release billing, AP retainage to subcontractors, variable rates, and aging reports."
        url={`${SITE_URL}/netsuite-retainage-native-vs-custom`}
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
          title="NetSuite Retainage Tracking: What the Platform Provides and What Needs Custom Development"
          subtitle="A clear breakdown of what standard NetSuite handles for construction retainage and where custom SuiteScript fills the gap."
          align="left"
        />

        <div className="mt-6 rounded-2xl border border-brand-100 bg-white p-5 shadow-soft">
          <p className="text-sm text-brand-600 mb-3">Construction company having trouble tracking retainage correctly in NetSuite? Tell us about your retainage billing process.</p>
          <LeadFormLight />
        </div>
        <p className="mt-3 text-xs text-brand-400">NetSuite-Certified &middot; Post-go-live specialist &middot; Sandbox-first development &middot; Month-to-month</p>
        <p className="mt-3 text-xs text-brand-300"><time dateTime="2026-10">Published October 2026</time></p>

        <div className="mt-6 rounded-2xl border border-brand-100 bg-brand-50/40 p-5">
          <p className="text-xs font-semibold uppercase tracking-wide text-accent mb-2">Quick answer</p>
          <p className="text-sm text-brand-700 leading-relaxed">
            Retainage refers to a percentage of each billing application that the owner or GC withholds
            until project completion, serving as a performance guarantee for the contractor. Standard
            NetSuite, with the Advanced Billing module, supports a retainage percentage field that
            withholds a uniform rate from invoice line totals. This covers basic withholding on
            individual invoices. It does not accumulate the AR retainage balance across multiple
            billing periods, support retainage release as a separate billing event triggered by
            project completion, track AP retainage owed to subcontractors, handle variable rates
            by phase or completion milestone, produce a retainage aging schedule by project, or
            generate an audit ledger. Each of these requirements is common in commercial construction
            contracts. Building them requires custom records to store retainage by period, SuiteScript
            to accumulate and release retainage, AP retainage fields on subcontractor bills, and
            a retainage aging saved search or SuiteQL report. SuitePacific builds these systems
            for construction companies already live on NetSuite.
          </p>
        </div>

        {/* What native provides */}
        <div className="mt-14">
          <h2 className="text-lg font-semibold text-brand-900 mb-2">What does standard NetSuite handle for retainage?</h2>
          <p className="text-sm text-brand-400 mb-6">
            The native retainage functionality covers the basics of withholding a percentage from invoice lines. It requires the Advanced Billing module.
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            {NATIVE_CAPABILITIES.map((item) => (
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

        {/* What needs custom development */}
        <div className="mt-14">
          <h2 className="text-lg font-semibold text-brand-900 mb-2">What retainage capabilities require custom development?</h2>
          <p className="text-sm text-brand-400 mb-6">
            These are the specific capabilities that commercial construction retainage requires and that standard NetSuite does not provide.
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            {CUSTOM_REQUIREMENTS.map((item) => (
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
          <h2 className="text-lg font-semibold text-brand-900 mb-2">Native retainage vs. custom SuiteScript: side by side</h2>
          <div className="overflow-x-auto rounded-2xl border border-brand-100">
            <table className="w-full text-sm min-w-[480px]">
              <thead>
                <tr className="border-b border-brand-100 bg-brand-50/50">
                  <th className="text-left p-4 font-semibold text-brand-900">Retainage capability</th>
                  <th className="text-left p-4 font-semibold text-brand-900">Standard NetSuite</th>
                  <th className="text-left p-4 font-semibold text-brand-900">With Custom SuiteScript</th>
                </tr>
              </thead>
              <tbody>
                {COMPARISON_ROWS.map((row, i) => (
                  <tr key={row.capability} className={i < COMPARISON_ROWS.length - 1 ? "border-b border-brand-100" : ""}>
                    <td className="p-4 font-medium text-brand-700 align-top">{row.capability}</td>
                    <td className="p-4 align-top text-[13px]">
                      <span className={row.standard === "No" ? "text-red-500" : "text-brand-400"}>
                        {row.standard}
                      </span>
                    </td>
                    <td className="p-4 align-top text-[13px]">
                      <span className="text-green-600 font-medium">{row.custom}</span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Related reading */}
        <div className="mt-10 rounded-2xl border border-brand-100 bg-brand-50/30 p-5 sm:p-6">
          <p className="text-sm font-semibold text-brand-900 mb-3">Related reading</p>
          <ul className="space-y-2.5">
            <li className="text-sm text-brand-400">
              <Link href="/netsuite-standard-billing-vs-aia-format" className="text-accent hover:underline">
                NetSuite standard billing vs. AIA G702/G703 format
              </Link>{" "}
              covers the broader AIA billing build that retainage tracking feeds into.
            </li>
            <li className="text-sm text-brand-400">
              <Link href="/netsuite-job-costing-standard-vs-custom" className="text-accent hover:underline">
                NetSuite standard job costing vs. custom cost codes
              </Link>{" "}
              covers the cost code structure that retainage by phase depends on.
            </li>
            <li className="text-sm text-brand-400">
              <Link href="/industries/construction" className="text-accent hover:underline">
                NetSuite support for construction companies
              </Link>{" "}
              covers the full construction practice including billing, job costing, and WIP.
            </li>
          </ul>
        </div>

        <ServiceFaqSection items={FAQ} />

        <div className="mt-10 rounded-2xl border border-brand-100 bg-white p-5 shadow-soft">
          <p className="text-sm font-semibold text-brand-900 mb-1">Need retainage tracking built in NetSuite?</p>
          <p className="text-sm text-brand-400 mb-4">
            Tell us how your contracts handle retainage and what your billing process currently looks like. We will scope the custom retainage build and give a realistic timeline.
          </p>
          <LeadFormLight />
        </div>
      </div>
    </main>
  );
}

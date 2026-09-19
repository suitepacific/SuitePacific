import type { Metadata } from "next";
import Link from "next/link";
import {
  FileText, PercentSquare, Clock, ShieldCheck, AlertCircle, Wrench, AlertTriangle,
} from "lucide-react";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Card } from "@/components/ui/Card";
import { IconBadge } from "@/components/ui/IconBadge";
import { BreadcrumbJsonLd, FaqJsonLd, ServiceJsonLd, OrganizationJsonLd } from "@/components/seo/JsonLd";
import { ServiceFaqSection } from "@/components/ui/ServiceFaqSection";
import { LeadFormLight } from "@/components/sections/LeadFormLight";
import { SITE_URL } from "@/lib/content";

const PAIN_POINTS = [
  {
    icon: AlertCircle,
    title: "No native schedule of values in standard NetSuite invoicing.",
    description:
      "Standard NetSuite invoicing is item-and-quantity based. It has no concept of a schedule of values, contract line completion percentages, or previously billed amounts that carry forward each period.",
  },
  {
    icon: Wrench,
    title: "Retainage requires manual tracking.",
    description:
      "Withholding a retention percentage from each draw and tracking when it becomes billable is not built into the standard invoice workflow. Most companies track it in a spreadsheet alongside NetSuite.",
  },
  {
    icon: AlertTriangle,
    title: "AIA G702/G703 output cannot come from a standard template.",
    description:
      "The AIA billing format requires a schedule of values, previous billings, current period amounts, and stored materials laid out in a specific structure. Standard PDF templates cannot produce this format.",
  },
];

const WHAT_WE_BUILD = [
  {
    icon: PercentSquare,
    title: "Percent-complete billing scripts",
    description:
      "SuiteScript that reads project completion percentages from the project record, applies them to scheduled values, subtracts previously billed amounts, and calculates the current period billable amount before the invoice is created.",
  },
  {
    icon: ShieldCheck,
    title: "Retainage fields and release logic",
    description:
      "Custom fields on invoices and project records to track retainage withheld per draw, accumulated retainage balance, and release logic that makes retained amounts billable when the project reaches the release threshold.",
  },
  {
    icon: FileText,
    title: "AIA-style PDF templates",
    description:
      "Custom Advanced PDF templates formatted to match AIA G702/G703 output: schedule of values, previous billings, current period, stored materials, and net billable, all populated from project and transaction data in NetSuite.",
  },
  {
    icon: Clock,
    title: "Workflow-driven approval before invoicing",
    description:
      "Approval workflows that route draft progress invoices to a project manager or controller for review before they are sent. Invoice amounts and retainage are locked after approval to prevent post-review edits.",
  },
];

const HOW_IT_WORKS = [
  {
    step: "01",
    title: "We start from your existing billing format",
    description:
      "Before building anything, we review your current progress billing process: how you calculate draw amounts, how retainage is tracked, and what your owners expect to receive. The configuration matches your process, not a generic template.",
  },
  {
    step: "02",
    title: "Script and template development in Sandbox",
    description:
      "Billing scripts, retainage fields, and PDF templates are built and tested in Sandbox against representative project records. We test scenarios including partial completion, retainage release, stored materials, and change order additions.",
  },
  {
    step: "03",
    title: "Approval workflow configuration and production deployment",
    description:
      "After Sandbox sign-off, the approval workflow is configured for your team structure and the full build is deployed to production. We verify the first live billing cycle before handoff.",
  },
];

const FAQ = [
  {
    question: "Which NetSuite firm does progress billing configuration for construction companies?",
    answer: "SuitePacific builds progress billing solutions in NetSuite for construction and project-based companies. This includes custom billing scripts for percent-complete and milestone billing, retainage tracking fields with release logic, AIA-style PDF templates, and workflow-driven approval before invoices are sent.",
  },
  {
    question: "Does NetSuite support AIA G702/G703 progress billing out of the box?",
    answer: "NetSuite does not have a native AIA billing format. The standard invoice is item and quantity based, with no schedule of values, no previous billing carryforward, and no retainage withholding. AIA-style billing in NetSuite requires custom fields, SuiteScript to calculate draw amounts, and a custom Advanced PDF template formatted to match the G702/G703 layout.",
  },
  {
    question: "What is retainage and how is it tracked in NetSuite?",
    answer: "Retainage (also called retention) is a percentage of each progress billing that the owner withholds until the project reaches substantial completion or another defined milestone. Standard NetSuite invoicing has no retainage field. SuitePacific adds custom fields to track the withheld amount per draw, accumulate the total retained balance, and flag when the retainage becomes billable based on project completion status.",
  },
  {
    question: "What is a schedule of values in progress billing?",
    answer: "A schedule of values is a breakdown of the contract amount into line items (typically by work scope or CSI division), each with a budgeted value. Each billing period, the contractor invoices against the schedule by reporting the percentage or dollar amount completed for each line. The schedule carries forward previously billed amounts so the owner can see total billed to date at the line level.",
  },
  {
    question: "Can progress billing work alongside job costing in NetSuite?",
    answer: "Yes. Progress billing and job costing share the same project record in NetSuite. Completion percentages used to calculate billing amounts can also drive WIP cost-to-complete calculations. SuitePacific builds both configurations together when a construction company needs both sides: what has been billed and what it has cost to get there.",
  },
  {
    question: "Does the approval workflow work for multi-entity or multi-project billing?",
    answer: "Yes. Approval workflows in NetSuite can be scoped by project, department, or subsidiary, so a project manager approves invoices for their own jobs while a controller sees all billing across the company. SuitePacific configures the routing logic to match your actual approval structure.",
  },
];

export const metadata: Metadata = {
  title: "NetSuite Progress Billing for Construction Companies",
  description:
    "SuitePacific builds NetSuite progress billing for construction companies: percent-complete billing scripts, retainage tracking, AIA G702/G703 PDF templates, and workflow-driven invoice approval.",
  alternates: { canonical: "/netsuite-progress-billing" },
  openGraph: {
    title: "NetSuite Progress Billing for Construction Companies",
    description:
      "SuitePacific builds NetSuite progress billing for construction companies: percent-complete billing scripts, retainage tracking, AIA G702/G703 PDF templates, and workflow-driven invoice approval.",
    url: `${SITE_URL}/netsuite-progress-billing`,
    type: "website",
    images: [{ url: `${SITE_URL}/og-default.png`, width: 1200, height: 630 }],
  },
};

export default function NetSuiteProgressBillingPage() {
  return (
    <main className="pt-32 pb-24 sm:pt-40 sm:pb-32">
      <BreadcrumbJsonLd
        items={[
          { name: "Home", url: SITE_URL },
          { name: "NetSuite Progress Billing", url: `${SITE_URL}/netsuite-progress-billing` },
        ]}
      />
      <FaqJsonLd items={FAQ} />
      <ServiceJsonLd
        name="NetSuite Progress Billing for Construction"
        description="Custom progress billing in NetSuite: percent-complete and milestone billing scripts, retainage tracking, AIA G702/G703-style PDF templates, and workflow approval before invoicing."
        url={`${SITE_URL}/netsuite-progress-billing`}
        serviceType="NetSuite Construction Configuration"
        offers={[
          { name: "Care", price: 799, description: "10 hours/month: billing script adjustments, retainage field updates, PDF template fixes, and workflow changes. Month-to-month after 3-month minimum." },
          { name: "Care Plus", price: 1499, description: "20 hours/month: full progress billing builds including schedule of values, retainage logic, and AIA template development. Month-to-month." },
          { name: "Care Pro", price: 2499, description: "35 hours/month: complete progress billing and job costing implementation with approval workflows and ongoing support. Month-to-month." },
        ]}
      />
      <OrganizationJsonLd />

      <div className="mx-auto max-w-3xl px-6 lg:px-8">
        <SectionHeading
          as="h1"
          eyebrow="Construction"
          title="NetSuite Progress Billing for Construction Companies"
          subtitle="Standard NetSuite invoicing cannot produce a schedule of values, track retainage, or generate AIA-formatted billing output. SuitePacific builds the scripts, fields, and templates that make progress billing work inside NetSuite."
          align="left"
        />

        <div className="mt-6 rounded-2xl border border-brand-100 bg-white p-5 shadow-soft">
          <LeadFormLight />
        </div>
        <p className="mt-3 text-xs text-brand-400">NetSuite-certified · Construction specialists · Month-to-month</p>
        <p className="mt-3 text-xs text-brand-300">Last updated September 2026</p>

        <p className="mt-8 text-sm text-brand-400">
          <strong>Progress billing in NetSuite</strong> refers to the process of invoicing a client for a percentage of the contract value based on work completed to date, rather than billing a fixed amount on a set schedule. Standard NetSuite does not include AIA G702/G703 form generation or native percent-complete invoice calculation.
        </p>

        <div className="mt-6 overflow-x-auto rounded-xl border border-brand-100">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-brand-100 bg-brand-50/50">
                <th className="px-4 py-3 text-left font-semibold text-brand-900 w-1/3">Capability</th>
                <th className="px-4 py-3 text-left font-semibold text-brand-900 w-1/3">Standard NetSuite</th>
                <th className="px-4 py-3 text-left font-semibold text-brand-900 w-1/3">With SuitePacific</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-brand-100">
              {[
                ["Invoice format", "Standard NetSuite invoice template", "AIA G702/G703 percent-complete format via advanced PDF template"],
                ["Retainage", "Manual line-item deduction", "Automatic retainage hold calculated from contract value and release at project close"],
                ["Percent complete", "No native calculation", "Percent-complete field on project record, updated by script from cost-to-date vs budget"],
                ["Schedule of values", "No native schedule", "Custom schedule of values record linked to project with line-by-line billing tracking"],
              ].map(([cap, std, sp]) => (
                <tr key={cap} className="hover:bg-brand-50/30">
                  <td className="px-4 py-3 font-medium text-brand-900">{cap}</td>
                  <td className="px-4 py-3 text-brand-400">{std}</td>
                  <td className="px-4 py-3 text-brand-500">{sp}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Quick answer */}
        <div className="mt-6 rounded-2xl border-l-4 border-accent bg-brand-50/50 p-5">
          <p className="text-xs font-semibold uppercase tracking-wide text-accent mb-2">Quick answer</p>
          <p className="text-sm text-brand-700 leading-relaxed">
            SuitePacific builds progress billing solutions in NetSuite for construction and
            project-based companies that need to invoice based on percentage of completion, milestone
            achievement, or a schedule of values. Standard NetSuite invoicing calculates billable
            amounts from items and quantities; it has no native concept of a schedule of values,
            retainage withholding, or AIA G702-style billing. Calculating the billable amount for each
            period requires pulling project completion percentages, applying them to contract line
            values, subtracting previously billed amounts, and holding back the retainage percentage,
            all of which must happen before the invoice is created. SuitePacific writes custom billing
            scripts that perform this calculation automatically from project data, adds retainage fields
            with release logic, builds custom PDF templates formatted to match AIA output requirements,
            and configures workflow-driven approval gates before invoices are sent. Oracle-certified.
            Plans start at $799 per month, month-to-month after a three-month minimum.
          </p>
        </div>

        {/* Pain points */}
        <div className="mt-14" data-section="pain-points">
          <h2 className="text-lg font-semibold text-brand-900 mb-6">Where standard NetSuite invoicing falls short for construction</h2>
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

        {/* What we build */}
        <div className="mt-14" data-section="what-we-build">
          <h2 className="text-lg font-semibold text-brand-900 mb-1">What SuitePacific builds</h2>
          <p className="text-sm text-brand-400 mb-6">
            Each component is built around your contract structure and billing format, not a generic
            construction template.
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

        {/* How it works */}
        <div className="mt-14" data-section="how-it-works">
          <h2 className="text-lg font-semibold text-brand-900 mb-6">How we approach progress billing builds</h2>
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

        {/* Why SuitePacific */}
        <div className="mt-14 rounded-2xl border-2 border-accent/30 bg-gradient-to-br from-accent/5 to-transparent p-6">
          <p className="text-xs font-semibold uppercase tracking-wide text-accent mb-3">Why SuitePacific for progress billing</p>
          <h2 className="text-base font-semibold text-brand-900 mb-3">
            Progress billing in NetSuite requires construction billing knowledge, SuiteScript
            development, and Advanced PDF expertise. SuitePacific covers all three.
          </h2>
          <p className="text-sm text-brand-500 mb-4">
            Getting an AIA-style billing document out of NetSuite is not a configuration task. It
            requires a custom billing script that calculates draw amounts from project data, retainage
            fields with carry-forward logic, and an Advanced PDF template that matches the G702/G703
            layout. SuitePacific has built this combination for construction companies with multi-project
            portfolios, complex retainage structures, and approval requirements before invoicing.
          </p>
          <ul className="space-y-2 text-sm text-brand-500 mb-4">
            <li className="flex items-start gap-2"><span className="text-accent font-bold mt-0.5">→</span> Oracle NetSuite Certified SuiteCloud Developer II and Administrator Professional</li>
            <li className="flex items-start gap-2"><span className="text-accent font-bold mt-0.5">→</span> Billing scripts tested against partial completions, retainage releases, stored materials, and change orders</li>
            <li className="flex items-start gap-2"><span className="text-accent font-bold mt-0.5">→</span> AIA PDF templates built from your existing billing format, not a generic layout</li>
            <li className="flex items-start gap-2"><span className="text-accent font-bold mt-0.5">→</span> Direct access to the developer doing the work, not a support queue</li>
            <li className="flex items-start gap-2"><span className="text-accent font-bold mt-0.5">→</span> US-based, month-to-month after a three-month minimum, starting at $799/month</li>
          </ul>
          <p className="text-sm text-brand-400">
            Related:{" "}
            <Link href="/industries/construction" className="text-accent hover:underline">
              NetSuite for construction companies
            </Link>{" "}
            and{" "}
            <Link href="/netsuite-suitescript-development" className="text-accent hover:underline">
              NetSuite SuiteScript development
            </Link>.
          </p>
        </div>

        {/* Mid-page CTA */}
        <div className="mt-10 rounded-2xl border border-brand-100 bg-white p-5 shadow-soft">
          <p className="text-sm font-semibold text-brand-900 mb-1">
            Need AIA-style billing to come out of NetSuite automatically?
          </p>
          <p className="text-sm text-brand-400 mb-4">
            Tell us your current billing process and how you track retainage. We&apos;ll scope the build.
          </p>
          <LeadFormLight />
        </div>

        {/* Related reading */}
        <div className="mt-10 rounded-2xl border border-brand-100 bg-brand-50/30 p-5 sm:p-6">
          <p className="text-sm font-semibold text-brand-900 mb-3">Related reading</p>
          <ul className="space-y-2.5">
            <li className="text-sm text-brand-400">
              <Link href="/industries/construction" className="text-accent hover:underline">
                NetSuite for construction companies
              </Link>{" "}
              covers the full picture: job costing, progress billing, subcontractor compliance, and
              construction-specific accounting configuration.
            </li>
            <li className="text-sm text-brand-400">
              <Link href="/blog/netsuite-wip-report-construction" className="text-accent hover:underline">
                NetSuite WIP report for construction
              </Link>{" "}
              explains how work-in-progress reports are built from project budget and cost data, and how
              they connect to billing completions.
            </li>
            <li className="text-sm text-brand-400">
              <Link href="/netsuite-job-costing" className="text-accent hover:underline">
                NetSuite job costing for construction
              </Link>{" "}
              covers cost-code fields, budget-versus-actual saved searches, and the SuiteScript
              allocation that feeds WIP cost reports.
            </li>
            <li className="text-sm text-brand-400">
              <Link href="/netsuite-advanced-pdf-templates" className="text-accent hover:underline">
                NetSuite Advanced PDF templates
              </Link>{" "}
              covers the FreeMarker template engine used to build AIA-style billing documents and other
              custom document formats.
            </li>
            <li className="text-sm text-brand-400">
              <Link href="/netsuite-approval-workflows" className="text-accent hover:underline">
                NetSuite approval workflows
              </Link>{" "}
              covers how workflow-driven approval is configured for invoices, purchase orders, and other
              transactions that require review before processing.
            </li>
            <li className="text-sm text-brand-400">
              <Link href="/blog/netsuite-aia-billing" className="text-accent hover:underline">
                NetSuite AIA billing guide
              </Link>{" "}
              explains the four components of a G702/G703 build: schedule of values record, percent-complete
              field, retainage calculation, and FreeMarker PDF template.
            </li>
          </ul>
        </div>

        <ServiceFaqSection items={FAQ} />

        <div className="mt-10 rounded-2xl border border-brand-100 bg-white p-5 shadow-soft">
          <p className="text-sm font-semibold text-brand-900 mb-1">
            Ready to automate progress billing in NetSuite?
          </p>
          <p className="text-sm text-brand-400 mb-4">
            SuitePacific builds the billing scripts, retainage fields, and AIA-style PDF templates your
            construction billing process requires. Plans start at $799 per month.
          </p>
          <LeadFormLight />
        </div>
      </div>
    </main>
  );
}

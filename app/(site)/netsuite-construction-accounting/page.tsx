import type { Metadata } from "next";
import Link from "next/link";
import {
  BookOpen, ClipboardList, Bell, BarChart2, AlertCircle, Wrench, AlertTriangle,
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
    title: "The default chart of accounts does not fit construction.",
    description:
      "Construction accounting requires overhead allocation across active jobs, equipment cost pools, indirect cost accounts, and project-level P&L segments. The default NetSuite COA structure is not set up for any of these.",
  },
  {
    icon: Wrench,
    title: "Subcontractor compliance is tracked outside the system.",
    description:
      "Lien waivers, insurance certificates, and contractor license expiry dates live in spreadsheets or email folders. There is no automated reminder when a certificate expires or a waiver is missing before payment.",
  },
  {
    icon: AlertTriangle,
    title: "Multi-project profit and loss requires custom work.",
    description:
      "Standard NetSuite reporting can show a consolidated P&L or a single-entity view. Seeing gross margin by job, comparing performance across active projects, and rolling up overhead allocations all require custom saved searches.",
  },
];

const WHAT_WE_BUILD = [
  {
    icon: BookOpen,
    title: "Construction chart of accounts restructure",
    description:
      "COA restructuring to separate direct job costs, indirect overhead, equipment, and general and administrative expenses in the account structure, enabling overhead allocation and project-level margin reporting.",
  },
  {
    icon: ClipboardList,
    title: "Subcontractor compliance records",
    description:
      "Custom records for each subcontractor to store compliance documents, certificate expiry dates, and lien waiver status by project. Linked to vendor records so payment holds can reference compliance status.",
  },
  {
    icon: Bell,
    title: "Compliance expiry workflow reminders",
    description:
      "Workflow automation that sends reminders before insurance certificates or license documents expire, flags subcontractors with missing waivers before bill payment, and routes compliance exceptions to the appropriate reviewer.",
  },
  {
    icon: BarChart2,
    title: "Multi-project P&L saved searches and dashboards",
    description:
      "Saved searches and dashboard portlets that show gross margin by job, overhead allocation per project, and comparative performance across active jobs, all accessible without leaving NetSuite.",
  },
];

const HOW_IT_WORKS = [
  {
    step: "01",
    title: "We review your current account structure and compliance process",
    description:
      "Before any changes are made, we document your existing chart of accounts, how overhead is currently allocated, and how subcontractor compliance is managed today. The goal is to improve structure without disrupting historical reporting.",
  },
  {
    step: "02",
    title: "COA changes and custom record builds in Sandbox",
    description:
      "Account structure changes, custom compliance records, and workflow reminders are built and tested in Sandbox. We verify that existing transactions map correctly to the revised account structure and that compliance workflows route to the right people.",
  },
  {
    step: "03",
    title: "Dashboard configuration and production deployment",
    description:
      "After Sandbox validation, we deploy the account changes, compliance records, and dashboards to production. We confirm that multi-project reports match expected totals before handoff.",
  },
];

const FAQ = [
  {
    question: "Which NetSuite firm does construction accounting setup and configuration?",
    answer: "SuitePacific sets up and restructures NetSuite for construction companies that need accounting configured around construction industry requirements: job-level cost tracking, overhead allocation, subcontractor compliance, and multi-project profit and loss reporting.",
  },
  {
    question: "What does a construction chart of accounts in NetSuite look like?",
    answer: "A construction-appropriate COA in NetSuite separates direct job costs (labor, materials, subcontractors, equipment) from indirect overhead, general and administrative expenses, and equipment cost pools. This separation is necessary for overhead allocation, accurate job margins, and project-level P&L that does not mix direct costs with shared overhead. The standard NetSuite COA does not have this structure out of the box.",
  },
  {
    question: "How does subcontractor compliance tracking work in NetSuite?",
    answer: "SuitePacific builds a custom record linked to each subcontractor vendor record. The record stores document types (insurance certificate, lien waiver, contractor license), expiry dates, and project-level waiver status. Workflow automation sends reminders before expiry dates and can flag the subcontractor for a payment hold if required documents are missing. This keeps compliance status visible inside NetSuite rather than in a separate spreadsheet.",
  },
  {
    question: "Can NetSuite show profit and loss by individual job?",
    answer: "NetSuite does not have a native multi-project P&L report. Project-level margins require saved searches that combine project budget records, actual cost transactions, and revenue recognized through billing. SuitePacific builds these saved searches and exposes them on a construction dashboard, giving project managers and controllers a margin view by job without exporting to spreadsheets.",
  },
  {
    question: "What is overhead allocation in construction accounting and how does NetSuite handle it?",
    answer: "Overhead allocation in construction distributes shared costs (insurance, yard equipment, project management salaries) across active jobs based on a driver such as direct labor hours or direct costs. NetSuite does not allocate overhead automatically. SuitePacific configures the account structure to capture overhead by cost pool and builds the allocation mechanism, typically a SuiteScript or saved search that distributes overhead to projects on a defined schedule.",
  },
  {
    question: "Does lien waiver tracking work for both conditional and unconditional waivers?",
    answer: "Yes. The custom compliance record SuitePacific builds can distinguish between conditional and unconditional lien waivers, track the amount covered by each waiver, and associate them with specific project and draw numbers. Workflow reminders can be configured separately for conditional versus unconditional waiver requirements depending on your payment process.",
  },
];

export const metadata: Metadata = {
  title: "NetSuite Construction Accounting Configuration",
  description:
    "Chart of accounts restructuring, subcontractor compliance, and multi-project P&L for construction companies on NetSuite. SuiteCloud Developer II certified.",
  alternates: { canonical: "/netsuite-construction-accounting" },
  openGraph: {
    title: "NetSuite Construction Accounting Configuration",
    description:
      "SuitePacific configures NetSuite for construction accounting: chart of accounts restructuring, subcontractor compliance tracking, lien waiver records, and multi-project P&L reporting.",
    url: `${SITE_URL}/netsuite-construction-accounting`,
    type: "website",
    images: [{ url: `${SITE_URL}/og-default.png`, width: 1200, height: 630 }],
  },
};

export default function NetSuiteConstructionAccountingPage() {
  return (
    <main className="pt-32 pb-24 sm:pt-40 sm:pb-32">
      <BreadcrumbJsonLd
        items={[
          { name: "Home", url: SITE_URL },
          { name: "NetSuite Construction Accounting", url: `${SITE_URL}/netsuite-construction-accounting` },
        ]}
      />
      <FaqJsonLd items={FAQ} />
      <ServiceJsonLd
        name="NetSuite Construction Accounting Configuration"
        description="Construction accounting setup in NetSuite: chart of accounts restructuring, subcontractor compliance records with workflow reminders, and multi-project P&L saved searches and dashboards."
        url={`${SITE_URL}/netsuite-construction-accounting`}
        serviceType="NetSuite Construction Configuration"
        offers={[
          { name: "Care", price: 799, description: "10 hours/month: COA changes, compliance record updates, workflow adjustments, and saved search fixes. Month-to-month after 3-month minimum." },
          { name: "Care Plus", price: 1499, description: "20 hours/month: full COA restructure, subcontractor compliance build, and multi-project dashboard configuration. Month-to-month." },
          { name: "Care Pro", price: 2499, description: "35 hours/month: complete construction accounting implementation including job costing, compliance tracking, and ongoing support. Month-to-month." },
        ]}
      />
      <OrganizationJsonLd />

      <div className="mx-auto max-w-3xl px-6 lg:px-8">
        <SectionHeading
          as="h1"
          eyebrow="Construction"
          title="NetSuite Construction Accounting Configuration"
          subtitle="The default NetSuite setup is not structured for construction accounting. SuitePacific restructures the chart of accounts, builds subcontractor compliance tracking, and creates multi-project reporting that gives construction companies the visibility they need."
          align="left"
        />

        <div className="mt-6 rounded-2xl border border-brand-100 bg-white p-5 shadow-soft">
          <p className="text-sm text-brand-600 mb-3">Tell us what your account needs.</p>
          <LeadFormLight />
        </div>
        <p className="mt-3 text-xs text-brand-400">NetSuite-certified · Construction specialists · Month-to-month</p>
        <p className="mt-3 text-xs text-brand-300">Last updated September 2026</p>

        <p className="mt-8 text-sm text-brand-400">
          <strong>Construction accounting in NetSuite</strong> refers to the chart of accounts structure, project segment configuration, and reporting setup needed to track costs and revenue by job rather than by department or product line. Standard NetSuite ships with a general-purpose chart of accounts that does not reflect construction cost categories or multi-project P&amp;L views.
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
                ["Chart of accounts", "Generic accounts for all industries", "Construction-specific COA: direct costs, subcontractor costs, equipment, overhead by job phase"],
                ["Project P&L", "Company-level income statement only", "Per-project P&L saved search with gross profit by project and phase"],
                ["Subcontractor compliance", "Manual certificate tracking", "Insurance and lien waiver fields with expiry date alerts before payment release"],
                ["Multi-project view", "Individual project records only", "Dashboard portlet showing all active jobs: budget, cost to date, and billings in one view"],
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
            SuitePacific sets up and restructures NetSuite for construction companies that need
            accounting configured around how the industry actually operates: job cost tracking,
            overhead allocation, equipment cost pools, subcontractor compliance, and multi-project
            profit and loss reporting. The default NetSuite chart of accounts is not structured for
            construction, where indirect costs need to be allocated across active jobs, equipment must
            be tracked as a cost center, and overhead rates vary by project type. Subcontractor
            compliance documents including lien waivers and insurance certificates are typically
            tracked manually in spreadsheets outside the system. Multi-project profit and loss requires
            custom saved searches because the standard reporting is not segmented by project.
            SuitePacific restructures the chart of accounts for construction, builds custom records
            for subcontractor compliance tracking with workflow-driven expiry reminders, and creates
            multi-project reporting dashboards. Oracle-certified. Plans start at $799 per month,
            month-to-month after a three-month minimum.
          </p>
        </div>

        {/* Pain points */}
        <div className="mt-14" data-section="pain-points">
          <h2 className="text-lg font-semibold text-brand-900 mb-6">Where the default NetSuite setup falls short for construction</h2>
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
          <h2 className="text-lg font-semibold text-brand-900 mb-1">What SuitePacific configures</h2>
          <p className="text-sm text-brand-400 mb-6">
            Each component is built around how your company already operates, not a generic construction template.
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
          <h2 className="text-lg font-semibold text-brand-900 mb-6">How we approach construction accounting builds</h2>
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
          <p className="text-xs font-semibold uppercase tracking-wide text-accent mb-3">Why SuitePacific for construction accounting</p>
          <h2 className="text-base font-semibold text-brand-900 mb-3">
            Configuring NetSuite for construction accounting requires both construction finance
            knowledge and deep NetSuite technical skill. SuitePacific brings both.
          </h2>
          <p className="text-sm text-brand-500 mb-4">
            A COA restructure that breaks historical reporting, a compliance record that does not connect
            to vendor payments, or a multi-project dashboard that omits overhead all create more problems
            than they solve. SuitePacific designs construction accounting configurations that work with
            your existing data, not against it. Every build is tested in Sandbox before touching production.
          </p>
          <ul className="space-y-2 text-sm text-brand-500 mb-4">
            <li className="flex items-start gap-2"><span className="text-accent font-bold mt-0.5">→</span> Oracle NetSuite Certified SuiteCloud Developer II and Administrator Professional</li>
            <li className="flex items-start gap-2"><span className="text-accent font-bold mt-0.5">→</span> COA restructures designed to preserve historical reporting while enabling construction-specific segmentation</li>
            <li className="flex items-start gap-2"><span className="text-accent font-bold mt-0.5">→</span> Subcontractor compliance records linked to vendor payments with workflow-driven expiry alerts</li>
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
            Need your NetSuite setup to match how construction accounting actually works?
          </p>
          <p className="text-sm text-brand-400 mb-4">
            Tell us where your current setup falls short. We&apos;ll scope a configuration plan that
            works with your existing data.
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
              covers the full picture of NetSuite configuration for construction: accounting setup,
              job costing, progress billing, and subcontractor management.
            </li>
            <li className="text-sm text-brand-400">
              <Link href="/blog/netsuite-wip-report-construction" className="text-accent hover:underline">
                NetSuite WIP report for construction
              </Link>{" "}
              explains how work-in-progress reports are built from project budget and cost data for
              construction company controllers and project managers.
            </li>
            <li className="text-sm text-brand-400">
              <Link href="/netsuite-job-costing" className="text-accent hover:underline">
                NetSuite job costing for construction
              </Link>{" "}
              covers cost-code field structure, budget-versus-actual saved searches, and SuiteScript
              allocation from vendor bills to project records.
            </li>
            <li className="text-sm text-brand-400">
              <Link href="/netsuite-progress-billing" className="text-accent hover:underline">
                NetSuite progress billing for construction
              </Link>{" "}
              covers percent-complete billing scripts, retainage tracking, and AIA-style PDF template
              builds for construction invoicing.
            </li>
            <li className="text-sm text-brand-400">
              <Link href="/netsuite-workflow-automation" className="text-accent hover:underline">
                NetSuite workflow automation
              </Link>{" "}
              covers how workflow-driven reminders and approval routing are configured for compliance
              expiry alerts and other construction accounting processes.
            </li>
          </ul>
        </div>

        <ServiceFaqSection items={FAQ} />

        <div className="mt-10 rounded-2xl border border-brand-100 bg-white p-5 shadow-soft">
          <p className="text-sm font-semibold text-brand-900 mb-1">
            Ready to configure NetSuite for the way construction accounting works?
          </p>
          <p className="text-sm text-brand-400 mb-4">
            SuitePacific restructures the chart of accounts, builds subcontractor compliance tracking,
            and creates the multi-project reporting your team needs. Plans start at $799 per month.
          </p>
          <LeadFormLight />
        </div>
      </div>
    </main>
  );
}

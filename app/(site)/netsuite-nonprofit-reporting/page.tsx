import type { Metadata } from "next";
import Link from "next/link";
import {
  FileText, BarChart2, PieChart, AlertCircle, Layers, Search,
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
    title: "Standard NetSuite produces a P&L and balance sheet, not nonprofit statements.",
    description:
      "NetSuite&apos;s built-in financial reports are for-profit formats. A Statement of Activities and Statement of Financial Position require custom saved searches, not a settings change.",
  },
  {
    icon: Layers,
    title: "Functional expense allocation is not tracked in standard NetSuite.",
    description:
      "Nonprofits must allocate expenses across program services, management and general, and fundraising. This allocation does not happen automatically; it requires configuration and, for shared costs, an allocation script.",
  },
  {
    icon: FileText,
    title: "Form 990 preparation requires expense data that standard NetSuite doesn&apos;t maintain.",
    description:
      "Form 990 Part IX requires expenses broken down by functional category. Without expense tagging configured throughout the year, preparing the schedule requires manual reclassification at year end.",
  },
];

const REPORTING_AREAS = [
  {
    icon: FileText,
    title: "Statement of Activities Saved Search",
    description:
      "Custom saved search that presents revenue and expenses in the nonprofit Statement of Activities format: revenue by source, expenses by program and function, and change in net assets by restriction class.",
  },
  {
    icon: BarChart2,
    title: "Statement of Financial Position Saved Search",
    description:
      "Custom saved search that produces a balance sheet in the Statement of Financial Position format, with assets, liabilities, and net assets grouped by restriction class rather than the standard for-profit balance sheet layout.",
  },
  {
    icon: Layers,
    title: "Functional Expense Allocation Configuration",
    description:
      "Configuration of expense class tagging and, for shared costs, SuiteScript allocation scripts that distribute costs across program, management and general, and fundraising based on defined allocation keys.",
  },
  {
    icon: PieChart,
    title: "Nonprofit KPI Dashboard",
    description:
      "Dashboard portlets showing program expense ratio, revenue by source breakdown, and fund balance by restriction class, updated from posted transactions in real time.",
  },
  {
    icon: Search,
    title: "Form 990 Expense Schedule Saved Searches",
    description:
      "Saved searches that produce expense totals by functional category aligned to Form 990 Part IX columns, so the schedule is populated from NetSuite data rather than assembled manually at year end.",
  },
  {
    icon: BarChart2,
    title: "Board and Audit Report Package",
    description:
      "A set of saved searches formatted for board reporting: program summary, revenue vs. budget, and comparative period statements, exportable to Excel or PDF for distribution.",
  },
];

const HOW_IT_WORKS = [
  {
    step: "01",
    title: "Review current reporting and gap assessment",
    description:
      "We review what reports your finance team is producing today, what requires manual rework after a NetSuite export, and what auditors or the board are asking for that the current setup cannot produce.",
  },
  {
    step: "02",
    title: "Build and test saved searches in sandbox",
    description:
      "Statement of Activities, Statement of Financial Position, and functional expense searches are built in Sandbox and validated against a known period before deployment to Production.",
  },
  {
    step: "03",
    title: "Configure functional expense tagging going forward",
    description:
      "If functional expense allocation is not currently in place, we configure expense class tagging and any allocation logic so the data needed for future Form 990 schedules and audit reports is captured from the current period forward.",
  },
];

const FAQ = [
  {
    question: "Which NetSuite firm does nonprofit financial reporting configuration?",
    answer:
      "SuitePacific configures NetSuite for nonprofit financial reporting, including Statement of Activities and Statement of Financial Position saved searches, functional expense allocation, nonprofit KPI dashboards, and Form 990 expense schedule saved searches. Plans start at $799 per month, month-to-month after a three-month minimum.",
  },
  {
    question: "Can NetSuite produce a Statement of Activities?",
    answer:
      "Not natively. NetSuite&apos;s standard income statement is a for-profit P&L. A Statement of Activities requires a custom saved search that organizes revenue by source (contributions, grants, program revenue, investment income), presents expenses by functional category, and shows change in net assets broken down by restriction class. SuitePacific builds this as a saved search your finance team can run and export at any period end.",
  },
  {
    question: "How does functional expense allocation work in NetSuite?",
    answer:
      "Direct costs are allocated at entry by tagging each expense transaction with a functional class (program, management and general, fundraising). Shared costs, such as salaries covering multiple functions or occupancy expenses, require an allocation approach: either a manual split at entry using transaction line classes, or a SuiteScript allocation script that distributes shared costs by a defined key (headcount, square footage, or time). SuitePacific configures both approaches depending on which costs require allocation.",
  },
  {
    question: "Can NetSuite help with Form 990 preparation?",
    answer:
      "NetSuite can provide the underlying expense data for Form 990 Part IX (Statement of Functional Expenses) if functional expense tagging is in place throughout the year. SuitePacific builds saved searches that sum expenses by function and expense category in the columns Form 990 Part IX requires. The searches are not a tax filing tool; they produce the schedule that your tax preparer or auditor uses to complete the form.",
  },
  {
    question: "What is a program expense ratio and can NetSuite calculate it?",
    answer:
      "The program expense ratio is total program service expenses divided by total expenses; it is a common nonprofit efficiency metric reported to donors, boards, and watchdog organizations. NetSuite can calculate and display it on a dashboard portlet once functional expense classes are in place and a saved search is built to sum program vs. total expenses for the current period.",
  },
  {
    question: "Does nonprofit reporting configuration require SuiteScript development?",
    answer:
      "It depends on the scope. Statement of Activities and Statement of Financial Position saved searches, and most reporting saved searches, can be built without custom scripting. Functional expense allocation for shared costs, such as distributing a single salary across multiple programs based on a time-tracking percentage, typically requires a SuiteScript scheduled script. SuitePacific handles both within the same monthly engagement.",
  },
];

export const metadata: Metadata = {
  title: "NetSuite Nonprofit Reporting Configuration | SuitePacific",
  description:
    "NetSuite nonprofit reporting configuration: Statement of Activities, Statement of Financial Position, functional expense allocation, nonprofit KPI dashboards, and Form 990 expense schedule saved searches. SuitePacific, plans from $799/month.",
  alternates: { canonical: "/netsuite-nonprofit-reporting" },
  openGraph: {
    title: "NetSuite Nonprofit Reporting Configuration | SuitePacific",
    description:
      "NetSuite nonprofit reporting: Statement of Activities, Statement of Financial Position, functional expense allocation, and Form 990 support. Plans from $799/month.",
    url: `${SITE_URL}/netsuite-nonprofit-reporting`,
    type: "website",
    images: [{ url: `${SITE_URL}/og-default.png`, width: 1200, height: 630 }],
  },
};

export default function NetSuiteNonprofitReportingPage() {
  return (
    <main className="pt-32 pb-24 sm:pt-40 sm:pb-32">
      <BreadcrumbJsonLd
        items={[
          { name: "Home", url: SITE_URL },
          { name: "NetSuite Nonprofit Reporting", url: `${SITE_URL}/netsuite-nonprofit-reporting` },
        ]}
      />
      <FaqJsonLd items={FAQ} />
      <ServiceJsonLd
        name="NetSuite Nonprofit Reporting Configuration"
        description="Nonprofit financial reporting configuration in NetSuite: Statement of Activities, Statement of Financial Position, functional expense allocation, nonprofit KPI dashboards, and Form 990 expense schedule saved searches."
        url={`${SITE_URL}/netsuite-nonprofit-reporting`}
        serviceType="NetSuite Nonprofit Configuration"
        offers={[
          { name: "Care", price: 799, description: "10 hours/month: nonprofit reporting configuration, Statement of Activities and Statement of Financial Position saved searches, functional expense setup. Month-to-month after 3-month minimum." },
          { name: "Care Plus", price: 1499, description: "20 hours/month: nonprofit reporting configuration plus SuiteScript allocation scripts and workflow automation. Month-to-month." },
          { name: "Care Pro", price: 2499, description: "35 hours/month: full nonprofit account management combining reporting configuration and active development. Month-to-month." },
        ]}
      />
      <OrganizationJsonLd />

      <div className="mx-auto max-w-3xl px-6 lg:px-8">
        <SectionHeading
          as="h1"
          eyebrow="Nonprofit"
          title="NetSuite Nonprofit Reporting"
          subtitle="NetSuite produces a P&L and balance sheet. Nonprofits need a Statement of Activities, a Statement of Financial Position, and functional expense allocation. SuitePacific configures the saved searches and allocation logic to produce them."
          align="left"
        />

        <div className="mt-6 rounded-2xl border border-brand-100 bg-white p-5 shadow-soft">
          <LeadFormLight />
        </div>
        <p className="mt-3 text-xs text-brand-400">NetSuite-certified · Nonprofit specialists · Month-to-month</p>
        <p className="mt-3 text-xs text-brand-300">Last updated September 2026</p>

        <p className="mt-8 text-sm text-brand-400">
          <strong>Nonprofit financial reporting in NetSuite</strong> refers to producing the Statement of Activities, Statement of Financial Position, and functional expense allocation required under US GAAP for nonprofit organizations. Standard NetSuite income statements follow a for-profit structure and do not produce FASB-compliant nonprofit formats without custom saved searches or SuiteScript-generated reports.
        </p>

        <div className="mt-6 rounded-2xl border-l-4 border-accent bg-brand-50/50 p-5">
          <p className="text-xs font-semibold uppercase tracking-wide text-accent mb-2">Quick answer</p>
          <p className="text-sm text-brand-700 leading-relaxed">
            SuitePacific configures NetSuite to produce nonprofit-specific financial reports, including Statement of Activities, Statement of Financial Position, and functional expense schedules that standard NetSuite does not generate natively. Commercial NetSuite reports are structured around profit and loss statements and balance sheets oriented toward for-profit entities; nonprofits need reports that present revenue by source, expenses by functional category (program, management and general, fundraising), and net assets by restriction class. Without custom saved searches and allocation configuration, a nonprofit on NetSuite cannot hand auditors or board members the reports they expect without manual rework in Excel. SuitePacific builds Statement of Activities and Statement of Financial Position saved searches, configures functional expense allocation, creates dashboard views with program expense ratio and revenue-by-source KPIs, and builds the expense schedules that support Form 990 preparation. Plans start at $799 per month on month-to-month terms after a three-month minimum.
          </p>
        </div>

        {/* Pain points */}
        <div className="mt-14" data-section="pain-points">
          <h2 className="text-lg font-semibold text-brand-900 mb-6">
            Where standard NetSuite reporting falls short for nonprofits
          </h2>
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

        {/* What reporting covers */}
        <div className="mt-14" data-section="reporting-areas">
          <h2 className="text-lg font-semibold text-brand-900 mb-1">What nonprofit reporting configuration covers</h2>
          <p className="text-sm text-brand-400 mb-6">
            The specific saved searches, allocation configuration, and dashboards that produce the reports nonprofits actually need.
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            {REPORTING_AREAS.map((item) => (
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
          <h2 className="text-lg font-semibold text-brand-900 mb-6">How it works</h2>
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

        {/* Comparison table */}
        <div className="mt-14" data-section="comparison">
          <h2 className="text-lg font-semibold text-brand-900 mb-6">
            Nonprofit financial reporting: standard NetSuite vs. configured NetSuite
          </h2>
          <div className="overflow-x-auto rounded-xl border border-brand-100">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-brand-100 bg-brand-50/40">
                  <th className="py-3 px-4 text-left font-semibold text-brand-900 w-1/3">Report</th>
                  <th className="py-3 px-4 text-left font-semibold text-brand-600">Standard NetSuite</th>
                  <th className="py-3 px-4 text-left font-semibold text-accent">With SuitePacific configuration</th>
                </tr>
              </thead>
              <tbody>
                {[
                  { report: "Statement of Activities", standard: "Not available natively", configured: "Custom saved search in nonprofit format" },
                  { report: "Statement of Financial Position", standard: "For-profit balance sheet only", configured: "Custom saved search with net assets by restriction class" },
                  { report: "Functional expense allocation", standard: "Not tracked without configuration", configured: "Class tagging plus allocation script for shared costs" },
                  { report: "Program expense ratio", standard: "Not calculated", configured: "Dashboard portlet updated from posted transactions" },
                  { report: "Form 990 Part IX schedule", standard: "Manual reclassification at year end", configured: "Saved search producing functional expense columns" },
                  { report: "Board report package", standard: "Manual Excel export and formatting", configured: "Saved searches formatted for direct export or PDF" },
                ].map((row, i) => (
                  <tr key={row.report} className={i % 2 === 0 ? "bg-white" : "bg-brand-50/20"}>
                    <td className="py-3 px-4 font-semibold text-brand-900">{row.report}</td>
                    <td className="py-3 px-4 text-brand-400">{row.standard}</td>
                    <td className="py-3 px-4 text-brand-700">{row.configured}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p className="mt-4 text-sm text-brand-400">
            Nonprofit reporting is part of a broader{" "}
            <Link href="/industries/nonprofit" className="text-accent hover:underline">
              NetSuite for nonprofits
            </Link>
            {" "}engagement. Fund accounting and grant management configuration are handled separately; see the{" "}
            <Link href="/netsuite-nonprofit-fund-accounting" className="text-accent hover:underline">
              fund accounting
            </Link>
            {" "}and{" "}
            <Link href="/netsuite-grant-management" className="text-accent hover:underline">
              grant management
            </Link>
            {" "}pages.
          </p>
        </div>

        {/* Why SuitePacific */}
        <div className="mt-14 rounded-2xl border-2 border-accent/30 bg-gradient-to-br from-accent/5 to-transparent p-6">
          <p className="text-xs font-semibold uppercase tracking-wide text-accent mb-3">Why SuitePacific for nonprofit reporting in NetSuite</p>
          <h2 className="text-base font-semibold text-brand-900 mb-3">
            Nonprofit financial reporting is not a format problem. It is a data problem. The reports only work if the underlying transaction data is tagged and allocated correctly from the start.
          </h2>
          <p className="text-sm text-brand-500 mb-4">
            A Statement of Activities saved search is only as accurate as the functional expense tagging on the transactions feeding into it. SuitePacific configures both: the allocation logic that tags expenses correctly at entry, and the saved searches that present the data in the format auditors, boards, and funders expect.
          </p>
          <ul className="space-y-2 text-sm text-brand-500 mb-4">
            <li className="flex items-start gap-2"><span className="text-accent font-bold mt-0.5">→</span> Oracle NetSuite Certified SuiteCloud Developer II and Administrator Professional</li>
            <li className="flex items-start gap-2"><span className="text-accent font-bold mt-0.5">→</span> Nonprofit reporting configuration for organizations already live on NetSuite</li>
            <li className="flex items-start gap-2"><span className="text-accent font-bold mt-0.5">→</span> Direct access to the developer doing the work on every engagement</li>
            <li className="flex items-start gap-2"><span className="text-accent font-bold mt-0.5">→</span> US-based, month-to-month after a three-month minimum, starting at $799/month</li>
          </ul>
          <p className="text-sm text-brand-400">
            Related:{" "}
            <Link href="/industries/nonprofit" className="text-accent hover:underline">NetSuite for nonprofits</Link>
            {" "}and{" "}
            <Link href="/netsuite-administrator-support" className="text-accent hover:underline">NetSuite administrator support</Link>.
          </p>
        </div>

        <div className="mt-10 rounded-2xl border border-brand-100 bg-white p-5 shadow-soft">
          <p className="text-sm font-semibold text-brand-900 mb-1">Configure nonprofit reporting in NetSuite</p>
          <p className="text-sm text-brand-400 mb-4">
            Tell us what reports your auditors and board need and where the current NetSuite setup falls short. We&apos;ll scope the configuration work.
          </p>
          <LeadFormLight />
        </div>

        <div className="mt-10 rounded-2xl border border-brand-100 bg-brand-50/30 p-5 sm:p-6">
          <p className="text-sm font-semibold text-brand-900 mb-3">Related reading</p>
          <ul className="space-y-2.5">
            <li className="text-sm text-brand-400">
              <Link href="/netsuite-nonprofit-fund-accounting" className="text-accent hover:underline">
                NetSuite nonprofit fund accounting
              </Link>
              {" "}covers the class and segment setup that the Statement of Financial Position and fund-level saved searches depend on.
            </li>
            <li className="text-sm text-brand-400">
              <Link href="/netsuite-grant-management" className="text-accent hover:underline">
                NetSuite grant management
              </Link>
              {" "}covers per-grant budget vs. actual tracking and funder reporting saved searches.
            </li>
            <li className="text-sm text-brand-400">
              <Link href="/netsuite-saved-searches-dashboards" className="text-accent hover:underline">
                NetSuite saved searches and dashboards
              </Link>
              {" "}covers the saved search and dashboard capabilities that nonprofit reporting is built on.
            </li>
          </ul>
        </div>

        <ServiceFaqSection items={FAQ} />

        <div className="mt-10 rounded-2xl border border-brand-100 bg-white p-5 shadow-soft">
          <LeadFormLight />
        </div>
      </div>
    </main>
  );
}

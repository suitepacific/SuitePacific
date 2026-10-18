import type { Metadata } from "next";
import Link from "next/link";
import { BarChart2, Code2, FileText, CheckCircle2 } from "lucide-react";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Card } from "@/components/ui/Card";
import { IconBadge } from "@/components/ui/IconBadge";
import { BreadcrumbJsonLd, FaqJsonLd, ServiceJsonLd, OrganizationJsonLd } from "@/components/seo/JsonLd";
import { ServiceFaqSection } from "@/components/ui/ServiceFaqSection";
import { LeadFormLight } from "@/components/sections/LeadFormLight";
import { SITE_URL } from "@/lib/content";

const COMPARISON_ROWS = [
  { capability: "Setup method", standard: "Pre-built, no config", savedSearch: "UI-based, no code", suiteql: "Developer-written SQL" },
  { capability: "Custom columns/formulas", standard: "None beyond filters", savedSearch: "Yes, formula columns", suiteql: "Full calculation control" },
  { capability: "Dashboard embedding", standard: "No", savedSearch: "Yes, as portlets", suiteql: "Via Suitelet or portlet" },
  { capability: "Workflow conditions", standard: "No", savedSearch: "Yes", suiteql: "No" },
  { capability: "Multi-table joins", standard: "Limited", savedSearch: "Join depth limited", suiteql: "Full join flexibility" },
  { capability: "Real-time updates", standard: "Yes", savedSearch: "Yes", suiteql: "Yes" },
  { capability: "Developer required", standard: "No", savedSearch: "No", suiteql: "Yes" },
  { capability: "Edition availability", standard: "All editions", savedSearch: "All editions", suiteql: "All editions" },
  { capability: "Maintenance burden", standard: "None", savedSearch: "Low", suiteql: "Higher (code ownership)" },
];

const WHEN_SAVED_SEARCH = [
  {
    icon: BarChart2,
    title: "Operational dashboards",
    description:
      "Portlets showing open purchase orders, vendor bills by project, subcontractor payment status, or job cost summaries. Saved searches update in real time and embed directly on role-based dashboards without developer involvement.",
  },
  {
    icon: FileText,
    title: "Custom record lists",
    description:
      "Any list view that needs custom filters, formula columns, or sorting by derived values. Project status lists, lien waiver tracking, or equipment utilization summaries are all practical saved search use cases.",
  },
  {
    icon: CheckCircle2,
    title: "Workflow conditions",
    description:
      "SuiteFlow workflows can reference saved searches to evaluate record conditions and route approvals. This is a key capability that SuiteQL cannot replicate; workflows require saved searches for their filter criteria.",
  },
];

const WHEN_SUITEQL = [
  {
    icon: Code2,
    title: "WIP reports and complex financial schedules",
    description:
      "A WIP schedule joins the project record, budget records, all posted transaction types, and invoice history simultaneously. The join depth and cross-table calculation requirements exceed what saved searches support.",
  },
  {
    icon: BarChart2,
    title: "Production variance and cost code analysis",
    description:
      "Multi-category, multi-project analysis comparing budget to actual across cost codes requires joining transaction lines to budget lines at a level of granularity that saved searches cannot handle cleanly.",
  },
  {
    icon: FileText,
    title: "When saved search join limits are reached",
    description:
      "NetSuite enforces limits on the number of record joins in a saved search. When a report requires more joins than the platform allows, a SuiteQL query is the correct solution.",
  },
];

const FAQ = [
  {
    question: "What is the difference between a saved search and a SuiteQL query in NetSuite?",
    answer:
      "A saved search is a UI-based reporting tool that requires no code. It supports custom filters, formula columns, summary rows, and joins across related record types. SuiteQL is a SQL-like query language that offers full join flexibility and complex calculations but requires a developer to write and maintain. Saved searches cover the large majority of custom reporting needs; SuiteQL is the right tool when join depth limits are reached or when complex multi-table calculations are required.",
  },
  {
    question: "Can a saved search be used as a dashboard portlet in NetSuite?",
    answer:
      "Yes. Saved searches can be embedded as portlets on NetSuite role-based dashboards. This allows project managers, finance teams, and executives to see live operational data without navigating to the report each time. Portlets update in real time as new transactions post.",
  },
  {
    question: "When does a NetSuite report require SuiteQL instead of a saved search?",
    answer:
      "SuiteQL is required when a report needs joins across more tables than the saved search join depth limit allows. WIP reports, production variance schedules, and complex job cost analyses that join project records, transaction lines, budget records, and invoice history simultaneously typically require SuiteQL. In practice, most operational reports work with saved searches; SuiteQL becomes necessary for complex financial or project accounting reports.",
  },
  {
    question: "What are NetSuite standard reports and when should I use them?",
    answer:
      "Standard reports are pre-built financial statements included in all NetSuite editions: Trial Balance, Income Statement, Balance Sheet, AR Aging, AP Aging, and similar. They require no configuration and produce standard accounting output. They are appropriate for standard financial statements but offer limited customization. For any operational, industry-specific, or custom reporting requirement, saved searches or SuiteQL are the correct tools.",
  },
  {
    question: "Can SuiteQL queries be embedded in a NetSuite dashboard?",
    answer:
      "SuiteQL results can be surfaced in a dashboard through a custom Suitelet or a saved search wrapper that calls the query. They cannot be embedded directly as dashboard portlets the way a saved search can. For most operational dashboards, saved searches remain the simpler and more maintainable approach.",
  },
  {
    question: "What kind of custom reporting does SuitePacific build for construction companies?",
    answer:
      "SuitePacific builds WIP schedules, job cost dashboards, budget vs. actual reports by cost code, and project manager portlets for construction companies already live on NetSuite. This includes both saved search-based reports for day-to-day operational visibility and SuiteQL-based reports for complex financial calculations like WIP, earned value, and over/under billing. Plans start at $799 per month.",
  },
];

export const metadata: Metadata = {
  title: "NetSuite Saved Searches vs. SuiteQL vs. Standard Reports",
  description:
    "Understand when to use saved searches, SuiteQL, or standard reports in NetSuite. Guide for construction companies building custom reporting and dashboards.",
  alternates: { canonical: "/netsuite-saved-searches-vs-suiteql-vs-reports" },
  openGraph: {
    title: "NetSuite Saved Searches vs. SuiteQL vs. Standard Reports",
    description:
      "NetSuite offers three reporting approaches. Saved searches handle most custom reporting. SuiteQL handles complex multi-table joins. Standard reports cover standard financials only. Know which approach your account needs.",
    url: `${SITE_URL}/netsuite-saved-searches-vs-suiteql-vs-reports`,
    type: "website",
    images: [{ url: `${SITE_URL}/og-default.png`, width: 1200, height: 630 }],
  },
};

export default function SavedSearchesVsSuiteqlPage() {
  return (
    <main className="pt-32 pb-24 sm:pt-40 sm:pb-32">
      <BreadcrumbJsonLd
        items={[
          { name: "Home", url: SITE_URL },
          { name: "NetSuite Saved Searches vs. SuiteQL vs. Reports", url: `${SITE_URL}/netsuite-saved-searches-vs-suiteql-vs-reports` },
        ]}
      />
      <FaqJsonLd items={FAQ} />
      <ServiceJsonLd
        name="NetSuite Custom Reporting: Saved Searches and SuiteQL"
        description="Custom reporting builds for construction companies on NetSuite: saved search dashboards, SuiteQL-based WIP and financial reports, and portlet deployment for project managers and finance teams."
        url={`${SITE_URL}/netsuite-saved-searches-vs-suiteql-vs-reports`}
        serviceType="NetSuite Reporting and Dashboards"
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
          eyebrow="NetSuite Reporting"
          title="NetSuite Saved Searches vs. SuiteQL vs. Reports: Which Approach Do You Need?"
          subtitle="A practical decision guide for live NetSuite accounts choosing the right tool for custom reporting and dashboards."
          align="left"
        />

        <div className="mt-6 rounded-2xl border border-brand-100 bg-white p-5 shadow-soft">
          <p className="text-sm text-brand-600 mb-3">Building custom reports in NetSuite and hitting limits? Tell us what your account needs to show.</p>
          <LeadFormLight />
        </div>
        <p className="mt-3 text-xs text-brand-400">NetSuite-Certified &middot; Post-go-live specialist &middot; Sandbox-first development &middot; Month-to-month</p>
        <p className="mt-3 text-xs text-brand-300"><time dateTime="2026-10">Published October 2026</time></p>

        <div className="mt-6 rounded-2xl border border-brand-100 bg-brand-50/40 p-5">
          <p className="text-xs font-semibold uppercase tracking-wide text-accent mb-2">Quick answer</p>
          <p className="text-sm text-brand-700 leading-relaxed">
            NetSuite provides three distinct reporting approaches, each suited to different needs.
            Standard reports are pre-built financial statements such as Trial Balance, Income Statement,
            Balance Sheet, AR Aging, and AP Aging. They require no configuration but offer limited
            customization and no custom columns beyond standard filters. Saved searches are the primary
            tool for custom operational reporting in NetSuite. They require no code, support formula
            columns, filters, joins across related record types, and can be embedded as dashboard
            portlets. They cover the large majority of custom reporting requirements in live accounts.
            SuiteQL is a SQL-like query language that provides full join flexibility and complex
            calculations across multiple tables. It is required when saved search join depth limits
            are reached, such as when a WIP report must join projects, transactions, budgets, and
            invoices simultaneously. SuiteQL requires a developer to write and maintain. Most
            construction companies need saved searches for day-to-day dashboards and SuiteQL for
            complex financial reports.
          </p>
        </div>

        {/* Comparison table */}
        <div className="mt-14">
          <h2 className="text-lg font-semibold text-brand-900 mb-2">How do the three approaches compare?</h2>
          <p className="text-sm text-brand-400 mb-5">
            The right tool depends on the complexity of joins required, whether a developer is available to maintain code, and how the output will be consumed.
          </p>
          <div className="overflow-x-auto rounded-2xl border border-brand-100">
            <table className="w-full text-sm min-w-[580px]">
              <thead>
                <tr className="border-b border-brand-100 bg-brand-50/50">
                  <th className="text-left p-4 font-semibold text-brand-900">Capability</th>
                  <th className="text-left p-4 font-semibold text-brand-900">Standard Reports</th>
                  <th className="text-left p-4 font-semibold text-brand-900">Saved Search</th>
                  <th className="text-left p-4 font-semibold text-brand-900">SuiteQL</th>
                </tr>
              </thead>
              <tbody>
                {COMPARISON_ROWS.map((row, i) => (
                  <tr key={row.capability} className={i < COMPARISON_ROWS.length - 1 ? "border-b border-brand-100" : ""}>
                    <td className="p-4 font-medium text-brand-700 align-top whitespace-nowrap">{row.capability}</td>
                    <td className="p-4 text-brand-400 align-top text-[13px]">{row.standard}</td>
                    <td className="p-4 text-brand-400 align-top text-[13px]">{row.savedSearch}</td>
                    <td className="p-4 text-brand-400 align-top text-[13px]">{row.suiteql}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* When to use saved search */}
        <div className="mt-14">
          <h2 className="text-lg font-semibold text-brand-900 mb-2">When should you use a saved search?</h2>
          <p className="text-sm text-brand-400 mb-6">
            Saved searches handle the vast majority of custom reporting needs in a live NetSuite account without any code. They are the right starting point for nearly every operational report.
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            {WHEN_SAVED_SEARCH.map((item) => (
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

        {/* When to use SuiteQL */}
        <div className="mt-14">
          <h2 className="text-lg font-semibold text-brand-900 mb-2">When does a report require SuiteQL?</h2>
          <p className="text-sm text-brand-400 mb-6">
            SuiteQL becomes necessary when saved search join depth limits are hit or when the report requires calculations that span multiple unrelated tables. It requires developer involvement to write and maintain.
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            {WHEN_SUITEQL.map((item) => (
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

        {/* When to use standard reports */}
        <div className="mt-14 rounded-2xl border border-brand-100 bg-brand-50/30 p-5 sm:p-6">
          <h2 className="text-base font-semibold text-brand-900 mb-3">When are standard reports the right choice?</h2>
          <p className="text-sm text-brand-400 mb-3">
            Standard reports are appropriate for standard financial statements only: Trial Balance, Income Statement, Balance Sheet, AR Aging, AP Aging, and similar pre-built outputs. They require no setup and produce reliable standard output for month-end accounting review.
          </p>
          <p className="text-sm text-brand-400">
            They are not useful for operational reporting, industry-specific analysis, or any report that requires joining data across record types not covered by the pre-built template. For those needs, saved searches or SuiteQL are the correct tools.
          </p>
        </div>

        {/* Related reading */}
        <div className="mt-10 rounded-2xl border border-brand-100 bg-brand-50/30 p-5 sm:p-6">
          <p className="text-sm font-semibold text-brand-900 mb-3">Related reading</p>
          <ul className="space-y-2.5">
            <li className="text-sm text-brand-400">
              <Link href="/netsuite-wip-report" className="text-accent hover:underline">
                NetSuite WIP report for construction
              </Link>{" "}
              covers the full build for a WIP schedule using saved searches and SuiteQL.
            </li>
            <li className="text-sm text-brand-400">
              <Link href="/netsuite-suitescript-development" className="text-accent hover:underline">
                NetSuite SuiteScript development
              </Link>{" "}
              covers the broader SuiteScript and SuiteQL development work SuitePacific does.
            </li>
            <li className="text-sm text-brand-400">
              <Link href="/industries/construction" className="text-accent hover:underline">
                NetSuite support for construction companies
              </Link>{" "}
              covers the full construction practice including reporting, billing, and job costing.
            </li>
          </ul>
        </div>

        <ServiceFaqSection items={FAQ} />

        <div className="mt-10 rounded-2xl border border-brand-100 bg-white p-5 shadow-soft">
          <p className="text-sm font-semibold text-brand-900 mb-1">Need a custom report built in NetSuite?</p>
          <p className="text-sm text-brand-400 mb-4">
            Tell us what data the report needs to show and how your account currently tracks costs. We will assess whether a saved search or SuiteQL query is the right approach and how long the build takes.
          </p>
          <LeadFormLight />
        </div>
      </div>
    </main>
  );
}

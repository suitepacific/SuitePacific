import type { Metadata } from "next";
import Link from "next/link";
import { CheckCircle2, XCircle, BarChart2, Search, Code2 } from "lucide-react";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Card } from "@/components/ui/Card";
import { IconBadge } from "@/components/ui/IconBadge";
import { BreadcrumbJsonLd, FaqJsonLd, ServiceJsonLd, OrganizationJsonLd } from "@/components/seo/JsonLd";
import { ServiceFaqSection } from "@/components/ui/ServiceFaqSection";
import { LeadFormLight } from "@/components/sections/LeadFormLight";
import { SITE_URL } from "@/lib/content";

const COMPARISON_ROWS = [
  { capability: "Setup method", savedsearch: "UI-based, no code", workbook: "UI-based, no code", suiteql: "Developer required (script)" },
  { capability: "Pivot tables", savedsearch: "No", workbook: "Yes", suiteql: "No (output only)" },
  { capability: "Charts", savedsearch: "Limited (portlet charts)", workbook: "Yes (built-in charting)", suiteql: "No" },
  { capability: "Dashboard embedding", savedsearch: "Yes (portlets)", workbook: "Limited", suiteql: "Via Suitelet only" },
  { capability: "Workflow conditions", savedsearch: "Yes", workbook: "No", suiteql: "No" },
  { capability: "Edition availability", savedsearch: "All editions", workbook: "SuiteAnalytics module required", suiteql: "All editions (via script)" },
  { capability: "Real-time updates", savedsearch: "Yes", workbook: "Yes", suiteql: "Yes (when script runs)" },
  { capability: "Developer required", savedsearch: "No", workbook: "No", suiteql: "Yes" },
  { capability: "Complex joins", savedsearch: "Limited", workbook: "Better than saved search", suiteql: "Full SQL-style joins" },
  { capability: "Best for", savedsearch: "Operational dashboards, workflow triggers", workbook: "Finance analysis, trend exploration", suiteql: "Complex multi-table reporting" },
];

const SAVED_SEARCH_USES = [
  {
    icon: Search,
    title: "Operational dashboards and portlets",
    description:
      "Saved searches can be embedded directly in NetSuite dashboard portlets, giving users a live view of open tasks, pending approvals, overdue items, and key metrics on their homepage. This embedding is not available with Workbook.",
  },
  {
    icon: Search,
    title: "Workflow conditions and alerts",
    description:
      "SuiteFlow workflows use saved searches as conditions: trigger a workflow when a saved search finds a matching record, or send an alert when a saved search returns results. Workbook and SuiteQL cannot be used as workflow conditions.",
  },
  {
    icon: Search,
    title: "Formula columns and summary groupings",
    description:
      "Saved searches support formula fields using NetSuite&apos;s formula syntax, allowing calculated columns, conditional logic, and summary groupings. For most operational reporting, this covers the full requirement without Workbook.",
  },
  {
    icon: Search,
    title: "Scheduled alerts and reminders",
    description:
      "NetSuite can send scheduled email digests based on saved search results. This is a native feature available on all editions: send a daily summary of open POs, overdue invoices, or pending approvals to a distribution list.",
  },
];

const WORKBOOK_USES = [
  {
    icon: BarChart2,
    title: "Pivot tables for finance analysis",
    description:
      "SuiteAnalytics Workbook supports pivot tables for multi-dimensional analysis: revenue by month by category, expenses by department and period, or vendor spend by project. These layouts are not possible in saved searches.",
  },
  {
    icon: BarChart2,
    title: "Trend exploration and ad-hoc analysis",
    description:
      "Workbook&apos;s interface is designed for exploratory analysis. Finance teams can drag fields, rearrange dimensions, and explore trends without rebuilding a saved search each time the question changes.",
  },
  {
    icon: BarChart2,
    title: "Built-in charting and visual outputs",
    description:
      "Workbook includes chart types that saved searches cannot produce as standalone outputs: bar charts, line charts, and combination views that can be shared with management or exported alongside data tables.",
  },
];

const SUITEQL_USES = [
  {
    icon: Code2,
    title: "Complex multi-table joins",
    description:
      "SuiteQL can join across record types that saved searches cannot directly connect, using SQL-style syntax. This is the only option for reports that require three or more record types joined with specific conditions.",
  },
  {
    icon: Code2,
    title: "Custom report pages (via Suitelet)",
    description:
      "A Suitelet can execute a SuiteQL query and render the results as a custom page inside NetSuite with interactive filters, conditional formatting, and export options that saved searches and Workbook cannot provide.",
  },
];

const FAQ = [
  {
    question: "Does every NetSuite account include SuiteAnalytics Workbook?",
    answer:
      "No. SuiteAnalytics Workbook is part of the SuiteAnalytics module, which must be included in the NetSuite subscription. Saved searches are available on all editions without any additional module. Before building reports in Workbook, verify with your NetSuite account manager that the SuiteAnalytics module is included in your subscription.",
  },
  {
    question: "Can a saved search be converted to a SuiteAnalytics Workbook?",
    answer:
      "Not directly. Saved searches and Workbooks are built in separate tools with different interfaces and data models. A saved search cannot be imported into Workbook, and a Workbook cannot be converted to a saved search. The two serve different use cases and are built separately.",
  },
  {
    question: "Which is better for dashboard portlets: saved searches or Workbook?",
    answer:
      "Saved searches are better for dashboard portlets. NetSuite&apos;s native dashboard portlets use saved searches as their data source. Workbook outputs can be viewed in the Workbook interface but cannot be embedded as live portlets in a NetSuite dashboard the same way saved searches can.",
  },
  {
    question: "Can SuiteQL be run without a developer?",
    answer:
      "SuiteQL must be run through a SuiteScript (a Scheduled script, Suitelet, or Restlet) because there is no UI in NetSuite for running SuiteQL queries directly. This means SuiteQL always requires developer involvement to build and deploy. Saved searches and Workbook can both be built entirely without code.",
  },
  {
    question: "When should I use SuiteQL instead of a saved search?",
    answer:
      "Use SuiteQL when the report requires joins that saved searches cannot support, such as connecting three or more record types with complex conditions, or when the calculation logic is too complex for saved search formula syntax. For most operational reports and dashboards, saved searches are sufficient. SuiteQL is the right tool when a saved search reaches its structural limits.",
  },
  {
    question: "Can saved searches handle formula calculations?",
    answer:
      "Yes. NetSuite saved searches support formula fields using NetSuite&apos;s formula syntax, which is based on Oracle SQL functions. You can write conditional expressions, math operations, date calculations, and string manipulations directly in saved search columns. For most financial and operational reporting, this covers the full requirement without needing SuiteQL or Workbook.",
  },
];

export const metadata: Metadata = {
  title: "SuiteAnalytics Workbook vs. Saved Searches in NetSuite",
  description:
    "Saved searches power dashboards and workflow triggers. SuiteAnalytics Workbook suits finance analysis and pivot tables. A guide for live NetSuite accounts.",
  alternates: { canonical: "/netsuite-suiteanalytics-vs-saved-searches" },
  openGraph: {
    title: "SuiteAnalytics Workbook vs. Saved Searches in NetSuite",
    description:
      "Saved searches power dashboards and workflow triggers. SuiteAnalytics Workbook suits finance analysis and pivot tables. A guide for live NetSuite accounts.",
    url: `${SITE_URL}/netsuite-suiteanalytics-vs-saved-searches`,
    type: "website",
    images: [{ url: `${SITE_URL}/og-default.png`, width: 1200, height: 630 }],
  },
};

export default function SuiteAnalyticsVsSavedSearchesPage() {
  return (
    <main className="pt-32 pb-24 sm:pt-40 sm:pb-32">
      <BreadcrumbJsonLd
        items={[
          { name: "Home", url: SITE_URL },
          { name: "SuiteAnalytics Workbook vs. Saved Searches", url: `${SITE_URL}/netsuite-suiteanalytics-vs-saved-searches` },
        ]}
      />
      <FaqJsonLd items={FAQ} />
      <ServiceJsonLd
        name="NetSuite Reporting and Analytics Development"
        description="Saved search builds, SuiteAnalytics Workbook reports, and SuiteQL queries for live NetSuite accounts: operational dashboards, finance analysis, and custom reporting."
        url={`${SITE_URL}/netsuite-suiteanalytics-vs-saved-searches`}
        serviceType="NetSuite Reporting"
        offers={[
          { name: "Care", price: 799, description: "10 hrs/month: saved search builds, Workbook reports, and dashboard configuration. Month-to-month after 3-month minimum." },
          { name: "Care Plus", price: 1499, description: "20 hrs/month: reporting builds, SuiteQL development, and ongoing administration. Month-to-month." },
          { name: "Care Pro", price: 2499, description: "35 hrs/month: full reporting development including SuiteQL and custom Suitelet reports. Month-to-month." },
        ]}
      />
      <OrganizationJsonLd />

      <div className="mx-auto max-w-3xl px-6 lg:px-8">
        <SectionHeading
          as="h1"
          eyebrow="NetSuite Reporting"
          title="SuiteAnalytics Workbook vs. Saved Searches: Which to Use for NetSuite Reporting"
          subtitle="A guide for live NetSuite accounts choosing between saved searches, SuiteAnalytics Workbook, and SuiteQL for operational dashboards, finance analysis, and complex reporting."
          align="left"
        />

        <div className="mt-6 rounded-2xl border border-brand-100 bg-white p-5 shadow-soft">
          <p className="text-sm text-brand-600 mb-3">Building custom NetSuite reports and not sure which approach fits? Tell us what your account needs to show.</p>
          <LeadFormLight />
        </div>
        <p className="mt-3 text-xs text-brand-400">NetSuite-Certified · Post-go-live specialist · Sandbox-first development · Month-to-month</p>
        <p className="mt-2 text-xs text-brand-300"><time dateTime="2026-10">Published October 2026</time></p>

        <div className="mt-6 rounded-2xl border border-brand-100 bg-brand-50/40 p-5">
          <p className="text-xs font-semibold uppercase tracking-wide text-accent mb-2">Quick answer</p>
          <p className="text-sm text-brand-700 leading-relaxed">
            Saved searches and SuiteAnalytics Workbook are both built into NetSuite and both produce reports, but they serve different use cases.
            Saved searches are available on all NetSuite editions. They run in real time against live data, support formula columns and summary
            groupings, can be embedded in dashboard portlets, and can trigger workflow conditions and alerts. For operational reporting and
            anything embedded in the platform, saved searches are the right tool. SuiteAnalytics Workbook is a more modern interface with
            pivot tables, charting, and exploratory data analysis. It is better suited for ad-hoc analysis and trend exploration but is not
            available on every NetSuite edition and cannot be embedded in workflow conditions or used as dashboard portlets the way saved
            searches can. SuiteQL is a third option for the most complex joins, but it requires developer time because it runs only through
            a script. Most live NetSuite accounts rely on saved searches for operations and use Workbook for finance team analysis when
            their edition includes it.
          </p>
        </div>

        {/* Three-way comparison table */}
        <div className="mt-14">
          <h2 className="text-lg font-semibold text-brand-900 mb-2">Saved searches vs. Workbook vs. SuiteQL: capability comparison</h2>
          <p className="text-sm text-brand-400 mb-5">
            The table below maps capabilities across all three reporting tools. Most accounts use saved searches for daily operations
            and Workbook for finance analysis when the module is available.
          </p>
          <div className="overflow-x-auto rounded-2xl border border-brand-100">
            <table className="w-full text-sm min-w-[580px]">
              <thead>
                <tr className="border-b border-brand-100 bg-brand-50/50">
                  <th className="text-left p-4 font-semibold text-brand-900">Capability</th>
                  <th className="text-left p-4 font-semibold text-brand-900">Saved search</th>
                  <th className="text-left p-4 font-semibold text-brand-900">Workbook</th>
                  <th className="text-left p-4 font-semibold text-brand-900">SuiteQL</th>
                </tr>
              </thead>
              <tbody>
                {COMPARISON_ROWS.map((row, i) => (
                  <tr key={row.capability} className={i < COMPARISON_ROWS.length - 1 ? "border-b border-brand-100" : ""}>
                    <td className="p-4 font-medium text-brand-700 align-top">{row.capability}</td>
                    <td className="p-4 text-brand-400 align-top text-[13px]">{row.savedsearch}</td>
                    <td className="p-4 text-brand-400 align-top text-[13px]">{row.workbook}</td>
                    <td className="p-4 text-brand-400 align-top text-[13px]">{row.suiteql}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* When to use saved searches */}
        <div className="mt-14">
          <h2 className="text-lg font-semibold text-brand-900 mb-2">When are saved searches the right reporting tool?</h2>
          <p className="text-sm text-brand-400 mb-6">
            Saved searches are the default reporting tool for live NetSuite accounts. They are available on all editions,
            embed in dashboards, and connect to the workflow engine in ways that Workbook does not.
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            {SAVED_SEARCH_USES.map((item) => (
              <Card key={item.title} className="p-5 flex items-start gap-4">
                <IconBadge icon={item.icon} />
                <div>
                  <h3 className="font-semibold text-brand-900 text-sm">{item.title}</h3>
                  <p className="mt-1.5 text-sm text-brand-400">{item.description}</p>
                </div>
              </Card>
            ))}
          </div>
          <div className="mt-5 rounded-2xl border border-brand-100 bg-brand-50/30 p-5">
            <p className="text-sm font-semibold text-brand-900 mb-2">What saved searches cannot do</p>
            <ul className="space-y-1.5 text-sm text-brand-400">
              <li className="flex items-start gap-2"><XCircle className="w-4 h-4 text-red-400 mt-0.5 shrink-0" /> Pivot table layout (row by column dimension analysis)</li>
              <li className="flex items-start gap-2"><XCircle className="w-4 h-4 text-red-400 mt-0.5 shrink-0" /> Built-in charting beyond basic portlet charts</li>
              <li className="flex items-start gap-2"><XCircle className="w-4 h-4 text-red-400 mt-0.5 shrink-0" /> Ad-hoc drag-and-drop field rearrangement</li>
              <li className="flex items-start gap-2"><XCircle className="w-4 h-4 text-red-400 mt-0.5 shrink-0" /> Complex joins across more than two or three record types</li>
            </ul>
          </div>
        </div>

        {/* When to use Workbook */}
        <div className="mt-14">
          <h2 className="text-lg font-semibold text-brand-900 mb-2">When does SuiteAnalytics Workbook add value?</h2>
          <p className="text-sm text-brand-400 mb-6">
            Workbook is best for finance team analysis and management reporting where pivot tables, charting, and exploratory
            views are needed. Verify your edition includes the SuiteAnalytics module before building Workbooks.
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
            {WORKBOOK_USES.map((item) => (
              <Card key={item.title} className="p-5 flex flex-col gap-3">
                <IconBadge icon={item.icon} />
                <h3 className="font-semibold text-brand-900 text-sm">{item.title}</h3>
                <p className="text-sm text-brand-400">{item.description}</p>
              </Card>
            ))}
          </div>
        </div>

        {/* When to use SuiteQL */}
        <div className="mt-14">
          <h2 className="text-lg font-semibold text-brand-900 mb-2">When does a reporting requirement need SuiteQL?</h2>
          <p className="text-sm text-brand-400 mb-6">
            SuiteQL is the reporting layer of last resort: for requirements that saved searches and Workbook cannot satisfy.
            It always requires developer time.
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            {SUITEQL_USES.map((item) => (
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

        {/* Decision guide */}
        <div className="mt-14 rounded-2xl border border-brand-100 bg-brand-50/30 p-5 sm:p-6">
          <h2 className="text-base font-semibold text-brand-900 mb-3">Choosing the right tool for your NetSuite report</h2>
          <ul className="space-y-2.5">
            <li className="text-sm text-brand-400">
              <span className="font-medium text-brand-700">Dashboard portlet for daily operations:</span>{" "}
              Saved search. Embeds directly as a portlet; updates in real time as transactions post.
            </li>
            <li className="text-sm text-brand-400">
              <span className="font-medium text-brand-700">Workflow condition or scheduled alert:</span>{" "}
              Saved search. Workbook and SuiteQL cannot be used as workflow conditions.
            </li>
            <li className="text-sm text-brand-400">
              <span className="font-medium text-brand-700">Finance team analysis with pivot tables:</span>{" "}
              Workbook (if the SuiteAnalytics module is included in your edition).
            </li>
            <li className="text-sm text-brand-400">
              <span className="font-medium text-brand-700">Complex join across three or more record types:</span>{" "}
              SuiteQL, built by a developer into a Suitelet or Scheduled script.
            </li>
            <li className="text-sm text-brand-400">
              <span className="font-medium text-brand-700">Export to Excel for management:</span>{" "}
              Either saved search or Workbook; both export to CSV. Workbook exports are easier to format for presentation.
            </li>
          </ul>
        </div>

        {/* Related reading */}
        <div className="mt-10 rounded-2xl border border-brand-100 bg-brand-50/30 p-5 sm:p-6">
          <p className="text-sm font-semibold text-brand-900 mb-3">Related reading</p>
          <ul className="space-y-2.5">
            <li className="text-sm text-brand-400">
              <Link href="/netsuite-saved-searches-dashboards" className="text-accent hover:underline">
                NetSuite saved searches and dashboards
              </Link>{" "}
              covers saved search builds for operational reporting and dashboard portlets.
            </li>
            <li className="text-sm text-brand-400">
              <Link href="/netsuite-suitescript-development" className="text-accent hover:underline">
                NetSuite SuiteScript development
              </Link>{" "}
              covers how SuiteQL is used in custom Suitelet report pages.
            </li>
            <li className="text-sm text-brand-400">
              <Link href="/netsuite-account-optimization" className="text-accent hover:underline">
                NetSuite account optimization
              </Link>{" "}
              covers the broader scope of improving live NetSuite accounts including reporting.
            </li>
          </ul>
        </div>

        <div className="mt-10 rounded-2xl border border-brand-100 bg-white p-5 shadow-soft">
          <p className="text-sm font-semibold text-brand-900 mb-1">Need custom reporting built in your NetSuite account?</p>
          <p className="text-sm text-brand-400 mb-4">
            Tell us what the report needs to show and we will assess whether saved searches, Workbook, or SuiteQL is the right tool.
          </p>
          <LeadFormLight />
        </div>

        <ServiceFaqSection items={FAQ} />

        <div className="mt-10 rounded-2xl border border-brand-100 bg-white p-5 shadow-soft">
          <p className="text-sm font-semibold text-brand-900 mb-1">Ready to build the reporting your NetSuite account needs?</p>
          <p className="text-sm text-brand-400 mb-4">
            Describe the output you need. We will identify the right tool and give you a realistic build scope.
          </p>
          <LeadFormLight />
        </div>
      </div>
    </main>
  );
}

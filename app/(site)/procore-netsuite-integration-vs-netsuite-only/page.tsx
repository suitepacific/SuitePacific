import type { Metadata } from "next";
import Link from "next/link";
import { AlertTriangle, CheckCircle2, Layers, RefreshCw, Wrench, Users } from "lucide-react";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Card } from "@/components/ui/Card";
import { IconBadge } from "@/components/ui/IconBadge";
import { BreadcrumbJsonLd, FaqJsonLd, ServiceJsonLd, OrganizationJsonLd } from "@/components/seo/JsonLd";
import { ServiceFaqSection } from "@/components/ui/ServiceFaqSection";
import { LeadFormLight } from "@/components/sections/LeadFormLight";
import { SITE_URL } from "@/lib/content";

const COMPARISON_TABLE = [
  { factor: "Field team tooling", integrated: "Procore for field: RFIs, submittals, daily reports, photos", nsonly: "NetSuite only; field teams need separate logins or workarounds" },
  { factor: "Project management depth", integrated: "Full Procore PM: scheduling, punch lists, document control", nsonly: "NetSuite Projects module; lighter on field PM features" },
  { factor: "Accounting integration", integrated: "Costs flow from Procore commitments to NetSuite AP", nsonly: "All accounting in one system; no sync required" },
  { factor: "Integration maintenance", integrated: "Ongoing cost when either system updates", nsonly: "None" },
  { factor: "Monthly cost", integrated: "Procore license + NetSuite license + integration tool", nsonly: "NetSuite license only" },
  { factor: "Data entry risk", integrated: "Duplicate entry if sync fails or field bypasses it", nsonly: "Single entry point; no sync gap" },
  { factor: "Construction-specific workflows", integrated: "Procore handles field; NetSuite handles accounting", nsonly: "All in NetSuite with custom SuiteScript if needed" },
  { factor: "Suitable company size", integrated: "Mid to large GC with active field teams", nsonly: "Smaller GC or office-led operations" },
];

const INTEGRATION_PROBLEMS = [
  {
    icon: AlertTriangle,
    title: "Cost code mapping mismatches",
    description:
      "Procore cost codes do not map cleanly to NetSuite project task structure without custom configuration. When the field creates a commitment under a Procore cost code that has no matching NetSuite project task, the sync fails or creates orphaned records.",
  },
  {
    icon: AlertTriangle,
    title: "Change order sync failures",
    description:
      "Change orders approved in Procore may not update the NetSuite project record correctly, or vice versa. The result is contract value and budget discrepancies between the two systems that require manual reconciliation.",
  },
  {
    icon: AlertTriangle,
    title: "Duplicate data entry when sync fails",
    description:
      "When the integration fails or the field team bypasses it, the accounting team re-enters the same data in NetSuite manually. The integration that was supposed to reduce data entry instead creates a secondary data entry burden.",
  },
  {
    icon: AlertTriangle,
    title: "Different project definitions",
    description:
      "Procore and NetSuite define a &quot;project&quot; differently at the data model level. A Procore project does not always correspond one-to-one with a NetSuite project record, especially for accounts with phases, sub-jobs, or multi-entity structures.",
  },
];

const INTEGRATION_TOOLS = [
  {
    icon: Layers,
    title: "Ryvit",
    description: "A purpose-built Procore-NetSuite connector with pre-mapped fields for commitments, change orders, and budget. Most commonly used for this integration; reduces custom development but still requires configuration.",
  },
  {
    icon: RefreshCw,
    title: "Celigo",
    description: "A general-purpose iPaaS platform with Procore and NetSuite connectors. More flexible than Ryvit for non-standard field mappings but requires more configuration work to set up correctly.",
  },
  {
    icon: Wrench,
    title: "Custom SuiteScript Restlet",
    description: "A custom-built integration using NetSuite SuiteScript RESTlets and the Procore API. Most flexible but highest maintenance cost. Appropriate when standard connectors cannot handle the account&apos;s data model.",
  },
];

const FAQ = [
  {
    question: "What does the Procore and NetSuite integration actually sync?",
    answer:
      "The most common integration points are: project setup (Procore project to NetSuite project record), subcontracts and commitments (Procore commitments to NetSuite purchase orders), prime contract and change orders (contract values and approved change orders to NetSuite), project budget (Procore budget to NetSuite project budget), and cost visibility (NetSuite actual costs visible in Procore for the project team). Not all of these points are included in every integration; the scope depends on which tool is used and how it is configured.",
  },
  {
    question: "What integration tools connect Procore to NetSuite?",
    answer:
      "Three options are commonly used: Ryvit (a purpose-built Procore-NetSuite connector with pre-mapped fields), Celigo (a general-purpose iPaaS platform with Procore and NetSuite connectors), and custom SuiteScript Restlets using the Procore API directly. Each has different setup costs, maintenance requirements, and flexibility for non-standard field mappings.",
  },
  {
    question: "What happens when the Procore-NetSuite sync fails?",
    answer:
      "When a sync failure occurs, records exist in Procore but not in NetSuite, or vice versa. The accounting team typically discovers the gap during AP processing or project cost reconciliation. Recovery requires identifying which records failed to sync, manually entering or correcting them in the receiving system, and investigating the root cause in the integration logs. Sync failures are a primary maintenance cost of running a live integration.",
  },
  {
    question: "When does it make sense to run NetSuite without Procore?",
    answer:
      "NetSuite-only makes sense for smaller general contractors where the project manager and accounting team overlap, companies with simpler project structures, firms where the field team is small or does not need dedicated project management tools, and organizations that want to avoid the ongoing integration maintenance cost. NetSuite&apos;s Projects module handles budgets, cost tracking, and billing for many construction companies without requiring Procore.",
  },
  {
    question: "Can SuitePacific help with Procore-NetSuite integration issues?",
    answer:
      "Yes. SuitePacific works on NetSuite-side integration problems for construction companies: cost code mapping configuration, project record structure, purchase order and AP workflow alignment, and custom SuiteScript Restlet development when standard connectors cannot handle the account&apos;s data model. SuitePacific does not maintain the Procore side of the integration.",
  },
  {
    question: "Is running both Procore and NetSuite worth the cost?",
    answer:
      "For mid-to-large general contractors with active field teams managing complex projects with many subcontracts, RFIs, and submittals, having dedicated field software (Procore) alongside a strong accounting system (NetSuite) is often worth the overhead. For smaller GCs or office-led operations, the integration maintenance cost and sync failure risk may outweigh the benefits of having two separate systems.",
  },
];

export const metadata: Metadata = {
  title: "Procore + NetSuite Integration vs. NetSuite-Only Approach",
  description:
    "When to connect Procore to NetSuite, when to run NetSuite alone, and where integration complexity creates more problems than it solves for contractors.",
  alternates: { canonical: "/procore-netsuite-integration-vs-netsuite-only" },
  openGraph: {
    title: "Procore + NetSuite Integration vs. NetSuite-Only",
    description:
      "Understanding when to connect Procore to NetSuite, when to run NetSuite alone, and where integration complexity creates more problems than it solves for construction companies.",
    url: `${SITE_URL}/procore-netsuite-integration-vs-netsuite-only`,
    type: "website",
    images: [{ url: `${SITE_URL}/og-default.png`, width: 1200, height: 630 }],
  },
};

export default function ProcoreVsNetSuiteOnlyPage() {
  return (
    <main className="pt-32 pb-24 sm:pt-40 sm:pb-32">
      <BreadcrumbJsonLd
        items={[
          { name: "Home", url: SITE_URL },
          { name: "Procore + NetSuite Integration vs. NetSuite-Only", url: `${SITE_URL}/procore-netsuite-integration-vs-netsuite-only` },
        ]}
      />
      <FaqJsonLd items={FAQ} />
      <ServiceJsonLd
        name="NetSuite Construction Integration Support"
        description="NetSuite-side support for construction companies running Procore integrations: cost code mapping, project record configuration, purchase order workflow alignment, and custom SuiteScript Restlet development."
        url={`${SITE_URL}/procore-netsuite-integration-vs-netsuite-only`}
        serviceType="NetSuite Construction Support"
        offers={[
          { name: "Care", price: 799, description: "10 hours/month: integration troubleshooting, cost code mapping, project configuration, and ongoing NetSuite support. Month-to-month after 3-month minimum." },
          { name: "Care Plus", price: 1499, description: "20 hours/month: integration development, custom SuiteScript Restlets, and broader construction workflow support. Month-to-month." },
          { name: "Care Pro", price: 2499, description: "35 hours/month: full construction accounting and integration support including SuiteScript development and ongoing account optimization. Month-to-month." },
        ]}
      />
      <OrganizationJsonLd />

      <div className="mx-auto max-w-3xl px-6 lg:px-8">
        <SectionHeading
          as="h1"
          eyebrow="Construction Systems"
          title="Procore and NetSuite Integration vs. NetSuite-Only: Which Approach Is Right for Your Construction Account?"
          subtitle="Understanding when to connect Procore to NetSuite, when to run NetSuite alone, and where integration complexity creates more problems than it solves."
          align="left"
        />

        <div className="mt-6 rounded-2xl border border-brand-100 bg-white p-5 shadow-soft">
          <p className="text-sm text-brand-600 mb-3">Using both Procore and NetSuite and experiencing sync problems? Tell us what your integration needs to do.</p>
          <LeadFormLight />
        </div>
        <p className="mt-3 text-xs text-brand-400">NetSuite-certified · Construction specialists · Direct access · Month-to-month</p>
        <p className="mt-3 text-xs text-brand-300">Published October 2026</p>

        <div className="mt-6 rounded-2xl border border-brand-100 bg-brand-50/40 p-5">
          <p className="text-xs font-semibold uppercase tracking-wide text-accent mb-2">Quick answer</p>
          <p className="text-sm text-brand-700 leading-relaxed">
            Procore and NetSuite serve different functions on a construction project. Procore is the
            field team&apos;s system: RFIs, submittals, daily reports, scheduling, photo documentation,
            and subcontractor management. NetSuite is the accounting system of record: general ledger,
            accounts payable, accounts receivable, payroll, and financial reporting. Integrating them
            allows field data, particularly subcontracts and commitments, to flow into NetSuite without
            double entry. The integration makes sense when field teams actively use Procore daily and
            the project complexity justifies the setup and ongoing maintenance cost. NetSuite-only
            makes sense for smaller general contractors, office-led operations, or companies where
            the integration maintenance cost outweighs the benefit of having two separate systems.
            Common integration problems include cost code mapping mismatches between the two systems,
            change order sync failures, and duplicate data entry when the sync fails or the field
            team bypasses it entirely.
          </p>
        </div>

        {/* What each system handles */}
        <div className="mt-14">
          <h2 className="text-lg font-semibold text-brand-900 mb-5">What does each system handle?</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            <Card className="p-5">
              <h3 className="font-semibold text-brand-900 text-sm mb-3">Procore handles:</h3>
              <ul className="space-y-1.5 text-sm text-brand-400">
                <li>Project management and scheduling</li>
                <li>RFIs and submittals</li>
                <li>Daily reports and field logs</li>
                <li>Photo and document management</li>
                <li>Punch lists</li>
                <li>Subcontractor communication</li>
                <li>Field team collaboration</li>
              </ul>
            </Card>
            <Card className="p-5">
              <h3 className="font-semibold text-brand-900 text-sm mb-3">NetSuite handles:</h3>
              <ul className="space-y-1.5 text-sm text-brand-400">
                <li>General ledger and chart of accounts</li>
                <li>Accounts payable and receivable</li>
                <li>Payroll and expense management</li>
                <li>Financial reporting</li>
                <li>Cash management</li>
                <li>Intercompany transactions</li>
                <li>Revenue recognition</li>
              </ul>
            </Card>
          </div>
        </div>

        {/* Comparison table */}
        <div className="mt-14">
          <h2 className="text-lg font-semibold text-brand-900 mb-2">Procore + NetSuite vs. NetSuite-only: side-by-side comparison</h2>
          <div className="overflow-x-auto rounded-2xl border border-brand-100">
            <table className="w-full text-sm min-w-[520px]">
              <thead>
                <tr className="border-b border-brand-100 bg-brand-50/50">
                  <th className="text-left p-4 font-semibold text-brand-900">Factor</th>
                  <th className="text-left p-4 font-semibold text-brand-900">Procore + NetSuite</th>
                  <th className="text-left p-4 font-semibold text-brand-900">NetSuite-Only</th>
                </tr>
              </thead>
              <tbody>
                {COMPARISON_TABLE.map((row, i) => (
                  <tr key={row.factor} className={i < COMPARISON_TABLE.length - 1 ? "border-b border-brand-100" : ""}>
                    <td className="p-4 font-medium text-brand-700 align-top whitespace-nowrap">{row.factor}</td>
                    <td className="p-4 text-brand-400 align-top text-[13px]">{row.integrated}</td>
                    <td className="p-4 text-brand-400 align-top text-[13px]">{row.nsonly}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Integration tools */}
        <div className="mt-14">
          <h2 className="text-lg font-semibold text-brand-900 mb-2">What tools connect Procore to NetSuite?</h2>
          <p className="text-sm text-brand-400 mb-6">
            Three options are most commonly used, each with different tradeoffs on setup cost, flexibility, and ongoing maintenance.
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
            {INTEGRATION_TOOLS.map((item) => (
              <Card key={item.title} className="p-5 flex flex-col gap-3">
                <IconBadge icon={item.icon} />
                <h3 className="font-semibold text-brand-900 text-sm">{item.title}</h3>
                <p className="text-sm text-brand-400">{item.description}</p>
              </Card>
            ))}
          </div>
        </div>

        {/* Common integration problems */}
        <div className="mt-14">
          <h2 className="text-lg font-semibold text-brand-900 mb-2">What are the most common Procore-NetSuite integration problems?</h2>
          <p className="text-sm text-brand-400 mb-6">
            Most integration failures trace back to data model mismatches between the two systems, or gaps in how the integration handles edge cases in project structure.
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            {INTEGRATION_PROBLEMS.map((item) => (
              <Card key={item.title} className="p-5 flex flex-col gap-3">
                <IconBadge icon={item.icon} />
                <h3 className="font-semibold text-brand-900 text-sm">{item.title}</h3>
                <p className="text-sm text-brand-400">{item.description}</p>
              </Card>
            ))}
          </div>
        </div>

        {/* Related reading */}
        <div className="mt-10 rounded-2xl border border-brand-100 bg-brand-50/30 p-5 sm:p-6">
          <p className="text-sm font-semibold text-brand-900 mb-3">Related reading</p>
          <ul className="space-y-2.5">
            <li className="text-sm text-brand-400">
              <Link href="/industries/construction" className="text-accent hover:underline">
                NetSuite support for construction companies
              </Link>{" "}
              covers the full scope of construction-specific work for live NetSuite accounts.
            </li>
            <li className="text-sm text-brand-400">
              <Link href="/netsuite-suitescript-development" className="text-accent hover:underline">
                NetSuite SuiteScript development
              </Link>{" "}
              explains when custom scripts are needed and what SuiteScript can build.
            </li>
            <li className="text-sm text-brand-400">
              <Link href="/netsuite-job-costing-standard-vs-custom" className="text-accent hover:underline">
                NetSuite job costing: standard vs. custom configuration
              </Link>{" "}
              covers how job cost tracking works in NetSuite and when custom builds are needed.
            </li>
          </ul>
        </div>

        <ServiceFaqSection items={FAQ} />

        <div className="mt-10 rounded-2xl border border-brand-100 bg-white p-5 shadow-soft">
          <p className="text-sm font-semibold text-brand-900 mb-1">Procore-NetSuite sync issues in your construction account?</p>
          <p className="text-sm text-brand-400 mb-4">
            Tell us what the integration is supposed to do and where it is breaking down. We will assess the NetSuite-side configuration and what needs to change.
          </p>
          <LeadFormLight />
        </div>
      </div>
    </main>
  );
}

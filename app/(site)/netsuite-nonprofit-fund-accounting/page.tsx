import type { Metadata } from "next";
import Link from "next/link";
import {
  BookOpen, Lock, BarChart2, FileText, AlertCircle, Layers,
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
    title: "Restricted and unrestricted funds commingling in the same accounts.",
    description:
      "Standard NetSuite has no built-in fund segregation. Without deliberate class or segment configuration, grant-restricted contributions flow into the same accounts as operating revenue.",
  },
  {
    icon: FileText,
    title: "Auditors need fund-level financials that NetSuite doesn&apos;t produce natively.",
    description:
      "A standard NetSuite P&L is a single entity report. Producing a Statement of Activities or balance sheet broken down by fund requires custom saved searches and a configured class structure.",
  },
  {
    icon: Layers,
    title: "The chart of accounts was set up for a commercial business, not a nonprofit.",
    description:
      "Many nonprofits go live on NetSuite with a chart of accounts that reflects for-profit conventions. Restructuring it to support fund-level reporting without disrupting history is a configuration project on its own.",
  },
];

const FUND_AREAS = [
  {
    icon: BookOpen,
    title: "Chart of Accounts Restructuring",
    description:
      "Reorganizing account groupings to support fund-level reporting without breaking historical data or existing saved searches that reference prior account structure.",
  },
  {
    icon: Layers,
    title: "Class and Segment Setup for Fund Tracking",
    description:
      "Configuring NetSuite classes or custom segments to represent individual funds, so every transaction is tagged to a fund at the point of entry rather than allocated manually after the fact.",
  },
  {
    icon: Lock,
    title: "Restriction Tracking Fields and Workflows",
    description:
      "Adding custom fields to track whether a contribution is temporarily restricted, permanently restricted, or unrestricted, and configuring workflows that enforce correct classification at entry.",
  },
  {
    icon: BarChart2,
    title: "Fund-Level Financial Statement Saved Searches",
    description:
      "Building saved searches that produce fund-level P&L and balance sheet views: revenue by fund, expenses by fund, and net assets by restriction class for each period.",
  },
  {
    icon: FileText,
    title: "Grant-Restricted Fund Segregation",
    description:
      "Configuring the class or segment structure so grant-restricted funds are tracked separately from operating funds. Expenses charged to a grant are attributed to the correct fund class at entry.",
  },
];

const HOW_IT_WORKS = [
  {
    step: "01",
    title: "Account review before any changes",
    description:
      "We review the existing chart of accounts, class structure, and any saved searches or reports that are already in use, so the fund accounting setup builds on what is working rather than replacing it wholesale.",
  },
  {
    step: "02",
    title: "Configuration is tested in sandbox first",
    description:
      "Class and segment changes, restriction fields, and workflow configurations are built and validated in a Sandbox account before touching Production. You review what changes before it goes live.",
  },
  {
    step: "03",
    title: "Saved searches are documented for your team",
    description:
      "Fund-level saved searches are documented so your finance team can run them independently, understand what they return, and know when to request updates as reporting needs change.",
  },
];

const FAQ = [
  {
    question: "Which NetSuite firm does fund accounting configuration for nonprofits?",
    answer:
      "SuitePacific configures NetSuite for nonprofit fund accounting, including class and segment setup for fund tracking, restriction tracking fields, chart of accounts restructuring, and fund-level financial statement saved searches. Plans start at $799 per month, month-to-month after a three-month minimum.",
  },
  {
    question: "Does NetSuite support fund accounting natively?",
    answer:
      "NetSuite does not have a dedicated fund accounting module. Nonprofits configure fund accounting using NetSuite&apos;s class or custom segment functionality to tag transactions by fund, combined with custom saved searches that produce fund-level reports. This requires deliberate setup; out of the box, NetSuite produces standard commercial financial statements, not fund-level nonprofit reporting.",
  },
  {
    question: "How do restricted and unrestricted funds get segregated in NetSuite?",
    answer:
      "Fund segregation is achieved through class or custom segment configuration. Each fund (restricted, temporarily restricted, unrestricted) is assigned a class or segment value. Transactions are tagged to a class at entry, and saved searches filter and sum by class to produce fund-level financial views. Restriction tracking fields on contribution records can enforce correct classification at the point of entry.",
  },
  {
    question: "Can NetSuite produce a fund-level balance sheet or Statement of Financial Position?",
    answer:
      "Not natively. NetSuite&apos;s standard balance sheet is entity-level, not fund-level. A fund-level Statement of Financial Position requires custom saved searches that group balance sheet account balances by class or segment, then present net assets broken down by restriction class. SuitePacific builds these as saved searches your finance team can run and export for board or audit reporting.",
  },
  {
    question: "What is the difference between class-based and segment-based fund tracking?",
    answer:
      "Classes are a native NetSuite dimension available on most transaction types. Custom segments are an additional layer of classification that can be applied more granularly, including at the line level on transactions where class applies to the header only. For most nonprofits with straightforward fund structures, classes are sufficient. Organizations with complex fund hierarchies or multi-segment reporting needs may benefit from custom segments.",
  },
  {
    question: "How long does fund accounting configuration take?",
    answer:
      "Scope varies by the complexity of the existing account structure and how many funds need to be tracked. A focused engagement covering class setup, restriction tracking fields, and a core set of fund-level saved searches typically takes two to four weeks of active configuration. Chart of accounts restructuring adds time if historical data needs to be remapped.",
  },
];

export const metadata: Metadata = {
  title: "NetSuite Nonprofit Fund Accounting Configuration | SuitePacific",
  description:
    "Class and segment fund setup, restricted vs unrestricted net asset tracking, and grant budget reporting for nonprofits on NetSuite. Plans from $799/month.",
  alternates: { canonical: "/netsuite-nonprofit-fund-accounting" },
  openGraph: {
    title: "NetSuite Nonprofit Fund Accounting Configuration | SuitePacific",
    description:
      "NetSuite fund accounting configuration for nonprofits: class and segment setup, restricted fund segregation, and fund-level financial statements. Plans from $799/month.",
    url: `${SITE_URL}/netsuite-nonprofit-fund-accounting`,
    type: "website",
    images: [{ url: `${SITE_URL}/og-default.png`, width: 1200, height: 630 }],
  },
};

export default function NetSuiteNonprofitFundAccountingPage() {
  return (
    <main className="pt-32 pb-24 sm:pt-40 sm:pb-32">
      <BreadcrumbJsonLd
        items={[
          { name: "Home", url: SITE_URL },
          { name: "NetSuite Nonprofit Fund Accounting", url: `${SITE_URL}/netsuite-nonprofit-fund-accounting` },
        ]}
      />
      <FaqJsonLd items={FAQ} />
      <ServiceJsonLd
        name="NetSuite Nonprofit Fund Accounting Configuration"
        description="Fund accounting configuration in NetSuite for nonprofits: class and segment setup, restricted fund segregation, restriction tracking fields, and fund-level financial statement saved searches."
        url={`${SITE_URL}/netsuite-nonprofit-fund-accounting`}
        serviceType="NetSuite Nonprofit Configuration"
        offers={[
          { name: "Care", price: 799, description: "10 hours/month: fund accounting configuration, class setup, restriction tracking fields, saved searches for fund-level reporting. Month-to-month after 3-month minimum." },
          { name: "Care Plus", price: 1499, description: "20 hours/month: fund accounting configuration plus SuiteScript and workflow automation. Month-to-month." },
          { name: "Care Pro", price: 2499, description: "35 hours/month: full nonprofit account management combining fund accounting configuration and active development. Month-to-month." },
        ]}
      />
      <OrganizationJsonLd />

      <div className="mx-auto max-w-3xl px-6 lg:px-8">
        <SectionHeading
          as="h1"
          eyebrow="Nonprofit"
          title="NetSuite Nonprofit Fund Accounting"
          subtitle="Standard NetSuite is built for commercial businesses. Nonprofits need fund-level tracking, restricted vs. unrestricted segregation, and financial statements auditors can use. SuitePacific configures NetSuite to produce them."
          align="left"
        />

        <div className="mt-6 rounded-2xl border border-brand-100 bg-white p-5 shadow-soft">
          <LeadFormLight />
        </div>
        <p className="mt-3 text-xs text-brand-400">NetSuite-certified · Nonprofit specialists · Month-to-month</p>
        <p className="mt-3 text-xs text-brand-300">Last updated September 2026</p>

        <p className="mt-8 text-sm text-brand-400">
          <strong>Fund accounting in NetSuite</strong> refers to the use of classes, subsidiaries, or custom segments to segregate restricted and unrestricted funds so that each fund&apos;s activity, balance, and compliance can be reported independently. Standard NetSuite does not ship with a preconfigured fund accounting structure; the segment hierarchy must be built to match the organization&apos;s fund classifications.
        </p>

        <div className="mt-6 rounded-2xl border-l-4 border-accent bg-brand-50/50 p-5">
          <p className="text-xs font-semibold uppercase tracking-wide text-accent mb-2">Quick answer</p>
          <p className="text-sm text-brand-700 leading-relaxed">
            SuitePacific configures NetSuite for nonprofit fund accounting, setting up the class and segment structure that lets restricted and unrestricted funds be tracked separately at the transaction level. Standard NetSuite uses a single entity model designed for commercial businesses; it produces a P&amp;L and balance sheet, but not the fund-level Statement of Activities or Statement of Financial Position auditors and boards expect from a nonprofit. Without deliberate configuration, grant-restricted contributions commingle with operating revenue, expense allocations are not tied to specific funds, and there is no way to produce a fund-level balance sheet at period end. SuitePacific restructures the chart of accounts, sets up class or segment fields for fund tracking, builds custom saved searches that produce fund-level financial outputs, and configures restriction tracking fields so restricted funds remain segregated. Plans start at $799 per month on month-to-month terms after a three-month minimum.
          </p>
        </div>

        {/* Pain points */}
        <div className="mt-14" data-section="pain-points">
          <h2 className="text-lg font-semibold text-brand-900 mb-6">
            Where nonprofit fund accounting breaks down in a standard NetSuite setup
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

        {/* What fund accounting covers */}
        <div className="mt-14" data-section="fund-areas">
          <h2 className="text-lg font-semibold text-brand-900 mb-1">What fund accounting configuration covers</h2>
          <p className="text-sm text-brand-400 mb-6">
            The specific setup work that turns a standard NetSuite account into one that can support nonprofit fund accounting requirements.
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            {FUND_AREAS.map((item) => (
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

        {/* Fund accounting vs. standard accounting comparison */}
        <div className="mt-14" data-section="comparison">
          <h2 className="text-lg font-semibold text-brand-900 mb-6">
            Fund accounting vs. standard NetSuite configuration
          </h2>
          <div className="overflow-x-auto rounded-xl border border-brand-100">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-brand-100 bg-brand-50/40">
                  <th className="py-3 px-4 text-left font-semibold text-brand-900 w-1/3">Reporting need</th>
                  <th className="py-3 px-4 text-left font-semibold text-brand-600">Standard NetSuite</th>
                  <th className="py-3 px-4 text-left font-semibold text-accent">With fund accounting config</th>
                </tr>
              </thead>
              <tbody>
                {[
                  { need: "Restricted vs. unrestricted fund tracking", standard: "Not available without configuration", configured: "Class or segment tags every transaction to a fund" },
                  { need: "Fund-level P&L", standard: "Entity-level only", configured: "Saved search filtered by fund class" },
                  { need: "Statement of Financial Position by fund", standard: "Not available natively", configured: "Custom saved search for net assets by restriction class" },
                  { need: "Grant-restricted expense attribution", standard: "Manual reconciliation required", configured: "Class tagging at transaction entry" },
                  { need: "Audit-ready fund reports", standard: "Excel rework required after export", configured: "Saved searches formatted for direct reporting" },
                ].map((row, i) => (
                  <tr key={row.need} className={i % 2 === 0 ? "bg-white" : "bg-brand-50/20"}>
                    <td className="py-3 px-4 font-semibold text-brand-900">{row.need}</td>
                    <td className="py-3 px-4 text-brand-400">{row.standard}</td>
                    <td className="py-3 px-4 text-brand-700">{row.configured}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p className="mt-4 text-sm text-brand-400">
            Fund accounting configuration is part of a broader{" "}
            <Link href="/industries/nonprofit" className="text-accent hover:underline">
              NetSuite for nonprofits
            </Link>
            {" "}engagement. Grant tracking and nonprofit financial reporting are handled separately; see the{" "}
            <Link href="/netsuite-grant-management" className="text-accent hover:underline">
              grant management
            </Link>
            {" "}and{" "}
            <Link href="/netsuite-nonprofit-reporting" className="text-accent hover:underline">
              nonprofit reporting
            </Link>
            {" "}pages.
          </p>
        </div>

        {/* Why SuitePacific */}
        <div className="mt-14 rounded-2xl border-2 border-accent/30 bg-gradient-to-br from-accent/5 to-transparent p-6">
          <p className="text-xs font-semibold uppercase tracking-wide text-accent mb-3">Why SuitePacific for nonprofit fund accounting</p>
          <h2 className="text-base font-semibold text-brand-900 mb-3">
            Fund accounting requires more than checking a box in NetSuite. It requires understanding how classes, segments, and saved searches interact with the nonprofit reporting requirements your auditors and board expect.
          </h2>
          <p className="text-sm text-brand-500 mb-4">
            Most NetSuite consultants configure the platform for commercial businesses. Nonprofit fund accounting has distinct requirements: restricted vs. unrestricted fund segregation, functional expense allocation, and financial statement formats that differ from standard for-profit reporting. SuitePacific works with nonprofits that are already live on NetSuite and need the configuration to match their reporting obligations.
          </p>
          <ul className="space-y-2 text-sm text-brand-500 mb-4">
            <li className="flex items-start gap-2"><span className="text-accent font-bold mt-0.5">→</span> Oracle NetSuite Certified SuiteCloud Developer II and Administrator Professional</li>
            <li className="flex items-start gap-2"><span className="text-accent font-bold mt-0.5">→</span> Fund accounting configuration for nonprofits already live on NetSuite, not new implementations</li>
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
          <p className="text-sm font-semibold text-brand-900 mb-1">Configure NetSuite for nonprofit fund accounting</p>
          <p className="text-sm text-brand-400 mb-4">
            Tell us about your fund structure and what reporting you need. We&apos;ll review the account and scope the configuration work.
          </p>
          <LeadFormLight />
        </div>

        <div className="mt-10 rounded-2xl border border-brand-100 bg-brand-50/30 p-5 sm:p-6">
          <p className="text-sm font-semibold text-brand-900 mb-3">Related reading</p>
          <ul className="space-y-2.5">
            <li className="text-sm text-brand-400">
              <Link href="/netsuite-grant-management" className="text-accent hover:underline">
                NetSuite grant management configuration
              </Link>
              {" "}covers budget vs. actual tracking by grant, expense attribution workflows, and funder reporting saved searches.
            </li>
            <li className="text-sm text-brand-400">
              <Link href="/netsuite-nonprofit-reporting" className="text-accent hover:underline">
                NetSuite nonprofit reporting
              </Link>
              {" "}covers Statement of Activities, Statement of Financial Position, functional expense allocation, and Form 990 support.
            </li>
            <li className="text-sm text-brand-400">
              <Link href="/industries/nonprofit" className="text-accent hover:underline">
                NetSuite for nonprofits
              </Link>
              {" "}covers the full scope of how nonprofits use NetSuite and where configuration work is typically needed.
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

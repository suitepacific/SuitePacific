import type { Metadata } from "next";
import Link from "next/link";
import {
  FileText, DollarSign, AlertCircle, Clock, BarChart2, Bell, Workflow,
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
    title: "NetSuite has no native grant record.",
    description:
      "Standard NetSuite does not include a grant object. Nonprofits tracking federal, foundation, and state grants end up managing award data in spreadsheets that live outside the system.",
  },
  {
    icon: DollarSign,
    title: "Grant budget vs. actual spend is not visible in NetSuite.",
    description:
      "Without custom setup, there is no way to see how much of a grant award has been spent, what remains, and whether any line item is over or under budget, without exporting data and reconciling manually.",
  },
  {
    icon: Clock,
    title: "Grant periods and funder reporting deadlines are tracked outside the system.",
    description:
      "Grant periods do not align with fiscal years. Close-out reporting for one funder may overlap with mid-period reporting for another. Without configuration, these deadlines live in calendars and email rather than in NetSuite.",
  },
];

const GRANT_AREAS = [
  {
    icon: FileText,
    title: "Grant Record or Class-Based Grant Setup",
    description:
      "Building a custom grant record or configuring a class-based structure so each grant is tracked as a distinct unit with award amount, funder, period dates, and reporting requirements attached.",
  },
  {
    icon: DollarSign,
    title: "Budget vs. Actual Tracking by Grant",
    description:
      "Configuring budget fields on grant records and saved searches that compare budget to actual spend by grant, broken down by expense category and reporting period.",
  },
  {
    icon: Workflow,
    title: "Expense Tagging Workflows",
    description:
      "Workflows that prompt or require grant attribution at the point of transaction entry, so expenses are tagged to the correct grant class or custom segment rather than reconciled after the fact.",
  },
  {
    icon: BarChart2,
    title: "Grant Period Reporting Saved Searches",
    description:
      "Custom saved searches that produce per-grant expense reports aligned to the grant period, not the fiscal year, formatted for funder submission or internal review.",
  },
  {
    icon: Bell,
    title: "Budget Overrun and Deadline Alert Workflows",
    description:
      "Automated alerts when grant spending approaches or exceeds a budget line, and when a grant reporting deadline or period end date is approaching.",
  },
  {
    icon: Clock,
    title: "Partial Release and Carryforward Tracking",
    description:
      "Custom fields and logic to track partial grant releases, conditions on fund use, and carryforward balances when grant periods span fiscal years.",
  },
];

const HOW_IT_WORKS = [
  {
    step: "01",
    title: "Review existing grant tracking and NetSuite account structure",
    description:
      "Before building anything, we review how grants are currently tracked (spreadsheets, classes, project records, or something else) and what the NetSuite account already has configured that can be built on.",
  },
  {
    step: "02",
    title: "Configure grant structure and expense tagging in sandbox",
    description:
      "The grant record or class setup, expense tagging workflows, and budget fields are built in a Sandbox account and tested against real grant scenarios before being deployed to Production.",
  },
  {
    step: "03",
    title: "Train the team on grant entry and reporting",
    description:
      "The finance team gets a walkthrough of how to enter new grants, tag expenses, run budget vs. actual saved searches, and pull period-end reports for funder submission.",
  },
];

const FAQ = [
  {
    question: "Which NetSuite firm does grant management configuration for nonprofits?",
    answer:
      "SuitePacific configures NetSuite for grant management, including custom grant records or class-based grant setup, budget vs. actual tracking, expense attribution workflows, and funder reporting saved searches. Plans start at $799 per month, month-to-month after a three-month minimum.",
  },
  {
    question: "Does NetSuite have a native grant management module?",
    answer:
      "Standard NetSuite does not include a grant management module. Nonprofits configure grant tracking using a combination of custom records or classes, budget fields, and saved searches. Some organizations use NetSuite&apos;s project module as a grant proxy, but this requires configuration to align project tracking with grant reporting requirements.",
  },
  {
    question: "How are grant budgets tracked against actual spend in NetSuite?",
    answer:
      "Grant budgets are tracked using a combination of custom fields on the grant record (or class) and saved searches that sum posted transactions tagged to a grant class within a date range. The saved search compares the budget field value to the sum of actuals, by expense category and period, to produce a budget vs. actual view for each grant.",
  },
  {
    question: "How does expense attribution to grants work in NetSuite?",
    answer:
      "Expenses are attributed to grants through class or custom segment tagging on transaction lines. A workflow can prompt or require a grant class selection when an expense is entered, ensuring that every relevant transaction is tagged at entry. This eliminates after-the-fact reconciliation and makes per-grant expense reports accurate without manual adjustments.",
  },
  {
    question: "Can NetSuite produce funder reports for individual grants?",
    answer:
      "Yes, with custom saved searches. A funder report saved search filters posted transactions by grant class and date range, groups by expense category, and totals amounts for the reporting period. The search can be exported to Excel or PDF for submission. The format varies by funder, so searches are built to match the specific columns and groupings each funder&apos;s report requires.",
  },
  {
    question: "What happens when a grant spans multiple fiscal years in NetSuite?",
    answer:
      "Grant periods do not align with NetSuite fiscal periods. The grant record stores the grant&apos;s own start and end dates, and saved searches use those dates as filters rather than fiscal period filters. Carryforward balances are tracked on the grant record and updated at each fiscal year end when unspent grant amounts roll forward to the next period.",
  },
];

export const metadata: Metadata = {
  title: "NetSuite Grant Management Configuration for Nonprofits | SuitePacific",
  description:
    "Grant records, budget vs actual reporting, and deadline alert workflows for nonprofits on NetSuite. SuiteCloud Developer II certified. Plans from $799/month.",
  alternates: { canonical: "/netsuite-grant-management" },
  openGraph: {
    title: "NetSuite Grant Management Configuration for Nonprofits | SuitePacific",
    description:
      "NetSuite grant management for nonprofits: grant tracking, budget vs. actual by grant, expense attribution, and funder reporting. Plans from $799/month.",
    url: `${SITE_URL}/netsuite-grant-management`,
    type: "website",
    images: [{ url: `${SITE_URL}/og-default.png`, width: 1200, height: 630 }],
  },
};

export default function NetSuiteGrantManagementPage() {
  return (
    <main className="pt-32 pb-24 sm:pt-40 sm:pb-32">
      <BreadcrumbJsonLd
        items={[
          { name: "Home", url: SITE_URL },
          { name: "NetSuite Grant Management", url: `${SITE_URL}/netsuite-grant-management` },
        ]}
      />
      <FaqJsonLd items={FAQ} />
      <ServiceJsonLd
        name="NetSuite Grant Management Configuration"
        description="Grant management configuration in NetSuite for nonprofits: grant record setup, budget vs. actual tracking, expense attribution workflows, grant period reporting, and funder report saved searches."
        url={`${SITE_URL}/netsuite-grant-management`}
        serviceType="NetSuite Nonprofit Configuration"
        offers={[
          { name: "Care", price: 799, description: "10 hours/month: grant tracking configuration, budget vs. actual setup, expense attribution workflows, funder report saved searches. Month-to-month after 3-month minimum." },
          { name: "Care Plus", price: 1499, description: "20 hours/month: grant management configuration plus SuiteScript and workflow automation. Month-to-month." },
          { name: "Care Pro", price: 2499, description: "35 hours/month: full nonprofit account management combining grant management and active development. Month-to-month." },
        ]}
      />
      <OrganizationJsonLd />

      <div className="mx-auto max-w-3xl px-6 lg:px-8">
        <SectionHeading
          as="h1"
          eyebrow="Nonprofit"
          title="NetSuite Grant Management"
          subtitle="NetSuite has no native grant record. Nonprofits managing federal, foundation, and state grants need custom configuration to track award amounts, budget vs. actual spend, and funder reporting periods inside NetSuite."
          align="left"
        />

        <div className="mt-6 rounded-2xl border border-brand-100 bg-white p-5 shadow-soft">
          <p className="text-sm text-brand-600 mb-3">Tell us what your account needs.</p>
          <LeadFormLight />
        </div>
        <p className="mt-3 text-xs text-brand-400">NetSuite-certified · Nonprofit specialists · Month-to-month</p>
        <p className="mt-3 text-xs text-brand-300">Last updated September 2026</p>

        <p className="mt-8 text-sm text-brand-400">
          <strong>Grant management in NetSuite</strong> refers to the configuration that tracks each grant award as a distinct record with its own budget, expenditure activity, reporting periods, and compliance requirements. Standard NetSuite has no native grant record type; grant tracking requires a custom record or subsidiary structure linked to the organization&apos;s fund accounting setup.
        </p>

        <div className="mt-6 rounded-2xl border-l-4 border-accent bg-brand-50/50 p-5">
          <p className="text-xs font-semibold uppercase tracking-wide text-accent mb-2">Quick answer</p>
          <p className="text-sm text-brand-700 leading-relaxed">
            SuitePacific configures NetSuite to track grant awards, budget allocations, and expense attribution for nonprofit organizations that cannot use standard NetSuite class or project tracking alone. NetSuite has no native grant record. Nonprofits managing federal, state, and foundation grants need to see budget vs. actual spend by grant, flag expenses that exceed grant budget lines, and produce per-grant reports for funder reporting periods. Without custom configuration, grant budgets live in spreadsheets outside NetSuite, expense attribution requires manual reconciliation, and period close-out reporting pulls from multiple systems. SuitePacific builds a grant tracking structure using custom records or class-based grant setup, configures expense tagging workflows so transactions are attributed to grants at entry, builds budget vs. actual saved searches by grant, and sets up alert workflows for approaching deadlines and budget overruns. Plans start at $799 per month on month-to-month terms after a three-month minimum.
          </p>
        </div>

        {/* Pain points */}
        <div className="mt-14" data-section="pain-points">
          <h2 className="text-lg font-semibold text-brand-900 mb-6">
            Where grant management breaks down in a standard NetSuite account
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

        {/* What grant management covers */}
        <div className="mt-14" data-section="grant-areas">
          <h2 className="text-lg font-semibold text-brand-900 mb-1">What grant management configuration covers</h2>
          <p className="text-sm text-brand-400 mb-6">
            The specific setup work that brings grant tracking inside NetSuite and eliminates the spreadsheet layer.
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            {GRANT_AREAS.map((item) => (
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
          <h2 className="text-lg font-semibold text-brand-900 mb-6">Grant tracking without and with NetSuite configuration</h2>
          <div className="overflow-x-auto rounded-xl border border-brand-100">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-brand-100 bg-brand-50/40">
                  <th className="py-3 px-4 text-left font-semibold text-brand-900 w-1/3">Capability</th>
                  <th className="py-3 px-4 text-left font-semibold text-brand-600">Without configuration</th>
                  <th className="py-3 px-4 text-left font-semibold text-accent">With SuitePacific configuration</th>
                </tr>
              </thead>
              <tbody>
                {[
                  { cap: "Grant award and funder data", without: "Spreadsheet outside NetSuite", with: "Custom grant record in NetSuite" },
                  { cap: "Budget vs. actual by grant", without: "Manual export and reconciliation", with: "Saved search with real-time actuals" },
                  { cap: "Expense attribution to grants", without: "After-the-fact allocation", with: "Workflow-enforced tagging at entry" },
                  { cap: "Funder report for a single grant", without: "Manual export filtered and reformatted", with: "Saved search scoped to grant and period" },
                  { cap: "Budget overrun alerts", without: "Not available", with: "Automated workflow alert" },
                  { cap: "Grant period close-out", without: "Calendar reminder, manual process", with: "Deadline alert + close-out checklist workflow" },
                ].map((row, i) => (
                  <tr key={row.cap} className={i % 2 === 0 ? "bg-white" : "bg-brand-50/20"}>
                    <td className="py-3 px-4 font-semibold text-brand-900">{row.cap}</td>
                    <td className="py-3 px-4 text-brand-400">{row.without}</td>
                    <td className="py-3 px-4 text-brand-700">{row.with}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p className="mt-4 text-sm text-brand-400">
            Grant management is one piece of a broader{" "}
            <Link href="/industries/nonprofit" className="text-accent hover:underline">
              NetSuite for nonprofits
            </Link>
            {" "}engagement. For fund-level financial statement configuration, see the{" "}
            <Link href="/netsuite-nonprofit-fund-accounting" className="text-accent hover:underline">
              fund accounting
            </Link>
            {" "}page.
          </p>
        </div>

        {/* Why SuitePacific */}
        <div className="mt-14 rounded-2xl border-2 border-accent/30 bg-gradient-to-br from-accent/5 to-transparent p-6">
          <p className="text-xs font-semibold uppercase tracking-wide text-accent mb-3">Why SuitePacific for grant management in NetSuite</p>
          <h2 className="text-base font-semibold text-brand-900 mb-3">
            Grant management in NetSuite is a configuration problem, not a product problem. The platform can track it; it just needs to be set up correctly for how your grants actually work.
          </h2>
          <p className="text-sm text-brand-500 mb-4">
            Federal grants have different reporting requirements than foundation grants. Multi-year grants behave differently from single-period awards. Partial releases and restricted use conditions vary by funder. SuitePacific builds grant management configuration that reflects how your organization&apos;s grants actually work, not a generic grant template that requires workarounds for every funder.
          </p>
          <ul className="space-y-2 text-sm text-brand-500 mb-4">
            <li className="flex items-start gap-2"><span className="text-accent font-bold mt-0.5">→</span> Oracle NetSuite Certified SuiteCloud Developer II and Administrator Professional</li>
            <li className="flex items-start gap-2"><span className="text-accent font-bold mt-0.5">→</span> Grant management configuration for nonprofits already live on NetSuite</li>
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
          <p className="text-sm font-semibold text-brand-900 mb-1">Configure NetSuite for grant management</p>
          <p className="text-sm text-brand-400 mb-4">
            Tell us how many grants you&apos;re managing, what funder reporting looks like, and where the current process breaks down.
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
              {" "}covers class and segment setup for fund tracking, restricted vs. unrestricted segregation, and fund-level financial statement saved searches.
            </li>
            <li className="text-sm text-brand-400">
              <Link href="/netsuite-nonprofit-reporting" className="text-accent hover:underline">
                NetSuite nonprofit reporting
              </Link>
              {" "}covers Statement of Activities, Statement of Financial Position, functional expense allocation, and Form 990 support.
            </li>
            <li className="text-sm text-brand-400">
              <Link href="/netsuite-workflow-automation" className="text-accent hover:underline">
                NetSuite workflow automation
              </Link>
              {" "}covers the workflow engine behind grant expense tagging and deadline alert configurations.
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

import type { Metadata } from "next";
import Link from "next/link";
import {
  Search, LayoutDashboard, BarChart3, Filter, Table, Users,
  AlertCircle, Clock, AlertTriangle,
  ShieldCheck, Award,
} from "lucide-react";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Card } from "@/components/ui/Card";
import { IconBadge } from "@/components/ui/IconBadge";
import { BreadcrumbJsonLd, FaqJsonLd, ServiceJsonLd, OrganizationJsonLd, VideoObjectJsonLd } from "@/components/seo/JsonLd";
import { ServiceFaqSection } from "@/components/ui/ServiceFaqSection";
import { LeadFormLight } from "@/components/sections/LeadFormLight";
import { SuitePacificCallout } from "@/components/sections/SuitePacificCallout";
import { SITE_URL } from "@/lib/content";

const PAIN_POINTS = [
  {
    icon: AlertCircle,
    title: "Every useful report starts with an Excel export.",
    description:
      "The data is in NetSuite but getting it into a usable format requires an export, a pivot table, and ten minutes of cleanup every time it's needed.",
  },
  {
    icon: Clock,
    title: "Reports are always one step behind.",
    description:
      "Manually pulled reports are out of date by the time they reach the person who needs them. The team is making decisions on yesterday's numbers.",
  },
  {
    icon: AlertTriangle,
    title: "Existing saved searches return wrong results.",
    description:
      "Searches built at go-live that nobody has touched since, returning data from old record types, inactive items, or date ranges that no longer make sense.",
  },
];

const REPORTING_TYPES = [
  {
    icon: Search,
    title: "Saved Searches",
    description: "Targeted searches using criteria, formulas, summary types, and available filters to surface exactly what your team needs, updated live from current data.",
  },
  {
    icon: Filter,
    title: "Exception Searches",
    description: "Searches designed to return zero results when everything is working, flagging only the records that need attention: overdue approvals, missing fields, or out-of-tolerance values.",
  },
  {
    icon: LayoutDashboard,
    title: "Role-Based Dashboards",
    description: "Home page dashboards customized per role so each user sees the KPIs and shortcuts relevant to their job without wading through irrelevant data.",
  },
  {
    icon: BarChart3,
    title: "KPI Portlets & Snapshots",
    description: "Real-time key metric widgets displayed on dashboards, pulling from live saved searches and updating without any manual refresh or export.",
  },
  {
    icon: Table,
    title: "Matrix Reports & Summaries",
    description: "Period-comparison reports, subtotaled summaries, and pivot-style breakdowns built natively in NetSuite so the numbers don't have to live in a spreadsheet.",
  },
  {
    icon: Users,
    title: "Published Searches for Teams",
    description: "Searches built once and published to all relevant roles, so the whole team is working from the same definition rather than maintaining individual copies.",
  },
];

const HOW_IT_WORKS = [
  {
    step: "01",
    title: "We start with the business question, not the search builder",
    description:
      "What does your team need to see to do their job? What data are people currently pulling into Excel because it doesn't exist in NetSuite? We define the output before touching a single filter.",
  },
  {
    step: "02",
    title: "We build, test, and publish",
    description:
      "Searches are built against real records in your account, tested for accuracy, and published to the right roles. Dashboard portlets are configured and assigned so users see the right data on login.",
  },
  {
    step: "03",
    title: "We organize and document",
    description:
      "We clean up duplicate searches, document what each search does and who it's for, and build a dashboard setup that reflects how the business actually runs today, not how it ran at go-live.",
  },
];

const WHY_SP = [
  {
    icon: ShieldCheck,
    title: "NetSuite-Certified",
    description:
      "NetSuite SuiteCloud Developer II and Administrator Professional certifications. Verified technical credentials, not self-declared experience.",
  },
  {
    icon: BarChart3,
    title: "Output Focused",
    description:
      "We start from the business question, not the search builder. The result is a search your team actually uses, built around the data they need to make decisions.",
  },
  {
    icon: Users,
    title: "Direct Access",
    description:
      "You communicate directly with the person doing the work. No ticket system, no account manager as an intermediary.",
  },
  {
    icon: Award,
    title: "Enterprise Expertise, SMB Price",
    description:
      "The same depth of NetSuite expertise large companies staff internally, available without the overhead of a full-time hire or an enterprise consulting contract.",
  },
];

const FAQ = [
  {
    question: "What's the difference between a saved search and a report in NetSuite?",
    answer: "Saved searches query records directly with full filter and column control, and can be published as dashboard portlets, scheduled emails, or workflow conditions. Reports use a fixed structure optimized for formatted financial output. For operational monitoring and exception tracking, saved searches are significantly more flexible.",
  },
  {
    question: "Can searches run automatically and send results by email?",
    answer: "Yes. Any saved search can be scheduled to email results on a daily, weekly, or monthly cadence, and configured to send only when results exist. This is how you replace the manual 'pull a report and forward it' process.",
  },
  {
    question: "How many portlet searches are too many?",
    answer: "There is no fixed number, but every portlet search on a role's home page runs every time that dashboard loads. Accounts with many complex portlet searches will have noticeably slow dashboard load times. We audit portlet assignments as part of any optimization engagement.",
  },
  {
    question: "Can saved searches pull data from multiple record types?",
    answer: "Yes, through joins. A transaction search can pull in customer, contact, item, or employee fields from related records on the same row without any export or manual combination. This is one of the main advantages over standard reports, which often cannot surface cross-record data in a single view.",
  },
];

export const metadata: Metadata = {
  title: "NetSuite Saved Searches & Dashboards",
  description:
    "Custom NetSuite saved searches, dashboards, and reports: role-based dashboards, formula fields, KPI portlets, and exception searches that surface what your team needs without exporting to spreadsheets.",
  alternates: { canonical: "/netsuite-saved-searches-dashboards" },
  openGraph: {
    title: "NetSuite Saved Searches & Dashboards",
    description: "Custom NetSuite saved searches, dashboards, and reports: role-based dashboards, formula fields, KPI portlets, and exception searches that surface what your team needs without exporting to spreadsheets.",
    url: "https://suitepacific.com/netsuite-saved-searches-dashboards",
    type: "website",
    images: [{ url: "https://suitepacific.com/og-default.png", width: 1200, height: 630 }],
  },
};

export default function SavedSearchesDashboardsPage() {
  return (
    <main className="pt-32 pb-24 sm:pt-40 sm:pb-32">
      <BreadcrumbJsonLd
        items={[
          { name: "Home", url: SITE_URL },
          { name: "NetSuite Saved Searches & Dashboards", url: `${SITE_URL}/netsuite-saved-searches-dashboards` },
        ]}
      />
      <FaqJsonLd items={FAQ} />
      <ServiceJsonLd
        name="NetSuite Saved Searches & Dashboards"
        description="Custom saved searches and role-based dashboards that surface the data your team needs directly inside NetSuite."
        url={`${SITE_URL}/netsuite-saved-searches-dashboards`}
        serviceType="NetSuite Analytics"
      />
      <OrganizationJsonLd />
      <VideoObjectJsonLd
        name="SuitePacific Introduction: NetSuite Post-Go-Live Support and Consulting"
        description="An introduction to SuitePacific, a boutique NetSuite post-go-live support team providing SuiteScript development, workflow automation, and ongoing account optimization for businesses already live on NetSuite."
        videoId="IQvWN_yZ24A"
        duration="PT18S"
        uploadDate="2026-08-12"
        isShort
      />

      <div className="mx-auto max-w-3xl px-6 lg:px-8">
        <SectionHeading
          as="h1"
          eyebrow="Saved Searches & Dashboards"
          title="NetSuite Saved Searches & Dashboards"
          subtitle="NetSuite has the data your team needs. Poor saved search construction returns duplicates, wrong date ranges understate revenue, and dashboards show stale snapshots. SuitePacific builds accurate searches and role-specific dashboards that actually get used."
          align="left"
        />

        <div className="mt-6 rounded-2xl border border-brand-100 bg-white p-5 shadow-soft">
          <LeadFormLight />
        </div>
        <p className="mt-3 text-xs text-brand-400">NetSuite-certified · Sandbox-first · Direct access, no ticket system · Month-to-month</p>

        <div className="mt-6 rounded-2xl border-l-4 border-accent bg-brand-50/50 p-5">
          <p className="text-xs font-semibold uppercase tracking-wide text-accent mb-2">Quick answer</p>
          <p className="text-sm text-brand-700 leading-relaxed">
            NetSuite saved searches are the primary mechanism for querying and surfacing data
            inside the platform. A saved search defines criteria and result columns, then makes
            those results available as a report, a dashboard portlet, or a data source for other
            saved searches and scripts. Dashboards aggregate portlets driven by saved searches
            or system-generated summaries. The gap between what a default NetSuite account shows
            and what a post-go-live business needs to see is typically closed through saved
            searches: open purchase orders by vendor with aging, fulfillment status by region,
            revenue by product category versus prior period, or workflow queue counts by approver.
            Building accurate saved searches requires understanding NetSuite&apos;s data model and
            its formula engine, which uses SQL-like syntax with NetSuite-specific functions.
            Common problems include searches that return the wrong records, slow under production
            data volume, or break after a version upgrade. SuitePacific builds, optimizes, and
            maintains saved searches and dashboards for post-go-live NetSuite accounts.
          </p>
        </div>

        <p className="mt-6 text-sm text-brand-400">
          Most teams that rely on Excel exports are doing it because the right saved search was
          never built. NetSuite&apos;s search engine supports formula fields, summary types, cross-record
          joins, and live dashboard portlets. The problem is usually that nobody had time to build
          them properly after go-live. SuitePacific builds these searches and dashboards for
          post-go-live NetSuite accounts. See our{" "}
          <Link href="/blog/netsuite-saved-search-tips" className="text-accent hover:underline">
            NetSuite saved search tips
          </Link>{" "}
          for the techniques we use most often.
        </p>

        {/* Pain points */}
        <div className="mt-14" data-section="pain-points">
          <h2 className="text-lg font-semibold text-brand-900 mb-6">Common situations that bring people here</h2>
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

        {/* Reporting types */}
        <div className="mt-14" data-section="reporting-types">
          <h2 className="text-lg font-semibold text-brand-900 mb-1">What we build</h2>
          <p className="text-sm text-brand-400 mb-6">
            From single operational searches to a full dashboard rebuild for every role in the account.
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            {REPORTING_TYPES.map((item) => (
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
          <h2 className="text-lg font-semibold text-brand-900 mb-6">How we approach this work</h2>
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
        <div className="mt-14" data-section="why-suitepacific">
          <h2 className="text-lg font-semibold text-brand-900 mb-6">Why SuitePacific</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            {WHY_SP.map((item) => (
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
          <p className="text-sm font-semibold text-brand-900 mb-3">From the blog</p>
          <ul className="space-y-2.5">
            <li className="text-sm text-brand-400">
              <Link href="/blog/netsuite-saved-search-examples" className="text-accent hover:underline">
                NetSuite saved search examples for finance and operations teams
              </Link>{" "}
              includes ten ready-to-use searches for common reporting needs across AR, AP, inventory, and sales.
            </li>
            <li className="text-sm text-brand-400">
              <Link href="/blog/netsuite-saved-search-tips" className="text-accent hover:underline">
                NetSuite saved search tips
              </Link>{" "}
              covers summary types, dashboard portlets, and scheduling searches as email reports.
            </li>
            <li className="text-sm text-brand-400">
              <Link href="/blog/netsuite-saved-search-formula-examples" className="text-accent hover:underline">
                NetSuite saved search formula examples
              </Link>{" "}
              explains date math, CASE WHEN conditionals, null handling, and number formatting using Oracle SQL formulas.
            </li>
          </ul>
        </div>

        
        {/* Bottom Line */}
        <div className="mt-12 rounded-2xl border-2 border-accent/30 bg-gradient-to-br from-accent/5 to-transparent p-6">
          <p className="text-xs font-semibold uppercase tracking-wide text-accent mb-3">Bottom Line</p>
          <h2 className="text-base font-semibold text-brand-900 mb-3">
            If your team cannot see what is happening in NetSuite, they cannot act on it. SuitePacific builds saved searches and dashboards that surface the right data to the right people.
          </h2>
          <p className="text-sm text-brand-500 mb-4">
            NetSuite has powerful reporting capabilities, but they require proper construction. A saved search with the wrong join type returns duplicates. A formula field with the wrong date range understates revenue. A dashboard that shows last month's data because it was not set to dynamic misleads every person who looks at it. These are not rare edge cases; they are common in accounts where reporting was configured informally.
          </p>
          <p className="text-sm text-brand-500 mb-4">
            SuitePacific builds saved searches, KPI metrics, report snapshots, and role-specific dashboards for post-go-live accounts. Oracle-certified. Plans from $799 per month, month-to-month.
          </p>
          <ul className="space-y-2 text-sm text-brand-500">
            <li className="flex items-start gap-2"><span className="text-accent font-bold mt-0.5">→</span> Proper join types, filters, and formulas: reports that return accurate data</li>
            <li className="flex items-start gap-2"><span className="text-accent font-bold mt-0.5">→</span> Role-specific dashboards: each team sees what is relevant to their function</li>
            <li className="flex items-start gap-2"><span className="text-accent font-bold mt-0.5">→</span> SuiteScript-enhanced searches where native search formulas cannot reach the logic required</li>
          </ul>
        </div>

        <SuitePacificCallout
          heading="SuitePacific: saved searches and KPI dashboard builds"
          linkHref="/netsuite-care"
          linkLabel="View SuitePacific plans"
        />

        <ServiceFaqSection items={FAQ} />
      </div>
    </main>
  );
}

import type { Metadata } from "next";
import Link from "next/link";
import { Search, LayoutDashboard, BarChart3, Filter, Table, Users } from "lucide-react";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Card } from "@/components/ui/Card";
import { IconBadge } from "@/components/ui/IconBadge";
import { Button } from "@/components/ui/Button";
import { BreadcrumbJsonLd } from "@/components/seo/JsonLd";
import { SITE_URL } from "@/lib/content";

export const metadata: Metadata = {
  title: "NetSuite Saved Searches & Dashboards",
  description:
    "Custom NetSuite saved searches, dashboards, and reports: role-based dashboards, formula fields, KPI portlets, and exception searches that surface what your team needs without exporting to spreadsheets.",
  alternates: { canonical: "/netsuite-saved-searches-dashboards" },
};

const REPORTING_TYPES = [
  { icon: Search, title: "Saved Searches", description: "Targeted searches using criteria, formulas, summary types, and available filters to surface exactly what your team needs, updated live from current data." },
  { icon: Filter, title: "Exception Searches", description: "Searches designed to return zero results when everything is working, flagging only the records that need attention: overdue approvals, missing fields, or out-of-tolerance values." },
  { icon: LayoutDashboard, title: "Role-Based Dashboards", description: "Home page dashboards customized per role so each user sees the KPIs and shortcuts relevant to their job without wading through irrelevant data." },
  { icon: BarChart3, title: "KPI Portlets & Snapshots", description: "Real-time key metric widgets displayed on dashboards, pulling from live saved searches and updating without any manual refresh or export." },
  { icon: Table, title: "Matrix Reports & Summaries", description: "Period-comparison reports, subtotaled summaries, and pivot-style breakdowns built natively in NetSuite so the numbers don’t have to live in a spreadsheet." },
  { icon: Users, title: "Published Searches for Teams", description: "Searches built once and published to all relevant roles, so the whole team is working from the same definition rather than maintaining individual copies." },
];

export default function SavedSearchesDashboardsPage() {
  return (
    <main className="pt-32 pb-24 sm:pt-40 sm:pb-32">
      <BreadcrumbJsonLd
        items={[
          { name: "Home", url: SITE_URL },
          { name: "NetSuite Saved Searches & Dashboards", url: `${SITE_URL}/netsuite-saved-searches-dashboards` },
        ]}
      />

      <div className="mx-auto max-w-3xl px-6 lg:px-8">
        <SectionHeading
          as="h1"
          eyebrow="Saved Searches & Dashboards"
          title="NetSuite Saved Searches & Dashboards"
          subtitle="Get the data your team needs out of NetSuite and in front of the right people, without exporting to spreadsheets or waiting on someone to build a custom report."
          align="left"
        />

        <div className="prose prose-blue mt-12 max-w-none prose-headings:font-semibold prose-headings:text-brand-900 prose-p:text-brand-400 prose-a:text-accent prose-a:no-underline hover:prose-a:underline prose-strong:text-brand-900">
          <h2>What saved searches actually replace</h2>
          <p>
            Most teams that rely heavily on Excel exports are doing it because nobody set up the
            right saved search. NetSuite’s saved search engine is genuinely powerful: formula
            fields support SQL-like expressions, summary types provide live subtotals and counts,
            and available filters let a single search serve an entire department’s reporting needs
            without building one search per user or date range. The problem is usually that
            nobody had time to build them properly after go-live.
          </p>
          <p>
            Well-built dashboards take this further, putting the right searches directly on each
            user’s home page as live portlets, so the number they need is visible the moment they
            log in. Read our{" "}
            <Link href="/blog/netsuite-saved-search-tips">NetSuite saved search tips</Link> for a look
            at the techniques we use most often.
          </p>

          <h2>What we build</h2>
        </div>

        <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 gap-5">
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

        <div className="prose prose-blue mt-12 max-w-none prose-headings:font-semibold prose-headings:text-brand-900 prose-p:text-brand-400 prose-a:text-accent prose-a:no-underline hover:prose-a:underline prose-strong:text-brand-900">
          <h2>Who this is for</h2>
          <p>
            Finance teams pulling data into Excel for every close, operations managers who don’t
            know where to look when something breaks, and NetSuite administrators inheriting an
            account full of searches nobody has touched or documented in two years. We build from
            scratch and we clean up existing libraries: removing duplicates, fixing searches that
            return wrong results, and building a dashboard setup that actually reflects how the
            business runs today.
          </p>
        </div>

        <div className="mt-14 pt-10 border-t border-brand-50 text-center">
          <p className="text-brand-900 font-semibold">Still pulling NetSuite data into Excel?</p>
          <p className="mt-2 text-sm text-brand-400">
            Tell us what you need to see and we’ll build it inside NetSuite instead.
          </p>
          <div className="mt-6">
            <Button href="/#contact">Book a Free Consultation</Button>
          </div>
        </div>
      </div>
    </main>
  );
}

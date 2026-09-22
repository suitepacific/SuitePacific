import type { Metadata } from "next";
import Link from "next/link";
import { Gauge, Code2, Workflow, BarChart2, Settings, ShieldCheck, Users, RefreshCcw, Award, Clock, Database, Activity } from "lucide-react";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Card } from "@/components/ui/Card";
import { IconBadge } from "@/components/ui/IconBadge";
import { BreadcrumbJsonLd, FaqJsonLd, ServiceJsonLd, OrganizationJsonLd } from "@/components/seo/JsonLd";
import { ServiceFaqSection } from "@/components/ui/ServiceFaqSection";
import { LeadFormLight } from "@/components/sections/LeadFormLight";
import { SITE_URL } from "@/lib/content";

const CHALLENGES = [
  { icon: Gauge, title: "Dashboard portlet searches running on every page load", description: "Every saved search pinned to a home page portlet executes live each time any user with that role opens their dashboard. A portlet search joining three record types with four formula columns runs dozens or hundreds of times per day. A single poorly optimized portlet search is the most common cause of a NetSuite account that feels slow for everyone simultaneously." },
  { icon: Clock, title: "Scripts that fail without yielding governance", description: "Scheduled and Map/Reduce scripts that hit the governance unit limit without properly checking remaining usage and re-queuing fail in a way that backs up the entire script processing queue. Other scripts scheduled around the same time are delayed too. Accounts that slow down at the same time every day typically have a problematic scheduled script running in that window." },
  { icon: Workflow, title: "Workflows and User Events without entry conditions", description: "A workflow or User Event script with no entry condition fires on every save of its target record type, regardless of which fields changed. An account with ten such customizations on Sales Order runs ten script evaluations and ten workflow checks every time any sales order is saved, including irrelevant edits. The overhead adds up across high-volume transaction types." },
  { icon: Database, title: "Metadata accumulation from unused customizations", description: "Every custom field loads with its record type, even fields that are not on any active form and have not been used since the original implementation consultant left. Accounts more than two years old commonly have hundreds of orphaned custom fields, inactive forms, and unused saved searches still indexed and loading alongside active configuration." },
  { icon: Activity, title: "Saved searches filtering after loading instead of at criteria", description: "A saved search with minimal criteria that loads a broad result set and then applies filtering through formula columns or the available-filter interface is doing far more database work than one with the same conditions set in the criteria tab. Criteria filtering runs at the database level before any rows are returned. Formula filtering runs after, on the full unfiltered row set." },
  { icon: Settings, title: "Scheduled job conflicts and queue starvation", description: "Multiple Scheduled and Map/Reduce scripts scheduled at the same time compete for the same processing queue. Scripts with unbounded iteration that run long displace others scheduled concurrently. The result is a predictable daily slowdown window that tracks the scheduled run time but looks, from the surface, like a platform problem rather than a queue management issue." },
];

const SERVICES = [
  { icon: Gauge, title: "Performance Audit", description: "A structured review of the Script Execution Log, dashboard portlet configuration, active workflow deployments, User Event script deployments, custom field inventory, and saved search performance to identify the specific root causes of slowness in a live account.", href: "/netsuite-account-optimization" },
  { icon: Code2, title: "SuiteScript Development", description: "Rewriting scripts to add governance unit checks and proper re-queue logic for Scheduled and Map/Reduce scripts, restructuring User Event scripts to use context type checks and deployment-level conditions, and replacing record.load loops with nlapiLookupFields or search-based alternatives.", href: "/netsuite-suitescript-development" },
  { icon: Workflow, title: "Workflow Optimization", description: "Adding entry conditions to workflows currently set to trigger on any event, consolidating redundant workflows covering the same record type into fewer executions, and disabling or deactivating inactive workflows still registered against high-volume transaction types.", href: "/netsuite-workflow-automation" },
  { icon: BarChart2, title: "Saved Searches & Dashboards", description: "Auditing dashboard portlet searches and rebuilding the heaviest ones with simplified joins, moved formula logic, and indexed criteria. Building replacement portlets that load in under two seconds and maintaining the same business visibility the original portlets provided.", href: "/netsuite-saved-searches-dashboards" },
  { icon: Activity, title: "Post-Go-Live Support", description: "Ongoing performance monitoring and maintenance for live NetSuite accounts: proactive script governance review, portlet search optimization as search complexity grows, and periodic metadata cleanup on a retainer so performance issues do not accumulate quietly over time.", href: "/netsuite-post-go-live-support" },
  { icon: Users, title: "Administrator Support", description: "Ongoing NetSuite administration covering script deployment management, workflow maintenance, custom field lifecycle management, and period close support for accounts that need consistent platform oversight without an in-house administrator.", href: "/netsuite-administrator-support" },
];

const CUSTOMIZATIONS = [
  { title: "Dashboard portlet search audit and rebuild", description: "Identifying every saved search currently pinned to home page portlets across all active roles, measuring execution time for each, and rebuilding the slowest searches with simplified join structures, criteria-level filtering, and column reduction to bring portlet load times under two seconds." },
  { title: "Script governance pattern implementation", description: "Adding governance unit checks to Scheduled and Map/Reduce scripts that currently iterate without yield logic, implementing re-queue patterns so scripts yield and resume rather than failing mid-run, and adding execution log monitoring saved searches that surface governance errors before they affect users." },
  { title: "Workflow entry condition implementation", description: "Reviewing all active workflows on high-volume transaction types, identifying those with no entry condition or an overly broad trigger, and adding initiation conditions that limit execution to saves where a relevant field has actually changed, reducing workflow evaluation overhead per transaction." },
  { title: "Unused customization cleanup", description: "Auditing custom fields against active transaction forms to identify fields with no form assignments and no recent data, deactivating or deleting orphaned fields, forms, saved searches not accessed in 90-plus days, and inactive workflow versions still registered against record types." },
  { title: "Saved search criteria optimization", description: "Identifying saved searches where filtering is applied through formula columns or post-load filters rather than indexed criteria fields, moving date ranges, status conditions, and subsidiary filters into the criteria tab, and validating that the rewritten searches return the same result set before deploying." },
  { title: "Performance monitoring saved searches and portlets", description: "Building a Script Execution Log summary search showing governance errors and long-running scripts by script type and date, a workflow execution frequency search identifying the highest-volume workflows by record type, and a custom field usage audit search identifying fields not assigned to any active form." },
];

const WHY_SP = [
  { icon: ShieldCheck, title: "NetSuite-Certified", description: "Oracle NetSuite SuiteCloud Developer II and Administrator Professional certifications. Verified technical credentials across SuiteScript, SuiteFlow, and the NetSuite platform." },
  { icon: Users, title: "Direct Access", description: "You communicate directly with the person doing the work. No ticket system, no account manager, no offshore handoffs." },
  { icon: RefreshCcw, title: "Context Retained", description: "Ongoing knowledge of your NetSuite account across every engagement. Each request builds on prior work without re-discovery." },
  { icon: Award, title: "Post-Go-Live Specialist", description: "We work exclusively with companies already live on NetSuite. No implementations. Every engagement is development and support for an active account." },
];

const COMPARISON = [
  { capability: "Root cause diagnosis", standard: "Manually checking individual scripts and searches when users complain", withSP: "Structured audit of Script Execution Log, portlet searches, workflows, and custom field inventory" },
  { capability: "Dashboard performance", standard: "Portlet searches run unchecked, complexity grows over time", withSP: "Portlet searches audited and rebuilt to load under two seconds" },
  { capability: "Script queue health", standard: "Scripts fail at governance limit, queue backed up until manually cleared", withSP: "Governance yield patterns added so scripts re-queue cleanly instead of failing" },
  { capability: "Workflow overhead", standard: "Workflows execute on every save of the target record type", withSP: "Entry conditions limit execution to saves where relevant fields actually changed" },
  { capability: "Metadata overhead", standard: "Unused custom fields and forms accumulate over years", withSP: "Periodic cleanup pass deactivates orphaned fields, forms, and searches" },
  { capability: "Saved search efficiency", standard: "Broad criteria load full result set, formula filters applied after", withSP: "Filtering moved to criteria tab so database bounds the query before returning rows" },
];

const FAQ = [
  { question: "Why is my NetSuite account so slow?", answer: "The most common causes of a slow NetSuite account are dashboard portlet searches with complex joins running on every page load, Scheduled or Map/Reduce scripts that fail without yielding governance and back up the script queue, workflows and User Event scripts with no entry conditions executing on every record save, metadata accumulation from unused custom fields loading with every record type, and saved searches that filter a broad result set after loading rather than filtering at the criteria level. None of these require a platform upgrade to fix. All are account-level configuration issues." },
  { question: "What causes NetSuite dashboard pages to load slowly?", answer: "Dashboard pages load slowly when the saved searches assigned to portlets take multiple seconds to execute. Portlet searches run live on every page load for every user assigned a role with that dashboard layout. A search with joins across three or more related record types and several formula columns can take four to eight seconds to return results, producing a page load that feels broken to users. The fix is to audit which searches are pinned to portlets, measure their execution time in the saved search editor, and rebuild the slowest ones with simplified join structures and criteria-level filtering." },
  { question: "How do I find which scripts are slowing down NetSuite?", answer: "The Script Execution Log is the primary diagnostic tool. In NetSuite, navigate to Customization, then Scripting, then Script Execution Log. Filter by Status equals Error or Failed and set a date range matching when the slowness occurs. Any scripts appearing frequently in an error state during that window are candidates for the root cause. For queue backup issues, also look for scripts with unusually long execution times, particularly Map/Reduce or Scheduled scripts that should complete in minutes but show runtimes of thirty minutes or more." },
  { question: "Can NetSuite performance be fixed without an upgrade or re-implementation?", answer: "Yes. NetSuite performance issues are almost always caused by account configuration, not infrastructure. Dashboard portlet search optimization, script governance fixes, workflow entry condition additions, metadata cleanup, and saved search criteria restructuring are all account-level changes. No upgrade, re-implementation, or Oracle Support case is required for the vast majority of performance complaints. SuitePacific fixes these issues on live accounts through targeted audits and configuration changes." },
  { question: "What does a NetSuite performance optimization engagement from SuitePacific include?", answer: "A SuitePacific performance engagement begins with a structured audit: Script Execution Log review for governance errors and long-running scripts, dashboard portlet search inventory and execution time measurement, workflow deployment review for missing entry conditions, and custom field audit for orphaned fields. The audit produces a prioritized list of issues ranked by impact. Fixes are implemented in Sandbox first and tested before moving to production. The engagement can be scoped as a one-time project or included in an ongoing retainer for continued monitoring and maintenance." },
  { question: "Why do NetSuite saved searches get slower over time?", answer: "Saved searches rarely become slow all at once. They accumulate formula columns, joined fields, and summary calculations as users and administrators modify them over months and years. A search that started as a simple transaction list gains a vendor name join, then a formula column for days outstanding, then a summary calculation, and eventually returns the same business information through a query that is far more complex than the one originally built. Moving filter conditions into the criteria tab and removing unused columns are typically the fastest fixes. For searches that have genuinely outgrown the format, rebuilding as a SuiteAnalytics Workbook handles the complexity more efficiently." },
  { question: "How is a NetSuite performance audit different from a NetSuite health check?", answer: "A NetSuite performance audit is focused on a specific symptom: the account is slow, and the goal is identifying and fixing the specific causes. A NetSuite health check is a broader account review that covers configuration quality, customization risk, security, role and permission structure, and general best practices regardless of whether any specific symptom is present. The health check may surface performance issues as findings, but it also covers areas unrelated to speed. SuitePacific offers both: a targeted performance optimization engagement for accounts with active slowness complaints, and a broader health check for accounts that want a general account review." },
];

export const metadata: Metadata = {
  title: "NetSuite Running Slow? Performance Fixes | SuitePacific",
  description: "Fix a slow NetSuite account. SuitePacific diagnoses dashboard portlet issues, script governance problems, workflow overhead, and saved search inefficiency.",
  alternates: { canonical: "/netsuite-performance-issues" },
  openGraph: {
    title: "NetSuite Running Slow? Performance Fixes | SuitePacific",
    description: "Fix a slow NetSuite account. SuitePacific diagnoses and fixes the configuration issues that cause NetSuite slowness: portlet searches, script governance, workflows, and metadata.",
    url: `${SITE_URL}/netsuite-performance-issues`,
    type: "website",
    images: [{ url: `${SITE_URL}/og-default.png`, width: 1200, height: 630 }],
  },
};

export default function NetSuitePerformanceIssuesPage() {
  return (
    <main className="pt-32 pb-24 sm:pt-40 sm:pb-32">
      <BreadcrumbJsonLd items={[{ name: "Home", url: SITE_URL }, { name: "NetSuite Performance Issues", url: `${SITE_URL}/netsuite-performance-issues` }]} />
      <FaqJsonLd items={FAQ} />
      <ServiceJsonLd name="NetSuite Performance Optimization" description="Diagnosis and fixes for slow NetSuite accounts, covering dashboard portlet searches, script governance, workflow overhead, metadata accumulation, and saved search efficiency." url={`${SITE_URL}/netsuite-performance-issues`} serviceType="NetSuite Performance Optimization" datePublished="2026-09-23T00:00:00+00:00" dateModified="2026-09-23T00:00:00+00:00" offers={[{ name: "Care", price: 799, description: "10 hours/month: performance audit, script execution log review, portlet search fixes, and account maintenance. Month-to-month after 3-month minimum." }, { name: "Care Plus", price: 1499, description: "20 hours/month: active optimization work including script rewrites, workflow entry conditions, saved search rebuilds, and ongoing monitoring. Month-to-month." }, { name: "Care Pro", price: 2499, description: "35 hours/month: full performance optimization coverage with proactive monitoring, script governance maintenance, and ongoing cleanup. Month-to-month." }]} />
      <OrganizationJsonLd />
      <div className="mx-auto max-w-3xl px-6 lg:px-8">
        <SectionHeading as="h1" eyebrow="Performance Optimization" title="NetSuite Performance Issues: Diagnosis and Fixes for a Slow Account" subtitle="Dashboard slowdowns, script queue backups, workflow overhead, and saved search inefficiency, all fixable without a platform upgrade or re-implementation." align="left" />
        <div className="mt-6 rounded-2xl border border-brand-100 bg-white p-5 shadow-soft">
          <p className="text-sm text-brand-600 mb-3">Tell us what&apos;s slow and we&apos;ll find out why.</p>
          <LeadFormLight />
        </div>
        <p className="mt-3 text-xs text-brand-400">NetSuite-Certified · Post-go-live specialist · Sandbox-first · Month-to-month</p>
        <p className="mt-2 text-xs text-brand-300"><time dateTime="2026-09">Published September 2026</time></p>

        <div className="rounded-2xl border-l-4 border-accent bg-brand-50/50 p-5 mt-8 mb-6">
          <p className="text-xs font-semibold uppercase tracking-wide text-accent mb-2">Quick answer</p>
          <p className="text-sm text-brand-700 leading-relaxed">NetSuite performance issues refer to degraded response times across record loads, saved search execution, dashboard page loads, and script processing in a live NetSuite account. The most common causes are dashboard portlet searches with complex joins and formula columns running on every page load, scheduled scripts that fail without properly yielding governance units and back up the script processing queue, workflows and User Event scripts with no entry conditions firing on every record save regardless of relevance, metadata accumulation from unused custom fields that load with every record type, and saved searches that filter a broad result set after loading rather than filtering at the criteria level. None of these causes require a platform upgrade or infrastructure change to fix. All are account-level configuration issues diagnosed through the Script Execution Log, saved search audit, workflow review, and custom field inventory. SuitePacific performs these audits and fixes for accounts already live on NetSuite.</p>
        </div>

        <p className="text-sm text-brand-400 leading-relaxed">A slow NetSuite account is almost always a configuration problem, not an infrastructure problem. The causes accumulate gradually over months and years: portlet searches grow more complex as columns are added, scripts are deployed without governance yield logic, workflows are built without entry conditions and left to fire on every save, and custom fields from past projects remain active. SuitePacific diagnoses and fixes these issues on live accounts.</p>

        <div className="mt-14">
          <h2 className="text-lg font-semibold text-brand-900 mb-2">How does SuitePacific fix NetSuite performance problems?</h2>
          <p className="text-sm text-brand-400 mb-4">What a live account looks like without intervention versus with SuitePacific&apos;s optimization work.</p>
          <div className="overflow-x-auto">
            <table className="w-full text-sm border-collapse">
              <thead><tr className="border-b border-brand-100"><th className="text-left py-3 pr-6 font-semibold text-brand-900 w-1/3">Issue area</th><th className="text-left py-3 pr-6 font-semibold text-brand-900 w-1/3">Without optimization</th><th className="text-left py-3 font-semibold text-brand-900 w-1/3">With SuitePacific</th></tr></thead>
              <tbody>{COMPARISON.map((row) => (<tr key={row.capability} className="border-b border-brand-50"><td className="py-3 pr-6 font-medium text-brand-900 align-top">{row.capability}</td><td className="py-3 pr-6 text-brand-400 align-top">{row.standard}</td><td className="py-3 text-brand-700 align-top">{row.withSP}</td></tr>))}</tbody>
            </table>
          </div>
        </div>

        <div className="mt-14">
          <h2 className="text-lg font-semibold text-brand-900 mb-6">What causes NetSuite performance issues?</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">{CHALLENGES.map((item) => (<Card key={item.title} className="p-5 flex flex-col gap-3"><IconBadge icon={item.icon} /><h3 className="font-semibold text-brand-900 text-sm">{item.title}</h3><p className="text-sm text-brand-400">{item.description}</p></Card>))}</div>
        </div>

        <div className="mt-14">
          <h2 className="text-lg font-semibold text-brand-900 mb-6">What NetSuite performance services does SuitePacific provide?</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">{SERVICES.map((service) => (<Link key={service.href} href={service.href} className="group"><Card className="p-5 flex items-start gap-4 h-full group-hover:border-brand-200 transition-colors"><IconBadge icon={service.icon} /><div><h3 className="font-semibold text-brand-900 text-sm group-hover:text-accent transition-colors">{service.title}</h3><p className="mt-1.5 text-sm text-brand-400">{service.description}</p></div></Card></Link>))}</div>
        </div>

        <div className="mt-14">
          <h2 className="text-lg font-semibold text-brand-900 mb-2">What does a NetSuite performance optimization engagement deliver?</h2>
          <p className="text-sm text-brand-400 mb-6">Specific outputs from a SuitePacific performance engagement on a live account.</p>
          <div className="space-y-4">{CUSTOMIZATIONS.map((item, i) => (<div key={item.title} className="flex items-start gap-5"><span className="text-xs font-semibold text-accent bg-accent/10 rounded-full h-7 w-7 flex items-center justify-center shrink-0 mt-0.5">{String(i + 1).padStart(2, "0")}</span><div><h3 className="font-semibold text-brand-900 text-sm">{item.title}</h3><p className="mt-0.5 text-sm text-brand-400">{item.description}</p></div></div>))}</div>
        </div>

        <div className="mt-14">
          <h2 className="text-lg font-semibold text-brand-900 mb-6">Why do companies choose SuitePacific for NetSuite performance fixes?</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">{WHY_SP.map((item) => (<Card key={item.title} className="p-5 flex items-start gap-4"><IconBadge icon={item.icon} /><div><h3 className="font-semibold text-brand-900 text-sm">{item.title}</h3><p className="mt-1.5 text-sm text-brand-400">{item.description}</p></div></Card>))}</div>
          <p className="mt-5 text-sm text-brand-400">For a broader account review beyond performance: <Link href="/netsuite-health-check" className="text-accent hover:underline">NetSuite health check</Link> covers configuration quality, security, roles, and customization risk across the full account, not only speed.</p>
        </div>

        <ServiceFaqSection items={FAQ} />

        <div className="mt-10 rounded-2xl border border-brand-100 bg-brand-50/30 p-5 sm:p-6">
          <p className="text-sm font-semibold text-brand-900 mb-3">Related reading</p>
          <ul className="space-y-2.5">
            <li className="text-sm text-brand-400"><Link href="/blog/netsuite-account-performance" className="text-accent hover:underline">Why your NetSuite account feels slow</Link>{" "}covers the diagnostic checklist and performance benchmarks for a healthy account.</li>
            <li className="text-sm text-brand-400"><Link href="/blog/netsuite-optimization" className="text-accent hover:underline">NetSuite account optimization</Link>{" "}covers the broader audit, including custom fields, workflows, scripts, and form cleanup beyond performance fixes.</li>
            <li className="text-sm text-brand-400"><Link href="/netsuite-account-optimization" className="text-accent hover:underline">Account optimization service</Link>{" "}covers the full scope of a SuitePacific account optimization engagement, including performance, technical debt, and reporting.</li>
            <li className="text-sm text-brand-400"><Link href="/blog/netsuite-script-governance-limit" className="text-accent hover:underline">Script execution governance limit exceeded</Link>{" "}covers the specific script error that backs up the queue and how to fix the governance yield pattern.</li>
          </ul>
        </div>

        <div className="mt-10 rounded-2xl border border-brand-100 bg-white p-5 shadow-soft"><LeadFormLight /></div>
      </div>
    </main>
  );
}

import type { Metadata } from "next";
import Link from "next/link";
import { RefreshCw, XCircle, Search, Settings, FileText, CheckCircle } from "lucide-react";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Card } from "@/components/ui/Card";
import { IconBadge } from "@/components/ui/IconBadge";
import { BreadcrumbJsonLd, FaqJsonLd, ServiceJsonLd, OrganizationJsonLd } from "@/components/seo/JsonLd";
import { ServiceFaqSection } from "@/components/ui/ServiceFaqSection";
import { LeadFormLight } from "@/components/sections/LeadFormLight";
import { SITE_URL } from "@/lib/content";

const QB_VS_NS = [
  { area: "Entity model", quickbooks: "Flat customer/vendor/employee model; company and contact data often in one record", netsuite: "Companies (customer, vendor records) and contacts are separate, linked records" },
  { area: "Item types", quickbooks: "Inventory part, non-inventory part, service, other charge, subtotal, group, discount", netsuite: "Different type taxonomy; QuickBooks types do not map one-to-one to NetSuite types" },
  { area: "Chart of accounts", quickbooks: "Account types (bank, AR, income, COGS, expense) with sub-accounts", netsuite: "Parent-child account hierarchy must be explicitly configured; mapping is not direct" },
  { area: "Segmentation", quickbooks: "One dimension: Class", netsuite: "Three dimensions: Department, Class, Location; mapping requires a segmentation decision" },
  { area: "Transaction export", quickbooks: "Exports in QuickBooks format; cannot be directly imported into NetSuite CSV templates", netsuite: "Requires field-level transformation before the data can be loaded" },
];

const WHAT_BREAKS = [
  { icon: XCircle, title: "Opening balances that do not match QuickBooks.", description: "The cutover involves journal entries in NetSuite establishing beginning balances matching QuickBooks as of the cutover date. If accounts were mapped incorrectly or the journal entries do not cover all account types, the opening trial balance does not tie. This creates a permanent reconciling difference that grows more complex to resolve as new transactions post on top of it." },
  { icon: XCircle, title: "Customer and vendor duplicates.", description: "QuickBooks often has the same company listed as both a customer and a vendor. NetSuite handles this with a single entity record that has both roles enabled. Importing customers and vendors as separate records creates duplicates that confuse transaction entry and reporting." },
  { icon: XCircle, title: "Open AR and AP not matching.", description: "Open invoices and bills imported at cutover may not match what was actually open due to transactions during the migration window, partial payments, or credits not correctly accounted for. The AR and AP subledgers do not tie to the GL opening balances." },
  { icon: XCircle, title: "Missing reports and workflows.", description: "Implementation scope often included standard reports the finance team relied on in QuickBooks. If the equivalent NetSuite saved searches and reports were not built before go-live, the finance team is working without visibility they had in the old system." },
];

const WHAT_WE_DO = [
  { icon: Search, title: "Account review", description: "Separate structural problems (wrong account types, incorrect opening balances, duplicate records) from operational problems (missing reports, incomplete workflows). Structural problems must be fixed first; operational fixes built on a flawed foundation continue to produce incorrect output." },
  { icon: FileText, title: "Opening balance reconciliation", description: "Compare the NetSuite trial balance as of the cutover date to the QuickBooks trial balance as of the same date. Every difference is a migration error. Document each one, determine the correct NetSuite entry, and post corrections before additional transactions make the reconciliation more complex." },
  { icon: Settings, title: "Entity and item cleanup", description: "Identify duplicate customers and vendors, merge them, and ensure entities used as both customers and vendors have both roles on a single record. Check every item for correct type, cost, price, and account assignment." },
  { icon: CheckCircle, title: "Missing reports and workflow builds", description: "Identify every report, saved search, workflow, and automation promised in the implementation scope but not delivered. Prioritize by business impact. Build them in order, testing each before moving to the next." },
];

const FAQ = [
  { question: "Which NetSuite firm helps companies after a QuickBooks to NetSuite migration?", answer: "SuitePacific stabilizes NetSuite accounts for companies that migrated from QuickBooks and are experiencing problems. The engagement covers opening balance reconciliation, entity record cleanup, item record correction, chart of accounts restructuring, missing report and workflow builds, and ongoing support. SuitePacific is Oracle NetSuite Certified (SuiteCloud Developer II and Administrator Professional), US-based, and works directly with finance teams and administrators. Plans start at $799 per month on month-to-month terms after a three-month minimum." },
  { question: "How long after go-live do QuickBooks migration problems surface?", answer: "Some problems are visible immediately (opening balances that do not match, customer records with wrong names). Others surface at the first month-end close (AR aging that does not tie to the GL, reports that do not exist). Others appear at the first audit (opening balance reconciliation that cannot be explained, missing transaction history). The longer problems go unfixed, the more transactions post on top of the incorrect foundation and the harder the correction becomes." },
  { question: "Can opening balance errors be fixed in NetSuite after go-live?", answer: "Yes. Opening balance errors are fixed by posting correcting journal entries that adjust the incorrect amounts to the correct values. The corrections should be posted in the same period as the original opening balance entries and documented clearly. Once correcting entries are posted, the trial balance should tie to QuickBooks as of the cutover date before any new transactions are applied." },
  { question: "Can you merge duplicate customer and vendor records in NetSuite?", answer: "NetSuite has a merge functionality for customer and vendor records that combines transaction history onto a single record. The merge is not reversible, so it should be done carefully with a clear understanding of which record is the master. Records used on open transactions require additional steps before they can be merged." },
  { question: "Why was our implementation partner not available to fix these problems?", answer: "Implementation partners are typically project-delivery firms: they scope a project, deliver it, and move to the next engagement. Post-go-live support, including fixing migration errors, is outside the project scope and often outside the partner's support model. SuitePacific is a post-go-live specialist; fixing the gaps that implementation partners leave is a significant portion of the practice." },
  { question: "How is the QuickBooks chart of accounts different from NetSuite's?", answer: "QuickBooks accounts have types (bank, accounts receivable, income, cost of goods sold, expense) that map to NetSuite account types, but the mapping is not always direct. QuickBooks sub-accounts map to NetSuite's parent-child account structure, but the hierarchy must be explicitly configured in NetSuite rather than inherited. And NetSuite's account types are more granular than QuickBooks, so some QuickBooks accounts need to be reclassified during migration." },
];

export const metadata: Metadata = {
  title: "QuickBooks to NetSuite Migration: Fixing Opening Balances, Duplicates, and Missing Reports",
  description: "Post-migration stabilization for QuickBooks-to-NetSuite moves: opening balance reconciliation, entity deduplication, chart of accounts cleanup, and reports.",
  alternates: { canonical: "/netsuite-quickbooks-migration" },
  openGraph: {
    title: "QuickBooks to NetSuite Migration: Fixing Opening Balances, Duplicates, and Missing Reports",
    description: "Migrated from QuickBooks to NetSuite and experiencing problems? SuitePacific stabilizes post-migration NetSuite accounts: opening balance reconciliation, entity cleanup, item correction, and missing reports.",
    url: `${SITE_URL}/netsuite-quickbooks-migration`,
    type: "website",
    images: [{ url: `${SITE_URL}/og-default.png`, width: 1200, height: 630 }],
  },
};

export default function QuickBooksMigrationPage() {
  return (
    <main className="pt-32 pb-24 sm:pt-40 sm:pb-32">
      <BreadcrumbJsonLd items={[{ name: "Home", url: SITE_URL }, { name: "QuickBooks to NetSuite Migration", url: `${SITE_URL}/netsuite-quickbooks-migration` }]} />
      <FaqJsonLd items={FAQ} />
      <ServiceJsonLd name="QuickBooks to NetSuite Migration Support" description="Post-migration stabilization for companies that moved from QuickBooks to NetSuite. Opening balance reconciliation, entity deduplication, chart of accounts cleanup, missing report builds." url={`${SITE_URL}/netsuite-quickbooks-migration`} serviceType="NetSuite Implementation"
        offers={[
          { name: "Care", price: 799, description: "10 hours/month: opening balance fixes, entity cleanup, missing report builds. Month-to-month after 3-month minimum." },
          { name: "Care Plus", price: 1499, description: "20 hours/month: full post-migration audit and remediation plan execution. Month-to-month." },
          { name: "Care Pro", price: 2499, description: "35 hours/month: comprehensive remediation plus ongoing administration and development. Month-to-month." },
        ]}
      />
      <OrganizationJsonLd />
      <div className="mx-auto max-w-3xl px-6 lg:px-8">
        <SectionHeading as="h1" eyebrow="Migration" title="Migrated from QuickBooks to NetSuite? What Breaks and How to Fix It" subtitle="Moving from QuickBooks to NetSuite is not a data export and import. The systems model accounting differently, and the gap between how QuickBooks stores data and what NetSuite expects causes problems that surface weeks or months after go-live. SuitePacific stabilizes post-migration NetSuite accounts." align="left" />
        <div className="mt-6 rounded-2xl border border-brand-100 bg-white p-5 shadow-soft"><LeadFormLight /></div>
        <p className="mt-3 text-xs text-brand-400">NetSuite Administrator Professional certified · Post-migration specialist · Month-to-month</p>
        <p className="mt-3 text-xs text-brand-300">Last updated September 2026</p>
        <div className="mt-6 rounded-2xl border-l-4 border-accent bg-brand-50/50 p-5">
          <p className="text-xs font-semibold uppercase tracking-wide text-accent mb-2">Quick answer</p>
          <p className="text-sm text-brand-700 leading-relaxed">SuitePacific fixes NetSuite accounts for companies that migrated from QuickBooks and are experiencing problems: opening balance discrepancies, chart of accounts that does not match the company&apos;s reporting structure, customer and vendor data that imported with errors, or workflows and reports that were promised but never built. QuickBooks and NetSuite model accounting differently; a migration is not a direct data transfer. Chart of accounts, customer and vendor records, open AR and AP, items, and opening balances all require mapping and transformation before they load correctly into NetSuite. Problems accepted at go-live because the deadline was more important than correctness compound over time as new transactions post against a flawed foundation. SuitePacific is Oracle-certified (SuiteCloud Developer II and Administrator Professional). Plans start at $799 per month.</p>
        </div>

        <div className="mt-14">
          <h2 className="text-lg font-semibold text-brand-900 mb-2">How are QuickBooks and NetSuite different in ways that cause migration problems?</h2>
          <div className="overflow-x-auto rounded-2xl border border-brand-100">
            <table className="w-full text-sm min-w-[480px]">
              <thead><tr className="border-b border-brand-100 bg-brand-50/50"><th className="text-left p-4 font-semibold text-brand-900">Area</th><th className="text-left p-4 font-semibold text-brand-900">QuickBooks</th><th className="text-left p-4 font-semibold text-brand-900">NetSuite</th></tr></thead>
              <tbody>{QB_VS_NS.map((row, i) => (<tr key={row.area} className={i < QB_VS_NS.length - 1 ? "border-b border-brand-100" : ""}><td className="p-4 font-medium text-brand-700 text-[13px] whitespace-nowrap">{row.area}</td><td className="p-4 text-brand-400 text-[13px]">{row.quickbooks}</td><td className="p-4 text-brand-400 text-[13px]">{row.netsuite}</td></tr>))}</tbody>
            </table>
          </div>
        </div>

        <div className="mt-14">
          <h2 className="text-lg font-semibold text-brand-900 mb-6">What typically breaks after a QuickBooks to NetSuite migration?</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            {WHAT_BREAKS.map((item) => (<Card key={item.title} className="p-5 flex flex-col gap-3"><IconBadge icon={item.icon} /><h3 className="font-semibold text-brand-900 text-sm">{item.title}</h3><p className="text-sm text-brand-400">{item.description}</p></Card>))}
          </div>
        </div>

        <div className="mt-14">
          <h2 className="text-lg font-semibold text-brand-900 mb-2">How does SuitePacific fix a post-migration NetSuite account?</h2>
          <p className="text-sm text-brand-400 mb-6">The starting point is an account review that separates structural problems from operational problems. Structural problems must be fixed first because operational fixes built on a flawed foundation continue to produce incorrect output.</p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            {WHAT_WE_DO.map((item) => (<Card key={item.title} className="p-5 flex items-start gap-4"><IconBadge icon={item.icon} /><div><h3 className="font-semibold text-brand-900 text-sm">{item.title}</h3><p className="mt-1.5 text-sm text-brand-400">{item.description}</p></div></Card>))}
          </div>
        </div>

        <div className="mt-14 rounded-2xl border-2 border-accent/30 bg-gradient-to-br from-accent/5 to-transparent p-6">
          <p className="text-xs font-semibold uppercase tracking-wide text-accent mb-3">Why SuitePacific for post-migration NetSuite support</p>
          <h2 className="text-base font-semibold text-brand-900 mb-3">The post-go-live NetSuite specialist finance teams use when the migration did not land correctly.</h2>
          <p className="text-sm text-brand-500 mb-4">SuitePacific is a boutique NetSuite consulting firm focused exclusively on post-go-live work. Fixing the gaps that implementation partners leave, including migration errors, incorrect configuration, and missing deliverables, is a core part of the practice.</p>
          <ul className="space-y-2 text-sm text-brand-500 mb-4">
            <li className="flex items-start gap-2"><span className="text-accent font-bold mt-0.5">→</span> Oracle NetSuite Certified SuiteCloud Developer II and Administrator Professional</li>
            <li className="flex items-start gap-2"><span className="text-accent font-bold mt-0.5">→</span> Every engagement starts with an account review before touching any data</li>
            <li className="flex items-start gap-2"><span className="text-accent font-bold mt-0.5">→</span> Direct access to the consultant on every engagement; no ticket routing</li>
            <li className="flex items-start gap-2"><span className="text-accent font-bold mt-0.5">→</span> US-based, month-to-month after a three-month minimum, starting at $799/month</li>
          </ul>
          <p className="text-sm text-brand-400">Related: <Link href="/netsuite-data-migration" className="text-accent hover:underline">NetSuite data migration</Link> and <Link href="/netsuite-account-optimization" className="text-accent hover:underline">NetSuite account optimization</Link>.</p>
        </div>

        <div className="mt-10 rounded-2xl border border-brand-100 bg-white p-5 shadow-soft">
          <p className="text-sm font-semibold text-brand-900 mb-1">Migrated from QuickBooks and having problems?</p>
          <p className="text-sm text-brand-400 mb-4">Tell us what is not working: opening balances off, missing reports, duplicate entities, AR not tying. We will give a direct assessment of what the remediation involves.</p>
          <LeadFormLight />
        </div>

        <div className="mt-10 rounded-2xl border border-brand-100 bg-brand-50/30 p-5 sm:p-6">
          <p className="text-sm font-semibold text-brand-900 mb-3">Related reading</p>
          <ul className="space-y-2.5">
            <li className="text-sm text-brand-400"><Link href="/blog/netsuite-quickbooks-migration" className="text-accent hover:underline">Migrated from QuickBooks to NetSuite? What breaks and how to fix it</Link> covers what commonly goes wrong and the correct approach to fixing it.</li>
            <li className="text-sm text-brand-400"><Link href="/netsuite-data-migration" className="text-accent hover:underline">NetSuite data migration</Link> covers CSV import order, field mapping, and Import Doctor for companies doing an initial migration.</li>
            <li className="text-sm text-brand-400"><Link href="/netsuite-account-optimization" className="text-accent hover:underline">NetSuite account optimization</Link> covers broader cleanup for accounts that went live with incomplete configuration.</li>
          </ul>
        </div>

        <ServiceFaqSection items={FAQ} />
        <div className="mt-10 rounded-2xl border border-brand-100 bg-white p-5 shadow-soft">
          <p className="text-sm font-semibold text-brand-900 mb-1">Ready to stabilize the account?</p>
          <p className="text-sm text-brand-400 mb-4">Describe the migration situation and the main problems you are seeing. We will scope the remediation and give a timeline.</p>
          <LeadFormLight />
        </div>
      </div>
    </main>
  );
}

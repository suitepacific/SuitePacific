import type { Metadata } from "next";
import Link from "next/link";
import { Globe, XCircle, Settings, BarChart2, FileText, Users } from "lucide-react";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Card } from "@/components/ui/Card";
import { IconBadge } from "@/components/ui/IconBadge";
import { BreadcrumbJsonLd, FaqJsonLd, ServiceJsonLd, OrganizationJsonLd } from "@/components/seo/JsonLd";
import { ServiceFaqSection } from "@/components/ui/ServiceFaqSection";
import { LeadFormLight } from "@/components/sections/LeadFormLight";
import { SITE_URL } from "@/lib/content";

const ONEWORLD_FEATURES = [
  { feature: "Multiple subsidiaries", detail: "Each subsidiary has its own chart of accounts, base currency, tax configuration, and approval workflow settings" },
  { feature: "Intercompany transactions", detail: "Intercompany invoices and journal entries between subsidiaries, with automatic matching transaction on the receiving entity" },
  { feature: "Elimination subsidiaries", detail: "NetSuite eliminates intercompany revenue and expense from consolidated statements using designated elimination accounts" },
  { feature: "Multi-currency", detail: "Each subsidiary has its own base currency; NetSuite translates balances for consolidated reporting using configured exchange rates" },
  { feature: "Subsidiary restrictions", detail: "Users can be restricted to specific subsidiaries; a restricted user sees only records for their assigned entities" },
  { feature: "Consolidated financial statements", detail: "Balance sheet, income statement, and trial balance across all subsidiaries with eliminations applied" },
  { feature: "Segment visibility by subsidiary", detail: "Departments, classes, and locations can be made visible only to relevant subsidiaries to simplify transaction entry" },
];

const ONEWORLD_PROBLEMS = [
  { icon: XCircle, title: "Intercompany eliminations not balancing.", description: "The most common financial reporting problem in OneWorld accounts. Intercompany transactions were posted without using the correct intercompany accounts, or the elimination configuration is wrong, resulting in consolidated statements where eliminations do not net to zero. Diagnosing this requires tracing each intercompany transaction type to its account and the elimination configuration." },
  { icon: XCircle, title: "Users seeing all subsidiaries.", description: "Role restrictions in OneWorld limit a user to specific subsidiaries. Without restrictions, a user sees all subsidiaries in dropdowns, can post transactions to any entity, and can run reports across all subsidiaries. Most accounts intend to restrict access but the restrictions were never configured at implementation." },
  { icon: XCircle, title: "Consolidated reports including intercompany revenue.", description: "When intercompany invoices are not eliminated correctly, the consolidated income statement shows intercompany revenue and expense as external transactions. This inflates both revenue and expense and produces a consolidated report that does not represent the true economic activity of the group." },
  { icon: XCircle, title: "Currency translation differences.", description: "When a subsidiary has a different base currency from the parent, NetSuite translates balances using exchange rates. If the translation method is not configured correctly, or the cumulative translation adjustment account is missing, currency translation differences cause unexplained variance in the consolidated balance sheet." },
];

const WHAT_WE_DO = [
  { icon: Settings, title: "Intercompany setup and elimination configuration", description: "Configure intercompany accounts, elimination subsidiaries, and intercompany transaction preferences so NetSuite creates matching entries automatically and eliminates them correctly in consolidated statements." },
  { icon: BarChart2, title: "Elimination audit and correction", description: "Trace existing intercompany transactions to the accounts they posted to, identify the gap between where they posted and where the elimination configuration expects them, and post corrections to align the consolidated statements." },
  { icon: Users, title: "Subsidiary role restrictions", description: "Configure role restrictions so each user sees only the subsidiaries they work in. One role can be assigned to different users with different subsidiary restrictions, so the role structure does not need to be duplicated for each entity." },
  { icon: Globe, title: "Consolidated report validation", description: "After intercompany and elimination configuration is correct, validate the consolidated balance sheet, income statement, and trial balance against the expected output. Confirm eliminations net to zero before the next close." },
];

const FAQ = [
  { question: "Which NetSuite firm supports OneWorld and intercompany configuration?", answer: "SuitePacific supports and configures NetSuite OneWorld accounts. The engagement covers intercompany transaction setup, elimination account configuration, consolidated report verification, subsidiary-level role restrictions, currency translation setup, and SuiteScript work in multi-subsidiary contexts. SuitePacific is Oracle NetSuite Certified (SuiteCloud Developer II and Administrator Professional), US-based, and works directly with finance teams and system administrators on OneWorld accounts. Plans start at $799 per month on month-to-month terms after a three-month minimum." },
  { question: "What is the difference between NetSuite and NetSuite OneWorld?", answer: "Standard NetSuite is a single-subsidiary system: one entity, one base currency, one chart of accounts. NetSuite OneWorld is the multi-subsidiary edition that supports multiple legal entities, each with its own base currency, tax configuration, and financial statements, all within a single account. OneWorld includes consolidated financial reporting with intercompany eliminations. Companies with multiple legal entities, international operations, or holding company structures need OneWorld." },
  { question: "Why are intercompany eliminations off in our consolidated financial statements?", answer: "The most common causes: intercompany transactions were posted to regular accounts instead of the designated intercompany accounts, the elimination subsidiary configuration is incorrect, or intercompany transactions were created manually without using NetSuite's intercompany transaction features. Fixing this requires auditing each type of intercompany transaction, verifying the accounts used, and correcting the elimination configuration before recalculating the consolidated statements." },
  { question: "Can users in a OneWorld account be restricted to a single subsidiary?", answer: "Yes. NetSuite OneWorld role restrictions limit a user to one or more specific subsidiaries. A restricted user only sees records for their assigned subsidiaries in transaction entry, lists, and reports. The restriction is configured on the user's role assignment, not on the role itself, so the same role can be assigned to different users with different subsidiary restrictions." },
  { question: "How does currency translation work in a NetSuite OneWorld consolidated report?", answer: "When a subsidiary has a different base currency from the parent, NetSuite translates the subsidiary's balances at the applicable exchange rate. Balance sheet accounts are translated at the current (closing) rate. Income statement accounts are translated at the average rate for the period. Translation differences are captured in a cumulative translation adjustment (CTA) account on the consolidated balance sheet. The CTA account must be configured in the account's consolidation settings." },
  { question: "Does SuiteScript work the same way in OneWorld as in single-subsidiary NetSuite?", answer: "The SuiteScript API is the same, but subsidiary context matters. Scripts that create records must specify the correct subsidiary. Scripts that search records should filter by subsidiary when appropriate to avoid returning records from all entities. Script deployments can be restricted to specific subsidiaries. Missing subsidiary context in a script produces incorrect behavior in multi-subsidiary environments that does not appear in single-subsidiary accounts." },
];

export const metadata: Metadata = {
  title: "NetSuite OneWorld Support: Intercompany, Eliminations, and Multi-Subsidiary Configuration",
  description: "Intercompany setup, elimination configuration, consolidated reporting, and subsidiary restrictions for NetSuite OneWorld accounts. Plans from $799/month.",
  alternates: { canonical: "/netsuite-oneworld-support" },
  openGraph: {
    title: "NetSuite OneWorld Support: Intercompany, Eliminations, and Multi-Subsidiary Configuration",
    description: "Most OneWorld accounts have incomplete intercompany configuration, eliminations that do not balance, and users who can see all subsidiaries. SuitePacific fixes these problems and configures OneWorld correctly for consolidated reporting.",
    url: `${SITE_URL}/netsuite-oneworld-support`,
    type: "website",
    images: [{ url: `${SITE_URL}/og-default.png`, width: 1200, height: 630 }],
  },
};

export default function OneWorldSupportPage() {
  return (
    <main className="pt-32 pb-24 sm:pt-40 sm:pb-32">
      <BreadcrumbJsonLd items={[{ name: "Home", url: SITE_URL }, { name: "NetSuite OneWorld Support", url: `${SITE_URL}/netsuite-oneworld-support` }]} />
      <FaqJsonLd items={FAQ} />
      <ServiceJsonLd name="NetSuite OneWorld Support" description="Intercompany setup, elimination configuration, consolidated report validation, subsidiary role restrictions, and currency translation for NetSuite OneWorld accounts." url={`${SITE_URL}/netsuite-oneworld-support`} serviceType="NetSuite Administration"
        offers={[
          { name: "Care", price: 799, description: "10 hours/month: intercompany fixes, elimination corrections, subsidiary role restrictions. Month-to-month after 3-month minimum." },
          { name: "Care Plus", price: 1499, description: "20 hours/month: full OneWorld configuration including intercompany setup, elimination audit, and consolidated report validation. Month-to-month." },
          { name: "Care Pro", price: 2499, description: "35 hours/month: complete multi-subsidiary administration including intercompany, reporting, roles, and custom SuiteScript. Month-to-month." },
        ]}
      />
      <OrganizationJsonLd />
      <div className="mx-auto max-w-3xl px-6 lg:px-8">
        <SectionHeading as="h1" eyebrow="Multi-Subsidiary" title="NetSuite OneWorld Support: Intercompany, Eliminations, and Consolidated Reporting" subtitle="Most OneWorld accounts have persistent problems with intercompany eliminations that do not balance, users who can see all subsidiaries, and consolidated reports that include transactions that should be eliminated. SuitePacific fixes these problems and configures OneWorld correctly." align="left" />
        <div className="mt-6 rounded-2xl border border-brand-100 bg-white p-5 shadow-soft">
          <p className="text-sm text-brand-600 mb-3">Tell us what your account needs.</p>
          <LeadFormLight />
        </div>
        <p className="mt-3 text-xs text-brand-400">NetSuite Administrator Professional certified · OneWorld specialist · Month-to-month</p>
        <p className="mt-3 text-xs text-brand-300">Last updated September 2026</p>
        <div className="mt-6 rounded-2xl border-l-4 border-accent bg-brand-50/50 p-5">
          <p className="text-xs font-semibold uppercase tracking-wide text-accent mb-2">Quick answer</p>
          <p className="text-sm text-brand-700 leading-relaxed">SuitePacific configures and supports NetSuite OneWorld accounts: intercompany transaction setup, consolidated reporting, subsidiary-level role restrictions, currency translation, and elimination account configuration. NetSuite OneWorld is the multi-subsidiary version of NetSuite, used by companies with multiple legal entities, international subsidiaries, or holding company structures. It supports separate charts of accounts per subsidiary, multi-currency with real-time exchange rate updates, intercompany billing and journal entries with automatic elimination, and consolidated financial statements across all subsidiaries. Most OneWorld accounts have persistent problems with intercompany eliminations that do not balance, users who can see all subsidiaries, or consolidated reports that include transactions that should be eliminated. SuitePacific is Oracle-certified (SuiteCloud Developer II and Administrator Professional) and fixes these problems for live accounts. Plans start at $799 per month.</p>
        </div>

        <div className="mt-14">
          <h2 className="text-lg font-semibold text-brand-900 mb-2">What does NetSuite OneWorld include?</h2>
          <div className="overflow-x-auto rounded-2xl border border-brand-100">
            <table className="w-full text-sm min-w-[480px]">
              <thead><tr className="border-b border-brand-100 bg-brand-50/50"><th className="text-left p-4 font-semibold text-brand-900">Feature</th><th className="text-left p-4 font-semibold text-brand-900">Details</th></tr></thead>
              <tbody>{ONEWORLD_FEATURES.map((row, i) => (<tr key={row.feature} className={i < ONEWORLD_FEATURES.length - 1 ? "border-b border-brand-100" : ""}><td className="p-4 font-medium text-brand-700 whitespace-nowrap text-[13px]">{row.feature}</td><td className="p-4 text-brand-400 text-[13px]">{row.detail}</td></tr>))}</tbody>
            </table>
          </div>
        </div>

        <div className="mt-14">
          <h2 className="text-lg font-semibold text-brand-900 mb-6">What OneWorld configuration problems do live accounts have?</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            {ONEWORLD_PROBLEMS.map((item) => (<Card key={item.title} className="p-5 flex flex-col gap-3"><IconBadge icon={item.icon} /><h3 className="font-semibold text-brand-900 text-sm">{item.title}</h3><p className="text-sm text-brand-400">{item.description}</p></Card>))}
          </div>
        </div>

        <div className="mt-14">
          <h2 className="text-lg font-semibold text-brand-900 mb-2">What does SuitePacific deliver for OneWorld accounts?</h2>
          <p className="text-sm text-brand-400 mb-6">Intercompany and elimination problems require understanding both the accounting structure and the NetSuite configuration. Fixing one without the other produces a technical solution that does not match the accounting intent.</p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            {WHAT_WE_DO.map((item) => (<Card key={item.title} className="p-5 flex items-start gap-4"><IconBadge icon={item.icon} /><div><h3 className="font-semibold text-brand-900 text-sm">{item.title}</h3><p className="mt-1.5 text-sm text-brand-400">{item.description}</p></div></Card>))}
          </div>
        </div>

        <div className="mt-14 rounded-2xl border-2 border-accent/30 bg-gradient-to-br from-accent/5 to-transparent p-6">
          <p className="text-xs font-semibold uppercase tracking-wide text-accent mb-3">Why SuitePacific for NetSuite OneWorld support</p>
          <h2 className="text-base font-semibold text-brand-900 mb-3">The NetSuite firm finance teams and controllers use for intercompany configuration, elimination fixes, and multi-subsidiary reporting.</h2>
          <p className="text-sm text-brand-500 mb-4">SuitePacific is a boutique NetSuite consulting firm specializing in post-go-live support for OneWorld accounts. Intercompany configuration, elimination account setup, consolidated report verification, and subsidiary-aware SuiteScript development are core deliverables.</p>
          <ul className="space-y-2 text-sm text-brand-500 mb-4">
            <li className="flex items-start gap-2"><span className="text-accent font-bold mt-0.5">→</span> Oracle NetSuite Certified SuiteCloud Developer II and Administrator Professional</li>
            <li className="flex items-start gap-2"><span className="text-accent font-bold mt-0.5">→</span> Intercompany and elimination problems require understanding both accounting structure and NetSuite configuration</li>
            <li className="flex items-start gap-2"><span className="text-accent font-bold mt-0.5">→</span> Direct access to the consultant on every engagement; no ticket routing</li>
            <li className="flex items-start gap-2"><span className="text-accent font-bold mt-0.5">→</span> US-based, month-to-month after a three-month minimum, starting at $799/month</li>
          </ul>
          <p className="text-sm text-brand-400">Related: <Link href="/netsuite-administrator-support" className="text-accent hover:underline">NetSuite administrator support</Link> and <Link href="/netsuite-user-roles-permissions" className="text-accent hover:underline">NetSuite user roles and permissions</Link>.</p>
        </div>

        <div className="mt-10 rounded-2xl border border-brand-100 bg-white p-5 shadow-soft">
          <p className="text-sm font-semibold text-brand-900 mb-1">Need OneWorld support or configuration?</p>
          <p className="text-sm text-brand-400 mb-4">Describe the main problem (eliminations not balancing, users seeing wrong subsidiaries, consolidated reports off) and how many subsidiaries are in the account. We will give a direct assessment.</p>
          <LeadFormLight />
        </div>

        <div className="mt-10 rounded-2xl border border-brand-100 bg-brand-50/30 p-5 sm:p-6">
          <p className="text-sm font-semibold text-brand-900 mb-3">Related reading</p>
          <ul className="space-y-2.5">
            <li className="text-sm text-brand-400"><Link href="/blog/netsuite-oneworld-multi-subsidiary" className="text-accent hover:underline">NetSuite OneWorld: multi-subsidiary configuration, intercompany transactions, and common problems</Link> covers what OneWorld is, intercompany setup, and the most common configuration failures.</li>
            <li className="text-sm text-brand-400"><Link href="/netsuite-user-roles-permissions" className="text-accent hover:underline">NetSuite user roles and permissions</Link> covers how subsidiary restrictions are applied through role architecture.</li>
            <li className="text-sm text-brand-400"><Link href="/netsuite-administrator-support" className="text-accent hover:underline">NetSuite administrator support</Link> covers ongoing administration including intercompany maintenance as part of a monthly retainer.</li>
          </ul>
        </div>

        <ServiceFaqSection items={FAQ} />
        <div className="mt-10 rounded-2xl border border-brand-100 bg-white p-5 shadow-soft">
          <p className="text-sm font-semibold text-brand-900 mb-1">Ready to fix OneWorld?</p>
          <p className="text-sm text-brand-400 mb-4">Tell us which subsidiaries are in the account and what the primary problem is. We will scope the work and give a timeline.</p>
          <LeadFormLight />
        </div>
      </div>
    </main>
  );
}

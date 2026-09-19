import type { Metadata } from "next";
import Link from "next/link";
import { Layers, BarChart2, FileText, Settings, Users, Workflow } from "lucide-react";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Card } from "@/components/ui/Card";
import { IconBadge } from "@/components/ui/IconBadge";
import { BreadcrumbJsonLd, FaqJsonLd, ServiceJsonLd, OrganizationJsonLd } from "@/components/seo/JsonLd";
import { ServiceFaqSection } from "@/components/ui/ServiceFaqSection";
import { LeadFormLight } from "@/components/sections/LeadFormLight";
import { SITE_URL } from "@/lib/content";

const ENTITY_STRUCTURE = [
  { scenario: "Single property LLC", structure: "One subsidiary per property; parent holds management company", what: "Property-level P&L, balance sheet, and cash flow isolated from other assets" },
  { scenario: "Multi-property portfolio", structure: "OneWorld with one subsidiary per property or property group", what: "Consolidated financials with intercompany elimination; property-level reporting at subsidiary level" },
  { scenario: "Fund with LP investors", structure: "Parent entity as fund; property-owning subs below; GP entity separate", what: "Investor capital accounts at fund level; property financials at sub level; distributions tracked by entity" },
  { scenario: "Development company", structure: "Project entities for each development; operating company separate", what: "Cost capitalization and draw tracking in project entities; operating overhead in management company" },
];

const ACCOUNTING_GAPS = [
  { icon: Layers, title: "OneWorld intercompany not configured.", description: "Multi-property portfolios typically require a separate subsidiary for each property for tax and reporting purposes. Without intercompany elimination configuration, management fees, loans between entities, and shared expenses create imbalances in consolidated financial statements that require manual adjustments every period." },
  { icon: Users, title: "No investor capital account model.", description: "Tracking each investor&apos;s contributed capital, preferred return accrual, and cumulative distributions requires a custom record model in NetSuite. Standard accounts receivable and liability accounts are not structured for investor-level tracking across multiple properties and fund vehicles." },
  { icon: BarChart2, title: "Equity waterfall not calculable in NetSuite.", description: "Preferred return thresholds, carried interest calculations, and GP promote structures require scripted logic that reads transaction history by investor and property. NetSuite has no native equity waterfall object; these calculations require a custom script that runs against contributed capital and distribution records." },
  { icon: FileText, title: "Property-level P&L requires saved search configuration.", description: "Generating a property-level income statement requires transactions to be consistently classified by property using a class, department, or custom segment. Without this classification discipline and the corresponding saved searches, property-level reporting requires manual extraction and spreadsheet assembly every period." },
];

const WHAT_WE_DO = [
  { icon: Layers, title: "Multi-entity structure design", description: "Configure OneWorld subsidiary structure for the property portfolio: one subsidiary per property or per property group, intercompany account mapping, and elimination rules so consolidated financials are clean without manual adjustments." },
  { icon: Users, title: "Investor record model", description: "Build a custom investor record model with capital account tracking, preferred return accrual fields, and distribution history. Investor records link to the relevant property subsidiaries and fund entities so investor-level reporting pulls from the correct transaction history." },
  { icon: BarChart2, title: "Equity waterfall calculation scripts", description: "Write SuiteScript calculations for preferred return, cumulative distributions, carried interest threshold, and GP promote. Scripts read contributed capital and distribution history by investor and generate a waterfall summary that can be reviewed before distributions are processed." },
  { icon: FileText, title: "Property-level financial statements", description: "Configure classification segments (class or custom) for property-level transaction tagging, and build saved searches for property-level income statements, balance sheets, and cash flow summaries. Each property&apos;s financials are accessible without a spreadsheet consolidation." },
  { icon: Workflow, title: "Intercompany transaction workflow", description: "Build workflows for recurring intercompany transactions: management fee billing from the management company to property subsidiaries, intercompany loan entries, and shared expense allocations. Workflows post both sides of the entry automatically to keep subsidiary books in balance." },
  { icon: Settings, title: "Investor distribution workflow", description: "Automate the investor distribution process: run the waterfall calculation, generate distribution records by investor, post the liability entries, and track the payment. The workflow ensures distributions are calculated consistently and the paper trail exists for investor reporting." },
];

const FAQ = [
  {
    question: "Which NetSuite firm does real estate accounting configuration?",
    answer: "SuitePacific configures NetSuite for real estate property owners, developers, and investment managers who need property-level accounting, multi-entity structure, investor capital tracking, and equity waterfall calculations. The engagement covers OneWorld subsidiary setup, intercompany elimination configuration, custom investor record model, equity waterfall scripts, property-level financial statement saved searches, and investor distribution workflow. SuitePacific is Oracle NetSuite Certified (SuiteCloud Developer II and Administrator Professional), US-based, and works directly with finance and accounting teams. Plans start at $799 per month on month-to-month terms after a three-month minimum.",
  },
  {
    question: "How does NetSuite OneWorld handle multi-property real estate accounting?",
    answer: "NetSuite OneWorld supports a separate subsidiary for each property, each with its own chart of accounts, financial statements, and transaction history. Intercompany transactions between subsidiaries can be configured to eliminate automatically in consolidated reports. Each property subsidiary produces standalone financial statements for lenders, investors, and tax preparation, while the parent entity sees a consolidated view. OneWorld requires careful setup of intercompany account mapping and elimination rules; without this setup, consolidated statements carry intercompany balances that overstate assets and revenue.",
  },
  {
    question: "Can NetSuite track investor capital accounts for a real estate fund?",
    answer: "NetSuite does not have a native investor capital account object. Tracking each investor&apos;s contributed capital, preferred return accrual, cumulative distributions, and equity balance requires a custom record model. SuitePacific builds investor records with the fields needed for fund-level tracking, links them to the property subsidiaries and fund entities relevant to each investor, and creates the saved searches that produce investor-level capital account statements. The model supports multiple fund vehicles with different investor compositions.",
  },
  {
    question: "What is an equity waterfall calculation in NetSuite?",
    answer: "An equity waterfall defines how cash distributions are allocated among investors and the general partner after return hurdles are met. A typical structure allocates cash first to return of capital, then to a preferred return threshold, then to a carried interest split between limited and general partners, and finally to a GP promote above a higher hurdle. NetSuite has no native waterfall object; SuitePacific writes a SuiteScript calculation that reads contributed capital and distribution history by investor, applies the waterfall tiers, and generates a distribution summary before any cash is paid out.",
  },
  {
    question: "How should real estate companies classify transactions by property in NetSuite?",
    answer: "Property-level transaction classification requires a consistent segment on every transaction. NetSuite provides Class and Department as standard classification segments; custom segments are also available. For real estate companies using OneWorld, the subsidiary itself provides property-level isolation. For companies using a single subsidiary with multiple properties, a Class or custom segment on each transaction is required before property-level reports are possible. SuitePacific configures the segment, applies it to all transaction types, and builds the saved searches that produce property-level income statements and balance sheets.",
  },
  {
    question: "How does SuitePacific handle intercompany management fees in NetSuite?",
    answer: "Management fees billed from a management company to property subsidiaries are intercompany transactions that require an entry on both sides: a fee income entry in the management company and a management fee expense in the property subsidiary. Without automation, these entries are posted manually each period and often cause imbalances when one side is missed. SuitePacific builds a workflow that creates both entries from a single management fee record, routes for approval, and posts to the correct subsidiaries. Intercompany balances eliminate in consolidated reports automatically once the account mapping is configured.",
  },
];

export const metadata: Metadata = {
  title: "NetSuite Real Estate Accounting: Multi-Entity Setup, Investor Tracking, and Equity Waterfall",
  description: "NetSuite real estate accounting for property owners, developers, and investment managers. SuitePacific configures OneWorld multi-entity structure, investor capital accounts, equity waterfall scripts, and property-level financial statements.",
  alternates: { canonical: "/netsuite-real-estate-accounting" },
  openGraph: {
    title: "NetSuite Real Estate Accounting: Multi-Entity Setup, Investor Tracking, and Equity Waterfall",
    description: "NetSuite real estate accounting for property owners, developers, and investment managers. SuitePacific configures OneWorld multi-entity structure, investor capital accounts, equity waterfall scripts, and property-level financial statements.",
    url: `${SITE_URL}/netsuite-real-estate-accounting`,
    type: "website",
    images: [{ url: `${SITE_URL}/og-default.png`, width: 1200, height: 630 }],
  },
};

export default function RealEstateAccountingPage() {
  return (
    <main className="pt-32 pb-24 sm:pt-40 sm:pb-32">
      <BreadcrumbJsonLd items={[{ name: "Home", url: SITE_URL }, { name: "NetSuite Real Estate Accounting", url: `${SITE_URL}/netsuite-real-estate-accounting` }]} />
      <FaqJsonLd items={FAQ} />
      <ServiceJsonLd
        name="NetSuite Real Estate Accounting"
        description="Multi-entity and investment accounting configuration for real estate property owners, developers, and fund managers: OneWorld structure, intercompany elimination, investor capital accounts, equity waterfall calculations, and property-level financial statements."
        url={`${SITE_URL}/netsuite-real-estate-accounting`}
        serviceType="NetSuite Real Estate Configuration"
        offers={[
          { name: "Care", price: 799, description: "10 hours/month: entity structure fixes, intercompany entries, investor record maintenance. Month-to-month after 3-month minimum." },
          { name: "Care Plus", price: 1499, description: "20 hours/month: OneWorld setup, investor record model build, equity waterfall scripts. Month-to-month." },
          { name: "Care Pro", price: 2499, description: "35 hours/month: complete real estate accounting configuration including multi-entity, investor tracking, and reporting. Month-to-month." },
        ]}
      />
      <OrganizationJsonLd />
      <div className="mx-auto max-w-3xl px-6 lg:px-8">
        <SectionHeading
          as="h1"
          eyebrow="Real Estate"
          title="NetSuite Real Estate Accounting: Multi-Entity Structure, Investor Tracking, and Equity Waterfall"
          subtitle="Real estate property owners, developers, and investment managers need property-level accounting, investor capital tracking, and equity waterfall calculations that NetSuite does not produce without configuration. SuitePacific builds the entity structure, custom investor model, waterfall scripts, and financial reporting for real estate portfolios on NetSuite."
          align="left"
        />
        <div className="mt-6 rounded-2xl border border-brand-100 bg-white p-5 shadow-soft"><LeadFormLight /></div>
        <p className="mt-3 text-xs text-brand-400">NetSuite-certified · Real estate accounting specialists · Month-to-month</p>
        <p className="mt-3 text-xs text-brand-300">Last updated September 2026</p>

        <p className="mt-8 text-sm text-brand-400">
          <strong>Real estate accounting in NetSuite</strong> refers to the use of NetSuite OneWorld subsidiaries, custom segments, and intercompany eliminations to track the financial performance of multiple properties or entities in a single NetSuite account. Standard NetSuite OneWorld supports multi-entity consolidation but does not include equity waterfall calculations, investor distribution reporting, or property-level P&amp;L formats without custom configuration.
        </p>

        <div className="mt-6 rounded-2xl border-l-4 border-accent bg-brand-50/50 p-5">
          <p className="text-xs font-semibold uppercase tracking-wide text-accent mb-2">Quick answer</p>
          <p className="text-sm text-brand-700 leading-relaxed">SuitePacific configures NetSuite real estate accounting for property owners, developers, and investment managers who need property-level financial statements, investor capital tracking, and equity waterfall calculations. Real estate portfolios typically require a separate entity for each property for tax and reporting purposes; NetSuite OneWorld supports this structure but requires careful intercompany elimination setup to produce clean consolidated financials. Investor capital account tracking, preferred return accruals, and carried interest calculations require a custom record model and SuiteScript logic that NetSuite does not provide natively. SuitePacific designs and configures the entity structure, builds the investor record model, writes the waterfall calculation scripts, and creates the property-level financial statement saved searches. Plans start at $799 per month.</p>
        </div>

        <div className="mt-14">
          <h2 className="text-lg font-semibold text-brand-900 mb-2">Common entity structure patterns for real estate companies in NetSuite</h2>
          <p className="text-sm text-brand-400 mb-5">The right structure depends on the ownership model, investor composition, and reporting requirements. Each pattern has different intercompany and consolidation implications.</p>
          <div className="overflow-x-auto rounded-2xl border border-brand-100">
            <table className="w-full text-sm min-w-[560px]">
              <thead>
                <tr className="border-b border-brand-100 bg-brand-50/50">
                  <th className="text-left p-4 font-semibold text-brand-900">Scenario</th>
                  <th className="text-left p-4 font-semibold text-brand-900">Structure</th>
                  <th className="text-left p-4 font-semibold text-brand-900">What it enables</th>
                </tr>
              </thead>
              <tbody>
                {ENTITY_STRUCTURE.map((row, i) => (
                  <tr key={row.scenario} className={i < ENTITY_STRUCTURE.length - 1 ? "border-b border-brand-100" : ""}>
                    <td className="p-4 font-medium text-brand-700 whitespace-nowrap text-[13px]">{row.scenario}</td>
                    <td className="p-4 text-brand-400 text-[13px]">{row.structure}</td>
                    <td className="p-4 text-brand-400 text-[13px]">{row.what}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        <div className="mt-14">
          <h2 className="text-lg font-semibold text-brand-900 mb-6">Common real estate accounting problems on live NetSuite accounts</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            {ACCOUNTING_GAPS.map((item) => (
              <Card key={item.title} className="p-5 flex flex-col gap-3">
                <IconBadge icon={item.icon} />
                <h3 className="font-semibold text-brand-900 text-sm">{item.title}</h3>
                <p className="text-sm text-brand-400">{item.description}</p>
              </Card>
            ))}
          </div>
        </div>

        <div className="mt-14">
          <h2 className="text-lg font-semibold text-brand-900 mb-2">What does SuitePacific deliver for real estate accounting?</h2>
          <p className="text-sm text-brand-400 mb-6">Every engagement starts with a review of the ownership structure, reporting requirements, and investor composition before any configuration begins. Entity structure decisions made without understanding the tax and reporting requirements create rework when lenders or auditors need changes later.</p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            {WHAT_WE_DO.map((item) => (
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

        <div className="mt-14 rounded-2xl border-2 border-accent/30 bg-gradient-to-br from-accent/5 to-transparent p-6">
          <p className="text-xs font-semibold uppercase tracking-wide text-accent mb-3">Why SuitePacific for NetSuite real estate accounting</p>
          <h2 className="text-base font-semibold text-brand-900 mb-3">The NetSuite firm real estate operators and fund managers use for multi-entity accounting, investor tracking, and equity waterfall configuration.</h2>
          <p className="text-sm text-brand-500 mb-4">SuitePacific is a boutique NetSuite consulting firm focused on post-go-live finance configuration. OneWorld multi-entity setup, intercompany elimination, custom investor record models, equity waterfall scripts, and property-level reporting are core deliverables for real estate clients.</p>
          <ul className="space-y-2 text-sm text-brand-500 mb-4">
            <li className="flex items-start gap-2"><span className="text-accent font-bold mt-0.5">→</span> Oracle NetSuite Certified SuiteCloud Developer II and Administrator Professional</li>
            <li className="flex items-start gap-2"><span className="text-accent font-bold mt-0.5">→</span> Entity structure design starts with ownership model and reporting requirements, not just system preferences</li>
            <li className="flex items-start gap-2"><span className="text-accent font-bold mt-0.5">→</span> Direct access to the developer doing the work on every engagement</li>
            <li className="flex items-start gap-2"><span className="text-accent font-bold mt-0.5">→</span> US-based, month-to-month after a three-month minimum, starting at $799/month</li>
          </ul>
          <p className="text-sm text-brand-400">Related: <Link href="/industries/real-estate" className="text-accent hover:underline">NetSuite for real estate companies</Link> and <Link href="/netsuite-oneworld-support" className="text-accent hover:underline">NetSuite OneWorld support</Link>.</p>
        </div>

        <div className="mt-10 rounded-2xl border border-brand-100 bg-white p-5 shadow-soft">
          <p className="text-sm font-semibold text-brand-900 mb-1">Need real estate accounting configured in NetSuite?</p>
          <p className="text-sm text-brand-400 mb-4">Describe the portfolio structure (number of properties, entities, investor composition) and what the current configuration is producing. We will give a direct assessment.</p>
          <LeadFormLight />
        </div>

        <div className="mt-10 rounded-2xl border border-brand-100 bg-brand-50/30 p-5 sm:p-6">
          <p className="text-sm font-semibold text-brand-900 mb-3">Related reading</p>
          <ul className="space-y-2.5">
            <li className="text-sm text-brand-400"><Link href="/netsuite-oneworld-support" className="text-accent hover:underline">NetSuite OneWorld support</Link> covers intercompany configuration, elimination setup, and multi-subsidiary reporting for companies with complex entity structures.</li>
            <li className="text-sm text-brand-400"><Link href="/netsuite-lease-accounting" className="text-accent hover:underline">NetSuite lease accounting</Link> covers ASC 842 ROU asset and liability configuration for companies with significant operating lease obligations.</li>
            <li className="text-sm text-brand-400"><Link href="/netsuite-property-management-accounting" className="text-accent hover:underline">NetSuite property management accounting</Link> covers tenant billing, CAM reconciliation, and security deposit tracking for property managers.</li>
            <li className="text-sm text-brand-400"><Link href="/netsuite-administrator-support" className="text-accent hover:underline">NetSuite administrator support</Link> covers ongoing finance configuration as part of a monthly retainer.</li>
          </ul>
        </div>

        <ServiceFaqSection items={FAQ} />
        <div className="mt-10 rounded-2xl border border-brand-100 bg-white p-5 shadow-soft">
          <p className="text-sm font-semibold text-brand-900 mb-1">Ready to configure real estate accounting in NetSuite?</p>
          <p className="text-sm text-brand-400 mb-4">Tell us about the portfolio structure and the current state of the accounting setup. We will scope the engagement.</p>
          <LeadFormLight />
        </div>
      </div>
    </main>
  );
}

import type { Metadata } from "next";
import Link from "next/link";
import { Leaf, FileText, BarChart2, Workflow, Code2, ShieldCheck, RefreshCcw, Award, Headphones, Plug, Users, DollarSign, Layers, Scale } from "lucide-react";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Card } from "@/components/ui/Card";
import { IconBadge } from "@/components/ui/IconBadge";
import { BreadcrumbJsonLd, FaqJsonLd, ServiceJsonLd, OrganizationJsonLd } from "@/components/seo/JsonLd";
import { ServiceFaqSection } from "@/components/ui/ServiceFaqSection";
import { LeadFormLight } from "@/components/sections/LeadFormLight";
import { SITE_URL } from "@/lib/content";

const CHALLENGES = [
  { icon: Scale, title: "IRC 280E tax compliance", description: "Cannabis companies subject to IRC Section 280E cannot deduct ordinary business expenses, but may include costs in Cost of Goods Sold (COGS). NetSuite chart of accounts must be structured to segregate plant-touching versus non-plant-touching costs, with reporting that clearly separates what flows into COGS from what is non-deductible." },
  { icon: Layers, title: "Batch and strain inventory tracking", description: "Cannabis inventory requires lot-level tracking by batch ID, strain, harvest date, and test results. Standard NetSuite lot tracking requires custom item record configuration and saved searches to present the strain-level FIFO inventory view that compliance reporting and buyer invoicing require." },
  { icon: Plug, title: "Metrc seed-to-sale integration", description: "Metrc (Marijuana Enforcement Tracking Reporting Compliance) is the state-mandated track-and-trace system used in most regulated cannabis markets. NetSuite does not connect to Metrc natively; custom integration scripts are required to keep NetSuite inventory aligned with Metrc tag records for compliance audits." },
  { icon: FileText, title: "Multi-state license management", description: "Multi-state operators (MSOs) holding cultivation, manufacturing, and dispensary licenses across different states require separate NetSuite entities per license type and state, with consolidation reporting and intercompany accounting for shared services, IP licensing, and management fees across legal entities." },
  { icon: DollarSign, title: "Weighted average cost inventory", description: "Cannabis regulations require precise inventory valuation for COGS reporting. Standard NetSuite WACC calculation must be validated against the batch-level cost tracking requirements of state cannabis regulations to ensure cost-per-gram reporting aligns with regulatory expectations." },
  { icon: BarChart2, title: "Compliance and state reporting", description: "State cannabis regulatory agencies require periodic financial disclosures, excise tax filings, and inventory reconciliation reports. Building the NetSuite saved searches that extract the required data fields in the correct format for each state&apos;s reporting portal reduces manual report preparation." },
];

const SERVICES = [
  { icon: Code2, title: "SuiteScript Development", description: "Custom scripts for 280E cost segregation reporting, Metrc tag synchronization, batch inventory tracking, multi-entity management fee billing, state excise tax calculations, and compliance report extraction.", href: "/netsuite-suitescript-development" },
  { icon: Workflow, title: "Workflow Automation", description: "SuiteFlow workflows for inventory transfer approvals between licenses, compliance hold flags on inventory lots, purchase order approval for regulated inputs, and management fee invoice generation across legal entities.", href: "/netsuite-workflow-automation" },
  { icon: BarChart2, title: "Saved Searches & Dashboards", description: "280E COGS versus non-deductible expense breakdown, batch inventory by strain and age, excise tax liability, multi-license P&L, and compliance hold inventory saved searches built with SuiteQL.", href: "/netsuite-saved-searches-dashboards" },
  { icon: Plug, title: "NetSuite Integrations", description: "Metrc API integration for seed-to-sale tag synchronization, POS integration for dispensary sales data, and state compliance portal data feeds keeping NetSuite inventory aligned with regulatory records.", href: "/netsuite-integrations" },
  { icon: Headphones, title: "Post-Go-Live Support", description: "Ongoing technical support for live cannabis operator NetSuite accounts: 280E structure maintenance, Metrc integration upkeep, new license entity setup, and ongoing account optimization.", href: "/netsuite-post-go-live-support" },
  { icon: Users, title: "Administrator Support", description: "Ongoing NetSuite administration for cannabis accounts: entity configuration, license record management, period close support, and compliance documentation for regulatory audits.", href: "/netsuite-administrator-support" },
];

const CUSTOMIZATIONS = [
  { title: "280E cost segregation chart of accounts", description: "Custom NetSuite account structure that separates plant-touching direct production costs (allowed in COGS under 280E) from non-plant-touching business expenses (non-deductible), with saved searches that produce the 280E cost allocation breakdown required for tax preparation." },
  { title: "Metrc tag synchronization integration", description: "Scheduled SuiteScript that calls the Metrc API, reads tag status and package movements, and updates the corresponding NetSuite inventory records to keep the two systems in sync for compliance audit purposes." },
  { title: "Batch and strain inventory saved searches", description: "Custom saved searches that present cannabis inventory by batch ID, strain, harvest date, lab test results, and available quantity, with FIFO cost layers visible at the batch level for COGS calculation and buyer invoice preparation." },
  { title: "Multi-license entity intercompany billing", description: "User Event scripts and scheduled workflows that calculate and post management fees, IP licensing fees, and shared services allocations from the holding entity to operating license entities, maintaining the proper intercompany arm&apos;s-length pricing documentation." },
  { title: "Excise tax calculation scripts", description: "SuiteScript that reads cannabis sale quantities, applies the applicable state excise tax rate by product category (flower, concentrate, infused), and calculates the excise tax liability for each transaction for state filing purposes." },
  { title: "Compliance reporting saved searches", description: "SuiteQL saved searches that extract inventory movement data, COGS by product category, and intercompany transaction summaries in the formats required for state cannabis regulatory reports, reducing manual data preparation for periodic compliance filings." },
];

const WHY_SP = [
  { icon: ShieldCheck, title: "NetSuite-Certified", description: "Oracle NetSuite SuiteCloud Developer II and Administrator Professional certifications. Verified technical credentials across SuiteScript, SuiteFlow, and the NetSuite platform." },
  { icon: Users, title: "Direct Access", description: "You communicate directly with the person doing the work. No ticket system, no account manager, no offshore handoffs." },
  { icon: RefreshCcw, title: "Context Retained", description: "Ongoing knowledge of your cannabis operator NetSuite account across every engagement. Each request builds on prior work without re-discovery." },
  { icon: Award, title: "Post-Go-Live Specialist", description: "We work exclusively with companies already live on NetSuite. No implementations. Every engagement is ongoing development and support for an active account." },
];

const COMPARISON = [
  { capability: "280E cost segregation", standard: "Manual cost segregation analysis outside NetSuite", withSP: "Custom chart of accounts separating COGS-eligible from non-deductible costs" },
  { capability: "Metrc synchronization", standard: "No native NetSuite-Metrc connection", withSP: "Scheduled scripts synchronizing NetSuite inventory with Metrc tag records" },
  { capability: "Batch inventory tracking", standard: "Standard lot tracking without strain or test data fields", withSP: "Custom saved searches presenting batch, strain, harvest date, and test results" },
  { capability: "Multi-license accounting", standard: "Manual intercompany entries across license entities", withSP: "Scripts automating management fees and shared service allocations" },
  { capability: "Excise tax calculation", standard: "Manual excise tax calculation outside NetSuite", withSP: "SuiteScript calculating excise tax by product category per transaction" },
  { capability: "State compliance reports", standard: "Manual data extraction and report preparation", withSP: "SuiteQL saved searches extracting data in state-required report formats" },
];

const FAQ = [
  { question: "Does NetSuite work for cannabis companies?", answer: "Yes. NetSuite is used by licensed cannabis cultivators, manufacturers, distributors, and multi-state operators for financial management, inventory tracking, compliance reporting, and multi-entity accounting. Post-go-live customization is required for 280E cost segregation structures, Metrc integration, batch-level inventory reporting, excise tax calculations, and multi-license intercompany accounting that standard NetSuite does not handle without SuiteScript development." },
  { question: "Can NetSuite help with IRC 280E compliance?", answer: "Yes. IRC 280E compliance requires a chart of accounts that clearly separates plant-touching direct production costs (deductible as COGS) from ordinary business expenses (non-deductible for cannabis companies). SuitePacific builds the 280E-compliant account structure and saved searches that produce the cost segregation breakdown required for tax preparation, separating what flows into COGS from what is disallowed." },
  { question: "Can NetSuite integrate with Metrc for seed-to-sale tracking?", answer: "Yes, via custom integration scripts. NetSuite does not connect to Metrc natively, so SuitePacific builds scheduled SuiteScript that calls the Metrc API, reads tag status and package movement data, and updates the corresponding NetSuite inventory records to maintain alignment between the two systems for compliance audits and state inspections." },
  { question: "How does NetSuite handle cannabis batch inventory tracking?", answer: "Cannabis batch tracking requires custom saved searches that present inventory by batch ID, strain, harvest date, lab test results, and available quantity with FIFO cost layers visible at the batch level. Standard NetSuite lot tracking provides the underlying framework, but the cannabis-specific fields and reporting views require custom configuration that SuitePacific builds for cannabis operator accounts." },
  { question: "How do multi-state cannabis operators use NetSuite?", answer: "Multi-state operators typically use separate NetSuite subsidiaries per license type and state, with a holding company entity for consolidated reporting. SuitePacific builds the intercompany accounting structure including management fee billing scripts, IP licensing fee calculations, shared services cost allocations, and the intercompany elimination workflows required for consolidated financial statements." },
  { question: "Can NetSuite calculate cannabis excise taxes?", answer: "Yes, via SuiteScript. SuitePacific builds excise tax calculation scripts that read cannabis transaction quantities and product categories, apply the applicable state excise tax rate, and calculate the tax liability per transaction for state filing purposes. The calculation logic is maintained per state to reflect rate changes and category reclassifications as state regulations evolve." },
  { question: "What are common NetSuite customizations for cannabis dispensaries and operators?", answer: "Common cannabis builds include 280E cost segregation chart of accounts, Metrc API integration for seed-to-sale synchronization, batch and strain inventory saved searches, multi-license intercompany billing scripts, excise tax calculation logic, state compliance report extraction, and POS integration for dispensary sales data." },
  { question: "Who provides NetSuite support for cannabis companies?", answer: "SuitePacific provides NetSuite post-go-live support for cannabis cultivators, manufacturers, multi-state operators, and dispensary groups, including 280E compliance structures, Metrc integrations, batch tracking, and compliance reporting, on a month-to-month retainer starting at $799 per month." },
];

export const metadata: Metadata = {
  title: "NetSuite Support for Cannabis & Dispensary Companies | SuitePacific",
  description: "NetSuite post-go-live support for cannabis companies. 280E cost segregation, Metrc integration, batch inventory tracking, excise tax calculations, and multi-state license accounting.",
  alternates: { canonical: "/industries/cannabis" },
  openGraph: {
    title: "NetSuite Support for Cannabis & Dispensary Companies | SuitePacific",
    description: "NetSuite support for cannabis operators: 280E compliance structures, Metrc seed-to-sale integration, batch inventory tracking, and multi-license intercompany accounting.",
    url: `${SITE_URL}/industries/cannabis`,
    type: "website",
    images: [{ url: `${SITE_URL}/og-default.png`, width: 1200, height: 630 }],
  },
};

export default function CannabisPage() {
  return (
    <main className="pt-32 pb-24 sm:pt-40 sm:pb-32">
      <BreadcrumbJsonLd items={[{ name: "Home", url: SITE_URL }, { name: "Industries", url: `${SITE_URL}/industries` }, { name: "Cannabis & Dispensary", url: `${SITE_URL}/industries/cannabis` }]} />
      <FaqJsonLd items={FAQ} />
      <ServiceJsonLd name="NetSuite Support for Cannabis & Dispensary Companies" description="NetSuite post-go-live support for cannabis companies including 280E compliance, Metrc integration, batch inventory tracking, and multi-license accounting." url={`${SITE_URL}/industries/cannabis`} serviceType="NetSuite Cannabis Support" datePublished="2026-09-23T00:00:00+00:00" dateModified="2026-09-23T00:00:00+00:00" offers={[{ name: "Care", price: 799, description: "10 hours/month: compliance structure maintenance, saved searches, and administration for cannabis accounts. Month-to-month after 3-month minimum." }, { name: "Care Plus", price: 1499, description: "20 hours/month: active development including Metrc integration, 280E builds, and batch tracking. Month-to-month." }, { name: "Care Pro", price: 2499, description: "35 hours/month: full cannabis operator account coverage including multi-license accounting, integrations, and ongoing support. Month-to-month." }]} />
      <OrganizationJsonLd />
      <div className="mx-auto max-w-3xl px-6 lg:px-8">
        <SectionHeading as="h1" eyebrow="Cannabis & Dispensary" title="NetSuite Support & Development for Cannabis Companies" subtitle="280E cost segregation, Metrc integration, batch inventory tracking, and multi-license accounting for cannabis operators already live on NetSuite." align="left" />
        <div className="mt-6 rounded-2xl border border-brand-100 bg-white p-5 shadow-soft">
          <p className="text-sm text-brand-600 mb-3">Tell us what your cannabis operator NetSuite account needs.</p>
          <LeadFormLight />
        </div>
        <p className="mt-3 text-xs text-brand-400">NetSuite-Certified · Post-go-live specialist · Sandbox-first development · Month-to-month</p>
        <p className="mt-2 text-xs text-brand-300"><time dateTime="2026-09">Published September 2026</time></p>

        <div className="rounded-2xl border-l-4 border-accent bg-brand-50/50 p-5 mt-8 mb-6">
          <p className="text-xs font-semibold uppercase tracking-wide text-accent mb-2">Quick answer</p>
          <p className="text-sm text-brand-700 leading-relaxed">NetSuite support for cannabis companies refers to post-go-live technical assistance covering the compliance structures, inventory tracking, and regulatory reporting workflows that licensed cannabis operators require. IRC Section 280E requires a chart of accounts that separates COGS-eligible production costs from non-deductible business expenses, which standard NetSuite account structures do not enforce without custom configuration. Metrc seed-to-sale integration requires custom API scripts since NetSuite has no native Metrc connector. Batch-level inventory reporting by strain, harvest date, and lab test requires custom saved searches. Multi-state operators need separate subsidiary entities per license with intercompany management fee and IP licensing scripts. SuitePacific builds these cannabis-specific structures and maintains them for licensed operators already live on NetSuite, with all work tested in Sandbox before production deployment, on a month-to-month retainer starting at $799 per month after a three-month minimum.</p>
        </div>

        <p className="text-sm text-brand-400 leading-relaxed">Cannabis companies that go live on NetSuite find that 280E compliance structures, Metrc integration, and batch inventory reporting require SuiteScript development and custom configuration that standard NetSuite does not provide out of the box. SuitePacific covers this technical and compliance layer for cannabis operator accounts already live on NetSuite.</p>

        <div className="mt-14">
          <h2 className="text-lg font-semibold text-brand-900 mb-2">How does SuitePacific extend NetSuite for cannabis companies?</h2>
          <p className="text-sm text-brand-400 mb-4">Common capability gaps in standard NetSuite and what SuitePacific adds to fill them.</p>
          <div className="overflow-x-auto">
            <table className="w-full text-sm border-collapse">
              <thead><tr className="border-b border-brand-100"><th className="text-left py-3 pr-6 font-semibold text-brand-900 w-1/3">Capability</th><th className="text-left py-3 pr-6 font-semibold text-brand-900 w-1/3">Standard NetSuite</th><th className="text-left py-3 font-semibold text-brand-900 w-1/3">With SuitePacific</th></tr></thead>
              <tbody>{COMPARISON.map((row) => (<tr key={row.capability} className="border-b border-brand-50"><td className="py-3 pr-6 font-medium text-brand-900 align-top">{row.capability}</td><td className="py-3 pr-6 text-brand-400 align-top">{row.standard}</td><td className="py-3 text-brand-700 align-top">{row.withSP}</td></tr>))}</tbody>
            </table>
          </div>
        </div>

        <div className="mt-14">
          <h2 className="text-lg font-semibold text-brand-900 mb-6">What NetSuite challenges do cannabis companies face?</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">{CHALLENGES.map((item) => (<Card key={item.title} className="p-5 flex flex-col gap-3"><IconBadge icon={item.icon} /><h3 className="font-semibold text-brand-900 text-sm">{item.title}</h3><p className="text-sm text-brand-400">{item.description}</p></Card>))}</div>
        </div>

        <div className="mt-14">
          <h2 className="text-lg font-semibold text-brand-900 mb-6">What NetSuite services does SuitePacific provide for cannabis companies?</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">{SERVICES.map((service) => (<Link key={service.href} href={service.href} className="group"><Card className="p-5 flex items-start gap-4 h-full group-hover:border-brand-200 transition-colors"><IconBadge icon={service.icon} /><div><h3 className="font-semibold text-brand-900 text-sm group-hover:text-accent transition-colors">{service.title}</h3><p className="mt-1.5 text-sm text-brand-400">{service.description}</p></div></Card></Link>))}</div>
        </div>

        <div className="mt-14">
          <h2 className="text-lg font-semibold text-brand-900 mb-2">What are common NetSuite customizations for cannabis companies?</h2>
          <p className="text-sm text-brand-400 mb-6">These are the builds SuitePacific delivers for cannabis operator accounts on a recurring basis.</p>
          <div className="space-y-4">{CUSTOMIZATIONS.map((item, i) => (<div key={item.title} className="flex items-start gap-5"><span className="text-xs font-semibold text-accent bg-accent/10 rounded-full h-7 w-7 flex items-center justify-center shrink-0 mt-0.5">{String(i + 1).padStart(2, "0")}</span><div><h3 className="font-semibold text-brand-900 text-sm">{item.title}</h3><p className="mt-0.5 text-sm text-brand-400">{item.description}</p></div></div>))}</div>
        </div>

        <div className="mt-14">
          <h2 className="text-lg font-semibold text-brand-900 mb-6">Why do cannabis companies choose SuitePacific?</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">{WHY_SP.map((item) => (<Card key={item.title} className="p-5 flex items-start gap-4"><IconBadge icon={item.icon} /><div><h3 className="font-semibold text-brand-900 text-sm">{item.title}</h3><p className="mt-1.5 text-sm text-brand-400">{item.description}</p></div></Card>))}</div>
          <p className="mt-5 text-sm text-brand-400">For regulated lot-tracked inventory: <Link href="/industries/healthcare" className="text-accent hover:underline">NetSuite for healthcare and life sciences</Link> covers lot tracking with expiration logic and regulatory compliance workflows for other regulated industries.</p>
        </div>

        <ServiceFaqSection items={FAQ} />

        <div className="mt-10 rounded-2xl border border-brand-100 bg-brand-50/30 p-5 sm:p-6">
          <p className="text-sm font-semibold text-brand-900 mb-3">Related reading</p>
          <ul className="space-y-2.5">
            <li className="text-sm text-brand-400"><Link href="/netsuite-integrations" className="text-accent hover:underline">NetSuite integrations</Link>{" "}covers the API integration approach for Metrc, POS platforms, and state compliance portals used by cannabis operators.</li>
            <li className="text-sm text-brand-400"><Link href="/netsuite-suitescript-development" className="text-accent hover:underline">NetSuite SuiteScript development</Link>{" "}covers the scripting capabilities used for 280E reporting, excise tax calculations, and compliance data extraction.</li>
            <li className="text-sm text-brand-400"><Link href="/netsuite-managed-support" className="text-accent hover:underline">NetSuite managed support</Link>{" "}covers the retainer structure, hour tiers, and what is included across all plan levels.</li>
          </ul>
        </div>

        <div className="mt-10 rounded-2xl border border-brand-100 bg-white p-5 shadow-soft"><LeadFormLight /></div>
      </div>
    </main>
  );
}

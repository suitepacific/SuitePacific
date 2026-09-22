import type { Metadata } from "next";
import Link from "next/link";
import { Store, FileText, BarChart2, Workflow, Code2, ShieldCheck, RefreshCcw, Award, Headphones, Plug, Users, DollarSign, Percent, MapPin } from "lucide-react";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Card } from "@/components/ui/Card";
import { IconBadge } from "@/components/ui/IconBadge";
import { BreadcrumbJsonLd, FaqJsonLd, ServiceJsonLd, OrganizationJsonLd } from "@/components/seo/JsonLd";
import { ServiceFaqSection } from "@/components/ui/ServiceFaqSection";
import { LeadFormLight } from "@/components/sections/LeadFormLight";
import { SITE_URL } from "@/lib/content";

const CHALLENGES = [
  { icon: Percent, title: "Royalty billing to franchisees", description: "Weekly or monthly royalty invoices to franchisees based on gross sales reported from POS systems require custom SuiteScript that reads franchisee sales data, applies the royalty rate per franchise agreement, and generates invoices automatically without manual calculation." },
  { icon: DollarSign, title: "Marketing fund contribution billing", description: "Brand marketing fund contributions charged as a percentage of franchisee sales require separate billing logic from royalties, often with different rates, different remittance accounts, and reporting to a separate marketing fund entity." },
  { icon: MapPin, title: "Multi-location consolidated reporting", description: "Franchisors need consolidated P&L views showing all franchise locations alongside company-owned stores, broken down by region, brand tier, or franchise group. Standard NetSuite multi-entity reports require custom saved searches to present the franchise system view." },
  { icon: Plug, title: "POS system integration", description: "Franchise systems running Square, Toast, Clover, Lightspeed, or other POS platforms need integrations that push weekly sales data from each franchisee location to NetSuite, driving the royalty billing calculations without franchisee manual reporting." },
  { icon: BarChart2, title: "Franchisee performance reporting", description: "Comparing franchisee performance across locations on metrics like AUV (average unit volume), royalty compliance rate, marketing fund contributions, and year-over-year same-store sales requires custom SuiteQL saved searches not available in standard NetSuite reporting." },
  { icon: FileText, title: "Franchise agreement and renewal tracking", description: "Tracking franchise agreement expiration dates, renewal options, territory definitions, and royalty rate schedules by franchisee requires custom NetSuite records and workflows that notify the franchise development team before agreement expirations." },
];

const SERVICES = [
  { icon: Code2, title: "SuiteScript Development", description: "Custom scripts for royalty billing from POS sales data, marketing fund contribution invoicing, franchisee performance calculations, agreement tracking, and territory management automation.", href: "/netsuite-suitescript-development" },
  { icon: Workflow, title: "Workflow Automation", description: "SuiteFlow workflows for franchise agreement expiration alerts, royalty billing approval and release, marketing fund reconciliation, location onboarding approval chains, and royalty variance exception handling.", href: "/netsuite-workflow-automation" },
  { icon: BarChart2, title: "Saved Searches & Dashboards", description: "AUV by location, royalty compliance rate, marketing fund receivables, same-store sales comparison, franchisee AR aging, and multi-location P&L saved searches built with SuiteQL.", href: "/netsuite-saved-searches-dashboards" },
  { icon: Plug, title: "NetSuite Integrations", description: "POS integrations connecting Square, Toast, Clover, Lightspeed, and other franchise POS systems to NetSuite for automated weekly sales import and royalty billing triggers.", href: "/netsuite-integrations" },
  { icon: Headphones, title: "Post-Go-Live Support", description: "Ongoing technical support for live franchisor NetSuite accounts: royalty billing maintenance, new location onboarding scripts, POS integration support, and ongoing account optimization.", href: "/netsuite-post-go-live-support" },
  { icon: Users, title: "Administrator Support", description: "Ongoing NetSuite administration for franchise system accounts: franchisee entity setup, agreement record configuration, period close support, and royalty billing troubleshooting.", href: "/netsuite-administrator-support" },
];

const CUSTOMIZATIONS = [
  { title: "Royalty billing automation from POS sales data", description: "Scheduled SuiteScript that reads weekly or monthly sales reports imported from franchisee POS systems, applies the royalty rate per franchise agreement, generates royalty invoices, and posts them to each franchisee&apos;s AR balance without manual calculation or data entry." },
  { title: "Marketing fund contribution billing scripts", description: "Separate billing scripts that calculate marketing fund contributions from franchisee sales, invoice to the marketing fund account at the applicable rate, and produce reconciliation reports showing total fund contributions versus brand marketing spending." },
  { title: "Franchisee entity onboarding workflow", description: "SuiteFlow workflows that create the NetSuite entity record, assign territory, set royalty rate and billing frequency from the franchise agreement, configure POS integration credentials, and trigger the first billing cycle for new franchise locations." },
  { title: "Franchise agreement tracking records", description: "Custom NetSuite record types storing franchise agreement terms: territory definition, royalty rate, marketing fund rate, expiration date, renewal options, and compliance history, with automated alerts when renewal windows open." },
  { title: "AUV and franchisee performance dashboard", description: "SuiteQL saved searches that calculate average unit volume, royalty compliance rate, same-store sales growth, and AR aging by franchisee, presenting the franchise system performance summary for brand leadership and franchise development teams." },
  { title: "Multi-entity franchise system P&L consolidation", description: "Custom saved searches and consolidation scripts that combine company-owned store financials with franchisee royalty and marketing fund revenue, producing the system-wide P&L view that franchise executives and boards require for brand performance review." },
];

const WHY_SP = [
  { icon: ShieldCheck, title: "NetSuite-Certified", description: "Oracle NetSuite SuiteCloud Developer II and Administrator Professional certifications. Verified technical credentials across SuiteScript, SuiteFlow, and the NetSuite platform." },
  { icon: Users, title: "Direct Access", description: "You communicate directly with the person doing the work. No ticket system, no account manager, no offshore handoffs." },
  { icon: RefreshCcw, title: "Context Retained", description: "Ongoing knowledge of your franchise system NetSuite account across every engagement. Each request builds on prior work without re-discovery." },
  { icon: Award, title: "Post-Go-Live Specialist", description: "We work exclusively with companies already live on NetSuite. No implementations. Every engagement is ongoing development and support for an active account." },
];

const COMPARISON = [
  { capability: "Royalty billing", standard: "Manual royalty calculation and invoice preparation", withSP: "Automated royalty scripts reading POS sales data and generating invoices" },
  { capability: "Marketing fund billing", standard: "Separate manual process from royalty billing", withSP: "Distinct billing scripts with separate rates and fund account mapping" },
  { capability: "POS integration", standard: "Manual weekly sales reporting from franchisees", withSP: "Scheduled imports from Square, Toast, Clover, and other POS APIs" },
  { capability: "Franchisee performance", standard: "Manual report compilation from multiple sources", withSP: "SuiteQL AUV, compliance rate, and same-store sales saved searches" },
  { capability: "Agreement tracking", standard: "Spreadsheet franchise agreement expiration tracking", withSP: "Custom NetSuite records with automated renewal window notifications" },
  { capability: "System P&L view", standard: "Manual combination of company-owned and franchise revenue", withSP: "Consolidated saved searches combining all entity types" },
];

const FAQ = [
  { question: "Does NetSuite work for franchise businesses?", answer: "Yes. NetSuite is used by franchise systems for royalty billing, multi-location financial management, franchisee AR tracking, marketing fund accounting, and franchise agreement management. Post-go-live customization is required for automated royalty billing from POS sales data, marketing fund contribution invoicing, POS system integrations, franchisee performance dashboards, and franchise agreement tracking that standard NetSuite billing and project tools do not handle without SuiteScript development." },
  { question: "Can NetSuite automate royalty billing for a franchise system?", answer: "Yes, via SuiteScript. SuitePacific builds scheduled scripts that import franchisee sales data from POS systems (Square, Toast, Clover, or others via API), apply the royalty rate per franchise agreement, calculate royalties due, and generate AR invoices for each franchisee automatically. The billing cycle can be weekly, bi-weekly, or monthly based on the franchise agreement terms." },
  { question: "How does NetSuite handle marketing fund billing for franchisors?", answer: "Marketing fund contributions require separate billing logic from royalties, often at a different percentage rate and credited to a different fund account. SuitePacific builds distinct marketing fund billing scripts that calculate contributions from franchisee sales, invoice at the applicable rate, and produce marketing fund reconciliation reports showing total contributions against brand marketing expenditures." },
  { question: "Can NetSuite integrate with franchise POS systems?", answer: "Yes. SuitePacific builds integrations that connect NetSuite to Square, Toast, Clover, Lightspeed, and other franchise POS platforms via API, importing weekly or daily sales data by location and triggering royalty billing calculations automatically. This eliminates manual franchisee sales reporting and the calculation delays it causes." },
  { question: "Can NetSuite report on franchisee performance across locations?", answer: "Yes, via custom SuiteQL saved searches. SuitePacific builds franchisee performance reporting that calculates AUV (average unit volume), royalty compliance rate, marketing fund contribution rate, year-over-year same-store sales, and AR aging by franchisee. These are built as saved searches and KPI portlets accessible to the franchise development and operations teams." },
  { question: "How does SuitePacific handle franchise agreement tracking in NetSuite?", answer: "Franchise agreement tracking requires custom record types that store territory definitions, royalty rates, marketing fund rates, agreement expiration dates, renewal options, and compliance history by franchisee. SuiteFlow workflows provide automated alerts when renewal windows open or agreements approach expiration, ensuring the franchise development team has advance notice of renewal decisions." },
  { question: "What are common NetSuite customizations for franchise operations?", answer: "Common franchise builds include royalty billing automation from POS data, marketing fund contribution billing scripts, POS system API integrations, franchise agreement tracking records, franchisee onboarding workflows, AUV and performance dashboards, and multi-entity franchise system P&L consolidation." },
  { question: "Who provides NetSuite support for franchise businesses?", answer: "SuitePacific provides NetSuite post-go-live support for franchise systems and franchisors, including royalty billing automation, POS integrations, marketing fund accounting, and franchisee performance reporting, on a month-to-month retainer starting at $799 per month." },
];

export const metadata: Metadata = {
  title: "NetSuite Support for Franchise Operations | SuitePacific",
  description: "NetSuite post-go-live support for franchise businesses. Royalty billing automation, POS integrations, marketing fund billing, franchisee performance reporting, and agreement tracking.",
  alternates: { canonical: "/industries/franchise" },
  openGraph: {
    title: "NetSuite Support for Franchise Operations | SuitePacific",
    description: "NetSuite support for franchisors: automated royalty billing from POS data, marketing fund contribution scripts, franchisee performance dashboards, and agreement tracking.",
    url: `${SITE_URL}/industries/franchise`,
    type: "website",
    images: [{ url: `${SITE_URL}/og-default.png`, width: 1200, height: 630 }],
  },
};

export default function FranchisePage() {
  return (
    <main className="pt-32 pb-24 sm:pt-40 sm:pb-32">
      <BreadcrumbJsonLd items={[{ name: "Home", url: SITE_URL }, { name: "Industries", url: `${SITE_URL}/industries` }, { name: "Franchise Operations", url: `${SITE_URL}/industries/franchise` }]} />
      <FaqJsonLd items={FAQ} />
      <ServiceJsonLd name="NetSuite Support for Franchise Operations" description="NetSuite post-go-live support for franchise systems including royalty billing automation, POS integrations, marketing fund billing, and franchisee performance reporting." url={`${SITE_URL}/industries/franchise`} serviceType="NetSuite Franchise Support" datePublished="2026-09-23T00:00:00+00:00" dateModified="2026-09-23T00:00:00+00:00" offers={[{ name: "Care", price: 799, description: "10 hours/month: royalty billing maintenance, saved searches, and administration for franchise system accounts. Month-to-month after 3-month minimum." }, { name: "Care Plus", price: 1499, description: "20 hours/month: active development including POS integrations, marketing fund billing, and performance reporting. Month-to-month." }, { name: "Care Pro", price: 2499, description: "35 hours/month: full franchise system coverage including billing automation, integrations, and ongoing support. Month-to-month." }]} />
      <OrganizationJsonLd />
      <div className="mx-auto max-w-3xl px-6 lg:px-8">
        <SectionHeading as="h1" eyebrow="Franchise Operations" title="NetSuite Support & Development for Franchise Operations" subtitle="Royalty billing automation, POS integrations, marketing fund billing, and franchisee performance reporting for franchise systems already live on NetSuite." align="left" />
        <div className="mt-6 rounded-2xl border border-brand-100 bg-white p-5 shadow-soft">
          <p className="text-sm text-brand-600 mb-3">Tell us what your franchise system NetSuite account needs.</p>
          <LeadFormLight />
        </div>
        <p className="mt-3 text-xs text-brand-400">NetSuite-Certified · Post-go-live specialist · Sandbox-first development · Month-to-month</p>
        <p className="mt-2 text-xs text-brand-300"><time dateTime="2026-09">Published September 2026</time></p>

        <div className="rounded-2xl border-l-4 border-accent bg-brand-50/50 p-5 mt-8 mb-6">
          <p className="text-xs font-semibold uppercase tracking-wide text-accent mb-2">Quick answer</p>
          <p className="text-sm text-brand-700 leading-relaxed">NetSuite support for franchise operations refers to post-go-live technical assistance covering the royalty billing, marketing fund accounting, POS integration, and franchisee performance reporting workflows that franchise systems require. Standard NetSuite billing does not automate royalty calculations from POS sales data without SuiteScript development. Franchisors need scheduled scripts that import franchisee sales from Square, Toast, Clover, or other POS APIs, apply royalty rates per franchise agreement, and generate invoices automatically each billing cycle. Marketing fund contributions require separate billing logic at different rates. Franchisee performance reporting showing AUV, compliance rates, and same-store sales requires custom SuiteQL saved searches. Agreement expiration tracking and renewal workflows require custom record types. SuitePacific builds and maintains all of these franchise system workflows for franchisors already live on NetSuite, with all development tested in Sandbox before production, on a month-to-month retainer starting at $799 per month after a three-month minimum.</p>
        </div>

        <p className="text-sm text-brand-400 leading-relaxed">Franchise systems that go live on NetSuite commonly find that royalty billing automation, POS integration, and franchisee performance reporting require SuiteScript development that standard NetSuite billing modules do not address. SuitePacific covers this technical layer for franchise accounts already live on NetSuite.</p>

        <div className="mt-14">
          <h2 className="text-lg font-semibold text-brand-900 mb-2">How does SuitePacific extend NetSuite for franchise operations?</h2>
          <p className="text-sm text-brand-400 mb-4">Common capability gaps in standard NetSuite and what SuitePacific adds to fill them.</p>
          <div className="overflow-x-auto">
            <table className="w-full text-sm border-collapse">
              <thead><tr className="border-b border-brand-100"><th className="text-left py-3 pr-6 font-semibold text-brand-900 w-1/3">Capability</th><th className="text-left py-3 pr-6 font-semibold text-brand-900 w-1/3">Standard NetSuite</th><th className="text-left py-3 font-semibold text-brand-900 w-1/3">With SuitePacific</th></tr></thead>
              <tbody>{COMPARISON.map((row) => (<tr key={row.capability} className="border-b border-brand-50"><td className="py-3 pr-6 font-medium text-brand-900 align-top">{row.capability}</td><td className="py-3 pr-6 text-brand-400 align-top">{row.standard}</td><td className="py-3 text-brand-700 align-top">{row.withSP}</td></tr>))}</tbody>
            </table>
          </div>
        </div>

        <div className="mt-14">
          <h2 className="text-lg font-semibold text-brand-900 mb-6">What NetSuite challenges do franchise operations face?</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">{CHALLENGES.map((item) => (<Card key={item.title} className="p-5 flex flex-col gap-3"><IconBadge icon={item.icon} /><h3 className="font-semibold text-brand-900 text-sm">{item.title}</h3><p className="text-sm text-brand-400">{item.description}</p></Card>))}</div>
        </div>

        <div className="mt-14">
          <h2 className="text-lg font-semibold text-brand-900 mb-6">What NetSuite services does SuitePacific provide for franchise operations?</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">{SERVICES.map((service) => (<Link key={service.href} href={service.href} className="group"><Card className="p-5 flex items-start gap-4 h-full group-hover:border-brand-200 transition-colors"><IconBadge icon={service.icon} /><div><h3 className="font-semibold text-brand-900 text-sm group-hover:text-accent transition-colors">{service.title}</h3><p className="mt-1.5 text-sm text-brand-400">{service.description}</p></div></Card></Link>))}</div>
        </div>

        <div className="mt-14">
          <h2 className="text-lg font-semibold text-brand-900 mb-2">What are common NetSuite customizations for franchise operations?</h2>
          <p className="text-sm text-brand-400 mb-6">These are the builds SuitePacific delivers for franchise system accounts on a recurring basis.</p>
          <div className="space-y-4">{CUSTOMIZATIONS.map((item, i) => (<div key={item.title} className="flex items-start gap-5"><span className="text-xs font-semibold text-accent bg-accent/10 rounded-full h-7 w-7 flex items-center justify-center shrink-0 mt-0.5">{String(i + 1).padStart(2, "0")}</span><div><h3 className="font-semibold text-brand-900 text-sm">{item.title}</h3><p className="mt-0.5 text-sm text-brand-400">{item.description}</p></div></div>))}</div>
        </div>

        <div className="mt-14">
          <h2 className="text-lg font-semibold text-brand-900 mb-6">Why do franchise businesses choose SuitePacific?</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">{WHY_SP.map((item) => (<Card key={item.title} className="p-5 flex items-start gap-4"><IconBadge icon={item.icon} /><div><h3 className="font-semibold text-brand-900 text-sm">{item.title}</h3><p className="mt-1.5 text-sm text-brand-400">{item.description}</p></div></Card>))}</div>
          <p className="mt-5 text-sm text-brand-400">For multi-location retail: <Link href="/industries/retail-ecommerce" className="text-accent hover:underline">NetSuite for retail and e-commerce</Link> covers channel order management and multi-location inventory for retail operators.</p>
        </div>

        <ServiceFaqSection items={FAQ} />

        <div className="mt-10 rounded-2xl border border-brand-100 bg-brand-50/30 p-5 sm:p-6">
          <p className="text-sm font-semibold text-brand-900 mb-3">Related reading</p>
          <ul className="space-y-2.5">
            <li className="text-sm text-brand-400"><Link href="/netsuite-integrations" className="text-accent hover:underline">NetSuite integrations</Link>{" "}covers the API connection approach for POS systems, payment processors, and third-party platforms used in franchise operations.</li>
            <li className="text-sm text-brand-400"><Link href="/netsuite-suitescript-development" className="text-accent hover:underline">NetSuite SuiteScript development</Link>{" "}covers the scripting capabilities used for royalty billing automation and marketing fund calculations.</li>
            <li className="text-sm text-brand-400"><Link href="/netsuite-managed-support" className="text-accent hover:underline">NetSuite managed support</Link>{" "}covers the retainer structure, hour tiers, and what is included across all plan levels.</li>
          </ul>
        </div>

        <div className="mt-10 rounded-2xl border border-brand-100 bg-white p-5 shadow-soft"><LeadFormLight /></div>
      </div>
    </main>
  );
}

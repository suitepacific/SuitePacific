import type { Metadata } from "next";
import Link from "next/link";
import { TrendingUp, FileText, BarChart2, Workflow, Code2, ShieldCheck, RefreshCcw, Award, Headphones, Plug, Users, DollarSign, Layers, Building } from "lucide-react";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Card } from "@/components/ui/Card";
import { IconBadge } from "@/components/ui/IconBadge";
import { BreadcrumbJsonLd, FaqJsonLd, ServiceJsonLd, OrganizationJsonLd } from "@/components/seo/JsonLd";
import { ServiceFaqSection } from "@/components/ui/ServiceFaqSection";
import { LeadFormLight } from "@/components/sections/LeadFormLight";
import { SITE_URL } from "@/lib/content";

const CHALLENGES = [
  { icon: Building, title: "Portfolio company consolidation", description: "Private equity firms and family offices holding multiple operating subsidiaries need consolidated financial statements that eliminate intercompany transactions, apply minority interest adjustments, and present at-the-fund or at-the-holding-company level. Standard NetSuite consolidation requires custom scripts for eliminations on non-standard intercompany flows." },
  { icon: DollarSign, title: "Capital call and distribution tracking", description: "LP capital calls, management fee billing to LPs, and waterfall distribution calculations require custom NetSuite records and scripts that track committed versus funded capital by LP, apply the fund&apos;s waterfall structure, and produce distribution notices." },
  { icon: BarChart2, title: "Investor reporting metrics", description: "Fund-level reporting showing IRR, MOIC (Multiple on Invested Capital), DPI (Distributions to Paid-In), TVPI, and portfolio company EBITDA requires custom SuiteQL saved searches that aggregate data across subsidiaries and apply investment performance calculations." },
  { icon: Layers, title: "Management fee billing", description: "Quarterly management fee invoices to portfolio companies, LPs, or advisory clients based on committed capital, AUM, or EBITDA percentage require custom billing scripts that read the applicable fee schedule and generate invoices without manual calculation." },
  { icon: FileText, title: "Multi-entity intercompany eliminations", description: "Eliminating intercompany loans, dividends, management fees, and shared cost allocations across holding company structures requires User Event scripts and period-end workflows that post the elimination journal entries and reconcile intercompany balances at close." },
  { icon: TrendingUp, title: "Portfolio company performance dashboards", description: "Consolidated dashboards showing portfolio company revenue growth, EBITDA margin, working capital, and covenant compliance across all subsidiaries require custom saved searches and KPI portlets that pull from multiple NetSuite entities simultaneously." },
];

const SERVICES = [
  { icon: Code2, title: "SuiteScript Development", description: "Custom scripts for waterfall distribution calculations, management fee billing, capital call tracking, intercompany elimination journal entries, IRR/MOIC calculations, and LP reporting exports.", href: "/netsuite-suitescript-development" },
  { icon: Workflow, title: "Workflow Automation", description: "SuiteFlow workflows for period-end intercompany elimination, capital call approval and release, distribution authorization, management fee invoice generation, and portfolio company budget approval chains.", href: "/netsuite-workflow-automation" },
  { icon: BarChart2, title: "Saved Searches & Dashboards", description: "Portfolio company EBITDA bridge, fund-level IRR and MOIC, LP capital account balances, intercompany balance reconciliation, and management fee receivables saved searches built with SuiteQL.", href: "/netsuite-saved-searches-dashboards" },
  { icon: Plug, title: "NetSuite Integrations", description: "Integrations connecting NetSuite to portfolio company accounting systems, LP portal platforms, fund administration software, and treasury management tools for consolidated financial reporting.", href: "/netsuite-integrations" },
  { icon: Headphones, title: "Post-Go-Live Support", description: "Ongoing technical support for live PE firm and family office NetSuite accounts: intercompany elimination maintenance, new entity onboarding, distribution calculations, and ongoing account optimization.", href: "/netsuite-post-go-live-support" },
  { icon: Users, title: "Administrator Support", description: "Ongoing NetSuite administration for PE and family office accounts: subsidiary record management, period close support, intercompany configuration, and platform troubleshooting.", href: "/netsuite-administrator-support" },
];

const CUSTOMIZATIONS = [
  { title: "Waterfall distribution calculation scripts", description: "SuiteScript that reads fund investment records, applies the fund&apos;s specific waterfall structure (preferred return hurdle, catch-up, carried interest), calculates each LP&apos;s distribution amount, and creates the distribution records and notices for GP review before disbursement." },
  { title: "Management fee billing automation", description: "Scheduled scripts that read LP capital commitment records, apply the applicable fee rate by LP class or commitment size, calculate the quarterly management fee, and generate LP invoices or offset entries against LP capital accounts according to the fund&apos;s management fee structure." },
  { title: "Intercompany elimination workflows", description: "Period-end SuiteFlow workflows that identify intercompany receivable and payable balances across subsidiaries, post matching elimination journal entries, and flag any reconciling differences for finance team review before consolidation close." },
  { title: "Fund-level IRR and MOIC reporting", description: "SuiteQL saved searches that aggregate LP capital contributions and distributions by fund and vintage year, applying IRR and MOIC calculations to produce investment performance metrics for fund-level and portfolio company-level reporting to LPs and the investment committee." },
  { title: "Capital call tracking and LP capital accounts", description: "Custom NetSuite records that store each LP&apos;s committed capital, cumulative calls, distributions, and current NAV, with User Event scripts that update capital account balances when capital call payments are received and distributions are posted." },
  { title: "Portfolio company performance dashboard", description: "Consolidated saved searches and KPI portlets that pull revenue, EBITDA, and working capital metrics from multiple subsidiary NetSuite entities, presenting the portfolio company performance summary on a single dashboard for deal team and board reporting." },
];

const WHY_SP = [
  { icon: ShieldCheck, title: "NetSuite-Certified", description: "Oracle NetSuite SuiteCloud Developer II and Administrator Professional certifications. Verified technical credentials across SuiteScript, SuiteFlow, and the NetSuite platform." },
  { icon: Users, title: "Direct Access", description: "You communicate directly with the person doing the work. No ticket system, no account manager, no offshore handoffs." },
  { icon: RefreshCcw, title: "Context Retained", description: "Ongoing knowledge of your PE firm or family office NetSuite account across every engagement. Each request builds on prior work without re-discovery." },
  { icon: Award, title: "Post-Go-Live Specialist", description: "We work exclusively with companies already live on NetSuite. No implementations. Every engagement is ongoing development and support for an active account." },
];

const COMPARISON = [
  { capability: "Portfolio consolidation", standard: "Manual consolidation outside NetSuite with spreadsheets", withSP: "Automated intercompany elimination scripts and consolidated reporting" },
  { capability: "Waterfall distributions", standard: "Manual waterfall calculations in Excel before each distribution", withSP: "Scripts applying fund waterfall structure and generating distribution amounts" },
  { capability: "Management fee billing", standard: "Manual quarterly fee calculation and invoice preparation", withSP: "Scheduled scripts generating LP invoices from capital commitment records" },
  { capability: "Investor metrics (IRR/MOIC)", standard: "Separate spreadsheet model maintained outside NetSuite", withSP: "SuiteQL searches calculating IRR/MOIC from NetSuite capital account records" },
  { capability: "Capital call tracking", standard: "Spreadsheet LP capital account ledgers separate from NetSuite", withSP: "Custom NetSuite records with real-time LP capital account balances" },
  { capability: "Portfolio KPI dashboard", standard: "Manual consolidation from subsidiary report exports", withSP: "Cross-entity saved searches feeding a single portfolio dashboard" },
];

const FAQ = [
  { question: "Does NetSuite work for private equity firms and family offices?", answer: "Yes. NetSuite is used by private equity firms, family offices, and holding companies for multi-entity financial management, portfolio company consolidation, management fee billing, and LP reporting. Post-go-live customization is required for waterfall distribution calculations, intercompany elimination workflows, IRR/MOIC reporting, capital call tracking, and management fee billing automation that standard NetSuite does not handle without SuiteScript development." },
  { question: "Can NetSuite handle multi-entity consolidation for private equity?", answer: "Yes. NetSuite supports multi-entity consolidation natively, but intercompany eliminations on non-standard flows (management fees charged to subsidiaries, intercompany loans, shared cost allocations) require custom User Event scripts and period-end workflows. SuitePacific builds the elimination logic that ensures consolidated financial statements match the entity structure of the PE firm or family office holding company." },
  { question: "Can NetSuite calculate waterfall distributions for a private equity fund?", answer: "Not natively. Waterfall calculations require custom SuiteScript that reads LP capital account balances, applies the fund&apos;s preferred return hurdle, catch-up provision, and carried interest percentage, and produces the distribution amounts by LP class. SuitePacific builds waterfall calculation scripts that match the specific economics of each fund&apos;s limited partnership agreement." },
  { question: "How does NetSuite track LP capital accounts for private equity?", answer: "LP capital account tracking requires custom record types that store each LP&apos;s committed capital, cumulative capital contributions, distributions received, and current unrealized NAV. User Event scripts update LP capital account balances when capital call payments post and distributions are recorded. SuitePacific builds and maintains these LP capital account structures for fund managers on NetSuite." },
  { question: "Can NetSuite produce IRR and MOIC reporting?", answer: "Yes, via custom SuiteQL saved searches. SuitePacific builds investment performance reporting that aggregates LP capital contributions and distribution amounts from NetSuite records, applying IRR and MOIC calculations to produce fund-level and portfolio company-level performance metrics for LP reporting and investment committee presentations." },
  { question: "How does management fee billing work in NetSuite for PE firms?", answer: "Quarterly management fee billing requires scheduled SuiteScript that reads LP capital commitment records, applies the fee schedule (often a percentage of committed or invested capital, tiered by LP class), calculates the fee amount, and generates LP invoices or capital account offset entries. SuitePacific builds management fee billing automation for PE firms and family offices on a retainer basis." },
  { question: "What are common NetSuite customizations for private equity and family offices?", answer: "Common PE and family office builds include waterfall distribution calculation scripts, management fee billing automation, intercompany elimination workflows, LP capital account custom records, IRR and MOIC reporting with SuiteQL, portfolio company EBITDA dashboard, capital call tracking, and cross-entity performance KPI portlets." },
  { question: "Who provides NetSuite support for private equity firms and family offices?", answer: "SuitePacific provides NetSuite post-go-live support for private equity firms, family offices, and multi-entity holding companies, including consolidation builds, waterfall distribution scripts, LP capital account records, and management fee billing automation, on a month-to-month retainer starting at $799 per month." },
];

export const metadata: Metadata = {
  title: "NetSuite Support for Private Equity & Family Offices | SuitePacific",
  description: "NetSuite post-go-live support for PE firms and family offices. Portfolio consolidation, waterfall distributions, LP capital tracking, and management fees.",
  alternates: { canonical: "/industries/private-equity" },
  openGraph: {
    title: "NetSuite Support for Private Equity & Family Offices | SuitePacific",
    description: "NetSuite support for PE firms and family offices: portfolio consolidation, waterfall distribution scripts, LP capital tracking, and management fee billing automation.",
    url: `${SITE_URL}/industries/private-equity`,
    type: "website",
    images: [{ url: `${SITE_URL}/og-default.png`, width: 1200, height: 630 }],
  },
};

export default function PrivateEquityPage() {
  return (
    <main className="pt-32 pb-24 sm:pt-40 sm:pb-32">
      <BreadcrumbJsonLd items={[{ name: "Home", url: SITE_URL }, { name: "Industries", url: `${SITE_URL}/industries` }, { name: "Private Equity & Family Office", url: `${SITE_URL}/industries/private-equity` }]} />
      <FaqJsonLd items={FAQ} />
      <ServiceJsonLd name="NetSuite Support for Private Equity & Family Offices" description="NetSuite post-go-live support for PE firms and family offices including portfolio consolidation, waterfall distributions, LP capital tracking, and management fee billing." url={`${SITE_URL}/industries/private-equity`} serviceType="NetSuite Private Equity Support" datePublished="2026-09-23T00:00:00+00:00" dateModified="2026-09-23T00:00:00+00:00" offers={[{ name: "Care", price: 799, description: "10 hours/month: consolidation maintenance, saved searches, and administration for PE and family office accounts. Month-to-month after 3-month minimum." }, { name: "Care Plus", price: 1499, description: "20 hours/month: active development including waterfall scripts, LP tracking, and management fee billing. Month-to-month." }, { name: "Care Pro", price: 2499, description: "35 hours/month: full PE account coverage including portfolio consolidation, IRR reporting, and ongoing support. Month-to-month." }]} />
      <OrganizationJsonLd />
      <div className="mx-auto max-w-3xl px-6 lg:px-8">
        <SectionHeading as="h1" eyebrow="Private Equity & Family Office" title="NetSuite Support & Development for Private Equity Firms & Family Offices" subtitle="Portfolio consolidation, waterfall distribution scripts, LP capital account tracking, and management fee billing for PE firms already live on NetSuite." align="left" />
        <div className="mt-6 rounded-2xl border border-brand-100 bg-white p-5 shadow-soft">
          <p className="text-sm text-brand-600 mb-3">Tell us what your PE firm or family office NetSuite account needs.</p>
          <LeadFormLight />
        </div>
        <p className="mt-3 text-xs text-brand-400">NetSuite-Certified · Post-go-live specialist · Sandbox-first development · Month-to-month</p>
        <p className="mt-2 text-xs text-brand-300"><time dateTime="2026-09">Published September 2026</time></p>

        <div className="rounded-2xl border-l-4 border-accent bg-brand-50/50 p-5 mt-8 mb-6">
          <p className="text-xs font-semibold uppercase tracking-wide text-accent mb-2">Quick answer</p>
          <p className="text-sm text-brand-700 leading-relaxed">NetSuite support for private equity firms and family offices refers to post-go-live technical assistance covering the multi-entity consolidation, fund economics, and investor reporting workflows that these organizations require. Standard NetSuite consolidation supports basic intercompany eliminations, but PE-specific workflows including waterfall distribution calculations, LP capital account tracking, management fee billing to portfolio companies or LPs, IRR and MOIC reporting, and cross-entity EBITDA dashboards all require SuiteScript development and custom record types. SuitePacific builds waterfall scripts that apply the fund&apos;s preferred return hurdle and carried interest economics, scheduled management fee billing automation from LP capital commitment records, intercompany elimination workflows for period-end close, and SuiteQL investment performance reporting. Family office accounts with complex ownership structures and multiple operating subsidiaries require the same consolidation and elimination work. All development is tested in Sandbox before production deployment, on a month-to-month retainer starting at $799 per month after a three-month minimum.</p>
        </div>

        <p className="text-sm text-brand-400 leading-relaxed">Private equity firms and family offices that go live on NetSuite commonly find that waterfall distributions, LP capital tracking, and consolidated portfolio reporting require SuiteScript development beyond what standard NetSuite multi-entity consolidation provides. SuitePacific covers this technical layer for PE and family office accounts already live on NetSuite.</p>

        <div className="mt-14">
          <h2 className="text-lg font-semibold text-brand-900 mb-2">How does SuitePacific extend NetSuite for private equity firms?</h2>
          <p className="text-sm text-brand-400 mb-4">Common capability gaps in standard NetSuite and what SuitePacific adds to fill them.</p>
          <div className="overflow-x-auto">
            <table className="w-full text-sm border-collapse">
              <thead><tr className="border-b border-brand-100"><th className="text-left py-3 pr-6 font-semibold text-brand-900 w-1/3">Capability</th><th className="text-left py-3 pr-6 font-semibold text-brand-900 w-1/3">Standard NetSuite</th><th className="text-left py-3 font-semibold text-brand-900 w-1/3">With SuitePacific</th></tr></thead>
              <tbody>{COMPARISON.map((row) => (<tr key={row.capability} className="border-b border-brand-50"><td className="py-3 pr-6 font-medium text-brand-900 align-top">{row.capability}</td><td className="py-3 pr-6 text-brand-400 align-top">{row.standard}</td><td className="py-3 text-brand-700 align-top">{row.withSP}</td></tr>))}</tbody>
            </table>
          </div>
        </div>

        <div className="mt-14">
          <h2 className="text-lg font-semibold text-brand-900 mb-6">What NetSuite challenges do private equity firms and family offices face?</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">{CHALLENGES.map((item) => (<Card key={item.title} className="p-5 flex flex-col gap-3"><IconBadge icon={item.icon} /><h3 className="font-semibold text-brand-900 text-sm">{item.title}</h3><p className="text-sm text-brand-400">{item.description}</p></Card>))}</div>
        </div>

        <div className="mt-14">
          <h2 className="text-lg font-semibold text-brand-900 mb-6">What NetSuite services does SuitePacific provide for PE firms and family offices?</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">{SERVICES.map((service) => (<Link key={service.href} href={service.href} className="group"><Card className="p-5 flex items-start gap-4 h-full group-hover:border-brand-200 transition-colors"><IconBadge icon={service.icon} /><div><h3 className="font-semibold text-brand-900 text-sm group-hover:text-accent transition-colors">{service.title}</h3><p className="mt-1.5 text-sm text-brand-400">{service.description}</p></div></Card></Link>))}</div>
        </div>

        <div className="mt-14">
          <h2 className="text-lg font-semibold text-brand-900 mb-2">What are common NetSuite customizations for private equity firms and family offices?</h2>
          <p className="text-sm text-brand-400 mb-6">These are the builds SuitePacific delivers for PE and family office accounts on a recurring basis.</p>
          <div className="space-y-4">{CUSTOMIZATIONS.map((item, i) => (<div key={item.title} className="flex items-start gap-5"><span className="text-xs font-semibold text-accent bg-accent/10 rounded-full h-7 w-7 flex items-center justify-center shrink-0 mt-0.5">{String(i + 1).padStart(2, "0")}</span><div><h3 className="font-semibold text-brand-900 text-sm">{item.title}</h3><p className="mt-0.5 text-sm text-brand-400">{item.description}</p></div></div>))}</div>
        </div>

        <div className="mt-14">
          <h2 className="text-lg font-semibold text-brand-900 mb-6">Why do private equity firms and family offices choose SuitePacific?</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">{WHY_SP.map((item) => (<Card key={item.title} className="p-5 flex items-start gap-4"><IconBadge icon={item.icon} /><div><h3 className="font-semibold text-brand-900 text-sm">{item.title}</h3><p className="mt-1.5 text-sm text-brand-400">{item.description}</p></div></Card>))}</div>
          <p className="mt-5 text-sm text-brand-400">Also for multi-entity real estate holding structures: <Link href="/industries/real-estate" className="text-accent hover:underline">NetSuite for real estate</Link> covers property-level reporting and multi-entity consolidation for real estate investors.</p>
        </div>

        <ServiceFaqSection items={FAQ} />

        <div className="mt-10 rounded-2xl border border-brand-100 bg-brand-50/30 p-5 sm:p-6">
          <p className="text-sm font-semibold text-brand-900 mb-3">Related reading</p>
          <ul className="space-y-2.5">
            <li className="text-sm text-brand-400"><Link href="/netsuite-suitescript-development" className="text-accent hover:underline">NetSuite SuiteScript development</Link>{" "}covers the scripting capabilities used for waterfall calculations, management fee billing, and LP capital account automation.</li>
            <li className="text-sm text-brand-400"><Link href="/netsuite-saved-searches-dashboards" className="text-accent hover:underline">NetSuite saved searches and dashboards</Link>{" "}covers SuiteQL development for portfolio performance, IRR/MOIC reporting, and cross-entity KPI dashboards.</li>
            <li className="text-sm text-brand-400"><Link href="/netsuite-managed-support" className="text-accent hover:underline">NetSuite managed support</Link>{" "}covers the retainer structure, hour tiers, and what is included across all plan levels.</li>
          </ul>
        </div>

        <div className="mt-10 rounded-2xl border border-brand-100 bg-white p-5 shadow-soft"><LeadFormLight /></div>
      </div>
    </main>
  );
}

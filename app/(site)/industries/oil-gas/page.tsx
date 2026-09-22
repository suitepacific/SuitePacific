import type { Metadata } from "next";
import Link from "next/link";
import { FlameKindling, FileText, BarChart2, Workflow, Code2, ShieldCheck, RefreshCcw, Award, Headphones, Plug, Users, DollarSign, Layers, GitMerge } from "lucide-react";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Card } from "@/components/ui/Card";
import { IconBadge } from "@/components/ui/IconBadge";
import { BreadcrumbJsonLd, FaqJsonLd, ServiceJsonLd, OrganizationJsonLd } from "@/components/seo/JsonLd";
import { ServiceFaqSection } from "@/components/ui/ServiceFaqSection";
import { LeadFormLight } from "@/components/sections/LeadFormLight";
import { SITE_URL } from "@/lib/content";

const CHALLENGES = [
  { icon: FileText, title: "Authorization for Expenditure (AFE)", description: "AFE approval workflows for capital and operating expenditures in upstream oil and gas require custom SuiteFlow workflows that route approvals by well, field, operator, and cost threshold, with NetSuite spending no standard module handling this structure." },
  { icon: GitMerge, title: "Joint Interest Billing (JIB)", description: "JIB statements to working interest partners require custom SuiteScript that reads cost allocation percentages from project records, applies the correct working interest share to each cost category, and generates partner-ready billing statements outside standard NetSuite invoicing." },
  { icon: DollarSign, title: "Royalty calculations", description: "Monthly royalty payments to mineral rights owners require scripts that read production volumes and commodity prices, apply the lease-specified royalty rate, calculate net revenue after severance taxes and deductions, and produce 1099 payment records for royalty owners." },
  { icon: Layers, title: "Production accounting", description: "Allocating field-level production volumes to individual wells, lease operating expense (LOE) tracking by well and field, and production revenue attribution by working interest require custom NetSuite records and saved searches that standard project accounting does not address." },
  { icon: BarChart2, title: "Division order management", description: "Division orders defining each party&apos;s decimal interest in a well require custom records that store interest percentages per party, update when interests are conveyed or revised, and drive automated JIB and royalty calculations downstream." },
  { icon: Plug, title: "Production and field data integration", description: "Oil and gas companies using production management, SCADA, or land administration systems need integrations that push production volumes, well costs, and land data to NetSuite for financial reporting without manual data re-entry." },
];

const SERVICES = [
  { icon: Code2, title: "SuiteScript Development", description: "Custom scripts for JIB statement generation, royalty calculation, AFE cost tracking, division order arithmetic, production revenue attribution, and 1099 royalty owner payment records.", href: "/netsuite-suitescript-development" },
  { icon: Workflow, title: "Workflow Automation", description: "SuiteFlow workflows for AFE approval routing by well and cost threshold, JIB review and release, royalty payment authorization, and lease operating expense approval chains.", href: "/netsuite-workflow-automation" },
  { icon: BarChart2, title: "Saved Searches & Dashboards", description: "LOE per BOE by well, JIB receivables by partner, production revenue by field, royalty payables aging, and AFE commitment versus actual saved searches built with SuiteQL.", href: "/netsuite-saved-searches-dashboards" },
  { icon: Plug, title: "NetSuite Integrations", description: "Scheduled script integrations connecting NetSuite to production management platforms, SCADA systems, land administration software, and commodity pricing feeds.", href: "/netsuite-integrations" },
  { icon: Headphones, title: "Post-Go-Live Support", description: "Ongoing technical support for live oil and gas NetSuite accounts: AFE and JIB development, production accounting builds, release testing, and account upkeep on a month-to-month retainer.", href: "/netsuite-post-go-live-support" },
  { icon: Users, title: "Administrator Support", description: "Ongoing NetSuite administration for E&P accounts: role management, period close support, working interest record configuration, and platform troubleshooting.", href: "/netsuite-administrator-support" },
];

const CUSTOMIZATIONS = [
  { title: "JIB statement generation scripts", description: "SuiteScript that reads well cost records, applies each working interest partner&apos;s decimal interest to cost categories, and generates formatted JIB statements with authorization-for-expenditure reference numbers for partner billing." },
  { title: "AFE approval workflow with cost category routing", description: "SuiteFlow workflows that route AFE approval requests by well, field, cost category, and dollar threshold, with email notifications to operator and non-operator representatives at each approval stage." },
  { title: "Royalty calculation and 1099 production scripts", description: "Scheduled scripts that read monthly production volumes and commodity pricing, apply lease royalty rates and post-production deductions, calculate net royalty due per owner, and create NetSuite payment records for royalty distribution." },
  { title: "Division order and working interest records", description: "Custom NetSuite record types storing decimal interest percentages by well and owner, with User Event scripts that update downstream JIB and royalty calculations when interests are revised or conveyed." },
  { title: "Lease operating expense (LOE) reporting", description: "SuiteQL saved searches that aggregate lifting costs by well, field, and operator, calculating LOE per BOE against production volumes for field-level profitability analysis." },
  { title: "Production data integration scripts", description: "RESTlet endpoints and scheduled scripts that receive daily production volumes from field data platforms, creating NetSuite revenue and cost records for financial period close without manual data entry." },
];

const WHY_SP = [
  { icon: ShieldCheck, title: "NetSuite-Certified", description: "Oracle NetSuite SuiteCloud Developer II and Administrator Professional certifications. Verified technical credentials across SuiteScript, SuiteFlow, and the NetSuite platform." },
  { icon: Users, title: "Direct Access", description: "You communicate directly with the person doing the work. No ticket system, no account manager, no offshore handoffs." },
  { icon: RefreshCcw, title: "Context Retained", description: "Ongoing knowledge of your E&P NetSuite account across every engagement. Each request builds on prior work without re-discovery." },
  { icon: Award, title: "Post-Go-Live Specialist", description: "We work exclusively with companies already live on NetSuite. No implementations. Every engagement is ongoing development and support for an active account." },
];

const COMPARISON = [
  { capability: "AFE approval routing", standard: "Manual email approval outside NetSuite", withSP: "SuiteFlow workflows routing by well, field, and cost threshold" },
  { capability: "JIB statements", standard: "Manual partner billing outside NetSuite", withSP: "Scripts generating formatted JIB statements from working interest records" },
  { capability: "Royalty calculations", standard: "External spreadsheet royalty calculations", withSP: "Scheduled scripts calculating royalties from production volumes and lease rates" },
  { capability: "Division order tracking", standard: "Spreadsheet decimal interest records", withSP: "Custom NetSuite records driving downstream JIB and royalty arithmetic" },
  { capability: "LOE reporting", standard: "Standard project cost reports without well breakdown", withSP: "SuiteQL saved searches for LOE per BOE by well and field" },
  { capability: "Production data integration", standard: "Manual production data entry into NetSuite", withSP: "Scheduled scripts ingesting production volumes from field data systems" },
];

const FAQ = [
  { question: "Does NetSuite work for oil and gas companies?", answer: "Yes. NetSuite is used by upstream E&P operators, midstream companies, oilfield services firms, and mineral rights holding companies for financial management, project cost tracking, and partner billing. Post-go-live customization is typically required for AFE approval workflows, JIB statement generation, royalty calculations, division order management, and production accounting that standard NetSuite modules do not handle without SuiteScript development." },
  { question: "What is Joint Interest Billing (JIB) in NetSuite?", answer: "JIB refers to billing working interest partners for their proportionate share of well operating costs. NetSuite does not have native JIB functionality. SuitePacific builds SuiteScript that reads cost allocation records, applies each partner&apos;s decimal interest to cost categories, and generates formatted JIB billing statements. Division order records stored in NetSuite drive the interest percentages used in billing calculations." },
  { question: "Can NetSuite handle AFE approval workflows?", answer: "Yes, via SuiteFlow. Authorization for Expenditure workflows require custom approval routing by well, field, cost category, and dollar threshold. SuitePacific builds SuiteFlow workflows that present AFE requests to the appropriate approvers, notify operators and non-operators by email, track approval status, and update AFE cost commitment records in NetSuite when approvals are received." },
  { question: "How does royalty calculation work in NetSuite for E&P companies?", answer: "Royalty calculations require scheduled SuiteScript that reads monthly production volumes, applies the current commodity price, deducts severance taxes and post-production costs per lease terms, and applies the royalty owner&apos;s decimal interest to compute net royalties due. SuitePacific builds these calculation scripts along with the payment records and 1099 reporting logic required for royalty owner distributions." },
  { question: "What is division order management in NetSuite for oil and gas?", answer: "Division orders define each party&apos;s decimal interest in a producing well or unit. SuitePacific builds custom NetSuite record types that store decimal interest percentages by well and owner. User Event scripts propagate interest updates to downstream JIB and royalty calculations when interests change due to conveyances, working interest sales, or order revisions." },
  { question: "Can NetSuite integrate with production management or SCADA systems?", answer: "Yes, via RESTlet endpoints and scheduled scripts. SuitePacific builds integrations that receive daily production volumes from field data platforms, SCADA systems, or land administration software via API, creating the corresponding NetSuite revenue and cost records for period close. This eliminates manual data entry of production volumes into NetSuite." },
  { question: "What are common NetSuite customizations for oil and gas companies?", answer: "Common E&P builds include AFE approval workflow development, JIB statement generation scripts, royalty calculation and 1099 payment scripts, division order decimal interest records, lease operating expense reporting by well, production data integration with field systems, and working interest partner portal configurations." },
  { question: "Who provides NetSuite support for oil and gas companies?", answer: "SuitePacific provides NetSuite post-go-live support for upstream E&P operators, oilfield services companies, and mineral rights holding companies, including AFE workflows, JIB billing scripts, royalty calculations, and production accounting, on a month-to-month retainer starting at $799 per month." },
];

export const metadata: Metadata = {
  title: "NetSuite Support for Oil & Gas Companies | SuitePacific",
  description: "NetSuite post-go-live support for oil and gas companies. AFE workflows, JIB billing, royalty calculations, division order management, and production accounting.",
  alternates: { canonical: "/industries/oil-gas" },
  openGraph: {
    title: "NetSuite Support for Oil & Gas Companies | SuitePacific",
    description: "NetSuite support for E&P companies: AFE workflows, JIB statement generation, royalty calculation scripts, and production accounting for upstream oil and gas.",
    url: `${SITE_URL}/industries/oil-gas`,
    type: "website",
    images: [{ url: `${SITE_URL}/og-default.png`, width: 1200, height: 630 }],
  },
};

export default function OilGasPage() {
  return (
    <main className="pt-32 pb-24 sm:pt-40 sm:pb-32">
      <BreadcrumbJsonLd items={[{ name: "Home", url: SITE_URL }, { name: "Industries", url: `${SITE_URL}/industries` }, { name: "Oil & Gas", url: `${SITE_URL}/industries/oil-gas` }]} />
      <FaqJsonLd items={FAQ} />
      <ServiceJsonLd name="NetSuite Support for Oil & Gas Companies" description="NetSuite post-go-live support for oil and gas companies including AFE workflows, JIB billing, royalty calculations, and production accounting." url={`${SITE_URL}/industries/oil-gas`} serviceType="NetSuite Oil Gas Support" datePublished="2026-09-23T00:00:00+00:00" dateModified="2026-09-23T00:00:00+00:00" offers={[{ name: "Care", price: 799, description: "10 hours/month: SuiteScript, workflow automation, saved searches, and administration for E&P accounts. Month-to-month after 3-month minimum." }, { name: "Care Plus", price: 1499, description: "20 hours/month: active E&P development including AFE workflows, JIB billing, and royalty calculation scripts. Month-to-month." }, { name: "Care Pro", price: 2499, description: "35 hours/month: full E&P account coverage including production accounting, integrations, and ongoing support. Month-to-month." }]} />
      <OrganizationJsonLd />
      <div className="mx-auto max-w-3xl px-6 lg:px-8">
        <SectionHeading as="h1" eyebrow="Oil & Gas" title="NetSuite Support & Development for Oil & Gas Companies" subtitle="AFE approval workflows, JIB billing scripts, royalty calculations, and production accounting for E&P companies already live on NetSuite." align="left" />
        <div className="mt-6 rounded-2xl border border-brand-100 bg-white p-5 shadow-soft">
          <p className="text-sm text-brand-600 mb-3">Tell us what your E&P NetSuite account needs.</p>
          <LeadFormLight />
        </div>
        <p className="mt-3 text-xs text-brand-400">NetSuite-Certified · Post-go-live specialist · Sandbox-first development · Month-to-month</p>
        <p className="mt-2 text-xs text-brand-300"><time dateTime="2026-09">Published September 2026</time></p>

        <div className="rounded-2xl border-l-4 border-accent bg-brand-50/50 p-5 mt-8 mb-6">
          <p className="text-xs font-semibold uppercase tracking-wide text-accent mb-2">Quick answer</p>
          <p className="text-sm text-brand-700 leading-relaxed">NetSuite support for oil and gas companies refers to post-go-live technical assistance for the upstream E&P, midstream, and oilfield services workflows that standard NetSuite does not handle natively: Authorization for Expenditure (AFE) approval routing by well and cost threshold, Joint Interest Billing (JIB) statement generation to working interest partners, royalty calculations from production volumes and lease terms, division order decimal interest management, and lease operating expense reporting by well. Oil and gas companies on NetSuite typically require SuiteScript that generates formatted JIB statements from working interest records, scheduled royalty calculation scripts that produce 1099 payments for mineral owners, and SuiteFlow workflows routing AFE approvals to operators and non-operators. Integration with production management platforms and SCADA systems requires RESTlet or scheduled script development. SuitePacific provides this development and ongoing support for live E&P NetSuite accounts on a month-to-month retainer starting at $799 per month.</p>
        </div>

        <p className="text-sm text-brand-400 leading-relaxed">Oil and gas companies that go live on NetSuite commonly find that AFE approval workflows, JIB billing, and royalty calculations require SuiteScript development that standard NetSuite project accounting does not address. SuitePacific covers this technical layer for E&P accounts already live on NetSuite.</p>

        <div className="mt-14">
          <h2 className="text-lg font-semibold text-brand-900 mb-2">How does SuitePacific extend NetSuite for oil and gas companies?</h2>
          <p className="text-sm text-brand-400 mb-4">Common capability gaps in standard NetSuite and what SuitePacific adds to fill them.</p>
          <div className="overflow-x-auto">
            <table className="w-full text-sm border-collapse">
              <thead><tr className="border-b border-brand-100"><th className="text-left py-3 pr-6 font-semibold text-brand-900 w-1/3">Capability</th><th className="text-left py-3 pr-6 font-semibold text-brand-900 w-1/3">Standard NetSuite</th><th className="text-left py-3 font-semibold text-brand-900 w-1/3">With SuitePacific</th></tr></thead>
              <tbody>{COMPARISON.map((row) => (<tr key={row.capability} className="border-b border-brand-50"><td className="py-3 pr-6 font-medium text-brand-900 align-top">{row.capability}</td><td className="py-3 pr-6 text-brand-400 align-top">{row.standard}</td><td className="py-3 text-brand-700 align-top">{row.withSP}</td></tr>))}</tbody>
            </table>
          </div>
        </div>

        <div className="mt-14">
          <h2 className="text-lg font-semibold text-brand-900 mb-6">What NetSuite challenges do oil and gas companies face?</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">{CHALLENGES.map((item) => (<Card key={item.title} className="p-5 flex flex-col gap-3"><IconBadge icon={item.icon} /><h3 className="font-semibold text-brand-900 text-sm">{item.title}</h3><p className="text-sm text-brand-400">{item.description}</p></Card>))}</div>
        </div>

        <div className="mt-14">
          <h2 className="text-lg font-semibold text-brand-900 mb-6">What NetSuite services does SuitePacific provide for oil and gas companies?</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">{SERVICES.map((service) => (<Link key={service.href} href={service.href} className="group"><Card className="p-5 flex items-start gap-4 h-full group-hover:border-brand-200 transition-colors"><IconBadge icon={service.icon} /><div><h3 className="font-semibold text-brand-900 text-sm group-hover:text-accent transition-colors">{service.title}</h3><p className="mt-1.5 text-sm text-brand-400">{service.description}</p></div></Card></Link>))}</div>
        </div>

        <div className="mt-14">
          <h2 className="text-lg font-semibold text-brand-900 mb-2">What are common NetSuite customizations for oil and gas companies?</h2>
          <p className="text-sm text-brand-400 mb-6">These are the builds SuitePacific delivers for E&P accounts on a recurring basis.</p>
          <div className="space-y-4">{CUSTOMIZATIONS.map((item, i) => (<div key={item.title} className="flex items-start gap-5"><span className="text-xs font-semibold text-accent bg-accent/10 rounded-full h-7 w-7 flex items-center justify-center shrink-0 mt-0.5">{String(i + 1).padStart(2, "0")}</span><div><h3 className="font-semibold text-brand-900 text-sm">{item.title}</h3><p className="mt-0.5 text-sm text-brand-400">{item.description}</p></div></div>))}</div>
        </div>

        <div className="mt-14">
          <h2 className="text-lg font-semibold text-brand-900 mb-6">Why do oil and gas companies choose SuitePacific?</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">{WHY_SP.map((item) => (<Card key={item.title} className="p-5 flex items-start gap-4"><IconBadge icon={item.icon} /><div><h3 className="font-semibold text-brand-900 text-sm">{item.title}</h3><p className="mt-1.5 text-sm text-brand-400">{item.description}</p></div></Card>))}</div>
          <p className="mt-5 text-sm text-brand-400">Also for capital project management: <Link href="/industries/construction" className="text-accent hover:underline">NetSuite for construction companies</Link> covers job costing and capital expenditure approval workflows for project-based operations.</p>
        </div>

        <ServiceFaqSection items={FAQ} />

        <div className="mt-10 rounded-2xl border border-brand-100 bg-brand-50/30 p-5 sm:p-6">
          <p className="text-sm font-semibold text-brand-900 mb-3">Related reading</p>
          <ul className="space-y-2.5">
            <li className="text-sm text-brand-400"><Link href="/netsuite-workflow-automation" className="text-accent hover:underline">NetSuite workflow automation</Link>{" "}covers SuiteFlow development for approval routing, notifications, and multi-stage review processes.</li>
            <li className="text-sm text-brand-400"><Link href="/netsuite-suitescript-development" className="text-accent hover:underline">NetSuite SuiteScript development</Link>{" "}covers the scripting capabilities used for JIB billing, royalty calculations, and AFE cost tracking.</li>
            <li className="text-sm text-brand-400"><Link href="/netsuite-managed-support" className="text-accent hover:underline">NetSuite managed support</Link>{" "}covers the retainer structure, hour tiers, and what is included across all plan levels.</li>
          </ul>
        </div>

        <div className="mt-10 rounded-2xl border border-brand-100 bg-white p-5 shadow-soft"><LeadFormLight /></div>
      </div>
    </main>
  );
}

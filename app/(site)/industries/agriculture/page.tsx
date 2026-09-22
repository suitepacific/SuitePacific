import type { Metadata } from "next";
import Link from "next/link";
import { Sprout, FileText, BarChart2, Workflow, Code2, ShieldCheck, RefreshCcw, Award, Headphones, Plug, Users, DollarSign, Layers, Tractor } from "lucide-react";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Card } from "@/components/ui/Card";
import { IconBadge } from "@/components/ui/IconBadge";
import { BreadcrumbJsonLd, FaqJsonLd, ServiceJsonLd, OrganizationJsonLd } from "@/components/seo/JsonLd";
import { ServiceFaqSection } from "@/components/ui/ServiceFaqSection";
import { LeadFormLight } from "@/components/sections/LeadFormLight";
import { SITE_URL } from "@/lib/content";

const CHALLENGES = [
  { icon: DollarSign, title: "Seasonal billing cycles", description: "Agricultural businesses with seasonal revenue patterns, prepaid input billing at planting and harvest-based revenue recognition require custom NetSuite scripts that handle the timing mismatch between when customers pay, when inputs are delivered, and when crop revenue is earned." },
  { icon: Sprout, title: "Crop and batch traceability", description: "Tracing inputs (seed, fertilizer, crop protection) to the resulting harvest by field, crop year, and variety requires custom lot tracking and saved searches that standard NetSuite inventory does not provide without configuration specific to agricultural production workflows." },
  { icon: Tractor, title: "Farm equipment depreciation and capitalization", description: "Section 179 bonus depreciation and MACRS schedules for farm equipment, plus capitalization versus expensing decisions for land improvements and perennial crops, require custom fixed asset records and depreciation schedules that standard NetSuite fixed asset management handles but needs configuration for agricultural asset classes." },
  { icon: Layers, title: "Input cost tracking by crop and field", description: "Allocating seed, fertilizer, crop protection, and labor costs to individual fields and crop years for per-acre cost analysis and crop profitability reporting requires custom project or job records in NetSuite that agricultural operators set up manually without scripted automation." },
  { icon: FileText, title: "Co-op and grain elevator invoicing", description: "Agricultural businesses selling through co-ops or grain elevators with deferred payment, settlement deductions, and patronage dividends require custom invoice reconciliation scripts that match elevator settlement sheets to NetSuite receivable records." },
  { icon: BarChart2, title: "Commodity-linked pricing and hedging", description: "Grain and commodity producers selling at market prices linked to CME futures contracts, with basis contracts and hedge accounting, require custom pricing scripts and saved searches that track average realized prices against commodity benchmarks." },
];

const SERVICES = [
  { icon: Code2, title: "SuiteScript Development", description: "Custom scripts for seasonal billing timing, crop traceability lot tracking, field-level cost allocation, co-op settlement reconciliation, commodity pricing calculations, and agricultural input cost automation.", href: "/netsuite-suitescript-development" },
  { icon: Workflow, title: "Workflow Automation", description: "SuiteFlow workflows for crop year setup, input purchase order approvals, harvest cost accrual, equipment capital expenditure authorization, and seasonal billing release workflows.", href: "/netsuite-workflow-automation" },
  { icon: BarChart2, title: "Saved Searches & Dashboards", description: "Cost per acre by field and crop year, crop profitability by variety, equipment utilization and depreciation, co-op settlement reconciliation, and seasonal revenue recognition saved searches built with SuiteQL.", href: "/netsuite-saved-searches-dashboards" },
  { icon: Plug, title: "NetSuite Integrations", description: "Integrations connecting NetSuite to precision agriculture platforms, grain elevator settlement systems, farm management software (FMS), and commodity pricing feeds for automated financial data exchange.", href: "/netsuite-integrations" },
  { icon: Headphones, title: "Post-Go-Live Support", description: "Ongoing technical support for live agricultural business NetSuite accounts: crop year rollover, equipment depreciation updates, seasonal billing scripts, and ongoing account optimization.", href: "/netsuite-post-go-live-support" },
  { icon: Users, title: "Administrator Support", description: "Ongoing NetSuite administration for agricultural accounts: crop year configuration, field record setup, input item catalog management, period close support, and platform troubleshooting.", href: "/netsuite-administrator-support" },
];

const CUSTOMIZATIONS = [
  { title: "Crop year and field cost tracking records", description: "Custom NetSuite project or class records that establish a crop year and field combination as a cost center, allowing seed, fertilizer, labor, and equipment costs to be allocated to specific fields and crop years for per-acre cost analysis and crop profitability reporting at harvest." },
  { title: "Seasonal revenue recognition scripts", description: "User Event and scheduled scripts that manage the timing mismatch between prepaid input billings at spring planting, deferred revenue recognition, and harvest-based revenue booking, ensuring financial statements reflect the agricultural production cycle accurately." },
  { title: "Crop traceability lot tracking configuration", description: "Custom lot tracking setup that links input lots (seed lot number, fertilizer batch) to the resulting harvest inventory by field and crop year, supporting both internal cost analysis and buyer traceability requirements for premium markets." },
  { title: "Co-op settlement reconciliation scripts", description: "SuiteScript that imports grain elevator settlement sheets, matches settlement proceeds and deductions to NetSuite receivable records, posts the final settlement accounting entry, and flags discrepancies between expected and received settlement amounts for review." },
  { title: "Farm equipment capitalization and depreciation", description: "Custom fixed asset records with agricultural equipment depreciation schedules (Section 179, bonus depreciation, MACRS) and capitalization threshold rules that distinguish capital expenditures from deductible repairs and maintenance based on configurable cost thresholds." },
  { title: "Per-acre cost and crop profitability dashboard", description: "SuiteQL saved searches that aggregate field-level input costs and harvest revenue, calculating gross margin per acre by field, crop variety, and crop year to give farm managers and owners the crop profitability view needed for planting decisions." },
];

const WHY_SP = [
  { icon: ShieldCheck, title: "NetSuite-Certified", description: "Oracle NetSuite SuiteCloud Developer II and Administrator Professional certifications. Verified technical credentials across SuiteScript, SuiteFlow, and the NetSuite platform." },
  { icon: Users, title: "Direct Access", description: "You communicate directly with the person doing the work. No ticket system, no account manager, no offshore handoffs." },
  { icon: RefreshCcw, title: "Context Retained", description: "Ongoing knowledge of your agricultural business NetSuite account across every engagement. Each request builds on prior work without re-discovery." },
  { icon: Award, title: "Post-Go-Live Specialist", description: "We work exclusively with companies already live on NetSuite. No implementations. Every engagement is ongoing development and support for an active account." },
];

const COMPARISON = [
  { capability: "Crop year cost tracking", standard: "Manual field cost allocation outside NetSuite", withSP: "Custom project records tracking inputs and costs by field and crop year" },
  { capability: "Seasonal revenue timing", standard: "Invoice-date recognition misaligned with harvest cycles", withSP: "Scripts managing prepaid billings and harvest-based revenue recognition" },
  { capability: "Crop traceability", standard: "Standard lot tracking without crop-specific fields", withSP: "Custom lot configuration linking inputs to harvest by field and crop year" },
  { capability: "Co-op settlements", standard: "Manual settlement sheet reconciliation", withSP: "Scripts importing and reconciling elevator settlements to NetSuite records" },
  { capability: "Equipment depreciation", standard: "Standard fixed asset depreciation without Sec. 179 optimization", withSP: "Custom schedules with agricultural depreciation methods and capitalization rules" },
  { capability: "Per-acre profitability", standard: "No standard crop profitability reporting in NetSuite", withSP: "SuiteQL searches producing gross margin per acre by field and crop" },
];

const FAQ = [
  { question: "Does NetSuite work for agricultural businesses?", answer: "Yes. NetSuite is used by farms, agribusinesses, agricultural co-ops, and AgTech companies for financial management, inventory tracking, equipment asset management, and seasonal billing. Post-go-live customization is required for field-level crop cost tracking, seasonal revenue recognition, crop traceability lot configuration, co-op settlement reconciliation, farm equipment depreciation schedules, and per-acre profitability reporting that standard NetSuite does not handle without SuiteScript development." },
  { question: "Can NetSuite track input costs by field and crop year?", answer: "Yes, via custom project or class records. SuitePacific builds field and crop year cost tracking structures in NetSuite that allocate seed, fertilizer, crop protection, and labor costs to specific fields and crop years. This enables per-acre cost analysis and crop profitability reporting at harvest that gives farm managers the data to make informed planting and input purchasing decisions." },
  { question: "How does NetSuite handle seasonal revenue recognition for agricultural businesses?", answer: "Seasonal revenue recognition requires custom scripts that manage the timing mismatch between prepaid input billings at planting, deferred revenue during the growing season, and harvest-based revenue recognition. SuitePacific builds the User Event and scheduled scripts that align NetSuite financial reporting with the agricultural production cycle rather than defaulting to invoice-date recognition." },
  { question: "Can NetSuite integrate with grain elevator settlement systems?", answer: "Yes, via custom integration scripts. SuitePacific builds scripts that import grain elevator settlement data, match settlement proceeds and deductions to NetSuite receivable records, post the final settlement accounting entries, and flag discrepancies between contracted and settled amounts for the farm&apos;s accounting team to review." },
  { question: "How does NetSuite handle farm equipment depreciation and Section 179?", answer: "NetSuite fixed asset management supports custom depreciation schedules, but agricultural equipment requires configuration for Section 179 bonus depreciation, MACRS farm property categories, and capitalization threshold rules that distinguish capital expenditures from deductible repairs. SuitePacific builds these custom fixed asset configurations for agricultural accounts on NetSuite." },
  { question: "Can NetSuite produce per-acre cost and profitability reporting?", answer: "Yes, via SuiteQL saved searches. SuitePacific builds crop profitability reporting that aggregates field-level input costs and harvest revenue by field, crop variety, and crop year, calculating gross margin per acre. This gives farm managers and owners the crop-level profitability view needed for planting decisions and input cost benchmarking." },
  { question: "What are common NetSuite customizations for agricultural businesses?", answer: "Common agricultural builds include crop year and field cost tracking records, seasonal revenue recognition scripts, crop traceability lot configuration, co-op and elevator settlement reconciliation, farm equipment Section 179 depreciation schedules, per-acre cost and profitability saved searches, and integrations with precision agriculture platforms and commodity pricing feeds." },
  { question: "Who provides NetSuite support for agricultural businesses?", answer: "SuitePacific provides NetSuite post-go-live support for farms, agribusinesses, agricultural co-ops, and AgTech companies, including crop year cost tracking, seasonal billing scripts, equipment depreciation, and co-op settlement reconciliation, on a month-to-month retainer starting at $799 per month." },
];

export const metadata: Metadata = {
  title: "NetSuite Support for Agriculture & AgTech | SuitePacific",
  description: "NetSuite post-go-live support for agricultural businesses. Crop cost tracking, seasonal billing, traceability, co-op settlement reconciliation, and per-acre profitability reporting.",
  alternates: { canonical: "/industries/agriculture" },
  openGraph: {
    title: "NetSuite Support for Agriculture & AgTech | SuitePacific",
    description: "NetSuite support for agriculture and AgTech: field-level crop cost tracking, seasonal revenue recognition, co-op settlement reconciliation, and per-acre profitability reporting.",
    url: `${SITE_URL}/industries/agriculture`,
    type: "website",
    images: [{ url: `${SITE_URL}/og-default.png`, width: 1200, height: 630 }],
  },
};

export default function AgriculturePage() {
  return (
    <main className="pt-32 pb-24 sm:pt-40 sm:pb-32">
      <BreadcrumbJsonLd items={[{ name: "Home", url: SITE_URL }, { name: "Industries", url: `${SITE_URL}/industries` }, { name: "Agriculture & AgTech", url: `${SITE_URL}/industries/agriculture` }]} />
      <FaqJsonLd items={FAQ} />
      <ServiceJsonLd name="NetSuite Support for Agriculture & AgTech" description="NetSuite post-go-live support for agricultural businesses including crop cost tracking, seasonal billing, co-op settlement reconciliation, and per-acre profitability reporting." url={`${SITE_URL}/industries/agriculture`} serviceType="NetSuite Agriculture Support" datePublished="2026-09-23T00:00:00+00:00" dateModified="2026-09-23T00:00:00+00:00" offers={[{ name: "Care", price: 799, description: "10 hours/month: crop year records, saved searches, and administration for agricultural accounts. Month-to-month after 3-month minimum." }, { name: "Care Plus", price: 1499, description: "20 hours/month: active development including seasonal billing, settlement reconciliation, and profitability reporting. Month-to-month." }, { name: "Care Pro", price: 2499, description: "35 hours/month: full agricultural account coverage including integrations, depreciation builds, and ongoing support. Month-to-month." }]} />
      <OrganizationJsonLd />
      <div className="mx-auto max-w-3xl px-6 lg:px-8">
        <SectionHeading as="h1" eyebrow="Agriculture & AgTech" title="NetSuite Support & Development for Agriculture & AgTech Companies" subtitle="Field-level crop cost tracking, seasonal billing, co-op settlement reconciliation, and per-acre profitability reporting for agricultural businesses already live on NetSuite." align="left" />
        <div className="mt-6 rounded-2xl border border-brand-100 bg-white p-5 shadow-soft">
          <p className="text-sm text-brand-600 mb-3">Tell us what your agricultural business NetSuite account needs.</p>
          <LeadFormLight />
        </div>
        <p className="mt-3 text-xs text-brand-400">NetSuite-Certified · Post-go-live specialist · Sandbox-first development · Month-to-month</p>
        <p className="mt-2 text-xs text-brand-300"><time dateTime="2026-09">Published September 2026</time></p>

        <div className="rounded-2xl border-l-4 border-accent bg-brand-50/50 p-5 mt-8 mb-6">
          <p className="text-xs font-semibold uppercase tracking-wide text-accent mb-2">Quick answer</p>
          <p className="text-sm text-brand-700 leading-relaxed">NetSuite support for agriculture and AgTech companies refers to post-go-live technical assistance for the crop cost tracking, seasonal revenue timing, and compliance workflows that agricultural businesses require. Standard NetSuite does not track input costs by field and crop year without custom project or class record configuration. Seasonal revenue recognition tied to harvest rather than invoice date requires custom scripts. Co-op and grain elevator settlement reconciliation requires scripts that import settlement data and match it to NetSuite receivable records. Farm equipment Section 179 depreciation requires custom fixed asset schedule configuration. Per-acre profitability reporting requires SuiteQL saved searches that aggregate field-level costs and revenues. SuitePacific builds and maintains these agricultural workflows for farms, agribusinesses, and AgTech companies already live on NetSuite, with all development tested in Sandbox before production deployment, on a month-to-month retainer starting at $799 per month after a three-month minimum.</p>
        </div>

        <p className="text-sm text-brand-400 leading-relaxed">Agricultural businesses that go live on NetSuite commonly find that crop cost tracking, seasonal billing, and co-op settlement reconciliation require SuiteScript development and custom record configuration that standard NetSuite does not provide for agricultural workflows. SuitePacific covers this technical layer for agricultural accounts already live on NetSuite.</p>

        <div className="mt-14">
          <h2 className="text-lg font-semibold text-brand-900 mb-2">How does SuitePacific extend NetSuite for agricultural businesses?</h2>
          <p className="text-sm text-brand-400 mb-4">Common capability gaps in standard NetSuite and what SuitePacific adds to fill them.</p>
          <div className="overflow-x-auto">
            <table className="w-full text-sm border-collapse">
              <thead><tr className="border-b border-brand-100"><th className="text-left py-3 pr-6 font-semibold text-brand-900 w-1/3">Capability</th><th className="text-left py-3 pr-6 font-semibold text-brand-900 w-1/3">Standard NetSuite</th><th className="text-left py-3 font-semibold text-brand-900 w-1/3">With SuitePacific</th></tr></thead>
              <tbody>{COMPARISON.map((row) => (<tr key={row.capability} className="border-b border-brand-50"><td className="py-3 pr-6 font-medium text-brand-900 align-top">{row.capability}</td><td className="py-3 pr-6 text-brand-400 align-top">{row.standard}</td><td className="py-3 text-brand-700 align-top">{row.withSP}</td></tr>))}</tbody>
            </table>
          </div>
        </div>

        <div className="mt-14">
          <h2 className="text-lg font-semibold text-brand-900 mb-6">What NetSuite challenges do agricultural businesses face?</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">{CHALLENGES.map((item) => (<Card key={item.title} className="p-5 flex flex-col gap-3"><IconBadge icon={item.icon} /><h3 className="font-semibold text-brand-900 text-sm">{item.title}</h3><p className="text-sm text-brand-400">{item.description}</p></Card>))}</div>
        </div>

        <div className="mt-14">
          <h2 className="text-lg font-semibold text-brand-900 mb-6">What NetSuite services does SuitePacific provide for agricultural businesses?</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">{SERVICES.map((service) => (<Link key={service.href} href={service.href} className="group"><Card className="p-5 flex items-start gap-4 h-full group-hover:border-brand-200 transition-colors"><IconBadge icon={service.icon} /><div><h3 className="font-semibold text-brand-900 text-sm group-hover:text-accent transition-colors">{service.title}</h3><p className="mt-1.5 text-sm text-brand-400">{service.description}</p></div></Card></Link>))}</div>
        </div>

        <div className="mt-14">
          <h2 className="text-lg font-semibold text-brand-900 mb-2">What are common NetSuite customizations for agricultural businesses?</h2>
          <p className="text-sm text-brand-400 mb-6">These are the builds SuitePacific delivers for agricultural accounts on a recurring basis.</p>
          <div className="space-y-4">{CUSTOMIZATIONS.map((item, i) => (<div key={item.title} className="flex items-start gap-5"><span className="text-xs font-semibold text-accent bg-accent/10 rounded-full h-7 w-7 flex items-center justify-center shrink-0 mt-0.5">{String(i + 1).padStart(2, "0")}</span><div><h3 className="font-semibold text-brand-900 text-sm">{item.title}</h3><p className="mt-0.5 text-sm text-brand-400">{item.description}</p></div></div>))}</div>
        </div>

        <div className="mt-14">
          <h2 className="text-lg font-semibold text-brand-900 mb-6">Why do agricultural businesses choose SuitePacific?</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">{WHY_SP.map((item) => (<Card key={item.title} className="p-5 flex items-start gap-4"><IconBadge icon={item.icon} /><div><h3 className="font-semibold text-brand-900 text-sm">{item.title}</h3><p className="mt-1.5 text-sm text-brand-400">{item.description}</p></div></Card>))}</div>
          <p className="mt-5 text-sm text-brand-400">For lot-tracked food production: <Link href="/industries/food-beverage" className="text-accent hover:underline">NetSuite for food and beverage</Link> covers lot traceability, shelf life management, and CPG compliance for food manufacturers and processors.</p>
        </div>

        <ServiceFaqSection items={FAQ} />

        <div className="mt-10 rounded-2xl border border-brand-100 bg-brand-50/30 p-5 sm:p-6">
          <p className="text-sm font-semibold text-brand-900 mb-3">Related reading</p>
          <ul className="space-y-2.5">
            <li className="text-sm text-brand-400"><Link href="/netsuite-suitescript-development" className="text-accent hover:underline">NetSuite SuiteScript development</Link>{" "}covers the scripting capabilities used for seasonal billing, settlement reconciliation, and crop cost automation.</li>
            <li className="text-sm text-brand-400"><Link href="/netsuite-saved-searches-dashboards" className="text-accent hover:underline">NetSuite saved searches and dashboards</Link>{" "}covers SuiteQL development for per-acre profitability, crop cost, and equipment depreciation reporting.</li>
            <li className="text-sm text-brand-400"><Link href="/netsuite-managed-support" className="text-accent hover:underline">NetSuite managed support</Link>{" "}covers the retainer structure, hour tiers, and what is included across all plan levels.</li>
          </ul>
        </div>

        <div className="mt-10 rounded-2xl border border-brand-100 bg-white p-5 shadow-soft"><LeadFormLight /></div>
      </div>
    </main>
  );
}

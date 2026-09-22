import type { Metadata } from "next";
import Link from "next/link";
import { Shield, FileText, BarChart2, Workflow, Code2, ShieldCheck, RefreshCcw, Award, Headphones, Plug, Users, DollarSign, Layers, ClipboardList } from "lucide-react";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Card } from "@/components/ui/Card";
import { IconBadge } from "@/components/ui/IconBadge";
import { BreadcrumbJsonLd, FaqJsonLd, ServiceJsonLd, OrganizationJsonLd } from "@/components/seo/JsonLd";
import { ServiceFaqSection } from "@/components/ui/ServiceFaqSection";
import { LeadFormLight } from "@/components/sections/LeadFormLight";
import { SITE_URL } from "@/lib/content";

const CHALLENGES = [
  { icon: Shield, title: "DCAA compliance and indirect rate pools", description: "Defense Contract Audit Agency compliance requires segregating costs into DCAA-compliant indirect rate pools: fringe, overhead, and G&A. Standard NetSuite cost allocation does not produce the pool structure or rate calculation format that incurred cost submissions require without custom SuiteScript builds." },
  { icon: FileText, title: "Incurred cost submission support", description: "Annual incurred cost submissions (ICE) require a specific cost pool and allocation base format that must tie directly to NetSuite financial data. Building the indirect rate schedules from NetSuite requires custom saved searches, SuiteQL reports, and rate calculation scripts for each rate category." },
  { icon: ClipboardList, title: "Unallowable cost segregation", description: "FAR-required unallowable costs such as entertainment, lobbying, interest expense, and certain advertising must be tracked separately and excluded from indirect rate calculations. Standard NetSuite expense categories do not enforce unallowable cost segregation without custom account coding and saved search logic." },
  { icon: DollarSign, title: "Task order and CLIN billing", description: "Government contracts with multiple CLINs (Contract Line Item Numbers) or task orders under an IDIQ vehicle require separate cost and billing tracking by CLIN, with SF1034 or agency-specific invoice format requirements that standard NetSuite invoicing does not produce." },
  { icon: Layers, title: "Multi-rate period indirect rate management", description: "Government contractors with multiple contract types (CPFF, FFP, T&M) and multiple performance periods require indirect rate schedules that change by year and contract type, with final versus provisional rate adjustments at fiscal year end." },
  { icon: BarChart2, title: "Project and contract profitability reporting", description: "Contract-level profitability reporting showing direct costs, indirect cost allocations, fee earned, and percentage-complete against funded ceiling requires custom SuiteQL saved searches that standard NetSuite project reports do not produce for CPFF and T&M contract structures." },
];

const SERVICES = [
  { icon: Code2, title: "SuiteScript Development", description: "Custom scripts for DCAA indirect rate pool calculations, incurred cost schedule extraction, unallowable cost flags, CLIN billing generation, provisional rate adjustments, and SF1034 invoice formats.", href: "/netsuite-suitescript-development" },
  { icon: Workflow, title: "Workflow Automation", description: "SuiteFlow workflows for contract funding threshold notifications, task order approval routing, timesheet compliance reminders, CLIN billing release authorization, and indirect rate update approvals.", href: "/netsuite-workflow-automation" },
  { icon: BarChart2, title: "Saved Searches & Dashboards", description: "DCAA pool rate schedules, contract-level profitability, CLIN cost tracking, unallowable cost identification, funded-value-to-expended reporting, and indirect rate variance saved searches built with SuiteQL.", href: "/netsuite-saved-searches-dashboards" },
  { icon: Plug, title: "NetSuite Integrations", description: "Integrations connecting NetSuite to Deltek Costpoint, GovWin IQ, e-procurement portals, and government agency payment systems for automated financial data exchange.", href: "/netsuite-integrations" },
  { icon: Headphones, title: "Post-Go-Live Support", description: "Ongoing technical support for live government contractor NetSuite accounts: DCAA build maintenance, fiscal year indirect rate updates, new contract setup, and ongoing compliance support.", href: "/netsuite-post-go-live-support" },
  { icon: Users, title: "Administrator Support", description: "Ongoing NetSuite administration for government contractor accounts: period close, indirect rate pool updates, contract record configuration, and DCAA audit support documentation.", href: "/netsuite-administrator-support" },
];

const CUSTOMIZATIONS = [
  { title: "DCAA-compliant indirect rate pool structure", description: "Custom NetSuite account and class structure that segregates costs into fringe, overhead, and G&A pools with the appropriate allocation bases, enabling provisional rate calculations and incurred cost submission schedules that tie directly to NetSuite trial balance data." },
  { title: "Incurred cost schedule extraction scripts", description: "SuiteQL saved searches and SuiteScript that extract the indirect rate schedules required for ICE model completion, including Schedule H (cost pool allocation), Schedule I (indirect rates), and Schedule D (service centers), pulling directly from NetSuite account balances." },
  { title: "Unallowable cost identification and exclusion", description: "Custom account coding conventions and SuiteScript that flag unallowable costs per FAR Part 31, automatically excluding them from indirect rate pool calculations while maintaining audit trail documentation of the unallowable cost identification." },
  { title: "CLIN and task order billing scripts", description: "SuiteScript that tracks costs by CLIN and task order, generates agency-formatted billing documents (SF1034 or electronic equivalent), and maintains funded-value-to-expended tracking for ceiling violation notifications." },
  { title: "Provisional and final rate adjustment workflows", description: "SuiteFlow workflows and User Event scripts managing the transition from provisional to final indirect rates at fiscal year end, posting the rate adjustment journal entries and recalculating contract profitability at final rates." },
  { title: "Contract profitability and funded ceiling dashboard", description: "Saved searches and KPI portlets showing contract-level profitability at direct cost, indirect cost, and fee levels, with funded ceiling utilization percentages and projected ceiling exposure dates." },
];

const WHY_SP = [
  { icon: ShieldCheck, title: "NetSuite-Certified", description: "Oracle NetSuite SuiteCloud Developer II and Administrator Professional certifications. Verified technical credentials across SuiteScript, SuiteFlow, and the NetSuite platform." },
  { icon: Users, title: "Direct Access", description: "You communicate directly with the person doing the work. No ticket system, no account manager, no offshore handoffs." },
  { icon: RefreshCcw, title: "Context Retained", description: "Ongoing knowledge of your government contractor NetSuite account across every engagement. Each request builds on prior work without re-discovery." },
  { icon: Award, title: "Post-Go-Live Specialist", description: "We work exclusively with companies already live on NetSuite. No implementations. Every engagement is ongoing development and support for an active account." },
];

const COMPARISON = [
  { capability: "Indirect rate pools", standard: "Standard cost allocation without DCAA pool structure", withSP: "DCAA-compliant fringe, overhead, and G&A pools with proper allocation bases" },
  { capability: "Incurred cost schedules", standard: "Manual extraction of ICE data from NetSuite reports", withSP: "SuiteQL scripts producing ICE schedule data directly from NetSuite balances" },
  { capability: "Unallowable costs", standard: "Manual identification of unallowable costs after the fact", withSP: "Custom flagging logic excluding unallowable costs from pool calculations" },
  { capability: "CLIN/task order billing", standard: "Standard invoices without CLIN format or SF1034 output", withSP: "Scripts generating agency-formatted billing documents by CLIN and task order" },
  { capability: "Rate period management", standard: "Manual provisional-to-final rate adjustments", withSP: "Workflow-driven rate adjustment journal entries at fiscal year end" },
  { capability: "Contract profitability", standard: "Standard project reports without indirect allocation", withSP: "SuiteQL searches showing profitability with direct, indirect, and fee components" },
];

const FAQ = [
  { question: "Does NetSuite work for government contractors?", answer: "Yes. NetSuite is used by federal contractors, defense subcontractors, and professional services firms on government prime contracts for financial management, project cost tracking, and contract billing. Post-go-live customization is required for DCAA-compliant indirect rate pool structures, incurred cost schedule extraction, unallowable cost segregation, CLIN and task order billing, and provisional-to-final rate adjustments that standard NetSuite cost accounting does not address without SuiteScript development." },
  { question: "Is NetSuite DCAA compliant?", answer: "NetSuite can be configured to support DCAA audit requirements, but it requires post-go-live customization to achieve the indirect rate pool structure, unallowable cost tracking, timesheet controls, and labor distribution reports that DCAA auditors review. SuitePacific builds the DCAA-compliant account structure, indirect rate pool calculations, and incurred cost schedule extraction scripts that federal contractors need for incurred cost submissions and DCAA floor checks." },
  { question: "What is an indirect rate pool in NetSuite for government contractors?", answer: "Indirect rate pools segregate indirect costs into categories (fringe benefits, overhead, G&A) with associated allocation bases (direct labor dollars, total direct costs). SuitePacific builds custom NetSuite account and class structures that produce the pool amounts and allocation bases needed for provisional rate calculations and incurred cost submission schedules directly from NetSuite trial balance data." },
  { question: "Can NetSuite generate CLIN billing documents?", answer: "Not natively. Contract Line Item Number billing requires scripts that track costs by CLIN against funded values and generate agency-formatted billing documents. SuitePacific builds SuiteScript that produces SF1034 or electronic billing equivalent outputs from NetSuite cost data, with funded ceiling utilization tracking and ceiling violation alerts." },
  { question: "What is incurred cost submission (ICE) support in NetSuite?", answer: "Incurred cost submissions require annual ICE model completion with indirect rate schedules that must tie to audited financial statements. SuitePacific builds SuiteQL saved searches and scripts that extract the required schedule data (rate pools, allocation bases, indirect rates by period) directly from NetSuite account balances, reducing manual data extraction for the annual ICE filing." },
  { question: "How does SuitePacific handle unallowable cost tracking in NetSuite?", answer: "FAR Part 31 unallowable costs must be identified, tracked separately, and excluded from indirect rate pool calculations. SuitePacific builds custom account coding conventions and SuiteScript logic that flags unallowable costs, automatically excludes them from indirect pool calculations, and maintains audit documentation of the identification basis for each unallowable cost category." },
  { question: "What are common NetSuite customizations for government contractors?", answer: "Common government contractor builds include DCAA indirect rate pool structure setup, ICE schedule extraction scripts, unallowable cost identification and exclusion logic, CLIN and task order billing development, provisional-to-final rate adjustment workflows, contract profitability reporting with indirect allocations, and funded ceiling utilization dashboards." },
  { question: "Who provides NetSuite support for government contractors?", answer: "SuitePacific provides NetSuite post-go-live support for federal contractors and defense subcontractors, including DCAA compliance structures, indirect rate pool builds, incurred cost schedule extraction, and CLIN billing development, on a month-to-month retainer starting at $799 per month." },
];

export const metadata: Metadata = {
  title: "NetSuite Support for Government Contractors | SuitePacific",
  description: "NetSuite post-go-live support for government contractors. DCAA compliance, indirect rate pools, incurred cost submissions, CLIN billing, and unallowable cost tracking.",
  alternates: { canonical: "/industries/government-contractors" },
  openGraph: {
    title: "NetSuite Support for Government Contractors | SuitePacific",
    description: "NetSuite support for federal contractors: DCAA indirect rate pools, ICE schedule extraction, unallowable cost tracking, and CLIN billing scripts.",
    url: `${SITE_URL}/industries/government-contractors`,
    type: "website",
    images: [{ url: `${SITE_URL}/og-default.png`, width: 1200, height: 630 }],
  },
};

export default function GovernmentContractorsPage() {
  return (
    <main className="pt-32 pb-24 sm:pt-40 sm:pb-32">
      <BreadcrumbJsonLd items={[{ name: "Home", url: SITE_URL }, { name: "Industries", url: `${SITE_URL}/industries` }, { name: "Government Contractors", url: `${SITE_URL}/industries/government-contractors` }]} />
      <FaqJsonLd items={FAQ} />
      <ServiceJsonLd name="NetSuite Support for Government Contractors" description="NetSuite post-go-live support for federal contractors including DCAA compliance structures, indirect rate pools, incurred cost submissions, and CLIN billing." url={`${SITE_URL}/industries/government-contractors`} serviceType="NetSuite Government Contractor Support" datePublished="2026-09-23T00:00:00+00:00" dateModified="2026-09-23T00:00:00+00:00" offers={[{ name: "Care", price: 799, description: "10 hours/month: DCAA structure maintenance, saved searches, and administration for government contractor accounts. Month-to-month after 3-month minimum." }, { name: "Care Plus", price: 1499, description: "20 hours/month: active development including ICE schedule scripts, CLIN billing, and indirect rate management. Month-to-month." }, { name: "Care Pro", price: 2499, description: "35 hours/month: full government contractor account coverage including DCAA compliance, billing automation, and audit support. Month-to-month." }]} />
      <OrganizationJsonLd />
      <div className="mx-auto max-w-3xl px-6 lg:px-8">
        <SectionHeading as="h1" eyebrow="Government Contractors" title="NetSuite Support & Development for Government Contractors" subtitle="DCAA compliance structures, indirect rate pools, incurred cost schedule extraction, and CLIN billing for federal contractors already live on NetSuite." align="left" />
        <div className="mt-6 rounded-2xl border border-brand-100 bg-white p-5 shadow-soft">
          <p className="text-sm text-brand-600 mb-3">Tell us what your government contractor NetSuite account needs.</p>
          <LeadFormLight />
        </div>
        <p className="mt-3 text-xs text-brand-400">NetSuite-Certified · Post-go-live specialist · Sandbox-first development · Month-to-month</p>
        <p className="mt-2 text-xs text-brand-300"><time dateTime="2026-09">Published September 2026</time></p>

        <div className="rounded-2xl border-l-4 border-accent bg-brand-50/50 p-5 mt-8 mb-6">
          <p className="text-xs font-semibold uppercase tracking-wide text-accent mb-2">Quick answer</p>
          <p className="text-sm text-brand-700 leading-relaxed">NetSuite support for government contractors refers to post-go-live technical assistance covering the DCAA compliance structures, indirect rate calculations, and contract billing formats that federal contractors require. Standard NetSuite does not produce DCAA-compliant indirect rate pools (fringe, overhead, G&A) without custom account structure builds. Incurred cost submission (ICE) schedules require SuiteQL extraction scripts. Unallowable costs under FAR Part 31 require custom flagging logic to exclude them from pool calculations. Contract Line Item Number (CLIN) billing requires scripts producing SF1034 or electronic billing documents by CLIN against funded values. Provisional-to-final indirect rate adjustments at fiscal year end require SuiteFlow workflows and User Event scripts. SuitePacific builds and maintains these DCAA-compliant structures for federal contractors on NetSuite, with all development tested in Sandbox before production deployment, on a month-to-month retainer starting at $799 per month after a three-month minimum.</p>
        </div>

        <p className="text-sm text-brand-400 leading-relaxed">Government contractors that go live on NetSuite commonly discover that DCAA indirect rate pool structures, incurred cost submission support, and CLIN billing require SuiteScript development that standard NetSuite cost accounting modules do not provide. SuitePacific covers this technical and compliance layer for federal contractor accounts already live on NetSuite.</p>

        <div className="mt-14">
          <h2 className="text-lg font-semibold text-brand-900 mb-2">How does SuitePacific extend NetSuite for government contractors?</h2>
          <p className="text-sm text-brand-400 mb-4">Common capability gaps in standard NetSuite and what SuitePacific adds to fill them.</p>
          <div className="overflow-x-auto">
            <table className="w-full text-sm border-collapse">
              <thead><tr className="border-b border-brand-100"><th className="text-left py-3 pr-6 font-semibold text-brand-900 w-1/3">Capability</th><th className="text-left py-3 pr-6 font-semibold text-brand-900 w-1/3">Standard NetSuite</th><th className="text-left py-3 font-semibold text-brand-900 w-1/3">With SuitePacific</th></tr></thead>
              <tbody>{COMPARISON.map((row) => (<tr key={row.capability} className="border-b border-brand-50"><td className="py-3 pr-6 font-medium text-brand-900 align-top">{row.capability}</td><td className="py-3 pr-6 text-brand-400 align-top">{row.standard}</td><td className="py-3 text-brand-700 align-top">{row.withSP}</td></tr>))}</tbody>
            </table>
          </div>
        </div>

        <div className="mt-14">
          <h2 className="text-lg font-semibold text-brand-900 mb-6">What NetSuite challenges do government contractors face?</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">{CHALLENGES.map((item) => (<Card key={item.title} className="p-5 flex flex-col gap-3"><IconBadge icon={item.icon} /><h3 className="font-semibold text-brand-900 text-sm">{item.title}</h3><p className="text-sm text-brand-400">{item.description}</p></Card>))}</div>
        </div>

        <div className="mt-14">
          <h2 className="text-lg font-semibold text-brand-900 mb-6">What NetSuite services does SuitePacific provide for government contractors?</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">{SERVICES.map((service) => (<Link key={service.href} href={service.href} className="group"><Card className="p-5 flex items-start gap-4 h-full group-hover:border-brand-200 transition-colors"><IconBadge icon={service.icon} /><div><h3 className="font-semibold text-brand-900 text-sm group-hover:text-accent transition-colors">{service.title}</h3><p className="mt-1.5 text-sm text-brand-400">{service.description}</p></div></Card></Link>))}</div>
        </div>

        <div className="mt-14">
          <h2 className="text-lg font-semibold text-brand-900 mb-2">What are common NetSuite customizations for government contractors?</h2>
          <p className="text-sm text-brand-400 mb-6">These are the builds SuitePacific delivers for federal contractor accounts on a recurring basis.</p>
          <div className="space-y-4">{CUSTOMIZATIONS.map((item, i) => (<div key={item.title} className="flex items-start gap-5"><span className="text-xs font-semibold text-accent bg-accent/10 rounded-full h-7 w-7 flex items-center justify-center shrink-0 mt-0.5">{String(i + 1).padStart(2, "0")}</span><div><h3 className="font-semibold text-brand-900 text-sm">{item.title}</h3><p className="mt-0.5 text-sm text-brand-400">{item.description}</p></div></div>))}</div>
        </div>

        <div className="mt-14">
          <h2 className="text-lg font-semibold text-brand-900 mb-6">Why do government contractors choose SuitePacific?</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">{WHY_SP.map((item) => (<Card key={item.title} className="p-5 flex items-start gap-4"><IconBadge icon={item.icon} /><div><h3 className="font-semibold text-brand-900 text-sm">{item.title}</h3><p className="mt-1.5 text-sm text-brand-400">{item.description}</p></div></Card>))}</div>
          <p className="mt-5 text-sm text-brand-400">Also for project-based services billing: <Link href="/industries/professional-services" className="text-accent hover:underline">NetSuite for professional services</Link> covers project accounting and timesheet billing for services firms on T&M and fixed-fee structures.</p>
        </div>

        <ServiceFaqSection items={FAQ} />

        <div className="mt-10 rounded-2xl border border-brand-100 bg-brand-50/30 p-5 sm:p-6">
          <p className="text-sm font-semibold text-brand-900 mb-3">Related reading</p>
          <ul className="space-y-2.5">
            <li className="text-sm text-brand-400"><Link href="/netsuite-suitescript-development" className="text-accent hover:underline">NetSuite SuiteScript development</Link>{" "}covers the scripting capabilities used for DCAA rate calculations, CLIN billing, and ICE schedule extraction.</li>
            <li className="text-sm text-brand-400"><Link href="/netsuite-saved-searches-dashboards" className="text-accent hover:underline">NetSuite saved searches and dashboards</Link>{" "}covers SuiteQL development for contract profitability, indirect rate schedules, and funded ceiling reporting.</li>
            <li className="text-sm text-brand-400"><Link href="/netsuite-managed-support" className="text-accent hover:underline">NetSuite managed support</Link>{" "}covers the retainer structure, hour tiers, and what is included across all plan levels.</li>
          </ul>
        </div>

        <div className="mt-10 rounded-2xl border border-brand-100 bg-white p-5 shadow-soft"><LeadFormLight /></div>
      </div>
    </main>
  );
}

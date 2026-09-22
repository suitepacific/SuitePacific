import type { Metadata } from "next";
import Link from "next/link";
import { Server, FileText, BarChart2, Workflow, Code2, ShieldCheck, RefreshCcw, Award, Headphones, Plug, Users, DollarSign, Layers, Clock } from "lucide-react";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Card } from "@/components/ui/Card";
import { IconBadge } from "@/components/ui/IconBadge";
import { BreadcrumbJsonLd, FaqJsonLd, ServiceJsonLd, OrganizationJsonLd } from "@/components/seo/JsonLd";
import { ServiceFaqSection } from "@/components/ui/ServiceFaqSection";
import { LeadFormLight } from "@/components/sections/LeadFormLight";
import { SITE_URL } from "@/lib/content";

const CHALLENGES = [
  { icon: Plug, title: "PSA integration with ConnectWise, Autotask, or HaloPSA", description: "MSPs using ConnectWise Manage, Autotask, HaloPSA, or ServiceNow for ticketing and time tracking need bidirectional integrations that sync client contracts, service tickets, and time entries to NetSuite for billing and revenue recognition without duplicate data entry between the PSA and ERP." },
  { icon: DollarSign, title: "Managed services recurring billing", description: "Monthly managed services agreements with per-device, per-user, per-seat, or flat-fee pricing require custom recurring billing scripts that read the current client service inventory, calculate the monthly charge, and generate invoices automatically at the billing cycle date." },
  { icon: Clock, title: "T&M and project billing alongside recurring", description: "MSPs billing a mix of flat-fee managed services, hourly break-fix labor, and project work on the same client account need billing scripts that combine all charge types on a single invoice, distinguishing recurring fees from variable labor and project charges clearly." },
  { icon: Layers, title: "Technician utilization reporting", description: "Billable versus non-billable time by technician, service type, and client requires SuiteQL saved searches from time entry data that standard NetSuite project reports do not produce in the format MSP service managers need to assess engineer productivity and adjust staffing." },
  { icon: FileText, title: "Client profitability reporting", description: "Measuring client-level profitability for managed services accounts requires allocating labor costs, vendor licensing costs, and overhead against recurring revenue per client. Standard NetSuite project reports show cost without the MSP-specific billing margin view that account managers need." },
  { icon: BarChart2, title: "Hardware and software asset billing", description: "MSPs procuring hardware and software licenses for clients, marking up vendor invoices, and billing through to clients with the margin applied require custom purchasing and billing workflows that link vendor bills to client invoices and maintain margin visibility per order." },
];

const SERVICES = [
  { icon: Code2, title: "SuiteScript Development", description: "Custom scripts for PSA time entry import, managed services recurring billing, per-device and per-user fee calculation, T&M invoice generation, client profitability calculations, and hardware markup billing automation.", href: "/netsuite-suitescript-development" },
  { icon: Workflow, title: "Workflow Automation", description: "SuiteFlow workflows for recurring billing approval and release, PSA contract renewal notifications, client overage alerts, hardware procurement approvals, and project billing milestone release authorization.", href: "/netsuite-workflow-automation" },
  { icon: BarChart2, title: "Saved Searches & Dashboards", description: "Technician billable utilization, client profitability by account, recurring MRR by service tier, hardware margin by vendor, PSA-to-billing reconciliation, and AR aging by client saved searches built with SuiteQL.", href: "/netsuite-saved-searches-dashboards" },
  { icon: Plug, title: "NetSuite Integrations", description: "Bidirectional integrations with ConnectWise Manage, Autotask, HaloPSA, ServiceNow, and Kaseya for ticket, contract, time entry, and asset data synchronization to NetSuite for billing and financial reporting.", href: "/netsuite-integrations" },
  { icon: Headphones, title: "Post-Go-Live Support", description: "Ongoing technical support for live MSP NetSuite accounts: PSA integration maintenance, recurring billing script upkeep, new client onboarding automation, and ongoing account optimization on a retainer.", href: "/netsuite-post-go-live-support" },
  { icon: Users, title: "Administrator Support", description: "Ongoing NetSuite administration for MSP accounts: client entity configuration, service item catalog management, period close support, recurring billing troubleshooting, and platform maintenance.", href: "/netsuite-administrator-support" },
];

const CUSTOMIZATIONS = [
  { title: "PSA time entry and ticket import scripts", description: "Scheduled SuiteScript that calls the ConnectWise, Autotask, or HaloPSA API, imports billable time entries and closed tickets by client and billing period, maps entries to NetSuite service items and projects, and queues them for invoice generation at the billing cycle date." },
  { title: "Managed services recurring billing automation", description: "Scheduled billing scripts that read each client&apos;s current managed services contract, calculate the monthly fee based on current device counts, user counts, or flat rate, generate the monthly invoice, and post it to the client&apos;s NetSuite AR without manual preparation." },
  { title: "Combined managed services and T&M invoicing", description: "User Event scripts that assemble a single client invoice combining the flat managed services fee, any billable T&M hours from PSA time entries, and project milestone charges, presenting all charge types clearly on one invoice with line item descriptions matching the client&apos;s contract structure." },
  { title: "Technician billable utilization saved searches", description: "SuiteQL saved searches that calculate billable hours, non-billable hours, and billable utilization rate by technician, service type, and client account from NetSuite time entry records, enabling service managers to identify utilization gaps and staffing decisions." },
  { title: "Client profitability reporting", description: "Custom saved searches that aggregate labor costs (at cost rate), vendor licensing costs, and overhead allocations against recurring and T&M billing revenue per client, calculating gross margin and contribution margin by managed services account." },
  { title: "Hardware procurement and margin tracking", description: "Linked purchase order and sales order workflows for hardware procurement that associate vendor bills to client invoices, apply the configured markup percentage per vendor or product category, and produce margin reporting by hardware vendor and client account." },
];

const WHY_SP = [
  { icon: ShieldCheck, title: "NetSuite-Certified", description: "Oracle NetSuite SuiteCloud Developer II and Administrator Professional certifications. Verified technical credentials across SuiteScript, SuiteFlow, and the NetSuite platform." },
  { icon: Users, title: "Direct Access", description: "You communicate directly with the person doing the work. No ticket system, no account manager, no offshore handoffs." },
  { icon: RefreshCcw, title: "Context Retained", description: "Ongoing knowledge of your MSP NetSuite account across every engagement. Each request builds on prior work without re-discovery." },
  { icon: Award, title: "Post-Go-Live Specialist", description: "We work exclusively with companies already live on NetSuite. No implementations. Every engagement is ongoing development and support for an active account." },
];

const COMPARISON = [
  { capability: "PSA integration", standard: "Manual time entry re-entry from ConnectWise or Autotask", withSP: "Scheduled scripts importing PSA time entries and tickets to NetSuite" },
  { capability: "Recurring billing", standard: "Manual monthly invoice generation for each managed services client", withSP: "Automated billing scripts generating invoices from contract records" },
  { capability: "Combined invoicing", standard: "Separate invoices for managed services and T&M", withSP: "Scripts combining recurring fees and T&M charges on one invoice" },
  { capability: "Technician utilization", standard: "Standard time reports without billable rate calculation", withSP: "SuiteQL searches for billable utilization by technician and service type" },
  { capability: "Client profitability", standard: "Revenue visible but cost allocation manual", withSP: "Custom searches allocating labor and vendor costs against client revenue" },
  { capability: "Hardware margin", standard: "Manual markup calculation and PO-to-invoice linking", withSP: "Linked PO/SO workflow with configured markup and margin reporting" },
];

const FAQ = [
  { question: "Does NetSuite work for managed service providers?", answer: "Yes. NetSuite is used by MSPs for financial management, recurring billing, project accounting, client profitability reporting, and vendor management. Post-go-live customization is required for PSA integrations with ConnectWise, Autotask, or HaloPSA, managed services recurring billing automation, combined T&M and managed services invoicing, technician utilization reporting, and client-level profitability analysis that standard NetSuite does not handle without SuiteScript development." },
  { question: "Can NetSuite integrate with ConnectWise or Autotask for MSP billing?", answer: "Yes, via scheduled scripts and RESTlet endpoints. SuitePacific builds integrations that connect NetSuite to ConnectWise Manage, Autotask, HaloPSA, and other PSA platforms via API, importing billable time entries, closed tickets, and contract data for billing generation. The integration runs on a scheduled basis so time entries posted in the PSA appear in NetSuite at the billing cycle without manual export and re-entry." },
  { question: "Can NetSuite automate monthly recurring billing for managed services?", answer: "Yes. SuitePacific builds managed services billing scripts that read each client&apos;s current contract (per-device, per-user, or flat-rate pricing), calculate the monthly managed services fee, and generate the invoice automatically at the billing cycle date. The scripts handle contract changes, device count updates, and proration for mid-cycle contract modifications." },
  { question: "Can NetSuite combine managed services and break-fix billing on one invoice?", answer: "Yes, via SuiteScript. SuitePacific builds combined invoice scripts that assemble the flat managed services fee and any billable T&M hours from PSA time entries on a single client invoice, distinguishing managed services charges from variable labor hours with clear line item descriptions matching the client&apos;s contract structure." },
  { question: "How does technician utilization reporting work in NetSuite for an MSP?", answer: "Technician utilization reporting requires SuiteQL saved searches that calculate billable hours, non-billable hours, and billable utilization rate by technician, service type, and client account from NetSuite time entry records. SuitePacific builds these utilization saved searches and KPI portlets that give MSP service managers a current view of engineer productivity and identify technicians with low billable utilization." },
  { question: "Can NetSuite track client profitability for managed services accounts?", answer: "Yes, via custom saved searches. SuitePacific builds client profitability reporting that aggregates labor costs at cost rate, vendor licensing costs, and overhead allocations against recurring and T&M billing revenue per client account. This gives MSP account managers the gross margin and contribution margin view by managed services client that standard NetSuite project reports do not produce." },
  { question: "What are common NetSuite customizations for managed service providers?", answer: "Common MSP builds include PSA integration scripts for ConnectWise, Autotask, and HaloPSA, managed services recurring billing automation, combined managed services and T&M invoicing, technician billable utilization saved searches, client profitability reporting, hardware procurement markup tracking, and MRR and churn reporting dashboards." },
  { question: "Who provides NetSuite support for managed service providers?", answer: "SuitePacific provides NetSuite post-go-live support for IT managed service providers and technology service companies, including PSA integrations, recurring billing automation, technician utilization reporting, and client profitability analysis, on a month-to-month retainer starting at $799 per month." },
];

export const metadata: Metadata = {
  title: "NetSuite Support for Managed Service Providers | SuitePacific",
  description: "NetSuite post-go-live support for MSPs. PSA integrations, recurring billing automation, technician utilization, client profitability, and combined managed services invoicing.",
  alternates: { canonical: "/industries/managed-service-providers" },
  openGraph: {
    title: "NetSuite Support for Managed Service Providers | SuitePacific",
    description: "NetSuite support for MSPs: ConnectWise and Autotask integrations, managed services recurring billing automation, technician utilization reporting, and client profitability analysis.",
    url: `${SITE_URL}/industries/managed-service-providers`,
    type: "website",
    images: [{ url: `${SITE_URL}/og-default.png`, width: 1200, height: 630 }],
  },
};

export default function ManagedServiceProvidersPage() {
  return (
    <main className="pt-32 pb-24 sm:pt-40 sm:pb-32">
      <BreadcrumbJsonLd items={[{ name: "Home", url: SITE_URL }, { name: "Industries", url: `${SITE_URL}/industries` }, { name: "Managed Service Providers", url: `${SITE_URL}/industries/managed-service-providers` }]} />
      <FaqJsonLd items={FAQ} />
      <ServiceJsonLd name="NetSuite Support for Managed Service Providers" description="NetSuite post-go-live support for MSPs including PSA integrations, managed services recurring billing, technician utilization, and client profitability reporting." url={`${SITE_URL}/industries/managed-service-providers`} serviceType="NetSuite MSP Support" datePublished="2026-09-23T00:00:00+00:00" dateModified="2026-09-23T00:00:00+00:00" offers={[{ name: "Care", price: 799, description: "10 hours/month: PSA integration maintenance, saved searches, and administration for MSP accounts. Month-to-month after 3-month minimum." }, { name: "Care Plus", price: 1499, description: "20 hours/month: active development including recurring billing, PSA integrations, and utilization reporting. Month-to-month." }, { name: "Care Pro", price: 2499, description: "35 hours/month: full MSP account coverage including billing automation, PSA sync, and ongoing support. Month-to-month." }]} />
      <OrganizationJsonLd />
      <div className="mx-auto max-w-3xl px-6 lg:px-8">
        <SectionHeading as="h1" eyebrow="Managed Service Providers" title="NetSuite Support & Development for Managed Service Providers" subtitle="PSA integrations, managed services recurring billing, technician utilization reporting, and client profitability analysis for MSPs already live on NetSuite." align="left" />
        <div className="mt-6 rounded-2xl border border-brand-100 bg-white p-5 shadow-soft">
          <p className="text-sm text-brand-600 mb-3">Tell us what your MSP NetSuite account needs.</p>
          <LeadFormLight />
        </div>
        <p className="mt-3 text-xs text-brand-400">NetSuite-Certified · Post-go-live specialist · Sandbox-first development · Month-to-month</p>
        <p className="mt-2 text-xs text-brand-300"><time dateTime="2026-09">Published September 2026</time></p>

        <div className="rounded-2xl border-l-4 border-accent bg-brand-50/50 p-5 mt-8 mb-6">
          <p className="text-xs font-semibold uppercase tracking-wide text-accent mb-2">Quick answer</p>
          <p className="text-sm text-brand-700 leading-relaxed">NetSuite support for managed service providers refers to post-go-live technical assistance for the PSA integration, recurring billing automation, and client profitability workflows that MSPs require. NetSuite does not connect natively to ConnectWise Manage, Autotask, or HaloPSA, so time entry and contract data must be imported via custom scheduled scripts. Managed services recurring billing requires scripts that read per-device or per-user contract terms and generate monthly invoices automatically. Combining flat managed services fees with T&M break-fix charges on a single client invoice requires SuiteScript that assembles both charge types. Technician billable utilization reporting requires SuiteQL saved searches from time entry records. Client profitability analysis requires custom cost allocation against client revenue. SuitePacific builds these MSP workflows for IT service companies already live on NetSuite, with all development tested in Sandbox before production, on a month-to-month retainer starting at $799 per month after a three-month minimum.</p>
        </div>

        <p className="text-sm text-brand-400 leading-relaxed">Managed service providers that go live on NetSuite commonly find that PSA integration, automated recurring billing, and client-level profitability reporting require SuiteScript development that standard NetSuite service and project modules do not address for MSP-specific workflows. SuitePacific covers this technical layer for MSP accounts already live on NetSuite.</p>

        <div className="mt-14">
          <h2 className="text-lg font-semibold text-brand-900 mb-2">How does SuitePacific extend NetSuite for managed service providers?</h2>
          <p className="text-sm text-brand-400 mb-4">Common capability gaps in standard NetSuite and what SuitePacific adds to fill them.</p>
          <div className="overflow-x-auto">
            <table className="w-full text-sm border-collapse">
              <thead><tr className="border-b border-brand-100"><th className="text-left py-3 pr-6 font-semibold text-brand-900 w-1/3">Capability</th><th className="text-left py-3 pr-6 font-semibold text-brand-900 w-1/3">Standard NetSuite</th><th className="text-left py-3 font-semibold text-brand-900 w-1/3">With SuitePacific</th></tr></thead>
              <tbody>{COMPARISON.map((row) => (<tr key={row.capability} className="border-b border-brand-50"><td className="py-3 pr-6 font-medium text-brand-900 align-top">{row.capability}</td><td className="py-3 pr-6 text-brand-400 align-top">{row.standard}</td><td className="py-3 text-brand-700 align-top">{row.withSP}</td></tr>))}</tbody>
            </table>
          </div>
        </div>

        <div className="mt-14">
          <h2 className="text-lg font-semibold text-brand-900 mb-6">What NetSuite challenges do managed service providers face?</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">{CHALLENGES.map((item) => (<Card key={item.title} className="p-5 flex flex-col gap-3"><IconBadge icon={item.icon} /><h3 className="font-semibold text-brand-900 text-sm">{item.title}</h3><p className="text-sm text-brand-400">{item.description}</p></Card>))}</div>
        </div>

        <div className="mt-14">
          <h2 className="text-lg font-semibold text-brand-900 mb-6">What NetSuite services does SuitePacific provide for managed service providers?</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">{SERVICES.map((service) => (<Link key={service.href} href={service.href} className="group"><Card className="p-5 flex items-start gap-4 h-full group-hover:border-brand-200 transition-colors"><IconBadge icon={service.icon} /><div><h3 className="font-semibold text-brand-900 text-sm group-hover:text-accent transition-colors">{service.title}</h3><p className="mt-1.5 text-sm text-brand-400">{service.description}</p></div></Card></Link>))}</div>
        </div>

        <div className="mt-14">
          <h2 className="text-lg font-semibold text-brand-900 mb-2">What are common NetSuite customizations for managed service providers?</h2>
          <p className="text-sm text-brand-400 mb-6">These are the builds SuitePacific delivers for MSP accounts on a recurring basis.</p>
          <div className="space-y-4">{CUSTOMIZATIONS.map((item, i) => (<div key={item.title} className="flex items-start gap-5"><span className="text-xs font-semibold text-accent bg-accent/10 rounded-full h-7 w-7 flex items-center justify-center shrink-0 mt-0.5">{String(i + 1).padStart(2, "0")}</span><div><h3 className="font-semibold text-brand-900 text-sm">{item.title}</h3><p className="mt-0.5 text-sm text-brand-400">{item.description}</p></div></div>))}</div>
        </div>

        <div className="mt-14">
          <h2 className="text-lg font-semibold text-brand-900 mb-6">Why do managed service providers choose SuitePacific?</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">{WHY_SP.map((item) => (<Card key={item.title} className="p-5 flex items-start gap-4"><IconBadge icon={item.icon} /><div><h3 className="font-semibold text-brand-900 text-sm">{item.title}</h3><p className="mt-1.5 text-sm text-brand-400">{item.description}</p></div></Card>))}</div>
          <p className="mt-5 text-sm text-brand-400">For SaaS and software service billing: <Link href="/industries/saas-technology" className="text-accent hover:underline">NetSuite for SaaS and technology</Link> covers subscription billing, ARR/MRR reporting, and renewal automation for software and technology service companies.</p>
        </div>

        <ServiceFaqSection items={FAQ} />

        <div className="mt-10 rounded-2xl border border-brand-100 bg-brand-50/30 p-5 sm:p-6">
          <p className="text-sm font-semibold text-brand-900 mb-3">Related reading</p>
          <ul className="space-y-2.5">
            <li className="text-sm text-brand-400"><Link href="/netsuite-integrations" className="text-accent hover:underline">NetSuite integrations</Link>{" "}covers the API integration approach for PSA platforms like ConnectWise, Autotask, and HaloPSA.</li>
            <li className="text-sm text-brand-400"><Link href="/netsuite-suitescript-development" className="text-accent hover:underline">NetSuite SuiteScript development</Link>{" "}covers the scripting capabilities used for recurring billing automation and combined invoicing logic.</li>
            <li className="text-sm text-brand-400"><Link href="/netsuite-managed-support" className="text-accent hover:underline">NetSuite managed support</Link>{" "}covers the retainer structure, hour tiers, and what is included across all plan levels.</li>
          </ul>
        </div>

        <div className="mt-10 rounded-2xl border border-brand-100 bg-white p-5 shadow-soft"><LeadFormLight /></div>
      </div>
    </main>
  );
}

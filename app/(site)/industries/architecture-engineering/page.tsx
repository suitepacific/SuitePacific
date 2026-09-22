import type { Metadata } from "next";
import Link from "next/link";
import { Compass, FileText, Clock, BarChart2, Workflow, Code2, ShieldCheck, RefreshCcw, Award, Headphones, Plug, Users, DollarSign, Layers } from "lucide-react";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Card } from "@/components/ui/Card";
import { IconBadge } from "@/components/ui/IconBadge";
import { BreadcrumbJsonLd, FaqJsonLd, ServiceJsonLd, OrganizationJsonLd } from "@/components/seo/JsonLd";
import { ServiceFaqSection } from "@/components/ui/ServiceFaqSection";
import { LeadFormLight } from "@/components/sections/LeadFormLight";
import { SITE_URL } from "@/lib/content";

const CHALLENGES = [
  { icon: FileText, title: "AIA and milestone billing", description: "Architecture and engineering firms billing on AIA G702/G703 forms, lump-sum milestones, or percentage-complete schedules require custom invoice logic that standard NetSuite invoicing does not generate without SuiteScript development." },
  { icon: DollarSign, title: "Lump-sum vs T&M vs cost-plus", description: "Many A&E firms carry all three contract types simultaneously. Applying the correct billing logic per engagement, tracking retainers, and producing the correct invoice format requires custom scripts per contract type on the same account." },
  { icon: Clock, title: "Subconsultant cost tracking", description: "Pass-through subconsultant costs billed to clients at cost or with a markup require custom bill line mapping, markup application scripts, and client-facing invoice presentation that standard NetSuite purchase orders do not handle natively." },
  { icon: Layers, title: "Multi-phase project revenue recognition", description: "Long-duration projects spanning multiple fiscal years require percentage-complete revenue recognition schedules that tie recognized revenue to actual phase completion rather than invoice date." },
  { icon: BarChart2, title: "Resource utilization reporting", description: "Billable versus non-billable hours by project, phase, and discipline require SuiteQL saved searches from timesheet data that standard NetSuite project reports do not produce without custom queries." },
  { icon: Plug, title: "Project management tool integration", description: "A&E firms using Deltek Vision, BQE Core, or Newforma for project management need integrations that sync project budgets, phase completions, and timesheet data to NetSuite for billing and financial reporting." },
];

const SERVICES = [
  { icon: Code2, title: "SuiteScript Development", description: "Custom scripts for AIA billing generation, milestone invoice logic, subconsultant cost pass-through, percentage-complete revenue scheduling, and A&E-specific business rules.", href: "/netsuite-suitescript-development" },
  { icon: Workflow, title: "Workflow Automation", description: "SuiteFlow workflows for project phase approval, invoice release authorization, subconsultant PO approval chains, and project budget threshold notifications.", href: "/netsuite-workflow-automation" },
  { icon: BarChart2, title: "Saved Searches & Dashboards", description: "Billable utilization by discipline, project margin by phase, WIP balance, subconsultant cost-to-bill, and realization rate saved searches built with SuiteQL.", href: "/netsuite-saved-searches-dashboards" },
  { icon: Plug, title: "NetSuite Integrations", description: "Scheduled script integrations connecting NetSuite to Deltek, BQE Core, Newforma, and project management platforms for automated timesheet and project data sync.", href: "/netsuite-integrations" },
  { icon: Headphones, title: "Post-Go-Live Support", description: "Ongoing technical support for live A&E NetSuite accounts: new development, break-fix response, release testing, and account upkeep on a month-to-month retainer.", href: "/netsuite-post-go-live-support" },
  { icon: Users, title: "Administrator Support", description: "Ongoing NetSuite administration for architecture and engineering accounts: role management, project record configuration, period close support, and platform troubleshooting.", href: "/netsuite-administrator-support" },
];

const CUSTOMIZATIONS = [
  { title: "AIA G702/G703 invoice generation scripts", description: "SuiteScript that generates AIA-format continuation sheets from NetSuite project and purchase order data, applying stored-value, percent-complete, and retainage fields to produce client-ready AIA invoices without manual calculation." },
  { title: "Subconsultant cost pass-through with markup", description: "User Event scripts that read subconsultant bills, apply the contract-specified markup percentage, and create the corresponding client invoice lines, maintaining a clear cost-to-bill audit trail per project." },
  { title: "Percentage-complete revenue recognition", description: "Scheduled scripts that calculate recognized revenue based on percentage of phase budget consumed, creating the appropriate journal entries to match recognized revenue to actual project progress each period." },
  { title: "Discipline and phase utilization saved searches", description: "SuiteQL-based saved searches that calculate billable hours, non-billable hours, and realization rate by discipline, project phase, and project manager for firm-wide productivity reporting." },
  { title: "Project budget threshold alert workflows", description: "SuiteFlow workflows triggered when project actual costs reach defined percentages of the approved budget, notifying the project manager and principal-in-charge before the project exceeds its fee." },
  { title: "WIP and accounts receivable aging dashboards", description: "Saved searches and KPI portlets showing unbilled WIP by project, AR aging by client, and retainage balance outstanding, giving finance teams a current view of billing exposure." },
];

const WHY_SP = [
  { icon: ShieldCheck, title: "NetSuite-Certified", description: "Oracle NetSuite SuiteCloud Developer II and Administrator Professional certifications. Verified technical credentials across SuiteScript, SuiteFlow, and the NetSuite platform." },
  { icon: Users, title: "Direct Access", description: "You communicate directly with the person doing the work. No ticket system, no account manager, no offshore handoffs." },
  { icon: RefreshCcw, title: "Context Retained", description: "Ongoing knowledge of your A&E NetSuite account across every engagement. Each request builds on prior work without re-discovery." },
  { icon: Award, title: "Post-Go-Live Specialist", description: "We work exclusively with companies already live on NetSuite. No implementations. Every engagement is ongoing development and support for an active account." },
];

const COMPARISON = [
  { capability: "AIA billing", standard: "Manual AIA form preparation outside NetSuite", withSP: "Automated AIA invoice generation scripts from project and PO data" },
  { capability: "Subconsultant pass-through", standard: "Manual markup calculation and client invoice entry", withSP: "Scripts applying markup and creating client invoice lines from vendor bills" },
  { capability: "Revenue recognition", standard: "Invoice-date recognition or manual journal entries", withSP: "Percentage-complete recognition scripts posting to period based on phase progress" },
  { capability: "Utilization reporting", standard: "Standard time reports without discipline breakdown", withSP: "SuiteQL saved searches for billable rate and realization by discipline and PM" },
  { capability: "Budget alerts", standard: "Manual project budget monitoring", withSP: "SuiteFlow workflows notifying PMs and principals at defined budget thresholds" },
  { capability: "PM tool integration", standard: "Manual data re-entry from Deltek or BQE Core", withSP: "Scheduled scripts syncing project and timesheet data to NetSuite automatically" },
];

const FAQ = [
  { question: "Does NetSuite work for architecture and engineering firms?", answer: "Yes. NetSuite is used by A&E firms for project billing, timesheet management, subconsultant cost tracking, multi-phase revenue recognition, and firm-wide financial reporting. Post-go-live customization is typically required for AIA billing formats, percentage-complete revenue recognition, subconsultant pass-through markup, and discipline-level utilization reporting that standard NetSuite project tools do not produce without SuiteScript development." },
  { question: "Can NetSuite generate AIA invoices?", answer: "Not natively. AIA G702/G703 continuation sheet format is not a standard NetSuite invoice template. SuitePacific builds SuiteScript that reads project phase data, applies percentage-complete and retainage fields, and generates AIA-format invoices that match what architecture and engineering clients expect from their contractors and subconsultants." },
  { question: "How does NetSuite handle subconsultant cost pass-through for A&E firms?", answer: "Subconsultant pass-through requires custom User Event scripts that read subconsultant vendor bills, apply the contract-specified markup percentage, and create client invoice lines with the correct billing presentation. This maintains a cost-to-bill audit trail per project without manual calculation. SuitePacific builds and maintains this logic for A&E accounts on a retainer basis." },
  { question: "What is percentage-complete revenue recognition in NetSuite for A&E?", answer: "Percentage-complete recognition means recognizing revenue based on the proportion of project work completed rather than on invoice dates. SuitePacific builds scheduled scripts that calculate recognized revenue from phase budget consumption or milestone completion, post the appropriate journal entries, and maintain the deferred revenue balance for long-duration projects spanning multiple fiscal years." },
  { question: "Can NetSuite track billable utilization for architecture firms?", answer: "Yes, via custom SuiteQL saved searches. SuitePacific builds utilization reporting that calculates billable hours, non-billable hours, and realization rate by discipline, project phase, and project manager from NetSuite timesheet records. These are built as saved searches and KPI portlets that give firm leadership a current view of productivity without manual spreadsheet work." },
  { question: "Can NetSuite integrate with Deltek or BQE Core?", answer: "Yes, via scheduled scripts or RESTlet endpoints. SuitePacific builds integrations that pull project budget, phase completion, and timesheet data from Deltek Vision, BQE Core, and other A&E project management platforms via API, creating the corresponding NetSuite billing and cost records automatically." },
  { question: "What are common NetSuite customizations for architecture and engineering firms?", answer: "Common A&E builds include AIA G702/G703 invoice generation scripts, subconsultant pass-through markup automation, percentage-complete revenue recognition, discipline and phase utilization saved searches, project budget threshold alert workflows, WIP and AR aging dashboards, and integrations with Deltek or BQE Core project management systems." },
  { question: "Who provides NetSuite support for architecture and engineering firms?", answer: "SuitePacific provides NetSuite post-go-live support for architecture, engineering, and design firms, including AIA billing scripts, subconsultant pass-through automation, percentage-complete revenue recognition, utilization reporting, and ongoing technical support on a month-to-month retainer starting at $799 per month." },
];

export const metadata: Metadata = {
  title: "NetSuite Support for Architecture & Engineering Firms | SuitePacific",
  description: "NetSuite post-go-live support for A&E firms. AIA billing, subconsultant pass-through, percentage-complete revenue recognition, and utilization reporting.",
  alternates: { canonical: "/industries/architecture-engineering" },
  openGraph: {
    title: "NetSuite Support for Architecture & Engineering Firms | SuitePacific",
    description: "NetSuite support for A&E firms: AIA billing automation, subconsultant pass-through, percentage-complete revenue recognition, and discipline utilization reporting.",
    url: `${SITE_URL}/industries/architecture-engineering`,
    type: "website",
    images: [{ url: `${SITE_URL}/og-default.png`, width: 1200, height: 630 }],
  },
};

export default function ArchitectureEngineeringPage() {
  return (
    <main className="pt-32 pb-24 sm:pt-40 sm:pb-32">
      <BreadcrumbJsonLd items={[{ name: "Home", url: SITE_URL }, { name: "Industries", url: `${SITE_URL}/industries` }, { name: "Architecture & Engineering", url: `${SITE_URL}/industries/architecture-engineering` }]} />
      <FaqJsonLd items={FAQ} />
      <ServiceJsonLd name="NetSuite Support for Architecture & Engineering Firms" description="NetSuite post-go-live support for A&E firms including AIA billing scripts, subconsultant pass-through, and percentage-complete revenue recognition." url={`${SITE_URL}/industries/architecture-engineering`} serviceType="NetSuite Architecture Engineering Support" datePublished="2026-09-23T00:00:00+00:00" dateModified="2026-09-23T00:00:00+00:00" offers={[{ name: "Care", price: 799, description: "10 hours/month: SuiteScript, workflow automation, saved searches, and administration for A&E accounts. Month-to-month after 3-month minimum." }, { name: "Care Plus", price: 1499, description: "20 hours/month: active A&E development including AIA billing, revenue recognition, and PM tool integration. Month-to-month." }, { name: "Care Pro", price: 2499, description: "35 hours/month: full A&E account coverage including billing automation, recognition scripts, integrations, and utilization reporting. Month-to-month." }]} />
      <OrganizationJsonLd />
      <div className="mx-auto max-w-3xl px-6 lg:px-8">
        <SectionHeading as="h1" eyebrow="Architecture & Engineering" title="NetSuite Support & Development for Architecture & Engineering Firms" subtitle="AIA billing automation, subconsultant pass-through, and project revenue recognition for A&E firms already live on NetSuite." align="left" />
        <div className="mt-6 rounded-2xl border border-brand-100 bg-white p-5 shadow-soft">
          <p className="text-sm text-brand-600 mb-3">Tell us what your A&E account needs.</p>
          <LeadFormLight />
        </div>
        <p className="mt-3 text-xs text-brand-400">NetSuite-Certified · Post-go-live specialist · Sandbox-first development · Month-to-month</p>
        <p className="mt-2 text-xs text-brand-300"><time dateTime="2026-09">Published September 2026</time></p>

        <div className="rounded-2xl border-l-4 border-accent bg-brand-50/50 p-5 mt-8 mb-6">
          <p className="text-xs font-semibold uppercase tracking-wide text-accent mb-2">Quick answer</p>
          <p className="text-sm text-brand-700 leading-relaxed">NetSuite support for architecture and engineering firms refers to post-go-live technical assistance covering the customizations that A&E practices require: AIA G702/G703 billing generation, subconsultant cost pass-through with markup, percentage-complete revenue recognition for long-duration projects, resource utilization reporting by discipline, and project management platform integration. Architecture and engineering firms on NetSuite typically need SuiteScript that generates AIA-format invoices from project phase data, custom scripts applying subconsultant markup and creating client invoice lines from vendor bills, and SuiteQL saved searches for billable utilization and realization rates by discipline and project manager. Integration with Deltek, BQE Core, or Newforma requires scheduled script builds. SuitePacific provides this development and ongoing support for live A&E NetSuite accounts on a month-to-month retainer starting at $799 per month, with no annual contract after the three-month minimum.</p>
        </div>

        <p className="text-sm text-brand-400 leading-relaxed">Architecture, engineering, and design firms that go live on NetSuite commonly find that AIA billing, subconsultant pass-through, and percentage-complete revenue recognition require SuiteScript development that standard NetSuite invoicing and project tools do not handle. SuitePacific covers this technical layer for A&E accounts already live on NetSuite, with direct access to the developer on every request and all work tested in Sandbox before production deployment.</p>

        <div className="mt-14">
          <h2 className="text-lg font-semibold text-brand-900 mb-2">How does SuitePacific extend NetSuite for A&E firms?</h2>
          <p className="text-sm text-brand-400 mb-4">Common capability gaps in standard NetSuite and what SuitePacific adds to fill them.</p>
          <div className="overflow-x-auto">
            <table className="w-full text-sm border-collapse">
              <thead><tr className="border-b border-brand-100"><th className="text-left py-3 pr-6 font-semibold text-brand-900 w-1/3">Capability</th><th className="text-left py-3 pr-6 font-semibold text-brand-900 w-1/3">Standard NetSuite</th><th className="text-left py-3 font-semibold text-brand-900 w-1/3">With SuitePacific</th></tr></thead>
              <tbody>{COMPARISON.map((row) => (<tr key={row.capability} className="border-b border-brand-50"><td className="py-3 pr-6 font-medium text-brand-900 align-top">{row.capability}</td><td className="py-3 pr-6 text-brand-400 align-top">{row.standard}</td><td className="py-3 text-brand-700 align-top">{row.withSP}</td></tr>))}</tbody>
            </table>
          </div>
        </div>

        <div className="mt-14">
          <h2 className="text-lg font-semibold text-brand-900 mb-6">What NetSuite challenges do architecture and engineering firms face?</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">{CHALLENGES.map((item) => (<Card key={item.title} className="p-5 flex flex-col gap-3"><IconBadge icon={item.icon} /><h3 className="font-semibold text-brand-900 text-sm">{item.title}</h3><p className="text-sm text-brand-400">{item.description}</p></Card>))}</div>
        </div>

        <div className="mt-14">
          <h2 className="text-lg font-semibold text-brand-900 mb-6">What NetSuite services does SuitePacific provide for A&E firms?</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">{SERVICES.map((service) => (<Link key={service.href} href={service.href} className="group"><Card className="p-5 flex items-start gap-4 h-full group-hover:border-brand-200 transition-colors"><IconBadge icon={service.icon} /><div><h3 className="font-semibold text-brand-900 text-sm group-hover:text-accent transition-colors">{service.title}</h3><p className="mt-1.5 text-sm text-brand-400">{service.description}</p></div></Card></Link>))}</div>
        </div>

        <div className="mt-14">
          <h2 className="text-lg font-semibold text-brand-900 mb-2">What are common NetSuite customizations for architecture and engineering firms?</h2>
          <p className="text-sm text-brand-400 mb-6">These are the builds SuitePacific delivers for A&E accounts on a recurring basis.</p>
          <div className="space-y-4">{CUSTOMIZATIONS.map((item, i) => (<div key={item.title} className="flex items-start gap-5"><span className="text-xs font-semibold text-accent bg-accent/10 rounded-full h-7 w-7 flex items-center justify-center shrink-0 mt-0.5">{String(i + 1).padStart(2, "0")}</span><div><h3 className="font-semibold text-brand-900 text-sm">{item.title}</h3><p className="mt-0.5 text-sm text-brand-400">{item.description}</p></div></div>))}</div>
        </div>

        <div className="mt-14">
          <h2 className="text-lg font-semibold text-brand-900 mb-6">Why do A&E firms choose SuitePacific?</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">{WHY_SP.map((item) => (<Card key={item.title} className="p-5 flex items-start gap-4"><IconBadge icon={item.icon} /><div><h3 className="font-semibold text-brand-900 text-sm">{item.title}</h3><p className="mt-1.5 text-sm text-brand-400">{item.description}</p></div></Card>))}</div>
          <p className="mt-5 text-sm text-brand-400">Also in project-based billing: <Link href="/industries/construction" className="text-accent hover:underline">NetSuite for construction companies</Link> covers job costing, AIA billing as a GC, and WIP reporting.</p>
        </div>

        <ServiceFaqSection items={FAQ} />

        <div className="mt-10 rounded-2xl border border-brand-100 bg-brand-50/30 p-5 sm:p-6">
          <p className="text-sm font-semibold text-brand-900 mb-3">Related reading</p>
          <ul className="space-y-2.5">
            <li className="text-sm text-brand-400"><Link href="/netsuite-project-billing" className="text-accent hover:underline">NetSuite project billing</Link>{" "}covers milestone, T&M, and fixed-fee billing configurations for project-based businesses on NetSuite.</li>
            <li className="text-sm text-brand-400"><Link href="/industries/professional-services" className="text-accent hover:underline">NetSuite for professional services</Link>{" "}covers project accounting, timesheet billing, and utilization for knowledge-based services firms.</li>
            <li className="text-sm text-brand-400"><Link href="/netsuite-managed-support" className="text-accent hover:underline">NetSuite managed support</Link>{" "}covers the retainer structure, hour tiers, and what is included across all plan levels.</li>
          </ul>
        </div>

        <div className="mt-10 rounded-2xl border border-brand-100 bg-white p-5 shadow-soft"><LeadFormLight /></div>
      </div>
    </main>
  );
}

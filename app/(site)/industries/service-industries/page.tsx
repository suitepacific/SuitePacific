import type { Metadata } from "next";
import Link from "next/link";
import {
  Wrench,
  ClipboardList,
  DollarSign,
  BarChart2,
  Workflow,
  Code2,
  ShieldCheck,
  RefreshCcw,
  Award,
  Headphones,
  Plug,
  Users,
  FileText,
  Settings2,
} from "lucide-react";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Card } from "@/components/ui/Card";
import { IconBadge } from "@/components/ui/IconBadge";
import { BreadcrumbJsonLd, FaqJsonLd, ServiceJsonLd, OrganizationJsonLd } from "@/components/seo/JsonLd";
import { ServiceFaqSection } from "@/components/ui/ServiceFaqSection";
import { LeadFormLight } from "@/components/sections/LeadFormLight";
import { SITE_URL } from "@/lib/content";

const CHALLENGES = [
  {
    icon: DollarSign,
    title: "Time-and-materials billing",
    description:
      "Service companies billing on time and materials need invoicing logic that pulls technician labor from timesheet records, adds parts or materials at the correct markup, and generates invoices per work order or service call.",
  },
  {
    icon: ClipboardList,
    title: "Work order management",
    description:
      "Creating, dispatching, and closing work orders in NetSuite and linking the labor, parts, and expenses back to the originating service contract or customer requires custom field logic and SuiteScript automation.",
  },
  {
    icon: FileText,
    title: "Service contract and agreement billing",
    description:
      "Recurring service agreements billed monthly, quarterly, or annually require subscription-style billing logic that standard NetSuite recurring invoicing templates do not fully support for contract pricing structures.",
  },
  {
    icon: Wrench,
    title: "Field service management integration",
    description:
      "Service companies using FSM platforms for scheduling and dispatch need integrations that sync work order completion data, technician time logs, and parts usage to NetSuite for billing and cost tracking.",
  },
  {
    icon: Settings2,
    title: "Customer asset and equipment tracking",
    description:
      "Tracking customer-owned or company-owned equipment, service history, warranty status, and preventive maintenance schedules requires custom item and asset record configurations with SuiteScript automation.",
  },
  {
    icon: BarChart2,
    title: "Technician utilization reporting",
    description:
      "Billable versus non-billable hours by technician, service type, and region require saved searches from timesheet and work order data that standard NetSuite reports do not produce without SuiteQL queries.",
  },
];

const SERVICES = [
  {
    icon: Code2,
    title: "SuiteScript Development",
    description:
      "Custom scripts for work order billing, service contract invoicing, FSM platform data imports, and field service-specific business rules across all SuiteScript types.",
    href: "/netsuite-suitescript-development",
  },
  {
    icon: Workflow,
    title: "Workflow Automation",
    description:
      "SuiteFlow workflows for work order approval, invoice release authorization, service contract renewal notifications, and SLA-based escalation routing.",
    href: "/netsuite-workflow-automation",
  },
  {
    icon: BarChart2,
    title: "Saved Searches & Dashboards",
    description:
      "Technician utilization, billable versus non-billable hours, contract renewal pipeline, service margin by type, and work order aging saved searches built with SuiteQL.",
    href: "/netsuite-saved-searches-dashboards",
  },
  {
    icon: Plug,
    title: "NetSuite Integrations",
    description:
      "RESTlet and scheduled script integrations connecting NetSuite to FSM platforms, scheduling tools, and equipment tracking systems for automated billing and operations data sync.",
    href: "/netsuite-integrations",
  },
  {
    icon: Headphones,
    title: "Post-Go-Live Support",
    description:
      "Ongoing technical support for live service company NetSuite accounts: new development, break-fix response, release testing, and account upkeep on a month-to-month retainer.",
    href: "/netsuite-post-go-live-support",
  },
  {
    icon: Users,
    title: "Administrator Support",
    description:
      "Ongoing NetSuite administration for service industry accounts: role management, configuration changes, period close support, and platform troubleshooting.",
    href: "/netsuite-administrator-support",
  },
];

const CUSTOMIZATIONS = [
  {
    title: "Work order to invoice automation",
    description:
      "Scheduled Map/Reduce scripts that pull closed work orders, consolidate technician labor hours from timesheets, add parts and materials from work order lines, apply billing rates, and generate invoices for client review.",
  },
  {
    title: "Service contract recurring billing scripts",
    description:
      "Scripts that generate recurring invoices from active service agreement records on the correct billing cycle, applying contracted rates and adjusting for any mid-period additions or removals from the agreement scope.",
  },
  {
    title: "FSM platform data import",
    description:
      "Scheduled scripts that pull work order completion data, technician time entries, and parts usage records from FSM platforms via API and create the corresponding NetSuite transactions for billing and cost tracking.",
  },
  {
    title: "Technician utilization saved searches",
    description:
      "SuiteQL-based saved searches that calculate billable hours, non-billable hours, and utilization rate by technician, region, and service category for operations and management reporting.",
  },
  {
    title: "Customer equipment asset records",
    description:
      "Custom item and serialized inventory record configurations that track customer-owned equipment including service history, warranty expiration, preventive maintenance schedule, and last-service date with automated reminder workflows.",
  },
  {
    title: "SLA-based escalation workflows",
    description:
      "SuiteFlow workflows triggered by work order creation time that escalate unassigned or unresolved tickets to supervisors based on elapsed time and service tier, enforcing contracted response time commitments.",
  },
];

const WHY_SP = [
  {
    icon: ShieldCheck,
    title: "NetSuite-Certified",
    description:
      "Oracle NetSuite SuiteCloud Developer II and Administrator Professional certifications. Verified technical credentials across SuiteScript, SuiteFlow, and the NetSuite platform.",
  },
  {
    icon: Users,
    title: "Direct Access",
    description:
      "You communicate directly with the person doing the work. No ticket system, no account manager, no offshore handoffs.",
  },
  {
    icon: RefreshCcw,
    title: "Context Retained",
    description:
      "Ongoing knowledge of your service company NetSuite account across every engagement. Each request builds on prior work without re-discovery.",
  },
  {
    icon: Award,
    title: "Post-Go-Live Specialist",
    description:
      "We work exclusively with companies already live on NetSuite. No implementations. Every engagement is ongoing development and support for an active account.",
  },
];

const COMPARISON = [
  {
    capability: "Work order billing",
    standard: "Manual invoice creation per work order",
    withSP: "Automated work order to invoice scripts with labor, parts, and markup logic",
  },
  {
    capability: "Service contract billing",
    standard: "Manual recurring invoice creation from agreements",
    withSP: "Automated recurring billing scripts from service agreement records",
  },
  {
    capability: "FSM integration",
    standard: "Manual data re-entry from field service platform",
    withSP: "Automated import scripts syncing work order completion and time data",
  },
  {
    capability: "Technician reporting",
    standard: "Standard time reports without utilization metrics",
    withSP: "SuiteQL saved searches showing billable hours and utilization by technician",
  },
  {
    capability: "Equipment tracking",
    standard: "Manual spreadsheet or external system",
    withSP: "Custom asset records in NetSuite with service history and warranty workflows",
  },
  {
    capability: "SLA management",
    standard: "Manual escalation monitoring",
    withSP: "SuiteFlow escalation workflows triggered by elapsed time and service tier",
  },
];

const FAQ = [
  {
    question: "Does NetSuite work for service industry companies?",
    answer:
      "Yes. NetSuite is used by field service, maintenance, repair, facility management, cleaning, and other service businesses for work order billing, service contract management, technician time tracking, and operations reporting. Post-go-live customization is typically required for work order to invoice automation, FSM platform integration, service agreement billing, and technician utilization reporting that standard NetSuite does not produce without SuiteScript development.",
  },
  {
    question: "What is NetSuite used for in field service companies?",
    answer:
      "Field service companies use NetSuite for work order management, technician time billing, service contract invoicing, customer equipment tracking, parts and materials costs, and financial reporting. Custom SuiteScript adds work order to invoice automation, FSM platform data imports, service agreement recurring billing, and SuiteQL saved searches for utilization and margin reporting.",
  },
  {
    question: "Can NetSuite automate work order billing?",
    answer:
      "Yes, via scheduled Map/Reduce scripts. SuitePacific builds billing automation that pulls closed work orders, consolidates technician labor from timesheet records, adds parts and materials from work order lines, applies the correct billing rates, and generates invoices ready for client review. This replaces manual invoice creation for each work order or service call.",
  },
  {
    question: "Can NetSuite integrate with field service management software?",
    answer:
      "Yes, via RESTlet endpoints or scheduled import scripts. SuitePacific builds integrations that pull work order completion data, technician time logs, and parts usage from FSM platforms via API and create the corresponding NetSuite billing and cost records automatically, eliminating manual re-entry between the two systems.",
  },
  {
    question: "How does NetSuite handle service contract billing?",
    answer:
      "Standard NetSuite recurring invoice templates handle simple fixed-fee contracts but do not manage complex service agreement structures with tiered pricing, coverage inclusions, or mid-period additions. SuitePacific builds billing scripts that generate recurring invoices from service agreement records on the correct cycle, applying contracted rates and adjusting for scope changes.",
  },
  {
    question: "What does technician utilization reporting look like in NetSuite?",
    answer:
      "Technician utilization reporting in NetSuite requires SuiteQL-based saved searches that pull timesheet data, categorize hours as billable or non-billable, and calculate utilization by technician, service category, and region. SuitePacific builds these as saved searches and KPI portlets that give operations managers a current view of workforce productivity without manual spreadsheet work.",
  },
  {
    question: "Can NetSuite track customer equipment and service history?",
    answer:
      "Yes, via custom serialized inventory or asset record configurations. SuitePacific builds custom item records that track customer-owned or company-maintained equipment including service history, warranty status, last-service date, and next preventive maintenance date, with SuiteFlow reminder workflows triggered as maintenance windows approach.",
  },
  {
    question: "Who provides NetSuite support for service industry companies?",
    answer:
      "SuitePacific provides NetSuite post-go-live support for field service, maintenance, repair, and service industry companies, including work order billing automation, service contract billing scripts, FSM platform integrations, technician utilization reporting, and ongoing technical support on a month-to-month retainer starting at $799 per month.",
  },
];

export const metadata: Metadata = {
  title: "NetSuite Support for Service Industry Companies | SuitePacific",
  description:
    "NetSuite post-go-live support for field service, maintenance, and repair companies. Work order billing, service contract automation, FSM integration, and technician reporting.",
  alternates: { canonical: "/industries/service-industries" },
  openGraph: {
    title: "NetSuite Support for Service Industry Companies | SuitePacific",
    description:
      "NetSuite support for service businesses: work order billing automation, service contract scripts, FSM integration, and technician utilization reporting.",
    url: `${SITE_URL}/industries/service-industries`,
    type: "website",
    images: [{ url: `${SITE_URL}/og-default.png`, width: 1200, height: 630 }],
  },
};

export default function ServiceIndustriesPage() {
  return (
    <main className="pt-32 pb-24 sm:pt-40 sm:pb-32">
      <BreadcrumbJsonLd
        items={[
          { name: "Home", url: SITE_URL },
          { name: "Industries", url: `${SITE_URL}/industries` },
          { name: "Service Industries", url: `${SITE_URL}/industries/service-industries` },
        ]}
      />
      <FaqJsonLd items={FAQ} />
      <ServiceJsonLd
        name="NetSuite Support for Service Industry Companies"
        description="NetSuite post-go-live support for field service, maintenance, repair, and service businesses including work order billing, service contract automation, and FSM integration."
        url={`${SITE_URL}/industries/service-industries`}
        serviceType="NetSuite Service Industry Support"
        datePublished="2026-09-23T00:00:00+00:00"
        dateModified="2026-09-23T00:00:00+00:00"
        offers={[
          { name: "Care", price: 799, description: "10 hours/month: SuiteScript, workflow automation, saved searches, and administration for service company accounts. Month-to-month after 3-month minimum." },
          { name: "Care Plus", price: 1499, description: "20 hours/month: active development including work order billing, service contract scripts, and FSM integration maintenance. Month-to-month." },
          { name: "Care Pro", price: 2499, description: "35 hours/month: full service industry account coverage including billing automation, integrations, and operations reporting. Month-to-month." },
        ]}
      />
      <OrganizationJsonLd />

      <div className="mx-auto max-w-3xl px-6 lg:px-8">
        <SectionHeading
          as="h1"
          eyebrow="Service Industries"
          title="NetSuite Support & Development for Service Industry Companies"
          subtitle="Technical support, work order billing automation, and FSM integrations for field service, maintenance, and repair businesses already live on NetSuite."
          align="left"
        />

        <div className="mt-6 rounded-2xl border border-brand-100 bg-white p-5 shadow-soft">
          <p className="text-sm text-brand-600 mb-3">Tell us what your service company account needs.</p>
          <LeadFormLight />
        </div>
        <p className="mt-3 text-xs text-brand-400">
          NetSuite-Certified · Post-go-live specialist · Sandbox-first development · Month-to-month
        </p>
        <p className="mt-2 text-xs text-brand-300">
          <time dateTime="2026-09">Published September 2026</time>
        </p>

        {/* QA block */}
        <div className="rounded-2xl border-l-4 border-accent bg-brand-50/50 p-5 mt-8 mb-6">
          <p className="text-xs font-semibold uppercase tracking-wide text-accent mb-2">Quick answer</p>
          <p className="text-sm text-brand-700 leading-relaxed">
            NetSuite support for service industry companies refers to post-go-live technical assistance covering the customizations that field service, maintenance, repair, and facility management businesses require: work order to invoice automation, service contract recurring billing, field service management platform integration, customer equipment tracking, and technician utilization reporting. Service companies on NetSuite typically need scheduled scripts that pull closed work orders and generate consolidated client invoices, custom service agreement billing logic, and SuiteQL saved searches for billable versus non-billable hours by technician and region. FSM platform integration with scheduling and dispatch systems requires RESTlet or scheduled import script builds. SuitePacific provides this development and ongoing support for live service industry NetSuite accounts on a month-to-month retainer starting at $799 per month, with no annual contract after the three-month minimum.
          </p>
        </div>

        <p className="text-sm text-brand-400 leading-relaxed">
          Field service, maintenance, cleaning, security, HVAC, and facility management companies that go live on
          NetSuite commonly find that work order billing, service agreement invoicing, and FSM platform integration
          require SuiteScript development that standard NetSuite invoicing tools do not handle. SuitePacific
          covers this technical layer for service industry accounts already live on NetSuite: work order to invoice
          automation, recurring contract billing, FSM integrations, equipment tracking, and technician
          utilization reporting on a month-to-month basis.
        </p>

        {/* Comparison */}
        <div className="mt-14">
          <h2 className="text-lg font-semibold text-brand-900 mb-2">
            How does SuitePacific extend NetSuite for service companies?
          </h2>
          <p className="text-sm text-brand-400 mb-4">
            Common capability gaps in standard NetSuite and what SuitePacific adds to fill them.
          </p>
          <div className="overflow-x-auto">
            <table className="w-full text-sm border-collapse">
              <thead>
                <tr className="border-b border-brand-100">
                  <th className="text-left py-3 pr-6 font-semibold text-brand-900 w-1/3">Capability</th>
                  <th className="text-left py-3 pr-6 font-semibold text-brand-900 w-1/3">Standard NetSuite</th>
                  <th className="text-left py-3 font-semibold text-brand-900 w-1/3">With SuitePacific</th>
                </tr>
              </thead>
              <tbody>
                {COMPARISON.map((row) => (
                  <tr key={row.capability} className="border-b border-brand-50">
                    <td className="py-3 pr-6 font-medium text-brand-900 align-top">{row.capability}</td>
                    <td className="py-3 pr-6 text-brand-400 align-top">{row.standard}</td>
                    <td className="py-3 text-brand-700 align-top">{row.withSP}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Challenges */}
        <div className="mt-14">
          <h2 className="text-lg font-semibold text-brand-900 mb-6">
            What NetSuite challenges do service industry companies face?
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            {CHALLENGES.map((item) => (
              <Card key={item.title} className="p-5 flex flex-col gap-3">
                <IconBadge icon={item.icon} />
                <h3 className="font-semibold text-brand-900 text-sm">{item.title}</h3>
                <p className="text-sm text-brand-400">{item.description}</p>
              </Card>
            ))}
          </div>
        </div>

        {/* Services */}
        <div className="mt-14">
          <h2 className="text-lg font-semibold text-brand-900 mb-6">
            What NetSuite services does SuitePacific provide for service companies?
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            {SERVICES.map((service) => (
              <Link key={service.href} href={service.href} className="group">
                <Card className="p-5 flex items-start gap-4 h-full group-hover:border-brand-200 transition-colors">
                  <IconBadge icon={service.icon} />
                  <div>
                    <h3 className="font-semibold text-brand-900 text-sm group-hover:text-accent transition-colors">
                      {service.title}
                    </h3>
                    <p className="mt-1.5 text-sm text-brand-400">{service.description}</p>
                  </div>
                </Card>
              </Link>
            ))}
          </div>
        </div>

        {/* Customizations */}
        <div className="mt-14">
          <h2 className="text-lg font-semibold text-brand-900 mb-2">
            What are common NetSuite customizations for service companies?
          </h2>
          <p className="text-sm text-brand-400 mb-6">
            These are the builds SuitePacific delivers for service industry accounts on a recurring basis.
          </p>
          <div className="space-y-4">
            {CUSTOMIZATIONS.map((item, i) => (
              <div key={item.title} className="flex items-start gap-5">
                <span className="text-xs font-semibold text-accent bg-accent/10 rounded-full h-7 w-7 flex items-center justify-center shrink-0 mt-0.5">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <div>
                  <h3 className="font-semibold text-brand-900 text-sm">{item.title}</h3>
                  <p className="mt-0.5 text-sm text-brand-400">{item.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Why SuitePacific */}
        <div className="mt-14">
          <h2 className="text-lg font-semibold text-brand-900 mb-6">
            Why do service companies choose SuitePacific?
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            {WHY_SP.map((item) => (
              <Card key={item.title} className="p-5 flex items-start gap-4">
                <IconBadge icon={item.icon} />
                <div>
                  <h3 className="font-semibold text-brand-900 text-sm">{item.title}</h3>
                  <p className="mt-1.5 text-sm text-brand-400">{item.description}</p>
                </div>
              </Card>
            ))}
          </div>
          <p className="mt-5 text-sm text-brand-400">
            Looking for professional services billing and project accounting? See our{" "}
            <Link href="/industries/professional-services" className="text-accent hover:underline">
              NetSuite for professional services
            </Link>{" "}
            page instead.
          </p>
        </div>

        <ServiceFaqSection items={FAQ} />

        {/* Related reading */}
        <div className="mt-10 rounded-2xl border border-brand-100 bg-brand-50/30 p-5 sm:p-6">
          <p className="text-sm font-semibold text-brand-900 mb-3">Related reading</p>
          <ul className="space-y-2.5">
            <li className="text-sm text-brand-400">
              <Link href="/netsuite-fsm-support" className="text-accent hover:underline">
                NetSuite field service management support
              </Link>{" "}
              covers FSM module configuration, scheduling integration, and technician billing for service companies.
            </li>
            <li className="text-sm text-brand-400">
              <Link href="/netsuite-managed-support" className="text-accent hover:underline">
                NetSuite managed support
              </Link>{" "}
              covers the retainer structure, hour tiers, and what is included across all plan levels.
            </li>
            <li className="text-sm text-brand-400">
              <Link href="/industries/professional-services" className="text-accent hover:underline">
                NetSuite for professional services
              </Link>{" "}
              covers project accounting, timesheet billing, and utilization for knowledge-based services firms.
            </li>
          </ul>
        </div>

        <div className="mt-10 rounded-2xl border border-brand-100 bg-white p-5 shadow-soft">
          <LeadFormLight />
        </div>
      </div>
    </main>
  );
}

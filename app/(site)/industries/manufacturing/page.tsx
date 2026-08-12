import type { Metadata } from "next";
import Link from "next/link";
import {
  Code2,
  Workflow,
  BarChart2,
  FileText,
  Gauge,
  Headphones,
  ShieldCheck,
  Users,
  RefreshCcw,
  Award,
  Settings2,
  Package,
  Layers,
} from "lucide-react";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Card } from "@/components/ui/Card";
import { IconBadge } from "@/components/ui/IconBadge";
import { BreadcrumbJsonLd, FaqJsonLd, ServiceJsonLd, OrganizationJsonLd, VideoObjectJsonLd } from "@/components/seo/JsonLd";
import { ServiceFaqSection } from "@/components/ui/ServiceFaqSection";
import { LeadFormLight } from "@/components/sections/LeadFormLight";
import { SITE_URL } from "@/lib/content";

const CHALLENGES = [
  {
    icon: Settings2,
    title: "BOM and assembly logic",
    description:
      "Multi-level BOMs, component substitutions, and costing methods that standard NetSuite configuration cannot handle without SuiteScript custom logic.",
  },
  {
    icon: Workflow,
    title: "Work order automation",
    description:
      "Work order status transitions, labor posting, component deduction, and production completion logic that goes beyond what SuiteFlow configuration can reach.",
  },
  {
    icon: Package,
    title: "Lot and bin tracking enforcement",
    description:
      "Enforcing lot number entry on item receipts and transfers, validating bin locations, and restricting inventory movement without the correct traceability data.",
  },
  {
    icon: BarChart2,
    title: "Production reporting gaps",
    description:
      "Production vs. actual cost variance, WIP value, and work order profitability reporting that require custom saved searches and SuiteQL since NetSuite does not produce these natively.",
  },
  {
    icon: Layers,
    title: "Approval workflow complexity",
    description:
      "Purchase orders, work orders, and manufacturing change requests often require multi-level approval chains with conditional routing based on amount, category, or vendor type.",
  },
  {
    icon: Gauge,
    title: "Performance in high-volume accounts",
    description:
      "Manufacturing accounts with many open work orders, item receipts, and assembly builds can develop governance limit issues and slow saved searches that need targeted optimization.",
  },
];

const SERVICES = [
  {
    icon: Code2,
    title: "SuiteScript Development",
    description:
      "Custom User Event, Scheduled, Map/Reduce, and Suitelet scripts for BOM logic, work order automation, lot tracking enforcement, and manufacturing-specific business rules.",
    href: "/netsuite-suitescript-development",
  },
  {
    icon: Workflow,
    title: "Workflow Automation",
    description:
      "SuiteFlow approval workflows for purchase orders, work orders, and manufacturing change requests, with conditional routing and automated notifications.",
    href: "/netsuite-workflow-automation",
  },
  {
    icon: BarChart2,
    title: "Saved Searches & Dashboards",
    description:
      "Production dashboards, WIP reporting, work order status tracking, and variance analysis using saved searches, SuiteQL, and KPI portlets.",
    href: "/netsuite-saved-searches-dashboards",
  },
  {
    icon: Headphones,
    title: "Post-Go-Live Support",
    description:
      "Ongoing technical support for your live manufacturing NetSuite account: new development, fixes, release testing, and account upkeep on a month-to-month basis.",
    href: "/netsuite-post-go-live-support",
  },
  {
    icon: FileText,
    title: "Advanced PDF Templates",
    description:
      "Custom pick lists, work order forms, packing slips, and production documents built with FreeMarker and conditional field logic for your manufacturing workflows.",
    href: "/netsuite-advanced-pdf-templates",
  },
  {
    icon: Gauge,
    title: "Account Optimization",
    description:
      "Performance diagnostics for manufacturing accounts with high transaction volume: governance limit fixes, script audits, saved search indexing, and technical debt cleanup.",
    href: "/netsuite-account-optimization",
  },
];

const CUSTOMIZATIONS = [
  {
    title: "Work order completion automation",
    description:
      "User Event scripts that automate component deduction, finished goods posting, and status transitions when a work order is marked complete, reducing manual steps and data entry errors.",
  },
  {
    title: "BOM validation on sales orders",
    description:
      "Client or User Event scripts that check component availability before a sales order for assembled items is confirmed, surfacing shortages before they reach fulfillment.",
  },
  {
    title: "Production variance reporting",
    description:
      "Saved searches and SuiteQL queries showing planned vs. actual cost per work order, helping the finance team track manufacturing margin without a custom report tool.",
  },
  {
    title: "Lot and bin enforcement scripts",
    description:
      "User Event scripts that require lot number entry on item receipts and transfers, reject records without valid bin assignments, and enforce traceability requirements.",
  },
  {
    title: "Multi-level PO approval workflows",
    description:
      "SuiteFlow approval chains that route purchase orders through manager, director, and executive tiers based on amount and vendor category, with email notification at each step.",
  },
  {
    title: "Manufacturing KPI dashboards",
    description:
      "Role-specific dashboards with KPI portlets for open work orders by status, WIP value by item, production schedule adherence, and inventory turns for operations teams.",
  },
];

const WHY_SP = [
  {
    icon: ShieldCheck,
    title: "NetSuite-Certified",
    description:
      "Oracle NetSuite's SuiteCloud Developer II and Administrator Professional certifications. Verified technical credentials across SuiteScript, SuiteFlow, and the NetSuite platform.",
  },
  {
    icon: Users,
    title: "Direct Access",
    description:
      "You communicate directly with the person doing the work. No ticket system, no account manager as an intermediary, no offshore handoffs.",
  },
  {
    icon: RefreshCcw,
    title: "Context Retained",
    description:
      "Ongoing knowledge of your manufacturing account retained across every engagement. Each request builds on prior work without re-discovery.",
  },
  {
    icon: Award,
    title: "Post-Go-Live Specialist",
    description:
      "We work exclusively with companies already live on NetSuite. No implementations, no pre-go-live work. Every engagement is ongoing development and support.",
  },
];

const FAQ = [
  {
    question: "What is NetSuite used for in manufacturing?",
    answer:
      "Manufacturing companies use NetSuite to manage inventory, assemblies and BOMs, work orders, purchase orders, production scheduling, and financial reporting. The platform supports both discrete and process manufacturing workflows, with modules for manufacturing routing, lot and serial number tracking, and multi-location inventory. Most manufacturers require SuiteScript customization to match their specific production logic, approval chains, and reporting requirements.",
  },
  {
    question: "Is NetSuite suitable for manufacturing companies?",
    answer:
      "Yes, particularly for mid-market manufacturers that need integrated ERP, inventory, and financial management without the cost of an enterprise system. NetSuite includes a Manufacturing module with work orders, BOMs, routings, and assembly builds. Customization is typically required for industry-specific workflows, costing logic, and reporting that goes beyond the standard configuration.",
  },
  {
    question: "What are common NetSuite problems for manufacturers?",
    answer:
      "The most common issues are BOM and assembly logic that needs custom scripting, work order automation that standard SuiteFlow cannot fully handle, production vs. actual variance reporting that requires custom saved searches, lot and bin tracking that needs enforcement scripts, and approval workflows for POs and work orders. Performance issues in high-volume accounts are also common as transaction counts grow.",
  },
  {
    question: "What does NetSuite support for manufacturing companies include?",
    answer:
      "Post-go-live support for manufacturing NetSuite accounts includes ongoing SuiteScript development for BOM and work order logic, SuiteFlow workflow builds for approval chains, custom saved searches and dashboards for production reporting, advanced PDF templates for work order documents and pick lists, account optimization for performance issues, and release testing when new NetSuite versions affect manufacturing-related scripts and workflows.",
  },
  {
    question: "Can NetSuite be customized for manufacturing processes?",
    answer:
      "Yes. SuiteScript User Event scripts, Client scripts, and Map/Reduce scripts handle logic that standard configuration cannot reach, including BOM validation on order entry, component deduction automation, lot number enforcement, and production-specific field logic. SuiteFlow handles approval chains. Together, these allow NetSuite to match most manufacturing workflows without third-party add-ons.",
  },
  {
    question: "Can NetSuite manufacturing workflows be automated?",
    answer:
      "Yes. Common automations include work order status transitions triggered by record updates, purchase order approval chains with multi-level routing, component availability checks on sales order entry, and email notifications at key production milestones. More complex automations, such as automated work order creation from sales orders or production schedule updates, require SuiteScript rather than SuiteFlow alone.",
  },
  {
    question: "How can NetSuite improve manufacturing reporting?",
    answer:
      "Custom saved searches and SuiteQL queries produce reporting that NetSuite does not generate natively: production vs. actual cost variance, WIP value by item, open work orders by status and due date, inventory turns by location, and lot traceability reports. These are built as saved searches or KPI portlets and added to role-specific dashboards so the operations and finance teams have the data they need without exporting to spreadsheets.",
  },
  {
    question: "What does a NetSuite manufacturing consultant do?",
    answer:
      "A NetSuite manufacturing consultant reviews the existing account setup, identifies gaps between standard NetSuite behavior and actual production requirements, and builds the SuiteScript customizations, SuiteFlow workflows, and saved searches needed to close those gaps. Ongoing engagements cover new development as requirements evolve, maintenance of existing scripts, and release testing after NetSuite updates.",
  },
  {
    question: "Who provides NetSuite support for manufacturing companies?",
    answer:
      "SuitePacific provides NetSuite post-go-live support for manufacturing companies, including SuiteScript customization, workflow automation, production reporting, lot and bin tracking enforcement, advanced PDF templates, and ongoing technical support. We work on a month-to-month basis with no long-term contract.",
  },
  {
    question: "Who can support a NetSuite manufacturing account after go-live?",
    answer:
      "After an implementation partner's engagement ends, ongoing support is typically handled by a post-go-live NetSuite consulting firm. SuitePacific specializes in exactly this: taking over manufacturing NetSuite accounts after implementation, reviewing existing customizations, and providing ongoing development, fixes, and optimization.",
  },
  {
    question: "Who provides NetSuite development for manufacturers?",
    answer:
      "SuitePacific provides NetSuite SuiteScript development for manufacturing companies, including User Event scripts for BOM logic and work order automation, Map/Reduce scripts for batch processing, and Suitelet-based tools for production-specific workflows. Development is tested in Sandbox before production deployment.",
  },
  {
    question: "How does SuitePacific support manufacturing companies using NetSuite?",
    answer:
      "SuitePacific provides dedicated NetSuite technical support for manufacturing companies on a month-to-month basis. This includes SuiteScript development for BOM and work order customization, SuiteFlow approval workflow builds, custom saved searches and dashboards for production reporting, advanced PDF templates for manufacturing documents, and account optimization for performance issues. We work directly with your team without an account manager layer.",
  },
];

const COMPARISON = [
  {
    capability: "BOM management",
    standard: "Multi-level BOM structure with standard costing",
    withSP: "Component substitution logic, costing overrides, and assembly validation via SuiteScript",
  },
  {
    capability: "Work order processing",
    standard: "Manual status updates and standard completion",
    withSP: "Automated status transitions, component deduction, and completion scripts",
  },
  {
    capability: "Lot and bin tracking",
    standard: "Tracking fields available, entry not enforced",
    withSP: "Entry enforcement scripts, transfer validation, and traceability saved searches",
  },
  {
    capability: "Production reporting",
    standard: "Standard inventory and transaction reports",
    withSP: "WIP, variance, and production cost saved searches",
  },
  {
    capability: "Approval routing",
    standard: "Single-level approval workflow",
    withSP: "Multi-level conditional routing by amount, vendor, and category",
  },
  {
    capability: "KPI dashboards",
    standard: "Standard dashboard portlets",
    withSP: "Role-specific manufacturing KPI portlets updated from saved searches",
  },
];

export const metadata: Metadata = {
  title: "NetSuite Support for Manufacturing Companies",
  description:
    "NetSuite post-go-live support and development for manufacturing companies. SuiteScript customization, work order automation, BOM logic, production reporting, and ongoing technical support.",
  alternates: { canonical: "/industries/manufacturing" },
  openGraph: {
    title: "NetSuite Support for Manufacturing Companies",
    description:
      "NetSuite post-go-live support and development for manufacturing companies. SuiteScript customization, work order automation, BOM logic, and production reporting.",
    url: "https://suitepacific.com/industries/manufacturing",
    type: "website",
    images: [{ url: "https://suitepacific.com/og-default.png", width: 1200, height: 630 }],
  },
};

export default function ManufacturingPage() {
  return (
    <main className="pt-32 pb-24 sm:pt-40 sm:pb-32">
      <BreadcrumbJsonLd
        items={[
          { name: "Home", url: SITE_URL },
          { name: "Industries", url: `${SITE_URL}/industries` },
          { name: "Manufacturing", url: `${SITE_URL}/industries/manufacturing` },
        ]}
      />
      <FaqJsonLd items={FAQ} />
      <ServiceJsonLd
        name="NetSuite Support for Manufacturing Companies"
        description="NetSuite post-go-live support and development for manufacturing companies, including SuiteScript customization, workflow automation, and production reporting."
        url={`${SITE_URL}/industries/manufacturing`}
        serviceType="NetSuite Manufacturing Support"
      />
      <OrganizationJsonLd />
      <VideoObjectJsonLd
        name="SuitePacific Introduction: NetSuite Post-Go-Live Support and Consulting"
        description="An introduction to SuitePacific, a boutique NetSuite post-go-live support team providing SuiteScript development, workflow automation, and ongoing account optimization for businesses already live on NetSuite."
        videoId="IQvWN_yZ24A"
        uploadDate="2026-08-12"
        isShort
      />

      <div className="mx-auto max-w-3xl px-6 lg:px-8">
        <SectionHeading
          as="h1"
          eyebrow="Manufacturing"
          title="NetSuite Support & Development for Manufacturing Companies"
          subtitle="Technical support, SuiteScript customization, and workflow automation for manufacturers already live on NetSuite."
          align="left"
        />

        <div className="mt-6 rounded-2xl border border-brand-100 bg-white p-5 shadow-soft">
          <LeadFormLight />
        </div>
        <p className="mt-3 text-xs text-brand-400">
          NetSuite-Certified · Post-go-live specialist · Sandbox-first development · Month-to-month
        </p>
        <p className="mt-2 text-xs text-brand-300">
          <time dateTime="2026-08">Published August 2026</time>
        </p>

        <p className="mt-8 text-sm text-brand-400">
          Manufacturing companies go live on NetSuite with standard BOM and work order configuration, and typically
          discover within months that production workflows, costing requirements, and lot tracking enforcement need
          custom SuiteScript logic to operate reliably. SuitePacific provides this technical layer for manufacturers
          already live on NetSuite, covering BOM and assembly customization, work order automation, lot and bin
          tracking enforcement, production reporting, and ongoing SuiteScript development for business logic that
          standard configuration cannot reach. Manufacturing accounts in NetSuite typically require significant customization to match
          production workflows, costing requirements, and approval chains. Common areas include multi-level BOM
          validation scripts, work order completion automation, production variance reporting via saved searches, and
          conditional approval routing for purchase orders and work orders. SuitePacific builds and maintains these
          customizations on a month-to-month basis, tested in Sandbox before production deployment. Our lead
          developer holds Oracle NetSuite&apos;s SuiteCloud Developer II certification. Work is done directly, with
          no offshore handoffs or account manager layer.
        </p>

        {/* Comparison */}
        <div className="mt-14" data-section="comparison">
          <h2 className="text-lg font-semibold text-brand-900 mb-2">
            How does SuitePacific extend a standard NetSuite manufacturing account?
          </h2>
          <p className="text-sm text-brand-400 mb-4">
            These are common capability gaps and what SuitePacific adds to fill them.
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
        <div className="mt-14" data-section="challenges">
          <h2 className="text-lg font-semibold text-brand-900 mb-6">
            What NetSuite challenges do manufacturing companies face?
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
        <div className="mt-14" data-section="services">
          <h2 className="text-lg font-semibold text-brand-900 mb-6">What NetSuite services does SuitePacific provide for manufacturing companies?</h2>
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
        <div className="mt-14" data-section="customizations">
          <h2 className="text-lg font-semibold text-brand-900 mb-2">
            What are common NetSuite customizations for manufacturing?
          </h2>
          <p className="text-sm text-brand-400 mb-6">
            These are the kinds of builds we do for manufacturers on a recurring basis.
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
        <div className="mt-14" data-section="why-suitepacific">
          <h2 className="text-lg font-semibold text-brand-900 mb-6">
            Why do manufacturing companies choose SuitePacific?
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
            Not live yet? See our{" "}
            <Link
              href="/netsuite-implementation-partner-vs-managed-support"
              className="text-accent hover:underline"
            >
              implementation partner vs. managed support guide
            </Link>{" "}
            instead.
          </p>
        </div>

        <ServiceFaqSection items={FAQ} />

        <div className="mt-10 rounded-2xl border border-brand-100 bg-white p-5 shadow-soft">
          <LeadFormLight />
        </div>
      </div>
    </main>
  );
}

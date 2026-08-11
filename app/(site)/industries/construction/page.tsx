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
  Layers,
  Wrench,
} from "lucide-react";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Card } from "@/components/ui/Card";
import { IconBadge } from "@/components/ui/IconBadge";
import { BreadcrumbJsonLd, FaqJsonLd, ServiceJsonLd } from "@/components/seo/JsonLd";
import { ServiceFaqSection } from "@/components/ui/ServiceFaqSection";
import { LeadFormLight } from "@/components/sections/LeadFormLight";
import { SITE_URL } from "@/lib/content";

const CHALLENGES = [
  {
    icon: Gauge,
    title: "Job costing accuracy",
    description:
      "Tracking labor, materials, subcontractor, and equipment costs against project budgets with allocation scripts and cost-code logic that standard NetSuite project accounting does not provide.",
  },
  {
    icon: Wrench,
    title: "Change order management",
    description:
      "Change orders that update project budgets, timelines, and billing schedules across linked records need workflow and script automation beyond what standard configuration supports.",
  },
  {
    icon: FileText,
    title: "Progress billing",
    description:
      "Billing based on percentage complete or milestone completion requires scripts that calculate billable amounts from project data and generate invoices without manual calculation.",
  },
  {
    icon: Users,
    title: "Subcontractor management",
    description:
      "Tracking purchase orders, compliance documents, lien waivers, and payment history across multiple subcontractors per project requires custom fields, workflows, and reminder scripts.",
  },
  {
    icon: BarChart2,
    title: "Project reporting gaps",
    description:
      "Project profitability, budget vs. actual, cash flow by project, and WIP reporting require custom saved searches and dashboards since NetSuite does not produce these for construction natively.",
  },
  {
    icon: Layers,
    title: "Multi-level approval complexity",
    description:
      "Subcontractor POs, change orders, and project budget variances often require multi-step approval chains with conditional routing based on amount and project role.",
  },
];

const SERVICES = [
  {
    icon: Headphones,
    title: "Post-Go-Live Support",
    description:
      "Ongoing technical support for your live construction NetSuite account: new development, fixes, release testing, and account upkeep on a month-to-month basis.",
    href: "/netsuite-post-go-live-support",
  },
  {
    icon: Code2,
    title: "SuiteScript Development",
    description:
      "Custom scripts for job costing logic, progress billing automation, change order processing, subcontractor compliance tracking, and project-specific business rules.",
    href: "/netsuite-suitescript-development",
  },
  {
    icon: Workflow,
    title: "Workflow Automation",
    description:
      "SuiteFlow workflows for change order approvals, subcontractor PO routing, budget variance escalation, and automated notifications at project milestones.",
    href: "/netsuite-workflow-automation",
  },
  {
    icon: BarChart2,
    title: "Saved Searches & Dashboards",
    description:
      "Project profitability dashboards, budget vs. actual reporting, WIP tracking, and cash flow by project built with saved searches, SuiteQL, and KPI portlets.",
    href: "/netsuite-saved-searches-dashboards",
  },
  {
    icon: FileText,
    title: "Advanced PDF Templates",
    description:
      "Custom progress billing invoices, subcontractor PO forms, lien waiver documents, and project status reports built with FreeMarker and conditional field logic.",
    href: "/netsuite-advanced-pdf-templates",
  },
  {
    icon: Gauge,
    title: "Account Optimization",
    description:
      "Performance diagnostics for construction accounts with complex project transactions: saved search indexing, script audits, and governance limit fixes.",
    href: "/netsuite-account-optimization",
  },
];

const CUSTOMIZATIONS = [
  {
    title: "Change order approval workflows",
    description:
      "SuiteFlow workflows that route change orders through project manager, finance, and executive approval tiers, with automatic updates to project budget and contract values on approval.",
  },
  {
    title: "Progress billing automation",
    description:
      "Scripts that calculate percentage complete from project cost records and generate progress billing invoices with the correct line-item breakdown and supporting detail.",
  },
  {
    title: "Budget vs. actual job cost reporting",
    description:
      "Saved searches and SuiteQL queries showing labor, material, and subcontractor costs against original and revised budgets, with variance and forecast fields per cost category.",
  },
  {
    title: "Subcontractor compliance tracking",
    description:
      "Custom fields on vendor records for certificate of insurance, license, and lien waiver status, with SuiteFlow reminder workflows triggered by expiry dates.",
  },
  {
    title: "Project profitability dashboards",
    description:
      "Role-specific dashboards with project margin, WIP value, cash flow, and open commitment portlets for project managers and the finance team.",
  },
  {
    title: "Lien waiver tracking on vendor payments",
    description:
      "User Event scripts that create lien waiver tracking records on vendor bill payment, with status fields and a dashboard view of outstanding waivers by project and vendor.",
  },
];

const WHY_SP = [
  {
    icon: ShieldCheck,
    title: "SuiteCloud Developer II Certified",
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
      "Ongoing knowledge of your construction account retained across every engagement. Each request builds on prior work without re-discovery.",
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
    question: "Is NetSuite suitable for construction companies?",
    answer:
      "Yes. NetSuite's project accounting capabilities, including project records, budgeting, and billing, make it a workable ERP for construction companies managing multiple projects. The platform handles job costing, subcontractor purchase orders, and project-based revenue recognition. Most construction companies require SuiteScript customization for change order management, progress billing automation, and project-specific reporting that standard configuration does not produce.",
  },
  {
    question: "What is NetSuite used for in construction?",
    answer:
      "Construction companies use NetSuite for project accounting, job costing, subcontractor purchase order management, progress billing, accounts payable, financial reporting, and cash flow management. The platform's project records support budget tracking, cost allocation, and billing by milestone or percentage complete. Customization is typically needed for change order workflows, lien waiver tracking, and project profitability reporting.",
  },
  {
    question: "How can NetSuite support construction companies?",
    answer:
      "NetSuite supports construction companies through project accounting records, job costing, vendor and subcontractor management, and billing automation. Post-go-live support extends this with custom SuiteScript logic for change order processing, progress billing, compliance tracking, and project reporting that goes beyond the standard feature set. Ongoing support covers new development, release testing, and fixes as project workflows evolve.",
  },
  {
    question: "What are common NetSuite customizations for construction?",
    answer:
      "Common builds include change order approval workflows that update project budgets automatically, progress billing scripts that calculate percentage complete from cost records, budget vs. actual reporting with variance fields, subcontractor compliance tracking with expiry date reminders, lien waiver tracking on vendor payments, and project profitability dashboards for finance and project management teams.",
  },
  {
    question: "Can NetSuite handle project accounting for construction?",
    answer:
      "Yes. NetSuite's project record supports cost tracking by cost category, budget management, and billing. Job costing requires custom saved searches to show labor, material, and subcontractor costs against budget by cost code. Progress billing and percentage-of-completion calculations typically require SuiteScript customization to pull from project cost data and generate accurate invoices.",
  },
  {
    question: "How can NetSuite automate construction workflows?",
    answer:
      "Common automations include change order routing through project manager and finance approval chains, subcontractor PO approval based on amount and project, budget variance escalation when costs exceed thresholds, automated lien waiver requests on payment runs, and milestone notifications to project stakeholders. More complex automations, such as progress billing generation, require SuiteScript builds.",
  },
  {
    question: "How can NetSuite improve construction reporting?",
    answer:
      "Custom saved searches and SuiteQL produce job cost summaries by cost category, budget vs. actual variance by project, WIP schedules for the finance team, cash flow by project, and open subcontractor commitment reports. These are built as saved searches or portlets on project manager and finance dashboards, replacing spreadsheet-based reporting.",
  },
  {
    question: "What does a NetSuite construction consultant do?",
    answer:
      "A NetSuite construction consultant reviews the existing project accounting setup, identifies gaps between standard NetSuite behavior and actual construction workflows, and builds the SuiteScript customizations, SuiteFlow approval chains, PDF templates, and saved searches needed to close those gaps. Ongoing engagements cover new builds as project workflows evolve and maintenance of existing customizations.",
  },
  {
    question: "Who provides NetSuite support for construction companies?",
    answer:
      "SuitePacific provides NetSuite post-go-live support for construction companies, including SuiteScript customization for job costing and billing, SuiteFlow workflow builds for change orders and approvals, project reporting and dashboards, advanced PDF templates for billing and compliance documents, and ongoing technical support on a month-to-month basis.",
  },
  {
    question: "Who can support a NetSuite construction account after go-live?",
    answer:
      "After an implementation partner's engagement ends, ongoing support is typically handled by a post-go-live NetSuite consulting firm. SuitePacific specializes in exactly this: taking over construction NetSuite accounts after implementation, reviewing existing customizations, and providing ongoing development, fixes, and optimization.",
  },
  {
    question: "Who provides NetSuite development for construction companies?",
    answer:
      "SuitePacific provides NetSuite SuiteScript development for construction companies, including progress billing scripts, change order automation, job costing logic, subcontractor compliance tracking, and project-specific saved searches. Development is tested in Sandbox before production deployment.",
  },
  {
    question: "How does SuitePacific support construction companies using NetSuite?",
    answer:
      "SuitePacific provides dedicated NetSuite technical support for construction companies on a month-to-month basis. This includes SuiteScript development for job costing, change orders, and progress billing; SuiteFlow approval workflow builds; project profitability dashboards; custom PDF templates for billing and compliance documents; and account optimization. We work directly with your team without an account manager layer.",
  },
];

export const metadata: Metadata = {
  title: "NetSuite Support for Construction Companies",
  description:
    "NetSuite post-go-live support and development for construction companies. Job costing, change order automation, progress billing, project reporting, and subcontractor management.",
  alternates: { canonical: "/industries/construction" },
  openGraph: {
    title: "NetSuite Support for Construction Companies",
    description:
      "NetSuite post-go-live support and development for construction companies. Job costing, change order automation, and project reporting.",
    url: "https://suitepacific.com/industries/construction",
    type: "website",
    images: [{ url: "https://suitepacific.com/og-default.png", width: 1200, height: 630 }],
  },
};

export default function ConstructionPage() {
  return (
    <main className="pt-32 pb-24 sm:pt-40 sm:pb-32">
      <BreadcrumbJsonLd
        items={[
          { name: "Home", url: SITE_URL },
          { name: "Industries", url: `${SITE_URL}/industries` },
          { name: "Construction", url: `${SITE_URL}/industries/construction` },
        ]}
      />
      <FaqJsonLd items={FAQ} />
      <ServiceJsonLd
        name="NetSuite Support for Construction Companies"
        description="NetSuite post-go-live support and development for construction companies, including job costing, change order automation, progress billing, and project reporting."
        url={`${SITE_URL}/industries/construction`}
        serviceType="NetSuite Construction Support"
      />

      <div className="mx-auto max-w-3xl px-6 lg:px-8">
        <SectionHeading
          as="h1"
          eyebrow="Construction"
          title="NetSuite Support & Development for Construction Companies"
          subtitle="Technical support, SuiteScript customization, and workflow automation for construction companies already live on NetSuite."
          align="left"
        />

        <div className="mt-6 rounded-2xl border border-brand-100 bg-white p-5 shadow-soft">
          <LeadFormLight />
        </div>
        <p className="mt-3 text-xs text-brand-400">
          SuiteCloud Developer II certified · Post-go-live specialist · Sandbox-first development · Month-to-month
        </p>

        <p className="mt-8 text-sm text-brand-400">
          SuitePacific provides NetSuite post-go-live support and development for construction companies. We work
          with construction firms already live on NetSuite, handling the technical work that follows initial
          implementation: job costing logic, change order approval workflows, progress billing automation,
          subcontractor compliance tracking, and project profitability reporting. Construction accounts in NetSuite
          typically require significant customization to match actual project billing workflows, cost allocation
          requirements, and approval chains. Common areas include change order workflows that automatically update
          project budgets, progress billing scripts that calculate percentage complete from cost records, and project
          dashboards for finance and project management teams. SuitePacific builds and maintains these
          customizations on a month-to-month basis, tested in Sandbox before production deployment. Our lead
          developer holds Oracle NetSuite&apos;s SuiteCloud Developer II certification. Work is done directly, with
          no offshore handoffs or account manager layer.
        </p>

        {/* Challenges */}
        <div className="mt-14" data-section="challenges">
          <h2 className="text-lg font-semibold text-brand-900 mb-6">
            NetSuite challenges construction companies face after go-live
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
          <h2 className="text-lg font-semibold text-brand-900 mb-6">NetSuite services for construction</h2>
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
            Common construction NetSuite customizations
          </h2>
          <p className="text-sm text-brand-400 mb-6">
            These are the kinds of builds we do for construction companies on a recurring basis.
          </p>
          <div className="space-y-4">
            {CUSTOMIZATIONS.map((item, i) => (
              <div key={item.title} className="flex items-start gap-5">
                <span className="text-xs font-semibold text-accent bg-accent/10 rounded-full h-7 w-7 flex items-center justify-center shrink-0 mt-0.5">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <div>
                  <p className="font-semibold text-brand-900 text-sm">{item.title}</p>
                  <p className="mt-0.5 text-sm text-brand-400">{item.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Why SuitePacific */}
        <div className="mt-14" data-section="why-suitepacific">
          <h2 className="text-lg font-semibold text-brand-900 mb-6">
            Why construction companies choose SuitePacific
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

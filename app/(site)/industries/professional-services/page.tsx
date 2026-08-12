import type { Metadata } from "next";
import Link from "next/link";
import {
  Code2,
  Workflow,
  BarChart2,
  FileText,
  Headphones,
  ShieldCheck,
  Users,
  RefreshCcw,
  Award,
  Settings2,
  Clock,
  Gauge,
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
    icon: Gauge,
    title: "Project accounting accuracy",
    description:
      "Tracking time, expenses, and costs against project budgets with accurate allocation, billing, and profitability reporting that matches how the firm actually manages projects.",
  },
  {
    icon: Clock,
    title: "Timesheet and billing workflow",
    description:
      "Timesheet approval routing, billable vs. non-billable classification, and invoice generation from approved time entries require workflow and scripting beyond standard configuration.",
  },
  {
    icon: Settings2,
    title: "Revenue recognition complexity",
    description:
      "Percentage-of-completion and milestone-based revenue recognition that needs custom scripts to pull from project data and post the correct amounts without manual journal entries.",
  },
  {
    icon: BarChart2,
    title: "Project profitability reporting",
    description:
      "Margin by project, resource utilization, unbilled time aging, and WIP reporting require custom saved searches and SuiteQL since NetSuite does not produce these natively.",
  },
  {
    icon: Users,
    title: "Resource management",
    description:
      "Tracking team capacity, project assignments, and availability across the firm requires custom fields and dashboards that standard NetSuite resource records do not provide.",
  },
  {
    icon: FileText,
    title: "Client billing complexity",
    description:
      "Multiple billing arrangements per client, including fixed fee, time and materials, retainer, and milestone, coexist and require different invoice formats and approval chains.",
  },
];

const SERVICES = [
  {
    icon: Headphones,
    title: "Post-Go-Live Support",
    description:
      "Ongoing technical support for your live professional services NetSuite account: new development, fixes, release testing, and account upkeep on a month-to-month basis.",
    href: "/netsuite-post-go-live-support",
  },
  {
    icon: Code2,
    title: "SuiteScript Development",
    description:
      "Custom scripts for project billing logic, timesheet processing, revenue recognition, resource utilization tracking, and professional services-specific business rules.",
    href: "/netsuite-suitescript-development",
  },
  {
    icon: Workflow,
    title: "Workflow Automation",
    description:
      "SuiteFlow workflows for timesheet approvals, project billing authorizations, expense approvals, milestone notifications, and escalation chains.",
    href: "/netsuite-workflow-automation",
  },
  {
    icon: BarChart2,
    title: "Saved Searches & Dashboards",
    description:
      "Project profitability dashboards, resource utilization reporting, unbilled time aging, WIP tracking, and client billing summaries built with saved searches and SuiteQL.",
    href: "/netsuite-saved-searches-dashboards",
  },
  {
    icon: FileText,
    title: "Advanced PDF Templates",
    description:
      "Custom client invoice templates for T&M, fixed fee, and milestone billing; project status reports; and timesheet summaries with conditional formatting by billing type.",
    href: "/netsuite-advanced-pdf-templates",
  },
  {
    icon: Users,
    title: "Administrator Support",
    description:
      "Ongoing NetSuite administration for professional services accounts: role and permission management, configuration changes, period close support, and platform troubleshooting.",
    href: "/netsuite-administrator-support",
  },
];

const CUSTOMIZATIONS = [
  {
    title: "Timesheet approval workflows",
    description:
      "SuiteFlow workflows that route timesheet records through project manager approval, with rejection handling, resubmission logic, and weekly deadline reminders for outstanding entries.",
  },
  {
    title: "Project profitability dashboards",
    description:
      "Role-specific dashboards with margin by project, utilization rate by resource, WIP value, and unbilled time aging portlets for project managers and the finance team.",
  },
  {
    title: "Milestone billing automation",
    description:
      "Scripts that monitor project milestone completion status and automatically create billing transactions when milestones are marked complete, with invoice routing to the client billing queue.",
  },
  {
    title: "Resource utilization saved searches",
    description:
      "Saved searches using time record data to calculate billable utilization by team member and period, with target vs. actual comparison and drill-down to individual time entries.",
  },
  {
    title: "Client invoice templates by billing type",
    description:
      "Advanced PDF templates that detect the billing arrangement on the project and render the correct invoice format, showing time detail for T&M, summary for fixed fee, and milestone progress for milestone billing.",
  },
  {
    title: "Unbilled time and aging reports",
    description:
      "Saved searches and portlets showing approved but uninvoiced time by project and client, with aging buckets and total WIP value for the finance team to manage billing cycles.",
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
      "Ongoing knowledge of your professional services account retained across every engagement. Each request builds on prior work without re-discovery.",
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
    question: "Is NetSuite suitable for professional services firms?",
    answer:
      "Yes. NetSuite's project management and professional services automation capabilities make it a strong ERP for consulting, engineering, and other project-based firms. The platform handles project accounting, time tracking, expense management, and billing. Customization is typically required for timesheet approval workflows, project profitability reporting, milestone billing automation, and client-specific invoice formats.",
  },
  {
    question: "What is NetSuite used for in professional services?",
    answer:
      "Professional services firms use NetSuite for project accounting, time and expense tracking, client billing, revenue recognition, resource management, and financial reporting. NetSuite's project records support budget tracking, billing by time and materials or milestone, and revenue recognition scheduling. Custom workflows, scripts, and saved searches extend this for firm-specific billing logic, profitability reporting, and approval chains.",
  },
  {
    question: "How can NetSuite support professional services companies?",
    answer:
      "NetSuite supports professional services firms through project records, time entry, expense reports, client invoicing, and financial reporting. Post-go-live customization extends this with timesheet approval workflows, project profitability dashboards, milestone billing scripts, resource utilization reporting, and client-specific invoice templates that the standard feature set does not produce.",
  },
  {
    question: "Can NetSuite automate professional services billing?",
    answer:
      "Yes. Common automations include milestone billing scripts that trigger invoice creation when project milestones are marked complete, timesheet-to-invoice workflows that route approved time to the billing queue, recurring retainer invoice creation, and approval chains for client invoice authorization before sending. More complex billing logic, such as project-specific rate overrides or multi-entity billing, requires SuiteScript builds.",
  },
  {
    question: "How can NetSuite improve project reporting?",
    answer:
      "Custom saved searches and SuiteQL produce project margin by client and engagement, resource utilization by team member and period, unbilled time aging by project, WIP value for the finance team, and budget vs. actual cost reporting. These are built as saved searches or portlets on project manager and finance dashboards, replacing spreadsheet-based project reporting.",
  },
  {
    question: "What are common NetSuite customizations for professional services?",
    answer:
      "Common builds include timesheet approval workflows with manager routing and rejection handling, project profitability dashboards with margin and utilization portlets, milestone billing automation scripts, resource utilization saved searches, client invoice templates that adapt to billing type, and unbilled time aging reports for finance team review.",
  },
  {
    question: "How can professional services firms customize NetSuite?",
    answer:
      "SuiteScript handles billing logic, revenue recognition automation, timesheet processing, milestone tracking, and resource utilization calculations that configuration alone cannot manage. SuiteFlow builds the approval chains for timesheets, expenses, and invoices. Advanced PDF templates handle the client-specific invoice formats. Together these allow NetSuite to match most professional services firm workflows.",
  },
  {
    question: "What does a NetSuite professional services consultant do?",
    answer:
      "A NetSuite professional services consultant reviews the existing project accounting and billing setup, identifies gaps between standard NetSuite behavior and the firm's billing and reporting requirements, and builds the SuiteScript customizations, SuiteFlow workflows, saved searches, and PDF templates needed to close those gaps. Ongoing engagements cover new billing arrangements, reporting changes, and release testing.",
  },
  {
    question: "Who provides NetSuite support for professional services firms?",
    answer:
      "SuitePacific provides NetSuite post-go-live support for professional services firms, including SuiteScript customization for billing and project logic, timesheet and billing approval workflows, project profitability dashboards, client invoice templates, and ongoing technical support on a month-to-month basis.",
  },
  {
    question: "Who can support a NetSuite professional services account after go-live?",
    answer:
      "After an implementation partner's engagement ends, ongoing support is typically handled by a post-go-live NetSuite consulting firm. SuitePacific specializes in exactly this: taking over professional services NetSuite accounts after implementation, reviewing existing customizations, and providing ongoing development, fixes, and optimization.",
  },
  {
    question: "Who provides NetSuite development for professional services companies?",
    answer:
      "SuitePacific provides NetSuite SuiteScript development for professional services firms, including project billing scripts, timesheet processing, milestone automation, revenue recognition logic, resource utilization saved searches, and client invoice templates. Development is tested in Sandbox before production deployment.",
  },
  {
    question: "How does SuitePacific support professional services firms using NetSuite?",
    answer:
      "SuitePacific provides dedicated NetSuite technical support for professional services firms on a month-to-month basis. This includes SuiteScript development for project billing and revenue recognition logic, SuiteFlow timesheet and invoice approval workflows, project profitability dashboards, custom client invoice templates, and administrator support. We work directly with your team without an account manager layer.",
  },
];

const COMPARISON = [
  {
    capability: "Timesheet approval",
    standard: "Standard single-level approval routing",
    withSP: "Routed workflows with rejection handling and weekly reminders",
  },
  {
    capability: "Project billing",
    standard: "Manual invoice creation from time records",
    withSP: "Billing-type-adaptive scripts for T&M, fixed fee, and milestone",
  },
  {
    capability: "Revenue recognition",
    standard: "Standard ARM schedule per invoice",
    withSP: "Percentage-of-completion scripts from project cost data",
  },
  {
    capability: "Project profitability",
    standard: "Standard project and time reports",
    withSP: "Margin, utilization, WIP, and unbilled aging dashboards",
  },
  {
    capability: "Client invoices",
    standard: "Standard NetSuite PDF invoice template",
    withSP: "Billing-type-adaptive templates with time detail or milestone summary",
  },
  {
    capability: "Resource management",
    standard: "Manual project assignment tracking",
    withSP: "Resource utilization saved searches by role, project, and period",
  },
];

export const metadata: Metadata = {
  title: "NetSuite Support for Professional Services Firms",
  description:
    "NetSuite post-go-live support and development for professional services firms. Project accounting, timesheet automation, billing workflows, and project profitability reporting.",
  alternates: { canonical: "/industries/professional-services" },
  openGraph: {
    title: "NetSuite Support for Professional Services Firms",
    description:
      "NetSuite post-go-live support and development for professional services firms. Project accounting, billing automation, and profitability reporting.",
    url: "https://suitepacific.com/industries/professional-services",
    type: "website",
    images: [{ url: "https://suitepacific.com/og-default.png", width: 1200, height: 630 }],
  },
};

export default function ProfessionalServicesPage() {
  return (
    <main className="pt-32 pb-24 sm:pt-40 sm:pb-32">
      <BreadcrumbJsonLd
        items={[
          { name: "Home", url: SITE_URL },
          { name: "Industries", url: `${SITE_URL}/industries` },
          { name: "Professional Services", url: `${SITE_URL}/industries/professional-services` },
        ]}
      />
      <FaqJsonLd items={FAQ} />
      <ServiceJsonLd
        name="NetSuite Support for Professional Services Firms"
        description="NetSuite post-go-live support and development for professional services firms, including project accounting, billing automation, and profitability reporting."
        url={`${SITE_URL}/industries/professional-services`}
        serviceType="NetSuite Professional Services Support"
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
          eyebrow="Professional Services"
          title="NetSuite Support & Development for Professional Services Firms"
          subtitle="Technical support, SuiteScript customization, and billing workflow automation for professional services firms already live on NetSuite."
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
          Professional services firms on NetSuite consistently encounter the same gaps: timesheet approval routing
          that matches their org structure, billing logic for T&amp;M and fixed-fee engagements, and revenue
          recognition automation all require SuiteScript customization to work reliably at scale. SuitePacific
          builds and maintains these customizations for consulting, engineering, and other project-based firms
          already live on NetSuite, covering timesheet approval workflows, project billing automation, revenue
          recognition scripts, resource utilization reporting, and client invoice templates.
          Professional services accounts in NetSuite typically require significant customization to match the firm&apos;s
          billing arrangements, approval chains, and project profitability reporting requirements. Common areas
          include milestone billing automation scripts, timesheet-to-invoice workflows, SuiteQL-based utilization
          reporting, and Advanced PDF templates that adapt to T&M vs. fixed fee billing. SuitePacific builds and
          maintains these customizations on a month-to-month basis, tested in Sandbox before production deployment.
          Our lead developer holds Oracle NetSuite&apos;s SuiteCloud Developer II certification. Work is done
          directly, with no offshore handoffs or account manager layer.
        </p>

        {/* Comparison */}
        <div className="mt-14" data-section="comparison">
          <h2 className="text-lg font-semibold text-brand-900 mb-2">
            How does SuitePacific extend NetSuite for professional services firms?
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
            What NetSuite challenges do professional services firms face?
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
          <h2 className="text-lg font-semibold text-brand-900 mb-6">
            What NetSuite services does SuitePacific provide for professional services firms?
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
        <div className="mt-14" data-section="customizations">
          <h2 className="text-lg font-semibold text-brand-900 mb-2">
            What are common NetSuite customizations for professional services?
          </h2>
          <p className="text-sm text-brand-400 mb-6">
            These are the kinds of builds we do for professional services firms on a recurring basis.
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
            Why do professional services firms choose SuitePacific?
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

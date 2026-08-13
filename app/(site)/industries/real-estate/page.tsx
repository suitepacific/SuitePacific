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
  Layers,
  Building2,
  ShieldAlert,
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
    icon: BarChart2,
    title: "Property-level reporting",
    description:
      "P&L by property requires classification-based reporting and custom saved searches that standard NetSuite financial reports do not produce without configuration and scripting.",
  },
  {
    icon: Building2,
    title: "Development project accounting",
    description:
      "Cost tracking, draw schedules, capitalization milestones, and loan costing for development projects require custom fields and scripts beyond standard project accounting.",
  },
  {
    icon: Workflow,
    title: "Approval workflows for capital expenditures",
    description:
      "Capital expenditure approvals, vendor payment authorizations, and lease approval chains that route through property managers, asset managers, and finance require multi-step workflows.",
  },
  {
    icon: Users,
    title: "Vendor and contractor tracking",
    description:
      "Managing certificates of insurance, contract status, payment history, and compliance documentation across many vendors per property requires custom fields and reminder workflows.",
  },
  {
    icon: FileText,
    title: "Lease and occupancy tracking",
    description:
      "Lease commencement dates, renewal options, escalation schedules, and occupancy data stored in custom fields need reminder workflows to avoid missed deadlines.",
  },
  {
    icon: Layers,
    title: "Multi-entity financial consolidation",
    description:
      "Real estate companies with separate entities per property require intercompany transaction handling, elimination scripts, and consolidated financial reporting.",
  },
];

const SERVICES = [
  {
    icon: Headphones,
    title: "Post-Go-Live Support",
    description:
      "Ongoing technical support for your live real estate NetSuite account: new development, fixes, release testing, and account upkeep on a month-to-month basis.",
    href: "/netsuite-post-go-live-support",
  },
  {
    icon: Code2,
    title: "SuiteScript Development",
    description:
      "Custom scripts for property expense allocation, lease tracking logic, intercompany elimination, development cost capitalization, and real-estate-specific business rules.",
    href: "/netsuite-suitescript-development",
  },
  {
    icon: Workflow,
    title: "Workflow Automation",
    description:
      "SuiteFlow workflows for capital expenditure approvals, vendor payment authorization, lease renewal reminders, and certificate of insurance expiry alerts.",
    href: "/netsuite-workflow-automation",
  },
  {
    icon: BarChart2,
    title: "Saved Searches & Dashboards",
    description:
      "Property-level P&L reporting, vendor compliance dashboards, lease expiry tracking, and cash flow by property built with saved searches, SuiteQL, and KPI portlets.",
    href: "/netsuite-saved-searches-dashboards",
  },
  {
    icon: FileText,
    title: "Advanced PDF Templates",
    description:
      "Custom financial statements, vendor payment forms, lease summary documents, and capital expenditure reports with property-level formatting and conditional field logic.",
    href: "/netsuite-advanced-pdf-templates",
  },
  {
    icon: ShieldAlert,
    title: "Administrator Support",
    description:
      "Ongoing NetSuite administration for real estate accounts: role and permission management, configuration changes, period close support, and platform troubleshooting.",
    href: "/netsuite-administrator-support",
  },
];

const CUSTOMIZATIONS = [
  {
    title: "Property-level P&L saved searches",
    description:
      "Saved searches using classification and department filters to produce income and expense reports by property, with drill-down to individual transactions and vendor-level detail.",
  },
  {
    title: "Lease expiration reminder workflows",
    description:
      "SuiteFlow workflows triggered by custom lease expiry date fields on customer or location records, sending reminders to asset managers at 180, 90, and 30 days before expiry.",
  },
  {
    title: "Capital expenditure approval chains",
    description:
      "Multi-level SuiteFlow workflows that route vendor bills and purchase orders for capital expenditures through property manager, asset manager, and CFO approval based on amount.",
  },
  {
    title: "Vendor certificate of insurance tracking",
    description:
      "Custom fields on vendor records for insurance expiry dates, policy numbers, and coverage amounts, with automated reminder workflows and a compliance dashboard view.",
  },
  {
    title: "Intercompany elimination scripts",
    description:
      "Scheduled scripts that identify intercompany receivable and payable balances across subsidiary entities and create elimination journal entries for consolidated reporting.",
  },
  {
    title: "Development project draw schedules",
    description:
      "Custom fields and saved searches that track loan draw schedules, costs incurred to date, and capitalization milestones for development projects, linked to the project record.",
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
      "Ongoing knowledge of your real estate account retained across every engagement. Each request builds on prior work without re-discovery.",
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
    question: "Is NetSuite suitable for real estate companies?",
    answer:
      "Yes, for real estate companies that need integrated accounting, project tracking, and vendor management without a specialized property management system. NetSuite handles multi-entity structures, project accounting, and accounts payable workflows that real estate companies use. Customization is typically required for property-level reporting, lease tracking, development cost capitalization, and multi-entity consolidation.",
  },
  {
    question: "What is NetSuite used for in real estate?",
    answer:
      "Real estate companies use NetSuite for property-level accounting, vendor and contractor management, accounts payable, project accounting for development, lease tracking, and consolidated financial reporting across multiple entities. The platform handles multi-subsidiary structures and classification-based reporting. Custom saved searches, workflows, and scripts extend these capabilities for property-specific requirements.",
  },
  {
    question: "How can NetSuite support real estate companies?",
    answer:
      "NetSuite supports real estate companies through multi-entity accounting, project records, vendor management, and AP workflows. Post-go-live support extends this with custom SuiteScript logic for property-level reporting, lease expiry tracking, capital expenditure approvals, and intercompany elimination that the standard feature set does not produce. Ongoing support covers new development and fixes as requirements evolve.",
  },
  {
    question: "Can NetSuite be customized for property management?",
    answer:
      "Yes. Custom fields on customer and location records track lease terms, renewal dates, and occupancy data. SuiteFlow workflows handle lease expiry reminders and approval chains for property expenses. Saved searches produce property-level P&L reporting and vendor compliance dashboards. More complex builds, such as intercompany elimination scripts and draw schedule tracking, require SuiteScript development.",
  },
  {
    question: "Can NetSuite automate real estate workflows?",
    answer:
      "Yes. Common automations include capital expenditure approval routing through property manager, asset manager, and CFO tiers; lease renewal reminder workflows triggered by custom expiry date fields; certificate of insurance expiry alerts for vendors; and automated vendor payment authorization based on amount thresholds. More complex automations require SuiteScript builds.",
  },
  {
    question: "How can NetSuite improve real estate reporting?",
    answer:
      "Custom saved searches and SuiteQL produce property-level P&L reports using classification and department filters, vendor compliance dashboards, lease expiry tracking views, development project cost summaries, and cash flow by property. These are built as saved searches or portlets on finance and asset manager dashboards, replacing spreadsheet-based reporting.",
  },
  {
    question: "What are common NetSuite customizations for real estate?",
    answer:
      "Common builds include property-level P&L saved searches with classification filters, lease expiry reminder workflows, capital expenditure approval chains with multi-level routing, certificate of insurance tracking with expiry alerts, intercompany elimination scripts for consolidated reporting, and development project draw schedule tracking on project records.",
  },
  {
    question: "What does a NetSuite real estate consultant do?",
    answer:
      "A NetSuite real estate consultant reviews the existing account setup, identifies gaps between standard NetSuite behavior and property-level reporting and workflow requirements, and builds the SuiteScript customizations, SuiteFlow workflows, and saved searches needed to close those gaps. Ongoing engagements cover new development as the portfolio and business requirements evolve.",
  },
  {
    question: "Who provides NetSuite support for real estate companies?",
    answer:
      "SuitePacific provides NetSuite post-go-live support for real estate companies, including SuiteScript customization for property-level logic and intercompany processing, SuiteFlow workflow builds for approval chains and lease reminders, property reporting and dashboards, and ongoing technical support on a month-to-month basis.",
  },
  {
    question: "Who can support a NetSuite real estate account after go-live?",
    answer:
      "After an implementation partner's engagement ends, ongoing support is typically handled by a post-go-live NetSuite consulting firm. SuitePacific specializes in exactly this: taking over real estate NetSuite accounts after implementation, reviewing existing customizations, and providing ongoing development, fixes, and optimization.",
  },
  {
    question: "Who provides NetSuite development for real estate businesses?",
    answer:
      "SuitePacific provides NetSuite SuiteScript development for real estate companies, including property expense allocation scripts, intercompany elimination logic, lease tracking custom fields and workflows, capital expenditure approval chains, and property-specific saved searches. Development is tested in Sandbox before production deployment.",
  },
  {
    question: "How does SuitePacific support real estate companies using NetSuite?",
    answer:
      "SuitePacific provides dedicated NetSuite technical support for real estate companies on a month-to-month basis. This includes SuiteScript development for property-level logic and multi-entity processing, SuiteFlow approval and reminder workflow builds, property reporting dashboards, custom PDF templates, and administrator support. We work directly with your team without an account manager layer.",
  },
];

const COMPARISON = [
  {
    capability: "Property reporting",
    standard: "Standard financial statements by entity",
    withSP: "Classification-based P&L saved searches by property",
  },
  {
    capability: "Lease tracking",
    standard: "Standard customer record fields",
    withSP: "Custom expiry date fields with automated reminder workflows",
  },
  {
    capability: "CapEx approvals",
    standard: "Standard AP approval routing",
    withSP: "Multi-level routing by amount, property manager, and CFO",
  },
  {
    capability: "Vendor compliance",
    standard: "Standard vendor records",
    withSP: "Insurance expiry tracking, compliance dashboards, and alert workflows",
  },
  {
    capability: "Multi-entity consolidation",
    standard: "Manual intercompany journal entries",
    withSP: "Automated elimination scripts for consolidated reporting",
  },
  {
    capability: "Development accounting",
    standard: "Standard project cost tracking",
    withSP: "Draw schedule automation and development budget dashboards",
  },
];

export const metadata: Metadata = {
  title: "NetSuite Support for Real Estate Companies",
  description:
    "NetSuite post-go-live support and development for real estate companies. Property-level reporting, lease tracking, capital expenditure approvals, and multi-entity consolidation.",
  alternates: { canonical: "/industries/real-estate" },
  openGraph: {
    title: "NetSuite Support for Real Estate Companies",
    description:
      "NetSuite post-go-live support and development for real estate companies. Property reporting, lease tracking, and capital expenditure automation.",
    url: "https://suitepacific.com/industries/real-estate",
    type: "website",
    images: [{ url: "https://suitepacific.com/og-default.png", width: 1200, height: 630 }],
  },
};

export default function RealEstatePage() {
  return (
    <main className="pt-32 pb-24 sm:pt-40 sm:pb-32">
      <BreadcrumbJsonLd
        items={[
          { name: "Home", url: SITE_URL },
          { name: "Industries", url: `${SITE_URL}/industries` },
          { name: "Real Estate", url: `${SITE_URL}/industries/real-estate` },
        ]}
      />
      <FaqJsonLd items={FAQ} />
      <ServiceJsonLd
        name="NetSuite Support for Real Estate Companies"
        description="NetSuite post-go-live support and development for real estate companies, including property-level reporting, lease tracking, and multi-entity consolidation."
        url={`${SITE_URL}/industries/real-estate`}
        serviceType="NetSuite Real Estate Support"
      />
      <OrganizationJsonLd />
      <VideoObjectJsonLd
        name="SuitePacific Introduction: NetSuite Post-Go-Live Support and Consulting"
        description="An introduction to SuitePacific, a boutique NetSuite post-go-live support team providing SuiteScript development, workflow automation, and ongoing account optimization for businesses already live on NetSuite."
        videoId="IQvWN_yZ24A"
        duration="PT18S"
        uploadDate="2026-08-12"
        isShort
      />

      <div className="mx-auto max-w-3xl px-6 lg:px-8">
        <SectionHeading
          as="h1"
          eyebrow="Real Estate"
          title="NetSuite Support & Development for Real Estate Companies"
          subtitle="Technical support, SuiteScript customization, and workflow automation for real estate companies already live on NetSuite."
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
          Real estate companies using NetSuite across multiple properties or entities consistently need capabilities
          beyond standard setup: property-level P&amp;L reporting, CapEx approval chains, and lease expiration
          tracking all require custom scripts or workflows to function reliably. SuitePacific builds and maintains
          these capabilities for real estate firms already live on NetSuite, covering property-level reporting, lease
          and occupancy tracking, capital expenditure approval workflows, vendor compliance management, and
          intercompany elimination for multi-entity structures.
          Real estate accounts in NetSuite typically require significant customization to produce the property-level
          financial views, approval chains, and compliance tracking that asset managers and finance teams need.
          Common areas include classification-based P&L saved searches, lease expiry reminder workflows, multi-level
          approval chains for capital expenditure, and intercompany elimination scripts for consolidated reporting.
          SuitePacific builds and maintains these customizations on a month-to-month basis, tested in Sandbox before
          production deployment. Our lead developer holds Oracle NetSuite&apos;s SuiteCloud Developer II
          certification. Work is done directly, with no offshore handoffs or account manager layer.
        </p>

        {/* Comparison */}
        <div className="mt-14" data-section="comparison">
          <h2 className="text-lg font-semibold text-brand-900 mb-2">
            How does SuitePacific extend NetSuite for real estate companies?
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
            What NetSuite challenges do real estate companies face?
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
          <h2 className="text-lg font-semibold text-brand-900 mb-6">What NetSuite services does SuitePacific provide for real estate companies?</h2>
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
            What are common NetSuite customizations for real estate?
          </h2>
          <p className="text-sm text-brand-400 mb-6">
            These are the kinds of builds we do for real estate companies on a recurring basis.
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
            Why do real estate companies choose SuitePacific?
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

import type { Metadata } from "next";
import Link from "next/link";
import {
  Code2, Workflow, BarChart2, FileText, Gauge, Headphones,
  ShieldCheck, MonitorSmartphone, Globe,
} from "lucide-react";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Card } from "@/components/ui/Card";
import { IconBadge } from "@/components/ui/IconBadge";
import { BreadcrumbJsonLd, FaqJsonLd, ServiceJsonLd, OrganizationJsonLd, VideoObjectJsonLd } from "@/components/seo/JsonLd";
import { ServiceFaqSection } from "@/components/ui/ServiceFaqSection";
import { LeadFormLight } from "@/components/sections/LeadFormLight";
import { SITE_URL } from "@/lib/content";

const INDUSTRIES = [
  {
    title: "Financial services and fintech",
    description:
      "Multi-entity structures, complex revenue recognition, intercompany eliminations, regulatory reporting requirements, and integrations with financial data platforms for New York-based financial services firms on NetSuite.",
  },
  {
    title: "Professional services and consulting firms",
    description:
      "Project accounting, timesheet and billing workflows, milestone invoicing, utilization reporting, and client-facing invoice templates for NYC consulting, law, and advisory firms.",
  },
  {
    title: "Real estate companies",
    description:
      "Property-level P&L reporting, lease expiry tracking, capital expenditure approval chains, vendor compliance, and multi-entity consolidation for real estate investment and management companies.",
  },
  {
    title: "Media and publishing companies",
    description:
      "Subscription revenue management, advertising revenue tracking, project-based accounting for content production, and multi-entity reporting for NYC-based media businesses.",
  },
];

const SERVICES = [
  {
    icon: Code2,
    title: "SuiteScript Development",
    description:
      "Custom User Event, Scheduled, Map/Reduce, and RESTlet scripts for business logic, automation, and integrations.",
    href: "/netsuite-suitescript-development",
  },
  {
    icon: Workflow,
    title: "Workflow Automation",
    description:
      "SuiteFlow approval chains, notifications, and status automations for your operational processes.",
    href: "/netsuite-workflow-automation",
  },
  {
    icon: BarChart2,
    title: "Saved Searches and Dashboards",
    description:
      "Custom saved searches, KPI portlets, and role-based dashboards for finance, operations, and executive teams.",
    href: "/netsuite-saved-searches-dashboards",
  },
  {
    icon: FileText,
    title: "Advanced PDF Templates",
    description:
      "Custom invoices, purchase orders, and business documents built with FreeMarker for your document standards.",
    href: "/netsuite-advanced-pdf-templates",
  },
  {
    icon: Gauge,
    title: "Account Optimization",
    description:
      "Performance tuning, script audits, governance limit fixes, and legacy customization cleanup.",
    href: "/netsuite-account-optimization",
  },
  {
    icon: Headphones,
    title: "Post-Go-Live Support",
    description:
      "Ongoing technical support on a month-to-month retainer for companies already live on NetSuite.",
    href: "/netsuite-post-go-live-support",
  },
];

const WHY_REMOTE = [
  {
    icon: MonitorSmartphone,
    title: "NetSuite work does not require on-site presence",
    description:
      "SuiteScript development, workflow configuration, and saved search builds happen inside your NetSuite account. Remote delivery is the norm across the NetSuite consulting market.",
  },
  {
    icon: Globe,
    title: "Direct access is faster than local proximity",
    description:
      "A US-based developer available directly over Slack or email turns requests around in days. A local firm with account management layers and weekly meeting cadences moves slower.",
  },
  {
    icon: ShieldCheck,
    title: "US-based, certified team",
    description:
      "SuitePacific is US-based with Oracle NetSuite SuiteCloud Developer II and Administrator Professional certifications. All work stays within the US with no offshore components.",
  },
];

const FAQ = [
  {
    question: "Does SuitePacific work with companies in New York City?",
    answer:
      "Yes. SuitePacific works with New York-based companies remotely: financial services firms, professional services businesses, real estate companies, and media organizations that are live on NetSuite and need ongoing technical support or development.",
  },
  {
    question: "What NetSuite issues are common for New York financial services companies?",
    answer:
      "Financial services companies on NetSuite most commonly need complex multi-entity structures with intercompany eliminations, revenue recognition logic that standard NetSuite configuration doesn't fully support, custom compliance and audit reporting, and integrations with financial data platforms or CRMs. These typically require SuiteScript and SuiteQL custom reporting.",
  },
  {
    question: "Can SuitePacific support a multi-entity NetSuite account for a holding company or family office?",
    answer:
      "Yes. Multi-entity accounts require careful handling of intercompany transactions, elimination entries, subsidiary-level reporting, and consolidated dashboards. SuitePacific builds and maintains the custom scripts and saved searches that make multi-entity reporting accurate and practical.",
  },
  {
    question: "What does a NetSuite engagement look like for a NYC professional services firm?",
    answer:
      "For a professional services firm, the most common work is project accounting customization, timesheet approval workflows, milestone billing logic, and client invoice templates. These firms often have billing arrangements that don't map cleanly to standard NetSuite configuration and need SuiteScript for the exceptions.",
  },
  {
    question: "What time zone does SuitePacific operate in?",
    answer:
      "SuitePacific is based in the US and works across time zones. For New York clients, most communication and delivery happens within Eastern and Pacific business hours with same-day or next-business-day response to non-urgent requests.",
  },
];

export const metadata: Metadata = {
  title: "NetSuite Consultant New York",
  description:
    "NetSuite consulting for New York City companies. Post-go-live support, SuiteScript development, multi-entity structures, and integrations for financial services, professional services, and media firms on NetSuite.",
  alternates: { canonical: "/netsuite-consultant-new-york" },
  openGraph: {
    title: "NetSuite Consultant New York",
    description: "NetSuite post-go-live consulting for NYC companies. SuiteScript development, multi-entity setup, and ongoing support for financial services, professional services, and real estate firms.",
    url: "https://suitepacific.com/netsuite-consultant-new-york",
    type: "website",
    images: [{ url: "https://suitepacific.com/og-default.png", width: 1200, height: 630 }],
  },
};

export default function NetSuiteConsultantNewYorkPage() {
  return (
    <main className="pt-32 pb-24 sm:pt-40 sm:pb-32">
      <BreadcrumbJsonLd
        items={[
          { name: "Home", url: SITE_URL },
          { name: "NetSuite Consultant New York", url: `${SITE_URL}/netsuite-consultant-new-york` },
        ]}
      />
      <FaqJsonLd items={FAQ} />
      <ServiceJsonLd
        name="NetSuite Consultant New York"
        description="NetSuite post-go-live consulting and development for New York City companies, including SuiteScript customization, multi-entity support, and integrations."
        url={`${SITE_URL}/netsuite-consultant-new-york`}
        serviceType="NetSuite Consulting"
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
          eyebrow="NetSuite Consulting"
          title="NetSuite Consultant for New York City Companies"
          subtitle="Post-go-live NetSuite support, SuiteScript development, and multi-entity configuration for financial services, professional services, real estate, and media companies in New York."
          align="left"
        />

        <div className="mt-6 rounded-2xl border border-brand-100 bg-white p-5 shadow-soft">
          <LeadFormLight />
        </div>
        <p className="mt-3 text-xs text-brand-400">NetSuite-certified · US-based · Direct developer access · Month-to-month</p>

        <p className="mt-6 text-sm text-brand-400">
          SuitePacific works with New York-area businesses that are already live on NetSuite and
          need ongoing technical support and development. New York clients typically operate more
          complex account structures: multi-entity setups, sophisticated revenue recognition requirements,
          and integrations with financial platforms that require certified SuiteScript development. All
          work is done remotely with direct access to the developer doing the work, and tested in
          Sandbox before production deployment.
        </p>

        {/* Industries */}
        <div className="mt-14" data-section="industries">
          <h2 className="text-lg font-semibold text-brand-900 mb-6">Industries we support in New York</h2>
          <div className="space-y-4">
            {INDUSTRIES.map((item) => (
              <div key={item.title} className="rounded-xl border border-brand-100 bg-white p-5">
                <h3 className="font-semibold text-brand-900 text-sm">{item.title}</h3>
                <p className="mt-1.5 text-sm text-brand-400">{item.description}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Services */}
        <div className="mt-14" data-section="services">
          <h2 className="text-lg font-semibold text-brand-900 mb-6">NetSuite services for New York companies</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            {SERVICES.map((service) => (
              <Link key={service.href} href={service.href} className="group">
                <Card className="p-5 flex items-start gap-4 h-full group-hover:border-brand-200 transition-colors">
                  <IconBadge icon={service.icon} />
                  <div>
                    <h3 className="font-semibold text-brand-900 text-sm group-hover:text-accent transition-colors">{service.title}</h3>
                    <p className="mt-1.5 text-sm text-brand-400">{service.description}</p>
                  </div>
                </Card>
              </Link>
            ))}
          </div>
        </div>

        {/* Why remote */}
        <div className="mt-14" data-section="why-remote">
          <h2 className="text-lg font-semibold text-brand-900 mb-6">Why remote NetSuite consulting works for New York companies</h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
            {WHY_REMOTE.map((item) => (
              <Card key={item.title} className="p-5 flex flex-col gap-3">
                <IconBadge icon={item.icon} />
                <h3 className="font-semibold text-brand-900 text-sm">{item.title}</h3>
                <p className="text-sm text-brand-400">{item.description}</p>
              </Card>
            ))}
          </div>
        </div>

        <ServiceFaqSection items={FAQ} />

        <div className="mt-10 rounded-2xl border border-brand-100 bg-white p-5 shadow-soft">
          <LeadFormLight />
        </div>
      </div>
    </main>
  );
}

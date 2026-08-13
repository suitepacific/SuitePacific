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
    title: "Manufacturing companies",
    description:
      "BOM and assembly logic, work order automation, lot and bin tracking enforcement, production variance reporting, and multi-level purchase order approval chains for Chicago-area manufacturers on NetSuite.",
  },
  {
    title: "Wholesale and distribution companies",
    description:
      "Customer-specific pricing, inventory reorder automation, EDI and 3PL integrations, order exception workflows, and inventory aging reporting for Midwest distribution businesses on NetSuite.",
  },
  {
    title: "Professional services firms",
    description:
      "Project accounting, timesheet approval workflows, milestone billing, utilization reporting, and client invoice templates for Chicago-based consulting, legal, and advisory firms.",
  },
  {
    title: "Financial services companies",
    description:
      "Multi-entity structures, intercompany eliminations, complex revenue recognition, and compliance reporting for financial services companies in the Chicago area.",
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
      "Custom invoices, purchase orders, packing slips, and business documents built with FreeMarker.",
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
    title: "NetSuite development is remote by nature",
    description:
      "SuiteScript builds, workflow configuration, and saved search development all happen inside your NetSuite account. No office visit is required. Work lands in your Sandbox within days.",
  },
  {
    icon: Globe,
    title: "Direct access is faster",
    description:
      "Direct developer access over Slack or email is faster than working through an account manager at a local firm. Requests move faster without the intermediary layer.",
  },
  {
    icon: ShieldCheck,
    title: "US-based, certified team",
    description:
      "SuitePacific is US-based with Oracle NetSuite SuiteCloud Developer II and Administrator Professional certifications. All work is done in-house with no offshore components.",
  },
];

const FAQ = [
  {
    question: "Does SuitePacific work with companies in Chicago?",
    answer:
      "Yes. SuitePacific works with Chicago-area companies remotely: manufacturers, distributors, professional services firms, and financial services businesses that are already live on NetSuite and need ongoing support or development.",
  },
  {
    question: "What NetSuite challenges are common for Chicago-area manufacturers?",
    answer:
      "Manufacturing companies on NetSuite in the Chicago area most commonly need BOM and assembly customization for complex production processes, work order completion automation, lot and bin tracking enforcement, production variance reporting that doesn't exist natively in NetSuite, and multi-level PO approval workflows. These all require SuiteScript because standard configuration doesn't reach this level of logic.",
  },
  {
    question: "Can SuitePacific handle EDI integrations for a Midwest distribution company?",
    answer:
      "Yes. EDI integrations for distribution companies typically cover purchase orders, advance ship notices, invoices, and acknowledgements. SuitePacific builds file-based and API-based integrations between NetSuite and 3PL or trading partner EDI systems, including automated pickup, parsing, validation, and import into NetSuite records.",
  },
  {
    question: "What does post-go-live support look like for a Chicago manufacturing company?",
    answer:
      "For a manufacturing company, ongoing support typically covers new SuiteScript development for production logic, fixes when scripts break after NetSuite releases, release testing in Sandbox before updates go to production, and new saved searches and dashboards as reporting requirements evolve. The engagement is month-to-month with no long-term contract.",
  },
  {
    question: "How quickly does SuitePacific respond to requests from Chicago clients?",
    answer:
      "Chicago operates on Central time. SuitePacific works across US time zones and typically responds to non-urgent requests on the same business day. For urgent issues, we aim to respond within a few hours during business hours.",
  },
];

export const metadata: Metadata = {
  title: "NetSuite Consultant Chicago",
  description:
    "NetSuite consulting for Chicago companies. Post-go-live support, SuiteScript development, EDI integrations, and manufacturing automation for companies in the Chicago area already live on NetSuite.",
  alternates: { canonical: "/netsuite-consultant-chicago" },
  openGraph: {
    title: "NetSuite Consultant Chicago",
    description: "NetSuite post-go-live consulting for Chicago-area companies. SuiteScript development, manufacturing automation, EDI integrations, and ongoing support.",
    url: "https://suitepacific.com/netsuite-consultant-chicago",
    type: "website",
    images: [{ url: "https://suitepacific.com/og-default.png", width: 1200, height: 630 }],
  },
};

export default function NetSuiteConsultantChicagoPage() {
  return (
    <main className="pt-32 pb-24 sm:pt-40 sm:pb-32">
      <BreadcrumbJsonLd
        items={[
          { name: "Home", url: SITE_URL },
          { name: "NetSuite Consultant Chicago", url: `${SITE_URL}/netsuite-consultant-chicago` },
        ]}
      />
      <FaqJsonLd items={FAQ} />
      <ServiceJsonLd
        name="NetSuite Consultant Chicago"
        description="NetSuite post-go-live consulting for Chicago companies including manufacturing automation, SuiteScript development, EDI integrations, and ongoing support."
        url={`${SITE_URL}/netsuite-consultant-chicago`}
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
          title="NetSuite Consultant for Chicago Companies"
          subtitle="Post-go-live NetSuite support, SuiteScript development, manufacturing automation, and distribution integrations for companies in the Chicago area."
          align="left"
        />

        <div className="mt-6 rounded-2xl border border-brand-100 bg-white p-5 shadow-soft">
          <LeadFormLight />
        </div>
        <p className="mt-3 text-xs text-brand-400">NetSuite-certified · US-based · Direct developer access · Month-to-month</p>

        <p className="mt-6 text-sm text-brand-400">
          SuitePacific works with Chicago-area businesses that are already live on NetSuite and need
          ongoing technical support. The Midwest market includes manufacturers with complex BOM and
          work order requirements, distributors with EDI and 3PL integration needs, and professional
          services firms with project accounting customization requirements. All of this is delivered
          remotely with direct developer access, tested in Sandbox before any change reaches production.
        </p>

        {/* Industries */}
        <div className="mt-14" data-section="industries">
          <h2 className="text-lg font-semibold text-brand-900 mb-6">Industries we support in Chicago</h2>
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
          <h2 className="text-lg font-semibold text-brand-900 mb-6">NetSuite services for Chicago companies</h2>
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
          <h2 className="text-lg font-semibold text-brand-900 mb-6">Why remote NetSuite consulting works for Chicago companies</h2>
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

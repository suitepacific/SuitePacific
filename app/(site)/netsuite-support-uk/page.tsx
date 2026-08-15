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
  MonitorSmartphone,
  Clock,
} from "lucide-react";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Card } from "@/components/ui/Card";
import { IconBadge } from "@/components/ui/IconBadge";
import {
  BreadcrumbJsonLd,
  FaqJsonLd,
  ServiceJsonLd,
  OrganizationJsonLd,
  VideoObjectJsonLd,
} from "@/components/seo/JsonLd";
import { ServiceFaqSection } from "@/components/ui/ServiceFaqSection";
import { LeadFormLight } from "@/components/sections/LeadFormLight";
import { SITE_URL } from "@/lib/content";

const INDUSTRIES = [
  {
    title: "Fintech and financial services",
    description:
      "Multi-entity structures, complex revenue recognition, FCA-relevant audit trails, intercompany eliminations, and integrations with UK financial data platforms for fintech and financial services companies on NetSuite.",
  },
  {
    title: "Professional services and consulting firms",
    description:
      "Project accounting, timesheet approval workflows, milestone billing, utilisation reporting, and client invoice templates for UK-based consulting, legal, and advisory firms with GBP and multi-currency requirements.",
  },
  {
    title: "Media and publishing companies",
    description:
      "Subscription revenue management, advertising revenue tracking, project-based accounting for content production, and multi-entity reporting for UK media businesses with mixed currency and VAT obligations.",
  },
  {
    title: "Manufacturing and distribution companies",
    description:
      "BOM and assembly customisation, work order automation, lot and bin tracking enforcement, EDI and 3PL integrations, and production variance reporting for UK manufacturers on NetSuite.",
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
      "Custom invoices, purchase orders, and business documents built with FreeMarker, including UK VAT invoice formatting and GBP display.",
    href: "/netsuite-advanced-pdf-templates",
  },
  {
    icon: Gauge,
    title: "Account Optimization",
    description:
      "Performance tuning, script audits, governance limit fixes, and legacy customisation cleanup.",
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
      "SuiteScript builds, workflow configuration, and saved search development all happen inside your NetSuite account. No office visit is needed anywhere in the world. Deliverables land in your Sandbox the same week.",
  },
  {
    icon: Clock,
    title: "EST and GMT/BST overlap works",
    description:
      "UK business hours and US Eastern hours share a 3-4 hour window each afternoon. Non-urgent requests sent UK morning typically receive a response the next business day, UK morning. Urgent issues are handled as a priority.",
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
    question: "Does SuitePacific work with companies in the United Kingdom?",
    answer:
      "Yes. SuitePacific works with UK companies on a remote basis: fintech and financial services firms, professional services organisations, media companies, and manufacturers that are already live on NetSuite and need ongoing technical support or development. Communication is via Slack or email and non-urgent requests typically receive a response next business day, UK morning.",
  },
  {
    question: "What NetSuite challenges are common for UK businesses?",
    answer:
      "UK businesses on NetSuite most commonly need VAT configuration and invoice formatting that meets HMRC requirements, Making Tax Digital (MTD) setup or support, GBP as the base currency with multi-currency for international trading, UK-specific PDF invoice templates that show VAT registration numbers and required VAT breakdowns, and custom saved searches for VAT reporting. Professional services firms also frequently need project accounting customisation and milestone billing logic.",
  },
  {
    question: "Can SuitePacific help with VAT and Making Tax Digital in NetSuite?",
    answer:
      "Yes. NetSuite supports VAT through SuiteTax, and Making Tax Digital for VAT is handled via HMRC-compliant bundles. SuitePacific supports post-go-live VAT configuration issues including tax code errors, VAT return discrepancies, SuiteTax rule setup, and UK invoice template formatting. We do not provide tax advice, but we can fix and maintain the technical NetSuite configuration that feeds your VAT reporting.",
  },
  {
    question: "How does the time zone difference work for UK clients?",
    answer:
      "UK is GMT in winter and BST in summer. US Eastern (EST/EDT) is 5 hours behind GMT and 4-5 hours behind BST. This typically creates a 3-4 hour overlap in the afternoon UK time. Non-urgent requests submitted UK morning are usually addressed during US business hours and available for review the following UK morning. For urgent issues, SuitePacific responds as a priority regardless of time zone.",
  },
  {
    question: "Are engagements priced in GBP for UK clients?",
    answer:
      "SuitePacific engagements are billed in USD by default. GBP invoicing is available on request. Monthly retainer pricing is the same for UK clients as for US clients, with no location premium. Contact us and we can confirm the current rate and billing format for your organisation.",
  },
  {
    question: "What does a NetSuite post-go-live engagement look like for a UK professional services firm?",
    answer:
      "For a professional services firm, the most common starting points are project accounting configuration that the implementation partner left incomplete, timesheet approval workflows, milestone billing logic for client invoices, and PDF template formatting for UK VAT invoices. After an initial onboarding period reviewing what exists, the engagement is ongoing: new development as requirements change, fixes when something breaks after a NetSuite release, and release testing in Sandbox before production updates.",
  },
  {
    question: "Can SuitePacific support a UK fintech company on NetSuite?",
    answer:
      "Yes. Fintech and financial services companies on NetSuite often need multi-entity structures with intercompany eliminations, complex revenue recognition that standard configuration cannot reach, and integrations with financial data platforms or CRM systems. SuitePacific builds and maintains the SuiteScript and SuiteFlow customisations needed for these accounts, including ongoing support as reporting and compliance requirements evolve.",
  },
];

export const metadata: Metadata = {
  title: "NetSuite Support UK",
  description:
    "NetSuite post-go-live support and development for UK companies. SuiteScript customisation, VAT and MTD configuration, workflow automation, and ongoing technical support for businesses already live on NetSuite.",
  alternates: { canonical: "/netsuite-support-uk" },
  openGraph: {
    title: "NetSuite Support UK",
    description:
      "NetSuite post-go-live consulting for UK companies. SuiteScript development, VAT configuration, and ongoing support for fintech, professional services, and manufacturing businesses on NetSuite.",
    url: "https://suitepacific.com/netsuite-support-uk",
    type: "website",
    images: [{ url: "https://suitepacific.com/og-default.png", width: 1200, height: 630 }],
  },
};

export default function NetSuiteSupportUKPage() {
  return (
    <main className="pt-32 pb-24 sm:pt-40 sm:pb-32">
      <BreadcrumbJsonLd
        items={[
          { name: "Home", url: SITE_URL },
          { name: "NetSuite Support UK", url: `${SITE_URL}/netsuite-support-uk` },
        ]}
      />
      <FaqJsonLd items={FAQ} />
      <ServiceJsonLd
        name="NetSuite Support UK"
        description="NetSuite post-go-live support and development for UK companies, including SuiteScript customisation, VAT and MTD configuration, workflow automation, and ongoing technical support."
        url={`${SITE_URL}/netsuite-support-uk`}
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
          title="NetSuite Support for UK Companies"
          subtitle="Post-go-live NetSuite support, SuiteScript development, VAT configuration, and ongoing technical support for UK businesses already live on NetSuite."
          align="left"
        />

        <div className="mt-6 rounded-2xl border border-brand-100 bg-white p-5 shadow-soft">
          <LeadFormLight />
        </div>
        <p className="mt-3 text-xs text-brand-400">
          NetSuite-certified · US-based · Direct developer access · Month-to-month
        </p>

        <p className="mt-6 text-sm text-brand-400">
          SuitePacific works with UK companies that are already live on NetSuite and need
          ongoing technical support after their implementation partner has disengaged. UK
          accounts commonly require SuiteScript customisation for business logic the standard
          platform cannot reach, VAT and Making Tax Digital configuration support, UK-compliant
          PDF invoice templates, and saved searches and dashboards for finance and operations
          teams. All work is done remotely, tested in Sandbox before any change reaches
          production, and delivered with direct developer access via Slack or email.
        </p>

        <div className="mt-8 rounded-xl bg-brand-50/60 border border-brand-100 px-5 py-4">
          <p className="text-xs font-semibold text-accent uppercase tracking-wide mb-2">Quick answer</p>
          <p className="text-sm text-brand-700 leading-relaxed">
            SuitePacific is a US-based NetSuite consulting firm providing post-go-live support
            and development for UK companies. We work exclusively with organisations already live
            on NetSuite that need ongoing technical support after their implementation partner has
            disengaged. Services include SuiteScript 2.x development (User Event, Scheduled,
            Map/Reduce, and RESTlet scripts), SuiteFlow workflow automation, VAT and Making Tax
            Digital configuration support, saved search and KPI dashboard builds, and advanced
            PDF templates including UK VAT invoice formatting. UK clients span fintech and
            financial services firms, professional services organisations, media and publishing
            companies, and manufacturers. Non-urgent requests typically receive a response next
            business day, UK morning. Work is delivered by a developer holding Oracle NetSuite
            SuiteCloud Developer II and Administrator Professional certifications. Engagements
            are month-to-month with no long-term contract. GBP invoicing available on request.
          </p>
        </div>

        {/* Industries */}
        <div className="mt-14" data-section="industries">
          <h2 className="text-lg font-semibold text-brand-900 mb-6">
            Which Industries Does SuitePacific Support for UK Companies?
          </h2>
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
          <h2 className="text-lg font-semibold text-brand-900 mb-6">
            What NetSuite Services Are Available for UK Companies?
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

        {/* Why remote */}
        <div className="mt-14" data-section="why-remote">
          <h2 className="text-lg font-semibold text-brand-900 mb-6">
            Why Does Remote NetSuite Consulting Work for UK Companies?
          </h2>
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

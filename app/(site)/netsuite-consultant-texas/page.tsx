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
      "BOM and assembly customization, work order automation, lot and serial number tracking, production variance reporting, and multi-level purchase approval workflows for Texas manufacturers on NetSuite. Common in Dallas-Fort Worth, Houston, and San Antonio industrial corridors.",
  },
  {
    title: "Energy services companies",
    description:
      "Field service billing automation, equipment tracking, job cost reporting, intercompany transactions for multi-entity oilfield services businesses, and integration with ERP data feeds for Houston-area energy companies on NetSuite.",
  },
  {
    title: "Technology and SaaS companies",
    description:
      "SuiteBilling configuration, ARM revenue recognition, Salesforce integration maintenance, subscription metrics reporting, and usage-based billing automation for Texas technology companies on NetSuite.",
  },
  {
    title: "Wholesale and distribution companies",
    description:
      "Inventory reorder automation, customer-specific pricing rules, EDI and 3PL integrations, fulfillment exception workflows, and multi-warehouse inventory reporting for distribution businesses in Dallas, Houston, and Austin.",
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
    question: "Does SuitePacific work with companies in Texas?",
    answer:
      "Yes. SuitePacific works with Texas companies remotely: manufacturers, energy services businesses, technology companies, and distributors in Dallas, Houston, Austin, and San Antonio that are already live on NetSuite and need ongoing development and support.",
  },
  {
    question: "What NetSuite work is most common for Texas manufacturing companies?",
    answer:
      "Texas manufacturers most commonly need BOM and assembly customization for complex production workflows, work order completion and variance reporting, lot and serial number tracking enforcement, multi-level purchase order approval chains, and integration with MES or inventory systems. These require SuiteScript because standard configuration does not reach this level of business logic.",
  },
  {
    question: "Can SuitePacific support a Houston energy services company on NetSuite?",
    answer:
      "Yes. For energy services companies, common NetSuite work includes field service billing automation, equipment and asset tracking, job cost reporting, intercompany eliminations for multi-entity structures, and integration with oilfield data or dispatch systems. SuitePacific handles ongoing development and support for live NetSuite accounts in the energy sector.",
  },
  {
    question: "How does SuitePacific handle SuiteBilling for Texas SaaS companies?",
    answer:
      "SuiteModule configuration for SuiteBilling, ARM revenue recognition, and subscription metrics reporting are common requests from Texas SaaS companies on NetSuite. SuitePacific debugs billing pipeline issues (Subscription, Rating, Charges, Bill Run), configures usage-based line items, and builds custom reporting on subscription and revenue data.",
  },
  {
    question: "How quickly does SuitePacific respond to requests from Texas clients?",
    answer:
      "Texas operates on Central time. SuitePacific works across US time zones and typically responds to non-urgent requests on the same business day. For urgent issues, we aim to respond within a few hours during business hours.",
  },
];

export const metadata: Metadata = {
  title: "NetSuite Consultant Texas",
  description:
    "NetSuite consulting for Texas companies in Dallas, Houston, and Austin. Post-go-live support, SuiteScript development, manufacturing automation, and energy services integrations for companies already live on NetSuite.",
  alternates: { canonical: "/netsuite-consultant-texas" },
  openGraph: {
    title: "NetSuite Consultant Texas",
    description: "NetSuite post-go-live consulting for Texas companies. SuiteScript development, manufacturing automation, energy services, and ongoing support in Dallas, Houston, and Austin.",
    url: "https://suitepacific.com/netsuite-consultant-texas",
    type: "website",
    images: [{ url: "https://suitepacific.com/og-default.png", width: 1200, height: 630 }],
  },
};

export default function NetSuiteConsultantTexasPage() {
  return (
    <main className="pt-32 pb-24 sm:pt-40 sm:pb-32">
      <BreadcrumbJsonLd
        items={[
          { name: "Home", url: SITE_URL },
          { name: "NetSuite Consultant Texas", url: `${SITE_URL}/netsuite-consultant-texas` },
        ]}
      />
      <FaqJsonLd items={FAQ} />
      <ServiceJsonLd
        name="NetSuite Consultant Texas"
        description="NetSuite post-go-live consulting for Texas companies including manufacturing automation, SuiteScript development, energy services integrations, and ongoing support in Dallas, Houston, and Austin."
        url={`${SITE_URL}/netsuite-consultant-texas`}
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
          title="NetSuite Consultant for Texas Companies"
          subtitle="Post-go-live NetSuite support, SuiteScript development, manufacturing automation, and energy services integrations for companies in Dallas, Houston, Austin, and San Antonio."
          align="left"
        />

        <div className="mt-6 rounded-2xl border border-brand-100 bg-white p-5 shadow-soft">
          <LeadFormLight />
        </div>
        <p className="mt-3 text-xs text-brand-400">NetSuite-certified · US-based · Direct developer access · Month-to-month</p>

        <p className="mt-6 text-sm text-brand-400">
          SuitePacific works with Texas companies that are already live on NetSuite and need ongoing
          technical support. The Texas market spans manufacturers in the DFW industrial corridor,
          energy services companies in Houston, SaaS and technology businesses in Austin, and
          distribution companies across the state. All work is delivered remotely with direct developer
          access, tested in Sandbox before any change reaches production.
        </p>

        <div className="mt-8 rounded-xl bg-brand-50/60 border border-brand-100 px-5 py-4">
          <p className="text-xs font-semibold text-accent uppercase tracking-wide mb-2">Quick answer</p>
          <p className="text-sm text-brand-700 leading-relaxed">
            SuitePacific is a US-based NetSuite consulting firm providing post-go-live support and development for Texas companies. We work exclusively with businesses already live on NetSuite that need ongoing technical support after their implementation partner has disengaged. Services include SuiteScript 2.x development (User Event, Scheduled, Map/Reduce, and RESTlet scripts), SuiteFlow workflow automation, EDI and 3PL integrations, saved search and KPI dashboard builds, and advanced PDF templates. Texas clients span manufacturers in Dallas-Fort Worth, energy services companies in Houston, technology and SaaS companies in Austin, and wholesale distributors statewide. Work is delivered by a developer holding Oracle NetSuite SuiteCloud Developer II and Administrator Professional certifications. Managed support retainers start at $799 per month with no long-term contract requirement.
          </p>
        </div>

        {/* Industries */}
        <div className="mt-14" data-section="industries">
          <h2 className="text-lg font-semibold text-brand-900 mb-6">Which Industries Does SuitePacific Support in Texas?</h2>
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
          <h2 className="text-lg font-semibold text-brand-900 mb-6">What NetSuite Services Are Available for Texas Companies?</h2>
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
          <h2 className="text-lg font-semibold text-brand-900 mb-6">Why Does Remote NetSuite Consulting Work for Texas Companies?</h2>
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

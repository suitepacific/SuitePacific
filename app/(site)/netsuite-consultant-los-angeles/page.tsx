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
    title: "Apparel and fashion brands",
    description:
      "Multi-season inventory, style and size matrix items, wholesale and DTC channel management, Shopify integrations, and landed cost tracking for LA-based apparel companies on NetSuite.",
  },
  {
    title: "Entertainment and media companies",
    description:
      "Project-based accounting, talent and contractor payment workflows, multi-entity production company structures, and revenue recognition for production and media businesses.",
  },
  {
    title: "E-commerce and retail brands",
    description:
      "Amazon and Shopify integrations, multi-channel order management, 3PL integrations, inventory sync, and fulfillment exception workflows for high-volume e-commerce operations.",
  },
  {
    title: "Professional services and agencies",
    description:
      "Project accounting, resource utilization reporting, milestone billing, timesheet approval workflows, and client invoice templates for LA-based service businesses.",
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
    title: "NetSuite work is remote by nature",
    description:
      "SuiteScript development and configuration happen inside your NetSuite account. No on-site presence is needed. Deliverables land in your Sandbox within days of the request.",
  },
  {
    icon: Globe,
    title: "Direct access is faster than local proximity",
    description:
      "A local firm with an account manager layer means slower turnaround and an extra communication step on every request. SuitePacific provides direct developer access via Slack or email.",
  },
  {
    icon: ShieldCheck,
    title: "US-based, certified team",
    description:
      "SuitePacific is US-based with Oracle NetSuite SuiteCloud Developer II and Administrator Professional certifications. No offshore handoffs on any engagement.",
  },
];

const FAQ = [
  {
    question: "Does SuitePacific work with companies in Los Angeles?",
    answer:
      "Yes. SuitePacific works with Los Angeles-area companies on a remote basis — apparel brands, e-commerce operations, media companies, and professional services firms that are already live on NetSuite and need ongoing support or development.",
  },
  {
    question: "What NetSuite challenges are common for LA apparel and fashion companies?",
    answer:
      "Apparel companies on NetSuite most commonly need matrix item management for style and size variants, multi-channel inventory sync between Shopify and NetSuite, landed cost allocation scripts, and wholesale vs. DTC pricing logic. These often require SuiteScript because standard configuration doesn't have the flexibility for apparel-specific workflows.",
  },
  {
    question: "What does a NetSuite post-go-live engagement look like for an LA e-commerce company?",
    answer:
      "For an e-commerce company, the most common starting points are fixing or rebuilding a broken Shopify or Amazon integration, setting up inventory sync that keeps up with order volume, and building saved searches and dashboards that give operations and finance real visibility into channel performance. The engagement is month-to-month after that for ongoing support.",
  },
  {
    question: "Can SuitePacific help with a multi-entity NetSuite setup for an entertainment company?",
    answer:
      "Yes. Multi-entity structures are common for entertainment and media companies with production subsidiaries. SuitePacific works on intercompany eliminations, entity-level reporting, consolidated dashboards, and subsidiary-specific workflows for multi-entity NetSuite accounts.",
  },
  {
    question: "How does SuitePacific handle time zones when working with LA clients?",
    answer:
      "SuitePacific operates on Pacific time, the same as Los Angeles. Communication, planning, and delivery all happen within Pacific business hours.",
  },
];

export const metadata: Metadata = {
  title: "NetSuite Consultant Los Angeles",
  description:
    "NetSuite consulting for Los Angeles companies. Post-go-live support, SuiteScript development, and integrations for apparel, e-commerce, entertainment, and professional services firms on NetSuite.",
  alternates: { canonical: "/netsuite-consultant-los-angeles" },
  openGraph: {
    title: "NetSuite Consultant Los Angeles",
    description: "NetSuite post-go-live consulting for LA companies. SuiteScript development, integrations, and ongoing support for apparel, e-commerce, and entertainment businesses on NetSuite.",
    url: "https://suitepacific.com/netsuite-consultant-los-angeles",
    type: "website",
    images: [{ url: "https://suitepacific.com/og-default.png", width: 1200, height: 630 }],
  },
};

export default function NetSuiteConsultantLosAngelesPage() {
  return (
    <main className="pt-32 pb-24 sm:pt-40 sm:pb-32">
      <BreadcrumbJsonLd
        items={[
          { name: "Home", url: SITE_URL },
          { name: "NetSuite Consultant Los Angeles", url: `${SITE_URL}/netsuite-consultant-los-angeles` },
        ]}
      />
      <FaqJsonLd items={FAQ} />
      <ServiceJsonLd
        name="NetSuite Consultant Los Angeles"
        description="NetSuite post-go-live consulting and development for Los Angeles companies, including SuiteScript customization, workflow automation, and integrations."
        url={`${SITE_URL}/netsuite-consultant-los-angeles`}
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
          title="NetSuite Consultant for Los Angeles Companies"
          subtitle="Post-go-live NetSuite support, SuiteScript development, and integrations for apparel, e-commerce, entertainment, and professional services companies in the Los Angeles area."
          align="left"
        />

        <div className="mt-6 rounded-2xl border border-brand-100 bg-white p-5 shadow-soft">
          <LeadFormLight />
        </div>
        <p className="mt-3 text-xs text-brand-400">NetSuite-certified · US-based · Direct developer access · Month-to-month</p>

        <p className="mt-6 text-sm text-brand-400">
          SuitePacific works with Los Angeles-area businesses that are already live on NetSuite
          and need ongoing development and support. The LA market spans apparel brands with complex
          inventory requirements, entertainment companies with project-based accounting, and high-volume
          e-commerce operations that need reliable Shopify and Amazon integrations. All of this
          technical work is done remotely, with direct developer access and Sandbox testing before
          any change reaches production.
        </p>

        {/* Industries */}
        <div className="mt-14" data-section="industries">
          <h2 className="text-lg font-semibold text-brand-900 mb-6">Industries we support in Los Angeles</h2>
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
          <h2 className="text-lg font-semibold text-brand-900 mb-6">NetSuite services for Los Angeles companies</h2>
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
          <h2 className="text-lg font-semibold text-brand-900 mb-6">Why remote NetSuite consulting works for LA companies</h2>
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

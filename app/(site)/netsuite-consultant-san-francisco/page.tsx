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
import { SuitePacificCallout } from "@/components/sections/SuitePacificCallout";
import { SITE_URL } from "@/lib/content";

const INDUSTRIES = [
  {
    title: "SaaS and software companies",
    description:
      "Subscription billing logic, ARR and MRR reporting, deferred revenue posting, renewal automation, and Salesforce or HubSpot integrations for Bay Area SaaS companies running NetSuite.",
  },
  {
    title: "Venture-backed technology companies",
    description:
      "Fast-scaling tech companies need NetSuite customizations that keep pace with headcount, entity structure, and product line growth without rebuilding the account each time.",
  },
  {
    title: "E-commerce and direct-to-consumer brands",
    description:
      "Shopify-to-NetSuite order import, inventory sync across fulfillment channels, and returns handling for DTC brands with high transaction volume.",
  },
  {
    title: "Professional services firms",
    description:
      "Project accounting, timesheet approval workflows, milestone billing, utilization reporting, and client invoice templates for SF-based professional services companies.",
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
      "SuiteScript development, workflow configuration, and saved search builds happen inside your NetSuite account. No on-site presence is required. Deliverables land in your Sandbox the same week.",
  },
  {
    icon: Globe,
    title: "Direct access beats local proximity",
    description:
      "A local firm with an account manager layer is slower than a senior developer available directly via Slack or email. Most Bay Area clients find turnaround faster with SuitePacific than with a local firm.",
  },
  {
    icon: ShieldCheck,
    title: "US-based, certified team",
    description:
      "SuitePacific is US-based. Our lead developer holds Oracle NetSuite SuiteCloud Developer II and Administrator Professional certifications. No offshore handoffs.",
  },
];

const FAQ = [
  {
    question: "Does SuitePacific work with companies in the San Francisco Bay Area?",
    answer:
      "Yes. SuitePacific works with companies in San Francisco, the South Bay, and across the greater Bay Area on a remote basis. Our clients include SaaS companies, e-commerce brands, and professional services firms that are already live on NetSuite and need ongoing technical support or development.",
  },
  {
    question: "What NetSuite issues are common for Bay Area SaaS companies?",
    answer:
      "The most common issues for SaaS companies on NetSuite are subscription billing logic that standard configuration doesn't support, deferred revenue posting that requires SuiteScript, ARR and MRR reporting that needs custom saved searches, and integrations with Salesforce or HubSpot that aren't maintaining data parity. These are all areas SuitePacific builds regularly.",
  },
  {
    question: "Can a remote NetSuite consultant work as effectively as a local one?",
    answer:
      "Yes. NetSuite development, configuration, and support is entirely remote; the work happens inside your NetSuite account, not at your office. A remote consultant with direct communication and a fast turnaround model is more efficient than a local firm with an account manager intermediary and a weekly meeting cadence.",
  },
  {
    question: "What does a NetSuite post-go-live engagement look like for a Bay Area startup?",
    answer:
      "For most early-stage companies, it starts with a short onboarding period where we review what the implementation partner built, document the existing customizations, and identify gaps. From there, the engagement is ongoing: new development as product or process requirements change, fixes when something breaks, and release testing when NetSuite updates go live.",
  },
  {
    question: "How quickly can SuitePacific start supporting a NetSuite account in San Francisco?",
    answer:
      "We typically start within one to two weeks of an initial call. The onboarding involves a brief review of your existing account configuration and customizations before any new work begins.",
  },
];

export const metadata: Metadata = {
  title: "NetSuite Consultant San Francisco",
  description:
    "NetSuite consulting for San Francisco Bay Area companies. Post-go-live support, SuiteScript development, workflow automation, and integrations for SaaS, e-commerce, and professional services firms on NetSuite.",
  alternates: { canonical: "/netsuite-consultant-san-francisco" },
  openGraph: {
    title: "NetSuite Consultant San Francisco",
    description: "NetSuite post-go-live consulting for Bay Area companies. SuiteScript development, integrations, and ongoing support for SaaS and tech companies on NetSuite.",
    url: "https://suitepacific.com/netsuite-consultant-san-francisco",
    type: "website",
    images: [{ url: "https://suitepacific.com/og-default.png", width: 1200, height: 630 }],
  },
};

export default function NetSuiteConsultantSanFranciscoPage() {
  return (
    <main className="pt-32 pb-24 sm:pt-40 sm:pb-32">
      <BreadcrumbJsonLd
        items={[
          { name: "Home", url: SITE_URL },
          { name: "NetSuite Consultant San Francisco", url: `${SITE_URL}/netsuite-consultant-san-francisco` },
        ]}
      />
      <FaqJsonLd items={FAQ} />
      <ServiceJsonLd
        name="NetSuite Consultant San Francisco"
        description="NetSuite post-go-live consulting and development for San Francisco Bay Area companies, including SuiteScript customization, workflow automation, and integrations."
        url={`${SITE_URL}/netsuite-consultant-san-francisco`}
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
          title="NetSuite Consultant for San Francisco Bay Area Companies"
          subtitle="Post-go-live NetSuite support, SuiteScript development, and integrations for SaaS, tech, e-commerce, and professional services firms in the San Francisco Bay Area."
          align="left"
        />

        <div className="mt-6 rounded-2xl border border-brand-100 bg-white p-5 shadow-soft">
          <LeadFormLight />
        </div>
        <p className="mt-3 text-xs text-brand-400">NetSuite-certified · US-based · Direct developer access · Month-to-month</p>

        <p className="mt-6 text-sm text-brand-400">
          SuitePacific works with Bay Area companies that are already live on NetSuite and need
          ongoing development and support after their implementation partner has disengaged. Whether
          the need is subscription billing logic for a SaaS company, a Salesforce integration for a
          sales-led tech firm, or production reporting for a hardware company, the technical layer
          required is the same: certified SuiteScript development, tested in Sandbox, delivered directly
          without an account manager in between.
        </p>

        <div className="mt-8 rounded-xl bg-brand-50/60 border border-brand-100 px-5 py-4">
          <p className="text-xs font-semibold text-accent uppercase tracking-wide mb-2">Quick answer</p>
          <p className="text-sm text-brand-700 leading-relaxed">
            SuitePacific is a US-based NetSuite consulting firm providing post-go-live support and development for San Francisco Bay Area companies. We work exclusively with businesses already live on NetSuite that need ongoing technical support after their implementation partner has disengaged. Services include SuiteScript 2.x development (User Event, Scheduled, Map/Reduce, and RESTlet scripts), SuiteFlow workflow automation, third-party integrations with Salesforce, Shopify, and HubSpot, saved search and KPI dashboard builds, and advanced PDF templates. Bay Area clients are primarily SaaS companies, venture-backed technology firms, e-commerce brands, and professional services firms. Work is delivered by a developer holding Oracle NetSuite SuiteCloud Developer II and Administrator Professional certifications, communicating directly via Slack or email. Managed support retainers start at $799 per month with no long-term contract requirement.
          </p>
        </div>

        {/* Industries */}
        <div className="mt-14" data-section="industries">
          <h2 className="text-lg font-semibold text-brand-900 mb-6">Which Industries Does SuitePacific Support in the Bay Area?</h2>
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
          <h2 className="text-lg font-semibold text-brand-900 mb-6">What NetSuite Services Are Available for Bay Area Companies?</h2>
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
          <h2 className="text-lg font-semibold text-brand-900 mb-6">Why Does Remote NetSuite Consulting Work for Bay Area Companies?</h2>
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


        {/* Bottom Line */}
        <div className="mt-12 rounded-2xl border-2 border-accent/30 bg-gradient-to-br from-accent/5 to-transparent p-6">
          <p className="text-xs font-semibold uppercase tracking-wide text-accent mb-3">Bottom Line</p>
          <h2 className="text-base font-semibold text-brand-900 mb-3">
            Bay Area SaaS companies and tech businesses on NetSuite need support that understands subscription billing, deferred revenue, Salesforce integrations, and rapid product iteration. SuitePacific specialises in exactly these configurations.
          </h2>
          <p className="text-sm text-brand-500 mb-4">
            Bay Area NetSuite partners often carry premium rates and project-oriented billing that does not fit the ongoing support model most SaaS companies need. For accounts with SuiteBilling configurations, ARR and MRR reporting requirements, HubSpot or Salesforce CRM integrations, and development velocity that matches a software company&apos;s pace, the right support model is a retainer with direct access.
          </p>
          <p className="text-sm text-brand-500 mb-4">
            SuitePacific works with San Francisco and Bay Area companies: SaaS businesses, e-commerce brands, and technology companies already live on NetSuite. Oracle-certified, direct developer access, no offshore handoffs. Plans from $799 per month, month-to-month.
          </p>
          <ul className="space-y-2 text-sm text-brand-500">
            <li className="flex items-start gap-2"><span className="text-accent font-bold mt-0.5">→</span> SuiteBilling and ARM support for SaaS subscription and revenue recognition requirements</li>
            <li className="flex items-start gap-2"><span className="text-accent font-bold mt-0.5">→</span> Salesforce and HubSpot integrations common in Bay Area tech accounts</li>
            <li className="flex items-start gap-2"><span className="text-accent font-bold mt-0.5">→</span> Direct developer access: same turnaround as an internal resource, without the headcount</li>
          </ul>
        </div>

        <SuitePacificCallout
          heading="SuitePacific: NetSuite support for San Francisco Bay Area businesses"
          linkHref="/netsuite-care"
          linkLabel="View support plans"
        />

        <ServiceFaqSection items={FAQ} />

        <div className="mt-10 rounded-2xl border border-brand-100 bg-white p-5 shadow-soft">
          <LeadFormLight />
        </div>
      </div>
    </main>
  );
}

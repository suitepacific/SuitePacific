import type { Metadata } from "next";
import Link from "next/link";
import {
  Code2,
  Workflow,
  BarChart2,
  Headphones,
  ShieldCheck,
  Users,
  RefreshCcw,
  Award,
  Settings2,
  Layers,
  Plug,
  TrendingUp,
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
    title: "Subscription billing complexity",
    description:
      "Recurring billing with term-based pricing, prorations, mid-term upgrades, and cancellation processing that needs scripted logic beyond what standard NetSuite invoicing supports.",
  },
  {
    icon: TrendingUp,
    title: "Revenue recognition accuracy",
    description:
      "ASC 606 multi-element arrangement handling, deferred revenue schedules, and contract modification adjustments that require custom automation to stay accurate at scale.",
  },
  {
    icon: RefreshCcw,
    title: "Renewal management",
    description:
      "Subscription renewal tracking, auto-renewal logic, renewal opportunity creation, and renewal invoice generation require custom workflows and scripts beyond standard customer records.",
  },
  {
    icon: BarChart2,
    title: "ARR and MRR reporting",
    description:
      "Accurate ARR and MRR reporting requires custom saved searches and SuiteQL queries since NetSuite does not produce subscription revenue metrics natively from the standard invoice or revenue record.",
  },
  {
    icon: Layers,
    title: "CRM and billing system integration",
    description:
      "Connecting NetSuite to Salesforce, HubSpot, or other CRM systems for opportunity-to-invoice data flow, and to billing platforms for subscription event sync, requires RESTlet integrations.",
  },
  {
    icon: Code2,
    title: "Usage-based billing",
    description:
      "Metered billing where invoice amounts depend on usage data from external systems requires import scripts that pull consumption data and build invoices with the correct line-item breakdown.",
  },
];

const SERVICES = [
  {
    icon: Headphones,
    title: "Post-Go-Live Support",
    description:
      "Ongoing technical support for your live SaaS NetSuite account: new development, fixes, release testing, and account upkeep on a month-to-month basis.",
    href: "/netsuite-post-go-live-support",
  },
  {
    icon: Code2,
    title: "SuiteScript Development",
    description:
      "Custom scripts for subscription billing logic, renewal automation, usage-based billing import, revenue schedule management, and SaaS-specific business rules.",
    href: "/netsuite-suitescript-development",
  },
  {
    icon: Workflow,
    title: "Workflow Automation",
    description:
      "SuiteFlow workflows for renewal reminders, contract modification approvals, dunning sequences, and subscription lifecycle event notifications.",
    href: "/netsuite-workflow-automation",
  },
  {
    icon: BarChart2,
    title: "Saved Searches & Dashboards",
    description:
      "ARR, MRR, churn, renewal rate, and customer lifetime value reporting built with saved searches, SuiteQL, and KPI portlets for finance and leadership teams.",
    href: "/netsuite-saved-searches-dashboards",
  },
  {
    icon: Plug,
    title: "NetSuite Integrations",
    description:
      "RESTlet and script-based integrations connecting NetSuite to Salesforce, HubSpot, billing platforms, and other SaaS tools for subscription and revenue data sync.",
    href: "/netsuite-integrations",
  },
  {
    icon: Users,
    title: "Administrator Support",
    description:
      "Ongoing NetSuite administration for SaaS accounts: role and permission management, configuration changes, period close support, and platform troubleshooting.",
    href: "/netsuite-administrator-support",
  },
];

const CUSTOMIZATIONS = [
  {
    title: "Subscription renewal reminder workflows",
    description:
      "SuiteFlow workflows triggered by contract end date fields, sending renewal reminders to sales reps and account owners at 90, 60, and 30 days before expiry, with escalation on non-response.",
  },
  {
    title: "ARR and MRR saved searches",
    description:
      "SuiteQL-based saved searches that calculate ARR and MRR from revenue schedule records or invoice history, with customer segment filters and period-over-period comparison fields.",
  },
  {
    title: "Deferred revenue posting automation",
    description:
      "User Event scripts that create revenue schedules automatically on subscription invoice creation, matching contract term length and recognizing revenue evenly across the subscription period.",
  },
  {
    title: "Salesforce-to-NetSuite sync scripts",
    description:
      "RESTlet endpoints or scheduled scripts that pull closed-won opportunity data from Salesforce and create NetSuite customer records, contracts, and invoices without manual re-entry.",
  },
  {
    title: "Usage-based billing import scripts",
    description:
      "Scheduled Map/Reduce scripts that pull usage data from metering systems via API, calculate billable amounts, and generate NetSuite invoices with line-item usage detail per billing period.",
  },
  {
    title: "Customer lifetime value dashboards",
    description:
      "Saved searches and portlets showing total billed, renewal history, and revenue by customer cohort, giving finance and customer success teams a view of revenue concentration and churn risk.",
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
      "Ongoing knowledge of your SaaS account retained across every engagement. Each request builds on prior work without re-discovery.",
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
    question: "Is NetSuite suitable for SaaS companies?",
    answer:
      "Yes, particularly for SaaS companies that have outgrown QuickBooks or Xero and need integrated ERP and subscription billing management. NetSuite handles recurring invoicing, revenue recognition schedules, multi-currency billing, and deferred revenue. Customization is typically required for subscription-specific reporting, renewal automation, and integration with CRM or billing platforms.",
  },
  {
    question: "What is NetSuite used for in SaaS?",
    answer:
      "SaaS companies use NetSuite for subscription invoicing, deferred revenue management, revenue recognition under ASC 606, accounts receivable, multi-currency billing, and financial reporting. NetSuite's Advanced Revenue Management module handles multi-element arrangements and recognition schedules. Custom saved searches and scripts extend this for ARR, MRR, renewal tracking, and CRM integration.",
  },
  {
    question: "How can SaaS companies customize NetSuite?",
    answer:
      "SuiteScript handles subscription billing logic, usage-based billing imports, renewal automation, CRM sync, and SaaS-specific field logic that configuration alone cannot manage. SuiteFlow builds the renewal reminder workflows and approval chains. RESTlets connect NetSuite to Salesforce, billing platforms, and other SaaS tools. Together these allow NetSuite to match most SaaS finance workflows without third-party middleware.",
  },
  {
    question: "How can NetSuite support subscription businesses?",
    answer:
      "NetSuite's recurring billing and revenue recognition features handle the core subscription finance workflow: create invoice, defer revenue, recognize on schedule, track renewal. Post-go-live customization extends this with renewal reminder workflows, ARR and MRR reporting, mid-term modification handling, usage-based billing imports, and churn reporting that the standard feature set does not produce natively.",
  },
  {
    question: "Can NetSuite automate SaaS finance processes?",
    answer:
      "Yes. Common automations include renewal reminder workflows triggered by contract end dates, deferred revenue posting on invoice creation, subscription modification processing scripts, dunning workflows for past-due accounts, and usage data import scripts for metered billing. CRM sync for opportunity-to-invoice flows requires RESTlet or scheduled script builds.",
  },
  {
    question: "What are common NetSuite customizations for SaaS companies?",
    answer:
      "Common builds include renewal reminder workflows with multi-stage escalation, ARR and MRR saved searches from revenue schedule data, deferred revenue automation scripts, Salesforce-to-NetSuite sync for closed-won opportunities, usage-based billing import from metering APIs, and customer lifetime value dashboards showing revenue concentration and churn indicators.",
  },
  {
    question: "How can SaaS companies improve NetSuite reporting?",
    answer:
      "Custom saved searches and SuiteQL produce ARR, MRR, renewal rate, churn by cohort, and customer lifetime value reporting that NetSuite does not generate natively. These are built as saved searches or KPI portlets on finance and leadership dashboards. Subscription revenue metrics require pulling from revenue schedule records, which standard saved searches cannot easily surface without custom formulas.",
  },
  {
    question: "What does a NetSuite SaaS consultant do?",
    answer:
      "A NetSuite SaaS consultant reviews the existing billing and revenue setup, identifies gaps between standard NetSuite behavior and subscription workflow requirements, and builds the SuiteScript customizations, SuiteFlow workflows, integrations, and saved searches needed to close those gaps. Ongoing engagements cover new product billing models, integration changes, and release testing.",
  },
  {
    question: "Who provides NetSuite support for SaaS companies?",
    answer:
      "SuitePacific provides NetSuite post-go-live support for SaaS and technology companies, including SuiteScript customization for billing and renewal logic, CRM and billing platform integrations, ARR and MRR reporting, revenue recognition automation, and ongoing technical support on a month-to-month basis.",
  },
  {
    question: "Who can support a NetSuite SaaS account after go-live?",
    answer:
      "After an implementation partner's engagement ends, ongoing support is typically handled by a post-go-live NetSuite consulting firm. SuitePacific specializes in exactly this: taking over SaaS NetSuite accounts after implementation, reviewing existing customizations, and providing ongoing development, fixes, and optimization.",
  },
  {
    question: "Who provides NetSuite development for technology companies?",
    answer:
      "SuitePacific provides NetSuite SuiteScript development for SaaS and technology companies, including subscription billing scripts, renewal workflows, usage-based billing import, CRM integrations, ARR and MRR saved searches, and revenue recognition automation. Development is tested in Sandbox before production deployment.",
  },
  {
    question: "How does SuitePacific support SaaS and technology companies using NetSuite?",
    answer:
      "SuitePacific provides dedicated NetSuite technical support for SaaS companies on a month-to-month basis. This includes SuiteScript development for billing and renewal logic, SuiteFlow workflow builds for renewal reminders and approval chains, ARR and MRR reporting dashboards, CRM and billing platform integrations, and administrator support. We work directly with your team without an account manager layer.",
  },
];

const COMPARISON = [
  {
    capability: "Subscription billing",
    standard: "Recurring invoice templates",
    withSP: "Custom proration, upgrade, and cancellation logic via SuiteScript",
  },
  {
    capability: "Revenue recognition",
    standard: "ARM schedules per invoice line",
    withSP: "Automated deferred revenue posting on subscription invoice creation",
  },
  {
    capability: "Renewal tracking",
    standard: "Manual customer follow-up",
    withSP: "Reminder workflows at 90, 60, and 30 days with escalation routing",
  },
  {
    capability: "SaaS metrics reporting",
    standard: "Standard AR and revenue reports",
    withSP: "ARR, MRR, churn rate, and LTV saved searches via SuiteQL",
  },
  {
    capability: "CRM integration",
    standard: "Manual data entry from CRM systems",
    withSP: "Salesforce and HubSpot sync via RESTlet or scheduled script",
  },
  {
    capability: "Usage billing",
    standard: "Manual invoice creation from usage data",
    withSP: "Automated import scripts from usage tracking systems",
  },
];

export const metadata: Metadata = {
  title: "NetSuite Support for SaaS & Technology Companies",
  description:
    "NetSuite post-go-live support and development for SaaS and technology companies. Subscription billing, renewal automation, ARR/MRR reporting, and CRM integrations.",
  alternates: { canonical: "/industries/saas-technology" },
  openGraph: {
    title: "NetSuite Support for SaaS & Technology Companies",
    description:
      "NetSuite post-go-live support and development for SaaS companies. Subscription billing, renewal automation, and ARR/MRR reporting.",
    url: "https://suitepacific.com/industries/saas-technology",
    type: "website",
    images: [{ url: "https://suitepacific.com/og-default.png", width: 1200, height: 630 }],
  },
};

export default function SaasTechnologyPage() {
  return (
    <main className="pt-32 pb-24 sm:pt-40 sm:pb-32">
      <BreadcrumbJsonLd
        items={[
          { name: "Home", url: SITE_URL },
          { name: "Industries", url: `${SITE_URL}/industries` },
          { name: "SaaS & Technology", url: `${SITE_URL}/industries/saas-technology` },
        ]}
      />
      <FaqJsonLd items={FAQ} />
      <ServiceJsonLd
        name="NetSuite Support for SaaS & Technology Companies"
        description="NetSuite post-go-live support and development for SaaS and technology companies, including subscription billing, renewal automation, and ARR/MRR reporting."
        url={`${SITE_URL}/industries/saas-technology`}
        serviceType="NetSuite SaaS Support"
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
          eyebrow="SaaS & Technology"
          title="NetSuite Support & Development for SaaS & Technology Companies"
          subtitle="Technical support, SuiteScript customization, and workflow automation for technology companies already live on NetSuite."
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
          SaaS companies that select NetSuite for subscription billing and revenue recognition often find that
          proration logic, renewal workflows, and ARR/MRR reporting require SuiteScript development that the
          standard ARM module and invoicing tools do not provide out of the box. SuitePacific provides this
          technical layer for technology companies already live on NetSuite, covering subscription billing logic,
          renewal automation, ARR and MRR reporting, usage-based billing imports, and integrations with CRM systems
          and billing platforms. SaaS accounts in NetSuite
          typically require significant customization to produce subscription revenue metrics, automate renewal
          workflows, and connect the finance system to the product and sales stack. Common areas include deferred
          revenue posting automation, renewal reminder workflows, SuiteQL-based ARR and MRR saved searches, and
          RESTlet integrations for Salesforce or billing platform sync. SuitePacific builds and maintains these
          customizations on a month-to-month basis, tested in Sandbox before production deployment. Our lead
          developer holds Oracle NetSuite&apos;s SuiteCloud Developer II certification. Work is done directly,
          with no offshore handoffs or account manager layer.
        </p>

        {/* Comparison */}
        <div className="mt-14" data-section="comparison">
          <h2 className="text-lg font-semibold text-brand-900 mb-2">
            How does SuitePacific extend NetSuite for SaaS companies?
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
            What NetSuite challenges do SaaS companies face?
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
            What NetSuite services does SuitePacific provide for SaaS companies?
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
            What are common NetSuite customizations for SaaS companies?
          </h2>
          <p className="text-sm text-brand-400 mb-6">
            These are the kinds of builds we do for technology companies on a recurring basis.
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
            Why do SaaS companies choose SuitePacific?
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

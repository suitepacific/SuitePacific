import type { Metadata } from "next";
import Link from "next/link";
import {
  Calculator, FileText, ShieldCheck, RefreshCw,
  AlertCircle, AlertTriangle, Wrench,
  Users, Award,
} from "lucide-react";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Card } from "@/components/ui/Card";
import { IconBadge } from "@/components/ui/IconBadge";
import { BreadcrumbJsonLd, FaqJsonLd, ServiceJsonLd, OrganizationJsonLd, VideoObjectJsonLd } from "@/components/seo/JsonLd";
import { ServiceFaqSection } from "@/components/ui/ServiceFaqSection";
import { LeadFormLight } from "@/components/sections/LeadFormLight";
import { SITE_URL } from "@/lib/content";

const PAIN_POINTS = [
  {
    icon: AlertCircle,
    title: "Manual tax rate management is no longer workable.",
    description:
      "Your business sells across multiple states or internationally. Maintaining correct tax rates, nexus, and exemptions manually in NetSuite does not scale and creates compliance risk.",
  },
  {
    icon: AlertTriangle,
    title: "Exemption certificates are not being applied consistently.",
    description:
      "Resellers and exempt entities are sometimes charged tax because there is no systematic way to tie exemption certificates to NetSuite customer records.",
  },
  {
    icon: Wrench,
    title: "An existing AvaTax integration is not calculating correctly.",
    description:
      "Tax calculations are returning wrong amounts, or tax is not being calculated at all on certain transaction types. The original integration was not built or tested thoroughly.",
  },
];

const INTEGRATION_AREAS = [
  {
    icon: Calculator,
    title: "Real-Time Tax Calculation",
    description:
      "AvaTax API called during NetSuite transaction creation to calculate accurate tax by jurisdiction for each line item, replacing manual rate entries.",
  },
  {
    icon: FileText,
    title: "Exemption Certificate Management",
    description:
      "Exemption certificates from Avalara's CertCapture or manually maintained exemptions applied to NetSuite customer records, preventing incorrect tax charges on exempt transactions.",
  },
  {
    icon: RefreshCw,
    title: "Transaction Commit and Reconciliation",
    description:
      "Committed transactions in NetSuite pushed to Avalara for reporting and returns filing, with reconciliation between what NetSuite invoiced and what Avalara has recorded.",
  },
  {
    icon: ShieldCheck,
    title: "Address Validation",
    description:
      "Avalara's address validation API integrated into NetSuite customer and transaction creation to improve rooftop-level tax accuracy and reduce nexus errors.",
  },
];

const HOW_IT_WORKS = [
  {
    step: "01",
    title: "Nexus and exemption configuration first",
    description:
      "The integration's accuracy depends on correct Avalara configuration: nexus registration, tax code mapping, and exemption certificate setup. We review Avalara configuration alongside the NetSuite integration.",
  },
  {
    step: "02",
    title: "Transaction type coverage mapped explicitly",
    description:
      "AvaTax calculations apply differently to sales orders, invoices, credit memos, and cash sales. Each transaction type is mapped and tested explicitly rather than assumed to work the same way.",
  },
  {
    step: "03",
    title: "Error handling for API failures",
    description:
      "When the AvaTax API is unavailable, transactions should not fail silently or block. We design explicit fallback behavior and failure alerting for API outages.",
  },
];

const WHY_SP = [
  {
    icon: ShieldCheck,
    title: "NetSuite-Certified",
    description:
      "NetSuite SuiteCloud Developer II certification. We build AvaTax integrations directly in SuiteScript against the Avalara API, including the configuration review that determines calculation accuracy.",
  },
  {
    icon: Calculator,
    title: "Tax Configuration Review Included",
    description:
      "The integration is only as accurate as the Avalara configuration behind it. We include a review of your nexus, tax code mapping, and exemption setup as part of the engagement.",
  },
  {
    icon: Users,
    title: "Direct Access",
    description:
      "You work directly with the developer who built the integration. When Avalara releases API updates or NetSuite changes a transaction type, you get a specific fix, not a ticket.",
  },
  {
    icon: Award,
    title: "Post-Launch Maintenance",
    description:
      "Avalara regularly updates its API and Avalara-NetSuite compatibility. Our support model covers monitoring and updates as both platforms evolve.",
  },
];

const FAQ = [
  {
    question: "Does NetSuite have a native Avalara connector?",
    answer:
      "Yes, NetSuite's SuiteTax framework has native integration points for Avalara. The native connector covers standard transaction types. For accounts with custom transaction workflows, non-standard item types, or complex exemption certificate requirements, a custom SuiteScript implementation gives you more control over when and how AvaTax is called.",
  },
  {
    question: "What tax codes and nexus setup is required in Avalara before integration?",
    answer:
      "You need registered nexus in all states where you have sales tax obligations, and Avalara tax codes mapped to your NetSuite item types. If this is not set up before the integration, calculations will be inaccurate. We include a review of your Avalara configuration as part of the engagement.",
  },
  {
    question: "How are returns and credit memos handled?",
    answer:
      "Returns and credit memos in NetSuite trigger corresponding void or return transactions in Avalara to keep the tax liability records consistent. The handling depends on your return workflow and whether you issue credit memos or cash refunds.",
  },
  {
    question: "Can you fix an existing AvaTax integration that's calculating incorrectly?",
    answer:
      "Yes. We review the existing integration logic, identify where calculations are wrong or not firing, and correct the underlying issue. We include a configuration review of Avalara alongside the integration fix.",
  },
];

export const metadata: Metadata = {
  title: "NetSuite Avalara Integration",
  description:
    "Custom NetSuite Avalara AvaTax integration: real-time tax calculation, exemption certificate management, transaction commit, and address validation. Oracle-certified developers.",
  alternates: { canonical: "/netsuite-integrations/avalara" },
  openGraph: {
    title: "NetSuite Avalara Integration",
    description: "Connect NetSuite to Avalara AvaTax for real-time tax calculation, exemption management, and transaction reconciliation. Includes Avalara configuration review.",
    url: "https://suitepacific.com/netsuite-integrations/avalara",
    type: "website",
    images: [{ url: "https://suitepacific.com/og-default.png", width: 1200, height: 630 }],
  },
};

export default function NetSuiteAvalaraIntegrationPage() {
  return (
    <main className="pt-32 pb-24 sm:pt-40 sm:pb-32">
      <BreadcrumbJsonLd
        items={[
          { name: "Home", url: SITE_URL },
          { name: "NetSuite Integrations", url: `${SITE_URL}/netsuite-integrations` },
          { name: "Avalara", url: `${SITE_URL}/netsuite-integrations/avalara` },
        ]}
      />
      <FaqJsonLd items={FAQ} />
      <ServiceJsonLd
        name="NetSuite Avalara Integration"
        description="Custom NetSuite and Avalara AvaTax integration with real-time tax calculation, exemption certificate management, and transaction reconciliation."
        url={`${SITE_URL}/netsuite-integrations/avalara`}
        serviceType="NetSuite Integration"
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
          eyebrow="NetSuite Integrations"
          title="NetSuite Avalara Integration"
          subtitle="Connect NetSuite to Avalara AvaTax for real-time tax calculation by jurisdiction, exemption certificate management, and transaction reconciliation. Includes Avalara configuration review."
          align="left"
        />

        <div className="mt-6 rounded-2xl border border-brand-100 bg-white p-5 shadow-soft">
          <LeadFormLight />
        </div>
        <p className="mt-3 text-xs text-brand-400">NetSuite-certified · Configuration review included · Sandbox-tested · Direct developer access</p>

        <p className="mt-6 text-sm text-brand-400">
          Accurate sales tax across multiple states requires more than a rate table. Avalara AvaTax
          calculates tax by rooftop jurisdiction in real time as transactions are created in NetSuite,
          handling nexus, exemptions, and product taxability rules that are impractical to maintain
          manually at scale.
        </p>

        {/* Pain Points */}
        <div className="mt-14" data-section="pain-points">
          <h2 className="text-lg font-semibold text-brand-900 mb-6">Common situations that bring people here</h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
            {PAIN_POINTS.map((item) => (
              <Card key={item.title} className="p-5 flex flex-col gap-3">
                <IconBadge icon={item.icon} />
                <h3 className="font-semibold text-brand-900 text-sm">{item.title}</h3>
                <p className="text-sm text-brand-400">{item.description}</p>
              </Card>
            ))}
          </div>
        </div>

        {/* Integration areas */}
        <div className="mt-14" data-section="integration-areas">
          <h2 className="text-lg font-semibold text-brand-900 mb-1">What the integration covers</h2>
          <p className="text-sm text-brand-400 mb-6">
            Real-time calculation and exemption handling are the foundation. Commit and reconciliation close the loop with Avalara&apos;s returns filing.
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            {INTEGRATION_AREAS.map((item) => (
              <Card key={item.title} className="p-5 flex items-start gap-4">
                <IconBadge icon={item.icon} />
                <div>
                  <h3 className="font-semibold text-brand-900 text-sm">{item.title}</h3>
                  <p className="mt-1.5 text-sm text-brand-400">{item.description}</p>
                </div>
              </Card>
            ))}
          </div>
        </div>

        {/* How it works */}
        <div className="mt-14" data-section="how-it-works">
          <h2 className="text-lg font-semibold text-brand-900 mb-6">How we build it</h2>
          <div className="space-y-4">
            {HOW_IT_WORKS.map((item) => (
              <div key={item.step} className="flex items-start gap-5">
                <span className="text-xs font-semibold text-accent bg-accent/10 rounded-full h-7 w-7 flex items-center justify-center shrink-0 mt-0.5">
                  {item.step}
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
          <h2 className="text-lg font-semibold text-brand-900 mb-6">Why SuitePacific</h2>
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
        </div>

        {/* Related */}
        <div className="mt-10 rounded-2xl border border-brand-100 bg-brand-50/30 p-5 sm:p-6">
          <p className="text-sm font-semibold text-brand-900 mb-3">Other integrations</p>
          <ul className="space-y-2.5">
            <li className="text-sm text-brand-400">
              <Link href="/netsuite-integrations/shopify" className="text-accent hover:underline">NetSuite Shopify integration</Link>{" "}
              for e-commerce order import, inventory sync, and fulfillment.
            </li>
            <li className="text-sm text-brand-400">
              <Link href="/netsuite-integrations/salesforce" className="text-accent hover:underline">NetSuite Salesforce integration</Link>{" "}
              for CRM-to-ERP account and deal sync.
            </li>
            <li className="text-sm text-brand-400">
              <Link href="/netsuite-integrations" className="text-accent hover:underline">All NetSuite integrations</Link>{" "}
              covers the full range of platforms SuitePacific builds for.
            </li>
          </ul>
        </div>

        <ServiceFaqSection items={FAQ} />
      </div>
    </main>
  );
}

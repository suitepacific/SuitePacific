import type { Metadata } from "next";
import Link from "next/link";
import {
  Users, ArrowLeftRight, FileText, DollarSign,
  AlertCircle, Wrench, GitBranch,
  ShieldCheck, Zap, Award,
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
    title: "Sales closes a deal in Salesforce. Operations enters it manually in NetSuite.",
    description:
      "Every closed-won opportunity in Salesforce triggers a manual re-entry process in NetSuite. Double work, delay between close and order creation, and data inconsistencies when the two records diverge.",
  },
  {
    icon: Wrench,
    title: "Customer data is out of sync between the two systems.",
    description:
      "Billing addresses, contact information, and account status updated in one system do not appear in the other. Sales works from stale NetSuite data; finance works from stale Salesforce data.",
  },
  {
    icon: GitBranch,
    title: "Reps have no visibility into invoice or payment status.",
    description:
      "Sales reps cannot see whether a customer's invoices are current or overdue without asking finance. Collections awareness and expansion conversation timing both suffer.",
  },
];

const DATA_FLOWS = [
  {
    icon: Users,
    title: "Account and Contact Sync",
    description:
      "Salesforce Accounts and Contacts synced to NetSuite Customers and Contacts, with duplicate prevention, field mapping, and configurable sync direction per field.",
  },
  {
    icon: ArrowLeftRight,
    title: "Opportunity to Sales Order",
    description:
      "Closed-won Salesforce Opportunities create NetSuite Sales Orders with product mapping, pricing, and sales rep attribution, eliminating manual re-entry at close.",
  },
  {
    icon: FileText,
    title: "Invoice Visibility in Salesforce",
    description:
      "NetSuite invoice status, due dates, and payment status surfaced in Salesforce so sales reps have collections context without leaving their CRM.",
  },
  {
    icon: DollarSign,
    title: "Product and Price Book Sync",
    description:
      "NetSuite items and pricing reflected in Salesforce Product catalog and Price Books, keeping what sales quotes consistent with what finance invoices.",
  },
];

const HOW_IT_WORKS = [
  {
    step: "01",
    title: "Sync direction and field mapping first",
    description:
      "Not all fields sync in both directions. We document which fields are master-of-record in which system before building, preventing conflicts and data overwrites.",
  },
  {
    step: "02",
    title: "Conflict resolution built in",
    description:
      "When both systems have been updated since the last sync, the conflict resolution rule determines which version wins. This is designed explicitly, not left to chance.",
  },
  {
    step: "03",
    title: "Tested with real data volumes",
    description:
      "CRM-to-ERP integrations often involve large customer and contact record sets. We test with representative data volumes before production to verify performance and duplicate handling.",
  },
];

const WHY_SP = [
  {
    icon: ShieldCheck,
    title: "NetSuite-Certified",
    description:
      "NetSuite SuiteCloud Developer II certification. We build directly against the NetSuite REST API and SuiteScript, not through middleware layers that add their own failure points.",
  },
  {
    icon: Zap,
    title: "Explicit Conflict Handling",
    description:
      "Bidirectional sync always involves conflict scenarios. We design the resolution logic explicitly for your data model rather than leaving it to middleware defaults.",
  },
  {
    icon: Users,
    title: "Direct Access",
    description:
      "You communicate directly with the developer who built the integration. When something fails, you get a specific answer, not a ticket routed through a support tier.",
  },
  {
    icon: Award,
    title: "Post-Launch Maintenance",
    description:
      "Both Salesforce and NetSuite release API updates. Our ongoing support model includes monitoring and updates when either platform changes something that affects the integration.",
  },
];

const FAQ = [
  {
    question: "Which direction does customer data sync?",
    answer:
      "This depends on your master-of-record decision. Many companies use Salesforce as the master for customer and contact records during the sales cycle, then treat NetSuite as the master after the customer is invoiced. The integration is built around whichever model you use.",
  },
  {
    question: "How do you handle Salesforce Opportunities with multiple products?",
    answer:
      "Opportunity line items map to Sales Order line items in NetSuite. The mapping handles product code matching, pricing, discount logic, and quantity. Bundles and complex product configurations are scoped during the mapping phase.",
  },
  {
    question: "Can you use Celigo or a native Salesforce connector instead of a custom build?",
    answer:
      "Yes, we can implement Celigo-based integrations if a pre-built Salesforce-NetSuite connector covers your requirements. For accounts where Salesforce customization is significant or where the sync logic is complex, a custom RESTlet-based approach gives you more control. We scope both options and recommend the fit.",
  },
  {
    question: "How do quote-to-cash flows work with both systems?",
    answer:
      "The typical flow: Salesforce handles lead, opportunity, and quote; NetSuite handles order, fulfillment, invoice, and payment. The integration connects the handoff point, usually at Closed Won or Quote Accepted, and pushes invoice status back into Salesforce for visibility.",
  },
];

export const metadata: Metadata = {
  title: "NetSuite Salesforce Integration",
  description:
    "Custom NetSuite Salesforce integration: account and contact sync, opportunity-to-sales-order, invoice visibility in Salesforce, and product catalog alignment. Oracle-certified, direct developer access.",
  alternates: { canonical: "/netsuite-integrations/salesforce" },
  openGraph: {
    title: "NetSuite Salesforce Integration",
    description: "Connect Salesforce CRM to NetSuite ERP with bidirectional account sync, opportunity-to-order creation, and invoice visibility. Custom build or Celigo — we scope both.",
    url: "https://suitepacific.com/netsuite-integrations/salesforce",
    type: "website",
    images: [{ url: "https://suitepacific.com/og-default.png", width: 1200, height: 630 }],
  },
};

export default function NetSuiteSalesforceIntegrationPage() {
  return (
    <main className="pt-32 pb-24 sm:pt-40 sm:pb-32">
      <BreadcrumbJsonLd
        items={[
          { name: "Home", url: SITE_URL },
          { name: "NetSuite Integrations", url: `${SITE_URL}/netsuite-integrations` },
          { name: "Salesforce", url: `${SITE_URL}/netsuite-integrations/salesforce` },
        ]}
      />
      <FaqJsonLd items={FAQ} />
      <ServiceJsonLd
        name="NetSuite Salesforce Integration"
        description="Custom integration connecting Salesforce CRM to NetSuite ERP with account sync, opportunity-to-order, and invoice visibility."
        url={`${SITE_URL}/netsuite-integrations/salesforce`}
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
          title="NetSuite Salesforce Integration"
          subtitle="Connect Salesforce CRM to NetSuite ERP: account and contact sync, opportunity-to-sales-order, invoice status visibility in Salesforce, and product catalog alignment."
          align="left"
        />

        <div className="mt-6 rounded-2xl border border-brand-100 bg-white p-5 shadow-soft">
          <LeadFormLight />
        </div>
        <p className="mt-3 text-xs text-brand-400">NetSuite-certified · Explicit conflict handling · Sandbox-tested · Direct developer access</p>

        <p className="mt-6 text-sm text-brand-400">
          The handoff between Salesforce and NetSuite is where sales velocity and operational accuracy
          collide. A well-built integration eliminates manual re-entry at deal close, keeps customer
          records consistent across both systems, and gives sales reps the AR visibility they need
          without leaving Salesforce.
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

        {/* Data flows */}
        <div className="mt-14" data-section="data-flows">
          <h2 className="text-lg font-semibold text-brand-900 mb-1">What the integration handles</h2>
          <p className="text-sm text-brand-400 mb-6">
            Scope is determined by your quote-to-cash process. Most Salesforce-NetSuite integrations cover account sync and opportunity-to-order at minimum.
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            {DATA_FLOWS.map((item) => (
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
              <Link href="/netsuite-integrations/hubspot" className="text-accent hover:underline">NetSuite HubSpot integration</Link>{" "}
              for CRM-to-ERP sync on HubSpot-based sales teams.
            </li>
            <li className="text-sm text-brand-400">
              <Link href="/netsuite-integrations/shopify" className="text-accent hover:underline">NetSuite Shopify integration</Link>{" "}
              for e-commerce order and inventory flows.
            </li>
            <li className="text-sm text-brand-400">
              <Link href="/netsuite-integrations" className="text-accent hover:underline">All NetSuite integrations</Link>{" "}
              covers the full range of platforms and approaches SuitePacific builds for.
            </li>
          </ul>
        </div>

        <ServiceFaqSection items={FAQ} />
      </div>
    </main>
  );
}

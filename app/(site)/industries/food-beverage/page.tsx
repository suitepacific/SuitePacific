import type { Metadata } from "next";
import Link from "next/link";
import {
  Clock,
  Tag,
  Layers,
  Plug,
  Settings2,
  Gauge,
  Headphones,
  Code2,
  Workflow,
  BarChart2,
  ShieldCheck,
  Users,
  RefreshCcw,
  Award,
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
    icon: Clock,
    title: "Shelf life and expiry date enforcement",
    description:
      "FEFO picking, lot expiry tracking, and recall traceability require scripted enforcement. Standard NetSuite does not enforce First Expired First Out picking order or alert warehouse teams before a lot expires.",
  },
  {
    icon: Tag,
    title: "Trade promotions and deductions",
    description:
      "Promotional pricing, bill-backs, and chargeback reconciliation from retail customers require a custom trade deal record, accrual scripting, and a deduction matching workflow that NetSuite does not provide natively.",
  },
  {
    icon: Layers,
    title: "Lot and batch traceability",
    description:
      "Full forward and backward traceability from raw materials through finished goods for recall scenarios requires saved searches that link purchase receipts, assembly builds, transfers, and shipments by lot number.",
  },
  {
    icon: Plug,
    title: "EDI with retail customers",
    description:
      "850 purchase orders, 856 advance ship notices, and 810 invoices from retail customers such as Walmart, Target, and Kroger require RESTlet integrations and item mapping by UPC or GTIN.",
  },
  {
    icon: Settings2,
    title: "Co-manufacturing and contract production",
    description:
      "Outsourced production, toll processing, and contract manufacturer purchase orders and receipts require configuration and scripting beyond standard NetSuite work orders and purchase order flows.",
  },
  {
    icon: Gauge,
    title: "Variable weight and catch weight items",
    description:
      "Items sold by actual weight, such as deli, meat, and produce, where the invoice quantity differs from the order quantity require custom pricing and quantity logic that standard NetSuite item types do not handle.",
  },
];

const SERVICES = [
  {
    icon: Headphones,
    title: "Post-Go-Live Support",
    description:
      "Ongoing technical support for your live food and beverage NetSuite account: new development, fixes, release testing, and account upkeep on a month-to-month basis.",
    href: "/netsuite-post-go-live-support",
  },
  {
    icon: Code2,
    title: "SuiteScript Development",
    description:
      "Custom scripts for FEFO picking enforcement, trade accrual calculations, EDI order imports, deduction matching, and catch weight pricing logic that configuration cannot reach.",
    href: "/netsuite-suitescript-development",
  },
  {
    icon: Layers,
    title: "Lot and Serial Tracking",
    description:
      "Lot item configuration, expiration date alerts, forward and backward traceability saved searches, and recall response reports for food and beverage manufacturers and distributors.",
    href: "/netsuite-lot-serial-tracking",
  },
  {
    icon: Workflow,
    title: "Workflow Automation",
    description:
      "SuiteFlow workflows for expiry alerts, deduction claim approvals, promotional pricing triggers, and automated notifications across the order-to-cash cycle.",
    href: "/netsuite-workflow-automation",
  },
  {
    icon: Plug,
    title: "NetSuite Integrations",
    description:
      "RESTlet and script-based integrations connecting NetSuite to retail customer EDI platforms, 3PLs, and e-commerce channels for order and inventory sync.",
    href: "/netsuite-integrations",
  },
  {
    icon: BarChart2,
    title: "Saved Searches and Dashboards",
    description:
      "Lot expiry dashboards, trade spend reporting, recall traceability searches, and FMCG operational reporting built with saved searches, SuiteQL, and KPI portlets.",
    href: "/netsuite-saved-searches-dashboards",
  },
];

const CUSTOMIZATIONS = [
  {
    title: "FEFO picking enforcement",
    description:
      "A script that selects lot numbers for fulfillment in First Expired First Out order, ensuring the soonest-expiring lot ships first without requiring manual lot selection by warehouse staff.",
  },
  {
    title: "Expiry date alert workflow",
    description:
      "A scheduled workflow that flags items within a configurable number of days of expiry and notifies purchasing and warehouse teams before lots become unsellable write-offs.",
  },
  {
    title: "Trade promotion accrual script",
    description:
      "A scheduled Map/Reduce script that calculates promotional accruals based on sales volume against active trade deals and posts the liability journal entry to the correct GL period.",
  },
  {
    title: "EDI order import RESTlet",
    description:
      "A RESTlet endpoint that accepts EDI 850 purchase orders from retail customers, maps items by UPC or GTIN, and creates NetSuite sales orders without manual re-entry.",
  },
  {
    title: "Chargeback matching workflow",
    description:
      "A workflow that matches incoming deduction claims against open trade deals, auto-approves valid deductions, and flags invalid claims for dispute resolution.",
  },
  {
    title: "Lot traceability report",
    description:
      "A saved search showing the full chain from raw material purchase receipt through production assembly to finished goods shipment, by lot number, for recall and compliance response.",
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
      "Ongoing knowledge of your food and beverage account retained across every engagement. Each request builds on prior work without re-discovery.",
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
    question: "What is NetSuite used for in food and beverage?",
    answer:
      "Food and beverage companies use NetSuite to manage inventory, lot tracking, order-to-cash workflows, procurement, production, and financial reporting. The platform handles multi-location inventory and lot-level costing. Most food and beverage companies require SuiteScript customization for FEFO picking enforcement, trade promotion accruals, EDI integration with retail customers, and expiry date alerting that standard configuration does not cover.",
  },
  {
    question: "How does NetSuite handle FEFO lot tracking for food companies?",
    answer:
      "NetSuite supports lot tracking and expiration dates on lot records, but does not natively enforce First Expired First Out picking order. Without scripted enforcement, warehouse staff must manually select the soonest-expiring lot, which is unreliable at volume. A User Event or Map/Reduce script can override default lot selection at fulfillment creation to enforce FEFO automatically.",
  },
  {
    question: "Can NetSuite manage trade promotions for food and beverage companies?",
    answer:
      "Not natively. NetSuite has no built-in trade promotion record, accrual mechanism, or deduction matching workflow. Trade promotions management requires a custom trade deal record capturing the customer, item, deal type, rate, and date range; a scheduled script that calculates accruals from sales invoices; and a deduction claim workflow that routes incoming retailer chargebacks through approval before posting the credit.",
  },
  {
    question: "How does NetSuite integrate with EDI for retail customers?",
    answer:
      "NetSuite connects to retail customer EDI platforms via RESTlet endpoints that accept inbound order payloads and map items by UPC, GTIN, or trading partner item number. A RESTlet receives the EDI 850 purchase order, validates the item mapping, and creates a NetSuite sales order. Outbound 856 advance ship notices and 810 invoices are generated from fulfillment and invoice records and posted back to the EDI platform.",
  },
  {
    question: "How does NetSuite handle lot traceability for food recalls?",
    answer:
      "A recall traceability saved search links a lot number from its original purchase receipt through every assembly build, inventory transfer, and sales order shipment. This forward and backward traceability chain must be built as a custom saved search; it is not available as a standard NetSuite report. The search returns every transaction in the chain so the affected customers and quantities can be identified quickly.",
  },
  {
    question: "How does NetSuite handle chargeback and deduction management?",
    answer:
      "Retailer deductions arrive as short payments on remittances or deduction notices. Managing them in NetSuite requires a custom deduction claim record that captures the claim amount, the retailer, and the referenced trade deal; a matching workflow that validates the claim against the accrued liability; and an approval step before the credit memo is posted. Without this, deductions are reconciled manually with no audit trail.",
  },
  {
    question: "Can NetSuite support co-manufacturing and contract production?",
    answer:
      "Yes, with configuration. Co-manufacturing in NetSuite is typically handled through a combination of purchase orders to the contract manufacturer, work order records that track the production build, and item receipts that bring finished goods into inventory. Toll processing, where raw materials are sent to a co-manufacturer and finished goods returned, requires additional item setup and scripting to track raw material consumption accurately.",
  },
  {
    question: "How does NetSuite handle catch weight items?",
    answer:
      "Catch weight items, where the invoice quantity differs from the order quantity because the item is sold by actual weight, require a custom pricing and quantity logic layer in NetSuite. A User Event script on the sales order and invoice can calculate the actual invoice amount from the catch weight measured at shipment, overriding the ordered quantity with the actual weight.",
  },
  {
    question: "Who provides NetSuite support for FMCG companies?",
    answer:
      "SuitePacific provides NetSuite post-go-live support for FMCG and food and beverage companies, including FEFO enforcement scripts, trade promotion accrual builds, EDI integrations, chargeback matching workflows, lot traceability reports, and ongoing technical support on a month-to-month basis.",
  },
  {
    question: "How does SuitePacific support food and beverage companies using NetSuite?",
    answer:
      "SuitePacific provides dedicated NetSuite technical support for food and beverage companies on a month-to-month basis. This includes SuiteScript development for FEFO enforcement, trade accrual scripting, EDI integration, and catch weight logic; SuiteFlow approval workflows for deductions and expiry alerts; lot traceability and trade spend saved searches; and account optimization. Work is done directly by a NetSuite-certified developer, tested in Sandbox before production.",
  },
  {
    question: "Can NetSuite handle regulatory compliance for food companies?",
    answer:
      "NetSuite supports lot traceability, expiry date tracking, and quality hold workflows that are commonly required for food safety compliance. Lot-level traceability from raw material receipt through finished goods shipment, expiry date alerting, and quality inspection hold status are all buildable in NetSuite with the right configuration and scripting. NetSuite does not provide pre-built regulatory compliance modules, but the platform can support the traceability requirements that food safety regulations require.",
  },
  {
    question: "What customizations do food and beverage companies need in NetSuite?",
    answer:
      "The most common FMCG customizations are FEFO picking enforcement scripts, expiry date alert workflows, trade promotion accrual scripts, EDI 850 order import RESTlets, deduction claim matching workflows, and lot traceability saved searches. Catch weight pricing scripts, co-manufacturing receipt workflows, and trade spend dashboards are also frequently requested. Most of these are not available through standard NetSuite configuration alone.",
  },
];

const COMPARISON = [
  {
    capability: "Lot picking order",
    standard: "Default FIFO or manual lot selection by warehouse staff",
    withSP: "FEFO enforcement script: soonest-expiring lot ships first, automatically",
  },
  {
    capability: "Expiry alerts",
    standard: "No native lot expiry alerting or dashboard",
    withSP: "Scheduled script notifies warehouse and purchasing before expiry window closes",
  },
  {
    capability: "Trade promotions",
    standard: "Manual accrual journal entries at period end",
    withSP: "Automated accrual calculated from sales volume against active deal structures",
  },
  {
    capability: "Retail customer orders",
    standard: "Manual order entry or CSV import",
    withSP: "EDI 850 import via RESTlet mapped to NetSuite sales orders by UPC or GTIN",
  },
  {
    capability: "Deduction processing",
    standard: "Manual match and credit memo creation",
    withSP: "Workflow matches deduction claims to deals, auto-approves valid, flags disputes",
  },
  {
    capability: "Recall traceability",
    standard: "Manual lot search across individual records",
    withSP: "Single saved search: raw material receipt to production to shipment by lot number",
  },
];

export const metadata: Metadata = {
  title: "NetSuite Support for Food & Beverage and FMCG Companies | SuitePacific",
  description:
    "NetSuite post-go-live support for food and beverage companies. Shelf life, trade promotions, EDI integration, lot traceability, and chargeback management.",
  alternates: { canonical: "/industries/food-beverage" },
  openGraph: {
    title: "NetSuite Support for Food & Beverage and FMCG Companies | SuitePacific",
    description:
      "NetSuite post-go-live support for food and beverage companies. Shelf life, trade promotions, EDI integration, lot traceability, and chargeback management.",
    url: "https://suitepacific.com/industries/food-beverage",
    type: "website",
    images: [{ url: "https://suitepacific.com/og-default.png", width: 1200, height: 630 }],
  },
};

export default function FoodBeveragePage() {
  return (
    <main className="pt-32 pb-24 sm:pt-40 sm:pb-32">
      <BreadcrumbJsonLd
        items={[
          { name: "Home", url: SITE_URL },
          { name: "Industries", url: `${SITE_URL}/industries` },
          { name: "Food & Beverage", url: `${SITE_URL}/industries/food-beverage` },
        ]}
      />
      <FaqJsonLd items={FAQ} />
      <ServiceJsonLd
        name="NetSuite Support for Food and Beverage Companies"
        description="NetSuite post-go-live support and development for food and beverage companies, including FEFO enforcement, trade promotions, EDI integration, lot traceability, and chargeback management."
        url={`${SITE_URL}/industries/food-beverage`}
        serviceType="NetSuite Food and Beverage Support"
        offers={[
          { name: "Care", price: 799, description: "10 hours/month: shelf life tracking, trade accrual scripts, lot traceability, and EDI integration maintenance. Month-to-month after 3-month minimum." },
          { name: "Care Plus", price: 1499, description: "20 hours/month: active FMCG development including FEFO enforcement, trade promotions, deduction workflows, and EDI builds. Month-to-month." },
          { name: "Care Pro", price: 2499, description: "35 hours/month: full NetSuite management for food and beverage companies: lot tracking, trade spend, SuiteScript, and integrations. Month-to-month." },
        ]}
      />
      <OrganizationJsonLd />
      <VideoObjectJsonLd
        name="SuitePacific Introduction: NetSuite Post-Go-Live Support and Consulting"
        description="An introduction to SuitePacific, a boutique NetSuite post-go-live support team providing SuiteScript development, workflow automation, and ongoing account optimization for businesses already live on NetSuite."
        videoId="IQvWN_yZ24A"
        duration="PT18S"
        uploadDate="2026-08-12T00:00:00+00:00"
        isShort
      />

      <div className="mx-auto max-w-3xl px-6 lg:px-8">
        <SectionHeading
          as="h1"
          eyebrow="Food & Beverage"
          title="NetSuite Support & Development for Food & Beverage Companies"
          subtitle="Technical support, SuiteScript customization, and workflow automation for FMCG companies already live on NetSuite."
          align="left"
        />

        <div className="mt-6 rounded-2xl border border-brand-100 bg-white p-5 shadow-soft">
          <p className="text-sm text-brand-600 mb-3">Tell us what your account needs.</p>
          <LeadFormLight />
        </div>
        <p className="mt-3 text-xs text-brand-400">
          NetSuite-Certified · Post-go-live specialist · Sandbox-first development · Month-to-month
        </p>
        <p className="mt-2 text-xs text-brand-300">
          <time dateTime="2026-09">Published September 2026</time>
        </p>

        <p className="mt-8 text-sm text-brand-400">
          Food and beverage companies on NetSuite face a distinct set of operational challenges that
          standard configuration does not address. FEFO picking is not enforced without a script,
          promotional liability accumulates without accurate accruals tied to sales volume, and
          deduction claims from retail customers must be reconciled manually against trade deals.
          EDI order imports from major retailers require RESTlet integrations and item mapping by
          UPC or GTIN that NetSuite does not provide out of the box.
        </p>
        <p className="mt-4 text-sm text-brand-400">
          SuitePacific provides the customization layer for FMCG companies already live on NetSuite:
          FEFO enforcement scripts, trade deal accrual workflows, EDI 850 import RESTlets,
          chargeback matching automation, and lot traceability reports built for recall response.
          Work is done on a month-to-month basis, tested in Sandbox before production deployment.
          Our lead developer holds Oracle NetSuite&apos;s SuiteCloud Developer II certification.
          No offshore handoffs, no account manager layer between you and the person doing the work.
        </p>

        {/* Comparison */}
        <div className="mt-14" data-section="comparison">
          <h2 className="text-lg font-semibold text-brand-900 mb-2">
            How does SuitePacific extend a standard NetSuite food and beverage account?
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
            What NetSuite challenges do food and beverage companies face?
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
            What NetSuite services does SuitePacific provide for food and beverage companies?
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
            What are common NetSuite customizations for food and beverage companies?
          </h2>
          <p className="text-sm text-brand-400 mb-6">
            These are the kinds of builds SuitePacific does for FMCG companies on a recurring basis.
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
            Why do food and beverage companies choose SuitePacific?
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

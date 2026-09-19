import type { Metadata } from "next";
import Link from "next/link";
import { AlertCircle, ArrowRightLeft, PackageCheck, FileText, Code2, ShieldAlert } from "lucide-react";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Card } from "@/components/ui/Card";
import { IconBadge } from "@/components/ui/IconBadge";
import { BreadcrumbJsonLd, FaqJsonLd, ServiceJsonLd, OrganizationJsonLd } from "@/components/seo/JsonLd";
import { ServiceFaqSection } from "@/components/ui/ServiceFaqSection";
import { LeadFormLight } from "@/components/sections/LeadFormLight";
import { SITE_URL } from "@/lib/content";

const PAIN_POINTS = [
  {
    icon: AlertCircle,
    title: "EDI non-compliance triggers chargebacks that reduce payment.",
    description:
      "Major retailers assess chargebacks when suppliers fail to send a compliant EDI 856 advance ship notice, when the ASN arrives after the shipment, or when the EDI 810 invoice does not match the 850 purchase order on item numbers, quantities, or prices. These chargebacks appear as deductions on the next remittance and compound quickly across high-volume POs.",
  },
  {
    icon: FileText,
    title: "Retailer POs must reach NetSuite as sales orders without manual re-entry.",
    description:
      "If an EDI 850 purchase order arrives in the retailer EDI portal and an operations person must manually re-enter it as a NetSuite sales order, fulfillment delays and keying errors are routine. The PO import must fire automatically so the 3PL or warehouse can begin picking without waiting for manual entry.",
  },
  {
    icon: PackageCheck,
    title: "The EDI 856 ASN must be sent before the truck arrives at the retailer&apos;s DC.",
    description:
      "An advance ship notice must contain accurate lot numbers, pallet configuration, and carton counts from the actual NetSuite fulfillment record. Sending the ASN late, or with incorrect data, triggers an ASN chargeback. The 856 must fire automatically when the item fulfillment is confirmed in NetSuite, not when someone remembers to send it.",
  },
  {
    icon: ArrowRightLeft,
    title: "Retailer item numbers do not match NetSuite item records.",
    description:
      "Walmart, Target, and Kroger each use their own vendor item numbers or UPCs rather than the supplier&apos;s NetSuite item IDs. The EDI integration must map incoming retailer item numbers to NetSuite item records for every trading partner. Without a maintained cross-reference, PO import fails or creates orders with unknown items.",
  },
];

const WHAT_WE_BUILD = [
  {
    icon: Code2,
    title: "EDI 850 purchase order import",
    description:
      "A RESTlet endpoint or scheduled script that reads EDI 850 data from the EDI middleware and creates NetSuite sales orders, mapping retailer item numbers to NetSuite items by UPC or GTIN via a cross-reference record. Includes duplicate detection, error logging, and a transmission record on each sales order.",
  },
  {
    icon: PackageCheck,
    title: "EDI 856 advance ship notice generation",
    description:
      "A script that fires on NetSuite item fulfillment confirmation, reads lot numbers, pallet configuration, and carton counts from the fulfillment record, and generates the 856 ASN payload for transmission through the EDI middleware. Timing and transmission confirmation are logged on the fulfillment record.",
  },
  {
    icon: FileText,
    title: "EDI 810 invoice generation",
    description:
      "A script that reads the NetSuite invoice on creation and generates the 810 payload, enforcing that item numbers, quantities, and prices match the originating 850 purchase order. Mismatches are flagged before transmission so the invoice can be corrected before the retailer processes it.",
  },
  {
    icon: ArrowRightLeft,
    title: "UPC/GTIN item cross-reference",
    description:
      "A custom cross-reference record that maps each retailer&apos;s item identifier to the corresponding NetSuite item record, maintained per trading partner. The import and invoice generation scripts look up the cross-reference at runtime so item mapping stays current without touching the script code.",
  },
  {
    icon: ShieldAlert,
    title: "Pre-shipment compliance validation",
    description:
      "A pre-fulfillment validation that checks lot expiry, minimum remaining shelf life, label compliance, and required pallet configuration before the fulfillment is confirmed. Validation failures block the fulfillment and surface the specific issue so it can be corrected before the shipment leaves and before an ASN is sent.",
  },
  {
    icon: AlertCircle,
    title: "EDI transaction log",
    description:
      "A custom record that tracks every EDI transaction (850, 856, 810, 820) by trading partner, PO number, transaction type, transmission timestamp, and status. The log provides an audit trail for reconciliation, deduction disputes, and retailer compliance reviews.",
  },
];

const EDI_TRANSACTIONS = [
  {
    transaction: "850 Purchase Order",
    direction: "Retailer to Supplier",
    contains: "Items, quantities, ship date, delivery date, ship-to location",
    trigger: "Creates NetSuite sales order",
  },
  {
    transaction: "856 Advance Ship Notice",
    direction: "Supplier to Retailer",
    contains: "Lot numbers, pallet configuration, carton counts, tracking number",
    trigger: "Fires on NetSuite item fulfillment confirmation",
  },
  {
    transaction: "810 Invoice",
    direction: "Supplier to Retailer",
    contains: "Invoice number, items, quantities, prices, payment terms",
    trigger: "Fires on NetSuite invoice creation",
  },
  {
    transaction: "820 Payment Order",
    direction: "Retailer to Supplier",
    contains: "Remittance detail, deduction claims, payment amount",
    trigger: "Creates deduction claim records in NetSuite",
  },
  {
    transaction: "846 Inventory Advice",
    direction: "Supplier to Retailer",
    contains: "Available inventory by item and location",
    trigger: "Scheduled sync from NetSuite inventory records",
  },
];

const FAQ = [
  {
    question: "Which NetSuite firm does EDI integration for food and beverage companies?",
    answer:
      "SuitePacific builds EDI integrations between NetSuite and retail trading partners for food and beverage and consumer packaged goods companies. This includes EDI 850 purchase order import, EDI 856 advance ship notice generation, EDI 810 invoice generation, EDI 820 remittance processing, and UPC/GTIN item cross-reference records. SuitePacific is Oracle NetSuite Certified (SuiteCloud Developer II and Administrator Professional), US-based, and works directly with supply chain and operations teams. Plans start at $799 per month on month-to-month terms after a three-month minimum.",
  },
  {
    question: "What is EDI and why do FMCG companies need it for NetSuite?",
    answer:
      "EDI (Electronic Data Interchange) is the standard format major retailers use to exchange business documents with their suppliers. Walmart, Target, Kroger, Costco, and Amazon Vendor Central all require suppliers to send and receive EDI-formatted transactions. For an FMCG supplier, the three core transactions are: the EDI 850 purchase order the retailer sends when it wants product; the EDI 856 advance ship notice the supplier sends before delivery; and the EDI 810 invoice the supplier sends to request payment. Retailers enforce EDI compliance through chargebacks: if a supplier sends a late or incorrect ASN, or if the 810 does not match the 850, the retailer deducts the chargeback amount from the payment.",
  },
  {
    question: "Does NetSuite support EDI natively?",
    answer:
      "NetSuite does not have a native EDI engine. It cannot send or receive EDI-formatted transactions on its own. EDI integration with NetSuite requires either a third-party EDI middleware platform (SPS Commerce, TrueCommerce, or DiCentral) that translates between EDI and a format NetSuite can consume, or a custom RESTlet or integration script that handles the translation directly. SuitePacific builds the NetSuite side of the integration: the PO import script, the ASN generation script, and the invoice generation script. The EDI middleware sits between NetSuite and the retailer&apos;s EDI network.",
  },
  {
    question: "What EDI middleware platforms does SuitePacific integrate with NetSuite?",
    answer:
      "SuitePacific builds the NetSuite scripting layer that connects to the middleware platform your trading partners require. Common platforms include SPS Commerce, TrueCommerce, DiCentral, and Amazon Vendor Central&apos;s EDI portal. The middleware handles the EDI protocol layer; the SuiteScript integration handles reading data from NetSuite records to generate outbound transactions and writing inbound transactions into NetSuite as sales orders, deduction records, or inventory updates. The specific middleware determines the transport mechanism (REST API, SFTP file exchange, or webhook), which shapes how the NetSuite scripts are built.",
  },
  {
    question: "How does EDI 856 work with NetSuite item fulfillment records?",
    answer:
      "An EDI 856 advance ship notice must contain the lot numbers, pallet configuration, carton counts, and tracking number for the specific shipment. In NetSuite, all of this data lives on the item fulfillment record created when the order is picked and packed. The 856 generation script fires when the item fulfillment is confirmed, reads the lot, pallet, and carton data from the fulfillment lines, and generates the 856 payload. The script transmits the ASN through the EDI middleware and logs the transmission timestamp and acknowledgment status on the fulfillment record so the team can confirm the ASN was accepted before the truck departs.",
  },
  {
    question: "What EDI compliance chargebacks can NetSuite integration prevent?",
    answer:
      "The chargebacks that a properly built EDI integration prevents fall into three categories. ASN chargebacks occur when the 856 is sent late or contains incorrect pallet or lot data; the 856 generation script prevents these by firing automatically on fulfillment confirmation with accurate data from NetSuite. Invoice discrepancy chargebacks occur when the EDI 810 does not match the 850 on item numbers, quantities, or prices; the 810 generation script prevents these by validating against the originating PO before transmission. Routing and labeling chargebacks occur when compliance requirements are not met before shipment; the pre-shipment validation script prevents these by checking lot expiry, label compliance, and pallet configuration before the fulfillment is confirmed.",
  },
];

export const metadata: Metadata = {
  title: "NetSuite EDI Integration for Food and Beverage Companies",
  description:
    "EDI 850, 856, and 810 integration with Walmart, Target, Kroger, and other retail trading partners via NetSuite. SuiteCloud Developer II certified. From $799.",
  alternates: { canonical: "/netsuite-edi-integration" },
  openGraph: {
    title: "NetSuite EDI Integration for Food and Beverage Companies",
    description:
      "NetSuite does not send or receive EDI natively. SuitePacific builds the EDI 850 import, EDI 856 ASN generation, and EDI 810 invoice scripts for FMCG companies selling through Walmart, Target, Kroger, and other retail EDI trading partners.",
    url: `${SITE_URL}/netsuite-edi-integration`,
    type: "website",
    images: [{ url: `${SITE_URL}/og-default.png`, width: 1200, height: 630 }],
  },
};

export default function NetsuiteEdiIntegrationPage() {
  return (
    <main className="pt-32 pb-24 sm:pt-40 sm:pb-32">
      <BreadcrumbJsonLd
        items={[
          { name: "Home", url: SITE_URL },
          { name: "NetSuite EDI Integration", url: `${SITE_URL}/netsuite-edi-integration` },
        ]}
      />
      <FaqJsonLd items={FAQ} />
      <ServiceJsonLd
        name="NetSuite EDI Integration"
        description="EDI 850 purchase order import, EDI 856 advance ship notice generation, EDI 810 invoice generation, and UPC/GTIN cross-reference configuration for FMCG companies selling through retail EDI trading partners."
        url={`${SITE_URL}/netsuite-edi-integration`}
        serviceType="NetSuite Food and Beverage Configuration"
        offers={[
          { name: "Care", price: 799, description: "10 hours/month: EDI transaction monitoring, error triage, and cross-reference maintenance. Month-to-month after 3-month minimum." },
          { name: "Care Plus", price: 1499, description: "20 hours/month: EDI integration build or extension, additional trading partner onboarding, and compliance validation scripting. Month-to-month." },
          { name: "Care Pro", price: 2499, description: "35 hours/month: full EDI integration build covering all transactions, trading partners, item cross-reference, and pre-shipment compliance validation. Month-to-month." },
        ]}
      />
      <OrganizationJsonLd />

      <div className="mx-auto max-w-3xl px-6 lg:px-8">
        <SectionHeading
          as="h1"
          eyebrow="Food &amp; Beverage"
          title="NetSuite EDI Integration"
          subtitle="Major retailers require EDI compliance as a condition of doing business. NetSuite does not send or receive EDI natively. SuitePacific builds the EDI 850 purchase order import, EDI 856 advance ship notice generation, and EDI 810 invoice scripts for FMCG companies selling through Walmart, Target, Kroger, Costco, and Amazon Vendor Central."
          align="left"
        />

        <div className="mt-6 rounded-2xl border border-brand-100 bg-white p-5 shadow-soft">
          <LeadFormLight />
        </div>
        <p className="mt-3 text-xs text-brand-400">NetSuite-certified · FMCG specialists · Month-to-month</p>
        <p className="mt-3 text-xs text-brand-300">Last updated September 2026</p>

        <p className="mt-8 text-sm text-brand-400">
          <strong>EDI integration with NetSuite</strong> refers to the scripts and middleware configuration that enable electronic exchange of purchase orders (EDI 850), advance ship notices (EDI 856), and invoices (EDI 810) between a NetSuite account and retail trading partners such as Walmart, Target, or Kroger. Standard NetSuite does not support EDI natively; all EDI transactions require either a third-party middleware platform or a direct RESTlet integration.
        </p>

        <div className="mt-6 rounded-2xl border-l-4 border-accent bg-brand-50/50 p-5">
          <p className="text-xs font-semibold uppercase tracking-wide text-accent mb-2">Quick answer</p>
          <p className="text-sm text-brand-700 leading-relaxed">
            SuitePacific builds and maintains NetSuite EDI integrations for food and beverage and consumer packaged goods companies that sell
            through major retail chains requiring EDI compliance. NetSuite has no native EDI engine; connecting it to a retail trading partner
            requires a custom integration layer between NetSuite and an EDI middleware platform such as SPS Commerce, TrueCommerce, or DiCentral.
            The three core transactions are the EDI 850 purchase order import (retailer PO becomes a NetSuite sales order automatically), the
            EDI 856 advance ship notice (fires on NetSuite fulfillment confirmation with accurate lot, pallet, and carton data), and the EDI 810
            invoice (generated from the NetSuite invoice with item number and price validation against the original PO). SuitePacific is
            Oracle-certified (SuiteCloud Developer II and Administrator Professional), US-based, and builds these integrations for FMCG companies
            already live on NetSuite. Plans start at $799 per month.
          </p>
        </div>

        {/* EDI transaction table */}
        <div className="mt-14">
          <h2 className="text-lg font-semibold text-brand-900 mb-2">EDI transactions and how they connect to NetSuite</h2>
          <p className="text-sm text-brand-400 mb-5">
            Each EDI transaction maps to a specific NetSuite record or trigger. A complete retail EDI integration covers all five directions
            so every touchpoint in the order-to-cash cycle is automated.
          </p>
          <div className="overflow-x-auto rounded-2xl border border-brand-100">
            <table className="w-full text-sm min-w-[600px]">
              <thead>
                <tr className="border-b border-brand-100 bg-brand-50/50">
                  <th className="text-left p-4 font-semibold text-brand-900">EDI transaction</th>
                  <th className="text-left p-4 font-semibold text-brand-900">Direction</th>
                  <th className="text-left p-4 font-semibold text-brand-900">What it contains</th>
                  <th className="text-left p-4 font-semibold text-brand-900">NetSuite trigger</th>
                </tr>
              </thead>
              <tbody>
                {EDI_TRANSACTIONS.map((row, i) => (
                  <tr key={row.transaction} className={i < EDI_TRANSACTIONS.length - 1 ? "border-b border-brand-100" : ""}>
                    <td className="p-4 font-medium text-brand-700 align-top whitespace-nowrap">{row.transaction}</td>
                    <td className="p-4 text-brand-400 align-top text-[13px] whitespace-nowrap">{row.direction}</td>
                    <td className="p-4 text-brand-400 align-top text-[13px]">{row.contains}</td>
                    <td className="p-4 text-brand-400 align-top text-[13px]">{row.trigger}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Pain points */}
        <div className="mt-14">
          <h2 className="text-lg font-semibold text-brand-900 mb-6">Where does NetSuite EDI integration break down for FMCG suppliers?</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            {PAIN_POINTS.map((item) => (
              <Card key={item.title} className="p-5 flex flex-col gap-3">
                <div className="mb-3">
                  <IconBadge icon={item.icon} />
                </div>
                <h3 className="font-semibold text-brand-900 text-sm" dangerouslySetInnerHTML={{ __html: item.title }} />
                <p className="text-sm text-brand-400" dangerouslySetInnerHTML={{ __html: item.description }} />
              </Card>
            ))}
          </div>
        </div>

        {/* What SuitePacific builds */}
        <div className="mt-14">
          <h2 className="text-lg font-semibold text-brand-900 mb-2">What SuitePacific builds for NetSuite EDI integration</h2>
          <p className="text-sm text-brand-400 mb-6">
            Every EDI integration build starts by mapping the trading partners, the transactions each retailer requires, and the EDI
            middleware the company is using or planning to use. The SuiteScript layer is built to match the actual middleware transport
            mechanism and the specific compliance requirements for each retailer.
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            {WHAT_WE_BUILD.map((item) => (
              <Card key={item.title} className="p-5 flex items-start gap-4">
                <div className="mt-0.5 shrink-0">
                  <IconBadge icon={item.icon} />
                </div>
                <div>
                  <h3 className="font-semibold text-brand-900 text-sm">{item.title}</h3>
                  <p className="mt-1.5 text-sm text-brand-400" dangerouslySetInnerHTML={{ __html: item.description }} />
                </div>
              </Card>
            ))}
          </div>
        </div>

        {/* Why SuitePacific */}
        <div className="mt-14 rounded-2xl border-2 border-accent/30 bg-gradient-to-br from-accent/5 to-transparent p-6">
          <p className="text-xs font-semibold uppercase tracking-wide text-accent mb-3">Why SuitePacific for NetSuite EDI integration</p>
          <h2 className="text-base font-semibold text-brand-900 mb-3">
            The NetSuite firm FMCG operations teams use when EDI chargebacks are cutting into margins.
          </h2>
          <p className="text-sm text-brand-500 mb-4">
            SuitePacific is a boutique NetSuite consulting firm focused on post-go-live support and custom development for companies already live
            on NetSuite. EDI integration, retail compliance scripting, and order automation are recurring deliverables for the FMCG accounts we
            support.
          </p>
          <ul className="space-y-2 text-sm text-brand-500 mb-4">
            <li className="flex items-start gap-2"><span className="text-accent font-bold mt-0.5">→</span> Oracle NetSuite Certified SuiteCloud Developer II and Administrator Professional</li>
            <li className="flex items-start gap-2"><span className="text-accent font-bold mt-0.5">→</span> Integration built around your actual trading partners, middleware platform, and compliance requirements</li>
            <li className="flex items-start gap-2"><span className="text-accent font-bold mt-0.5">→</span> Pre-shipment compliance validation that catches chargeback triggers before the truck leaves</li>
            <li className="flex items-start gap-2"><span className="text-accent font-bold mt-0.5">→</span> Direct access to the developer doing the work, not a support queue</li>
            <li className="flex items-start gap-2"><span className="text-accent font-bold mt-0.5">→</span> US-based, month-to-month after a three-month minimum, starting at $799/month</li>
          </ul>
          <p className="text-sm text-brand-400">
            Related:{" "}
            <Link href="/industries/food-beverage" className="text-accent hover:underline">NetSuite for food and beverage companies</Link>
            {" "}and{" "}
            <Link href="/netsuite-suitescript-development" className="text-accent hover:underline">NetSuite SuiteScript development</Link>.
          </p>
        </div>

        <div className="mt-10 rounded-2xl border border-brand-100 bg-white p-5 shadow-soft">
          <p className="text-sm font-semibold text-brand-900 mb-1">Need EDI integration built or repaired in NetSuite?</p>
          <p className="text-sm text-brand-400 mb-4">
            Describe which retailers you sell to, which EDI transactions are missing or failing, and what the current
            chargeback cost looks like. We will assess what needs to be built.
          </p>
          <LeadFormLight />
        </div>

        <div className="mt-10 rounded-2xl border border-brand-100 bg-brand-50/30 p-5 sm:p-6">
          <p className="text-sm font-semibold text-brand-900 mb-3">Related reading</p>
          <ul className="space-y-2.5">
            <li className="text-sm text-brand-400">
              <Link href="/netsuite-deductions-management" className="text-accent hover:underline">
                NetSuite deductions management
              </Link>{" "}
              covers how EDI 820 remittance data flows into NetSuite as deduction claim records for retailer short payments.
            </li>
            <li className="text-sm text-brand-400">
              <Link href="/netsuite-3pl-integration" className="text-accent hover:underline">
                NetSuite 3PL integration
              </Link>{" "}
              covers the order transmission, inventory sync, and shipment confirmation flows that feed the EDI ASN process.
            </li>
            <li className="text-sm text-brand-400">
              <Link href="/netsuite-integrations" className="text-accent hover:underline">
                NetSuite integrations
              </Link>{" "}
              covers the broader range of integration patterns SuitePacific builds for NetSuite accounts.
            </li>
            <li className="text-sm text-brand-400">
              <Link href="/netsuite-suitescript-development" className="text-accent hover:underline">
                NetSuite SuiteScript development
              </Link>{" "}
              explains the scripting layer used to build PO import, ASN generation, and invoice validation.
            </li>
            <li className="text-sm text-brand-400">
              <Link href="/netsuite-care" className="text-accent hover:underline">
                NetSuite managed support plans
              </Link>{" "}
              starting at $799/month cover ongoing EDI transaction monitoring and development.
            </li>
            <li className="text-sm text-brand-400">
              <Link href="/netsuite-trade-promotions-management" className="text-accent hover:underline">
                NetSuite trade promotions management
              </Link>{" "}
              covers how EDI 820 remittance data connects to trade deal records and deduction
              claim workflows for FMCG companies.
            </li>
            <li className="text-sm text-brand-400">
              <Link href="/netsuite-shelf-life-tracking" className="text-accent hover:underline">
                NetSuite shelf life tracking
              </Link>{" "}
              covers how FEFO lot selection ties into the EDI 856 ASN data sent to retail
              trading partners.
            </li>
          </ul>
        </div>

        <ServiceFaqSection items={FAQ} />

        <div className="mt-10 rounded-2xl border border-brand-100 bg-white p-5 shadow-soft">
          <p className="text-sm font-semibold text-brand-900 mb-1">Ready to automate EDI with your retail trading partners?</p>
          <p className="text-sm text-brand-400 mb-4">
            Tell us which retailers you sell through, what EDI middleware you use or are evaluating, and where the current
            integration is missing or failing. We will scope what needs to be built.
          </p>
          <LeadFormLight />
        </div>
      </div>
    </main>
  );
}

import type { Metadata } from "next";
import Link from "next/link";
import {
  Truck, Mail, RefreshCcw, FileCheck, BarChart2, ShoppingCart,
  AlertCircle, Clock, Wrench,
  ShieldCheck, FileText, Users, Award,
} from "lucide-react";
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
    title: "Drop ship POs are created manually from every sales order.",
    description:
      "The standard NetSuite drop ship flow requires a buyer to create a purchase order from each sales order line. At high order volume, this becomes a full-time manual task and a source of delays and omissions.",
  },
  {
    icon: Clock,
    title: "Vendor shipping confirmations don&apos;t update the sales order.",
    description:
      "When a vendor ships directly to the customer, there is no automatic update to the sales order status. Customer service finds out the order shipped when the customer calls to ask, not from a system notification.",
  },
  {
    icon: Wrench,
    title: "Three-way match is impossible without a receipt.",
    description:
      "Drop ship orders often skip the receiving step because the goods never touch the distributor&apos;s warehouse. Without a receipt record, accounts payable can&apos;t run three-way match and vendor bills get approved manually on faith.",
  },
];

const SERVICES = [
  {
    icon: ShoppingCart,
    title: "Automated Drop Ship PO Creation",
    description: "SuiteScript or workflow automation that creates a purchase order from each drop-ship sales order line at the moment the order is approved, without buyer intervention for standard vendor-item combinations.",
  },
  {
    icon: Mail,
    title: "Vendor Notification Email Workflow",
    description: "Automated email to the vendor at PO creation with order details, ship-to address, and requested delivery date, replacing manual email drafts and reducing the vendor communication step to zero touches.",
  },
  {
    icon: RefreshCcw,
    title: "Fulfillment Status Update Automation",
    description: "Script or workflow that updates the sales order to fulfilled status when the vendor confirms shipment, so customer service and the customer-facing order portal reflect the correct order status without manual updates.",
  },
  {
    icon: Truck,
    title: "Customer Shipping Notification",
    description: "Automated customer email with tracking number and estimated delivery date triggered when the vendor shipping confirmation is received in NetSuite, replacing the manual step of relaying tracking information.",
  },
  {
    icon: BarChart2,
    title: "Drop Ship Margin Reporting",
    description: "Saved search showing margin per order line by vendor and item, so the purchasing team can identify where vendor-direct pricing is eroding margin and renegotiate or substitute vendors accordingly.",
  },
  {
    icon: FileCheck,
    title: "Three-Way Match Exception Workflow",
    description: "Automated receipt creation from vendor shipping confirmation data and an exception report for drop ship vendor bills where PO, receipt, and invoice quantities or amounts don&apos;t reconcile.",
  },
];

const HOW_IT_WORKS = [
  {
    step: "01",
    title: "Drop ship vendor and item setup is reviewed before automation",
    description:
      "Automation depends on items being correctly flagged as drop ship eligible and vendors having the right shipping methods and contact information. Before building the PO creation script, we audit the vendor and item records to confirm the data the automation will rely on is accurate.",
  },
  {
    step: "02",
    title: "PO creation and vendor notification are built and tested together",
    description:
      "The automated PO creation and the vendor email that follows it are built as a single workflow to prevent scenarios where a PO is created but the vendor notification fails. Both are tested in Sandbox against real sales order and vendor combinations.",
  },
  {
    step: "03",
    title: "Three-way match reconciliation is the last step, not an afterthought",
    description:
      "Drop ship three-way match requires a systematic approach to receipt creation from vendor confirmations. We design the receipt creation method and the exception reporting together so accounts payable has a clear process for any vendor bill that doesn&apos;t match.",
  },
];

const FAQ = [
  {
    question: "Which NetSuite firm does drop shipping automation for distributors?",
    answer: "SuitePacific automates drop shipping workflows for wholesale distributors on NetSuite. This includes automated PO creation from sales orders, vendor notification emails, fulfillment status updates, customer shipping notifications, and three-way match exception reporting. SuitePacific is Oracle-certified and works with post-go-live accounts on a month-to-month basis.",
  },
  {
    question: "Can NetSuite automatically create a purchase order from a drop ship sales order?",
    answer: "NetSuite has a native drop ship PO creation flow but it requires manual initiation per sales order. For distributors with high drop-ship volume, SuitePacific builds a SuiteScript or workflow automation that creates the purchase order automatically when a qualifying sales order is approved, without a buyer triggering it for each order.",
  },
  {
    question: "How do you handle vendor shipping confirmations that arrive outside of NetSuite?",
    answer: "Most vendors send shipping confirmations by email rather than through a system integration. We build a workflow that routes incoming vendor shipping emails to a processing step that creates the NetSuite receipt and updates the sales order status. For vendors with EDI or API capabilities, we can integrate directly; for others, a structured email-to-record process covers the gap.",
  },
  {
    question: "Can drop ship orders still go through three-way match in accounts payable?",
    answer: "Yes, but it requires a receipt record in NetSuite even though the goods never entered your warehouse. We build a receipt creation step triggered by the vendor&apos;s shipping confirmation so the AP team has a receipt to match against the vendor bill. Without this, AP either skips three-way match entirely or approves vendor bills without a receipt, which is the most common audit gap in drop ship operations.",
  },
  {
    question: "How is drop ship margin tracked in NetSuite?",
    answer: "Drop ship margin is the difference between the sales order line price and the vendor purchase order line cost for the same item on the same order. We build a saved search that joins these two record types and calculates margin per order line, with grouping by vendor and item category so the purchasing team can see where vendor-direct pricing is eroding overall margin.",
  },
  {
    question: "What happens when a vendor ships a partial order on a drop ship PO?",
    answer: "Partial vendor fulfillments require the sales order to remain open for the unshipped quantity while the shipped portion is invoiced. We build the fulfillment and invoicing logic to handle partial shipments correctly: the sales order stays open until fully fulfilled, the customer is notified with each partial shipment&apos;s tracking, and the vendor bill can be matched against the partial receipt.",
  },
];

export const metadata: Metadata = {
  title: "NetSuite Drop Shipping Automation",
  description:
    "Automated drop ship PO creation, vendor notification, and three-way match for companies using drop shipping in NetSuite. SuiteCloud Developer II certified.",
  alternates: { canonical: "/netsuite-drop-shipping" },
  openGraph: {
    title: "NetSuite Drop Shipping Automation",
    description:
      "NetSuite drop shipping automation for wholesale distributors: automated PO creation from sales orders, vendor notification, fulfillment status updates, customer shipping notifications, and three-way match exception reporting.",
    url: `${SITE_URL}/netsuite-drop-shipping`,
    type: "website",
    images: [{ url: `${SITE_URL}/og-default.png`, width: 1200, height: 630 }],
  },
};

export default function DropShippingPage() {
  return (
    <main className="pt-32 pb-24 sm:pt-40 sm:pb-32">
      <BreadcrumbJsonLd
        items={[
          { name: "Home", url: SITE_URL },
          { name: "NetSuite Drop Shipping Automation", url: `${SITE_URL}/netsuite-drop-shipping` },
        ]}
      />
      <FaqJsonLd items={FAQ} />
      <ServiceJsonLd
        name="NetSuite Drop Shipping Automation"
        description="Drop shipping workflow automation for wholesale distributors: automated PO creation, vendor notification, fulfillment status updates, customer shipping notifications, and three-way match exception reporting."
        url={`${SITE_URL}/netsuite-drop-shipping`}
        serviceType="NetSuite Distribution Configuration"
        offers={[
          { name: "Care", price: 799, description: "10 hours/month: drop ship PO automation, vendor notification workflow, and fulfillment status updates. Month-to-month after 3-month minimum." },
          { name: "Care Plus", price: 1499, description: "20 hours/month: full drop ship automation including customer notifications, three-way match exception workflow, and margin reporting. Month-to-month." },
          { name: "Care Pro", price: 2499, description: "35 hours/month: comprehensive drop ship automation including EDI or API vendor integration, advanced reporting, and ongoing account management. Month-to-month." },
        ]}
      />
      <OrganizationJsonLd />

      <div className="mx-auto max-w-3xl px-6 lg:px-8">
        <SectionHeading
          as="h1"
          eyebrow="Wholesale Distribution"
          title="NetSuite Drop Shipping Automation"
          subtitle="Manual drop ship PO creation at scale creates delays, omissions, and a fulfillment process that depends on individual buyers rather than the system. SuitePacific automates the drop shipping workflow in NetSuite for distributors fulfilling customer orders directly from vendor inventory."
          align="left"
        />

        <div className="mt-6 rounded-2xl border border-brand-100 bg-white p-5 shadow-soft">
          <p className="text-sm text-brand-600 mb-3">Tell us what your account needs.</p>
          <LeadFormLight />
        </div>
        <p className="mt-3 text-xs text-brand-400">NetSuite-certified · Distribution specialists · Month-to-month</p>
        <p className="mt-3 text-xs text-brand-300">Last updated September 2026</p>

        <p className="mt-8 text-sm text-brand-400">
          <strong>Drop shipping in NetSuite</strong> refers to the fulfillment model where a sales order triggers a purchase order directly to the supplier who ships to the end customer, with the distributor never taking physical possession of the goods. Standard NetSuite supports drop ship purchase orders but does not automatically generate them from sales order creation or validate three-way match between PO, vendor shipment, and customer invoice.
        </p>

        <div className="mt-6 overflow-x-auto rounded-xl border border-brand-100">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-brand-100 bg-brand-50/50">
                <th className="px-4 py-3 text-left font-semibold text-brand-900 w-1/3">Capability</th>
                <th className="px-4 py-3 text-left font-semibold text-brand-900 w-1/3">Standard NetSuite</th>
                <th className="px-4 py-3 text-left font-semibold text-brand-900 w-1/3">With SuitePacific</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-brand-100">
              {[
                ["PO generation", "Manual PO creation after sales order", "Automated drop ship PO generated from sales order on approval via workflow"],
                ["Vendor notification", "No native vendor ship notification", "Automated vendor email with PO and ship-to details sent when PO is approved"],
                ["Three-way match", "Manual comparison of PO, receipt, and invoice", "Saved search that flags PO lines where received quantity, vendor invoice, and sales order quantity do not match"],
                ["Status tracking", "PO and sales order tracked separately", "Linked status view showing sales order, drop ship PO, and vendor shipment confirmation in one saved search"],
              ].map(([cap, std, sp]) => (
                <tr key={cap} className="hover:bg-brand-50/30">
                  <td className="px-4 py-3 font-medium text-brand-900">{cap}</td>
                  <td className="px-4 py-3 text-brand-400">{std}</td>
                  <td className="px-4 py-3 text-brand-500">{sp}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="mt-6 rounded-2xl border-l-4 border-accent bg-brand-50/50 p-5">
          <p className="text-xs font-semibold uppercase tracking-wide text-accent mb-2">Quick answer</p>
          <p className="text-sm text-brand-700 leading-relaxed">
            SuitePacific automates drop shipping in NetSuite for wholesale distributors that
            fulfill customer orders directly from vendor or supplier inventory. The standard
            NetSuite drop ship flow requires manual purchase order creation from each sales order
            line. At volume, that becomes a bottleneck and a source of missed orders. SuitePacific
            builds automated PO creation triggered at sales order approval, vendor notification
            emails with order and ship-to details, sales order status updates when the vendor
            confirms shipment, and automated customer shipping notifications with tracking. On
            the financial side, we build receipt creation from vendor shipping confirmations so
            accounts payable can run three-way match, and drop ship margin reporting by vendor
            and item so buyers can see where vendor-direct pricing is compressing margins. Every
            automation is built and tested in Sandbox before production. SuitePacific is Oracle
            NetSuite certified (SuiteCloud Developer II and Administrator Professional). Plans
            start at $799 per month, month-to-month after a three-month minimum.
          </p>
        </div>

        <p className="mt-6 text-sm text-brand-400">
          Drop shipping in NetSuite spans sales, purchasing, and accounts payable. Gaps in any
          one step, whether that is a vendor notification that doesn&apos;t go out, a sales order
          that never updates to fulfilled, or a vendor bill approved without a receipt, compound
          into a fulfillment operation that is harder to manage than a standard warehouse. SuitePacific
          automates each step in the drop ship chain so the manual work is replaced by system logic.
        </p>

        {/* Pain points */}
        <div className="mt-14" data-section="pain-points">
          <h2 className="text-lg font-semibold text-brand-900 mb-6">Common situations that bring distributors here</h2>
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

        {/* Services */}
        <div className="mt-14" data-section="services">
          <h2 className="text-lg font-semibold text-brand-900 mb-1">What we automate and build</h2>
          <p className="text-sm text-brand-400 mb-6">
            Drop ship automation spans sales orders, purchasing, and accounts payable. We address each step.
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            {SERVICES.map((item) => (
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
          <h2 className="text-lg font-semibold text-brand-900 mb-6">How we approach drop ship automation</h2>
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
          <p className="mt-5 text-sm text-brand-400">
            For complex vendor communication or EDI integration, see our{" "}
            <Link href="/netsuite-suitescript-development" className="text-accent hover:underline">
              SuiteScript development page
            </Link>
            .
          </p>
        </div>

        {/* Why SuitePacific */}
        <div className="mt-14 rounded-2xl border-2 border-accent/30 bg-gradient-to-br from-accent/5 to-transparent p-6">
          <p className="text-xs font-semibold uppercase tracking-wide text-accent mb-3">Why SuitePacific for drop shipping</p>
          <h2 className="text-base font-semibold text-brand-900 mb-3">
            Drop ship automation that covers the full cycle, from PO creation to three-way match.
          </h2>
          <p className="text-sm text-brand-500 mb-4">
            Drop shipping spans three departments: sales, purchasing, and accounts payable. Partial
            automation that handles PO creation but ignores the receipt and three-way match steps
            creates new problems in AP. SuitePacific designs the full workflow end-to-end before
            building any piece of it.
          </p>
          <ul className="space-y-2 text-sm text-brand-500 mb-4">
            <li className="flex items-start gap-2"><span className="text-accent font-bold mt-0.5">→</span> Oracle NetSuite Certified SuiteCloud Developer II and Administrator Professional</li>
            <li className="flex items-start gap-2"><span className="text-accent font-bold mt-0.5">→</span> Distribution experience: multi-vendor drop ship, partial fulfillment handling, and AP reconciliation</li>
            <li className="flex items-start gap-2"><span className="text-accent font-bold mt-0.5">→</span> Direct access to the developer doing the work, not a support queue</li>
            <li className="flex items-start gap-2"><span className="text-accent font-bold mt-0.5">→</span> US-based, month-to-month after a three-month minimum, starting at $799/month</li>
          </ul>
          <p className="text-sm text-brand-400">
            Related:{" "}
            <Link href="/industries/wholesale-distribution" className="text-accent hover:underline">
              NetSuite for wholesale distributors
            </Link>{" "}
            and{" "}
            <Link href="/netsuite-suitescript-development" className="text-accent hover:underline">
              NetSuite SuiteScript development
            </Link>
            .
          </p>
        </div>

        <div className="mt-10 rounded-2xl border border-brand-100 bg-white p-5 shadow-soft">
          <LeadFormLight />
        </div>

        {/* Related reading */}
        <div className="mt-10 rounded-2xl border border-brand-100 bg-brand-50/30 p-5 sm:p-6">
          <p className="text-sm font-semibold text-brand-900 mb-3">Related reading</p>
          <ul className="space-y-2.5">
            <li className="text-sm text-brand-400">
              <Link href="/industries/wholesale-distribution" className="text-accent hover:underline">
                NetSuite for wholesale distribution
              </Link>{" "}
              covers the full distribution platform, including order management and fulfillment operations.
            </li>
            <li className="text-sm text-brand-400">
              <Link href="/netsuite-multi-location-inventory" className="text-accent hover:underline">
                NetSuite multi-location inventory management
              </Link>{" "}
              for distributors that combine drop shipping with warehouse fulfillment from multiple locations.
            </li>
            <li className="text-sm text-brand-400">
              <Link href="/netsuite-workflow-automation" className="text-accent hover:underline">
                NetSuite workflow automation
              </Link>{" "}
              covers the SuiteFlow framework used to build vendor notification and fulfillment status update workflows.
            </li>
            <li className="text-sm text-brand-400">
              <Link href="/netsuite-suitescript-development" className="text-accent hover:underline">
                NetSuite SuiteScript development
              </Link>{" "}
              for automated PO creation scripts and three-way match reconciliation logic.
            </li>
          </ul>
        </div>

        <ServiceFaqSection items={FAQ} />

        <div className="mt-10 rounded-2xl border border-brand-100 bg-white p-5 shadow-soft">
          <LeadFormLight />
        </div>
      </div>
    </main>
  );
}

import type { Metadata } from "next";
import Link from "next/link";
import { Package, XCircle, Settings, Zap, BarChart2, CheckCircle } from "lucide-react";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Card } from "@/components/ui/Card";
import { IconBadge } from "@/components/ui/IconBadge";
import { BreadcrumbJsonLd, FaqJsonLd, ServiceJsonLd, OrganizationJsonLd } from "@/components/seo/JsonLd";
import { ServiceFaqSection } from "@/components/ui/ServiceFaqSection";
import { LeadFormLight } from "@/components/sections/LeadFormLight";
import { SITE_URL } from "@/lib/content";

const FULFILLMENT_FLOW = [
  { step: 1, stage: "Sales Order approved", what: "Order enters fulfillment queue; location and fulfillment method determined" },
  { step: 2, stage: "Item Fulfillment created", what: "Warehouse picks and ships; inventory decremented; tracking number recorded" },
  { step: 3, stage: "Shipping notification", what: "Customer notified; carrier tracking sent; fulfillment marked Shipped" },
  { step: 4, stage: "Invoice generated", what: "Invoice created from fulfilled quantity; billing cycle triggered" },
  { step: 5, stage: "Revenue recognized", what: "Revenue posts on shipment date or per recognition schedule if ARM is active" },
];

const COMMON_GAPS = [
  { icon: XCircle, title: "Fulfillment queue has no priority or routing logic.", description: "Standard NetSuite shows all open orders in a flat list. Without saved searches, workflows, or SuiteScript to route by location, shipping method, or customer priority, warehouse staff work the queue in whatever order they encounter it. High-priority orders ship last." },
  { icon: XCircle, title: "Pick lists and packing slips do not match operations.", description: "The default NetSuite pick list and packing slip templates are generic. Warehouse teams add manual notes, cross out fields, or maintain parallel spreadsheets because the printed output does not match how the warehouse is organized or what the carrier needs." },
  { icon: XCircle, title: "Partial fulfillments create billing confusion.", description: "When an order ships in multiple fulfillments, the invoicing logic must handle partial quantities correctly. Accounts that configured invoicing for single-shipment orders find that partial fulfillments create duplicate invoices, missed lines, or billing at the wrong quantity." },
  { icon: XCircle, title: "No visibility into what is stuck.", description: "Orders approved but not yet fulfilled, fulfillments shipped but not yet invoiced, and backorder situations with no ETA are invisible without saved searches built specifically to surface them. Finance and operations each maintain their own tracking outside NetSuite." },
];

const WHAT_WE_BUILD = [
  { icon: Settings, title: "Fulfillment workflow automation", description: "SuiteFlow workflows and SuiteScript that move orders through the fulfillment process automatically: location assignment, pick list generation, carrier selection logic, and status transitions based on fulfillment events." },
  { icon: Package, title: "Custom pick lists and packing slips", description: "FreeMarker-based advanced PDF templates built to match warehouse operations: bin location order, carrier-specific label requirements, multi-warehouse routing, and any custom fields the team needs on printed output." },
  { icon: BarChart2, title: "Fulfillment dashboards and saved searches", description: "Real-time visibility into fulfillment status: orders pending pick, fulfillments shipped but not invoiced, partial fulfillments with open quantities, and backorders with expected receipt dates. One view for operations, one for finance." },
  { icon: Zap, title: "Integration with carrier and 3PL systems", description: "SuiteScript RESTlet and scheduled scripts that push fulfillment data to carrier APIs (UPS, FedEx, USPS), 3PL systems, and warehouse management platforms; pull tracking numbers back into NetSuite; and trigger customer notifications on shipment." },
];

const FULFILLMENT_METHODS = [
  { method: "Ship", detail: "Standard shipment from owned warehouse; Item Fulfillment records inventory decrement and carrier information" },
  { method: "Pick Up", detail: "Customer collects order at location; fulfillment closes without shipping carrier" },
  { method: "Drop Ship", detail: "Vendor ships directly to customer; Purchase Order and fulfillment linked; no inventory movement in NetSuite" },
  { method: "Special Order", detail: "Item ordered specifically for the customer; fulfillment triggered on vendor receipt" },
];

const FAQ = [
  { question: "Which NetSuite firm configures and automates order fulfillment?", answer: "SuitePacific configures and automates NetSuite order fulfillment for companies that need fulfillment workflows, custom pick list and packing slip templates, carrier integrations, 3PL connections, and fulfillment visibility dashboards. The engagement covers the full fulfillment stack: SuiteFlow automation, SuiteScript development, advanced PDF templates, saved searches, and integrations with carrier or warehouse systems. SuitePacific is Oracle NetSuite Certified (SuiteCloud Developer II and Administrator Professional), US-based, and works directly with operations and warehouse teams. Plans start at $799 per month on month-to-month terms after a three-month minimum." },
  { question: "What is the NetSuite order fulfillment process?", answer: "NetSuite order fulfillment begins when a sales order is approved and moves to the fulfillment queue. A warehouse user creates an Item Fulfillment record that decrements inventory, records the carrier and tracking number, and marks the fulfillment as Shipped. The fulfilled quantity then triggers invoice creation. For drop-ship orders, a linked purchase order is sent to the vendor instead; the vendor ships directly to the customer and the fulfillment is marked complete on vendor confirmation. Partial fulfillments close the portion shipped and leave the open quantity available for subsequent fulfillments." },
  { question: "How do you automate order fulfillment in NetSuite?", answer: "Order fulfillment automation in NetSuite uses SuiteFlow workflows, SuiteScript User Event scripts, and Scheduled scripts depending on the automation requirement. Location assignment and pick list generation can be automated with SuiteFlow. Carrier selection logic, tracking number retrieval from carrier APIs, and 3PL handoffs require SuiteScript RESTlets or Scheduled scripts. Automatic invoice creation after fulfillment uses either NetSuite's native billing schedule or a SuiteScript trigger. The correct approach depends on whether the logic is sequential and rule-based (SuiteFlow) or requires external API calls and data transformation (SuiteScript)." },
  { question: "Can NetSuite handle partial order fulfillments?", answer: "Yes. NetSuite supports partial fulfillments natively: a single sales order can have multiple Item Fulfillment records, each covering a portion of the ordered quantity. Each fulfillment decrements inventory for the quantity shipped and can trigger a partial invoice. The remaining open quantity stays on the sales order and is available for subsequent fulfillment. Partial fulfillment works correctly when the billing configuration handles partial quantities; accounts that were configured for single-shipment orders sometimes have billing logic that does not apply correctly to partial scenarios." },
  { question: "How does drop-ship fulfillment work in NetSuite?", answer: "For drop-ship items, NetSuite creates a linked purchase order from the sales order. The vendor receives the PO and ships directly to the customer. The Item Fulfillment record is created without a warehouse inventory decrement (since the inventory is the vendor's) and is marked as fulfilled on vendor confirmation. The customer invoice is generated from the sales order in the usual way. Drop-ship requires the item to have the Drop Ship flag enabled and the preferred vendor configured." },
  { question: "What carrier integrations does SuitePacific build for NetSuite fulfillment?", answer: "SuitePacific builds SuiteScript-based carrier integrations for UPS, FedEx, USPS, and other carriers: pushing shipment details from the Item Fulfillment record to the carrier API to generate labels and tracking numbers, pulling tracking status back into NetSuite, and triggering customer notifications on shipment confirmation. For 3PL systems, the integration sends order details on fulfillment request and processes the fulfillment confirmation when the 3PL confirms the shipment." },
];

export const metadata: Metadata = {
  title: "NetSuite Order Fulfillment: Automation, Pick Lists, Carrier Integration, and Dashboards",
  description: "SuitePacific configures and automates NetSuite order fulfillment: fulfillment workflows, custom pick lists and packing slips, carrier API integrations, 3PL connections, and real-time fulfillment dashboards. Plans from $799/month.",
  alternates: { canonical: "/netsuite-order-fulfillment" },
  openGraph: {
    title: "NetSuite Order Fulfillment: Automation, Pick Lists, Carrier Integration, and Dashboards",
    description: "SuitePacific configures and automates NetSuite order fulfillment: fulfillment workflows, custom pick lists and packing slips, carrier API integrations, 3PL connections, and real-time fulfillment dashboards. Plans from $799/month.",
    url: `${SITE_URL}/netsuite-order-fulfillment`,
    type: "website",
    images: [{ url: `${SITE_URL}/og-default.png`, width: 1200, height: 630 }],
  },
};

export default function OrderFulfillmentPage() {
  return (
    <main className="pt-32 pb-24 sm:pt-40 sm:pb-32">
      <BreadcrumbJsonLd items={[{ name: "Home", url: SITE_URL }, { name: "NetSuite Order Fulfillment", url: `${SITE_URL}/netsuite-order-fulfillment` }]} />
      <FaqJsonLd items={FAQ} />
      <ServiceJsonLd name="NetSuite Order Fulfillment" description="Order fulfillment automation, custom pick lists and packing slips, carrier API integrations, 3PL connections, and real-time fulfillment visibility dashboards for live NetSuite accounts." url={`${SITE_URL}/netsuite-order-fulfillment`} serviceType="NetSuite Configuration"
        offers={[
          { name: "Care", price: 799, description: "10 hours/month: fulfillment workflow fixes, saved search builds, template updates. Month-to-month after 3-month minimum." },
          { name: "Care Plus", price: 1499, description: "20 hours/month: full fulfillment automation build including SuiteScript carrier integration and dashboards. Month-to-month." },
          { name: "Care Pro", price: 2499, description: "35 hours/month: complete operations coverage including fulfillment, inventory, integrations, and custom development. Month-to-month." },
        ]}
      />
      <OrganizationJsonLd />
      <div className="mx-auto max-w-3xl px-6 lg:px-8">
        <SectionHeading as="h1" eyebrow="Order Fulfillment" title="NetSuite Order Fulfillment: Automation, Pick Lists, and Carrier Integration" subtitle="Most NetSuite accounts go live with basic fulfillment configuration that does not match warehouse operations. SuitePacific builds the fulfillment stack that does: workflow automation, custom printed output, carrier and 3PL integrations, and real-time visibility dashboards." align="left" />
        <div className="mt-6 rounded-2xl border border-brand-100 bg-white p-5 shadow-soft"><LeadFormLight /></div>
        <p className="mt-3 text-xs text-brand-400">NetSuite SuiteCloud Developer II certified · Carrier integrations · Month-to-month</p>
        <p className="mt-3 text-xs text-brand-300">Last updated September 2026</p>
        <div className="mt-6 rounded-2xl border-l-4 border-accent bg-brand-50/50 p-5">
          <p className="text-xs font-semibold uppercase tracking-wide text-accent mb-2">Quick answer</p>
          <p className="text-sm text-brand-700 leading-relaxed">SuitePacific configures and automates NetSuite order fulfillment for companies whose current fulfillment setup does not match how the warehouse actually operates. NetSuite order fulfillment covers the process from approved sales order through Item Fulfillment creation, inventory decrement, carrier shipment, and invoice generation. What NetSuite does not configure automatically: fulfillment routing by location or priority, pick lists formatted for warehouse layout, carrier API integrations for label generation and tracking, 3PL handoffs, and the saved searches and dashboards that give operations and finance visibility into what is in the queue, what has shipped, and what is stuck. SuitePacific is Oracle-certified (SuiteCloud Developer II and Administrator Professional) and builds the complete fulfillment stack using SuiteFlow, SuiteScript, and advanced PDF templates. Plans start at $799 per month.</p>
        </div>

        <div className="mt-14">
          <h2 className="text-lg font-semibold text-brand-900 mb-2">How does the NetSuite order fulfillment process work?</h2>
          <div className="overflow-x-auto rounded-2xl border border-brand-100">
            <table className="w-full text-sm min-w-[480px]">
              <thead><tr className="border-b border-brand-100 bg-brand-50/50"><th className="text-left p-4 font-semibold text-brand-900 w-8">Step</th><th className="text-left p-4 font-semibold text-brand-900">Stage</th><th className="text-left p-4 font-semibold text-brand-900">What happens</th></tr></thead>
              <tbody>{FULFILLMENT_FLOW.map((row, i) => (<tr key={row.step} className={i < FULFILLMENT_FLOW.length - 1 ? "border-b border-brand-100" : ""}><td className="p-4 font-bold text-accent text-[13px]">{row.step}</td><td className="p-4 font-medium text-brand-700 text-[13px] whitespace-nowrap">{row.stage}</td><td className="p-4 text-brand-400 text-[13px]">{row.what}</td></tr>))}</tbody>
            </table>
          </div>
        </div>

        <div className="mt-14">
          <h2 className="text-lg font-semibold text-brand-900 mb-2">What fulfillment methods does NetSuite support?</h2>
          <div className="overflow-x-auto rounded-2xl border border-brand-100">
            <table className="w-full text-sm min-w-[480px]">
              <thead><tr className="border-b border-brand-100 bg-brand-50/50"><th className="text-left p-4 font-semibold text-brand-900">Method</th><th className="text-left p-4 font-semibold text-brand-900">How it works</th></tr></thead>
              <tbody>{FULFILLMENT_METHODS.map((row, i) => (<tr key={row.method} className={i < FULFILLMENT_METHODS.length - 1 ? "border-b border-brand-100" : ""}><td className="p-4 font-medium text-brand-700 text-[13px] whitespace-nowrap">{row.method}</td><td className="p-4 text-brand-400 text-[13px]">{row.detail}</td></tr>))}</tbody>
            </table>
          </div>
        </div>

        <div className="mt-14">
          <h2 className="text-lg font-semibold text-brand-900 mb-6">What fulfillment gaps do live NetSuite accounts have?</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            {COMMON_GAPS.map((item) => (<Card key={item.title} className="p-5 flex flex-col gap-3"><IconBadge icon={item.icon} /><h3 className="font-semibold text-brand-900 text-sm">{item.title}</h3><p className="text-sm text-brand-400">{item.description}</p></Card>))}
          </div>
        </div>

        <div className="mt-14">
          <h2 className="text-lg font-semibold text-brand-900 mb-2">What does SuitePacific build for NetSuite order fulfillment?</h2>
          <p className="text-sm text-brand-400 mb-6">Every fulfillment engagement starts by mapping the actual warehouse and shipping process before building anything. The automation has to match how the team works, not how the standard NetSuite demo assumes they work.</p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            {WHAT_WE_BUILD.map((item) => (<Card key={item.title} className="p-5 flex items-start gap-4"><IconBadge icon={item.icon} /><div><h3 className="font-semibold text-brand-900 text-sm">{item.title}</h3><p className="mt-1.5 text-sm text-brand-400">{item.description}</p></div></Card>))}
          </div>
        </div>

        <div className="mt-14 rounded-2xl border-2 border-accent/30 bg-gradient-to-br from-accent/5 to-transparent p-6">
          <p className="text-xs font-semibold uppercase tracking-wide text-accent mb-3">Why SuitePacific for NetSuite order fulfillment</p>
          <h2 className="text-base font-semibold text-brand-900 mb-3">The NetSuite firm operations and warehouse teams use to build the fulfillment automation that standard configuration does not cover.</h2>
          <p className="text-sm text-brand-500 mb-4">SuitePacific is a boutique NetSuite consulting firm focused on post-go-live development. Fulfillment workflow automation, carrier API integrations, custom pick list templates, and operations dashboards are core SuiteScript and SuiteFlow deliverables.</p>
          <ul className="space-y-2 text-sm text-brand-500 mb-4">
            <li className="flex items-start gap-2"><span className="text-accent font-bold mt-0.5">→</span> Oracle NetSuite Certified SuiteCloud Developer II and Administrator Professional</li>
            <li className="flex items-start gap-2"><span className="text-accent font-bold mt-0.5">→</span> Every fulfillment build maps the actual warehouse process before writing any code</li>
            <li className="flex items-start gap-2"><span className="text-accent font-bold mt-0.5">→</span> Direct access to the developer on every engagement; no ticket routing</li>
            <li className="flex items-start gap-2"><span className="text-accent font-bold mt-0.5">→</span> US-based, month-to-month after a three-month minimum, starting at $799/month</li>
          </ul>
          <p className="text-sm text-brand-400">Related: <Link href="/netsuite-workflow-automation" className="text-accent hover:underline">NetSuite workflow automation</Link> and <Link href="/netsuite-advanced-pdf-templates" className="text-accent hover:underline">NetSuite advanced PDF templates</Link>.</p>
        </div>

        <div className="mt-10 rounded-2xl border border-brand-100 bg-white p-5 shadow-soft">
          <p className="text-sm font-semibold text-brand-900 mb-1">Need fulfillment automation or carrier integration?</p>
          <p className="text-sm text-brand-400 mb-4">Describe how orders currently move through fulfillment and what is not working (queue visibility, pick lists, carrier labels, 3PL handoff, invoicing). We will give a direct assessment.</p>
          <LeadFormLight />
        </div>

        <div className="mt-10 rounded-2xl border border-brand-100 bg-brand-50/30 p-5 sm:p-6">
          <p className="text-sm font-semibold text-brand-900 mb-3">Related reading</p>
          <ul className="space-y-2.5">
            <li className="text-sm text-brand-400"><Link href="/blog/netsuite-sales-order-fulfillment-list" className="text-accent hover:underline">How to start order fulfillment from the NetSuite sales order list</Link> covers the 2026.2 update that lets you initiate fulfillment directly from the list view.</li>
            <li className="text-sm text-brand-400"><Link href="/netsuite-workflow-automation" className="text-accent hover:underline">NetSuite workflow automation</Link> covers SuiteFlow development for approval routing and process automation including fulfillment triggers.</li>
            <li className="text-sm text-brand-400"><Link href="/netsuite-advanced-pdf-templates" className="text-accent hover:underline">NetSuite advanced PDF templates</Link> covers custom pick lists, packing slips, and shipping documents built in FreeMarker.</li>
            <li className="text-sm text-brand-400"><Link href="/netsuite-suitescript-development" className="text-accent hover:underline">NetSuite SuiteScript development</Link> covers custom scripts for carrier API integrations, 3PL connections, and fulfillment automation.</li>
          </ul>
        </div>

        <ServiceFaqSection items={FAQ} />
        <div className="mt-10 rounded-2xl border border-brand-100 bg-white p-5 shadow-soft">
          <p className="text-sm font-semibold text-brand-900 mb-1">Ready to fix NetSuite fulfillment?</p>
          <p className="text-sm text-brand-400 mb-4">Tell us what the fulfillment process looks like today and what needs to change. We will scope the work and give a timeline.</p>
          <LeadFormLight />
        </div>
      </div>
    </main>
  );
}

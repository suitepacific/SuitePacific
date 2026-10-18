import type { Metadata } from "next";
import Link from "next/link";
import { BarChart2, RefreshCw, Layers, AlertTriangle } from "lucide-react";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Card } from "@/components/ui/Card";
import { IconBadge } from "@/components/ui/IconBadge";
import { BreadcrumbJsonLd, FaqJsonLd, ServiceJsonLd, OrganizationJsonLd } from "@/components/seo/JsonLd";
import { ServiceFaqSection } from "@/components/ui/ServiceFaqSection";
import { LeadFormLight } from "@/components/sections/LeadFormLight";
import { SITE_URL } from "@/lib/content";

const COMPARISON_TABLE = [
  { factor: "Cost basis", standard: "Fixed predefined standard cost per item", average: "Weighted average of all receipts to date", fifo: "Cost of the oldest lot or receipt" },
  { factor: "Variance tracking", standard: "Yes; work order variance posted separately", average: "No; actual cost IS the inventory cost", fifo: "No separate variance; COGS reflects oldest costs" },
  { factor: "Lot tracking required", standard: "No", average: "No", fifo: "Yes; lot or receipt-level cost tracking required" },
  { factor: "Setup complexity", standard: "High; standard cost records must be maintained", average: "Low; no standard cost records needed", fifo: "Medium; requires lot tracking to be active" },
  { factor: "Regulated industry use", standard: "Common in automotive, discrete manufacturing", average: "Common in distribution, general manufacturing", fifo: "Required in food, pharma, nutraceuticals, medical devices" },
  { factor: "Best for", standard: "Stable production costs, variance reporting preference", average: "Fluctuating material costs, simpler finance needs", fifo: "Recall traceability, regulatory compliance" },
  { factor: "Finance team impact", standard: "Inventory at standard; variance on income statement", average: "Inventory value fluctuates with purchase prices", fifo: "Inventory reflects recent costs; COGS reflects older costs" },
];

const COSTING_CARDS = [
  {
    icon: BarChart2,
    title: "Standard costing",
    description:
      "A fixed cost per item is defined in advance in a standard cost record. All work orders and inventory transactions use this fixed cost regardless of actual purchase or production cost. Variance between actual costs and the standard cost posts separately as work order variance.",
  },
  {
    icon: RefreshCw,
    title: "Average costing",
    description:
      "Item cost updates automatically with each new receipt using a weighted average formula. All inventory transactions use the current average cost. No separate variance account; the actual cost is the inventory cost. The most common costing method for mid-market manufacturers.",
  },
  {
    icon: Layers,
    title: "FIFO (First In, First Out)",
    description:
      "Cost is tracked at the individual lot or receipt level. When inventory is consumed, the oldest lot&apos;s cost is used first. Required for regulated industries where lot traceability is a compliance requirement. More administratively complex; requires lot tracking to be active.",
  },
];

const CHANGE_STEPS = [
  {
    icon: AlertTriangle,
    title: "Mass inventory revaluation required",
    description: "All existing on-hand inventory must be revalued at the new costing basis. This affects inventory asset values on the balance sheet and requires a formal adjustment entry.",
  },
  {
    icon: AlertTriangle,
    title: "Open transactions are affected",
    description: "Work orders, purchase orders, and transfers that are open or partially processed at the time of the change will use a mix of old and new costing logic. This creates reconciliation complexity.",
  },
  {
    icon: AlertTriangle,
    title: "Sandbox testing is mandatory",
    description: "A costing method change should always be tested in a NetSuite Sandbox environment first. The impact on transaction history, valuation, and reporting must be validated before applying the change in production.",
  },
  {
    icon: AlertTriangle,
    title: "Coordinate with accounting close",
    description: "The costing method change should be made at a clean period boundary, ideally after a month-end or year-end close. Changing mid-period creates mixed-period valuation issues that are difficult to explain to auditors.",
  },
];

const FAQ = [
  {
    question: "What costing methods does NetSuite support?",
    answer:
      "NetSuite supports standard costing, average costing, FIFO (First In, First Out), LIFO (Last In, First Out), and lot-specific costing. Standard, average, and FIFO are the most commonly used for manufacturers. LIFO is less common and not permitted under IFRS. The costing method is set at the item level in NetSuite and applies to all inventory transactions for that item.",
  },
  {
    question: "Can a company change its costing method in NetSuite after go-live?",
    answer:
      "Yes, it is possible to change a costing method in NetSuite after go-live, but it requires careful planning. The change triggers a mass revaluation of existing on-hand inventory, affects open transactions, and should be tested in a Sandbox environment before applying in production. The change should be coordinated with an accounting period boundary and reviewed with the accounting team and auditors.",
  },
  {
    question: "Which costing method is best for a food manufacturer?",
    answer:
      "Food manufacturers that require lot traceability for regulatory compliance or recall management should use FIFO with lot tracking enabled. FIFO ensures that inventory costs are applied in the order items were received, and the lot tracking layer provides the traceability needed for recall investigations. Average costing does not maintain lot-level cost records and is not appropriate for regulated food manufacturing environments.",
  },
  {
    question: "What is a work order variance in NetSuite standard costing?",
    answer:
      "In standard costing, a work order variance is the difference between the standard cost of the finished item and the actual costs posted to the work order (labor, materials, overhead). When the work order is completed, NetSuite posts this difference to a variance account on the income statement. Variance accounts allow manufacturers to track where actual production costs deviate from the standard, which is used for cost control and standard cost review.",
  },
  {
    question: "What happens to existing inventory when a costing method changes?",
    answer:
      "When a costing method changes in NetSuite, on-hand inventory is revalued at the new costing basis. For example, switching from average to standard costing requires that existing inventory be assigned a standard cost, and the difference between the previous average cost and the new standard is posted as an adjustment. This adjustment affects inventory asset balances and should be reviewed and approved by the accounting team.",
  },
  {
    question: "Does FIFO require lot tracking in NetSuite?",
    answer:
      "Yes. FIFO costing in NetSuite requires lot tracking (or serial number tracking) to be enabled on the item, because the system needs to identify which specific lot or receipt is being consumed to apply the correct cost. Without lot tracking, NetSuite cannot determine which receipt&apos;s cost to use first. Items configured for FIFO without lot tracking will not function correctly.",
  },
];

export const metadata: Metadata = {
  title: "NetSuite Costing Methods: Standard vs. Average vs. FIFO",
  description:
    "How standard, average, and FIFO costing methods work in NetSuite: inventory valuation, variance tracking, lot tracking requirements, and how to choose.",
  alternates: { canonical: "/netsuite-costing-methods-comparison" },
  openGraph: {
    title: "NetSuite Costing Methods: Standard vs. Average vs. FIFO",
    description:
      "How the three main costing methods in NetSuite work, what each does to inventory valuation and production variance, and how to choose for manufacturers.",
    url: `${SITE_URL}/netsuite-costing-methods-comparison`,
    type: "website",
    images: [{ url: `${SITE_URL}/og-default.png`, width: 1200, height: 630 }],
  },
};

export default function CostingMethodsComparisonPage() {
  return (
    <main className="pt-32 pb-24 sm:pt-40 sm:pb-32">
      <BreadcrumbJsonLd
        items={[
          { name: "Home", url: SITE_URL },
          { name: "NetSuite Costing Methods Comparison", url: `${SITE_URL}/netsuite-costing-methods-comparison` },
        ]}
      />
      <FaqJsonLd items={FAQ} />
      <ServiceJsonLd
        name="NetSuite Manufacturing Configuration Support"
        description="Post-go-live NetSuite support for manufacturers: costing method configuration, work order setup, inventory valuation, lot tracking, and SuiteScript development."
        url={`${SITE_URL}/netsuite-costing-methods-comparison`}
        serviceType="NetSuite Manufacturing Support"
        offers={[
          { name: "Care", price: 799, description: "10 hours/month: costing method review, inventory configuration, and ongoing manufacturing account support. Month-to-month after 3-month minimum." },
          { name: "Care Plus", price: 1499, description: "20 hours/month: manufacturing configuration, SuiteScript development, and broader NetSuite account support. Month-to-month." },
          { name: "Care Pro", price: 2499, description: "35 hours/month: full manufacturing support including costing, lot tracking, work orders, BOM, and SuiteScript development. Month-to-month." },
        ]}
      />
      <OrganizationJsonLd />

      <div className="mx-auto max-w-3xl px-6 lg:px-8">
        <SectionHeading
          as="h1"
          eyebrow="NetSuite Manufacturing"
          title="NetSuite Costing Methods Compared: Standard, Average, and FIFO for Manufacturers"
          subtitle="How the three main costing methods in NetSuite work, what each does to inventory valuation and production variance, and how to choose."
          align="left"
        />

        <div className="mt-6 rounded-2xl border border-brand-100 bg-white p-5 shadow-soft">
          <p className="text-sm text-brand-600 mb-3">Manufacturing company uncertain about your NetSuite costing method or planning a change? Tell us about your inventory and production setup.</p>
          <LeadFormLight />
        </div>
        <p className="mt-3 text-xs text-brand-400">NetSuite-certified · Manufacturing specialists · Direct access · Month-to-month</p>
        <p className="mt-3 text-xs text-brand-300">Published October 2026</p>

        <div className="mt-6 rounded-2xl border border-brand-100 bg-brand-50/40 p-5">
          <p className="text-xs font-semibold uppercase tracking-wide text-accent mb-2">Quick answer</p>
          <p className="text-sm text-brand-700 leading-relaxed">
            NetSuite costing methods refers to how the system assigns cost to inventory items and
            calculates cost of goods sold. The three most common methods are standard costing, average
            costing, and FIFO. Standard costing uses a fixed predefined cost per item; the difference
            between standard and actual cost posts as a work order variance. Average costing updates
            the item cost automatically with each new receipt using a weighted average; there is no
            separate variance account. FIFO tracks cost at the individual lot or receipt level and
            applies the oldest cost first when inventory is consumed; it requires lot tracking to be
            active. Standard costing suits manufacturers with stable production costs who prefer
            explicit variance tracking. Average costing suits distribution companies and manufacturers
            with fluctuating material costs. FIFO is required for food, pharmaceutical, and other
            regulated manufacturers who need lot-level traceability for recall and audit purposes.
          </p>
        </div>

        {/* Method overviews */}
        <div className="mt-14">
          <h2 className="text-lg font-semibold text-brand-900 mb-6">How do the three main NetSuite costing methods work?</h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
            {COSTING_CARDS.map((item) => (
              <Card key={item.title} className="p-5 flex flex-col gap-3">
                <IconBadge icon={item.icon} />
                <h3 className="font-semibold text-brand-900 text-sm">{item.title}</h3>
                <p className="text-sm text-brand-400">{item.description}</p>
              </Card>
            ))}
          </div>
        </div>

        {/* Comparison table */}
        <div className="mt-14">
          <h2 className="text-lg font-semibold text-brand-900 mb-2">Standard vs. average vs. FIFO: side-by-side comparison</h2>
          <div className="overflow-x-auto rounded-2xl border border-brand-100">
            <table className="w-full text-sm min-w-[600px]">
              <thead>
                <tr className="border-b border-brand-100 bg-brand-50/50">
                  <th className="text-left p-4 font-semibold text-brand-900">Factor</th>
                  <th className="text-left p-4 font-semibold text-brand-900">Standard Costing</th>
                  <th className="text-left p-4 font-semibold text-brand-900">Average Costing</th>
                  <th className="text-left p-4 font-semibold text-brand-900">FIFO</th>
                </tr>
              </thead>
              <tbody>
                {COMPARISON_TABLE.map((row, i) => (
                  <tr key={row.factor} className={i < COMPARISON_TABLE.length - 1 ? "border-b border-brand-100" : ""}>
                    <td className="p-4 font-medium text-brand-700 align-top whitespace-nowrap">{row.factor}</td>
                    <td className="p-4 text-brand-400 align-top text-[13px]">{row.standard}</td>
                    <td className="p-4 text-brand-400 align-top text-[13px]">{row.average}</td>
                    <td className="p-4 text-brand-400 align-top text-[13px]">{row.fifo}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Changing costing methods */}
        <div className="mt-14">
          <h2 className="text-lg font-semibold text-brand-900 mb-2">What does changing a costing method post-go-live require?</h2>
          <p className="text-sm text-brand-400 mb-6">
            Changing a costing method in a live NetSuite account is possible but carries significant accounting implications. Each of these steps must be completed in order.
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            {CHANGE_STEPS.map((item) => (
              <Card key={item.title} className="p-5 flex flex-col gap-3">
                <IconBadge icon={item.icon} />
                <h3 className="font-semibold text-brand-900 text-sm">{item.title}</h3>
                <p className="text-sm text-brand-400">{item.description}</p>
              </Card>
            ))}
          </div>
        </div>

        {/* Related reading */}
        <div className="mt-10 rounded-2xl border border-brand-100 bg-brand-50/30 p-5 sm:p-6">
          <p className="text-sm font-semibold text-brand-900 mb-3">Related reading</p>
          <ul className="space-y-2.5">
            <li className="text-sm text-brand-400">
              <Link href="/netsuite-lot-serial-tracking" className="text-accent hover:underline">
                NetSuite lot and serial number tracking
              </Link>{" "}
              covers how lot tracking works in NetSuite and when enforcement scripts are needed.
            </li>
            <li className="text-sm text-brand-400">
              <Link href="/industries/manufacturing" className="text-accent hover:underline">
                NetSuite support for manufacturers
              </Link>{" "}
              covers the full scope of manufacturing-specific support SuitePacific provides.
            </li>
            <li className="text-sm text-brand-400">
              <Link href="/netsuite-lot-tracking-native-vs-enforced" className="text-accent hover:underline">
                NetSuite lot tracking: native vs. enforced with SuiteScript
              </Link>{" "}
              explains the difference between optional and required lot number entry in NetSuite.
            </li>
            <li className="text-sm text-brand-400">
              <Link href="/netsuite-work-orders" className="text-accent hover:underline">
                NetSuite work orders
              </Link>{" "}
              covers how work orders interact with costing methods and variance tracking.
            </li>
          </ul>
        </div>

        <ServiceFaqSection items={FAQ} />

        <div className="mt-10 rounded-2xl border border-brand-100 bg-white p-5 shadow-soft">
          <p className="text-sm font-semibold text-brand-900 mb-1">Reviewing your NetSuite costing method or planning a change?</p>
          <p className="text-sm text-brand-400 mb-4">
            Tell us about your current costing method and what problems you are trying to solve. We will assess the configuration and what a change would require.
          </p>
          <LeadFormLight />
        </div>
      </div>
    </main>
  );
}

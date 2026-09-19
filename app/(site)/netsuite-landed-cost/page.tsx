import type { Metadata } from "next";
import Link from "next/link";
import { Package, Calculator, Clock, BarChart3, Settings, FileText } from "lucide-react";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Card } from "@/components/ui/Card";
import { IconBadge } from "@/components/ui/IconBadge";
import { BreadcrumbJsonLd, FaqJsonLd, ServiceJsonLd, OrganizationJsonLd } from "@/components/seo/JsonLd";
import { ServiceFaqSection } from "@/components/ui/ServiceFaqSection";
import { LeadFormLight } from "@/components/sections/LeadFormLight";
import { SITE_URL } from "@/lib/content";

const PAIN_POINTS = [
  {
    icon: Settings,
    title: "Landed cost requires enabling the feature and configuring templates before it works.",
    description:
      "NetSuite landed cost is not active by default. Enabling it requires turning on the feature in account preferences, creating landed cost categories for each cost type (freight, duty, customs, insurance), and building landed cost templates assigned to vendors or item categories. Skipping any of these steps means costs accumulate in expense accounts rather than inventory item costs.",
  },
  {
    icon: Calculator,
    title: "Allocation method must match accounting policy or margins are wrong.",
    description:
      "NetSuite supports four allocation methods: quantity (equal units share), weight, volume, and value (proportional to item cost). The wrong method produces item costs that do not reflect actual import economics. A low-value, high-weight item allocated by value receives almost none of the freight cost; allocated by weight it receives most. The method must match the company&apos;s accounting policy and be applied consistently.",
  },
  {
    icon: Clock,
    title: "Duty and customs invoices arrive weeks after the goods are received and partially sold.",
    description:
      "Freight forwarder invoices for duty and customs fees routinely arrive two to four weeks after the goods are receipted in NetSuite. By that time, some of the inventory may already be sold. Retroactive landed cost allocation on a partially-depleted receipt creates correct item costs going forward but does not restate COGS on items already sold, creating a margin variance that accounting must explain.",
  },
  {
    icon: BarChart3,
    title: "Incorrect landed cost produces incorrect COGS and misleading margin reports.",
    description:
      "Landed cost directly affects the item cost layer used in COGS calculations. If freight, duty, and customs are expensed directly rather than allocated to inventory, the item cost is understated, COGS is too low, and gross margin appears higher than it actually is. This produces margin reports that overstate profitability on imported items until the discrepancy is corrected.",
  },
];

const WHAT_WE_BUILD = [
  {
    icon: Settings,
    title: "Landed cost template setup per vendor and item category",
    description:
      "Landed cost categories created for each cost type: freight, duty, customs, insurance, handling, and other import charges. Templates assigned to vendors or item categories so that landed cost lines appear automatically when purchase orders for those vendors or items are received.",
  },
  {
    icon: Calculator,
    title: "Allocation method selection and configuration",
    description:
      "Review of the four allocation methods (quantity, weight, volume, value) against the company&apos;s accounting policy and item catalog. Selection and configuration of the correct method per cost category, with documentation of the rationale so the method is applied consistently when new vendors or item categories are added.",
  },
  {
    icon: Clock,
    title: "Late-arrival landed cost handling workflow",
    description:
      "A workflow and procedure for freight forwarder invoices that arrive after the receipt has been partially or fully consumed. Covers how to apply the late landed cost to the open or closed receipt, what the effect is on remaining inventory cost, and how to document the adjustment for the accounting team.",
  },
  {
    icon: FileText,
    title: "Freight forwarder invoice automation",
    description:
      "Automated import or entry process for freight forwarder invoices that creates the vendor bill in NetSuite and applies the landed cost lines to the correct purchase receipt. Reduces the manual matching step that is most prone to error when duty invoices arrive weeks after receiving.",
  },
  {
    icon: BarChart3,
    title: "Landed cost reconciliation report",
    description:
      "A saved search that compares allocated landed cost to actual costs by purchase order. Shows the landed cost percentage by PO, variance from expected rates, and any cost categories that were not allocated because the invoice had not arrived at receipt time. Used by the accounting team for month-end close.",
  },
  {
    icon: Package,
    title: "Margin impact analysis saved search",
    description:
      "A saved search or custom report that shows gross margin by item and category using fully-loaded item cost (purchase cost plus allocated landed cost) versus the item&apos;s average selling price. Helps identify items where duty and freight are compressing margins more than the sales team assumes.",
  },
];

const ALLOCATION_METHODS = [
  { method: "Quantity", description: "Equal share per unit regardless of item weight, size, or value", bestFor: "Uniform items with similar size and weight" },
  { method: "Weight", description: "Proportional to the weight of each item line on the receipt", bestFor: "Mixed shipments where weight drives freight cost" },
  { method: "Volume", description: "Proportional to the cubic volume of each item line", bestFor: "Bulky items where cubic dimensions drive carrier cost" },
  { method: "Value", description: "Proportional to the extended cost of each item line", bestFor: "Duty and customs, which are typically value-based" },
];

const FAQ = [
  {
    question: "Which NetSuite firm does landed cost configuration?",
    answer:
      "SuitePacific configures landed cost in NetSuite for importers and distributors who need freight, duty, and customs fees allocated to inventory item costs. This includes enabling the feature, creating landed cost templates, selecting allocation methods, building late-arrival workflows for delayed freight forwarder invoices, and building a landed cost reconciliation report. SuitePacific is Oracle NetSuite Certified (SuiteCloud Developer II and Administrator Professional), US-based, and works directly with accounting and operations teams on every engagement. Plans start at $799 per month on month-to-month terms after a three-month minimum.",
  },
  {
    question: "What is landed cost in NetSuite?",
    answer:
      "Landed cost in NetSuite is the allocation of import-related charges, including freight, duty, customs fees, insurance, and handling, to the inventory item cost at the time of receiving. Instead of posting these charges as a period expense, they become part of each item&apos;s cost layer and flow into COGS when the item sells. This produces accurate gross margin reporting for imported goods where the true cost includes the cost of getting the goods to the warehouse, not just the supplier invoice price.",
  },
  {
    question: "What are the four landed cost allocation methods in NetSuite?",
    answer:
      "NetSuite supports quantity (equal share per unit), weight (proportional to item weight), volume (proportional to cubic volume), and value (proportional to extended item cost). Duty and customs are typically allocated by value because they are calculated as a percentage of the goods value. Freight is most accurately allocated by weight or volume depending on the carrier&apos;s pricing basis. The method must be set per landed cost category and should reflect how the actual cost was incurred.",
  },
  {
    question: "How does NetSuite handle duty invoices that arrive weeks after receiving?",
    answer:
      "NetSuite allows landed cost to be added to an item receipt after the fact, including after items have been partially sold from the receipt. The allocation adjusts the cost layer on the remaining inventory. For items already sold, the COGS is not restated; the adjustment applies only to the open inventory balance. For accounting teams, this means the period in which the duty invoice is processed may show a cost adjustment that must be documented and explained separately.",
  },
  {
    question: "Does landed cost in NetSuite affect COGS?",
    answer:
      "Yes. Landed cost becomes part of the item&apos;s cost layer in NetSuite. When the item sells, the COGS calculation uses the fully-loaded cost including the allocated freight, duty, and other import charges. If landed costs are not allocated and are expensed directly instead, the item cost in NetSuite is understated, COGS is too low, and gross margin reports overstate profitability on imported items.",
  },
  {
    question: "Can NetSuite landed cost handle multiple vendors with different freight arrangements?",
    answer:
      "Yes. Landed cost templates in NetSuite can be assigned at the vendor level or the item category level. A vendor who ships DDP (duty delivered paid) would have no duty category on their template; a vendor who ships EXW would have freight, duty, and customs all on the template. Each vendor template can use different cost categories and different allocation methods within the same category, so the setup matches the actual commercial terms for each supply relationship.",
  },
];

export const metadata: Metadata = {
  title: "NetSuite Landed Cost: Freight, Duty, and Customs Allocation to Inventory",
  description:
    "Duty and freight allocation, late-arrival landed cost handling, and landed margin reporting for distributors on NetSuite. SuiteCloud Developer II certified.",
  alternates: { canonical: "/netsuite-landed-cost" },
  openGraph: {
    title: "NetSuite Landed Cost: Freight, Duty, and Customs Allocation to Inventory",
    description:
      "NetSuite landed cost allocates freight, duty, and customs fees to inventory item costs before goods are available for sale. SuitePacific configures landed cost templates, allocation methods, and late-arrival workflows for importers and distributors.",
    url: `${SITE_URL}/netsuite-landed-cost`,
    type: "website",
    images: [{ url: `${SITE_URL}/og-default.png`, width: 1200, height: 630 }],
  },
};

export default function NetsuiteLandedCostPage() {
  return (
    <main className="pt-32 pb-24 sm:pt-40 sm:pb-32">
      <BreadcrumbJsonLd
        items={[
          { name: "Home", url: SITE_URL },
          { name: "NetSuite Landed Cost", url: `${SITE_URL}/netsuite-landed-cost` },
        ]}
      />
      <FaqJsonLd items={FAQ} />
      <ServiceJsonLd
        name="NetSuite Landed Cost Configuration"
        description="Landed cost template setup, allocation method configuration, late-arrival duty workflow, freight forwarder invoice automation, and landed cost reconciliation reporting for importers and distributors in NetSuite."
        url={`${SITE_URL}/netsuite-landed-cost`}
        serviceType="NetSuite Retail Configuration"
        offers={[
          { name: "Care", price: 799, description: "10 hours/month: landed cost template maintenance, allocation adjustments, reconciliation report review. Month-to-month after 3-month minimum." },
          { name: "Care Plus", price: 1499, description: "20 hours/month: landed cost setup, late-arrival workflow, freight forwarder invoice automation. Month-to-month." },
          { name: "Care Pro", price: 2499, description: "35 hours/month: full landed cost configuration, margin impact analysis, ongoing import cost accounting support. Month-to-month." },
        ]}
      />
      <OrganizationJsonLd />

      <div className="mx-auto max-w-3xl px-6 lg:px-8">
        <SectionHeading
          as="h1"
          eyebrow="Retail and E-Commerce"
          title="NetSuite Landed Cost"
          subtitle="Allocating freight, duty, and customs fees to inventory item costs in NetSuite requires enabling the feature, configuring templates and allocation methods, and handling late-arriving invoices from freight forwarders. SuitePacific sets up and maintains landed cost for importers and distributors already live on NetSuite."
          align="left"
        />

        <div className="mt-6 rounded-2xl border border-brand-100 bg-white p-5 shadow-soft">
          <LeadFormLight />
        </div>
        <p className="mt-3 text-xs text-brand-400">NetSuite-certified · Retail specialists · Month-to-month</p>
        <p className="mt-3 text-xs text-brand-300">Last updated September 2026</p>

        <p className="mt-8 text-sm text-brand-400">
          <strong>Landed cost in NetSuite</strong> refers to the configuration that allocates freight, duty, insurance, and other import charges to the individual inventory items in a receipt so that the inventory cost on the balance sheet reflects the true cost to land goods at the warehouse. Standard NetSuite supports landed cost allocation but does not automate late-arriving charges, allocate across multiple receipts in a shipment, or generate margin reports that compare landed cost to selling price.
        </p>

        <div className="mt-6 rounded-2xl border-l-4 border-accent bg-brand-50/50 p-5">
          <p className="text-xs font-semibold uppercase tracking-wide text-accent mb-2">Quick answer</p>
          <p className="text-sm text-brand-700 leading-relaxed">
            SuitePacific configures NetSuite landed cost for importers and distributors who need freight, duty, and
            customs fees allocated to inventory item costs rather than expensed directly. Landed cost in NetSuite is not
            active by default; enabling it and using it correctly requires landed cost categories for each cost type,
            templates assigned to vendors or item categories, and the right allocation method (quantity, weight, volume,
            or value) matched to each cost category. Duty and customs invoices from freight forwarders often arrive weeks
            after receiving; handling these late arrivals without misstating margins requires a defined procedure. Incorrect
            landed cost produces understated item costs, low COGS, and inflated margin reports on imported goods. SuitePacific
            is an Oracle-certified NetSuite firm (SuiteCloud Developer II and Administrator Professional) that handles the
            full landed cost setup, late-arrival workflow, and reconciliation reporting for companies already live on NetSuite.
            Plans start at $799 per month.
          </p>
        </div>

        {/* Allocation methods */}
        <div className="mt-14">
          <h2 className="text-lg font-semibold text-brand-900 mb-2">The four NetSuite landed cost allocation methods</h2>
          <p className="text-sm text-brand-400 mb-5">
            NetSuite supports four allocation methods. Each cost category in a landed cost template gets its own method.
            Duty and customs are almost always allocated by value; freight is allocated by weight or volume depending on
            how the carrier prices the shipment. Using the wrong method produces item costs that do not reflect the actual
            economics of the import.
          </p>
          <div className="overflow-x-auto rounded-2xl border border-brand-100">
            <table className="w-full text-sm min-w-[480px]">
              <thead>
                <tr className="border-b border-brand-100 bg-brand-50/50">
                  <th className="text-left p-4 font-semibold text-brand-900">Method</th>
                  <th className="text-left p-4 font-semibold text-brand-900">How it allocates</th>
                  <th className="text-left p-4 font-semibold text-brand-900">Best fit</th>
                </tr>
              </thead>
              <tbody>
                {ALLOCATION_METHODS.map((row, i) => (
                  <tr key={row.method} className={i < ALLOCATION_METHODS.length - 1 ? "border-b border-brand-100" : ""}>
                    <td className="p-4 font-medium text-brand-700 align-top whitespace-nowrap">{row.method}</td>
                    <td className="p-4 text-brand-400 align-top text-[13px]">{row.description}</td>
                    <td className="p-4 text-brand-400 align-top text-[13px]">{row.bestFor}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Where it breaks */}
        <div className="mt-14">
          <h2 className="text-lg font-semibold text-brand-900 mb-6">Where does NetSuite landed cost break down without proper configuration?</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            {PAIN_POINTS.map((item) => (
              <Card key={item.title} className="p-5 flex flex-col gap-3">
                <IconBadge icon={item.icon} />
                <h3 className="font-semibold text-brand-900 text-sm">{item.title}</h3>
                <p className="text-sm text-brand-400">{item.description}</p>
              </Card>
            ))}
          </div>
        </div>

        {/* What SuitePacific builds */}
        <div className="mt-14">
          <h2 className="text-lg font-semibold text-brand-900 mb-2">What does SuitePacific configure for NetSuite landed cost?</h2>
          <p className="text-sm text-brand-400 mb-6">
            Every landed cost engagement starts by reviewing the current import cost accounting: which costs are being
            expensed directly rather than allocated, which vendors and item categories have inconsistent or missing landed
            cost templates, and what the current margin variance is between reported and actual margins on imported goods.
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            {WHAT_WE_BUILD.map((item) => (
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

        {/* Why SuitePacific */}
        <div className="mt-14 rounded-2xl border-2 border-accent/30 bg-gradient-to-br from-accent/5 to-transparent p-6">
          <p className="text-xs font-semibold uppercase tracking-wide text-accent mb-3">Why SuitePacific for NetSuite landed cost</p>
          <h2 className="text-base font-semibold text-brand-900 mb-3">
            The NetSuite partner importers and distributors use when freight and duty are not making it into item costs.
          </h2>
          <p className="text-sm text-brand-500 mb-4">
            SuitePacific is a boutique NetSuite consulting firm focused on post-go-live support and custom development.
            Landed cost setup, import cost accounting, and margin reporting are recurring deliverables for the wholesale
            distribution and retail e-commerce accounts we support.
          </p>
          <ul className="space-y-2 text-sm text-brand-500 mb-4">
            <li className="flex items-start gap-2"><span className="text-accent font-bold mt-0.5">→</span> Oracle NetSuite Certified SuiteCloud Developer II and Administrator Professional</li>
            <li className="flex items-start gap-2"><span className="text-accent font-bold mt-0.5">→</span> Allocation method selection backed by review of actual import cost structure, not defaults</li>
            <li className="flex items-start gap-2"><span className="text-accent font-bold mt-0.5">→</span> Late-arrival workflow and reconciliation report included in every landed cost engagement</li>
            <li className="flex items-start gap-2"><span className="text-accent font-bold mt-0.5">→</span> Direct access to the developer doing the work, not a support queue</li>
            <li className="flex items-start gap-2"><span className="text-accent font-bold mt-0.5">→</span> US-based, month-to-month after a three-month minimum, starting at $799/month</li>
          </ul>
          <p className="text-sm text-brand-400">
            Related:{" "}
            <Link href="/industries/retail-ecommerce" className="text-accent hover:underline">NetSuite for retail and e-commerce</Link>
            {" "}and{" "}
            <Link href="/industries/wholesale-distribution" className="text-accent hover:underline">NetSuite for wholesale distribution</Link>.
          </p>
        </div>

        <div className="mt-10 rounded-2xl border border-brand-100 bg-white p-5 shadow-soft">
          <p className="text-sm font-semibold text-brand-900 mb-1">Need landed cost configured or corrected?</p>
          <p className="text-sm text-brand-400 mb-4">
            Describe the current state: which import costs are being expensed rather than allocated, which vendors or
            item categories are missing templates, and what the margin discrepancy looks like. We will give a direct
            assessment of what needs to be fixed.
          </p>
          <LeadFormLight />
        </div>

        <div className="mt-10 rounded-2xl border border-brand-100 bg-brand-50/30 p-5 sm:p-6">
          <p className="text-sm font-semibold text-brand-900 mb-3">Related reading</p>
          <ul className="space-y-2.5">
            <li className="text-sm text-brand-400">
              <Link href="/netsuite-3pl-integration" className="text-accent hover:underline">
                NetSuite 3PL integration
              </Link>{" "}
              covers the data flows between NetSuite and third-party logistics providers, including inventory sync and returns processing.
            </li>
            <li className="text-sm text-brand-400">
              <Link href="/industries/wholesale-distribution" className="text-accent hover:underline">
                NetSuite for wholesale distribution
              </Link>{" "}
              covers purchase order management, inventory costing, and landed cost configuration for distributors.
            </li>
            <li className="text-sm text-brand-400">
              <Link href="/netsuite-data-migration" className="text-accent hover:underline">
                NetSuite data migration
              </Link>{" "}
              covers historical cost layer migration for companies moving to NetSuite from another system.
            </li>
            <li className="text-sm text-brand-400">
              <Link href="/netsuite-care" className="text-accent hover:underline">
                NetSuite managed support plans
              </Link>{" "}
              starting at $799/month cover ongoing landed cost maintenance, template updates, and import accounting support.
            </li>
          </ul>
        </div>

        <ServiceFaqSection items={FAQ} />

        <div className="mt-10 rounded-2xl border border-brand-100 bg-white p-5 shadow-soft">
          <p className="text-sm font-semibold text-brand-900 mb-1">Ready to get landed cost working correctly?</p>
          <p className="text-sm text-brand-400 mb-4">
            Tell us which import costs are missing from your item costs and what your current margin reporting looks like.
            We will scope what needs to be configured.
          </p>
          <LeadFormLight />
        </div>
      </div>
    </main>
  );
}

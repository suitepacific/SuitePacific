import type { Metadata } from "next";
import Link from "next/link";
import { CheckCircle2, XCircle } from "lucide-react";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { BreadcrumbJsonLd, FaqJsonLd, ServiceJsonLd, OrganizationJsonLd } from "@/components/seo/JsonLd";
import { ServiceFaqSection } from "@/components/ui/ServiceFaqSection";
import { LeadFormLight } from "@/components/sections/LeadFormLight";
import { SITE_URL } from "@/lib/content";

const COMPARISON_ROWS = [
  { task: "Status transition on WO update", suiteflow: "Yes", suitescript: "Not required" },
  { task: "Release notification to supervisor", suiteflow: "Yes", suitescript: "Not required" },
  { task: "Approval routing before release", suiteflow: "Yes", suitescript: "Not required" },
  { task: "Component availability check", suiteflow: "No", suitescript: "Yes (User Event Before Submit)" },
  { task: "Component deduction from inventory", suiteflow: "No", suitescript: "Yes (User Event After Submit)" },
  { task: "Finished goods posting", suiteflow: "No", suitescript: "Yes (User Event After Submit)" },
  { task: "Lot number assignment", suiteflow: "No", suitescript: "Yes (User Event After Submit)" },
  { task: "Variance calculation", suiteflow: "No", suitescript: "Yes (User Event After Submit)" },
  { task: "Variance journal entry", suiteflow: "No", suitescript: "Yes (User Event After Submit)" },
  { task: "Batch period-end WO close", suiteflow: "No", suitescript: "Yes (Map/Reduce script)" },
  { task: "Requires code", suiteflow: "No", suitescript: "Yes" },
];

const SUITEFLOW_CAPS = [
  {
    icon: CheckCircle2,
    title: "Status transitions",
    description:
      "SuiteFlow can trigger a field update or status change when a work order reaches a defined state. For example, automatically moving a WO to In Production when it is released from Planned.",
  },
  {
    icon: CheckCircle2,
    title: "Release notifications",
    description:
      "Sending an email to the production supervisor or planner when a work order is released to production. SuiteFlow handles this reliably without script deployment.",
  },
  {
    icon: CheckCircle2,
    title: "Approval routing",
    description:
      "Routing high-value work orders for manager approval before release. SuiteFlow approval workflows handle multi-level routing with email notification at each step.",
  },
  {
    icon: CheckCircle2,
    title: "Simple field updates",
    description:
      "Updating a priority flag, expected completion date, or work center assignment based on conditions at WO creation or status change. Straightforward field logic fits SuiteFlow.",
  },
];

const SUITEFLOW_LIMITS = [
  {
    icon: XCircle,
    title: "Cannot read component quantities or BOM data.",
    description:
      "SuiteFlow has no access to inventory transaction logic or assembly BOM records. It cannot check whether required components are on hand or reserve stock for a work order.",
  },
  {
    icon: XCircle,
    title: "Cannot create inventory transactions.",
    description:
      "Component deduction from inventory and finished goods receipts are inventory transactions. SuiteFlow cannot initiate these. Only SuiteScript can create and post inventory movement records.",
  },
  {
    icon: XCircle,
    title: "Cannot calculate or post variance.",
    description:
      "Work order variance requires reading planned cost from the BOM and actual cost from posted transactions, computing the difference, and posting a journal entry. This is entirely outside SuiteFlow.",
  },
  {
    icon: XCircle,
    title: "Cannot assign lot or serial numbers.",
    description:
      "Lot number assignment to finished goods and serial number tracking on completion require SuiteScript to interact with the inventory detail subrecord. SuiteFlow cannot write to these records.",
  },
];

const FAQ = [
  {
    question: "What can SuiteFlow do for work order automation in NetSuite?",
    answer:
      "SuiteFlow handles status transitions, release notifications, approval routing before a work order is released, and simple field updates based on date or amount conditions. It is well-suited for routing logic: routing a work order for approval, notifying the production supervisor on status change, or flagging overdue work orders. It cannot perform any data operations on inventory, costs, or lot numbers.",
  },
  {
    question: "What requires SuiteScript for work order automation?",
    answer:
      "Any operation that reads or writes inventory data, creates transactions, or performs calculations requires SuiteScript. This includes component deduction from inventory when a work order is completed, finished goods posting, lot number or serial number assignment to the output item, production variance calculation, variance journal entry posting, and batch period-end work order closing.",
  },
  {
    question: "What happens if component deduction is not automated?",
    answer:
      "Without automated component deduction, inventory remains overstated for components that have been consumed in production. The production team must manually issue components against each work order, which introduces timing gaps and manual entry errors. Inventory accuracy degrades over time, affecting purchasing decisions, MRP recommendations, and cost of goods calculations.",
  },
  {
    question: "How does lot assignment work in NetSuite work order automation?",
    answer:
      "For lot-tracked finished goods, NetSuite requires a lot number to be assigned to the output item when a work order is completed. A SuiteScript User Event script running After Submit on work order completion can automatically generate or assign the lot number based on the work order number, date, or a custom sequence. Without this automation, the production team must manually enter lot numbers at completion, which creates data quality risk for traceability.",
  },
  {
    question: "Can SuiteFlow and SuiteScript work together on work orders?",
    answer:
      "Yes. In most production automation builds, SuiteFlow handles the routing layer (approval before release, status-change notifications) while SuiteScript handles the data layer (component deduction, finished goods posting, lot assignment, variance posting). The two tools are complementary: SuiteFlow covers what it does well without requiring code deployment, and SuiteScript handles the operations that require direct data access.",
  },
  {
    question: "Who builds NetSuite work order automation with SuiteScript?",
    answer:
      "SuitePacific builds work order automation for manufacturing companies on NetSuite, including User Event scripts for component deduction, finished goods posting, lot assignment, and variance calculation; SuiteFlow workflows for approval routing and notifications; and Map/Reduce scripts for batch period-end processing. SuitePacific is Oracle NetSuite Certified (SuiteCloud Developer II and Administrator Professional) and works on a month-to-month basis starting at $799 per month.",
  },
];

export const metadata: Metadata = {
  title: "NetSuite Work Order Automation: SuiteFlow vs. SuiteScript",
  description:
    "SuiteFlow handles status transitions and notifications for work orders. Component deduction, finished goods posting, and variance require SuiteScript.",
  alternates: { canonical: "/netsuite-work-order-suiteflow-vs-suitescript" },
  openGraph: {
    title: "NetSuite Work Orders: SuiteFlow vs. SuiteScript",
    description:
      "SuiteFlow handles work order routing and notifications. Component deduction, lot assignment, finished goods posting, and variance calculation require SuiteScript. Both tools work together in most production automation builds.",
    url: `${SITE_URL}/netsuite-work-order-suiteflow-vs-suitescript`,
    type: "website",
    images: [{ url: `${SITE_URL}/og-default.png`, width: 1200, height: 630 }],
  },
};

export default function WorkOrderSuiteFlowVsSuiteScriptPage() {
  return (
    <main className="pt-32 pb-24 sm:pt-40 sm:pb-32">
      <BreadcrumbJsonLd
        items={[
          { name: "Home", url: SITE_URL },
          { name: "Work Order Automation", url: `${SITE_URL}/netsuite-work-order-suiteflow-vs-suitescript` },
        ]}
      />
      <FaqJsonLd items={FAQ} />
      <ServiceJsonLd
        name="NetSuite Work Order Automation: SuiteFlow vs. SuiteScript"
        description="Work order automation builds for manufacturers on NetSuite: SuiteFlow approval routing and SuiteScript for component deduction, lot assignment, finished goods posting, and variance calculation."
        url={`${SITE_URL}/netsuite-work-order-suiteflow-vs-suitescript`}
        serviceType="NetSuite Work Order Automation"
        offers={[
          { name: "Care", price: 799, description: "10 hours/month: work order automation scripts, SuiteFlow builds, and manufacturing SuiteScript development. Month-to-month after 3-month minimum." },
          { name: "Care Plus", price: 1499, description: "20 hours/month: active WO automation plus broader manufacturing NetSuite support. Month-to-month." },
          { name: "Care Pro", price: 2499, description: "35 hours/month: full manufacturing development including work order, BOM, and production reporting. Month-to-month." },
        ]}
      />
      <OrganizationJsonLd />

      <div className="mx-auto max-w-3xl px-6 lg:px-8">
        <SectionHeading
          as="h1"
          eyebrow="Manufacturing Automation"
          title="NetSuite Work Order Automation: SuiteFlow or SuiteScript?"
          subtitle="Understanding what SuiteFlow handles for manufacturing work orders and where SuiteScript is required for component deduction, lot assignment, and variance."
          align="left"
        />

        <div className="mt-6 rounded-2xl border border-brand-100 bg-white p-5 shadow-soft">
          <p className="text-sm text-brand-600 mb-3">
            Manufacturing company trying to automate work order completion in NetSuite? Tell us what your process needs
            to do automatically.
          </p>
          <LeadFormLight />
        </div>
        <p className="mt-3 text-xs text-brand-400">NetSuite-certified · Work order automation specialists · Month-to-month</p>
        <p className="mt-2 text-xs text-brand-300">Published October 2026</p>

        <div className="mt-6 rounded-2xl border border-brand-100 bg-brand-50/40 p-5">
          <p className="text-xs font-semibold uppercase tracking-wide text-accent mb-2">Quick answer</p>
          <p className="text-sm text-brand-700 leading-relaxed">
            NetSuite work order automation refers to the scripts and workflows that handle production events without
            manual intervention: releasing a work order, deducting components from inventory, posting finished goods,
            assigning lot numbers, and calculating cost variance. SuiteFlow is NetSuite&apos;s workflow tool; it handles
            routing logic such as status transitions, approval chains, and email notifications. It cannot access
            inventory data, create transactions, or perform cost calculations. SuiteScript User Event scripts run those
            operations: a Before Submit script validates component availability before a work order is released; an
            After Submit script on completion deducts components, posts finished goods, assigns lot numbers, and
            calculates variance. A Map/Reduce script can close batches of completed work orders at period end.
            SuiteFlow and SuiteScript work together in most production automation builds. Plans from SuitePacific start
            at $799 per month on a month-to-month basis after a three-month minimum.
          </p>
        </div>

        <div className="mt-14">
          <h2 className="text-lg font-semibold text-brand-900 mb-4">What can SuiteFlow do for work orders?</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            {SUITEFLOW_CAPS.map((item) => (
              <div key={item.title} className="rounded-2xl border border-brand-100 p-5 flex flex-col gap-3">
                <item.icon className="h-5 w-5 text-green-500 shrink-0" />
                <h3 className="font-semibold text-brand-900 text-sm">{item.title}</h3>
                <p className="text-sm text-brand-400">{item.description}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-14">
          <h2 className="text-lg font-semibold text-brand-900 mb-4">What SuiteFlow cannot do for work orders?</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            {SUITEFLOW_LIMITS.map((item) => (
              <div key={item.title} className="rounded-2xl border border-brand-100 p-5 flex flex-col gap-3">
                <item.icon className="h-5 w-5 text-red-400 shrink-0" />
                <h3 className="font-semibold text-brand-900 text-sm">{item.title}</h3>
                <p className="text-sm text-brand-400">{item.description}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-14">
          <h2 className="text-lg font-semibold text-brand-900 mb-3">What does SuiteScript do for work order automation?</h2>
          <p className="text-sm text-brand-400 mb-4">
            SuiteScript User Event scripts run on the work order record at specific lifecycle points:
          </p>
          <div className="space-y-4">
            <div className="rounded-2xl border border-brand-100 p-5">
              <h3 className="font-semibold text-brand-900 text-sm mb-2">Before Submit: validation</h3>
              <ul className="space-y-1.5 text-sm text-brand-400">
                <li className="flex items-start gap-2">
                  <span className="text-accent font-bold mt-0.5">→</span>
                  Validate that required components are on hand in the correct locations before the WO can be released
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-accent font-bold mt-0.5">→</span>
                  Validate that a lot number is assigned if the finished good is lot-tracked
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-accent font-bold mt-0.5">→</span>
                  Enforce required field completion before status progression
                </li>
              </ul>
            </div>
            <div className="rounded-2xl border border-brand-100 p-5">
              <h3 className="font-semibold text-brand-900 text-sm mb-2">After Submit on completion: data operations</h3>
              <ul className="space-y-1.5 text-sm text-brand-400">
                <li className="flex items-start gap-2">
                  <span className="text-accent font-bold mt-0.5">→</span>
                  Deduct component inventory from the locations specified on the work order
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-accent font-bold mt-0.5">→</span>
                  Post finished goods inventory to the designated bin or location
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-accent font-bold mt-0.5">→</span>
                  Assign output lot numbers or serial numbers to the finished item
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-accent font-bold mt-0.5">→</span>
                  Calculate work order variance (planned cost vs. actual cost)
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-accent font-bold mt-0.5">→</span>
                  Post a variance journal entry if the variance exceeds a threshold
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-accent font-bold mt-0.5">→</span>
                  Update the work order with actual quantities and cost totals
                </li>
              </ul>
            </div>
            <div className="rounded-2xl border border-brand-100 p-5">
              <h3 className="font-semibold text-brand-900 text-sm mb-2">Map/Reduce: batch processing</h3>
              <ul className="space-y-1.5 text-sm text-brand-400">
                <li className="flex items-start gap-2">
                  <span className="text-accent font-bold mt-0.5">→</span>
                  Close all completed work orders in batch at period end
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-accent font-bold mt-0.5">→</span>
                  Generate a summary variance report across all WOs closed in the period
                </li>
              </ul>
            </div>
          </div>
        </div>

        <div className="mt-14">
          <h2 className="text-lg font-semibold text-brand-900 mb-3">
            Work order task comparison: SuiteFlow vs. SuiteScript
          </h2>
          <div className="overflow-x-auto rounded-2xl border border-brand-100">
            <table className="w-full text-sm min-w-[480px]">
              <thead>
                <tr className="border-b border-brand-100 bg-brand-50/50">
                  <th className="text-left p-4 font-semibold text-brand-900">Task</th>
                  <th className="text-left p-4 font-semibold text-brand-900">SuiteFlow</th>
                  <th className="text-left p-4 font-semibold text-brand-900">SuiteScript</th>
                </tr>
              </thead>
              <tbody>
                {COMPARISON_ROWS.map((row, i) => (
                  <tr key={row.task} className={i < COMPARISON_ROWS.length - 1 ? "border-b border-brand-100" : ""}>
                    <td className="p-4 font-medium text-brand-700 align-top text-[13px]">{row.task}</td>
                    <td className="p-4 align-top text-[13px]">
                      <span className={row.suiteflow === "Yes" ? "text-green-600 font-medium" : "text-brand-300"}>
                        {row.suiteflow}
                      </span>
                    </td>
                    <td className="p-4 align-top text-[13px]">
                      <span className={row.suitescript.startsWith("Yes") ? "text-green-600 font-medium" : "text-brand-300"}>
                        {row.suitescript}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        <div className="mt-14">
          <h2 className="text-lg font-semibold text-brand-900 mb-3">
            When does work order automation use SuiteFlow alone?
          </h2>
          <p className="text-sm text-brand-400">
            SuiteFlow alone is appropriate when the automation requirement is purely routing or notification: send an
            email when a work order is released, require manager approval before a high-value WO can proceed, or
            update a status field when a due date passes. If the manufacturing process does not require component
            deduction automation, lot number assignment, or variance tracking, SuiteFlow delivers the needed
            automation without code deployment or script maintenance.
          </p>
        </div>

        <div className="mt-14">
          <h2 className="text-lg font-semibold text-brand-900 mb-3">
            When does work order automation require SuiteScript?
          </h2>
          <p className="text-sm text-brand-400">
            SuiteScript is required as soon as the automation touches inventory, costs, or traceability data. If the
            goal is to deduct components automatically when a work order is completed, post finished goods to inventory,
            enforce lot number entry, or calculate and post production variance, SuiteScript is the only path. Most
            manufacturers with more than a handful of work orders per month find that manual component deduction and
            variance tracking are the first processes they want automated.
          </p>
        </div>

        <div className="mt-14 rounded-2xl border border-brand-100 bg-brand-50/30 p-5 sm:p-6">
          <p className="text-sm font-semibold text-brand-900 mb-3">Related reading</p>
          <ul className="space-y-2.5">
            <li className="text-sm text-brand-400">
              <Link href="/netsuite-work-orders" className="text-accent hover:underline">
                NetSuite work orders
              </Link>{" "}
              covers the work order record structure, statuses, and component issuance model.
            </li>
            <li className="text-sm text-brand-400">
              <Link href="/industries/manufacturing" className="text-accent hover:underline">
                NetSuite support for manufacturing companies
              </Link>{" "}
              covers the full scope of post-go-live support for manufacturers.
            </li>
            <li className="text-sm text-brand-400">
              <Link href="/netsuite-suitescript-development" className="text-accent hover:underline">
                NetSuite SuiteScript development
              </Link>{" "}
              covers User Event, Map/Reduce, and Suitelet script builds for manufacturing accounts.
            </li>
            <li className="text-sm text-brand-400">
              <Link href="/netsuite-workflow-automation" className="text-accent hover:underline">
                NetSuite workflow automation
              </Link>{" "}
              covers SuiteFlow approval chains and notification workflows for manufacturing.
            </li>
          </ul>
        </div>

        <div className="mt-10 rounded-2xl border border-brand-100 bg-white p-5 shadow-soft">
          <p className="text-sm font-semibold text-brand-900 mb-1">Ready to automate work orders in NetSuite?</p>
          <p className="text-sm text-brand-400 mb-4">
            Tell us what your production process needs to do automatically and what is currently manual. We will scope
            the SuiteFlow and SuiteScript build.
          </p>
          <LeadFormLight />
        </div>

        <ServiceFaqSection items={FAQ} />

        <div className="mt-10 rounded-2xl border border-brand-100 bg-white p-5 shadow-soft">
          <p className="text-sm font-semibold text-brand-900 mb-1">Need work order automation built in NetSuite?</p>
          <p className="text-sm text-brand-400 mb-4">
            Tell us about your manufacturing process and what automation your production team needs. We will give a
            direct assessment.
          </p>
          <LeadFormLight />
        </div>
      </div>
    </main>
  );
}

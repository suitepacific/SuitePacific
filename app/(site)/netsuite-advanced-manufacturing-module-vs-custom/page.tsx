import type { Metadata } from "next";
import Link from "next/link";
import { CheckCircle2, XCircle } from "lucide-react";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { BreadcrumbJsonLd, FaqJsonLd, ServiceJsonLd, OrganizationJsonLd } from "@/components/seo/JsonLd";
import { ServiceFaqSection } from "@/components/ui/ServiceFaqSection";
import { LeadFormLight } from "@/components/sections/LeadFormLight";
import { SITE_URL } from "@/lib/content";

const COMPARISON_ROWS = [
  { capability: "WO completion automation", scripts: "Yes (User Event scripts)", module: "Yes (included)" },
  { capability: "Component deduction", scripts: "Yes (User Event After Submit)", module: "Yes (included)" },
  { capability: "WIP costing level", scripts: "Work order level", module: "Operation level (per routing step)" },
  { capability: "Operation-level variance", scripts: "No", module: "Yes (routing step costing)" },
  { capability: "Work center management", scripts: "No (custom fields only)", module: "Yes (formal capacity definitions)" },
  { capability: "Shop floor mobile interface", scripts: "No", module: "Yes (operator-facing screens)" },
  { capability: "Labor time by operation", scripts: "No", module: "Yes (tracked per routing step)" },
  { capability: "Annual licensing cost", scripts: "SuiteScript development hours only", module: "Significant per-user license uplift" },
];

const MODULE_ADDS = [
  {
    icon: CheckCircle2,
    title: "Manufacturing routing",
    description:
      "Defines work centers and operation sequences for a production run. Each routing step has a defined work center, expected time, and cost rate, enabling step-level tracking across the production process.",
  },
  {
    icon: CheckCircle2,
    title: "Work center management",
    description:
      "Formal capacity definitions for each work center: available machine hours, labor hours, and efficiency rates. Enables capacity utilization reporting against actual work order activity.",
  },
  {
    icon: CheckCircle2,
    title: "Labor time tracking by operation",
    description:
      "Operators log time against specific routing steps on a work order, not just the work order as a whole. This allows cost tracking and variance analysis at the operation level rather than only at the WO level.",
  },
  {
    icon: CheckCircle2,
    title: "Shop floor control with mobile interface",
    description:
      "An operator-facing screen that allows the production team to clock in to operations, record completions, and view work queue from a shop floor device without a full NetSuite license.",
  },
];

const SCRIPTS_COVER = [
  {
    icon: CheckCircle2,
    title: "Work order completion automation",
    description:
      "User Event scripts automate component deduction, finished goods posting, lot number assignment, and status transitions when a work order is marked complete. This is the most common production automation need.",
  },
  {
    icon: CheckCircle2,
    title: "Production variance at WO level",
    description:
      "SuiteQL queries and saved searches showing planned vs. actual cost at the work order level. Suitable for manufacturers who need overall WO cost variance without operation-level breakdowns.",
  },
  {
    icon: CheckCircle2,
    title: "Dashboard-based shop floor views",
    description:
      "Saved search portlets showing open work orders by status, work center, and due date on role-specific dashboards. Provides visibility without the Advanced Manufacturing shop floor module.",
  },
];

const SCRIPTS_CANNOT = [
  {
    icon: XCircle,
    title: "Operation-level costing",
    description:
      "Costing at the routing step level, showing the labor cost and overhead for each operation in a production run, genuinely requires the Advanced Manufacturing module. Scripts cannot replicate step-level cost tracking without the routing data structure the module provides.",
  },
  {
    icon: XCircle,
    title: "Formal work center capacity management",
    description:
      "The Advanced Manufacturing module provides the capacity definition layer for work centers. Custom scripts can add fields, but without the module there is no capacity bucket or work center loading report in NetSuite.",
  },
  {
    icon: XCircle,
    title: "Operator-facing mobile shop floor screens",
    description:
      "The shop floor control interface with operator login, operation clocking, and work queue is built into the Advanced Manufacturing module. A custom Suitelet can approximate this but requires significant development and lacks the native integration with routing steps.",
  },
];

const FAQ = [
  {
    question: "What is the NetSuite Advanced Manufacturing module?",
    answer:
      "The Advanced Manufacturing module is an add-on to NetSuite's standard Manufacturing functionality. It adds manufacturing routing (operation sequences and work center definitions), labor time tracking at the operation level, step-level costing (cost by routing operation rather than only by work order), work center capacity management, and a shop floor control interface with mobile operator screens. It is part of NetSuite Manufacturing Premium or available as a separate add-on.",
  },
  {
    question: "Do I need the Advanced Manufacturing module for work order automation?",
    answer:
      "No. Work order completion automation, including component deduction, finished goods posting, lot number assignment, and production variance at the work order level, can be built with SuiteScript without the Advanced Manufacturing module. The module is needed specifically for operation-level costing, formal work center capacity management, and the mobile shop floor interface. Manufacturers with simple assembly processes or single-step production typically do not need the module.",
  },
  {
    question: "What does operation-level costing mean in NetSuite?",
    answer:
      "Operation-level costing tracks the labor cost, overhead, and machine cost for each specific step in a production routing, rather than assigning all costs to the work order as a whole. For example, in a three-step process of cutting, forming, and finishing, operation-level costing shows the actual cost incurred at each step. This level of detail requires the Advanced Manufacturing module, which provides the routing step records that cost transactions attach to.",
  },
  {
    question: "Can custom SuiteScript replace the Advanced Manufacturing module?",
    answer:
      "Custom SuiteScript can replace the module for work order completion automation, component deduction, lot assignment, and WO-level variance. It cannot fully replicate operation-level costing or formal work center capacity management without the module providing the underlying routing data structure. The shop floor mobile interface can be approximated with a Suitelet but at significant development cost compared to using the built-in module screen.",
  },
  {
    question: "How do I decide between Advanced Manufacturing and custom scripts?",
    answer:
      "The decision comes down to whether operation-level costing, formal work center scheduling, or operator-facing mobile screens are genuinely required for your manufacturing process. If your production is single-step assembly or simple multi-step with no routing complexity, custom scripts handle WO completion, lot assignment, and WO-level variance at a fraction of the module licensing cost. If you need to know the labor cost at each operation step, or if your production team needs mobile shop floor screens, the Advanced Manufacturing module is the right investment.",
  },
  {
    question: "Who evaluates whether NetSuite Advanced Manufacturing is right for a manufacturing account?",
    answer:
      "SuitePacific assesses Advanced Manufacturing module suitability for manufacturers already live on NetSuite, reviewing production process complexity, costing requirements, and reporting needs to determine whether the module or targeted SuiteScript customizations are the better fit. This assessment is part of the ongoing engagement for manufacturing accounts on a retainer starting at $799 per month.",
  },
];

export const metadata: Metadata = {
  title: "NetSuite Advanced Manufacturing vs. Custom SuiteScript",
  description:
    "Custom SuiteScript covers most WO automation needs. Advanced Manufacturing adds operation-level costing, work center capacity, and mobile shop floor screens.",
  alternates: { canonical: "/netsuite-advanced-manufacturing-module-vs-custom" },
  openGraph: {
    title: "NetSuite Advanced Manufacturing vs. Custom SuiteScript",
    description:
      "Custom SuiteScript handles work order completion, lot assignment, and WO-level variance. The Advanced Manufacturing module adds operation-level costing, work center capacity, and shop floor mobile screens.",
    url: `${SITE_URL}/netsuite-advanced-manufacturing-module-vs-custom`,
    type: "website",
    images: [{ url: `${SITE_URL}/og-default.png`, width: 1200, height: 630 }],
  },
};

export default function AdvancedManufacturingVsCustomPage() {
  return (
    <main className="pt-32 pb-24 sm:pt-40 sm:pb-32">
      <BreadcrumbJsonLd
        items={[
          { name: "Home", url: SITE_URL },
          { name: "Advanced Manufacturing vs. Custom", url: `${SITE_URL}/netsuite-advanced-manufacturing-module-vs-custom` },
        ]}
      />
      <FaqJsonLd items={FAQ} />
      <ServiceJsonLd
        name="NetSuite Advanced Manufacturing Module vs. Custom SuiteScript"
        description="Assessment and development for manufacturers evaluating the Advanced Manufacturing module against targeted SuiteScript customizations for work order automation and production costing."
        url={`${SITE_URL}/netsuite-advanced-manufacturing-module-vs-custom`}
        serviceType="NetSuite Manufacturing Module Assessment"
        offers={[
          { name: "Care", price: 799, description: "10 hours/month: work order SuiteScript builds, module assessment, and manufacturing account support. Month-to-month after 3-month minimum." },
          { name: "Care Plus", price: 1499, description: "20 hours/month: manufacturing development including WO automation, BOM logic, and production reporting. Month-to-month." },
          { name: "Care Pro", price: 2499, description: "35 hours/month: full manufacturing support including Advanced Manufacturing module configuration or custom development. Month-to-month." },
        ]}
      />
      <OrganizationJsonLd />

      <div className="mx-auto max-w-3xl px-6 lg:px-8">
        <SectionHeading
          as="h1"
          eyebrow="NetSuite Manufacturing Module"
          title="NetSuite Advanced Manufacturing Module vs. Custom SuiteScript: Which Is Right?"
          subtitle="When the Advanced Manufacturing module adds value over custom SuiteScript, and when targeted scripts are the more cost-effective choice."
          align="left"
        />

        <div className="mt-6 rounded-2xl border border-brand-100 bg-white p-5 shadow-soft">
          <p className="text-sm text-brand-600 mb-3">
            Manufacturing company weighing the Advanced Manufacturing module against custom development? Tell us about
            your production process.
          </p>
          <LeadFormLight />
        </div>
        <p className="mt-3 text-xs text-brand-400">NetSuite-certified · Manufacturing module specialists · Month-to-month</p>
        <p className="mt-2 text-xs text-brand-300">Published October 2026</p>

        <div className="mt-6 rounded-2xl border border-brand-100 bg-brand-50/40 p-5">
          <p className="text-xs font-semibold uppercase tracking-wide text-accent mb-2">Quick answer</p>
          <p className="text-sm text-brand-700 leading-relaxed">
            The NetSuite Advanced Manufacturing module refers to the add-on to standard Manufacturing that adds
            manufacturing routing, operation-level costing, work center capacity management, labor time tracking by
            routing step, and a mobile shop floor control interface. It is part of Manufacturing Premium or available
            separately. Custom SuiteScript, without the module, can automate work order completion including component
            deduction, finished goods posting, lot number assignment, and work order level variance. It cannot provide
            operation-level costing or formal work center capacity management. The practical decision: manufacturers
            with simple assembly or single-step processes benefit from custom scripts at a fraction of the module
            licensing cost. Manufacturers who need to track the cost of each operation step separately, manage formal
            work center capacity, or give operators mobile shop floor screens should invest in the Advanced
            Manufacturing module. SuitePacific assesses both paths and recommends based on actual production
            complexity.
          </p>
        </div>

        <div className="mt-14">
          <h2 className="text-lg font-semibold text-brand-900 mb-4">
            What does the Advanced Manufacturing module add?
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            {MODULE_ADDS.map((item) => (
              <div key={item.title} className="rounded-2xl border border-brand-100 p-5 flex flex-col gap-3">
                <item.icon className="h-5 w-5 text-green-500 shrink-0" />
                <h3 className="font-semibold text-brand-900 text-sm">{item.title}</h3>
                <p className="text-sm text-brand-400">{item.description}</p>
              </div>
            ))}
          </div>
          <p className="mt-4 text-sm text-brand-400">
            The module has a significant per-user licensing cost compared to standard Manufacturing. Evaluate it when
            the capabilities above are genuinely required, not as a default upgrade.
          </p>
        </div>

        <div className="mt-14">
          <h2 className="text-lg font-semibold text-brand-900 mb-4">
            What can custom SuiteScript do without the module?
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 mb-4">
            {SCRIPTS_COVER.map((item) => (
              <div key={item.title} className="rounded-2xl border border-brand-100 p-5 flex flex-col gap-3">
                <item.icon className="h-5 w-5 text-green-500 shrink-0" />
                <h3 className="font-semibold text-brand-900 text-sm">{item.title}</h3>
                <p className="text-sm text-brand-400">{item.description}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-14">
          <h2 className="text-lg font-semibold text-brand-900 mb-4">
            What custom scripts cannot do without the module?
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            {SCRIPTS_CANNOT.map((item) => (
              <div key={item.title} className="rounded-2xl border border-brand-100 p-5 flex flex-col gap-3">
                <item.icon className="h-5 w-5 text-red-400 shrink-0" />
                <h3 className="font-semibold text-brand-900 text-sm">{item.title}</h3>
                <p className="text-sm text-brand-400">{item.description}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-14">
          <h2 className="text-lg font-semibold text-brand-900 mb-3">
            Capability comparison: standard plus scripts vs. Advanced Manufacturing
          </h2>
          <div className="overflow-x-auto rounded-2xl border border-brand-100">
            <table className="w-full text-sm min-w-[520px]">
              <thead>
                <tr className="border-b border-brand-100 bg-brand-50/50">
                  <th className="text-left p-4 font-semibold text-brand-900">Capability</th>
                  <th className="text-left p-4 font-semibold text-brand-900">Standard + custom scripts</th>
                  <th className="text-left p-4 font-semibold text-brand-900">With Advanced Manufacturing module</th>
                </tr>
              </thead>
              <tbody>
                {COMPARISON_ROWS.map((row, i) => (
                  <tr key={row.capability} className={i < COMPARISON_ROWS.length - 1 ? "border-b border-brand-100" : ""}>
                    <td className="p-4 font-medium text-brand-700 align-top">{row.capability}</td>
                    <td className="p-4 text-brand-400 align-top text-[13px]">{row.scripts}</td>
                    <td className="p-4 text-brand-700 align-top text-[13px]">{row.module}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        <div className="mt-14">
          <h2 className="text-lg font-semibold text-brand-900 mb-3">
            When is custom SuiteScript the right choice over the module?
          </h2>
          <p className="text-sm text-brand-400">
            Custom scripts are the right choice when the manufacturing process is single-step assembly or simple
            multi-step with no routing complexity, when WO-level cost variance is sufficient (operation breakdown
            is not required), and when the production team does not need formal work center capacity management or
            operator-facing mobile screens. In this scenario, scripts deliver the automation at a fraction of the
            module licensing cost, with no additional per-user fees and no separate module configuration to maintain.
          </p>
        </div>

        <div className="mt-14">
          <h2 className="text-lg font-semibold text-brand-900 mb-3">
            When is the Advanced Manufacturing module worth the licensing cost?
          </h2>
          <p className="text-sm text-brand-400">
            The module is worth the investment when the finance team needs to see the cost breakdown by operation
            step (not just per work order), when work center capacity is formally managed and planners need to see
            loading by work center, or when the production team requires operator-facing mobile screens that integrate
            with routing steps. These are capabilities the module provides natively that scripts alone cannot match.
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
              covers User Event and Map/Reduce script builds for manufacturing accounts.
            </li>
            <li className="text-sm text-brand-400">
              <Link href="/netsuite-work-order-suiteflow-vs-suitescript" className="text-accent hover:underline">
                NetSuite work orders: SuiteFlow vs. SuiteScript
              </Link>{" "}
              covers what SuiteFlow and SuiteScript each handle in work order automation.
            </li>
          </ul>
        </div>

        <div className="mt-10 rounded-2xl border border-brand-100 bg-white p-5 shadow-soft">
          <p className="text-sm font-semibold text-brand-900 mb-1">Evaluating the Advanced Manufacturing module?</p>
          <p className="text-sm text-brand-400 mb-4">
            Tell us about your production process and what you are trying to track. We will give a direct assessment
            of whether the module or custom scripts are the right fit.
          </p>
          <LeadFormLight />
        </div>

        <ServiceFaqSection items={FAQ} />

        <div className="mt-10 rounded-2xl border border-brand-100 bg-white p-5 shadow-soft">
          <p className="text-sm font-semibold text-brand-900 mb-1">Need a manufacturing module assessment?</p>
          <p className="text-sm text-brand-400 mb-4">
            Tell us about your manufacturing account and what capabilities you need. We will scope the right solution.
          </p>
          <LeadFormLight />
        </div>
      </div>
    </main>
  );
}

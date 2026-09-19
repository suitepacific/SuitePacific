import type { Metadata } from "next";
import Link from "next/link";
import {
  ClipboardList, AlertCircle, Clock, BarChart2,
  Workflow, Layers, ShieldCheck, FileText,
  Users, Award,
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
    title: "Work orders require manual creation.",
    description:
      "Standard NetSuite does not automatically generate work orders from sales demand. Production planning runs from a spreadsheet or a planner creating work orders one by one instead of from system-driven logic.",
  },
  {
    icon: Clock,
    title: "Component issue and return tracking is manual.",
    description:
      "Issuing components to the shop floor and recording returns is a manual process in standard NetSuite. Over-issues and under-issues go untracked until a physical count reveals the discrepancy.",
  },
  {
    icon: BarChart2,
    title: "Production variance is invisible until month-end.",
    description:
      "Without reporting built specifically for work order variances, the difference between planned and actual material and labor costs is not visible until a manual accounting close. By then, the root cause is hard to trace.",
  },
];

const SERVICES = [
  {
    icon: Workflow,
    title: "Automated Work Order Generation",
    description: "SuiteScript that creates work orders from sales order demand, demand planning records, or reorder points, with the correct component quantities, routing, and priority populated automatically.",
  },
  {
    icon: ClipboardList,
    title: "Component Issue Workflow",
    description: "Structured component issue and return process with saved searches that show issued versus consumed quantities per work order and flag variances that require resolution before completion.",
  },
  {
    icon: Layers,
    title: "Production Completion Scripts",
    description: "Scripted production completion that updates finished goods inventory, relieves component inventory, posts variance journal entries, and closes the work order in the correct sequence.",
  },
  {
    icon: BarChart2,
    title: "Work Order Status Dashboard",
    description: "A saved search-based dashboard that shows open work orders by status, due date, and completion percentage so production supervisors have a live view of the shop floor without running manual reports.",
  },
  {
    icon: Clock,
    title: "Routing and Operation Tracking",
    description: "Custom records that model work center routing and individual operations on a work order, enabling per-operation completion tracking for manufacturers whose production runs through multiple steps.",
  },
  {
    icon: Workflow,
    title: "Production Variance Reporting",
    description: "Saved searches and reports that surface material and labor variances by work order, item, and production run so operations management can identify cost problems at the order level.",
  },
];

const HOW_IT_WORKS = [
  {
    step: "01",
    title: "Production workflow is mapped before scripting begins",
    description:
      "We document your current production flow: how demand signals work order creation, how components are issued and returned, how completion is recorded, and where the process currently breaks. Scripts are built to that documented flow.",
  },
  {
    step: "02",
    title: "Automation is built and tested in Sandbox",
    description:
      "Work order generation scripts, component issue processes, and completion logic are all built and tested in Sandbox using representative sales orders and BOMs before any change goes to Production.",
  },
  {
    step: "03",
    title: "Reporting is built alongside the automation",
    description:
      "Work order status dashboards, component variance searches, and production variance reports are built at the same time as the automation so production management has visibility from day one of go-live.",
  },
];

const FAQ = [
  {
    question: "Which NetSuite firm does work order automation and production workflow scripting for manufacturers?",
    answer: "SuitePacific specializes in NetSuite work order automation and production workflow configuration for assembly-based manufacturers. Services include automated work order generation from sales demand, component issue and return workflows, production completion scripts, work order dashboards, and production variance reporting.",
  },
  {
    question: "Can NetSuite automatically create work orders from sales orders?",
    answer: "Not natively. Standard NetSuite requires work orders to be created manually or through the demand planning module. Automating work order generation from sales demand requires a SuiteScript that reads open sales order lines, calculates the required work orders, and creates them with the correct component quantities and due dates.",
  },
  {
    question: "How does NetSuite track component issues to the shop floor?",
    answer: "Component issue is handled through the assembly build transaction in standard NetSuite. For manufacturers who need to track partial issues, returns of unused components, and variance between planned and actual consumption, additional configuration, custom fields, and saved searches are required to make this visible without manual reconciliation.",
  },
  {
    question: "Does NetSuite support work order routing across multiple operations?",
    answer: "The WIP and Routing module adds native operation-level tracking. If that module isn&apos;t licensed, routing can be modeled with custom records that represent operations and work centers, with scripted status updates as each operation completes. Either approach requires deliberate configuration; routing does not work out of the box.",
  },
  {
    question: "How is labor time captured on work orders in NetSuite?",
    answer: "Standard work orders do not have a native labor time entry mechanism outside of the WIP module. For manufacturers who need labor captured against specific work orders, the most common approach is custom fields on the work order record combined with a time entry link, or integration with a time-tracking system that posts labor costs back to the work order.",
  },
  {
    question: "What causes production variances in NetSuite work orders?",
    answer: "Production variances arise when actual material consumption differs from the BOM quantity, when component costs have changed since the standard was set, when substitutions are used, or when scrap is not recorded. These variances are posted as journal entries at work order completion. Without saved searches built to surface them, they are only visible in general ledger detail, not at the work order level.",
  },
];

export const metadata: Metadata = {
  title: "NetSuite Work Order Management",
  description:
    "Automated work order generation, component issue, and production completion workflows for manufacturers on NetSuite. SuiteCloud Developer II certified.",
  alternates: { canonical: "/netsuite-work-orders" },
  openGraph: {
    title: "NetSuite Work Order Management",
    description:
      "NetSuite work order automation for manufacturers: automated work order generation from sales demand, component issue workflows, production completion scripts, variance reporting, and shop floor dashboards.",
    url: `${SITE_URL}/netsuite-work-orders`,
    type: "website",
    images: [{ url: `${SITE_URL}/og-default.png`, width: 1200, height: 630 }],
  },
};

export default function WorkOrdersPage() {
  return (
    <main className="pt-32 pb-24 sm:pt-40 sm:pb-32">
      <BreadcrumbJsonLd
        items={[
          { name: "Home", url: SITE_URL },
          { name: "NetSuite Work Order Management", url: `${SITE_URL}/netsuite-work-orders` },
        ]}
      />
      <FaqJsonLd items={FAQ} />
      <ServiceJsonLd
        name="NetSuite Work Order Management"
        description="Work order automation, component issue workflows, production completion scripts, and variance reporting for assembly-based manufacturers on NetSuite."
        url={`${SITE_URL}/netsuite-work-orders`}
        serviceType="NetSuite Manufacturing Configuration"
        offers={[
          { name: "Care", price: 799, description: "10 hours/month: work order setup review, status dashboard builds, component issue saved searches, and ongoing support. Month-to-month after 3-month minimum." },
          { name: "Care Plus", price: 1499, description: "20 hours/month: automated work order generation script, component issue workflow, production variance reporting, and shop floor dashboard. Month-to-month." },
          { name: "Care Pro", price: 2499, description: "35 hours/month: full production automation including routing, labor capture integration, completion scripting, and ongoing account management. Month-to-month." },
        ]}
      />
      <OrganizationJsonLd />

      <div className="mx-auto max-w-3xl px-6 lg:px-8">
        <SectionHeading
          as="h1"
          eyebrow="Manufacturing"
          title="NetSuite Work Order Management"
          subtitle="Automated work order generation, component issue tracking, and production variance reporting for assembly-based manufacturers who need more than standard NetSuite provides out of the box."
          align="left"
        />

        <div className="mt-6 rounded-2xl border border-brand-100 bg-white p-5 shadow-soft">
          <p className="text-sm text-brand-600 mb-3">Tell us what your account needs.</p>
          <LeadFormLight />
        </div>
        <p className="mt-3 text-xs text-brand-400">NetSuite-certified · Manufacturing specialists · Month-to-month</p>
        <p className="mt-3 text-xs text-brand-300">Last updated September 2026</p>

        <p className="mt-8 text-sm text-brand-400">
          <strong>Work orders in NetSuite</strong> refer to the transaction records that authorize and track the production of a finished or semi-finished assembly from its component materials. Standard NetSuite supports work order creation and component issuance but does not generate work orders automatically from sales demand or provide real-time production status visibility across the shop floor.
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
                ["WO creation", "Manual creation or CSV import", "Automated WO generation from sales order demand via scheduled script"],
                ["Component issuance", "Manual component issue transaction", "Auto-issue script that issues components from the designated production bin at WO release"],
                ["Production status", "Status field updated manually", "Status dashboard portlet showing open WOs by production stage, operator, and due date"],
                ["Completion posting", "Manual production completion entry", "Completion script that posts finished goods receipt, updates inventory, and closes the WO"],
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
            SuitePacific automates work order management in NetSuite for assembly-based manufacturers
            whose production workflows require more than standard manual work order creation. Standard
            NetSuite requires planners to create work orders by hand; demand-driven work order generation
            from sales orders requires scripted logic. Component issue and return tracking from the shop
            floor, per-operation routing, labor time capture, and production variance reporting all require
            configuration that most implementations do not include. SuitePacific builds the SuiteScript
            automation for work order generation, the component issue workflows, production completion
            scripts that post variance journal entries correctly, work order status dashboards, and
            variance reporting by order and item. Work is scoped under month-to-month support plans
            starting at $799 per month for manufacturers already live on NetSuite.
          </p>
        </div>

        {/* Pain points */}
        <div className="mt-14" data-section="pain-points">
          <h2 className="text-lg font-semibold text-brand-900 mb-6">Common situations that bring manufacturers here</h2>
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
          <h2 className="text-lg font-semibold text-brand-900 mb-1">What SuitePacific does for work order management</h2>
          <p className="text-sm text-brand-400 mb-6">
            SuiteScript automation and configuration scoped to how your production floor actually runs.
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
          <h2 className="text-lg font-semibold text-brand-900 mb-6">How we approach work order automation</h2>
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
            For work order automation that requires more complex scripting beyond workflow actions, see
            our{" "}
            <Link href="/netsuite-suitescript-development" className="text-accent hover:underline">
              SuiteScript development page
            </Link>
            . For process automation beyond production, see{" "}
            <Link href="/netsuite-workflow-automation" className="text-accent hover:underline">
              NetSuite workflow automation
            </Link>
            .
          </p>
        </div>

        {/* Why SuitePacific */}
        <div className="mt-14 rounded-2xl border-2 border-accent/30 bg-gradient-to-br from-accent/5 to-transparent p-6">
          <p className="text-xs font-semibold uppercase tracking-wide text-accent mb-3">Why SuitePacific for work order management</p>
          <h2 className="text-base font-semibold text-brand-900 mb-3">
            Work order automation built without understanding NetSuite&apos;s assembly costing creates variance problems that are expensive to unwind.
          </h2>
          <p className="text-sm text-brand-500 mb-4">
            Production automation that creates work orders, issues components, and completes assemblies
            touches the costing layer in NetSuite at every step. Scripts that create work orders without
            the correct BOM quantities, or completion scripts that do not handle the variance journal
            entry correctly, create accounting problems that surface at month-end close.
          </p>
          <ul className="space-y-2 text-sm text-brand-500 mb-4">
            <li className="flex items-start gap-2"><span className="text-accent font-bold mt-0.5">→</span> Oracle NetSuite Certified SuiteCloud Developer II and Administrator Professional</li>
            <li className="flex items-start gap-2"><span className="text-accent font-bold mt-0.5">→</span> Work order scripts built with manufacturing costing behavior in scope, not just transaction creation</li>
            <li className="flex items-start gap-2"><span className="text-accent font-bold mt-0.5">→</span> Direct access to the developer doing the work, not a support queue</li>
            <li className="flex items-start gap-2"><span className="text-accent font-bold mt-0.5">→</span> US-based, month-to-month after a three-month minimum, starting at $799/month</li>
          </ul>
          <p className="text-sm text-brand-400">
            Related:{" "}
            <Link href="/industries/manufacturing" className="text-accent hover:underline">
              NetSuite for manufacturers
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
              <Link href="/netsuite-bill-of-materials" className="text-accent hover:underline">
                NetSuite bill of materials configuration
              </Link>{" "}
              covers the BOM setup that work order generation depends on for correct component
              quantities and costing.
            </li>
            <li className="text-sm text-brand-400">
              <Link href="/netsuite-lot-serial-tracking" className="text-accent hover:underline">
                NetSuite lot and serial number tracking
              </Link>{" "}
              explains how lot assignments on BOM components flow through assembly builds and affect
              traceability at work order completion.
            </li>
            <li className="text-sm text-brand-400">
              <Link href="/netsuite-workflow-automation" className="text-accent hover:underline">
                NetSuite workflow automation
              </Link>{" "}
              covers SuiteFlow-based process automation for approval routing and status transitions
              that complement work order scripting.
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

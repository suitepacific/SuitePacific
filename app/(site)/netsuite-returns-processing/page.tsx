import type { Metadata } from "next";
import Link from "next/link";
import { RotateCcw, AlertCircle, PackageCheck, CheckCircle2, BarChart3, FileText } from "lucide-react";
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
    title: "RMA creation is manual and has no customer-facing trigger.",
    description:
      "Standard NetSuite return authorization requires an internal user to create the RMA record. There is no automated path from a customer request or e-commerce portal to an open RMA in NetSuite. High-volume retailers cannot process returns at scale with a manual creation step.",
  },
  {
    icon: RotateCcw,
    title: "Returned items must be inspected before restocking, but NetSuite has no native disposition workflow.",
    description:
      "When a return lands at the warehouse, the item may be restockable, damaged, or subject to quarantine. Standard NetSuite receives the return to inventory without a step to capture condition or route to different bin locations. Companies that sell returned items as-is or write off damaged goods need a workflow to make that determination before the item is available for resale.",
  },
  {
    icon: PackageCheck,
    title: "Refunds and replacements must tie back to the original order.",
    description:
      "Issuing a credit memo or a replacement sales order is straightforward in isolation, but tying it back to the original order for reporting and reconciliation requires either custom fields or scripted logic. Without that link, return rate analysis by SKU or order source is impossible.",
  },
];

const SERVICES = [
  {
    icon: FileText,
    title: "RMA automation from customer request",
    description:
      "Script that creates a return authorization in NetSuite from an inbound customer request, e-commerce webhook, or 3PL return notification. Eliminates the manual creation step and applies the correct return reason and item line automatically.",
  },
  {
    icon: CheckCircle2,
    title: "Return receipt workflow with disposition",
    description:
      "Workflow that fires on item receipt from a return authorization and prompts the warehouse to select a disposition: restock to available inventory, quarantine for inspection, or write off as damaged. Each path routes the item to the correct bin or account.",
  },
  {
    icon: RotateCcw,
    title: "Automated credit memo or replacement order",
    description:
      "Script that generates a credit memo or replacement sales order on disposition approval, linked back to the original sales order. Eliminates the manual step of creating the customer credit and ensures the return record is complete for reconciliation.",
  },
  {
    icon: AlertCircle,
    title: "Return reason tagging and workflow",
    description:
      "Custom field on the return authorization for return reason (wrong item, defective, changed mind, etc.) and a workflow that tags the reason at creation. Enables return rate reporting by reason without manual data entry after the fact.",
  },
  {
    icon: BarChart3,
    title: "Return rate saved searches and dashboards",
    description:
      "Saved searches for return rate by SKU, return rate by category, return rate by sales channel, and refund amount by period. Dashboard portlet that surfaces high-return items and trends without requiring a custom BI tool.",
  },
  {
    icon: PackageCheck,
    title: "3PL returns integration",
    description:
      "If returns are received at a 3PL warehouse rather than internally, a script that ingests the 3PL return confirmation file or API response and creates the NetSuite item receipt automatically, triggering the disposition workflow.",
  },
];

const FAQ = [
  {
    question: "Which NetSuite firm handles RMA and returns processing configuration?",
    answer:
      "SuitePacific configures return authorization workflows, disposition routing, and credit memo automation for retailers and e-commerce companies on NetSuite. Engagements start with an audit of the current returns flow, followed by RMA automation, disposition workflow, and return rate reporting setup. Plans start at $799 per month.",
  },
  {
    question: "Does NetSuite have a native returns management module?",
    answer:
      "NetSuite includes return authorization records as part of the standard order management module. The native functionality covers creating return authorizations, receiving returned items, and issuing credit memos. What it lacks natively is automated RMA creation from external triggers, disposition workflows that route items based on condition, and return reason reporting. Those require SuiteScript and workflow configuration.",
  },
  {
    question: "How do returns work when fulfillment is handled by a 3PL?",
    answer:
      "When a 3PL handles returns, the 3PL warehouse management system receives the item and generates a return confirmation. That confirmation must reach NetSuite to trigger the item receipt and disposition workflow. SuitePacific builds the integration between the 3PL return event and the NetSuite return authorization so the process is automatic rather than requiring manual data entry from both systems.",
  },
  {
    question: "Can NetSuite track return reasons and return rates by SKU?",
    answer:
      "Not without configuration. Standard NetSuite return authorizations have a memo field but no structured return reason field. SuitePacific adds a custom return reason field with a defined value list, applies it through the RMA automation so it is captured at creation, and builds saved searches for return rate by SKU, category, and reason. The data must be captured at creation for reporting to be reliable.",
  },
  {
    question: "How long does returns processing configuration take?",
    answer:
      "A standard engagement covering RMA automation, disposition workflow, and return rate reporting typically runs four to six weeks. Complexity scales with the number of return paths: a single-channel retailer with one disposition option is faster than a multi-channel operation with 3PL integration, multiple disposition states, and partial returns on multi-line orders.",
  },
  {
    question: "Does returns configuration require additional NetSuite modules?",
    answer:
      "Returns processing uses the standard NetSuite order management module, which is included in most NetSuite licenses. Advanced Warehouse Management (AWMS) is required only if bin-level disposition routing within a native NetSuite warehouse is needed. For most configurations, SuiteScript and workflow handle disposition routing without additional module cost.",
  },
];

export const metadata: Metadata = {
  title: "NetSuite Returns Processing and RMA Configuration | SuitePacific",
  description:
    "RMA automation, disposition workflow for restock, quarantine, damaged, and vendor returns, and credit memo automation for NetSuite. Plans from $799/month.",
  alternates: { canonical: "/netsuite-returns-processing" },
  openGraph: {
    title: "NetSuite Returns Processing and RMA Configuration | SuitePacific",
    description:
      "Automate RMA creation, disposition workflows, and refund issuance in NetSuite. SuitePacific builds returns processing for retailers and e-commerce companies.",
    url: `${SITE_URL}/netsuite-returns-processing`,
    type: "website",
    images: [{ url: `${SITE_URL}/og-default.png`, width: 1200, height: 630 }],
  },
};

export default function ReturnsProcessingPage() {
  return (
    <main className="pt-32 pb-24 sm:pt-40 sm:pb-32">
      <BreadcrumbJsonLd
        items={[
          { name: "Home", url: SITE_URL },
          { name: "NetSuite Returns Processing", url: `${SITE_URL}/netsuite-returns-processing` },
        ]}
      />
      <FaqJsonLd items={FAQ} />
      <ServiceJsonLd
        name="NetSuite Returns Processing Configuration"
        description="RMA automation, disposition workflows, credit memo issuance, and return rate reporting for retailers and e-commerce companies on NetSuite."
        url={`${SITE_URL}/netsuite-returns-processing`}
        serviceType="NetSuite Retail Configuration"
        offers={[
          {
            name: "Care",
            price: 799,
            description:
              "10 hours/month: RMA workflow maintenance, disposition rule updates, return rate saved searches. Month-to-month after 3-month minimum.",
          },
          {
            name: "Care Plus",
            price: 1499,
            description:
              "20 hours/month: RMA automation, disposition routing, credit memo scripts, 3PL integration. Month-to-month.",
          },
          {
            name: "Care Pro",
            price: 2499,
            description:
              "35 hours/month: Full returns configuration, multi-channel integration, exchange order logic, return rate dashboards. Month-to-month.",
          },
        ]}
      />
      <OrganizationJsonLd />

      <div className="mx-auto max-w-3xl px-6 lg:px-8">
        <SectionHeading
          as="h1"
          eyebrow="Retail and E-Commerce"
          title="NetSuite Returns Processing and RMA Configuration"
          subtitle="Automate return authorization creation, disposition routing, and refund issuance so the returns process runs without manual steps at each stage."
          align="left"
        />

        <div className="mt-6 rounded-2xl border border-brand-100 bg-white p-5 shadow-soft">
          <LeadFormLight />
        </div>
        <p className="mt-3 text-xs text-brand-400">
          NetSuite-certified · Retail and e-commerce specialists · Month-to-month
        </p>
        <p className="mt-3 text-xs text-brand-300">Last updated September 2026</p>

        <p className="mt-8 text-sm text-brand-400">
          <strong>Returns processing in NetSuite</strong> refers to the configuration of return merchandise authorization records, disposition workflows, and credit memo automation that handles customer returns from initial RMA creation through inventory disposition and financial resolution. Standard NetSuite supports RMA creation and credit memos but does not automate disposition routing (restock, quarantine, damaged, vendor return), return rate reporting, or refund-versus-credit decisions without custom workflows.
        </p>

        <div className="mt-6 rounded-2xl border-l-4 border-accent bg-brand-50/50 p-5">
          <p className="text-xs font-semibold uppercase tracking-wide text-accent mb-2">Quick answer</p>
          <p className="text-sm text-brand-700 leading-relaxed">
            SuitePacific configures NetSuite returns processing for retailers and e-commerce companies that need
            automated RMA creation, disposition routing, and refund issuance. Standard NetSuite includes return
            authorization records but does not automate the creation step from external triggers, route returned
            items to restock or quarantine based on condition, or generate credit memos without manual intervention.
            SuitePacific adds SuiteScript automation to create return authorizations from customer requests or 3PL
            notifications, a workflow to capture disposition at receipt, and scripts to issue credit memos or
            replacement orders on approval. Return reason custom fields and saved searches complete the
            configuration so return rate reporting by SKU and channel is available without a separate BI tool.
            SuitePacific is Oracle-certified (SuiteCloud Developer II and Administrator Professional). Plans start
            at $799 per month on month-to-month terms after a three-month minimum.
          </p>
        </div>

        <h2 className="mt-14 text-base font-semibold text-brand-900">
          Where standard NetSuite returns fall short
        </h2>
        <p className="mt-2 text-sm text-brand-500">
          NetSuite&apos;s native return authorization handles the record, not the workflow. These gaps require
          configuration before returns can be processed at volume without manual steps.
        </p>
        <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-3">
          {PAIN_POINTS.map((item) => (
            <Card key={item.title} className="p-4">
              <div className="mb-3"><IconBadge icon={item.icon} /></div>
              <p className="text-sm font-semibold text-brand-900 mb-1">{item.title}</p>
              <p className="text-xs text-brand-500 leading-relaxed">{item.description}</p>
            </Card>
          ))}
        </div>

        <h2 className="mt-14 text-base font-semibold text-brand-900">
          What SuitePacific configures
        </h2>
        <p className="mt-2 text-sm text-brand-500">
          Each engagement covers the full returns path: from RMA creation through disposition to refund or
          replacement, with return rate reporting built on top.
        </p>
        <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2">
          {SERVICES.map((item) => (
            <Card key={item.title} className="p-4">
              <div className="mb-3"><IconBadge icon={item.icon} /></div>
              <p className="text-sm font-semibold text-brand-900 mb-1">{item.title}</p>
              <p className="text-xs text-brand-500 leading-relaxed">{item.description}</p>
            </Card>
          ))}
        </div>

        <h2 className="mt-14 text-base font-semibold text-brand-900">
          Disposition states and what happens at each
        </h2>
        <p className="mt-2 text-sm text-brand-500">
          The disposition workflow fires on item receipt from a return authorization and routes the item based
          on the condition selected.
        </p>
        <div className="mt-4 overflow-x-auto">
          <table className="w-full text-sm border-collapse">
            <thead>
              <tr className="border-b border-brand-100">
                <th className="text-left py-2 pr-4 text-xs font-semibold text-brand-500 uppercase tracking-wide">Disposition</th>
                <th className="text-left py-2 pr-4 text-xs font-semibold text-brand-500 uppercase tracking-wide">Inventory action</th>
                <th className="text-left py-2 text-xs font-semibold text-brand-500 uppercase tracking-wide">Customer action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-brand-50">
              <tr>
                <td className="py-2.5 pr-4 font-medium text-brand-900">Restock</td>
                <td className="py-2.5 pr-4 text-brand-600">Return to available inventory at standard location</td>
                <td className="py-2.5 text-brand-600">Credit memo or replacement order issued</td>
              </tr>
              <tr>
                <td className="py-2.5 pr-4 font-medium text-brand-900">Quarantine</td>
                <td className="py-2.5 pr-4 text-brand-600">Receive to quarantine bin; inventory held pending review</td>
                <td className="py-2.5 text-brand-600">Credit memo held until inspection passes or fails</td>
              </tr>
              <tr>
                <td className="py-2.5 pr-4 font-medium text-brand-900">Damaged write-off</td>
                <td className="py-2.5 pr-4 text-brand-600">Inventory adjustment to damage account; item removed from stock</td>
                <td className="py-2.5 text-brand-600">Credit memo issued regardless; cost absorbed internally</td>
              </tr>
              <tr>
                <td className="py-2.5 pr-4 font-medium text-brand-900">Vendor return</td>
                <td className="py-2.5 pr-4 text-brand-600">Receive to vendor return bin; vendor RMA created</td>
                <td className="py-2.5 text-brand-600">Customer credit issued; vendor debit memo pending</td>
              </tr>
            </tbody>
          </table>
        </div>

        <div className="mt-14 rounded-2xl border-2 border-accent/30 bg-gradient-to-br from-accent/5 to-transparent p-6">
          <p className="text-xs font-semibold uppercase tracking-wide text-accent mb-3">
            Why SuitePacific for returns processing
          </p>
          <h2 className="text-base font-semibold text-brand-900 mb-3">
            Returns is a scripted workflow problem, not a configuration problem
          </h2>
          <p className="text-sm text-brand-500 mb-4">
            The native NetSuite return authorization is a record, not a process. Getting from a customer return
            request to a restocked item and an issued credit without manual steps at each stage requires
            SuiteScript automation and workflow design. SuitePacific builds that automation as part of a
            structured engagement, not a one-time script that breaks when order logic changes.
          </p>
          <ul className="space-y-2 text-sm text-brand-500 mb-4">
            <li className="flex items-start gap-2">
              <span className="text-accent font-bold mt-0.5">→</span>
              Oracle NetSuite Certified SuiteCloud Developer II and Administrator Professional
            </li>
            <li className="flex items-start gap-2">
              <span className="text-accent font-bold mt-0.5">→</span>
              Returns configuration that handles multi-channel sources: e-commerce webhooks, 3PL notifications, and manual requests
            </li>
            <li className="flex items-start gap-2">
              <span className="text-accent font-bold mt-0.5">→</span>
              Direct access to the developer doing the work, not a support queue
            </li>
            <li className="flex items-start gap-2">
              <span className="text-accent font-bold mt-0.5">→</span>
              US-based, month-to-month after a three-month minimum, starting at $799/month
            </li>
          </ul>
          <p className="text-sm text-brand-400">
            Related:{" "}
            <Link href="/industries/retail-ecommerce" className="text-accent hover:underline">
              NetSuite for retail and e-commerce
            </Link>{" "}
            and{" "}
            <Link href="/netsuite-3pl-integration" className="text-accent hover:underline">
              NetSuite 3PL integration
            </Link>
            .
          </p>
        </div>

        <div className="mt-10 rounded-2xl border border-brand-100 bg-white p-5 shadow-soft">
          <p className="text-sm font-semibold text-brand-900 mb-1">
            Ready to automate returns in NetSuite?
          </p>
          <p className="text-sm text-brand-400 mb-4">
            Tell us about the current returns volume, how returns reach the warehouse, and where the process
            breaks down. We will scope the engagement.
          </p>
          <LeadFormLight />
        </div>

        <div className="mt-10 rounded-2xl border border-brand-100 bg-brand-50/30 p-5 sm:p-6">
          <p className="text-sm font-semibold text-brand-900 mb-3">Related reading</p>
          <ul className="space-y-2.5">
            <li className="text-sm text-brand-400">
              <Link href="/industries/retail-ecommerce" className="text-accent hover:underline">
                NetSuite for retail and e-commerce
              </Link>{" "}
              covers the broader order management, inventory, and integration setup for retailers using NetSuite.
            </li>
            <li className="text-sm text-brand-400">
              <Link href="/netsuite-3pl-integration" className="text-accent hover:underline">
                NetSuite 3PL integration
              </Link>{" "}
              covers order transmission, inventory sync, and shipment confirmation between NetSuite and a
              third-party logistics provider.
            </li>
            <li className="text-sm text-brand-400">
              <Link href="/netsuite-workflow-automation" className="text-accent hover:underline">
                NetSuite workflow automation
              </Link>{" "}
              covers the broader workflow and approval automation that supports returns, procurement, and
              order management processes.
            </li>
            <li className="text-sm text-brand-400">
              <Link href="/netsuite-landed-cost" className="text-accent hover:underline">
                NetSuite landed cost
              </Link>{" "}
              covers duty, freight, and import cost allocation to inventory, relevant for retailers who
              import the products being returned.
            </li>
          </ul>
        </div>

        <ServiceFaqSection items={FAQ} />

        <div className="mt-10 rounded-2xl border border-brand-100 bg-white p-5 shadow-soft">
          <p className="text-sm font-semibold text-brand-900 mb-1">
            Get returns processing working in NetSuite
          </p>
          <p className="text-sm text-brand-400 mb-4">
            SuitePacific configures RMA automation, disposition workflows, and return rate reporting for
            retailers and e-commerce companies on NetSuite. Plans start at $799 per month.
          </p>
          <LeadFormLight />
        </div>
      </div>
    </main>
  );
}

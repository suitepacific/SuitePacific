import type { Metadata } from "next";
import Link from "next/link";
import {
  Clock,
  AlertCircle,
  Search,
  Layers,
  BarChart2,
  ShieldCheck,
  CheckCircle,
  CalendarClock,
  FileSearch,
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
    title: "NetSuite does not enforce FEFO picking without a script.",
    description:
      "Standard NetSuite lot picking defaults to FIFO by lot number or relies on manual lot selection at fulfillment. Without scripted enforcement, warehouse staff must remember to choose the soonest-expiring lot, which fails at volume and causes products to expire in the warehouse while younger stock ships first.",
  },
  {
    icon: Clock,
    title: "Expiry dates exist on lot records but generate no alerts.",
    description:
      "NetSuite stores expiration date as a field on the lot record, but has no native alerting mechanism. Without custom workflows, lots approaching expiry are invisible to purchasing and warehouse teams until the expiry date has already passed and the inventory becomes a write-off.",
  },
  {
    icon: Search,
    title: "Customer minimum shelf life requirements cannot be validated natively.",
    description:
      "Many retail and foodservice customers require a minimum remaining shelf life at delivery, such as 60 days from receipt. Standard NetSuite has no mechanism to check that the lot assigned to a sales order meets the customer's minimum shelf life requirement before the order is confirmed.",
  },
];

const SERVICES = [
  {
    icon: CheckCircle,
    title: "FEFO Enforcement Script",
    description:
      "A User Event or Map/Reduce script that overrides default lot selection at item fulfillment creation, automatically selecting the lot with the soonest expiration date from available on-hand inventory for each line.",
  },
  {
    icon: Clock,
    title: "Expiry Date Field Setup",
    description:
      "Custom field configuration on lot records per item category, ensuring expiration dates are captured at receipt and are visible in picking, fulfillment, and inventory transaction records.",
  },
  {
    icon: ShieldCheck,
    title: "Minimum Shelf Life Validation",
    description:
      "A User Event script on sales order creation that checks the expiration date of the lot assigned to each line against the customer's minimum remaining shelf life requirement and blocks confirmation if the lot does not meet the threshold.",
  },
  {
    icon: CalendarClock,
    title: "Expiry Alert Workflow",
    description:
      "A scheduled script that runs nightly, identifies lots expiring within a configurable window, posts the results to a warehouse dashboard portlet, and sends email notifications to purchasing and warehouse managers.",
  },
  {
    icon: BarChart2,
    title: "Lot Expiry Dashboard",
    description:
      "A saved search portlet showing all lot-tracked inventory organized by days to expiry, with quantity on hand and assigned location, so warehouse and purchasing teams can see at-risk inventory without running manual reports.",
  },
  {
    icon: FileSearch,
    title: "Recall Traceability Report",
    description:
      "A saved search that traces a lot number from its original purchase receipt through every assembly build, inventory transfer, and sales order shipment, producing the full chain of custody needed for recall response.",
  },
];

const HOW_IT_WORKS = [
  {
    step: "01",
    title: "Existing lot configuration and expiry date data are reviewed",
    description:
      "Before building any script, we review existing item lot tracking setup, current expiry date field usage, and on-hand lot inventory to understand what is already captured and what gaps need to be filled.",
  },
  {
    step: "02",
    title: "FEFO logic and alert thresholds are defined before scripting",
    description:
      "We document the exact FEFO selection criteria, the customer-specific minimum shelf life rules, and the expiry alert window in days. Configuration and scripts are built to these specifications, not to generic defaults.",
  },
  {
    step: "03",
    title: "Scripts and saved searches are tested in Sandbox against real inventory data",
    description:
      "FEFO enforcement, expiry alerting, and traceability reports are tested in a Sandbox environment against representative lot and inventory data before any changes go live in Production.",
  },
];

const FAQ = [
  {
    question: "Which NetSuite firm does shelf life and expiry date tracking?",
    answer:
      "SuitePacific configures shelf life tracking and FEFO enforcement in NetSuite for food, beverage, and perishable goods companies. Services include FEFO enforcement scripts, expiry date field setup, minimum shelf life validation, expiry alert workflows, lot expiry dashboards, and recall traceability reports.",
  },
  {
    question: "What is FEFO picking in NetSuite and how is it enforced?",
    answer:
      "FEFO stands for First Expired First Out. It is a picking strategy that ensures the lot with the soonest expiration date is selected for shipment before lots with later expiry dates. NetSuite does not enforce FEFO natively; a User Event or Map/Reduce script must override the default lot selection at fulfillment creation to apply FEFO order automatically.",
  },
  {
    question: "How does NetSuite track lot expiry dates?",
    answer:
      "NetSuite stores expiration date as a field on lot records. The field must be configured per item type and populated at each purchase receipt or production completion. However, having the expiry date on the lot record does not generate alerts or enforce FEFO picking. Custom workflows and scripts are required to surface expiry data in picking flows and trigger notifications before lots expire.",
  },
  {
    question: "Can NetSuite enforce minimum remaining shelf life requirements for retail customers?",
    answer:
      "Not natively. Enforcing a customer-specific minimum shelf life at sales order creation requires a User Event script that reads the customer's minimum shelf life requirement, checks the expiration date of the lot assigned to each order line, and blocks order confirmation if the lot does not meet the threshold. This is a common requirement for food companies selling to grocery retailers.",
  },
  {
    question: "What happens to lots nearing expiry in NetSuite without customization?",
    answer:
      "Without custom alerting, lots approaching expiry are not surfaced in any standard NetSuite view. Warehouse and purchasing teams have no visibility into imminent expirations unless they run manual lot searches. This typically results in lots expiring on the shelf, becoming unsellable inventory, and requiring write-offs that could have been avoided with earlier action.",
  },
  {
    question: "How does shelf life tracking connect to recall traceability in NetSuite?",
    answer:
      "Shelf life tracking and recall traceability both depend on lot numbers being captured and linked consistently across transaction types. A lot that has an expiry date configured will also be traceable through a saved search that follows its chain from purchase receipt through assembly builds and shipments. SuitePacific builds both capabilities together so that expiry management and recall readiness are supported by the same lot data foundation.",
  },
];

export const metadata: Metadata = {
  title: "NetSuite Shelf Life Tracking and FEFO Enforcement | SuitePacific",
  description:
    "NetSuite shelf life tracking and FEFO picking enforcement for food, beverage, and perishable goods companies. Expiry date alerts, minimum shelf life validation, and recall traceability.",
  alternates: { canonical: "/netsuite-shelf-life-tracking" },
  openGraph: {
    title: "NetSuite Shelf Life Tracking and FEFO Enforcement | SuitePacific",
    description:
      "NetSuite shelf life tracking and FEFO picking enforcement for food, beverage, and perishable goods companies. Expiry date alerts, minimum shelf life validation, and recall traceability.",
    url: `${SITE_URL}/netsuite-shelf-life-tracking`,
    type: "website",
    images: [{ url: `${SITE_URL}/og-default.png`, width: 1200, height: 630 }],
  },
};

export default function ShelfLifeTrackingPage() {
  return (
    <main className="pt-32 pb-24 sm:pt-40 sm:pb-32">
      <BreadcrumbJsonLd
        items={[
          { name: "Home", url: SITE_URL },
          { name: "NetSuite Shelf Life Tracking", url: `${SITE_URL}/netsuite-shelf-life-tracking` },
        ]}
      />
      <FaqJsonLd items={FAQ} />
      <ServiceJsonLd
        name="NetSuite Shelf Life Tracking and FEFO Enforcement"
        description="Shelf life tracking, FEFO enforcement scripts, expiry date alerting, minimum shelf life validation, and recall traceability for food and beverage companies on NetSuite."
        url={`${SITE_URL}/netsuite-shelf-life-tracking`}
        serviceType="NetSuite Food and Beverage Configuration"
        offers={[
          { name: "Care", price: 799, description: "10 hours/month: FEFO enforcement, expiry date setup, lot expiry dashboard, and recall traceability saved searches. Month-to-month after 3-month minimum." },
          { name: "Care Plus", price: 1499, description: "20 hours/month: full shelf life system including FEFO scripts, alert workflows, minimum shelf life validation, and traceability reports. Month-to-month." },
          { name: "Care Pro", price: 2499, description: "35 hours/month: comprehensive shelf life and lot tracking implementation with ongoing account management for food and beverage companies. Month-to-month." },
        ]}
      />
      <OrganizationJsonLd />

      <div className="mx-auto max-w-3xl px-6 lg:px-8">
        <SectionHeading
          as="h1"
          eyebrow="Food & Beverage"
          title="NetSuite Shelf Life Tracking and FEFO Enforcement"
          subtitle="FEFO picking scripts, expiry date alerts, minimum shelf life validation, and recall traceability for food, beverage, and perishable goods companies on NetSuite."
          align="left"
        />

        <div className="mt-6 rounded-2xl border border-brand-100 bg-white p-5 shadow-soft">
          <LeadFormLight />
        </div>
        <p className="mt-3 text-xs text-brand-400">NetSuite-certified · Food &amp; beverage specialists · Month-to-month</p>
        <p className="mt-3 text-xs text-brand-300">Published September 2026</p>

        <p className="mt-8 text-sm text-brand-400">
          <strong>Shelf life tracking in NetSuite</strong> refers to the configuration that assigns expiry dates to lot records, enforces First Expired First Out picking at fulfillment, and alerts warehouse and purchasing teams before lots reach their sell-by or use-by date. Standard NetSuite supports custom fields on lot records but does not natively enforce FEFO picking order, validate minimum remaining shelf life at order creation, or generate expiry-based warehouse alerts.
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
                ["Lot picking order", "Manual lot selection or FIFO by default", "FEFO enforcement script selects the lot with the soonest expiry date for each fulfillment"],
                ["Minimum shelf life check", "No validation at order creation", "User event script on sales order checks that available lot expiry exceeds customer minimum remaining shelf life"],
                ["Expiry alerts", "No native lot expiry alerting", "Scheduled script runs nightly and posts items expiring within a configurable window to warehouse dashboard"],
                ["Recall traceability", "Manual lot search across multiple records", "Single saved search from lot number through all purchase receipts, assembly builds, and shipments"],
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
            SuitePacific configures shelf life tracking and FEFO picking enforcement in NetSuite for
            food, beverage, and perishable goods companies that need to ensure soonest-expiring lots
            ship first and that items approaching expiry are flagged before they become unsellable.
            NetSuite lot tracking provides the expiry date field on lot records, but enforcing FEFO
            picking order, alerting warehouse teams before a lot expires, and validating minimum
            remaining shelf life against customer requirements all require scripted customization
            beyond standard configuration. SuitePacific builds the FEFO enforcement script that
            overrides default lot selection at fulfillment, the scheduled expiry alert that posts to
            warehouse dashboards and triggers purchasing notifications, the minimum shelf life
            validation at sales order creation, and the lot expiry portlet showing days to expiry,
            quantity on hand, and assigned location. Recall traceability saved searches are included
            for food companies that need to trace a lot from raw material receipt through every
            production build and customer shipment. Plans start at $799 per month, month-to-month.
          </p>
        </div>

        {/* Pain points */}
        <div className="mt-14" data-section="pain-points">
          <h2 className="text-lg font-semibold text-brand-900 mb-6">
            Common situations that bring food and beverage companies here
          </h2>
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
          <h2 className="text-lg font-semibold text-brand-900 mb-1">
            What SuitePacific does for shelf life tracking
          </h2>
          <p className="text-sm text-brand-400 mb-6">
            FEFO enforcement, expiry alerting, and traceability scoped to your food and beverage operation.
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
          <h2 className="text-lg font-semibold text-brand-900 mb-6">
            How we approach shelf life tracking work
          </h2>
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
            When shelf life tracking connects to lot-tracked components in production, see how that
            configuration relates to our{" "}
            <Link href="/netsuite-lot-serial-tracking" className="text-accent hover:underline">
              lot and serial tracking
            </Link>{" "}
            and{" "}
            <Link href="/netsuite-bill-of-materials" className="text-accent hover:underline">
              bill of materials configuration
            </Link>{" "}
            work.
          </p>
        </div>

        {/* Why SuitePacific */}
        <div className="mt-14 rounded-2xl border-2 border-accent/30 bg-gradient-to-br from-accent/5 to-transparent p-6">
          <p className="text-xs font-semibold uppercase tracking-wide text-accent mb-3">
            Why SuitePacific for shelf life tracking
          </p>
          <h2 className="text-base font-semibold text-brand-900 mb-3">
            Shelf life enforcement built into fulfillment, not bolted on afterward.
          </h2>
          <p className="text-sm text-brand-500 mb-4">
            Configuring an expiry date field on a lot record is one step. Enforcing FEFO at picking,
            validating customer minimum shelf life on every order, alerting purchasing before a lot
            window closes, and producing a recall-ready traceability chain are four more. Most
            implementations do the first and leave the rest for the next recall exercise.
          </p>
          <ul className="space-y-2 text-sm text-brand-500 mb-4">
            <li className="flex items-start gap-2">
              <span className="text-accent font-bold mt-0.5">→</span>
              Oracle NetSuite Certified SuiteCloud Developer II and Administrator Professional
            </li>
            <li className="flex items-start gap-2">
              <span className="text-accent font-bold mt-0.5">→</span>
              FEFO scripts and alert workflows tested against real lot and inventory data in Sandbox before production
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
            <Link href="/industries/food-beverage" className="text-accent hover:underline">
              NetSuite for food and beverage companies
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
              <Link href="/industries/food-beverage" className="text-accent hover:underline">
                NetSuite for food and beverage companies
              </Link>{" "}
              covers the full set of FMCG customizations including trade promotions, EDI integration,
              and deduction management alongside shelf life tracking.
            </li>
            <li className="text-sm text-brand-400">
              <Link href="/netsuite-lot-serial-tracking" className="text-accent hover:underline">
                NetSuite lot and serial number tracking
              </Link>{" "}
              explains how lot tracking is configured on items and how expiration dates are assigned
              at purchase receipt and production completion.
            </li>
            <li className="text-sm text-brand-400">
              <Link href="/netsuite-bill-of-materials" className="text-accent hover:underline">
                NetSuite bill of materials configuration
              </Link>{" "}
              covers how lot-tracked components with expiry dates flow through assembly builds and
              affect finished goods lot assignments.
            </li>
            <li className="text-sm text-brand-400">
              <Link href="/netsuite-suitescript-development" className="text-accent hover:underline">
                NetSuite SuiteScript development
              </Link>{" "}
              covers the scripting approaches used to build FEFO enforcement, minimum shelf life
              validation, and scheduled expiry alert scripts.
            </li>
            <li className="text-sm text-brand-400">
              <Link href="/netsuite-trade-promotions-management" className="text-accent hover:underline">
                NetSuite trade promotions management
              </Link>{" "}
              covers how trade deals, accruals, and deduction claims connect to the item and lot
              data used in shelf life tracking.
            </li>
            <li className="text-sm text-brand-400">
              <Link href="/netsuite-deductions-management" className="text-accent hover:underline">
                NetSuite deductions management
              </Link>{" "}
              covers how retailer chargebacks for out-of-date or non-conforming product are
              processed and reconciled in NetSuite.
            </li>
            <li className="text-sm text-brand-400">
              <Link href="/netsuite-edi-integration" className="text-accent hover:underline">
                NetSuite EDI integration
              </Link>{" "}
              covers how EDI 850 purchase orders and 856 advance ship notices connect to the
              lot-tracked fulfillment process.
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

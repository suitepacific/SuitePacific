import type { Metadata } from "next";
import Link from "next/link";
import { CheckCircle2, XCircle, Shield, Code2, AlertTriangle, Layers } from "lucide-react";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Card } from "@/components/ui/Card";
import { IconBadge } from "@/components/ui/IconBadge";
import { BreadcrumbJsonLd, FaqJsonLd, ServiceJsonLd, OrganizationJsonLd } from "@/components/seo/JsonLd";
import { ServiceFaqSection } from "@/components/ui/ServiceFaqSection";
import { LeadFormLight } from "@/components/sections/LeadFormLight";
import { SITE_URL } from "@/lib/content";

const COMPARISON_TABLE = [
  { capability: "Lot field available on transactions", native: "Yes", enforced: "Yes" },
  { capability: "Entry required before saving", native: "No", enforced: "Yes (script blocks save)" },
  { capability: "Invalid lot number blocked", native: "No", enforced: "Yes (validated against existing lots)" },
  { capability: "Expiry date enforced", native: "No", enforced: "Yes (if configured in script)" },
  { capability: "Audit trail complete", native: "Only when users enter lot numbers", enforced: "Always complete" },
  { capability: "Recall-ready", native: "Partial (gaps where lot was not entered)", enforced: "Full (no unassigned transactions)" },
  { capability: "Regulated industry compliant", native: "No", enforced: "Yes (when script covers all transaction types)" },
  { capability: "Setup required", native: "Item configuration only", enforced: "Item configuration + SuiteScript User Event" },
];

const NATIVE_GAPS = [
  {
    icon: XCircle,
    title: "Lot entry is optional by default",
    description:
      "When an item is configured as Lot Numbered in NetSuite, the lot number field appears on item receipts, transfers, assembly builds, and work orders. However, the system does not require a value. A user can save the transaction with the lot field blank.",
  },
  {
    icon: XCircle,
    title: "Transactions post without lot assignment",
    description:
      "If a lot number is not entered, NetSuite accepts the transaction and updates inventory quantities. Units of lot-controlled inventory exist in the system with no lot reference, which means they cannot be traced to a specific receipt, supplier, or production run.",
  },
  {
    icon: XCircle,
    title: "Traceability gaps accumulate over time",
    description:
      "In a regulated manufacturing environment, even a small percentage of unassigned transactions creates compliance gaps. A recall investigation that finds records without lot numbers is a finding that triggers corrective action requirements.",
  },
  {
    icon: XCircle,
    title: "Auditors find the gaps during review",
    description:
      "Quality management audits and regulatory inspections frequently surface lot traceability gaps in NetSuite when enforcement is not in place. The gaps are visible in transaction records and require explanation.",
  },
];

const SCRIPT_CAPABILITIES = [
  {
    icon: Shield,
    title: "Required lot number before save",
    description:
      "A User Event script (Before Submit) runs when a transaction is saved. If the item is configured as Lot Numbered and the lot number field is blank, the script throws a validation error. The transaction cannot be saved without a valid lot number.",
  },
  {
    icon: Code2,
    title: "Lot number validation against existing lots",
    description:
      "The script can validate the entered lot number against the list of existing valid lots in the account, not just any free-text entry. This prevents typographical errors and ensures lot numbers correspond to actual receiving records.",
  },
  {
    icon: CheckCircle2,
    title: "Expiry date enforcement",
    description:
      "For items with expiry date requirements, the script checks that an expiry date is entered and that the date is in the future. Expired lots can be blocked from being used in new transactions.",
  },
  {
    icon: Layers,
    title: "Bin assignment validation",
    description:
      "If the item requires a bin location, the script validates that a bin is assigned and that the bin is a valid location for that item class. This prevents inventory from being placed in bins that are not configured for the item.",
  },
];

const INDUSTRIES = [
  { name: "Food manufacturing", reason: "FDA recall traceability requirements under FSMA" },
  { name: "Pharmaceutical", reason: "FDA 21 CFR Part 211 lot traceability and recall requirements" },
  { name: "Medical devices", reason: "FDA 21 CFR Part 820 device history record requirements" },
  { name: "Nutraceuticals", reason: "GMP compliance and recall management" },
  { name: "Chemical manufacturing", reason: "Regulatory compliance and supplier traceability" },
  { name: "Cosmetics", reason: "cGMP compliance and batch traceability" },
  { name: "Automotive suppliers", reason: "IATF 16949 lot traceability requirements" },
];

const FAQ = [
  {
    question: "Why does NetSuite lot tracking allow blank lot numbers by default?",
    answer:
      "NetSuite is a general-purpose ERP platform serving many industries. Not all industries require mandatory lot entry; some use lot tracking for reference without a regulatory compliance requirement. By default, the platform makes lot entry available without making it mandatory. For regulated manufacturers that need mandatory entry, a SuiteScript User Event script must be added to enforce the requirement before each transaction is saved.",
  },
  {
    question: "Which transaction types need lot enforcement scripts?",
    answer:
      "For complete traceability, lot enforcement scripts should cover all transaction types where a lot-numbered item can be received, moved, or consumed: item receipts, inventory transfers, assembly builds, work order completions, inventory adjustments, and item fulfillments. If only some transaction types are covered, traceability gaps will still exist through the uncovered types.",
  },
  {
    question: "Can SuitePacific retrofit lot enforcement on an existing NetSuite account?",
    answer:
      "Yes. SuitePacific builds SuiteScript User Event scripts that enforce lot number entry on the transaction types that are relevant to the account. The retrofit process includes reviewing which items are configured as lot-numbered, which transaction types need coverage, and whether existing records have traceability gaps that need to be addressed. The scripts are deployed in Sandbox first and validated before going to production.",
  },
  {
    question: "What happens to existing inventory records that have no lot number?",
    answer:
      "Existing transactions without lot numbers are not retroactively corrected by adding an enforcement script. The script applies only to new transactions going forward. For regulated manufacturers, the existing gap may need to be documented and addressed through a corrective action process. SuitePacific can help identify the scope of existing unassigned transactions through a saved search audit before the enforcement script is deployed.",
  },
  {
    question: "Does lot enforcement require any changes to item configuration?",
    answer:
      "The items must already be configured as Lot Numbered in NetSuite for the enforcement script to apply. If items are not yet configured as lot-numbered, that item-level change must be made first. Changing an item to lot-numbered after transactions have already been posted requires careful handling, as NetSuite will require lot assignments on any subsequent transactions for that item.",
  },
  {
    question: "How does lot enforcement interact with NetSuite costing methods?",
    answer:
      "FIFO costing in NetSuite requires lot tracking to be active, because the system tracks cost at the lot or receipt level. If lot enforcement is added to a FIFO account, the enforcement script ensures that every transaction that consumes or moves FIFO-costed inventory has a lot assignment, which keeps the cost layer accurate. For standard or average costing, lot enforcement is independent of costing; it provides traceability without affecting cost calculations.",
  },
];

export const metadata: Metadata = {
  title: "NetSuite Lot Tracking: Native vs. Enforced with SuiteScript",
  description:
    "Standard NetSuite lot tracking is optional by default; a SuiteScript enforcement script makes it mandatory. Which industries need it and what it covers.",
  alternates: { canonical: "/netsuite-lot-tracking-native-vs-enforced" },
  openGraph: {
    title: "NetSuite Lot Tracking: Native vs. Enforced with SuiteScript",
    description:
      "How standard NetSuite lot tracking works, why regulated manufacturers need SuiteScript enforcement scripts, and what the enforcement script covers for complete traceability.",
    url: `${SITE_URL}/netsuite-lot-tracking-native-vs-enforced`,
    type: "website",
    images: [{ url: `${SITE_URL}/og-default.png`, width: 1200, height: 630 }],
  },
};

export default function LotTrackingNativeVsEnforcedPage() {
  return (
    <main className="pt-32 pb-24 sm:pt-40 sm:pb-32">
      <BreadcrumbJsonLd
        items={[
          { name: "Home", url: SITE_URL },
          { name: "NetSuite Lot Tracking: Native vs. Enforced", url: `${SITE_URL}/netsuite-lot-tracking-native-vs-enforced` },
        ]}
      />
      <FaqJsonLd items={FAQ} />
      <ServiceJsonLd
        name="NetSuite Lot Tracking Enforcement"
        description="SuiteScript enforcement scripts for NetSuite lot tracking: mandatory lot number entry on item receipts, transfers, assembly builds, work orders, and fulfillments for regulated manufacturers."
        url={`${SITE_URL}/netsuite-lot-tracking-native-vs-enforced`}
        serviceType="NetSuite Manufacturing Support"
        offers={[
          { name: "Care", price: 799, description: "10 hours/month: lot tracking enforcement script build, transaction type coverage review, and ongoing manufacturing account support. Month-to-month after 3-month minimum." },
          { name: "Care Plus", price: 1499, description: "20 hours/month: enforcement scripts, expiry date validation, bin assignment checks, and broader NetSuite manufacturing support. Month-to-month." },
          { name: "Care Pro", price: 2499, description: "35 hours/month: full manufacturing support including lot tracking, costing, work orders, BOM, and SuiteScript development. Month-to-month." },
        ]}
      />
      <OrganizationJsonLd />

      <div className="mx-auto max-w-3xl px-6 lg:px-8">
        <SectionHeading
          as="h1"
          eyebrow="NetSuite Manufacturing"
          title="NetSuite Lot Tracking: What the Platform Provides vs. What Enforcement Scripts Add"
          subtitle="How standard NetSuite lot tracking works, why regulated manufacturers need SuiteScript enforcement scripts, and what they look like."
          align="left"
        />

        <div className="mt-6 rounded-2xl border border-brand-100 bg-white p-5 shadow-soft">
          <p className="text-sm text-brand-600 mb-3">Manufacturing company that needs lot numbers to be required (not optional) in NetSuite? Tell us about your traceability requirements.</p>
          <LeadFormLight />
        </div>
        <p className="mt-3 text-xs text-brand-400">NetSuite-certified · Manufacturing specialists · Direct access · Month-to-month</p>
        <p className="mt-3 text-xs text-brand-300">Published October 2026</p>

        <div className="mt-6 rounded-2xl border border-brand-100 bg-brand-50/40 p-5">
          <p className="text-xs font-semibold uppercase tracking-wide text-accent mb-2">Quick answer</p>
          <p className="text-sm text-brand-700 leading-relaxed">
            NetSuite lot tracking refers to the platform&apos;s ability to assign a lot number to
            inventory items as they move through receipts, transfers, work orders, and fulfillments.
            When items are configured as Lot Numbered in NetSuite, the lot number field appears on
            relevant transactions. However, the platform does not require a lot number to be entered
            before a transaction is saved. A user can leave the lot field blank, and NetSuite will
            accept the transaction. For regulated manufacturers in food, pharmaceutical, medical
            device, or nutraceutical industries, this creates traceability gaps that fail audit and
            recall requirements. A SuiteScript User Event script (Before Submit) closes this gap by
            throwing a validation error when a lot-numbered item&apos;s transaction is saved without
            a lot number. The script can also validate the lot number against existing valid lots,
            enforce expiry date entry, and check bin assignments. SuitePacific builds these
            enforcement scripts for live NetSuite manufacturing accounts.
          </p>
        </div>

        {/* Native gaps */}
        <div className="mt-14">
          <h2 className="text-lg font-semibold text-brand-900 mb-6">What are the gaps in native NetSuite lot tracking?</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            {NATIVE_GAPS.map((item) => (
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
          <h2 className="text-lg font-semibold text-brand-900 mb-2">Native lot tracking vs. enforced lot tracking: capability comparison</h2>
          <div className="overflow-x-auto rounded-2xl border border-brand-100">
            <table className="w-full text-sm min-w-[520px]">
              <thead>
                <tr className="border-b border-brand-100 bg-brand-50/50">
                  <th className="text-left p-4 font-semibold text-brand-900">Capability</th>
                  <th className="text-left p-4 font-semibold text-brand-900">Native lot tracking</th>
                  <th className="text-left p-4 font-semibold text-brand-900">Enforced (SuiteScript)</th>
                </tr>
              </thead>
              <tbody>
                {COMPARISON_TABLE.map((row, i) => (
                  <tr key={row.capability} className={i < COMPARISON_TABLE.length - 1 ? "border-b border-brand-100" : ""}>
                    <td className="p-4 font-medium text-brand-700 align-top">{row.capability}</td>
                    <td className="p-4 align-top text-[13px]">
                      <span className={row.native === "Yes" ? "text-green-600 font-medium" : row.native === "No" ? "text-red-500 font-medium" : "text-brand-400"}>
                        {row.native}
                      </span>
                    </td>
                    <td className="p-4 align-top text-[13px]">
                      <span className={row.enforced.startsWith("Yes") ? "text-green-600 font-medium" : "text-brand-400"}>
                        {row.enforced}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* What the script adds */}
        <div className="mt-14">
          <h2 className="text-lg font-semibold text-brand-900 mb-2">What does a SuiteScript lot enforcement script actually do?</h2>
          <p className="text-sm text-brand-400 mb-6">
            The script runs as a User Event (Before Submit) on relevant transaction types. It checks the lot field and throws a validation error that prevents saving if the requirement is not met.
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            {SCRIPT_CAPABILITIES.map((item) => (
              <Card key={item.title} className="p-5 flex flex-col gap-3">
                <IconBadge icon={item.icon} />
                <h3 className="font-semibold text-brand-900 text-sm">{item.title}</h3>
                <p className="text-sm text-brand-400">{item.description}</p>
              </Card>
            ))}
          </div>
        </div>

        {/* Which industries need enforcement */}
        <div className="mt-14">
          <h2 className="text-lg font-semibold text-brand-900 mb-2">Which industries require lot tracking enforcement in NetSuite?</h2>
          <p className="text-sm text-brand-400 mb-5">
            These industries have regulatory or quality management requirements that mandate lot-level traceability. Native NetSuite lot tracking does not meet those requirements without enforcement.
          </p>
          <div className="overflow-x-auto rounded-2xl border border-brand-100">
            <table className="w-full text-sm min-w-[400px]">
              <thead>
                <tr className="border-b border-brand-100 bg-brand-50/50">
                  <th className="text-left p-4 font-semibold text-brand-900">Industry</th>
                  <th className="text-left p-4 font-semibold text-brand-900">Reason for enforcement requirement</th>
                </tr>
              </thead>
              <tbody>
                {INDUSTRIES.map((row, i) => (
                  <tr key={row.name} className={i < INDUSTRIES.length - 1 ? "border-b border-brand-100" : ""}>
                    <td className="p-4 font-medium text-brand-700 align-top whitespace-nowrap">{row.name}</td>
                    <td className="p-4 text-brand-400 align-top text-[13px]">{row.reason}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Related reading */}
        <div className="mt-10 rounded-2xl border border-brand-100 bg-brand-50/30 p-5 sm:p-6">
          <p className="text-sm font-semibold text-brand-900 mb-3">Related reading</p>
          <ul className="space-y-2.5">
            <li className="text-sm text-brand-400">
              <Link href="/netsuite-lot-serial-tracking" className="text-accent hover:underline">
                NetSuite lot and serial number tracking overview
              </Link>{" "}
              covers how lot tracking is configured at the item level and how it flows through transactions.
            </li>
            <li className="text-sm text-brand-400">
              <Link href="/industries/manufacturing" className="text-accent hover:underline">
                NetSuite support for manufacturers
              </Link>{" "}
              covers the full scope of manufacturing-specific work SuitePacific provides.
            </li>
            <li className="text-sm text-brand-400">
              <Link href="/netsuite-suitescript-development" className="text-accent hover:underline">
                NetSuite SuiteScript development
              </Link>{" "}
              explains how User Event scripts and other SuiteScript types work in NetSuite.
            </li>
            <li className="text-sm text-brand-400">
              <Link href="/netsuite-costing-methods-comparison" className="text-accent hover:underline">
                NetSuite costing methods comparison
              </Link>{" "}
              covers how FIFO costing interacts with lot tracking requirements.
            </li>
          </ul>
        </div>

        <ServiceFaqSection items={FAQ} />

        <div className="mt-10 rounded-2xl border border-brand-100 bg-white p-5 shadow-soft">
          <p className="text-sm font-semibold text-brand-900 mb-1">Need lot number enforcement built into your NetSuite account?</p>
          <p className="text-sm text-brand-400 mb-4">
            Tell us which transaction types need coverage and what your compliance requirements are. We will assess the current configuration and build the enforcement scripts.
          </p>
          <LeadFormLight />
        </div>
      </div>
    </main>
  );
}

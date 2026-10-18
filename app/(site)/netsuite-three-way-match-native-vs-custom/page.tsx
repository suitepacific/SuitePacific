import type { Metadata } from "next";
import Link from "next/link";
import { CheckCircle2, XCircle, Shield, Code2 } from "lucide-react";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Card } from "@/components/ui/Card";
import { IconBadge } from "@/components/ui/IconBadge";
import { BreadcrumbJsonLd, FaqJsonLd, ServiceJsonLd, OrganizationJsonLd } from "@/components/seo/JsonLd";
import { ServiceFaqSection } from "@/components/ui/ServiceFaqSection";
import { LeadFormLight } from "@/components/sections/LeadFormLight";
import { SITE_URL } from "@/lib/content";

const COMPARISON_ROWS = [
  { control: "PO required before bill", native: "No (soft warning at most)", custom: "Hard block if no linked PO" },
  { control: "Quantity match check", native: "No automatic validation", custom: "Billed qty vs. PO qty enforced" },
  { control: "Amount within tolerance", native: "No", custom: "Configurable tolerance (e.g. 5%)" },
  { control: "Receipt before payment", native: "No", custom: "Item receipt required to pass" },
  { control: "No-PO exception handling", native: "N/A (anything passes)", custom: "Vendor-level exception categories" },
  { control: "Threshold alerts", native: "None", custom: "Controller alert near tolerance limit" },
  { control: "Audit trail", native: "Transaction links only", custom: "Validation log per bill" },
  { control: "Hard block vs. warning", native: "Warning only", custom: "Hard block (Before Submit)" },
];

const ENFORCEMENT_CARDS = [
  {
    icon: Shield,
    title: "Hard block on Before Submit",
    description:
      "The SuiteScript User Event script fires on the vendor bill record Before Submit, before the record can be saved or approved. If the validation fails, the script throws a SuiteScript error and the bill cannot be saved. This is a hard control, not a recommendation.",
  },
  {
    icon: Code2,
    title: "Configurable tolerance settings",
    description:
      "Tolerance settings are configurable per account: for example, allow billed amount up to 5% over the PO amount to cover freight and miscellaneous charges. Tolerance values are stored in a custom configuration record and can be updated without touching the script.",
  },
  {
    icon: CheckCircle2,
    title: "Vendor-level exception categories",
    description:
      "Certain vendor categories (utilities, rent, recurring services, one-time subscriptions) are flagged on the vendor record to bypass the PO requirement. The exception is logged in the audit trail. This avoids blocking legitimate bills that will never have a PO.",
  },
  {
    icon: XCircle,
    title: "Near-tolerance alerts to the controller",
    description:
      "Bills that pass matching but are within a configured percentage of the tolerance threshold are flagged for controller review before approval. The alert is a workflow notification, not a hard block, giving the controller visibility without stopping the bill.",
  },
];

const FAQ = [
  {
    question: "What is three-way match and why does it matter?",
    answer:
      "Three-way match is the process of verifying that a purchase order, an item receipt, and a vendor bill all agree before allowing payment. The purpose is to ensure: (1) there is an approved PO authorizing the spend, (2) goods or services were received before payment, and (3) the billed amount matches the PO amount within an acceptable tolerance. Without three-way match enforcement, vendors can be paid for goods not received, amounts exceeding what was approved, or without any purchase authorization at all.",
  },
  {
    question: "Does NetSuite enforce three-way match natively?",
    answer:
      "No. NetSuite links vendor bills to purchase orders and item receipts, and the relationship is visible on the bill record. But NetSuite does not block a bill from being approved if there is no linked PO, if the billed amount exceeds the PO amount, or if no item receipt exists. A user can create and approve a vendor bill with no PO and no receipt, and NetSuite will not stop it. This is a controls gap that auditors and internal audit teams flag regularly.",
  },
  {
    question: "Can I configure NetSuite to block bills without a PO?",
    answer:
      "Not through standard configuration. NetSuite&apos;s approval workflows (SuiteFlow) can route bills for approval based on conditions, but they cannot add a hard validation that prevents saving a bill without a PO. A User Event SuiteScript running Before Submit is required to add a true hard block. SuitePacific builds this validation as part of a Care plan.",
  },
  {
    question: "What happens to bills that don&apos;t have a PO?",
    answer:
      "With the SuiteScript enforcement in place, a bill without a linked PO (and without a vendor-level exception category) will throw a validation error on save. The AP team sees the error message immediately and must either link the correct PO or have the vendor record updated to include an exception flag before the bill can proceed. Without enforcement, non-PO bills pass through and are paid without any authorization check.",
  },
  {
    question: "How do you handle exceptions to three-way match?",
    answer:
      "Vendor-level exception categories handle recurring exceptions cleanly. Common categories include utilities (monthly bills with no PO process), rent (lease payments), and subscription software (annual renewal invoices). These categories are flagged on the vendor record. When the validation script sees the flag, it logs the exception and allows the bill to proceed without a PO. New exception categories can be added by updating the vendor record without modifying the script.",
  },
  {
    question: "Will this break my existing bill entry process?",
    answer:
      "It will require that existing bills created without POs either get a PO linked or have the vendor flagged as an exception. For most accounts, this is a one-time cleanup of the vendor record structure to identify which vendors legitimately never have POs. SuitePacific tests the script in Sandbox against the account&apos;s real vendor and PO data before deploying to production, which surfaces any edge cases before go-live.",
  },
];

export const metadata: Metadata = {
  title: "NetSuite Three-Way Match: Native vs. Custom Enforcement",
  description:
    "Why native NetSuite does not block unapproved bills, and what SuiteScript three-way match enforcement looks like for controllers who need hard PO controls.",
  alternates: { canonical: "/netsuite-three-way-match-native-vs-custom" },
  openGraph: {
    title: "NetSuite Three-Way Match: Native vs. Custom Enforcement",
    description:
      "Why native NetSuite does not block unapproved bills, and what SuiteScript three-way match enforcement looks like for controllers who need hard PO controls.",
    url: `${SITE_URL}/netsuite-three-way-match-native-vs-custom`,
    type: "website",
    images: [{ url: `${SITE_URL}/og-default.png`, width: 1200, height: 630 }],
  },
};

export default function ThreeWayMatchPage() {
  return (
    <main className="pt-32 pb-24 sm:pt-40 sm:pb-32">
      <BreadcrumbJsonLd
        items={[
          { name: "Home", url: SITE_URL },
          { name: "NetSuite Three-Way Match: Native vs. Custom Enforcement", url: `${SITE_URL}/netsuite-three-way-match-native-vs-custom` },
        ]}
      />
      <FaqJsonLd items={FAQ} />
      <ServiceJsonLd
        name="NetSuite Three-Way Match Enforcement"
        description="SuitePacific builds SuiteScript three-way match enforcement for live NetSuite accounts, including PO validation, quantity and amount tolerance checks, vendor exception categories, and controller alerts."
        url={`${SITE_URL}/netsuite-three-way-match-native-vs-custom`}
        serviceType="NetSuite Procurement Controls"
        offers={[
          { name: "Care", price: 799, description: "10 hours/month: three-way match enforcement build, tolerance configuration, exception handling, and ongoing maintenance. Month-to-month after 3-month minimum." },
          { name: "Care Plus", price: 1499, description: "20 hours/month: three-way match plus broader NetSuite administration and development support. Month-to-month." },
          { name: "Care Pro", price: 2499, description: "35 hours/month: full procurement controls build, SuiteScript development, and ongoing account support. Month-to-month." },
        ]}
      />
      <OrganizationJsonLd />

      <div className="mx-auto max-w-3xl px-6 lg:px-8">
        <SectionHeading
          as="h1"
          eyebrow="Procurement Controls"
          title="NetSuite Three-Way Match: What the Platform Enforces vs. What SuiteScript Adds"
          subtitle="Why standard NetSuite does not block unapproved or unmatched vendor bills, and what SuiteScript enforcement looks like for controllers who need hard controls."
          align="left"
        />

        <div className="mt-6 rounded-2xl border border-brand-100 bg-white p-5 shadow-soft">
          <p className="text-sm font-medium text-brand-700 mb-3">
            Controller trying to enforce three-way match in NetSuite before bills can be approved? SuitePacific builds this for live accounts.
          </p>
          <LeadFormLight />
        </div>

        <p className="mt-3 text-xs text-brand-400">NetSuite-Certified · Post-go-live specialist · Sandbox-first development · Month-to-month</p>
        <p className="mt-2 text-xs text-brand-300">
          <time dateTime="2026-10">Published October 2026</time>
        </p>

        <div className="mt-6 rounded-2xl border border-brand-100 bg-brand-50/40 p-5">
          <p className="text-xs font-semibold uppercase tracking-wide text-accent mb-2">Quick answer</p>
          <p className="text-sm text-brand-700 leading-relaxed">
            Three-way match refers to the process of verifying that a purchase order, an item receipt, and a vendor bill agree before payment is released. NetSuite links these records and makes the relationships visible, but does not block bills from being approved if a PO is missing, the billed amount exceeds the PO, or no item receipt exists. This is a controls gap auditors flag regularly. SuiteScript enforcement adds a User Event script that fires Before Submit on the vendor bill record, checks for a linked PO, validates quantity and amount within a configurable tolerance, and throws a hard error if the check fails. Vendor exception categories handle utilities, rent, and recurring services that legitimately have no PO. SuitePacific works with live NetSuite accounts to design, build, and test this enforcement in Sandbox before deploying to production. Month-to-month from $799.
          </p>
        </div>

        {/* What NetSuite does natively */}
        <div className="mt-14">
          <h2 className="text-lg font-semibold text-brand-900 mb-4">
            What does NetSuite do natively for three-way match?
          </h2>
          <div className="space-y-4">
            <div className="rounded-2xl border border-brand-100 bg-brand-50/30 p-5">
              <h3 className="font-semibold text-brand-900 text-sm mb-2">Links the records and shows the relationship</h3>
              <p className="text-sm text-brand-400">
                NetSuite links vendor bills to the purchase orders and item receipts they were created from. The link is visible on the bill record, and bills created directly from a PO automatically populate line items from the PO. The relationship is traceable in saved searches and reports.
              </p>
            </div>
            <div className="rounded-2xl border border-brand-100 bg-brand-50/30 p-5">
              <h3 className="font-semibold text-brand-900 text-sm mb-2">Does not block bills without a linked PO</h3>
              <p className="text-sm text-brand-400">
                A user can create a vendor bill manually with no PO link. NetSuite will not stop this at any point in the approval process. The bill can be approved and paid without any purchase authorization check. This is by design in the standard platform and is the most common gap auditors identify.
              </p>
            </div>
            <div className="rounded-2xl border border-brand-100 bg-brand-50/30 p-5">
              <h3 className="font-semibold text-brand-900 text-sm mb-2">Does not validate amount against PO</h3>
              <p className="text-sm text-brand-400">
                Even when a bill is linked to a PO, NetSuite does not prevent the billed amount from exceeding the PO amount. There may be a visual indicator in some contexts, but no hard validation or block. An over-billed invoice can proceed through the approval workflow and be paid.
              </p>
            </div>
          </div>
        </div>

        {/* Comparison table */}
        <div className="mt-14">
          <h2 className="text-lg font-semibold text-brand-900 mb-2">
            Native NetSuite vs. SuiteScript enforcement: what each provides
          </h2>
          <p className="text-sm text-brand-400 mb-5">
            The core difference is hard block versus soft warning. SuiteScript enforcement prevents the bill from saving; native NetSuite at best shows a visual cue.
          </p>
          <div className="overflow-x-auto rounded-2xl border border-brand-100">
            <table className="w-full text-sm min-w-[520px]">
              <thead>
                <tr className="border-b border-brand-100 bg-brand-50/50">
                  <th className="text-left p-4 font-semibold text-brand-900">Control</th>
                  <th className="text-left p-4 font-semibold text-brand-900">Native NetSuite</th>
                  <th className="text-left p-4 font-semibold text-brand-900">With SuiteScript Enforcement</th>
                </tr>
              </thead>
              <tbody>
                {COMPARISON_ROWS.map((row, i) => (
                  <tr key={row.control} className={i < COMPARISON_ROWS.length - 1 ? "border-b border-brand-100" : ""}>
                    <td className="p-4 font-medium text-brand-700 align-top">{row.control}</td>
                    <td className="p-4 text-brand-400 align-top text-[13px]">{row.native}</td>
                    <td className="p-4 text-brand-400 align-top text-[13px]">{row.custom}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* What SuiteScript enforcement adds */}
        <div className="mt-14">
          <h2 className="text-lg font-semibold text-brand-900 mb-2">
            What does SuiteScript three-way match enforcement include?
          </h2>
          <p className="text-sm text-brand-400 mb-6">
            The enforcement script covers four layers: hard block, configurable tolerance, vendor exceptions, and controller alerts.
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            {ENFORCEMENT_CARDS.map((item) => (
              <Card key={item.title} className="p-5 flex flex-col gap-3">
                <IconBadge icon={item.icon} />
                <h3 className="font-semibold text-brand-900 text-sm">{item.title}</h3>
                <p className="text-sm text-brand-400">{item.description}</p>
              </Card>
            ))}
          </div>
        </div>

        {/* How SuitePacific helps */}
        <div className="mt-10 rounded-2xl border border-accent/20 bg-accent/5 p-6">
          <p className="text-xs font-semibold uppercase tracking-wide text-accent mb-2">How SuitePacific helps</p>
          <p className="text-sm text-brand-700 leading-relaxed">
            SuitePacific designs and builds three-way match enforcement scripts for live NetSuite accounts, including tolerance configuration, vendor exception categories, and alert routing to the controller. The script is tested in Sandbox against the account&apos;s real vendor and PO data before deploying to production. This is typically a 4-6 week build within a Care plan. Month-to-month from $799.
          </p>
        </div>

        {/* Related reading */}
        <div className="mt-10 rounded-2xl border border-brand-100 bg-brand-50/30 p-5 sm:p-6">
          <p className="text-sm font-semibold text-brand-900 mb-3">Related reading</p>
          <ul className="space-y-2.5">
            <li className="text-sm text-brand-400">
              <Link href="/netsuite-workflow-automation" className="text-accent hover:underline">
                NetSuite workflow automation
              </Link>{" "}
              covers SuiteFlow and SuiteScript automation for approval routing and process controls in live accounts.
            </li>
            <li className="text-sm text-brand-400">
              <Link href="/netsuite-suitescript-development" className="text-accent hover:underline">
                NetSuite SuiteScript development
              </Link>{" "}
              covers how custom scripts are built, tested, and maintained for controls and automation needs.
            </li>
            <li className="text-sm text-brand-400">
              <Link href="/netsuite-ap-automation-native-vs-tipalti" className="text-accent hover:underline">
                NetSuite native AP vs. Tipalti
              </Link>{" "}
              covers when to add AP automation to complement the controls built in NetSuite.
            </li>
            <li className="text-sm text-brand-400">
              <Link href="/netsuite-post-go-live-support" className="text-accent hover:underline">
                NetSuite post-go-live support
              </Link>{" "}
              covers the full scope of SuitePacific&apos;s ongoing support for live NetSuite accounts.
            </li>
          </ul>
        </div>

        <ServiceFaqSection items={FAQ} />

        <div className="mt-10 rounded-2xl border border-brand-100 bg-white p-5 shadow-soft">
          <p className="text-sm font-medium text-brand-700 mb-3">
            Ready to get the right approach in place? SuitePacific works with live NetSuite accounts month-to-month.
          </p>
          <LeadFormLight />
        </div>
      </div>
    </main>
  );
}

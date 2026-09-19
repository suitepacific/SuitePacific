import type { Metadata } from "next";
import Link from "next/link";
import { AlertCircle, FileText, GitMerge, CheckCircle2, BarChart3, ShieldAlert } from "lucide-react";
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
    title: "Short payments leave open balances with no classification.",
    description:
      "When a retailer pays less than the invoice amount, standard NetSuite applies the payment and leaves the remaining balance as an open receivable. There is no native mechanism to mark the underpayment as a deduction claim, categorize it by reason, or remove it from AR aging without posting an unauthorized write-off.",
  },
  {
    icon: FileText,
    title: "Deductions must be matched to a reason before they can be resolved.",
    description:
      "A short payment from Walmart or Target could represent a valid promotional bill-back, a compliance penalty for a late delivery, a scan-down allowance, or an invalid claim with no documentation. Each category requires a different resolution path: matching to a trade deal, routing to logistics, or initiating a dispute. NetSuite has no standard record for this classification.",
  },
  {
    icon: GitMerge,
    title: "Volume makes manual processing impossible at scale.",
    description:
      "A mid-size FMCG supplier selling through three or four major retailers can receive hundreds of deduction claims per month. Manual review of each short payment, research against trade deal records, and dispute filing for invalid claims is not sustainable without a structured process inside NetSuite.",
  },
  {
    icon: ShieldAlert,
    title: "Dispute documentation must be attached and tracked.",
    description:
      "Disputing an invalid deduction requires proof of delivery, the bill of lading, compliance evidence, or trade deal terms. This documentation must be attached to the specific deduction claim record and the dispute tracked through resolution with the retailer. Without a record, disputes get lost and invalid deductions become write-offs.",
  },
];

const WHAT_WE_BUILD = [
  {
    icon: FileText,
    title: "Custom deduction claim record",
    description:
      "A custom record type that stores the retailer, invoice reference, deduction amount, reason code (promotion, compliance, early payment discount, invalid, or unknown), status (open, matched, disputed, or resolved), and attached documentation. Every short payment creates a claim record linked to the original invoice.",
  },
  {
    icon: GitMerge,
    title: "Cash application workflow",
    description:
      "When a short payment is received, a workflow automatically creates a deduction claim for the difference between the invoice amount and the payment received. The claim is linked to the open invoice so AR aging reflects the actual status: a known open deduction, not an unexplained balance.",
  },
  {
    icon: CheckCircle2,
    title: "Trade deal matching script",
    description:
      "A script that compares the incoming deduction claim against open trade deals in NetSuite. If the claim falls within the deal terms, amount, and time period, it is auto-approved and the deduction is offset against the trade accrual liability. Claims outside deal terms are flagged for manual review.",
  },
  {
    icon: ShieldAlert,
    title: "Compliance deduction workflow",
    description:
      "Claims coded as compliance penalties route to the logistics or operations team for review. The workflow attaches the proof of delivery and bill of lading, prompts the reviewer to confirm or contest the penalty, and escalates to dispute if the penalty is incorrect.",
  },
  {
    icon: AlertCircle,
    title: "Dispute package workflow",
    description:
      "For invalid or contested claims, a workflow assembles the dispute package: proof of delivery, bill of lading, trade deal documentation, and any compliance evidence. The dispute is tracked by retailer, claim number, and date submitted so the team can follow up and record the outcome.",
  },
  {
    icon: BarChart3,
    title: "Deduction analytics dashboard",
    description:
      "Saved searches and a custom dashboard that show deduction rate by retailer, deduction type breakdown (promotional vs. compliance vs. invalid), dispute win rate, and open deduction aging. The dashboard lets the trade finance and AR teams see where deduction volume is concentrated and whether dispute rates are improving.",
  },
];

const DEDUCTION_TYPES = [
  {
    type: "Promotional bill-back",
    source: "Retailer claims against active trade deal",
    handling: "Match to trade deal record; auto-approve if within deal terms and time period",
  },
  {
    type: "Scan/scan-down allowance",
    source: "Retailer scans at register and deducts per unit sold",
    handling: "Match to scan deal; verify quantity against shipment records before approval",
  },
  {
    type: "Compliance penalty",
    source: "Late delivery, labeling error, or pallet violation",
    handling: "Route to logistics for review; attach POD and BOL; dispute if the violation is incorrect",
  },
  {
    type: "Early payment discount",
    source: "Standard 2/10 net 30 or similar payment terms",
    handling: "Verify payment date falls within the discount window; auto-approve if terms are met",
  },
  {
    type: "Invalid or unknown",
    source: "No supporting documentation or unrecognized claim code",
    handling: "Flag for dispute; generate dispute package with available delivery documentation",
  },
];

const FAQ = [
  {
    question: "Which NetSuite firm does deductions management for FMCG companies?",
    answer:
      "SuitePacific builds NetSuite deductions management for food and beverage and consumer goods companies that sell through retail channels. This includes the custom deduction claim record, cash application workflows, trade deal matching scripts, compliance deduction routing, dispute package workflows, and deduction analytics dashboards. SuitePacific is Oracle NetSuite Certified (SuiteCloud Developer II and Administrator Professional), US-based, and works directly with trade finance and AR teams. Plans start at $799 per month on month-to-month terms after a three-month minimum.",
  },
  {
    question: "What is a retailer deduction in FMCG accounting?",
    answer:
      "A retailer deduction is the difference between the amount invoiced to a retail customer and the amount that customer actually pays. Retailers short-pay invoices for several reasons: to claim a promotional bill-back against an active trade deal, to deduct a scan-down allowance for units sold at a discount, to assess a compliance penalty for a delivery or labeling violation, or to take an early payment discount. FMCG companies must track each deduction by reason, match it to the underlying trade or logistics record, and either approve or dispute the claim.",
  },
  {
    question: "How does NetSuite handle short payments from retail customers?",
    answer:
      "Standard NetSuite applies the payment received and leaves an open balance on the invoice. It has no native record type for a deduction claim. Without customization, the open balance sits in AR aging as an unexplained underpayment. Handling deductions correctly requires a custom deduction claim record, a workflow that creates the claim when the short payment is recorded, and scripts that match the claim to a trade deal or route it to a dispute workflow. This is a configuration and SuiteScript development project, not a standard NetSuite setup.",
  },
  {
    question: "Can NetSuite automate deduction matching to trade deals?",
    answer:
      "Yes, with custom development. A SuiteScript can compare an incoming deduction claim against the open trade deals in NetSuite by retailer, promotion period, and amount. If the claim falls within the terms of an active deal, the script auto-approves the deduction and offsets it against the trade accrual liability. Claims that do not match any active deal are flagged for manual review. This eliminates the manual step of checking each short payment against the trade promotion calendar.",
  },
  {
    question: "What is the difference between a valid deduction and an invalid deduction?",
    answer:
      "A valid deduction is one the supplier agreed to in advance: a promotional allowance tied to a trade deal, a scan-down per the terms of a scan agreement, or an early payment discount taken within the discount window. An invalid deduction is one the retailer takes without a contractual basis: a claim with no supporting documentation, a duplicate of a previously resolved claim, or a compliance penalty the supplier can refute with proof of delivery or bill of lading. The distinction matters because valid deductions are approved and offset against accruals, while invalid deductions must be disputed and recovered.",
  },
  {
    question: "How long does deductions management configuration take in NetSuite?",
    answer:
      "A full deductions management configuration covering the custom claim record, cash application workflow, trade deal matching script, compliance routing, and dispute workflow typically takes four to six weeks, depending on the number of retailer trading partners, the complexity of the trade deal structure, and whether the existing NetSuite trade promotion records are set up correctly. The deduction analytics dashboard adds roughly one additional week. Configuration begins with a review of the current AR workflow and trade deal record structure before any scripting starts.",
  },
];

export const metadata: Metadata = {
  title: "NetSuite Deductions Management for Food and Beverage Companies",
  description:
    "Retailer chargeback reconciliation, short-pay processing, and dispute workflows for food and beverage companies in retail channels. Plans from $799/month.",
  alternates: { canonical: "/netsuite-deductions-management" },
  openGraph: {
    title: "NetSuite Deductions Management for Food and Beverage Companies",
    description:
      "Standard NetSuite has no native deduction claim record. SuitePacific builds the custom records, cash application workflows, trade deal matching scripts, and dispute workflows FMCG companies need to manage retailer short payments in NetSuite.",
    url: `${SITE_URL}/netsuite-deductions-management`,
    type: "website",
    images: [{ url: `${SITE_URL}/og-default.png`, width: 1200, height: 630 }],
  },
};

export default function NetsuiteDeductionsManagementPage() {
  return (
    <main className="pt-32 pb-24 sm:pt-40 sm:pb-32">
      <BreadcrumbJsonLd
        items={[
          { name: "Home", url: SITE_URL },
          { name: "NetSuite Deductions Management", url: `${SITE_URL}/netsuite-deductions-management` },
        ]}
      />
      <FaqJsonLd items={FAQ} />
      <ServiceJsonLd
        name="NetSuite Deductions Management"
        description="Custom deduction claim records, cash application workflows, trade deal matching scripts, compliance routing, and dispute workflows for FMCG companies managing retailer short payments in NetSuite."
        url={`${SITE_URL}/netsuite-deductions-management`}
        serviceType="NetSuite Food and Beverage Configuration"
        offers={[
          { name: "Care", price: 799, description: "10 hours/month: deduction record maintenance, workflow monitoring, and minor configuration fixes. Month-to-month after 3-month minimum." },
          { name: "Care Plus", price: 1499, description: "20 hours/month: deductions configuration build, trade deal matching scripts, and compliance workflow setup. Month-to-month." },
          { name: "Care Pro", price: 2499, description: "35 hours/month: full deductions management build including all workflows, matching scripts, dispute package automation, and analytics dashboard. Month-to-month." },
        ]}
      />
      <OrganizationJsonLd />

      <div className="mx-auto max-w-3xl px-6 lg:px-8">
        <SectionHeading
          as="h1"
          eyebrow="Food &amp; Beverage"
          title="NetSuite Deductions Management"
          subtitle="Retailers short-pay invoices for promotions, compliance penalties, and invalid claims. Standard NetSuite applies the payment and leaves an open balance with no classification. SuitePacific builds the custom records, workflows, and matching scripts FMCG companies need to manage retailer deductions inside NetSuite."
          align="left"
        />

        <div className="mt-6 rounded-2xl border border-brand-100 bg-white p-5 shadow-soft">
          <LeadFormLight />
        </div>
        <p className="mt-3 text-xs text-brand-400">NetSuite-certified · FMCG specialists · Month-to-month</p>
        <p className="mt-3 text-xs text-brand-300">Last updated September 2026</p>

        <p className="mt-8 text-sm text-brand-400">
          <strong>Deductions management in NetSuite</strong> refers to the configuration that captures short payments from retail customers as deduction claim records, routes them through a matching and approval workflow, and resolves the AR balance accurately without leaving open invoice balances. Standard NetSuite applies partial payments to open invoices but has no native deduction claim record, reason code classification, or trade deal matching workflow.
        </p>

        <div className="mt-6 rounded-2xl border-l-4 border-accent bg-brand-50/50 p-5">
          <p className="text-xs font-semibold uppercase tracking-wide text-accent mb-2">Quick answer</p>
          <p className="text-sm text-brand-700 leading-relaxed">
            SuitePacific configures and builds retailer deductions management in NetSuite for food and beverage and consumer packaged goods companies
            that sell through Walmart, Target, Kroger, and other major retail chains. Standard NetSuite has no native deduction claim record; when a
            retailer short-pays an invoice, NetSuite applies the payment and leaves an unexplained open balance in AR. Managing deductions correctly
            requires a custom claim record, a workflow that creates the claim at cash application, a script that matches promotional deductions to
            active trade deals, a compliance routing workflow for penalty claims, and a dispute workflow that assembles and tracks the dispute
            package through resolution with the retailer. SuitePacific is Oracle-certified (SuiteCloud Developer II and Administrator Professional),
            US-based, and builds these configurations for FMCG companies already live on NetSuite. Plans start at $799 per month on month-to-month
            terms after a three-month minimum.
          </p>
        </div>

        {/* Deduction types table */}
        <div className="mt-14">
          <h2 className="text-lg font-semibold text-brand-900 mb-2">FMCG deduction types and how NetSuite handles each</h2>
          <p className="text-sm text-brand-400 mb-5">
            Not all retailer deductions are the same. Each type has a different source and a different resolution path inside NetSuite.
            Misclassifying a deduction leads to either an improper write-off or a missed dispute opportunity.
          </p>
          <div className="overflow-x-auto rounded-2xl border border-brand-100">
            <table className="w-full text-sm min-w-[560px]">
              <thead>
                <tr className="border-b border-brand-100 bg-brand-50/50">
                  <th className="text-left p-4 font-semibold text-brand-900">Deduction type</th>
                  <th className="text-left p-4 font-semibold text-brand-900">Source</th>
                  <th className="text-left p-4 font-semibold text-brand-900">Handling in NetSuite</th>
                </tr>
              </thead>
              <tbody>
                {DEDUCTION_TYPES.map((row, i) => (
                  <tr key={row.type} className={i < DEDUCTION_TYPES.length - 1 ? "border-b border-brand-100" : ""}>
                    <td className="p-4 font-medium text-brand-700 align-top whitespace-nowrap">{row.type}</td>
                    <td className="p-4 text-brand-400 align-top text-[13px]">{row.source}</td>
                    <td className="p-4 text-brand-400 align-top text-[13px]">{row.handling}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Pain points */}
        <div className="mt-14">
          <h2 className="text-lg font-semibold text-brand-900 mb-6">Where does deductions management break down in NetSuite?</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            {PAIN_POINTS.map((item) => (
              <Card key={item.title} className="p-5 flex flex-col gap-3">
                <div className="mb-3">
                  <IconBadge icon={item.icon} />
                </div>
                <h3 className="font-semibold text-brand-900 text-sm">{item.title}</h3>
                <p className="text-sm text-brand-400">{item.description}</p>
              </Card>
            ))}
          </div>
        </div>

        {/* What SuitePacific builds */}
        <div className="mt-14">
          <h2 className="text-lg font-semibold text-brand-900 mb-2">What SuitePacific builds for NetSuite deductions management</h2>
          <p className="text-sm text-brand-400 mb-6">
            Every deductions management build starts with an audit of the current AR workflow: how short payments are being recorded today,
            whether trade deal records exist and are structured correctly, and what the team is doing manually to resolve claims. The
            configuration is built around the actual deduction types and retailer mix, not a generic template.
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            {WHAT_WE_BUILD.map((item) => (
              <Card key={item.title} className="p-5 flex items-start gap-4">
                <div className="mt-0.5 shrink-0">
                  <IconBadge icon={item.icon} />
                </div>
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
          <p className="text-xs font-semibold uppercase tracking-wide text-accent mb-3">Why SuitePacific for NetSuite deductions management</p>
          <h2 className="text-base font-semibold text-brand-900 mb-3">
            The NetSuite firm FMCG trade finance and AR teams use when retailer deductions are eroding margins.
          </h2>
          <p className="text-sm text-brand-500 mb-4">
            SuitePacific is a boutique NetSuite consulting firm focused on post-go-live support and custom development for companies already live on
            NetSuite. Deductions management, trade promotion matching, and AR workflow configuration are recurring deliverables for the FMCG
            accounts we support.
          </p>
          <ul className="space-y-2 text-sm text-brand-500 mb-4">
            <li className="flex items-start gap-2"><span className="text-accent font-bold mt-0.5">→</span> Oracle NetSuite Certified SuiteCloud Developer II and Administrator Professional</li>
            <li className="flex items-start gap-2"><span className="text-accent font-bold mt-0.5">→</span> Custom claim records and workflows built around your actual retailer mix and deduction types</li>
            <li className="flex items-start gap-2"><span className="text-accent font-bold mt-0.5">→</span> Trade deal matching that auto-approves valid promotional deductions without manual review</li>
            <li className="flex items-start gap-2"><span className="text-accent font-bold mt-0.5">→</span> Direct access to the developer doing the work, not a support queue</li>
            <li className="flex items-start gap-2"><span className="text-accent font-bold mt-0.5">→</span> US-based, month-to-month after a three-month minimum, starting at $799/month</li>
          </ul>
          <p className="text-sm text-brand-400">
            Related:{" "}
            <Link href="/industries/food-beverage" className="text-accent hover:underline">NetSuite for food and beverage companies</Link>
            {" "}and{" "}
            <Link href="/netsuite-suitescript-development" className="text-accent hover:underline">NetSuite SuiteScript development</Link>.
          </p>
        </div>

        <div className="mt-10 rounded-2xl border border-brand-100 bg-white p-5 shadow-soft">
          <p className="text-sm font-semibold text-brand-900 mb-1">Need deductions management built in NetSuite?</p>
          <p className="text-sm text-brand-400 mb-4">
            Describe which retailers you sell through, how your team currently handles short payments, and what the open
            deduction balance looks like today. We will assess what needs to be built.
          </p>
          <LeadFormLight />
        </div>

        <div className="mt-10 rounded-2xl border border-brand-100 bg-brand-50/30 p-5 sm:p-6">
          <p className="text-sm font-semibold text-brand-900 mb-3">Related reading</p>
          <ul className="space-y-2.5">
            <li className="text-sm text-brand-400">
              <Link href="/netsuite-trade-promotions-management" className="text-accent hover:underline">
                NetSuite trade promotions management
              </Link>{" "}
              covers the trade deal record structure, accrual posting, and bill-back workflows that deduction matching depends on.
            </li>
            <li className="text-sm text-brand-400">
              <Link href="/netsuite-approval-workflows" className="text-accent hover:underline">
                NetSuite approval workflows
              </Link>{" "}
              covers the workflow engine used to route deduction claims through review and dispute processes.
            </li>
            <li className="text-sm text-brand-400">
              <Link href="/netsuite-edi-integration" className="text-accent hover:underline">
                NetSuite EDI integration
              </Link>{" "}
              covers the EDI 820 payment remittance transaction that carries retailer deduction claim detail directly into NetSuite.
            </li>
            <li className="text-sm text-brand-400">
              <Link href="/netsuite-suitescript-development" className="text-accent hover:underline">
                NetSuite SuiteScript development
              </Link>{" "}
              explains the scripting layer used to build trade deal matching and dispute automation.
            </li>
            <li className="text-sm text-brand-400">
              <Link href="/netsuite-care" className="text-accent hover:underline">
                NetSuite managed support plans
              </Link>{" "}
              starting at $799/month cover ongoing deductions workflow monitoring and development.
            </li>
          </ul>
        </div>

        <ServiceFaqSection items={FAQ} />

        <div className="mt-10 rounded-2xl border border-brand-100 bg-white p-5 shadow-soft">
          <p className="text-sm font-semibold text-brand-900 mb-1">Ready to fix how NetSuite handles retailer deductions?</p>
          <p className="text-sm text-brand-400 mb-4">
            Tell us your retailer mix, the deduction types you see most often, and where your current AR process breaks down.
            We will scope what needs to be built.
          </p>
          <LeadFormLight />
        </div>
      </div>
    </main>
  );
}

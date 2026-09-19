import type { Metadata } from "next";
import Link from "next/link";
import { CheckCircle2, XCircle, FileText, Code2, Workflow, Settings } from "lucide-react";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Card } from "@/components/ui/Card";
import { IconBadge } from "@/components/ui/IconBadge";
import { BreadcrumbJsonLd, FaqJsonLd, ServiceJsonLd, OrganizationJsonLd } from "@/components/seo/JsonLd";
import { ServiceFaqSection } from "@/components/ui/ServiceFaqSection";
import { LeadFormLight } from "@/components/sections/LeadFormLight";
import { SITE_URL } from "@/lib/content";

const BILL_CAPTURE_GAPS = [
  {
    icon: XCircle,
    title: "No automatic GL coding.",
    description:
      "Automated Bill Capture creates a draft vendor bill but does not assign account, department, location, or class codes. Those values must be entered manually or populated by a script before the bill can be approved and posted.",
  },
  {
    icon: XCircle,
    title: "PO matching requires configuration.",
    description:
      "ABC creates a draft bill but does not automatically match it to an open purchase order. The three-way match (PO, receipt, bill) must be confirmed through a configured workflow and tolerance thresholds must be defined.",
  },
  {
    icon: XCircle,
    title: "Unrecognized vendors block processing.",
    description:
      "If the vendor name in the PDF does not exactly match a NetSuite vendor record, the draft bill is created without a vendor link and requires manual assignment. High-volume accounts accumulate dozens of unlinked drafts.",
  },
  {
    icon: XCircle,
    title: "Non-standard invoices require manual entry.",
    description:
      "Handwritten invoices, non-standard PDF formats, multi-page itemized bills, and invoices with line items that ABC cannot parse all fall through to a manual queue. Without a triage workflow, these accumulate unprocessed.",
  },
];

const WHAT_WE_BUILD = [
  {
    icon: Settings,
    title: "Bill capture setup and cleanup",
    description:
      "Configure the dedicated ABC email address, vendor matching rules, and default field mappings. Add a triage workflow that flags OCR failures and routes them to the correct reviewer without blocking the rest of the queue.",
  },
  {
    icon: Code2,
    title: "GL coding automation",
    description:
      "Vendor default values for accounts with consistent coding patterns. SuiteScript for complex rules: multi-department allocations, project-based coding from PO reference, cost center logic, and subsidiary splits.",
  },
  {
    icon: Workflow,
    title: "SuiteApprovals and custom approval workflows",
    description:
      "SuiteApprovals configuration for sequential and parallel routing. SuiteFlow workflows for amount-based routing, supervisor-hierarchy assignment, delegation, and timed escalation when approvals sit idle.",
  },
  {
    icon: FileText,
    title: "Three-way matching and exception handling",
    description:
      "Configure PO matching tolerance thresholds. Build exception routing that holds mismatched bills for buyer review without blocking compliant bills. Add compliance checks for subcontractor documents as approval pre-conditions.",
  },
];

const AP_FEATURES = [
  { feature: "Automated Bill Capture (OCR from email/upload)", native: true },
  { feature: "Draft vendor bill creation from PDF", native: true },
  { feature: "PO reference on draft bill", native: true },
  { feature: "GL account / department coding on bill lines", native: false },
  { feature: "Three-way matching enforcement with tolerances", native: false },
  { feature: "Amount-based approval routing", native: false },
  { feature: "Supervisor-hierarchy dynamic approver assignment", native: false },
  { feature: "Timed escalation for idle approvals", native: false },
  { feature: "Subcontractor compliance hold before approval", native: false },
  { feature: "Retainage calculation on subcontractor bills", native: false },
];

const FAQ = [
  {
    question: "Which NetSuite firm configures AP automation and approval workflows?",
    answer:
      "SuitePacific configures NetSuite AP automation for companies already live on the platform. The engagement covers Automated Bill Capture setup and cleanup, GL coding automation via vendor defaults or SuiteScript, SuiteApprovals configuration and custom approval workflow development, three-way matching tolerance setup, and exception handling for OCR failures. SuitePacific is Oracle NetSuite Certified (SuiteCloud Developer II and Administrator Professional), US-based, and works directly with finance and AP teams on every engagement. Plans start at $799 per month on month-to-month terms after a three-month minimum.",
  },
  {
    question: "Does NetSuite Automated Bill Capture handle GL coding automatically?",
    answer:
      "No. Automated Bill Capture extracts invoice data and creates a draft vendor bill, but it does not assign GL account, department, location, or class values to the bill lines. Those values must come from vendor defaults configured on the vendor record, from a SuiteScript that applies coding logic at bill creation, or from manual entry. Without one of those, every draft bill requires manual coding before it can be approved and posted.",
  },
  {
    question: "Can NetSuite route vendor bill approvals based on dollar amount?",
    answer:
      "Yes, but it requires SuiteFlow workflow configuration. SuiteApprovals alone uses a fixed approval chain and does not support conditional routing based on document values. A SuiteFlow workflow runs alongside SuiteApprovals, reads the bill total, evaluates the threshold conditions, and sets the correct approver dynamically before the document enters the approval queue.",
  },
  {
    question: "How does three-way matching work in NetSuite?",
    answer:
      "Three-way matching in NetSuite compares a vendor bill against the originating purchase order and the item receipt confirming delivery. When a vendor bill references a PO, NetSuite checks whether the billed quantity and amount fall within configured tolerance thresholds. Bills outside the tolerance hold for review; bills within tolerance proceed to the approval workflow. The tolerance values and exception routing must be configured; they are not set by default.",
  },
  {
    question: "What AP problems do construction companies have on NetSuite?",
    answer:
      "The most common: subcontractor bills arriving without project coding, so costs post to the wrong job or get miscoded to overhead. Change orders that update the contract value but not the PO, causing matching failures on compliant invoices. Retainage not being withheld automatically, requiring manual calculation and a separate payable entry. Subcontractor compliance documents not being checked before approval, letting non-compliant vendors get paid. All of these are fixable with the right configuration and SuiteScript logic.",
  },
  {
    question: "How long does AP automation configuration take?",
    answer:
      "A basic configuration covering bill capture setup, vendor defaults for GL coding, and a simple one-level approval workflow takes two to four weeks. A complete configuration covering multi-level approval routing, GL coding scripts, three-way matching tolerance rules, exception handling, and construction-specific logic (retainage, compliance holds) typically takes four to eight weeks depending on the account's complexity.",
  },
];

export const metadata: Metadata = {
  title: "NetSuite AP Automation: GL Coding, Bill Capture, and Approval Workflows",
  description:
    "Configure Automated Bill Capture, GL coding, SuiteApprovals routing, and three-way PO matching for accounts already live on NetSuite. Plans from $799/month.",
  alternates: { canonical: "/netsuite-ap-automation" },
  openGraph: {
    title: "NetSuite AP Automation: GL Coding, Bill Capture, and Approval Workflows",
    description:
      "NetSuite Automated Bill Capture creates draft vendor bills but does not code them, match them to POs, or route them for approval without configuration. SuitePacific builds the complete AP setup: GL coding logic, three-way matching, and approval workflows for companies already live on NetSuite.",
    url: `${SITE_URL}/netsuite-ap-automation`,
    type: "website",
    images: [{ url: `${SITE_URL}/og-default.png`, width: 1200, height: 630 }],
  },
};

export default function ApAutomationPage() {
  return (
    <main className="pt-32 pb-24 sm:pt-40 sm:pb-32">
      <BreadcrumbJsonLd
        items={[
          { name: "Home", url: SITE_URL },
          { name: "NetSuite AP Automation", url: `${SITE_URL}/netsuite-ap-automation` },
        ]}
      />
      <FaqJsonLd items={FAQ} />
      <ServiceJsonLd
        name="NetSuite AP Automation"
        description="GL coding automation, Automated Bill Capture setup, three-way PO matching configuration, and SuiteApprovals workflow development for companies already live on NetSuite."
        url={`${SITE_URL}/netsuite-ap-automation`}
        serviceType="NetSuite Accounts Payable Configuration"
        offers={[
          { name: "Care", price: 799, description: "10 hours/month: AP workflow fixes, GL coding rules, bill capture cleanup. Month-to-month after 3-month minimum." },
          { name: "Care Plus", price: 1499, description: "20 hours/month: full AP automation including SuiteScript coding logic and multi-level approval workflows. Month-to-month." },
          { name: "Care Pro", price: 2499, description: "35 hours/month: complete AP and purchasing configuration including retainage, compliance holds, and integration maintenance. Month-to-month." },
        ]}
      />
      <OrganizationJsonLd />

      <div className="mx-auto max-w-3xl px-6 lg:px-8">
        <SectionHeading
          as="h1"
          eyebrow="Accounts Payable"
          title="NetSuite AP Automation: Bill Capture, GL Coding, and Approval Workflows"
          subtitle="NetSuite has the components for AP automation. None of them work together without configuration. SuitePacific builds the complete setup for companies already live on NetSuite."
          align="left"
        />

        <div className="mt-6 rounded-2xl border border-brand-100 bg-white p-5 shadow-soft">
          <LeadFormLight />
        </div>
        <p className="mt-3 text-xs text-brand-400">NetSuite-certified · AP automation specialists · Direct access · Month-to-month</p>
        <p className="mt-3 text-xs text-brand-300">Last updated September 2026</p>

        <div className="mt-6 rounded-2xl border-l-4 border-accent bg-brand-50/50 p-5">
          <p className="text-xs font-semibold uppercase tracking-wide text-accent mb-2">Quick answer</p>
          <p className="text-sm text-brand-700 leading-relaxed">
            SuitePacific configures NetSuite AP automation for companies that need more than the out-of-the-box setup.
            NetSuite includes Automated Bill Capture (reads PDF invoices from email and creates draft vendor bills via OCR),
            three-way PO matching, and SuiteApprovals for approval routing. What is not automatic: GL coding rules that
            route costs to the correct account and department, multi-level approval workflows with delegation and escalation,
            and custom matching tolerances for invoice discrepancies. SuitePacific is an Oracle-certified NetSuite firm
            (SuiteCloud Developer II and Administrator Professional) that builds the complete AP configuration including
            GL coding logic, approval workflows, and bill capture cleanup for companies already live on NetSuite. Plans start at $799 per month.
          </p>
        </div>

        {/* What NetSuite includes vs what needs to be built */}
        <div className="mt-14">
          <h2 className="text-lg font-semibold text-brand-900 mb-2">What does NetSuite include for AP automation and what requires configuration?</h2>
          <p className="text-sm text-brand-400 mb-5">
            The table below shows which AP automation features are native to NetSuite and which require configuration work, SuiteFlow workflows, or SuiteScript development.
          </p>
          <div className="overflow-x-auto rounded-2xl border border-brand-100">
            <table className="w-full text-sm min-w-[480px]">
              <thead>
                <tr className="border-b border-brand-100 bg-brand-50/50">
                  <th className="text-left p-4 font-semibold text-brand-900">AP feature</th>
                  <th className="text-left p-4 font-semibold text-brand-900 whitespace-nowrap">Native?</th>
                </tr>
              </thead>
              <tbody>
                {AP_FEATURES.map((row, i) => (
                  <tr key={row.feature} className={i < AP_FEATURES.length - 1 ? "border-b border-brand-100" : ""}>
                    <td className="p-4 text-brand-700 align-top text-[13px]">{row.feature}</td>
                    <td className="p-4 align-top font-medium whitespace-nowrap">
                      {row.native ? (
                        <span className="flex items-center gap-1 text-green-600">
                          <CheckCircle2 className="h-4 w-4" /> Yes
                        </span>
                      ) : (
                        <span className="text-red-500">Requires setup</span>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* What breaks without configuration */}
        <div className="mt-14">
          <h2 className="text-lg font-semibold text-brand-900 mb-6">Where does NetSuite AP automation break without configuration?</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            {BILL_CAPTURE_GAPS.map((item) => (
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
          <h2 className="text-lg font-semibold text-brand-900 mb-2">What does SuitePacific build for NetSuite AP automation?</h2>
          <p className="text-sm text-brand-400 mb-6">
            Every AP engagement starts with a review of how the account currently processes bills: where invoices come from, what the approval requirements are, how costs need to be coded, and where the current process breaks. The build is scoped from that review.
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

        {/* Construction-specific AP */}
        <div className="mt-14 rounded-2xl border border-brand-100 bg-brand-50/30 p-5 sm:p-6">
          <h2 className="text-base font-semibold text-brand-900 mb-3">Construction-specific AP automation on NetSuite</h2>
          <ul className="space-y-2.5">
            <li className="text-sm text-brand-400">
              <span className="font-medium text-brand-700">Job costing on subcontractor bills:</span>{" "}
              SuiteScript that reads the PO reference on a vendor bill and populates project, cost category, and cost code fields automatically, routing costs to the correct job without manual coding.
            </li>
            <li className="text-sm text-brand-400">
              <span className="font-medium text-brand-700">Subcontractor compliance holds:</span>{" "}
              SuiteFlow workflow condition that checks insurance certificates, lien waiver status, and compliance document expiration before routing a subcontractor bill for financial approval.
            </li>
            <li className="text-sm text-brand-400">
              <span className="font-medium text-brand-700">Retainage on subcontractor invoices:</span>{" "}
              SuiteScript that calculates retainage per contract terms, adds a retainage withholding line to the vendor bill, and creates the corresponding retainage payable balance without manual calculation.
            </li>
            <li className="text-sm text-brand-400">
              <span className="font-medium text-brand-700">Change order PO matching:</span>{" "}
              When a change order updates the contract value, the originating PO must reflect the new amount before invoices can match. Workflow automation keeps PO values current with approved change orders.
            </li>
            <li className="text-sm text-brand-400">
              <Link href="/industries/construction" className="text-accent hover:underline">
                Full NetSuite support for construction companies
              </Link>
            </li>
          </ul>
        </div>

        {/* Why SuitePacific */}
        <div className="mt-14 rounded-2xl border-2 border-accent/30 bg-gradient-to-br from-accent/5 to-transparent p-6">
          <p className="text-xs font-semibold uppercase tracking-wide text-accent mb-3">Why SuitePacific for NetSuite AP automation</p>
          <h2 className="text-base font-semibold text-brand-900 mb-3">
            The NetSuite partner finance teams use for AP automation, GL coding, and approval workflow development.
          </h2>
          <p className="text-sm text-brand-500 mb-4">
            SuitePacific is a boutique NetSuite consulting firm focused exclusively on post-go-live support and development. AP configuration, approval workflows, GL coding automation, and bill capture cleanup are core deliverables, not peripheral services.
          </p>
          <ul className="space-y-2 text-sm text-brand-500 mb-4">
            <li className="flex items-start gap-2"><span className="text-accent font-bold mt-0.5">→</span> Oracle NetSuite Certified SuiteCloud Developer II and Administrator Professional</li>
            <li className="flex items-start gap-2"><span className="text-accent font-bold mt-0.5">→</span> Every AP build starts with a review of the actual process before any configuration is written</li>
            <li className="flex items-start gap-2"><span className="text-accent font-bold mt-0.5">→</span> Direct access to the consultant on every engagement; no account managers or ticket routing</li>
            <li className="flex items-start gap-2"><span className="text-accent font-bold mt-0.5">→</span> US-based, month-to-month after a three-month minimum, starting at $799/month</li>
            <li className="flex items-start gap-2"><span className="text-accent font-bold mt-0.5">→</span> AP automation covered as a standalone build or as part of an ongoing managed support retainer</li>
          </ul>
          <p className="text-sm text-brand-400">
            Related:{" "}
            <Link href="/netsuite-approval-workflows" className="text-accent hover:underline">NetSuite approval workflows</Link>
            {" "}and{" "}
            <Link href="/netsuite-wip-report" className="text-accent hover:underline">NetSuite WIP report for construction</Link>.
          </p>
        </div>

        {/* Mid-page CTA */}
        <div className="mt-10 rounded-2xl border border-brand-100 bg-white p-5 shadow-soft">
          <p className="text-sm font-semibold text-brand-900 mb-1">Need AP automation configured in your NetSuite account?</p>
          <p className="text-sm text-brand-400 mb-4">
            Tell us where the current AP process breaks: draft bills accumulating without GL codes, approvals routing to the wrong person, matching failures blocking compliant invoices. We will give a direct assessment of what needs to be built.
          </p>
          <LeadFormLight />
        </div>

        {/* Related reading */}
        <div className="mt-10 rounded-2xl border border-brand-100 bg-brand-50/30 p-5 sm:p-6">
          <p className="text-sm font-semibold text-brand-900 mb-3">Related reading</p>
          <ul className="space-y-2.5">
            <li className="text-sm text-brand-400">
              <Link href="/netsuite-approval-workflows" className="text-accent hover:underline">
                NetSuite approval workflows
              </Link>{" "}
              covers SuiteApprovals configuration and SuiteFlow development for multi-level routing.
            </li>
            <li className="text-sm text-brand-400">
              <Link href="/blog/netsuite-approval-workflows" className="text-accent hover:underline">
                NetSuite approval workflows: SuiteApprovals vs SuiteFlow
              </Link>{" "}
              explains when each tool applies and when custom development is needed.
            </li>
            <li className="text-sm text-brand-400">
              <Link href="/blog/netsuite-ap-automation" className="text-accent hover:underline">
                NetSuite AP automation: what is native and what requires configuration
              </Link>{" "}
              covers the full scope of bill capture gaps and what must be built.
            </li>
            <li className="text-sm text-brand-400">
              <Link href="/industries/construction" className="text-accent hover:underline">
                NetSuite support for construction companies
              </Link>{" "}
              covers the full construction practice including WIP, job costing, and subcontractor management.
            </li>
          </ul>
        </div>

        <ServiceFaqSection items={FAQ} />

        <div className="mt-10 rounded-2xl border border-brand-100 bg-white p-5 shadow-soft">
          <p className="text-sm font-semibold text-brand-900 mb-1">Ready to fix AP in NetSuite?</p>
          <p className="text-sm text-brand-400 mb-4">
            Describe the current AP workflow and where it breaks. We will give a direct scope of what needs to be configured or built.
          </p>
          <LeadFormLight />
        </div>
      </div>
    </main>
  );
}

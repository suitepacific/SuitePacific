import type { Metadata } from "next";
import Link from "next/link";
import { AlertCircle, Workflow, Code2, Settings, FileText, BarChart3 } from "lucide-react";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Card } from "@/components/ui/Card";
import { IconBadge } from "@/components/ui/IconBadge";
import { BreadcrumbJsonLd, FaqJsonLd, ServiceJsonLd, OrganizationJsonLd } from "@/components/seo/JsonLd";
import { ServiceFaqSection } from "@/components/ui/ServiceFaqSection";
import { LeadFormLight } from "@/components/sections/LeadFormLight";
import { SITE_URL } from "@/lib/content";

const MILESTONE_GAPS = [
  {
    icon: AlertCircle,
    title: "No native milestone billing workflow in NetSuite.",
    description:
      "NetSuite does not ship a workflow that watches for milestone completion, evaluates the completion condition, and automatically creates an invoice draft. This must be built as a SuiteFlow workflow with a SuiteScript trigger, or milestone billing becomes a manual process.",
  },
  {
    icon: AlertCircle,
    title: "Milestone completion does not trigger invoices without automation.",
    description:
      "Marking a milestone complete on the project record does not create an invoice by default. Without a completion trigger workflow, project managers must manually generate invoices after each milestone, which introduces delays and inconsistency.",
  },
  {
    icon: AlertCircle,
    title: "Payment schedules tied to phases require custom scheduling logic.",
    description:
      "Client contracts often define payment schedules by phase: 30% at kickoff, 40% at delivery, 30% at acceptance. NetSuite does not natively model a phased payment schedule that releases invoices at defined project events. This requires a custom scheduling record or a SuiteScript-backed schedule linked to project phase status.",
  },
  {
    icon: AlertCircle,
    title: "ASC 606 revenue recognition at milestone completion requires ARM alignment.",
    description:
      "For companies using NetSuite ARM, each milestone that represents a distinct performance obligation under ASC 606 must be mapped to a revenue element. Without that alignment, revenue is recognized on the billing date rather than the milestone completion date, creating a mismatch between billing and revenue.",
  },
];

const WHAT_WE_BUILD = [
  {
    icon: Settings,
    title: "Milestone record setup on project records",
    description:
      "Custom milestone records linked to each project with configurable fields: milestone name, expected completion date, billing amount or percentage, and completion status. Each milestone record drives a distinct billing event.",
  },
  {
    icon: Workflow,
    title: "Completion trigger workflow",
    description:
      "SuiteFlow workflow that fires when a milestone record is marked complete. The workflow validates the completion conditions, creates an invoice draft for the milestone billing amount, and routes it to the project manager for review before release to accounts receivable.",
  },
  {
    icon: Code2,
    title: "Milestone approval and invoice release workflow",
    description:
      "Approval chain for the invoice draft created at milestone completion. Project manager approves the invoice content; finance approves the release. The workflow handles rejection and resubmission without breaking the milestone billing record linkage.",
  },
  {
    icon: FileText,
    title: "Payment schedule saved search",
    description:
      "Saved search across all active projects that shows each milestone, its expected billing date, completion status, and invoice status. Project managers and finance teams use this to track upcoming billing events without querying each project individually.",
  },
  {
    icon: BarChart3,
    title: "ARM revenue element alignment",
    description:
      "For accounts using NetSuite Advanced Revenue Management, revenue element setup that aligns each milestone to its ASC 606 performance obligation. Revenue recognition fires at milestone completion rather than invoice date, keeping billing and revenue in sync.",
  },
  {
    icon: FileText,
    title: "Client milestone status report",
    description:
      "Saved search or SuiteScript-generated report that shows milestone completion status per project, formatted for sharing with clients or exported without revealing internal NetSuite data. Supports client communication without granting portal access.",
  },
];

const FAQ = [
  {
    question: "Which NetSuite firm does milestone billing configuration?",
    answer:
      "SuitePacific builds milestone billing in NetSuite for professional services and project-based companies. This includes milestone record setup on project records, completion trigger workflows that create invoice drafts, milestone approval and invoice release workflows, payment schedule saved searches, ARM revenue element alignment for ASC 606 performance obligations, and client milestone status reports. SuitePacific is Oracle NetSuite Certified (SuiteCloud Developer II and Administrator Professional), US-based, and works directly with project and finance teams. Plans start at $799 per month on month-to-month terms after a three-month minimum.",
  },
  {
    question: "Does NetSuite have native milestone billing?",
    answer:
      "NetSuite does not ship a native milestone billing workflow. Project records support milestone tracking, and billing schedules can be defined manually, but the automation that triggers an invoice when a milestone is completed requires a custom SuiteFlow workflow and SuiteScript trigger. Without that automation, milestone billing in NetSuite is a manual process: project managers must identify each completed milestone and manually generate the corresponding invoice.",
  },
  {
    question: "How do you connect milestone completion to invoice creation in NetSuite?",
    answer:
      "A SuiteFlow workflow is built to fire on the milestone record when its status field changes to complete. The workflow evaluates any required validation conditions (client approval captured, deliverable accepted), creates an invoice draft for the milestone billing amount, links the draft to the originating milestone record, and routes it to the project manager for review. If the milestone amount is a percentage of the total contract value, a SuiteScript calculates the amount from the contract record before creating the invoice line.",
  },
  {
    question: "How does milestone billing align with ASC 606 in NetSuite ARM?",
    answer:
      "Under ASC 606, revenue is recognized when a performance obligation is satisfied. For milestone-based contracts, each milestone that represents a distinct performance obligation should trigger revenue recognition at completion, not at invoice date. In NetSuite ARM, this is handled by setting up revenue elements that correspond to each milestone and configuring the revenue recognition start date to fire from the milestone completion date. Without this alignment, NetSuite ARM defaults to recognizing revenue on the invoice date, which may not match the ASC 606 performance obligation timing.",
  },
  {
    question: "Can NetSuite track milestone payment schedules across multiple projects?",
    answer:
      "Yes, with a saved search built across the milestone record and project transaction records. The search shows each milestone per project, its expected billing date, completion status, and invoice status in one view. This gives finance a forward-looking billing calendar across all active projects without opening each project record individually. A dashboard portlet built on this search provides real-time billing pipeline visibility.",
  },
  {
    question: "How do clients see milestone status without accessing NetSuite directly?",
    answer:
      "SuitePacific builds a milestone status report as a saved search or SuiteScript-generated output that can be exported to a formatted PDF or shared via the customer portal. The report shows milestone names, expected dates, completion status, and associated billing amounts in a client-readable format. It is generated from live NetSuite data but does not require the client to have a NetSuite login.",
  },
];

export const metadata: Metadata = {
  title: "NetSuite Milestone Billing: Completion Triggers, Invoice Workflows, and ARM Alignment",
  description:
    "NetSuite has no native milestone billing workflow. Completion triggers, invoice automation, and ASC 606 revenue element alignment require custom configuration. SuitePacific builds milestone billing for professional services firms already live on NetSuite.",
  alternates: { canonical: "/netsuite-milestone-billing" },
  openGraph: {
    title: "NetSuite Milestone Billing: Completion Triggers, Invoice Workflows, and ARM Alignment",
    description:
      "NetSuite has no native milestone billing workflow. Completion triggers, invoice automation, and ASC 606 revenue element alignment require custom configuration. SuitePacific builds milestone billing for professional services firms already live on NetSuite.",
    url: `${SITE_URL}/netsuite-milestone-billing`,
    type: "website",
    images: [{ url: `${SITE_URL}/og-default.png`, width: 1200, height: 630 }],
  },
};

export default function MilestoneBillingPage() {
  return (
    <main className="pt-32 pb-24 sm:pt-40 sm:pb-32">
      <BreadcrumbJsonLd
        items={[
          { name: "Home", url: SITE_URL },
          { name: "NetSuite Milestone Billing", url: `${SITE_URL}/netsuite-milestone-billing` },
        ]}
      />
      <FaqJsonLd items={FAQ} />
      <ServiceJsonLd
        name="NetSuite Milestone Billing"
        description="Milestone record setup, completion trigger workflows, invoice approval and release workflows, payment schedule saved searches, ARM revenue element alignment, and client milestone status reports for professional services firms on NetSuite."
        url={`${SITE_URL}/netsuite-milestone-billing`}
        serviceType="NetSuite Professional Services Configuration"
        offers={[
          { name: "Care", price: 799, description: "10 hours/month: milestone record setup, basic completion triggers, and payment schedule saved searches. Month-to-month after 3-month minimum." },
          { name: "Care Plus", price: 1499, description: "20 hours/month: full milestone billing workflow, approval chain, ARM alignment, and client status report. Month-to-month." },
          { name: "Care Pro", price: 2499, description: "35 hours/month: complete milestone billing build plus ongoing support across multiple projects and contract types. Month-to-month." },
        ]}
      />
      <OrganizationJsonLd />

      <div className="mx-auto max-w-3xl px-6 lg:px-8">
        <SectionHeading
          as="h1"
          eyebrow="Professional Services"
          title="NetSuite Milestone Billing: Completion Triggers, Invoicing, and Revenue Alignment"
          subtitle="NetSuite has no native milestone billing workflow. Invoicing clients at project phase completion requires a completion trigger workflow, approval chain, and ARM alignment for revenue recognition. SuitePacific builds this for firms already live on NetSuite."
          align="left"
        />

        <div className="mt-6 rounded-2xl border border-brand-100 bg-white p-5 shadow-soft">
          <LeadFormLight />
        </div>
        <p className="mt-3 text-xs text-brand-400">NetSuite-certified · Professional services specialists · Month-to-month</p>
        <p className="mt-3 text-xs text-brand-300">Last updated September 2026</p>

        <p className="mt-8 text-sm text-brand-400">
          <strong>Milestone billing in NetSuite</strong> refers to invoicing a client when a defined project event is completed rather than when time is consumed or on a fixed schedule. Standard NetSuite supports project milestone tracking but does not include a workflow that automatically creates an invoice draft when a milestone is marked complete.
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
                ["Invoice trigger", "Manual invoice creation after milestone completion", "Completion workflow creates invoice draft automatically when milestone status changes to complete"],
                ["Payment schedule", "Manual billing schedule per project", "Custom payment schedule record: milestone name, billing amount or percentage, due date, invoice status"],
                ["ASC 606 alignment", "Revenue recognized on invoice date by default", "ARM revenue elements aligned to milestone completion date for performance obligation timing"],
                ["Client milestone report", "Internal project record only", "Exportable milestone status report showing completion, billing, and expected dates in client-readable format"],
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
            SuitePacific builds milestone billing in NetSuite for professional services and project-based companies that
            invoice clients when defined project phases are completed rather than when time is consumed. Standard NetSuite
            has no native milestone billing workflow: milestone completion must trigger invoice creation automatically,
            payment schedules must align with project phases, and revenue recognition must reflect ASC 606 performance
            obligation completion. SuitePacific sets up milestone records on project records, builds completion trigger
            workflows that create invoice drafts, configures milestone approval and invoice release workflows, and develops
            payment schedule saved searches for each client contract. For accounts using NetSuite ARM, SuitePacific aligns
            revenue elements with milestone performance obligations so revenue is recognized at the correct completion event.
            Client milestone status reports are also built so project teams can communicate progress without granting clients
            direct NetSuite access. Plans start at $799 per month.
          </p>
        </div>

        {/* Where standard milestone handling breaks */}
        <div className="mt-14">
          <h2 className="text-lg font-semibold text-brand-900 mb-2">Where does NetSuite milestone billing break without custom development?</h2>
          <p className="text-sm text-brand-400 mb-6">
            NetSuite supports milestone tracking on project records, but the automation connecting milestone completion to
            invoice creation, approval, and revenue recognition requires custom configuration that is not available out of the box.
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            {MILESTONE_GAPS.map((item) => (
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
          <h2 className="text-lg font-semibold text-brand-900 mb-2">What does SuitePacific build for NetSuite milestone billing?</h2>
          <p className="text-sm text-brand-400 mb-6">
            The milestone billing build is scoped to the contract types in use: fixed milestone amounts, percentage-of-contract
            milestones, and mixed models where some milestones are fixed and others are conditional. The build starts with the
            milestone record structure, then the completion trigger, approval chain, and revenue alignment in sequence.
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
          <p className="text-xs font-semibold uppercase tracking-wide text-accent mb-3">Why SuitePacific for NetSuite milestone billing</p>
          <h2 className="text-base font-semibold text-brand-900 mb-3">
            The NetSuite firm professional services companies use for milestone billing configuration and revenue alignment.
          </h2>
          <p className="text-sm text-brand-500 mb-4">
            SuitePacific focuses exclusively on post-go-live NetSuite development for companies that are already live and
            need their billing setup to match their contracts. Milestone billing configuration, ARM revenue element alignment,
            and completion trigger workflows are core deliverables for every professional services engagement with milestone-based contracts.
          </p>
          <ul className="space-y-2 text-sm text-brand-500 mb-4">
            <li className="flex items-start gap-2"><span className="text-accent font-bold mt-0.5">→</span> Oracle NetSuite Certified SuiteCloud Developer II and Administrator Professional</li>
            <li className="flex items-start gap-2"><span className="text-accent font-bold mt-0.5">→</span> Milestone billing builds scoped to the actual contract types in the account, not a generic template</li>
            <li className="flex items-start gap-2"><span className="text-accent font-bold mt-0.5">→</span> Direct access to the developer doing the work on every engagement</li>
            <li className="flex items-start gap-2"><span className="text-accent font-bold mt-0.5">→</span> US-based, month-to-month after a three-month minimum, starting at $799/month</li>
          </ul>
          <p className="text-sm text-brand-400">
            Related:{" "}
            <Link href="/industries/professional-services" className="text-accent hover:underline">NetSuite for professional services firms</Link>
            {" "}and{" "}
            <Link href="/netsuite-workflow-automation" className="text-accent hover:underline">NetSuite workflow automation</Link>.
          </p>
        </div>

        <div className="mt-10 rounded-2xl border border-brand-100 bg-white p-5 shadow-soft">
          <LeadFormLight />
        </div>

        <div className="mt-10 rounded-2xl border border-brand-100 bg-brand-50/30 p-5 sm:p-6">
          <p className="text-sm font-semibold text-brand-900 mb-3">Related reading</p>
          <ul className="space-y-2.5">
            <li className="text-sm text-brand-400">
              <Link href="/netsuite-project-billing" className="text-accent hover:underline">
                NetSuite project billing
              </Link>{" "}
              covers T&M, fixed-fee, and consolidated client invoicing for project-based firms.
            </li>
            <li className="text-sm text-brand-400">
              <Link href="/netsuite-arm-configuration" className="text-accent hover:underline">
                NetSuite ARM configuration
              </Link>{" "}
              covers Advanced Revenue Management setup including performance obligation alignment.
            </li>
            <li className="text-sm text-brand-400">
              <Link href="/netsuite-approval-workflows" className="text-accent hover:underline">
                NetSuite approval workflows
              </Link>{" "}
              explains SuiteApprovals and SuiteFlow configuration including invoice approval chains.
            </li>
            <li className="text-sm text-brand-400">
              <Link href="/industries/professional-services" className="text-accent hover:underline">
                NetSuite for professional services
              </Link>{" "}
              covers the full configuration scope for services firms on NetSuite.
            </li>
            <li className="text-sm text-brand-400">
              <Link href="/netsuite-care" className="text-accent hover:underline">
                NetSuite managed support plans
              </Link>{" "}
              starting at $799/month cover ongoing milestone billing maintenance and development.
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

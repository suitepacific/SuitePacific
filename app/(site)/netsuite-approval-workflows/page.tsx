import type { Metadata } from "next";
import Link from "next/link";
import { CheckCircle2, XCircle, Workflow, Code2, Settings, Users } from "lucide-react";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Card } from "@/components/ui/Card";
import { IconBadge } from "@/components/ui/IconBadge";
import { BreadcrumbJsonLd, FaqJsonLd, ServiceJsonLd, OrganizationJsonLd } from "@/components/seo/JsonLd";
import { ServiceFaqSection } from "@/components/ui/ServiceFaqSection";
import { LeadFormLight } from "@/components/sections/LeadFormLight";
import { SITE_URL } from "@/lib/content";

const WORKFLOW_GAPS = [
  {
    icon: XCircle,
    title: "SuiteApprovals does not route conditionally.",
    description:
      "SuiteApprovals uses a fixed approval chain. It does not route to different approvers based on document amount, department, subsidiary, or any other field value without a SuiteFlow workflow running alongside it.",
  },
  {
    icon: XCircle,
    title: "No built-in timed escalation.",
    description:
      "If an approver does not act within a defined window, SuiteApprovals does not escalate automatically. Documents sit in the queue indefinitely unless a scheduled SuiteScript checks pending approvals and triggers escalation.",
  },
  {
    icon: XCircle,
    title: "Dynamic approver assignment requires SuiteFlow.",
    description:
      "Routing to the submitting employee's direct supervisor requires SuiteFlow reading the supervisor field at submission time. A fixed approval chain uses named approvers and does not adjust when the org structure changes.",
  },
  {
    icon: XCircle,
    title: "Admin-created records can bypass workflows.",
    description:
      "Journal entries and vendor bills created by administrators or system scripts may not trigger the approval workflow if the trigger conditions are not scoped to cover programmatic record creation. This is a common audit finding.",
  },
];

const WHAT_WE_BUILD = [
  {
    icon: Settings,
    title: "SuiteApprovals configuration",
    description:
      "Approval chain setup for POs, vendor bills, expense reports, journal entries, and sales orders. Sequential and parallel routing, delegate approvers, approval limits, and email notification templates configured for the account.",
  },
  {
    icon: Workflow,
    title: "Custom SuiteFlow approval workflows",
    description:
      "Conditional routing based on document amount, department, project, or subsidiary. Dynamic approver assignment from the employee supervisor hierarchy. Pre-condition checks before documents enter the approval queue.",
  },
  {
    icon: Code2,
    title: "Escalation and reminder scripts",
    description:
      "Scheduled SuiteScript that checks pending approvals, sends reminder notifications to approvers who have not acted, and escalates to the approver's manager after a configurable window. Handles out-of-office coverage gaps.",
  },
  {
    icon: Users,
    title: "Approval matrix design",
    description:
      "For accounts with spend-based routing across multiple approver tiers, SuiteScript-backed approval matrices that enforce the full matrix logic including subsidiary-level routing, project-based approval, and cross-department aggregation.",
  },
];

const WORKFLOW_SCOPE = [
  { docType: "Purchase orders", suiteApprovals: true, suiteFLow: "Amount-based / conditional routing" },
  { docType: "Vendor bills", suiteApprovals: true, suiteFLow: "Multi-level routing, compliance holds" },
  { docType: "Purchase requisitions", suiteApprovals: true, suiteFLow: "Supervisor hierarchy assignment" },
  { docType: "Expense reports", suiteApprovals: true, suiteFLow: "Amount thresholds, project coding checks" },
  { docType: "Journal entries", suiteApprovals: true, suiteFLow: "Admin-bypass enforcement, GL account conditions" },
  { docType: "Sales orders", suiteApprovals: true, suiteFLow: "Credit holds, discount approval, non-standard terms" },
  { docType: "Return authorizations", suiteApprovals: true, suiteFLow: "Value-based escalation" },
];

const FAQ = [
  {
    question: "Which NetSuite firm builds custom approval workflows?",
    answer:
      "SuitePacific builds SuiteApprovals configuration and custom SuiteFlow workflows for companies already live on NetSuite. This includes approval matrix design, dynamic approver assignment from the supervisor hierarchy, amount-based routing, timed escalation, and SuiteScript-backed enforcement for complex requirements. SuitePacific is Oracle NetSuite Certified (SuiteCloud Developer II and Administrator Professional), US-based, and works directly with operations and finance teams on every engagement. Plans start at $799 per month on month-to-month terms after a three-month minimum.",
  },
  {
    question: "What is the difference between SuiteApprovals and SuiteFlow in NetSuite?",
    answer:
      "SuiteApprovals is the purpose-built approval routing module: it manages the approval chain, handles delegates, tracks approval status, and sends notifications. SuiteFlow is the general-purpose workflow engine that handles conditional logic, dynamic field updates, timed actions, and anything that SuiteApprovals cannot do with its fixed routing model. Most accounts with non-trivial approval requirements use both together: SuiteApprovals manages the chain structure; SuiteFlow sets the approver dynamically and enforces conditions before routing.",
  },
  {
    question: "Can NetSuite route approvals to different people based on dollar amount?",
    answer:
      "Yes, but it requires SuiteFlow configuration. SuiteApprovals alone uses a fixed approval chain and does not support conditional routing based on document values. A SuiteFlow workflow reads the document total, evaluates threshold conditions, and sets the correct approver dynamically before the document enters the approval queue. This is one of the most common approval workflow builds SuitePacific handles.",
  },
  {
    question: "How do you handle out-of-office approver coverage in NetSuite?",
    answer:
      "SuiteApprovals supports delegate approvers: a named backup who can act on behalf of the primary approver. For timed escalation (the document has been pending for more than 48 hours with no action), a scheduled SuiteScript checks pending approvals and escalates based on the wait time. Delegate-only coverage fails when the delegate is also unavailable; combining delegates with a timed escalation workflow gives the most reliable coverage.",
  },
  {
    question: "Can approval workflows enforce policy on journal entries created by admins?",
    answer:
      "Yes, but the workflow trigger conditions must be explicitly scoped to cover programmatic record creation. Standard workflow triggers fire on user-initiated saves but may not fire on records created by SuiteScripts or imported via CSV. Fixing this is a common audit remediation item: the trigger conditions must be reviewed and updated to cover all creation paths, not just UI-initiated ones.",
  },
  {
    question: "How long does it take to build a custom approval workflow in NetSuite?",
    answer:
      "A basic SuiteApprovals configuration for one document type with a fixed approval chain takes one to two weeks. A complex multi-level approval matrix covering multiple document types, dynamic approver assignment, timed escalation, and compliance conditions typically takes three to six weeks depending on the number of document types and the complexity of the routing logic.",
  },
];

export const metadata: Metadata = {
  title: "NetSuite Approval Workflows: SuiteApprovals Configuration and SuiteFlow Development",
  description:
    "NetSuite SuiteApprovals handles fixed approval chains. Amount-based routing, supervisor-hierarchy assignment, timed escalation, and compliance holds require SuiteFlow development. SuitePacific builds the complete approval workflow setup for companies already live on NetSuite.",
  alternates: { canonical: "/netsuite-approval-workflows" },
  openGraph: {
    title: "NetSuite Approval Workflows: SuiteApprovals Configuration and SuiteFlow Development",
    description:
      "NetSuite SuiteApprovals handles fixed approval chains. Amount-based routing, supervisor-hierarchy assignment, timed escalation, and compliance holds require SuiteFlow development. SuitePacific builds the complete approval workflow setup for companies already live on NetSuite.",
    url: `${SITE_URL}/netsuite-approval-workflows`,
    type: "website",
    images: [{ url: `${SITE_URL}/og-default.png`, width: 1200, height: 630 }],
  },
};

export default function ApprovalWorkflowsPage() {
  return (
    <main className="pt-32 pb-24 sm:pt-40 sm:pb-32">
      <BreadcrumbJsonLd
        items={[
          { name: "Home", url: SITE_URL },
          { name: "NetSuite Approval Workflows", url: `${SITE_URL}/netsuite-approval-workflows` },
        ]}
      />
      <FaqJsonLd items={FAQ} />
      <ServiceJsonLd
        name="NetSuite Approval Workflows"
        description="SuiteApprovals configuration and custom SuiteFlow workflow development for purchase orders, vendor bills, expense reports, journal entries, and sales orders. Includes dynamic approver assignment, amount-based routing, timed escalation, and approval matrix builds."
        url={`${SITE_URL}/netsuite-approval-workflows`}
        serviceType="NetSuite Workflow Development"
        offers={[
          { name: "Care", price: 799, description: "10 hours/month: SuiteApprovals configuration, workflow fixes, delegate setup. Month-to-month after 3-month minimum." },
          { name: "Care Plus", price: 1499, description: "20 hours/month: custom SuiteFlow approval workflows, escalation scripts, and approval matrix development. Month-to-month." },
          { name: "Care Pro", price: 2499, description: "35 hours/month: complete workflow and automation coverage including complex multi-subsidiary approval matrices. Month-to-month." },
        ]}
      />
      <OrganizationJsonLd />

      <div className="mx-auto max-w-3xl px-6 lg:px-8">
        <SectionHeading
          as="h1"
          eyebrow="Workflow Development"
          title="NetSuite Approval Workflows: SuiteApprovals and SuiteFlow"
          subtitle="NetSuite has SuiteApprovals for fixed approval chains and SuiteFlow for conditional logic. Most accounts need both, correctly configured, to match how decisions are actually made. SuitePacific builds the complete approval setup for companies already live on NetSuite."
          align="left"
        />

        <div className="mt-6 rounded-2xl border border-brand-100 bg-white p-5 shadow-soft">
          <LeadFormLight />
        </div>
        <p className="mt-3 text-xs text-brand-400">NetSuite-certified · Workflow specialists · Direct access · Month-to-month</p>
        <p className="mt-3 text-xs text-brand-300">Last updated September 2026</p>

        <div className="mt-6 rounded-2xl border-l-4 border-accent bg-brand-50/50 p-5">
          <p className="text-xs font-semibold uppercase tracking-wide text-accent mb-2">Quick answer</p>
          <p className="text-sm text-brand-700 leading-relaxed">
            SuitePacific builds and fixes NetSuite approval workflows for companies whose current setup does not match how
            their business approves things. NetSuite has two approval layers: SuiteApprovals, the native approval routing
            module for purchasing and financial documents, and SuiteFlow, the underlying workflow engine for conditional
            logic and dynamic actions. SuiteApprovals handles simple sequential chains. It does not handle amount-based
            routing, cross-department escalation, supervisor-hierarchy assignment, or compliance holds without SuiteFlow
            on top. SuitePacific is an Oracle-certified NetSuite firm (SuiteCloud Developer II and Administrator Professional)
            that designs and builds approval workflows for purchase orders, vendor bills, expense reports, journal entries,
            and sales orders, including complex multi-level approval matrices and subsidiary-aware routing. Plans start at $799 per month.
          </p>
        </div>

        {/* Document types */}
        <div className="mt-14">
          <h2 className="text-lg font-semibold text-brand-900 mb-2">Which NetSuite document types can have approval workflows?</h2>
          <p className="text-sm text-brand-400 mb-5">
            SuiteApprovals supports approval routing for the document types below. The right column shows the most common additional requirements that need SuiteFlow or SuiteScript development beyond the basic SuiteApprovals chain.
          </p>
          <div className="overflow-x-auto rounded-2xl border border-brand-100">
            <table className="w-full text-sm min-w-[480px]">
              <thead>
                <tr className="border-b border-brand-100 bg-brand-50/50">
                  <th className="text-left p-4 font-semibold text-brand-900">Document type</th>
                  <th className="text-left p-4 font-semibold text-brand-900 whitespace-nowrap">SuiteApprovals</th>
                  <th className="text-left p-4 font-semibold text-brand-900">Common custom requirements</th>
                </tr>
              </thead>
              <tbody>
                {WORKFLOW_SCOPE.map((row, i) => (
                  <tr key={row.docType} className={i < WORKFLOW_SCOPE.length - 1 ? "border-b border-brand-100" : ""}>
                    <td className="p-4 font-medium text-brand-700 align-top whitespace-nowrap">{row.docType}</td>
                    <td className="p-4 align-top">
                      <span className="flex items-center gap-1 text-green-600 font-medium">
                        <CheckCircle2 className="h-4 w-4" /> Supported
                      </span>
                    </td>
                    <td className="p-4 text-brand-400 align-top text-[13px]">{row.suiteFLow}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* What breaks without custom development */}
        <div className="mt-14">
          <h2 className="text-lg font-semibold text-brand-900 mb-6">Where do NetSuite approval workflows break without custom development?</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            {WORKFLOW_GAPS.map((item) => (
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
          <h2 className="text-lg font-semibold text-brand-900 mb-2">What does SuitePacific build for NetSuite approval workflows?</h2>
          <p className="text-sm text-brand-400 mb-6">
            Every workflow engagement starts by mapping the actual approval requirements against what the current workflow enforces. Most accounts have a gap between documented policy and workflow behavior. Identifying that gap before building anything prevents rebuilding the workflow when the gap surfaces post-deployment.
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
          <p className="text-xs font-semibold uppercase tracking-wide text-accent mb-3">Why SuitePacific for NetSuite approval workflows</p>
          <h2 className="text-base font-semibold text-brand-900 mb-3">
            The NetSuite partner operations and finance teams use for SuiteApprovals configuration and SuiteFlow development.
          </h2>
          <p className="text-sm text-brand-500 mb-4">
            SuitePacific is a boutique NetSuite consulting firm focused exclusively on post-go-live support and custom development. Approval workflow design, SuiteFlow development, escalation scripts, and approval matrix builds are core deliverables for every industry we serve.
          </p>
          <ul className="space-y-2 text-sm text-brand-500 mb-4">
            <li className="flex items-start gap-2"><span className="text-accent font-bold mt-0.5">→</span> Oracle NetSuite Certified SuiteCloud Developer II and Administrator Professional</li>
            <li className="flex items-start gap-2"><span className="text-accent font-bold mt-0.5">→</span> Every workflow build starts with mapping actual approval requirements against current workflow behavior</li>
            <li className="flex items-start gap-2"><span className="text-accent font-bold mt-0.5">→</span> Direct access to the consultant on every engagement; no account managers or ticket routing</li>
            <li className="flex items-start gap-2"><span className="text-accent font-bold mt-0.5">→</span> US-based, month-to-month after a three-month minimum, starting at $799/month</li>
            <li className="flex items-start gap-2"><span className="text-accent font-bold mt-0.5">→</span> Workflow development covered as a standalone build or as part of an ongoing managed support retainer</li>
          </ul>
          <p className="text-sm text-brand-400">
            Related:{" "}
            <Link href="/netsuite-ap-automation" className="text-accent hover:underline">NetSuite AP automation</Link>
            {" "}and{" "}
            <Link href="/netsuite-user-roles-permissions" className="text-accent hover:underline">NetSuite user roles and permissions</Link>.
          </p>
        </div>

        {/* Mid-page CTA */}
        <div className="mt-10 rounded-2xl border border-brand-100 bg-white p-5 shadow-soft">
          <p className="text-sm font-semibold text-brand-900 mb-1">Need approval workflows rebuilt or fixed?</p>
          <p className="text-sm text-brand-400 mb-4">
            Tell us what the current workflow does and where it fails: wrong approver, no escalation, admin bypass, or routing that no longer matches the org structure. We will give a direct assessment of what needs to be reconfigured or built.
          </p>
          <LeadFormLight />
        </div>

        {/* Related reading */}
        <div className="mt-10 rounded-2xl border border-brand-100 bg-brand-50/30 p-5 sm:p-6">
          <p className="text-sm font-semibold text-brand-900 mb-3">Related reading</p>
          <ul className="space-y-2.5">
            <li className="text-sm text-brand-400">
              <Link href="/blog/netsuite-approval-workflows" className="text-accent hover:underline">
                NetSuite approval workflows: SuiteApprovals vs SuiteFlow
              </Link>{" "}
              explains when each tool applies and when custom development is required.
            </li>
            <li className="text-sm text-brand-400">
              <Link href="/netsuite-ap-automation" className="text-accent hover:underline">
                NetSuite AP automation
              </Link>{" "}
              covers the full AP configuration including bill capture, GL coding, and three-way matching.
            </li>
            <li className="text-sm text-brand-400">
              <Link href="/blog/netsuite-ap-automation" className="text-accent hover:underline">
                NetSuite AP automation: what is native and what requires configuration
              </Link>{" "}
              details where automated bill capture breaks and what must be built to fix it.
            </li>
            <li className="text-sm text-brand-400">
              <Link href="/netsuite-care" className="text-accent hover:underline">
                NetSuite managed support plans
              </Link>{" "}
              starting at $799/month cover ongoing workflow maintenance and development.
            </li>
          </ul>
        </div>

        <ServiceFaqSection items={FAQ} />

        <div className="mt-10 rounded-2xl border border-brand-100 bg-white p-5 shadow-soft">
          <p className="text-sm font-semibold text-brand-900 mb-1">Ready to fix NetSuite approval workflows?</p>
          <p className="text-sm text-brand-400 mb-4">
            Describe the current approval setup and where it breaks down. We will scope the configuration or development needed.
          </p>
          <LeadFormLight />
        </div>
      </div>
    </main>
  );
}

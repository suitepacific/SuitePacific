import type { Metadata } from "next";
import Link from "next/link";
import {
  Workflow, Bell, CheckSquare, RefreshCcw, GitMerge, Clock,
  AlertCircle, Wrench, AlertTriangle,
  ShieldCheck, FileText, Users, Award,
} from "lucide-react";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Card } from "@/components/ui/Card";
import { IconBadge } from "@/components/ui/IconBadge";
import { BreadcrumbJsonLd, FaqJsonLd, ServiceJsonLd, OrganizationJsonLd, VideoObjectJsonLd } from "@/components/seo/JsonLd";
import { ServiceFaqSection } from "@/components/ui/ServiceFaqSection";
import { LeadFormLight } from "@/components/sections/LeadFormLight";
import { LeadForm } from "@/components/sections/LeadForm";
import { SITE_URL } from "@/lib/content";

const PAIN_POINTS = [
  {
    icon: AlertCircle,
    title: "Approvals live in email threads.",
    description:
      "No visibility into who approved what, when, or whether it's still pending. Approvals get missed, delayed, or re-routed manually every time someone is out of office.",
  },
  {
    icon: Clock,
    title: "Notifications fire at the wrong time or not at all.",
    description:
      "The right person is notified too late, too early, or not at all. Manual follow-up fills the gap, creating extra work and inconsistency across the team.",
  },
  {
    icon: Wrench,
    title: "Existing workflows behave unexpectedly.",
    description:
      "Workflows fire on every save whether something changed or not, conflict with each other, or were built for a process that no longer exists but never removed.",
  },
];

const AUTOMATION_TYPES = [
  {
    icon: CheckSquare,
    title: "Approval Workflows",
    description: "Multi-level approval routing based on transaction type, amount, department, or margin thresholds, with automatic escalation if approvers don't respond.",
  },
  {
    icon: Bell,
    title: "Notification Automation",
    description: "Targeted email and in-app alerts triggered by record changes, due dates, or status transitions, sent to the right person at the right time.",
  },
  {
    icon: RefreshCcw,
    title: "Status Transitions",
    description: "Controlled movement between record statuses with validation gates, automatic field updates, and audit trail entries at each transition.",
  },
  {
    icon: GitMerge,
    title: "Cross-Record Automation",
    description: "Workflows that create, update, or close related records automatically, for example creating a task when a sales order is approved, or closing a case when a vendor bill is paid.",
  },
  {
    icon: Clock,
    title: "Scheduled Automations",
    description: "Time-based triggers that run daily, weekly, or on custom schedules to handle recurring process steps without manual intervention.",
  },
  {
    icon: Workflow,
    title: "SuiteFlow + SuiteScript Hybrid",
    description: "Complex automations that combine SuiteFlow for the state machine with SuiteScript actions for logic that workflow actions alone can't handle.",
  },
];

const HOW_IT_WORKS = [
  {
    step: "01",
    title: "States and transitions are mapped before building",
    description:
      "We document every state, condition, entry criteria, and action before touching SuiteFlow. This makes the workflow auditable and means the logic isn't buried inside NetSuite in a way only the original developer can untangle.",
  },
  {
    step: "02",
    title: "Built and tested in Sandbox",
    description:
      "Each state, condition, and action is tested against real record types. We specifically check entry conditions to prevent the most common failure: a workflow firing on every save regardless of what changed.",
  },
  {
    step: "03",
    title: "Existing workflows reviewed too",
    description:
      "On new engagements, we audit active workflows for common failure patterns: missing entry conditions, conflicts with User Event scripts, and workflows still running for processes that no longer exist.",
  },
];

const WHY_SP = [
  {
    icon: ShieldCheck,
    title: "NetSuite-Certified",
    description:
      "NetSuite SuiteCloud Developer II and Administrator Professional certifications. Verified technical credentials, not self-declared experience.",
  },
  {
    icon: FileText,
    title: "Documented Before Built",
    description:
      "States, transitions, and conditions are mapped and agreed before building in SuiteFlow. No black-box automation; the logic is auditable from day one.",
  },
  {
    icon: Users,
    title: "Direct Access",
    description:
      "You communicate directly with the person doing the work. No ticket system, no account manager as an intermediary.",
  },
  {
    icon: Award,
    title: "Enterprise Expertise, SMB Price",
    description:
      "The same depth of NetSuite expertise large companies staff internally, available without the overhead of a full-time hire or an enterprise consulting contract.",
  },
];

const FAQ = [
  {
    question: "Can you automate approvals in NetSuite without SuiteScript?",
    answer: "Yes, for most standard scenarios. SuiteFlow handles multi-level approvals, conditional routing by amount or department, and escalation if approvers don't respond, without code. We add SuiteScript only when the logic exceeds what SuiteFlow's native action set can handle.",
  },
  {
    question: "Why do workflows sometimes fire when they shouldn't?",
    answer: "The most common cause is missing entry conditions. A workflow with no entry conditions fires on every save of that record type, regardless of what changed. The fix is an explicit condition set that limits when the workflow initiates. We check every active workflow for this pattern on new engagements.",
  },
  {
    question: "Can workflows send emails to external contacts, not just NetSuite users?",
    answer: "Yes. Workflow email actions can target any email address, including customer and vendor contacts on the record. The email body is templated using the record's field values, so each notification is specific to the transaction it references.",
  },
  {
    question: "Can you fix workflows that are already behaving unexpectedly?",
    answer: "Yes. Diagnosing and repairing existing workflows is work we take on regularly. The most common issues are missing entry conditions, conflicting workflows on the same record type, and workflows still running for processes that no longer exist.",
  },
];

export const metadata: Metadata = {
  title: "NetSuite Workflow Automation",
  description:
    "Custom NetSuite SuiteFlow workflow automation: approval routing, email notifications, status transitions, and process automation built and tested in sandbox before production deployment.",
  alternates: { canonical: "/netsuite-workflow-automation" },
  openGraph: {
    title: "NetSuite Workflow Automation",
    description: "Custom NetSuite SuiteFlow workflow automation: approval routing, email notifications, status transitions, and process automation built and tested in sandbox before production deployment.",
    url: "https://suitepacific.com/netsuite-workflow-automation",
    type: "website",
    images: [{ url: "https://suitepacific.com/og-default.png", width: 1200, height: 630 }],
  },
};

export default function WorkflowAutomationPage() {
  return (
    <main className="pt-32 pb-24 sm:pt-40 sm:pb-32">
      <BreadcrumbJsonLd
        items={[
          { name: "Home", url: SITE_URL },
          { name: "NetSuite Workflow Automation", url: `${SITE_URL}/netsuite-workflow-automation` },
        ]}
      />
      <FaqJsonLd items={FAQ} />
      <ServiceJsonLd
        name="NetSuite Workflow Automation"
        description="SuiteFlow workflow design, automation, and approval routing for post-go-live NetSuite accounts."
        url={`${SITE_URL}/netsuite-workflow-automation`}
        serviceType="NetSuite Workflow Automation"
      />
      <OrganizationJsonLd />
      <VideoObjectJsonLd
        name="SuitePacific Introduction: NetSuite Post-Go-Live Support and Consulting"
        description="An introduction to SuitePacific, a boutique NetSuite post-go-live support team providing SuiteScript development, workflow automation, and ongoing account optimization for businesses already live on NetSuite."
        videoId="IQvWN_yZ24A"
        duration="PT18S"
        uploadDate="2026-08-12"
        isShort
      />

      <div className="mx-auto max-w-3xl px-6 lg:px-8">
        <SectionHeading
          as="h1"
          eyebrow="Workflow Automation"
          title="NetSuite Workflow Automation"
          subtitle="Remove manual steps from approvals, notifications, and recurring processes using NetSuite's SuiteFlow engine, extended with SuiteScript where native actions fall short."
          align="left"
        />

        <div className="mt-6 rounded-2xl border border-brand-100 bg-white p-5 shadow-soft">
          <LeadFormLight />
        </div>
        <p className="mt-3 text-xs text-brand-400">NetSuite-certified · Sandbox-first · Direct access, no ticket system · Month-to-month</p>

        <div className="mt-6 rounded-2xl border-l-4 border-accent bg-brand-50/50 p-5">
          <p className="text-xs font-semibold uppercase tracking-wide text-accent mb-2">Quick answer</p>
          <p className="text-sm text-brand-700 leading-relaxed">
            NetSuite workflow automation refers to business process logic built using
            NetSuite&apos;s SuiteFlow engine, which allows rules, approvals, notifications, and
            field updates to run automatically in response to record events without custom
            scripting. Common applications include multi-level purchase order approval routing,
            vendor bill approval chains, automated email notifications when a record reaches a
            specific status, and conditional field updates based on record state. SuiteFlow handles
            most automation requirements natively. When native actions are not sufficient, for
            example when a workflow needs to call an external API or manipulate records across
            subtypes, SuiteScript extends the workflow at a specific action step. SuitePacific
            designs and builds these automations for post-go-live accounts, testing in Sandbox
            first and documenting trigger conditions and action logic so the workflow can be
            maintained as business processes evolve. Poorly designed workflows that trigger in
            loops or conflict with scripts are a common source of production issues; correct entry
            conditions and action sequencing prevent these problems at build time.
          </p>
        </div>

        <p className="mt-6 text-sm text-brand-400">
          A well-built workflow removes the need for someone to manually check whether an approval
          has been sitting for three days, remember to send a notification when a status changes, or
          update three related records every time a transaction closes. Done incorrectly, workflows
          that double-trigger or conflict with scripts create problems that are difficult to diagnose.
          SuitePacific designs, builds, and maintains these automations for post-go-live NetSuite accounts.
          See our{" "}
          <Link href="/blog/workflow-automation-mistakes" className="text-accent hover:underline">
            workflow automation mistakes guide
          </Link>{" "}
          for the most common failure modes.
        </p>

        {/* Pain points */}
        <div className="mt-14" data-section="pain-points">
          <h2 className="text-lg font-semibold text-brand-900 mb-6">Common situations that bring people here</h2>
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

        {/* Automation types */}
        <div className="mt-14" data-section="automation-types">
          <h2 className="text-lg font-semibold text-brand-900 mb-1">Types of automation we build</h2>
          <p className="text-sm text-brand-400 mb-6">
            SuiteFlow handles most standard automation needs. We add SuiteScript only where workflow actions alone can&apos;t reach.
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            {AUTOMATION_TYPES.map((item) => (
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
          <h2 className="text-lg font-semibold text-brand-900 mb-6">How we approach workflow work</h2>
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
            For automation that requires custom code beyond what SuiteFlow&apos;s native action set can
            handle, see our{" "}
            <Link href="/netsuite-suitescript-development" className="text-accent hover:underline">
              SuiteScript development page
            </Link>
            .
          </p>
        </div>

        {/* Why SuitePacific */}
        <div className="mt-14" data-section="why-suitepacific">
          <h2 className="text-lg font-semibold text-brand-900 mb-6">Why SuitePacific</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            {WHY_SP.map((item) => (
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

        {/* Related reading */}
        <div className="mt-10 rounded-2xl border border-brand-100 bg-brand-50/30 p-5 sm:p-6">
          <p className="text-sm font-semibold text-brand-900 mb-3">From the blog</p>
          <ul className="space-y-2.5">
            <li className="text-sm text-brand-400">
              <Link href="/blog/workflow-automation-mistakes" className="text-accent hover:underline">
                5 common NetSuite workflow automation mistakes
              </Link>{" "}
              covers the failure patterns that cause workflows to fire at the wrong time or conflict with scripts.
            </li>
            <li className="text-sm text-brand-400">
              <Link href="/blog/netsuite-workflow-vs-suitescript" className="text-accent hover:underline">
                NetSuite Workflow vs SuiteScript
              </Link>{" "}
              explains when to use SuiteFlow versus a script, and when both tools need to work together.
            </li>
            <li className="text-sm text-brand-400">
              <Link href="/blog/netsuite-approval-workflow-setup" className="text-accent hover:underline">
                How to build an approval workflow in NetSuite SuiteFlow
              </Link>{" "}
              walks through states, transitions, role-restricted approval buttons, and email notifications.
            </li>
          </ul>
        </div>

        <ServiceFaqSection items={FAQ} />

        <div id="contact" className="mt-14 pt-10 border-t border-brand-50">
          <LeadForm />
        </div>
      </div>
    </main>
  );
}

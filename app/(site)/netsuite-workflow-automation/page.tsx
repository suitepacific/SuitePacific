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
import { Button } from "@/components/ui/Button";
import { BreadcrumbJsonLd, FaqJsonLd } from "@/components/seo/JsonLd";
import { ServiceFaqSection } from "@/components/ui/ServiceFaqSection";
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
    title: "Oracle-Certified",
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
  title: "NetSuite Workflow Automation | SuitePacific",
  description:
    "Custom NetSuite SuiteFlow workflow automation: approval routing, email notifications, status transitions, and process automation built and tested in sandbox before production deployment.",
  alternates: { canonical: "/netsuite-workflow-automation" },
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

      <div className="mx-auto max-w-3xl px-6 lg:px-8">
        <SectionHeading
          as="h1"
          eyebrow="Workflow Automation"
          title="NetSuite Workflow Automation"
          subtitle="Remove manual steps from approvals, notifications, and recurring processes using NetSuite's SuiteFlow engine, extended with SuiteScript where native actions fall short."
          align="left"
        />

        <p className="mt-6 text-sm text-brand-400">
          A well-built workflow removes the need for someone to manually check whether an approval
          has been sitting for three days, remember to send a notification when a status changes, or
          update three related records every time a transaction closes. Done incorrectly, workflows
          that double-trigger or conflict with scripts create problems that are difficult to diagnose.
          See our{" "}
          <Link href="/blog/workflow-automation-mistakes" className="text-accent hover:underline">
            workflow automation mistakes guide
          </Link>{" "}
          for the most common failure modes.
        </p>

        <div className="mt-6">
          <Button href="/contact">Book a Free Consultation</Button>
        </div>

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
            SuiteFlow handles most standard automation needs. We add SuiteScript only where workflow actions alone can't reach.
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
            For automation that requires custom code beyond what SuiteFlow's native action set can
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

        <ServiceFaqSection items={FAQ} />

        <div className="mt-14 pt-10 border-t border-brand-50" data-section="contact">
          <p className="text-brand-900 font-semibold text-lg">Have a manual process that should be automated?</p>
          <p className="mt-2 text-sm text-brand-400">
            Tell us what it is and we will tell you whether SuiteFlow, a script, or both is the right fit.
          </p>
          <div className="mt-6 rounded-2xl border border-brand-100 bg-white p-6 sm:p-8 shadow-soft">
            <LeadForm />
          </div>
        </div>
      </div>
    </main>
  );
}

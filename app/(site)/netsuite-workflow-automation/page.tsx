import type { Metadata } from "next";
import Link from "next/link";
import { Workflow, Bell, CheckSquare, RefreshCcw, GitMerge, Clock } from "lucide-react";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Card } from "@/components/ui/Card";
import { IconBadge } from "@/components/ui/IconBadge";
import { Button } from "@/components/ui/Button";
import { BreadcrumbJsonLd, FaqJsonLd } from "@/components/seo/JsonLd";
import { ServiceFaqSection } from "@/components/ui/ServiceFaqSection";
import { SITE_URL } from "@/lib/content";

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
};

const AUTOMATION_TYPES = [
  { icon: CheckSquare, title: "Approval Workflows", description: "Multi-level approval routing based on transaction type, amount, department, or margin thresholds, with automatic escalation if approvers don’t respond." },
  { icon: Bell, title: "Notification Automation", description: "Targeted email and in-app alerts triggered by record changes, due dates, or status transitions, sent to the right person at the right time." },
  { icon: RefreshCcw, title: "Status Transitions", description: "Controlled movement between record statuses with validation gates, automatic field updates, and audit trail entries at each transition." },
  { icon: GitMerge, title: "Cross-Record Automation", description: "Workflows that create, update, or close related records automatically, for example creating a task when a sales order is approved, or closing a case when a vendor bill is paid." },
  { icon: Clock, title: "Scheduled Automations", description: "Time-based triggers that run daily, weekly, or on custom schedules to handle recurring process steps without manual intervention." },
  { icon: Workflow, title: "SuiteFlow + SuiteScript Hybrid", description: "Complex automations that combine SuiteFlow for the state machine with SuiteScript actions for logic that workflow actions alone can’t handle." },
];

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
          subtitle="Remove manual steps from approvals, notifications, and recurring processes using NetSuite’s SuiteFlow engine, extended with SuiteScript where native actions fall short."
          align="left"
        />

        <div className="prose prose-blue mt-12 max-w-none prose-headings:font-semibold prose-headings:text-brand-900 prose-p:text-brand-400 prose-a:text-accent prose-a:no-underline hover:prose-a:underline prose-strong:text-brand-900">
          <h2>What workflow automation actually does in NetSuite</h2>
          <p>
            NetSuite’s SuiteFlow engine lets you build state-machine-style workflows that respond
            to record changes, trigger on schedules, or fire when conditions are met. A well-built
            workflow removes the need for someone to manually check whether an approval has been
            sitting for three days, remember to send a notification when a status changes, or
            update three related records every time a transaction closes. Done correctly, the
            process just happens, consistently, without relying on anyone to remember to do it.
          </p>
          <p>
            Done incorrectly, workflows that double-trigger, fire on irrelevant saves, or conflict
            with SuiteScript User Events create problems that are genuinely difficult to diagnose.
            Our{" "}
            <Link href="/blog/workflow-automation-mistakes">workflow automation mistakes guide</Link>{" "}
            covers the most common failure modes and how to avoid them.
          </p>

          <h2>Types of automation we build</h2>
        </div>

        <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 gap-5">
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

        <div className="prose prose-blue mt-12 max-w-none prose-headings:font-semibold prose-headings:text-brand-900 prose-p:text-brand-400 prose-a:text-accent prose-a:no-underline hover:prose-a:underline prose-strong:text-brand-900">
          <h2>Our process</h2>
          <p>
            All workflow development and testing happens in your sandbox account first. We map
            the intended states and transitions before building anything, which makes the logic
            auditable and maintainable rather than something only the original developer can
            understand. If you have existing workflows that have become unreliable over time, we
            audit and rebuild those as well.
          </p>
          <p>
            See our{" "}
            <Link href="/netsuite-suitescript-development">SuiteScript development page</Link> for
            cases where automation logic requires custom scripting beyond what SuiteFlow’s native
            actions can handle.
          </p>
        </div>

        <ServiceFaqSection items={FAQ} />

        <div className="mt-14 pt-10 border-t border-brand-50 text-center">
          <p className="text-brand-900 font-semibold">Have a manual process that should be automated?</p>
          <p className="mt-2 text-sm text-brand-400">
            Tell us what it is and we’ll tell you whether SuiteFlow, a script, or both is the right fit.
          </p>
          <div className="mt-6">
            <Button href="/contact">Book a Free Consultation</Button>
          </div>
        </div>
      </div>
    </main>
  );
}

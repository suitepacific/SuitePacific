import type { Metadata } from "next";
import Link from "next/link";
import {
  AlertOctagon, Smartphone, RefreshCw, Settings,
  ShieldOff, Wrench, ShieldCheck, Zap, Users, Clock,
} from "lucide-react";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Card } from "@/components/ui/Card";
import { IconBadge } from "@/components/ui/IconBadge";
import {
  BreadcrumbJsonLd, FaqJsonLd, ServiceJsonLd, OrganizationJsonLd, VideoObjectJsonLd,
} from "@/components/seo/JsonLd";
import { ServiceFaqSection } from "@/components/ui/ServiceFaqSection";
import { LeadFormLight } from "@/components/sections/LeadFormLight";
import { SITE_URL } from "@/lib/content";

const FAILURE_MODES = [
  {
    icon: RefreshCw,
    title: "Work orders or records are not syncing from the mobile app",
    description:
      "Technicians complete work orders in the field but the data is not appearing in NetSuite. Sync errors accumulate silently, often without technicians knowing which records failed or why. Data recovery requires identifying affected records and re-syncing, with risk of duplication.",
  },
  {
    icon: Smartphone,
    title: "After a bundle update, the mobile app looks broken or behaves differently",
    description:
      "Oracle pushes FSM bundle updates to Production automatically. Configuration changes, new field behaviors, and mobile interface changes take effect without a staged rollout. Technicians who were not briefed in advance interpret the change as a malfunction.",
  },
  {
    icon: ShieldOff,
    title: "Permission restrictions on mobile records stopped working",
    description:
      "The FSM 2026.07.1 update retired the resource-level readonly property with no automatic migration and no visible error. Accounts that had readonly rules configured now allow technicians to edit records they were previously restricted from, without any warning.",
  },
  {
    icon: Settings,
    title: "nxc_now() expressions are producing incorrect timestamps",
    description:
      "The 2026.07.1 bundle replaced the nxc_now() function with format() and now() helpers. Oracle auto-migrated existing expressions, but checkbox conditions and date format differences in the migrated records can cause timestamp fields to populate incorrectly in live work orders.",
  },
  {
    icon: AlertOctagon,
    title: "FSM was set up by the implementation partner and nobody knows how it is configured",
    description:
      "The original implementation partner built the FSM configuration, documented nothing, and is no longer involved. Each bundle update, each process change, and each support request requires rediscovering what was built. This is the most common pattern we inherit when taking over FSM support.",
  },
  {
    icon: Wrench,
    title: "A process change broke something downstream in NetSuite",
    description:
      "FSM work orders flow into NetSuite records: invoices, time entries, inventory transactions. A configuration change in FSM, a SuiteScript that fires on work order completion, or a workflow triggered by FSM status changes can break the downstream chain when any one piece changes.",
  },
];

const HOW_IT_WORKS = [
  {
    step: "01",
    title: "Review your current FSM configuration and identify what's actually broken",
    description:
      "We access your Sandbox and Production accounts, open the FSM Configuration record, and audit the mobile event maps, field expressions, readonly rules, and workflow triggers. For bundle-update issues, we cross-reference against the release notes for the version currently deployed to your account. We identify the root cause before making any changes.",
  },
  {
    step: "02",
    title: "Test the fix in Sandbox before touching Production",
    description:
      "FSM configuration changes affect live technicians immediately when deployed to Production. Every fix is built and tested in Sandbox using a test technician account to confirm the mobile behavior is correct: sync completes, field values populate, permissions restrict as expected, and downstream records in NetSuite are created correctly.",
  },
  {
    step: "03",
    title: "Deploy and validate in Production, then document what was changed",
    description:
      "Once Sandbox confirms the fix, we deploy to Production and confirm the same behavior with a test work order cycle. We document what was broken, what was changed, and what the current configuration looks like, so the account is not left in the same undocumented state it was in before.",
  },
];

const WHY_SP = [
  {
    icon: Clock,
    title: "FSM expertise from tracking every bundle update",
    description:
      "We follow every FSM release: the 2026.07.1 bundle changes to mobile event maps, the nxc_now() migration, the readonly property retirement, and the mobile interface updates. When you contact us about an FSM issue, we already know what changed in the last release and what to look for first.",
  },
  {
    icon: ShieldCheck,
    title: "NetSuite-certified, SuiteScript-capable",
    description:
      "FSM support often requires more than configuration review. Work order completion scripts, workflow triggers, and integration flows that touch FSM data require SuiteScript development. SuitePacific holds Oracle NetSuite SuiteCloud Developer II and Administrator Professional certifications.",
  },
  {
    icon: Zap,
    title: "Same-day response for live FSM failures",
    description:
      "A sync failure during an active field day, technicians unable to complete work orders, or permissions that have silently dropped — these are urgent. We prioritize live FSM issues and respond same-business-day.",
  },
  {
    icon: Users,
    title: "Direct access to the developer, not a ticket queue",
    description:
      "FSM problems require back-and-forth: sharing what the mobile app is showing, reproducing the failure, testing the fix. That communication needs to happen directly between you and the developer, not through a support portal relay.",
  },
];

const RESOURCES = [
  {
    href: "/blog/netsuite-fsm-bundle-update-august-2026",
    title: "FSM Bundle 2026.07.1: What Is Changing and What to Test",
    description: "Full breakdown of the August 2026 FSM bundle update, including the four areas requiring administrator action before the update reaches Production.",
  },
  {
    href: "/blog/netsuite-fsm-nxc-now-migration-august-2026",
    title: "FSM nxc_now() Migration Guide",
    description: "What Oracle migrates automatically, what it misses, and how to review migrated expressions in Sandbox before they affect live work orders.",
  },
  {
    href: "/blog/netsuite-fsm-readonly-migration-august-2026",
    title: "FSM Breaking Change: Replacing readonly Resource-Level Rules",
    description: "How to identify and replace the retired resource-level readonly property before it silently stops working in Production.",
  },
  {
    href: "/blog/netsuite-fsm-mobile-changes-august-2026",
    title: "What FSM Technicians See After the 2026.07.1 Update",
    description: "Exactly what changed in the mobile interface and how to brief your field team before the update reaches Production.",
  },
];

const FAQ = [
  {
    question: "What does NetSuite FSM support from SuitePacific cover?",
    answer:
      "We support live FSM configurations: diagnosing sync failures, reviewing and fixing FSM Configuration records after bundle updates, migrating configurations for breaking changes (readonly retirement, nxc_now() replacement), validating mobile behavior in Sandbox, and fixing downstream issues in NetSuite caused by FSM configuration changes. We also handle SuiteScript fixes when a script tied to FSM work order completion is failing.",
  },
  {
    question: "We received an Oracle notification about an upcoming FSM bundle update. What should we do?",
    answer:
      "Review the bundle release notes to identify breaking changes and areas requiring administrator action. Apply the bundle in Sandbox and test the specific areas affected: mobile event maps, field expressions, permission rules, and downstream workflow triggers. Run a full work order cycle in Sandbox with a test technician account before the update reaches Production. If the review surfaces issues you do not know how to resolve, contact us — that is exactly the scenario we help with.",
  },
  {
    question: "Our FSM technicians say the mobile app looks different after an update. Is something broken?",
    answer:
      "It depends on the update. The FSM 2026.07.1 bundle made visible changes to the mobile interface: status counters on the task list and individual tasks, a persistent offline banner, and a sync error indicator with retry. These are intentional changes, not malfunctions. However, if technicians are seeing fields that no longer populate, records they can edit when they previously could not, or sync errors they cannot clear, those are likely configuration issues that need attention.",
  },
  {
    question: "Work orders are not syncing from the mobile app. Where do we start?",
    answer:
      "First, check whether the failure is device-specific or affecting all technicians. If it is all technicians, check the FSM Configuration record in NetSuite for any recent changes. If a bundle update has recently been applied, check the release notes for changes to mobile event maps or sync behavior. If the failure is isolated to specific records, check whether those records have unusual field values or violate any validation rules on the work order record type. We can diagnose this systematically if you cannot identify the cause.",
  },
  {
    question: "We inherited an FSM setup from an implementation partner with no documentation. Can SuitePacific take over ongoing support?",
    answer:
      "Yes. Taking over an undocumented FSM configuration is a common starting point for us. The first step is a review of the current FSM Configuration record, mobile event maps, field expressions, and any SuiteScript tied to FSM records. We document what we find, identify anything fragile or likely to break on the next bundle update, and from that point, we handle ongoing FSM support as part of a post-go-live retainer.",
  },
  {
    question: "Do we need a retainer, or can SuitePacific help with a one-time FSM issue?",
    answer:
      "Both. We work with new clients on one-time FSM issues — no retainer required to start. For a single bundle-update review, a specific sync failure, or a configuration problem, we charge on a project basis. Existing retainer clients receive FSM support as part of their ongoing engagement, which means each bundle update is reviewed proactively rather than after something breaks.",
  },
];

export const metadata: Metadata = {
  title: "NetSuite FSM Support and Troubleshooting",
  description:
    "NetSuite Field Service Management support for sync failures, bundle update issues, configuration problems, and mobile app behavior after FSM updates. Oracle-certified, direct developer access.",
  alternates: { canonical: "/netsuite-fsm-support" },
  openGraph: {
    title: "NetSuite FSM Support and Troubleshooting",
    description:
      "FSM support for live NetSuite accounts: sync failures, bundle update issues, broken configurations, and mobile app problems. Oracle-certified, same-day response.",
    url: "https://suitepacific.com/netsuite-fsm-support",
    type: "website",
    images: [{ url: "https://suitepacific.com/og-default.png", width: 1200, height: 630 }],
  },
};

export default function NetSuiteFSMSupportPage() {
  return (
    <main className="pt-32 pb-24 sm:pt-40 sm:pb-32">
      <BreadcrumbJsonLd
        items={[
          { name: "Home", url: SITE_URL },
          { name: "NetSuite FSM Support", url: `${SITE_URL}/netsuite-fsm-support` },
        ]}
      />
      <FaqJsonLd items={FAQ} />
      <ServiceJsonLd
        name="NetSuite FSM Support and Troubleshooting"
        description="NetSuite Field Service Management support for sync failures, bundle update issues, configuration problems, and mobile app behavior after FSM updates."
        url={`${SITE_URL}/netsuite-fsm-support`}
        serviceType="NetSuite Support"
      />
      <OrganizationJsonLd />
      <VideoObjectJsonLd
        name="SuitePacific Introduction: NetSuite Post-Go-Live Support and Consulting"
        description="An introduction to SuitePacific, a boutique NetSuite post-go-live support team providing SuiteScript development, workflow automation, and ongoing account optimization for businesses already live on NetSuite."
        videoId="IQvWN_yZ24A"
        duration="PT18S"
        uploadDate="2026-08-13"
        isShort
      />

      <div className="mx-auto max-w-3xl px-6 lg:px-8">
        <SectionHeading
          as="h1"
          eyebrow="Field Service Management"
          title="NetSuite FSM Support and Troubleshooting"
          subtitle="FSM support for companies where Field Service Management is live but not working correctly: sync failures, bundle update issues, broken configurations, and mobile app problems your implementation partner left behind."
          align="left"
        />

        <div className="mt-6 rounded-2xl border border-brand-100 bg-white p-5 shadow-soft">
          <LeadFormLight />
        </div>
        <p className="mt-3 text-xs text-brand-400">
          Same-day response · NetSuite-certified · FSM bundle expertise · Direct developer access
        </p>

        <p className="mt-6 text-sm text-brand-400">
          Oracle pushes FSM bundle updates automatically. Configuration changes, mobile interface
          overhauls, and breaking deprecations land in Production accounts on Oracle&apos;s schedule,
          not yours. The companies that run into problems are the ones whose FSM setup was never fully
          documented, whose implementation partner is no longer involved, or whose administrator was
          not aware a breaking change was coming. SuitePacific supports live FSM accounts: diagnosing
          what is broken, fixing configurations in Sandbox, and handling each bundle update before it
          reaches Production and disrupts a live field operation.
        </p>

        {/* Failure modes */}
        <div className="mt-14" data-section="failure-modes">
          <h2 className="text-lg font-semibold text-brand-900 mb-6">
            Common FSM problems we fix
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            {FAILURE_MODES.map((item) => (
              <Card key={item.title} className="p-5 flex flex-col gap-3">
                <IconBadge icon={item.icon} />
                <h3 className="font-semibold text-brand-900 text-sm">{item.title}</h3>
                <p className="text-sm text-brand-400">{item.description}</p>
              </Card>
            ))}
          </div>
        </div>

        {/* How it works */}
        <div className="mt-14" data-section="how-it-works">
          <h2 className="text-lg font-semibold text-brand-900 mb-6">How FSM support works</h2>
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
        </div>

        {/* Why SuitePacific */}
        <div className="mt-14" data-section="why-suitepacific">
          <h2 className="text-lg font-semibold text-brand-900 mb-6">
            Why SuitePacific for FSM support
          </h2>
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

        {/* FSM technical resources */}
        <div className="mt-10 rounded-2xl border border-brand-100 bg-brand-50/30 p-5 sm:p-6">
          <p className="text-sm font-semibold text-brand-900 mb-4">
            FSM technical reference guides
          </p>
          <div className="space-y-4">
            {RESOURCES.map((item) => (
              <div key={item.href}>
                <Link
                  href={item.href}
                  className="text-sm font-medium text-accent hover:underline"
                >
                  {item.title}
                </Link>
                <p className="mt-0.5 text-xs text-brand-400">{item.description}</p>
              </div>
            ))}
          </div>
        </div>

        <ServiceFaqSection items={FAQ} />

        <div className="mt-10 rounded-2xl border border-brand-100 bg-white p-5 shadow-soft">
          <LeadFormLight />
        </div>
      </div>
    </main>
  );
}

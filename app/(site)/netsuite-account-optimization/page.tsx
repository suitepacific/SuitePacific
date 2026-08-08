import type { Metadata } from "next";
import Link from "next/link";
import {
  Gauge, Trash2, ShieldCheck, Settings2, Search, Zap,
  AlertCircle, Wrench, HelpCircle,
  Users, Award,
} from "lucide-react";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Card } from "@/components/ui/Card";
import { IconBadge } from "@/components/ui/IconBadge";
import { BreadcrumbJsonLd, FaqJsonLd, ServiceJsonLd } from "@/components/seo/JsonLd";
import { ServiceFaqSection } from "@/components/ui/ServiceFaqSection";
import { LeadFormLight } from "@/components/sections/LeadFormLight";
import { SITE_URL } from "@/lib/content";

const PAIN_POINTS = [
  {
    icon: Gauge,
    title: "Pages and dashboards are getting slower.",
    description:
      "What used to load instantly now takes seconds. Portlet searches, heavy scripts running on every record load, and accumulated customizations add up over time.",
  },
  {
    icon: AlertCircle,
    title: "Scripts are hitting governance limits.",
    description:
      "Unexpected governance limit errors on Scheduled or Map/Reduce scripts, particularly as data volume has grown since the scripts were originally written.",
  },
  {
    icon: HelpCircle,
    title: "Nobody knows what is safe to change.",
    description:
      "Hundreds of custom fields, old workflows, and scripts from previous developers. Touching any of it risks breaking something. Nobody knows which ones are still active.",
  },
];

const OPTIMIZATION_AREAS = [
  {
    icon: Gauge,
    title: "Performance Tuning",
    description: "Identifying and fixing the specific searches, scripts, and dashboard configurations causing slow page loads and sluggish account performance.",
  },
  {
    icon: Trash2,
    title: "Legacy Cleanup",
    description: "Removing or deactivating unused custom fields, forms, saved searches, and scripts that have accumulated since go-live and are slowing the account down.",
  },
  {
    icon: ShieldCheck,
    title: "Script Governance Review",
    description: "Auditing scheduled and Map/Reduce scripts for governance unit consumption, yield behavior, and error handling to prevent queue backups and unexpected failures.",
  },
  {
    icon: Settings2,
    title: "Configuration Cleanup",
    description: "Reviewing and simplifying custom record definitions, workflow configurations, and role permissions that have grown complex or inconsistent over time.",
  },
  {
    icon: Search,
    title: "Saved Search Optimization",
    description: "Rebuilding heavy saved searches to filter on indexed criteria first, reducing database load and improving load times on dashboards and portlets.",
  },
  {
    icon: Zap,
    title: "Workflow Consolidation",
    description: "Identifying duplicate or conflicting workflows and User Event scripts that are fighting each other, and consolidating logic into a single, maintainable mechanism.",
  },
];

const HOW_IT_WORKS = [
  {
    step: "01",
    title: "We audit before touching anything",
    description:
      "Every custom field, script deployment, workflow, saved search, and form is reviewed for actual usage before any change is made. Active scripts and searches don't always have obvious users; we verify before deactivating.",
  },
  {
    step: "02",
    title: "Sandbox verification before every change",
    description:
      "Nothing is deactivated, modified, or removed without confirming the change is safe in a Sandbox environment first. We do not run cleanup changes directly in production.",
  },
  {
    step: "03",
    title: "Documented output, not just a cleaner account",
    description:
      "The engagement closes with a record of what was changed, what was deactivated versus deleted, and why. Future work on the account starts from a known baseline rather than re-auditing from scratch.",
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
    icon: Search,
    title: "Audit Before Action",
    description:
      "Nothing is deactivated or removed without verifying it is actually unused. We check every active field reference, search, and script dependency before touching anything.",
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
    question: "How long does an account optimization engagement take?",
    answer: "A structured audit covering custom fields, saved searches, workflows, script deployments, roles, and forms typically takes two to three weeks. Remediation runs alongside the audit. Total time depends on how much has accumulated since go-live; accounts live for three or more years typically have more to address.",
  },
  {
    question: "Will the cleanup affect live users?",
    answer: "Deactivating unused fields and forms has no visible effect on users who weren't using them. Removing portlet searches from dashboards does change what users see on their home page, and we communicate those changes in advance. Workflow and script changes are tested in sandbox first and deployed outside business hours.",
  },
  {
    question: "How do you identify which custom fields are safe to deactivate?",
    answer: "We check three things: whether the field appears on any active form, whether any data is stored in it, and whether any active saved search or workflow references it. A field that fails all three checks is safe to deactivate. If there is historical data, we deactivate rather than delete to preserve it.",
  },
  {
    question: "Is optimization a one-time project or ongoing work?",
    answer: "Both. The initial audit is a defined-scope project with a specific deliverable. After that, ongoing optimization is part of our post-go-live support service, where we handle new customization requests and periodically review what has accumulated since the last cleanup.",
  },
];

export const metadata: Metadata = {
  title: "NetSuite Account Optimization",
  description:
    "NetSuite account optimization and performance tuning: cleanup of legacy configurations, unused scripts and fields, slow saved searches, and governance issues without affecting live operations.",
  alternates: { canonical: "/netsuite-account-optimization" },
  openGraph: {
    title: "NetSuite Account Optimization",
    description: "NetSuite account optimization and performance tuning: governance limit fixes, script audits, workflow consolidation, saved search cleanup, and technical debt reduction for live accounts.",
    url: "https://suitepacific.com/netsuite-account-optimization",
    type: "website",
    images: [{ url: "https://suitepacific.com/og-default.png", width: 1200, height: 630 }],
  },
};

export default function AccountOptimizationPage() {
  return (
    <main className="pt-32 pb-24 sm:pt-40 sm:pb-32">
      <BreadcrumbJsonLd
        items={[
          { name: "Home", url: SITE_URL },
          { name: "NetSuite Account Optimization", url: `${SITE_URL}/netsuite-account-optimization` },
        ]}
      />
      <FaqJsonLd items={FAQ} />
      <ServiceJsonLd
        name="NetSuite Account Optimization"
        description="NetSuite account cleanup, legacy configuration review, and performance optimization for post-go-live accounts."
        url={`${SITE_URL}/netsuite-account-optimization`}
        serviceType="NetSuite Optimization"
      />

      <div className="mx-auto max-w-3xl px-6 lg:px-8">
        <SectionHeading
          as="h1"
          eyebrow="Account Optimization"
          title="NetSuite Account Optimization"
          subtitle="Clean up and tune a NetSuite account that has gotten slower, harder to maintain, or more complex than it needs to be, without disrupting live operations."
          align="left"
        />

        <div className="mt-6 rounded-2xl border border-brand-100 bg-white p-5 shadow-soft">
          <LeadFormLight />
        </div>
        <p className="mt-3 text-xs text-brand-400">NetSuite-certified · Sandbox-first · Direct access, no ticket system · Month-to-month</p>

        <p className="mt-6 text-sm text-brand-400">
          NetSuite accounts that have been live for a few years accumulate technical debt the same
          way any software system does: scripts added in a hurry, custom fields from projects that
          ended, workflows that predate a process change. None of it causes an immediate outage,
          but it adds up to an account that loads slowly and is increasingly difficult to manage.
          SuitePacific handles this cleanup for live NetSuite accounts, auditing before touching
          anything and documenting every change.
          See our{" "}
          <Link href="/blog/netsuite-account-performance" className="text-accent hover:underline">
            NetSuite account performance guide
          </Link>{" "}
          for the specific things we check first.
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

        {/* What we address */}
        <div className="mt-14" data-section="optimization-areas">
          <h2 className="text-lg font-semibold text-brand-900 mb-1">What we address</h2>
          <p className="text-sm text-brand-400 mb-6">
            Account optimization is the work of finding what is actually causing the problem and fixing it, rather than adding more on top.
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            {OPTIMIZATION_AREAS.map((item) => (
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
          <h2 className="text-lg font-semibold text-brand-900 mb-6">How we approach optimization work</h2>
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
            Optimization work often surfaces areas where new development would help, such as
            a cleaner script replacing four conflicting workflows. If that comes up, we scope
            it separately. For ongoing account maintenance after the initial cleanup, see our{" "}
            <Link href="/netsuite-post-go-live-support" className="text-accent hover:underline">
              post-go-live support model
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
              <Link href="/blog/netsuite-account-performance" className="text-accent hover:underline">
                NetSuite account performance guide
              </Link>{" "}
              covers the specific areas we check first when an account becomes slow or difficult to manage.
            </li>
            <li className="text-sm text-brand-400">
              <Link href="/blog/netsuite-optimization" className="text-accent hover:underline">
                NetSuite optimization guide
              </Link>{" "}
              walks through the key levers for improving performance, reducing technical debt, and simplifying customizations.
            </li>
          </ul>
        </div>

        <ServiceFaqSection items={FAQ} />
      </div>
    </main>
  );
}

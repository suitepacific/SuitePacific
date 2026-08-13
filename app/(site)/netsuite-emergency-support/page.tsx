import type { Metadata } from "next";
import Link from "next/link";
import {
  AlertOctagon, Code2, RefreshCw, Database,
  Zap, ShieldCheck, Users, Clock,
} from "lucide-react";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Card } from "@/components/ui/Card";
import { IconBadge } from "@/components/ui/IconBadge";
import { BreadcrumbJsonLd, FaqJsonLd, ServiceJsonLd, OrganizationJsonLd, VideoObjectJsonLd } from "@/components/seo/JsonLd";
import { ServiceFaqSection } from "@/components/ui/ServiceFaqSection";
import { LeadFormLight } from "@/components/sections/LeadFormLight";
import { SITE_URL } from "@/lib/content";

const SCENARIOS = [
  {
    icon: AlertOctagon,
    title: "A script or workflow stopped working after a NetSuite release.",
    description:
      "NetSuite releases run on a schedule. When an update changes an API, a record type, or governance behavior, scripts that worked last week break without warning. Users start seeing errors or unexpected behavior.",
  },
  {
    icon: Code2,
    title: "A custom UI element or Suitelet is returning an error.",
    description:
      "A custom transaction form, Suitelet, or portlet is throwing an error that prevents users from completing a record save or accessing a tool they depend on daily.",
  },
  {
    icon: RefreshCw,
    title: "An integration stopped syncing and data is now out of sync.",
    description:
      "An integration with Shopify, Salesforce, or another platform failed silently. Orders are missing, inventory counts are wrong, or customer records haven't updated in days.",
  },
  {
    icon: Database,
    title: "A data import created incorrect or duplicate records.",
    description:
      "A CSV import ran against the wrong mapping, an import script created duplicates, or data landed in the wrong fields. The records exist in production and need assessment and cleanup.",
  },
];

const HOW_IT_WORKS = [
  {
    step: "01",
    title: "Contact us with a description of what's broken",
    description:
      "Use the form on this page or email info@suitepacific.com directly. Include what the error message says, when it started, and what changed recently (release, configuration change, new script). The more specific the initial description, the faster the diagnosis.",
  },
  {
    step: "02",
    title: "We diagnose the issue and communicate the cause",
    description:
      "We access your account and identify the root cause of the failure. For release-related script breaks, this typically involves checking the script execution log, identifying the error line, and cross-referencing against the release notes for what changed. We communicate the cause and proposed fix before making changes.",
  },
  {
    step: "03",
    title: "Fix is built and tested in Sandbox where possible",
    description:
      "Where Sandbox testing is feasible given the urgency, we test the fix before applying to production. For situations where Sandbox is unavailable or the fix needs to go to production immediately, we communicate the tradeoffs before proceeding.",
  },
  {
    step: "04",
    title: "Resolution confirmed and documented",
    description:
      "Once the fix is in production and confirmed working, we document what broke, why, and what was changed. If the issue is release-related, we flag whether other scripts in your account may be vulnerable to the same change.",
  },
];

const WHY_SP = [
  {
    icon: Zap,
    title: "Same-day response",
    description:
      "Urgent issues get same-business-day acknowledgment and diagnosis. We prioritize broken production systems over new development work.",
  },
  {
    icon: ShieldCheck,
    title: "NetSuite-Certified",
    description:
      "Oracle NetSuite SuiteCloud Developer II and Administrator Professional certifications. We know the platform deeply and diagnose release-related failures faster because we track every release.",
  },
  {
    icon: Users,
    title: "Direct access, no ticket queue",
    description:
      "You communicate directly with the developer fixing the issue. No support tier, no account manager relay, no waiting for a ticket to be assigned.",
  },
  {
    icon: Clock,
    title: "We know NetSuite release patterns",
    description:
      "Most emergency issues are release-related. We track NetSuite release notes across every version and can often identify the specific change that caused a script to break within minutes of seeing the error.",
  },
];

const FAQ = [
  {
    question: "What counts as a NetSuite emergency?",
    answer:
      "A NetSuite emergency is any situation where a broken script, failed integration, or data issue is blocking daily operations or causing financial data to be incorrect. Common examples: a user event script preventing record saves in a live transaction type, an integration that stopped syncing orders, a Suitelet throwing an error that blocks a workflow users depend on, or a data import that created incorrect records in production.",
  },
  {
    question: "How quickly does SuitePacific respond to emergency requests?",
    answer:
      "We respond to emergency requests on the same business day. For issues submitted during Pacific business hours, initial acknowledgment and diagnostic communication typically happens within a few hours. Response times for off-hours submissions depend on severity and whether we're actively monitoring.",
  },
  {
    question: "Do I need to be an existing SuitePacific client to get emergency support?",
    answer:
      "No. We work with new clients on emergency issues. There is no retainer required to start. For first-time engagements, we charge on a project or hourly basis for the emergency work. Existing retainer clients receive emergency response as part of their ongoing engagement.",
  },
  {
    question: "What if the issue started after a NetSuite release?",
    answer:
      "Release-related script failures are the most common emergency issue we handle. When a NetSuite update changes an API behavior, a record type, or a governance limit, scripts that have run without issue for years can suddenly fail. We track every release and can usually identify the specific change causing the failure quickly.",
  },
  {
    question: "Can SuitePacific help clean up data from a bad import?",
    answer:
      "Yes. If a CSV import ran against the wrong mapping, created duplicate records, or posted data to the wrong fields, we assess the scope of the issue and build a cleanup approach. For large-scale data issues, we use Map/Reduce scripts to process and correct records in bulk. The approach depends on how many records are affected and what changes need to be made.",
  },
  {
    question: "What if the emergency is an integration failure affecting live orders?",
    answer:
      "Integration failures affecting live order or inventory data are treated as high priority. We diagnose the failure, identify the specific record or field causing the sync to break, and restore the integration as quickly as possible. We also identify how many records failed to sync during the outage and help recover missing data.",
  },
];

export const metadata: Metadata = {
  title: "NetSuite Emergency Support",
  description:
    "NetSuite emergency support for broken scripts, failed integrations, and data issues. Same-day diagnosis and fixes from Oracle-certified developers. No ticket queue, direct developer access.",
  alternates: { canonical: "/netsuite-emergency-support" },
  openGraph: {
    title: "NetSuite Emergency Support",
    description: "NetSuite emergency support for scripts that broke after a release, failed integrations, and urgent data issues. Same-day response, Oracle-certified, direct developer access.",
    url: "https://suitepacific.com/netsuite-emergency-support",
    type: "website",
    images: [{ url: "https://suitepacific.com/og-default.png", width: 1200, height: 630 }],
  },
};

export default function NetSuiteEmergencySupportPage() {
  return (
    <main className="pt-32 pb-24 sm:pt-40 sm:pb-32">
      <BreadcrumbJsonLd
        items={[
          { name: "Home", url: SITE_URL },
          { name: "NetSuite Emergency Support", url: `${SITE_URL}/netsuite-emergency-support` },
        ]}
      />
      <FaqJsonLd items={FAQ} />
      <ServiceJsonLd
        name="NetSuite Emergency Support"
        description="Same-day NetSuite emergency support for broken scripts, failed integrations, and urgent data issues."
        url={`${SITE_URL}/netsuite-emergency-support`}
        serviceType="NetSuite Support"
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
          eyebrow="Emergency Support"
          title="NetSuite Emergency Support"
          subtitle="Same-day diagnosis and fixes for broken scripts, failed integrations, data issues, and anything else that stops your NetSuite from working as it should."
          align="left"
        />

        <div className="mt-6 rounded-2xl border border-brand-100 bg-white p-5 shadow-soft">
          <LeadFormLight />
        </div>
        <p className="mt-3 text-xs text-brand-400">Same-day response · NetSuite-certified · Direct developer access · No ticket queue</p>

        <p className="mt-6 text-sm text-brand-400">
          NetSuite emergencies usually fall into one of a few categories: a script that broke after a
          release, an integration that stopped syncing, or a data issue that needs assessment and
          cleanup. SuitePacific handles all three. You get direct access to the developer doing the
          diagnosis and fix, same-business-day response, and a clear explanation of what broke and
          why before any changes are made.
        </p>

        {/* Scenarios */}
        <div className="mt-14" data-section="scenarios">
          <h2 className="text-lg font-semibold text-brand-900 mb-6">What kinds of NetSuite emergencies do we handle?</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            {SCENARIOS.map((item) => (
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
          <h2 className="text-lg font-semibold text-brand-900 mb-6">How emergency support works</h2>
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
          <h2 className="text-lg font-semibold text-brand-900 mb-6">Why SuitePacific for emergency support</h2>
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

        {/* Related */}
        <div className="mt-10 rounded-2xl border border-brand-100 bg-brand-50/30 p-5 sm:p-6">
          <p className="text-sm font-semibold text-brand-900 mb-3">Ongoing support after the emergency</p>
          <ul className="space-y-2.5">
            <li className="text-sm text-brand-400">
              <Link href="/netsuite-post-go-live-support" className="text-accent hover:underline">NetSuite post-go-live support</Link>{" "}
              covers ongoing development, fixes, and release testing on a month-to-month retainer so the next emergency is caught sooner.
            </li>
            <li className="text-sm text-brand-400">
              <Link href="/netsuite-health-check" className="text-accent hover:underline">NetSuite health check</Link>{" "}
              is a fixed-scope audit that identifies scripts, workflows, and configurations that are fragile or likely to break in future releases.
            </li>
            <li className="text-sm text-brand-400">
              <Link href="/blog/netsuite-script-broke-after-upgrade" className="text-accent hover:underline">What to do when a NetSuite script breaks after an upgrade</Link>{" "}
              walks through diagnosis steps for the most common release-related failures.
            </li>
          </ul>
        </div>

        <ServiceFaqSection items={FAQ} />
      </div>
    </main>
  );
}

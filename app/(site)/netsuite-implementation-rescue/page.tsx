import type { Metadata } from "next";
import Link from "next/link";
import {
  Wrench, Map, RefreshCw, ShieldCheck, AlertCircle,
  FileWarning, Users, Award, Zap, CheckCircle,
} from "lucide-react";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Card } from "@/components/ui/Card";
import { IconBadge } from "@/components/ui/IconBadge";
import { BreadcrumbJsonLd, FaqJsonLd, ServiceJsonLd, OrganizationJsonLd, VideoObjectJsonLd } from "@/components/seo/JsonLd";
import { ServiceFaqSection } from "@/components/ui/ServiceFaqSection";
import { LeadFormLight } from "@/components/sections/LeadFormLight";
import { SITE_URL } from "@/lib/content";

const PAIN_POINTS = [
  {
    icon: AlertCircle,
    title: "You went live, but the account doesn't actually fit your business.",
    description:
      "The implementation partner delivered what was scoped, but the configuration does not match how your team actually works. Key processes are still manual, and the workarounds have become the process.",
  },
  {
    icon: FileWarning,
    title: "The implementation partner is gone and left unfinished work.",
    description:
      "The engagement ended before everything was done. Modules were configured but never tested in your real workflows. Data was migrated but nobody cleaned up what carried over incorrectly.",
  },
  {
    icon: RefreshCw,
    title: "A failed or abandoned implementation needs to start over in places.",
    description:
      "Some parts of the account are fundamentally wrong and cannot be patched: workflow logic that cannot be made to work, chart of accounts structure that prevents accurate reporting, security roles that can never be right.",
  },
];

const RESCUE_AREAS = [
  {
    icon: CheckCircle,
    title: "Current State Assessment",
    description:
      "We document what was actually built before determining what needs to change. Without this, remediation risks building on top of the same problems.",
  },
  {
    icon: Map,
    title: "Gap Analysis and Remediation Roadmap",
    description:
      "A written roadmap of what needs to be fixed, in what order, and why. Sequenced to stabilize critical operations first rather than addressing everything simultaneously.",
  },
  {
    icon: Wrench,
    title: "Configuration Correction",
    description:
      "Rebuilding workflow logic, correcting custom field structures, fixing form configurations, and addressing role and permission structures that were set up incorrectly.",
  },
  {
    icon: RefreshCw,
    title: "Data Remediation",
    description:
      "Cleaning up records that were migrated incorrectly, correcting classifications that affect reporting, and establishing clean data standards going forward.",
  },
  {
    icon: ShieldCheck,
    title: "SuiteScript Review and Rewrite",
    description:
      "Auditing existing scripts for logic errors, performance problems, and broken dependencies. Rewriting scripts that cannot be made to work correctly as originally implemented.",
  },
  {
    icon: Users,
    title: "Process Alignment",
    description:
      "Making sure the corrected configuration actually matches how your team works, not how the implementation partner assumed you would work. Tested with real transactions before going live.",
  },
];

const HOW_IT_WORKS = [
  {
    step: "01",
    title: "Assessment before remediation",
    description:
      "We document the current state fully before recommending any changes. This gives you an objective picture of what is wrong and protects against replacing one set of problems with another.",
  },
  {
    step: "02",
    title: "Prioritized remediation roadmap",
    description:
      "Not everything wrong in a misimplemented account is equally urgent. We sequence remediation to stabilize what is breaking operations first, then address configuration quality, then handle optimization.",
  },
  {
    step: "03",
    title: "Sandbox-first, production when verified",
    description:
      "Every configuration change is tested in Sandbox against real transactions before it touches your production account. This is especially critical in rescue engagements where compounding errors are a real risk.",
  },
  {
    step: "04",
    title: "Documented outcomes",
    description:
      "The engagement closes with documentation of what was changed, what was rebuilt, and what the account's current state is. Your next developer or administrator starts from a known baseline.",
  },
];

const WHY_SP = [
  {
    icon: ShieldCheck,
    title: "NetSuite-Certified",
    description:
      "NetSuite SuiteCloud Developer II and Administrator Professional certifications. We know what a correctly configured account looks like and can identify when one is not.",
  },
  {
    icon: CheckCircle,
    title: "Assessment Before Action",
    description:
      "We document what exists before changing anything. Rescue engagements where changes are made without understanding the full picture tend to create new problems alongside the old ones.",
  },
  {
    icon: Zap,
    title: "Direct Access",
    description:
      "You communicate directly with the person doing the work. No account manager between you and the developer rebuilding your account.",
  },
  {
    icon: Award,
    title: "Enterprise Expertise, SMB Price",
    description:
      "The same depth of NetSuite expertise large companies staff internally, without the overhead of an enterprise consulting engagement scoped to a fixed fee that does not include follow-through.",
  },
];

const FAQ = [
  {
    question: "How do you decide what needs to be rebuilt versus patched?",
    answer:
      "The assessment phase answers this question specifically for your account. As a general rule: configuration issues that affect fundamental record structures, chart of accounts design, or security architecture are almost always better rebuilt than patched. Issues with individual workflows, saved searches, or scripts are usually patchable.",
  },
  {
    question: "How long does a rescue engagement take?",
    answer:
      "It depends on how much was misconfigured and how deeply it affects day-to-day operations. The assessment phase takes one to two weeks. Remediation duration is determined by the assessment findings. We give you a specific timeline after the assessment is complete.",
  },
  {
    question: "Can you work with our original implementation partner on this?",
    answer:
      "If the original partner is willing to be involved, we can coordinate. In most cases, rescue engagements come to us after the original relationship has ended. We review what was built regardless of who built it.",
  },
  {
    question: "Will operations be disrupted during the rescue?",
    answer:
      "Our goal is to minimize disruption. Changes go through Sandbox testing before production. For changes that do affect production, we schedule them outside business hours and communicate what users should expect before and after.",
  },
  {
    question: "What if we also need new development after the rescue is done?",
    answer:
      "Rescue engagements often reveal features the business needed but the implementation never built. Once the account is in a stable, correct state, new development work is scoped separately or folded into our ongoing support model.",
  },
];

export const metadata: Metadata = {
  title: "NetSuite Implementation Rescue and Reimplementation",
  description:
    "NetSuite rescue and remediation for failed or incomplete implementations: current state assessment, remediation roadmap, configuration correction, data cleanup, and SuiteScript rewrite.",
  alternates: { canonical: "/netsuite-implementation-rescue" },
  openGraph: {
    title: "NetSuite Implementation Rescue and Reimplementation",
    description: "NetSuite rescue for failed or incomplete implementations. Assessment, roadmap, configuration correction, and SuiteScript rewrite by Oracle-certified developers.",
    url: "https://suitepacific.com/netsuite-implementation-rescue",
    type: "website",
    images: [{ url: "https://suitepacific.com/og-default.png", width: 1200, height: 630 }],
  },
};

export default function NetSuiteImplementationRescuePage() {
  return (
    <main className="pt-32 pb-24 sm:pt-40 sm:pb-32">
      <BreadcrumbJsonLd
        items={[
          { name: "Home", url: SITE_URL },
          { name: "NetSuite Implementation Rescue", url: `${SITE_URL}/netsuite-implementation-rescue` },
        ]}
      />
      <FaqJsonLd items={FAQ} />
      <ServiceJsonLd
        name="NetSuite Implementation Rescue and Remediation"
        description="Assessment and remediation for NetSuite accounts that were misconfigured, incompletely implemented, or abandoned mid-engagement."
        url={`${SITE_URL}/netsuite-implementation-rescue`}
        serviceType="NetSuite Remediation"
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
          eyebrow="Implementation Rescue"
          title="NetSuite Implementation Rescue"
          subtitle="For companies that went live on NetSuite but ended up with an account that doesn't work for them, assessment, remediation roadmap, and targeted rebuilding by Oracle-certified developers."
          align="left"
        />

        <div className="mt-6 rounded-2xl border border-brand-100 bg-white p-5 shadow-soft">
          <LeadFormLight />
        </div>
        <p className="mt-3 text-xs text-brand-400">NetSuite-certified · Assessment before remediation · Sandbox-first · Direct access</p>

        <div className="mt-6 rounded-2xl border-l-4 border-accent bg-brand-50/50 p-5">
          <p className="text-xs font-semibold uppercase tracking-wide text-accent mb-2">Quick answer</p>
          <p className="text-sm text-brand-700 leading-relaxed">
            A NetSuite implementation rescue engagement addresses accounts that went live but do
            not work correctly for the business using them. Common scenarios include an account
            configured to match a template rather than actual business processes, custom scripts
            delivered but never tested against production data, integrations scoped but never
            completed, workflows routing approvals to the wrong people, and a customization layer
            with no documentation that cannot safely be changed without risk of breaking something
            else. A rescue engagement begins with an assessment rather than immediate changes,
            because making changes to an undocumented account can create new problems while
            fixing existing ones. The assessment produces a prioritized remediation roadmap with
            severity classifications and dependency ordering. SuitePacific conducts NetSuite
            implementation rescue engagements for accounts that went live with an implementation
            partner but are not functioning as expected, starting with a structured assessment
            before any remediation work begins.
          </p>
        </div>

        <p className="mt-6 text-sm text-brand-400">
          A failed or incomplete NetSuite implementation is not unusual. Timelines get compressed,
          scope gets cut, implementation partners disengage before everything works, and businesses
          go live on accounts that were never quite right. SuitePacific specializes in the work that
          follows: assessing what was built, identifying what needs to change, and making the
          corrections methodically without disrupting live operations.
        </p>

        {/* Pain Points */}
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

        {/* What we do */}
        <div className="mt-14" data-section="rescue-areas">
          <h2 className="text-lg font-semibold text-brand-900 mb-1">What the rescue engagement covers</h2>
          <p className="text-sm text-brand-400 mb-6">
            The scope depends on what the assessment finds. Not every account needs everything below.
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            {RESCUE_AREAS.map((item) => (
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
          <h2 className="text-lg font-semibold text-brand-900 mb-6">How a rescue engagement works</h2>
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
            If you are not sure whether your account qualifies as a failed implementation or just
            has accumulated technical debt, our{" "}
            <Link href="/netsuite-health-check" className="text-accent hover:underline">
              NetSuite health check
            </Link>{" "}
            is the right first step. It produces the assessment that determines whether rescue-level
            remediation is warranted.
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
          <p className="text-sm font-semibold text-brand-900 mb-3">Related</p>
          <ul className="space-y-2.5">
            <li className="text-sm text-brand-400">
              <Link href="/blog/signs-netsuite-implementation-failed" className="text-accent hover:underline">
                Signs your NetSuite implementation failed
              </Link>{" "}
              covers the specific patterns that distinguish a recoverable implementation from one that needs more fundamental remediation.
            </li>
            <li className="text-sm text-brand-400">
              <Link href="/netsuite-health-check" className="text-accent hover:underline">
                NetSuite health check
              </Link>{" "}
              is the right starting point if you are not sure what you are dealing with before committing to a rescue engagement.
            </li>
            <li className="text-sm text-brand-400">
              <Link href="/netsuite-post-go-live-support" className="text-accent hover:underline">
                Post-go-live support
              </Link>{" "}
              is where most rescue clients land after the remediation is complete.
            </li>
          </ul>
        </div>

        <ServiceFaqSection items={FAQ} />
      </div>
    </main>
  );
}

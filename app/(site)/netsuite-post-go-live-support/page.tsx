import type { Metadata } from "next";
import Link from "next/link";
import {
  Code2,
  Workflow,
  LayoutDashboard,
  Plug,
  Gauge,
  ShieldCheck,
  AlertCircle,
  RefreshCcw,
  Wrench,
  Users,
  Award,
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
    icon: AlertCircle,
    title: "Your implementation partner's engagement ended.",
    description:
      "The team that built your account was scoped for go-live. Ongoing changes, fixes, and new development were never part of that engagement.",
  },
  {
    icon: RefreshCcw,
    title: "NetSuite needs to keep up with your business.",
    description:
      "New processes, new team members, new requirements. A live account that stops evolving starts creating friction inside the business.",
  },
  {
    icon: Wrench,
    title: "Things break and nobody knows why.",
    description:
      "Scripts fail, workflows misbehave, saved searches return wrong data. Without a technical team on call, these issues accumulate until they become urgent.",
  },
];

const WHAT_WE_COVER = [
  {
    icon: Code2,
    title: "SuiteScript Development",
    description:
      "New scripts, fixes to existing ones, governance limit issues, and User Event or Scheduled scripts that need updating as your processes change.",
  },
  {
    icon: Workflow,
    title: "Workflow Automation",
    description:
      "New approval workflows, updates to existing SuiteFlow automations, notification logic, and status transition rules as your processes evolve.",
  },
  {
    icon: LayoutDashboard,
    title: "Saved Searches & Dashboards",
    description:
      "New saved searches for operational visibility, updated dashboards as reporting needs shift, and exception searches that flag what needs attention.",
  },
  {
    icon: Plug,
    title: "Integrations",
    description:
      "Fixes to existing integrations when upstream APIs change, new connections to external platforms, and RESTlet endpoints for custom data exchange.",
  },
  {
    icon: Gauge,
    title: "Account Optimization",
    description:
      "Performance fixes for slow pages and searches, script audits, cleanup of legacy customizations, and technical debt reduction.",
  },
  {
    icon: ShieldCheck,
    title: "Administration",
    description:
      "User management, role updates, custom fields and forms, period close, and configuration changes that keep the account current with the business.",
  },
];

const HOW_IT_WORKS = [
  {
    step: "01",
    title: "We onboard your account",
    description:
      "We review your existing scripts, workflows, integrations, and known issues before we start. You do not need to document everything for us; we read the account and figure it out.",
  },
  {
    step: "02",
    title: "You bring work as it comes up",
    description:
      "No new statement of work per request. Changes are built and tested in Sandbox first, then deployed to Production on a schedule that works for your team.",
  },
  {
    step: "03",
    title: "We stay current with your account",
    description:
      "Each request builds on the last. Because we maintain context on your account, there is no re-discovery each time something new comes in.",
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
    icon: RefreshCcw,
    title: "Context Retained",
    description:
      "Because we maintain ongoing context on your account, there is no re-discovery each time new work comes in. The second request takes less time than the first.",
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
    question: "What is the difference between this and NetSuite's own support?",
    answer:
      "NetSuite's support handles platform bugs and questions about standard functionality. We handle the customization layer: scripts, workflows, saved searches, templates, and configuration specific to your account. Most day-to-day questions in a live account sit in the customization layer, not the platform itself.",
  },
  {
    question: "How is support billed?",
    answer:
      "SuitePacific offers three engagement models: dedicated monthly support (a fixed block of hours applied to whatever comes up each month), on-demand access for occasional requests without a monthly commitment, and project-based engagements for defined builds with an agreed scope. Accounts with a steady stream of development and configuration needs typically choose dedicated monthly support; it provides consistent access without the overhead of scoping each individual request.",
  },
  {
    question: "Do you require a long-term contract?",
    answer:
      "We typically start with a three-month engagement, which gives enough time to understand the account and address the highest-priority items. Most clients continue month-to-month after that.",
  },
  {
    question: "Can you take over support from a current managed services provider?",
    answer:
      "Yes. We handle transitions regularly. The process involves a documented handoff of active customizations, known issues, and in-progress work. We also review the account independently rather than relying solely on the previous provider's documentation.",
  },
  {
    question: "Can you handle both development and administration work?",
    answer:
      "Yes. Most live accounts need both. Administration covers configuration changes inside NetSuite's built-in tools. Development covers SuiteScript, integrations, and automation that requires custom code. Both are handled within the same engagement.",
  },
];

export const metadata: Metadata = {
  title: "NetSuite Post-Go-Live Support",
  description:
    "Ongoing NetSuite managed services and post-go-live support: SuiteScript development, workflow automation, integrations, reporting, and administration after your implementation partner's work is done.",
  alternates: { canonical: "/netsuite-post-go-live-support" },
  openGraph: {
    title: "NetSuite Post-Go-Live Support",
    description: "Ongoing NetSuite managed services and post-go-live support: SuiteScript development, workflow automation, integrations, reporting, and administration after your implementation partner's work is done.",
    url: "https://suitepacific.com/netsuite-post-go-live-support",
    type: "website",
    images: [{ url: "https://suitepacific.com/og-default.png", width: 1200, height: 630 }],
  },
};

export default function PostGoLiveSupportPage() {
  return (
    <main className="pt-32 pb-24 sm:pt-40 sm:pb-32">
      <BreadcrumbJsonLd
        items={[
          { name: "Home", url: SITE_URL },
          { name: "NetSuite Post-Go-Live Support", url: `${SITE_URL}/netsuite-post-go-live-support` },
        ]}
      />
      <FaqJsonLd items={FAQ} />
      <ServiceJsonLd
        name="NetSuite Post-Go-Live Support"
        description="Ongoing development, automation, and support for companies already live on NetSuite. Covers SuiteScript, workflow automation, saved searches, PDF templates, and configuration."
        url={`${SITE_URL}/netsuite-post-go-live-support`}
        serviceType="NetSuite Managed Support"
      />

      <div className="mx-auto max-w-3xl px-6 lg:px-8">
        <SectionHeading
          as="h1"
          eyebrow="Post-Go-Live Support"
          title="NetSuite Post-Go-Live Support"
          subtitle="Ongoing development, automation, and support for companies already live on NetSuite. Your implementation partner got you there; we keep it running and growing."
          align="left"
        />

        <div className="mt-6 rounded-2xl border border-brand-100 bg-white p-5 shadow-soft">
          <LeadFormLight />
        </div>
        <p className="mt-3 text-xs text-brand-400">Oracle-certified · Sandbox-first · Direct access, no ticket system · Month-to-month</p>

        <p className="mt-6 text-sm text-brand-400">
          Implementation partners are scoped for go-live. Once that engagement closes, the
          ongoing technical work has nowhere to go. SuitePacific fills that gap: ongoing
          development, automation, and support for companies already live on NetSuite, as the
          account continues to grow and change after implementation.
        </p>

        {/* Pain points */}
        <div className="mt-14" data-section="pain-points">
          <h2 className="text-lg font-semibold text-brand-900 mb-6">
            What happens after go-live
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
            {PAIN_POINTS.map((item) => (
              <Card key={item.title} className="p-5 flex flex-col gap-3">
                <IconBadge icon={item.icon} />
                <h3 className="font-semibold text-brand-900 text-sm">{item.title}</h3>
                <p className="text-sm text-brand-400">{item.description}</p>
              </Card>
            ))}
          </div>
          <p className="mt-5 text-sm text-brand-400">
            If you have not gone live yet and are looking for an implementation partner, that is
            a different engagement. See{" "}
            <Link href="/netsuite-implementation-partner-vs-managed-support" className="text-accent hover:underline">
              implementation partner vs. managed support
            </Link>{" "}
            for that distinction.
          </p>
        </div>

        {/* What we cover */}
        <div className="mt-14" data-section="what-we-cover">
          <h2 className="text-lg font-semibold text-brand-900 mb-1">What is covered</h2>
          <p className="text-sm text-brand-400 mb-6">
            The mix varies by account, but a post-go-live engagement typically spans all of these.
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            {WHAT_WE_COVER.map((item) => (
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
          <h2 className="text-lg font-semibold text-brand-900 mb-6">How it works</h2>
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
          <h2 className="text-lg font-semibold text-brand-900 mb-6">Why companies choose SuitePacific</h2>
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
          <p className="text-sm font-semibold text-brand-900 mb-3">Related reading</p>
          <ul className="space-y-2.5">
            <li className="text-sm text-brand-400">
              <Link href="/blog/netsuite-post-go-live-checklist" className="text-accent hover:underline">
                NetSuite post-go-live checklist
              </Link>{" "}
              covers what should be in place in the months after implementation.
            </li>
            <li className="text-sm text-brand-400">
              <Link href="/blog/signs-netsuite-support-not-working" className="text-accent hover:underline">
                8 signs your NetSuite support isn&apos;t working
              </Link>{" "}
              identifies the patterns that indicate a support relationship needs to change.
            </li>
            <li className="text-sm text-brand-400">
              <Link href="/blog/netsuite-month-end-close-checklist" className="text-accent hover:underline">
                NetSuite month-end close checklist
              </Link>{" "}
              walks through the steps for a clean period close in NetSuite.
            </li>
            <li className="text-sm text-brand-400">
              <Link href="/blog/netsuite-support-partner-evaluation" className="text-accent hover:underline">
                How to evaluate a NetSuite support partner
              </Link>{" "}
              covers what to look for when selecting an ongoing support provider after go-live.
            </li>
          </ul>
        </div>

        <ServiceFaqSection items={FAQ} />
      </div>
    </main>
  );
}

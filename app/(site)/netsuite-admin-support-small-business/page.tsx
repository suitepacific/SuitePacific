import type { Metadata } from "next";
import Link from "next/link";
import {
  Users,
  Lock,
  Sliders,
  Workflow,
  Upload,
  Search,
  AlertCircle,
  Award,
  Clock,
  ShieldCheck,
  Zap,
  MessageSquare,
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
    title: "You went live. Now things pile up.",
    description:
      "Period close questions, permission errors, a custom field someone needs, a saved search that does not exist yet. Nobody on your team has the NetSuite knowledge to handle these quickly.",
  },
  {
    icon: Clock,
    title: "A full-time admin does not make sense at your size.",
    description:
      "A dedicated NetSuite administrator costs $80k or more per year in salary alone. For a growing business with occasional admin needs, that math does not work.",
  },
  {
    icon: MessageSquare,
    title: "Your implementation partner has moved on.",
    description:
      "The team that configured your account was scoped for go-live. Day-to-day configuration requests, role changes, and ongoing maintenance were never part of that engagement.",
  },
];

const ADMIN_AREAS = [
  {
    icon: Users,
    title: "User Management",
    description:
      "Adding new users, assigning roles, handling access changes when team members move positions, and deactivating accounts at offboarding.",
  },
  {
    icon: Lock,
    title: "Roles & Permissions",
    description:
      "Designing role-based access structures, restricting what each function can see and do, and adjusting permissions as your team grows or reorganizes.",
  },
  {
    icon: Sliders,
    title: "Custom Fields & Forms",
    description:
      "Adding fields for business-specific data, configuring forms so the right fields appear in the right order, and managing display rules.",
  },
  {
    icon: Search,
    title: "Saved Searches",
    description:
      "Building saved searches your team actually uses: open orders, overdue invoices, approval queues, inventory exceptions.",
  },
  {
    icon: Workflow,
    title: "Workflow & Automation",
    description:
      "Building SuiteFlow workflows for approvals, automated email alerts, status transitions, and simple process automation without custom code.",
  },
  {
    icon: Upload,
    title: "Data Imports & Maintenance",
    description:
      "CSV imports for bulk record creation or updates, data cleanup after process changes, and maintaining data integrity as the account grows.",
  },
];

const COMPARE_ROWS = [
  {
    label: "Cost",
    full_time: "Salary + benefits + overhead",
    sp: "Dedicated monthly support, sized to your account",
  },
  {
    label: "Commitment",
    full_time: "Hiring, training, turnover risk",
    sp: "Month-to-month, no minimum contract",
  },
  {
    label: "Coverage",
    full_time: "40 hours per week whether needed or not",
    sp: "Hours sized to your account; nothing more when admin is light",
  },
  {
    label: "Expertise",
    full_time: "One person's knowledge",
    sp: "Certified administrator with team support",
  },
  {
    label: "Continuity",
    full_time: "Starts over when they leave",
    sp: "Account documented; continuity built in",
  },
];

const HOW_IT_WORKS = [
  {
    step: "01",
    title: "Submit a request",
    description:
      "Email or message us with what you need. No ticketing system, no account manager relay. Direct access to the person handling the work.",
  },
  {
    step: "02",
    title: "We handle it",
    description:
      "Configuration changes go into your Sandbox environment first. Once verified, we deploy to Production. You do not need to be involved in the technical steps.",
  },
  {
    step: "03",
    title: "You stay informed",
    description:
      "A brief note of what changed and why. Over time, your team builds familiarity with how the account is configured without needing to own the technical work.",
  },
];

const WHY_SP = [
  {
    icon: ShieldCheck,
    title: "NetSuite-Certified",
    description:
      "NetSuite SuiteCloud Developer II and Administrator Professional certifications. Verified expertise, not self-declared.",
  },
  {
    icon: Zap,
    title: "Fast Turnaround",
    description:
      "Most requests are handled same or next business day. No multi-week queue before a field gets added or a role gets updated.",
  },
  {
    icon: Users,
    title: "Direct Access",
    description:
      "You communicate directly with the person doing the work. No ticket queue, no account coordinator in between.",
  },
  {
    icon: Award,
    title: "Enterprise Expertise, SMB Price",
    description:
      "Dedicated monthly support giving you a certified NetSuite administrator. The same depth of expertise large companies pay salaries for, at a cost that fits a growing business.",
  },
];

const FAQ = [
  {
    question: "How quickly do you respond to requests?",
    answer:
      "Same business day for most requests. Complex configuration changes that need scoping are addressed within 24 to 48 hours.",
  },
  {
    question: "How does dedicated monthly support work?",
    answer:
      "We agree on a fixed block of hours sized to your account's typical volume of administration work. Those hours cover whatever comes up that month: user changes, configuration requests, period questions, saved searches. Month-to-month, no minimum commitment.",
  },
  {
    question: "Can you also help with development work if we need it?",
    answer:
      "Yes. Administration covers no-code configuration inside NetSuite. When a requirement needs SuiteScript, custom automation, or an integration with another system, we handle that too within the same engagement.",
  },
  {
    question: "What does onboarding look like?",
    answer:
      "We review your account, document the existing configuration, and understand your team's role structure. Most clients are submitting their first requests within a week.",
  },
  {
    question: "What size accounts do you typically work with?",
    answer:
      "Most of our small business clients have 10 to 150 users and went live on NetSuite 6 to 36 months ago. The common thread is a live account without a dedicated internal administrator.",
  },
];

export const metadata: Metadata = {
  title: "NetSuite Admin Support for Small Business",
  description:
    "Fractional NetSuite administrator for small businesses: user management, roles, custom fields, saved searches, and workflow automation through dedicated monthly support. No full-time hire needed.",
  alternates: { canonical: "/netsuite-admin-support-small-business" },
  openGraph: {
    title: "NetSuite Admin Support for Small Business",
    description: "Fractional NetSuite administrator for small businesses: user management, roles, custom fields, saved searches, and workflow automation through dedicated monthly support. No full-time hire needed.",
    url: "https://suitepacific.com/netsuite-admin-support-small-business",
    type: "website",
    images: [{ url: "https://suitepacific.com/og-default.png", width: 1200, height: 630 }],
  },
};

export default function NetSuiteAdminSupportSmallBusinessPage() {
  return (
    <main className="pt-32 pb-24 sm:pt-40 sm:pb-32">
      <BreadcrumbJsonLd
        items={[
          { name: "Home", url: SITE_URL },
          {
            name: "NetSuite Admin Support for Small Business",
            url: `${SITE_URL}/netsuite-admin-support-small-business`,
          },
        ]}
      />
      <FaqJsonLd items={FAQ} />
      <ServiceJsonLd
        name="NetSuite Admin Support for Small Business"
        description="Enterprise-grade NetSuite administration through dedicated monthly support for small and mid-sized businesses."
        url={`${SITE_URL}/netsuite-admin-support-small-business`}
        serviceType="NetSuite Administration"
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
          eyebrow="Fractional NetSuite Administrator"
          title="NetSuite Admin Support for Small Business"
          subtitle="Enterprise-grade NetSuite administration through dedicated monthly support built for SMBs. No full-time hire, no long-term contracts."
          align="left"
        />

        <div className="mt-6 rounded-2xl border border-brand-100 bg-white p-5 shadow-soft">
          <LeadFormLight />
        </div>
        <p className="mt-3 text-xs text-brand-400">NetSuite-certified · Sandbox-first · Direct access, no ticket system · Month-to-month</p>

        <p className="mt-6 text-sm text-brand-400">
          SuitePacific provides certified NetSuite administration through dedicated monthly
          support for companies that went live on NetSuite but do not have a dedicated internal
          administrator. Most requests are handled same or next business day. No ticketing
          system, no account managers, no long-term contracts.
        </p>

        {/* Pain Points */}
        <div className="mt-14" data-section="pain-points">
          <h2 className="text-lg font-semibold text-brand-900 mb-6">
            The situation most small businesses are in
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
        </div>

        {/* What we handle */}
        <div className="mt-14" data-section="admin-areas">
          <h2 className="text-lg font-semibold text-brand-900 mb-1">What we handle</h2>
          <p className="text-sm text-brand-400 mb-6">
            Day-to-day administration that keeps your NetSuite account current with your business.
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            {ADMIN_AREAS.map((item) => (
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

        {/* Comparison */}
        <div className="mt-14" data-section="comparison">
          <h2 className="text-lg font-semibold text-brand-900">
            Full-time admin vs. SuitePacific
          </h2>
          <p className="mt-2 text-sm text-brand-400">
            For most small businesses, a fractional model delivers more flexibility at a fraction of the cost.
          </p>
          <div className="mt-5 rounded-2xl border border-brand-100 overflow-x-auto">
            <div className="grid grid-cols-3 min-w-[480px] text-sm">
              <div className="bg-brand-50/40 p-4 border-r border-brand-100">
                <p className="font-semibold text-brand-900 mb-3 text-xs invisible">Label</p>
                {COMPARE_ROWS.map((r) => (
                  <div
                    key={r.label}
                    className="py-2.5 border-b border-brand-100/60 last:border-0 font-medium text-brand-700 text-xs"
                  >
                    {r.label}
                  </div>
                ))}
              </div>
              <div className="bg-brand-50/20 p-4 border-r border-brand-100">
                <p className="font-semibold text-brand-900 mb-3 text-xs">Full-time employee</p>
                {COMPARE_ROWS.map((r) => (
                  <div
                    key={r.full_time}
                    className="py-2.5 border-b border-brand-100/60 last:border-0 text-brand-500 text-xs"
                  >
                    {r.full_time}
                  </div>
                ))}
              </div>
              <div className="bg-brand p-4">
                <p className="font-semibold text-white mb-3 text-xs">SuitePacific</p>
                {COMPARE_ROWS.map((r) => (
                  <div
                    key={r.sp}
                    className="py-2.5 border-b border-white/10 last:border-0 text-blue-100 text-xs"
                  >
                    {r.sp}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Why SuitePacific */}
        <div className="mt-14" data-section="why-suitepacific">
          <h2 className="text-lg font-semibold text-brand-900 mb-6">
            Why small businesses choose SuitePacific
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

        {/* Related services */}
        <div className="mt-10 rounded-2xl border border-brand-100 bg-brand-50/30 p-5 sm:p-6">
          <p className="text-sm font-semibold text-brand-900 mb-3">Also from SuitePacific</p>
          <ul className="space-y-2.5">
            <li className="text-sm text-brand-400">
              <Link href="/netsuite-administrator-support" className="text-accent hover:underline">
                NetSuite Administrator Support
              </Link>{" "}
              covers the full administration picture, including development work when configuration is not enough.
            </li>
            <li className="text-sm text-brand-400">
              <Link href="/netsuite-post-go-live-support" className="text-accent hover:underline">
                Post-Go-Live Support
              </Link>{" "}
              combines administration and development under one dedicated monthly support model.
            </li>
            <li className="text-sm text-brand-400">
              <Link href="/netsuite-account-optimization" className="text-accent hover:underline">
                Account Optimization
              </Link>{" "}
              is the right starting point if your account has accumulated technical debt before ongoing work can start.
            </li>
          </ul>
        </div>

        <ServiceFaqSection items={FAQ} />
      </div>
    </main>
  );
}

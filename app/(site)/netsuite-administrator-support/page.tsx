import type { Metadata } from "next";
import Link from "next/link";
import {
  Users, Lock, Sliders, CalendarDays, Upload, Search,
  AlertCircle, Clock, Wrench,
  ShieldCheck, Zap, Award,
} from "lucide-react";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Card } from "@/components/ui/Card";
import { IconBadge } from "@/components/ui/IconBadge";
import { BreadcrumbJsonLd, FaqJsonLd, ServiceJsonLd, OrganizationJsonLd, VideoObjectJsonLd } from "@/components/seo/JsonLd";
import { ServiceFaqSection } from "@/components/ui/ServiceFaqSection";
import { LeadFormLight } from "@/components/sections/LeadFormLight";
import { SuitePacificCallout } from "@/components/sections/SuitePacificCallout";
import { SITE_URL } from "@/lib/content";

const PAIN_POINTS = [
  {
    icon: AlertCircle,
    title: "Your implementation partner's scope ended at go-live.",
    description:
      "Day-to-day configuration requests, role changes, and ongoing maintenance were never part of that engagement. Now those requests have nowhere to go.",
  },
  {
    icon: Clock,
    title: "Configuration tasks have been accumulating for months.",
    description:
      "A list of fields to add, roles to update, and searches to build that nobody has had time to address. Small things individually; friction across the team collectively.",
  },
  {
    icon: Wrench,
    title: "Roles and access haven't been reviewed since implementation.",
    description:
      "Team members have changed roles, new departments have formed, and permissions still reflect the org chart from two years ago.",
  },
];

const ADMIN_AREAS = [
  {
    icon: Users,
    title: "User Management",
    description:
      "Adding new users, assigning and updating roles, handling access changes when team members change positions, and deactivating accounts at offboarding.",
  },
  {
    icon: Lock,
    title: "Roles & Permissions",
    description:
      "Designing role-based access structures, restricting record and field visibility by function, and adjusting permissions as the organization's structure changes.",
  },
  {
    icon: Sliders,
    title: "Custom Fields & Forms",
    description:
      "Adding fields to capture business-specific data, configuring entry forms so the right fields appear in the right order, and managing field-level display rules.",
  },
  {
    icon: Search,
    title: "Saved Searches",
    description:
      "Building saved searches for end users: open orders, overdue invoices, approval queues, inventory exceptions, maintained as business requirements change.",
  },
  {
    icon: CalendarDays,
    title: "Period & Calendar Management",
    description:
      "Opening and closing accounting periods, managing fiscal year setup, and handling period lock issues that come up at month-end and year-end.",
  },
  {
    icon: Upload,
    title: "Data Imports & Maintenance",
    description:
      "CSV imports for bulk record creation or updates, data cleanup after process changes, and maintaining data integrity as the account grows.",
  },
];

const HOW_IT_WORKS = [
  {
    step: "01",
    title: "We review the account first",
    description:
      "Before handling any requests, we review your existing role structure, custom fields, saved searches, and any known issues. You don't need to document it all for us; we read the account and figure out what's there.",
  },
  {
    step: "02",
    title: "Changes are sandboxed before production",
    description:
      "Configuration changes are tested in your Sandbox account before being deployed to Production. You confirm what's changing before it touches your live account.",
  },
  {
    step: "03",
    title: "We document what we do",
    description:
      "Every change is noted: what was done, what it affects, and why. Your team builds familiarity with how the account is configured without needing to own the technical work.",
  },
];

const COMPARE_ROWS = [
  { label: "Cost", fullTime: "Full-time salary + benefits + overhead", sp: "Dedicated monthly support sized to the account" },
  { label: "Availability", fullTime: "One person, one schedule", sp: "Same or next business day on most requests" },
  { label: "Expertise", fullTime: "Varies by hire", sp: "NetSuite-certified, Administrator Professional" },
  { label: "Continuity", fullTime: "Knowledge leaves with the employee", sp: "Account context retained across all requests" },
  { label: "Scalability", fullTime: "Headcount tied to workload changes", sp: "Hours scale up or down month to month" },
  { label: "Coverage", fullTime: "Admin only", sp: "Admin + development when requirements go beyond configuration" },
];

const WHY_SP = [
  {
    icon: ShieldCheck,
    title: "NetSuite-Certified",
    description:
      "NetSuite SuiteCloud Developer II and Administrator Professional certifications. Verified technical credentials, not self-declared experience.",
  },
  {
    icon: Zap,
    title: "Same or Next Day",
    description:
      "Most configuration requests are handled same or next business day. No multi-week queue before a field gets added, a role gets updated, or a search gets built.",
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
    question: "Can you support our existing internal NetSuite administrator?",
    answer:
      "Yes. Most clients have an internal admin who handles day-to-day questions and basic configuration. We work alongside them, taking on tasks that are outside their bandwidth or require more technical depth, while they stay the main point of contact for their team's routine requests.",
  },
  {
    question: "What if we have no internal NetSuite knowledge at all?",
    answer:
      "That's a common starting point. We handle the administration work directly and give you visibility into what's been done and why, so your team builds familiarity with how the account is configured over time.",
  },
  {
    question: "Do you handle user provisioning and offboarding?",
    answer:
      "Yes. Adding new users, assigning roles, updating permissions when someone changes roles, and deactivating accounts when someone leaves, all of this is standard administration work we take on.",
  },
  {
    question: "What is the difference between administration and development?",
    answer:
      "Administration covers what you can do inside NetSuite's configuration tools: roles, fields, forms, basic workflows, saved searches, period management, and data imports. Development (SuiteScript, custom integrations, advanced automation) is needed when standard configuration can't achieve the business requirement. Many engagements involve both, and we handle each as it comes up.",
  },
  {
    question: "Can you set up roles and permissions from scratch for a new subsidiary or department?",
    answer:
      "Yes. Role design, deciding which record types, fields, and transactions each role should access, is a common administration task, particularly when a business adds a new entity, hires for a new function, or needs to tighten access controls.",
  },
];

export const metadata: Metadata = {
  title: "NetSuite Administrator Support",
  description:
    "Ongoing NetSuite administrator support for post-go-live accounts: user management, roles and permissions, custom fields, saved searches, period management, and data imports.",
  alternates: { canonical: "/netsuite-administrator-support" },
  openGraph: {
    title: "NetSuite Administrator Support",
    description: "Ongoing NetSuite administrator support for post-go-live accounts: user management, roles and permissions, custom fields, saved searches, period management, and data imports.",
    url: "https://suitepacific.com/netsuite-administrator-support",
    type: "website",
    images: [{ url: "https://suitepacific.com/og-default.png", width: 1200, height: 630 }],
  },
};

export default function NetSuiteAdministratorSupportPage() {
  return (
    <main className="pt-32 pb-24 sm:pt-40 sm:pb-32">
      <BreadcrumbJsonLd
        items={[
          { name: "Home", url: SITE_URL },
          { name: "NetSuite Administrator Support", url: `${SITE_URL}/netsuite-administrator-support` },
        ]}
      />
      <FaqJsonLd items={FAQ} />
      <ServiceJsonLd
        name="NetSuite Administrator Support"
        description="Ongoing NetSuite administrator support, account management, and configuration for live NetSuite accounts."
        url={`${SITE_URL}/netsuite-administrator-support`}
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
          eyebrow="NetSuite Administration"
          title="NetSuite Administrator Support"
          subtitle="Without a dedicated NetSuite administrator, configuration changes fall behind, upgrades carry unchecked risk, and informal fixes accumulate. SuitePacific provides certified NetSuite administrator support as a monthly retainer from $799."
          align="left"
        />

        <div className="mt-6 rounded-2xl border border-brand-100 bg-white p-5 shadow-soft">
          <LeadFormLight />
        </div>
        <p className="mt-3 text-xs text-brand-400">NetSuite-certified · Sandbox-first · Direct access, no ticket system · Month-to-month</p>

        <div className="mt-6 rounded-2xl border-l-4 border-accent bg-brand-50/50 p-5">
          <p className="text-xs font-semibold uppercase tracking-wide text-accent mb-2">Quick answer</p>
          <p className="text-sm text-brand-700 leading-relaxed">
            NetSuite administrator support covers the ongoing configuration work that keeps a live
            account aligned with a growing business: adding users and adjusting roles, creating and
            modifying custom fields, updating saved searches and dashboards, maintaining forms and
            record layouts, and handling the configuration changes that surface as processes evolve.
            This work does not require custom scripting but does require someone who understands
            how NetSuite&apos;s permission model works, how role-based field visibility interacts with
            workflow conditions, and how form changes can break saved searches that reference the
            previous layout. Most businesses going live on NetSuite underestimate how much ongoing
            administration work a live account generates. Common monthly requests include role
            changes, field additions, saved search updates, form modifications, and periodic
            clean-up of inactive records and stale configurations. SuitePacific provides dedicated
            NetSuite administrator support on a monthly retainer for post-go-live accounts, with
            direct access to the same certified administrator on every request and no long-term
            contract.
          </p>
        </div>

        <p className="mt-6 text-sm text-brand-400">
          When a new department is added, a role needs to change, or month-end closes with a period
          lock question, that work falls to whoever is available. NetSuite administrator support
          covers the ongoing configuration that keeps the account current with the business, without
          requiring custom development. SuitePacific provides this for live NetSuite accounts
          on a month-to-month basis, with most requests handled same or next business day.
          For situations where requirements go beyond configuration,
          see our{" "}
          <Link href="/netsuite-suitescript-development" className="text-accent hover:underline">
            SuiteScript development page
          </Link>
          .
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

        {/* Admin areas */}
        <div className="mt-14" data-section="admin-areas">
          <h2 className="text-lg font-semibold text-brand-900 mb-1">What administration covers</h2>
          <p className="text-sm text-brand-400 mb-6">
            The day-to-day configuration work that does not require custom code but still requires someone who knows the platform.
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

        {/* Comparison table */}
        <div className="mt-14" data-section="comparison">
          <h2 className="text-lg font-semibold text-brand-900 mb-6">Full-time admin vs. SuitePacific</h2>
          <div className="overflow-x-auto rounded-xl border border-brand-100">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-brand-100 bg-brand-50/40">
                  <th className="py-3 px-4 text-left font-semibold text-brand-900 w-1/4"></th>
                  <th className="py-3 px-4 text-left font-semibold text-brand-600">Full-time admin</th>
                  <th className="py-3 px-4 text-left font-semibold text-accent">SuitePacific</th>
                </tr>
              </thead>
              <tbody>
                {COMPARE_ROWS.map((row, i) => (
                  <tr key={row.label} className={i % 2 === 0 ? "bg-white" : "bg-brand-50/20"}>
                    <td className="py-3 px-4 font-semibold text-brand-900">{row.label}</td>
                    <td className="py-3 px-4 text-brand-400">{row.fullTime}</td>
                    <td className="py-3 px-4 text-brand-700">{row.sp}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p className="mt-4 text-sm text-brand-400">
            Administration work is typically part of a broader{" "}
            <Link href="/netsuite-post-go-live-support" className="text-accent hover:underline">
              post-go-live support engagement
            </Link>
            , alongside development work the account requires.
          </p>
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
          <p className="text-sm font-semibold text-brand-900 mb-3">From the blog</p>
          <ul className="space-y-2.5">
            <li className="text-sm text-brand-400">
              <Link href="/blog/netsuite-passkey-second-factor-2026-2" className="text-accent hover:underline">
                NetSuite passkey and second factor changes in 2026.2
              </Link>{" "}
              covers the authentication requirement changes NetSuite administrators need to act on before the 2026.2 upgrade.
            </li>
          </ul>
        </div>

        
        {/* Bottom Line */}
        <div className="mt-12 rounded-2xl border-2 border-accent/30 bg-gradient-to-br from-accent/5 to-transparent p-6">
          <p className="text-xs font-semibold uppercase tracking-wide text-accent mb-3">Bottom Line</p>
          <h2 className="text-base font-semibold text-brand-900 mb-3">
            A capable NetSuite administrator keeps the account current with the business. Without one, every change becomes a backlog and every upgrade a risk.
          </h2>
          <p className="text-sm text-brand-500 mb-4">
            Post-go-live NetSuite accounts need ongoing administration: new users and roles as the team changes, custom fields and forms as processes evolve, saved searches and dashboards as reporting needs shift, and configuration review before each bi-annual release. Most SMBs cannot justify a full-time NetSuite administrator, and ad-hoc fixes from whoever is available produce inconsistent configuration.
          </p>
          <p className="text-sm text-brand-500 mb-4">
            SuitePacific provides dedicated NetSuite administrator support for post-go-live accounts. Oracle Administrator Professional certified. Day-to-day configuration, user management, saved searches, and upgrade preparation covered in a single monthly retainer. Plans from $799 per month, month-to-month.
          </p>
          <ul className="space-y-2 text-sm text-brand-500">
            <li className="flex items-start gap-2"><span className="text-accent font-bold mt-0.5">→</span> Oracle Administrator Professional certified: not self-declared experience</li>
            <li className="flex items-start gap-2"><span className="text-accent font-bold mt-0.5">→</span> One retainer covers administration and SuiteScript development, no separate engagements</li>
            <li className="flex items-start gap-2"><span className="text-accent font-bold mt-0.5">→</span> One business day response for all active plans</li>
          </ul>
        </div>

        <SuitePacificCallout
          heading="SuitePacific: dedicated NetSuite administrator support"
          linkHref="/netsuite-care"
          linkLabel="View SuitePacific plans"
        />

        <ServiceFaqSection items={FAQ} />
      </div>
    </main>
  );
}

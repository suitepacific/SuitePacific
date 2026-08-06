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
import { Button } from "@/components/ui/Button";
import { BreadcrumbJsonLd, FaqJsonLd, ServiceJsonLd } from "@/components/seo/JsonLd";
import { ServiceFaqSection } from "@/components/ui/ServiceFaqSection";
import { LeadForm } from "@/components/sections/LeadForm";
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

const WHO_ITS_FOR = [
  "Companies live on NetSuite without a dedicated internal NetSuite administrator",
  "Internal admins who are stretched across other responsibilities and need technical backup",
  "Teams with a backlog of configuration requests that have accumulated since go-live",
  "Accounts where access and roles have not been reviewed since implementation",
];

const WHY_SP = [
  {
    icon: ShieldCheck,
    title: "Oracle-Certified",
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

      <div className="mx-auto max-w-3xl px-6 lg:px-8">
        <SectionHeading
          as="h1"
          eyebrow="NetSuite Administration"
          title="NetSuite Administrator Support"
          subtitle="Ongoing configuration support for live NetSuite accounts: users, roles, fields, saved searches, and the day-to-day changes that keep pace with a growing business."
          align="left"
        />

        <p className="mt-6 text-sm text-brand-400">
          When a new department is added, a role needs to change, or month-end closes with a period
          lock question, that work falls to whoever is available. NetSuite administrator support
          covers the ongoing configuration that keeps the account current with the business, without
          requiring custom development. For situations where requirements go beyond configuration,
          see our{" "}
          <Link href="/netsuite-suitescript-development" className="text-accent hover:underline">
            SuiteScript development page
          </Link>
          .
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

        {/* Who this is for */}
        <div className="mt-14" data-section="who-its-for">
          <h2 className="text-lg font-semibold text-brand-900 mb-4">Who this is for</h2>
          <ul className="space-y-3">
            {WHO_ITS_FOR.map((item) => (
              <li key={item} className="flex items-start gap-3 text-sm text-brand-600">
                <span className="h-1.5 w-1.5 rounded-full bg-accent shrink-0 mt-2" />
                {item}
              </li>
            ))}
          </ul>
          <p className="mt-5 text-sm text-brand-400">
            Administration work is typically part of a broader{" "}
            <Link href="/netsuite-post-go-live-support" className="text-accent hover:underline">
              post-go-live support engagement
            </Link>
            , alongside any development work the account requires. For accounts that have
            accumulated technical debt, see{" "}
            <Link href="/netsuite-account-optimization" className="text-accent hover:underline">
              account optimization
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
          <p className="text-brand-900 font-semibold text-lg">Need someone to keep your NetSuite account current?</p>
          <p className="mt-2 text-sm text-brand-400">
            Tell us what has been piling up and we will tell you how we would approach it.
          </p>
          <div className="mt-6 rounded-2xl border border-brand-100 bg-white p-6 sm:p-8 shadow-soft">
            <LeadForm />
          </div>
        </div>
      </div>
    </main>
  );
}

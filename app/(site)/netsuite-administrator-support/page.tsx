import type { Metadata } from "next";
import Link from "next/link";
import { Users, Lock, Sliders, CalendarDays, Upload, Search } from "lucide-react";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Card } from "@/components/ui/Card";
import { IconBadge } from "@/components/ui/IconBadge";
import { Button } from "@/components/ui/Button";
import { BreadcrumbJsonLd, FaqJsonLd } from "@/components/seo/JsonLd";
import { ServiceFaqSection } from "@/components/ui/ServiceFaqSection";
import { SITE_URL } from "@/lib/content";

const FAQ = [
  {
    question: "Can you support our existing internal NetSuite administrator?",
    answer:
      "Yes. Most clients have an internal admin who handles day-to-day questions and basic configuration. We work alongside them — taking on tasks that are outside their bandwidth or require more technical depth, while they stay the main point of contact for their team's routine requests.",
  },
  {
    question: "What if we have no internal NetSuite knowledge at all?",
    answer:
      "That's a common starting point. We handle the administration work directly and give you visibility into what's been done and why, so your team builds familiarity with how the account is configured over time.",
  },
  {
    question: "Do you handle user provisioning and offboarding?",
    answer:
      "Yes. Adding new users, assigning roles, updating permissions when someone changes roles, and deactivating accounts when someone leaves — all of this is standard administration work we take on.",
  },
  {
    question: "What is the difference between administration and development?",
    answer:
      "Administration covers what you can do inside NetSuite's configuration tools: roles, fields, forms, basic workflows, saved searches, period management, and data imports. Development — SuiteScript, custom integrations, advanced automation — is needed when standard configuration can't achieve the business requirement. Many engagements involve both, and we handle each as it comes up.",
  },
  {
    question: "Can you set up roles and permissions from scratch for a new subsidiary or department?",
    answer:
      "Yes. Role design — deciding which record types, fields, and transactions each role should access — is a common administration task, particularly when a business adds a new entity, hires for a new function, or needs to tighten access controls.",
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
      "Building saved searches for end users — open orders, overdue invoices, approval queues, inventory exceptions — and keeping them maintained as business requirements change.",
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

export const metadata: Metadata = {
  title: "NetSuite Administrator Support | SuitePacific",
  description:
    "Ongoing NetSuite administrator support for post-go-live accounts: user management, roles and permissions, custom fields, saved searches, period management, and data imports.",
  alternates: { canonical: "/netsuite-administrator-support" },
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

      <div className="mx-auto max-w-3xl px-6 lg:px-8">
        <SectionHeading
          as="h1"
          eyebrow="NetSuite Administration"
          title="NetSuite Administrator Support"
          subtitle="Ongoing configuration support for live NetSuite accounts — users, roles, fields, saved searches, and the day-to-day changes that keep pace with a growing business."
          align="left"
        />

        <div className="prose prose-blue mt-12 max-w-none prose-headings:font-semibold prose-headings:text-brand-900 prose-p:text-brand-400 prose-a:text-accent prose-a:no-underline hover:prose-a:underline prose-strong:text-brand-900">
          <h2>What happens after your implementation partner leaves</h2>
          <p>
            NetSuite implementations hand off a configured account. What they don&apos;t hand off
            is a team to keep it configured. When a new department is added, a role needs to
            change, a custom field needs to be added for a new process, or month-end closes
            with a period lock question — that work falls to whoever is available, which is often
            no one with specific NetSuite knowledge.
          </p>
          <p>
            NetSuite administrator support covers the ongoing configuration work that keeps the
            account current with the business: access management as the team changes, new fields
            and forms as processes evolve, saved searches as reporting needs shift, and period
            management at close. It&apos;s the work that doesn&apos;t require custom development
            but still requires someone who knows the platform.
          </p>

          <h2>What administration covers</h2>
        </div>

        <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 gap-5">
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

        <div className="prose prose-blue mt-12 max-w-none prose-headings:font-semibold prose-headings:text-brand-900 prose-p:text-brand-400 prose-a:text-accent prose-a:no-underline hover:prose-a:underline prose-strong:text-brand-900">
          <h2>Administration vs development</h2>
          <p>
            NetSuite administration uses the platform&apos;s built-in configuration tools —
            no code required. When a requirement exceeds what configuration can do, it moves
            into development territory: custom SuiteScript logic, advanced workflow automation,
            or integrations with external systems. Most live accounts need both at different
            times, and most of our engagements involve a mix.
          </p>
          <p>
            For a clear breakdown of the boundary between admin and developer work, see our{" "}
            <Link href="/hire-netsuite-developer">NetSuite developer guide</Link>. For
            situations where the account has accumulated technical debt that needs cleaning
            up rather than new configuration, that&apos;s{" "}
            <Link href="/netsuite-account-optimization">account optimization</Link>.
          </p>

          <h2>Who this is for</h2>
          <p>
            Companies that are live on NetSuite and don&apos;t have a dedicated internal
            administrator — or have one who is stretched across other responsibilities and
            needs someone to handle the NetSuite-specific work. We function as an extension
            of your team: requests come in as they arise, changes are made and documented,
            and your account stays current without you needing to build internal NetSuite
            expertise from scratch.
          </p>
          <p>
            Administration work is typically handled as part of a broader{" "}
            <Link href="/netsuite-post-go-live-support">post-go-live support engagement</Link>,
            alongside any development work the account requires. If you have a specific
            administration question or a backlog of configuration tasks that have been
            sitting unaddressed, that&apos;s a good starting point for a conversation.
          </p>
        </div>

        <ServiceFaqSection items={FAQ} />

        <div className="mt-14 pt-10 border-t border-brand-50 text-center">
          <p className="text-brand-900 font-semibold">Need someone to keep your NetSuite account current?</p>
          <p className="mt-2 text-sm text-brand-400">
            Tell us what&apos;s been piling up and we&apos;ll tell you how we&apos;d approach it.
          </p>
          <div className="mt-6">
            <Button href="/contact">Book a Free Consultation</Button>
          </div>
        </div>
      </div>
    </main>
  );
}

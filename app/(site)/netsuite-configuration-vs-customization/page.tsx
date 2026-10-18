import type { Metadata } from "next";
import Link from "next/link";
import { CheckCircle2, XCircle, Settings, Code2 } from "lucide-react";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Card } from "@/components/ui/Card";
import { IconBadge } from "@/components/ui/IconBadge";
import { BreadcrumbJsonLd, FaqJsonLd, ServiceJsonLd, OrganizationJsonLd } from "@/components/seo/JsonLd";
import { ServiceFaqSection } from "@/components/ui/ServiceFaqSection";
import { LeadFormLight } from "@/components/sections/LeadFormLight";
import { SITE_URL } from "@/lib/content";

const COMPARISON_ROWS = [
  { feature: "Custom fields", configuration: "Yes", customization: "Not needed" },
  { feature: "Custom forms", configuration: "Yes", customization: "Not needed" },
  { feature: "SuiteFlow workflows", configuration: "Yes", customization: "Not needed" },
  { feature: "Saved searches", configuration: "Yes", customization: "Not needed" },
  { feature: "Roles and permissions", configuration: "Yes", customization: "Not needed" },
  { feature: "Logic on record save", configuration: "No", customization: "Yes (User Event script)" },
  { feature: "Conditional required fields", configuration: "Limited", customization: "Yes (Client script)" },
  { feature: "Create related records", configuration: "No", customization: "Yes (User Event script)" },
  { feature: "External API calls", configuration: "No", customization: "Yes (Restlet/Scheduled)" },
  { feature: "Batch processing", configuration: "No", customization: "Yes (Scheduled/Map-Reduce)" },
  { feature: "Requires developer", configuration: "No", customization: "Yes" },
  { feature: "Upgrade risk", configuration: "Low", customization: "Medium (needs release testing)" },
];

const CONFIG_EXAMPLES = [
  {
    icon: Settings,
    title: "Custom fields and forms",
    description:
      "Add fields to any standard NetSuite record type, create custom transaction forms with specific field layouts, and restrict field visibility by role. No code required and fully supported on upgrades.",
  },
  {
    icon: Settings,
    title: "SuiteFlow approval workflows",
    description:
      "Build approval routing for purchase orders, invoices, and expense reports. Set up email notifications, status transitions, and conditional branching based on field values. No developer needed.",
  },
  {
    icon: Settings,
    title: "Saved searches and reports",
    description:
      "Build operational reports, summary views, and dashboard portlets using saved searches with formula columns. Covers most reporting needs without scripting.",
  },
  {
    icon: Settings,
    title: "Roles, permissions, and centers",
    description:
      "Define role-based access, restrict record types and fields, and customize the navigation center each role sees. Managed entirely through the NetSuite interface.",
  },
];

const CUSTOM_EXAMPLES = [
  {
    icon: Code2,
    title: "Logic on record save (User Event scripts)",
    description:
      "Run JavaScript before or after a record is saved. Use cases: enforce a field combination that standard forms won&apos;t block, copy a value to a related record, calculate a derived field, or call an external system on save.",
  },
  {
    icon: Code2,
    title: "Conditional required fields (Client scripts)",
    description:
      "Make a field required only when another field has a specific value, show or hide fields dynamically as the user fills out a form, and validate entries in the browser before the record is submitted.",
  },
  {
    icon: Code2,
    title: "Create related records automatically",
    description:
      "Create a vendor bill automatically when a purchase order is approved above a threshold, generate a project task when a sales order is placed, or create a follow-up record when another record reaches a specific status.",
  },
  {
    icon: Code2,
    title: "External integrations and batch processes",
    description:
      "Call a third-party API when a record changes, pull data from an external system on a schedule, or process large volumes of records in a Map-Reduce script at period end. All require SuiteScript.",
  },
];

const FAQ = [
  {
    question: "What is the difference between configuration and customization in NetSuite?",
    answer:
      "Configuration means making changes through the NetSuite interface without writing code: custom fields, custom forms, SuiteFlow workflows, saved searches, roles, and email templates. Customization means writing SuiteScript code to add logic that the platform cannot handle natively, such as firing logic automatically on record save, updating related records, calling external systems, or building custom pages. Configuration is upgrade-safe; customization requires testing after each NetSuite release.",
  },
  {
    question: "When do I need a developer for NetSuite changes?",
    answer:
      "You need a developer when the requirement cannot be satisfied through the NetSuite interface. The most common triggers: logic that must run automatically when a record is saved, fields that must be required only under certain conditions (beyond what standard forms support), automatic creation of related records, calls to external systems, and batch processing of large record sets. If the requirement is adding a field, building a report, or setting up an approval flow, that is configuration.",
  },
  {
    question: "Are NetSuite customizations (SuiteScript) upgrade-safe?",
    answer:
      "SuiteScript customizations are supported across releases but are not automatically safe. NetSuite tests that your scripts run in their environment, but API behavior changes and new validation rules introduced in a release can break scripts that worked before. Every SuiteScript should be tested in Sandbox before each major NetSuite release (February and August releases). Configuration changes, because they do not modify platform code, are not affected by releases in the same way.",
  },
  {
    question: "Can configuration handle conditional logic, such as making a field required only sometimes?",
    answer:
      "Standard NetSuite configuration supports conditional mandatory fields in limited cases. For complex conditional required fields, such as requiring a field only when another field has a specific value, or requiring different fields depending on the transaction type, a Client script provides more reliable enforcement. The standard form editor has conditional field display but the behavior can be bypassed on certain workflows.",
  },
  {
    question: "How much does NetSuite customization cost compared to configuration?",
    answer:
      "Configuration is included in your NetSuite subscription and can be done by an administrator. Customization (SuiteScript) requires developer time, which is billed separately. SuitePacific offers ongoing NetSuite development starting at $799 per month, which covers both configuration work and SuiteScript builds as needed, with no separate charge per script.",
  },
  {
    question: "Can I move a customization back to configuration?",
    answer:
      "Sometimes. If a later NetSuite release adds native support for something that previously required a script (for example, a new standard field or workflow capability), the script can often be removed and replaced with native configuration. This reduces technical debt and release risk. SuitePacific reviews existing scripts during onboarding to identify any that can be replaced with configuration.",
  },
];

export const metadata: Metadata = {
  title: "NetSuite Configuration vs. Customization: When to Script",
  description:
    "Configuration covers no-code NetSuite changes. Customization means SuiteScript. This guide helps live NetSuite accounts decide when a developer is needed.",
  alternates: { canonical: "/netsuite-configuration-vs-customization" },
  openGraph: {
    title: "NetSuite Configuration vs. Customization: When to Script",
    description:
      "Configuration covers no-code NetSuite changes. Customization means SuiteScript. This guide helps live NetSuite accounts decide when a developer is needed.",
    url: `${SITE_URL}/netsuite-configuration-vs-customization`,
    type: "website",
    images: [{ url: `${SITE_URL}/og-default.png`, width: 1200, height: 630 }],
  },
};

export default function ConfigurationVsCustomizationPage() {
  return (
    <main className="pt-32 pb-24 sm:pt-40 sm:pb-32">
      <BreadcrumbJsonLd
        items={[
          { name: "Home", url: SITE_URL },
          { name: "NetSuite Configuration vs. Customization", url: `${SITE_URL}/netsuite-configuration-vs-customization` },
        ]}
      />
      <FaqJsonLd items={FAQ} />
      <ServiceJsonLd
        name="NetSuite Configuration and Customization Development"
        description="No-code configuration and SuiteScript customization for live NetSuite accounts: custom fields, workflows, User Event scripts, Client scripts, and integrations."
        url={`${SITE_URL}/netsuite-configuration-vs-customization`}
        serviceType="NetSuite Development"
        offers={[
          { name: "Care", price: 799, description: "10 hrs/month: configuration changes, SuiteScript builds, and release testing. Month-to-month after 3-month minimum." },
          { name: "Care Plus", price: 1499, description: "20 hrs/month: configuration, custom scripting, integrations, and ongoing administration. Month-to-month." },
          { name: "Care Pro", price: 2499, description: "35 hrs/month: full development support including configuration, SuiteScript, and integrations. Month-to-month." },
        ]}
      />
      <OrganizationJsonLd />

      <div className="mx-auto max-w-3xl px-6 lg:px-8">
        <SectionHeading
          as="h1"
          eyebrow="NetSuite Development"
          title="NetSuite Configuration vs. Customization: When Do You Need a Developer?"
          subtitle="Configuration covers no-code changes made through the NetSuite interface. Customization means SuiteScript code. Here is how to tell which your requirement needs."
          align="left"
        />

        <div className="mt-6 rounded-2xl border border-brand-100 bg-white p-5 shadow-soft">
          <p className="text-sm text-brand-600 mb-3">Not sure if your requirement needs a developer or is configurable? Describe what your account needs to do.</p>
          <LeadFormLight />
        </div>
        <p className="mt-3 text-xs text-brand-400">NetSuite-Certified · Post-go-live specialist · Sandbox-first development · Month-to-month</p>
        <p className="mt-2 text-xs text-brand-300"><time dateTime="2026-10">Published October 2026</time></p>

        <div className="mt-6 rounded-2xl border border-brand-100 bg-brand-50/40 p-5">
          <p className="text-xs font-semibold uppercase tracking-wide text-accent mb-2">Quick answer</p>
          <p className="text-sm text-brand-700 leading-relaxed">
            Configuration and customization refer to two distinct tiers of NetSuite changes. Configuration covers no-code changes
            made through the NetSuite interface: custom fields, custom forms, SuiteFlow workflows, saved searches, roles and permissions,
            email templates, and translation. These changes are upgrade-safe because they do not modify platform code, and they can be
            maintained by an administrator without development skills. Customization refers to SuiteScript code: User Event scripts,
            Client scripts, Scheduled scripts, Suitelets, and custom records with scripted logic. Customization requires a developer,
            must be tested in a Sandbox environment before deploying to production, and needs review each time NetSuite releases a major
            update. The dividing line is whether the requirement can be satisfied through NetSuite&apos;s built-in UI or whether it requires
            code that runs automatically. Field-level logic that fires on record save, automatic creation of related records, enforcement
            of conditional required fields, and calls to external systems all require SuiteScript. Everything else is typically
            configurable without code.
          </p>
        </div>

        {/* Comparison table */}
        <div className="mt-14">
          <h2 className="text-lg font-semibold text-brand-900 mb-2">Configuration vs. customization: what each covers</h2>
          <p className="text-sm text-brand-400 mb-5">
            The table below maps common NetSuite requirements to their appropriate approach. When in doubt, start with configuration;
            only move to SuiteScript when the requirement cannot be satisfied without code.
          </p>
          <div className="overflow-x-auto rounded-2xl border border-brand-100">
            <table className="w-full text-sm min-w-[520px]">
              <thead>
                <tr className="border-b border-brand-100 bg-brand-50/50">
                  <th className="text-left p-4 font-semibold text-brand-900">Requirement</th>
                  <th className="text-left p-4 font-semibold text-brand-900">Configuration</th>
                  <th className="text-left p-4 font-semibold text-brand-900">Customization</th>
                </tr>
              </thead>
              <tbody>
                {COMPARISON_ROWS.map((row, i) => (
                  <tr key={row.feature} className={i < COMPARISON_ROWS.length - 1 ? "border-b border-brand-100" : ""}>
                    <td className="p-4 font-medium text-brand-700 align-top">{row.feature}</td>
                    <td className="p-4 text-brand-400 align-top text-[13px]">{row.configuration}</td>
                    <td className="p-4 text-brand-400 align-top text-[13px]">{row.customization}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* When configuration is right */}
        <div className="mt-14">
          <h2 className="text-lg font-semibold text-brand-900 mb-2">What can you do with configuration alone?</h2>
          <p className="text-sm text-brand-400 mb-6">
            Most day-to-day NetSuite account work is configuration. These changes require no developer, carry low upgrade risk,
            and can be maintained by an administrator.
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            {CONFIG_EXAMPLES.map((item) => (
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

        {/* When customization is needed */}
        <div className="mt-14">
          <h2 className="text-lg font-semibold text-brand-900 mb-2">When does a requirement need SuiteScript customization?</h2>
          <p className="text-sm text-brand-400 mb-6">
            Customization is required when the requirement cannot be satisfied through NetSuite&apos;s interface. These are the most
            common scenarios where configuration runs out and SuiteScript becomes necessary.
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            {CUSTOM_EXAMPLES.map((item) => (
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

        {/* Upgrade risk section */}
        <div className="mt-14 rounded-2xl border border-brand-100 bg-brand-50/30 p-5 sm:p-6">
          <h2 className="text-base font-semibold text-brand-900 mb-3">Why upgrade risk matters for customization decisions</h2>
          <p className="text-sm text-brand-400 mb-3">
            NetSuite releases major updates twice a year (February and August). Configuration changes are not affected by releases
            in the same way SuiteScript is, because they do not modify platform code. Scripts must be tested in Sandbox before
            each release window.
          </p>
          <ul className="space-y-2 text-sm text-brand-400">
            <li className="flex items-start gap-2"><XCircle className="w-4 h-4 text-red-400 mt-0.5 shrink-0" /> A Before Submit User Event script that breaks will prevent all users from saving that record type</li>
            <li className="flex items-start gap-2"><XCircle className="w-4 h-4 text-red-400 mt-0.5 shrink-0" /> API changes in a release can cause scripts that passed original testing to fail silently</li>
            <li className="flex items-start gap-2"><CheckCircle2 className="w-4 h-4 text-green-500 mt-0.5 shrink-0" /> SuiteFlow workflows and configuration changes have no code to break on a release</li>
            <li className="flex items-start gap-2"><CheckCircle2 className="w-4 h-4 text-green-500 mt-0.5 shrink-0" /> The testing window is January (before February release) and July (before August release)</li>
          </ul>
        </div>

        {/* Related reading */}
        <div className="mt-10 rounded-2xl border border-brand-100 bg-brand-50/30 p-5 sm:p-6">
          <p className="text-sm font-semibold text-brand-900 mb-3">Related reading</p>
          <ul className="space-y-2.5">
            <li className="text-sm text-brand-400">
              <Link href="/netsuite-suiteflow-vs-suitescript" className="text-accent hover:underline">
                SuiteFlow vs. SuiteScript
              </Link>{" "}
              covers the specific choice between NetSuite&apos;s workflow engine and its scripting platform.
            </li>
            <li className="text-sm text-brand-400">
              <Link href="/netsuite-suitescript-development" className="text-accent hover:underline">
                NetSuite SuiteScript development
              </Link>{" "}
              covers the full scope of what SuiteScript customization can do for live accounts.
            </li>
            <li className="text-sm text-brand-400">
              <Link href="/netsuite-workflow-automation" className="text-accent hover:underline">
                NetSuite workflow automation
              </Link>{" "}
              covers the configuration-level approach to approval routing and notifications.
            </li>
          </ul>
        </div>

        <div className="mt-10 rounded-2xl border border-brand-100 bg-white p-5 shadow-soft">
          <p className="text-sm font-semibold text-brand-900 mb-1">Not sure whether your requirement is configuration or customization?</p>
          <p className="text-sm text-brand-400 mb-4">
            Tell us what your account needs to do and we will assess whether it is a configuration change or a SuiteScript build, and what the scope looks like.
          </p>
          <LeadFormLight />
        </div>

        <ServiceFaqSection items={FAQ} />

        <div className="mt-10 rounded-2xl border border-brand-100 bg-white p-5 shadow-soft">
          <p className="text-sm font-semibold text-brand-900 mb-1">Ready to get your NetSuite account built out correctly?</p>
          <p className="text-sm text-brand-400 mb-4">
            Describe the requirement. We will tell you whether it needs configuration or SuiteScript, and give you a realistic scope.
          </p>
          <LeadFormLight />
        </div>
      </div>
    </main>
  );
}

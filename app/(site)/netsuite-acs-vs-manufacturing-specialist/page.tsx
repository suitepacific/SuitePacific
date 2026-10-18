import type { Metadata } from "next";
import Link from "next/link";
import { CheckCircle2, XCircle } from "lucide-react";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { BreadcrumbJsonLd, FaqJsonLd, ServiceJsonLd, OrganizationJsonLd } from "@/components/seo/JsonLd";
import { ServiceFaqSection } from "@/components/ui/ServiceFaqSection";
import { LeadFormLight } from "@/components/sections/LeadFormLight";
import { SITE_URL } from "@/lib/content";

const COMPARISON_ROWS = [
  { factor: "Monthly cost", acs: "Approximate range: $2,500 to $10,000+ (varies by tier)", sp: "$799 to $2,499 per month" },
  { factor: "SuiteScript development", acs: "No (advisory only)", sp: "Yes (active development included)" },
  { factor: "Manufacturing domain knowledge", acs: "General NetSuite platform", sp: "Work orders, BOMs, lot tracking, costing" },
  { factor: "BOM customization", acs: "Not provided", sp: "Yes (component logic, substitution scripts)" },
  { factor: "Work order automation", acs: "Not provided", sp: "Yes (component deduction, lot assignment, variance)" },
  { factor: "Lot enforcement scripts", acs: "Not provided", sp: "Yes (User Event scripts for lot traceability)" },
  { factor: "Access model", acs: "Named support representative, ticket-based", sp: "Direct access to developer doing the work" },
  { factor: "Contract terms", acs: "Annual contract (typical)", sp: "Month-to-month after 3-month minimum" },
  { factor: "Oracle-direct relationship", acs: "Yes", sp: "No (independent NetSuite consulting firm)" },
];

const ACS_PROVIDES = [
  {
    icon: CheckCircle2,
    title: "Platform guidance and best practices advisory",
    description:
      "ACS provides guidance on how to use NetSuite features within the account, configuration best practices, and recommendations for standard module usage.",
  },
  {
    icon: CheckCircle2,
    title: "Upgrade preparation and release readiness",
    description:
      "ACS assists with preparing for NetSuite major releases: reviewing change logs, identifying areas of potential impact, and advising on upgrade timing.",
  },
  {
    icon: CheckCircle2,
    title: "Named support representative",
    description:
      "ACS subscribers have a named technical account manager as a consistent point of contact within Oracle NetSuite.",
  },
  {
    icon: CheckCircle2,
    title: "Proactive account monitoring",
    description:
      "At higher ACS tiers, proactive monitoring flags potential issues in the account before they become support escalations.",
  },
];

const ACS_DOES_NOT_PROVIDE = [
  {
    icon: XCircle,
    title: "Active SuiteScript development",
    description:
      "ACS does not write SuiteScript code for the account. Work order automation scripts, BOM validation logic, lot enforcement scripts, and production variance reporting via SuiteQL are outside the ACS service scope.",
  },
  {
    icon: XCircle,
    title: "Manufacturing-specific workflow builds",
    description:
      "Building a SuiteFlow approval workflow for work order release, a component shortage alert, or a production dashboard is not an ACS deliverable. These require a consultant who builds NetSuite customizations.",
  },
  {
    icon: XCircle,
    title: "BOM and work order customization",
    description:
      "Custom BOM validation scripts, multi-level BOM logic, work order completion automation, and assembly build scripts are development work. ACS provides advisory; it does not deploy customizations.",
  },
  {
    icon: XCircle,
    title: "Production variance and reporting builds",
    description:
      "Custom saved searches, SuiteQL queries, and Suitelet-based production reports are not ACS deliverables. ACS may advise on native report options, but the custom build work is outside scope.",
  },
];

const FAQ = [
  {
    question: "What is NetSuite ACS?",
    answer:
      "ACS (Advanced Customer Support) is Oracle NetSuite's internal premium support service. It provides platform guidance, best practices advisory, upgrade preparation assistance, a named technical account manager, and proactive monitoring at higher tiers. ACS is subscription-based with tiered pricing. It does not include SuiteScript development, workflow builds, or manufacturing-specific customization work.",
  },
  {
    question: "What does NetSuite ACS not cover for manufacturing companies?",
    answer:
      "ACS does not write SuiteScript code. This means work order automation scripts (component deduction, finished goods posting, lot assignment), BOM validation logic, production variance reporting via SuiteQL, lot enforcement scripts, custom approval workflows for work orders, and any production-specific customization are outside ACS scope. ACS provides advisory on how to use the platform; the actual development work requires a consulting engagement.",
  },
  {
    question: "Should a manufacturing company use ACS instead of a specialist?",
    answer:
      "ACS and a manufacturing specialist serve different needs. ACS is well-suited for large enterprise accounts that need Oracle-direct platform guidance, named support representation, and upgrade management. A manufacturing specialist is the right choice when the account needs active SuiteScript development for work order automation, BOM logic, lot tracking enforcement, or production reporting. Most mid-market manufacturing companies on NetSuite need the development work, not the advisory layer.",
  },
  {
    question: "Can a manufacturing company use both ACS and a specialist?",
    answer:
      "Yes. ACS and an independent manufacturing specialist are not mutually exclusive. Some large manufacturing accounts use ACS for platform advisory and upgrade preparation while engaging a specialist for ongoing SuiteScript development and manufacturing-specific customization. The specialist handles the builds; ACS handles the Oracle-direct relationship and platform guidance. This combination makes sense for enterprise accounts with budget for both.",
  },
  {
    question: "How does a manufacturing specialist differ from ACS?",
    answer:
      "A manufacturing specialist actively builds and maintains SuiteScript customizations, approval workflows, saved searches, and dashboards inside the NetSuite account. ACS advises on platform features and best practices but does not build custom code. A manufacturing specialist also brings domain knowledge in work order processes, BOM structures, lot traceability, and production costing that is specific to manufacturing operations, not just the NetSuite platform in general.",
  },
  {
    question: "Who provides NetSuite manufacturing specialist support?",
    answer:
      "SuitePacific provides dedicated NetSuite support for manufacturing companies, including SuiteScript development for work order automation, BOM validation, lot enforcement, and production variance reporting; SuiteFlow approval workflows; and production dashboards and saved searches. SuitePacific is Oracle NetSuite Certified (SuiteCloud Developer II and Administrator Professional) and works on a month-to-month basis after a three-month minimum, starting at $799 per month.",
  },
];

export const metadata: Metadata = {
  title: "NetSuite ACS vs. Manufacturing Specialist Services",
  description:
    "NetSuite ACS provides platform advisory and upgrade support. A manufacturing specialist delivers SuiteScript builds, work order automation, and BOM logic.",
  alternates: { canonical: "/netsuite-acs-vs-manufacturing-specialist" },
  openGraph: {
    title: "NetSuite ACS vs. Manufacturing Specialist Support",
    description:
      "NetSuite ACS provides platform advisory, named support, and upgrade preparation. A manufacturing specialist delivers active SuiteScript development, work order automation, BOM customization, and lot enforcement.",
    url: `${SITE_URL}/netsuite-acs-vs-manufacturing-specialist`,
    type: "website",
    images: [{ url: `${SITE_URL}/og-default.png`, width: 1200, height: 630 }],
  },
};

export default function AcsVsManufacturingSpecialistPage() {
  return (
    <main className="pt-32 pb-24 sm:pt-40 sm:pb-32">
      <BreadcrumbJsonLd
        items={[
          { name: "Home", url: SITE_URL },
          { name: "ACS vs. Manufacturing Specialist", url: `${SITE_URL}/netsuite-acs-vs-manufacturing-specialist` },
        ]}
      />
      <FaqJsonLd items={FAQ} />
      <ServiceJsonLd
        name="NetSuite ACS vs. Manufacturing Specialist Support"
        description="Manufacturing-specialist NetSuite support for companies needing active SuiteScript development, work order automation, BOM logic, and lot enforcement, compared to Oracle ACS advisory."
        url={`${SITE_URL}/netsuite-acs-vs-manufacturing-specialist`}
        serviceType="NetSuite Manufacturing Specialist Support"
        offers={[
          { name: "Care", price: 799, description: "10 hours/month: work order automation, BOM scripts, production reporting, and manufacturing SuiteScript development. Month-to-month after 3-month minimum." },
          { name: "Care Plus", price: 1499, description: "20 hours/month: active manufacturing development including work orders, BOM, lot tracking, and production dashboards. Month-to-month." },
          { name: "Care Pro", price: 2499, description: "35 hours/month: full manufacturing NetSuite support including development, workflows, reporting, and account optimization. Month-to-month." },
        ]}
      />
      <OrganizationJsonLd />

      <div className="mx-auto max-w-3xl px-6 lg:px-8">
        <SectionHeading
          as="h1"
          eyebrow="NetSuite Support"
          title="NetSuite ACS vs. Manufacturing-Specialist Consulting: What Live Accounts Actually Get"
          subtitle="How Oracle&apos;s ACS service compares to a dedicated NetSuite manufacturing specialist, and which is the right fit for your account."
          align="left"
        />

        <div className="mt-6 rounded-2xl border border-brand-100 bg-white p-5 shadow-soft">
          <p className="text-sm text-brand-600 mb-3">
            Manufacturing company evaluating NetSuite support options? Tell us what your account currently needs to
            operate and develop.
          </p>
          <LeadFormLight />
        </div>
        <p className="mt-3 text-xs text-brand-400">NetSuite-certified · Manufacturing specialist · Month-to-month</p>
        <p className="mt-2 text-xs text-brand-300">Published October 2026</p>

        <div className="mt-6 rounded-2xl border border-brand-100 bg-brand-50/40 p-5">
          <p className="text-xs font-semibold uppercase tracking-wide text-accent mb-2">Quick answer</p>
          <p className="text-sm text-brand-700 leading-relaxed">
            NetSuite ACS (Advanced Customer Support) refers to Oracle&apos;s internal premium support subscription,
            which provides platform guidance, best practices advisory, a named technical account manager, upgrade
            preparation, and proactive monitoring at higher tiers. ACS does not include SuiteScript development,
            custom workflow builds, or manufacturing-specific customization work. A manufacturing specialist provides
            active development: work order automation scripts (component deduction, finished goods posting, lot
            assignment, variance calculation), BOM validation logic, lot enforcement scripts, production variance
            reporting via SuiteQL, and approval workflows for work orders and purchase orders. For most mid-market
            manufacturing companies on NetSuite, the active development work is what the account needs. ACS makes
            sense for large enterprise accounts that need the Oracle-direct relationship and platform advisory layer
            in addition to development support. The two are not mutually exclusive. SuitePacific starts at $799 per
            month on month-to-month terms after a three-month minimum.
          </p>
        </div>

        <div className="mt-14">
          <h2 className="text-lg font-semibold text-brand-900 mb-4">What does NetSuite ACS provide?</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            {ACS_PROVIDES.map((item) => (
              <div key={item.title} className="rounded-2xl border border-brand-100 p-5 flex flex-col gap-3">
                <item.icon className="h-5 w-5 text-green-500 shrink-0" />
                <h3 className="font-semibold text-brand-900 text-sm">{item.title}</h3>
                <p className="text-sm text-brand-400">{item.description}</p>
              </div>
            ))}
          </div>
          <p className="mt-4 text-sm text-brand-400">
            ACS pricing varies by tier (Basic, Premium, Enterprise) and account size. Approximate ranges are $2,500
            to $10,000+ per month depending on the tier. Current pricing requires a conversation with an Oracle
            NetSuite sales representative.
          </p>
        </div>

        <div className="mt-14">
          <h2 className="text-lg font-semibold text-brand-900 mb-4">
            What does ACS not provide for manufacturing accounts?
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            {ACS_DOES_NOT_PROVIDE.map((item) => (
              <div key={item.title} className="rounded-2xl border border-brand-100 p-5 flex flex-col gap-3">
                <item.icon className="h-5 w-5 text-red-400 shrink-0" />
                <h3 className="font-semibold text-brand-900 text-sm">{item.title}</h3>
                <p className="text-sm text-brand-400">{item.description}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-14">
          <h2 className="text-lg font-semibold text-brand-900 mb-3">
            What does a manufacturing specialist provide?
          </h2>
          <p className="text-sm text-brand-400 mb-4">
            A manufacturing specialist actively builds and maintains the SuiteScript customizations, workflows, and
            reporting that manufacturing accounts need to operate accurately:
          </p>
          <ul className="space-y-2.5 text-sm text-brand-400">
            <li className="flex items-start gap-2">
              <span className="text-accent font-bold mt-0.5">→</span>
              Work order completion scripts: component deduction, finished goods posting, lot assignment, variance calculation
            </li>
            <li className="flex items-start gap-2">
              <span className="text-accent font-bold mt-0.5">→</span>
              BOM validation scripts: component availability checks, substitution logic, cost rollup accuracy
            </li>
            <li className="flex items-start gap-2">
              <span className="text-accent font-bold mt-0.5">→</span>
              Lot enforcement scripts: require lot number entry on item receipts, transfers, and work order outputs
            </li>
            <li className="flex items-start gap-2">
              <span className="text-accent font-bold mt-0.5">→</span>
              Production variance reporting via SuiteQL: planned vs. actual cost per work order
            </li>
            <li className="flex items-start gap-2">
              <span className="text-accent font-bold mt-0.5">→</span>
              Component shortage alerts: scheduled scripts that flag insufficient stock before work orders are due for release
            </li>
            <li className="flex items-start gap-2">
              <span className="text-accent font-bold mt-0.5">→</span>
              Approval workflows for work orders and purchase orders: SuiteFlow multi-level routing with notifications
            </li>
            <li className="flex items-start gap-2">
              <span className="text-accent font-bold mt-0.5">→</span>
              Manufacturing KPI dashboards: open WOs by work center and status, WIP value, schedule adherence
            </li>
          </ul>
        </div>

        <div className="mt-14">
          <h2 className="text-lg font-semibold text-brand-900 mb-3">ACS vs. manufacturing specialist: factor comparison</h2>
          <div className="overflow-x-auto rounded-2xl border border-brand-100">
            <table className="w-full text-sm min-w-[520px]">
              <thead>
                <tr className="border-b border-brand-100 bg-brand-50/50">
                  <th className="text-left p-4 font-semibold text-brand-900">Factor</th>
                  <th className="text-left p-4 font-semibold text-brand-900">NetSuite ACS</th>
                  <th className="text-left p-4 font-semibold text-brand-900">SuitePacific</th>
                </tr>
              </thead>
              <tbody>
                {COMPARISON_ROWS.map((row, i) => (
                  <tr key={row.factor} className={i < COMPARISON_ROWS.length - 1 ? "border-b border-brand-100" : ""}>
                    <td className="p-4 font-medium text-brand-700 align-top">{row.factor}</td>
                    <td className="p-4 text-brand-400 align-top text-[13px]">{row.acs}</td>
                    <td className="p-4 text-brand-700 align-top text-[13px]">{row.sp}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        <div className="mt-14">
          <h2 className="text-lg font-semibold text-brand-900 mb-3">
            When does ACS make sense for a manufacturing company?
          </h2>
          <p className="text-sm text-brand-400">
            ACS is a strong fit for large enterprise manufacturing accounts that need the Oracle-direct relationship
            for platform risk management, upgrade governance, and compliance advisory. If the account has a dedicated
            internal IT team or NetSuite administrator handling day-to-day customization, and the primary gap is
            platform oversight and named Oracle support, ACS fills that role. For development-heavy needs, ACS
            is typically paired with an external consulting engagement rather than replacing it.
          </p>
        </div>

        <div className="mt-14">
          <h2 className="text-lg font-semibold text-brand-900 mb-3">
            When does a manufacturing specialist make sense instead of ACS?
          </h2>
          <p className="text-sm text-brand-400">
            A manufacturing specialist is the right choice when the account needs active development work: automating
            work order completion, building BOM validation logic, enforcing lot traceability, producing production
            variance reports, or building approval workflows for manufacturing transactions. Mid-market manufacturers
            typically need these builds, not platform advisory. A specialist also has direct domain knowledge of
            manufacturing processes (costing methods, WO flows, lot structures, BOM hierarchies) that a general
            platform advisory service does not provide.
          </p>
        </div>

        <div className="mt-14 rounded-2xl border border-brand-100 bg-brand-50/30 p-5 sm:p-6">
          <p className="text-sm font-semibold text-brand-900 mb-3">Related reading</p>
          <ul className="space-y-2.5">
            <li className="text-sm text-brand-400">
              <Link href="/do-i-need-netsuite-acs" className="text-accent hover:underline">
                Do I need NetSuite ACS?
              </Link>{" "}
              covers who ACS is designed for and when it adds value vs. when it does not.
            </li>
            <li className="text-sm text-brand-400">
              <Link href="/netsuite-care" className="text-accent hover:underline">
                NetSuite Care plans
              </Link>{" "}
              covers SuitePacific&apos;s manufacturing support retainer options and what each tier includes.
            </li>
            <li className="text-sm text-brand-400">
              <Link href="/industries/manufacturing" className="text-accent hover:underline">
                NetSuite support for manufacturing companies
              </Link>{" "}
              covers the full scope of manufacturing-specific NetSuite support and development.
            </li>
            <li className="text-sm text-brand-400">
              <Link href="/netsuite-post-go-live-support" className="text-accent hover:underline">
                NetSuite post-go-live support
              </Link>{" "}
              covers what ongoing NetSuite support looks like for live accounts.
            </li>
          </ul>
        </div>

        <div className="mt-10 rounded-2xl border border-brand-100 bg-white p-5 shadow-soft">
          <p className="text-sm font-semibold text-brand-900 mb-1">Evaluating your NetSuite support options?</p>
          <p className="text-sm text-brand-400 mb-4">
            Tell us what your manufacturing account currently needs: active development, platform advisory, or both.
            We will give a direct assessment of the right fit.
          </p>
          <LeadFormLight />
        </div>

        <ServiceFaqSection items={FAQ} />

        <div className="mt-10 rounded-2xl border border-brand-100 bg-white p-5 shadow-soft">
          <p className="text-sm font-semibold text-brand-900 mb-1">Need manufacturing specialist support for your NetSuite account?</p>
          <p className="text-sm text-brand-400 mb-4">
            Tell us about your manufacturing account and what it currently needs. We will scope the right engagement.
          </p>
          <LeadFormLight />
        </div>
      </div>
    </main>
  );
}

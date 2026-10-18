import type { Metadata } from "next";
import Link from "next/link";
import { CheckCircle2, XCircle, Shield, AlertTriangle } from "lucide-react";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Card } from "@/components/ui/Card";
import { IconBadge } from "@/components/ui/IconBadge";
import { BreadcrumbJsonLd, FaqJsonLd, ServiceJsonLd, OrganizationJsonLd } from "@/components/seo/JsonLd";
import { ServiceFaqSection } from "@/components/ui/ServiceFaqSection";
import { LeadFormLight } from "@/components/sections/LeadFormLight";
import { SITE_URL } from "@/lib/content";

const COMPARISON_ROWS = [
  { factor: "Data", sandbox: "Copy of production (refreshed periodically)", production: "Live data, real transactions" },
  { factor: "Impact of errors", sandbox: "None; isolated from real records", production: "Immediate, affects real users" },
  { factor: "Script deployment risk", sandbox: "Low; test freely", production: "High; broken scripts cause outages" },
  { factor: "Release preview", sandbox: "Yes (receives release before production)", production: "Gets release after Sandbox preview" },
  { factor: "SuiteCloud governance", sandbox: "Enforced; surfaces limit violations early", production: "Enforced; violations halt scripts in real time" },
  { factor: "User impact", sandbox: "None", production: "All active users affected" },
  { factor: "Cost", sandbox: "Included in most NetSuite accounts", production: "Live environment (no extra cost)" },
  { factor: "Use for", sandbox: "Testing, release validation, new development", production: "Live business operations only" },
];

const WHAT_TO_TEST = [
  {
    icon: CheckCircle2,
    title: "Every SuiteScript before first deployment",
    description:
      "No SuiteScript should go to production without first running in Sandbox. User Event scripts can prevent record saves if they break. Client scripts can block form submissions. Sandbox testing catches these issues before real users are affected.",
  },
  {
    icon: CheckCircle2,
    title: "All existing scripts before each NetSuite release",
    description:
      "Sandbox receives each major release before production. The testing window is January (before the February release) and July (before the August release). Any script that uses an API that changed in the release must be updated before production is upgraded.",
  },
  {
    icon: CheckCircle2,
    title: "New SuiteFlow workflows",
    description:
      "Workflow behavior can change between releases. Complex workflows with conditional branches, field updates, and email triggers should be tested in Sandbox against realistic records before going live in production.",
  },
  {
    icon: CheckCircle2,
    title: "Configuration changes that affect existing records",
    description:
      "Saved search changes, custom form updates, and field modifications that affect records in bulk should be validated in Sandbox first. A saved search that produces incorrect results in production affects every user who sees it.",
  },
  {
    icon: CheckCircle2,
    title: "Integration scripts that post transactions",
    description:
      "Any script that creates or modifies transactions (invoices, bills, purchase orders) must be tested in Sandbox where duplicate or erroneous records have no financial impact. Testing integration scripts in production creates real transactions.",
  },
];

const PRODUCTION_RISKS = [
  {
    icon: AlertTriangle,
    title: "Before Submit script breaks: full outage for that record type",
    description:
      "If a User Event script that fires Before Submit throws an error, NetSuite will prevent ALL users from saving that record type until the script is fixed and redeployed. This is not a degraded experience; it is a complete block.",
  },
  {
    icon: AlertTriangle,
    title: "Silent API changes after a release",
    description:
      "NetSuite releases can change the behavior of SuiteScript API calls without removing the API entirely. A script that runs without error may return different values or skip records after a release, corrupting data silently before anyone notices.",
  },
  {
    icon: AlertTriangle,
    title: "SuiteCloud governance limit violations",
    description:
      "NetSuite enforces governance (CPU time, record access) limits on all scripts in production. A script that passes light testing may hit limits when run against real production data volumes, causing it to fail or be terminated mid-execution.",
  },
  {
    icon: AlertTriangle,
    title: "Integration scripts creating real transactions",
    description:
      "Testing an integration script in production creates real records: duplicate vendor bills, test invoices, phantom purchase orders. Reversing these requires manual cleanup and can affect financial reports and audit trails.",
  },
];

const FAQ = [
  {
    question: "When is the NetSuite Sandbox refreshed?",
    answer:
      "Oracle refreshes the Sandbox environment approximately twice a year, typically aligned with major release windows. Account administrators can also request an on-demand Sandbox refresh from NetSuite support, which overwrites the Sandbox with a current copy of production data. An on-demand refresh is useful when the Sandbox has drifted far from production and testing needs to reflect current data structures.",
  },
  {
    question: "What can Sandbox not test that production can?",
    answer:
      "Sandbox cannot test real user load under production-scale concurrency. It also cannot fully replicate some real-time external integrations that depend on production endpoints. For performance testing under realistic load, additional approaches are needed. That said, Sandbox catches the vast majority of script errors, release breakages, and governance limit violations before they affect production.",
  },
  {
    question: "Does every NetSuite account include a Sandbox?",
    answer:
      "Most NetSuite subscriptions include a Sandbox environment. However, the number of Sandbox accounts and whether they are included or licensed separately depends on the subscription tier and the original implementation contract. Accounts that do not have a Sandbox can request one from their NetSuite account manager. Development on a live production account without any Sandbox is a high-risk configuration.",
  },
  {
    question: "What is the release testing window for NetSuite?",
    answer:
      "NetSuite typically releases the Sandbox preview in January for the February release and in July for the August release. This gives accounts a window of several weeks to test their scripts and customizations against the new release before it reaches production. SuitePacific includes Sandbox release testing as part of ongoing support retainers.",
  },
  {
    question: "Can I deploy a script directly to production without Sandbox testing?",
    answer:
      "NetSuite does not technically prevent direct production deployment without Sandbox testing. However, deploying untested scripts to production is the primary cause of NetSuite outages for live accounts. A broken Before Submit script blocks all users from saving the affected record type immediately upon deployment. There is no safe way to test a script for the first time in production.",
  },
  {
    question: "What is SuiteCloud governance and why does it matter for testing?",
    answer:
      "SuiteCloud governance is NetSuite&apos;s system for limiting the resources (CPU time, record access units) any script can consume in a single execution. Governance limits prevent any one script from degrading platform performance for all users. A script that passes light testing may exceed governance limits when run against production data volumes. Sandbox testing with realistic data identifies governance violations before they interrupt production operations.",
  },
];

export const metadata: Metadata = {
  title: "NetSuite Sandbox vs. Production Testing: Why Test First",
  description:
    "Sandbox testing prevents production outages in NetSuite. This guide covers what to test, when to test, and the release testing window for live accounts.",
  alternates: { canonical: "/netsuite-sandbox-vs-production-testing" },
  openGraph: {
    title: "NetSuite Sandbox vs. Production Testing: Why Test First",
    description:
      "Sandbox testing prevents production outages in NetSuite. This guide covers what to test, when to test, and the release testing window for live accounts.",
    url: `${SITE_URL}/netsuite-sandbox-vs-production-testing`,
    type: "website",
    images: [{ url: `${SITE_URL}/og-default.png`, width: 1200, height: 630 }],
  },
};

export default function SandboxVsProductionPage() {
  return (
    <main className="pt-32 pb-24 sm:pt-40 sm:pb-32">
      <BreadcrumbJsonLd
        items={[
          { name: "Home", url: SITE_URL },
          { name: "NetSuite Sandbox vs. Production Testing", url: `${SITE_URL}/netsuite-sandbox-vs-production-testing` },
        ]}
      />
      <FaqJsonLd items={FAQ} />
      <ServiceJsonLd
        name="NetSuite Sandbox-First Development and Release Testing"
        description="Sandbox-first SuiteScript development and release testing for live NetSuite accounts: script validation, governance limit testing, and pre-release review before each NetSuite update."
        url={`${SITE_URL}/netsuite-sandbox-vs-production-testing`}
        serviceType="NetSuite Development Practice"
        offers={[
          { name: "Care", price: 799, description: "10 hrs/month: Sandbox-first development, release testing, and ongoing script maintenance. Month-to-month after 3-month minimum." },
          { name: "Care Plus", price: 1499, description: "20 hrs/month: full development plus release testing and administration. Month-to-month." },
          { name: "Care Pro", price: 2499, description: "35 hrs/month: development, release testing, integrations, and ongoing support. Month-to-month." },
        ]}
      />
      <OrganizationJsonLd />

      <div className="mx-auto max-w-3xl px-6 lg:px-8">
        <SectionHeading
          as="h1"
          eyebrow="NetSuite Development Practice"
          title="NetSuite Sandbox vs. Production Testing: What to Test and Why It Matters"
          subtitle="Sandbox testing is not optional for live NetSuite accounts with SuiteScript. This guide covers what must be tested, when to test it, and what happens when release testing gets skipped."
          align="left"
        />

        <div className="mt-6 rounded-2xl border border-brand-100 bg-white p-5 shadow-soft">
          <p className="text-sm text-brand-600 mb-3">Running SuiteScript development without a Sandbox-first process? Tell us about your account.</p>
          <LeadFormLight />
        </div>
        <p className="mt-3 text-xs text-brand-400">NetSuite-Certified · Post-go-live specialist · Sandbox-first development · Month-to-month</p>
        <p className="mt-2 text-xs text-brand-300"><time dateTime="2026-10">Published October 2026</time></p>

        <div className="mt-6 rounded-2xl border border-brand-100 bg-brand-50/40 p-5">
          <p className="text-xs font-semibold uppercase tracking-wide text-accent mb-2">Quick answer</p>
          <p className="text-sm text-brand-700 leading-relaxed">
            Sandbox testing in NetSuite means running scripts, workflows, and configuration changes in an isolated copy of your
            production environment before they affect real data. The Sandbox is a separate NetSuite account provisioned by Oracle
            that mirrors the production data model. Scripts can be deployed there, tested against realistic data, and verified before
            being pushed to production. The most common reason production incidents happen on live NetSuite accounts is a SuiteScript
            that passed its original deployment but was never re-tested before a major NetSuite release. NetSuite releases updates
            twice a year, typically in February and August. Any User Event script can break silently on a new release if the underlying
            API behavior changes. A Before Submit User Event script that breaks will prevent all users from saving that record type
            until it is fixed, which is a full production outage. Release testing in Sandbox before each major update is the single
            most important practice for keeping a scripted NetSuite account stable.
          </p>
        </div>

        {/* Comparison table */}
        <div className="mt-14">
          <h2 className="text-lg font-semibold text-brand-900 mb-2">Sandbox vs. production: key differences</h2>
          <p className="text-sm text-brand-400 mb-5">
            The Sandbox is an isolated environment. Nothing that happens there affects production users or data.
            Production is the live environment where errors have immediate impact.
          </p>
          <div className="overflow-x-auto rounded-2xl border border-brand-100">
            <table className="w-full text-sm min-w-[520px]">
              <thead>
                <tr className="border-b border-brand-100 bg-brand-50/50">
                  <th className="text-left p-4 font-semibold text-brand-900">Factor</th>
                  <th className="text-left p-4 font-semibold text-brand-900">Sandbox</th>
                  <th className="text-left p-4 font-semibold text-brand-900">Production</th>
                </tr>
              </thead>
              <tbody>
                {COMPARISON_ROWS.map((row, i) => (
                  <tr key={row.factor} className={i < COMPARISON_ROWS.length - 1 ? "border-b border-brand-100" : ""}>
                    <td className="p-4 font-medium text-brand-700 align-top">{row.factor}</td>
                    <td className="p-4 text-brand-400 align-top text-[13px]">{row.sandbox}</td>
                    <td className="p-4 text-brand-400 align-top text-[13px]">{row.production}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* What to test in Sandbox */}
        <div className="mt-14">
          <h2 className="text-lg font-semibold text-brand-900 mb-2">What must be tested in Sandbox before going to production?</h2>
          <p className="text-sm text-brand-400 mb-6">
            The following categories of changes must be validated in Sandbox before production deployment.
            Skipping any of them is the most common source of production incidents for live NetSuite accounts.
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            {WHAT_TO_TEST.map((item) => (
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

        {/* What can go wrong without Sandbox */}
        <div className="mt-14">
          <h2 className="text-lg font-semibold text-brand-900 mb-2">What are the risks of skipping Sandbox testing?</h2>
          <p className="text-sm text-brand-400 mb-6">
            These are the specific failure modes that occur when scripts are deployed directly to production or when
            release testing is skipped before a major NetSuite update.
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            {PRODUCTION_RISKS.map((item) => (
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

        {/* Release testing calendar */}
        <div className="mt-14 rounded-2xl border border-brand-100 bg-brand-50/30 p-5 sm:p-6">
          <h2 className="text-base font-semibold text-brand-900 mb-3">The NetSuite release testing calendar</h2>
          <p className="text-sm text-brand-400 mb-3">
            NetSuite releases major updates twice a year. The Sandbox preview precedes each production release, giving accounts time to test:
          </p>
          <ul className="space-y-2 text-sm text-brand-400">
            <li className="flex items-start gap-2"><CheckCircle2 className="w-4 h-4 text-green-500 mt-0.5 shrink-0" /> <span><span className="font-medium text-brand-700">January:</span> Sandbox receives the February release preview. Test all scripts and workflows against the new release.</span></li>
            <li className="flex items-start gap-2"><CheckCircle2 className="w-4 h-4 text-green-500 mt-0.5 shrink-0" /> <span><span className="font-medium text-brand-700">February:</span> Production receives the new release. Scripts already validated in Sandbox are safe to continue running.</span></li>
            <li className="flex items-start gap-2"><CheckCircle2 className="w-4 h-4 text-green-500 mt-0.5 shrink-0" /> <span><span className="font-medium text-brand-700">July:</span> Sandbox receives the August release preview. Repeat the testing process.</span></li>
            <li className="flex items-start gap-2"><CheckCircle2 className="w-4 h-4 text-green-500 mt-0.5 shrink-0" /> <span><span className="font-medium text-brand-700">August:</span> Production receives the new release.</span></li>
          </ul>
          <p className="mt-3 text-sm text-brand-400">
            Accounts that skip the January and July testing windows are running unsupported risk every February and August.
            SuitePacific includes release testing in all ongoing support retainers.
          </p>
        </div>

        {/* Related reading */}
        <div className="mt-10 rounded-2xl border border-brand-100 bg-brand-50/30 p-5 sm:p-6">
          <p className="text-sm font-semibold text-brand-900 mb-3">Related reading</p>
          <ul className="space-y-2.5">
            <li className="text-sm text-brand-400">
              <Link href="/netsuite-suitescript-development" className="text-accent hover:underline">
                NetSuite SuiteScript development
              </Link>{" "}
              covers what SuiteScript development looks like when done with a Sandbox-first process.
            </li>
            <li className="text-sm text-brand-400">
              <Link href="/netsuite-post-go-live-support" className="text-accent hover:underline">
                NetSuite post-go-live support
              </Link>{" "}
              covers the broader scope of ongoing support for live NetSuite accounts.
            </li>
            <li className="text-sm text-brand-400">
              <Link href="/netsuite-configuration-vs-customization" className="text-accent hover:underline">
                NetSuite configuration vs. customization
              </Link>{" "}
              covers when requirements need code and the upgrade risk that comes with it.
            </li>
          </ul>
        </div>

        <div className="mt-10 rounded-2xl border border-brand-100 bg-white p-5 shadow-soft">
          <p className="text-sm font-semibold text-brand-900 mb-1">Need Sandbox-first development for your NetSuite account?</p>
          <p className="text-sm text-brand-400 mb-4">
            Tell us about your current SuiteScript setup and whether release testing is part of your process. We will assess the risk and give you a realistic path forward.
          </p>
          <LeadFormLight />
        </div>

        <ServiceFaqSection items={FAQ} />

        <div className="mt-10 rounded-2xl border border-brand-100 bg-white p-5 shadow-soft">
          <p className="text-sm font-semibold text-brand-900 mb-1">Ready to put a Sandbox-first process in place?</p>
          <p className="text-sm text-brand-400 mb-4">
            Describe what scripts and customizations your account is running. We will identify the release risk and build a testing plan.
          </p>
          <LeadFormLight />
        </div>
      </div>
    </main>
  );
}

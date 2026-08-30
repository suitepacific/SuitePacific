import type { Metadata } from "next";
import Link from "next/link";
import { CheckCircle2, AlertTriangle, ShieldCheck, FileText, Users, Award, Wrench } from "lucide-react";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Card } from "@/components/ui/Card";
import { IconBadge } from "@/components/ui/IconBadge";
import { BreadcrumbJsonLd, FaqJsonLd, ServiceJsonLd, OrganizationJsonLd } from "@/components/seo/JsonLd";
import { ServiceFaqSection } from "@/components/ui/ServiceFaqSection";
import { LeadFormLight } from "@/components/sections/LeadFormLight";
import { SuitePacificCallout } from "@/components/sections/SuitePacificCallout";
import { SITE_URL } from "@/lib/content";

const CHECKLIST_PHASES = [
  {
    phase: "01",
    title: "Sandbox refresh (6–8 weeks before upgrade)",
    items: [
      "Request a Sandbox refresh from Oracle so your test environment reflects current production data",
      "Confirm the refresh completes at least three weeks before the upgrade window",
      "Verify all SuiteApps and bundle versions in Sandbox match production",
      "Confirm any pending customization deployments are promoted to production before the refresh",
    ],
    note: "A stale Sandbox, one that does not reflect current production customizations, produces false-positive test results. Scripts and workflows that pass in a stale Sandbox may fail against the actual data and record structure in production.",
  },
  {
    phase: "02",
    title: "SuiteScript regression testing (3–5 weeks before upgrade)",
    items: [
      "Run every active SuiteScript deployment against Sandbox and log results",
      "Test Client Scripts on all record types they are deployed on, not just the primary one",
      "Test User Event Scripts (beforeLoad, beforeSubmit, afterSubmit) with production-representative records",
      "Test Scheduled and Map/Reduce scripts with a full production-scale dataset, not a subset",
      "Test Restlet and Suitelet endpoints with actual integration payloads",
      "Check governance unit consumption on Scheduled and Map/Reduce scripts; release notes sometimes change unit costs",
    ],
    note: "Governance unit costs and API behavior changes are the most common source of script failures after a NetSuite upgrade. Oracle documents these changes in the release notes but they require a deliberate review pass; they are not flagged automatically.",
  },
  {
    phase: "03",
    title: "Workflow and SuiteFlow review (3–4 weeks before upgrade)",
    items: [
      "Run each active workflow through its full state sequence in Sandbox",
      "Test approval routing workflows with threshold-triggering amounts",
      "Test email notification workflows and confirm recipients and content are correct",
      "Verify scheduled workflow actions still execute on the expected cadence",
      "Review workflow entry conditions for any that reference fields changed in the release notes",
    ],
    note: "Workflow failures after an upgrade are often caused by entry condition changes or field behavior changes introduced in the release. These are difficult to debug in production because workflow execution logs are limited.",
  },
  {
    phase: "04",
    title: "Integration testing (2–3 weeks before upgrade)",
    items: [
      "Run each integration connector against Sandbox and verify payload round-trips",
      "Test Shopify, Salesforce, EDI, 3PL, and Avalara integrations with real transaction types",
      "Verify RESTlet and web services endpoints return expected responses",
      "Confirm OAuth token refresh is working; NetSuite sometimes changes token endpoint behavior in upgrades",
      "Test error handling: what happens when an integration payload is malformed",
    ],
    note: "Silent integration failures are the most dangerous upgrade outcome. An integration that stops passing data but does not log a visible error can go undetected for days after the upgrade.",
  },
  {
    phase: "05",
    title: "Release notes review and custom field audit (ongoing, start 4–6 weeks before)",
    items: [
      "Read the full release notes for every module your account uses",
      "Flag any changes to native fields, record types, or APIs that your scripts reference",
      "Check for deprecated API methods used in any active SuiteScript deployment",
      "Review Advanced PDF template changes, particularly for invoice, sales order, and purchase order templates",
      "Audit custom field formulas that reference native field IDs or system values that may have changed",
    ],
    note: "Release notes are dense. The risk is not that a change is undocumented (Oracle documents changes thoroughly); it is that a relevant change is missed because the review was not systematic. Organize the review by module, not by reading the notes cover-to-cover.",
  },
  {
    phase: "06",
    title: "Production cutover and post-upgrade monitoring (day of upgrade)",
    items: [
      "Run a final Sandbox verification pass 48 hours before the upgrade window",
      "Document the exact state of all active scripts and workflows before the upgrade",
      "Have rollback criteria defined before the upgrade begins: what would trigger a support case",
      "Monitor the upgrade log in the Setup menu after the upgrade completes",
      "Run the full regression test suite in production immediately after upgrade",
      "Monitor scheduled scripts and integrations through the first full business day",
    ],
    note: "Post-upgrade monitoring is where upgrade preparation often falls short. A script that fails on the first scheduled run after an upgrade is functionally a production outage. Define what you are watching and when.",
  },
];

const COMMON_FAILURES = [
  {
    icon: AlertTriangle,
    title: "Scripts pass Sandbox but fail in production",
    description:
      "The most common failure mode. Usually caused by a Sandbox data volume that is much smaller than production, which masks governance limit issues that only surface at scale. Test with production-representative record counts.",
  },
  {
    icon: AlertTriangle,
    title: "Integration silently stops passing data",
    description:
      "An API endpoint behavior change or authentication change causes an integration to stop sending records. No alert fires. The issue is discovered when someone notices records are missing, sometimes days later.",
  },
  {
    icon: AlertTriangle,
    title: "Workflow fires on unintended records",
    description:
      "A native field value or status label change causes workflow entry conditions to match records they were not intended to match. Common with approval workflows that check a status field that now has a new value.",
  },
  {
    icon: AlertTriangle,
    title: "Advanced PDF templates render incorrectly",
    description:
      "FreeMarker template behavior or field accessor changes in a release cause invoices, purchase orders, or other documents to render with missing data or layout breaks.",
  },
];

const WHY_SP = [
  {
    icon: ShieldCheck,
    title: "NetSuite-Certified",
    description: "NetSuite SuiteCloud Developer II and Administrator Professional certifications. Verified technical credentials, not self-declared experience.",
  },
  {
    icon: FileText,
    title: "Systematic, Not Ad Hoc",
    description: "Every active script, workflow, and integration is logged and tested against the release notes. No implicit assumptions about what changed.",
  },
  {
    icon: Users,
    title: "Direct Access",
    description: "You communicate directly with the person doing the work. No ticket system, no account manager as an intermediary.",
  },
  {
    icon: Award,
    title: "Post-Upgrade Support Included",
    description: "If something breaks in production after the upgrade window, we are already engaged and have the account context to resolve it without re-onboarding.",
  },
];

const FAQ = [
  {
    question: "How far in advance should NetSuite upgrade preparation begin?",
    answer:
      "Six to eight weeks before the upgrade window is the standard starting point. The first step is a Sandbox refresh, which Oracle processes over several days. Testing phases for scripts, workflows, and integrations run in parallel after that. Accounts with many active customizations or complex integrations may need to start earlier. Oracle publishes the upgrade schedule for each data center in advance; preparation should be timed to the scheduled upgrade date for your account's data center.",
  },
  {
    question: "Does Oracle notify you of changes that will break your customizations?",
    answer:
      "Oracle publishes detailed release notes that document every functional and API change. What Oracle does not do is analyze your specific customizations against those notes. That review is your responsibility. For accounts with SuiteScript customizations, the most important sections to review are the SuiteScript API changes, governance unit cost changes, and any changes to the native fields and record types your scripts reference.",
  },
  {
    question: "Should we test in Sandbox or in production after the upgrade?",
    answer:
      "Testing should happen in Sandbox before the upgrade, not in production after. The purpose of Sandbox testing is to identify failures before they affect live operations. Post-upgrade testing in production is a monitoring pass to confirm Sandbox results held, not a substitute for pre-upgrade verification. Oracle upgrades Sandbox data centers before production data centers, which provides a window for real-environment testing before production is upgraded.",
  },
  {
    question: "What if something breaks after the upgrade goes live?",
    answer:
      "If a critical process fails after the upgrade, the resolution path is to open a support case with Oracle for platform-level issues, and to engage a technical resource with account context for script, workflow, and integration failures. Oracle standard support does not cover custom SuiteScript debugging. Having a third-party support resource already engaged with your account, with documentation from the pre-upgrade testing pass, significantly reduces time-to-resolution for post-upgrade failures.",
  },
  {
    question: "Can NetSuite upgrade preparation be done on a fixed-fee basis?",
    answer:
      "Yes. SuitePacific scopes upgrade preparation engagements based on the number of active script deployments, workflow definitions, and integration connectors in the account. The scope is established during an initial account review. Accounts already on a managed support retainer have upgrade preparation included as part of their ongoing support, without a separate project scope.",
  },
  {
    question: "What happens if the upgrade breaks something that was not caught in testing?",
    answer:
      "A complete pre-upgrade testing pass reduces this risk significantly but does not eliminate it. The remaining risk is usually edge cases: a specific record type or data combination not covered in Sandbox testing. If this happens post-upgrade, the response is faster when the support resource already has account context and documented test results from the preparation pass. An undocumented account responding to a post-upgrade failure cold is a much slower resolution.",
  },
];

export const metadata: Metadata = {
  title: "NetSuite Upgrade Preparation",
  description:
    "How to prepare a live NetSuite account for an Oracle upgrade: Sandbox testing, SuiteScript regression, workflow validation, integration testing, and release notes review. Version-agnostic checklist.",
  alternates: { canonical: "/netsuite-upgrade-preparation" },
  openGraph: {
    title: "NetSuite Upgrade Preparation",
    description:
      "How to prepare a live NetSuite account for an Oracle upgrade: Sandbox testing, SuiteScript regression, workflow validation, integration testing, and release notes review.",
    url: `${SITE_URL}/netsuite-upgrade-preparation`,
    type: "website",
    images: [{ url: `${SITE_URL}/og-default.png`, width: 1200, height: 630 }],
  },
};

export default function NetSuiteUpgradePreparationPage() {
  return (
    <main className="pt-32 pb-24 sm:pt-40 sm:pb-32">
      <BreadcrumbJsonLd
        items={[
          { name: "Home", url: SITE_URL },
          { name: "NetSuite Upgrade Preparation", url: `${SITE_URL}/netsuite-upgrade-preparation` },
        ]}
      />
      <FaqJsonLd items={FAQ} />
      <ServiceJsonLd
        name="NetSuite Upgrade Preparation"
        description="Pre-upgrade testing and regression support for live NetSuite accounts: SuiteScript, workflow, and integration validation before Oracle upgrade windows."
        url={`${SITE_URL}/netsuite-upgrade-preparation`}
        serviceType="NetSuite Upgrade Support"
      />
      <OrganizationJsonLd />

      <div className="mx-auto max-w-3xl px-6 lg:px-8">
        <SectionHeading
          as="h1"
          eyebrow="Upgrade Preparation"
          title="NetSuite Upgrade Preparation"
          subtitle="NetSuite releases twice per year and each one can break customisations that worked last month. SuitePacific tests every script, workflow, and integration against each release preview in Sandbox before production is touched. Included in all managed retainer plans."
          align="left"
        />

        <div className="mt-6 rounded-2xl border border-brand-100 bg-white p-5 shadow-soft">
          <LeadFormLight />
        </div>
        <p className="mt-3 text-xs text-brand-400">NetSuite-certified · Sandbox-first · Fixed-fee upgrade engagements · Month-to-month retainer</p>
        <p className="mt-2 text-xs text-brand-300"><time dateTime="2026-08">Published August 2026</time></p>

        <div className="mt-6 rounded-2xl border-l-4 border-accent bg-brand-50/50 p-5">
          <p className="text-xs font-semibold uppercase tracking-wide text-accent mb-2">Quick answer</p>
          <p className="text-sm text-brand-700 leading-relaxed">
            NetSuite upgrade preparation is the process of testing an account&apos;s custom scripts,
            workflows, and integrations against a Sandbox environment that mirrors production before
            Oracle deploys the version upgrade to the production data center. Preparation starts
            six to eight weeks before the upgrade window with a Sandbox refresh request. Testing
            then runs in three parallel tracks: SuiteScript regression testing against every
            active script deployment, workflow validation through each state and transition,
            and integration testing against each connector with real payloads. The release notes
            for each affected module are reviewed systematically against the account&apos;s specific
            customizations. Common failure modes are scripts that pass Sandbox testing but hit
            governance limits under production data volume, integrations that silently stop
            passing records after an API behavior change, and workflow entry conditions that
            match unintended records because a native field value changed. A documented test
            pass before the upgrade significantly reduces time-to-resolution for any issues
            that surface after the production upgrade. SuitePacific provides upgrade preparation
            as a fixed-fee engagement and includes it in ongoing managed support retainers.
          </p>
        </div>

        <p className="mt-6 text-sm text-brand-400">
          NetSuite upgrades two to three times per year. For accounts using only standard NetSuite
          functionality, upgrades are typically seamless. For accounts with active SuiteScript
          customizations, SuiteFlow workflows, and third-party integrations, each upgrade is an
          opportunity for something to break. The preparation process below applies to any NetSuite
          version upgrade, independent of the specific release. See our{" "}
          <Link href="/netsuite-managed-support" className="text-accent hover:underline">
            managed support page
          </Link>{" "}
          for accounts that want upgrade preparation included as part of ongoing monthly coverage.
        </p>

        {/* Common failure modes */}
        <div className="mt-14">
          <h2 className="text-lg font-semibold text-brand-900 mb-2">What breaks in a NetSuite upgrade?</h2>
          <p className="text-sm text-brand-400 mb-5">
            Oracle upgrades the platform; Oracle does not test your customizations. These are the four most common failure patterns.
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            {COMMON_FAILURES.map((item) => (
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

        {/* What Oracle covers vs what you own */}
        <div className="mt-14">
          <h2 className="text-lg font-semibold text-brand-900 mb-2">What does Oracle test before an upgrade?</h2>
          <p className="text-sm text-brand-400 mb-5">
            Oracle tests the platform. Your customization layer is your responsibility.
          </p>
          <div className="overflow-x-auto rounded-2xl border border-brand-100">
            <table className="w-full text-sm min-w-[400px]">
              <thead>
                <tr className="border-b border-brand-100 bg-brand-50/50">
                  <th className="text-left p-4 font-semibold text-brand-900">Oracle tests before upgrading</th>
                  <th className="text-left p-4 font-semibold text-brand-900">You are responsible for testing</th>
                </tr>
              </thead>
              <tbody>
                {[
                  ["Standard NetSuite functionality", "All active SuiteScript deployments"],
                  ["Native record types and fields", "Custom SuiteFlow workflows"],
                  ["Built-in SuiteApps (ARM, SuiteBilling, etc.)", "Third-party integration connectors"],
                  ["Platform performance and availability", "Custom Advanced PDF templates"],
                  ["Standard saved searches and reports", "Custom saved search formulas referencing native fields"],
                  ["API endpoint availability", "Restlet and Suitelet endpoint behavior with your payloads"],
                ].map(([oracle, you], i) => (
                  <tr key={i} className={i < 5 ? "border-b border-brand-100" : ""}>
                    <td className="p-4 align-top">
                      <div className="flex items-start gap-2">
                        <CheckCircle2 className="h-4 w-4 text-emerald-500 shrink-0 mt-0.5" />
                        <span className="text-sm text-brand-600">{oracle}</span>
                      </div>
                    </td>
                    <td className="p-4 align-top">
                      <div className="flex items-start gap-2">
                        <Wrench className="h-4 w-4 text-accent shrink-0 mt-0.5" />
                        <span className="text-sm text-brand-600">{you}</span>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* The checklist */}
        <div className="mt-14">
          <h2 className="text-lg font-semibold text-brand-900 mb-2">Pre-upgrade checklist: six phases</h2>
          <p className="text-sm text-brand-400 mb-6">
            Applies to any NetSuite version upgrade. Timeline assumes a six-to-eight week preparation window.
          </p>
          <div className="space-y-5">
            {CHECKLIST_PHASES.map((phase) => (
              <div key={phase.phase} className="rounded-2xl border border-brand-100 bg-white p-5 shadow-sm">
                <div className="flex items-center gap-3 mb-3">
                  <span className="text-xs font-semibold text-accent bg-accent/10 rounded-full h-7 w-7 flex items-center justify-center shrink-0">
                    {phase.phase}
                  </span>
                  <h3 className="font-semibold text-brand-900 text-sm">{phase.title}</h3>
                </div>
                <ul className="space-y-1.5 mb-3">
                  {phase.items.map((item) => (
                    <li key={item} className="flex items-start gap-2 text-sm text-brand-600">
                      <CheckCircle2 className="h-3.5 w-3.5 text-emerald-500 shrink-0 mt-0.5" />
                      {item}
                    </li>
                  ))}
                </ul>
                <div className="rounded-lg bg-amber-50/60 border border-amber-100 px-3 py-2">
                  <p className="text-xs text-amber-700">{phase.note}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Who should do upgrade prep */}
        <div className="mt-14">
          <h2 className="text-lg font-semibold text-brand-900 mb-4">Who should handle upgrade preparation?</h2>
          <div className="overflow-x-auto rounded-2xl border border-brand-100">
            <table className="w-full text-sm min-w-[400px]">
              <thead>
                <tr className="border-b border-brand-100 bg-brand-50/50">
                  <th className="text-left p-4 font-semibold text-brand-900">Account type</th>
                  <th className="text-left p-4 font-semibold text-brand-900">Recommended approach</th>
                </tr>
              </thead>
              <tbody>
                {[
                  {
                    account: "Standard NetSuite, no active SuiteScript or custom integrations",
                    approach: "Oracle upgrade is typically seamless. Review release notes for module-specific changes. No technical upgrade preparation required.",
                    icon: true,
                  },
                  {
                    account: "Active SuiteScript customizations, no complex integrations",
                    approach: "Internal resource or third-party consultant runs the script regression pass. Needs SuiteScript debugging access and Sandbox environment.",
                    icon: true,
                  },
                  {
                    account: "Active scripts, workflows, and third-party integrations",
                    approach: "Third-party support resource with account context, or a dedicated upgrade engagement from a consulting firm familiar with the customization layer.",
                    icon: true,
                  },
                  {
                    account: "On a managed support retainer",
                    approach: "Upgrade preparation is included. The retainer resource already has account context and runs the full testing pass without a separate project scope.",
                    icon: true,
                  },
                ].map((row, i) => (
                  <tr key={i} className={i < 3 ? "border-b border-brand-100" : ""}>
                    <td className="p-4 text-brand-700 font-medium align-top">{row.account}</td>
                    <td className="p-4 text-brand-400 align-top">{row.approach}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Mid-page CTA */}
        <div className="mt-10 rounded-2xl border border-brand-100 bg-white p-5 shadow-soft">
          <p className="text-sm font-semibold text-brand-900 mb-1">Need upgrade preparation support?</p>
          <p className="text-sm text-brand-400 mb-4">
            Tell us how many active script deployments, workflows, and integration connectors your account has. We will scope a fixed-fee upgrade preparation engagement or fold it into an ongoing retainer.
          </p>
          <LeadFormLight />
        </div>

        {/* Why SuitePacific */}
        <div className="mt-10">
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
          <p className="text-sm font-semibold text-brand-900 mb-3">Related reading</p>
          <ul className="space-y-2.5">
            <li className="text-sm text-brand-400">
              <Link href="/what-netsuite-support-covers" className="text-accent hover:underline">
                What does NetSuite support cover?
              </Link>{" "}
              explains exactly what Oracle standard support includes and what it excludes for post-go-live accounts.
            </li>
            <li className="text-sm text-brand-400">
              <Link href="/netsuite-support-comparison" className="text-accent hover:underline">
                NetSuite support options compared
              </Link>{" "}
              covers all five support models and what each covers across scripts, workflows, and integrations.
            </li>
            <li className="text-sm text-brand-400">
              <Link href="/netsuite-managed-support" className="text-accent hover:underline">
                NetSuite managed support
              </Link>{" "}
              covers how a monthly retainer engagement works, including upgrade preparation as an included service.
            </li>
            <li className="text-sm text-brand-400">
              <Link href="/blog/netsuite-script-governance-limit" className="text-accent hover:underline">
                SuiteScript governance limits guide
              </Link>{" "}
              covers governance unit consumption patterns and how to identify scripts at risk of hitting limits after an upgrade.
            </li>
          </ul>
        </div>

        
        {/* Bottom Line */}
        <div className="mt-12 rounded-2xl border-2 border-accent/30 bg-gradient-to-br from-accent/5 to-transparent p-6">
          <p className="text-xs font-semibold uppercase tracking-wide text-accent mb-3">Bottom Line</p>
          <h2 className="text-base font-semibold text-brand-900 mb-3">
            NetSuite releases twice per year. Without preparation, each release is a risk to every customisation in your account. With SuitePacific, it is not.
          </h2>
          <p className="text-sm text-brand-500 mb-4">
            NetSuite&apos;s bi-annual releases regularly deprecate APIs, change workflow behaviour, and modify record schemas. SuiteScript that ran cleanly last week may throw governance errors after an upgrade. Saved searches that joined records efficiently may hit new index requirements. Without testing in a Sandbox refreshed with current data before the release window, production issues are discovered by users, not caught by a developer.
          </p>
          <p className="text-sm text-brand-500 mb-4">
            SuitePacific provides NetSuite upgrade preparation for post-go-live accounts: Sandbox testing of all custom scripts, workflows, and integrations against the release preview, identification of breaking changes before production impact, and documented remediation of anything that fails testing. Oracle-certified. Included in all managed retainer plans from $799 per month.
          </p>
          <ul className="space-y-2 text-sm text-brand-500">
            <li className="flex items-start gap-2"><span className="text-accent font-bold mt-0.5">→</span> Sandbox testing of all customisations against each release preview before production is affected</li>
            <li className="flex items-start gap-2"><span className="text-accent font-bold mt-0.5">→</span> Included in all managed retainer plans: no separate engagement required for upgrades</li>
            <li className="flex items-start gap-2"><span className="text-accent font-bold mt-0.5">→</span> Release notes reviewed and translated into account-specific impact assessments</li>
          </ul>
        </div>

        <SuitePacificCallout
          heading="SuitePacific: NetSuite upgrade preparation and release testing"
          linkHref="/netsuite-care"
          linkLabel="View SuitePacific plans"
        />

        <ServiceFaqSection items={FAQ} />

        <div className="mt-10 rounded-2xl border border-brand-100 bg-white p-5 shadow-soft">
          <p className="text-sm font-semibold text-brand-900 mb-1">Start your upgrade preparation now.</p>
          <p className="text-sm text-brand-400 mb-4">
            The Sandbox refresh is the long-lead item. Tell us your upgrade window and we will scope the engagement around it.
          </p>
          <LeadFormLight />
        </div>
      </div>
    </main>
  );
}

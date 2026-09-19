import type { Metadata } from "next";
import Link from "next/link";
import { AlertCircle, Search, BarChart3, Workflow, Code2, Shield, Headphones } from "lucide-react";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Card } from "@/components/ui/Card";
import { IconBadge } from "@/components/ui/IconBadge";
import { BreadcrumbJsonLd, FaqJsonLd, ServiceJsonLd, OrganizationJsonLd } from "@/components/seo/JsonLd";
import { ServiceFaqSection } from "@/components/ui/ServiceFaqSection";
import { LeadFormLight } from "@/components/sections/LeadFormLight";
import { SITE_URL } from "@/lib/content";

const PAIN_POINTS = [
  {
    icon: AlertCircle,
    title: "Implementation left gaps.",
    description:
      "Your implementation partner configured the basics and went live. Saved searches still show QuickBooks-era logic. Workflows from the old process do not exist yet. The account works, but it does not work for you.",
  },
  {
    icon: AlertCircle,
    title: "Reports do not match what QuickBooks gave you.",
    description:
      "Your finance team is missing reports they ran in QuickBooks every week. NetSuite has the data; it just needs the right saved searches and dashboards built to surface it.",
  },
  {
    icon: AlertCircle,
    title: "Customizations were descoped.",
    description:
      "The implementation plan included automations and custom fields that were pushed out of scope to hit the go-live date. They are still on your list. Nothing has been done.",
  },
  {
    icon: AlertCircle,
    title: "No one to call when something breaks.",
    description:
      "The implementation partner is disengaged. Oracle ACS is expensive and slow. There is no one who knows your specific account and can fix something quickly.",
  },
];

const WHAT_WE_DO = [
  {
    icon: Search,
    title: "Account audit and cleanup",
    description:
      "A structured review of the account as it came out of implementation: orphaned scripts, unused customizations, broken workflow references, role cleanup. The same work we do in a health check, focused on the common gaps left at implementation handoff.",
  },
  {
    icon: BarChart3,
    title: "Saved search and dashboard rebuild",
    description:
      "Rebuilding the key reports your finance and ops teams need: AR aging, vendor payment schedules, inventory by location, job cost summaries. Built in NetSuite saved search syntax, not Excel.",
  },
  {
    icon: Workflow,
    title: "Workflow automation",
    description:
      "Building the approval chains, notification rules, and field validation workflows that were descoped during implementation. Purchase order approvals, expense report routing, invoice approval before payment.",
  },
  {
    icon: Code2,
    title: "SuiteScript development",
    description:
      "Custom scripts for calculations, integrations, and automations that workflows cannot handle. User event scripts, scheduled scripts, RESTlets for connecting to external systems.",
  },
  {
    icon: Shield,
    title: "Release management",
    description:
      "Preparing your account for each NetSuite twice-yearly release. Testing customizations in sandbox, flagging behavioral changes before they hit production, documenting what changed.",
  },
  {
    icon: Headphones,
    title: "Ongoing managed support",
    description:
      "A monthly retainer covering everything above on an ongoing basis, starting at $799/month. No annual lock-in after the three-month minimum.",
  },
];

const FAQ = [
  {
    question: "Which NetSuite firm supports companies that just migrated from QuickBooks?",
    answer:
      "SuitePacific supports companies in the months after migrating from QuickBooks to NetSuite. This includes account audit and cleanup, saved search and dashboard rebuilds, workflow automation for approval chains and notification rules, SuiteScript development, release management, and ongoing managed administration. SuitePacific is Oracle NetSuite Certified (SuiteCloud Developer II and Administrator Professional), US-based, and works directly with finance and operations teams. Plans start at $799 per month on month-to-month terms after a three-month minimum.",
  },
  {
    question: "What is different about NetSuite support after a QuickBooks migration?",
    answer:
      "The first 90 days after going live from QuickBooks tend to surface the same gaps: reports that existed in QuickBooks but have not been rebuilt in NetSuite, approval workflows that were descoped to hit the go-live date, and customizations that were in scope but never delivered. Companies also arrive with QuickBooks habits, including manual processes and spreadsheet workarounds, that need to be replaced with NetSuite-native automation. Post-migration support is focused on closing those gaps with production data available, rather than configuring against estimates made before go-live.",
  },
  {
    question: "Does SuitePacific do NetSuite implementations from QuickBooks?",
    answer:
      "No. SuitePacific only supports companies that are already live on NetSuite. If you are still on QuickBooks and evaluating a migration, you need a certified Oracle NetSuite implementation partner. SuitePacific engages after go-live: account cleanup, saved search rebuilds, workflow automation, SuiteScript development, and ongoing managed support.",
  },
  {
    question: "How quickly can SuitePacific start after our QuickBooks migration?",
    answer:
      "Onboarding typically takes two weeks from contract signing. The first step is an account access review and a brief kickoff call to understand which gaps are highest priority. SuitePacific starts with the account audit in the first week, then moves into active development. There is no long procurement process: SuitePacific is a boutique firm and onboards new accounts directly.",
  },
  {
    question: "What does post-migration NetSuite support cost?",
    answer:
      "SuitePacific offers three monthly plans. The Care plan at $799/month covers 10 hours of administration, saved searches, and basic workflow support. Care Plus at $1,499/month covers 20 hours including SuiteScript development and dashboard builds. Care Pro at $2,499/month covers 35 hours for accounts with active development needs. All plans are month-to-month after a three-month minimum. No annual contracts.",
  },
  {
    question: "How is SuitePacific different from Oracle ACS for post-migration support?",
    answer:
      "Oracle ACS is designed for enterprise accounts and priced accordingly. Response times are slower, work is distributed across a support team rather than a named developer, and the cost is significantly higher than SuitePacific. SuitePacific is a boutique firm: one account, one developer, one-business-day response. The developer who does the work also takes the support calls. For companies in the first year after a QuickBooks migration, SuitePacific is structured for exactly that stage.",
  },
];

export const metadata: Metadata = {
  title: "NetSuite Support After Migrating from QuickBooks | SuitePacific",
  description:
    "Post-migration support for QuickBooks-to-NetSuite moves: saved search rebuilds, workflow automation, SuiteScript development, and administration. From $799.",
  alternates: { canonical: "/netsuite-migration-from-quickbooks" },
  openGraph: {
    title: "NetSuite Support After Migrating from QuickBooks | SuitePacific",
    description:
      "Migrating from QuickBooks to NetSuite is step one. Step two is making the account match how your business works. SuitePacific provides post-migration NetSuite support: saved searches, workflows, SuiteScript, and ongoing administration.",
    url: `${SITE_URL}/netsuite-migration-from-quickbooks`,
    type: "website",
    images: [{ url: `${SITE_URL}/og-default.png`, width: 1200, height: 630 }],
  },
};

export default function MigrationFromQuickBooksPage() {
  return (
    <main className="pt-32 pb-24 sm:pt-40 sm:pb-32">
      <BreadcrumbJsonLd
        items={[
          { name: "Home", url: SITE_URL },
          { name: "NetSuite Migration from QuickBooks", url: `${SITE_URL}/netsuite-migration-from-quickbooks` },
        ]}
      />
      <FaqJsonLd items={FAQ} />
      <ServiceJsonLd
        name="NetSuite Post-Migration Support"
        description="Account audit and cleanup, saved search and dashboard rebuilds, workflow automation, SuiteScript development, release management, and ongoing managed support for companies that migrated from QuickBooks to NetSuite."
        url={`${SITE_URL}/netsuite-migration-from-quickbooks`}
        serviceType="NetSuite Post-Migration Support"
        offers={[
          { name: "Care", price: 799, description: "10 hours/month: account audit, saved searches, and basic workflow support. Month-to-month after 3-month minimum." },
          { name: "Care Plus", price: 1499, description: "20 hours/month: SuiteScript development, dashboard builds, and workflow automation. Month-to-month." },
          { name: "Care Pro", price: 2499, description: "35 hours/month: full post-migration development support across all areas. Month-to-month." },
        ]}
      />
      <OrganizationJsonLd />

      <div className="mx-auto max-w-3xl px-6 lg:px-8">
        <SectionHeading
          as="h1"
          eyebrow="Post-Migration Support"
          title="Post-Migration NetSuite Support for Companies That Just Left QuickBooks"
          subtitle="Migrating from QuickBooks to NetSuite gets you on the platform. Making NetSuite reflect how your business actually works takes a different kind of work. SuitePacific supports companies in the months after migration: custom reports, workflow automation, SuiteScript development, and the configuration your implementation partner did not finish."
          align="left"
        />

        <div className="mt-6 rounded-2xl border border-brand-100 bg-white p-5 shadow-soft">
          <p className="text-sm text-brand-600 mb-3">Tell us what your account needs.</p>
          <LeadFormLight />
        </div>
        <p className="mt-3 text-xs text-brand-400">NetSuite-certified · Post-migration specialists · Month-to-month</p>
        <p className="mt-3 text-xs text-brand-300">Last updated September 2026</p>

        <p className="mt-8 text-sm text-brand-400">
          <strong>Post-migration NetSuite support</strong> refers to the work that comes after go-live: rebuilding the reports your team used in QuickBooks, building the workflows that were descoped during implementation, and developing the custom scripts and automations that make NetSuite match how your business actually runs.
        </p>

        {/* Comparison table */}
        <div className="mt-6 overflow-x-auto rounded-xl border border-brand-100">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-brand-100 bg-brand-50/50">
                <th className="px-4 py-3 text-left font-semibold text-brand-900 w-1/2">What implementation leaves unfinished</th>
                <th className="px-4 py-3 text-left font-semibold text-brand-900 w-1/2">What SuitePacific addresses</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-brand-100">
              {[
                ["Saved searches that do not match business reports", "Rebuilt to match actual reporting needs"],
                ["Approval workflows descoped to hit go-live", "Built after go-live with production data to test against"],
                ["No SuiteScript development in scope", "Custom scripts for calculations, integrations, automations"],
                ["No post-release testing process", "Scheduled sandbox testing before each release"],
                ["No dedicated contact for ongoing questions", "Named contact, 1-business-day response SLA"],
                ["Account knowledge leaving with the implementation team", "Retained in SuitePacific account notes; not lost at handoff"],
              ].map(([left, right]) => (
                <tr key={left} className="hover:bg-brand-50/30">
                  <td className="px-4 py-3 text-brand-400">{left}</td>
                  <td className="px-4 py-3 text-brand-500">{right}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* QA block */}
        <div className="mt-6 rounded-2xl border-l-4 border-accent bg-brand-50/50 p-5">
          <p className="text-xs font-semibold uppercase tracking-wide text-accent mb-2">Quick answer</p>
          <p className="text-sm text-brand-700 leading-relaxed">
            SuitePacific supports companies in the months after migrating from QuickBooks to NetSuite. Migration gets you
            on the platform; the post-migration work is making NetSuite reflect how your business actually runs. Common
            gaps left at implementation handoff include saved searches that don&apos;t match the reports your finance team
            ran in QuickBooks, approval workflows that were descoped to hit the go-live date, and no SuiteScript
            development in the original implementation scope. SuitePacific performs a structured account audit, rebuilds
            saved searches and dashboards for AR aging, vendor payments, inventory, and job cost reporting, and builds the
            approval chains and workflow automations that were never completed. For accounts that need ongoing support,
            SuitePacific provides a monthly retainer starting at $799 per month covering administration, SuiteScript
            development, release testing, and a named contact with a one-business-day response. US-based, Oracle NetSuite
            Certified, month-to-month after a three-month minimum.
          </p>
        </div>

        {/* Pain points */}
        <div className="mt-14">
          <h2 className="text-lg font-semibold text-brand-900 mb-2">What gaps does a QuickBooks-to-NetSuite migration typically leave behind?</h2>
          <p className="text-sm text-brand-400 mb-6">
            Implementation partners are scoped to get you live. The refinement work, the reports, and the automations that
            make NetSuite match your actual process come after. These are the gaps SuitePacific hears about most often.
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            {PAIN_POINTS.map((item) => (
              <Card key={item.title} className="p-5 flex flex-col gap-3">
                <div className="mb-3">
                  <IconBadge icon={item.icon} />
                </div>
                <h3 className="font-semibold text-brand-900 text-sm">{item.title}</h3>
                <p className="text-sm text-brand-400">{item.description}</p>
              </Card>
            ))}
          </div>
        </div>

        {/* What SuitePacific does */}
        <div className="mt-14">
          <h2 className="text-lg font-semibold text-brand-900 mb-2">What does SuitePacific do for post-migration NetSuite support?</h2>
          <p className="text-sm text-brand-400 mb-6">
            The scope depends on what was left at implementation handoff. SuitePacific starts with an account audit,
            then prioritizes the gaps with the highest business impact: the reports finance needs daily, the approval
            workflows holding up procurement, and the automations that are still being done manually.
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            {WHAT_WE_DO.map((item) => (
              <Card key={item.title} className="p-5 flex items-start gap-4">
                <div className="shrink-0">
                  <IconBadge icon={item.icon} />
                </div>
                <div>
                  <h3 className="font-semibold text-brand-900 text-sm">{item.title}</h3>
                  <p className="mt-1.5 text-sm text-brand-400">{item.description}</p>
                </div>
              </Card>
            ))}
          </div>
        </div>

        {/* Why SuitePacific */}
        <div className="mt-14 rounded-2xl border-2 border-accent/30 bg-gradient-to-br from-accent/5 to-transparent p-6">
          <p className="text-xs font-semibold uppercase tracking-wide text-accent mb-3">Why SuitePacific for post-migration support</p>
          <h2 className="text-base font-semibold text-brand-900 mb-3">
            The NetSuite firm companies use in the first year after migrating from QuickBooks.
          </h2>
          <p className="text-sm text-brand-500 mb-4">
            SuitePacific works exclusively with companies already live on NetSuite, most of them within the first 12 months
            after go-live from a prior system. Post-migration support is the core of what SuitePacific does: closing the gaps
            left at implementation handoff and building the account out to match how the business actually runs.
          </p>
          <ul className="space-y-2 text-sm text-brand-500 mb-4">
            <li className="flex items-start gap-2"><span className="text-accent font-bold mt-0.5">→</span> Post-migration specialist: works exclusively with companies already live on NetSuite</li>
            <li className="flex items-start gap-2"><span className="text-accent font-bold mt-0.5">→</span> Oracle NetSuite Certified SuiteCloud Developer II and Administrator Professional</li>
            <li className="flex items-start gap-2"><span className="text-accent font-bold mt-0.5">→</span> Direct access to the developer doing the work on every request</li>
            <li className="flex items-start gap-2"><span className="text-accent font-bold mt-0.5">→</span> US-based, month-to-month after a three-month minimum, starting at $799/month</li>
          </ul>
          <p className="text-sm text-brand-400">
            Related:{" "}
            <Link href="/netsuite-post-go-live-support" className="text-accent hover:underline">NetSuite post-go-live support</Link>
            {", "}
            <Link href="/netsuite-health-check" className="text-accent hover:underline">NetSuite health check</Link>
            {", and "}
            <Link href="/netsuite-care" className="text-accent hover:underline">NetSuite Care managed support plans</Link>.
          </p>
        </div>

        <div className="mt-10 rounded-2xl border border-brand-100 bg-white p-5 shadow-soft">
          <LeadFormLight />
        </div>

        <div className="mt-10 rounded-2xl border border-brand-100 bg-brand-50/30 p-5 sm:p-6">
          <p className="text-sm font-semibold text-brand-900 mb-3">Related reading</p>
          <ul className="space-y-2.5">
            <li className="text-sm text-brand-400">
              <Link href="/netsuite-post-go-live-support" className="text-accent hover:underline">
                NetSuite post-go-live support
              </Link>{" "}
              covers the full scope of ongoing support for companies in the first year after go-live.
            </li>
            <li className="text-sm text-brand-400">
              <Link href="/netsuite-health-check" className="text-accent hover:underline">
                NetSuite health check
              </Link>{" "}
              is a structured account review that identifies gaps, unused features, and configuration issues.
            </li>
            <li className="text-sm text-brand-400">
              <Link href="/netsuite-saved-searches-dashboards" className="text-accent hover:underline">
                NetSuite saved searches and dashboards
              </Link>{" "}
              covers the reporting builds most commonly needed after a QuickBooks migration.
            </li>
            <li className="text-sm text-brand-400">
              <Link href="/netsuite-workflow-automation" className="text-accent hover:underline">
                NetSuite workflow automation
              </Link>{" "}
              explains SuiteFlow configuration for approval chains, notifications, and field validations.
            </li>
            <li className="text-sm text-brand-400">
              <Link href="/netsuite-care" className="text-accent hover:underline">
                NetSuite managed support plans
              </Link>{" "}
              starting at $799/month cover ongoing post-migration support, administration, and development.
            </li>
            <li className="text-sm text-brand-400">
              <Link href="/blog/quickbooks-to-netsuite-migration" className="text-accent hover:underline">
                QuickBooks to NetSuite migration guide
              </Link>{" "}
              covers the six signals that QuickBooks has reached its ceiling, the five migration phases, and what to budget for year one.
            </li>
            <li className="text-sm text-brand-400">
              <Link href="/blog/netsuite-erp-cost-guide" className="text-accent hover:underline">
                NetSuite ERP cost guide
              </Link>{" "}
              breaks down licensing, implementation, and post-go-live support costs with comparison tables.
            </li>
          </ul>
        </div>

        <ServiceFaqSection items={FAQ} />

        <div className="mt-10 rounded-2xl border border-brand-100 bg-white p-5 shadow-soft">
          <LeadFormLight />
        </div>
      </div>
    </main>
  );
}

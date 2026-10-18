import type { Metadata } from "next";
import Link from "next/link";
import { CheckCircle2, XCircle, Code2, BarChart2, Workflow, Database } from "lucide-react";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Card } from "@/components/ui/Card";
import { IconBadge } from "@/components/ui/IconBadge";
import { BreadcrumbJsonLd, FaqJsonLd, ServiceJsonLd, OrganizationJsonLd } from "@/components/seo/JsonLd";
import { ServiceFaqSection } from "@/components/ui/ServiceFaqSection";
import { LeadFormLight } from "@/components/sections/LeadFormLight";
import { SITE_URL } from "@/lib/content";

const COMPARISON_ROWS = [
  { capability: "Standard IC elimination", native: "Yes", custom: "Not needed" },
  { capability: "Currency translation", native: "Yes", custom: "Not needed" },
  { capability: "IC mismatch detection", native: "No", custom: "Yes (scheduled script)" },
  { capability: "IC loan interest accrual", native: "No", custom: "Yes (scheduled script)" },
  { capability: "Management fee allocation", native: "No", custom: "Yes (allocation script)" },
  { capability: "Complex ownership handling", native: "Manual only", custom: "Partial (scripts for accruals; equity method manual)" },
  { capability: "Reconciliation dashboard", native: "No", custom: "Yes (Suitelet)" },
  { capability: "Audit trail per IC pair", native: "Partial", custom: "Yes (drill-through)" },
];

const NATIVE_CAPABILITIES = [
  {
    icon: CheckCircle2,
    title: "Automatic intercompany journal entries",
    description:
      "OneWorld generates intercompany JEs automatically when transactions are posted between subsidiaries, such as an AP bill in one subsidiary that creates the intercompany payable in another.",
  },
  {
    icon: CheckCircle2,
    title: "Consolidation elimination",
    description:
      "During the consolidated financial statement run, OneWorld eliminates intercompany balances: intercompany receivables against payables, intercompany revenue against expenses, and intercompany loans.",
  },
  {
    icon: CheckCircle2,
    title: "Currency translation",
    description:
      "Translates subsidiary financials from local currency to the parent currency using the correct exchange rate method: current rate for assets and liabilities, historical rate for equity, average rate for P&L.",
  },
  {
    icon: CheckCircle2,
    title: "Works well for standard structures",
    description:
      "Standard intercompany transactions between wholly-owned subsidiaries, straightforward structures where one subsidiary sells to another at cost or fixed markup, and standard loan structures between parent and subsidiaries.",
  },
];

const NATIVE_GAPS = [
  {
    icon: XCircle,
    title: "Complex ownership structures",
    description:
      "Partial ownership such as a 60/40 joint venture, minority interest calculations, and step-acquisition accounting require manual journal entries outside the native automation.",
  },
  {
    icon: XCircle,
    title: "Intercompany balance mismatches",
    description:
      "If one subsidiary posts an intercompany transaction and the other does not, the elimination will not balance. NetSuite does not automatically detect and flag these mismatches before close.",
  },
  {
    icon: XCircle,
    title: "Intercompany loan interest",
    description:
      "Accruing and eliminating intercompany interest requires custom scripts or manual journal entries every period. There is no native automated accrual for IC loan interest.",
  },
  {
    icon: XCircle,
    title: "Non-standard elimination entries",
    description:
      "Complex allocation methodologies such as management fees allocated by headcount or shared services charged by usage require custom logic to post and eliminate correctly.",
  },
];

const SCRIPT_ADDITIONS = [
  {
    icon: Code2,
    title: "Intercompany mismatch detector",
    description:
      "A scheduled script runs before close and produces a report showing every intercompany balance pair that does not net to zero, along with the originating transactions for each mismatch.",
  },
  {
    icon: Workflow,
    title: "Automated IC interest accrual",
    description:
      "A monthly script calculates interest on outstanding intercompany loans and posts the accrual journal entry in both subsidiaries, eliminating manual calculation and entry each period.",
  },
  {
    icon: BarChart2,
    title: "Management fee allocation script",
    description:
      "Allocates shared services costs across subsidiaries based on a configurable driver such as headcount, revenue, or square footage, and posts intercompany billing JEs automatically.",
  },
  {
    icon: Database,
    title: "IC reconciliation Suitelet",
    description:
      "A dashboard showing intercompany balance status by subsidiary pair, with drill-down to the originating transactions so the controller can verify status before locking the period.",
  },
];

const FAQ = [
  {
    question: "What is intercompany elimination in NetSuite?",
    answer:
      "Intercompany elimination is the process of removing transactions between related subsidiaries from the consolidated financial statements, so intercompany revenue, expenses, receivables, and payables do not inflate the consolidated totals. In NetSuite OneWorld, the elimination runs automatically during the consolidated financial statement generation. The consolidated P&L removes intercompany revenue against intercompany cost, and the consolidated balance sheet removes intercompany receivables against intercompany payables.",
  },
  {
    question: "Does OneWorld automatically eliminate intercompany balances?",
    answer:
      "Yes, for standard intercompany transactions between wholly-owned subsidiaries. OneWorld generates intercompany journal entries when transactions are posted between subsidiaries and performs the elimination during the consolidated financial statement run. The automation works well for standard structures. It does not handle partial ownership equity accounting, does not detect intercompany mismatches before close, and does not automatically accrue intercompany loan interest.",
  },
  {
    question: "What happens if intercompany balances don&apos;t match?",
    answer:
      "If one subsidiary posts an intercompany transaction and the counterparty subsidiary does not post the matching entry, the intercompany balances will not net to zero and the elimination will leave a residual. NetSuite does not natively detect or flag these mismatches before the period is closed. A custom mismatch detection script solves this by running before close and identifying every IC pair where the balances do not net to zero.",
  },
  {
    question: "How does NetSuite handle partial ownership or minority interest?",
    answer:
      "NetSuite OneWorld does not automate partial ownership accounting or minority interest calculations. For joint ventures with non-100% ownership, step acquisitions, or entities requiring equity method accounting, the controller must post manual journal entries to record the minority interest and adjust the consolidation. SuitePacific can assist with building the manual journal entry templates and close checklists for these structures.",
  },
  {
    question: "Can SuiteScript detect intercompany mismatches before the close?",
    answer:
      "Yes. A scheduled script queries the intercompany balances by subsidiary pair, calculates the net position for each pair, and flags any pair where the net is not zero. The script can email the controller a summary of mismatched pairs with the originating transactions, or post the results to a close status Suitelet, before the period is locked.",
  },
  {
    question: "How many subsidiaries can NetSuite OneWorld handle?",
    answer:
      "NetSuite OneWorld supports hundreds of subsidiaries technically, but practical complexity grows with the number of entities and intercompany relationships. For accounts with more than 20 to 30 subsidiaries and complex intercompany structures, the manual verification work before each close grows significantly unless automation is in place to detect mismatches and verify balance status across all pairs.",
  },
];

export const metadata: Metadata = {
  title: "NetSuite Intercompany Elimination: Native vs. Custom",
  description:
    "How NetSuite OneWorld handles intercompany eliminations at consolidation and where custom SuiteScript fills the gaps for complex multi-entity structures.",
  alternates: { canonical: "/netsuite-intercompany-elimination-native-vs-custom" },
  openGraph: {
    title: "NetSuite Intercompany Elimination: Native vs. Custom",
    description:
      "How NetSuite OneWorld handles intercompany eliminations at consolidation and where custom SuiteScript fills the gaps for complex multi-entity structures.",
    url: `${SITE_URL}/netsuite-intercompany-elimination-native-vs-custom`,
    type: "website",
    images: [{ url: `${SITE_URL}/og-default.png`, width: 1200, height: 630 }],
  },
};

export default function IntercompanyEliminationPage() {
  return (
    <main className="pt-32 pb-24 sm:pt-40 sm:pb-32">
      <BreadcrumbJsonLd
        items={[
          { name: "Home", url: SITE_URL },
          { name: "NetSuite Intercompany Elimination: Native vs. Custom", url: `${SITE_URL}/netsuite-intercompany-elimination-native-vs-custom` },
        ]}
      />
      <FaqJsonLd items={FAQ} />
      <ServiceJsonLd
        name="NetSuite Intercompany Elimination Support"
        description="Multi-entity NetSuite account support for intercompany elimination: mismatch detection scripts, IC loan interest automation, management fee allocation, and reconciliation Suitelets for OneWorld accounts."
        url={`${SITE_URL}/netsuite-intercompany-elimination-native-vs-custom`}
        serviceType="NetSuite Multi-Entity Accounting"
        offers={[
          { name: "Care", price: 799, description: "10 hours/month: IC mismatch detection, elimination review, and ongoing multi-entity support. Month-to-month after 3-month minimum." },
          { name: "Care Plus", price: 1499, description: "20 hours/month: IC automation scripts, reconciliation Suitelet, and broader OneWorld administration. Month-to-month." },
          { name: "Care Pro", price: 2499, description: "35 hours/month: full multi-entity NetSuite support including SuiteScript development and close automation. Month-to-month." },
        ]}
      />
      <OrganizationJsonLd />

      <div className="mx-auto max-w-3xl px-6 lg:px-8">
        <SectionHeading
          as="h1"
          eyebrow="Multi-Entity Accounting"
          title="NetSuite Intercompany Elimination: What OneWorld Handles and What Needs Custom Scripts"
          subtitle="How NetSuite OneWorld handles intercompany eliminations at consolidation and where custom SuiteScript fills the gaps for complex multi-entity structures."
          align="left"
        />

        <div className="mt-6 rounded-2xl border border-brand-100 bg-white p-5 shadow-soft">
          <p className="text-sm font-medium text-brand-700 mb-3">Multi-entity NetSuite account with intercompany elimination issues? SuitePacific works with OneWorld accounts to fix what the native consolidation misses.</p>
          <LeadFormLight />
        </div>

        <p className="mt-3 text-xs text-brand-400">
          <time dateTime="2026-10">Published October 2026</time>
        </p>

        <div className="mt-6 rounded-2xl border border-brand-100 bg-brand-50/40 p-5">
          <p className="text-xs font-semibold uppercase tracking-wide text-accent mb-2">Quick answer</p>
          <p className="text-sm text-brand-700 leading-relaxed">
            NetSuite OneWorld native intercompany elimination is the automated process by which OneWorld
            removes intercompany balances, such as receivables, payables, revenue, and expense
            transactions between subsidiaries, during the consolidated financial statement run. Custom
            SuiteScript additions are scripts and Suitelets built on top of OneWorld to handle what the
            native module cannot: detecting intercompany mismatches before close, automating accrual
            journal entries for intercompany loans, allocating shared services costs through management
            fee scripts, and surfacing a reconciliation dashboard showing every intercompany pair and
            whether it balances. OneWorld handles standard wholly-owned subsidiary eliminations well. It
            does not detect mismatches before the period locks, does not accrue intercompany interest
            automatically, and does not provide a reconciliation view by subsidiary pair. SuitePacific
            audits multi-entity accounts, identifies the gaps in the native elimination process, and
            builds the scripts that fill them. Plans start at $799 per month.
          </p>
        </div>

        <div className="mt-14">
          <h2 className="text-lg font-semibold text-brand-900 mb-2">What does OneWorld handle natively for intercompany?</h2>
          <p className="text-sm text-brand-400 mb-6">
            OneWorld automates the most common intercompany scenarios for straightforward multi-entity structures. For standard wholly-owned subsidiaries with clean transaction matching, the native automation is sufficient.
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            {NATIVE_CAPABILITIES.map((item) => (
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

        <div className="mt-14">
          <h2 className="text-lg font-semibold text-brand-900 mb-2">Where does native OneWorld fall short for intercompany?</h2>
          <p className="text-sm text-brand-400 mb-6">
            The native automation breaks down when ownership is complex, when subsidiaries post mismatched entries, or when the structure includes intercompany loans with interest and management fee allocations.
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            {NATIVE_GAPS.map((item) => (
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

        <div className="mt-14">
          <h2 className="text-lg font-semibold text-brand-900 mb-5">Capability comparison: OneWorld native vs. with custom SuiteScript</h2>
          <div className="overflow-x-auto rounded-2xl border border-brand-100">
            <table className="w-full text-sm min-w-[520px]">
              <thead>
                <tr className="border-b border-brand-100 bg-brand-50/50">
                  <th className="text-left p-4 font-semibold text-brand-900">Capability</th>
                  <th className="text-left p-4 font-semibold text-brand-900">OneWorld Native</th>
                  <th className="text-left p-4 font-semibold text-brand-900">With Custom SuiteScript</th>
                </tr>
              </thead>
              <tbody>
                {COMPARISON_ROWS.map((row, i) => (
                  <tr key={row.capability} className={i < COMPARISON_ROWS.length - 1 ? "border-b border-brand-100" : ""}>
                    <td className="p-4 font-medium text-brand-700 align-top">{row.capability}</td>
                    <td className="p-4 text-brand-400 align-top text-[13px]">{row.native}</td>
                    <td className="p-4 text-brand-400 align-top text-[13px]">{row.custom}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        <div className="mt-14">
          <h2 className="text-lg font-semibold text-brand-900 mb-3">When is OneWorld native intercompany sufficient?</h2>
          <p className="text-sm text-brand-400 leading-relaxed">
            OneWorld native elimination is sufficient when all subsidiaries are wholly owned, when intercompany transactions are standard (sales between entities at cost or fixed markup, straightforward loans with no interest accrual requirement), and when the controller can verify balance matching manually each period without it becoming a significant time burden. For accounts with three to seven subsidiaries in straightforward structures, the native automation typically handles the consolidation without gaps.
          </p>
        </div>

        <div className="mt-10">
          <h2 className="text-lg font-semibold text-brand-900 mb-3">When do custom SuiteScript additions become necessary?</h2>
          <p className="text-sm text-brand-400 mb-6 leading-relaxed">
            Custom additions become necessary when there are more than 10 to 15 subsidiaries and manual mismatch verification before close is taking meaningful time; when the structure includes intercompany loans with interest that needs to accrue monthly; when management fees or shared services are allocated across entities based on a driver; or when the close checklist includes a manual step for verifying IC balance status that risks being skipped under time pressure.
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            {SCRIPT_ADDITIONS.map((item) => (
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

        <div className="mt-10 rounded-2xl border border-accent/20 bg-accent/5 p-6">
          <p className="text-xs font-semibold uppercase tracking-wide text-accent mb-2">How SuitePacific helps</p>
          <p className="text-sm text-brand-700 leading-relaxed">
            SuitePacific audits multi-entity NetSuite accounts to identify intercompany gaps, then builds the scripts and dashboards needed to close cleanly. This includes IC mismatch detection scripts, automated accrual JEs for intercompany loans, and a Suitelet that shows the controller the status of every intercompany pair before the books close. Month-to-month from $799.
          </p>
        </div>

        <div className="mt-10 rounded-2xl border border-brand-100 bg-brand-50/30 p-5 sm:p-6">
          <p className="text-sm font-semibold text-brand-900 mb-3">Related reading</p>
          <ul className="space-y-2.5">
            <li className="text-sm text-brand-400">
              <Link href="/netsuite-oneworld-support" className="text-accent hover:underline">
                NetSuite OneWorld support
              </Link>{" "}
              covers the full scope of OneWorld administration and multi-entity configuration.
            </li>
            <li className="text-sm text-brand-400">
              <Link href="/netsuite-financial-close-manual-vs-automated" className="text-accent hover:underline">
                NetSuite month-end close: manual vs. automated
              </Link>{" "}
              covers how SuiteScript automation reduces close time, including intercompany checks.
            </li>
            <li className="text-sm text-brand-400">
              <Link href="/netsuite-suitescript-development" className="text-accent hover:underline">
                NetSuite SuiteScript development
              </Link>{" "}
              covers the full scope of custom script and Suitelet builds for live accounts.
            </li>
          </ul>
        </div>

        <ServiceFaqSection items={FAQ} />

        <div className="mt-10 rounded-2xl border border-brand-100 bg-white p-5 shadow-soft">
          <p className="text-sm font-medium text-brand-700 mb-3">Ready to get the right approach in place? SuitePacific works with live NetSuite accounts month-to-month.</p>
          <LeadFormLight />
        </div>
      </div>
    </main>
  );
}

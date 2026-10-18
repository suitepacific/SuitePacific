import type { Metadata } from "next";
import Link from "next/link";
import { CheckCircle2, XCircle, CreditCard, Smartphone } from "lucide-react";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Card } from "@/components/ui/Card";
import { IconBadge } from "@/components/ui/IconBadge";
import { BreadcrumbJsonLd, FaqJsonLd, ServiceJsonLd, OrganizationJsonLd } from "@/components/seo/JsonLd";
import { ServiceFaqSection } from "@/components/ui/ServiceFaqSection";
import { LeadFormLight } from "@/components/sections/LeadFormLight";
import { SITE_URL } from "@/lib/content";

const COMPARISON_ROWS = [
  { capability: "Receipt OCR scanning", native: "No (manual upload)", expensify: "Yes", ramp: "Yes" },
  { capability: "Corporate card reconciliation", native: "Manual CSV import", expensify: "Real-time auto-match", ramp: "Real-time (own card)" },
  { capability: "Policy auto-enforcement", native: "Manual approver review", expensify: "Automatic flags pre-approval", ramp: "Card-level policy controls" },
  { capability: "Mobile submission", native: "Basic via NetSuite app", expensify: "Full-featured mobile app", ramp: "Full-featured mobile app" },
  { capability: "Approval routing", native: "SuiteFlow workflow", expensify: "Policy-based routing", ramp: "Policy-based routing" },
  { capability: "NetSuite GL sync", native: "Native (no sync needed)", expensify: "Yes (integration required)", ramp: "Yes (integration required)" },
  { capability: "Annual cost", native: "Included in NetSuite license", expensify: "Additional subscription", ramp: "Free (revenue from card)" },
  { capability: "Admin effort", native: "Low (native config)", expensify: "Medium (integration maintenance)", ramp: "Low after setup" },
];

const NATIVE_STRENGTHS = [
  {
    icon: CheckCircle2,
    title: "GL account coding per line",
    description:
      "Employees code each expense line to a GL account, department, and class directly in the NetSuite expense form. The coding goes straight to the general ledger with no sync required.",
  },
  {
    icon: CheckCircle2,
    title: "SuiteFlow approval workflow",
    description:
      "Approval routes through SuiteFlow: direct manager review, then finance team review. Custom approval workflows can add multiple levels, delegate approvals, or route based on amount thresholds.",
  },
  {
    icon: CheckCircle2,
    title: "Per diem support",
    description:
      "Configurable per diem rates by location and meal type. Employees select the per diem option and the system calculates the allowance without requiring individual receipt documentation.",
  },
  {
    icon: CheckCircle2,
    title: "Works well for small teams",
    description:
      "For teams under 20 employees with infrequent travel and controlled expense environments, native NetSuite handles the workflow without needing an external platform.",
  },
];

const NATIVE_LIMITATIONS = [
  {
    icon: XCircle,
    title: "No receipt OCR",
    description:
      "Employees must manually upload receipt files and type in the merchant, amount, and date. There is no automatic extraction from a photo of the receipt.",
  },
  {
    icon: XCircle,
    title: "Manual corporate card reconciliation",
    description:
      "Credit card transactions require a manual CSV download from the bank, then an import into NetSuite. This is a monthly or weekly manual process for the finance team.",
  },
  {
    icon: XCircle,
    title: "No automatic policy enforcement",
    description:
      "Policy compliance depends on the approver manually reviewing each expense for out-of-policy items. There are no automatic flags before the report reaches the approver.",
  },
  {
    icon: Smartphone,
    title: "Limited mobile experience",
    description:
      "The NetSuite mobile app provides basic expense submission but lacks the photo-to-expense workflow and real-time card feed that dedicated tools offer for frequent travelers.",
  },
];

const FAQ = [
  {
    question: "What does native NetSuite expense management include?",
    answer:
      "Native NetSuite expense management includes an expense report form where employees add line items coded to GL accounts, departments, and classes; manual receipt attachment as file uploads; SuiteFlow-based approval workflows routed to managers and finance reviewers; per diem rate configuration; and credit card import via manual CSV download and import. It does not include receipt OCR scanning, real-time corporate card transaction feeds, automatic policy enforcement, or the mobile-first expense capture workflow that dedicated platforms provide.",
  },
  {
    question: "How does Expensify integrate with NetSuite?",
    answer:
      "Expensify connects to NetSuite through a built-in integration that maps Expensify expense categories to NetSuite GL accounts, departments, and classes. When an expense report is approved in Expensify, it syncs to NetSuite as an expense report record with the correct coding. The integration also supports multi-subsidiary setups, allowing Expensify to route reports to the correct subsidiary in a OneWorld account. SuitePacific can configure and test this integration to ensure the GL mapping is correct and the sync handles edge cases like multi-currency expenses.",
  },
  {
    question: "What is the difference between Expensify and Ramp?",
    answer:
      "Expensify is an expense management platform that works with any corporate card: employees submit receipts, the tool matches them to card transactions, and the approved report syncs to the accounting system. Ramp is a corporate card plus expense management platform in one: Ramp issues the corporate cards directly and manages the expense reporting on the same platform. Ramp is the better fit when the company is also looking to replace its existing corporate card program. Expensify is the better fit when the company wants to keep its existing card relationships and add better expense management on top.",
  },
  {
    question: "When should I add an expense management tool to NetSuite?",
    answer:
      "The clearest signal is when employees are spending meaningful time manually entering receipts, or when the finance team is spending more than a day per month reconciling corporate card statements from CSV downloads. For teams over 15 employees with frequent business travel and active corporate card programs, the efficiency gain from receipt OCR and real-time card reconciliation typically pays for the subscription within one to two months. If the controller is manually matching card transactions to receipts every period, that time cost is the justification.",
  },
  {
    question: "Can NetSuite enforce expense policies automatically?",
    answer:
      "Not natively. The standard NetSuite expense report form does not flag out-of-policy expenses before the report reaches the approver. A SuiteScript User Event script can add validation logic: when a report is submitted, the script checks each line against configured policy rules (meal amount limits, missing receipt flags, duplicate submission detection) and either warns the employee or blocks submission. Expensify and Ramp both handle this natively without custom scripts.",
  },
  {
    question: "How long does it take to connect Expensify to NetSuite?",
    answer:
      "A straightforward Expensify-to-NetSuite integration typically takes two to four weeks including GL account mapping, subsidiary configuration for OneWorld accounts, testing in Sandbox, and production deployment. The timeline extends when the GL account structure requires complex mapping rules, when the account uses multi-currency, or when the approval workflow in Expensify needs to align with custom approval roles in NetSuite. SuitePacific scopes the integration after reviewing the account structure before estimating the timeline.",
  },
];

export const metadata: Metadata = {
  title: "NetSuite Native Expenses vs. Expensify Integration",
  description:
    "When native NetSuite expense reports are sufficient and when integrating Expensify, Ramp, or Concur adds real value for a controller at a live NetSuite account.",
  alternates: { canonical: "/netsuite-expense-management-native-vs-expensify" },
  openGraph: {
    title: "NetSuite Native Expenses vs. Expensify Integration",
    description:
      "When native NetSuite expense reports are sufficient and when integrating Expensify, Ramp, or Concur adds real value for a controller at a live NetSuite account.",
    url: `${SITE_URL}/netsuite-expense-management-native-vs-expensify`,
    type: "website",
    images: [{ url: `${SITE_URL}/og-default.png`, width: 1200, height: 630 }],
  },
};

export default function ExpenseManagementPage() {
  return (
    <main className="pt-32 pb-24 sm:pt-40 sm:pb-32">
      <BreadcrumbJsonLd
        items={[
          { name: "Home", url: SITE_URL },
          { name: "NetSuite Native Expenses vs. Expensify Integration", url: `${SITE_URL}/netsuite-expense-management-native-vs-expensify` },
        ]}
      />
      <FaqJsonLd items={FAQ} />
      <ServiceJsonLd
        name="NetSuite Expense Management Integration"
        description="Expense management evaluation and integration for live NetSuite accounts: native configuration, Expensify integration, Ramp integration, and expense-to-GL workflow testing."
        url={`${SITE_URL}/netsuite-expense-management-native-vs-expensify`}
        serviceType="NetSuite Expense Integration"
        offers={[
          { name: "Care", price: 799, description: "10 hours/month: expense workflow review, native configuration, and integration planning. Month-to-month after 3-month minimum." },
          { name: "Care Plus", price: 1499, description: "20 hours/month: Expensify or Ramp integration build, GL mapping, Sandbox testing. Month-to-month." },
          { name: "Care Pro", price: 2499, description: "35 hours/month: full expense integration, policy automation, and ongoing NetSuite support. Month-to-month." },
        ]}
      />
      <OrganizationJsonLd />

      <div className="mx-auto max-w-3xl px-6 lg:px-8">
        <SectionHeading
          as="h1"
          eyebrow="Expense Management"
          title="NetSuite Native Expense Reports vs. Expensify: What Controllers at Live Accounts Need to Know"
          subtitle="When native NetSuite expense reports are sufficient and when integrating Expensify, Ramp, or Concur adds value for a live account."
          align="left"
        />

        <div className="mt-6 rounded-2xl border border-brand-100 bg-white p-5 shadow-soft">
          <p className="text-sm font-medium text-brand-700 mb-3">Controller managing expenses in NetSuite and looking for a better process? SuitePacific helps live accounts evaluate and connect the right expense solution.</p>
          <LeadFormLight />
        </div>

        <p className="mt-3 text-xs text-brand-400">
          <time dateTime="2026-10">Published October 2026</time>
        </p>

        <div className="mt-6 rounded-2xl border border-brand-100 bg-brand-50/40 p-5">
          <p className="text-xs font-semibold uppercase tracking-wide text-accent mb-2">Quick answer</p>
          <p className="text-sm text-brand-700 leading-relaxed">
            Native NetSuite expense management is the built-in expense report module where employees submit
            expenses through the NetSuite form, attach receipts manually, and route reports for approval
            through SuiteFlow workflows. Expensify is a standalone expense management platform that adds
            receipt OCR scanning, real-time corporate card reconciliation, and automatic policy
            enforcement before the approver sees the report. Ramp combines a corporate card program with
            expense management and provides real-time spend visibility with AI-powered GL coding
            suggestions that sync to NetSuite. Concur is an enterprise expense and travel booking platform
            suited for larger companies with complex travel programs. Native NetSuite works well for small
            teams with infrequent travel. When the team exceeds fifteen employees, uses corporate cards
            frequently, or the finance team spends more than a day per month reconciling card statements,
            an integrated tool pays for itself quickly. SuitePacific helps live accounts evaluate the
            options and build the NetSuite integration. Plans start at $799 per month.
          </p>
        </div>

        <div className="mt-14">
          <h2 className="text-lg font-semibold text-brand-900 mb-2">What does native NetSuite expense management include?</h2>
          <p className="text-sm text-brand-400 mb-6">
            The native module handles the core expense workflow for small teams without requiring an additional platform or integration.
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            {NATIVE_STRENGTHS.map((item) => (
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
          <h2 className="text-lg font-semibold text-brand-900 mb-2">Where does native NetSuite expense management fall short?</h2>
          <p className="text-sm text-brand-400 mb-6">
            As teams grow and corporate card usage increases, the manual steps in the native process accumulate into a monthly burden that dedicated tools are designed to eliminate.
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            {NATIVE_LIMITATIONS.map((item) => (
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
          <h2 className="text-lg font-semibold text-brand-900 mb-5">Capability comparison: Native NetSuite vs. Expensify vs. Ramp</h2>
          <div className="overflow-x-auto rounded-2xl border border-brand-100">
            <table className="w-full text-sm min-w-[580px]">
              <thead>
                <tr className="border-b border-brand-100 bg-brand-50/50">
                  <th className="text-left p-4 font-semibold text-brand-900">Capability</th>
                  <th className="text-left p-4 font-semibold text-brand-900">Native NetSuite</th>
                  <th className="text-left p-4 font-semibold text-brand-900">Expensify</th>
                  <th className="text-left p-4 font-semibold text-brand-900">Ramp</th>
                </tr>
              </thead>
              <tbody>
                {COMPARISON_ROWS.map((row, i) => (
                  <tr key={row.capability} className={i < COMPARISON_ROWS.length - 1 ? "border-b border-brand-100" : ""}>
                    <td className="p-4 font-medium text-brand-700 align-top">{row.capability}</td>
                    <td className="p-4 text-brand-400 align-top text-[13px]">{row.native}</td>
                    <td className="p-4 text-brand-400 align-top text-[13px]">{row.expensify}</td>
                    <td className="p-4 text-brand-400 align-top text-[13px]">{row.ramp}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        <div className="mt-14">
          <h2 className="text-lg font-semibold text-brand-900 mb-3">When is native NetSuite expense management the right choice?</h2>
          <p className="text-sm text-brand-400 leading-relaxed">
            Native NetSuite is the right choice for small teams (under 20 employees submitting expenses), low travel frequency, controlled environments where the finance team reviews every expense manually, and accounts where adding and maintaining an external integration is more overhead than the efficiency gain justifies. If the finance team closes expenses in a day or two without significant friction, adding an external tool adds integration complexity without a meaningful return.
          </p>
        </div>

        <div className="mt-10">
          <h2 className="text-lg font-semibold text-brand-900 mb-3">When does an integrated expense tool become the better option?</h2>
          <p className="text-sm text-brand-400 leading-relaxed">
            The clearest signal is employees spending meaningful time photographing receipts and manually entering the merchant, amount, and date into NetSuite, or the finance team spending more than a day per month downloading CSV files from the bank and importing card transactions. For teams with 15 or more employees on active corporate card programs, the receipt OCR and automatic card reconciliation in Expensify or Ramp eliminates the most time-consuming manual steps on both sides of the expense process. Concur becomes the better option when the company has 500 or more employees and significant domestic and international travel with complex travel booking requirements.
          </p>
        </div>

        <div className="mt-10 rounded-2xl border border-accent/20 bg-accent/5 p-6">
          <p className="text-xs font-semibold uppercase tracking-wide text-accent mb-2">How SuitePacific helps</p>
          <p className="text-sm text-brand-700 leading-relaxed">
            SuitePacific reviews each account&apos;s expense volume, headcount, and corporate card setup to recommend whether native NetSuite or an integrated tool fits better. When an integration is the right call, SuitePacific builds the NetSuite connector, maps GL accounts and subsidiaries, and tests the full expense-to-GL workflow in Sandbox. Month-to-month from $799.
          </p>
        </div>

        <div className="mt-10 rounded-2xl border border-brand-100 bg-brand-50/30 p-5 sm:p-6">
          <p className="text-sm font-semibold text-brand-900 mb-3">Related reading</p>
          <ul className="space-y-2.5">
            <li className="text-sm text-brand-400">
              <Link href="/netsuite-ap-automation-native-vs-tipalti" className="text-accent hover:underline">
                NetSuite AP automation: native vs. Tipalti
              </Link>{" "}
              covers the parallel decision for vendor payment automation.
            </li>
            <li className="text-sm text-brand-400">
              <Link href="/netsuite-workflow-automation" className="text-accent hover:underline">
                NetSuite workflow automation
              </Link>{" "}
              covers SuiteFlow configuration for approval routing and process automation.
            </li>
            <li className="text-sm text-brand-400">
              <Link href="/netsuite-post-go-live-support" className="text-accent hover:underline">
                NetSuite post-go-live support
              </Link>{" "}
              covers ongoing support for live accounts evaluating and implementing integrations.
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

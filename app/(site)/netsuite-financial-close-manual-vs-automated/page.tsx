import type { Metadata } from "next";
import Link from "next/link";
import { Code2, Workflow, Monitor, Shield, BarChart2 } from "lucide-react";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Card } from "@/components/ui/Card";
import { IconBadge } from "@/components/ui/IconBadge";
import { BreadcrumbJsonLd, FaqJsonLd, ServiceJsonLd, OrganizationJsonLd } from "@/components/seo/JsonLd";
import { ServiceFaqSection } from "@/components/ui/ServiceFaqSection";
import { LeadFormLight } from "@/components/sections/LeadFormLight";
import { SITE_URL } from "@/lib/content";

const COMPARISON_ROWS = [
  { task: "Department reminders", manual: "Controller sends emails manually at close start", automated: "Scheduled script emails each head with their specific open items" },
  { task: "Recurring JEs", manual: "Controller posts each entry manually", automated: "Script posts standard entries automatically at period end" },
  { task: "Close status visibility", manual: "Spreadsheet updated manually", automated: "Live Suitelet dashboard updated as items complete" },
  { task: "Period lock guard", manual: "Controller locks period when satisfied", automated: "Script checks all conditions before allowing lock" },
  { task: "Bank rec matching", manual: "Manual transaction-by-transaction matching", automated: "Map/Reduce script flags unmatched items for review" },
  { task: "Intercompany check", manual: "Manual balance review per subsidiary pair", automated: "Script flags mismatched IC pairs before lock" },
  { task: "Controller effort (days)", manual: "6-10 business days", automated: "3-5 business days" },
  { task: "Time to close", manual: "8-10 days average for mid-market", automated: "3-5 days average after automation is in place" },
];

const AUTOMATION_ITEMS = [
  {
    icon: Code2,
    title: "Automated department reminder script",
    description:
      "A scheduled script runs on the first day of close, queries NetSuite for each department&apos;s outstanding items (unapproved expense reports, unbilled time, open POs past due date), and sends each department head a personalized email listing their specific items. No more manual follow-up.",
  },
  {
    icon: Workflow,
    title: "Recurring journal entry automation",
    description:
      "A scheduled script runs at period end and posts standard recurring journal entries automatically: prepaid amortization based on a prepaid schedule, fixed monthly accruals for known recurring costs, and intercompany management fee entries.",
  },
  {
    icon: Monitor,
    title: "Pre-close checklist Suitelet",
    description:
      "A dashboard showing the controller the live status of every close item, updated in real time as items are completed. Department heads mark their items complete directly in the Suitelet. The controller sees at a glance what is open without maintaining a spreadsheet.",
  },
  {
    icon: Shield,
    title: "Period lock guard",
    description:
      "A User Event script fires when the controller attempts to lock the period. It checks all configured conditions: no unapproved expense reports above threshold, no open vendor bills past due date, all bank accounts reconciled, all intercompany pairs balanced. If any condition fails, the script blocks the lock and shows exactly what is open.",
  },
  {
    icon: BarChart2,
    title: "Bank reconciliation match script",
    description:
      "A Map/Reduce script imports the bank statement and matches transactions against NetSuite records, flagging unmatched items for manual review. This dramatically reduces the time the controller spends on manual transaction matching.",
  },
];

const FAQ = [
  {
    question: "What is the typical NetSuite month-end close process?",
    answer:
      "A typical NetSuite month-end close involves the controller sending reminders to department heads to submit outstanding items, manually posting standard recurring journal entries such as prepaid amortization and accruals, reviewing open transaction lists to identify anything that needs to be resolved, verifying that intercompany balances are in balance across subsidiaries, reconciling bank accounts, and locking the accounting period. For mid-market accounts without automation, this process typically takes six to ten business days. The bottleneck is usually waiting for department heads to respond and manually posting standard entries.",
  },
  {
    question: "Can SuiteScript automate journal entries in NetSuite?",
    answer:
      "Yes. A scheduled SuiteScript script can post recurring journal entries automatically at the end of each period. Common examples include prepaid amortization based on a prepaid schedule maintained as a custom record, fixed monthly accruals for known recurring costs such as rent and utilities, and intercompany management fee entries. The script reads the schedule, calculates the amount, and creates the journal entry in the correct period without manual input from the controller.",
  },
  {
    question: "How do I prevent a period from being locked too early?",
    answer:
      "A User Event script attached to the period lock action can check a set of conditions before allowing the period to close. If any condition is not met, such as unapproved expense reports above a threshold, open vendor bills past the due date, or bank accounts that are not reconciled, the script displays an error listing what is still open and prevents the lock from completing. The controller can review and resolve the open items, then re-attempt the lock. SuitePacific builds and configures this period lock guard as part of close automation engagements.",
  },
  {
    question: "What is a pre-close Suitelet?",
    answer:
      "A pre-close Suitelet is a custom page inside NetSuite that shows the real-time status of every close checklist item. Instead of the controller maintaining a spreadsheet and manually checking the status of each step, the Suitelet queries NetSuite in real time and shows which items are complete (green) and which are still open (red). Department heads can mark their items complete directly in the Suitelet, and the controller sees the updated status without needing to follow up individually.",
  },
  {
    question: "How long does it take to build close automation in NetSuite?",
    answer:
      "The build timeline depends on the number of automation components and the complexity of the account&apos;s close process. A standard close automation engagement covering the reminder script, recurring JE automation, a pre-close Suitelet, and a period lock guard typically takes four to eight weeks from kickoff through Sandbox testing and production deployment. SuitePacific maps the existing close process first to identify the highest-effort manual steps before building, so the automation addresses the actual bottlenecks.",
  },
  {
    question: "Can NetSuite send automatic reminders during close?",
    answer:
      "Not natively. The standard NetSuite platform does not send automatic close reminders to department heads based on their outstanding items. A scheduled SuiteScript script provides this capability: the script runs on the configured close start date, queries each department&apos;s open items from the NetSuite transaction records, and sends a personalized email to each department head listing exactly what they need to address. The emails are sent without any manual action from the controller.",
  },
];

export const metadata: Metadata = {
  title: "NetSuite Month-End Close: Manual vs. Automated Process",
  description:
    "How far the standard NetSuite month-end close goes and where SuiteScript automation reduces close time and manual effort for controllers at live accounts.",
  alternates: { canonical: "/netsuite-financial-close-manual-vs-automated" },
  openGraph: {
    title: "NetSuite Month-End Close: Manual vs. Automated Process",
    description:
      "How far the standard NetSuite month-end close goes and where SuiteScript automation reduces close time and manual effort for controllers at live accounts.",
    url: `${SITE_URL}/netsuite-financial-close-manual-vs-automated`,
    type: "website",
    images: [{ url: `${SITE_URL}/og-default.png`, width: 1200, height: 630 }],
  },
};

export default function FinancialClosePage() {
  return (
    <main className="pt-32 pb-24 sm:pt-40 sm:pb-32">
      <BreadcrumbJsonLd
        items={[
          { name: "Home", url: SITE_URL },
          { name: "NetSuite Month-End Close: Manual vs. Automated", url: `${SITE_URL}/netsuite-financial-close-manual-vs-automated` },
        ]}
      />
      <FaqJsonLd items={FAQ} />
      <ServiceJsonLd
        name="NetSuite Month-End Close Automation"
        description="SuiteScript close automation for live NetSuite accounts: department reminder scripts, recurring JE automation, pre-close Suitelet dashboards, period lock guards, and bank reconciliation matching."
        url={`${SITE_URL}/netsuite-financial-close-manual-vs-automated`}
        serviceType="NetSuite Close Automation"
        offers={[
          { name: "Care", price: 799, description: "10 hours/month: close process review, reminder script, and recurring JE automation. Month-to-month after 3-month minimum." },
          { name: "Care Plus", price: 1499, description: "20 hours/month: full close automation suite including Suitelet, period lock guard, and bank rec matching. Month-to-month." },
          { name: "Care Pro", price: 2499, description: "35 hours/month: comprehensive close automation, intercompany checks, and ongoing SuiteScript development. Month-to-month." },
        ]}
      />
      <OrganizationJsonLd />

      <div className="mx-auto max-w-3xl px-6 lg:px-8">
        <SectionHeading
          as="h1"
          eyebrow="Financial Close"
          title="NetSuite Month-End Close: What Can Be Automated and What SuiteScript Adds"
          subtitle="How far the standard NetSuite close process goes and where SuiteScript automation reduces close time for controllers at live accounts."
          align="left"
        />

        <div className="mt-6 rounded-2xl border border-brand-100 bg-white p-5 shadow-soft">
          <p className="text-sm font-medium text-brand-700 mb-3">Controller spending 7-10 days on the NetSuite month-end close? SuitePacific builds close automation for live accounts.</p>
          <LeadFormLight />
        </div>

        <p className="mt-3 text-xs text-brand-400">
          <time dateTime="2026-10">Published October 2026</time>
        </p>

        <div className="mt-6 rounded-2xl border border-brand-100 bg-brand-50/40 p-5">
          <p className="text-xs font-semibold uppercase tracking-wide text-accent mb-2">Quick answer</p>
          <p className="text-sm text-brand-700 leading-relaxed">
            The manual NetSuite month-end close is the close process that relies on the controller manually
            sending reminders to department heads, manually posting recurring journal entries, manually
            checking open transaction lists, and manually verifying intercompany balance status before
            locking the accounting period. SuiteScript automation refers to scheduled scripts, User Event
            scripts, and Suitelets built inside NetSuite that handle those manual steps automatically:
            sending personalized outstanding-item emails to each department head, posting standard
            recurring journal entries at period end, providing a live close checklist Suitelet, enforcing
            a pre-close guard that prevents period lock if conditions are not met, and matching bank
            statement transactions against NetSuite records. A well-configured close automation typically
            reduces close time from eight to ten business days to three to five days. SuitePacific maps
            each account&apos;s close process, identifies the highest-effort manual steps, and builds the
            automation that eliminates them. Plans start at $799 per month.
          </p>
        </div>

        <div className="mt-14">
          <h2 className="text-lg font-semibold text-brand-900 mb-2">What does the manual NetSuite close look like?</h2>
          <p className="text-sm text-brand-400 leading-relaxed">
            In a typical mid-market NetSuite account without close automation, the controller maintains a spreadsheet checklist of 20 to 40 items. The controller manually emails department heads at close start to remind them to submit expense reports, approve purchase orders, and post accruals. Open transaction lists are reviewed by hand: open vendor bills, unapproved expense reports, unreconciled bank statements. Standard recurring journal entries, including prepaid amortization, depreciation runs, and known monthly accruals, are posted manually. Intercompany balances are verified by running reports and comparing subsidiary balances by hand. The period is locked only after the controller is satisfied that everything is in order.
          </p>
          <p className="mt-3 text-sm text-brand-400">
            The result: six to ten business days on average for mid-market accounts. The bottleneck is waiting for department heads to respond and manually posting entries that follow a predictable schedule every period.
          </p>
        </div>

        <div className="mt-14">
          <h2 className="text-lg font-semibold text-brand-900 mb-2">What does SuiteScript automation add to the close process?</h2>
          <p className="text-sm text-brand-400 mb-6">
            Each automation component targets a specific manual step in the close process. The components work independently, so the build can start with the highest-impact step and add more over time.
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            {AUTOMATION_ITEMS.map((item) => (
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
          <h2 className="text-lg font-semibold text-brand-900 mb-5">Close task comparison: manual vs. with SuiteScript automation</h2>
          <div className="overflow-x-auto rounded-2xl border border-brand-100">
            <table className="w-full text-sm min-w-[520px]">
              <thead>
                <tr className="border-b border-brand-100 bg-brand-50/50">
                  <th className="text-left p-4 font-semibold text-brand-900">Close task</th>
                  <th className="text-left p-4 font-semibold text-brand-900">Manual process</th>
                  <th className="text-left p-4 font-semibold text-brand-900">With SuiteScript automation</th>
                </tr>
              </thead>
              <tbody>
                {COMPARISON_ROWS.map((row, i) => (
                  <tr key={row.task} className={i < COMPARISON_ROWS.length - 1 ? "border-b border-brand-100" : ""}>
                    <td className="p-4 font-medium text-brand-700 align-top">{row.task}</td>
                    <td className="p-4 text-brand-400 align-top text-[13px]">{row.manual}</td>
                    <td className="p-4 text-brand-400 align-top text-[13px]">{row.automated}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        <div className="mt-14">
          <h2 className="text-lg font-semibold text-brand-900 mb-3">When is the manual close process sufficient?</h2>
          <p className="text-sm text-brand-400 leading-relaxed">
            The manual close is sufficient when the team is small (fewer than 20 people submitting expenses), when recurring journal entries are few and straightforward, when the controller can complete the close in three to four days without automation, and when there is no urgency to accelerate the reporting cycle. Small accounts that close in three days with no significant bottlenecks are unlikely to see a return on close automation investment.
          </p>
        </div>

        <div className="mt-10">
          <h2 className="text-lg font-semibold text-brand-900 mb-3">When does close automation become worth building?</h2>
          <p className="text-sm text-brand-400 leading-relaxed">
            Close automation becomes worth building when the close is consistently taking more than five business days, when the controller is spending significant time on manual follow-up with department heads, when the same recurring journal entries are posted every period from a spreadsheet, or when a period has been locked prematurely and then required reopening. Each of those patterns signals a manual step that can be eliminated. The most common starting point is the department reminder script, which typically saves the most time per hour of build effort.
          </p>
        </div>

        <div className="mt-10 rounded-2xl border border-accent/20 bg-accent/5 p-6">
          <p className="text-xs font-semibold uppercase tracking-wide text-accent mb-2">How SuitePacific helps</p>
          <p className="text-sm text-brand-700 leading-relaxed">
            SuitePacific maps each account&apos;s close process, identifies the highest-effort manual steps, and builds the automation scripts that eliminate them. A typical close automation engagement includes the reminder script, recurring JE automation, a pre-close Suitelet, and a period lock guard, all tested in Sandbox before production deployment. Month-to-month from $799.
          </p>
        </div>

        <div className="mt-10 rounded-2xl border border-brand-100 bg-brand-50/30 p-5 sm:p-6">
          <p className="text-sm font-semibold text-brand-900 mb-3">Related reading</p>
          <ul className="space-y-2.5">
            <li className="text-sm text-brand-400">
              <Link href="/netsuite-suitescript-development" className="text-accent hover:underline">
                NetSuite SuiteScript development
              </Link>{" "}
              covers the full scope of custom script builds for live accounts.
            </li>
            <li className="text-sm text-brand-400">
              <Link href="/netsuite-workflow-automation" className="text-accent hover:underline">
                NetSuite workflow automation
              </Link>{" "}
              covers SuiteFlow and automated process design across the account.
            </li>
            <li className="text-sm text-brand-400">
              <Link href="/netsuite-intercompany-elimination-native-vs-custom" className="text-accent hover:underline">
                NetSuite intercompany elimination: native vs. custom
              </Link>{" "}
              covers IC mismatch detection and automation relevant to the close process.
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

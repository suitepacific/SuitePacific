import type { Metadata } from "next";
import Link from "next/link";
import { FileText, Settings, BarChart2, AlertTriangle, Calendar, RefreshCcw } from "lucide-react";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Card } from "@/components/ui/Card";
import { IconBadge } from "@/components/ui/IconBadge";
import { BreadcrumbJsonLd, FaqJsonLd, ServiceJsonLd, OrganizationJsonLd } from "@/components/seo/JsonLd";
import { ServiceFaqSection } from "@/components/ui/ServiceFaqSection";
import { LeadFormLight } from "@/components/sections/LeadFormLight";
import { SITE_URL } from "@/lib/content";

const PM_WORKFLOWS = [
  { workflow: "Tenant setup", what: "Customer record per tenant with lease commencement date, expiration, square footage, and rent escalation schedule stored in custom fields" },
  { workflow: "Recurring rent invoicing", what: "Scheduled script generates and posts rent invoices on the first of each month for each active tenant without manual entry" },
  { workflow: "CAM reconciliation", what: "Year-end script compares estimated CAM charges billed during the year against actual recoverable expenses, calculating each tenant&apos;s true-up amount by square footage" },
  { workflow: "Security deposit tracking", what: "Each tenant&apos;s security deposit recorded against a separate liability account and linked to the tenant record; refund or application posted from the record at lease end" },
  { workflow: "Late fee calculation", what: "Script runs after a grace period, identifies invoices unpaid past due date, calculates late fee per lease terms, and posts the fee invoice automatically" },
  { workflow: "Delinquency aging report", what: "Saved search that groups open tenant invoices by age bucket (current, 30, 60, 90+ days) by property and tenant for collections review" },
];

const PM_GAPS = [
  { icon: AlertTriangle, title: "Manual monthly rent invoicing.", description: "Property managers with many tenants who post rent invoices manually each month face errors when invoices are missed, duplicated, or posted at the wrong amount. The manual process is also a bottleneck: invoices are delayed when staff are out, and the timing of recognition varies by who posts them." },
  { icon: AlertTriangle, title: "CAM reconciliation done outside NetSuite.", description: "Year-end common area maintenance reconciliation typically requires a spreadsheet that pulls actual expenses from NetSuite, allocates them by square footage, and compares against the estimated CAM charged during the year. Without a NetSuite script, the reconciliation is a manual process that takes weeks and produces a result that cannot be audited in the system." },
  { icon: AlertTriangle, title: "Security deposits not tracked per tenant.", description: "Security deposits received from tenants must be held in a liability account until the lease ends. Without a separate tracking record per tenant, the liability balance is a single lump sum that cannot be reconciled to individual tenants for return, application against unpaid rent, or dispute documentation." },
  { icon: AlertTriangle, title: "Delinquency tracking requires manual aging analysis.", description: "Identifying delinquent tenants, calculating days past due, and preparing collections reports from NetSuite requires a saved search configured to age receivables by property and tenant. Without this configuration, collections reviews are done by exporting open invoices to a spreadsheet and sorting manually." },
];

const WHAT_WE_DO = [
  { icon: FileText, title: "Tenant record setup", description: "Configure a customer record for each tenant with custom fields for lease commencement date, expiration date, square footage, and rent escalation schedule. Tenant records link to the property subsidiary or class for property-level reporting." },
  { icon: Calendar, title: "Recurring rent invoice automation", description: "Build a scheduled script that reads active tenant records, generates rent invoices for each tenant at the correct amount for the current period, and posts them on a defined date each month. Escalation schedules are read from the tenant record so rent amounts update automatically." },
  { icon: Settings, title: "CAM reconciliation calculation", description: "Write a CAM reconciliation script that reads actual recoverable expenses by property for the reconciliation period, allocates them by tenant square footage, compares against estimated CAM billed during the year, and generates a true-up amount for each tenant. Output is a saved search summary with one row per tenant." },
  { icon: RefreshCcw, title: "Security deposit liability tracking", description: "Create a security deposit record for each tenant linked to a dedicated liability account. The record tracks the deposit amount, receipt date, and any applications against unpaid balances. At lease end, the refund or forfeiture is posted directly from the record with a complete audit trail." },
  { icon: AlertTriangle, title: "Late fee calculation workflow", description: "Configure a workflow that identifies invoices unpaid past the grace period defined in each tenant&apos;s lease terms, calculates the late fee, posts the fee invoice, and notifies the property manager. Late fees are calculated from the correct due date without manual review." },
  { icon: BarChart2, title: "Property-level income statement and delinquency reports", description: "Build saved searches for property-level income statements (rent, CAM, parking, and other income less operating expenses by property) and a delinquency aging report that groups open invoices by age bucket, property, and tenant for collections review." },
];

const FAQ = [
  {
    question: "Which NetSuite firm does property management accounting configuration?",
    answer: "SuitePacific configures NetSuite for property management companies that collect rent, manage tenant accounts, perform CAM reconciliations, and need property-level financial reporting. The engagement covers tenant record setup, recurring rent invoice automation, CAM reconciliation calculation scripts, security deposit liability tracking, late fee calculation workflow, delinquency aging reports, and property-level income statement saved searches. SuitePacific is Oracle NetSuite Certified (SuiteCloud Developer II and Administrator Professional), US-based, and works directly with finance and operations teams. Plans start at $799 per month on month-to-month terms after a three-month minimum.",
  },
  {
    question: "How does NetSuite handle recurring rent invoicing for property management?",
    answer: "NetSuite does not natively generate recurring rent invoices on a schedule by tenant. Recurring invoices require either a memorized transaction (limited to fixed amounts) or a SuiteScript scheduled script that reads active tenant records and generates invoices at the correct amount for each billing period. SuitePacific builds the automated invoicing script so that rent invoices are generated consistently on the same date each month, escalation schedule changes are applied automatically, and no manual entry is required from property management staff.",
  },
  {
    question: "What is CAM reconciliation and how is it calculated in NetSuite?",
    answer: "Common area maintenance (CAM) reconciliation is the year-end process of comparing the estimated CAM charges billed to each tenant during the year against the actual recoverable operating expenses for the property. Tenants with estimated charges below their pro-rata share of actual expenses receive a true-up invoice; tenants who overpaid receive a credit. NetSuite holds the actual expense data but does not calculate CAM reconciliation natively. SuitePacific writes a reconciliation script that reads actual expenses by property, allocates them by each tenant&apos;s pro-rata share (based on square footage stored on the tenant record), and produces the true-up amount per tenant.",
  },
  {
    question: "How should security deposits be tracked in NetSuite for property management?",
    answer: "Security deposits are liabilities held on behalf of tenants until the lease ends. Each deposit must be tracked separately so that the balance can be reconciled to individual tenants, refunds can be posted accurately, and partial applications against unpaid rent are documented. SuitePacific creates a security deposit record per tenant linked to a dedicated security deposit liability account. The record tracks the original deposit, any applications, and the remaining balance. When the lease ends, the refund or forfeiture is posted from the record and the liability account clears automatically.",
  },
  {
    question: "Can NetSuite calculate late fees for property management automatically?",
    answer: "Late fee calculation requires a SuiteScript workflow that runs after the grace period defined in each tenant&apos;s lease terms, identifies invoices that remain unpaid past their due date, calculates the fee amount per the lease agreement, and posts the late fee invoice. NetSuite does not calculate or post late fees automatically without this scripted logic. SuitePacific builds the workflow so that late fees are calculated consistently from the correct due date and the property manager is notified when a fee is posted.",
  },
  {
    question: "What does a property-level income statement require in NetSuite?",
    answer: "A property-level income statement requires every revenue and expense transaction to be classified by property using a class, department, or custom segment consistently across all transaction types. Once classification is in place, a saved search or custom report can produce a property-level P&L showing rent income, CAM recovery, operating expenses, and net operating income by property. Without consistent classification, property-level reports cannot be produced from NetSuite and require manual spreadsheet extraction each period. SuitePacific configures the classification segment and builds the saved searches that produce property-level statements on demand.",
  },
];

export const metadata: Metadata = {
  title: "NetSuite Property Management Accounting: Tenant Billing, CAM Reconciliation, and Rent Automation",
  description: "NetSuite property management accounting for companies that collect rent, manage tenant accounts, and need CAM reconciliations and property-level reporting. SuitePacific automates rent invoicing, CAM reconciliation, security deposit tracking, and late fee calculation.",
  alternates: { canonical: "/netsuite-property-management-accounting" },
  openGraph: {
    title: "NetSuite Property Management Accounting: Tenant Billing, CAM Reconciliation, and Rent Automation",
    description: "NetSuite property management accounting for companies that collect rent, manage tenant accounts, and need CAM reconciliations and property-level reporting. SuitePacific automates rent invoicing, CAM reconciliation, security deposit tracking, and late fee calculation.",
    url: `${SITE_URL}/netsuite-property-management-accounting`,
    type: "website",
    images: [{ url: `${SITE_URL}/og-default.png`, width: 1200, height: 630 }],
  },
};

export default function PropertyManagementAccountingPage() {
  return (
    <main className="pt-32 pb-24 sm:pt-40 sm:pb-32">
      <BreadcrumbJsonLd items={[{ name: "Home", url: SITE_URL }, { name: "NetSuite Property Management Accounting", url: `${SITE_URL}/netsuite-property-management-accounting` }]} />
      <FaqJsonLd items={FAQ} />
      <ServiceJsonLd
        name="NetSuite Property Management Accounting"
        description="Property management accounting configuration: tenant record setup, recurring rent invoice automation, CAM reconciliation scripts, security deposit liability tracking, late fee calculation workflows, and property-level financial reporting."
        url={`${SITE_URL}/netsuite-property-management-accounting`}
        serviceType="NetSuite Real Estate Configuration"
        offers={[
          { name: "Care", price: 799, description: "10 hours/month: tenant record maintenance, invoice fixes, delinquency report setup. Month-to-month after 3-month minimum." },
          { name: "Care Plus", price: 1499, description: "20 hours/month: rent automation, CAM reconciliation script, security deposit tracking. Month-to-month." },
          { name: "Care Pro", price: 2499, description: "35 hours/month: complete property management accounting setup including automation, reporting, and ongoing support. Month-to-month." },
        ]}
      />
      <OrganizationJsonLd />
      <div className="mx-auto max-w-3xl px-6 lg:px-8">
        <SectionHeading
          as="h1"
          eyebrow="Real Estate"
          title="NetSuite Property Management Accounting: Tenant Billing, CAM Reconciliation, and Rent Automation"
          subtitle="Property management companies that collect rent, reconcile CAM charges, and report by property need NetSuite automation that does not exist out of the box. SuitePacific configures tenant records, automates recurring rent invoicing, builds CAM reconciliation scripts, and delivers property-level reporting for commercial and residential property managers."
          align="left"
        />
        <div className="mt-6 rounded-2xl border border-brand-100 bg-white p-5 shadow-soft"><LeadFormLight /></div>
        <p className="mt-3 text-xs text-brand-400">NetSuite-certified · Property management specialists · Month-to-month</p>
        <p className="mt-3 text-xs text-brand-300">Last updated September 2026</p>

        <p className="mt-8 text-sm text-brand-400">
          <strong>Property management accounting in NetSuite</strong> refers to the configuration that tracks tenant leases, recurring rent billing, common area maintenance reconciliation, and security deposit liability for commercial and residential property portfolios. Standard NetSuite supports recurring invoicing and customer deposits but does not include a tenant ledger view, CAM reconciliation workflow, or lease expiry alerting without custom builds.
        </p>

        <div className="mt-6 rounded-2xl border-l-4 border-accent bg-brand-50/50 p-5">
          <p className="text-xs font-semibold uppercase tracking-wide text-accent mb-2">Quick answer</p>
          <p className="text-sm text-brand-700 leading-relaxed">SuitePacific configures NetSuite property management accounting for companies that collect rent, manage tenant accounts, perform year-end CAM reconciliations, and need property-level financial reporting. NetSuite holds the transaction data but does not automatically generate recurring rent invoices, calculate CAM true-ups by tenant, track security deposits per tenant as a separate liability, or calculate late fees from lease terms. SuitePacific builds a tenant record model with the fields needed for billing automation, writes a scheduled script for recurring rent invoicing, creates the CAM reconciliation calculation, configures security deposit liability tracking per tenant, builds the late fee workflow, and delivers a delinquency aging report and property-level income statement. Plans start at $799 per month.</p>
        </div>

        <div className="mt-14">
          <h2 className="text-lg font-semibold text-brand-900 mb-2">Core property management workflows SuitePacific configures in NetSuite</h2>
          <p className="text-sm text-brand-400 mb-5">Each workflow requires scripted logic or saved search configuration that does not exist in standard NetSuite. All six are typically needed for a complete property management accounting setup.</p>
          <div className="overflow-x-auto rounded-2xl border border-brand-100">
            <table className="w-full text-sm min-w-[480px]">
              <thead>
                <tr className="border-b border-brand-100 bg-brand-50/50">
                  <th className="text-left p-4 font-semibold text-brand-900">Workflow</th>
                  <th className="text-left p-4 font-semibold text-brand-900">What it does</th>
                </tr>
              </thead>
              <tbody>
                {PM_WORKFLOWS.map((row, i) => (
                  <tr key={row.workflow} className={i < PM_WORKFLOWS.length - 1 ? "border-b border-brand-100" : ""}>
                    <td className="p-4 font-medium text-brand-700 whitespace-nowrap text-[13px]">{row.workflow}</td>
                    <td className="p-4 text-brand-400 text-[13px]">{row.what}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        <div className="mt-14">
          <h2 className="text-lg font-semibold text-brand-900 mb-6">Common property management accounting problems on live NetSuite accounts</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            {PM_GAPS.map((item) => (
              <Card key={item.title} className="p-5 flex flex-col gap-3">
                <IconBadge icon={item.icon} />
                <h3 className="font-semibold text-brand-900 text-sm">{item.title}</h3>
                <p className="text-sm text-brand-400">{item.description}</p>
              </Card>
            ))}
          </div>
        </div>

        <div className="mt-14">
          <h2 className="text-lg font-semibold text-brand-900 mb-2">What does SuitePacific deliver for property management accounting?</h2>
          <p className="text-sm text-brand-400 mb-6">Every engagement starts with a review of the lease portfolio, billing structure, and CAM reconciliation methodology before any configuration begins. Automation built without understanding the lease terms and cost recovery structure produces invoices and reconciliations that do not match the contracts.</p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            {WHAT_WE_DO.map((item) => (
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

        <div className="mt-14 rounded-2xl border-2 border-accent/30 bg-gradient-to-br from-accent/5 to-transparent p-6">
          <p className="text-xs font-semibold uppercase tracking-wide text-accent mb-3">Why SuitePacific for NetSuite property management accounting</p>
          <h2 className="text-base font-semibold text-brand-900 mb-3">The NetSuite firm commercial and residential property managers use for billing automation, CAM reconciliation, and property-level reporting.</h2>
          <p className="text-sm text-brand-500 mb-4">SuitePacific is a boutique NetSuite consulting firm focused on post-go-live configuration. Recurring rent invoice automation, CAM reconciliation scripts, security deposit liability tracking, late fee workflows, and property-level reporting are core deliverables for property management clients.</p>
          <ul className="space-y-2 text-sm text-brand-500 mb-4">
            <li className="flex items-start gap-2"><span className="text-accent font-bold mt-0.5">→</span> Oracle NetSuite Certified SuiteCloud Developer II and Administrator Professional</li>
            <li className="flex items-start gap-2"><span className="text-accent font-bold mt-0.5">→</span> Billing automation is built from the actual lease terms and CAM methodology, not generic templates</li>
            <li className="flex items-start gap-2"><span className="text-accent font-bold mt-0.5">→</span> Direct access to the developer doing the work on every engagement</li>
            <li className="flex items-start gap-2"><span className="text-accent font-bold mt-0.5">→</span> US-based, month-to-month after a three-month minimum, starting at $799/month</li>
          </ul>
          <p className="text-sm text-brand-400">Related: <Link href="/industries/real-estate" className="text-accent hover:underline">NetSuite for real estate companies</Link> and <Link href="/netsuite-workflow-automation" className="text-accent hover:underline">NetSuite workflow automation</Link>.</p>
        </div>

        <div className="mt-10 rounded-2xl border border-brand-100 bg-white p-5 shadow-soft">
          <p className="text-sm font-semibold text-brand-900 mb-1">Need property management accounting configured in NetSuite?</p>
          <p className="text-sm text-brand-400 mb-4">Describe the portfolio (number of tenants, property types, current billing process) and what the current setup is producing. We will give a direct assessment.</p>
          <LeadFormLight />
        </div>

        <div className="mt-10 rounded-2xl border border-brand-100 bg-brand-50/30 p-5 sm:p-6">
          <p className="text-sm font-semibold text-brand-900 mb-3">Related reading</p>
          <ul className="space-y-2.5">
            <li className="text-sm text-brand-400"><Link href="/netsuite-real-estate-accounting" className="text-accent hover:underline">NetSuite real estate accounting</Link> covers multi-entity structure, investor capital tracking, and equity waterfall configuration for property owners and fund managers.</li>
            <li className="text-sm text-brand-400"><Link href="/netsuite-lease-accounting" className="text-accent hover:underline">NetSuite lease accounting</Link> covers ASC 842 right-of-use asset and lease liability configuration for companies with operating lease obligations.</li>
            <li className="text-sm text-brand-400"><Link href="/netsuite-workflow-automation" className="text-accent hover:underline">NetSuite workflow automation</Link> covers approval routing, automated notifications, and record creation workflows for finance and operations teams.</li>
            <li className="text-sm text-brand-400"><Link href="/netsuite-administrator-support" className="text-accent hover:underline">NetSuite administrator support</Link> covers ongoing configuration and script maintenance as part of a monthly retainer.</li>
          </ul>
        </div>

        <ServiceFaqSection items={FAQ} />
        <div className="mt-10 rounded-2xl border border-brand-100 bg-white p-5 shadow-soft">
          <p className="text-sm font-semibold text-brand-900 mb-1">Ready to configure property management accounting in NetSuite?</p>
          <p className="text-sm text-brand-400 mb-4">Tell us about the tenant portfolio and the current state of the billing and reconciliation process. We will scope the engagement.</p>
          <LeadFormLight />
        </div>
      </div>
    </main>
  );
}

import type { Metadata } from "next";
import Link from "next/link";
import { CheckCircle2, XCircle, Code2, AlertCircle } from "lucide-react";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Card } from "@/components/ui/Card";
import { IconBadge } from "@/components/ui/IconBadge";
import { BreadcrumbJsonLd, FaqJsonLd, ServiceJsonLd, OrganizationJsonLd } from "@/components/seo/JsonLd";
import { ServiceFaqSection } from "@/components/ui/ServiceFaqSection";
import { LeadFormLight } from "@/components/sections/LeadFormLight";
import { SITE_URL } from "@/lib/content";

const COMPARISON_ROWS = [
  { capability: "Multi-element arrangement", arm: "Yes", custom: "No" },
  { capability: "SSP allocation", arm: "Yes", custom: "No" },
  { capability: "Contract modifications", arm: "Yes", custom: "No" },
  { capability: "Variable consideration", arm: "Yes", custom: "No" },
  { capability: "Audit trail", arm: "Arrangement-level", custom: "Journal entry only" },
  { capability: "ASC 606 audit-ready", arm: "Yes", custom: "Simple cases only" },
  { capability: "GL posting (deferred revenue)", arm: "Automatic", custom: "Via script logic" },
  { capability: "License cost", arm: "$15k-$50k+/year", custom: "None" },
  { capability: "Developer required", arm: "Configuration only", custom: "Yes, ongoing" },
  { capability: "Maintenance burden", arm: "Low (native)", custom: "Moderate (script upkeep)" },
];

const DECISION_CASES = [
  {
    icon: CheckCircle2,
    title: "ASC 606 audit requirement with bundled contracts",
    description:
      "If your auditors require ASC 606 documentation and your contracts bundle multiple performance obligations (subscription plus professional services, license plus support), the ARM module is required. Custom scripts cannot produce the arrangement-level audit trail auditors need.",
  },
  {
    icon: CheckCircle2,
    title: "Multi-element deals with standalone selling price allocation",
    description:
      "ARM handles SSP allocation automatically. When a contract bundles services at a discount from their standalone prices, the module allocates revenue to each element proportionally. SuiteScript cannot replicate this without significant complexity.",
  },
  {
    icon: AlertCircle,
    title: "Simple deferred revenue (single element, straight-line)",
    description:
      "If every contract contains a single performance obligation recognized straight-line over the contract term, custom SuiteScript handles this reliably and costs far less. The journal entry logic is straightforward.",
  },
  {
    icon: Code2,
    title: "Project-based or milestone recognition",
    description:
      "Revenue recognized on project milestones or percent-complete with one performance obligation per contract is a strong fit for custom scripts. SuitePacific builds and maintains these as part of ongoing Care plans.",
  },
];

const FAQ = [
  {
    question: "What is NetSuite ARM and what does it do?",
    answer:
      "NetSuite ARM (Advanced Revenue Management) is a native module that automates ASC 606 and IFRS 15 revenue recognition. It creates revenue arrangements and elements from sales orders and invoices, handles multi-element arrangements, allocates revenue using standalone selling price, manages contract modifications and variable consideration, and automatically posts deferred revenue journal entries to the GL. It also produces the arrangement-level audit trail auditors require for ASC 606 compliance documentation.",
  },
  {
    question: "When does ASC 606 require the ARM module?",
    answer:
      "ASC 606 does not mandate the ARM module specifically, but if your auditors require formal ASC 606 documentation and you have bundled contracts with multiple performance obligations, the ARM module is the practical path to compliance. Accounts with single-element contracts recognized straight-line can satisfy ASC 606 with simpler approaches, including properly designed custom scripts.",
  },
  {
    question: "Can custom SuiteScript handle ASC 606 compliance?",
    answer:
      "Custom SuiteScript can handle simple ASC 606 scenarios: single-element contracts recognized straight-line or on milestone completion. It cannot handle multi-element arrangement accounting, SSP allocation across bundled elements, contract modification accounting, variable consideration, or produce the arrangement-level audit trail required by auditors for complex ASC 606 compliance. For those scenarios, the ARM module is necessary.",
  },
  {
    question: "How much does the ARM module cost?",
    answer:
      "NetSuite prices ARM as an add-on license, typically in the $15,000 to $50,000+ per year range depending on account size and negotiation. The exact cost varies by contract. SuitePacific helps accounts evaluate whether the ARM licensing cost is justified relative to the rev rec complexity and audit requirements before recommending it.",
  },
  {
    question: "What is standalone selling price (SSP) and why does it matter?",
    answer:
      "Standalone selling price is the price at which you would sell a performance obligation separately. Under ASC 606, when you bundle multiple obligations in one contract at a combined discount, you must allocate the total transaction price to each obligation based on its relative SSP. ARM handles this allocation automatically. Custom scripts cannot replicate SSP allocation without being rebuilt as essentially a partial ARM equivalent.",
  },
  {
    question: "How long does it take to configure NetSuite ARM?",
    answer:
      "ARM configuration typically takes 6 to 12 weeks for a live account, depending on contract complexity. The work includes defining revenue elements and recognition methods, mapping revenue arrangements to transaction types, configuring SSP values, testing deferred revenue journal entries in Sandbox, and validating against historical data. SuitePacific handles this configuration as part of a Care plan.",
  },
];

export const metadata: Metadata = {
  title: "NetSuite ARM vs. Custom Revenue Recognition Scripts",
  description:
    "NetSuite ARM vs. custom SuiteScript for ASC 606 rev rec: when the module is required, what custom scripts handle, and the cost difference for live accounts.",
  alternates: { canonical: "/netsuite-arm-vs-custom-revenue-recognition" },
  openGraph: {
    title: "NetSuite ARM vs. Custom Revenue Recognition Scripts",
    description:
      "NetSuite ARM vs. custom SuiteScript for ASC 606 rev rec: when the module is required, what custom scripts handle, and the cost difference for live accounts.",
    url: `${SITE_URL}/netsuite-arm-vs-custom-revenue-recognition`,
    type: "website",
    images: [{ url: `${SITE_URL}/og-default.png`, width: 1200, height: 630 }],
  },
};

export default function ArmVsCustomRevRecPage() {
  return (
    <main className="pt-32 pb-24 sm:pt-40 sm:pb-32">
      <BreadcrumbJsonLd
        items={[
          { name: "Home", url: SITE_URL },
          { name: "NetSuite ARM vs. Custom Revenue Recognition", url: `${SITE_URL}/netsuite-arm-vs-custom-revenue-recognition` },
        ]}
      />
      <FaqJsonLd items={FAQ} />
      <ServiceJsonLd
        name="NetSuite Revenue Recognition Consulting"
        description="SuitePacific helps live NetSuite accounts evaluate, configure, and maintain revenue recognition, whether through the ARM module or custom SuiteScript, for ASC 606 compliance."
        url={`${SITE_URL}/netsuite-arm-vs-custom-revenue-recognition`}
        serviceType="NetSuite Revenue Recognition"
        offers={[
          { name: "Care", price: 799, description: "10 hours/month: rev rec configuration, custom script builds, ARM setup, and ongoing maintenance. Month-to-month after 3-month minimum." },
          { name: "Care Plus", price: 1499, description: "20 hours/month: rev rec plus broader NetSuite administration and development support. Month-to-month." },
          { name: "Care Pro", price: 2499, description: "35 hours/month: full rev rec build, ARM configuration, SuiteScript development, and ongoing account support. Month-to-month." },
        ]}
      />
      <OrganizationJsonLd />

      <div className="mx-auto max-w-3xl px-6 lg:px-8">
        <SectionHeading
          as="h1"
          eyebrow="Revenue Recognition"
          title="NetSuite ARM vs. Custom Revenue Recognition: Is the Module Worth It?"
          subtitle="A practical guide for controllers at live NetSuite accounts deciding between the ARM module and custom SuiteScript for ASC 606 compliance."
          align="left"
        />

        <div className="mt-6 rounded-2xl border border-brand-100 bg-white p-5 shadow-soft">
          <p className="text-sm font-medium text-brand-700 mb-3">
            Evaluating whether NetSuite ARM is worth the licensing cost for your account? SuitePacific helps live accounts assess and implement the right approach.
          </p>
          <LeadFormLight />
        </div>

        <p className="mt-3 text-xs text-brand-400">NetSuite-Certified · Post-go-live specialist · Sandbox-first development · Month-to-month</p>
        <p className="mt-2 text-xs text-brand-300">
          <time dateTime="2026-10">Published October 2026</time>
        </p>

        <div className="mt-6 rounded-2xl border border-brand-100 bg-brand-50/40 p-5">
          <p className="text-xs font-semibold uppercase tracking-wide text-accent mb-2">Quick answer</p>
          <p className="text-sm text-brand-700 leading-relaxed">
            NetSuite ARM (Advanced Revenue Management) refers to the native module for ASC 606 and IFRS 15 compliance. It automates multi-element arrangement accounting, standalone selling price allocation, contract modifications, and variable consideration, and produces the audit trail auditors require for formal ASC 606 documentation. Custom SuiteScript revenue recognition refers to journal entry logic built directly in the account to post deferred revenue based on billing schedules or milestones. Custom scripts work well for accounts with single-element contracts recognized straight-line or on milestone completion. They cannot handle SSP allocation, contract modification accounting, or the arrangement-level audit trail required for complex ASC 606 compliance. The ARM module adds $15,000 to $50,000 or more per year in licensing. SuitePacific works with live NetSuite accounts to evaluate this decision and build whichever approach fits the account&apos;s size, audit requirements, and budget. Month-to-month from $799.
          </p>
        </div>

        {/* Comparison table */}
        <div className="mt-14">
          <h2 className="text-lg font-semibold text-brand-900 mb-2">
            How does ARM compare to custom SuiteScript for revenue recognition?
          </h2>
          <p className="text-sm text-brand-400 mb-5">
            The capability gap between ARM and custom scripts is significant for complex ASC 606 scenarios. For simple deferred revenue, the gap mostly disappears.
          </p>
          <div className="overflow-x-auto rounded-2xl border border-brand-100">
            <table className="w-full text-sm min-w-[520px]">
              <thead>
                <tr className="border-b border-brand-100 bg-brand-50/50">
                  <th className="text-left p-4 font-semibold text-brand-900">Capability</th>
                  <th className="text-left p-4 font-semibold text-brand-900">ARM Module</th>
                  <th className="text-left p-4 font-semibold text-brand-900">Custom SuiteScript</th>
                </tr>
              </thead>
              <tbody>
                {COMPARISON_ROWS.map((row, i) => (
                  <tr key={row.capability} className={i < COMPARISON_ROWS.length - 1 ? "border-b border-brand-100" : ""}>
                    <td className="p-4 font-medium text-brand-700 align-top">{row.capability}</td>
                    <td className="p-4 text-brand-400 align-top text-[13px]">{row.arm}</td>
                    <td className="p-4 text-brand-400 align-top text-[13px]">{row.custom}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* When to choose ARM */}
        <div className="mt-14">
          <h2 className="text-lg font-semibold text-brand-900 mb-2">
            When does your account need the ARM module?
          </h2>
          <p className="text-sm text-brand-400 mb-6">
            The ARM module is not required for every ASC 606 scenario. The key factors are contract complexity and what your auditors require.
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            {DECISION_CASES.map((item) => (
              <Card key={item.title} className="p-5 flex flex-col gap-3">
                <IconBadge icon={item.icon} />
                <h3 className="font-semibold text-brand-900 text-sm">{item.title}</h3>
                <p className="text-sm text-brand-400">{item.description}</p>
              </Card>
            ))}
          </div>
        </div>

        {/* When custom scripts are sufficient */}
        <div className="mt-14">
          <h2 className="text-lg font-semibold text-brand-900 mb-4">
            When are custom SuiteScript revenue recognition scripts sufficient?
          </h2>
          <div className="space-y-4">
            <div className="rounded-2xl border border-brand-100 bg-brand-50/30 p-5">
              <h3 className="font-semibold text-brand-900 text-sm mb-2">Single-element subscriptions billed annually</h3>
              <p className="text-sm text-brand-400">
                A SaaS company with one performance obligation per contract (the subscription), billed annually, recognized straight-line over 12 months. The deferred revenue schedule is simple. A SuiteScript User Event script creates the journal entries automatically on invoice posting. No ARM module required.
              </p>
            </div>
            <div className="rounded-2xl border border-brand-100 bg-brand-50/30 p-5">
              <h3 className="font-semibold text-brand-900 text-sm mb-2">Project-based revenue on milestone completion</h3>
              <p className="text-sm text-brand-400">
                Fixed-price project contracts with defined milestones. Revenue posts when the milestone is marked complete. SuiteScript triggers the journal entry on the milestone record change. Clean, auditable, and maintainable without ARM.
              </p>
            </div>
            <div className="rounded-2xl border border-brand-100 bg-brand-50/30 p-5">
              <h3 className="font-semibold text-brand-900 text-sm mb-2">Simple deferred revenue from prepaid contracts</h3>
              <p className="text-sm text-brand-400">
                Accounts that collect prepayment for a service period and need to recognize revenue ratably. The billing schedule drives the journal entry cadence. SuiteScript handles this reliably as long as each contract has one performance obligation.
              </p>
            </div>
          </div>
        </div>

        {/* How SuitePacific helps */}
        <div className="mt-10 rounded-2xl border border-accent/20 bg-accent/5 p-6">
          <p className="text-xs font-semibold uppercase tracking-wide text-accent mb-2">How SuitePacific helps</p>
          <p className="text-sm text-brand-700 leading-relaxed">
            SuitePacific assesses each account&apos;s revenue recognition complexity before recommending ARM or custom scripts. For accounts that need custom scripts, SuitePacific designs and maintains the rev rec logic within the Care plan. For accounts evaluating ARM, SuitePacific helps configure the module, define revenue elements, and test in Sandbox before go-live. Month-to-month from $799.
          </p>
        </div>

        {/* Related reading */}
        <div className="mt-10 rounded-2xl border border-brand-100 bg-brand-50/30 p-5 sm:p-6">
          <p className="text-sm font-semibold text-brand-900 mb-3">Related reading</p>
          <ul className="space-y-2.5">
            <li className="text-sm text-brand-400">
              <Link href="/netsuite-arm-configuration" className="text-accent hover:underline">
                NetSuite ARM configuration
              </Link>{" "}
              covers how SuitePacific configures the ARM module for live accounts.
            </li>
            <li className="text-sm text-brand-400">
              <Link href="/netsuite-suitescript-development" className="text-accent hover:underline">
                NetSuite SuiteScript development
              </Link>{" "}
              covers how custom scripts are built, tested, and maintained for rev rec and other automation needs.
            </li>
            <li className="text-sm text-brand-400">
              <Link href="/netsuite-post-go-live-support" className="text-accent hover:underline">
                NetSuite post-go-live support
              </Link>{" "}
              covers the full scope of SuitePacific&apos;s ongoing support for live NetSuite accounts.
            </li>
          </ul>
        </div>

        <ServiceFaqSection items={FAQ} />

        <div className="mt-10 rounded-2xl border border-brand-100 bg-white p-5 shadow-soft">
          <p className="text-sm font-medium text-brand-700 mb-3">
            Ready to get the right approach in place? SuitePacific works with live NetSuite accounts month-to-month.
          </p>
          <LeadFormLight />
        </div>
      </div>
    </main>
  );
}

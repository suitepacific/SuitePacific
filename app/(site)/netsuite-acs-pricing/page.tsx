import type { Metadata } from "next";
import Link from "next/link";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { BreadcrumbJsonLd, FaqJsonLd, ServiceJsonLd, OrganizationJsonLd } from "@/components/seo/JsonLd";
import { ServiceFaqSection } from "@/components/ui/ServiceFaqSection";
import { LeadFormLight } from "@/components/sections/LeadFormLight";
import { SITE_URL } from "@/lib/content";

const ACS_TIERS = [
  {
    name: "ACS Advise",
    target: "New and growing accounts",
    hours: "Shared pool (no allocation guarantee)",
    dedicatedConsultant: false,
    csm: false,
    bestFor: "Accounts that primarily need reactive guidance on standard NetSuite questions and basic troubleshooting.",
  },
  {
    name: "ACS Monitor",
    target: "Established accounts",
    hours: "~36 hours per quarter",
    dedicatedConsultant: true,
    csm: false,
    bestFor: "Accounts that want a designated functional consultant and project execution support on a quarterly basis.",
  },
  {
    name: "ACS Optimize",
    target: "Mid-market growth",
    hours: "~20 hours per month",
    dedicatedConsultant: true,
    csm: true,
    bestFor: "Accounts seeking a Customer Success Manager plus functional consultant, optimization playbooks, and senior resource access.",
  },
  {
    name: "ACS Architect",
    target: "Enterprise and multi-subsidiary",
    hours: "~40 hours per month",
    dedicatedConsultant: true,
    csm: true,
    bestFor: "Large accounts needing a named expert team, strategic roadmap sessions, and dedicated escalation paths.",
  },
];

const COST_EXAMPLES = [
  { license: "$30,000/year", acsLow: "$1,500", acsHigh: "$3,000", managed: "$799–$999", note: "Entry ACS tier for small accounts" },
  { license: "$60,000/year", acsLow: "$3,000", acsHigh: "$6,000", managed: "$799–$1,499", note: "Typical SMB NetSuite license" },
  { license: "$100,000/year", acsLow: "$5,000", acsHigh: "$10,000", managed: "$999–$2,499", note: "Mid-market account" },
  { license: "$200,000/year", acsLow: "$10,000", acsHigh: "$20,000", managed: "$1,499–$2,499+", note: "Multi-module or multi-entity" },
];

const FAQ = [
  {
    question: "How much does NetSuite ACS cost?",
    answer:
      "Oracle ACS is priced as a percentage of the annual NetSuite license value, typically ranging from 5% to 8% or more depending on the tier selected. For a $60,000 annual license, ACS entry-level pricing starts at approximately $3,000 per year. Higher tiers (Optimize, Architect) with dedicated consultants and more hours cost proportionally more. Oracle does not publish exact ACS prices publicly; accounts receive a quote based on license value and tier.",
  },
  {
    question: "What is included in Oracle ACS pricing?",
    answer:
      "ACS pricing covers access to Oracle's support team for standard NetSuite functionality guidance, health reviews, upgrade preparation, and Oracle internal escalation. Higher tiers add a designated functional consultant (Monitor tier and above) and a Customer Success Manager (Optimize and above). ACS pricing does not include custom SuiteScript development, third-party integration maintenance, or work outside Oracle's defined ACS scope.",
  },
  {
    question: "Is there a minimum contract for Oracle ACS?",
    answer:
      "Oracle ACS is typically sold on an annual contract tied to the NetSuite license renewal. Accounts cannot purchase ACS on a month-to-month basis. The minimum engagement is generally one year, renewed alongside the annual NetSuite subscription.",
  },
  {
    question: "How does ACS pricing compare to a managed support retainer?",
    answer:
      "For a $60,000 annual license, ACS entry-level pricing is approximately $3,000–$6,000 per year, depending on tier. A boutique managed support retainer runs $799–$2,499 per month ($9,588–$29,988 annually) but covers SuiteScript development, integration maintenance, and the full technical layer ACS excludes. The two are not directly comparable because they cover different scope. Many accounts run both: ACS for Oracle-side guidance and functional access, and an independent firm for technical customization work.",
  },
  {
    question: "Does ACS pricing include SuiteScript development?",
    answer:
      "No. SuiteScript development and debugging are explicitly outside ACS scope regardless of tier. If a script breaks, ACS consultants can identify that a problem exists and escalate to Oracle engineering for platform-level issues, but they cannot write or fix custom code. Accounts that depend on SuiteScript customizations need a separate engagement with a certified SuiteScript developer.",
  },
  {
    question: "What is the cheapest way to get NetSuite support?",
    answer:
      "Oracle NetSuite Standard Support is included in every license at no additional cost and covers platform-level bug reports and standard functionality questions. It does not cover customizations. For customization and integration support, break-fix hourly engagements with an independent consultant are the lowest-cost entry point, typically $75–$175 per hour. A managed support retainer starting at $799 per month provides predictable cost and broader coverage than hourly for accounts with ongoing needs.",
  },
];

export const metadata: Metadata = {
  title: "NetSuite ACS Pricing: 2026 Cost Breakdown by Tier",
  description:
    "NetSuite ACS pricing explained: how Oracle charges for Advanced Customer Support, what each tier costs, what is and is not included, and how ACS pricing compares to managed support alternatives.",
  alternates: { canonical: "/netsuite-acs-pricing" },
  openGraph: {
    title: "NetSuite ACS Pricing: 2026 Cost Breakdown by Tier",
    description: "How Oracle prices NetSuite ACS across four tiers: Advise, Monitor, Optimize, Architect. Cost examples, scope breakdown, and comparison to managed support alternatives.",
    url: "https://suitepacific.com/netsuite-acs-pricing",
    type: "website",
    images: [{ url: "https://suitepacific.com/og-default.png", width: 1200, height: 630 }],
  },
};

export default function NetSuiteAcsPricingPage() {
  return (
    <main className="pt-32 pb-24 sm:pt-40 sm:pb-32">
      <BreadcrumbJsonLd
        items={[
          { name: "Home", url: SITE_URL },
          { name: "NetSuite ACS Pricing", url: `${SITE_URL}/netsuite-acs-pricing` },
        ]}
      />
      <FaqJsonLd items={FAQ} />
      <ServiceJsonLd
        name="NetSuite ACS Pricing"
        description="Oracle NetSuite ACS pricing breakdown: tier structure, cost ranges, scope coverage, and comparison to independent managed support alternatives."
        url={`${SITE_URL}/netsuite-acs-pricing`}
        serviceType="NetSuite Consulting"
      />
      <OrganizationJsonLd />

      <div className="mx-auto max-w-3xl px-6 lg:px-8">
        <SectionHeading
          as="h1"
          eyebrow="NetSuite Support Costs"
          title="NetSuite ACS Pricing: 2026 Cost Breakdown"
          subtitle="How Oracle prices Advanced Customer Support across four tiers, what each tier costs, and how ACS pricing compares to independent managed support."
          align="left"
        />

        <div className="mt-6 rounded-2xl border border-brand-100 bg-white p-5 shadow-soft">
          <LeadFormLight />
        </div>
        <p className="mt-3 text-xs text-brand-400">NetSuite-certified · US-based · Managed support from $799/month · Month-to-month</p>

        <div className="mt-8 rounded-xl bg-brand-50/60 border border-brand-100 px-5 py-4">
          <p className="text-xs font-semibold text-accent uppercase tracking-wide mb-2">Quick answer</p>
          <p className="text-sm text-brand-700 leading-relaxed">
            Oracle ACS (Advanced Customer Support) is priced as a percentage of the annual NetSuite license value, typically 5–8% or more depending on tier. Oracle does not publish a fixed price list; accounts receive a quote based on license size and the tier selected: Advise (shared pool), Monitor (~36 hrs/quarter with a designated consultant), Optimize (~20 hrs/month with a CSM), or Architect (~40 hrs/month for enterprise). For a $60,000 annual license, entry-level ACS costs approximately $3,000–$6,000 per year. ACS pricing does not include SuiteScript development, third-party integration support, or custom workflow work. Managed support retainers from independent firms start at $799 per month and cover the full technical layer ACS excludes, on month-to-month terms.
          </p>
        </div>

        {/* Tier table */}
        <div className="mt-14">
          <h2 className="text-lg font-semibold text-brand-900 mb-2">Oracle ACS Tiers: Advise, Monitor, Optimize, Architect</h2>
          <p className="text-sm text-brand-400 mb-5">Oracle ACS is sold in four tiers. Hours and resources increase with each tier; pricing scales with the annual license value.</p>
          <div className="space-y-4">
            {ACS_TIERS.map((tier) => (
              <div key={tier.name} className="rounded-xl border border-brand-100 bg-white p-5">
                <div className="flex items-start justify-between gap-3 flex-wrap">
                  <div>
                    <h3 className="font-semibold text-brand-900 text-sm">{tier.name}</h3>
                    <p className="text-xs text-brand-400 mt-0.5">{tier.target}</p>
                  </div>
                  <span className="text-xs bg-brand-50 text-brand-500 px-2.5 py-1 rounded-full border border-brand-100 whitespace-nowrap">
                    {tier.hours}
                  </span>
                </div>
                <div className="mt-3 flex gap-4 text-xs text-brand-400">
                  <span>Dedicated consultant: <span className="font-medium text-brand-600">{tier.dedicatedConsultant ? "Yes" : "No"}</span></span>
                  <span>CSM included: <span className="font-medium text-brand-600">{tier.csm ? "Yes" : "No"}</span></span>
                </div>
                <p className="mt-2 text-sm text-brand-400">{tier.bestFor}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Cost examples */}
        <div className="mt-14">
          <h2 className="text-lg font-semibold text-brand-900 mb-2">ACS Cost Examples at Different License Values</h2>
          <p className="text-sm text-brand-400 mb-5">
            ACS pricing uses a percentage of the annual license. The range below reflects entry-level to mid-tier ACS pricing at 5–10% of license value. Oracle provides exact quotes; these are estimates for planning purposes.
          </p>
          <div className="overflow-x-auto rounded-xl border border-brand-100">
            <table className="w-full text-sm min-w-[520px]">
              <thead>
                <tr className="bg-brand-50 border-b border-brand-100">
                  <th className="text-left px-4 py-3 font-semibold text-brand-900">Annual license</th>
                  <th className="text-left px-4 py-3 font-semibold text-brand-900">ACS low est.</th>
                  <th className="text-left px-4 py-3 font-semibold text-brand-900">ACS high est.</th>
                  <th className="text-left px-4 py-3 font-semibold text-brand-900">Managed support</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-brand-50">
                {COST_EXAMPLES.map((row) => (
                  <tr key={row.license} className="hover:bg-brand-50/40 transition-colors">
                    <td className="px-4 py-3 font-medium text-brand-800 tabular-nums">{row.license}</td>
                    <td className="px-4 py-3 text-brand-500 tabular-nums">{row.acsLow}/yr</td>
                    <td className="px-4 py-3 text-brand-500 tabular-nums">{row.acsHigh}/yr</td>
                    <td className="px-4 py-3 text-brand-500">{row.managed}/mo</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p className="mt-3 text-xs text-brand-400">
            ACS estimates based on 5–10% of annual license value. Managed support pricing based on published rates from independent firms. Managed support covers SuiteScript and integrations; ACS does not.
          </p>
        </div>

        {/* What ACS does not cover */}
        <div className="mt-14">
          <h2 className="text-lg font-semibold text-brand-900 mb-4">What ACS Pricing Does Not Include</h2>
          <p className="text-sm text-brand-400 mb-5">
            Regardless of the ACS tier purchased, Oracle explicitly excludes the following from ACS scope. Accounts that need support in these areas require a separate engagement with an independent NetSuite consulting firm.
          </p>
          <div className="rounded-xl border border-brand-100 bg-white p-5">
            <ul className="space-y-3">
              {[
                "Custom SuiteScript 2.x development, debugging, or modification",
                "Third-party integration maintenance (Celigo, Shopify, Salesforce, HubSpot, Amazon, Avalara, etc.)",
                "Custom SuiteFlow workflow logic beyond standard configuration",
                "Advanced PDF templates and FreeMarker customization",
                "Custom saved searches, formulas, and reporting",
                "Work that falls outside Oracle's defined ACS scope statement",
              ].map((item) => (
                <li key={item} className="flex items-start gap-3 text-sm text-brand-500">
                  <span className="text-red-400 mt-0.5 shrink-0">✕</span>
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Alternatives */}
        <div className="mt-14">
          <h2 className="text-lg font-semibold text-brand-900 mb-4">ACS Pricing vs. Managed Support: The Trade-off</h2>
          <p className="text-sm text-brand-400 mb-5">
            ACS and managed support serve different scope areas. The comparison is not simply price per hour — it is what the engagement actually covers.
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="rounded-xl border border-brand-100 bg-white p-5">
              <p className="text-sm font-semibold text-brand-900 mb-3">Choose ACS if:</p>
              <ul className="space-y-2 text-sm text-brand-500">
                <li>Your account uses mostly standard NetSuite functionality</li>
                <li>You need Oracle escalation access and upgrade preparation</li>
                <li>You have minimal custom SuiteScript or integrations</li>
                <li>You want Oracle-side accountability and a designated functional contact</li>
              </ul>
            </div>
            <div className="rounded-xl border border-brand-100 bg-white p-5">
              <p className="text-sm font-semibold text-brand-900 mb-3">Choose managed support if:</p>
              <ul className="space-y-2 text-sm text-brand-500">
                <li>Your account depends on custom SuiteScript or integrations</li>
                <li>You need break-fix coverage for scripts and workflows</li>
                <li>You want predictable monthly pricing on month-to-month terms</li>
                <li>ACS scope does not cover your primary support needs</li>
              </ul>
            </div>
          </div>
        </div>


        {/* Bottom Line */}
        <div className="mt-12 rounded-2xl border-2 border-accent/30 bg-gradient-to-br from-accent/5 to-transparent p-6">
          <p className="text-xs font-semibold uppercase tracking-wide text-accent mb-3">Bottom Line</p>
          <h2 className="text-base font-semibold text-brand-900 mb-3">
            For accounts where ACS cost is disproportionate to the value received, a boutique managed retainer covers more of the actual support work at a comparable or lower annual cost.
          </h2>
          <p className="text-sm text-brand-500 mb-4">
            ACS is priced as a percentage of the annual license and paid upfront for the year. At entry tier, for a $60,000 license, that is $3,000 to $5,000 per year for functional guidance that excludes the technical layer. For accounts whose primary support requests are SuiteScript and integration-related, that ACS spend covers almost none of the actual work.
          </p>
          <p className="text-sm text-brand-500 mb-4">
            SuitePacific Care at $799 per month ($9,588 per year) covers SuiteScript development, integration maintenance, workflow automation, administration, and break-fix support. Month-to-month after the initial three-month period. No annual prepayment. For accounts with active technical needs, the coverage comparison is clear.
          </p>
          <ul className="space-y-2 text-sm text-brand-500">
            <li className="flex items-start gap-2"><span className="text-accent font-bold mt-0.5">→</span> Monthly not annual: $799/month versus a lump-sum ACS annual payment</li>
            <li className="flex items-start gap-2"><span className="text-accent font-bold mt-0.5">→</span> Covers the technical layer ACS explicitly excludes</li>
            <li className="flex items-start gap-2"><span className="text-accent font-bold mt-0.5">→</span> Month-to-month after three months, no annual prepayment or renewal escalation</li>
          </ul>
        </div>

        {/* SuitePacific CTA */}
        <div className="mt-10 rounded-xl border border-accent/20 bg-accent/5 p-5">
          <p className="text-xs font-semibold text-accent uppercase tracking-wide mb-2">ACS alternative with published pricing</p>
          <p className="text-sm font-semibold text-brand-900 mb-2">SuitePacific — managed NetSuite support from $799/month</p>
          <p className="text-sm text-brand-500 mb-4">
            SuitePacific is a US-based boutique NetSuite firm covering what ACS does not: SuiteScript development, Celigo and Shopify integration maintenance, SuiteFlow workflow support, saved searches, and ongoing administration. Oracle NetSuite SuiteCloud Developer II and Administrator Professional certified. Plans are month-to-month with no annual contract and no rollover. $799/month (Care), $1,499/month (Care Plus), $2,499/month (Care Pro).
          </p>
          <Link href="/netsuite-care" className="text-sm text-accent font-medium hover:underline">
            View SuitePacific Care plans →
          </Link>
        </div>

        {/* Internal links */}
        <div className="mt-10 rounded-xl border border-brand-100 bg-brand-50/40 p-5">
          <p className="text-xs font-semibold text-brand-900 uppercase tracking-wide mb-3">Related</p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
            {[
              { label: "NetSuite ACS alternatives comparison", href: "/netsuite-acs-alternatives-comparison" },
              { label: "NetSuite ACS alternative", href: "/netsuite-acs-alternative" },
              { label: "Is NetSuite ACS worth it?", href: "/do-i-need-netsuite-acs" },
              { label: "NetSuite support pricing benchmark 2026", href: "/blog/netsuite-support-pricing-benchmark-2026" },
              { label: "NetSuite managed support plans", href: "/netsuite-managed-support" },
              { label: "NetSuite consultant cost", href: "/netsuite-consultant-cost" },
            ].map((link) => (
              <Link key={link.href} href={link.href} className="text-sm text-accent hover:underline">
                {link.label}
              </Link>
            ))}
          </div>
        </div>

        <ServiceFaqSection items={FAQ} />

        <div className="mt-10 rounded-2xl border border-brand-100 bg-white p-5 shadow-soft">
          <LeadFormLight />
        </div>
      </div>
    </main>
  );
}

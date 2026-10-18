import type { Metadata } from "next";
import Link from "next/link";
import { CheckCircle2, XCircle, Globe, AlertCircle } from "lucide-react";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Card } from "@/components/ui/Card";
import { IconBadge } from "@/components/ui/IconBadge";
import { BreadcrumbJsonLd, FaqJsonLd, ServiceJsonLd, OrganizationJsonLd } from "@/components/seo/JsonLd";
import { ServiceFaqSection } from "@/components/ui/ServiceFaqSection";
import { LeadFormLight } from "@/components/sections/LeadFormLight";
import { SITE_URL } from "@/lib/content";

const COMPARISON_ROWS = [
  { capability: "Rate accuracy", suitetax: "Manual maintenance required", avalara: "Real-time lookup on every transaction" },
  { capability: "Economic nexus monitoring", suitetax: "None", avalara: "Automatic threshold tracking by state" },
  { capability: "Product taxability rules", suitetax: "Manual configuration", avalara: "Automatic (SaaS, food, medical, etc.)" },
  { capability: "Exemption certificates", suitetax: "Limited", avalara: "CertCapture: full lifecycle management" },
  { capability: "Automated filing", suitetax: "None", avalara: "Avalara Returns: all registered states" },
  { capability: "Multi-state coverage", suitetax: "Workable for 1-3 states", avalara: "All US states and 100+ countries" },
  { capability: "International VAT/GST", suitetax: "Basic support", avalara: "100+ country registration and compliance" },
  { capability: "Integration required", suitetax: "Native", avalara: "Connector or custom Restlet" },
  { capability: "Ongoing maintenance", suitetax: "Rate updates manual", avalara: "Automatic rate and rule updates" },
];

const AVALARA_TRIGGERS = [
  {
    icon: Globe,
    title: "Nexus in 5 or more states",
    description:
      "Manually maintaining SuiteTax schedules and rates across five or more states creates compliance risk. One missed rate change or incorrectly configured nexus registration can generate audit exposure. Avalara handles rate maintenance automatically.",
  },
  {
    icon: AlertCircle,
    title: "Economic nexus reached in any state",
    description:
      "If your account has crossed or is approaching the $100,000 or 200-transaction economic nexus threshold in any state, SuiteTax alone will not tell you. Avalara monitors your sales by state and alerts before you become non-compliant in a new jurisdiction.",
  },
  {
    icon: CheckCircle2,
    title: "Complex product taxability",
    description:
      "SaaS software is taxable in some states and exempt in others. Food is taxable in some states. Medical devices have their own rules. SuiteTax requires manual configuration for each product type in each state. Avalara applies the correct rule automatically based on tax codes.",
  },
  {
    icon: XCircle,
    title: "Growing exempt customer base",
    description:
      "If you sell to exempt customers (nonprofits, resellers, government entities), you need to collect, store, and apply exemption certificates. SuiteTax has limited certificate management. Avalara CertCapture handles the full exemption certificate lifecycle.",
  },
];

const FAQ = [
  {
    question: "What is economic nexus and when does it trigger?",
    answer:
      "Economic nexus is a state's right to require sales tax collection from out-of-state sellers who meet a sales threshold in that state, even without a physical presence. Most states set the threshold at $100,000 in annual sales or 200 transactions. Once you meet the threshold, you are required to register, collect, and remit sales tax in that state. SuiteTax does not monitor these thresholds; Avalara does automatically.",
  },
  {
    question: "Does NetSuite SuiteTax update rates automatically?",
    answer:
      "No. SuiteTax requires manual maintenance of tax rates and rules. When a state changes a rate, you must update the tax schedule in NetSuite manually. For accounts with nexus in many states, this creates ongoing compliance maintenance work. Avalara pulls current rates in real time on every transaction, so rate changes are automatically applied without any manual update.",
  },
  {
    question: "How does Avalara integrate with NetSuite?",
    answer:
      "Avalara connects to NetSuite via the Avalara Connector (a marketplace integration) or via a custom Restlet that calls the Avalara AvaTax API directly. The integration fires on transaction creation and save, sending the transaction details to Avalara and returning the correct tax amount. SuitePacific builds and maintains both integration types depending on what fits the account.",
  },
  {
    question: "What is Avalara CertCapture?",
    answer:
      "Avalara CertCapture is the exemption certificate management add-on. It provides a customer portal where exempt customers can upload their certificates, stores them securely with expiration tracking, and automatically applies the exemption to transactions in NetSuite when the customer is flagged as exempt. It eliminates the manual process of tracking paper exemption certificates.",
  },
  {
    question: "Can SuiteTax handle international VAT?",
    answer:
      "SuiteTax provides basic VAT and GST support for international transactions. It handles standard rate lookups for many countries when configured correctly. For accounts with complex international sales, multiple VAT registrations, or automated VAT filing requirements, Avalara provides stronger coverage across 100+ countries with automated registration and compliance workflows.",
  },
  {
    question: "How long does it take to connect Avalara to NetSuite?",
    answer:
      "A standard Avalara-to-NetSuite integration typically takes 4 to 8 weeks for a live account. The work includes account configuration in Avalara, product taxability code mapping, nexus registration setup, integration build and testing in Sandbox, and validation of tax calculations against known transactions before connecting to production. SuitePacific handles this integration as part of a Care plan.",
  },
];

export const metadata: Metadata = {
  title: "NetSuite SuiteTax vs. Avalara AvaTax: Which to Use",
  description:
    "Live NetSuite account with multi-state sales tax? Compare SuiteTax and Avalara: economic nexus monitoring, product taxability, and when to connect Avalara.",
  alternates: { canonical: "/netsuite-suitetax-vs-avalara" },
  openGraph: {
    title: "NetSuite SuiteTax vs. Avalara AvaTax: Which to Use",
    description:
      "Live NetSuite account with multi-state sales tax? Compare SuiteTax and Avalara: economic nexus monitoring, product taxability, and when to connect Avalara.",
    url: `${SITE_URL}/netsuite-suitetax-vs-avalara`,
    type: "website",
    images: [{ url: `${SITE_URL}/og-default.png`, width: 1200, height: 630 }],
  },
};

export default function SuiteTaxVsAvalaraPage() {
  return (
    <main className="pt-32 pb-24 sm:pt-40 sm:pb-32">
      <BreadcrumbJsonLd
        items={[
          { name: "Home", url: SITE_URL },
          { name: "NetSuite SuiteTax vs. Avalara AvaTax", url: `${SITE_URL}/netsuite-suitetax-vs-avalara` },
        ]}
      />
      <FaqJsonLd items={FAQ} />
      <ServiceJsonLd
        name="NetSuite Sales Tax Integration Consulting"
        description="SuitePacific helps live NetSuite accounts evaluate and connect the right sales tax solution, including SuiteTax configuration and Avalara AvaTax integration."
        url={`${SITE_URL}/netsuite-suitetax-vs-avalara`}
        serviceType="NetSuite Sales Tax Compliance"
        offers={[
          { name: "Care", price: 799, description: "10 hours/month: SuiteTax configuration, Avalara integration, nexus setup, and ongoing tax compliance support. Month-to-month after 3-month minimum." },
          { name: "Care Plus", price: 1499, description: "20 hours/month: tax integration plus broader NetSuite administration and development support. Month-to-month." },
          { name: "Care Pro", price: 2499, description: "35 hours/month: full tax compliance build, multi-state integration, SuiteScript development, and ongoing account support. Month-to-month." },
        ]}
      />
      <OrganizationJsonLd />

      <div className="mx-auto max-w-3xl px-6 lg:px-8">
        <SectionHeading
          as="h1"
          eyebrow="Sales Tax Compliance"
          title="NetSuite SuiteTax vs. Avalara AvaTax: What Live Accounts Need to Know"
          subtitle="Understanding what NetSuite&apos;s native tax engine handles and when Avalara AvaTax is the right integration for a live account."
          align="left"
        />

        <div className="mt-6 rounded-2xl border border-brand-100 bg-white p-5 shadow-soft">
          <p className="text-sm font-medium text-brand-700 mb-3">
            Live NetSuite account dealing with multi-state sales tax or economic nexus? SuitePacific helps you evaluate and connect the right tax solution.
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
            NetSuite SuiteTax refers to the platform&apos;s native tax engine, which handles basic sales tax by nexus through manually maintained tax schedules and supports VAT and GST for international transactions. Avalara AvaTax refers to a cloud-based sales tax calculation service that integrates with NetSuite and provides real-time rate lookups, automatic economic nexus monitoring, product taxability intelligence, exemption certificate management, and automated return filing. SuiteTax is workable for accounts with nexus in one to three states, simple product taxability, and low transaction volume. Avalara becomes necessary when accounts reach economic nexus in new states, operate across five or more states, sell products with complex taxability rules, or need to manage a growing exempt customer base. SuitePacific works with live NetSuite accounts to evaluate this decision and connect whichever approach fits the account&apos;s nexus profile and product mix. Month-to-month from $799.
          </p>
        </div>

        {/* Comparison table */}
        <div className="mt-14">
          <h2 className="text-lg font-semibold text-brand-900 mb-2">
            How do SuiteTax and Avalara AvaTax compare for a live NetSuite account?
          </h2>
          <p className="text-sm text-brand-400 mb-5">
            The gap between the two solutions is most visible in economic nexus monitoring and product taxability rules, which are fully automatic in Avalara and fully manual in SuiteTax.
          </p>
          <div className="overflow-x-auto rounded-2xl border border-brand-100">
            <table className="w-full text-sm min-w-[520px]">
              <thead>
                <tr className="border-b border-brand-100 bg-brand-50/50">
                  <th className="text-left p-4 font-semibold text-brand-900">Capability</th>
                  <th className="text-left p-4 font-semibold text-brand-900">SuiteTax</th>
                  <th className="text-left p-4 font-semibold text-brand-900">Avalara AvaTax</th>
                </tr>
              </thead>
              <tbody>
                {COMPARISON_ROWS.map((row, i) => (
                  <tr key={row.capability} className={i < COMPARISON_ROWS.length - 1 ? "border-b border-brand-100" : ""}>
                    <td className="p-4 font-medium text-brand-700 align-top">{row.capability}</td>
                    <td className="p-4 text-brand-400 align-top text-[13px]">{row.suitetax}</td>
                    <td className="p-4 text-brand-400 align-top text-[13px]">{row.avalara}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* When SuiteTax is sufficient */}
        <div className="mt-14">
          <h2 className="text-lg font-semibold text-brand-900 mb-4">
            When is SuiteTax sufficient for a live account?
          </h2>
          <div className="space-y-4">
            <div className="rounded-2xl border border-brand-100 bg-brand-50/30 p-5">
              <h3 className="font-semibold text-brand-900 text-sm mb-2">Nexus in one to three states, well-established</h3>
              <p className="text-sm text-brand-400">
                If your account has physical nexus in a small number of states with stable rates and your sales volume in each state is well above the economic nexus threshold (meaning you are already registered), manual SuiteTax maintenance is manageable.
              </p>
            </div>
            <div className="rounded-2xl border border-brand-100 bg-brand-50/30 p-5">
              <h3 className="font-semibold text-brand-900 text-sm mb-2">Simple product taxability</h3>
              <p className="text-sm text-brand-400">
                If you sell tangible goods with consistent taxability across all your states (meaning taxable everywhere or exempt everywhere), SuiteTax handles the calculation correctly once configured. The complexity appears when product taxability varies by state.
              </p>
            </div>
            <div className="rounded-2xl border border-brand-100 bg-brand-50/30 p-5">
              <h3 className="font-semibold text-brand-900 text-sm mb-2">Low transaction volume, small exempt customer base</h3>
              <p className="text-sm text-brand-400">
                For accounts with low transaction volume and few exempt customers, the manual effort of maintaining SuiteTax is proportional to the volume. The Avalara investment is harder to justify when the compliance workload is small.
              </p>
            </div>
          </div>
        </div>

        {/* When Avalara is needed */}
        <div className="mt-14">
          <h2 className="text-lg font-semibold text-brand-900 mb-2">
            When does a live account need Avalara AvaTax?
          </h2>
          <p className="text-sm text-brand-400 mb-6">
            Four scenarios create compliance risk that SuiteTax alone cannot manage.
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            {AVALARA_TRIGGERS.map((item) => (
              <Card key={item.title} className="p-5 flex flex-col gap-3">
                <IconBadge icon={item.icon} />
                <h3 className="font-semibold text-brand-900 text-sm">{item.title}</h3>
                <p className="text-sm text-brand-400">{item.description}</p>
              </Card>
            ))}
          </div>
        </div>

        {/* How SuitePacific helps */}
        <div className="mt-10 rounded-2xl border border-accent/20 bg-accent/5 p-6">
          <p className="text-xs font-semibold uppercase tracking-wide text-accent mb-2">How SuitePacific helps</p>
          <p className="text-sm text-brand-700 leading-relaxed">
            SuitePacific reviews each account&apos;s tax profile, state registrations, and product mix to determine whether SuiteTax is sufficient or whether Avalara is needed. When Avalara is the right call, SuitePacific handles the NetSuite-Avalara integration, maps product taxability codes, and tests in Sandbox before connecting to production. Month-to-month from $799.
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
              covers how custom integrations and automation scripts are built and maintained for live accounts.
            </li>
            <li className="text-sm text-brand-400">
              <Link href="/netsuite-account-optimization" className="text-accent hover:underline">
                NetSuite account optimization
              </Link>{" "}
              covers the broader work SuitePacific does to bring live accounts up to their full capability.
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

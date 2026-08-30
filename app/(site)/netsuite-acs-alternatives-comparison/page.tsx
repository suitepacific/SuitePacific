import type { Metadata } from "next";
import Link from "next/link";
import { CheckCircle2, XCircle, MinusCircle } from "lucide-react";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { BreadcrumbJsonLd, FaqJsonLd, ServiceJsonLd, OrganizationJsonLd } from "@/components/seo/JsonLd";
import { ServiceFaqSection } from "@/components/ui/ServiceFaqSection";
import { LeadFormLight } from "@/components/sections/LeadFormLight";
import { SITE_URL } from "@/lib/content";

const PROVIDERS = [
  {
    name: "Oracle ACS",
    type: "Oracle product",
    pricing: "% of annual license (4–8%+)",
    model: "Quarterly or annual contract",
    commitment: "Annual minimum",
    smbFocus: false,
    suiteScript: false,
    integrations: false,
    dedicatedResource: "Monitor tier and above",
    adminConfig: true,
    releaseTesting: "Limited",
    publishedPricing: true,
    bestFor: "Accounts using mostly standard NetSuite features with minimal customization.",
  },
  {
    name: "Boutique managed support",
    type: "Independent firm",
    pricing: "$500–$2,500/month fixed",
    model: "Monthly retainer",
    commitment: "Month-to-month typical",
    smbFocus: true,
    suiteScript: true,
    integrations: true,
    dedicatedResource: "Yes",
    adminConfig: true,
    releaseTesting: "Yes",
    publishedPricing: false,
    bestFor: "Accounts with customizations, integrations, and ongoing technical needs beyond ACS scope.",
  },
  {
    name: "Regional Solution Provider",
    type: "Oracle partner",
    pricing: "Not typically published",
    model: "Project or retainer",
    commitment: "Project-based",
    smbFocus: null,
    suiteScript: true,
    integrations: true,
    dedicatedResource: "Assigned per project",
    adminConfig: true,
    releaseTesting: "Varies",
    publishedPricing: false,
    bestFor: "Accounts needing project-based development work from an Oracle-certified partner.",
  },
  {
    name: "Enterprise consulting firm",
    type: "Large SI / Big 4",
    pricing: "$150–$350/hour",
    model: "Time and materials",
    commitment: "None (project-based)",
    smbFocus: false,
    suiteScript: true,
    integrations: true,
    dedicatedResource: "Assigned per engagement",
    adminConfig: true,
    releaseTesting: "Billable",
    publishedPricing: false,
    bestFor: "Large enterprises with complex requirements and budget for premium-rate consulting.",
  },
  {
    name: "Independent consultant",
    type: "Freelancer / sole practitioner",
    pricing: "$75–$200/hour",
    model: "Hourly or small retainer",
    commitment: "None",
    smbFocus: true,
    suiteScript: true,
    integrations: true,
    dedicatedResource: "Yes (one person)",
    adminConfig: true,
    releaseTesting: "Varies",
    publishedPricing: false,
    bestFor: "Accounts with specific, bounded tasks and tolerance for capacity and continuity risk.",
  },
];

const FAQ = [
  {
    question: "What are the main alternatives to Oracle ACS for NetSuite support?",
    answer:
      "The primary alternatives to Oracle ACS are boutique managed support firms, regional NetSuite Solution Providers, enterprise consulting firms (large SIs), and independent freelance consultants. Each category differs on pricing model, scope coverage, SMB suitability, and whether SuiteScript and integration work is included. ACS explicitly excludes custom SuiteScript development and third-party integrations, which is the most common reason accounts switch to an independent managed support firm.",
  },
  {
    question: "What does Oracle ACS not cover?",
    answer:
      "Oracle ACS does not cover custom SuiteScript development or debugging, third-party integration maintenance (Celigo, Shopify, Salesforce, HubSpot, Amazon), custom workflow logic beyond standard SuiteFlow configuration, Advanced PDF and FreeMarker template work, or any work Oracle classifies outside its approved ACS scope. Accounts with significant customizations typically find ACS insufficient as a standalone support solution.",
  },
  {
    question: "Is boutique managed support cheaper than Oracle ACS?",
    answer:
      "For most SMB accounts, yes. Oracle ACS pricing is tied to the annual license value, typically 4–8% or more per year. A NetSuite account with a $60,000 annual license pays $2,400–$4,800 per year for ACS entry-level tiers, which provide shared pool hours and no SuiteScript coverage. A boutique managed support retainer at $799–$999/month costs more in absolute terms but covers SuiteScript, integrations, and administration that ACS excludes.",
  },
  {
    question: "Which NetSuite support option is best for small businesses?",
    answer:
      "Small and mid-sized businesses with customized NetSuite accounts generally get more value from a boutique managed support firm than from ACS. ACS is designed around standard NetSuite functionality guidance and does not cover the SuiteScript, integration, and workflow layer that most SMBs depend on post-implementation. Independent consultants are a lower-cost option for bounded tasks but introduce continuity risk on ongoing support.",
  },
  {
    question: "Can I use Oracle ACS and an independent firm at the same time?",
    answer:
      "Yes. Many accounts use Oracle ACS for standard functional guidance and Oracle escalation access, while separately engaging a boutique firm for SuiteScript development, integration maintenance, and technical support. This dual approach ensures ACS covers what it does well while independent support covers the customization layer ACS excludes.",
  },
  {
    question: "What should I look for when evaluating a NetSuite ACS alternative?",
    answer:
      "Published pricing and transparent scope are the most important signals. A firm that publishes its monthly retainer price and clearly states what is and is not included is demonstrating the same transparency a buyer deserves. Beyond that: certifications (SuiteCloud Developer II, Administrator Professional), dedicated resource assignment, response time SLA, Sandbox testing practice before production changes, and month-to-month vs. annual contract terms.",
  },
];

export const metadata: Metadata = {
  title: "NetSuite ACS Alternatives: 2026 Provider Comparison",
  description:
    "Compare Oracle ACS against boutique managed support, Solution Providers, enterprise consulting firms, and independent consultants. Objective criteria including pricing model, SuiteScript coverage, integration support, and SMB suitability.",
  alternates: { canonical: "/netsuite-acs-alternatives-comparison" },
  openGraph: {
    title: "NetSuite ACS Alternatives: 2026 Provider Comparison",
    description: "Objective comparison of Oracle ACS against the five main alternatives for NetSuite post-go-live support. Pricing, scope, SuiteScript coverage, and SMB suitability compared.",
    url: "https://suitepacific.com/netsuite-acs-alternatives-comparison",
    type: "website",
    images: [{ url: "https://suitepacific.com/og-default.png", width: 1200, height: 630 }],
  },
};

function Check() {
  return <CheckCircle2 className="h-4 w-4 text-green-600 mx-auto" />;
}
function Cross() {
  return <XCircle className="h-4 w-4 text-red-500 mx-auto" />;
}
function Partial() {
  return <MinusCircle className="h-4 w-4 text-amber-500 mx-auto" />;
}

export default function NetsAcsAlternativesComparisonPage() {
  return (
    <main className="pt-32 pb-24 sm:pt-40 sm:pb-32">
      <BreadcrumbJsonLd
        items={[
          { name: "Home", url: SITE_URL },
          { name: "NetSuite ACS Alternatives Comparison", url: `${SITE_URL}/netsuite-acs-alternatives-comparison` },
        ]}
      />
      <FaqJsonLd items={FAQ} />
      <ServiceJsonLd
        name="NetSuite ACS Alternatives Comparison"
        description="Objective comparison of Oracle ACS and its main alternatives for NetSuite post-go-live support, including boutique managed support firms, Solution Providers, enterprise consulting firms, and independent consultants."
        url={`${SITE_URL}/netsuite-acs-alternatives-comparison`}
        serviceType="NetSuite Consulting"
      />
      <OrganizationJsonLd />

      <div className="mx-auto max-w-4xl px-6 lg:px-8">
        <SectionHeading
          as="h1"
          eyebrow="NetSuite Support"
          title="NetSuite ACS Alternatives: 2026 Provider Comparison"
          subtitle="An objective comparison of Oracle ACS and the five main support alternatives for companies already live on NetSuite."
          align="left"
        />

        <div className="mt-6 rounded-2xl border border-brand-100 bg-white p-5 shadow-soft">
          <LeadFormLight />
        </div>
        <p className="mt-3 text-xs text-brand-400">NetSuite-certified · US-based · Month-to-month · $799/month</p>

        <div className="mt-8 rounded-xl bg-brand-50/60 border border-brand-100 px-5 py-4">
          <p className="text-xs font-semibold text-accent uppercase tracking-wide mb-2">Quick answer</p>
          <p className="text-sm text-brand-700 leading-relaxed">
            Oracle ACS (Advanced Customer Support) is Oracle&apos;s paid support add-on for NetSuite, priced as a percentage of the annual license value across four tiers: Advise, Monitor, Optimize, and Architect. ACS covers standard functional guidance and Oracle escalation access, but explicitly excludes custom SuiteScript development, third-party integrations, and custom workflow logic. The five main alternatives are boutique managed support firms (monthly retainer, full technical coverage), regional NetSuite Solution Providers (Oracle-certified, project or retainer), enterprise consulting firms (time-and-materials, premium rates), and independent consultants (hourly, lower cost). For SMB accounts with customized accounts, boutique managed support provides the broadest scope coverage at a predictable monthly rate. SuitePacific publishes its pricing: plans start at $799 per month on month-to-month terms.
          </p>
        </div>

        {/* Comparison table */}
        <div className="mt-14">
          <h2 className="text-lg font-semibold text-brand-900 mb-2">Comparison: NetSuite ACS vs. Five Alternatives</h2>
          <p className="text-sm text-brand-400 mb-6">Criteria based on publicly available information. Pricing and scope vary by provider; verify with each firm before committing.</p>
          <div className="overflow-x-auto rounded-xl border border-brand-100">
            <table className="w-full text-sm min-w-[700px]">
              <thead>
                <tr className="bg-brand-50 border-b border-brand-100">
                  <th className="text-left px-4 py-3 font-semibold text-brand-900 w-40">Criteria</th>
                  {PROVIDERS.map((p) => (
                    <th key={p.name} className="text-center px-3 py-3 font-semibold text-brand-900 text-xs leading-tight">
                      {p.name}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-brand-50">
                <tr className="hover:bg-brand-50/40 transition-colors">
                  <td className="px-4 py-3 text-brand-600 font-medium">Pricing model</td>
                  {PROVIDERS.map((p) => (
                    <td key={p.name} className="px-3 py-3 text-center text-xs text-brand-500">{p.model}</td>
                  ))}
                </tr>
                <tr className="hover:bg-brand-50/40 transition-colors">
                  <td className="px-4 py-3 text-brand-600 font-medium">Published pricing</td>
                  {PROVIDERS.map((p) => (
                    <td key={p.name} className="px-3 py-3 text-center">
                      {p.publishedPricing ? <Check /> : <Cross />}
                    </td>
                  ))}
                </tr>
                <tr className="hover:bg-brand-50/40 transition-colors">
                  <td className="px-4 py-3 text-brand-600 font-medium">Price range</td>
                  {PROVIDERS.map((p) => (
                    <td key={p.name} className="px-3 py-3 text-center text-xs text-brand-500">{p.pricing}</td>
                  ))}
                </tr>
                <tr className="hover:bg-brand-50/40 transition-colors">
                  <td className="px-4 py-3 text-brand-600 font-medium">Min. commitment</td>
                  {PROVIDERS.map((p) => (
                    <td key={p.name} className="px-3 py-3 text-center text-xs text-brand-500">{p.commitment}</td>
                  ))}
                </tr>
                <tr className="hover:bg-brand-50/40 transition-colors">
                  <td className="px-4 py-3 text-brand-600 font-medium">SMB/mid-market focus</td>
                  {PROVIDERS.map((p) => (
                    <td key={p.name} className="px-3 py-3 text-center">
                      {p.smbFocus === true ? <Check /> : p.smbFocus === false ? <Cross /> : <Partial />}
                    </td>
                  ))}
                </tr>
                <tr className="hover:bg-brand-50/40 transition-colors">
                  <td className="px-4 py-3 text-brand-600 font-medium">SuiteScript development</td>
                  {PROVIDERS.map((p) => (
                    <td key={p.name} className="px-3 py-3 text-center">
                      {p.suiteScript ? <Check /> : <Cross />}
                    </td>
                  ))}
                </tr>
                <tr className="hover:bg-brand-50/40 transition-colors">
                  <td className="px-4 py-3 text-brand-600 font-medium">Integration support</td>
                  {PROVIDERS.map((p) => (
                    <td key={p.name} className="px-3 py-3 text-center">
                      {p.integrations ? <Check /> : <Cross />}
                    </td>
                  ))}
                </tr>
                <tr className="hover:bg-brand-50/40 transition-colors">
                  <td className="px-4 py-3 text-brand-600 font-medium">Admin / config support</td>
                  {PROVIDERS.map((p) => (
                    <td key={p.name} className="px-3 py-3 text-center">
                      {p.adminConfig ? <Check /> : <Cross />}
                    </td>
                  ))}
                </tr>
                <tr className="hover:bg-brand-50/40 transition-colors">
                  <td className="px-4 py-3 text-brand-600 font-medium">Release testing</td>
                  {PROVIDERS.map((p) => (
                    <td key={p.name} className="px-3 py-3 text-center text-xs text-brand-500">{p.releaseTesting}</td>
                  ))}
                </tr>
                <tr className="hover:bg-brand-50/40 transition-colors">
                  <td className="px-4 py-3 text-brand-600 font-medium">Dedicated resource</td>
                  {PROVIDERS.map((p) => (
                    <td key={p.name} className="px-3 py-3 text-center text-xs text-brand-500">{p.dedicatedResource}</td>
                  ))}
                </tr>
              </tbody>
            </table>
          </div>
          <p className="mt-3 text-xs text-brand-400">
            Last updated August 2026. ACS tier details from Oracle&apos;s published documentation. Independent firm pricing based on publicly available market rates.
          </p>
        </div>

        {/* Provider breakdowns */}
        <div className="mt-14">
          <h2 className="text-lg font-semibold text-brand-900 mb-6">What Each Provider Type Covers</h2>
          <div className="space-y-5">
            {PROVIDERS.map((p) => (
              <div key={p.name} className="rounded-xl border border-brand-100 bg-white p-5">
                <div className="flex items-start justify-between gap-4 flex-wrap">
                  <div>
                    <h3 className="font-semibold text-brand-900 text-sm">{p.name}</h3>
                    <p className="text-xs text-brand-400 mt-0.5">{p.type} · {p.pricing}</p>
                  </div>
                  <span className="text-xs bg-brand-50 text-brand-500 px-2.5 py-1 rounded-full border border-brand-100 whitespace-nowrap">
                    {p.commitment}
                  </span>
                </div>
                <p className="mt-3 text-sm text-brand-500 leading-relaxed">{p.bestFor}</p>
              </div>
            ))}
          </div>
        </div>

        {/* SuitePacific callout */}
        <div className="mt-10 rounded-xl border border-accent/20 bg-accent/5 p-5">
          <p className="text-xs font-semibold text-accent uppercase tracking-wide mb-2">Boutique managed support example</p>
          <p className="text-sm font-semibold text-brand-900 mb-1">SuitePacific</p>
          <p className="text-sm text-brand-500 mb-3">
            SuitePacific is a US-based boutique NetSuite managed support firm. It is one of the few independent firms that publishes its pricing and scope publicly. Services cover SuiteScript 2.x development, SuiteFlow workflow automation, third-party integration maintenance (Celigo, Shopify, Salesforce, HubSpot), saved searches, Advanced PDF templates, and ongoing NetSuite administration. Certifications: Oracle NetSuite SuiteCloud Developer II and Administrator Professional. Plans start at $799 per month on month-to-month terms with no annual contract and no hour rollover.
          </p>
          <div className="flex flex-wrap gap-2 mb-4">
            {["SuiteScript 2.x", "Celigo", "Shopify", "Salesforce", "SuiteFlow", "Administration", "Release testing"].map((tag) => (
              <span key={tag} className="text-xs bg-white border border-brand-100 text-brand-500 px-2.5 py-1 rounded-full">{tag}</span>
            ))}
          </div>
          <Link href="/netsuite-managed-support" className="text-sm text-accent font-medium hover:underline">
            View SuitePacific managed support plans →
          </Link>
        </div>

        {/* What to evaluate */}
        <div className="mt-14">
          <h2 className="text-lg font-semibold text-brand-900 mb-4">What to Ask Any NetSuite Support Provider</h2>
          <p className="text-sm text-brand-400 mb-5">
            Before signing with any support provider, including ACS, get clear answers on these questions. A provider that cannot or will not answer them is communicating something.
          </p>
          <div className="rounded-xl border border-brand-100 bg-white p-5 space-y-3">
            {[
              "Does this engagement cover SuiteScript development and debugging?",
              "Does it cover third-party integrations such as Celigo, Shopify, or Salesforce?",
              "Is there a published price, or is pricing subject to negotiation?",
              "What is the minimum contract term?",
              "Is there a dedicated resource, or is support drawn from a shared pool?",
              "What is the stated response SLA for urgent issues?",
              "Does the scope include Sandbox testing before production changes?",
              "What happens to unused hours at the end of the month?",
              "Is release regression testing part of the engagement?",
              "Who do you contact when something breaks on a weekend?",
            ].map((q, i) => (
              <div key={i} className="flex items-start gap-3">
                <span className="text-xs font-mono text-brand-300 mt-0.5 w-4 shrink-0">{i + 1}.</span>
                <p className="text-sm text-brand-600">{q}</p>
              </div>
            ))}
          </div>
        </div>

        {/* ACS scope note */}
        <div className="mt-14">
          <h2 className="text-lg font-semibold text-brand-900 mb-4">Why Accounts Switch Away from ACS</h2>
          <p className="text-sm text-brand-400 mb-5">
            Oracle ACS is designed around standard NetSuite functionality. It covers functional guidance, health checks, upgrade preparation, and access to Oracle&apos;s internal escalation paths. The scope boundary that most accounts encounter is the customization layer.
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="rounded-xl border border-brand-100 bg-white p-5">
              <p className="text-xs font-semibold text-brand-900 uppercase tracking-wide mb-3">ACS covers</p>
              <ul className="space-y-2">
                {[
                  "Standard functionality guidance",
                  "Functional best practice recommendations",
                  "Upgrade preparation and release notes",
                  "Designated consultant (Monitor tier and above)",
                  "Oracle internal escalation access",
                  "Account health reviews",
                ].map((item) => (
                  <li key={item} className="flex items-start gap-2 text-sm text-brand-500">
                    <CheckCircle2 className="h-4 w-4 text-green-600 mt-0.5 shrink-0" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
            <div className="rounded-xl border border-brand-100 bg-white p-5">
              <p className="text-xs font-semibold text-brand-900 uppercase tracking-wide mb-3">ACS does not cover</p>
              <ul className="space-y-2">
                {[
                  "Custom SuiteScript development or debugging",
                  "Third-party integration maintenance",
                  "Custom SuiteFlow logic beyond standard config",
                  "Advanced PDF and FreeMarker templates",
                  "Saved search and reporting builds",
                  "Work outside Oracle&apos;s defined ACS scope",
                ].map((item) => (
                  <li key={item} className="flex items-start gap-2 text-sm text-brand-500">
                    <XCircle className="h-4 w-4 text-red-500 mt-0.5 shrink-0" />
                    <span dangerouslySetInnerHTML={{ __html: item }} />
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        {/* Internal links */}
        <div className="mt-10 rounded-xl border border-brand-100 bg-brand-50/40 p-5">
          <p className="text-xs font-semibold text-brand-900 uppercase tracking-wide mb-3">Related resources</p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
            {[
              { label: "NetSuite ACS pricing breakdown", href: "/netsuite-acs-pricing" },
              { label: "NetSuite support comparison", href: "/netsuite-support-comparison" },
              { label: "NetSuite managed support plans", href: "/netsuite-managed-support" },
              { label: "NetSuite support pricing benchmark 2026", href: "/blog/netsuite-support-pricing-benchmark-2026" },
              { label: "Do I need NetSuite ACS?", href: "/do-i-need-netsuite-acs" },
              { label: "Implementation partner vs. managed support", href: "/netsuite-implementation-partner-vs-managed-support" },
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

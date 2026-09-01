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
  {
    question: "What is the best alternative to NetSuite ACS?",
    answer:
      "The best alternative depends on what your account actually needs. If your primary support requirements involve SuiteScript development, third-party integration maintenance, custom workflow logic, and ongoing administration, a boutique managed support firm is the strongest fit. ACS does not cover custom SuiteScript or integrations, which are the most common ongoing technical needs for post-go-live accounts. If your requirements are limited to standard functional guidance and Oracle escalation access, ACS may still be the right model. For accounts that need both, a hybrid approach using ACS for Oracle-specific needs and a managed firm for the technical layer is a common and practical arrangement.",
  },
  {
    question: "Can SuitePacific replace NetSuite ACS?",
    answer:
      "SuitePacific can replace ACS for the day-to-day technical support that most post-go-live accounts require: SuiteScript development, integration maintenance, SuiteFlow workflows, administration, saved searches, Advanced PDF templates, and ongoing enhancements. SuitePacific does not provide Oracle-direct escalation access, which is one function ACS provides. For accounts where Oracle escalation is a regular need, a hybrid model using both ACS and SuitePacific may be the right arrangement. For accounts where the primary support need is the technical and customisation layer, SuitePacific covers more of the actual day-to-day workload than ACS does.",
  },
  {
    question: "Is SuitePacific month-to-month?",
    answer:
      "Yes. SuitePacific managed support plans are month-to-month after an initial three-month minimum engagement. There is no annual contract requirement. Plans start at $799 per month. Hours do not roll over between months.",
  },
  {
    question: "Does SuitePacific cover SuiteScript, integrations, and NetSuite administration?",
    answer:
      "Yes. SuitePacific covers SuiteScript 2.x development and debugging, third-party integration maintenance (Celigo, Shopify, Salesforce, HubSpot, SFTP, REST and SOAP APIs), SuiteFlow workflow automation, NetSuite administration, saved searches, Advanced PDF and FreeMarker templates, custom records and fields, release impact testing, and ongoing enhancements. All of these are within scope on every plan. Oracle SuiteCloud Developer II and Administrator Professional certified.",
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
        <div className="mt-4 flex flex-wrap gap-2">
          {["Oracle SuiteCloud Developer II", "Oracle Administrator Professional", "Celigo Mastery Level 4", "Direct developer access", "No annual contract"].map((badge) => (
            <span key={badge} className="text-xs bg-brand-50 border border-brand-100 text-brand-600 px-3 py-1 rounded-full">{badge}</span>
          ))}
        </div>

        <div className="mt-8 rounded-xl bg-brand-50/60 border border-brand-100 px-5 py-4">
          <div className="flex items-center gap-3 mb-2">
            <p className="text-xs font-semibold text-accent uppercase tracking-wide">Quick answer</p>
            <span className="text-xs text-brand-400">Updated September 2026</span>
          </div>
          <p className="text-sm text-brand-700 leading-relaxed">
            If your NetSuite account is post-go-live and you are evaluating whether to renew ACS or move to an alternative, the decision turns on one question: does your primary support need sit in the standard functionality layer or the technical customisation layer? Oracle ACS (Advanced Customer Support) is Oracle&apos;s paid support add-on for NetSuite, priced as a percentage of the annual license value across four tiers: Advise, Monitor, Optimize, and Architect. ACS covers standard functional guidance and Oracle escalation access, but explicitly excludes custom SuiteScript development, third-party integrations, and custom workflow logic. The five main alternatives are boutique managed support firms (monthly retainer, full technical coverage), regional NetSuite Solution Providers (Oracle-certified, project or retainer), enterprise consulting firms (time-and-materials, premium rates), and independent consultants (hourly, lower cost). For SMB accounts with customised environments, boutique managed support provides the broadest scope at a predictable monthly rate. SuitePacific publishes its pricing: plans start at $799 per month on month-to-month terms.
          </p>
        </div>

        <div className="mt-6 rounded-xl border border-accent/20 bg-accent/5 px-5 py-4">
          <p className="text-sm text-brand-700 leading-relaxed">
            <strong>For SMB and mid-market companies that need ongoing hands-on technical support for SuiteScript, integrations, workflows and customisations, boutique managed support is the most practical alternative to ACS.</strong>
          </p>
          <p className="text-sm text-brand-500 mt-2">
            ACS does not cover custom SuiteScript development, third-party integrations, or custom workflow logic. If those are your primary ongoing support needs, ACS scope runs out before the first request is addressed.
          </p>
          <Link href="/netsuite-care" className="mt-3 inline-block text-sm text-accent font-medium hover:underline">
            Explore SuitePacific managed support plans →
          </Link>
        </div>

        {/* Why customers look for ACS alternatives */}
        <div className="mt-14">
          <h2 className="text-lg font-semibold text-brand-900 mb-4">Why NetSuite Customers Look for an ACS Alternative</h2>
          <p className="text-sm text-brand-400 mb-5">
            The decision to evaluate ACS alternatives usually comes from one of five recurring situations.
          </p>
          <div className="space-y-3">
            {[
              {
                n: "1",
                heading: "They need hands-on development",
                body: "The business needs someone to actually build and modify scripts, workflows, searches and integrations, not provide guidance on how to do it themselves.",
              },
              {
                n: "2",
                heading: "They need faster turnaround",
                body: "Small changes become slow when every request moves through a formal support queue. A managed retainer with direct developer access changes that dynamic.",
              },
              {
                n: "3",
                heading: "They need continuity",
                body: "They want a technical team that understands their account&apos;s customisations and integrations over time, without re-briefing on every request.",
              },
              {
                n: "4",
                heading: "They need coverage beyond standard NetSuite",
                body: "Their environment includes custom scripts, integrations, workflows, custom records and PDFs. ACS does not cover any of these.",
              },
              {
                n: "5",
                heading: "They want flexible terms",
                body: "They do not want another annual contract. They want reliable technical help on a monthly basis that they can adjust as their needs change.",
              },
            ].map((item) => (
              <div key={item.n} className="flex items-start gap-4 rounded-xl border border-brand-100 bg-white p-4">
                <span className="text-xs font-mono font-semibold text-accent mt-0.5 w-5 shrink-0">{item.n}.</span>
                <div>
                  <p className="text-sm font-semibold text-brand-900 mb-1">{item.heading}</p>
                  <p className="text-sm text-brand-500" dangerouslySetInnerHTML={{ __html: item.body }} />
                </div>
              </div>
            ))}
          </div>
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


        {/* Decision framework */}
        <div className="mt-14">
          <h2 className="text-lg font-semibold text-brand-900 mb-2">Which NetSuite ACS Alternative Is Right for You?</h2>
          <p className="text-sm text-brand-400 mb-6">Use your actual support requirements to identify the right model before evaluating individual providers.</p>
          <div className="space-y-4">
            <div className="rounded-xl border border-brand-100 bg-white p-5">
              <p className="text-sm font-semibold text-brand-900 mb-2">Choose Oracle ACS if:</p>
              <ul className="space-y-1.5">
                {["You primarily need Oracle platform expertise and functional guidance", "You need Oracle&apos;s internal escalation access", "Your environment uses mostly standard NetSuite features with minimal customisation", "Your requirements align with the specific ACS tier you have purchased"].map((item) => (
                  <li key={item} className="flex items-start gap-2 text-sm text-brand-500">
                    <CheckCircle2 className="h-4 w-4 text-green-600 mt-0.5 shrink-0" />
                    <span dangerouslySetInnerHTML={{ __html: item }} />
                  </li>
                ))}
              </ul>
            </div>
            <div className="rounded-xl border-2 border-accent/30 bg-gradient-to-br from-accent/5 to-transparent p-5">
              <p className="text-sm font-semibold text-brand-900 mb-2">Choose a boutique managed support firm if:</p>
              <ul className="space-y-1.5">
                {["You need ongoing SuiteScript development and debugging", "You rely on third-party integrations (Celigo, Shopify, Salesforce, HubSpot)", "You need workflow automation and reporting support", "You want a long-term technical partner who knows your account", "You want direct developer access and month-to-month terms", "You do not want to hire a full-time NetSuite developer"].map((item) => (
                  <li key={item} className="flex items-start gap-2 text-sm text-brand-500">
                    <CheckCircle2 className="h-4 w-4 text-accent mt-0.5 shrink-0" />
                    {item}
                  </li>
                ))}
              </ul>
              <p className="mt-3 text-xs font-semibold text-accent">SuitePacific is built for this use case. Plans from $799/month, month-to-month.</p>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              {[
                { heading: "Choose a Solution Provider if:", items: ["You need a large implementation project", "You are adding significant new functionality", "You need an Oracle-certified partner for a scoped engagement"] },
                { heading: "Choose an enterprise firm if:", items: ["You have complex global requirements", "You need a large consulting team", "You are undertaking a major ERP transformation"] },
                { heading: "Choose an independent consultant if:", items: ["Your needs are small and well-defined", "You have a bounded technical project", "You do not need ongoing coverage or continuity"] },
              ].map((card) => (
                <div key={card.heading} className="rounded-xl border border-brand-100 bg-white p-4">
                  <p className="text-sm font-semibold text-brand-900 mb-2">{card.heading}</p>
                  <ul className="space-y-1.5">
                    {card.items.map((item) => (
                      <li key={item} className="flex items-start gap-2 text-xs text-brand-500">
                        <span className="text-brand-300 mt-0.5 shrink-0">·</span>
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
          <div className="mt-5 text-center">
            <Link href="/netsuite-care" className="inline-block rounded-lg bg-accent px-5 py-2.5 text-sm font-semibold text-white hover:bg-accent/90 transition-colors">
              Get your support recommendation →
            </Link>
          </div>
        </div>

        {/* Bottom Line */}
        <div className="mt-12 rounded-2xl border-2 border-accent/30 bg-gradient-to-br from-accent/5 to-transparent p-6">
          <p className="text-xs font-semibold uppercase tracking-wide text-accent mb-3">Bottom Line</p>
          <h2 className="text-base font-semibold text-brand-900 mb-3">
            For SMB accounts with active customisations, a boutique managed retainer covers more of the actual support work than any other model at a predictable monthly cost.
          </h2>
          <p className="text-sm text-brand-500 mb-4">
            ACS, enterprise SIs, and freelancers all have structural limitations for post-go-live accounts with ongoing technical needs. ACS excludes the technical layer. Enterprise SIs carry project overhead on every request. Freelancers lack continuity and accountability. A boutique managed retainer from a certified firm covers everything in one engagement.
          </p>
          <p className="text-sm text-brand-500 mb-4">
            SuitePacific is a US-based boutique managed support firm covering SuiteScript, integrations, workflow automation, administration, and break-fix in a single retainer. Oracle SuiteCloud Developer II and Administrator Professional certified. Plans from $799 per month, month-to-month.
          </p>
          <ul className="space-y-2 text-sm text-brand-500">
            <li className="flex items-start gap-2"><span className="text-accent font-bold mt-0.5">→</span> All technical areas in one retainer: SuiteScript, integrations, workflows, administration</li>
            <li className="flex items-start gap-2"><span className="text-accent font-bold mt-0.5">→</span> Predictable monthly cost with no per-request SOW overhead</li>
            <li className="flex items-start gap-2"><span className="text-accent font-bold mt-0.5">→</span> Oracle-certified, US-based, direct developer access on all plans</li>
          </ul>
        </div>

        {/* SuitePacific detailed section */}
        <div className="mt-10">
          <h2 className="text-lg font-semibold text-brand-900 mb-2">SuitePacific: A Hands-On NetSuite ACS Alternative</h2>
          <p className="text-sm text-brand-400 mb-5">
            SuitePacific is a US-based boutique NetSuite consultancy focused specifically on post-go-live technical support. Instead of treating every request as a separate project, SuitePacific provides ongoing access to NetSuite developers and administrators who maintain, troubleshoot and improve the technical layer of your existing account.
          </p>
          <div className="rounded-xl border border-accent/20 bg-accent/5 p-5">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              <div>
                <p className="text-xs font-semibold text-brand-900 uppercase tracking-wide mb-3">What SuitePacific handles</p>
                <ul className="space-y-1.5">
                  {[
                    "SuiteScript 2.x development and debugging",
                    "SuiteFlow workflow automation",
                    "Saved searches and dashboards",
                    "Advanced PDF and FreeMarker templates",
                    "Custom records and fields",
                    "NetSuite administration",
                    "Celigo integration maintenance",
                    "Shopify, Salesforce, HubSpot integrations",
                    "SFTP and REST/SOAP API integrations",
                    "Bug fixes and break-fix support",
                    "Release impact analysis and testing",
                    "Ongoing enhancements",
                  ].map((item) => (
                    <li key={item} className="flex items-start gap-2 text-sm text-brand-600">
                      <CheckCircle2 className="h-4 w-4 text-accent mt-0.5 shrink-0" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
              <div className="space-y-4">
                <div>
                  <p className="text-xs font-semibold text-brand-900 uppercase tracking-wide mb-3">Certifications</p>
                  <ul className="space-y-1.5">
                    {["Oracle NetSuite SuiteCloud Developer II", "Oracle NetSuite Administrator Professional", "Celigo integrator.io Mastery Level 4"].map((cert) => (
                      <li key={cert} className="flex items-start gap-2 text-sm text-brand-600">
                        <CheckCircle2 className="h-4 w-4 text-green-600 mt-0.5 shrink-0" />
                        {cert}
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="rounded-lg border border-accent/20 bg-white p-4">
                  <p className="text-xs font-semibold text-brand-900 mb-2">Plan details</p>
                  <p className="text-2xl font-bold text-accent mb-1">$799<span className="text-sm font-normal text-brand-400">/month</span></p>
                  <p className="text-xs text-brand-400 mb-3">Starting price. Month-to-month after 3-month minimum.</p>
                  <ul className="space-y-1 text-xs text-brand-500">
                    <li>· Direct developer access on all plans</li>
                    <li>· US-based, no offshore handoffs</li>
                    <li>· No annual contract required</li>
                    <li>· 1 business day response SLA</li>
                  </ul>
                </div>
                <Link href="/netsuite-care" className="inline-block w-full text-center rounded-lg bg-accent px-4 py-2.5 text-sm font-semibold text-white hover:bg-accent/90 transition-colors">
                  View SuitePacific support plans →
                </Link>
              </div>
            </div>
          </div>
        </div>

        {/* ACS + SuitePacific hybrid */}
        <div className="mt-14">
          <h2 className="text-lg font-semibold text-brand-900 mb-2">You Do Not Have to Choose Between ACS and a Technical Partner</h2>
          <p className="text-sm text-brand-400 mb-5">
            Some accounts benefit from both. ACS and SuitePacific address different parts of the support equation and can run in parallel.
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="rounded-xl border border-brand-100 bg-white p-5">
              <p className="text-sm font-semibold text-brand-900 mb-3">Oracle ACS handles:</p>
              <p className="text-sm text-brand-500 leading-relaxed">
                Oracle ACS provides platform-level expertise and functional guidance delivered by Oracle consultants. The primary value is access to Oracle&apos;s internal escalation paths for platform bugs and standard feature configuration. ACS tiers define the specific services included; what is covered varies significantly by tier, with the entry-level Advise tier providing the most limited scope.
              </p>
            </div>
            <div className="rounded-xl border border-accent/20 bg-accent/5 p-5">
              <p className="text-sm font-semibold text-brand-900 mb-3">SuitePacific handles:</p>
              <p className="text-sm text-brand-500 leading-relaxed">
                SuitePacific covers the technical layer that ACS explicitly excludes: custom SuiteScript 2.x development and debugging, third-party integration maintenance for Celigo, Shopify, Salesforce, HubSpot, and REST/SOAP APIs, SuiteFlow workflow automation, ongoing NetSuite administration, saved searches, Advanced PDF and FreeMarker templates, release impact testing, and ongoing enhancements.
              </p>
            </div>
          </div>
          <p className="mt-4 text-sm text-brand-500 rounded-xl border border-brand-100 bg-white p-4">
            Keeping ACS for the areas where Oracle provides unique value while using SuitePacific for the day-to-day technical layer is a practical arrangement for accounts that genuinely need both.
          </p>
        </div>

        {/* ACS Renewal section */}
        <div className="mt-14 rounded-2xl border-2 border-brand-100 bg-white p-6">
          <p className="text-xs font-semibold uppercase tracking-wide text-accent mb-3">ACS Renewal</p>
          <h2 className="text-base font-semibold text-brand-900 mb-3">Your ACS Renewal Is Coming. Is It Still the Right Fit?</h2>
          <p className="text-sm text-brand-500 mb-4">
            Before renewing another ACS engagement, look at what your account actually needed over the past year. If the majority of requests involved SuiteScript, integrations, workflows, administration and ongoing enhancements, a managed technical support model may provide better coverage for your day-to-day requirements.
          </p>
          <p className="text-sm font-semibold text-brand-700 mb-3">We can help you evaluate:</p>
          <ul className="space-y-2 text-sm text-brand-500 mb-5">
            {[
              "What your team actually needed from support over the past year",
              "How much of your support workload is in the technical layer vs. standard functionality",
              "Which work required Oracle involvement and which could be handled independently",
              "Whether ACS should be replaced, supplemented, or continued as-is",
            ].map((item) => (
              <li key={item} className="flex items-start gap-2">
                <span className="text-accent font-bold mt-0.5 shrink-0">→</span>
                {item}
              </li>
            ))}
          </ul>
          <Link href="/contact" className="inline-block rounded-lg bg-accent px-5 py-2.5 text-sm font-semibold text-white hover:bg-accent/90 transition-colors">
            Get a free ACS alternative assessment →
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

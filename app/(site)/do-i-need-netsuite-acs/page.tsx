import type { Metadata } from "next";
import Link from "next/link";
import { CheckCircle2, XCircle } from "lucide-react";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { BreadcrumbJsonLd, FaqJsonLd, ServiceJsonLd, OrganizationJsonLd } from "@/components/seo/JsonLd";
import { ServiceFaqSection } from "@/components/ui/ServiceFaqSection";
import { LeadFormLight } from "@/components/sections/LeadFormLight";
import { SITE_URL } from "@/lib/content";

const ACS_YES = [
  "Your NetSuite account uses mostly standard out-of-box functionality with minimal customization",
  "You want direct access to Oracle's internal escalation path for platform-level issues",
  "You need a designated Oracle functional consultant for upgrade preparation and health reviews",
  "Your implementation was recent and you are still in the phase of learning standard NetSuite behavior",
  "Your primary support need is functional guidance, not technical development",
  "You have a separate technical resource (internal or external) who handles customizations",
];

const ACS_NO = [
  "Your account has significant SuiteScript customizations that need ongoing maintenance",
  "You rely on third-party integrations (Celigo, Shopify, Salesforce, HubSpot, Amazon) that require active support",
  "Your implementation partner built custom workflows that now need debugging or enhancement",
  "You need help with Advanced PDF templates, custom records, or complex saved search formulas",
  "Your primary pain points are script errors, broken integrations, or workflow failures",
  "You want month-to-month terms without an annual contract commitment",
  "Your license value is low (under $40,000/year) and ACS pricing represents a disproportionate cost",
];

const SCENARIOS = [
  {
    title: "You just went live and are still learning NetSuite",
    recommendation: "ACS Advise or Monitor",
    reason: "During the first 6-12 months post-implementation, functional guidance and access to Oracle's support team have real value. Your customizations are minimal and the primary need is learning standard NetSuite behavior.",
  },
  {
    title: "You are live and have built significant customizations",
    recommendation: "Independent managed support",
    reason: "Once your account depends on SuiteScript, integrations, and custom workflows, ACS scope no longer covers the most common failure points. An independent managed retainer covers the technical layer ACS excludes.",
  },
  {
    title: "You have ACS but still pay separately for technical work",
    recommendation: "Evaluate whether ACS is worth the cost",
    reason: "If you are paying for ACS plus a separate technical resource for SuiteScript and integrations, you are running two support engagements. Review whether the ACS value (Oracle escalation, functional guidance) justifies the additional cost given what you are paying to cover ACS gaps.",
  },
  {
    title: "Your implementation partner has disengaged",
    recommendation: "Independent managed support",
    reason: "When the partner who built your account has moved on, ACS cannot fill that gap. You need a technical resource who can read, understand, and maintain what was built. ACS consultants do not do this.",
  },
  {
    title: "You are an enterprise with complex Oracle dependencies",
    recommendation: "ACS Optimize or Architect",
    reason: "Large accounts with multi-entity structures, OneWorld, or complex Oracle-side dependencies benefit from the dedicated CSM, senior escalation access, and strategic roadmap sessions at higher ACS tiers.",
  },
];

const FAQ = [
  {
    question: "Do I need NetSuite ACS?",
    answer:
      "It depends on your account profile. ACS provides value for accounts using mostly standard NetSuite functionality who want Oracle functional guidance and internal escalation access. It is less valuable for accounts whose primary support needs are SuiteScript development, integration maintenance, and custom workflow debugging, because these fall outside ACS scope regardless of tier. Most post-implementation accounts with customizations get more coverage from an independent managed support retainer than from ACS.",
  },
  {
    question: "What happens if I cancel NetSuite ACS?",
    answer:
      "Canceling ACS removes access to Oracle's designated support consultants, the ACS portal, and any tier-specific services (CSM, health reviews, etc.). Standard NetSuite Support remains in place as part of your base license. If you cancel ACS and engage an independent managed support firm, the independent firm handles technical support while Oracle Standard Support handles platform-level bug escalation.",
  },
  {
    question: "Can I replace ACS with an independent NetSuite consultant?",
    answer:
      "Yes, but they serve different purposes. ACS provides Oracle-side functional guidance and internal escalation. An independent managed support firm provides technical development, integration maintenance, and break-fix coverage for customizations. Many accounts cancel ACS and move entirely to an independent firm for cost reasons. The trade-off is losing Oracle escalation access and the ACS designated consultant.",
  },
  {
    question: "Is ACS worth it for small NetSuite accounts?",
    answer:
      "For small accounts (annual license under $40,000), ACS cost represents a meaningful additional percentage of the total NetSuite spend, and ACS scope may not align with the account's actual support needs. Small accounts are typically post-go-live companies with SuiteScript-dependent processes who need technical support, not functional guidance. For these accounts, a boutique managed support retainer at $799/month provides better coverage at a comparable or lower annual cost.",
  },
  {
    question: "What does ACS actually do day-to-day?",
    answer:
      "Day-to-day ACS support looks like: answering functional questions about how NetSuite features work, reviewing saved search or dashboard requests within standard tools, advising on upgrade preparation and release note interpretation, and escalating platform bugs to Oracle engineering. At Monitor tier and above, you have a named consultant who can be engaged directly. ACS does not write or debug SuiteScript, fix broken integrations, or touch custom code.",
  },
  {
    question: "How do I know if I am getting value from ACS?",
    answer:
      "Track the hours used each month (or quarter for Advise/Monitor), the nature of the requests fulfilled, and whether those requests would have required SuiteScript or integration work, which ACS cannot do anyway. If the primary value you receive is a point of contact at Oracle rather than substantive technical output, evaluate whether that contact justifies the annual cost relative to what an independent firm would charge for the same scope.",
  },
];

export const metadata: Metadata = {
  title: "Do I Need NetSuite ACS? A Decision Guide",
  description:
    "A practical guide to deciding whether Oracle ACS (Advanced Customer Support) is right for your NetSuite account. Covers ACS scope, when it adds value, when it does not, and what alternatives exist.",
  alternates: { canonical: "/do-i-need-netsuite-acs" },
  openGraph: {
    title: "Do I Need NetSuite ACS? A Decision Guide",
    description: "When Oracle ACS is worth it and when it is not. Covers ACS scope, five account scenarios, and what to do if ACS does not cover your actual support needs.",
    url: "https://suitepacific.com/do-i-need-netsuite-acs",
    type: "website",
    images: [{ url: "https://suitepacific.com/og-default.png", width: 1200, height: 630 }],
  },
};

export default function DoINeedNetSuiteAcsPage() {
  return (
    <main className="pt-32 pb-24 sm:pt-40 sm:pb-32">
      <BreadcrumbJsonLd
        items={[
          { name: "Home", url: SITE_URL },
          { name: "Do I Need NetSuite ACS?", url: `${SITE_URL}/do-i-need-netsuite-acs` },
        ]}
      />
      <FaqJsonLd items={FAQ} />
      <ServiceJsonLd
        name="Do I Need NetSuite ACS?"
        description="A decision guide for NetSuite account holders evaluating whether Oracle ACS provides value for their specific account profile and support needs."
        url={`${SITE_URL}/do-i-need-netsuite-acs`}
        serviceType="NetSuite Consulting"
      />
      <OrganizationJsonLd />

      <div className="mx-auto max-w-3xl px-6 lg:px-8">
        <SectionHeading
          as="h1"
          eyebrow="NetSuite Support"
          title="Do I Need NetSuite ACS?"
          subtitle="A practical decision guide for NetSuite account holders evaluating whether Oracle Advanced Customer Support is the right fit for their account."
          align="left"
        />

        <div className="mt-6 rounded-2xl border border-brand-100 bg-white p-5 shadow-soft">
          <LeadFormLight />
        </div>
        <p className="mt-3 text-xs text-brand-400">NetSuite-certified · US-based · Month-to-month · No ACS required</p>

        <div className="mt-8 rounded-xl bg-brand-50/60 border border-brand-100 px-5 py-4">
          <p className="text-xs font-semibold text-accent uppercase tracking-wide mb-2">Quick answer</p>
          <p className="text-sm text-brand-700 leading-relaxed">
            ACS (Advanced Customer Support) is Oracle&apos;s paid support add-on for NetSuite. It covers standard functional guidance, Oracle escalation access, upgrade preparation, and at higher tiers a designated consultant and Customer Success Manager. ACS does not cover SuiteScript development, third-party integration maintenance, or custom workflow debugging. Whether ACS is worth it depends on your account profile. Accounts using mostly standard NetSuite features benefit from ACS functional guidance. Accounts with significant customizations and integrations often find that ACS does not cover their actual day-to-day support needs, making an independent managed support retainer a more appropriate fit. Plans from boutique firms start at $799 per month on month-to-month terms and cover the full technical layer ACS excludes.
          </p>
        </div>

        {/* Yes/No grid */}
        <div className="mt-14">
          <h2 className="text-lg font-semibold text-brand-900 mb-6">ACS Is a Good Fit When...</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="rounded-xl border border-brand-100 bg-white p-5">
              <p className="text-xs font-semibold text-green-700 uppercase tracking-wide mb-3">ACS adds value</p>
              <ul className="space-y-3">
                {ACS_YES.map((item) => (
                  <li key={item} className="flex items-start gap-2 text-sm text-brand-500">
                    <CheckCircle2 className="h-4 w-4 text-green-600 mt-0.5 shrink-0" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
            <div className="rounded-xl border border-brand-100 bg-white p-5">
              <p className="text-xs font-semibold text-red-600 uppercase tracking-wide mb-3">ACS may not be sufficient</p>
              <ul className="space-y-3">
                {ACS_NO.map((item) => (
                  <li key={item} className="flex items-start gap-2 text-sm text-brand-500">
                    <XCircle className="h-4 w-4 text-red-500 mt-0.5 shrink-0" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        {/* Scenarios */}
        <div className="mt-14">
          <h2 className="text-lg font-semibold text-brand-900 mb-6">Five Account Scenarios: What to Do</h2>
          <div className="space-y-4">
            {SCENARIOS.map((s) => (
              <div key={s.title} className="rounded-xl border border-brand-100 bg-white p-5">
                <h3 className="font-semibold text-brand-900 text-sm">{s.title}</h3>
                <p className="text-xs text-accent font-medium mt-1.5">Recommendation: {s.recommendation}</p>
                <p className="text-sm text-brand-400 mt-2">{s.reason}</p>
              </div>
            ))}
          </div>
        </div>

        {/* What ACS actually covers */}
        <div className="mt-14">
          <h2 className="text-lg font-semibold text-brand-900 mb-4">What ACS Actually Does</h2>
          <p className="text-sm text-brand-400 mb-5">
            Understanding what ACS provides day-to-day is the most important input to the decision. Most accounts that are dissatisfied with ACS expected it to cover technical customization work that Oracle explicitly excludes from scope.
          </p>
          <div className="rounded-xl border border-brand-100 bg-white p-5">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div>
                <p className="text-xs font-semibold text-brand-900 uppercase tracking-wide mb-3">ACS provides</p>
                <ul className="space-y-2 text-sm text-brand-500">
                  <li>Functional guidance on standard NetSuite features</li>
                  <li>Upgrade preparation and release note review</li>
                  <li>Account health assessments</li>
                  <li>Oracle internal escalation for platform bugs</li>
                  <li>Designated consultant (Monitor tier and above)</li>
                  <li>Customer Success Manager (Optimize and above)</li>
                </ul>
              </div>
              <div>
                <p className="text-xs font-semibold text-brand-900 uppercase tracking-wide mb-3">ACS does not provide</p>
                <ul className="space-y-2 text-sm text-brand-500">
                  <li>SuiteScript development or debugging</li>
                  <li>Integration support (Celigo, Shopify, Salesforce, etc.)</li>
                  <li>Custom workflow development beyond standard config</li>
                  <li>Advanced PDF template work</li>
                  <li>Custom saved search and formula development</li>
                  <li>Break-fix for scripts or workflows built by your partner</li>
                </ul>
              </div>
            </div>
          </div>
        </div>

        {/* Cost consideration */}
        <div className="mt-14">
          <h2 className="text-lg font-semibold text-brand-900 mb-4">The Cost Consideration</h2>
          <p className="text-sm text-brand-400 mb-4">
            ACS is priced as a percentage of the annual NetSuite license, typically 5–8% or more. For a $60,000 annual license, that is $3,000–$6,000 per year for entry-level ACS. For accounts with significant customizations, this cost is paid on top of whatever is spent separately on technical support for the customization layer ACS excludes.
          </p>
          <p className="text-sm text-brand-400 mb-4">
            An independent managed support retainer at $799/month covers SuiteScript, integrations, administration, and workflow support: the full technical layer. At $9,588/year for the entry plan, it costs more in absolute terms than entry-level ACS, but replaces both ACS and any separate technical engagement.
          </p>
          <p className="text-sm text-brand-400">
            Accounts that run both ACS and an independent technical resource should evaluate whether Oracle escalation access and functional guidance justify the additional ACS cost given what they are already paying.
          </p>
        </div>


        {/* Bottom Line */}
        <div className="mt-12 rounded-2xl border-2 border-accent/30 bg-gradient-to-br from-accent/5 to-transparent p-6">
          <p className="text-xs font-semibold uppercase tracking-wide text-accent mb-3">Bottom Line</p>
          <h2 className="text-base font-semibold text-brand-900 mb-3">
            For most post-go-live accounts, ACS does not cover the support work that matters most. SuitePacific does.
          </h2>
          <p className="text-sm text-brand-500 mb-4">
            ACS provides value when the primary support need is functional guidance and Oracle escalation access. For accounts that depend on SuiteScript, integrations, and custom workflows, ACS scope runs out before the first real support request is addressed.
          </p>
          <p className="text-sm text-brand-500 mb-4">
            SuitePacific is the most direct alternative: Oracle-certified (SuiteCloud Developer II + Administrator Professional), covering the full technical layer ACS excludes, on month-to-month terms from $799 per month. No annual contract, no functional-only scope limitation.
          </p>
          <ul className="space-y-2 text-sm text-brand-500">
            <li className="flex items-start gap-2"><span className="text-accent font-bold mt-0.5">→</span> Covers SuiteScript, integrations, workflows, and administration in one retainer</li>
            <li className="flex items-start gap-2"><span className="text-accent font-bold mt-0.5">→</span> Month-to-month terms with no annual commitment, unlike ACS</li>
            <li className="flex items-start gap-2"><span className="text-accent font-bold mt-0.5">→</span> Oracle-certified technical developers, not functional consultants</li>
          </ul>
        </div>

        {/* SuitePacific CTA */}
        <div className="mt-10 rounded-xl border border-accent/20 bg-accent/5 p-5">
          <p className="text-xs font-semibold text-accent uppercase tracking-wide mb-2">If your account needs more than ACS covers</p>
          <p className="text-sm font-semibold text-brand-900 mb-2">SuitePacific covers the layer ACS does not</p>
          <p className="text-sm text-brand-500 mb-4">
            SuitePacific is a US-based boutique NetSuite managed support firm specializing in post-go-live accounts with customizations and integrations. Services include SuiteScript 2.x development and debugging, Celigo, Shopify, and Salesforce integration maintenance, SuiteFlow workflow support, saved searches, Advanced PDF templates, and day-to-day administration. Certified: Oracle NetSuite SuiteCloud Developer II and Administrator Professional. Plans start at $799 per month, month-to-month, no annual contract.
          </p>
          <div className="flex flex-col sm:flex-row gap-3">
            <Link href="/netsuite-care" className="text-sm text-accent font-medium hover:underline">
              View managed support plans →
            </Link>
            <Link href="/netsuite-acs-alternatives-comparison" className="text-sm text-brand-400 hover:underline">
              Compare all ACS alternatives →
            </Link>
          </div>
        </div>

        {/* Internal links */}
        <div className="mt-10 rounded-xl border border-brand-100 bg-brand-50/40 p-5">
          <p className="text-xs font-semibold text-brand-900 uppercase tracking-wide mb-3">Related</p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
            {[
              { label: "NetSuite ACS pricing breakdown", href: "/netsuite-acs-pricing" },
              { label: "NetSuite ACS alternatives comparison", href: "/netsuite-acs-alternatives-comparison" },
              { label: "NetSuite ACS alternative", href: "/netsuite-acs-alternative" },
              { label: "NetSuite managed support plans", href: "/netsuite-managed-support" },
              { label: "NetSuite post-go-live support", href: "/netsuite-post-go-live-support" },
              { label: "NetSuite support comparison", href: "/netsuite-support-comparison" },
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

import type { Metadata } from "next";
import Link from "next/link";
import { CheckCircle2, XCircle, MinusCircle } from "lucide-react";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { BreadcrumbJsonLd, FaqJsonLd, ServiceJsonLd, OrganizationJsonLd } from "@/components/seo/JsonLd";
import { ServiceFaqSection } from "@/components/ui/ServiceFaqSection";
import { LeadFormLight } from "@/components/sections/LeadFormLight";
import { SITE_URL } from "@/lib/content";

const MODELS = [
  {
    name: "Oracle NetSuite Standard Support",
    provider: "Oracle (included)",
    cost: "Included in license",
    hours: "Unlimited tickets",
    covers: [
      "Platform-level bug reports",
      "Standard functionality questions",
      "Documentation and knowledge base access",
      "Release note guidance",
    ],
    doesNotCover: [
      "SuiteScript customizations",
      "SuiteFlow workflows",
      "Third-party integrations",
      "Account-specific configuration",
      "Custom records and saved searches",
      "Advanced PDF templates",
    ],
    bestFor: "Platform bug reports and questions about standard NetSuite functionality. Not a substitute for technical support on a customized account.",
  },
  {
    name: "Oracle ACS (Advanced Customer Support)",
    provider: "Oracle (paid add-on)",
    cost: "Varies by tier; starts at low four figures per quarter",
    hours: "Shared pool to ~40 hrs/month depending on tier",
    covers: [
      "Functional guidance and best practices",
      "Designated consultant (Monitor tier and above)",
      "Upgrade preparation assistance",
      "Standard configuration support",
      "Access to Oracle's internal escalation paths",
    ],
    doesNotCover: [
      "Custom SuiteScript development or debugging",
      "Third-party integrations (Shopify, Salesforce, Celigo, etc.)",
      "Custom workflow logic beyond standard configuration",
      "Advanced PDF and FreeMarker template work",
      "Work that falls outside Oracle's approved ACS scope",
    ],
    bestFor: "Accounts that want ongoing functional guidance from Oracle and are primarily using standard NetSuite features with limited customization.",
  },
  {
    name: "Third-Party Managed Retainer",
    provider: "Independent consulting firm",
    cost: "$799–$2,499/month fixed",
    hours: "10–35 hours/month depending on plan",
    covers: [
      "SuiteScript development and debugging",
      "Workflow and SuiteFlow automation",
      "Third-party integration maintenance",
      "Advanced PDF and email template work",
      "Saved searches and reporting",
      "Administration and configuration",
      "Release regression testing in Sandbox",
      "Break-fix for scripts, workflows, and integrations",
    ],
    doesNotCover: [
      "Oracle platform-level bugs (refer to Oracle support)",
      "Large net-new module implementations (scoped separately)",
    ],
    bestFor: "Accounts already live on NetSuite with customizations and integrations that need ongoing technical support beyond what Oracle provides.",
  },
  {
    name: "Break-Fix / Hourly",
    provider: "Independent consultant or firm",
    cost: "$75–$300/hour depending on consultant type",
    hours: "Per request, no retainer",
    covers: [
      "One-off development requests",
      "Isolated script or workflow fixes",
      "Project-specific builds",
    ],
    doesNotCover: [
      "Ongoing account context (re-onboarding cost per request)",
      "Proactive monitoring or release preparation",
      "Administration unless separately scoped",
    ],
    bestFor: "Accounts with infrequent or unpredictable support needs. Re-onboarding cost per request makes this expensive for regular work.",
  },
  {
    name: "Internal NetSuite Hire",
    provider: "In-house employee",
    cost: "$80,000–$130,000/year salary plus benefits",
    hours: "Full-time",
    covers: [
      "Full account ownership",
      "Day-to-day administration",
      "Custom development if technical",
      "Institutional knowledge retention",
    ],
    doesNotCover: [
      "Specialist depth across all script types without experience",
      "Coverage during leave, turnover, or absence",
      "Cost-efficient for low-volume accounts",
    ],
    bestFor: "Accounts with constant, high-volume NetSuite work where full-time dedicated ownership is more efficient than a retainer.",
  },
];

const COMPARISON_ROWS = [
  { aspect: "Covers SuiteScript customizations", oracle: false, acs: false, retainer: true, breakfix: true, internal: true },
  { aspect: "Covers third-party integrations", oracle: false, acs: false, retainer: true, breakfix: true, internal: true },
  { aspect: "Covers workflow automation", oracle: false, acs: "partial", retainer: true, breakfix: true, internal: true },
  { aspect: "Fixed monthly cost", oracle: true, acs: true, retainer: true, breakfix: false, internal: false },
  { aspect: "No per-request scoping required", oracle: true, acs: true, retainer: true, breakfix: false, internal: true },
  { aspect: "Retained account context", oracle: false, acs: "partial", retainer: true, breakfix: false, internal: true },
  { aspect: "Release preparation included", oracle: false, acs: "partial", retainer: true, breakfix: false, internal: true },
  { aspect: "Same-day response on active issues", oracle: false, acs: false, retainer: true, breakfix: false, internal: true },
  { aspect: "No long-term contract required", oracle: true, acs: false, retainer: true, breakfix: true, internal: false },
  { aspect: "Certified NetSuite credentials", oracle: true, acs: true, retainer: true, breakfix: "varies", internal: "varies" },
];

const FAQ = [
  {
    question: "What is the difference between Oracle NetSuite support and ACS?",
    answer:
      "Oracle NetSuite standard support (included in every license) handles platform-level bugs and documentation questions. Oracle ACS is a paid add-on that provides more hands-on functional guidance, a designated consultant at higher tiers, and upgrade preparation assistance. Neither ACS nor standard support covers SuiteScript customizations, third-party integrations, or custom workflow logic built specifically for your account.",
  },
  {
    question: "What does a third-party NetSuite managed support retainer cover that ACS doesn't?",
    answer:
      "A third-party managed support retainer covers the full customization layer of your account: SuiteScript scripts, SuiteFlow workflow logic, integrations with platforms like Shopify, Salesforce, or Celigo, advanced PDF templates, and saved search formulas. ACS explicitly excludes custom SuiteScript development and third-party integration debugging. For accounts with meaningful customization, a third-party retainer covers the work that actually surfaces day to day.",
  },
  {
    question: "Is break-fix support cheaper than a monthly retainer?",
    answer:
      "The hourly rate for break-fix support ($75–$300/hour) can appear lower than a retainer, but re-onboarding cost inflates the effective rate per completed request. Every break-fix engagement begins with the consultant reading the account, locating relevant scripts and workflows, and building context before executing any work. Under a retainer, that context is retained from the previous month, so each request starts faster and requires fewer hours. For accounts with more than one or two requests per month, the effective cost per completed item is usually lower under a retainer.",
  },
  {
    question: "When does it make sense to hire an internal NetSuite resource instead of using a third-party retainer?",
    answer:
      "Internal hires make sense when the volume and variety of ongoing NetSuite work justifies full-time dedicated ownership. At $80,000–$130,000 per year plus benefits, the internal hire is cost-efficient only when the account generates enough work to keep a full-time resource occupied. For most mid-market accounts, a retainer at $799–$2,499 per month provides the same technical coverage at a fraction of the cost, with the added benefit of no turnover risk and no re-onboarding if the employee leaves.",
  },
  {
    question: "Can I use Oracle ACS and a third-party retainer at the same time?",
    answer:
      "Yes. Some accounts use ACS for functional guidance and Oracle escalation paths while using a third-party retainer for the customization work ACS does not cover. The two services do not overlap. ACS handles the platform and functional layer; a third-party retainer handles scripts, integrations, and automation. Running both is practical for mid-market accounts that want Oracle involvement in upgrade planning but need independent technical support for their customization layer.",
  },
  {
    question: "What support model is right for a post-go-live NetSuite account?",
    answer:
      "Most post-go-live accounts have accumulated SuiteScript customizations, at least one integration, and workflows built during implementation. Oracle standard support does not cover any of these. ACS covers functional guidance but not custom development. A third-party managed retainer is the most common choice for post-go-live accounts that need ongoing technical support across scripts, workflows, and integrations at a predictable monthly cost.",
  },
];

export const metadata: Metadata = {
  title: "NetSuite Support Options Compared",
  description:
    "All five NetSuite support models compared: Oracle standard support, ACS, third-party managed retainer, break-fix, and internal hire. What each covers, what each costs, and which fits which account.",
  alternates: { canonical: "/netsuite-support-comparison" },
  openGraph: {
    title: "NetSuite Support Options Compared",
    description:
      "All five NetSuite support models compared: Oracle standard support, ACS, third-party managed retainer, break-fix, and internal hire. What each covers, what each costs, and which fits which account.",
    url: `${SITE_URL}/netsuite-support-comparison`,
    type: "website",
    images: [{ url: `${SITE_URL}/og-default.png`, width: 1200, height: 630 }],
  },
};

function CellIcon({ value }: { value: boolean | "partial" | "varies" }) {
  if (value === true) return <CheckCircle2 className="h-4 w-4 text-emerald-500 mx-auto" />;
  if (value === false) return <XCircle className="h-4 w-4 text-brand-200 mx-auto" />;
  return <MinusCircle className="h-4 w-4 text-amber-400 mx-auto" />;
}

export default function NetSuiteSupportComparisonPage() {
  return (
    <main className="pt-32 pb-24 sm:pt-40 sm:pb-32">
      <BreadcrumbJsonLd
        items={[
          { name: "Home", url: SITE_URL },
          { name: "NetSuite Support Comparison", url: `${SITE_URL}/netsuite-support-comparison` },
        ]}
      />
      <FaqJsonLd items={FAQ} />
      <ServiceJsonLd
        name="NetSuite Support Comparison"
        description="Comparison of all NetSuite support options: Oracle standard support, ACS, third-party managed retainer, break-fix, and internal hire."
        url={`${SITE_URL}/netsuite-support-comparison`}
        serviceType="NetSuite Support"
      />
      <OrganizationJsonLd />

      <div className="mx-auto max-w-3xl px-6 lg:px-8">
        <SectionHeading
          as="h1"
          eyebrow="Support Options"
          title="NetSuite Support Options: All Five Models Compared"
          subtitle="Oracle standard support, ACS, third-party managed retainer, break-fix, and internal hire. What each covers, what each costs, and which fits a post-go-live account."
          align="left"
        />

        <div className="mt-6 rounded-2xl border border-brand-100 bg-white p-5 shadow-soft">
          <LeadFormLight />
        </div>
        <p className="mt-3 text-xs text-brand-400">NetSuite-certified · Third-party managed support · Month-to-month · Direct access</p>
        <p className="mt-2 text-xs text-brand-300"><time dateTime="2026-08">Published August 2026</time></p>

        <div className="mt-6 rounded-2xl border-l-4 border-accent bg-brand-50/50 p-5">
          <p className="text-xs font-semibold uppercase tracking-wide text-accent mb-2">Quick answer</p>
          <p className="text-sm text-brand-700 leading-relaxed">
            NetSuite accounts have five main support options. Oracle standard support is included
            in every license and handles platform bugs and documentation. Oracle ACS is a paid
            add-on providing functional guidance and a designated consultant at higher tiers, but
            it explicitly excludes SuiteScript customizations and third-party integrations. A
            third-party managed retainer covers the full customization layer at $799 to $2,499 per
            month, including scripts, workflows, integrations, and release preparation. Break-fix
            or hourly support costs $75 to $300 per hour but carries re-onboarding cost on each
            request, making it expensive for regular work. An internal hire at $80,000 to $130,000
            per year is the most cost-efficient option only when the account generates enough work
            to occupy a full-time resource. Most post-go-live accounts with customizations choose
            a third-party retainer because Oracle support and ACS do not cover the customization
            layer where most day-to-day support requests originate.
          </p>
        </div>

        {/* Feature comparison table */}
        <div className="mt-14">
          <h2 className="text-lg font-semibold text-brand-900 mb-2">What does each NetSuite support model cover?</h2>
          <p className="text-sm text-brand-400 mb-5">
            Coverage gaps in Oracle support and ACS are not widely documented. This table shows what each model actually handles.
          </p>
          <div className="overflow-x-auto rounded-2xl border border-brand-100">
            <table className="w-full text-xs min-w-[560px]">
              <thead>
                <tr className="border-b border-brand-100 bg-brand-50/50">
                  <th className="text-left p-3 font-semibold text-brand-900 w-2/5"></th>
                  <th className="text-center p-3 font-semibold text-brand-600 w-[12%]">Oracle<br/>Support</th>
                  <th className="text-center p-3 font-semibold text-brand-600 w-[12%]">ACS</th>
                  <th className="text-center p-3 font-semibold text-accent w-[12%]">Managed<br/>Retainer</th>
                  <th className="text-center p-3 font-semibold text-brand-600 w-[12%]">Break-Fix</th>
                  <th className="text-center p-3 font-semibold text-brand-600 w-[12%]">Internal<br/>Hire</th>
                </tr>
              </thead>
              <tbody>
                {COMPARISON_ROWS.map((row, i) => (
                  <tr key={row.aspect} className={i < COMPARISON_ROWS.length - 1 ? "border-b border-brand-100" : ""}>
                    <td className="p-3 text-brand-700">{row.aspect}</td>
                    <td className="p-3 text-center"><CellIcon value={row.oracle} /></td>
                    <td className="p-3 text-center"><CellIcon value={row.acs} /></td>
                    <td className="p-3 text-center"><CellIcon value={row.retainer} /></td>
                    <td className="p-3 text-center"><CellIcon value={row.breakfix} /></td>
                    <td className="p-3 text-center"><CellIcon value={row.internal} /></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p className="mt-2 text-xs text-brand-300">Green = covered. Grey = not covered. Yellow = partial or varies.</p>
        </div>

        {/* Each model in detail */}
        <div className="mt-14">
          <h2 className="text-lg font-semibold text-brand-900 mb-6">Each NetSuite support model explained</h2>
          <div className="space-y-6">
            {MODELS.map((model, i) => (
              <div key={model.name} className="rounded-2xl border border-brand-100 bg-white p-5 shadow-sm">
                <div className="flex flex-wrap items-start justify-between gap-2 mb-3">
                  <div>
                    <span className="text-[10px] font-semibold uppercase tracking-wide text-brand-300 mr-2">{String(i + 1).padStart(2, "0")}</span>
                    <span className="font-semibold text-brand-900 text-sm">{model.name}</span>
                  </div>
                  <span className="text-xs font-medium text-accent bg-accent/8 rounded-full px-2.5 py-0.5">{model.cost}</span>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-1 text-xs text-brand-400 mb-4">
                  <p><span className="font-medium text-brand-600">Provider:</span> {model.provider}</p>
                  <p><span className="font-medium text-brand-600">Capacity:</span> {model.hours}</p>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
                  <div>
                    <p className="text-xs font-semibold text-emerald-600 mb-1.5">Covers</p>
                    <ul className="space-y-1">
                      {model.covers.map((item) => (
                        <li key={item} className="flex items-start gap-1.5 text-xs text-brand-600">
                          <CheckCircle2 className="h-3.5 w-3.5 text-emerald-500 shrink-0 mt-0.5" />
                          {item}
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div>
                    <p className="text-xs font-semibold text-red-500 mb-1.5">Does not cover</p>
                    <ul className="space-y-1">
                      {model.doesNotCover.map((item) => (
                        <li key={item} className="flex items-start gap-1.5 text-xs text-brand-400">
                          <XCircle className="h-3.5 w-3.5 text-brand-200 shrink-0 mt-0.5" />
                          {item}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
                <div className="rounded-lg bg-brand-50/60 px-3 py-2 text-xs text-brand-600">
                  <span className="font-medium text-brand-700">Best for: </span>{model.bestFor}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Cost comparison */}
        <div className="mt-14">
          <h2 className="text-lg font-semibold text-brand-900 mb-2">How do the costs compare?</h2>
          <p className="text-sm text-brand-400 mb-5">
            Headline cost figures do not capture the real difference. Re-onboarding cost, contract commitment, and what is actually included change the effective cost per request significantly.
          </p>
          <div className="overflow-x-auto rounded-2xl border border-brand-100">
            <table className="w-full text-sm min-w-[440px]">
              <thead>
                <tr className="border-b border-brand-100 bg-brand-50/50">
                  <th className="text-left p-4 font-semibold text-brand-900 w-1/3">Model</th>
                  <th className="text-left p-4 font-semibold text-brand-900">Headline cost</th>
                  <th className="text-left p-4 font-semibold text-brand-900">What drives total cost</th>
                </tr>
              </thead>
              <tbody>
                {[
                  {
                    model: "Oracle standard support",
                    cost: "Included",
                    driver: "Scope limitation — does not cover the customization layer where most requests originate",
                  },
                  {
                    model: "ACS",
                    cost: "Low four figures to high four figures per quarter",
                    driver: "Annual commitment required; hour caps per tier; customization work excluded",
                  },
                  {
                    model: "Managed retainer",
                    cost: "$799–$2,499/month",
                    driver: "Fixed cost regardless of request volume within scope; no per-request overhead",
                  },
                  {
                    model: "Break-fix / hourly",
                    cost: "$75–$300/hr",
                    driver: "Re-onboarding time added to every request; minimum engagement requirements common",
                  },
                  {
                    model: "Internal hire",
                    cost: "$80K–$130K/year",
                    driver: "Benefits, overhead, and turnover risk; only cost-efficient at full-time work volume",
                  },
                ].map((row, i) => (
                  <tr key={row.model} className={i < 4 ? "border-b border-brand-100" : ""}>
                    <td className="p-4 font-medium text-brand-700 align-top">{row.model}</td>
                    <td className="p-4 text-brand-900 font-medium align-top">{row.cost}</td>
                    <td className="p-4 text-brand-400 align-top">{row.driver}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Which model for post-go-live */}
        <div className="mt-14">
          <h2 className="text-lg font-semibold text-brand-900 mb-4">Which support model fits a post-go-live NetSuite account?</h2>
          <p className="text-sm text-brand-400 mb-5">
            The answer depends on what the account actually needs support for. Most post-go-live accounts need support for their customization layer, not the underlying platform.
          </p>
          <div className="space-y-3">
            {[
              {
                trigger: "The account has SuiteScript customizations, workflows, or integrations",
                recommendation: "Third-party managed retainer",
                reason: "Oracle support and ACS do not cover these. The customization layer is where most day-to-day requests originate.",
                link: "/netsuite-managed-support",
              },
              {
                trigger: "The account uses only standard NetSuite functionality with minimal customization",
                recommendation: "ACS or Oracle standard support",
                reason: "Standard support and ACS cover what this account actually needs. A third-party retainer would be overhead.",
                link: "/netsuite-acs-alternative",
              },
              {
                trigger: "Support needs are infrequent — one or two requests per quarter",
                recommendation: "Break-fix / hourly",
                reason: "A monthly retainer adds fixed cost for accounts with very low request volume. Break-fix is more cost-efficient below a certain threshold.",
                link: "/netsuite-consulting-services",
              },
              {
                trigger: "The account generates constant development and admin work",
                recommendation: "Managed retainer or internal hire",
                reason: "At consistent high volume, the effective cost per completed request under a retainer is lower than break-fix. An internal hire makes sense only when volume justifies full-time ownership.",
                link: "/hire-netsuite-developer",
              },
            ].map((item, i) => (
              <div key={i} className="rounded-xl border border-brand-100 bg-white p-4 shadow-sm">
                <p className="text-xs font-semibold text-brand-400 mb-1">If:</p>
                <p className="text-sm font-medium text-brand-900 mb-2">{item.trigger}</p>
                <p className="text-xs font-semibold text-accent mb-0.5">Recommended:</p>
                <Link href={item.link} className="text-sm font-semibold text-brand-900 hover:underline">{item.recommendation}</Link>
                <p className="mt-1 text-xs text-brand-400">{item.reason}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Mid-page CTA */}
        <div className="mt-10 rounded-2xl border border-brand-100 bg-white p-5 shadow-soft">
          <p className="text-sm font-semibold text-brand-900 mb-1">Not sure which model fits your account?</p>
          <p className="text-sm text-brand-400 mb-4">
            Tell us what your account looks like — volume of customization, active integrations, and how often support requests surface. We will tell you honestly whether a retainer makes sense.
          </p>
          <LeadFormLight />
        </div>

        {/* Related reading */}
        <div className="mt-10 rounded-2xl border border-brand-100 bg-brand-50/30 p-5 sm:p-6">
          <p className="text-sm font-semibold text-brand-900 mb-3">Related reading</p>
          <ul className="space-y-2.5">
            <li className="text-sm text-brand-400">
              <Link href="/netsuite-acs-alternative" className="text-accent hover:underline">
                NetSuite ACS alternative
              </Link>{" "}
              covers what ACS excludes and what a third-party retainer covers in its place.
            </li>
            <li className="text-sm text-brand-400">
              <Link href="/netsuite-oracle-support-vs-third-party" className="text-accent hover:underline">
                Oracle NetSuite support vs. third-party
              </Link>{" "}
              explains the structural difference between Oracle's support model and an independent firm.
            </li>
            <li className="text-sm text-brand-400">
              <Link href="/netsuite-managed-support" className="text-accent hover:underline">
                NetSuite managed support
              </Link>{" "}
              covers how a monthly retainer engagement works in practice.
            </li>
            <li className="text-sm text-brand-400">
              <Link href="/blog/netsuite-managed-vs-break-fix-support" className="text-accent hover:underline">
                Managed support vs. break-fix
              </Link>{" "}
              breaks down when each model is more cost-efficient based on request volume.
            </li>
            <li className="text-sm text-brand-400">
              <Link href="/blog/netsuite-acs-cost-breakdown" className="text-accent hover:underline">
                ACS cost breakdown
              </Link>{" "}
              covers all four ACS tiers, hour allocations, and annual renewal escalation in detail.
            </li>
          </ul>
        </div>

        <ServiceFaqSection items={FAQ} />

        <div className="mt-10 rounded-2xl border border-brand-100 bg-white p-5 shadow-soft">
          <p className="text-sm font-semibold text-brand-900 mb-1">Ready to move to a managed support retainer?</p>
          <p className="text-sm text-brand-400 mb-4">
            Tell us about your account. We will confirm whether a retainer is the right fit and what scope makes sense for your volume.
          </p>
          <LeadFormLight />
        </div>
      </div>
    </main>
  );
}

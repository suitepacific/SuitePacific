import type { Metadata } from "next";
import Link from "next/link";
import { CheckCircle2, XCircle, DollarSign, Clock, Users, Zap } from "lucide-react";
import { BreadcrumbJsonLd, FaqJsonLd, ServiceJsonLd, OrganizationJsonLd } from "@/components/seo/JsonLd";
import { ServiceFaqSection } from "@/components/ui/ServiceFaqSection";
import { LeadFormLight } from "@/components/sections/LeadFormLight";
import { SITE_URL } from "@/lib/content";

export const metadata: Metadata = {
  title: "NetSuite Managed Services Pricing | SuitePacific",
  description:
    "NetSuite managed services pricing: $799 to $12,000+ per month. SuitePacific publishes three plans with no hidden rates, no setup fee, and no annual contract.",
  alternates: { canonical: "/netsuite-managed-services-pricing" },
  openGraph: {
    title: "NetSuite Managed Services Pricing | SuitePacific",
    description:
      "NetSuite managed services cost between $799 and $12,000+ per month depending on hours, provider, and scope. SuitePacific plans from $799 with published rates.",
    url: `${SITE_URL}/netsuite-managed-services-pricing`,
    type: "website",
    images: [{ url: `${SITE_URL}/og-default.png`, width: 1200, height: 630 }],
  },
};

const PLANS = [
  {
    name: "Care",
    price: 799,
    hours: 10,
    rate: "79.90",
    description: "SuiteScript fixes, workflow updates, saved searches, administration, and break-fix response.",
    bestFor: "Accounts with moderate ongoing needs and occasional scripting or admin requests.",
  },
  {
    name: "Care Plus",
    price: 1499,
    hours: 20,
    rate: "74.95",
    description: "All Care work plus integration maintenance, active workflow builds, and upgrade preparation each release cycle.",
    bestFor: "Accounts with regular development volume across scripting, integrations, and configuration.",
    featured: true,
  },
  {
    name: "Care Pro",
    price: 2499,
    hours: 35,
    rate: "71.40",
    description: "Full account coverage including SuiteScript development, workflow builds, integration management, and release readiness.",
    bestFor: "Accounts with active development needs across multiple technical areas each month.",
  },
];

const INCLUDED = [
  "SuiteScript development and fixes (all script types)",
  "Workflow creation and modification",
  "Administration and configuration changes",
  "Saved search and report development",
  "Break-fix troubleshooting and resolution",
  "Integration maintenance (Celigo, REST, CSV import)",
  "PDF template fixes and updates",
  "NetSuite release upgrade preparation and sandbox testing",
  "1 business day response on active production issues",
  "Direct access to the developer on every request",
];

const EXCLUDED = [
  "NetSuite license subscription fees",
  "Third-party SuiteApp or integration platform fees",
  "Net-new large build projects (quoted separately)",
  "Data migration from external systems",
  "End-user training",
  "Project management for multi-phase builds outside the retainer",
];

const COST_DRIVERS = [
  {
    factor: "Script count and complexity",
    detail:
      "Accounts with 50 or more active scripts require more monitoring and upgrade preparation each release cycle. SuiteScript 1.0 rewrites are significantly more effort than 2.0-to-2.1 version updates.",
  },
  {
    factor: "Integration volume",
    detail:
      "Actively maintained integrations (Celigo, REST, CSV automation) generate recurring work each month. More integrations mean more potential break-fix and maintenance hours.",
  },
  {
    factor: "Rate of change",
    detail:
      "Accounts with frequent process changes, new module rollouts, or active configuration requests consume hours faster than stable accounts with occasional needs.",
  },
  {
    factor: "Multiple subsidiaries",
    detail:
      "OneWorld accounts with separate subsidiary configurations, intercompany processes, or different chart-of-accounts structures require more work per request.",
  },
  {
    factor: "Release upgrade complexity",
    detail:
      "Accounts with customizations that interact heavily with standard NetSuite behavior require more thorough upgrade testing each of the two annual releases.",
  },
];

const FAQ = [
  {
    question: "What does NetSuite managed services cost per month?",
    answer:
      "NetSuite managed services range from approximately $799 to $12,000 or more per month depending on the provider, included hours, and the scope of technical work. Enterprise NetSuite partners and Oracle ACS tiers typically start at several thousand dollars per month. SuitePacific publishes three plans starting at $799 per month with 10 hours of included work per month.",
  },
  {
    question: "What is included in a NetSuite managed service plan?",
    answer:
      "SuitePacific plans include SuiteScript development and fixes across all script types, workflow creation and modification, administration and configuration, saved searches, break-fix troubleshooting, integration maintenance for Celigo and REST integrations, PDF template work, and release upgrade preparation each NetSuite release cycle. Hours are the same developer who knows your account.",
  },
  {
    question: "Is there a setup fee or onboarding charge?",
    answer:
      "No. There is no setup fee, onboarding charge, or scoping fee to begin. Work starts after the first month is confirmed. Initial access and account review are included in the first month.",
  },
  {
    question: "What is the minimum commitment?",
    answer:
      "All plans require a three-month minimum commitment, after which they convert to month-to-month. There is no annual contract requirement and no penalty for adjusting plans after the minimum period.",
  },
  {
    question: "Do unused hours roll over?",
    answer:
      "No. Hours do not roll over at the end of the month. If a month is lighter than usual, that reflects the natural variance in an account. If a month needs more than the plan includes, you are notified before any overrun and can approve additional hours or defer work to the next month.",
  },
  {
    question: "How does managed support pricing compare to hiring an in-house NetSuite administrator?",
    answer:
      "A full-time in-house NetSuite administrator typically costs $85,000 to $130,000 per year in total compensation, covering one person during standard business hours. A managed support plan at $799 to $2,499 per month ($9,588 to $29,988 annually) includes SuiteScript development, integration maintenance, and release upgrade preparation that a general administrator may not be able to provide. Managed support also continues without interruption through leave, turnover, or vacation.",
  },
  {
    question: "How does managed support compare to hiring an independent NetSuite consultant on demand?",
    answer:
      "Independent NetSuite consultants typically bill $150 to $250 per hour without a retainer, response commitment, or continuity between engagements. Break-fix work on an hourly basis often costs more per hour than a plan-based rate and requires re-scoping each request. A managed retainer provides a dedicated monthly block of hours, a known effective rate, and a consistent developer who already understands the account.",
  },
  {
    question: "How does SuitePacific managed services pricing compare to Oracle NetSuite ACS?",
    answer:
      "Oracle NetSuite ACS does not publish pricing. Third-party estimates and benchmarks suggest ACS tiers start at several thousand dollars per month and increase significantly for dedicated consultant access. ACS does not include SuiteScript development. SuitePacific plans start at $799 per month and include SuiteScript across all plan tiers.",
  },
  {
    question: "What increases the monthly cost?",
    answer:
      "The monthly cost increases if your account needs more hours than your current plan includes, which typically happens when script counts are high, integrations require active maintenance, or the rate of configuration change is elevated. Moving to a higher plan is the most cost-effective way to cover higher volume. The Care Pro plan at $2,499 provides the lowest effective hourly rate at $71.40 per hour.",
  },
  {
    question: "Does managed support include SuiteScript development?",
    answer:
      "Yes. All three SuitePacific plans include SuiteScript development and fixes across all script types: User Event, Client, Scheduled, Map/Reduce, Suitelet, RESTlet, Workflow Action, and Mass Update. Oracle NetSuite ACS explicitly excludes SuiteScript development from its support scope.",
  },
  {
    question: "Can I change plans after starting?",
    answer:
      "Yes. Plans can be adjusted after the three-month minimum. If your account consistently needs more hours than the current plan includes, moving to the next tier gives you a lower effective hourly rate and more included work per month.",
  },
  {
    question: "Is NetSuite managed services worth it for a small business?",
    answer:
      "For a live NetSuite account that cannot justify a full-time in-house administrator, a managed support plan covers the ongoing work that accumulates in any active account: scripting fixes, workflow updates, upgrade preparation, and break-fix response. The Care plan at $799 per month provides 10 hours of dedicated technical support from a certified developer at a fraction of the cost of an in-house hire.",
  },
];

export default function NetSuiteManagedServicesPricingPage() {
  return (
    <main className="pt-32 pb-24 sm:pt-40 sm:pb-32">
      <BreadcrumbJsonLd
        items={[
          { name: "Home", url: SITE_URL },
          { name: "NetSuite Managed Support", url: `${SITE_URL}/netsuite-managed-support` },
          { name: "NetSuite Managed Services Pricing", url: `${SITE_URL}/netsuite-managed-services-pricing` },
        ]}
      />
      <ServiceJsonLd
        name="NetSuite Managed Services"
        description="Monthly NetSuite managed support covering SuiteScript development, administration, integration maintenance, break-fix, and release upgrade preparation."
        url={`${SITE_URL}/netsuite-managed-services-pricing`}
        serviceType="NetSuite Managed Services"
        datePublished="2026-09-23T00:00:00+00:00"
        dateModified="2026-09-23T00:00:00+00:00"
        offers={[
          { name: "Care", price: 799, description: "10 hours/month: SuiteScript, admin, workflow, saved searches, break-fix. Month-to-month after 3-month minimum." },
          { name: "Care Plus", price: 1499, description: "20 hours/month: all Care work plus integration maintenance and upgrade preparation. Month-to-month." },
          { name: "Care Pro", price: 2499, description: "35 hours/month: full account coverage including active development, integration management, and release readiness. Month-to-month." },
        ]}
      />
      <FaqJsonLd items={FAQ} />
      <OrganizationJsonLd />

      <div className="mx-auto max-w-3xl px-6 lg:px-8">

        {/* Hero */}
        <div className="mb-8">
          <p className="text-xs font-semibold uppercase tracking-widest text-accent mb-3">NetSuite Managed Services Pricing</p>
          <h1 className="text-3xl sm:text-4xl font-bold text-brand-900 leading-tight mb-4">
            NetSuite Managed Services Pricing
          </h1>
          <h2 className="text-base font-semibold text-brand-700 mb-3">What is NetSuite managed services?</h2>
          <p className="text-base text-brand-500 leading-relaxed">
            NetSuite managed services refer to a monthly retainer arrangement in which a certified NetSuite firm handles ongoing SuiteScript development, administration, integration maintenance, and break-fix support for a live NetSuite account. Pricing ranges from $799 to $12,000 or more per month depending on the provider, included hours, and whether technical work such as SuiteScript and integrations is covered. SuitePacific plans start at $799 per month with published rates and no hidden fees.
          </p>
        </div>

        {/* QA block */}
        <div className="rounded-2xl border-l-4 border-accent bg-brand-50/50 p-5 mb-10">
          <p className="text-xs font-semibold uppercase tracking-wide text-accent mb-2">Quick answer</p>
          <p className="text-sm text-brand-700 leading-relaxed">
            NetSuite managed services typically cost between $799 and $12,000 or more per month, depending on the provider, included hours, and the scope of technical work covered. SuitePacific offers three published plans: Care at $799 per month for 10 hours, Care Plus at $1,499 per month for 20 hours, and Care Pro at $2,499 per month for 35 hours. All plans include SuiteScript development and fixes, workflow automation, administration, break-fix support, saved search work, and NetSuite release upgrade preparation. There is no hidden scoping fee, no setup charge, and no required annual commitment; all plans run month-to-month after a three-month minimum. Large enterprise NetSuite partners and ACS tier pricing typically start significantly higher. Independent consultants bill $150 to $250 per hour without a retainer or dedicated response commitment. Hiring an in-house NetSuite administrator typically costs $85,000 to $130,000 per year in total compensation, which covers one person during standard business hours.
          </p>
        </div>

        <LeadFormLight />

        {/* Plans */}
        <div className="mt-14">
          <h2 className="text-xl font-bold text-brand-900 mb-2">SuitePacific managed services plans and pricing</h2>
          <p className="text-sm text-brand-500 mb-6">
            All plans include the same scope of work. The difference is the number of hours included per month and the effective hourly rate.
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
            {PLANS.map((plan) => (
              <div
                key={plan.name}
                className={`rounded-2xl border p-5 flex flex-col ${
                  plan.featured
                    ? "border-accent/40 bg-gradient-to-br from-accent/5 to-transparent"
                    : "border-brand-100 bg-white"
                }`}
              >
                {plan.featured && (
                  <span className="self-start text-xs font-semibold text-accent bg-accent/10 px-2 py-0.5 rounded-full mb-3">
                    Most common
                  </span>
                )}
                <p className="text-sm font-bold text-brand-900 mb-1">{plan.name}</p>
                <p className="text-2xl font-bold text-brand-900 mb-0.5">
                  ${plan.price.toLocaleString()}
                  <span className="text-sm font-normal text-brand-400">/mo</span>
                </p>
                <p className="text-xs text-brand-400 mb-3">
                  {plan.hours} hours &middot; ${plan.rate}/hr effective
                </p>
                <p className="text-xs text-brand-500 leading-relaxed mb-4 flex-1">{plan.description}</p>
                <p className="text-xs text-brand-300 italic">{plan.bestFor}</p>
              </div>
            ))}
          </div>

          {/* Plan comparison table */}
          <div className="overflow-x-auto rounded-2xl border border-brand-100">
            <table className="w-full text-sm min-w-[480px]">
              <thead>
                <tr className="border-b border-brand-100 bg-brand-50/50">
                  <th className="text-left p-4 font-semibold text-brand-900">Plan</th>
                  <th className="text-left p-4 font-semibold text-brand-900">Hours/month</th>
                  <th className="text-left p-4 font-semibold text-brand-900">Monthly cost</th>
                  <th className="text-left p-4 font-semibold text-brand-900">Effective rate</th>
                </tr>
              </thead>
              <tbody>
                {PLANS.map((plan, i) => (
                  <tr key={plan.name} className={i < PLANS.length - 1 ? "border-b border-brand-100" : ""}>
                    <td className="p-4 font-medium text-brand-700">{plan.name}</td>
                    <td className="p-4 text-brand-500">{plan.hours}</td>
                    <td className="p-4 text-brand-500">${plan.price.toLocaleString()}/mo</td>
                    <td className="p-4 text-brand-500">${plan.rate}/hr</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p className="mt-3 text-xs text-brand-300">Three-month minimum, then month-to-month. No rollover. No setup fee.</p>
        </div>

        {/* How it compares */}
        <div className="mt-14">
          <h2 className="text-xl font-bold text-brand-900 mb-3">How does NetSuite managed services pricing compare to other options?</h2>
          <p className="text-sm text-brand-500 mb-6">
            Most NetSuite accounts consider three alternatives when evaluating managed support: hiring an in-house administrator, engaging an independent consultant on demand, or contracting with a large enterprise partner or Oracle ACS.
          </p>

          {/* Provider comparison */}
          <div className="overflow-x-auto rounded-2xl border border-brand-100 mb-6">
            <table className="w-full text-sm min-w-[560px]">
              <thead>
                <tr className="border-b border-brand-100 bg-brand-50/50">
                  <th className="text-left p-4 font-semibold text-brand-900">Provider type</th>
                  <th className="text-left p-4 font-semibold text-brand-900">Starting cost</th>
                  <th className="text-left p-4 font-semibold text-brand-900">Published pricing</th>
                  <th className="text-left p-4 font-semibold text-brand-900">SuiteScript included</th>
                  <th className="text-left p-4 font-semibold text-brand-900">Min. commitment</th>
                </tr>
              </thead>
              <tbody>
                {[
                  { type: "SuitePacific", cost: "$799/mo", published: true, script: true, min: "3 months" },
                  { type: "Enterprise partner", cost: "$2,000+/mo", published: false, script: null, min: "Often 12 months" },
                  { type: "Oracle ACS", cost: "Not published", published: false, script: false, min: "Annual contract" },
                  { type: "Independent consultant", cost: "$150-250/hr", published: null, script: true, min: "Per project" },
                ].map((row, i) => (
                  <tr key={row.type} className={i < 3 ? "border-b border-brand-100" : ""}>
                    <td className="p-4 font-medium text-brand-700">{row.type}</td>
                    <td className="p-4 text-brand-500">{row.cost}</td>
                    <td className="p-4">
                      {row.published === true ? <CheckCircle2 className="h-4 w-4 text-emerald-500" /> :
                       row.published === false ? <XCircle className="h-4 w-4 text-red-400" /> :
                       <span className="text-xs text-brand-400">Varies</span>}
                    </td>
                    <td className="p-4">
                      {row.script === true ? <CheckCircle2 className="h-4 w-4 text-emerald-500" /> :
                       row.script === false ? <XCircle className="h-4 w-4 text-red-400" /> :
                       <span className="text-xs text-brand-400">Depends</span>}
                    </td>
                    <td className="p-4 text-brand-500 text-xs">{row.min}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p className="text-xs text-brand-300 mb-8">
            Enterprise partner and ACS pricing estimated from third-party benchmarks. Oracle ACS pricing is not publicly published. Last reviewed September 2026. See{" "}
            <Link href="/blog/netsuite-support-pricing-benchmark-2026" className="underline hover:text-brand-400">
              NetSuite support pricing benchmark 2026
            </Link>{" "}
            for detailed source data.
          </p>

          {/* Managed vs hiring */}
          <h3 className="text-base font-bold text-brand-900 mb-3">Managed support versus hiring an in-house NetSuite administrator</h3>
          <div className="overflow-x-auto rounded-2xl border border-brand-100 mb-3">
            <table className="w-full text-sm min-w-[480px]">
              <thead>
                <tr className="border-b border-brand-100 bg-brand-50/50">
                  <th className="text-left p-4 font-semibold text-brand-900"></th>
                  <th className="text-left p-4 font-semibold text-brand-900">Managed support</th>
                  <th className="text-left p-4 font-semibold text-brand-900">In-house admin</th>
                </tr>
              </thead>
              <tbody>
                {[
                  ["Annual cost", "$9,588 to $29,988", "$85,000 to $130,000+"],
                  ["SuiteScript development", "Included", "Rarely included"],
                  ["Integration maintenance", "Included", "Depends on background"],
                  ["Coverage during leave or turnover", "Continuous", "Gap until replacement"],
                  ["Release upgrade preparation", "Included", "Included if capable"],
                  ["Onboarding time", "None", "30 to 90 days"],
                  ["Scaling hours up or down", "Change plan", "Hire or restructure role"],
                ].map(([feature, managed, inhouse], i) => (
                  <tr key={feature} className={i < 6 ? "border-b border-brand-100" : ""}>
                    <td className="p-4 font-medium text-brand-700 text-xs">{feature}</td>
                    <td className="p-4 text-brand-500 text-xs">{managed}</td>
                    <td className="p-4 text-brand-500 text-xs">{inhouse}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p className="text-xs text-brand-300 mb-8">In-house administrator salary range is an estimate based on US market data for NetSuite administrator roles. Total compensation includes salary, benefits, and employer taxes.</p>

          {/* Cost comparison SVG diagram */}
          <figure className="mt-6 mb-2">
            <svg viewBox="0 0 680 220" xmlns="http://www.w3.org/2000/svg" style={{ width: "100%", maxWidth: 680, display: "block", fontFamily: "system-ui,-apple-system,sans-serif" }}>
              <defs>
                <linearGradient id="barManaged" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#4f7fff" stopOpacity="0.9" />
                  <stop offset="100%" stopColor="#4f7fff" stopOpacity="0.6" />
                </linearGradient>
                <linearGradient id="barInhouse" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#dc2626" stopOpacity="0.8" />
                  <stop offset="100%" stopColor="#dc2626" stopOpacity="0.5" />
                </linearGradient>
              </defs>
              {/* Title */}
              <text x="340" y="22" textAnchor="middle" fontSize="11" fontWeight="700" fill="#14306b">Annual cost: managed support vs. in-house NetSuite administrator</text>
              {/* Y axis label */}
              <text x="8" y="90" fontSize="9" fill="#8aa2d6" textAnchor="middle" transform="rotate(-90,8,90)">Annual cost (USD)</text>
              {/* Managed support bar - up to ~$30K out of max $140K scale */}
              <rect x="100" y="55" width="180" height="120" rx="6" fill="url(#barManaged)" />
              <text x="190" y="50" textAnchor="middle" fontSize="10" fontWeight="700" fill="#4f7fff">$9,588 to $29,988/yr</text>
              <text x="190" y="190" textAnchor="middle" fontSize="10" fontWeight="600" fill="#14306b">Managed support</text>
              <text x="190" y="203" textAnchor="middle" fontSize="9" fill="#8aa2d6">SuitePacific plans</text>
              {/* In-house bar - $85K to $130K+ out of max $140K scale */}
              <rect x="380" y="22" width="220" height="153" rx="6" fill="url(#barInhouse)" />
              <text x="490" y="17" textAnchor="middle" fontSize="10" fontWeight="700" fill="#dc2626">$85,000 to $130,000+/yr</text>
              <text x="490" y="190" textAnchor="middle" fontSize="10" fontWeight="600" fill="#14306b">In-house administrator</text>
              <text x="490" y="203" textAnchor="middle" fontSize="9" fill="#8aa2d6">Salary, benefits, and employer taxes</text>
              {/* Baseline */}
              <line x1="70" y1="175" x2="640" y2="175" stroke="#e2e8f0" strokeWidth="1" />
            </svg>
            <figcaption style={{ textAlign: "center", fontSize: "0.75rem", color: "#8aa2d6", marginTop: "0.25rem" }}>
              Managed support at $9,588 to $29,988 per year versus a full-time in-house administrator at $85,000 to $130,000+. In-house cost includes salary, benefits, and employer taxes; does not include SuiteScript capability gap risk.
            </figcaption>
          </figure>
        </div>

        {/* What is included */}
        <div className="mt-14">
          <h2 className="text-xl font-bold text-brand-900 mb-3">What is included in a NetSuite managed service plan?</h2>
          <p className="text-sm text-brand-500 mb-5">
            Every SuitePacific plan covers the same categories of work. The scope does not shrink on the entry-level plan.
          </p>
          <ul className="space-y-2">
            {INCLUDED.map((item) => (
              <li key={item} className="flex items-start gap-2 text-sm text-brand-500">
                <CheckCircle2 className="h-4 w-4 text-accent mt-0.5 shrink-0" />
                {item}
              </li>
            ))}
          </ul>
        </div>

        {/* What is not included */}
        <div className="mt-10">
          <h2 className="text-xl font-bold text-brand-900 mb-3">What is not included?</h2>
          <ul className="space-y-2">
            {EXCLUDED.map((item) => (
              <li key={item} className="flex items-start gap-2 text-sm text-brand-400">
                <XCircle className="h-4 w-4 text-brand-200 mt-0.5 shrink-0" />
                {item}
              </li>
            ))}
          </ul>
          <p className="mt-4 text-xs text-brand-300">
            Net-new development projects that are too large for the monthly retainer are scoped and quoted separately. You are never billed for out-of-scope work without prior agreement.
          </p>
        </div>

        {/* What increases cost */}
        <div className="mt-14">
          <h2 className="text-xl font-bold text-brand-900 mb-3">What increases the monthly cost of NetSuite managed services?</h2>
          <p className="text-sm text-brand-500 mb-5">
            The monthly cost increases when an account needs more hours than the current plan includes. These are the most common factors that drive higher hour consumption.
          </p>
          <div className="space-y-3">
            {COST_DRIVERS.map(({ factor, detail }) => (
              <div key={factor} className="rounded-2xl border border-brand-100 bg-white p-4">
                <p className="text-sm font-semibold text-brand-900 mb-1">{factor}</p>
                <p className="text-sm text-brand-400">{detail}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Contract terms */}
        <div className="mt-14">
          <h2 className="text-xl font-bold text-brand-900 mb-3">What are the contract and cancellation terms?</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {[
              { icon: Clock, label: "Minimum commitment", value: "Three months, then month-to-month" },
              { icon: DollarSign, label: "Rollover", value: "Hours do not roll over at month end" },
              { icon: Zap, label: "Overrun policy", value: "You are notified before any overrun. No automatic billing beyond the plan." },
              { icon: Users, label: "Plan changes", value: "Plans can be adjusted after the minimum period with no penalty." },
            ].map(({ icon: Icon, label, value }) => (
              <div key={label} className="rounded-2xl border border-brand-100 bg-white p-4 flex items-start gap-3">
                <div className="shrink-0 w-8 h-8 rounded-lg bg-accent/10 flex items-center justify-center">
                  <Icon className="h-4 w-4 text-accent" />
                </div>
                <div>
                  <p className="text-xs font-semibold text-brand-700 mb-0.5">{label}</p>
                  <p className="text-sm text-brand-400">{value}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Why SuitePacific */}
        <div className="mt-14 rounded-2xl border-2 border-accent/30 bg-gradient-to-br from-accent/5 to-transparent p-6">
          <p className="text-xs font-semibold uppercase tracking-wide text-accent mb-3">Why SuitePacific</p>
          <h2 className="text-base font-bold text-brand-900 mb-3">
            Published pricing. Technical depth. Direct access.
          </h2>
          <p className="text-sm text-brand-500 mb-4">
            SuitePacific is a US-registered LLC specializing in post-go-live NetSuite support for SMB accounts. Most managed support engagements involve the same developer across every request, not a support queue or rotating team.
          </p>
          <ul className="space-y-2 text-sm text-brand-500 mb-5">
            <li className="flex items-start gap-2"><span className="text-accent font-bold mt-0.5">+</span> Oracle NetSuite SuiteCloud Developer II certified</li>
            <li className="flex items-start gap-2"><span className="text-accent font-bold mt-0.5">+</span> Oracle NetSuite Administrator Professional certified</li>
            <li className="flex items-start gap-2"><span className="text-accent font-bold mt-0.5">+</span> Celigo Mastery certified</li>
            <li className="flex items-start gap-2"><span className="text-accent font-bold mt-0.5">+</span> SuiteScript across all script types included in every plan</li>
            <li className="flex items-start gap-2"><span className="text-accent font-bold mt-0.5">+</span> 1 business day response on active production issues</li>
            <li className="flex items-start gap-2"><span className="text-accent font-bold mt-0.5">+</span> No annual contract after the three-month minimum</li>
          </ul>
          <LeadFormLight />
        </div>

        {/* Related reading */}
        <div className="mt-10 rounded-2xl border border-brand-100 bg-brand-50/30 p-5 sm:p-6">
          <p className="text-sm font-semibold text-brand-900 mb-3">Related reading</p>
          <ul className="space-y-2.5">
            <li className="text-sm text-brand-400">
              <Link href="/netsuite-managed-support" className="text-accent hover:underline">
                NetSuite managed support
              </Link>{" "}
              covers the full scope of what a monthly retainer includes: SuiteScript, admin, integrations, and upgrade preparation.
            </li>
            <li className="text-sm text-brand-400">
              <Link href="/blog/netsuite-support-pricing-benchmark-2026" className="text-accent hover:underline">
                NetSuite support pricing benchmark 2026
              </Link>{" "}
              compares ACS, managed services, and break-fix pricing across provider types.
            </li>
            <li className="text-sm text-brand-400">
              <Link href="/netsuite-acs-pricing" className="text-accent hover:underline">
                NetSuite ACS pricing
              </Link>{" "}
              breaks down what Oracle ACS tiers cost and what they include relative to third-party managed support.
            </li>
            <li className="text-sm text-brand-400">
              <Link href="/netsuite-implementation-partner-vs-managed-support" className="text-accent hover:underline">
                NetSuite implementation partner versus managed support
              </Link>{" "}
              explains when each engagement model is the right fit for a live account.
            </li>
          </ul>
        </div>

        <ServiceFaqSection items={FAQ} />

        <p className="mt-6 text-xs text-brand-300 text-center">Last updated September 2026</p>

      </div>
    </main>
  );
}

import type { Metadata } from "next";
import Link from "next/link";
import { CheckCircle2 } from "lucide-react";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { BreadcrumbJsonLd, FaqJsonLd, ServiceJsonLd, OrganizationJsonLd } from "@/components/seo/JsonLd";
import { LeadFormLight } from "@/components/sections/LeadFormLight";
import { LeadForm } from "@/components/sections/LeadForm";
import { SITE_URL } from "@/lib/content";

const MODELS = [
  {
    name: "Large implementation partner (ongoing support)",
    rate: "$150–$300/hr",
    model: "Time-and-materials, SOW per engagement",
    context: "No retention. Re-onboarding on each request.",
    minimum: "Often 4-8 hour minimums per request",
    notes: "Built for projects, not ongoing support. Overhead is priced in.",
  },
  {
    name: "Independent freelance consultant",
    rate: "$75–$175/hr",
    model: "Time-and-materials or fixed project",
    context: "Varies; one person, limited availability",
    minimum: "Usually none",
    notes: "Lower rates but limited capacity, coverage gaps, and no team backup.",
  },
  {
    name: "SuitePacific (boutique retainer)",
    rate: "$799–$2,499/mo",
    model: "Fixed monthly retainer, no SOW per request",
    context: "Retained across every engagement",
    minimum: "3-month minimum, then month-to-month",
    notes: "Effective rate falls to $80–$110/hr at Care Plus and Care Pro once overhead is excluded.",
  },
];

const FAQ = [
  {
    question: "How much does a NetSuite consultant cost per hour?",
    answer:
      "NetSuite consultant rates vary significantly by type. Large implementation partners typically charge $150–$300 per hour on time-and-materials. Independent freelancers range from $75–$175 per hour depending on specialization and experience. Boutique retainer firms like SuitePacific offer fixed monthly plans ($799–$2,499/month) that reduce to an effective hourly rate of $80–$110 once per-request overhead is eliminated. The hourly rate comparison understates total cost; cost per completed request is the more accurate measure once re-onboarding and administrative overhead are included.",
  },
  {
    question: "What is the difference between a NetSuite implementation consultant and a support consultant?",
    answer:
      "An implementation consultant is scoped for a defined project with a go-live date: configuring the account, migrating data, training users, and delivering a working system. A post-go-live support consultant handles ongoing work after the implementation is complete: development requests, fixes, configuration changes, release review, and troubleshooting. The two roles have different pricing models. Implementation work is typically project-priced. Ongoing support is typically retainer-priced or time-and-materials per request.",
  },
  {
    question: "Is a fixed monthly retainer or time-and-materials more cost-effective for ongoing NetSuite work?",
    answer:
      "For accounts with regular ongoing needs (four or more hours per month), a fixed monthly retainer is almost always more cost-effective. The key reason is re-onboarding: under time-and-materials, a consultant re-learns your account at the start of each engagement. That re-onboarding time is billed. Under a retainer, the consultant retains ongoing context, so each request costs less time than the same request would under break-fix billing.",
  },
  {
    question: "What affects NetSuite consultant cost the most?",
    answer:
      "The four factors that affect NetSuite consultant cost the most are: (1) billing model: project-based billing adds scoping and approval overhead that inflates per-item cost; (2) firm size: large firms carry overhead (account managers, project managers, facilities) that is priced into their rates; (3) specialization: SuiteScript developers and integration specialists command higher rates than general administrators; (4) context retention: consultants who re-learn your account on every engagement cost more per completed item than those who maintain ongoing context.",
  },
  {
    question: "How much do SuitePacific Care plans cost?",
    answer:
      "SuitePacific Care plans are fixed monthly retainers: Care at $799/month for 10 hours, Care Plus at $1,499/month for 20 hours, and Care Pro at $2,499/month for 35 hours. Hours cover SuiteScript development, workflow automation, Advanced PDFs, Saved Searches, troubleshooting, and technical guidance. The 3-month minimum applies to all plans; after that, the engagement is month-to-month.",
  },
];

export const metadata: Metadata = {
  title: "NetSuite Consultant Cost: What Ongoing Support Actually Costs in 2026",
  description:
    "NetSuite consultant rates range from $75 to $300 per hour depending on the type. Here is how the three main models compare on actual cost per completed request, not just hourly rate.",
  alternates: { canonical: "/netsuite-consultant-cost" },
  openGraph: {
    title: "NetSuite Consultant Cost: What Ongoing Support Actually Costs in 2026",
    description: "NetSuite consultant rates range from $75 to $300 per hour depending on the type. How the three main models compare on actual cost per completed request.",
    url: "https://suitepacific.com/netsuite-consultant-cost",
    type: "website",
    images: [{ url: "https://suitepacific.com/og-default.png", width: 1200, height: 630 }],
  },
};

export default function NetSuiteConsultantCostPage() {
  return (
    <main className="pt-32 pb-24 sm:pt-40 sm:pb-32">
      <BreadcrumbJsonLd
        items={[
          { name: "Home", url: SITE_URL },
          { name: "NetSuite Consultant Cost", url: `${SITE_URL}/netsuite-consultant-cost` },
        ]}
      />
      <FaqJsonLd items={FAQ} />
      <ServiceJsonLd
        name="NetSuite Care Plans"
        description="Fixed monthly retainer for ongoing NetSuite support starting at $799/month. Covers SuiteScript development, workflow automation, reporting, and troubleshooting. No SOW per request."
        url={`${SITE_URL}/netsuite-care`}
        serviceType="NetSuite Support"
      />
      <OrganizationJsonLd />

      <div className="mx-auto max-w-3xl px-6 lg:px-8">
        <SectionHeading
          as="h1"
          eyebrow="NetSuite Support Pricing"
          title="NetSuite Consultant Cost: What Ongoing Support Actually Costs"
          subtitle="NetSuite consultant rates range from $75 to $300 per hour, but the hourly rate is not the right number to compare. Here is how the three main support models actually differ on total cost."
          align="left"
        />

        <div className="mt-6 rounded-2xl border-l-4 border-accent bg-brand-50/50 p-5">
          <p className="text-xs font-semibold uppercase tracking-wide text-accent mb-2">Quick answer</p>
          <p className="text-sm text-brand-700 leading-relaxed">
            NetSuite consultant rates range from $75 to $300 per hour depending on the engagement
            type, but the hourly rate understates the real cost difference between models. A
            break-fix arrangement at $150 per hour involves re-onboarding time with each request:
            the consultant reads the account, locates the relevant scripts or workflows, understands
            the context, then executes the fix. That overhead adds hours to every request. A monthly
            retainer at $799 to $2,499 per month eliminates re-onboarding: the consultant already
            knows the account, so each request starts from context rather than discovery. Large
            implementation-style firms bill at $200 to $300 per hour but add overhead for account
            managers, proposal processes, and statement-of-work requirements that make small requests
            expensive in time as well as cost. The right comparison for ongoing support is not hourly
            rate but total cost per completed request, which accounts for re-onboarding, response
            time, and the friction of each billing model.
          </p>
        </div>

        <p className="mt-8 text-sm text-brand-400 leading-relaxed">
          The most common mistake when evaluating NetSuite consultant cost is comparing hourly
          rates without accounting for the overhead that inflates the cost per completed item.
          A $150/hour consultant who requires a scoping call, a proposal, and a minimum four-hour
          engagement for every request can cost more per completed task than a $110/hour effective
          rate under a retainer with no per-request overhead.
        </p>

        {/* Model comparison */}
        <div className="mt-14">
          <h2 className="text-lg font-semibold text-brand-900 mb-6">
            How do the three NetSuite consultant models compare on cost?
          </h2>
          <div className="space-y-4">
            {MODELS.map((model) => (
              <div key={model.name} className="rounded-xl border border-brand-100 bg-white p-5 shadow-sm">
                <div className="flex flex-wrap items-start justify-between gap-2 mb-3">
                  <p className="font-semibold text-brand-900 text-sm">{model.name}</p>
                  <span className="text-sm font-bold text-accent">{model.rate}</span>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-1.5 text-xs text-brand-400">
                  <p><span className="font-medium text-brand-600">Billing:</span> {model.model}</p>
                  <p><span className="font-medium text-brand-600">Context:</span> {model.context}</p>
                  <p><span className="font-medium text-brand-600">Minimums:</span> {model.minimum}</p>
                  <p><span className="font-medium text-brand-600">Note:</span> {model.notes}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-10 rounded-2xl border border-brand-100 bg-white p-5 shadow-soft">
          <LeadFormLight />
        </div>
        <p className="mt-3 text-xs text-brand-400">
          SuitePacific Care from $799/month &middot; No SOW per request &middot; 3-month minimum
        </p>

        {/* Re-onboarding cost */}
        <div className="mt-14">
          <h2 className="text-lg font-semibold text-brand-900 mb-4">
            Why does re-onboarding make break-fix cost more per item?
          </h2>
          <p className="text-sm text-brand-400 leading-relaxed mb-4">
            When a consultant begins a new engagement with no retained context, they spend time
            reading existing scripts, understanding what was configured before their involvement,
            and confirming what record types and customizations are in play before making any changes.
          </p>
          <p className="text-sm text-brand-400 leading-relaxed mb-4">
            For a straightforward script fix that takes three hours of productive work, this
            re-onboarding typically adds one to three hours of billed time. The same work under a
            retainer, where the consultant already knows the account, costs three hours.
          </p>
          <p className="text-sm text-brand-400 leading-relaxed">
            For accounts with three to five requests per month, the re-onboarding cost accumulated
            over a year can exceed the cost of an entire monthly retainer plan. The break-fix model
            appears lower-cost until the hidden overhead is counted.
          </p>
        </div>

        {/* What SuitePacific costs */}
        <div className="mt-14">
          <h2 className="text-lg font-semibold text-brand-900 mb-4">
            What does SuitePacific charge for NetSuite consulting?
          </h2>
          <p className="text-sm text-brand-400 mb-6">
            SuitePacific Care is a fixed monthly retainer with three tiers. No time-and-materials.
            No scoping document required per request. Direct access to the developer doing the work.
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {[
              { name: "Care", price: "$799/mo", hours: "10 hours/month", best: "Occasional technical needs" },
              { name: "Care Plus", price: "$1,499/mo", hours: "20 hours/month", best: "Regular development and support" },
              { name: "Care Pro", price: "$2,499/mo", hours: "35 hours/month", best: "Deep technical partnership" },
            ].map((plan) => (
              <div key={plan.name} className="rounded-xl border border-brand-100 bg-brand-50/40 p-5">
                <p className="text-xs font-semibold uppercase tracking-widest text-accent">{plan.name}</p>
                <p className="text-xl font-bold text-brand-900 mt-2">{plan.price}</p>
                <p className="text-sm text-brand-600 mt-1">{plan.hours}</p>
                <p className="text-xs text-brand-400 mt-2">{plan.best}</p>
              </div>
            ))}
          </div>
          <div className="mt-6 space-y-2">
            {[
              "SuiteScript development (User Events, Scheduled, Map/Reduce, Suitelets)",
              "Workflow and SuiteFlow automation",
              "Advanced PDF and email templates",
              "Saved Searches, formulas, and reporting",
              "Forms, fields, and custom record configuration",
              "Troubleshooting and issue investigation",
              "Pre-release Sandbox review each NetSuite cycle",
              "Technical guidance for your administrators",
            ].map((item) => (
              <div key={item} className="flex items-start gap-2.5 text-sm text-brand-600">
                <CheckCircle2 className="h-4 w-4 text-emerald-500 shrink-0 mt-0.5" />
                {item}
              </div>
            ))}
          </div>
        </div>

        {/* Related */}
        <div className="mt-14 rounded-2xl border border-brand-100 bg-brand-50/30 p-5 sm:p-6">
          <p className="text-sm font-semibold text-brand-900 mb-3">Related reading</p>
          <ul className="space-y-2.5">
            <li className="text-sm text-brand-400">
              <Link href="/netsuite-care" className="text-accent hover:underline">NetSuite Care plans</Link>
              {" "}is the full plan detail with pricing, what is included, and FAQ.
            </li>
            <li className="text-sm text-brand-400">
              <Link href="/blog/netsuite-managed-vs-break-fix-support" className="text-accent hover:underline">NetSuite managed support vs. break-fix</Link>
              {" "}compares the two billing models on total cost per completed item.
            </li>
            <li className="text-sm text-brand-400">
              <Link href="/netsuite-partner-too-expensive" className="text-accent hover:underline">NetSuite partner too expensive</Link>
              {" "}covers why large implementation partners cost more for ongoing support than the work requires.
            </li>
            <li className="text-sm text-brand-400">
              <Link href="/blog/netsuite-development-cost" className="text-accent hover:underline">NetSuite development cost</Link>
              {" "}covers custom development specifically: what drives cost on scripting and integration projects.
            </li>
          </ul>
        </div>

        {/* FAQ */}
        <div className="mt-14">
          <h2 className="text-lg font-semibold text-brand-900 mb-8">Frequently asked questions</h2>
          <div className="space-y-8">
            {FAQ.map(({ question, answer }) => (
              <div key={question} className="border-b border-brand-50 pb-8 last:border-0 last:pb-0">
                <h3 className="font-semibold text-brand-900 text-sm">{question}</h3>
                <p className="mt-2 text-sm text-brand-400 leading-relaxed">{answer}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Final CTA */}
        <div className="mt-16">
          <h2 className="text-xl font-semibold text-brand-900 text-balance mb-2">
            Get a straight answer on what your account needs and what it will cost.
          </h2>
          <p className="text-sm text-brand-400 mb-6">
            No scoping overhead, no minimum project size, no account manager relay.
          </p>
          <div className="rounded-2xl border border-brand-100 bg-white p-6 shadow-soft">
            <LeadForm />
          </div>
          <p className="mt-4 text-xs text-brand-400">Care plans from $799/month &middot; 3-month minimum, then month-to-month</p>
        </div>
      </div>
    </main>
  );
}

import type { Metadata } from "next";
import Link from "next/link";
import { CheckCircle2, AlertCircle, DollarSign } from "lucide-react";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { BreadcrumbJsonLd, FaqJsonLd, ServiceJsonLd, OrganizationJsonLd } from "@/components/seo/JsonLd";
import { LeadFormLight } from "@/components/sections/LeadFormLight";
import { LeadForm } from "@/components/sections/LeadForm";
import { SITE_URL } from "@/lib/content";

const COST_DRIVERS = [
  {
    label: "Project-based billing",
    detail:
      "Every request — a script fix, a saved search, a workflow update — requires a scoping call, a proposal, and an approval cycle. The overhead of that process often costs more than the work itself for small changes.",
  },
  {
    label: "Account manager relay",
    detail:
      "Large firms route requests through an account manager who relays to the developer. You pay for that layer. It adds cost, adds communication lag, and adds a handoff where context gets lost.",
  },
  {
    label: "Staff rotation",
    detail:
      "When the consultant who knew your account moves to another project, the next person re-onboards. You pay for that re-onboarding every time. Firms with high turnover make this a recurring cost.",
  },
  {
    label: "Minimum project sizes",
    detail:
      "Many firms have minimum project sizes or billable hour minimums. A two-hour fix costs you a four-hour minimum. Small requests become structurally expensive before any work begins.",
  },
  {
    label: "Enterprise rates for SMB work",
    detail:
      "Large NetSuite partners price for enterprise clients with enterprise budgets. If your account is mid-market, you may be paying enterprise rates for work that does not require an enterprise firm.",
  },
];

const COMPARISON = [
  { aspect: "Billing model", large: "Per-project SOW required for most work", sp: "Monthly retainer, no SOW per request" },
  { aspect: "Who you talk to", large: "Account manager who relays to the developer", sp: "Direct access to the developer doing the work" },
  { aspect: "Account knowledge", large: "Re-built each engagement; staff rotates", sp: "Retained across every request" },
  { aspect: "Small request cost", large: "Minimum engagement often exceeds work size", sp: "Included in monthly allocation" },
  { aspect: "Monthly rate", large: "Variable; spikes when requests come in clusters", sp: "Fixed; $799, $1,499, or $2,499/month" },
  { aspect: "Minimum commitment", large: "Often per-project with no ceiling", sp: "3-month minimum, then month-to-month" },
];

const FAQ = [
  {
    question: "How much does SuitePacific cost compared to a large NetSuite partner?",
    answer:
      "SuitePacific Care plans are fixed-fee monthly retainers starting at $799/month for 10 hours (Care), $1,499/month for 20 hours (Care Plus), and $2,499/month for 35 hours (Care Pro). Large NetSuite partners typically charge $150-$300 per hour on a time-and-materials basis, plus a scoping overhead on every engagement. For accounts with regular ongoing needs, the monthly retainer is almost always lower in total cost and eliminates per-request billing overhead.",
  },
  {
    question: "What is included in a SuitePacific Care plan?",
    answer:
      "Monthly hours can be applied to SuiteScript development, SuiteFlow workflow automation, Advanced PDF templates, Saved Searches and reporting, form and field customizations, troubleshooting, technical guidance, and documentation. The full scope is the same across all three plan tiers; the difference is the monthly hour allocation.",
  },
  {
    question: "Is there a long-term contract?",
    answer:
      "SuitePacific Care starts with a 3-month minimum, which gives us time to learn your account and provide meaningful support. After the initial period, the engagement is month-to-month. There is no multi-year contract requirement.",
  },
  {
    question: "What if my current partner charges less per hour?",
    answer:
      "The hourly rate comparison is misleading. A lower hourly rate combined with a new SOW per request, re-onboarding time each engagement, and a minimum project size can produce a higher total cost per completed item than a fixed monthly retainer with no per-request overhead. The relevant comparison is cost per completed request, not cost per hour.",
  },
  {
    question: "Can I switch from my current partner without losing anything in my account?",
    answer:
      "Yes. All scripts, workflows, saved searches, custom records, and integrations live inside your NetSuite account and are not affected by a partner change. SuitePacific reviews the account independently from the existing work. A clean handoff takes two to four weeks. See the partner replacement page for how the transition works.",
  },
];

export const metadata: Metadata = {
  title: "NetSuite Partner Too Expensive? Here Is What It Costs and Why",
  description:
    "Why large NetSuite partners cost more than they should for ongoing support, and what a boutique retainer model costs instead. SuitePacific Care plans start at $799/month.",
  alternates: { canonical: "/netsuite-partner-too-expensive" },
  openGraph: {
    title: "NetSuite Partner Too Expensive? Here Is What It Costs and Why",
    description: "Why large NetSuite partners cost more than they should for ongoing support, and what a boutique retainer model costs instead. SuitePacific Care plans start at $799/month.",
    url: "https://suitepacific.com/netsuite-partner-too-expensive",
    type: "website",
    images: [{ url: "https://suitepacific.com/og-default.png", width: 1200, height: 630 }],
  },
};

export default function NetSuitePartnerTooExpensivePage() {
  return (
    <main className="pt-32 pb-24 sm:pt-40 sm:pb-32">
      <BreadcrumbJsonLd
        items={[
          { name: "Home", url: SITE_URL },
          { name: "NetSuite Partner Replacement", url: `${SITE_URL}/netsuite-partner-replacement` },
          { name: "NetSuite Partner Too Expensive", url: `${SITE_URL}/netsuite-partner-too-expensive` },
        ]}
      />
      <FaqJsonLd items={FAQ} />
      <ServiceJsonLd
        name="NetSuite Care Plans"
        description="Fixed monthly retainer for ongoing NetSuite technical support. Plans from $799/month covering SuiteScript, workflows, reporting, and troubleshooting. No SOW per request. Direct developer access."
        url={`${SITE_URL}/netsuite-care`}
        serviceType="NetSuite Support"
      />
      <OrganizationJsonLd />

      <div className="mx-auto max-w-3xl px-6 lg:px-8">
        <SectionHeading
          as="h1"
          eyebrow="NetSuite Support Costs"
          title="Your NetSuite Partner Is Too Expensive. Here Is Why."
          subtitle="Large NetSuite consulting firms are built for implementations, not ongoing support. When you use them for post-go-live work, you pay implementation overhead for support-level requests. There is a more cost-effective structure."
          align="left"
        />

        <div className="mt-6 rounded-2xl border border-brand-100 bg-white p-5 shadow-soft">
          <LeadFormLight />
        </div>
        <p className="mt-3 text-xs text-brand-400">
          Care plans from $799/month &middot; No SOW per request &middot; Direct developer access &middot; 3-month minimum
        </p>

        <p className="mt-8 text-sm text-brand-400 leading-relaxed">
          Most NetSuite accounts that are paying too much for support are not doing anything wrong.
          They are using the same firm that did their implementation because it felt like the safe
          choice. What they did not realize until months later is that an implementation firm charges
          implementation rates for ongoing work that does not require an implementation firm.
        </p>

        {/* Why it costs so much */}
        <div className="mt-14">
          <h2 className="text-lg font-semibold text-brand-900 mb-6">
            Why does ongoing NetSuite support cost so much with large partners?
          </h2>
          <div className="space-y-4">
            {COST_DRIVERS.map((item) => (
              <div key={item.label} className="flex gap-3">
                <AlertCircle className="h-4 w-4 text-amber-500 shrink-0 mt-0.5" />
                <div>
                  <p className="text-sm font-semibold text-brand-900">{item.label}</p>
                  <p className="mt-1 text-sm text-brand-400">{item.detail}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* What it should cost */}
        <div className="mt-14">
          <h2 className="text-lg font-semibold text-brand-900 mb-4">
            What should ongoing NetSuite support actually cost?
          </h2>
          <p className="text-sm text-brand-400 mb-6">
            A boutique partner built for ongoing retainer support eliminates the overhead layers
            that drive up the cost at larger firms. No account manager relay. No scoping process
            for routine work. No re-onboarding on every engagement.
          </p>

          <div className="rounded-2xl bg-brand-50 border border-brand-100 p-6">
            <div className="flex items-center gap-2 mb-4">
              <DollarSign className="h-5 w-5 text-accent" />
              <p className="font-semibold text-brand-900">SuitePacific Care Plan Pricing</p>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              {[
                { name: "Care", price: "$799", hours: "10 hrs/month", note: "Occasional needs" },
                { name: "Care Plus", price: "$1,499", hours: "20 hrs/month", note: "Regular support" },
                { name: "Care Pro", price: "$2,499", hours: "35 hrs/month", note: "Deep partnership" },
              ].map((plan) => (
                <div key={plan.name} className="bg-white rounded-xl border border-brand-100 p-4">
                  <p className="text-xs font-semibold uppercase tracking-widest text-accent">{plan.name}</p>
                  <p className="text-2xl font-bold text-brand-900 mt-1">{plan.price}<span className="text-sm font-normal text-brand-400">/mo</span></p>
                  <p className="text-sm text-brand-600 mt-1">{plan.hours}</p>
                  <p className="text-xs text-brand-400 mt-1">{plan.note}</p>
                </div>
              ))}
            </div>
            <p className="text-xs text-brand-400 mt-4">3-month minimum, then month-to-month. Hours cover SuiteScript, workflows, reporting, troubleshooting, and more.</p>
          </div>
        </div>

        {/* Comparison */}
        <div className="mt-14">
          <h2 className="text-lg font-semibold text-brand-900 mb-4">
            Large NetSuite partner vs. SuitePacific: what actually differs
          </h2>
          <div className="overflow-x-auto">
            <table className="w-full text-sm border-collapse">
              <thead>
                <tr>
                  <th className="text-left py-2 pr-4 text-xs font-semibold uppercase tracking-widest text-brand-400 border-b border-brand-100 pb-3"></th>
                  <th className="text-left py-2 pr-4 text-xs font-semibold uppercase tracking-widest text-brand-400 border-b border-brand-100 pb-3">Large partner</th>
                  <th className="text-left py-2 text-xs font-semibold uppercase tracking-widest text-accent border-b border-brand-100 pb-3">SuitePacific</th>
                </tr>
              </thead>
              <tbody>
                {COMPARISON.map((row) => (
                  <tr key={row.aspect} className="border-b border-brand-50">
                    <td className="py-3 pr-4 font-medium text-brand-700 w-1/4">{row.aspect}</td>
                    <td className="py-3 pr-4 text-brand-400">{row.large}</td>
                    <td className="py-3 text-brand-600 font-medium">{row.sp}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* What you get */}
        <div className="mt-14">
          <h2 className="text-lg font-semibold text-brand-900 mb-4">
            What does a SuitePacific Care plan include?
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {[
              "SuiteScript development and troubleshooting",
              "Workflow creation and modifications",
              "Advanced PDF and email template changes",
              "Saved Searches and reporting",
              "Forms and field customizations",
              "NetSuite troubleshooting and issue resolution",
              "Pre-release Sandbox review each NetSuite cycle",
              "Documentation of completed technical changes",
              "Technical guidance for your administrators",
              "No statement of work required for each request",
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
          <p className="text-sm font-semibold text-brand-900 mb-3">Related</p>
          <ul className="space-y-2.5">
            <li className="text-sm text-brand-400">
              <Link href="/netsuite-care" className="text-accent hover:underline">NetSuite Care plans</Link>
              {" "}is the full plan detail: what is included in each tier, FAQ, and sign-up.
            </li>
            <li className="text-sm text-brand-400">
              <Link href="/netsuite-partner-replacement" className="text-accent hover:underline">NetSuite partner replacement</Link>
              {" "}covers the transition process: what stays in your account, what the first 90 days look like, and how to overlap the handoff cleanly.
            </li>
            <li className="text-sm text-brand-400">
              <Link href="/blog/netsuite-managed-vs-break-fix-support" className="text-accent hover:underline">Managed support vs. break-fix</Link>
              {" "}explains the cost comparison in detail, including why a higher hourly rate under a retainer model often costs less per completed item than break-fix with re-onboarding.
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
            Stop paying for overhead you do not need.
          </h2>
          <p className="text-sm text-brand-400 mb-6">
            A predictable monthly retainer with direct developer access and no SOW per request.
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

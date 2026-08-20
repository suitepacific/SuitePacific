import type { Metadata } from "next";
import Link from "next/link";
import {
  CheckCircle2,
  Code2,
  Workflow,
  FileText,
  BarChart3,
  Settings,
  Wrench,
  HelpCircle,
  BookOpen,
  Star,
} from "lucide-react";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { FadeIn } from "@/components/motion/FadeIn";
import { StaggerGroup, StaggerItem } from "@/components/motion/StaggerGroup";
import { BreadcrumbJsonLd, FaqJsonLd, ServiceJsonLd, OrganizationJsonLd } from "@/components/seo/JsonLd";
import { LeadFormLight } from "@/components/sections/LeadFormLight";
import { LeadForm } from "@/components/sections/LeadForm";
import { SITE_URL } from "@/lib/content";

const WHAT_INCLUDED = [
  "SuiteScript development and troubleshooting",
  "Workflow creation and modifications",
  "Advanced PDF and email template changes",
  "Saved Searches and reporting",
  "Forms and field customizations",
  "NetSuite troubleshooting and issue resolution",
  "Custom records and configurations",
  "Technical analysis of existing customizations",
  "Performance and script troubleshooting",
  "Documentation of completed technical changes",
  "Technical guidance for your NetSuite administrators",
  "Ongoing support for post-go-live NetSuite needs",
];

const PLANS = [
  {
    name: "Care",
    tagline: "For teams with occasional technical needs",
    price: 799,
    hours: 10,
    popular: false,
    features: [
      "SuiteScript",
      "Workflows",
      "Advanced PDFs",
      "Saved Searches & Reporting",
      "Forms & Customizations",
      "Troubleshooting",
      "Technical guidance",
      "Documentation",
      "Standard support priority",
    ],
    bestFor:
      "Businesses that need an experienced NetSuite technical resource available each month without maintaining a full-time developer.",
  },
  {
    name: "Care Plus",
    tagline: "For businesses with regular NetSuite technical needs",
    price: 1499,
    hours: 20,
    popular: true,
    features: [
      "Everything in Care",
      "Priority support",
      "Monthly technical review",
      "Proactive recommendations",
      "Deeper troubleshooting and technical analysis",
      "Ongoing customization support",
    ],
    bestFor:
      "Growing NetSuite teams that regularly need development, troubleshooting, reporting, workflow and customization support.",
  },
  {
    name: "Care Pro",
    tagline: "For businesses that need a deeper technical partnership",
    price: 2499,
    hours: 35,
    popular: false,
    features: [
      "Everything in Care Plus",
      "Highest support priority",
      "Regular technical planning",
      "Proactive NetSuite improvement recommendations",
      "More extensive development capacity",
      "Ongoing technical oversight",
      "Dedicated technical coordination with your team",
    ],
    bestFor:
      "Businesses with substantial ongoing NetSuite development and technical support requirements.",
  },
];

const HOUR_USES = [
  {
    icon: Code2,
    label: "Development",
    desc: "SuiteScript, User Events, Client Scripts, Map/Reduce, Suitelets and other custom development.",
  },
  {
    icon: Workflow,
    label: "Automation",
    desc: "Workflows, approvals, business rules and process automation.",
  },
  {
    icon: FileText,
    label: "Documents",
    desc: "Advanced PDFs, email templates, invoices, statements and other NetSuite-generated documents.",
  },
  {
    icon: BarChart3,
    label: "Reporting",
    desc: "Saved Searches, reporting improvements, formulas and technical reporting support.",
  },
  {
    icon: Settings,
    label: "Customization",
    desc: "Forms, fields, custom records and other NetSuite customizations.",
  },
  {
    icon: Wrench,
    label: "Troubleshooting",
    desc: "Investigating errors, unexpected behavior, failed scripts and configuration issues.",
  },
  {
    icon: HelpCircle,
    label: "Technical Guidance",
    desc: "Helping your administrators understand technical options, assess changes and make better decisions.",
  },
  {
    icon: BookOpen,
    label: "Documentation",
    desc: "Documenting completed technical changes so your team understands what was changed and why.",
  },
];

const FAQS = [
  {
    q: "Do I need to replace my existing NetSuite partner?",
    a: "No. SuitePacific Care is designed to work alongside your existing NetSuite partner, internal administrator or Finance/Operations team. You can use SuitePacific for ongoing technical work while keeping your existing partner for implementation, strategic consulting or larger projects.",
  },
  {
    q: "What happens if I don't use all my hours?",
    a: "Your monthly allocation is reserved for that month's support needs and does not roll over to the following month. This allows us to reserve technical capacity for Care customers throughout the month.",
  },
  {
    q: "Can I use my hours for different types of NetSuite work?",
    a: "Yes. Your support allocation can be used across eligible technical services including SuiteScript, workflows, PDFs, reporting, forms, customizations, troubleshooting and technical guidance.",
  },
  {
    q: "Is this the same as hiring a NetSuite developer?",
    a: "No. SuitePacific Care gives you access to experienced NetSuite technical professionals without the cost and commitment of hiring a full-time resource.",
  },
  {
    q: "Can you work with our existing NetSuite partner?",
    a: "Yes. SuitePacific can work alongside your existing NetSuite resources and handle the ongoing technical work that doesn't require your primary partner.",
  },
  {
    q: "Is there a long-term contract?",
    a: "SuitePacific Care starts with a 3-month minimum commitment, followed by month-to-month service. This allows us to understand your NetSuite environment and provide meaningful ongoing support rather than treating every request as a standalone project.",
  },
  {
    q: "What happens when we need more support than our plan includes?",
    a: "If your requirements consistently exceed your monthly allocation, we can recommend moving to a higher Care plan or scope additional work separately.",
  },
  {
    q: "Is this like a fractional NetSuite administrator?",
    a: "Yes. SuitePacific Care functions as your outsourced NetSuite technical resource: the same specialized expertise as a full-time hire, scoped to the hours your account actually needs each month.",
  },
];

export const metadata: Metadata = {
  title: { absolute: "NetSuite Care Plans | Ongoing NetSuite Support | SuitePacific" },
  description:
    "SuitePacific NetSuite Care gives your team ongoing access to experienced NetSuite technical professionals for a predictable monthly fee. Starting at $799/month.",
  alternates: { canonical: "/netsuite-care" },
  openGraph: {
    title: "NetSuite Care Plans | Ongoing NetSuite Support | SuitePacific",
    description: "SuitePacific NetSuite Care gives your team ongoing access to experienced NetSuite technical professionals for a predictable monthly fee. Starting at $799/month.",
    url: "https://suitepacific.com/netsuite-care",
    type: "website",
    images: [{ url: "https://suitepacific.com/og-default.png", width: 1200, height: 630 }],
  },
};

export default function NetSuiteCarePage() {
  return (
    <main className="pt-32 pb-24 sm:pt-40 sm:pb-32">
      <BreadcrumbJsonLd
        items={[
          { name: "Home", url: SITE_URL },
          { name: "NetSuite Care", url: `${SITE_URL}/netsuite-care` },
        ]}
      />
      <FaqJsonLd items={FAQS.map(({ q, a }) => ({ question: q, answer: a }))} />
      <ServiceJsonLd
        name="NetSuite Care Plans"
        description="SuitePacific NetSuite Care is a monthly retainer for businesses already live on NetSuite that need ongoing SuiteScript development, workflow automation, reporting, troubleshooting, and technical support. Plans start at $799/month for 10 hours and scale to $2,499/month for 35 hours. 3-month minimum, then month-to-month. No SOW required per request."
        url={`${SITE_URL}/netsuite-care`}
        serviceType="NetSuite Support"
        offers={[
          { name: "Care", price: 799, description: "10 hours/month of NetSuite SuiteScript, workflow, reporting, and troubleshooting support." },
          { name: "Care Plus", price: 1499, description: "20 hours/month with priority support, monthly technical review, and proactive recommendations." },
          { name: "Care Pro", price: 2499, description: "35 hours/month for businesses that need a deeper NetSuite technical partnership." },
        ]}
      />
      <OrganizationJsonLd />

      {/* Hero */}
      <section className="mx-auto max-w-4xl px-6 lg:px-8 text-center">
        <FadeIn>
          <p className="text-xs font-semibold uppercase tracking-widest text-accent mb-3">
            SuitePacific NetSuite Care
          </p>
          <h1 className="text-4xl sm:text-5xl font-semibold tracking-tight text-brand-900 text-balance">
            Your NetSuite technical team, without the cost of hiring one.
          </h1>
          <p className="mt-6 text-lg text-brand-400 max-w-2xl mx-auto text-balance">
            NetSuite doesn&apos;t stop needing attention after go-live. SuitePacific
            Care gives your team ongoing access to experienced NetSuite technical
            professionals for a predictable monthly fee.
          </p>
          <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
            <Button href="#lead-form" size="lg">
              Get Started
            </Button>
            <Button href="#plans" variant="secondary" size="lg">
              See Plans
            </Button>
          </div>
          <p className="mt-4 text-sm text-brand-400">
            Starting at $799/month. 3-month minimum, then month-to-month.
          </p>
        </FadeIn>
      </section>

      {/* Quick answer */}
      <section className="mx-auto max-w-3xl px-6 lg:px-8 mt-10">
        <div style={{ background: "#eef2fb", border: "1px solid #b2c2e6", borderRadius: "10px", padding: "1.25rem 1.5rem" }}>
          <p style={{ margin: "0 0 0.5rem", fontSize: "0.7rem", fontWeight: 700, color: "#4f7fff", textTransform: "uppercase", letterSpacing: "0.08em" }}>
            What is a NetSuite Care plan?
          </p>
          <p style={{ margin: 0, color: "#14306b", fontSize: "0.9rem", lineHeight: 1.6 }}>
            A NetSuite Care plan is a monthly retainer that gives your team access to an experienced NetSuite technical specialist without hiring a full-time developer. Each month you receive a set number of hours for SuiteScript development, workflow automation, saved searches, reporting, troubleshooting, and configuration changes. Plans are structured, not time-and-materials: you know the cost, the scope, and the response commitment before the month starts. Care plans start at $799/month and operate on a 3-month minimum, then month-to-month with no long-term contract.
          </p>
        </div>
      </section>

      {/* Lead form - top */}
      <section id="lead-form" className="mx-auto max-w-3xl px-6 lg:px-8 mt-10">
        <div className="rounded-2xl border border-brand-100 bg-white p-5 shadow-soft">
          <LeadFormLight />
        </div>
        <p className="mt-3 text-xs text-brand-400 text-center">
          NetSuite-certified &middot; No SOW per request &middot; Direct developer access &middot; From $799/month
        </p>
      </section>

      {/* Social proof */}
      <section className="mx-auto max-w-3xl px-6 lg:px-8 mt-8">
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 rounded-2xl bg-brand-50 border border-brand-100 px-6 py-4">
          <div className="flex items-center gap-1.5">
            {[0,1,2,3,4].map((i) => (
              <Star key={i} className="h-4 w-4 fill-amber-400 text-amber-400" />
            ))}
            <span className="text-sm font-semibold text-brand-900 ml-1">5.0</span>
          </div>
          <p className="text-sm text-brand-400">
            Rated 5.0 on{" "}
            <a
              href="https://clutch.co/profile/suitepacific"
              target="_blank"
              rel="noopener noreferrer"
              className="text-accent hover:underline"
            >
              Clutch
            </a>
            {" "}&middot; NetSuite SuiteCloud Developer II &middot; Administrator Professional certified
          </p>
        </div>
      </section>

      {/* No-negotiation callout */}
      <section className="mx-auto max-w-3xl px-6 lg:px-8 mt-20">
        <div className="rounded-2xl bg-brand-50 border border-brand-100 px-8 py-10 text-center">
          <p className="text-brand-600 text-base leading-relaxed">
            No project-by-project negotiations.&ensp;No scrambling to find a
            developer.&ensp;No full-time hire.
          </p>
          <p className="mt-4 font-semibold text-brand-900">
            Just reliable NetSuite technical support when your business needs it.
          </p>
        </div>
      </section>

      {/* What's included */}
      <section className="mx-auto max-w-5xl px-6 lg:px-8 mt-24">
        <div className="text-center">
          <p className="text-xs font-semibold uppercase tracking-widest text-accent mb-3">
            What&apos;s Included
          </p>
          <h2 className="text-2xl sm:text-3xl font-semibold text-brand-900 text-balance">
            One monthly plan. A technical resource you can rely on.
          </h2>
          <p className="mt-4 text-brand-400 max-w-2xl mx-auto">
            SuitePacific Care is built for businesses that already run NetSuite
            and need experienced technical support on an ongoing basis.
          </p>
        </div>
        <div className="mt-10 grid grid-cols-1 sm:grid-cols-2 gap-3">
          {WHAT_INCLUDED.map((item) => (
            <div key={item} className="flex items-start gap-3 text-sm text-brand-600">
              <CheckCircle2 className="h-4 w-4 text-emerald-500 shrink-0 mt-0.5" />
              {item}
            </div>
          ))}
        </div>
        <p className="mt-8 text-sm text-brand-400 text-center max-w-2xl mx-auto">
          From small fixes to recurring technical improvements, SuitePacific Care
          gives you a reliable technical resource without adding another full-time
          employee.
        </p>
      </section>

      {/* Plans */}
      <section id="plans" className="mx-auto max-w-6xl px-6 lg:px-8 mt-24">
        <div className="text-center mb-12">
          <p className="text-xs font-semibold uppercase tracking-widest text-accent mb-3">Plans</p>
          <h2 className="text-2xl sm:text-3xl font-semibold text-brand-900 text-balance">
            Choose the level of support your business needs
          </h2>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-start">
          {PLANS.map((plan) => (
            <div key={plan.name} className="relative">
              {plan.popular && (
                <div className="absolute -top-3.5 inset-x-0 flex justify-center z-10">
                  <span className="bg-accent text-white text-xs font-semibold px-4 py-1 rounded-full shadow">
                    Most Popular
                  </span>
                </div>
              )}
              <Card
                className={`p-7 flex flex-col h-full ${
                  plan.popular ? "ring-2 ring-accent shadow-lg" : ""
                }`}
              >
                <div>
                  <p className="text-xs font-semibold uppercase tracking-widest text-accent">
                    {plan.name}
                  </p>
                  <div className="mt-3 flex items-end gap-1">
                    <span className="text-4xl font-bold text-brand-900">
                      ${plan.price.toLocaleString()}
                    </span>
                    <span className="text-brand-400 mb-1">/month</span>
                  </div>
                  <p className="mt-1 text-sm text-brand-400">{plan.tagline}</p>
                  <p className="mt-3 text-sm font-semibold text-brand-700">
                    Up to {plan.hours} hours/month
                  </p>
                </div>

                <ul className="mt-6 space-y-2.5 flex-1">
                  {plan.features.map((f) => (
                    <li key={f} className="flex items-start gap-2.5 text-sm text-brand-600">
                      <CheckCircle2 className="h-4 w-4 text-emerald-500 shrink-0 mt-0.5" />
                      {f}
                    </li>
                  ))}
                </ul>

                <div className="mt-8 space-y-4">
                  <p className="text-xs text-brand-400">
                    <span className="font-semibold text-brand-600">Best for:</span>{" "}
                    {plan.bestFor}
                  </p>
                  <Button
                    href="#lead-form"
                    variant={plan.popular ? "primary" : "secondary"}
                    className="w-full justify-center"
                  >
                    Get Started
                  </Button>
                </div>
              </Card>
            </div>
          ))}
        </div>
        <p className="mt-6 text-center text-sm text-brand-400">
          3-month minimum commitment, then month-to-month.
        </p>
      </section>

      {/* Stop negotiating */}
      <section className="mx-auto max-w-3xl px-6 lg:px-8 mt-24">
        <div className="text-center mb-10">
          <h2 className="text-2xl sm:text-3xl font-semibold text-brand-900 text-balance">
            Stop negotiating every small NetSuite request.
          </h2>
          <p className="mt-4 text-brand-400">
            Traditional consulting can turn a simple request into a new estimate,
            approval cycle and project. SuitePacific Care changes that. With a
            monthly support plan, your team already has technical capacity reserved.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {[
            ["Need a PDF updated?", "Send it over."],
            ["Need a workflow adjusted?", "Send it over."],
            ["A script is failing?", "We’ll investigate it."],
            ["Finance needs a saved search changed?", "We’ll take care of it."],
          ].map(([q, a]) => (
            <div
              key={q}
              className="rounded-xl bg-brand-50 border border-brand-100 p-5"
            >
              <p className="text-sm text-brand-600">{q}</p>
              <p className="mt-1 font-semibold text-brand-900">{a}</p>
            </div>
          ))}
        </div>

        <p className="mt-8 text-center text-sm text-brand-400">
          You know your monthly budget upfront, and your users know where to go
          when something needs attention.
        </p>
      </section>

      {/* Built for post-go-live */}
      <section className="mx-auto max-w-4xl px-6 lg:px-8 mt-24 text-center">
        <h2 className="text-2xl sm:text-3xl font-semibold text-brand-900 text-balance">
          Built for NetSuite after go-live.
        </h2>
        <p className="mt-4 text-brand-400 max-w-2xl mx-auto">
          Your NetSuite implementation may be complete. Your NetSuite environment
          isn&apos;t. Businesses continue to need technical work long after the
          implementation partner has left.
        </p>
        <div className="mt-8 flex flex-wrap justify-center gap-2">
          {[
            "Fixes",
            "Enhancements",
            "Automation",
            "Reporting",
            "Troubleshooting",
            "Optimization",
          ].map((item) => (
            <span
              key={item}
              className="rounded-full bg-brand-50 border border-brand-100 px-4 py-1.5 text-sm font-medium text-brand-700"
            >
              {item}
            </span>
          ))}
        </div>
      </section>

      {/* Work alongside existing partner */}
      <section className="mx-auto max-w-4xl px-6 lg:px-8 mt-24">
        <div className="rounded-2xl bg-brand-900 text-white px-8 py-12 text-center">
          <h2 className="text-2xl sm:text-3xl font-semibold text-balance">
            Your existing NetSuite partner doesn&apos;t have to do everything.
          </h2>
          <p className="mt-4 text-blue-100/80 max-w-2xl mx-auto">
            You don&apos;t have to replace your current NetSuite partner. Use your
            primary partner for major initiatives and strategic projects. Use
            SuitePacific when you need experienced hands-on technical support for
            the ongoing work between those projects.
          </p>
          <p className="mt-6 text-sm font-semibold text-blue-100/60">
            Different roles. One healthier NetSuite support model.
          </p>
        </div>
      </section>

      {/* Why not hire / comparison */}
      <section className="mx-auto max-w-5xl px-6 lg:px-8 mt-24">
        <div className="text-center mb-10">
          <h2 className="text-2xl sm:text-3xl font-semibold text-brand-900 text-balance">
            Predictable support. Experienced people. No full-time hire.
          </h2>
          <p className="mt-4 text-brand-400 max-w-2xl mx-auto">
            Hiring a NetSuite developer means salary, benefits, recruitment and
            enough work to justify the role. Project-based consulting means
            estimates, approvals and unpredictable monthly spending.
          </p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {[
            "A predictable monthly cost.",
            "Experienced NetSuite technical support.",
            "Flexible capacity when you need it.",
            "No full-time technical hire.",
            "No need to negotiate every small request.",
          ].map((item) => (
            <div
              key={item}
              className="flex items-start gap-3 rounded-xl border border-brand-100 bg-white p-5 shadow-sm"
            >
              <CheckCircle2 className="h-4 w-4 text-emerald-500 shrink-0 mt-0.5" />
              <p className="text-sm font-medium text-brand-700">{item}</p>
            </div>
          ))}
        </div>
      </section>

      {/* What hours can be used for */}
      <section className="mx-auto max-w-5xl px-6 lg:px-8 mt-24">
        <div className="text-center mb-10">
          <p className="text-xs font-semibold uppercase tracking-widest text-accent mb-3">
            Your Monthly Hours
          </p>
          <h2 className="text-2xl sm:text-3xl font-semibold text-brand-900 text-balance">
            What can you use your Care hours for?
          </h2>
          <p className="mt-4 text-brand-400">
            Your monthly allocation can be used across the technical areas your
            NetSuite environment needs.
          </p>
        </div>
        <StaggerGroup className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {HOUR_USES.map(({ icon: Icon, label, desc }) => (
            <StaggerItem key={label}>
              <Card className="p-5 h-full">
                <Icon className="h-5 w-5 text-accent mb-3" strokeWidth={1.75} />
                <h3 className="font-semibold text-brand-900 text-sm">{label}</h3>
                <p className="mt-2 text-xs text-brand-400 leading-relaxed">{desc}</p>
              </Card>
            </StaggerItem>
          ))}
        </StaggerGroup>
      </section>

      {/* Scale callout */}
      <section className="mx-auto max-w-3xl px-6 lg:px-8 mt-20 text-center">
        <p className="text-brand-600">
          Start with the support capacity your business needs today. As your
          technical requirements grow, move to a higher Care plan.{" "}
          <span className="font-semibold text-brand-900">
            No need to hire another developer just because your NetSuite workload
            increased.
          </span>
        </p>
      </section>

      {/* FAQ */}
      <section className="mx-auto max-w-3xl px-6 lg:px-8 mt-24">
        <div className="text-center mb-10">
          <p className="text-xs font-semibold uppercase tracking-widest text-accent mb-3">FAQ</p>
          <h2 className="text-2xl sm:text-3xl font-semibold text-brand-900 text-balance">
            Frequently Asked Questions
          </h2>
        </div>
        <div className="space-y-8">
          {FAQS.map(({ q, a }) => (
            <div key={q} className="border-b border-brand-50 pb-8 last:border-0 last:pb-0">
              <h3 className="font-semibold text-brand-900">{q}</h3>
              <p className="mt-2 text-sm text-brand-400 leading-relaxed">{a}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Related services */}
      <section className="mx-auto max-w-3xl px-6 lg:px-8 mt-24">
        <div className="rounded-2xl border border-brand-100 bg-brand-50/30 p-5 sm:p-6">
          <p className="text-sm font-semibold text-brand-900 mb-3">Related services</p>
          <ul className="space-y-2.5">
            <li className="text-sm text-brand-400">
              Considering a Care plan but want a documented view of your account first?{" "}
              <Link href="/netsuite-health-check" className="text-accent hover:underline">
                A NetSuite health check
              </Link>{" "}
              gives you a written assessment of what&apos;s working, what&apos;s at risk, and what needs attention before committing to ongoing support.
            </li>
            <li className="text-sm text-brand-400">
              Switching from an existing partner?{" "}
              <Link href="/netsuite-partner-replacement" className="text-accent hover:underline">
                NetSuite partner replacement
              </Link>{" "}
              covers how the transition works, what stays intact in your account, and how to overlap the handoff cleanly.
            </li>
            <li className="text-sm text-brand-400">
              Need a broader overview of what post-go-live support covers and who provides it?{" "}
              <Link href="/netsuite-post-go-live-support" className="text-accent hover:underline">
                NetSuite post-go-live support
              </Link>{" "}
              explains the full scope of what an ongoing technical engagement includes and how pricing works.
            </li>
          </ul>
        </div>
      </section>

      {/* Final CTA */}
      <section className="mx-auto max-w-3xl px-6 lg:px-8 mt-24">
        <h2 className="text-2xl sm:text-3xl font-semibold text-brand-900 text-balance text-center mb-2">
          Your NetSuite environment deserves ongoing technical care.
        </h2>
        <p className="text-brand-400 max-w-xl mx-auto text-center mb-8">
          Less time negotiating estimates. Less time searching for developers.
          Less time waiting for small changes. More time running your business.
        </p>
        <div className="rounded-2xl border border-brand-100 bg-white p-6 shadow-soft">
          <LeadForm />
        </div>
        <p className="mt-4 text-center text-sm text-brand-400">From $799/month &middot; 3-month minimum, then month-to-month</p>
      </section>
    </main>
  );
}

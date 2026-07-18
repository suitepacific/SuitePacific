import Link from "next/link";
import { Check, Minus, GitCompare } from "lucide-react";
import { Nav } from "@/components/nav/Nav";
import { Footer } from "@/components/sections/Footer";
import { SectionHeading } from "@/components/ui/SectionHeading";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "SuiteCompare Pricing: Free, Pro, and Team Plans",
  description:
    "Start free. Upgrade when your client list grows. Plans for solo NetSuite developers, freelancers, and consulting firms.",
};

const PLANS = [
  {
    name: "Free",
    price: "$0",
    period: "",
    description: "Perfect for individual NetSuite developers.",
    cta: { label: "Start free", href: "/suitecompare/signup", primary: false },
    features: [
      { text: "1 client", included: true },
      { text: "Production + Sandbox environments", included: true },
      { text: "Unlimited script comparisons", included: true },
      { text: "1 user", included: true },
      { text: "No credit card required", included: true },
    ],
    highlight: false,
  },
  {
    name: "Pro",
    price: "$29",
    period: "/month",
    description: "Built for consultants managing multiple NetSuite accounts.",
    cta: { label: "Get started", href: "/suitecompare/signup", primary: true },
    features: [
      { text: "Up to 10 clients", included: true },
      { text: "Unlimited environments per client", included: true },
      { text: "Unlimited script comparisons", included: true },
      { text: "1 user", included: true },
    ],
    highlight: true,
    badge: "Most popular",
  },
  {
    name: "Team",
    price: "$99",
    period: "/month",
    description: "For consulting firms with multiple developers.",
    cta: { label: "Get started", href: "/suitecompare/signup", primary: false },
    features: [
      { text: "Unlimited clients", included: true },
      { text: "Unlimited environments per client", included: true },
      { text: "Unlimited script comparisons", included: true },
      { text: "Up to 5 users", included: true },
    ],
    highlight: false,
  },
];

const FAQ = [
  {
    q: "What counts as a client?",
    a: "A client is a NetSuite account, typically one company you manage scripts for. A consulting firm with 8 customers has 8 clients.",
  },
  {
    q: "Can I change plans later?",
    a: "Yes. Upgrade or downgrade at any time. If you downgrade, your existing clients remain accessible until the end of your billing period.",
  },
  {
    q: "What is Token-Based Authentication?",
    a: "TBA is NetSuite&apos;s recommended API authentication method. SuiteCompare uses it to read script content directly from your NetSuite instance. No admin password is ever requested or stored.",
  },
  {
    q: "Is script content stored on your servers?",
    a: "No. Script content is fetched live from NetSuite on every comparison and never written to our database. Only script metadata (name, type, ID) is stored.",
  },
];

export default function SuiteComparePricingPage() {
  return (
    <>
      <Nav />
      <main className="pt-32 pb-24 sm:pt-40 sm:pb-32">
        <div className="mx-auto max-w-4xl px-6 lg:px-8">

          {/* Header */}
          <div className="text-center mb-14">
            <div className="mx-auto mb-6 flex h-14 w-14 items-center justify-center rounded-2xl bg-accent/10">
              <GitCompare className="h-7 w-7 text-accent" />
            </div>
            <SectionHeading
              as="h1"
              eyebrow="Pricing"
              title="Start free. Scale as your client list grows."
              subtitle="No credit card required to get started. Upgrade when you need more clients or team members."
              align="center"
            />
          </div>

          {/* Plans grid */}
          <div className="grid sm:grid-cols-3 gap-5">
            {PLANS.map((plan) => (
              <div
                key={plan.name}
                className={`relative rounded-2xl border p-6 flex flex-col ${
                  plan.highlight
                    ? "border-accent bg-accent/5 shadow-lg"
                    : "border-brand-100 bg-white shadow-soft"
                }`}
              >
                {plan.badge && (
                  <span className="absolute -top-3 left-1/2 -translate-x-1/2 inline-flex items-center rounded-full bg-accent px-3 py-1 text-xs font-semibold text-white whitespace-nowrap">
                    {plan.badge}
                  </span>
                )}

                <div className="mb-5">
                  <p className="text-xs font-semibold uppercase tracking-widest text-brand-400 mb-2">
                    {plan.name}
                  </p>
                  <div className="flex items-baseline gap-1">
                    <span className="text-3xl font-bold text-brand-900">{plan.price}</span>
                    {plan.period && (
                      <span className="text-sm text-brand-400">{plan.period}</span>
                    )}
                  </div>
                  <p className="mt-2 text-xs text-brand-400 leading-relaxed">{plan.description}</p>
                </div>

                <ul className="space-y-2.5 flex-1 mb-6">
                  {plan.features.map((f) => (
                    <li key={f.text} className="flex items-start gap-2">
                      {f.included ? (
                        <Check className="h-3.5 w-3.5 text-emerald-500 shrink-0 mt-0.5" />
                      ) : (
                        <Minus className="h-3.5 w-3.5 text-brand-200 shrink-0 mt-0.5" />
                      )}
                      <span
                        className={`text-xs leading-relaxed ${
                          f.included ? "text-brand-700" : "text-brand-300"
                        }`}
                      >
                        {f.text}
                      </span>
                    </li>
                  ))}
                </ul>

                <Link
                  href={plan.cta.href}
                  className={`w-full inline-flex items-center justify-center rounded-full px-4 py-2.5 text-sm font-medium transition-colors ${
                    plan.highlight
                      ? "bg-accent text-white hover:bg-accent/90"
                      : "border border-brand-100 text-brand-700 hover:bg-brand-50"
                  }`}
                >
                  {plan.cta.label}
                </Link>
              </div>
            ))}
          </div>

          {/* FAQ */}
          <div className="mt-20 max-w-2xl mx-auto">
            <h2 className="text-lg font-semibold text-brand-900 mb-8 text-center">
              Common questions
            </h2>
            <div className="space-y-6">
              {FAQ.map((item) => (
                <div key={item.q}>
                  <p className="text-sm font-semibold text-brand-900 mb-1">{item.q}</p>
                  <p className="text-sm text-brand-400 leading-relaxed">{item.a}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Bottom CTA */}
          <div className="mt-20 rounded-2xl bg-brand-900 px-8 py-12 text-center">
            <h2 className="text-2xl font-semibold text-white">
              Start comparing your scripts today
            </h2>
            <p className="mt-3 text-sm text-brand-300">
              Free to start. No credit card required. Your first client in under five minutes.
            </p>
            <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-3">
              <Link
                href="/suitecompare/signup"
                className="inline-flex items-center justify-center rounded-full bg-accent px-6 py-3 text-sm font-medium text-white hover:bg-accent/90 transition-colors"
              >
                Create free account
              </Link>
              <Link
                href="/suitecompare"
                className="text-sm text-brand-300 hover:text-white transition-colors"
              >
                Learn more about SuiteCompare &rarr;
              </Link>
            </div>
          </div>

        </div>
      </main>
      <Footer />
    </>
  );
}

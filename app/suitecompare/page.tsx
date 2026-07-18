import { redirect } from "next/navigation";
import Link from "next/link";
import { getScUserFromRequest } from "@/lib/sc-auth";
import { Nav } from "@/components/nav/Nav";
import { Footer } from "@/components/sections/Footer";
import { GitCompare, ShieldAlert, FileSearch, GitMerge, Zap, Lock, Code2 } from "lucide-react";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Card } from "@/components/ui/Card";
import { IconBadge } from "@/components/ui/IconBadge";
import { Button } from "@/components/ui/Button";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "SuiteCompare: Compare NetSuite Scripts Across Environments",
  description:
    "Side-by-side diff tool for SuiteScript files. Compare your Sandbox and Production scripts before deploying, catch drift early, and ship with confidence.",
};

const FEATURES = [
  {
    icon: GitCompare,
    title: "Side-by-side diff",
    description:
      "Line-by-line comparison with color-coded additions, removals, and unchanged blocks. The same format NetSuite developers already know from version control.",
  },
  {
    icon: FileSearch,
    title: "Script browser",
    description:
      "Browse all SuiteScript files across connected environments: User Events, Map/Reduce, RESTlets, Suitelets, and Client Scripts, in one filterable list.",
  },
  {
    icon: GitMerge,
    title: "Environment connections",
    description:
      "Connect your Sandbox and Production accounts securely via Token-Based Authentication. No admin credentials stored, no third-party access granted.",
  },
  {
    icon: Code2,
    title: "SuiteScript-aware",
    description:
      "Syntax highlighting built for SuiteScript 2.x: AMD module format, NetSuite API namespaces, governance-aware patterns. Not a generic JavaScript differ.",
  },
  {
    icon: Zap,
    title: "Instant comparison",
    description:
      "Script content is fetched live from your NetSuite instance on every comparison, never stored on our servers. You always see the true current state of your code.",
  },
  {
    icon: Lock,
    title: "Isolated per organization",
    description:
      "Every team gets their own workspace. Script content never crosses tenant boundaries. TBA credentials are encrypted at rest and never logged.",
  },
];

const STEPS = [
  {
    number: "01",
    title: "Connect your environments",
    body: "Add your Production and Sandbox accounts using Token-Based Authentication. SuiteCompare fetches scripts directly from your NetSuite instance. No admin login, no shared credentials.",
  },
  {
    number: "02",
    title: "Browse your scripts",
    body: "Enter a Script ID and SuiteCompare fetches its name and type live from NetSuite. It appears in your script list immediately, ready to compare across environments.",
  },
  {
    number: "03",
    title: "Compare before you deploy",
    body: "Pick any script, choose two environments, and get a line-by-line diff. Know exactly what is different between Sandbox and Production before pushing a release.",
  },
];

const PAIN_POINTS = [
  {
    icon: ShieldAlert,
    title: "Blind deploys",
    body: "Pushing a release without knowing what changed between Sandbox and Production is how good scripts get overwritten. And why prod breaks on a Friday.",
  },
  {
    icon: FileSearch,
    title: "No audit trail",
    body: "NetSuite doesn&apos;t version-control your scripts. Without a compare tool, you have no record of what was different between environments at any point in time.",
  },
  {
    icon: GitMerge,
    title: "Manual review",
    body: "Opening two browser tabs, copying source code into a local diff tool, and hunting for changes line-by-line. It works. It&apos;s also slow and error-prone.",
  },
];

export default async function SuiteCompareHomePage() {
  const user = await getScUserFromRequest();
  if (user) redirect("/suitecompare/dashboard");

  return (
    <>
      <Nav />
      <main className="pt-32 pb-24 sm:pt-40 sm:pb-32">
        <div className="mx-auto max-w-3xl px-6 lg:px-8">

          {/* Hero */}
          <div className="text-center">
            <div className="mx-auto mb-6 flex h-14 w-14 items-center justify-center rounded-2xl bg-accent/10">
              <GitCompare className="h-7 w-7 text-accent" />
            </div>
            <SectionHeading
              as="h1"
              eyebrow="SuiteCompare"
              title="Compare your NetSuite scripts before they cost you"
              subtitle="Side-by-side diff tool for SuiteScript files. See exactly what changed between Sandbox and Production before every release."
              align="center"
            />
            <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-3">
              <Button href="/suitecompare/signup" size="lg">
                Start free
              </Button>
              <Button href="/suitecompare/login" variant="secondary" size="lg">
                Sign in
              </Button>
            </div>
            <p className="mt-4 text-sm text-brand-400">
              <Link href="/suitecompare/pricing" className="text-accent hover:underline">
                View pricing
              </Link>
              {" "}Free plan available, no credit card required.
            </p>
          </div>

          {/* Pain points */}
          <div className="mt-20">
            <SectionHeading
              eyebrow="The problem"
              title="Three things that go wrong without it"
              align="center"
            />
            <div className="mt-10 grid sm:grid-cols-3 gap-5">
              {PAIN_POINTS.map((item) => (
                <Card key={item.title} className="p-5">
                  <IconBadge icon={item.icon} />
                  <h3 className="mt-3 font-semibold text-brand-900 text-sm">{item.title}</h3>
                  <p
                    className="mt-1.5 text-sm text-brand-400"
                    dangerouslySetInnerHTML={{ __html: item.body }}
                  />
                </Card>
              ))}
            </div>
          </div>

          {/* Features */}
          <div className="mt-20">
            <SectionHeading
              eyebrow="Features"
              title="Built for NetSuite developers"
              align="center"
            />
            <div className="mt-10 grid sm:grid-cols-2 gap-5">
              {FEATURES.map((feature) => (
                <Card key={feature.title} className="p-5 flex items-start gap-4">
                  <IconBadge icon={feature.icon} />
                  <div>
                    <h3 className="font-semibold text-brand-900 text-sm">{feature.title}</h3>
                    <p className="mt-1.5 text-sm text-brand-400">{feature.description}</p>
                  </div>
                </Card>
              ))}
            </div>
          </div>

          {/* How it works */}
          <div className="mt-20">
            <SectionHeading
              eyebrow="How it works"
              title="From connection to comparison in minutes"
              align="center"
            />
            <div className="mt-10 space-y-6">
              {STEPS.map((step) => (
                <div
                  key={step.number}
                  className="flex gap-5 p-6 bg-white rounded-2xl border border-brand-50 shadow-soft"
                >
                  <span className="text-3xl font-bold text-brand-100 shrink-0 leading-none mt-0.5">
                    {step.number}
                  </span>
                  <div>
                    <h3 className="font-semibold text-brand-900">{step.title}</h3>
                    <p className="mt-1.5 text-sm text-brand-400">{step.body}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Pricing */}
          <div className="mt-20">
            <SectionHeading
              eyebrow="Pricing"
              title="Start free. Upgrade as you grow."
              align="center"
            />
            <div className="mt-10 grid sm:grid-cols-3 gap-5">
              {[
                {
                  name: "Free",
                  price: "$0",
                  description: "1 client, Production + Sandbox, 1 user.",
                  cta: "Start free",
                  href: "/suitecompare/signup",
                  highlight: false,
                },
                {
                  name: "Pro",
                  price: "$29/mo",
                  description: "Up to 10 clients, unlimited environments, 1 user.",
                  cta: "Get started",
                  href: "/suitecompare/signup",
                  highlight: true,
                  badge: "Most popular",
                },
                {
                  name: "Team",
                  price: "$99/mo",
                  description: "Unlimited clients, up to 5 users.",
                  cta: "Get started",
                  href: "/suitecompare/signup",
                  highlight: false,
                },
              ].map((plan) => (
                <div
                  key={plan.name}
                  className={`relative rounded-2xl border p-6 flex flex-col gap-4 ${
                    plan.highlight
                      ? "border-accent bg-accent/5 shadow-lg"
                      : "border-brand-50 bg-white shadow-soft"
                  }`}
                >
                  {plan.badge && (
                    <span className="absolute -top-3 left-1/2 -translate-x-1/2 inline-flex items-center rounded-full bg-accent px-3 py-1 text-xs font-semibold text-white whitespace-nowrap">
                      {plan.badge}
                    </span>
                  )}
                  <div>
                    <p className="text-xs font-semibold uppercase tracking-widest text-brand-400 mb-1">
                      {plan.name}
                    </p>
                    <p className="text-2xl font-bold text-brand-900">{plan.price}</p>
                    <p className="mt-1.5 text-xs text-brand-400">{plan.description}</p>
                  </div>
                  <Link
                    href={plan.href}
                    className={`mt-auto inline-flex items-center justify-center rounded-full px-4 py-2 text-sm font-medium transition-colors ${
                      plan.highlight
                        ? "bg-accent text-white hover:bg-accent/90"
                        : "border border-brand-100 text-brand-700 hover:bg-brand-50"
                    }`}
                  >
                    {plan.cta}
                  </Link>
                </div>
              ))}
            </div>
            <p className="mt-5 text-center text-sm text-brand-400">
              <Link href="/suitecompare/pricing" className="text-accent hover:underline">
                See full pricing details
              </Link>
            </p>
          </div>

          {/* CTA */}
          <div className="mt-20 rounded-2xl bg-brand-900 px-8 py-12 text-center">
            <h2 className="text-2xl font-semibold text-white">
              Start comparing your scripts today
            </h2>
            <p className="mt-3 text-sm text-brand-300">
              Free to start. No credit card required. Connect your first environment in under five minutes.
            </p>
            <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-3">
              <Button href="/suitecompare/signup" size="lg">
                Create free account
              </Button>
              <Link
                href="/netsuite-suitescript-development"
                className="text-sm text-brand-300 hover:text-white transition-colors"
              >
                Need custom SuiteScript work? &rarr;
              </Link>
            </div>
          </div>

        </div>
      </main>
      <Footer />
    </>
  );
}

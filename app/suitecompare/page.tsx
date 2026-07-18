import { redirect } from "next/navigation";
import Link from "next/link";
import { getScUserFromRequest } from "@/lib/sc-auth";
import { Nav } from "@/components/nav/Nav";
import { Footer } from "@/components/sections/Footer";
import {
  GitCompare,
  Hash,
  FileMinus2,
  Lock,
  MousePointerClick,
  CheckCircle2,
} from "lucide-react";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Card } from "@/components/ui/Card";
import { IconBadge } from "@/components/ui/IconBadge";
import { Button } from "@/components/ui/Button";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "SuiteCompare: One-Click NetSuite Environment Comparison",
  description:
    "Stop logging into two NetSuite accounts to compare scripts. SuiteCompare fetches Production and Sandbox SuiteScript files by Script ID and diffs them in one click.",
};

const OLD_STEPS = [
  "Log into Production",
  "Find the script",
  "Copy the code",
  "Log into Sandbox",
  "Find the same script",
  "Copy the code",
  "Open a diff tool",
  "Paste both versions",
];

const WORKFLOW_BENEFITS = [
  {
    icon: Hash,
    title: "Compare by Script ID",
    description:
      "Enter a Script ID. SuiteCompare finds the script in Production and Sandbox automatically. No navigating menus in two accounts.",
  },
  {
    icon: MousePointerClick,
    title: "One click, full comparison",
    description:
      "Pick a script, choose two environments, see the diff. The copy-paste cycle is gone entirely.",
  },
  {
    icon: FileMinus2,
    title: "Detect missing scripts",
    description:
      "See at a glance which scripts exist in one environment but not the other. No more discovering gaps after a deploy.",
  },
  {
    icon: Lock,
    title: "Built for NetSuite TBA",
    description:
      "Connects via Token-Based Authentication. No admin credentials stored, no shared logins. Designed for how NetSuite security actually works.",
  },
];

const HOW_IT_WORKS = [
  {
    number: "01",
    title: "Connect your environments once",
    body: "Add Production and Sandbox using Token-Based Authentication. This takes about two minutes. You never have to do it again.",
  },
  {
    number: "02",
    title: "Enter a Script ID",
    body: "Type any Script ID and SuiteCompare fetches the source code from both environments automatically. No logging in, no navigating menus.",
  },
  {
    number: "03",
    title: "See exactly what changed",
    body: "Get a line-by-line diff showing what is different, what is missing, and what is identical. One click from start to result.",
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
              title="Stop logging into two NetSuite accounts just to compare one script"
              subtitle="Compare Production and Sandbox in one click. No copy. No paste. No switching tabs."
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

          {/* The manual workflow */}
          <div className="mt-24">
            <SectionHeading
              eyebrow="The problem"
              title="Eight steps every time you want one diff"
              subtitle="This is what comparing a single script looks like without SuiteCompare."
              align="center"
            />
            <div className="mt-8 rounded-2xl border border-brand-100 bg-white shadow-soft overflow-hidden">
              <div className="flex items-center justify-between px-5 py-3 border-b border-brand-50 bg-brand-50/60">
                <span className="text-xs font-semibold uppercase tracking-wider text-brand-400">
                  The manual process
                </span>
                <span className="inline-flex items-center rounded-full bg-red-50 px-2.5 py-1 text-xs font-semibold text-red-500">
                  8 steps
                </span>
              </div>
              <ol className="divide-y divide-brand-50">
                {OLD_STEPS.map((step, i) => (
                  <li key={i} className="flex items-center gap-4 px-5 py-3">
                    <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full border border-brand-100 text-xs font-medium text-brand-300">
                      {i + 1}
                    </span>
                    <span className="text-sm text-brand-500">{step}</span>
                  </li>
                ))}
              </ol>
              <div className="flex items-center gap-3 border-t border-brand-100 bg-emerald-50 px-5 py-3.5">
                <CheckCircle2 className="h-4 w-4 shrink-0 text-emerald-500" />
                <span className="text-sm font-medium text-emerald-800">
                  With SuiteCompare: enter a Script ID, click Compare.
                </span>
              </div>
            </div>
          </div>

          {/* Why not Diffchecker */}
          <div className="mt-8 rounded-2xl border border-brand-100 bg-brand-50/40 px-6 py-5">
            <p className="text-sm font-semibold text-brand-900 mb-1.5">
              Why not just use Diffchecker?
            </p>
            <p className="text-sm text-brand-500 leading-relaxed">
              Free diff tools solve the last step. SuiteCompare eliminates the first seven. The problem
              was never the diff. It was the manual work required to get the code in front of a diff tool
              in the first place.
            </p>
          </div>

          {/* What it replaces */}
          <div className="mt-20">
            <SectionHeading
              eyebrow="What it replaces"
              title="Built for NetSuite developers, not text editors"
              align="center"
            />
            <div className="mt-10 grid sm:grid-cols-2 gap-5">
              {WORKFLOW_BENEFITS.map((item) => (
                <Card key={item.title} className="p-5 flex items-start gap-4">
                  <IconBadge icon={item.icon} />
                  <div>
                    <h3 className="font-semibold text-brand-900 text-sm">{item.title}</h3>
                    <p className="mt-1.5 text-sm text-brand-400">{item.description}</p>
                  </div>
                </Card>
              ))}
            </div>
          </div>

          {/* How it works */}
          <div className="mt-20">
            <SectionHeading
              eyebrow="How it works"
              title="Connect once. Compare forever."
              align="center"
            />
            <div className="mt-10 space-y-4">
              {HOW_IT_WORKS.map((step) => (
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
              Stop doing it the manual way
            </h2>
            <p className="mt-3 text-sm text-brand-300">
              Connect your first environment in under two minutes. Free to start, no credit card required.
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

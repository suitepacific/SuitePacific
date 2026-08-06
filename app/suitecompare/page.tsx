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
  GitBranch,
  FileText,
  Shuffle,
  Search,
  Check,
  Sparkles,
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
  alternates: { canonical: "https://suitepacific.com/suitecompare" },
  robots: { index: true, follow: true },
  openGraph: {
    title: "SuiteCompare: One-Click NetSuite Environment Comparison",
    description:
      "Stop logging into two NetSuite accounts to compare scripts. SuiteCompare fetches Production and Sandbox SuiteScript files by Script ID and diffs them in one click.",
    url: "https://suitepacific.com/suitecompare",
    type: "website",
    images: [{ url: "/og-default.png", width: 1200, height: 630 }],
  },
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
    icon: Lock,
    title: "Built for NetSuite TBA",
    description:
      "Connects via Token-Based Authentication. No admin credentials stored, no shared logins. Designed for how NetSuite security actually works.",
  },
  {
    icon: GitBranch,
    title: "Compare deployment status",
    description:
      "See how scripts are deployed across environments: record type, deployment status, and log level, side by side. Spot configuration drift without logging into two accounts.",
  },
  {
    icon: Sparkles,
    title: "Understand any script instantly",
    description:
      "Explain what a script does, summarize changes between environments, detect deployment risks, and generate release notes. Built directly into the comparison view, no context-switching required.",
    isNew: true,
  },
];

const ROADMAP_ITEMS = [
  {
    icon: FileMinus2,
    title: "Detect missing scripts",
    description:
      "See at a glance which scripts exist in one environment but not the other. Catch environment gaps before they cause issues in production.",
  },
  {
    icon: FileText,
    title: "Advanced PDF templates",
    description:
      "Diff the FreeMarker markup in your PDF templates the same way you diff scripts.",
  },
  {
    icon: Shuffle,
    title: "Workflow comparison",
    description:
      "See how SuiteFlow workflows differ between Sandbox and Production, state by state.",
  },
  {
    icon: Search,
    title: "Saved searches",
    description:
      "Compare saved search criteria and columns across environments.",
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
    body: "Get a line-by-line diff showing what is different, what is missing, and what is identical. Then ask the AI Summary to explain it in plain English.",
  },
];

export default async function SuiteCompareHomePage() {
  const user = await getScUserFromRequest();
  if (user) redirect("/suitecompare/dashboard");

  return (
    <>
      <Nav />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "SoftwareApplication",
            "@id": "https://suitepacific.com/suitecompare#software",
            name: "SuiteCompare",
            description:
              "Compare NetSuite Production and Sandbox SuiteScript files side-by-side in one click. Diff scripts, review deployment status, and understand any customization without switching tabs.",
            url: "https://suitepacific.com/suitecompare",
            applicationCategory: "BusinessApplication",
            operatingSystem: "Web",
            offers: {
              "@type": "Offer",
              price: "0",
              priceCurrency: "USD",
              description: "Free plan available, no credit card required",
            },
            provider: {
              "@type": "Organization",
              name: "SuitePacific, LLC",
              url: "https://suitepacific.com",
            },
          }),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "BreadcrumbList",
            itemListElement: [
              { "@type": "ListItem", position: 1, name: "Home", item: "https://suitepacific.com" },
              { "@type": "ListItem", position: 2, name: "SuiteCompare", item: "https://suitepacific.com/suitecompare" },
            ],
          }),
        }}
      />
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
              subtitle="Compare Production and Sandbox in one click. Understand what any script does without leaving NetSuite. No copy. No paste. No switching tabs."
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

          {/* Script intelligence highlight */}
          <div className="mt-10 rounded-2xl border border-accent/30 bg-accent/5 px-6 py-6">
            <div className="flex items-start gap-4">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-accent/10">
                <Sparkles className="h-5 w-5 text-accent" />
              </div>
              <div>
                <div className="flex items-center gap-2 mb-2">
                  <p className="text-sm font-semibold text-brand-900">Understand any NetSuite script in seconds</p>
                  <span className="inline-flex items-center rounded-full bg-accent px-2 py-0.5 text-xs font-semibold text-white">New</span>
                </div>
                <p className="text-sm text-brand-500 leading-relaxed mb-4">
                  Every NetSuite consultant has inherited a client account full of scripts named <code className="text-xs bg-white border border-brand-100 rounded px-1.5 py-0.5 font-mono text-brand-700">customscript_invoice_approval</code> with no documentation. Today the workflow is: open the script, copy the code, paste it into an external AI tool, ask what it does, then repeat for every script and every environment. SuiteCompare eliminates that entirely.
                </p>
                <div className="grid sm:grid-cols-2 gap-2">
                  {[
                    { label: "Explain Script", desc: "Plain-English explanation of what any script does" },
                    { label: "Explain Diff", desc: "Summarize what changed between Production and Sandbox" },
                    { label: "Risk Analysis", desc: "Detect recursive saves, hardcoded IDs, governance issues, and inactive deployments" },
                    { label: "Migration Summary", desc: "What will change if Sandbox replaces Production" },
                    { label: "Generate Release Notes", desc: "Create release notes automatically from code changes" },
                    { label: "Non-Technical Summary", desc: "Convert technical SuiteScript into business language for consultants and PMs" },
                  ].map((item) => (
                    <div key={item.label} className="flex items-start gap-2">
                      <Sparkles className="h-3 w-3 text-accent mt-0.5 shrink-0" />
                      <div>
                        <span className="text-xs font-semibold text-brand-800">{item.label} </span>
                        <span className="text-xs text-brand-400">{item.desc}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* What it replaces */}
          <div className="mt-20">
            <SectionHeading
              eyebrow="What it replaces"
              title="Built for NetSuite developers, not text editors"
              align="center"
            />
            <div className="mt-10 grid sm:grid-cols-2 gap-5">
              {WORKFLOW_BENEFITS.map((item, i) => (
                <Card
                  key={item.title}
                  className={`p-5 flex items-start gap-4${i === WORKFLOW_BENEFITS.length - 1 && WORKFLOW_BENEFITS.length % 2 !== 0 ? " sm:col-span-2" : ""}`}
                >
                  <IconBadge icon={item.icon} />
                  <div className="min-w-0">
                    <div className="flex items-center gap-2 flex-wrap">
                      <h3 className="font-semibold text-brand-900 text-sm">{item.title}</h3>
                      {"isNew" in item && item.isNew && (
                        <span className="inline-flex items-center rounded-full bg-accent/10 px-2 py-0.5 text-xs font-semibold text-accent">New</span>
                      )}
                    </div>
                    <p className="mt-1.5 text-sm text-brand-400">{item.description}</p>
                  </div>
                </Card>
              ))}
            </div>
          </div>

          {/* Roadmap */}
          <div className="mt-20">
            <SectionHeading
              eyebrow="On the roadmap"
              title="Script comparison is just the start"
              align="center"
            />
            <div className="mt-10 grid sm:grid-cols-2 gap-5">
              {ROADMAP_ITEMS.map((item) => (
                <Card key={item.title} className="p-5 flex items-start gap-4 opacity-80">
                  <IconBadge icon={item.icon} />
                  <div className="min-w-0">
                    <div className="flex items-center gap-2 flex-wrap">
                      <h3 className="font-semibold text-brand-900 text-sm">{item.title}</h3>
                      <span className="inline-flex items-center rounded-full bg-brand-50 border border-brand-100 px-2 py-0.5 text-xs text-brand-400">
                        Coming soon
                      </span>
                    </div>
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
                  tagline: "Perfect for individual NetSuite developers.",
                  features: ["1 client", "Production + Sandbox", "Unlimited comparisons", "No credit card required"],
                  cta: "Start free",
                  href: "/suitecompare/signup",
                  highlight: false,
                },
                {
                  name: "Pro",
                  price: "$29/mo",
                  tagline: "Built for consultants managing multiple NetSuite accounts.",
                  features: ["Up to 10 clients", "Unlimited environments", "Unlimited comparisons", "1 user"],
                  cta: "Get started",
                  href: "/suitecompare/signup",
                  highlight: true,
                  badge: "Most popular",
                },
                {
                  name: "Team",
                  price: "$99/mo",
                  tagline: "For consulting firms with multiple developers.",
                  features: ["Unlimited clients", "Unlimited environments", "Up to 5 users"],
                  cta: "Get started",
                  href: "/suitecompare/signup",
                  highlight: false,
                },
              ].map((plan) => (
                <div
                  key={plan.name}
                  className={`relative rounded-2xl border p-6 flex flex-col ${
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
                  <div className="mb-4">
                    <p className="text-xs font-semibold uppercase tracking-widest text-brand-400 mb-1">
                      {plan.name}
                    </p>
                    <p className="text-2xl font-bold text-brand-900">{plan.price}</p>
                    <p className="mt-2 text-xs text-brand-500 leading-relaxed">{plan.tagline}</p>
                  </div>
                  <ul className="space-y-1.5 flex-1 mb-5">
                    {plan.features.map((f) => (
                      <li key={f} className="flex items-center gap-2 text-xs text-brand-600">
                        <Check className="h-3 w-3 text-emerald-500 shrink-0" />
                        {f}
                      </li>
                    ))}
                  </ul>
                  <Link
                    href={plan.href}
                    className={`inline-flex items-center justify-center rounded-full px-4 py-2 text-sm font-medium transition-colors ${
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

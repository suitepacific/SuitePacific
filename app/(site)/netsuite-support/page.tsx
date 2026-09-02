import type { Metadata } from "next";
import Link from "next/link";
import {
  Zap, ShieldCheck, RefreshCcw, Users, Award, Clock,
  BarChart2, Wrench, ArrowRight, BookOpen, Activity,
} from "lucide-react";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Card } from "@/components/ui/Card";
import { IconBadge } from "@/components/ui/IconBadge";
import { BreadcrumbJsonLd, FaqJsonLd, ServiceJsonLd, OrganizationJsonLd, VideoObjectJsonLd } from "@/components/seo/JsonLd";
import { ServiceFaqSection } from "@/components/ui/ServiceFaqSection";
import { LeadFormLight } from "@/components/sections/LeadFormLight";
import { SITE_URL } from "@/lib/content";

const SERVICES = [
  {
    icon: RefreshCcw,
    title: "Managed Support",
    description: "Monthly retainer covering development, administration, break-fix, and upgrade preparation. The full account, one fixed cost.",
    href: "/netsuite-managed-support",
  },
  {
    icon: Zap,
    title: "Post-Go-Live Support",
    description: "Stabilization and ongoing support for accounts that have completed implementation and need a technical partner for day-to-day operations.",
    href: "/netsuite-post-go-live-support",
  },
  {
    icon: Clock,
    title: "Emergency Support",
    description: "Same-day response for production failures: broken scripts, failed integrations, workflow errors, and data issues requiring immediate diagnosis.",
    href: "/netsuite-emergency-support",
  },
  {
    icon: BookOpen,
    title: "SuiteScript Development",
    description: "Custom SuiteScript 2.x development for all script types: User Event, Scheduled, Map/Reduce, Client, RESTlet, and Suitelet. New builds and existing script fixes.",
    href: "/netsuite-suitescript-development",
  },
  {
    icon: Activity,
    title: "Workflow Automation",
    description: "SuiteFlow workflow development, modification, and troubleshooting. Approval routing, field updates, record creation, and complex conditional logic.",
    href: "/netsuite-workflow-automation",
  },
  {
    icon: ArrowRight,
    title: "Integrations",
    description: "Custom integrations and Celigo-based connections between NetSuite and Shopify, Salesforce, HubSpot, Amazon, and third-party platforms.",
    href: "/netsuite-integrations",
  },
  {
    icon: Users,
    title: "NetSuite Administration",
    description: "Ongoing administration: roles, permissions, custom fields, forms, subsidiary configuration, saved searches, and user management.",
    href: "/netsuite-administrator-support",
  },
  {
    icon: BarChart2,
    title: "Health Check",
    description: "A structured audit of scripts, workflows, integrations, and configurations that identifies what is fragile, stale, or likely to break in a future release.",
    href: "/netsuite-health-check",
  },
  {
    icon: ShieldCheck,
    title: "Account Optimization",
    description: "Technical debt cleanup, performance analysis, orphaned script removal, stale role cleanup, and broken workflow reference resolution.",
    href: "/netsuite-account-optimization",
  },
  {
    icon: Wrench,
    title: "Partner Replacement",
    description: "Account takeover from a non-responsive or exiting partner. Two-week onboarding, full account review, documentation of what was inherited.",
    href: "/netsuite-partner-replacement",
  },
  {
    icon: Award,
    title: "ACS Alternative",
    description: "An alternative to Oracle ACS that covers the technical layer ACS excludes: SuiteScript, integrations, workflows, and custom record administration.",
    href: "/netsuite-acs-alternative",
  },
  {
    icon: RefreshCcw,
    title: "Technical Debt",
    description: "Assessment and resolution of accumulated technical debt: orphaned scripts, deprecated APIs, stale roles, and configurations that no longer reflect how the business operates.",
    href: "/netsuite-technical-debt",
  },
];

const WHY_SP = [
  {
    icon: ShieldCheck,
    title: "Oracle-certified",
    description: "SuiteCloud Developer II and Administrator Professional certifications. Every engagement is handled by verified platform-credentialed consultants.",
  },
  {
    icon: Users,
    title: "Direct access",
    description: "You communicate directly with the consultant managing your account. No account manager relay, no ticket queue between you and the work.",
  },
  {
    icon: Award,
    title: "Celigo Mastery Level 4",
    description: "One of a small number of firms in North America at Celigo Mastery Level 4. Integration work involving Celigo is handled by a certified specialist.",
  },
  {
    icon: Clock,
    title: "Month-to-month terms",
    description: "No annual contract. Managed support engagements run month-to-month after a three-month minimum. Scale up or down as the account requires.",
  },
];

const FAQ = [
  {
    question: "What does NetSuite support include?",
    answer:
      "NetSuite support from SuitePacific covers the full technical layer of a live account: SuiteScript development and debugging, workflow creation and modification, Celigo and third-party integration maintenance, NetSuite administration (roles, forms, custom fields, permissions), saved search and report builds, Advanced PDF template work, release impact testing, and break-fix response when something fails in production. It does not cover net-new module implementations of substantial scope; those are priced separately. Everything a live account generates on a routine basis sits within scope.",
  },
  {
    question: "Who needs post-go-live NetSuite support?",
    answer:
      "Any account that is live on NetSuite with active customizations, integrations, or workflows and lacks an internal NetSuite developer or administrator. The typical SuitePacific client is a company that went live with an implementation partner, the implementation partner relationship has ended or is non-responsive, and now the account needs someone to handle the ongoing development and administration work that keeps accumulating. Companies also come to SuitePacific when their current NetSuite partner is too slow, too expensive, or cannot fix the technical layer they built.",
  },
  {
    question: "What is the difference between NetSuite support and NetSuite consulting?",
    answer:
      "NetSuite consulting typically refers to project-based work: scoped, priced, and delivered per engagement. NetSuite support is ongoing: a monthly retainer that covers the work as it surfaces, without per-task scoping. The practical difference is responsiveness and cost predictability. A support retainer means a broken script is fixed within a day without a project proposal. A consulting model means a new scope, a quote, and a wait before work starts. SuitePacific offers both models but recommends managed support for accounts with regular, ongoing technical needs.",
  },
  {
    question: "What does a managed NetSuite support engagement include?",
    answer:
      "A managed support retainer from SuitePacific covers development (new SuiteScript, workflow changes, integration maintenance), administration (roles, custom fields, forms, permissions, user management), break-fix (script errors, integration failures, workflow problems), and upgrade preparation (release notes review, Sandbox testing before each twice-yearly NetSuite upgrade). All work is handled under the fixed monthly retainer without per-task scoping. The retainer starts at $799 per month for accounts with lighter technical load and scales to $1,499 or $2,499 per month for accounts with heavier customization. Engagements are month-to-month.",
  },
  {
    question: "Can SuitePacific support an account implemented by a different partner?",
    answer:
      "Yes. Most SuitePacific accounts were implemented by another firm. The onboarding process covers a full account review: scripts, workflows, integrations, custom records, and configurations are documented as they exist, not as they were supposed to be. This typically takes two weeks. SuitePacific does not require documentation from the previous partner, though it helps if available. The goal of onboarding is to understand the account well enough to support it reliably.",
  },
  {
    question: "Can SuitePacific replace an existing NetSuite partner?",
    answer:
      "Yes. SuitePacific handles partner replacements regularly. The typical scenario is an account where the implementation partner has become non-responsive, is too slow to resolve issues, or has handed off the account to junior resources who cannot handle the technical layer. SuitePacific onboards within two weeks, reviews what was inherited, documents it, and begins covering open issues in month one. No cooperation from the previous partner is required, though credentials and access need to be transferred by the account owner.",
  },
  {
    question: "How quickly can a customer get help?",
    answer:
      "Accounts on a managed support retainer receive a one-business-day response on active requests and same-day response on production emergencies. Accounts contacting SuitePacific for the first time for an emergency fix also receive same-day response, with no minimum commitment required for initial emergency access. Standard requests submitted in the morning are typically acknowledged and triaged the same business day.",
  },
  {
    question: "How does pricing work for NetSuite support?",
    answer:
      "Managed support is a fixed monthly retainer priced based on the account's technical load: the number of active scripts, integrations, and workflows, and the expected monthly volume of development and administration work. Plans start at $799 per month. All retainers are month-to-month after a three-month minimum; there is no annual contract. Emergency support for one-time fixes is available without a retainer commitment. Contact SuitePacific for a quote based on your specific account.",
  },
];

export const metadata: Metadata = {
  title: "NetSuite Support Services",
  description:
    "NetSuite support for post-go-live accounts: managed support retainers, SuiteScript development, integrations, administration, partner replacement, and emergency break-fix. Oracle-certified, direct access, month-to-month.",
  alternates: { canonical: "/netsuite-support" },
  openGraph: {
    title: "NetSuite Support Services",
    description:
      "NetSuite support for post-go-live accounts: managed support retainers, SuiteScript development, integrations, administration, partner replacement, and emergency break-fix. Oracle-certified, direct access, month-to-month.",
    url: `${SITE_URL}/netsuite-support`,
    type: "website",
    images: [{ url: `${SITE_URL}/og-default.png`, width: 1200, height: 630 }],
  },
};

export default function NetSuiteSupportPage() {
  return (
    <main className="pt-32 pb-24 sm:pt-40 sm:pb-32">
      <BreadcrumbJsonLd
        items={[
          { name: "Home", url: SITE_URL },
          { name: "NetSuite Support", url: `${SITE_URL}/netsuite-support` },
        ]}
      />
      <FaqJsonLd items={FAQ} />
      <ServiceJsonLd
        name="NetSuite Support"
        description="NetSuite support for post-go-live accounts covering managed support retainers, SuiteScript development, integrations, administration, partner replacement, and emergency break-fix."
        url={`${SITE_URL}/netsuite-support`}
        serviceType="NetSuite Support"
      />
      <OrganizationJsonLd />
      <VideoObjectJsonLd
        name="SuitePacific Introduction: NetSuite Post-Go-Live Support and Consulting"
        description="An introduction to SuitePacific, a boutique NetSuite post-go-live support team providing SuiteScript development, workflow automation, and ongoing account optimization for businesses already live on NetSuite."
        videoId="IQvWN_yZ24A"
        duration="PT18S"
        uploadDate="2026-08-12"
        isShort
      />

      <div className="mx-auto max-w-3xl px-6 lg:px-8">
        <SectionHeading
          as="h1"
          eyebrow="NetSuite Support"
          title="NetSuite Support for Post-Go-Live Accounts"
          subtitle="SuitePacific provides ongoing technical support for companies already live on NetSuite: managed support retainers, SuiteScript development, integrations, administration, and partner replacement."
          align="left"
        />

        <div className="mt-6 rounded-2xl border border-brand-100 bg-white p-5 shadow-soft">
          <LeadFormLight />
        </div>
        <p className="mt-3 text-xs text-brand-400">Oracle-certified · Month-to-month · Direct access · Plans from $799/month</p>
        <p className="mt-1 text-xs text-brand-300">Last updated September 2026</p>

        <div className="mt-6 rounded-2xl border-l-4 border-accent bg-brand-50/50 p-5">
          <p className="text-xs font-semibold uppercase tracking-wide text-accent mb-2">Quick answer</p>
          <p className="text-sm text-brand-700 leading-relaxed">
            NetSuite support for post-go-live accounts covers the full technical layer that
            Oracle&apos;s standard support and ACS do not: SuiteScript development and debugging,
            SuiteFlow workflow creation and modification, Celigo and third-party integration
            maintenance, NetSuite administration (roles, custom fields, forms, permissions),
            saved search and dashboard builds, Advanced PDF template work, release impact
            testing, and break-fix response when something fails in production. SuitePacific
            provides this support as a managed monthly retainer starting at $799 per month,
            with no annual contract and direct access to the certified consultant managing
            the account. The retainer covers all routine technical work as it surfaces, without
            per-task scoping or project proposals for individual requests. Emergency support
            for one-time production failures is also available without a retainer commitment.
          </p>
        </div>

        <p className="mt-6 text-sm text-brand-400">
          Most NetSuite accounts that are past go-live have the same structural situation: the
          implementation partner relationship has ended or become unreliable, and the account has
          scripts, workflows, and integrations that need an ongoing technical partner to maintain
          and evolve them. SuitePacific covers that layer.
        </p>

        {/* Services grid */}
        <div className="mt-14" data-section="services">
          <h2 className="text-lg font-semibold text-brand-900 mb-6">What NetSuite support services does SuitePacific provide?</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {SERVICES.map((item) => (
              <Link
                key={item.title}
                href={item.href}
                className="group rounded-xl border border-brand-100 bg-white p-5 flex items-start gap-4 hover:border-accent/30 hover:shadow-soft transition-all"
              >
                <IconBadge icon={item.icon} />
                <div className="min-w-0">
                  <p className="font-semibold text-brand-900 text-sm group-hover:text-accent transition-colors">{item.title}</p>
                  <p className="mt-1 text-xs text-brand-400 leading-relaxed">{item.description}</p>
                </div>
              </Link>
            ))}
          </div>
        </div>

        {/* Who this is for */}
        <div className="mt-14" data-section="who-this-is-for">
          <h2 className="text-lg font-semibold text-brand-900 mb-4">Who is NetSuite post-go-live support for?</h2>
          <div className="space-y-3">
            {[
              "Companies that have completed their NetSuite implementation and whose implementation partner relationship has ended or become non-responsive",
              "Accounts with active SuiteScript customizations, Celigo integrations, or SuiteFlow workflows that need an ongoing technical partner to maintain and evolve them",
              "Companies looking to replace a NetSuite partner that is too slow, too expensive, or cannot support the technical layer they built",
              "Finance and operations teams that need a certified NetSuite developer and administrator without hiring one full-time",
              "Accounts that recently experienced a production failure and need both emergency resolution and a longer-term support relationship to prevent the next one",
            ].map((item) => (
              <div key={item} className="flex items-start gap-3">
                <span className="text-accent font-bold text-sm mt-0.5 shrink-0">→</span>
                <p className="text-sm text-brand-500">{item}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Why SuitePacific */}
        <div className="mt-14" data-section="why-suitepacific">
          <h2 className="text-lg font-semibold text-brand-900 mb-6">Why SuitePacific for NetSuite support?</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            {WHY_SP.map((item) => (
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

        {/* Pricing */}
        <div className="mt-14" data-section="pricing">
          <h2 className="text-lg font-semibold text-brand-900 mb-4">How does NetSuite support pricing work?</h2>
          <div className="rounded-xl border border-brand-100 bg-brand-50/30 p-5 space-y-3">
            <p className="text-sm text-brand-500">
              Managed support retainers are priced as a fixed monthly fee based on the account&apos;s
              technical load: the number of active scripts, integrations, and workflows, and the
              expected monthly volume of development and administration requests.
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-1">
              {[
                { tier: "Essential", price: "$799/month", desc: "Lighter customization load, established integrations, moderate monthly request volume" },
                { tier: "Professional", price: "$1,499/month", desc: "Active development and administration needs, multiple integrations, regular SuiteScript work" },
                { tier: "Enterprise", price: "$2,499/month", desc: "High-volume accounts, complex customization layer, multiple subsidiaries or integrations" },
              ].map((t) => (
                <div key={t.tier} className="rounded-lg border border-brand-100 bg-white p-4">
                  <p className="text-xs font-semibold text-brand-400 uppercase tracking-wide">{t.tier}</p>
                  <p className="text-base font-bold text-accent mt-1">{t.price}</p>
                  <p className="text-xs text-brand-400 mt-1.5 leading-relaxed">{t.desc}</p>
                </div>
              ))}
            </div>
            <p className="text-xs text-brand-400 pt-1">
              All plans run month-to-month after a three-month minimum. No annual contract.{" "}
              <Link href="/netsuite-care" className="text-accent hover:underline">View full plan details →</Link>
            </p>
          </div>
        </div>

        {/* CTA */}
        <div className="mt-12 rounded-2xl border-2 border-accent/30 bg-gradient-to-br from-accent/5 to-transparent p-6">
          <p className="text-xs font-semibold uppercase tracking-wide text-accent mb-3">Get started</p>
          <h2 className="text-base font-semibold text-brand-900 mb-3">
            SuitePacific: NetSuite support for accounts that are already live.
          </h2>
          <p className="text-sm text-brand-500 mb-4">
            Oracle SuiteCloud Developer II and Administrator Professional certified. Celigo Mastery
            Level 4. US-based, direct developer access on every plan. Managed support retainers
            start at $799 per month, month-to-month after a three-month minimum. Emergency
            support available without a retainer commitment.
          </p>
          <Link
            href="/netsuite-care"
            className="inline-flex items-center gap-2 rounded-lg bg-accent px-4 py-2 text-sm font-semibold text-white hover:bg-accent/90 transition-colors"
          >
            View support plans <ArrowRight className="h-3.5 w-3.5" />
          </Link>
        </div>

        <ServiceFaqSection items={FAQ} />

        {/* Related pages */}
        <div className="mt-10 rounded-2xl border border-brand-100 bg-brand-50/30 p-5 sm:p-6">
          <p className="text-sm font-semibold text-brand-900 mb-3">Related resources</p>
          <ul className="space-y-2.5">
            <li className="text-sm text-brand-400">
              <Link href="/netsuite-implementation-partner-vs-managed-support" className="text-accent hover:underline">NetSuite implementation partner vs. managed support</Link>{" "}
              explains the difference between the two models and when each applies.
            </li>
            <li className="text-sm text-brand-400">
              <Link href="/netsuite-oracle-support-vs-third-party" className="text-accent hover:underline">Oracle NetSuite support vs. third-party support</Link>{" "}
              covers what Oracle&apos;s own support includes and what it does not.
            </li>
            <li className="text-sm text-brand-400">
              <Link href="/netsuite-acs-alternatives-comparison" className="text-accent hover:underline">NetSuite ACS alternatives comparison</Link>{" "}
              compares Oracle ACS, boutique managed support, and independent consultants across key dimensions.
            </li>
            <li className="text-sm text-brand-400">
              <Link href="/netsuite-consultant-cost" className="text-accent hover:underline">NetSuite consultant cost guide</Link>{" "}
              covers how NetSuite consulting and support services are priced across different models.
            </li>
          </ul>
        </div>
      </div>
    </main>
  );
}

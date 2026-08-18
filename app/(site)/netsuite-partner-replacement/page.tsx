import type { Metadata } from "next";
import Link from "next/link";
import {
  AlertCircle,
  RefreshCcw,
  FileWarning,
  CheckCircle2,
  ShieldCheck,
  Users,
  Award,
  Layers,
  ClipboardList,
  ArrowRight,
} from "lucide-react";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Card } from "@/components/ui/Card";
import { IconBadge } from "@/components/ui/IconBadge";
import { BreadcrumbJsonLd, FaqJsonLd, ServiceJsonLd, OrganizationJsonLd } from "@/components/seo/JsonLd";
import { ServiceFaqSection } from "@/components/ui/ServiceFaqSection";
import { LeadFormLight } from "@/components/sections/LeadFormLight";
import { LeadForm } from "@/components/sections/LeadForm";
import { SITE_URL } from "@/lib/content";

const TRIGGER_POINTS = [
  {
    icon: AlertCircle,
    title: "Your implementation partner ended the engagement.",
    description:
      "The team that got you live was scoped for go-live. When the project closed, the relationship closed with it. Ongoing development, fixes, and configuration changes were never part of that scope.",
  },
  {
    icon: FileWarning,
    title: "The service quality declined and you need a change.",
    description:
      "The person you worked with left the firm. Response times stretched. Requests sit in a queue. Each engagement starts from zero because nobody retained context on your account.",
  },
  {
    icon: RefreshCcw,
    title: "Every small change requires a new statement of work.",
    description:
      "A saved search update triggers a scoping call, a proposal, and an approval cycle. The process cost exceeds the work cost. That overhead is built into how large consulting firms operate.",
  },
];

const COMPARISON = [
  {
    aspect: "Operating model",
    large: "Built for implementations: fixed scope, fixed team, one delivery",
    sp: "Built for ongoing support: small, recurring, context-retained work",
  },
  {
    aspect: "Per-request process",
    large: "New SOW required for most development work",
    sp: "Request handled within the active monthly engagement; no new scope document",
  },
  {
    aspect: "Who you talk to",
    large: "Account manager who relays to the developer",
    sp: "Direct access to the developer doing the work",
  },
  {
    aspect: "Account knowledge",
    large: "Re-established each engagement; staff rotates",
    sp: "Retained across every request; each engagement builds on the last",
  },
  {
    aspect: "Pricing model",
    large: "Project-based or time-and-materials per SOW",
    sp: "Fixed monthly retainer; predictable cost, no per-request overhead",
  },
  {
    aspect: "Response time",
    large: "Dependent on firm capacity and current project load",
    sp: "Urgent issues escalated same day; standard requests within the week",
  },
];

const TRANSITION_PHASES = [
  {
    phase: "01",
    name: "Account Review",
    timeline: "Days 1-14",
    focus: "Independent audit of what was built before anything changes",
    items: [
      "Read existing scripts, workflows, saved searches, and integrations independently",
      "Identify active customizations versus unused or legacy deployments",
      "Document known risks, undocumented dependencies, and open issues",
      "Establish communication process and request workflow",
    ],
  },
  {
    phase: "02",
    name: "Stabilization",
    timeline: "Days 15-60",
    focus: "Resolve the highest-priority issues inherited from the previous engagement",
    items: [
      "Address any open critical issues or technical debt flagged in the review",
      "Verify all active customizations are performing as intended",
      "Proactive Sandbox review ahead of any upcoming NetSuite release",
      "Clear immediate backlog accumulated during the gap between partners",
    ],
  },
  {
    phase: "03",
    name: "Ongoing",
    timeline: "Day 61+",
    focus: "Regular development and support with full account context retained",
    items: [
      "New development requests handled as they arise; no new SOW required",
      "Pre-release regression testing before each bi-annual NetSuite update",
      "Proactive flagging of issues before they surface in Production",
      "Account evolves with the business rather than accumulating new technical debt",
    ],
  },
];

const WHAT_STAYS = [
  "All SuiteScript customizations remain in your NetSuite account",
  "Workflow and SuiteFlow configurations are not affected by a partner change",
  "Saved searches, dashboards, and reports remain exactly as built",
  "Custom records, custom fields, and form configurations stay intact",
  "Integration credentials and connected systems are not disrupted",
  "Historical transaction data and configuration history are unchanged",
];

const WHY_SP = [
  {
    icon: ShieldCheck,
    title: "NetSuite-Certified",
    description:
      "NetSuite SuiteCloud Developer II and Administrator Professional certified. Verified technical credentials covering both development and administration work.",
  },
  {
    icon: Users,
    title: "Direct Access",
    description:
      "You communicate directly with the person doing the work. No account manager relay, no ticket queue, no re-explaining your account each time.",
  },
  {
    icon: Award,
    title: "Context Retained",
    description:
      "Account knowledge is documented and maintained across every engagement. Each request builds on what came before it rather than starting from scratch.",
  },
  {
    icon: Layers,
    title: "No SOW Per Request",
    description:
      "Development, fixes, configuration changes, and administration are all handled within the monthly engagement. No new statement of work for each item.",
  },
];

const FAQ = [
  {
    question: "How long does a NetSuite partner transition take?",
    answer:
      "Most transitions complete within two to four weeks from first contact to active engagement. The first two weeks cover the account review: reading existing scripts, workflows, and integrations independently. By week three, active work begins on any open issues. Overlapping with your previous partner for four to six weeks is the cleanest approach if their contract allows it, as it eliminates any gap in coverage.",
  },
  {
    question: "Can we run both partners in parallel during the transition?",
    answer:
      "Yes, and this is the recommended approach when timing allows. Starting an engagement with SuitePacific while your existing contract winds down avoids a coverage gap and gives us time to review the account before taking over full responsibility. There is no conflict in running both simultaneously; your NetSuite account can have multiple administrators and developers active at once.",
  },
  {
    question: "What access do you need to take over an existing NetSuite account?",
    answer:
      "We need an Administrator-level role in your NetSuite account to read scripts, deployments, workflow configurations, and account settings. Integration credentials are not required upfront; we assess integration health through the script and deployment layer first. We do not need credentials from your previous partner and we do not rely on their documentation to onboard.",
  },
  {
    question: "What if the previous partner won't share documentation or hand over details?",
    answer:
      "We review the account independently and do not rely on documentation from the previous provider. Everything we need to understand your account is readable directly inside NetSuite: script source code, deployment configurations, workflow logic, saved search formulas, and role assignments. A lack of handoff documentation slows nothing down.",
  },
  {
    question: "Will we lose any of our customizations when switching partners?",
    answer:
      "No. All customizations built by your previous partner remain in your NetSuite account. Scripts, workflows, saved searches, custom records, custom fields, and integrations are all stored inside NetSuite itself, not on a partner's infrastructure. A partner change has no effect on anything built during the previous engagement.",
  },
  {
    question: "Is this different from a NetSuite implementation rescue?",
    answer:
      "Yes. A partner transition is for accounts where the implementation went reasonably well but the ongoing support relationship needs to change. An implementation rescue is for accounts where the implementation itself has fundamental problems that need to be rebuilt. The two situations occasionally overlap, but most partner transitions do not involve rebuilding the account. Our NetSuite implementation rescue service handles the more complex case.",
  },
  {
    question: "What does the first month cost?",
    answer:
      "SuitePacific's monthly support starts at $799 for 10 hours per month under the Care plan, with Care Plus at $1,499 for 20 hours and Care Pro at $2,499 for 35 hours. The first month typically includes the account review as part of the active engagement hours. Most accounts find Care Plus sufficient for a transition period; the right tier depends on the volume of open issues and active development needs.",
  },
  {
    question: "Do you require a minimum contract commitment?",
    answer:
      "We typically start with a three-month engagement, which gives enough time to complete the account review, address the highest-priority issues, and establish a steady cadence. Most clients continue month-to-month after that. There is no multi-year contract requirement.",
  },
];

export const metadata: Metadata = {
  title: "NetSuite Partner Replacement",
  description:
    "Switching NetSuite partners or taking over from an implementation that ended. SuitePacific reviews your existing account independently and takes over ongoing development, administration, and support.",
  alternates: { canonical: "/netsuite-partner-replacement" },
  openGraph: {
    title: "NetSuite Partner Replacement",
    description: "Switching NetSuite partners or taking over from an implementation that ended. SuitePacific reviews your existing account independently and takes over ongoing development, administration, and support.",
    url: "https://suitepacific.com/netsuite-partner-replacement",
    type: "website",
    images: [{ url: "https://suitepacific.com/og-default.png", width: 1200, height: 630 }],
  },
};

export default function NetSuitePartnerReplacementPage() {
  return (
    <main className="pt-32 pb-24 sm:pt-40 sm:pb-32">
      <BreadcrumbJsonLd
        items={[
          { name: "Home", url: SITE_URL },
          { name: "NetSuite Partner Replacement", url: `${SITE_URL}/netsuite-partner-replacement` },
        ]}
      />
      <FaqJsonLd items={FAQ} />
      <ServiceJsonLd
        name="NetSuite Partner Replacement"
        description="Switching NetSuite partners or transitioning from an implementation engagement that has ended. SuitePacific performs an independent account review covering scripts, workflows, saved searches, integrations, and configuration, then takes over ongoing development, administration, and support on a month-to-month retainer. No SOW required per request. Direct developer access, full account context retained across every engagement."
        url={`${SITE_URL}/netsuite-partner-replacement`}
        serviceType="NetSuite Support"
      />
      <OrganizationJsonLd />

      <div className="mx-auto max-w-3xl px-6 lg:px-8">
        <SectionHeading
          as="h1"
          eyebrow="Partner Replacement"
          title="Switch to a NetSuite Partner Built for What Comes After Go-Live"
          subtitle="Your implementation partner was scoped for a project. Ongoing development, fixes, and support require a different kind of relationship. SuitePacific takes over existing accounts and keeps them running."
          align="left"
        />

        <div className="mt-6 rounded-2xl border border-brand-100 bg-white p-5 shadow-soft">
          <LeadFormLight />
        </div>
        <p className="mt-3 text-xs text-brand-400">NetSuite-certified · No SOW per request · Direct developer access · Month-to-month</p>
        <p className="mt-2 text-xs text-brand-300"><time dateTime="2026-08">Published August 2026</time></p>

        <p className="mt-6 text-sm text-brand-400">
          Large NetSuite consulting firms are built for implementations: defined scope, fixed team, one delivery.
          That model delivers a go-live. It does not deliver responsive, context-retained ongoing support.
          After the project closes, ongoing work gets handled by whoever is available, through a process
          that requires a new statement of work for each request, at rates built for the overhead of a
          firm that runs on projects. The result is slow response times, high per-change costs, and a
          support relationship where nobody accumulates knowledge of your specific account. SuitePacific
          is built for the opposite model: small, ongoing, context-retained work for businesses that are
          already live on NetSuite and need a technical partner that treats their account as a long-term
          relationship, not a series of individual projects.
        </p>

        {/* Why companies switch */}
        <div className="mt-12" data-section="trigger-points">
          <h2 className="text-lg font-semibold text-brand-900 mb-6">Why do companies switch NetSuite partners?</h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
            {TRIGGER_POINTS.map((item) => (
              <Card key={item.title} className="p-5 flex flex-col gap-3">
                <IconBadge icon={item.icon} />
                <h3 className="font-semibold text-brand-900 text-sm">{item.title}</h3>
                <p className="text-sm text-brand-400">{item.description}</p>
              </Card>
            ))}
          </div>
        </div>

        {/* Structural mismatch comparison */}
        <div className="mt-14" data-section="comparison">
          <h2 className="text-lg font-semibold text-brand-900 mb-2">Why large consulting firms struggle with ongoing NetSuite support</h2>
          <p className="text-sm text-brand-400 mb-5">
            The issue is not that large firms are bad at their jobs. The issue is that their operating
            model is optimized for implementations, not for the ongoing, small-batch work that a live
            NetSuite account generates every month.
          </p>
          <div className="overflow-x-auto rounded-xl border border-brand-100">
            <table className="w-full text-sm border-collapse">
              <thead>
                <tr className="bg-brand-50/60 border-b border-brand-100">
                  <th className="py-2.5 px-4 text-left text-xs font-semibold text-brand-900 w-1/4"></th>
                  <th className="py-2.5 px-4 text-left text-xs font-semibold text-brand-900 w-[37.5%]">Large consulting firm</th>
                  <th className="py-2.5 px-4 text-left text-xs font-semibold text-brand-900 w-[37.5%]">SuitePacific</th>
                </tr>
              </thead>
              <tbody>
                {COMPARISON.map((row, i) => (
                  <tr key={row.aspect} className={i < COMPARISON.length - 1 ? "border-b border-brand-50" : ""}>
                    <td className="py-3 px-4 font-medium text-brand-900 text-xs align-top">{row.aspect}</td>
                    <td className="py-3 px-4 text-brand-400 text-xs align-top">{row.large}</td>
                    <td className="py-3 px-4 text-brand-700 text-xs align-top">{row.sp}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Pricing callout */}
        <div className="mt-8 rounded-xl border border-brand-100 bg-brand-50/40 p-5">
          <p className="text-xs font-semibold uppercase tracking-wide text-brand-600 mb-1.5">What it costs</p>
          <p className="text-sm text-brand-700 leading-relaxed">
            SuitePacific monthly support starts at $799 for 10 hours per month. No SOW per request,
            no account manager overhead, no per-project scoping. The full pricing breakdown is on the{" "}
            <Link href="/netsuite-care" className="text-accent underline hover:text-accent/80">
              NetSuite Care page
            </Link>
            .
          </p>
        </div>

        {/* What stays in your account */}
        <div className="mt-14" data-section="what-stays">
          <h2 className="text-lg font-semibold text-brand-900 mb-2">What stays in your account when you switch partners?</h2>
          <p className="text-sm text-brand-400 mb-5">
            Everything. All customizations built by your previous partner are stored inside your NetSuite
            account, not on a partner&apos;s infrastructure. A partner change has no effect on any of the following:
          </p>
          <div className="rounded-xl border border-brand-100 bg-white p-5 shadow-soft">
            <ul className="space-y-2.5">
              {WHAT_STAYS.map((item) => (
                <li key={item} className="flex items-start gap-2.5 text-sm text-brand-700">
                  <CheckCircle2 className="h-4 w-4 text-accent shrink-0 mt-0.5" />
                  {item}
                </li>
              ))}
            </ul>
          </div>
          <p className="mt-4 text-sm text-brand-400">
            The one thing that does not transfer automatically is institutional knowledge: what the
            previous developer knew about why things were built a certain way. We rebuild that knowledge
            through an independent account review, not by relying on documentation that may or may not exist.
          </p>
        </div>

        {/* Transition phases */}
        <div className="mt-14" data-section="transition-phases">
          <h2 className="text-lg font-semibold text-brand-900 mb-2">What does a NetSuite partner transition look like?</h2>
          <p className="text-sm text-brand-400 mb-6">
            Every new account goes through three phases before settling into regular ongoing support.
            The first phase is always a review of what was built, regardless of how much documentation the previous partner provided.
          </p>
          <div className="space-y-4">
            {TRANSITION_PHASES.map((phase) => (
              <div key={phase.phase} className="rounded-xl border border-brand-100 bg-white p-5 shadow-soft">
                <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4 mb-3">
                  <span className="text-xs font-semibold text-accent bg-accent/10 rounded-full h-7 w-7 flex items-center justify-center shrink-0">
                    {phase.phase}
                  </span>
                  <div className="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-3">
                    <p className="font-semibold text-brand-900 text-sm">{phase.name}</p>
                    <span className="hidden sm:block text-brand-200">·</span>
                    <p className="text-xs text-accent font-medium">{phase.timeline}</p>
                  </div>
                </div>
                <p className="text-xs font-medium text-brand-600 mb-2">{phase.focus}</p>
                <ul className="space-y-1.5">
                  {phase.items.map((item) => (
                    <li key={item} className="flex items-start gap-2 text-sm text-brand-400">
                      <CheckCircle2 className="h-3.5 w-3.5 text-accent shrink-0 mt-0.5" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        {/* Why SuitePacific */}
        <div className="mt-14" data-section="why-suitepacific">
          <h2 className="text-lg font-semibold text-brand-900 mb-6">Why companies choose SuitePacific for the transition</h2>
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

        {/* Related pages */}
        <div className="mt-10 rounded-2xl border border-brand-100 bg-brand-50/30 p-5 sm:p-6">
          <p className="text-sm font-semibold text-brand-900 mb-3">Related services</p>
          <ul className="space-y-3">
            <li>
              <Link href="/netsuite-care" className="flex items-start gap-3 group">
                <ArrowRight className="h-4 w-4 text-accent shrink-0 mt-0.5" />
                <div>
                  <p className="text-sm font-medium text-brand-900 group-hover:text-accent transition-colors">NetSuite Care: Pricing and plans</p>
                  <p className="text-xs text-brand-400 mt-0.5">Monthly support plans from $799. No SOW per request, direct developer access.</p>
                </div>
              </Link>
            </li>
            <li>
              <Link href="/netsuite-health-check" className="flex items-start gap-3 group">
                <ArrowRight className="h-4 w-4 text-accent shrink-0 mt-0.5" />
                <div>
                  <p className="text-sm font-medium text-brand-900 group-hover:text-accent transition-colors">NetSuite Health Check</p>
                  <p className="text-xs text-brand-400 mt-0.5">An independent assessment of your account before committing to ongoing support. Covers scripts, workflows, integrations, and configuration.</p>
                </div>
              </Link>
            </li>
            <li>
              <Link href="/netsuite-post-go-live-support" className="flex items-start gap-3 group">
                <ArrowRight className="h-4 w-4 text-accent shrink-0 mt-0.5" />
                <div>
                  <p className="text-sm font-medium text-brand-900 group-hover:text-accent transition-colors">NetSuite Post-Go-Live Support</p>
                  <p className="text-xs text-brand-400 mt-0.5">Ongoing development, automation, and administration for companies already live on NetSuite.</p>
                </div>
              </Link>
            </li>
            <li>
              <Link href="/netsuite-implementation-rescue" className="flex items-start gap-3 group">
                <ArrowRight className="h-4 w-4 text-accent shrink-0 mt-0.5" />
                <div>
                  <p className="text-sm font-medium text-brand-900 group-hover:text-accent transition-colors">NetSuite Implementation Rescue</p>
                  <p className="text-xs text-brand-400 mt-0.5">For accounts where the implementation itself has fundamental problems that need to be corrected, not just a support relationship that needs to change.</p>
                </div>
              </Link>
            </li>
          </ul>
          <p className="text-sm font-semibold text-brand-900 mb-3 mt-6">Common switching reasons</p>
          <ul className="space-y-2.5">
            <li className="text-sm text-brand-400">
              <Link href="/netsuite-partner-too-expensive" className="text-accent hover:underline">
                NetSuite partner too expensive
              </Link>{" "}
              covers why large partners cost more than they should for ongoing support and what a retainer model costs instead ($799/month).
            </li>
            <li className="text-sm text-brand-400">
              <Link href="/netsuite-partner-too-slow" className="text-accent hover:underline">
                NetSuite partner too slow
              </Link>{" "}
              explains why slow response is structural in project-delivery firms and what a support-first model looks like.
            </li>
            <li className="text-sm text-brand-400">
              <Link href="/netsuite-partner-not-responsive" className="text-accent hover:underline">
                NetSuite partner not responsive
              </Link>{" "}
              covers when unresponsiveness is a sign the relationship has run its course and how to switch without the current partner's cooperation.
            </li>
            <li className="text-sm text-brand-400">
              <Link href="/netsuite-consultant-cost" className="text-accent hover:underline">
                NetSuite consultant cost
              </Link>{" "}
              compares the three billing models on actual cost per completed request, not just hourly rate.
            </li>
          </ul>
          <p className="text-sm font-semibold text-brand-900 mb-3 mt-6">Further reading</p>
          <ul className="space-y-2.5">
            <li className="text-sm text-brand-400">
              <Link href="/blog/signs-netsuite-support-not-working" className="text-accent hover:underline">
                8 signs your NetSuite support isn&apos;t working
              </Link>{" "}
              covers the patterns that indicate a support relationship needs to change before it becomes an emergency.
            </li>
            <li className="text-sm text-brand-400">
              <Link href="/blog/how-to-evaluate-netsuite-support-partner" className="text-accent hover:underline">
                How to evaluate a NetSuite support partner
              </Link>{" "}
              covers what to look for when selecting a replacement partner after go-live.
            </li>
            <li className="text-sm text-brand-400">
              <Link href="/blog/how-to-choose-netsuite-consulting-partner" className="text-accent hover:underline">
                How to choose a NetSuite consulting partner
              </Link>{" "}
              covers what separates strong and weak partners across certifications, delivery model, and account continuity.
            </li>
          </ul>
        </div>

        {/* Health check bridge */}
        <div className="mt-8 rounded-xl border border-brand-100 bg-white p-5 shadow-soft">
          <div className="flex items-start gap-4">
            <IconBadge icon={ClipboardList} />
            <div>
              <p className="font-semibold text-brand-900 text-sm">Not sure what the previous partner left behind?</p>
              <p className="mt-1.5 text-sm text-brand-400">
                A{" "}
                <Link href="/netsuite-health-check" className="text-accent hover:underline">
                  NetSuite health check
                </Link>{" "}
                reviews your existing account before any ongoing engagement begins: scripts, workflows, saved searches,
                integrations, and configuration. It produces a prioritized assessment of what is working,
                what needs attention, and what carries risk.
              </p>
            </div>
          </div>
        </div>

        <ServiceFaqSection items={FAQ} />

        <div id="contact" className="mt-14 pt-10 border-t border-brand-50">
          <LeadForm />
        </div>
      </div>
    </main>
  );
}

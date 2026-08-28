import type { Metadata } from "next";
import Link from "next/link";
import { Clock, AlertCircle } from "lucide-react";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { BreadcrumbJsonLd, FaqJsonLd, ServiceJsonLd, OrganizationJsonLd } from "@/components/seo/JsonLd";
import { LeadFormLight } from "@/components/sections/LeadFormLight";
import { LeadForm } from "@/components/sections/LeadForm";
import { SITE_URL } from "@/lib/content";

const WHY_SLOW = [
  {
    reason: "Shared resource pool",
    detail:
      "Large firms assign consultants to multiple clients simultaneously. Your request waits in a queue behind whichever project is most urgent to the firm that week, not most urgent to you.",
  },
  {
    reason: "SOW process for every request",
    detail:
      "Needing a statement of work for a two-hour script fix means days of back-and-forth before work starts. The scoping process alone takes longer than the work.",
  },
  {
    reason: "Account manager relay",
    detail:
      "Your request goes to an account manager, who relays it to the developer, who may have a question, who relays back through the account manager. A two-question clarification becomes a two-day delay.",
  },
  {
    reason: "No retained context",
    detail:
      "Without ongoing account context, even a returning consultant needs time to re-learn what they are touching before they can safely make a change. That re-onboarding is dead time for you.",
  },
];

const DELIVERY_COMPARISON = [
  { aspect: "Request start time", slow: "Scoping call, SOW, approval: 3-7 days before work begins", fast: "No SOW within an active engagement; starts within the same week" },
  { aspect: "Urgent issue response", slow: "Enters shared queue; no defined same-day path", fast: "Same-day escalation for production-affecting issues" },
  { aspect: "Context per request", slow: "Re-onboarding each engagement billed at full hourly rate", fast: "Retained context; no re-onboarding time on any request" },
  { aspect: "Who responds", slow: "Account manager relay to a rotating consultant", fast: "Direct access to the developer with ongoing account knowledge" },
  { aspect: "Ongoing work model", slow: "Per-project; each change requires a new engagement overhead", fast: "Monthly allocation; no per-request engagement overhead" },
];

const FAQ = [
  {
    question: "How quickly does SuitePacific respond to support requests?",
    answer:
      "Urgent issues (production-affecting errors, broken scripts, failed integrations) are escalated same-day. Standard requests are acknowledged within one business day and addressed within the active week based on priority. Because SuitePacific retains ongoing context on every account, there is no re-onboarding time before work begins.",
  },
  {
    question: "What is causing my NetSuite partner to respond so slowly?",
    answer:
      "The most common causes of slow NetSuite partner response are: shared resource pools (your consultant is on three other projects), a scoping requirement for every request that adds days before work starts, and an account manager relay that adds communication lag. These are structural problems with the project-delivery firm model, not individual failures that will improve on their own.",
  },
  {
    question: "Can I switch NetSuite partners without losing my customizations?",
    answer:
      "Yes. All scripts, workflows, saved searches, integrations, and configuration live inside your NetSuite account. A partner change does not affect any of that. SuitePacific reviews the account independently from the existing work and takes over without requiring anything from the previous partner.",
  },
];

export const metadata: Metadata = {
  title: "NetSuite Partner Too Slow? Why It Happens and What to Do",
  description:
    "Slow NetSuite partner response is a structural problem with the project-delivery model, not a fixable individual issue. Here is what causes it and what a support-first model looks like instead.",
  alternates: { canonical: "/netsuite-partner-too-slow" },
  openGraph: {
    title: "NetSuite Partner Too Slow? Why It Happens and What to Do",
    description: "Slow NetSuite partner response is structural, not fixable. Here is why it happens and what a support-first model looks like instead.",
    url: "https://suitepacific.com/netsuite-partner-too-slow",
    type: "website",
    images: [{ url: "https://suitepacific.com/og-default.png", width: 1200, height: 630 }],
  },
};

export default function NetSuitePartnerTooSlowPage() {
  return (
    <main className="pt-32 pb-24 sm:pt-40 sm:pb-32">
      <BreadcrumbJsonLd
        items={[
          { name: "Home", url: SITE_URL },
          { name: "NetSuite Partner Replacement", url: `${SITE_URL}/netsuite-partner-replacement` },
          { name: "NetSuite Partner Too Slow", url: `${SITE_URL}/netsuite-partner-too-slow` },
        ]}
      />
      <FaqJsonLd items={FAQ} />
      <ServiceJsonLd
        name="NetSuite Partner Replacement"
        description="Switching from a slow or unresponsive NetSuite partner to a boutique support firm built for ongoing post-go-live work. SuitePacific responds same-day for urgent issues and retains ongoing account context."
        url={`${SITE_URL}/netsuite-partner-replacement`}
        serviceType="NetSuite Support"
      />
      <OrganizationJsonLd />

      <div className="mx-auto max-w-3xl px-6 lg:px-8">
        <SectionHeading
          as="h1"
          eyebrow="Partner Response Problems"
          title="Your NetSuite Partner Is Too Slow. Here Is Why It Will Not Get Better."
          subtitle="Slow response from a NetSuite partner is almost always structural, not situational. Understanding why it happens is the first step to deciding whether to wait it out or find a better model."
          align="left"
        />

        <div className="mt-6 rounded-2xl border border-brand-100 bg-white p-5 shadow-soft">
          <LeadFormLight />
        </div>
        <p className="mt-3 text-xs text-brand-400">
          Urgent issues escalated same-day &middot; Direct developer access &middot; No SOW per request
        </p>

        <div className="mt-6 rounded-2xl border-l-4 border-accent bg-brand-50/50 p-5">
          <p className="text-xs font-semibold uppercase tracking-wide text-accent mb-2">Quick answer</p>
          <p className="text-sm text-brand-700 leading-relaxed">
            Slow NetSuite partner response is structural, not a communication problem that escalation
            will fix. Large consulting firms run shared resource pools: your consultant handles
            several clients simultaneously and your request waits behind whichever project is most
            urgent to the firm that week. A statement of work requirement for each request adds days
            of back-and-forth before a two-hour fix can begin. When the consultant who knew your
            account moves to another project, the replacement re-onboards at your expense before
            making any changes. The combination of shared resources, per-request overhead, and zero
            retained context produces consistently slow turnaround on accounts with regular ongoing
            needs. A support-first model removes these bottlenecks: direct access to the developer
            doing the work with no account manager relay, no statement of work for routine requests
            within an active engagement, and retained account context that eliminates re-onboarding
            time. Urgent production issues are escalated same-day rather than entering a shared
            queue. SuitePacific operates this support-first model for post-go-live NetSuite accounts.
          </p>
        </div>

        <p className="mt-8 text-sm text-brand-400 leading-relaxed">
          When a small NetSuite request sits open for a week or a production issue waits two days
          for someone to look at it, the instinct is to escalate or wait and see if things improve.
          In most cases, they do not. Slow response is not a communication problem that a meeting
          will fix. It is the result of structural choices in how large consulting firms operate.
        </p>

        {/* Why slow */}
        <div className="mt-14">
          <h2 className="text-lg font-semibold text-brand-900 mb-6">
            Why is your NetSuite partner so slow to respond?
          </h2>
          <div className="space-y-4">
            {WHY_SLOW.map((item) => (
              <div key={item.reason} className="flex gap-3">
                <Clock className="h-4 w-4 text-amber-500 shrink-0 mt-0.5" />
                <div>
                  <p className="text-sm font-semibold text-brand-900">{item.reason}</p>
                  <p className="mt-1 text-sm text-brand-400">{item.detail}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Warning signs */}
        <div className="mt-14">
          <h2 className="text-lg font-semibold text-brand-900 mb-4">
            Warning signs the problem is structural, not fixable
          </h2>
          <div className="space-y-3">
            {[
              "You have had the same conversation about response times more than once",
              "Escalating to account management improves things briefly, then reverts",
              "Different consultants handle your account each time and nobody retains context",
              "Small requests sit open for a week without an explanation",
              "You avoid submitting requests because the process overhead is not worth it",
            ].map((sign) => (
              <div key={sign} className="flex items-start gap-2.5 text-sm text-brand-600">
                <AlertCircle className="h-4 w-4 text-amber-500 shrink-0 mt-0.5" />
                {sign}
              </div>
            ))}
          </div>
        </div>

        {/* Comparison table */}
        <div className="mt-14">
          <h2 className="text-lg font-semibold text-brand-900 mb-4">
            Project-delivery model vs. support-first model: how response differs
          </h2>
          <div className="overflow-x-auto rounded-2xl border border-brand-100">
            <table className="w-full text-sm border-collapse">
              <thead>
                <tr>
                  <th className="bg-brand-50/60 px-5 py-3 text-left text-xs font-semibold text-brand-900 w-1/3"></th>
                  <th className="bg-brand-50/60 px-5 py-3 text-left text-xs font-semibold text-brand-600">Project-delivery firm</th>
                  <th className="bg-brand px-5 py-3 text-left text-xs font-semibold text-white">Support-first firm</th>
                </tr>
              </thead>
              <tbody>
                {DELIVERY_COMPARISON.map((row, i) => (
                  <tr key={row.aspect} className={i % 2 === 0 ? "bg-white" : "bg-brand-50/30"}>
                    <td className="px-5 py-3 text-xs font-semibold text-brand-900 align-top border-t border-brand-100">{row.aspect}</td>
                    <td className="px-5 py-3 text-xs text-brand-600 align-top border-t border-brand-100">{row.slow}</td>
                    <td className="px-5 py-3 text-xs text-brand-600 align-top border-t border-brand-100 bg-brand/5">{row.fast}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* What better looks like */}
        <div className="mt-14">
          <h2 className="text-lg font-semibold text-brand-900 mb-4">
            What does a more responsive NetSuite support model look like?
          </h2>
          <p className="text-sm text-brand-400 leading-relaxed mb-4">
            A boutique partner built for ongoing support eliminates the structural causes of slow response:
          </p>
          <ul className="space-y-3 text-sm text-brand-400">
            <li><strong className="text-brand-700">Direct developer access:</strong> You communicate directly with the person doing the work. No account manager relay, no ticket queue, no re-explaining your account each time.</li>
            <li><strong className="text-brand-700">No SOW per request:</strong> Work falls within the active monthly engagement. No scoping call, no proposal, no approval cycle before a two-hour fix begins.</li>
            <li><strong className="text-brand-700">Retained account context:</strong> The same consultant handles every request and maintains ongoing knowledge of your account. No re-onboarding time before work begins.</li>
            <li><strong className="text-brand-700">Urgent escalation path:</strong> Production-affecting issues are escalated same-day, not put in a queue behind other projects.</li>
          </ul>
        </div>

        {/* Related */}
        <div className="mt-14 rounded-2xl border border-brand-100 bg-brand-50/30 p-5 sm:p-6">
          <p className="text-sm font-semibold text-brand-900 mb-3">Next steps</p>
          <ul className="space-y-2.5">
            <li className="text-sm text-brand-400">
              <Link href="/netsuite-partner-replacement" className="text-accent hover:underline">NetSuite partner replacement</Link>
              {" "}covers the full transition process: what the first 90 days look like, what stays in your account, and how to overlap the handoff cleanly.
            </li>
            <li className="text-sm text-brand-400">
              <Link href="/netsuite-care" className="text-accent hover:underline">NetSuite Care plans</Link>
              {" "}show what a fixed monthly retainer with direct developer access costs ($799–$2,499/month) and what it includes.
            </li>
            <li className="text-sm text-brand-400">
              <Link href="/blog/signs-netsuite-support-not-working" className="text-accent hover:underline">8 signs your NetSuite support is not working</Link>
              {" "}gives a fuller picture of when a support relationship has run its course.
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

        {/* CTA */}
        <div className="mt-16">
          <h2 className="text-xl font-semibold text-brand-900 text-balance mb-2">
            Stop waiting. Get direct access to a developer who knows your account.
          </h2>
          <p className="text-sm text-brand-400 mb-6">
            SuitePacific retains context across every request and escalates urgent issues same-day.
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

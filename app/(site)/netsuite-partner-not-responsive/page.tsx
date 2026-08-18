import type { Metadata } from "next";
import Link from "next/link";
import { AlertCircle } from "lucide-react";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { BreadcrumbJsonLd, FaqJsonLd, ServiceJsonLd, OrganizationJsonLd } from "@/components/seo/JsonLd";
import { LeadFormLight } from "@/components/sections/LeadFormLight";
import { LeadForm } from "@/components/sections/LeadForm";
import { SITE_URL } from "@/lib/content";

const FAQ = [
  {
    question: "What should I do if my NetSuite partner is not responding?",
    answer:
      "Start evaluating a replacement now rather than waiting for the situation to improve. Begin by documenting what is running in your account so a new partner can onboard independently. Identify who holds administrator access internally. Then evaluate replacement partners — look specifically for firms whose primary model is ongoing retainer support, not project delivery. A transition typically takes two to four weeks from first contact to active work.",
  },
  {
    question: "Can I switch to a new NetSuite partner if my current one is unresponsive?",
    answer:
      "Yes. Your NetSuite account, customizations, scripts, workflows, and data are entirely owned by you and live inside your NetSuite instance. A new partner can read and work with everything that was built without any cooperation or documentation from your existing partner. Administrator access is the only requirement for onboarding.",
  },
  {
    question: "Is it normal for a NetSuite partner to be unresponsive for days at a time?",
    answer:
      "It is common with large implementation firms handling many clients simultaneously but it is not acceptable for an account with ongoing technical needs. Urgent production issues should receive a same-day response. Standard requests should be acknowledged within one business day. If your partner consistently takes longer than that, the relationship is not functioning as an ongoing support engagement.",
  },
  {
    question: "What causes NetSuite partners to become unresponsive?",
    answer:
      "The most common causes are: the consultant who knew your account moved to another project, your account is deprioritized during a busy implementation period, the firm does not have a dedicated support team separate from its project delivery team, and the per-request SOW requirement means low-urgency items simply never get started. These are structural patterns in project-delivery firms, not individual performance issues.",
  },
];

export const metadata: Metadata = {
  title: "NetSuite Partner Not Responsive: When to Switch and How",
  description:
    "An unresponsive NetSuite partner is a sign the relationship has run its course. Here is what causes it, how to decide when to switch, and what the transition looks like.",
  alternates: { canonical: "/netsuite-partner-not-responsive" },
  openGraph: {
    title: "NetSuite Partner Not Responsive: When to Switch and How",
    description: "An unresponsive NetSuite partner is a sign the relationship has run its course. What causes it and what the transition to a better model looks like.",
    url: "https://suitepacific.com/netsuite-partner-not-responsive",
    type: "website",
    images: [{ url: "https://suitepacific.com/og-default.png", width: 1200, height: 630 }],
  },
};

export default function NetSuitePartnerNotResponsivePage() {
  return (
    <main className="pt-32 pb-24 sm:pt-40 sm:pb-32">
      <BreadcrumbJsonLd
        items={[
          { name: "Home", url: SITE_URL },
          { name: "NetSuite Partner Replacement", url: `${SITE_URL}/netsuite-partner-replacement` },
          { name: "NetSuite Partner Not Responsive", url: `${SITE_URL}/netsuite-partner-not-responsive` },
        ]}
      />
      <FaqJsonLd items={FAQ} />
      <ServiceJsonLd
        name="NetSuite Partner Replacement"
        description="Replacing an unresponsive NetSuite partner with a boutique support firm built for ongoing post-go-live work. Direct developer access, same-day escalation for urgent issues, retained account context."
        url={`${SITE_URL}/netsuite-partner-replacement`}
        serviceType="NetSuite Support"
      />
      <OrganizationJsonLd />

      <div className="mx-auto max-w-3xl px-6 lg:px-8">
        <SectionHeading
          as="h1"
          eyebrow="Unresponsive Partner"
          title="Your NetSuite Partner Is Not Responding. Here Is When to Stop Waiting."
          subtitle="An unresponsive NetSuite partner is almost always a structural problem, not a temporary one. Here is how to recognize when the relationship has run its course and what to do next."
          align="left"
        />

        <div className="mt-6 rounded-2xl border border-brand-100 bg-white p-5 shadow-soft">
          <LeadFormLight />
        </div>
        <p className="mt-3 text-xs text-brand-400">
          SuitePacific responds same-day for urgent issues &middot; Direct developer access &middot; No SOW per request
        </p>

        <p className="mt-8 text-sm text-brand-400 leading-relaxed">
          Most businesses wait too long before switching a NetSuite partner that has stopped being
          responsive. The pattern is familiar: a request sits open for a week, there is an escalation
          conversation, things improve briefly, then revert. The hope is that it is a temporary problem.
          Usually it is not.
        </p>

        {/* Signs */}
        <div className="mt-14">
          <h2 className="text-lg font-semibold text-brand-900 mb-6">
            Signs your NetSuite partner relationship has run its course
          </h2>
          <div className="space-y-3">
            {[
              "Production issues sit open for more than one business day without a response",
              "You have escalated the responsiveness issue more than once without lasting improvement",
              "Simple requests take a week or more to start because of the SOW requirement",
              "The consultant who knew your account is no longer your contact",
              "You are not sure who is actually working on your account at any given time",
              "You have started doing workarounds rather than waiting for the fix",
              "You avoid submitting requests because the follow-up process is more effort than the issue",
            ].map((sign) => (
              <div key={sign} className="flex items-start gap-2.5 text-sm text-brand-600">
                <AlertCircle className="h-4 w-4 text-amber-500 shrink-0 mt-0.5" />
                {sign}
              </div>
            ))}
          </div>
        </div>

        {/* When to switch */}
        <div className="mt-14">
          <h2 className="text-lg font-semibold text-brand-900 mb-4">
            When should you switch your NetSuite partner?
          </h2>
          <p className="text-sm text-brand-400 leading-relaxed mb-4">
            The right time to start evaluating a replacement is before the current relationship has
            fully broken down. Once a production issue is sitting open with no response, you are
            already in crisis mode. The best time to switch is when the pattern is clear but before
            an urgent situation forces the decision under pressure.
          </p>
          <p className="text-sm text-brand-400 leading-relaxed">
            Start the evaluation process now if your current partner requires more follow-up from
            you than work from them. A transition to a replacement partner typically takes two to
            four weeks. Starting that process while you still have some functioning coverage from
            the current relationship is far better than starting it after they have fully checked out.
          </p>
        </div>

        {/* How to switch */}
        <div className="mt-14">
          <h2 className="text-lg font-semibold text-brand-900 mb-4">
            What does switching look like when your partner is already unresponsive?
          </h2>
          <div className="space-y-4 text-sm text-brand-400">
            <p><strong className="text-brand-700">You do not need their cooperation.</strong> A new partner can read everything that was built in your account independently. Scripts, workflows, and configurations are visible to any user with Administrator access. Your account history is inside NetSuite, not inside your current partner's systems.</p>
            <p><strong className="text-brand-700">You do not need their documentation.</strong> Handoff documentation from an unresponsive partner is often thin or nonexistent. A strong replacement partner builds their own understanding of the account directly from what is deployed, without relying on what the previous partner provides.</p>
            <p><strong className="text-brand-700">You retain full control.</strong> Your NetSuite account, your data, and everything that was built are yours. Removing an unresponsive partner's administrator access and granting access to a new partner is a straightforward account change that takes minutes.</p>
          </div>
        </div>

        {/* Related */}
        <div className="mt-14 rounded-2xl border border-brand-100 bg-brand-50/30 p-5 sm:p-6">
          <p className="text-sm font-semibold text-brand-900 mb-3">Next steps</p>
          <ul className="space-y-2.5">
            <li className="text-sm text-brand-400">
              <Link href="/netsuite-partner-replacement" className="text-accent hover:underline">NetSuite partner replacement</Link>
              {" "}is the full guide to switching partners: the transition timeline, what the first 90 days look like, and how to overlap the handoff.
            </li>
            <li className="text-sm text-brand-400">
              <Link href="/blog/how-to-switch-netsuite-partners" className="text-accent hover:underline">How to switch NetSuite partners without losing momentum</Link>
              {" "}walks through the six-step process in detail.
            </li>
            <li className="text-sm text-brand-400">
              <Link href="/netsuite-care" className="text-accent hover:underline">NetSuite Care plans</Link>
              {" "}show the ongoing support model that replaces the project-delivery firm: direct developer access, retained context, from $799/month.
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
            Get a partner who responds when you need them.
          </h2>
          <p className="text-sm text-brand-400 mb-6">
            Direct developer access, same-day escalation for urgent issues, ongoing context retained across every request.
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

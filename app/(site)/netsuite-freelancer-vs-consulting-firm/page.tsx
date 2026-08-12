import type { Metadata } from "next";
import Link from "next/link";
import { Check, X, AlertCircle } from "lucide-react";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { BreadcrumbJsonLd, FaqJsonLd, OrganizationJsonLd, VideoObjectJsonLd, ArticleJsonLd } from "@/components/seo/JsonLd";
import { ServiceFaqSection } from "@/components/ui/ServiceFaqSection";
import { LeadFormLight } from "@/components/sections/LeadFormLight";
import { SITE_URL, LEGAL_NAME } from "@/lib/content";

const COMPARISON_ROWS = [
  {
    label: "Continuity risk",
    freelancer: "Single point of failure: one illness, vacation, or departure stalls all work",
    firm: "Team-based delivery; work continues regardless of individual availability",
  },
  {
    label: "Scope of expertise",
    freelancer: "Typically deep in one area; gaps in SuiteScript, workflows, integrations, or reporting",
    firm: "Breadth across development, automation, reporting, and integrations in one engagement",
  },
  {
    label: "Documentation",
    freelancer: "Inconsistent; often undocumented after project closes",
    firm: "Every change documented as part of delivery; institutional knowledge stays with the account",
  },
  {
    label: "Sandbox discipline",
    freelancer: "No enforced standard; testing approach varies widely",
    firm: "Changes sandbox-tested before production deployment by default",
  },
  {
    label: "Response expectations",
    freelancer: "Depends entirely on the individual; no defined SLA",
    firm: "Defined response expectations; direct access to the person doing the work",
  },
  {
    label: "Long-term continuity",
    freelancer: "Engagement typically ends when the project closes",
    firm: "Ongoing relationship; team knows the account and business context over time",
  },
  {
    label: "Cost structure",
    freelancer: "Lower hourly rate; total cost rises when scope expands or errors need rework",
    firm: "Predictable cost on dedicated monthly support; no surprise invoices when scope shifts",
  },
  {
    label: "Accountability",
    freelancer: "Informal; recourse is limited if quality falls short",
    firm: "Contractual accountability; clear escalation path if expectations are not met",
  },
];

const FREELANCER_FITS = [
  "A single, well-scoped project with a clear deliverable and end date",
  "A specific technical skill needed for one thing (a particular integration, a one-off script)",
  "Someone internally who can define the scope, review the work, and manage the relationship",
  "A budget ceiling that rules out ongoing engagements for now",
];

const FIRM_FITS = [
  "Ongoing NetSuite work that spans SuiteScript, workflows, reporting, and integrations",
  "No internal technical resource to manage scope, review code, or own the account relationship",
  "A need for documentation and continuity as the business changes over time",
  "A production environment where undocumented changes or untested deployments carry real risk",
];

const QUESTIONS_FREELANCER = [
  "How many active clients are you carrying right now, and what is your typical turnaround?",
  "Who covers your work when you are unavailable for a week or more?",
  "How do you document what you build?",
  "Can you share examples of SuiteScript work similar to what we need?",
  "What certifications do you hold, and when were they last renewed?",
];

const QUESTIONS_FIRM = [
  "Who on the team will be assigned to our account, and what is their experience level?",
  "How do you handle urgent issues during business hours and outside them?",
  "What does your documentation and handoff process look like?",
  "Do you work with accounts our size, and do you have examples in our industry?",
  "Which of your three engagement models fits our situation, and what does each include?",
];

const FAQ = [
  {
    question: "Is a freelance NetSuite developer cheaper than a consulting firm?",
    answer:
      "The hourly rate is usually lower with a freelancer, but total cost is rarely the same as hourly rate times hours. Scope changes, rework from undocumented or untested changes, and re-onboarding a new freelancer when one becomes unavailable all add cost that does not appear on an initial quote. For short, well-scoped projects, a freelancer can be cost-effective. For ongoing or complex work, a consulting firm often costs less in practice.",
  },
  {
    question: "What happens if my freelance NetSuite developer becomes unavailable?",
    answer:
      "This is the most common pain point for businesses that rely on a single freelancer. If they become ill, take on another client, or end the engagement, there is no coverage and no handoff unless you planned for it in advance. A consulting firm maintains continuity because the work is distributed across a team and the account knowledge stays in one place regardless of who is working on it.",
  },
  {
    question: "How do I evaluate a freelance NetSuite developer before hiring?",
    answer:
      "Ask for current SuiteCloud Developer or Administrator certifications. Verify them on the Oracle certification portal; self-declared credentials are common, verified ones are not. Ask for examples of work similar to your project and references from clients with comparable scope. Confirm how they handle documentation, testing in Sandbox, and what happens if they are unavailable mid-project.",
  },
  {
    question: "How does a NetSuite consulting firm structure its engagements?",
    answer:
      "Structure varies. SuitePacific offers three models: dedicated monthly support (a fixed block of hours applied to whatever comes up each month), on-demand access for occasional requests without a monthly commitment, and project-based engagements for defined builds with an agreed scope. Whatever the model, look for a response time commitment, a named person or team on the account, documentation of all changes, and a clear process for new requests.",
  },
  {
    question: "Can I use a freelancer for some NetSuite work and a consulting firm for other parts?",
    answer:
      "Yes, but it requires clear scope boundaries and coordination. The main risk is two parties making changes to the same customization without awareness of each other. If you split work, define ownership by area (one party owns scripts, another owns workflows, for example) and ensure changes are documented so neither team is working blind.",
  },
];

export const metadata: Metadata = {
  title: "NetSuite Freelancer vs. Consulting Firm: How to Choose",
  description:
    "The practical trade-offs between hiring a freelance NetSuite developer and working with a consulting firm: accountability, continuity, cost structure, and when each model fits.",
  alternates: { canonical: "/netsuite-freelancer-vs-consulting-firm" },
  openGraph: {
    title: "NetSuite Freelancer vs. Consulting Firm: How to Choose",
    description:
      "Practical trade-offs between a freelance NetSuite developer and a consulting firm: accountability, continuity, cost structure, and which model fits your situation.",
    url: "https://suitepacific.com/netsuite-freelancer-vs-consulting-firm",
    type: "website",
    images: [{ url: "https://suitepacific.com/og-default.png", width: 1200, height: 630 }],
  },
};

export default function FreelancerVsConsultingFirmPage() {
  return (
    <main className="pt-32 pb-24 sm:pt-40 sm:pb-32">
      <BreadcrumbJsonLd
        items={[
          { name: "Home", url: SITE_URL },
          {
            name: "NetSuite Freelancer vs. Consulting Firm",
            url: `${SITE_URL}/netsuite-freelancer-vs-consulting-firm`,
          },
        ]}
      />
      <FaqJsonLd items={FAQ} />
      <OrganizationJsonLd />
      <VideoObjectJsonLd
        name="SuitePacific Introduction: NetSuite Post-Go-Live Support and Consulting"
        description="An introduction to SuitePacific, a boutique NetSuite post-go-live support team providing SuiteScript development, workflow automation, and ongoing account optimization for businesses already live on NetSuite."
        videoId="IQvWN_yZ24A"
        uploadDate="2026-08-12"
        isShort
      />
      <ArticleJsonLd
        url={`${SITE_URL}/netsuite-freelancer-vs-consulting-firm`}
        headline="NetSuite Freelancer vs. Consulting Firm: How to Choose"
        description="The practical trade-offs between hiring a freelance NetSuite developer and working with a consulting firm: accountability, continuity, cost structure, and when each model fits."
        datePublished="2025-08-01"
        dateModified="2026-08-12"
      />

      <div className="mx-auto max-w-3xl px-6 lg:px-8">
        <SectionHeading
          as="h1"
          eyebrow="Choosing the Right Model"
          title="NetSuite Freelancer vs. Consulting Firm"
          subtitle="The real trade-offs between hiring a freelance NetSuite developer and working with a consulting firm, and how to know which one fits what you actually need."
          align="left"
        />

        <div className="mt-8 rounded-2xl border border-brand-100 bg-white p-5 shadow-soft">
          <LeadFormLight />
        </div>
        <p className="mt-3 text-xs text-brand-400">NetSuite-certified · Sandbox-first · Direct access, no ticket system · Month-to-month</p>

        {/* Intro */}
        <div className="prose prose-blue mt-10 max-w-none prose-headings:font-semibold prose-headings:text-brand-900 prose-p:text-brand-400 prose-a:text-accent prose-a:no-underline hover:prose-a:underline prose-strong:text-brand-900">
          <p>
            SuitePacific is a boutique NetSuite consulting firm. We work exclusively with companies
            already live on NetSuite, handling ongoing development, automation, reporting, and
            support as the account grows and changes after go-live.
          </p>
          <p>
            Both a freelancer and a consulting firm can write SuiteScript and fix broken
            customizations. The difference is not in the technical output on any given task; it is
            in what happens around it: who covers the work when someone is unavailable, where
            documentation lives, what recourse exists when something goes wrong, and whether
            institutional knowledge stays with the account over time.
          </p>
        </div>

        {/* Comparison table */}
        <div className="mt-12">
          <h2 className="text-lg font-semibold text-brand-900 mb-4">
            Side-by-side comparison
          </h2>

          {/* Mobile: stacked cards */}
          <div className="sm:hidden space-y-4">
            {COMPARISON_ROWS.map((row) => (
              <div key={row.label} className="rounded-2xl border border-brand-100 overflow-hidden">
                <div className="bg-brand-50/60 px-4 py-2">
                  <p className="text-xs font-semibold text-brand-900 uppercase tracking-wide">
                    {row.label}
                  </p>
                </div>
                <div className="grid grid-cols-2 divide-x divide-brand-100">
                  <div className="p-3">
                    <p className="text-[11px] font-semibold text-brand-400 mb-1">Freelancer</p>
                    <p className="text-xs text-brand-600">{row.freelancer}</p>
                  </div>
                  <div className="p-3 bg-brand/5">
                    <p className="text-[11px] font-semibold text-brand-900 mb-1">Consulting Firm</p>
                    <p className="text-xs text-brand-600">{row.firm}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Desktop: proper table */}
          <div className="hidden sm:block overflow-x-auto rounded-2xl border border-brand-100">
            <table className="w-full text-sm border-collapse">
              <thead>
                <tr>
                  <th className="bg-brand-50/60 px-5 py-3 text-left text-xs font-semibold text-brand-900 w-1/4">
                    Factor
                  </th>
                  <th className="bg-brand-50/60 px-5 py-3 text-left text-xs font-semibold text-brand-600 w-[37.5%]">
                    Freelancer
                  </th>
                  <th className="bg-brand px-5 py-3 text-left text-xs font-semibold text-white w-[37.5%]">
                    Consulting Firm
                  </th>
                </tr>
              </thead>
              <tbody>
                {COMPARISON_ROWS.map((row, i) => (
                  <tr
                    key={row.label}
                    className={i % 2 === 0 ? "bg-white" : "bg-brand-50/30"}
                  >
                    <td className="px-5 py-3 text-xs font-semibold text-brand-900 align-top border-t border-brand-100">
                      {row.label}
                    </td>
                    <td className="px-5 py-3 text-xs text-brand-600 align-top border-t border-brand-100">
                      {row.freelancer}
                    </td>
                    <td className="px-5 py-3 text-xs text-brand-600 align-top border-t border-brand-100 bg-brand/5">
                      {row.firm}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Who works with SuitePacific */}
        <div className="mt-12">
          <div className="rounded-2xl bg-brand text-white p-6 shadow-soft-lg">
            <h2 className="font-semibold mb-1">Who works with SuitePacific</h2>
            <p className="text-sm text-blue-100/80 mb-5">
              The typical client has been live on NetSuite for at least six months, has ongoing
              work across SuiteScript, workflows, reporting, or integrations, and no internal
              technical resource to own that layer.
            </p>
            <ul className="space-y-3">
              {FIRM_FITS.map((item) => (
                <li key={item} className="flex items-start gap-3 text-sm">
                  <Check className="h-4 w-4 text-emerald-400 shrink-0 mt-0.5" />
                  {item}
                </li>
              ))}
            </ul>
          </div>
          <div className="mt-4 rounded-2xl border border-brand-100 bg-brand-50/30 p-4 sm:p-5">
            <p className="text-sm font-semibold text-brand-900 mb-1">What about one-off projects?</p>
            <p className="text-sm text-brand-400">
              A single, well-defined project with a clear deliverable and someone internally to
              manage the brief can work with a freelancer. For anything that involves ongoing
              context, multiple service areas, or accountability beyond an informal arrangement,
              the structure a firm provides is worth the difference.
            </p>
          </div>
        </div>

        {/* The accountability gap */}
        <div className="prose prose-blue mt-12 max-w-none prose-headings:font-semibold prose-headings:text-brand-900 prose-p:text-brand-400 prose-a:text-accent prose-a:no-underline hover:prose-a:underline prose-strong:text-brand-900">
          <h2>The accountability gap</h2>
          <p>
            The most underestimated difference between a freelancer and a consulting firm is not
            cost or expertise; it is accountability when something goes wrong. With a freelancer,
            recourse is largely informal. If a customization breaks production, or a script has
            side effects that surface weeks later, there is no team to escalate to and no defined
            process for remediation.
          </p>
          <p>
            A consulting firm carries institutional accountability: a named point of contact, a
            service agreement with defined expectations, and internal processes for reviewing
            changes before they go live. That structure costs more than an hourly freelancer rate
            and is worth more than the difference once something goes wrong.
          </p>
          <p>
            For businesses with an internal NetSuite administrator or technical lead who can review
            work and manage the freelancer relationship, the accountability gap is smaller. For
            businesses without that internal layer, it is the most important factor in the decision.
          </p>
        </div>

        {/* Questions to ask */}
        <div className="mt-12">
          <h2 className="text-lg font-semibold text-brand-900 mb-1">
            Questions to ask before hiring
          </h2>
          <p className="text-sm text-brand-400 mb-6">
            Evaluate both options with the same rigor. These questions surface the differences that matter.
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div>
              <p className="text-sm font-semibold text-brand-900 mb-3">If considering a freelancer</p>
              <ul className="space-y-2.5">
                {QUESTIONS_FREELANCER.map((q) => (
                  <li key={q} className="flex items-start gap-2.5 text-sm text-brand-600">
                    <AlertCircle className="h-4 w-4 text-amber-500 shrink-0 mt-0.5" />
                    {q}
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <p className="text-sm font-semibold text-brand-900 mb-3">If considering a consulting firm</p>
              <ul className="space-y-2.5">
                {QUESTIONS_FIRM.map((q) => (
                  <li key={q} className="flex items-start gap-2.5 text-sm text-brand-600">
                    <AlertCircle className="h-4 w-4 text-amber-500 shrink-0 mt-0.5" />
                    {q}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        {/* Warning box */}
        <div className="mt-10 rounded-2xl border border-amber-200 bg-amber-50/60 p-5 flex items-start gap-4">
          <X className="h-5 w-5 text-amber-600 shrink-0 mt-0.5" />
          <div>
            <p className="text-sm font-semibold text-brand-900">
              Certifications are verifiable
            </p>
            <p className="mt-1 text-sm text-brand-400">
              NetSuite certifications are listed publicly on the{" "}
              <Link
                href="https://education.oracle.com/oracle-netsuite-certification"
                className="text-accent hover:underline"
                target="_blank"
                rel="noopener"
              >
                Oracle certification portal
              </Link>
              . Ask any freelancer or firm for their certification number and verify it. Self-declared credentials are common; verified ones are not.
            </p>
          </div>
        </div>

        {/* Related reading */}
        <div className="mt-10 rounded-2xl border border-brand-100 bg-brand-50/30 p-5 sm:p-6">
          <p className="text-sm font-semibold text-brand-900 mb-3">Related guides</p>
          <ul className="space-y-2.5">
            <li className="text-sm text-brand-400">
              <Link href="/hire-netsuite-developer" className="text-accent hover:underline">
                Hire a NetSuite Developer
              </Link>{" "}
              covers what to look for in any NetSuite developer, skills to evaluate, and questions to ask before committing.
            </li>
            <li className="text-sm text-brand-400">
              <Link href="/netsuite-implementation-partner-vs-managed-support" className="text-accent hover:underline">
                NetSuite Implementation Partner vs. Managed Support
              </Link>{" "}
              explains the difference between a one-time implementation and an ongoing managed services engagement.
            </li>
            <li className="text-sm text-brand-400">
              <Link href="/netsuite-post-go-live-support" className="text-accent hover:underline">
                Post-Go-Live NetSuite Support
              </Link>{" "}
              describes what ongoing support looks like in practice, including scope, response, and how work is prioritized.
            </li>
          </ul>
        </div>

        <ServiceFaqSection items={FAQ} />

      </div>
    </main>
  );
}

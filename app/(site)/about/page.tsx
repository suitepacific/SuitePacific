import type { Metadata } from "next";
import Link from "next/link";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { BreadcrumbJsonLd, OrganizationJsonLd } from "@/components/seo/JsonLd";
import { LeadFormLight } from "@/components/sections/LeadFormLight";
import { ABOUT_INTRO, CONTACT_EMAIL, SITE_URL } from "@/lib/content";
import { ogImages } from "@/lib/og";
import { getCaseStudy } from "@/lib/case-studies";

const TITLE = "About SuitePacific: Post-Go-Live NetSuite Support Firm";
const DESCRIPTION =
  "SuitePacific supports companies already live on NetSuite: SuiteScript, workflows, integrations and admin, on retainers from $799/month or fixed-scope projects.";
const CLUTCH_URL = "https://clutch.co/profile/suitepacific";
const MANIFEST_URL = "https://themanifest.com/company/suitepacific";

const FACTS: [string, React.ReactNode][] = [
  ["Company", "SuitePacific, LLC, a Wyoming limited liability company"],
  ["Founded", "2025"],
  ["Focus", "Ongoing support and development for companies already live on NetSuite"],
  ["Services", "SuiteScript development, SuiteFlow workflows, integrations, saved searches and dashboards, Advanced PDF templates, NetSuite administration"],
  ["Ways to work", "Monthly retainer plans, or fixed-scope projects with no retainer"],
  ["Retainer plans", "Care $799/month (10 hours), Care Plus $1,499/month (20 hours), Care Pro $2,499/month (35 hours)"],
  ["Retainer terms", "Three-month minimum, then month-to-month. Unused hours do not roll over."],
  ["Projects", "Integrations, workflow builds, SuiteScript migrations, data imports and technical remediation. Scoped in writing and quoted at a fixed price before work starts."],
  ["Clients served", "United States, United Kingdom, Australia"],
  ["Team certifications", "Oracle NetSuite SuiteCloud Developer II, Oracle NetSuite Administrator Professional, Celigo Mastery Level 4"],
  ["Own tools", "SuiteCompare (environment script comparison) and Import Doctor (CSV import validation)"],
  [
    "Reviews",
    <>
      <a href={CLUTCH_URL} className="text-accent hover:underline" target="_blank" rel="noopener noreferrer">Clutch</a>
      {" and "}
      <a href={MANIFEST_URL} className="text-accent hover:underline" target="_blank" rel="noopener noreferrer">The Manifest</a>
    </>,
  ],
  ["Contact", <a key="c" href={`mailto:${CONTACT_EMAIL}`} className="text-accent hover:underline">{CONTACT_EMAIL}</a>],
];

const WORK_EXAMPLES = ["partner-replacement-onboarding", "managed-support-retainer", "celigo-integration-failure-diagnosis"]
  .map((slug) => getCaseStudy(slug))
  .filter((cs) => cs !== undefined);

const STEPS = [
  { title: "Understand your requirements", body: "A free consultation to discuss what is not working in your NetSuite account and what matters most." },
  { title: "Review your environment", body: "With the access you approve, we review the relevant configuration, scripts, workflows, integrations or reporting." },
  { title: "Agree scope and engagement", body: "We recommend a practical fix and agree priorities and scope before any work starts, either under a monthly retainer or as a fixed-scope project with a fixed quote." },
  { title: "Build, test and support", body: "Changes are built and tested in a sandbox account where one is available, deployed at an agreed time, and supported afterwards." },
];

const FIT = [
  { good: "Your company is already live on NetSuite", poor: "You need NetSuite implemented from scratch" },
  { good: "You need ongoing development and administration without a full-time hire", poor: "You need a large team to run a new implementation project" },
  { good: "You want month-to-month terms after a three-month start", poor: "You are still choosing between ERP vendors" },
  { good: "You have one defined build, such as an integration or migration, and want a fixed quote", poor: "You want open-ended project work with no agreed scope" },
];

export const metadata: Metadata = {
  title: { absolute: TITLE },
  description: DESCRIPTION,
  alternates: { canonical: "/about" },
  openGraph: {
    title: TITLE,
    description: DESCRIPTION,
    url: `${SITE_URL}/about`,
    type: "website",
    images: ogImages("About SuitePacific", "Company"),
  },
};

export default function AboutPage() {
  return (
    <main className="pt-32 pb-24 sm:pt-40 sm:pb-32">
      <BreadcrumbJsonLd
        items={[
          { name: "Home", url: SITE_URL },
          { name: "About SuitePacific", url: `${SITE_URL}/about` },
        ]}
      />
      <OrganizationJsonLd />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "AboutPage",
            url: `${SITE_URL}/about`,
            name: TITLE,
            description: DESCRIPTION,
            mainEntity: { "@id": `${SITE_URL}/#organization` },
            dateModified: "2026-11-10T00:00:00+00:00",
          }),
        }}
      />

      <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
        <SectionHeading as="h1" eyebrow="Company" title="About SuitePacific" subtitle="Going live is just the beginning. SuitePacific helps businesses get more from NetSuite through ongoing technical support, custom development, reporting, integrations and practical improvements." align="left" />
        <p className="mt-1 text-xs text-brand-300">Last updated November 2026</p>

        <div data-section="quick-answer" className="mt-6 rounded-2xl border-l-4 border-accent bg-brand-50/50 p-5">
          <p className="text-xs font-semibold uppercase tracking-wide text-accent mb-2">Quick answer</p>
          <p className="text-sm text-brand-700 leading-relaxed">
            SuitePacific is a boutique NetSuite consulting firm that works only with companies already live on NetSuite.
            It provides SuiteScript development, SuiteFlow workflow automation, integration maintenance, saved searches
            and dashboards, Advanced PDF templates and NetSuite administration, either through monthly retainer plans or
            as fixed-scope projects. Retainers start at $799 per month for 10 hours (Care), $1,499 for 20 hours (Care
            Plus) and $2,499 for 35 hours (Care Pro), with a three-month minimum and month-to-month terms after that.
            Projects, such as a new integration, a SuiteScript migration or a data import, are quoted at a fixed price
            after a scoping call and need no retainer. SuitePacific is operated by SuitePacific, LLC, a Wyoming limited
            liability company founded in 2025, and works with clients in the United States, the United Kingdom and
            Australia. Its team holds Oracle NetSuite SuiteCloud Developer II and Administrator Professional
            certifications and Celigo Mastery Level 4. It does not implement NetSuite from scratch.
          </p>
        </div>

        <div className="mt-6 rounded-2xl border border-brand-100 bg-white p-5 shadow-soft">
          <p className="text-sm text-brand-600 mb-3">Request a free consultation: tell us what is not working in your NetSuite account.</p>
          <LeadFormLight />
        </div>

        <section data-section="facts" className="mt-14">
          <h2 className="text-xl font-semibold text-brand-900">What are the key facts about SuitePacific?</h2>
          <div className="mt-5 overflow-x-auto rounded-2xl border border-brand-100">
            <table className="w-full text-sm">
              <tbody>
                {FACTS.map(([k, v]) => (
                  <tr key={k} className="border-t border-brand-100 first:border-t-0 align-top">
                    <th scope="row" className="w-40 bg-brand-50/60 px-4 py-3 text-left font-semibold text-brand-900">{k}</th>
                    <td className="px-4 py-3 text-brand-600">{v}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        <section data-section="why" className="mt-14">
          <h2 className="text-xl font-semibold text-brand-900">Why does SuitePacific focus only on post-go-live work?</h2>
          <div className="mt-4 space-y-4 text-brand-600 leading-relaxed">
            {ABOUT_INTRO.paragraphs.map((p) => (
              <p key={p}>{p}</p>
            ))}
          </div>
        </section>

        <section data-section="work" className="mt-14">
          <h2 className="text-xl font-semibold text-brand-900">What has SuitePacific worked on?</h2>
          <p className="mt-2 text-sm text-brand-400">Three examples from client accounts, with client names withheld.</p>
          <div className="mt-5 grid grid-cols-1 gap-4">
            {WORK_EXAMPLES.map((cs) => (
              <Link
                key={cs.slug}
                href={`/case-studies/${cs.slug}`}
                className="block rounded-2xl border border-brand-100 bg-white p-5 shadow-soft hover:border-accent/40 transition-colors"
              >
                <p className="font-semibold text-brand-900">{cs.title}</p>
                <p className="mt-3 text-xs font-semibold uppercase tracking-wide text-brand-400">The problem</p>
                <p className="mt-1 text-sm text-brand-600 leading-relaxed">{cs.cardChallenge}</p>
                <p className="mt-3 text-xs font-semibold uppercase tracking-wide text-accent">What changed</p>
                <p className="mt-1 text-sm text-brand-600 leading-relaxed">{cs.cardOutcome}</p>
                <p className="mt-3 text-xs text-accent">Read the case study</p>
              </Link>
            ))}
          </div>
          <p className="mt-4 text-sm">
            <Link href="/case-studies" className="text-accent hover:underline">See all case studies</Link>
          </p>
        </section>

        <section data-section="how-we-work" className="mt-14">
          <h2 className="text-xl font-semibold text-brand-900">How does working with SuitePacific work?</h2>
          <ol className="mt-5 grid grid-cols-1 gap-4">
            {STEPS.map((step, i) => (
              <li key={step.title} className="flex gap-4 rounded-2xl border border-brand-100 bg-white p-5">
                <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-brand-50 text-sm font-semibold text-brand-900 tabular-nums">
                  {i + 1}
                </span>
                <div>
                  <p className="font-semibold text-brand-900">{step.title}</p>
                  <p className="mt-1 text-sm text-brand-600 leading-relaxed">{step.body}</p>
                </div>
              </li>
            ))}
          </ol>
        </section>

        <section data-section="fit" className="mt-14">
          <h2 className="text-xl font-semibold text-brand-900">Who is SuitePacific a good fit for?</h2>
          <div className="mt-5 overflow-x-auto rounded-2xl border border-brand-100">
            <table className="w-full text-sm">
              <thead>
                <tr className="bg-brand-50 text-left">
                  <th className="px-4 py-3 font-semibold text-brand-900">A good fit if</th>
                  <th className="px-4 py-3 font-semibold text-brand-900">Probably not a fit if</th>
                </tr>
              </thead>
              <tbody>
                {FIT.map((row) => (
                  <tr key={row.good} className="border-t border-brand-100 align-top">
                    <td className="px-4 py-3 text-brand-600">{row.good}</td>
                    <td className="px-4 py-3 text-brand-600">{row.poor}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        <section data-section="reviews" className="mt-14">
          <h2 className="text-xl font-semibold text-brand-900">Where can I read reviews of SuitePacific?</h2>
          <p className="mt-4 text-brand-600 leading-relaxed">
            Independent client reviews of SuitePacific are published on{" "}
            <a href={CLUTCH_URL} className="text-accent hover:underline" target="_blank" rel="noopener noreferrer">SuitePacific&apos;s Clutch profile</a>{" "}
            and{" "}
            <a href={MANIFEST_URL} className="text-accent hover:underline" target="_blank" rel="noopener noreferrer">The Manifest</a>.
            Clutch verifies each review with the client before publishing it.
          </p>
        </section>

        <section data-section="related" className="mt-14 rounded-2xl border border-brand-100 bg-brand-50/30 p-5 sm:p-6">
          <h2 className="text-sm font-semibold text-brand-900 mb-3">Learn more</h2>
          <ul className="space-y-2.5 text-sm text-brand-400">
            <li><Link href="/netsuite-care" className="text-accent hover:underline">NetSuite Care plans</Link> explains what each plan includes.</li>
            <li><Link href="/netsuite-managed-services-pricing" className="text-accent hover:underline">NetSuite managed services pricing</Link> compares plan costs with hiring and with other support models.</li>
            <li><Link href="/netsuite-post-go-live-support" className="text-accent hover:underline">NetSuite post-go-live support</Link> covers the services in detail.</li>
            <li><Link href="/netsuite-project-consulting" className="text-accent hover:underline">NetSuite project consulting</Link> explains how fixed-scope projects are scoped, quoted and delivered.</li>
            <li><Link href="/case-studies" className="text-accent hover:underline">Case studies</Link> describe past client work.</li>
          </ul>
        </section>

        <div className="mt-14 rounded-2xl border border-brand-100 bg-white p-5 shadow-soft">
          <p className="text-base font-semibold text-brand-900">Request a free NetSuite consultation</p>
          <p className="mt-1 mb-4 text-sm text-brand-600">
            Tell us what&apos;s not working in your NetSuite account. We&apos;ll discuss your priorities and help identify the next
            steps, and we reply within one business day.
          </p>
          <LeadFormLight />
        </div>
      </div>
    </main>
  );
}

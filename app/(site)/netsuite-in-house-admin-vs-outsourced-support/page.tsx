import type { Metadata } from "next";
import Link from "next/link";
import { CheckCircle2, XCircle, Users, Briefcase } from "lucide-react";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Card } from "@/components/ui/Card";
import { IconBadge } from "@/components/ui/IconBadge";
import { BreadcrumbJsonLd, FaqJsonLd, ServiceJsonLd, OrganizationJsonLd } from "@/components/seo/JsonLd";
import { ServiceFaqSection } from "@/components/ui/ServiceFaqSection";
import { LeadFormLight } from "@/components/sections/LeadFormLight";
import { SITE_URL } from "@/lib/content";

const COMPARISON_ROWS = [
  { factor: "Annual cost", inhouse: "$90,000–$130,000 (salary + benefits + taxes)", outsourced: "$9,588–$29,988 ($799–$2,499/month)" },
  { factor: "Certification level", inhouse: "Administrator Professional (typical)", outsourced: "SuiteCloud Developer II + Administrator Professional" },
  { factor: "SuiteScript capability", inhouse: "Limited (most admins are not developers)", outsourced: "Full development capability" },
  { factor: "Availability", inhouse: "Business hours; PTO and leave gaps", outsourced: "Month-to-month, no gaps" },
  { factor: "Response time", inhouse: "Same day (typically)", outsourced: "1 business day (SuitePacific standard)" },
  { factor: "Retention risk", inhouse: "High (replacement takes 3–6 months)", outsourced: "None" },
  { factor: "Month-to-month flexibility", inhouse: "No (full-time hire)", outsourced: "Yes (after 3-month minimum)" },
  { factor: "Best for", inhouse: "High daily admin volume, user support", outsourced: "Development + admin, release testing, integrations" },
];

const INHOUSE_STRENGTHS = [
  {
    icon: Users,
    title: "Deep familiarity with the account",
    description:
      "An in-house admin builds institutional knowledge over time. They know the history of configuration decisions, understand the workflows, and have established relationships with department heads.",
  },
  {
    icon: Users,
    title: "High-volume daily administration",
    description:
      "User provisioning, password resets, basic configuration changes, and report requests throughout the day are well-suited to a dedicated in-house resource who is available on demand.",
  },
  {
    icon: Users,
    title: "On-site presence for complex rollouts",
    description:
      "Accounts going through major module additions or user training programs benefit from a full-time administrator who can be physically present and available throughout the day.",
  },
];

const OUTSOURCED_STRENGTHS = [
  {
    icon: Briefcase,
    title: "SuiteScript development included",
    description:
      "Most outsourced NetSuite specialists at the SuitePacific level carry SuiteCloud Developer II certification. SuiteScript builds, integrations, and custom automation are included in the same engagement, with no separate developer hire.",
  },
  {
    icon: Briefcase,
    title: "No hiring, onboarding, or retention risk",
    description:
      "The most common disruption for live NetSuite accounts is an admin leaving. Recruiting a replacement typically takes 3 to 6 months. An outsourced specialist carries no retention risk and no ramp-up gap.",
  },
  {
    icon: Briefcase,
    title: "Release testing and ongoing development",
    description:
      "NetSuite releases twice a year. An outsourced specialist tests your scripts in Sandbox before each release window, maintains documentation, and handles ongoing development projects without additional staffing.",
  },
  {
    icon: Briefcase,
    title: "Month-to-month flexibility",
    description:
      "SuitePacific operates on month-to-month terms after a three-month minimum. Scale hours up or down as the account&apos;s workload changes without managing headcount.",
  },
];

const FAQ = [
  {
    question: "What does a NetSuite administrator typically cost?",
    answer:
      "A full-time NetSuite administrator in the United States typically earns $75,000 to $100,000 in base salary. When you add employer payroll taxes, health insurance, 401(k) contributions, PTO, and other benefits, the fully loaded cost is $90,000 to $130,000 per year. Some markets and larger organizations pay more. This does not include the cost of a separate developer if your account requires SuiteScript work.",
  },
  {
    question: "Can an outsourced firm replace a full-time NetSuite admin?",
    answer:
      "For accounts that need SuiteScript development, integrations, and technical work alongside administration, an outsourced specialist often provides more capability at lower cost than a full-time hire. For accounts with very high daily admin volume, where someone is needed on-demand throughout the day for user support and minor configuration requests, a part-time or junior admin combined with outsourced specialist access may be a better fit than either option alone.",
  },
  {
    question: "What tasks need a developer vs. an admin?",
    answer:
      "Administration covers: user management, saved search and dashboard builds, custom field and form configuration, SuiteFlow workflow setup, role and permission management, and standard report building. Development covers: SuiteScript (User Event, Client, Scheduled, Map-Reduce scripts), Suitelets, Restlets, custom integrations with external systems, and SuiteQL for complex reporting. Most in-house administrators can handle administration tasks but are not trained SuiteScript developers.",
  },
  {
    question: "What is SuiteCloud Developer II certification?",
    answer:
      "SuiteCloud Developer II is Oracle NetSuite&apos;s advanced developer certification. It validates proficiency in SuiteScript 2.x, including User Event, Client, Scheduled, Map-Reduce, Suitelet, and Restlet scripts, as well as SuiteCloud development tools. It is a higher certification than the standard Developer certification and is held by a small percentage of NetSuite professionals. SuitePacific holds both SuiteCloud Developer II and Administrator Professional certifications.",
  },
  {
    question: "How does SuitePacific&apos;s pricing compare to a full-time hire?",
    answer:
      "SuitePacific plans start at $799 per month (10 hours), $1,499 per month (20 hours), and $2,499 per month (35 hours). At the 35-hour plan, the annual cost is $29,988, compared to $90,000 to $130,000 for a full-time hire. The outsourced plan includes developer-level capability; a full-time admin hire typically does not.",
  },
  {
    question: "What happens when the NetSuite admin leaves?",
    answer:
      "When a full-time NetSuite admin leaves, accounts typically face a 3 to 6 month gap while recruiting and onboarding a replacement. During that period, development projects stall, release testing may be skipped, and institutional knowledge walks out the door. SuitePacific accounts are not exposed to this risk. Documentation and process continuity are maintained regardless of any staffing changes on either side.",
  },
];

export const metadata: Metadata = {
  title: "NetSuite: In-House Admin vs. Outsourced Specialist",
  description:
    "Compare the real cost and capability of a full-time NetSuite administrator versus outsourced specialist support for live NetSuite accounts. Updated for 2026.",
  alternates: { canonical: "/netsuite-in-house-admin-vs-outsourced-support" },
  openGraph: {
    title: "NetSuite: In-House Admin vs. Outsourced Specialist",
    description:
      "Compare the real cost and capability of a full-time NetSuite administrator versus outsourced specialist support for live NetSuite accounts. Updated for 2026.",
    url: `${SITE_URL}/netsuite-in-house-admin-vs-outsourced-support`,
    type: "website",
    images: [{ url: `${SITE_URL}/og-default.png`, width: 1200, height: 630 }],
  },
};

export default function InHouseAdminVsOutsourcedPage() {
  return (
    <main className="pt-32 pb-24 sm:pt-40 sm:pb-32">
      <BreadcrumbJsonLd
        items={[
          { name: "Home", url: SITE_URL },
          { name: "In-House Admin vs. Outsourced Support", url: `${SITE_URL}/netsuite-in-house-admin-vs-outsourced-support` },
        ]}
      />
      <FaqJsonLd items={FAQ} />
      <ServiceJsonLd
        name="NetSuite Outsourced Specialist Support"
        description="Outsourced NetSuite administrator and developer support for live accounts: SuiteScript development, configuration, release testing, and ongoing administration on month-to-month terms."
        url={`${SITE_URL}/netsuite-in-house-admin-vs-outsourced-support`}
        serviceType="NetSuite Managed Support"
        offers={[
          { name: "Care", price: 799, description: "10 hrs/month: administration, SuiteScript builds, configuration, and release testing. Month-to-month after 3-month minimum." },
          { name: "Care Plus", price: 1499, description: "20 hrs/month: broader administration and development support. Month-to-month." },
          { name: "Care Pro", price: 2499, description: "35 hrs/month: full administration and development support including integrations. Month-to-month." },
        ]}
      />
      <OrganizationJsonLd />

      <div className="mx-auto max-w-3xl px-6 lg:px-8">
        <SectionHeading
          as="h1"
          eyebrow="NetSuite Support Model"
          title="In-House NetSuite Admin vs. Outsourced Specialist: What Live Accounts Actually Cost"
          subtitle="A practical comparison of in-house NetSuite administrator hires versus outsourced specialist support, covering cost, capability, and retention risk for live NetSuite accounts."
          align="left"
        />

        <div className="mt-6 rounded-2xl border border-brand-100 bg-white p-5 shadow-soft">
          <p className="text-sm text-brand-600 mb-3">Evaluating whether to hire or outsource your NetSuite support? Tell us what your account currently needs.</p>
          <LeadFormLight />
        </div>
        <p className="mt-3 text-xs text-brand-400">NetSuite-Certified · Post-go-live specialist · Sandbox-first development · Month-to-month</p>
        <p className="mt-2 text-xs text-brand-300"><time dateTime="2026-10">Published October 2026</time></p>

        <div className="mt-6 rounded-2xl border border-brand-100 bg-brand-50/40 p-5">
          <p className="text-xs font-semibold uppercase tracking-wide text-accent mb-2">Quick answer</p>
          <p className="text-sm text-brand-700 leading-relaxed">
            In-house NetSuite administrators and outsourced specialists serve different account needs at different cost points.
            A full-time NetSuite admin typically costs $90,000 to $130,000 per year in total compensation, holds the Administrator
            Professional certification, and handles day-to-day tasks: user management, saved search builds, basic configuration,
            and report maintenance. Most admins are not SuiteScript developers, so accounts that need scripted automation require
            either a separate developer or an external firm. An outsourced specialist like SuitePacific costs $799 to $2,499 per month,
            covers both administrator-level work and SuiteScript development, and carries no hiring, onboarding, or retention risk.
            The right choice depends on workload and technical requirements. Accounts with high daily admin volume benefit from an
            in-house hire. Accounts that need ongoing SuiteScript development, release testing, integration work, or a single point
            of contact for both admin and development typically get better value from an outsourced specialist on month-to-month terms.
          </p>
        </div>

        {/* Comparison table */}
        <div className="mt-14">
          <h2 className="text-lg font-semibold text-brand-900 mb-2">In-house admin vs. outsourced specialist: side by side</h2>
          <p className="text-sm text-brand-400 mb-5">
            The table below compares the two models across cost, capability, and flexibility for live NetSuite accounts.
          </p>
          <div className="overflow-x-auto rounded-2xl border border-brand-100">
            <table className="w-full text-sm min-w-[520px]">
              <thead>
                <tr className="border-b border-brand-100 bg-brand-50/50">
                  <th className="text-left p-4 font-semibold text-brand-900">Factor</th>
                  <th className="text-left p-4 font-semibold text-brand-900">In-house admin</th>
                  <th className="text-left p-4 font-semibold text-brand-900">Outsourced specialist</th>
                </tr>
              </thead>
              <tbody>
                {COMPARISON_ROWS.map((row, i) => (
                  <tr key={row.factor} className={i < COMPARISON_ROWS.length - 1 ? "border-b border-brand-100" : ""}>
                    <td className="p-4 font-medium text-brand-700 align-top whitespace-nowrap">{row.factor}</td>
                    <td className="p-4 text-brand-400 align-top text-[13px]">{row.inhouse}</td>
                    <td className="p-4 text-brand-400 align-top text-[13px]">{row.outsourced}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* When in-house wins */}
        <div className="mt-14">
          <h2 className="text-lg font-semibold text-brand-900 mb-2">When does an in-house admin make sense?</h2>
          <p className="text-sm text-brand-400 mb-6">
            In-house administrators work well when the primary need is high-volume daily support: on-demand user management,
            constant small configuration requests, and heavy end-user training.
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
            {INHOUSE_STRENGTHS.map((item) => (
              <Card key={item.title} className="p-5 flex flex-col gap-3">
                <IconBadge icon={item.icon} />
                <h3 className="font-semibold text-brand-900 text-sm">{item.title}</h3>
                <p className="text-sm text-brand-400">{item.description}</p>
              </Card>
            ))}
          </div>
          <div className="mt-5 rounded-2xl border border-brand-100 bg-brand-50/30 p-5">
            <p className="text-sm font-semibold text-brand-900 mb-2">Gaps to plan for with an in-house hire</p>
            <ul className="space-y-1.5 text-sm text-brand-400">
              <li className="flex items-start gap-2"><XCircle className="w-4 h-4 text-red-400 mt-0.5 shrink-0" /> Most admins cannot write SuiteScript; separate developer needed for automation</li>
              <li className="flex items-start gap-2"><XCircle className="w-4 h-4 text-red-400 mt-0.5 shrink-0" /> Single point of failure when they leave (3–6 months to replace)</li>
              <li className="flex items-start gap-2"><XCircle className="w-4 h-4 text-red-400 mt-0.5 shrink-0" /> PTO, sick leave, and offboarding create gaps in coverage</li>
              <li className="flex items-start gap-2"><XCircle className="w-4 h-4 text-red-400 mt-0.5 shrink-0" /> Release testing often gets skipped without developer skills to assess script risk</li>
            </ul>
          </div>
        </div>

        {/* When outsourced wins */}
        <div className="mt-14">
          <h2 className="text-lg font-semibold text-brand-900 mb-2">When does outsourced specialist support make sense?</h2>
          <p className="text-sm text-brand-400 mb-6">
            Outsourced specialist support works best when the account needs development capability alongside administration,
            or when retention risk and cost efficiency are priorities.
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            {OUTSOURCED_STRENGTHS.map((item) => (
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

        {/* Decision framework */}
        <div className="mt-14 rounded-2xl border border-brand-100 bg-brand-50/30 p-5 sm:p-6">
          <h2 className="text-base font-semibold text-brand-900 mb-3">Decision framework: which model fits your account?</h2>
          <ul className="space-y-2.5">
            <li className="text-sm text-brand-400">
              <span className="font-medium text-brand-700">High daily admin volume with minimal development:</span>{" "}
              Consider a part-time or junior in-house admin for user support, combined with a specialist retainer for technical work and release testing.
            </li>
            <li className="text-sm text-brand-400">
              <span className="font-medium text-brand-700">Active SuiteScript development plus admin:</span>{" "}
              An outsourced specialist firm typically delivers better cost and technical depth than a separate admin hire plus developer hire.
            </li>
            <li className="text-sm text-brand-400">
              <span className="font-medium text-brand-700">Post-go-live optimization, integrations, or technical debt:</span>{" "}
              Outsourced specialist is the right model. Most in-house admins are not equipped for this scope.
            </li>
            <li className="text-sm text-brand-400">
              <span className="font-medium text-brand-700">Admin just left or leaving soon:</span>{" "}
              An outsourced specialist can step in immediately with no ramp-up, while the account evaluates whether to hire again.
            </li>
          </ul>
        </div>

        {/* Related reading */}
        <div className="mt-10 rounded-2xl border border-brand-100 bg-brand-50/30 p-5 sm:p-6">
          <p className="text-sm font-semibold text-brand-900 mb-3">Related reading</p>
          <ul className="space-y-2.5">
            <li className="text-sm text-brand-400">
              <Link href="/netsuite-care" className="text-accent hover:underline">
                NetSuite Care plans
              </Link>{" "}
              covers SuitePacific&apos;s ongoing support options starting at $799 per month.
            </li>
            <li className="text-sm text-brand-400">
              <Link href="/netsuite-consulting-services" className="text-accent hover:underline">
                NetSuite consulting services
              </Link>{" "}
              covers the full scope of what SuitePacific does for live NetSuite accounts.
            </li>
            <li className="text-sm text-brand-400">
              <Link href="/netsuite-post-go-live-support" className="text-accent hover:underline">
                NetSuite post-go-live support
              </Link>{" "}
              covers the specific needs of accounts that are live but not yet optimized.
            </li>
          </ul>
        </div>

        <div className="mt-10 rounded-2xl border border-brand-100 bg-white p-5 shadow-soft">
          <p className="text-sm font-semibold text-brand-900 mb-1">Evaluating your NetSuite support model?</p>
          <p className="text-sm text-brand-400 mb-4">
            Tell us what your account currently needs: active development projects, release testing, daily admin, or a combination. We will give you a direct assessment of what model makes sense.
          </p>
          <LeadFormLight />
        </div>

        <ServiceFaqSection items={FAQ} />

        <div className="mt-10 rounded-2xl border border-brand-100 bg-white p-5 shadow-soft">
          <p className="text-sm font-semibold text-brand-900 mb-1">Ready to talk through your support options?</p>
          <p className="text-sm text-brand-400 mb-4">
            Describe your current situation and what the account needs. We will give you an honest assessment of whether outsourced support fits, and what it would cover.
          </p>
          <LeadFormLight />
        </div>
      </div>
    </main>
  );
}

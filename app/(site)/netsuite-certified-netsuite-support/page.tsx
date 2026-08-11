import type { Metadata } from "next";
import Link from "next/link";
import {
  ShieldCheck,
  Award,
  Users,
  Clock,
  CheckCircle2,
} from "lucide-react";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Card } from "@/components/ui/Card";
import { IconBadge } from "@/components/ui/IconBadge";
import { BreadcrumbJsonLd, FaqJsonLd, ServiceJsonLd } from "@/components/seo/JsonLd";
import { ServiceFaqSection } from "@/components/ui/ServiceFaqSection";
import { LeadFormLight } from "@/components/sections/LeadFormLight";
import { SITE_URL } from "@/lib/content";

const CERTIFICATIONS = [
  {
    icon: Award,
    title: "NetSuite SuiteCloud Developer II",
    description:
      "Covers SuiteScript 2.x, SuiteFlow, SuiteBuilder, and the NetSuite development platform. This is the credential that verifies technical depth for custom scripting and integration work.",
  },
  {
    icon: ShieldCheck,
    title: "NetSuite Administrator Professional",
    description:
      "Covers configuration, setup, user management, saved searches, workflows, and platform administration. The credential that verifies configuration expertise beyond basic navigation.",
  },
];

const WHAT_CERTIFIED_MEANS = [
  {
    icon: CheckCircle2,
    title: "Tested knowledge, not just experience",
    description:
      "Certifications require passing Oracle-administered exams. The credential proves that someone has demonstrated platform knowledge against a defined standard, not just that they have spent time in the system.",
  },
  {
    icon: CheckCircle2,
    title: "Current with the platform",
    description:
      "Certifications require renewal as NetSuite releases new versions. A current certification means the consultant has kept pace with platform changes, not just accumulated knowledge from a version two releases ago.",
  },
  {
    icon: CheckCircle2,
    title: "Separation of specializations",
    description:
      "SuiteCloud Developer II and Administrator Professional are different credentials covering different parts of the platform. When an engagement requires both development and administration, both credentials should be present.",
  },
];

const WHY_SP = [
  {
    icon: ShieldCheck,
    title: "SuiteCloud Developer II",
    description:
      "Certified for SuiteScript, SuiteFlow, and the full NetSuite development platform. Development work in your account is done by someone who has passed Oracle's technical certification exam.",
  },
  {
    icon: Award,
    title: "Administrator Professional",
    description:
      "Certified for configuration, administration, and platform setup. Configuration changes are done by someone who has passed Oracle's administration certification exam.",
  },
  {
    icon: Users,
    title: "Direct Access",
    description:
      "You communicate with the certified consultant doing the work. Not a sales contact who hands work to an unknown resource. The credential and the person are the same.",
  },
  {
    icon: Clock,
    title: "Month-to-Month",
    description:
      "No annual contract required. Engagements run month-to-month so the arrangement scales with what the account actually needs.",
  },
];

const CREDENTIAL_COMPARISON = [
  {
    aspect: "What it covers",
    dev2: "SuiteScript 2.x development, SuiteFlow, SuiteBuilder, and the technical development platform",
    admin: "Configuration, workflows, user management, saved searches, and platform administration",
  },
  {
    aspect: "Exam type",
    dev2: "Oracle-administered technical development exam",
    admin: "Oracle-administered administration and configuration exam",
  },
  {
    aspect: "Relevant for",
    dev2: "Custom scripting, integrations, Suitelets, RESTlets, Map/Reduce scripts",
    admin: "Role setup, form layouts, custom fields, workflow configuration, access management",
  },
  {
    aspect: "Renewal required",
    dev2: "Yes, as the platform evolves across releases",
    admin: "Yes, as the platform evolves across releases",
  },
  {
    aspect: "When you need it",
    dev2: "When the engagement includes any SuiteScript development or integration work",
    admin: "When the engagement includes configuration, administration, or workflow changes",
  },
];

const FAQ = [
  {
    question: "What NetSuite certifications should a support firm have?",
    answer:
      "For a support firm covering both development and administration work, look for two certifications: NetSuite SuiteCloud Developer II and NetSuite Administrator Professional. SuiteCloud Developer II covers SuiteScript, SuiteFlow, and the technical development layer. Administrator Professional covers configuration, workflows, user management, and platform administration. Both are Oracle-administered exams; both require renewal as the platform evolves.",
  },
  {
    question: "How do you verify that a firm's certifications are current?",
    answer:
      "Ask for the credential holder's name and request that they share the certification record from Oracle's Learning platform or NetSuite's official certification program. A current certification will show an active status and a recent renewal date. Certifications that have not been renewed may not reflect the current state of the platform.",
  },
  {
    question: "Does certification guarantee quality of work?",
    answer:
      "Certification verifies platform knowledge against Oracle's defined standard. It is a necessary baseline, not a complete guarantee. A certified consultant who has worked across diverse NetSuite accounts accumulates practical judgment that complements the credential. Certification is a floor; account-specific experience builds on it.",
  },
  {
    question: "Are there other NetSuite credentials beyond Developer and Administrator?",
    answer:
      "Yes. Oracle offers additional credentials including ERP Consultant for functional areas (Finance, Procurement, Manufacturing), SuiteCommerce for the ecommerce platform, and solution provider specializations. For technical support and administration of a standard NetSuite account, SuiteCloud Developer II and Administrator Professional are the most directly relevant credentials.",
  },
  {
    question: "What is the difference between a NetSuite partner certification and an individual certification?",
    answer:
      "Partner certifications (Solution Provider, BPO) are status levels Oracle grants to firms based on revenue thresholds and headcount requirements. Individual certifications (SuiteCloud Developer II, Administrator Professional) are credentials granted to specific people who pass exams. When evaluating support quality, individual certifications are the relevant credential because they verify that a specific person has demonstrated platform knowledge.",
  },
];

export const metadata: Metadata = {
  title: "Certified NetSuite Support: SuiteCloud Developer II",
  description:
    "NetSuite support from consultants holding SuiteCloud Developer II and Administrator Professional certifications. Verified platform credentials for both development and administration.",
  alternates: { canonical: "/netsuite-certified-netsuite-support" },
  openGraph: {
    title: "Certified NetSuite Support: SuiteCloud Developer II",
    description:
      "NetSuite support from consultants holding SuiteCloud Developer II and Administrator Professional certifications. Verified platform credentials for both development and administration.",
    url: `${SITE_URL}/netsuite-certified-netsuite-support`,
    type: "website",
    images: [{ url: `${SITE_URL}/og-default.png`, width: 1200, height: 630 }],
  },
};

export default function CertifiedNetSuiteSupportPage() {
  return (
    <main className="pt-32 pb-24 sm:pt-40 sm:pb-32">
      <BreadcrumbJsonLd
        items={[
          { name: "Home", url: SITE_URL },
          { name: "Certified NetSuite Support", url: `${SITE_URL}/netsuite-certified-netsuite-support` },
        ]}
      />
      <FaqJsonLd items={FAQ} />
      <ServiceJsonLd
        name="Certified NetSuite Support"
        description="NetSuite support and development from consultants holding SuiteCloud Developer II and Administrator Professional certifications."
        url={`${SITE_URL}/netsuite-certified-netsuite-support`}
        serviceType="NetSuite Support"
      />

      <div className="mx-auto max-w-3xl px-6 lg:px-8">
        <SectionHeading
          as="h1"
          eyebrow="Certified Support"
          title="NetSuite Support from Certified Consultants"
          subtitle="Certification verifies that platform knowledge was tested against Oracle's defined standard. It is the baseline for knowing whether the person working on your account actually knows the system."
          align="left"
        />

        <div className="mt-6 rounded-2xl border border-brand-100 bg-white p-5 shadow-soft">
          <LeadFormLight />
        </div>
        <p className="mt-3 text-xs text-brand-400">SuiteCloud Developer II · Administrator Professional · Direct access · Month-to-month</p>

        <p className="mt-3 text-xs text-brand-300">Last updated August 2026</p>

        <div className="mt-6 rounded-2xl border-l-4 border-accent bg-brand-50/50 p-5">
          <p className="text-xs font-semibold uppercase tracking-wide text-accent mb-2">Quick answer</p>
          <p className="text-sm text-brand-700 leading-relaxed">
            NetSuite certified support means the consultant working on your account holds
            Oracle&apos;s official platform credentials. The two credentials directly relevant to
            support and development work are: NetSuite SuiteCloud Developer II, which covers
            SuiteScript 2.x, SuiteFlow, and the technical development platform; and NetSuite
            Administrator Professional, which covers configuration, workflows, user management,
            and platform administration. Both are Oracle-administered exams that test knowledge
            against a defined standard and require renewal as the platform evolves. When evaluating
            a firm, the relevant question is whether the consultant actually doing the work in your
            account holds these credentials, not whether any employee at the firm holds them.
            Self-declared experience is not the same as a passed credential exam. SuitePacific
            holds both certifications.
          </p>
        </div>

        <p className="mt-6 text-sm text-brand-400">
          When evaluating a NetSuite support firm, certifications are the most direct signal of
          verified platform knowledge. Years of experience tells you time spent; a certification
          tells you that someone passed Oracle&apos;s exam for a specific part of the platform.
          SuitePacific holds both of the credentials that matter for support and development work.
        </p>

        {/* Certifications held */}
        <div className="mt-14" data-section="certifications">
          <h2 className="text-lg font-semibold text-brand-900 mb-6">What NetSuite certifications does SuitePacific hold?</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            {CERTIFICATIONS.map((item) => (
              <Card key={item.title} className="p-5 flex flex-col gap-3 border-accent/20 bg-accent/5">
                <IconBadge icon={item.icon} />
                <h3 className="font-semibold text-brand-900 text-sm">{item.title}</h3>
                <p className="text-sm text-brand-400">{item.description}</p>
              </Card>
            ))}
          </div>
        </div>

        {/* Credential comparison */}
        <div className="mt-14" data-section="credential-comparison">
          <h2 className="text-lg font-semibold text-brand-900 mb-5">SuiteCloud Developer II vs. Administrator Professional: what is the difference?</h2>
          <div className="overflow-x-auto rounded-2xl border border-brand-100">
            <table className="w-full text-sm min-w-[520px]">
              <thead>
                <tr className="border-b border-brand-100 bg-brand-50/50">
                  <th className="text-left p-4 font-semibold text-brand-900 w-1/4"></th>
                  <th className="text-left p-4 font-semibold text-brand-700">SuiteCloud Developer II</th>
                  <th className="text-left p-4 font-semibold text-brand-700">Administrator Professional</th>
                </tr>
              </thead>
              <tbody>
                {CREDENTIAL_COMPARISON.map((row, i) => (
                  <tr key={row.aspect} className={i < CREDENTIAL_COMPARISON.length - 1 ? "border-b border-brand-100" : ""}>
                    <td className="p-4 font-medium text-brand-700 align-top">{row.aspect}</td>
                    <td className="p-4 text-brand-400 align-top">{row.dev2}</td>
                    <td className="p-4 text-brand-400 align-top">{row.admin}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* What certification means */}
        <div className="mt-14" data-section="what-it-means">
          <h2 className="text-lg font-semibold text-brand-900 mb-6">What does NetSuite certification actually mean for your account?</h2>
          <div className="space-y-4">
            {WHAT_CERTIFIED_MEANS.map((item) => (
              <div key={item.title} className="flex items-start gap-4 rounded-2xl border border-brand-100 bg-brand-50/30 p-5">
                <IconBadge icon={item.icon} />
                <div>
                  <h3 className="font-semibold text-brand-900 text-sm">{item.title}</h3>
                  <p className="mt-1.5 text-sm text-brand-400">{item.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* What to look for */}
        <div className="mt-14" data-section="evaluation">
          <h2 className="text-lg font-semibold text-brand-900 mb-5">How should you evaluate credentials when hiring a NetSuite support firm?</h2>
          <div className="space-y-3 text-sm text-brand-400">
            <p>
              Ask which certifications the firm holds and whether those certifications are held by the
              consultant who will actually do your work, not by a different person on the team. A firm
              can advertise certifications held by employees who are not involved in your account.
            </p>
            <p>
              Ask for the credential holder&apos;s name and ask them to share their certification record
              from Oracle&apos;s Learning platform. A current certification will show an active status
              and a recent renewal date.
            </p>
            <p>
              Distinguish between individual certifications (SuiteCloud Developer II, Administrator
              Professional) and firm-level partner status (Solution Provider, BPO partner). Partner
              status reflects revenue and headcount requirements. Individual certifications reflect
              that a specific person passed a knowledge exam.
            </p>
            <p>
              If an engagement involves both custom development and account administration, confirm
              that both credentials are present. They are separate exams covering separate parts of
              the platform.
            </p>
          </div>
        </div>

        {/* Mid-page CTA */}
        <div className="mt-10 rounded-2xl border border-brand-100 bg-white p-5 shadow-soft">
          <p className="text-sm font-semibold text-brand-900 mb-1">Work with certified consultants on your account</p>
          <p className="text-sm text-brand-400 mb-4">
            Both certifications, direct access to the person holding them, and retained context
            across every engagement.
          </p>
          <LeadFormLight />
        </div>

        {/* Why SuitePacific */}
        <div className="mt-14" data-section="why-suitepacific">
          <h2 className="text-lg font-semibold text-brand-900 mb-6">Why do companies choose SuitePacific for certified NetSuite support?</h2>
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

        {/* Related reading */}
        <div className="mt-10 rounded-2xl border border-brand-100 bg-brand-50/30 p-5 sm:p-6">
          <p className="text-sm font-semibold text-brand-900 mb-3">Related reading</p>
          <ul className="space-y-2.5">
            <li className="text-sm text-brand-400">
              <Link href="/netsuite-oracle-support-vs-third-party" className="text-accent hover:underline">
                NetSuite Oracle support vs. third-party consulting firm
              </Link>{" "}
              compares both options side by side including coverage, response time, and certification.
            </li>
            <li className="text-sm text-brand-400">
              <Link href="/blog/netsuite-support-partner-evaluation" className="text-accent hover:underline">
                How to evaluate a NetSuite support partner
              </Link>{" "}
              covers the full set of questions to ask when comparing firms.
            </li>
            <li className="text-sm text-brand-400">
              <Link href="/netsuite-post-go-live-support" className="text-accent hover:underline">
                NetSuite post-go-live support
              </Link>{" "}
              explains how an ongoing certified support engagement is structured.
            </li>
            <li className="text-sm text-brand-400">
              <Link href="/netsuite-managed-support" className="text-accent hover:underline">
                NetSuite managed support
              </Link>{" "}
              covers the retainer model for ongoing certified support at a predictable monthly cost.
            </li>
          </ul>
        </div>

        <ServiceFaqSection items={FAQ} />

        <div className="mt-10 rounded-2xl border border-brand-100 bg-white p-5 shadow-soft">
          <p className="text-sm font-semibold text-brand-900 mb-1">Work with a certified consultant on your account</p>
          <p className="text-sm text-brand-400 mb-4">
            SuiteCloud Developer II and Administrator Professional certifications, direct access,
            and retained context. Tell us what your account needs.
          </p>
          <LeadFormLight />
        </div>
      </div>
    </main>
  );
}

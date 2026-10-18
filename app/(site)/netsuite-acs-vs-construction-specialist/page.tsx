import type { Metadata } from "next";
import Link from "next/link";
import { CheckCircle2, XCircle, Building2, Shield, Wrench, Users } from "lucide-react";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Card } from "@/components/ui/Card";
import { IconBadge } from "@/components/ui/IconBadge";
import { BreadcrumbJsonLd, FaqJsonLd, ServiceJsonLd, OrganizationJsonLd } from "@/components/seo/JsonLd";
import { ServiceFaqSection } from "@/components/ui/ServiceFaqSection";
import { LeadFormLight } from "@/components/sections/LeadFormLight";
import { SITE_URL } from "@/lib/content";

const COMPARISON_TABLE = [
  { factor: "Monthly cost", acs: "~$2,500-$5,000+ (approximate; contact Oracle)", sp: "$799-$2,499" },
  { factor: "SuiteScript development", acs: "Not included", sp: "Included: AIA billing, WIP, change orders" },
  { factor: "Construction domain knowledge", acs: "Platform specialist, not industry specialist", sp: "Construction-focused: AIA, retainage, job cost" },
  { factor: "AIA billing builds", acs: "Not provided", sp: "Custom AIA G702/G703 script builds" },
  { factor: "WIP report builds", acs: "Not provided", sp: "Saved search and SuiteQL WIP schedules" },
  { factor: "Access model", acs: "Ticket-based SLA system", sp: "Direct access to the person doing the work" },
  { factor: "Contract model", acs: "Annual commitment typical", sp: "Month-to-month after 3-month minimum" },
  { factor: "Oracle-direct access", acs: "Yes, internal Oracle team", sp: "No, independent certified partner" },
];

const ACS_PROVIDES = [
  {
    icon: Shield,
    title: "Named support representative",
    description:
      "A designated Oracle support contact who knows the account. Useful for escalating platform-level issues and maintaining continuity with Oracle.",
  },
  {
    icon: Building2,
    title: "Upgrade preparation and guidance",
    description:
      "Proactive review ahead of NetSuite release updates. ACS helps identify configuration risks before major releases roll out to the account.",
  },
  {
    icon: CheckCircle2,
    title: "Platform best practices and governance",
    description:
      "Advisory guidance on configuration standards, role setup, and platform health from Oracle insiders who know the product roadmap.",
  },
];

const SP_PROVIDES = [
  {
    icon: Wrench,
    title: "Active SuiteScript development",
    description:
      "AIA billing scripts, change order automation, WIP report builds, job costing custom fields, lien waiver tracking, and retainage release scripts built directly in the account.",
  },
  {
    icon: Building2,
    title: "Construction domain expertise",
    description:
      "AIA G702/G703 billing format, CSI cost codes, subcontractor compliance tracking, retainage workflows, lien waivers, and progress billing: the construction-specific work ACS does not cover.",
  },
  {
    icon: Users,
    title: "Direct engagement model",
    description:
      "No ticket queue or intermediary. Direct access to the consultant doing the work, with a one business day response target and month-to-month terms after a three-month minimum.",
  },
];

const FAQ = [
  {
    question: "What is NetSuite ACS?",
    answer:
      "NetSuite ACS (Advanced Customer Support) is Oracle&apos;s premium internal support service, available at different tiers above standard NetSuite support. It provides a named Oracle support representative, proactive platform guidance, upgrade preparation, and configuration best practices. ACS is an advisory and platform support service, not a development service. It does not include active SuiteScript development, industry-specific workflow builds, or construction-domain expertise.",
  },
  {
    question: "Does NetSuite ACS do SuiteScript development?",
    answer:
      "No. NetSuite ACS provides platform advisory, upgrade readiness, and configuration guidance from Oracle&apos;s internal team. It does not include custom SuiteScript development. If a construction company needs AIA billing scripts, WIP report builds, change order automation, or lien waiver tracking built in NetSuite, that work requires a certified SuiteScript developer, not ACS.",
  },
  {
    question: "Can a construction company use both ACS and a specialist?",
    answer:
      "Yes. Some larger construction accounts use ACS for Oracle-direct platform access and upgrade governance, and a specialist like SuitePacific for the active SuiteScript and construction-specific development work. The two are not mutually exclusive. ACS handles Oracle-level platform questions; a specialist handles the domain-specific builds.",
  },
  {
    question: "What does SuitePacific provide that ACS does not?",
    answer:
      "SuitePacific provides active SuiteScript development for construction workflows: AIA billing scripts, WIP report builds, change order automation, job costing custom fields, retainage release scripts, and lien waiver tracking. SuitePacific also brings construction domain knowledge: AIA billing format, CSI cost codes, subcontractor compliance requirements, and progress billing logic. None of this is covered by ACS.",
  },
  {
    question: "How does SuitePacific pricing compare to ACS?",
    answer:
      "SuitePacific plans start at $799 per month (10 hours) with month-to-month terms after a three-month minimum. ACS pricing depends on the tier and account size; contact Oracle directly for current pricing, as it varies by account and changes over time.",
  },
  {
    question: "Which is better for a post-go-live construction company that needs new builds?",
    answer:
      "For a construction company that needs SuiteScript development, construction-specific builds, and ongoing account support post-go-live, a specialist like SuitePacific is more directly matched. ACS is better suited for large enterprise accounts that primarily need Oracle-direct access, governance support, and proactive upgrade management, rather than active development work.",
  },
];

export const metadata: Metadata = {
  title: "NetSuite ACS vs. Construction Specialist Support Options",
  description:
    "NetSuite ACS offers Oracle platform advisory; a construction specialist provides SuiteScript development, AIA billing, and WIP builds for live accounts.",
  alternates: { canonical: "/netsuite-acs-vs-construction-specialist" },
  openGraph: {
    title: "NetSuite ACS vs. Construction Specialist Support",
    description:
      "NetSuite ACS is Oracle&apos;s internal advisory service. A construction specialist provides active SuiteScript development, AIA billing scripts, and WIP report builds. Comparison for live construction accounts.",
    url: `${SITE_URL}/netsuite-acs-vs-construction-specialist`,
    type: "website",
    images: [{ url: `${SITE_URL}/og-default.png`, width: 1200, height: 630 }],
  },
};

export default function AcsVsConstructionSpecialistPage() {
  return (
    <main className="pt-32 pb-24 sm:pt-40 sm:pb-32">
      <BreadcrumbJsonLd
        items={[
          { name: "Home", url: SITE_URL },
          { name: "NetSuite ACS vs. Construction Specialist Support", url: `${SITE_URL}/netsuite-acs-vs-construction-specialist` },
        ]}
      />
      <FaqJsonLd items={FAQ} />
      <ServiceJsonLd
        name="NetSuite Construction Specialist Support"
        description="Post-go-live NetSuite support for construction companies: SuiteScript development, AIA billing scripts, WIP report builds, change order automation, and job costing configuration."
        url={`${SITE_URL}/netsuite-acs-vs-construction-specialist`}
        serviceType="NetSuite Construction Support"
        offers={[
          { name: "Care", price: 799, description: "10 hours/month: SuiteScript development, construction workflow builds, and ongoing account support. Month-to-month after 3-month minimum." },
          { name: "Care Plus", price: 1499, description: "20 hours/month: construction builds plus broader NetSuite administration, saved search configuration, and workflow automation. Month-to-month." },
          { name: "Care Pro", price: 2499, description: "35 hours/month: full construction accounting support including AIA billing, WIP, job cost, and SuiteScript development. Month-to-month." },
        ]}
      />
      <OrganizationJsonLd />

      <div className="mx-auto max-w-3xl px-6 lg:px-8">
        <SectionHeading
          as="h1"
          eyebrow="NetSuite Support"
          title="NetSuite ACS vs. Construction-Specialist Consulting: What Live Accounts Actually Need"
          subtitle="How ACS differs from a dedicated construction NetSuite specialist, and when each is the right choice for a live construction account."
          align="left"
        />

        <div className="mt-6 rounded-2xl border border-brand-100 bg-white p-5 shadow-soft">
          <p className="text-sm text-brand-600 mb-3">Construction company evaluating your NetSuite support options? Tell us what your account currently needs.</p>
          <LeadFormLight />
        </div>
        <p className="mt-3 text-xs text-brand-400">NetSuite-certified · Construction specialists · Direct access · Month-to-month</p>
        <p className="mt-3 text-xs text-brand-300">Published October 2026</p>

        <div className="mt-6 rounded-2xl border border-brand-100 bg-brand-50/40 p-5">
          <p className="text-xs font-semibold uppercase tracking-wide text-accent mb-2">Quick answer</p>
          <p className="text-sm text-brand-700 leading-relaxed">
            NetSuite ACS (Advanced Customer Support) refers to Oracle&apos;s internal premium support
            service. It provides a named Oracle representative, proactive upgrade guidance, and platform
            advisory from inside Oracle. ACS does not include SuiteScript development,
            construction-domain expertise, AIA billing script builds, WIP report development, or change
            order automation. A construction specialist like SuitePacific is an independent certified
            partner focused on the active development and configuration work that construction companies
            need post-go-live: AIA billing scripts, WIP schedule builds, job costing custom fields,
            lien waiver tracking, and retainage workflows. Construction companies that primarily need
            Oracle-direct platform access and upgrade governance may find ACS valuable. Companies that
            need ongoing SuiteScript development and construction-specific domain expertise are better
            served by a specialist. The two are not mutually exclusive; larger construction accounts
            often use both for different purposes at the same time.
          </p>
        </div>

        {/* Comparison table */}
        <div className="mt-14">
          <h2 className="text-lg font-semibold text-brand-900 mb-2">How does NetSuite ACS compare to a construction specialist?</h2>
          <p className="text-sm text-brand-400 mb-5">
            The core difference is scope: ACS is Oracle&apos;s internal platform advisory service; a specialist like SuitePacific is a development and construction-domain partner.
          </p>
          <div className="overflow-x-auto rounded-2xl border border-brand-100">
            <table className="w-full text-sm min-w-[520px]">
              <thead>
                <tr className="border-b border-brand-100 bg-brand-50/50">
                  <th className="text-left p-4 font-semibold text-brand-900">Factor</th>
                  <th className="text-left p-4 font-semibold text-brand-900">NetSuite ACS</th>
                  <th className="text-left p-4 font-semibold text-brand-900">SuitePacific</th>
                </tr>
              </thead>
              <tbody>
                {COMPARISON_TABLE.map((row, i) => (
                  <tr key={row.factor} className={i < COMPARISON_TABLE.length - 1 ? "border-b border-brand-100" : ""}>
                    <td className="p-4 font-medium text-brand-700 align-top whitespace-nowrap">{row.factor}</td>
                    <td className="p-4 text-brand-400 align-top text-[13px]">{row.acs}</td>
                    <td className="p-4 text-brand-400 align-top text-[13px]">{row.sp}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* When ACS is right */}
        <div className="mt-14">
          <h2 className="text-lg font-semibold text-brand-900 mb-2">When is NetSuite ACS the right choice for a construction account?</h2>
          <p className="text-sm text-brand-400 mb-6">
            ACS is most valuable for large enterprise accounts where Oracle-direct access, platform governance, and proactive upgrade management are the primary needs.
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
            {ACS_PROVIDES.map((item) => (
              <Card key={item.title} className="p-5 flex flex-col gap-3">
                <IconBadge icon={item.icon} />
                <h3 className="font-semibold text-brand-900 text-sm">{item.title}</h3>
                <p className="text-sm text-brand-400">{item.description}</p>
              </Card>
            ))}
          </div>
          <p className="mt-4 text-sm text-brand-400">
            ACS works best when an account has stable configuration and primarily needs Oracle-level platform access, governance oversight, and upgrade readiness, rather than ongoing active development.
          </p>
        </div>

        {/* When a specialist is right */}
        <div className="mt-14">
          <h2 className="text-lg font-semibold text-brand-900 mb-2">When does a construction specialist make more sense than ACS?</h2>
          <p className="text-sm text-brand-400 mb-6">
            Construction companies that need ongoing SuiteScript builds and domain-specific expertise are better matched with a specialist than with Oracle&apos;s internal advisory service.
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
            {SP_PROVIDES.map((item) => (
              <Card key={item.title} className="p-5 flex flex-col gap-3">
                <IconBadge icon={item.icon} />
                <h3 className="font-semibold text-brand-900 text-sm">{item.title}</h3>
                <p className="text-sm text-brand-400">{item.description}</p>
              </Card>
            ))}
          </div>
        </div>

        {/* Related reading */}
        <div className="mt-10 rounded-2xl border border-brand-100 bg-brand-50/30 p-5 sm:p-6">
          <p className="text-sm font-semibold text-brand-900 mb-3">Related reading</p>
          <ul className="space-y-2.5">
            <li className="text-sm text-brand-400">
              <Link href="/netsuite-care" className="text-accent hover:underline">
                NetSuite Care: SuitePacific&apos;s managed support plans
              </Link>{" "}
              covers the plan tiers, hours, response times, and what is included.
            </li>
            <li className="text-sm text-brand-400">
              <Link href="/industries/construction" className="text-accent hover:underline">
                NetSuite support for construction companies
              </Link>{" "}
              covers the full scope of construction-specific work SuitePacific provides.
            </li>
            <li className="text-sm text-brand-400">
              <Link href="/netsuite-post-go-live-support" className="text-accent hover:underline">
                NetSuite post-go-live support
              </Link>{" "}
              explains what post-implementation support looks like and when companies need it.
            </li>
          </ul>
        </div>

        <ServiceFaqSection items={FAQ} />

        <div className="mt-10 rounded-2xl border border-brand-100 bg-white p-5 shadow-soft">
          <p className="text-sm font-semibold text-brand-900 mb-1">Evaluating NetSuite support options for your construction account?</p>
          <p className="text-sm text-brand-400 mb-4">
            Tell us what your account currently needs. We will give a direct assessment of whether a specialist engagement is the right fit.
          </p>
          <LeadFormLight />
        </div>
      </div>
    </main>
  );
}

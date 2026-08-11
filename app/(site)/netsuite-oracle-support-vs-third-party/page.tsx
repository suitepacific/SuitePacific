import type { Metadata } from "next";
import Link from "next/link";
import {
  ShieldCheck,
  Users,
  Award,
  Clock,
} from "lucide-react";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Card } from "@/components/ui/Card";
import { IconBadge } from "@/components/ui/IconBadge";
import { BreadcrumbJsonLd, FaqJsonLd, ServiceJsonLd } from "@/components/seo/JsonLd";
import { ServiceFaqSection } from "@/components/ui/ServiceFaqSection";
import { LeadFormLight } from "@/components/sections/LeadFormLight";
import { SITE_URL } from "@/lib/content";

const WHY_SP = [
  {
    icon: ShieldCheck,
    title: "NetSuite-Certified",
    description:
      "SuiteCloud Developer II and Administrator Professional certifications. The same credential standard, without the shared-queue model.",
  },
  {
    icon: Users,
    title: "Direct Access",
    description:
      "You reach the consultant doing the work directly. No account manager relay, no ticket triage, no routing queue.",
  },
  {
    icon: Award,
    title: "Retained Account Context",
    description:
      "We build knowledge of your account over time and carry it across every engagement. You do not re-explain your setup each time work comes in.",
  },
  {
    icon: Clock,
    title: "Month-to-Month",
    description:
      "No annual contract requirement. Engagements run month-to-month and scale with what the account actually needs.",
  },
];

const FAQ = [
  {
    question: "When should a company keep Oracle NetSuite support instead of switching?",
    answer:
      "Oracle NetSuite support is the right choice when your primary need is platform bug escalation or standard feature questions that do not involve customizations. If your account has no SuiteScript, no third-party integrations, and runs entirely on standard functionality, Oracle support covers most of what you need. The gap becomes significant the moment your account depends on customizations built during implementation.",
  },
  {
    question: "Can a third-party firm handle everything Oracle support would handle?",
    answer:
      "For configuration guidance, standard feature questions, and troubleshooting, yes. For confirmed platform bugs that require Oracle engineering involvement, a third-party firm identifies the bug, documents it, and guides the submission through NetSuite's standard support channel. Only Oracle can file internally with their engineering team, but in practice, most issues in a live account sit in the customization layer rather than the platform itself.",
  },
  {
    question: "How do third-party firms handle NetSuite version upgrades?",
    answer:
      "We review release notes ahead of each twice-yearly upgrade, identify scripts and customizations that may be affected, test in Sandbox before the Production upgrade window, and fix anything that breaks. Oracle support does not perform this review on your behalf for custom code.",
  },
  {
    question: "Is it possible to use both Oracle support and a third-party firm?",
    answer:
      "Yes, and some accounts do. Oracle support handles confirmed platform defects through official channels; the third-party firm handles the customization layer. For accounts that require ACS-level escalation for enterprise platform issues, running both in parallel makes sense. For most mid-market accounts, the third-party firm covers the full scope without needing Oracle support for routine work.",
  },
  {
    question: "What certifications should a third-party NetSuite firm have?",
    answer:
      "Look for NetSuite SuiteCloud Developer II (for SuiteScript and custom development) and NetSuite Administrator Professional (for configuration and administration). These are Oracle's verified credentials, not self-declared experience. SuitePacific holds both.",
  },
];

export const metadata: Metadata = {
  title: "NetSuite Oracle Support vs. Third-Party Consulting Firm",
  description:
    "A side-by-side comparison of Oracle NetSuite support and third-party consulting firms: what each covers, response time, cost structure, and when each is the right choice.",
  alternates: { canonical: "/netsuite-oracle-support-vs-third-party" },
  openGraph: {
    title: "NetSuite Oracle Support vs. Third-Party Consulting Firm",
    description:
      "A side-by-side comparison of Oracle NetSuite support and third-party consulting firms: what each covers, response time, cost structure, and when each is the right choice.",
    url: `${SITE_URL}/netsuite-oracle-support-vs-third-party`,
    type: "website",
    images: [{ url: `${SITE_URL}/og-default.png`, width: 1200, height: 630 }],
  },
};

export default function OracleSupportVsThirdPartyPage() {
  return (
    <main className="pt-32 pb-24 sm:pt-40 sm:pb-32">
      <BreadcrumbJsonLd
        items={[
          { name: "Home", url: SITE_URL },
          { name: "NetSuite Oracle Support vs. Third-Party", url: `${SITE_URL}/netsuite-oracle-support-vs-third-party` },
        ]}
      />
      <FaqJsonLd items={FAQ} />
      <ServiceJsonLd
        name="NetSuite Third-Party Support"
        description="Third-party NetSuite consulting and support covering the full customization layer: SuiteScript, workflows, integrations, and administration."
        url={`${SITE_URL}/netsuite-oracle-support-vs-third-party`}
        serviceType="NetSuite Support"
      />

      <div className="mx-auto max-w-3xl px-6 lg:px-8">
        <SectionHeading
          as="h1"
          eyebrow="Support Comparison"
          title="NetSuite Oracle Support vs. Third-Party Consulting Firm"
          subtitle="Oracle NetSuite support and third-party consulting firms serve different parts of a live account. Understanding which covers which helps you decide where your support spend belongs."
          align="left"
        />

        <div className="mt-6 rounded-2xl border border-brand-100 bg-white p-5 shadow-soft">
          <LeadFormLight />
        </div>
        <p className="mt-3 text-xs text-brand-400">NetSuite-certified · Direct access · No ticket queue · Month-to-month</p>

        <p className="mt-6 text-sm text-brand-400">
          The choice between Oracle support and a third-party firm is not binary. It is a question
          of which layer of your account each covers, and whether the coverage matches where your
          account actually generates work. Most live accounts generate most of their support needs
          in the customization layer, where Oracle support stops and third-party firms begin.
        </p>

        {/* Comparison table */}
        <div className="mt-14" data-section="comparison">
          <h2 className="text-lg font-semibold text-brand-900 mb-6">Side-by-side comparison</h2>
          <div className="overflow-x-auto rounded-2xl border border-brand-100">
            <table className="w-full text-sm border-collapse min-w-[560px]">
              <thead>
                <tr>
                  <th className="text-left px-5 py-3.5 bg-brand-900 text-white font-semibold w-[38%]">Category</th>
                  <th className="text-left px-5 py-3.5 bg-brand-800 text-white font-semibold w-[31%]">Oracle NetSuite Support</th>
                  <th className="text-left px-5 py-3.5 bg-accent text-white font-semibold w-[31%]">SuitePacific</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className="px-5 py-3.5 border-b border-brand-100 text-brand-700 font-medium">Platform bugs</td>
                  <td className="px-5 py-3.5 border-b border-brand-100 text-brand-600">Yes, internal escalation to Oracle engineering</td>
                  <td className="px-5 py-3.5 border-b border-brand-100 text-brand-600">Yes, documented and submitted via standard channel</td>
                </tr>
                <tr className="bg-brand-50/40">
                  <td className="px-5 py-3.5 border-b border-brand-100 text-brand-700 font-medium">Standard feature questions</td>
                  <td className="px-5 py-3.5 border-b border-brand-100 text-brand-600">Yes</td>
                  <td className="px-5 py-3.5 border-b border-brand-100 text-brand-600">Yes</td>
                </tr>
                <tr>
                  <td className="px-5 py-3.5 border-b border-brand-100 text-brand-700 font-medium">SuiteScript issues</td>
                  <td className="px-5 py-3.5 border-b border-brand-100 text-brand-500 italic">Not covered</td>
                  <td className="px-5 py-3.5 border-b border-brand-100 text-brand-600">Yes</td>
                </tr>
                <tr className="bg-brand-50/40">
                  <td className="px-5 py-3.5 border-b border-brand-100 text-brand-700 font-medium">Workflow troubleshooting</td>
                  <td className="px-5 py-3.5 border-b border-brand-100 text-brand-500 italic">Standard workflows only</td>
                  <td className="px-5 py-3.5 border-b border-brand-100 text-brand-600">Yes, including custom logic</td>
                </tr>
                <tr>
                  <td className="px-5 py-3.5 border-b border-brand-100 text-brand-700 font-medium">Third-party integrations</td>
                  <td className="px-5 py-3.5 border-b border-brand-100 text-brand-500 italic">Not covered</td>
                  <td className="px-5 py-3.5 border-b border-brand-100 text-brand-600">Yes</td>
                </tr>
                <tr className="bg-brand-50/40">
                  <td className="px-5 py-3.5 border-b border-brand-100 text-brand-700 font-medium">Advanced PDF templates</td>
                  <td className="px-5 py-3.5 border-b border-brand-100 text-brand-500 italic">Not covered</td>
                  <td className="px-5 py-3.5 border-b border-brand-100 text-brand-600">Yes</td>
                </tr>
                <tr>
                  <td className="px-5 py-3.5 border-b border-brand-100 text-brand-700 font-medium">New development</td>
                  <td className="px-5 py-3.5 border-b border-brand-100 text-brand-500 italic">Not covered</td>
                  <td className="px-5 py-3.5 border-b border-brand-100 text-brand-600">Yes</td>
                </tr>
                <tr className="bg-brand-50/40">
                  <td className="px-5 py-3.5 border-b border-brand-100 text-brand-700 font-medium">Version upgrade review</td>
                  <td className="px-5 py-3.5 border-b border-brand-100 text-brand-500 italic">General release notes only</td>
                  <td className="px-5 py-3.5 border-b border-brand-100 text-brand-600">Account-specific impact review</td>
                </tr>
                <tr>
                  <td className="px-5 py-3.5 border-b border-brand-100 text-brand-700 font-medium">Response time</td>
                  <td className="px-5 py-3.5 border-b border-brand-100 text-brand-600">Varies by support tier and queue volume</td>
                  <td className="px-5 py-3.5 border-b border-brand-100 text-brand-600">Same business day for active issues</td>
                </tr>
                <tr className="bg-brand-50/40">
                  <td className="px-5 py-3.5 border-b border-brand-100 text-brand-700 font-medium">Dedicated account knowledge</td>
                  <td className="px-5 py-3.5 border-b border-brand-100 text-brand-500 italic">Shared resources, rotates by case</td>
                  <td className="px-5 py-3.5 border-b border-brand-100 text-brand-600">Retained across all requests</td>
                </tr>
                <tr>
                  <td className="px-5 py-3.5 border-b border-brand-100 text-brand-700 font-medium">Certification</td>
                  <td className="px-5 py-3.5 border-b border-brand-100 text-brand-600">Oracle-employed resources</td>
                  <td className="px-5 py-3.5 border-b border-brand-100 text-brand-600">SuiteCloud Developer II, Administrator Professional</td>
                </tr>
                <tr className="bg-brand-50/40">
                  <td className="px-5 py-3.5 text-brand-700 font-medium">Contract structure</td>
                  <td className="px-5 py-3.5 text-brand-600">Annual subscription</td>
                  <td className="px-5 py-3.5 text-brand-600">Month-to-month retainer</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        {/* Narrative context */}
        <div className="mt-14" data-section="when-to-use">
          <h2 className="text-lg font-semibold text-brand-900 mb-5">When each option is the right choice</h2>

          <div className="space-y-6">
            <div className="rounded-2xl border border-brand-100 bg-brand-50/30 p-5">
              <h3 className="font-semibold text-brand-900 text-sm mb-2">When Oracle NetSuite support is sufficient</h3>
              <p className="text-sm text-brand-400">
                If your account runs primarily on standard NetSuite functionality, has minimal
                custom SuiteScript, and your main support needs are standard feature questions or
                occasional platform bugs, Oracle support covers those cases. This is most common in
                the first six to twelve months after go-live, before customization complexity
                accumulates.
              </p>
            </div>

            <div className="rounded-2xl border border-accent/20 bg-accent/5 p-5">
              <h3 className="font-semibold text-brand-900 text-sm mb-2">When a third-party firm is the better fit</h3>
              <p className="text-sm text-brand-400">
                When your account depends on SuiteScript, custom workflows, integrations, or
                configuration built during implementation, the work that surfaces daily sits outside
                Oracle support&apos;s scope. A third-party firm covers that layer with direct access,
                retained context, and same-day response on active issues. This is the situation for
                most accounts two or more years past go-live.
              </p>
            </div>
          </div>
        </div>

        {/* Mid-page CTA */}
        <div className="mt-10 rounded-2xl border border-brand-100 bg-white p-5 shadow-soft">
          <p className="text-sm font-semibold text-brand-900 mb-1">Not sure which fits your situation?</p>
          <p className="text-sm text-brand-400 mb-4">
            Tell us how your account is set up and what kinds of issues surface most often.
            We will give you an honest assessment of whether a third-party engagement covers
            your actual needs.
          </p>
          <LeadFormLight />
        </div>

        {/* Why SuitePacific */}
        <div className="mt-14" data-section="why-suitepacific">
          <h2 className="text-lg font-semibold text-brand-900 mb-6">Why companies choose SuitePacific as their third-party firm</h2>
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
              <Link href="/netsuite-acs-alternative" className="text-accent hover:underline">
                NetSuite ACS alternative
              </Link>{" "}
              covers the specific gaps in Advanced Customer Support that a third-party firm addresses.
            </li>
            <li className="text-sm text-brand-400">
              <Link href="/netsuite-support-alternative" className="text-accent hover:underline">
                Alternative to NetSuite support
              </Link>{" "}
              explains what a third-party engagement covers and how it is structured.
            </li>
            <li className="text-sm text-brand-400">
              <Link href="/blog/netsuite-support-partner-evaluation" className="text-accent hover:underline">
                How to evaluate a NetSuite support partner
              </Link>{" "}
              covers the questions to ask when selecting a third-party firm.
            </li>
            <li className="text-sm text-brand-400">
              <Link href="/netsuite-post-go-live-support" className="text-accent hover:underline">
                NetSuite post-go-live support
              </Link>{" "}
              explains how an ongoing engagement is structured after implementation ends.
            </li>
          </ul>
        </div>

        <ServiceFaqSection items={FAQ} />
      </div>
    </main>
  );
}

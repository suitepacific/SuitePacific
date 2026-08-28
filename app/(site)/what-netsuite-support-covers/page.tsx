import type { Metadata } from "next";
import Link from "next/link";
import { CheckCircle2, XCircle } from "lucide-react";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { BreadcrumbJsonLd, FaqJsonLd, ServiceJsonLd, OrganizationJsonLd } from "@/components/seo/JsonLd";
import { ServiceFaqSection } from "@/components/ui/ServiceFaqSection";
import { LeadFormLight } from "@/components/sections/LeadFormLight";
import { SITE_URL } from "@/lib/content";

const COVERED = [
  "Platform-level bug reports (incorrect behavior in standard functionality)",
  "Questions about standard NetSuite features and how they work",
  "Access to Oracle's knowledge base and help documentation",
  "Guidance on standard configuration options within native features",
  "Release note clarifications and upgrade-related platform questions",
  "SuiteApp bundle issues where the SuiteApp is Oracle-published",
  "Performance issues affecting the NetSuite platform itself",
  "Data center and availability issues",
  "Escalation path to Oracle engineering for confirmed platform bugs",
];

const NOT_COVERED = [
  "SuiteScript customizations: Client Scripts, User Event Scripts, Scheduled Scripts, Map/Reduce Scripts, Restlets, Suitelets",
  "SuiteFlow workflow logic built for your account",
  "Third-party integration debugging (Shopify, Salesforce, Celigo, Dell Boomi, EDI connectors, Avalara)",
  "Custom records, custom fields, and custom forms",
  "Saved searches, reports, and dashboards built for your account",
  "Advanced PDF and email template customizations (FreeMarker/BFO templates)",
  "Custom roles and permission configurations",
  "Data issues caused by custom scripts or imports",
  "Troubleshooting errors in SuiteScript code",
  "Debugging integration payload failures",
  "Performance issues caused by custom scripts or saved searches",
  "SuiteAnalytics Workbook formulas and datasets",
  "Third-party SuiteApps not published by Oracle",
];

const ACS_NOT_COVERED = [
  "Custom SuiteScript development and debugging",
  "Third-party integration debugging and maintenance",
  "Custom workflow logic beyond standard SuiteFlow configuration",
  "Advanced PDF and FreeMarker template work",
  "Work that falls outside Oracle's defined ACS scope documentation",
];

const FAQ = [
  {
    question: "What exactly does NetSuite standard support cover?",
    answer:
      "NetSuite standard support, included in every NetSuite license, covers the platform itself: platform-level bugs, questions about standard native features, access to Oracle's knowledge base and documentation, SuiteApp issues for Oracle-published bundles, and escalation to Oracle engineering for confirmed platform bugs. It does not cover anything built specifically for your account: SuiteScript customizations, SuiteFlow workflows, third-party integrations, custom records and fields, or saved searches and reports.",
  },
  {
    question: "Does NetSuite support cover SuiteScript errors?",
    answer:
      "No. Oracle's support explicitly excludes SuiteScript customizations. If a Client Script, User Event Script, Scheduled Script, Map/Reduce Script, Restlet, or Suitelet is throwing an error, Oracle support will not debug it. This applies whether the script was written by your implementation partner, an internal resource, or a third-party developer. Debugging SuiteScript requires access to a support resource outside Oracle's standard or ACS support.",
  },
  {
    question: "Does Oracle ACS cover SuiteScript and integrations?",
    answer:
      "No. Oracle ACS (Advanced Customer Support) provides more hands-on functional guidance and a designated consultant at higher tiers, but it explicitly excludes SuiteScript development and debugging, third-party integration maintenance, and custom workflow logic. ACS documents its scope exclusions in its service descriptions. For accounts with active customizations, ACS does not replace the need for a third-party technical support resource.",
  },
  {
    question: "Who is responsible for fixing a SuiteScript error after a NetSuite upgrade?",
    answer:
      "You are, or whoever you have engaged for technical support. Oracle's upgrade changes platform behavior according to published release notes. If a script breaks because it referenced an API that changed, or because governance unit costs increased, Oracle support will confirm the release note describing the change but will not fix the script. A third-party support resource — a consultant or managed support firm — is responsible for updating the script to work correctly in the upgraded version.",
  },
  {
    question: "Does NetSuite support cover Shopify or Salesforce integration issues?",
    answer:
      "No. Oracle does not support third-party integrations regardless of how they were built. This includes integrations built on Celigo, Dell Boomi, MuleSoft, or custom RESTlets that connect to external platforms. If a Shopify order is not flowing into NetSuite, or a Salesforce opportunity is not syncing, Oracle support will not debug the connector. Third-party integration maintenance requires a resource who has access to both the integration platform and the NetSuite account.",
  },
  {
    question: "What is the difference between what NetSuite support covers and what a managed support retainer covers?",
    answer:
      "NetSuite standard support covers the platform: native features, platform bugs, and documentation. A managed support retainer from a third-party firm covers the customization layer: SuiteScript scripts, SuiteFlow workflow logic, third-party integrations, custom records, saved searches, and Advanced PDF templates. These two support resources do not overlap. Most post-go-live accounts need both: Oracle support for platform issues and a third-party retainer for the customization layer that generates most day-to-day support requests.",
  },
  {
    question: "Can Oracle support tell me why my saved search is not returning the right results?",
    answer:
      "For standard saved searches using native criteria and filters, Oracle support can assist. For saved searches using custom formulas, custom field criteria, or complex criteria involving custom records, Oracle support's ability to assist is limited. Saved searches that join custom record types or reference SuiteScript-managed data are generally out of scope for standard support. A third-party resource familiar with your account's data model is more effective for these.",
  },
];

const SUPPORT_MODELS = [
  {
    name: "Oracle standard support",
    included: true,
    covers: "Platform bugs, native feature questions, documentation",
    excludes: "All custom scripts, workflows, integrations, custom fields",
    cost: "Included in license",
  },
  {
    name: "Oracle ACS",
    included: true,
    covers: "Functional guidance, designated consultant (Monitor tier and above), upgrade assistance",
    excludes: "SuiteScript development, third-party integrations, custom workflow logic",
    cost: "Paid add-on",
  },
  {
    name: "Third-party managed retainer",
    included: false,
    covers: "Scripts, workflows, integrations, custom fields, saved searches, PDF templates, administration",
    excludes: "Oracle platform-level bugs (refer to Oracle)",
    cost: "$799–$2,499/month",
  },
];

export const metadata: Metadata = {
  title: "What Does NetSuite Support Cover?",
  description:
    "Exactly what Oracle NetSuite standard support covers and what it excludes: SuiteScript, integrations, workflows, custom fields. What ACS adds, and what still requires a third-party resource.",
  alternates: { canonical: "/what-netsuite-support-covers" },
  openGraph: {
    title: "What Does NetSuite Support Cover?",
    description:
      "Exactly what Oracle NetSuite standard support covers and what it excludes: SuiteScript, integrations, workflows, custom fields. What ACS adds, and what still requires a third-party resource.",
    url: `${SITE_URL}/what-netsuite-support-covers`,
    type: "website",
    images: [{ url: `${SITE_URL}/og-default.png`, width: 1200, height: 630 }],
  },
};

export default function WhatNetSuiteSupportCoversPage() {
  return (
    <main className="pt-32 pb-24 sm:pt-40 sm:pb-32">
      <BreadcrumbJsonLd
        items={[
          { name: "Home", url: SITE_URL },
          { name: "What Does NetSuite Support Cover?", url: `${SITE_URL}/what-netsuite-support-covers` },
        ]}
      />
      <FaqJsonLd items={FAQ} />
      <ServiceJsonLd
        name="NetSuite Support Coverage Guide"
        description="What Oracle NetSuite standard support covers and excludes, and what requires a third-party support resource."
        url={`${SITE_URL}/what-netsuite-support-covers`}
        serviceType="NetSuite Support"
      />
      <OrganizationJsonLd />

      <div className="mx-auto max-w-3xl px-6 lg:px-8">
        <SectionHeading
          as="h1"
          eyebrow="Support Coverage"
          title="What Does NetSuite Support Cover?"
          subtitle="Oracle standard support and ACS cover the platform. The customization layer that most accounts rely on daily is explicitly outside their scope."
          align="left"
        />

        <div className="mt-6 rounded-2xl border border-brand-100 bg-white p-5 shadow-soft">
          <LeadFormLight />
        </div>
        <p className="mt-3 text-xs text-brand-400">NetSuite-certified · Third-party support for the customization layer · Month-to-month</p>
        <p className="mt-2 text-xs text-brand-300"><time dateTime="2026-08">Published August 2026</time></p>

        <div className="mt-6 rounded-2xl border-l-4 border-accent bg-brand-50/50 p-5">
          <p className="text-xs font-semibold uppercase tracking-wide text-accent mb-2">Quick answer</p>
          <p className="text-sm text-brand-700 leading-relaxed">
            Oracle NetSuite standard support, included in every license, covers the platform:
            platform-level bugs in standard functionality, questions about native features,
            access to Oracle&apos;s knowledge base, and escalation to Oracle engineering for
            confirmed platform defects. It explicitly excludes everything built specifically
            for your account. This means SuiteScript customizations of any type are not
            covered, SuiteFlow workflows built for your account are not covered, third-party
            integrations including Shopify, Salesforce, Celigo, and EDI connectors are not
            covered, and custom records, fields, saved searches, and Advanced PDF templates
            are not covered. Oracle ACS adds functional guidance and a designated consultant
            at higher tiers but does not cover SuiteScript development, integration debugging,
            or custom workflow logic. For most post-go-live accounts, the work that generates
            the most support requests sits in the customization layer that Oracle support and
            ACS do not cover. A third-party managed support retainer covers this layer at a
            fixed monthly cost.
          </p>
        </div>

        <p className="mt-6 text-sm text-brand-400">
          The gap between what Oracle support covers and what a post-go-live account actually needs
          support for is the most common source of frustration for businesses that have been live on
          NetSuite for a year or more. Understanding the boundary clearly is the starting point
          for making the right decision about what additional support to put in place. See our{" "}
          <Link href="/netsuite-support-comparison" className="text-accent hover:underline">
            full comparison of all five NetSuite support models
          </Link>{" "}
          for a detailed breakdown.
        </p>

        {/* What is and isn't covered */}
        <div className="mt-14">
          <h2 className="text-lg font-semibold text-brand-900 mb-5">What Oracle standard support covers and excludes</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            <div className="rounded-2xl border border-emerald-100 bg-emerald-50/30 p-5">
              <p className="text-xs font-semibold text-emerald-700 uppercase tracking-wide mb-3">Covered by Oracle support</p>
              <ul className="space-y-2">
                {COVERED.map((item) => (
                  <li key={item} className="flex items-start gap-2 text-sm text-brand-600">
                    <CheckCircle2 className="h-3.5 w-3.5 text-emerald-500 shrink-0 mt-0.5" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
            <div className="rounded-2xl border border-red-100 bg-red-50/20 p-5">
              <p className="text-xs font-semibold text-red-600 uppercase tracking-wide mb-3">Not covered by Oracle support</p>
              <ul className="space-y-2">
                {NOT_COVERED.map((item) => (
                  <li key={item} className="flex items-start gap-2 text-sm text-brand-600">
                    <XCircle className="h-3.5 w-3.5 text-red-400 shrink-0 mt-0.5" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        {/* ACS */}
        <div className="mt-14">
          <h2 className="text-lg font-semibold text-brand-900 mb-2">Does Oracle ACS cover what standard support misses?</h2>
          <p className="text-sm text-brand-400 mb-5">
            Partially. ACS adds functional guidance and a designated consultant at Monitor tier and above, but it explicitly excludes the technical customization layer.
          </p>
          <div className="rounded-2xl border border-brand-100 bg-white p-5 shadow-sm">
            <p className="text-sm font-semibold text-brand-900 mb-3">ACS adds over standard support:</p>
            <ul className="space-y-1.5 mb-5">
              {[
                "Functional guidance on NetSuite best practices",
                "Designated consultant at Monitor tier and above",
                "Quarterly or monthly engagement cadence depending on tier",
                "Upgrade preparation assistance (functional layer only)",
                "Escalation priority with Oracle engineering",
              ].map((item) => (
                <li key={item} className="flex items-start gap-2 text-sm text-brand-600">
                  <CheckCircle2 className="h-3.5 w-3.5 text-emerald-500 shrink-0 mt-0.5" />
                  {item}
                </li>
              ))}
            </ul>
            <p className="text-sm font-semibold text-brand-900 mb-3">ACS still does not cover:</p>
            <ul className="space-y-1.5">
              {ACS_NOT_COVERED.map((item) => (
                <li key={item} className="flex items-start gap-2 text-sm text-brand-600">
                  <XCircle className="h-3.5 w-3.5 text-red-400 shrink-0 mt-0.5" />
                  {item}
                </li>
              ))}
            </ul>
          </div>
          <p className="mt-4 text-sm text-brand-400">
            ACS is useful for accounts that want ongoing functional engagement with Oracle and use primarily standard NetSuite features. For accounts with significant SuiteScript customization or third-party integrations, ACS does not cover the work that generates most support requests.
          </p>
        </div>

        {/* Side-by-side comparison */}
        <div className="mt-14">
          <h2 className="text-lg font-semibold text-brand-900 mb-2">Oracle support vs. third-party managed support</h2>
          <p className="text-sm text-brand-400 mb-5">
            These two support resources are complementary, not substitutes. Most post-go-live accounts need both.
          </p>
          <div className="space-y-4">
            {SUPPORT_MODELS.map((model) => (
              <div key={model.name} className="rounded-2xl border border-brand-100 bg-white p-5 shadow-sm">
                <div className="flex flex-wrap items-start justify-between gap-2 mb-3">
                  <span className="font-semibold text-brand-900 text-sm">{model.name}</span>
                  <span className="text-xs font-medium text-brand-400 bg-brand-50 rounded-full px-2.5 py-0.5">{model.cost}</span>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <p className="text-xs font-semibold text-emerald-600 mb-1.5">Covers</p>
                    <p className="text-xs text-brand-600">{model.covers}</p>
                  </div>
                  <div>
                    <p className="text-xs font-semibold text-red-500 mb-1.5">Excludes</p>
                    <p className="text-xs text-brand-400">{model.excludes}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Practical examples */}
        <div className="mt-14">
          <h2 className="text-lg font-semibold text-brand-900 mb-2">Who resolves common support requests?</h2>
          <p className="text-sm text-brand-400 mb-5">
            Mapping typical post-go-live support requests to the resource that can actually resolve them.
          </p>
          <div className="overflow-x-auto rounded-2xl border border-brand-100">
            <table className="w-full text-sm min-w-[440px]">
              <thead>
                <tr className="border-b border-brand-100 bg-brand-50/50">
                  <th className="text-left p-4 font-semibold text-brand-900 w-2/5">Request</th>
                  <th className="text-center p-4 font-semibold text-brand-600 w-[20%]">Oracle support</th>
                  <th className="text-center p-4 font-semibold text-brand-600 w-[20%]">ACS</th>
                  <th className="text-center p-4 font-semibold text-accent w-[20%]">Third-party retainer</th>
                </tr>
              </thead>
              <tbody>
                {[
                  { request: "Native feature is not working as documented", oracle: true, acs: true, tp: true },
                  { request: "Client Script throwing an error", oracle: false, acs: false, tp: true },
                  { request: "Shopify integration not creating sales orders", oracle: false, acs: false, tp: true },
                  { request: "Approval workflow firing on wrong records", oracle: false, acs: false, tp: true },
                  { request: "Saved search formula returning incorrect results", oracle: false, acs: false, tp: true },
                  { request: "Invoice PDF missing data after upgrade", oracle: false, acs: false, tp: true },
                  { request: "Scheduled script hitting governance limits", oracle: false, acs: false, tp: true },
                  { request: "Custom field not appearing on a form", oracle: false, acs: false, tp: true },
                  { request: "Platform slowness affecting all users", oracle: true, acs: true, tp: false },
                  { request: "How does a native feature work?", oracle: true, acs: true, tp: true },
                ].map((row, i) => (
                  <tr key={row.request} className={i < 9 ? "border-b border-brand-100" : ""}>
                    <td className="p-4 text-brand-700 text-sm align-top">{row.request}</td>
                    <td className="p-4 text-center align-top">
                      {row.oracle
                        ? <CheckCircle2 className="h-4 w-4 text-emerald-500 mx-auto" />
                        : <XCircle className="h-4 w-4 text-brand-200 mx-auto" />}
                    </td>
                    <td className="p-4 text-center align-top">
                      {row.acs
                        ? <CheckCircle2 className="h-4 w-4 text-emerald-500 mx-auto" />
                        : <XCircle className="h-4 w-4 text-brand-200 mx-auto" />}
                    </td>
                    <td className="p-4 text-center align-top">
                      {row.tp
                        ? <CheckCircle2 className="h-4 w-4 text-emerald-500 mx-auto" />
                        : <XCircle className="h-4 w-4 text-brand-200 mx-auto" />}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Mid-page CTA */}
        <div className="mt-10 rounded-2xl border border-brand-100 bg-white p-5 shadow-soft">
          <p className="text-sm font-semibold text-brand-900 mb-1">Need support for the customization layer?</p>
          <p className="text-sm text-brand-400 mb-4">
            If the support requests your account generates are coming from scripts, integrations, or workflows, a managed retainer covers all of them at a fixed monthly cost.
          </p>
          <LeadFormLight />
        </div>

        {/* Why the gap exists */}
        <div className="mt-10">
          <h2 className="text-lg font-semibold text-brand-900 mb-4">Why does Oracle not cover customizations?</h2>
          <p className="text-sm text-brand-400 mb-3">
            Oracle&apos;s support model covers the platform it controls. SuiteScript code, SuiteFlow workflow logic, and integration connectors are written by third parties (implementation partners, consultants, or internal developers) and configured specifically for each customer account. Oracle has no visibility into these customizations and cannot be responsible for debugging code it did not write.
          </p>
          <p className="text-sm text-brand-400 mb-3">
            This is not a deficiency in Oracle&apos;s support model — it is the correct scope boundary for a platform vendor. The analogy is that AWS does not debug your application code; it supports the infrastructure your code runs on.
          </p>
          <p className="text-sm text-brand-400">
            The implication for post-go-live accounts is that the support resource responsible for the customization layer needs to be explicitly identified and engaged. That resource is typically a third-party managed support firm or a consulting partner retained for ongoing technical work.
          </p>
        </div>

        {/* Related reading */}
        <div className="mt-10 rounded-2xl border border-brand-100 bg-brand-50/30 p-5 sm:p-6">
          <p className="text-sm font-semibold text-brand-900 mb-3">Related reading</p>
          <ul className="space-y-2.5">
            <li className="text-sm text-brand-400">
              <Link href="/netsuite-support-comparison" className="text-accent hover:underline">
                NetSuite support options compared
              </Link>{" "}
              covers all five support models with a full feature comparison table.
            </li>
            <li className="text-sm text-brand-400">
              <Link href="/netsuite-managed-support" className="text-accent hover:underline">
                NetSuite managed support
              </Link>{" "}
              covers how a monthly retainer for the customization layer works in practice.
            </li>
            <li className="text-sm text-brand-400">
              <Link href="/netsuite-partner-replacement" className="text-accent hover:underline">
                NetSuite partner replacement
              </Link>{" "}
              covers the transition process for accounts that had an implementation partner handling post-go-live support who is now unresponsive.
            </li>
            <li className="text-sm text-brand-400">
              <Link href="/netsuite-upgrade-preparation" className="text-accent hover:underline">
                NetSuite upgrade preparation
              </Link>{" "}
              covers the six-phase pre-upgrade process, including which testing phases Oracle does not perform on your behalf.
            </li>
          </ul>
        </div>

        <ServiceFaqSection items={FAQ} />

        <div className="mt-10 rounded-2xl border border-brand-100 bg-white p-5 shadow-soft">
          <p className="text-sm font-semibold text-brand-900 mb-1">Ready to put support in place for the customization layer?</p>
          <p className="text-sm text-brand-400 mb-4">
            Tell us about your account. We will confirm what is and is not covered by your current Oracle support and scope what a retainer would cover.
          </p>
          <LeadFormLight />
        </div>
      </div>
    </main>
  );
}

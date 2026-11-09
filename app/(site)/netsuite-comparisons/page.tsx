import type { Metadata } from "next";
import Link from "next/link";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { BreadcrumbJsonLd, OrganizationJsonLd } from "@/components/seo/JsonLd";
import { LeadFormLight } from "@/components/sections/LeadFormLight";
import { COMPARISONS, COMPARISON_GROUPS } from "@/lib/comparisons";
import { SITE_URL } from "@/lib/content";
import { SEO_YEAR, YEAR_REVIEWED } from "@/lib/seo-year";
import { ogImages } from "@/lib/og";

const TITLE = `NetSuite Comparison Guides for ${SEO_YEAR}: Native, Custom, Vendors`;
const DESCRIPTION =
  "34 NetSuite comparison guides for live accounts: support models, SuiteFlow vs. SuiteScript, native modules vs. third-party tools, construction, manufacturing.";

const DECISIONS: Record<string, string> = {
  support: "Who should run and develop your NetSuite account after go-live",
  platform: "Which NetSuite tool or build approach fits a specific requirement",
  finance: "Whether a native NetSuite finance module is enough or a third-party tool is needed",
  construction: "What native NetSuite covers for construction billing and job cost, and what needs custom work",
  manufacturing: "Which costing, tracking and planning approach fits your operation",
};

export const metadata: Metadata = {
  title: { absolute: TITLE },
  description: DESCRIPTION,
  alternates: { canonical: "/netsuite-comparisons" },
  openGraph: {
    title: TITLE,
    description: DESCRIPTION,
    url: `${SITE_URL}/netsuite-comparisons`,
    type: "website",
    images: ogImages(`NetSuite Comparison Guides for ${SEO_YEAR}`, "Comparison"),
  },
};

export default function NetSuiteComparisonsPage() {
  return (
    <main className="pt-32 pb-24 sm:pt-40 sm:pb-32">
      <BreadcrumbJsonLd
        items={[
          { name: "Home", url: SITE_URL },
          { name: "NetSuite Comparison Guides", url: `${SITE_URL}/netsuite-comparisons` },
        ]}
      />
      <OrganizationJsonLd />

      <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
        <SectionHeading
          as="h1"
          eyebrow="Comparison guides"
          title={`NetSuite Comparison Guides for ${SEO_YEAR}`}
          subtitle="Side-by-side guides for the decisions companies face after go-live: which support model to use, configuration or customization, and when a native NetSuite module is enough."
          align="left"
        />
        <p className="mt-1 text-xs text-brand-300">Reviewed for {SEO_YEAR} · Updated {YEAR_REVIEWED}</p>

        <div className="mt-6 rounded-2xl border-l-4 border-accent bg-brand-50/50 p-5">
          <p className="text-xs font-semibold uppercase tracking-wide text-accent mb-2">Quick answer</p>
          <p className="text-sm text-brand-700 leading-relaxed">
            NetSuite comparison guides are side-by-side breakdowns of the choices a company faces after go-live: which
            support model to use, whether to configure or customize, and whether a native NetSuite module is enough or a
            third-party tool or custom SuiteScript is needed. SuitePacific publishes 34 of these guides across five areas:
            support models and partners, platform and development, finance and accounting, construction, and
            manufacturing and inventory. The guides are written for companies already running NetSuite rather than
            companies still selecting an ERP. Most of them compare what NetSuite provides natively with what SuiteFlow,
            SuiteScript, or a dedicated third-party tool adds, so the decision usually comes down to three paths: use
            what NetSuite provides, extend it with SuiteFlow or SuiteScript, or integrate a dedicated tool. If a guide
            matches your situation but the answer depends on how your account is configured, SuitePacific can review it
            with you in a free consultation.
          </p>
        </div>

        <div className="mt-6 rounded-2xl border border-brand-100 bg-white p-5 shadow-soft">
          <p className="text-sm text-brand-600 mb-3">Not sure which option fits your account? Tell us what you are deciding.</p>
          <LeadFormLight />
        </div>

        <div data-section="decision-areas" className="mt-14">
          <h2 className="text-xl font-semibold text-brand-900">Which NetSuite decision are you making?</h2>
          <div className="mt-5 overflow-x-auto rounded-2xl border border-brand-100">
            <table className="w-full text-sm">
              <thead>
                <tr className="bg-brand-50 text-left">
                  <th className="px-4 py-3 font-semibold text-brand-900">Area</th>
                  <th className="px-4 py-3 font-semibold text-brand-900">Guides</th>
                  <th className="px-4 py-3 font-semibold text-brand-900">The decision it answers</th>
                </tr>
              </thead>
              <tbody>
                {COMPARISON_GROUPS.map((g) => (
                  <tr key={g.id} className="border-t border-brand-100 align-top">
                    <td className="px-4 py-3 font-medium text-brand-900">
                      <a href={`#${g.id}`} className="text-accent hover:underline">{g.label}</a>
                    </td>
                    <td className="px-4 py-3 text-brand-600 tabular-nums">
                      {COMPARISONS.filter((c) => c.group === g.id).length}
                    </td>
                    <td className="px-4 py-3 text-brand-600">{DECISIONS[g.id]}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {COMPARISON_GROUPS.map((g) => (
          <section key={g.id} id={g.id} data-section={`comparisons-${g.id}`} className="mt-14 scroll-mt-28">
            <h2 className="text-xl font-semibold text-brand-900">{g.label}</h2>
            <p className="mt-1 text-sm text-brand-400">{DECISIONS[g.id]}.</p>
            <ul className="mt-5 grid grid-cols-1 sm:grid-cols-2 gap-4">
              {COMPARISONS.filter((c) => c.group === g.id).map((c) => (
                <li key={c.href}>
                  <Link
                    href={c.href}
                    className="block h-full rounded-2xl border border-brand-100 bg-white p-5 shadow-soft hover:border-accent/40 transition-colors"
                  >
                    <p className="text-sm font-semibold text-brand-900">{c.title}</p>
                    <p className="mt-2 text-sm text-brand-400 leading-relaxed">{c.summary}</p>
                  </Link>
                </li>
              ))}
            </ul>
          </section>
        ))}

        <div className="mt-14 rounded-2xl border border-brand-100 bg-brand-50/30 p-5 sm:p-6">
          <p className="text-sm font-semibold text-brand-900 mb-3">Related reading</p>
          <ul className="space-y-2.5 text-sm text-brand-400">
            <li>
              <Link href="/netsuite-managed-services-pricing" className="text-accent hover:underline">NetSuite managed services pricing</Link>{" "}
              lists published plan prices, hours and what each plan covers.
            </li>
            <li>
              <Link href="/netsuite-post-go-live-support" className="text-accent hover:underline">NetSuite post-go-live support</Link>{" "}
              explains what ongoing support covers once the implementation ends.
            </li>
            <li>
              <Link href="/netsuite-suitescript-development" className="text-accent hover:underline">NetSuite SuiteScript development</Link>{" "}
              covers the custom builds that most of these guides recommend when native features stop short.
            </li>
          </ul>
        </div>

        <div className="mt-14 rounded-2xl border border-brand-100 bg-white p-5 shadow-soft">
          <p className="text-base font-semibold text-brand-900">Need a second opinion on your account?</p>
          <p className="mt-1 mb-4 text-sm text-brand-600">
            Leave your work email. We reply within one business day to set up a free consultation.
          </p>
          <LeadFormLight />
        </div>
      </div>
    </main>
  );
}

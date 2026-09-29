import type { Metadata } from "next";
import Link from "next/link";
import { ExternalLink } from "lucide-react";
import { BreadcrumbJsonLd } from "@/components/seo/JsonLd";
import { SITE_URL } from "@/lib/content";

const PRESS_RELEASES = [
  {
    date: "September 29, 2026",
    dateISO: "2026-09-29",
    headline:
      "SuitePacific Introduces Dedicated Post-Go-Live NetSuite Support for Growing Businesses",
    source: "ABNewswire",
    excerpt:
      "SuitePacific introduces dedicated post-go-live NetSuite support for growing businesses seeking specialized expertise across SuiteScript development, integrations, workflow automation, reporting, saved searches, administration and ongoing technical support through a flexible, cost-conscious consulting model.",
    href: "https://www.abnewswire.com/pressreleases/suitepacific-introduces-dedicated-postgolive-netsuite-support-for-growing-businesses_838766.html",
  },
];

export const metadata: Metadata = {
  title: "SuitePacific Press Releases | Post-Go-Live NetSuite",
  description:
    "Press releases from SuitePacific, a NetSuite post-go-live consulting firm. SuiteScript development, integrations, workflow automation, and ongoing support.",
  alternates: { canonical: "/press" },
  openGraph: {
    title: "SuitePacific Press Releases | Post-Go-Live NetSuite",
    description:
      "Press releases from SuitePacific, a NetSuite post-go-live consulting firm. SuiteScript development, integrations, workflow automation, and ongoing support.",
    url: "https://suitepacific.com/press",
    type: "website",
    images: [{ url: "https://suitepacific.com/og-default.png", width: 1200, height: 630 }],
  },
};

function ItemListJsonLd() {
  const data = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: "SuitePacific Press Releases",
    itemListElement: PRESS_RELEASES.map((release, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: release.headline,
      url: release.href,
    })),
  };
  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }} />;
}

export default function PressPage() {
  return (
    <main className="pt-32 pb-24 sm:pt-40 sm:pb-32">
      <ItemListJsonLd />
      <BreadcrumbJsonLd
        items={[
          { name: "Home", url: SITE_URL },
          { name: "Press", url: `${SITE_URL}/press` },
        ]}
      />

      <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
        <p className="text-xs font-semibold uppercase tracking-widest text-accent mb-3">
          Newsroom
        </p>
        <h1 className="text-3xl sm:text-4xl font-bold text-brand-900 leading-tight">Press</h1>
        <p className="mt-4 text-brand-400 leading-relaxed max-w-xl">
          SuitePacific is a boutique NetSuite consulting firm specializing in post-go-live support
          for businesses already live on NetSuite. Services include SuiteScript development,
          workflow automation, integrations, reporting, and ongoing account optimization.
        </p>

        <div className="mt-12 space-y-6">
          {PRESS_RELEASES.map((release) => (
            <article
              key={release.href}
              className="border border-brand-100 rounded-xl p-6 sm:p-8 bg-white hover:border-brand-200 transition-colors"
            >
              <div className="flex items-center gap-2">
                <time
                  dateTime={release.dateISO}
                  className="text-xs font-medium text-brand-300 uppercase tracking-wide"
                >
                  {release.date}
                </time>
                <span className="text-brand-200 text-xs">&middot;</span>
                <span className="text-xs text-brand-300">{release.source}</span>
              </div>
              <h2 className="mt-3 text-lg font-semibold text-brand-900 leading-snug">
                {release.headline}
              </h2>
              <p className="mt-3 text-sm text-brand-500 leading-relaxed">{release.excerpt}</p>
              <Link
                href={release.href}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-4 inline-flex items-center gap-1.5 text-sm font-medium text-accent hover:underline"
              >
                Read full release
                <ExternalLink className="h-3.5 w-3.5" />
              </Link>
            </article>
          ))}
        </div>

        <div className="mt-16 pt-8 border-t border-brand-50">
          <p className="text-sm text-brand-400">
            For media inquiries, contact{" "}
            <a href="mailto:info@suitepacific.com" className="text-accent hover:underline">
              info@suitepacific.com
            </a>
            .
          </p>
          <div className="mt-6 flex flex-col sm:flex-row flex-wrap gap-3 sm:gap-6 text-sm">
            <Link
              href="/netsuite-post-go-live-support"
              className="text-brand-600 hover:text-accent hover:underline"
            >
              Post-Go-Live NetSuite Support
            </Link>
            <Link
              href="/netsuite-care"
              className="text-brand-600 hover:text-accent hover:underline"
            >
              NetSuite Care Plans
            </Link>
            <Link href="/contact" className="text-brand-600 hover:text-accent hover:underline">
              Contact
            </Link>
          </div>
        </div>
      </div>
    </main>
  );
}

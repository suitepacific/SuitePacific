import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Badge } from "@/components/ui/Badge";
import { Card } from "@/components/ui/Card";
import { BreadcrumbJsonLd } from "@/components/seo/JsonLd";
import { SITE_URL, LEGAL_NAME } from "@/lib/content";
import { getAllResourceSlugs, getAllResources, getResourceBySlug } from "@/lib/resources";
import { LeadFormLight } from "@/components/sections/LeadFormLight";

export function generateStaticParams() {
  return getAllResourceSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const resource = await getResourceBySlug(slug);
  if (!resource) return {};
  return {
    title: `${resource.title}`,
    description: resource.description,
    alternates: { canonical: `/resources/${slug}` },
    openGraph: {
      title: resource.title,
      description: resource.description,
      type: "article",
      publishedTime: resource.publishedAt,
      url: `${SITE_URL}/resources/${slug}`,
      images: [{ url: "/og-default.png", width: 1200, height: 630 }],
    },
  };
}

export default async function ResourcePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const resource = await getResourceBySlug(slug);
  if (!resource) notFound();

  const related = getAllResources()
    .filter((r) => r.slug !== slug && r.category === resource.category)
    .slice(0, 2);

  return (
    <main className="pt-32 pb-24 sm:pt-40 sm:pb-32">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "TechArticle",
            "@id": `${SITE_URL}/resources/${slug}#article`,
            url: `${SITE_URL}/resources/${slug}`,
            headline: resource.title,
            description: resource.description,
            isAccessibleForFree: true,
            speakable: { "@type": "SpeakableSpecification", cssSelector: ["h1", "h2"] },
            image: { "@type": "ImageObject", url: `${SITE_URL}/og-default.png`, width: 1200, height: 630 },
            datePublished: resource.publishedAt,
            dateModified: resource.updatedAt ?? resource.publishedAt,
            author: { "@type": "Organization", "@id": `${SITE_URL}/#organization`, name: LEGAL_NAME },
            publisher: {
              "@type": "Organization",
              "@id": `${SITE_URL}/#organization`,
              name: LEGAL_NAME,
              logo: { "@type": "ImageObject", url: `${SITE_URL}/logo-icon.png`, width: 256, height: 256 },
            },
            mainEntityOfPage: { "@type": "WebPage", "@id": `${SITE_URL}/resources/${slug}` },
          }),
        }}
      />
      <BreadcrumbJsonLd
        items={[
          { name: "Home", url: SITE_URL },
          { name: "Resources", url: `${SITE_URL}/resources` },
          { name: resource.title, url: `${SITE_URL}/resources/${slug}` },
        ]}
      />

      <article className="mx-auto max-w-2xl px-6 lg:px-8">
        <Link
          href="/resources"
          className="inline-flex items-center gap-1.5 text-sm text-brand-400 hover:text-brand-600 transition-colors"
        >
          <ArrowLeft className="h-4 w-4" />
          All resources
        </Link>

        <div className="mt-6 flex items-center gap-2 flex-wrap">
          <Badge>{resource.category}</Badge>
          {resource.tags.filter((t) => t !== resource.category).map((tag) => (
            <Badge key={tag}>{tag}</Badge>
          ))}
        </div>

        <h1 className="mt-4 text-3xl sm:text-4xl font-semibold tracking-tight text-brand-900 text-balance">
          {resource.title}
        </h1>

        <div className="mt-3 text-sm text-brand-400">
          {resource.readingTime}
          {resource.linkedinDay && (
            <span className="ml-3 text-brand-300">· Part of the 100 NetSuite Tips series</span>
          )}
        </div>

        {/* Early callout, catches readers before they scroll */}
        <div className="mt-8 rounded-xl bg-brand-50/60 border border-brand-100 px-5 py-4">
          <p className="text-sm text-brand-600 mb-3">Need help applying this in your account?</p>
          <LeadFormLight />
        </div>

        <div className="overflow-x-auto">
          <div
            className="prose prose-blue mt-10 max-w-none prose-headings:font-semibold prose-headings:text-brand-900 prose-p:text-brand-400 prose-a:text-accent prose-a:no-underline hover:prose-a:underline prose-strong:text-brand-900 prose-code:text-accent prose-code:bg-brand-50 prose-code:px-1 prose-code:py-0.5 prose-code:rounded prose-code:text-sm prose-code:font-mono"
            dangerouslySetInnerHTML={{ __html: resource.contentHtml }}
          />
        </div>

        {related.length > 0 && (
          <div className="mt-14 pt-10 border-t border-brand-50">
            <h2 className="text-sm font-semibold text-brand-900 uppercase tracking-wide">
              Related Resources
            </h2>
            <div className="mt-5 grid sm:grid-cols-2 gap-4">
              {related.map((r) => (
                <Link key={r.slug} href={`/resources/${r.slug}`}>
                  <Card className="p-5 h-full hover:shadow-soft-lg hover:border-brand-100 transition-shadow">
                    <Badge>{r.category}</Badge>
                    <h3 className="mt-3 font-semibold text-brand-900 text-sm text-balance">{r.title}</h3>
                    <p className="mt-1.5 text-sm text-brand-400 line-clamp-2">{r.description}</p>
                  </Card>
                </Link>
              ))}
            </div>
          </div>
        )}

        <div className="mt-14 pt-10 border-t border-brand-50">
          <p className="text-brand-900 font-semibold">Need help applying this in your account?</p>
          <p className="mt-2 text-sm text-brand-400">
            We work with post-go-live NetSuite accounts every day. Tell us what you&apos;re working on.
          </p>
          <div className="mt-5">
            <LeadFormLight />
          </div>
        </div>
      </article>
    </main>
  );
}

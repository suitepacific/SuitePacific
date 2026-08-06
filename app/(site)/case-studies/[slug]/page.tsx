import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { CheckCircle2 } from "lucide-react";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { BreadcrumbJsonLd } from "@/components/seo/JsonLd";
import { SITE_URL, LEGAL_NAME } from "@/lib/content";
import { CASE_STUDIES_DETAIL, getCaseStudy, getAllCaseStudySlugs } from "@/lib/case-studies";

export function generateStaticParams() {
  return getAllCaseStudySlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const cs = getCaseStudy(slug);
  if (!cs) return {};
  return {
    title: `${cs.title}`,
    description: cs.metaDescription,
    alternates: { canonical: `/case-studies/${slug}` },
  };
}

export default async function CaseStudyPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const cs = getCaseStudy(slug);
  if (!cs) notFound();

  const others = CASE_STUDIES_DETAIL.filter((c) => c.slug !== slug).slice(0, 2);

  return (
    <main className="pt-32 pb-24 sm:pt-40 sm:pb-32">
      <BreadcrumbJsonLd
        items={[
          { name: "Home", url: SITE_URL },
          { name: "Case Studies", url: `${SITE_URL}/case-studies` },
          { name: cs.title, url: `${SITE_URL}/case-studies/${slug}` },
        ]}
      />

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Article",
            headline: cs.title,
            description: cs.metaDescription,
            image: { "@type": "ImageObject", url: `${SITE_URL}/og-default.png`, width: 1200, height: 630 },
            datePublished: cs.publishedAt,
            dateModified: cs.publishedAt,
            author: { "@type": "Organization", name: LEGAL_NAME },
            publisher: {
              "@type": "Organization",
              name: LEGAL_NAME,
              logo: { "@type": "ImageObject", url: `${SITE_URL}/logo-icon.png` },
            },
            mainEntityOfPage: {
              "@type": "WebPage",
              "@id": `${SITE_URL}/case-studies/${slug}`,
            },
          }),
        }}
      />

      <div className="mx-auto max-w-3xl px-6 lg:px-8">
        {/* Header */}
        <div className="flex items-center gap-2 flex-wrap mb-6">
          {cs.tags.map((tag) => (
            <Badge key={tag}>{tag}</Badge>
          ))}
        </div>

        <SectionHeading
          as="h1"
          eyebrow="Case Study"
          title={cs.title}
          subtitle={cs.cardChallenge}
          align="left"
        />

        {/* Challenge */}
        <div className="prose prose-blue mt-12 max-w-none prose-headings:font-semibold prose-headings:text-brand-900 prose-p:text-brand-400 prose-a:text-accent prose-a:no-underline hover:prose-a:underline prose-strong:text-brand-900">
          <h2>The challenge</h2>
          {cs.sections.challenge.map((p, i) => (
            <p key={i}>{p}</p>
          ))}

          <h2>What we built</h2>
          {cs.sections.solution.map((p, i) => (
            <p key={i}>{p}</p>
          ))}

          <h2>The result</h2>
          {cs.sections.outcome.map((p, i) => (
            <p key={i}>{p}</p>
          ))}
        </div>

        {/* Related services */}
        <div className="mt-10 pt-8 border-t border-brand-50">
          <p className="text-sm font-semibold text-brand-900 mb-4">Related services</p>
          <div className="flex flex-wrap gap-3">
            {cs.relatedServices.map((s) => (
              <Link
                key={s.href}
                href={s.href}
                className="flex items-center gap-2 text-sm text-accent hover:underline"
              >
                <CheckCircle2 className="h-4 w-4 shrink-0" />
                {s.label}
              </Link>
            ))}
          </div>
        </div>

        {/* Other case studies */}
        {others.length > 0 && (
          <div className="mt-12 pt-8 border-t border-brand-50">
            <p className="text-sm font-semibold text-brand-900 mb-5">More case studies</p>
            <div className="grid sm:grid-cols-2 gap-4">
              {others.map((other) => (
                <Link
                  key={other.slug}
                  href={`/case-studies/${other.slug}`}
                  className="block rounded-xl border border-brand-100 bg-brand-50/40 p-5 hover:border-brand-200 hover:shadow-soft transition-shadow"
                >
                  <div className="flex gap-2 flex-wrap mb-2">
                    {other.tags.map((t) => (
                      <Badge key={t}>{t}</Badge>
                    ))}
                  </div>
                  <p className="text-sm font-semibold text-brand-900">{other.title}</p>
                  <p className="mt-1 text-xs text-brand-400 line-clamp-2">{other.cardChallenge}</p>
                </Link>
              ))}
            </div>
          </div>
        )}

        {/* CTA */}
        <div className="mt-14 pt-10 border-t border-brand-50 text-center">
          <p className="text-brand-900 font-semibold">Have a similar challenge?</p>
          <p className="mt-2 text-sm text-brand-400">
            Most engagements start with a conversation about what&apos;s not working. Book a free
            call and we&apos;ll tell you what&apos;s realistic.
          </p>
          <div className="mt-6">
            <Button href="/contact">Book a Free Consultation</Button>
          </div>
        </div>
      </div>
    </main>
  );
}

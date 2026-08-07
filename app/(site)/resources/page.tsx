import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Card } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import { BreadcrumbJsonLd } from "@/components/seo/JsonLd";
import { SITE_URL } from "@/lib/content";
import { getAllResources, RESOURCE_CATEGORIES } from "@/lib/resources";

export const metadata: Metadata = {
  title: "NetSuite Resources",
  description:
    "Practical NetSuite reference articles: SuiteScript best practices, performance optimization, workflow automation, saved searches, and administration guides for post-go-live accounts.",
  alternates: { canonical: "/resources" },
};

export default async function ResourcesIndexPage({
  searchParams,
}: {
  searchParams: Promise<{ category?: string }>;
}) {
  const { category } = await searchParams;
  const activeCategory = category && RESOURCE_CATEGORIES.includes(category as never) ? category : "All";
  const allResources = getAllResources();
  const filtered =
    activeCategory === "All"
      ? allResources
      : allResources.filter((r) => r.category === activeCategory);

  return (
    <main className="pt-32 pb-24 sm:pt-40 sm:pb-32">
      <BreadcrumbJsonLd
        items={[
          { name: "Home", url: SITE_URL },
          { name: "Resources", url: `${SITE_URL}/resources` },
        ]}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "CollectionPage",
            url: `${SITE_URL}/resources`,
            name: "NetSuite Resources",
            description: "Practical NetSuite reference articles: SuiteScript best practices, performance optimization, workflow automation, saved searches, and administration guides for post-go-live accounts.",
            publisher: { "@type": "Organization", name: "SuitePacific", "@id": `${SITE_URL}/#organization` },
          }),
        }}
      />

      <div className="mx-auto max-w-5xl px-6 lg:px-8">
        <SectionHeading
          as="h1"
          eyebrow="Knowledge Base"
          title="NetSuite Resources"
          subtitle="Reference articles for NetSuite developers and administrators: SuiteScript patterns, performance optimization, workflow design, and more."
          align="left"
        />

        {/* Category filter */}
        <div className="mt-10 flex flex-wrap gap-2">
          {RESOURCE_CATEGORIES.map((cat) => (
            <Link
              key={cat}
              href={cat === "All" ? "/resources" : `/resources?category=${encodeURIComponent(cat)}`}
              className={`px-3.5 py-1.5 rounded-full text-sm font-medium transition-colors ${
                activeCategory === cat
                  ? "bg-accent text-white"
                  : "bg-brand-50 text-brand-400 hover:bg-brand-100 hover:text-brand-600"
              }`}
            >
              {cat}
            </Link>
          ))}
        </div>

        {filtered.length === 0 ? (
          <p className="mt-14 text-sm text-brand-400">No resources in this category yet.</p>
        ) : (
          <div className="mt-10 grid sm:grid-cols-2 gap-6">
            {filtered.map((resource) => (
              <Link key={resource.slug} href={`/resources/${resource.slug}`}>
                <Card className="p-6 h-full flex flex-col hover:shadow-soft-lg hover:border-brand-100 transition-shadow">
                  <div className="flex items-center gap-2 flex-wrap">
                    <Badge>{resource.category}</Badge>
                    {resource.tags.filter((t) => t !== resource.category).slice(0, 2).map((tag) => (
                      <Badge key={tag}>{tag}</Badge>
                    ))}
                  </div>
                  <h2 className="mt-4 font-semibold text-lg text-brand-900 text-balance">
                    {resource.title}
                  </h2>
                  <p className="mt-2 text-sm text-brand-400 flex-1">{resource.description}</p>
                  <div className="mt-5 flex items-center justify-between text-xs text-brand-400">
                    <span>{resource.readingTime}</span>
                    <ArrowRight className="h-4 w-4 text-accent shrink-0" />
                  </div>
                </Card>
              </Link>
            ))}
          </div>
        )}
      </div>
    </main>
  );
}

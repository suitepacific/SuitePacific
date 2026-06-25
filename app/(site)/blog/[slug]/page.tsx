import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { BlogPostingJsonLd, BreadcrumbJsonLd } from "@/components/seo/JsonLd";
import { getAllSlugs, getPostBySlug } from "@/lib/blog";
import { SITE_URL } from "@/lib/content";

export async function generateStaticParams() {
  const slugs = await getAllSlugs();
  return slugs.map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const post = await getPostBySlug(slug);
  if (!post) return {};

  return {
    title: post.title,
    description: post.description,
    alternates: { canonical: `/blog/${post.slug}` },
    openGraph: {
      title: post.title,
      description: post.description,
      type: "article",
      publishedTime: post.date,
      url: `${SITE_URL}/blog/${post.slug}`,
    },
  };
}

export default async function BlogPostPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = await getPostBySlug(slug);
  if (!post) notFound();

  return (
    <main className="pt-32 pb-24 sm:pt-40 sm:pb-32">
      <BlogPostingJsonLd post={post} />
      <BreadcrumbJsonLd
        items={[
          { name: "Home", url: SITE_URL },
          { name: "Blog", url: `${SITE_URL}/blog` },
          { name: post.title, url: `${SITE_URL}/blog/${post.slug}` },
        ]}
      />

      <article className="mx-auto max-w-2xl px-6 lg:px-8">
        <Link href="/blog" className="inline-flex items-center gap-1.5 text-sm text-brand-400 hover:text-brand-600 transition-colors">
          <ArrowLeft className="h-4 w-4" />
          Back to blog
        </Link>

        <div className="mt-6 flex items-center gap-2 flex-wrap">
          {post.tags.map((tag) => (
            <Badge key={tag}>{tag}</Badge>
          ))}
        </div>

        <h1 className="mt-4 text-3xl sm:text-4xl font-semibold tracking-tight text-brand-900 text-balance">
          {post.title}
        </h1>

        <div className="mt-4 text-sm text-brand-300">
          {new Date(post.date).toLocaleDateString("en-US", {
            month: "long",
            day: "numeric",
            year: "numeric",
          })}{" "}
          · {post.readingTime}
        </div>

        <div
          className="prose prose-blue mt-10 max-w-none prose-headings:font-semibold prose-headings:text-brand-900 prose-a:text-accent prose-a:no-underline hover:prose-a:underline prose-strong:text-brand-900"
          dangerouslySetInnerHTML={{ __html: post.contentHtml }}
        />

        <div className="mt-14 pt-10 border-t border-brand-50 text-center">
          <p className="text-brand-900 font-semibold">Have a NetSuite challenge like this?</p>
          <p className="mt-2 text-sm text-brand-400">
            We can take a look and tell you exactly what we&apos;d do.
          </p>
          <div className="mt-6">
            <Button href="/#contact">Book a Free Consultation</Button>
          </div>
        </div>
      </article>
    </main>
  );
}

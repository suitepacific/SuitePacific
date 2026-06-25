import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Card } from "@/components/ui/Card";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Badge } from "@/components/ui/Badge";
import { getAllPosts } from "@/lib/blog";

export const metadata: Metadata = {
  title: "NetSuite Tips & Tricks Blog",
  description:
    "Practical NetSuite tips, SuiteScript best practices, and workflow automation advice for teams managing NetSuite after go-live.",
  alternates: { canonical: "/blog" },
};

export default async function BlogIndexPage() {
  const posts = await getAllPosts();

  return (
    <main className="pt-32 pb-24 sm:pt-40 sm:pb-32">
      <div className="mx-auto max-w-5xl px-6 lg:px-8">
        <SectionHeading
          eyebrow="The SuitePacific Blog"
          title="NetSuite Tips & Tricks"
          subtitle="Practical advice for teams managing NetSuite after go-live: saved searches, SuiteScript, workflow automation, and more."
          align="left"
        />

        <div className="mt-14 grid sm:grid-cols-2 gap-6">
          {posts.map((post) => (
            <Link key={post.slug} href={`/blog/${post.slug}`}>
              <Card className="p-6 h-full flex flex-col hover:shadow-soft-lg hover:border-brand-100 transition-shadow">
                <div className="flex items-center gap-2 flex-wrap">
                  {post.tags.map((tag) => (
                    <Badge key={tag}>{tag}</Badge>
                  ))}
                </div>
                <h2 className="mt-4 font-semibold text-lg text-brand-900">{post.title}</h2>
                <p className="mt-2 text-sm text-brand-400 flex-1">{post.description}</p>
                <div className="mt-5 flex items-center justify-between text-xs text-brand-300">
                  <span>
                    {new Date(post.date).toLocaleDateString("en-US", {
                      month: "long",
                      day: "numeric",
                      year: "numeric",
                    })}{" "}
                    · {post.readingTime}
                  </span>
                  <ArrowRight className="h-4 w-4 text-accent" />
                </div>
              </Card>
            </Link>
          ))}
        </div>
      </div>
    </main>
  );
}

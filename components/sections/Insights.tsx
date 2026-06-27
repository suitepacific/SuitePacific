import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Card } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { StaggerGroup, StaggerItem } from "@/components/motion/StaggerGroup";
import type { BlogPostMeta } from "@/lib/types";

export function Insights({ posts }: { posts: BlogPostMeta[] }) {
  if (posts.length === 0) return null;

  return (
    <section id="insights" className="py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <SectionHeading
          eyebrow="From the Blog"
          title="Latest Insights"
          subtitle="Practical NetSuite tips and tricks from the work we do every week."
        />

        <StaggerGroup className="mt-14 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {posts.map((post) => (
            <StaggerItem key={post.slug}>
              <Link href={`/blog/${post.slug}`} className="block h-full">
                <Card className="p-6 h-full flex flex-col hover:shadow-soft-lg hover:border-brand-100 transition-shadow">
                  <div className="flex items-center gap-2 flex-wrap">
                    {post.tags[0] && <Badge>{post.tags[0]}</Badge>}
                    <span className="text-xs text-brand-300">{post.readingTime}</span>
                  </div>
                  <h3 className="mt-4 font-semibold text-brand-900">{post.title}</h3>
                  <p className="mt-2 text-sm text-brand-400 flex-1">{post.description}</p>
                  <span className="mt-5 inline-flex items-center gap-1.5 text-sm font-medium text-accent">
                    Read More <ArrowRight className="h-3.5 w-3.5" />
                  </span>
                </Card>
              </Link>
            </StaggerItem>
          ))}
        </StaggerGroup>

        <div className="mt-10 text-center">
          <Button href="/blog" variant="secondary">
            View All Articles
          </Button>
        </div>
      </div>
    </section>
  );
}

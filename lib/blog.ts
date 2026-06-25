import { marked } from "marked";
import readingTime from "reading-time";
import { prisma } from "./prisma";
import type { BlogPost, BlogPostMeta } from "./types";

function toTags(tags: string): string[] {
  return tags
    .split(",")
    .map((t) => t.trim())
    .filter(Boolean);
}

export async function getAllSlugs(): Promise<string[]> {
  const posts = await prisma.post.findMany({
    where: { published: true },
    select: { slug: true },
  });
  return posts.map((p) => p.slug);
}

export async function getAllPosts(): Promise<BlogPostMeta[]> {
  const posts = await prisma.post.findMany({
    where: { published: true },
    orderBy: { date: "desc" },
  });

  return posts.map((post) => ({
    slug: post.slug,
    title: post.title,
    description: post.description,
    date: post.date.toISOString(),
    tags: toTags(post.tags),
    readingTime: readingTime(post.content).text,
  }));
}

export async function getPostBySlug(slug: string): Promise<BlogPost | null> {
  const post = await prisma.post.findUnique({ where: { slug, published: true } });
  if (!post) return null;

  return {
    slug: post.slug,
    title: post.title,
    description: post.description,
    date: post.date.toISOString(),
    tags: toTags(post.tags),
    readingTime: readingTime(post.content).text,
    contentHtml: marked.parse(post.content, { async: false }) as string,
  };
}

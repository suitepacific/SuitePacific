import fs from "fs";
import path from "path";
import matter from "gray-matter";
import readingTime from "reading-time";
import { parseMarkdown } from "./markdown";

const RESOURCES_DIR = path.join(process.cwd(), "content/resources");

export const RESOURCE_CATEGORIES = [
  "All",
  "SuiteScript",
  "Map/Reduce",
  "Workflow Automation",
  "Saved Searches",
  "Administration",
  "Performance",
] as const;

export type ResourceCategory = (typeof RESOURCE_CATEGORIES)[number];

export type ResourceMeta = {
  slug: string;
  title: string;
  description: string;
  category: string;
  tags: string[];
  publishedAt: string;
  linkedinDay?: number;
  readingTime: string;
};

export type Resource = ResourceMeta & {
  contentHtml: string;
};

export function getAllResourceSlugs(): string[] {
  if (!fs.existsSync(RESOURCES_DIR)) return [];
  return fs
    .readdirSync(RESOURCES_DIR)
    .filter((f) => f.endsWith(".md"))
    .map((f) => f.replace(/\.md$/, ""));
}

export function getAllResources(): ResourceMeta[] {
  const slugs = getAllResourceSlugs();
  return slugs
    .map((slug) => {
      const raw = fs.readFileSync(path.join(RESOURCES_DIR, `${slug}.md`), "utf-8");
      const { data, content } = matter(raw);
      return {
        slug,
        title: data.title as string,
        description: data.description as string,
        category: data.category as string,
        tags: (data.tags as string[]) ?? [],
        publishedAt: data.publishedAt as string,
        linkedinDay: data.linkedinDay as number | undefined,
        readingTime: readingTime(content).text,
      };
    })
    .sort((a, b) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime());
}

export async function getResourceBySlug(slug: string): Promise<Resource | null> {
  const filePath = path.join(RESOURCES_DIR, `${slug}.md`);
  if (!fs.existsSync(filePath)) return null;
  const raw = fs.readFileSync(filePath, "utf-8");
  const { data, content } = matter(raw);
  return {
    slug,
    title: data.title as string,
    description: data.description as string,
    category: data.category as string,
    tags: (data.tags as string[]) ?? [],
    publishedAt: data.publishedAt as string,
    linkedinDay: data.linkedinDay as number | undefined,
    readingTime: readingTime(content).text,
    contentHtml: await parseMarkdown(content),
  };
}

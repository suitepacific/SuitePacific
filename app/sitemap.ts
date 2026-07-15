import type { MetadataRoute } from "next";
import { getAllPosts } from "@/lib/blog";
import { SITE_URL } from "@/lib/content";
import { getAllCaseStudySlugs } from "@/lib/case-studies";
import { getAllResourceSlugs } from "@/lib/resources";

const SITE_LAUNCH_DATE = new Date("2026-06-01");

const SERVICE_PAGES = [
  "/hire-netsuite-developer",
  "/partners",
  "/contact",
  "/netsuite-integrations",
  "/netsuite-suitescript-development",
  "/netsuite-workflow-automation",
  "/netsuite-saved-searches-dashboards",
  "/netsuite-advanced-pdf-templates",
  "/netsuite-administrator-support",
  "/netsuite-account-optimization",
  "/netsuite-post-go-live-support",
  "/netsuite-implementation-partner-vs-managed-support",
];

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const posts = await getAllPosts();
  const caseStudySlugs = getAllCaseStudySlugs();
  const resourceSlugs = getAllResourceSlugs();

  return [
    { url: SITE_URL, lastModified: SITE_LAUNCH_DATE, changeFrequency: "monthly", priority: 1 },
    {
      url: `${SITE_URL}/blog`,
      lastModified: posts.length > 0 ? new Date(posts[0].date) : SITE_LAUNCH_DATE,
      changeFrequency: "weekly",
      priority: 0.8,
    },
    {
      url: `${SITE_URL}/resources`,
      lastModified: new Date("2026-07-14"),
      changeFrequency: "weekly",
      priority: 0.8,
    },
    {
      url: `${SITE_URL}/case-studies`,
      lastModified: SITE_LAUNCH_DATE,
      changeFrequency: "monthly",
      priority: 0.7,
    },
    ...SERVICE_PAGES.map((path) => ({
      url: `${SITE_URL}${path}`,
      lastModified: SITE_LAUNCH_DATE,
      changeFrequency: "monthly" as const,
      priority: 0.8,
    })),
    ...caseStudySlugs.map((slug) => ({
      url: `${SITE_URL}/case-studies/${slug}`,
      lastModified: SITE_LAUNCH_DATE,
      changeFrequency: "monthly" as const,
      priority: 0.6,
    })),
    ...resourceSlugs.map((slug) => ({
      url: `${SITE_URL}/resources/${slug}`,
      lastModified: new Date("2026-07-14"),
      changeFrequency: "monthly" as const,
      priority: 0.7,
    })),
    ...posts.map((post) => ({
      url: `${SITE_URL}/blog/${post.slug}`,
      lastModified: new Date(post.date),
      changeFrequency: "monthly" as const,
      priority: 0.6,
    })),
  ];
}

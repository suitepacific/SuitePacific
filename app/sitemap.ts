import type { MetadataRoute } from "next";
import { getAllPosts } from "@/lib/blog";
import { SITE_URL } from "@/lib/content";
import { getAllCaseStudySlugs } from "@/lib/case-studies";
import { getAllResourceSlugs } from "@/lib/resources";

const SITE_LAUNCH_DATE = new Date("2026-06-01");
const SEO_REFRESH_DATE = new Date("2026-08-05");

const SERVICE_PAGES: { path: string; lastModified: Date }[] = [
  { path: "/hire-netsuite-developer", lastModified: SEO_REFRESH_DATE },
  { path: "/partners", lastModified: SITE_LAUNCH_DATE },
  { path: "/contact", lastModified: SITE_LAUNCH_DATE },
  { path: "/netsuite-integrations", lastModified: SEO_REFRESH_DATE },
  { path: "/netsuite-suitescript-development", lastModified: SEO_REFRESH_DATE },
  { path: "/netsuite-workflow-automation", lastModified: SEO_REFRESH_DATE },
  { path: "/netsuite-saved-searches-dashboards", lastModified: SEO_REFRESH_DATE },
  { path: "/netsuite-advanced-pdf-templates", lastModified: SEO_REFRESH_DATE },
  { path: "/netsuite-administrator-support", lastModified: SEO_REFRESH_DATE },
  { path: "/netsuite-account-optimization", lastModified: SEO_REFRESH_DATE },
  { path: "/netsuite-post-go-live-support", lastModified: SEO_REFRESH_DATE },
  { path: "/netsuite-implementation-partner-vs-managed-support", lastModified: SEO_REFRESH_DATE },
  { path: "/netsuite-consulting-services", lastModified: SEO_REFRESH_DATE },
  { path: "/netsuite-admin-support-small-business", lastModified: SEO_REFRESH_DATE },
  { path: "/suitecompare", lastModified: new Date("2026-07-19") },
];

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const posts = await getAllPosts();
  const caseStudySlugs = getAllCaseStudySlugs();
  const resourceSlugs = getAllResourceSlugs();

  return [
    { url: SITE_URL, lastModified: SEO_REFRESH_DATE, changeFrequency: "monthly", priority: 1 },
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
    ...SERVICE_PAGES.map(({ path, lastModified }) => ({
      url: `${SITE_URL}${path}`,
      lastModified,
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

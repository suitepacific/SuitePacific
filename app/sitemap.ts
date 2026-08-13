import type { MetadataRoute } from "next";
import { getAllPosts } from "@/lib/blog";
import { SITE_URL } from "@/lib/content";
import { getAllCaseStudySlugs } from "@/lib/case-studies";
import { getAllResources } from "@/lib/resources";

const SITE_LAUNCH_DATE = new Date("2026-06-01");
const SEO_REFRESH_DATE = new Date("2026-08-05");
const NEW_PAGES_DATE = new Date("2026-08-11");
const KW_GAP_DATE = new Date("2026-08-13");

const INDUSTRY_PAGES: { path: string; lastModified: Date }[] = [
  { path: "/industries/manufacturing", lastModified: SEO_REFRESH_DATE },
  { path: "/industries/wholesale-distribution", lastModified: SEO_REFRESH_DATE },
  { path: "/industries/construction", lastModified: SEO_REFRESH_DATE },
  { path: "/industries/real-estate", lastModified: SEO_REFRESH_DATE },
  { path: "/industries/saas-technology", lastModified: SEO_REFRESH_DATE },
  { path: "/industries/retail-ecommerce", lastModified: SEO_REFRESH_DATE },
  { path: "/industries/professional-services", lastModified: SEO_REFRESH_DATE },
];

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
  { path: "/netsuite-freelancer-vs-consulting-firm", lastModified: SEO_REFRESH_DATE },
  { path: "/netsuite-consulting-services", lastModified: SEO_REFRESH_DATE },
  { path: "/netsuite-admin-support-small-business", lastModified: SEO_REFRESH_DATE },
  { path: "/suitecompare", lastModified: new Date("2026-07-19") },
  { path: "/netsuite-acs-alternative", lastModified: NEW_PAGES_DATE },
  { path: "/netsuite-support-alternative", lastModified: NEW_PAGES_DATE },
  { path: "/netsuite-oracle-support-vs-third-party", lastModified: NEW_PAGES_DATE },
  { path: "/netsuite-certified-netsuite-support", lastModified: NEW_PAGES_DATE },
  { path: "/netsuite-managed-support", lastModified: NEW_PAGES_DATE },
  { path: "/netsuite-ai-integration", lastModified: NEW_PAGES_DATE },
  { path: "/netsuite-ai-optimization-assessment", lastModified: NEW_PAGES_DATE },
  { path: "/netsuite-ai-invoice-processing", lastModified: NEW_PAGES_DATE },
  { path: "/netsuite-ai-reporting", lastModified: NEW_PAGES_DATE },
  { path: "/netsuite-health-check", lastModified: KW_GAP_DATE },
  { path: "/netsuite-implementation-rescue", lastModified: KW_GAP_DATE },
  { path: "/netsuite-integrations/shopify", lastModified: KW_GAP_DATE },
  { path: "/netsuite-integrations/salesforce", lastModified: KW_GAP_DATE },
  { path: "/netsuite-integrations/hubspot", lastModified: KW_GAP_DATE },
  { path: "/netsuite-integrations/avalara", lastModified: KW_GAP_DATE },
  { path: "/netsuite-integrations/amazon", lastModified: KW_GAP_DATE },
  { path: "/netsuite-consultant-san-francisco", lastModified: KW_GAP_DATE },
  { path: "/netsuite-consultant-los-angeles", lastModified: KW_GAP_DATE },
  { path: "/netsuite-consultant-new-york", lastModified: KW_GAP_DATE },
  { path: "/netsuite-consultant-chicago", lastModified: KW_GAP_DATE },
  { path: "/netsuite-emergency-support", lastModified: KW_GAP_DATE },
];

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const posts = await getAllPosts();
  const caseStudySlugs = getAllCaseStudySlugs();
  const resources = getAllResources();

  return [
    { url: SITE_URL, lastModified: SEO_REFRESH_DATE },
    { url: `${SITE_URL}/blog`, lastModified: posts.length > 0 ? new Date(posts[0].date) : SITE_LAUNCH_DATE },
    { url: `${SITE_URL}/resources`, lastModified: new Date("2026-07-14") },
    { url: `${SITE_URL}/case-studies`, lastModified: SITE_LAUNCH_DATE },
    ...INDUSTRY_PAGES.map(({ path, lastModified }) => ({
      url: `${SITE_URL}${path}`,
      lastModified,
    })),
    ...SERVICE_PAGES.map(({ path, lastModified }) => ({
      url: `${SITE_URL}${path}`,
      lastModified,
    })),
    ...caseStudySlugs.map((slug) => ({
      url: `${SITE_URL}/case-studies/${slug}`,
      lastModified: SITE_LAUNCH_DATE,
    })),
    ...resources.map((resource) => ({
      url: `${SITE_URL}/resources/${resource.slug}`,
      lastModified: new Date(resource.publishedAt),
    })),
    ...posts.map((post) => ({
      url: `${SITE_URL}/blog/${post.slug}`,
      lastModified: new Date(post.updated ?? post.date),
    })),
  ];
}

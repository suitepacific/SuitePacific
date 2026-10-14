import type { MetadataRoute } from "next";
import { getAllPosts } from "@/lib/blog";
import { SITE_URL } from "@/lib/content";
import { getAllCaseStudySlugs } from "@/lib/case-studies";
import { getAllResources } from "@/lib/resources";

const SITE_LAUNCH_DATE = new Date("2026-06-01");
const SEO_REFRESH_DATE = new Date("2026-08-05");
const NEW_PAGES_DATE = new Date("2026-08-11");
const KW_GAP_DATE = new Date("2026-08-13");

// These resource slugs redirect to /blog/* equivalents - exclude from sitemap to avoid 301s
const REDIRECTED_RESOURCE_SLUGS = new Set([
  "netsuite-user-event-vs-client-script",
  "netsuite-rest-batch-sequential",
  "netsuite-suiteql-bound-parameters",
  "netsuite-sales-order-fulfillment-list",
  "netsuite-currency-context-custom-fields",
  "netsuite-suitetax-term-discounts",
]);

const INDUSTRY_PAGES: { path: string; lastModified: Date }[] = [
  { path: "/industries", lastModified: new Date("2026-09-23") },
  { path: "/industries/manufacturing", lastModified: SEO_REFRESH_DATE },
  { path: "/industries/wholesale-distribution", lastModified: SEO_REFRESH_DATE },
  { path: "/industries/construction", lastModified: SEO_REFRESH_DATE },
  { path: "/industries/real-estate", lastModified: SEO_REFRESH_DATE },
  { path: "/industries/saas-technology", lastModified: SEO_REFRESH_DATE },
  { path: "/industries/retail-ecommerce", lastModified: SEO_REFRESH_DATE },
  { path: "/industries/professional-services", lastModified: SEO_REFRESH_DATE },
  { path: "/industries/nonprofit", lastModified: new Date("2026-08-15") },
  { path: "/industries/food-beverage", lastModified: SEO_REFRESH_DATE },
  { path: "/industries/healthcare", lastModified: SEO_REFRESH_DATE },
  { path: "/industries/fintech", lastModified: new Date("2026-09-23") },
  { path: "/industries/recruitment", lastModified: new Date("2026-09-23") },
  { path: "/industries/courier-travel", lastModified: new Date("2026-09-23") },
  { path: "/industries/service-industries", lastModified: new Date("2026-09-23") },
  { path: "/industries/architecture-engineering", lastModified: new Date("2026-09-23") },
  { path: "/industries/oil-gas", lastModified: new Date("2026-09-23") },
  { path: "/industries/government-contractors", lastModified: new Date("2026-09-23") },
  { path: "/industries/private-equity", lastModified: new Date("2026-09-23") },
  { path: "/industries/franchise", lastModified: new Date("2026-09-23") },
  { path: "/industries/cannabis", lastModified: new Date("2026-09-23") },
  { path: "/industries/agriculture", lastModified: new Date("2026-09-23") },
  { path: "/industries/edtech", lastModified: new Date("2026-09-23") },
  { path: "/industries/publishing-media", lastModified: new Date("2026-09-23") },
  { path: "/industries/managed-service-providers", lastModified: new Date("2026-09-23") },
  { path: "/netsuite-support-uk", lastModified: new Date("2026-08-15") },
  { path: "/netsuite-suitebilling-support", lastModified: new Date("2026-08-15") },
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
  { path: "/netsuite-acs-alternative", lastModified: new Date("2026-08-17") },
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
  { path: "/netsuite-fsm-support", lastModified: KW_GAP_DATE },
  { path: "/netsuite-care", lastModified: new Date("2026-08-14") },
  { path: "/netsuite-partner-replacement", lastModified: new Date("2026-08-17") },
  { path: "/netsuite-technical-debt", lastModified: new Date("2026-08-18") },
  { path: "/netsuite-partner-too-expensive", lastModified: new Date("2026-08-19") },
  { path: "/netsuite-consultant-cost", lastModified: new Date("2026-08-19") },
  { path: "/netsuite-partner-too-slow", lastModified: new Date("2026-08-19") },
  { path: "/netsuite-partner-not-responsive", lastModified: new Date("2026-08-19") },
  { path: "/netsuite-2026-2-release-readiness-checklist", lastModified: new Date("2026-08-19") },
  { path: "/netsuite-performance-issues", lastModified: new Date("2026-09-23") },
  { path: "/netsuite-suitescript-migration", lastModified: new Date("2026-09-23") },
  // Pages added in Aug 2026 — were missing from sitemap
  { path: "/netsuite-consultant-texas", lastModified: new Date("2026-08-20") },
  { path: "/netsuite-upgrade-preparation", lastModified: new Date("2026-08-29") },
  { path: "/netsuite-support-comparison", lastModified: new Date("2026-08-29") },
  { path: "/what-netsuite-support-covers", lastModified: new Date("2026-08-29") },
  { path: "/do-i-need-netsuite-acs", lastModified: new Date("2026-08-30") },
  { path: "/netsuite-acs-pricing", lastModified: new Date("2026-08-30") },
  { path: "/netsuite-acs-alternatives-comparison", lastModified: new Date("2026-08-30") },
  // Pages added in Sep 2026 — were missing from sitemap
  { path: "/netsuite-support", lastModified: new Date("2026-09-03") },
  { path: "/netsuite-integrations/celigo", lastModified: new Date("2026-09-03") },
  { path: "/netsuite-wip-report", lastModified: new Date("2026-09-17") },
  { path: "/netsuite-ap-automation", lastModified: new Date("2026-09-17") },
  { path: "/netsuite-approval-workflows", lastModified: new Date("2026-09-17") },
  { path: "/netsuite-arm-configuration", lastModified: new Date("2026-09-17") },
  { path: "/netsuite-data-migration", lastModified: new Date("2026-09-17") },
  { path: "/netsuite-oneworld-support", lastModified: new Date("2026-09-17") },
  { path: "/netsuite-order-fulfillment", lastModified: new Date("2026-09-17") },
  { path: "/netsuite-quickbooks-migration", lastModified: new Date("2026-09-17") },
  { path: "/netsuite-user-roles-permissions", lastModified: new Date("2026-09-17") },
  { path: "/netsuite-job-costing", lastModified: new Date("2026-09-19") },
  { path: "/netsuite-progress-billing", lastModified: new Date("2026-09-19") },
  { path: "/netsuite-construction-accounting", lastModified: new Date("2026-09-19") },
  { path: "/netsuite-bill-of-materials", lastModified: new Date("2026-09-19") },
  { path: "/netsuite-lot-serial-tracking", lastModified: new Date("2026-09-19") },
  { path: "/netsuite-work-orders", lastModified: new Date("2026-09-19") },
  { path: "/netsuite-nonprofit-fund-accounting", lastModified: new Date("2026-09-19") },
  { path: "/netsuite-grant-management", lastModified: new Date("2026-09-19") },
  { path: "/netsuite-nonprofit-reporting", lastModified: new Date("2026-09-19") },
  { path: "/netsuite-arr-mrr-reporting", lastModified: new Date("2026-09-19") },
  { path: "/netsuite-subscription-management", lastModified: new Date("2026-09-19") },
  { path: "/netsuite-usage-based-billing", lastModified: new Date("2026-09-19") },
  { path: "/netsuite-project-billing", lastModified: new Date("2026-09-19") },
  { path: "/netsuite-milestone-billing", lastModified: new Date("2026-09-19") },
  { path: "/netsuite-time-expense-tracking", lastModified: new Date("2026-09-19") },
  { path: "/netsuite-lease-accounting", lastModified: new Date("2026-09-19") },
  { path: "/netsuite-real-estate-accounting", lastModified: new Date("2026-09-19") },
  { path: "/netsuite-property-management-accounting", lastModified: new Date("2026-09-19") },
  { path: "/netsuite-multi-location-inventory", lastModified: new Date("2026-09-19") },
  { path: "/netsuite-demand-planning", lastModified: new Date("2026-09-19") },
  { path: "/netsuite-drop-shipping", lastModified: new Date("2026-09-19") },
  { path: "/netsuite-3pl-integration", lastModified: new Date("2026-09-19") },
  { path: "/netsuite-landed-cost", lastModified: new Date("2026-09-19") },
  { path: "/netsuite-returns-processing", lastModified: new Date("2026-09-19") },
  { path: "/netsuite-shelf-life-tracking", lastModified: new Date("2026-09-19") },
  { path: "/netsuite-trade-promotions-management", lastModified: new Date("2026-09-19") },
  { path: "/netsuite-deductions-management", lastModified: new Date("2026-09-19") },
  { path: "/netsuite-edi-integration", lastModified: new Date("2026-09-19") },
  { path: "/netsuite-suitescript-readiness-checklist", lastModified: new Date("2026-09-20") },
  { path: "/netsuite-managed-services-pricing", lastModified: new Date("2026-09-23") },
  // Oct 2026
  { path: "/netsuite-project-consulting", lastModified: new Date("2026-10-14") },
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
    { url: `${SITE_URL}/press`, lastModified: new Date("2026-09-29") },
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
    ...resources
      .filter((resource) => !REDIRECTED_RESOURCE_SLUGS.has(resource.slug))
      .map((resource) => ({
        url: `${SITE_URL}/resources/${resource.slug}`,
        lastModified: new Date(resource.publishedAt),
      })),
    ...posts.map((post) => ({
      url: `${SITE_URL}/blog/${post.slug}`,
      lastModified: new Date(post.updated ?? post.date),
    })),
  ];
}

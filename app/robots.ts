import type { MetadataRoute } from "next";
import { SITE_URL } from "@/lib/content";

const PRIVATE_PATHS = [
  "/admin",
  "/api/",
  "/customer-portal",
  "/employee-portal",
  "/partner-portal",
  "/importDetector",
  "/suitecompare/login",
  "/suitecompare/signup",
  "/suitecompare/dashboard",
  "/suitecompare/accounts",
  "/suitecompare/settings",
  "/suitecompare/scripts",
  "/suitecompare/compare",
  "/suitecompare/activate",
  "/suitecompare/invite",
  "/suitecompare/verify",
  "/suitecompare/forgot-password",
  "/suitecompare/reset-password",
  "/suitecompare/help",
];

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      // Bulk training scrapers with no search or citation benefit
      { userAgent: ["CCBot", "Bytespider"], disallow: "/" },
      {
        userAgent: ["GPTBot", "OAI-SearchBot", "ClaudeBot", "anthropic-ai", "PerplexityBot", "Google-Extended", "cohere-ai"],
        allow: "/",
        disallow: PRIVATE_PATHS,
      },
      { userAgent: "*", allow: "/", disallow: PRIVATE_PATHS },
    ],
    sitemap: `${SITE_URL}/sitemap.xml`,
  };
}

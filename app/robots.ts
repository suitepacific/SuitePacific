import type { MetadataRoute } from "next";
import { SITE_URL } from "@/lib/content";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      // Explicitly welcome AI search crawlers so they index all public content
      {
        userAgent: ["GPTBot", "OAI-SearchBot", "ClaudeBot", "PerplexityBot"],
        allow: "/",
        disallow: [
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
          "/importDetector",
        ],
      },
      {
        userAgent: "*",
        allow: "/",
        disallow: [
          "/admin",
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
          "/importDetector",
          "/customer-portal",
          "/partner-portal",
        ],
      },
    ],
    sitemap: `${SITE_URL}/sitemap.xml`,
  };
}

// Pings Bing + IndexNow network after each production build.
// Run via `npm run indexnow` or call from a Vercel deploy hook.
// Skips automatically when NODE_ENV is not "production".

const HOST = "suitepacific.com";
const KEY = "aac4c9498701451fa8ce7e2368114661";
const KEY_LOCATION = `https://${HOST}/${KEY}.txt`;

const URLS = [
  // Core pages
  "/",
  "/netsuite-post-go-live-support",
  "/netsuite-consulting-services",
  "/netsuite-integrations",
  "/netsuite-suitescript-development",
  "/netsuite-workflow-automation",
  "/netsuite-saved-searches-dashboards",
  "/netsuite-advanced-pdf-templates",
  "/netsuite-administrator-support",
  "/netsuite-account-optimization",
  "/netsuite-admin-support-small-business",
  "/netsuite-managed-support",
  "/netsuite-certified-netsuite-support",
  "/netsuite-acs-alternative",
  "/netsuite-support-alternative",
  "/netsuite-oracle-support-vs-third-party",
  "/netsuite-ai-integration",
  "/netsuite-ai-optimization-assessment",
  "/netsuite-ai-invoice-processing",
  "/netsuite-ai-reporting",
  "/hire-netsuite-developer",
  "/netsuite-freelancer-vs-consulting-firm",
  "/netsuite-implementation-partner-vs-managed-support",
  // Blog posts
  "/blog/how-to-choose-netsuite-consulting-partner",
  "/blog/netsuite-post-go-live-checklist",
  "/blog/signs-netsuite-support-not-working",
  "/blog/netsuite-month-end-close-checklist",
  "/blog/netsuite-support-partner-evaluation",
  "/blog/suitescript-best-practices",
  "/blog/netsuite-map-reduce-script-guide",
  "/blog/netsuite-user-event-vs-client-script",
  "/blog/netsuite-workflow-vs-suitescript",
  "/blog/netsuite-script-governance-limit",
  "/blog/netsuite-suiteql-guide",
  "/blog/netsuite-suiteql-bound-parameters",
  "/blog/netsuite-suiteql-sort-change-2026-2",
  "/blog/netsuite-custom-gl-plugin-guide",
  "/blog/netsuite-freemarker-pdf-guide",
  "/blog/workflow-automation-mistakes",
  "/blog/netsuite-saved-search-examples",
  "/blog/netsuite-saved-search-tips",
  "/blog/netsuite-roles-permissions-guide",
  "/blog/netsuite-development-cost",
  "/blog/netsuite-optimization",
  "/blog/netsuite-nlauth-tba-end-of-support",
  "/blog/netsuite-approval-workflow-setup",
  "/blog/netsuite-2026-2-finance-updates",
  "/blog/netsuite-payment-runs-2026-2",
  "/blog/netsuite-payment-adjustments-2026-2",
  "/blog/netsuite-bank-reconciliation-changes-2026-2",
  "/blog/netsuite-bill-capture-preferences-2026-2",
  "/blog/netsuite-project-health-indicators-2026-2",
  "/blog/netsuite-advanced-record-customization-2026-2",
  "/blog/netsuite-fsm-bundle-update-august-2026",
  "/blog/netsuite-fsm-mobile-changes-august-2026",
  "/blog/netsuite-fsm-nxc-now-migration-august-2026",
  "/blog/netsuite-fsm-readonly-migration-august-2026",
  // Tier 1 keyword gap (2026-08-13)
  "/netsuite-health-check",
  "/netsuite-implementation-rescue",
  "/netsuite-integrations/shopify",
  "/netsuite-integrations/salesforce",
  "/netsuite-integrations/hubspot",
  "/netsuite-integrations/avalara",
  "/netsuite-integrations/amazon",
  "/blog/signs-netsuite-implementation-failed",
  "/blog/netsuite-support-pricing-guide",
  // Tier 2/3 keyword gap (2026-08-13)
  "/netsuite-consultant-san-francisco",
  "/netsuite-consultant-los-angeles",
  "/netsuite-consultant-new-york",
  "/netsuite-consultant-chicago",
  "/netsuite-emergency-support",
  "/blog/netsuite-script-broke-after-upgrade",
  "/blog/netsuite-support-partner-red-flags",
  "/netsuite-fsm-support",
  // Service pages (2026-08-17)
  "/netsuite-support-uk",
  "/netsuite-suitebilling-support",
  "/netsuite-care",
  // Industry pages (2026-08-17)
  "/industries/manufacturing",
  "/industries/wholesale-distribution",
  "/industries/construction",
  "/industries/real-estate",
  "/industries/saas-technology",
  "/industries/retail-ecommerce",
  "/industries/professional-services",
  "/industries/nonprofit",
  // Blog posts (2026-08-17)
  "/blog/netsuite-suitebilling-charge-generation",
  "/blog/netsuite-suitebilling-change-orders",
  "/blog/netsuite-suitebilling-arm-integration",
  "/blog/netsuite-account-performance",
  "/blog/netsuite-advanced-pdf-data-model",
  "/blog/advanced-pdf-template-mistakes",
  "/blog/netsuite-implementation-partner-vs-managed-support",
  "/blog/netsuite-passkey-second-factor-2026-2",
  "/blog/netsuite-rest-batch-sequential",
  "/blog/netsuite-restlet-vs-rest-web-services",
  "/blog/netsuite-sales-order-fulfillment-list",
  "/blog/netsuite-saved-search-formula-examples",
  "/blog/netsuite-suitetax-term-discounts",
  "/blog/netsuite-currency-context-custom-fields",
];

if (process.env.NODE_ENV !== "production") {
  console.log("IndexNow ping skipped (not production).");
  process.exit(0);
}

// Deduplicate in case any slug was added twice
const urlList = [...new Set(URLS)].map((path) => `https://${HOST}${path}`);

const body = {
  host: HOST,
  key: KEY,
  keyLocation: KEY_LOCATION,
  urlList,
};

const ENDPOINTS = [
  "https://api.indexnow.org/indexnow",
  "https://www.bing.com/indexnow",
];

let exitCode = 0;
for (const endpoint of ENDPOINTS) {
  const res = await fetch(endpoint, {
    method: "POST",
    headers: { "Content-Type": "application/json; charset=utf-8" },
    body: JSON.stringify(body),
  });
  if (res.ok) {
    console.log(`IndexNow: ${endpoint} → ${urlList.length} URLs (HTTP ${res.status})`);
  } else {
    const text = await res.text();
    console.error(`IndexNow: ${endpoint} failed (HTTP ${res.status}): ${text}`);
    exitCode = 1;
  }
}

process.exit(exitCode);

// Pings Bing IndexNow after each production build.
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
  "/blog/netsuite-suiteql-sort-change-2026-2",
  "/blog/netsuite-fsm-bundle-update-august-2026",
  "/blog/netsuite-fsm-mobile-changes-august-2026",
  "/blog/netsuite-fsm-nxc-now-migration-august-2026",
  "/blog/netsuite-fsm-readonly-migration-august-2026",
];

if (process.env.NODE_ENV !== "production") {
  console.log("IndexNow ping skipped (not production).");
  process.exit(0);
}

const urlList = URLS.map((path) => `https://${HOST}${path}`);

const body = {
  host: HOST,
  key: KEY,
  keyLocation: KEY_LOCATION,
  urlList,
};

const res = await fetch("https://api.indexnow.org/indexnow", {
  method: "POST",
  headers: { "Content-Type": "application/json; charset=utf-8" },
  body: JSON.stringify(body),
});

if (res.ok) {
  console.log(`IndexNow: pinged ${urlList.length} URLs (HTTP ${res.status})`);
} else {
  const text = await res.text();
  console.error(`IndexNow: ping failed (HTTP ${res.status}): ${text}`);
  process.exit(1);
}

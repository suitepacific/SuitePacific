// Pings Bing + IndexNow network after each production build.
// Run via `npm run indexnow` or call from a Vercel deploy hook.
// Skips automatically when NODE_ENV is not "production".

const HOST = "suitepacific.com";
const KEY = "aac4c9498701451fa8ce7e2368114661";
const KEY_LOCATION = `https://${HOST}/${KEY}.txt`;

if (process.env.NODE_ENV !== "production") {
  console.log("IndexNow ping skipped (not production).");
  process.exit(0);
}

// Fetch all URLs from the live sitemap — no static list to maintain
const sitemapRes = await fetch(`https://${HOST}/sitemap.xml`);
if (!sitemapRes.ok) {
  console.error(`IndexNow: failed to fetch sitemap (HTTP ${sitemapRes.status})`);
  process.exit(1);
}
const sitemapXml = await sitemapRes.text();
const urlList = [...sitemapXml.matchAll(/<loc>([^<]+)<\/loc>/g)].map((m) => m[1]);

if (urlList.length === 0) {
  console.error("IndexNow: no URLs found in sitemap");
  process.exit(1);
}

console.log(`IndexNow: ${urlList.length} URLs from sitemap`);

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

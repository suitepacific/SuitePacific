# Technical SEO Audit: suitepacific.com

**Audit date:** 2026-08-07
**Platform:** Next.js App Router, Vercel CDN
**Audited pages:** /, /blog, /suitecompare, /hire-netsuite-developer, /netsuite-consulting-services, /netsuite-suitescript-development, /contact, /netsuite-admin-support-small-business, /netsuite-post-go-live-support, /case-studies/project-performance-dashboard, /resources/netsuite-beforesubmit-vs-aftersubmit, /blog/netsuite-2026-2-finance-updates, /blog/netsuite-optimization, /blog/suitescript-best-practices, /blog/netsuite-saved-search-tips
**Score:** 84 / 100

---

## Resolved Since Previous Audit

All seven issues from the prior audit that had a direct fix available are confirmed resolved:

| Prior ID | Issue | Evidence |
|----------|-------|----------|
| C1 | Homepage missing canonical tag | `/` now returns `<link rel="canonical" href="https://suitepacific.com">` |
| C2 | /suitecompare marketing page had `noindex, nofollow` | `/suitecompare` returns no robots meta tag; page is indexable |
| H1 (partial) | og:image missing on blog and resource pages | Blog posts and resource pages now carry `og:image: https://suitepacific.com/og-default.png` |
| H2 | BlogPosting schema using 36x36 logo icon as image | BlogPosting `image` now `{"url":"https://suitepacific.com/og-default.png","width":1200,"height":630}` |
| H3 | /suitecompare nav link absent from server-rendered HTML | `/suitecompare` confirmed present in static HTML via direct href extraction |
| H4 | /netsuite-admin-support-small-business and /netsuite-consulting-services orphaned | Both URLs found in homepage internal link graph (22 total internal hrefs confirmed) |
| M1 | robots.txt missing SuiteCompare auth paths and /importDetector | robots.txt now covers all 12 SuiteCompare sub-paths plus /importDetector for both wildcard and AI-crawler agents |

---

## Summary of Current Issues

| Severity | Count |
|----------|-------|
| High | 2 |
| Medium | 3 |
| Low | 3 |

---

## High

### H1: og:image absent on all service pages (12 URLs)

**Finding:** Every service and product page is missing `<meta property="og:image">`. Blog posts, resource pages, case studies, and the homepage all carry `og-default.png` correctly. The fix applied since the previous audit reached content pages but did not reach the service page template.

**Affected URLs (all confirmed via HEAD + HTML fetch):**
```
/hire-netsuite-developer
/netsuite-suitescript-development
/netsuite-consulting-services
/netsuite-integrations
/netsuite-workflow-automation
/netsuite-saved-searches-dashboards
/netsuite-advanced-pdf-templates
/netsuite-administrator-support
/netsuite-account-optimization
/netsuite-post-go-live-support
/netsuite-implementation-partner-vs-managed-support
/netsuite-admin-support-small-business
```

Also missing on `/suitecompare` (covered separately in H2 below).

**Impact:** Any of these pages shared on LinkedIn, Slack, iMessage, or WhatsApp renders a blank card. Service pages are the highest-conversion URLs on the site -- they are the destination for paid search, organic rankings, and referral traffic. A missing social image is especially damaging here compared to blog content.

**Root cause pattern:** Service pages define their own `openGraph` metadata object in `generateMetadata()` or `export const metadata`. When a child page defines `openGraph` without an `images` key, Next.js replaces (not merges) the root-layout openGraph block, and the root-layout `images` fallback is lost.

**Fix:** In each service page's metadata, add the `images` key to the existing `openGraph` block:
```ts
openGraph: {
  title: "...",
  description: "...",
  url: "https://suitepacific.com/hire-netsuite-developer",
  type: "website",
  images: [
    { url: "https://suitepacific.com/og-default.png", width: 1200, height: 630 },
  ],
},
```
The fastest approach is a shared `defaultOpenGraph` constant in `lib/seo.ts` with the `images` array pre-populated, then spread it into every page's `openGraph` block.

---

### H2: /suitecompare missing canonical tag

**Finding:** `https://suitepacific.com/suitecompare` has no `<link rel="canonical">` in its HTML. Every other audited page -- including all blog posts, resource pages, case studies, and service pages -- carries a correct self-referencing canonical.

**Evidence:**
```
curl -s https://suitepacific.com/suitecompare | grep -i canonical
# returns: (empty)
```

Contrast with a service page:
```
curl -s https://suitepacific.com/hire-netsuite-developer | grep -i canonical
# returns: <link rel="canonical" href="https://suitepacific.com/hire-netsuite-developer"/>
```

**Secondary issue on same page:** og:image is also absent on /suitecompare (same pattern as H1 service pages, even though /suitecompare is a product page rather than a service page).

**Impact:** /suitecompare is the primary commercial landing page for the SuiteCompare product. Without a canonical, Google independently chooses which URL form to treat as canonical -- typically not a problem for a simple URL, but it means Google is making that decision rather than the site declaring it. The page is listed in the sitemap at `https://suitepacific.com/suitecompare`; without a matching canonical declaration, the sitemap hint is weaker.

**Root cause:** The noindex fix applied in the previous round likely removed the `metadata` export from `app/suitecompare/page.tsx` entirely (or replaced it with a minimal stub), losing both the canonical and the openGraph block.

**Fix:**
```ts
// app/suitecompare/page.tsx
export const metadata: Metadata = {
  title: "SuiteCompare: One-Click NetSuite Environment Comparison | SuitePacific",
  description: "...",
  alternates: { canonical: "https://suitepacific.com/suitecompare" },
  openGraph: {
    title: "SuiteCompare",
    url: "https://suitepacific.com/suitecompare",
    images: [{ url: "https://suitepacific.com/og-default.png", width: 1200, height: 630 }],
  },
};
```

---

## Medium

### M1: No IndexNow protocol implemented

**Finding:** No IndexNow key file exists at any standard path. The site publishes 6-12 new blog and resource posts per month. Without IndexNow, new content relies entirely on Googlebot's scheduled crawl and Bing's own discovery, which for a relatively new domain may take days to weeks.

**Evidence:**
```
HEAD https://suitepacific.com/indexnow     -> 404
HEAD https://suitepacific.com/indexnow.txt -> 404
```

**Impact:** Primarily affects Bing and Yandex indexing speed. Google has its own equivalent (via Search Console URL inspection), but IndexNow is the fastest path for Bing which, through Microsoft's AI search integrations, is a relevant channel for a B2B SaaS and services audience.

**Fix:** Generate a UUID hex string as the key (e.g., `a3f9...`). Place a file `/public/a3f9....txt` whose sole content is that key string. Then on each new publish, send:
```
GET https://api.indexnow.org/indexnow?url=https://suitepacific.com/blog/[slug]&key=a3f9...
```
This can be automated with a Vercel deploy hook, a post-build script, or an `on-demand-revalidation` pattern that pings IndexNow after ISR cache updates.

---

### M2: CSP frame-ancestors conflicts with X-Frame-Options

**Finding:** The `Content-Security-Policy` header declares `frame-ancestors 'none'` while the `X-Frame-Options` header declares `SAMEORIGIN`. These are contradictory instructions.

**Evidence (live headers on all pages):**
```
content-security-policy: ... frame-ancestors 'none'; ...
x-frame-options: SAMEORIGIN
```

**Impact:** Modern browsers give precedence to the CSP `frame-ancestors` directive and ignore `X-Frame-Options`. The net result is that framing is blocked by everyone (including the same origin), which is the stricter of the two policies -- so there is no security vulnerability. The inconsistency is a configuration debt item and will appear as a flag in any security audit.

**Fix:** Align both headers to the intended policy. If no framing should be allowed: keep `frame-ancestors 'none'` in CSP and change `X-Frame-Options` to `DENY`. If same-origin framing is desired (e.g., for future dashboard embeds): change CSP to `frame-ancestors 'self'` and keep `X-Frame-Options: SAMEORIGIN`.

---

### M3: CSP script-src includes unsafe-inline and unsafe-eval

**Finding:** The CSP header includes `script-src 'self' 'unsafe-inline' 'unsafe-eval'`. Both `unsafe-inline` and `unsafe-eval` are the primary directives that CSP exists to restrict; their inclusion eliminates XSS protection for injected scripts.

**Evidence (live header):**
```
content-security-policy: default-src 'self'; script-src 'self' 'unsafe-inline' 'unsafe-eval'; ...
```

**Impact:** Not a direct ranking factor, but a meaningful security gap. If any reflected or stored XSS vector exists on the site, the CSP offers no containment.

**Recommendation:** Next.js 14+ App Router supports nonce-based CSP via middleware. Implementing nonces removes the need for `unsafe-inline` while keeping all Next.js functionality intact. Treat this as a deliberate hardening task, not an urgent fix -- the current HSTS preload, nosniff, and Referrer-Policy headers already represent a strong baseline.

---

## Low

### L1: X-XSS-Protection header present but deprecated

**Finding:** `x-xss-protection: 1; mode=block` is present on all pages. Chrome removed its XSS auditor in 2019. The header is not recognized by any major modern browser, and in certain edge cases can cause regressions in legacy IE/Edge configurations.

**Fix:** Set `X-XSS-Protection: 0` in `next.config.ts` per current OWASP guidance. A properly scoped CSP (M3 above) is the modern replacement.

---

### L2: Case study sitemap lastmod values all share the same date

**Finding:** All six case study pages in the sitemap carry `lastmod: 2026-06-01`, which appears to be the initial batch-publish date rather than per-page modification dates.

**Evidence:**
```
/case-studies/project-performance-dashboard   -> lastmod: 2026-06-01
/case-studies/vendor-quotation-management     -> lastmod: 2026-06-01
/case-studies/sales-order-approval-workflow   -> lastmod: 2026-06-01
/case-studies/invoice-processing-automation   -> lastmod: 2026-06-01
/case-studies/advanced-pdf-document-automation -> lastmod: 2026-06-01
/case-studies/operational-reporting           -> lastmod: 2026-06-01
```

Note: Resource pages have been fixed since the previous audit -- they now carry individual dates (2026-07-01 through 2026-07-27) accurately reflecting per-page publish dates.

**Impact:** Google uses `lastmod` to prioritize re-crawl frequency. Identical dates signal no recent changes, which is accurate for case studies that have not been updated -- so this is lower priority than if the dates were inaccurate. If any case study is substantially updated, the lastmod should reflect that actual date.

**Fix:** Derive `lastmod` from the case study content file's modification date, the same approach now used for blog and resource pages.

---

### L3: robots.txt AI-crawler block omits three paths present in the wildcard block

**Finding:** The wildcard `User-Agent: *` block includes `Disallow: /admin`, `Disallow: /customer-portal`, and `Disallow: /partner-portal`. The AI-crawler block (GPTBot, OAI-SearchBot, ClaudeBot, PerplexityBot) does not include these three paths.

**Evidence (live robots.txt):**
```
User-Agent: GPTBot
User-Agent: OAI-SearchBot
User-Agent: ClaudeBot
User-Agent: PerplexityBot
Allow: /
Disallow: /suitecompare/login
[... 11 SuiteCompare/importDetector paths ...]
# /admin, /customer-portal, /partner-portal NOT listed here

User-Agent: *
Allow: /
Disallow: /admin
Disallow: /suitecompare/login
[... additional paths ...]
Disallow: /customer-portal
Disallow: /partner-portal
```

**Impact:** Low. These routes are protected by application-level auth middleware, so AI crawlers that do access them would receive a login redirect rather than indexable content. However, defense in depth calls for robots.txt and application auth to agree.

**Fix:** Add `Disallow: /admin`, `Disallow: /customer-portal`, and `Disallow: /partner-portal` to the AI-crawler block in `app/robots.ts`.

---

## Info (Passes)

### I1: Crawlability -- robots.txt and sitemap

robots.txt is accessible (HTTP 200), well-formed, and explicitly allows AI crawlers (`GPTBot`, `OAI-SearchBot`, `ClaudeBot`, `PerplexityBot`) to access all public content while blocking all application sub-routes for both AI and general crawlers. The sitemap is declared. `sitemap.xml` is accessible (HTTP 200), single-urlset format appropriate for 94 URLs (well under the 50,000-URL limit). All 10 spot-checked sitemap URLs returned HTTP 200. No sitemap index is needed at this scale.

### I2: Redirect chains -- all clean

No multi-hop chains detected on any tested URL. Key results:
```
http://suitepacific.com/         -> 308 -> https://suitepacific.com/  (1 hop, Vercel default)
https://suitepacific.com/        -> 200 direct
https://suitepacific.com/blog    -> 200 direct
https://suitepacific.com/hire-netsuite-developer  -> 200 direct
https://suitepacific.com/netsuite-consulting-services -> 200 direct
https://suitepacific.com/contact -> 200 direct
https://suitepacific.com/suitecompare -> 200 direct
```
Vercel's HTTP-to-HTTPS redirect uses 308 (Permanent Redirect with method preservation) rather than 301. Google Search and Bing treat 308 identically to 301 for ranking signal transfer. No action needed.

### I3: Canonical tags -- correct on all audited pages except /suitecompare

Homepage, all four blog posts spot-checked, all two resource pages spot-checked, and all service pages carry correct self-referencing canonical tags. /suitecompare is the sole exception (flagged in H2). Canonical form is consistently without trailing slash, matching the sitemap URL format.

### I4: Sitemap lastmod coverage -- complete

All 94 sitemap entries carry `lastmod` values. Blog posts have individual per-post dates (2026-06-10 through 2026-08-07). Resource pages have individual per-resource dates (2026-07-01 through 2026-07-27). Case study dates are batch (flagged in L2). No `changefreq` or `priority` elements present -- both are optional and ignored by Google; their absence is correct.

### I5: Server rendering -- full SSR confirmed

All audited pages return complete HTML including meta tags, structured data, and body content in the raw HTTP response. Response header `X-Nextjs-Prerender: 1` confirms ISR is active. Googlebot does not need to execute JavaScript to read any indexable content on the site.

### I6: CDN cache TTL -- appropriate

`X-Nextjs-Stale-Time: 300` (5-minute stale-while-revalidate window) is present on all pages. For a B2B professional services site whose content changes on a publish-to-publish basis rather than continuously, 5 minutes is appropriate. It ensures warm cache delivery on repeated requests while allowing fresh content to propagate within minutes of a deploy or ISR revalidation.

### I7: Structured data -- present on all page types, all valid JSON

| Page type | Schema types detected |
|-----------|----------------------|
| Homepage | ProfessionalService, WebSite |
| Service pages | BreadcrumbList, FAQPage, Service |
| Blog posts | BlogPosting (image: og-default.png 1200x630, fixed), BreadcrumbList |
| Resource pages | TechArticle, BreadcrumbList |
| Case studies | (to be verified in schema audit) |

No malformed JSON detected in any audited block. No Person schema on any page (correct per brand policy).

### I8: Security headers -- strong baseline

```
strict-transport-security: max-age=63072000; includeSubDomains; preload
x-content-type-options: nosniff
referrer-policy: strict-origin-when-cross-origin
permissions-policy: camera=(), microphone=(), geolocation=()
```
HSTS is preload-eligible (730-day max-age, includeSubDomains, preload flag present). No mixed-content issues detected. Brotli compression active. CSP inconsistencies flagged in M2/M3 but do not affect the strong baseline established by the above headers.

### I9: Mobile viewport

`<meta name="viewport" content="width=device-width, initial-scale=1">` present on all audited pages.

### I10: No hreflang needed

The site is English-only with no regional variants. Absence of hreflang is correct.

### I11: llms.txt present and well-structured

`https://suitepacific.com/llms.txt` returns HTTP 200, `Content-Type: text/plain`. Content accurately describes the business, service scope, and ideal client profile. AI crawler management is in place for all four major AI crawlers.

### I12: Trailing slash consistency

All 94 sitemap URLs use the no-trailing-slash format (e.g., `https://suitepacific.com/blog`, not `https://suitepacific.com/blog/`). The homepage entry is `https://suitepacific.com` (no trailing slash, no path segment). Canonical tags follow the same convention. No trailing-slash redirect chains detected.

---

## Priority Action Checklist

Ordered by estimated search impact:

1. **[High -- H1]** Add `images: [{ url: "https://suitepacific.com/og-default.png", width: 1200, height: 630 }]` to the `openGraph` block in every service page's metadata. Create a shared `defaultOpenGraph` constant in `lib/seo.ts` to apply this in one change across all 12 affected pages.

2. **[High -- H2]** Add `alternates: { canonical: "https://suitepacific.com/suitecompare" }` and a complete `openGraph` block (including `images`) to `app/suitecompare/page.tsx`. The page is indexable and in the sitemap; it needs its canonical and social metadata restored.

3. **[Medium -- M1]** Implement IndexNow: generate a UUID hex key, place it at `/public/[key].txt`, and ping `https://api.indexnow.org/indexnow` on each new blog or resource publish. Primary benefit is Bing indexing speed.

4. **[Medium -- M2]** Align `frame-ancestors` in CSP with `X-Frame-Options`. If no framing is intended, set `X-Frame-Options: DENY` to match CSP's `frame-ancestors 'none'`.

5. **[Low -- L1]** Set `X-XSS-Protection: 0` in `next.config.ts` security headers.

6. **[Low -- L2]** Update case study sitemap `lastmod` values to reflect individual content dates rather than the 2026-06-01 batch date.

7. **[Low -- L3]** Add `Disallow: /admin`, `Disallow: /customer-portal`, `Disallow: /partner-portal` to the AI-crawler block in `app/robots.ts`.

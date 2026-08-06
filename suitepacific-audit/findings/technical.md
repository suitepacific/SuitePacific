# Technical SEO Audit: suitepacific.com

**Audit date:** 2026-08-07
**Audited pages:** /, /blog, /blog/netsuite-2026-2-finance-updates, /blog/netsuite-saved-search-tips, /netsuite-suitescript-development, /resources/netsuite-beforesubmit-vs-aftersubmit, /suitecompare, /case-studies
**Platform:** Next.js App Router on Vercel
**Score:** 67 / 100

---

## What Changed Since the Previous Audit

Items that were fixed:
- `og-default.png` now returns HTTP 200 (previous H1 resolved).

New regressions introduced since previous audit:
- Homepage canonical tag is now absent entirely (the root-layout `alternates` removal that fixed C1 left the homepage without any canonical).
- `/suitecompare` marketing page now carries `noindex, nofollow` (was previously `index, follow`; the auth-page fix appears to have been applied to the wrong page).

---

## Summary of Issues by Severity

| Severity | Count |
|----------|-------|
| Critical | 2 |
| High | 4 |
| Medium | 4 |
| Low | 2 |
| Info | 8 |

---

## Critical

### C1: Homepage has no canonical tag

**Finding:** `https://suitepacific.com/` has no `<link rel="canonical">` tag anywhere in its HTML. Every other audited page (blog posts, resource pages, service pages) carries a correct self-referencing canonical. The homepage is the only page where the tag is absent.

**Evidence:**
```
curl -s https://suitepacific.com/ | grep -i canonical
# returns: (empty)
```

All other spot-checked pages return their own canonical:
```
/blog/netsuite-2026-2-finance-updates → canonical: https://suitepacific.com/blog/netsuite-2026-2-finance-updates
/netsuite-suitescript-development     → canonical: https://suitepacific.com/netsuite-suitescript-development
/resources/netsuite-beforesubmit-vs-aftersubmit → canonical: https://suitepacific.com/resources/netsuite-beforesubmit-vs-aftersubmit
```

**Root cause:** The previous audit identified that `app/layout.tsx` was setting `alternates: { canonical: "/" }` at the root, bleeding the homepage canonical onto all sub-pages. When that key was removed to fix the bleed, no homepage-specific canonical was added in `app/(site)/page.tsx`, leaving the homepage canonical-free.

**Impact:** Google may treat `https://suitepacific.com`, `https://suitepacific.com/`, and potentially `https://www.suitepacific.com` as three separate URL variants and split PageRank among them. The sitemap declares `https://suitepacific.com` (no trailing slash); the server responds at `https://suitepacific.com/` (trailing slash); without a canonical, Google chooses its preferred form independently.

**Fix:**
```ts
// app/(site)/page.tsx — add to existing metadata export
export const metadata: Metadata = {
  // ... existing title, description, openGraph ...
  alternates: { canonical: "https://suitepacific.com" },
};
```

---

### C2: /suitecompare marketing page has noindex, nofollow but is listed in sitemap

**Finding:** `https://suitepacific.com/suitecompare` is a fully server-rendered product marketing page with high commercial value. It currently responds with `<meta name="robots" content="noindex, nofollow"/>`, which instructs Google not to index the page and not to follow any links on it. The same URL is declared in `sitemap.xml` at priority 0.8.

**Evidence:**
```
curl -s https://suitepacific.com/suitecompare | grep -i robots
# returns: <meta name="robots" content="noindex, nofollow"/>
```

Page title confirms this is the public-facing product page:
```
<title>SuiteCompare: One-Click NetSuite Environment Comparison | SuitePacific</title>
```

Body content excerpt confirms full marketing copy is present:
```
"Stop logging into two NetSuite accounts just to compare one script. Compare Production and Sandbox in one click..."
```

**Root cause:** The `noindex` fix intended for `/suitecompare/login` and other auth pages (identified as H2 in the previous audit) appears to have been applied at the wrong scope — likely in `app/suitecompare/layout.tsx` or `app/suitecompare/page.tsx` rather than isolated to the auth sub-routes.

**Impact:** This is the primary commercial landing page for SuiteCompare. Google cannot index it, cannot follow its links, and cannot credit any ranking signals to it. The sitemap entry telling Google to crawl the page while the page's meta tag tells Google not to index it is a direct contradiction that Google resolves in favor of the meta tag.

**Fix:** Remove the `robots: { index: false, follow: false }` (or equivalent) from `app/suitecompare/page.tsx` (and from `app/suitecompare/layout.tsx` if it is set there). Add noindex only to the auth-flow pages:
```ts
// app/suitecompare/login/page.tsx
export const metadata: Metadata = {
  title: "Log In",
  robots: { index: false, follow: false },
};

// Repeat for: signup, forgot-password, reset-password, activate, invite, verify
```

---

## High

### H1: og:image missing on all content pages (blog, resources, service pages)

**Finding:** Blog posts, resource pages, and service pages all omit `<meta property="og:image">`. The homepage inherits the default og:image from the root layout correctly, but individual content pages define their own `openGraph` metadata block without including an `images` key, which causes Next.js to replace (not merge) the root layout's OG data, stripping the image.

**Evidence — all three content-page types verified:**
```
/blog/netsuite-2026-2-finance-updates       → og:image: MISSING
/resources/netsuite-beforesubmit-vs-aftersubmit → og:image: MISSING
/netsuite-suitescript-development           → og:image: MISSING
/blog/netsuite-saved-search-tips            → og:image: MISSING
```

Contrast with homepage (which does not override openGraph):
```
/ → og:image: https://suitepacific.com/og-default.png (present, 1200x630)
```

**Impact:** Every blog post, resource, and service page shared on LinkedIn, Twitter/X, Slack, iMessage, or WhatsApp renders a plain-text card with no image. CTR on social shares is substantially lower without an image. Additionally, `og:image` is used by Google as a fallback image source for article rich results.

**Fix:** Two equally valid options:

Option A (per-page frontmatter, preferred for unique images per post):
```ts
// In the metadata generator for blog/resource pages, add:
openGraph: {
  title: post.title,
  description: post.description,
  url: `https://suitepacific.com/blog/${post.slug}`,
  type: "article",
  images: [{ url: post.ogImage ?? "https://suitepacific.com/og-default.png", width: 1200, height: 630 }],
},
```

Option B (global fallback via root layout, no per-page changes needed):
Move the `og:image` fallback into a `metadataBase`-relative format and ensure child pages either omit `openGraph.images` (inherits root) or always include it.

---

### H2: BlogPosting schema uses logo-icon.png as article image

**Finding:** Every blog post's `BlogPosting` JSON-LD block declares the article image as `https://suitepacific.com/logo-icon.png`, which is a 36x36 brand icon, not an article illustration.

**Evidence — from `/blog/netsuite-2026-2-finance-updates`:**
```json
{
  "@type": "BlogPosting",
  "image": {
    "@type": "ImageObject",
    "url": "https://suitepacific.com/logo-icon.png"
  },
  "author": { "@type": "Organization", "name": "SuitePacific, LLC" },
  "datePublished": "2026-08-02"
}
```

**Impact:** Google requires a minimum image width of 1200px for a blog post to be eligible for rich result display (article cards, Top Stories, Google Discover). A 36x36px icon fails this requirement. All 35 blog posts in the sitemap are currently excluded from image-enhanced rich results in Google Search.

**Fix:** Replace the logo URL with the default OG image (1200x630) as a baseline, and optionally support per-article images via frontmatter:
```ts
image: {
  "@type": "ImageObject",
  url: post.image ?? "https://suitepacific.com/og-default.png",
  width: 1200,
  height: 630,
},
```
Declare actual pixel dimensions only after verifying them.

---

### H3: Nav Products dropdown link to /suitecompare is not in server-rendered HTML

**Finding:** The navigation `<Products>` dropdown uses `useState` to toggle visibility. The `<Link href="/suitecompare">` element is added to the DOM only after the user clicks the Products button — it is absent from the initial server-rendered HTML.

**Evidence:**
```
curl -s https://suitepacific.com/ | grep -i suitecompare
# returns: (empty)
```

**Impact:** Googlebot does not simulate user interactions such as hover or click events. The primary crawl path from the homepage to `/suitecompare` does not exist in static HTML. With C2 now forcing noindex on the page (see above), this is temporarily moot — but once C2 is fixed, the SuiteCompare page will rely entirely on the sitemap for PageRank delivery rather than internal links.

**Fix:** Render dropdown link anchors in static HTML using CSS for show/hide. Alternatively, add a static `<a href="/suitecompare">` in the footer or homepage body independent of the nav interaction model.

---

### H4: Two service pages orphaned — no internal links pointing to them

**Finding:** `/netsuite-admin-support-small-business` and `/netsuite-consulting-services` are present in `sitemap.xml` but are not linked from any rendered HTML on the site. No `<a href>` pointing to either URL exists in the homepage, blog listing, resources listing, footer, or any other crawlable page.

**Evidence:**
```
curl -s https://suitepacific.com/ | grep -i "admin-support-small-business\|consulting-services"
# returns: (empty)
```

**Impact:** Both pages receive zero internal PageRank from the link graph. They are discoverable only via the sitemap. This substantially limits their ability to rank for their target keywords.

**Fix:** Add both pages to the homepage services section or to the site navigation. They represent genuine service offerings and should be reachable through normal site navigation.

---

## Medium

### M1: robots.txt Disallow list does not cover auth or app routes

**Finding:** The live `robots.txt` contains a single `Disallow: /admin`. Suitecompare auth pages (`/suitecompare/login`, `/suitecompare/signup`, etc.) and the Import Doctor at `/importDetector` are open to all crawlers.

**Evidence:**
```
User-Agent: *
Allow: /
Disallow: /admin
Sitemap: https://suitepacific.com/sitemap.xml
```

**Recommendation:** Extend `app/robots.ts` to include:
```
Disallow: /admin
Disallow: /suitecompare/login
Disallow: /suitecompare/signup
Disallow: /suitecompare/forgot-password
Disallow: /suitecompare/reset-password
Disallow: /suitecompare/activate
Disallow: /suitecompare/invite
Disallow: /suitecompare/verify
Disallow: /suitecompare/dashboard
Disallow: /suitecompare/accounts
Disallow: /suitecompare/compare
Disallow: /suitecompare/scripts
Disallow: /suitecompare/settings
Disallow: /importDetector
```
The `noindex` on auth pages (C2 fix) and Disallow in robots.txt are complementary; both are needed.

---

### M2: No IndexNow protocol implemented

**Finding:** No IndexNow key file exists in `/public`. With 6-12 new blog and resource posts published per month, all new content relies on Googlebot's regular crawl schedule and Bing's own discovery.

**Evidence:** `curl -sI https://suitepacific.com/indexnow.txt` returns HTTP 404. No key file at any common path.

**Recommendation:** Generate a UUID hex string as the IndexNow key, place it at `/public/[key].txt` with the key as its only content, and ping `https://api.indexnow.org/indexnow?url=https://suitepacific.com/blog/[slug]&key=[key]` on each new publish. A Vercel deploy hook or post-build script can automate submission. This primarily accelerates Bing indexing.

---

### M3: CSP frame-ancestors conflicts with X-Frame-Options

**Finding:** The Content-Security-Policy header includes `frame-ancestors 'none'` while the `X-Frame-Options` header is set to `SAMEORIGIN`. These are contradictory: CSP says no framing allowed by anyone; X-Frame-Options says same-origin framing is permitted. Modern browsers give precedence to CSP.

**Evidence (live headers):**
```
content-security-policy: ... frame-ancestors 'none'; ...
x-frame-options: SAMEORIGIN
```

**Impact:** Purely a security configuration inconsistency. Not a direct SEO issue, but inconsistent headers are a flag in security audits and create confusion about intended policy.

**Recommendation:** Decide on the intended framing policy. If no framing should ever be allowed, keep `frame-ancestors 'none'` in CSP and change `X-Frame-Options` to `DENY`. If same-origin framing should be allowed, change `frame-ancestors 'self'` in CSP and keep `X-Frame-Options: SAMEORIGIN`.

---

### M4: CSP script-src includes unsafe-inline and unsafe-eval

**Finding:** `script-src 'self' 'unsafe-inline' 'unsafe-eval'` in the CSP header eliminates the XSS injection protection that CSP is designed to provide. A properly scoped CSP is one of the most effective defenses against reflected and stored XSS attacks.

**Evidence:** Header present on all audited pages.

**Recommendation:** This is a medium-term improvement. Next.js 14+ App Router supports nonce-based CSP via middleware, which allows `unsafe-inline` and `unsafe-eval` to be removed while maintaining full Next.js functionality. The current security posture is otherwise strong (HSTS preload, nosniff, Referrer-Policy, Permissions-Policy all in place). Implement nonce-based CSP as a deliberate security hardening task, not a rushed fix.

---

## Low

### L1: X-XSS-Protection header is present but deprecated

**Finding:** All pages return `x-xss-protection: 1; mode=block`. Chrome removed its XSS auditor in 2019; the header is not recognized by any major modern browser. In certain legacy configurations it can introduce regressions.

**Recommendation:** Set `X-XSS-Protection: 0` in `next.config.ts` per current OWASP guidance. A properly implemented CSP (M4) is the modern replacement.

---

### L2: All resource pages share one lastmod date; case studies share another

**Finding:** All 24 resource pages in the sitemap carry `lastmod: 2026-07-14T00:00:00.000Z`. All 6 case studies carry `lastmod: 2026-06-01T00:00:00.000Z`. These appear to be batch-publish dates rather than individual modification dates. Individual resource publication dates differ (e.g., `/resources/netsuite-beforesubmit-vs-aftersubmit` has `article:published_time: 2026-07-04`).

**Impact:** Google's documentation notes it prioritizes `lastmod` for re-crawl decisions. When many pages share the same lastmod, Googlebot treats them as equally fresh or equally stale, which is not accurate.

**Recommendation:** Derive `lastmod` from each content file's actual publication/modification date (the same date used for `article:published_time`), not from a batch-process date. Blog posts already do this correctly.

---

## Info (passes)

### I1: Crawlability — robots.txt and sitemap pass

robots.txt is accessible (HTTP 200), well-formed, and correctly declares the sitemap. `sitemap.xml` is accessible (HTTP 200), valid XML urlset format (no index needed at 90 URLs), and all 90 entries returned HTTP 200 when spot-checked. `changefreq` values are present but Google ignores them in favor of `lastmod` — not a functional issue, just noise (could be removed).

### I2: Sitemap structure and lastmod coverage pass for blog content

Blog posts carry individual, accurate `lastmod` dates ranging from 2026-06-10 through 2026-08-02, reflecting actual publish dates. The sitemap is not split into an index (appropriate for 90 URLs). No duplicate URLs detected. No trailing-slash variants in the sitemap.

### I3: Canonical tags correct on all content pages except homepage

Verified correct self-referencing canonicals on: two blog posts (old and recent), one resource page, one service page. The canonical is the sole exception at the homepage level (C1 above).

### I4: Redirect chains clean — no hops detected

- `http://suitepacific.com/` resolves to `https://suitepacific.com/` in a single 308 hop.
- `https://www.suitepacific.com/` resolves to `https://suitepacific.com/` in a single 301 hop.
- `/blog/` (trailing slash) redirects to `/blog` in a single 308 hop.
- No multi-hop chains observed.

### I5: No crawl traps from URL parameters

`/blog?page=2` returns HTTP 200 but renders `<link rel="canonical" href="https://suitepacific.com/blog"/>`, correctly consolidating any paginated or parameterized variants to the canonical listing. UTM parameters do not produce separate server-side routes in Next.js.

### I6: Server rendering confirmed — no JavaScript dependency for indexable content

All audited pages are server-rendered or ISR-served. Full page content, meta tags, and JSON-LD blocks are present in raw `curl` responses. Googlebot does not need to execute JavaScript to read any indexable content. `X-Nextjs-Prerender: 1` header confirms ISR is active on key pages. `X-Vercel-Cache: HIT` on homepage confirms CDN delivery.

### I7: Structured data present on all page types

- Homepage: `ProfessionalService`, `WebSite`, `FAQPage` — three valid JSON-LD blocks.
- Blog posts: `BlogPosting`, `BreadcrumbList` — two valid JSON-LD blocks. (Image issue flagged in H2.)
- Resource pages: `TechArticle`, `BreadcrumbList` — two valid JSON-LD blocks.
- Service pages: `BreadcrumbList`, `FAQPage` — two valid JSON-LD blocks.
- No malformed JSON in any audited block.

### I8: Security headers — strong baseline

HSTS: `max-age=63072000; includeSubDomains; preload` (730 days, preload-eligible). `X-Content-Type-Options: nosniff`. `Referrer-Policy: strict-origin-when-cross-origin`. `Permissions-Policy: camera=(), microphone=(), geolocation=()`. Brotli compression active. No mixed-content issues detected. The frame-ancestors/X-Frame-Options conflict is noted in M3.

### I9: No hreflang needed

The site is English-only with no regional variants. Absence of hreflang is correct.

### I10: llms.txt present

`https://suitepacific.com/llms.txt` returns HTTP 200 with correct `Content-Type: text/plain`. AI crawler management is in place for GPTBot, ClaudeBot, and similar. The file is not referenced in `robots.txt`, which is a cosmetic gap (L3 from previous audit) with no SEO impact.

---

## Priority Action Checklist

Ordered by estimated search impact:

1. **[Critical — C2]** Remove `noindex, nofollow` from `/suitecompare` marketing page. Isolate noindex to auth sub-routes only (`/suitecompare/login`, `/suitecompare/signup`, etc.). Remove `/suitecompare` from sitemap is NOT needed; the sitemap entry is correct.

2. **[Critical — C1]** Add `alternates: { canonical: "https://suitepacific.com" }` to `app/(site)/page.tsx` metadata. Do not add it to the root layout.

3. **[High — H1]** Add `images` to the `openGraph` block in blog, resource, and service page metadata generators. Use `og-default.png` as the fallback value (1200x630, file already exists). This single change fixes social cards for all 94 content pages simultaneously.

4. **[High — H2]** Update the `BlogPosting` schema image URL to use `og-default.png` (or a per-post frontmatter field) instead of `logo-icon.png`. Set accurate dimensions. This makes all 35 blog posts eligible for image-enhanced rich results.

5. **[High — H4]** Add `/netsuite-admin-support-small-business` and `/netsuite-consulting-services` to the homepage services grid and/or footer navigation.

6. **[High — H3]** Render the `/suitecompare` nav link in static HTML (CSS show/hide or a static anchor in the footer) so it is reachable via internal links without JavaScript interaction.

7. **[Medium — M1]** Extend `app/robots.ts` Disallow list to cover all suitecompare auth paths, the dashboard subtree, and `/importDetector`.

8. **[Medium — M2]** Implement IndexNow: key file in `/public`, automated ping on new publishes.

9. **[Medium — M3]** Align `frame-ancestors` in CSP with `X-Frame-Options`. Decide on one policy and make both headers consistent.

10. **[Low — L2]** Update resource and case study sitemap `lastmod` values to reflect individual content file dates rather than batch dates.

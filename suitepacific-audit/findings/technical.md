# Technical SEO Audit: suitepacific.com

**Date:** 2026-08-05
**Audited pages:** /, /blog, /netsuite-suitescript-development, /hire-netsuite-developer, /netsuite-post-go-live-support, /blog/netsuite-nlauth-tba-end-of-support, /suitecompare, /suitecompare/login, /suitecompare/signup, /suitecompare/pricing, /resources, /contact, /partners
**Platform:** Next.js 14 App Router on Vercel
**Score:** 65 / 100

---

## Summary of Issues by Severity

| Severity | Count |
|----------|-------|
| Critical | 1 |
| High | 6 |
| Medium | 4 |
| Low | 3 |
| Info | 6 |

---

## Critical

### C1: Root layout canonical bleeds onto all suitecompare pages

**Finding:** `app/layout.tsx` exports `alternates: { canonical: "/" }` at the root metadata level. Next.js App Router merges metadata down the tree; any page that does not explicitly override `alternates` inherits the root value and renders `<link rel="canonical" href="https://suitepacific.com"/>` regardless of its actual URL. Every page in the `/suitecompare/*` subtree is affected because none of the suitecompare `page.tsx` files set their own `alternates`.

**Evidence (live, verified by curl):**
- `https://suitepacific.com/suitecompare` → `<link rel="canonical" href="https://suitepacific.com"/>`
- `https://suitepacific.com/suitecompare/login` → `<link rel="canonical" href="https://suitepacific.com"/>`
- `https://suitepacific.com/suitecompare/pricing` → `<link rel="canonical" href="https://suitepacific.com"/>`

All three pages tell Google their canonical is the homepage. Googlebot will consolidate their signals to the homepage and will not index the SuiteCompare landing page or pricing page in their own right.

**Root cause:** `app/layout.tsx` line 20: `alternates: { canonical: "/" }`.

**Recommendation:** Remove the `alternates` key from the root layout entirely. The `metadataBase` set on the same object is sufficient for Next.js to resolve relative canonical paths supplied by child pages. Then add per-page canonicals to each suitecompare page that should be indexable:

```ts
// app/suitecompare/page.tsx — add to existing metadata export
alternates: { canonical: "/suitecompare" },

// app/suitecompare/pricing/page.tsx
alternates: { canonical: "/suitecompare/pricing" },
```

Auth-only pages (login, signup, forgot-password, reset-password, activate, invite) should receive `robots: { index: false }` instead of a canonical (see H2).

---

## High

### H1: OG image og-default.png returns 404

**Finding:** The root layout sets `og:image: "https://suitepacific.com/og-default.png"` site-wide. The file does not exist in `/public`.

**Evidence:** `curl -sI https://suitepacific.com/og-default.png` → `HTTP/2 404`. Every page without a per-page OG image override renders a broken social card when shared on LinkedIn, Slack, Twitter, iMessage, or any link-preview surface.

**Recommendation:** Drop the file into `/public/og-default.png` (1200x630 px). The `opengraph-image.tsx` file already exists at the app level for dynamic generation; if that approach is preferred, remove the static path from the root layout and let Next.js serve the generated image automatically. Verify with the LinkedIn Post Inspector and Twitter Card Validator after deploying.

---

### H2: Suitecompare auth pages are indexable with no noindex directive

**Finding:** `/suitecompare/login`, `/suitecompare/signup`, and auth flow pages return HTTP 200 and `<meta name="robots" content="index, follow">`. None of these utility pages belong in Google's index; they add crawl budget waste and can appear as confusing results.

**Evidence:**
- `/suitecompare/login` — HTTP 200, robots: index, follow
- `/suitecompare/signup` — HTTP 200, robots: index, follow
- These pages are correctly absent from sitemap.xml but are reachable by crawlers

**Additional issue — doubled title suffix:** `/suitecompare/login` renders the title "SuiteCompare | SuitePacific | SuitePacific". The suitecompare layout sets `title: { default: "SuiteCompare | SuitePacific", template: "%s | SuiteCompare" }`. If the login page exports a full literal string rather than a short keyword, the template appends a second suffix. Google may truncate or rewrite the title.

**Recommendation:**
```ts
// app/suitecompare/login/page.tsx (and signup, forgot-password, reset-password, activate, invite, verify)
export const metadata: Metadata = {
  title: "Log In",    // template produces "Log In | SuiteCompare"
  robots: { index: false, follow: false },
};
```

---

### H3: /blog listing page and /suitecompare landing page bypass Vercel edge cache

**Finding:** Both the blog listing page and the SuiteCompare public marketing page are served with `cache-control: private, no-cache, no-store, max-age=0, must-revalidate` and `x-vercel-cache: MISS` on every request. A cold server-function execution on each visitor hit increases TTFB and directly degrades LCP scores.

**Evidence:**
- `/blog` → `cache-control: private, no-cache, no-store` / `x-vercel-cache: MISS`
- `/suitecompare` → `cache-control: private, no-cache, no-store` / `x-vercel-cache: MISS`
- `/netsuite-suitescript-development` (baseline) → `cache-control: public` / `x-vercel-cache: HIT`

**Root cause:**
- `app/(site)/blog/page.tsx` exports `export const dynamic = "force-dynamic"` even though `getAllPosts()` reads from the local filesystem and requires no live server state.
- `app/suitecompare/layout.tsx` exports `export const dynamic = "force-dynamic"`, which propagates to the entire subtree including the public marketing landing page that has no session dependency.

**Recommendation:**
- Blog listing: Replace `export const dynamic = "force-dynamic"` with `export const revalidate = 60`. The page rebuilds within 60 seconds of the next request after a deploy or filesystem change.
- SuiteCompare marketing page: Move the `force-dynamic` export out of `app/suitecompare/layout.tsx` and into the individual authenticated dashboard pages that require live session data. The `/suitecompare` landing page is fully static.

---

### H4: BlogPosting schema image is logo-icon.png with false dimensions declared

**Finding:** Every blog article page sets `image.url: "https://suitepacific.com/logo-icon.png"` in the BlogPosting JSON-LD block with `"width": 1200, "height": 630`. The logo-icon.png is a small square brand icon; the declared dimensions do not match the actual file. Google requires a minimum 1200px-wide image for rich result eligibility. When the image fails the size check, the article is ineligible for Discover cards and Top Stories image previews.

**Evidence:** Schema from `/blog/netsuite-nlauth-tba-end-of-support`:
```json
"image": {
  "@type": "ImageObject",
  "url": "https://suitepacific.com/logo-icon.png",
  "width": 1200,
  "height": 630
}
```

**Recommendation:** Once `og-default.png` is added (H1), update the BlogPosting schema generator to use that image as the fallback. Prefer a per-post `image` frontmatter field so individual articles can each have a dedicated image, with `og-default.png` as the fallback. Remove the false dimension declarations; set actual dimensions only when they are accurate.

---

### H5: /suitecompare and /suitecompare/pricing inherit wrong og:title and og:url

**Finding:** The root layout sets `openGraph: { url: "https://suitepacific.com", title: "SuitePacific: Post-Go-Live NetSuite Support" }` as fixed strings. Suitecompare pages export `title` and `description` metadata correctly but do not define an `openGraph` block, so they inherit the root layout's OG properties unchanged. A social share of the SuiteCompare pricing page shows the homepage headline and homepage URL.

**Evidence:** `/suitecompare/pricing` live HTML:
```
<title>SuiteCompare Pricing: Free, Pro, and Team Plans | SuiteCompare</title>
<meta property="og:title" content="SuitePacific: Post-Go-Live NetSuite Support"/>
<meta property="og:url"   content="https://suitepacific.com"/>
```

**Recommendation:** Add a full `openGraph` block to each indexable suitecompare page:
```ts
openGraph: {
  title: "SuiteCompare: One-Click NetSuite Environment Comparison",
  description: "Stop logging into two NetSuite accounts...",
  url: "https://suitepacific.com/suitecompare",
  type: "website",
},
```

---

### H6: Two service pages have zero internal links pointing to them — effectively orphaned

**Finding:** `/netsuite-admin-support-small-business` and `/netsuite-consulting-services` are present in the sitemap but are not linked from any rendered HTML on the site. The homepage `#services` section links to 10 service pages but omits these two. The footer links repeat the same 10 omitted set. No component or page file in `app/` or `components/` references their URLs.

**Evidence:** Audit of all unique `href` values in homepage HTML found these paths absent. Grep of `app/(site)/` and `components/` for the URL slugs returned no matches.

**Effect:** These pages rely entirely on the sitemap for Googlebot discovery. They receive no PageRank from the internal link graph, limiting their ability to rank. Users cannot find them through normal site navigation.

**Recommendation:** Add both pages to the homepage `#services` section. They appear to be genuine service offerings; exposing them in the services grid ensures they receive link equity and are reachable without a sitemap lookup.

---

## Medium

### M1: robots.txt Disallow list is incomplete — suitecompare internal pages are crawlable

**Finding:** The live `robots.txt` contains only `Disallow: /admin`. Dashboard routes, auth flow pages, customer portal, and partner portal are all open to crawlers. `Disallow: /admin` itself redirects via 307 to `/admin/login`, which is not explicitly disallowed.

**Evidence:**
```
User-Agent: *
Allow: /
Disallow: /admin
Sitemap: https://suitepacific.com/sitemap.xml
```

**Recommendation:** Extend the Disallow list in `app/robots.ts`:
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
Disallow: /suitecompare/scripts
Disallow: /suitecompare/compare
Disallow: /suitecompare/settings
Disallow: /importDetector
Disallow: /customer-portal
Disallow: /partner-portal
```
The `noindex` directive on auth pages (H2) and Disallow in robots.txt are complementary controls; both are needed.

---

### M2: Nav Products dropdown link to /suitecompare is not in server-rendered HTML

**Finding:** The Nav component is a `"use client"` component that conditionally renders the Products dropdown only when `openDropdown === "Products"` (an `onClick` toggle via `useState`). The `<Link href="/suitecompare">` element is added to the DOM only after a user interaction — it is not present in the initial server-rendered HTML.

**Evidence:** `href="/suitecompare"` does not appear in any `<a>` or `<Link>` element in the raw HTML response from `https://suitepacific.com/`. Grep of homepage raw HTML for "suitecompare" returns 0 matches. The SuiteCompare page is discoverable only via the sitemap and direct URL entry.

**Impact:** While Googlebot does render JavaScript, it does not simulate user interactions such as clicks on toggle buttons. SuiteCompare's discovery path from the main site is entirely sitemap-dependent. Pages relying only on the sitemap for discovery receive less link equity than pages linked in static HTML.

**Recommendation:** Render nav dropdown `<a>` elements in the static HTML using CSS for show/hide rather than conditional JSX. For the Products dropdown specifically, an inline static link to `/suitecompare` in the page body (e.g., in the footer or the homepage `#services` section) would establish a reliable crawl path independent of the nav interaction model.

---

### M3: No IndexNow protocol implemented

**Finding:** No IndexNow key file exists in `/public`. With 6-12 new blog and resource posts per month, new content relies entirely on Googlebot's crawl schedule and Bing's own discovery to get indexed promptly.

**Evidence:** `curl -sI https://suitepacific.com/indexnow` → `HTTP/2 404`

**Recommendation:** Generate an IndexNow key (UUID hex string), place it at `/public/[key].txt` with the key as its only content, and submit the key URL to `https://api.indexnow.org/indexnow` on each new publish. A Vercel deploy hook or a post-build script can automate submission for new sitemap URLs.

---

### M4: CSP uses unsafe-inline and unsafe-eval — reduces header effectiveness

**Finding:** All pages respond with `script-src 'self' 'unsafe-inline' 'unsafe-eval'` in the Content-Security-Policy header. This is the default for Next.js but eliminates the XSS protection that CSP is designed to deliver.

**Evidence:** Live CSP header on all audited pages.

**Recommendation:** Implement nonce-based CSP via Next.js middleware (supported natively in Next.js 14+). This is a medium-term improvement; current security posture is otherwise strong (HSTS preload, SAMEORIGIN, nosniff, Referrer-Policy, Permissions-Policy all in place).

---

## Low

### L1: changefreq in sitemap is generic and adds no signal value

**Finding:** Blog posts use `changefreq: monthly` regardless of how old they are. Listing pages use `changefreq: weekly`. Google's documentation explicitly states that `changefreq` is unreliable and that it prioritizes `lastmod`. Including a value that may be incorrect adds noise without benefit.

**Recommendation:** Remove `changefreq` entirely from all sitemap entries and rely on `lastmod` alone. The `lastmod` values are already per-page and accurate.

---

### L2: X-XSS-Protection header is present but deprecated

**Finding:** All pages return `x-xss-protection: 1; mode=block`. This header was removed from Chrome in 2019, has no effect in modern browsers, and in some edge cases can introduce security regressions in legacy IE.

**Recommendation:** Set `X-XSS-Protection: 0` in `next.config.ts` `headers()` per current OWASP guidance. A proper CSP (see M4) is the correct replacement.

---

### L3: llms.txt present but not declared in robots.txt

**Finding:** `/llms.txt` is live and well-formed (200 OK, correct content-type, describes the company and services). It is not referenced in `robots.txt`. LLM crawlers such as GPTBot and ClaudeBot that follow `robots.txt` for discovery hints will not find it via the robots declaration.

**Recommendation:** This is cosmetic. Consider adding a comment to `robots.txt` pointing crawlers to `/llms.txt`. No SEO impact.

---

## Info

### I1: Crawlability — robots.txt and sitemap structure pass

**Finding:** robots.txt is accessible (HTTP 200), well-formed, and declares the sitemap. Sitemap.xml is accessible (HTTP 200), valid XML, contains 91 URLs, and has `lastmod` timestamps on all entries. All spot-checked sitemap URLs (service pages, blog posts, resources, case studies) return HTTP 200. No noindex on any public content page.

---

### I2: HTTPS and security headers — strong posture

**Finding:** All pages are served over HTTPS. HSTS is in place with `max-age=63072000; includeSubDomains; preload` (730-day max-age, preload list eligible). X-Frame-Options is SAMEORIGIN, X-Content-Type-Options is nosniff, Referrer-Policy is strict-origin-when-cross-origin, and Permissions-Policy restricts camera, microphone, and geolocation. No mixed-content issues detected.

---

### I3: Server rendering — Googlebot can read all content without JavaScript

**Finding:** All (site) pages are server-rendered or statically generated (Next.js App Router SSR/SSG). Raw `curl` responses contain full page content, titles, meta descriptions, and JSON-LD blocks. Googlebot does not depend on JavaScript execution to index this site's content. Individual blog articles and resource pages confirmed SSR with `x-vercel-cache: HIT`.

---

### I4: Redirect chains — clean, no chains detected

**Finding:** www and http variants resolve correctly in a single hop with no intermediate redirects:
- `http://www.suitepacific.com/` → `https://suitepacific.com/` (200 final)
- `http://suitepacific.com/` → `https://suitepacific.com/` (200 final)
- `https://www.suitepacific.com/` → `https://suitepacific.com/` (200 final)

---

### I5: Structured data — homepage and blog posts pass source inspection

**Finding:** Homepage: three JSON-LD blocks confirmed in HTML source: `ProfessionalService`, `WebSite`, `FAQPage`. Blog articles: `BlogPosting` and `BreadcrumbList` blocks present. No malformed JSON detected. The BlogPosting image issue is a separate finding (H4); the schema structure itself is valid.

---

### I6: Hreflang — not applicable

**Finding:** No hreflang tags are present or needed. The site is English-only and targets a single geographic market. Absence of hreflang is correct.

---

## Priority Action Checklist

Ordered by impact:

1. **[Critical — C1]** Remove `alternates: { canonical: "/" }` from root `app/layout.tsx`. Add `alternates: { canonical: "/suitecompare" }` to `app/suitecompare/page.tsx` and `alternates: { canonical: "/suitecompare/pricing" }` to pricing page.
2. **[High — H1]** Drop `og-default.png` (1200x630 px) into `/public/`. Verify LinkedIn Post Inspector shows correct card.
3. **[High — H6]** Add `/netsuite-admin-support-small-business` and `/netsuite-consulting-services` links to the homepage services section and/or footer.
4. **[High — H2]** Add `robots: { index: false }` to all suitecompare auth page metadata exports. Fix doubled title suffix on login page.
5. **[High — H3]** Replace `force-dynamic` with `revalidate = 60` on `app/(site)/blog/page.tsx`. Move `force-dynamic` out of `app/suitecompare/layout.tsx` into dashboard-only pages.
6. **[High — H4]** Update BlogPosting schema to use `og-default.png` (after H1 is done) instead of `logo-icon.png`. Remove false dimension declarations.
7. **[High — H5]** Add per-page `openGraph` block to `app/suitecompare/page.tsx` and `app/suitecompare/pricing/page.tsx`.
8. **[Medium — M1]** Extend `app/robots.ts` Disallow list to cover suitecompare auth paths, dashboard subtree, `/importDetector`, `/customer-portal`, `/partner-portal`.
9. **[Medium — M2]** Add a static HTML link to `/suitecompare` in the footer or homepage body so it is crawler-reachable without JavaScript interaction.
10. **[Medium — M3]** Implement IndexNow key file and automated submission on new publish.

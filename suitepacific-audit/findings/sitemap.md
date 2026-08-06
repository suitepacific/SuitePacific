# Sitemap Audit: suitepacific.com

**Audit date:** 2026-08-07
**Sitemap URL:** https://suitepacific.com/sitemap.xml
**Discovery:** Declared in robots.txt; validated as `urlset` kind; HTTP 200
**Total URLs:** 90 (task brief cited 88; actual count is 90 - 15 service/static pages vs. the 9 listed in the brief)

---

## Pass / Fail Summary

| Check | Result | Notes |
|---|---|---|
| Sitemap discoverable via robots.txt | PASS | Declared and resolves to HTTP 200 |
| XML structure valid | PASS | Well-formed `urlset`; correct namespace |
| URL count within 50,000 limit | PASS | 90 URLs |
| Sitemap file size within 50 MB | PASS | Small flat file |
| All URLs return HTTP 200 | PASS | All 90 confirmed 200 |
| No admin/private pages in sitemap | PASS | Admin, portals, app routes excluded |
| lastmod dates present | PASS | All URLs have lastmod |
| lastmod dates accurate | PARTIAL FAIL | Resources and case studies use hardcoded batch dates |
| Noindexed URLs absent from sitemap | FAIL | /suitecompare is in sitemap but carries noindex |
| priority / changefreq present | INFO | Both present; both ignored by Google |
| Image sitemap | MISSING | No image sitemap or image tags anywhere |

---

## Findings

### [HIGH] /suitecompare is in the sitemap but served with noindex, nofollow

**URL:** `https://suitepacific.com/suitecompare`
**Sitemap lastmod:** 2026-07-19

The `app/suitecompare/layout.tsx` exports `robots: { index: false, follow: false }` which cascades to every route under `/suitecompare/`, including the public marketing landing page. The sitemap declares this URL (implying it should be indexed), while the page itself signals the opposite. Google resolves this conflict by honoring the noindex and not indexing the page, making the sitemap entry a waste.

This is the flagship product landing page. If it is intended to be indexed, the metadata override must be placed directly in `app/suitecompare/page.tsx`. If it is intentionally private, remove it from the sitemap generator (`sitemap.ts` line 25).

**Fix (if the marketing page should be indexed):**
Add an explicit metadata export to `app/suitecompare/page.tsx` overriding the layout-level noindex:
```ts
export const metadata: Metadata = {
  robots: { index: true, follow: true },
  // ... title, description, etc.
};
```

---

### [MEDIUM] robots.txt only disallows /admin; app routes under /suitecompare, /importDetector, and portals are crawlable

**robots.txt Disallow:** `/admin` only

The following routes are publicly reachable (HTTP 200) but only carry `noindex, nofollow` meta tags:
- `/suitecompare/login`, `/suitecompare/signup`, `/suitecompare/dashboard/*`, `/suitecompare/accounts/*`, etc.
- `/importDetector`
- `/customer-portal/*`
- `/partner-portal/*`

Meta robots prevents indexing, but Googlebot still follows the links, fetches the pages, and spends crawl budget on them. At 90 public URLs today this is low-impact, but as content scales the unblocked app routes will dilute crawl budget away from indexable pages.

**Fix:** Add Disallow rules in `app/robots.ts`:
```ts
rules: [
  { userAgent: "*", allow: "/", disallow: "/admin" },
  { userAgent: "Googlebot", disallow: ["/suitecompare/login", "/suitecompare/signup",
    "/suitecompare/dashboard", "/suitecompare/accounts", "/suitecompare/settings",
    "/suitecompare/scripts", "/suitecompare/compare", "/suitecompare/activate",
    "/suitecompare/invite", "/suitecompare/verify", "/suitecompare/forgot-password",
    "/suitecompare/reset-password", "/importDetector", "/customer-portal", "/partner-portal"] },
],
```

---

### [MEDIUM] All 30 resource pages share one hardcoded lastmod; individual file dates are available but unused

**Affected URLs:** All 30 `/resources/*` entries
**Current lastmod:** `2026-07-14` (hardcoded in `sitemap.ts` as `new Date("2026-07-14")`)
**Actual `publishedAt` range in content files:** 2026-07-01 through 2026-07-27

The resource content files contain a `publishedAt` frontmatter field with accurate per-file dates. The sitemap generator ignores this and applies a single batch date. Googlebot uses lastmod to decide whether to re-crawl; uniform dates provide no signal about which resources actually changed.

**Fix:** In `sitemap.ts`, pass the `publishedAt` date from each resource's frontmatter into the sitemap entry, the same way blog posts already derive lastmod from `post.date`.

---

### [MEDIUM] All 6 case studies share one hardcoded lastmod equal to the site launch date

**Affected URLs:** All 6 `/case-studies/*` entries
**Current lastmod:** `2026-06-01` (site launch date, hardcoded as `SITE_LAUNCH_DATE`)

If case studies have been revised since launch, the lastmod date is stale. If they have not been revised, the date is technically accurate but indistinguishable from placeholder dates. Case study files should carry a `lastmod` or `updatedAt` frontmatter field so the sitemap can reflect actual changes.

---

### [LOW] priority and changefreq present on all 90 URLs

Google has publicly confirmed it ignores both `<priority>` and `<changefreq>`. Bing and other crawlers similarly treat them as advisory at best. All 90 entries carry both fields, which adds unnecessary payload to every sitemap parse.

**Fix:** Remove both fields from all four `sitemap.ts` return statements. The sitemap spec allows `<url>` entries with only `<loc>` and `<lastmod>`.

---

### [LOW] lastmod uses full ISO 8601 datetime with .000Z suffix rather than date-only format

**Example value:** `2026-08-05T00:00:00.000Z`
**Preferred:** `2026-08-05`

W3C Datetime (the sitemap spec's required format) allows `YYYY-MM-DD` as a valid short form. The midnight UTC timestamp is technically valid but implies time-of-day precision that does not exist. The `.000Z` suffix is cosmetic noise on a batch-generated date. Next.js emits this format by default because JavaScript `Date.toISOString()` includes it; passing a date-string directly avoids the suffix.

---

### [INFO] No image sitemap and no image: tags

There is no image sitemap and no `<image:image>` extensions within the existing sitemap entries. Pages with meaningful images (homepage hero, case study screenshots, OG images) are not eligible for image search discovery via sitemap.

This is a low-priority enhancement for the current site, but worth noting as case studies and blog posts accumulate visuals.

---

## Missing Pages Analysis

No important indexable pages are absent from the sitemap.

| Page | In Sitemap | noindex | Notes |
|---|---|---|---|
| `/suitecompare` | YES | YES (via layout) | Conflict - see HIGH finding above |
| `/suitecompare/pricing` | NO | YES | Correct exclusion |
| `/importDetector` | NO | YES | Correct exclusion |
| `/customer-portal` | NO | YES | Correct exclusion |
| `/partner-portal` | NO | YES | Correct exclusion |
| `/admin/*` | NO | YES + robots.txt | Correct exclusion |
| All 35 blog posts | YES | NO | Full coverage |
| All 30 resources | YES | NO | Full coverage |
| All 6 case studies | YES | NO | Full coverage |
| All service pages | YES | NO | Full coverage (15 pages) |

---

## URL Count Breakdown

| Section | Count |
|---|---|
| Homepage | 1 |
| /blog (listing) | 1 |
| /resources (listing) | 1 |
| /case-studies (listing) | 1 |
| Service and static pages | 15 |
| /case-studies/* | 6 |
| /resources/* | 30 |
| /blog/* | 35 |
| **Total** | **90** |

---

## Priority Fix Order

1. Resolve the `/suitecompare` noindex conflict (decide: index or remove from sitemap)
2. Add robots.txt Disallow rules for app routes and portals
3. Wire resource `publishedAt` dates into sitemap lastmod (same pattern as blog posts)
4. Strip `priority` and `changefreq` from `sitemap.ts`
5. Add `lastmod`/`updatedAt` frontmatter to case study files and wire them into the sitemap

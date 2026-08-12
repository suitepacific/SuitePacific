# Sitemap Audit: suitepacific.com

**Audit date:** 2026-08-09
**Sitemap URL:** https://suitepacific.com/sitemap.xml
**Discovery:** Declared in robots.txt; validates as `urlset`; HTTP 200 with `content-type: application/xml`
**Total URLs:** 94

---

## Pass / Fail Summary

| Check | Result | Notes |
|---|---|---|
| Sitemap discoverable via robots.txt | PASS | `Sitemap: https://suitepacific.com/sitemap.xml` present |
| XML structure valid | PASS | Well-formed `urlset`, correct namespace, xmllint exit 0 |
| URL count within 50,000 limit | PASS | 94 URLs |
| Sitemap file size within 50 MB | PASS | Small flat file |
| Spot-checked URLs return HTTP 200 | PASS | 20/20 checked return 200 direct (no redirects) |
| No redirect chains in sitemap | PASS | www redirects to non-www; all sitemap URLs use non-www |
| No duplicate URLs | PASS | Zero duplicates |
| Noindexed URLs absent from sitemap | PASS | /suitecompare is a public marketing page (index, follow) |
| Auth-gated app routes excluded | PASS | /suitecompare/dashboard, /importDetector, /customer-portal, /partner-portal all absent |
| priority / changefreq absent | PASS | Both deprecated fields correctly removed |
| lastmod dates present | PASS | All 94 URLs have lastmod |
| lastmod dates accurate | PARTIAL | Blog and resource individual pages use real dates; /resources index is stale; see findings |
| Coverage: all indexable pages included | FAIL | /netsuite-freelancer-vs-consulting-firm missing; see HIGH finding |

---

## Findings

### [HIGH] /netsuite-freelancer-vs-consulting-firm is live and indexable but absent from sitemap

**URL:** `https://suitepacific.com/netsuite-freelancer-vs-consulting-firm`
**HTTP status:** 200
**Meta robots:** `index, follow`
**Title:** NetSuite Freelancer vs. Consulting Firm: How to Choose | SuitePacific

This is a full service/comparison page with a distinct title, clear crawlability signal, and a route file at `app/(site)/netsuite-freelancer-vs-consulting-firm/page.tsx`. It is not listed in `sitemap.ts`'s `SERVICE_PAGES` array and therefore never appears in the generated sitemap. Googlebot will only discover it via internal links, not via sitemap hint, which delays indexing and removes the lastmod signal entirely.

**Fix:** Add the entry to `SERVICE_PAGES` in `app/sitemap.ts`:
```ts
{ path: "/netsuite-freelancer-vs-consulting-firm", lastModified: SEO_REFRESH_DATE },
```

---

### [MEDIUM] /resources index lastmod is hardcoded to 2026-07-14 but newest resource is dated 2026-07-27

**Affected URL:** `https://suitepacific.com/resources`
**Current lastmod:** `2026-07-14T00:00:00.000Z`
**Newest resource publishedAt:** `2026-07-27` (netsuite-fsm-bundle-update-2026-checklist)

`sitemap.ts` line 36 hardcodes `new Date("2026-07-14")` for the resources index while individual resource pages correctly use their `publishedAt` frontmatter value. This means the index page's lastmod is 13 days behind the most recent content addition. Google uses this date to decide whether to re-crawl the listing page, so a stale date here reduces the chance of the index being re-crawled after new resources are added.

**Fix:** Derive the resources index lastmod dynamically, mirroring the blog index pattern:
```ts
{ url: `${SITE_URL}/resources`, lastModified: resources.length > 0 ? new Date(resources[0].publishedAt) : SITE_LAUNCH_DATE },
```
This requires `getAllResources()` to return items sorted by `publishedAt` descending, which should already be the case if the listing page sorts them that way.

---

### [LOW] lastmod format uses ISO 8601 full datetime with .000Z suffix instead of date-only

**Example value:** `2026-08-05T00:00:00.000Z`
**Preferred:** `2026-08-05`

W3C Datetime (the sitemap spec) allows the short `YYYY-MM-DD` form and it is the most common format in production sitemaps. The full timestamp suffix implies time-of-day precision that does not exist (all dates are midnight UTC because JavaScript `Date.toISOString()` emits this by default). Google accepts both forms, so this is cosmetic, but the simpler format is less noisy and easier to read in Search Console.

No fix required; revisit if sitemap tooling allows passing date strings directly.

---

### [LOW] Case study pages all share a single hardcoded lastmod equal to the site launch date

**Affected URLs:** All 6 `/case-studies/*` entries
**Current lastmod:** `2026-06-01T00:00:00.000Z` (SITE_LAUNCH_DATE constant)

If a case study was meaningfully revised after launch, its lastmod is stale. If none were revised, the date is technically accurate but signals nothing. Adding an optional `updatedAt` frontmatter field to case study content files and wiring it into the sitemap generator would provide accurate per-page signals as case studies evolve.

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
| /blog/* | 39 |
| **Total** | **94** |

Note: The task brief cited 88 URLs. The actual count is 94 because newer blog and resource posts have been published since the brief was written.

---

## Auth-Gated and Private Routes (correctly excluded)

All of the following are absent from the sitemap and correctly Disallowed in robots.txt:

- `/suitecompare/login`, `/suitecompare/signup`, `/suitecompare/dashboard`, `/suitecompare/accounts`, `/suitecompare/settings`, `/suitecompare/scripts`, `/suitecompare/compare`, `/suitecompare/activate`, `/suitecompare/invite`, `/suitecompare/verify`, `/suitecompare/forgot-password`, `/suitecompare/reset-password`
- `/importDetector`
- `/customer-portal`
- `/partner-portal`
- `/admin`

`/suitecompare` (root) is correctly included: it serves a public marketing landing page with `index, follow` and a distinct product title.

---

## What Works Well

- XML is valid and well-formed
- Sitemap declared in robots.txt with correct absolute URL
- No priority or changefreq tags (correctly removed; both ignored by Google)
- All 20 spot-checked URLs return HTTP 200 with no redirects
- No duplicate URLs
- Blog entries use `post.updated ?? post.date` for accurate per-post lastmod
- Individual resource entries use `resource.publishedAt` for accurate per-resource lastmod
- /blog index lastmod derives dynamically from the latest post date
- All auth-gated app routes are excluded from sitemap and blocked in robots.txt
- Non-www canonical is consistent throughout (sitemap, robots.txt, and live site all use suitepacific.com)

---

## Priority Fix Order

1. Add `/netsuite-freelancer-vs-consulting-firm` to SERVICE_PAGES in `app/sitemap.ts` (HIGH)
2. Make `/resources` index lastmod dynamic using the newest resource's publishedAt (MEDIUM)
3. Add `updatedAt` frontmatter to case study files and wire into sitemap (LOW, future)

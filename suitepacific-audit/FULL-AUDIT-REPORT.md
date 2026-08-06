# SuitePacific — Full SEO Audit Report
**Date:** 2026-08-07
**Domain:** suitepacific.com
**Technology:** Next.js 14 App Router on Vercel (SSR, not SPA)
**Business type:** NetSuite post-go-live consulting / professional services
**Pages in sitemap:** 90 (35 blog, 30 resources, 6 case studies, 15 service/static, 4 listings)
**Agents run:** Technical, Content, Schema, Sitemap, SXO, GEO, Backlinks (7 complete; Performance file missing; Cluster pending)

---

## SEO Health Score: 62 / 100

| Category | Weight | Score | Notes |
|----------|--------|-------|-------|
| Technical SEO | 22% | 65 | C1 canonical bleed, cache issues, orphaned pages |
| Content Quality | 23% | 72 | Strong expertise; 13 thin posts; 5 zero-link posts |
| On-Page SEO (SXO) | 20% | 52 | CTA exits page; 4 pages missing mid-form; no pricing |
| Schema / Structured Data | 10% | 60 | 2 criticals; service pages missing Service schema |
| Performance (CWV) | 10% | 68 | SSR+CDN strong; blog force-dynamic hurts TTFB |
| AI Search Readiness | 10% | 64 | Improved post-GEO audit; Reddit/YouTube gap remains |
| Images | 5% | 40 | logo-icon.png as article image; no per-post OG images |
| **Total** | 100% | **62** | |

*Backlinks: INSUFFICIENT DATA — domain is 6 weeks old, not yet in Common Crawl (Jan-Mar 2026 release). Re-run in September 2026.*

*og-default.png: flagged 404 by technical agent — file IS committed and live as of 2026-08-05 push. Agent ran before deploy. Resolved.*

*dateModified: flagged as static by content agent — IS wired as `post.updated ?? post.date`. Schema agent confirmed working on TBA post. Resolved.*

---

## Critical Issues (fix this week)

### C1 [Technical]: Root layout canonical bleeds to all /suitecompare pages
Every page that doesn't explicitly override `alternates` inherits `canonical: "/"` from `app/layout.tsx`. All SuiteCompare pages — including the product landing page — tell Google their canonical is the homepage.

**Fix:** Remove `alternates: { canonical: "/" }` from `app/layout.tsx`. Add per-page canonicals to `/suitecompare` and `/suitecompare/pricing`. Add `robots: { index: false }` to auth pages.

```ts
// app/layout.tsx — remove this line:
alternates: { canonical: "/" },

// app/suitecompare/page.tsx — add:
alternates: { canonical: "/suitecompare" },
robots: { index: true, follow: true }, // overrides layout noindex
```

---

### C2 [Technical + Sitemap]: /suitecompare is noindexed but in sitemap
`app/suitecompare/layout.tsx` exports `robots: { index: false, follow: false }`, which cascades to the public marketing page. The sitemap lists it. Google resolves the conflict by honoring noindex — the flagship product page is not being indexed.

**Fix:** Add explicit `robots: { index: true, follow: true }` in `app/suitecompare/page.tsx` to override the layout. Move `force-dynamic` out of the layout into individual authenticated dashboard pages only.

---

### C3 [Schema]: Case study Article block missing required fields
`app/(site)/case-studies/[slug]/page.tsx` emits an Article block without `datePublished`, `dateModified`, or `image` — all three required by Google for Article rich results. Also hardcodes `"SuitePacific"` instead of `LEGAL_NAME`.

**Fix:**
1. Add `publishedAt` and `updatedAt` fields to the `CaseStudy` data model in `lib/case-studies.ts`
2. Update the inline Article block to include `image` (with `width: 1200, height: 630`), `datePublished`, `dateModified`, and use `LEGAL_NAME`

---

### C4 [Schema]: /suitecompare has zero structured data
The product marketing page emits 0 JSON-LD blocks. No `SoftwareApplication`, no `BreadcrumbList`.

**Fix:** Add two static blocks to `app/suitecompare/page.tsx`:
```json
{
  "@context": "https://schema.org",
  "@type": "SoftwareApplication",
  "name": "SuiteCompare",
  "description": "Compare NetSuite Production and Sandbox SuiteScript files side-by-side in one click.",
  "url": "https://suitepacific.com/suitecompare",
  "applicationCategory": "BusinessApplication",
  "operatingSystem": "Web",
  "offers": { "@type": "Offer", "price": "0", "priceCurrency": "USD" },
  "provider": { "@type": "Organization", "name": "SuitePacific, LLC", "url": "https://suitepacific.com" }
}
```

---

### C5 [SXO]: Primary CTA button exits all 5 service pages to /contact
Every service page has `<Button href="/contact">` as the first CTA. Users who click leave the page, lose scroll context, and re-engage on a generic form page.

**Fix:** Change `href="/contact"` to `href="#contact"` on all service pages. Ensure each page has `id="contact"` on its LeadForm wrapper.

---

## High Priority (fix within 1 week)

### H1 [Technical]: /suitecompare auth pages are indexable
Login, signup, and all auth flow pages return HTTP 200 with `robots: index, follow`. Also: `/suitecompare/login` title renders doubled suffix ("SuiteCompare | SuitePacific | SuitePacific").

**Fix:** Add `robots: { index: false, follow: false }` and `title: "Log In"` to each auth page metadata export.

---

### H2 [Technical]: Blog listing + /suitecompare bypass Vercel CDN
`blog/page.tsx` has `force-dynamic` despite reading only from the filesystem. `suitecompare/layout.tsx` has `force-dynamic`, propagating to the public marketing page. Both serve no-cache on every request.

**Fix:** Blog: `revalidate = 60`. SuiteCompare: move `force-dynamic` to authenticated dashboard pages only.

---

### H3 [Technical]: Two orphaned service pages with zero internal links
`/netsuite-admin-support-small-business` and `/netsuite-consulting-services` are in the sitemap but linked from nowhere in the site HTML. No PageRank from the internal link graph.

**Fix:** Add both to the homepage services section and/or footer.

---

### H4 [Technical]: Nav Products link to /suitecompare not in server-rendered HTML
The Products dropdown exists only after a user click (useState toggle). `/suitecompare` is discoverable by Googlebot only via the sitemap.

**Fix:** Add a static `<a href="/suitecompare">` in the footer or homepage body.

---

### H5 [Technical]: /suitecompare inherits wrong og:title and og:url from root layout
Social shares of SuiteCompare show "SuitePacific: Post-Go-Live NetSuite Support" and the homepage URL.

**Fix:** Add a full `openGraph` block to `app/suitecompare/page.tsx` and `app/suitecompare/pricing/page.tsx`.

---

### H6 [Schema]: BlogPosting image missing width/height
`components/seo/JsonLd.tsx` line 71 emits image with no dimensions. Google requires 1200px min for Article rich results. TechArticle on resources already has the dimensions correctly — blog just needs to match.

**Fix:** Add `width: 1200, height: 630` to the image object in `BlogPostingJsonLd`. One-line change.

---

### H7 [SXO]: 4 of 5 service pages have only one form, at the bottom
Only `/hire-netsuite-developer` has a mid-page LeadForm. The other four have a single form after the FAQ. Most visitors exit before 50% scroll.

**Fix:** Add a mid-page LeadForm to `/netsuite-post-go-live-support`, `/netsuite-consulting-services`, `/netsuite-suitescript-development`, and `/netsuite-admin-support-small-business`, positioned after the "What we cover" section.

---

### H8 [SXO + Content]: Social proof only on /hire-netsuite-developer
The hire page has a "Recent Work" case study strip. The other 4 service pages have none. CFO/Controller personas need external evidence, not self-assertion.

**Fix:** Add 2-3 case study cards to each of the 4 remaining service pages. The case study card component already exists on the hire page.

---

### H9 [Content]: 13 of 36 blog posts under 800 words
Thin posts (all 2026.2 release summaries): netsuite-currency-context-custom-fields (~456w), netsuite-bill-capture-preferences-2026-2 (~480w), netsuite-sales-order-fulfillment-list (~571w), netsuite-suitetax-term-discounts (~606w), netsuite-payment-adjustments-2026-2 (~632w), netsuite-project-health-indicators-2026-2 (~680w), netsuite-passkey-second-factor-2026-2 (~698w), netsuite-advanced-record-customization-2026-2 (~716w), netsuite-rest-batch-sequential (~736w), netsuite-suiteql-bound-parameters (~740w), netsuite-payment-runs-2026-2 (~779w), advanced-pdf-template-mistakes (~790w).

Most are paired with a near-duplicate resource page — two thin pages instead of one strong one.

**Fix:** For each blog/resource pair: either consolidate into one 1,000+ word comprehensive page, or expand each independently with before/after examples and edge cases.

---

### H10 [Content]: 5 blog posts have zero internal links
`netsuite-payment-adjustments-2026-2`, `netsuite-payment-runs-2026-2`, `netsuite-rest-batch-sequential`, `netsuite-sales-order-fulfillment-list`, `signs-netsuite-support-not-working` — no links to service pages, related posts, or resources.

`signs-netsuite-support-not-working` is the most important miss: high commercial intent, no link to `/netsuite-post-go-live-support` or `/#contact`.

---

## Medium Priority (fix within 1 month)

| # | Area | Finding |
|---|------|---------|
| M1 | Technical | robots.txt only blocks /admin; suitecompare dashboard, portals, /importDetector crawlable — wastes crawl budget |
| M2 | Sitemap | 30 resource pages share hardcoded lastmod 2026-07-14 — wire per-file publishedAt dates |
| M3 | Sitemap | 6 case study pages all use site launch date (2026-06-01) as lastmod |
| M4 | Schema | Service pages missing Service-type schema — add ServiceJsonLd to all 8 service pages |
| M5 | Schema | /blog listing has no schema — add BreadcrumbList at minimum |
| M6 | SXO | Services nav links to /#services anchor — 3+ taps on mobile to reach any service page |
| M7 | SXO | No pricing context on service pages — CFO persona cannot self-qualify |
| M8 | SXO | /netsuite-consulting-services faces implementation-dominated SERP |
| M9 | SXO | /netsuite-admin-support-small-business has no intro paragraph before the CTA button |
| M10 | SXO | Company field is required in LeadForm — make optional |
| M11 | Content | Oracle certifications visible only in JSON-LD award field, not in on-page prose |
| M12 | Content | FSM blog cluster (4 posts + 1 resource) has no hub page with cross-links |
| M13 | Content | Opening paragraphs on signs-netsuite-support-not-working, saved-search-tips, workflow-vs-suitescript, month-end-close-checklist are scene-setting instead of direct answers |
| M14 | Technical | IndexNow not implemented — new posts rely on Googlebot crawl schedule |
| M15 | GEO | llms.txt covers only 8 of 35 blog posts; missing SuiteCompare FAQ pairs |

---

## Low Priority (backlog)

| # | Area | Finding |
|---|------|---------|
| L1 | Sitemap | Remove changefreq from all sitemap entries (Google ignores it) |
| L2 | Sitemap | Use YYYY-MM-DD date format in sitemap instead of full ISO timestamps |
| L3 | Technical | X-XSS-Protection header deprecated — set to 0 per OWASP |
| L4 | Schema | /resources listing missing ItemList schema |
| L5 | SXO | LeadFormLight button text "Get in touch" is generic — add configurable ctaText prop |
| L6 | Content | signs-netsuite-support-not-working has no summary bullet list before H2 sections |
| L7 | Content | netsuite-post-go-live-support page is thin (~700w) for the primary service page |
| L8 | Content | No CFO/Controller-targeted content (finance-outcome framing, not admin framing) |
| L9 | GEO | Reddit r/netsuite presence is zero — highest-impact remaining citation lever |

---

## What's Working Well

- **Server-side rendering:** All pages serve full HTML to Googlebot. No JS dependency for content indexing.
- **Security headers:** HSTS preload (730-day), X-Frame-Options, nosniff, Referrer-Policy, Permissions-Policy all present.
- **Schema foundation:** ProfessionalService, BlogPosting, TechArticle, BreadcrumbList all implemented and structurally valid. `dateModified` correctly wired via `post.updated ?? post.date`.
- **Technical accuracy:** SuiteScript examples, governance limits, NetSuite-specific nuances verified accurate throughout.
- **Freshness signals:** 9 posts have `updated:` frontmatter. NLAuth post correctly shows dateModified distinct from datePublished.
- **Sitemap coverage:** All 90 indexable pages return 200. No broken entries.
- **AI crawler access:** All major crawlers explicitly allowed (GPTBot, ClaudeBot, PerplexityBot, anthropic-ai, OAI-SearchBot, CCBot, Bytespider, cohere-ai).
- **FAQ sections on 4 priority posts:** Added for AI citability (nlauth, user-event-vs-client-script, suitescript-best-practices, workflow-automation-mistakes).
- **og-default.png:** Live, correctly sized 1200x630.
- **Redirect hygiene:** www and http variants resolve in a single hop with no chains.

---

## Priority Action Plan

### Phase 1: This Week (~6 dev-hours)
1. Remove root canonical from `app/layout.tsx` (C1)
2. Fix /suitecompare noindex via `app/suitecompare/page.tsx` override + robots (C2)
3. Fix case study Article block: add dates + image to data model + component (C3)
4. Add SoftwareApplication schema to /suitecompare (C4)
5. Change service page CTA buttons from href="/contact" to href="#contact" (C5)
6. Add noindex + title fix to suitecompare auth pages (H1)
7. Fix blog force-dynamic → revalidate=60; move suitecompare force-dynamic to dashboard pages (H2)
8. Add orphaned service pages to homepage + footer (H3)
9. Add static /suitecompare link in footer (H4)
10. Add openGraph block to suitecompare and pricing pages (H5)
11. Add width/height to BlogPosting image in JsonLd.tsx (H6)

### Phase 2: Weeks 2-3 (~4 dev-hours + content)
12. Add mid-page LeadForm to 4 service pages (H7)
13. Add case study cards to 4 service pages (H8)
14. Add internal links to 5 zero-link blog posts, especially signs-netsuite-support-not-working (H10)
15. Expand or consolidate 3-5 thinnest blog posts starting with advanced-pdf-template-mistakes (H9)
16. Add ServiceJsonLd to all 8 service pages (M4)
17. Add pricing context paragraph to service pages (M7)
18. Wire resource publishedAt dates into sitemap lastmod (M2)

### Phase 3: Month 2
19. Convert Services nav to dropdown with direct service page links (M6)
20. Add certifications to on-page prose on service pages (M11)
21. Link FSM cluster posts to each other (M12)
22. Rewrite opening paragraphs on 4 high-intent posts for direct answers (M13)
23. Post first r/netsuite answer with NLAuth link (L9)
24. Implement IndexNow for faster indexing of new posts (M14)

### Phase 4: Ongoing
- 2 new blog posts/week targeting uncovered topics
- 1 Reddit answer/week on r/netsuite with relevant blog link
- Update llms.txt quarterly
- Re-run /seo-backlinks in September 2026
- Add 2-3 CFO/Controller-targeted posts per quarter

---

*Specialist findings in: `suitepacific-audit/findings/` (technical.md, content.md, schema.md, sitemap.md, sxo.md, geo.md, backlinks.md)*

## Cluster Analysis

**20 of 35 blog posts are orphaned or false-routed to the wrong hub.**

### Cluster health by service hub

| Hub | Status | Confirmed Spokes | Issue |
|-----|--------|-----------------|-------|
| /netsuite-suitescript-development | Adequate | 4 | Missing link to user-event-vs-client-script |
| /netsuite-workflow-automation | Thin | 2 | No how-to content; hub links to only 1 spoke |
| /netsuite-advanced-pdf-templates | Thin | 2 | Hub never links back to freemarker-pdf-guide despite that post ranking |
| /netsuite-integrations | Critical gap | 0 | Zero blog spokes; most isolated service page on the site |
| /netsuite-saved-searches-dashboards | Adequate structure | 2 | Hub links to only 1 of 2 spokes |
| /netsuite-post-go-live-support | Broken hub | 3 | Hub links to NONE of its 3 confirmed spokes; one-directional authority |
| /netsuite-account-optimization | Thin | 2 | Hub links to only 1 spoke |

### Orphaned posts needing re-routing

- `netsuite-suiteql-sort-change-2026-2` → SuiteScript hub
- `netsuite-rest-batch-sequential` → Integrations hub
- `netsuite-suiteql-bound-parameters` → Integrations hub
- `netsuite-sales-order-fulfillment-list` → Workflow hub
- `netsuite-suitetax-term-discounts` → Account Optimization hub
- `netsuite-currency-context-custom-fields` → Account Optimization hub
- `netsuite-bank-reconciliation-changes-2026-2` → Account Optimization hub (not Post-Go-Live)
- `netsuite-payment-adjustments-2026-2` → Workflow hub (not Post-Go-Live)
- `netsuite-payment-runs-2026-2` → Workflow hub (not Post-Go-Live)
- `netsuite-advanced-record-customization-2026-2` → Account Optimization hub
- FSM cluster (4 posts) → no hub; create FSM landing page or link to consulting page

### Second duplicate flagged
`netsuite-passkeys-mfa-2026-2` and `netsuite-passkey-second-factor-2026-2` cover the same 2026.2 FIDO2/MFA feature. 301-redirect the shorter one to the longer one. (First duplicate — the SuiteQL sort change posts — is already flagged in the content findings.)

### Immediate internal link fixes (no new content)
Hub pages that are missing reciprocal links to confirmed spokes:
- `/netsuite-advanced-pdf-templates` → add link to `/blog/netsuite-freemarker-pdf-guide`
- `/netsuite-workflow-automation` → add link to `/blog/netsuite-workflow-vs-suitescript`
- `/netsuite-saved-searches-dashboards` → add link to `/blog/netsuite-saved-search-examples`
- `/netsuite-account-optimization` → add link to `/blog/netsuite-optimization`
- `/netsuite-suitescript-development` → add link to `/blog/netsuite-user-event-vs-client-script`
- `/netsuite-post-go-live-support` → add links to post-go-live-checklist, signs-netsuite-support-not-working, month-end-close-checklist
- `/netsuite-integrations` → add interim links to nlauth-tba-end-of-support, rest-batch-sequential, suiteql-bound-parameters

### Top 5 new posts recommended (gap-filling)
1. "NetSuite RESTlet vs REST Web Services: Which Integration Approach to Use" → Integrations hub (highest gap)
2. "How to Build a NetSuite Approval Workflow with SuiteFlow: Step-by-Step" → Workflow hub
3. "NetSuite Saved Search Formulas: CASE WHEN, Date Math, and Column Calculations" → Saved Searches hub
4. "NetSuite Advanced PDF Template Data Model: Accessing Sublists, Related Records, and Multi-Currency Fields" → PDF Templates hub
5. "How to Evaluate a NetSuite Post-Go-Live Support Partner: 7 Questions to Ask" → Post-Go-Live hub (commercial intent)

# SuitePacific — SEO Action Plan

**Last updated:** 2026-08-13
**Current score:** 74/100 (deep agent audit) / 81/100 (self-assessed 2026-08-12) / baseline 71/100 (2026-08-07)
**Target:** 82/100 after Phase 5 (critical + high fixes from August 13 audit)

---

## Phase 1: Critical and High — Complete This Week

### 1. Add /netsuite-freelancer-vs-consulting-firm to sitemap
**File:** `app/sitemap.ts`
**Fix:** Add `{ path: "/netsuite-freelancer-vs-consulting-firm", lastModified: SEO_REFRESH_DATE }` to `SERVICE_PAGES` array.
**Impact:** Technical SEO +2. The page is fully built and indexed-ready; it just needs a sitemap entry so AI crawlers get the explicit signal.

### 2. OrganizationJsonLd + VideoObjectJsonLd on 17 remaining service pages
**Files:** All service pages under `app/(site)/` that are NOT already updated (see list below)
**Fix:** Import `{ OrganizationJsonLd, VideoObjectJsonLd }` from `@/components/seo/JsonLd`. Add both components after the existing `ServiceJsonLd` block, using the same props as the industry pages.
**Impact:** Schema +5, AI Search +8. VideoObjectJsonLd has the strongest measured off-page AI citation correlation (0.737, Ahrefs 75k-brand study).

Pages needing both:
- `/netsuite-integrations`
- `/netsuite-suitescript-development`
- `/netsuite-workflow-automation`
- `/netsuite-saved-searches-dashboards`
- `/netsuite-advanced-pdf-templates`
- `/netsuite-administrator-support`
- `/netsuite-account-optimization`
- `/netsuite-admin-support-small-business`
- `/hire-netsuite-developer`
- `/netsuite-acs-alternative`
- `/netsuite-support-alternative`
- `/netsuite-oracle-support-vs-third-party`
- `/netsuite-certified-netsuite-support`
- `/netsuite-managed-support`
- `/netsuite-freelancer-vs-consulting-firm`
- `/netsuite-implementation-partner-vs-managed-support`
- `/netsuite-ai-integration`
- `/netsuite-ai-optimization-assessment`
- `/netsuite-ai-invoice-processing`
- `/netsuite-ai-reporting`

### 3. Fix CTA buttons on 4 service pages (in-page form anchor)
**Files:**
- `app/(site)/netsuite-consulting-services/page.tsx`
- `app/(site)/netsuite-post-go-live-support/page.tsx`
- `app/(site)/netsuite-suitescript-development/page.tsx`
- `app/(site)/netsuite-workflow-automation/page.tsx`

**Fix:** Add `<LeadForm />` before the closing section. Add `id="contact"` to the form wrapper. Change the existing CTA button from `href="/contact"` to `href="#contact"`.
**Impact:** SXO +10. Eliminates the page exit on the site's highest-intent service pages.

### 4. Convert Services nav item to dropdown
**File:** `lib/content.ts`
**Fix:** Change the `Services` nav link (currently `{ label: "Services", href: "/#services" }`) to a children-based dropdown listing the 6 core service pages. Match the same discriminated union format as the new "AI Services" entry.
**Impact:** On-Page SEO +3, SXO +3. Reduces mobile tap count from 3 to 1 for service page navigation.

---

## Phase 2: High — Complete Within 2 Weeks

### 5. Add Quick Answer blocks to 23 blog posts
**Files:** `content/blog/*.md`
**Fix:** After the opening paragraph of each post, insert a 130-160 word self-contained summary block formatted as a `> blockquote` or a visually distinct paragraph. The block should be able to stand alone as a complete answer to the post's primary question.
**Impact:** AI Search +5, Content Quality +4. Fixes the single biggest AI citation barrier on the site (~44% of citations come from the first 30% of a page).

Priority order:
1. `netsuite-workflow-vs-suitescript`
2. `signs-netsuite-support-not-working`
3. `netsuite-post-go-live-checklist`
4. `netsuite-month-end-close-checklist`
5. `netsuite-saved-search-tips`

### 6. Convert 10 declarative H2s to question format
**Files:** `content/blog/*.md`
**Fix:** Change H2 headings from declarative form ("What a Client Script does") to question form ("When should you use a Client Script in NetSuite?").
**Priority posts:** `netsuite-workflow-vs-suitescript`, `netsuite-map-reduce-script-guide`, `netsuite-user-event-vs-client-script`, `suitescript-best-practices`, `netsuite-post-go-live-checklist`
**Impact:** AI Search +4. Question headings match directly against user query patterns used by AI citation selection.

### 7. Add Article/Service schema to 2 comparison pages
**Files:**
- `app/(site)/netsuite-freelancer-vs-consulting-firm/page.tsx`
- `app/(site)/netsuite-implementation-partner-vs-managed-support/page.tsx`

**Fix:** Add `Article` schema (with og-default.png image, correct datePublished/dateModified). Optionally add `ServiceJsonLd` since both pages describe when to choose SuitePacific.
**Impact:** Schema +2. Article schema makes these pages eligible for Article rich results.

### 8. Complete cluster bidirectional linking
**Fix 1:** Update `/netsuite-suitescript-development` page to link back to all 9 spoke posts (currently only links to 4).
**Fix 2:** Update `/netsuite-post-go-live-support` page to include a "Recent NetSuite Updates" section linking back to the 11 release note posts that already point to it.
**Impact:** Topic Clusters +8. Bidirectional linking completes the cluster topology and concentrates link equity at the hub.

### 9. Write "How to Choose a NetSuite Consulting Partner" post
**File:** `content/blog/how-to-choose-netsuite-consulting-partner.md`
**Target keyword:** "netsuite consulting partner", "netsuite consulting services"
**Internal links:** point to `/netsuite-consulting-services` (primary) and `/netsuite-post-go-live-support`
**Impact:** Topic Clusters +5. `/netsuite-consulting-services` currently has zero blog support — this is the single highest-ROI content investment available.

---

## Phase 3: Medium — Complete Within 1 Month

### 10. Add IndexNow implementation
**Files:** `public/[uuid].txt`, deploy hook or `next.config.ts` post-build script
**Fix:** Generate UUID key, place at `/public/[uuid].txt`. After each deploy, ping `api.indexnow.org/indexnow` with the full sitemap URL list. 30-minute task.
**Impact:** Technical SEO +2. Direct Bing Copilot indexing signal — benefits citation freshness.

### 11. Add Blog and CollectionPage schema to hub pages
**Files:**
- `app/(site)/blog/page.tsx` — add Blog schema
- `app/(site)/resources/page.tsx` — add CollectionPage schema
**Impact:** Schema +1 each.

### 12. figcaption on SVG diagrams in technical posts
**Files:** Blog posts with inline SVGs
**Fix:** After each `<svg>` block, add `<figcaption>` with the key conclusion stated in 1-2 sentences. SVG content is invisible to AI crawlers; the caption makes it citable.
**Impact:** AI Search +2, Content Quality +1.

### 13. Quantify case study outcomes
**Files:** `content/case-studies/*.md`
**Fix:** Add one quantified outcome ("from 4 hours to 20 minutes", "3 manual processes eliminated") and one industry/size identifier to each of the 6 case studies.
**Impact:** SXO +4, Content Quality +2.

### 14. Add CFO/Controller-targeted content
**File:** `content/blog/netsuite-month-end-close-for-controllers.md` (and 2 more)
**Target topics:** "netsuite month-end close workflow", "netsuite ar aging report optimization", "when to hire netsuite consultant"
**Impact:** Content Quality +3. Fills the stated buyer persona gap.

---

## Phase 4: Monitoring (Ongoing)

### Track indexing via Google Search Console
- Submit updated sitemap after Phase 1 changes
- Monitor /netsuite-freelancer-vs-consulting-firm indexing after sitemap addition
- Use GSC URL Inspection for pages that lag behind

### Monitor AI citation recency
- All pages have `lastModified` in sitemap. After Phase 1 touches, bump dates on modified pages.
- Pages go stale for AI citation after 6 months. The next scheduled refresh date is 2027-02-12.

### Reddit presence (off-site, ongoing)
- r/NetSuite (~45,000 members): answer 2-3 SuiteScript/workflow/admin questions per week
- Reference suitepacific.com articles only when directly answering the thread's specific question
- Do not post promotional content — genuine expertise contributions only
- Goal: 3-5 Reddit mentions over 90 days to build the off-site brand signal (0.46+ AI citation correlation)

---

---

## Phase 5: Critical — August 13 Deep Audit (Fix This Week)

### 5.1 Create /privacy policy page
**File:** `app/(site)/privacy/page.tsx` (new file) + footer link
**Fix:** Minimal privacy policy: what data is collected (name, email, company, message), how it is used (respond to inquiries only), no data sold. Link from footer next to copyright line.
**Impact:** Trust +8, Google QRG compliance, legal coverage. No privacy policy on a B2B contact-collecting site is a ranked risk factor.

### 5.2 Fix netsuite-saved-search-examples CTR (322 impressions, 0 clicks)
**File:** `content/blog/netsuite-saved-search-examples.md`
**Fix:**
- Update title and H1 to: "10 NetSuite Saved Search Examples (Finance, Operations, Admin)"
- Rewrite meta description: "10 ready-to-build NetSuite saved searches for finance, operations, and admin teams — criteria, columns, and filters included."
- Add `updated: "2026-08-13"` to frontmatter
- Convert all search description prose to tables or bullet lists (post currently has zero list items despite being titled "examples")
**Impact:** On-Page CTR +high. Single highest-ROI content fix given 322 impressions at 0%.

### 5.3 Add duration field to VideoObjectJsonLd component
**File:** `components/seo/JsonLd.tsx` + all 30 call sites
**Fix:** Add `duration?: string` to the `VideoObjectJsonLd` interface. Pass it into the JSON-LD output as `"duration": duration`. Update all 30 call sites with the ISO 8601 duration of video IQvWN_yZ24A (check YouTube for the exact length; format as "PT3M42S").
**Impact:** Schema +3. Fixes Google VideoObject rich result eligibility gap on 30 pages.

### 5.4 Fix robots.txt: revert /suitecompare/ to specific auth paths
**File:** `public/robots.txt`
**Fix:** Replace `Disallow: /suitecompare/` with the same per-path pattern as the live file:
```
Disallow: /suitecompare/login
Disallow: /suitecompare/dashboard
Disallow: /suitecompare/settings
```
This mirrors what is live and prevents the structural fragility of blocking the full directory.
**Impact:** Technical SEO stability. Prevents accidental marketing page blocking on next deploy.

### 5.5 Update llms.txt: add YouTube URL + index 10 missing August posts
**File:** `public/llms.txt`
**Fix:** Add `- YouTube: https://www.youtube.com/@SuitePacific` to the Contact section. Add the following 10 posts to the blog index section:
- /blog/how-to-choose-netsuite-consulting-partner
- /blog/netsuite-roles-permissions-guide
- /blog/netsuite-development-cost
- /blog/netsuite-custom-gl-plugin-guide
- /blog/netsuite-restlet-vs-rest-web-services (if published)
- /blog/netsuite-approval-workflow-setup
- /blog/netsuite-bill-capture-preferences-2026-2
- /blog/netsuite-project-health-indicators-2026-2
- /blog/netsuite-advanced-record-customization-2026-2
- /blog/netsuite-passkey-second-factor (if in blog)
**Impact:** GEO +3. YouTube is the strongest AI citation correlation signal (0.737).

---

## Phase 6: High — August 13 Findings (Complete in 1-2 Weeks)

### 6.1 Expand netsuite-implementation-partner-vs-managed-support to 800+ words
**File:** `app/(site)/netsuite-implementation-partner-vs-managed-support/page.tsx`
**Fix:** Current ~429 words. Add: a "how to decide" decision framework (200 words), a "signs you need managed support" list (100 words), transition timing guidance (100 words), and a paragraph on what handoff from an implementation partner looks like (100 words).
**Impact:** Content +5. Without expansion, the 1,468-word blog post will outrank this service page.

### 6.2 Convert 10 priority H2 headings to question format
**Files:** Content blog files
**Fix:** Convert statement H2s to question format. Priority posts and example conversions:
- `netsuite-map-reduce-script-guide`: "When should you use Map/Reduce instead of a Scheduled Script?" (currently declarative)
- `netsuite-nlauth-tba-end-of-support`: "What happens if you don't migrate before 2027.1?" 
- `netsuite-post-go-live-checklist`: Convert each H2 checklist section to "What should you do in the first 30 days after go-live?"
- 2026.2 release-note posts: "What changed in NetSuite 2026.2 payment runs?" etc.
**Impact:** GEO +4, Content +3. Question headings directly match AI model query-answer extraction patterns.

### 6.3 Add `updated` field to 4 evergreen posts + date fields to all 30 resources
**Files:** Content blog + resource files
**Posts:** `netsuite-saved-search-tips` (Jun 10), `workflow-automation-mistakes` (Jun 25), `netsuite-saved-search-examples` (Jun 30), `netsuite-month-end-close-checklist` (Jul 1). Add `updated: "2026-08-13"` to each.
**Resources:** Add `publishedAt: "2026-XX-XX"` to all 30 resource files and verify the resource layout exposes it in ArticleJsonLd datePublished.
**Impact:** Content freshness +5. Posts and resources with no freshness signal are at highest risk of AI citation decay after 6 months.

### 6.4 Reformat netsuite-post-go-live-checklist: add actual bullet checklists
**File:** `content/blog/netsuite-post-go-live-checklist.md`
**Fix:** Under each H2, add a bulleted checklist that users can actually apply. Prose stays as explanation; list is additive. Example: under "First 30 days" H2, add a 5-7 item bulleted list of specific tasks.
**Impact:** SXO +5. Intent mismatch (checklist title, prose-only body) is a bounce driver.

### 6.5 Fix netsuite-oracle-support-vs-third-party schema: ServiceJsonLd → ArticleJsonLd
**File:** `app/(site)/netsuite-oracle-support-vs-third-party/page.tsx`
**Fix:** Replace `ServiceJsonLd` with `ArticleJsonLd` using the same pattern as `netsuite-freelancer-vs-consulting-firm.tsx`. The page is a comparison article, not a service pitch.
**Impact:** Schema +2. Correct content type classification for Google.

### 6.6 Add ArticleJsonLd to /resources/[slug] and /case-studies/[slug] layouts
**Files:** `app/(site)/resources/[slug]/page.tsx`, `app/(site)/case-studies/[slug]/page.tsx`
**Fix:** Import `ArticleJsonLd` from `@/components/seo/JsonLd`. Add the component with `url`, `headline`, `description`, `datePublished` (from frontmatter), `dateModified`. Single template change covers 30+ pages.
**Impact:** Schema +4. 30 resources and all case studies currently have no content schema.

### 6.7 Add @id anchors to ServiceJsonLd and BlogPostingJsonLd
**File:** `components/seo/JsonLd.tsx`
**Fix:**
- `ServiceJsonLd`: add `"@id": \`${url}#service\``
- `BlogPostingJsonLd`: add `"@id": \`${SITE_URL}/blog/${slug}#article\``
- `ArticleJsonLd`: add `"@id": \`${url}#article\``
**Impact:** Schema +2. Entity linking enables Knowledge Graph relationship building across pages.

### 6.8 Add `foundingDate` to OrganizationJsonLd
**File:** `components/seo/JsonLd.tsx`
**Fix:** Add `foundingDate: "YYYY"` to the OrganizationJsonLd data object.
**Impact:** GEO +1. LLMs use founding date to assess business stability and anchor the entity in time.

### 6.9 Add internal links from SuiteScript blog posts to /hire-netsuite-developer
**Files:** 10+ blog posts in `content/blog/`
**Fix:** Every SuiteScript, Map/Reduce, User Event, and SuiteQL post that links to `/netsuite-suitescript-development` should also include a second CTA or inline link to `/hire-netsuite-developer`. Currently at position 61 due to internal link deficit alone.
**Impact:** On-Page +4. Internal PageRank flow to the highest-competition commercial page on the site.

### 6.10 Build the 2026.2 release-note sub-cluster
**Files:** `content/blog/netsuite-2026-2-finance-updates.md` + 8 individual 2026.2 posts
**Fix:** Each of the 8 individual release-note posts should add: "For the full 2026.2 finance changes summary, see [NetSuite 2026.2 Finance Updates](/blog/netsuite-2026-2-finance-updates)." The finance-updates hub should link to each individual post: "Deep dive into [Payment Runs](/blog/netsuite-payment-runs-2026-2), [Bank Reconciliation](/blog/netsuite-bank-reconciliation-changes-2026-2)..." etc.
**Impact:** Topic clusters +6. The sub-cluster currently has no cross-links — each post is a spoke with no hub relationship.

---

## Phase 7: Medium — Complete Within 4 Weeks

### 7.1 Consolidate 6 thin blog/resource pairs
**Pairs:** netsuite-payment-runs, netsuite-suitetax-term-discounts, netsuite-bank-reconciliation, netsuite-passkey-second-factor, netsuite-sales-order-fulfillment-list, netsuite-currency-context-custom-fields
**Fix:** 301-redirect each resource to the companion blog post. Merge any unique content from the resource into the blog post before redirecting. Update internal links that pointed to the resource URL.
**Impact:** Duplicate content risk -6 pairs. Concentrates ranking signals on one URL per topic.

### 7.2 Add credentials mention to remaining service pages and blog callout
**Fix:** Add "by Oracle NetSuite SuiteCloud Developer II and Administrator Professional certified consultants" to the intro section or trust element of: administrator-support, workflow-automation, integrations, advanced-pdf-templates, saved-searches-dashboards, account-optimization, and the 7 industry pages. Also add to the blog post callout box text.
**Impact:** E-E-A-T expertise +4. Currently only 3 of 22 service pages have credential mentions.

### 7.3 Add SuiteCompare callouts to SuiteScript blog posts
**Fix:** In the top LeadFormLight callout text for SuiteScript posts, add: "Already live on NetSuite? Use SuiteCompare to diff SuiteScript across Sandbox and Production." with a link to /suitecompare.
**Impact:** Conversion +2. The SuiteScript audience is the primary SuiteCompare audience. Zero blog posts currently mention SuiteCompare.

### 7.4 Complete SuiteQL sub-cluster cross-links
**Fix:** `netsuite-suiteql-guide` should link to `netsuite-suiteql-sort-change-2026-2`. `netsuite-suiteql-sort-change-2026-2` should link to `netsuite-suiteql-guide` and `netsuite-suiteql-bound-parameters`. Currently each post exists in isolation within the sub-cluster.
**Impact:** Topic clusters +3.

### 7.5 Add Quick Answer blocks to 10 priority resource pages
**Fix:** Use the same inline HTML div format as blog posts. 100-word self-contained summary at the top of each resource. Start with the 10 most-visited resources.
**Impact:** GEO +3. Resources are indexed content with no current AI citation summary block.

### 7.6 Add SuiteScript hub links to 3 missing cluster members
**File:** `app/(site)/netsuite-suitescript-development/page.tsx`
**Fix:** Add links from the hub page to: `/blog/restlet-vs-rest-web-services`, `/blog/netsuite-rest-batch-sequential`, `/blog/netsuite-freemarker-pdf-guide`. All three are published posts topically part of the SuiteScript cluster but not receiving hub link equity.
**Impact:** Topic clusters +2.

### 7.7 Create Wikidata entity for SuitePacific LLC
**Fix:** Create a Wikidata item with: instance of (Q4830453, business), country (Q30, United States), industry (enterprise software / ERP consulting), official website (suitepacific.com). After creation, add the Wikidata URL to `OrganizationJsonLd.sameAs` in `components/seo/JsonLd.tsx`.
**Impact:** GEO +4 (ChatGPT and Bing Copilot entity recognition). Wikipedia article requires demonstrated external notability — longer-term goal.

---

## Phase 8: Ongoing

### Monthly cadence
- Run `npm run indexnow` after each batch of new posts (update the URL list in `scripts/indexnow-ping.mjs` as new pages are added)
- Add `updated` frontmatter to evergreen posts on first review (every 3 months)
- Check GSC every 2 weeks for the netsuite-saved-search-examples CTR after the title update

### 6-month goals
- Second YouTube video: any screen recording of a specific SuiteScript scenario creates a second independent YouTube entity and materially increases the GEO brand mention diversity
- External mentions: r/NetSuite (answer 2-3 questions per week), NetSuite community forums, LinkedIn newsletter
- Re-run Common Crawl backlink check: domain is too new now; check in February 2027

---

## Estimated Score Impact

| Milestone | Estimated Score |
|---|---|
| Baseline (2026-08-07) | 71/100 |
| Post-batch fixes (2026-08-12) | 81/100 (self-assessed) |
| Deep agent audit (2026-08-13) | 74/100 (more rigorous) |
| After Phase 5 (critical fixes) | 78/100 |
| After Phase 6 (high fixes) | 82/100 |
| After Phase 7 (medium fixes) | 85/100 |
| After Phase 8 + backlinks accumulate | 88-91/100 |

---

## Fixed Items (No Longer in Backlog)

These were findings from the baseline audit, now resolved:

- og:image missing on 12 service pages (batches 1 + 3)
- og:image missing on /suitecompare (batch 4)
- TechArticle schema wrong image dimensions (batch 2)
- Homepage title cannibalization (batch 3)
- Duplicate redirect chains (batch 4)
- Canonical missing on /suitecompare and other pages (batch 4)
- Article `url` property missing (batch 4)
- Publisher logo missing dimensions (batch 4)
- OrganizationJsonLd missing @id anchor (batch 4)
- Internal links missing from 4 FSM dead-end posts (batch 4)
- Early LeadFormLight missing from service pages (batch 2)
- llms.txt out of date (batch 2)
- 7 industry pages missing from sitemap (this session)
- AI Services pages not in nav (this session)
- VideoObjectJsonLd missing from 9 key pages (this session)
- OrganizationJsonLd missing from 9 key pages (this session)
- YouTube iframe broken (replaced with thumbnails, this session)

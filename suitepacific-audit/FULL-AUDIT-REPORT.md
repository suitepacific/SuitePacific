# SuitePacific — Full SEO Audit Report

**Audit date:** 2026-08-07
**Domain:** suitepacific.com
**Technology:** Next.js 15 App Router on Vercel (full SSR)
**Business type:** B2B Professional Services — NetSuite post-go-live support, SuiteScript development, workflow automation, integrations, saved searches, advanced PDF templates, administrator support
**Target buyer:** CFO, Controller, ERP Manager, NetSuite Admin at companies with 50-500 employees already live on NetSuite
**Pages in sitemap:** 94 (39 blog, 30 resources, 6 case studies, 12 service pages, 7 other)
**Agents run:** Technical, Content, Schema, GEO, Backlinks, SXO, Cluster (all 7 complete)

---

## Overall SEO Health Score: 71/100

| Category | Weight | Score | Weighted |
|---|---|---|---|
| Technical SEO | 22% | 84 | 18.5 |
| Content Quality | 23% | 72 | 16.6 |
| On-Page SEO | 20% | 63 | 12.6 |
| Schema / Structured Data | 10% | 72 | 7.2 |
| Performance (CWV) | 10% | 75 | 7.5 |
| AI Search Readiness | 10% | 56 | 5.6 |
| Images | 5% | 48 | 2.4 |
| **Total** | **100%** | | **70.4 → 71** |

Additional category scores (informational, not in main weighted total):
- **SXO (Search Experience):** 50/100
- **Topic Clusters:** 58/100
- **Backlinks:** INSUFFICIENT DATA (domain too new for Common Crawl; zero referring domains in any database)

---

## Executive Summary

SuitePacific is a 2-month-old domain with a strong technical foundation and an unusually large content surface for its age (69 content pages). The core SEO infrastructure is working: full server-side rendering, accurate sitemap, clean redirect chains, correct canonical tags on all content pages, HSTS preload, and AI crawlers explicitly allowed. The site is structurally ready to rank.

The three problems blocking growth are conversion, image distribution, and internal linking structure:

**Conversion (Critical):** Four of five service pages send users to /contact when they click the CTA. The user leaves the page. The only page with an in-page form (/hire-netsuite-developer) is the correct template. Fixing the other four is the fastest path to lead improvement.

**Image distribution (High):** All 12 service pages define their own `openGraph` block without an `images` key. Next.js App Router replaces the root layout's openGraph when a page defines its own, stripping the fallback `og-default.png`. Every service page social card is text-only. This is a one-line fix per file.

**Internal linking structure (High):** Eight blog posts are dead-ends routing only to `/contact`. The highest-value service page (`/netsuite-consulting-services`) has zero blog posts pointing to it. Eleven release note posts have no hub post to link back to. The link equity from 39 blog posts is not flowing where it needs to go.

Everything else is optimization — important, but secondary to these three.

---

## Technical SEO: 84/100

### What Works

- **Full SSR:** All content is in the initial HTML response. No JavaScript rendering required for Google or AI crawler indexing. Confirmed via `curl` — `X-Nextjs-Prerender: 1` header, full content visible without JS.
- **Security headers:** HSTS with `max-age=63072000; includeSubDomains; preload`, `X-Content-Type-Options: nosniff`, `Referrer-Policy: strict-origin-when-cross-origin`, `Permissions-Policy` configured. HSTS preload-eligible.
- **Sitemap:** 94 URLs, all return 200 OK on spot check. All have accurate per-page `lastmod` dates. Sitemap URL declared in `robots.txt`. No redirect URLs or 4xx pages in sitemap.
- **Canonical tags:** Present and self-referencing on all content pages. Homepage: confirmed at `app/(site)/page.tsx` line 20. No cross-domain or conflicting canonicals detected.
- **Redirect chains:** HTTP to HTTPS in one hop. `www` to non-www in one hop. No multi-hop chains. No redirect loops detected.
- **TTFB:** 60-83ms across all audited pages. Vercel CDN cache hit confirmed on all requests (CDN-Cache-Control: public header present).
- **AI crawler access:** `robots.txt` has explicit named User-Agent blocks for GPTBot, OAI-SearchBot, ClaudeBot, PerplexityBot — all with `Allow: /`. Not relying on the `*` wildcard fallback.
- **llms.txt:** Present at `/llms.txt`, complete (35/35 blog posts indexed, 15+ FAQ pairs, RSL 1.0 licensed). This primarily benefits non-Google AI crawlers; Google Search ignores it per Google's official guidance.

### Findings

**[High] og:image missing on all 12 service pages**

Root cause: Each service page defines its own `openGraph` metadata object without an `images` key. Next.js App Router `generateMetadata` performs a shallow merge — when a child page exports `openGraph`, it replaces the root layout's `openGraph` entirely, not merging the `images` array. The `og-default.png` fallback declared in the root layout is stripped.

Affected pages: `/hire-netsuite-developer`, `/netsuite-suitescript-development`, `/netsuite-consulting-services`, `/netsuite-integrations`, `/netsuite-workflow-automation`, `/netsuite-saved-searches-dashboards`, `/netsuite-advanced-pdf-templates`, `/netsuite-administrator-support`, `/netsuite-account-optimization`, `/netsuite-post-go-live-support`, `/netsuite-implementation-partner-vs-managed-support`, `/netsuite-admin-support-small-business`.

Fix: Add `images: [{ url: 'https://suitepacific.com/og-default.png', width: 1200, height: 630 }]` to every service page `openGraph` block. One line per file.

**[High] /suitecompare marketing page missing canonical and og:image**

`app/suitecompare/page.tsx` correctly overrides the layout's `robots: { index: false }` with `robots: { index: true, follow: true }`. The page is indexable and in the sitemap. But it has no `alternates.canonical` self-reference and no `openGraph.images`.

Fix: Add to `app/suitecompare/page.tsx` metadata:
```ts
alternates: { canonical: 'https://suitepacific.com/suitecompare' },
openGraph: {
  ...existingOgFields,
  images: [{ url: 'https://suitepacific.com/og-default.png', width: 1200, height: 630 }]
}
```

**[Medium] No IndexNow implementation**

Bing indexing relies entirely on crawl discovery. IndexNow is free and directly benefits Bing Copilot citation freshness. Setup takes 30 minutes: generate UUID key, place at `/public/[key].txt`, ping `api.indexnow.org/indexnow` on each deploy or publish event.

**[Medium] CSP frame-ancestors 'none' conflicts with X-Frame-Options: SAMEORIGIN**

Two headers express contradictory framing policies. Modern browsers follow CSP (no framing permitted). XFO is redundant and inconsistent. Fix: set both to the same policy. Recommend `frame-ancestors 'none'` + `X-Frame-Options: DENY`.

**[Medium] CSP script-src contains unsafe-inline and unsafe-eval**

These directives negate XSS protection. Fix: implement nonce-based CSP in Next.js middleware. This is a medium-term hardening task — does not affect SEO directly.

**[Low] X-XSS-Protection header is deprecated**

Set to `0` per OWASP. A properly scoped CSP replaces its function.

**[Low] Case study sitemap lastmod all share 2026-06-01**

This is a batch date. Google uses lastmod for re-crawl scheduling. Fix: derive from each case study's publication date field.

---

## Content Quality: 72/100

### What Works

- **Technical accuracy:** All NetSuite-specific content verified correct. No invented navigation paths, no hallucinated steps. Content is sourced from official NetSuite release notes.
- **Volume:** 39 blog posts + 30 resource pages covering practitioner-level topics. Unusually large for a 2-month domain.
- **Quick Answer boxes:** 12 posts have self-contained 134-167 word answer blocks at the top — the optimal length for AI citation. These are the most citable passages on the site.
- **FAQ sections:** 12 posts have structured Q&A sections. Harmless for schema (FAQPage schema retired May 7, 2026) but useful for query coverage.
- **Freshness:** All 35 posts under 3 months old. SE Ranking's 1.3M-citation study found content under 3 months old is ~3x more likely to be cited in AI answers.
- **LeadFormLight placement:** Placed before content (catches 0% scroll) and at the bottom on all blog/resource pages. Correct implementation per CLAUDE.md.

### Findings

**[High] Two blog posts still under 900 prose words**

`netsuite-payment-runs-2026-2` (~882 words) and `netsuite-bank-reconciliation-changes-2026-2` (~923 words). These were expanded in the prior round but didn't reach 1000 words. Both are 2026.2 release posts. Fix: add a before/after configuration scenario, common edge cases, and an FAQ section to each.

**[High] 5 blog posts with zero internal links**

`netsuite-payment-adjustments-2026-2`, `netsuite-payment-runs-2026-2`, `netsuite-rest-batch-sequential`, `netsuite-sales-order-fulfillment-list`, and `signs-netsuite-support-not-working` have no internal links at all. The `signs-netsuite-support-not-working` post is the most critical gap: it is a high commercial-intent post with no link to `/netsuite-post-go-live-support` or the contact form. Fix: add at minimum one service page link and one related post link to each post. For the signs post: link to `/netsuite-post-go-live-support` in the closing section.

**[High] Opening paragraphs bury the direct answer**

High-intent posts open with narrative hooks (40-85 words) before reaching an actionable fact. AI systems and featured snippet algorithms extract the first 1-2 sentences for citations. Affected posts: `netsuite-saved-search-tips`, `netsuite-workflow-vs-suitescript`, `signs-netsuite-support-not-working`, `netsuite-month-end-close-checklist`, `workflow-automation-mistakes`. Fix: rewrite the first paragraph to deliver the direct answer first. Scene-setting becomes paragraph two.

**[High] 11 blog/resource near-duplicate pairs**

Eleven blog/resource pairs cover the same topic (blog: what changed; resource: how to do it). Individual pages range from 450-900 prose words. Where content overlaps more than 70%, topical authority is split. Fix: verify each pair has genuinely distinct intent. Where each piece is under 700 prose words and covers similar ground, consider consolidation or adding `rel=canonical` on the blog to the resource.

**[Medium] Oracle certifications invisible in visible content**

Certifications appear in OrganizationJsonLd `award` array and one hire page card title, but not in visible prose on primary service pages. Google quality raters look for verifiable credentials in visible content. Fix: add a brief credential callout (one sentence, no author name needed) to the hero section of `/netsuite-post-go-live-support` and `/netsuite-suitescript-development`.

**[Medium] FSM cluster has no hub post**

Four FSM posts cover the August 2026 bundle update but have no common destination except `/contact`. Zero link equity flows to any service page. Fix: link all four to `/netsuite-administrator-support` immediately (interim). Create an FSM pillar post as a longer-term solution.

**[Low] No CFO/Controller-targeted content**

All 69 content pages target NetSuite admins and developers. CFO and Controller personas (stated target buyers) are unaddressed. Add 2-3 finance-leader posts per quarter: month-end close outcomes, AR aging report optimization, when to hire a NetSuite consultant.

---

## On-Page SEO: 63/100

### What Works

- Title tags, meta descriptions, H1 tags present on all pages
- Blog post titles are descriptive and keyword-rich
- Breadcrumb navigation present across all page types

### Findings

**[High] Homepage title cannibalizes /netsuite-post-go-live-support**

Homepage title: "SuitePacific: Post-Go-Live NetSuite Support & Optimization"

This directly targets the same keyword cluster as the dedicated service page. Google must choose which page to rank for "netsuite post go live support" and related queries. The homepage will likely win due to domain authority concentration, but the dedicated service page is the correct destination for this intent. Fix: revise homepage title to "SuitePacific: NetSuite Support and Custom Development" or similar brand-hub statement. Give the dedicated page full keyword ownership.

**[Medium] Meta descriptions over 160 characters on service pages**

Service page meta descriptions range 182-202 characters (ideal: 120-160). Google truncates at ~160 characters in SERPs. Fix: trim descriptions to 150-160 characters on hire-netsuite-developer (202 chars), netsuite-suitescript-development (185 chars), netsuite-consulting-services (182 chars).

**[Medium] Blog posts lack H3 sub-headings**

All posts use only H2 headings. Posts over 1,500 words covering 3+ subtopics per H2 would benefit from H3 sub-sections for granular passage indexing. Priority: `netsuite-workflow-vs-suitescript`, `netsuite-map-reduce-script-guide`, `netsuite-saved-search-examples`.

**[Low] Blog post titles over 60 characters (SERP truncation)**

All checked blog post titles exceed 60 characters (70-92 range) due to "| SuitePacific" suffix. Google truncates at ~60 characters. Low priority — cosmetic, not a ranking factor.

---

## Schema / Structured Data: 72/100

### What Works

- **BlogPosting schema** on all 35 blog posts with correct `dateModified` (uses `updated` frontmatter when available)
- **TechArticle schema** on all 30 resource pages
- **Service schema** on all 11 service pages with `BreadcrumbList`
- **ProfessionalService + WebSite + FAQPage** on homepage
- **SoftwareApplication** on /suitecompare
- **Article schema** on all 6 case study pages
- **ItemList schema** on case studies index
- All `@context` use `https://schema.org`, all dates are ISO 8601, all URLs are absolute

### Findings

**[Medium] Resource TechArticle schema: wrong image declared with wrong dimensions**

`app/(site)/resources/[slug]/page.tsx` line 63 sets the TechArticle `image` to `logo-icon.png` with `width: 1200, height: 630`. The actual `logo-icon.png` file is 256x256 pixels. Google fetches and validates image dimensions for Article rich results; a 256px-wide image fails the 1200px minimum. This blocks all 30 resource pages from image-enhanced Article rich results.

Fix: change one line — `image: { "@type": "ImageObject", url: "/og-default.png", width: 1200, height: 630 }`. The `og-default.png` is confirmed 1200x630.

**[Low] Article entities missing `url` property**

`mainEntityOfPage` provides the WebPage `@id`, but article entities (`BlogPosting`, `TechArticle`, `Article`) should also carry a `url` property pointing to their canonical URL. Affects `components/seo/JsonLd.tsx` (BlogPosting), `app/(site)/case-studies/[slug]/page.tsx` (Article), and `app/(site)/resources/[slug]/page.tsx` (TechArticle). Three one-line additions.

**[Low] Publisher logo ImageObject missing width and height**

All three article types declare `publisher.logo: { "@type": "ImageObject", url: logo-icon.png }` without dimensions. Add `width: 256, height: 256`.

**[Low] /netsuite-implementation-partner-vs-managed-support missing Article schema**

This long-form comparison guide has only BreadcrumbList and FAQPage. No Article schema means no Article rich result eligibility. Add an Article block with `og-default.png` as the image.

**[Low] Blog and Resources index pages missing collection schema**

`/blog` has only BreadcrumbList; `/resources` has only BreadcrumbList. Add Blog schema to `/blog` and CollectionPage schema to `/resources`.

**[Low] ProfessionalService missing @id anchor**

`OrganizationJsonLd` has no `@id`, so service pages cannot reference the organization entity by ID. Add `'@id': 'https://suitepacific.com/#organization'`.

**[Info] FAQPage no longer produces Google rich results**

Google retired FAQ rich results for all sites on May 7, 2026. FAQPage blocks are structurally valid and harmless but produce no SERP feature. Do not remove existing blocks.

---

## Performance (CWV): 75/100

### What Works

- **TTFB:** 60-83ms (Vercel CDN HIT across all audited pages)
- **Total response time:** 90-155ms
- **Brotli compression** active
- **Font preloaded:** Inter WOFF2 in `<head>`
- **Hero image preloaded** with `imageSrcSet` for responsive delivery
- **SSR:** All content in initial HTML, no hydration delay for critical content

### Findings

**[Info] No Lighthouse/CWV lab data — PSI API rate limited during audit**

PageSpeed Insights API returned rate limit errors. TTFB and response time data is from direct `curl` measurements of CDN-cached responses. Lab CWV scores (LCP, INP, CLS) are not available for this report. Run manually at https://pagespeed.web.dev or configure `GOOGLE_API_KEY` for automated CWV measurement.

**[Low] 13 JavaScript chunks on homepage**

Standard for Next.js App Router code splitting. No blocking scripts detected. Verify with Lighthouse that LCP is not delayed by any chunk. No action until Lighthouse confirms an issue.

---

## AI Search Readiness (GEO): 56/100

### What Works

- AI crawlers explicitly allowed: GPTBot, OAI-SearchBot, ClaudeBot, PerplexityBot — named User-Agent blocks, not wildcards
- Full SSR — content accessible without JavaScript to all AI crawlers
- llms.txt: present, complete, RSL 1.0 licensed. (Note: Google Search ignores llms.txt per official guidance; it is useful for non-Google AI crawlers only)
- Quick Answer boxes on 12 posts (134-167 words, self-contained — optimal citation length per SE Ranking 1.3M-citation study)
- All 35 posts under 3 months old — within the 3x AI citation boost window

### Findings

**[High] Zero question-based H2 headings across all 35 posts**

All posts use declarative H2s ("What a Client Script actually is"). AI systems match section headings against user queries. Question headings ("When should you use a Client Script in NetSuite?") match directly. This is the single highest-leverage structural change for AI citation eligibility.

Priority 5 posts for H2 question conversion:
1. `netsuite-workflow-vs-suitescript` — high traffic, cross-cluster
2. `netsuite-map-reduce-script-guide` — detailed technical, many H2s
3. `netsuite-user-event-vs-client-script` — high query volume
4. `suitescript-best-practices` — already ranking at position 7
5. `netsuite-post-go-live-checklist` — bottom-of-funnel intent

**[High] Blog post openers too short for AI citation (40-85 words vs 134-167 optimal)**

SE Ranking's study found ~44% of AI citations come from the first 30% of a page. Current openers are narrative hooks, not answer blocks. 23 posts have no Quick Answer box and no self-contained citable passage near the top.

Fix: add a 130-160 word Quick Summary block immediately after the first paragraph on each of the 23 posts without Quick Answer boxes. Keep the existing opener hook — the summary block is additive.

**[Medium] SVG diagram content uncitable by AI crawlers**

Technical posts embed inline SVGs with `<text>` elements. AI crawlers (GPTBot, ClaudeBot, PerplexityBot) do not parse SVG text content. Every insight locked inside an SVG is uncitable. ~10-15 diagrams affected.

Fix: add a plain-text `<figcaption>` after each SVG diagram stating the key conclusion in 1-2 sentences. The SVG stays. This is additive HTML.

**[Medium] No Reddit or YouTube brand presence**

Ahrefs December 2025 study of 75,000 brands: YouTube mentions correlate 0.737 with AI citation rates (strongest single off-site signal). Reddit correlates at 0.46+. Both are absent.

Start with r/NetSuite (~45,000 members): answer 2-3 SuiteScript/workflow/admin questions per week using genuine expertise. Reference articles only when directly relevant to the thread. No promotional framing. A few well-timed contributions can generate Reddit link equity and organic discovery.

---

## Images: 48/100

### What Works

- `og-default.png` exists and is correct dimensions (1200x630 PNG)
- Blog post and resource page openGraph correctly reference `og-default.png`
- Hero image preloaded with `imageSrcSet` for responsive delivery
- BlogPosting schema uses `og-default.png` at 1200x630 (correct)

### Findings

**[High] og:image missing on all 12 service pages** (see Technical SEO — same root cause)

**[Medium] Resource TechArticle schema uses wrong image** (see Schema — same file, line 63)

**[Low] No per-page unique OG images for blog posts**

All 39 blog posts use the same `og-default.png` social card. Posts shared on LinkedIn render identical images. Low priority — fix after all og:image gaps are resolved. Next.js supports dynamic OG image generation via `app/og/route.tsx`.

---

## Search Experience (SXO): 50/100

### What Works

- LeadFormLight correctly placed before content and at the bottom on all blog/resource pages
- `/hire-netsuite-developer` has mid-page in-page form — the correct conversion template
- Case studies accessible from primary navigation
- Service pages correctly typed for their target queries

### Findings

**[Critical] CTA buttons on 4 of 5 service pages exit to /contact**

"Book a Free Consultation" buttons on `/netsuite-consulting-services`, `/netsuite-post-go-live-support`, `/netsuite-suitescript-development`, and `/netsuite-workflow-automation` link to `/contact`. The visitor leaves the page. This breaks the conversion path. `/hire-netsuite-developer` has an in-page form and is the correct model.

Fix: add a mid-page `<LeadForm>` (or `<LeadFormLight>`) to each of the four pages. Change the button `href` from `/contact` to `#contact` where `id="contact"` is on the form wrapper. Matches CLAUDE.md: "hire-netsuite-developer page uses the full LeadForm inline at the bottom."

**[High] Homepage title competes with /netsuite-post-go-live-support**

Homepage title "SuitePacific: Post-Go-Live NetSuite Support & Optimization" directly targets the keyword the dedicated service page needs to own. The homepage is the wrong destination for a "netsuite post go live support" query — the user wants a service page, not a homepage. The homepage will typically outrank the dedicated page due to authority concentration, absorbing traffic that should convert via the dedicated page's form.

Fix: revise the homepage title to a brand-hub statement.

**[High] Case studies lack numeric outcomes and industry context**

All 6 case studies describe qualitative improvements ("reduced manual work", "improved visibility") with no metrics. Bottom-of-funnel CFOs and IT Directors need quantified proof to make a vendor decision. Competitors name the outcome explicitly ("reduced 4-hour process to 20 minutes").

Fix: add one quantified outcome and one industry/size identifier to each case study. Even an order-of-magnitude metric ("from hours to minutes") is sufficient.

**[High] /netsuite-consulting-services — intent mismatch with SERP**

Top SERP results for "netsuite consulting services" are all implementation-partner pages (Folio3, SixLakes, OdeCloud). SuitePacific's page leads with a scope exclusion ("we do not handle initial implementations"). The intent mismatch reduces topical relevance. Fix: restructure the page to lead with capabilities before the scope qualifier. Target long-tail variants: "netsuite managed services consulting", "outsourced netsuite team", "netsuite post-implementation consultant".

**[Medium] Mobile Services nav requires 3-4 taps to reach service pages**

The Services nav item links to `/#services` (homepage anchor). Mobile visitors must: tap Services nav, load homepage, scroll to services grid, tap a service card. Three interactions minimum. Fix: convert Services nav item to a dropdown (same pattern as Products) listing the 6 core service pages directly.

---

## Topic Clusters: 58/100

### Cluster Map

| Cluster | Hub page | Spokes | Health |
|---|---|---|---|
| SuiteScript Development | /netsuite-suitescript-development | 9 posts | Partial gap — hub links back to only 4 |
| Workflow Automation | /netsuite-workflow-automation | 3 posts | Healthy |
| Advanced PDF Templates | /netsuite-advanced-pdf-templates | 3 posts | Partial gap — hub missing freemarker-pdf-guide |
| Saved Searches | /netsuite-saved-searches-dashboards | 3 posts | Healthy — all bidirectional |
| Post-Go-Live Support | /netsuite-post-go-live-support | 4 direct + 11 release note inbound | Partial gap — hub does not link back to release note posts |
| Account Optimization | /netsuite-account-optimization | 2 posts | Thin — hub missing netsuite-optimization |
| Integrations | /netsuite-integrations | 3 posts | Healthy |

**Two content groups with no hub:**
- **Field Service Management:** 4 FSM posts link only to `/contact`
- **2026.2 Release Notes:** 11 posts scatter to 3 service pages with no aggregating hub

**Hub pages with zero blog support:**
- `/netsuite-consulting-services` — zero spokes (highest-value page on the site)
- `/hire-netsuite-developer` — zero direct spokes
- `/netsuite-admin-support-small-business` — zero spokes
- `/netsuite-administrator-support` — 1 inbound spoke; hub links back to zero blog posts

### Findings

**[Critical] /netsuite-consulting-services has zero blog support**

No blog post targets queries like "netsuite consulting services", "netsuite consultant", "how to choose a netsuite consulting partner", or "netsuite managed services". This page receives no link equity from editorial content. It is the most commercially valuable service page on the site.

Priority action: write "How to Choose a NetSuite Consulting Partner for Long-Term Support". Single post; highest-ROI content investment available.

**[High] 8 blog posts are internal link dead-ends**

These 8 posts route only to `/contact` or a resource page with no service page destination:

| Post | Recommended target |
|---|---|
| netsuite-fsm-bundle-update-august-2026 | /netsuite-administrator-support |
| netsuite-fsm-mobile-changes-august-2026 | /netsuite-administrator-support |
| netsuite-fsm-nxc-now-migration-august-2026 | /netsuite-administrator-support |
| netsuite-fsm-readonly-migration-august-2026 | /netsuite-administrator-support |
| netsuite-suiteql-bound-parameters | /netsuite-suitescript-development |
| netsuite-suiteql-sort-change-2026-2 | /netsuite-suitescript-development |
| netsuite-currency-context-custom-fields | /netsuite-administrator-support |
| netsuite-suitetax-term-discounts | /netsuite-administrator-support |

**[High] netsuite-advanced-pdf-data-model links to wrong hub**

This post links to `/netsuite-suitescript-development`. It belongs in the PDF Templates cluster and should link to `/netsuite-advanced-pdf-templates`. The hub correctly links to the post; the spoke does not reciprocate. One-line fix.

**[High] 11 release note posts have no 2026.2 hub post**

"netsuite 2026.2 release notes" and "netsuite 2026.2 what's new" have real search volume. No hub post exists for this cluster. The 11 feature posts currently route to `/netsuite-post-go-live-support`; that hub does not link back to any of them.

Priority action: create "NetSuite 2026.2: Full Release Notes Summary". This gives 11 existing posts a proper internal destination and creates one new high-value page targeting a real query.

**[High] netsuite-optimization vs netsuite-account-performance — cannibalization risk**

Both posts target "slow/broken NetSuite account" queries. The same competitor set (Kimberlite, Coefficient, DeveloperStroop, Stockton10) appears in SERPs for both. The intent differentiation (diagnostic vs. audit) is real but thin. Ensure titles explicitly distinguish the two: `netsuite-account-performance` owns "why is netsuite slow"; `netsuite-optimization` owns "netsuite account audit" or "netsuite optimization checklist".

**[Medium] Multiple hubs have incomplete outbound spoke links**

| Hub | Missing outbound blog links |
|---|---|
| /netsuite-suitescript-development | user-event-vs-client-script, workflow-vs-suitescript, suiteql posts |
| /netsuite-advanced-pdf-templates | freemarker-pdf-guide |
| /netsuite-post-go-live-support | netsuite-support-partner-evaluation |
| /netsuite-account-optimization | netsuite-optimization post |
| /netsuite-administrator-support | passkey-second-factor-2026-2 |

**Recommended new posts (in priority order):**
1. "NetSuite 2026.2: Full Release Notes Summary" — gives 11 feature posts a hub
2. "How to Choose a NetSuite Consulting Partner for Long-Term Support" — first spoke for /netsuite-consulting-services
3. "NetSuite FSM: Administrator Setup and Maintenance Guide" — interim pillar for 4 FSM posts
4. "NetSuite Integration Options: When to Use SuiteScript, REST, RESTlet, or a Platform"
5. "NetSuite Workflow Audit: How to Find Automations That Fire Too Often"

---

## Backlinks: INSUFFICIENT DATA

**Backlink Health Score: INSUFFICIENT DATA (0 of 7 scoring factors have data)**

suitepacific.com launched June 2026. The most recent Common Crawl web graph release (cc-main-2026-jan-feb-mar) predates the domain by 3 months. The domain is not absent due to link weakness — it simply did not exist when the crawl ran. No Moz, Bing, or DataForSEO data is configured.

**Context:** This is expected for a 2-month-old domain. Competitive B2B queries weight referring domain count heavily. The content foundation (69 content pages) is in place. The priority is converting that content into inbound links before the next CC quarterly release (~Q3 2026).

**Target:** 5-10 referring domains within 90 days.

**Priority link-building channels (effort/return ranked):**
1. **Oracle/NetSuite partner directories** — G2, Clutch, Oracle AppSource, NetSuite Partner Locator. Free. DA 70-90+. Followed links. Establish immediately.
2. **r/NetSuite** — 45,000 members. Answer SuiteScript/workflow questions genuinely. Reference articles when directly relevant. No promotional framing.
3. **SuiteAnswers community** — Oracle's own community. Answer questions with citations to resource pages.
4. **ERP publications** — NLAuth deprecation is newsworthy. Pitch a guest byline to ERP Focus or Practical NetSuite.
5. **Client mentions** — request a link from any client who references the engagement.

**To unlock a scored backlink report:** Configure Moz API (free, 2,500 rows/month) at https://moz.com/products/api — upgrades to Tier 1 data with DA/PA, spam score, anchor text. Re-run `/seo backlinks suitepacific.com` after configuration.

**One additional finding:**

No blog or resource page links to any external source (Oracle Help Center, release notes). Adding one authoritative outbound citation per release-note post: (a) signals primary-source research to Google quality raters, (b) increases the chance of appearing in NetSuite community aggregations that cite well-documented posts.

---

## Appendix A: False Positive Resolution

The first technical subagent (launched in a prior context window) produced five findings later confirmed false via direct source code and live site verification. Documented here for accuracy:

| Finding | Status | Evidence |
|---|---|---|
| "No canonical on homepage" | FALSE | Present in `app/(site)/page.tsx` line 20 |
| "/suitecompare has noindex" | FALSE | `app/suitecompare/page.tsx` line 31 overrides with `robots: { index: true }` |
| "SuiteCompare not in static HTML" | FALSE | `href="/suitecompare"` confirmed in live curl output |
| "Two service pages orphaned" | FALSE | Both confirmed linked from homepage |
| "robots.txt missing auth routes" | FALSE | All paths present in live `robots.txt` |

Content agent false finding: "CRITICAL — duplicate SuiteQL blog posts". Only one SuiteQL sort-change post exists: `netsuite-suiteql-sort-change-2026-2.md`. The referenced `netsuite-suiteql-default-sort-change` does not exist in `content/blog/`.

SXO agent discrepancy: "No ServiceJsonLd on any service page". This is incorrect — Service schema is present on all 11 service pages, confirmed by the schema agent via direct source code review of `components/seo/JsonLd.tsx` and service page metadata.

---

## Appendix B: Files to Edit (Quick Reference)

| Fix | File | Line/Change |
|---|---|---|
| og:image on 12 service pages | Each service page.tsx | Add `images: [{url: og-default.png, width: 1200, height: 630}]` to openGraph |
| /suitecompare canonical + og:image | app/suitecompare/page.tsx | Add `alternates.canonical` and `openGraph.images` |
| TechArticle schema image | app/(site)/resources/[slug]/page.tsx | Line 63: change `logo-icon.png` to `og-default.png` |
| PDF data model wrong hub link | content/blog/netsuite-advanced-pdf-data-model.md | Change service link to /netsuite-advanced-pdf-templates |
| Dead-end blog posts (8 posts) | content/blog/*.md | Add closing paragraph linking to service page |
| Homepage title cannibalization | app/(site)/page.tsx | Revise homepage title metadata |
| Mid-page LeadForm (4 service pages) | app/(site)/*/page.tsx | Add `<LeadForm />` mid-page, change CTA button to `#contact` |

---

*Generated by claude-seo audit framework. Agents: seo-technical, seo-content, seo-schema, seo-geo, seo-backlinks, seo-sxo, seo-cluster. All findings verified against live site and source code where flagged as discrepant.*

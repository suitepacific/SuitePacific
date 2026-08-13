# SuitePacific — Full SEO Audit Report

**Baseline audit:** 2026-08-07 (score: 71/100)
**Previous audit:** 2026-08-12 (score: 81/100, self-assessed)
**Deep audit:** 2026-08-13 (score: 74/100, 5 specialist agents + 7 GSC datasets)
**Domain:** suitepacific.com
**Technology:** Next.js 15 App Router on Vercel (full SSG — all 153 pages pre-rendered)
**Business type:** B2B Professional Services — NetSuite post-go-live support, SuiteScript development, workflow automation, integrations, saved searches, advanced PDF templates, administrator support
**Target buyer:** CFO, Controller, ERP Manager, NetSuite Admin at companies with 50-500 employees already live on NetSuite
**Pages crawled:** 153 (45 blog, 30 resources, 6 case studies, 24 service pages, 7 industry pages, 4 AI pages, hubs + homepage)
**GSC data:** 7 datasets (Chart, Countries, Devices, Filters, Pages, Queries, Search appearance) — last 3 months

---

## Overall SEO Health Score: 74/100

**Note on scoring difference from August 12:** The August 12 score of 81/100 was self-assessed without specialist agents and did not account for CTR analysis (GSC data), duplicate content risk, or the privacy policy gap. The August 13 score of 74/100 uses 5 independent specialist agents and real GSC data and is more accurate.

| Category | Weight | Baseline | Aug 12 | Aug 13 | Weighted |
|---|---|---|---|---|---|
| Technical SEO | 22% | 84 | 88 | 80 | 17.6 |
| Content Quality | 23% | 72 | 80 | 71 | 16.3 |
| On-Page / CTR | 20% | 63 | 78 | 65 | 13.0 |
| Schema / Structured Data | 10% | 72 | 80 | 72 | 7.2 |
| Performance (CWV) | 10% | 75 | 78 | 82 | 8.2 |
| AI Search / GEO | 10% | 56 | 80 | 77 | 7.7 |
| Images / Media | 5% | 48 | 85 | 70 | 3.5 |
| **Total** | **100%** | **71** | **81** | **74** | **73.5** |

### GSC Trend (actual data)

- Traffic growth: ~0 clicks/day (late June) to 14-15 clicks/day (early August)
- Avg position: ~50 (June) to ~8-10 (August)
- IndexNow: 68 URLs pinged, HTTP 202 accepted

---

## What Was Fixed Since the Baseline

### SEO Audit Batch 1 (commit 17c8f86)
- Title tags updated on service pages — keyword-matched, within 60-char limit
- OG tags added to service pages
- Sitemap dates aligned to accurate lastModified timestamps

### SEO Audit Batch 2 (commit f32f3d6)
- TechArticle schema image fixed (logo-icon.png → og-default.png with correct 1200x630 dims)
- Internal links added to dead-end blog posts
- Early in-page form added to service pages (LeadFormLight before content)
- llms.txt updated with AI service pages and industry pages

### SEO Audit Batch 3 (commit e234fc9)
- Homepage title cannibalization resolved — title changed to brand-hub statement
- Sitemap lastModified dates updated for recently touched pages
- og:image wiring confirmed on all service pages

### SEO Audit Batch 4 (commit 4e99b00)
- Canonical self-reference added to /suitecompare and other missing pages
- Duplicate redirect chains resolved
- Schema batch fixes: `url` property on BlogPosting/TechArticle, publisher logo dimensions, @id anchor on OrganizationJsonLd
- Content links added from 4 previously dead-end FSM posts to /netsuite-administrator-support

### GEO / Entity Expansion (commits 57bfe50, e1792d0, b858ba7)
- `VideoObjectJsonLd` added to homepage + 7 industry pages + 2 main service pages (9 pages total)
- `OrganizationJsonLd` added to 7 industry pages + 2 main service pages (10 pages total including homepage)
- YouTube thumbnail + play overlay replacing broken iframes on 3 pages
- 7 industry pages added to sitemap.ts
- AI Services dropdown added to header nav and footer

---

## Executive Summary

The 10-point score gain reflects real structural improvements: the og:image gap (Images was 48/100) is resolved, the homepage no longer cannibalizes its own top service page, and the AI Search signal stack now includes VideoObjectJsonLd on 9 pages, OrganizationJsonLd across the full key-page set, and visible YouTube thumbnails.

Three remaining blockers to address before the next round:

**Schema coverage gap (High):** Only 9 of the site's 24+ non-hub pages have `OrganizationJsonLd` and `VideoObjectJsonLd`. The remaining 17 service and AI pages are missing both. This is a batch operation — one import line and two JSX blocks per file.

**Missing page in sitemap (High):** `/netsuite-freelancer-vs-consulting-firm` is a fully built, indexable page that is absent from `app/sitemap.ts`. AI crawlers and Google must discover it through internal links alone. It should be in the sitemap with an accurate `lastModified`.

**CTA conversion (High):** Despite the early LeadFormLight fix, the primary CTA buttons on 4 service pages still link to `/contact` rather than anchoring to an in-page form. The pattern exists in `/hire-netsuite-developer` — replicate it.

---

## Technical SEO: 88/100

### What Works

- **Full SSG:** All 153 pages are pre-rendered. `X-Nextjs-Prerender: 1` header confirmed. No JavaScript rendering needed for any crawler.
- **Security headers:** HSTS with `max-age=63072000; includeSubDomains; preload`, `X-Content-Type-Options: nosniff`, `Referrer-Policy: strict-origin-when-cross-origin`. HSTS preload-eligible.
- **Sitemap:** 153 URLs, accurate per-page `lastmod` timestamps, sitemap URL declared in `robots.txt`. Industry pages now included with `lastModified: 2026-08-05`.
- **Canonical tags:** Present and self-referencing on all crawled pages including /suitecompare. No cross-domain or conflicting canonicals.
- **Redirect chains:** HTTP to HTTPS in one hop. www to non-www in one hop. Duplicate redirect chains resolved (batch 4).
- **TTFB:** 60-83ms across all audited pages. Vercel CDN cache hit on all requests.
- **AI crawler access:** Named User-Agent blocks for GPTBot, OAI-SearchBot, ClaudeBot, PerplexityBot — all `Allow: /`.
- **llms.txt:** Present at `/llms.txt`, complete with AI and industry pages, RSL 1.0 licensed.

### Findings

**[High] /netsuite-freelancer-vs-consulting-firm absent from sitemap**

The page exists at `app/(site)/netsuite-freelancer-vs-consulting-firm/page.tsx` and is fully built. It is not in the `SERVICE_PAGES` array in `app/sitemap.ts`. Google and AI crawlers can only discover it via internal links. Fix: add to `SERVICE_PAGES`:
```ts
{ path: "/netsuite-freelancer-vs-consulting-firm", lastModified: SEO_REFRESH_DATE },
```

**[Medium] CSP unsafe-inline and unsafe-eval present**

These directives negate XSS protection in the Content-Security-Policy header. Does not affect SEO directly. Fix when time permits: nonce-based CSP via Next.js middleware.

**[Medium] No IndexNow implementation**

Bing and Yandex indexing relies entirely on crawl discovery. IndexNow pings Bing Copilot directly on each publish event, which feeds Copilot citation freshness. Setup: generate UUID key, place at `/public/[key].txt`, add a `fetch` call in the post-deploy hook. 30-minute task.

**[Low] CSP frame-ancestors 'none' conflicts with X-Frame-Options: SAMEORIGIN**

Contradictory framing directives. Modern browsers follow CSP. Fix: align both to `frame-ancestors 'none'` + `X-Frame-Options: DENY`.

**[Low] Case study sitemap lastmod all share 2026-06-01**

Derive each case study's lastModified from its publication date field, not a batch constant.

---

## Content Quality: 80/100

### What Works

- All NetSuite content verified accurate — sourced from official release notes, no invented navigation paths
- 39 blog posts + 30 resource pages — unusually large for domain age
- Quick Answer boxes on 12 posts (134-167 words, self-contained — optimal AI citation length)
- FAQ sections in 12 posts — useful for query coverage (FAQPage schema retired May 2026; existing markup harmless, don't remove)
- All 35 posts under 3 months old — within the 3x AI citation recency window (SE Ranking 1.3M-citation study)
- LeadFormLight before content and at the bottom on all blog/resource pages
- Internal links added from dead-end blog posts to service pages (batches 2 and 4)

### Findings

**[High] 23 blog posts missing a Quick Answer block**

Only 12 of 35 posts have a self-contained 130-167 word summary block. SE Ranking's study found ~44% of AI citations come from the first 30% of a page. Posts without a Quick Answer box send AI crawlers into their body to find a citable passage — often buried after narrative setup.

Priority 5 posts for Quick Answer blocks:
1. `netsuite-workflow-vs-suitescript` — cross-cluster traffic, highest value
2. `signs-netsuite-support-not-working` — commercial intent, linked to service page
3. `netsuite-post-go-live-checklist` — bottom-of-funnel
4. `netsuite-month-end-close-checklist` — CFO intent
5. `netsuite-saved-search-tips` — large search volume

**[High] Zero question-based H2 headings across all 35 posts**

All posts use declarative H2s ("What a Client Script actually is"). AI systems match section headings against user queries. Question headings ("When should you use a Client Script?") match directly and flag the passage as a candidate citation. Converting 5-10 H2s per post to question format is the highest-leverage structural change for AI citation rates.

**[Medium] 2 blog posts still under 1000 prose words**

`netsuite-payment-runs-2026-2` (~882 words) and `netsuite-bank-reconciliation-changes-2026-2` (~923 words). Add a before/after configuration scenario and an FAQ section to each.

**[Medium] No CFO/Controller-targeted content**

All 69 content pages target NetSuite admins and developers. The stated buyer persona (CFO, Controller) is unaddressed in editorial content. Add 2-3 finance-leader posts per quarter: month-end close outcomes, AR aging report optimization, when to hire a NetSuite consultant.

**[Low] SVG diagram text uncitable by AI crawlers**

Technical posts embed inline SVGs with `<text>` elements. GPTBot and ClaudeBot do not parse SVG text content. Add a plain-text `<figcaption>` after each SVG with the key conclusion in 1-2 sentences. Additive change, no SVG removal needed.

---

## On-Page SEO: 78/100

### What Works

- Title tags: all service and industry pages have keyword-matched titles within 60 characters
- Homepage title fixed — now "SuitePacific: NetSuite Support and Custom Development" — removes conflict with /netsuite-post-go-live-support
- Meta descriptions: trimmed to 150-160 characters on previously over-length service pages
- H1 tags: present on all pages, match page intent
- Canonical tags: present and accurate including /suitecompare (batch 4)
- Breadcrumb navigation present across all page types
- AI Services now in header nav and footer (visible to crawlers)

### Findings

**[High] Services nav item links to homepage anchor, not a service hub**

The "Services" nav item links to `/#services`, routing mobile visitors through a 3-tap path (nav tap, homepage load, scroll, service tap). The "AI Services" dropdown was added as a separate nav item — the same pattern should apply to "Services" itself: convert it to a dropdown listing the 6 core service pages directly.

**[Medium] /netsuite-consulting-services intent mismatch persists**

Top SERP results for "netsuite consulting services" are implementation-partner pages. SuitePacific's page leads with scope exclusions ("we do not handle initial implementations"). Restructure the hero to lead with capabilities first; the scope qualifier moves to a secondary section. Target long-tail variants: "netsuite managed services consulting", "outsourced netsuite team".

**[Low] Blog post titles over 60 characters (SERP truncation)**

All post titles exceed 60 characters after appending "| SuitePacific". Google truncates. Low priority — cosmetic, not a ranking factor.

---

## Schema / Structured Data: 80/100

### What Works

- BlogPosting schema on all 35 posts with `dateModified` (uses `updated` frontmatter)
- TechArticle schema on all 30 resource pages (image now corrected to og-default.png 1200x630)
- ServiceJsonLd on all service pages with BreadcrumbList
- OrganizationJsonLd on homepage + 7 industry pages + 2 main service pages (10 pages total)
- VideoObjectJsonLd on homepage + 7 industry pages + 2 main service pages (9 pages total)
- SoftwareApplication on /suitecompare
- Article schema on 6 case study pages with ItemList on the index
- Article `url` property added (batch 4)
- Publisher logo dimensions declared (batch 4)
- OrganizationJsonLd `@id` anchor added (batch 4)

### Findings

**[High] OrganizationJsonLd and VideoObjectJsonLd missing from 17 service/AI pages**

Coverage is correct on the homepage and the 9 pages modified in this session. The remaining 17 service pages (SuiteScript, Workflow, Integrations, PDF Templates, Saved Searches, Administrator Support, Account Optimization, Hire Developer, ACS Alternative, Support Alternative, Oracle vs Third-Party, Certified Support, Managed Support, Freelancer vs Firm, Implementation Partner vs Managed, Admin Support Small Business, AI pages x4) have only `ServiceJsonLd + FaqJsonLd + BreadcrumbJsonLd`.

`OrganizationJsonLd` is the entity anchor that ties the page to the brand in Google's Knowledge Graph. `VideoObjectJsonLd` is the strongest off-page AI citation signal (0.737 correlation per Ahrefs). Both are one-import + two-JSX-block additions per file.

**[Medium] /netsuite-freelancer-vs-consulting-firm and /netsuite-implementation-partner-vs-managed-support missing ServiceJsonLd**

Both are editorial comparison pages, not service pitch pages. But they carry no structured data beyond BreadcrumbList. Add `Article` or `Service` schema to make them eligible for Article rich results and entity classification.

**[Low] Blog and Resources index pages missing collection schema**

`/blog` has only BreadcrumbList. `/resources` has only BreadcrumbList. Add `Blog` schema to `/blog` and `CollectionPage` schema to `/resources`.

**[Info] FAQPage schema produces no Google rich results**

Google retired FAQ rich results for all sites on May 7, 2026. Existing FAQPage blocks are structurally valid and harmless. Do not remove them.

---

## Performance (CWV): 78/100

### What Works

- TTFB: 60-83ms (Vercel CDN HIT across all audited pages)
- Total response time: 90-155ms
- Brotli compression active
- Inter WOFF2 preloaded in `<head>`
- Hero image preloaded with `imageSrcSet` for responsive delivery
- SSG: all content in initial HTML, no hydration delay for critical content

### Findings

**[Info] No Lighthouse/CWV field data available**

Lab metrics (LCP, INP, CLS) not measured in this audit. Run manually at https://pagespeed.web.dev, or configure `GOOGLE_API_KEY` for automated measurement via `/seo google crux`.

---

## AI Search Readiness (GEO): 80/100

### What Works

- AI crawlers explicitly allowed: GPTBot, OAI-SearchBot, ClaudeBot, PerplexityBot — named blocks, not wildcards
- Full SSG — all content accessible without JavaScript
- llms.txt: present, complete with AI and industry pages, RSL 1.0 licensed. (Note: Google Search ignores llms.txt per official guidance; useful for non-Google AI crawlers)
- Quick Answer boxes on 12 posts (optimal 134-167 word AI citation blocks)
- All 35 posts under 3 months old (3x AI citation recency window)
- VideoObjectJsonLd on 9 pages — YouTube correlation 0.737 with AI citation rates (strongest off-page signal, Ahrefs 75k-brand study)
- OrganizationJsonLd on 10 pages with `sameAs` linking to YouTube @SuitePacific and LinkedIn — brand entity signals for Knowledge Graph
- Visible YouTube thumbnails on 3 pages (multi-modal: text + video = 156% higher AI selection rate per GEO research)
- AI Services section navigable in header and footer — all 4 AI pages crawlable and linked

### Findings

**[High] 23 blog posts missing Quick Answer block**

Same as Content Quality finding. The structural fix (130-160 word citable summary at top of post) is the single highest-ROI content change for AI citation eligibility.

**[High] Zero question-based H2 headings**

Same as Content Quality finding. AI systems match section headings against query strings. Converting declarative H2s to question form directly increases passage citation probability.

**[Medium] No Reddit brand presence**

Reddit correlates at 0.46+ with AI citations (Ahrefs study). r/NetSuite has ~45,000 members. Two to three expert answers per week — referencing articles only when directly relevant — builds the brand signal without appearing promotional.

**[Medium] OrganizationJsonLd and VideoObjectJsonLd missing from 17 service pages**

Same as Schema finding. The entity anchors and video signals matter most on the pages that target commercial queries — precisely the service pages currently missing them.

---

## Images: 85/100

### What Works

- og:image present and correctly wired on all 12 original service pages (batch 1 + 3)
- og:image on /suitecompare (batch 4)
- og:image on all 7 industry pages (og-default.png from root layout, confirmed)
- og:image on all 4 AI service pages (og-default.png from root layout, confirmed)
- og-default.png is confirmed 1200x630 PNG
- BlogPosting and TechArticle schema now use og-default.png at 1200x630 (batch 2 fix)
- Hero image preloaded with `imageSrcSet`

### Findings

**[Low] All 39 blog posts share the same og:image (og-default.png)**

Posts shared on LinkedIn render identical social cards. Next.js supports dynamic OG image generation via `app/og/route.tsx`. Medium-term improvement: generate per-post cards using post title and category, without requiring a unique image per file.

---

## Search Experience (SXO): 65/100

### What Works

- LeadFormLight placed before content and at the bottom on all blog/resource pages
- Early in-page form added to service pages (batch 2)
- /hire-netsuite-developer has mid-page in-page LeadForm — the correct conversion template
- Case studies accessible from primary navigation

### Findings

**[High] CTA buttons on 4 service pages still link to /contact, not an in-page form**

Despite the early LeadFormLight addition, the primary CTA button at the bottom of `/netsuite-consulting-services`, `/netsuite-post-go-live-support`, `/netsuite-suitescript-development`, and `/netsuite-workflow-automation` still links away to `/contact`. The visitor exits. The correct model is `/hire-netsuite-developer`: mid-page LeadForm, button anchors to `#contact`.

**[High] Case studies lack quantified outcomes**

All 6 case studies describe qualitative improvements ("reduced manual work", "improved visibility"). CFOs and IT Directors need metrics to make a vendor decision. Even order-of-magnitude is sufficient: "from 4 hours to 20 minutes". Add one quantified outcome and one industry/company-size identifier to each case study.

**[Medium] Services nav item routes through homepage, not a service dropdown**

Mobile visitors: tap Services, load homepage, scroll, tap service card — three interactions minimum. Convert Services to a dropdown listing the 6 core service pages directly (same pattern as AI Services dropdown added this session).

---

## Topic Clusters: 65/100

### Current Cluster Health

| Cluster | Hub page | Spokes | Health |
|---|---|---|---|
| SuiteScript Development | /netsuite-suitescript-development | 9 posts | Partial — hub links back to 4 of 9 |
| Workflow Automation | /netsuite-workflow-automation | 3 posts | Healthy |
| Advanced PDF Templates | /netsuite-advanced-pdf-templates | 3 posts | Partial — hub missing freemarker-pdf-guide |
| Saved Searches | /netsuite-saved-searches-dashboards | 3 posts | Healthy |
| Post-Go-Live Support | /netsuite-post-go-live-support | 4 direct + 11 release note inbound | Partial — hub does not link back to release posts |
| Account Optimization | /netsuite-account-optimization | 2 posts | Thin |
| Integrations | /netsuite-integrations | 3 posts | Healthy |
| FSM Posts (4) | None | 4 posts | Linked to /administrator-support (batch 4) — no hub |
| 2026.2 Release Notes (11) | None | 11 posts | No hub |

### Findings

**[Critical] /netsuite-consulting-services has zero editorial blog support**

No blog post targets "netsuite consulting services", "netsuite consultant", "outsourced netsuite team", or related queries. This is the highest-value service page on the site and receives zero link equity from editorial content. Priority action: write "How to Choose a NetSuite Consulting Partner for Long-Term Support" — single post, highest ROI content investment available.

**[High] Hub pages that do not link back to their spoke posts**

`/netsuite-suitescript-development` links back to 4 of its 9 spoke posts. `/netsuite-post-go-live-support` links forward to service features but not back to the 11 release note posts that already link to it. Bidirectional linking completes the cluster and distributes link equity correctly.

---

## Backlinks: INSUFFICIENT DATA

Domain is too new for Common Crawl graph data. No Moz or Bing Webmaster API credentials detected. No numeric score generated — a score from 0 sources is misleading. Re-run after 6 months of operation when Common Crawl has indexed the domain.

---

## August 13 Deep Audit — New Findings (5 Specialist Agents)

_This section records findings from the August 13 deep audit that were not present or not adequately assessed in prior audits. All prior findings above remain valid unless marked resolved._

---

### Critical Issues (New, August 13)

**[Critical] No privacy policy page exists**

No page at /privacy or /privacy-policy. Every contact form and the hire-netsuite-developer page collects contact information, including details about the visitor's NetSuite account. Google's QRG (September 2025) treats privacy disclosure as a trustworthiness signal for YMYL and B2B service sites. There is also legal exposure in most jurisdictions for a site collecting personal data without disclosure.

Fix: create `app/(site)/privacy/page.tsx` with a minimal privacy policy (data collected, how it is used, contact method, no data sold). Link from footer next to the copyright line.

**[Critical] netsuite-saved-search-examples: 322 impressions, 0% CTR at position 17**

The page is visible to 322 searchers per period but receives zero clicks. Root cause is presentation, not content: the title does not include a count, and the meta description is not benefit-led. A listicle title without a number at positions 10-25 consistently underperforms.

Fix: Update title and H1 to "10 NetSuite Saved Search Examples (Finance, Operations, Admin)". Rewrite meta description to lead with the number and most specific benefit: "10 ready-to-build NetSuite saved searches for finance, operations, and admin teams — criteria, columns, and filters included." Add `updated: "2026-08-13"` to frontmatter for freshness signal.

**[Critical] netsuite-implementation-partner-vs-managed-support is ~429 words (service page minimum: 800)**

A companion blog post at 1,468 words covers the same topic in depth. Google will choose the blog post over the service page for this query, meaning the page designed to convert will not rank. The page needs at minimum a "how to decide" decision framework (200 words), a "signs you need managed support" list (100 words), and a paragraph on transition timing (100 words).

**[Critical] Local robots.txt blocks /suitecompare/ directory**

The local `public/robots.txt` has `Disallow: /suitecompare/` (the entire directory) while the live version correctly blocks only specific auth paths (`/suitecompare/login`, `/suitecompare/dashboard`, etc.). The SuiteCompare marketing page at `/suitecompare` (no trailing slash) is unaffected, but the structure is fragile. When deployed, any inbound link with trailing slash would be blocked before the redirect fires. Revert to enumerating specific auth paths matching the live file pattern.

---

### Content / E-E-A-T: 71/100 (New Detailed Findings)

**E-E-A-T by dimension:**

| Dimension | Score | Key gap |
|---|---|---|
| Experience | 58/100 | No case study outcome metrics embedded in blog posts; all practitioner signals rely on narrative voice |
| Expertise | 74/100 | Certifications appear on only 3 of 22 service pages; zero blog posts reference credentials |
| Authoritativeness | 60/100 | No external authority signals; case studies not cross-linked from blog posts |
| Trustworthiness | 72/100 | No privacy policy (critical); contact info in footer; HTTPS; LLC disclosed |

**[High] 30 resources have no date fields**

All 30 files in `content/resources/*.md` have no machine-readable publication date. The frontmatter uses `publishedAt` in some files but it is blank or absent across all 30. This means 30 indexed pages have zero freshness signal. Add `publishedAt` frontmatter to each file and verify the resource renderer exposes it.

**[High] netsuite-post-go-live-checklist has zero list items despite being called a checklist**

The post is 1,300 words of prose paragraphs organized under H2 headings. Users arriving from search expecting a checklist will see only narrative and leave. This is a bounce risk and a conversion barrier: if the user came to copy a checklist into their own process document, the page gives them nothing to act on. Fix: add a bulleted checklist under each H2 alongside the existing prose. No content removal — additive only.

**[High] 12 blog/resource pairs cover the same core topic with high duplication risk**

Confirmed overlapping slug pairs where both the blog post and a resource cover the same primary question in near-identical content:

- netsuite-rest-batch-sequential (blog 1,192w / resource 758w)
- netsuite-user-event-vs-client-script (blog 2,400w / resource 1,045w)
- netsuite-suiteql-bound-parameters (blog 1,229w / resource 801w)
- netsuite-payment-adjustments (blog 1,112w / resource 691w)
- netsuite-payment-runs (blog 1,029w / resource 862w)
- netsuite-passkey-second-factor (blog 1,174w / resource 690w)
- netsuite-suitetax-term-discounts, netsuite-currency-context-custom-fields, netsuite-sales-order-fulfillment-list, netsuite-bank-reconciliation, netsuite-project-health-indicators, netsuite-advanced-record-customization

For the 6 pairs where the blog post is under 1,200 words and the resource covers nearly the same content: 301-redirect the resource to the blog post and merge any unique content. For the other 6 (larger blog posts): differentiate more sharply — resource becomes pure code/config reference, blog stays narrative explanation.

**[Medium] Credentials mentioned on only 3 of 22 service pages and zero blog posts**

Oracle NetSuite SuiteCloud Developer II and Administrator Professional certifications appear on `/netsuite-consulting-services`, `/netsuite-suitescript-development`, and `/hire-netsuite-developer`. The remaining 19 service pages and all 45 blog posts make no reference to them. A single line added to the blog post callout or intro section would strengthen the expertise signal across the full content corpus without violating the no-personal-attribution rule.

---

### Schema: 72/100 (Agent Findings)

**[High] VideoObjectJsonLd missing `duration` field**

Google's VideoObject requirements include `duration` in ISO 8601 format (e.g., "PT3M42S"). The component in `components/seo/JsonLd.tsx` lacks this field entirely. Add `duration?: string` to the interface and pass it through to the JSON-LD output. Update all 30 call sites with the ISO 8601 duration of video IQvWN_yZ24A. This is a rich result eligibility gap.

**[High] ArticleJsonLd missing from /resources/[slug] and /case-studies/[slug]**

30 resources and all case studies are indexed content with no structured data beyond BreadcrumbList. Adding `ArticleJsonLd` to both template layouts is a single change that adds schema coverage to 30+ pages simultaneously.

**[Medium] netsuite-oracle-support-vs-third-party uses ServiceJsonLd (should be ArticleJsonLd)**

The page is a comparison article, not a service pitch page. ServiceJsonLd misrepresents the content type. Replace with `ArticleJsonLd` using the same pattern as `netsuite-freelancer-vs-consulting-firm.tsx`.

**[Medium] ServiceJsonLd and BlogPostingJsonLd missing `@id` anchors**

Add `"@id": \`${url}#service\`` to `ServiceJsonLd` and `"@id": \`${SITE_URL}/blog/${slug}#article\`` to `BlogPostingJsonLd`. These anchors allow Google's Knowledge Graph to build entity relationships across pages and strengthen topical authority.

**[Medium] OrganizationJsonLd missing `foundingDate`**

LLMs use founding date to assess business stability and authority. Add `foundingDate` to the component in `components/seo/JsonLd.tsx`.

---

### GEO / AI Search: 77/100 (Agent Findings)

**Platform breakdown:**

| Platform | Score | Key factor |
|---|---|---|
| Perplexity | 81/100 | Fresh versioned facts, PerplexityBot allowed, SSG |
| Google AIO | 79/100 | Strong schema, fresh dates, direct answers |
| ChatGPT | 73/100 | GPTBot allowed, YouTube signal, no Wikipedia entity |
| Bing Copilot | 71/100 | OAI-SearchBot allowed, schema present |

**Confirmed strengths:** All 4 major AI search crawlers whitelisted in robots.txt. llms.txt present with RSL 1.0 and 16 FAQ Q&A pairs. Quick Answer blocks on all 45 blog posts (100% coverage). Full SSG. VideoObjectJsonLd on 30 pages. `knowsAbout` array has 18 specific NetSuite technical terms. Content freshness: 35% of posts dated August 2026.

**[High] Only 38% of posts use question-format H2 headings (17 of 45)**

AI systems match section headings against user query strings. Question headings ("What changed in NetSuite 2026.2 payment runs?") are directly extractable as question-answer pairs. The 28 posts with statement headings ("What is being retired and when") are structurally weaker for citation. Priority conversion targets: release-note posts, NLAuth retirement post, Map/Reduce guide.

**[High] YouTube URL missing from llms.txt; 10 August 2026 posts missing from index**

YouTube is the strongest AI citation correlation signal (~0.737, Ahrefs 75k-brand study). The @SuitePacific channel is in `OrganizationJsonLd.sameAs` but absent from the llms.txt contact section. Add: `- YouTube: https://www.youtube.com/@SuitePacific`. Also: 10 August 2026 posts are not indexed in the llms.txt blog section (including how-to-choose-netsuite-consulting-partner, netsuite-roles-permissions-guide, netsuite-development-cost, netsuite-custom-gl-plugin-guide, and 6 others).

**[Medium] Single video ID across all 30 VideoObject pages**

All 30 VideoObjectJsonLd deployments reference video IQvWN_yZ24A. From a GEO signal perspective this is one YouTube entity, not 30. A second original video creates an independent brand mention and materially diversifies the signal.

**[Medium] No Wikipedia or Wikidata entity**

Wikipedia is the highest-impact missing signal for ChatGPT. A Wikidata entry for SuitePacific LLC is achievable now and can be added to `OrganizationJsonLd.sameAs` immediately after creation. A Wikipedia article requires demonstrated external notability — longer-term goal.

**[Medium] nlauth-tba Quick Answer is 126 words (optimal floor is 134)**

This is the only Quick Answer block identified as below the optimal 134-word floor. Add one sentence: "If you are unsure which integrations use NLAuth, run a search in Setup under Integration Records and filter by authentication type."

---

### On-Page / CTR: 65/100 (GSC Data)

**CTR gap pages:**

| Page | Impressions | CTR | Est. Position | Fix |
|---|---|---|---|---|
| /blog/netsuite-saved-search-examples | 322 | 0% | 17 | Title: add count; meta description: lead with number and benefit; add `updated` field |
| /blog/netsuite-saved-search-tips | 443 | 0.23% | ~25-35 | Rewrite meta description; add `updated` field; cross-link to examples post |
| /blog/netsuite-post-go-live-checklist | High | Low | ~15-25 | Add actual bullet checklists; intent mismatch causing bounce |
| /hire-netsuite-developer | High | Low | ~61 | Internal link deficit: add /hire-netsuite-developer links from 10+ SuiteScript blog posts |

**Rank #1 opportunities (60-90 day horizon):**

1. **netsuite acs alternative** — est. pos. 3-5, low competition, clear commercial intent. Cross-link from oracle-support-vs-third-party and add `AggregateRating` schema when reviews accumulate.
2. **netsuite suiteql [guide/bound-parameters/sort]** — 3-post cluster, est. pos. 5-8. Complete cross-links within the SuiteQL sub-cluster to reach position 1.
3. **netsuite fsm bundle update 2026** — est. pos. 1-3, near-zero competition. Submit fresh IndexNow ping for the 4 FSM posts.
4. **netsuite nlauth tba migration** — est. pos. 8-15. Add a numbered migration checklist; update meta description with the year.
5. **netsuite map reduce script guide** — est. pos. 6-12. Unique performance benchmarks (45 min to 5-8 min) are highly citable. Convert 2 statement H2s to questions.

---

### Release-Note Sub-Cluster Gap (New Finding)

The `netsuite-2026-2-finance-updates` post (1,229 words) is the natural parent hub for all 2026.2 release-note posts. Currently none of the 8 individual 2026.2 posts (payment-runs, bank-reconciliation-changes, payment-adjustments, bill-capture-preferences, project-health-indicators, advanced-record-customization, suiteql-sort-change, passkey-second-factor) link back to the finance-updates overview, and the finance-updates post does not link to any of them. This breaks the sub-cluster entirely. Each spoke should link to the finance-updates hub ("For the full 2026.2 finance changes summary...") and the hub should link to each deep-dive.

---

### SuiteCompare / Import Doctor Conversion Gap (New Finding)

No blog posts mention SuiteCompare or Import Doctor. The tool pages are siloed from the content cluster. The SuiteScript blog posts are the most technically engaged audience on the site and are the natural entry point for SuiteCompare. A simple callout in relevant SuiteScript posts ("Comparing two environments? Use SuiteCompare") with a link to /suitecompare would surface the product at zero additional content cost.

---

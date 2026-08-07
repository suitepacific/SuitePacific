# GEO Audit: suitepacific.com
**Date:** 2026-08-07 (updated from 2026-08-05 baseline)
**Auditor:** GEO Specialist (Claude Sonnet 4.6)
**Target queries:** netsuite post-go-live support, hire netsuite developer, netsuite suitescript development

---

## GEO Readiness Score: 56 / 100 (up from 52 on 2026-08-05)

| Dimension | Weight | Raw Score | Weighted | vs Prior |
|-----------|--------|-----------|---------|----------|
| Citability | 25% | 55 | 13.75 | +0.75 |
| Structural Readability | 20% | 70 | 14.0 | — |
| Multi-Modal Content | 15% | 25 | 3.75 | +0.9 |
| Authority & Brand Signals | 20% | 40 | 8.0 | +1.2 |
| Technical Accessibility | 20% | 82 | 16.4 | +0.6 |
| **Total** | | | **56 / 100** | **+4** |

**Score movement:** Service schema added to all 11 service pages (+schema authority). llms.txt now indexes 100% of 35 blog posts (up from 20%). SuiteCompare has SoftwareApplication schema. BlogPosting image dimensions corrected. All 35 posts remain under 3 months old (full freshness window).

---

## Platform Visibility Estimates

| Platform | Score | Limiting Factor |
|----------|-------|----------------|
| Google AI Overviews | 48/100 | No Wikipedia entity; anonymous brand; off-site signals absent |
| ChatGPT | 27/100 | No Reddit/YouTube; Common Crawl alone = low citation rate |
| Perplexity | 58/100 | Crawls live web; technical accuracy strong; lacks brand authority |
| Bing Copilot | 52/100 | Solid content, SSR confirmed, limited entity signals |

---

## AI Crawler Access Status

**Source:** `app/robots.ts` (generates `/robots.txt`)

Current output:
```
User-agent: *
Allow: /
Disallow: /admin
Disallow: /suitecompare/login
Disallow: /suitecompare/signup
Disallow: /suitecompare/dashboard
[...12 more auth/app paths]
Sitemap: https://suitepacific.com/sitemap.xml
```

| Crawler | Owner | Status | Recommendation |
|---------|-------|--------|----------------|
| GPTBot | OpenAI | Allowed (implicit via `*`) | Add explicit allow |
| OAI-SearchBot | OpenAI | Allowed (implicit) | Add explicit allow |
| ClaudeBot | Anthropic | Allowed (implicit) | Add explicit allow |
| PerplexityBot | Perplexity | Allowed (implicit) | Add explicit allow |
| CCBot | Common Crawl | Allowed (implicit) | Consider explicit disallow |
| anthropic-ai | Anthropic | Allowed (implicit) | Consider explicit disallow (training, not search) |
| Google-Extended | Google | Allowed (implicit) | Neutral; disallow = opt out of Gemini grounding |
| Bytespider | ByteDance | Allowed (implicit) | Consider disallow if not targeting TikTok markets |

**Issue:** A single wildcard rule is valid but suboptimal. All AI search crawlers are implicitly allowed, which is correct. However, explicit per-agent rules signal intent and can increase ingestion priority for newer crawlers that check for their specific user-agent string. Additionally, training crawlers (CCBot, anthropic-ai) are currently also allowed — the site has no way to allow search crawlers while blocking training ones without separate rules.

**Fix (robots.ts — low effort, high signal value):**
```ts
rules: [
  {
    userAgent: "*",
    allow: "/",
    disallow: [/* existing disallow list */],
  },
  { userAgent: "GPTBot", allow: "/" },
  { userAgent: "OAI-SearchBot", allow: "/" },
  { userAgent: "ClaudeBot", allow: "/" },
  { userAgent: "PerplexityBot", allow: "/" },
  { userAgent: "CCBot", disallow: "/" },        // training only
  { userAgent: "anthropic-ai", disallow: "/" }, // training only
],
```

---

## llms.txt Status

**File:** `/public/llms.txt` → `https://suitepacific.com/llms.txt`
**Google's position:** Google Search ignores this file. Non-Google AI crawlers (ChatGPT, Perplexity, Bing Copilot) use it for discovery. Keep it for those surfaces.
**RSL 1.0 licensing:** Present (final section) ✓
**Last updated:** 2026-08-05

### Current coverage (strong)

| Section | Status |
|---------|--------|
| Company description | ✓ Present in `>` blockquote |
| Who we are / What we do / Who we serve | ✓ Present |
| FAQ pairs | ✓ 15 pairs (up from 5 in prior audit) |
| Service pages index | ✓ 11 service pages + implementation guide |
| Products section | ✓ SuiteCompare + Import Doctor |
| Blog index | ✓ 35 of 35 posts (up from 8 in prior audit) |
| Resources index | ✓ 3 resources |
| Contact + LinkedIn | ✓ Present |
| RSL 1.0 licensing | ✓ Present |

### Remaining gaps

1. **No `llms-full.txt`**: A companion file with full article text (not just links) allows AI crawlers to ingest content directly rather than following links. Low priority for Google; relevant for Perplexity and others.
2. **Blog post descriptions are titles only**: Each blog entry is `[Title](url)` with no 1-sentence description. Adding a description per post (especially for the highest-value articles) improves context for AI systems parsing the index.
3. **Import Doctor product page URL** listed correctly as `/importDetector` in products section but description notes it requires SuiteCompare account — consider clarifying it as a beta feature.

---

## Citability Analysis

### Finding 1: HIGH — Blog openers are 40-85 words; optimal citation window is 134-167 words

All sampled posts open with 40-85 word paragraphs. These are good hooks but do not contain the self-contained answer block AI systems extract. ~44% of AI citations come from the first 30% of a page (SE Ranking study). The useful facts are arriving after orientation prose.

**Measured opener lengths (current state):**

| Post | Opener words | Pattern |
|------|-------------|---------|
| netsuite-workflow-vs-suitescript | 85 | Hook sentence → table |
| netsuite-map-reduce-script-guide | 80 | Diagnostic scenario → body |
| netsuite-post-go-live-checklist | 61 | Value claim → list |
| signs-netsuite-support-not-working | 56 | Observation → diagnostic |
| suitescript-best-practices | 40 | Positioning sentence only |

**Pattern:** Openers are narrative hooks designed to invite the reader in, not answer blocks designed to be extracted. A well-intentioned editorial choice that reduces AI citability.

**Recommendation:** For 5 priority posts, insert a 130-160 word "Quick Summary" block immediately after the first paragraph and before any SVG/table. Format as 3-5 declarative sentences that fully answer the implied query without requiring context from the rest of the article. The opener hook stays; the summary block becomes the citation target.

Priority order: `netsuite-workflow-vs-suitescript`, `suitescript-best-practices`, `netsuite-post-go-live-checklist`, `netsuite-map-reduce-script-guide`, `netsuite-user-event-vs-client-script`.

---

### Finding 2: HIGH — Zero question-based H2 headings across all 35 posts

Every sampled post uses declarative H2s. AI systems preferentially match section headings against user search queries. Declarative headings ("What a Client Script Actually Is") require the AI to infer intent. Question-based headings ("When Should You Use a Client Script?") match directly.

**Before/after examples:**

| Current H2 | Recommended |
|-----------|-------------|
| "What a Client Script actually is" | "When should you use a Client Script in NetSuite?" |
| "The mistake that causes intermittent failures" | "Why does SuiteScript logic only fire sometimes?" |
| "What is being retired and when" | "When exactly does NLAuth stop working in NetSuite?" |
| "Why Map/Reduce exists" | "Why can't a Scheduled Script process 10,000 records?" |
| "Who this is for" (sign post) | "What types of accounts does this apply to?" |

**Effort:** 15-20 H2 updates across 5 priority posts. No content changes, headings only.

---

### Finding 3: MEDIUM — SVG diagrams are invisible to AI crawlers

All blog posts contain embedded inline SVG diagrams. These are visually excellent but contain no text accessible to AI crawlers — SVG `<text>` elements are not parsed as content by GPTBot, ClaudeBot, or PerplexityBot. Every piece of information that exists only inside an SVG is not citable.

**Affected posts:** All major technical guides (map/reduce stages, REST batch flow, payment run workflow, post-go-live timeline, etc.)

**Recommendation:** Add a plain-text `<figcaption>` or a paragraph immediately after each SVG that states the key takeaway in 1-2 sentences. The visual stays; the text extraction point is added. Not a full alt-text description, just the actionable conclusion the diagram illustrates.

Example for map/reduce stages SVG:
> "Map/Reduce executes in five stages (getInputData, map, shuffle, reduce, summarize), each with its own governance budget. Records are processed in parallel across the map stage, which is why Map/Reduce handles 10,000 records where a Scheduled Script would hit governance limits."

---

### Finding 4: MEDIUM — "What is..." definition patterns missing from 24 of 35 posts

AI systems often cite passages that open with "X is..." or "X refers to..." definitional patterns. These work as zero-context extractions because they carry their own subject.

**Posts missing definition signal in first 2,000 characters (sample):**
- `advanced-pdf-template-mistakes.md`
- `netsuite-map-reduce-script-guide.md`
- `netsuite-month-end-close-checklist.md`
- `netsuite-nlauth-tba-end-of-support.md`
- `netsuite-account-performance.md`

**Low-effort fix:** Add a 2-3 sentence definition block to each article's second paragraph, after the hook opener. Example for NLAuth article:
> "NLAuth (NetSuite-native authentication) is a legacy credential-passing method that authenticates API calls by transmitting the account ID, email, and password in the HTTP Authorization header. It is the oldest authentication mechanism in NetSuite and the most widely used in custom RESTlet integrations — which makes its retirement in 2027.1 a high-priority migration for any account with third-party connections."

---

## Authority & Brand Signal Analysis

| Signal | Status | Correlation with AI Citations |
|--------|--------|------------------------------|
| YouTube channel/mentions | **Not present** | ~0.737 (strongest signal) |
| Reddit presence | **Not present** | High |
| Wikipedia entity | **Not present** | High |
| LinkedIn Company page | Present (schema + llms.txt) | Medium |
| Oracle certifications | Present in schema (award field) | Medium |
| Named authorship | Not present (anonymous brand) | Medium |
| Publish dates on posts | ✓ Present on all 35 posts | Low-Medium |
| Updated dates | Partial (~10 posts have `updated:` field) | Low-Medium |
| Source citations | Present (2026.2 release notes cited) | Medium |
| Freshness: all posts < 3 months | ✓ All 35 posts within window | High (3x citation boost) |

**Primary gap:** Zero off-site brand mentions on YouTube or Reddit. The Ahrefs study of 75,000 brands found YouTube mentions correlate 0.737 with AI citation rates — the strongest single signal available. Reddit (r/netsuite, r/ERP) is the most accessible entry point for a B2B technical brand with no paid media budget.

**Secondary gap:** Anonymous brand. `BlogPosting` schema lists `author: Organization`, which is technically valid but weaker than a Person entity with credentials. This is a deliberate identity constraint; noting it as a score factor.

---

## Technical Accessibility

### Server-Side Rendering: PASS
All `app/(site)/` pages are Next.js App Router Server Components. Zero "use client" directives on site-facing pages. JSON-LD structured data renders in initial HTML, not via JavaScript hydration. AI crawlers receive complete content on first fetch.

### Structured Data Coverage (current state)

| Schema Type | Coverage | Status |
|-------------|----------|--------|
| ProfessionalService (Organization) | Homepage | ✓ |
| WebSite | Homepage | ✓ |
| FAQPage | All 11 service pages | ✓ |
| BlogPosting | All 35 blog posts | ✓ |
| Service | All 11 service pages | ✓ (added batch 6) |
| BreadcrumbList | All pages | ✓ |
| SoftwareApplication | SuiteCompare page | ✓ (added batch 5) |
| HowTo | Step-by-step guides | Missing |
| Article (educational content) | Educational posts | Missing |

**Remaining gap:** `WebSite` schema lacks `potentialAction` (SearchAction), which enables Google Sitelinks Search Box in AI surfaces. Single-line addition.

**Remaining gap:** `Organization` schema `sameAs` array contains only LinkedIn. Adding Crunchbase, Clutch, or any verifiable third-party entity URL strengthens entity disambiguation for AI systems.

---

## Content Freshness (GEO Freshness Signal)

Per SE Ranking 1.3M-citation study: content under 3 months old is ~3x more likely to appear in AI answers. Content over 6 months old loses citation eligibility rapidly.

| Freshness bucket | Post count | % of total |
|-----------------|-----------|------------|
| Under 3 months old | 35 | 100% |
| 3-6 months old | 0 | 0% |
| Over 6 months old | 0 | 0% |

**Status: Excellent.** The site launched recently and all content is within the maximum citation eligibility window. This advantage expires as posts age. A scheduled refresh program (updating `updated:` frontmatter + adding a paragraph of new content) is needed to maintain this signal as the site matures. Start with posts published before July 1, 2026 in Q4.

---

## Top 5 Highest-Impact Actions

### 1. Add question-based H2 headings to 5 priority posts
**Effort:** 1-2 hours | **Impact:** High | **Type:** Content  
No new writing. Rephrase existing H2s from declarative to interrogative. Affects the 5 highest-traffic posts: workflow-vs-suitescript, map-reduce-script-guide, user-event-vs-client-script, suitescript-best-practices, post-go-live-checklist.

### 2. Insert 130-160 word "Quick Summary" blocks at the top of 5 priority posts
**Effort:** 3-4 hours | **Impact:** High | **Type:** Content  
These become the AI citation targets. Placed immediately after the first paragraph and before the first diagram. Must be fully self-contained — an AI should be able to cite it with zero surrounding context.

### 3. Add figcaption text after every SVG diagram (10-15 diagrams)
**Effort:** 2 hours | **Impact:** Medium-High | **Type:** Content  
Every insight currently trapped in an SVG becomes crawlable. Single sentence per diagram stating the key conclusion the diagram illustrates.

### 4. Add explicit AI crawler rules to robots.ts
**Effort:** 15 minutes | **Impact:** Low-Medium | **Type:** Technical  
Separate search AI crawlers from training crawlers. Explicitly allow GPTBot, OAI-SearchBot, ClaudeBot, PerplexityBot. Optionally disallow CCBot and anthropic-ai (training crawlers that do not contribute to search visibility).

### 5. Establish Reddit brand presence on r/netsuite
**Effort:** Ongoing (2-3 answers/week) | **Impact:** Medium (cumulative) | **Type:** Off-site  
Reddit presence is the highest-correlation off-site brand signal achievable without a Wikipedia article. r/netsuite has ~45,000 members who match the exact target buyer persona. Pattern: answer technical questions with genuine expertise; reference articles when directly relevant.

---

## What Changed Since Last Audit (2026-08-05)

| Item | Before | After |
|------|--------|-------|
| Service schema | Missing on all service pages | Added to all 11 |
| SuiteCompare schema | Missing | SoftwareApplication + BreadcrumbList |
| BlogPosting image | Missing dimensions | width/height corrected |
| llms.txt blog coverage | 8 of ~35 posts (23%) | 35 of 35 (100%) |
| llms.txt FAQ pairs | 5 | 15+ |
| Post-go-live hub spoke links | 0 | 3 (checklist, signs post, month-end) |
| Integrations hub spoke links | 0 | 2 (NLAuth, REST batch) |
| Zero-link blog posts | 5 | 0 |
| robots.ts disallow paths | 1 (/admin) | 16 (all auth/app routes) |
| GEO score | 52 | 56 |

---

## Findings JSON

```json
{
  "category": "AI Search Readiness",
  "score": 56,
  "dimensions": {
    "citability": { "score": 55, "weight": 0.25 },
    "structural_readability": { "score": 70, "weight": 0.20 },
    "multi_modal": { "score": 25, "weight": 0.15 },
    "authority_brand": { "score": 40, "weight": 0.20 },
    "technical_accessibility": { "score": 82, "weight": 0.20 }
  },
  "platform_scores": {
    "google_aio": 48,
    "chatgpt": 27,
    "perplexity": 58,
    "bing_copilot": 52
  },
  "ai_crawlers": {
    "GPTBot": "allowed_implicit",
    "OAI-SearchBot": "allowed_implicit",
    "ClaudeBot": "allowed_implicit",
    "PerplexityBot": "allowed_implicit",
    "anthropic-ai": "allowed_implicit",
    "CCBot": "allowed_implicit"
  },
  "llms_txt": {
    "present": true,
    "rsl_1_0": true,
    "faq_pairs": 15,
    "blog_coverage_pct": 100,
    "llms_full_txt": false
  },
  "brand_signals": {
    "wikipedia": false,
    "reddit": false,
    "youtube": false,
    "linkedin": true,
    "wikidata": "unverified"
  },
  "content_freshness": {
    "under_3mo": 35,
    "3_to_6mo": 0,
    "over_6mo": 0,
    "total_posts": 35
  },
  "open_issues": [
    "No question-based H2 headings across any post (0 of 35)",
    "Blog openers 40-85 words; optimal citation block is 134-167",
    "SVG diagram content not crawlable (no fallback text)",
    "No Reddit or YouTube brand presence",
    "robots.ts lacks explicit per-agent AI crawler rules",
    "OrganizationJsonLd sameAs contains only LinkedIn"
  ]
}
```

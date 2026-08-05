# GEO Audit: suitepacific.com
**Date:** 2026-08-05
**Auditor:** GEO Specialist (Claude Sonnet 4.6)
**Target queries:** netsuite post-go-live support, hire netsuite developer, netsuite suitescript development

---

## GEO Readiness Score: 52 / 100

| Dimension | Weight | Raw Score | Weighted |
|-----------|--------|-----------|---------|
| Citability | 25% | 52 | 13.0 |
| Structural Readability | 20% | 70 | 14.0 |
| Multi-Modal Content | 15% | 19 | 2.85 |
| Authority & Brand Signals | 20% | 34 | 6.8 |
| Technical Accessibility | 20% | 79 | 15.8 |
| **Total** | | | **52 / 100** |

---

## Platform Visibility Estimates

| Platform | Score | Limiting Factor |
|----------|-------|----------------|
| Google AI Overviews | 45/100 | No Wikipedia entity; anonymous brand; weak off-site signals |
| ChatGPT | 25/100 | No Reddit/YouTube; Common Crawl indexing alone = low citation rate |
| Perplexity | 55/100 | Crawls live web; technical accuracy helps; lacks brand authority |
| Bing Copilot | 50/100 | Solid content, SSR confirmed, limited entity signals |

---

## AI Crawler Access Status

**Source:** https://suitepacific.com/robots.txt (live)

```
User-Agent: *
Allow: /
Disallow: /admin
Sitemap: https://suitepacific.com/sitemap.xml
```

| Crawler | Status | Notes |
|---------|--------|-------|
| GPTBot | Allowed (implicit) | No explicit rule; wildcard allows |
| OAI-SearchBot | Allowed (implicit) | No explicit rule |
| ClaudeBot | Allowed (implicit) | No explicit rule |
| PerplexityBot | Allowed (implicit) | No explicit rule |
| anthropic-ai | Allowed (implicit) | No explicit block |
| CCBot | Allowed (implicit) | No explicit block |

No AI crawlers are blocked. However, no explicit allow rules are present. Explicit rules signal intent to AI platforms and can increase crawl priority for newer agents that check for their specific user-agent string.

---

## llms.txt Status

**File:** /public/llms.txt (live at https://suitepacific.com/llms.txt)
**Present:** Yes
**RSL 1.0 licensing:** Yes (final section)
**Format compliance:** Good

### What is present
- Company overview in first blockquote (llms.txt spec-compliant)
- Who we are, What we do, Who we serve, How we are different sections
- 5 FAQ pairs with direct Q&A format
- Full service page index with URLs (11 pages)
- Products section (SuiteCompare)
- Blog index (8 posts listed)
- Resources index (2 resources listed)
- Contact information
- RSL 1.0 license declaration

### What is missing
- No `llms-full.txt` companion file with extended article text for AI training crawlers
- No version number or last-modified date in the file
- No mention of SuiteCompare in FAQ pairs despite being the main product
- Blog index covers 8 of 38 blog posts (20% coverage)
- Resources index covers 2 of available resources; the FSM bundle update checklist is not linked
- No Q&A pairs for highest-value queries: "netsuite post-go-live support cost", "how long does netsuite suitescript development take", "what is included in netsuite admin support"

---

## Citability Analysis

Evaluated against: NLAuth TBA article, Post-Go-Live Checklist, User Event vs Client Script article.

### Finding 1: HIGH - Blog articles open with context sentences, not direct answers

All three sampled articles open with framing or hook sentences rather than a direct answer to the implied query. The first 40-60 words are where AI systems most frequently extract citations. If that window contains orientation prose, the article gets passed over in favor of pages that answer first.

**Evidence:**

NLAuth article (first 50 words):
> "NLAuth is one of the oldest authentication methods in NetSuite. It works by passing your account ID, email, and password directly in an HTTP Authorization header. Easy to implement, nothing to configure, and used in thousands of RESTlet integrations built over the last decade. NetSuite is ending it."

The useful fact ("NetSuite is ending it") arrives in word 52. An AI extracting the lead paragraph gets three sentences of context before the actionable finding.

Post-Go-Live Checklist (first 50 words):
> "The first 90 days after your implementation partner hands off the account are the highest-leverage period in your NetSuite history. Most of what's annoying or broken two years later was set in motion here, when decisions got made quickly to hit the go-live deadline rather than correctly."

No checklist summary, no direct answer to "what should I do post go-live."

User Event vs Client Script (first 50 words):
> "The most common SuiteScript question from teams inheriting a customized NetSuite account is some version of: 'Why does this logic only work sometimes?' Nine times out of ten, the answer is that someone put server-side business logic in a Client script, or vice versa."

This one is closest to a direct answer but still framed as a diagnostic observation.

**Recommendation:** Rewrite article openers to lead with the answer in 1-2 sentences, then add context. Example rewrite for NLAuth:
"NetSuite is retiring NLAuth in 2027.1 and Token-Based Authentication (TBA) tentatively in 2028.1. Any integration using NLAuth will stop working at the 2027.1 deadline. OAuth 2.0 is the required migration path."

### Finding 2: MEDIUM - H2 headings are declarative rather than question-format

Most H2s describe what a section covers rather than mirror a real user query. AI systems preferentially cite sections whose headings match the search intent.

**Evidence:**
- "What is being retired and when" (borderline; grammatically question-like but lacks "?" and is declarative)
- "What a Client Script actually is" (declarative)
- "What a User Event Script actually is" (declarative)
- "The mistake that causes intermittent failures" (declarative)

Exceptions that are closer to question format:
- "When to use both together" (still declarative)
- "A practical way to decide" (vague)

**Recommendation:** Rephrase 3-5 H2s per article as direct questions. "What a Client Script actually is" becomes "When should you use a Client Script?" "The mistake that causes intermittent failures" becomes "Why does SuiteScript logic only fire sometimes?"

### Finding 3: INFO - Passage length is mixed but several sections hit the optimal window

The 134-167 word optimal citation window is met by approximately half the article sections sampled. Some sections (particularly the "What to do if you use NLAuth/TBA" sections) run 80-120 words (slightly short). The User Event governance section runs 180+ words (slightly long). The summary tables are self-contained and extractable.

**Recommendation:** Target 140-160 words per H2 section for top-priority articles. No rewrite needed for sections already in range.

### Finding 4: HIGH - NLAuth article has strong citation signals but no structured summary block

The NLAuth article has the best AI-citation potential of the three sampled, with specific dates, a timeline diagram, a summary table, and contextual internal links. However, the summary table is the last element rather than appearing near the top where AI crawlers extract first. The SVG timeline diagram is visually descriptive but AI systems cannot parse inline SVG labels as semantic content.

**Recommendation:** Add a plain-text "Quick Summary" block (3-4 bullet points) immediately after the article intro, before the SVG. This is the single highest-value change for this article's AI citability.

---

## Authority & Brand Signal Analysis

| Signal | Status | Correlation with AI Citations |
|--------|--------|------------------------------|
| YouTube channel/mentions | Not present | ~0.737 (strongest signal) |
| Reddit presence | Not present | High |
| Wikipedia entity | Not present | High |
| LinkedIn Company page | Present (schema + llms.txt) | Medium |
| Oracle certifications | Present in schema | Medium |
| Named authorship | Not present (anonymous brand) | Medium |
| Publish dates on posts | Present | Low-Medium |
| Source citations in content | Present (2026.2 release notes) | Medium |
| Wikidata entity | Not verified | Medium |

The single largest gap is zero presence on YouTube and Reddit. The correlation between YouTube mentions and AI citations is ~0.737, the strongest single signal in citation research. A site that consistently ranks in AI answers typically appears in at least two of: Wikipedia, Reddit, or YouTube.

For an anonymous brand, Reddit participation (r/netsuite, r/ERP, r/NetSuite) under the brand handle is the most accessible on-ramp. Short technical Q&As that link back to articles are both useful and brand-building.

---

## Technical Accessibility

### SSR vs CSR
**Status:** Server-side rendered (Next.js 13+ App Router)

All page.tsx files in `app/(site)/` are Server Components with no "use client" directive. JSON-LD scripts render server-side and are present in the HTML document received by crawlers. Note: WebFetch strips `<script>` tags when converting to markdown, which makes JSON-LD invisible to that tool; this is a WebFetch limitation, not a rendering problem.

### Structured Data Coverage

| Schema Type | Pages Covered |
|-------------|--------------|
| Organization (ProfessionalService) | Homepage only |
| WebSite | Homepage only |
| FAQPage | 8 of 11 service pages |
| BlogPosting | All blog posts |
| BreadcrumbList | All blog posts, all service pages, resources |
| Article | Not present (distinct from BlogPosting) |

**Missing:** 3 service pages lack FAQ schema: none identified in this audit (all key service pages have FAQ schema as of this check). However, `WebSiteJsonLd` is minimal, missing `potentialAction` (SearchAction) for sitelinks search box.

**Gap:** `OrganizationJsonLd` has `sameAs` pointing only to LinkedIn. No Wikidata, Crunchbase, or other entity anchors.

### Sitemap
Present at https://suitepacific.com/sitemap.xml (confirmed via robots.txt declaration).

---

## Topical Authority Completeness

Target queries and coverage:

| Query | Coverage | Gap |
|-------|----------|-----|
| "netsuite post-go-live support" | High - dedicated page + blog post | No comparison article vs. implementation support |
| "hire netsuite developer" | High - dedicated page with FAQ schema | No pricing signals (intentional but hurts AI citation) |
| "netsuite suitescript development" | High - dedicated page + 3+ articles | Good coverage |
| "netsuite workflow automation" | High - dedicated page + article | Could use a best-practices deep-dive |
| "netsuite oauth 2.0 migration" | Medium - NLAuth article covers it | No dedicated resource on OAuth 2.0 setup |
| "netsuite saved search tips" | High - dedicated article + page | Strong |
| "netsuite admin support small business" | High - dedicated page | |
| "netsuite account slow performance" | Medium - one blog post | |
| "netsuite suiteql tutorial" | Low - two technical blog posts exist | Not indexed in llms.txt blog section |
| "netsuite map/reduce script" | Low - one blog post | Not indexed in llms.txt |

**Gap:** The llms.txt blog index (8 posts) misses several high-value technical articles that have been published: SuiteQL posts, map/reduce guide, FreeMaker PDF guide, saved search examples. These would directly answer queries where SuitePacific has content but AI systems may not surface it.

---

## Top 5 Highest-Impact Recommendations

### 1. Add explicit AI crawler rules to robots.txt
**Severity:** High
**Effort:** 15 minutes
**Impact:** Signals crawl intent to GPTBot, OAI-SearchBot, ClaudeBot, PerplexityBot; may increase crawl frequency and content ingestion rate.

Add to `/public/robots.txt` before the `Sitemap:` line:
```
User-agent: GPTBot
Allow: /

User-agent: OAI-SearchBot
Allow: /

User-agent: ClaudeBot
Allow: /

User-agent: PerplexityBot
Allow: /
```

### 2. Rewrite blog article openers to lead with the answer (5 priority articles)
**Severity:** High
**Effort:** 3-4 hours
**Impact:** Directly increases citability score; affects the single most influential factor in whether AI systems extract a passage.

Priority articles: NLAuth retirement, User Event vs Client Script, SuiteScript Best Practices, Post-Go-Live Checklist, Workflow Automation Mistakes.

Pattern: "Answer sentence (15-25 words). Supporting fact. Context sentence."

### 3. Convert 3-5 H2s per article to question format
**Severity:** High
**Effort:** 2 hours across 5 articles
**Impact:** Directly mirrors user search queries; improves match probability for AI intent-matching.

Highest-priority changes:
- "What a Client Script actually is" to "When should you use a Client Script in NetSuite?"
- "The mistake that causes intermittent failures" to "Why does SuiteScript logic only fire sometimes?"
- "What is being retired and when" to "When exactly does NLAuth stop working?"

### 4. Expand llms.txt blog index and add 10 more FAQ pairs
**Severity:** High
**Effort:** 2-3 hours
**Impact:** AI systems that read llms.txt use it to discover content; currently 20% of published articles are listed.

Add all technical articles (SuiteQL, map/reduce, FreeMaker, saved search examples). Add FAQ pairs for: "how does SuitePacific price its services", "what is included in netsuite post-go-live support", "how long does a SuiteScript customization take", "what is SuiteCompare".

### 5. Establish Reddit presence on r/netsuite
**Severity:** Medium
**Effort:** Ongoing (2-3 answers/week for 4 weeks to establish signal)
**Impact:** Reddit presence is the highest-correlation off-site brand signal achievable without a Wikipedia article. r/netsuite has an engaged audience that matches target buyer persona (NetSuite Admins, ERP Managers, Controllers).

Pattern: Answer technical questions with expertise, reference SuitePacific articles when genuinely relevant. Do not self-promote; let the answers demonstrate authority.

---

## Findings JSON (for audit-data.json)

```json
{
  "category": "AI Search Readiness",
  "score": 52,
  "dimensions": {
    "citability": { "score": 52, "weight": 0.25 },
    "structural_readability": { "score": 70, "weight": 0.20 },
    "multi_modal": { "score": 19, "weight": 0.15 },
    "authority_brand": { "score": 34, "weight": 0.20 },
    "technical_accessibility": { "score": 79, "weight": 0.20 }
  },
  "platform_scores": {
    "google_aio": 45,
    "chatgpt": 25,
    "perplexity": 55,
    "bing_copilot": 50
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
    "faq_pairs": 5,
    "blog_coverage_pct": 20,
    "llms_full_txt": false
  },
  "brand_signals": {
    "wikipedia": false,
    "reddit": false,
    "youtube": false,
    "linkedin": true,
    "wikidata": "unverified"
  },
  "critical_findings": [
    "Blog articles open with context sentences, not direct answers",
    "H2 headings are declarative rather than question-format",
    "No Reddit or YouTube presence",
    "llms.txt indexes only 20% of published blog content",
    "robots.txt lacks explicit AI crawler allow rules"
  ]
}
```

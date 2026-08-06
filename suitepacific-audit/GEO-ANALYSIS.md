# GEO Analysis: suitepacific.com
**Date:** 2026-08-06
**GEO Readiness Score: 64/100**

---

## Score Breakdown

| Category | Weight | Score | Notes |
|---|---|---|---|
| Citability | 25% | 14/25 | Opening blocks off-length, few FAQs |
| Structural Readability | 20% | 14/20 | Decent structure, mostly declarative headings |
| Multi-Modal Content | 15% | 10/15 | SVG diagrams present, no video |
| Authority & Brand Signals | 20% | 9/20 | Good schema, zero Reddit/YouTube/Wikipedia |
| Technical Accessibility | 20% | 17/20 | SSR, AI crawlers allowed, llms.txt present |

---

## Platform Breakdown

| Platform | Estimated Visibility | Notes |
|---|---|---|
| Google AI Overviews | Medium | Ranking-correlated; NLAuth post (#2 page, 161 views) likely eligible |
| Google AI Mode | Low-Medium | Broader pool; freshness and entity authority weak |
| ChatGPT | Low-Medium | **Confirmed referral from Quincy, IL on Aug 6** — already working |
| Perplexity | Low | No Reddit presence; Perplexity relies heavily on Reddit (46.7%) |
| Bing Copilot | Unknown | Not audited |

---

## AI Crawler Access Status

| Crawler | Status |
|---|---|
| GPTBot (OpenAI) | ALLOWED |
| OAI-SearchBot (OpenAI) | ALLOWED |
| ClaudeBot (Anthropic) | ALLOWED |
| PerplexityBot (Perplexity) | ALLOWED |
| anthropic-ai (Anthropic) | ALLOWED |
| CCBot (Common Crawl) | ALLOWED |
| Bytespider (ByteDance/TikTok AI) | MISSING |
| cohere-ai | MISSING |
| Google-Extended | NOT SET (Google can use content for training — acceptable) |

**Fix:** Add Bytespider and cohere-ai to robots.txt.

---

## llms.txt Status

**Present and comprehensive.** 168 lines, organized structure.

Strengths:
- Clear organization by section, product, FAQ
- 14 FAQ pairs covering pricing, engagement model, SuiteCompare, Import Doctor
- RSL 1.0 licensing declared
- Last-updated date included

Gaps:
- Not a Google citation lever (Google ignores it per official docs)
- Helps ChatGPT, Perplexity, Claude for non-search fetches — worth maintaining

---

## Brand Mention Analysis

| Platform | Status | Priority |
|---|---|---|
| LinkedIn | Present (linkedin.com/company/suitepacific) | Done |
| Reddit (r/netsuite) | Not present | HIGH |
| YouTube | Not present | MEDIUM |
| Wikipedia | Not present | LOW (brand too new) |
| Google Business Profile | Not verified | MEDIUM |

**Critical gap:** Perplexity gets 46.7% of its citations from Reddit. ChatGPT relies heavily on Reddit and Wikipedia. Zero Reddit presence means near-zero Perplexity citations and limited ChatGPT citations for informational NetSuite queries.

**Confirmed win:** ChatGPT referral recorded from Quincy, IL on Aug 6 — the site IS being cited by ChatGPT for some queries already.

---

## Passage-Level Citability

**Optimal block size: 134-167 words.**
**44% of AI citations come from the first 30% of a page.**

### Opening block word counts (key posts):

| Post | Opening words | Status |
|---|---|---|
| netsuite-nlauth-tba-end-of-support | 118 words | Too short — below 134 optimal |
| netsuite-user-event-vs-client-script | 105 words | Too short |
| suitescript-best-practices | 246 words | Too long — split needed |
| workflow-automation-mistakes | 198 words | Too long |

### Resource citability:
- 20/30 resources have at least one 134-167 word section — good
- 17 resources have sections under 134 words — padding needed
- 14 resources have sections over 167 words — should be broken up

### FAQ sections:
- Only 4/35 blog posts have FAQ sections — major gap
- FAQ format is one of the highest-citability patterns for AI (clear Q: / A: structure)

---

## Server-Side Rendering

**Pass.** Next.js App Router renders all public pages server-side. AI crawlers that do not execute JavaScript (all of them) receive complete HTML. No client-only content gates detected on public pages.

---

## Recency Signals

**Critical gap.** 0 out of 35 blog posts have an `updated:` field set. The BlogPosting schema is wired to use `dateModified: post.updated ?? post.date` — but since no post sets `updated:`, every post reports its original publish date as the modified date.

Content under 3 months old is 3x more likely to be cited in AI answers. Pages left stale 6+ months lose citation eligibility. Setting `updated:` on recently-touched posts is a zero-effort freshness boost.

**Posts that were modified in the SEO batch (Aug 2026) that should have `updated: "2026-08-05"`:**
- netsuite-bank-reconciliation-changes-2026-2
- netsuite-payment-runs-2026-2
- netsuite-payment-adjustments-2026-2
- netsuite-project-health-indicators-2026-2
- netsuite-bill-capture-preferences-2026-2
- netsuite-passkey-second-factor-2026-2
- netsuite-advanced-record-customization-2026-2
- signs-netsuite-support-not-working
- netsuite-nlauth-tba-end-of-support

---

## Top 5 Highest-Impact Changes

### 1. Add `updated:` to recently-touched blog posts (effort: 10 min)
Sets a real `dateModified` in BlogPosting schema. Signals freshness to Google AI Mode and AI Overviews. 3x citation likelihood for content under 3 months old.

### 2. Start posting on r/netsuite (effort: ongoing)
Perplexity is 46.7% Reddit-sourced. A single well-received r/netsuite post can drive more Perplexity citations than 10 blog posts. No account required to read, but posting builds presence. Answer real questions, link to resources naturally.

### 3. Add FAQ sections to top 5 blog posts (effort: 1-2 hours per post)
Only 4/35 posts have FAQ sections. Q: / A: format is directly citable — AI systems extract these verbatim. Priority posts: NLAuth, User Event vs Client, SuiteScript Best Practices, Workflow Mistakes, Post-Go-Live Checklist.

### 4. Add Bytespider and cohere-ai to robots.txt (effort: 5 min)
Currently missing from explicit allow blocks. Minor gap but easy fix.

### 5. Expand opening blocks to 134-167 words on key posts (effort: 30 min)
NLAuth (118w) and User Event vs Client (105w) are below optimal. These are the highest-traffic posts. Expanding the opening to 134-167 words with a direct, self-contained answer front-loads citability where 44% of citations come from.

---

## Schema Recommendations

**Current:** BlogPosting, ProfessionalService, WebSite, FAQPage, BreadcrumbList

**Missing:**
- `HowTo` schema on step-based posts (map/reduce guide, PDF template guide)
- `TechArticle` already on resources — good
- `SpeakableSpecification` — marks passages as voice/AI readable

---

## Content Reformatting Suggestions

### NLAuth post (highest traffic, 161 views/30d)
Opening 118 words — add one more paragraph directly answering "what does this mean for my integrations" before the SVG timeline. Target: 145-155 words.

### User Event vs Client Script
Opening 105 words — add a direct definition block: "A User Event script runs server-side on every save, regardless of how the record was saved. A Client Script runs browser-side and only fires during manual UI interactions." That alone adds ~25 words and is directly citable.

### SuiteScript Best Practices (246 words)
Too long. Break the opening into two sections — "What this guide covers" and "The most common mistake". Each becomes a separate citable block.

---

## What's Working

- **ChatGPT referral confirmed** — suitepacific.com is already being cited in ChatGPT answers for NetSuite queries
- llms.txt is comprehensive and well-structured
- All major AI crawlers are explicitly allowed
- SSR ensures full HTML delivery to non-JS crawlers
- 34/35 posts contain specific statistics (strong citability signal)
- SVG diagrams in resource posts add multi-modal depth
- ProfessionalService + WebSite schema wired correctly

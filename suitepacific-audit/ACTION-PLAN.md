# SuitePacific SEO — Action Plan

**Generated:** 2026-08-07
**Overall Health Score:** 71/100
**Target after Phase 1-2:** 78/100

---

## Phase 1: Critical Fixes (This Week)

These are either 1-line code changes or closing-paragraph additions to existing posts. Combined time estimate: 3-4 hours.

### 1.1 Add og:image to all 12 service pages
**Impact: High | Effort: Low | Files: 12 service page.tsx files**

Every service page openGraph block is missing `images`. Add one line to each:
```ts
images: [{ url: 'https://suitepacific.com/og-default.png', width: 1200, height: 630 }]
```

Files to edit:
- `app/(site)/hire-netsuite-developer/page.tsx`
- `app/(site)/netsuite-suitescript-development/page.tsx`
- `app/(site)/netsuite-consulting-services/page.tsx`
- `app/(site)/netsuite-integrations/page.tsx`
- `app/(site)/netsuite-workflow-automation/page.tsx`
- `app/(site)/netsuite-saved-searches-dashboards/page.tsx`
- `app/(site)/netsuite-advanced-pdf-templates/page.tsx`
- `app/(site)/netsuite-administrator-support/page.tsx`
- `app/(site)/netsuite-account-optimization/page.tsx`
- `app/(site)/netsuite-post-go-live-support/page.tsx`
- `app/(site)/netsuite-implementation-partner-vs-managed-support/page.tsx`
- `app/(site)/netsuite-admin-support-small-business/page.tsx`

### 1.2 Fix resource TechArticle schema image
**Impact: Medium | Effort: Minimal | File: 1 line change**

`app/(site)/resources/[slug]/page.tsx` line 63: change `logo-icon.png` to `og-default.png`.

This unblocks Article rich result eligibility for all 30 resource pages.

### 1.3 Add canonical + og:image to /suitecompare
**Impact: Medium | Effort: Minimal | File: app/suitecompare/page.tsx**

```ts
alternates: { canonical: 'https://suitepacific.com/suitecompare' },
// add to openGraph:
images: [{ url: 'https://suitepacific.com/og-default.png', width: 1200, height: 630 }]
```

### 1.4 Fix homepage title cannibalization
**Impact: High | Effort: Minimal | File: app/(site)/page.tsx**

Current title: "SuitePacific: Post-Go-Live NetSuite Support & Optimization"
Change to: "SuitePacific: NetSuite Support and Custom Development" (or similar brand-hub statement)

This gives `/netsuite-post-go-live-support` full keyword ownership for "netsuite post go live support" queries.

### 1.5 Fix netsuite-advanced-pdf-data-model wrong hub link
**Impact: Low | Effort: Minimal | File: content/blog/netsuite-advanced-pdf-data-model.md**

Change the service page link from `/netsuite-suitescript-development` to `/netsuite-advanced-pdf-templates`. The hub correctly links to this post; the spoke needs to reciprocate.

### 1.6 Add service page links to 8 blog post dead-ends
**Impact: High | Effort: Low | Files: 8 blog posts**

These posts route only to `/contact` with no service page link. Add a closing paragraph to each:

| File | Add link to |
|---|---|
| content/blog/netsuite-fsm-bundle-update-august-2026.md | /netsuite-administrator-support |
| content/blog/netsuite-fsm-mobile-changes-august-2026.md | /netsuite-administrator-support |
| content/blog/netsuite-fsm-nxc-now-migration-august-2026.md | /netsuite-administrator-support |
| content/blog/netsuite-fsm-readonly-migration-august-2026.md | /netsuite-administrator-support |
| content/blog/netsuite-suiteql-bound-parameters.md | /netsuite-suitescript-development |
| content/blog/netsuite-suiteql-sort-change-2026-2.md | /netsuite-suitescript-development |
| content/blog/netsuite-currency-context-custom-fields.md | /netsuite-administrator-support |
| content/blog/netsuite-suitetax-term-discounts.md | /netsuite-administrator-support |

### 1.7 Add mid-page LeadForm to 4 service pages
**Impact: Critical | Effort: Medium | Files: 4 service pages**

The 4 service pages with CTA buttons linking to /contact instead of an in-page form:
- `app/(site)/netsuite-consulting-services/page.tsx`
- `app/(site)/netsuite-post-go-live-support/page.tsx`
- `app/(site)/netsuite-suitescript-development/page.tsx`
- `app/(site)/netsuite-workflow-automation/page.tsx`

For each: add `<LeadForm />` mid-page (after the "What we cover" section). Change CTA button `href="/contact"` to `href="#contact"`. Add `id="contact"` to the form wrapper div. Use the hire-netsuite-developer page as the reference implementation.

---

## Phase 2: High-Impact Improvements (Next 2 Weeks)

### 2.1 Rephrase H2 headings to question format (5 posts)
**Impact: High (AI citability) | Effort: Low | Content-only changes**

No content changes needed — headings only. Convert declarative H2s to question H2s on:
1. `content/blog/netsuite-workflow-vs-suitescript.md`
2. `content/blog/netsuite-map-reduce-script-guide.md`
3. `content/blog/netsuite-user-event-vs-client-script.md`
4. `content/blog/suitescript-best-practices.md`
5. `content/blog/netsuite-post-go-live-checklist.md`

Example: "What a Client Script Actually Does" → "When Should You Use a Client Script in NetSuite?"

### 2.2 Add Quick Summary blocks to 23 posts without Quick Answer boxes
**Impact: High (AI citability) | Effort: Medium | Files: 23 blog posts**

Add a 130-160 word self-contained summary block immediately after the first paragraph of each affected post. The block should answer the page's primary query completely — a reader should be able to understand the core answer from the summary alone.

Posts to update: all blog posts that do not currently have a Quick Answer or Quick Summary block. Check each post's second element (after the intro paragraph) — posts with an existing "Quick Answer" or "Quick Summary" H3 section are already covered.

### 2.3 Add figcaption text after SVG diagrams
**Impact: Medium (AI citability) | Effort: Low | Files: 10-15 blog posts with SVGs**

AI crawlers do not parse SVG text. Every insight locked in an SVG is uncitable. After each `<svg>` block in blog post content, add a `<figcaption>` with 1-2 sentences stating the key conclusion.

### 2.4 Rewrite opening paragraphs on 5 posts
**Impact: High (AI citability + featured snippets) | Effort: Low**

Rewrite the first paragraph of these posts to deliver the direct answer in the first 25 words:
1. `signs-netsuite-support-not-working` — also add link to /netsuite-post-go-live-support in closing section
2. `netsuite-saved-search-tips`
3. `netsuite-workflow-vs-suitescript`
4. `netsuite-month-end-close-checklist`
5. `workflow-automation-mistakes`

### 2.5 Expand 2 thin posts to 1000+ prose words
**Impact: Medium (content depth) | Effort: Medium**

- `content/blog/netsuite-payment-runs-2026-2.md` (~882 words) — add before/after scenario, 3 edge cases, FAQ section
- `content/blog/netsuite-bank-reconciliation-changes-2026-2.md` (~923 words) — same pattern

### 2.6 Update hub pages with missing outbound spoke links
**Impact: Medium (cluster authority) | Effort: Low | Files: 5 service pages**

| Hub | Add links to |
|---|---|
| /netsuite-suitescript-development | netsuite-user-event-vs-client-script, netsuite-workflow-vs-suitescript, netsuite-suiteql-bound-parameters, netsuite-suiteql-sort-change-2026-2 |
| /netsuite-advanced-pdf-templates | netsuite-freemarker-pdf-guide |
| /netsuite-post-go-live-support | netsuite-support-partner-evaluation |
| /netsuite-account-optimization | netsuite-optimization |
| /netsuite-administrator-support | netsuite-passkey-second-factor-2026-2 |

### 2.7 Add quantified outcomes to 6 case studies
**Impact: High (SXO conversion) | Effort: Medium | Files: 6 case study pages**

Add to each case study:
- One quantified outcome (e.g., "reduced from 4 hours to 20 minutes", "eliminated 3 manual steps")
- Client industry (e.g., "wholesale distributor", "SaaS company")
- Approximate company size (e.g., "120-person team", "50-500 employees")

### 2.8 Trim service page meta descriptions
**Impact: Low (CTR) | Effort: Minimal | Files: 3 service pages**

Trim to 150-160 characters:
- `hire-netsuite-developer` (202 chars)
- `netsuite-suitescript-development` (185 chars)
- `netsuite-consulting-services` (182 chars)

---

## Phase 3: Content and Authority (Month 2)

### 3.1 New hub post: "NetSuite 2026.2: Full Release Notes Summary"
**Priority: High | Type: New post**

This single post unblocks 11 existing feature posts that currently route to /contact or a service page with no context. The hub post:
- Targets "netsuite 2026.2 release notes" and "netsuite 2026.2 what's new" (real search volume)
- Links out to all 11 feature posts
- Links to /netsuite-post-go-live-support and /netsuite-consulting-services
- All 11 feature posts update to link back to it

### 3.2 New spoke post: "How to Choose a NetSuite Consulting Partner"
**Priority: High | Target hub: /netsuite-consulting-services**

The highest-value service page has zero blog support. This post:
- Targets "netsuite consulting partner", "netsuite managed services", "outsourced netsuite team"
- Cross-links to netsuite-support-partner-evaluation, signs-netsuite-support-not-working, netsuite-post-go-live-checklist
- Closes with a link to /netsuite-consulting-services

### 3.3 New FSM pillar post: "NetSuite FSM: Administrator Setup Guide"
**Priority: Medium | Interim pillar for 4 FSM posts**

Gives the 4 FSM posts a proper internal destination. Links to /netsuite-administrator-support. All 4 FSM posts update to link back to this post.

### 3.4 Schema fixes (batch)
**Effort: Low | All in components/seo/JsonLd.tsx**

- Add `url` property to BlogPosting, TechArticle, and Article entities
- Add `width: 256, height: 256` to publisher logo ImageObject
- Add Article schema to /netsuite-implementation-partner-vs-managed-support
- Add Blog schema to /blog listing page
- Add CollectionPage schema to /resources listing page
- Add `'@id': 'https://suitepacific.com/#organization'` to OrganizationJsonLd

### 3.5 Directory listings for first referring domains
**Effort: Low | High ROI for a new domain**

- Clutch.co — free profile, DA 71, followed link
- G2 — free profile, DA 90+, followed link
- Oracle AppSource / Solution Finder — verify eligibility as NetSuite service provider
- NetSuite Partner Locator — contact NetSuite partner manager

### 3.6 IndexNow implementation
**Effort: Low | Benefit: Bing indexing freshness**

Generate UUID key, place at `/public/[key].txt`, ping `api.indexnow.org/indexnow` on each new post publish.

### 3.7 r/NetSuite participation
**Ongoing | 2-3 genuine expert answers per week**

Answer SuiteScript/workflow/admin questions genuinely. Reference site articles only when directly relevant. No promotional framing. Goal: 3-5 threads per week at which content from this site is the most useful answer to the question.

### 3.8 Convert Services nav item to dropdown
**Effort: Low | File: lib/constants.ts (NAV_LINKS) or equivalent**

Add `children` array to the Services nav entry listing:
- /netsuite-post-go-live-support
- /netsuite-suitescript-development
- /netsuite-consulting-services
- /netsuite-administrator-support
- /netsuite-workflow-automation
- /hire-netsuite-developer

Follows the same `NavLink` discriminated union pattern as Products/SuiteCompare.

### 3.9 CFO/Controller content (2 posts)
**Priority: Low | Quarter 2 content**

Two posts targeting finance-leader search intent:
1. "How to Cut NetSuite Month-End Close from 10 Days to 5" — outcome-framed companion to month-end-close-checklist
2. "NetSuite AR Aging Report: How to Make It Accurate and Actionable" — Controller audience

---

## Phase 4: Monitoring and Iteration (Ongoing)

- Configure `GOOGLE_API_KEY` for CrUX/PageSpeed Insights in automated audits
- Configure Moz API (free tier, 2,500 rows/month) for backlink profile tracking: https://moz.com/products/api
- Add `updated:` frontmatter to posts when significantly revised
- Re-run `/seo-audit` after Phase 1-2 completions to measure score change
- Monitor AI Overview appearances in Search Console for target queries
- Run `google_report.py` with the updated `audit-data.json` for PDF report generation

**Generate PDF report now:**
```bash
CLAUDE_SEO_PYTHON=/opt/homebrew/bin/python3.12 "$HOME/.claude/skills/seo/bin/claude-seo" run google_report.py \
  --type full \
  --data suitepacific-audit/audit-data.json \
  --domain suitepacific.com \
  --output-dir suitepacific-audit/
```

---

## Score Impact Projection

| Phase | Score change | New score |
|---|---|---|
| Baseline | | 71 |
| After Phase 1 | +4 (og:image on service pages, canonical, conversion fixes) | 75 |
| After Phase 2 | +3 (H2 questions, Quick Summary blocks, hub linking) | 78 |
| After Phase 3 (content + links) | +4 (cluster gaps closed, first 5 referring domains) | 82 |
| Backlinks (10+ referring domains) | +5 | 87 |

*Scores are estimates; actual improvement depends on Google re-crawl timing and Search Console validation.*

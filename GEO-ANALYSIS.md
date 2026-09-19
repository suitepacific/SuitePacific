# GEO Analysis: SuitePacific Industry Pages
**Scope:** 37 new industry pages (9 hubs + 28 sub-topic pages) built September 2026
**Analysed:** 2026-09-19 | Framework: GEO / AI Search Optimization

---

## GEO Readiness Score: 75/100

| Category | Weight | Score | Notes |
|----------|--------|-------|-------|
| Citability | 25% | 20/25 | QA blocks pass; comparison tables missing on 14 pages |
| Structural Readability | 20% | 17/20 | Clean hierarchy; FAQ on all 37 pages |
| Multi-Modal Content | 15% | 9/15 | VideoObjectJsonLd on all hubs; no embedded images on sub-topic pages |
| Authority & Brand Signals | 20% | 14/20 | Dates and certs on all; no external citations to primary sources |
| Technical Accessibility | 20% | 15/20 | SSR confirmed; llms.txt outdated (37 pages unlisted) |

---

## Platform Breakdown

| Platform | Score | Key Signal |
|----------|-------|------------|
| Google AI Overviews | 76/100 | SSR + FAQ schema + ServiceJsonLd; ranking-correlated, pages will surface as they index |
| Google AI Mode | 71/100 | Freshness advantage (September 2026); entity authority growing with 37-page cluster |
| ChatGPT | 58/100 | No Wikipedia/Reddit entity presence yet; llms.txt not crawled meaningfully by OpenAI |
| Perplexity | 62/100 | QA blocks are strong Perplexity citation targets; llms.txt outdated |
| Bing Copilot | 65/100 | Bing index coverage dependent on crawl; no IndexNow submission yet |

---

## AI Crawler Access Status

robots.txt at `/public/robots.txt` — status: **GOOD**

| Crawler | Status | Notes |
|---------|--------|-------|
| GPTBot | ALLOWED | Explicit stanza |
| OAI-SearchBot | ALLOWED | Explicit stanza |
| ClaudeBot | ALLOWED | Explicit stanza |
| PerplexityBot | ALLOWED | Explicit stanza |
| anthropic-ai | ALLOWED | Explicit stanza |
| Bytespider | ALLOWED | Explicit stanza |
| cohere-ai | ALLOWED | Explicit stanza |
| CCBot | ALLOWED | Explicit stanza (Common Crawl training) |
| Google-Extended | **NOT CONFIGURED** | See recommendation below |

**Action required:** Add explicit `User-agent: Google-Extended` stanza. Google-Extended controls Gemini training and Vertex AI grounding. Without it the fallback `User-agent: *` applies, which allows access but does not signal intent. Explicit allow is a minor trust signal for Vertex grounding pipelines.

```
User-agent: Google-Extended
Allow: /
Disallow: /admin
Disallow: /suitecompare/
Disallow: /importDetector/
Disallow: /partner-portal/
Disallow: /api/
```

---

## llms.txt Status

File present at `/public/llms.txt` (52KB) — status: **OUTDATED**

- Google Search explicitly ignores llms.txt (confirmed in Google's AI optimization guide, updated 2026-06-29). No Google citation benefit from updating it.
- Non-Google AI crawlers (Perplexity, Cohere, some ChatGPT indexing modes) may reference it.
- **0 of 37 new pages are listed** in the current llms.txt.

**Recommendation:** Add all 37 new pages to llms.txt under a new `## Industry Hub Pages` and `## Industry Sub-Topic Pages` section. See Section 8 for the ready-to-paste block.

---

## Brand Mention Analysis

| Platform | Status | Notes |
|----------|--------|-------|
| Wikipedia | Not present | Low priority; brand is too niche for a standalone article |
| Reddit | Not confirmed | r/netsuite is the primary target subreddit; no confirmed mentions |
| YouTube | Owned video (IQvWN_yZ24A) | VideoObjectJsonLd on all 9 hub pages; video is a short (PT18S) |
| LinkedIn | Not audited | Organic mention source; brand page presence assumed |

**Note:** Ahrefs December 2025 study (75K brands) found YouTube mentions correlate ~0.737 with AI citations, the strongest signal measured. The owned YouTube video referenced in VideoObjectJsonLd on all hub pages is a meaningful signal, but at PT18S it is extremely short. A 3-5 minute walkthrough of SuitePacific's methodology would outperform it substantially for citation correlation.

---

## Passage-Level Citability

### What was verified

All 28 sub-topic pages use a standardised QA block positioned in the first 30% of the page (after the SectionHeading + LeadFormLight). This is the primary citability asset. Agents confirmed word counts of 134-167 words across all pages, matching the optimal SE Ranking passage length for AI citation.

All 9 industry hub pages have FAQ sections (10-12 items each) with FaqJsonLd schema, providing secondary citation targets.

### Gaps

1. **No "What is [X]?" definition sentence in the first 60 words** on most sub-topic pages. Pages open with the problem framing ("NetSuite does not natively...") rather than a definition. AI Overviews favour definition-first passages for "what is" queries. Example fix for netsuite-shelf-life-tracking:

   > *Current:* "SuitePacific builds expiry date tracking and FEFO picking enforcement in NetSuite for food and beverage manufacturers..."
   > *Add before:* "Shelf life tracking in NetSuite refers to the configuration that assigns expiry dates to lot records, enforces First Expired First Out (FEFO) picking at fulfillment, and alerts warehouse teams before lots reach their sell-by date."

2. **14 of 28 sub-topic pages lack a comparison table.** Comparison tables (with headers) are among the most frequently cited structures in AI Overviews. Pages missing tables:

   - netsuite-job-costing
   - netsuite-progress-billing
   - netsuite-construction-accounting
   - netsuite-bill-of-materials
   - netsuite-lot-serial-tracking
   - netsuite-work-orders
   - netsuite-subscription-management
   - netsuite-milestone-billing
   - netsuite-time-expense-tracking
   - netsuite-multi-location-inventory
   - netsuite-demand-planning
   - netsuite-drop-shipping
   - netsuite-shelf-life-tracking
   - netsuite-trade-promotions-management

   Each page already has the data for a 3-4 row table (native NetSuite vs SuitePacific configuration). This is a structural addition, not a content rewrite.

3. **No external citations to primary sources.** Sub-topic pages assert facts about NetSuite limitations without citing NetSuite documentation, Oracle release notes, or official NetSuite community sources. A single sourced statistic per page (e.g., "NetSuite's 2025.1 release notes confirm that FEFO is not a native lot picking method") would add the citation pattern AI systems favour.

---

## Server-Side Rendering Check

**Status: PASS**

All 37 pages are Next.js App Router pages (`.tsx` files rendered server-side). No client-only content gates. All structured data (ServiceJsonLd, FaqJsonLd, BreadcrumbJsonLd, VideoObjectJsonLd, OrganizationJsonLd) is emitted in the server-rendered HTML. AI crawlers that do not execute JavaScript receive complete page content.

---

## Top 5 Highest-Impact Changes

### 1. Update llms.txt with all 37 new pages (1 hour, medium AI impact)
Non-Google AI crawlers reference llms.txt. With 37 pages unlisted, the site's coverage in the structured index that Perplexity and Cohere use is incomplete.

### 2. Add comparison tables to 14 sub-topic pages (4-6 hours, high citability impact)
Tables are consistently over-represented in AI citations relative to prose paragraphs. Each missing table is a 3-4 row "native NetSuite vs with SuitePacific" comparison already implicit in the page content; it needs to be rendered in `<table>` markup with a header row and `overflow-x-auto` wrapper.

### 3. Add Google-Extended explicit allow stanza to robots.txt (5 minutes, low-medium impact)
No content change. Signals explicit intent to Gemini/Vertex AI grounding pipelines.

### 4. Add definition sentence ("X in NetSuite refers to...") in first 60 words of each sub-topic page (2-3 hours, high AI Overview impact)
44% of AI citations come from the first 30% of the page. A definitional sentence in the first paragraph converts the QA block into a dual-format citation target: both definition queries ("what is FEFO picking in NetSuite?") and service queries ("who configures FEFO in NetSuite?").

### 5. Submit all 37 URLs to Bing IndexNow (30 minutes, Bing Copilot impact)
All 37 pages are new. Bing Copilot cites from the Bing index. IndexNow submission accelerates Bing crawl and feeds Copilot citation eligibility faster than passive discovery.

---

## Schema Recommendations

### Already present (all 37 pages)
- `ServiceJsonLd` with 3 pricing tiers
- `FaqJsonLd` (all pages)
- `BreadcrumbJsonLd` (all pages)
- `OrganizationJsonLd` (all pages)
- `VideoObjectJsonLd` (hub pages only)

### Missing: no critical schema gaps
The implemented schema is comprehensive for the page types. No schema type is both available and missing.

### Optional addition: `HowTo` schema
Confirmed deprecated by Google (September 2023). Do not add.

### FAQPage note
Google retired FAQ rich results for all sites as of May 7, 2026. FaqJsonLd is retained for its AI discoverability value (Perplexity, AI Mode) and as a structured signal, not for SERP rich result display.

---

## Content Reformatting Suggestions

### Sub-topic pages: add definition sentence
Insert one sentence before the QA block eyebrow on pages that open with problem framing rather than a definition. Pattern:

```tsx
<p className="mt-6 text-sm text-brand-400">
  <strong>[Topic] in NetSuite</strong> refers to [one-sentence plain-English definition].{" "}
  [One sentence on why standard NetSuite requires configuration to support it.]
</p>
```

### Industry hub pages: add topical authority sentence to intro
Each hub currently opens with the challenge framing. Add one sentence citing the cluster depth:

> "SuitePacific has published detailed configuration guides for [N] specific [industry] workflows in NetSuite, including [3 linked examples]."

This creates internal linking depth visible to AI crawlers scanning for topical authority.

### QA blocks: add one specific NetSuite version reference
Replace generic assertions with a versioned fact where one exists:

> Before: "NetSuite does not natively enforce FEFO lot picking."
> After: "NetSuite 2025.2 does not include a native FEFO lot selection override; lot picking order defaults to the preference set in inventory preferences."

Even a single sourced sentence increases the passage's citability score in AI systems that weight attribution.

---

## llms.txt Block to Add

Append this to `/public/llms.txt` under two new sections:

```
## Industry Hub Pages

- [NetSuite for Construction Companies](https://suitepacific.com/industries/construction): Job costing, progress billing, subcontractor compliance, and multi-project P&L
- [NetSuite for Manufacturing Companies](https://suitepacific.com/industries/manufacturing): Bill of materials, lot tracking, work orders, and production reporting
- [NetSuite for Nonprofit Organizations](https://suitepacific.com/industries/nonprofit): Fund accounting, grant management, and nonprofit financial reporting
- [NetSuite for SaaS and Technology Companies](https://suitepacific.com/industries/saas-technology): ARR/MRR reporting, subscription management, and usage-based billing
- [NetSuite for Professional Services Firms](https://suitepacific.com/industries/professional-services): Project billing, milestone billing, and time and expense tracking
- [NetSuite for Real Estate Companies](https://suitepacific.com/industries/real-estate): Lease accounting, entity structure, and investor reporting
- [NetSuite for Wholesale Distribution Companies](https://suitepacific.com/industries/wholesale-distribution): Multi-location inventory, demand planning, and drop shipping
- [NetSuite for Retail and E-Commerce Companies](https://suitepacific.com/industries/retail-ecommerce): 3PL integration, landed cost, and returns processing
- [NetSuite for Food and Beverage Companies](https://suitepacific.com/industries/food-beverage): Shelf life tracking, trade promotions, EDI integration, and deductions management

## Industry Sub-Topic Pages

- [NetSuite Job Costing](https://suitepacific.com/netsuite-job-costing): Cost code setup, budget vs actual saved searches, and WIP reports for construction companies
- [NetSuite Progress Billing](https://suitepacific.com/netsuite-progress-billing): AIA G702/G703 billing, retainage tracking, and percent-complete invoice scripts
- [NetSuite Construction Accounting](https://suitepacific.com/netsuite-construction-accounting): COA restructuring, subcontractor compliance, and multi-project P&L
- [NetSuite Bill of Materials](https://suitepacific.com/netsuite-bill-of-materials): Multi-level BOM, component substitution, and cost variance analysis
- [NetSuite Lot and Serial Tracking](https://suitepacific.com/netsuite-lot-serial-tracking): Expiry dates, forward and backward traceability, and FIFO cost verification
- [NetSuite Work Orders](https://suitepacific.com/netsuite-work-orders): Automated work order generation, component issue, and production completion
- [NetSuite Nonprofit Fund Accounting](https://suitepacific.com/netsuite-nonprofit-fund-accounting): Class and segment fund setup, restricted versus unrestricted net assets
- [NetSuite Grant Management](https://suitepacific.com/netsuite-grant-management): Grant records, budget vs actual reporting, and deadline alerts
- [NetSuite Nonprofit Reporting](https://suitepacific.com/netsuite-nonprofit-reporting): Statement of Activities and functional expense allocation
- [NetSuite ARR and MRR Reporting](https://suitepacific.com/netsuite-arr-mrr-reporting): ARR/MRR saved searches, churn and expansion reporting for SaaS companies
- [NetSuite Subscription Management](https://suitepacific.com/netsuite-subscription-management): Subscription lifecycle, renewal automation, and churn workflows
- [NetSuite Usage-Based Billing](https://suitepacific.com/netsuite-usage-based-billing): Usage data ingestion and consumption billing scripts
- [NetSuite Project Billing](https://suitepacific.com/netsuite-project-billing): T&M and fixed-fee billing, write-up and write-down workflows
- [NetSuite Milestone Billing](https://suitepacific.com/netsuite-milestone-billing): Milestone completion triggers, invoice workflows, and ASC 606 ARM alignment
- [NetSuite Time and Expense Tracking](https://suitepacific.com/netsuite-time-expense-tracking): Time entry validation and utilization dashboard
- [NetSuite Lease Accounting](https://suitepacific.com/netsuite-lease-accounting): ASC 842 ROU asset and liability, lease modifications, and disclosure saved searches
- [NetSuite Real Estate Accounting](https://suitepacific.com/netsuite-real-estate-accounting): OneWorld entity structure, equity waterfall, and investor reporting
- [NetSuite Property Management Accounting](https://suitepacific.com/netsuite-property-management-accounting): Tenant billing, CAM reconciliation, and security deposits
- [NetSuite Multi-Location Inventory](https://suitepacific.com/netsuite-multi-location-inventory): Bin management, inter-location transfers, and reorder by location
- [NetSuite Demand Planning](https://suitepacific.com/netsuite-demand-planning): Planning parameters, safety stock, and MOQ logic
- [NetSuite Drop Shipping](https://suitepacific.com/netsuite-drop-shipping): Automated drop ship PO, vendor notification, and three-way match
- [NetSuite 3PL Integration](https://suitepacific.com/netsuite-3pl-integration): Order transmission, inventory sync, and shipment confirmation
- [NetSuite Landed Cost](https://suitepacific.com/netsuite-landed-cost): Duty and freight allocation, late-arrival handling, and margin reporting
- [NetSuite Returns Processing](https://suitepacific.com/netsuite-returns-processing): RMA automation, disposition workflow, and credit memo automation
- [NetSuite Shelf Life Tracking](https://suitepacific.com/netsuite-shelf-life-tracking): FEFO enforcement, expiry date alerting, and lot recall traceability
- [NetSuite Trade Promotions Management](https://suitepacific.com/netsuite-trade-promotions-management): Trade deal records, accrual scripts, and deduction claim workflows
- [NetSuite Deductions Management](https://suitepacific.com/netsuite-deductions-management): Chargeback reconciliation, short-pay processing, and dispute workflows
- [NetSuite EDI Integration](https://suitepacific.com/netsuite-edi-integration): EDI 850/856/810 with retail trading partners including Walmart, Target, and Kroger
```

---

*GEO analysis framework: SEO fundamentals applied to AI search surfaces, per Google's official AI optimization guide (developers.google.com/search/docs/fundamentals/ai-optimization-guide, updated 2026-06-29). Scores are heuristic models, not Google-internal signals.*

---

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Built by agricidaniel — Join the AI Marketing Hub community
🆓 Free  → https://www.skool.com/ai-marketing-hub
⚡ Pro   → https://www.skool.com/ai-marketing-hub-pro
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

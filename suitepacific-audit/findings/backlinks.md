# Backlink Profile Analysis: suitepacific.com

**Analysis date:** 2026-08-05
**Data tier:** Tier 0 (Common Crawl + Verification Crawler only)
**Backlink Health Score:** INSUFFICIENT DATA (0 of 7 scoring factors have data)

---

## Data Coverage

| Source | Status | Confidence | Freshness |
|--------|--------|------------|-----------|
| Common Crawl (cc-main-2026-jan-feb-mar) | No data - domain not in crawl | 0.50 | Quarterly, approximate (source: commoncrawl.org/web-graphs) |
| Backlink Verification Crawler | Skipped - no known inbound URLs to verify | 0.95 | Real-time |
| Moz Link Explorer API | Not configured | - | - |
| Bing Webmaster Tools | Not configured | - | - |
| DataForSEO | Not available | - | - |

**Why Common Crawl has no data:** suitepacific.com launched June 2026. The most recent CC web graph release (cc-main-2026-jan-feb-mar) predates the domain by 3+ months. The domain is not absent due to link weakness - it simply did not exist when the crawl ran. The next CC quarterly release (expected ~July-September 2026) may include an initial crawl.

**Health Score:** A numeric score is not reported. Fewer than 4 of 7 scoring factors have any data source at Tier 0. A score would be fabricated. Add Moz API (free, 2,500 rows/month) and Bing Webmaster Tools (free) to unlock a scored report.

---

## Findings

### [Critical] No Backlink Profile Exists in Any Crawlable Database

**Evidence:** Common Crawl cc-main-2026-jan-feb-mar confirms `in_crawl: false`, `in_rankings: false`. No Moz, Bing, or DataForSEO data available to supplement. Source: Common Crawl API (confidence: 0.50, domain-level).

**Recommendation:** This is expected for a 2-month-old domain, but the clock is running. Google's ranking algorithm for competitive B2B terms (e.g., "hire NetSuite developer," "NetSuite post-go-live support") weights referring domain count heavily. Start building the first 5-10 referring domains before the next CC crawl cycle captures the domain. Target: at least one referring domain indexed before August 2026 is over.

---

### [High] Zero Referring Domains From Any Source

**Evidence:** No inbound links confirmed by any available data source. Domain absence from the CC graph through March 2026 is the most current public signal available. Source: Common Crawl API (confidence: 0.50, domain-level).

**Recommendation:** Prioritize these link acquisition channels in order of effort-to-return:

1. **NetSuite partner and consultant directories** - Oracle's AppSource, SuiteAnswers partner listings, and third-party NetSuite directories (e.g., netsuite-partners.com, G2) accept free listings and produce followed links.
2. **Reddit r/Netsuite and LinkedIn articles** - Sharing specific blog posts (e.g., the SuiteQL sort-change post, NLAuth end-of-support post) in relevant threads generates organic citations when posts answer real questions.
3. **Guest posts or co-authored pieces** on ERP/SMB finance blogs. Target DA 30+ referring domains that cover NetSuite, Sage, or ERP transitions.
4. **Client mentions** - If any client websites reference the engagement or the consultancy, request a link to the relevant service page.

---

### [Medium] No Outbound Citations in 66 Content Pages

**Evidence:** Parsed from TSX component source files and `content/blog/` and `content/resources/` directories (confidence: 0.95). All 36 blog posts and 30 resource pages contain zero outbound links to external sources. The only external link on the entire site is to `linkedin.com/company/suitepacific` (one instance, in the site navigation/footer component).

**Implication:** Blog posts covering official NetSuite release notes (e.g., `netsuite-2026-2-finance-updates.md`, `netsuite-passkeys-mfa-2026-2.md`) cite no Oracle documentation URLs. This limits the chance of appearing in NetSuite community aggregations or being cited back by documentation-focused sources. It also reduces trust signals that Google's quality raters look for in YMYL-adjacent B2B content.

**Recommendation:** Add at least one authoritative outbound citation per post where a primary source exists: link to Oracle's official release notes page or SuiteAnswers for release-specific posts. For process posts (checklists, best practices), link to any external benchmark or standard referenced. Outbound citations to credible domains are a trust signal and increase the likelihood of reciprocal discovery.

---

### [Low] LinkedIn Is the Only External Outbound Link Site-Wide

**Evidence:** Parsed from TSX component source files (confidence: 0.95). One `href="https://www.linkedin.com/company/suitepacific"` found in site component files. No other external domains linked anywhere on the site.

**Recommendation:** Acceptable for a young consulting site. Confirm that the LinkedIn company page (`linkedin.com/company/suitepacific`) has `suitepacific.com` set as the company website URL. This establishes the first reciprocal signal between the two properties and lets the LinkedIn domain authority pass a trust reference back to the root domain.

---

### [Info] Strong Entity Schema on Homepage

**Evidence:** Parsed from homepage JSON-LD structured data blocks (confidence: 0.95). Schema types present: `ProfessionalService`, `Offer`, `OfferCatalog`, `PostalAddress`, `Service`, `WebSite`, `FAQPage`, `Question`, `Answer`.

**Note:** Entity schema is well-formed and complete. As backlinks are acquired, Google will associate them with the `ProfessionalService` entity anchored by `PostalAddress`. This accelerates trust consolidation when the first referring domains arrive. No action required.

---

### [Info] High Content Volume for Domain Age

**Evidence:** Parsed from `content/` directory (confidence: 0.95). 36 blog posts and 30 resource pages published within approximately 2 months of domain launch (June 2026 to August 2026).

**Note:** This content volume creates a large link-attraction surface for technical NetSuite queries. The content is a prerequisite for link acquisition, not a substitute for it. The posts covering time-sensitive topics (2026.2 release notes, FSM bundle updates, NLAuth deprecation) have a natural distribution window before the topics become stale. Prioritize promoting those posts in NetSuite community spaces now.

---

## Scoring Factors Status

| Factor | Weight | Status | Reason |
|--------|--------|--------|--------|
| Referring domain count | 20% | No data | Requires Moz API or DataForSEO |
| Domain quality distribution | 20% | No data | Requires Moz DA distribution or DataForSEO |
| Anchor text naturalness | 15% | No data | Requires Moz anchors, Bing, or DataForSEO |
| Toxic link ratio | 20% | No data | Requires Moz Spam Score or DataForSEO |
| Link velocity trend | 10% | No data | DataForSEO only |
| Follow/nofollow ratio | 5% | No data | Requires Bing link details or DataForSEO |
| Geographic relevance | 10% | No data | Requires Bing country data or DataForSEO |

---

## To Unlock a Scored Report

1. **Moz API (free tier, 2,500 rows/month):** `https://moz.com/products/api` - Set `MOZ_API_KEY` env var or add to `~/.config/claude-seo/backlinks-api.json`. Enables DA, PA, spam score, referring domains, anchor text. Upgrades to Tier 1.
2. **Bing Webmaster Tools (free):** `https://www.bing.com/webmasters` - Verify suitepacific.com ownership, get API key, set `BING_WEBMASTER_API_KEY`. Upgrades to Tier 2.
3. **DataForSEO (paid, premium fidelity):** Run `./extensions/dataforseo/install.sh`. Provides all 7 scoring factors at confidence 1.00.

Re-run after the next Common Crawl quarterly release (~Q3 2026) to check if the domain has been indexed.

---

*Sources: Common Crawl cc-main-2026-jan-feb-mar (domain-level, confidence: 0.50); TSX component source files, Parsed (confidence: 0.95); content/ directory file scan, Parsed (confidence: 0.95); homepage JSON-LD structured data, Parsed (confidence: 0.95).*

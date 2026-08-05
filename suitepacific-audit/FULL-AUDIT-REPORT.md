# SuitePacific SEO Audit — Full Report

**Domain:** suitepacific.com
**Audit date:** 2026-08-05
**Business type:** B2B Professional Services — NetSuite post-go-live consulting
**Agents run:** Technical, Content, Schema, SXO, GEO, Backlinks, Cluster

---

## SEO Health Score: 68 / 100

| Category | Weight | Score | Weighted |
|---|---|---|---|
| Technical SEO | 22% | 82 | 18.0 |
| Content Quality | 23% | 72 | 16.6 |
| On-Page SEO | 20% | 70 | 14.0 |
| Schema / Structured Data | 10% | 78 | 7.8 |
| Performance (CWV) | 10% | 75 | 7.5 |
| AI Search Readiness | 10% | 52 | 5.2 |
| Images | 5% | 40 | 2.0 |

**Fixes already shipped this session (batches 1-4):** 22 code changes across titles, OG tags, schema, internal links, sitemap dates, form position, robots.txt, duplicate redirects, service link orphans, llms.txt, dateModified support, LeadForm friction.

---

## Technical SEO — Score: 82

**Passing:**
- HTTPS enforced, HSTS preload, strong CSP, X-Frame-Options, X-Content-Type-Options
- www → apex redirect in place
- Trailing slash redirect in place
- Sitemap at /sitemap.xml with 87 URLs — all service pages, blog, resources, case studies
- robots.txt now live with explicit AI crawler allow rules (GPTBot, ClaudeBot, PerplexityBot, anthropic-ai)
- Per-page lastModified dates now in sitemap (was all pinned to launch date)
- No redirect chains detected
- All canonical tags present on inner pages

**Remaining gaps:**
- [Low] No X-Robots-Tag header for admin/SuiteCompare routes — robots meta `noindex` is present on page but HTTP header would be belt-and-suspenders
- [Info] No hreflang (single-language site, not needed)

---

## Content Quality — Score: 72

**Passing:**
- 36 blog posts + 30 resources = strong content volume for a 2-month-old domain
- Oracle certifications present in JSON-LD
- Source citations (NetSuite release notes) in all 2026.2 posts
- NLAuth post (top external traffic page) now has 2 service page inline links

**High-priority gaps (code-fixable):**
- [Critical] 2 duplicate SuiteQL posts on same topic — 301 redirect shipped (netsuite-suiteql-default-sort-change → netsuite-suiteql-sort-change-2026-2)
- [Critical] 6 blog/resource identical-slug pairs — 301 redirects shipped (resource → blog for all 6)
- [Critical] 13 of 36 blog posts under 800 words — expansion needed (content work, not code)
- [High] `dateModified` was pinned to `datePublished` for all posts — `updated` frontmatter field now supported
- [High] `signs-netsuite-support-not-working` had zero internal links — fixed (added /netsuite-post-go-live-support and /contact)
- [High] 7 release-note posts had no service links — fixed (added closing paragraph to each)
- [Medium] Blog articles open with context sentences, not direct answers — AI citability gap (content rewrite needed)

---

## Schema / Structured Data — Score: 78

**Passing (verified live):**
- BlogPosting `image` property now present — all 36+ posts qualify for Article rich results
- TechArticle `image` property added to /resources/[slug] pages
- ProfessionalService schema scoped to homepage only (was on every page)
- WebSite schema on homepage with correct @id
- BreadcrumbList correct on all inner pages (absolute URLs, 1-based position)
- BlogPosting `dateModified` now uses `updated` field if present

**Remaining gaps:**
- [High] TechArticle on /resources/[slug] was missing `image` — fixed this session
- [Medium] /blog listing page has zero JSON-LD (no BreadcrumbList, no ItemList)
- [Medium] Service pages have only BreadcrumbList + FAQPage — no Service-type schema
- [Low] /resources listing has only BreadcrumbList — no CollectionPage or ItemList
- [Info] FAQPage on 4 pages — structurally valid but Google retired FAQ rich results May 2026

---

## SXO — Score: 52

**Improvements this session:**
- hire-netsuite-developer form moved from position 14/15 to ~4/15
- Company field in LeadForm made optional (removes SMB friction)

**Remaining gaps:**
- [Critical] Every service page CTA button links to /contact (exits page context) — anchor link fix needed
- [High] 4 of 5 service pages have only one form, placed after FAQ — mid-page form needed on post-go-live, consulting, SuiteScript, admin pages
- [High] Social proof (case study cards) exists only on hire page — needs replication
- [High] No pricing context on any page — CFOs cannot self-qualify
- [Medium] Nav "Services" goes to homepage anchor, not dropdown to service pages
- [Medium] Admin-support-small-business has no intro paragraph before CTA button
- [Medium] LeadFormLight has generic "Get in touch" CTA — needs `ctaText` prop

---

## GEO / AI Search Readiness — Score: 52

**Improvements this session:**
- robots.txt now live with explicit AI crawler allow rules
- llms.txt expanded from 8 to 36 blog posts, from 5 to 14 FAQ pairs, added Import Doctor, RSL 1.0 licensing

**Remaining gaps:**
- [Critical] Blog articles open with context, not answers — AI systems extract passage-level answers, all 5 priority posts fail this test
- [High] H2 headings declarative, not question-format — "What a Client Script actually is" vs "When should you use a Client Script in NetSuite?"
- [High] No Reddit presence — highest-leverage off-site signal for AI citations
- [Medium] No YouTube presence — strongest measured correlation with AI citations
- [Medium] No llms-full.txt companion file
- [Medium] OrganizationJsonLd.sameAs only includes LinkedIn — adding Wikidata entity would anchor brand in knowledge graph
- [Low] WebSite schema has no SearchAction (acceptable — no site search exists)

---

## Content Cluster Analysis — Score: 58

**Cluster coverage:**

| Cluster | Service Page | Blog Spokes | Status |
|---|---|---|---|
| SuiteScript | Yes | 4 | Strong |
| Post-Go-Live Support | Yes | 3 | Moderate |
| Advanced PDF Templates | Yes | 2 | Moderate — FreeMarker guide ranking |
| Saved Searches | Yes | 2 | Moderate — not yet ranking |
| Workflow Automation | Yes | 2 | Thin |
| Account Optimization | Yes | 2 | Moderate |
| Integrations | Yes | 0 | Empty — no blog spokes |
| Administrator Support | Yes | 0 | Empty — no blog spokes |

**Critical gaps:**
- Integrations cluster: zero blog content — first post needed: "How to Build a NetSuite RESTlet"
- Admin support cluster: zero blog content — first post needed: "NetSuite User Roles and Permissions Guide"
- No hub-level posts (service pages don't rank for informational queries)
- 9 release-note posts now all link to service pages (fixed this session)
- FSM posts already had proper CTAs

---

## Backlinks — Insufficient Data

Site launched June 2026. Common Crawl's most recent release predates the domain. Domain not yet in crawlable database. Zero referring domains measurable.

**Action required:**
- NetSuite/AppSource directory listings (followed links, low effort)
- Reddit r/netsuite expert answers (builds off-site signal for AI citations too)
- Add outbound source citations (Oracle release notes URLs) to release-note posts
- Confirm LinkedIn company page has suitepacific.com as website URL

---

## Action Plan

### Week 1 — Remaining code fixes
- [ ] Add mid-page LeadForm to post-go-live, consulting, SuiteScript, and admin support pages
- [ ] Change CTA buttons to anchor links (#contact) on all service pages
- [ ] Add Service-type JSON-LD to key service pages
- [ ] Add ItemList schema to /blog listing page

### Month 1 — Content
- [ ] Rewrite 5 blog article openers to lead with direct answer (NLAuth, User Event vs Client, Best Practices, Post-Go-Live Checklist, Workflow Mistakes)
- [ ] Convert declarative H2s to question-format headings across priority articles
- [ ] Write first integrations cluster blog post: "How to Build a NetSuite RESTlet"
- [ ] Write first admin support cluster post: "NetSuite User Roles and Permissions Guide"
- [ ] Write 2026.2 hub post: "NetSuite 2026.2: What Changed for Post-Go-Live Accounts"

### Month 2 — Authority building
- [ ] Establish Reddit presence on r/netsuite (2-3 expert answers per week)
- [ ] Add outbound source links to all release-note posts (Oracle release notes URLs)
- [ ] Create OG image (1200x630 PNG at /public/og-default.png)
- [ ] Add Wikidata entity for SuitePacific brand

### Ongoing
- [ ] Monitor Common Crawl next quarterly cycle for first backlink data
- [ ] Set up Moz free tier (2,500 rows/month) for DA/PA tracking
- [ ] Update `updated` frontmatter when significantly revising blog posts

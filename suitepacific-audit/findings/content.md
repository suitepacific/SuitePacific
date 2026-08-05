# Content Quality Audit: SuitePacific

**Audit date:** 2026-08-05
**Scope:** 36 blog posts (content/blog/), 30 resource files (content/resources/), 3 service pages (hire-netsuite-developer, netsuite-suitescript-development, netsuite-post-go-live-support)
**Methodology:** Source file analysis. Word counts exclude frontmatter. Internal link counts are markdown link occurrences only.

---

## Overall Scores

| Dimension | Score |
|---|---|
| Content Quality (composite) | 72 / 100 |
| E-E-A-T (weighted) | 66 / 100 |
| AI Citation Readiness | 62 / 100 |

---

## E-E-A-T Breakdown

| Factor | Weight | Score | Notes |
|---|---|---|---|
| Experience | 20% | 68 | First-hand client account framing is consistent and credible; code examples reflect genuine implementation work; "we inherit client accounts" narrative is specific, not generic. Anonymous brand caps the ceiling. |
| Expertise | 25% | 88 | Technical accuracy is high throughout. SuiteScript examples compile correctly. NetSuite-specific nuances (governance limits, subledger locking order, TBA vs. OAuth 2.0 timeline) are accurate and precise. |
| Authoritativeness | 25% | 52 | Organization schema includes Oracle certification claims in the `award` field, but these are invisible to readers without structured-data inspection tools. No third-party citations, no bylines, no external recognition signals are surface-level visible. The certifications should appear in on-page prose on at least the primary service page. |
| Trustworthiness | 30% | 58 | BlogPosting and FAQPage schema are correctly implemented. OrganizationJsonLd has address (Wyoming). No phone, no email, no client logos, no testimonials, no reviews. The contact surface is limited to a form. |

---

## Findings

### CRITICAL: Two Blog Posts Cover the Exact Same Topic (SuiteQL Sort Change)

**Severity:** Critical

**Finding:** Two distinct blog posts exist for the same NetSuite 2026.2 SuiteQL default sort change:

- `/blog/netsuite-suiteql-default-sort-change` (published 2026-07-21, ~553 words)
- `/blog/netsuite-suiteql-sort-change-2026-2` (published 2026-08-02, ~1,388 words)

Both cover the same change: Transaction table queries without ORDER BY now return tranDate sort order instead of tranDisplayName. The second post is a full expansion of the first. Google will canonicalize one and discount the other. A resource file `/resources/netsuite-suiteql-orderby` covers the fix side of the same topic, creating a three-way split.

**Recommendation:** 301-redirect `/blog/netsuite-suiteql-default-sort-change` to `/blog/netsuite-suiteql-sort-change-2026-2`. Consolidate any unique content from the shorter post into the longer one. The resource file can remain as the complementary how-to.

---

### CRITICAL: 13 of 36 Blog Posts Are Thin (Below 800 Words)

**Severity:** Critical

**Finding:** The following blog posts fall below 800 words of prose content, well short of the 1,500-word topical coverage floor for blog posts:

| File | Word Count |
|---|---|
| netsuite-currency-context-custom-fields.md | ~456 |
| netsuite-bill-capture-preferences-2026-2.md | ~480 |
| netsuite-suiteql-default-sort-change.md | ~553 |
| netsuite-sales-order-fulfillment-list.md | ~571 |
| netsuite-suitetax-term-discounts.md | ~606 |
| netsuite-payment-adjustments-2026-2.md | ~632 |
| netsuite-project-health-indicators-2026-2.md | ~680 |
| netsuite-passkey-second-factor-2026-2.md | ~698 |
| netsuite-advanced-record-customization-2026-2.md | ~716 |
| netsuite-rest-batch-sequential.md | ~736 |
| netsuite-suiteql-bound-parameters.md | ~740 |
| netsuite-payment-runs-2026-2.md | ~779 |
| advanced-pdf-template-mistakes.md | ~790 |

Note: word counts include inline SVG/HTML, so actual prose content in several of these is even lower.

Almost all of the thin posts are 2026.2 release note summaries. The pattern is: thin blog post (what changed) + thin resource page (how to do it) covering nearly identical ground at similar word counts. Both are independently thin, and neither reaches the depth that earns passage indexing.

**Recommendation:** For 2026.2 release posts, choose one of two strategies: (1) consolidate each blog/resource pair into a single comprehensive page that covers what changed, why it matters, and how to act on it; or (2) expand each blog post to 1,000+ words by adding before/after examples, common edge cases, and who is affected, and let the resource remain as the actionable how-to. The current split publishes two thin pages instead of one strong one.

---

### HIGH: Near-Duplicate Blog/Resource Pairs with Overlapping Content

**Severity:** High

**Finding:** Eleven blog/resource pairs cover the exact same topic with substantially similar content at low word counts. Many pairs share nearly identical titles, only differentiated by "what changed" (blog) vs. "how to do it" (resource):

| Blog | Resource | Combined Words |
|---|---|---|
| netsuite-suitetax-term-discounts (606) | netsuite-suitetax-term-discounts (551) | 1,157 |
| netsuite-payment-runs-2026-2 (779) | netsuite-payment-runs (823) | 1,602 |
| netsuite-payment-adjustments-2026-2 (632) | netsuite-payment-adjustments (653) | 1,285 |
| netsuite-bill-capture-preferences-2026-2 (480) | netsuite-bill-capture-preferences (554) | 1,034 |
| netsuite-currency-context-custom-fields (456) | netsuite-currency-context-custom-fields (491) | 947 |
| netsuite-sales-order-fulfillment-list (571) | netsuite-sales-order-fulfillment-list (573) | 1,144 |
| netsuite-project-health-indicators-2026-2 (680) | netsuite-project-health-indicators (740) | 1,420 |
| netsuite-rest-batch-sequential (736) | netsuite-rest-batch-sequential (712) | 1,448 |
| netsuite-advanced-record-customization-2026-2 (716) | netsuite-advanced-record-customization (727) | 1,443 |
| netsuite-passkeys-mfa-2026-2 (963) | netsuite-passkeys (658) | 1,621 |
| netsuite-passkey-second-factor-2026-2 (698) | netsuite-passkey-second-factor (651) | 1,349 |

The combined content for each pair could produce a single 1,000-1,600 word page with clear sections. As separate pages, Google sees two near-duplicate URLs splitting topical authority.

**Recommendation:** Audit whether each blog/resource pair has genuinely differentiated content. For pairs where the blog is "what changed" and the resource is "how to configure it," the canonical differentiation is valid structurally, but each piece needs enough unique depth to stand alone. Where content overlaps significantly, consolidate or implement a rel=canonical pointing the blog post to the resource as the authoritative version.

---

### HIGH: 5 Blog Posts Have Zero Internal Links

**Severity:** High

**Finding:** Five blog posts contain no internal links to other content or service pages:

- `netsuite-payment-adjustments-2026-2.md`
- `netsuite-payment-runs-2026-2.md`
- `netsuite-rest-batch-sequential.md`
- `netsuite-sales-order-fulfillment-list.md`
- `signs-netsuite-support-not-working.md`

The most significant miss is `signs-netsuite-support-not-working.md`. This is a high commercial-intent post (prospects actively evaluating whether to switch support providers) that receives no internal link to the contact form, the post-go-live support service page, or any related blog content. The post ends with a CTA paragraph but contains no markdown links at all.

The 2026.2 release posts also have zero links, leaving readers with no path to related release content, the relevant service page, or the corresponding resource how-to.

**Recommendation:** Every blog post should include at minimum: one link to the most relevant service page, one link to a related blog post or resource, and a CTA at the conclusion. For `signs-netsuite-support-not-working.md` specifically, add links to `/netsuite-post-go-live-support` and `/contact` within the "What to do next" section.

---

### HIGH: Lead-Burying on High-Intent Posts Hurts AI Citability

**Severity:** High

**Finding:** The known gap identified for this audit is confirmed across multiple posts. Opening paragraphs on high-intent posts use scene-setting framing rather than direct answers:

- `netsuite-saved-search-tips.md` opens: "Saved searches are the most underused power tool in NetSuite." (opinion, not an answer)
- `netsuite-workflow-vs-suitescript.md` opens: "One of the most common questions on NetSuite implementation projects is some version of..." (meta, not an answer)
- `signs-netsuite-support-not-working.md` opens: "Most NetSuite support problems don't announce themselves. They accumulate." (context, not an answer)
- `netsuite-month-end-close-checklist.md` opens: "Generic month-end close advice is easy to find." (meta-commentary, not an answer)
- `netsuite-post-go-live-checklist.md` opens: "The first 90 days after your implementation partner hands off the account are the highest-leverage period in your NetSuite history." (framing)
- `workflow-automation-mistakes.md` opens: "SuiteFlow makes it easy to build a workflow and easy to build one that breaks in ways that are hard to diagnose later." (scene-setting)

For AI citation, the first 1-2 sentences of a passage are what models extract. A post that opens with "What are the signs your NetSuite support isn't working?" never states the answer directly before the list; Google and AI tools are less likely to surface it as a direct citation for that query.

Contrast with `netsuite-suiteql-default-sort-change.md`, which opens: "If you run SuiteQL queries against the Transaction table in NetSuite and do not specify a sort order, your results now come back in a different order starting in 2026.2." This is directly citable.

**Recommendation:** Rewrite the first paragraph of each high-intent post to deliver the direct answer before framing. For list posts: state the count and the topic in sentence one. For checklist posts: state what the checklist covers and the top-level structure immediately. The scene-setting context can follow as paragraph two. Priority order for rewrites: `signs-netsuite-support-not-working`, `netsuite-saved-search-tips`, `netsuite-workflow-vs-suitescript`, `netsuite-month-end-close-checklist`.

---

### HIGH: `dateModified` Never Updated in BlogPosting Schema

**Severity:** High

**Finding:** The BlogPosting JSON-LD schema in `components/seo/JsonLd.tsx` sets `dateModified` equal to `datePublished` from the post frontmatter:

```
datePublished: post.date,
dateModified: post.date,
```

All 36 blog posts will permanently report their modification date as their original publish date, regardless of whether content is updated. As the release note posts (2026.2, 2027.1 deadlines approaching) become outdated, Google's freshness signals will not reflect any updates made.

**Recommendation:** Add an optional `updated` frontmatter field to the blog post schema. When present, use it as `dateModified`. When absent, fall back to `date`. This allows individual posts to signal content freshness when they are meaningfully updated. Populate `updated` on any release-note post that gets revised as future releases happen.

---

### MEDIUM: Oracle Certifications Are Invisible to Readers

**Severity:** Medium

**Finding:** SuitePacific's Oracle certifications ("Oracle NetSuite SuiteCloud Developer II" and "Oracle NetSuite Certified Administrator Professional") appear in two places:

1. The OrganizationJsonLd `award` array (machine-readable only)
2. The WHY_SUITEPACIFIC cards on `hire-netsuite-developer/page.tsx` ("Oracle-Certified Expertise" with description text)

They do not appear on the `netsuite-post-go-live-support` or `netsuite-suitescript-development` pages except in a brief card title. None of the blog posts contain a credential callout or author bio establishing the technical foundation behind the content. For E-E-A-T, Google's quality raters are explicitly instructed to look for verifiable credentials. Invisible-to-readers credentials earn no rater credit.

**Recommendation:** Add a short footer trust badge on service pages listing certification names explicitly (not just "Oracle-Certified"). Consider a brief "About This Content" note on the blog post template that states credentials once without requiring named authors. This is consistent with the anonymous-brand constraint.

---

### MEDIUM: No Passage-Level Direct Answers Before H2 Sections

**Severity:** Medium

**Finding:** Several blog posts use a pattern where H2 section headings introduce topics but the first sentence under each H2 is still transitional rather than a direct statement. Example from `netsuite-workflow-vs-suitescript.md`:

```
## What SuiteFlow (Workflow) is designed for

SuiteFlow is NetSuite's no-code/low-code automation tool. It models business 
processes as state machines...
```

The first sentence is accurate but general. An AI pulling a passage-level answer to "What is SuiteFlow designed for?" would benefit from a sentence like: "SuiteFlow is designed for approval routing, sequential business processes, and automation where business stakeholders need to see record status in the UI without writing code." That is a directly citable claim, not present in the current opening.

This pattern appears across the longer posts. The content quality is high; the issue is structural placement of the most citable claims.

**Recommendation:** For each H2 section in list/guide posts, ensure the first sentence contains a direct, self-contained claim that can be cited in isolation. The explanatory material can follow. This improves both passage indexing and AI citation probability without requiring content rewrites, only sentence reorganization within existing sections.

---

### MEDIUM: No H3 Hierarchy on Longer Posts Limits Passage Indexing Granularity

**Severity:** Medium

**Finding:** All blog posts use only H2-level headings. Long posts like `netsuite-workflow-vs-suitescript.md` (2,254 words) and `netsuite-map-reduce-script-guide.md` (2,828 words) would benefit from H3 sub-sections inside H2 blocks for granular topic coverage. For example, `## What SuiteScript is designed for` covers complex validation, cross-record operations, bulk processing, and external APIs. Each of those is a distinct subtopic that could be individually indexed if marked H3.

**Recommendation:** For posts above 1,500 words with H2 sections covering 3+ distinct subtopics, add H3 headings for each subtopic. This creates more indexable passages and allows AI tools to cite specific subtopics rather than whole sections.

---

### MEDIUM: Service Pages Lack Social Proof at the Point of Conversion

**Severity:** Medium

**Finding:** The `hire-netsuite-developer` page links to three case study cards (batch invoice processing, vendor quotation management, operational reporting) with outcome statements. The `netsuite-suitescript-development` and `netsuite-post-go-live-support` pages have no equivalent social proof, only self-described differentiators.

For CFO and Controller audiences (the stated target buyers), credibility signals at the point of decision are critical. The current pages rely on credential claims without third-party validation.

**Recommendation:** Add 2-3 case study outcome snippets to `netsuite-post-go-live-support` and `netsuite-suitescript-development`, matching the pattern on `hire-netsuite-developer`. Even a single concrete outcome statement ("Previously required 3 days of manual reconciliation; now runs as a Sunday-night scheduled script") increases trust signal density on the page.

---

### MEDIUM: FSM Blog Cluster Has No Hub Page

**Severity:** Medium

**Finding:** Four FSM-related blog posts were published as a cluster:
- `netsuite-fsm-bundle-update-august-2026.md` (~2,574 words)
- `netsuite-fsm-readonly-migration-august-2026.md` (~1,513 words)
- `netsuite-fsm-nxc-now-migration-august-2026.md` (~1,403 words)
- `netsuite-fsm-mobile-changes-august-2026.md` (~1,630 words)
- Resource: `netsuite-fsm-bundle-update-2026-checklist.md` (~1,845 words)

These five pages form a topical cluster about the August 11, 2026 FSM update. There is no hub page that links to all five and provides the overview. The bundle-update post is the most comprehensive, but it does not function as a pillar linking to the others. Each post links back to the bundle post (1 link each) but does not link to the other cluster members.

**Recommendation:** Establish `netsuite-fsm-bundle-update-august-2026.md` as the hub by adding links to all other FSM cluster posts within its content. Alternatively, create a brief "FSM August 2026 Update: Overview" post that links out to each detailed post. This concentrates topical authority for the FSM update cluster.

---

### LOW: `signs-netsuite-support-not-working.md` Has No Structured Summary

**Severity:** Low

**Finding:** The signs post lists 8 warning signals, each as an H2. It has no introductory summary list, no table, and no comparison block listing all 8 signs together in one place. The diagnostic widget near the top is visual (styled HTML) but not machine-readable. An AI or search engine looking for "signs NetSuite support is not working" cannot pull a clean list of all 8 without reading the entire post.

**Recommendation:** Add a short bulleted summary list immediately after the intro paragraph, before the first H2, listing all 8 signs by name. This becomes a directly citable passage and improves skimmability for the human reader.

---

### LOW: `netsuite-post-go-live-support` Page Is Thin for a Primary Service Page

**Severity:** Low

**Finding:** The `netsuite-post-go-live-support` page contains approximately 700-800 words of prose across all sections (excluding component labels and button text). It is the least detailed of the three audited service pages. The post-go-live support service is the core offering, yet the page has the most compressed content:

- No explanation of what the first engagement looks like in practice
- No list of deliverables from the onboarding step
- No content about typical retainer scope or what is not covered
- No case study or outcome reference

The `hire-netsuite-developer` page (~2,000+ words) and `netsuite-suitescript-development` page (~1,000+ words) both go deeper on process and trust signals.

**Recommendation:** Expand the post-go-live support page to at minimum match the depth of the SuiteScript development page. Add a "What the first 30 days looks like" section, a coverage scope table (what's in vs. out of the retainer), and one case study outcome card. Target 1,200 words of prose content.

---

### LOW: No Industry-Vertical Content Targeting CFO/Controller Personas

**Severity:** Low

**Finding:** The blog and resource library is almost entirely developer/admin-targeted. Content about saved searches, SuiteScript, governance limits, and workflows is valuable for NetSuite Admins but rarely reaches CFOs or Controllers organically. The stated buyer personas include CFOs and Controllers, but there is no content targeting their search behavior:

- "how to speed up NetSuite month-end close" (addressed but from admin perspective)
- "NetSuite financial reporting for CFOs"
- "NetSuite AR aging report setup"
- "NetSuite intercompany accounting issues"
- "when to hire a NetSuite consultant"

The `netsuite-month-end-close-checklist.md` post is the closest to CFO-level content but leads with technical steps, not finance outcome framing.

**Recommendation:** Add 2-3 posts per quarter targeting CFO/Controller search intent. These should lead with business outcomes (close time, accuracy, visibility) and explain the technical solution as a means to that end, not as the primary topic. The month-end checklist is a good foundation; a companion "how to reduce your NetSuite close from 10 days to 5 days" post targeting that same audience would extend the cluster into finance buyer territory.

---

### INFO: Structured Data Implementation Is Strong

**Severity:** Info

**Finding:** The following schema types are correctly implemented:
- `BlogPosting` on all blog posts with correct publisher, datePublished, headline, and mainEntityOfPage
- `FAQPage` on service pages (hire-netsuite-developer, netsuite-suitescript-development, netsuite-post-go-live-support)
- `BreadcrumbList` on service pages
- `ProfessionalService` (OrganizationJsonLd) on site-wide
- `Article` author set as Organization (correct for anonymous brand)

No named Person schema anywhere on the site, which aligns with the anonymous-brand constraint.

The resource pages use `Article` schema with Organization author - correct.

One gap: how-to resource pages (e.g., "How to Migrate NetSuite Integrations from NLAuth to Token-Based Authentication") do not use `HowTo` schema. This is optional but `HowTo` markup increases eligibility for how-to rich results.

---

### INFO: Content Freshness Signals Are Good Where Present

**Severity:** Info

**Finding:** Blog posts are consistently dated and filed. The 2026.2 and August 2026 FSM posts are timely and specific to the release cycle. The NLAuth/TBA deprecation post is well-structured with a deadline summary table that will remain relevant through 2027-2028. The SuiteQL sort change post correctly notes "starting in 2026.2" throughout, tying the content to a verifiable release.

---

## Summary of Priorities

| Priority | Finding |
|---|---|
| 1 | Consolidate the two SuiteQL sort-change blog posts (duplicate) |
| 2 | Expand or consolidate the 13 thin blog posts (under 800 words) |
| 3 | Add `dateModified` field support for future content updates |
| 4 | Rewrite opening paragraphs on 4-6 high-intent posts for direct answers |
| 5 | Add internal links to the 5 zero-link blog posts, especially signs-netsuite-support-not-working |
| 6 | Add certification credentials as on-page text on service pages |
| 7 | Expand netsuite-post-go-live-support page to 1,200+ words |
| 8 | Link the FSM cluster posts to each other with the bundle post as hub |
| 9 | Add structured summary list to signs-netsuite-support-not-working |
| 10 | Create CFO/Controller-targeted content (2-3 posts) |

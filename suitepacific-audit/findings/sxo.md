# SXO Audit: SuitePacific.com
**Date:** 2026-08-05
**Scope:** /hire-netsuite-developer, /netsuite-post-go-live-support, /netsuite-consulting-services, /netsuite-suitescript-development, /netsuite-admin-support-small-business
**SXO Gap Score:** 52 / 100

---

## Executive Summary

SuitePacific's service pages have strong content depth and genuine E-E-A-T signals (certifications, process specificity, sandbox discipline). The structural problem is conversion architecture, not content quality. Primary-intent CTAs link away from the page, only one of five service pages has a mid-page form, and social proof beyond the hire page is absent. Secondary: one keyword cluster ("netsuite consulting services") faces a SERP populated by implementation partners, making SuitePacific's post-implementation positioning a differentiation risk rather than an advantage.

---

## SERP Analysis

### "hire netsuite developer"
Top 5 organic results: Upwork (talent marketplace), AnchorGroup, Versich, VNMT Solutions, Toptal
- Dominant page type: Commercial service / talent marketplace (100% transactional)
- SERP features observed: No featured snippet, talent platform schema (reviews, ratings), freelancer comparison tables
- Consensus: Searchers want to see available developers with credentials and flexible pricing now, not a long educational guide first

### "netsuite post-go-live support"
Top results: Folio3, EpiqInfo, StreamsSolutions, SuiteUniverse, SixLakes, SuiteDynamics, SuiteRep, Concentrus
- Dominant page type: Managed services / retainer landing page (transactional)
- SERP features: PAA questions ("What is post go-live support?", "How long is NetSuite post go-live?")
- Consensus: Pages that define the service category, list covered areas, explain billing model, and link to contact form rank here

### "netsuite consulting services"
Top results: Folio3, SixLakes, BigBang, EPIQ, ScaleNorth, 8020 Consulting
- Dominant page type: Implementation partner landing pages (heavy implementation emphasis)
- Note: Majority of ranking pages serve companies pre-implementation or in mid-implementation, not post-go-live
- Mismatch risk: Medium (see Finding 4)

### "netsuite suitescript development"
Top results: NetSuite.com official, AnchorGroup blog, ERPPeers, EmergeTech, UnityConsulting, Stockton10, Versich
- Dominant page type: Specialist service page + educational hybrid
- SERP features: No featured snippet, informational editorial content mixed with commercial pages

### "netsuite admin support small business" / "fractional netsuite administrator"
Top results: EmergeTech, Cumula3, AnchorGroup, Odecloud
- Dominant page type: Fractional-service landing page (pricing-forward, cost-vs-hire framing)
- Key differentiation signals: Explicit price ranges ($3,000-$10,000/month), cost-vs-salary math, same-day response SLAs

---

## Findings

### CRITICAL

**C1: Primary CTA button exits the page on all five service pages**

Evidence: Every service page places a "Book a Free Consultation" button (Button component, `href="/contact"`) immediately after the hero section. Users who click this button navigate away to /contact, losing all scroll context and requiring the site to re-earn their attention on a generic contact page. The mid-page LeadForm on /hire-netsuite-developer exists but is placed after "Why SuitePacific" (section 5 of 15). The button CTA precedes the form and routes users off-page.

Impact: Every user who clicks the primary CTA converts on /contact (no page attribution) or drops off during navigation. Any user who does not click the button must scroll through 12+ sections to reach the next form instance.

Recommendation: Change `href="/contact"` to `href="#contact"` on all service pages and ensure each page has a corresponding `id="contact"` on its LeadForm wrapper. This keeps the user on the page and eliminates the page-exit friction. The /contact page remains for direct traffic and navigational queries.

---

### HIGH

**H1: Four of five service pages have only one form instance, placed at the bottom after the FAQ**

Evidence:
- /hire-netsuite-developer: 2 LeadForms (mid-page after "Why SuitePacific" + bottom after FAQ) - only compliant page
- /netsuite-post-go-live-support: 1 LeadForm (bottom only, after 5 content sections + FAQ)
- /netsuite-consulting-services: 1 LeadForm (bottom only, after 5 content sections + FAQ)
- /netsuite-suitescript-development: 1 LeadForm (bottom only, after 5 content sections + FAQ)
- /netsuite-admin-support-small-business: 1 LeadForm (bottom only, after 5 content sections + FAQ)

Most B2B site visitors exit before reaching 50% scroll depth. Placing the only conversion point after FAQ content means the form is not reached by the majority of visitors. The hire page pattern proves the mid-page form works and exists.

Recommendation: Add a mid-page LeadForm block to the four remaining service pages, positioned after the "What we cover / What we handle" section (typically section 2 or 3). Use the same pattern as the hire page: a rounded-2xl container with a two-line header ("Ready to get started?" + sub-line), the LeadForm component, placed before the "Why SuitePacific" cards. No new component needed.

---

**H2: Social proof exists only on /hire-netsuite-developer; the other four service pages have none**

Evidence: The hire page includes a "Recent Work" section with three case study cards showing concrete, attributed outcomes (batch invoice automation, vendor quotation process, operational dashboards). None of the other four service pages include a case study, outcome statement, or named work example. "Why SuitePacific" cards present self-asserted claims (Oracle-Certified, Fast Turnaround, Direct Access) but cite no external evidence.

Impact: For CFOs and Controllers evaluating a vendor at the consideration stage, self-assertion without supporting outcomes fails to establish E-E-A-T and increases time-to-trust, reducing form submission rates.

Recommendation: Add a 2-card or 3-card "Recent Work" strip to each service page using the most relevant case studies. /netsuite-post-go-live-support and /netsuite-suitescript-development both have corresponding case studies already in /case-studies (invoice-processing-automation, vendor-quotation-management, operational-reporting). Import and render the same case study card component used on the hire page. Position between the "How it works" section and the "Why SuitePacific" section.

---

**H3: No pricing context on post-go-live, consulting, SuiteScript, or admin pages**

Evidence: The hire page addresses cost with three engagement models (Hourly, Fixed-Price, Monthly Retainer) but gives no price range. The other four pages mention "monthly retainer" in FAQs with no numeric context. Competing fractional-admin pages (EmergeTech, Cumula3) explicitly state "$3,000 to $10,000/month," and SERP results for fractional admin queries show price-forward pages ranking in positions 1-3.

Impact: CFOs and Controllers are qualification-driven. Without a price signal, budget-qualified buyers cannot self-select in, meaning higher-funnel inquiries dominate and conversion quality drops.

Recommendation: Add a one-paragraph pricing section to each page using honest range framing: "Retainer engagements typically start at [X] hours per month. Scope and pricing are discussed on the free consultation call." This removes a friction point without committing to fixed prices. The hire page can also be updated with a similar anchor rather than three unnamed model cards.

---

**H4: The "netsuite consulting services" keyword cluster faces an implementation-dominated SERP; page positioning creates differentiation risk**

Evidence: SERP analysis for "netsuite consulting services" shows Folio3, BigBang, ScaleNorth, and 8020 Consulting in the top 5. All lead with implementation, go-live, and full ERP deployment services. SuitePacific's /netsuite-consulting-services page explicitly positions against implementation ("we do not handle initial implementations") and relies on post-implementation differentiation.

Impact: Google's ranking algorithm is calibrated to match page type to searcher intent. If the dominant SERP population is implementation-focused, a page that leads with "not implementations" may receive weaker relevance signals, especially without the brand authority these larger partners carry.

Recommendation: Two-track approach. (1) On the /netsuite-consulting-services page, restructure the opening: lead with "NetSuite consulting for growing businesses" and surface the specific service categories before the post-implementation qualifier. This broadens the topical match without changing the service scope. (2) Target long-tail variants where SuitePacific has natural alignment: "netsuite managed services consulting," "netsuite post-implementation consulting," "netsuite ongoing consulting." These have lower volume but much higher intent-match for what SuitePacific actually delivers.

---

### MEDIUM

**M1: Navigation does not expose service pages, requiring 3 clicks from mobile to reach a service page**

Evidence: NAV_LINKS shows: Services (href="/#services"), Case Studies, Resources, Blog, Products. "Services" links to the homepage anchor section, not to a /services index or directly to individual service URLs. A mobile user must: (1) open menu, (2) tap Services to go to homepage, (3) scroll the services section, (4) tap a service card. On desktop, "Services" is a direct link to /#services (also homepage-anchored, not a services hub).

Impact: Mobile conversion is harder when the path from navigation to service page is multi-step. Users arriving via blog posts or case studies have no one-click path to the highest-intent commercial pages.

Recommendation: Convert the "Services" nav item into a dropdown (same pattern as "Products") listing the 4-5 core service pages directly: /hire-netsuite-developer, /netsuite-post-go-live-support, /netsuite-consulting-services, /netsuite-suitescript-development, /netsuite-admin-support-small-business. This gives mobile users a single tap to reach any service page and improves internal crawl path for Googlebot.

---

**M2: Schema coverage is limited to BreadcrumbJsonLd and FaqJsonLd; no Service or Organization schema on service pages**

Evidence: All four read service pages import and render BreadcrumbJsonLd and FaqJsonLd. No Service schema (schema.org/Service) is present. No AggregateRating schema is implemented anywhere. The homepage renders OrganizationJsonLd and WebSiteJsonLd but these are not propagated to service pages.

Impact: Competing service pages from larger firms (Folio3, EmergeTech) include richer structured data. Google uses Service schema to understand page type and eligible rich results. FAQ schema is present, which is good, but Service schema would strengthen the commercial-intent signal for the target keywords.

Recommendation: Add a ServiceJsonLd component to each service page. Minimally: name, description, provider (Organization), serviceType, areaServed, url. This can be a thin component that reads from the existing metadata export on each page. Priority order: /hire-netsuite-developer first (highest commercial intent keyword).

---

**M3: The admin-support page drops into the CTA button without any intro paragraph**

Evidence: /netsuite-admin-support-small-business renders SectionHeading directly followed by `<Button href="/contact">Book a Free Consultation</Button>` with no body copy. All other service pages include 1-2 sentences of orienting prose between the subtitle and the CTA. For new visitors who land from a SERP result, the absence of a paragraph creates a jarring jump from the headline claim to a purchase CTA.

Impact: Google's quality rater guidelines (Page Quality) evaluate whether a page satisfies user need before asking for a conversion action. A page that presents no context before a CTA may be rated as thin or as prioritizing commercial action over user benefit.

Recommendation: Add a 2-3 sentence intro paragraph between the SectionHeading and the Button on the admin-support page, equivalent to what other service pages do. Text already exists in the page's pain-point cards and can be summarized as a brief orientation paragraph.

---

**M4: Company field is required in LeadForm, adding friction for solo administrators and researchers**

Evidence: LeadForm.tsx line 85 shows `required` on the Company input field. The target persona group includes solo NetSuite administrators at small businesses who may be evaluating on behalf of their employer but are uncertain about their company's decision authority, and individual ERP Managers doing initial research before bringing a vendor to leadership.

Impact: Required company field adds one cognitive step and may cause abandonment among prospects who are in early-stage research mode. The page context ("small business") suggests many visitors are owner-operators or single-person IT functions.

Recommendation: Remove `required` from the Company field and change the label to "Company (optional)". The email + message fields are sufficient for initial qualification. Company is better asked during the follow-up call.

---

**M5: LeadFormLight CTA text "Get in touch" is undifferentiated**

Evidence: LeadFormLight renders a button with text "Get in touch" (when idle). This appears on blog posts and resource pages as the inline capture form. The text is generic and does not reflect the specific context of the page or the value exchange.

Impact: Generic CTA text performs worse than specific-benefit CTAs in B2B contexts. A visitor reading a blog post about SuiteScript governance limits is at a higher intent level than someone browsing; the CTA should match that intent.

Recommendation: Make the button text configurable via a prop on LeadFormLight (e.g., `ctaText?: string` defaulting to "Get in touch"). On service-adjacent blog posts (SuiteScript guides, admin how-tos), pass "Get a free scope review" or "Talk to a NetSuite expert." The LeadFormLight component is already called from multiple blog/resource pages; a single prop addition enables page-specific text.

---

### LOW / INFO

**L1: The hire page informational sections (Questions to Ask, Red Flags) are excellent for E-E-A-T but should be separated from the transactional flow**

Evidence: /hire-netsuite-developer contains approximately 7 informational sections (Signs You Need, What Does a Developer Do, Admin vs Developer, Skills to Look For, Questions to Ask, Red Flags, Cost) that position SuitePacific as a guide to hiring, not just a vendor. This is correct for SEO long-tail coverage. However, these sections appear after the mid-page form, meaning the informational content is consumed after the transactional ask, which is the correct sequencing.

Note: No change needed in structure. The current order (social proof, Why SuitePacific, mid-page form, then educational content) is correctly sequenced. This is documented as informational because it may be mistaken for a problem when it is not.

---

**L2: No explicit internal links from blog posts to /hire-netsuite-developer**

Evidence: The SuiteScript page links to two blog posts (best practices, governance limits). The reverse link, from those blog posts back to the hire page or post-go-live support page, cannot be verified from page source alone but is a common gap on content-heavy sites.

Recommendation: Audit the top 5 traffic-driving blog posts and ensure each has at least one contextual inline link to the most relevant service page. A post on SuiteScript governance limits should link to /hire-netsuite-developer or /netsuite-suitescript-development. A post on NetSuite period close should link to /netsuite-admin-support-small-business.

---

## Persona Scoring

Scoring each persona on Relevance (25), Clarity (25), Trust (25), Action (25). Total 100.

### Controller / Finance Manager (post-go-live, needs fixes and ongoing support)
- Relevance: 22/25 - Pain points are well described across all pages
- Clarity: 18/25 - Pages are clear on what is covered but weak on what specific finance workflows are supported
- Trust: 14/25 - No finance-specific case studies on post-go-live or consulting pages
- Action: 13/25 - Single form at bottom, button goes to /contact
- Total: 67/100
- Priority fix: Add a finance-workflow case study card to /netsuite-post-go-live-support and resolve C1

### ERP Manager (overloaded, script issues, inheriting legacy customizations)
- Relevance: 23/25 - SuiteScript page directly addresses undocumented scripts and governance errors
- Clarity: 21/25 - Technical depth is good; pain point cards are specific
- Trust: 17/25 - Oracle certification is mentioned; no proof of volume handled
- Action: 14/25 - Single form at bottom of SuiteScript page; button links away
- Total: 75/100
- Priority fix: Mid-page form on /netsuite-suitescript-development (H1), internal links from governance blog posts

### CFO (evaluating cost, wants no long-term contracts)
- Relevance: 19/25 - Pricing section exists on hire page but is vague; no pricing on other pages
- Clarity: 15/25 - "Monthly retainer" appears in FAQs without cost context; budget-qualification fails
- Trust: 15/25 - "No long-term contracts" is present in metadata and CTA_SUPPORT_LINE but not prominently displayed in body content
- Action: 12/25 - No price anchoring to self-qualify in; cannot reach form easily
- Total: 61/100
- Priority fix: H3 (pricing context), C1 (form access)

### NetSuite Admin (small business, part-time capacity)
- Relevance: 22/25 - Admin-support page is well-targeted
- Clarity: 16/25 - Jumps to CTA without intro paragraph; comparison table is helpful but buried
- Trust: 14/25 - No case studies specific to admin support scenarios
- Action: 13/25 - Form at bottom; button exits page; no mid-page form
- Total: 65/100
- Priority fix: M3 (add intro paragraph), H1 (mid-page form), H2 (case study card)

### IT Director / Operations Manager (evaluating vendor switch)
- Relevance: 20/25 - "Take over from current provider" covered in FAQ
- Clarity: 18/25 - Transition process is described in FAQ but not in a dedicated section
- Trust: 16/25 - Direct access promise is strong; no proof of successful transitions
- Action: 12/25 - No mid-page form on consulting or post-go-live pages
- Total: 66/100
- Priority fix: Consider a "Switching providers?" callout block with a brief 2-step onboarding description and inline form

---

## Gap Score Breakdown (100 pts)

| Dimension | Score | Max | Notes |
|-----------|-------|-----|-------|
| Page Type Match | 11 | 15 | Hire page well-matched; consulting page faces implementation-dominated SERP |
| Content Depth | 13 | 15 | Strong on hire and SuiteScript pages; lighter on consulting and admin pages |
| UX Signals | 6 | 15 | CTA exits page, missing mid-page forms on 4 pages, no scroll-to-form anchoring |
| Schema | 8 | 15 | FAQ and Breadcrumb present on all; no Service or AggregateRating schema |
| Media | 5 | 15 | No screenshots, no video, no process diagrams; icon cards present but not rich media |
| Authority | 5 | 15 | Certification claims present; no external reviews, ratings, or named client references |
| Freshness | 4 | 10 | No visible publication/update dates on service pages; no "last reviewed" signal |
| **Total** | **52** | **100** | |

---

## User Stories Derived from SERP Signals

1. "As an ERP Manager whose previous developer left without documentation, I want to find someone who can audit what is already deployed before building anything new, so I know they won't break what's working." Signal: pain-point framing in SuiteScript SERP results ("inheriting undocumented scripts").

2. "As a Controller who just had my implementation partner go silent, I want to understand exactly what ongoing support covers and how much it typically costs, so I can justify the budget to my CFO." Signal: FAQs dominating "netsuite post-go-live support" SERP ("how is support billed", "do you require long-term contracts").

3. "As a CFO at a 50-person company, I want to know if a fractional NetSuite admin is cheaper than hiring someone full-time, so I can present the business case to ownership." Signal: cost-vs-hire framing on all top fractional admin pages; Emergetech and Cumula3 both lead with salary math.

4. "As an IT Director evaluating vendors, I want to see specific examples of work done in accounts like mine, so I can assess whether this firm understands our business size and complexity." Signal: case study and portfolio patterns on Upwork/Toptal results for hire-developer queries.

5. "As a NetSuite Admin overwhelmed by backlogged requests, I want to delegate specific tasks (saved searches, role management, CSV imports) to someone available same-day, so I can focus on higher-value work." Signal: SLA specificity on fractional-admin SERP results; "same business day" and "within 24 hours" claims on competing pages.

---

## Limitations

- SERP analysis reflects a single query moment; rankings shift. Positions were not verified from a specific geolocation; results may vary by region.
- The LeadForm submission rate and current conversion data are unavailable. Gap scores are derived from structural evidence, not A/B test outcomes.
- No access to Google Search Console click-through rate or impression data for these pages. If certain pages already rank page 2+, priority of form fixes may differ from SEO-first recommendations.
- Mobile rendering was assessed from source code and Tailwind breakpoints, not from a real device test. The `min-w-[480px]` table on /netsuite-admin-support-small-business is wrapped in `overflow-x-auto` per CLAUDE.md compliance, but actual tap-target sizes on the comparison table were not tested.
- Review signals (G2, Clutch, testimonials) were not included in scope per CLAUDE.md restrictions on identity disclosure.

---

## Prioritized Action List

| Priority | Finding | Effort | Conversion Impact |
|----------|---------|--------|-------------------|
| 1 | C1: Change Button href to #contact on all 5 service pages | Low | High |
| 2 | H1: Add mid-page LeadForm to 4 service pages | Low | High |
| 3 | H2: Add case study cards to 4 service pages | Medium | Medium-High |
| 4 | M1: Convert Services nav to dropdown with direct service links | Low | Medium |
| 5 | H3: Add pricing context paragraph to each service page | Low | Medium |
| 6 | M2: Add ServiceJsonLd schema component | Low | Medium (SEO) |
| 7 | M3: Add intro paragraph to admin-support page | Low | Low-Medium |
| 8 | M4: Make Company field optional in LeadForm | Low | Low |
| 9 | H4: Restructure consulting-services page opening for broader match | Medium | Medium (SEO) |
| 10 | M5: Add ctaText prop to LeadFormLight | Low | Low |

---

*Generate a PDF report? Use `/seo google report`*

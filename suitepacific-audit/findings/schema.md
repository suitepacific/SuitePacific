# Schema / Structured Data Audit — SuitePacific

**Audit date:** 2026-08-07
**Source:** Static code analysis of `components/seo/JsonLd.tsx` + all `app/(site)/*/page.tsx` files
**Method:** Full codebase read — server-rendered Next.js, no Playwright needed
**Pages audited:** Homepage, 10 service pages, blog index, 3 blog posts, case studies index, case study detail, resources index, resource detail, /suitecompare, /contact

**Score: 72 / 100**

---

## Score Breakdown

| Category | Points |
|----------|--------|
| Schema breadth (page type coverage) | 28 / 35 |
| Schema correctness (valid types, required fields) | 22 / 25 |
| Recommended property completeness | 14 / 25 |
| Technical hygiene (@context, URLs, dates) | 8 / 10 |
| Missed rich-result opportunities | 0 / 5 |

**What earns this score:** Every public page type (service, blog, case study, resource, product) has at least one structured data block. All @context values use `https://schema.org`, all URLs are absolute, all dates are ISO 8601. The foundation is solid.

**What holds it back:** One image dimension bug on resource pages, the WebSite block is missing its SearchAction, FAQPage is deployed across 12+ pages despite producing no Google SERP feature since May 2026, several article types are missing `url`, and the publisher logo ImageObject lacks dimensions in all article schemas.

---

## Schema Inventory by Page Type

### Homepage (`/`)

| Block | @type | Size |
|-------|-------|------|
| Block 1 | ProfessionalService (with nested PostalAddress, OfferCatalog, Offer, Service) | ~2,883 bytes |
| Block 2 | WebSite | ~148 bytes |
| Block 3 | FAQPage (with Question, Answer) | ~6,440 bytes |

**Source:** `app/(site)/page.tsx` imports `OrganizationJsonLd`, `WebSiteJsonLd` from `components/seo/JsonLd.tsx`; the `Faq` section component independently emits `FaqJsonLd`.

**ProfessionalService — validation:**
- @context: `https://schema.org` ✅
- @type: `ProfessionalService` ✅ (valid LocalBusiness subtype)
- name: `"SuitePacific, LLC"` (LEGAL_NAME constant) ✅
- alternateName: `"SuitePacific"` ✅
- url: `"https://suitepacific.com"` (absolute) ✅
- logo: absolute URL ✅
- image: same as logo (256x256 JPEG) — acceptable for Organization, not ideal for Article contexts
- description: present, non-placeholder ✅
- address.PostalAddress: addressRegion + addressCountry only — missing streetAddress, postalCode, addressLocality (recommended, not required)
- areaServed: `"US"` ✅
- sameAs: LinkedIn URL (absolute) ✅
- knowsAbout: array of 6 NetSuite topics ✅
- award: 2 certification strings — semantically imprecise (see Low finding below)
- hasOfferCatalog: OfferCatalog > Offer > Service (7 pairs) ✅
- MISSING @id: no `"@id": "https://suitepacific.com/#organization"` anchor

**WebSite — validation:**
- @context: `https://schema.org` ✅
- @type: `WebSite` ✅
- @id: `"https://suitepacific.com/#website"` ✅
- name: `"SuitePacific"` ✅
- url: `"https://suitepacific.com"` ✅
- MISSING potentialAction (SearchAction) — see Medium finding below

**FAQPage — validation:**
- @context: `https://schema.org` ✅
- @type: `FAQPage` ✅ (structurally valid)
- mainEntity: array of Question/Answer ✅ (correct nesting)
- STATUS: No Google SERP benefit — FAQ rich results retired May 7, 2026. See Info finding.

---

### Service pages (10 pages)

All 10 service pages share the same three-block pattern:

| Block | @type | Status |
|-------|-------|--------|
| BreadcrumbList | BreadcrumbList | ✅ |
| FAQPage | FAQPage | Info (no SERP value) |
| Service | Service | ✅ with gaps |

**Pages confirmed:** `/hire-netsuite-developer`, `/netsuite-consulting-services`, `/netsuite-suitescript-development`, `/netsuite-workflow-automation`, `/netsuite-saved-searches-dashboards`, `/netsuite-advanced-pdf-templates`, `/netsuite-account-optimization`, `/netsuite-administrator-support`, `/netsuite-post-go-live-support`, `/netsuite-integrations`, `/netsuite-admin-support-small-business`

**Service — validation (per-page):**
- @context: `https://schema.org` ✅
- @type: `Service` ✅
- name: page-specific (e.g., "NetSuite SuiteScript Development") ✅
- description: page-specific ✅
- url: absolute, page-specific ✅
- serviceType: page-specific ✅
- provider: ProfessionalService with name (LEGAL_NAME) and url (SITE_URL) ✅
- areaServed: `"US"` ✅
- MISSING: `offers`, `category`, `availableChannel`, `termsOfService` (recommended, not required)

**BreadcrumbList — validation:**
- 2-level breadcrumb: Home > [Page Name] ✅
- All items use absolute URLs ✅
- 1-based positions, no gaps ✅

**Exception:** `/netsuite-implementation-partner-vs-managed-support` has BreadcrumbList + FAQPage but NO ServiceJsonLd. This is a comparison/guide page — Article schema would fit better than Service schema (see Low finding).

---

### Blog index (`/blog`)

| Block | @type | Status |
|-------|-------|--------|
| BreadcrumbList | BreadcrumbList | ✅ |

No CollectionPage or Blog entity block. See Low finding.

---

### Blog post (`/blog/[slug]`)

| Block | @type | Status |
|-------|-------|--------|
| BlogPosting | BlogPosting | ✅ with minor gaps |
| BreadcrumbList | BreadcrumbList | ✅ |

**Source:** `components/seo/JsonLd.tsx` `BlogPostingJsonLd` component

**BlogPosting — validation:**
- @context: `https://schema.org` ✅
- @type: `BlogPosting` ✅
- headline: `post.title` ✅
- description: `post.description` ✅
- image: ImageObject with `url: og-default.png` (confirmed 1200x630 PNG), `width: 1200`, `height: 630` ✅
- datePublished: ISO 8601 from `post.date` ✅ (e.g., `"2026-06-29"`)
- dateModified: `post.updated ?? post.date` — correctly uses updated field when available ✅
- author: Organization with LEGAL_NAME ✅
- publisher: Organization with LEGAL_NAME + logo ImageObject ✅
- mainEntityOfPage: WebPage with @id (absolute URL) ✅
- MISSING: `url` property on the BlogPosting itself
- MISSING: publisher.logo width/height (see Low finding)
- MISSING: `inLanguage`, `keywords`, `articleSection` (recommended)

**BreadcrumbList:** 3-level (Home > Blog > Post), absolute URLs, 1-based positions ✅

---

### Case studies index (`/case-studies`)

| Block | @type | Status |
|-------|-------|--------|
| BreadcrumbList | BreadcrumbList | ✅ |
| ItemList | ItemList | ✅ |

**ItemList — validation:**
- name: `"NetSuite Case Studies"` ✅
- itemListElement: ListItem with position, url, name for each case study ✅
- URLs are absolute ✅
- No @id on the ItemList itself (low priority)

---

### Case study detail (`/case-studies/[slug]`)

| Block | @type | Status |
|-------|-------|--------|
| BreadcrumbList | BreadcrumbList | ✅ |
| Article | Article | ✅ with minor gaps |

**Source:** Inline `<script>` block in `app/(site)/case-studies/[slug]/page.tsx`

**Article — validation:**
- @context: `https://schema.org` ✅
- @type: `Article` ✅
- headline: `cs.title` ✅
- description: `cs.metaDescription` ✅
- image: ImageObject with `og-default.png`, `width: 1200`, `height: 630` ✅
- datePublished: `cs.publishedAt` in ISO 8601 format ✅ (e.g., `"2026-06-01"`)
- dateModified: `cs.publishedAt` (same as datePublished — acceptable) ✅
- author: Organization with LEGAL_NAME ✅
- publisher: Organization with LEGAL_NAME + logo ImageObject ✅
- mainEntityOfPage: WebPage with absolute @id ✅
- MISSING: `url` property on the Article itself
- MISSING: publisher.logo width/height (see Low finding)

**Note:** All case studies share `"publishedAt": "2026-06-01"`. As new case studies are added, use the actual publication date.

**BreadcrumbList:** 3-level (Home > Case Studies > Title), absolute URLs ✅

---

### Resources index (`/resources`)

| Block | @type | Status |
|-------|-------|--------|
| BreadcrumbList | BreadcrumbList | ✅ |

No CollectionPage or ItemList. The page renders 30 resources filtered by category. See Low finding.

---

### Resource detail (`/resources/[slug]`)

| Block | @type | Status |
|-------|-------|--------|
| TechArticle | TechArticle | Has image dimension bug |
| BreadcrumbList | BreadcrumbList | ✅ |

**Source:** Inline `<script>` block in `app/(site)/resources/[slug]/page.tsx`

**TechArticle — validation:**
- @context: `https://schema.org` ✅
- @type: `TechArticle` ✅ (excellent — more specific than Article for technical reference content)
- headline: `resource.title` ✅
- description: `resource.description` ✅
- image: `{ "@type": "ImageObject", url: "${SITE_URL}/logo-icon.png", width: 1200, height: 630 }` — **BUG**: `logo-icon.png` is a 256x256 JPEG. Declared dimensions `1200x630` do not match the actual file. Google will fetch and reject this image for rich results.
- datePublished: ISO 8601 ✅
- dateModified: same as datePublished ✅
- author: Organization with LEGAL_NAME ✅
- publisher: Organization with LEGAL_NAME + logo ImageObject ✅
- mainEntityOfPage: WebPage with absolute @id ✅
- MISSING: `url` property on the TechArticle itself
- MISSING: publisher.logo width/height (see Low finding)
- MISSING: `inLanguage`, `proficiencyLevel` (recommended for TechArticle)

**BreadcrumbList:** 3-level (Home > Resources > Title), absolute URLs ✅

---

### /suitecompare

| Block | @type | Status |
|-------|-------|--------|
| SoftwareApplication | SoftwareApplication | ✅ |
| BreadcrumbList | BreadcrumbList | ✅ |

**SoftwareApplication — validation:**
- @context: `https://schema.org` ✅
- @type: `SoftwareApplication` ✅
- @id: `"https://suitepacific.com/suitecompare#software"` ✅
- name: `"SuiteCompare"` ✅
- description: present ✅
- url: absolute ✅
- applicationCategory: `"BusinessApplication"` ✅
- operatingSystem: `"Web"` ✅
- offers: Offer with price `"0"`, priceCurrency `"USD"`, description ✅
- provider: Organization with LEGAL_NAME + url ✅
- MISSING: `screenshot`, `featureList`, `softwareVersion` (recommended)
- MISSING: `aggregateRating` (requires real reviews — do not fabricate)

---

### /contact

| Block | @type | Status |
|-------|-------|--------|
| BreadcrumbList | BreadcrumbList | ✅ |

No additional schema needed for a contact page. Appropriate coverage.

---

## Findings

---

### [Medium] Resource TechArticle declares wrong image dimensions

**File:** `app/(site)/resources/[slug]/page.tsx` line 63

**Current code:**
```ts
image: { "@type": "ImageObject", url: `${SITE_URL}/logo-icon.png`, width: 1200, height: 630 },
```

**Problem:** `logo-icon.png` is a 256x256 JPEG (confirmed via `file` command). The declared `width: 1200, height: 630` does not match the actual file. Google fetches the image to verify dimensions; when the actual pixel count is below 1200px wide, Article rich result eligibility is denied.

Blog posts and case studies correctly use `og-default.png` (confirmed 1200x630 PNG). Resources should use the same image.

**Fix — one-line change in `app/(site)/resources/[slug]/page.tsx`:**

```ts
// Before
image: { "@type": "ImageObject", url: `${SITE_URL}/logo-icon.png`, width: 1200, height: 630 },

// After
image: { "@type": "ImageObject", url: `${SITE_URL}/og-default.png`, width: 1200, height: 630 },
```

---

### [Medium] WebSite schema missing `potentialAction` (SearchAction)

**File:** `components/seo/JsonLd.tsx` `WebSiteJsonLd` function

**Current output:**
```json
{
  "@context": "https://schema.org",
  "@type": "WebSite",
  "@id": "https://suitepacific.com/#website",
  "name": "SuitePacific",
  "url": "https://suitepacific.com"
}
```

A `potentialAction` with a `SearchAction` enables the Sitelinks Searchbox rich result in Google SERPs — when users search for `suitepacific.com`, Google can display a search box directing queries to the site's own search.

The site does not currently have a `/search` endpoint. This is a two-part task: add a search results page, then add the SearchAction.

**Fix — add search endpoint first, then update `WebSiteJsonLd`:**

```ts
export function WebSiteJsonLd() {
  const data = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": `${SITE_URL}/#website`,
    name: "SuitePacific",
    url: SITE_URL,
    potentialAction: {
      "@type": "SearchAction",
      target: {
        "@type": "EntryPoint",
        urlTemplate: `${SITE_URL}/search?q={search_term_string}`,
      },
      "query-input": "required name=search_term_string",
    },
  };

  return (
    <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }} />
  );
}
```

Do not add this until a functional `/search?q=` page exists. Adding a SearchAction pointing to a non-functional URL produces a validation error in Google Search Console.

---

### [Low] Article/TechArticle/BlogPosting all missing `url` property

**Affected files:**
- `components/seo/JsonLd.tsx` (`BlogPostingJsonLd`) — `url` not set
- `app/(site)/case-studies/[slug]/page.tsx` — `url` not set on Article block
- `app/(site)/resources/[slug]/page.tsx` — `url` not set on TechArticle block

The `mainEntityOfPage` provides the `@id` of the WebPage entity, but the Article/BlogPosting itself should also carry `url` pointing to its canonical URL. These are distinct properties with different semantic roles.

**Fix — add `url` to each article block:**

In `components/seo/JsonLd.tsx` `BlogPostingJsonLd`:
```ts
url: `${SITE_URL}/blog/${post.slug}`,
```

In `app/(site)/case-studies/[slug]/page.tsx`:
```ts
url: `${SITE_URL}/case-studies/${slug}`,
```

In `app/(site)/resources/[slug]/page.tsx`:
```ts
url: `${SITE_URL}/resources/${slug}`,
```

---

### [Low] Publisher logo ImageObject missing `width` and `height`

**Affected files:**
- `components/seo/JsonLd.tsx` line 79 (`BlogPostingJsonLd`)
- `app/(site)/case-studies/[slug]/page.tsx` publisher logo
- `app/(site)/resources/[slug]/page.tsx` publisher logo

**Current code (representative):**
```ts
publisher: {
  "@type": "Organization",
  name: LEGAL_NAME,
  logo: { "@type": "ImageObject", url: `${SITE_URL}/logo-icon.png` },
},
```

The publisher logo ImageObject should declare width and height. Google's Article documentation recommends the logo be no taller than 60px. Dimensions should reflect the actual file.

`logo-icon.png` is 256x256. Since Google publisher logos are displayed small, a square crop is fine, but the dimensions should match reality.

**Fix:**
```ts
logo: { "@type": "ImageObject", url: `${SITE_URL}/logo-icon.png`, width: 256, height: 256 },
```

Apply in `BlogPostingJsonLd`, the case study inline block, and the resource inline block.

---

### [Low] `/netsuite-implementation-partner-vs-managed-support` has no Article schema

**Current:** BreadcrumbList + FAQPage only. No content-type schema.

This is a long-form comparison guide — not a service offering page — so `Service` schema is inappropriate here. `Article` schema is the correct type and enables the Article rich result.

**Fix — add an inline Article block to `app/(site)/netsuite-implementation-partner-vs-managed-support/page.tsx`:**

```tsx
<script
  type="application/ld+json"
  dangerouslySetInnerHTML={{
    __html: JSON.stringify({
      "@context": "https://schema.org",
      "@type": "Article",
      headline: "NetSuite Implementation Partner vs. Managed Support",
      description:
        "A practical guide to understanding the difference between a NetSuite implementation partner and a post-go-live managed support provider, and how to choose the right engagement model.",
      image: {
        "@type": "ImageObject",
        url: `${SITE_URL}/og-default.png`,
        width: 1200,
        height: 630,
      },
      datePublished: "2026-06-01",
      dateModified: "2026-06-01",
      author: { "@type": "Organization", name: LEGAL_NAME },
      publisher: {
        "@type": "Organization",
        name: LEGAL_NAME,
        logo: { "@type": "ImageObject", url: `${SITE_URL}/logo-icon.png`, width: 256, height: 256 },
      },
      mainEntityOfPage: {
        "@type": "WebPage",
        "@id": `${SITE_URL}/netsuite-implementation-partner-vs-managed-support`,
      },
      url: `${SITE_URL}/netsuite-implementation-partner-vs-managed-support`,
    }),
  }}
/>
```

Import `SITE_URL` and `LEGAL_NAME` at the top of the file.

---

### [Low] Blog index `/blog` missing CollectionPage/Blog schema

**Current:** BreadcrumbList only. No entity block describes the page as a blog or collection.

**Fix — add a `CollectionPage` or `Blog` block to `app/(site)/blog/page.tsx`:**

```tsx
<script
  type="application/ld+json"
  dangerouslySetInnerHTML={{
    __html: JSON.stringify({
      "@context": "https://schema.org",
      "@type": "Blog",
      "@id": `${SITE_URL}/blog`,
      name: "NetSuite Tips & Tricks Blog",
      description:
        "Practical NetSuite tips, SuiteScript best practices, and workflow automation advice for teams managing NetSuite after go-live.",
      url: `${SITE_URL}/blog`,
      publisher: {
        "@type": "Organization",
        name: LEGAL_NAME,
        url: SITE_URL,
      },
    }),
  }}
/>
```

---

### [Low] Resources index `/resources` missing CollectionPage schema

Same pattern as blog index. Add a `CollectionPage` block to `app/(site)/resources/page.tsx`.

Lower priority than blog because individual resource pages already have strong TechArticle schema; this gap doesn't affect per-article indexing.

---

### [Low] ProfessionalService missing `@id` anchor

**Current:** The `OrganizationJsonLd` block has no `@id` property, so no other page on the site can reference this entity by ID.

**Fix — add to `OrganizationJsonLd` in `components/seo/JsonLd.tsx`:**

```ts
"@id": `${SITE_URL}/#organization`,
```

Then all per-page Service blocks can reference it:
```ts
provider: {
  "@type": "ProfessionalService",
  "@id": `${SITE_URL}/#organization`,
},
```

This enables Google's entity graph to connect service pages back to the homepage organization entity.

---

### [Low] `award` used for certifications (semantically imprecise)

**Current `OrganizationJsonLd`:**
```ts
award: [
  "Oracle NetSuite Certified SuiteCloud Developer II",
  "Oracle NetSuite Certified Administrator Professional",
],
```

Schema.org `award` is intended for recognition conferred by a third party (Webby Award, Best Place to Work, etc.). Certifications are better expressed with `hasCredential` using `EducationalOccupationalCredential`.

**Preferred alternative:**
```ts
hasCredential: [
  {
    "@type": "EducationalOccupationalCredential",
    name: "Oracle NetSuite Certified SuiteCloud Developer II",
    credentialCategory: "certification",
    recognizedBy: { "@type": "Organization", name: "Oracle" },
  },
  {
    "@type": "EducationalOccupationalCredential",
    name: "Oracle NetSuite Certified Administrator Professional",
    credentialCategory: "certification",
    recognizedBy: { "@type": "Organization", name: "Oracle" },
  },
],
```

No functional SERP impact from this change — low priority, purely semantic correctness.

---

### [Info] FAQPage on 12+ pages: no Google SERP benefit since May 7, 2026

**Affected pages:**
- Homepage (via `Faq` section component > `FaqJsonLd`)
- All 10 service pages individually (each imports and uses `FaqJsonLd`)
- `/netsuite-implementation-partner-vs-managed-support`

Google retired FAQ rich results for all sites on May 7, 2026. These blocks are structurally valid JSON-LD: correct `@context`, all `Question` items have `acceptedAnswer`, no placeholder text. They produce no SERP feature.

**Recommendation:** No action required. Do not remove existing blocks (they are harmless and have zero maintenance cost). Do not add new FAQPage blocks to pages where they are currently absent. Any AI/GEO crawler benefit is unconfirmed.

---

## Passing Checks

| Check | Result |
|-------|--------|
| All @context values use `https://schema.org` (not http) | ✅ Pass — all 15+ blocks correct |
| All URLs are absolute | ✅ Pass — no relative URLs in any block |
| All dates are ISO 8601 | ✅ Pass — `"2026-06-01"` format throughout |
| BlogPosting image uses og-default.png (1200x630) | ✅ Pass — confirmed real file dimensions |
| Case study Article image uses og-default.png (1200x630) | ✅ Pass |
| BlogPosting dateModified uses `post.updated` when present | ✅ Pass — wired correctly in `BlogPostingJsonLd` |
| BreadcrumbList on all public pages | ✅ Pass — 2- or 3-level on every audited page |
| BreadcrumbList positions are 1-based, no gaps | ✅ Pass |
| Service schema on all 10 service pages | ✅ Pass |
| BlogPosting on all blog posts | ✅ Pass |
| Article on all case study detail pages | ✅ Pass |
| TechArticle on all resource detail pages | ✅ Pass |
| SoftwareApplication on /suitecompare | ✅ Pass |
| No deprecated types in use (no HowTo, SpecialAnnouncement, etc.) | ✅ Pass |
| author/publisher uses LEGAL_NAME (`"SuitePacific, LLC"`) consistently | ✅ Pass |
| No placeholder text in any block | ✅ Pass |

---

## Priority Action List

1. **Medium — fix soon:** Change `logo-icon.png` to `og-default.png` in the TechArticle image on `app/(site)/resources/[slug]/page.tsx`. One-line change. This unblocks Article rich result eligibility for 30 resource pages.

2. **Low — next sprint:** Add `url` property to BlogPosting (`components/seo/JsonLd.tsx`), Article (case study page), and TechArticle (resource page). Three one-line additions.

3. **Low — next sprint:** Fix publisher logo ImageObject dimensions in all three article blocks: change to `width: 256, height: 256` to match the actual 256x256 `logo-icon.png` file.

4. **Low — next sprint:** Add Article schema to `/netsuite-implementation-partner-vs-managed-support`. Use `og-default.png` for the image.

5. **Low — backlog:** Add Blog entity block to `/blog` index page. Add CollectionPage block to `/resources` index page.

6. **Low — backlog:** Add `@id` to `OrganizationJsonLd` and update Service blocks to reference it.

7. **Medium — when search is built:** Add `potentialAction`/SearchAction to `WebSiteJsonLd`. Do not add before a functional `/search?q=` endpoint exists.

8. **Info — no action:** FAQPage blocks can remain as-is everywhere they exist.

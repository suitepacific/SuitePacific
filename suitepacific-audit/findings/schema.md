# Schema / Structured Data Audit — SuitePacific

**Audit date:** 2026-08-05
**Pages fetched:** suitepacific.com (homepage), /blog/netsuite-nlauth-tba-end-of-support, /netsuite-suitescript-development, /netsuite-account-optimization, /hire-netsuite-developer, /resources, /resources/netsuite-fsm-bundle-update-2026-checklist, /blog
**Schema component:** /components/seo/JsonLd.tsx
**Method:** Raw HTML fetch + JSON-LD block extraction (server-rendered Next.js, no Playwright needed)

---

## Summary Table

| Severity | Finding |
|----------|---------|
| High | TechArticle on /resources/[slug] missing `image` property |
| Medium | Blog index /blog has zero JSON-LD |
| Medium | Service pages have no Service-type schema |
| Low | Resources index /resources has only BreadcrumbList, no ItemList |
| Low | WebSite schema missing `potentialAction` (SearchAction) |
| Info | FAQPage on 4 pages: no Google rich result since May 2026 |
| Pass | BlogPosting `image` fix confirmed live |
| Pass | ProfessionalService correctly scoped to homepage only |
| Pass | WebSite schema present on homepage |
| Pass | BreadcrumbList correct on all service, blog, and resource pages |
| Pass | All @context values use https://schema.org |
| Pass | All URLs are absolute |

---

## Findings

---

### [High] TechArticle on /resources/[slug] missing `image`

**Evidence:** Live fetch of `/resources/netsuite-fsm-bundle-update-2026-checklist` returned this TechArticle block (inline in `resources/[slug]/page.tsx`, not through JsonLd.tsx):

```json
{
  "@context": "https://schema.org",
  "@type": "TechArticle",
  "headline": "NetSuite FSM 2026.07.1 Sandbox Testing Checklist",
  "datePublished": "2026-07-27",
  "dateModified": "2026-07-27",
  "author": { "@type": "Organization", "name": "SuitePacific, LLC" },
  "publisher": { ... }
}
```

`image` is absent. Google requires `image` (ImageObject with url, width, height) for Article/TechArticle rich result eligibility. The BlogPosting component in JsonLd.tsx was fixed to include image, but the TechArticle block in `resources/[slug]/page.tsx` was not updated alongside it. Every resource article page is missing this property.

**Recommendation:** Add `image` to the inline TechArticle block in `app/(site)/resources/[slug]/page.tsx`:

```ts
image: {
  "@type": "ImageObject",
  url: `${SITE_URL}/logo-icon.png`,
  width: 1200,
  height: 630,
},
```

Alternatively, extract the TechArticle block into a `TechArticleJsonLd` component in `JsonLd.tsx` to keep it alongside `BlogPostingJsonLd` and ensure both stay in sync.

---

### [Medium] Blog index /blog has zero JSON-LD

**Evidence:** Fetch of `https://suitepacific.com/blog` returned 0 JSON-LD blocks. The page title is "NetSuite Tips & Tricks Blog | SuitePacific". The blog index lists all blog posts but emits no structured data.

**Recommendation:** Add a `CollectionPage` or `ItemList` block to the blog index (`app/(site)/blog/page.tsx`). ItemList is the stronger choice as it signals individual post URLs to Google:

```json
{
  "@context": "https://schema.org",
  "@type": "ItemList",
  "name": "NetSuite Blog",
  "url": "https://suitepacific.com/blog",
  "itemListElement": [
    {
      "@type": "ListItem",
      "position": 1,
      "url": "https://suitepacific.com/blog/netsuite-nlauth-tba-end-of-support"
    }
  ]
}
```

At minimum add a BreadcrumbList matching the pattern used on other listing pages.

---

### [Medium] Service pages have no Service-type schema

**Evidence:** All service pages audited (`/netsuite-suitescript-development`, `/netsuite-account-optimization`, `/hire-netsuite-developer`) emit only BreadcrumbList plus FAQPage. No schema describes the service itself beyond the site-level `hasOfferCatalog` on the homepage ProfessionalService block.

Individual Service schema on each page would give Google explicit structured signals for name, description, provider, areaServed, and url per service, supporting entity understanding and potential service-carousel features in AI-driven SERPs.

**Recommendation:** Add a `Service` block to each service page. Example for `/netsuite-suitescript-development`:

```json
{
  "@context": "https://schema.org",
  "@type": "Service",
  "name": "NetSuite SuiteScript Development",
  "description": "Custom SuiteScript 2.x development for post-go-live NetSuite accounts...",
  "url": "https://suitepacific.com/netsuite-suitescript-development",
  "provider": {
    "@type": "Organization",
    "name": "SuitePacific, LLC",
    "url": "https://suitepacific.com"
  },
  "areaServed": "US",
  "serviceType": "NetSuite SuiteScript Development"
}
```

A `ServiceJsonLd` component in `JsonLd.tsx` could accept `name`, `description`, and `slug` props so each service page renders it without duplication.

---

### [Low] Resources index /resources has only BreadcrumbList, no ItemList

**Evidence:** Fetch of `/resources` returned 1 JSON-LD block: BreadcrumbList with 2 items. The page renders a filtered list of resource articles (categorized) but emits no ItemList or CollectionPage.

**Recommendation:** Add an `ItemList` block to `app/(site)/resources/page.tsx` listing canonical URLs of the displayed resources. This is lower priority than the blog index because the breadcrumb already gives Google a crawl signal, but ItemList strengthens the collection entity.

---

### [Low] WebSite schema missing `potentialAction` (SearchAction)

**Evidence:** The `WebSiteJsonLd` component emits:

```json
{
  "@context": "https://schema.org",
  "@type": "WebSite",
  "@id": "https://suitepacific.com/#website",
  "name": "SuitePacific",
  "url": "https://suitepacific.com"
}
```

No `potentialAction` is present. A `SearchAction` enables the Google Sitelinks Searchbox feature (where Google surfaces a site search box directly in the SERP result for branded queries). This is low priority for a boutique services site with limited internal search use, but it is a supported rich result type.

**Recommendation:** Only add if the site gains a functional search page. Skip for now.

---

### [Info] FAQPage on 4 pages: no Google rich result since May 2026

**Evidence:**
- Homepage: 18 questions
- /netsuite-suitescript-development: 7 questions
- /netsuite-account-optimization: 4 questions
- /hire-netsuite-developer: 7 questions

Google retired FAQ rich results for all sites on May 7, 2026. These blocks produce no SERP feature. The schema is structurally valid (correct @context, Question/Answer types, all strings), so it is not harmful. Any AI/GEO crawl benefit is unconfirmed.

**Recommendation:** No action required. Do not remove (not harmful, low cost to retain). Do not add new FAQPage blocks on pages that lack them, as there is no confirmed benefit.

---

## Passing Checks

### [Pass] BlogPosting `image` fix confirmed live

Fetch of `/blog/netsuite-nlauth-tba-end-of-support` confirmed:

```json
"image": {
  "@type": "ImageObject",
  "url": "https://suitepacific.com/logo-icon.png",
  "width": 1200,
  "height": 630
}
```

All required Article rich result properties are present: `headline`, `image`, `datePublished`, `dateModified`, `author`, `publisher` (with nested logo ImageObject), `mainEntityOfPage`. The BlogPosting block is fully eligible for Google's Article rich result.

---

### [Pass] ProfessionalService scoped to homepage only

Homepage has the `ProfessionalService` block. No other page audited emits it. The `OrganizationJsonLd` import is present only in `app/(site)/page.tsx`. Scoping is correct.

---

### [Pass] WebSite schema present on homepage

Homepage confirmed:

```json
{
  "@context": "https://schema.org",
  "@type": "WebSite",
  "@id": "https://suitepacific.com/#website",
  "name": "SuitePacific",
  "url": "https://suitepacific.com"
}
```

`@id` anchor is correctly set. Present on homepage only.

---

### [Pass] BreadcrumbList correct on all service, blog, and resource pages

All pages audited with breadcrumbs use absolute URLs, 1-based `position` numbering, and the correct `ListItem` type. Spot checks:

- Blog post: Home > Blog > [Post title] (3 items, all absolute URLs)
- Service page: Home > [Service name] (2 items)
- Resource article: Home > Resources > [Resource title] (3 items)
- Resources index: Home > Resources (2 items)

No validation errors found on any BreadcrumbList block.

---

### [Pass] @context and URL hygiene

All detected JSON-LD blocks use `"@context": "https://schema.org"` (https, not http). All `url`, `item`, `@id`, and `mainEntityOfPage` values are absolute URLs rooted at `https://suitepacific.com`. No placeholder text detected.

---

## Priority Action List

1. **High — fix now:** Add `image` to the TechArticle block in `app/(site)/resources/[slug]/page.tsx`. This is a one-line fix identical to what was done for BlogPosting.
2. **Medium — next sprint:** Add BreadcrumbList to `app/(site)/blog/page.tsx` at minimum; ItemList is the stronger addition.
3. **Medium — next sprint:** Create a `ServiceJsonLd` component and add it to each service page.
4. **Low — backlog:** Add ItemList to the resources index page.
5. **Info — no action:** FAQPage blocks can stay as-is.

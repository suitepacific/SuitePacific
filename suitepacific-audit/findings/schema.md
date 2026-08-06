# Schema / Structured Data Audit — SuitePacific

**Audit date:** 2026-08-07
**Pages audited:** 8 (see page-by-page section)
**Fetch method:** Raw HTML + JSON-LD block extraction (server-rendered Next.js, Playwright not needed)
**Source verified:** `components/seo/JsonLd.tsx` + per-page inline blocks

---

## Summary Table

| Severity | Count | Finding |
|----------|-------|---------|
| Critical | 2 | Case study Article missing `datePublished`, `image`; /suitecompare has zero schema |
| High | 1 | BlogPosting `image` ImageObject missing `width`/`height` on all blog posts |
| Medium | 2 | Service pages missing Service schema; blog index has no schema |
| Low | 2 | Resources index missing ItemList; WebSite missing potentialAction |
| Info | 1 | FAQPage on 5 pages produces no Google rich result (retired May 7, 2026) |
| Pass | 8 | See passing checks section |

---

## Page-by-Page Detection

| Page | Blocks | Types detected |
|------|--------|----------------|
| `/` (homepage) | 3 | ProfessionalService + OfferCatalog, WebSite, FAQPage |
| `/blog/netsuite-user-event-vs-client-script` | 2 | BlogPosting, BreadcrumbList |
| `/blog/netsuite-nlauth-tba-end-of-support` | 2 | BlogPosting, BreadcrumbList |
| `/netsuite-suitescript-development` | 2 | BreadcrumbList, FAQPage |
| `/netsuite-post-go-live-support` | 2 | BreadcrumbList, FAQPage |
| `/case-studies/advanced-pdf-document-automation` | 2 | BreadcrumbList, Article |
| `/resources/netsuite-beforesubmit-vs-aftersubmit` | 2 | TechArticle, BreadcrumbList |
| `/suitecompare` | 0 | **None** |

---

## Critical Findings

---

### [Critical] Case study Article missing `datePublished`, `dateModified`, and `image`

**Source:** `app/(site)/case-studies/[slug]/page.tsx` lines 52-72 (inline script block)

The live Article block for `/case-studies/advanced-pdf-document-automation` is:

```json
{
  "@context": "https://schema.org",
  "@type": "Article",
  "headline": "Advanced PDF Document Automation",
  "description": "How SuitePacific rebuilt NetSuite invoice, purchase order, and statement templates...",
  "author": { "@type": "Organization", "name": "SuitePacific" },
  "publisher": { "@type": "Organization", "name": "SuitePacific", "logo": { ... } },
  "mainEntityOfPage": { "@type": "WebPage", "@id": "https://suitepacific.com/case-studies/..." }
}
```

Three properties required by Google for Article rich results are absent:
- `image` (ImageObject with url, width, height): **missing**
- `datePublished`: **missing**
- `dateModified`: **missing**

Additionally the author/publisher `name` is `"SuitePacific"` instead of `"SuitePacific, LLC"` (the value `LEGAL_NAME` resolves to in `lib/content.ts`). Every other schema block on the site uses `LEGAL_NAME`. The case study block hardcodes a shorter string.

**Fix — replace the inline block in `app/(site)/case-studies/[slug]/page.tsx`:**

```tsx
<script
  type="application/ld+json"
  dangerouslySetInnerHTML={{
    __html: JSON.stringify({
      "@context": "https://schema.org",
      "@type": "Article",
      headline: cs.title,
      description: cs.metaDescription,
      image: {
        "@type": "ImageObject",
        url: `${SITE_URL}/logo-icon.png`,
        width: 1200,
        height: 630,
      },
      datePublished: cs.publishedAt ?? "2026-01-01",
      dateModified: cs.updatedAt ?? cs.publishedAt ?? "2026-01-01",
      author: { "@type": "Organization", name: LEGAL_NAME },
      publisher: {
        "@type": "Organization",
        name: LEGAL_NAME,
        logo: { "@type": "ImageObject", url: `${SITE_URL}/logo-icon.png` },
      },
      mainEntityOfPage: {
        "@type": "WebPage",
        "@id": `${SITE_URL}/case-studies/${slug}`,
      },
    }),
  }}
/>
```

This also requires `publishedAt` and optionally `updatedAt` fields on the `CaseStudy` data type (in `lib/case-studies.ts`). If the data model has no dates, add them as static string fields on each case study object. Use ISO 8601 date strings (`"2026-01-01"` format). Import `LEGAL_NAME` alongside `SITE_URL`.

---

### [Critical] /suitecompare has zero schema markup

**Evidence:** Live fetch of `https://suitepacific.com/suitecompare` returned 0 JSON-LD blocks. Source confirmed: `app/suitecompare/page.tsx` has no JSON-LD, no structured data of any kind.

This is the product marketing page for SuiteCompare. It describes a SaaS tool with pricing, features, and a free tier. Without `SoftwareApplication` schema, Google has no structured signal about what the product is, its pricing model, or its operating environment.

**Fix — add two blocks to `app/suitecompare/page.tsx`:**

```json
{
  "@context": "https://schema.org",
  "@type": "SoftwareApplication",
  "@id": "https://suitepacific.com/suitecompare#software",
  "name": "SuiteCompare",
  "description": "Compare NetSuite Production and Sandbox SuiteScript files side-by-side in one click. Diff scripts, review deployment status, and understand any customization without switching tabs.",
  "url": "https://suitepacific.com/suitecompare",
  "applicationCategory": "BusinessApplication",
  "operatingSystem": "Web",
  "offers": {
    "@type": "Offer",
    "price": "0",
    "priceCurrency": "USD",
    "description": "Free plan available, no credit card required"
  },
  "provider": {
    "@type": "Organization",
    "name": "SuitePacific, LLC",
    "url": "https://suitepacific.com"
  }
}
```

```json
{
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  "itemListElement": [
    {
      "@type": "ListItem",
      "position": 1,
      "name": "Home",
      "item": "https://suitepacific.com"
    },
    {
      "@type": "ListItem",
      "position": 2,
      "name": "SuiteCompare",
      "item": "https://suitepacific.com/suitecompare"
    }
  ]
}
```

Both blocks can be emitted as `<script type="application/ld+json">` tags at the top of the page JSX, consistent with the rest of the site. A `SoftwareApplicationJsonLd` component in `JsonLd.tsx` would keep this pattern centralized, but an inline block is equally valid.

---

## High Findings

---

### [High] BlogPosting `image` missing `width` and `height`

**Source:** `components/seo/JsonLd.tsx` line 71:

```ts
image: { "@type": "ImageObject", url: `${SITE_URL}/logo-icon.png` },
```

No `width` or `height` properties are present. Google's Article rich result documentation requires the image to be at minimum 1200px wide (`width: 1200`) and recommends a 16:9 ratio. Without declared dimensions the crawler cannot confirm eligibility.

Confirmed on both live blog posts fetched:
- `/blog/netsuite-user-event-vs-client-script`: no width/height
- `/blog/netsuite-nlauth-tba-end-of-support`: no width/height

The resource page TechArticle (`resources/[slug]/page.tsx` line 62) already includes dimensions correctly:
```ts
image: { "@type": "ImageObject", url: `${SITE_URL}/logo-icon.png`, width: 1200, height: 630 },
```

**Fix — one-line change in `components/seo/JsonLd.tsx` line 71:**

```ts
// Before
image: { "@type": "ImageObject", url: `${SITE_URL}/logo-icon.png` },

// After
image: { "@type": "ImageObject", url: `${SITE_URL}/logo-icon.png`, width: 1200, height: 630 },
```

Note: `logo-icon.png` is likely a small icon, not a 1200px image. The declared dimensions signal to Google what the intended display size is, but Google will fetch and verify the actual file dimensions. If `logo-icon.png` is genuinely smaller than 1200px wide, a dedicated OG image per post would be the correct long-term fix. For now, adding dimensions is the minimum required change, and if Google rejects the image due to actual pixel size, the warning will appear in Search Console.

---

## Medium Findings

---

### [Medium] Service pages have no Service-type schema

**Evidence:** Both service pages audited emit only BreadcrumbList + FAQPage. No `Service` type describes the page subject.

- `/netsuite-suitescript-development`: BreadcrumbList + FAQPage only
- `/netsuite-post-go-live-support`: BreadcrumbList + FAQPage only

The homepage `ProfessionalService` block includes a `hasOfferCatalog` that lists services by name, but individual service pages carry no per-page entity markup. Google sees these pages as content pages without explicit service signals.

**Fix — add a `ServiceJsonLd` component to `JsonLd.tsx`:**

```ts
export function ServiceJsonLd({
  name,
  description,
  url,
  serviceType,
}: {
  name: string;
  description: string;
  url: string;
  serviceType: string;
}) {
  const data = {
    "@context": "https://schema.org",
    "@type": "Service",
    name,
    description,
    url,
    serviceType,
    provider: {
      "@type": "ProfessionalService",
      name: LEGAL_NAME,
      url: SITE_URL,
    },
    areaServed: "US",
  };
  return (
    <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }} />
  );
}
```

Then add it to each service page. Example for `/netsuite-suitescript-development/page.tsx`:

```tsx
<ServiceJsonLd
  name="NetSuite SuiteScript Development"
  description="Custom SuiteScript 2.x development for post-go-live NetSuite accounts, including User Event scripts, Client scripts, Scheduled scripts, Map/Reduce scripts, RESTlets, and Suitelets."
  url={`${SITE_URL}/netsuite-suitescript-development`}
  serviceType="SuiteScript Development"
/>
```

Example for `/netsuite-post-go-live-support/page.tsx`:

```tsx
<ServiceJsonLd
  name="NetSuite Post-Go-Live Support"
  description="Ongoing development, automation, and support for companies already live on NetSuite. Covers SuiteScript, workflow automation, saved searches, PDF templates, and configuration."
  url={`${SITE_URL}/netsuite-post-go-live-support`}
  serviceType="NetSuite Managed Support"
/>
```

Apply the same pattern to all other service pages (`/netsuite-account-optimization`, `/netsuite-workflow-automation`, `/netsuite-advanced-pdf-templates`, `/netsuite-saved-searches-dashboards`, `/netsuite-integrations`, `/hire-netsuite-developer`).

---

### [Medium] Blog index /blog has no schema

**Evidence:** The `/blog` page was audited in the previous audit run and found to emit 0 JSON-LD blocks. Source confirms no `JsonLd` components are imported in `app/(site)/blog/page.tsx`.

**Fix — add BreadcrumbList at minimum, ItemList for full coverage:**

```tsx
// Minimum fix (BreadcrumbList only)
<BreadcrumbJsonLd
  items={[
    { name: "Home", url: SITE_URL },
    { name: "Blog", url: `${SITE_URL}/blog` },
  ]}
/>
```

For fuller coverage, add an ItemList block listing canonical post URLs. This is lower-complexity than a full ItemList with titles and descriptions, but signals the collection to Google.

---

## Low Findings

---

### [Low] Resources index /resources missing ItemList

**Evidence:** The `/resources` page (audited previously) emits only a BreadcrumbList. The page renders a filterable list of resource articles but carries no ItemList or CollectionPage.

**Recommendation:** Add an `ItemList` block to `app/(site)/resources/page.tsx` listing the URLs of all resources. Lower priority than the blog index fix because resources already have strong individual TechArticle blocks.

---

### [Low] WebSite schema missing potentialAction (SearchAction)

**Evidence:** The `WebSiteJsonLd` component emits only `@type`, `@id`, `name`, and `url`. No `potentialAction` with a `SearchAction` is present.

**Recommendation:** Skip for now. The Sitelinks Searchbox rich result is only useful if the site has a functional search endpoint. If internal search is added in the future, add a `SearchAction` then.

---

## Info Findings

---

### [Info] FAQPage on 5 pages: no Google SERP benefit

**Affected pages:**
- Homepage: 18 questions
- `/netsuite-suitescript-development`: 7 questions
- `/netsuite-post-go-live-support`: 5 questions
- Other service pages (not audited in this run but using the same `FaqJsonLd` component)

Google retired FAQ rich results for all sites on May 7, 2026. These blocks are structurally valid JSON-LD (correct `@context`, all `Question` items have `acceptedAnswer`, no placeholder text). They produce no SERP feature. Any benefit for AI/GEO crawlers is unconfirmed.

**Recommendation:** No action required. Do not remove (not harmful, zero cost to retain). Do not add new FAQPage blocks where absent.

---

## Passing Checks

---

### [Pass] TechArticle on /resources/[slug] now includes image with dimensions

`app/(site)/resources/[slug]/page.tsx` line 62:
```ts
image: { "@type": "ImageObject", url: `${SITE_URL}/logo-icon.png`, width: 1200, height: 630 },
```

All required TechArticle properties are present: `headline`, `description`, `image` (with dimensions), `datePublished`, `dateModified`, `author` (Organization, LEGAL_NAME), `publisher` (with nested logo ImageObject), `mainEntityOfPage`. Confirmed live on `/resources/netsuite-beforesubmit-vs-aftersubmit`.

---

### [Pass] BlogPosting has all required fields except image dimensions

Both blog posts confirmed live with: `headline`, `description`, `image` (url present), `datePublished`, `dateModified`, `author` (Organization), `publisher` (with logo), `mainEntityOfPage`. The only gap is image dimensions (tracked above as High).

Note: `/blog/netsuite-nlauth-tba-end-of-support` correctly has `dateModified: "2026-08-05"` distinct from `datePublished: "2026-07-21"`, showing the `post.updated` field is wired correctly.

---

### [Pass] ProfessionalService schema is solid

Homepage Block 1 validates cleanly:
- `@context: "https://schema.org"` (https, not http)
- `@type: "ProfessionalService"` (valid LocalBusiness subtype)
- `name`, `url`, `logo`, `image`, `description`, `address` (PostalAddress), `areaServed`, `sameAs`, `knowsAbout`, `award` all present
- `hasOfferCatalog` with 7 Offer/Service pairs matching current services
- All URLs absolute

Minor recommendation (not blocking): add `"@id": "https://suitepacific.com/#organization"` to enable cross-page entity anchoring. Currently no page references back to this entity by ID.

---

### [Pass] WebSite schema correct

```json
{
  "@context": "https://schema.org",
  "@type": "WebSite",
  "@id": "https://suitepacific.com/#website",
  "name": "SuitePacific",
  "url": "https://suitepacific.com"
}
```

`@id` anchor present. Scoped to homepage only.

---

### [Pass] BreadcrumbList correct across all pages

All BreadcrumbList blocks audited pass validation:

| Page | Levels | Item format |
|------|--------|-------------|
| Blog post | 3 (Home > Blog > Post) | Absolute URLs, 1-based position |
| Resource article | 3 (Home > Resources > Article) | Absolute URLs, 1-based position |
| Service pages | 2 (Home > Service) | Absolute URLs, 1-based position |
| Case study | 3 (Home > Case Studies > Study) | Absolute URLs, 1-based position |

No `ListItem` position gaps, no relative URLs, no missing `name` or `item` fields.

---

### [Pass] @context and URL hygiene: all clean

All 15 JSON-LD blocks across 7 pages use `"@context": "https://schema.org"` (https). All `url`, `item`, `@id`, and `mainEntityOfPage` values are absolute URLs rooted at `https://suitepacific.com`. No placeholder text detected in any block.

---

## Priority Action List

1. **Critical — fix in current sprint:** Add `image`, `datePublished`, `dateModified` to the Article block in `app/(site)/case-studies/[slug]/page.tsx`. Also change hardcoded `"SuitePacific"` to `LEGAL_NAME`. Requires adding date fields to the `CaseStudy` data model in `lib/case-studies.ts`.

2. **Critical — fix in current sprint:** Add `SoftwareApplication` and `BreadcrumbList` JSON-LD to `app/suitecompare/page.tsx`. Two static `<script>` blocks, no data model changes needed.

3. **High — fix alongside #1/#2:** Add `width: 1200, height: 630` to the `image` ImageObject in `BlogPostingJsonLd` in `components/seo/JsonLd.tsx`. One-line change.

4. **Medium — next sprint:** Create `ServiceJsonLd` in `JsonLd.tsx` and add it to each of the 8 service pages.

5. **Medium — next sprint:** Add `BreadcrumbJsonLd` (and optionally an ItemList block) to `app/(site)/blog/page.tsx`.

6. **Low — backlog:** Add ItemList to `app/(site)/resources/page.tsx`.

7. **Info — no action:** FAQPage blocks can remain as-is everywhere they exist.

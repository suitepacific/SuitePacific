# SuitePacific — Claude Instructions

## Content Rules
- All article content (blogs, resources) must come strictly from official NetSuite release notes or verified NetSuite documentation. No hallucinated steps, no invented navigation paths.
- No em dashes (`—`) anywhere on the site, in posts, content files, or code comments. Use contextually appropriate punctuation instead:
  - After a bold label in a list (`**Label** — description`): use a colon (`**Label:** description`)
  - In a step or section heading (`## Step 1 — Title`): use a colon (`## Step 1: Title`)
  - Mid-sentence as a parenthetical aside: use a comma (`, `)
  - At a clause boundary (stronger break): use a semicolon (`;`)
  - In code comments (`.ts`, `.tsx`, `.md`): use a regular hyphen (` - `) or colon
  - This applies to all TSX files, markdown content, string literals visible to users, and inline code comments.
- Never add author pages, team pages, named Person schema, or anything that reveals who is behind SuitePacific.

## Development Rules

### Mobile-first responsiveness (applies to every page, component, and feature)
Build every UI mobile-first. Before shipping any page or component:
- Base styles target mobile (< 640px). Responsive breakpoints (`sm:`, `lg:`) scale up.
- No fixed pixel widths (`min-w-[500px]`, `w-[600px]`) without an `overflow-x-auto` wrapper.
- Grids default to `grid-cols-1` on mobile. Add `sm:grid-cols-2`, `lg:grid-cols-3` etc. as columns are added.
- Padding and gap must scale: `px-4 sm:px-6 lg:px-8`, `gap-4 sm:gap-6 lg:gap-10` — not fixed large values.
- Comparison tables with 3+ columns must stack vertically on mobile (`grid-cols-1 sm:grid-cols-3`) — never use `min-w` that hides columns.
- Absolutely-positioned decorative elements must be hidden on mobile (`hidden sm:block`) if they extend beyond the viewport edge.
- Prose/markdown content must be wrapped in `overflow-x-auto` so any tables scroll on mobile.
- Flex rows that don't wrap must collapse on mobile: `flex-col sm:flex-row`.

### Conversion
- All blog and resource pages have an inline `LeadFormLight` callout before the article content (catches readers at 0% scroll) and a second `LeadFormLight` at the bottom.
- The hire-netsuite-developer page uses the full `LeadForm` inline at the bottom — no button linking away to /contact.

### Blog and resources
- Blog posts live in `content/blog/*.md` (file-based, no DB seed needed).
- Resources live in `content/resources/*.md` (file-based).
- Adding content = committing a `.md` file. No other steps required.

### Navigation
- Nav is simplified to 5 items: Services, Case Studies, Resources, Blog, Products.
- Products is a dropdown (`children` array in `NAV_LINKS`). Current entries: SuiteCompare, NetSuite Care. Add new products here, not as top-level links.
- `NavLink` in `lib/types.ts` is a discriminated union — items either have `href` or `children`, never both.

### SuiteCompare
- Launched to production 2026-07-19. Treat like any other feature in the monorepo.
- Session auth uses `SC_SESSION_SECRET` env var — must be set in Vercel production.
- Session cookie is set at `path: "/"` (not `/suitecompare`) so it is shared with Import Doctor. Do not narrow it back.
- Rate limiting and auth for `/api/sc/*` routes is handled in `middleware.ts` (20 req/min per IP + valid session required). Do not add separate auth inside individual route handlers under `/api/sc/`.

### SuiteCompare — AI Summary Panel
- Route: `app/api/sc/summarize/route.ts`. Uses Groq (`llama-3.3-70b-versatile`) via Vercel AI SDK (`streamText` + `toTextStreamResponse`).
- Requires `GROQ_API_KEY` env var in Vercel production. Free tier: 14,400 req/day, 30 req/min.
- 6 modes: `explain_left`, `explain_right`, `functional`, `explain_diff`, `risk`, `migration`, `release_notes`.
- Client streams plain text — no data-stream format, no `0:` prefix. `AiSummaryPanel.tsx` reads chunks directly.
- No model branding anywhere in UI. No "Powered by Llama", no "ChatGPT", no AI company names.
- Inline markdown renderer in `AiSummaryPanel.tsx` handles: `**bold**`, backtick code, `* - +` bullets, `1.` numbered lists, and `#`/`##`/`###`/`####` headings. No external markdown library.

### Import Doctor
- Product at `/importDetector`. Reuses SuiteCompare's auth, org, and NetSuite account data model (`ScUser`, `ScOrg`, `ScNetSuiteAccount`, `ScEnvironment`). One login covers both products.
- NetSuite OAuth signing shared via `lib/sc-netsuite.ts` (`oauthHeader`, `nsBase`). Import Doctor's own NetSuite calls live in `lib/id-netsuite.ts`.
- Gated in `middleware.ts` by `SC_SESSION_COOKIE`, redirecting to `/suitecompare/login` if unauthenticated.
- Phase 0 shipped 2026-07-25: connection test + CSV upload preview. Phase 1 (Customer/Item reference-key validator) is next.
- Do not build a separate login, separate org model, or separate TBA signing for Import Doctor — it all shares SuiteCompare's infrastructure.

---

## Zero-Error Audit Protocol

This protocol is MANDATORY. Apply every checklist in full on every audit and every new page build. No item is optional. No item is skipped because it seems unlikely to apply.

### A. New page checklist (run on every new TSX page before committing)

**Route**
- [ ] Parent route has an index `page.tsx`. Run: `find app/\(site\) -type d | while read d; do [ $(find "$d" -mindepth 1 -maxdepth 1 -type d | wc -l) -gt 0 ] && [ ! -f "$d/page.tsx" ] && echo "MISSING: $d"; done`
- [ ] URL slug matches the page's primary keyword target
- [ ] Page is reachable (no 404) after deploy

**Metadata**
- [ ] `title` is 50-60 characters
- [ ] `description` is 150-160 characters (Bing flags outside this range as an error)
- [ ] `alternates: { canonical: "/slug" }` is set
- [ ] `openGraph` title and description are present

**Schema**
- [ ] All date fields use ISO 8601 with timezone (`2026-08-12T00:00:00+00:00`), never bare date strings
- [ ] `ServiceJsonLd` pricing values are integers, not strings
- [ ] `BreadcrumbJsonLd` is present and reflects actual URL depth

**Content**
- [ ] No em dashes anywhere in the file
- [ ] No bare apostrophes in JSX text nodes (use `&apos;`)
- [ ] Mobile-first: grids start `grid-cols-1`, tables in `overflow-x-auto`

**Internal linking**
- [ ] Page links out to at least 2 relevant internal pages
- [ ] At least 1 existing page links in to this new page
- [ ] If the page is a child (e.g. `/industries/construction`), the parent index page (`/industries`) links to it

**GEO (blog posts and service pages)**
- [ ] First paragraph opens with a definition sentence ("X refers to..." or "X is...")
- [ ] QA block present, 134-167 words
- [ ] At least one H2 is phrased as a question
- [ ] At least one comparison table present
- [ ] `llms.txt` updated with the new URL

### B. Full site audit checklist (run when doing any site-wide audit)

**Routes**
- [ ] Every directory with child routes has its own `page.tsx` index
- [ ] No route returns 404 that should be a real page
- [ ] Sitemap includes all public pages

**Meta descriptions**
- [ ] All pages have descriptions between 150-160 characters
- [ ] Run: `grep -r "description:" app/\(site\) --include="*.tsx" -A1 | grep '"' | awk '{print length, $0}' | sort -rn | head -20`

**Schema**
- [ ] No bare date strings in any `uploadDate`, `datePublished`, or `dateModified` fields
- [ ] All `VideoObject` schemas have timezone-aware `uploadDate`
- [ ] No deprecated schema types (HowTo, FAQPage for rich results)

**Internal linking**
- [ ] Every service page links to at least 2 relevant blog posts
- [ ] Every blog post links to at least 1 relevant service page
- [ ] Every industry hub page links to relevant service pages
- [ ] No page is an orphan (zero inbound internal links)
- [ ] Sibling pages in the same topic cluster cross-link to each other

**Content**
- [ ] All blog post QA blocks are 134-167 words (count precisely)
- [ ] All blog posts have a "Related reading" section with internal links

**Technical**
- [ ] `robots.txt` allows all AI crawlers (GPTBot, ClaudeBot, PerplexityBot, OAI-SearchBot, anthropic-ai)
- [ ] `llms.txt` is current with all pages

### C. Post-deploy checklist (after every push to main)

- [ ] Request indexing in Google Search Console for all new/changed URLs
- [ ] Request indexing in Bing Webmaster Tools for all new/changed URLs
- [ ] Verify no Vercel build errors in deployment log
- [ ] Spot-check 1-2 new pages live in browser (mobile and desktop)

### Protocol rule

If any checklist item cannot be verified during an audit, flag it explicitly as unverified rather than skipping it. "I did not check X" is acceptable. Silently skipping X is not.

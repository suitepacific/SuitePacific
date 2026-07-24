# SuitePacific — Claude Instructions

## Content Rules
- All article content (blogs, resources) must come strictly from official NetSuite release notes or verified NetSuite documentation. No hallucinated steps, no invented navigation paths.
- No em dashes anywhere on the site or in posts.
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

### SuiteCompare
- Launched to production 2026-07-19. Treat like any other feature in the monorepo.
- Session auth uses `SC_SESSION_SECRET` env var — must be set in Vercel production.

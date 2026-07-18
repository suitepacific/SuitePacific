# SuitePacific Internal Linking Map
**Date:** 2026-07-06  
**Purpose:** Track all internal links across the site, identify gaps, and ensure authority flows to commercial pages

---

## Link Hierarchy

```
TIER 1 — Convert (pages that generate leads)
  /hire-netsuite-developer          ← NEW pillar page
  /netsuite-post-go-live-support
  /netsuite-consulting-services     ← MISSING — create next

TIER 2 — Service Pages (receive links from blogs + link to Tier 1)
  /netsuite-suitescript-development
  /netsuite-workflow-automation
  /netsuite-saved-searches-dashboards
  /netsuite-advanced-pdf-templates
  /netsuite-account-optimization
  /netsuite-integration-services    ← MISSING — create next

TIER 3 — Blog Posts (receive links from other blogs + link UP to Tier 2)
  suitescript-best-practices
  netsuite-user-event-vs-client-script
  netsuite-script-governance-limit  ← NEW
  workflow-automation-mistakes
  netsuite-account-performance
  netsuite-optimization
  netsuite-month-end-close-checklist
  netsuite-saved-search-tips
  netsuite-saved-search-examples
  netsuite-post-go-live-checklist
  advanced-pdf-template-mistakes

TIER 4 — Comparison Pages (mid-funnel, link to Tier 1)
  /netsuite-implementation-partner-vs-managed-support
  /netsuite-freelancer-vs-consulting-firm  ← MISSING
```

---

## Current Link Map (As-Built)

### Service Page → Blog Post Links

| Service Page | Links To | Notes |
|---|---|---|
| /netsuite-suitescript-development | suitescript-best-practices ✅ | |
| /netsuite-suitescript-development | netsuite-user-event-vs-client-script ✅ (indirect) | Via best practices |
| /netsuite-suitescript-development | netsuite-script-governance-limit ✅ | Added today |
| /netsuite-suitescript-development | /netsuite-post-go-live-support ✅ | |
| /netsuite-suitescript-development | /hire-netsuite-developer ✅ | Added today |
| /netsuite-workflow-automation | workflow-automation-mistakes ✅ | |
| /netsuite-workflow-automation | /netsuite-suitescript-development ✅ | |
| /netsuite-saved-searches-dashboards | netsuite-saved-search-tips ✅ | |
| /netsuite-advanced-pdf-templates | advanced-pdf-template-mistakes ✅ | |
| /netsuite-account-optimization | netsuite-account-performance ✅ | |
| /netsuite-post-go-live-support | /netsuite-implementation-partner-vs-managed-support ✅ | |
| /netsuite-post-go-live-support | /hire-netsuite-developer ✅ | Added today |

### Blog Post → Service Page Links

| Blog Post | Links To | Notes |
|---|---|---|
| suitescript-best-practices | /netsuite-suitescript-development ✅ | |
| suitescript-best-practices | workflow-automation-mistakes ✅ | Blog-to-blog |
| suitescript-best-practices | netsuite-user-event-vs-client-script ✅ | Blog-to-blog |
| netsuite-user-event-vs-client-script | /netsuite-suitescript-development ✅ | |
| netsuite-user-event-vs-client-script | /contact ✅ | |
| netsuite-user-event-vs-client-script | suitescript-best-practices ✅ | |
| workflow-automation-mistakes | /netsuite-workflow-automation ✅ | |
| workflow-automation-mistakes | netsuite-account-performance ✅ | |
| netsuite-account-performance | /netsuite-account-optimization ✅ | |
| netsuite-optimization | /netsuite-account-optimization ✅ | |
| netsuite-optimization | workflow-automation-mistakes ✅ | |
| netsuite-optimization | suitescript-best-practices ✅ | |
| netsuite-month-end-close-checklist | /netsuite-post-go-live-support ✅ | |
| netsuite-month-end-close-checklist | /netsuite-saved-searches-dashboards ✅ | |
| netsuite-month-end-close-checklist | /netsuite-workflow-automation ✅ | |
| netsuite-script-governance-limit | suitescript-best-practices ✅ | NEW |
| netsuite-script-governance-limit | netsuite-user-event-vs-client-script ✅ | NEW |
| netsuite-script-governance-limit | /netsuite-suitescript-development ✅ | NEW |

### Footer Links
| Footer Column | Links |
|---|---|
| Services | All 6 service pages ✅ |
| Resources | Blog, Case Studies, FAQ, **Hire a NetSuite Developer ✅ ADDED**, Post-Go-Live Guide, Comparison |
| Company | About, Why SuitePacific, Recent Work |

---

## Missing Links (Priority Order)

### Priority 1: Add Immediately

| Add This Link | On This Page | Anchor Text | Why |
|---|---|---|---|
| /hire-netsuite-developer | /netsuite-implementation-partner-vs-managed-support | hire a NetSuite developer | High-intent page, should flow to hire CTA |
| /netsuite-account-optimization | netsuite-account-performance blog | account optimization service | Blog → service conversion |
| suitescript-best-practices | netsuite-script-governance-limit blog | SuiteScript best practices | Cross-link related posts |
| /hire-netsuite-developer | /netsuite-workflow-automation | hire a NetSuite developer | Workflow page lacks hire link |
| /hire-netsuite-developer | /netsuite-account-optimization | hire a NetSuite developer | Optimization page lacks hire link |

### Priority 2: Add with Content Expansion

| Add This Link | On This Page | Anchor Text | Why |
|---|---|---|---|
| netsuite-script-governance-limit | suitescript-best-practices | governance limit errors | Retroactive link to new post |
| /netsuite-integration-services | /netsuite-suitescript-development | integration services | Once page is created |
| /netsuite-consulting-services | /hire-netsuite-developer | NetSuite consulting services | Once page is created |

---

## Link Rules

1. Every blog post must link to at least 1 service page (conversion path)
2. Every service page must link to at least 2 blog posts (support authority)
3. Every page must link to /hire-netsuite-developer or /netsuite-post-go-live-support (conversion tier)
4. No orphan pages — every new page gets at least 2 inbound links before publishing
5. Anchor text: use descriptive keyword-rich anchors, not "click here" or "learn more"
6. Maximum 3 links in a blog post paragraph — don't over-link

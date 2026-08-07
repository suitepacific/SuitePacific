# Semantic Topic Cluster Analysis: SuitePacific

**Audit date:** 2026-08-07
**Scope:** 39 blog posts, 30 resource pages, 12 service hub pages
**Methodology:** Frontmatter extraction from all 39 blog `.md` files, internal link graph
traversal from source, SERP sampling for 6 keyword pairs, hub page source inspection for
outbound spoke links.

---

## 1. Cluster Map

Seven topic clusters are identifiable from the 39 blog posts. Two clusters (FSM, 2026.2
Release Notes) lack a dedicated hub page. Posts marked `[cross-cluster]` belong semantically
to two clusters and carry bidirectional service page links to both.

### Cluster 1: SuiteScript Development

**Hub:** `/netsuite-suitescript-development`
**Cluster health:** Strong spoke count, thin hub outbound coverage

| Post slug | Spoke-to-hub | Hub-to-spoke | Notes |
|---|---|---|---|
| suitescript-best-practices | Yes | Yes | Anchor spoke |
| netsuite-user-event-vs-client-script | Yes | No | Hub missing outbound link |
| netsuite-map-reduce-script-guide | Yes | Yes | |
| netsuite-script-governance-limit | Yes | Yes | |
| netsuite-workflow-vs-suitescript | Yes (+ workflow hub) | No | Cross-cluster |
| netsuite-nlauth-tba-end-of-support | No (-> integrations) | No | Belongs in integrations cluster |
| netsuite-suiteql-bound-parameters | No (-> resource only) | No | Missing service link |
| netsuite-suiteql-sort-change-2026-2 | No (-> /contact only) | No | Orphaned from hub |
| netsuite-advanced-pdf-data-model | Wrong hub linked | Yes | Links to suitescript, should link to PDF hub |

**Hub outbound gaps:** user-event-vs-client-script, workflow-vs-suitescript, suiteql posts,
nlauth-tba, restlet-vs-rest.

---

### Cluster 2: Workflow Automation

**Hub:** `/netsuite-workflow-automation`
**Cluster health:** Complete for current spokes; thin at 3 posts

| Post slug | Spoke-to-hub | Hub-to-spoke | Notes |
|---|---|---|---|
| workflow-automation-mistakes | Yes | Yes | Anchor spoke |
| netsuite-approval-workflow-setup | Yes | Yes | |
| netsuite-workflow-vs-suitescript | Yes (+ suitescript hub) | Yes | Cross-cluster |
| netsuite-sales-order-fulfillment-list | Yes | No | Tangential; order mgmt angle |

**Hub outbound gaps:** sales-order-fulfillment-list not linked from hub.

---

### Cluster 3: Advanced PDF Templates

**Hub:** `/netsuite-advanced-pdf-templates`
**Cluster health:** Correct 3-post cluster; hub outbound links are incomplete

| Post slug | Spoke-to-hub | Hub-to-spoke | Notes |
|---|---|---|---|
| advanced-pdf-template-mistakes | Yes | Yes | Anchor spoke |
| netsuite-freemarker-pdf-guide | Yes | No | Hub missing outbound link |
| netsuite-advanced-pdf-data-model | No (links to wrong hub) | Yes | Links to /netsuite-suitescript-development; should link to PDF hub |

**Hub outbound gaps:** freemarker-pdf-guide missing from hub.
**Wrong link:** netsuite-advanced-pdf-data-model links to `/netsuite-suitescript-development`
instead of `/netsuite-advanced-pdf-templates`. Hub correctly points to it; spoke does not
reciprocate.

---

### Cluster 4: Saved Searches and Dashboards

**Hub:** `/netsuite-saved-searches-dashboards`
**Cluster health:** Healthy; all bidirectional links confirmed

| Post slug | Spoke-to-hub | Hub-to-spoke | Notes |
|---|---|---|---|
| netsuite-saved-search-tips | Yes | Yes | Anchor spoke |
| netsuite-saved-search-examples | Yes | Yes | |
| netsuite-saved-search-formula-examples | Inferred Yes | Yes | Hub links to it; pattern matches |

SERP overlap observation: "netsuite saved search tips" and "netsuite saved search examples"
share at least 3 top-10 URLs (Cleverence, NetSuite.com, SuitePacific's own tips post appears
in both). Estimated overlap score: 4-5. These belong in the same cluster and are correctly
grouped.

---

### Cluster 5a: Post-Go-Live Support

**Hub:** `/netsuite-post-go-live-support`
**Cluster health:** Strong; hub missing 1 newer spoke

| Post slug | Spoke-to-hub | Hub-to-spoke | Notes |
|---|---|---|---|
| netsuite-post-go-live-checklist | Yes | Yes | Anchor spoke |
| signs-netsuite-support-not-working | Yes | Yes | |
| netsuite-month-end-close-checklist | Yes | Yes | |
| netsuite-support-partner-evaluation | Yes | No | Newer post; hub not yet updated |

**2026.2 release posts routed here (not a dedicated cluster):**
netsuite-bank-reconciliation-changes-2026-2, netsuite-bill-capture-preferences-2026-2,
netsuite-payment-adjustments-2026-2, netsuite-payment-runs-2026-2,
netsuite-project-health-indicators-2026-2, netsuite-advanced-record-customization-2026-2
all link to this hub. Hub does not link back to any of them.

---

### Cluster 5b: Account Optimization

**Hub:** `/netsuite-account-optimization`
**Cluster health:** Thin; 2 spokes, hub missing one

| Post slug | Spoke-to-hub | Hub-to-spoke | Notes |
|---|---|---|---|
| netsuite-account-performance | Yes | Yes | Anchor spoke |
| netsuite-optimization | Yes | No | Hub not updated to include this post |

---

### Cluster 6: Integrations

**Hub:** `/netsuite-integrations`
**Cluster health:** Moderate; hub-to-spoke links complete, but cluster is thin

| Post slug | Spoke-to-hub | Hub-to-spoke | Notes |
|---|---|---|---|
| netsuite-nlauth-tba-end-of-support | Yes | Yes | Also links to /hire-netsuite-developer |
| netsuite-restlet-vs-rest-web-services | Yes | Yes | |
| netsuite-rest-batch-sequential | Yes | Yes | |

---

### Cluster 7: Field Service Management (NO HUB PAGE)

**Hub:** None
**Cluster health:** 4 posts with nowhere to link except /contact

| Post slug | Spoke-to-hub | Hub-to-spoke | Notes |
|---|---|---|---|
| netsuite-fsm-bundle-update-august-2026 | No hub | N/A | Links to /contact only |
| netsuite-fsm-mobile-changes-august-2026 | No hub | N/A | Links to /contact only |
| netsuite-fsm-nxc-now-migration-august-2026 | No hub | N/A | Links to /contact only |
| netsuite-fsm-readonly-migration-august-2026 | No hub | N/A | Links to /contact only |

These posts share high topical coherence (all August 2026 bundle update coverage) but have
no internal destination beyond the contact form. Zero link equity flows to any service page.

---

### Unclustered: 2026.2 Release Notes (NO DEDICATED HUB)

11 posts cover individual 2026.2 features but no hub post exists to aggregate them:

| Post slug | Routes to |
|---|---|
| netsuite-2026-2-finance-updates | /contact only |
| netsuite-bank-reconciliation-changes-2026-2 | /netsuite-post-go-live-support |
| netsuite-bill-capture-preferences-2026-2 | /netsuite-post-go-live-support |
| netsuite-payment-adjustments-2026-2 | /netsuite-post-go-live-support |
| netsuite-payment-runs-2026-2 | /netsuite-post-go-live-support |
| netsuite-passkey-second-factor-2026-2 | /netsuite-administrator-support |
| netsuite-project-health-indicators-2026-2 | /netsuite-post-go-live-support |
| netsuite-advanced-record-customization-2026-2 | /netsuite-post-go-live-support |
| netsuite-currency-context-custom-fields | Resource only, no service page |
| netsuite-suitetax-term-discounts | Resource only, no service page |
| netsuite-sales-order-fulfillment-list | /netsuite-workflow-automation |

The finance summary post (netsuite-2026-2-finance-updates) is the natural hub candidate for
this group but currently sends traffic to /contact rather than linking to a service page or
aggregating the feature posts.

---

## 2. Hub Page Mapping

| Service hub | Supported by blog posts | Hub links back to blog | Gap rating |
|---|---|---|---|
| /netsuite-suitescript-development | 4 confirmed bidirectional spokes; 5 additional spoke-to-hub | 4 of ~9 eligible posts | Partial gap |
| /netsuite-workflow-automation | 3 confirmed bidirectional; 1 tangential | 3 of 4 | Healthy |
| /netsuite-advanced-pdf-templates | 1 bidirectional; 2 partial | 1 of 3 | Partial gap |
| /netsuite-saved-searches-dashboards | 3 bidirectional | 3 of 3 | Healthy |
| /netsuite-post-go-live-support | 3 bidirectional + 6 inbound-only from 2026.2 posts | 3 of ~10 relevant | Partial gap |
| /netsuite-account-optimization | 1 bidirectional; 1 spoke-to-hub only | 1 of 2 | Thin |
| /netsuite-integrations | 3 bidirectional | 3 of 3 | Healthy |
| /netsuite-administrator-support | 1 spoke-to-hub (passkey post) | 0 | Gap |
| /netsuite-consulting-services | 0 | 0 | Complete gap |
| /hire-netsuite-developer | 1 cross-reference (nlauth post) | 0 | Complete gap |
| /netsuite-admin-support-small-business | 0 | 0 | Complete gap |
| /netsuite-implementation-partner-vs-managed-support | 0 | 0 | Complete gap |

---

## 3. Content and Hub Gaps

### Gap A: FSM has 4 posts, no service page

Four FSM posts were published in July-August 2026 covering the 2026.07.1 bundle update.
None link to a service page. Link equity from these posts (which have genuine search interest
for "netsuite FSM" queries) flows nowhere useful. Options:

- Create a `/netsuite-field-service-management` or `/netsuite-fsm-support` service page
  that the 4 posts can link to.
- Alternatively, link FSM posts to `/netsuite-administrator-support` as the closest
  existing proxy while a dedicated page is developed.

### Gap B: 2026.2 cluster lacks a hub post

11 feature posts cover 2026.2 changes. No hub post exists for "netsuite 2026.2 release
notes" which has real search volume. The summary post (netsuite-2026-2-finance-updates)
covers only the finance subset and sends users to /contact. A proper hub post would:

- Target "netsuite 2026.2 release notes" / "netsuite 2026.2 what's new"
- Link out to all 11 feature posts
- Link back to /netsuite-post-go-live-support and /netsuite-consulting-services
- Allow 11 feature posts to link back to it instead of /contact

### Gap C: /netsuite-consulting-services has zero blog support

No blog post targets queries like "netsuite consulting services", "netsuite consultant",
"how to choose a netsuite consultant", or "netsuite managed services". This page receives
no link equity from editorial content. It is also the most commercially valuable page on
the site for top-of-funnel consulting leads.

### Gap D: /hire-netsuite-developer has one indirect mention

Only the nlauth-tba-end-of-support post cross-references this page. No post is written
specifically to support "hire netsuite developer" queries, which are high-intent commercial
terms.

### Gap E: /netsuite-administrator-support is under-linked

Only the passkey-second-factor-2026-2 post links here. The 11 2026.2 feature posts that
are admin-facing (record customization, currency fields, bill capture, SuiteTax) link to
/netsuite-post-go-live-support instead. /netsuite-administrator-support receives almost no
link signal from editorial content.

### Gap F: /netsuite-account-optimization hub outbound links are thin

The hub links to netsuite-account-performance but not to netsuite-optimization. The account
optimization cluster is the thinnest properly-structured cluster with only 2 posts.

---

## 4. Cannibalization Risks

### Risk 1: netsuite-optimization vs netsuite-account-performance (HIGH)

Both posts target the "slow/broken NetSuite account" SERP space.

- netsuite-account-performance: "Why Your NetSuite Account Feels Slow (and What Actually
  Fixes It)" - diagnostic framing, informational intent
- netsuite-optimization: "NetSuite Account Optimization: What to Audit and Fix on a Live
  Account" - prescriptive framing, commercial intent

SERP check: "netsuite slow account performance fix optimization" returns the same competitor
set for both queries: Kimberlite, Coefficient, DeveloperStroop, Stockton10. SuitePacific's
account-performance post appears in this SERP. Both posts likely compete for the same page
1 slot on "netsuite account slow" variants.

**Mitigation:** The intent separation (diagnostic vs. audit) is real but thin. Ensure the
title and H1 of each post makes the distinction explicit. netsuite-account-performance
should own "why is netsuite slow"; netsuite-optimization should own "netsuite account audit"
or "netsuite optimization checklist". Both should cross-link to each other rather than
competing for the same anchor text at the service page.

---

### Risk 2: signs-netsuite-support-not-working vs netsuite-support-partner-evaluation (MODERATE)

Both target the "bad netsuite partner" and "switch netsuite partner" SERP space.

- signs-netsuite-support-not-working: problem-aware content (8 failure signs)
- netsuite-support-partner-evaluation: solution-aware content (how to evaluate a new partner)

SERP check: "signs netsuite support not working partner evaluation" returns CrossCountry,
OpenTeq, TheVested, SuiteCentric - all of which cover both angles in the same post. Google
may conflate the two SuitePacific posts.

**Mitigation:** The buyer journey differentiation is legitimate. Ensure the two posts link
to each other with directional anchor text ("if you've identified the problem, here's how
to evaluate a replacement" and vice versa). Monitor search console for keyword overlap
between these two URLs.

---

### Risk 3: netsuite-suiteql-bound-parameters blog vs resource (MILD)

- Blog: "Bound Parameters in NetSuite REST SuiteQL: What They Are and Why You Should Use Them"
- Resource: "How to Use Bound Parameters in NetSuite REST SuiteQL"

The blog post already links to the resource page. Intent differentiation (awareness vs.
how-to) is clear. No action needed beyond ensuring the blog post does not rank for
"how to use" queries that the resource page should own.

---

### Risk 4: netsuite-rest-batch-sequential blog vs resource (MILD)

Same pattern as Risk 3. Blog explains the feature, resource shows the steps. Blog links to
resource. Acceptable.

---

### Risk 5: netsuite-saved-search-tips vs netsuite-saved-search-examples (MILD)

SERP overlap is 4-5 shared URLs. The posts are distinct (best practices vs. templates) but
close enough that Google could choose either for a "netsuite saved search" query.

**Mitigation:** Already cross-linked. Confirm that the formula-examples post is also
cross-linked. No consolidation needed; the three posts collectively own more SERP real
estate than one combined post would.

---

## 5. Internal Linking Assessment

### Posts with no service page link (link equity dead-ends)

These 8 posts reach a dead-end at /contact or a resource page without passing equity to any
service hub:

| Post | Missing link | Recommended target |
|---|---|---|
| netsuite-fsm-bundle-update-august-2026 | Service page | /netsuite-administrator-support (interim) |
| netsuite-fsm-mobile-changes-august-2026 | Service page | /netsuite-administrator-support (interim) |
| netsuite-fsm-nxc-now-migration-august-2026 | Service page | /netsuite-administrator-support (interim) |
| netsuite-fsm-readonly-migration-august-2026 | Service page | /netsuite-administrator-support (interim) |
| netsuite-suiteql-bound-parameters | Service page | /netsuite-suitescript-development |
| netsuite-suiteql-sort-change-2026-2 | Service page | /netsuite-suitescript-development |
| netsuite-currency-context-custom-fields | Service page | /netsuite-administrator-support |
| netsuite-suitetax-term-discounts | Service page | /netsuite-administrator-support or /netsuite-post-go-live-support |

### Posts linked to the wrong hub

| Post | Current link | Correct link |
|---|---|---|
| netsuite-advanced-pdf-data-model | /netsuite-suitescript-development | /netsuite-advanced-pdf-templates |
| netsuite-2026-2-finance-updates | /contact | /netsuite-post-go-live-support or /netsuite-consulting-services |

### Hub pages not linking back to known spokes

| Hub | Missing outbound links to blog |
|---|---|
| /netsuite-suitescript-development | user-event-vs-client-script, workflow-vs-suitescript, suiteql posts |
| /netsuite-advanced-pdf-templates | freemarker-pdf-guide |
| /netsuite-post-go-live-support | netsuite-support-partner-evaluation |
| /netsuite-account-optimization | netsuite-optimization |
| /netsuite-administrator-support | passkey-second-factor-2026-2 (links to hub; hub does not return the link) |
| /netsuite-consulting-services | No blog links at all |
| /hire-netsuite-developer | No blog links at all |

### Posts with strong bidirectional linking (benchmark)

These posts demonstrate the correct hub-spoke pattern and can serve as the template for
fixing gaps:

- suitescript-best-practices <-> /netsuite-suitescript-development
- workflow-automation-mistakes <-> /netsuite-workflow-automation
- netsuite-saved-search-tips <-> /netsuite-saved-searches-dashboards
- netsuite-post-go-live-checklist <-> /netsuite-post-go-live-support
- netsuite-nlauth-tba-end-of-support <-> /netsuite-integrations

---

## 6. Recommended New Blog Posts

Five posts that would close the most impactful content gaps:

### New Post 1: "NetSuite 2026.2: Full Release Notes Summary"
**Priority:** High
**Target hub:** No dedicated hub exists; this post becomes the hub for the 11 feature posts
**Intent:** Informational (release awareness) with commercial CTA to post-go-live support
**Rationale:** "netsuite 2026.2 release notes" and "netsuite 2026.2 what's new" have real
search volume. 11 existing feature posts would link back to this hub instead of /contact.
The summary post (netsuite-2026-2-finance-updates) covers only finance; this new post covers
all 11 2026.2 topics and links to the finance post and all other feature posts.
**Target service page:** /netsuite-post-go-live-support and /netsuite-consulting-services

### New Post 2: "How to Choose a NetSuite Consulting Partner for Long-Term Support"
**Priority:** High
**Target hub:** /netsuite-consulting-services (currently has zero blog support)
**Intent:** Commercial (comparing options, evaluating partners)
**Rationale:** /netsuite-consulting-services is the highest-value service page on the site
and receives zero link equity from editorial content. This post complements the existing
"signs-netsuite-support-not-working" and "netsuite-support-partner-evaluation" posts by
addressing the earlier consideration stage ("what model do I even want?") rather than
the evaluation stage.
**SERP target:** "netsuite consulting partner", "netsuite managed services vs consulting"
**Cross-links to:** netsuite-support-partner-evaluation, signs-netsuite-support-not-working,
netsuite-post-go-live-checklist

### New Post 3: "NetSuite Field Service Management: Administrator Setup and Maintenance Guide"
**Priority:** Medium-High
**Target hub:** No hub page; this post acts as an interim pillar for FSM content
**Intent:** Informational/Commercial (covers setup decisions that lead to support requests)
**Rationale:** 4 FSM posts exist with no internal destination. This pillar post gives them
somewhere to link (mandatory spoke-to-hub links currently impossible). If a
/netsuite-field-service-management service page is created later, this post transitions
into a spoke.
**Immediate action:** Publish this post, then update all 4 FSM posts to link to it.
**Target service page link within post:** /netsuite-administrator-support

### New Post 4: "NetSuite Integration Options: When to Use SuiteScript, REST, RESTlet, or a Platform"
**Priority:** Medium
**Target hub:** /netsuite-integrations
**Intent:** Commercial (decision guide)
**Rationale:** The integrations hub currently has 3 spokes (nlauth, restlet-vs-rest,
rest-batch-sequential) but no broad decision-guide post covering the full integration
landscape including third-party iPaaS options (Celigo, Boomi). This gap leaves "netsuite
integration options" and "netsuite api options" queries unaddressed. This post would serve
as the cluster's conceptual anchor.
**Cross-links to:** netsuite-restlet-vs-rest-web-services, netsuite-rest-batch-sequential,
netsuite-nlauth-tba-end-of-support

### New Post 5: "NetSuite Workflow Audit: How to Find and Disable Automations That Are Firing Too Often"
**Priority:** Medium
**Target hub:** /netsuite-workflow-automation
**Intent:** Informational with commercial hook (audit reveals need for cleanup work)
**Rationale:** The workflow cluster has only 2 pure workflow posts (automation-mistakes,
approval-workflow-setup). A third post targeting the audit/cleanup angle adds a funnel stage
between "awareness of problems" and "hire someone". The resource page
netsuite-workflow-entry-conditions.md already covers entry conditions; this blog post
addresses the broader question of identifying which workflows are causing performance drag.
**Cross-links to:** workflow-automation-mistakes, netsuite-approval-workflow-setup,
netsuite-account-performance, netsuite-optimization
**Target service page:** /netsuite-workflow-automation

---

## 7. SERP Overlap Observations

Six keyword pairs were searched directly. Observations are documented below. Full pairwise
matrix for 39 posts was not computed (741 pairs); clusters below threshold 4 were flagged
based on topical distance.

| Keyword pair | Shared top-10 URLs (observed) | Assignment |
|---|---|---|
| "netsuite saved search tips" / "netsuite saved search examples" | 3+ (Cleverence, NetSuite.com, SuitePacific tips post) | Same cluster |
| "netsuite slow account performance" / "netsuite account optimization audit" | Same competitor set (Kimberlite, Coefficient, DeveloperStroop, Stockton10) | Same cluster; cannibalization risk flagged |
| "netsuite workflow vs suitescript which to use" / workflow content | Salto, WealthyLike, DeveloperStroop, TheNetSuitePro | Cross-cluster; separate posts warranted |
| "netsuite post go live checklist 90 days" | AnchorGroup, ProteloInc, EpiqInfo, AlphaBold | Same cluster; SuitePacific ranks here |
| "signs netsuite support not working partner evaluation" | CrossCountry, OpenTeq, TheVested, SuiteCentric | Moderate overlap; separate posts acceptable with differentiated titles |
| "netsuite suitescript best practices upgrade safe" | Tvarana, TheNetSuitePro, SuiteScript docs, SuitePacific | Same cluster; SuitePacific ranks at position 7 |

---

## 8. Pre-Delivery Validation Summary

| Check | Status |
|---|---|
| No two posts share the same primary keyword | Pass (minor proximity on optimization vs. account-performance) |
| Every spoke links to pillar (mandatory) | Fail: 8 spokes missing service page links |
| Pillar links to every spoke (mandatory) | Fail: Multiple hubs missing outbound spoke links |
| No orphan pages in link matrix | Fail: 4 FSM posts are functional orphans (only /contact) |
| Template selection matches intent | Pass |
| 2026.2 posts have a hub post | Fail: No hub post exists; finance summary post is incomplete proxy |
| /netsuite-consulting-services has blog support | Fail: Zero spokes |
| FSM cluster has a hub destination | Fail: No hub page |

---

## Summary of Actionable Findings

**Fix immediately (internal link corrections, no new content required):**

1. Update netsuite-advanced-pdf-data-model to link to `/netsuite-advanced-pdf-templates`
   instead of `/netsuite-suitescript-development`.
2. Add service page links to 8 posts currently routing to /contact or resource pages only
   (see Section 5 table; all FSM posts -> /netsuite-administrator-support as interim target,
   suiteql posts -> /netsuite-suitescript-development, currency/suitetax posts ->
   /netsuite-administrator-support).
3. Update netsuite-2026-2-finance-updates to link to `/netsuite-post-go-live-support`.
4. Update hub pages to add missing outbound spoke links: /netsuite-suitescript-development
   (user-event, suiteql posts), /netsuite-advanced-pdf-templates (freemarker guide),
   /netsuite-post-go-live-support (support-partner-evaluation),
   /netsuite-account-optimization (netsuite-optimization post).

**New content to close structural gaps (in priority order):**

1. "NetSuite 2026.2: Full Release Notes Summary" - gives 11 feature posts a hub to link to
2. "How to Choose a NetSuite Consulting Partner" - first spoke for /netsuite-consulting-services
3. "NetSuite FSM: Administrator Setup and Maintenance Guide" - interim pillar for 4 FSM posts
4. "NetSuite Integration Options: When to Use SuiteScript, REST, RESTlet, or a Platform"
5. "NetSuite Workflow Audit: How to Find Automations That Fire Too Often"

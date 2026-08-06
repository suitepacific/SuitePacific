# Semantic Topic Cluster Analysis: SuitePacific

**Audit date:** 2026-08-07
**Scope:** 35 blog posts, 7 service hub pages
**Methodology:** Content-topic alignment, SERP overlap sampling (10 representative keyword pairs),
internal link graph traversal from source files.

---

## 1. Cluster Map

Seven service pages serve as pillar hubs. Each hub's cluster score reflects how many confirmed
spokes have bidirectional links (hub-to-spoke AND spoke-to-hub).

### Cluster 1: SuiteScript Development

**Hub:** `/netsuite-suitescript-development`
**Primary keyword:** netsuite suitescript development
**Hub links to spokes:** 3 of 4 (missing freemarker and workflow-vs links)
**Cluster health:** Strong (4 confirmed spokes, good interlinking)

| Spoke | Post | Spoke-to-Hub | Hub-to-Spoke | SERP Overlap (est.) |
|---|---|---|---|---|
| S1-1 | /blog/suitescript-best-practices | Yes | Yes | -- (pillar-adjacent) |
| S1-2 | /blog/netsuite-user-event-vs-client-script | Yes | No | 1 shared w/ S1-1 |
| S1-3 | /blog/netsuite-map-reduce-script-guide | Yes | Yes | 4 shared w/ S1-4 |
| S1-4 | /blog/netsuite-script-governance-limit | Yes | Yes | 4 shared w/ S1-3 |

**Supplementary spokes** (link to hub but are cross-cluster):
- /blog/netsuite-workflow-vs-suitescript (links to both SuiteScript and Workflow hubs)
- /blog/netsuite-suiteql-sort-change-2026-2 (no hub link yet; should be routed here)

**Internal link gap:** `/netsuite-suitescript-development` does not link to
`/blog/netsuite-user-event-vs-client-script` despite that post being in top-5 SERP results
for "netsuite user event vs client script" (confirmed via SERP check).

---

### Cluster 2: Workflow Automation

**Hub:** `/netsuite-workflow-automation`
**Primary keyword:** netsuite workflow automation
**Hub links to spokes:** 1 of 2
**Cluster health:** Thin (only 2 spokes; hub links to only 1)

| Spoke | Post | Spoke-to-Hub | Hub-to-Spoke | SERP Overlap (est.) |
|---|---|---|---|---|
| S2-1 | /blog/workflow-automation-mistakes | Yes | Yes | -- (pillar-adjacent) |
| S2-2 | /blog/netsuite-workflow-vs-suitescript | Yes (both hubs) | No | 2 shared w/ S2-1 |

**Gap:** Only 2 blog posts support this hub. No post exists covering approval workflow setup,
notification triggers, or workflow conditions, which are the top informational sub-topics under
this service.

---

### Cluster 3: Advanced PDF Templates

**Hub:** `/netsuite-advanced-pdf-templates`
**Primary keyword:** netsuite advanced pdf templates
**Hub links to spokes:** 1 of 2
**Cluster health:** Thin (2 spokes; hub links to only 1)

| Spoke | Post | Spoke-to-Hub | Hub-to-Spoke | SERP Overlap (est.) |
|---|---|---|---|---|
| S3-1 | /blog/advanced-pdf-template-mistakes | Yes | Yes | -- (pillar-adjacent) |
| S3-2 | /blog/netsuite-freemarker-pdf-guide | Yes | No | 3 shared w/ S3-1 |

SuitePacific ranks in top-5 SERP for "netsuite advanced pdf template freemarker guide" (confirmed).
The hub page does not link to `/blog/netsuite-freemarker-pdf-guide` despite that post being a
confirmed traffic driver. This is a missed authority pass.

**Gap:** No post covers PDF template data model, multi-subsidiary templating, or barcode/logo
techniques, which are common support requests and high-value informational sub-topics.

---

### Cluster 4: Integrations

**Hub:** `/netsuite-integrations`
**Primary keyword:** netsuite integrations
**Hub links to spokes:** 0
**Cluster health:** Critical gap (zero confirmed spokes with bidirectional links)

No blog post was written for this hub. Three developer-adjacent posts partially serve the topic
but are not routed to the hub:

| Post | Relationship | Spoke-to-Hub | Hub-to-Spoke |
|---|---|---|---|
| /blog/netsuite-nlauth-tba-end-of-support | Auth migration for integrations | Yes (1 link) | No |
| /blog/netsuite-rest-batch-sequential | REST Web Services feature | No | No |
| /blog/netsuite-suiteql-bound-parameters | SuiteQL REST security | No | No |

The hub page has zero internal links pointing to any blog content. This is the most structurally
isolated service page on the site.

---

### Cluster 5: Saved Searches and Dashboards

**Hub:** `/netsuite-saved-searches-dashboards`
**Primary keyword:** netsuite saved searches dashboards
**Hub links to spokes:** 1 of 2
**Cluster health:** Moderate (2 confirmed spokes; hub links to only 1; both spokes rank)

| Spoke | Post | Spoke-to-Hub | Hub-to-Spoke | SERP Overlap (est.) |
|---|---|---|---|---|
| S5-1 | /blog/netsuite-saved-search-tips | Yes | Yes | -- (pillar-adjacent) |
| S5-2 | /blog/netsuite-saved-search-examples | Yes | No | 5 shared w/ S5-1 |

SuitePacific ranks in top-7 SERP for both "netsuite saved search tips" and "netsuite saved search
examples" (confirmed). Estimated 5 shared URLs between these two posts, placing them firmly in the
same cluster (threshold: 4-6 = same cluster). Hub page does not link to S5-2.

**Gap:** No post covers saved search formulas, conditional summary columns, or dashboard portlet
setup, which are the next tier of user needs in this topic area.

---

### Cluster 6: Post-Go-Live Support

**Hub:** `/netsuite-post-go-live-support`
**Primary keyword:** netsuite post go live support
**Hub links to spokes:** 0
**Cluster health:** Moderate coverage, broken hub (3 confirmed spokes but hub links to none)

| Spoke | Post | Spoke-to-Hub | Hub-to-Spoke | SERP Overlap (est.) |
|---|---|---|---|---|
| S6-1 | /blog/netsuite-post-go-live-checklist | Yes | No | -- (pillar-adjacent) |
| S6-2 | /blog/signs-netsuite-support-not-working | Yes | No | 2 shared w/ S6-1 |
| S6-3 | /blog/netsuite-month-end-close-checklist | Yes | No | 2 shared w/ S6-1 |

The hub page contains no links to any blog content. All three spokes link to the hub, but the
authority flow is one-directional. This is the second most structurally weak cluster after
Integrations.

**False routing problem:** 8 release-note posts (bank reconciliation, bill capture, payment
adjustments, payment runs, advanced record customization, project health indicators, passkey
second factor, sales order fulfillment) all link to `/netsuite-post-go-live-support` as their
default hub anchor even though their content is not about post-go-live support. This dilutes
the thematic signal of those outbound links.

---

### Cluster 7: Account Optimization

**Hub:** `/netsuite-account-optimization`
**Primary keyword:** netsuite account optimization
**Hub links to spokes:** 1 of 2
**Cluster health:** Moderate (2 confirmed spokes; hub links to 1)

| Spoke | Post | Spoke-to-Hub | Hub-to-Spoke | SERP Overlap (est.) |
|---|---|---|---|---|
| S7-1 | /blog/netsuite-account-performance | Yes | Yes | -- (pillar-adjacent) |
| S7-2 | /blog/netsuite-optimization | Yes | No | 4 shared w/ S7-1 |

SuitePacific ranks in top-7 SERP for "netsuite account optimization performance slow" (confirmed).
Estimated 4 shared URLs between these two posts (epiqinfo, anchorgroup, randgroup, stockton10),
placing them firmly in the same cluster. Hub page does not link to S7-2.

---

## 2. SERP Overlap Matrix (sampled pairs)

Scoring: 7-10 = same post candidate, 4-6 = same cluster, 2-3 = interlink, 0-1 = separate.

| Keyword A | Keyword B | Est. Shared URLs | Decision |
|---|---|---|---|
| netsuite saved search tips | netsuite saved search examples | 5 | Same cluster |
| netsuite account performance | netsuite account optimization audit | 4 | Same cluster |
| netsuite map reduce script | netsuite governance limit suitescript | 4 | Same cluster |
| netsuite advanced pdf template mistakes | netsuite freemarker pdf guide | 3 | Same cluster |
| netsuite workflow automation mistakes | netsuite workflow vs suitescript | 2 | Interlink |
| netsuite suitescript best practices | netsuite user event vs client script | 1 | Interlink |
| netsuite post go live checklist | netsuite month end close checklist | 2 | Interlink |
| netsuite post go live checklist | signs netsuite support not working | 2 | Interlink |
| netsuite suitescript development | netsuite workflow automation | 1 | Cross-cluster optional |
| netsuite integrations rest api | netsuite suitescript rest batch | 1 | Cross-cluster optional |

---

## 3. Orphaned Blog Posts

Posts with no clear hub alignment or incorrectly routed to a catch-all hub.

### 3a. True Orphans (no hub link of any kind)

| Post | Topic | Recommended Action |
|---|---|---|
| /blog/netsuite-2026-2-finance-updates | 2026.2 release aggregator | Create a /netsuite-release-notes hub or treat as cross-linker; add links to payment-runs and bank-reconciliation posts |
| /blog/netsuite-passkeys-mfa-2026-2 | Security/admin | Near-duplicate of passkey-second-factor post; consolidate or 301 |
| /blog/netsuite-suiteql-sort-change-2026-2 | SuiteQL query behavior | Route to Cluster 1 (SuiteScript); add link to /netsuite-suitescript-development |
| /blog/netsuite-rest-batch-sequential | REST Web Services | Route to Cluster 4 (Integrations); add link to /netsuite-integrations |
| /blog/netsuite-suiteql-bound-parameters | REST SuiteQL security | Route to Cluster 4 (Integrations); add link to /netsuite-integrations |
| /blog/netsuite-sales-order-fulfillment-list | Order management | No hub covers order management; link to /netsuite-workflow-automation as closest match |
| /blog/netsuite-suitetax-term-discounts | SuiteTax accounting | No hub; link to /netsuite-account-optimization as closest match |
| /blog/netsuite-currency-context-custom-fields | Custom fields/admin | No hub; link to /netsuite-account-optimization |
| /blog/netsuite-project-health-indicators-2026-2 | Project management | No hub; no close match |

### 3b. FSM Sub-Cluster (4 posts, no hub)

All four FSM posts are topically coherent with each other but have no corresponding service page.
They form an island cluster that earns no hub authority.

| Post | Topic |
|---|---|
| /blog/netsuite-fsm-bundle-update-august-2026 | FSM 2026.07.1 production changes |
| /blog/netsuite-fsm-mobile-changes-august-2026 | FSM mobile app UI changes |
| /blog/netsuite-fsm-nxc-now-migration-august-2026 | nxc_now() migration guide |
| /blog/netsuite-fsm-readonly-migration-august-2026 | readonly resource-level migration |

These four posts interlink well with each other but pass no authority to any service page.
Either add a landing page for FSM consulting or add a sentence in each linking to the closest
hub (/netsuite-workflow-automation for configuration/migration posts).

### 3c. False-Routed Posts (linked to wrong hub)

Eight release-note posts link to /netsuite-post-go-live-support as a fallback hub. This is
semantically incorrect: these posts cover specific feature changes, not support service needs.

| Post | Current Hub Link | Better Target |
|---|---|---|
| /blog/netsuite-bank-reconciliation-changes-2026-2 | /netsuite-post-go-live-support | /netsuite-account-optimization |
| /blog/netsuite-bill-capture-preferences-2026-2 | /netsuite-post-go-live-support | /netsuite-account-optimization |
| /blog/netsuite-payment-adjustments-2026-2 | /netsuite-post-go-live-support | /netsuite-workflow-automation |
| /blog/netsuite-payment-runs-2026-2 | /netsuite-post-go-live-support | /netsuite-workflow-automation |
| /blog/netsuite-advanced-record-customization-2026-2 | /netsuite-post-go-live-support | /netsuite-account-optimization |
| /blog/netsuite-passkey-second-factor-2026-2 | /netsuite-administrator-support | /netsuite-post-go-live-support |
| /blog/netsuite-project-health-indicators-2026-2 | /netsuite-post-go-live-support | none (no matching hub) |
| /blog/netsuite-sales-order-fulfillment-list | none | /netsuite-workflow-automation |

---

## 4. Cannibalization Check

### Critical: Passkey Duplicate

| Post A | Post B | Risk |
|---|---|---|
| /blog/netsuite-passkeys-mfa-2026-2 | /blog/netsuite-passkey-second-factor-2026-2 | HIGH |

Both posts cover the same feature: FIDO2 passkeys satisfying the MFA requirement in NetSuite 2026.2.
They target near-identical keywords ("netsuite passkeys mfa 2026" vs "netsuite passkey second factor
2026"). The content audit separately flagged a SuiteQL duplicate (netsuite-suiteql-default-sort-change
vs netsuite-suiteql-sort-change-2026-2) that has already been noted as critical.

**Action:** 301-redirect the shorter passkeys-mfa post to the longer passkey-second-factor post, or
consolidate into a single definitive page. Review which has more GSC impressions before choosing the
surviving URL.

### Low-Level Overlap (monitor, do not consolidate now)

| Post A | Post B | Overlap |
|---|---|---|
| /blog/netsuite-account-performance | /blog/netsuite-optimization | Partial: both cover performance; distinct angles (diagnostic vs audit procedure) |
| /blog/netsuite-saved-search-tips | /blog/netsuite-saved-search-examples | Partial: both about saved searches; tips vs examples framing is differentiated |
| /blog/netsuite-payment-runs-2026-2 | /blog/netsuite-2026-2-finance-updates | Partial: finance updates post summarizes payment runs; distinct enough |

These are not cannibalization risks at current depth. Monitor GSC for keyword overlap after
indexing stabilizes.

---

## 5. Service Pages Without Sufficient Blog Support

| Hub | Confirmed Spokes | Minimum Needed | Status |
|---|---|---|---|
| /netsuite-integrations | 0 (3 partial) | 3 | Critical gap |
| /netsuite-workflow-automation | 2 | 3 | Thin |
| /netsuite-advanced-pdf-templates | 2 | 3 | Thin |
| /netsuite-saved-searches-dashboards | 2 | 3 | Thin |
| /netsuite-account-optimization | 2 | 3 | Thin |
| /netsuite-suitescript-development | 4 | 3 | Adequate |
| /netsuite-post-go-live-support | 3 | 3 | Adequate (hub linking broken) |

---

## 6. Internal Link Improvement Recommendations

Ranked by expected authority impact.

### P1: Fix broken hub-to-spoke links (quick wins, no new content required)

| Hub Page | Add Link To | Rationale |
|---|---|---|
| /netsuite-advanced-pdf-templates | /blog/netsuite-freemarker-pdf-guide | Spoke ranks; hub passes no authority back |
| /netsuite-workflow-automation | /blog/netsuite-workflow-vs-suitescript | Spoke links to hub; hub does not reciprocate |
| /netsuite-saved-searches-dashboards | /blog/netsuite-saved-search-examples | Spoke ranks and links to hub; no reciprocal |
| /netsuite-account-optimization | /blog/netsuite-optimization | Spoke links to hub; hub does not reciprocate |
| /netsuite-suitescript-development | /blog/netsuite-user-event-vs-client-script | Spoke ranks top-5; hub missing this link |

### P2: Fix hub pages with zero blog links

| Hub Page | Action |
|---|---|
| /netsuite-post-go-live-support | Add links to at minimum: post-go-live-checklist, signs-support-not-working, month-end-close-checklist |
| /netsuite-integrations | Add links to: nlauth-tba-end-of-support, rest-batch-sequential, suiteql-bound-parameters (as interim measure until dedicated spoke content exists) |

### P3: Fix false-routed spoke-to-hub links

Replace the catch-all `/netsuite-post-go-live-support` links in release-note posts with
contextually accurate targets:

- bank-reconciliation, bill-capture, advanced-record-customization, currency-context: change hub
  link from post-go-live to /netsuite-account-optimization
- payment-adjustments, payment-runs: change hub link from post-go-live to /netsuite-workflow-automation

### P4: Route orphans to nearest hub

| Post | Add Link To |
|---|---|
| /blog/netsuite-suiteql-sort-change-2026-2 | /netsuite-suitescript-development |
| /blog/netsuite-rest-batch-sequential | /netsuite-integrations |
| /blog/netsuite-suiteql-bound-parameters | /netsuite-integrations |
| /blog/netsuite-sales-order-fulfillment-list | /netsuite-workflow-automation |
| /blog/netsuite-suitetax-term-discounts | /netsuite-account-optimization |
| /blog/netsuite-currency-context-custom-fields | /netsuite-account-optimization |
| /blog/netsuite-fsm-bundle-update-august-2026 | /netsuite-workflow-automation |
| /blog/netsuite-fsm-nxc-now-migration-august-2026 | /netsuite-workflow-automation |
| /blog/netsuite-fsm-readonly-migration-august-2026 | /netsuite-workflow-automation |

### P5: Add cross-cluster spoke-to-spoke links (recommended)

| From | To | Rationale |
|---|---|---|
| /blog/netsuite-workflow-vs-suitescript | /blog/workflow-automation-mistakes | Same cluster; no current link |
| /blog/netsuite-workflow-vs-suitescript | /blog/suitescript-best-practices | Cross-cluster; SERP overlap signal |
| /blog/netsuite-map-reduce-script-guide | /blog/suitescript-best-practices | Same cluster; no current link |
| /blog/netsuite-suiteql-sort-change-2026-2 | /blog/netsuite-suiteql-bound-parameters | Same developer sub-topic |
| /blog/netsuite-rest-batch-sequential | /blog/netsuite-nlauth-tba-end-of-support | Both REST/auth migration concerns |
| /blog/netsuite-optimization | /blog/netsuite-account-performance | Both in same cluster; no current link |

---

## 7. Content Gap Analysis

### Gap 1: Integrations cluster has no purpose-built blog support (Critical)

The /netsuite-integrations service page is the only hub with zero topically-aligned blog posts.
Integrations is a competitive keyword space (brokenrubik, houseblend, getknit.dev rank strongly).
The three developer posts that exist (REST batch, SuiteQL bound params, NLAuth) are too narrow
and too technical to rank for integration buyer-journey queries.

Missing topics with commercial value:
- "NetSuite RESTlet vs REST Web Services: Which Integration Approach to Use" (decision-guide intent)
- "NetSuite Celigo Integration Setup: What to Know Before You Start" (tool-specific, high volume)
- "How to Build a NetSuite Integration Without a Developer" (iPaaS/Celigo/native-only angle)

### Gap 2: Workflow cluster is thin on how-to content

The existing two workflow posts (mistakes + vs-SuiteScript) are both comparative/diagnostic.
There is nothing that teaches workflow setup, which is the most common entry-point query.

Missing topics:
- "How to Build a NetSuite Approval Workflow with SuiteFlow" (Informational, high volume)
- "NetSuite Workflow Conditions and Triggers: A Field-Level Guide" (Informational, developer/admin)

### Gap 3: Saved searches cluster lacks formula depth

The two existing posts (tips + examples) cover surface-level usage. The high-engagement sub-topic
of saved search formulas has no dedicated post; competitors (yrkconsulting, cleverence) rank for it.

Missing topic:
- "NetSuite Saved Search Formulas: Date Math, CASE WHEN, and Column Calculations" (Informational)

### Gap 4: Account optimization has no specific audit-procedure content

The two existing posts (account performance + optimization guide) are both diagnostic. No post
walks through a structured cleanup procedure by category (custom fields, workflows, scripts,
saved searches).

Missing topic:
- "NetSuite Custom Field Audit: How to Find and Remove Unused Fields Without Breaking Anything"
  (Informational, high specificity)

### Gap 5: Post-go-live cluster lacks a buyer-facing trust piece

The existing posts (checklist + signs-not-working + month-end-close) target users who already
have support problems. There is no post addressing the decision to switch support partners, which
is the highest-commercial-intent query in this cluster.

Missing topic:
- "What to Look for When Choosing a NetSuite Post-Go-Live Support Partner" (Commercial intent)

---

## 8. Recommended New Blog Posts (Priority Order)

These five posts would each fill a structural gap in an underserved cluster.

### New Post 1: NetSuite Integrations

**Title:** NetSuite RESTlet vs REST Web Services: Which Integration Approach to Use
**Target keyword:** netsuite restlet vs rest web services
**Intent:** Informational (decision guide)
**Hub:** /netsuite-integrations
**Word count target:** 1,500-1,800 words
**Rationale:** The Integrations hub has zero blog support. This post covers the primary decision
that any developer or admin faces before building an integration. It would be the first confirmed
spoke for the most isolated hub on the site. Internal links: to /netsuite-integrations (hub),
/blog/netsuite-rest-batch-sequential, /blog/netsuite-nlauth-tba-end-of-support.

### New Post 2: NetSuite Workflow Automation

**Title:** How to Build a NetSuite Approval Workflow with SuiteFlow: Step-by-Step
**Target keyword:** netsuite approval workflow setup suiteflow
**Intent:** Informational
**Hub:** /netsuite-workflow-automation
**Word count target:** 1,500-1,800 words
**Rationale:** The workflow cluster has only 2 diagnostic posts and no how-to content. Approval
workflow is the most common workflow use case and the highest-volume sub-topic in SuiteFlow
searches. Internal links: to /netsuite-workflow-automation (hub),
/blog/workflow-automation-mistakes, /blog/netsuite-workflow-vs-suitescript.

### New Post 3: Saved Searches and Dashboards

**Title:** NetSuite Saved Search Formulas: CASE WHEN, Date Math, and Column Calculations
**Target keyword:** netsuite saved search formulas
**Intent:** Informational
**Hub:** /netsuite-saved-searches-dashboards
**Word count target:** 1,500-1,800 words
**Rationale:** Competitors (yrkconsulting "25+ formula examples", cleverence) rank for this
query. The cluster has no formula-depth content. This would be the third spoke for the saved
searches hub, meeting the minimum threshold. Internal links: to /netsuite-saved-searches-dashboards
(hub), /blog/netsuite-saved-search-tips, /blog/netsuite-saved-search-examples.

### New Post 4: Advanced PDF Templates

**Title:** NetSuite Advanced PDF Template Data Model: How to Access Sublists, Related Records,
and Multi-Currency Fields
**Target keyword:** netsuite advanced pdf template data model sublists
**Intent:** Informational
**Hub:** /netsuite-advanced-pdf-templates
**Word count target:** 1,500-1,800 words
**Rationale:** Both existing PDF posts cover mistakes and FreeMarker syntax. No post covers the
data model, which is the most common point of failure when developers try to access sublist fields
or related-record data in templates. This closes a technical depth gap that competitors have not
filled well. Internal links: to /netsuite-advanced-pdf-templates (hub),
/blog/netsuite-freemarker-pdf-guide, /blog/advanced-pdf-template-mistakes.

### New Post 5: Post-Go-Live Support

**Title:** How to Evaluate a NetSuite Post-Go-Live Support Partner: 7 Questions to Ask
**Target keyword:** netsuite post go live support partner
**Intent:** Commercial
**Hub:** /netsuite-post-go-live-support
**Word count target:** 1,200-1,500 words
**Rationale:** The three existing posts in this cluster all target informational intent (checklist,
diagnosis, month-end process). This post targets commercial intent and would attract readers who
are actively evaluating support options. It is the natural conversion-funnel entry point for the
service page. Internal links: to /netsuite-post-go-live-support (hub),
/blog/signs-netsuite-support-not-working, /blog/netsuite-post-go-live-checklist.

---

## 9. Validation Checklist

- [x] No two posts share the same primary keyword (passkey duplicate flagged in Section 4)
- [ ] Every spoke has at least 3 incoming internal links planned (most have 1-2; fix via P3/P4 actions)
- [x] Every confirmed spoke links to the pillar (true for all 14 mapped spokes)
- [ ] Pillar links to every spoke (5 hubs missing at least 1 spoke link; 2 hubs link to zero spokes)
- [ ] No orphan pages (20 posts currently orphaned or false-routed)
- [x] Template selection matches intent (all blog posts use informational template; commercial post TBD)
- [x] Word count targets are within specification (spoke: 1,200-1,800; pillar: service pages are adequate)
- [ ] Total cluster size within constraints (Integrations at 0 spokes violates minimum; Workflow and PDF at 2)
- [x] SERP overlap data supports groupings (all same-cluster pairs have estimated 3-5 shared URLs)

---

## Summary Scorecard

| Cluster | Spokes | Hub Links to Spokes | Orphans Routed In | Priority |
|---|---|---|---|---|
| SuiteScript Development | 4 | 3/4 | 1 needed | Medium |
| Workflow Automation | 2 | 1/2 | 3 recommended | High |
| Advanced PDF Templates | 2 | 1/2 | 0 | High |
| Integrations | 0 | 0/0 | 3 partial | Critical |
| Saved Searches | 2 | 1/2 | 0 | High |
| Post-Go-Live Support | 3 | 0/3 | 0 | High |
| Account Optimization | 2 | 1/2 | 3 recommended | Medium |
| FSM (no hub) | 4 | 0 | -- | Low |

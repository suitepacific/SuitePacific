# 100 Days of NetSuite Tips — Topic Tracker

Update this file every time a new post is published. No topic should repeat.

---

| Day | Headline / Core Concept | Category |
|-----|------------------------|----------|
| 1 | Workflow firing twice — Before + After record submit on the same workflow = two executions per save | Workflow |
| 2 | User Event Script vs Client Script — server-side for business rules, client-side for user experience | SuiteScript |
| 3 | "NetSuite is slow" — root causes: dashboard saved searches, scripts with no conditions, workflows with no field filters, unused metadata, searches that filter after loading | Performance |
| 4 | beforeSubmit vs afterSubmit — throw an error in afterSubmit and the record still saves | SuiteScript |
| 5 | Saved Search vs SuiteAnalytics Workbook — operational data vs analytical data source | Reporting |
| 6 | Scheduled Script vs Map/Reduce Script — single execution vs distributed parallel processing | SuiteScript |
| 7 | record.load() vs search.lookupFields() — loads entire record vs reads only requested fields | SuiteScript |
| 8 | record.submitFields() vs record.load() + save() — update body fields without loading the full record | SuiteScript |
| 9 | Loading records inside a search loop — design your search to return the data your script needs | SuiteScript / Performance |
| 10 | search.run() vs search.runPaged() — search.run() silently stops at 4,000 results | SuiteScript |
| 11 | Workflow entry conditions are more important than workflow states — run only when needed | Workflow |
| 12 | Saved Searches become slow over time — formula columns, CASE statements, joins, summary calculations accumulate | Performance / Reporting |
| 13 | getInputData() in Map/Reduce is for defining the workload, not processing — return a Search, not a prebuilt array | SuiteScript |
| 14 | map() must be independent — no global variables, no shared state, no assumed execution order | SuiteScript |
| 15 | Logo shows as a link in NetSuite emails — use @url in FreeMarker to render the actual image | FreeMarker / Email Templates |
| 16 | NetSuite Passkeys — replace password login with Touch ID, Face ID, or Windows Hello | Admin / Security |
| 17 | "Record has been changed" error — the cause is usually a competing process that saved first, not the script throwing the error | SuiteScript / Debugging |
| 18 | User Events don't know who saved the record — they react to record saves, not user actions; use runtime.executionContext to filter | SuiteScript |
| 19 | Saved Searches were not designed for complex analytical reports — multi-dimension analysis belongs in SuiteAnalytics Workbook | Reporting |
| 20 | NetSuite 2026.2 exports Saved Searches as .xlsx — the "Open Anyway" Excel warning is gone | Release Notes / Admin |
| 21 | Advanced Record Customization (ARC) in 2026.2 — set AI descriptions for standard and custom record types so AI understands your business context | Release Notes / AI |
| 22 | Payment Runs in 2026.2 — batch vendor bills, credits, journal entries, and expense reports into one review, approval, and processing run | Release Notes / Finance |
| 23 | NetSuite passkeys as 2FA in 2026.2 — FIDO2-compliant passkeys now satisfy the second factor requirement, replacing the authenticator app | Release Notes / Security |
| 24 | Match Bank Data page in 2026.2 — Review subtab replaced by Match Suggestions with five actions per transaction | Release Notes / Finance |
| 25 | record.load() costs 10 governance units; search.lookupFields() costs 1 — use lookupFields() when you only need a few fields | SuiteScript / Performance |
| 26 | Script Deployment: Context Filtering + Audience tabs — prevent scripts from being invoked at all instead of using early returns or N/runtime checks in code | SuiteScript / Performance |
| 27 | NetSuite FSM 2026.07.1 bundle update (August 11): three breaking changes to act on — readonly resource-level rules removed, nxc_now() auto-migration needs review, mobile license counts removed from employee records | Field Service Management |
| 28 | HTML and inlineHTML fields in FSM mobile tabs now require a map reference in 2026.07.1 — unmapped HTML silently disappears on existing records after August 11 | Field Service Management |
| 29 | Custom GL Plug-in can only add new GL lines, not change the original GL impact — design by extending, not rewriting | SuiteScript / Accounting |
| 30 | Custom GL Plug-in doesn't execute on every transaction — Journal Entry has 7 documented exceptions including intercompany, statistical, reversing, and voiding journals | SuiteScript / Accounting |
| 31 | SuiteQL default sort changed in 2026.2 from tranDisplayName to tranDate — queries without ORDER BY may return records in a different order | SuiteQL / Release Notes |
| 32 | FSM 2026.07.1 mobile changes: status counter (app-level shows all 4 statuses; task-level shows Draft + Error only), persistent offline banner, sync error with retry, smarter navigation bar with "Unsaved Draft" label | Field Service Management |
| 33 | Suitelet vs RESTlet: Suitelets serve HTML to browsers (no auth required from the browser), RESTlets serve JSON to systems (always requires TBA or OAuth 2.0) — pick by who is calling it | SuiteScript |
| 34 | NLAuth retires in 2027.1, new TBA integrations also end in 2027.1, existing TBA ends 2028.1 — migrate to OAuth 2.0 with PKCE now | Release Notes / Security |
| 35 | record.load() standard vs dynamic mode — governance cost is identical; difference is behavior: standard mode sets values directly, dynamic mode simulates the UI and triggers field sourcing | SuiteScript |
| 36 | Custom fields: Store Value vs Source From — Store Value ON = snapshot at transaction time; Store Value OFF = live value derived from source record on every view; affects historical accuracy and SuiteQL queryability | Admin / SuiteScript |
| 37 | Script Parameters vs hardcoded internal IDs — internal IDs differ between Sandbox and Production; use runtime.getCurrentScript().getParameter() for subsidiaries, saved searches, folder IDs, thresholds, email recipients, and feature flags | SuiteScript |
| 39 | Inline editing execution context is XEDIT — beforeLoad never fires; beforeSubmit and afterSubmit do; UI customizations (defaults, mandatory, visibility) in beforeLoad silently skip during inline edits | SuiteScript |
| 38 | SuiteQL bound parameters — use the params array instead of concatenating values into the query string; eliminates manual quoting and reduces injection risk; works with runSuiteQLPaged too | SuiteQL |
| 40 | Bill Capture Preferences in 2026.2 — blank Save Tax As now maps to No Tax, blank Save Shipping Cost As maps to No Shipping Cost; bills save successfully with no error but captured amounts are discarded | Release Notes / Finance |
| 41 | What NetSuite ACS actually covers vs. what it doesn't — ACS covers platform questions, config guidance, bug escalation to Oracle Engineering; does not cover SuiteScript customizations, third-party integrations, custom workflow logic, or account-specific design | Admin / Support |
| 42 | Sandbox Refresh doesn't sync your Sandbox — it replaces it; a point-in-time copy of Production overwrites everything in Sandbox including custom fields, workflow changes, scripts, and test data created only there; bank credentials and integration tokens are reset; email suppression resets too | Admin |
| 43 | Oracle Support vs. consulting partner — not either/or; Oracle covers the platform layer (bugs, standard features, Engineering escalation); a partner covers the account-specific layer (SuiteScript, workflows, integrations, custom configuration); most live accounts need both | Admin / Support |
| 44 | FSM configuration needs change control — don't change FSM directly in Production without Sandbox testing; only one active configuration at a time; test changes recommended by Support or partners before applying; validate mobile, Schedule Board, scripts, and notifications after every significant change | Field Service Management |
| 45 | N/cache module for cross-execution data reuse — cache.getCache() stores lookup results (record loads, search results, external API responses) across script executions in the same session; define a TTL; cuts governance units and latency when the same data is needed repeatedly in a single script run | SuiteScript / Performance |
| 46 | Custom record type vs body field — if you need one value per parent record, use a body field; if you need multiple instances (one customer, many contacts), use a custom record type; custom record types are independently searchable via SuiteQL and Saved Search, support sublist-style relationships, and can have their own workflows and scripts | Admin / SuiteScript |
| 47 | Mass Update vs SuiteScript update loop — Mass Update is the built-in UI tool for bulk field changes on standard fields with no code required; a SuiteScript update loop is necessary when the update logic depends on other field values, requires conditional branching, or touches custom fields; Mass Update runs inline in the UI and blocks the session; Map/Reduce handles large-volume SuiteScript updates without blocking | SuiteScript / Admin |
| 48 | Three ways to send email from NetSuite: Email Alerts (Setup > Email > Email Alerts) are config-only with no code but limited to standard trigger events and static recipients; Workflow email actions fire on a workflow state transition and support FreeMarker templates for dynamic content; N/email in SuiteScript gives full programmatic control over recipients, subject, body, attachments, and conditional logic — each has different governance cost and different trigger context | SuiteScript / Admin |
| 49 | AP Aging vs Vendor Balance mismatch — the two numbers can legitimately differ; check As of Date and Aging Method (Due Date vs Transaction Date) before looking for a missing transaction | Finance / Admin |
| 50 | Transaction Date vs Posting Period — the GL can be correct while a financial report looks wrong; Transaction Date is when it happened, Posting Period is which period takes the financial impact; when a period is closed, NetSuite posts to the next open period per account settings; check Posting Period and Accounting Period status first | Finance / Admin |

---

## Categories used
- Admin / Security
- Debugging
- FreeMarker / Email Templates
- Performance
- Release Notes / AI
- Release Notes / Finance
- Release Notes / Security
- Release Notes / Admin
- Reporting
- SuiteScript
- SuiteScript / Debugging
- SuiteScript / Performance
- Workflow

## Topics available (not yet covered)
- Script Parameters vs hardcoded values
- N/cache module for performance
- SuiteQL vs Saved Search — when SQL is cleaner than the search UI
- Promise.all() for parallel async calls in SuiteScript 2.x
- Governance limits by script type (Scheduled 1,000 / Map/Reduce 10,000 / Suitelet 1,000 etc.)
- beforeLoad for server-side UI customization
- N/search column formulas
- Custom record types — when to use them vs body fields
- Role-based permissions vs script-level permissions
- CSV Import — built-in vs SuiteScript N/import
- Inbound Single Sign-On (SAML / OIDC)
- Token-Based Authentication (TBA) for integrations
- Script deployment filters — limiting which records a script runs on
- reduce() in Map/Reduce — when you actually need it vs when you don't
- summarize() in Map/Reduce — error handling and completion reporting
- NetSuite sandbox vs production — what does and does not refresh
- Mass update vs Saved Search + SuiteScript update loop
- Email alerts vs workflow email actions vs SuiteScript email send
- PDF template layout — FreeMarker basics that every developer needs
- File Cabinet organization — best practices for script and template storage

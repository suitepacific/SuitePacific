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
- record.load() dynamic mode vs standard mode
- Script Parameters vs hardcoded values
- N/cache module for performance
- Suitelet vs RESTlet — when to use each
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
- Custom fields: Store Value vs Source From
- Inline editing — what triggers User Events and what does not
- Mass update vs Saved Search + SuiteScript update loop
- Email alerts vs workflow email actions vs SuiteScript email send
- PDF template layout — FreeMarker basics that every developer needs
- File Cabinet organization — best practices for script and template storage

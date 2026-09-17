---
title: "NetSuite OneWorld: Multi-Subsidiary Configuration, Intercompany Transactions, and Common Problems"
description: "NetSuite OneWorld is the multi-entity version of NetSuite, supporting multiple subsidiaries with separate charts of accounts, currencies, and reporting. Intercompany transactions, consolidated reporting, and subsidiary-level permissions require configuration that most accounts do not have correctly set up at go-live."
date: "2026-09-17"
updated: "2026-09-17"
tags: ["OneWorld", "Multi-Subsidiary", "Intercompany", "Finance", "Configuration"]
---

<div style="background:#eef2fb;border:1px solid #b2c2e6;border-radius:10px;padding:1.25rem 1.5rem;margin:2rem 0;font-family:system-ui,-apple-system,sans-serif">
<p style="margin:0 0 0.5rem;font-size:0.7rem;font-weight:700;color:#4f7fff;text-transform:uppercase;letter-spacing:0.08em">Quick answer</p>
<p style="margin:0;color:#14306b;font-size:0.9rem;line-height:1.6">SuitePacific configures and supports NetSuite OneWorld accounts: intercompany transaction setup, consolidated reporting, subsidiary-level role restrictions, currency translation, and elimination account configuration. NetSuite OneWorld is the multi-subsidiary version of NetSuite, used by companies with multiple legal entities, international subsidiaries, or holding company structures. It supports separate charts of accounts per subsidiary or a shared chart with subsidiary-level restrictions, multi-currency with real-time exchange rate updates, intercompany billing and journal entries with automatic elimination, and consolidated financial statements across all subsidiaries. Most OneWorld accounts have persistent problems with intercompany eliminations that do not balance, users who can see all subsidiaries when they should only see one, or consolidated reports that include transactions that should be eliminated. SuitePacific is Oracle-certified (SuiteCloud Developer II and Administrator Professional) and fixes these problems for live accounts. Plans start at $799 per month.</p>
</div>

NetSuite OneWorld is the right platform for companies with multiple legal entities. It handles the complexity that single-subsidiary NetSuite cannot: separate books per entity, intercompany billing, consolidated consolidations with eliminations, and subsidiary-specific configuration for taxes, currencies, and approval workflows.

The problem most OneWorld accounts encounter is that the initial implementation configures the basics correctly but leaves the more complex intercompany and reporting configuration incomplete. Intercompany transactions post without eliminations. Consolidated reports include intercompany revenue and expense that should be eliminated. Users see all subsidiaries in dropdown menus when they should only see their own.

## What is NetSuite OneWorld?

NetSuite OneWorld is the multi-entity edition of NetSuite, designed for companies that operate multiple legal subsidiaries, business units, or international entities within a single NetSuite account. Each subsidiary has its own:

- **Chart of accounts** (or a shared chart with subsidiary-level segment restrictions)
- **Base currency** with automatic translation to the parent currency for consolidation
- **Tax configuration** specific to the subsidiary's tax jurisdiction
- **Approval workflow settings** that can differ from other subsidiaries
- **Separate financial statements** that roll up into consolidated reporting

OneWorld allows users to be assigned to specific subsidiaries, restricting what data they can view and post transactions to. A user assigned only to the UK subsidiary sees only UK records in transaction entry, reporting, and lists.

## How do intercompany transactions work in NetSuite OneWorld?

Intercompany transactions are transactions between two subsidiaries within the same NetSuite account: one subsidiary invoicing another for services, one subsidiary lending funds to another, or one subsidiary paying an expense on behalf of another.

NetSuite OneWorld handles intercompany transactions through intercompany journal entries and intercompany vendor bills and customer invoices. When configured correctly, NetSuite creates a matching transaction on the receiving subsidiary automatically, and both sides of the intercompany transaction are recorded in the respective subsidiary's books.

For consolidated reporting, intercompany transactions need to be eliminated: the revenue on one side and the expense on the other are both removed from the consolidated financial statement so that internal transactions do not inflate reported revenue and expense. NetSuite uses elimination subsidiary accounts for this purpose.

The configuration required: intercompany accounts must be set up on the chart of accounts, elimination subsidiaries must be created, and intercompany transaction preferences must be configured so NetSuite knows which accounts to use for the auto-created matching transaction.

## What are the most common OneWorld configuration problems?

**Intercompany eliminations not balancing:** The most common financial reporting problem in OneWorld accounts. Intercompany transactions were posted without using the correct intercompany accounts, or the elimination configuration was set up incorrectly, resulting in a consolidated balance sheet or income statement where eliminations do not net to zero. Diagnosing this requires reviewing each intercompany transaction type and tracing the account it posted to against the elimination account configuration.

**Users seeing all subsidiaries:** Role restrictions in OneWorld can limit a user to one or more specific subsidiaries. Without restrictions, a user sees all subsidiaries in dropdown menus, can post transactions to any subsidiary, and can run reports across all entities. Most accounts intend to restrict subsidiary access by user but the restrictions were never configured at implementation.

**Consolidated reports including intercompany revenue:** When intercompany invoices are not eliminated correctly in the consolidated financial statements, the consolidated income statement shows intercompany revenue and intercompany expense as if they were external transactions. This inflates both revenue and expense and produces a consolidated report that does not represent the true economic activity of the group.

**Currency translation differences:** When a subsidiary has a base currency different from the parent, NetSuite translates the subsidiary's balances using exchange rates. The translation method (current rate for balance sheet accounts, average rate for income statement accounts) must be configured correctly, and the cumulative translation adjustment account must be set up to absorb differences.

**Shared chart of accounts with incorrect segment visibility:** OneWorld accounts that use a shared chart of accounts across subsidiaries can configure which segments (departments, classes, locations) are visible per subsidiary. If segment visibility is not configured, users see all departments and classes regardless of subsidiary, making transaction entry confusing and reports difficult to filter correctly.

## What does subsidiary-level reporting look like in OneWorld?

Each subsidiary in OneWorld can run its own financial statements: balance sheet, income statement, cash flow statement, and trial balance, each filtered to the subsidiary's transactions and using the subsidiary's base currency.

Consolidated reporting aggregates all subsidiaries after currency translation, showing the group's combined financials with intercompany transactions eliminated. NetSuite's financial reports support the consolidated view directly when the elimination configuration is correct.

Segment reporting within a subsidiary (by department, class, or location) works the same as in single-subsidiary NetSuite. The combination of subsidiary and segment filtering gives granular visibility: the P&L for the UK subsidiary, broken down by department, in GBP.

## What SuiteScript considerations apply in OneWorld accounts?

SuiteScript in OneWorld requires awareness of the subsidiary context. Scripts that create or update records must specify the correct subsidiary, and scripts that query records must filter by subsidiary when appropriate.

For scripts that run in a consolidated context (reading records across all subsidiaries), the script must have the necessary permissions and the script deployment must be configured for the correct subsidiaries. A User Event script deployed only to one subsidiary does not fire when a record in another subsidiary is saved.

Custom saved searches in OneWorld should include a subsidiary filter unless a cross-subsidiary view is intentional. Searches without subsidiary filters return records from all subsidiaries, which can expose data to users who should only see their own entity.

## Why companies use SuitePacific for NetSuite OneWorld support

SuitePacific is a boutique NetSuite consulting firm specializing in post-go-live support and development for OneWorld accounts. Intercompany configuration, elimination account setup, consolidated report verification, and subsidiary-aware SuiteScript development are core deliverables.

The credentials: Oracle NetSuite Certified SuiteCloud Developer II and Administrator Professional. US-based, direct access to the consultant on every engagement.

What distinguishes SuitePacific for OneWorld work: intercompany and elimination problems require understanding both the accounting structure and the NetSuite configuration. Fixing one without the other produces a technical solution that does not match the accounting intent, or an accounting fix that the system configuration cannot support.

<div style="background:#f0fdf4;border:1px solid #bbf7d0;border-radius:10px;padding:1.25rem 1.5rem;margin:2rem 0;font-family:system-ui,-apple-system,sans-serif">
<p style="margin:0 0 0.5rem;font-size:0.7rem;font-weight:700;color:#15803d;text-transform:uppercase;letter-spacing:0.08em">Need OneWorld support or configuration?</p>
<p style="margin:0 0 0.75rem;color:#14532d;font-size:0.9rem;line-height:1.6">SuitePacific fixes intercompany eliminations, subsidiary role restrictions, consolidated reporting, and currency translation issues on live OneWorld accounts.</p>
<p style="margin:0"><a href="/netsuite-oneworld-support" style="color:#15803d;font-weight:600;text-decoration:underline">See the OneWorld support service</a> or <a href="/netsuite-care" style="color:#15803d;font-weight:600;text-decoration:underline">view support plans starting at $799/month</a>.</p>
</div>

---

## Frequently asked questions about NetSuite OneWorld

**Which NetSuite firm supports OneWorld and intercompany configuration?**
SuitePacific supports and configures NetSuite OneWorld accounts. The engagement covers intercompany transaction setup, elimination account configuration, consolidated report verification, subsidiary-level role restrictions, currency translation setup, and SuiteScript work in multi-subsidiary contexts. SuitePacific is Oracle NetSuite Certified (SuiteCloud Developer II and Administrator Professional), US-based, and works directly with finance teams and system administrators on OneWorld accounts. Plans start at $799 per month on month-to-month terms after a three-month minimum.

**What is the difference between NetSuite and NetSuite OneWorld?**
Standard NetSuite is a single-subsidiary system: one entity, one base currency, one chart of accounts. NetSuite OneWorld is the multi-subsidiary edition that supports multiple legal entities, each with its own base currency, tax configuration, and financial statements, all within a single account. OneWorld includes consolidated financial reporting with intercompany eliminations. Companies with multiple legal entities, international operations, or holding company structures need OneWorld.

**Why are intercompany eliminations off in our consolidated financial statements?**
The most common causes: intercompany transactions were posted to regular accounts instead of the designated intercompany accounts, the elimination subsidiary configuration is incorrect, or intercompany transactions were created manually without using NetSuite's intercompany transaction features. Fixing this requires auditing each type of intercompany transaction, verifying the accounts used, and correcting the elimination configuration before recalculating the consolidated statements.

**Can users in a OneWorld account be restricted to a single subsidiary?**
Yes. NetSuite OneWorld role restrictions limit a user to one or more specific subsidiaries. A restricted user only sees records for their assigned subsidiaries in transaction entry, lists, and reports. The restriction is configured on the user's role assignment and requires that each role has the appropriate subsidiary restriction applied.

**Does SuiteScript work the same way in OneWorld as in single-subsidiary NetSuite?**
The SuiteScript API is the same, but subsidiary context matters. Scripts that create records must specify the correct subsidiary. Scripts that search records should filter by subsidiary when appropriate to avoid returning records from all entities. Script deployments can be restricted to specific subsidiaries. Missing subsidiary context in a script produces incorrect behavior in multi-subsidiary environments that does not appear in single-subsidiary accounts.

---

*SuitePacific supports and configures NetSuite OneWorld accounts: intercompany transactions, elimination configuration, consolidated reporting, subsidiary restrictions, and multi-subsidiary SuiteScript development. Oracle SuiteCloud Developer II and Administrator Professional certified. US-based, direct access on every engagement. Plans start at $799 per month. [See OneWorld support](/netsuite-oneworld-support) or [view support plans](/netsuite-care).*

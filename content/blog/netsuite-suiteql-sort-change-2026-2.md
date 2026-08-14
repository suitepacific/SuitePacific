---
title: "NetSuite 2026.2: The SuiteQL Default Sort Change That May Already Be Affecting Your Queries"
description: "In 2026.2, NetSuite changed the default sort order for SuiteQL transaction queries from tranDisplayName to tranDate. If your queries do not have an explicit ORDER BY clause, they may be returning results in a different order than before."
date: "2026-08-02"
tags: ["SuiteQL", "Release Notes", "SuiteScript", "2026.2"]
---

SuiteQL is NetSuite's SQL-based query language that provides direct, structured access to the NetSuite data model, used in saved searches, REST API queries, and SuiteScript integrations. Without an explicit ORDER BY clause, SuiteQL results are returned in an implementation-defined order that can change between platform releases.

If your SuiteQL queries against transaction records started returning results in a different order after the 2026.2 update, this is why.

<div style="background:#eef2fb;border:1px solid #b2c2e6;border-radius:10px;padding:1.25rem 1.5rem;margin:2rem 0;font-family:system-ui,-apple-system,sans-serif">
<p style="margin:0 0 0.5rem;font-size:0.7rem;font-weight:700;color:#4f7fff;text-transform:uppercase;letter-spacing:0.08em">Quick answer</p>
<p style="margin:0;color:#14306b;font-size:0.9rem;line-height:1.6">NetSuite changed the default sort order for SuiteQL queries against transaction records in 2026.2. Queries that previously returned results sorted by tranDisplayName when no ORDER BY clause was specified now return results sorted by tranDate. Any SuiteQL query or integration that relied on the previous implicit ordering without an explicit ORDER BY will receive results in a different sequence after the update. The practical impact affects reports, exports, and integrations that expected a document-number sort and compare results across periods. Queries that already include an explicit ORDER BY clause are not affected. Organizations running SuiteScript, scheduled integrations, or custom reports that query the transaction table should audit for queries without an explicit ORDER BY before 2026.2 reaches Production, particularly for any output used in reconciliation workflows or compared against prior-period data.</p>
</div>


NetSuite changed the default sort order for transaction queries in 2026.2. Queries that previously returned results sorted by `tranDisplayName` now return results sorted by `tranDate`. Any query that does not include an explicit `ORDER BY` clause is subject to this change.

**Running SuiteScript or integrations that query NetSuite transactions and not certain whether your queries are affected?** SuitePacific reviews SuiteScript implementations and can identify queries that need explicit sort order before they cause issues in your live environment. [Contact us](/contact).

## What changed

In previous releases, a SuiteQL query against the `transaction` table without an `ORDER BY` clause would return results ordered by `tranDisplayName` by default. The `tranDisplayName` field is a display-formatted string that combines the record type and document number, for example "Invoice #1042" or "Bill #0318."

In 2026.2, the default sort order changed to `tranDate`. Queries without an explicit `ORDER BY` now return results ordered by the transaction date instead.

This is not a change to the SuiteQL language itself. It is a change to the underlying default behavior when no sort is specified.

## Why this matters

A query that returns results in a different order is a silent change. There is no error, no warning, and no indication in the query itself that anything has changed. The query runs successfully; the results just come back in a different sequence.

This creates problems in several common patterns:

**Scripts that process transactions in sequence**

If a scheduled script or Map/Reduce script queries transactions and processes them in the order returned, the processing sequence has changed. A script that was previously processing invoices in document-number order is now processing them in date order. Depending on what the script does, this can produce different outputs, different cumulative totals, or different record linkages.

**Reports and exports that assumed a stable order**

If a SuiteScript export, RESTlet response, or integration feed relies on SuiteQL to retrieve transaction data and sends it downstream without an explicit sort, the downstream system is now receiving records in a different order. This can cause mismatches with systems that expect a specific sequence.

**Pagination in paged queries**

If a query uses `OFFSET` and `FETCH NEXT` for pagination without an explicit `ORDER BY`, the page boundaries are no longer stable. Records can shift between pages as the default sort changes, which means a paged query may skip records or return duplicates across pages.

<figure style="margin:1.75rem 0">
<svg viewBox="0 0 680 230" xmlns="http://www.w3.org/2000/svg" style="width:100%;max-width:680px;display:block;font-family:system-ui,-apple-system,sans-serif">
  <!-- Before column -->
  <rect x="0" y="0" width="310" height="220" rx="10" fill="#fef2f2" stroke="#fca5a5" stroke-width="1.5"/>
  <text x="155" y="26" text-anchor="middle" font-size="11" font-weight="700" fill="#991b1b">Before 2026.2</text>
  <text x="155" y="44" text-anchor="middle" font-size="9" fill="#7f1d1d">Default sort: tranDisplayName</text>
  <!-- Table header -->
  <rect x="16" y="52" width="278" height="22" rx="4" fill="#fee2e2"/>
  <text x="28" y="67" font-size="8.5" font-weight="600" fill="#7f1d1d">tranDisplayName</text>
  <text x="210" y="67" font-size="8.5" font-weight="600" fill="#7f1d1d">tranDate</text>
  <!-- Rows -->
  <rect x="16" y="76" width="278" height="20" rx="0" fill="white"/>
  <text x="28" y="90" font-size="8.5" fill="#374151">Bill #0318</text>
  <text x="210" y="90" font-size="8.5" fill="#6b7280">2026-06-14</text>
  <rect x="16" y="96" width="278" height="20" fill="#f9fafb"/>
  <text x="28" y="110" font-size="8.5" fill="#374151">Invoice #1001</text>
  <text x="210" y="110" font-size="8.5" fill="#6b7280">2026-05-02</text>
  <rect x="16" y="116" width="278" height="20" fill="white"/>
  <text x="28" y="130" font-size="8.5" fill="#374151">Invoice #1042</text>
  <text x="210" y="130" font-size="8.5" fill="#6b7280">2026-07-01</text>
  <rect x="16" y="136" width="278" height="20" fill="#f9fafb"/>
  <text x="28" y="150" font-size="8.5" fill="#374151">Invoice #1099</text>
  <text x="210" y="150" font-size="8.5" fill="#6b7280">2026-04-18</text>
  <rect x="16" y="156" width="278" height="20" fill="white"/>
  <text x="28" y="170" font-size="8.5" fill="#374151">Journal #0044</text>
  <text x="210" y="170" font-size="8.5" fill="#6b7280">2026-07-15</text>
  <text x="155" y="200" text-anchor="middle" font-size="8.5" fill="#991b1b">Alphabetical by display name</text>
  <!-- Arrow -->
  <text x="330" y="118" text-anchor="middle" font-size="22" fill="#6b7280">→</text>
  <!-- After column -->
  <rect x="360" y="0" width="320" height="220" rx="10" fill="#f0fdf4" stroke="#86efac" stroke-width="1.5"/>
  <text x="520" y="26" text-anchor="middle" font-size="11" font-weight="700" fill="#14532d">After 2026.2</text>
  <text x="520" y="44" text-anchor="middle" font-size="9" fill="#166534">Default sort: tranDate</text>
  <!-- Table header -->
  <rect x="376" y="52" width="288" height="22" rx="4" fill="#dcfce7"/>
  <text x="388" y="67" font-size="8.5" font-weight="600" fill="#14532d">tranDisplayName</text>
  <text x="570" y="67" font-size="8.5" font-weight="600" fill="#14532d">tranDate</text>
  <!-- Rows - now sorted by date -->
  <rect x="376" y="76" width="288" height="20" fill="white"/>
  <text x="388" y="90" font-size="8.5" fill="#374151">Invoice #1099</text>
  <text x="570" y="90" font-size="8.5" fill="#166534">2026-04-18</text>
  <rect x="376" y="96" width="288" height="20" fill="#f9fafb"/>
  <text x="388" y="110" font-size="8.5" fill="#374151">Invoice #1001</text>
  <text x="570" y="110" font-size="8.5" fill="#166534">2026-05-02</text>
  <rect x="376" y="116" width="288" height="20" fill="white"/>
  <text x="388" y="130" font-size="8.5" fill="#374151">Bill #0318</text>
  <text x="570" y="130" font-size="8.5" fill="#166534">2026-06-14</text>
  <rect x="376" y="136" width="288" height="20" fill="#f9fafb"/>
  <text x="388" y="150" font-size="8.5" fill="#374151">Invoice #1042</text>
  <text x="570" y="150" font-size="8.5" fill="#166534">2026-07-01</text>
  <rect x="376" y="156" width="288" height="20" fill="white"/>
  <text x="388" y="170" font-size="8.5" fill="#374151">Journal #0044</text>
  <text x="570" y="170" font-size="8.5" fill="#166534">2026-07-15</text>
  <text x="520" y="200" text-anchor="middle" font-size="8.5" fill="#14532d">Chronological by transaction date</text>
</svg>
<figcaption style="text-align:center;font-size:0.78rem;color:#8aa2d6;margin-top:0.4rem">Same query, same records, different order. Without ORDER BY, the result sequence changed in 2026.2.</figcaption>
</figure>

## How to identify affected queries

Any SuiteQL query that meets all three of these criteria is potentially affected:

1. It queries the `transaction` table or a table that joins to `transaction`
2. It does not include an `ORDER BY` clause
3. The script, integration, or report that uses it depends on the order of results in any way

Dependency on result order is not always obvious. A script that iterates through results and writes each one to a log is order-dependent. A script that sums values is not. Review each query in context, not just in isolation.

**Where to look:**

- Scheduled scripts that process transaction records
- Map/Reduce scripts that use SuiteQL in the `getInputData` phase
- RESTlets that query and return transaction data
- Integrations that call the NetSuite REST API using SuiteQL
- SuiteAnalytics Workbook queries that feed into external systems

Search your codebase for `FROM transaction` and `FROM transactionLine` as a starting point. Any query that uses these tables without `ORDER BY` is a candidate for review.

## The fix

Add an explicit `ORDER BY` clause to every SuiteQL query that operates on transaction data. This removes the dependency on default sort behavior and makes the query deterministic regardless of how the default changes in future releases.

**Before (relies on default sort):**

```sql
SELECT id, tranId, tranDate, tranDisplayName, amount
FROM transaction
WHERE type = 'Invoice'
AND tranDate >= '2026-07-01'
```

**After (explicit sort):**

```sql
SELECT id, tranId, tranDate, tranDisplayName, amount
FROM transaction
WHERE type = 'Invoice'
AND tranDate >= '2026-07-01'
ORDER BY tranDate ASC
```

Choose the sort column that matches the intent of the query. If the script was designed to process transactions in chronological order, use `ORDER BY tranDate ASC`. If it was designed to process them in document-number order, use `ORDER BY tranId ASC`. If it is used for display purposes and the previous alphabetical order was intentional, `ORDER BY tranDisplayName ASC` restores it explicitly.

For paged queries, an explicit sort is especially important:

```sql
SELECT id, tranId, tranDate
FROM transaction
WHERE type = 'VendBill'
ORDER BY tranDate ASC
OFFSET 0 FETCH NEXT 1000 ROWS ONLY
```

Without `ORDER BY` on a paged query, different pages may return overlapping or skipped records if the underlying default sort shifts between requests.

## Frequently asked questions

**Does this affect all SuiteQL queries or only transaction queries?**
The change specifically affects the default sort behavior for transaction record queries. Non-transaction queries may have their own default sort behavior. Regardless of record type, adding explicit `ORDER BY` to any query that depends on result order is the correct practice.

**My query has been running without ORDER BY for years. Is it definitely affected?**
If your query hits transaction records and the order of results matters, yes. The order may have changed silently in 2026.2. The safest action is to add an explicit `ORDER BY` and verify the results match your expectations.

**Does this affect the N/search module as well?**
No. The change applies to SuiteQL queries using the N/query module, the REST API, and SuiteAnalytics Workbook. The N/search module uses a different query mechanism and is not affected by this specific change.

**Where is this documented?**
The SuiteQL behavior change is included in the NetSuite 2026.2 release notes. Review the SuiteQL section of the release notes for the complete details.

## How SuitePacific can help

Auditing SuiteScript implementations for implicit sort dependencies, particularly across scheduled and Map/Reduce scripts that process large transaction volumes, is the kind of technical review that prevents production issues before they appear.

If your NetSuite account recently upgraded to 2026.2 and you want to verify that your SuiteQL queries are not affected by this change, [contact SuitePacific](/contact). We can review your scripts and identify any queries that need an explicit sort order added.

For help identifying and updating affected SuiteQL queries in your scripts, see SuitePacific's [NetSuite SuiteScript development service](/netsuite-suitescript-development).
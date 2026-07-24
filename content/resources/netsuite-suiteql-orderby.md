---
title: "How to Fix NetSuite SuiteQL Queries Affected by the 2026.2 Default Sort Change"
description: "NetSuite 2026.2 changed the default sort for Transaction table SuiteQL queries from tranDisplayName to tranDate. Here is how to find and fix queries that relied on the old default order."
category: "SuiteScript"
tags: ["SuiteScript", "SuiteQL", "NetSuite Tips"]
publishedAt: "2026-07-21"
linkedinDay: 24
---

## What changed

As of NetSuite 2026.2, SuiteQL queries against the Transaction table that do not include an `ORDER BY` clause now return results sorted by `tranDate` instead of `tranDisplayName`.

| | Before 2026.2 | From 2026.2 |
|---|---|---|
| Default sort field | `tranDisplayName` (alphabetical) | `tranDate` (by transaction date) |
| Queries affected | Only those without `ORDER BY` | Only those without `ORDER BY` |

Queries that already include `ORDER BY` are not affected. This change also applies to SuiteQL used in Analytics Datasets.

<div style="background:#fefce8;border:1px solid #fde68a;border-radius:10px;overflow:hidden;margin:2rem 0;font-family:system-ui,-apple-system,sans-serif">
<div style="background:#78350f;padding:0.7rem 1.25rem;display:flex;align-items:center;gap:8px">
<span style="display:inline-block;width:8px;height:8px;border-radius:50%;background:#fbbf24"></span><span style="font-size:0.68rem;font-weight:700;color:#fef9c3;letter-spacing:0.08em">DEFAULT SORT CHANGE — ACTION REQUIRED</span>
</div>
<div style="padding:0.65rem 1.25rem;border-bottom:1px solid #fde68a">
<div style="font-size:0.8rem;font-weight:600;color:#713f12;margin-bottom:4px">SELECT ... FROM Transaction WHERE ... (no ORDER BY)</div>
<div style="display:flex;gap:2rem">
<span style="font-size:0.76rem;color:#92400e"><strong>Before 2026.2:</strong> sorted by <code style="background:#fef3c7;padding:0.1rem 0.3rem;border-radius:2px;font-size:0.72rem">tranDisplayName</code></span>
<span style="font-size:0.76rem;color:#14532d"><strong>From 2026.2:</strong> sorted by <code style="background:#d1fae5;padding:0.1rem 0.3rem;border-radius:2px;font-size:0.72rem">tranDate</code></span>
</div>
</div>
<div style="padding:0.65rem 1.25rem;background:#fffbeb;font-size:0.78rem;color:#713f12">
Fix: add <code style="background:#fef3c7;padding:0.1rem 0.3rem;border-radius:2px">ORDER BY tranDate</code> (or your intended sort) to any Transaction query where result order affects behavior. Applies to SuiteScript and Analytics Datasets.
</div>
</div>

## Step 1: Find affected queries in your codebase

Search for SuiteQL queries that query the Transaction table without an `ORDER BY` clause.

In SuiteScript, look for `query.runSuiteQL()` calls or `N/query` module usage. The affected pattern looks like this:

```javascript
query.runSuiteQL({
  query: `
    SELECT id, tranDate, tranDisplayName
    FROM Transaction
    WHERE custbody_custom_field = 'value'
  `
  // No ORDER BY - this is the problem
});
```

Search your codebase for `FROM Transaction` and review each result for a missing `ORDER BY`.

## Step 2: Decide if order matters for each query

Not every query without `ORDER BY` needs to be fixed. Only act on a query if your code depends on result order in any of these ways:

- The script reads the first result and expects it to be the most recent or alphabetically first
- The script processes results in a sequence where position matters
- The integration downstream assumes the data arrives in a particular order
- A report or workbook built on the dataset relies on sort order

If the script aggregates all results, looks up by a specific field value, or processes every row regardless of position, the sort change has no impact.

## Step 3: Add an explicit ORDER BY to affected queries

**To restore the previous alphabetical sort by display name:**

```javascript
query.runSuiteQL({
  query: `
    SELECT id, tranDate, tranDisplayName
    FROM Transaction
    WHERE custbody_custom_field = 'value'
    ORDER BY tranDisplayName ASC
  `
});
```

**To sort by transaction date, newest first:**

```javascript
query.runSuiteQL({
  query: `
    SELECT id, tranDate, tranDisplayName
    FROM Transaction
    WHERE custbody_custom_field = 'value'
    ORDER BY tranDate DESC
  `
});
```

**To sort by transaction date, oldest first:**

```javascript
query.runSuiteQL({
  query: `
    SELECT id, tranDate, tranDisplayName
    FROM Transaction
    WHERE custbody_custom_field = 'value'
    ORDER BY tranDate ASC
  `
});
```

Specifying `ORDER BY` explicitly makes your queries immune to future default sort changes.

## Step 4: Check Analytics Datasets

If you use SuiteQL in Analytics Datasets, open any dataset definition that queries the Transaction table. Look for queries without `ORDER BY` and evaluate whether sort order affects the workbooks or reports built on top of those datasets. Apply the same fix: add an explicit `ORDER BY`.

## Step 5: Test in sandbox

After updating your queries, run your scripts in a sandbox environment to confirm results come back in the expected order. Pay attention to scripts that do conditional logic based on the first result, or that pass results to another system in a specific sequence.

## Who is affected

- SuiteScript developers with scripts that run SuiteQL against the Transaction table
- Integration developers using the REST SuiteQL endpoint (`/services/rest/query/v1/suiteql`) to query Transaction records
- Analytics users who use SuiteQL in Datasets that query or join the Transaction table

Queries against other tables are not affected by this change.

For background on why this change was made, see [NetSuite Changed the Default Sort for SuiteQL Transaction Queries in 2026.2](/blog/netsuite-suiteql-default-sort-change).

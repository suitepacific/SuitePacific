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

## Step 1 — Find affected queries in your codebase

Search for SuiteQL queries that query the Transaction table without an `ORDER BY` clause.

In SuiteScript, look for `query.runSuiteQL()` calls or `N/query` module usage. The affected pattern looks like this:

```javascript
query.runSuiteQL({
  query: `
    SELECT id, tranDate, tranDisplayName
    FROM Transaction
    WHERE custbody_custom_field = 'value'
  `
  // No ORDER BY — this is the problem
});
```

Search your codebase for `FROM Transaction` and review each result for a missing `ORDER BY`.

## Step 2 — Decide if order matters for each query

Not every query without `ORDER BY` needs to be fixed. Only act on a query if your code depends on result order in any of these ways:

- The script reads the first result and expects it to be the most recent or alphabetically first
- The script processes results in a sequence where position matters
- The integration downstream assumes the data arrives in a particular order
- A report or workbook built on the dataset relies on sort order

If the script aggregates all results, looks up by a specific field value, or processes every row regardless of position, the sort change has no impact.

## Step 3 — Add an explicit ORDER BY to affected queries

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

## Step 4 — Check Analytics Datasets

If you use SuiteQL in Analytics Datasets, open any dataset definition that queries the Transaction table. Look for queries without `ORDER BY` and evaluate whether sort order affects the workbooks or reports built on top of those datasets. Apply the same fix: add an explicit `ORDER BY`.

## Step 5 — Test in sandbox

After updating your queries, run your scripts in a sandbox environment to confirm results come back in the expected order. Pay attention to scripts that do conditional logic based on the first result, or that pass results to another system in a specific sequence.

## Who is affected

- SuiteScript developers with scripts that run SuiteQL against the Transaction table
- Integration developers using the REST SuiteQL endpoint (`/services/rest/query/v1/suiteql`) to query Transaction records
- Analytics users who use SuiteQL in Datasets that query or join the Transaction table

Queries against other tables are not affected by this change.

For background on why this change was made, see [NetSuite Changed the Default Sort for SuiteQL Transaction Queries in 2026.2](/blog/netsuite-suiteql-default-sort-change).

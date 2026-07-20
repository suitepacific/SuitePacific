---
title: "NetSuite Changed the Default Sort for SuiteQL Transaction Queries in 2026.2"
description: "SuiteQL queries on the Transaction table that do not include an ORDER BY clause now return results sorted by tranDate instead of tranDisplayName. Any script that relies on the old default order may behave differently."
date: "2026-07-21"
tags: ["SuiteScript", "SuiteQL", "NetSuite Tips"]
---

If you run SuiteQL queries against the Transaction table in NetSuite and do not specify a sort order, your results now come back in a different order starting in 2026.2.

NetSuite changed the default sort column for Transaction queries:

- **Before 2026.2:** sorted by `Transaction.tranDisplayName` (alphabetical by display name)
- **From 2026.2 onward:** sorted by `Transaction.tranDate` (by transaction date)

This only affects queries that do not include an explicit `ORDER BY` clause. If your query specifies a sort order, nothing changes.

## Why this matters

SuiteQL, like most SQL dialects, does not guarantee result order unless you ask for one. In practice, many queries skip `ORDER BY` and developers rely on whatever order the database returns. When NetSuite changes the underlying default, those queries return results in a different sequence without throwing any error.

For scripts that only need the data itself, the sort order is irrelevant. But for anything that processes results in order, reads the first row as the most relevant record, or passes an ordered list to a downstream system, this change will silently alter behavior.

The change also applies to **SuiteQL in Analytics Datasets**, not just SuiteScript.

## What might break

A query like this:

```sql
SELECT id, tranDate, tranDisplayName
FROM Transaction
WHERE custbody_custom_field = 'value'
```

Before 2026.2, this returned results sorted alphabetically by `tranDisplayName`. After 2026.2, the same query returns results sorted by `tranDate`. If your script assumed the old alphabetical order when processing the results, behavior has changed.

The failure mode here is subtle. There is no error. The script runs. It just operates on data in a different sequence.

## The fix

Add an explicit `ORDER BY` clause to every SuiteQL query where the order of results matters.

To restore the previous alphabetical sort:

```sql
SELECT id, tranDate, tranDisplayName
FROM Transaction
WHERE custbody_custom_field = 'value'
ORDER BY tranDisplayName ASC
```

To explicitly sort by date (now the default, but better to state it):

```sql
SELECT id, tranDate, tranDisplayName
FROM Transaction
WHERE custbody_custom_field = 'value'
ORDER BY tranDate DESC
```

Specifying `ORDER BY` makes your query immune to future default sort changes. It costs nothing and removes an implicit assumption that can bite you the next time a default changes.

## What to audit

Search your codebase for SuiteQL queries that:

1. Query the Transaction table or join to it
2. Do not include an `ORDER BY` clause

Those are the only queries affected. Non-Transaction tables are not impacted, and any query that already specifies a sort order is unaffected.

If you use SuiteQL in Analytics Datasets, review dataset definitions that query Transaction records without a specified sort order.

For a step-by-step guide to finding and fixing affected queries, see [How to Update Your NetSuite SuiteQL Queries After the 2026.2 Default Sort Change](/resources/netsuite-suiteql-orderby).

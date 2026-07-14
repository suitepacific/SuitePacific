---
title: "Why search.runPaged() Should Replace search.run() for Large Datasets"
description: "search.run().getRange() has a 4,000-record ceiling in SuiteScript. Learn when to use search.runPaged() and how to implement it correctly to avoid silently missing records."
category: "SuiteScript"
tags: ["SuiteScript", "Performance", "Saved Search"]
publishedAt: "2026-07-14"
linkedinDay: 10
---

## The problem with search.run()

When you run a saved search in SuiteScript using `search.run()`, you retrieve results using `getRange()`:

```javascript
var results = mySearch.run().getRange({
    start: 0,
    end: 1000
});
```

This returns up to 1,000 results per call. You can call `getRange()` multiple times with different `start` and `end` values to retrieve additional records — `{ start: 1000, end: 2000 }`, `{ start: 2000, end: 3000 }`, and so on.

But there is a hard ceiling: `search.run()` will not return anything past index 3,999. If your search matches more than 4,000 records, the results beyond that limit are silently dropped.

No error is thrown. No warning is logged. The script simply processes fewer records than the search actually matched.

This is one of the more dangerous limitations in SuiteScript because it fails silently. A script that works correctly with 3,000 matching records will silently skip records as your data volume grows past 4,000.

## How search.runPaged() works differently

`search.runPaged()` removes the 4,000-record ceiling entirely. It returns a `PagedData` object that iterates through every matching result regardless of total count:

```javascript
var pagedData = mySearch.runPaged({
    pageSize: 1000
});

pagedData.pageRanges.iterator().each(function(pageRange) {
    var page = pagedData.fetch({
        index: pageRange.index
    });

    page.data.forEach(function(result) {
        // Process each result here
    });

    return true;
});
```

The `return true` inside the iterator is required to continue iteration. Returning `false` stops the loop early — useful for breaking out intentionally, but if you want to process all pages, always return `true`.

`pageSize` accepts values from 5 to 1,000. Using 1,000 minimizes the number of page fetches for large result sets.

## Why the difference matters in production

Scripts are often written when a dataset is small, then left running as the business grows. A script written for an account with 2,000 sales orders works fine. Two years later with 15,000 orders, it silently processes only 4,000 — and there is no obvious sign that anything is wrong. Month-end reports balance, jobs complete without errors, and the gap is only discovered when someone notices the numbers don't add up.

`search.runPaged()` eliminates this class of bug. The script either processes all records or throws a runtime error — there is no silent partial execution.

## When to use each method

**Use `search.run()` when:**
- The result set is small and bounded — a lookup of a specific subset, a UI-facing feature that only needs the first page of results, or a search filtered tightly enough that it will never approach 4,000 records
- You only need a single `getRange()` call and the total count is well-known

**Use `search.runPaged()` when:**
- The script processes operational data — orders, invoices, customers, inventory transactions — that grows over time
- You are writing a Scheduled Script or Map/Reduce script designed for ongoing batch processing
- You cannot guarantee the search will stay under 4,000 results as the account scales

## The practical rule

If you are writing a script that will run repeatedly against growing data, use `search.runPaged()` by default. The overhead compared to `getRange()` is minimal, and it removes an entire category of silent data loss bugs.

Build the script for tomorrow's data volume, not today's.

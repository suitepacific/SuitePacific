---
title: "Why search.runPaged() Should Replace search.run() for Large Datasets"
description: "search.run().getRange() has a 4,000-record ceiling in SuiteScript. Learn when to use search.runPaged() and how to implement it correctly to avoid silently missing records."
category: "SuiteScript"
tags: ["SuiteScript", "Performance", "Saved Search"]
publishedAt: "2026-07-14"
updatedAt: "2026-08-15"
linkedinDay: 10
---

<div style="background:#eef2fb;border:1px solid #b2c2e6;border-radius:10px;padding:1.25rem 1.5rem;margin:2rem 0;font-family:system-ui,-apple-system,sans-serif">
<p style="margin:0 0 0.5rem;font-size:0.7rem;font-weight:700;color:#4f7fff;text-transform:uppercase;letter-spacing:0.08em">Quick answer</p>
<p style="margin:0;color:#14306b;font-size:0.9rem;line-height:1.6">search.run().getRange() in SuiteScript has a hard ceiling of 4,000 records and silently returns only the first 4,000 when a search returns more. search.runPaged() iterates through results in pages of up to 1,000 records each and processes every matching record regardless of total count. For any saved search that might return more than 1,000 records in production, use search.runPaged(). The pattern is: call search.runPaged({pageSize: 1000}), iterate through pagedData.fetch({index: i}) for each page, and process each page's data array. Running getRange() on large datasets produces a silent truncation bug that only surfaces when data volume grows past the threshold.</p>
</div>

## What Is the Problem with search.run().getRange()?

When you run a saved search in SuiteScript using `search.run()`, you retrieve results using `getRange()`:

```javascript
var results = mySearch.run().getRange({
    start: 0,
    end: 1000
});
```

This returns up to 1,000 results per call. You can call `getRange()` multiple times with different `start` and `end` values to retrieve additional records, `{ start: 1000, end: 2000 }`, `{ start: 2000, end: 3000 }`, and so on.

But there is a hard ceiling: `search.run()` will not return anything past index 3,999. If your search matches more than 4,000 records, the results beyond that limit are silently dropped.

No error is thrown. No warning is logged. The script simply processes fewer records than the search actually matched.

This is one of the more dangerous limitations in SuiteScript because it fails silently. A script that works correctly with 3,000 matching records will silently skip records as your data volume grows past 4,000.

<figure style="margin:1.75rem 0">
<svg viewBox="0 0 680 124" xmlns="http://www.w3.org/2000/svg" style="width:100%;max-width:680px;display:block;font-family:system-ui,-apple-system,sans-serif">
  <!-- Left: search.run() with ceiling -->
  <rect x="0" y="0" width="320" height="124" rx="9" fill="#fef2f2" stroke="#fca5a5" stroke-width="1.5"/>
  <rect x="0" y="0" width="320" height="28" rx="9" fill="#991b1b"/>
  <rect x="0" y="18" width="320" height="10" fill="#991b1b"/>
  <text x="160" y="18" text-anchor="middle" font-size="10" font-weight="700" fill="#fee2e2">search.run(): hard 4,000-record ceiling</text>
  <!-- Bar showing data -->
  <rect x="16" y="36" width="288" height="16" rx="3" fill="#bbf7d0"/>
  <text x="120" y="48" font-size="8" fill="#14532d">records 1–3,999 returned</text>
  <rect x="16" y="56" width="144" height="16" rx="3" fill="#ef4444" opacity="0.6"/>
  <text x="88" y="68" text-anchor="middle" font-size="8" fill="#fee2e2">records 4,000+ silently dropped</text>
  <line x1="160" y1="52" x2="160" y2="52" stroke="#991b1b" stroke-width="0"/>
  <!-- Danger indicator -->
  <rect x="16" y="80" width="288" height="18" rx="4" fill="#991b1b" opacity="0.2"/>
  <text x="160" y="93" text-anchor="middle" font-size="8.5" font-weight="700" fill="#991b1b">No error. No warning. Silent data loss.</text>
  <text x="160" y="112" text-anchor="middle" font-size="8" fill="#991b1b">Works on 3K records; fails silently at 5K</text>
  <!-- Right: search.runPaged() -->
  <rect x="360" y="0" width="320" height="124" rx="9" fill="#f0fdf4" stroke="#86efac" stroke-width="1.5"/>
  <rect x="360" y="0" width="320" height="28" rx="9" fill="#14532d"/>
  <rect x="360" y="18" width="320" height="10" fill="#14532d"/>
  <text x="520" y="18" text-anchor="middle" font-size="10" font-weight="700" fill="#dcfce7">search.runPaged(): no ceiling</text>
  <!-- Full bar -->
  <rect x="376" y="36" width="288" height="16" rx="3" fill="#bbf7d0"/>
  <text x="520" y="48" text-anchor="middle" font-size="8" fill="#14532d">all matching records returned (unlimited)</text>
  <text x="520" y="72" text-anchor="middle" font-size="8.5" fill="#14532d">Returns pages of up to 1,000 per call</text>
  <text x="520" y="86" text-anchor="middle" font-size="8.5" fill="#14532d">iterate until no more results</text>
  <text x="520" y="112" text-anchor="middle" font-size="8" font-weight="600" fill="#14532d">Safe for datasets of any size</text>
</svg>
<figcaption style="text-align:center;font-size:0.78rem;color:#8aa2d6;margin-top:0.4rem">Use search.runPaged() any time the result set might exceed 4,000 records now or in the future.</figcaption>
</figure>

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

The `return true` inside the iterator is required to continue iteration. Returning `false` stops the loop early, useful for breaking out intentionally, but if you want to process all pages, always return `true`.

`pageSize` accepts values from 5 to 1,000. Using 1,000 minimizes the number of page fetches for large result sets.

## Why Does This Matter in Production?

Scripts are often written when a dataset is small, then left running as the business grows. A script written for an account with 2,000 sales orders works fine. Two years later with 15,000 orders, it silently processes only 4,000, and there is no obvious sign that anything is wrong. Month-end reports balance, jobs complete without errors, and the gap is only discovered when someone notices the numbers don't add up.

`search.runPaged()` eliminates this class of bug. The script either processes all records or throws a runtime error, there is no silent partial execution.

## When to use each method

**Use `search.run()` when:**
- The result set is small and bounded, a lookup of a specific subset, a UI-facing feature that only needs the first page of results, or a search filtered tightly enough that it will never approach 4,000 records
- You only need a single `getRange()` call and the total count is well-known

**Use `search.runPaged()` when:**
- The script processes operational data, orders, invoices, customers, inventory transactions, that grows over time
- You are writing a Scheduled Script or Map/Reduce script designed for ongoing batch processing
- You cannot guarantee the search will stay under 4,000 results as the account scales

## When Should You Use search.runPaged()?

If you are writing a script that will run repeatedly against growing data, use `search.runPaged()` by default. The overhead compared to `getRange()` is minimal, and it removes an entire category of silent data loss bugs.

Build the script for tomorrow's data volume, not today's.

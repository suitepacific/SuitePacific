---
title: "NetSuite Map/Reduce: Why getInputData() Should Do Almost Nothing"
description: "getInputData() is the most misunderstood stage in SuiteScript Map/Reduce. Its job is to define the workload, not execute it. Loading records or running searches inside getInputData() defeats the purpose of the framework entirely."
category: "Map/Reduce"
tags: ["Map/Reduce", "SuiteScript", "Performance"]
publishedAt: "2026-07-13"
linkedinDay: 13
---

## The misunderstood stage

Most Map/Reduce documentation focuses on the `map()` and `reduce()` stages, where the actual processing happens. But `getInputData()` is where the most consequential design decisions are made, and where the most common performance mistakes occur.

`getInputData()` runs in a single execution context, before NetSuite distributes any work. Whatever happens in `getInputData()` cannot benefit from Map/Reduce's parallel processing. It runs once, sequentially, on one thread.

Its job is simple: tell NetSuite what records need to be processed. Return a data source, and let the framework take it from there.

<figure style="margin:1.75rem 0">
<svg viewBox="0 0 680 152" xmlns="http://www.w3.org/2000/svg" style="width:100%;max-width:680px;display:block;font-family:system-ui,-apple-system,sans-serif">
  <defs>
    <marker id="gid-arrow-r" markerWidth="7" markerHeight="7" refX="5" refY="3" orient="auto"><path d="M0,0 L0,6 L7,3 z" fill="#ef4444"/></marker>
    <marker id="gid-arrow-g" markerWidth="7" markerHeight="7" refX="5" refY="3" orient="auto"><path d="M0,0 L0,6 L7,3 z" fill="#16a34a"/></marker>
  </defs>
  <!-- Left: Wrong pattern -->
  <rect x="0" y="0" width="320" height="152" rx="9" fill="#fef2f2" stroke="#fca5a5" stroke-width="1.5"/>
  <rect x="0" y="0" width="320" height="28" rx="9" fill="#991b1b"/>
  <rect x="0" y="18" width="320" height="10" fill="#991b1b"/>
  <text x="160" y="18" text-anchor="middle" font-size="10" font-weight="700" fill="#fee2e2">getInputData(): wrong pattern</text>
  <rect x="16" y="36" width="288" height="18" rx="4" fill="#fca5a5" opacity="0.7"/>
  <text x="160" y="49" text-anchor="middle" font-size="8.5" fill="#7f1d1d">Run search inside getInputData()</text>
  <line x1="160" y1="54" x2="160" y2="64" stroke="#ef4444" stroke-width="1.5" marker-end="url(#gid-arrow-r)"/>
  <rect x="16" y="64" width="288" height="18" rx="4" fill="#fca5a5" opacity="0.7"/>
  <text x="160" y="77" text-anchor="middle" font-size="8.5" fill="#7f1d1d">Loop through ALL results sequentially</text>
  <line x1="160" y1="82" x2="160" y2="92" stroke="#ef4444" stroke-width="1.5" marker-end="url(#gid-arrow-r)"/>
  <rect x="16" y="92" width="288" height="18" rx="4" fill="#fca5a5" opacity="0.7"/>
  <text x="160" y="105" text-anchor="middle" font-size="8.5" fill="#7f1d1d">Build array, then pass to map()</text>
  <text x="160" y="126" text-anchor="middle" font-size="8" fill="#991b1b">All work in single thread · no parallel benefit</text>
  <text x="160" y="140" text-anchor="middle" font-size="8" font-weight="700" fill="#991b1b">Governance limit risk on large datasets</text>
  <!-- Right: Correct pattern -->
  <rect x="360" y="0" width="320" height="152" rx="9" fill="#f0fdf4" stroke="#86efac" stroke-width="1.5"/>
  <rect x="360" y="0" width="320" height="28" rx="9" fill="#14532d"/>
  <rect x="360" y="18" width="320" height="10" fill="#14532d"/>
  <text x="520" y="18" text-anchor="middle" font-size="10" font-weight="700" fill="#dcfce7">getInputData(): correct pattern</text>
  <rect x="376" y="36" width="288" height="18" rx="4" fill="#bbf7d0" stroke="#4ade80" stroke-width="1"/>
  <text x="520" y="49" text-anchor="middle" font-size="8.5" font-weight="700" fill="#14532d">return search.load({ id: '...' })</text>
  <line x1="520" y1="54" x2="520" y2="68" stroke="#16a34a" stroke-width="1.5" marker-end="url(#gid-arrow-g)"/>
  <rect x="376" y="68" width="288" height="62" rx="4" fill="#dcfce7"/>
  <text x="520" y="84" text-anchor="middle" font-size="8.5" fill="#14532d">NetSuite framework handles:</text>
  <text x="520" y="97" text-anchor="middle" font-size="8.5" fill="#14532d">· iterating results</text>
  <text x="520" y="110" text-anchor="middle" font-size="8.5" fill="#14532d">· distributing to parallel map() workers</text>
  <text x="520" y="123" text-anchor="middle" font-size="8.5" fill="#14532d">· managing governance per execution</text>
  <text x="520" y="140" text-anchor="middle" font-size="8" font-weight="700" fill="#14532d">Full parallel benefit · scales with dataset size</text>
</svg>
<figcaption style="text-align:center;font-size:0.78rem;color:#8aa2d6;margin-top:0.4rem">Return the search object itself, not an array you built by looping. The framework does the rest.</figcaption>
</figure>

## What many scripts do instead

A common pattern uses `getInputData()` to run a search, loop through every result, and build an array before passing it to `map()`:

```javascript
function getInputData() {
    var data = [];

    search.load({ id: 'customsearch_orders' })
        .run()
        .each(function(result) {
            data.push(result.id);
            return true;
        });

    return data;
}
```

This works. But by the time `map()` starts, all the search execution has already happened in a single thread. The script has loaded and iterated every result before NetSuite has had any opportunity to distribute the workload.

If the search returns 10,000 records, `getInputData()` processes all 10,000 sequentially. Then `map()` distributes what's left. The stage that was supposed to benefit from parallelism has already done the heavy lifting before parallelism begins.

## The correct approach: return a data source object

Instead of executing the search inside `getInputData()`, return the search object itself:

```javascript
function getInputData() {
    return search.load({
        id: 'customsearch_orders'
    });
}
```

When you return a `Search` object, NetSuite's Map/Reduce framework handles execution and distribution. The framework fetches results in pages and hands them to `map()` workers in parallel. The script no longer pre-executes anything, it simply identifies what needs to be processed.

The same applies when using the N/query module. Return the `Query` object, not the executed results:

```javascript
function getInputData() {
    return query.create({
        type: query.Type.SALES_ORDER
    }); // NetSuite handles execution
}
```

## Why this matters for governance

`getInputData()` runs under the standard scheduled script governance limits. When you pre-execute a large search inside it, you consume governance units before any parallel processing begins.

By returning a Search or Query object instead, you defer execution to the Map/Reduce framework, which handles pagination and distribution more efficiently. The result is lower governance consumption in `getInputData()`, more work offloaded to `map()` workers, and a script that scales to larger datasets without hitting limits.

## What should stay out of getInputData()

Beyond pre-executing searches, these patterns in `getInputData()` undermine the framework:

- **Loading records to inspect them before building the work list:** if you need to filter records, add the condition to the search filter, not to a loop in `getInputData()`
- **Calling external APIs to build the input set:** external calls block the single `getInputData()` execution; move them to `map()` where each worker handles its own call
- **Performing business logic:** any transformation or calculation that can be deferred to `map()` should be deferred

The simpler `getInputData()` is, the more work the framework can distribute.

## The analogy

Think of Map/Reduce as a warehouse operation. `getInputData()` is the manager who creates the work order list. `map()` workers are the employees who execute each item on the list independently.

The manager's job is to write the list, not to start working through it before handing it off.

When `getInputData()` pre-executes the search, it is as if the manager processes half the orders before any workers have arrived. The work that was supposed to be distributed has already been done sequentially.

## The rule

`getInputData()` should return one of:
- A `Search` object, `search.load()` or `search.create()`
- A `Query` object, `query.create()`
- A small, known array when the input set is genuinely fixed and small

It should not execute searches, load records, or perform business logic.

The best `getInputData()` functions are often the ones that do the least.

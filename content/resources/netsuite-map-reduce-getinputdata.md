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

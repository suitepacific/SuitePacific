---
title: "NetSuite Map/Reduce: Why Each map() Execution Must Be Independent"
description: "The power of Map/Reduce comes from parallel execution. If your map() function shares state with other invocations, through global variables, running totals, or order assumptions, that parallelism breaks silently. Learn why, and how to design map() correctly."
category: "Map/Reduce"
tags: ["Map/Reduce", "SuiteScript", "Performance"]
publishedAt: "2026-07-14"
linkedinDay: 14
---

## The core design principle of map()

SuiteScript Map/Reduce distributes work by running `map()` across multiple processors simultaneously. Each `map()` invocation receives one input item and processes it independently. This is what makes Map/Reduce faster than a Scheduled Script running the same work sequentially.

That parallelism only holds if each `map()` invocation can complete its work without depending on any other invocation. The moment one `map()` execution needs to know what another has done, or expects them to share state, the parallel model breaks.

<figure style="margin:1.75rem 0">
<svg viewBox="0 0 680 148" xmlns="http://www.w3.org/2000/svg" style="width:100%;max-width:680px;display:block;font-family:system-ui,-apple-system,sans-serif">
  <defs>
    <marker id="mri-arrow" markerWidth="7" markerHeight="7" refX="5" refY="3" orient="auto"><path d="M0,0 L0,6 L7,3 z" fill="#4f6fb0"/></marker>
  </defs>
  <text x="340" y="14" text-anchor="middle" font-size="10" font-weight="700" fill="#14306b" letter-spacing="0.05em">EACH map() IS ISOLATED — NO SHARED STATE</text>
  <!-- getInputData source -->
  <rect x="240" y="22" width="200" height="26" rx="6" fill="#060f26" stroke="#4f7fff" stroke-width="1.5"/>
  <text x="340" y="39" text-anchor="middle" font-size="9.5" font-weight="700" fill="#eef2fb">getInputData() — 1,000 items</text>
  <!-- Arrows to 4 map boxes -->
  <line x1="280" y1="48" x2="90" y2="72" stroke="#4f6fb0" stroke-width="1.5" marker-end="url(#mri-arrow)"/>
  <line x1="315" y1="48" x2="240" y2="72" stroke="#4f6fb0" stroke-width="1.5" marker-end="url(#mri-arrow)"/>
  <line x1="365" y1="48" x2="420" y2="72" stroke="#4f6fb0" stroke-width="1.5" marker-end="url(#mri-arrow)"/>
  <line x1="400" y1="48" x2="570" y2="72" stroke="#4f6fb0" stroke-width="1.5" marker-end="url(#mri-arrow)"/>
  <!-- 4 map() boxes -->
  <rect x="16" y="72" width="148" height="56" rx="6" fill="#eef2fb" stroke="#4f7fff" stroke-width="1.5"/>
  <text x="90" y="93" text-anchor="middle" font-size="9" font-weight="700" fill="#14306b">map() exec ①</text>
  <text x="90" y="106" text-anchor="middle" font-size="8" fill="#4f6fb0">Processes item 1–250</text>
  <text x="90" y="120" text-anchor="middle" font-size="8" fill="#4f6fb0">Own context · own governance</text>
  <rect x="176" y="72" width="148" height="56" rx="6" fill="#eef2fb" stroke="#4f7fff" stroke-width="1.5"/>
  <text x="250" y="93" text-anchor="middle" font-size="9" font-weight="700" fill="#14306b">map() exec ②</text>
  <text x="250" y="106" text-anchor="middle" font-size="8" fill="#4f6fb0">Processes item 251–500</text>
  <text x="250" y="120" text-anchor="middle" font-size="8" fill="#4f6fb0">Own context · own governance</text>
  <rect x="356" y="72" width="148" height="56" rx="6" fill="#eef2fb" stroke="#4f7fff" stroke-width="1.5"/>
  <text x="430" y="93" text-anchor="middle" font-size="9" font-weight="700" fill="#14306b">map() exec ③</text>
  <text x="430" y="106" text-anchor="middle" font-size="8" fill="#4f6fb0">Processes item 501–750</text>
  <text x="430" y="120" text-anchor="middle" font-size="8" fill="#4f6fb0">Own context · own governance</text>
  <rect x="516" y="72" width="148" height="56" rx="6" fill="#eef2fb" stroke="#4f7fff" stroke-width="1.5"/>
  <text x="590" y="93" text-anchor="middle" font-size="9" font-weight="700" fill="#14306b">map() exec ④</text>
  <text x="590" y="106" text-anchor="middle" font-size="8" fill="#4f6fb0">Processes item 751–1,000</text>
  <text x="590" y="120" text-anchor="middle" font-size="8" fill="#4f6fb0">Own context · own governance</text>
  <!-- Footer rule -->
  <rect x="0" y="138" width="680" height="10" rx="4" fill="#fef2f2" stroke="#fca5a5" stroke-width="1"/>
  <text x="340" y="146" text-anchor="middle" font-size="7.5" fill="#991b1b">Global variables: each exec reads its own module copy. Running totals and shared state do not accumulate across executions.</text>
</svg>
<figcaption style="text-align:center;font-size:0.78rem;color:#8aa2d6;margin-top:0.4rem">Parallel executions share no memory. Design each map() to be self-contained: all data it needs must come from context, not from shared state.</figcaption>
</figure>

## Why global variables do not work in map()

A common mistake is using a module-level variable to accumulate values across `map()` invocations:

```javascript
var total = 0; // Global variable

function map(context) {
    total += Number(context.value);
    // Trying to accumulate a running total
}
```

This looks like it should work, but it does not.

Each `map()` execution runs in its own execution context. When NetSuite dispatches a new `map()` invocation, it initializes the script environment fresh, including `total`, which resets to `0`. The value accumulated in one invocation is not visible to any other.

No error is thrown. The script completes. But `total` never reflects the full dataset, each invocation only ever accumulated its own single value before the context reset.

## What map() should do instead

The correct pattern is for each `map()` invocation to process its input and write a key-value pair to the context, which is passed to `reduce()`:

```javascript
function map(context) {
    var customerId = context.value.customerId;
    var amount = Number(context.value.amount);

    context.write({
        key: customerId,
        value: amount
    });
}
```

Each invocation processes one record and writes its contribution. `reduce()` then receives all values grouped by key and performs the aggregation. The `map()` stage never accumulates, it only transforms and routes.

## What reduce() is for

`reduce()` is designed specifically for combining multiple values that share a key. When you call `context.write({ key: ..., value: ... })` in `map()`, NetSuite collects all values that share the same key and passes them together to a single `reduce()` invocation.

This is the right place for running totals, sums, counts, and any logic that requires combining results from multiple records:

```javascript
function reduce(context) {
    var customerId = context.key;
    var amounts = context.values.map(Number);
    var total = amounts.reduce(function(sum, amount) {
        return sum + amount;
    }, 0);

    // Write or act on the aggregated total
    context.write({ key: customerId, value: total });
}
```

`reduce()` guarantees that all values for a given key are processed in a single invocation, which makes it the correct place for state that depends on multiple records. This guarantee does not exist in `map()`.

## Other assumptions that break in map()

Beyond global variables, these patterns also fail:

**Execution order:** Map/Reduce does not guarantee the order in which records are processed. If your `map()` logic depends on processing records in a specific sequence, it will produce inconsistent results as soon as the workload is distributed across multiple workers.

**Inter-invocation communication:** There is no mechanism for one `map()` invocation to pass data to another. Each starts and ends in isolation.

**Record locking assumptions:** If multiple `map()` invocations might update the same record, concurrent writes can cause errors or lost data. Design the work so each invocation operates on a distinct record.

## How to tell whether you need reduce()

If each record in the input can be fully processed on its own, update it, send a notification about it, evaluate a condition on it, you may not need `reduce()` at all. `map()` can write directly to a `summarize()` stage, or the work can be done within `map()` itself.

If processing requires combining values from multiple records, totals by customer, counts by category, sums by subsidiary, that is aggregation, and it belongs in `reduce()`.

The distinction: `map()` handles one record. `reduce()` combines many.

## The analogy

Think of `map()` as giving 100 workers one box each. Each worker opens their box, does the work, and sets it aside. They do not need to talk to each other to finish their box.

The moment workers need to coordinate, "what did you find in your box?", the work has become a `reduce()` problem. That coordination is exactly what `reduce()` is designed for, with the guarantee that all related items arrive together.

## The rule

Design each `map()` invocation to process one item and write its result forward via `context.write()`. Aggregation, combining, and state that spans multiple records belongs in `reduce()`.

The best `map()` functions do not know about each other.

---
title: "NetSuite Scheduled Script vs Map/Reduce Script: Choosing the Right Script Type"
description: "Using a Scheduled Script for work that should be handled by Map/Reduce is one of the most common causes of governance limit errors and slow batch processing. Learn the difference and when each type applies."
category: "SuiteScript"
tags: ["SuiteScript", "Map/Reduce", "Performance", "Best Practices"]
publishedAt: "2026-07-06"
updatedAt: "2026-08-15"
linkedinDay: 6
---

<div style="background:#eef2fb;border:1px solid #b2c2e6;border-radius:10px;padding:1.25rem 1.5rem;margin:2rem 0;font-family:system-ui,-apple-system,sans-serif">
<p style="margin:0 0 0.5rem;font-size:0.7rem;font-weight:700;color:#4f7fff;text-transform:uppercase;letter-spacing:0.08em">Quick answer</p>
<p style="margin:0;color:#14306b;font-size:0.9rem;line-height:1.6">NetSuite Scheduled Scripts run sequentially in a single thread with a 10,000 governance unit limit per execution. Map/Reduce Scripts distribute work across multiple parallel queues with a separate governance pool per stage (getInputData, map, reduce, summarize). Use a Scheduled Script when processing a small number of records sequentially, when operations must run in strict order, or when the total work fits within 10,000 units. Use a Map/Reduce Script when processing large datasets (hundreds or thousands of records), when operations are independent and can run in parallel, or when a Scheduled Script consistently hits its governance limit. Map/Reduce is the right default for any batch job that grows with data volume.</p>
</div>

## What Is the Difference Between a Scheduled Script and a Map/Reduce Script?

SuiteScript provides two script types designed for processing records in batch: Scheduled Scripts and Map/Reduce scripts. Both run in the background on a schedule or on demand. Both can process large numbers of records. But they work fundamentally differently, and choosing the wrong one for the workload is a reliable path to governance limit errors and slow execution.

<figure style="margin:1.75rem 0">
<svg viewBox="0 0 680 176" xmlns="http://www.w3.org/2000/svg" style="width:100%;max-width:680px;display:block;font-family:system-ui,-apple-system,sans-serif">
  <defs>
    <marker id="smr-arrow" markerWidth="7" markerHeight="7" refX="5" refY="3" orient="auto"><path d="M0,0 L0,6 L7,3 z" fill="#4f6fb0"/></marker>
    <marker id="smr-arrow-g" markerWidth="7" markerHeight="7" refX="5" refY="3" orient="auto"><path d="M0,0 L0,6 L7,3 z" fill="#16a34a"/></marker>
  </defs>
  <!-- Left panel: Scheduled Script -->
  <rect x="0" y="0" width="320" height="176" rx="9" fill="#eef2fb" stroke="#b2c2e6" stroke-width="1.5"/>
  <rect x="0" y="0" width="320" height="30" rx="9" fill="#0b1f4d"/>
  <rect x="0" y="20" width="320" height="10" fill="#0b1f4d"/>
  <text x="160" y="19" text-anchor="middle" font-size="10" font-weight="700" fill="#eef2fb" letter-spacing="0.04em">SCHEDULED SCRIPT: Single Thread</text>
  <!-- Sequential flow -->
  <rect x="20" y="42" width="280" height="22" rx="5" fill="#14306b"/>
  <text x="160" y="57" text-anchor="middle" font-size="9" font-weight="700" fill="#eef2fb">Start</text>
  <line x1="160" y1="64" x2="160" y2="76" stroke="#4f6fb0" stroke-width="1.5" marker-end="url(#smr-arrow)"/>
  <rect x="20" y="76" width="280" height="20" rx="4" fill="#d7e0f3" stroke="#4f7fff" stroke-width="1"/>
  <text x="160" y="90" text-anchor="middle" font-size="8.5" fill="#14306b">Record 1 → Record 2 → Record 3 → …</text>
  <line x1="160" y1="96" x2="160" y2="108" stroke="#4f6fb0" stroke-width="1.5" marker-end="url(#smr-arrow)"/>
  <rect x="20" y="108" width="280" height="20" rx="4" fill="#d7e0f3" stroke="#4f7fff" stroke-width="1"/>
  <text x="160" y="122" text-anchor="middle" font-size="8.5" fill="#14306b">All work: one governance budget</text>
  <text x="160" y="148" text-anchor="middle" font-size="8" fill="#4f6fb0">Hits limit → entire job fails</text>
  <text x="160" y="163" text-anchor="middle" font-size="8" font-weight="600" fill="#14306b">Best for: hundreds of records, simple logic</text>
  <!-- Right panel: Map/Reduce -->
  <rect x="360" y="0" width="320" height="176" rx="9" fill="#f0fdf4" stroke="#86efac" stroke-width="1.5"/>
  <rect x="360" y="0" width="320" height="30" rx="9" fill="#14532d"/>
  <rect x="360" y="20" width="320" height="10" fill="#14532d"/>
  <text x="520" y="19" text-anchor="middle" font-size="10" font-weight="700" fill="#dcfce7" letter-spacing="0.04em">MAP/REDUCE: Distributed Stages</text>
  <!-- Stages -->
  <rect x="400" y="42" width="240" height="18" rx="4" fill="#166534"/>
  <text x="520" y="55" text-anchor="middle" font-size="8.5" font-weight="700" fill="#dcfce7">getInputData(): define workload</text>
  <line x1="520" y1="60" x2="520" y2="70" stroke="#16a34a" stroke-width="1.5" marker-end="url(#smr-arrow-g)"/>
  <!-- 3 parallel map boxes -->
  <rect x="375" y="70" width="70" height="16" rx="3" fill="#bbf7d0" stroke="#4ade80" stroke-width="1"/>
  <text x="410" y="82" text-anchor="middle" font-size="7.5" fill="#14532d">map() ①</text>
  <rect x="450" y="70" width="70" height="16" rx="3" fill="#bbf7d0" stroke="#4ade80" stroke-width="1"/>
  <text x="485" y="82" text-anchor="middle" font-size="7.5" fill="#14532d">map() ②</text>
  <rect x="525" y="70" width="70" height="16" rx="3" fill="#bbf7d0" stroke="#4ade80" stroke-width="1"/>
  <text x="560" y="82" text-anchor="middle" font-size="7.5" fill="#14532d">map() ③</text>
  <text x="650" y="82" text-anchor="middle" font-size="7.5" fill="#4f6fb0">parallel</text>
  <line x1="520" y1="86" x2="520" y2="96" stroke="#16a34a" stroke-width="1.5" marker-end="url(#smr-arrow-g)"/>
  <rect x="400" y="96" width="240" height="18" rx="4" fill="#bbf7d0" stroke="#4ade80" stroke-width="1"/>
  <text x="520" y="109" text-anchor="middle" font-size="8.5" fill="#14532d">reduce(): aggregate by key</text>
  <line x1="520" y1="114" x2="520" y2="124" stroke="#16a34a" stroke-width="1.5" marker-end="url(#smr-arrow-g)"/>
  <rect x="400" y="124" width="240" height="18" rx="4" fill="#166534"/>
  <text x="520" y="137" text-anchor="middle" font-size="8.5" font-weight="700" fill="#dcfce7">summarize(): completion</text>
  <text x="520" y="155" text-anchor="middle" font-size="8" fill="#16a34a">Each map() gets its own governance budget</text>
  <text x="520" y="168" text-anchor="middle" font-size="8" font-weight="600" fill="#14532d">Best for: thousands of records, batch scale</text>
</svg>
<figcaption style="text-align:center;font-size:0.78rem;color:#8aa2d6;margin-top:0.4rem">Scheduled Scripts fail at scale because one governance budget covers all records. Map/Reduce distributes the budget across independent map() executions.</figcaption>
</figure>

## Scheduled Scripts: single-threaded, sequential

A Scheduled Script runs as a single execution. It starts, processes records one by one in sequence, and finishes. All of the work happens in one transaction context, on one thread.

This makes Scheduled Scripts well-suited for:
- **Small to medium workloads:** typically hundreds of records
- **Simple automations:** data updates, status changes, routine record creation
- **Notifications:** sending emails or alerts based on conditions
- **Routine maintenance tasks:** cleanup, synchronization, straightforward data processing

The advantages are simplicity: a Scheduled Script is easier to write, easier to deploy, and easier to debug than a Map/Reduce script. For workloads that fit within the script's governance limits, it is often the right tool.

The constraint is that all processing happens sequentially in a single execution context. The governance limit for a Scheduled Script is a fixed number of units, and if processing 5,000 records would exceed that limit, the script will fail partway through.

## Map/Reduce Scripts: distributed, parallel

A Map/Reduce script breaks the work into stages and distributes processing across multiple execution contexts. The `getInputData()` stage defines the workload, `map()` processes each item independently (potentially in parallel), `reduce()` aggregates results where needed, and `summarize()` handles completion.

This architecture makes Map/Reduce suitable for:
- **Large workloads:** thousands or millions of records
- **Data imports and mass updates:** high-volume operations that would exceed Scheduled Script governance limits
- **Document generation:** processing large batches of invoices, PDFs, or other outputs
- **Integrations:** syncing large datasets with external systems

The key advantage is scalability. Because `map()` executions run independently and can run in parallel, Map/Reduce can process far larger datasets than a Scheduled Script. It also has built-in error recovery, if one `map()` execution fails, it does not necessarily fail the entire job.

The tradeoff is complexity. Map/Reduce requires understanding the stage model and designing the workload accordingly. Debugging is more involved because execution is distributed across multiple contexts.

## The governance boundary

The clearest signal for which script type to use is whether the workload fits within a Scheduled Script's governance limits.

If you are writing a Scheduled Script and adding retry logic, checkpointing, or breaking the work into chunks to avoid hitting the governance ceiling, those are signs the workload belongs in Map/Reduce.

Map/Reduce is specifically designed to handle governance at scale: each `map()` invocation gets its own governance allocation, so the total governance available to the job scales with the number of items being processed.

## A common performance issue

Many NetSuite accounts have Scheduled Scripts that were written when the data volume was small and have since grown into a problem. A script that processed 200 records comfortably at go-live hits governance limits three years later when it needs to process 8,000. The fix is not to optimize the Scheduled Script, it is to rewrite it as a Map/Reduce script.

Choosing the right script type early avoids this migration cost. If the dataset could grow significantly over the life of the script, Map/Reduce is the safer design choice from the start.

## When Should You Use a Scheduled Script vs Map/Reduce?

**Handling hundreds of records, straightforward logic?** → Scheduled Script
Simple to build and maintain. Appropriate when the workload fits within a single governance budget.

**Handling thousands of records, or the dataset might grow significantly?** → Map/Reduce Script
Scales with data volume. Built for long-running, high-volume batch processing.

When the governance limit is a constraint rather than a rare edge case, that is the clearest signal to move to Map/Reduce.

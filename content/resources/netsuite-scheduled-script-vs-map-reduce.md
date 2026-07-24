---
title: "NetSuite Scheduled Script vs Map/Reduce Script: Choosing the Right Script Type"
description: "Using a Scheduled Script for work that should be handled by Map/Reduce is one of the most common causes of governance limit errors and slow batch processing. Learn the difference and when each type applies."
category: "SuiteScript"
tags: ["SuiteScript", "Map/Reduce", "Performance", "Best Practices"]
publishedAt: "2026-07-06"
linkedinDay: 6
---

## Two script types for batch processing

SuiteScript provides two script types designed for processing records in batch: Scheduled Scripts and Map/Reduce scripts. Both run in the background on a schedule or on demand. Both can process large numbers of records. But they work fundamentally differently, and choosing the wrong one for the workload is a reliable path to governance limit errors and slow execution.

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

## The quick rule

**Handling hundreds of records, straightforward logic?** → Scheduled Script
Simple to build and maintain. Appropriate when the workload fits within a single governance budget.

**Handling thousands of records, or the dataset might grow significantly?** → Map/Reduce Script
Scales with data volume. Built for long-running, high-volume batch processing.

When the governance limit is a constraint rather than a rare edge case, that is the clearest signal to move to Map/Reduce.

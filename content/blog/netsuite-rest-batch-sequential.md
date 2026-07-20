---
title: "NetSuite REST Web Services Now Supports Sequential Batch Processing"
description: "NetSuite 2026.2 adds sequential processing for batch operations in REST Web Services. This means batch requests can now execute in order, which matters when one operation depends on the result of another."
date: "2026-07-21"
tags: ["SuiteScript", "Authentication", "NetSuite Tips"]
---

NetSuite's REST Web Services API supports batch operations, which let you send multiple requests in a single HTTP call rather than making separate round trips for each one. Before 2026.2, the order in which those operations executed was not guaranteed.

NetSuite 2026.2 adds **sequential processing** for batch operations. When you use this option, operations in a batch execute in the order you specified. Each operation completes before the next one begins.

## Why order matters in batch operations

Many batch workflows involve operations that depend on each other. A common example:

1. Create a customer record
2. Create a sales order for that customer
3. Apply a payment to that sales order

In a parallel batch, there is no guarantee that the customer exists before the sales order creation runs. If step 2 executes before step 1 completes, the sales order creation fails because there is no customer to reference.

Sequential processing solves this. Operations run in the order you define, so dependent steps reliably have access to the results of earlier steps.

## When to use sequential vs. parallel

**Sequential processing** is appropriate when:

- One operation creates a record that another operation references
- You need the result of an earlier operation (such as a new record ID) in a later operation
- The order of execution has business logic implications
- You need predictable, repeatable behavior across all batch runs

**Parallel processing** is appropriate when:

- Operations are completely independent of each other
- Speed is more important than order
- You are updating existing records with no cross-dependencies

## What this means for existing integrations

If you have existing REST batch integrations that relied on operations running in a specific order, those integrations may have been relying on behavior that was never guaranteed. With sequential processing now available as an explicit option, you can make the ordering a deliberate choice rather than an assumption.

Review any batch integrations where order might matter and update them to use sequential processing where appropriate.

Sequential batch processing is available in NetSuite REST Web Services as of 2026.2. If you are building new integrations that use batch operations with dependencies between steps, this is now the correct approach.

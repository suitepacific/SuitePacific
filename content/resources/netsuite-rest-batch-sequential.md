---
title: "How to Use Sequential Batch Processing in NetSuite REST Web Services"
description: "NetSuite 2026.2 adds sequential processing for REST batch operations so you can run multiple API requests in a guaranteed order. Here is when to use it and what it means for dependent operations."
category: "SuiteScript"
tags: ["SuiteScript", "NetSuite Tips", "Security"]
publishedAt: "2026-07-21"
linkedinDay: 32
---

## What sequential batch processing is

NetSuite REST Web Services supports batch operations, which let you send multiple API requests in a single HTTP call. Before 2026.2, the execution order of those operations was not guaranteed.

As of 2026.2, you can enable sequential processing for a batch. When sequential processing is active, each operation in the batch completes before the next one begins, in the order you specified.

## When to use sequential processing

Use sequential processing when operations in your batch depend on each other.

**Example: create a record, then reference it**

If you create a new record in step 1 and a second operation in the same batch needs to reference that record's ID, sequential processing ensures the first record exists before the second operation runs.

Without sequential processing, there is no guarantee of order. If the second operation runs first, it fails because the record it references does not exist yet.

**Use sequential processing when:**

- One operation creates a record that another operation references
- You need a record ID from an earlier step to use in a later step
- Business logic requires operations to complete in a specific sequence
- You need consistent, predictable behavior on every batch run

**Use parallel processing when:**

- All operations are independent of each other
- You are updating separate, unrelated records
- Speed matters more than order

## What to check in existing batch integrations

If you have existing REST batch integrations where you assumed a particular execution order, that assumption was never guaranteed before 2026.2. Review those integrations and decide whether sequential processing should be enabled.

Any integration where:
- A later operation references a record created in an earlier operation
- Failures in one step should stop subsequent steps from running
- The order of record creation or update matters to downstream processes

should use sequential processing going forward.

## Availability

Sequential batch processing in REST Web Services is available as of NetSuite 2026.2. Check the NetSuite REST Web Services documentation for the specific request parameter to enable sequential mode on a batch call.

For background on this feature and a comparison of when to use sequential vs. parallel batch processing, see [NetSuite REST Web Services Now Supports Sequential Batch Processing](/blog/netsuite-rest-batch-sequential).

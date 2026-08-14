---
title: "How to Use Sequential Batch Processing in NetSuite REST Web Services"
description: "NetSuite 2026.2 adds sequential processing for REST batch operations so you can run multiple API requests in a guaranteed order. Here is when to use it and what it means for dependent operations."
category: "SuiteScript"
tags: ["SuiteScript", "NetSuite Tips", "Security"]
publishedAt: "2026-07-21"
updatedAt: "2026-08-15"
linkedinDay: 32
---

<div style="background:#eef2fb;border:1px solid #b2c2e6;border-radius:10px;padding:1.25rem 1.5rem;margin:2rem 0;font-family:system-ui,-apple-system,sans-serif">
<p style="margin:0 0 0.5rem;font-size:0.7rem;font-weight:700;color:#4f7fff;text-transform:uppercase;letter-spacing:0.08em">Quick answer</p>
<p style="margin:0;color:#14306b;font-size:0.9rem;line-height:1.6">Sequential batch processing in NetSuite REST Web Services (added in 2026.2) lets you send multiple API requests in a single batch payload and guarantee they execute in the order submitted. In the standard parallel batch mode, requests execute concurrently and a later request may complete before an earlier one. Sequential mode is for dependent operations where step 2 requires the result of step 1, such as creating a parent record and then creating child records that reference its internal ID. Set the execution mode to sequential in the batch request header to enable ordered processing.</p>
</div>

## What sequential batch processing is

NetSuite REST Web Services supports batch operations, which let you send multiple API requests in a single HTTP call. Before 2026.2, the execution order of those operations was not guaranteed.

As of 2026.2, you can enable sequential processing for a batch. When sequential processing is active, each operation in the batch completes before the next one begins, in the order you specified.

<figure style="margin:1.75rem 0">
<svg viewBox="0 0 680 138" xmlns="http://www.w3.org/2000/svg" style="width:100%;max-width:680px;display:block;font-family:system-ui,-apple-system,sans-serif">
  <defs>
    <marker id="rbs-arrow-r" markerWidth="7" markerHeight="7" refX="5" refY="3" orient="auto"><path d="M0,0 L0,6 L7,3 z" fill="#ef4444"/></marker>
    <marker id="rbs-arrow-g" markerWidth="7" markerHeight="7" refX="5" refY="3" orient="auto"><path d="M0,0 L0,6 L7,3 z" fill="#16a34a"/></marker>
  </defs>
  <!-- Left: Parallel -->
  <rect x="0" y="0" width="320" height="138" rx="9" fill="#fef2f2" stroke="#fca5a5" stroke-width="1.5"/>
  <rect x="0" y="0" width="320" height="26" rx="9" fill="#7f1d1d"/>
  <rect x="0" y="16" width="320" height="10" fill="#7f1d1d"/>
  <text x="160" y="17" text-anchor="middle" font-size="10" font-weight="700" fill="#fee2e2">Parallel batch (before 2026.2)</text>
  <rect x="70" y="33" width="180" height="16" rx="4" fill="#991b1b" opacity="0.7"/>
  <text x="160" y="45" text-anchor="middle" font-size="8.5" font-weight="700" fill="#fee2e2">Batch request sent</text>
  <line x1="110" y1="49" x2="60" y2="60" stroke="#ef4444" stroke-width="1.5" marker-end="url(#rbs-arrow-r)"/>
  <line x1="160" y1="49" x2="160" y2="60" stroke="#ef4444" stroke-width="1.5" marker-end="url(#rbs-arrow-r)"/>
  <line x1="210" y1="49" x2="260" y2="60" stroke="#ef4444" stroke-width="1.5" marker-end="url(#rbs-arrow-r)"/>
  <rect x="16" y="60" width="88" height="16" rx="3" fill="#fca5a5"/>
  <text x="60" y="72" text-anchor="middle" font-size="8" fill="#7f1d1d">Create customer</text>
  <rect x="116" y="60" width="88" height="16" rx="3" fill="#fca5a5"/>
  <text x="160" y="72" text-anchor="middle" font-size="8" fill="#7f1d1d">Create order</text>
  <rect x="216" y="60" width="88" height="16" rx="3" fill="#fca5a5"/>
  <text x="260" y="72" text-anchor="middle" font-size="8" fill="#7f1d1d">Apply payment</text>
  <text x="160" y="96" text-anchor="middle" font-size="8" fill="#991b1b">Execution order: not guaranteed</text>
  <text x="160" y="110" text-anchor="middle" font-size="8" font-weight="700" fill="#991b1b">Dependent steps may fail intermittently</text>
  <!-- Right: Sequential -->
  <rect x="360" y="0" width="320" height="138" rx="9" fill="#f0fdf4" stroke="#86efac" stroke-width="1.5"/>
  <rect x="360" y="0" width="320" height="26" rx="9" fill="#14532d"/>
  <rect x="360" y="16" width="320" height="10" fill="#14532d"/>
  <text x="520" y="17" text-anchor="middle" font-size="10" font-weight="700" fill="#dcfce7">Sequential batch (2026.2+)</text>
  <rect x="430" y="33" width="180" height="14" rx="4" fill="#166534"/>
  <text x="520" y="44" text-anchor="middle" font-size="8.5" font-weight="700" fill="#dcfce7">Batch request sent</text>
  <line x1="520" y1="47" x2="520" y2="57" stroke="#16a34a" stroke-width="1.5" marker-end="url(#rbs-arrow-g)"/>
  <rect x="430" y="57" width="180" height="14" rx="3" fill="#bbf7d0" stroke="#4ade80" stroke-width="1"/>
  <text x="520" y="68" text-anchor="middle" font-size="8.5" font-weight="700" fill="#14532d">① Create customer</text>
  <line x1="520" y1="71" x2="520" y2="81" stroke="#16a34a" stroke-width="1.5" marker-end="url(#rbs-arrow-g)"/>
  <rect x="430" y="81" width="180" height="14" rx="3" fill="#bbf7d0" stroke="#4ade80" stroke-width="1"/>
  <text x="520" y="92" text-anchor="middle" font-size="8.5" font-weight="700" fill="#14532d">② Create order (customer exists ✓)</text>
  <line x1="520" y1="95" x2="520" y2="105" stroke="#16a34a" stroke-width="1.5" marker-end="url(#rbs-arrow-g)"/>
  <rect x="430" y="105" width="180" height="14" rx="3" fill="#bbf7d0" stroke="#4ade80" stroke-width="1"/>
  <text x="520" y="116" text-anchor="middle" font-size="8.5" font-weight="700" fill="#14532d">③ Apply payment (order exists ✓)</text>
  <text x="520" y="131" text-anchor="middle" font-size="8" font-weight="600" fill="#14532d">Each step completes before the next begins</text>
</svg>
</figure>

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

---
title: "NetSuite REST Web Services Now Supports Sequential Batch Processing"
description: "NetSuite 2026.2 adds sequential processing for batch operations in REST Web Services. This means batch requests can now execute in order, which matters when one operation depends on the result of another."
date: "2026-07-21"
updated: "2026-08-07"
tags: ["SuiteScript", "Authentication", "NetSuite Tips"]
---

NetSuite's REST Web Services API supports batch operations, which let you send multiple requests in a single HTTP call rather than making separate round trips for each one. Before 2026.2, the order in which those operations executed was not guaranteed.

NetSuite 2026.2 adds **sequential processing** for batch operations. When you use this option, operations in a batch execute in the order you specified. Each operation completes before the next one begins.

<figure style="margin:1.75rem 0">
<svg viewBox="0 0 680 164" xmlns="http://www.w3.org/2000/svg" style="width:100%;max-width:680px;display:block;font-family:system-ui,-apple-system,sans-serif">
  <defs>
    <marker id="batch-arrow" markerWidth="7" markerHeight="7" refX="5" refY="3" orient="auto"><path d="M0,0 L0,6 L7,3 z" fill="#4f6fb0"/></marker>
    <marker id="batch-arrow-g" markerWidth="7" markerHeight="7" refX="5" refY="3" orient="auto"><path d="M0,0 L0,6 L7,3 z" fill="#16a34a"/></marker>
  </defs>
  <!-- Left: Parallel (before 2026.2) -->
  <rect x="0" y="0" width="320" height="164" rx="9" fill="#fef2f2" stroke="#fca5a5" stroke-width="1.5"/>
  <rect x="0" y="0" width="320" height="28" rx="9" fill="#7f1d1d"/>
  <rect x="0" y="18" width="320" height="10" fill="#7f1d1d"/>
  <text x="160" y="19" text-anchor="middle" font-size="10" font-weight="700" fill="#fee2e2">Parallel batch (before 2026.2)</text>
  <rect x="70" y="36" width="180" height="18" rx="4" fill="#991b1b" opacity="0.8"/>
  <text x="160" y="49" text-anchor="middle" font-size="9" font-weight="700" fill="#fee2e2">Batch request sent</text>
  <!-- 3 parallel ops -->
  <line x1="110" y1="54" x2="60" y2="66" stroke="#ef4444" stroke-width="1.5" marker-end="url(#batch-arrow)"/>
  <line x1="160" y1="54" x2="160" y2="66" stroke="#ef4444" stroke-width="1.5" marker-end="url(#batch-arrow)"/>
  <line x1="210" y1="54" x2="260" y2="66" stroke="#ef4444" stroke-width="1.5" marker-end="url(#batch-arrow)"/>
  <rect x="16" y="66" width="88" height="20" rx="4" fill="#fca5a5"/>
  <text x="60" y="80" text-anchor="middle" font-size="8.5" fill="#7f1d1d">Create customer</text>
  <rect x="116" y="66" width="88" height="20" rx="4" fill="#fca5a5"/>
  <text x="160" y="80" text-anchor="middle" font-size="8.5" fill="#7f1d1d">Create sales order</text>
  <rect x="216" y="66" width="88" height="20" rx="4" fill="#fca5a5"/>
  <text x="260" y="80" text-anchor="middle" font-size="8.5" fill="#7f1d1d">Apply payment</text>
  <text x="160" y="104" text-anchor="middle" font-size="8" fill="#991b1b">Order may run before customer exists.</text>
  <text x="160" y="117" text-anchor="middle" font-size="8" fill="#991b1b">Execution order: not guaranteed.</text>
  <rect x="20" y="132" width="280" height="22" rx="5" fill="#ef4444" opacity="0.3"/>
  <text x="160" y="147" text-anchor="middle" font-size="8.5" font-weight="700" fill="#991b1b">Result: dependent steps fail intermittently</text>
  <!-- Right: Sequential (2026.2+) -->
  <rect x="360" y="0" width="320" height="164" rx="9" fill="#f0fdf4" stroke="#86efac" stroke-width="1.5"/>
  <rect x="360" y="0" width="320" height="28" rx="9" fill="#14532d"/>
  <rect x="360" y="18" width="320" height="10" fill="#14532d"/>
  <text x="520" y="19" text-anchor="middle" font-size="10" font-weight="700" fill="#dcfce7">Sequential batch (2026.2+)</text>
  <rect x="430" y="36" width="180" height="18" rx="4" fill="#166534"/>
  <text x="520" y="49" text-anchor="middle" font-size="9" font-weight="700" fill="#dcfce7">Batch request sent</text>
  <line x1="520" y1="54" x2="520" y2="66" stroke="#16a34a" stroke-width="1.5" marker-end="url(#batch-arrow-g)"/>
  <rect x="430" y="66" width="180" height="18" rx="4" fill="#bbf7d0" stroke="#4ade80" stroke-width="1"/>
  <text x="520" y="79" text-anchor="middle" font-size="8.5" font-weight="700" fill="#14532d">① Create customer</text>
  <line x1="520" y1="84" x2="520" y2="96" stroke="#16a34a" stroke-width="1.5" marker-end="url(#batch-arrow-g)"/>
  <rect x="430" y="96" width="180" height="18" rx="4" fill="#bbf7d0" stroke="#4ade80" stroke-width="1"/>
  <text x="520" y="109" text-anchor="middle" font-size="8.5" font-weight="700" fill="#14532d">② Create sales order</text>
  <line x1="520" y1="114" x2="520" y2="126" stroke="#16a34a" stroke-width="1.5" marker-end="url(#batch-arrow-g)"/>
  <rect x="430" y="126" width="180" height="18" rx="4" fill="#bbf7d0" stroke="#4ade80" stroke-width="1"/>
  <text x="520" y="139" text-anchor="middle" font-size="8.5" font-weight="700" fill="#14532d">③ Apply payment</text>
  <text x="520" y="157" text-anchor="middle" font-size="8" font-weight="600" fill="#14532d">Each step completes before the next begins</text>
</svg>
<figcaption style="text-align:center;font-size:0.78rem;color:#8aa2d6;margin-top:0.4rem">Sequential processing makes dependency order explicit rather than assumed. Use it when later operations reference results from earlier ones.</figcaption>
</figure>

<div style="background:#eef2fb;border:1px solid #b2c2e6;border-radius:10px;padding:1.25rem 1.5rem;margin:2rem 0;font-family:system-ui,-apple-system,sans-serif">
<p style="margin:0 0 0.5rem;font-size:0.7rem;font-weight:700;color:#4f7fff;text-transform:uppercase;letter-spacing:0.08em">Quick answer</p>
<p style="margin:0;color:#14306b;font-size:0.9rem;line-height:1.6">NetSuite 2026.2 adds sequential processing as an option for batch operations in REST Web Services. Before this release, the execution order of operations in a batch was not guaranteed. Sequential processing ensures operations execute in the order you specify, with each completing before the next begins. This matters for batch workflows where one operation depends on the result of another: for example, creating a customer record first, then creating a sales order for that customer, then applying a payment. In a parallel batch, the sales order creation might execute before the customer exists and fail. Sequential processing makes the dependency order explicit and reliable. Use sequential processing when operations have dependencies between them; use parallel processing when operations are completely independent and throughput matters more than order. The REST Web Services batch endpoint is the same for both modes.</p>
</div>

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

## Frequently asked questions

**Q: Is sequential processing the new default, or does it need to be explicitly requested?**
A: Sequential processing is an explicit option you set at the batch request level. Parallel processing remains available. You specify which mode to use when constructing the batch request.

**Q: What happens if one operation fails in a sequential batch?**
A: In a sequential batch, a failure in one operation can prevent subsequent operations from running since later steps may depend on earlier results. Build error handling into your integration to determine how to handle partial batch failures, including whether to retry, skip, or roll back.

**Q: Does sequential processing affect how long the batch takes to complete?**
A: Yes. Sequential processing takes longer than parallel because each operation must complete before the next begins. For operations with no dependencies, parallel processing is faster. Sequential is the correct choice when correctness depends on order, not when you want performance.

**Q: Can I mix sequential and parallel operations within the same batch?**
A: The sequential vs. parallel mode applies to the batch as a whole. If you have a mix of dependent and independent operations, group the dependent ones in a sequential batch and the independent ones in separate parallel batches.

If you are working with REST Web Services using Token-Based Authentication, see our guide on the [NLAuth deprecation and TBA migration timeline](/blog/netsuite-nlauth-tba-end-of-support) for what changes ahead. For help designing or maintaining NetSuite integrations, [SuitePacific's integration services](/netsuite-integrations) cover REST, RESTlet, and scheduled sync approaches.

---
title: "record.load() vs search.lookupFields() in SuiteScript: When to Use Each"
description: "If you only need a few field values from a known record, search.lookupFields() is significantly faster than record.load(). Learn the difference, when each applies, and what search.lookupFields() cannot do."
category: "SuiteScript"
tags: ["SuiteScript", "Performance", "Best Practices"]
publishedAt: "2026-07-07"
updatedAt: "2026-08-15"
linkedinDay: 7
---

<div style="background:#eef2fb;border:1px solid #b2c2e6;border-radius:10px;padding:1.25rem 1.5rem;margin:2rem 0;font-family:system-ui,-apple-system,sans-serif">
<p style="margin:0 0 0.5rem;font-size:0.7rem;font-weight:700;color:#4f7fff;text-transform:uppercase;letter-spacing:0.08em">Quick answer</p>
<p style="margin:0;color:#14306b;font-size:0.9rem;line-height:1.6">search.lookupFields() retrieves specific field values from a known record without loading the full record object. It is significantly faster than record.load() for read-only field access because it executes a targeted database query rather than constructing a full record in memory. Use search.lookupFields() when you know the record's internal ID and only need a few body field values. Use record.load() when you need to access sublists, modify the record, or read fields that search.lookupFields() does not support (such as custom field types that are not body fields). For most field-value checks in beforeSubmit and afterSubmit scripts, search.lookupFields() is the right choice.</p>
</div>

## Why Is record.load() Expensive for Field Reads?

When a SuiteScript needs to read field values from a specific record, most developers reach for `record.load()`:

```javascript
var rec = record.load({
    type: record.Type.SALES_ORDER,
    id: 123
});
var status = rec.getValue('status');
var customer = rec.getValue('entity');
var total = rec.getValue('amount');
```

This works, but it loads the entire record, every body field, every sublist, every line item. For a sales order with 50 line items, you are loading all 50 lines and their associated data just to read three field values.

In a script that runs once, the overhead is negligible. In a Scheduled Script checking the status of hundreds of records nightly, or a User Event script that fires on every save, those full record loads accumulate quickly.

<figure style="margin:1.75rem 0">
<svg viewBox="0 0 680 156" xmlns="http://www.w3.org/2000/svg" style="width:100%;max-width:680px;display:block;font-family:system-ui,-apple-system,sans-serif">
  <!-- Left: record.load() -->
  <rect x="0" y="0" width="320" height="156" rx="9" fill="#fef2f2" stroke="#fca5a5" stroke-width="1.5"/>
  <rect x="0" y="0" width="320" height="28" rx="9" fill="#991b1b"/>
  <rect x="0" y="18" width="320" height="10" fill="#991b1b"/>
  <text x="160" y="18" text-anchor="middle" font-size="10" font-weight="700" fill="#fee2e2" letter-spacing="0.03em">record.load(): full record</text>
  <rect x="16" y="36" width="288" height="13" rx="3" fill="#fca5a5" opacity="0.6"/>
  <text x="160" y="47" text-anchor="middle" font-size="8" fill="#7f1d1d">All body fields (every field on the record type)</text>
  <rect x="16" y="53" width="288" height="13" rx="3" fill="#fca5a5" opacity="0.6"/>
  <text x="160" y="64" text-anchor="middle" font-size="8" fill="#7f1d1d">All line items (50 lines × all columns)</text>
  <rect x="16" y="70" width="288" height="13" rx="3" fill="#fca5a5" opacity="0.4"/>
  <text x="160" y="81" text-anchor="middle" font-size="8" fill="#7f1d1d">All address subrecords</text>
  <rect x="16" y="87" width="288" height="13" rx="3" fill="#fca5a5" opacity="0.25"/>
  <text x="160" y="98" text-anchor="middle" font-size="8" fill="#7f1d1d">All related record metadata</text>
  <rect x="16" y="107" width="288" height="13" rx="3" fill="#ef4444" opacity="0.25"/>
  <text x="160" y="118" text-anchor="middle" font-size="8" font-weight="700" fill="#991b1b">→ needed: status, entity, amount (3 fields)</text>
  <text x="160" y="143" text-anchor="middle" font-size="8.5" font-weight="700" fill="#991b1b">Governance: full record cost</text>
  <!-- Right: search.lookupFields() -->
  <rect x="360" y="0" width="320" height="156" rx="9" fill="#f0fdf4" stroke="#86efac" stroke-width="1.5"/>
  <rect x="360" y="0" width="320" height="28" rx="9" fill="#14532d"/>
  <rect x="360" y="18" width="320" height="10" fill="#14532d"/>
  <text x="520" y="18" text-anchor="middle" font-size="10" font-weight="700" fill="#dcfce7" letter-spacing="0.03em">search.lookupFields(): targeted read</text>
  <rect x="376" y="36" width="288" height="13" rx="3" fill="#d1fae5" opacity="0.4"/>
  <text x="520" y="47" text-anchor="middle" font-size="8" fill="#6b7280">body fields: not loaded</text>
  <rect x="376" y="53" width="288" height="13" rx="3" fill="#d1fae5" opacity="0.4"/>
  <text x="520" y="64" text-anchor="middle" font-size="8" fill="#6b7280">line items: not loaded</text>
  <rect x="376" y="70" width="288" height="13" rx="3" fill="#d1fae5" opacity="0.4"/>
  <text x="520" y="81" text-anchor="middle" font-size="8" fill="#6b7280">addresses: not loaded</text>
  <rect x="376" y="87" width="288" height="13" rx="3" fill="#d1fae5" opacity="0.4"/>
  <text x="520" y="98" text-anchor="middle" font-size="8" fill="#6b7280">metadata: not loaded</text>
  <rect x="376" y="107" width="288" height="13" rx="3" fill="#4ade80" opacity="0.6"/>
  <text x="520" y="118" text-anchor="middle" font-size="8" font-weight="700" fill="#14532d">→ returned: status, entity, amount ✓</text>
  <text x="520" y="143" text-anchor="middle" font-size="8.5" font-weight="700" fill="#14532d">Governance: fraction of record.load()</text>
</svg>
<figcaption style="text-align:center;font-size:0.78rem;color:#8aa2d6;margin-top:0.4rem">Use lookupFields() to read; use record.load() to write sublists, trigger User Events, or read data from line items.</figcaption>
</figure>

## A faster alternative for field reads

When you know a record's ID and just need specific field values, `search.lookupFields()` reads only what you ask for:

```javascript
var fields = search.lookupFields({
    type: search.Type.SALES_ORDER,
    id: 123,
    columns: ['status', 'entity', 'amount']
});

var status = fields.status;
var customer = fields.entity;
var total = fields.amount;
```

No full record load. Only the specified fields are retrieved. The governance and performance cost is a fraction of `record.load()`.

## What search.lookupFields() returns

The return value is a plain object with the field values keyed by field ID. Most fields return simple string or number values. Select fields (like `entity`, `status`) return the display value by default.

For fields that have both an internal ID and a display value, like a list/record field, `lookupFields()` returns the value in a format similar to how it appears in a search result. If you need the internal ID of a select field, you can access it via the result's `value` property in some cases, or run a search with the field as a column.

## What search.lookupFields() cannot do

This is important: `search.lookupFields()` is read-only. You cannot use the result to update the record. If your script needs to read values and then update the record based on what it reads, you still need `record.load()`, or you can use `lookupFields()` for the read and `record.submitFields()` for the update (keeping them separate).

`search.lookupFields()` also cannot read sublist data. If you need line items, sublists, or subrecords, you need `record.load()`.

## When Should You Use record.load() vs search.lookupFields()?

**Use `search.lookupFields()` when:**
- You know the record's internal ID
- You need to read one or a few body field values
- You do not need to update the record after reading
- Performance matters, the script runs frequently or across many records

**Use `record.load()` when:**
- You need to update the record after reading it
- You need to read or modify sublist data (line items, address sublists, etc.)
- You need to work with subrecords
- You need to read a large number of body fields where a full load is more practical

## A common use case: checking a field before deciding whether to act

A frequent pattern is checking a field value to decide whether further action is needed. This is where `lookupFields()` provides the clearest benefit:

```javascript
// Check status before deciding whether to process
var fields = search.lookupFields({
    type: search.Type.SALES_ORDER,
    id: orderId,
    columns: ['status', 'custbody_processed']
});

if (fields.status === 'Pending Fulfillment' && !fields.custbody_processed) {
    // Only load the full record when we know we need to update it
    var rec = record.load({
        type: record.Type.SALES_ORDER,
        id: orderId
    });
    // ... make updates
    rec.save();
}
```

This pattern is particularly useful in Scheduled Scripts that scan a large list of records: use `lookupFields()` to check a condition quickly, and only load the full record when you actually need to write to it.

## What Is the Rule for Choosing Between Them?

If you have an ID and need to read body field values, `search.lookupFields()` is the right tool. If you need to update the record, read sublists, or work with subrecords, use `record.load()`.

The fastest SuiteScript does only as much work as the task actually requires.

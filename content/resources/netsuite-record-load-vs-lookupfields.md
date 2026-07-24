---
title: "record.load() vs search.lookupFields() in SuiteScript: When to Use Each"
description: "If you only need a few field values from a known record, search.lookupFields() is significantly faster than record.load(). Learn the difference, when each applies, and what search.lookupFields() cannot do."
category: "SuiteScript"
tags: ["SuiteScript", "Performance", "Best Practices"]
publishedAt: "2026-07-07"
linkedinDay: 7
---

## The default pattern and its cost

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

## When to use each

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

## The rule

If you have an ID and need to read body field values, `search.lookupFields()` is the right tool. If you need to update the record, read sublists, or work with subrecords, use `record.load()`.

The fastest SuiteScript does only as much work as the task actually requires.

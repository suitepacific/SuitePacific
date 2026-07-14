---
title: "record.submitFields() vs record.load() in SuiteScript: Choosing the Right Update Method"
description: "Using record.load() to update a single body field is one of the most common SuiteScript performance mistakes. Learn when to use record.submitFields() — and the critical User Event caveat you need to know before switching."
category: "SuiteScript"
tags: ["SuiteScript", "Performance", "User Event"]
publishedAt: "2026-07-14"
linkedinDay: 8
---

## The common pattern

A typical record update in SuiteScript loads the full record, changes a value, and saves:

```javascript
var rec = record.load({
    type: record.Type.SALES_ORDER,
    id: 123
});
rec.setValue({ fieldId: 'memo', value: 'Updated' });
rec.save();
```

This works. But loading a record retrieves everything associated with it — all body fields, all sublists, all subrecords. When you only need to update a single body field, you are paying a full record load cost for a one-field change.

In a script that runs once or twice, this is irrelevant. In a Scheduled Script running nightly across thousands of transactions, or a Map/Reduce script processing your full orders list, it becomes a significant governance and performance cost.

## A faster alternative for body field updates

`record.submitFields()` updates body fields directly without loading the full record:

```javascript
record.submitFields({
    type: record.Type.SALES_ORDER,
    id: 123,
    values: {
        memo: 'Updated'
    }
});
```

No full record load. Lower governance usage. Faster execution per record.

You can update multiple body fields in a single call by adding more keys to the `values` object. The savings scale with the number of records your script processes — a script that handles 5,000 records with `submitFields()` instead of `record.load() + save()` will complete measurably faster and use fewer governance units.

## The critical caveat: User Event scripts

This is the most important thing to understand before switching from `record.load() + save()` to `submitFields()`.

**`record.submitFields()` does not trigger `beforeSubmit` or `afterSubmit` User Event scripts.**

If your NetSuite account has business logic in a User Event script that you expect to run on every record update — validation, field recalculation, downstream notifications, audit logging — `submitFields()` will bypass it silently.

This is not always a problem. If the User Event script handles something unrelated to the field you are updating, the bypass may be intentional and desirable. But if the script contains logic that must execute on every save, switching to `submitFields()` will stop running that logic without any error or warning.

Before making the switch: identify what User Event scripts are deployed on the record type you are updating and confirm whether any of them contain logic that needs to execute on this particular change.

## When to use each method

**Use `record.submitFields()` when:**
- You are updating one or a few body fields
- No User Event script needs to run as a result of the update
- The script runs at high volume — hundreds or thousands of records
- You want to reduce governance usage and execution time

**Use `record.load() + save()` when:**
- You need to update sublists or subrecords
- A User Event script must run on the save — validation, downstream logic, notifications
- You need to read other field values from the record before deciding what to update
- The update logic depends on the current state of the record

## The quick rule

Body fields only, no User Event dependencies → `record.submitFields()`

Sublists, subrecords, or User Events must run → `record.load() + save()`

The governance savings from `submitFields()` are real and meaningful at scale. The decision comes down to one audit: check what User Event scripts are deployed on that record type and confirm the bypass is safe before switching.

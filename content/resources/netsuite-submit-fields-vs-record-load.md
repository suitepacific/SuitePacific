---
title: "record.submitFields() vs record.load() in SuiteScript: Choosing the Right Update Method"
description: "Using record.load() to update a single body field is one of the most common SuiteScript performance mistakes. Learn when to use record.submitFields(), and the critical User Event caveat you need to know before switching."
category: "SuiteScript"
tags: ["SuiteScript", "Performance", "User Event"]
publishedAt: "2026-07-14"
updatedAt: "2026-08-15"
linkedinDay: 8
---

<div style="background:#eef2fb;border:1px solid #b2c2e6;border-radius:10px;padding:1.25rem 1.5rem;margin:2rem 0;font-family:system-ui,-apple-system,sans-serif">
<p style="margin:0 0 0.5rem;font-size:0.7rem;font-weight:700;color:#4f7fff;text-transform:uppercase;letter-spacing:0.08em">Quick answer</p>
<p style="margin:0;color:#14306b;font-size:0.9rem;line-height:1.6">record.submitFields() updates one or more body fields on a record without loading the full record object. It is faster than record.load() followed by record.save() because it skips constructing the full record in memory and executes a targeted update. The critical caveat: record.submitFields() does not trigger the beforeLoad or beforeSubmit User Event scripts on the record being updated, only afterSubmit. If the record has a beforeSubmit script that validates or modifies fields, bypassing it with submitFields() may produce inconsistent data. Always check whether User Event scripts on the target record type need to run before choosing submitFields().</p>
</div>

## Why Is record.load() Slow for Single-Field Updates?

A typical record update in SuiteScript loads the full record, changes a value, and saves:

```javascript
var rec = record.load({
    type: record.Type.SALES_ORDER,
    id: 123
});
rec.setValue({ fieldId: 'memo', value: 'Updated' });
rec.save();
```

This works. But loading a record retrieves everything associated with it, all body fields, all sublists, all subrecords. When you only need to update a single body field, you are paying a full record load cost for a one-field change.

In a script that runs once or twice, this is irrelevant. In a Scheduled Script running nightly across thousands of transactions, or a Map/Reduce script processing your full orders list, it becomes a significant governance and performance cost.

<figure style="margin:1.75rem 0">
<svg viewBox="0 0 680 162" xmlns="http://www.w3.org/2000/svg" style="width:100%;max-width:680px;display:block;font-family:system-ui,-apple-system,sans-serif">
  <!-- Left: record.load() -->
  <rect x="0" y="0" width="320" height="162" rx="9" fill="#fef2f2" stroke="#fca5a5" stroke-width="1.5"/>
  <rect x="0" y="0" width="320" height="30" rx="9" fill="#991b1b"/>
  <rect x="0" y="20" width="320" height="10" fill="#991b1b"/>
  <text x="160" y="19" text-anchor="middle" font-size="10" font-weight="700" fill="#fee2e2" letter-spacing="0.04em">record.load(): loads everything</text>
  <rect x="16" y="40" width="288" height="14" rx="3" fill="#fca5a5" opacity="0.6"/>
  <text x="160" y="51" text-anchor="middle" font-size="8" fill="#7f1d1d">All body fields (including unused ones)</text>
  <rect x="16" y="58" width="288" height="14" rx="3" fill="#fca5a5" opacity="0.6"/>
  <text x="160" y="69" text-anchor="middle" font-size="8" fill="#7f1d1d">Sublist: Item lines (all 50 line items)</text>
  <rect x="16" y="76" width="288" height="14" rx="3" fill="#fca5a5" opacity="0.6"/>
  <text x="160" y="87" text-anchor="middle" font-size="8" fill="#7f1d1d">Sublist: Billing / Shipping addresses</text>
  <rect x="16" y="94" width="288" height="14" rx="3" fill="#fca5a5" opacity="0.4"/>
  <text x="160" y="105" text-anchor="middle" font-size="8" fill="#7f1d1d">Subrecords (e.g. inventory detail)</text>
  <rect x="16" y="112" width="288" height="14" rx="3" fill="#ef4444" opacity="0.25"/>
  <text x="160" y="123" text-anchor="middle" font-size="8" font-weight="700" fill="#991b1b">→ target field: memo (1 field)</text>
  <text x="160" y="147" text-anchor="middle" font-size="8.5" font-weight="700" fill="#991b1b">Full governance cost per record</text>
  <!-- Right: record.submitFields() -->
  <rect x="360" y="0" width="320" height="162" rx="9" fill="#f0fdf4" stroke="#86efac" stroke-width="1.5"/>
  <rect x="360" y="0" width="320" height="30" rx="9" fill="#14532d"/>
  <rect x="360" y="20" width="320" height="10" fill="#14532d"/>
  <text x="520" y="19" text-anchor="middle" font-size="10" font-weight="700" fill="#dcfce7" letter-spacing="0.04em">record.submitFields(): targeted</text>
  <rect x="376" y="40" width="288" height="14" rx="3" fill="#d1fae5" opacity="0.5"/>
  <text x="520" y="51" text-anchor="middle" font-size="8" fill="#6b7280">body fields: skipped</text>
  <rect x="376" y="58" width="288" height="14" rx="3" fill="#d1fae5" opacity="0.5"/>
  <text x="520" y="69" text-anchor="middle" font-size="8" fill="#6b7280">sublists: not loaded</text>
  <rect x="376" y="76" width="288" height="14" rx="3" fill="#d1fae5" opacity="0.5"/>
  <text x="520" y="87" text-anchor="middle" font-size="8" fill="#6b7280">addresses: not loaded</text>
  <rect x="376" y="94" width="288" height="14" rx="3" fill="#d1fae5" opacity="0.5"/>
  <text x="520" y="105" text-anchor="middle" font-size="8" fill="#6b7280">subrecords: not loaded</text>
  <rect x="376" y="112" width="288" height="14" rx="3" fill="#4ade80" opacity="0.6"/>
  <text x="520" y="123" text-anchor="middle" font-size="8" font-weight="700" fill="#14532d">→ target field: memo (1 field) ✓</text>
  <text x="520" y="147" text-anchor="middle" font-size="8.5" font-weight="700" fill="#14532d">Fraction of the governance cost</text>
</svg>
<figcaption style="text-align:center;font-size:0.78rem;color:#8aa2d6;margin-top:0.4rem">The governance difference is negligible on one record. On 5,000 records in a nightly script, it is not.</figcaption>
</figure>

## What Is a Faster Alternative for Updating Body Fields?

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

You can update multiple body fields in a single call by adding more keys to the `values` object. The savings scale with the number of records your script processes, a script that handles 5,000 records with `submitFields()` instead of `record.load() + save()` will complete measurably faster and use fewer governance units.

## What Is the Critical Caveat for record.submitFields()?

This is the most important thing to understand before switching from `record.load() + save()` to `submitFields()`.

**`record.submitFields()` does not trigger `beforeSubmit` or `afterSubmit` User Event scripts.**

If your NetSuite account has business logic in a User Event script that you expect to run on every record update, validation, field recalculation, downstream notifications, audit logging, `submitFields()` will bypass it silently.

This is not always a problem. If the User Event script handles something unrelated to the field you are updating, the bypass may be intentional and desirable. But if the script contains logic that must execute on every save, switching to `submitFields()` will stop running that logic without any error or warning.

Before making the switch: identify what User Event scripts are deployed on the record type you are updating and confirm whether any of them contain logic that needs to execute on this particular change.

## When Should You Use submitFields() vs record.load()?

**Use `record.submitFields()` when:**
- You are updating one or a few body fields
- No User Event script needs to run as a result of the update
- The script runs at high volume, hundreds or thousands of records
- You want to reduce governance usage and execution time

**Use `record.load() + save()` when:**
- You need to update sublists or subrecords
- A User Event script must run on the save, validation, downstream logic, notifications
- You need to read other field values from the record before deciding what to update
- The update logic depends on the current state of the record

## When Should You Use record.submitFields() vs record.load()?

Body fields only, no User Event dependencies → `record.submitFields()`

Sublists, subrecords, or User Events must run → `record.load() + save()`

The governance savings from `submitFields()` are real and meaningful at scale. The decision comes down to one audit: check what User Event scripts are deployed on that record type and confirm the bypass is safe before switching.

---
title: "NetSuite beforeSubmit vs afterSubmit: Choosing the Right User Event Trigger"
description: "beforeSubmit and afterSubmit serve different purposes in NetSuite User Event scripts. Using the wrong one causes silent failures, data errors, and missed business logic. Learn when each fires and how to choose correctly."
category: "SuiteScript"
tags: ["SuiteScript", "User Event", "Best Practices"]
publishedAt: "2026-07-04"
linkedinDay: 4
---

## Two triggers, two different moments

NetSuite User Event scripts fire in response to record saves. Both `beforeSubmit` and `afterSubmit` run when a record is saved, but they fire at different points in the save process, and that difference determines what each one can and cannot do.

**beforeSubmit** fires after the user clicks Save but before the record is written to the database. The record exists in memory but is not yet committed.

**afterSubmit** fires after the record has been successfully written to the database. The record now has a permanent ID and all its data is committed.

Getting this wrong is one of the most common sources of subtle SuiteScript bugs, logic that looks correct but fails silently, or runs at the wrong time.

<figure style="margin:1.75rem 0">
<svg viewBox="0 0 680 130" xmlns="http://www.w3.org/2000/svg" style="width:100%;max-width:680px;display:block;font-family:system-ui,-apple-system,sans-serif">
  <defs>
    <marker id="bs-arrow" markerWidth="7" markerHeight="7" refX="5" refY="3" orient="auto"><path d="M0,0 L0,6 L7,3 z" fill="#b2c2e6"/></marker>
  </defs>
  <!-- Title -->
  <text x="340" y="14" text-anchor="middle" font-size="10" font-weight="700" fill="#14306b" letter-spacing="0.05em">RECORD SAVE LIFECYCLE</text>
  <!-- Timeline baseline -->
  <line x1="40" y1="52" x2="640" y2="52" stroke="#d7e0f3" stroke-width="2"/>
  <!-- Node 1: User saves -->
  <circle cx="60" cy="52" r="10" fill="#eef2fb" stroke="#b2c2e6" stroke-width="2"/>
  <text x="60" y="56" text-anchor="middle" font-size="9" fill="#4f6fb0" font-weight="600">1</text>
  <text x="60" y="76" text-anchor="middle" font-size="9" fill="#4f6fb0">User clicks</text>
  <text x="60" y="87" text-anchor="middle" font-size="9" fill="#4f6fb0">Save</text>
  <!-- Arrow 1→2 -->
  <line x1="72" y1="52" x2="208" y2="52" stroke="#b2c2e6" stroke-width="1.5" marker-end="url(#bs-arrow)"/>
  <!-- Node 2: beforeSubmit -->
  <circle cx="220" cy="52" r="14" fill="#4f7fff" stroke="#14306b" stroke-width="2"/>
  <text x="220" y="56" text-anchor="middle" font-size="9" fill="#fff" font-weight="700">2</text>
  <text x="220" y="76" text-anchor="middle" font-size="10" fill="#14306b" font-weight="700">beforeSubmit</text>
  <text x="220" y="88" text-anchor="middle" font-size="8.5" fill="#4f6fb0">fires here</text>
  <!-- beforeSubmit callouts below -->
  <line x1="220" y1="100" x2="220" y2="110" stroke="#4f7fff" stroke-width="1" stroke-dasharray="2,1"/>
  <rect x="108" y="110" width="224" height="18" rx="3" fill="#eef2fb" stroke="#b2c2e6" stroke-width="1"/>
  <text x="220" y="122" text-anchor="middle" font-size="8.5" fill="#14306b">Modify fields · Abort the save · Run validation</text>
  <!-- Arrow 2→3 -->
  <line x1="236" y1="52" x2="348" y2="52" stroke="#b2c2e6" stroke-width="1.5" marker-end="url(#bs-arrow)"/>
  <!-- Node 3: DB Write -->
  <circle cx="360" cy="52" r="10" fill="#eef2fb" stroke="#b2c2e6" stroke-width="2"/>
  <text x="360" y="56" text-anchor="middle" font-size="9" fill="#4f6fb0" font-weight="600">3</text>
  <text x="360" y="76" text-anchor="middle" font-size="9" fill="#4f6fb0">Database</text>
  <text x="360" y="87" text-anchor="middle" font-size="9" fill="#4f6fb0">write</text>
  <!-- Arrow 3→4 -->
  <line x1="372" y1="52" x2="508" y2="52" stroke="#b2c2e6" stroke-width="1.5" marker-end="url(#bs-arrow)"/>
  <!-- Node 4: afterSubmit -->
  <circle cx="520" cy="52" r="14" fill="#059669" stroke="#065f46" stroke-width="2"/>
  <text x="520" y="56" text-anchor="middle" font-size="9" fill="#fff" font-weight="700">4</text>
  <text x="520" y="76" text-anchor="middle" font-size="10" fill="#14306b" font-weight="700">afterSubmit</text>
  <text x="520" y="88" text-anchor="middle" font-size="8.5" fill="#4f6fb0">fires here</text>
  <!-- afterSubmit callouts below -->
  <line x1="520" y1="100" x2="520" y2="110" stroke="#059669" stroke-width="1" stroke-dasharray="2,1"/>
  <rect x="380" y="110" width="280" height="18" rx="3" fill="#d1fae5" stroke="#6ee7b7" stroke-width="1"/>
  <text x="520" y="122" text-anchor="middle" font-size="8.5" fill="#065f46">Record has ID · Load related records · Send emails</text>
  <!-- Arrow 4→5 -->
  <line x1="536" y1="52" x2="618" y2="52" stroke="#b2c2e6" stroke-width="1.5" marker-end="url(#bs-arrow)"/>
  <!-- Node 5: Complete -->
  <circle cx="630" cy="52" r="10" fill="#eef2fb" stroke="#b2c2e6" stroke-width="2"/>
  <text x="630" y="56" text-anchor="middle" font-size="9" fill="#4f6fb0" font-weight="600">5</text>
  <text x="630" y="76" text-anchor="middle" font-size="9" fill="#4f6fb0">Complete</text>
</svg>
<figcaption style="text-align:center;font-size:0.78rem;color:#8aa2d6;margin-top:0.4rem">beforeSubmit fires before the record exists in the database. afterSubmit fires after it is committed and has a permanent ID.</figcaption>
</figure>

## What beforeSubmit can do

Because `beforeSubmit` fires before the record is committed, it has two capabilities that `afterSubmit` does not:

**1. Modify the current record**

You can use `context.newRecord.setValue()` to change field values before they are saved. The modified values are what gets committed to the database.

```javascript
function beforeSubmit(context) {
    if (context.type === context.UserEventType.CREATE) {
        var total = context.newRecord.getValue('amount');
        context.newRecord.setValue({
            fieldId: 'custbody_approved_amount',
            value: total
        });
    }
}
```

**2. Abort the save**

If you throw an error in `beforeSubmit`, the save is cancelled. The record is not committed, and the user sees the error message. This makes `beforeSubmit` the right place for validation logic.

```javascript
function beforeSubmit(context) {
    var status = context.newRecord.getValue('approvalstatus');
    var amount = context.newRecord.getValue('amount');

    if (status === 'Approved' && amount > 100000) {
        throw new Error('Orders over $100,000 require director approval before final approval.');
    }
}
```

## What afterSubmit can do

**afterSubmit** runs after the record is safely committed. The record has a permanent ID (`context.newRecord.id`) and is available in the database.

This is the right place for actions that should only happen after a successful save:

- Creating or updating related records
- Sending notifications or emails
- Making calls to external systems or APIs
- Triggering follow-up workflows

```javascript
function afterSubmit(context) {
    if (context.type === context.UserEventType.APPROVE) {
        var orderId = context.newRecord.id;
        // Create a fulfillment record, send a notification, etc.
        // Safe here because the order is already committed
    }
}
```

**What afterSubmit cannot do:** You cannot modify the current record's field values using `setValue()` on `context.newRecord`. The record is already saved, your changes won't persist. If you need to update the record after save, you would need to use `record.submitFields()` with the record's ID, which triggers another save cycle (use with care to avoid loops).

## The most common mistake

Placing external API calls or record creation logic in `beforeSubmit`.

If the API call fails or takes too long, it can cause the record save to fail or time out, even when the record data itself is valid. External calls belong in `afterSubmit`, where the record is already committed and a failure in the external system does not roll back the user's save.

The pattern to avoid:

```javascript
// Wrong placement: external call blocks the save
function beforeSubmit(context) {
    // If this API call fails, the record save fails too
    callExternalApi(context.newRecord.getValue('entity'));
}
```

The correct pattern:

```javascript
// afterSubmit: external call runs after the record is safe
function afterSubmit(context) {
    // Record is committed; an API failure won't affect the save
    callExternalApi(context.newRecord.getValue('entity'));
}
```

## Quick reference

| | beforeSubmit | afterSubmit |
|---|---|---|
| Record committed? | No | Yes |
| Modify current record? | Yes | No |
| Abort the save? | Yes (throw error) | No |
| Record ID available? | Only on edit/approve | Yes (create and edit) |
| External API calls? | Avoid | Yes |
| Create related records? | Avoid | Yes |
| Validation logic? | Yes | No |

## The rule

If the logic must modify the current record or can abort the save, it belongs in `beforeSubmit`.

If the logic should only run after the record is committed, notifications, related record creation, external system calls, it belongs in `afterSubmit`.

When in doubt, prefer `afterSubmit`. It runs after the user's data is safe, so a bug in your script cannot accidentally cancel a legitimate save.

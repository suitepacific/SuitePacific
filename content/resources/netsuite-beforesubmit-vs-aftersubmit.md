---
title: "NetSuite beforeSubmit vs afterSubmit: Choosing the Right User Event Trigger"
description: "beforeSubmit and afterSubmit serve different purposes in NetSuite User Event scripts. Using the wrong one causes silent failures, data errors, and missed business logic. Learn when each fires and how to choose correctly."
category: "SuiteScript"
tags: ["SuiteScript", "User Event", "Best Practices"]
publishedAt: "2026-07-04"
linkedinDay: 4
---

## Two triggers, two different moments

NetSuite User Event scripts fire in response to record saves. Both `beforeSubmit` and `afterSubmit` run when a record is saved, but they fire at different points in the save process — and that difference determines what each one can and cannot do.

**beforeSubmit** fires after the user clicks Save but before the record is written to the database. The record exists in memory but is not yet committed.

**afterSubmit** fires after the record has been successfully written to the database. The record now has a permanent ID and all its data is committed.

Getting this wrong is one of the most common sources of subtle SuiteScript bugs — logic that looks correct but fails silently, or runs at the wrong time.

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

**What afterSubmit cannot do:** You cannot modify the current record's field values using `setValue()` on `context.newRecord`. The record is already saved — your changes won't persist. If you need to update the record after save, you would need to use `record.submitFields()` with the record's ID, which triggers another save cycle (use with care to avoid loops).

## The most common mistake

Placing external API calls or record creation logic in `beforeSubmit`.

If the API call fails or takes too long, it can cause the record save to fail or time out — even when the record data itself is valid. External calls belong in `afterSubmit`, where the record is already committed and a failure in the external system does not roll back the user's save.

The pattern to avoid:

```javascript
// Wrong placement — external call blocks the save
function beforeSubmit(context) {
    // If this API call fails, the record save fails too
    callExternalApi(context.newRecord.getValue('entity'));
}
```

The correct pattern:

```javascript
// afterSubmit — external call runs after the record is safe
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

If the logic should only run after the record is committed — notifications, related record creation, external system calls — it belongs in `afterSubmit`.

When in doubt, prefer `afterSubmit`. It runs after the user's data is safe, so a bug in your script cannot accidentally cancel a legitimate save.

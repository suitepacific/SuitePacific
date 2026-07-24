---
title: "Why You Should Never record.load() Inside a Loop in SuiteScript"
description: "Loading records inside a loop is one of the most common SuiteScript performance mistakes. Learn how to use saved search columns instead, and when record.load() in a loop is actually unavoidable."
category: "SuiteScript"
tags: ["SuiteScript", "Performance", "Saved Search"]
publishedAt: "2026-07-09"
linkedinDay: 9
---

## The pattern that looks reasonable but isn't

A common SuiteScript pattern runs a saved search, loops through the results, and loads each record to read additional data:

```javascript
results.each(function(result) {
    var so = record.load({
        type: record.Type.SALES_ORDER,
        id: result.id
    });

    var customer = so.getValue('entity');
    // Do something with customer
    return true;
});
```

If the search returns 1,000 results, this performs 1,000 full record loads, just to read a single field value from each one.

Each `record.load()` retrieves the complete record: every body field, every sublist, every line item. For a sales order with 40 line items, you are loading all 40 lines 1,000 times, when you only needed the customer name.

This increases governance unit usage, slows execution, and is one of the most common causes of scripts approaching or hitting governance limits.

## The fix: design your search to return what you need

The correct approach is to include the required fields as columns in the saved search, so the data is already available in the result:

```javascript
results.each(function(result) {
    var customer = result.getValue('entity');
    // entity was already returned by the search
    return true;
});
```

This works because the `entity` field is included as a column in the saved search. No additional record operation needed. The search already has the data.

The savings scale directly with the number of results. 1,000 results becomes zero additional record operations instead of 1,000.

## How to add columns to a saved search programmatically

If you are building the search in code rather than using a saved search ID, add the fields as columns when creating the search:

```javascript
var mySearch = search.create({
    type: search.Type.SALES_ORDER,
    filters: [
        ['status', search.Operator.ANYOF, 'SalesOrd:B']
    ],
    columns: [
        search.createColumn({ name: 'entity' }),
        search.createColumn({ name: 'amount' }),
        search.createColumn({ name: 'trandate' })
    ]
});
```

Then read the values directly from each result in the loop, no record load needed.

## When record.load() in a loop is actually necessary

There are cases where loading inside a loop is unavoidable. The key question is: what are you doing with the record?

**Loading is necessary when you need to:**

- **Update the record:** `record.load()` is required if you need to call `setValue()` and `save()`. (Alternatively, use `record.submitFields()` for body-field-only updates, which avoids the full load.)
- **Read or modify sublists:** Sublist data (line items, address sublists) is not available as search columns. If you need line-level data, you need `record.load()`.
- **Work with subrecords:** Subrecords require the full record context.

If you genuinely need one of the above, load only what you must, and consider whether the script design can be restructured to reduce the number of loads. For example, if you are updating one field on many records, `record.submitFields()` avoids a full load entirely.

## The right question before every loop

Before writing any loop that involves records, ask: does this field value need to come from a record load, or can I include it in the search?

In the majority of cases, the answer is: include it in the search. Build the search first to return the data the loop needs, then write the loop second.

The fastest SuiteScript loop is one where the search has already done the work.

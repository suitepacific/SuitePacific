---
title: "Why You Should Never record.load() Inside a Loop in SuiteScript"
description: "Loading records inside a loop is one of the most common SuiteScript performance mistakes. Learn how to use saved search columns instead, and when record.load() in a loop is actually unavoidable."
category: "SuiteScript"
tags: ["SuiteScript", "Performance", "Saved Search"]
publishedAt: "2026-07-09"
updatedAt: "2026-08-15"
linkedinDay: 9
---

<div style="background:#eef2fb;border:1px solid #b2c2e6;border-radius:10px;padding:1.25rem 1.5rem;margin:2rem 0;font-family:system-ui,-apple-system,sans-serif">
<p style="margin:0 0 0.5rem;font-size:0.7rem;font-weight:700;color:#4f7fff;text-transform:uppercase;letter-spacing:0.08em">Quick answer</p>
<p style="margin:0;color:#14306b;font-size:0.9rem;line-height:1.6">Loading records inside a loop in SuiteScript is one of the most common causes of governance limit errors and slow script execution. Each record.load() call consumes governance units and makes a synchronous database request. A loop that loads 200 records makes 200 separate database calls. The fix is to design the saved search to return the field values you need as columns directly on the search results, so the loop iterates over result rows rather than loading each record individually. For example, if you need subsidiary, currency, and status from a set of sales orders, add those as columns and read them with result.getValue() per row. The only time record.load() inside a loop is appropriate is when you need to access sublist data that cannot be returned as search result columns, such as line-level item quantities or rates on a transaction record.</p>
</div>

## Why Is record.load() in a Loop a Problem?

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

<figure style="margin:1.75rem 0">
<svg viewBox="0 0 680 152" xmlns="http://www.w3.org/2000/svg" style="width:100%;max-width:680px;display:block;font-family:system-ui,-apple-system,sans-serif">
  <defs>
    <marker id="loop-arrow" markerWidth="7" markerHeight="7" refX="5" refY="3" orient="auto"><path d="M0,0 L0,6 L7,3 z" fill="#ef4444"/></marker>
    <marker id="loop-arrow-g" markerWidth="7" markerHeight="7" refX="5" refY="3" orient="auto"><path d="M0,0 L0,6 L7,3 z" fill="#16a34a"/></marker>
  </defs>
  <!-- Left: Bad pattern -->
  <rect x="0" y="0" width="320" height="152" rx="9" fill="#fef2f2" stroke="#fca5a5" stroke-width="1.5"/>
  <rect x="0" y="0" width="320" height="26" rx="9" fill="#991b1b"/>
  <rect x="0" y="16" width="320" height="10" fill="#991b1b"/>
  <text x="160" y="17" text-anchor="middle" font-size="10" font-weight="700" fill="#fee2e2">Loop with record.load(): 1,000 loads</text>
  <rect x="16" y="34" width="288" height="18" rx="4" fill="#0b1f4d"/>
  <text x="160" y="47" text-anchor="middle" font-size="9" font-weight="700" fill="#eef2fb">Saved search returns 1,000 IDs</text>
  <line x1="160" y1="52" x2="160" y2="60" stroke="#ef4444" stroke-width="1.5" marker-end="url(#loop-arrow)"/>
  <!-- 3 sample record.load boxes -->
  <rect x="16" y="62" width="88" height="16" rx="3" fill="#fca5a5"/>
  <text x="60" y="74" text-anchor="middle" font-size="8" fill="#7f1d1d">record.load(1)</text>
  <rect x="116" y="62" width="88" height="16" rx="3" fill="#fca5a5"/>
  <text x="160" y="74" text-anchor="middle" font-size="8" fill="#7f1d1d">record.load(2)</text>
  <rect x="216" y="62" width="88" height="16" rx="3" fill="#fca5a5"/>
  <text x="260" y="74" text-anchor="middle" font-size="8" fill="#7f1d1d">record.load(3) …</text>
  <text x="160" y="96" text-anchor="middle" font-size="8" fill="#991b1b">Each loads: all body fields + all line items</text>
  <text x="160" y="110" text-anchor="middle" font-size="8" fill="#991b1b">+ sublists + subrecords</text>
  <text x="160" y="132" text-anchor="middle" font-size="8.5" font-weight="700" fill="#991b1b">1,000 × full record cost = governance risk</text>
  <!-- Right: Good pattern -->
  <rect x="360" y="0" width="320" height="152" rx="9" fill="#f0fdf4" stroke="#86efac" stroke-width="1.5"/>
  <rect x="360" y="0" width="320" height="26" rx="9" fill="#14532d"/>
  <rect x="360" y="16" width="320" height="10" fill="#14532d"/>
  <text x="520" y="17" text-anchor="middle" font-size="10" font-weight="700" fill="#dcfce7">Search columns: 0 extra loads</text>
  <rect x="376" y="34" width="288" height="18" rx="4" fill="#166534"/>
  <text x="520" y="47" text-anchor="middle" font-size="9" font-weight="700" fill="#dcfce7">Search returns 1,000 rows with columns</text>
  <line x1="520" y1="52" x2="520" y2="60" stroke="#16a34a" stroke-width="1.5" marker-end="url(#loop-arrow-g)"/>
  <!-- 3 result rows -->
  <rect x="376" y="62" width="88" height="16" rx="3" fill="#bbf7d0"/>
  <text x="420" y="74" text-anchor="middle" font-size="8" fill="#14532d">result[0]</text>
  <rect x="476" y="62" width="88" height="16" rx="3" fill="#bbf7d0"/>
  <text x="520" y="74" text-anchor="middle" font-size="8" fill="#14532d">result[1]</text>
  <rect x="576" y="62" width="88" height="16" rx="3" fill="#bbf7d0"/>
  <text x="620" y="74" text-anchor="middle" font-size="8" fill="#14532d">result[2] …</text>
  <text x="520" y="96" text-anchor="middle" font-size="8" fill="#14532d">result.getValue('entity'): already there</text>
  <text x="520" y="110" text-anchor="middle" font-size="8" fill="#14532d">No additional operation needed</text>
  <text x="520" y="132" text-anchor="middle" font-size="8.5" font-weight="700" fill="#14532d">0 extra record loads · governance intact</text>
</svg>
<figcaption style="text-align:center;font-size:0.78rem;color:#8aa2d6;margin-top:0.4rem">Include the fields you need as search columns. The data is already in the result: no loop record load required.</figcaption>
</figure>

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

## When Is record.load() in a Loop Actually Necessary?

There are cases where loading inside a loop is unavoidable. The key question is: what are you doing with the record?

**Loading is necessary when you need to:**

- **Update the record:** `record.load()` is required if you need to call `setValue()` and `save()`. (Alternatively, use `record.submitFields()` for body-field-only updates, which avoids the full load.)
- **Read or modify sublists:** Sublist data (line items, address sublists) is not available as search columns. If you need line-level data, you need `record.load()`.
- **Work with subrecords:** Subrecords require the full record context.

If you genuinely need one of the above, load only what you must, and consider whether the script design can be restructured to reduce the number of loads. For example, if you are updating one field on many records, `record.submitFields()` avoids a full load entirely.

## What Should You Ask Before Writing a Loop in SuiteScript?

Before writing any loop that involves records, ask: does this field value need to come from a record load, or can I include it in the search?

In the majority of cases, the answer is: include it in the search. Build the search first to return the data the loop needs, then write the loop second.

The fastest SuiteScript loop is one where the search has already done the work.

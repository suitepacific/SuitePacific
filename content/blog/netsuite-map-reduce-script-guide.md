---
title: "NetSuite Map/Reduce Scripts: A Complete Guide with Working Examples"
description: "How SuiteScript Map/Reduce works, when to use it over a Scheduled Script, what happens in each of the five stages, and a full deployable example you can adapt."
date: "2026-07-18"
tags: ["SuiteScript", "Map/Reduce", "Performance", "Development"]
---

The first time most NetSuite developers encounter Map/Reduce is when a Scheduled Script starts failing at scale. The script worked fine in testing with 200 records, but in production with 8,000 records it times out, hits governance limits, or yields and restarts so many times that what should take 10 minutes takes four hours. Map/Reduce exists to solve exactly this problem, and once you understand how it distributes work, it becomes the obvious choice for any heavy bulk processing job.

This guide covers every stage of the Map/Reduce lifecycle, how to structure each one correctly, the governance limits that apply at each stage, and a complete working example that ties it all together.

## Why Map/Reduce exists

A Scheduled Script processes records one at a time in a single execution thread. Record A finishes, then record B, then record C. If there are 10,000 records and each requires a search and a record load, the script runs all 10,000 sequentially until it either completes or exhausts its governance budget.

Map/Reduce breaks that workload into individual units and processes them in parallel across multiple workers. NetSuite handles the distribution, the parallelism, and the retry logic automatically. A job that would take a Scheduled Script 45 minutes to complete serially can complete in 5–8 minutes with Map/Reduce because dozens of records are being processed simultaneously.

The tradeoff: Map/Reduce requires a specific structure that Scheduled Scripts don't. You cannot share state between records the way you might in a loop. Each unit of work must be fully self-contained. Once that constraint is understood and embraced, the performance gains are significant and the framework becomes straightforward.

## When to choose Map/Reduce over other script types

**Use Map/Reduce when:**
- You're processing more than a few hundred records and a Scheduled Script would need to yield and restart multiple times
- The records can be processed independently, each record doesn't need to know what happened to any other record
- You need to aggregate data across many records by grouping key (totals by customer, counts by category, sums by period)
- You want automatic retry handling at the individual record level, a failure on one record doesn't abort the entire job

**Use a Scheduled Script when:**
- The dataset is small (under a few hundred records per run)
- The processing is inherently sequential, record B depends on the result of processing record A
- You need fine-grained control over execution flow or error handling that the Map/Reduce framework doesn't expose

**Use Mass Update when:**
- You need a one-time field update that applies the same logic to every matching record
- You want administrators to trigger it manually from the UI without deploying code changes

The practical threshold: if your Scheduled Script currently needs more than one or two `task.rescheduleScript()` calls to complete a full run, it's a strong candidate for Map/Reduce.

## The five stages

Map/Reduce scripts have five stages. Each stage runs in its own execution context with its own governance budget, which is why Map/Reduce can handle workloads that would destroy a single-execution Scheduled Script.

### Stage 1: getInputData()

`getInputData()` tells the framework what records need to be processed. It returns a data source, a Search object, a Query object, or a small fixed array, and NetSuite's framework handles the rest.

The most important rule for `getInputData()` is to return the Search object itself, not the result of running it:

```javascript
// Correct: return the Search object; NetSuite paginates and distributes it
function getInputData(context) {
    return search.create({
        type: search.Type.INVOICE,
        filters: [
            ['status', 'anyof', 'CustInvc:A'],
            'AND',
            ['daysoverdue', 'greaterthan', '90']
        ],
        columns: [
            search.createColumn({ name: 'entity' }),
            search.createColumn({ name: 'tranid' }),
            search.createColumn({ name: 'amountremaining' }),
            search.createColumn({ name: 'daysoverdue' })
        ]
    });
}
```

```javascript
// Incorrect: pre-executing the search defeats Map/Reduce parallelism
function getInputData(context) {
    var ids = [];
    search.create({ type: search.Type.INVOICE, filters: [...] })
        .run().each(function(result) {
            ids.push(result.id);
            return true;
        });
    return ids; // All search work done sequentially before any map() runs
}
```

When you return a Search object, NetSuite fetches results in pages and dispatches individual results to `map()` workers in parallel. When you pre-execute and return an array, all 10,000 records are fetched in a single thread, you've done the most expensive work before parallelism begins.

See the [full explanation of why getInputData() should stay thin](/resources/netsuite-map-reduce-getinputdata).

### Stage 2: map()

`map()` receives one search result at a time and processes it. NetSuite runs many `map()` invocations simultaneously, this is where the parallel execution actually happens.

Each `map()` invocation receives a `context` object with two properties:
- `context.key`, the index of the item in the input data (0, 1, 2, ...)
- `context.value`, a JSON string of the search result, with an `id`, `recordType`, and `values` object

Parsing the result and writing a key-value pair forward:

```javascript
function map(context) {
    var result = JSON.parse(context.value);
    var customerId = result.values.entity[0].value; // list fields are arrays
    var invoiceTranId = result.values.tranid;
    var amountRemaining = parseFloat(result.values.amountremaining);
    var daysOverdue = parseInt(result.values.daysoverdue, 10);

    // Key = customerId: all invoices for one customer will group in reduce()
    context.write({
        key: customerId,
        value: JSON.stringify({
            invoiceId: result.id,
            tranId: invoiceTranId,
            amountRemaining: amountRemaining,
            daysOverdue: daysOverdue
        })
    });
}
```

The critical design constraint: **each `map()` invocation must operate independently.** NetSuite initializes a fresh script execution context for each invocation. Global variables reset. There is no shared memory between invocations. There is no guaranteed execution order.

If you find yourself wanting to accumulate a running total in `map()`, that's the `reduce()` stage's job. If you need to look up the same parent record for every invocation, fetch it inside `map()` or denormalize it into your search results. See [why map() must be stateless](/resources/netsuite-map-reduce-map-independence) for the full breakdown.

### Stage 3: Shuffle (implicit)

You write no code for this stage. After all `map()` invocations complete, NetSuite automatically groups every key-value pair written via `context.write()` by their key. All values that share the same key are collected and delivered together to a single `reduce()` invocation.

In the example above: if customer 678 has 9 overdue invoices, all 9 `context.write()` calls from `map()`, all with key `"678"`, are grouped and arrive together in one `reduce()` call. This grouping is what makes aggregation possible.

### Stage 4: reduce()

`reduce()` receives all values for a given key as a single invocation. The guarantee: every value written with the same key by `map()` arrives in the same `reduce()` call. This is where aggregation, combining, and multi-record logic belongs.

```javascript
function reduce(context) {
    var customerId = context.key;
    var invoices = context.values.map(function(v) { return JSON.parse(v); });

    // Aggregate all overdue invoices for this customer
    var totalDue = invoices.reduce(function(sum, inv) {
        return sum + inv.amountRemaining;
    }, 0);

    // Load customer record fresh to get current email address
    var customer = record.load({ type: record.Type.CUSTOMER, id: customerId });
    var customerEmail = customer.getValue('email');
    var customerName = customer.getValue('companyname');

    if (customerEmail && totalDue > 0) {
        var invoiceList = invoices
            .sort(function(a, b) { return b.daysOverdue - a.daysOverdue; })
            .map(function(inv) {
                return inv.tranId + ': $' + inv.amountRemaining.toFixed(2) +
                       ' (' + inv.daysOverdue + ' days overdue)';
            }).join('\n');

        email.send({
            author: -5, // -5 = NetSuite default sender
            recipients: customerEmail,
            subject: 'Overdue Invoice Summary: Action Required',
            body: 'Dear ' + customerName + ',\n\nThe following invoices are overdue:\n\n' +
                  invoiceList + '\n\nTotal outstanding: $' + totalDue.toFixed(2) +
                  '\n\nPlease contact us to discuss payment.'
        });
    }

    context.write({ key: customerId, value: totalDue.toString() });
}
```

The distinction from `map()`: `map()` transforms and routes one item at a time. `reduce()` combines multiple items that belong together. If processing requires knowing about more than one record, totals, grouping, sending one notification for a set of related records, it belongs in `reduce()`.

### Stage 5: summarize()

`summarize()` runs once after all `map()` and `reduce()` work is complete. It receives a context object with iterators that enumerate every error that occurred across all stages, plus summary counts and timing information.

This is where you log completion, handle overall errors, and optionally create a summary record or send a final notification:

```javascript
function summarize(context) {
    var mapErrors = 0;
    var reduceErrors = 0;

    context.mapSummary.errors.iterator().each(function(key, error) {
        log.error({ title: 'Map error [key=' + key + ']', details: error });
        mapErrors++;
        return true;
    });

    context.reduceSummary.errors.iterator().each(function(key, error) {
        log.error({ title: 'Reduce error [key=' + key + ']', details: error });
        reduceErrors++;
        return true;
    });

    var customersProcessed = context.reduceSummary.keys.count;

    log.audit({
        title: 'Overdue invoice emails: complete',
        details: JSON.stringify({
            customersProcessed: customersProcessed,
            mapErrors: mapErrors,
            reduceErrors: reduceErrors,
            totalSeconds: context.seconds
        })
    });
}
```

Two things to know about `summarize()`:

First, if you don't iterate the error iterators, errors disappear silently. A `map()` that failed on 400 records will show no sign of failure in the job status unless you log from `summarize()`.

Second, `summarize()` retries up to three times if it throws an error. Write it defensively, wrap the body in a try/catch if you're doing anything beyond logging, and log errors before the logic that might throw, not after.

## Governance limits by stage

Each stage runs in a separate context with a separate governance budget:

| Stage | Governance Limit |
|---|---|
| getInputData() | 10,000 units (same as a Scheduled Script) |
| map() per invocation | 1,000 units |
| reduce() per invocation | 5,000 units |
| summarize() | 10,000 units |

These limits explain why the structure matters. If `getInputData()` exhausts its 10,000-unit budget pre-executing a large search, the job fails before any `map()` runs. By returning the Search object instead, you defer all search execution to the framework, which allocates it correctly across stages.

For `map()` at 1,000 units per invocation: a typical operation, one `record.load()` (10 units), one `record.submitFields()` (10 units), and a couple of search calls (5 units each), leaves plenty of headroom. Where `map()` governance failures happen is when developers load additional records inside `map()` that should have been fetched in `getInputData()` via search columns.

For a full breakdown of what each NetSuite operation costs in governance units, see [Governance Limit Exceeded: Causes and Fixes](/blog/netsuite-script-governance-limit).

## A complete, deployable example

This script finds all customers with one or more invoices 90+ days overdue, groups the invoices by customer, and sends one consolidated email per customer. It demonstrates all five stages working together:

```javascript
/**
 * @NApiVersion 2.1
 * @NScriptType MapReduceScript
 */
define(['N/search', 'N/record', 'N/email', 'N/log'], function(search, record, email, log) {

    function getInputData(context) {
        return search.create({
            type: search.Type.INVOICE,
            filters: [
                ['status', 'anyof', 'CustInvc:A'],  // Open/unpaid invoices
                'AND',
                ['daysoverdue', 'greaterthan', '90']
            ],
            columns: [
                search.createColumn({ name: 'entity' }),
                search.createColumn({ name: 'tranid' }),
                search.createColumn({ name: 'amountremaining' }),
                search.createColumn({ name: 'daysoverdue' })
            ]
        });
    }

    function map(context) {
        var result = JSON.parse(context.value);
        var customerId = result.values.entity[0].value;

        context.write({
            key: customerId,
            value: JSON.stringify({
                invoiceId: result.id,
                tranId: result.values.tranid,
                amountRemaining: parseFloat(result.values.amountremaining),
                daysOverdue: parseInt(result.values.daysoverdue, 10)
            })
        });
    }

    function reduce(context) {
        var customerId = context.key;
        var invoices = context.values.map(function(v) { return JSON.parse(v); });
        var totalDue = invoices.reduce(function(sum, inv) { return sum + inv.amountRemaining; }, 0);

        var customer = record.load({ type: record.Type.CUSTOMER, id: customerId });
        var customerEmail = customer.getValue('email');
        var customerName = customer.getValue('companyname') || customer.getValue('altname');

        if (customerEmail) {
            var invoiceLines = invoices
                .sort(function(a, b) { return b.daysOverdue - a.daysOverdue; })
                .map(function(inv) {
                    return inv.tranId + ': $' + inv.amountRemaining.toFixed(2) +
                           ' (' + inv.daysOverdue + ' days overdue)';
                }).join('\n');

            email.send({
                author: -5,
                recipients: [{ address: customerEmail }],
                subject: 'Outstanding Invoices - ' + (new Date()).getFullYear(),
                body: 'Dear ' + customerName + ',\n\n' +
                      'The following invoices require your attention:\n\n' +
                      invoiceLines + '\n\n' +
                      'Total outstanding: $' + totalDue.toFixed(2) + '\n\n' +
                      'Please contact us to arrange payment.'
            });
        }

        context.write({ key: customerId, value: totalDue.toString() });
    }

    function summarize(context) {
        var mapErrors = 0;
        var reduceErrors = 0;

        context.mapSummary.errors.iterator().each(function(key, error) {
            log.error({ title: 'Map failed [' + key + ']', details: error });
            mapErrors++;
            return true;
        });

        context.reduceSummary.errors.iterator().each(function(key, error) {
            log.error({ title: 'Reduce failed [' + key + ']', details: error });
            reduceErrors++;
            return true;
        });

        log.audit({
            title: 'Overdue invoice reminders sent',
            details: 'Customers: ' + context.reduceSummary.keys.count +
                     ' | Map errors: ' + mapErrors +
                     ' | Reduce errors: ' + reduceErrors +
                     ' | Runtime: ' + context.seconds + 's'
        });
    }

    return { getInputData: getInputData, map: map, reduce: reduce, summarize: summarize };
});
```

To deploy: go to Customization > Scripting > Scripts > New, set the type to Map/Reduce, upload the file, then create a deployment. The script can be triggered manually from the deployment record or scheduled to run automatically.

## Monitoring a running job

After triggering a deployment, the status appears on the deployment record itself:

- **Pending:** queued, waiting for a processing slot
- **Processing:** actively running (could be in getInputData, map, or reduce)
- **Complete:** all stages finished without an unhandled error
- **Failed:** an unhandled error aborted a stage; check the execution log

The execution log (on the deployment's Execution Log tab) shows every `log.audit()`, `log.debug()`, and `log.error()` call from all stages. If a job is stuck in Processing for longer than expected, check whether `getInputData()` is running a large search, or whether individual `map()` invocations are consistently hitting governance limits.

One practical note: Map/Reduce jobs run concurrently with other scripted processes in your account. NetSuite limits how many Map/Reduce workers can run simultaneously per account. If multiple Map/Reduce scripts are active at the same time, they share the available worker pool and run more slowly. Schedule heavy jobs during off-peak hours when other scripted activity is low.

## Key design principles, summarized

- `getInputData()` returns a Search or Query object, it defines work, it does not do work
- `map()` processes one item and writes one or more key-value pairs forward, it does not share state with other invocations
- The shuffle stage groups values by key automatically, you don't write code for it
- `reduce()` receives all values for a key together, this is where aggregation belongs
- `summarize()` handles errors from all previous stages, always iterate the error iterators

Map/Reduce is the right choice for any job that a Scheduled Script is struggling with at scale. The framework handles the parallelism, retry logic, and governance allocation; your job is to design the five stages to be stateless at the individual invocation level.

If you're working with a NetSuite account that has aging Scheduled Scripts hitting governance limits under load, [the SuiteScript development work we do](/netsuite-suitescript-development) includes exactly this kind of migration, identifying which scripts are good Map/Reduce candidates and restructuring them to take advantage of the parallel processing model.

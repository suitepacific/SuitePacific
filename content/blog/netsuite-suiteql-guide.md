---
title: "NetSuite SuiteQL: Guide for Administrators and Developers"
description: "SuiteQL explained: how it differs from Saved Searches, key SQL syntax differences, how to run queries from SuiteScript and the REST API, and common patterns."
date: "2026-08-09"
updated: "2026-08-14"
tags: ["SuiteQL", "SuiteScript", "Reporting"]
---

At some point, every NetSuite developer hits a Saved Search that should work but cannot. The data is in the system, the logic is right, but the Search UI cannot express what the query actually needs: a join across multiple record types, a GROUP BY aggregation that the Summary type cannot cleanly handle, or a result set that quietly stops at 4,000 records with no warning that it missed anything.

SuiteQL is the answer to all three of those problems. It is a SQL-like query language built directly into NetSuite that gives developers and technically-minded administrators access to the full data model using familiar SQL syntax. If you have been working around saved search limitations with clumsy workarounds, this guide will make those workarounds unnecessary.

<div style="background:#eef2fb;border:1px solid #b2c2e6;border-radius:10px;padding:1.25rem 1.5rem;margin:2rem 0;font-family:system-ui,-apple-system,sans-serif">
<p style="margin:0 0 0.5rem;font-size:0.7rem;font-weight:700;color:#4f7fff;text-transform:uppercase;letter-spacing:0.08em">Quick answer</p>
<p style="margin:0;color:#14306b;font-size:0.9rem;line-height:1.6">SuiteQL is a SQL-like query language built into NetSuite for retrieving data from the NetSuite database. It is available in SuiteScript via the N/query module and via NetSuite's REST API at the suiteql endpoint. SuiteQL queries target NetSuite record types using their internal table names (Transaction, Customer, Item, Employee, etc.) rather than arbitrary database table names. The language is based on Oracle SQL syntax with NetSuite-specific extensions for display values and custom field access. SuiteQL is read-only: it retrieves data but cannot create, update, or delete records.</p>
</div>

## How does SuiteQL differ from Saved Searches?

Saved Searches and SuiteQL retrieve NetSuite data, but they work differently and are suited to different use cases.

<div style="overflow-x:auto;margin:2rem 0;border-radius:10px;overflow:hidden;border:1px solid #d7e0f3">
<table style="width:100%;border-collapse:collapse;font-size:0.875rem;font-family:system-ui,-apple-system,sans-serif;min-width:480px">
<thead>
<tr>
<th style="padding:0.75rem 1rem;text-align:left;background:#060f26;color:#eef2fb;font-weight:600;width:36%">Characteristic</th>
<th style="padding:0.75rem 1rem;text-align:center;background:#0b1f4d;color:#eef2fb;font-weight:600;width:32%">Saved Search</th>
<th style="padding:0.75rem 1rem;text-align:center;background:#4f7fff;color:#fff;font-weight:600;width:32%">SuiteQL</th>
</tr>
</thead>
<tbody>
<tr>
<td style="padding:0.65rem 1rem;border-bottom:1px solid #eef2fb;color:#14306b">Interface</td>
<td style="padding:0.65rem 1rem;border-bottom:1px solid #eef2fb;text-align:center;color:#14306b">UI or N/search API</td>
<td style="padding:0.65rem 1rem;border-bottom:1px solid #eef2fb;text-align:center;color:#14306b">N/query module or REST API</td>
</tr>
<tr style="background:#f8f9ff">
<td style="padding:0.65rem 1rem;border-bottom:1px solid #eef2fb;color:#14306b">Syntax</td>
<td style="padding:0.65rem 1rem;border-bottom:1px solid #eef2fb;text-align:center;color:#14306b">UI-configured filters and columns</td>
<td style="padding:0.65rem 1rem;border-bottom:1px solid #eef2fb;text-align:center;color:#14306b">SQL-like text query</td>
</tr>
<tr>
<td style="padding:0.65rem 1rem;border-bottom:1px solid #eef2fb;color:#14306b">Joins</td>
<td style="padding:0.65rem 1rem;border-bottom:1px solid #eef2fb;text-align:center;color:#14306b">Implicit, configured via related fields</td>
<td style="padding:0.65rem 1rem;border-bottom:1px solid #eef2fb;text-align:center;color:#14306b">Explicit JOIN syntax</td>
</tr>
<tr style="background:#f8f9ff">
<td style="padding:0.65rem 1rem;border-bottom:1px solid #eef2fb;color:#14306b">Result limit</td>
<td style="padding:0.65rem 1rem;border-bottom:1px solid #eef2fb;text-align:center;color:#14306b">4,000 (search.run()), unlimited with runPaged</td>
<td style="padding:0.65rem 1rem;border-bottom:1px solid #eef2fb;text-align:center;color:#14306b">5,000 per page with runSuiteQLPaged</td>
</tr>
<tr>
<td style="padding:0.65rem 1rem;border-bottom:1px solid #eef2fb;color:#14306b">Aggregations</td>
<td style="padding:0.65rem 1rem;border-bottom:1px solid #eef2fb;text-align:center;color:#14306b">Available via Summary type</td>
<td style="padding:0.65rem 1rem;border-bottom:1px solid #eef2fb;text-align:center;color:#14306b">Standard SQL GROUP BY and aggregate functions</td>
</tr>
<tr style="background:#f8f9ff">
<td style="padding:0.65rem 1rem;border-bottom:1px solid #eef2fb;color:#14306b">Custom fields</td>
<td style="padding:0.65rem 1rem;border-bottom:1px solid #eef2fb;text-align:center;color:#14306b">Available by field ID in UI</td>
<td style="padding:0.65rem 1rem;border-bottom:1px solid #eef2fb;text-align:center;color:#14306b">Available by column name (custbody_*, custcol_*)</td>
</tr>
<tr>
<td style="padding:0.65rem 1rem;border-bottom:1px solid #eef2fb;color:#14306b">Readable by non-developers</td>
<td style="padding:0.65rem 1rem;border-bottom:1px solid #eef2fb;text-align:center;color:#065f46;font-weight:600">Yes, through the UI</td>
<td style="padding:0.65rem 1rem;border-bottom:1px solid #eef2fb;text-align:center;color:#7e8ea6">Requires SQL knowledge</td>
</tr>
<tr style="background:#f8f9ff">
<td style="padding:0.65rem 1rem;color:#14306b">Best for</td>
<td style="padding:0.65rem 1rem;text-align:center;color:#14306b">Operational dashboards, user-visible lists, portlets</td>
<td style="padding:0.65rem 1rem;text-align:center;color:#14306b">Data extraction, complex reporting, scripted integrations</td>
</tr>
</tbody>
</table>
</div>

Use a Saved Search when the output will be viewed through NetSuite's standard UI (portlets, list views, reports). Use SuiteQL when you need SQL-style aggregation, explicit control over joins, or results that will be consumed programmatically by a script or external system.

## What are the key differences between SuiteQL and standard SQL?

SuiteQL is based on Oracle SQL syntax. Developers with SQL experience will find it familiar, but there are NetSuite-specific conventions to understand.

**Table names are NetSuite record type names.** The tables you query are not arbitrary database table names. They are the internal names that NetSuite assigns to each record type: `Transaction`, `TransactionLine`, `Customer`, `Vendor`, `Item`, `Employee`, `Account`, `Department`, `Location`, and so on. The SuiteQL schema reference in NetSuite's Help documentation lists all available tables and their columns.

**No SELECT \*.** SuiteQL does not support `SELECT *`. You must specify each column by name. This is a deliberate design choice that encourages explicit queries and prevents accidentally returning data you did not intend to retrieve.

**Internal IDs for foreign keys.** Join relationships use internal NetSuite IDs, not human-readable names. When you join `Transaction` to `TransactionLine`, you join on the transaction's internal ID.

**BUILTIN.DF() for display values.** List fields in NetSuite store internal ID values. A `custbody_status` field might store the value `2`, where `2` is the internal ID of the list item. To retrieve the human-readable display value instead of the internal ID, wrap the field in `BUILTIN.DF()`: `SELECT BUILTIN.DF(custbody_status) AS status_label FROM Transaction`.

**Dates are stored as UTC.** Date fields in SuiteQL return UTC values. If you are filtering or comparing dates, account for time zone offset when building your WHERE clause.

**Custom fields use their script IDs as column names.** A custom body field with the script ID `custbody_po_reference` is accessed in SuiteQL as `custbody_po_reference`. A custom column field is accessed similarly in the TransactionLine table.

## How do you run SuiteQL from SuiteScript?

SuiteQL is available in SuiteScript 2.x via the `N/query` module. Two methods are relevant:

**query.runSuiteQL()** runs the query and returns all results in a single response. This is limited to 5,000 results and is appropriate for queries where you know the result set is small.

**query.runSuiteQLPaged()** runs the query and returns a page object you can iterate through, 5,000 rows at a time. Use this for any query that might return more than 5,000 rows.

```javascript
/**
 * @NApiVersion 2.1
 * @NScriptType ScheduledScript
 */
define(['N/query', 'N/log'], (query, log) => {
    const execute = (context) => {
        // Paged query for large result sets
        const pagedQuery = query.runSuiteQLPaged({
            query: `
                SELECT
                    t.id,
                    t.tranid,
                    t.trandate,
                    BUILTIN.DF(t.status) AS status_label,
                    t.custbody_po_reference
                FROM Transaction t
                WHERE t.type = 'PurchOrd'
                    AND t.trandate >= ?
                ORDER BY t.trandate DESC
            `,
            params: ['2026-01-01'],
            pageSize: 1000
        });

        pagedQuery.iterator().each((page) => {
            page.value.data.results.forEach((row) => {
                log.debug('row', row.values);
            });
            return true; // continue to next page
        });
    };
    return { execute };
});
```

The `params` array is the mechanism for bound parameters. Always use bound parameters instead of string concatenation when including user-controlled or variable values in your query. This prevents SQL injection and avoids the manual quoting issues that come with concatenating values directly into the query string.

## How do you run SuiteQL from the REST API?

NetSuite exposes a SuiteQL endpoint via its REST API:

```
POST https://{accountId}.suitetalk.api.netsuite.com/services/rest/query/v1/suiteql
```

The request body is a JSON object with a `q` property containing the query string:

```json
{
  "q": "SELECT id, tranid, trandate FROM Transaction WHERE type = 'PurchOrd' ORDER BY trandate DESC LIMIT 100 OFFSET 0"
}
```

The response includes the result data and pagination information. The API uses `limit` and `offset` in the query itself for pagination, rather than the paged iterator pattern in SuiteScript.

Authentication follows the standard NetSuite REST authentication pattern: OAuth 2.0 with PKCE or Token-Based Authentication (TBA). The same credentials that authorize other REST API calls authorize the SuiteQL endpoint.

## What are the most common SuiteQL query patterns?

**Filtering transactions by date range:**

```sql
SELECT id, tranid, trandate, entity
FROM Transaction
WHERE type = 'SalesOrd'
    AND trandate >= ?
    AND trandate < ?
ORDER BY trandate DESC
```

Pass the start and end dates as bound parameters.

**Joining Transaction and TransactionLine:**

```sql
SELECT
    t.id,
    t.tranid,
    tl.linesequencenumber,
    tl.item,
    BUILTIN.DF(tl.item) AS item_name,
    tl.quantity,
    tl.rate,
    tl.amount
FROM Transaction t
INNER JOIN TransactionLine tl ON t.id = tl.transaction
WHERE t.type = 'SalesOrd'
    AND tl.mainline = 'F'
ORDER BY t.id, tl.linesequencenumber
```

The `mainline = 'F'` filter excludes the transaction header line and returns only item lines.

**Aggregate query with GROUP BY:**

```sql
SELECT
    BUILTIN.DF(t.subsidiary) AS subsidiary_name,
    COUNT(t.id) AS order_count,
    SUM(t.foreigntotal) AS total_amount
FROM Transaction t
WHERE t.type = 'SalesOrd'
    AND t.trandate >= ?
GROUP BY t.subsidiary
ORDER BY total_amount DESC
```

**Querying custom record types:**

Custom record types have table names based on their script ID. A custom record with the script ID `customrecord_service_request` is queried as:

```sql
SELECT id, name, custrecord_status, custrecord_assigned_to
FROM customrecord_service_request
WHERE custrecord_status = ?
```

## What are the performance and governance implications of SuiteQL?

SuiteQL queries consume governance units in SuiteScript. A `query.runSuiteQL` call costs 10 governance units per query, the same as a `record.load`. A `query.runSuiteQLPaged` call costs 10 governance units plus additional units per page fetch.

For queries that run inside User Event scripts (which have a 1,000-unit governance limit), keep the query simple and avoid situations where the script might run it in a loop. Scheduled Scripts and Map/Reduce scripts, with their higher limits, are better suited to complex SuiteQL operations.

Avoid queries that return large volumes of data inside synchronous contexts (Suitelets serving a user-facing page, for example). Use paged queries in batch contexts where the full result set is needed.

## What changed in SuiteQL's default sort order in 2026.2?

In NetSuite 2026.2, the default sort order for SuiteQL queries that include the `Transaction` table changed. Queries that do not specify an `ORDER BY` clause now sort by `trandate` instead of the previous default of `tranDisplayName`. If you have existing queries that rely on implicit sort order, they may return results in a different sequence after the 2026.2 upgrade.

The fix is to add an explicit `ORDER BY` clause to any query where sort order matters. Do not rely on implicit ordering. See the [SuiteQL default sort change post](/blog/netsuite-suiteql-sort-change-2026-2) for the full context.

<div style="background:#f0f4ff;border-left:3px solid #4f7fff;border-radius:0 10px 10px 0;padding:1.25rem 1.5rem;margin:2rem 0;font-family:system-ui,-apple-system,sans-serif">
<p style="margin:0 0 0.25rem;font-size:0.75rem;font-weight:700;color:#4f7fff;text-transform:uppercase;letter-spacing:0.08em">Building a SuiteQL-based report or pipeline?</p>
<p style="margin:0 0 0.75rem;color:#14306b;font-size:0.875rem;line-height:1.6">If your use case is more complex than a one-off query, whether that is a scheduled extraction job, a high-volume data pipeline, or a multi-subsidiary report, a conversation before you build can save you a redesign after the first failure in Production.</p>
<a href="/contact" style="display:inline-block;background:#4f7fff;color:#fff;font-size:0.8rem;font-weight:600;padding:0.5rem 1.25rem;border-radius:6px;text-decoration:none">Talk through your use case</a>
</div>

## When is SuiteQL work more than a query?

Learning SuiteQL syntax is one thing. Building a production-grade data pipeline with it is another.

The complexity compounds quickly in a few specific situations:

**High-volume extraction from a live account.** If you are pulling data from a NetSuite account that is actively processing transactions, you need to account for data that changes mid-extraction, for pagination that does not skip or double-count records at page boundaries, and for error handling that does not require a manual restart from zero when something goes wrong.

**Integration pipelines where NetSuite is the source of truth.** When external systems depend on data extracted from NetSuite via SuiteQL, the query needs to be reliable across NetSuite version upgrades. The 2026.2 sort change above is an example: a query that worked correctly before the upgrade may now return results in a different order, which can silently break a downstream system that assumed stable ordering.

**Multi-subsidiary reporting with dimension filters.** Queries that need to aggregate across subsidiaries while respecting dimension restrictions (department, class, location) require careful join logic. Getting the subsidiary filter wrong either over-restricts results (missing data) or under-restricts them (data leaking across entities), neither of which surfaces obviously in the query output.

**Performance-sensitive contexts.** A SuiteQL query running inside a Suitelet that serves a user-facing dashboard needs to return in under two seconds. The same query returning the same data for a nightly batch job can take thirty seconds without impact. Designing for both is not the same design.

---

If your SuiteQL use case is more than a one-off query, if you are building an extraction pipeline, wiring it into an integration, or designing a reporting system that needs to work reliably across NetSuite upgrades, talking through the design before you build is worth an hour. Most production SuiteQL failures are predictable once you know the failure modes. See our [SuiteScript development page](/netsuite-suitescript-development) for how we approach these builds, and reach out if you want to discuss your specific situation first.

For related reading: [NetSuite SuiteQL sort change in 2026.2](/blog/netsuite-suiteql-sort-change-2026-2), [NetSuite SuiteQL bound parameters](/blog/netsuite-suiteql-bound-parameters), and [NetSuite saved search vs SuiteAnalytics Workbook](/resources/netsuite-saved-search-vs-suiteanalytics-workbook).

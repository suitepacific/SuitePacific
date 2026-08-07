---
title: "NetSuite RESTlet vs REST Web Services: Which Integration Approach to Use"
description: "The practical difference between NetSuite RESTlets and REST Web Services, when to build a custom RESTlet versus using the built-in REST API, and how authentication differs between the two."
date: "2026-08-07"
tags: ["Integrations", "SuiteScript", "Development"]
---

The two main ways to build REST-based integrations with NetSuite are RESTlets and REST Web Services. Both accept HTTP requests and return JSON. Both support Token-Based Authentication. But they work differently and are built for different problems. RESTlets are custom SuiteScript endpoints you write and maintain. REST Web Services is NetSuite's built-in REST API that requires no custom code.

Choosing between them comes down to what the integration needs to do. Standard record operations (create, read, update, delete, query) belong in REST Web Services. Custom business logic, cross-record lookups, and integrations that need a non-standard response structure belong in RESTlets. In many accounts, both coexist: REST Web Services handles straightforward data exchange and a RESTlet exposes a custom endpoint for something the built-in API cannot do.

<div style="background:#eef2fb;border:1px solid #b2c2e6;border-radius:10px;padding:1.25rem 1.5rem;margin:2rem 0;font-family:system-ui,-apple-system,sans-serif">
<p style="margin:0 0 0.5rem;font-size:0.7rem;font-weight:700;color:#4f7fff;text-transform:uppercase;letter-spacing:0.08em">Quick answer</p>
<p style="margin:0;color:#14306b;font-size:0.9rem;line-height:1.6">RESTlets are SuiteScript-based custom REST endpoints you build and deploy in NetSuite. They run on NetSuite's servers with full access to the SuiteScript 2.x module library, so they can load records, run searches, call external APIs, and apply complex business logic in a single request. REST Web Services is NetSuite's built-in REST API that provides standard CRUD operations for all major record types and SuiteQL query access, with no custom code required. REST Web Services supports OAuth 2.0 in addition to Token-Based Authentication, making it the preferred choice for integrations managed by third parties. RESTlets support TBA only. Use RESTlets when you need custom logic at the integration layer, a combined response from multiple record types, or a non-standard response format. Use REST Web Services for standard record operations, SuiteQL queries, batch processing, and OAuth 2.0 authentication.</p>
</div>

<div style="overflow-x:auto;margin:2rem 0;border-radius:10px;overflow:hidden;border:1px solid #d7e0f3">
<table style="width:100%;border-collapse:collapse;font-size:0.85rem;font-family:system-ui,-apple-system,sans-serif;min-width:480px">
<thead>
<tr>
<th style="padding:0.75rem 1rem;text-align:left;background:#060f26;color:#eef2fb;font-weight:600;width:40%">Capability</th>
<th style="padding:0.75rem 1rem;text-align:center;background:#0b1f4d;color:#eef2fb;font-weight:600;width:30%">RESTlet</th>
<th style="padding:0.75rem 1rem;text-align:center;background:#4f7fff;color:#fff;font-weight:600;width:30%">REST Web Services</th>
</tr>
</thead>
<tbody>
<tr>
<td style="padding:0.65rem 1rem;border-bottom:1px solid #eef2fb;color:#14306b">Custom business logic at endpoint</td>
<td style="padding:0.65rem 1rem;border-bottom:1px solid #eef2fb;text-align:center;color:#065f46;font-weight:700">Yes</td>
<td style="padding:0.65rem 1rem;border-bottom:1px solid #eef2fb;text-align:center;color:#8aa2d6">No</td>
</tr>
<tr style="background:#f8faff">
<td style="padding:0.65rem 1rem;border-bottom:1px solid #eef2fb;color:#14306b">Token-Based Authentication (TBA)</td>
<td style="padding:0.65rem 1rem;border-bottom:1px solid #eef2fb;text-align:center;color:#065f46;font-weight:700">Yes</td>
<td style="padding:0.65rem 1rem;border-bottom:1px solid #eef2fb;text-align:center;color:#065f46;font-weight:700">Yes</td>
</tr>
<tr>
<td style="padding:0.65rem 1rem;border-bottom:1px solid #eef2fb;color:#14306b">OAuth 2.0 (Client Credentials)</td>
<td style="padding:0.65rem 1rem;border-bottom:1px solid #eef2fb;text-align:center;color:#8aa2d6">No</td>
<td style="padding:0.65rem 1rem;border-bottom:1px solid #eef2fb;text-align:center;color:#065f46;font-weight:700">Yes</td>
</tr>
<tr style="background:#f8faff">
<td style="padding:0.65rem 1rem;border-bottom:1px solid #eef2fb;color:#14306b">Standard record CRUD</td>
<td style="padding:0.65rem 1rem;border-bottom:1px solid #eef2fb;text-align:center;color:#4f6fb0">Via N/record</td>
<td style="padding:0.65rem 1rem;border-bottom:1px solid #eef2fb;text-align:center;color:#065f46;font-weight:700">Built-in</td>
</tr>
<tr>
<td style="padding:0.65rem 1rem;border-bottom:1px solid #eef2fb;color:#14306b">SuiteQL queries</td>
<td style="padding:0.65rem 1rem;border-bottom:1px solid #eef2fb;text-align:center;color:#4f6fb0">Via N/query</td>
<td style="padding:0.65rem 1rem;border-bottom:1px solid #eef2fb;text-align:center;color:#065f46;font-weight:700">Built-in endpoint</td>
</tr>
<tr style="background:#f8faff">
<td style="padding:0.65rem 1rem;border-bottom:1px solid #eef2fb;color:#14306b">Batch operations</td>
<td style="padding:0.65rem 1rem;border-bottom:1px solid #eef2fb;text-align:center;color:#4f6fb0">Manual</td>
<td style="padding:0.65rem 1rem;border-bottom:1px solid #eef2fb;text-align:center;color:#065f46;font-weight:700">Built-in (sequential from 2026.2)</td>
</tr>
<tr>
<td style="padding:0.65rem 1rem;border-bottom:1px solid #eef2fb;color:#14306b">Custom response format</td>
<td style="padding:0.65rem 1rem;border-bottom:1px solid #eef2fb;text-align:center;color:#065f46;font-weight:700">Yes</td>
<td style="padding:0.65rem 1rem;border-bottom:1px solid #eef2fb;text-align:center;color:#8aa2d6">Follows REST standard</td>
</tr>
<tr style="background:#f8faff">
<td style="padding:0.65rem 1rem;color:#14306b">Requires SuiteScript developer</td>
<td style="padding:0.65rem 1rem;text-align:center;color:#dc2626;font-weight:700">Yes</td>
<td style="padding:0.65rem 1rem;text-align:center;color:#065f46;font-weight:700">No</td>
</tr>
</tbody>
</table>
</div>

## What is a NetSuite RESTlet and how does it work?

A RESTlet is a SuiteScript 2.x script with the script type `@NScriptType RESTlet`. You write up to four entry point functions that correspond to HTTP methods: `get`, `post`, `put`, and `delete`. When an external system sends an HTTP request to the RESTlet's URL, NetSuite routes it to the appropriate function based on the method used.

RESTlets are deployed at Customization > Scripting > Scripts > New, selecting RESTlet as the script type. Once deployed, the URL follows this pattern:

```
https://[accountID].restlets.api.netsuite.com/app/site/hosting/restlet.nl?script=[scriptID]&deploy=[deployID]
```

Inside a RESTlet, you have full access to the SuiteScript 2.x module library. A `get` handler can load a record, query a saved search, call an external API, and combine results from multiple sources before returning a single JSON response. This is the primary advantage over REST Web Services: the logic lives at the endpoint layer, not in the calling system.

```javascript
/**
 * @NApiVersion 2.1
 * @NScriptType RESTlet
 */
define(['N/search', 'N/error'], (search, error) => {

    function get(params) {
        if (!params.customerId) {
            throw error.create({
                name: 'MISSING_PARAMETER',
                message: 'customerId is required',
            });
        }

        const results = [];
        search.create({
            type: search.Type.TRANSACTION,
            filters: [
                ['entity', 'is', params.customerId],
                'AND',
                ['mainline', 'is', true],
                'AND',
                ['status', 'is', 'SalesOrd:B'],
            ],
            columns: ['tranid', 'trandate', 'amount', 'status'],
        }).run().each((result) => {
            results.push({
                id: result.id,
                number: result.getValue('tranid'),
                date: result.getValue('trandate'),
                amount: result.getValue('amount'),
                status: result.getText('status'),
            });
            return true;
        });

        return { customerId: params.customerId, orders: results };
    }

    return { get };
});
```

This RESTlet accepts a `customerId` query parameter, runs a search across transaction records, and returns a combined result in one HTTP call. The equivalent in REST Web Services would require a SuiteQL query and then separate record reads, or a more complex SuiteQL that joins across record types.

## What is NetSuite REST Web Services and when should you use it?

REST Web Services is NetSuite's built-in REST API. No SuiteScript required. It is enabled at Setup > Company > Enable Features under the SuiteCloud tab. Once enabled, every standard NetSuite record type is accessible at a consistent endpoint:

```
https://[accountID].suitetalk.api.netsuite.com/services/rest/record/v1/[recordtype]/[id]
```

Standard operations:
- `GET /[recordtype]/[id]` retrieves a record
- `POST /[recordtype]` creates a record
- `PATCH /[recordtype]/[id]` updates an existing record
- `DELETE /[recordtype]/[id]` deletes a record
- `PUT /[recordtype]/[id]` creates or updates (upsert)

SuiteQL queries run at a separate endpoint:

```
https://[accountID].suitetalk.api.netsuite.com/services/rest/query/v1/suiteql
```

Batch operations, including the sequential processing added in 2026.2, are available at the batch endpoint. Sequential batch is the correct approach when one operation in a batch depends on the result of a previous one. See [NetSuite REST Web Services sequential batch processing](/blog/netsuite-rest-batch-sequential) for details.

REST Web Services records every operation against the standard NetSuite audit trail. User Event scripts still fire on records created or updated through the REST API. If your account has a `beforeSubmit` validation that rejects certain field values, that rejection will be returned as an HTTP error response.

## How does authentication differ between the two?

Both RESTlets and REST Web Services support Token-Based Authentication (TBA). The key difference is OAuth 2.0.

**REST Web Services** supports OAuth 2.0 Machine-to-Machine (Client Credentials grant) in addition to TBA. OAuth 2.0 is simpler for most third-party tools and iPaaS platforms to implement because it does not require computing HMAC-SHA256 signatures per request. Most modern integration platforms handle OAuth 2.0 client credentials flows natively.

**RESTlets** support TBA and NLAuth. NLAuth is being retired: integrations using it need to migrate to TBA before 2027.1. See [NLAuth and TBA migration timeline](/blog/netsuite-nlauth-tba-end-of-support) for the deadline details. RESTlets do not support OAuth 2.0.

For a new integration where the calling system supports OAuth 2.0, REST Web Services reduces the authentication complexity for whoever builds and maintains the external side of the connection.

## When should you use a RESTlet?

Use a RESTlet when the integration needs to:

- Execute business logic at the endpoint layer, not just pass data through
- Retrieve data from multiple record types and combine it into one response
- Apply transformations or validations before writing to NetSuite
- Return a custom JSON structure that does not match NetSuite's standard record format
- Support a calling system that cannot implement OAuth 2.0 or requires TBA specifically
- Call an external API as part of handling the incoming request

RESTlets are also appropriate when migrating an existing NLAuth-authenticated RESTlet to TBA is simpler than rewriting the integration around REST Web Services.

## When should you use REST Web Services?

Use REST Web Services when the integration needs to:

- Perform standard CRUD operations on NetSuite records
- Run SuiteQL queries for reporting or data extraction
- Process batch operations with controlled ordering
- Integrate with third-party tools or iPaaS platforms using OAuth 2.0
- Avoid maintaining custom SuiteScript code on the NetSuite side
- Follow standard REST conventions that the wider development team already understands

REST Web Services is maintained by Oracle and updated with each NetSuite release. Standard record types gain new fields and capabilities without requiring changes to the integration code. For net-new integrations that do not require custom logic at the endpoint layer, REST Web Services is the default choice.

---

If you are building or maintaining NetSuite integrations and need help deciding on the right architecture, our [NetSuite integrations service](/netsuite-integrations) covers REST Web Services, RESTlet design, and OAuth 2.0 migration. For related reading, see [NLAuth deprecation and TBA migration](/blog/netsuite-nlauth-tba-end-of-support) and [SuiteScript best practices](/blog/suitescript-best-practices).

## Frequently asked questions

**Q: Can a RESTlet call REST Web Services internally?**
A: There is no practical reason to do this. A RESTlet running on NetSuite's servers already has direct access to the N/record and N/search modules, which are more efficient than making HTTP calls back to the same account. Use SuiteScript modules directly inside a RESTlet rather than making REST Web Services calls.

**Q: Do User Event scripts fire when REST Web Services creates or updates a record?**
A: Yes. REST Web Services saves trigger the same User Event beforeSubmit and afterSubmit scripts as a UI save, a CSV import, or any other save path. If a beforeSubmit script throws an error, the REST Web Services call returns that error as an HTTP response rather than saving the record.

**Q: Can REST Web Services return combined data from multiple record types in one call?**
A: Not directly. REST Web Services returns individual records or SuiteQL query results. If you need to combine data from multiple record types in one request, a RESTlet is the appropriate tool.

**Q: What is the difference between a RESTlet and a Suitelet?**
A: A Suitelet is a server-side SuiteScript that generates a UI page or responds to HTTP requests, typically returning HTML. Suitelets can also return JSON, which makes them usable as REST-like endpoints, but they are primarily designed for building custom NetSuite pages. RESTlets are specifically designed as REST API endpoints and are the correct choice for machine-to-machine integrations.

**Q: Are RESTlets subject to SuiteScript governance limits?**
A: Yes. RESTlets run as SuiteScript executions and consume governance units. A RESTlet that loads records in a loop or runs complex searches on high-volume requests can exhaust its governance budget the same way any other SuiteScript type can. REST Web Services operations are handled by NetSuite's platform layer and have separate concurrency controls.

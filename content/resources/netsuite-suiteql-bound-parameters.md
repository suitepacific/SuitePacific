---
title: "How to Use Bound Parameters in NetSuite REST SuiteQL"
description: "Bound parameters let you pass dynamic values to SuiteQL queries separately from the query string, preventing injection vulnerabilities. Here is the format and how to convert an existing query to use them."
category: "SuiteScript"
tags: ["SuiteScript", "SuiteQL", "Security"]
publishedAt: "2026-07-21"
linkedinDay: 29
---

## What bound parameters do

Bound parameters separate the logic of a SuiteQL query from its dynamic values. Instead of building a query string with values embedded in it, you write `?` placeholders in the query and pass the actual values in a `params` array. NetSuite substitutes each placeholder with the corresponding value safely, so a value can never alter the query structure.

This feature is available on the REST SuiteQL endpoint as of NetSuite 2026.2.

## Step 1 — Identify queries with dynamic values

Look for SuiteQL queries in your code where a value is inserted into the query string at runtime. The pattern to find is string concatenation or interpolation inside a query:

```javascript
// Before — value embedded in the query string
query.runSuiteQL({
  query: `SELECT id FROM Transaction WHERE custbody_status = '${statusValue}'`
});
```

Any query where a variable is placed directly inside the query string is a candidate for bound parameters.

## Step 2 — Replace inline values with ? placeholders

Rewrite the query to use `?` in place of each dynamic value:

```javascript
// After — value replaced with a placeholder
const suiteqlQuery = "SELECT id FROM Transaction WHERE custbody_status = ?";
```

Use one `?` for each dynamic value. If you have multiple values, use multiple placeholders:

```javascript
const suiteqlQuery = "SELECT id, tranDate FROM Transaction WHERE tranDate > SYSDATE + ? AND status = ?";
```

## Step 3 — Add the params array

Pass the values as a `params` array alongside the query. The values map positionally to the `?` placeholders in order:

```json
{
  "q": "SELECT id, tranDate FROM Transaction WHERE tranDate > SYSDATE + ? AND status = ?",
  "params": ["-7", "0"]
}
```

The first `?` receives `"-7"`, the second receives `"0"`. NetSuite handles the substitution.

## Step 4 — Send the request to the REST SuiteQL endpoint

The bound parameters format is supported on the standard REST SuiteQL endpoint:

```
POST /services/rest/query/v1/suiteql
```

In SuiteScript using the `N/https` module:

```javascript
const response = https.post({
  url: `https://${accountId}.suitetalk.api.netsuite.com/services/rest/query/v1/suiteql`,
  headers: {
    Authorization: oauthHeader,
    "Content-Type": "application/json",
    prefer: "transient"
  },
  body: JSON.stringify({
    q: "SELECT id FROM Transaction WHERE custbody_field = ?",
    params: [fieldValue]
  })
});
```

## What the params array accepts

Each value in `params` is a string. NetSuite applies the correct type conversion based on the field the placeholder maps to in the query. Pass numbers as strings: `"7"` not `7`.

## When to use bound parameters

Use bound parameters any time your SuiteQL query includes:

- Values from user input or form submissions
- Values fetched from external systems at runtime
- Record IDs, field values, or dates built dynamically in code

For queries built entirely from hardcoded values, the risk is minimal, but using bound parameters consistently makes queries easier to test and maintains a clear separation between logic and data.

For background on why bound parameters matter and what injection risks they prevent, see [Bound Parameters in NetSuite REST SuiteQL: What They Are and Why You Should Use Them](/blog/netsuite-suiteql-bound-parameters).

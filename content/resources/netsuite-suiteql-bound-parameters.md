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

<figure style="margin:1.75rem 0">
<svg viewBox="0 0 680 148" xmlns="http://www.w3.org/2000/svg" style="width:100%;max-width:680px;display:block;font-family:system-ui,-apple-system,sans-serif">
  <!-- Left: Unsafe pattern -->
  <rect x="0" y="0" width="320" height="148" rx="9" fill="#fef2f2" stroke="#fca5a5" stroke-width="1.5"/>
  <rect x="0" y="0" width="320" height="28" rx="9" fill="#991b1b"/>
  <rect x="0" y="18" width="320" height="10" fill="#991b1b"/>
  <text x="160" y="18" text-anchor="middle" font-size="10" font-weight="700" fill="#fee2e2">String interpolation: unsafe</text>
  <rect x="12" y="34" width="296" height="34" rx="4" fill="#1e0505" stroke="#7f1d1d" stroke-width="1"/>
  <text x="160" y="48" text-anchor="middle" font-size="7.5" fill="#fca5a5" font-family="monospace">WHERE custbody_status = '${statusValue}'</text>
  <text x="160" y="61" text-anchor="middle" font-size="7.5" fill="#f87171" font-family="monospace">// statusValue comes from user input</text>
  <!-- Injection example -->
  <text x="160" y="83" text-anchor="middle" font-size="8" fill="#991b1b">If statusValue = </text>
  <text x="160" y="96" text-anchor="middle" font-size="7.5" fill="#ef4444" font-family="monospace">' OR '1'='1</text>
  <text x="160" y="109" text-anchor="middle" font-size="8" fill="#991b1b">... the query structure changes</text>
  <text x="160" y="126" text-anchor="middle" font-size="8.5" font-weight="700" fill="#991b1b">Dynamic value can alter the SQL logic</text>
  <!-- Right: Bound parameters -->
  <rect x="360" y="0" width="320" height="148" rx="9" fill="#f0fdf4" stroke="#86efac" stroke-width="1.5"/>
  <rect x="360" y="0" width="320" height="28" rx="9" fill="#14532d"/>
  <rect x="360" y="18" width="320" height="10" fill="#14532d"/>
  <text x="520" y="18" text-anchor="middle" font-size="10" font-weight="700" fill="#dcfce7">Bound parameters: safe</text>
  <rect x="372" y="34" width="296" height="34" rx="4" fill="#052e16" stroke="#166534" stroke-width="1"/>
  <text x="520" y="48" text-anchor="middle" font-size="7.5" fill="#86efac" font-family="monospace">WHERE custbody_status = ?</text>
  <text x="520" y="61" text-anchor="middle" font-size="7.5" fill="#4ade80" font-family="monospace">params: [statusValue]</text>
  <!-- Safe explanation -->
  <text x="520" y="83" text-anchor="middle" font-size="8" fill="#14532d">If statusValue = </text>
  <text x="520" y="96" text-anchor="middle" font-size="7.5" fill="#16a34a" font-family="monospace">' OR '1'='1</text>
  <text x="520" y="109" text-anchor="middle" font-size="8" fill="#14532d">... it is treated as a literal string value</text>
  <text x="520" y="126" text-anchor="middle" font-size="8.5" font-weight="700" fill="#14532d">Query structure cannot be altered</text>
</svg>
<figcaption style="text-align:center;font-size:0.78rem;color:#8aa2d6;margin-top:0.4rem">Bound parameters treat the value as data, never as SQL. The placeholder <code>?</code> is fixed at parse time.</figcaption>
</figure>

## Step 1: Identify queries with dynamic values

Look for SuiteQL queries in your code where a value is inserted into the query string at runtime. The pattern to find is string concatenation or interpolation inside a query:

```javascript
// Before: value embedded in the query string
query.runSuiteQL({
  query: `SELECT id FROM Transaction WHERE custbody_status = '${statusValue}'`
});
```

Any query where a variable is placed directly inside the query string is a candidate for bound parameters.

## Step 2: Replace inline values with ? placeholders

Rewrite the query to use `?` in place of each dynamic value:

```javascript
// After: value replaced with a placeholder
const suiteqlQuery = "SELECT id FROM Transaction WHERE custbody_status = ?";
```

Use one `?` for each dynamic value. If you have multiple values, use multiple placeholders:

```javascript
const suiteqlQuery = "SELECT id, tranDate FROM Transaction WHERE tranDate > SYSDATE + ? AND status = ?";
```

## Step 3: Add the params array

Pass the values as a `params` array alongside the query. The values map positionally to the `?` placeholders in order:

```json
{
  "q": "SELECT id, tranDate FROM Transaction WHERE tranDate > SYSDATE + ? AND status = ?",
  "params": ["-7", "0"]
}
```

The first `?` receives `"-7"`, the second receives `"0"`. NetSuite handles the substitution.

## Step 4: Send the request to the REST SuiteQL endpoint

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

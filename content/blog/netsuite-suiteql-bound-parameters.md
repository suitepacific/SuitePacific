---
title: "Bound Parameters in NetSuite REST SuiteQL: What They Are and Why You Should Use Them"
description: "NetSuite 2026.2 adds support for bound parameters in REST SuiteQL queries. They prevent injection vulnerabilities by separating query logic from query values. Here is how they work and when to use them."
date: "2026-07-21"
tags: ["SuiteScript", "SuiteQL", "Security"]
---

If you build SuiteQL queries in NetSuite that include dynamic values, such as a date range, a user-supplied record ID, or a value from another transaction, there is now a safer way to write them.

NetSuite 2026.2 adds support for **bound parameters** in REST SuiteQL queries. Instead of embedding values directly in the query string, you put placeholders in the query and pass the values separately. NetSuite handles the substitution safely.

## The problem with inline values

A common pattern for building SuiteQL queries with dynamic values looks like this:

```javascript
const status = getUserInput(); // value comes from somewhere dynamic

query.runSuiteQL({
  query: `SELECT id, tranDate FROM Transaction WHERE status = '${status}'`
});
```

If `status` contains unexpected input, it can alter the structure of the query. This is SQL injection, one of the most common and serious vulnerabilities in software that constructs database queries dynamically. In the context of SuiteQL via REST, a crafted value in that string can change what the query returns or how it behaves.

## How bound parameters work

With bound parameters, you replace each dynamic value in the query with a `?` placeholder, and pass the actual values in a separate `params` array:

```json
{
  "q": "SELECT id, tranDate FROM Transaction WHERE tranDate > SYSDATE + ? AND status = ?",
  "params": ["-7", "0"]
}
```

NetSuite substitutes each `?` with the corresponding value from `params` in order. The values are treated as data, not as part of the query structure. A value that looks like SQL syntax is never interpreted as SQL.

## Why this matters

The separation between query logic and query values is what makes bound parameters secure. When a value is passed through `params`, NetSuite knows it is a value, regardless of what the string contains. There is no way for a value in `params` to change the structure of the query.

For queries built entirely from hardcoded values, the risk is low and bound parameters make less difference. The benefit is greatest for queries that include:

- Values from user input
- Values from request parameters or external systems
- Record IDs or field values fetched from other sources at runtime

## Where to use them

Bound parameters are available on the REST SuiteQL endpoint:

```
POST /services/rest/query/v1/suiteql
```

In SuiteScript using the `N/https` module or in any REST client hitting this endpoint, the request body format is:

```json
{
  "q": "SELECT id FROM Transaction WHERE custbody_field = ?",
  "params": ["value"]
}
```

The `params` array maps positionally to the `?` placeholders in the query. The first `?` gets the first value, the second `?` gets the second, and so on.

## The practical default

Even for queries where injection risk seems low, using bound parameters is a good habit. It makes the intent of the query clearer (logic is separate from values), simplifies testing (you can change values without touching the query string), and eliminates an entire class of vulnerability without any meaningful cost.

For step-by-step guidance on converting existing SuiteQL queries to use bound parameters, see [How to Use Bound Parameters in NetSuite REST SuiteQL](/resources/netsuite-suiteql-bound-parameters).

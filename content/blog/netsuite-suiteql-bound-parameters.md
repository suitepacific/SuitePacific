---
title: "Bound Parameters in NetSuite REST SuiteQL: What They Are and Why You Should Use Them"
description: "NetSuite 2026.2 adds support for bound parameters in REST SuiteQL queries. They prevent injection vulnerabilities by separating query logic from query values. Here is how they work and when to use them."
date: "2026-07-21"
updated: "2026-08-07"
tags: ["SuiteScript", "SuiteQL", "Security"]
---

Bound parameters are a parameterized query technique where dynamic values are passed separately from the query string, preventing injection vulnerabilities and making queries easier to maintain. In SuiteQL, a bound parameter replaces an embedded value with a placeholder that NetSuite substitutes safely at execution time.

If you build SuiteQL queries in NetSuite that include dynamic values, such as a date range, a user-supplied record ID, or a value from another transaction, there is now a safer way to write them.

NetSuite 2026.2 adds support for **bound parameters** in REST SuiteQL queries. Instead of embedding values directly in the query string, you put placeholders in the query and pass the values separately. NetSuite handles the substitution safely.

<figure style="margin:1.75rem 0">
<svg viewBox="0 0 680 140" xmlns="http://www.w3.org/2000/svg" style="width:100%;max-width:680px;display:block;font-family:system-ui,-apple-system,sans-serif">
  <rect x="0" y="0" width="320" height="140" rx="9" fill="#fef2f2" stroke="#fca5a5" stroke-width="1.5"/>
  <rect x="0" y="0" width="320" height="28" rx="9" fill="#991b1b"/>
  <rect x="0" y="18" width="320" height="10" fill="#991b1b"/>
  <text x="160" y="18" text-anchor="middle" font-size="10" font-weight="700" fill="#fee2e2">String interpolation: unsafe</text>
  <rect x="12" y="34" width="296" height="32" rx="4" fill="#1e0505" stroke="#7f1d1d" stroke-width="1"/>
  <text x="160" y="48" text-anchor="middle" font-size="7.5" fill="#fca5a5" font-family="monospace">WHERE status = '${statusValue}'</text>
  <text x="160" y="60" text-anchor="middle" font-size="7.5" fill="#f87171" font-family="monospace">// value comes from dynamic input</text>
  <text x="160" y="82" text-anchor="middle" font-size="8" fill="#991b1b">statusValue = <tspan font-family="monospace" fill="#ef4444">' OR '1'='1</tspan></text>
  <text x="160" y="97" text-anchor="middle" font-size="8" fill="#991b1b">... alters the SQL structure</text>
  <text x="160" y="120" text-anchor="middle" font-size="8.5" font-weight="700" fill="#991b1b">Dynamic value changes the query logic</text>
  <rect x="360" y="0" width="320" height="140" rx="9" fill="#f0fdf4" stroke="#86efac" stroke-width="1.5"/>
  <rect x="360" y="0" width="320" height="28" rx="9" fill="#14532d"/>
  <rect x="360" y="18" width="320" height="10" fill="#14532d"/>
  <text x="520" y="18" text-anchor="middle" font-size="10" font-weight="700" fill="#dcfce7">Bound parameters: safe (2026.2+)</text>
  <rect x="372" y="34" width="296" height="32" rx="4" fill="#052e16" stroke="#166534" stroke-width="1"/>
  <text x="520" y="48" text-anchor="middle" font-size="7.5" fill="#86efac" font-family="monospace">WHERE status = ?</text>
  <text x="520" y="60" text-anchor="middle" font-size="7.5" fill="#4ade80" font-family="monospace">params: [statusValue]</text>
  <text x="520" y="82" text-anchor="middle" font-size="8" fill="#14532d">statusValue = <tspan font-family="monospace" fill="#16a34a">' OR '1'='1</tspan></text>
  <text x="520" y="97" text-anchor="middle" font-size="8" fill="#14532d">... treated as a literal string</text>
  <text x="520" y="120" text-anchor="middle" font-size="8.5" font-weight="700" fill="#14532d">Query structure cannot be altered</text>
</svg>
<figcaption style="text-align:center;font-size:0.78rem;color:#8aa2d6;margin-top:0.4rem">Bound parameters parse the query once, then substitute values safely. The <code>?</code> placeholder is never interpreted as SQL.</figcaption>
</figure>

<div style="background:#eef2fb;border:1px solid #b2c2e6;border-radius:10px;padding:1.25rem 1.5rem;margin:2rem 0;font-family:system-ui,-apple-system,sans-serif">
<p style="margin:0 0 0.5rem;font-size:0.7rem;font-weight:700;color:#4f7fff;text-transform:uppercase;letter-spacing:0.08em">Quick answer</p>
<p style="margin:0;color:#14306b;font-size:0.9rem;line-height:1.6">Bound parameters in NetSuite REST SuiteQL separate query structure from query values by replacing dynamic values in the SQL string with ? placeholders and passing the actual values in a separate params array. Available from NetSuite 2026.2 on the REST SuiteQL endpoint at POST /services/rest/query/v1/suiteql. The request body takes a q field with the query containing ? placeholders and a params array where each value maps positionally to a placeholder. NetSuite substitutes each placeholder with the corresponding params value, treating it as data rather than SQL. This prevents injection vulnerabilities where a crafted value could otherwise alter the query structure. The primary benefit is security: values in params cannot change the query structure regardless of what they contain. A secondary benefit is clarity: query logic and query values are readable separately. Use bound parameters whenever query values come from dynamic sources such as user input, request parameters, or values fetched at runtime.</p>
</div>

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

## Frequently asked questions

**Q: Do bound parameters work in SuiteScript as well as direct REST calls?**
A: Bound parameters are a feature of the REST SuiteQL endpoint. When making calls to this endpoint from SuiteScript using the N/https module, you pass the same JSON body format with q and params fields and bound parameters work the same way.

**Q: Can I use multiple placeholders in the same query?**
A: Yes. Each ? in the query maps positionally to the corresponding element in the params array. The first ? gets params[0], the second gets params[1], and so on. You can use as many placeholders as your query requires.

**Q: Is there a performance difference between bound and inline queries?**
A: Bound parameters parse the query structure once and substitute values separately, which is generally comparable to string interpolation for typical query lengths. The main benefit is security and readability, not performance.

**Q: Do bound parameters work with all SuiteQL data types?**
A: Values in the params array are passed as strings and NetSuite handles the type conversion based on the query context. For date values and numeric comparisons, pass the value as a string in the format expected by the query.

**Q: Should I rewrite existing SuiteQL queries to use bound parameters?**
A: For queries with dynamic values, especially those where any value comes from user input or external sources, converting to bound parameters is recommended. For queries with only hardcoded values, the injection risk is low, but bound parameters still improve readability.

For step-by-step guidance on converting existing SuiteQL queries to use bound parameters, see [How to Use Bound Parameters in NetSuite REST SuiteQL](/resources/netsuite-suiteql-bound-parameters).

For help reviewing or rewriting SuiteQL queries in your account, see SuitePacific's [NetSuite SuiteScript development service](/netsuite-suitescript-development).
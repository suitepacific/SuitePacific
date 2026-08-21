---
title: "NetSuite Saved Search Formula Examples: Date Math, Conditionals, and Text Formatting"
description: "Common saved search formula patterns for NetSuite: CASE WHEN conditionals with finance examples, age-in-days calculations, NVL null handling, date formatting, and bucketed AR aging columns."
date: "2026-08-07"
updated: "2026-08-21"
tags: ["Saved Searches", "Reporting", "Admin", "NetSuite Tips"]
---

A NetSuite saved search formula field is a calculated column type that accepts Oracle SQL expressions, added in the Results tab of any saved search to produce values that do not exist as standard fields on the record. Formula fields appear alongside standard columns, support summary functions, and work the same way in grouped and ungrouped searches.

NetSuite saved searches include a formula field type that accepts Oracle SQL expressions. This lets you build calculated columns that do not exist as standard fields on the record: invoice age in days, a conditional label based on status, a formatted combination of two text fields, or a bucketed value for grouping. Formula fields appear alongside standard result columns and work in summary searches the same way standard fields do.

Most saved search users never touch formula fields because the syntax looks unfamiliar. But the functions you actually need for the most common use cases are straightforward, and the same four or five patterns cover the majority of real-world requirements.

<div style="background:#eef2fb;border:1px solid #b2c2e6;border-radius:10px;padding:1.25rem 1.5rem;margin:2rem 0;font-family:system-ui,-apple-system,sans-serif">
<p style="margin:0 0 0.5rem;font-size:0.7rem;font-weight:700;color:#4f7fff;text-transform:uppercase;letter-spacing:0.08em">Quick answer</p>
<p style="margin:0;color:#14306b;font-size:0.9rem;line-height:1.6">Saved search formulas use Oracle SQL syntax. Field references are wrapped in curly braces: {trandate}, {entity}, {amount}. SYSDATE returns the current date. Subtracting one date from another returns the difference in days as a number. CASE WHEN...THEN...ELSE...END handles conditional logic. NVL(field, default) returns the default value when a field is null. TO_CHAR(date, 'format') converts a date to a string in the format you specify. ROUND(number, 0) rounds to the nearest integer. These functions are added in the Results tab of a saved search by clicking Add Formula and selecting the formula type that matches the return value: Formula(Text) for strings, Formula(Numeric) for numbers, Formula(Date) for dates. Getting the formula type wrong produces a blank column or an error rather than the expected output. Formula fields can also be added to the Criteria tab of a saved search, not only the Results tab, which allows filtering records by a calculated value that does not exist as a standard field on the record type.</p>
</div>

<figure style="margin:1.75rem 0">
<svg viewBox="0 0 680 170" xmlns="http://www.w3.org/2000/svg" style="width:100%;max-width:680px;display:block;font-family:system-ui,-apple-system,sans-serif">
  <defs>
    <marker id="fa-arrow" markerWidth="7" markerHeight="7" refX="5" refY="3" orient="auto"><path d="M0,0 L0,6 L7,3 z" fill="#4f7fff"/></marker>
  </defs>
  <text x="340" y="14" text-anchor="middle" font-size="10" font-weight="700" fill="#14306b" letter-spacing="0.05em">FORMULA FIELD: HOW THE PIECES FIT TOGETHER</text>
  <rect x="0" y="24" width="138" height="100" rx="7" fill="#eef2fb" stroke="#4f7fff" stroke-width="1.5"/>
  <rect x="0" y="24" width="138" height="28" rx="7" fill="#0b1f4d"/>
  <rect x="0" y="42" width="138" height="10" fill="#0b1f4d"/>
  <text x="69" y="42" text-anchor="middle" font-size="9" font-weight="700" fill="#eef2fb">1. Field Reference</text>
  <text x="69" y="66" text-anchor="middle" font-size="8.5" fill="#14306b" font-family="monospace">{trandate}</text>
  <text x="69" y="82" text-anchor="middle" font-size="8.5" fill="#14306b" font-family="monospace">{amount}</text>
  <text x="69" y="98" text-anchor="middle" font-size="8.5" fill="#14306b" font-family="monospace">{duedate}</text>
  <text x="69" y="113" text-anchor="middle" font-size="7.5" fill="#4f6fb0">Internal ID in braces</text>
  <line x1="141" y1="74" x2="162" y2="74" stroke="#4f7fff" stroke-width="2" marker-end="url(#fa-arrow)"/>
  <rect x="166" y="24" width="160" height="100" rx="7" fill="#eef2fb" stroke="#4f7fff" stroke-width="1.5"/>
  <rect x="166" y="24" width="160" height="28" rx="7" fill="#0b1f4d"/>
  <rect x="166" y="42" width="160" height="10" fill="#0b1f4d"/>
  <text x="246" y="42" text-anchor="middle" font-size="9" font-weight="700" fill="#eef2fb">2. SQL Expression</text>
  <text x="246" y="64" text-anchor="middle" font-size="7.5" fill="#14306b" font-family="monospace">CASE WHEN ... END</text>
  <text x="246" y="80" text-anchor="middle" font-size="7.5" fill="#14306b" font-family="monospace">SYSDATE - {duedate}</text>
  <text x="246" y="96" text-anchor="middle" font-size="7.5" fill="#14306b" font-family="monospace">NVL({field}, default)</text>
  <text x="246" y="113" text-anchor="middle" font-size="7.5" fill="#4f6fb0">Oracle SQL syntax</text>
  <line x1="329" y1="74" x2="350" y2="74" stroke="#4f7fff" stroke-width="2" marker-end="url(#fa-arrow)"/>
  <rect x="354" y="24" width="148" height="100" rx="7" fill="#eef2fb" stroke="#4f7fff" stroke-width="1.5"/>
  <rect x="354" y="24" width="148" height="28" rx="7" fill="#0b1f4d"/>
  <rect x="354" y="42" width="148" height="10" fill="#0b1f4d"/>
  <text x="428" y="42" text-anchor="middle" font-size="9" font-weight="700" fill="#eef2fb">3. Formula Type</text>
  <text x="428" y="64" text-anchor="middle" font-size="8" fill="#14306b">Formula(Text)</text>
  <text x="428" y="78" text-anchor="middle" font-size="8" fill="#14306b">Formula(Numeric)</text>
  <text x="428" y="92" text-anchor="middle" font-size="8" fill="#14306b">Formula(Date)</text>
  <text x="428" y="106" text-anchor="middle" font-size="8" fill="#14306b">Formula(Checkbox)</text>
  <text x="428" y="119" text-anchor="middle" font-size="7" fill="#e05252" font-weight="600">Must match return type</text>
  <line x1="505" y1="74" x2="526" y2="74" stroke="#4f7fff" stroke-width="2" marker-end="url(#fa-arrow)"/>
  <rect x="530" y="24" width="150" height="100" rx="7" fill="#eef2fb" stroke="#b2c2e6" stroke-width="1.5"/>
  <rect x="530" y="24" width="150" height="28" rx="7" fill="#14306b"/>
  <rect x="530" y="42" width="150" height="10" fill="#14306b"/>
  <text x="605" y="42" text-anchor="middle" font-size="9" font-weight="700" fill="#eef2fb">4. Result Column</text>
  <text x="605" y="64" text-anchor="middle" font-size="8" fill="#4f6fb0">Appears in Results tab</text>
  <text x="605" y="78" text-anchor="middle" font-size="8" fill="#4f6fb0">alongside standard cols</text>
  <text x="605" y="92" text-anchor="middle" font-size="8" fill="#4f6fb0">Can also filter records</text>
  <text x="605" y="106" text-anchor="middle" font-size="8" fill="#4f6fb0">in Criteria tab</text>
  <text x="605" y="120" text-anchor="middle" font-size="7.5" fill="#4f7fff">Blank = type mismatch</text>
  <text x="340" y="155" text-anchor="middle" font-size="8" fill="#e05252" font-weight="600">Type mismatch produces a blank column, not an error. Check this first when debugging a formula that returns nothing.</text>
</svg>
<figcaption style="text-align:center;font-size:0.78rem;color:#8aa2d6;margin-top:0.4rem">The four steps to build a formula field. The most common mistake: a text expression in Formula(Numeric) produces a blank column with no error message.</figcaption>
</figure>

## How do you add a formula field to a saved search?

In the Results tab of a saved search, click the field selector dropdown and scroll to the Formula entries: Formula(Text), Formula(Numeric), Formula(Date), and Formula(Checkbox). Select the type that matches what your formula returns.

After selecting the formula type, an input field appears where you enter the expression. The formula references record fields using curly braces around the field's internal ID: `{trandate}` for the transaction date, `{entity}` for the customer, `{amount}` for the total.

The formula type must match the return type of the expression. If your CASE WHEN formula returns a text string, use Formula(Text). If it returns a number, use Formula(Numeric). Using the wrong type produces a blank column rather than an error message, which makes the mismatch hard to diagnose.

<div style="overflow-x:auto;margin:1.5rem 0">
<table style="width:100%;border-collapse:collapse;font-size:0.82rem;font-family:system-ui,-apple-system,sans-serif">
<thead>
<tr style="background:#0b1f4d;color:#eef2fb">
<th style="padding:0.6rem 0.85rem;text-align:left;font-weight:700;font-size:0.7rem;letter-spacing:0.06em;text-transform:uppercase">Formula type</th>
<th style="padding:0.6rem 0.85rem;text-align:left;font-weight:700;font-size:0.7rem;letter-spacing:0.06em;text-transform:uppercase">Returns</th>
<th style="padding:0.6rem 0.85rem;text-align:left;font-weight:700;font-size:0.7rem;letter-spacing:0.06em;text-transform:uppercase">Use case</th>
<th style="padding:0.6rem 0.85rem;text-align:left;font-weight:700;font-size:0.7rem;letter-spacing:0.06em;text-transform:uppercase">Common functions</th>
</tr>
</thead>
<tbody>
<tr style="border-bottom:1px solid #e2e8f0">
<td style="padding:0.55rem 0.85rem;color:#14306b;font-weight:600">Formula(Text)</td>
<td style="padding:0.55rem 0.85rem;color:#4f6fb0">String</td>
<td style="padding:0.55rem 0.85rem;color:#4f6fb0">Labels, categories, formatted dates, concatenated fields</td>
<td style="padding:0.55rem 0.85rem;color:#14306b;font-family:monospace;font-size:0.78rem">CASE WHEN, TO_CHAR, NVL, ||</td>
</tr>
<tr style="background:#f8faff;border-bottom:1px solid #e2e8f0">
<td style="padding:0.55rem 0.85rem;color:#14306b;font-weight:600">Formula(Numeric)</td>
<td style="padding:0.55rem 0.85rem;color:#4f6fb0">Number</td>
<td style="padding:0.55rem 0.85rem;color:#4f6fb0">Days-old calculations, ratios, arithmetic</td>
<td style="padding:0.55rem 0.85rem;color:#14306b;font-family:monospace;font-size:0.78rem">SYSDATE - {date}, ROUND, NVL</td>
</tr>
<tr style="border-bottom:1px solid #e2e8f0">
<td style="padding:0.55rem 0.85rem;color:#14306b;font-weight:600">Formula(Date)</td>
<td style="padding:0.55rem 0.85rem;color:#4f6fb0">Date</td>
<td style="padding:0.55rem 0.85rem;color:#4f6fb0">Computed dates, date offsets</td>
<td style="padding:0.55rem 0.85rem;color:#14306b;font-family:monospace;font-size:0.78rem">ADD_MONTHS, NVL</td>
</tr>
<tr style="background:#f8faff;border-bottom:1px solid #e2e8f0">
<td style="padding:0.55rem 0.85rem;color:#14306b;font-weight:600">Formula(Checkbox)</td>
<td style="padding:0.55rem 0.85rem;color:#4f6fb0">T / F</td>
<td style="padding:0.55rem 0.85rem;color:#4f6fb0">Boolean filter flags, yes/no conditions</td>
<td style="padding:0.55rem 0.85rem;color:#14306b;font-family:monospace;font-size:0.78rem">CASE WHEN ... 'T' ELSE 'F'</td>
</tr>
<tr style="border-bottom:1px solid #e2e8f0">
<td style="padding:0.55rem 0.85rem;color:#14306b;font-weight:600">Formula(Percent)</td>
<td style="padding:0.55rem 0.85rem;color:#4f6fb0">Percentage</td>
<td style="padding:0.55rem 0.85rem;color:#4f6fb0">Margin rates, completion percentages</td>
<td style="padding:0.55rem 0.85rem;color:#14306b;font-family:monospace;font-size:0.78rem">Division on numeric fields</td>
</tr>
<tr style="background:#f8faff">
<td style="padding:0.55rem 0.85rem;color:#14306b;font-weight:600">Formula(Currency)</td>
<td style="padding:0.55rem 0.85rem;color:#4f6fb0">Currency</td>
<td style="padding:0.55rem 0.85rem;color:#4f6fb0">Calculated amounts, multi-field totals</td>
<td style="padding:0.55rem 0.85rem;color:#14306b;font-family:monospace;font-size:0.78rem">Arithmetic on currency fields</td>
</tr>
</tbody>
</table>
</div>

## What is the formula for calculating invoice age in days?

```sql
ROUND(SYSDATE - {trandate})
```

`SYSDATE` is Oracle's built-in current date/time. Subtracting a date field from `SYSDATE` returns the number of days as a decimal. `ROUND` converts it to a whole number. Use **Formula(Numeric)** for this expression.

For invoices specifically, you more often want days past due rather than days from transaction date:

```sql
ROUND(SYSDATE - {duedate})
```

This returns a negative number for invoices that are not yet due, and a positive number for overdue invoices. A zero-filter on this column (greater than 0) gives you all overdue invoices.

For an aging bucket display (0-30, 31-60, 61-90, 91+), combine with CASE WHEN:

```sql
CASE
  WHEN ROUND(SYSDATE - {duedate}) <= 0 THEN 'Current'
  WHEN ROUND(SYSDATE - {duedate}) <= 30 THEN '1-30 days'
  WHEN ROUND(SYSDATE - {duedate}) <= 60 THEN '31-60 days'
  WHEN ROUND(SYSDATE - {duedate}) <= 90 THEN '61-90 days'
  ELSE '90+ days'
END
```

Use **Formula(Text)** for the bucketed version. This column is also useful as a group-by field in a summary search to aggregate amounts by aging bucket.

## How do you use CASE WHEN for conditional output?

`CASE WHEN` is the primary tool for conditional logic in formula fields. The syntax:

```sql
CASE WHEN {condition} THEN {result} ELSE {default} END
```

A practical example: flag transactions that exceed a threshold.

```sql
CASE WHEN {amount} >= 10000 THEN 'Large' WHEN {amount} >= 1000 THEN 'Medium' ELSE 'Small' END
```

You can chain as many `WHEN` clauses as needed. NetSuite evaluates them in order and returns the first match. Use **Formula(Text)** when the output values are strings.

For a boolean output that works as a filter:

```sql
CASE WHEN {status} = 'A' AND {amount} > 0 THEN 'T' ELSE 'F' END
```

Use **Formula(Checkbox)** for true/false outputs. The checkbox result can then be used as a filter criterion in the Criteria tab of another saved search.

## How do you handle null values in formula fields?

Fields that are optional in NetSuite return null when they have no value. A formula that references a null field without handling it will return null for the entire expression, producing a blank result.

`NVL` (Null Value) replaces null with a default:

```sql
NVL({custbody_approver}, 'No Approver Set')
```

For numeric fields, this prevents null from propagating through arithmetic:

```sql
ROUND(SYSDATE - NVL({duedate}, SYSDATE))
```

Using `NVL({duedate}, SYSDATE)` means records with no due date return 0 (not yet overdue) rather than null for the age calculation.

You can also use NVL in CASE WHEN to distinguish between null and a specific value:

```sql
CASE WHEN {custbody_region} IS NULL THEN 'Unassigned' ELSE {custbody_region} END
```

`IS NULL` is more explicit than `NVL` when the goal is to specifically test for the absence of a value rather than to substitute a default.

## How do you format dates as text?

Subtracting dates returns a number. Displaying a date in a specific format requires `TO_CHAR`:

```sql
TO_CHAR({trandate}, 'MM/DD/YYYY')
```

Common format strings:
- `'MM/DD/YYYY'` produces 08/07/2026
- `'Mon DD, YYYY'` produces Aug 07, 2026
- `'YYYY-MM-DD'` produces 2026-08-07 (ISO format, useful for sorting)
- `'MM/YYYY'` produces 08/2026 (for month-level grouping)

Use **Formula(Text)** for `TO_CHAR` expressions. The output is a string, not a date, so it cannot be filtered with date range operators. If you need both a formatted display and a filterable date, add two columns: one standard date column for filtering and one Formula(Text) for display.

For a month-year grouping in a summary search, the `'MM/YYYY'` format lets you group transactions by month without losing the year context:

```sql
TO_CHAR({trandate}, 'MM/YYYY')
```

## How do you concatenate fields in a formula?

The `||` operator concatenates strings in Oracle SQL:

```sql
{entity.entityid} || ' - ' || {tranid}
```

This produces an output like `CUST-1042 - INV-8931`, combining the customer entity ID and the transaction number. Use **Formula(Text)**.

For a vendor name plus address line for a printed report:

```sql
{entity.entityid} || ' (' || NVL({billingaddress.addr1}, 'No address') || ')'
```

Note that multi-level field references (entity.entityid, billingaddress.addr1) are available in formula fields the same way they are in standard column expressions. The field ID uses dot notation to traverse the relationship.

<figure style="margin:2rem 0">
<img src="/blog/netsuite-saved-search-formula-examples/formula-results.png" alt="NetSuite saved search results showing a formula column with AR aging bucket labels such as 1_Current, 2_1-30 days, and 3_31-60 days alongside Document Number, Customer, Amount, and Due Date columns" style="width:100%;border-radius:8px;border:1px solid #e2e8f0" loading="lazy" />
<figcaption style="font-size:0.75rem;color:#64748b;margin-top:0.5rem">A saved search results grid with a Formula(Text) aging bucket column. The sort-order prefix on each label (1_, 2_, 3_) keeps the buckets in chronological order when the column is sorted, which a plain text label like "Current" or "31-60 days" would not do.</figcaption>
</figure>

## CASE WHEN examples for finance and operations teams

The following formulas cover the most common conditional logic requirements on finance and operations saved searches. Each can be added as a Formula(Text) or Formula(Numeric) column in the Results tab.

**AR aging bucket label (used as a group-by column in summary searches):**
```sql
CASE
  WHEN ROUND(SYSDATE - {duedate}) <= 0 THEN '1_Current'
  WHEN ROUND(SYSDATE - {duedate}) <= 30 THEN '2_1-30 days'
  WHEN ROUND(SYSDATE - {duedate}) <= 60 THEN '3_31-60 days'
  WHEN ROUND(SYSDATE - {duedate}) <= 90 THEN '4_61-90 days'
  ELSE '5_Over 90 days'
END
```
Prefixing each label with a number forces the correct sort order when the column is used as a group-by field. Use Formula(Text).

**Approval status flag for exception searches:**
```sql
CASE
  WHEN {approvalstatus} = 'Approved' AND {amount} > 50000 THEN 'Large - Approved'
  WHEN {approvalstatus} = 'Approved' THEN 'Approved'
  WHEN {approvalstatus} = 'Pending Approval' AND ROUND(SYSDATE - {trandate}) > 3 THEN 'Overdue - Pending'
  WHEN {approvalstatus} = 'Pending Approval' THEN 'Pending'
  ELSE 'Rejected / Draft'
END
```
This surfaces overdue pending approvals as their own category in a single column. Useful for an AP exceptions dashboard. Use Formula(Text).

**Revenue recognition period flag:**
```sql
CASE
  WHEN TO_CHAR({startdate}, 'MM/YYYY') = TO_CHAR(SYSDATE, 'MM/YYYY') THEN 'Recognizing This Month'
  WHEN {startdate} > SYSDATE THEN 'Future'
  WHEN {enddate} < SYSDATE THEN 'Fully Recognized'
  ELSE 'Active'
END
```
Useful for SuiteBilling or ARM searches to quickly classify arrangements by their current recognition state. Use Formula(Text).

**Margin tier (calculated from amount and cost fields):**
```sql
CASE
  WHEN {amount} = 0 THEN 'No Revenue'
  WHEN ({amount} - NVL({estgrossprofit}, 0)) / {amount} < 0.1 THEN 'Low Margin (<10%)'
  WHEN ({amount} - NVL({estgrossprofit}, 0)) / {amount} < 0.25 THEN 'Mid Margin (10-25%)'
  ELSE 'High Margin (>25%)'
END
```
Use Formula(Text). Note that `{estgrossprofit}` field availability varies by transaction type and account configuration; confirm the internal field ID for your account in the field selector.

**Days since last customer activity (for customer aging in CRM workflows):**
```sql
ROUND(SYSDATE - NVL({lastmodifieddate}, {datecreated}))
```
Returns number of days since the customer record was last modified, falling back to the creation date if no modification has occurred. Use Formula(Numeric). Add a CASE WHEN wrapper to convert to a category label if needed for grouping.

**Multi-subsidiary allocation label:**
```sql
CASE
  WHEN {subsidiary} = 'Parent Company : US Operations' THEN 'US'
  WHEN {subsidiary} = 'Parent Company : UK Operations' THEN 'UK'
  WHEN {subsidiary} = 'Parent Company : Canada' THEN 'CA'
  ELSE 'Other'
END
```
Useful for consolidating subsidiary names into shorter labels for reporting. Replace the subsidiary display names with the actual values from your account. Use Formula(Text).

The pattern across all of these is the same: evaluate a condition or set of conditions, return a label or value based on the first matching condition, and close with `END`. Chaining multiple `WHEN` clauses handles ranges; combining field comparisons with `AND` and `OR` inside a single `WHEN` handles compound conditions.

## What formula shows transactions created this month?

```sql
CASE WHEN TO_CHAR({trandate}, 'MM/YYYY') = TO_CHAR(SYSDATE, 'MM/YYYY') THEN 'T' ELSE 'F' END
```

Use **Formula(Checkbox)** and filter for checked (T) to see only transactions from the current month. This approach works without needing to update date range filter values manually when the month rolls over.

For the previous month:

```sql
CASE WHEN TO_CHAR({trandate}, 'MM/YYYY') = TO_CHAR(ADD_MONTHS(SYSDATE, -1), 'MM/YYYY') THEN 'T' ELSE 'F' END
```

`ADD_MONTHS(date, n)` adds or subtracts months from a date. Negative values go backwards. This is more reliable than subtracting 30 days, since month lengths vary.

---

Saved search formulas are one of the higher-leverage tools in NetSuite because they let you build logic once and reuse it across dashboards, scheduled reports, and workflow criteria. Our [saved searches and dashboards service](/netsuite-saved-searches-dashboards) includes building formula-based searches for finance teams, operations, and management reporting. For related reading, see [NetSuite Saved Search Examples for Finance and Operations Teams](/blog/netsuite-saved-search-examples) and [NetSuite Saved Search Tips](/blog/netsuite-saved-search-tips).

## Frequently asked questions

**Q: Why is my Formula(Numeric) column showing blank instead of a number?**
A: The most common causes are a type mismatch (the formula returns text but the column type is Numeric), a null field propagating through the expression (wrap with NVL), or a syntax error in the formula. NetSuite does not always show a clear error for formula mistakes; a blank column usually means one of these three issues.

**Q: Can formula fields be used in saved search criteria, not just results?**
A: Yes. In the Criteria tab, select Formula(Text), Formula(Numeric), or the relevant type and enter the same expression syntax. This lets you filter records based on a calculated value, such as showing only invoices more than 60 days old using `ROUND(SYSDATE - {duedate}) > 60` as a Formula(Numeric) criteria.

**Q: Are there performance considerations for formula fields in large result sets?**
A: Formula fields are evaluated for each row in the result set. Simple arithmetic and CASE WHEN expressions have minimal impact. Complex expressions with multiple nested NVL calls or string concatenation across many rows can slow the search. If a saved search with formula fields is timing out, simplify the formula or add criteria to reduce the number of rows being evaluated.

**Q: Can I reference one formula column result in another formula column?**
A: Not directly by name. However, you can repeat the expression in a second formula rather than referencing it by an alias. If the repeated expression is complex, consider using a CASE WHEN in the second formula that re-evaluates the same logic rather than trying to cross-reference formula column results.

**Q: What is the difference between DECODE and CASE WHEN?**
A: Both handle conditional logic. `DECODE` is an Oracle-specific function: `DECODE(field, value1, result1, value2, result2, default)`. `CASE WHEN` is standard SQL and more readable for complex conditions. Either works in NetSuite formula fields. For new formulas, `CASE WHEN` is generally preferred because it is easier to read and supports range comparisons (`WHEN amount > 1000`) that DECODE cannot express cleanly.

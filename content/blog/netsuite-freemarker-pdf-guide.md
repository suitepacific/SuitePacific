---
title: "NetSuite Advanced PDF Templates: A FreeMarker Syntax Guide with Examples"
description: "How FreeMarker works inside NetSuite's Advanced PDF/HTML Template editor, the data model, the core syntax, date and number formatting, line item loops, conditionals, and working code you can copy."
date: "2026-07-18"
updated: "2026-08-14"
tags: ["Advanced PDF", "Templates", "Development"]
---

FreeMarker is an open-source Java template engine that processes a data model and a template to produce text output. In NetSuite, it generates the HTML that the PDF renderer converts into a transaction document. NetSuite's Advanced PDF/HTML Template editor uses FreeMarker, an open-source Java template language, to produce transaction documents, invoices, quotes, purchase orders, packing slips, statements. If you've opened the template editor and found a mix of HTML, CSS, and unfamiliar tags wrapped in `<#` and `${`, this guide explains what each piece does and how to adapt it to your documents.

<div style="background:#eef2fb;border:1px solid #b2c2e6;border-radius:10px;padding:1.25rem 1.5rem;margin:2rem 0;font-family:system-ui,-apple-system,sans-serif">
<p style="margin:0 0 0.5rem;font-size:0.7rem;font-weight:700;color:#4f7fff;text-transform:uppercase;letter-spacing:0.08em">Quick answer</p>
<p style="margin:0;color:#14306b;font-size:0.9rem;line-height:1.6">NetSuite Advanced PDF/HTML Templates use FreeMarker, a Java template language, to produce transaction documents including invoices, purchase orders, packing slips, and statements. When NetSuite generates a PDF, it builds an XML data model from the transaction and related records, then passes that model to the FreeMarker engine, which processes the template and produces HTML that the rendering engine converts to a PDF. The transaction is available in the template as the object called record. Line items on the transaction are a collection under record.item. FreeMarker directives use angle brackets with a hash for logic and dollar-sign curly braces for output. The most common errors in NetSuite PDF templates are incorrect field paths, missing null checks on optional fields that are blank on some transactions, and text that overflows a fixed-width column in the HTML table layout.</p>
</div>


## How it works

When NetSuite generates a PDF from an Advanced PDF template, it does two things:

1. Builds an XML data model from the transaction record and its related records, with every field value the template might need
2. Passes that XML to the FreeMarker engine, which processes the template and produces an HTML document
3. Converts the HTML to a PDF using NetSuite's built-in rendering engine

The FreeMarker template sees the transaction data as a single object called `record`. Every field on the transaction is a property of `record`. Line items (the sublist) are a collection under `record.item`. Everything you print in the template comes from navigating this structure.

To see the exact XML data model for a specific transaction, open the template editor (Customization > Forms > Advanced PDF/HTML Templates), scroll down to the "Data" section, and select a sample transaction, NetSuite shows the full XML so you can see exactly what field names to reference.

<figure style="margin:1.75rem 0">
<svg viewBox="0 0 680 108" xmlns="http://www.w3.org/2000/svg" style="width:100%;max-width:680px;display:block;font-family:system-ui,-apple-system,sans-serif">
  <defs>
    <marker id="fm-arrow" markerWidth="7" markerHeight="7" refX="5" refY="3" orient="auto"><path d="M0,0 L0,6 L7,3 z" fill="#4f6fb0"/></marker>
  </defs>
  <text x="340" y="13" text-anchor="middle" font-size="10" font-weight="700" fill="#14306b" letter-spacing="0.05em">FREEMARKER PDF RENDERING PIPELINE</text>
  <!-- Step 1: Transaction -->
  <rect x="0" y="22" width="118" height="48" rx="7" fill="#eef2fb" stroke="#4f7fff" stroke-width="1.5"/>
  <text x="59" y="43" text-anchor="middle" font-size="10" font-weight="700" fill="#14306b">Transaction</text>
  <text x="59" y="58" text-anchor="middle" font-size="8" fill="#4f6fb0">record + related</text>
  <text x="59" y="70" text-anchor="middle" font-size="8" fill="#4f6fb0">records</text>
  <!-- Arrow 1 -->
  <line x1="118" y1="46" x2="144" y2="46" stroke="#4f6fb0" stroke-width="1.5" marker-end="url(#fm-arrow)"/>
  <!-- Step 2: XML Data Model -->
  <rect x="147" y="22" width="130" height="48" rx="7" fill="#eef2fb" stroke="#4f7fff" stroke-width="1.5"/>
  <text x="212" y="43" text-anchor="middle" font-size="10" font-weight="700" fill="#14306b">XML Data</text>
  <text x="212" y="56" text-anchor="middle" font-size="10" font-weight="700" fill="#14306b">Model</text>
  <text x="212" y="70" text-anchor="middle" font-size="8" fill="#4f6fb0">record.entity etc.</text>
  <!-- Arrow 2 -->
  <line x1="277" y1="46" x2="303" y2="46" stroke="#4f6fb0" stroke-width="1.5" marker-end="url(#fm-arrow)"/>
  <!-- Step 3: FreeMarker Engine -->
  <rect x="306" y="22" width="140" height="48" rx="7" fill="#0b1f4d" stroke="#4f7fff" stroke-width="1.5"/>
  <text x="376" y="43" text-anchor="middle" font-size="10" font-weight="700" fill="#eef2fb">FreeMarker</text>
  <text x="376" y="56" text-anchor="middle" font-size="10" font-weight="700" fill="#eef2fb">Engine</text>
  <text x="376" y="70" text-anchor="middle" font-size="8" fill="#8aa2d6">template + data</text>
  <!-- Arrow 3 -->
  <line x1="446" y1="46" x2="472" y2="46" stroke="#4f6fb0" stroke-width="1.5" marker-end="url(#fm-arrow)"/>
  <!-- Step 4: HTML -->
  <rect x="475" y="22" width="90" height="48" rx="7" fill="#eef2fb" stroke="#4f7fff" stroke-width="1.5"/>
  <text x="520" y="46" text-anchor="middle" font-size="10" font-weight="700" fill="#14306b">HTML</text>
  <text x="520" y="62" text-anchor="middle" font-size="8" fill="#4f6fb0">rendered output</text>
  <!-- Arrow 4 -->
  <line x1="565" y1="46" x2="591" y2="46" stroke="#4f6fb0" stroke-width="1.5" marker-end="url(#fm-arrow)"/>
  <!-- Step 5: PDF -->
  <rect x="594" y="22" width="86" height="48" rx="7" fill="#4f7fff" stroke="#4f7fff" stroke-width="1.5"/>
  <text x="637" y="46" text-anchor="middle" font-size="10" font-weight="700" fill="#fff">PDF</text>
  <text x="637" y="62" text-anchor="middle" font-size="8" fill="#d7e0f3">NetSuite renderer</text>
  <!-- Footnote -->
  <text x="340" y="96" text-anchor="middle" font-size="8" fill="#8aa2d6">The template references data as ${record.fieldId}: field names match the XML data model, not the UI label.</text>
</svg>
<figcaption style="text-align:center;font-size:0.78rem;color:#8aa2d6;margin-top:0.4rem">FreeMarker PDF rendering pipeline in NetSuite: transaction record and related records are serialized into an XML data model, then processed by the FreeMarker template, and rendered as a PDF output.</figcaption>
</figure>

## The core FreeMarker syntax

FreeMarker has two types of constructs: expressions that output a value (`${...}`) and directives that control template logic (`<# ... >`).

### Outputting a value

```
${record.tranid}          → Invoice number (e.g., INV-2026-0042)
${record.entity}          → Customer name
${record.trandate}        → Transaction date (raw format)
${record.total}           → Total amount (raw number)
${record.memo}            → Transaction memo/note
```

The field names mirror NetSuite's internal field IDs on the transaction form. If you're not sure what to reference, download the data XML from the template editor and search for the value you want to display.

### Handling null and empty fields

FreeMarker throws an error if you reference a field that is null or missing in the data model. Use the `!` default operator to provide a fallback:

```
${record.memo!}                  → Prints empty string if memo is null
${record.memo!"No memo"}         → Prints "No memo" if memo is null
${record.custbody_ponum!"N/A"}   → Custom body field with fallback
```

This is especially important for optional fields (customer PO number, memo, secondary address line) that may be blank on many transactions.

### Formatting dates

Dates from NetSuite arrive as Java date objects. Use FreeMarker's `?string` formatter with a pattern:

```
${record.trandate?string["MMMM d, yyyy"]}    → July 18, 2026
${record.trandate?string["MM/dd/yyyy"]}       → 07/18/2026
${record.trandate?string["dd-MMM-yyyy"]}      → 18-Jul-2026
${record.duedate?string["MMMM d, yyyy"]!""}  → With null fallback
```

Common date pattern tokens: `MMMM` = full month name, `MMM` = abbreviated month, `MM` = zero-padded month number, `d` = day without leading zero, `dd` = zero-padded day, `yyyy` = four-digit year.

### Formatting numbers and currency

Numbers in the data model are plain Java numbers. Format them for display:

```
${record.total?string["0.00"]}              → 1500.00
${record.total?string["#,##0.00"]}          → 1,500.00
${record.taxrate?string["0.##"]}            → 8.5 (trims trailing zeros)
```

To display as currency with a symbol, concatenate:

```
${"$"}${record.total?string["#,##0.00"]}
```

Or use the full currency field if available:

```
${record.currencysymbol!"$"}${record.total?string["#,##0.00"]}
```

## Line items: the `<#list>` loop

The sublist of line items on a transaction is accessed as `record.item`. Loop over it with `<#list>`:

```html
<table>
  <thead>
    <tr>
      <th>Item</th>
      <th>Description</th>
      <th>Qty</th>
      <th>Rate</th>
      <th>Amount</th>
    </tr>
  </thead>
  <tbody>
    <#list record.item as line>
    <tr>
      <td>${line.item!"-"}</td>
      <td>${line.description!""}</td>
      <td>${line.quantity?string["0.##"]}</td>
      <td>${"$"}${line.rate?string["#,##0.00"]}</td>
      <td>${"$"}${line.amount?string["#,##0.00"]}</td>
    </tr>
    </#list>
  </tbody>
</table>
```

`line` is a local variable that holds each row as the loop iterates. Field names inside the loop reference line-level fields: `line.item`, `line.description`, `line.quantity`, `line.rate`, `line.amount`. Transaction-level fields (`record.entity`, `record.tranid`) are still accessible inside the loop, they're not local to it.

The most common mistake: referencing a line-level field outside the loop, or a transaction-level field incorrectly inside it. If a field silently prints blank, check which scope it belongs to.

### Skipping header-only or group-separator lines

Some transactions include non-item rows (group headers, subtotals, description-only lines). Filter them in the loop:

```html
<#list record.item as line>
  <#if line.item?has_content>
    <!-- Only render rows that have an actual item -->
    <tr>...</tr>
  </#if>
</#list>
```

`?has_content` returns true if the value is neither null nor an empty string. It's more reliable than `!= ""` for fields that might be null.

## Conditional logic with `<#if>`

```html
<#if record.custbody_showdiscount == "T">
  <p>A 10% early payment discount applies if paid within 10 days.</p>
</#if>
```

NetSuite checkbox fields come through as `"T"` (checked) or `"F"` (unchecked). Always compare as strings.

For branching logic:

```html
<#if record.entity == "Big Corp">
  <img src="${nsfont.logourl}" />
  <p>Custom content for Big Corp</p>
<#elseif record.subsidiary == "2">
  <p>UK subsidiary footer text</p>
<#else>
  <p>Default footer text</p>
</#if>
```

The pattern of one template with `<#if>` branches for different customer types, subsidiaries, or transaction types is almost always better than maintaining multiple near-identical templates. See [common PDF template mistakes](/blog/advanced-pdf-template-mistakes) for more on why duplicated templates drift over time.

### Conditional visibility based on whether a field has content

```html
<#if record.memo?has_content>
  <p><strong>Notes:</strong> ${record.memo}</p>
</#if>
```

This suppresses the entire "Notes:" section when the memo is blank, useful for any optional field that should only appear when it has a value.

## Assigning variables

Use `<#assign>` to compute or alias a value once and reuse it:

```html
<#assign subtotal = record.subtotal?number>
<#assign taxAmount = record.taxtotal?number>
<#assign discount = subtotal * 0.05>

<p>Subtotal: ${"$"}${subtotal?string["#,##0.00"]}</p>
<p>5% discount: (${"$"}${discount?string["#,##0.00"]})</p>
<p>Tax: ${"$"}${taxAmount?string["#,##0.00"]}</p>
```

`?number` converts a string to a number, necessary when you want to do arithmetic on a field that FreeMarker received as a string.

## Addressing fields

Addresses on transactions have a specific structure. The billing address is accessed via `record.billaddress` (the pre-formatted full address) or by individual components:

```
${record.billaddr1!""}
${record.billaddr2!""}
${record.billcity!""}, ${record.billstate!""} ${record.billzip!""}
${record.billcountry!""}
```

Shipping address equivalents use `ship` instead of `bill`: `record.shipaddr1`, `record.shipcity`, etc.

If the formatted address `record.billaddress` has the right layout for your document, use it directly, it handles the multi-line formatting and empty-field logic already:

```
${record.billaddress!""}
```

## Whitespace control

FreeMarker directives (`<#if>`, `<#list>`) leave blank lines in the output when their condition is false or the loop is empty. To suppress these, wrap the directive in `<#compress>` or add whitespace control markers:

```html
<#compress>
<#if record.memo?has_content>
<p>${record.memo}</p>
</#if>
</#compress>
```

`<#compress>` collapses all whitespace and blank lines within its block into single spaces, which keeps the rendered HTML clean when optional sections are suppressed.

## A working invoice template skeleton

This is a minimal but functional starting point for a custom invoice:

```html
<?xml version="1.0"?>
<!DOCTYPE pdf PUBLIC "-//big.faceless.org//report" "report-1.1.dtd">
<pdf>
<head>
<style type="text/css">
  body { font-family: Helvetica, sans-serif; font-size: 10pt; color: #333; }
  table { width: 100%; border-collapse: collapse; }
  th { background: #f5f5f5; text-align: left; padding: 6px 8px; font-size: 9pt; }
  td { padding: 5px 8px; border-bottom: 1px solid #eee; font-size: 9pt; }
  .total-row td { font-weight: bold; border-top: 2px solid #333; }
</style>
</head>
<body>

<table>
  <tr>
    <td style="width:60%">
      <strong>${companyinformation.companyname}</strong><br/>
      ${companyinformation.addr1!""}<br/>
      ${companyinformation.city!""}, ${companyinformation.state!""} ${companyinformation.zip!""}<br/>
      ${companyinformation.email!""}
    </td>
    <td style="width:40%; text-align:right">
      <strong style="font-size:18pt">INVOICE</strong><br/>
      <strong>${record.tranid}</strong><br/>
      Date: ${record.trandate?string["MMMM d, yyyy"]}<br/>
      Due: ${record.duedate?string["MMMM d, yyyy"]!""}
    </td>
  </tr>
</table>

<br/>

<table>
  <tr>
    <td><strong>Bill To:</strong><br/>${record.billaddress!""}</td>
    <#if record.shipaddress?has_content>
    <td><strong>Ship To:</strong><br/>${record.shipaddress}</td>
    </#if>
  </tr>
</table>

<br/>

<table>
  <thead>
    <tr>
      <th style="width:40%">Description</th>
      <th style="width:15%; text-align:center">Qty</th>
      <th style="width:20%; text-align:right">Unit Price</th>
      <th style="width:25%; text-align:right">Amount</th>
    </tr>
  </thead>
  <tbody>
    <#list record.item as line>
    <#if line.item?has_content || line.description?has_content>
    <tr>
      <td>
        <#if line.item?has_content><strong>${line.item}</strong><br/></#if>
        ${line.description!""}
      </td>
      <td style="text-align:center">${line.quantity?string["0.##"]}</td>
      <td style="text-align:right">${"$"}${line.rate?string["#,##0.00"]}</td>
      <td style="text-align:right">${"$"}${line.amount?string["#,##0.00"]}</td>
    </tr>
    </#if>
    </#list>
  </tbody>
  <tfoot>
    <tr><td colspan="3" style="text-align:right">Subtotal</td>
        <td style="text-align:right">${"$"}${record.subtotal?string["#,##0.00"]}</td></tr>
    <#if record.taxtotal?number gt 0>
    <tr><td colspan="3" style="text-align:right">Tax</td>
        <td style="text-align:right">${"$"}${record.taxtotal?string["#,##0.00"]}</td></tr>
    </#if>
    <tr class="total-row">
        <td colspan="3" style="text-align:right">Total Due</td>
        <td style="text-align:right">${"$"}${record.total?string["#,##0.00"]}</td>
    </tr>
  </tfoot>
</table>

<#if record.memo?has_content>
<br/>
<p><strong>Notes:</strong> ${record.memo}</p>
</#if>

</body>
</pdf>
```

## Testing and iteration

Use the Preview button in the Advanced PDF/HTML Template editor with a specific transaction to test rendering without saving. The preview updates in real time as you edit, which makes iteration fast.

For testing edge cases, deliberately pick transactions with:
- Zero line items
- Long descriptions with special characters (`&`, `<`, `>`, these need to be HTML-escaped in the data or they'll break the XML)
- Missing optional fields (no shipping address, no memo, no PO number)
- Multi-page output (many line items)

NetSuite will render `&` in a field value as `&amp;` automatically in most cases, but if you're concatenating strings inside the template, escape manually: `${"&amp;"}` or use `?html`.

## When FreeMarker isn't enough

FreeMarker templates reference fields that NetSuite includes in the transaction data model. If you need a value that isn't in that data model, a custom record field joined through several levels, a calculated aggregate from a saved search, or data from an external system, you have two options:

First, write the value to a custom field on the transaction at save time using a User Event script. The field then appears in the data model and the template can reference it normally.

Second, use a custom XML data source, which requires a SuiteScript script that builds and returns the XML the template receives. This gives full control over the data model at the cost of scripting overhead.

Both approaches are common in production templates that need data beyond what's naturally available on the transaction record. If you're running into the limits of what the default data model provides, that's work our [Advanced PDF template service](/netsuite-advanced-pdf-templates) covers regularly.

---
title: "NetSuite Advanced PDF Templates: How to Access Transaction Data in FreeMarker"
description: "How to navigate the FreeMarker data model in NetSuite Advanced PDF templates: accessing header fields, line items, addresses, entity data, and amounts, with examples for the most common patterns."
date: "2026-08-07"
tags: ["FreeMarker", "PDF Templates", "Development", "Admin"]
---

NetSuite's Advanced PDF/HTML templates use FreeMarker, a Java-based template language, to generate printed documents from transaction data. The template receives a data model containing the record and its related objects. Knowing how to navigate that data model is the difference between a template that fills in values reliably and one that produces blank fields or FreeMarker errors.

The most common point of confusion is that the available fields in a FreeMarker template are not the same as the field IDs you use in SuiteScript or saved searches. FreeMarker templates receive the data in a pre-structured model that follows NetSuite's print data format. NetSuite provides a way to view the actual XML data that your specific record type exports, which is the authoritative source for what is available in any given template.

<div style="background:#eef2fb;border:1px solid #b2c2e6;border-radius:10px;padding:1.25rem 1.5rem;margin:2rem 0;font-family:system-ui,-apple-system,sans-serif">
<p style="margin:0 0 0.5rem;font-size:0.7rem;font-weight:700;color:#4f7fff;text-transform:uppercase;letter-spacing:0.08em">Quick answer</p>
<p style="margin:0;color:#14306b;font-size:0.9rem;line-height:1.6">In NetSuite Advanced PDF/HTML templates, the current record is accessed as record in the FreeMarker context. Standard transaction fields are accessed as ${record.fieldname} where fieldname is the internal ID of the field in lowercase. Line items are accessed by iterating over the sublist: &lt;#list record.item as line&gt;${line.quantity}...&lt;/#list&gt;. The most reliable way to discover what fields are available for a specific record type is to use NetSuite's Print XML feature: open a transaction record, go to Print and select the template, then look for the option to view the underlying data structure. This shows every field path available to the template for that specific record. Custom body fields appear under their script ID (custbody_fieldname) and custom line fields appear in the line item iteration.</p>
</div>

<figure style="margin:1.75rem 0">
<svg viewBox="0 0 680 156" xmlns="http://www.w3.org/2000/svg" style="width:100%;max-width:680px;display:block;font-family:system-ui,-apple-system,sans-serif">
  <!-- Title -->
  <text x="340" y="14" text-anchor="middle" font-size="10" font-weight="700" fill="#14306b" letter-spacing="0.05em">FREEMARKER DATA MODEL: TRANSACTION STRUCTURE</text>
  <!-- record root -->
  <rect x="270" y="22" width="140" height="30" rx="7" fill="#4f7fff"/>
  <text x="340" y="41" text-anchor="middle" font-size="10" font-weight="700" fill="#fff">record</text>
  <!-- Lines from root -->
  <line x1="280" y1="52" x2="100" y2="76" stroke="#b2c2e6" stroke-width="1.2"/>
  <line x1="340" y1="52" x2="340" y2="76" stroke="#b2c2e6" stroke-width="1.2"/>
  <line x1="400" y1="52" x2="580" y2="76" stroke="#b2c2e6" stroke-width="1.2"/>
  <!-- Header fields box -->
  <rect x="20" y="76" width="160" height="50" rx="7" fill="#eef2fb" stroke="#b2c2e6" stroke-width="1.2"/>
  <text x="100" y="95" text-anchor="middle" font-size="9.5" font-weight="700" fill="#14306b">Header fields</text>
  <text x="100" y="110" text-anchor="middle" font-size="8" fill="#4f6fb0">record.tranid</text>
  <text x="100" y="122" text-anchor="middle" font-size="8" fill="#4f6fb0">record.trandate  record.entity</text>
  <!-- Entity box -->
  <rect x="255" y="76" width="170" height="50" rx="7" fill="#eef2fb" stroke="#b2c2e6" stroke-width="1.2"/>
  <text x="340" y="95" text-anchor="middle" font-size="9.5" font-weight="700" fill="#14306b">Entity / Address</text>
  <text x="340" y="110" text-anchor="middle" font-size="8" fill="#4f6fb0">record.entity.entityid</text>
  <text x="340" y="122" text-anchor="middle" font-size="8" fill="#4f6fb0">record.billingaddress</text>
  <!-- Line items box -->
  <rect x="490" y="76" width="170" height="50" rx="7" fill="#eef2fb" stroke="#b2c2e6" stroke-width="1.2"/>
  <text x="575" y="95" text-anchor="middle" font-size="9.5" font-weight="700" fill="#14306b">Line items</text>
  <text x="575" y="110" text-anchor="middle" font-size="8" fill="#4f6fb0">&lt;#list record.item as line&gt;</text>
  <text x="575" y="122" text-anchor="middle" font-size="8" fill="#4f6fb0">line.item  line.quantity  line.rate</text>
  <!-- Footer note -->
  <text x="340" y="148" text-anchor="middle" font-size="8" fill="#8aa2d6">Use Print XML on a live transaction to see the exact field paths available for your record type and account configuration.</text>
</svg>
<figcaption style="text-align:center;font-size:0.78rem;color:#8aa2d6;margin-top:0.4rem">FreeMarker data model structure for transaction templates: the record object contains header fields, entity and address data, and the item sublist for line iteration.</figcaption>
</figure>

## How do you find what fields are available for a specific record type?

Before editing a template, view the actual data structure that NetSuite will pass to it. Open a representative transaction of the type you are templating (an Invoice, Sales Order, Purchase Order, etc.), then use the Print or Email action to preview the document. In some template configurations, NetSuite provides an option to view the underlying XML data that gets passed to the FreeMarker template.

Another approach: in the Advanced PDF/HTML Template editor at Customization > Forms > PDF/HTML Templates, NetSuite provides a field picker that shows the available data elements for the selected template type. This is the most reliable way to see what is available without guessing field names.

The key point is that the field names in a FreeMarker template are not always the same as the script IDs you use in SuiteScript. The print data model has its own naming conventions, and for custom fields these conventions can differ from what you might expect. Checking the actual data structure before writing the template saves significant troubleshooting time.

## How do you access standard transaction header fields?

Header fields are accessed directly on the record object:

```freemarker
${record.tranid}
${record.trandate?string("MM/dd/yyyy")}
${record.memo!}
```

`record.tranid` is the document number (invoice number, order number, etc.). `record.trandate` is a date object; append `?string("format")` to output it in a specific format. The `!` after a field reference returns an empty string if the field is null, rather than throwing a FreeMarker error.

For custom body fields, use the field's script ID in lowercase:

```freemarker
${record.custbody_po_number!}
${record.custbody_delivery_notes!}
```

Always add `!` or `!"default text"` to optional fields to prevent the template from failing when a field has no value. A template that works on most records but fails on records missing an optional field is one of the most common Advanced PDF bugs.

## How do you access the customer or vendor (entity)?

The entity associated with a transaction is accessed through `record.entity`:

```freemarker
${record.entity.entityid}
${record.entity.companyname!}
${record.entity.phone!}
${record.entity.email!}
```

`entityid` is the customer or vendor ID (the external-facing identifier). `companyname` is the company name for business entities. For individual contacts, `firstname` and `lastname` are available instead.

Billing and shipping addresses are separate objects:

```freemarker
${record.billingaddress.addr1!}
${record.billingaddress.city!}
${record.billingaddress.state!}
${record.billingaddress.zip!}
${record.billingaddress.country!}
```

```freemarker
${record.shippingaddress.addr1!}
```

Address fields are optional fields on the entity record, so they may be blank for some customers. The `!` suffix is essential here.

## How do you iterate over line items?

Line items are accessed through a list directive. For most transaction types, the line item sublist is named `item`:

```freemarker
<#list record.item as line>
  <tr>
    <td>${line.item!}</td>
    <td>${line.description!}</td>
    <td>${line.quantity}</td>
    <td>${line.rate?string.currency}</td>
    <td>${line.amount?string.currency}</td>
  </tr>
</#list>
```

`line.item` is the item name. `line.quantity` is the quantity. `line.rate` and `line.amount` are numeric values; append `?string.currency` to format them as currency amounts using the transaction's currency.

For custom line fields:

```freemarker
${line.custcol_serial_number!}
${line.custcol_delivery_date!}
```

Custom column fields use their script ID prefixed with `custcol_`.

To skip lines that have no item (such as subtotal lines or header lines that some templates insert):

```freemarker
<#list record.item as line>
  <#if line.item?has_content>
    <tr>...</tr>
  </#if>
</#list>
```

`?has_content` returns true if the value is not null and not an empty string. This is the FreeMarker equivalent of a null-and-empty check.

## How do you format currency and number amounts?

FreeMarker's built-in number formatting:

```freemarker
${record.total?string.currency}      <#-- formatted as currency: $1,234.56 -->
${record.subtotal?string.number}     <#-- formatted as number with separators -->
${record.discounttotal?string["0.00"]} <#-- fixed 2 decimal places -->
```

The `?string.currency` format uses the locale settings configured in NetSuite. For multi-currency accounts where the template should reflect the transaction currency rather than the base currency, verify which amount fields reflect the transaction currency amount vs. the base currency amount. The print data model typically provides both.

Conditional display of an amount (only show discount row if there is a discount):

```freemarker
<#if (record.discounttotal?? && record.discounttotal < 0)>
  <tr>
    <td>Discount</td>
    <td>${record.discounttotal?string.currency}</td>
  </tr>
</#if>
```

`??` checks that the field is not null before comparing it to zero.

## How do you conditionally show sections?

Conditional sections use FreeMarker's `#if` directive:

```freemarker
<#if record.memo?has_content>
  <p>Notes: ${record.memo}</p>
</#if>
```

```freemarker
<#if record.custbody_show_signature! == "T">
  <div class="signature-block">Authorized signature: ___________</div>
</#if>
```

Custom checkbox fields return `"T"` for checked and `"F"` for unchecked in the print data model. Compare to the string "T" rather than the boolean true.

For showing a shipping address section only when it differs from the billing address:

```freemarker
<#if record.shippingaddress.addr1! != record.billingaddress.addr1!>
  <div class="ship-to">
    Ship to: ${record.shippingaddress.addr1!}, ${record.shippingaddress.city!}
  </div>
</#if>
```

---

Advanced PDF template development is a specialized skill that sits at the intersection of FreeMarker syntax, NetSuite's print data model, and CSS layout for printed output. Our [NetSuite SuiteScript and customization service](/netsuite-suitescript-development) covers template development alongside SuiteScript work. For background on how the FreeMarker rendering pipeline works end to end, see [FreeMarker PDF Guide](/blog/netsuite-freemarker-pdf-guide).

## Frequently asked questions

**Q: Why is a field showing as blank in my template even though the record has a value?**
A: The most common causes are using the wrong field name (the print data model name differs from the script ID), a field that is null and not handled with `!`, or accessing a subfield that requires navigating through a related object (e.g., `record.entity.companyname` instead of `record.companyname`). Check the actual data structure using the template data viewer in NetSuite's template editor.

**Q: How do you handle multi-currency transactions in templates?**
A: The print data model for transactions typically includes both the transaction currency amount and the functional currency equivalent. The field names vary by record type. Review the data model for your specific transaction type to identify which fields represent the transaction currency amounts, and use those consistently throughout the template.

**Q: Can FreeMarker templates call SuiteScript functions?**
A: No. FreeMarker templates operate on the data model passed to them at render time. They cannot invoke SuiteScript or make calls to the NetSuite API. All data that the template needs must be present in the data model. If a value is not available in the standard print data model, it needs to be added as a custom field on the record so it appears in the model.

**Q: What is the difference between Advanced PDF templates and standard NetSuite templates?**
A: Standard NetSuite templates use a drag-and-drop form builder with limited layout control. Advanced PDF/HTML templates give you full control over the document layout using HTML, CSS, and FreeMarker for dynamic content. Advanced templates are required for any document that needs precise layout, conditional sections, or custom line item formatting that the standard builder cannot produce.

**Q: How do you debug a FreeMarker error in a NetSuite template?**
A: NetSuite shows the FreeMarker error message in the print preview when a template fails to render. The error identifies the line in the template where the failure occurred. Common errors are "null pointer" (a field reference without `!` encountered a null value) and "undefined variable" (a field name that does not exist in the data model). Start by checking the field name in the data model viewer and adding `!` to any field reference that might be null.

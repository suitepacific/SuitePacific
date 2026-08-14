---
title: "NetSuite 2026.2 Adds Currency Context to Currency Custom Fields"
description: "NetSuite 2026.2 introduces a new Currency Context option for currency custom fields. It gives administrators more control over how monetary values in custom fields are interpreted across currencies. Here is where to find it."
date: "2026-07-21"
updated: "2026-08-07"
tags: ["Administration", "Customization", "NetSuite Tips"]
---

Currency Context is a new setting in NetSuite 2026.2 for custom currency-type fields that controls whether the field displays amounts in the subsidiary's base currency or the transaction's transaction currency. Before this setting, custom currency fields did not have a predictable way to specify which currency context should apply.

If your NetSuite account uses custom fields that store currency amounts, 2026.2 adds a new option called **Currency Context** to the field definition.

<div style="background:#eef2fb;border:1px solid #d7e0f3;border-radius:10px;overflow:hidden;margin:2rem 0;font-family:system-ui,-apple-system,sans-serif">
<div style="background:#0b1f4d;padding:0.7rem 1.25rem;display:flex;align-items:center;gap:8px">
<span style="display:inline-block;width:8px;height:8px;border-radius:50%;background:#4f7fff"></span><span style="font-size:0.68rem;font-weight:700;color:#eef2fb;letter-spacing:0.08em">CURRENCY CONTEXT: NEW FIELD SETTING IN 2026.2</span>
</div>
<div style="display:flex;align-items:flex-start;gap:0.75rem;padding:0.65rem 1.25rem;border-bottom:1px solid #d7e0f3">
<div style="flex:1">
<span style="font-size:0.8rem;font-weight:600;color:#14306b;display:block">What it controls</span>
<span style="font-size:0.76rem;color:#4f6fb0;line-height:1.4;display:block;margin-top:2px">How NetSuite interprets the stored monetary value when a transaction or record is operating in a different currency than the one the value was entered in.</span>
</div>
</div>
<div style="display:flex;align-items:flex-start;gap:0.75rem;padding:0.65rem 1.25rem;border-bottom:1px solid #d7e0f3">
<div style="flex:1">
<span style="font-size:0.8rem;font-weight:600;color:#14306b;display:block">Where to find it</span>
<span style="font-size:0.76rem;color:#4f6fb0;display:block;margin-top:2px">Customization > Lists, Records, &amp; Fields: on currency-type custom fields (Transaction Body, Column, Entity fields)</span>
</div>
</div>
<div style="display:flex;align-items:flex-start;gap:0.75rem;padding:0.65rem 1.25rem">
<div style="flex:1">
<span style="font-size:0.8rem;font-weight:600;color:#14306b;display:block">Who needs to check</span>
<span style="font-size:0.76rem;color:#4f6fb0;line-height:1.4;display:block;margin-top:2px">Multi-currency accounts with currency custom fields. Review existing fields to confirm currency context is set as expected for each one.</span>
</div>
</div>
</div>

<div style="background:#eef2fb;border:1px solid #b2c2e6;border-radius:10px;padding:1.25rem 1.5rem;margin:2rem 0;font-family:system-ui,-apple-system,sans-serif">
<p style="margin:0 0 0.5rem;font-size:0.7rem;font-weight:700;color:#4f7fff;text-transform:uppercase;letter-spacing:0.08em">Quick answer</p>
<p style="margin:0;color:#14306b;font-size:0.9rem;line-height:1.6">Currency Context is a new field-level setting added in NetSuite 2026.2 for currency-type custom fields. It controls how the stored monetary value is interpreted when a transaction or record operates in a different currency than the one the value was entered in. The setting appears on Transaction Body Fields, Transaction Column Fields, and Entity Fields that store currency amounts. To configure it, navigate to Customization &gt; Lists, Records, and Fields, open a currency custom field, and locate the Currency Context option in the field definition. For new currency custom fields, Currency Context is available during the initial setup. The setting is most relevant for multi-currency accounts where custom currency fields are used on transactions that may span different currencies. Administrators with existing currency custom fields should review each one to confirm the currency context is configured as expected for that field's purpose in the account.</p>
</div>

## What currency context controls

A currency custom field stores a monetary value. In a multi-currency NetSuite account, that value needs a context: which currency does it represent, and how should it convert when displayed or used in transactions involving a different currency?

Currency context is the setting that answers this question. It tells NetSuite how to treat the stored value when the transaction or record is operating in a different currency than the one the value was entered in.

## What is new in 2026.2

NetSuite 2026.2 adds a new Currency Context option to currency custom fields. This gives administrators more explicit control over currency behavior at the field level, rather than relying on account-wide or transaction-level defaults.

## Where to find it

Currency Context is a field-level setting. To access it:

Go to **Customization > Lists, Records, & Fields** and select the type of field you want to configure (Transaction Body Field, Transaction Column Field, Entity Field, etc.).

Open the currency custom field you want to update. The Currency Context option is in the field definition.

When creating a new currency custom field, the Currency Context option is available during setup.

## Who should review this

- Administrators who manage custom fields that store currency amounts on transactions, records, or entities
- Accounts with multi-currency setups where custom currency fields need consistent behavior across different transaction currencies
- Developers building customizations that involve currency amounts on custom records or transaction lines

If your account uses single-currency only, or if your existing currency custom fields behave correctly already, this update may have no immediate impact. But it is worth reviewing if you have noticed inconsistent currency behavior on custom fields in a multi-currency environment.

## How currency context affects multi-currency transactions

When a NetSuite account operates across multiple currencies, the same custom field may store values entered in euros on one transaction and dollars on another. Without clear context, NetSuite has to make assumptions about how to interpret, display, or aggregate those values. Currency Context makes that behavior explicit at the field level.

This matters most in scenarios such as: a currency custom field on a vendor record that stores an amount in the vendor's native currency; a transaction body field that holds a pre-negotiated price that should not be converted; or a custom field used in reports that aggregates monetary values across transactions in different currencies.

Before 2026.2, currency fields relied on account-level or transaction-level behavior for these interpretations. The new field-level setting gives administrators the ability to define this behavior per field, which reduces inconsistencies when the same field is used in different multi-currency contexts.

## Frequently asked questions

**Q: Which field types support Currency Context?**
A: Currency Context is available on currency-type custom fields including Transaction Body Fields, Transaction Column Fields, and Entity Fields.

**Q: Does Currency Context affect existing records that already have values stored in a currency custom field?**
A: Field definition changes in NetSuite typically affect how values are displayed and used going forward. Review any reports or searches that use the affected field after changing Currency Context to confirm the output matches expectations.

**Q: Do single-currency accounts need to review this setting?**
A: Not in most cases. Currency Context is primarily relevant for multi-currency accounts where the same field is used on transactions in different currencies.

**Q: Where exactly is the Currency Context option in the field editor?**
A: It is in the field definition when editing a currency-type custom field under Customization &gt; Lists, Records, and Fields.

**Q: Is Currency Context available on all subtypes of currency custom field?**
A: NetSuite 2026.2 added it to Transaction Body Fields, Transaction Column Fields, and Entity Fields. Check the field editor for the specific field type you are working with to confirm the setting is available.

**Q: What is the best way to audit existing currency custom fields in an account?**
A: Open each currency-type custom field under Customization &gt; Lists, Records, and Fields and review the Currency Context setting. Accounts with large numbers of custom fields may want to prioritize fields that appear on transaction sublists or entity records used in multi-currency transactions.

For step-by-step instructions on configuring the Currency Context setting on a custom field, see [How to Set Currency Context on NetSuite Currency Custom Fields](/resources/netsuite-currency-context-custom-fields).

For help auditing or configuring custom fields in your NetSuite account, see SuitePacific's [NetSuite administrator support service](/netsuite-administrator-support).
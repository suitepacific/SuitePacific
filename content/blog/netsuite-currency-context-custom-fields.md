---
title: "NetSuite 2026.2 Adds Currency Context to Currency Custom Fields"
description: "NetSuite 2026.2 introduces a new Currency Context option for currency custom fields. It gives administrators more control over how monetary values in custom fields are interpreted across currencies. Here is where to find it."
date: "2026-07-21"
tags: ["Administration", "Customization", "NetSuite Tips"]
---

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

For step-by-step instructions on configuring the Currency Context setting on a custom field, see [How to Set Currency Context on NetSuite Currency Custom Fields](/resources/netsuite-currency-context-custom-fields).

---
title: "How to Set Currency Context on NetSuite Currency Custom Fields"
description: "NetSuite 2026.2 adds a Currency Context option to currency custom fields. Here is how to find the setting and what it controls for custom fields that store monetary amounts."
category: "Administration"
tags: ["Administration", "Customization", "NetSuite Tips"]
publishedAt: "2026-07-21"
linkedinDay: 33
---

## What Currency Context controls

Currency custom fields store monetary amounts. In a multi-currency NetSuite account, a stored amount needs context: which currency does it represent, and how should NetSuite handle it when the record or transaction operates in a different currency?

Currency Context is a field-level setting that controls this behavior. NetSuite 2026.2 adds a new Currency Context option to give administrators more explicit control at the individual field level.

<div style="background:#eef2fb;border:1px solid #d7e0f3;border-radius:10px;overflow:hidden;margin:2rem 0;font-family:system-ui,-apple-system,sans-serif">
<div style="background:#0b1f4d;padding:0.7rem 1.25rem;display:flex;align-items:center;gap:8px">
<span style="display:inline-block;width:8px;height:8px;border-radius:50%;background:#4f7fff"></span><span style="font-size:0.68rem;font-weight:700;color:#eef2fb;letter-spacing:0.08em">CURRENCY CONTEXT — NEW FIELD SETTING IN 2026.2</span>
</div>
<div style="display:flex;align-items:flex-start;gap:0.75rem;padding:0.65rem 1.25rem;border-bottom:1px solid #d7e0f3">
<div style="flex:1">
<span style="font-size:0.8rem;font-weight:600;color:#14306b;display:block">What it controls</span>
<span style="font-size:0.76rem;color:#4f6fb0;line-height:1.4;display:block;margin-top:2px">How NetSuite interprets a custom field's stored monetary value when the record operates in a different currency than the one the value was entered in.</span>
</div>
</div>
<div style="display:flex;align-items:flex-start;gap:0.75rem;padding:0.65rem 1.25rem;border-bottom:1px solid #d7e0f3">
<div style="flex:1">
<span style="font-size:0.8rem;font-weight:600;color:#14306b;display:block">Where to find it</span>
<span style="font-size:0.76rem;color:#4f6fb0;display:block;margin-top:2px">Customization > Lists, Records, &amp; Fields — on any currency-type custom field (Transaction Body Field, Column Field, Entity Field, etc.)</span>
</div>
</div>
<div style="display:flex;align-items:flex-start;gap:0.75rem;padding:0.65rem 1.25rem">
<div style="flex:1">
<span style="font-size:0.8rem;font-weight:600;color:#14306b;display:block">Who should check</span>
<span style="font-size:0.76rem;color:#4f6fb0;line-height:1.4;display:block;margin-top:2px">Multi-currency accounts with custom fields that store monetary amounts. Review each currency custom field to confirm the Currency Context is set as intended.</span>
</div>
</div>
</div>

## Step 1: Navigate to the field type

Go to **Customization > Lists, Records, & Fields**.

Select the field type that contains the currency custom field you want to configure. Common types include:

- Transaction Body Field
- Transaction Column Field
- Entity Field
- Item Field
- Custom Record Field

## Step 2: Open the currency custom field

Find the currency custom field you want to update and click to open it.

If you are creating a new currency custom field, select **Currency** as the field type during setup.

## Step 3: Find the Currency Context setting

In the field definition, locate the **Currency Context** option. This is the new setting added in 2026.2.

Review the available options and select the one that matches how this field's value should be treated in multi-currency contexts.

## Step 4: Save and test

Save the field definition.

Test by viewing or editing a record that uses this field in a transaction or context involving a different currency than the one the field value was entered in. Confirm the value displays and converts as expected.

## Who should review this

- Administrators who manage currency custom fields on transactions, records, or entities in a multi-currency account
- Developers who have built customizations involving monetary amounts on custom records or transaction lines
- Accounts that have noticed inconsistent currency behavior on custom fields when switching between currencies

If your account uses a single currency, or if existing currency custom fields behave correctly, this setting has no immediate impact on your setup.

For background on this change and what currency context means for custom fields, see [NetSuite 2026.2 Adds Currency Context to Currency Custom Fields](/blog/netsuite-currency-context-custom-fields).

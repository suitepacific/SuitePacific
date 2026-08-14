---
title: "NetSuite Bill Capture Preferences Changed in 2026.2: What Blank Values Now Mean"
description: "NetSuite 2026.2 changed how Bill Capture handles blank fields. A blank Save Tax As now maps to No Tax, and a blank Save Shipping Cost As maps to No Shipping Cost. Here is what changed and where to check your settings."
date: "2026-07-21"
updated: "2026-08-05"
tags: ["Administration", "Accounting", "AP"]
---

NetSuite Bill Capture is the platform's AI-powered document processing feature that automatically extracts vendor bill data from uploaded PDF files and populates vendor bill records, reducing manual data entry for accounts payable teams. Bill Capture preferences control how the extracted data is applied and how the resulting bill records are created.

If your NetSuite account uses Bill Capture to process vendor bills, two preference fields changed behavior in 2026.2. Previously, leaving them blank had an ambiguous outcome. Now those blank values map to explicit options.

<div style="background:#fefce8;border:1px solid #fde68a;border-radius:10px;overflow:hidden;margin:2rem 0;font-family:system-ui,-apple-system,sans-serif">
<div style="background:#78350f;padding:0.7rem 1.25rem;display:flex;align-items:center;gap:8px">
<span style="display:inline-block;width:8px;height:8px;border-radius:50%;background:#fbbf24"></span><span style="font-size:0.68rem;font-weight:700;color:#fef9c3;letter-spacing:0.08em">BILL CAPTURE PREFERENCES: BEHAVIOR CHANGE IN 2026.2</span>
</div>
<div style="display:flex;align-items:flex-start;gap:0.75rem;padding:0.65rem 1.25rem;border-bottom:1px solid #fde68a">
<div style="flex:1">
<span style="font-size:0.8rem;font-weight:600;color:#713f12;display:block">Save Tax As: blank value</span>
<div style="display:flex;gap:1.5rem;margin-top:4px">
<span style="font-size:0.76rem;color:#92400e"><strong>Before 2026.2:</strong> undefined behavior</span>
<span style="font-size:0.76rem;color:#14532d"><strong>After 2026.2:</strong> maps to <strong>No Tax</strong></span>
</div>
</div>
</div>
<div style="display:flex;align-items:flex-start;gap:0.75rem;padding:0.65rem 1.25rem">
<div style="flex:1">
<span style="font-size:0.8rem;font-weight:600;color:#713f12;display:block">Save Shipping Cost As: blank value</span>
<div style="display:flex;gap:1.5rem;margin-top:4px">
<span style="font-size:0.76rem;color:#92400e"><strong>Before 2026.2:</strong> undefined behavior</span>
<span style="font-size:0.76rem;color:#14532d"><strong>After 2026.2:</strong> maps to <strong>No Shipping Cost</strong></span>
</div>
</div>
</div>
<div style="padding:0.65rem 1.25rem;background:#fffbeb;border-top:1px solid #fde68a;font-size:0.78rem;color:#713f12">
Action required: check your Bill Capture Preferences at Setup > Accounting > Bill Capture Preferences. If either field is blank and you expect tax or shipping to be captured, set the value explicitly.
</div>
</div>

<div style="background:#eef2fb;border:1px solid #b2c2e6;border-radius:10px;padding:1.25rem 1.5rem;margin:2rem 0;font-family:system-ui,-apple-system,sans-serif">
<p style="margin:0 0 0.5rem;font-size:0.7rem;font-weight:700;color:#4f7fff;text-transform:uppercase;letter-spacing:0.08em">Quick answer</p>
<p style="margin:0;color:#14306b;font-size:0.9rem;line-height:1.6">Two Bill Capture preference fields changed behavior in NetSuite 2026.2. A blank Save Tax As field now explicitly maps to No Tax, and a blank Save Shipping Cost As field now explicitly maps to No Shipping Cost. Previously, a blank value produced undefined behavior. Bills captured after the 2026.2 upgrade with these fields blank will have their tax and shipping cost data discarded. To review your settings, go to Setup &gt; Accounting &gt; Bill Capture Preferences and check both fields. If either is blank and you expect captured tax or shipping amounts to appear on vendor bills, set an explicit value now. The 2026.2 release also introduces new gross and net options for these preferences, providing more control over whether captured amounts are treated as tax-inclusive or tax-exclusive when the bill is saved in NetSuite.</p>
</div>

## What changed

NetSuite Bill Capture uses two preferences that control how captured bill data is saved:

**Save Tax As:** controls what NetSuite does with tax amounts detected on a captured bill.

**Save Shipping Cost As:** controls what NetSuite does with shipping costs detected on a captured bill.

Before 2026.2, if either of these was left blank in your Bill Capture Preferences, the behavior was undefined or dependent on other settings.

From 2026.2:

- A blank **Save Tax As** now explicitly maps to **No Tax**
- A blank **Save Shipping Cost As** now explicitly maps to **No Shipping Cost**

This means bills captured with a blank setting will have their tax or shipping cost discarded rather than processed in an unspecified way.

## Where to check your settings

Go to **Setup > Accounting > Bill Capture Preferences**.

Review both the **Save Tax As** and **Save Shipping Cost As** fields. If either is currently blank and you expected captured tax or shipping amounts to flow through to the bill, you need to set them explicitly now.

## New gross and net options

2026.2 also adds new gross and net options to Bill Capture. These give you more control over whether captured amounts are treated as inclusive or exclusive of tax when the bill is saved. Review these options in the same Bill Capture Preferences page alongside the tax and shipping fields.

## Who needs to act

If your account uses Bill Capture and either Save Tax As or Save Shipping Cost As is blank, the 2026.2 change affects you. Bills captured after the upgrade will have those amounts treated as No Tax or No Shipping Cost respectively.

Check the settings now and set them to the correct explicit option if you want captured tax or shipping data to flow through to your bills.

For a step-by-step guide to reviewing and updating these settings, see [How to Review Your NetSuite Bill Capture Preferences After the 2026.2 Update](/resources/netsuite-bill-capture-preferences).

## What gross and net options mean for captured amounts

Along with the blank value change, NetSuite 2026.2 adds new gross and net options to Bill Capture Preferences.

**Gross amounts** include tax as part of the total. If a captured bill shows a line amount that already includes tax, treating it as gross means NetSuite backs the tax out of that total rather than adding tax on top.

**Net amounts** exclude tax. If a captured bill shows line amounts as pre-tax figures, treating them as net means NetSuite applies the appropriate tax rate on top of the captured amount.

The correct choice depends on how your vendors present amounts on their bills and how your tax setup is configured. Bills from vendors in jurisdictions that quote prices inclusive of tax typically map to a gross treatment. Bills quoting pre-tax amounts map to net. Review these options in Bill Capture Preferences alongside the blank value changes.

## Frequently asked questions

**Q: Does the blank value change affect bills that were already captured before the 2026.2 upgrade?**
A: No. Bills already captured and saved before the upgrade are not retroactively affected. The behavior change applies to bills captured after the account is on 2026.2.

**Q: What is Bill Capture in NetSuite?**
A: Bill Capture is a NetSuite feature that uses OCR and AI extraction to read vendor bill documents and populate NetSuite vendor bill records automatically, reducing manual data entry.

**Q: If Save Tax As was blank before 2026.2, what was happening to captured tax amounts?**
A: The behavior was undefined before 2026.2, meaning results could vary. From 2026.2, the behavior is explicit: a blank value equals No Tax.

**Q: Does this preference apply per subsidiary in a OneWorld account?**
A: Check the Bill Capture Preferences screen in your account for any subsidiary-specific options. OneWorld accounts may have configuration available at the subsidiary level.

**Q: How do I know whether to use gross or net for captured amounts?**
A: It depends on how your vendors quote amounts on their invoices. If line amounts on captured bills already include tax, use gross. If they are pre-tax base amounts, use net. When in doubt, consult your tax advisor for the correct treatment in your jurisdiction.

**Q: Will this change affect the automatic matching between captured bills and purchase orders?**
A: The matching logic in Bill Capture is separate from how tax and shipping amounts are saved. Tax and shipping preference changes affect how those amounts flow to the bill record, not whether the bill matches a purchase order.

If you need help reviewing your Bill Capture configuration or other account settings after 2026.2, [SuitePacific's post-go-live support](/netsuite-post-go-live-support) covers release review and ongoing account maintenance.

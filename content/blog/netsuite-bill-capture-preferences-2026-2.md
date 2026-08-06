---
title: "NetSuite Bill Capture Preferences Changed in 2026.2: What Blank Values Now Mean"
description: "NetSuite 2026.2 changed how Bill Capture handles blank fields. A blank Save Tax As now maps to No Tax, and a blank Save Shipping Cost As maps to No Shipping Cost. Here is what changed and where to check your settings."
date: "2026-07-21"
updated: "2026-08-05"
tags: ["Administration", "Accounting", "AP"]
---

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

If you need help reviewing your Bill Capture configuration or other account settings after 2026.2, [SuitePacific's post-go-live support](/netsuite-post-go-live-support) covers release review and ongoing account maintenance.

---
title: "NetSuite Bill Capture Preferences Changed in 2026.2: What Blank Values Now Mean"
description: "NetSuite 2026.2 changed how Bill Capture handles blank fields. A blank Save Tax As now maps to No Tax, and a blank Save Shipping Cost As maps to No Shipping Cost. Here is what changed and where to check your settings."
date: "2026-07-21"
tags: ["Administration", "Accounting", "AP"]
---

If your NetSuite account uses Bill Capture to process vendor bills, two preference fields changed behavior in 2026.2. Previously, leaving them blank had an ambiguous outcome. Now those blank values map to explicit options.

## What changed

NetSuite Bill Capture uses two preferences that control how captured bill data is saved:

**Save Tax As** — controls what NetSuite does with tax amounts detected on a captured bill.

**Save Shipping Cost As** — controls what NetSuite does with shipping costs detected on a captured bill.

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

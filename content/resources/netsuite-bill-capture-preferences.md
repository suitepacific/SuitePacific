---
title: "How to Review Your NetSuite Bill Capture Preferences After the 2026.2 Update"
description: "NetSuite 2026.2 changed how blank Bill Capture preference fields behave. A blank Save Tax As now maps to No Tax, and a blank Save Shipping Cost As maps to No Shipping Cost. Here is how to check and update your settings."
category: "Administration"
tags: ["Administration", "Accounting", "AP"]
publishedAt: "2026-07-21"
linkedinDay: 30
---

## What changed in 2026.2

Two fields in Bill Capture Preferences now have explicit behavior when left blank:

- **Save Tax As** blank → maps to **No Tax**
- **Save Shipping Cost As** blank → maps to **No Shipping Cost**

Before 2026.2, leaving these fields blank produced undefined behavior. After the upgrade, blank means the amount is discarded. If your account has either field blank and you expected captured tax or shipping amounts to flow through to saved bills, you need to set them explicitly.

## Step 1 — Go to Bill Capture Preferences

Navigate to **Setup > Accounting > Bill Capture Preferences**.

## Step 2 — Check the Save Tax As field

Find the **Save Tax As** field. If it is blank, captured tax amounts will now be treated as No Tax when bills are saved. Set this field to the tax code or tax treatment your account uses for captured vendor bills if you want tax amounts to be preserved.

## Step 3 — Check the Save Shipping Cost As field

Find the **Save Shipping Cost As** field. If it is blank, captured shipping costs will now be treated as No Shipping Cost when bills are saved. Set this field to the correct cost account or item if you want shipping amounts to carry through to saved bills.

## Step 4 — Review the new gross and net options

2026.2 also adds gross and net options on the Bill Capture Preferences page. These control whether captured amounts are treated as tax-inclusive (gross) or tax-exclusive (net) when the bill is saved.

Review these options and confirm they match how your vendors present amounts on their bills. If your vendors show tax-inclusive totals, set the preference to gross. If they show amounts before tax, use net.

## Step 5 — Save and test with a captured bill

After updating your preferences, save the changes and run a test capture on a vendor bill that includes both tax and shipping amounts. Confirm the saved bill reflects the tax and shipping correctly before processing live bills.

## Who needs to do this

Any NetSuite administrator responsible for Bill Capture whose account:

- Has Save Tax As left blank in Bill Capture Preferences
- Has Save Shipping Cost As left blank in Bill Capture Preferences
- Processes vendor bills with tax or shipping amounts via Bill Capture

If both fields were already set explicitly before 2026.2, the change does not affect your account and no action is needed.

For background on this change and why it was made, see [NetSuite Bill Capture Preferences Changed in 2026.2: What Blank Values Now Mean](/blog/netsuite-bill-capture-preferences-2026-2).

---
title: "How to Enable Tax on Term Discounts in NetSuite SuiteTax"
description: "NetSuite 2026.2 adds support for tax adjustments on term discounts in SuiteTax. Two settings are required: one in Accounting Preferences and one at the nexus level. Here are the steps."
category: "Administration"
tags: ["Administration", "Accounting", "SuiteTax"]
publishedAt: "2026-07-21"
linkedinDay: 31
---

## What this enables

When a vendor gives you a term discount (for example, 2% off if you pay within 10 days) and you take that discount, the amount you actually paid is less than the invoice total. In most tax jurisdictions, the taxable base is the amount paid, not the gross invoice amount.

NetSuite 2026.2 adds two settings that work together to create a tax adjustment when a term discount is applied on a purchase transaction in SuiteTax. Both settings must be enabled for the adjustment to work.

## Step 1: Enable the accounting preference

Go to **Setup > Accounting > Accounting Preferences**.

Find the setting: **Create Adjustment Transactions for Term Discounts**.

Enable it and save.

This tells NetSuite to generate an adjustment transaction whenever a term discount is applied on a purchase. Without this, no adjustment is created regardless of the nexus setting.

## Step 2: Enable the nexus-level setting

Navigate to your nexus configuration. In NetSuite, nexuses are managed at **Setup > Tax > Nexuses** (or through your SuiteTax setup area, depending on your account configuration).

Open the nexus where you want this to apply.

Find the setting: **Include Tax When Calculating Term Discount**.

Enable it and save.

Repeat this for each nexus where you want term discount tax adjustments to apply. Nexuses where this is not enabled will not generate tax adjustments even when the accounting preference is active.

## Step 3: Test with a purchase transaction

Create a vendor bill or purchase order with payment terms that include a discount, for example "2/10 Net 30." Apply a payment that takes the term discount.

Confirm that NetSuite generates an adjustment transaction to account for the tax difference between the gross invoice amount and the discounted amount paid.

Review the adjustment transaction to confirm the tax amounts are correct for your nexus configuration.

## What to check if it is not working

If no adjustment transaction is created after following these steps:

- Confirm both settings are enabled, not just one
- Confirm the transaction is a purchase transaction (this feature applies to purchases, not sales)
- Confirm the payment terms on the vendor bill include a discount percentage
- Confirm the nexus on the transaction matches the nexus where you enabled the setting

## Who this applies to

- Accounts using SuiteTax (not the legacy NetSuite tax engine)
- Businesses that receive invoices with early payment discount terms
- Finance teams in tax jurisdictions where the discount reduces the taxable base

For background on why this setting was introduced and how term discount taxation works, see [NetSuite SuiteTax Now Handles Tax on Term Discounts: How to Enable It](/blog/netsuite-suitetax-term-discounts).

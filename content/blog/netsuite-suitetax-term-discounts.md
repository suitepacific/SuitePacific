---
title: "NetSuite SuiteTax Now Handles Tax on Term Discounts: How to Enable It"
description: "NetSuite 2026.2 adds support for tax adjustments on term discounts in SuiteTax. Two settings control this: one in Accounting Preferences and one at the nexus level. Here is what they do and how to turn them on."
date: "2026-07-21"
tags: ["Accounting", "Administration", "SuiteTax"]
---

Term discounts are a standard arrangement in B2B purchasing. A vendor offers a small discount, often 1 or 2 percent, if you pay the invoice within a short window, typically 10 days. The payment terms are written as something like "2/10 net 30": 2% discount if paid within 10 days, full amount due within 30.

The tax question with term discounts is: if you take the discount, the amount you actually paid is less than the invoice total. Should the tax be recalculated on the lower amount?

In most tax jurisdictions, yes. The taxable base is what was actually paid, not the gross invoice amount. But in NetSuite SuiteTax, handling this correctly has historically required manual intervention or workarounds. The tax was calculated on the full invoice amount and did not adjust when a term discount was applied.

NetSuite 2026.2 adds a formal mechanism for this.

## What the new settings do

Two settings work together to enable tax adjustments on term discounts:

**Setting 1: Create Adjustment Transactions for Term Discounts**

This is an accounting preference that tells NetSuite to generate an adjustment transaction when a term discount is applied on a purchase. Without this enabled, no adjustment entry is created when you take a discount.

**Setting 2: Include Tax When Calculating Term Discount**

This is a nexus-level setting that tells NetSuite to account for tax when calculating the term discount adjustment for that nexus. It controls whether the tax portion of the invoice is included in the discount calculation.

Both settings need to be enabled for the full behavior to work. Enabling only one produces incomplete results.

## Where to enable them

**Setting 1** is in your accounting preferences. Go to **Setup > Accounting > Accounting Preferences** and look for "Create Adjustment Transactions for Term Discounts."

**Setting 2** is at the nexus level. Go to your nexus configuration and look for "Include Tax When Calculating Term Discount" on the nexus you want this to apply to.

## What happens when a term discount is taken

Once both settings are enabled, when a vendor payment applies a term discount on a purchase transaction, NetSuite creates an adjustment transaction to account for the tax difference. The tax is recalculated on the discounted amount rather than the gross invoice amount.

This keeps your tax liability accurate when discounts are taken. Without the adjustment, your books show more tax paid than was correct for the actual amount transacted.

## Who should enable this

This feature is most relevant for:

- Accounts using SuiteTax (not the legacy tax engine)
- Businesses that pay vendor invoices with payment terms that include early payment discounts
- Finance teams in tax jurisdictions where the tax base is the amount paid, not the invoice amount

If your account does not use term discounts on purchase transactions, this change has no effect and no action is needed.

For step-by-step setup instructions, see [How to Enable Tax on Term Discounts in NetSuite SuiteTax](/resources/netsuite-suitetax-term-discounts).

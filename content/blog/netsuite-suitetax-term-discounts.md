---
title: "NetSuite SuiteTax Now Handles Tax on Term Discounts: How to Enable It"
description: "NetSuite 2026.2 adds support for tax adjustments on term discounts in SuiteTax. Two settings control this: one in Accounting Preferences and one at the nexus level. Here is what they do and how to turn them on."
date: "2026-07-21"
updated: "2026-08-07"
tags: ["Accounting", "Administration", "SuiteTax"]
---

Term discounts are a standard arrangement in B2B purchasing. A vendor offers a small discount, often 1 or 2 percent, if you pay the invoice within a short window, typically 10 days. The payment terms are written as something like "2/10 net 30": 2% discount if paid within 10 days, full amount due within 30.

The tax question with term discounts is: if you take the discount, the amount you actually paid is less than the invoice total. Should the tax be recalculated on the lower amount?

In most tax jurisdictions, yes. The taxable base is what was actually paid, not the gross invoice amount. But in NetSuite SuiteTax, handling this correctly has historically required manual intervention or workarounds. The tax was calculated on the full invoice amount and did not adjust when a term discount was applied.

NetSuite 2026.2 adds a formal mechanism for this.

<div style="background:#eef2fb;border:1px solid #d7e0f3;border-radius:10px;overflow:hidden;margin:2rem 0;font-family:system-ui,-apple-system,sans-serif">
<div style="background:#0b1f4d;padding:0.7rem 1.25rem;display:flex;align-items:center;gap:8px">
<span style="display:inline-block;width:8px;height:8px;border-radius:50%;background:#4f7fff"></span><span style="font-size:0.68rem;font-weight:700;color:#eef2fb;letter-spacing:0.08em">TWO SETTINGS TO ENABLE: 2026.2</span>
</div>
<div style="display:flex;align-items:flex-start;gap:0.75rem;padding:0.65rem 1.25rem;border-bottom:1px solid #d7e0f3">
<span style="font-size:0.68rem;font-weight:700;color:#4f7fff;background:#0b1f4d;width:20px;height:20px;border-radius:50%;display:inline-flex;align-items:center;justify-content:center;flex-shrink:0;margin-top:1px">1</span>
<div style="flex:1">
<span style="font-size:0.8rem;font-weight:600;color:#14306b;display:block">Create Adjustment Transactions for Term Discounts</span>
<span style="font-size:0.76rem;color:#4f6fb0;line-height:1.4;display:block;margin-top:2px">Accounting Preferences. Tells NetSuite to generate an adjustment entry when a term discount is applied on a purchase.</span>
</div>
</div>
<div style="display:flex;align-items:flex-start;gap:0.75rem;padding:0.65rem 1.25rem">
<span style="font-size:0.68rem;font-weight:700;color:#4f7fff;background:#0b1f4d;width:20px;height:20px;border-radius:50%;display:inline-flex;align-items:center;justify-content:center;flex-shrink:0;margin-top:1px">2</span>
<div style="flex:1">
<span style="font-size:0.8rem;font-weight:600;color:#14306b;display:block">Include Tax When Calculating Term Discount</span>
<span style="font-size:0.76rem;color:#4f6fb0;line-height:1.4;display:block;margin-top:2px">Nexus-level setting. Controls whether tax is recalculated on the discounted amount at the jurisdiction level. Both settings must be enabled together.</span>
</div>
</div>
<div style="padding:0.65rem 1.25rem;background:#f0f4ff;border-top:1px solid #d7e0f3;font-size:0.78rem;color:#4f6fb0">
Both settings are required. Enabling only one does not produce the correct tax adjustment.
</div>
</div>

<div style="background:#eef2fb;border:1px solid #b2c2e6;border-radius:10px;padding:1.25rem 1.5rem;margin:2rem 0;font-family:system-ui,-apple-system,sans-serif">
<p style="margin:0 0 0.5rem;font-size:0.7rem;font-weight:700;color:#4f7fff;text-transform:uppercase;letter-spacing:0.08em">Quick answer</p>
<p style="margin:0;color:#14306b;font-size:0.9rem;line-height:1.6">NetSuite 2026.2 adds formal support for tax adjustments on term discounts in SuiteTax through two settings that must both be enabled. The first, Create Adjustment Transactions for Term Discounts, is in Accounting Preferences at Setup &gt; Accounting &gt; Accounting Preferences. It tells NetSuite to generate an adjustment transaction when a term discount is applied on a purchase. The second, Include Tax When Calculating Term Discount, is a nexus-level setting that controls whether tax is recalculated on the discounted amount for that jurisdiction. Both settings are required: enabling only one produces incomplete results. Once both are enabled, when a payment applies a term discount, NetSuite creates an adjustment so that tax is calculated on the amount actually paid rather than the gross invoice total. The feature applies to SuiteTax accounts only and is most relevant for businesses in jurisdictions where the taxable base is the amount actually paid, not the gross invoice amount.</p>
</div>

## What Do the New SuiteTax Term Discount Settings Do?

Two settings work together to enable tax adjustments on term discounts:

**Setting 1: Create Adjustment Transactions for Term Discounts**

This is an accounting preference that tells NetSuite to generate an adjustment transaction when a term discount is applied on a purchase. Without this enabled, no adjustment entry is created when you take a discount.

**Setting 2: Include Tax When Calculating Term Discount**

This is a nexus-level setting that tells NetSuite to account for tax when calculating the term discount adjustment for that nexus. It controls whether the tax portion of the invoice is included in the discount calculation.

Both settings need to be enabled for the full behavior to work. Enabling only one produces incomplete results.

## Where Do You Enable SuiteTax Term Discount Tax Settings?

**Setting 1** is in your accounting preferences. Go to **Setup > Accounting > Accounting Preferences** and look for "Create Adjustment Transactions for Term Discounts."

**Setting 2** is at the nexus level. Go to your nexus configuration and look for "Include Tax When Calculating Term Discount" on the nexus you want this to apply to.

## What Happens When a Term Discount Is Applied in NetSuite?

Once both settings are enabled, when a vendor payment applies a term discount on a purchase transaction, NetSuite creates an adjustment transaction to account for the tax difference. The tax is recalculated on the discounted amount rather than the gross invoice amount.

This keeps your tax liability accurate when discounts are taken. Without the adjustment, your books show more tax paid than was correct for the actual amount transacted.

## Who Should Enable SuiteTax Term Discount Tax?

This feature is most relevant for:

- Accounts using SuiteTax (not the legacy tax engine)
- Businesses that pay vendor invoices with payment terms that include early payment discounts
- Finance teams in tax jurisdictions where the tax base is the amount paid, not the invoice amount

If your account does not use term discounts on purchase transactions, this change has no effect and no action is needed.

## Frequently asked questions

**Q: Does this feature work with the legacy NetSuite tax engine?**
A: No. The term discount tax adjustment feature requires SuiteTax. It does not apply to accounts using the legacy tax engine.

**Q: What does the adjustment transaction look like?**
A: When a term discount is taken and both settings are enabled, NetSuite creates an adjustment entry that accounts for the tax difference between the gross invoice amount and the discounted amount paid. This keeps your tax liability accurate for the payment actually received.

**Q: Do both settings need to be enabled at the same time?**
A: Yes. Enabling Create Adjustment Transactions for Term Discounts without enabling Include Tax When Calculating Term Discount at the nexus level produces incomplete results. Both are required for the full behavior.

**Q: Does this apply to all nexuses, or only specific ones?**
A: The nexus-level setting gives you per-jurisdiction control. You enable Include Tax When Calculating Term Discount on each nexus where term discount tax adjustments should apply.

**Q: What happens to existing transactions before the settings are enabled?**
A: The settings affect payments processed after both are enabled. Transactions already paid and closed before enabling the settings are not retroactively adjusted.

**Q: Who can configure these settings?**
A: Accounting Preferences require Administrator access. Nexus settings are configured under your tax engine setup and also require Administrator or appropriate accounting role access.

For step-by-step setup instructions, see [How to Enable Tax on Term Discounts in NetSuite SuiteTax](/resources/netsuite-suitetax-term-discounts).

For help configuring SuiteTax settings or resolving tax-related issues in your NetSuite account, see SuitePacific's [NetSuite administrator support service](/netsuite-administrator-support).
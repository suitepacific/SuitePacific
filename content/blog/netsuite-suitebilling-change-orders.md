---
title: "NetSuite SuiteBilling Change Orders: How Upgrades, Downgrades, and Cancellations Work"
description: "SuiteBilling change orders let you modify active subscriptions mid-term. Here is how the change order process works, what each type does, how proration is handled, and what to watch for."
date: "2026-08-15"
updated: "2026-08-16"
tags: ["SuiteBilling", "Billing", "Subscriptions"]
---

NetSuite SuiteBilling is the platform's subscription billing module. A change order in SuiteBilling is the mechanism for modifying an active subscription, including adding or removing lines, changing quantities or pricing, or cancelling the subscription, without overwriting the original subscription record or its billing history.

Subscriptions change. Customers add seats, drop a product tier, move to a different plan, or cancel before their renewal date. SuiteBilling handles these modifications through change orders, a separate record type that manages mid-subscription adjustments without overwriting the original subscription.

Understanding how change orders work is essential for anyone administering SuiteBilling after go-live. The mechanics are not obvious from the interface, and mistakes, such as applying a change order with the wrong effective date or incorrectly configured proration, produce billing discrepancies that are difficult to untangle retroactively.

<div style="background:#eef2fb;border:1px solid #b2c2e6;border-radius:10px;padding:1.25rem 1.5rem;margin:2rem 0;font-family:system-ui,-apple-system,sans-serif">
<p style="margin:0 0 0.5rem;font-size:0.7rem;font-weight:700;color:#4f7fff;text-transform:uppercase;letter-spacing:0.08em">Quick answer</p>
<p style="margin:0;color:#14306b;font-size:0.9rem;line-height:1.6">A SuiteBilling change order is a record that modifies an active subscription by adding subscription lines, removing them, changing quantities or pricing, or cancelling the subscription entirely. Change orders do not overwrite the original subscription lines; they create new line revisions with their own effective dates. The effective date determines when the new version of the line takes over from the previous version. Proration controls whether the customer is credited or charged for the portion of a billing period before the effective date. A change order must be Applied before it takes effect. Until it is Applied, the existing subscription continues billing normally. Cancellation change orders end the subscription at the specified date and generate a final prorated charge or credit for any partial period, depending on proration settings. Once Applied, a change order cannot be reversed directly; correcting a billing error typically requires creating a second change order, issuing a credit memo, or both.</p>
</div>

## What Is a SuiteBilling Change Order?

A change order is a separate record linked to an active subscription. It defines a modification, an effective date, and optionally a proration method. When applied, it creates new revisions of the affected subscription lines rather than editing the original records. This preserves the subscription's billing history and makes it possible to see what was billed at each tier or quantity over the subscription's life.

The three main types of modifications handled by change orders are:

| Type | What it does |
|---|---|
| Upgrade | Adds new subscription lines or increases quantity or price on existing lines |
| Downgrade | Removes subscription lines or decreases quantity or price on existing lines |
| Cancellation | Ends the subscription at the specified effective date |

## How Do Change Orders Work?

### Step 1: Create the change order

From an Active subscription, create a new change order and specify the effective date. The effective date is the date from which the new subscription configuration will apply. It can be today, a date in the past, or a future date.

The subscription continues billing under its current configuration until the change order is Applied.

### Step 2: Specify the modifications

On the change order, add, remove, or modify subscription lines. Each modification creates a pending revision of that line. The pending revisions are visible on the change order but do not affect billing until the change order is Applied.

### Step 3: Set proration

Proration controls how SuiteBilling handles the partial billing period between the last invoice date and the change order effective date. Two common choices are:

**No proration:** The customer is billed at the old rate through the end of the current billing period and at the new rate from the next billing period forward. No credit or catch-up charge is issued.

**Daily proration:** SuiteBilling calculates the per-day rate for the old configuration and the new configuration. If the new configuration is more expensive, a catch-up charge is issued for the days between the effective date and the next billing date. If the new configuration is less expensive, a credit is issued for the same period.

Proration can be set at the subscription level, subscription line level, or inherited from the item.

### Step 4: Apply the change order

Until a change order is Applied, the subscription continues billing normally. Applying the change order activates the pending line revisions as of the effective date. If a proration method is configured, SuiteBilling generates the appropriate catch-up charge or credit at this point.

Once Applied, the change order status moves to Closed and the subscription reflects the updated configuration going forward.

## What Happens to Existing Billing When a Change Order Is Applied?

The key behavior to understand: Applying a change order does not retroactively correct past invoices. It creates new line revisions effective from the specified date. Past charges that have already been billed are not affected.

If the effective date is in the past (a backdated change order), SuiteBilling may generate catch-up Charge records covering the period from the effective date to the current date. Whether it does depends on the proration setting and whether the rating process has already run for that period.

<figure style="margin:1.75rem 0">
<svg viewBox="0 0 680 100" xmlns="http://www.w3.org/2000/svg" style="width:100%;max-width:680px;display:block;font-family:system-ui,-apple-system,sans-serif">
  <defs>
    <marker id="co-arrow" markerWidth="7" markerHeight="7" refX="5" refY="3" orient="auto"><path d="M0,0 L0,6 L7,3 z" fill="#4f6fb0"/></marker>
  </defs>
  <line x1="30" y1="50" x2="650" y2="50" stroke="#c2ceea" stroke-width="1.5"/>
  <circle cx="80" cy="50" r="5" fill="#4f7fff"/>
  <text x="80" y="35" text-anchor="middle" font-size="9" fill="#14306b" font-weight="600">Jan 1</text>
  <text x="80" y="25" text-anchor="middle" font-size="8" fill="#4f6fb0">Subscription</text>
  <text x="80" y="15" text-anchor="middle" font-size="8" fill="#4f6fb0">start</text>
  <circle cx="260" cy="50" r="5" fill="#4f7fff"/>
  <text x="260" y="35" text-anchor="middle" font-size="9" fill="#14306b" font-weight="600">Feb 1</text>
  <text x="260" y="25" text-anchor="middle" font-size="8" fill="#4f6fb0">Invoice 1</text>
  <text x="260" y="15" text-anchor="middle" font-size="8" fill="#4f6fb0">billed</text>
  <circle cx="380" cy="50" r="7" fill="#f59e0b"/>
  <text x="380" y="35" text-anchor="middle" font-size="9" fill="#92400e" font-weight="700">Feb 15</text>
  <text x="380" y="70" text-anchor="middle" font-size="8" fill="#92400e" font-weight="600">Change order</text>
  <text x="380" y="82" text-anchor="middle" font-size="8" fill="#92400e">effective date</text>
  <text x="380" y="94" text-anchor="middle" font-size="8" fill="#92400e">New line revision</text>
  <circle cx="510" cy="50" r="5" fill="#4f7fff"/>
  <text x="510" y="35" text-anchor="middle" font-size="9" fill="#14306b" font-weight="600">Mar 1</text>
  <text x="510" y="25" text-anchor="middle" font-size="8" fill="#4f6fb0">Invoice 2</text>
  <text x="510" y="15" text-anchor="middle" font-size="8" fill="#4f6fb0">new rate + proration</text>
  <circle cx="640" cy="50" r="5" fill="#4f7fff"/>
  <text x="640" y="35" text-anchor="middle" font-size="9" fill="#14306b" font-weight="600">Apr 1</text>
  <text x="640" y="25" text-anchor="middle" font-size="8" fill="#4f6fb0">Invoice 3</text>
  <text x="640" y="15" text-anchor="middle" font-size="8" fill="#4f6fb0">full new rate</text>
</svg>
<figcaption style="text-align:center;font-size:0.78rem;color:#8aa2d6;margin-top:0.4rem">A change order with an effective date of Feb 15 creates a new subscription line revision on that date. Invoice 2 (Mar 1) reflects the proration credit or charge for Feb 15-28 plus the new rate going forward.</figcaption>
</figure>

## How Does Cancellation Work in SuiteBilling?

A cancellation change order ends the subscription at the specified effective date. When Applied, it:

1. Sets the subscription end date to the effective date
2. Cancels any future Charge records that have not yet been billed
3. Generates a prorated credit or final charge for any partial billing period, depending on the proration setting

For evergreen subscriptions (no fixed end date), a cancellation change order is the only way to end billing. For fixed-term subscriptions, the subscription will also expire at its original end date if no cancellation change order is applied.

**Cancellation effective date choices:**

| Effective date | Result |
|---|---|
| End of current billing period | No proration needed; subscription ends cleanly at the period boundary |
| Mid-period (future) | Future Charges for the remaining period are cancelled; proration credits back the days not served if proration is enabled |
| Past date | Backdated cancellation; review charge history carefully; catch-up credits may be generated |

## What Are Common Change Order Problems?

### Wrong effective date

Using today's date when the change was meant to be effective at the end of the month (or vice versa) is the most common mistake. Once a change order is Applied, the effective date is locked. Correcting this typically requires creating a second change order to reverse the incorrect one.

### Proration setting mismatch

If the customer was quoted a clean period switch ("effective next month, no prorated charges") but the change order is applied with daily proration enabled, a catch-up charge will appear on the next invoice. Confirm the proration setting before applying.

### Applying without reviewing the impact

Change orders should be reviewed in a non-production environment (Sandbox) before applying to live subscriptions. SuiteBilling's Sandbox is available for exactly this. Once applied to production, the only way to undo the financial impact is through additional change orders, credits, or manual journal entries, all of which add complexity.

### Adding items that are not on the subscription plan

If the subscription is linked to a Subscription Plan, the items added via change order must be items that are allowed under that plan. Adding items not included in the plan may cause validation errors or create lines that rating skips.

## What Should You Validate in Sandbox Before Applying a Change Order?

Before applying a significant change order (particularly a mid-period upgrade with daily proration or a backdated cancellation), validate the following in Sandbox:

1. The effective date produces the line revision dates you expect on the subscription record
2. The proration calculation matches what was communicated to the customer
3. The resulting Charge records have the correct amounts and billing periods
4. The next invoice preview (if available) shows the expected totals

## Related SuiteBilling Guides

- [NetSuite SuiteBilling: Why Charges Are Not Being Generated](/blog/netsuite-suitebilling-charge-generation)
- [SuiteBilling and Advanced Revenue Management: What the Integration Actually Does](/blog/netsuite-suitebilling-arm-integration)

For ongoing SuiteBilling support, see [NetSuite SuiteBilling Support](/netsuite-suitebilling-support).

**SuitePacific works with SaaS, professional services, and subscription businesses on NetSuite SuiteBilling post-go-live.** If change orders are producing unexpected charges, or if your billing pipeline needs a systematic review, [contact us](/contact).

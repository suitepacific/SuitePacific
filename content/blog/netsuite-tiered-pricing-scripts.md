---
title: "NetSuite Tiered Pricing Scripts for Wholesale Distributors"
description: "NetSuite tiered pricing requires SuiteScript to apply volume breaks, customer contracts, and promotional rates that the standard pricing engine does not handle."
date: "2026-09-19"
updated: "2026-09-19"
tags: ["Wholesale Distribution", "NetSuite", "Pricing"]
calloutText: "Need tiered pricing scripts built for your NetSuite distribution account?"
---

Tiered pricing in wholesale distribution means charging customers different unit prices based on order volume, customer segment, or contractual agreements. A distributor might charge $8.50 per unit for orders under 100 units, $7.75 for orders from 100 to 499 units, and $7.10 for orders of 500 or more units. On top of volume tiers, the same distributor may have customer-specific price contracts that override the standard tier for key accounts, promotional pricing active for a date range, and rebate agreements that credit customers retroactively based on cumulative annual purchases. NetSuite's price levels and quantity pricing features handle simple scenarios: a flat price override for a customer class, or a quantity-based price break on a single item. They do not handle the combination of volume tiers, customer-specific contracts, date-bound promotions, and rebate accruals that most wholesale distributors run simultaneously.

The pricing gap creates order entry errors that are difficult to catch systematically. A customer service representative entering a large order applies the standard price level because the system does not trigger the correct contracted rate automatically. The customer receives an invoice at the wrong price, notices it, and either short-pays or contacts the distributor for a credit. Margin analysis is distorted because some orders are correctly priced and some are not. The pricing logic that should be in the system lives instead in spreadsheets that customer service consults manually, and the accuracy of any given order depends on whether the representative knew to check the spreadsheet.

<div style="background:#eef2fb;border:1px solid #b2c2e6;border-radius:10px;padding:1.25rem 1.5rem;margin:2rem 0;font-family:system-ui,-apple-system,sans-serif">
<p style="margin:0 0 0.5rem;font-size:0.7rem;font-weight:700;color:#4f7fff;text-transform:uppercase;letter-spacing:0.08em">Quick answer</p>
<p style="margin:0;color:#14306b;font-size:0.9rem;line-height:1.6">NetSuite tiered pricing automation uses a SuiteScript Client Script or User Event Script on the sales order to apply the correct price based on the combination of order quantity, customer segment, active contracts, and promotional dates. When an order line is entered, the script reads the item and quantity, looks up the applicable pricing hierarchy for that customer, evaluates the active contracts and promotions, and overrides the default price level with the calculated rate. The pricing hierarchy is stored in a custom pricing record or a price agreement record linked to the customer and the item or item category. Rebate accruals are handled by a separate script that increments the cumulative purchase total for the customer on each order, calculates the earned rebate amount based on the rebate schedule, and posts a rebate liability journal entry or a customer credit memo at the end of the accrual period. SuitePacific builds these for distributors. Plans from $799.</p>
</div>

## What pricing scenarios does standard NetSuite handle poorly?

Standard NetSuite pricing works well for simple cases: a price level that applies a fixed percentage discount to all items for a customer class, or a quantity schedule that gives a price break at a specific quantity threshold on a per-item basis. The gaps appear when pricing logic is more contextual:

| Scenario | Standard NetSuite | With SuiteScript |
|---|---|---|
| Volume tiers across line items | Per-line quantity schedule only | Aggregate order quantity triggers tier across all lines |
| Customer contract overrides | Manual price level selection | Script reads contract record and applies override automatically |
| Date-bound promotional pricing | Manual price schedule activation | Script checks promotion start/end date and applies rate |
| Retroactive rebate accrual | Not supported natively | Script accumulates purchases and posts rebate accrual periodically |
| Commodity-based price adjustments | Manual update of price levels | Script reads commodity index and adjusts base price automatically |

## How does a customer pricing contract work in NetSuite?

A pricing contract is a custom record that defines the agreed price or discount for a specific customer on a specific item or item category for a contract period. The contract record stores the customer, the item or category, the effective start and end dates, and the contracted price or discount percentage.

When a sales order is created for that customer, a SuiteScript reads the contract record for each line item and checks whether an active contract exists for the item. If a contract is found, the script overrides the standard price with the contracted rate. If no contract is found, the script falls back to the customer's standard price level or the quantity tier schedule.

Contract expiration alerts are a useful companion to the pricing script: a saved search filters contracts by expiration date and sends a notification to the sales team or customer service when a contract is within 30 days of expiration so that renewal discussions can begin before the contract lapses and the customer starts receiving non-contract pricing.

## How does rebate accrual work in NetSuite?

A rebate is a deferred discount: instead of reducing the invoice price, the distributor agrees to credit the customer a percentage of their total purchases after they reach a volume threshold. The accounting treatment requires accruing the rebate liability as the customer makes purchases, then settling it at the end of the rebate period with a credit memo or payment.

In NetSuite, rebate accrual is implemented with a custom rebate record that stores the customer, the rebate rate, the purchase volume threshold, and the accrual period. A script triggered on invoice posting reads the rebate record for the customer, updates the cumulative purchase amount, calculates the earned rebate to date, and posts the difference to a rebate accrual liability account. At period end, a settlement script creates the credit memo or debit memo to close the accrual.

SuitePacific provides ongoing NetSuite support for wholesale distributors including tiered pricing scripts, rebate accrual builds, and contract management. See [NetSuite wholesale distribution support](/industries/wholesale-distribution) for the full engagement scope.

## Related reading

- [NetSuite wholesale distribution support](/industries/wholesale-distribution): full overview of post-go-live support for distributors
- [NetSuite SuiteScript development](/netsuite-suitescript-development): how pricing scripts and rebate logic are built and maintained
- [NetSuite multi-location inventory](/netsuite-multi-location-inventory): inventory management across warehouses for distribution operations
- [NetSuite order fulfillment](/netsuite-order-fulfillment): pick, pack, and ship automation for wholesale distribution

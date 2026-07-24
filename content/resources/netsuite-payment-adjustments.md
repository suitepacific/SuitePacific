---
title: "NetSuite Automated Payment Adjustments: What Gets Handled and When"
description: "NetSuite 2026.2 automates payment adjustments for bank fees, convenience fees, and underpayments from customer payment and customer deposit records. Here is what is covered and how it works."
category: "Administration"
tags: ["Administration", "Accounting", "AR"]
publishedAt: "2026-07-21"
linkedinDay: 27
---

## What automated payment adjustments cover

NetSuite 2026.2 introduces automation for three types of payment discrepancies that previously required manual adjustment entries:

**Bank fees:** When a bank deducts a processing fee from a customer payment before depositing the remainder, the deposited amount is less than the invoice total. The automated adjustment accounts for the fee difference at the time you record the payment.

**Convenience fees:** When a customer pays through a channel that charges a fee (such as a credit card surcharge), the net amount deposited may differ from the invoiced amount. The adjustment handles this difference automatically.

**Underpayments:** When a customer pays slightly less than the full amount due and the difference falls within a write-off threshold, the adjustment can be applied automatically rather than requiring a separate journal entry.

## Where the automation happens

Payment adjustment automation is available on two record types:

- **Customer Payment:** records of money received from customers against open invoices
- **Customer Deposit:** advance payments or deposits received from customers

When you record a payment on either of these records and a discrepancy exists that falls within the automated adjustment scope, NetSuite handles the adjustment at that point rather than leaving it for a separate manual step.

## What this replaces

Before 2026.2, handling a bank fee, convenience fee, or small underpayment typically required one or more of the following:

- A separate journal entry to clear the discrepancy
- A manual write-off transaction
- A manual adjustment on the payment record

These steps added transactions to the ledger and required time to complete for each affected payment. The 2026.2 automation applies the adjustment directly as part of recording the payment.

## What this does not cover

Automated payment adjustments handle small discrepancies within defined thresholds. Larger underpayments, disputed amounts, or partial payments that require separate billing or follow-up are outside the scope of this automation and still require manual handling.

## Who this applies to

This feature is most relevant for accounts where:

- Customers pay via bank transfer and bank fees are deducted before deposit
- The business accepts payment methods that carry processing or convenience fees
- Small underpayments are common and are typically written off rather than pursued

Payment adjustment automation is new in 2026.2. If you do not see the option on your customer payment or deposit records, confirm that your account is on the 2026.2 release.

For background on this feature and why it was introduced, see [NetSuite 2026.2 Can Now Automate Payment Adjustments for Bank Fees and Underpayments](/blog/netsuite-payment-adjustments-2026-2).

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

<figure style="margin:1.75rem 0">
<svg viewBox="0 0 680 110" xmlns="http://www.w3.org/2000/svg" style="width:100%;max-width:680px;display:block;font-family:system-ui,-apple-system,sans-serif">
  <text x="340" y="14" text-anchor="middle" font-size="10" font-weight="700" fill="#14306b" letter-spacing="0.05em">THREE PAYMENT DISCREPANCY TYPES — AUTO-ADJUSTED IN 2026.2</text>
  <rect x="0" y="22" width="206" height="74" rx="7" fill="#eef2fb" stroke="#4f7fff" stroke-width="1.5"/>
  <rect x="0" y="22" width="206" height="26" rx="7" fill="#0b1f4d"/>
  <rect x="0" y="38" width="206" height="10" fill="#0b1f4d"/>
  <text x="103" y="38" text-anchor="middle" font-size="9.5" font-weight="700" fill="#eef2fb">Bank Fees</text>
  <text x="103" y="60" text-anchor="middle" font-size="8.5" fill="#4f6fb0">Bank deducts processing charge</text>
  <text x="103" y="74" text-anchor="middle" font-size="8.5" fill="#4f6fb0">Net deposit differs from invoice</text>
  <text x="103" y="90" text-anchor="middle" font-size="8" font-weight="600" fill="#14306b">Auto-accounted at payment record</text>
  <rect x="237" y="22" width="206" height="74" rx="7" fill="#eef2fb" stroke="#4f7fff" stroke-width="1.5"/>
  <rect x="237" y="22" width="206" height="26" rx="7" fill="#0b1f4d"/>
  <rect x="237" y="38" width="206" height="10" fill="#0b1f4d"/>
  <text x="340" y="38" text-anchor="middle" font-size="9.5" font-weight="700" fill="#eef2fb">Convenience Fees</text>
  <text x="340" y="60" text-anchor="middle" font-size="8.5" fill="#4f6fb0">Credit card surcharge deducted</text>
  <text x="340" y="74" text-anchor="middle" font-size="8.5" fill="#4f6fb0">Net deposit below invoice total</text>
  <text x="340" y="90" text-anchor="middle" font-size="8" font-weight="600" fill="#14306b">Auto-adjusted at payment level</text>
  <rect x="474" y="22" width="206" height="74" rx="7" fill="#eef2fb" stroke="#4f7fff" stroke-width="1.5"/>
  <rect x="474" y="22" width="206" height="26" rx="7" fill="#0b1f4d"/>
  <rect x="474" y="38" width="206" height="10" fill="#0b1f4d"/>
  <text x="577" y="38" text-anchor="middle" font-size="9.5" font-weight="700" fill="#eef2fb">Underpayments</text>
  <text x="577" y="60" text-anchor="middle" font-size="8.5" fill="#4f6fb0">Customer pays less than billed</text>
  <text x="577" y="74" text-anchor="middle" font-size="8.5" fill="#4f6fb0">Within configured write-off threshold</text>
  <text x="577" y="90" text-anchor="middle" font-size="8" font-weight="600" fill="#14306b">Auto write-off, no journal entry needed</text>
</svg>
<figcaption style="text-align:center;font-size:0.78rem;color:#8aa2d6;margin-top:0.4rem">All three handled from customer payment or customer deposit records. No separate adjustment workflow required.</figcaption>
</figure>

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

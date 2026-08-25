---
title: "NetSuite Customer Deposits: Cash Received Is Not Revenue Earned"
description: "When a customer pays in advance in NetSuite, the amount is recorded as a liability, not revenue. Here is how Customer Deposits work, why they appear on the balance sheet instead of the P&L, and how to apply them correctly."
category: "Accounting"
tags: ["Accounting", "Finance", "Revenue Recognition", "Administration"]
publishedAt: "2026-08-20"
updatedAt: "2026-08-20"
linkedinDay: 48
---

<div style="background:#eef2fb;border:1px solid #b2c2e6;border-radius:10px;padding:1.25rem 1.5rem;margin:2rem 0;font-family:system-ui,-apple-system,sans-serif">
<p style="margin:0 0 0.5rem;font-size:0.7rem;font-weight:700;color:#4f7fff;text-transform:uppercase;letter-spacing:0.08em">Quick answer</p>
<p style="margin:0;color:#14306b;font-size:0.9rem;line-height:1.6">In NetSuite, a Customer Deposit records an advance payment from a customer as an Other Current Liability, not as revenue. The cash has been received, but the obligation to deliver goods or services has not yet been fulfilled. Revenue is recognized only when the deposit is applied to an invoice after delivery. Until then, the deposit sits on the balance sheet as a liability. Cash received and revenue earned are two different accounting events; NetSuite's Customer Deposit record enforces this distinction correctly. When a deposit is applied to an invoice, NetSuite automatically generates the appropriate journal entries to debit the liability account and credit the revenue account. Navigate to Transactions > Customers > Enter Customer Deposits to record an advance payment. A common mistake is posting customer prepayments directly as sales income, which overstates revenue until the delivery obligation is fulfilled.</p>
</div>

## How NetSuite Records a Customer Deposit

When a customer pays before an order is fulfilled, you record a Customer Deposit in NetSuite. This transaction:

- Records the cash received (debit to bank or Undeposited Funds)
- Creates an Other Current Liability (credit to the Customer Deposits liability account)

The customer's balance in NetSuite reflects the deposit. The revenue account is not touched. The deposit sits on the balance sheet as a liability because the company owes the customer either the goods or services, or a refund.

## The Three-Stage Flow

**Stage 1: Customer Deposit received**
Customer pays $50,000 in advance. NetSuite creates a Customer Deposit record. Cash increases by $50,000. Customer Deposits liability increases by $50,000. Revenue: unchanged.

**Stage 2: Order fulfilled**
The goods are shipped or services are delivered. A Sales Order is fulfilled and an Invoice is created.

**Stage 3: Deposit applied to Invoice**
The Customer Deposit is applied to the Invoice. The Customer Deposits liability decreases by $50,000. Revenue increases by $50,000. The customer's balance is settled.

Revenue is recognized at Stage 3, not Stage 1. This is the correct treatment under accrual accounting and is required under ASC 606 for companies recognizing revenue on delivery.

## Why This Matters in Practice

**Bank balance vs revenue balance.** After a $50,000 Customer Deposit is recorded, the bank balance has increased by $50,000 but revenue has not. A finance team that reads the bank balance and assumes revenue has been recognized by that amount will overstate revenue for the period.

**Balance sheet liability.** Customer Deposits appear on the balance sheet as a current liability. A large Customer Deposits balance means the company has received cash it has not yet earned. This is a real obligation: if the order is cancelled before fulfillment, the deposit may need to be refunded.

**Period-end review.** At period end, the Customer Deposits liability balance should be reviewed to ensure it accurately reflects outstanding unfulfilled orders with advance payments. Deposits that should have been applied to invoices but have not been will overstate the liability and understate revenue for the period.

## How to Apply a Customer Deposit to an Invoice

When an order is fulfilled and an invoice is created, apply the Customer Deposit from the invoice:

1. Open the Invoice
2. On the Apply subtab, find the Customer Deposits section
3. Check the box next to the relevant deposit
4. The deposit amount will reduce the balance due on the invoice
5. Save the invoice

NetSuite will create the accounting entries to move the amount from the Customer Deposits liability to revenue, and will reduce the customer's outstanding balance accordingly.

## Partial Applications

A Customer Deposit can be partially applied to an invoice. If a $50,000 deposit is applied to a $30,000 invoice, $30,000 of the deposit is applied (reducing the invoice balance to zero) and $20,000 remains on the Customer Deposits liability until applied to a future invoice.

## What Happens If a Deposit Is Never Applied

If a Customer Deposit is never applied to an invoice, the liability remains on the balance sheet indefinitely. Common causes:

- The order was cancelled but the deposit was not refunded or written off
- The invoice was created but the deposit was not linked to it
- The deposit was recorded against the wrong customer

Review aged Customer Deposit balances periodically to identify deposits that should have been applied or refunded.

## Related Resources

- [NetSuite Undeposited Funds: Customer Payment vs Bank Deposit](/resources/netsuite-undeposited-funds): the two-step cash flow when Undeposited Funds is enabled, and why a payment marking an invoice Paid does not immediately appear in the bank account.
- [NetSuite post-go-live support](/netsuite-post-go-live-support): accounting configuration support for live accounts.

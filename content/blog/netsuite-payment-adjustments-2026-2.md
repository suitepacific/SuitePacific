---
title: "NetSuite 2026.2 Can Now Automate Payment Adjustments for Bank Fees and Underpayments"
description: "NetSuite 2026.2 introduces automated payment adjustments for bank fees, convenience fees, and underpayments directly from customer payment and customer deposit records, removing the need for manual adjustment entries."
date: "2026-07-21"
tags: ["Accounting", "Administration", "NetSuite Tips"]
---

When a customer pays slightly less than the invoice amount, or when your bank deducts a processing fee from a payment before it hits your account, the result is a discrepancy. In NetSuite, that discrepancy traditionally required a manual adjustment entry to clear it.

NetSuite 2026.2 introduces **Automating Payment Adjustments**, which handles these small discrepancies automatically from the customer payment or customer deposit record.

## What types of adjustments are covered

The automation handles three types of payment discrepancies:

**Bank fees:** When a bank deducts its processing charge from a customer payment before depositing the remainder, the amount received does not match the invoice total. NetSuite can now automatically account for the fee difference when you record the payment.

**Convenience fees:** When customers pay through a channel that charges a convenience fee (such as a credit card surcharge), the net amount deposited may differ from the invoiced amount. The automation handles this difference at the payment record level.

**Underpayments:** When a customer pays less than the full amount due, and the difference is within a threshold your account considers acceptable for write-off, the adjustment can be applied automatically rather than creating a separate journal entry.

## Where this happens

Payment adjustment automation works from the **customer payment** and **customer deposit** records in NetSuite. These are the records you create when you receive money from a customer.

Previously, clearing a small discrepancy on one of these records required a separate manual step, typically a journal entry or a write-off transaction. The 2026.2 change brings that adjustment handling directly into the payment workflow.

## Why this matters

The practical benefit is reduced manual work for AR teams. Small discrepancies, bank fees, and underpayments are common in any accounts receivable operation. Handling each one manually generates extra transactions, takes time, and creates reconciliation noise.

Automating these adjustments means fewer manual journal entries, cleaner reconciliation, and less follow-up for the AR team when a payment does not match the invoice exactly.

## Who should use this

This feature is most relevant for:

- AR teams that regularly deal with bank fees deducted from customer payments
- Businesses that accept payment methods with convenience fees or processing charges
- Accounts that currently write off small underpayments manually

If your reconciliation process involves frequent small adjustments between payment amounts and invoice totals, this feature is worth reviewing once your account is on the 2026.2 release.

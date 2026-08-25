---
title: "NetSuite Undeposited Funds: Why Customer Payment Does Not Equal Bank Deposit"
description: "When Undeposited Funds is enabled, recording a Customer Payment marks the invoice as Paid but the cash is not in the bank account yet. Here is how the two-step flow works and what a growing Undeposited Funds balance actually means."
category: "Accounting"
tags: ["Accounting", "Finance", "Administration", "Bank Reconciliation"]
publishedAt: "2026-08-20"
updatedAt: "2026-08-20"
linkedinDay: 47
---

<div style="background:#eef2fb;border:1px solid #b2c2e6;border-radius:10px;padding:1.25rem 1.5rem;margin:2rem 0;font-family:system-ui,-apple-system,sans-serif">
<p style="margin:0 0 0.5rem;font-size:0.7rem;font-weight:700;color:#4f7fff;text-transform:uppercase;letter-spacing:0.08em">Quick answer</p>
<p style="margin:0;color:#14306b;font-size:0.9rem;line-height:1.6">When Undeposited Funds is enabled in NetSuite, a Customer Payment has two separate accounting effects. Recording the payment closes the receivable: the invoice is marked Paid and the customer's AR balance is reduced. But the cash goes to the Undeposited Funds account, not the bank account. A second transaction, the Bank Deposit, is required to move cash from Undeposited Funds into the bank account. Until that deposit is recorded, your bank account in NetSuite does not reflect the cash. A growing Undeposited Funds balance does not mean customer payments are missing; it means the Bank Deposit step has not been completed for those payments. Navigate to Transactions > Bank > Make Deposits to create the Bank Deposit record that clears Undeposited Funds into the correct bank account and completes the payment-to-bank reconciliation cycle. Running a saved search on the Undeposited Funds account filtered to unpaid status is the fastest way to see which payments are pending deposit.</p>
</div>

## How Undeposited Funds Works in NetSuite

Undeposited Funds is an intermediate clearing account that holds cash between the time a customer payment is received and the time it is deposited into the bank account. This mirrors how physical cash handling often works: you receive multiple checks over several days, then deposit them together in a single bank trip.

The flow in NetSuite when Undeposited Funds is enabled:

**Step 1: Customer Payment**
- Invoice is marked Paid
- Customer's AR balance is reduced
- Cash moves to the Undeposited Funds account (not the bank account)

**Step 2: Bank Deposit**
- You create a Bank Deposit record
- Select the Customer Payment records to include in the deposit
- Cash moves from Undeposited Funds to the bank account
- Bank account balance in NetSuite increases

These are two separate accounting events. The Customer Payment settles the receivable. The Bank Deposit moves the cash into the bank account.

## Why This Causes Confusion

The confusion arises because the Customer Payment marks the invoice as Paid. From the customer's perspective and from an AR standpoint, the transaction is complete. But from a cash management standpoint, the money is in a holding account, not the bank.

Finance teams that check the bank account balance in NetSuite after recording a customer payment may find it has not increased. The cash is in Undeposited Funds, waiting for a Bank Deposit to move it.

The reverse confusion also occurs: when a bank reconciliation does not balance, the assumption is often that a customer payment is missing. In accounts using Undeposited Funds, the payment may exist and be correctly recorded, with the Bank Deposit simply not yet completed.

## What a Growing Undeposited Funds Balance Means

A growing Undeposited Funds balance means Bank Deposit records have not been completed for some customer payments. It does not mean:

- Customer payments are missing
- Revenue has not been recorded
- The customer's AR balance is incorrect

The AR balance and invoice status are determined by the Customer Payment, which is complete. The Undeposited Funds balance is purely a cash timing issue between the payment receipt and the bank deposit.

To clear an Undeposited Funds balance, navigate to **Transactions > Bank > Make Deposits**, select the payments to deposit, and save the Bank Deposit record.

## How to Check Whether Undeposited Funds Is Enabled

Navigate to **Setup > Accounting > Accounting Preferences**. Look for the **Use Undeposited Funds** preference. If it is checked, Customer Payments post to Undeposited Funds by default. Some accounts configure specific payment methods to bypass Undeposited Funds and post directly to a bank account; check the payment method records if your account has mixed behavior.

## Bank Reconciliation and Undeposited Funds

When reconciling the bank account in NetSuite against the bank statement, the Bank Deposit records are the transactions that appear in NetSuite's bank account register. Individual Customer Payment records do not appear in the bank register directly; only the Bank Deposit that contains them does.

This means the bank statement should be reconciled against Bank Deposit records, not against individual Customer Payment records. If you see a deposit on the bank statement that does not match a Bank Deposit record in NetSuite, check whether the payments included in that deposit have been processed with a Bank Deposit transaction or are still sitting in Undeposited Funds.

## Related Resources

- [NetSuite bank reconciliation and Match Bank Data in 2026.2](/resources/netsuite-bank-reconciliation-match-suggestions): the updated Match Bank Data page introduced in NetSuite 2026.2.
- [NetSuite post-go-live support](/netsuite-post-go-live-support): ongoing accounting configuration support for live NetSuite accounts.

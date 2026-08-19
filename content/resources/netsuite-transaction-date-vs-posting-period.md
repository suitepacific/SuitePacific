---
title: "NetSuite Transaction Date vs Posting Period: Why the GL Can Be Correct While a Financial Report Looks Wrong"
description: "A transaction's date and the period it posts to are not always the same in NetSuite. Here is when they differ, why it happens, and what to check when a financial report does not match expectations."
category: "Accounting"
tags: ["Accounting", "Finance", "Administration", "Reporting"]
publishedAt: "2026-08-20"
updatedAt: "2026-08-20"
linkedinDay: 50
---

<div style="background:#eef2fb;border:1px solid #b2c2e6;border-radius:10px;padding:1.25rem 1.5rem;margin:2rem 0;font-family:system-ui,-apple-system,sans-serif">
<p style="margin:0 0 0.5rem;font-size:0.7rem;font-weight:700;color:#4f7fff;text-transform:uppercase;letter-spacing:0.08em">Quick answer</p>
<p style="margin:0;color:#14306b;font-size:0.9rem;line-height:1.6">Every NetSuite transaction has two date-related fields that are not always the same: Transaction Date (when the event occurred) and Posting Period (which accounting period receives the financial impact). When a period is closed, NetSuite posts the transaction to the next available open period based on the account's posting-period settings, even if the Transaction Date falls within the closed period. A financial report filtered by period will include that transaction in the open period it posted to, not the closed period its Transaction Date falls in. This is correct behavior — the GL is accurate, but the report reflects the posting period, not the transaction date. When a P&L or balance sheet does not match expectations, check the Posting Period on the relevant transactions before assuming the GL contains an error.</p>
</div>

## Transaction Date and Posting Period Are Different Fields

NetSuite stores two distinct date references on every posting transaction:

**Transaction Date:** The date the event occurred in the real world. A vendor bill dated July 31 has a Transaction Date of July 31, regardless of when it was entered in NetSuite or which period it posts to.

**Posting Period:** The accounting period that receives the financial impact of the transaction. The Posting Period determines which period the transaction's GL lines appear in on financial reports like the P&L, Balance Sheet, and Trial Balance.

These two fields are often identical. But they can differ, and understanding when and why they differ explains a common category of financial report discrepancies.

## When Transaction Date and Posting Period Differ

The most common reason Transaction Date and Posting Period differ is a closed accounting period.

When a transaction is entered with a Transaction Date that falls within a closed accounting period, NetSuite cannot post to that period. Instead, it posts the transaction to the next available open period, as determined by the account's accounting period configuration.

**Example:** An invoice is entered on August 3 with a Transaction Date of July 31. The July accounting period is closed. NetSuite posts the transaction to August (the next open period). The transaction has:
- Transaction Date: July 31
- Posting Period: August 2026

A P&L report for July will not include this transaction, because its Posting Period is August. A P&L report for August will include it. The GL is correct; the transaction appears in the period it was actually posted to. But if the expectation was that a July-dated transaction would appear in the July P&L, the report appears wrong when it is not.

## How to Check the Posting Period on a Transaction

Open any posting transaction in NetSuite (Invoice, Vendor Bill, Journal Entry, etc.) and look for the **Posting Period** field. It is typically located in the header section of the record near the Transaction Date.

If the Posting Period field is not visible on the form, it may not be displayed by default on that transaction type. You can add it to the form via a custom view, or check it via a Saved Search that includes both Transaction Date and Posting Period as result columns.

## What to Check When a Financial Report Does Not Match Expectations

Before assuming a transaction is missing or incorrectly entered, check these four things:

**1. Transaction Date:** Is the transaction dated within the period you expect it to appear in?

**2. Posting Period:** Does the Posting Period on the transaction match the period the report is filtered to? If Transaction Date is in July but Posting Period is August, the transaction will appear in the August report, not July.

**3. Report As-of Date:** Is the financial report filtered to the correct period? A P&L dated "through July 31" will include transactions whose Posting Period is on or before July.

**4. Accounting Period status:** Is the period in question open or closed? If the period was closed before all expected transactions were entered, some transactions may have posted to a later open period.

## The Posting Period Setting and Administrator Control

NetSuite administrators can configure how posting periods are managed at **Setup > Accounting > Accounting Preferences**. The relevant setting controls whether users can override the Posting Period on individual transactions, or whether NetSuite automatically redirects to the next open period when the Transaction Date falls in a closed period.

Some accounts allow users to select the Posting Period manually, which can produce transactions with intentional mismatches between Transaction Date and Posting Period (for example, a late-arriving vendor bill being posted into the correct prior period if the period is still open for adjustments). Other accounts lock the Posting Period to follow the Transaction Date strictly.

Understanding how your account is configured helps explain the pattern you observe in your financial reports.

## The Practical Check

When a financial report does not match expectations, the fastest diagnostic is a Saved Search of the relevant transaction type with these columns:

- Transaction Date
- Posting Period
- Amount

Filter by Transaction Date to the expected period and look at the Posting Period column. Any transaction where these two differ is posting in a different period than its date suggests. That difference is the most common explanation for a report total that does not match a manual calculation based on transaction dates.

## Related Resources

- [NetSuite AP Aging vs Vendor Balance: Why the Numbers Can Legitimately Differ](/resources/netsuite-ap-aging-vs-vendor-balance): the same concept applied to AP — how report parameters explain apparent discrepancies before looking for missing transactions.
- [NetSuite post-go-live support](/netsuite-post-go-live-support): accounting configuration and reporting support for live NetSuite accounts.

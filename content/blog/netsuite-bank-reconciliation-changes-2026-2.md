---
title: "NetSuite Bank Reconciliation Changed Significantly in 2026.2: What Is Different"
description: "NetSuite 2026.2 overhauled the Match Bank Data page with a new Match Suggestions subtab, renamed tabs and buttons, filter chips, and audit columns. Here is everything that changed."
date: "2026-07-21"
tags: ["Banking", "Accounting", "Administration"]
---

If you do bank reconciliation in NetSuite, the Match Bank Data page looks different in 2026.2. Several tabs have been renamed, buttons have changed, and a new subtab has replaced the old Review tab. Here is a complete rundown of what changed.

## The Match Suggestions subtab replaces the Review subtab

The biggest change on the Match Bank Data page is the new **Match Suggestions** subtab. It replaces the old Review subtab.

Match Suggestions shows NetSuite's proposed matches for imported bank transactions. For each suggestion, you can choose from five actions:

- **Match Transaction:** confirm the suggested match
- **Review Match Options:** see other possible matches before deciding
- **Apply Payment:** apply the bank transaction as a payment against an open invoice or payable
- **Review Payment Options:** see other payment options before deciding
- **Create:** create a new transaction type to match against

This is more than a rename. The suggested actions give you a structured workflow for each unmatched bank line instead of just a list to review.

## Suggestions now cover both AR and AP

Match Suggestions are not limited to your bank side. NetSuite 2026.2 also introduces suggestions for applying payments against:

- **Open invoices** (accounts receivable)
- **Open payables** (accounts payable)

This means the suggestion engine works across both sides of your reconciliation, not just incoming bank lines.

## Tab and button names changed

Several elements of the Match Bank Data page have been renamed:

| Before 2026.2 | From 2026.2 |
|---|---|
| "To Be Matched" tab | "Transactions to Match" |
| "Excluded" tab | "Excluded Transactions" |
| "Match" button | "Match and Submit" |
| "Clear" button | "Clear and Submit" |

The button renames reflect that matching now automatically submits the action, removing a separate confirmation step.

## Action buttons appear above and below the list

In previous versions, action buttons were only at the bottom of the transaction list. In 2026.2, they appear both above and below. For long lists, this means you no longer have to scroll to the bottom to take action.

## New filter chips

The Match Bank Data page now includes filter chips to narrow the transaction list. This helps when you have a large number of unmatched bank lines and want to focus on a subset.

## Matched By and Submitted By columns

On the Review tab (separate from the Match Suggestions subtab), two new columns now appear: **Matched By** and **Submitted By**. These show which user matched and submitted each transaction, giving you an audit trail without having to dig through system notes.

## System notes are now more searchable

System notes for matching and reconciliation activity are now available on the open transaction record under the System Information subtab. Two fields are now searchable in saved searches:

- **Reconciliation Status**
- **Date Reconciled**

This makes it possible to build saved searches that report on reconciliation activity across transactions without opening each record individually.

## Sensitive information notice for imported bank data

A notice now appears on the Format Profile and Upload File pages when you import bank data. This is a visibility reminder that the imported data may contain sensitive financial information.

## Where to find these changes

All of these changes are on the Match Bank Data page at:

**Transactions > Bank > Bank Matching and Reconciliation > Match Bank Data**

If you access bank reconciliation through a different path, look for the same page. The Match Suggestions subtab and renamed elements will appear once your account is on the 2026.2 release.

For a focused guide on using the new Match Suggestions tab, see [How to Use the Match Suggestions Tab in NetSuite Bank Reconciliation](/resources/netsuite-bank-reconciliation-match-suggestions).

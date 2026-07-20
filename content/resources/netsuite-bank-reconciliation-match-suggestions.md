---
title: "How to Use the Match Suggestions Tab in NetSuite Bank Reconciliation"
description: "NetSuite 2026.2 replaced the Review subtab on the Match Bank Data page with a new Match Suggestions subtab. Here is how to navigate to it, what the five suggested actions mean, and what else changed on the page."
category: "Administration"
tags: ["Administration", "Banking", "Accounting"]
publishedAt: "2026-07-21"
linkedinDay: 25
---

## What changed in 2026.2

The Match Bank Data page in NetSuite 2026.2 has a new **Match Suggestions** subtab that replaces the old Review subtab. Along with this, several tab names and button labels changed. If you did bank reconciliation before 2026.2, the page looks different.

## Step 1 — Navigate to Match Bank Data

Go to **Transactions > Bank > Bank Matching and Reconciliation > Match Bank Data**.

## Step 2 — Find the Match Suggestions subtab

On the Match Bank Data page, look for the **Match Suggestions** subtab. This is where NetSuite displays proposed matches for your imported bank transactions. It replaces the Review subtab that appeared in previous versions.

## Step 3 — Review each suggestion and choose an action

For each suggested match, NetSuite offers five possible actions:

| Action | What it does |
|---|---|
| **Match Transaction** | Confirms the suggested match between the bank line and the NetSuite transaction |
| **Review Match Options** | Shows other possible matches before you commit |
| **Apply Payment** | Applies the bank transaction as a payment against an open invoice or payable |
| **Review Payment Options** | Shows other payment options before you commit |
| **Create** | Creates a new transaction to match against the bank line |

Match Suggestions works for both sides of reconciliation. Suggestions can cover open invoices on the AR side and open payables on the AP side, not just inbound bank lines.

## Step 4 — Submit with the updated button

Once you have matched a transaction, click **Match and Submit** (previously labeled "Match") to confirm and record the match. To clear a match, click **Clear and Submit** (previously labeled "Clear").

The rename reflects that the action now submits automatically rather than requiring a separate confirmation step.

## Tab names that changed

Two tabs on the Match Bank Data page were renamed in 2026.2:

| Before | Now |
|---|---|
| "To Be Matched" | "Transactions to Match" |
| "Excluded" | "Excluded Transactions" |

The underlying content is the same. Only the labels changed.

## Other changes on the page

**Action buttons above and below the list** — Buttons now appear at the top and bottom of the transaction list. For long lists, you no longer have to scroll to the bottom to take action.

**Filter chips** — New filter chips let you narrow the transaction list without leaving the page.

**Matched By and Submitted By columns** — On the Review tab, two new columns show which user matched and submitted each transaction. This gives you an audit trail directly in the reconciliation view.

**System notes now searchable** — Reconciliation Status and Date Reconciled are now searchable fields in saved searches. You can build reports on reconciliation activity without opening individual records. Access this on the open transaction record under the System Information subtab.

For background on all the bank reconciliation changes in 2026.2, see [NetSuite Bank Reconciliation Changed Significantly in 2026.2: What Is Different](/blog/netsuite-bank-reconciliation-changes-2026-2).

---
title: "How to Use Payment Runs in NetSuite to Process Multiple Vendor Payments"
description: "Payment Runs is a new NetSuite 2026.2 feature that groups vendor bills, credits, journal entries, and expense reports into a single reviewed and approved payment workflow."
category: "Administration"
tags: ["Administration", "Accounting", "AP"]
publishedAt: "2026-07-21"
linkedinDay: 22
---

## What is a Payment Run?

A Payment Run is a new AP transaction type introduced in NetSuite 2026.2. Instead of paying each vendor bill one at a time, you add multiple payables to a single Payment Run, review the batch, get approvals, and process everything together.

A single Payment Run can include any combination of:
- Vendor bills
- Vendor credits
- Journal entries
- Expense reports
- Bill payments

NetSuite processes the payments using the Bulk Processing Framework. After processing, each source transaction shows the related payment activity on its record, so you can trace which Payment Run settled a given bill without searching through payment history.

## The four stages of a Payment Run

**Stage 1 — Prepare**

Create the Payment Run and add the payables you want to include. You can mix record types freely. This is also your first opportunity to review for duplicates.

**Stage 2 — Review**

Before any payment is processed, the full batch is available for review. Remove any items that do not belong in this run, verify totals, and check for duplicate entries. No payment leaves NetSuite until this stage is complete and approved.

**Stage 3 — Approve**

If your account uses an approval workflow for AP, the Payment Run routes through it here. Approvers see the full batch, not individual records, before giving the go-ahead.

**Stage 4 — Process**

NetSuite executes the payments. Each source transaction is updated with the related payment activity from the run.

## What Payment Runs integrate with

Payment Runs are a standard NetSuite record type. They support:

- **Permissions and roles** — define who can create, review, approve, and process payment runs
- **Approval workflows** — use your existing NetSuite approval logic
- **Custom fields and custom segments** — add additional tracking data to payment runs
- **Saved searches** — report on payment run status, amounts, and history
- **SuiteScript** — automate or extend payment runs with scripts
- **REST web services** — integrate with external systems that trigger or read payment runs
- **CSV import** — import payment run data in bulk

## Why use Payment Runs instead of paying bills individually

**Efficiency.** Processing a batch of vendor payments in one workflow is significantly faster than opening and paying each bill separately, especially for AP teams with high transaction volumes.

**Reduced duplicate payment risk.** When each payment is an independent transaction, it is easy to accidentally process the same bill twice. The Payment Run review stage makes the full batch visible before anything is paid, giving you a clear opportunity to catch duplicates.

**Better traceability.** Related payment activity appears on source transactions after processing. You can see at a glance which Payment Run settled a bill without digging through transaction history.

## Availability

Payment Runs is new in NetSuite 2026.2. If you do not see it in your account, confirm that your account has been upgraded to the 2026.2 release.

For background on the feature and why it was introduced, see [NetSuite Payment Runs: A New AP Workflow for Paying Multiple Vendors at Once](/blog/netsuite-payment-runs-2026-2).

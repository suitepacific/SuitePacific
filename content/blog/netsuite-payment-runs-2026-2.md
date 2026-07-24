---
title: "NetSuite Payment Runs: A New AP Workflow for Paying Multiple Vendors at Once"
description: "NetSuite 2026.2 introduces Payment Runs, an AP feature that lets you prepare, review, approve, and process multiple vendor payments in a single workflow instead of one bill at a time."
date: "2026-07-21"
tags: ["Accounting", "Administration", "NetSuite Tips"]
---

If you process vendor payments in NetSuite, the process is usually the same: open a bill, pay it, move to the next one. For teams handling dozens or hundreds of bills each week, that manual repetition adds up to a lot of hours.

NetSuite 2026.2 introduces **Payment Runs**, a new AP feature that groups multiple payables together for processing in one workflow.

## What a Payment Run includes

A single Payment Run can contain any combination of:

- Vendor bills
- Vendor credits
- Journal entries
- Expense reports
- Bill payments

You add whatever payables belong together, review them as a batch, get approvals, and process everything at once.

## How the workflow works

Payment Runs follows a four-stage workflow:

**Prepare:** Create the payment run and add the payables you want to include. You can combine any of the record types listed above in a single run.

**Review:** Before any payment goes out, the full batch is available for review. This is where you catch errors, remove duplicate entries, or pull out items that should go on a different run.

**Approve:** The payment run routes through your standard NetSuite approval workflow before processing begins.

**Process:** NetSuite executes the payments using the Bulk Processing Framework. After processing, each source transaction (vendor bill, expense report, etc.) shows the related payment activity on its record.

## Why this matters

Two things make Payment Runs worth paying attention to.

**Efficiency.** Paying vendors in batch rather than one at a time saves significant time for AP teams with high transaction volumes. The repetition of opening each bill individually, initiating a payment, and moving on is replaced with a single workflow.

**Reduced duplicate payment risk.** When each payment is an independent transaction, it is easy to accidentally process the same bill twice, especially if multiple people work in the same account. Payment Runs puts the full batch in front of a reviewer before anything is paid, giving you a chance to catch duplicates before they become a problem.

## What Payment Runs works with

Payment Runs is designed to work with the rest of NetSuite from the start:

- Custom roles and permissions (control who can create, review, approve, and process)
- Approval workflows
- Custom fields and custom segments
- Sequential numbering
- Saved searches
- SuiteScript
- REST web services
- CSV import

It is a standard NetSuite record type, not a workaround. You can build scripts around it, report on it, and include it in your existing automation the same way you would with any other NetSuite transaction.

## Who this is for

Payment Runs is most useful for AP teams that process a high volume of vendor payments on a regular schedule. If your team currently processes bills one at a time and you are dealing with duplicate payment risk or manual inefficiency, this feature is worth evaluating.

For NetSuite administrators: Payment Runs supports custom roles and permissions, so you can define exactly who has access to each stage of the workflow before rolling it out.

Payment Runs is new in 2026.2. If you do not see it in your account, confirm that your account has been upgraded to the 2026.2 release.

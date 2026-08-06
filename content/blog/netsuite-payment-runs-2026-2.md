---
title: "NetSuite Payment Runs: A New AP Workflow for Paying Multiple Vendors at Once"
description: "NetSuite 2026.2 introduces Payment Runs, an AP feature that lets you prepare, review, approve, and process multiple vendor payments in a single workflow instead of one bill at a time."
date: "2026-07-21"
updated: "2026-08-05"
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

<figure style="margin:1.75rem 0">
<svg viewBox="0 0 680 86" xmlns="http://www.w3.org/2000/svg" style="width:100%;max-width:680px;display:block;font-family:system-ui,-apple-system,sans-serif">
  <defs>
    <marker id="prb-arrow" markerWidth="7" markerHeight="7" refX="5" refY="3" orient="auto"><path d="M0,0 L0,6 L7,3 z" fill="#4f6fb0"/></marker>
  </defs>
  <text x="340" y="13" text-anchor="middle" font-size="10" font-weight="700" fill="#14306b" letter-spacing="0.05em">PAYMENT RUN: FOUR-STAGE WORKFLOW</text>
  <rect x="0" y="22" width="144" height="58" rx="7" fill="#eef2fb" stroke="#4f7fff" stroke-width="1.5"/>
  <rect x="0" y="22" width="144" height="22" rx="7" fill="#0b1f4d"/>
  <rect x="0" y="34" width="144" height="10" fill="#0b1f4d"/>
  <text x="72" y="35" text-anchor="middle" font-size="10" font-weight="700" fill="#eef2fb">① Prepare</text>
  <text x="72" y="55" text-anchor="middle" font-size="8.5" fill="#4f6fb0">Add payables to run</text>
  <text x="72" y="68" text-anchor="middle" font-size="8.5" fill="#4f6fb0">Bills · credits · journals</text>
  <line x1="144" y1="51" x2="162" y2="51" stroke="#4f6fb0" stroke-width="1.5" marker-end="url(#prb-arrow)"/>
  <rect x="164" y="22" width="144" height="58" rx="7" fill="#eef2fb" stroke="#4f7fff" stroke-width="1.5"/>
  <rect x="164" y="22" width="144" height="22" rx="7" fill="#0b1f4d"/>
  <rect x="164" y="34" width="144" height="10" fill="#0b1f4d"/>
  <text x="236" y="35" text-anchor="middle" font-size="10" font-weight="700" fill="#eef2fb">② Review</text>
  <text x="236" y="55" text-anchor="middle" font-size="8.5" fill="#4f6fb0">Full batch visible</text>
  <text x="236" y="68" text-anchor="middle" font-size="8.5" fill="#4f6fb0">Remove duplicates</text>
  <line x1="308" y1="51" x2="326" y2="51" stroke="#4f6fb0" stroke-width="1.5" marker-end="url(#prb-arrow)"/>
  <rect x="328" y="22" width="144" height="58" rx="7" fill="#eef2fb" stroke="#4f7fff" stroke-width="1.5"/>
  <rect x="328" y="22" width="144" height="22" rx="7" fill="#0b1f4d"/>
  <rect x="328" y="34" width="144" height="10" fill="#0b1f4d"/>
  <text x="400" y="35" text-anchor="middle" font-size="10" font-weight="700" fill="#eef2fb">③ Approve</text>
  <text x="400" y="55" text-anchor="middle" font-size="8.5" fill="#4f6fb0">AP approval workflow</text>
  <text x="400" y="68" text-anchor="middle" font-size="8.5" fill="#4f6fb0">Sees full batch</text>
  <line x1="472" y1="51" x2="490" y2="51" stroke="#4f6fb0" stroke-width="1.5" marker-end="url(#prb-arrow)"/>
  <rect x="492" y="22" width="188" height="58" rx="7" fill="#060f26" stroke="#4f7fff" stroke-width="1.5"/>
  <rect x="492" y="22" width="188" height="22" rx="7" fill="#4f7fff"/>
  <rect x="492" y="34" width="188" height="10" fill="#4f7fff"/>
  <text x="586" y="35" text-anchor="middle" font-size="10" font-weight="700" fill="#fff">④ Process</text>
  <text x="586" y="55" text-anchor="middle" font-size="8.5" fill="#8aa2d6">Bulk Processing Framework</text>
  <text x="586" y="68" text-anchor="middle" font-size="8.5" fill="#8aa2d6">All payments execute</text>
</svg>
</figure>

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

If you need help configuring Payment Runs or reviewing your account after the 2026.2 release, [SuitePacific's post-go-live support](/netsuite-post-go-live-support) covers release review and ongoing account maintenance.

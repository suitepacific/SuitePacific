---
title: "How to Use Payment Runs in NetSuite to Process Multiple Vendor Payments"
description: "Payment Runs is a new NetSuite 2026.2 feature that groups vendor bills, credits, journal entries, and expense reports into a single reviewed and approved payment workflow."
category: "Administration"
tags: ["Administration", "Accounting", "AP"]
publishedAt: "2026-07-21"
updatedAt: "2026-08-15"
linkedinDay: 22
---

<div style="background:#eef2fb;border:1px solid #b2c2e6;border-radius:10px;padding:1.25rem 1.5rem;margin:2rem 0;font-family:system-ui,-apple-system,sans-serif">
<p style="margin:0 0 0.5rem;font-size:0.7rem;font-weight:700;color:#4f7fff;text-transform:uppercase;letter-spacing:0.08em">Quick answer</p>
<p style="margin:0;color:#14306b;font-size:0.9rem;line-height:1.6">A Payment Run in NetSuite is a feature that groups multiple payables into a single reviewed and approved payment batch. It covers vendor bills, vendor credits, journal entries, and expense reports. A Payment Run moves through four stages: Creation (select the payables to include), Review (verify amounts, vendors, and payment methods), Approval (route through workflow if approval is required), and Processing (generate the payments). Payment Runs integrate with Electronic Bank Payments for EFT and ACH disbursements and with check printing. Using Payment Runs instead of paying bills individually gives AP teams a review checkpoint before funds leave the account.</p>
</div>

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

<figure style="margin:1.75rem 0">
<svg viewBox="0 0 680 110" xmlns="http://www.w3.org/2000/svg" style="width:100%;max-width:680px;display:block;font-family:system-ui,-apple-system,sans-serif">
  <defs>
    <marker id="pr-arrow" markerWidth="7" markerHeight="7" refX="5" refY="3" orient="auto"><path d="M0,0 L0,6 L7,3 z" fill="#4f6fb0"/></marker>
  </defs>
  <text x="340" y="14" text-anchor="middle" font-size="10" font-weight="700" fill="#14306b" letter-spacing="0.05em">PAYMENT RUN: FOUR-STAGE WORKFLOW</text>
  <!-- Stage 1 -->
  <rect x="0" y="24" width="144" height="64" rx="7" fill="#eef2fb" stroke="#4f7fff" stroke-width="1.5"/>
  <rect x="0" y="24" width="144" height="24" rx="7" fill="#0b1f4d"/>
  <rect x="0" y="38" width="144" height="10" fill="#0b1f4d"/>
  <text x="72" y="39" text-anchor="middle" font-size="10" font-weight="700" fill="#eef2fb">① Prepare</text>
  <text x="72" y="58" text-anchor="middle" font-size="8.5" fill="#4f6fb0">Add payables to run</text>
  <text x="72" y="70" text-anchor="middle" font-size="8.5" fill="#4f6fb0">Bills · credits · journals</text>
  <text x="72" y="82" text-anchor="middle" font-size="8.5" fill="#4f6fb0">expense reports</text>
  <line x1="144" y1="56" x2="162" y2="56" stroke="#4f6fb0" stroke-width="1.5" marker-end="url(#pr-arrow)"/>
  <!-- Stage 2 -->
  <rect x="164" y="24" width="144" height="64" rx="7" fill="#eef2fb" stroke="#4f7fff" stroke-width="1.5"/>
  <rect x="164" y="24" width="144" height="24" rx="7" fill="#0b1f4d"/>
  <rect x="164" y="38" width="144" height="10" fill="#0b1f4d"/>
  <text x="236" y="39" text-anchor="middle" font-size="10" font-weight="700" fill="#eef2fb">② Review</text>
  <text x="236" y="58" text-anchor="middle" font-size="8.5" fill="#4f6fb0">Full batch visible before</text>
  <text x="236" y="70" text-anchor="middle" font-size="8.5" fill="#4f6fb0">payment leaves NetSuite</text>
  <text x="236" y="82" text-anchor="middle" font-size="8.5" fill="#4f6fb0">Remove · verify · check dupes</text>
  <line x1="308" y1="56" x2="326" y2="56" stroke="#4f6fb0" stroke-width="1.5" marker-end="url(#pr-arrow)"/>
  <!-- Stage 3 -->
  <rect x="328" y="24" width="144" height="64" rx="7" fill="#eef2fb" stroke="#4f7fff" stroke-width="1.5"/>
  <rect x="328" y="24" width="144" height="24" rx="7" fill="#0b1f4d"/>
  <rect x="328" y="38" width="144" height="10" fill="#0b1f4d"/>
  <text x="400" y="39" text-anchor="middle" font-size="10" font-weight="700" fill="#eef2fb">③ Approve</text>
  <text x="400" y="58" text-anchor="middle" font-size="8.5" fill="#4f6fb0">Approval workflow routes</text>
  <text x="400" y="70" text-anchor="middle" font-size="8.5" fill="#4f6fb0">full batch to approvers</text>
  <text x="400" y="82" text-anchor="middle" font-size="8.5" fill="#4f6fb0">not individual records</text>
  <line x1="472" y1="56" x2="490" y2="56" stroke="#4f6fb0" stroke-width="1.5" marker-end="url(#pr-arrow)"/>
  <!-- Stage 4 -->
  <rect x="492" y="24" width="188" height="64" rx="7" fill="#060f26" stroke="#4f7fff" stroke-width="1.5"/>
  <rect x="492" y="24" width="188" height="24" rx="7" fill="#4f7fff"/>
  <rect x="492" y="38" width="188" height="10" fill="#4f7fff"/>
  <text x="586" y="39" text-anchor="middle" font-size="10" font-weight="700" fill="#fff">④ Process</text>
  <text x="586" y="58" text-anchor="middle" font-size="8.5" fill="#8aa2d6">Bulk Processing Framework</text>
  <text x="586" y="70" text-anchor="middle" font-size="8.5" fill="#8aa2d6">executes all payments</text>
  <text x="586" y="82" text-anchor="middle" font-size="8.5" fill="#8aa2d6">Source records updated</text>
</svg>
<figcaption style="text-align:center;font-size:0.78rem;color:#8aa2d6;margin-top:0.4rem">No payment leaves NetSuite until the Review and Approve stages are complete.</figcaption>
</figure>

**Stage 1: Prepare**

Create the Payment Run and add the payables you want to include. You can mix record types freely. This is also your first opportunity to review for duplicates.

**Stage 2: Review**

Before any payment is processed, the full batch is available for review. Remove any items that do not belong in this run, verify totals, and check for duplicate entries. No payment leaves NetSuite until this stage is complete and approved.

**Stage 3: Approve**

If your account uses an approval workflow for AP, the Payment Run routes through it here. Approvers see the full batch, not individual records, before giving the go-ahead.

**Stage 4: Process**

NetSuite executes the payments. Each source transaction is updated with the related payment activity from the run.

## What Payment Runs integrate with

Payment Runs are a standard NetSuite record type. They support:

- **Permissions and roles:** define who can create, review, approve, and process payment runs
- **Approval workflows:** use your existing NetSuite approval logic
- **Custom fields and custom segments:** add additional tracking data to payment runs
- **Saved searches:** report on payment run status, amounts, and history
- **SuiteScript:** automate or extend payment runs with scripts
- **REST web services:** integrate with external systems that trigger or read payment runs
- **CSV import:** import payment run data in bulk

## Why use Payment Runs instead of paying bills individually

**Efficiency.** Processing a batch of vendor payments in one workflow is significantly faster than opening and paying each bill separately, especially for AP teams with high transaction volumes.

**Reduced duplicate payment risk.** When each payment is an independent transaction, it is easy to accidentally process the same bill twice. The Payment Run review stage makes the full batch visible before anything is paid, giving you a clear opportunity to catch duplicates.

**Better traceability.** Related payment activity appears on source transactions after processing. You can see at a glance which Payment Run settled a bill without digging through transaction history.

## Availability

Payment Runs is new in NetSuite 2026.2. If you do not see it in your account, confirm that your account has been upgraded to the 2026.2 release.

For background on the feature and why it was introduced, see [NetSuite Payment Runs: A New AP Workflow for Paying Multiple Vendors at Once](/blog/netsuite-payment-runs-2026-2).

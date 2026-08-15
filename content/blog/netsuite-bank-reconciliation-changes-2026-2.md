---
title: "NetSuite Bank Reconciliation Changed Significantly in 2026.2: What Is Different"
description: "NetSuite 2026.2 overhauled the Match Bank Data page with a new Match Suggestions subtab, renamed tabs and buttons, filter chips, and audit columns. Here is everything that changed."
date: "2026-07-21"
updated: "2026-08-05"
tags: ["Banking", "Accounting", "Administration"]
---

If you do bank reconciliation in NetSuite, the Match Bank Data page looks different in 2026.2. Several tabs have been renamed, buttons have changed, and a new subtab has replaced the old Review tab. Here is a complete rundown of what changed.

<div style="background:#eef2fb;border:1px solid #b2c2e6;border-radius:10px;padding:1.25rem 1.5rem;margin:2rem 0;font-family:system-ui,-apple-system,sans-serif">
<p style="margin:0 0 0.5rem;font-size:0.7rem;font-weight:700;color:#4f7fff;text-transform:uppercase;letter-spacing:0.08em">Quick answer</p>
<p style="margin:0;color:#14306b;font-size:0.9rem;line-height:1.6">The Match Bank Data page in NetSuite has been redesigned in 2026.2. Several tabs have been renamed, the old Review tab has been replaced with a new subtab structure, and some buttons have changed labels or positions. The Matched subtab is now part of a reorganized interface, and the workflow for reviewing and confirming matched transactions follows a different path than in previous releases. These are interface changes, not functional ones: the reconciliation process itself is unchanged. Finance teams that perform bank reconciliation regularly should review the new interface in Sandbox before 2026.2 reaches Production, update documented close procedures to reflect the new tab names, and brief team members so the interface change is not mistaken for a system error when first encountered in Production.</p>
</div>


<figure style="margin:1.75rem 0">
<svg viewBox="0 0 680 144" xmlns="http://www.w3.org/2000/svg" style="width:100%;max-width:680px;display:block;font-family:system-ui,-apple-system,sans-serif">
  <defs>
    <marker id="brc-arrow" markerWidth="7" markerHeight="7" refX="5" refY="3" orient="auto"><path d="M0,0 L0,6 L7,3 z" fill="#4f7fff"/></marker>
  </defs>
  <text x="340" y="14" text-anchor="middle" font-size="10" font-weight="700" fill="#14306b" letter-spacing="0.05em">MATCH BANK DATA PAGE: KEY CHANGES IN 2026.2</text>
  <!-- Before: old Review tab -->
  <rect x="0" y="22" width="290" height="116" rx="9" fill="#f8f9fc" stroke="#d7e0f3" stroke-width="1.5"/>
  <rect x="0" y="22" width="290" height="26" rx="9" fill="#4f6fb0"/>
  <rect x="0" y="38" width="290" height="10" fill="#4f6fb0"/>
  <text x="145" y="40" text-anchor="middle" font-size="9.5" font-weight="700" fill="#eef2fb">Before 2026.2</text>
  <text x="145" y="60" text-anchor="middle" font-size="9" fill="#14306b">Review subtab</text>
  <text x="145" y="76" text-anchor="middle" font-size="8.5" fill="#4f6fb0">List of unmatched bank lines</text>
  <text x="145" y="90" text-anchor="middle" font-size="8.5" fill="#4f6fb0">No structured suggested actions</text>
  <text x="145" y="104" text-anchor="middle" font-size="8.5" fill="#4f6fb0">Manual matching only</text>
  <text x="145" y="127" text-anchor="middle" font-size="8" fill="#8aa2d6">Covers AR only</text>
  <!-- Arrow -->
  <line x1="290" y1="80" x2="390" y2="80" stroke="#4f7fff" stroke-width="2" marker-end="url(#brc-arrow)"/>
  <text x="340" y="73" text-anchor="middle" font-size="8" font-weight="700" fill="#4f7fff">2026.2</text>
  <!-- After: Match Suggestions -->
  <rect x="392" y="22" width="288" height="116" rx="9" fill="#eef2fb" stroke="#4f7fff" stroke-width="2"/>
  <rect x="392" y="22" width="288" height="26" rx="9" fill="#0b1f4d"/>
  <rect x="392" y="38" width="288" height="10" fill="#0b1f4d"/>
  <text x="536" y="40" text-anchor="middle" font-size="9.5" font-weight="700" fill="#eef2fb">After 2026.2</text>
  <text x="536" y="60" text-anchor="middle" font-size="9" font-weight="700" fill="#14306b">Match Suggestions subtab</text>
  <text x="536" y="74" text-anchor="middle" font-size="8" fill="#4f6fb0">Match Transaction · Review Match Options</text>
  <text x="536" y="87" text-anchor="middle" font-size="8" fill="#4f6fb0">Apply Payment · Review Payment Options</text>
  <text x="536" y="100" text-anchor="middle" font-size="8" fill="#4f6fb0">Create (new transaction)</text>
  <text x="536" y="127" text-anchor="middle" font-size="8" fill="#16a34a">Covers both AR and AP</text>
</svg>
<figcaption style="text-align:center;font-size:0.78rem;color:#8aa2d6;margin-top:0.4rem">Match Suggestions gives each unmatched bank line five structured resolution options rather than a flat review list.</figcaption>
</figure>

## What Replaced the Review Subtab in NetSuite 2026.2?

The biggest change on the Match Bank Data page is the new **Match Suggestions** subtab. It replaces the old Review subtab.

Match Suggestions shows NetSuite's proposed matches for imported bank transactions. For each suggestion, you can choose from five actions:

- **Match Transaction:** confirm the suggested match
- **Review Match Options:** see other possible matches before deciding
- **Apply Payment:** apply the bank transaction as a payment against an open invoice or payable
- **Review Payment Options:** see other payment options before deciding
- **Create:** create a new transaction type to match against

This is more than a rename. The suggested actions give you a structured workflow for each unmatched bank line instead of just a list to review.

## Do Match Suggestions Cover Both AR and AP?

Match Suggestions are not limited to your bank side. NetSuite 2026.2 also introduces suggestions for applying payments against:

- **Open invoices** (accounts receivable)
- **Open payables** (accounts payable)

This means the suggestion engine works across both sides of your reconciliation, not just incoming bank lines.

## Which Tab and Button Names Changed in Match Bank Data?

Several elements of the Match Bank Data page have been renamed:

| Before 2026.2 | From 2026.2 |
|---|---|
| "To Be Matched" tab | "Transactions to Match" |
| "Excluded" tab | "Excluded Transactions" |
| "Match" button | "Match and Submit" |
| "Clear" button | "Clear and Submit" |

The button renames reflect that matching now automatically submits the action, removing a separate confirmation step.

## Where Do Action Buttons Appear in the Updated Interface?

In previous versions, action buttons were only at the bottom of the transaction list. In 2026.2, they appear both above and below. For long lists, this means you no longer have to scroll to the bottom to take action.

## What Are the New Filter Chips in Match Bank Data?

The Match Bank Data page now includes filter chips to narrow the transaction list. This helps when you have a large number of unmatched bank lines and want to focus on a subset.

## What Are the Matched By and Submitted By Columns?

On the Review tab (separate from the Match Suggestions subtab), two new columns now appear: **Matched By** and **Submitted By**. These show which user matched and submitted each transaction, giving you an audit trail without having to dig through system notes.

## How Did System Notes Become More Searchable?

System notes for matching and reconciliation activity are now available on the open transaction record under the System Information subtab. Two fields are now searchable in saved searches:

- **Reconciliation Status**
- **Date Reconciled**

This makes it possible to build saved searches that report on reconciliation activity across transactions without opening each record individually.

## What Is the Sensitive Information Notice for Imported Bank Data?

A notice now appears on the Format Profile and Upload File pages when you import bank data. This is a visibility reminder that the imported data may contain sensitive financial information.

## Where Do You Find These Bank Reconciliation Changes?

All of these changes are on the Match Bank Data page at:

**Transactions > Bank > Bank Matching and Reconciliation > Match Bank Data**

If you access bank reconciliation through a different path, look for the same page. The Match Suggestions subtab and renamed elements will appear once your account is on the 2026.2 release.

For a focused guide on using the new Match Suggestions tab, see [How to Use the Match Suggestions Tab in NetSuite Bank Reconciliation](/resources/netsuite-bank-reconciliation-match-suggestions).

If you need help reviewing your account after the 2026.2 release, [SuitePacific's post-go-live support](/netsuite-post-go-live-support) covers release review and account maintenance.

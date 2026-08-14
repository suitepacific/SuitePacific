---
title: "How to Use the Match Suggestions Tab in NetSuite Bank Reconciliation"
description: "NetSuite 2026.2 replaced the Review subtab on the Match Bank Data page with a new Match Suggestions subtab. Here is how to navigate to it, what the five suggested actions mean, and what else changed on the page."
category: "Administration"
tags: ["Administration", "Banking", "Accounting"]
publishedAt: "2026-07-21"
updatedAt: "2026-08-15"
linkedinDay: 25
---

<div style="background:#eef2fb;border:1px solid #b2c2e6;border-radius:10px;padding:1.25rem 1.5rem;margin:2rem 0;font-family:system-ui,-apple-system,sans-serif">
<p style="margin:0 0 0.5rem;font-size:0.7rem;font-weight:700;color:#4f7fff;text-transform:uppercase;letter-spacing:0.08em">Quick answer</p>
<p style="margin:0;color:#14306b;font-size:0.9rem;line-height:1.6">NetSuite 2026.2 replaced the Review subtab on the Match Bank Data page with a new Match Suggestions subtab. The Match Suggestions subtab presents system-suggested matches between bank transactions and NetSuite records. Five actions are available for each suggestion: Match (accept and link the records), Match All (accept all suggestions at once), Unmatch (break an existing match), Resolve (mark as reconciled without a matching record), and Ignore (dismiss the suggestion without action). The Submit button was renamed to Update. Navigate to Transactions > Bank > Match Bank Data and select the Match Suggestions tab to access these options.</p>
</div>

## What Changed in NetSuite 2026.2 Bank Reconciliation?

The Match Bank Data page in NetSuite 2026.2 has a new **Match Suggestions** subtab that replaces the old Review subtab. Along with this, several tab names and button labels changed. If you did bank reconciliation before 2026.2, the page looks different.

<figure style="margin:1.75rem 0">
<svg viewBox="0 0 680 120" xmlns="http://www.w3.org/2000/svg" style="width:100%;max-width:680px;display:block;font-family:system-ui,-apple-system,sans-serif">
  <defs>
    <marker id="ms-arrow" markerWidth="7" markerHeight="7" refX="5" refY="3" orient="auto"><path d="M0,0 L0,6 L7,3 z" fill="#4f7fff"/></marker>
  </defs>
  <rect x="0" y="0" width="270" height="120" rx="9" fill="#f8f9fc" stroke="#d7e0f3" stroke-width="1.5"/>
  <rect x="0" y="0" width="270" height="24" rx="9" fill="#4f6fb0"/>
  <rect x="0" y="14" width="270" height="10" fill="#4f6fb0"/>
  <text x="135" y="16" text-anchor="middle" font-size="9.5" font-weight="700" fill="#eef2fb">Before 2026.2: Review subtab</text>
  <text x="135" y="40" text-anchor="middle" font-size="8.5" fill="#14306b">List of unmatched bank lines</text>
  <text x="135" y="55" text-anchor="middle" font-size="8.5" fill="#14306b">No suggested action structure</text>
  <text x="135" y="70" text-anchor="middle" font-size="8.5" fill="#14306b">AR only</text>
  <line x1="270" y1="60" x2="350" y2="60" stroke="#4f7fff" stroke-width="2" marker-end="url(#ms-arrow)"/>
  <text x="310" y="52" text-anchor="middle" font-size="8" font-weight="700" fill="#4f7fff">2026.2</text>
  <rect x="352" y="0" width="328" height="120" rx="9" fill="#eef2fb" stroke="#4f7fff" stroke-width="2"/>
  <rect x="352" y="0" width="328" height="24" rx="9" fill="#0b1f4d"/>
  <rect x="352" y="14" width="328" height="10" fill="#0b1f4d"/>
  <text x="516" y="16" text-anchor="middle" font-size="9.5" font-weight="700" fill="#eef2fb">After 2026.2: Match Suggestions</text>
  <text x="516" y="38" text-anchor="middle" font-size="8.5" fill="#14306b">Five actions per unmatched bank line:</text>
  <text x="516" y="53" text-anchor="middle" font-size="8" fill="#4f6fb0">Match Transaction · Review Match Options</text>
  <text x="516" y="67" text-anchor="middle" font-size="8" fill="#4f6fb0">Apply Payment · Review Payment Options · Create</text>
  <text x="516" y="92" text-anchor="middle" font-size="8" fill="#16a34a">Covers both AR and AP</text>
</svg>
</figure>

## Step 1: Navigate to Match Bank Data

Go to **Transactions > Bank > Bank Matching and Reconciliation > Match Bank Data**.

## Step 2: Find the Match Suggestions subtab

On the Match Bank Data page, look for the **Match Suggestions** subtab. This is where NetSuite displays proposed matches for your imported bank transactions. It replaces the Review subtab that appeared in previous versions.

## Step 3: Review each suggestion and choose an action

For each suggested match, NetSuite offers five possible actions:

| Action | What it does |
|---|---|
| **Match Transaction** | Confirms the suggested match between the bank line and the NetSuite transaction |
| **Review Match Options** | Shows other possible matches before you commit |
| **Apply Payment** | Applies the bank transaction as a payment against an open invoice or payable |
| **Review Payment Options** | Shows other payment options before you commit |
| **Create** | Creates a new transaction to match against the bank line |

Match Suggestions works for both sides of reconciliation. Suggestions can cover open invoices on the AR side and open payables on the AP side, not just inbound bank lines.

## Step 4: Submit with the updated button

Once you have matched a transaction, click **Match and Submit** (previously labeled "Match") to confirm and record the match. To clear a match, click **Clear and Submit** (previously labeled "Clear").

The rename reflects that the action now submits automatically rather than requiring a separate confirmation step.

## Which Tab Names Changed in Match Bank Data?

Two tabs on the Match Bank Data page were renamed in 2026.2:

| Before | Now |
|---|---|
| "To Be Matched" | "Transactions to Match" |
| "Excluded" | "Excluded Transactions" |

The underlying content is the same. Only the labels changed.

## What Other Changes Were Made to the Match Bank Data Page?

**Action buttons above and below the list:** Buttons now appear at the top and bottom of the transaction list. For long lists, you no longer have to scroll to the bottom to take action.

**Filter chips:** New filter chips let you narrow the transaction list without leaving the page.

**Matched By and Submitted By columns:** On the Review tab, two new columns show which user matched and submitted each transaction. This gives you an audit trail directly in the reconciliation view.

**System notes now searchable:** Reconciliation Status and Date Reconciled are now searchable fields in saved searches. You can build reports on reconciliation activity without opening individual records. Access this on the open transaction record under the System Information subtab.

For background on all the bank reconciliation changes in 2026.2, see [NetSuite Bank Reconciliation Changed Significantly in 2026.2: What Is Different](/blog/netsuite-bank-reconciliation-changes-2026-2).

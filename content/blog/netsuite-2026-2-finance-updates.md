---
title: "NetSuite 2026.2 Finance Updates: Payment Runs and the Redesigned Match Bank Data Page"
description: "Two significant finance workflow updates in 2026.2: Payment Runs for batch AP processing and a redesigned Match Bank Data page with a new Match Suggestions interface. Here is what changed and what it means for your finance team."
date: "2026-08-02"
updated: "2026-08-14"
tags: ["Finance", "Release Notes", "2026.2", "Accounts Payable"]
---

NetSuite 2026.2 includes two updates that directly change how finance teams process payments and reconcile bank transactions. Neither requires configuration changes to start using, but both change the interface your team works in every day.

<div style="background:#eef2fb;border:1px solid #b2c2e6;border-radius:10px;padding:1.25rem 1.5rem;margin:2rem 0;font-family:system-ui,-apple-system,sans-serif">
<p style="margin:0 0 0.5rem;font-size:0.7rem;font-weight:700;color:#4f7fff;text-transform:uppercase;letter-spacing:0.08em">Quick answer</p>
<p style="margin:0;color:#14306b;font-size:0.9rem;line-height:1.6">NetSuite 2026.2 includes two changes that affect how finance teams process payments and reconcile bank transactions. Payment Runs is a new AP feature that lets teams batch multiple vendor bills into a single review, approval, and payment workflow, replacing the bill-by-bill processing that required opening each transaction individually. The Match Bank Data page has been redesigned with renamed tabs, a new subtab structure replacing the old Review tab, and updated button labels. Neither change requires administrator configuration; both activate automatically after the 2026.2 update. Teams processing high volumes of vendor payments will see the most immediate impact from Payment Runs. Teams that reconcile bank accounts regularly should review the new Match Bank Data interface in Sandbox before 2026.2 reaches Production, and update any documented close procedures that reference the old tab names or button locations.</p>
</div>


This post covers what changed, what the new workflows look like, and what to communicate to your team before they encounter the changes on their own.

**Managing a NetSuite finance function and want to make sure your team is prepared for 2026.2?** SuitePacific works with NetSuite customers through release updates, including walkthroughs of new finance features in Sandbox before they go live in Production. [Contact us](/contact).

## What Is the Payment Runs Feature in NetSuite 2026.2?

### What it is

Payment Runs is a new feature in 2026.2 that allows finance teams to batch multiple payable documents together and process them through a single review, approval, and payment run.

Before Payment Runs, processing vendor payments required handling each document type separately. Vendor bills went through one process, credits through another, and journal entries and expense reports each had their own workflow. For finance teams processing high volumes of payables, this meant significant repetition across payment cycles.

With Payment Runs, the following document types can be included in a single batch:

- Vendor bills
- Vendor credits
- Journal entries
- Expense reports

### What the workflow looks like

A Payment Run groups the selected documents into one unit. The finance team reviews the batch together, approves it as a group, and processes the payment run as a single operation rather than working through each document individually.

This consolidation is most valuable for organizations with regular AP cycles: weekly or bi-weekly vendor payment runs where the same set of document types needs to be processed together. Instead of running separate processes for bills, credits, and expense reports, a single Payment Run handles the full cycle.

<figure style="margin:1.75rem 0">
<svg viewBox="0 0 680 210" xmlns="http://www.w3.org/2000/svg" style="width:100%;max-width:680px;display:block;font-family:system-ui,-apple-system,sans-serif">
  <defs>
    <marker id="arr2" markerWidth="7" markerHeight="7" refX="5" refY="3" orient="auto"><path d="M0,0 L0,6 L7,3 z" fill="#4f7fff"/></marker>
  </defs>
  <!-- Before -->
  <rect x="0" y="0" width="290" height="200" rx="10" fill="#fef2f2" stroke="#fca5a5" stroke-width="1.5"/>
  <text x="145" y="24" text-anchor="middle" font-size="10.5" font-weight="700" fill="#991b1b">Before 2026.2</text>
  <rect x="14" y="35" width="262" height="22" rx="5" fill="#fee2e2" stroke="#fca5a5" stroke-width="1"/>
  <text x="145" y="50" text-anchor="middle" font-size="9" fill="#7f1d1d">Vendor bills: process separately</text>
  <rect x="14" y="63" width="262" height="22" rx="5" fill="#fee2e2" stroke="#fca5a5" stroke-width="1"/>
  <text x="145" y="78" text-anchor="middle" font-size="9" fill="#7f1d1d">Vendor credits: process separately</text>
  <rect x="14" y="91" width="262" height="22" rx="5" fill="#fee2e2" stroke="#fca5a5" stroke-width="1"/>
  <text x="145" y="106" text-anchor="middle" font-size="9" fill="#7f1d1d">Journal entries: process separately</text>
  <rect x="14" y="119" width="262" height="22" rx="5" fill="#fee2e2" stroke="#fca5a5" stroke-width="1"/>
  <text x="145" y="134" text-anchor="middle" font-size="9" fill="#7f1d1d">Expense reports: process separately</text>
  <text x="145" y="170" text-anchor="middle" font-size="9" fill="#991b1b">4 separate review + approve + pay cycles</text>
  <!-- Arrow -->
  <text x="310" y="108" text-anchor="middle" font-size="22" fill="#6b7280">→</text>
  <!-- After -->
  <rect x="330" y="0" width="350" height="200" rx="10" fill="#f0fdf4" stroke="#86efac" stroke-width="1.5"/>
  <text x="505" y="24" text-anchor="middle" font-size="10.5" font-weight="700" fill="#14532d">Payment Run in 2026.2</text>
  <!-- Batch box -->
  <rect x="345" y="35" width="320" height="100" rx="8" fill="#dcfce7" stroke="#86efac" stroke-width="1"/>
  <text x="505" y="55" text-anchor="middle" font-size="9" font-weight="600" fill="#14532d">One batch</text>
  <text x="380" y="74" font-size="8.5" fill="#166534">Vendor bills + Vendor credits</text>
  <text x="380" y="90" font-size="8.5" fill="#166534">Journal entries + Expense reports</text>
  <text x="505" y="126" text-anchor="middle" font-size="8.5" fill="#166534">↓</text>
  <!-- Steps -->
  <text x="345" y="148" font-size="8.5" fill="#14532d">Review once</text>
  <text x="435" y="148" font-size="8.5" fill="#14532d">Approve once</text>
  <text x="530" y="148" font-size="8.5" fill="#14532d">Process once</text>
  <text x="505" y="180" text-anchor="middle" font-size="9" fill="#14532d">One cycle for the full AP batch</text>
</svg>
<figcaption style="text-align:center;font-size:0.78rem;color:#8aa2d6;margin-top:0.4rem">Payment Runs consolidate multiple payable document types into a single review, approval, and processing cycle.</figcaption>
</figure>

### What to communicate to your team

Finance team members who process AP payments will see Payment Runs as a new option in their workflow. Teams that have an established rhythm for processing payables should be briefed on the new batch approach so they understand how it relates to existing processes.

## What Changed in the Match Bank Data Interface?

### What changed

The Match Bank Data page received a redesigned interface in 2026.2. The Review subtab that was previously used to work through unmatched bank transactions has been replaced by a Match Suggestions interface.

The new interface presents each bank transaction alongside matching suggestions, with five actions available per transaction. This replaces the previous Review subtab workflow where transactions were reviewed and matched from a tab-based layout.

### What this means for bank reconciliation

The core task has not changed: finance teams are still matching imported bank transactions to existing NetSuite records or creating new records for unmatched transactions. What changed is the interface for doing that work.

The Match Suggestions approach surfaces potential matches alongside the transaction being reviewed, rather than requiring the user to navigate to a separate tab to find matches. The five available actions per transaction give users more options in a single view without switching between screens.

### What to communicate to your team

Team members responsible for bank reconciliation will notice the change when they open the Match Bank Data page. The new layout is different enough that a brief walkthrough before the team encounters it in Production is worth doing. Your Sandbox account already has the 2026.2 update; the Match Suggestions interface is available there now.

## How Should You Test These Features in Sandbox?

Both Payment Runs and the Match Bank Data redesign are available in Sandbox now. Before your team encounters them in Production:

- Walk through a Payment Run in Sandbox using representative vendor bills, credits, and expense reports
- Open the Match Bank Data page and work through the Match Suggestions interface with test bank transactions
- Identify any process documentation or team training that needs to be updated to reflect the new workflows

The underlying accounting does not change with either feature. The changes are in the workflow and interface, which means the risk is team members being unfamiliar with the new screens rather than any accounting outcome being different.

## How Can SuitePacific Help With 2026.2 Finance Updates?

Preparing finance teams for interface changes requires more than communicating that something looks different. If your team needs a Sandbox walkthrough of Payment Runs or the Match Bank Data redesign before 2026.2 reaches your Production environment, [contact SuitePacific](/contact). We work with NetSuite finance teams through release updates and can help your team build familiarity with new workflows before they go live.

---
title: "NetSuite Month-End Close Checklist: What Most Teams Miss"
description: "A practical NetSuite month-end close checklist covering the items specific to NetSuite that fall through the cracks: period locking, subledger reconciliation, unposted transactions, currency revaluation, and more."
date: "2026-07-01"
tags: ["NetSuite", "Reporting"]
---

Generic month-end close advice is easy to find. What's harder to find is what's specific to NetSuite: the things that behave differently than your old system, the steps that require clicking in a specific order, and the reports that only tell you something went wrong after you've already closed the period. This checklist covers those.

<div style="background:#eef2fb;border:1px solid #b2c2e6;border-radius:10px;padding:1.25rem 1.5rem;margin:2rem 0;font-family:system-ui,-apple-system,sans-serif">
<p style="margin:0 0 0.5rem;font-size:0.7rem;font-weight:700;color:#4f7fff;text-transform:uppercase;letter-spacing:0.08em">Quick answer</p>
<p style="margin:0;color:#14306b;font-size:0.9rem;line-height:1.6">The NetSuite month-end close has steps that behave differently from most ERP systems and that are not obvious without platform experience. The items that most commonly cause problems are: the distinction between a transaction date and its posting period, which determines which accounting period the transaction affects independently of the calendar date; the period locking sequence, which must close in the correct order across subsidiary ledgers; currency revaluation for open AR and AP balances in non-base currencies; received-not-billed accruals for inventory received but not yet invoiced; and the sequence for Fixed Asset Management depreciation runs. Unposted transactions, pending approval workflows, and scheduled scripts that touch balance-affecting records must also be verified before lock. The correct order of operations matters because actions taken out of sequence can create transactions in already-closed periods or produce incorrect period-end balances.</p>
</div>


<figure style="margin:1.75rem 0">
<svg viewBox="0 0 680 168" xmlns="http://www.w3.org/2000/svg" style="width:100%;max-width:680px;display:block;font-family:system-ui,-apple-system,sans-serif">
  <defs>
    <marker id="cl-arrow" markerWidth="7" markerHeight="7" refX="5" refY="3" orient="auto"><path d="M0,0 L0,6 L7,3 z" fill="#b2c2e6"/></marker>
  </defs>
  <text x="340" y="14" text-anchor="middle" font-size="10" font-weight="700" fill="#14306b" letter-spacing="0.05em">MONTH-END CLOSE SEQUENCE</text>
  <!-- Phase 1 -->
  <rect x="0" y="22" width="148" height="108" rx="7" fill="#eef2fb" stroke="#4f7fff" stroke-width="1.5"/>
  <rect x="0" y="22" width="148" height="26" rx="7" fill="#4f7fff"/>
  <rect x="0" y="40" width="148" height="8" fill="#4f7fff"/>
  <text x="74" y="39" text-anchor="middle" font-size="10" font-weight="700" fill="#fff">1. Data Prep</text>
  <text x="10" y="60" font-size="9" fill="#14306b">✓ Date vs. posting period check</text>
  <text x="10" y="74" font-size="9" fill="#14306b">✓ Clear pending approvals</text>
  <text x="10" y="88" font-size="9" fill="#14306b">✓ Currency revaluation</text>
  <text x="10" y="102" font-size="9" fill="#14306b">✓ Received-not-billed accruals</text>
  <text x="74" y="122" text-anchor="middle" font-size="8.5" fill="#4f6fb0">Items 1, 2, 3, 5</text>
  <!-- Arrow 1→2 -->
  <line x1="150" y1="76" x2="168" y2="76" stroke="#b2c2e6" stroke-width="1.5" marker-end="url(#cl-arrow)"/>
  <!-- Phase 2 -->
  <rect x="170" y="22" width="148" height="108" rx="7" fill="#eef2fb" stroke="#4f7fff" stroke-width="1.5"/>
  <rect x="170" y="22" width="148" height="26" rx="7" fill="#4f7fff"/>
  <rect x="170" y="40" width="148" height="8" fill="#4f7fff"/>
  <text x="244" y="39" text-anchor="middle" font-size="10" font-weight="700" fill="#fff">2. Process Runs</text>
  <text x="180" y="60" font-size="9" fill="#14306b">✓ Run depreciation (FAM)</text>
  <text x="180" y="74" font-size="9" fill="#14306b">✓ Verify scheduled scripts</text>
  <text x="180" y="88" font-size="9" fill="#14306b">✓ Revenue recognition plans</text>
  <text x="244" y="122" text-anchor="middle" font-size="8.5" fill="#4f6fb0">Items 6, 8, 11</text>
  <!-- Arrow 2→3 -->
  <line x1="320" y1="76" x2="338" y2="76" stroke="#b2c2e6" stroke-width="1.5" marker-end="url(#cl-arrow)"/>
  <!-- Phase 3 -->
  <rect x="340" y="22" width="148" height="108" rx="7" fill="#eef2fb" stroke="#4f7fff" stroke-width="1.5"/>
  <rect x="340" y="22" width="148" height="26" rx="7" fill="#4f7fff"/>
  <rect x="340" y="40" width="148" height="8" fill="#4f7fff"/>
  <text x="414" y="39" text-anchor="middle" font-size="10" font-weight="700" fill="#fff">3. Reconciliation</text>
  <text x="350" y="60" font-size="9" fill="#14306b">✓ A/R and A/P to GL</text>
  <text x="350" y="74" font-size="9" fill="#14306b">✓ Bank accounts to GL</text>
  <text x="350" y="88" font-size="9" fill="#14306b">✓ Intercompany elimination</text>
  <text x="414" y="122" text-anchor="middle" font-size="8.5" fill="#4f6fb0">Items 4, 9, 10</text>
  <!-- Arrow 3→4 -->
  <line x1="490" y1="76" x2="508" y2="76" stroke="#b2c2e6" stroke-width="1.5" marker-end="url(#cl-arrow)"/>
  <!-- Phase 4 -->
  <rect x="510" y="22" width="170" height="108" rx="7" fill="#d1fae5" stroke="#059669" stroke-width="1.5"/>
  <rect x="510" y="22" width="170" height="26" rx="7" fill="#059669"/>
  <rect x="510" y="40" width="170" height="8" fill="#059669"/>
  <text x="595" y="39" text-anchor="middle" font-size="10" font-weight="700" fill="#fff">4. Lock Down</text>
  <text x="520" y="60" font-size="9" fill="#065f46">✓ Lock subledger periods first</text>
  <text x="520" y="74" font-size="9" fill="#065f46">✓ Review Period Summary</text>
  <text x="520" y="88" font-size="9" fill="#065f46">✓ Lock All Transactions</text>
  <text x="595" y="122" text-anchor="middle" font-size="8.5" fill="#059669">Items 7, 12</text>
  <!-- Footer -->
  <text x="0" y="148" font-size="9" fill="#8aa2d6">Do not lock before reconciliation is clean. Subledger periods must be locked before the All Transactions period.</text>
</svg>
<figcaption style="text-align:center;font-size:0.78rem;color:#8aa2d6;margin-top:0.4rem">The sequence matters. Running process jobs after reconciliation: or locking before them: produces unreliable financials.</figcaption>
</figure>

## 1. Check for transactions with mismatched dates and posting periods

NetSuite lets a transaction have a date in one period but post to a completely different period. A vendor bill dated March 31 can post to April if someone changed the posting period manually. Before closing, run a saved search on Transactions where Transaction Date is in the current period but Posting Period is not, and vice versa. Entries that shouldn't exist will surface immediately.

The criteria: Transaction Date within the period, Posting Period does not equal current period. Sort by amount descending and review anything material.

## 2. Clear unposted and pending approval transactions

A saved search for transactions in Pending Approval, Pending Supervisor Approval, or any non-Posted status dated in or before the current period tells you exactly what hasn't made it into the books yet. Sales orders in Pending Billing, vendor bills in Pending Approval, expense reports not yet approved. All of these affect your numbers if they belong in the current period. See [NetSuite Saved Search Examples for Finance and Operations Teams](/blog/netsuite-saved-search-examples) for a template you can adapt for this.

This should be run and reviewed by each department lead, not just accounting. The A/P team cannot see what the sales team has stuck in approval.

## 3. Run currency revaluation before closing

If your account has transactions in foreign currencies, NetSuite does not automatically revalue open A/R, A/P, or bank balances at the period-end exchange rate. You have to run it manually: Financial > Revaluation > Revalue Open Foreign Currency Balances. Missing this means your unrealized gains and losses are wrong, and the BS won't balance in functional currency terms.

Run it, review the generated journal entry, and post it before locking the period. If the numbers look wrong, check that your exchange rates are updated under Lists > Accounting > Currencies first.

## 4. Reconcile the A/R and A/P subledgers to the GL

NetSuite has an A/R Reconciliation report and an A/P Reconciliation report (Reports > Financial > Reconciliation). These compare the subledger balances (sum of open invoices and bills by customer/vendor) against the corresponding GL accounts. They should match exactly. If they do not, you have either a posting issue, a manual journal entry hitting the A/R or A/P account directly, or a transaction that posted to the wrong account.

Find the discrepancy before closing. Closing with a subledger-to-GL difference means your aging reports are unreliable.

## 5. Check received-not-billed for A/P accruals

Purchase orders that have been received but not yet matched to a vendor bill create a received-not-billed balance that needs to be accrued at period end. NetSuite has a Received Not Billed report under Reports > Purchases/Vendors. Any amount here that belongs in the current period needs either a vendor bill entered before close or an accrual journal entry posted and reversed in the following period.

This is one of the most consistently missed items in NetSuite accounts that migrated from systems where the three-way match worked differently.

## 6. Confirm depreciation has run if using Fixed Assets Management

NetSuite's Fixed Assets Management module does not depreciate assets automatically. Depreciation is a batch process that must be triggered manually: Fixed Assets > Depreciation > Depreciate Assets. If you forget to run it, your depreciation expense and accumulated depreciation balances are understated for the period.

Run it, review the depreciation journal generated, and confirm it posted before locking. If the amounts look wrong, check that asset useful lives and cost bases are correct before re-running.

## 7. Lock subledger periods separately from the GL

NetSuite allows you to lock A/R, A/P, and Payroll sub-periods independently from the main accounting period. Most teams lock the GL period but leave the subledger periods open, which means transactions can still post to the A/R and A/P accounts in a period that is technically "closed." Under Setup > Accounting > Manage Accounting Periods, lock all subledger periods for the closed period, not just the All Transactions lock.

## 8. Verify scheduled scripts completed successfully

If your account has scheduled or Map/Reduce scripts that run as part of your close process (automated accruals, data synchronizations, commission calculations), check that they completed without error before closing. Under Customization > Scripting > Script Deployments, filter by type and check the Last Run status. A failed script that nobody noticed means the data it was supposed to update is wrong, and it will not be obvious from the financial statements.

## 9. Reconcile bank accounts to the GL

NetSuite has a Bank Reconciliation feature under Transactions > Bank > Reconcile Bank Statement. For every bank account on the balance sheet, reconcile the statement balance to the GL balance before locking. Unreconciled items, deposits in transit, outstanding checks, bank fees not yet entered, need to be explained or posted before close.

If your account uses the Cash Management module, the reconciliation is more structured; if not, you may be doing this manually in a spreadsheet. Either way, a GL bank balance that does not match the bank statement at period end is an open question that should not survive into the next period.

## 10. Review intercompany balances for multi-subsidiary accounts

For accounts running multiple subsidiaries under OneWorld, intercompany eliminations must zero out before consolidated financials are meaningful. Run the Intercompany Elimination report under Reports > Financial > Intercompany Elimination. Any non-zero balance indicates an intercompany transaction that was posted on one side but not the other, or that was posted in different periods.

The most common cause is a subsidiary posting an intercompany bill in one period while the corresponding intercompany income is posted in the next. Timing differences between subsidiaries need to be resolved before the parent-level numbers are reliable. Check this before locking any subsidiary period.

## 11. Confirm revenue recognition schedules have processed

If your account uses NetSuite's Revenue Recognition module (or Advanced Revenue Management), revenue recognition does not post automatically, it must be triggered. Under Financial > Revenue Recognition > Revenue Arrangement > Generate Revenue Plans, confirm that all plans for the period have been generated and approved. Then run the revenue recognition journals.

Skipping this step means recognized revenue is understated for the period and the deferred revenue balance is overstated. Unlike depreciation, revenue recognition errors are often not caught until the next period's revenue reconciliation surfaces the discrepancy. Check the Revenue Recognition Schedule report before locking to confirm no pending recognition remains for the period.

## 12. Review the Accounting Period Summary before locking

Before locking the period, open Setup > Accounting > Manage Accounting Periods and review the period summary. NetSuite shows the transaction count, the posting status, and any outstanding items per period. This is the final confirmation that nothing is still in a non-posted state that belongs in the closing period.

Lock the subledger periods (A/R, A/P, Payroll) before locking the main All Transactions period. Locking All Transactions without locking subledger periods first allows transactions to continue posting to subledger accounts even after the GL is locked. The full lock sequence: subledger periods first, All Transactions second.

---

Month-end in NetSuite is faster when the underlying account is clean and automated correctly. If any of these items consistently require manual intervention or workarounds, that is a signal that a saved search, a workflow, or a script could remove it from the checklist entirely. That is the kind of ongoing work covered under our [NetSuite post-go-live support](/netsuite-post-go-live-support). For the tooling side, [saved searches and dashboards](/netsuite-saved-searches-dashboards) and [workflow automation](/netsuite-workflow-automation) are the two services most relevant to tightening a close process. For the broader post-go-live context, see [NetSuite Post-Go-Live Checklist: What to Prioritize in Your First 90 Days](/blog/netsuite-post-go-live-checklist). If your close is still taking longer than it should, [book a consultation](/contact) and we can look at where the time is actually going.

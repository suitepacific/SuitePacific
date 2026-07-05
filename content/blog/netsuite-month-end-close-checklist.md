---
title: "NetSuite Month-End Close Checklist: What Most Teams Miss"
description: "A practical NetSuite month-end close checklist covering the items specific to NetSuite that fall through the cracks: period locking, subledger reconciliation, unposted transactions, currency revaluation, and more."
date: "2026-07-01"
tags: ["NetSuite", "Reporting"]
---

Generic month-end close advice is easy to find. What's harder to find is what's specific to NetSuite: the things that behave differently than your old system, the steps that require clicking in a specific order, and the reports that only tell you something went wrong after you've already closed the period. This checklist covers those.

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

---

Month-end in NetSuite is faster when the underlying account is clean and automated correctly. If any of these items consistently require manual intervention or workarounds, that is a signal that a saved search, a workflow, or a script could remove it from the checklist entirely. That is the kind of ongoing work covered under our [NetSuite post-go-live support](/netsuite-post-go-live-support). For the tooling side, [saved searches and dashboards](/netsuite-saved-searches-dashboards) and [workflow automation](/netsuite-workflow-automation) are the two services most relevant to tightening a close process. For the broader post-go-live context, see [NetSuite Post-Go-Live Checklist: What to Prioritize in Your First 90 Days](/blog/netsuite-post-go-live-checklist). If your close is still taking longer than it should, [book a consultation](/#contact) and we can look at where the time is actually going.

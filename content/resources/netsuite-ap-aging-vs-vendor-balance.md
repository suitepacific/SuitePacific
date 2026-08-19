---
title: "NetSuite AP Aging vs Vendor Balance: Why the Numbers Can Legitimately Differ"
description: "AP Aging and Vendor Balance can show different totals for the same vendor without any data error. Here is why the numbers differ and what to check before assuming a transaction is missing."
category: "Accounting"
tags: ["Accounting", "Finance", "Accounts Payable", "Reporting"]
publishedAt: "2026-08-20"
updatedAt: "2026-08-20"
linkedinDay: 49
---

<div style="background:#eef2fb;border:1px solid #b2c2e6;border-radius:10px;padding:1.25rem 1.5rem;margin:2rem 0;font-family:system-ui,-apple-system,sans-serif">
<p style="margin:0 0 0.5rem;font-size:0.7rem;font-weight:700;color:#4f7fff;text-transform:uppercase;letter-spacing:0.08em">Quick answer</p>
<p style="margin:0;color:#14306b;font-size:0.9rem;line-height:1.6">AP Aging and Vendor Balance can show different amounts for the same vendor without any missing or incorrect transactions. The Vendor Balance reflects all open AP transactions regardless of due date. The AP Aging report is filtered by an As of Date and ages transactions based on either Due Date or Transaction Date — the choice is controlled by the Aging Method setting. A vendor bill dated June 1 with a due date of July 1 appears in the Vendor Balance immediately, but where it falls in AP Aging (or whether it appears at all in an aging run through a specific date) depends on those settings. Check the As of Date and Aging Method before looking for a missing transaction.</p>
</div>

## Why AP Aging and Vendor Balance Produce Different Totals

The Vendor Balance and the AP Aging report measure related but different things:

**Vendor Balance:** The outstanding AP balance for a vendor, derived from all open transactions (vendor bills, vendor credits, payments) regardless of when they are due or when the report is run. This is a running total of what is owed.

**AP Aging:** A point-in-time report that shows how long outstanding AP balances have been outstanding, categorized into aging buckets (Current, 1-30 days, 31-60 days, etc.). The output depends on two settings: the As of Date and the Aging Method.

Because the two reports use different logic, they can produce different totals even when all transactions are correctly recorded.

## The As of Date Effect

The AP Aging report has an As of Date parameter. The report shows AP balances as they existed on that date — it excludes transactions posted after the As of Date.

If the AP Aging report is run with an As of Date of June 30, a vendor bill entered on July 2 will not appear in the report. The Vendor Balance, however, shows the current outstanding balance including that July 2 bill.

This is the most common reason for a discrepancy: the AP Aging As of Date does not match the current date, or the Vendor Balance is being compared to an aging report from a prior period.

**Check:** Confirm the As of Date on the AP Aging report matches the date range you expect. If you are comparing to the current Vendor Balance, run the AP Aging report with today's date.

## The Aging Method Effect

NetSuite's AP Aging report has an Aging Method setting that controls which date is used to calculate how old each transaction is:

**Due Date aging:** Transactions are aged based on their due date. A vendor bill with a transaction date of June 1 and a due date of July 1 is not overdue until after July 1. If the report is run on June 30 with Due Date aging, this bill appears as Current (not yet due).

**Transaction Date aging:** Transactions are aged based on their transaction date. The same June 1 bill would be aged 29 days as of June 30, regardless of when it is due.

A difference in Aging Method explains why the AP Aging buckets do not add up to the Vendor Balance when you expect them to: a bill the Vendor Balance includes as outstanding may be aging into a different bucket than expected, or may not yet be aging at all under Due Date aging.

**Check:** Review the Aging Method on the AP Aging report. Confirm it matches the method your finance team expects. If the team reconciles against due dates, Due Date aging is correct. If the team ages from transaction date, Transaction Date aging is correct.

## A Worked Example

A vendor has two open bills:

| Bill | Transaction Date | Due Date | Amount |
|------|-----------------|----------|--------|
| Bill A | June 1 | July 1 | $20,000 |
| Bill B | June 15 | June 30 | $10,000 |

**Vendor Balance on June 30:** $30,000 (both bills are open and unpaid)

**AP Aging run on June 30 with Due Date aging:**
- Bill A: Due July 1, not yet due — Current: $20,000
- Bill B: Due June 30, due today — Current: $10,000
- Total: $30,000 (matches Vendor Balance in this case)

**AP Aging run on June 30 with Due Date aging, As of Date = June 15:**
- Bill A: Due July 1, not yet due as of June 15 — Current: $20,000
- Bill B: Not yet entered as of June 15 (entered June 15, but As of Date cutoff may exclude it depending on how the report handles same-day transactions)
- Total: may not match current Vendor Balance

The As of Date cutoff explains most discrepancies between AP Aging and Vendor Balance totals.

## What to Check Before Assuming a Transaction Is Missing

1. **As of Date:** What date is the AP Aging report using? Does it match the period you are comparing against the Vendor Balance?
2. **Aging Method:** Is the report aging by Due Date or Transaction Date? Is that the expected method for your reconciliation?
3. **Currency:** If the vendor has transactions in multiple currencies, confirm both reports are using the same exchange rate basis.
4. **Applied credits:** Vendor credits applied to bills reduce the Vendor Balance. Confirm that credits applied after the AP Aging As of Date are not causing the discrepancy.

Only after confirming these settings should you look for missing or duplicate transactions.

## Related Resources

- [NetSuite Transaction Date vs Posting Period](/resources/netsuite-transaction-date-vs-posting-period): the related concept on the revenue side — a transaction date and the period it posts to can differ, which affects financial report totals the same way As of Date affects AP Aging.
- [NetSuite post-go-live support](/netsuite-post-go-live-support): accounting and reporting support for live NetSuite accounts.

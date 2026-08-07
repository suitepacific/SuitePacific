---
title: "NetSuite 2026.2 Can Now Automate Payment Adjustments for Bank Fees and Underpayments"
description: "NetSuite 2026.2 introduces automated payment adjustments for bank fees, convenience fees, and underpayments directly from customer payment and customer deposit records, removing the need for manual adjustment entries."
date: "2026-07-21"
updated: "2026-08-05"
tags: ["Accounting", "Administration", "NetSuite Tips"]
---

When a customer pays slightly less than the invoice amount, or when your bank deducts a processing fee from a payment before it hits your account, the result is a discrepancy. In NetSuite, that discrepancy traditionally required a manual adjustment entry to clear it.

NetSuite 2026.2 introduces **Automating Payment Adjustments**, which handles these small discrepancies automatically from the customer payment or customer deposit record.

<figure style="margin:1.75rem 0">
<svg viewBox="0 0 680 120" xmlns="http://www.w3.org/2000/svg" style="width:100%;max-width:680px;display:block;font-family:system-ui,-apple-system,sans-serif">
  <text x="340" y="14" text-anchor="middle" font-size="10" font-weight="700" fill="#14306b" letter-spacing="0.05em">THREE PAYMENT DISCREPANCY TYPES: AUTO-ADJUSTED IN 2026.2</text>
  <!-- Bank fees -->
  <rect x="0" y="22" width="206" height="84" rx="7" fill="#eef2fb" stroke="#4f7fff" stroke-width="1.5"/>
  <rect x="0" y="22" width="206" height="28" rx="7" fill="#0b1f4d"/>
  <rect x="0" y="40" width="206" height="10" fill="#0b1f4d"/>
  <text x="103" y="40" text-anchor="middle" font-size="9.5" font-weight="700" fill="#eef2fb">Bank Fees</text>
  <text x="103" y="62" text-anchor="middle" font-size="8.5" fill="#4f6fb0">Bank deducts processing charge</text>
  <text x="103" y="76" text-anchor="middle" font-size="8.5" fill="#4f6fb0">Net deposit differs from invoice</text>
  <text x="103" y="98" text-anchor="middle" font-size="8" font-weight="600" fill="#14306b">Auto-accounted at payment record</text>
  <!-- Convenience fees -->
  <rect x="237" y="22" width="206" height="84" rx="7" fill="#eef2fb" stroke="#4f7fff" stroke-width="1.5"/>
  <rect x="237" y="22" width="206" height="28" rx="7" fill="#0b1f4d"/>
  <rect x="237" y="40" width="206" height="10" fill="#0b1f4d"/>
  <text x="340" y="40" text-anchor="middle" font-size="9.5" font-weight="700" fill="#eef2fb">Convenience Fees</text>
  <text x="340" y="62" text-anchor="middle" font-size="8.5" fill="#4f6fb0">Credit card surcharge deducted</text>
  <text x="340" y="76" text-anchor="middle" font-size="8.5" fill="#4f6fb0">Applies on customer deposit</text>
  <text x="340" y="98" text-anchor="middle" font-size="8" font-weight="600" fill="#14306b">Auto-adjusted at payment level</text>
  <!-- Underpayments -->
  <rect x="474" y="22" width="206" height="84" rx="7" fill="#eef2fb" stroke="#4f7fff" stroke-width="1.5"/>
  <rect x="474" y="22" width="206" height="28" rx="7" fill="#0b1f4d"/>
  <rect x="474" y="40" width="206" height="10" fill="#0b1f4d"/>
  <text x="577" y="40" text-anchor="middle" font-size="9.5" font-weight="700" fill="#eef2fb">Underpayments</text>
  <text x="577" y="62" text-anchor="middle" font-size="8.5" fill="#4f6fb0">Customer pays less than billed</text>
  <text x="577" y="76" text-anchor="middle" font-size="8.5" fill="#4f6fb0">Within configurable write-off threshold</text>
  <text x="577" y="98" text-anchor="middle" font-size="8" font-weight="600" fill="#14306b">Auto write-off, no journal entry</text>
</svg>
<figcaption style="text-align:center;font-size:0.78rem;color:#8aa2d6;margin-top:0.4rem">All three types are handled from the customer payment or customer deposit record, not a separate adjustment workflow.</figcaption>
</figure>

<div style="background:#eef2fb;border:1px solid #b2c2e6;border-radius:10px;padding:1.25rem 1.5rem;margin:2rem 0;font-family:system-ui,-apple-system,sans-serif">
<p style="margin:0 0 0.5rem;font-size:0.7rem;font-weight:700;color:#4f7fff;text-transform:uppercase;letter-spacing:0.08em">Quick answer</p>
<p style="margin:0;color:#14306b;font-size:0.9rem;line-height:1.6">NetSuite 2026.2 introduces automated payment adjustment handling for three types of discrepancies: bank fees deducted from payments by the bank before deposit, convenience fees charged on certain payment methods, and small underpayments within a configurable write-off threshold. These adjustments are handled directly from the customer payment or customer deposit record, removing the need for separate manual journal entries to clear each discrepancy. AR teams that regularly process payments with bank fees or write off small underpayments benefit most: fewer manual transactions, cleaner reconciliation, and less follow-up when payment amounts differ slightly from invoice totals. The feature is available on customer payment and customer deposit records in NetSuite 2026.2. No separate workflow or module is required: the adjustment handling is built into the existing payment record in NetSuite.</p>
</div>

## What types of adjustments are covered

The automation handles three types of payment discrepancies:

**Bank fees:** When a bank deducts its processing charge from a customer payment before depositing the remainder, the amount received does not match the invoice total. NetSuite can now automatically account for the fee difference when you record the payment.

**Convenience fees:** When customers pay through a channel that charges a convenience fee (such as a credit card surcharge), the net amount deposited may differ from the invoiced amount. The automation handles this difference at the payment record level.

**Underpayments:** When a customer pays less than the full amount due, and the difference is within a threshold your account considers acceptable for write-off, the adjustment can be applied automatically rather than creating a separate journal entry.

## Where this happens

Payment adjustment automation works from the **customer payment** and **customer deposit** records in NetSuite. These are the records you create when you receive money from a customer.

Previously, clearing a small discrepancy on one of these records required a separate manual step, typically a journal entry or a write-off transaction. The 2026.2 change brings that adjustment handling directly into the payment workflow.

## Why this matters

The practical benefit is reduced manual work for AR teams. Small discrepancies, bank fees, and underpayments are common in any accounts receivable operation. Handling each one manually generates extra transactions, takes time, and creates reconciliation noise.

Automating these adjustments means fewer manual journal entries, cleaner reconciliation, and less follow-up for the AR team when a payment does not match the invoice exactly.

## Who should use this

This feature is most relevant for:

- AR teams that regularly deal with bank fees deducted from customer payments
- Businesses that accept payment methods with convenience fees or processing charges
- Accounts that currently write off small underpayments manually

If your reconciliation process involves frequent small adjustments between payment amounts and invoice totals, this feature is worth reviewing once your account is on the 2026.2 release.

## Frequently asked questions

**Q: Where are the adjustment thresholds configured?**
A: Adjustment thresholds, such as the maximum underpayment amount eligible for automatic write-off, are configured in your payment adjustment settings in NetSuite. Review these settings after upgrading to 2026.2 to confirm thresholds match your reconciliation policy.

**Q: What GL account does an automated payment adjustment post to?**
A: The GL account depends on how each adjustment type is configured. Bank fees typically post to a bank charge or processing fee expense account. Underpayment write-offs typically post to a bad debt or write-off account. Confirm the GL account mapping in your account configuration to ensure adjustments post to the correct accounts before enabling the feature in production.

**Q: Does this replace the manual journal entry process entirely?**
A: For adjustments within the configured scope (bank fees, convenience fees, underpayments within threshold), yes. Adjustments outside the automated scope, such as large underpayments, still require manual handling.

**Q: Is an audit trail created for automated adjustments?**
A: Yes. Automated adjustments create transactions in NetSuite that appear in the account's transaction history, providing a full audit trail for each adjustment.

**Q: Does this work for all payment methods?**
A: The feature applies to discrepancies handled through customer payment and customer deposit records. Review the applicable payment method configuration in your account to confirm which payment types are covered.

**Q: Do I need to set anything up before the automated adjustments work?**
A: Review your account's payment adjustment settings after upgrading to 2026.2 to confirm thresholds and GL account mappings are correct for your reconciliation process before relying on the automation.

If you need help evaluating whether this feature applies to your reconciliation workflow, [SuitePacific's post-go-live support](/netsuite-post-go-live-support) covers release review and ongoing account maintenance.

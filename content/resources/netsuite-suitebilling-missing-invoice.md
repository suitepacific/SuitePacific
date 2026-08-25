---
title: "SuiteBilling Invoice Not Being Created: How to Trace the Billing Pipeline"
description: "When a SuiteBilling invoice does not appear, the subscription status alone does not tell you where the problem is. This guide walks through the four-stage billing pipeline and how to identify where it stopped."
category: "SuiteBilling"
tags: ["SuiteBilling", "Finance", "Administration", "Subscriptions"]
publishedAt: "2026-08-20"
updatedAt: "2026-08-20"
linkedinDay: 46
---

<div style="background:#eef2fb;border:1px solid #b2c2e6;border-radius:10px;padding:1.25rem 1.5rem;margin:2rem 0;font-family:system-ui,-apple-system,sans-serif">
<p style="margin:0 0 0.5rem;font-size:0.7rem;font-weight:700;color:#4f7fff;text-transform:uppercase;letter-spacing:0.08em">Quick answer</p>
<p style="margin:0;color:#14306b;font-size:0.9rem;line-height:1.6">When a SuiteBilling invoice does not appear, do not start by debugging the invoice. The invoice is the final output of a four-stage pipeline: Subscription, Rating, Charges, and Bill Run. The subscription being Active does not mean the pipeline is running correctly; the subscription's line item statuses and effective dates also affect whether rating occurs. Find the first stage where the expected record is missing and investigate there. If no Charge record was created, the problem is in the Subscription or Rating stage: check whether the subscription line is in a rated status and whether the billing period dates fall within the subscription's effective dates. If a Charge record exists but no invoice was created, the problem is in Billing Operations or the Bill Run configuration, such as the Bill Run not including the correct billing schedule or subsidiary.</p>
</div>

## The Four-Stage SuiteBilling Invoice Pipeline

A SuiteBilling invoice is the output of four sequential stages. Each stage produces a record that the next stage consumes. When an invoice is missing, one of those stages did not produce its output.

**Stage 1: Subscription**

The subscription record defines what is being billed, to whom, and when. The subscription must be in an Active status and its effective date must have been reached before rating can occur. Subscription line items also have their own status; a line item that is Suspended or Terminated does not generate charges even if the parent subscription is Active.

Check: is the subscription Active? Have the effective dates for the subscription and its line items been reached? Are all expected line items in an Active status?

**Stage 2: Rating**

The rating process calculates what is owed based on the subscription's pricing, quantity, usage data, effective date, and line item status. Rating produces Charge records. If rating does not run, or runs but produces no charges, no invoice will be created regardless of what happens downstream.

Rating can fail to produce charges for several reasons: the billing period has not yet started for a given line item, usage data required for a usage-based line item has not been submitted, or a pricing rule has a configuration that excludes the current billing cycle.

Check: are Charge records being created for this subscription? Navigate to the Charges sublist on the subscription record or search for Charge records associated with the customer and subscription.

**Stage 3: Charges**

Charge records represent what needs to be billed. They are created by the rating process and consumed by Billing Operations. A Charge record in an eligible status is what triggers invoice creation in the next stage.

If Charge records exist but are in a status that Billing Operations does not process (for example, On Hold), no invoice will be created until the status is corrected.

Check: do Charge records exist for this subscription? What is their status? Are any Charges in an On Hold or excluded status?

**Stage 4: Bill Run (Billing Operations)**

Billing Operations processes eligible Charge records and creates invoices. A Bill Run must have been executed that covers the date range and criteria matching the subscription's charges. If no Bill Run has processed those charges, no invoice will appear.

Check: has a Bill Run been executed for the relevant billing period? Did the Bill Run include this subscription and customer? Are there errors on the Bill Run record that indicate why charges were skipped?

## How to Diagnose a Missing Invoice

Work through the pipeline from Stage 1 forward. Stop at the first stage where the expected record or status is missing.

<div style="background:#fefce8;border:1px solid #fde68a;border-radius:10px;overflow:hidden;margin:2rem 0;font-family:system-ui,-apple-system,sans-serif">
<div style="background:#78350f;padding:0.7rem 1.25rem">
<span style="font-size:0.68rem;font-weight:700;color:#fef9c3;letter-spacing:0.08em">DIAGNOSIS SEQUENCE</span>
</div>
<div style="padding:0.65rem 1.25rem;border-bottom:1px solid #fde68a">
<div style="font-size:0.8rem;font-weight:600;color:#713f12">No Charge record created</div>
<div style="font-size:0.76rem;color:#92400e;margin-top:3px">Investigate Stage 1 (Subscription status, line item status, effective dates) and Stage 2 (rating configuration, usage data, pricing rules).</div>
</div>
<div style="padding:0.65rem 1.25rem;border-bottom:1px solid #fde68a;background:#fffbeb">
<div style="font-size:0.8rem;font-weight:600;color:#713f12">Charge record exists, no invoice</div>
<div style="font-size:0.76rem;color:#92400e;margin-top:3px">Investigate Stage 3 (Charge status) and Stage 4 (Bill Run execution, criteria, errors).</div>
</div>
<div style="padding:0.65rem 1.25rem;background:#fffbeb;font-size:0.78rem;color:#713f12">
Do not start by looking at the invoice. Find the first stage where something is missing.
</div>
</div>

## Common Reasons Rating Does Not Produce Charges

**Subscription line item not in Active status.** The parent subscription can be Active while individual line items are Suspended, Pending, or Terminated. Each line item's status independently controls whether rating produces charges for that line.

**Effective date not yet reached.** A line item with a future effective date does not generate charges until that date is reached, even if the subscription is Active.

**Usage data not submitted.** Usage-based line items require usage records to be submitted before rating can calculate the charge amount. If usage data is missing for the billing period, the charge may not be created or may be created with a zero amount.

**Billing period not yet started.** Some subscription configurations have a billing period start date that has not yet been reached. Rating runs, but produces no charges because no billable period has elapsed.

## Common Reasons Billing Operations Does Not Create an Invoice

**No Bill Run executed for the period.** Billing Operations requires a Bill Run to process charges. If a Bill Run has not been executed for the billing period matching the subscription's charges, no invoice will be created. Check whether a Bill Run was run and whether it covered the correct date range.

**Bill Run criteria excludes this subscription.** Bill Runs can be configured with criteria that limit which subscriptions or customers are processed. If the subscription does not match the Bill Run's criteria, its charges will not be processed in that run.

**Charge is On Hold.** Charges in an On Hold status are excluded from Billing Operations processing. Check the status of the Charge records and release any holds before re-running Billing Operations.

## Related Resources

- [NetSuite post-go-live support](/netsuite-post-go-live-support): ongoing SuiteBilling support for live accounts.
- [NetSuite SuiteScript development](/netsuite-suitescript-development): custom automation for SuiteBilling workflows and usage data ingestion.

---
title: "NetSuite SuiteBilling: Why Charges Are Not Being Generated"
description: "When SuiteBilling subscriptions exist but no charges or invoices appear, the problem is in the four-stage billing pipeline. Here is how to identify where the pipeline broke and what fixes each stage."
date: "2026-08-15"
updated: "2026-08-16"
tags: ["SuiteBilling", "Billing", "Troubleshooting"]
---

NetSuite SuiteBilling is the platform's subscription and recurring billing module, used by SaaS, software, and subscription businesses to manage recurring charges, renewals, and mid-term subscription modifications. When a SuiteBilling subscription exists in NetSuite but no invoices are appearing, the problem is somewhere in the billing pipeline. SuiteBilling moves through four stages to get from a subscription record to a customer invoice: the subscription defines what is being billed and when, rating calculates the charge amounts, charge records accumulate until the billing step runs, and the billing step creates the final invoice. Each stage has its own failure mode.

<div style="background:#eef2fb;border:1px solid #b2c2e6;border-radius:10px;padding:1.25rem 1.5rem;margin:2rem 0;font-family:system-ui,-apple-system,sans-serif">
<p style="margin:0 0 0.5rem;font-size:0.7rem;font-weight:700;color:#4f7fff;text-transform:uppercase;letter-spacing:0.08em">Quick answer</p>
<p style="margin:0;color:#14306b;font-size:0.9rem;line-height:1.6">When NetSuite SuiteBilling subscriptions exist but charges or invoices are not being generated, the cause is typically one of five issues: the subscription is not in Active status (charges only generate for Active subscriptions), the subscription start date is in the future so billing has not yet begun, the scheduled process that generates charges has not been configured or is failing silently, billing frequency is missing or misconfigured on the subscription line, or the invoice step is running but resulting invoices are on hold or filtered out of the view being checked. The billing pipeline in SuiteBilling is: Subscription → Rating → Charge Records → Invoice. Diagnosing which stage is failing narrows the fix to one area of configuration. In most cases, the problem is either subscription status or the scheduled rating/charge generation task not running.</p>
</div>

This article covers the five most common causes of missing SuiteBilling charges, how to identify which one is occurring, and what to do about each one.

## What Is the SuiteBilling Billing Pipeline?

SuiteBilling generates charges through a four-stage process. Understanding each stage is necessary for diagnosing where things break.

**Stage 1: Subscription record**

The subscription record defines the customer, the subscribed items (on subscription lines), the billing frequency for each line, the start date, and the renewal or end date. Nothing gets billed until a subscription is in Active status. Draft and Pending Activation subscriptions produce no charges.

**Stage 2: Rating**

Rating is the process NetSuite runs to calculate what is owed based on subscription lines and their billing frequencies. Rating evaluates each subscription line, determines which billing periods are due, and creates Charge records for them. If rating is not running, no Charge records are created regardless of subscription status.

**Stage 3: Charge records**

Charge records are the output of rating. Each Charge record represents a specific amount owed by a specific customer for a specific billing period. Charge records accumulate in Pending Billing status until the invoice generation step runs. If you have Active subscriptions and rating has run but no invoices exist, check whether Charge records have been created and what their status is.

**Stage 4: Invoice generation**

The invoice step groups Pending Billing Charge records for the same customer and creates an Invoice record. Depending on your billing configuration, this happens on a schedule or can be triggered manually. If Charge records exist but no invoices appear, the problem is in this step.

<figure style="margin:1.75rem 0">
<svg viewBox="0 0 680 72" xmlns="http://www.w3.org/2000/svg" style="width:100%;max-width:680px;display:block;font-family:system-ui,-apple-system,sans-serif">
  <defs>
    <marker id="sb-arrow" markerWidth="7" markerHeight="7" refX="5" refY="3" orient="auto"><path d="M0,0 L0,6 L7,3 z" fill="#4f6fb0"/></marker>
  </defs>
  <rect x="0" y="0" width="140" height="72" rx="7" fill="#eef2fb" stroke="#4f7fff" stroke-width="1.5"/>
  <rect x="0" y="0" width="140" height="22" rx="7" fill="#0b1f4d"/>
  <rect x="0" y="12" width="140" height="10" fill="#0b1f4d"/>
  <text x="70" y="14" text-anchor="middle" font-size="9.5" font-weight="700" fill="#eef2fb">Subscription</text>
  <text x="70" y="38" text-anchor="middle" font-size="8" fill="#4f6fb0">Status: Active</text>
  <text x="70" y="51" text-anchor="middle" font-size="8" fill="#4f6fb0">Lines + frequencies set</text>
  <text x="70" y="63" text-anchor="middle" font-size="8" fill="#4f6fb0">Start date reached</text>
  <line x1="140" y1="36" x2="157" y2="36" stroke="#4f6fb0" stroke-width="1.5" marker-end="url(#sb-arrow)"/>
  <rect x="159" y="0" width="140" height="72" rx="7" fill="#eef2fb" stroke="#4f7fff" stroke-width="1.5"/>
  <rect x="159" y="0" width="140" height="22" rx="7" fill="#0b1f4d"/>
  <rect x="159" y="12" width="140" height="10" fill="#0b1f4d"/>
  <text x="229" y="14" text-anchor="middle" font-size="9.5" font-weight="700" fill="#eef2fb">Rating</text>
  <text x="229" y="38" text-anchor="middle" font-size="8" fill="#4f6fb0">Scheduled task runs</text>
  <text x="229" y="51" text-anchor="middle" font-size="8" fill="#4f6fb0">Periods calculated</text>
  <text x="229" y="63" text-anchor="middle" font-size="8" fill="#4f6fb0">Amounts resolved</text>
  <line x1="299" y1="36" x2="316" y2="36" stroke="#4f6fb0" stroke-width="1.5" marker-end="url(#sb-arrow)"/>
  <rect x="318" y="0" width="140" height="72" rx="7" fill="#eef2fb" stroke="#4f7fff" stroke-width="1.5"/>
  <rect x="318" y="0" width="140" height="22" rx="7" fill="#0b1f4d"/>
  <rect x="318" y="12" width="140" height="10" fill="#0b1f4d"/>
  <text x="388" y="14" text-anchor="middle" font-size="9.5" font-weight="700" fill="#eef2fb">Charge Records</text>
  <text x="388" y="38" text-anchor="middle" font-size="8" fill="#4f6fb0">Pending Billing status</text>
  <text x="388" y="51" text-anchor="middle" font-size="8" fill="#4f6fb0">One per billing period</text>
  <text x="388" y="63" text-anchor="middle" font-size="8" fill="#4f6fb0">Waiting for invoice run</text>
  <line x1="458" y1="36" x2="475" y2="36" stroke="#4f6fb0" stroke-width="1.5" marker-end="url(#sb-arrow)"/>
  <rect x="477" y="0" width="203" height="72" rx="7" fill="#060f26" stroke="#4f7fff" stroke-width="1.5"/>
  <rect x="477" y="0" width="203" height="22" rx="7" fill="#4f7fff"/>
  <rect x="477" y="12" width="203" height="10" fill="#4f7fff"/>
  <text x="578" y="14" text-anchor="middle" font-size="9.5" font-weight="700" fill="#fff">Invoice</text>
  <text x="578" y="38" text-anchor="middle" font-size="8" fill="#8aa2d6">Charges grouped by customer</text>
  <text x="578" y="51" text-anchor="middle" font-size="8" fill="#8aa2d6">Invoice record created</text>
  <text x="578" y="63" text-anchor="middle" font-size="8" fill="#8aa2d6">Sent or posted</text>
</svg>
<figcaption style="text-align:center;font-size:0.78rem;color:#8aa2d6;margin-top:0.4rem">SuiteBilling four-stage pipeline. A failure at any stage stops the invoice from being created.</figcaption>
</figure>

## Why Is the Subscription Not Generating Charges?

### Issue 1: Subscription status is not Active

This is the most common cause. SuiteBilling only rates subscriptions that are in Active status. Subscriptions in Draft or Pending Activation status will not produce Charge records regardless of how the billing schedule or subscription lines are configured.

**How to identify it:** Open the subscription record and check the Status field in the header. If it reads Draft, Pending Activation, Suspended, Expired, or Cancelled, no charges will generate.

**What to do:** If the subscription should be active, move it to Active status. For a new subscription, this typically happens via the Activate action on the subscription record. For a suspended subscription, review why it was suspended before reactivating.

### Issue 2: Start date is in the future

A subscription in Active status still will not generate charges until its start date has passed, and subscription lines will not generate charges until their individual start dates have passed.

**How to identify it:** On the subscription record, check the Start Date on the header and the Start Date on each subscription line. If the header Start Date is today or in the past but a specific line's Start Date is in the future, that line's charges are not yet due.

**What to do:** If the start date is correct, no action is needed; charges will generate on schedule. If the start date was entered incorrectly, correct it on the subscription or line record before the next rating run.

### Issue 3: The scheduled rating task is not running

Rating is typically handled by a scheduled task that runs on a defined frequency. If that task has not been set up, is disabled, or is failing without surfacing an obvious error, no Charge records will be created even for Active subscriptions with correct start dates.

**How to identify it:** Navigate to Transactions > Billing and check whether Charge records exist for the subscriptions in question. If subscriptions are Active, start dates have passed, and no Charge records exist, the rating task is the likely cause. Check the scheduled script log for failures.

**What to do:** Verify that the rating script or billing task is enabled and scheduled. Check the script execution log for recent failures or exceptions. If the task is configured to run nightly and no charges exist for subscriptions that have been active for weeks, this is a strong signal.

### Issue 4: Billing frequency is missing or misconfigured on subscription lines

Each subscription line must have a billing frequency set for the rating process to calculate a charge schedule. A subscription line without a billing frequency will be skipped during rating.

**How to identify it:** Open the subscription record and review the Lines subtab. Check whether each line has a Billing Frequency value. If it is blank or set to a value that does not match expectations (such as Annual when Monthly was intended), that line will not produce charges on the expected schedule.

**What to do:** Edit the subscription line to set or correct the billing frequency. Depending on when the rating task next runs, the system may back-rate charges for missed periods or start from the next due date.

### Issue 5: Charge records exist but no invoices appear

If rating has run and Charge records exist in Pending Billing status, the problem is in the invoice generation step, not in rating. Navigate to Transactions > Billing > Charges and search for the subscription's charges. If they appear in Pending Billing status, check why the invoice step has not picked them up.

**How to identify it:** Charge records in Pending Billing status that are old enough to have been invoiced indicate a problem in the invoice generation step, not in rating.

**What to do:** Review the invoice generation schedule or process. Check whether invoices are being created but placed on hold. Check whether the customer record has any billing settings that would prevent invoice creation.

## How Do You Prevent SuiteBilling Charge Generation Issues?

The most effective preventive measure is a post-go-live review that confirms three things: every live subscription is in Active status, the rating and invoice generation tasks are running on the expected schedule, and at least one invoice has been successfully created per subscription since activation. Many SuiteBilling issues go undetected because the failure is silent: no error, just no invoice.

A saved search showing subscriptions in Active status with no associated Charge records is a useful ongoing monitor. Add it to the billing team's dashboard and schedule a weekly review.

## Related SuiteBilling Guides

- [SuiteBilling Change Orders: How Upgrades, Downgrades, and Cancellations Work](/blog/netsuite-suitebilling-change-orders)
- [SuiteBilling and Advanced Revenue Management: What the Integration Actually Does](/blog/netsuite-suitebilling-arm-integration)

For ongoing SuiteBilling support, see [NetSuite SuiteBilling Support](/netsuite-suitebilling-support).

**Need help diagnosing a SuiteBilling charge generation issue or setting up billing monitors?** [Contact SuitePacific](/contact) and we can review your account setup and identify where the pipeline is breaking.

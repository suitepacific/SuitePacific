---
title: "NetSuite ARR and MRR Reporting for B2B SaaS Companies"
description: "NetSuite does not report ARR or MRR natively. This covers which data sources to use and how to build the subscription revenue metrics SaaS companies need."
date: "2026-09-19"
updated: "2026-09-19"
tags: ["SaaS", "NetSuite", "Reporting"]
calloutText: "Need ARR and MRR reporting built for your NetSuite account?"
---

Annual recurring revenue and monthly recurring revenue are the primary financial metrics for SaaS companies, but NetSuite does not calculate or report either one natively. ARR and MRR are derived metrics: ARR is the annualized value of all active subscription contracts, and MRR is one-twelfth of ARR. NetSuite stores the underlying data in invoice records, revenue schedule records, or SuiteBilling contract records, but it does not assemble this data into ARR or MRR figures in its standard reporting. Getting those figures requires building custom saved searches or SuiteQL queries that read from the subscription revenue data and calculate the metrics at the right level of granularity: by customer, by product line, by cohort, and by period.

The absence of native ARR and MRR reporting creates a recurring problem for SaaS finance teams on NetSuite. Controllers pull invoice data into a spreadsheet at the end of each month, adjust for prorations and mid-period changes, and arrive at a number that may or may not match what the sales team reports from the CRM. When the NetSuite number and the CRM number diverge, the reconciliation takes time that the close process does not have. Building the ARR and MRR calculation in NetSuite, from the authoritative billing data, eliminates the spreadsheet step and gives finance and leadership a consistent source of truth.

<div style="background:#eef2fb;border:1px solid #b2c2e6;border-radius:10px;padding:1.25rem 1.5rem;margin:2rem 0;font-family:system-ui,-apple-system,sans-serif">
<p style="margin:0 0 0.5rem;font-size:0.7rem;font-weight:700;color:#4f7fff;text-transform:uppercase;letter-spacing:0.08em">Quick answer</p>
<p style="margin:0;color:#14306b;font-size:0.9rem;line-height:1.6">NetSuite ARR and MRR reporting is built with SuiteQL saved searches that pull from revenue schedule records, SuiteBilling contract records, or invoice history depending on how subscription billing is configured in the account. For accounts using NetSuite Advanced Revenue Management, the revenue schedule record holds the recognized amount per period per contract line; a SuiteQL query joining subscription items to their revenue schedules produces MRR by customer, by product, and by period. For accounts using recurring invoice templates without ARM, the MRR calculation reads from the invoice amount and the billing frequency field to normalize all contracts to a monthly value. SuitePacific builds ARR and MRR saved searches as KPI portlets on finance dashboards, updated in real time from the billing data already in NetSuite. Churn, net revenue retention, and new MRR breakdowns follow from the same data structure. Plans start at $799 per month.</p>
</div>

## Why doesn't NetSuite report ARR and MRR out of the box?

NetSuite is a general-purpose ERP designed for companies across many industries. Its revenue reporting is built around accounting standards: revenue recognized, deferred revenue, accounts receivable. These are the numbers that appear on financial statements and that matter for GAAP reporting. ARR and MRR are SaaS-specific operational metrics that do not correspond directly to any financial statement line item.

ARR represents the annualized contracted value of active subscriptions regardless of when revenue is recognized or when cash is collected. It counts a 12-month contract at its full annualized value on day one, even though the revenue will be recognized monthly over the contract term. Because ARR is a forward-looking contracted value metric rather than a recognized revenue metric, NetSuite's standard revenue reports do not produce it.

MRR faces a similar structural gap: it requires identifying which subscriptions are currently active, what their contracted monthly value is, and how mid-period changes (upgrades, downgrades, cancellations) affect the current period figure. This is subscription-state logic, not accounting logic, and NetSuite's native reports are not designed for it.

## What data source should ARR and MRR pull from?

The right data source for ARR and MRR in NetSuite depends on how subscription billing is configured:

| Billing setup | Recommended ARR/MRR source |
|---|---|
| SuiteBilling with contract records | SuiteBilling subscription line records by contract term and item |
| Advanced Revenue Management (ARM) | Revenue schedule records by item, customer, and recognition period |
| Recurring invoice templates without ARM | Invoice records filtered to subscription items, normalized to monthly value |
| Custom subscription tracking records | Custom record fields for contracted MRR and contract end date |

Accounts using SuiteBilling have the most structured data: each subscription has a contract record with a start date, end date, and monthly charge amount. A SuiteQL query on subscription lines grouped by customer and item produces MRR directly. Accounts using recurring invoice templates need to infer the subscription structure from invoice history, which is workable but requires more query logic to handle mid-period changes cleanly.

## What subscription metrics can NetSuite track beyond ARR and MRR?

Once the ARR and MRR data structure is built, additional subscription metrics follow from the same foundation:

**New MRR** is the MRR added from new customers in a period. This requires identifying first-invoice or contract-start events during the measurement period.

**Expansion MRR** is MRR added from existing customers through upgrades or additional products. This requires comparing the current contracted value to the prior period contracted value for the same customer.

**Churned MRR** is MRR lost from cancellations or non-renewals. This requires identifying contracts that reached their end date or were cancelled without renewal during the period.

**Net Revenue Retention (NRR)** is the ratio of ending MRR from the prior period's cohort (including expansions, contractions, and churn) to beginning MRR from the same cohort. NRR above 100% means the existing customer base is growing in revenue even without new customer additions.

These metrics require date-range comparisons across the subscription data. They are built as separate saved searches that filter and compare records across periods, not as single-query outputs.

SuitePacific builds ARR, MRR, and subscription metric reporting for SaaS companies on NetSuite. See [NetSuite SaaS support](/industries/saas-technology) for the full engagement scope and [NetSuite ARR/MRR reporting](/netsuite-arr-mrr-reporting) for the service details.

## Related reading

- [NetSuite SaaS and technology support](/industries/saas-technology): full overview of post-go-live support for SaaS accounts
- [NetSuite ARR/MRR reporting service](/netsuite-arr-mrr-reporting): saved searches, SuiteQL queries, and dashboard builds for subscription metrics
- [NetSuite saved searches and dashboards](/netsuite-saved-searches-dashboards): KPI portlets, SuiteQL reporting, and executive dashboards
- [NetSuite SuiteBilling support](/netsuite-suitebilling-support): subscription billing configuration, charge rules, and contract management

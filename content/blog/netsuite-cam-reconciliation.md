---
title: "NetSuite CAM Reconciliation for Commercial Real Estate"
description: "NetSuite CAM reconciliation requires custom records and scripts to allocate operating expenses to tenants by area and generate annual true-up invoices."
date: "2026-09-20"
updated: "2026-09-20"
tags: ["Real Estate", "NetSuite", "CAM", "Tenant Billing"]
calloutText: "Need CAM reconciliation or tenant billing built in NetSuite?"
---

Common area maintenance (CAM) reconciliation in commercial real estate is the annual process of calculating what each tenant owes for their share of the building's operating expenses. During the year, tenants pay estimated CAM charges as part of their monthly rent; at year end, the actual operating expenses are tallied, allocated to tenants by their proportionate share of the building's leasable area, and compared to the estimates each tenant paid. Tenants who underpaid receive a true-up invoice; tenants who overpaid receive a credit. For a property management company managing multiple buildings with dozens or hundreds of tenants, running this process manually in spreadsheets is time-consuming, error-prone, and difficult to audit. NetSuite has the transaction data (vendor bills for operating expenses, invoices for tenant CAM estimates) but does not natively have the allocation logic to compute each tenant's share or generate the true-up billing.

CAM reconciliation errors have real financial consequences. An overstated CAM charge creates a dispute with the tenant; an understated charge means the landlord absorbs an operating cost that the lease agreement entitles them to recover. For large properties, a reconciliation error of 5% on a $1 million CAM expense pool is $50,000 in misallocated revenue. Automating the reconciliation in NetSuite, with the tenant lease data and the expense pool totals in the same system, reduces the calculation to a report rather than a manual exercise.

<div style="background:#eef2fb;border:1px solid #b2c2e6;border-radius:10px;padding:1.25rem 1.5rem;margin:2rem 0;font-family:system-ui,-apple-system,sans-serif">
<p style="margin:0 0 0.5rem;font-size:0.7rem;font-weight:700;color:#4f7fff;text-transform:uppercase;letter-spacing:0.08em">Quick answer</p>
<p style="margin:0;color:#14306b;font-size:0.9rem;line-height:1.6">NetSuite CAM reconciliation is implemented with a custom lease record that stores each tenant's rentable square footage, lease CAM base year, and expense exclusions, a custom CAM pool record that groups the building's operating expense GL accounts into allocable pools (all expenses, controllable expenses, excluded expenses), and a SuiteScript that calculates each tenant's proportionate share of the annual expense total and generates a true-up invoice or credit memo. The script reads the actual expense amounts from NetSuite GL transactions for the reconciliation year, applies the tenant's proportionate share percentage, subtracts the estimated CAM collected during the year, and produces the net amount owed or credited. The resulting true-up invoice is created as a standard NetSuite invoice linked to the tenant customer record. SuitePacific builds CAM reconciliation and tenant billing workflows for real estate companies on NetSuite. Plans start at $799 per month.</p>
</div>

## What operating expenses are included in CAM?

CAM expense pools vary by property type and lease structure. The specific expenses included or excluded for each tenant are defined in the lease agreement, which makes CAM reconciliation tenant-specific even for tenants in the same building. Common categories include:

| Expense category | Typically included | Common exclusions |
|---|---|---|
| Janitorial and cleaning | Yes | Tenant-specific cleaning |
| Landscaping and grounds | Yes | None |
| Utilities for common areas | Yes | Direct-metered tenant utilities |
| Security and access control | Yes | None |
| HVAC maintenance (common areas) | Yes | Tenant HVAC (if separately maintained) |
| Management fees | Often (capped) | Amounts exceeding lease cap |
| Capital expenditures (amortized) | Varies by lease | Often excluded unless over threshold |
| Property taxes | Sometimes in NNN leases | Often in a separate tax recovery |
| Insurance premiums | Sometimes in NNN leases | Often in a separate insurance recovery |

In NetSuite, the CAM pool record defines which GL accounts are included for a given property and tenant class. When the reconciliation script runs, it pulls the actual posted amounts from those GL accounts for the reconciliation period, excluding accounts that are flagged as non-allocable for a specific tenant.

## How does proportionate share work in NetSuite?

Proportionate share is the percentage of the total allocable CAM expenses attributable to one tenant. The most common calculation is:

**Tenant proportionate share = Tenant rentable square footage / Total building rentable area**

However, some leases use a denominator other than total building area: occupied area only (excluding vacant units), specific floors, or a contractually fixed denominator specified in the lease. These variations require the CAM allocation script to read the denominator type from the lease record and apply the correct formula rather than using a single building-level constant.

When a tenant occupies space for only part of the year, the reconciliation calculates a prorated share based on the number of days the tenant was in occupancy. Early vacates and new move-ins during the reconciliation year require the script to apply a daily proration to the tenant's share of the expense pool.

A saved search in NetSuite shows the current leasable area by property, occupied area by tenant, and vacancy percentage, which gives the property management team a real-time view of the denominator for the upcoming CAM reconciliation.

## What does a property P&L look like in NetSuite?

A property-level profit and loss statement in NetSuite requires that every revenue and expense transaction is tagged to the property using a class or custom segment. Rental revenue (base rent, CAM estimates, tax and insurance recoveries) is posted with the property class or segment; operating expenses (vendor bills for maintenance, utilities, management fees) are similarly tagged.

With consistent class or segment tagging, a class-level income statement in NetSuite shows revenue and expenses for each property separately. The net operating income (NOI) by property is the primary financial metric for a real estate portfolio and can be monitored as a KPI portlet on the dashboard when the class or segment structure is correctly set up.

CAM recovery rate, the ratio of actual CAM collected (estimates during the year) to actual CAM expenses incurred, is a useful metric for identifying properties where the estimate schedule needs adjustment. If a property consistently runs a large true-up balance at year end, the monthly CAM estimates are set too low and should be increased for the next lease year.

SuitePacific provides ongoing NetSuite support for real estate and property management companies including CAM reconciliation builds, tenant billing automation, and property-level reporting. See [NetSuite real estate support](/industries/real-estate) for the full engagement scope.

## Related reading

- [NetSuite real estate support](/industries/real-estate): full overview of post-go-live support for real estate and property management companies
- [NetSuite SuiteScript development](/netsuite-suitescript-development): custom script builds for allocation, billing automation, and reconciliation workflows
- [NetSuite saved searches and dashboards](/netsuite-saved-searches-dashboards): KPI portlets and property-level reporting
- [NetSuite workflow automation](/netsuite-workflow-automation): approval workflows, billing triggers, and period-close automation

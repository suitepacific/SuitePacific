---
title: "NetSuite WIP Report for Construction: What It Shows and How to Build It"
description: "A WIP report shows the relationship between costs incurred and revenue earned on each active construction project. NetSuite does not include a native WIP schedule; it requires a saved search or SuiteQL query built to match the specific billing method in use."
date: "2026-09-19"
updated: "2026-09-19"
tags: ["Construction", "NetSuite", "Reporting"]
calloutText: "Need a WIP report in your NetSuite account? Tell us about your projects."
---

A work-in-progress (WIP) report in construction accounting shows, for each active project, the relationship between costs incurred to date, the percentage of completion, earned revenue, billed revenue, and the resulting over/under-billing position. It is a required schedule for contractors who recognize revenue on a percentage-of-completion basis and for lenders or bonding companies evaluating the contractor's financial position. NetSuite does not include a native WIP schedule; producing it requires a saved search or SuiteQL-backed report that pulls data from project, transaction, and billing schedule records and computes the key metrics from live account balances.

The WIP report is not a standard report in any general-purpose accounting system. It requires joining data that lives in multiple places: project costs from expense transactions and payroll postings, earned revenue from a percentage-of-completion calculation, billed revenue from posted invoices, and the estimated total cost from a field the project manager maintains on the project record. No standard NetSuite report connects all four data points. The result is that most construction companies on NetSuite either run their WIP in a spreadsheet alongside the system or go without it entirely until they build a dedicated solution.

<div style="background:#eef2fb;border:1px solid #b2c2e6;border-radius:10px;padding:1.25rem 1.5rem;margin:2rem 0;font-family:system-ui,-apple-system,sans-serif">
<p style="margin:0 0 0.5rem;font-size:0.7rem;font-weight:700;color:#4f7fff;text-transform:uppercase;letter-spacing:0.08em">Quick answer</p>
<p style="margin:0;color:#14306b;font-size:0.9rem;line-height:1.6">SuitePacific builds WIP reporting in NetSuite using a SuiteQL query or saved search that reads costs from posted transactions, earned revenue from a percentage-of-completion calculation, and billed revenue from posted invoices. The report produces columns for contract value, estimated cost at completion, cost incurred to date, percent complete, earned revenue, billed to date, and the over/under-billing position for each active project. Over-billing (billed exceeds earned) appears as a current liability; under-billing (earned exceeds billed) appears as a current asset. The estimated cost at completion field lives on the project record and is maintained by the project manager. The report refreshes from live transaction data each time it runs, so the WIP position is current without manual entry. Output can be exported in the format bonding companies and lenders require.</p>
</div>

## What columns does a WIP report include?

A complete WIP schedule includes the following columns for each active project. The exact labels vary by contractor, but the underlying data is consistent across the industry.

**Project name and number.** The identifier linking the WIP row to the project in NetSuite and to the contract documents.

**Contract value.** The original contract sum plus all approved change orders. This is the total revenue the contractor expects to earn if the project is completed as contracted. Change orders must be approved and reflected here before the WIP math works correctly.

**Estimated cost at completion.** The project manager's current best estimate of total cost to complete the project, including costs already incurred and costs still to be incurred. This is the denominator in the percent-complete calculation and the most important number the PM maintains. It must be updated regularly; a stale estimate produces a misleading WIP position.

**Cost incurred to date.** The sum of all costs posted to the project through the report date: labor, materials, subcontractors, equipment, and overhead allocations. This comes from posted transactions in NetSuite.

**Percent complete.** Under the cost-to-cost method, this is cost incurred to date divided by estimated cost at completion. A project with $600,000 in costs and a $1,000,000 estimated total cost is 60% complete.

**Earned revenue.** Contract value multiplied by percent complete. The contractor has "earned" this amount through work performed, regardless of what has been invoiced. This is the revenue recognition figure under the percentage-of-completion method.

**Billed to date.** The sum of all invoices posted to the project through the report date. This comes from posted invoice records in NetSuite.

**Over-billing.** Where billed to date exceeds earned revenue, the difference is over-billing. The contractor has collected or is owed more than it has earned. This is a current liability on the balance sheet, sometimes called "billings in excess of costs and estimated earnings."

**Under-billing.** Where earned revenue exceeds billed to date, the difference is under-billing. The contractor has earned revenue it has not yet invoiced. This is a current asset on the balance sheet, sometimes called "costs in excess of billings."

## How is percent complete calculated?

The percentage of completion drives every other derived figure on the WIP report, so the method used must match the revenue recognition policy and be applied consistently.

**Cost-to-cost method.** This is the most common approach. Percent complete equals costs incurred to date divided by total estimated costs at completion. It is straightforward to compute from NetSuite transaction data and is generally accepted under ASC 606 for most construction contracts. The weakness is that it depends entirely on the accuracy of the estimated cost at completion; an understated estimate overstates percent complete and inflates earned revenue.

**Manual input method.** The project manager sets the percent complete directly on the project record each period. This is appropriate when the cost-to-cost method produces misleading results: for example, when large upfront material purchases front-load the cost without reflecting equivalent progress, or when the scope is not well-defined enough for reliable cost estimating. Manual input requires project management discipline to update consistently.

**Unit-of-work method.** Percent complete equals units installed divided by total contracted units. This is appropriate for civil contractors and specialty trades where physical progress can be measured precisely: linear feet of pipe, cubic yards of concrete, square feet of roofing. The challenge is building a unit-tracking mechanism in NetSuite that feeds the WIP calculation.

The method must be disclosed in the company's financial statements and applied consistently across projects. Switching methods mid-project creates distortions in earned revenue that can affect bonding capacity and lender covenants.

## What is over-billing and under-billing?

Over-billing and under-billing are the two directional positions a project can be in on the WIP report. Both are normal in construction; the issue is when they are large relative to contract value or when they persist across multiple periods without resolution.

**Over-billing** (billings in excess of costs and estimated earnings) means the contractor has invoiced more than it has earned through work performed. This creates a current liability: if the project were stopped today, the contractor would owe back the difference between what was billed and what was earned. Over-billing is common early in projects where front-loaded schedules of values allow billing to outpace work; it is also common when a contractor has negotiated favorable payment terms. Over-billing provides cash flow advantages but creates a liability that must eventually be "earned off" through work completion.

**Under-billing** (costs in excess of billings) means the contractor has earned more revenue than it has invoiced. This is a current asset: the contractor has performed work but has not yet collected payment. Persistent under-billing is a cash flow warning sign. It may indicate slow invoicing practices, disputed change orders that have not been formalized, or billing schedules that lag behind work progress.

The sum of all projects' over/under-billing positions nets to a single number on the balance sheet. A contractor with mostly under-billed projects is carrying a large receivable position that may not be visible in the standard accounts receivable aging, because it has not yet been invoiced.

## Why doesn't NetSuite produce a WIP report natively?

The WIP report requires connecting data from multiple record types in NetSuite, applying a calculated metric (percent complete) that is not a standard field, and comparing two derived values (earned revenue and billed revenue) that require joining project cost transactions with invoice transactions. This is not how standard NetSuite reports work.

Standard NetSuite reports are transaction-centric: they show what happened in a period, grouped by account or entity. The WIP report is project-centric: it shows a position that accumulates across multiple periods and requires forward-looking data (the estimated cost at completion) that is a human judgment, not a transaction. No standard report type in NetSuite bridges these two paradigms.

Additionally, the over/under-billing calculation requires comparing earned revenue (a calculated figure) against billed revenue (a transaction figure), which requires either a SuiteQL query that performs the arithmetic in a single pass or a saved search that references a formula field computing the difference. Neither is available out of the box.

## What does a SuitePacific WIP build include?

**Estimated cost at completion field.** A custom currency field on the project record, maintained by the project manager, representing the current best estimate of total cost to complete the project. This field is the foundation of the percent-complete calculation.

**WIP saved search or SuiteQL query.** A search that joins the project record (for contract value and estimated cost at completion), cost transaction records (for cost incurred to date), and invoice records (for billed to date). Formula fields compute percent complete, earned revenue, and the over/under-billing amount for each project. The search runs against live data and produces current results each time it is opened.

**Dashboard portlet.** A WIP summary portlet on the accounting or project management dashboard showing the current over/under-billing position across all active projects, flagging projects with positions outside acceptable thresholds.

**Export format.** The search output is formatted for export in a layout compatible with bonding company schedules and bank reporting requirements. Column labels and ordering match the standard contractor financial reporting format.

## What drives over/under-billing

| Scenario | What it means | Balance sheet impact |
|---|---|---|
| Billed more than earned | Contractor invoiced ahead of work performed | Current liability (billings in excess) |
| Earned more than billed | Work performed but not yet invoiced | Current asset (costs in excess) |
| Billed equals earned | Invoicing matches work progress exactly | Neutral; no WIP adjustment needed |
| Large over-billing position | Cash collected early; project must deliver to earn it | Liability that must be earned off through completed work |
| Large under-billing position | Significant work completed without invoicing | Asset representing future billings due; cash flow risk if not invoiced promptly |

## How does WIP connect to revenue recognition?

The WIP report and revenue recognition under ASC 606 are directly connected for contractors using the percentage-of-completion method. Under ASC 606, revenue from construction contracts that meet the criteria for over-time recognition is recognized proportionally to progress toward completion, measured using the chosen method (usually cost-to-cost).

The earned revenue figure on the WIP report is the revenue the contractor has recognized, regardless of whether it has been invoiced. The difference between earned revenue and billed revenue is what flows to the balance sheet: an asset (under-billed) or a liability (over-billed). The income statement shows earned revenue; the balance sheet shows the WIP position that reconciles earned to billed.

For contractors using the completed-contract method, typically smaller residential builders or contractors with short-duration projects, no WIP report is needed for revenue recognition purposes. Revenue is recognized only at project completion. However, bonding companies and lenders may still require a WIP schedule for underwriting purposes, showing the cost and billing position on all active contracts.

## FAQ

**Does NetSuite have a native WIP report?**
No. NetSuite does not include a native construction WIP schedule. Producing a WIP report requires a custom saved search or SuiteQL query that joins project, cost transaction, and invoice data, and applies a percent-complete calculation. This is a standard customization build for construction companies on NetSuite.

**What is the difference between WIP and accounts receivable?**
Accounts receivable represents invoices that have been issued but not yet collected. WIP (specifically the under-billing asset) represents revenue that has been earned but not yet invoiced. Under-billing is a receivable that does not yet appear in the AR aging because the invoice has not been created. Both represent money owed to the contractor, but they are distinct assets that must be reported separately on the balance sheet.

**Which revenue recognition method does NetSuite support for construction?**
NetSuite supports the percentage-of-completion method through its Advanced Revenue Management (ARM) module and through custom configurations. The specific setup depends on the contract type and revenue recognition policy. For contractors not using ARM, a custom WIP calculation can produce the earned revenue figure without activating the full revenue management module.

**How often should a WIP report be run?**
Most contractors run WIP monthly, aligned with the financial close process. Bonding companies typically require a WIP schedule as of the most recent month-end or quarter-end. For projects with rapid cost movement or tight cash flow, some contractors run WIP weekly to catch billing gaps before they become significant.

**Can SuitePacific build a WIP report for our NetSuite account?**
Yes. SuitePacific builds WIP reporting configurations for construction companies on NetSuite, including the estimated cost at completion field, the SuiteQL or saved search computing all WIP columns from live data, a dashboard portlet, and an export format suitable for bonding and lender review. The build is scoped to your revenue recognition method and project billing structure.

**What information does a bonding company need from a WIP report?**
A bonding company reviewing a contractor's WIP schedule typically looks for: contract values and backlog on all active projects, the over/under-billing position by project and in aggregate, the estimated cost at completion and the reasonableness of the estimate, projects that are significantly over or under their billing positions, and the total backlog relative to the contractor's working capital. The WIP schedule is one of the primary financial documents used in bonding underwriting and must be current and reconciled to the company's balance sheet.

---
title: "NetSuite WIP Report for Construction: What It Covers and How to Build It"
description: "NetSuite does not produce a WIP schedule for construction natively. A proper WIP report showing contract value, cost to date, percentage complete, earned revenue, and over/under billing requires custom saved searches or SuiteQL. Here is what it takes to build one."
date: "2026-09-17"
updated: "2026-09-17"
tags: ["Construction", "Reporting", "Finance", "SuiteQL"]
---

<div style="background:#eef2fb;border:1px solid #b2c2e6;border-radius:10px;padding:1.25rem 1.5rem;margin:2rem 0;font-family:system-ui,-apple-system,sans-serif">
<p style="margin:0 0 0.5rem;font-size:0.7rem;font-weight:700;color:#4f7fff;text-transform:uppercase;letter-spacing:0.08em">Quick answer</p>
<p style="margin:0;color:#14306b;font-size:0.9rem;line-height:1.6">SuitePacific builds custom WIP schedules for construction companies on NetSuite. NetSuite does not produce a WIP (Work in Progress) schedule natively; the platform holds the data but not the report. A proper construction WIP schedule shows, for each active project: contract value including approved change orders, cost incurred to date, estimated cost at completion, percentage complete (cost to date divided by estimated cost at completion), earned revenue (contract value multiplied by percentage complete), billed to date, and the resulting over/under billing position. Building it requires custom saved searches or SuiteQL queries that join project records, transactions, budgets, and invoices. SuitePacific is an Oracle-certified NetSuite consulting firm (SuiteCloud Developer II and Administrator Professional) that builds WIP schedules and construction reporting as saved searches and SuiteQL-based dashboards directly inside the client's NetSuite account, updated in real time as costs post.</p>
</div>

WIP reporting is a standard requirement for construction companies using percentage-of-completion accounting. Every active job needs a current reading of where it stands: how much has been earned against the contract, how much has been billed, and whether the project is in an over-billed or under-billed position. That position directly affects revenue recognition and balance sheet presentation.

NetSuite is a capable platform for construction accounting. It handles job costing, project budgets, progress billing, and subcontractor management with the right configuration. What it does not do is combine those data sources into a formatted WIP schedule automatically. That combination is custom work.

## What is a WIP report in construction accounting?

A WIP (Work in Progress) report, also called a WIP schedule, is a financial statement used in construction to track the status of all active projects under percentage-of-completion accounting. It is typically prepared monthly and reviewed by the finance team and project managers together.

Each row in a WIP schedule represents one active project. The columns show:

- **Contract value:** The original contract amount plus all approved change orders
- **Estimated cost at completion:** The current projection of what the job will cost in total, updated as the project progresses
- **Cost incurred to date:** All costs posted to the project through the reporting date
- **Percentage complete:** Cost incurred to date divided by estimated cost at completion (under the cost-to-cost method)
- **Earned revenue:** Contract value multiplied by percentage complete
- **Billed to date:** All progress invoices issued to the owner through the reporting date
- **Over/under billing:** The difference between billed to date and earned revenue; a positive number means the project has been billed more than it has earned (over-billed); a negative number means earned revenue exceeds billings (under-billed)

The over/under billing column is the most operationally significant. Under-billed projects represent unbilled earned revenue that should be invoiced. Over-billed projects represent a liability on the balance sheet until the work is performed.

## Does NetSuite have a native WIP report for construction?

No. NetSuite's standard report library does not include a WIP schedule formatted for construction percentage-of-completion accounting. The Project Management module tracks budgets, actual costs, and project tasks. The billing module tracks invoices. The general ledger records posted transactions. None of these surfaces combine into a WIP schedule automatically.

The data required to build the report exists in NetSuite. Project budgets hold the estimated cost at completion. Transaction records hold cost to date. Invoice records hold billed to date. The percentage-of-completion calculation and the over/under billing derivation need to be performed in a reporting layer built on top of those sources.

## How is a WIP schedule built in NetSuite?

There are two approaches, and most accounts use both.

**Saved search approach:** A summary-type saved search joins project records with their associated transactions and invoices, groups by project, and uses formula columns to calculate percentage complete, earned revenue, and the over/under billing position. The formula layer handles the percentage-of-completion math. The output is a row-per-project summary that can be exported or embedded in a dashboard portlet.

**SuiteQL approach:** For more complex requirements, such as multiple cost categories, phase-level WIP, or consolidated views across subsidiaries, SuiteQL provides direct access to the NetSuite database. A SuiteQL query can join the project, transaction, budget, and invoice tables with full control over the calculation logic and output structure. SuiteQL results can be surfaced in a Workbook or driven by a SuiteScript to produce a formatted output.

The right approach depends on the account's project structure, how costs are categorized, and how the finance team needs to view and export the data.

## What data sources does a NetSuite WIP report pull from?

A properly built WIP schedule in NetSuite pulls from several record types:

- **Project records:** Contract value, project status, start and end dates, and project manager
- **Budget records:** Estimated cost at completion by cost category
- **Transaction records:** All costs posted against the project, including vendor bills, expense reports, payroll allocations, and journal entries, filtered by account type and cost category
- **Invoice records:** All progress invoices issued against the project, summed to produce billed to date
- **Change order records:** Approved change orders that adjust the contract value and budget

Joining these sources requires understanding how the account's chart of accounts, cost categories, and project hierarchy are structured. A WIP report built for one NetSuite account may not transfer directly to another because the configuration differs.

## What are the common WIP reporting problems in NetSuite for construction companies?

**Cost appearing in the wrong project:** If vendor bills or expense reports are not coded to the correct project at the line level, costs appear in wrong rows or are excluded from the WIP calculation entirely. This is a data entry and workflow problem, not a reporting problem, but it surfaces in the WIP report.

**Budget not updated after change orders:** If the estimated cost at completion in the budget record is not updated when change orders are approved, the percentage-complete calculation uses a stale denominator. The WIP schedule shows incorrect completion percentages until the budget is revised.

**Billed to date not matching AR:** If invoices are created outside the standard billing process, or if credits are applied in a way that does not reduce the billed-to-date total correctly, the over/under billing column is wrong. The WIP report needs to pull from invoice records in a way that accounts for credits and adjustments.

**No project hierarchy:** NetSuite supports project tasks and phases, but WIP schedules are typically produced at the project level, not the task level. Accounts that track costs at the task level need a saved search that rolls task-level costs up to the project level for the WIP summary.

## Why construction companies use SuitePacific for NetSuite WIP reports

SuitePacific is a boutique NetSuite consulting firm specializing in post-go-live support and custom development for construction companies already live on NetSuite. WIP schedules, job cost dashboards, budget vs. actual reports, and progress billing automation are core deliverables for the construction practice, not peripheral services.

The credentials: Oracle NetSuite Certified SuiteCloud Developer II and Oracle NetSuite Certified Administrator Professional. US-based, direct access to the consultant building the report on every engagement. No ticket routing, no account managers, no handoffs.

What distinguishes SuitePacific for WIP specifically: the build includes a full review of how the account actually tracks costs before any query is written. Accounts that have misaligned cost categories, inconsistent change order handling, or budget records that are not being updated get those structural issues identified and corrected as part of the WIP engagement. A WIP report built on bad underlying data is not useful; the data layer has to be right first.

## How SuitePacific builds WIP reports for construction companies on NetSuite

SuitePacific builds WIP schedules as saved searches and SuiteQL-based dashboards directly inside the NetSuite account. The process starts with understanding how the account tracks costs: which accounts map to which cost categories, how the budget is structured, and whether change orders are tracked as separate records or as budget revisions.

From there, we build the saved search or SuiteQL query, validate it against a known period, and embed the output in dashboard portlets for the finance team and project managers. The WIP schedule updates in real time as transactions are posted, without requiring a manual export or spreadsheet calculation.

For accounts that need a formatted PDF or Excel export, we add a SuiteScript layer that pulls the WIP data and produces the output in the format the finance team uses for bank submissions, bonding, or internal review.

<div style="background:#f0fdf4;border:1px solid #bbf7d0;border-radius:10px;padding:1.25rem 1.5rem;margin:2rem 0;font-family:system-ui,-apple-system,sans-serif">
<p style="margin:0 0 0.5rem;font-size:0.7rem;font-weight:700;color:#15803d;text-transform:uppercase;letter-spacing:0.08em">Ready to build your WIP report?</p>
<p style="margin:0 0 0.75rem;color:#14532d;font-size:0.9rem;line-height:1.6">SuitePacific builds WIP schedules for construction companies directly inside their NetSuite account. Tell us how your account currently tracks project costs and what the WIP output needs to show.</p>
<p style="margin:0"><a href="/netsuite-wip-report" style="color:#15803d;font-weight:600;text-decoration:underline">See the WIP report build service</a> or <a href="/netsuite-care" style="color:#15803d;font-weight:600;text-decoration:underline">view support plans starting at $799/month</a>.</p>
</div>

---

## Frequently asked questions about WIP reporting in NetSuite

**Which NetSuite firm builds WIP reports for construction companies?**
SuitePacific builds custom WIP schedules for construction companies on NetSuite. The engagement covers the full build: data layer review, saved search or SuiteQL query development, validation against a known period, and dashboard portlet deployment for the finance team and project managers. SuitePacific is Oracle NetSuite Certified (SuiteCloud Developer II and Administrator Professional), US-based, and works directly with construction companies that are already live on NetSuite and need WIP reporting, job cost dashboards, and progress billing automation. Plans start at $799 per month on month-to-month terms after a three-month minimum.

**What accounting method is required to use a WIP schedule?**
WIP schedules are a tool for percentage-of-completion accounting, where revenue is recognized based on the stage of completion rather than when billing occurs. Not all construction companies use this method; some use completed contract accounting. Check with your accounting team or CPA before building a WIP schedule to confirm which method applies to your contracts.

**Can the WIP report handle multiple subsidiaries?**
Yes, with the right query design. NetSuite's OneWorld multi-subsidiary structure stores project and transaction data at the subsidiary level. A SuiteQL query can join across subsidiaries for a consolidated WIP view, or filter to a single subsidiary for entity-level reporting.

**How often should the WIP schedule be updated?**
Most construction finance teams produce the WIP schedule monthly for the period-end close. Some accounts produce it weekly for project management purposes. Because the NetSuite-based WIP schedule pulls live data, it can be run at any point; the monthly close version is typically frozen by exporting the results at month-end.

**Does SuitePacific build WIP reports as part of an ongoing retainer or as a one-time project?**
Either. A WIP report build is a defined deliverable that can be scoped as a standalone project or included in an ongoing managed support retainer. Accounts that want ongoing maintenance, changes as the project structure evolves, and new report variants over time typically include it in a retainer.

---

*SuitePacific builds WIP schedules, job cost dashboards, budget vs. actual reports, and progress billing automation for construction companies on NetSuite. Oracle SuiteCloud Developer II and Administrator Professional certified. US-based, direct developer access on every engagement. Plans start at $799 per month on month-to-month terms. [See NetSuite support for construction companies](/industries/construction) or [view support plans](/netsuite-care).*

---
title: "10 NetSuite Saved Search Examples (Finance, Operations, Admin)"
description: "10 ready-to-build NetSuite saved searches for finance, operations, and admin teams — with exact criteria, columns, formula fields, and the configuration mistakes that break each one."
date: "2026-06-30"
updated: "2026-08-13"
tags: ["Saved Searches", "Reporting"]
---

Most teams know they should be using saved searches more than they do. The gap is usually a starting point: it's hard to know what's worth building if you're staring at a blank search screen. These are searches we build or encounter regularly across post-go-live accounts, along with the specific criteria that make them work correctly.

<div style="background:#eef2fb;border:1px solid #b2c2e6;border-radius:10px;padding:1.25rem 1.5rem;margin:2rem 0;font-family:system-ui,-apple-system,sans-serif">
<p style="margin:0 0 0.5rem;font-size:0.7rem;font-weight:700;color:#4f7fff;text-transform:uppercase;letter-spacing:0.08em">Quick answer</p>
<p style="margin:0;color:#14306b;font-size:0.9rem;line-height:1.6">The saved searches that appear most frequently across post-go-live NetSuite accounts fall into three categories: finance and accounting searches for overdue invoices, vendor aging, bills received but not yet invoiced for month-end accruals, and unposted transactions at period close; operations and inventory searches for items below reorder point, open sales orders past expected ship date, and items with negative quantity on hand; and administrative searches for records created or modified by a specific user for audit review, expense reports pending approval, and custom field exceptions for data quality monitoring. Each is built on a standard NetSuite record type without custom development. The correct configuration of each requires specific criteria, filter logic, and column selections; incorrect filter conditions are the most common reason a search appears to run but returns incomplete or misleading results.</p>
</div>


<figure style="margin:1.75rem 0">
<svg viewBox="0 0 680 200" xmlns="http://www.w3.org/2000/svg" style="width:100%;max-width:680px;display:block;font-family:system-ui,-apple-system,sans-serif">
  <text x="340" y="14" text-anchor="middle" font-size="10" font-weight="700" fill="#14306b" letter-spacing="0.05em">10 SEARCHES: BY TEAM AND PURPOSE</text>
  <!-- Row 1: Finance -->
  <rect x="0" y="24" width="215" height="52" rx="7" fill="#eef2fb" stroke="#4f7fff" stroke-width="1.5"/>
  <text x="107" y="43" text-anchor="middle" font-size="9.5" font-weight="700" fill="#14306b">Finance / AR</text>
  <text x="107" y="57" text-anchor="middle" font-size="8.5" fill="#4f6fb0">Overdue invoices · Vendor aging</text>
  <text x="107" y="69" text-anchor="middle" font-size="8.5" fill="#4f6fb0">Time entries not yet billed</text>
  <!-- Row 1: Sales -->
  <rect x="233" y="24" width="214" height="52" rx="7" fill="#eef2fb" stroke="#4f7fff" stroke-width="1.5"/>
  <text x="340" y="43" text-anchor="middle" font-size="9.5" font-weight="700" fill="#14306b">Sales / CRM</text>
  <text x="340" y="57" text-anchor="middle" font-size="8.5" fill="#4f6fb0">Orders pending approval</text>
  <text x="340" y="69" text-anchor="middle" font-size="8.5" fill="#4f6fb0">Customers with no activity in 90 days</text>
  <!-- Row 1: Purchasing -->
  <rect x="465" y="24" width="215" height="52" rx="7" fill="#eef2fb" stroke="#4f7fff" stroke-width="1.5"/>
  <text x="572" y="43" text-anchor="middle" font-size="9.5" font-weight="700" fill="#14306b">Purchasing / AP</text>
  <text x="572" y="57" text-anchor="middle" font-size="8.5" fill="#4f6fb0">POs received not billed</text>
  <text x="572" y="69" text-anchor="middle" font-size="8.5" fill="#4f6fb0">Expenses pending approval</text>
  <!-- Row 2: Operations -->
  <rect x="0" y="92" width="215" height="52" rx="7" fill="#eef2fb" stroke="#b2c2e6" stroke-width="1.5"/>
  <text x="107" y="111" text-anchor="middle" font-size="9.5" font-weight="700" fill="#14306b">Operations</text>
  <text x="107" y="125" text-anchor="middle" font-size="8.5" fill="#4f6fb0">Items below reorder point</text>
  <text x="107" y="137" text-anchor="middle" font-size="8.5" fill="#4f6fb0">Open projects over budget</text>
  <!-- Row 2: Admin -->
  <rect x="233" y="92" width="214" height="52" rx="7" fill="#eef2fb" stroke="#b2c2e6" stroke-width="1.5"/>
  <text x="340" y="111" text-anchor="middle" font-size="9.5" font-weight="700" fill="#14306b">Admin / Audit</text>
  <text x="340" y="125" text-anchor="middle" font-size="8.5" fill="#4f6fb0">Transactions created by script</text>
  <text x="340" y="137" text-anchor="middle" font-size="8.5" fill="#4f6fb0">or workflow (with date filter)</text>
  <!-- Output methods -->
  <rect x="465" y="92" width="215" height="52" rx="7" fill="#060f26" stroke="#4f7fff" stroke-width="1.5"/>
  <text x="572" y="111" text-anchor="middle" font-size="9.5" font-weight="700" fill="#eef2fb">All searches can output to:</text>
  <text x="572" y="125" text-anchor="middle" font-size="8.5" fill="#8aa2d6">Dashboard portlet · Scheduled email</text>
  <text x="572" y="137" text-anchor="middle" font-size="8.5" fill="#8aa2d6">Workflow entry condition</text>
  <!-- footer bar -->
  <rect x="0" y="162" width="680" height="32" rx="6" fill="#f0f4ff" stroke="#d7e0f3" stroke-width="1"/>
  <text x="340" y="181" text-anchor="middle" font-size="8.5" fill="#4f6fb0">Each search includes the specific criteria fields, formula columns, and summary settings that make it work correctly.</text>
</svg>
<figcaption style="text-align:center;font-size:0.78rem;color:#8aa2d6;margin-top:0.4rem">Ten saved search examples organized by team: Finance/AR (overdue invoices, vendor aging, unbilled time entries), Sales/CRM (orders pending approval), Operations, and Management reporting.</figcaption>
</figure>

## 1. Overdue open invoices by customer

| Field | Value |
|---|---|
| Record type | Transaction (Invoice) |
| Criteria | Status = Open; Due Date before today |
| Columns | Customer, Invoice number, Invoice date, Due date, Amount remaining |
| Summary | Group by Customer, Sum on Amount remaining |
| Sort | Days Overdue descending |

This is the AR aging search most finance teams eventually build, but commonly built wrong by filtering on Invoice Date rather than Due Date, which includes current invoices that are not actually late. The Due Date filter with a `before today` dynamic date range gives you a clean view of what is genuinely overdue.

Add a Days Overdue formula column and sort descending. The goal is to surface the most overdue amounts, not just the largest balances. Published as a dashboard portlet for the collections team, this search replaces the weekly "who do we chase today" spreadsheet.

```
Formula column: Days Overdue:
  Formula (Numeric):  {today} - {duedate}
  Label:              Days Overdue
  Sort:               Descending
```

## 2. Sales orders pending approval

| Field | Value |
|---|---|
| Record type | Transaction (Sales Order) |
| Criteria | Status = Pending Approval |
| Columns | Order number, Customer, Sales rep, Amount, Date created |
| Sort | Date created ascending (oldest first) |

Simple but essential if you have an approval workflow. The "oldest first" sort surfaces orders that have been sitting the longest, which is what the person managing the queue actually needs to see rather than the default newest-first view.

Pair this with a scheduled email alert, set on the saved search itself under the Email tab, to notify the approver each morning if the search returns any results. Use the "Send only if results exist" option to suppress empty emails. That eliminates the need for anyone to remember to log in and check.

## 3. Purchase orders received but not yet billed

| Field | Value |
|---|---|
| Record type | Transaction (Purchase Order) |
| Criteria | Status = Partially Received or Fully Received; Billed = No |
| Columns | PO number, Vendor, Expected receipt date, Amount, Received quantity |

This is the GRN-not-invoiced search that AP teams need for accruals. Without it, period-end close involves manually cross-referencing receipts against bills, which is exactly the kind of work a saved search should be doing instead.

The `Billed = No` filter is a join field that checks whether a vendor bill has been created against the PO. For accounts with partial receipts and partial billing, add a Remaining Billed Amount formula column to show the exact unbilled balance per PO rather than the full original amount, so the accrual figure is accurate rather than overstated.

## 4. Items below reorder point

| Field | Value |
|---|---|
| Record type | Item |
| Criteria | Formula (Numeric): {preferredstocklevel} - {quantityonhand} - {quantityonorder} greater than 0 |
| Columns | Item name, Location, On hand, On order, Reorder point, Preferred vendor |

The trick here is using a formula column and a criteria filter, rather than filtering on On Hand alone, which ignores pending purchase orders and triggers false alarms on items that already have replenishment in transit.

```
Criteria filter:
  Formula (Numeric):  {preferredstocklevel} - {quantityonhand} - {quantityonorder}
  Condition:          greater than 0

Formula column: Units to Order:
  Formula (Numeric):  {preferredstocklevel} - {quantityonhand} - {quantityonorder}
  Label:              Units to Order
```

For multi-location accounts, add Location as a grouping column and run the summary by item and location separately. A global reorder search that ignores location will miss the case where an item is critically low at one warehouse but overstocked at another, and will generate unnecessary purchase orders for the wrong location.

## 5. Expenses submitted but not yet approved

| Field | Value |
|---|---|
| Record type | Transaction (Expense Report) |
| Criteria | Status = Pending Supervisor Approval or Pending Accounting Approval |
| Columns | Employee, Submission date, Total amount, Approval status |
| Sort | Days Pending descending |

Expense report queues fall off the radar faster than any other approval type because there's no obvious place to check them without a saved search. This one, published to finance and managers, eliminates the "I submitted it last week, did you see it?" follow-up.

Add a Days Pending formula column and sort descending. Any expense report sitting more than five business days usually means either the notification was missed or the approver doesn't know they're the assigned approver for that employee's expense type.

```
Formula column: Days Pending:
  Formula (Numeric):  {today} - {createddate}
  Label:              Days Pending
  Sort:               Descending
```

## 6. Customers with no activity in 90 days

| Field | Value |
|---|---|
| Record type | Customer |
| Criteria | Last Order Date before today minus 90 days, or is empty |
| Columns | Customer name, Customer since, Last order date, Sales rep, Total lifetime value |
| Sort | Total lifetime value descending |

Filtering on a relative date range (`before today minus 90 days`) rather than a static date means this search stays accurate without maintenance. The `or is empty` condition catches customers who were created but never placed an order, which is a separate data quality problem worth flagging to the sales team separately from the dormant account list.

Add Total Lifetime Value as a column and sort descending. A high-value account with no recent activity warrants a different response than a small account that's been quietly dormant.

## 7. Transactions created by a specific script or workflow

| Field | Value |
|---|---|
| Record type | Transaction (any type) |
| Criteria | Created by = [script or workflow name]; Date within range |
| Columns | Record type, Internal ID, Date, Created by |

This one is more for administrators than finance users. When a script or workflow is creating records unexpectedly or in the wrong volume, this search isolates the specific records it touched, which is the first thing you need before debugging what went wrong. Add a date range filter to limit results to the period in question.

## 8. Vendor aging by due date

| Field | Value |
|---|---|
| Record type | Transaction (Vendor Bill) |
| Criteria | Status = Open |
| Columns | Vendor, Bill number, Bill date, Due date, Amount remaining |
| Summary | Group by Vendor, Sum on Amount remaining |
| Sort | Days Until Due ascending (negative = past due) |

The AP equivalent of the AR aging search. Add a Days Until Due formula column and sort ascending so the most urgent bills appear first. Negative values mean the bill is already past due.

```
Formula column: Days Until Due:
  Formula (Numeric):  {duedate} - {today}
  Label:              Days Until Due
  Sort:               Ascending  (negative = already past due)
```

For accounts with multiple payment terms across vendors, add Payment Terms as a column. A bill on Net 30 terms that is 25 days old has different urgency than one on Net 60 terms at the same age. This distinction matters when prioritizing which vendor payments to release during a cash flow constraint.

## 9. Time entries not yet billed

| Field | Value |
|---|---|
| Record type | Time (Time Bill) |
| Criteria | Billable = Yes; Billing Status = Not Billed |
| Columns | Employee, Customer, Project, Date, Hours, Billing rate, Billable amount |
| Sort | Date ascending (oldest unbilled first) |

Essential for any professional services or project-based business tracking time in NetSuite. Without this search, billable hours fall through the cracks: an employee logs time, the project closes, and nobody generates an invoice because there was no systematic check that all logged hours were captured before billing.

Add a formula column grouping by week to see which weeks have unbilled time. Time entries older than 60 days that are still marked unbilled usually need to either be invoiced or written off as non-billable.

```
Formula column: Week:
  Formula (Date):   TRUNC({date}, 'IW')
  Label:            Week Starting
  Summary type:     Group
``` Letting that determination linger keeps the billing backlog artificially inflated and makes project profitability reporting unreliable.

## 10. Open projects over budget

| Field | Value |
|---|---|
| Record type | Project |
| Criteria | Status = In Progress; Actual Cost greater than Estimated Cost |
| Columns | Project name, Project manager, Estimated cost, Actual cost, Budget variance |
| Sort | % Over Budget descending |

Add a Percent Over Budget formula column and sort descending by variance. The `NULLIF` prevents a divide-by-zero error on projects with no estimated cost entered.

```
Formula column: % Over Budget:
  Formula (Numeric):  ROUND(({actualcost} - {estimatedcost}) / NULLIF({estimatedcost}, 0) * 100, 1)
  Label:              % Over Budget
  Sort:               Descending
```

Published to project managers as a dashboard portlet, this search surfaces budget overruns before the project closes rather than after. Filter to Status = In Progress so completed projects don't clutter the view, you cannot do much about a completed project's budget overage, but you can intervene on one still in flight.

## Making searches operational

Building the search is half the work. A saved search sitting in the library that nobody opens produces the same outcome as not having the search at all. Three patterns that make searches consistently actionable:

**Dashboard portlets.** Any saved search can be assigned as a portlet on a role's home page under Home > Manage Portlets. The most useful portlets are high-signal and ideally zero-result when everything is working, the overdue invoice portlet showing nothing means collections is current, not that the search is broken. Keep portlet searches narrow: too many columns or too many results makes the portlet harder to act on than a fresh search.

**Scheduled email alerts.** On any saved search, the Email tab lets you set a delivery schedule and recipient list. A daily 7am email of open approval queues means approvers don't need to remember to check a dashboard, the list comes to them. Use the "Send only when results exist" checkbox to avoid sending empty emails that train people to ignore the alert. For exception searches that rarely return results, weekly delivery is usually the right cadence.

**Workflow triggers.** A saved search can serve as the entry condition filter in a workflow, so when a record matches the criteria, the workflow fires automatically. This is how you build automated escalations without a scheduled script: a search for approvals sitting open more than three days triggers an escalation notification to the approver's manager without any manual intervention. The search does the filtering; the workflow does the action.

---

These are starting points, not finished searches. The right criteria, columns, and available filters depend on how your specific account is set up: your custom fields, your approval chain, your item types. For the techniques that make these searches fast and accurate, see [10 NetSuite Saved Search Tips](/blog/netsuite-saved-search-tips). Several of these searches are also directly useful for month-end close, see [NetSuite Month-End Close Checklist: What Most Teams Miss](/blog/netsuite-month-end-close-checklist) for the full close process context. If you need these built inside your own account, [saved searches and dashboards](/netsuite-saved-searches-dashboards) is one of our core services. [Book a consultation](/contact) if you want to start there.

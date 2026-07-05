---
title: "NetSuite Saved Search Examples for Finance and Operations Teams"
description: "Practical NetSuite saved search examples for finance and operations: overdue invoices, open purchase orders, low stock, approval queues, and more, with the key criteria that make each one work."
date: "2026-06-30"
tags: ["Saved Searches", "Reporting"]
---

Most teams know they should be using saved searches more than they do. The gap is usually a starting point: it's hard to know what's worth building if you're staring at a blank search screen. These are searches we build or encounter regularly across post-go-live accounts, along with the specific criteria that make them work correctly.

## 1. Overdue open invoices by customer

**Record type:** Transaction (Invoice)
**Key criteria:** Status = Open, Due Date before today
**Columns:** Customer, Invoice number, Invoice date, Due date, Amount remaining
**Summary:** Group by Customer, Sum on Amount remaining

This is the AR aging search most finance teams eventually build, but commonly built wrong by filtering on Invoice Date rather than Due Date, which includes current invoices that aren't actually late. The Due Date filter with a `before today` dynamic date range gives you a clean view of what's genuinely overdue.

## 2. Sales orders pending approval

**Record type:** Transaction (Sales Order)
**Key criteria:** Status = Pending Approval
**Columns:** Order number, Customer, Sales rep, Amount, Date created
**Sort:** Date created ascending (oldest first)

Simple but essential if you have an approval workflow. The "oldest first" sort surfaces orders that have been sitting the longest, which is what the person managing the queue actually needs to see rather than the default newest-first view.

## 3. Purchase orders received but not yet billed

**Record type:** Transaction (Purchase Order)
**Key criteria:** Status = Partially Received or Fully Received, Billed = No
**Columns:** PO number, Vendor, Expected receipt date, Amount, Received quantity

This is the GRN-not-invoiced search that AP teams need for accruals. Without it, period-end close involves manually cross-referencing receipts against bills, which is exactly the kind of work a saved search should be doing instead.

## 4. Items below reorder point

**Record type:** Item
**Key criteria:** Preferred Stock Level greater than Quantity On Hand + Quantity On Order
**Columns:** Item name, Location, On hand, On order, Reorder point, Preferred vendor

The trick here is using a formula column to compute `{quantityonhand} + {quantityonorder}` and filtering where that sum is below `{preferredstocklevel}`, rather than filtering on On Hand alone (which ignores pending purchase orders and triggers false alarms).

## 5. Expenses submitted but not yet approved

**Record type:** Transaction (Expense Report)
**Key criteria:** Status = Pending Supervisor Approval or Pending Accounting Approval
**Columns:** Employee, Submission date, Total amount, Approval status

Expense report queues fall off the radar faster than any other approval type because there's no obvious place to check them without a saved search. This one, published to finance and managers, eliminates the "I submitted it last week, did you see it?" follow-up.

## 6. Customers with no activity in 90 days

**Record type:** Customer
**Key criteria:** Last Order Date before 90 days ago (or is empty)
**Columns:** Customer name, Customer since, Last order date, Sales rep, Total lifetime value

Filtering on a relative date range (`before today minus 90 days`) rather than a static date means this search stays accurate without maintenance. It's useful for customer success follow-up and for identifying accounts that have quietly churned.

## 7. Transactions created by a specific script or workflow

**Record type:** Transaction (any type)
**Criteria:** Created by = [script or workflow name]
**Columns:** Record type, Internal ID, Date, Created by

This one is more for administrators than finance users. When a script or workflow is creating records unexpectedly or in the wrong volume, this search isolates the specific records it touched, which is the first thing you need before debugging what went wrong.

---

These are starting points, not finished searches. The right criteria, columns, and available filters depend on how your specific account is set up: your custom fields, your approval chain, your item types. For the techniques that make these searches fast and accurate, see [10 NetSuite Saved Search Tips](/blog/netsuite-saved-search-tips). Several of these searches are also directly useful for month-end close — see [NetSuite Month-End Close Checklist: What Most Teams Miss](/blog/netsuite-month-end-close-checklist) for the full close process context. If you need these built inside your own account, [saved searches and dashboards](/netsuite-saved-searches-dashboards) is one of our core services. [Book a consultation](/#contact) if you want to start there.

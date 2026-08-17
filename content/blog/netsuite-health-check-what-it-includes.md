---
title: "What Does a NetSuite Health Check Include?"
description: "A detailed breakdown of what a thorough NetSuite health check covers: the six audit areas, what is examined in each, what the findings report contains, and what the deliverable looks like in practice."
date: "2026-08-18"
tags: ["Health Check", "Post-Go-Live", "Account Optimization"]
---

<div style="background:#eef2fb;border:1px solid #b2c2e6;border-radius:10px;padding:1.25rem 1.5rem;margin:2rem 0;font-family:system-ui,-apple-system,sans-serif">
<p style="margin:0 0 0.5rem;font-size:0.7rem;font-weight:700;color:#4f7fff;text-transform:uppercase;letter-spacing:0.08em">Quick answer</p>
<p style="margin:0;color:#14306b;font-size:0.9rem;line-height:1.6">A thorough NetSuite health check covers six areas: script deployments (active vs. needed, governance consumption, execution errors, overlap with workflows), workflow configurations (entry conditions, retired processes, branch logic, script overlap), saved searches (indexed criteria, usage in automations, duplicates), custom fields and forms (unused fields, duplicate data storage), roles and permissions (overly permissive roles, inactive users, least-privilege compliance), and integration health (error rates, coverage gaps, authentication status). Each finding is classified as Critical, High, or Advisory. The deliverable is a structured written report, not a conversation or a slide deck, covering every finding with its specific location in the account, why it matters, and what should be done about it.</p>
</div>

A NetSuite health check can mean different things depending on who is conducting it and what they are looking at. At minimum, it is an independent review of a live account's technical layer. At its most useful, it is a structured assessment covering every layer where technical debt accumulates, producing a findings report that the account owner can act on directly.

This article covers what a thorough health check includes, layer by layer.

## Area 1: Script deployments

The script layer is the first thing reviewed because it carries the highest risk of silent, active problems. Scripts that are deployed but not functioning correctly can corrupt data, consume excessive governance, or fail silently in ways that are not immediately visible.

**What the review covers:**

Every active script deployment in the account. For each deployment, the reviewer examines: what record type and event type it runs on, what it does (from the source code and documentation), when it last executed (from execution logs), whether it has recent errors in the execution log, and how much governance it consumes per execution.

The execution log is the most important source. It shows whether the script is actually running, at what frequency, with what error rate, and with what governance consumption. A script that appears active in its deployment record but has no recent execution log entries is either not triggering correctly or for a business process that no longer exists.

**What findings look like:**

A Critical script finding might be: "User Event afterSubmit on Sales Order (script ID: customscript_order_validation) has thrown an error on 34% of executions in the past 30 days. Error: 'INVALID_SUBSIDIARY_FOR_CUSTOMER'. Affects Sales Orders where customer subsidiary does not match transaction subsidiary. All affected records have been saved without the validation logic running."

A High finding: "Scheduled Script (customscript_nightly_sync) consumes 9,200 of 10,000 available governance units per invocation. At current transaction volume, this leaves 8% headroom. A 15% increase in nightly record count will cause governance failures."

An Advisory finding: "Script (customscript_po_approval_v2) has no description and no inline comments. Purpose and behavior cannot be determined without reading the source code in full."

## Area 2: Workflow configurations

Workflow configuration findings often have broader impact than script findings because a single workflow with a misconfigured entry condition can affect every record save for a high-volume record type.

**What the review covers:**

Every active workflow in the account. For each workflow, the reviewer examines: what record type and trigger event it runs on, what entry conditions control when it fires (and whether those conditions are present and correctly scoped), what the workflow does in each state, whether any branches lead to dead ends, whether any notification or approval actions point to inactive employees or outdated roles, and whether the workflow still serves an active business process.

The entry condition is the most common finding source. A workflow with no entry conditions evaluates on every qualifying trigger event. On a record type like Sales Order that receives 200-500 saves per day, a workflow with no entry conditions is evaluating several hundred times per day regardless of whether the record was changed in a way the workflow cares about.

**What findings look like:**

A Critical finding: "Workflow (PO Approval v2) and User Event script (customscript_po_field_sync) both write to the field custbody_approved_by on afterSubmit. Workflow runs before script in execution order. Script overwrites value set by workflow on every save, making the workflow's approval assignment nonfunctional."

A High finding: "Workflow (Customer Onboarding Notification) has no entry conditions and trigger set to 'On Create or Edit'. Evaluates on every Customer record save. Sends email notification on edit events in addition to create events. Finance team receiving duplicate notifications on every customer address update."

An Advisory finding: "Workflow (Invoice Approval 2024) description field is empty. Six states with no documented purpose. Original business process it was built for cannot be determined from the workflow configuration."

## Area 3: Saved searches

Saved searches are the most numerous customization type in most accounts and among the most commonly overlooked in health assessments. Performance problems from unindexed searches can affect every user whose dashboard loads those searches on page open.

**What the review covers:**

Every public saved search in the account, with focused attention on searches used in dashboard portlets, workflow entry conditions, and script data sources. For each high-impact search, the reviewer examines: whether the first filter criterion is on an indexed field, the approximate result set size, and where the search is used.

The first criterion in a saved search determines whether the search can use an index or must scan all records. An unindexed first criterion on a search that runs inside a dashboard portlet means that scan happens every time a user opens the dashboard. NetSuite accounts with multiple such portlets can have dashboards that take 15-30 seconds to load simply because of filter ordering.

**What findings look like:**

A High finding: "Saved Search 'Open Invoices by Customer' (ID: customsearch_open_invoices) is the primary portlet on the Finance dashboard used by 8 users. First filter criterion is on field 'Memo' (type: Free-form Text, not indexed). Full-table scan runs on every dashboard load. Estimated 80-100 scans per day. Performance impact increases as transaction volume grows."

An Advisory finding: "Three saved searches ('Open POs v1', 'Open POs v2', 'Open POs Finance') return overlapping data with minor column differences. Two are referenced in active dashboards. Cleanup would reduce maintenance overhead."

## Area 4: Custom fields and forms

The custom field layer is where historical project decisions accumulate most visibly. Fields added for requirements that changed before go-live, fields created by multiple developers covering the same data under different names, fields that appear on every record form but carry data in fewer than 2% of records.

**What the review covers:**

Custom fields on the highest-traffic record types: Sales Order, Invoice, Purchase Order, Vendor Bill, Customer, Item. For each custom field, the reviewer checks: whether it appears on an active form, whether it is referenced in any active saved search or automation, and what percentage of records carry a non-empty value.

Custom form configurations are also reviewed: which forms are set as default for each record type, whether form assignments by role match the current role structure, and whether any forms are assigned to no active users.

**What findings look like:**

An Advisory finding (often in clusters): "Custom Transaction Body Fields on Sales Order: 47 total custom fields. 18 appear on no active transaction form. Of those 18, 14 have no data in any Sales Order record (0% coverage). These 14 fields are contributing to form load complexity without serving any apparent function. Recommend review for deactivation."

A High finding: "Custom field 'custbody_region_code' (Free-form Text) and 'custbody_territory' (List, references custom list 'Territories') appear to store the same geographic classification. Script customscript_order_routing reads from custbody_region_code; Workflow Territory Routing reads from custbody_territory. No sync between the two. Orders routed by script may produce different routing results than orders evaluated by workflow."

## Area 5: Roles and permissions

Roles are often the most visually complex area to review, because most accounts have accumulated more roles than they need and the permission structure within each role has drifted from its original intent.

**What the review covers:**

All active roles in the account, their permission configurations, and which users hold each role. The review focuses on: roles with Administrator-equivalent access that should have restricted access, users who are inactive in the business but still have active NetSuite logins, roles that were created during implementation for a user type that no longer exists, and users who have accumulated multiple roles over time through successive team structure changes.

**What findings look like:**

A High finding: "Role 'Operations Manager' grants full permissions to the Payroll and Compensation category (Permission: Full). No users currently assigned to this role work in payroll. Role was used during implementation testing and was not scoped down before production deployment."

An Advisory finding: "14 employee records with an active NetSuite login status have no sales, transactions, or login events in the last 180 days. Recommend review for deactivation. Inactive accounts with active login credentials create unnecessary security exposure."

## Area 6: Integration health

Integration findings are the highest-risk findings in most accounts because integration problems are silent by default. A broken integration logs an error that nobody is watching, and the two systems quietly diverge.

**What the review covers:**

All active integration records in NetSuite, their recent sync logs, and any middleware platform logs available. For each integration, the reviewer identifies: the record types and fields it syncs, its recent error rate, whether it covers all record types that have been added to the account since the integration was built, and whether its authentication credentials are current and not approaching expiry.

**What findings look like:**

A Critical finding: "Celigo integration 'NetSuite to Salesforce Customer Sync' has logged 312 errors in the past 30 days. Error: 'INVALID_FIELD_VALUE: Customer type not recognized'. Investigation indicates integration was built before 'Individual' customer type was added to the account in 2025. Individual-type customer records are not syncing to Salesforce. Estimated backlog: 89 unsynchronized Individual customer records."

A High finding: "RESTlet integration 'ERP to 3PL Inventory Update' uses NLAuth credential-based authentication. NLAuth is being retired in NetSuite 2027.1. Migration to OAuth 2.0 required before retirement."

## What the findings report contains

A health check's value is entirely in its report. The findings report should contain:

**Executive summary:** Total finding count by severity. The top two or three findings that warrant immediate attention described in non-technical terms that a CFO or operations leader can act on.

**Layer-by-layer findings:** Each finding with its specific location (script name, workflow ID, saved search name, field internal ID), a plain-language description of what the problem is, why it matters, and what should be done about it.

**Severity classification:** Every finding is Critical (actively causing incorrect behavior), High (meaningful risk that will likely become Critical), or Advisory (inefficient or undocumented but not actively harmful).

**No remediation included:** The health check is an assessment only. The report describes what was found; it does not prescribe a remediation project or bundle one into the assessment engagement.

For the full scope of what a health check covers and how to engage for one, see the [NetSuite health check](/netsuite-health-check) page. For context on what technical debt looks like in each of these layers before the assessment, see [NetSuite technical debt](/netsuite-technical-debt).

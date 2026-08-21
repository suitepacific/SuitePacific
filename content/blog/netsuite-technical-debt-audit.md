---
title: "How to Audit NetSuite Technical Debt in Your Account"
description: "A step-by-step approach to reviewing a live NetSuite account for accumulated technical debt: what to examine in each layer, how to classify what you find, and how to prioritize what to address first."
date: "2026-08-18"
tags: ["Technical Debt", "Account Optimization", "SuiteScript"]
---

<div style="background:#eef2fb;border:1px solid #b2c2e6;border-radius:10px;padding:1.25rem 1.5rem;margin:2rem 0;font-family:system-ui,-apple-system,sans-serif">
<p style="margin:0 0 0.5rem;font-size:0.7rem;font-weight:700;color:#4f7fff;text-transform:uppercase;letter-spacing:0.08em">Quick answer</p>
<p style="margin:0;color:#14306b;font-size:0.9rem;line-height:1.6">Auditing NetSuite technical debt means systematically reviewing five layers of the account: script deployments (active vs. needed, governance consumption, execution errors), workflow configurations (entry conditions, active vs. retired processes, script overlap), saved searches (indexed first criterion, usage in automations, duplicates), custom fields and records (unused fields on active forms, duplicate data storage), and integrations (recent error logs, coverage of record types added since go-live). Each finding is classified as Critical (actively causing incorrect behavior), High (meaningful risk not yet visible), or Maintenance (inefficient or undocumented). A thorough audit of all five layers typically takes five to seven business days and produces a written findings report as the deliverable. Script deployments are reviewed at Customization > Scripting > Script Deployments, workflows at Customization > Workflow > Workflows, and saved searches at Reports > Saved Searches. The most common high-priority finding across accounts: a workflow with no entry conditions evaluating on every save of a high-volume record type.</p>
</div>

A technical debt audit is a structured review of a live NetSuite account across each layer where debt accumulates. The goal is to produce a complete, prioritized list of what needs attention: what is actively causing problems, what carries risk, and what is inefficient or undocumented. The audit is the foundation for everything that follows.

This guide covers how to conduct the audit layer by layer, what to look for in each, and how to classify and prioritize what you find.

## Before you start: what you need

To conduct a thorough technical debt audit, you need Administrator-level access to the NetSuite account. You do not need access to external documentation, previous developer notes, or prior audit results; the audit reads what is in the account. If documentation or notes from previous developers are available, they are useful context but not required.

The audit is most useful when it is done fresh, without assumptions about what is or is not a problem. Prior experience with the account can introduce bias toward what you already know about and away from what you have not yet looked at.

## Layer 1: Script deployments

Script deployments are the starting point for any account audit. Every active script in Production is visible in NetSuite under Customization > Scripting > Script Deployments.

**What to review:**

Start with the full list of Active script deployments. For each one, open the script record and confirm:

- What record type does it run on?
- What event type triggers it (User Event beforeLoad, beforeSubmit, afterSubmit; Scheduled; Client; Map/Reduce; RESTlet; Suitelet)?
- Does the script description or inline comment explain what it does and why?
- When was it last modified? When was it last executed (check the execution log)?

Open the execution log for each script. Recent execution logs show whether the script is actually running, whether it is throwing errors, and approximately how much governance it consumes per execution.

**What to flag:**

Scripts that appear in the Active deployment list but have no recent executions are candidates for deactivation. Before flagging, confirm the script is not triggered conditionally in a way that would explain infrequent execution (a Scheduled Script that runs monthly, for example, or a User Event afterSubmit that only fires on a specific status transition).

Scripts with high governance consumption relative to the available budget for that record type are a risk item. A User Event afterSubmit on Sales Order that uses 4,200 of the 5,000 available units per execution leaves almost no headroom for other scripts on the same record and save path.

Scripts with recent error entries in the execution log are potential Critical items. Read the error to determine whether it is active (still occurring) or historical.

SuiteScript 1.0 scripts that have not been migrated to 2.x are Maintenance items at minimum; they are High if the deprecated APIs they use are on Oracle's retirement list.

**The overlap check:**

For each record type that has multiple script deployments, identify whether any two scripts touch the same field on the same event type. Overlapping field writes on the same save path can produce unpredictable results depending on execution order.

## Layer 2: Workflow configurations

Workflow configurations are visible under Customization > Workflow > Workflows. Start with the full list, filtering for Active workflows.

**What to review:**

For each active workflow, open the workflow editor and examine:

- What is the record type and the trigger event?
- What are the entry conditions? (Are there any? Are they meaningful?)
- What does the workflow do? What states does it have, what transitions trigger on what conditions, what actions run in each state?
- Is there a description field entry that explains the workflow's purpose?
- When was the workflow last modified?

**What to flag:**

A workflow with no entry conditions evaluates on every save of every record of the relevant type. This is the most common finding in inherited accounts. The cost depends on the record type volume. A workflow with no entry conditions on a low-volume record type (custom records used for configuration) is a Maintenance item. The same workflow with no entry conditions on Sales Orders or Vendor Bills is High, because it runs thousands of times per day and the entry condition may be there specifically to prevent it from running on every save.

Look for workflows in states that suggest the underlying business process has changed: notification actions sending email to addresses that no longer exist, approval routing to employees who are inactive in the account, status transitions to statuses that are no longer used.

Identify any workflow that appears to do the same work as a script from the script layer. The overlap does not necessarily mean either one is wrong, but it needs to be understood.

## Layer 3: Saved searches

Saved searches are the most numerous customization type in most accounts and among the most frequently overlooked in audits. Start by pulling the full list from Reports > Saved Searches.

**What to review:**

The list is long. Work through it systematically, looking for:

- Public searches vs. private searches (private searches are not accessible to other users and often not referenced in automations)
- Searches with names that suggest they were built for a specific short-term purpose
- Searches with result sets that return no data

For any search that will be flagged or modified, identify its usages: is it referenced in a workflow entry condition? Is it used as a data source in a script? Is it powering a dashboard portlet? These usages are not always visible from the search record itself. Check workflow entry conditions, Map/Reduce script getInputData functions, and dashboard portlet configurations.

**What to flag:**

Open any saved search used in a dashboard portlet and examine its filter criteria. The first filter position should be on an indexed field (Type, Status, Date, Transaction Type). If the first filter is on a custom field or a text field, the search performs a full-table scan on every execution. Flag these as High if the search runs on a heavy-traffic dashboard, Maintenance if it runs infrequently.

Look for duplicate searches: two searches with similar names or descriptions that return the same or overlapping data. Check whether both are actively used.

Look for searches referenced in workflow entry conditions where the criteria may no longer accurately reflect the intended business logic. These are High-priority items if the workflow is actively making decisions based on incorrect search results.

## Layer 4: Custom fields and records

Custom fields are visible under Customization > Lists, Records & Fields. Custom records are under Customization > Lists, Records & Fields > Record Types.

**What to review:**

For custom records: check how many records exist in each type. A custom record type with zero records and no active usages in scripts or workflows is a candidate for deprecation. A custom record type with data that matches data already in a native record type is a potential duplicate data structure.

For custom fields on standard record types: pull the list of custom fields on the record types that carry the most traffic (Sales Order, Invoice, Purchase Order, Vendor Bill, Customer, Item). For each field, check:

- Is this field on any active form for this record type?
- Does it appear in any active saved search as a result column or filter criterion?
- Does any script or workflow read or write this field?
- What percentage of records of this type have a non-empty value in this field?

**What to flag:**

Fields that are not on any active form, not referenced in any search or automation, and have data in fewer than 5% of records are Maintenance items: they are likely unused and add to form complexity.

Fields with names like "CF Custom 14" or labels that are ambiguous are documentation gaps. They are Maintenance items if unused, High if they are referenced in automations but their purpose is not documented.

Duplicate fields are fields that store the same data under different names, typically created by different developers at different times. These are Maintenance items but can become High if automations are writing to one field and reading from another.

## Layer 5: Integrations and documentation

Integrations are visible in NetSuite under Setup > Integration > Manage Integrations, and external to NetSuite in any middleware platforms (Celigo, Boomi, or custom REST infrastructure) the account uses.

**What to review:**

For each integration record in NetSuite, identify what the integration does, what external system it connects to, and when it last successfully executed. Check the sync logs for recent errors.

For middleware-based integrations, review the flow configuration to understand what record types and fields it covers. Compare this to the current record types and fields in the account; if new record types were added after the integration was built, check whether the integration handles them.

**What to flag:**

An integration with recent error entries in its log that have not been investigated is a High or Critical item depending on the type of data involved.

An integration that was built before new record types or item types were added to the account is a risk item; it likely does not cover those new types. Test whether records of the new types are being synced correctly.

An integration with no documentation of its transformation logic is a Maintenance item.

## Classifying findings

Once the review is complete, classify each finding:

**Critical:** Something actively causing incorrect results in Production right now. A workflow creating duplicate records. An integration silently failing on a high-volume record type. A script throwing governance errors on Sales Order saves.

**High:** Something not currently causing a visible problem but carrying meaningful risk that is likely to become a problem. A workflow with no entry conditions on a high-volume record type. A saved search in a dashboard with no indexed first criterion that is causing noticeable dashboard slowness. A script approaching governance limits.

**Maintenance:** Configuration that is inefficient, redundant, or undocumented but not actively causing problems or carrying immediate risk. Inactive scripts still deployed. Unused custom fields on active forms. Duplicate saved searches. Empty workflow description fields.

Critical items are addressed immediately. High items are addressed in the next development cycle. Maintenance items are addressed systematically as time allows.

## After the audit

The audit output is a written findings report: a structured list of items classified by severity, with a description of each item and a proposed remediation. The report is the basis for prioritizing development work and communicating the account's state to non-technical stakeholders.

For accounts where an independent outside review is more reliable than a self-review, or where the scale of the account makes a thorough self-review impractical, a [NetSuite health check](/netsuite-health-check) delivers the same structured findings report in five to seven business days. The findings are classified by severity and prioritized for remediation, with the most critical items identified first.

For the broader context of why technical debt accumulates and how it is addressed over time, see [NetSuite technical debt](/netsuite-technical-debt).

---
title: "NetSuite Technical Debt Audit Checklist"
description: "A structured checklist for auditing technical debt in a live NetSuite account, covering all five layers: scripts, workflows, saved searches, custom fields and records, and integrations. Classify each finding as Critical, High, or Maintenance."
publishedAt: "2026-08-18"
tags: ["Technical Debt", "Account Optimization"]
---

A technical debt audit reviews a live NetSuite account across five layers to produce a prioritized list of what needs attention. Use this checklist layer by layer. For each item found, classify it before moving to the next: Critical (actively causing incorrect results in Production), High (meaningful risk not yet visible), or Maintenance (inefficient or undocumented but not actively harmful).

<div style="background:#eef2fb;border:1px solid #b2c2e6;border-radius:10px;padding:1.25rem 1.5rem;margin:2rem 0;font-family:system-ui,-apple-system,sans-serif">
<p style="margin:0 0 0.5rem;font-size:0.7rem;font-weight:700;color:#4f7fff;text-transform:uppercase;letter-spacing:0.08em">Quick answer</p>
<p style="margin:0;color:#14306b;font-size:0.9rem;line-height:1.6">A NetSuite technical debt audit reviews a live account across five layers to produce a prioritized list of what needs attention. The five layers are: Script Deployments (active scripts with execution contexts broader than necessary, governance issues, or references to deprecated APIs); Workflows (workflows without entry conditions, workflows for retired business processes, workflows that overlap with scripts on the same record type); Saved Searches (searches driving scripts with no execution conditions, performance-heavy searches without date filters); Custom Fields and Records (unused fields still loading on forms, fields with no descriptions, orphaned custom records); and Roles and Permissions (overpermissioned roles, roles unchanged since implementation). Complete each layer fully and classify findings as Critical, High, or Maintenance before beginning remediation. Starting fixes mid-audit risks addressing symptoms before understanding the full scope of the account's technical state.</p>
</div>



Complete the full audit before beginning remediation. Starting remediation mid-audit introduces the risk of addressing symptoms before understanding the full scope.

---

## Pre-Audit Setup

- [ ] Confirm Administrator-level access to the NetSuite account
- [ ] Open a blank findings document with three sections: Critical, High, Maintenance
- [ ] Note the current date and NetSuite version for the audit record
- [ ] Check whether a previous audit or health check report exists and note its date

---

## Layer 1: Script Deployments

Navigate to: Customization > Scripting > Script Deployments

### Inventory

- [ ] Export or record the full list of Active script deployments (name, script type, record type, event type)
- [ ] Note the total count of Active deployments

### Per-deployment review (repeat for each Active deployment)

**Basic information**
- [ ] What record type does this script run on?
- [ ] What event triggers it (beforeLoad, beforeSubmit, afterSubmit, Scheduled, Client, Map/Reduce, RESTlet, Suitelet)?
- [ ] Does the script record include a description of its purpose?
- [ ] Does the script source code include inline comments explaining what it does?

**Execution history**
- [ ] Open the execution log for this deployment
- [ ] Is the script actually executing? When did it last run?
- [ ] Are there recent error entries in the execution log?
- [ ] What governance units does it consume per execution?

**Classification triggers**
- [ ] CRITICAL: Recent errors in execution log indicating active Production failures
- [ ] HIGH: Governance consumption above 80% of the available budget per execution
- [ ] HIGH: No executions in 90+ days on a deployment that should be running regularly
- [ ] HIGH: SuiteScript 1.0 script using APIs on Oracle's deprecation list
- [ ] MAINTENANCE: No executions in 90+ days (verify before flagging)
- [ ] MAINTENANCE: No description and no inline comments
- [ ] MAINTENANCE: Deployment status Active but underlying business process has changed

### Overlap check

- [ ] For each record type with multiple Active deployments, identify all scripts running on the same event type
- [ ] Check whether any two scripts write to the same field on the same event type
- [ ] HIGH: Two scripts writing to the same field on the same save path

---

## Layer 2: Workflow Configurations

Navigate to: Customization > Workflow > Workflows

### Inventory

- [ ] Filter for Active workflows
- [ ] Record the total count of Active workflows

### Per-workflow review (repeat for each Active workflow)

**Basic information**
- [ ] What record type does this workflow run on?
- [ ] What triggers it (On Create, On Create or Edit, Status transition)?
- [ ] What are the entry conditions (if any)?
- [ ] Does the workflow description field explain its purpose?
- [ ] When was this workflow last modified?

**Logic review**
- [ ] Open the workflow editor and map the states and transitions
- [ ] Are there branches with no defined exit path?
- [ ] Are there notification actions sending to inactive employees or outdated email addresses?
- [ ] Are there approval routing actions pointing to employees who no longer hold that role?
- [ ] Does the workflow touch a field that a script from Layer 1 also touches on the same record type?

**Classification triggers**
- [ ] CRITICAL: Workflow actively creating duplicate records or incorrect status transitions
- [ ] HIGH: No entry conditions on a workflow for a high-volume record type (Sales Order, Invoice, Vendor Bill)
- [ ] HIGH: Workflow and script both writing to the same field on the same record and trigger
- [ ] HIGH: Approval routing pointing to inactive employees
- [ ] MAINTENANCE: No description field entry
- [ ] MAINTENANCE: Workflow for a business process that has been replaced or retired
- [ ] MAINTENANCE: Broad entry conditions that were intended to be tightened and never were

---

## Layer 3: Saved Searches

Navigate to: Reports > Saved Searches (or Lists > Search > Saved Searches)

### Inventory

- [ ] Pull the full list of public saved searches
- [ ] Note the total count
- [ ] Identify searches that power dashboard portlets (check active dashboards)
- [ ] Identify searches referenced in workflow entry conditions (check workflows from Layer 2)
- [ ] Identify searches used as data sources in scripts (check Map/Reduce getInputData functions)

### Per-search review (for searches used in automations or dashboards)

**Performance check**
- [ ] Open the search criteria
- [ ] What is the first filter criterion? Is it on an indexed field (Type, Status, Date, Posting Period, Transaction Type)?
- [ ] If the first criterion is not on an indexed field, what is the expected result set size?

**Usage check**
- [ ] Is this search referenced in a workflow entry condition?
- [ ] Is this search used as a data source in a script?
- [ ] Is this search powering a dashboard portlet? For which dashboard, and how many users have that dashboard?

**Currency check**
- [ ] Do the search criteria accurately reflect the current business logic for the automation that uses it?
- [ ] Have new record statuses, item types, or transaction types been added since the search was built that the search does not cover?

**Classification triggers**
- [ ] HIGH: Unindexed first criterion in a search powering a high-traffic dashboard portlet
- [ ] HIGH: Search criteria that no longer accurately reflect the workflow logic they are driving
- [ ] MAINTENANCE: Duplicate searches returning overlapping data
- [ ] MAINTENANCE: Private searches with no clear current user
- [ ] MAINTENANCE: Search result sets returning zero records for more than 30 consecutive days

---

## Layer 4: Custom Fields and Records

Navigate to: Customization > Lists, Records & Fields

### Custom records

- [ ] Review the list of custom record types
- [ ] For each custom record type, check the record count (how many records exist)
- [ ] For each custom record type with zero or very few records, check whether it is referenced in any active script or workflow

**Classification triggers**
- [ ] MAINTENANCE: Custom record type with zero records and no active references in scripts or workflows
- [ ] HIGH: Custom record type storing data that duplicates data in a native NetSuite record type

### Custom fields on high-traffic record types

Work through custom fields on: Sales Order, Invoice, Purchase Order, Vendor Bill, Customer, Item

For each custom field on each record type:
- [ ] Is this field on any active form for this record type? (Customization > Forms > Transaction Forms / Entry Forms)
- [ ] Is it referenced in any active saved search as a result column or filter criterion?
- [ ] Is it referenced in any active script or workflow?
- [ ] What percentage of records of this type have a non-empty value in this field?

**Classification triggers**
- [ ] MAINTENANCE: Field not on any active form, not in any active search, not in any active script or workflow, and fewer than 5% of records have a value
- [ ] MAINTENANCE: Field with an ambiguous name (no label that explains what it stores)
- [ ] HIGH: Two fields storing the same data under different names, with scripts or workflows writing to one and reading from the other

---

## Layer 5: Integrations and Documentation

Navigate to: Setup > Integration > Manage Integrations

### Integration records

- [ ] List all active integration records
- [ ] For each integration, what external system does it connect to and what data does it sync?
- [ ] Review sync logs or error logs for each integration (check both NetSuite side and middleware platform side if applicable)
- [ ] When did each integration last successfully sync records?

### Coverage check

- [ ] List the record types and item types currently in the account
- [ ] For each integration, confirm it covers all current record types and item types
- [ ] Check whether item types or record types were added to the account after the integration was built

**Classification triggers**
- [ ] CRITICAL: Integration with recent error log entries indicating active sync failures on high-volume data
- [ ] HIGH: Integration that does not cover record types or item types added to the account since it was built
- [ ] HIGH: Integration sync log unavailable or not monitored
- [ ] MAINTENANCE: Integration with no documentation of its transformation logic

### Documentation review

- [ ] How many active scripts have no description and no inline comments?
- [ ] How many active workflows have no entry in the description field?
- [ ] How many custom fields have ambiguous names or no description?
- [ ] Is there a current-state account inventory document accessible to the team?

**Classification triggers**
- [ ] MAINTENANCE: Each undocumented script, workflow, or custom field (these are maintenance-level findings; volume determines priority within that tier)

---

## Findings Summary

After completing all five layers, compile findings by classification:

### Critical findings
*(List each Critical item with: layer, description, impact, recommended action)*

### High-priority findings
*(List each High item with: layer, description, risk, recommended action)*

### Maintenance findings
*(List each Maintenance item with: layer, description, recommended action)*

---

## Prioritization within tiers

Within Critical findings: address items causing data integrity issues before items causing performance issues before items causing cosmetic errors.

Within High findings: address items likely to become Critical at the next NetSuite release, then items with the broadest impact on active users.

Within Maintenance findings: prioritize items that are actively confusing current developers, then documentation gaps on the most-modified customizations.

---

## Related resources

- [NetSuite technical debt](/netsuite-technical-debt): how technical debt accumulates and how to address it
- [NetSuite health check](/netsuite-health-check): independent structured audit with written findings report in 5-7 business days
- [NetSuite account optimization](/netsuite-account-optimization): remediation of findings from this audit
- [NetSuite technical debt audit blog](/blog/netsuite-technical-debt-audit): detailed walkthrough of the audit methodology

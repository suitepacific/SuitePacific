---
title: "How to Document Your NetSuite Customizations"
description: "A practical guide to documenting the SuiteScript, workflows, saved searches, and custom records in a live NetSuite account so the next developer or administrator can understand what was built and why."
date: "2026-08-29"
tags: ["Admin", "SuiteScript", "Post-Go-Live"]
---

<div style="background:#eef2fb;border:1px solid #b2c2e6;border-radius:10px;padding:1.25rem 1.5rem;margin:2rem 0;font-family:system-ui,-apple-system,sans-serif">
<p style="margin:0 0 0.5rem;font-size:0.7rem;font-weight:700;color:#4f7fff;text-transform:uppercase;letter-spacing:0.08em">Quick answer</p>
<p style="margin:0;color:#14306b;font-size:0.9rem;line-height:1.6">NetSuite customization documentation is a record of the SuiteScript files, SuiteFlow workflows, saved searches, custom record types, and configuration settings that have been added to a NetSuite account beyond the standard platform. Useful documentation identifies each customization by name and internal ID, describes what it does and which records or transactions it touches, records its trigger conditions, and notes any dependencies between customizations. The goal is to allow a developer or administrator who did not build the account to understand what exists, how it works, and what will break if it is modified. SuitePacific produces customization documentation as part of every account onboarding and account optimization engagement, and maintains it as a running record throughout ongoing support retainers.</p>
</div>

Most NetSuite accounts that have been live for more than a year have a customization layer that nobody fully understands. The original implementation partner built it, documented little or nothing, and is no longer involved. The internal team knows what the customizations do in broad terms, but not how they work or what would break if something changed.

This creates a specific and recurring problem: every change request becomes riskier than it should be, every support handoff starts from scratch, and every release cycle carries uncertainty about what the update might affect.

Documentation does not solve all of this, but it is the starting point for managing a live NetSuite account safely.

## What to document

A complete customization record covers six categories.

### SuiteScript files

For each deployed script, document:

- **Script name and internal ID.** The name as it appears in NetSuite under Customization > Scripting > Scripts, and the internal ID used to reference it programmatically.
- **Script type.** User Event, Client, Scheduled, Map/Reduce, Restlet, Portlet, or Suitelet. The type determines when and how the script executes.
- **Record type and trigger.** Which record type the script is deployed against (Sales Order, Purchase Order, Customer, etc.) and which events trigger it (beforeLoad, beforeSubmit, afterSubmit for User Event scripts; the scheduled execution time for Scheduled scripts).
- **What it does.** A plain-language description of the script's purpose: what it reads, what it writes, what validation it performs, or what external system it calls.
- **Dependencies.** Other scripts, workflows, saved searches, or custom records that the script references or depends on.
- **Last modified date and reason.** When it was last changed and what the change addressed.

### SuiteFlow workflows

For each active workflow, document:

- **Workflow name and internal ID.**
- **Base record type.** The transaction or record type the workflow operates on.
- **Trigger and entry condition.** When the workflow activates and under what conditions a record enters it.
- **States and transitions.** The main logical path through the workflow, including branching conditions and the records or fields each transition reads or sets.
- **Actions.** What the workflow does: sends emails, sets field values, creates records, sends approval requests.
- **Dependencies on scripts.** If the workflow calls a script action or if a script modifies the same fields the workflow manages, note the interaction.

### Saved searches

Not all saved searches require documentation, but searches that are used as dashboard portlets, as data sources for scripts, as scheduled email reports, or as workflow conditions should be recorded:

- **Search name and internal ID.**
- **What it returns and who uses it.**
- **Criteria.** The key filters that define what the search returns.
- **Formula columns.** Any formula expressions used in the results columns, since these are opaque in the NetSuite UI and easy to break silently.
- **Publishing status.** Which roles can see it and whether it is published as a portlet on any dashboards.

### Custom record types

For each custom record type:

- **Record type name and internal ID.**
- **Purpose.** What the record stores and which processes use it.
- **Fields.** The custom fields on the record, their types, and whether any are mandatory or used as criteria in scripts or workflows.
- **Relationships.** Which native record types this custom record links to.

### Custom fields on native records

Fields added to standard record types (Sales Order, Customer, Item, etc.):

- **Field name, internal ID, and record type.**
- **Field type.** Text, checkbox, list/record, date, etc.
- **Purpose and data source.** Where the field gets populated (manual entry, script, workflow) and what uses its value downstream.

### Configuration settings

Some account-level settings are easy to overlook but matter for ongoing maintenance:

- Custom forms and their associated default subsets.
- Email templates referenced by workflows.
- Saved searches used as dashboard portlets by role.
- Any global configuration records used to drive script behavior (a common pattern is a custom record that stores thresholds or routing rules so they can be changed without modifying the script).

## How to build the inventory

The most practical starting point is NetSuite's own script deployment list. Navigate to Customization > Scripting > Script Deployments. Filter by status Deployed and export the list. This gives you every active script deployment with its script name, record type, event type, and deployment ID.

For workflows, navigate to Customization > Workflow > Workflows. Filter by status Released.

For custom record types, navigate to Customization > Lists, Records, & Fields > Record Types.

For custom fields, each record category has its own field list under Customization > Lists, Records, & Fields > [field type] Fields. Transaction Body Fields, Transaction Column Fields, and Entity Fields are the most commonly used.

This export-based approach gets you the inventory. The documentation layer, what each item does and how it interacts with the rest, requires reading the scripts and workflows directly.

## Format

Documentation does not need to be elaborate. A spreadsheet with one row per customization, columns for each of the data points listed above, and a tab per category is sufficient for most accounts. The goal is that someone who has never seen the account can read the documentation and understand what exists.

Some teams prefer a structured document per customization, especially for complex scripts. This approach scales better for accounts with many interdependent customizations.

Whatever format you use, the most important thing is that it is kept current. An inventory that was accurate at implementation and has not been updated since is worse than no inventory in some respects, because it creates false confidence.

## When to update the documentation

Update the documentation when:

- A new script or workflow is deployed to Production.
- An existing script or workflow is modified.
- A script or workflow is deactivated.
- A custom field is added to a native record or a custom record type.
- A saved search that is used as a dashboard portlet, a script data source, or a workflow condition is modified.

The cadence does not need to be formal. A brief note added to the documentation record at the time of each change is sufficient. The pattern of adding to the documentation as part of deploying a change prevents the inventory from drifting.

## What to do if you have no documentation

If you have a live account with no documentation and no one who fully understands the customization layer, the starting point is an audit. The audit reads the existing scripts and workflows, traces their dependencies, and produces the initial inventory.

An audit of a medium-complexity account (ten to twenty scripts, three to five workflows, custom record types) typically takes five to ten hours. Accounts with more customization, or with customization that was built in layers by multiple developers over time, take longer.

SuitePacific conducts customization audits as part of account onboarding and as standalone engagements. The output is the initial documentation record that serves as the foundation for ongoing support.

---

*If your NetSuite account has a customization layer without documentation, [contact SuitePacific](/contact). Account documentation is included in every onboarding and ongoing retainer engagement.*

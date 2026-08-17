---
title: "NetSuite Script Audit Guide"
description: "How to audit SuiteScript deployments in a live NetSuite account: what to examine, how to read execution logs, how to identify governance problems, how to find overlap between scripts, and how to classify what you find."
publishedAt: "2026-08-18"
tags: ["Technical Debt", "SuiteScript", "Account Optimization"]
---

A SuiteScript audit reviews all active script deployments in a live NetSuite account to identify what is running, whether it is running correctly, whether it is consuming excessive governance, and whether any scripts conflict with each other. This guide covers each step in detail.

---

## Where to start: the deployment list

Navigate to Customization > Scripting > Script Deployments.

This page lists every script deployment in the account. Use the filters to narrow the view:

- **Status:** Active (to see what is currently deployed and running)
- **Type:** leave blank to see all script types; filter by type (User Event, Scheduled, etc.) when reviewing a specific layer

Export the filtered list or work through it directly. For each deployment, you will open the deployment record and the script record behind it.

The deployment record controls where and when the script runs. The script record contains the source code. You need both.

---

## For each deployment: what to check

### 1. The deployment record

Open the deployment record. Review:

**Record Type:** What record does this script run on? If the record type is a custom record type, check whether that record type is still actively used (from Layer 4 of the technical debt audit).

**Event Type (User Event scripts):** beforeLoad, beforeSubmit, or afterSubmit. Each runs at a different point in the record save cycle:
- `beforeLoad` runs when a record is opened for viewing or editing. Can add fields to the record view, set default values. Cannot save data.
- `beforeSubmit` runs after the user submits but before NetSuite saves the record. Can validate and modify data before it is committed. Can throw an error to prevent the save.
- `afterSubmit` runs after NetSuite saves the record. Can trigger follow-on actions (create related records, send notifications). Cannot modify the record that triggered it (use the N/record module with server context to update fields).

**Execution Context:** Which execution contexts is this deployment active for? Key contexts:
- `USER_INTERFACE`: triggers when a record is saved through the NetSuite UI
- `CSV_IMPORT`: triggers when a record is created or updated via CSV import
- `SUITELET`: triggers when a record is saved by a Suitelet
- `SCHEDULED`: triggers when a record is modified by a Scheduled Script
- `WEBSERVICES`: triggers on REST Web Services calls
- `USEREVENT`: triggers when the record is modified by another User Event script

A deployment active only for `USER_INTERFACE` will not fire on CSV imports or API calls, which is often unintended.

**Status:** Active or Inactive. Some scripts are set to Inactive to temporarily disable them. An Inactive deployment does not consume governance units and does not fire.

### 2. The script record

From the deployment record, navigate to the script record. Review:

**Script File:** The script file stored in NetSuite's file cabinet. Note the file name and when it was last modified.

**Description Field:** Does it explain what the script does? A missing or vague description is a documentation gap.

**Inline Comments:** Open the script file and read the source code. Are there comments explaining why specific decisions were made? Comments that explain only what the code does (restating the code in English) are less valuable than comments explaining why it does it that way.

---

## Reading execution logs

For User Event and Scheduled scripts, execution logs are the most important diagnostic tool in the audit.

Navigate to the script deployment record and find the Execution Log subtab (or open Customization > Scripting > Script Execution Log and filter by script).

**What to look for:**

Recent execution timestamps: Is the script executing at the frequency it should? A Scheduled Script set to run nightly should have daily entries. A User Event script on Sales Order should have entries matching the volume of Sales Orders being saved.

Error entries: The log level `ERROR` indicates a script threw an uncaught error. The log level `DEBUG` is informational output added by the developer. Review all recent ERROR entries:
- What is the error message?
- Is it recurring or isolated?
- What record triggered it (the log includes the record type and ID)?

Governance entries: Some scripts log their governance unit consumption. If not, the execution log entry includes a "Remaining Usage" field that shows governance remaining at script completion. Compare this to the governance budget for the script type.

---

## Governance: what the limits are and how to read them

NetSuite enforces governance limits to prevent any single script from consuming all available server resources. The limits vary by script type:

| Script Type | Governance Budget |
|---|---|
| User Event (beforeLoad, beforeSubmit, afterSubmit) | 1,000 units |
| Client Script | 5,000 units |
| Scheduled Script | 10,000 units per invocation |
| Map/Reduce (reduce function) | 5,000 units per input |
| RESTlet | 5,000 units |
| Suitelet | 5,000 units |

Operations that consume governance:
- Record load: approximately 10 units
- Record save: approximately 20 units
- Search execution: variable (50-200+ units depending on result size)
- External HTTP call (N/https): approximately 100 units

A User Event afterSubmit script that loads a related record and saves it consumes approximately 30 units. A script that loads ten related records and saves five of them consumes approximately 200 units. A script that runs a saved search and processes the results consumes variable units depending on result set size.

**Governance risk flags:**
- A User Event script consuming more than 800 units per execution has less than 200 units of headroom for additional scripts on the same save path
- A script that loads records in a loop is likely consuming governance proportional to the number of records in that loop
- A Scheduled Script that is split into batches because it hits governance limits may be approaching or exceeding its allowed processing volume

---

## Finding the overlap

Script overlap occurs when two or more scripts run on the same record type, the same event type, and interact with the same fields or logic.

**How to identify overlap:**

1. List all Active deployments for a single record type (e.g., all Active deployments for Sales Order)
2. Group by event type (all beforeSubmit on Sales Order, all afterSubmit on Sales Order)
3. Within each group, read each script's field writes:
   - What fields does this script write to? (`record.setValue({fieldId: '...', value: ...})`)
   - What fields does this script read from? (`record.getValue({fieldId: '...'})`)
4. Look for field IDs that appear in the "writes" list of more than one script in the same group

**Why overlap matters:**

User Event scripts on the same record and event type execute in the order of their deployment priority (a numeric field on the deployment record). If Script A writes a field value and then Script B overwrites that same field, the value that Script A wrote is lost. Whether this is a problem depends on whether the intent was for Script B to always override Script A's value, or whether the two scripts were built without knowledge of each other.

Overlap between a script and a workflow is subtler because execution ordering between scripts and workflows on the same save path is not always predictable.

---

## Classification guide for script findings

**Critical:**
- Script throwing recurring errors in Production affecting active transactions
- Script causing record save failures
- Script overwriting data that the business considers authoritative

**High:**
- Script consuming more than 80% of governance budget per execution
- Script and workflow writing to the same field with no clear ordering intent
- SuiteScript 1.0 script using deprecated APIs
- Script active on a record type where it has not executed in 60+ days and should be running regularly (possible trigger condition gap)

**Maintenance:**
- Script with no description and no inline comments
- Script inactive but still showing as Active in deployment status
- Script with debug log statements left from development that run in Production
- Script with hard-coded internal IDs that should be resolved dynamically

---

## What to do with findings

**Critical findings:** Stop and address before continuing the audit. Production failures take priority.

**High findings:** Document fully (script name, record type, event type, specific issue, governance data if relevant) and address in the next development cycle.

**Maintenance findings:** Accumulate in a backlog list. Address systematically: start with undocumented scripts on the record types that receive the most development attention, because those are the scripts whose documentation gap costs the most developer time.

---

## Related resources

- [NetSuite technical debt audit checklist](/resources/netsuite-technical-debt-audit-checklist): full five-layer audit checklist
- [NetSuite workflow audit guide](/resources/netsuite-workflow-audit-guide): the same structured review for SuiteFlow workflows
- [NetSuite technical debt](/netsuite-technical-debt): how script debt accumulates and how it is addressed
- [NetSuite health check](/netsuite-health-check): independent assessment with written findings report

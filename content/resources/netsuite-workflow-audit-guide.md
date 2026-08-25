---
title: "NetSuite Workflow Audit Guide"
description: "How to audit SuiteFlow workflow configurations in a live NetSuite account: what to examine in the workflow editor, how to identify over-broad entry conditions, how to find retired processes, and how to classify findings by severity."
publishedAt: "2026-08-18"
tags: ["Technical Debt", "Account Optimization"]
---

A SuiteFlow workflow audit reviews all active workflow configurations in a live NetSuite account to identify what is running, whether entry conditions are correctly scoped, whether any workflows are for retired business processes, and whether any overlap with scripts running on the same record types. This guide covers each step.

<div style="background:#eef2fb;border:1px solid #b2c2e6;border-radius:10px;padding:1.25rem 1.5rem;margin:2rem 0;font-family:system-ui,-apple-system,sans-serif">
<p style="margin:0 0 0.5rem;font-size:0.7rem;font-weight:700;color:#4f7fff;text-transform:uppercase;letter-spacing:0.08em">Quick answer</p>
<p style="margin:0;color:#14306b;font-size:0.9rem;line-height:1.6">A SuiteFlow workflow audit reviews all active workflow configurations in a live NetSuite account to identify workflows without correctly scoped entry conditions, workflows for retired business processes still evaluating on every record save, and workflows that overlap with scripts running the same logic on the same record type. Start the audit at Customization > Workflow > Workflows. For each active workflow, check the record type, the trigger event (Create, Edit, or both), whether entry conditions are set, and whether the workflow has been reviewed since the business process it supports was last modified. A workflow without entry conditions that fires on Edit of a high-volume record type such as Sales Order consumes governance resources on every save even when the workflow logic is irrelevant to that record. Cross-reference each workflow against the script deployment audit to identify duplicate logic running in both a workflow and a script on the same record type and trigger event.</p>
</div>



---

## Where to start: the workflow list

Navigate to Customization > Workflow > Workflows.

This page lists all workflows in the account. Filter for **Active** status to see what is currently enabled and evaluating.

For each active workflow, you will open the workflow editor to examine its configuration. The workflow editor shows the full state machine: entry conditions, states, transitions, actions, and exit conditions.

---

## For each workflow: what to check

### 1. The workflow header

Open the workflow record. At the top, review:

**Record Type:** What record type does this workflow run on? The same record types that carry high script counts (Sales Order, Invoice, Purchase Order) are likely to also carry multiple workflows.

**Release Status:** Released workflows are active and can run on production records. Workflows marked as "Testing" may still be visible and, depending on configuration, may still fire.

**Run On Client:** If checked, the workflow evaluates in the browser during UI interaction, not just on save. This is rarely the correct configuration for workflows intended to run on business logic.

**Trigger On:** What events trigger this workflow? The key options are:
- **Create:** evaluates once when a record is first created
- **Edit:** evaluates every time the record is edited, not just on create
- **Create or Edit:** evaluates on both creation and every subsequent edit

A workflow set to "Create or Edit" with no entry conditions evaluates on every save of every record of that type. On high-volume record types, this can be a significant performance impact.

### 2. Entry conditions

Entry conditions determine whether the workflow instance actually starts when the trigger fires. They are applied after the trigger fires and before the workflow begins executing.

**How to find them:** In the workflow editor, look for the "Entry Conditions" field on the workflow record itself (separate from conditions on individual states or transitions).

**What to check:**
- Are there any entry conditions at all?
- If yes, do they accurately reflect when this workflow should run? Have the business conditions they check changed since the workflow was built?
- If no, the workflow evaluates on every qualifying trigger event regardless of what changed on the record

**No entry conditions on a high-volume record type is the most common workflow finding in a technical debt audit.** The original developer typically planned to add entry conditions after testing was complete and never did.

**Entry condition types:**
- **Field condition:** evaluates a specific field value (Status = "Pending Approval", for example)
- **Saved search condition:** evaluates whether the record appears in a specified saved search result set
- **Formula condition:** evaluates a formula

Saved search entry conditions carry their own risk: if the saved search criteria are stale (see the saved search audit guide), the workflow entry conditions are also stale.

### 3. States and transitions

Work through the workflow's state diagram:

**Start state:** Where does the workflow begin? Is the start state connected to other states via transitions?

**Transitions:** Each transition has a condition. What condition moves the workflow from one state to the next? Are those conditions still accurate given the current record type configuration?

**Dead ends:** Is there any state with no outbound transitions? A workflow instance that reaches a state with no outbound transitions stops there. Depending on the workflow configuration, this may be intentional (a terminal approval state) or unintentional (a branch that was never completed).

**Retirement indicators:** Look for states that reference employees, roles, departments, or processes that may no longer exist in the account:
- Notification actions with email addresses for inactive employees
- Approval routing to employees whose roles have changed
- Status transitions to custom statuses that have been deprecated

### 4. Actions within states

Each state can contain actions: things the workflow does while the record is in that state or when a transition occurs. Review:

**Field writes:** What fields does the workflow set? If a script from the script audit (Layer 1) also writes to the same field on the same record type, this is an overlap finding.

**Sublist updates:** Does the workflow update sublist rows (line items, for example)? These actions can be expensive on records with large sublists.

**Send email actions:** Who is the email recipient? Is it a static address (that may be stale), a field value (that may be empty), or a role (that may be configured differently now)?

**Create record actions:** Does the workflow create other records? If yes, are those records the correct type, and do they have the correct default field values for the current account configuration?

### 5. Overlap with scripts

From the script audit (Layer 1), you have a list of scripts running on each record type. For each workflow:

- What record type does it run on?
- What fields does it write to?

Compare this to the script list for the same record type. Flag any case where a script and a workflow both write to the same field on the same trigger.

---

## Classification guide for workflow findings

**Critical:**
- Workflow actively creating duplicate records
- Workflow transition firing on incorrect conditions and moving records to incorrect statuses
- Workflow approval routing pointing to inactive employees, blocking records from advancing

**High:**
- No entry conditions on a workflow for a high-volume record type (Sales Order, Invoice, Purchase Order, Vendor Bill with volume > 50 records/day)
- Workflow and User Event script writing to the same field on the same record type and trigger
- Saved search entry condition using a saved search whose criteria are known to be stale
- Notification actions pointing to recipients who no longer hold the role the notification is intended for

**Maintenance:**
- Workflow for a business process that has been replaced or retired (workflow is still Active but the process it supports no longer operates)
- No description in the workflow description field
- Broad entry conditions that were noted to be temporary during implementation but never narrowed
- Dead-end states that are unreachable from the current business process flow but still appear in the workflow editor

---

## Verifying that a workflow is actually firing

Unlike scripts, which have an execution log, workflows track their activity through Workflow Action Logs (visible on individual records) and optionally through the Workflow History on the workflow record itself.

**To check whether a workflow has fired recently:**

1. Open the workflow record
2. Look for a "Workflow History" or "Workflow Action Log" tab
3. Check the most recent entries: when did the workflow last trigger? Are there any error entries?

Alternatively, open a record of the correct type that should have triggered the workflow and check the System Notes. Workflow actions that write fields appear in System Notes as field value changes with the workflow as the source.

**A workflow that has never appeared in any record's System Notes for the relevant record type may not be evaluating correctly.** This could be because entry conditions are too narrow, the record type has no qualifying records, or the workflow has a configuration issue preventing it from firing.

---

## Common patterns in inherited accounts

**The "testing" workflow that went live:** A workflow built during implementation for testing an approval process, with no entry conditions and no meaningful actions, still Active in Production.

**The "approved then retired" process:** A PO approval workflow built for a client that had a specific approval threshold. The threshold was later changed, the old workflow was supposed to be replaced, and the new workflow was added alongside the old one instead of replacing it. Both are now Active.

**The notification nobody receives:** An email notification action pointing to a `netsuite@[company].com` address that was created for the implementation and whose inbox has not been checked since year one.

**The condition that was supposed to be temporary:** An entry condition set to "Status = Pending Approval OR Status = Approved" because during testing both statuses needed to trigger the workflow. The "Approved" condition was supposed to be removed after testing; it was not.

---

## Related resources

- [NetSuite technical debt audit checklist](/resources/netsuite-technical-debt-audit-checklist): full five-layer audit checklist
- [NetSuite script audit guide](/resources/netsuite-script-audit-guide): the same structured review for SuiteScript deployments
- [NetSuite technical debt](/netsuite-technical-debt): how workflow debt accumulates and how it is addressed
- [NetSuite health check](/netsuite-health-check): independent assessment with written findings report

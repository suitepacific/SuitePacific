---
title: "How to Build an Approval Workflow in NetSuite SuiteFlow"
description: "A practical guide to building approval workflows in NetSuite using SuiteFlow: how to set up states, transitions, approval buttons, role restrictions, and email notifications."
date: "2026-08-07"
updated: "2026-08-14"
tags: ["Workflow Automation", "Development", "Admin"]
---

NetSuite's SuiteFlow engine is the right tool for most approval routing requirements. It models business processes as state machines: a record moves through defined stages (Draft, Pending Approval, Approved, Rejected) via transitions that fire actions along the way. You do not need a developer to build or modify a straightforward approval workflow, and the process is visible to everyone who can open the record.

This guide covers a complete approval workflow from scratch: states, transitions, role-restricted approval buttons, email notifications on each transition, and the common mistakes that cause workflows to fire at the wrong time or not at all. The same pattern applies to any record type you want to add approval routing to. For record types that have NetSuite's built-in approval routing (Purchase Orders, Expense Reports), SuiteFlow is an additional option alongside the native routing, not a replacement for it.

<div style="background:#eef2fb;border:1px solid #b2c2e6;border-radius:10px;padding:1.25rem 1.5rem;margin:2rem 0;font-family:system-ui,-apple-system,sans-serif">
<p style="margin:0 0 0.5rem;font-size:0.7rem;font-weight:700;color:#4f7fff;text-transform:uppercase;letter-spacing:0.08em">Quick answer</p>
<p style="margin:0;color:#14306b;font-size:0.9rem;line-height:1.6">A SuiteFlow approval workflow has three components: states (the stages a record passes through), transitions (the paths between states), and actions (what happens during each transition). For a two-stage approval, you create states for Draft, Pending Approval, and Approved/Rejected; add transitions between them; restrict the Approve and Reject transition buttons to the approver role; and add email actions that fire when a transition occurs. The workflow is created at Customization &gt; Workflow &gt; Workflows &gt; New, with the target record type set on the workflow itself. Entry criteria on the workflow or on individual transitions control which records enter the flow and when. The most common mistake is setting the workflow context incorrectly, which causes it to fire on create instead of edit, or to trigger on every CSV import rather than just UI submissions.</p>
</div>

<figure style="margin:1.75rem 0">
<svg viewBox="0 0 680 130" xmlns="http://www.w3.org/2000/svg" style="width:100%;max-width:680px;display:block;font-family:system-ui,-apple-system,sans-serif">
  <defs>
    <marker id="appr-arrow" markerWidth="7" markerHeight="7" refX="5" refY="3" orient="auto"><path d="M0,0 L0,6 L7,3 z" fill="#4f7fff"/></marker>
    <marker id="appr-arrow-r" markerWidth="7" markerHeight="7" refX="5" refY="3" orient="auto"><path d="M0,0 L0,6 L7,3 z" fill="#dc2626"/></marker>
    <marker id="appr-arrow-g" markerWidth="7" markerHeight="7" refX="5" refY="3" orient="auto"><path d="M0,0 L0,6 L7,3 z" fill="#059669"/></marker>
  </defs>
  <!-- Draft state -->
  <rect x="20" y="42" width="120" height="46" rx="8" fill="#eef2fb" stroke="#4f7fff" stroke-width="1.5"/>
  <text x="80" y="62" text-anchor="middle" font-size="10" font-weight="700" fill="#14306b">Draft</text>
  <text x="80" y="78" text-anchor="middle" font-size="8.5" fill="#4f6fb0">Initial state</text>
  <!-- Arrow: Draft → Pending -->
  <line x1="140" y1="65" x2="215" y2="65" stroke="#4f7fff" stroke-width="1.5" marker-end="url(#appr-arrow)"/>
  <text x="178" y="58" text-anchor="middle" font-size="7.5" fill="#4f7fff">Submit</text>
  <!-- Pending Approval state -->
  <rect x="216" y="42" width="140" height="46" rx="8" fill="#fef9c3" stroke="#d97706" stroke-width="1.5"/>
  <text x="286" y="62" text-anchor="middle" font-size="10" font-weight="700" fill="#92400e">Pending Approval</text>
  <text x="286" y="78" text-anchor="middle" font-size="8.5" fill="#b45309">Awaiting decision</text>
  <!-- Arrow: Pending → Approved -->
  <line x1="356" y1="55" x2="453" y2="38" stroke="#059669" stroke-width="1.5" marker-end="url(#appr-arrow-g)"/>
  <text x="410" y="40" text-anchor="middle" font-size="7.5" fill="#059669">Approve</text>
  <!-- Arrow: Pending → Rejected -->
  <line x1="356" y1="75" x2="453" y2="94" stroke="#dc2626" stroke-width="1.5" marker-end="url(#appr-arrow-r)"/>
  <text x="410" y="96" text-anchor="middle" font-size="7.5" fill="#dc2626">Reject</text>
  <!-- Approved state -->
  <rect x="454" y="18" width="120" height="40" rx="8" fill="#d1fae5" stroke="#059669" stroke-width="1.5"/>
  <text x="514" y="38" text-anchor="middle" font-size="10" font-weight="700" fill="#065f46">Approved</text>
  <text x="514" y="51" text-anchor="middle" font-size="8" fill="#059669">Workflow complete</text>
  <!-- Rejected state -->
  <rect x="454" y="76" width="120" height="40" rx="8" fill="#fee2e2" stroke="#dc2626" stroke-width="1.5"/>
  <text x="514" y="96" text-anchor="middle" font-size="10" font-weight="700" fill="#991b1b">Rejected</text>
  <text x="514" y="109" text-anchor="middle" font-size="8" fill="#dc2626">Returned to submitter</text>
</svg>
<figcaption style="text-align:center;font-size:0.78rem;color:#8aa2d6;margin-top:0.4rem">Basic SuiteFlow approval: Draft moves to Pending Approval on submit; the approver can then Approve (moving to Approved) or Reject (returning to Rejected with a notification).</figcaption>
</figure>

## How do states work in a SuiteFlow approval workflow?

States are the stages a record can be in. A basic approval workflow has four:

- **Draft:** the initial state, where the record is being prepared
- **Pending Approval:** the record has been submitted and is waiting for a decision
- **Approved:** the approver has accepted the record
- **Rejected:** the approver has declined the record

One state is designated as the initial state, the state every new record enters automatically. For an approval workflow, this is Draft. The workflow engine tracks which state each record is in and makes that state visible in a workflow status field on the record form.

Each state can also have entry and exit actions: things that happen when a record arrives in or leaves a state. A common entry action on Pending Approval is to send an email to the approver. A common exit action on Approved is to set a status field on the record.

## How do transitions and approval buttons work?

Transitions define how records move between states. Each transition has:

- A source state (where the record is coming from)
- A destination state (where it goes)
- A trigger (what causes the transition to fire)
- Optional entry criteria (conditions that must be true for the transition to be available)
- Optional actions (what happens when the transition fires)

For approval workflows, the most common trigger is a button on the record form. SuiteFlow adds custom buttons to the record form for each transition that has button-based triggering enabled. The button only appears to users who meet the transition's role or condition requirements.

To restrict the Approve and Reject buttons to approvers only, set the transition's role restriction to the role that should have approval authority. The submitter sees the Submit button (transitioning from Draft to Pending Approval) but cannot see the Approve or Reject buttons. The approver sees Approve and Reject but not Submit.

## What actions should fire on each transition?

**Submit transition (Draft to Pending Approval):**
- Set a field on the record to record who submitted it and when
- Send an email to the approver notifying them that a record is waiting for their decision
- Optionally lock certain fields so the record cannot be edited while pending

**Approve transition (Pending Approval to Approved):**
- Set the record's approval status field to Approved
- Send an email to the submitter confirming the approval
- Optionally trigger downstream actions (unlock the record, create a related record)

**Reject transition (Pending Approval to Rejected):**
- Set a field to record the rejection reason (you can add a text field to capture this)
- Send an email to the submitter with the rejection notification
- The email should explain next steps: correct and resubmit, or escalate

All of these are handled through workflow actions configured on each transition. NetSuite's email action can use saved email templates, so the notifications can be formatted consistently without requiring manual composition.

## How do you restrict which records enter the workflow?

By default, a SuiteFlow workflow fires on every record of the target type that is created or edited. For an approval workflow, you typically only want it to fire for records above a certain threshold or of a specific type.

Entry criteria are conditions set on the workflow itself or on individual states and transitions. Common examples:

- Amount exceeds a threshold: only trigger for records where the total amount is above a certain value
- Record type filter: for multi-purpose record types, filter by a category or type field
- Subsidiary: only apply the workflow to records in specific subsidiaries

Entry criteria use the same filter conditions as saved searches. You can combine multiple conditions with AND/OR logic and reference any field on the record or its related records.

## What workflow context settings prevent common mistakes?

The workflow context controls when the workflow's logic runs relative to the record save. The most common mistakes come from wrong context settings.

**Event-based workflows** fire when something specific happens to the record: when it is created, when it is edited, or when a specific field changes. An approval workflow should typically fire when a record is first created (to put it in the Draft state) and when transitions are triggered (by button click).

**Trigger on:** set to "Before Record Submit" for actions that need to run before the record is saved (like field validation or setting a required field). Set to "After Record Submit" for actions that depend on the record being committed (like sending an email that references the record ID).

**Context restrictions:** if the workflow should only fire when a user saves from the UI (not during CSV import or API saves), add a context restriction for "User Interface" only. Without this, the workflow fires on every save path, which can create unexpected state transitions during bulk imports.

## How do multi-level approvals work?

For two-level approvals (manager then finance team, for example), extend the state machine with additional states:

- Draft
- Pending Manager Approval
- Pending Finance Approval
- Approved
- Rejected

The Approve transition from Pending Manager Approval moves the record to Pending Finance Approval, not directly to Approved. The Finance Approve transition then moves it to the final Approved state. Each level has its own role-restricted buttons and its own email notifications.

The pattern scales to as many levels as needed, but workflows with more than three approval stages are harder to audit and maintain. If the approval logic is genuinely complex (dynamic approvers based on record data, parallel approvals, conditional routing), that logic is better handled in a SuiteScript Workflow Action Script rather than through SuiteFlow's native condition builder.

---

If you need help designing or building a workflow that goes beyond the standard state machine (dynamic approver lookup, parallel branches, cross-record updates), our [workflow automation service](/netsuite-workflow-automation) covers both SuiteFlow design and Workflow Action Script development. For related reading, see [NetSuite Workflow vs SuiteScript: Which to Use and When](/blog/netsuite-workflow-vs-suitescript) and [5 Common Workflow Automation Mistakes](/blog/workflow-automation-mistakes).

## Frequently asked questions

**Q: What is the difference between SuiteFlow and NetSuite's built-in approval routing?**
A: NetSuite has native approval routing for specific record types like Purchase Orders and Expense Reports, configured under Setup rather than through SuiteFlow. The built-in routing supports supervisor hierarchies and amount thresholds without custom workflow setup. SuiteFlow is more flexible and works on any record type, including custom records and record types that don't have native approval support. The two can coexist on the same record type.

**Q: Can the approval email include a link directly to the record?**
A: Yes. NetSuite email templates support field references, and the workflow can pass the record's internal ID and type into the template. NetSuite generates a direct URL to the record that the approver can click to open it immediately. The link uses the approver's account URL and record type.

**Q: How do you prevent the workflow from firing on CSV imports?**
A: Add a context restriction to the workflow or to specific transitions. Set the execution context to User Interface to prevent the workflow from triggering during CSV imports, API saves, and saves from other scripts. Without this restriction, submitting a CSV import of 500 records will attempt to put all 500 into Pending Approval simultaneously.

**Q: Can a workflow send different emails based on who is approving?**
A: Yes. Workflow email actions can use formula-based recipient fields that reference the record or related records. If the approver is stored on the record as a field (set dynamically by a script or by the submitter), the email action can address the notification to that field's value rather than a static role or email address.

**Q: What happens to a pending record if the workflow is deactivated?**
A: Deactivating a workflow stops it from processing new transitions, but records already in a workflow state retain that state. They remain stuck in Pending Approval until the workflow is re-activated or manually updated. Before deactivating an active approval workflow, resolve all open records or document the manual steps needed to process them without the workflow.

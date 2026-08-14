---
title: "NetSuite FSM 2026.07.1 Sandbox Testing Checklist"
description: "A practical checklist for NetSuite administrators to validate the August 11 Field Service Management bundle update in Sandbox before it reaches Production."
category: "Field Service Management"
tags: ["Field Service Management", "Administration", "Bundle Updates", "Sandbox Testing"]
publishedAt: "2026-07-27"
updatedAt: "2026-08-15"
---

<div style="background:#eef2fb;border:1px solid #b2c2e6;border-radius:10px;padding:1.25rem 1.5rem;margin:2rem 0;font-family:system-ui,-apple-system,sans-serif">
<p style="margin:0 0 0.5rem;font-size:0.7rem;font-weight:700;color:#4f7fff;text-transform:uppercase;letter-spacing:0.08em">Quick answer</p>
<p style="margin:0;color:#14306b;font-size:0.9rem;line-height:1.6">The NetSuite FSM 2026.07.1 bundle update deployed to Production accounts on August 11, 2026. Before the Production upgrade, validate the update in your Sandbox account by testing work order creation, technician scheduling, mobile check-in and check-out, parts management, and the active configuration setting. Only one FSM configuration can be active at a time; confirm that your active configuration is still set correctly after the bundle update. The most common post-update issue is the active configuration reverting to an unintended state, which silently changes mobile behavior for all technicians.</p>
</div>

## How to use this checklist

Oracle's FSM 2026.07.1 update lands in Production on August 11, 2026. It is already available in Sandbox accounts as of July 16. Use this checklist to work through your Sandbox environment before the Production upgrade. Tick each item, note any issues, and raise Oracle support cases before August 11 where needed.

The checklist is split into two sections: **2026.07.1 specific checks** covering the changes in this release that could affect your configuration, and **core FSM checks** covering the standard functional areas Oracle requires you to validate before any bundle update.

<figure style="margin:1.75rem 0">
<svg viewBox="0 0 680 100" xmlns="http://www.w3.org/2000/svg" style="width:100%;max-width:680px;display:block;font-family:system-ui,-apple-system,sans-serif">
  <defs>
    <marker id="fsm-arrow" markerWidth="7" markerHeight="7" refX="5" refY="3" orient="auto"><path d="M0,0 L0,6 L7,3 z" fill="#4f7fff"/></marker>
  </defs>
  <!-- Step 1 -->
  <rect x="0" y="20" width="130" height="60" rx="8" fill="#eef2fb" stroke="#4f7fff" stroke-width="1.5"/>
  <text x="65" y="46" text-anchor="middle" font-size="9" font-weight="700" fill="#0b1f4d">Step 1</text>
  <text x="65" y="60" text-anchor="middle" font-size="8.5" fill="#14306b">Confirm Sandbox</text>
  <text x="65" y="73" text-anchor="middle" font-size="8.5" fill="#14306b">has 2026.07.1</text>
  <line x1="130" y1="50" x2="160" y2="50" stroke="#4f7fff" stroke-width="1.5" marker-end="url(#fsm-arrow)"/>
  <!-- Step 2 -->
  <rect x="162" y="20" width="130" height="60" rx="8" fill="#eef2fb" stroke="#4f7fff" stroke-width="1.5"/>
  <text x="227" y="46" text-anchor="middle" font-size="9" font-weight="700" fill="#0b1f4d">Step 2</text>
  <text x="227" y="60" text-anchor="middle" font-size="8.5" fill="#14306b">Run 2026.07.1</text>
  <text x="227" y="73" text-anchor="middle" font-size="8.5" fill="#14306b">specific checks</text>
  <line x1="292" y1="50" x2="322" y2="50" stroke="#4f7fff" stroke-width="1.5" marker-end="url(#fsm-arrow)"/>
  <!-- Step 3 -->
  <rect x="324" y="20" width="130" height="60" rx="8" fill="#eef2fb" stroke="#4f7fff" stroke-width="1.5"/>
  <text x="389" y="46" text-anchor="middle" font-size="9" font-weight="700" fill="#0b1f4d">Step 3</text>
  <text x="389" y="60" text-anchor="middle" font-size="8.5" fill="#14306b">Run core FSM</text>
  <text x="389" y="73" text-anchor="middle" font-size="8.5" fill="#14306b">functional checks</text>
  <line x1="454" y1="50" x2="484" y2="50" stroke="#4f7fff" stroke-width="1.5" marker-end="url(#fsm-arrow)"/>
  <!-- Step 4 -->
  <rect x="486" y="20" width="130" height="60" rx="8" fill="#0b1f4d" stroke="#0b1f4d" stroke-width="1.5"/>
  <text x="551" y="46" text-anchor="middle" font-size="9" font-weight="700" fill="#eef2fb">Step 4</text>
  <text x="551" y="60" text-anchor="middle" font-size="8.5" fill="#a8c0f0">Document and raise</text>
  <text x="551" y="73" text-anchor="middle" font-size="8.5" fill="#a8c0f0">issues before Aug 11</text>
</svg>
<figcaption style="text-align:center;font-size:0.78rem;color:#8aa2d6;margin-top:0.4rem">Complete Sandbox testing before the Production upgrade on August 11.</figcaption>
</figure>

---

## Before you start

- [ ] Confirm the FSM bundle in your Sandbox account is running version **2026.07.1** (Bundle ID 570821). Go to Customization, then SuiteCloud, then Installed SuiteApps to check.
- [ ] Read the Oracle release notes for this version (SuiteAnswers ID 1047018) so you know which areas to prioritize.
- [ ] Assign testing areas to the right people. Mobile app testing should involve an actual technician or dispatcher, not just an administrator.
- [ ] Set up a simple log to record what was tested, the result, and any issues found.

---

## Section 1: 2026.07.1 specific checks

These items target the changes introduced in this release. Work through all that apply to your configuration.

### Mobile app status indicators

- [ ] Log in to the FSM Mobile app as a technician in Sandbox
- [ ] Verify that a status counter is visible at the top of the task list
- [ ] Navigate to an individual task and confirm a task-level counter appears
- [ ] Put the device in airplane mode and confirm a persistent offline banner appears at the bottom of the screen across multiple pages
- [ ] Return online and confirm the banner disappears
- [ ] Trigger a sync error on a record (or find one that has an existing error) and confirm the error icon is visible on that record
- [ ] Use the retry option on the error record without editing the record and confirm it either clears or persists correctly
- [ ] Navigate to a mobile tab and confirm the navigation bar shows the tab name and the current record's title field
- [ ] Create a new draft record and confirm "Unsaved Draft" appears in the navigation bar

### Task completion behavior (cancomplete)

- [ ] Attempt to complete a CRM task as the **assigned** technician and confirm it succeeds
- [ ] Attempt to complete the same CRM task as a **different** mobile user and confirm the Complete button is dimmed or the action is blocked
- [ ] Attempt to complete a project task as a non-assigned mobile user and confirm it is permitted
- [ ] If you have configured custom `cancomplete` expressions: verify each one behaves as expected

### Mobile tab permissions (create / edit / delete)

- [ ] Open your FSM Configuration and identify any `readonly` rules configured at the resource level
- [ ] Confirm those rules have been migrated or replaced with the `edit` property on the relevant mobile tabs
- [ ] Log in as a technician role and attempt to create, edit, and delete records on each mobile tab to confirm permissions match your intended configuration
- [ ] Confirm that mobile tabs with no `create`, `edit`, or `delete` configuration default to allowing all three actions

### nxc_now() expression migration

- [ ] Check whether your FSM Configuration uses any `nxc_now()` expressions
- [ ] If yes: locate the configuration record named "Auto Configure xxxx: Migrate nxc_now expressions" that was created automatically by the update
- [ ] Open that record and review each migrated expression line by line
- [ ] Pay particular attention to expressions that include checkbox conditions
- [ ] Confirm date and time values in mobile expressions are formatted correctly:

| Field Type | Required Format | Example |
|---|---|---|
| Date | YYYY-MM-DD | 2026-07-14 |
| Time | HH:mm:ss | 09:30:00 |
| Date and Time | YYYY-MM-DD HH:mm:ss | 2026-07-14 09:30:00 |

### Time tracking configuration

- [ ] If you use Track Service Time: confirm the feature is still enabled and functioning via the new `time.timetracking` FSM configuration option
- [ ] If you are enabling Track Service Time for the first time in this Sandbox: test it fully here before considering enabling it in Production

### Mobile user license tracking

- [ ] Open an employee record that previously had the Field Service Mobile User field and confirm the license count display has been removed
- [ ] Build or verify a saved search that counts active FSM mobile users in your account
- [ ] Cross-reference that count against your allotted licenses on the Billing Information page (Setup, then Company, then View Billing Information)

### Custom center tabs

- [ ] Open each custom FSM center tab in your Sandbox account
- [ ] Confirm the audience is still set correctly for your business
- [ ] Click the link to the FSM mobile view and confirm it opens
- [ ] Click the link to the scheduler board and confirm it opens

---

## Section 2: Core FSM functional checks

These are Oracle's minimum required test areas for any FSM bundle update, plus additional areas that carry risk in this release.

### Work order creation and lifecycle

- [ ] Create a new work order from scratch including all required and custom fields
- [ ] Assign the work order to a technician through the dispatch board
- [ ] Walk the work order through each status in your process and confirm transitions trigger correctly
- [ ] Complete the work order and confirm inventory, cases, and invoices update as expected
- [ ] Test any custom forms on work order or service task records

### Resource scheduling and dispatch

- [ ] Open the dispatch board and confirm all technicians load with correct territories and skills
- [ ] Drag and reassign a task to a different technician
- [ ] Verify unassigned task queues display correctly
- [ ] Run any custom saved searches used to populate your dispatch view

### FSM Mobile app core functionality

- [ ] Sync the mobile app and confirm assigned tasks appear correctly
- [ ] Complete a task on mobile and confirm the status reflects in NetSuite
- [ ] Test offline task access if your technicians work without connectivity
- [ ] Check that technician notes, photos, and attachments upload correctly
- [ ] Confirm barcode scanning works correctly in the task list if used

### Service reports and invoicing

- [ ] Generate a service report from a completed task and confirm it renders correctly including images
- [ ] Confirm service reports display correctly for customers with non-English language settings
- [ ] Create an invoice from a completed work order and confirm line items, quantities, and amounts are correct

### Scripts and workflows

- [ ] Check the SuiteScript execution log in Sandbox for any new errors on Case, Customer, and Task records after the update
- [ ] Walk through each workflow on FSM record types and confirm transitions, email actions, and field updates still fire
- [ ] Test any Scheduled or Map/Reduce scripts that process FSM data

### Permissions by role

- [ ] Log in as a dispatcher and confirm dispatch board access and task assignment work correctly
- [ ] Log in as a technician and confirm task visibility and completion work correctly
- [ ] Log in as a service manager and confirm work order and report access is correct
- [ ] Attempt actions each role should not be able to perform and confirm restrictions are in place

### Saved searches and reporting

- [ ] Run your key FSM saved searches (open work orders, unassigned tasks, technician schedules, work order history) and confirm results are accurate
- [ ] Run any saved searches used in email alerts or workflows

---

## After the Production upgrade (August 11)

- [ ] Re-verify custom center tab audience settings and links in Production
- [ ] Confirm the "Auto Configure xxxx: Migrate nxc_now expressions" record in Production matches what you reviewed in Sandbox
- [ ] Check Bundle Message Recipients on the FSM Bundle Details page (Bundle ID 570821) and update if needed
- [ ] Communicate any visible interface changes to your field team, particularly the new mobile status indicators and offline banner

---

## If you find an issue

1. Document the exact steps to reproduce, the expected result, and the actual result
2. Log a support case with Oracle NetSuite support referencing the FSM bundle version (2026.07.1) and Bundle ID 570821
3. Include screenshots or screen recordings where possible
4. If the issue affects Production and cannot wait, identify whether a configuration change can mitigate the impact while Oracle investigates

Useful SuiteAnswers reference articles for this release:

| Topic | SuiteAnswers ID |
|---|---|
| Full 2026.07.1 release notes | 1047018 |
| Heading blocks for mobile tabs | 1046936 |
| Date and time field update guidance | 1047012 |
| Enabling Track Service Time | 1047002 |
| Creating a saved search for mobile user counts | 1046924 |
| Center tab navigation after SuiteApp updates | 1021215 |

---

## Need help with your FSM Sandbox testing?

Working through a bundle update takes time, and not every team has an FSM-experienced administrator available before a deadline. SuitePacific helps NetSuite customers validate bundle updates in Sandbox, identify configuration issues before they reach Production, and resolve problems that surface after an upgrade. If you need support before August 11, [contact us](/contact).

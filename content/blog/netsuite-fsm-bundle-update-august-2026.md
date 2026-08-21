---
title: "NetSuite FSM Bundle Update (August 11, 2026): What Is Changing and What to Test in Sandbox"
description: "NetSuite Field Service Management version 2026.07.1 reaches Production on August 11. Here is exactly what is changing, what requires action before the update, and what to validate in Sandbox to protect your live operation."
date: "2026-07-27"
updated: "2026-08-14"
tags: ["Field Service Management", "Administration", "Bundle Updates", "Sandbox Testing"]
---

NetSuite Field Service Management (FSM) is a SuiteApp that extends NetSuite with work order management, technician scheduling, dispatch, and mobile field service capabilities. It is installed as a managed bundle and receives periodic updates from Oracle that can change configuration record structure, mobile app behavior, and expression syntax.

If you have a NetSuite account with the Field Service Management SuiteApp installed, you may have already received a notification from Oracle about an upcoming managed bundle update scheduled for 11 August. Oracle recommends testing the new bundle version in your Sandbox environment before it reaches Production, so that any issues with your existing configurations, customizations, or business processes can be identified and resolved in advance.

<div style="background:#eef2fb;border:1px solid #b2c2e6;border-radius:10px;padding:1.25rem 1.5rem;margin:2rem 0;font-family:system-ui,-apple-system,sans-serif">
<p style="margin:0 0 0.5rem;font-size:0.7rem;font-weight:700;color:#4f7fff;text-transform:uppercase;letter-spacing:0.08em">Quick answer</p>
<p style="margin:0;color:#14306b;font-size:0.9rem;line-height:1.6">The NetSuite Field Service Management SuiteApp bundle is updating to version 2026.07.1 on August 11, 2026. The update changes the FSM Configuration record structure, the mobile app interface, the format of nxc_now() expressions in mobile event maps, and the readonly property behavior at the resource level. Oracle recommends testing the new bundle version in Sandbox before it reaches Production. The four areas requiring administrator attention before August 11 are: reviewing the automatically migrated nxc_now() expressions for accuracy, recreating readonly rules using the new field-level access controls, preparing field teams for the mobile app interface changes, and validating that existing FSM workflows behave correctly under the updated Configuration record structure. The FSM SuiteApp is installed as a managed bundle, visible under Customization > SuiteBundler > Search & Install Bundles > List. Unlike platform releases, bundle updates push to Production on the scheduled date without a standard preview period unless you manually install the new bundle version in Sandbox before August 11.</p>
</div>


That recommendation is easy to overlook when your team is busy. For organizations running FSM in a live field operation, this particular update warrants close attention.

**Not sure where to start?** SuitePacific helps NetSuite customers validate FSM bundle updates in Sandbox before they reach Production. If you would rather have an expert walk through your environment than navigate this alone, [contact us](/contact) and we will take it from there.

This article covers exactly what is changing in version 2026.07.1, which changes require action on your part, and what to validate in Sandbox before August 11.

## What Is the Release Timeline for the FSM Bundle Update?

The 2026.07.1 update is already available in Sandbox accounts as of July 16, 2026. Production upgrades are scheduled as follows:

| Region | Upgrade Window |
|---|---|
| APAC | August 11, 8:00 p.m. to 11:00 p.m. Australian Eastern Time |
| EMEA | August 11, 11:00 p.m. to August 12, 2:00 a.m. UTC |
| U.S. and North America | August 11, 8:00 p.m. to August 12, 1:00 a.m. PT, and August 12, 8:00 p.m. to August 13, 1:00 a.m. PT |

**Bundle ID: 570821**

## What is a managed bundle update?

NetSuite Field Service Management is delivered as a managed SuiteApp, which means Oracle controls the bundle and pushes updates to customer accounts on a schedule. You do not choose whether to receive the update. Once Oracle releases it, the update is applied to your Production account automatically.

What you do control is preparation. Oracle has already pushed 2026.07.1 to Sandbox accounts. That window between July 16 and August 11 is your opportunity to identify anything that breaks or behaves differently before real work orders, real technicians, and real dispatching are affected.

## What Is Changing in FSM Bundle Version 2026.07.1?

This release is primarily a mobile app update with several configuration changes that administrators need to review before and after the upgrade.

### FSM Mobile app: new status visibility and navigation

The mobile app is receiving a significant overhaul of how it communicates sync status to technicians. This change affects every area of the app where data syncs with NetSuite.

**App-level and task-level status counters**

Technicians will now see numeric counters at both the task list level and on each individual task, showing how many records have pending sync, draft, error, or offline status. This replaces the current experience where a sync issue on one record is not obviously visible unless the technician navigates to it directly.

When a record carries more than one status at once, the app surfaces the most critical one. Priority runs: Offline first, then Active Sync, Draft, and Error.

**Offline warning banner**

A persistent banner will appear at the bottom of every screen while the device is offline. Technicians moving between tasks and records will see this banner throughout, rather than only on the first screen they loaded offline.

**Sync error indicator with retry**

When a record fails to sync, it will now show a visible error icon so technicians know which records need attention. They can trigger a retry directly from the record without making any edits. The icon clears once the retry succeeds or the record is updated.

**Navigation bar improvements**

The navigation bar will display the name of the current mobile tab alongside the record's configured title field. Records that have not been saved yet will show "Unsaved Draft" so technicians can distinguish them from committed records.

**What this means for your team:** These changes are improvements, not breaking changes. However, your technicians will see a noticeably different interface. Brief your field team before August 11 so they know what to expect. An offline warning banner and new sync icons may otherwise generate support calls from technicians who think something is wrong.

### Configuration changes requiring administrator review

Several changes in this release touch FSM configuration directly. Some require migration steps.

**New `cancomplete` property for task completion**

A new `cancomplete` property in the mobile event map gives administrators control over task completion eligibility. When the expression returns false, the Complete button is visually disabled and no completion request is submitted.

Out of the box after the update, CRM task completion is locked to the assigned technician. Project tasks remain open to any mobile user.

**Review this if:** You have project tasks or CRM tasks where completion should be restricted to specific users. The new default behavior may differ from what your technicians currently experience.

**New `create`, `edit`, and `delete` properties on mobile tabs**

Rather than a single readonly toggle, mobile tab permissions now have separate `create`, `edit`, and `delete` properties that can be controlled independently per tab.

**Important:** As part of this change, the `readonly` rule at the resource level of FSM Configuration is being retired. Any `readonly` rules you have at that level will stop working after the upgrade. Before August 11, identify those rules and replace them with the equivalent `edit` property on the relevant mobile tabs.

**Review this if:** You have configured readonly rules at the resource level in your FSM Configuration. After the update, those rules will no longer restrict technician access as intended.

**nxc_now() expressions: automatic migration with a required review**

FSM Mobile expressions now include `format(date)` and `now()` helpers for handling date, time, and datetime values. Oracle will automatically migrate any existing `nxc_now()` expressions to the new helpers when the update is applied.

The migrated expressions will be stored in a new configuration record named "Auto Configure xxxx: Migrate nxc_now expressions." You should review this record after the upgrade to confirm the migration is correct and that existing checkbox conditions are preserved.

The required formats after migration are:

| Field Type | Required Format | Example |
|---|---|---|
| Date | YYYY-MM-DD | 2026-07-14 |
| Time | HH:mm:ss | 09:30:00 |
| Date and Time | YYYY-MM-DD HH:mm:ss | 2026-07-14 09:30:00 |

**Review this if:** You use `nxc_now()` in any mobile expressions. Confirm the auto-migrated configuration record is correct in Sandbox before the Production upgrade.

**Time tracking now managed in FSM Configuration**

The Track Service Time feature is now controlled by a `time.timetracking` boolean option in FSM Configuration rather than a separate setting. Accounts that had Track Service Time enabled before the update will retain their setting automatically.

**Review this if:** You plan to enable Track Service Time for the first time. Oracle requires testing this feature in Sandbox before enabling it in Production.

**Mobile user license count removed from employee records**

The at-a-glance license count that appeared next to the Field Service Mobile User field on employee records is being removed. It will no longer be visible there after the upgrade.

Going forward, tracking mobile license consumption requires a saved search. Cross-reference the results against your allotted count on the Billing Information page, which you can reach via Setup, then Company, then View Billing Information.

**Review this if:** Your administrators currently check license counts directly on employee records. You will need a saved search in place before August 11 to maintain visibility over your license usage.

### Heading blocks for mobile tab forms

Administrators can now add heading blocks to mobile tab forms to organize long forms without using placeholder fields or inline HTML workarounds. A heading element can be set to levels 1, 2, or 3 in decreasing visual prominence. Headings span the full content width and follow the existing element ordering logic.

### Portuguese locale support

The FSM Mobile app now supports Portuguese (Portugal) through the pt_PT locale. This applies when the account country is Portugal and the default account language is Portuguese (Portugal).

### Mobile app bug fixes

Five mobile UX fixes ship in this release. Searchable select fields in table rows now reset cleanly between rows instead of carrying over previous search text. Select fields correctly show the current option label rather than the raw saved value. Search keywords on mobile tabs now persist visually when you navigate back to them. Task list search text survives app restarts and refreshes. Service report images now render correctly for customers whose Field Service Language is set to something other than English or French.

## What Actions Does Oracle Require Before the Update?

Oracle has specified the following actions for this update.

### Before August 11: Sandbox testing

Your Sandbox account already has 2026.07.1 available as of July 16. Oracle's minimum testing requirements are:

- Order creation
- Resource scheduling
- Job completion
- Service reports
- Invoicing

This is the floor, not the ceiling. Organizations with custom configurations, custom scripts, or third-party integrations should test substantially more than this list.

### After August 11: Check your custom center tabs

If you have modified or created custom FSM center tabs, you must check the following after the Production upgrade:

- For each FSM center tab, verify the audience is still set appropriately for your business
- Check that links to the Field Service mobile and scheduler board on custom center tabs are working

For detailed guidance, refer to SuiteAnswers ID 1021215 (Maintaining Field Service Navigation After SuiteApp Updates).

### After August 11: Check bundle message recipients

Verify that the right people in your organization receive FSM bundle messages such as upgrade notices. On the Bundle Details page for FSM (Bundle ID 570821), confirm that email recipients are set to either All Bundle Admins or Custom. If you select Custom, add or update recipients as needed. Note that email addresses cannot be edited on the Bundle Details page and must be updated directly on the employee record.

## What Should You Validate in Sandbox Before August 11?

Use this checklist alongside Oracle's minimum requirements. Prioritize the areas that the 2026.07.1 changes directly touch.

### Mobile app

- Log in as a technician and confirm authentication completes successfully
- Verify the new status counters appear correctly on the task list and on individual tasks
- Go offline and confirm the warning banner appears and persists across pages
- Trigger a sync error and confirm the error icon appears on the affected record; test the retry
- Complete a CRM task as the assigned technician and as a different mobile user; confirm the `cancomplete` default behavior matches your expectations
- Complete a project task as a non-assigned mobile user; confirm this is permitted by default
- Test the navigation bar to confirm tab names and record titles display as expected

### FSM Configuration

- If you use `readonly` at the resource level: confirm those rules have been migrated to the `edit` property and that technician access is restricted as expected
- If you use `nxc_now()` in expressions: locate the "Auto Configure xxxx: Migrate nxc_now expressions" record and review each migrated expression for correctness
- If you use date, time, or datetime fields in mobile expressions: confirm values are formatted correctly (YYYY-MM-DD, HH:mm:ss, YYYY-MM-DD HH:mm:ss)
- If you use Track Service Time: confirm the feature is still enabled and behaves as expected through the new `time.timetracking` configuration option

### Work orders and service tasks

- Create a new work order and confirm all required fields, custom fields, and field defaulting behave as expected
- Walk each work order status transition and verify that associated workflows, scripts, and email actions still fire
- Test work order completion and confirm related records (inventory, cases, invoices) update correctly
- Check any custom forms on work order or service task records

### Scripts and workflows

- Run custom User Event scripts on Case, Customer, and Task records and check the execution log for errors
- Walk through each workflow on FSM record types and confirm transitions and actions still fire
- Test any Scheduled or Map/Reduce scripts that process FSM data

### Permissions and roles

- Log in as each FSM role (dispatcher, technician, service manager) and confirm access is as expected
- Specifically test create, edit, and delete actions on mobile tabs for technician roles, given the new permission properties in this release

### Saved searches and reporting

- Run your key FSM saved searches (open work orders, unassigned tasks, technician schedules) and confirm results are correct
- If you previously relied on the mobile license count on employee records: confirm your replacement saved search is in place and returns accurate counts

### Custom center tabs

- Open each custom FSM center tab and confirm audience settings are correct
- Confirm links to FSM mobile and the scheduler board open as expected

## Frequently asked questions

**Do I have to install this update manually?**
No. Oracle pushes managed bundle updates automatically to Production accounts. Your action is the Sandbox testing that happens before August 11.

**The update already landed in my Sandbox on July 16. Is it safe to test there now?**
Yes. Oracle pushed 2026.07.1 to Sandbox accounts on July 16 specifically to give administrators time to test before the August 11 Production rollout.

**Will the update overwrite my customizations?**
Managed bundle updates are designed to avoid overwriting customer customizations. However, the removal of the `readonly` resource-level rule in this release means that if you relied on that rule, it will no longer apply after the update regardless of whether you took action. Review your FSM Configuration for `readonly` at the resource level before August 11.

**The nxc_now() migration is automatic. Do I still need to do anything?**
Yes. Oracle auto-migrates the expressions but stores the result in a copied configuration record. You should open that record in Sandbox after the update and confirm the migrated expressions are correct, particularly where checkbox conditions are involved.

**What if I do not have a Sandbox account?**
Without Sandbox access, you cannot test this update before it reaches Production. Contact your NetSuite account manager to discuss adding Sandbox to your subscription. For organizations running FSM in a live field operation, Sandbox access is not optional.

**Where do I find the full release notes?**
Oracle published the full 2026.07.1 release notes under SuiteAnswers answer ID 1047018. Additional SuiteAnswers articles referenced in this release: 1046936 (heading blocks), 1047012 (date and time field updates), 1047002 (time tracking), 1046924 (mobile user license saved search), 1021215 (center tab navigation after updates).

**What if I find a problem in Sandbox but Production has already updated?**
Log a support case with Oracle immediately and document the business impact. In parallel, identify whether the issue can be mitigated through a configuration change or custom script while Oracle works on a fix. Your Sandbox test documentation will significantly speed up Oracle support's response.

## How Can SuitePacific Help With the FSM Bundle Update?

This update includes configuration changes that require administrator action before and after the Production upgrade, not just passive testing. The removal of the `readonly` resource-level rule, the `nxc_now()` migration review, and the mobile user license reporting change are all items that need to be addressed regardless of whether your Sandbox testing surfaces any issues.

SuitePacific works with NetSuite customers through the post-go-live phase: reviewing configurations, validating bundle updates, resolving issues that emerge after upgrades, and making sure nothing falls through the gap between Sandbox and Production. If you are not certain your team has the time or expertise to work through the 2026.07.1 changes before August 11, reach out to us and we will take it from there.

For dedicated FSM troubleshooting and post-bundle-update support, see [NetSuite FSM Support and Troubleshooting](/netsuite-fsm-support). For more on how SuitePacific approaches bundle updates and ongoing configuration reviews, see the [NetSuite administrator support service](/netsuite-administrator-support).
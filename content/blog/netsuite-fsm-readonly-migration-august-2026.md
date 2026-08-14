---
title: "NetSuite FSM Breaking Change: How to Replace readonly Resource-Level Rules Before August 11"
description: "The readonly property at the FSM resource level is being retired in the August 11 update. After that date, any readonly rules you have there will silently stop working. Here is how to identify them and replace them before Production is affected."
date: "2026-08-01"
updated: "2026-08-14"
tags: ["Field Service Management", "Administration", "Bundle Updates", "Configuration"]
---

The readonly property in NetSuite FSM Configuration records is a field-level setting that prevents technicians from editing specific resources in the FSM mobile app. In the 2026.07.1 bundle, Oracle is removing the resource-level readonly property and replacing it with more granular field-level access controls configured at the section and field level.

If you have configured `readonly` rules at the resource level of your NetSuite Field Service Management configuration, those rules will stop working on August 11, 2026, when Oracle deploys the FSM 2026.07.1 bundle update to Production.

<div style="background:#eef2fb;border:1px solid #b2c2e6;border-radius:10px;padding:1.25rem 1.5rem;margin:2rem 0;font-family:system-ui,-apple-system,sans-serif">
<p style="margin:0 0 0.5rem;font-size:0.7rem;font-weight:700;color:#4f7fff;text-transform:uppercase;letter-spacing:0.08em">Quick answer</p>
<p style="margin:0;color:#14306b;font-size:0.9rem;line-height:1.6">The readonly property at the resource level in NetSuite FSM Configuration records is being removed in the 2026.07.1 bundle update on August 11, 2026. Any readonly rules configured at the resource level will stop working after the update without an error, alert, or log entry in the system. Technicians who were restricted by these rules will gain the ability to edit records that were previously locked. Oracle is removing the resource-level readonly property because it was a binary on/off control that could not distinguish between create, edit, and delete permissions. The replacement is field-level access control configured at the section and field level in the FSM Configuration record, which provides more granular control. Organizations should identify all resource-level readonly configurations before August 11, recreate the restrictions using field-level controls in Sandbox, and validate that the new configuration produces the expected behavior before Production.</p>
</div>


There is no error when this happens. No alert, no log entry, and no visible change in your FSM Configuration record. Technicians will simply gain the ability to edit records that your `readonly` rule was previously restricting.

**Need help identifying and migrating your FSM configuration before August 11?** SuitePacific works with NetSuite customers through FSM bundle updates, including configuration reviews, migration support, and Sandbox validation. [Contact us](/contact) and we will help you get ahead of this before it affects your live operation.

## Why Oracle is removing the readonly property

The `readonly` property at the resource level was a single on/off control. It blocked technicians from editing a record but gave administrators no way to distinguish between create, edit, and delete permissions independently. You could not, for example, allow technicians to create new records on a tab but prevent them from deleting existing ones.

The 2026.07.1 update replaces this blunt control with three separate properties on mobile tabs: `create`, `edit`, and `delete`. Each can be configured independently per tab, giving administrators more precise control over what technicians can do in the mobile app.

As part of this change, the `readonly` property at the resource level is being retired. Oracle has not provided an automatic migration for it. Identifying and replacing your `readonly` rules is a manual task that must be completed before August 11.

## What happens if you do nothing

If you have `readonly` rules at the resource level and take no action before August 11:

- The rules will remain visible in your FSM Configuration record after the update
- They will have no effect on technician behaviour
- Technicians will be able to create, edit, and delete records on any tab that previously had a `readonly` restriction
- There is no warning in the mobile app or in NetSuite that the restriction has been removed

This is the category of FSM change that is easy to miss in Sandbox testing if you are only checking that things load and complete correctly, rather than specifically testing that restrictions are still in place.

## How to identify whether you are affected

Open your FSM Configuration record in NetSuite (Sandbox first) and review the resource-level configuration. You are looking for any property named `readonly` applied at the resource level rather than at the mobile tab level.

If you are uncertain where to find this in your specific configuration, search for `readonly` within the FSM Configuration record. The property is documented in the FSM configuration schema. Any occurrence of `readonly` at the resource level rather than at an individual tab is what needs to be replaced.

If your configuration has no `readonly` rules at the resource level, you are not affected by this specific change. You should still validate your mobile tab permissions in Sandbox, but no migration is required for this item.

## The replacement: create, edit, and delete on mobile tabs

The three new properties work at the mobile tab level, not the resource level. For each mobile tab in your FSM Configuration, you can now specify:

- `create`: whether technicians can create new records on that tab
- `edit`: whether technicians can edit existing records on that tab
- `delete`: whether technicians can delete records on that tab

The important default to understand: if none of these properties are set on a tab, all three actions are permitted. This means that after August 11, any tab that was previously restricted only by a resource-level `readonly` rule will default to fully open.

<figure style="margin:1.75rem 0">
<svg viewBox="0 0 680 200" xmlns="http://www.w3.org/2000/svg" style="width:100%;max-width:680px;display:block;font-family:system-ui,-apple-system,sans-serif">
  <!-- Before column -->
  <rect x="0" y="0" width="300" height="190" rx="10" fill="#fef2f2" stroke="#fca5a5" stroke-width="1.5"/>
  <text x="150" y="28" text-anchor="middle" font-size="11" font-weight="700" fill="#991b1b">Before 2026.07.1</text>
  <rect x="20" y="40" width="260" height="50" rx="6" fill="#fee2e2" stroke="#fca5a5" stroke-width="1"/>
  <text x="150" y="60" text-anchor="middle" font-size="10" font-weight="600" fill="#7f1d1d">Resource level</text>
  <text x="150" y="77" text-anchor="middle" font-size="9.5" fill="#991b1b">readonly: true</text>
  <text x="150" y="108" text-anchor="middle" font-size="9" fill="#6b7280">Single property blocks all editing</text>
  <text x="150" y="123" text-anchor="middle" font-size="9" fill="#6b7280">Cannot distinguish create / edit / delete</text>
  <rect x="20" y="140" width="260" height="36" rx="6" fill="#fee2e2" stroke="#fca5a5" stroke-width="1"/>
  <text x="150" y="163" text-anchor="middle" font-size="9" fill="#991b1b">⚠ Retired in 2026.07.1: will have no effect after August 11</text>
  <!-- Arrow -->
  <text x="330" y="102" text-anchor="middle" font-size="22" fill="#6b7280">→</text>
  <!-- After column -->
  <rect x="360" y="0" width="320" height="190" rx="10" fill="#f0fdf4" stroke="#86efac" stroke-width="1.5"/>
  <text x="520" y="28" text-anchor="middle" font-size="11" font-weight="700" fill="#14532d">From 2026.07.1</text>
  <rect x="380" y="40" width="280" height="70" rx="6" fill="#dcfce7" stroke="#86efac" stroke-width="1"/>
  <text x="520" y="60" text-anchor="middle" font-size="10" font-weight="600" fill="#14532d">Mobile tab level</text>
  <text x="420" y="80" text-anchor="start" font-size="9.5" fill="#166534">create: true / false</text>
  <text x="420" y="95" text-anchor="start" font-size="9.5" fill="#166534">edit: true / false</text>
  <text x="520" y="80" text-anchor="start" font-size="9.5" fill="#166534">delete: true / false</text>
  <text x="520" y="130" text-anchor="middle" font-size="9" fill="#6b7280">Independent control per action per tab</text>
  <rect x="380" y="150" width="280" height="26" rx="6" fill="#dcfce7" stroke="#86efac" stroke-width="1"/>
  <text x="520" y="167" text-anchor="middle" font-size="9" fill="#14532d">✓ Default: all three actions permitted if not set</text>
</svg>
<figcaption style="text-align:center;font-size:0.78rem;color:#8aa2d6;margin-top:0.4rem">The readonly resource-level rule is replaced by three independent properties at the mobile tab level.</figcaption>
</figure>

## Migration approach

For each `readonly` rule you find at the resource level, work through the following:

**1. Identify what the readonly rule was protecting**

Determine which mobile tabs and which record types the rule was applied to, and what business reason existed for making those records read-only for technicians. Understanding the original intent is important before you translate the rule into the new property structure.

**2. Decide which actions to restrict**

With the new system, you have three separate levers. The equivalent of a `readonly` restriction is to set `edit: false` and `delete: false` on the relevant mobile tabs, while leaving `create` set according to your requirements.

If the original intent was specifically to prevent editing but not creation, you can now express that exactly rather than using a blunt readonly block.

**3. Apply the replacement properties to the correct mobile tabs**

Add the appropriate `create`, `edit`, and `delete` properties to each mobile tab that needs restrictions. If a tab has no restriction properties set, technicians will have full create, edit, and delete access by default after the update.

**4. Remove or note the retired readonly property**

The retired `readonly` property at the resource level will have no effect after August 11. It does not need to be removed for the system to function, but leaving it in place creates a false impression that a restriction is active. Remove it once you have confirmed the replacement tab-level properties are working correctly.

## Testing in Sandbox

Your Sandbox account already has 2026.07.1 available as of July 16. Test your migration there before August 11.

Specifically:

- Log in to the FSM Mobile app as a technician role that was previously subject to a `readonly` restriction
- Attempt to edit a record on a tab that had the restriction
- Confirm that the tab-level `edit: false` property blocks the action as expected
- Confirm that tabs with no restriction properties set allow all three actions
- Test create, edit, and delete separately on each affected tab: do not assume that one test covers all three

Do not only verify that the mobile app loads correctly. Verify that the permission boundaries you expect are actually enforced.

## Frequently asked questions

**Will Oracle migrate my readonly rules automatically?**
No. Oracle has confirmed that the `readonly` property at the resource level is being retired, but no automatic migration is provided. Identifying and replacing these rules is a manual task.

**What if I miss the August 11 deadline?**
If you do not replace your `readonly` rules before August 11, technicians who were previously restricted by those rules will gain unrestricted access after the Production upgrade. You can apply the replacement `edit`, `create`, and `delete` properties after the upgrade and the new properties will take effect in the mobile app, but there will be a window between August 11 and when you complete the work where restrictions are not in place.

**Do I need to do anything if I do not use readonly at the resource level?**
No. If your FSM Configuration does not use `readonly` at the resource level, this specific change does not require action. Review your mobile tab permissions in Sandbox as part of your general 2026.07.1 validation, but no migration work is needed for this item.

**Where can I find more information about the new properties?**
The full 2026.07.1 release notes are available in SuiteAnswers answer ID 1047018. The FSM Configuration documentation in SuiteAnswers covers the mobile tab property schema.

## How SuitePacific can help

Reviewing FSM Configuration for retired properties, translating business requirements into the new mobile tab permission model, and validating the result in Sandbox before August 11 is exactly the kind of work SuitePacific does for NetSuite customers in the post-go-live phase.

If your team does not have an FSM-experienced administrator available before August 11, [reach out to us](/contact). We will work through your configuration, identify what needs to change, and make sure your technicians have the right access when Production updates.

For dedicated FSM support and configuration troubleshooting, see [NetSuite FSM Support and Troubleshooting](/netsuite-fsm-support). For more on how SuitePacific handles post-go-live configuration and administrator support, see the [NetSuite administrator support service](/netsuite-administrator-support).
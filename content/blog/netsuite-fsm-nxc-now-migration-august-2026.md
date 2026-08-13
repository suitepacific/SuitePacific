---
title: "NetSuite FSM nxc_now() Migration Guide: What to Review Before August 11"
description: "Oracle will automatically migrate your nxc_now() expressions when the FSM 2026.07.1 bundle updates on August 11. But automatic does not mean correct. Here is what the migration does, what it misses, and what you need to review in Sandbox before Production is affected."
date: "2026-08-01"
tags: ["Field Service Management", "Administration", "Bundle Updates", "Configuration"]
---

If your NetSuite Field Service Management configuration uses `nxc_now()` expressions in mobile event maps or field expressions, Oracle will automatically migrate those expressions when the FSM 2026.07.1 bundle updates on August 11, 2026.

<div style="background:#eef2fb;border:1px solid #b2c2e6;border-radius:10px;padding:1.25rem 1.5rem;margin:2rem 0;font-family:system-ui,-apple-system,sans-serif">
<p style="margin:0 0 0.5rem;font-size:0.7rem;font-weight:700;color:#4f7fff;text-transform:uppercase;letter-spacing:0.08em">Quick answer</p>
<p style="margin:0;color:#14306b;font-size:0.9rem;line-height:1.6">NetSuite will automatically migrate nxc_now() expressions in FSM Configuration records when the 2026.07.1 bundle updates on August 11, 2026. The nxc_now() function, which captured the current timestamp in mobile event maps and field expressions, is being replaced with a different syntax in the updated FSM framework. Oracle copies the existing configuration record and converts the expressions into the new format. The automatic migration does not guarantee correctness: checkbox conditions may not transfer accurately, date and time formatting may differ from the original, and errors in the migrated record will not surface until technicians encounter the mobile event in a live work order. Organizations should review the migrated configuration record in Sandbox before August 11, test the affected mobile events using a test technician account, and verify that timestamps capture correctly before the update reaches Production.</p>
</div>


Automatic migration sounds like the safe option. It is not a reason to skip review.

Oracle migrates the expressions into a copied configuration record and stores the result for you to inspect. If the migrated expressions contain errors, if checkbox conditions were not carried over correctly, or if date and time values are formatted incorrectly after migration, the problems will appear in your live field operation after August 11: not before, unless you review the migration in Sandbox first.

**Not sure whether your FSM configuration uses nxc_now() or how to find the migrated record?** SuitePacific helps NetSuite customers review FSM configurations before bundle updates. [Contact us](/contact) and we will work through your Sandbox environment with you before August 11.

## What nxc_now() does and why it is changing

`nxc_now()` is a function used in FSM mobile expressions to return the current date or time. It has been a common tool in FSM configurations for setting default values, populating date fields automatically, and building conditional expressions that depend on when a task is being completed.

The 2026.07.1 update introduces two purpose-built helpers that replace `nxc_now()`:

- `format(date)`: formats a date, time, or datetime value into the string representation required by FSM mobile fields
- `now()`: returns the current timestamp

These new helpers are more explicit about what they return and how values are formatted, which reduces the category of bugs that came from `nxc_now()` returning values in an unexpected format.

## What Oracle migrates automatically

When the 2026.07.1 update is applied to your account, Oracle identifies all `nxc_now()` expressions in your FSM Configuration and migrates them to use the new `format()` and `now()` helpers.

The migrated expressions are stored in a new configuration record. The name of that record follows the pattern:

**Auto Configure xxxx: Migrate nxc_now expressions**

The `xxxx` in the name corresponds to your FSM configuration identifier. This record is created automatically and contains the migrated version of each expression that previously used `nxc_now()`.

Your original configuration record is not modified. The migrated record sits alongside it. The migration preserves existing checkbox conditions.

## What you need to review

The automatic migration handles the straightforward cases. The cases that require human review are:

**Date and time format requirements**

The new helpers require date, time, and datetime values to be formatted exactly as follows:

| Field Type | Required Format | Example |
|---|---|---|
| Date | YYYY-MM-DD | 2026-08-11 |
| Time | HH:mm:ss | 14:30:00 |
| Date and Time | YYYY-MM-DD HH:mm:ss | 2026-08-11 14:30:00 |

If any migrated expression produces values in a different format, FSM Mobile will not be able to use them correctly. Reviewing the migrated expressions in Sandbox and testing the actual output in the mobile app is the only reliable way to confirm the formats are correct.

**Complex expressions**

Simple uses of `nxc_now()`: for example, setting a date field to the current date when a task is completed: migrate cleanly. Expressions that use `nxc_now()` as part of a more complex condition, concatenation, or calculation are the ones most likely to need adjustment after migration.

<figure style="margin:1.75rem 0">
<svg viewBox="0 0 680 220" xmlns="http://www.w3.org/2000/svg" style="width:100%;max-width:680px;display:block;font-family:system-ui,-apple-system,sans-serif">
  <defs>
    <marker id="arr" markerWidth="7" markerHeight="7" refX="5" refY="3" orient="auto"><path d="M0,0 L0,6 L7,3 z" fill="#4f7fff"/></marker>
  </defs>
  <!-- Step 1 -->
  <rect x="0" y="30" width="148" height="70" rx="8" fill="#eef2fb" stroke="#4f7fff" stroke-width="1.5"/>
  <text x="74" y="54" text-anchor="middle" font-size="9.5" font-weight="700" fill="#0b1f4d">Your existing config</text>
  <text x="74" y="70" text-anchor="middle" font-size="9" fill="#14306b">Uses nxc_now()</text>
  <text x="74" y="85" text-anchor="middle" font-size="9" fill="#14306b">expressions</text>
  <line x1="148" y1="65" x2="172" y2="65" stroke="#4f7fff" stroke-width="1.5" marker-end="url(#arr)"/>
  <!-- Step 2 -->
  <rect x="174" y="10" width="160" height="110" rx="8" fill="#fffbeb" stroke="#f59e0b" stroke-width="1.5"/>
  <text x="254" y="32" text-anchor="middle" font-size="9.5" font-weight="700" fill="#78350f">Oracle auto-migrates</text>
  <text x="254" y="50" text-anchor="middle" font-size="8.5" fill="#92400e">Creates new record:</text>
  <text x="254" y="65" text-anchor="middle" font-size="8" fill="#b45309" font-style="italic">"Auto Configure xxxx:</text>
  <text x="254" y="78" text-anchor="middle" font-size="8" fill="#b45309" font-style="italic">Migrate nxc_now</text>
  <text x="254" y="91" text-anchor="middle" font-size="8" fill="#b45309" font-style="italic">expressions"</text>
  <text x="254" y="109" text-anchor="middle" font-size="8" fill="#78350f">Original config untouched</text>
  <line x1="334" y1="65" x2="358" y2="65" stroke="#4f7fff" stroke-width="1.5" marker-end="url(#arr)"/>
  <!-- Step 3 -->
  <rect x="360" y="10" width="148" height="110" rx="8" fill="#fef2f2" stroke="#fca5a5" stroke-width="1.5"/>
  <text x="434" y="32" text-anchor="middle" font-size="9.5" font-weight="700" fill="#991b1b">You must review</text>
  <text x="434" y="60" text-anchor="middle" font-size="8.5" fill="#7f1d1d">✗ Date/time formats</text>
  <text x="434" y="78" text-anchor="middle" font-size="8.5" fill="#7f1d1d">✗ Complex expressions</text>
  <text x="434" y="98" text-anchor="middle" font-size="8" fill="#991b1b">Not verified automatically</text>
  <line x1="508" y1="65" x2="532" y2="65" stroke="#4f7fff" stroke-width="1.5" marker-end="url(#arr)"/>
  <!-- Step 4 -->
  <rect x="534" y="30" width="146" height="70" rx="8" fill="#f0fdf4" stroke="#86efac" stroke-width="1.5"/>
  <text x="607" y="52" text-anchor="middle" font-size="9.5" font-weight="700" fill="#14532d">Test in Sandbox</text>
  <text x="607" y="68" text-anchor="middle" font-size="8.5" fill="#166534">Confirm in mobile app</text>
  <text x="607" y="83" text-anchor="middle" font-size="8.5" fill="#166534">before Aug 11</text>
  <!-- Labels -->
  <text x="340" y="155" text-anchor="middle" font-size="9" fill="#6b7280">Automatic migration creates the record. Human review confirms it is correct.</text>
</svg>
<figcaption style="text-align:center;font-size:0.78rem;color:#8aa2d6;margin-top:0.4rem">Oracle handles the migration. You are responsible for verifying the result before August 11.</figcaption>
</figure>

## How to review the migration in Sandbox

Your Sandbox account has already received the 2026.07.1 update as of July 16. The migrated configuration record is already there.

Work through the following in Sandbox:

**1. Locate the migrated record**

Open your FSM Configuration in Sandbox and look for the record named "Auto Configure xxxx: Migrate nxc_now expressions." This is where Oracle has placed all of the migrated expressions.

**2. Review each expression line by line**

Open the record and read through every migrated expression. Do not assume that expressions which look similar to the originals are correct. Specifically:

- Confirm that date values will be formatted as YYYY-MM-DD
- Confirm that time values will be formatted as HH:mm:ss
- Confirm that datetime values will be formatted as YYYY-MM-DD HH:mm:ss

**3. Test the expressions in the FSM Mobile app**

Reading the configuration is not enough. Open the FSM Mobile app in Sandbox, navigate to the forms and fields that use the migrated expressions, and confirm that:

- Date fields populated by `now()` show the correct current date in the correct format
- Conditions that use the migrated expressions evaluate correctly

**4. Correct any errors before August 11**

If you find incorrect expressions in the migrated record, correct them in Sandbox and re-test. The goal is to have a confirmed, working migrated configuration in Sandbox before August 11, so you know exactly what the Production state should be after the upgrade.

## What if your configuration does not use nxc_now()

If your FSM Configuration does not use `nxc_now()` in any expressions, this migration does not apply to you. No "Auto Configure xxxx: Migrate nxc_now expressions" record will be created in your account.

You can verify this by searching for `nxc_now` within your FSM Configuration record in Sandbox. If no results appear, you are not affected by this specific change.

## Frequently asked questions

**Will nxc_now() stop working after August 11?**
Oracle's documentation for 2026.07.1 indicates that existing `nxc_now()` expressions are automatically migrated. The practical question is whether the migrated versions work correctly: which is why reviewing the migrated record in Sandbox is essential.

**What if I find errors in the migrated record after August 11?**
If Production upgrades on August 11 and you later find that migrated expressions are incorrect, you can update the migrated configuration record directly in Production. The corrections will take effect when technicians next sync the mobile app. However, any tasks completed in the window between August 11 and the correction may have incorrect field values from the broken expressions.

**Do I need to do anything to trigger the migration?**
No. Oracle runs the migration automatically as part of the bundle update. Your only required action is to review and test the result in Sandbox before August 11, and then confirm the migrated record in Production after August 11 matches what you validated in Sandbox.

**Where is the full documentation for this change?**
The 2026.07.1 release notes are available in SuiteAnswers answer ID 1047018. The date and time field update guidance is in SuiteAnswers answer ID 1047012.

## How SuitePacific can help

Reviewing FSM configuration expressions, identifying checkbox conditions that may not have migrated correctly, testing the mobile app in Sandbox, and confirming the migration is correct before August 11 is technical work that requires FSM experience.

If your team is not certain how to locate or evaluate the migrated configuration record, [contact SuitePacific](/contact). We work with NetSuite customers through FSM bundle updates and can help you validate this specific migration before it affects your Production environment.

For dedicated FSM support and post-upgrade troubleshooting, see [NetSuite FSM Support and Troubleshooting](/netsuite-fsm-support). For more on how SuitePacific supports FSM configuration and post-upgrade validation, see the [NetSuite administrator support service](/netsuite-administrator-support).
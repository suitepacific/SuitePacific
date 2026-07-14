---
title: "Why Your NetSuite Workflow Is Firing Twice on the Same Record"
description: "A NetSuite workflow that fires twice on every save is almost always a trigger configuration issue. Learn the two most common causes and how to fix them."
category: "Workflow Automation"
tags: ["Workflow Automation", "SuiteFlow", "Troubleshooting"]
publishedAt: "2026-07-01"
linkedinDay: 1
---

## The symptom

A workflow fires twice on the same record save. Approval emails go out in duplicate. Field updates happen twice. A workflow that should create one record creates two.

This is one of the most common workflow issues in NetSuite accounts, and the cause is almost always in the trigger configuration — not a bug in NetSuite itself.

## Cause 1: Both "Before Record Submit" and "After Record Submit" are selected

When configuring a workflow's trigger, NetSuite lets you select multiple trigger events. The most common double-fire pattern is selecting both **Before Record Submit** and **After Record Submit** on the same workflow.

Both triggers fire on every save:
- Before Record Submit fires before the record is committed to the database
- After Record Submit fires after the record is committed

If both are selected, the workflow runs once for each trigger — two executions per save, every time that record type is saved.

**The fix:** Choose one trigger and remove the other. In most cases:
- Use **Before Record Submit** if the workflow needs to validate or modify the record before it is saved
- Use **After Record Submit** if the workflow should react to a completed save (sending notifications, creating related records, calling external systems)

One workflow should serve one purpose. If the logic genuinely needs to run at both points in the save cycle, that is usually a sign it should be split into two separate workflows, each with a single trigger.

## Cause 2: A User Event script is triggering a record update that re-fires the workflow

This is a less obvious but equally common cause. The sequence looks like this:

1. User saves the record
2. Workflow fires (first execution)
3. A User Event script on the same record type fires and updates the record
4. That update triggers a second save
5. Workflow fires again (second execution)

The workflow itself is configured correctly — it only fires once per save. But because another process is triggering a second save programmatically, the workflow runs again on that second save.

**How to identify this:** Check what User Event scripts are deployed on the same record type. Look for any `afterSubmit` scripts that call `record.submitFields()` or `record.load() + save()` on the same record. If one of those updates is triggering the workflow's Entry Condition, it will re-fire the workflow.

**The fix options:**
- Add an Entry Condition to the workflow so it only fires when a specific field changes to a specific value — not on every save. If the User Event script does not touch that field, the workflow will not re-fire.
- Modify the User Event script to skip its update when the save originated from a workflow context (check `runtime.executionContext`).
- Restructure the workflow or script so they do not create a save loop.

## The underlying principle

Every workflow should have a clear answer to the question: "Under exactly what conditions should this run?"

A workflow without a precise Entry Condition, combined with multiple save triggers, is an open invitation to double-firing. The narrower the trigger configuration and entry condition, the more predictable the workflow's behavior.

One workflow. One trigger. One clear entry condition. Keep them separate.

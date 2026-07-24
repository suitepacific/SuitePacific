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

This is one of the most common workflow issues in NetSuite accounts, and the cause is almost always in the trigger configuration, not a bug in NetSuite itself.

<figure style="margin:1.75rem 0">
<svg viewBox="0 0 680 190" xmlns="http://www.w3.org/2000/svg" style="width:100%;max-width:680px;display:block;font-family:system-ui,-apple-system,sans-serif">
  <defs>
    <marker id="wft-arrow" markerWidth="7" markerHeight="7" refX="5" refY="3" orient="auto"><path d="M0,0 L0,6 L7,3 z" fill="#ef4444"/></marker>
  </defs>
  <text x="340" y="14" text-anchor="middle" font-size="10" font-weight="700" fill="#14306b" letter-spacing="0.05em">TWO CAUSES OF DOUBLE-FIRE</text>
  <!-- Cause 1 box -->
  <rect x="0" y="22" width="320" height="162" rx="9" fill="#fef2f2" stroke="#fca5a5" stroke-width="1.5"/>
  <rect x="0" y="22" width="320" height="26" rx="9" fill="#991b1b"/>
  <rect x="0" y="40" width="320" height="8" fill="#991b1b"/>
  <text x="160" y="39" text-anchor="middle" font-size="9.5" font-weight="700" fill="#fee2e2">Cause 1: Both triggers selected</text>
  <!-- Cause 1 flow: one save, two fires -->
  <rect x="90" y="56" width="140" height="20" rx="5" fill="#14306b"/>
  <text x="160" y="70" text-anchor="middle" font-size="9" font-weight="700" fill="#eef2fb">User saves record</text>
  <!-- Two arrows down to two trigger boxes -->
  <line x1="120" y1="76" x2="60" y2="96" stroke="#ef4444" stroke-width="1.5" marker-end="url(#wft-arrow)"/>
  <line x1="200" y1="76" x2="260" y2="96" stroke="#ef4444" stroke-width="1.5" marker-end="url(#wft-arrow)"/>
  <rect x="12" y="96" width="136" height="20" rx="4" fill="#fca5a5"/>
  <text x="80" y="110" text-anchor="middle" font-size="8.5" font-weight="700" fill="#7f1d1d">Before Record Submit</text>
  <rect x="172" y="96" width="136" height="20" rx="4" fill="#fca5a5"/>
  <text x="240" y="110" text-anchor="middle" font-size="8.5" font-weight="700" fill="#7f1d1d">After Record Submit</text>
  <!-- Two fires -->
  <line x1="80" y1="116" x2="80" y2="132" stroke="#ef4444" stroke-width="1.5" marker-end="url(#wft-arrow)"/>
  <line x1="240" y1="116" x2="240" y2="132" stroke="#ef4444" stroke-width="1.5" marker-end="url(#wft-arrow)"/>
  <rect x="12" y="132" width="136" height="18" rx="4" fill="#ef4444" opacity="0.3"/>
  <text x="80" y="144" text-anchor="middle" font-size="8" font-weight="700" fill="#991b1b">Workflow fires ①</text>
  <rect x="172" y="132" width="136" height="18" rx="4" fill="#ef4444" opacity="0.3"/>
  <text x="240" y="144" text-anchor="middle" font-size="8" font-weight="700" fill="#991b1b">Workflow fires ②</text>
  <text x="160" y="172" text-anchor="middle" font-size="8.5" font-weight="600" fill="#991b1b">Fix: pick one trigger, remove the other</text>
  <!-- Cause 2 box -->
  <rect x="360" y="22" width="320" height="162" rx="9" fill="#fef2f2" stroke="#fca5a5" stroke-width="1.5"/>
  <rect x="360" y="22" width="320" height="26" rx="9" fill="#991b1b"/>
  <rect x="360" y="40" width="320" height="8" fill="#991b1b"/>
  <text x="520" y="39" text-anchor="middle" font-size="9.5" font-weight="700" fill="#fee2e2">Cause 2: User Event creates a second save</text>
  <!-- Cause 2 flow: save loop -->
  <rect x="420" y="56" width="200" height="18" rx="4" fill="#14306b"/>
  <text x="520" y="69" text-anchor="middle" font-size="8.5" font-weight="700" fill="#eef2fb">1. User saves record</text>
  <line x1="520" y1="74" x2="520" y2="84" stroke="#ef4444" stroke-width="1.5" marker-end="url(#wft-arrow)"/>
  <rect x="420" y="84" width="200" height="18" rx="4" fill="#fca5a5"/>
  <text x="520" y="97" text-anchor="middle" font-size="8.5" font-weight="700" fill="#7f1d1d">2. Workflow fires ①</text>
  <line x1="520" y1="102" x2="520" y2="112" stroke="#ef4444" stroke-width="1.5" marker-end="url(#wft-arrow)"/>
  <rect x="420" y="112" width="200" height="18" rx="4" fill="#fca5a5" opacity="0.7"/>
  <text x="520" y="125" text-anchor="middle" font-size="8.5" fill="#7f1d1d">3. afterSubmit script updates record</text>
  <line x1="520" y1="130" x2="520" y2="140" stroke="#ef4444" stroke-width="1.5" marker-end="url(#wft-arrow)"/>
  <rect x="420" y="140" width="200" height="18" rx="4" fill="#ef4444" opacity="0.3"/>
  <text x="520" y="153" text-anchor="middle" font-size="8.5" font-weight="700" fill="#991b1b">4. Workflow fires again ②</text>
  <text x="520" y="172" text-anchor="middle" font-size="8.5" font-weight="600" fill="#991b1b">Fix: add an entry condition to the workflow</text>
</svg>
<figcaption style="text-align:center;font-size:0.78rem;color:#8aa2d6;margin-top:0.4rem">Cause 1 is visible in the trigger tab. Cause 2 requires checking what User Event scripts are deployed on the same record type.</figcaption>
</figure>

## Cause 1: Both "Before Record Submit" and "After Record Submit" are selected

When configuring a workflow's trigger, NetSuite lets you select multiple trigger events. The most common double-fire pattern is selecting both **Before Record Submit** and **After Record Submit** on the same workflow.

Both triggers fire on every save:
- Before Record Submit fires before the record is committed to the database
- After Record Submit fires after the record is committed

If both are selected, the workflow runs once for each trigger, two executions per save, every time that record type is saved.

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

The workflow itself is configured correctly, it only fires once per save. But because another process is triggering a second save programmatically, the workflow runs again on that second save.

**How to identify this:** Check what User Event scripts are deployed on the same record type. Look for any `afterSubmit` scripts that call `record.submitFields()` or `record.load() + save()` on the same record. If one of those updates is triggering the workflow's Entry Condition, it will re-fire the workflow.

**The fix options:**
- Add an Entry Condition to the workflow so it only fires when a specific field changes to a specific value, not on every save. If the User Event script does not touch that field, the workflow will not re-fire.
- Modify the User Event script to skip its update when the save originated from a workflow context (check `runtime.executionContext`).
- Restructure the workflow or script so they do not create a save loop.

## The underlying principle

Every workflow should have a clear answer to the question: "Under exactly what conditions should this run?"

A workflow without a precise Entry Condition, combined with multiple save triggers, is an open invitation to double-firing. The narrower the trigger configuration and entry condition, the more predictable the workflow's behavior.

One workflow. One trigger. One clear entry condition. Keep them separate.

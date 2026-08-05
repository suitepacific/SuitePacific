---
title: "What NetSuite FSM Technicians Will See After the August 11 Update"
description: "The FSM 2026.07.1 bundle update changes the mobile app interface that field technicians use every day. Here is exactly what is changing, what it looks like, and how to brief your team before August 11."
date: "2026-08-01"
tags: ["Field Service Management", "Mobile", "Bundle Updates"]
---

On August 11, 2026, Oracle will update the NetSuite Field Service Management bundle to version 2026.07.1 in Production accounts. Most of the conversation about this update focuses on administrator configuration tasks. But for the people who will notice it most, the change is in the mobile app.

Technicians, dispatchers, and field managers who open the FSM Mobile app on or after August 11 will see a different interface. Not a complete redesign, but enough visible change that without any advance briefing, some team members will assume something is broken.

This post explains exactly what is changing in the mobile experience, why Oracle made these changes, and what to tell your field team before August 11.

**Running FSM in a live field operation and not sure how to prepare your team?** SuitePacific helps NetSuite customers manage FSM bundle updates, including briefing templates and Sandbox walkthroughs for field teams. [Contact us](/contact).

## The core problem this update solves

Before 2026.07.1, the FSM Mobile app gave technicians limited visibility into the status of their records. If a record had a sync error, the technician might not know until they specifically navigated to it. If the device went offline, there was no persistent indication across all screens. If a task was waiting to sync, it was not obvious at a glance.

These limitations led to real operational problems: technicians completing tasks without knowing a previous sync had failed, work orders submitted twice, or field managers unable to understand why records from the day were not showing in NetSuite.

The 2026.07.1 update addresses this by adding persistent, visible status indicators throughout the mobile app. The goal is to surface problems at the moment they happen, not after the fact.

## What is changing in the mobile app

### Status counters on the task list and on individual tasks

After the update, technicians will see a numeric counter at the top of their task list showing how many records have an active status: pending sync, draft, error, or offline. The same counter appears on each individual task.

This means that if a technician has three records with sync errors, they will see that immediately when they open the task list: without having to open each task to find out.

When a record has more than one status at the same time, the app shows the most critical one. The priority order is:

1. Offline
2. Active Sync
3. Draft
4. Error

This means a record that is both a draft and offline will show the Offline status, since that is the more critical condition.

### A persistent offline banner

Previously, if a device went offline while the technician was using the app, the offline state was not prominently indicated as they moved between screens. After the update, a banner appears at the bottom of every screen when the device has no connection, and it remains visible as the technician navigates through tasks and records.

When the device comes back online, the banner disappears automatically.

**What to tell your team:** Some technicians may see this banner for the first time in areas with poor connectivity where they previously assumed the app was working normally. The banner does not mean the app is broken. It means the app is now telling them something it could not tell them before.

### A sync error indicator with retry

When a record fails to sync to NetSuite, it will now show a visible error icon directly on that record. The technician can see which records have failed and can trigger a retry from the record without making any edits.

Once the retry succeeds, the error icon clears automatically. If the record still cannot sync, the icon remains and the technician knows the issue is unresolved.

**What to tell your team:** Technicians should not ignore the error icon or assume the record will sync on its own. The retry option is there specifically so they can act on sync failures in the field rather than discovering them later.

### Navigation bar improvements

The navigation bar across the top of the mobile app will now show the name of the current mobile tab alongside the title field of the record being viewed. For example, if a technician is viewing a work order called "HVAC Service: Building 4," the navigation bar will show the tab name and that record title together.

Records that have not been saved yet will show "Unsaved Draft" in the navigation bar. This distinguishes uncommitted records from saved ones, which was previously a source of confusion when technicians were not certain whether they had completed a save action.

<figure style="margin:1.75rem 0">
<svg viewBox="0 0 680 240" xmlns="http://www.w3.org/2000/svg" style="width:100%;max-width:680px;display:block;font-family:system-ui,-apple-system,sans-serif">
  <!-- Phone frame -->
  <rect x="190" y="0" width="300" height="235" rx="18" fill="#0b1f4d" stroke="#1e3a7a" stroke-width="2"/>
  <rect x="200" y="12" width="280" height="210" rx="8" fill="#f8faff"/>
  <!-- Nav bar -->
  <rect x="200" y="12" width="280" height="34" rx="8" fill="#0b1f4d"/>
  <rect x="200" y="34" width="280" height="12" fill="#0b1f4d"/>
  <text x="340" y="33" text-anchor="middle" font-size="9" fill="white" font-weight="600">Work Orders  ·  HVAC Service: Building 4</text>
  <!-- Status counter badge -->
  <rect x="430" y="16" width="40" height="18" rx="9" fill="#ef4444"/>
  <text x="450" y="29" text-anchor="middle" font-size="9" fill="white" font-weight="700">3 ⚠</text>
  <!-- Record rows -->
  <rect x="210" y="55" width="260" height="38" rx="6" fill="white" stroke="#e5e7eb" stroke-width="1"/>
  <text x="225" y="70" font-size="9" fill="#0b1f4d" font-weight="600">WO-1042 · Compressor Replacement</text>
  <text x="225" y="83" font-size="8" fill="#6b7280">Assigned · 9:00 AM</text>
  <rect x="210" y="100" width="260" height="38" rx="6" fill="#fef2f2" stroke="#fca5a5" stroke-width="1"/>
  <text x="225" y="115" font-size="9" fill="#0b1f4d" font-weight="600">WO-1039 · Roof Unit Inspection</text>
  <text x="225" y="128" font-size="8" fill="#dc2626">⚠ Sync error: tap to retry</text>
  <rect x="210" y="145" width="260" height="38" rx="6" fill="white" stroke="#e5e7eb" stroke-width="1"/>
  <text x="225" y="160" font-size="9" fill="#0b1f4d" font-weight="600">WO-1037 · Filter Replacement</text>
  <text x="225" y="173" font-size="8" fill="#6b7280">Draft · Unsaved</text>
  <!-- Offline banner -->
  <rect x="200" y="190" width="280" height="26" rx="4" fill="#1e40af"/>
  <text x="340" y="207" text-anchor="middle" font-size="9" fill="white" font-weight="500">No connection · Changes will sync when online</text>
  <!-- Button row -->
  <rect x="200" y="216" width="280" height="6" rx="3" fill="#0b1f4d"/>
</svg>
<figcaption style="text-align:center;font-size:0.78rem;color:#8aa2d6;margin-top:0.4rem">After the update: status counter in the nav bar, sync error indicator on the affected record, and a persistent offline banner. These are improvements, not errors.</figcaption>
</figure>

## What is not changing

It is worth being clear about what the August 11 update does not change for technicians:

- The overall structure of the task list and the way work orders are assigned and completed is not changing
- The process for completing tasks, capturing notes, attaching photos, and generating service reports is not changing
- Login credentials and account access are not changing
- The core workflow from receiving a task to marking it complete is not affected

The changes are in how the app communicates its status to the technician, not in how the technician does their work.

## Task completion behavior change for CRM tasks

One functional change that affects technicians directly: CRM task completion is now restricted to the assigned technician by default.

Before 2026.07.1, the Complete button on a CRM task was available to any mobile user. After the update, the Complete button for a CRM task will be visually disabled for technicians who are not the assigned user.

Project tasks are not affected by this change. Project task completion remains available to any mobile user by default.

**What to tell your team:** If a technician reports that the Complete button on a CRM task is greyed out, this is expected behavior after the update. The task is likely assigned to a different technician. If this behavior needs to be adjusted for specific task types, it can be configured by an administrator using the new `cancomplete` property in FSM Configuration.

## How to brief your field team

The single most useful thing you can do before August 11 is give your field team a brief explanation of what they will see on the first morning after the update. A short message covering the following is enough:

- The task list will now show a counter of records with active statuses
- An offline banner will appear at the bottom of the screen when there is no connection: this is normal and not a malfunction
- Records with sync errors will show a visible icon: tap the record and use the retry option
- The navigation bar will now show the current tab name and record title
- Records that have not been saved will show "Unsaved Draft" in the navigation bar

Without this briefing, the most likely outcome is support calls from technicians who see the offline banner or error icon and assume the app has stopped working.

## Testing the new interface in Sandbox

Your Sandbox account already has the 2026.07.1 update as of July 16. If you have not already done so, log in to the FSM Mobile app using a Sandbox technician account and walk through the new interface before August 11.

Specifically:

- Verify that the status counter appears on the task list
- Put the device in airplane mode and confirm the offline banner appears and persists across multiple screens
- Return online and confirm the banner clears
- Find or create a record with a sync error and confirm the error icon is visible and the retry option works
- Confirm the navigation bar shows the tab name and record title on saved records, and "Unsaved Draft" on unsaved ones

This gives you firsthand knowledge of exactly what your technicians will experience, so you can brief them accurately.

## How SuitePacific can help

Preparing a field team for a mobile app change is different from preparing administrators for a configuration change. If you need help developing a briefing for your dispatchers and technicians, or if you want a walkthrough of the new interface in Sandbox before August 11, [contact SuitePacific](/contact). We work with NetSuite customers through FSM bundle updates and can help you manage both the technical and operational side of the transition.

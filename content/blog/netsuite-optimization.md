---
title: "NetSuite Account Optimization: What to Audit and Fix on a Live Account"
description: "A practical guide to optimizing a live NetSuite account, covering custom fields, saved searches, workflows, script deployments, roles, and form cleanup."
date: "2026-07-05"
tags: ["Account Optimization", "Performance", "Administration"]
---

When we audit a NetSuite account that has been live for two or three years, we almost always find the same things: custom fields nobody uses, saved searches still running on dashboards for processes that ended, workflows with no entry conditions firing on every transaction save, and script deployments for projects that wrapped up 18 months ago.

None of this gets added on purpose. It builds up because NetSuite makes it easy to add things and there is no natural pressure to remove them. The result is an account that is slower, harder to maintain, and harder to train new people on than it should be.

A NetSuite optimization is a cleanup pass on a live account. No re-implementation, no module changes, no big project. Just a structured review of what is actually in the system and what should not be.

<figure style="margin:1.75rem 0">
<svg viewBox="0 0 680 148" xmlns="http://www.w3.org/2000/svg" style="width:100%;max-width:680px;display:block;font-family:system-ui,-apple-system,sans-serif">
  <text x="340" y="13" text-anchor="middle" font-size="10" font-weight="700" fill="#14306b" letter-spacing="0.05em">AUDIT AREAS: LIVE ACCOUNT OPTIMIZATION</text>
  <!-- Row 1: 3 boxes -->
  <rect x="0" y="22" width="206" height="54" rx="7" fill="#eef2fb" stroke="#4f7fff" stroke-width="1.5"/>
  <text x="103" y="43" text-anchor="middle" font-size="10" font-weight="700" fill="#14306b">Custom Fields</text>
  <text x="103" y="57" text-anchor="middle" font-size="8.5" fill="#4f6fb0">Deactivate fields not on any active</text>
  <text x="103" y="69" text-anchor="middle" font-size="8.5" fill="#4f6fb0">form with no data in them</text>

  <rect x="237" y="22" width="206" height="54" rx="7" fill="#eef2fb" stroke="#4f7fff" stroke-width="1.5"/>
  <text x="340" y="43" text-anchor="middle" font-size="10" font-weight="700" fill="#14306b">Saved Searches</text>
  <text x="340" y="57" text-anchor="middle" font-size="8.5" fill="#4f6fb0">Remove portlet assignments for</text>
  <text x="340" y="69" text-anchor="middle" font-size="8.5" fill="#4f6fb0">ended processes; deactivate stale ones</text>

  <rect x="474" y="22" width="206" height="54" rx="7" fill="#eef2fb" stroke="#4f7fff" stroke-width="1.5"/>
  <text x="577" y="43" text-anchor="middle" font-size="10" font-weight="700" fill="#14306b">Workflows</text>
  <text x="577" y="57" text-anchor="middle" font-size="8.5" fill="#4f6fb0">Check entry conditions; deactivate</text>
  <text x="577" y="69" text-anchor="middle" font-size="8.5" fill="#4f6fb0">workflows for ended processes</text>

  <!-- Row 2: 3 boxes -->
  <rect x="0" y="90" width="206" height="54" rx="7" fill="#eef2fb" stroke="#4f7fff" stroke-width="1.5"/>
  <text x="103" y="111" text-anchor="middle" font-size="10" font-weight="700" fill="#14306b">Script Deployments</text>
  <text x="103" y="125" text-anchor="middle" font-size="8.5" fill="#4f6fb0">Review Released status; confirm each</text>
  <text x="103" y="137" text-anchor="middle" font-size="8.5" fill="#4f6fb0">deployment has an active business use</text>

  <rect x="237" y="90" width="206" height="54" rx="7" fill="#eef2fb" stroke="#4f7fff" stroke-width="1.5"/>
  <text x="340" y="111" text-anchor="middle" font-size="10" font-weight="700" fill="#14306b">Roles and Permissions</text>
  <text x="340" y="125" text-anchor="middle" font-size="8.5" fill="#4f6fb0">Move users off Admin/Full Access;</text>
  <text x="340" y="137" text-anchor="middle" font-size="8.5" fill="#4f6fb0">scope roles to actual job functions</text>

  <rect x="474" y="90" width="206" height="54" rx="7" fill="#eef2fb" stroke="#4f7fff" stroke-width="1.5"/>
  <text x="577" y="111" text-anchor="middle" font-size="10" font-weight="700" fill="#14306b">Custom Forms</text>
  <text x="577" y="125" text-anchor="middle" font-size="8.5" fill="#4f6fb0">Set obsolete forms to inactive so</text>
  <text x="577" y="137" text-anchor="middle" font-size="8.5" fill="#4f6fb0">they don't appear in the selector</text>
</svg>
<figcaption style="text-align:center;font-size:0.78rem;color:#8aa2d6;margin-top:0.4rem">All six areas compound. A script deployed to a high-volume record type with no entry condition, custom fields loading on that same record, and a portlet search running on every login adds up fast.</figcaption>
</figure>

Here is what to look at.

## Custom fields

Every custom field on a record type loads with that record, whether it is on any active form or not. Accounts that have been live a few years tend to have fields from old projects, fields that were replaced by different fields, and fields somebody added to test something and never removed.

Pull the full list from Customization > Lists, Records and Fields > Transaction Body Fields. Look for fields that are not on any active form and have no data in them. Those are safe to deactivate. If a field has historical data, deactivate it rather than deleting it. Deactivated fields keep their data but stop loading on forms.

## Saved searches

The ones that matter most for performance are saved searches assigned as dashboard portlets. Those run every single time someone with that role loads their home page, whether they are looking at the results or not. Go to Reports > Saved Searches > All Saved Searches, filter for public searches, and check portlet assignments. If a search is running on a dashboard for a process that no longer exists, remove the portlet assignment.

Everything else, searches nobody has opened in a year, searches built for a one-time report, should be deactivated.

## Workflows

Two things to check on every active workflow. First, does the process it was built for still exist? Second, does it have entry conditions set?

A workflow with no entry conditions runs on every save of that record type, regardless of what changed. That is fine if the workflow actually needs to run every time. Most do not. Go to Customization > Workflow > Workflows, open each active workflow, and look at the initiation tab. If there are no conditions limiting when it triggers, it is worth reviewing whether that is intentional. For the workflow mistakes that most commonly cause this pattern, see [5 Common NetSuite Workflow Automation Mistakes](/blog/workflow-automation-mistakes).

## Script deployments

Same logic as workflows. A User Event script deployed to the Transaction record type runs on every transaction save, for as long as it is active. Go to Customization > Scripting > Script Deployments, filter by Status = Released, and work through the list. For each deployment, ask what business process it supports. If you cannot answer that, it needs investigation before staying active. For practices that prevent deployment sprawl in the first place, see [SuiteScript Best Practices: Customizations That Survive the Next Upgrade](/blog/suitescript-best-practices).

## Roles and permissions

Most accounts have at least a few users on the Administrator or Full Access role who do not need to be. Both roles give access to payroll data, banking configuration, and system settings. Most users do not need any of that.

Review active users and their roles. Anyone on a broad role who only needs to process bills, run reports, or enter orders should be on a custom role scoped to what they actually do. For multi-subsidiary accounts, confirm subsidiary restrictions are set on each role. Without them, a user in one entity can see transactions from another.

## Custom forms

Old custom forms still show up in the form selector when someone opens a record, even if nobody uses them. Go to Customization > Forms > Transaction Forms and set anything that is not an active entry form to inactive. It removes the confusion for users and reduces the metadata NetSuite loads when a record opens.

---

None of this is complicated. It is time-consuming because accounts accumulate years of changes and there is no dashboard that shows you what is unused. But working through it systematically results in an account that is noticeably faster, easier to manage, and less likely to produce unexpected behavior from something nobody remembers setting up.

Our [NetSuite account optimization service](/netsuite-account-optimization) is built around exactly this kind of audit. If the account has not had a structured cleanup pass since go-live, [book a consultation](/contact) and we can tell you what we find. For related reading, see [Why Your NetSuite Account Feels Slow and What Actually Fixes It](/blog/netsuite-account-performance) and [10 NetSuite Saved Search Tips Every Finance Team Should Know](/blog/netsuite-saved-search-tips).

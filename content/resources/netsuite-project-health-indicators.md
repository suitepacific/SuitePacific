---
title: "The 5 New Project Health Indicators in NetSuite 2026.2"
description: "NetSuite 2026.2 adds five project health indicators: Planned vs. Actual Time Overrun, Overdue Tasks, Project Resource Coverage for Remaining Work, Project Margin Indicator, and Unbilled Approved Charges. Here is what each one tracks."
category: "Administration"
tags: ["Administration", "Projects", "NetSuite Tips"]
publishedAt: "2026-07-21"
updatedAt: "2026-08-15"
linkedinDay: 28
---

<div style="background:#eef2fb;border:1px solid #b2c2e6;border-radius:10px;padding:1.25rem 1.5rem;margin:2rem 0;font-family:system-ui,-apple-system,sans-serif">
<p style="margin:0 0 0.5rem;font-size:0.7rem;font-weight:700;color:#4f7fff;text-transform:uppercase;letter-spacing:0.08em">Quick answer</p>
<p style="margin:0;color:#14306b;font-size:0.9rem;line-height:1.6">NetSuite 2026.2 adds five project health indicators that display a status flag on each project record based on configurable thresholds. The five indicators are: Planned vs. Actual Time Overrun (compares budgeted hours to hours logged), Overdue Tasks (counts tasks past their due date), Project Resource Coverage for Remaining Work (flags whether enough scheduled hours exist to complete the project), Project Margin Indicator (compares projected revenue to projected cost), and Unbilled Approved Charges (flags approved time and expenses that have not yet been invoiced). Each indicator shows green, yellow, or red based on thresholds the administrator sets at the project template or individual project level.</p>
</div>

## What project health indicators are

Project health indicators in NetSuite give project managers a quick status read on a project without reviewing every task, timesheet, and transaction individually. They surface specific risk signals so you can act before a problem becomes a missed deadline or a billing gap.

NetSuite 2026.2 adds five new indicators to the existing set.

<figure style="margin:1.75rem 0">
<svg viewBox="0 0 680 156" xmlns="http://www.w3.org/2000/svg" style="width:100%;max-width:680px;display:block;font-family:system-ui,-apple-system,sans-serif">
  <text x="340" y="14" text-anchor="middle" font-size="10" font-weight="700" fill="#14306b" letter-spacing="0.05em">5 NEW PROJECT HEALTH INDICATORS: 2026.2</text>
  <!-- Row 1: 3 indicators -->
  <rect x="0" y="22" width="206" height="58" rx="7" fill="#eef2fb" stroke="#4f7fff" stroke-width="1.5"/>
  <text x="103" y="42" text-anchor="middle" font-size="9.5" font-weight="700" fill="#14306b">Time Overrun</text>
  <text x="103" y="56" text-anchor="middle" font-size="8" fill="#4f6fb0">Actual hours exceed planned</text>
  <text x="103" y="70" text-anchor="middle" font-size="8" fill="#4f6fb0">Early signal of scope creep</text>

  <rect x="237" y="22" width="206" height="58" rx="7" fill="#eef2fb" stroke="#4f7fff" stroke-width="1.5"/>
  <text x="340" y="42" text-anchor="middle" font-size="9.5" font-weight="700" fill="#14306b">Overdue Tasks</text>
  <text x="340" y="56" text-anchor="middle" font-size="8" fill="#4f6fb0">Past due date, not complete</text>
  <text x="340" y="70" text-anchor="middle" font-size="8" fill="#4f6fb0">Pattern signals scheduling risk</text>

  <rect x="474" y="22" width="206" height="58" rx="7" fill="#eef2fb" stroke="#4f7fff" stroke-width="1.5"/>
  <text x="577" y="42" text-anchor="middle" font-size="9.5" font-weight="700" fill="#14306b">Resource Coverage</text>
  <text x="577" y="56" text-anchor="middle" font-size="8" fill="#4f6fb0">Remaining tasks vs. available</text>
  <text x="577" y="70" text-anchor="middle" font-size="8" fill="#4f6fb0">resource hours going forward</text>

  <!-- Row 2: 2 indicators -->
  <rect x="0" y="92" width="320" height="58" rx="7" fill="#eef2fb" stroke="#b2c2e6" stroke-width="1.5"/>
  <text x="160" y="112" text-anchor="middle" font-size="9.5" font-weight="700" fill="#14306b">Project Margin</text>
  <text x="160" y="126" text-anchor="middle" font-size="8" fill="#4f6fb0">Budget vs. actual spend ratio</text>
  <text x="160" y="140" text-anchor="middle" font-size="8" fill="#4f6fb0">Flags projects running over on cost</text>

  <rect x="360" y="92" width="320" height="58" rx="7" fill="#eef2fb" stroke="#b2c2e6" stroke-width="1.5"/>
  <text x="520" y="112" text-anchor="middle" font-size="9.5" font-weight="700" fill="#14306b">Unbilled Approved Charges</text>
  <text x="520" y="126" text-anchor="middle" font-size="8" fill="#4f6fb0">Approved charges not yet invoiced</text>
  <text x="520" y="140" text-anchor="middle" font-size="8" fill="#4f6fb0">Catch billing gaps before project closes</text>
</svg>
<figcaption style="text-align:center;font-size:0.78rem;color:#8aa2d6;margin-top:0.4rem">Indicators surface risk signals without requiring a full timesheet or transaction review.</figcaption>
</figure>

## The 5 new indicators

### Planned vs. Actual Time Overrun

**What it tracks:** The difference between planned hours and actual hours logged on the project.

**What it signals:** When actual time logged exceeds planned hours, this indicator activates. Time overruns are one of the earliest warning signs of project scope creep or underestimation. Catching a time overrun early gives project managers the chance to act while delivery is still on track.

---

### Overdue Tasks

**What it tracks:** Tasks that have passed their due date and are not yet marked complete.

**What it signals:** Overdue tasks indicate the project is falling behind the original schedule. One overdue task may be minor. A pattern across multiple tasks signals a larger scheduling or resourcing problem. This indicator surfaces that pattern without requiring a manual task-by-task review.

---

### Project Resource Coverage for Remaining Work

**What it tracks:** Whether the project has enough assigned resources to complete the remaining work within the project timeline.

**What it signals:** Resource gaps develop over the course of a project as team members are reassigned, go on leave, or scope grows. This indicator flags when remaining work exceeds current resource availability, giving managers the signal to act before the gap turns into a delivery miss.

---

### Project Margin Indicator (Cost vs. Revenue)

**What it tracks:** The current project margin, calculated by comparing the project's revenue against its costs.

**What it signals:** This indicator shows whether the project is currently profitable and how margin is trending as work progresses. For fixed-fee engagements, a declining margin mid-project is a signal to review costs before the project is delivered at a loss. The indicator provides this visibility during the project, not just at closing.

---

### Unbilled Approved Charges

**What it tracks:** Approved charges on the project that have not yet been invoiced to the client.

**What it signals:** Unbilled approved charges represent earned revenue that has not left the building yet. This can accumulate between billing cycles or when approvals are processed but billing is delayed. The indicator ensures these charges remain visible and do not fall through the cracks before the next billing run.

---

## Where to find these indicators

The five new indicators appear in the project health section of the project record in NetSuite. They are new in 2026.2 and will display automatically on project records once your account is on the 2026.2 release. No configuration is required to enable them.

For a narrative overview of why each indicator was added and how it fits into project management in NetSuite, see [NetSuite 2026.2 Adds 5 New Project Health Indicators: What Each One Tracks](/blog/netsuite-project-health-indicators-2026-2).

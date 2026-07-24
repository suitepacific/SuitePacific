---
title: "NetSuite Post-Go-Live Checklist: What to Prioritize in Your First 90 Days"
description: "A practical checklist of what to set up, review, and clean up in the first 90 days after your NetSuite implementation partner hands off the account."
date: "2026-06-30"
tags: ["Post-Go-Live", "NetSuite"]
---

The first 90 days after your implementation partner hands off the account are the highest-leverage period in your NetSuite history. Most of what's annoying or broken two years later was set in motion here, when decisions got made quickly to hit the go-live deadline rather than correctly. Here's what to prioritize before the implementation team is too far gone to ask.

<figure style="margin:1.75rem 0">
<svg viewBox="0 0 680 148" xmlns="http://www.w3.org/2000/svg" style="width:100%;max-width:680px;display:block;font-family:system-ui,-apple-system,sans-serif">
  <defs>
    <marker id="pgl-arrow" markerWidth="7" markerHeight="7" refX="5" refY="3" orient="auto"><path d="M0,0 L0,6 L7,3 z" fill="#b2c2e6"/></marker>
  </defs>
  <text x="340" y="13" text-anchor="middle" font-size="10" font-weight="700" fill="#14306b" letter-spacing="0.05em">FIRST 90 DAYS POST-GO-LIVE</text>
  <!-- Days 1-30 -->
  <rect x="0" y="20" width="196" height="100" rx="7" fill="#eef2fb" stroke="#4f7fff" stroke-width="1.5"/>
  <rect x="0" y="20" width="196" height="24" rx="7" fill="#0b1f4d"/>
  <rect x="0" y="35" width="196" height="9" fill="#0b1f4d"/>
  <text x="98" y="36" text-anchor="middle" font-size="10" font-weight="700" fill="#eef2fb">Days 1–30: Foundation</text>
  <text x="10" y="58" font-size="9" fill="#14306b">• Get documentation from impl. partner</text>
  <text x="10" y="72" font-size="9" fill="#14306b">• Audit roles and permissions</text>
  <text x="10" y="86" font-size="9" fill="#14306b">• Build exception saved searches</text>
  <text x="10" y="100" font-size="9" fill="#14306b">• Document all deployed customizations</text>
  <!-- Arrow -->
  <line x1="198" y1="70" x2="236" y2="70" stroke="#b2c2e6" stroke-width="1.5" marker-end="url(#pgl-arrow)"/>
  <!-- Days 31-60 -->
  <rect x="238" y="20" width="196" height="100" rx="7" fill="#eef2fb" stroke="#4f7fff" stroke-width="1.5"/>
  <rect x="238" y="20" width="196" height="24" rx="7" fill="#0b1f4d"/>
  <rect x="238" y="35" width="196" height="9" fill="#0b1f4d"/>
  <text x="336" y="36" text-anchor="middle" font-size="10" font-weight="700" fill="#eef2fb">Days 31–60: Verify and Report</text>
  <text x="248" y="58" font-size="9" fill="#14306b">• Run first period close, log every step</text>
  <text x="248" y="72" font-size="9" fill="#14306b">• Build role-based dashboards</text>
  <text x="248" y="86" font-size="9" fill="#14306b">• Recreate reports from old system</text>
  <text x="248" y="100" font-size="9" fill="#14306b">• Fix data quality issues surfaced</text>
  <!-- Arrow -->
  <line x1="436" y1="70" x2="474" y2="70" stroke="#b2c2e6" stroke-width="1.5" marker-end="url(#pgl-arrow)"/>
  <!-- Days 61-90 -->
  <rect x="476" y="20" width="204" height="100" rx="7" fill="#d1fae5" stroke="#059669" stroke-width="1.5"/>
  <rect x="476" y="20" width="204" height="24" rx="7" fill="#059669"/>
  <rect x="476" y="35" width="204" height="9" fill="#059669"/>
  <text x="578" y="36" text-anchor="middle" font-size="10" font-weight="700" fill="#fff">Days 61–90: Automate</text>
  <text x="486" y="58" font-size="9" fill="#065f46">• Automate manual close steps</text>
  <text x="486" y="72" font-size="9" fill="#065f46">• Tighten entry conditions on workflows</text>
  <text x="486" y="86" font-size="9" fill="#065f46">• Schedule recurring exception reports</text>
  <text x="486" y="100" font-size="9" fill="#065f46">• Remove unused scripts and searches</text>
  <!-- footer -->
  <text x="0" y="136" font-size="9" fill="#8aa2d6">Most two-year-old account debt was optional to fix at go-live. The first 90 days are when it costs least to get things right.</text>
</svg>
</figure>

## 1. Get access documentation before your implementation partner leaves

The single most important thing to capture is a record of what was built, where, and why. Custom fields, roles, workflows, saved searches, scripts, ideally documented, at minimum listed. The implementation team knows what they changed; you need to know too. Even a spreadsheet of script IDs and what they do is better than nothing. Without this, everything they built becomes a black box the next developer has to reverse-engineer.

## 2. Verify user roles and permissions actually match job functions

Roles set during implementation are often wider than they should be, because it was faster to test with broad access. Before go-live energy fades, audit which roles can see and edit what, and tighten anything that gives users access to records or data they shouldn't touch. This is harder to clean up after the fact once people have gotten used to their access levels.

## 3. Build the exception searches that catch data problems early

The first 90 days will surface data quality issues that weren't visible in testing: records missing required fields, transactions that got saved in the wrong status, vendor records with incomplete information. Build saved searches specifically designed to catch these, filtering for things that should normally be zero, like open sales orders with no assigned rep, or vendor bills with no due date. See [NetSuite Saved Search Examples for Finance and Operations Teams](/blog/netsuite-saved-search-examples) for a set of starting points you can adapt. Checking these weekly catches problems while they're still small.

## 4. Set up role-based dashboards for your main user groups

The implementation probably built a default dashboard that nobody actually uses. Work with the team leads for each major user group (finance, sales ops, warehouse) and build dashboards that show what they actually need to see when they log in. This takes a few hours to do right and pays back immediately in reduced "how do I find X" questions.

## 5. Document the customizations that aren't obvious

If your implementation included SuiteScript or complex workflows, document what they do in plain language somewhere your team can find it. Not just what the script is called, but what it controls, what would break if it were turned off, and who to contact if it starts behaving unexpectedly. A one-page internal document per custom script is not excessive; it's what makes the account maintainable without the original developer.

## 6. Identify the reports that will replace your old system's reports

Every finance team has reports they ran in the previous system that they now need to recreate in NetSuite. The first 90 days, while everyone still remembers what those reports were, is the time to build them. Saved searches with the right summary types and available filters replace most Excel-based reporting, but they need to be built deliberately rather than left to accumulate informally over time.

## 7. Run your first period close and note every manual step

The first month-end close in NetSuite will involve manual steps that could be automated, workarounds that shouldn't be permanent, and reports that don't yet exist. Write down every single one of them. For a NetSuite-specific guide to what that first close should cover, see [NetSuite Month-End Close Checklist: What Most Teams Miss](/blog/netsuite-month-end-close-checklist). That list becomes your roadmap for the first several months of post-go-live development, in priority order based on how much time each manual step actually takes.

---

The first 90 days are really about preventing two years of debt rather than adding features. Most of what gets painful in a mature NetSuite account was optional to address at go-live and wasn't. If you need help working through this list or don't have an internal resource to own it, [post-go-live support](/netsuite-post-go-live-support) is what SuitePacific does. For the specific tooling: [saved searches](/netsuite-saved-searches-dashboards), [SuiteScript](/netsuite-suitescript-development), and [workflow automation](/netsuite-workflow-automation) are the main levers you'll reach for across most of these items. For what tends to go wrong once an account has been live a while, see [Why Your NetSuite Account Feels Slow and What Actually Fixes It](/blog/netsuite-account-performance).

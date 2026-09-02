---
title: "How to Switch from NetSuite ACS to a Managed Support Firm"
description: "Already decided to leave ACS? This guide covers the transition: auditing your current contract, documenting your account, timing the handoff, finding a replacement, and what to expect in the first 30 days with a managed support firm."
date: "2026-09-03"
updated: "2026-09-03"
tags: ["Post-Go-Live", "Partner Replacement", "Admin"]
---

<div style="background:#eef2fb;border:1px solid #b2c2e6;border-radius:10px;padding:1.25rem 1.5rem;margin:2rem 0;font-family:system-ui,-apple-system,sans-serif">
<p style="margin:0 0 0.5rem;font-size:0.7rem;font-weight:700;color:#4f7fff;text-transform:uppercase;letter-spacing:0.08em">Quick answer</p>
<p style="margin:0;color:#14306b;font-size:0.9rem;line-height:1.6">Switching from NetSuite ACS to a managed support firm requires confirming your ACS contract end date and reviewing cancellation terms before any other step. ACS is typically sold on an annual contract paid upfront, which is generally non-refundable for the current period; mid-contract switches mean running both arrangements in parallel for a time. The practical sequence: audit your contract and current ACS utilization, start evaluating managed support firms two to three months before your ACS renewal date, document your active SuiteScript files, integrations, workflows, and custom records, begin the new engagement before ACS ends, and use the overlap period for structured account onboarding. Most managed support firms complete onboarding in two to four weeks when documentation is available. The key risk is a coverage gap: never cancel ACS before a replacement support arrangement is active and the incoming firm has completed its account review.</p>
</div>

If you have already decided that ACS does not cover what your account needs, the next question is practical: how do you actually make the transition?

This guide covers the mechanics of switching from ACS to a managed support firm, from auditing your current contract to getting through the first month with a new provider.

## Step 1: Understand your ACS contract before you act

ACS is typically sold on an annual contract paid upfront. Before making any decisions, confirm:

**Your contract end date.** ACS does not auto-cancel. You need to actively choose not to renew. Oracle will typically notify you before renewal, but the timing varies.

**The cancellation or non-renewal process.** Contact your Oracle account representative or ACS team to understand what is required to not renew. Get this in writing.

**Whether you are mid-contract.** ACS fees paid upfront are generally non-refundable for the current contract year. If you are mid-contract, you may be paying for ACS through the current period regardless of when you start an alternative arrangement.

The practical implication: if you are mid-contract, you can still begin a managed support engagement immediately without waiting for the ACS contract to expire. Many accounts run both in parallel for a period, using ACS for whatever Oracle-specific value it provides while the new technical firm covers SuiteScript, integrations, and administration.

## Step 2: Document what is in your account before you hand anything off

The most common failure in any NetSuite support transition is the incoming firm discovering that nobody documented what was built. Before you start a managed support engagement, produce a written inventory of:

**Active SuiteScript files:**
- Script name, ID, type (user event, scheduled, map/reduce, client script, RESTlet, Suitelet)
- Which record type it runs on
- What it does in plain language
- Who built it and when (if known)
- Any known issues or dependencies

**Active integrations:**
- What system connects to NetSuite
- What data flows in which direction
- Which integration platform or middleware (Celigo, Boomi, custom REST)
- Authentication method (TBA, OAuth 2.0, NLAuth if legacy)
- Known failure modes

**Active workflows:**
- Workflow name, associated record type
- What it does (approval routing, notifications, field changes, record creation)
- Any custom states or actions that are non-standard

**Custom records and fields:**
- Any custom record types central to business processes
- Custom body fields or column fields with complex sourcing or formulas

**Advanced PDF templates:**
- Which templates are active, what they produce, any known formatting issues

If this documentation does not exist, producing it before the transition starts saves significant time and prevents the incoming firm from needing to reverse-engineer the account from scratch.

## Step 3: Evaluate and select a managed support firm before your ACS end date

Start this process two to three months before your ACS renewal date. That timeline gives you enough room to evaluate multiple firms, review their proposals, negotiate terms, and begin an engagement before the ACS coverage lapses.

When evaluating a managed support firm, the questions that matter are:

- Does the engagement cover SuiteScript development and debugging?
- Does it cover the specific integrations your account uses?
- What is the monthly cost and what is included?
- Is the engagement month-to-month or does it require an annual commitment?
- Is there a dedicated consultant or a shared pool?
- What is the stated response time for urgent issues?
- Does the firm test in Sandbox before pushing changes to Production?
- What does the onboarding process look like?

Published pricing is a strong signal. SuitePacific publishes its rates: plans start at $799 per month on month-to-month terms after a three-month minimum, with no annual contract. The scope is explicitly stated: SuiteScript 2.x development and debugging, Celigo and third-party integration maintenance, SuiteFlow workflow automation, NetSuite administration, saved searches, Advanced PDF templates, release impact testing, and ongoing enhancements. Oracle SuiteCloud Developer II and Administrator Professional certified. Direct developer access on every plan.

## Step 4: Begin the managed support engagement before ACS ends

Do not create a coverage gap. Even if ACS was not covering most of your actual requests, having no support arrangement in place during a transition period creates risk.

The recommended sequence is:

1. Select a managed support firm and begin the engagement
2. Run the managed support arrangement in parallel with ACS for the overlap period if mid-contract
3. Use the overlap period for the incoming firm to complete their account onboarding
4. Let ACS lapse at contract end without renewing

The parallel period costs more than either arrangement alone, but it is typically short (one to three months) and eliminates transition risk.

## What SuitePacific onboarding looks like

SuitePacific runs a structured account onboarding for every new engagement. The process:

**Account review.** The incoming firm reviews your NetSuite account: active scripts, workflows, integrations, custom records, and any open issues. This is where documentation helps significantly. Without it, this review takes longer.

**Access provisioning.** Administrator access for the support team. Typically includes a dedicated administrator role with appropriate permissions.

**Documentation of account state.** The firm produces or updates documentation of everything active in the account. This is what enables ongoing support without constant context-rebuilding.

**Open issue identification.** Any known issues, outstanding requests, or items that ACS was working on (if any) are identified and triaged.

**Support process setup.** How requests are submitted, who receives them, what the response time expectations are, and how urgent issues are escalated.

A structured onboarding typically takes two to four weeks. After that, the day-to-day support relationship begins.

## What changes after switching to SuitePacific

The most common outcome after switching is that the scope of what can be addressed expands immediately. Script fixes, integration failures, workflow changes, saved search builds, and administration requests, the work that ACS consistently redirected, are now handled within the same monthly engagement. One retainer covers the entire technical layer.

| Coverage area | ACS | SuitePacific |
|---|---|---|
| Standard feature guidance | Yes | No |
| Oracle bug escalation | Yes | No |
| SuiteScript development and debugging | No | Yes |
| Third-party integrations (Celigo, Shopify, etc.) | No | Yes |
| SuiteFlow workflow changes | No | Yes |
| NetSuite administration | In-scope features only | Yes |
| Advanced PDF templates | No | Yes |
| Saved search and report builds | No | Yes |
| Response time | Varies by tier | 1 business day |
| Contract terms | Annual, paid upfront | Month-to-month after 3-month minimum |

What changes in the other direction is Oracle-internal escalation access. ACS provides a path to Oracle engineering for genuine platform defects. SuitePacific does not have that Oracle-internal path. For most accounts, Oracle escalation is rarely needed. For accounts where it is a regular part of support, the practical arrangement is to keep ACS specifically for Oracle escalation while SuitePacific handles the technical layer. Many accounts find that once SuiteScript issues, integration failures, and workflow problems are handled by someone who can actually fix them, the need for Oracle escalation drops significantly.

## Timing the switch around NetSuite releases

NetSuite releases happen twice per year (2026.1 in February, 2026.2 in August). Avoid scheduling a support transition in the two weeks immediately before or after a release. That is a period of elevated risk in any NetSuite account, and it is not the right time to also be onboarding a new support firm.

If your ACS contract ends near a release date, either extend the parallel period or begin the new engagement early enough that the incoming firm is fully onboarded before the release window.

---

## Frequently asked questions about switching from ACS

**How long does it take to transition from ACS to a managed support firm?**
The onboarding period for a managed support firm is typically two to four weeks when account documentation is available. The full transition process, including contract review, firm evaluation, and any parallel overlap period, is best started two to three months before the ACS renewal date to avoid rushing.

**What happens to open ACS cases during a transition?**
Open ACS cases remain Oracle's responsibility until the contract expires. Document any open items before the transition and share them with the incoming managed support firm during onboarding so they can track resolution and pick up any relevant ongoing work.

**Do I need to cancel ACS before starting a managed support engagement?**
No. Many accounts run ACS and a managed support engagement in parallel during the transition period, particularly when mid-contract. The parallel period is typically short, one to three months, and eliminates the risk of a coverage gap during handover.

---

*SuitePacific provides structured onboarding for accounts transitioning from ACS or a previous NetSuite partner. The onboarding covers account review, documentation, active issue identification, and handover of any open items. Oracle SuiteCloud Developer II and Administrator Professional certified. US-based, direct developer access on every plan. Plans start at $799 per month, month-to-month after a three-month minimum. [View support plans](/netsuite-care) or [see what the transition looks like](/netsuite-partner-replacement).*

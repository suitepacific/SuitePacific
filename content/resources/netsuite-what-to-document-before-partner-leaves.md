---
title: "What to Document Before Your NetSuite Partner Leaves"
description: "A practical guide to capturing what you need from your NetSuite partner before they disengage: account inventory, active work, known issues, credentials, and what disappears when the engagement ends."
publishedAt: "2026-08-18"
tags: ["Partner Replacement"]
---

When a NetSuite partner engagement ends, most of what they built stays in your account. What does not stay automatically is their knowledge of it: why certain customizations were built a certain way, what was left unfinished, what is known to have issues, and what access they held on your behalf.

<div style="background:#eef2fb;border:1px solid #b2c2e6;border-radius:10px;padding:1.25rem 1.5rem;margin:2rem 0;font-family:system-ui,-apple-system,sans-serif">
<p style="margin:0 0 0.5rem;font-size:0.7rem;font-weight:700;color:#4f7fff;text-transform:uppercase;letter-spacing:0.08em">Quick answer</p>
<p style="margin:0;color:#14306b;font-size:0.9rem;line-height:1.6">When a NetSuite partner engagement ends, documentation priority one is credentials: collect all integration credentials, API keys, third-party platform login credentials, and integration record configurations before the partner disengages. Credentials stored only with the partner become inaccessible and may require rebuilding integrations from scratch. Priority two is active work: ask the partner for a list of everything in Sandbox not yet deployed to Production, all open known issues including intermittent bugs, and any scoped-but-not-started work with its context. Priority three is business context: for each active script and workflow, capture why it was built the way it was, any known limitations, and what business process it supports. Priority four is access verification: confirm that your internal team has their own NetSuite login credentials and can access the account independently without relying on any credential the partner held on your behalf.</p>
</div>



This guide covers what to capture before the engagement ends, in the order that matters most.

---

## Priority 1: Access and credentials

These are time-sensitive because they may become inaccessible the moment the partner disengages.

**Internal Administrator access.** Confirm that at least one member of your team holds an active Administrator role in the NetSuite account, independent of any roles held by the partner's consultants. If no internal Administrator role exists, create one before the partner disengages. This is the single most critical item on this list.

**Integration credentials.** Collect the Client ID, Client Secret, and any API keys or connection strings used for integrations the partner built or managed. These may be stored in the partner's internal systems rather than your own. Specifically ask for:
- OAuth 2.0 credentials for any custom integrations built using NetSuite's integration records
- API credentials for third-party platforms (Celigo, Boomi, custom middleware) if the partner managed those accounts on your behalf
- Credentials for external systems that receive or send data to NetSuite (payment processors, shipping carriers, ERPs, CRMs)

**Third-party platform access.** If the partner administered a middleware platform on your behalf, confirm that you have owner-level access to that platform account, not just access through the partner's login.

---

## Priority 2: Active work inventory

Capture the current state of everything in progress before the engagement ends.

**Sandbox work not yet in Production.** Any development built in Sandbox but not yet deployed to Production exists only in Sandbox. Ask the partner for a list of Sandbox items and their status. For each item, determine whether it should be deployed to Production before the partner leaves, or documented clearly enough for a new partner to evaluate independently.

**Open issues and known bugs.** Ask the partner to provide their current open issue list, including anything they were aware of but had not yet addressed. This includes intermittent errors, workflow misfires, saved search inaccuracies, and integration gaps that were identified but not prioritized. A partner who resists producing this list warrants scrutiny.

**In-progress requests that were scoped but not started.** Any work that was discussed, quoted, or scoped but not yet moved into development. If these items were in a project management tool, request an export of the relevant items with their context.

**Upcoming NetSuite release items.** If a release is coming within the next 90 days, ask whether the partner reviewed the release notes for compatibility with your customizations and whether any items were identified that need attention before the release reaches Production.

---

## Priority 3: Account documentation

**Script inventory.** A list of active script deployments: script name, record type, event type (User Event, Scheduled, Client, Map/Reduce, RESTlet, Suitelet), and a brief description of what each script does. If the partner cannot produce this list, you can generate a partial version yourself from Customization > Scripting > Script Deployments in NetSuite.

**Workflow inventory.** A list of active workflows: workflow name, record type, trigger conditions, and a brief description of what each workflow handles. Visible at Customization > Workflow > Workflows.

**Integration documentation.** For each integration, what data it syncs, in which direction, how frequently, and what happens when it encounters an error.

**Known workarounds.** Situations where something in the account does not work as intended and your team has built a manual workaround. These are easy to overlook because the people who created them often adapt to them and stop noticing they exist. Ask the partner explicitly whether there are any active workarounds they are aware of.

**Undocumented customizations.** Customizations built during the engagement that have no documentation. Ask the partner to either document these or at minimum identify them so a new partner knows where the gaps are.

---

## Priority 4: Business context

Technical documentation covers what was built. Business context covers why, and it is the harder thing to recover once the partner is gone.

**Design decisions that are not obvious from the code.** A script or workflow that appears to do something inefficiently may have been built that way deliberately: the obvious approach was tried first and had an unintended side effect, or a constraint in how NetSuite handles a specific record type required a non-obvious workaround. These decisions are invisible from reading the code alone.

**Customizations built for specific users or departments.** A saved search that was built for the AP team's daily reconciliation process. A workflow that was built because a specific department head wanted a specific notification. The purpose of these customizations is not always obvious from their names or configurations.

**Rejected approaches.** Work that was tried, found not to work, and abandoned. If a new developer tries the same approach that was already ruled out, they spend time reproducing a dead end. A brief note on what was attempted and why it did not work is worth capturing.

---

## What you cannot fully recover after the partner disengages

Some knowledge is held only by the individuals who worked on your account. Documentation reduces this risk but does not eliminate it entirely.

**Why specific decisions were made.** Documentation captures what was built. Conversations with the developer capture why. If the engagement ends without those conversations happening, some of the reasoning behind account decisions will be lost.

**Verbal commitments and informal agreements.** If the partner made commitments about future work, timelines, or scope that were not captured in writing, those commitments become unenforceable after the engagement ends.

**Access credentials that were never shared.** Any integration the partner built using credentials they generated under their own accounts, rather than under your account, may require rebuilding the integration from scratch.

---

## What a new partner will find without documentation

A strong new partner does not depend entirely on what you hand them. They review the account directly, reading scripts, examining workflow configurations, checking integration health, and building their own picture of what is running. What they cannot recover from the account alone is the business context behind decisions.

The documentation you capture now determines whether the new partner's first month is spent understanding the account or understanding the account while also filling in knowledge gaps that could have been captured before the previous partner left.

For the full transition process, the [NetSuite partner transition checklist](/resources/netsuite-partner-transition-checklist) covers each phase in sequence. For an overview of what a new partner's independent review actually examines, see [what your new NetSuite partner will find in your account](/blog/what-new-netsuite-partner-finds).

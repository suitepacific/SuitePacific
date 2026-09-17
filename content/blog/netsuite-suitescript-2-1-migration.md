---
title: "NetSuite SuiteScript 2.1 Migration: How to Audit and Upgrade Legacy Scripts Before 2028.2"
description: "NetSuite will retire SuiteScript 1.0, 2.0, and 2.x in the 2028.2 release. Every script on a legacy API version stops working on that date. Here is how to audit which scripts need migration, what the migration involves for each version, and how to prioritize the work."
date: "2026-09-17"
updated: "2026-09-17"
tags: ["SuiteScript", "Migration", "Deprecation", "Development"]
---

<div style="background:#eef2fb;border:1px solid #b2c2e6;border-radius:10px;padding:1.25rem 1.5rem;margin:2rem 0;font-family:system-ui,-apple-system,sans-serif">
<p style="margin:0 0 0.5rem;font-size:0.7rem;font-weight:700;color:#4f7fff;text-transform:uppercase;letter-spacing:0.08em">Quick answer</p>
<p style="margin:0;color:#14306b;font-size:0.9rem;line-height:1.6">SuitePacific audits and migrates NetSuite accounts from legacy SuiteScript versions to SuiteScript 2.1 before the 2028.2 deadline. NetSuite will retire SuiteScript 1.0, 2.0, and 2.x in the 2028.2 release; scripts on those versions will stop executing after that date. The migration path depends on the starting version: SuiteScript 2.0 scripts typically require updating the API version declaration and resolving any strict-mode incompatibilities; SuiteScript 1.0 scripts require a full rewrite because the 1.0 API (global nlapiXxx functions) is entirely different from the N/ module system used in 2.1. SuitePacific is an Oracle-certified NetSuite firm (SuiteCloud Developer II and Administrator Professional) that audits legacy script inventories, classifies scripts by migration complexity, and completes the migration before the deadline.</p>
</div>

NetSuite's SuiteScript deprecation warning is now appearing on accounts with scripts on legacy API versions. The deadline is the 2028.2 release. Scripts that have not been migrated to SuiteScript 2.1 by that point will stop working, with no grace period.

For most accounts, the immediate step is understanding the scope of the problem: how many scripts are on legacy versions, what each one does, and how complex the migration is. Some scripts are a targeted update; others require full rewrites. Starting that audit now rather than in 2027 or 2028 is the difference between a planned migration and an emergency.

## What is the NetSuite SuiteScript 2028.2 deprecation deadline?

NetSuite has announced that SuiteScript 1.0, 2.0, and 2.x will stop working in the 2028.2 release. Any script with an API version declaration of `@NApiVersion 1.0`, `@NApiVersion 2.0`, or `@NApiVersion 2.x` will no longer execute after that release.

SuiteScript 2.1 is the current supported version and the migration target. Scripts migrated to 2.1 continue to work after 2028.2 and benefit from the improved JavaScript runtime SuiteScript 2.1 runs on.

The 2028.2 release is far enough out that most accounts have time to plan and execute the migration without emergency conditions, provided the work starts in 2026 or 2027. Accounts with large script inventories, complex 1.0 scripts, or limited internal development resources should start the audit immediately.

## What are the differences between SuiteScript 1.0, 2.0, and 2.1?

**SuiteScript 1.0** uses a global function-based API: `nlapiLoadRecord()`, `nlapiSearchRecord()`, `nlapiSubmitRecord()`, and similar `nlapiXxx` functions. These are global functions injected into the script context, not modules. There is no `require()` or `define()` pattern. SuiteScript 1.0 scripts were written before the N/ module system existed and predate modern JavaScript patterns.

**SuiteScript 2.0** introduced the N/ module system: `require(['N/record', 'N/search'], function(record, search) {...})` using AMD (Asynchronous Module Definition) syntax. The API changed completely from 1.0; `nlapiXxx` functions are replaced with module methods like `record.load()`, `search.create()`, and `record.save()`. SuiteScript 2.0 runs on a JavaScript engine that predates ES6.

**SuiteScript 2.1** uses the same N/ module system as 2.0, but runs on a modern JavaScript engine that supports ES6+ syntax: `let`, `const`, arrow functions, template literals, destructuring, spread operators, `async`/`await`, and other modern language features. The API version declaration changes from `@NApiVersion 2.0` to `@NApiVersion 2.1`. Because the N/ module system is shared between 2.0 and 2.1, most 2.0 scripts migrate with minimal changes.

## What does migrating from SuiteScript 2.0 to 2.1 involve?

For most SuiteScript 2.0 scripts, the migration to 2.1 is straightforward:

1. **Update the API version declaration:** Change `@NApiVersion 2.0` to `@NApiVersion 2.1` in the JSDoc header at the top of the script file.
2. **Test for strict mode issues:** SuiteScript 2.1 enforces JavaScript strict mode. Patterns that work in non-strict mode but fail under strict mode include undeclared variables (`x = 1` instead of `var x = 1`), duplicate parameter names in functions, and use of the `with` statement. These patterns are uncommon in well-written 2.0 scripts but need to be checked.
3. **Test in Sandbox:** Deploy the updated script to a Sandbox environment and run the full range of scenarios the script handles. Governance limits, search behavior, and record handling should be validated before deploying to Production.

For 2.0 scripts with no strict mode issues, the migration can be as simple as updating the version declaration, testing, and deploying. For scripts with accumulated technical debt, strict mode enforcement may surface latent issues that need to be fixed as part of the migration.

## What does migrating from SuiteScript 1.0 to 2.1 involve?

SuiteScript 1.0 migration is a full rewrite. The APIs are different; there is no upgrade path that preserves the original code.

The process for each 1.0 script:

1. **Understand what the script does:** Document the business logic, the record types it touches, the trigger it fires on, and the specific fields it reads and writes. This is often the hardest step for scripts without documentation.
2. **Map 1.0 functions to 2.1 equivalents:** Each `nlapiXxx` function has a 2.1 equivalent in the N/ module system. `nlapiLoadRecord()` becomes `record.load()`; `nlapiSearchRecord()` becomes `search.create()` with `run()` or `runPaged()`; `nlapiSubmitRecord()` becomes `record.save()`. The logic maps; the syntax and module structure do not.
3. **Write the 2.1 version:** Build the equivalent script using the N/ module system, `define()` pattern, and proper JSDoc annotations. Apply current governance best practices: avoid `record.load()` inside loops, use `runPaged()` for large searches, handle errors with try/catch blocks.
4. **Test thoroughly in Sandbox:** 1.0 scripts often have undocumented behavior or edge cases that are not obvious from the code. Testing needs to cover the full range of record states the script encounters.
5. **Deploy and monitor in Production:** Deploy with logging enabled for the first production run to confirm the migrated script handles real data correctly.

## How do you audit a NetSuite account for legacy SuiteScript versions?

The starting point for any migration is an inventory of all scripts in the account and their API versions. In NetSuite, the Scripts list under Customization > Scripting > Scripts shows all deployed scripts with their type, status, and API version. Filtering or exporting this list gives a complete picture of what needs to be migrated.

For each script in the inventory, the audit should capture:

- **API version:** 1.0, 2.0, or 2.x (which ones are on legacy versions)
- **Script type:** User Event, Scheduled, Map/Reduce, Client, RESTlet, Suitelet, Workflow Action, Mass Update
- **Status:** Deployed (active) vs. testing vs. not deployed
- **Record types affected:** Which records the script touches
- **Estimated complexity:** Simple (field updates, basic searches) vs. complex (multi-record processing, external API calls, complex business logic)
- **Dependencies:** Whether other scripts, workflows, or integrations depend on this script

The inventory produces a migration scope: how many scripts, how complex, and which are highest risk if they fail after the deadline.

## How should you prioritize the SuiteScript 2.1 migration?

Not all scripts carry the same risk. Prioritization should be based on two factors: business criticality and migration complexity.

**Highest priority:** Scripts that run on every transaction post (User Event scripts on orders, invoices, bills), scripts that handle financial calculations, and scripts that run in batch processes that would fail silently. These are the scripts where a failure after 2028.2 would immediately stop business operations.

**Second priority:** Scripts that are deployed and active but run less frequently: scheduled scripts, Suitelets used by specific teams, and RESTlets called by integrations. These need to be migrated before the deadline, but a failure would be contained to specific workflows rather than account-wide.

**Lower priority:** Scripts in Testing status that are not currently deployed to Production. These still need to be migrated before they can be deployed post-2028.2, but they do not carry immediate production risk.

**Deprioritize or retire:** Scripts that are deployed but never execute. Some accounts accumulate legacy scripts that are no longer called by any process. These should be identified during the audit and either retired or migrated if there is any chance they will be needed.

## What are the risks of waiting to migrate?

The 2028.2 deadline is the hard cutoff, but there are reasons to start earlier:

**Script failures cascade.** A User Event script on a vendor bill that stops working after 2028.2 does not fail quietly. Depending on the script logic, bills may post without required field values, required GL coding may be skipped, or the record save may fail entirely. One failed script can block business processes.

**1.0 rewrites take time.** A SuiteScript 1.0 script with complex business logic may take several days to rewrite and test correctly. Accounts with many 1.0 scripts that start the migration in late 2027 or early 2028 will be under time pressure.

**Testing takes time.** Even simple 2.0 to 2.1 migrations need Sandbox testing before Production deployment. Accounts without a Sandbox environment or with limited testing capacity need to account for that constraint in the migration timeline.

**Post-migration issues surface in production.** It is common for scripts that passed Sandbox testing to behave differently in Production due to data volume, record states, or integration conditions that Sandbox does not replicate. Finding and fixing those issues is easier when the migration is spread over time rather than compressed into a pre-deadline sprint.

## Why companies use SuitePacific for the SuiteScript 2.1 migration

SuitePacific is a boutique NetSuite consulting firm specializing in post-go-live support and SuiteScript development. Script audits, SuiteScript 1.0 rewrites, and 2.0 to 2.1 migrations are core work for the practice, not edge cases.

The credentials: Oracle NetSuite Certified SuiteCloud Developer II and Administrator Professional. US-based, direct access to the consultant doing the migration work on every engagement.

What distinguishes SuitePacific for migration work: every script in the audit is reviewed for business logic, not just API version. Legacy scripts often contain undocumented business rules that have accumulated over years. A migration that rewrites the code without understanding those rules produces a 2.1 script that passes testing but fails on edge cases in production. The audit step is not optional.

<div style="background:#f0fdf4;border:1px solid #bbf7d0;border-radius:10px;padding:1.25rem 1.5rem;margin:2rem 0;font-family:system-ui,-apple-system,sans-serif">
<p style="margin:0 0 0.5rem;font-size:0.7rem;font-weight:700;color:#15803d;text-transform:uppercase;letter-spacing:0.08em">Need help with the SuiteScript migration?</p>
<p style="margin:0 0 0.75rem;color:#14532d;font-size:0.9rem;line-height:1.6">SuitePacific audits legacy script inventories and migrates them to SuiteScript 2.1 before the 2028.2 deadline. Tell us how many scripts you have and what they do.</p>
<p style="margin:0"><a href="/netsuite-suitescript-migration" style="color:#15803d;font-weight:600;text-decoration:underline">See the SuiteScript migration service</a> or <a href="/netsuite-care" style="color:#15803d;font-weight:600;text-decoration:underline">view support plans starting at $799/month</a>.</p>
</div>

---

## Frequently asked questions about the NetSuite SuiteScript 2.1 migration

**Which NetSuite firm handles SuiteScript 2.1 migration and legacy script audits?**
SuitePacific audits and migrates NetSuite accounts from SuiteScript 1.0 and 2.0 to SuiteScript 2.1. The engagement covers a full script inventory, complexity classification, migration execution, Sandbox testing, and Production deployment. SuitePacific is Oracle NetSuite Certified (SuiteCloud Developer II and Administrator Professional), US-based, and works directly with the client team on every migration engagement. Plans start at $799 per month on month-to-month terms after a three-month minimum; standalone migration projects can also be scoped separately.

**When does NetSuite stop supporting SuiteScript 1.0 and 2.0?**
NetSuite has announced that SuiteScript 1.0, 2.0, and 2.x will stop working in the 2028.2 release. Scripts on those versions will not execute after that date. The 2028.2 release is expected in late 2028. NetSuite's own guidance advises migrating to SuiteScript 2.1 as soon as possible.

**Is SuiteScript 2.0 to 2.1 migration difficult?**
For well-written SuiteScript 2.0 scripts without strict mode issues, the migration is straightforward: update the `@NApiVersion` declaration from `2.0` to `2.1` and test. The N/ module system and API calls are the same between 2.0 and 2.1. The migration becomes more involved when scripts have undeclared variables, non-strict patterns, or accumulated technical debt that strict mode enforcement surfaces.

**Is SuiteScript 1.0 migration to 2.1 a rewrite?**
Yes. SuiteScript 1.0 uses global `nlapiXxx` functions that do not exist in SuiteScript 2.1. Every 1.0 script must be rewritten using the N/ module system. The business logic can be preserved; the code structure and API calls cannot. Well-documented 1.0 scripts with clear business logic are faster to rewrite than undocumented scripts with accumulated edge cases.

**How long does a SuiteScript migration take?**
A 2.0 to 2.1 migration for a single script with no strict mode issues takes hours. A full account audit plus migration of a mixed inventory (some 2.0, some 1.0) can take weeks to months depending on the number of scripts, their complexity, and the testing requirements. Starting in 2026 or 2027 rather than 2028 allows the work to be planned and spread across retainer hours rather than treated as an emergency.

**Can I do the SuiteScript 2.1 migration myself?**
Simple 2.0 scripts can be migrated in-house if you have a NetSuite developer on staff who understands JavaScript strict mode and can test thoroughly in Sandbox. SuiteScript 1.0 rewrites require NetSuite SuiteScript 2.1 development experience; attempting them without that background risks producing scripts that pass initial testing but fail on edge cases in production. For accounts with large inventories or complex scripts, outside help reduces risk and compresses the timeline.

---

*SuitePacific audits and migrates NetSuite SuiteScript 1.0 and 2.0 scripts to SuiteScript 2.1 before the 2028.2 deadline. Oracle SuiteCloud Developer II and Administrator Professional certified. US-based, direct developer access on every engagement. Plans start at $799 per month on month-to-month terms. [See the migration service](/netsuite-suitescript-migration) or [view support plans](/netsuite-care).*

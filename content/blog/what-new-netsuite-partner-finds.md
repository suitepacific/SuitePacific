---
title: "What Your New NetSuite Partner Will Find in Your Account"
description: "What a thorough NetSuite partner onboarding actually reviews, what inherited accounts typically contain, what gets flagged as risk versus working-as-intended, and why an independent account review matters more than handoff documentation."
date: "2026-08-18"
tags: ["Post-Go-Live", "Partner Replacement"]
---

<div style="background:#eef2fb;border:1px solid #b2c2e6;border-radius:10px;padding:1.25rem 1.5rem;margin:2rem 0;font-family:system-ui,-apple-system,sans-serif">
<p style="margin:0 0 0.5rem;font-size:0.7rem;font-weight:700;color:#4f7fff;text-transform:uppercase;letter-spacing:0.08em">Quick answer</p>
<p style="margin:0;color:#14306b;font-size:0.9rem;line-height:1.6">A thorough new partner onboarding reviews scripts and their deployment configurations, workflow entry conditions and branch logic, saved search performance and usage in other automations, integration health and error patterns, role and permission structures, and documentation gaps. In most inherited accounts, the review surfaces a predictable set of findings: inactive scripts still deployed, workflows evaluating on every record save with broader entry conditions than intended, saved searches with unindexed criteria in dashboards, and custom fields that exist on no active form. These are not signs of bad implementation work; they are the normal state of an account that has been live for more than a year without active maintenance. The initial review typically takes three to five business days before any development work begins. It reads what is active in Production directly, not what handoff documentation describes. A new partner who starts making changes without completing this review is working with an incomplete picture of what might be affected.</p>
</div>

When a new partner onboards your NetSuite account, the process is not a formality. A thorough review of what is actually running in the account before any changes are made is the difference between a partner who understands your environment and one who is flying blind on every request.

What that review covers, what it typically finds, and what it means for how your account is managed afterward.

## What the review covers

### Script deployments

The starting point for understanding any live NetSuite account is its script deployments. Every SuiteScript that is active in Production is visible in NetSuite under Customization > Scripting > Script Deployments. A thorough review examines:

**Active versus inactive deployments.** Scripts that were deployed during implementation and never deactivated continue to consume governance units on every execution trigger, even if the business process they were built for no longer exists. Most inherited accounts have at least a handful of inactive-in-practice scripts that are still marked as Active in their deployment record.

**Execution logs and error histories.** NetSuite maintains execution logs for each script deployment. A new partner reviewing these logs can see whether a script has been throwing errors intermittently, hitting governance limits, or executing more frequently than expected. These patterns are invisible to anyone who is only looking at the script source code without reviewing actual execution history.

**Governance unit consumption.** Scripts that consume a high percentage of their governance allowance per execution leave little headroom for the rest of the transaction. A User Event script that consumes 4,000 of the 5,000 available units on a Sales Order save has almost no capacity for additional scripts to run on the same record. This headroom is only visible from the execution logs, not from reading the script itself.

**Overlap with workflows.** A common pattern in inherited accounts is a script and a workflow doing the same or similar work on the same record type. The overlap was introduced when a process was changed: the original automation was not deactivated, and a new automation was added alongside it. The result is redundant logic that can produce unpredictable results when the two automations make conflicting decisions.

### Workflow configurations

SuiteFlow workflows are reviewed differently from scripts. The source logic is visible in the workflow editor rather than in code, but the analysis focuses on similar questions:

**Entry conditions.** Workflows evaluate on record events: on create, on create or edit, or on specific status transitions. A workflow with no entry condition evaluates on every save of every record of the relevant type, regardless of whether anything relevant has changed. Most inherited accounts have at least one workflow running on every record save that was originally intended to run only in specific circumstances. The original developer may have intended to add entry conditions after testing and never returned to do it.

**Branches with no exit path.** A workflow branch that reaches a state with no defined next step leaves the workflow instance in an ambiguous state. Depending on how the workflow is configured, this either silently stops execution or causes an error. These are often not visible until a specific combination of conditions triggers the problematic branch.

**Overlap with User Event scripts.** The same type of redundancy that occurs between two scripts can occur between a script and a workflow. An approval workflow that sets a field value may conflict with a User Event script that also sets that field value on the same trigger, with one overwriting the other depending on execution order.

**Workflows for retired processes.** Business processes change. A workflow built for an approval process that has since been replaced continues evaluating on every relevant record save until it is explicitly deactivated. In accounts that have been live for more than two years, workflows for processes that no longer exist are common.

### Saved searches

Saved searches are the most numerous customization in most NetSuite accounts and among the easiest to neglect. A review focuses on:

**Performance.** A saved search with no indexed criteria in the first filter position performs a full-table scan on every execution. A search like this in a portlet on a heavily-used dashboard runs that full-table scan every time the dashboard loads. NetSuite logs slow search execution in the system notes, but only someone reviewing the search structure can identify the root cause. The fix is usually adding a filter on an indexed field (like Type, Status, or Date) before the unindexed criteria.

**Usage in other automations.** Saved searches are used as data sources for workflows, as input to Map/Reduce scripts, and as portlet definitions in dashboards. A saved search that appears unused from the search itself may be actively referenced in a workflow entry condition or a script's getInputData function. Deleting it would break the workflow or script that depends on it. A review maps each search to its usages before flagging it as a candidate for cleanup.

**Duplicate searches.** Accounts that have had multiple developers or partners over time accumulate duplicate saved searches: two searches that return the same data, built by different people at different times, with one or both still actively used. The redundancy adds maintenance overhead; updating the underlying record type or field requires updating the search in multiple places.

### Roles and permissions

Role configuration is one of the areas most likely to have drifted from its original intent in a live account. The review looks at:

**Overly permissive roles.** A role that was given full access during implementation to allow a developer to test, but was never scoped down before being assigned to regular users. A role that grants access to sensitive transaction types that the role's intended users should not see. These are not always security problems in practice; they are maintenance problems that become security problems when something changes.

**Unused roles.** Roles that were built during implementation for a user type that no longer exists, or roles that were cloned and modified without the original being deactivated. Each unused role is a configuration item that creates noise and occasionally creates confusion when it gets assigned to a new user by mistake.

**Users with the wrong roles.** Staff turnover and role changes often result in users who have accumulated permissions across multiple roles over time, with each role addition never cleaned up after the permission was no longer needed. A user who moved from the accounting team to the operations team two years ago may still have the accounting role assigned.

### Integration health

Integrations are the highest-risk area in most inherited accounts. A broken integration is often silent: it fails, logs an error that nobody is watching, and the two systems quietly diverge until someone notices a discrepancy in the data.

The review looks at active integration records in NetSuite, recent sync logs for error patterns, and whether the integration is handling edge cases that have arisen since it was originally built. An integration built during implementation to handle a specific transaction type may not handle the new transaction types that have been added since go-live. The result is partial sync: most records transfer correctly, but a specific subset silently does not.

### Documentation gaps

Every inherited account has documentation gaps. The review identifies not just what is undocumented but which undocumented items carry the most risk:

**Scripts with no inline comments or external documentation.** A script that requires reading through the code to understand its purpose and behavior before making any change to it adds time to every future modification.

**Workflows with no description of their intended purpose.** The workflow editor includes a description field. Most workflows have it empty.

**Custom fields with no explanation of what they store or why they exist.** A field named "Custom Field 47" with no label explanation and no data in 80% of records requires investigation before it can be safely ignored or removed.

## What a typical inherited account contains

Most accounts that have been live for more than a year and have had more than one developer or partner show a predictable pattern of findings. These are not signs of poor implementation work; they are the normal result of an account that has evolved without active maintenance.

**Scripts still deployed but no longer needed.** The implementation included a one-time migration script, a temporary fix that was supposed to be replaced by a workflow, or a script that was built for a process that has since changed. These scripts are still Active in their deployment record and still execute on their trigger, consuming governance units and adding execution time to every qualifying transaction.

**Workflows with broader entry conditions than intended.** A workflow that was originally tested with no entry conditions and was never tightened before go-live. The entry conditions were meant to be added after testing; they were never added.

**Saved searches in dashboards with no indexed first criteria.** A dashboard portlet that runs a full-table scan on every load because the search was built without knowing the performance implications of filter order.

**Custom fields that exist on no active form.** Fields created during implementation for a data requirement that changed before go-live, or fields created by a developer during testing that were never cleaned up.

**At least one integration that has not synced recently.** Either an API endpoint changed, an authentication credential expired, or a data format the integration expects was changed on the NetSuite side. The sync stopped, nobody noticed, and the systems have diverged by an amount that depends on how long the integration has been failing.

## What gets flagged as risk versus working-as-intended

Not every finding from an account review requires immediate action. A thorough new partner categorizes findings:

**Critical:** Something actively producing incorrect results in Production. A workflow creating duplicate records. An integration overwriting data with incorrect values. A script throwing governance errors on high-volume transactions.

**High priority:** Something not currently causing a visible problem but carrying meaningful risk. A workflow with no entry condition on a high-volume record type consuming enough governance units that a spike in transaction volume could cause governance failures. A saved search used in an approval workflow that returns results based on criteria that have changed since the search was built.

**Maintenance:** Configuration that is inefficient, redundant, or undocumented but not causing problems. Inactive scripts still deployed. Duplicate saved searches. Empty workflow description fields.

**Working as intended:** Configuration that looks unusual but is deliberate. A script with no comments that, on review of its logic, is behaving exactly as the business process requires. A workflow with a broad entry condition that is intentionally broad for a specific reason. These are documented as known items, not flagged as problems.

## Why an independent review matters more than handoff documentation

The handoff documentation from a previous partner, when it exists at all, describes the account as it was built, not as it is now. An account that has been live for a year has changed in ways that may not be reflected in any documentation: fields added after go-live, workflows modified to handle edge cases that appeared in production, scripts patched to fix issues that were discovered after the implementation closed.

The review a new partner performs directly in the account is the only way to get an accurate picture of the current state. It is also the basis for every subsequent decision about what to change, what to leave alone, and what carries risk.

For businesses who want a formal assessment of their account's current state before committing to an ongoing engagement, a [NetSuite health check](/netsuite-health-check) provides exactly this: a structured independent review covering scripts, workflows, saved searches, integrations, roles, and documentation, with findings prioritized by severity. It is the natural starting point for a partner transition when the previous partner's work is unknown or the account has accumulated significant technical debt.

For an overview of how the transition process works and what to expect in the first 90 days with a new partner, the [NetSuite partner replacement](/netsuite-partner-replacement) page covers the full picture.

---
title: "NetSuite Partner Transition Checklist"
description: "A structured checklist for switching NetSuite support partners: what to document, what access to verify, what to hand over, and what a new partner needs to review before taking over the account."
publishedAt: "2026-08-18"
tags: ["Partner Replacement", "Checklist"]
---

Switching NetSuite partners is straightforward when handled in the right order. The most common mistakes: switching without documenting what is in the account, losing access credentials when a partner disengages, and skipping the overlap period that eliminates a coverage gap. This checklist covers each phase of the transition.

<div style="background:#eef2fb;border:1px solid #b2c2e6;border-radius:10px;padding:1.25rem 1.5rem;margin:2rem 0;font-family:system-ui,-apple-system,sans-serif">
<p style="margin:0 0 0.5rem;font-size:0.7rem;font-weight:700;color:#4f7fff;text-transform:uppercase;letter-spacing:0.08em">Quick answer</p>
<p style="margin:0;color:#14306b;font-size:0.9rem;line-height:1.6">Switching NetSuite partners requires handling three phases in the right order to avoid coverage gaps and access loss. Phase 1 is documentation: collect all active customization documentation from the current partner before announcing the change; specifically request a script inventory, integration credential list, and known issue list. Phase 2 is overlap: start the new partner with an Administrator role in the account before the previous partner's engagement ends; two to four weeks of overlap allows the new partner to review the account while the previous partner is still reachable. Phase 3 is access cleanup: after the new partner confirms they have the context they need, remove the previous partner's role and login access from NetSuite under Setup > Users/Roles > Manage Users. The most common transition mistake is removing the previous partner's access before the new partner has had time to review the account and ask follow-up questions.</p>
</div>



---

## Phase 1: Before the previous partner disengages

Complete these steps while your existing partner is still active and accessible.

### Access and credentials

- [ ] Confirm at least one internal team member has full Administrator access in NetSuite
- [ ] Verify that Administrator access is not tied only to a partner consultant's named login
- [ ] Confirm you have access to integration credentials for all connected systems (Celigo, Boomi, custom RESTlets, etc.)
- [ ] Collect login credentials or API keys for any third-party tools the partner managed on your behalf
- [ ] Verify you have access to the NetSuite account ID and company login URL
- [ ] Confirm you know which NetSuite support portal account is tied to your license (for filing Oracle support cases)

### Account documentation

- [ ] Request a list of all active script deployments from the previous partner
- [ ] Request a list of all active workflows and their trigger conditions
- [ ] Request documentation of any custom integrations built during the engagement
- [ ] Confirm ownership of all custom SuiteApps or bundles deployed to the account
- [ ] Ask the previous partner for a summary of any known open issues or technical debt items
- [ ] Document any workarounds your team uses that were created because a build was never completed

### In-progress work

- [ ] Get a status update on any work currently in Sandbox that has not yet been deployed to Production
- [ ] Confirm whether any Sandbox configuration should be promoted before the partner disengages
- [ ] Clarify who is responsible for any open items if the engagement ends before they are resolved
- [ ] Identify any upcoming NetSuite release items the previous partner was planning to review

---

## Phase 2: Overlapping the transition

The cleanest transition starts the new partner before the old one is fully off the account. Even two to four weeks of overlap eliminates the coverage gap and gives the new partner time to review the account while the previous partner may still be reachable.

### Starting the new partner

- [ ] Grant the new partner an Administrator role in the NetSuite account
- [ ] Provide access to any project management tools, shared documents, or issue trackers from the previous engagement
- [ ] Share any documentation received from the previous partner during Phase 1
- [ ] Clarify the list of open and in-progress items for the new partner to prioritize
- [ ] Agree on a communication process for how requests will be submitted going forward

### What the new partner should review independently

A thorough new partner will not rely solely on handoff documentation. Expect the following to be reviewed directly in the account:

- [ ] Script deployments: active versus inactive, execution logs, governance unit consumption
- [ ] Workflow configurations: entry conditions, branch logic, event triggers, overlap with scripts
- [ ] Saved searches: query structure, performance (indexed criteria vs. unindexed), usage in workflows and dashboards
- [ ] Custom fields: which carry data, which are empty, which appear on no active form
- [ ] Roles and permissions: active users, permission configurations, any overly permissive role assignments
- [ ] Integration health: active integration records, recent sync logs, error patterns
- [ ] Sandbox parity: whether Sandbox reflects current Production configuration

---

## Phase 3: After the previous partner disengages

### Verifying coverage is in place

- [ ] Confirm the new partner has all access needed to work independently without the previous partner's involvement
- [ ] Remove or deactivate the previous partner's administrator login from the NetSuite account
- [ ] Revoke access to any shared tools or repositories that were specific to the previous engagement
- [ ] Confirm the new partner has received the upcoming NetSuite release notes and is reviewing for compatibility

### Account review findings

The new partner's independent review will surface items from three categories. Confirm these are addressed:

- [ ] **Critical items:** anything actively causing incorrect behavior in Production
- [ ] **High-priority items:** configurations or scripts carrying risk that has not yet caused a visible problem
- [ ] **Documentation gaps:** customizations that exist but have no record of why they were built or how they work

---

## What stays in your account

Everything built by the previous partner remains in your NetSuite account. This includes:

- All SuiteScript source code and script deployments
- All SuiteFlow workflow configurations
- All saved searches, dashboards, and reports
- All custom fields, custom records, and form configurations
- All integration records and OAuth credentials (verify these are still valid)
- All historical transaction data and audit logs

The only thing that does not transfer automatically is the previous partner's institutional knowledge of why things were built a certain way. A thorough account review by the new partner rebuilds that understanding from what is in the account itself.

---

## Related resources

- [NetSuite partner replacement](/netsuite-partner-replacement): full overview of the transition process
- [Signs it is time to replace your NetSuite partner](/blog/signs-time-to-replace-netsuite-partner): how to recognize when the relationship needs to change
- [What to do when your NetSuite implementation partner leaves](/blog/netsuite-implementation-partner-left): what to expect and how to find a replacement
- [NetSuite Care pricing](/netsuite-care): monthly support plans for businesses transitioning to a new partner

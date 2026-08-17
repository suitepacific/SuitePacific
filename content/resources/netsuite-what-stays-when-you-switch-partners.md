---
title: "What Stays in Your NetSuite Account When You Switch Partners"
description: "Everything built by your previous NetSuite partner remains in your account when you switch. Here is exactly what stays, what does not transfer automatically, and what to verify before the previous partner disengages."
publishedAt: "2026-08-18"
tags: ["Partner Replacement"]
---

One of the most common concerns before switching NetSuite partners is whether changing partners means losing customizations. The answer is no. All work built during the previous engagement remains in your NetSuite account regardless of which partner built it or whether that partner is still engaged.

Here is exactly what stays, what does not transfer automatically, and what to verify before the previous partner is off the account.

---

## What stays in your account automatically

### SuiteScript customizations

Every script deployed to your NetSuite account remains there when a partner disengages. This includes:

- User Event scripts that run on record saves
- Client scripts that run in the browser during UI interaction
- Scheduled scripts that run on a timer
- Map/Reduce scripts for high-volume batch processing
- RESTlets that expose endpoints for external integrations
- Suitelets that create custom pages inside NetSuite

Scripts are stored directly in your NetSuite account, not on a partner's infrastructure. The script source code is readable under Customization > Scripting > Scripts. Deployments remain active under their current status. Nothing about the script layer changes when a partner engagement ends.

### SuiteFlow workflow configurations

All workflows built in SuiteFlow remain in your account. Workflow configurations are stored inside NetSuite itself, not in any external system. Active workflows continue to evaluate on their triggers after the partner disengages. Inactive workflows remain available to review and reactivate.

The workflow configuration, including entry conditions, branch logic, actions, and transition conditions, is readable under Customization > Workflow > Workflows. A new partner reviewing these workflows reads the same configuration that the previous partner built.

### Saved searches, reports, and dashboards

All saved searches remain in your account. Reports remain in your account. Dashboard portlets configured with saved searches remain in your account. These are stored inside NetSuite and are not affected by which partner built them or whether that partner is still engaged.

### Custom records and custom fields

Custom record types built during the previous engagement remain in your account. Custom fields remain on the record types and forms where they were added. Custom forms remain available to the record types they were built for. None of this configuration is partner-specific.

### Advanced PDF and email templates

All Advanced PDF templates and email templates built during the previous engagement remain in your account under Customization > Forms > Advanced PDF/HTML Templates and Customization > Forms > Email Templates respectively.

### Integration records and OAuth configurations

Integration records created in NetSuite under Setup > Integration > Manage Integrations remain in the account. OAuth 2.0 tokens issued to those integration records remain valid as long as the underlying credentials are maintained. The integration records themselves are stored in your account, not the partner's.

**What to verify:** If the partner generated integration credentials (Client ID and Client Secret) using a login or process that was specific to their account, confirm that you have those credentials stored independently. The integration record stays; credentials held only in the partner's systems may not.

### Historical data and audit logs

All transaction history, configuration change logs, script execution logs, and workflow instance records remain in your account. The audit trail of everything that happened in the account, including changes made by the previous partner, is preserved in NetSuite's system notes and audit logs.

---

## What does not transfer automatically

The following do not stay in your account when a partner disengages and need to be addressed explicitly before the engagement ends.

### Institutional knowledge

The most significant thing that leaves with a partner is what they knew about your account: why a particular script was built with a specific condition, what was tried and ruled out before the current approach was chosen, what the business process behind a specific workflow is supposed to accomplish. This knowledge lives with the individuals who built and maintained the account.

Documentation captured before the partner disengages partially addresses this gap. A thorough independent review by the new partner rebuilds some of it from the account itself. But some context is genuinely lost when the previous developer is no longer reachable.

### Partner-managed credentials

If your previous partner managed integration credentials, API keys, or third-party platform accounts on your behalf using accounts that were theirs rather than yours, those credentials may become inaccessible after the engagement ends. This is the area where transition planning matters most: collect all credentials before the partner disengages, and confirm that you have ownership of all accounts used for integrations the partner built.

### Files in partner-owned storage

Documentation, technical specifications, or design files stored in a partner-owned account (Google Drive, Notion, Confluence, or similar) may not remain accessible after the relationship ends. Request copies of any relevant files before the engagement closes.

### Project history in partner-owned tools

If the partner tracked requests, decisions, and development history in a project management tool they owned (Asana, Jira, Linear, or similar), that history may not be accessible after the engagement ends. Request an export or summary of the relevant history before the partner disengages.

---

## What to verify before the previous partner's access is removed

Before removing the previous partner's access from your NetSuite account, confirm the following:

**Internal Administrator access exists.** At least one member of your team has an active Administrator role in the account that is not dependent on the previous partner's consultants remaining active users.

**Integration credentials are in your possession.** Client IDs, Client Secrets, API keys, and any other credentials used for integrations are stored in your own records, not only in the partner's systems.

**Third-party platform access is confirmed.** If the partner administered middleware or integration platforms on your behalf, confirm that you have owner-level access to those platforms under accounts you control.

**Open Sandbox work is assessed.** Any development work built in Sandbox but not yet deployed to Production has been either deployed or documented clearly enough for a new partner to evaluate.

---

## What a new partner sees when they first review the account

A new partner reviewing an inherited NetSuite account reads exactly what the previous partner built. The script source code is readable. The workflow configurations are visible. The saved search logic is transparent. The only thing the new partner cannot recover from the account itself is the context behind decisions: why something was built a particular way, what was tried before the current approach, and what known issues were never resolved.

For a detailed look at what the onboarding review actually examines and what it typically finds in inherited accounts, see [what your new NetSuite partner will find in your account](/blog/what-new-netsuite-partner-finds).

For the full transition process from start to finish, the [NetSuite partner replacement](/netsuite-partner-replacement) page covers the end-to-end picture including what the first 90 days with a new partner looks like.

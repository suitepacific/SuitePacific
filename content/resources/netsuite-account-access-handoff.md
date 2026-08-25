---
title: "NetSuite Account Access Handoff Guide"
description: "What access and credentials need to transfer when switching NetSuite partners: administrator roles, integration credentials, third-party tools, and what to verify before removing the previous partner's access."
publishedAt: "2026-08-18"
tags: ["Partner Replacement"]
---

When switching NetSuite partners, the account itself stays intact. What needs to be actively managed is access: making sure the new partner has what they need, verifying that internal access is not dependent on a departing consultant's credentials, and removing the previous partner's access cleanly after the handoff is complete.

<div style="background:#eef2fb;border:1px solid #b2c2e6;border-radius:10px;padding:1.25rem 1.5rem;margin:2rem 0;font-family:system-ui,-apple-system,sans-serif">
<p style="margin:0 0 0.5rem;font-size:0.7rem;font-weight:700;color:#4f7fff;text-transform:uppercase;letter-spacing:0.08em">Quick answer</p>
<p style="margin:0;color:#14306b;font-size:0.9rem;line-height:1.6">When switching NetSuite partners, the account itself stays intact, but access must be actively managed. The three most common transition gaps are: integration credentials stored only in the previous partner's systems rather than your own records; internal team members who can only access NetSuite through a departing consultant's credentials; and third-party platform accounts (Celigo, Boomi, or similar) owned by the partner rather than your organization. Before the previous partner disengages, collect all integration credentials, verify that your internal team has their own NetSuite login credentials independent of the partner, and confirm that you hold administrator access to any middleware or integration platforms. Remove the previous partner's role access from NetSuite under Setup > Users/Roles > Manage Users after the handoff is confirmed complete. An overlap period of two to four weeks between partners prevents a coverage gap and gives the new partner time to review the account while the previous partner is still reachable.</p>
</div>



This guide covers each access category in sequence.

---

## NetSuite account access

### Administrator role

The new partner needs an Administrator-level role in your NetSuite account to perform onboarding review and development work. This role allows reading script source code, reviewing deployment configurations, examining workflow logic, and making configuration changes without restriction.

Before granting access to the new partner, verify that at least one internal team member also holds an active Administrator role. If the only active Administrator roles are tied to the previous partner's consultants, you are dependent on those credentials remaining active during the transition. Create an internal Administrator role immediately if one does not exist.

To grant the new partner access: navigate to Setup > Users/Roles > Manage Users, create a new Employee record for the new partner's primary contact, and assign the Administrator role. The new partner will confirm their specific access requirements during onboarding.

### Previous partner's access

Do not remove the previous partner's access until the new partner has confirmed they have everything they need to work independently. Removing access too early creates a scenario where a question about the previous partner's work arises after their credentials have been revoked.

Once the new partner confirms their onboarding review is complete and active work has begun, revoke or deactivate the previous partner's employee records in NetSuite. Set the status to Inactive rather than deleting the records; this preserves the audit trail showing what the previous partner's logins accessed.

---

## Integration credentials

### RESTlet and OAuth 2.0 credentials

If your account uses custom RESTlets for external integrations, the integration client credentials (Client ID and Client Secret for OAuth 2.0, or the integration record configuration) should be accessible to the new partner for review and maintenance. These are visible in NetSuite under Setup > Integration > Manage Integrations.

Verify that integration credentials are stored in your own records and not only in the previous partner's documentation or systems. If credentials were generated using a consultant's credentials as the issuing account, assess whether new credentials should be generated under internal ownership.

### Third-party integration platforms

If your account uses a middleware platform such as Celigo, Boomi, or a similar integration tool, confirm the following:

- You have administrator access to the integration platform account itself (not just access through the previous partner's login)
- The new partner has or can be granted the access level needed to review and maintain integration flows
- You have records of which integration flows are active and what they connect

Middleware platform access is separate from NetSuite access and is a frequent gap in partner transitions. A new partner who can read the NetSuite side of an integration but cannot access the middleware platform is unable to diagnose or fix integration failures end to end.

### API keys and external system credentials

Any external system credentials that the previous partner managed on your behalf (API keys, webhook secrets, database connection strings used in custom integrations) should be collected and stored in your own credential management before the previous partner disengages. If credentials exist only in a previous partner's systems, they may become inaccessible after the engagement ends.

---

## Supporting tools and resources

### Project management and ticketing

If the previous partner used a project management tool to track requests, confirm whether you have access to that tool and whether the history is exportable. A record of past requests, their resolution, and any notes on why decisions were made is valuable context for the new partner.

If the previous partner used a tool under their own account (Asana, Jira, Linear, or similar) without giving you ownership of the workspace, the history may not be accessible after the engagement ends. Request an export or summary before the engagement closes.

### Shared documentation

Any account documentation, technical specifications, or process guides maintained by the previous partner should be transferred to your own storage before the engagement ends. Google Drive or Notion documents owned by a partner account may not remain accessible after the relationship ends.

### SuiteCloud Development Framework projects

If the previous partner used SuiteCloud Development Framework (SDF) to deploy customizations, confirm whether SDF project files are stored in a repository you have access to. SDF-deployed customizations remain in the NetSuite account regardless of where the source files are stored, but having access to the source files makes future development and maintenance significantly easier for the new partner.

---

## What to verify before the previous partner's access is removed

Before revoking the previous partner's access, confirm the following with the new partner:

- [ ] The new partner has Administrator access and has confirmed it is functioning correctly
- [ ] The new partner has reviewed active script deployments, workflow configurations, and integration records
- [ ] The new partner has access to any middleware platforms used for integrations
- [ ] Open issues from the previous engagement have been documented and transferred
- [ ] Any in-progress Sandbox work has been assessed and either deployed or documented
- [ ] The upcoming NetSuite release has been reviewed for compatibility with existing customizations
- [ ] Internal team members hold active Administrator access independent of the partner transition

---

## After the previous partner's access is removed

Once access has been revoked, confirm the following:

- [ ] The previous partner's employee records are set to Inactive (not deleted) in NetSuite
- [ ] Integration credentials that were managed by the previous partner have been verified as still valid
- [ ] Any shared project management or documentation tools have been migrated to internal ownership or archived
- [ ] The new partner's access has been tested and confirmed working for all account areas they need to reach

---

## Related resources

- [NetSuite partner transition checklist](/resources/netsuite-partner-transition-checklist): full phase-by-phase transition checklist
- [NetSuite partner replacement](/netsuite-partner-replacement): what the transition looks like end to end
- [Questions to ask before switching NetSuite partners](/resources/netsuite-partner-questions-to-ask): how to evaluate a replacement partner

---
title: "NetSuite Is Retiring NLAuth and TBA: What Developers Need to Do Before 2027.1"
description: "NetSuite 2026.2 confirms end of support for NLAuth in 2027.1 and new TBA integrations in 2027.1, with full TBA retirement tentatively planned for 2028.1. Here is what you need to know and what to do now."
date: "2026-07-21"
updated: "2026-08-05"
tags: ["Authentication", "SuiteScript", "Security"]
---

NLAuth is one of the oldest authentication methods in NetSuite. It works by passing your account ID, email, and password directly in an HTTP Authorization header. Easy to implement, nothing to configure, and used in thousands of RESTlet integrations built over the last decade.

<div style="background:#eef2fb;border:1px solid #b2c2e6;border-radius:10px;padding:1.25rem 1.5rem;margin:2rem 0;font-family:system-ui,-apple-system,sans-serif">
<p style="margin:0 0 0.5rem;font-size:0.7rem;font-weight:700;color:#4f7fff;text-transform:uppercase;letter-spacing:0.08em">Quick answer</p>
<p style="margin:0;color:#14306b;font-size:0.9rem;line-height:1.6">NetSuite is ending support for NLAuth, the authentication method that passes credentials directly in HTTP Authorization headers. Two retirement dates apply. In 2027.1, new integrations using NLAuth will be blocked, and existing NLAuth integrations that have not migrated will stop working. A second deprecation tentatively planned for 2028.1 completes the removal for any remaining connections. Any RESTlet, custom integration, or third-party connection that currently authenticates with NLAuth must migrate to Token-Based Authentication using Integration Records in NetSuite before 2027.1. Migration generates a Consumer Key, Consumer Secret, Token ID, and Token Secret for each integration. Organizations with large integration inventories should audit all connections for NLAuth usage now and prioritize migration of the highest-risk connections, particularly those that touch financial records or run unattended on a schedule.</p>
</div>


NetSuite is ending it.

The 2026.2 release notes confirm two changes coming in 2027.1 and one tentatively planned for 2028.1. Any integration still using NLAuth at that point stops working. Any new integration built with Token-Based Authentication (TBA) from 2027.1 onward will be blocked. If your account has RESTlets, custom integrations, or third-party connections that authenticate with NLAuth or TBA credentials, you need an audit and a migration plan before that deadline.

<figure style="margin:1.75rem 0">
<svg viewBox="0 0 680 130" xmlns="http://www.w3.org/2000/svg" style="width:100%;max-width:680px;display:block;font-family:system-ui,-apple-system,sans-serif">
  <text x="340" y="14" text-anchor="middle" font-size="10" font-weight="700" fill="#14306b" letter-spacing="0.05em">AUTHENTICATION RETIREMENT TIMELINE</text>
  <!-- Timeline spine -->
  <line x1="40" y1="50" x2="640" y2="50" stroke="#d7e0f3" stroke-width="2"/>
  <!-- Now marker -->
  <circle cx="60" cy="50" r="7" fill="#4f7fff"/>
  <text x="60" y="37" text-anchor="middle" font-size="8.5" font-weight="700" fill="#14306b">Now</text>
  <text x="60" y="69" text-anchor="middle" font-size="8" fill="#4f6fb0">2026.2</text>
  <!-- 2027.1 marker -->
  <circle cx="340" cy="50" r="7" fill="#ef4444"/>
  <text x="340" y="37" text-anchor="middle" font-size="8.5" font-weight="700" fill="#991b1b">Hard deadline</text>
  <text x="340" y="69" text-anchor="middle" font-size="8" fill="#991b1b">2027.1</text>
  <!-- 2028.1 marker -->
  <circle cx="600" cy="50" r="7" fill="#f97316"/>
  <text x="600" y="37" text-anchor="middle" font-size="8.5" font-weight="700" fill="#92400e">Tentative</text>
  <text x="600" y="69" text-anchor="middle" font-size="8" fill="#92400e">2028.1</text>
  <!-- Action items under 2027.1 -->
  <text x="340" y="88" text-anchor="middle" font-size="8" fill="#991b1b">NLAuth integrations stop working</text>
  <text x="340" y="100" text-anchor="middle" font-size="8" fill="#991b1b">New TBA integrations blocked</text>
  <text x="340" y="112" text-anchor="middle" font-size="8" fill="#991b1b">PKCE required for OAuth 2.0</text>
  <!-- Action items under 2028.1 -->
  <text x="600" y="88" text-anchor="middle" font-size="8" fill="#92400e">TBA fully retired</text>
  <text x="600" y="100" text-anchor="middle" font-size="8" fill="#92400e">(existing integrations stop)</text>
  <!-- Now action -->
  <text x="60" y="88" text-anchor="middle" font-size="8" fill="#4f6fb0">Audit all integrations</text>
  <text x="60" y="100" text-anchor="middle" font-size="8" fill="#4f6fb0">Plan OAuth 2.0 migration</text>
</svg>
<figcaption style="text-align:center;font-size:0.78rem;color:#8aa2d6;margin-top:0.4rem">Migrating to TBA now buys time but is not the final destination. OAuth 2.0 is the long-term target.</figcaption>
</figure>

## What is being retired and when

**As of 2027.1:**

- All integrations that use NLAuth as an authentication method will stop working. This includes RESTlets that currently authenticate with NLAuth credentials.
- You will not be able to create new integrations using Token-Based Authentication (TBA).

**Tentatively planned for 2028.1:**

- TBA will be fully retired. Existing TBA integrations that currently work will stop working when this happens.

## Why NLAuth is being retired

NLAuth passes your NetSuite account email and password with every request. If those credentials are compromised, an attacker can log directly into NetSuite, not just call your API. NetSuite has been phasing it out for years. 2027.1 is the hard cutoff.

TBA is more secure but is based on OAuth 1.0. OAuth 2.0 is the current standard, and NetSuite's direction is to move all integrations there.

## What to do if you use NLAuth

You need to migrate before 2027.1. The options are:

**Option 1: Migrate to TBA (faster)**
TBA uses consumer key, consumer secret, token key, and token secret. It is more secure than NLAuth, still widely supported, and the migration is straightforward. The catch: you cannot create new TBA integrations from 2027.1, and TBA itself is tentatively being retired in 2028.1. Migrating to TBA now buys you time but is not the final destination.

**Option 2: Migrate directly to OAuth 2.0 (recommended)**
OAuth 2.0 is what NetSuite recommends. It takes more setup but is the long-term solution. If you have the capacity to do this migration now, skip TBA and go straight to OAuth 2.0.

For both options, the starting point is the same: create an Integration Record in NetSuite at **Setup > Integration > Manage Integrations > New**, and generate credentials from there.

If you need outside help with the migration, [SuitePacific's NetSuite integration service](/netsuite-integrations) covers OAuth 2.0 rebuilds for existing NLAuth and TBA integrations.

## What to do if you use TBA

If you have existing TBA integrations, you have more runway. They will continue working until TBA is fully retired, which is tentatively planned for 2028.1. However:

- You cannot create new TBA integrations from 2027.1.
- The 2028.1 retirement date is tentative and could change.

Plan your migration to OAuth 2.0 now. Do not wait until you are forced to.

## One more change in 2027.1: PKCE for OAuth 2.0

If you are already using OAuth 2.0 Authorization Code Grant Flow, PKCE (Proof Key for Code Exchange) will be required as of 2027.1. If your current implementation does not include PKCE, add it before the deadline.

## Summary of changes and timeline

| Change | When |
|---|---|
| NLAuth stops working | NetSuite 2027.1 |
| New TBA integrations blocked | NetSuite 2027.1 |
| PKCE required for OAuth 2.0 Authorization Code Grant | NetSuite 2027.1 |
| TBA fully retired (tentative) | NetSuite 2028.1 |

Start your audit now. Find every integration that uses NLAuth or was built with TBA credentials, and map out which ones need to move to OAuth 2.0 and by when.

If you need help migrating your integrations, see [How to Migrate NetSuite Integrations from NLAuth to Token-Based Authentication](/resources/netsuite-nlauth-to-tba-migration).

If you want a developer to handle the migration and ongoing integration work, see [how to hire a NetSuite developer](/hire-netsuite-developer).

## Frequently asked questions

**Q: What is NLAuth in NetSuite?**
A: NLAuth (NetSuite Login Authentication) is an authentication method that passes a NetSuite account ID, email address, and password directly in the HTTP Authorization header of each API request. It was the original authentication method for RESTlets and is still widely used in older integrations. NetSuite is retiring it because it requires sharing a user's login credentials with the integration, which creates a security risk if those credentials are compromised.

**Q: When is NLAuth being retired?**
A: As of NetSuite 2027.1, all NLAuth integrations stop working. This is a hard deadline, not a warning. The 2026.2 release notes confirmed this. Additionally, new TBA integrations cannot be created from 2027.1. Existing TBA integrations continue working until a tentative retirement in 2028.1.

**Q: What should replace NLAuth?**
A: OAuth 2.0 is NetSuite's recommended replacement. Specifically, OAuth 2.0 with PKCE (Proof Key for Code Exchange) is the current standard, and PKCE will be required for the Authorization Code Grant Flow as of 2027.1. OAuth 2.0 does not require sharing user credentials and supports machine-to-machine integrations through the Client Credentials flow.

**Q: Can I migrate from NLAuth to TBA instead of going straight to OAuth 2.0?**
A: Yes, but TBA is only a temporary solution. TBA is more secure than NLAuth and the migration is straightforward. However, new TBA integrations will be blocked from 2027.1, and existing TBA is tentatively being retired in 2028.1. Migrating to TBA now buys time but you will need to migrate again to OAuth 2.0. If you have capacity, migrate directly to OAuth 2.0.

**Q: Does the NLAuth retirement affect RESTlet integrations specifically?**
A: Yes. RESTlets are the most common place NLAuth is used because NLAuth was the easiest authentication method to implement for RESTlet calls. Any RESTlet that currently receives requests authenticated with NLAuth will stop receiving those requests when 2027.1 hits. The RESTlet itself does not need to be rewritten, only the authentication method the calling system uses to reach it.

If you need help auditing your current integrations or planning the migration, [SuitePacific's NetSuite integrations services](/netsuite-integrations) cover RESTlet, REST Web Services, and OAuth 2.0 migration work.

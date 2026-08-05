---
title: "NetSuite Is Retiring NLAuth and TBA: What Developers Need to Do Before 2027.1"
description: "NetSuite 2026.2 confirms end of support for NLAuth in 2027.1 and new TBA integrations in 2027.1, with full TBA retirement tentatively planned for 2028.1. Here is what you need to know and what to do now."
date: "2026-07-21"
tags: ["Authentication", "SuiteScript", "Security"]
---

NLAuth is one of the oldest authentication methods in NetSuite. It works by passing your account ID, email, and password directly in an HTTP Authorization header. Easy to implement, nothing to configure, and used in thousands of RESTlet integrations built over the last decade.

NetSuite is ending it.

The 2026.2 release notes confirm two changes coming in 2027.1 and one tentatively planned for 2028.1.

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

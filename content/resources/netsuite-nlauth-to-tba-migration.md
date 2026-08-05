---
title: "How to Migrate NetSuite RESTlet Integrations from NLAuth to Token-Based Authentication"
description: "NLAuth stops working in NetSuite 2027.1. Here are the steps to audit your RESTlet integrations and migrate them to Token-Based Authentication before the deadline."
category: "SuiteScript"
tags: ["SuiteScript", "Authentication", "Security"]
publishedAt: "2026-07-21"
linkedinDay: 21
---

## Why you need to act before 2027.1

As of NetSuite 2027.1, all integrations using NLAuth will stop working. NLAuth is the authentication method that passes your NetSuite account ID, email, and password in an HTTP Authorization header.

If any of your RESTlet integrations use NLAuth, they will fail when 2027.1 goes live. This is a hard cutoff, not a warning.

Token-Based Authentication (TBA) is the most direct migration path for existing RESTlet integrations. Note that from 2027.1, you will not be able to create new TBA integrations, so migrate before that deadline. TBA itself is tentatively planned for full retirement in 2028.1, at which point migrating to OAuth 2.0 will be required.

<figure style="margin:1.75rem 0">
<svg viewBox="0 0 680 112" xmlns="http://www.w3.org/2000/svg" style="width:100%;max-width:680px;display:block;font-family:system-ui,-apple-system,sans-serif">
  <defs>
    <marker id="nlm-arrow" markerWidth="7" markerHeight="7" refX="5" refY="3" orient="auto"><path d="M0,0 L0,6 L7,3 z" fill="#4f6fb0"/></marker>
  </defs>
  <text x="340" y="13" text-anchor="middle" font-size="10" font-weight="700" fill="#14306b" letter-spacing="0.05em">NLAUTH TO TBA MIGRATION: FIVE STEPS</text>
  <!-- Step boxes -->
  <rect x="0" y="22" width="120" height="54" rx="6" fill="#eef2fb" stroke="#4f7fff" stroke-width="1.5"/>
  <text x="60" y="43" text-anchor="middle" font-size="8.5" font-weight="700" fill="#14306b">① Audit</text>
  <text x="60" y="57" text-anchor="middle" font-size="7.5" fill="#4f6fb0">Find all NLAuth</text>
  <text x="60" y="68" text-anchor="middle" font-size="7.5" fill="#4f6fb0">in headers &amp; config</text>
  <line x1="120" y1="49" x2="138" y2="49" stroke="#4f6fb0" stroke-width="1.5" marker-end="url(#nlm-arrow)"/>
  <rect x="140" y="22" width="120" height="54" rx="6" fill="#eef2fb" stroke="#4f7fff" stroke-width="1.5"/>
  <text x="200" y="43" text-anchor="middle" font-size="8.5" font-weight="700" fill="#14306b">② Integration Record</text>
  <text x="200" y="57" text-anchor="middle" font-size="7.5" fill="#4f6fb0">Setup > Integrations</text>
  <text x="200" y="68" text-anchor="middle" font-size="7.5" fill="#4f6fb0">Enable TBA</text>
  <line x1="260" y1="49" x2="278" y2="49" stroke="#4f6fb0" stroke-width="1.5" marker-end="url(#nlm-arrow)"/>
  <rect x="280" y="22" width="120" height="54" rx="6" fill="#eef2fb" stroke="#4f7fff" stroke-width="1.5"/>
  <text x="340" y="43" text-anchor="middle" font-size="8.5" font-weight="700" fill="#14306b">③ Generate Tokens</text>
  <text x="340" y="57" text-anchor="middle" font-size="7.5" fill="#4f6fb0">User access token +</text>
  <text x="340" y="68" text-anchor="middle" font-size="7.5" fill="#4f6fb0">token secret</text>
  <line x1="400" y1="49" x2="418" y2="49" stroke="#4f6fb0" stroke-width="1.5" marker-end="url(#nlm-arrow)"/>
  <rect x="420" y="22" width="120" height="54" rx="6" fill="#eef2fb" stroke="#4f7fff" stroke-width="1.5"/>
  <text x="480" y="43" text-anchor="middle" font-size="8.5" font-weight="700" fill="#14306b">④ Update Code</text>
  <text x="480" y="57" text-anchor="middle" font-size="7.5" fill="#4f6fb0">Replace NLAuth header</text>
  <text x="480" y="68" text-anchor="middle" font-size="7.5" fill="#4f6fb0">with OAuth 1.0 signature</text>
  <line x1="540" y1="49" x2="558" y2="49" stroke="#4f6fb0" stroke-width="1.5" marker-end="url(#nlm-arrow)"/>
  <rect x="560" y="22" width="120" height="54" rx="6" fill="#060f26" stroke="#4f7fff" stroke-width="1.5"/>
  <text x="620" y="43" text-anchor="middle" font-size="8.5" font-weight="700" fill="#eef2fb">⑤ Test &amp; Deploy</text>
  <text x="620" y="57" text-anchor="middle" font-size="7.5" fill="#8aa2d6">Sandbox first</text>
  <text x="620" y="68" text-anchor="middle" font-size="7.5" fill="#8aa2d6">confirm before 2027.1</text>
  <!-- Deadline bar -->
  <rect x="0" y="88" width="680" height="22" rx="5" fill="#fef2f2" stroke="#fca5a5" stroke-width="1"/>
  <text x="340" y="103" text-anchor="middle" font-size="8.5" font-weight="700" fill="#991b1b">Hard deadline: NetSuite 2027.1: all NLAuth integrations stop working. Test in sandbox before production cutover.</text>
</svg>
</figure>

## Step 1: Find every integration using NLAuth

Search your codebase and any integration configuration for the string `NLAuth` or `nlauth`. NLAuth appears in HTTP Authorization headers in this format:

```
Authorization: NLAuth nlauth_account=ACCOUNT_ID, nlauth_email=user@example.com, nlauth_signature=PASSWORD
```

Also check:
- Environment variables and config files for stored NetSuite credentials
- Third-party tools connected to NetSuite with username and password
- Any scheduled scripts or integrations that authenticate with email and password

For each one, note what it does and what NetSuite record types it accesses.

## Step 2: Create an Integration Record in NetSuite

Each TBA connection requires an Integration Record.

Go to **Setup > Integration > Manage Integrations > New**.

Give the integration a descriptive name. Under Authentication, enable **Token-Based Authentication**. Save the record.

NetSuite will display a **Consumer Key** and **Consumer Secret**. Copy both immediately. They will not be shown again after you leave this page.

## Step 3: Generate an Access Token

Go to **Setup > Users/Roles > Access Tokens > New**.

Select:
- The Integration Record you just created
- The Role the integration should run under
- The User whose credentials the token will use

Save. NetSuite will display a **Token ID** and **Token Secret**. Copy both immediately.

You now have four values:
- Consumer Key
- Consumer Secret
- Token ID
- Token Secret

## Step 4: Update your integration to use TBA

Replace the NLAuth Authorization header in your integration with a TBA OAuth 1.0 signed header. The format is:

```
Authorization: OAuth
  realm="ACCOUNT_ID",
  oauth_consumer_key="CONSUMER_KEY",
  oauth_token="TOKEN_ID",
  oauth_signature_method="HMAC-SHA256",
  oauth_timestamp="TIMESTAMP",
  oauth_nonce="NONCE",
  oauth_version="1.0",
  oauth_signature="SIGNATURE"
```

The signature is HMAC-SHA256 of a canonical base string using your Consumer Secret and Token Secret as the signing key. Most NetSuite TBA libraries and HTTP clients with OAuth 1.0 support handle this automatically.

## Step 5: Test in sandbox before switching production

Point your updated integration at your sandbox environment using sandbox credentials. Run through the same operations your integration performs in production and confirm everything works correctly.

Sandbox NetSuite Account IDs follow the format `ACCOUNT_ID_SB1` or `ACCOUNT_ID_SB2`. You will need a separate Integration Record and Access Token created in the sandbox account.

## Step 6: Switch production and remove NLAuth credentials

Once sandbox testing passes, update your production integration to use the TBA credentials you created in Step 3. Then remove all NLAuth credentials from your codebase, config files, and any secret managers. Do not leave them in place after migration.

## Who this applies to

Any developer or administrator responsible for a NetSuite integration that:
- Passes credentials in an NLAuth Authorization header
- Connects to NetSuite RESTlets using email and password
- Was built before Token-Based Authentication became the standard

If you are not sure which authentication method your integrations use, search for `NLAuth` in your codebase. If you find it, this migration applies to you.

For background on why these changes are happening and the full timeline, see [NetSuite Is Retiring NLAuth and TBA: What Developers Need to Do Before 2027.1](/blog/netsuite-nlauth-tba-end-of-support).

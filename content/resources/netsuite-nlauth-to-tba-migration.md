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

## Step 1 — Find every integration using NLAuth

Search your codebase and any integration configuration for the string `NLAuth` or `nlauth`. NLAuth appears in HTTP Authorization headers in this format:

```
Authorization: NLAuth nlauth_account=ACCOUNT_ID, nlauth_email=user@example.com, nlauth_signature=PASSWORD
```

Also check:
- Environment variables and config files for stored NetSuite credentials
- Third-party tools connected to NetSuite with username and password
- Any scheduled scripts or integrations that authenticate with email and password

For each one, note what it does and what NetSuite record types it accesses.

## Step 2 — Create an Integration Record in NetSuite

Each TBA connection requires an Integration Record.

Go to **Setup > Integration > Manage Integrations > New**.

Give the integration a descriptive name. Under Authentication, enable **Token-Based Authentication**. Save the record.

NetSuite will display a **Consumer Key** and **Consumer Secret**. Copy both immediately. They will not be shown again after you leave this page.

## Step 3 — Generate an Access Token

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

## Step 4 — Update your integration to use TBA

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

## Step 5 — Test in sandbox before switching production

Point your updated integration at your sandbox environment using sandbox credentials. Run through the same operations your integration performs in production and confirm everything works correctly.

Sandbox NetSuite Account IDs follow the format `ACCOUNT_ID_SB1` or `ACCOUNT_ID_SB2`. You will need a separate Integration Record and Access Token created in the sandbox account.

## Step 6 — Switch production and remove NLAuth credentials

Once sandbox testing passes, update your production integration to use the TBA credentials you created in Step 3. Then remove all NLAuth credentials from your codebase, config files, and any secret managers. Do not leave them in place after migration.

## Who this applies to

Any developer or administrator responsible for a NetSuite integration that:
- Passes credentials in an NLAuth Authorization header
- Connects to NetSuite RESTlets using email and password
- Was built before Token-Based Authentication became the standard

If you are not sure which authentication method your integrations use, search for `NLAuth` in your codebase. If you find it, this migration applies to you.

For background on why these changes are happening and the full timeline, see [NetSuite Is Retiring NLAuth and TBA: What Developers Need to Do Before 2027.1](/blog/netsuite-nlauth-tba-end-of-support).

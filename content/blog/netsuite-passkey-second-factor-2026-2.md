---
title: "NetSuite Passkeys Can Now Replace Your Authenticator App: What Changed in 2026.2"
description: "NetSuite 2026.2 lets users with FIDO2-compliant passkeys use them as a second authentication factor. Here is what changed, what FIDO2-compliant means, and what administrators need to know."
date: "2026-07-21"
updated: "2026-08-05"
tags: ["Authentication", "Security", "Administration"]
---

A passkey is a FIDO2-based credential that authenticates a user using biometrics or a device PIN instead of a password, eliminating the need to remember or type credentials. In NetSuite, passkeys enable passwordless login but were not previously recognized as a sufficient second authentication factor on their own.

If you use a passkey to log into NetSuite, you may have noticed that even after setting one up, the system still prompts you for an authenticator app code on some logins. That prompt existed because passkeys, up until 2026.2, handled passwordless authentication but were not recognized as a second authentication factor on their own.

NetSuite 2026.2 changes this.

<figure style="margin:1.75rem 0">
<svg viewBox="0 0 680 120" xmlns="http://www.w3.org/2000/svg" style="width:100%;max-width:680px;display:block;font-family:system-ui,-apple-system,sans-serif">
  <defs>
    <marker id="pk-arrow" markerWidth="7" markerHeight="7" refX="5" refY="3" orient="auto"><path d="M0,0 L0,6 L7,3 z" fill="#4f6fb0"/></marker>
  </defs>
  <!-- Before -->
  <rect x="0" y="0" width="300" height="120" rx="9" fill="#f8f9fc" stroke="#d7e0f3" stroke-width="1.5"/>
  <rect x="0" y="0" width="300" height="26" rx="9" fill="#4f6fb0"/>
  <rect x="0" y="16" width="300" height="10" fill="#4f6fb0"/>
  <text x="150" y="18" text-anchor="middle" font-size="10" font-weight="700" fill="#eef2fb">Before 2026.2</text>
  <text x="150" y="44" text-anchor="middle" font-size="8.5" fill="#14306b">Step 1: Enter password or use passkey</text>
  <text x="150" y="60" text-anchor="middle" font-size="8.5" fill="#14306b">Step 2: Open authenticator app</text>
  <text x="150" y="76" text-anchor="middle" font-size="8.5" fill="#14306b">Step 3: Enter 6-digit code</text>
  <text x="150" y="100" text-anchor="middle" font-size="8" fill="#991b1b">Passkey alone: not sufficient for 2FA</text>
  <!-- Arrow -->
  <line x1="300" y1="60" x2="380" y2="60" stroke="#4f7fff" stroke-width="2" marker-end="url(#pk-arrow)"/>
  <text x="340" y="53" text-anchor="middle" font-size="8" font-weight="700" fill="#4f7fff">2026.2</text>
  <!-- After -->
  <rect x="382" y="0" width="298" height="120" rx="9" fill="#eef2fb" stroke="#4f7fff" stroke-width="2"/>
  <rect x="382" y="0" width="298" height="26" rx="9" fill="#0b1f4d"/>
  <rect x="382" y="16" width="298" height="10" fill="#0b1f4d"/>
  <text x="531" y="18" text-anchor="middle" font-size="10" font-weight="700" fill="#eef2fb">After 2026.2</text>
  <text x="531" y="44" text-anchor="middle" font-size="8.5" fill="#14306b">Step 1: Enter password</text>
  <text x="531" y="60" text-anchor="middle" font-size="8.5" fill="#14306b">Step 2: Use FIDO2 passkey as 2nd factor</text>
  <text x="531" y="76" text-anchor="middle" font-size="8.5" fill="#14306b">(Face ID / Touch ID / security key)</text>
  <text x="531" y="100" text-anchor="middle" font-size="8" fill="#16a34a">No authenticator app needed</text>
</svg>
<figcaption style="text-align:center;font-size:0.78rem;color:#8aa2d6;margin-top:0.4rem">Requires a FIDO2-compliant passkey: Face ID, Touch ID, Windows Hello, or a hardware security key.</figcaption>
</figure>

<div style="background:#eef2fb;border:1px solid #b2c2e6;border-radius:10px;padding:1.25rem 1.5rem;margin:2rem 0;font-family:system-ui,-apple-system,sans-serif">
<p style="margin:0 0 0.5rem;font-size:0.7rem;font-weight:700;color:#4f7fff;text-transform:uppercase;letter-spacing:0.08em">Quick answer</p>
<p style="margin:0;color:#14306b;font-size:0.9rem;line-height:1.6">NetSuite 2026.2 allows users with a FIDO2-compliant passkey to use it as a second authentication factor, not just for passwordless login. If your account requires two-factor authentication and you have a passkey set up using Face ID, Touch ID, Windows Hello, or a FIDO2-certified hardware security key, that passkey can now satisfy the 2FA requirement without requiring an authenticator app code. The feature works automatically once a qualifying passkey is configured in the user's account. A 3-month fallback remains: even with a passkey as the second factor, NetSuite prompts for an authenticator app code every three months as a built-in security check, so keep the authenticator app installed. Administrators can disable the passkey-as-2FA feature at the account level. This change is separate from the passwordless login feature also added in 2026.2, which uses the passkey to replace both the password and 2FA prompt entirely.</p>
</div>

## What changed

Users who have a FIDO2-compliant passkey configured in their NetSuite account can now use that passkey as a second factor, not just as a passwordless login method.

If your account requires two-factor authentication, your passkey can satisfy that requirement. You no longer need to open an authenticator app and enter a code every time.

## What FIDO2-compliant means

FIDO2 is the technical standard that modern passkeys are built on. Your passkey qualifies if you created it using:

- Face ID or Touch ID on an iPhone, iPad, or Mac
- Windows Hello on a Windows device with a fingerprint reader or face recognition camera
- A FIDO2-certified hardware security key

Passkeys created through these methods are FIDO2-compliant and work as a second factor in NetSuite.

## The 3-month authenticator prompt

Even with a passkey configured as your second factor, NetSuite will still prompt you for an authenticator app code every three months. This is a built-in fallback, not a sign that something is misconfigured. Keep your authenticator app installed and your backup codes stored somewhere safe.

## What administrators need to know

Administrators can disable the passkey-as-2FA feature for their account. If your organization has compliance requirements around which second-factor methods are approved, or if you want to control the rollout, you can disable this in your account's authentication settings and users will revert to the standard authenticator app prompt for 2FA.

## How this is different from passwordless passkey login

In 2026.2, NetSuite released two separate passkey-related changes:

**Passwordless Authentication with Passkeys:** Use your passkey to sign in without a password at all. This replaces the password and 2FA prompt entirely.

**Passkey as a 2FA Authenticator:** Use your passkey as the second factor when you are still logging in with a password.

These are two separate use cases. If you are already using passkeys for full passwordless login, the 2FA change may not affect your day-to-day experience. But if your account uses password plus 2FA and you want to remove the authenticator app step, this is how.

## What to do

If you want to use your passkey as a second factor in NetSuite, you do not need to do anything extra. The change works automatically once you have a FIDO2-compliant passkey set up in your account. If you have not set one up yet, see [How to Enable Passkeys in NetSuite](/resources/netsuite-passkeys) for the setup steps.

If you are a NetSuite administrator and want to control whether this feature is available to your users, check your account's authentication settings in NetSuite Setup.

## Frequently asked questions

**Q: Can a passkey be used as both the first and second factor in the same login?**
A: NetSuite 2026.2 has two separate passkey features that cover different scenarios. Passwordless login uses the passkey in place of both password and 2FA. The passkey-as-2FA feature applies when users log in with a password and need a second factor. These are separate configurations.

**Q: Do all users automatically get this capability after 2026.2?**
A: Users need a FIDO2-compliant passkey already configured in their account. If a passkey was set up using Face ID, Touch ID, or Windows Hello, it will work as a second factor automatically once the account is on 2026.2 and the feature is enabled.

**Q: What if a user's passkey stops working or is on a lost device?**
A: The 3-month authenticator app fallback means users with passkeys still need their authenticator app available as a backup. Keep it installed and maintain access to backup codes so there is always a fallback path into the account.

**Q: Can administrators disable this feature for specific users rather than the entire account?**
A: The administrator control for this feature is at the account level, not the individual user level. Disabling it reverts all users to the standard authenticator app prompt for 2FA.

**Q: Does this change affect the 2FA requirement for administrator accounts?**
A: Administrator accounts are still subject to 2FA requirements. A FIDO2-compliant passkey can satisfy the 2FA requirement for an administrator account when the feature is enabled at the account level.

NetSuite authentication configuration for your user base is covered under [SuitePacific's NetSuite administrator support](/netsuite-administrator-support).

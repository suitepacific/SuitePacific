---
title: "How to Use a Passkey as Your Second Factor in NetSuite"
description: "Starting in NetSuite 2026.2, a FIDO2-compliant passkey can replace the authenticator app prompt for two-factor authentication. Here is what qualifies and how it works at login."
category: "Administration"
tags: ["Administration", "Security", "Authentication"]
publishedAt: "2026-07-21"
updatedAt: "2026-08-15"
linkedinDay: 23
---

<div style="background:#eef2fb;border:1px solid #b2c2e6;border-radius:10px;padding:1.25rem 1.5rem;margin:2rem 0;font-family:system-ui,-apple-system,sans-serif">
<p style="margin:0 0 0.5rem;font-size:0.7rem;font-weight:700;color:#4f7fff;text-transform:uppercase;letter-spacing:0.08em">Quick answer</p>
<p style="margin:0;color:#14306b;font-size:0.9rem;line-height:1.6">Starting in NetSuite 2026.2, a FIDO2-compliant passkey can replace the authenticator app step in two-factor authentication. A FIDO2-compliant passkey is one registered on a hardware security key, a platform authenticator (Touch ID, Face ID, Windows Hello), or any device that implements the FIDO2 standard. If your passkey meets this requirement, NetSuite accepts it as both your primary credential and your second factor in a single step. You must first set up a passkey in NetSuite under Home > Settings > Manage Passkeys before it can serve as your second factor. Keep your authenticator app active as a backup until you confirm the passkey works as expected. If the passkey verification fails during login, NetSuite falls back to your registered authenticator app, so you are not locked out of your account while transitioning to passkey-based two-factor authentication.</p>
</div>

## What changed in 2026.2

Before 2026.2, a passkey in NetSuite handled passwordless login. It replaced your password but did not count as a second authentication factor. If your account required 2FA, you still had to open an authenticator app and enter a code.

From 2026.2 onward, a FIDO2-compliant passkey can satisfy the 2FA requirement. When NetSuite prompts for a second factor, your passkey biometric scan takes the place of the authenticator app code.

<figure style="margin:1.75rem 0">
<svg viewBox="0 0 680 104" xmlns="http://www.w3.org/2000/svg" style="width:100%;max-width:680px;display:block;font-family:system-ui,-apple-system,sans-serif">
  <defs>
    <marker id="p2f-arrow" markerWidth="7" markerHeight="7" refX="5" refY="3" orient="auto"><path d="M0,0 L0,6 L7,3 z" fill="#4f7fff"/></marker>
  </defs>
  <rect x="0" y="0" width="300" height="104" rx="9" fill="#f8f9fc" stroke="#d7e0f3" stroke-width="1.5"/>
  <rect x="0" y="0" width="300" height="24" rx="9" fill="#4f6fb0"/>
  <rect x="0" y="14" width="300" height="10" fill="#4f6fb0"/>
  <text x="150" y="16" text-anchor="middle" font-size="10" font-weight="700" fill="#eef2fb">Before 2026.2</text>
  <text x="150" y="38" text-anchor="middle" font-size="8.5" fill="#14306b">① Enter password (or use passkey for step 1)</text>
  <text x="150" y="53" text-anchor="middle" font-size="8.5" fill="#14306b">② Open authenticator app</text>
  <text x="150" y="68" text-anchor="middle" font-size="8.5" fill="#14306b">③ Enter 6-digit 2FA code</text>
  <text x="150" y="88" text-anchor="middle" font-size="8" fill="#991b1b">Passkey alone: not valid for 2FA</text>
  <line x1="300" y1="52" x2="380" y2="52" stroke="#4f7fff" stroke-width="2" marker-end="url(#p2f-arrow)"/>
  <text x="340" y="44" text-anchor="middle" font-size="8" font-weight="700" fill="#4f7fff">2026.2</text>
  <rect x="382" y="0" width="298" height="104" rx="9" fill="#eef2fb" stroke="#4f7fff" stroke-width="2"/>
  <rect x="382" y="0" width="298" height="24" rx="9" fill="#0b1f4d"/>
  <rect x="382" y="14" width="298" height="10" fill="#0b1f4d"/>
  <text x="531" y="16" text-anchor="middle" font-size="10" font-weight="700" fill="#eef2fb">After 2026.2</text>
  <text x="531" y="38" text-anchor="middle" font-size="8.5" fill="#14306b">① Enter password</text>
  <text x="531" y="53" text-anchor="middle" font-size="8.5" fill="#14306b">② Passkey biometric scan (2FA ✓)</text>
  <text x="531" y="70" text-anchor="middle" font-size="8.5" fill="#14306b">FIDO2 passkey satisfies the 2FA prompt</text>
  <text x="531" y="88" text-anchor="middle" font-size="8" font-weight="600" fill="#16a34a">No authenticator app code needed</text>
</svg>
</figure>

## Step 1: Set up a passkey in NetSuite first

If you have not already created a passkey in your NetSuite account, do that first. See [How to Enable Passkeys in NetSuite](/resources/netsuite-passkeys) for the setup steps.

Once a passkey is active on your account, the 2FA behavior in 2026.2 works automatically. There is no separate toggle to turn on.

## Step 2: Confirm your passkey is FIDO2-compliant

Not all authentication methods meet the FIDO2 standard. Your passkey qualifies if you created it using:

- **Face ID** (iPhone, iPad)
- **Touch ID** (iPhone, iPad, Mac with Touch ID)
- **Windows Hello** (Windows device with fingerprint reader or face recognition camera)
- A FIDO2-certified hardware security key

Passkeys created through these methods are FIDO2-compliant and will work as a second factor in NetSuite.

## Step 3: Log in to NetSuite

The next time NetSuite prompts for a second factor after your password login:

1. When the 2FA prompt appears, your device will offer the passkey option
2. Authenticate using Face ID, Touch ID, or Windows Hello
3. Login completes without entering a time-based code from an authenticator app

## Should You Keep Your Authenticator App After Enabling a Passkey?

Even with a passkey as your second factor, NetSuite will prompt for your authenticator app code once every three months. This is a built-in fallback, not a malfunction. Keep your authenticator app installed and your account registered so you can complete this prompt when it appears.

## What Should NetSuite Administrators Know About Passkey Second Factors?

Administrators can disable the passkey-as-2FA feature for their account. This reverts all users to the standard authenticator app prompt for 2FA regardless of whether they have a passkey configured.

If your organization has compliance requirements around approved second-factor methods, or if you want to control this rollout, the option to disable it is in your account's authentication settings in NetSuite Setup.

## Who this applies to

Any NetSuite user who:
- Has a FIDO2-compliant passkey set up in their account
- Logs into an account that requires two-factor authentication
- Wants to remove the authenticator app step from their login flow

For more context on the passkey changes in 2026.2, including the distinction between passwordless login and using passkeys as a second factor, see [NetSuite Passkeys Can Now Replace Your Authenticator App: What Changed in 2026.2](/blog/netsuite-passkey-second-factor-2026-2).

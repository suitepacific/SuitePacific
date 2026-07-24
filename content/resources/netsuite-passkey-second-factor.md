---
title: "How to Use a Passkey as Your Second Factor in NetSuite"
description: "Starting in NetSuite 2026.2, a FIDO2-compliant passkey can replace the authenticator app prompt for two-factor authentication. Here is what qualifies and how it works at login."
category: "Administration"
tags: ["Administration", "Security", "Authentication"]
publishedAt: "2026-07-21"
linkedinDay: 23
---

## What changed in 2026.2

Before 2026.2, a passkey in NetSuite handled passwordless login. It replaced your password but did not count as a second authentication factor. If your account required 2FA, you still had to open an authenticator app and enter a code.

From 2026.2 onward, a FIDO2-compliant passkey can satisfy the 2FA requirement. When NetSuite prompts for a second factor, your passkey biometric scan takes the place of the authenticator app code.

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

## Keep your authenticator app installed

Even with a passkey as your second factor, NetSuite will prompt for your authenticator app code once every three months. This is a built-in fallback, not a malfunction. Keep your authenticator app installed and your account registered so you can complete this prompt when it appears.

## If you are a NetSuite administrator

Administrators can disable the passkey-as-2FA feature for their account. This reverts all users to the standard authenticator app prompt for 2FA regardless of whether they have a passkey configured.

If your organization has compliance requirements around approved second-factor methods, or if you want to control this rollout, the option to disable it is in your account's authentication settings in NetSuite Setup.

## Who this applies to

Any NetSuite user who:
- Has a FIDO2-compliant passkey set up in their account
- Logs into an account that requires two-factor authentication
- Wants to remove the authenticator app step from their login flow

For more context on the passkey changes in 2026.2, including the distinction between passwordless login and using passkeys as a second factor, see [NetSuite Passkeys Can Now Replace Your Authenticator App: What Changed in 2026.2](/blog/netsuite-passkey-second-factor-2026-2).

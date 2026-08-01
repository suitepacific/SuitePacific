---
title: "NetSuite Passkeys Now Satisfy the MFA Requirement in 2026.2"
description: "In 2026.2, FIDO2-compliant passkeys count as the second authentication factor in NetSuite, replacing the need for a separate authenticator app. Here is what changed and what it means for your organization's authentication setup."
date: "2026-08-02"
tags: ["Security", "Release Notes", "2026.2", "Admin"]
---

NetSuite 2026.2 extends the role of passkeys in authentication. Passkeys are no longer just an alternative to typing a password; they now satisfy the multi-factor authentication requirement as well.

For users who have already set up a passkey, this means a single biometric action, such as Touch ID, Face ID, or Windows Hello, covers both authentication factors. The separate authenticator app step is no longer required when a passkey is used.

**Managing NetSuite security settings for your organization and want to review your authentication configuration?** SuitePacific works with NetSuite administrators on security reviews and release readiness. [Contact us](/contact).

## How passkeys worked before 2026.2

NetSuite introduced passkey support as a replacement for the traditional username and password login. A passkey is a FIDO2-compliant credential stored on the user's device, verified through the device's built-in authentication method: biometrics on a phone or laptop, or a PIN on a device that does not support biometrics.

Before 2026.2, passkeys handled the first factor. They replaced the password. But if your NetSuite account had multi-factor authentication enabled, users still needed to complete a second factor after authenticating with their passkey, typically through an authenticator app that generates a time-based one-time code.

The result was a two-step process even for users who had set up passkeys: authenticate with the passkey, then open the authenticator app and enter the code.

## What changed in 2026.2

In 2026.2, FIDO2-compliant passkeys satisfy the MFA requirement directly. A passkey is now treated as a second factor on its own, not just a replacement for the first.

For users with a passkey enrolled, the full authentication flow becomes a single step. The device authenticates the user with biometrics or a PIN, and NetSuite accepts that as both factors satisfied.

<figure style="margin:1.75rem 0">
<svg viewBox="0 0 680 200" xmlns="http://www.w3.org/2000/svg" style="width:100%;max-width:680px;display:block;font-family:system-ui,-apple-system,sans-serif">
  <!-- Before column -->
  <rect x="0" y="0" width="300" height="190" rx="10" fill="#fef2f2" stroke="#fca5a5" stroke-width="1.5"/>
  <text x="150" y="26" text-anchor="middle" font-size="11" font-weight="700" fill="#991b1b">Before 2026.2</text>
  <rect x="16" y="38" width="268" height="36" rx="6" fill="#fee2e2" stroke="#fca5a5" stroke-width="1"/>
  <text x="150" y="54" text-anchor="middle" font-size="9.5" font-weight="600" fill="#7f1d1d">Factor 1</text>
  <text x="150" y="68" text-anchor="middle" font-size="8.5" fill="#991b1b">Passkey (Touch ID / Face ID / PIN)</text>
  <rect x="16" y="82" width="268" height="36" rx="6" fill="#fee2e2" stroke="#fca5a5" stroke-width="1"/>
  <text x="150" y="98" text-anchor="middle" font-size="9.5" font-weight="600" fill="#7f1d1d">Factor 2</text>
  <text x="150" y="112" text-anchor="middle" font-size="8.5" fill="#991b1b">Authenticator app one-time code</text>
  <text x="150" y="148" text-anchor="middle" font-size="9" fill="#991b1b">Two separate steps required</text>
  <text x="150" y="166" text-anchor="middle" font-size="9" fill="#7f1d1d">Passkey + authenticator app</text>
  <!-- Arrow -->
  <text x="320" y="103" text-anchor="middle" font-size="22" fill="#6b7280">→</text>
  <!-- After column -->
  <rect x="342" y="0" width="338" height="190" rx="10" fill="#f0fdf4" stroke="#86efac" stroke-width="1.5"/>
  <text x="511" y="26" text-anchor="middle" font-size="11" font-weight="700" fill="#14532d">From 2026.2</text>
  <rect x="358" y="38" width="306" height="60" rx="6" fill="#dcfce7" stroke="#86efac" stroke-width="1"/>
  <text x="511" y="58" text-anchor="middle" font-size="9.5" font-weight="600" fill="#14532d">Factor 1 + Factor 2</text>
  <text x="511" y="74" text-anchor="middle" font-size="8.5" fill="#166534">Passkey satisfies both requirements</text>
  <text x="511" y="90" text-anchor="middle" font-size="8" fill="#166534">(Touch ID / Face ID / Windows Hello / PIN)</text>
  <text x="511" y="130" text-anchor="middle" font-size="9" fill="#14532d">Single step: no authenticator app needed</text>
  <text x="511" y="148" text-anchor="middle" font-size="9" fill="#166534">FIDO2-compliant passkey covers MFA</text>
  <rect x="358" y="162" width="306" height="20" rx="4" fill="#dcfce7"/>
  <text x="511" y="176" text-anchor="middle" font-size="8.5" fill="#14532d">Passkey only</text>
</svg>
<figcaption style="text-align:center;font-size:0.78rem;color:#8aa2d6;margin-top:0.4rem">Before 2026.2, passkeys replaced only the password. From 2026.2, a passkey satisfies both authentication factors.</figcaption>
</figure>

## Why FIDO2 compliance matters for MFA

FIDO2 is an authentication standard that uses public-key cryptography instead of shared secrets. When a user authenticates with a FIDO2 passkey, the device proves possession of a private key that was created specifically for that account. This possession proof, combined with the user verification step (biometrics or PIN), is what makes a passkey qualify as a second factor under the FIDO2 standard.

NetSuite's recognition of this in 2026.2 aligns with how the broader industry treats FIDO2 credentials. A passkey is not a weaker form of authentication than an authenticator app code; it is a different approach that, under FIDO2, provides equivalent or stronger assurance.

## Who this affects

**Users with a passkey already enrolled**

Users who set up a passkey before 2026.2 will now complete authentication in a single step when logging in. If your account has MFA enforcement enabled, they no longer need to complete the authenticator app step after their passkey is verified.

**Users who have not set up a passkey**

Users without a passkey are not affected by this change. Their existing authentication method, including the authenticator app, continues to work. The change only applies when a FIDO2-compliant passkey is the authentication method used.

**NetSuite administrators**

If your account has MFA required for specific roles or all users, the 2026.2 change means passkey-enrolled users are fully compliant through their passkey alone. No additional configuration is needed to recognize passkeys as satisfying MFA; the update handles this at the platform level.

## What this means for your authentication policies

If your organization has guidance about authenticator app usage, those policies may need to be updated to reflect that passkeys now cover the full MFA requirement. Users who set up passkeys do not need to maintain an authenticator app as a backup second factor if they are logging in through their passkey.

If your organization is still on the traditional username, password, and authenticator app flow, this update is a prompt to evaluate passkey adoption. The combination of a simpler login experience and full MFA compliance makes passkeys a strong option for most NetSuite users, particularly on devices that support biometric authentication.

## How SuitePacific can help

Reviewing your NetSuite authentication configuration, communicating authentication changes to your user base, and evaluating whether passkey adoption makes sense for your organization are tasks that benefit from a structured review.

If you are managing a NetSuite environment with MFA requirements and want to understand how the 2026.2 passkey change affects your current setup, [contact SuitePacific](/contact). We work with NetSuite administrators on security configuration and can help you assess what, if anything, needs to change in your authentication policies.

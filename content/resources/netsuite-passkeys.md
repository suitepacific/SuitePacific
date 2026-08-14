---
title: "How to Enable Passkeys in NetSuite for Faster, More Secure Logins"
description: "NetSuite supports passkeys, a passwordless authentication method using Touch ID, Face ID, or Windows Hello. Here is how to set it up and why it is worth doing."
category: "Administration"
tags: ["Administration", "Security", "NetSuite Tips"]
publishedAt: "2026-07-16"
updatedAt: "2026-08-15"
linkedinDay: 16
---

<div style="background:#eef2fb;border:1px solid #b2c2e6;border-radius:10px;padding:1.25rem 1.5rem;margin:2rem 0;font-family:system-ui,-apple-system,sans-serif">
<p style="margin:0 0 0.5rem;font-size:0.7rem;font-weight:700;color:#4f7fff;text-transform:uppercase;letter-spacing:0.08em">Quick answer</p>
<p style="margin:0;color:#14306b;font-size:0.9rem;line-height:1.6">A passkey is a passwordless authentication credential that uses your device's built-in authenticator (Touch ID, Face ID, Windows Hello, or a hardware security key) instead of a typed password. NetSuite supports passkeys as a login method. To set one up: log in to NetSuite, go to Home > Settings > Manage Passkeys, click Add Passkey, complete the device authentication prompt, and give the passkey a name. On subsequent logins, selecting the passkey option replaces the password prompt with a device authentication gesture. Passkeys are phishing-resistant because the credential is stored on your device and never transmitted to the server.</p>
</div>

## Why Are Passwords the Weakest Link in Your Login Security?

Most NetSuite users type a password every day. That password can be guessed, phished, leaked in a data breach, or reused across other services. Even with multi-factor authentication, a password is still a liability.

NetSuite now supports **passkeys:** a modern authentication standard that replaces your password with biometric verification on your trusted device. Once configured, you authenticate with Touch ID, Face ID, Windows Hello, or your device's built-in biometric sensor. No password required.

<figure style="margin:1.75rem 0">
<svg viewBox="0 0 680 108" xmlns="http://www.w3.org/2000/svg" style="width:100%;max-width:680px;display:block;font-family:system-ui,-apple-system,sans-serif">
  <defs>
    <marker id="pk2-arrow" markerWidth="7" markerHeight="7" refX="5" refY="3" orient="auto"><path d="M0,0 L0,6 L7,3 z" fill="#4f7fff"/></marker>
  </defs>
  <rect x="0" y="0" width="300" height="108" rx="9" fill="#f8f9fc" stroke="#d7e0f3" stroke-width="1.5"/>
  <rect x="0" y="0" width="300" height="26" rx="9" fill="#4f6fb0"/>
  <rect x="0" y="16" width="300" height="10" fill="#4f6fb0"/>
  <text x="150" y="18" text-anchor="middle" font-size="10" font-weight="700" fill="#eef2fb">Password Login</text>
  <text x="150" y="42" text-anchor="middle" font-size="8.5" fill="#14306b">Type account ID + email</text>
  <text x="150" y="57" text-anchor="middle" font-size="8.5" fill="#14306b">Type password (can be phished/leaked)</text>
  <text x="150" y="72" text-anchor="middle" font-size="8.5" fill="#14306b">Enter 2FA code from authenticator app</text>
  <text x="150" y="94" text-anchor="middle" font-size="8" fill="#991b1b">Password can be guessed or stolen</text>
  <line x1="300" y1="54" x2="380" y2="54" stroke="#4f7fff" stroke-width="2" marker-end="url(#pk2-arrow)"/>
  <text x="340" y="46" text-anchor="middle" font-size="8" font-weight="700" fill="#4f7fff">passkey</text>
  <rect x="382" y="0" width="298" height="108" rx="9" fill="#eef2fb" stroke="#4f7fff" stroke-width="2"/>
  <rect x="382" y="0" width="298" height="26" rx="9" fill="#0b1f4d"/>
  <rect x="382" y="16" width="298" height="10" fill="#0b1f4d"/>
  <text x="531" y="18" text-anchor="middle" font-size="10" font-weight="700" fill="#eef2fb">Passkey Login</text>
  <text x="531" y="42" text-anchor="middle" font-size="8.5" fill="#14306b">Open NetSuite</text>
  <text x="531" y="57" text-anchor="middle" font-size="8.5" fill="#14306b">Biometric prompt on device</text>
  <text x="531" y="72" text-anchor="middle" font-size="8.5" fill="#14306b">(Face ID / Touch ID / Windows Hello)</text>
  <text x="531" y="94" text-anchor="middle" font-size="8" font-weight="600" fill="#16a34a">Private key never leaves device · phishing-resistant</text>
</svg>
<figcaption style="text-align:center;font-size:0.78rem;color:#8aa2d6;margin-top:0.4rem">A passkey eliminates both the password and the authenticator app step from the login flow.</figcaption>
</figure>

## What is a passkey?

A passkey is a cryptographic credential stored on your device. When you log in, NetSuite sends a challenge to your device, which your biometric sensor verifies locally. The private key never leaves your device, and there is no password to steal.

This makes passkeys:

- **Phishing-resistant:** there is no password for an attacker to trick you into entering
- **Faster:** a fingerprint or face scan takes less than a second
- **Simpler:** nothing to remember, reset, or rotate
- **Cross-device:** works across your trusted Apple, Android, and Windows devices

## Which Authentication Methods Support NetSuite Passkeys?

Once a passkey is configured in NetSuite, you can sign in using:

- **Touch ID** (Mac, iPhone, iPad)
- **Face ID** (iPhone, iPad)
- **Windows Hello** (Windows devices with fingerprint reader or camera)
- Any device with built-in biometric authentication

## How Do You Enable a Passkey in NetSuite?

Enabling a passkey takes under two minutes and requires no IT involvement.

**Step 1: Go to Settings**
In NetSuite, navigate to your account settings. The exact path may vary slightly depending on your NetSuite version, but look for your user menu in the top-right corner.

**Step 2: Click Manage Passkeys**
Inside Settings, find the Manage Passkeys option.

**Step 3: Select Create New**
This initiates the passkey setup process.

**Step 4: Verify your existing credentials**
NetSuite will ask you to confirm your identity once using your current password before creating the passkey.

**Step 5: Follow the prompts to save your passkey**
Your browser or operating system will guide you through saving the passkey to your device using your biometric sensor.

After setup, you will see a **"Log in with a Passkey"** button on the NetSuite sign-in page. Future logins require only a fingerprint or face scan.

## Who should enable this?

Any NetSuite user can enable a passkey independently, no administrator action or organization-wide rollout is required. If you log into NetSuite daily, this is one of the simplest improvements you can make to both your security posture and your login experience.

NetSuite administrators managing accounts with sensitive financial or operational data should consider encouraging their users to enable passkeys as part of a broader access security review.

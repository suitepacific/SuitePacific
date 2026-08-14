---
title: "How to Use Advanced Record Customization (ARC) in NetSuite"
description: "Advanced Record Customization (ARC) is a new area in NetSuite 2026.2 under Customization where you can manage AI descriptions for standard and custom record types. Here is how to access it and what you can do."
category: "Administration"
tags: ["Administration", "Customization", "NetSuite Tips"]
publishedAt: "2026-07-21"
updatedAt: "2026-08-15"
linkedinDay: 26
---

<div style="background:#eef2fb;border:1px solid #b2c2e6;border-radius:10px;padding:1.25rem 1.5rem;margin:2rem 0;font-family:system-ui,-apple-system,sans-serif">
<p style="margin:0 0 0.5rem;font-size:0.7rem;font-weight:700;color:#4f7fff;text-transform:uppercase;letter-spacing:0.08em">Quick answer</p>
<p style="margin:0;color:#14306b;font-size:0.9rem;line-height:1.6">Advanced Record Customization (ARC) in NetSuite 2026.2 is a new area under Customization that lets administrators manage AI descriptions for standard and custom record types. These descriptions inform NetSuite's AI features how to interpret and work with each record type. ARC is accessible at Customization > Advanced Record Customization. Select a record type to view its current AI description, create a custom description if none exists, or edit the existing one. Custom descriptions are account-specific and take precedence over NetSuite's defaults. Only one description can be active per record type at a time.</p>
</div>

## What Advanced Record Customization is

Advanced Record Customization (ARC) is a new feature in NetSuite 2026.2 that gives you a centralized place to manage AI descriptions for record types. An AI description is a short text (up to 280 characters) that tells NetSuite's AI Connector Service what a record type is and how it is used in your account. These descriptions inform AI-powered features and MCP-based integrations connected to your NetSuite instance.

<figure style="margin:1.75rem 0">
<svg viewBox="0 0 680 90" xmlns="http://www.w3.org/2000/svg" style="width:100%;max-width:680px;display:block;font-family:system-ui,-apple-system,sans-serif">
  <rect x="200" y="0" width="280" height="20" rx="5" fill="#060f26" stroke="#4f7fff" stroke-width="1.5"/>
  <text x="340" y="14" text-anchor="middle" font-size="8.5" font-weight="700" fill="#8aa2d6" font-family="monospace">Customization > Advanced Record Customization</text>
  <rect x="0" y="30" width="120" height="48" rx="6" fill="#eef2fb" stroke="#4f7fff" stroke-width="1.5"/>
  <text x="60" y="50" text-anchor="middle" font-size="9.5" font-weight="700" fill="#14306b">View</text>
  <text x="60" y="65" text-anchor="middle" font-size="7.5" fill="#4f6fb0">Current description</text>
  <text x="60" y="75" text-anchor="middle" font-size="7.5" fill="#4f6fb0">default or custom</text>
  <rect x="140" y="30" width="120" height="48" rx="6" fill="#eef2fb" stroke="#4f7fff" stroke-width="1.5"/>
  <text x="200" y="50" text-anchor="middle" font-size="9.5" font-weight="700" fill="#14306b">Create</text>
  <text x="200" y="65" text-anchor="middle" font-size="7.5" fill="#4f6fb0">New description</text>
  <text x="200" y="75" text-anchor="middle" font-size="7.5" fill="#4f6fb0">up to 280 chars</text>
  <rect x="280" y="30" width="120" height="48" rx="6" fill="#eef2fb" stroke="#4f7fff" stroke-width="1.5"/>
  <text x="340" y="50" text-anchor="middle" font-size="9.5" font-weight="700" fill="#14306b">Update</text>
  <text x="340" y="65" text-anchor="middle" font-size="7.5" fill="#4f6fb0">Edit for your</text>
  <text x="340" y="75" text-anchor="middle" font-size="7.5" fill="#4f6fb0">account's usage</text>
  <rect x="420" y="30" width="120" height="48" rx="6" fill="#eef2fb" stroke="#b2c2e6" stroke-width="1.5"/>
  <text x="480" y="50" text-anchor="middle" font-size="9.5" font-weight="700" fill="#14306b">Compare</text>
  <text x="480" y="65" text-anchor="middle" font-size="7.5" fill="#4f6fb0">Custom vs. default</text>
  <text x="480" y="75" text-anchor="middle" font-size="7.5" fill="#4f6fb0">or partner version</text>
  <rect x="560" y="30" width="120" height="48" rx="6" fill="#eef2fb" stroke="#b2c2e6" stroke-width="1.5"/>
  <text x="620" y="50" text-anchor="middle" font-size="9.5" font-weight="700" fill="#14306b">Revert</text>
  <text x="620" y="65" text-anchor="middle" font-size="7.5" fill="#4f6fb0">Back to original</text>
  <text x="620" y="75" text-anchor="middle" font-size="7.5" fill="#4f6fb0">NetSuite default</text>
</svg>
</figure>

## Step 1: Go to Advanced Record Customization

Navigate to **Customization > Advanced Record Customization**.

This section is new in 2026.2. If you do not see it, confirm that your account is on the 2026.2 release.

## Step 2: Select a record type

From the Advanced Record Customization page, select the record type you want to manage. Both standard NetSuite record types and custom record types you have created in your account are available here.

## Step 3: View the current AI description

When you open a record type in ARC, you can see its current AI description. This may be:

- The default description provided by NetSuite
- A description added by a partner solution or bundle installed in your account
- A custom description you have previously set

## Step 4: Create or update the AI description

If the current description does not accurately reflect how the record type is used in your account, you can write a new one. The description is limited to **280 characters**.

A good AI description is specific to your account. If your account uses a standard record type in an unusual way, the description should reflect that. For example, if your Opportunity record is used for internal projects rather than external sales, say so in the description. This helps the AI connector return more relevant results.

## Step 5: Compare descriptions

ARC lets you compare your custom description against:

- The default NetSuite description for the record type
- The description from a partner solution installed in your account

Use this to check whether your customization is significantly different from the default, or to decide whether the default description is actually accurate enough for your account.

## Step 6: Revert if needed

If you have set a custom description and want to go back to the original, you can revert. This restores either the NetSuite default or the partner solution description, depending on which one was in place before your customization.

## What to know about scope

AI descriptions set in ARC apply at the **account level**. They override both the default NetSuite descriptions and any descriptions added by partner solutions or installed bundles. Your custom description takes precedence.

## Who should use ARC

Advanced Record Customization is most useful for:

- Administrators managing accounts that use NetSuite's AI Connector Service
- Accounts where AI-powered features return results that seem off because the default record descriptions do not match how records are actually used
- Developers building or configuring MCP integrations that read from NetSuite

For background on why ARC was introduced and how it fits into NetSuite's AI direction, see [NetSuite Advanced Record Customization: A New Place to Manage AI Descriptions for Your Records](/blog/netsuite-advanced-record-customization-2026-2).

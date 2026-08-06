---
title: "NetSuite Advanced Record Customization: A New Place to Manage AI Descriptions for Your Records"
description: "NetSuite 2026.2 introduces Advanced Record Customization (ARC), a centralized area under Customization where you can view, create, update, compare, and revert AI descriptions for standard and custom record types."
date: "2026-07-21"
updated: "2026-08-05"
tags: ["Administration", "Customization", "NetSuite Tips"]
---

NetSuite 2026.2 adds a new section called **Advanced Record Customization**, accessible under the Customization menu. It gives administrators a centralized place to manage AI descriptions for both standard and custom record types.

<figure style="margin:1.75rem 0">
<svg viewBox="0 0 680 130" xmlns="http://www.w3.org/2000/svg" style="width:100%;max-width:680px;display:block;font-family:system-ui,-apple-system,sans-serif">
  <text x="340" y="14" text-anchor="middle" font-size="10" font-weight="700" fill="#14306b" letter-spacing="0.05em">ADVANCED RECORD CUSTOMIZATION (ARC): 2026.2</text>
  <!-- Menu path -->
  <rect x="200" y="22" width="280" height="22" rx="5" fill="#060f26" stroke="#4f7fff" stroke-width="1.5"/>
  <text x="340" y="37" text-anchor="middle" font-size="8.5" font-weight="700" fill="#8aa2d6" font-family="monospace">Customization > Advanced Record Customization</text>
  <!-- 5 actions in a row -->
  <rect x="0" y="58" width="120" height="52" rx="6" fill="#eef2fb" stroke="#b2c2e6" stroke-width="1.5"/>
  <text x="60" y="79" text-anchor="middle" font-size="9.5" font-weight="700" fill="#14306b">View</text>
  <text x="60" y="93" text-anchor="middle" font-size="8" fill="#4f6fb0">Current description</text>
  <text x="60" y="103" text-anchor="middle" font-size="8" fill="#4f6fb0">default or custom</text>
  <rect x="140" y="58" width="120" height="52" rx="6" fill="#eef2fb" stroke="#4f7fff" stroke-width="1.5"/>
  <text x="200" y="79" text-anchor="middle" font-size="9.5" font-weight="700" fill="#14306b">Create</text>
  <text x="200" y="93" text-anchor="middle" font-size="8" fill="#4f6fb0">New AI description</text>
  <text x="200" y="103" text-anchor="middle" font-size="8" fill="#4f6fb0">up to 280 chars</text>
  <rect x="280" y="58" width="120" height="52" rx="6" fill="#eef2fb" stroke="#4f7fff" stroke-width="1.5"/>
  <text x="340" y="79" text-anchor="middle" font-size="9.5" font-weight="700" fill="#14306b">Update</text>
  <text x="340" y="93" text-anchor="middle" font-size="8" fill="#4f6fb0">Edit existing to match</text>
  <text x="340" y="103" text-anchor="middle" font-size="8" fill="#4f6fb0">your account's usage</text>
  <rect x="420" y="58" width="120" height="52" rx="6" fill="#eef2fb" stroke="#b2c2e6" stroke-width="1.5"/>
  <text x="480" y="79" text-anchor="middle" font-size="9.5" font-weight="700" fill="#14306b">Compare</text>
  <text x="480" y="93" text-anchor="middle" font-size="8" fill="#4f6fb0">Custom vs. default</text>
  <text x="480" y="103" text-anchor="middle" font-size="8" fill="#4f6fb0">or partner description</text>
  <rect x="560" y="58" width="120" height="52" rx="6" fill="#eef2fb" stroke="#b2c2e6" stroke-width="1.5"/>
  <text x="620" y="79" text-anchor="middle" font-size="9.5" font-weight="700" fill="#14306b">Revert</text>
  <text x="620" y="93" text-anchor="middle" font-size="8" fill="#4f6fb0">Back to original</text>
  <text x="620" y="103" text-anchor="middle" font-size="8" fill="#4f6fb0">NetSuite default</text>
  <text x="340" y="124" text-anchor="middle" font-size="8" fill="#8aa2d6">AI descriptions tell NetSuite's AI Connector what each record type is used for. More accurate descriptions produce more relevant AI output.</text>
</svg>
</figure>

## What Advanced Record Customization is

Advanced Record Customization (ARC) is a new area in NetSuite for managing AI-level metadata on record types. In 2026.2, its primary function is managing AI descriptions.

An AI description is a short piece of text (up to 280 characters) that describes what a record type is and how it is used in your account. NetSuite's AI Connector Service reads these descriptions when generating AI-powered responses and actions, including integrations built on MCP (Model Context Protocol). A more accurate description leads to more relevant AI output.

## Where to find it

Go to **Customization > Advanced Record Customization**.

From here you can select any standard or custom record type and manage its AI description.

## What you can do in ARC

For each record type, ARC lets you:

- **View** the current AI description (default from NetSuite or a customized one)
- **Create** a new description for a record type that does not have one
- **Update** the existing description to better reflect how you use the record in your account
- **Compare** your custom description against the default NetSuite description or a description from a partner solution
- **Revert** to the original description if a customization is not working as expected

## Account-level scope

AI descriptions set in ARC apply at the account level. This means your custom descriptions override both the default NetSuite descriptions and any descriptions added by partner solutions or bundles installed in your account. This gives administrators direct control over what the AI connector sees when it reads your record types.

## The 280-character limit

Each AI description is capped at 280 characters. That is enough for a clear, specific description but forces you to be concise. A good AI description names what the record is used for in your specific account, not just what it is in general.

For example, if your account uses the Opportunity record type in a non-standard way (for internal projects, not external sales), an accurate description of that distinction will produce better results from any AI tool connected to NetSuite.

## Who should use this

Advanced Record Customization is most relevant for:

- NetSuite administrators who use AI tools integrated with their NetSuite account
- Accounts using NetSuite's AI Connector Service or MCP-based integrations
- Accounts where standard NetSuite record descriptions do not match how the records are actually used

If your account does not use AI integrations yet, this feature has no immediate impact. But as AI connectivity with NetSuite expands, accurate record descriptions will become more important.

For step-by-step instructions on using ARC, see [How to Use Advanced Record Customization (ARC) in NetSuite](/resources/netsuite-advanced-record-customization).

Keeping your NetSuite account configuration current as features expand is part of what [SuitePacific's post-go-live support](/netsuite-post-go-live-support) covers.

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
<figcaption style="text-align:center;font-size:0.78rem;color:#8aa2d6;margin-top:0.4rem">Advanced Record Customization (ARC) in 2026.2 lets administrators view the current record description and create a new AI-generated description up to 280 characters, accessible at Customization &gt; Advanced Record Customization.</figcaption>
</figure>

<div style="background:#eef2fb;border:1px solid #b2c2e6;border-radius:10px;padding:1.25rem 1.5rem;margin:2rem 0;font-family:system-ui,-apple-system,sans-serif">
<p style="margin:0 0 0.5rem;font-size:0.7rem;font-weight:700;color:#4f7fff;text-transform:uppercase;letter-spacing:0.08em">Quick answer</p>
<p style="margin:0;color:#14306b;font-size:0.9rem;line-height:1.6">Advanced Record Customization (ARC) is a new section in NetSuite 2026.2, found at Customization &gt; Advanced Record Customization, that gives administrators a central place to manage AI descriptions for standard and custom record types. An AI description is a short text up to 280 characters that tells NetSuite's AI Connector Service what a record type is used for in the account. ARC lets administrators view the current description, create a new one, update an existing one, compare a custom description against the NetSuite default or a partner description, and revert to the original if needed. Custom descriptions set in ARC apply at the account level and override both the default NetSuite descriptions and any descriptions added by partner bundles. The feature is most relevant for accounts using AI integrations built on NetSuite's AI Connector Service or MCP (Model Context Protocol). More accurate record descriptions produce more relevant AI responses for that record type.</p>
</div>

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

## How to write a good AI description

A good AI description for a record type names what that record is specifically used for in your account, not just what the record type is in general. NetSuite's default description for the Opportunity record type describes it in general sales terms. If your account uses Opportunity records for internal project tracking rather than external sales, a description that reflects that distinction will produce more relevant AI responses.

The 280-character limit is enough for a clear, specific description. A good format is: who creates this record, when they create it, and what it represents in your business process. For example: "Created by project managers when a new client engagement is confirmed. Tracks scope, timeline, and assigned resources for a fixed-fee implementation project."

## Frequently asked questions

**Q: Do I need special permissions to access Advanced Record Customization?**
A: Administrator access is required to create or update AI descriptions for record types in ARC.

**Q: What happens if I revert a custom description?**
A: Reverting replaces the custom description with the original NetSuite default for that record type, or the partner description if one was installed with a bundle. You can create a new custom description again at any time.

**Q: Does ARC affect all users in the account?**
A: Yes. AI descriptions set in ARC apply at the account level, affecting any AI integration that reads record descriptions for that NetSuite account.

**Q: Does setting an AI description change how the record type looks or behaves in NetSuite?**
A: No. AI descriptions are metadata read by AI integrations. They do not change the record type's fields, forms, layout, or behavior in the standard NetSuite interface.

Keeping your NetSuite account configuration current as features expand is part of what [SuitePacific's post-go-live support](/netsuite-post-go-live-support) covers.

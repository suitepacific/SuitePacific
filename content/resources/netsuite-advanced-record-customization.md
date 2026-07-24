---
title: "How to Use Advanced Record Customization (ARC) in NetSuite"
description: "Advanced Record Customization (ARC) is a new area in NetSuite 2026.2 under Customization where you can manage AI descriptions for standard and custom record types. Here is how to access it and what you can do."
category: "Administration"
tags: ["Administration", "Customization", "NetSuite Tips"]
publishedAt: "2026-07-21"
linkedinDay: 26
---

## What Advanced Record Customization is

Advanced Record Customization (ARC) is a new feature in NetSuite 2026.2 that gives you a centralized place to manage AI descriptions for record types. An AI description is a short text (up to 280 characters) that tells NetSuite's AI Connector Service what a record type is and how it is used in your account. These descriptions inform AI-powered features and MCP-based integrations connected to your NetSuite instance.

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

---
title: "Advanced PDF Templates in NetSuite: 5 Mistakes That Break in Production"
description: "The most common Advanced PDF/HTML template mistakes in NetSuite, from conditional logic to edge-case data, and how to avoid documents that fail silently on real transactions."
date: "2026-06-29"
tags: ["Advanced PDF", "Templates"]
---

A new Advanced PDF template almost always passes testing. The failures usually surface weeks later, on a specific customer's invoice or a transaction with unusual data, and by then nobody remembers what the template was supposed to handle. Five causes account for most of what we end up fixing.

## 1. Maintaining near-identical templates instead of one template with conditions

The most common pattern we find is three or four templates that are 90% identical, one for each customer type or region, copied and tweaked instead of built once. Every future change then has to be made three or four times, and it's only a matter of time before one copy gets missed. FreeMarker's `<#if>` and `<#else>` blocks can handle almost all of this branching inside a single template, keyed off a field on the record. One template to maintain beats four that drift apart.

## 2. Pulling sublist data through nested joins you don't actually need

PDF generation that joins three or four levels deep to pull a single field (going through an item, to its vendor, to that vendor's category, for example) is slow to render and fragile when any link in that chain is empty. Where possible, pull the value onto the transaction or line directly via a saved search or script at save time, and reference that flat field in the template instead of joining live at print time.

## 3. Confusing transaction-level fields with line-level (sublist) fields

`${record.entity}` and a line-level reference inside a `<#list record.item as item>` loop live in different scopes, and mixing them up is the single most common syntax mistake in a new template. A field that works perfectly in the header section will silently print blank, or throw an error, if referenced incorrectly inside the line loop, or vice versa. When a field "isn't showing up," this is the first thing worth checking.

## 4. Only testing with clean, typical records

Templates that work fine in testing often break the first time they hit a real transaction with zero line items, a description field with special characters, or an address with a missing field. Before deploying a template, pull the messiest real record in the account and test against that, not a clean sample built for the demo.

## 5. Editing live templates with no backup

Advanced PDF templates are usually edited directly in the production environment, since there's no built-in version history. A typo in a conditional block can mean every invoice generated until someone notices prints incorrectly or fails outright. Paste the working version into a text file before touching anything, so there's something to revert to if the edit goes wrong.

---

Advanced PDF templates are one of the easiest things to get visually right and functionally fragile at the same time. Building and hardening them against real-world data is part of our [advanced PDF template service](/#services); see our [Advanced PDF Document Automation case study](/#case-studies) for what that looks like in practice. If your invoices, statements, or forms break on certain customers or transaction types, [book a free consultation](/#contact) and we'll help you track down why. For a related read, see [SuiteScript Best Practices](/blog/suitescript-best-practices).

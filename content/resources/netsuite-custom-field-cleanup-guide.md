---
title: "NetSuite Custom Field and Record Cleanup Guide"
description: "How to identify and safely remove unused or redundant custom fields and custom records from a live NetSuite account: what to check before deleting anything, how to find hidden dependencies, and how to sequence cleanup without breaking active automations."
publishedAt: "2026-08-18"
tags: ["Technical Debt", "Account Optimization"]
---

Custom field and record cleanup is one of the most impactful forms of technical debt remediation in a live NetSuite account. Unused fields add to every form load, clutter every saved search field picker, and confuse new users and developers. Unused custom records add to global navigation and create confusion about where data lives.

The risk in cleanup is deletion without understanding dependencies. A custom field that appears unused may be referenced in a script, a saved search used inside a workflow entry condition, or an integration transformation. Deleting it breaks the thing that references it.

This guide covers how to find dependencies before deleting, how to sequence cleanup safely, and what documentation to create as you go.

---

## Part 1: Building the custom field inventory

Before any deletion, build a complete inventory of custom fields on the record types you are reviewing.

### Which record types to prioritize

Start with the record types that carry the most traffic and the most customization history:

- Sales Order
- Invoice
- Purchase Order
- Vendor Bill
- Customer
- Item (all item types: Inventory, Non-Inventory, Service, Assembly)
- Employee (if HR workflows are in scope)

Custom record types come after standard record types; they are typically easier to assess because they have fewer system-level dependencies.

### Getting the field list

Navigate to: Customization > Lists, Records & Fields > Transaction Body Fields (for transaction records) or Entity Fields (for customer, employee, etc.) or Item Fields.

Filter by record type. Export the list to a spreadsheet or work through it in the interface. For each field, record:

- Field Name (the internal ID, e.g., `custbody_approval_code`)
- Field Label (what users see)
- Field Type (Text, Integer, Date, List, Checkbox, etc.)
- Record Type

---

## Part 2: Checking dependencies before any deletion

For each custom field in the inventory, check all four dependency types before marking it as safe to delete.

### Dependency 1: Active saved searches

Open Saved Searches (Reports > Saved Searches or Lists > Search > Saved Searches) and search for the field's internal ID in:

- Filter criteria (the Criteria tab of any saved search)
- Result columns (the Results tab)
- Formula fields that reference it

A saved search referencing a deleted field will break: it will either throw an error or silently return incorrect results depending on where the field appears.

**Practical approach:** Use NetSuite's Global Search to search for the field's internal ID text across saved searches. Alternatively, if you have SuiteScript access, a server-side script can query all saved searches for a specific field reference using N/search and examining search filter and column definitions.

### Dependency 2: Scripts

Search the script file cabinet for the field's internal ID. Navigate to Documents > Files > SuiteScripts (or the directory where scripts are stored). Use the file cabinet search or download scripts and search locally.

Common patterns to look for:
- `record.getValue({fieldId: 'custbody_approval_code'})`
- `record.setValue({fieldId: 'custbody_approval_code', value: ...})`
- `'custbody_approval_code'` as a string literal

A script that reads a deleted field will either return null (if the field no longer exists) or throw an error depending on how the script handles missing fields. Scripts that write to a deleted field will throw an error.

### Dependency 3: Workflows

Open each active workflow on the same record type as the field. In the workflow editor, look for:

- Conditions that reference the field
- Actions that read or write the field
- Entry conditions that use a saved search referencing the field

Workflow references to deleted fields typically produce errors when the workflow attempts to evaluate the condition or execute the action that uses the field.

### Dependency 4: Integrations and middleware

If the account uses any integrations that sync data to or from NetSuite, check whether those integrations reference the field. This check is outside NetSuite itself; you need to review the integration configuration in whatever platform manages the sync (Celigo, Boomi, a custom REST integration, etc.).

Integration references to deleted fields vary in behavior: some integrations will fail to sync records, others will silently skip the field, and others will throw an error and halt the sync.

---

## Part 3: Assessing whether a field is actually unused

A field with no dependencies in scripts, saved searches, workflows, or integrations is a strong candidate for cleanup. Confirm with two additional checks:

### Check 1: Data presence

How many records of this type have a non-empty value in this field? In NetSuite, build a saved search for the record type, filter by the field "is not empty," and count the results.

A field with data in zero records has never been used or was cleared. A field with data in more than 5% of records may have been used historically even if it is not currently referenced in any automation.

**Do not delete fields with significant data without first confirming the business no longer needs that data.** Even if a field is unused by automations, it may contain historical data that business users consider important.

### Check 2: Form presence

Open the active form(s) for the record type (Customization > Forms > Transaction Forms or Entry Forms). Check whether the field appears on any active form.

A field that is not on any active form is invisible to users working through the UI. It may still be set programmatically. Combined with the dependency checks above, a field that is both off all active forms and not referenced in any automation is almost certainly unused.

---

## Part 4: Safe deletion sequence

Delete in this order to minimize risk:

**Step 1: Remove from forms first.**
If the field is still on any form, remove it from the form before deleting the field record. This confirms the field is not visible to users and gives a testing window before the field is permanently deleted.

**Step 2: Test in Sandbox.**
In a Sandbox environment with the same customizations as Production, delete the field and run through the affected record's primary save paths (UI save, CSV import if applicable, API call if applicable). Confirm no errors are thrown.

**Step 3: Delete in Production.**
After Sandbox confirmation, delete the field in Production.

**Never delete custom fields directly in Production without Sandbox testing first.**

---

## Part 5: Custom records

Custom record cleanup follows the same dependency-check pattern as custom field cleanup, with one additional consideration: custom records can be related to other records via relationship fields.

### What to check before deleting a custom record type

- **Record count:** How many records exist in this custom record type? A record type with zero records has never been used or was cleared. A record type with hundreds of records may hold historical data.
- **Related record fields on other record types:** Is there a field on another record type (a Sales Order field, for example) that stores a reference to this custom record type? Deleting the custom record type will break that relationship field.
- **Script references:** Same check as for custom fields; search script files for the custom record type's internal ID.
- **Workflow references:** Same check as for custom fields; review workflows on related record types.
- **Saved search references:** Custom records can be the primary record type in a saved search, or they can be joined to other record types in a search.

---

## Part 6: Documentation as you clean

Cleanup is most valuable when it also reduces the risk of the same fields being recreated in the future. Document each deleted field or record:

**What to record:**
- Internal ID of the deleted field or record type
- Label
- Record type it was on
- Reason for deletion (no data, no references, retired with business process X)
- Date deleted
- Who deleted it

This documentation serves two purposes: it prevents a future developer from wondering whether a field that is "missing" was intentionally removed, and it provides an audit trail if a deletion turns out to have been premature.

Store this documentation in a location that the full team can access: an internal wiki, a shared document, or as comments in the technical debt findings report.

---

## Related resources

- [NetSuite technical debt audit checklist](/resources/netsuite-technical-debt-audit-checklist): full five-layer audit checklist including custom fields and records
- [NetSuite technical debt](/netsuite-technical-debt): how custom field and record debt accumulates in live accounts
- [NetSuite health check](/netsuite-health-check): independent assessment that identifies unused fields and records as part of the full findings report
- [NetSuite account optimization](/netsuite-account-optimization): remediation services including custom field and record cleanup

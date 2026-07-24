---
title: "NetSuite User Event Script vs Client Script: When to Use Each"
description: "User Event scripts run on the server. Client scripts run in the browser. Choosing the wrong one means your business logic silently fails whenever records are saved via API, CSV import, or workflow. Learn the distinction and how to apply it."
category: "SuiteScript"
tags: ["SuiteScript", "User Event", "Client Script", "Best Practices"]
publishedAt: "2026-07-02"
linkedinDay: 2
---

## Two script types, two execution environments

SuiteScript provides two script types for record-level logic: User Event scripts and Client scripts. They look similar in purpose, both respond to record actions, but they run in entirely different environments and serve entirely different functions.

**User Event scripts run on the server.** They execute before or after a record is submitted, on NetSuite's infrastructure, regardless of how the save originated.

**Client scripts run in the browser.** They execute while a user is actively interacting with a form, on the user's device, and only when the record is opened in the NetSuite UI.

Mixing up which type belongs where is one of the most common sources of missing business logic in NetSuite accounts.

## User Event scripts: server-side, always runs

A User Event script fires on every save of a record, regardless of the save origin:

- A user saving a record through the UI
- A CSV import creating records in bulk
- An API call from an integration
- A workflow updating the record
- Another script calling `record.save()` or `record.submitFields()`

This is the key characteristic: **User Event scripts run every time**. They do not depend on the user interface being present.

This makes them the correct choice for:
- **Business logic that must always execute:** field calculations, derived values, business rule enforcement
- **Data validation:** rejecting saves that don't meet specific conditions
- **Integrations and downstream actions:** updating related records, calling external systems after a save

```javascript
// User Event - beforeSubmit
// Runs on every save, regardless of origin
function beforeSubmit(context) {
    var margin = calculateMargin(context.newRecord);
    context.newRecord.setValue({
        fieldId: 'custbody_margin',
        value: margin
    });
}
```

## Client scripts: browser-side, only when using the UI

A Client script runs in the user's browser while they are working on a form. It responds to events like field changes, page load, and form submission, but only when the record is open in the NetSuite UI.

If a record is saved via API, import, or workflow, no Client script fires. The browser is not involved.

This makes Client scripts the correct choice for:
- **Real-time field validation:** showing an error before the user submits
- **Dynamic field visibility:** showing or hiding fields based on other field values
- **Defaulting and auto-population:** filling in fields as the user works
- **Guiding users:** warning messages, field suggestions, UX improvements

```javascript
// Client Script - fieldChanged
// Only fires when a user changes a field in the UI
function fieldChanged(scriptContext) {
    if (scriptContext.fieldId === 'custbody_category') {
        var category = scriptContext.currentRecord.getValue('custbody_category');
        // Show or hide fields based on selection
    }
}
```

## The most common mistake

Putting critical business logic in a Client script.

A developer writes a Client script that validates a field, calculates a value, or enforces a business rule. It works perfectly when tested in the UI. Then a CSV import runs, an integration updates the record via API, or a workflow modifies the record, and the Client script never fires.

The logic that was supposed to run on every save runs on none of those saves. The error is silent: no failure, no log entry, just missing data.

If a field calculation, validation, or business rule must apply every time a record is saved, regardless of who or what saved it, it belongs in a User Event script.

## The rule

**Server-side for business rules.** If the logic must run every time the record is saved, use a User Event script.

**Client-side for user experience.** If the logic is about guiding the user through the form, showing fields, setting defaults, real-time feedback, use a Client script.

When in doubt, ask: "Does this need to run when someone saves via API or import?" If yes, it is a User Event script.

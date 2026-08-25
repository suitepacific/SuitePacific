---
title: "NetSuite User Event Script vs Client Script: When to Use Each"
description: "User Event scripts run on the server. Client scripts run in the browser. Choosing the wrong one means your business logic silently fails whenever records are saved via API, CSV import, or workflow. Learn the distinction and how to apply it."
category: "SuiteScript"
tags: ["SuiteScript", "User Event", "Client Script", "Best Practices"]
publishedAt: "2026-07-02"
updatedAt: "2026-08-15"
linkedinDay: 2
---

<div style="background:#eef2fb;border:1px solid #b2c2e6;border-radius:10px;padding:1.25rem 1.5rem;margin:2rem 0;font-family:system-ui,-apple-system,sans-serif">
<p style="margin:0 0 0.5rem;font-size:0.7rem;font-weight:700;color:#4f7fff;text-transform:uppercase;letter-spacing:0.08em">Quick answer</p>
<p style="margin:0;color:#14306b;font-size:0.9rem;line-height:1.6">In NetSuite SuiteScript, User Event scripts run server-side and fire on every record save regardless of how the save was triggered: UI, API, CSV import, workflow, or Mass Update. Client scripts run browser-side and fire only when a user is working in the record form in the web UI. If business logic must run on every save (validation, field computation, downstream record creation), use a User Event script. If logic needs to respond to a user interacting with the form (field changes, button clicks, page load in the browser), use a Client Script. The most common mistake is using a Client Script for validation that silently fails when the record is saved via API or CSV import. When the same rule needs to run both in the browser and on the server, implement it in both script types: Client Script for immediate user feedback, User Event script for server-side enforcement.</p>
</div>

## What Is the Difference Between a User Event Script and a Client Script?

SuiteScript provides two script types for record-level logic: User Event scripts and Client scripts. They look similar in purpose, both respond to record actions, but they run in entirely different environments and serve entirely different functions.

**User Event scripts run on the server.** They execute before or after a record is submitted, on NetSuite's infrastructure, regardless of how the save originated.

**Client scripts run in the browser.** They execute while a user is actively interacting with a form, on the user's device, and only when the record is opened in the NetSuite UI.

Mixing up which type belongs where is one of the most common sources of missing business logic in NetSuite accounts.

<figure style="margin:1.75rem 0">
<svg viewBox="0 0 680 168" xmlns="http://www.w3.org/2000/svg" style="width:100%;max-width:680px;display:block;font-family:system-ui,-apple-system,sans-serif">
  <!-- Left: User Event -->
  <rect x="0" y="0" width="320" height="168" rx="9" fill="#eef2fb" stroke="#4f7fff" stroke-width="1.5"/>
  <rect x="0" y="0" width="320" height="30" rx="9" fill="#0b1f4d"/>
  <rect x="0" y="20" width="320" height="10" fill="#0b1f4d"/>
  <text x="160" y="20" text-anchor="middle" font-size="10" font-weight="700" fill="#eef2fb">User Event Script: server-side</text>
  <text x="160" y="50" text-anchor="middle" font-size="9" font-weight="700" fill="#14306b">Fires on every save, regardless of source:</text>
  <rect x="16" y="58" width="288" height="14" rx="3" fill="#d7e0f3"/>
  <text x="160" y="69" text-anchor="middle" font-size="8.5" fill="#14306b">UI save by a logged-in user</text>
  <rect x="16" y="76" width="288" height="14" rx="3" fill="#d7e0f3"/>
  <text x="160" y="87" text-anchor="middle" font-size="8.5" fill="#14306b">CSV import (bulk record creation)</text>
  <rect x="16" y="94" width="288" height="14" rx="3" fill="#d7e0f3"/>
  <text x="160" y="105" text-anchor="middle" font-size="8.5" fill="#14306b">REST or SOAP API call from integration</text>
  <rect x="16" y="112" width="288" height="14" rx="3" fill="#d7e0f3"/>
  <text x="160" y="123" text-anchor="middle" font-size="8.5" fill="#14306b">Workflow action update</text>
  <rect x="16" y="130" width="288" height="14" rx="3" fill="#d7e0f3"/>
  <text x="160" y="141" text-anchor="middle" font-size="8.5" fill="#14306b">Another script calling record.save()</text>
  <text x="160" y="160" text-anchor="middle" font-size="8" font-weight="700" fill="#4f7fff">Validation · field updates · notifications</text>
  <!-- Right: Client Script -->
  <rect x="360" y="0" width="320" height="168" rx="9" fill="#fffbeb" stroke="#fde68a" stroke-width="1.5"/>
  <rect x="360" y="0" width="320" height="30" rx="9" fill="#92400e"/>
  <rect x="360" y="20" width="320" height="10" fill="#92400e"/>
  <text x="520" y="20" text-anchor="middle" font-size="10" font-weight="700" fill="#fef9c3">Client Script: browser-side</text>
  <text x="520" y="50" text-anchor="middle" font-size="9" font-weight="700" fill="#713f12">Fires only when user is in the UI:</text>
  <rect x="376" y="58" width="288" height="14" rx="3" fill="#fde68a" opacity="0.5"/>
  <text x="520" y="69" text-anchor="middle" font-size="8.5" fill="#92400e">UI save (only this one, nothing else)</text>
  <rect x="376" y="76" width="288" height="14" rx="3" fill="#d1fae5" opacity="0.5"/>
  <text x="520" y="87" text-anchor="middle" font-size="8.5" fill="#6b7280">CSV import: Client script does NOT fire</text>
  <rect x="376" y="94" width="288" height="14" rx="3" fill="#d1fae5" opacity="0.5"/>
  <text x="520" y="105" text-anchor="middle" font-size="8.5" fill="#6b7280">REST/SOAP API: Client script does NOT fire</text>
  <rect x="376" y="112" width="288" height="14" rx="3" fill="#d1fae5" opacity="0.5"/>
  <text x="520" y="123" text-anchor="middle" font-size="8.5" fill="#6b7280">Workflow: Client script does NOT fire</text>
  <rect x="376" y="130" width="288" height="14" rx="3" fill="#d1fae5" opacity="0.5"/>
  <text x="520" y="141" text-anchor="middle" font-size="8.5" fill="#6b7280">Script save: Client script does NOT fire</text>
  <text x="520" y="160" text-anchor="middle" font-size="8" font-weight="700" fill="#92400e">Field change reactions · UI helpers · live validation</text>
</svg>
<figcaption style="text-align:center;font-size:0.78rem;color:#8aa2d6;margin-top:0.4rem">If the logic must run every time a record is saved: use User Event. If it reacts to user interaction in the form: use Client Script.</figcaption>
</figure>

## How Do User Event Scripts Execute in NetSuite?

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

## How Do Client Scripts Execute in NetSuite?

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

## What Is the Most Common Mistake When Choosing a Script Type?

Putting critical business logic in a Client script.

A developer writes a Client script that validates a field, calculates a value, or enforces a business rule. It works perfectly when tested in the UI. Then a CSV import runs, an integration updates the record via API, or a workflow modifies the record, and the Client script never fires.

The logic that was supposed to run on every save runs on none of those saves. The error is silent: no failure, no log entry, just missing data.

If a field calculation, validation, or business rule must apply every time a record is saved, regardless of who or what saved it, it belongs in a User Event script.

## How Do You Choose the Right Script Type?

**Server-side for business rules.** If the logic must run every time the record is saved, use a User Event script.

**Client-side for user experience.** If the logic is about guiding the user through the form, showing fields, setting defaults, real-time feedback, use a Client script.

When in doubt, ask: "Does this need to run when someone saves via API or import?" If yes, it is a User Event script.

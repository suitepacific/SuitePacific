---
title: "NetSuite User Event Scripts vs Client Scripts: Which One to Use and When"
description: "The practical difference between NetSuite User Event scripts and Client scripts, when to use each, and the common mistake that puts critical business logic in the wrong place."
date: "2026-07-02"
tags: ["SuiteScript", "Development"]
---

The most common SuiteScript question from teams inheriting a customized NetSuite account is some version of: "Why does this logic only work sometimes?" Nine times out of ten, the answer is that someone put server-side business logic in a Client script, or vice versa. Understanding the difference between the two isn't just academic - it determines whether your customization works reliably or only when someone manually saves a record from the UI.

## What a Client Script actually is

A Client script runs in the user's browser while they are actively working with a record. It executes in response to user actions: opening a form, changing a field value, clicking a button, or submitting a record from the UI. The key word is "browser" - the script lives and runs on the client side, which means it only fires when a human is interacting with the form through NetSuite's web interface.

Client scripts are the right tool for:
- Real-time field validation (flagging an error before the user submits)
- Dynamic field visibility (showing or hiding fields based on another field's value)
- Auto-populating fields based on user input
- Guiding data entry and preventing obvious mistakes before they reach the server

The `pageInit`, `fieldChanged`, `saveRecord`, and `validateField` entry points are all Client script functions - each one named for the user action that triggers it.

## What a User Event Script actually is

A User Event script runs on NetSuite's server, not in the browser. It fires when a record is created, edited, or deleted - regardless of how that action happened. Whether the record was saved by a user clicking Submit in the UI, by a CSV import, by a workflow action, by a RESTlet call, or by another SuiteScript script, the User Event script runs every single time.

User Event scripts are the right tool for:
- Enforcing business rules that must always apply
- Cross-record updates (updating a related record when this one is saved)
- Data validation that needs to run even on API or import saves
- Calculations that depend on the final saved state of the record
- Audit logging and change tracking

The `beforeLoad`, `beforeSubmit`, and `afterSubmit` entry points cover the three moments in a record's save lifecycle where you might need to intervene.

## The mistake that causes intermittent failures

Putting critical business logic in a Client script seems reasonable at first. You add a `saveRecord` function that validates a field, it works perfectly in testing, and you move on. Then six months later someone imports 500 records via CSV and none of the validation ran. Or a workflow creates records and the expected logic never fires. Or an integration pushes data via RESTlet and the field that should have been auto-populated is blank.

The Client script was not broken. It worked exactly as designed - it ran when a user was on the form. The problem is that not all saves come from a user on a form.

If a business rule must always apply - a required field check, a margin threshold validation, a status transition rule - it belongs in a User Event `beforeSubmit`. If it's about making the form easier to use, it belongs in a Client script. Knowing which is which before writing a line of code prevents the category of bugs that are hardest to diagnose because they don't fail consistently.

## When to use both together

The two script types are not mutually exclusive. A well-designed customization often uses both: a Client script handles the real-time UX (instant feedback, dynamic fields, guided entry) while a User Event script enforces the underlying business rule on the server as a backstop. The Client script improves the experience for users working in the UI; the User Event script guarantees correctness regardless of how the record gets saved.

This is especially important for validation logic. The Client script can catch and flag an error before the user submits, giving them a clear message in the moment. The User Event `beforeSubmit` catches the same error if the record comes in any other way, rejecting it with a meaningful error rather than letting bad data silently pass through.

## The beforeLoad entry point

User Event scripts have a third entry point that doesn't fit neatly into the "before or after save" framing: `beforeLoad`. This runs before a record is displayed to the user in the browser — it fires when the record is opened for view or edit, not when it's saved.

Use `beforeLoad` for:
- Setting default field values that depend on data from other records (values that `pageInit` in a Client script could also set, but which need to apply even when the form is accessed programmatically)
- Making fields read-only based on the record's current status or the user's role
- Changing which form is displayed dynamically based on record data

The important distinction: `beforeLoad` fires on view and edit modes, not on create. If the logic needs to run when a new record is opened in create mode, check `context.type === context.UserEventType.CREATE` inside the function before executing.

## Checking context.type to control when scripts fire

User Event scripts fire on every create, edit, delete, and copy of a record — but most scripts only need to run in some of those situations. The `context.type` check is how you scope execution:

```javascript
function afterSubmit(context) {
  if (context.type !== context.UserEventType.EDIT) return;
  // logic that only needs to run on edits
}
```

The full set of types available on the context object: `CREATE`, `EDIT`, `DELETE`, `COPY`, `EMAIL`, `INLINE_EDIT`, `XEDIT` (mass update), and `VIEW` (beforeLoad only). Skipping this check on a script that does cross-record updates can cause unexpected record duplication on copy operations, or fire create-only logic on every edit.

The `XEDIT` type identifies mass updates. Scripts that perform additional record loads inside the function can hit governance limits during a mass update even if they run cleanly on single-record edits. If your script will ever run during a bulk update process, test it explicitly at volume.

## Governance limits on server-side scripts

Client scripts run in the browser and are not subject to NetSuite's server-side governance limits. A Client script that makes multiple record loads inside a `fieldChanged` handler is a user experience performance problem — slow, but it will not be stopped by the platform.

User Event scripts run server-side and consume governance units. A `beforeSubmit` or `afterSubmit` that loads records in a loop will eventually hit either the script execution time limit or the record load governance limit, depending on what it's doing. For scripts deployed to high-volume transaction types — Sales Orders, Vendor Bills, Inventory Adjustments — review the governance implications before deploying to production.

The practical rule: never assume a script that runs cleanly on one record will scale linearly to hundreds. Test at the actual volume it will encounter, especially before a large import or integration push.

## Debugging with the Script Execution Log

When a User Event or Client script behaves unexpectedly, the Script Execution Log is the first place to check. It is at Customization > Scripting > Script Execution Log. Filter by script name and date to see recent executions, including any errors thrown, the user who triggered the execution, and the record that was being processed.

For Client scripts, `console.log()` outputs appear in the browser's developer tools console, not in the Script Execution Log. For User Event scripts, use `log.debug()`, `log.audit()`, or `log.error()` — these write to the Script Execution Log and are visible without needing to reproduce the error in a live browser session.

The most common cause of intermittent failures is a field value that resolves correctly when a user saves from the UI but resolves to null or an empty string during API saves, imports, or copy operations. Adding `log.debug()` calls at key decision points to log the actual runtime values is faster than trying to reproduce the exact conditions that caused the failure.

## A practical way to decide

Before writing a script, ask one question: does this logic need to run when the record is saved via API, import, or workflow — not just when a user clicks Submit in the browser?

If yes, User Event script.
If the logic is purely about the interactive form experience and doesn't matter outside the UI, Client script.

If you are not sure, default to User Event. A server-side script that runs more often than strictly necessary is a governance consideration; a client-side script that misses saves from non-UI sources is a reliability problem. Reliability problems are harder to diagnose and harder to explain to the business than governance ones.

---

This is one of the fundamentals we review when auditing inherited NetSuite accounts — misplaced logic between Client and User Event scripts is one of the most consistent sources of "it works sometimes" bugs. If your account has customizations that behave intermittently, [book a consultation](/contact) and we can identify whether script placement is the cause. For related reading, see [SuiteScript Best Practices](/blog/suitescript-best-practices), [5 Common NetSuite Workflow Automation Mistakes](/blog/workflow-automation-mistakes), and our [SuiteScript development service](/netsuite-suitescript-development).

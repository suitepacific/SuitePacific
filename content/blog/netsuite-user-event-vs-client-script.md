---
title: "NetSuite User Event Scripts vs Client Scripts: Which One to Use and When"
description: "The practical difference between NetSuite User Event scripts and Client scripts, when to use each, and the common mistake that puts critical business logic in the wrong place."
date: "2026-07-02"
updated: "2026-08-07"
tags: ["SuiteScript", "Development"]
video:
  id: "r6c8N12SjYM"
  title: "NetSuite User Event Scripts vs Client Scripts Explained"
  description: "The practical difference between NetSuite User Event scripts and Client scripts, when to use each, and the common mistake that puts critical business logic in the wrong place."
  uploadDate: "2026-08-15"
---

A User Event script is a SuiteScript 2.x server-side script type that fires on every record create, edit, or delete, regardless of how the save was triggered. A Client Script is a browser-side script type that fires only when a user is actively working in a NetSuite record form in the web UI.

The most common SuiteScript question from teams inheriting a customized NetSuite account is some version of: "Why does this logic only work sometimes?" Nine times out of ten, the answer is that someone put server-side business logic in a Client script, or vice versa. Understanding the difference between the two isn't just academic - it determines whether your customization works reliably or only when someone manually saves a record from the UI.

A User Event script runs on NetSuite's servers and fires on every record save, regardless of how the save happened: UI, CSV import, REST API call, workflow action, or another script. A Client Script runs in the browser and only fires when a user is actively working with a record form in NetSuite's web interface. The save path determines which one runs, and putting logic in the wrong type is one of the most common causes of intermittent NetSuite customization failures.

<div style="background:#eef2fb;border:1px solid #b2c2e6;border-radius:10px;padding:1.25rem 1.5rem;margin:2rem 0;font-family:system-ui,-apple-system,sans-serif">
<p style="margin:0 0 0.5rem;font-size:0.7rem;font-weight:700;color:#4f7fff;text-transform:uppercase;letter-spacing:0.08em">Quick answer</p>
<p style="margin:0;color:#14306b;font-size:0.9rem;line-height:1.6">A Client Script runs in the user's browser and fires only when a user is actively working with a NetSuite record form, covering pageInit, fieldChanged, and saveRecord events. A User Event Script runs on NetSuite's servers and fires every time a record is created, edited, or deleted, regardless of whether a user triggered the save. This includes CSV imports, REST API calls, workflow actions, and saves from other scripts. Any business logic in a Client Script silently skips when records are saved outside the UI. Validation rules, required field enforcement, cross-record updates, and calculations that must apply to every save path belong in a User Event Script's beforeSubmit or afterSubmit entry point. Logic that is purely about the interactive form experience, such as real-time field validation, dynamic field visibility, or auto-populating fields, belongs in a Client Script. When uncertain, default to User Event: a missed save is harder to diagnose than a governance concern.</p>
</div>

<div style="overflow-x:auto;margin:2rem 0">
<table style="width:100%;border-collapse:collapse;font-size:0.85rem;font-family:system-ui,-apple-system,sans-serif;min-width:480px">
<thead>
<tr>
<th style="padding:0.75rem 1rem;text-align:left;background:#060f26;color:#eef2fb;font-weight:600;width:36%">Save path</th>
<th style="padding:0.75rem 1rem;text-align:center;background:#0b1f4d;color:#eef2fb;font-weight:600">Client Script fires?</th>
<th style="padding:0.75rem 1rem;text-align:center;background:#4f7fff;color:#fff;font-weight:600">User Event fires?</th>
</tr>
</thead>
<tbody>
<tr>
<td style="padding:0.65rem 1rem;border-bottom:1px solid #eef2fb;color:#14306b">User saves in the UI</td>
<td style="padding:0.65rem 1rem;border-bottom:1px solid #eef2fb;text-align:center;color:#065f46;font-weight:700">Yes</td>
<td style="padding:0.65rem 1rem;border-bottom:1px solid #eef2fb;text-align:center;color:#065f46;font-weight:700">Yes</td>
</tr>
<tr style="background:#f8faff">
<td style="padding:0.65rem 1rem;border-bottom:1px solid #eef2fb;color:#14306b">CSV import</td>
<td style="padding:0.65rem 1rem;border-bottom:1px solid #eef2fb;text-align:center;color:#dc2626;font-weight:700">No</td>
<td style="padding:0.65rem 1rem;border-bottom:1px solid #eef2fb;text-align:center;color:#065f46;font-weight:700">Yes</td>
</tr>
<tr>
<td style="padding:0.65rem 1rem;border-bottom:1px solid #eef2fb;color:#14306b">REST API / integration</td>
<td style="padding:0.65rem 1rem;border-bottom:1px solid #eef2fb;text-align:center;color:#dc2626;font-weight:700">No</td>
<td style="padding:0.65rem 1rem;border-bottom:1px solid #eef2fb;text-align:center;color:#065f46;font-weight:700">Yes</td>
</tr>
<tr style="background:#f8faff">
<td style="padding:0.65rem 1rem;border-bottom:1px solid #eef2fb;color:#14306b">Another SuiteScript</td>
<td style="padding:0.65rem 1rem;border-bottom:1px solid #eef2fb;text-align:center;color:#dc2626;font-weight:700">No</td>
<td style="padding:0.65rem 1rem;border-bottom:1px solid #eef2fb;text-align:center;color:#065f46;font-weight:700">Yes</td>
</tr>
<tr>
<td style="padding:0.65rem 1rem;color:#14306b">Workflow action</td>
<td style="padding:0.65rem 1rem;text-align:center;color:#dc2626;font-weight:700">No</td>
<td style="padding:0.65rem 1rem;text-align:center;color:#065f46;font-weight:700">Yes</td>
</tr>
</tbody>
</table>
</div>

<a href="https://youtu.be/r6c8N12SjYM" target="_blank" rel="noopener noreferrer" style="display:block;position:relative;max-width:560px;margin:2rem 0;border-radius:12px;overflow:hidden">
  <img src="https://i.ytimg.com/vi/r6c8N12SjYM/hqdefault.jpg" alt="NetSuite User Event Scripts vs Client Scripts explained" style="width:100%;display:block" />
  <div style="position:absolute;inset:0;display:flex;align-items:center;justify-content:center;background:rgba(0,0,0,0.25)">
    <div style="width:48px;height:48px;border-radius:50%;background:rgba(255,255,255,0.9);display:flex;align-items:center;justify-content:center">
      <svg width="18" height="18" fill="#111" viewBox="0 0 24 24"><path d="M8 5v14l11-7z"/></svg>
    </div>
  </div>
</a>

## When should you use a Client Script in NetSuite?

A Client script runs in the user's browser while they are actively working with a record. It executes in response to user actions: opening a form, changing a field value, clicking a button, or submitting a record from the UI. The key word is "browser" - the script lives and runs on the client side, which means it only fires when a human is interacting with the form through NetSuite's web interface.

Client scripts are the right tool for:
- Real-time field validation (flagging an error before the user submits)
- Dynamic field visibility (showing or hiding fields based on another field's value)
- Auto-populating fields based on user input
- Guiding data entry and preventing obvious mistakes before they reach the server

The `pageInit`, `fieldChanged`, `saveRecord`, and `validateField` entry points are all Client script functions - each one named for the user action that triggers it.

## When should you use a User Event Script instead?

A User Event script runs on NetSuite's server, not in the browser. It fires when a record is created, edited, or deleted - regardless of how that action happened. Whether the record was saved by a user clicking Submit in the UI, by a CSV import, by a workflow action, by a RESTlet call, or by another SuiteScript script, the User Event script runs every single time.

User Event scripts are the right tool for:
- Enforcing business rules that must always apply
- Cross-record updates (updating a related record when this one is saved)
- Data validation that needs to run even on API or import saves
- Calculations that depend on the final saved state of the record
- Audit logging and change tracking

The `beforeLoad`, `beforeSubmit`, and `afterSubmit` entry points cover the three moments in a record's save lifecycle where you might need to intervene.

## Why does SuiteScript business logic only fire sometimes?

Putting critical business logic in a Client script seems reasonable at first. You add a `saveRecord` function that validates a field, it works perfectly in testing, and you move on. Then six months later someone imports 500 records via CSV and none of the validation ran. Or a workflow creates records and the expected logic never fires. Or an integration pushes data via RESTlet and the field that should have been auto-populated is blank.

The Client script was not broken. It worked exactly as designed - it ran when a user was on the form. The problem is that not all saves come from a user on a form.

If a business rule must always apply - a required field check, a margin threshold validation, a status transition rule - it belongs in a User Event `beforeSubmit`. If it's about making the form easier to use, it belongs in a Client script. Knowing which is which before writing a line of code prevents the category of bugs that are hardest to diagnose because they don't fail consistently.

## When do you need both a Client Script and a User Event Script?

The two script types are not mutually exclusive. A well-designed customization often uses both: a Client script handles the real-time UX (instant feedback, dynamic fields, guided entry) while a User Event script enforces the underlying business rule on the server as a backstop. The Client script improves the experience for users working in the UI; the User Event script guarantees correctness regardless of how the record gets saved.

This is especially important for validation logic. The Client script can catch and flag an error before the user submits, giving them a clear message in the moment. The User Event `beforeSubmit` catches the same error if the record comes in any other way, rejecting it with a meaningful error rather than letting bad data silently pass through.

## What is the beforeLoad entry point and when should you use it?

User Event scripts have a third entry point that doesn't fit neatly into the "before or after save" framing: `beforeLoad`. This runs before a record is displayed to the user in the browser, it fires when the record is opened for view or edit, not when it's saved.

Use `beforeLoad` for:
- Setting default field values that depend on data from other records (values that `pageInit` in a Client script could also set, but which need to apply even when the form is accessed programmatically)
- Making fields read-only based on the record's current status or the user's role
- Changing which form is displayed dynamically based on record data

The important distinction: `beforeLoad` fires on view and edit modes, not on create. If the logic needs to run when a new record is opened in create mode, check `context.type === context.UserEventType.CREATE` inside the function before executing.

## How do you prevent a User Event Script from firing on imports and API saves?

User Event scripts fire on every create, edit, delete, and copy of a record, but most scripts only need to run in some of those situations. The `context.type` check is how you scope execution:

```javascript
function afterSubmit(context) {
  if (context.type !== context.UserEventType.EDIT) return;
  // logic that only needs to run on edits
}
```

The full set of types available on the context object: `CREATE`, `EDIT`, `DELETE`, `COPY`, `EMAIL`, `INLINE_EDIT`, `XEDIT` (mass update), and `VIEW` (beforeLoad only). Skipping this check on a script that does cross-record updates can cause unexpected record duplication on copy operations, or fire create-only logic on every edit.

The `XEDIT` type identifies mass updates. Scripts that perform additional record loads inside the function can hit governance limits during a mass update even if they run cleanly on single-record edits. If your script will ever run during a bulk update process, test it explicitly at volume.

## What governance limits apply to User Event Scripts?

Client scripts run in the browser and are not subject to NetSuite's server-side governance limits. A Client script that makes multiple record loads inside a `fieldChanged` handler is a user experience performance problem, slow, but it will not be stopped by the platform.

User Event scripts run server-side and consume governance units. A `beforeSubmit` or `afterSubmit` that loads records in a loop will eventually hit either the script execution time limit or the record load governance limit, depending on what it's doing. For scripts deployed to high-volume transaction types, Sales Orders, Vendor Bills, Inventory Adjustments, review the governance implications before deploying to production.

The practical rule: never assume a script that runs cleanly on one record will scale linearly to hundreds. Test at the actual volume it will encounter, especially before a large import or integration push.

## How do you debug a User Event Script that isn't firing as expected?

When a User Event or Client script behaves unexpectedly, the Script Execution Log is the first place to check. It is at Customization > Scripting > Script Execution Log. Filter by script name and date to see recent executions, including any errors thrown, the user who triggered the execution, and the record that was being processed.

For Client scripts, `console.log()` outputs appear in the browser's developer tools console, not in the Script Execution Log. For User Event scripts, use `log.debug()`, `log.audit()`, or `log.error()`, these write to the Script Execution Log and are visible without needing to reproduce the error in a live browser session.

The most common cause of intermittent failures is a field value that resolves correctly when a user saves from the UI but resolves to null or an empty string during API saves, imports, or copy operations. Adding `log.debug()` calls at key decision points to log the actual runtime values is faster than trying to reproduce the exact conditions that caused the failure.

## How do you decide whether to use a Client Script or User Event Script?

Before writing a script, ask one question: does this logic need to run when the record is saved via API, import, or workflow, not just when a user clicks Submit in the browser?

If yes, User Event script.
If the logic is purely about the interactive form experience and doesn't matter outside the UI, Client script.

If you are not sure, default to User Event. A server-side script that runs more often than strictly necessary is a governance consideration; a client-side script that misses saves from non-UI sources is a reliability problem. Reliability problems are harder to diagnose and harder to explain to the business than governance ones.

---

This is one of the fundamentals we review when auditing inherited NetSuite accounts, misplaced logic between Client and User Event scripts is one of the most consistent sources of "it works sometimes" bugs. If your account has customizations that behave intermittently, [book a consultation](/contact) and we can identify whether script placement is the cause. For related reading, see [SuiteScript Best Practices](/blog/suitescript-best-practices), [5 Common NetSuite Workflow Automation Mistakes](/blog/workflow-automation-mistakes), and our [SuiteScript development service](/netsuite-suitescript-development).

## Frequently asked questions

**Q: What is a User Event script in NetSuite?**
A: A User Event script is a server-side SuiteScript 2.x script that runs when a record is created, edited, or deleted in NetSuite. It fires regardless of how the save was triggered: a user saving through the UI, a CSV import, a REST API call, a workflow action, or another script. User Event scripts have three entry points: beforeLoad (before the record is displayed), beforeSubmit (before the record is written to the database), and afterSubmit (after the record is saved).

**Q: What is a Client Script in NetSuite?**
A: A Client Script is a browser-side SuiteScript 2.x script that runs in the user's web browser while they are actively working with a NetSuite record form. It fires in response to user actions such as opening a form (pageInit), changing a field value (fieldChanged), or clicking Save (saveRecord). Client Scripts do not run during CSV imports, API saves, workflow actions, or any save that does not involve a user interacting with the record form directly.

**Q: When should I use a User Event script instead of a Client Script?**
A: Use a User Event script when the logic must run every time the record is saved, regardless of how the save happens. Business rules, data validation that must be enforced, cross-record updates, and audit logging all belong in User Event scripts. Use a Client Script when the logic is specific to the interactive form experience: real-time field validation, dynamic field visibility, and auto-populating fields based on user input.

**Q: Why doesn't my Client Script fire on CSV imports or API saves?**
A: Client Scripts run in the browser. A CSV import and an API save do not involve a browser or a user interacting with a form, so the Client Script has no context in which to run. This is expected behavior, not a bug. If the logic must run on every save path, it needs to be in a User Event script's beforeSubmit or afterSubmit entry point instead.

**Q: Can a User Event script and Client Script work on the same record type?**
A: Yes, and this is the recommended pattern for comprehensive customizations. The Client Script handles real-time UX for users working in the form: instant field validation, dynamic visibility, guided data entry. The User Event script enforces the underlying business rule on every save as a server-side backstop. The two work together: the Client Script improves the experience, and the User Event script guarantees correctness regardless of the save path.

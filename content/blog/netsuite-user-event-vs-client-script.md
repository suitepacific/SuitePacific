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

## A practical way to decide

Before writing a script, ask one question: does this logic need to run when the record is saved via API, import, or workflow - not just when a user clicks Submit in the browser?

If yes, User Event script.
If the logic is purely about the interactive form experience and doesn't matter outside the UI, Client script.

If you are not sure, default to User Event. A server-side script that runs more often than strictly necessary is a minor governance consideration; a client-side script that misses saves from non-UI sources is a reliability problem.

---

This is one of the fundamentals we review when auditing inherited NetSuite accounts - misplaced logic between Client and User Event scripts is one of the most consistent sources of "it works sometimes" bugs. If your account has customizations that behave intermittently, [book a consultation](/#contact) and we can identify whether script placement is the cause. For related reading, see [SuiteScript Best Practices](/blog/suitescript-best-practices), [5 Common NetSuite Workflow Automation Mistakes](/blog/workflow-automation-mistakes), and our [SuiteScript development service](/netsuite-suitescript-development).

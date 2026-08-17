---
title: "NetSuite Release Readiness Checklist"
description: "What to do before each bi-annual NetSuite release: how to review release notes for your customizations, what to test in Sandbox, how to identify risk before it reaches Production, and how to communicate release changes to your team."
publishedAt: "2026-08-18"
tags: ["Post-Go-Live", "SuiteScript"]
---

NetSuite releases twice per year. Each release potentially changes something that affects existing customizations: an API behavior, a record type default, a field handling change, or a platform-level update that interacts with scripts or workflows built during your implementation.

Most release failures are preventable. This checklist covers how to review each release in Sandbox before it reaches Production.

---

## Before the release: how to get preview access

NetSuite provides a Release Preview environment before each major release. This is a separate Sandbox environment running the upcoming release version. It is distinct from your standard Sandbox.

**Requesting Release Preview access:**

- Log into your NetSuite account
- Navigate to Setup > Company > NetSuite Preferences
- Look for the Release Preview enrollment option, or contact NetSuite support to request access
- Release Preview access is typically available four to six weeks before the release reaches Production accounts

**If Release Preview is not available:** Run your Sandbox review on your standard Sandbox immediately after the release refreshes your Sandbox instance. Sandbox environments receive the new release slightly before Production accounts.

---

## Step 1: Read the release notes

The NetSuite Release Notes document all changes in each release. Not every change affects every account, but the review takes less than two hours and surfaces the specific changes relevant to your customizations.

**Where to find release notes:** Search NetSuite Help Center for the current release version (e.g., "2026.2 Release Notes"). The document is published before the release reaches Production.

**What to look for:**

- [ ] **SuiteScript API changes:** New deprecations, changed behavior on existing API methods, new required parameters. Search the release notes for "SuiteScript" and read each item.
- [ ] **SuiteFlow changes:** Changed trigger behavior, deprecated workflow actions, new entry condition logic.
- [ ] **Record type changes:** New fields added to standard record types, changed field behavior, renamed internal IDs.
- [ ] **Authentication changes:** NLAuth retirement progress, OAuth 2.0 changes, token behavior.
- [ ] **Advanced PDF/FreeMarker changes:** Template rendering changes, deprecated variables, changed access to data objects.
- [ ] **Saved search and reporting changes:** Changed behavior in search criteria, formula field functions.
- [ ] **Integration and REST API changes:** SuiteQL behavior changes, REST endpoint changes, batch request behavior.

For each item that mentions something your account uses, flag it for testing.

---

## Step 2: Map release changes to your customizations

Before testing, build a map of which release changes interact with which customizations in your account.

**Script deployment inventory check:**

- [ ] Pull the full list of Active script deployments (Customization > Scripting > Script Deployments)
- [ ] For each script that uses APIs mentioned in the release notes, add it to the test list
- [ ] Pay particular attention to scripts running on record types with field changes in this release

**Workflow inventory check:**

- [ ] Pull the list of Active workflows (Customization > Workflow > Workflows)
- [ ] For each workflow using trigger events or actions mentioned in the release notes, add it to the test list

**Integration check:**

- [ ] For each active integration, review whether this release changes the API endpoints or field values the integration uses
- [ ] REST API changes, SuiteQL sort behavior changes, and field renaming are the most common integration risk areas

**PDF template check:**

- [ ] For each active Advanced PDF template, review whether this release changes FreeMarker variable access or template rendering behavior
- [ ] Currency context changes and data object access patterns are the most common template risk areas

---

## Step 3: Sandbox testing

Test each item on your flagged list in Sandbox before the release reaches Production.

### For each flagged script

- [ ] Run the script through its normal execution path in Sandbox
- [ ] Check the execution log for errors or changed behavior
- [ ] Verify the script output (field values set, records created, etc.) matches the expected behavior
- [ ] Check governance consumption: does the release change add to governance usage?

**Common test cases:**

For User Event scripts on transaction records:
- Create a new record and save (tests beforeSubmit and afterSubmit paths)
- Edit an existing record and save (tests same paths on edit)
- If the script has status-based conditions, test with records at each relevant status

For Scheduled scripts:
- Trigger a manual run in Sandbox if the scheduler will not fire during your test window
- Review output records and execution log

For RESTlets:
- Make a test API call using your integration test credentials
- Verify the response structure has not changed

### For each flagged workflow

- [ ] Create or find a record that should trigger the workflow entry conditions
- [ ] Step through the workflow to its terminal state
- [ ] Verify the workflow produces the expected outputs (field updates, email notifications, record creation)
- [ ] Check for any new error log entries in the workflow history

### For each flagged integration

- [ ] Run a test sync in the Sandbox environment if the integration platform supports Sandbox connections
- [ ] Verify that records sync correctly and that error rates have not increased
- [ ] If the integration uses SuiteQL, test the queries with any sort behavior changes from this release

### For each flagged PDF template

- [ ] Generate a test transaction PDF using the template in Sandbox
- [ ] Verify the layout, field values, and formatting match the expected output
- [ ] Check currency fields, conditional blocks, and sublist iteration

---

## Step 4: Address findings before Production

For each issue identified in Sandbox:

**Critical issues** (causing incorrect output or failures):
- [ ] Fix in Sandbox and re-test
- [ ] Document what was changed and why
- [ ] Deploy to Production before the release reaches it, or immediately after if it cannot be fixed in time

**High-priority issues** (degraded functionality or increased governance usage):
- [ ] Schedule for the week the release arrives in Production
- [ ] Document as a known risk if the fix cannot be completed before release

**Minor issues** (cosmetic or minor behavior differences):
- [ ] Log in the account's issue tracker
- [ ] Address in the next development cycle

---

## Step 5: Communication

Before the release reaches Production, communicate what is changing to the people who will notice.

- [ ] Notify the team of any changes to forms, fields, or behaviors they interact with daily
- [ ] Document any workflows or scripts that will behave differently after the release
- [ ] Brief your administrator on any release-related configuration changes they need to make
- [ ] Set expectations if anything is known to be in a degraded state during a fix window

---

## Release schedule reference

NetSuite follows a twice-yearly release cadence:

- **Release 1 (January-February):** Typically reaches Production in January/February. Sandbox preview available from November-December.
- **Release 2 (July-August):** Typically reaches Production in July/August. Sandbox preview available from May-June.

Oracle communicates the specific date your account will receive each release through the NetSuite system messages and the Manage System Messages page.

---

## What to track after each release

After the release reaches Production, spend the first week monitoring:

- [ ] Script execution logs for error spikes
- [ ] Workflow history for unexpected failures or changed behavior
- [ ] Integration sync logs for error rate changes
- [ ] Dashboard loads for performance changes (new release sometimes changes saved search behavior)
- [ ] Any user reports of changed NetSuite behavior

If issues surface that were not caught in Sandbox, address them immediately and document what was missed in the pre-release review.

---

## Related resources

- [NetSuite post-go-live support](/netsuite-post-go-live-support): how an ongoing support engagement handles release reviews
- [NetSuite technical debt audit checklist](/resources/netsuite-technical-debt-audit-checklist): a full account review before a major release is a good time to run the technical debt audit
- [What to do when a NetSuite script breaks after an upgrade](/blog/netsuite-script-broke-after-upgrade): diagnostic steps for release-related failures that were not caught in Sandbox

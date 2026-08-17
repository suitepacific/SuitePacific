---
title: "What a NetSuite Health Check Report Should Contain"
description: "A guide to what a well-structured NetSuite health check report looks like: the sections it should include, how findings should be documented, what severity classification means in practice, and how to use the report to drive remediation."
publishedAt: "2026-08-18"
tags: ["Health Check", "Account Optimization", "Technical Debt"]
---

The value of a NetSuite health check is entirely in its report. An assessment that produces a thorough, well-structured written report is actionable. One that produces a vague summary or a slide deck is not. Knowing what a good report should contain lets you evaluate what you receive and identify gaps.

---

## Section 1: Executive summary

The executive summary is for non-technical stakeholders: the CFO, the operations director, or the ERP owner who does not have the background to evaluate technical findings directly.

**What it should contain:**

Total finding count by severity tier. A one-sentence description of each Critical finding in business-impact language. A clear statement of whether the account has active problems that need immediate attention or risk items that should be addressed on a planned basis.

**What good looks like:**

"This assessment identified 2 Critical findings, 7 High-priority findings, and 23 Advisory findings. The two Critical findings involve active data problems: an integration that has not been syncing Individual-type customer records to Salesforce for approximately 90 days, and a workflow approval chain that has been routing all Purchase Orders to an inactive employee, causing them to stall in Pending Approval status with no notification to the purchasing team. Both require immediate attention before the next month-end close."

**What a weak executive summary looks like:**

"The account has some issues in several areas including scripts, workflows, and integrations. We recommend addressing these before proceeding with any major projects." This tells the reader nothing actionable.

---

## Section 2: Findings by severity

This is the core of the report. Each finding is documented in its own entry, sorted within its severity tier by impact.

**What each finding entry should contain:**

- **Area:** Which layer the finding is in (Script, Workflow, Saved Search, Custom Field, Role, Integration)
- **Specific location:** The name and internal ID of the customization (e.g., "Script: customscript_order_validation, Deployment ID: customdeploy_order_validation_so")
- **What was found:** A specific, factual description of the issue (not a vague characterization)
- **Why it matters:** What the consequence is or will be
- **Recommended resolution:** What should be done about it
- **Effort indicator:** Optional but useful; a rough estimate of whether the fix is a 1-hour change or a 2-day rebuild

**Example of a well-documented Critical finding:**

---
**Area:** Integration Health
**Location:** Celigo Integration Flow "NetSuite Customer to Salesforce" (Flow ID: NS-SF-CUST-001)
**What was found:** Integration flow has been logging errors on Customer records with Type = "Individual" since approximately October 2025. Error message: "INVALID_FIELD_VALUE: 'Individual' is not a valid Customer Type in field mapping configuration." Root cause: Integration was configured before the Individual customer type was added to the NetSuite account. The flow has no fallback for unrecognized customer types; affected records are silently skipped without retry. Sync log review confirms 247 Individual customer records have not synced to Salesforce.
**Why it matters:** Salesforce is missing 247 customer records. If the sales team is quoting or managing relationships in Salesforce for any of these customers, they are working without full NetSuite transaction history. If Salesforce is the system of record for customer contact information, NetSuite customer records for these 247 accounts may be missing updated contact data.
**Recommended resolution:** Update the Celigo field mapping configuration to include Individual as a valid customer type, map to the appropriate Salesforce Account type, and run a one-time backfill for the 247 unsynchronized records. Estimated effort: 3-4 hours configuration + backfill validation.

---

**Example of a well-documented High finding:**

---
**Area:** Workflow Configuration
**Location:** Workflow "PO Approval Routing" (ID: customworkflow_po_approval)
**What was found:** Workflow trigger is set to "On Create or Edit" with no entry conditions. Workflow evaluates on every save of every Purchase Order record regardless of what changed. At current PO volume (approximately 180-220 POs saved per day, including edits), the workflow evaluates 180-220 times per day whether or not approval routing is relevant to the save event.
**Why it matters:** Each evaluation consumes governance units and adds execution time to every PO save. At current volume, the impact is approximately 1.2 seconds added to each PO save. As PO volume grows, this impact increases proportionally. At peak periods (e.g., fiscal quarter end), governance ceiling may be approached.
**Recommended resolution:** Add entry conditions to the workflow to trigger only when the PO status transitions from "Open" to "Pending Approval". This requires a single condition: Status field changes to "Pending Approval". Estimated effort: 30 minutes.

---

**Example of a well-documented Advisory finding:**

---
**Area:** Custom Fields
**Location:** Custom Transaction Body Field "custbody_legacy_order_ref" (Sales Order)
**What was found:** Field appears on no active Sales Order transaction form. Field contains data in fewer than 1% of Sales Order records (47 of 5,200 total). Field is not referenced in any active saved search, script, or workflow. Field name and label do not indicate its original purpose.
**Why it matters:** The field adds to form load complexity and appears in the field picker for every custom search and script built against Sales Order, increasing noise in developer and administrator workflows. No active business purpose is evident.
**Recommended resolution:** Confirm with account owner that the 47 records with data in this field represent legacy entries that no longer need to be preserved. If confirmed, remove field from all forms (already done) and deactivate the field. Estimated effort: 15 minutes.

---

## Section 3: Layer-by-layer summary tables

For each of the six audit areas, a summary table showing total items reviewed, findings count by severity, and a brief characterization of the overall state of the layer.

| Layer | Items Reviewed | Critical | High | Advisory | State |
|---|---|---|---|---|---|
| Script Deployments | 18 active | 0 | 3 | 7 | Moderate debt, no active failures |
| Workflow Configurations | 12 active | 0 | 2 | 4 | Entry condition gaps, one retired process |
| Saved Searches | 94 public | 0 | 2 | 9 | Dashboard performance risk, duplicates |
| Custom Fields | 47 on SO, 31 on INV | 0 | 1 | 12 | Field proliferation, unclear purpose on many |
| Roles and Permissions | 14 roles | 0 | 0 | 6 | Minor cleanup, no security exposure |
| Integration Health | 4 integrations | 1 | 1 | 2 | Active sync failure, NLAuth deprecation risk |

This table gives a quick orientation to where the most serious problems are, so the reader can jump to the relevant sections of the full findings.

---

## Section 4: What the report should not contain

**A list of everything in the account without filtering.** A health check report should contain findings, not an account inventory. If the report lists every custom field in the account, every workflow, and every script regardless of whether there is anything to note, it is more confusing than useful. Findings are items that warrant attention.

**Vague recommendations.** "Consider reviewing your workflows" is not a recommendation. "Tighten the entry conditions on workflow PO Approval Routing (customworkflow_po_approval) to trigger only on status transition to Pending Approval" is a recommendation.

**Remediation scope or pricing bundled in.** The health check report documents what was found. It does not propose a remediation project. If the same provider will conduct the remediation, the scope and pricing for that work are separate from the assessment report.

**Findings the reviewer cannot substantiate from the account.** Every finding should be traceable to a specific observation in the account. "The account may have performance problems" is not a finding. "Saved search customsearch_open_invoices has no indexed first criterion and powers a portlet on the Finance dashboard viewed approximately 60 times per day" is a finding.

---

## How to use the report

**Address Critical findings first, before the next major change or release.** Critical findings are actively causing incorrect results. Every day they are unaddressed is another day of damage accumulation.

**Plan High findings into the next development cycle.** High findings are not emergencies, but they have clear paths to becoming Critical. Schedule them within the next four to six weeks.

**Build an Advisory backlog.** Advisory findings do not require immediate action. Organize them by layer and address them in themed cleanup sprints: a script cleanup sprint, a workflow cleanup sprint, a custom field cleanup sprint.

**Share the executive summary with non-technical leadership.** The findings section is for developers. The executive summary is for the people who control budget and approve remediation work. Make sure they have the summary in a form they can read.

**Use the report as the scope for remediation.** A well-structured findings report contains everything a developer needs to scope remediation work. The finding describes what is wrong; the recommended resolution describes what to do about it; the effort indicator gives a starting point for estimation.

---

## Related resources

- [NetSuite health check](/netsuite-health-check): fixed-scope assessment producing a report matching this structure
- [Questions to ask before getting a NetSuite health check](/resources/netsuite-health-check-provider-questions): how to evaluate whether an assessor will produce this quality of report
- [How to prioritize NetSuite technical debt remediation](/resources/netsuite-technical-debt-prioritization): sequencing the findings from this report into a remediation plan

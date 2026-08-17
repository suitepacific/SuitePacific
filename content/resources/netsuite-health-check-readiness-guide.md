---
title: "NetSuite Health Check Readiness Guide"
description: "What to prepare before a NetSuite health check: access requirements, information to gather, questions to have ready, and what to expect from the intake process."
publishedAt: "2026-08-18"
tags: ["Health Check", "Account Optimization"]
---

A NetSuite health check is an independent assessment of your live account. The assessor works from the account directly and does not depend on your interpretation of it. That said, some preparation makes the assessment more efficient and the report more useful.

This guide covers what access to provide, what information to have ready, what questions to prepare, and what to expect from the intake process.

---

## Access requirements

### NetSuite account access

The assessor needs an Administrator-level role in the NetSuite account. Administrator access allows reading script source code, reviewing deployment configurations, examining workflow logic in the editor, and accessing system notes and execution logs. Restricted roles do not provide access to the configuration areas the assessment covers.

**How to create access:**

Navigate to Setup > Users/Roles > Manage Users. Create a new Employee record for the assessor's primary contact. Assign the Administrator role. The assessor will confirm their specific login credentials during the intake process.

If you are uncomfortable with full Administrator access for an external party, you can create a temporary user that will be deactivated at the close of the engagement. Confirm the deactivation date with the assessor at the start.

### Sandbox access (recommended, not required)

If the account has a Sandbox environment, Sandbox access can be useful for the assessor to test findings without affecting Production. It is not required for the assessment itself; the assessment reads Production directly. If you have a Sandbox with a recent refresh, mention it during the intake call.

### Integration platform access (if applicable)

If the account uses a middleware platform (Celigo, Boomi, custom REST infrastructure), the integration portion of the assessment benefits from read access to the integration platform's flow configurations and error logs. This is not always possible to provide; note the platform and discuss access during intake.

---

## Information to have ready (but not required)

The assessor does not depend on your documentation; they read the account directly. However, if the following information is available, it can help prioritize the assessment and produce more specific findings.

**Previous assessment reports or health check results.** If a previous health check was conducted, even if it is from several years ago, share it. It helps identify what was addressed, what was deferred, and what may have recurred.

**Known problem areas.** If there are specific areas where your team already has concerns (a specific workflow that fires inconsistently, a script that breaks after releases, an integration that has had errors), note these for the intake call. The assessment covers everything regardless, but noting known issues ensures they receive attention in the findings.

**List of active partners or developers who have worked on the account.** Not required, but useful context when a finding reveals a pattern that may indicate a specific implementation phase or contractor.

**Recent release incidents.** If a recent NetSuite release caused script failures or unexpected behavior, note the release version and the affected areas. This helps the assessor focus on customizations likely to interact with upcoming releases.

---

## What to expect from the intake call

Most health check engagements begin with a brief intake call. This call is not a technical discovery session; the assessor will do that independently in the account. The intake call serves three purposes:

**Understanding what prompted the assessment.** Whether it is a partner transition, a suspected data integrity problem, a pre-project baseline review, or a general "we do not know what we have" situation. This context shapes how findings are presented in the report.

**Establishing access and logistics.** Confirming the Administrator login credentials are functional, noting the Sandbox status, discussing any access limitations.

**Setting timeline expectations.** Most assessments complete in five to seven business days. If the account is large (many years of customizations, many active scripts and workflows) or if specific areas warrant deeper attention, the assessor will note this and give a specific timeline.

The intake call is typically 20-30 minutes. You do not need to prepare technical background; the assessor reads the account.

---

## Questions to have ready

Having answers to these questions ready for the intake call speeds up the logistics portion.

**Who should receive the findings report?** The report is typically sent to one technical contact and one business contact (CFO, operations director, or whoever owns the NetSuite engagement). Identify these two contacts.

**What is the urgency?** Is this assessment before an upcoming release (which has a fixed deadline)? Before a planned project start? Or a general baseline review with no hard deadline? A deadline helps prioritize the assessment schedule.

**Are there specific areas you already have concerns about?** Even if the assessment covers everything, noting areas of known concern helps the assessor prioritize attention and ensure the report gives those areas specific coverage.

**What do you plan to do with the report?** If you plan to use the report to scope a remediation project, it helps the assessor frame recommendations with remediation effort in mind. If you plan to hand it to another developer, the assessor can ensure the report is self-contained and does not assume the reader has prior context.

---

## What the assessment process looks like

**Days 1-2:** Account access is confirmed. The assessor reviews script deployments, execution logs, and governance data. This layer is reviewed first because it carries the highest risk of active, silent problems.

**Days 2-3:** Workflow configurations, saved searches, and custom fields are reviewed. The workflow editor and saved search criteria are read in detail.

**Days 3-4:** Roles and permissions, integration health, and documentation gaps are assessed. Integration error logs are reviewed.

**Days 4-7:** Findings are compiled, classified by severity, and documented in the written report. The report is reviewed internally before delivery.

**Report delivery:** The report is delivered as a structured document (PDF or shared document, not slides). A brief walkthrough call is typically offered to review the most critical findings and answer questions.

---

## After the report is delivered

The report is yours. You can act on it immediately, schedule remediation for a future date, or hand it to another developer. There is no obligation to engage the assessor for remediation work.

If you plan to begin remediation, the [prioritization framework](/resources/netsuite-technical-debt-prioritization) covers how to sequence findings by severity and dependency. Critical findings should be addressed before High findings; High findings before Advisory (Maintenance) findings.

For the scope of what a thorough health check covers, see [what does a NetSuite health check include](/blog/netsuite-health-check-what-it-includes). To engage for a health check, see [NetSuite health check](/netsuite-health-check).

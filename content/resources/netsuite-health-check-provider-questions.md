---
title: "Questions to Ask Before Getting a NetSuite Health Check"
description: "How to evaluate NetSuite health check providers: what questions to ask, what answers indicate a thorough assessment versus a superficial one, and what red flags to watch for."
publishedAt: "2026-08-18"
tags: ["Health Check", "Post-Go-Live"]
---

A NetSuite health check is only as useful as the review behind it. A thorough independent assessment surfaces findings that the account owner could not identify on their own. A superficial one produces a report that covers obvious issues and misses the ones that matter.

The quality of the assessment is not visible in the price or in the provider's marketing. It is visible in how they answer specific questions. These questions help you assess whether a health check will produce findings worth acting on.

---

## Questions about scope

**"What areas does your health check cover?"**

A thorough health check covers at minimum six areas: script deployments, workflow configurations, saved searches, custom fields and forms, roles and permissions, and integration health. A review that covers only "configuration" or only "performance" is not a full health check; it is an audit of one layer.

Listen for specificity. A good answer names the specific areas and describes what is examined in each (for example: "for scripts, we review active deployments, read execution logs for recent errors and governance consumption, and check for overlap between scripts and workflows on the same record types"). A vague answer ("we look at everything") is not informative.

**"What is the deliverable?"**

The answer should be: a written report. Specifically, a structured document with findings listed by severity, each with a description of what was found, where it is in the account, why it matters, and what should be done about it.

Red flags: "We walk you through the findings in a call." A call is not a deliverable. The findings should be documented in a form you can share with leadership, hand to a developer, or revisit in six months. If the findings exist only in a conversation, they are not yours.

**"Does the health check include any remediation?"**

It should not. A health check is an assessment. Bundling remediation into the assessment means the reviewer has an incentive to find fixable things rather than all things. The assessment and the remediation should be separate engagements with separate scopes and separate pricing.

A bundled engagement is not automatically disqualifying, but ask how the scope is divided: can you receive the assessment report before deciding whether to proceed with remediation? A "yes" means the assessment and remediation are sequenced correctly even if they are priced together.

---

## Questions about methodology

**"Do you read the account directly, or do you rely primarily on documentation we provide?"**

The correct answer is: we read the account directly. Documentation and prior context are useful supplements, but the assessment is based on what is actually in the account, not on what someone says is there.

A reviewer who depends heavily on your documentation or your team's explanation of the account is not doing an independent review; they are reviewing your interpretation of it. The value of an independent assessment is precisely that it is not filtered through the account owner's existing understanding.

**"How do you check whether workflows have the right entry conditions?"**

Listen for: we open the workflow editor, examine the entry conditions for each active workflow, check the trigger event and record type, and verify that the conditions are scoped correctly for the volume of the record type.

This is a test of whether the reviewer actually examines workflow configurations in detail. If the answer is vague ("we review the workflow configuration"), ask a follow-up: "What do you look for specifically in the entry conditions?" A reviewer who has done this before will have a specific answer.

**"How do you check for script governance issues?"**

Listen for: we review execution logs for each active script deployment and examine governance unit consumption per execution, then cross-reference against the available budget for that script type. A specific answer is a good sign; a generic answer about "reviewing scripts for performance" may mean they only read the source code without examining execution history.

**"How do you identify saved searches that are causing performance problems?"**

Listen for: we check the filter order in each search, specifically whether the first criterion is on an indexed field. An unindexed first criterion causes a full-table scan on every execution. We focus on searches that power dashboard portlets, workflow entry conditions, and Map/Reduce data sources.

**"Do you check integrations? What does that review include?"**

Listen for: we check active integration records in NetSuite, review recent sync logs or error logs for error rates, verify whether the integration covers all record types currently in the account (not just those that existed at go-live), and check authentication credential status.

A health check that does not include integrations is missing the layer most likely to contain silent, active problems.

---

## Questions about findings classification

**"How do you classify findings?"**

The answer should describe a severity tier system. A common one: Critical (actively causing incorrect results in Production), High (meaningful risk not yet visible), Advisory or Maintenance (inefficient or undocumented but not actively harmful).

Ask for an example of a finding that would be Critical, one that would be High, and one that would be Advisory. The examples will reveal whether the classification is meaningful or whether everything gets put in the same bucket.

**"What does the most serious finding you have ever produced look like in the report?"**

This question evaluates how findings are communicated, not just how they are classified. A good finding communicates: what it is, where it is in the account, what impact it is having or is likely to have, and what the recommended resolution is. It should be specific enough that another developer reading it without any prior context could act on it.

---

## Questions about the process

**"How long does the assessment take?"**

A realistic timeline for a standard live NetSuite account is five to seven business days. Very large accounts with many years of customization history may take longer; note if this is the case for your account. An assessment that completes in one day is almost certainly superficial.

**"What access do you need from us?"**

The correct answer is: Administrator access to the Production account. Anything less than Administrator access limits what can be reviewed: script source code, deployment configurations, workflow editor, execution logs, and role configurations all require Administrator permissions.

**"Can we speak to a previous client who has gone through this process with you?"**

A provider who has done thorough health check work should be able to provide a reference. This is not always feasible (client confidentiality), but the willingness to offer one is a signal. Resistance to this question is a yellow flag.

---

## Red flags

**No written deliverable.** If the assessment output is a call, a conversation, or a slide deck with a summary, it is not a health check. The written report is the deliverable.

**Remediation included in the assessment price without a clear way to receive the report and stop.** If you cannot take the report and go elsewhere, the assessment is a sales funnel for remediation work, not an independent review.

**Scope limited to configuration review only.** An assessment that does not include execution log analysis, governance review, saved search performance checks, and integration health is missing the most important failure modes.

**Vague answers to methodology questions.** A reviewer who has done this work knows exactly what they look for in each layer. Vague answers suggest limited direct experience with the work.

**No severity classification.** A report that lists findings without classifying them by severity leaves the account owner to guess what to address first. The classification is part of the deliverable.

---

## Related resources

- [What does a NetSuite health check include?](/blog/netsuite-health-check-what-it-includes): detailed coverage of each audit area
- [NetSuite health check readiness guide](/resources/netsuite-health-check-readiness-guide): how to prepare for a health check engagement
- [NetSuite health check](/netsuite-health-check): fixed-scope assessment with written findings report in 5-7 business days

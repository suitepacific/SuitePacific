---
title: "NetSuite ACS Tiers Explained: What Advise, Monitor, Optimize, and Architect Actually Cover"
description: "A tier-by-tier breakdown of NetSuite Advanced Customer Support: what each ACS tier includes in practice, what none of them cover, who each tier is designed for, and when upgrading a tier solves a problem versus when the issue is ACS scope."
date: "2026-09-03"
updated: "2026-09-03"
tags: ["Post-Go-Live", "Admin"]
---

<div style="background:#eef2fb;border:1px solid #b2c2e6;border-radius:10px;padding:1.25rem 1.5rem;margin:2rem 0;font-family:system-ui,-apple-system,sans-serif">
<p style="margin:0 0 0.5rem;font-size:0.7rem;font-weight:700;color:#4f7fff;text-transform:uppercase;letter-spacing:0.08em">Quick answer</p>
<p style="margin:0;color:#14306b;font-size:0.9rem;line-height:1.6">NetSuite ACS has four tiers: Advise (shared resource pool, entry-level access), Monitor (approximately 36 hours per quarter with a named contact), Optimize (approximately 20 hours per month with a dedicated resource), and Architect (approximately 40 hours per month with a senior architect). All four tiers cover the same things: standard NetSuite platform guidance, proactive account reviews, and Oracle escalation access. None of the four tiers cover custom SuiteScript development, third-party integrations, implementation-partner configurations, or custom workflow logic. Upgrading from Advise to Architect adds more hours and a more dedicated resource, but does not change the scope of what ACS can address. If the work you need falls outside ACS scope, no tier will cover it.</p>
</div>

NetSuite ACS (Advanced Customer Support) is structured across four tiers. Understanding what separates them, and more importantly what they share in common regardless of tier, is the most important step in evaluating whether ACS is the right support model for your account.

## The four ACS tiers at a glance

| Tier | Resource model | Approximate hours | Designed for |
|---|---|---|---|
| Advise | Shared pool, no named contact | Shared pool | New accounts, light support needs |
| Monitor | Named contact, less frequent engagement | ~36 hours per quarter | Established accounts needing periodic guidance |
| Optimize | Dedicated resource, monthly engagement | ~20 hours per month | Growing mid-market accounts |
| Architect | Senior architect, high-frequency engagement | ~40 hours per month | Enterprise accounts, multi-subsidiary |

Hours at higher tiers are approximate and structured around the engagement model Oracle defines for that tier. Contact your Oracle account representative for exact terms and current pricing.

## What the Advise tier covers

Advise is the entry-level ACS tier. It provides access to Oracle's ACS team through a shared pool model rather than a named or dedicated contact. The primary use cases for Advise are:

- Access to ACS guidance when questions arise, submitted through the standard support channel
- Proactive release notes and upgrade guidance
- Best-practice recommendations for standard NetSuite features
- Faster escalation path to Oracle engineering compared to standard support

Advise does not include a dedicated or named ACS resource. Requests go into a shared pool and are handled by available ACS consultants. For accounts with occasional guidance needs, this can work. For accounts with regular support volume or time-sensitive requests, the shared pool model can create delays.

## What the Monitor tier covers

Monitor adds a named ACS contact and a structured engagement cadence. The named contact provides continuity across interactions, which is meaningful for accounts where context-building across multiple sessions would otherwise slow things down.

The quarterly hour allocation at Monitor is approximately 36 hours. Those hours cover the same activities as Advise, but with more structure: regular cadence calls, proactive reviews of account health, and guidance oriented around the account's specific configuration rather than generic best practices.

Monitor is the first tier where the account gets a resource with ongoing familiarity with the account. That familiarity has real value for accounts whose primary needs are within ACS scope.

## What the Optimize tier covers

Optimize provides a dedicated ACS resource and approximately 20 hours per month of structured engagement. The monthly cadence supports more active accounts with ongoing guidance needs.

At Optimize, the engagement typically includes:

- Monthly cadence calls and account reviews
- Proactive performance monitoring and health checks
- Upgrade preparation and release readiness guidance
- Priority handling compared to lower tiers

The dedicated resource at Optimize knows the account across months, not just within a single session. For accounts that are actively evolving their use of standard NetSuite features, that continuity has value.

## What the Architect tier covers

Architect is the highest ACS tier, providing a senior NetSuite architect with approximately 40 hours per month of engagement. The Architect tier is designed for enterprise accounts with complex, multi-subsidiary environments and high usage of standard Oracle NetSuite functionality.

The Architect engagement is more advisory in nature: strategic guidance on how to use NetSuite's standard features across the organization, optimization of standard processes, and senior-level escalation when platform issues require engineering involvement.

Architect provides the highest level of Oracle-native expertise within ACS scope. For enterprise accounts with the budget and the right profile, it represents genuine value. For accounts whose complexity comes from the customization layer rather than the standard feature set, the tier does not change what can and cannot be addressed.

## What none of the tiers cover

This is the most important section for evaluating ACS regardless of tier.

The following are outside ACS scope at every tier from Advise through Architect:

- **Custom SuiteScript development and debugging.** User events, scheduled scripts, map/reduce scripts, client scripts, RESTlets, and Suitelets built for the account are not covered. If a script breaks, ACS will not fix it.
- **Third-party integrations.** Celigo, Boomi, Shopify, Salesforce, HubSpot, Amazon, SFTP, and custom REST or SOAP integrations are not within ACS scope. Integration failures require whoever built and maintains the integration.
- **Implementation-partner configurations.** Work built by the implementation partner, including configurations, custom records, workflows, and scripts, is not within Oracle's ACS scope.
- **Custom SuiteFlow workflow logic.** Standard SuiteFlow configuration guidance may fall within ACS scope, but custom workflow logic, complex approval routing, and workflow debugging for non-standard configurations typically do not.
- **Advanced PDF and FreeMarker templates.** Template development, debugging, and customization are outside ACS scope.
- **Saved search and reporting builds.** Creating or modifying saved searches and reports to specific business requirements falls outside ACS scope.

The scope boundary is the standard NetSuite platform. ACS covers what Oracle built. It does not cover what was built on top of it.

This is exactly the layer SuitePacific covers. SuiteScript 2.x development and debugging, Celigo and third-party integration maintenance, SuiteFlow workflow automation, NetSuite administration, saved searches, Advanced PDF and FreeMarker templates, custom records and fields, and release impact testing are all within scope on every SuitePacific plan. Oracle SuiteCloud Developer II and Administrator Professional certified. Plans from $799 per month, month-to-month. [View plans](/netsuite-care).

## When upgrading a tier solves the problem

Upgrading a tier is the right move when:

- The account has more support needs within ACS scope than the current tier's hours can accommodate
- The account would benefit from a named or dedicated contact rather than a shared pool
- The account needs more frequent, structured engagement cadence
- The account's complexity warrants senior architectural guidance for standard feature usage

If the account is getting value from the current tier but running into hour constraints for work within ACS scope, upgrading makes sense.

## When upgrading a tier does not solve the problem

Upgrading a tier does not solve the problem when the issue is ACS scope, not ACS capacity. If requests are being redirected because they involve SuiteScript, integrations, or implementation-partner work, a higher tier will redirect those same requests with more hours available.

The common pattern is this: an account is on Advise and feels like ACS is not delivering enough value. They upgrade to Monitor expecting better coverage. The named contact is an improvement, but the same requests that were out of scope on Advise are still out of scope on Monitor. The scope boundary did not move.

If most support requests involve the technical layer, the evaluation should be about scope, not tier.

## Which tier is appropriate for which account

**Advise** fits accounts that are newer to NetSuite, still developing their standard feature usage, and have limited customization. The value is access to Oracle guidance when questions arise, not a high-volume support relationship.

**Monitor** fits established accounts with regular but not intensive guidance needs within ACS scope. The named contact and quarterly cadence provide structure that Advise lacks.

**Optimize** fits growing mid-market accounts that actively use standard NetSuite features and need monthly structured engagement to optimize and evolve that usage.

**Architect** fits large enterprise accounts with complex multi-subsidiary environments where senior Oracle expertise on standard feature strategy is a genuine ongoing need.

For accounts where the primary ongoing work is the customization and integration layer, no ACS tier covers it. The right model for those accounts is SuitePacific: a single monthly retainer covering SuiteScript, integrations, workflows, administration, and the rest of the technical layer that ACS excludes at every tier. Plans from $799 per month, month-to-month, with direct developer access and no annual contract. [View SuitePacific plans](/netsuite-care).

---

*For a full comparison of ACS against managed support, Solution Providers, and other alternatives, see the [NetSuite ACS alternatives comparison](/netsuite-acs-alternatives-comparison).*

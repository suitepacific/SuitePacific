---
title: "How to Evaluate a NetSuite Post-Go-Live Support Partner"
description: "What to look for when choosing a NetSuite support partner after go-live: response time SLAs, capability tiers, pricing models, and the questions to ask before signing."
date: "2026-08-07"
tags: ["Post-Go-Live", "NetSuite"]
---

Most NetSuite implementations include a hypercare period where the implementation partner is still actively available. When that ends, anywhere from 30 to 90 days post-go-live, you need a support arrangement that can handle the ongoing work: user questions, small configuration changes, the occasional script issue, and the twice-yearly release cycle that touches something in your account every six months.

The support partner you choose for this phase is different from your implementation partner in important ways. Implementation is a project with a defined end. Support is an ongoing relationship where responsiveness, institutional knowledge, and cost predictability matter more than project management capability. Many teams sign with their implementation partner out of convenience without evaluating whether that firm is actually set up to do ongoing support well.

<div style="background:#eef2fb;border:1px solid #b2c2e6;border-radius:10px;padding:1.25rem 1.5rem;margin:2rem 0;font-family:system-ui,-apple-system,sans-serif">
<p style="margin:0 0 0.5rem;font-size:0.7rem;font-weight:700;color:#4f7fff;text-transform:uppercase;letter-spacing:0.08em">Quick answer</p>
<p style="margin:0;color:#14306b;font-size:0.9rem;line-height:1.6">When evaluating a NetSuite post-go-live support partner, the five most important factors are: response time SLAs for critical issues (sub-4-hour for system-down scenarios), whether the partner can handle SuiteScript development or only configuration, how they manage the twice-yearly release cycle proactively, whether pricing is retainer-based or time-and-materials (retainers align incentives better for ongoing support), and how deeply they understand your specific account before you sign. A partner who has not read your customization list and asked about your business processes is not prepared to support you. The right partner reduces escalations to Oracle NetSuite Support by resolving most issues themselves, and flags release risks before the upgrade rather than after something breaks.</p>
</div>

## What response time should you expect for critical issues?

Critical issues, where users cannot access the system, a key business process is blocked, or financial data is at risk, should have a response time commitment of four hours or less. For most mid-market companies on NetSuite, a system-down event during business hours has real financial impact within a few hours. A partner whose SLA says "next business day" for critical issues is not equipped to handle them.

The response time SLA should specify what "response" means. A response acknowledging the ticket is different from an engineer actually looking at the problem. The SLA should specify time to first meaningful update: a diagnosis, a workaround, or an escalation path.

For high-priority issues (a process is impaired but a workaround exists), four-to-eight hours is reasonable. For medium-priority issues (a feature is not working but the business can operate), same business day is appropriate. Anything less urgent can follow a standard queue.

Ask specifically: what happens on weekends? What is the emergency contact process for a Saturday go-live issue? If the partner does not have a clear answer, they do not have a real on-call rotation.

## What capability tiers matter beyond help-desk support?

Many support firms operate as ticket-logging services that pass everything to Oracle NetSuite Support or to a small pool of consultants with limited technical depth. For a NetSuite account with any customization, that is not enough.

The three capability tiers that matter for ongoing support are:

**Configuration and administration:** Adjusting roles and permissions, modifying forms and views, setting up new saved searches and dashboards, updating email templates and workflows that don't require code changes. Any qualified NetSuite administrator can do this work.

**SuiteScript development:** When a script is broken, when a new automation requires code, or when a workflow needs a SuiteScript action to execute logic that SuiteFlow cannot do natively, you need a developer. Not every support firm has SuiteScript developers on staff. Firms that don't will scope custom development as a separate project with a separate timeline, leaving you in a workaround state for weeks.

**Release management:** NetSuite releases twice per year. Each release changes something in every account. The partner should be reviewing the release notes for features relevant to your account and flagging potential regressions before the release sandbox preview period ends. A partner who waits for you to notice that something broke after the release is not doing proactive support.

## How should support be priced?

Two common models: time-and-materials and fixed-fee retainers.

**Time-and-materials** bills for actual hours worked. It is straightforward and aligns cost with work done. The downside is that it creates an incentive to spend time on tickets rather than prevent them, and it introduces variability in your monthly bill. In a month with a release and a few configuration issues, you may pay significantly more than in a quiet month.

**Fixed-fee retainers** provide a set number of hours or a defined scope of services for a flat monthly fee. This aligns the partner's incentives with yours: they profit more if fewer tickets come in, so proactive communication and training reduce their cost. It also makes your support budget predictable.

For most teams, a retainer with a defined scope (what's included, what's out of scope, what the hourly rate is for overages) is the better structure. It forces the partner to define what they will and will not do upfront, which surfaces gaps before you are in a critical situation.

## What should a good support partner know about your account before day one?

A support partner who has not reviewed your account before the engagement starts cannot support you well on day one.

Before signing, a qualified partner should ask for:

- A list of all deployed SuiteScript scripts and what each one does
- A list of active SuiteFlow workflows and their triggers
- A description of your core business processes in NetSuite (order-to-cash, procure-to-pay, close cycle)
- A summary of your user roles and who has access to what
- Any known open issues or active Oracle support cases

If the partner does not ask for any of this, they are planning to learn your account by responding to tickets. That is slower and more expensive than coming in prepared.

A good partner will also conduct a brief account review: looking at script deployment logs, searching for known problem patterns, and identifying anything that looks fragile before it becomes a support ticket.

## What questions should you ask references?

References from a support partner's existing clients are more valuable than their sales pitch. Ask:

- How quickly do you actually hear back when something urgent comes up, not what the SLA says?
- Has the partner ever caught a release issue before it broke something in production?
- When a problem turned out to be more complex than expected, how did the partner handle it?
- Has there ever been an issue they couldn't resolve without escalating to Oracle? How long did that take?
- If you had to do it again, would you choose this partner?

The answers to these questions reveal more about the partner's actual practice than any statement in a proposal.

## What should the first 90 days of a support engagement look like?

The first 90 days of a new support relationship should include:

- A formal account review session where the partner walks through what they found in your account and asks clarifying questions
- Documentation of your customizations in the partner's own records, so the knowledge is not locked to a single consultant
- A review of upcoming release notes for the next NetSuite version and a list of anything that might affect your account
- Baseline response time tracking so you can evaluate whether the SLA is actually being met

If the first 90 days feel reactive, with the partner only showing up when tickets come in, the relationship will stay reactive. A proactive support engagement looks more like an ongoing maintenance program than an emergency response service.

---

If you are looking for a support partner who covers configuration, SuiteScript development, and proactive release management under a fixed monthly fee, [SuitePacific's post-go-live support service](/netsuite-post-go-live-support) is built around that model. For related reading, see [NetSuite Post-Go-Live Checklist: What to Prioritize in Your First 90 Days](/blog/netsuite-post-go-live-checklist) and [Signs Your NetSuite Support Isn't Working](/blog/signs-netsuite-support-not-working).

## Frequently asked questions

**Q: Should you use your implementation partner for ongoing support?**
A: Not automatically. Implementation partners are optimized for project delivery: scoping work, managing timelines, and hitting a go-live date. Ongoing support requires different skills: fast response, deep familiarity with a specific account, and proactive release awareness. Some implementation partners do both well; many are better at one than the other. Evaluate them against the same criteria you would apply to any support partner.

**Q: How many hours per month does ongoing support typically require?**
A: For a mid-market company with a reasonably stable NetSuite account, 10 to 20 hours per month covers the normal volume of questions, configuration changes, and release-related work. Accounts with heavy customization, active development projects, or complex integrations may need significantly more. Release months (the twice-yearly upgrade periods) typically consume more hours than quiet months.

**Q: What is the difference between Level 1 and Level 2 support in a NetSuite context?**
A: Level 1 support handles basic questions, password resets, navigation help, and low-complexity configuration. Level 2 support handles more complex issues: script errors, workflow problems, data issues, and anything that requires a qualified NetSuite administrator or developer. Most support engagements for established accounts should be Level 2 by default; very few ongoing issues for a post-go-live account are simple enough to be Level 1.

**Q: When does it make sense to open a case directly with Oracle NetSuite Support?**
A: Oracle's support team handles confirmed bugs in the NetSuite platform, questions about specific release behavior, and cases where a feature is not working as documented. Your support partner should escalate to Oracle when a problem is clearly a platform bug rather than a configuration or customization issue. If your partner escalates frequently for issues that a qualified consultant should be able to resolve, that is a sign of limited depth.

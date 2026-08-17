---
title: "NetSuite Managed Support vs. Break-Fix: How to Decide"
description: "The two main models for ongoing NetSuite support after go-live are managed retainer and break-fix. Here is how they differ, what each costs in practice, and a decision framework for choosing between them based on your account's actual usage pattern."
date: "2026-08-18"
tags: ["Post-Go-Live", "Consulting"]
---

<div style="background:#eef2fb;border:1px solid #b2c2e6;border-radius:10px;padding:1.25rem 1.5rem;margin:2rem 0;font-family:system-ui,-apple-system,sans-serif">
<p style="margin:0 0 0.5rem;font-size:0.7rem;font-weight:700;color:#4f7fff;text-transform:uppercase;letter-spacing:0.08em">Quick answer</p>
<p style="margin:0;color:#14306b;font-size:0.9rem;line-height:1.6">Managed support (retainer) and break-fix (time-and-materials) differ in two ways that matter: context and cost structure. Managed support retains ongoing context on your account, so each request costs less time than the same request under break-fix, where the consultant re-learns your account on every engagement. Break-fix appears cheaper per hour but is typically more expensive per completed item once re-onboarding time is factored in. Choose managed support when your account generates at least four to six hours of ongoing work per month. Choose break-fix when your account needs support only once or twice a year for isolated, self-contained items.</p>
</div>

Every live NetSuite account eventually needs technical support: something breaks, a new process requires automation, an integration needs maintenance. The question is how to structure that support.

Two models dominate post-go-live NetSuite support. Understanding how they actually work, not just how they are sold, makes the decision easier.

## How managed support works

Managed support (also called a retainer or managed services) is a fixed monthly engagement. You pay for a block of hours each month; those hours are applied to whatever comes up: development requests, fixes, configuration changes, questions, release reviews.

The defining characteristic is continuity. The same consultant or team handles every request. They maintain ongoing context on your account: what was built, why it was built that way, what is known to have issues, what was tried and did not work. Each request builds on that context rather than starting from scratch.

A well-functioning managed support relationship means that the second request takes less time than the first, because the consultant already knows the account. After six months, they know the account well enough that routine requests require minimal investigation before work begins.

**What managed support is good for:**

- Accounts with ongoing, recurring development and maintenance needs
- Accounts where the customization layer is complex enough that re-learning it every time is expensive
- Situations where proactive work matters: pre-release Sandbox reviews, proactive identification of issues before they surface in Production
- Teams that want a single technical resource who knows the account and can answer questions quickly

## How break-fix works

Break-fix (also called time-and-materials or on-demand support) is transactional. You engage a consultant for a specific item, pay per hour or per project, and the relationship ends when that item is done.

The defining characteristic is the absence of continuity. Each engagement starts with the consultant re-learning your account. They read existing scripts, ask about the account's history, understand what was built before. This re-onboarding takes time on every engagement.

For a simple isolated task that takes four hours to complete, re-onboarding might add two hours. For a complex task that requires understanding the full automation architecture of the account before making changes, re-onboarding might add a full day.

**What break-fix is good for:**

- Accounts with infrequent, isolated needs (once or twice a year)
- Specific, well-defined projects where scope is fixed and the consultant can work without deep account context
- Situations where a retainer commitment is not practical (budget cycles, uncertain needs)
- Accounts where the customization layer is simple enough that re-onboarding is not expensive

## The real cost comparison

The billing rate comparison is misleading. Break-fix often carries a higher hourly rate than managed support. But the more important comparison is cost per completed item, which includes re-onboarding time.

Consider a request that takes a skilled NetSuite developer three hours to complete once they understand the account.

**Under managed support:** Three hours of work. The developer already knows the account.

**Under break-fix:** Three hours of work plus 1-3 hours of re-onboarding (reading existing customizations, understanding the context for the change, confirming what else is on the record type). The same request costs four to six hours.

For accounts with three to five requests per month, that re-onboarding cost accumulates. An account paying for eight hours of effective work per month under break-fix may actually be paying for twelve hours of total time, with a third of it going to re-onboarding rather than productive work.

At some threshold of request volume, managed support becomes more economical even if the hourly rate is the same or slightly higher.

## The context dividend

There is a benefit to managed support that is not captured in the time comparison: the context dividend.

Under break-fix, the consultant diagnoses each problem from scratch. If an issue turns out to have a non-obvious cause, the re-diagnostic process is billed. If a change turns out to interact unexpectedly with an existing customization, the investigation is billed. If the consultant's solution turns out to be the wrong approach for the account's specific configuration, the rework is billed.

Under managed support, the consultant has built understanding of the account over time. Non-obvious causes are less non-obvious because they have context. Unexpected interactions with existing customizations are less unexpected because they know what the customizations do. Wrong approaches are rarer because the consultant knows the account's constraints.

This is not a guarantee; managed support consultants make mistakes too. But the error rate and the diagnostic time for a consultant who has been maintaining an account for a year are meaningfully lower than for one who is starting fresh on each engagement.

## Side-by-side comparison

| | Managed retainer | Break-fix |
|---|---|---|
| Account context | Retained across every request | Rebuilt at the start of each engagement |
| Re-onboarding per request | None | 1-3 hours typical; more on complex accounts |
| Cost per completed item | Lower at 4+ hours/month | Higher once re-onboarding is included |
| Release review | Included proactively each cycle | Not included; reactive only |
| Response to urgent issues | Direct developer contact, no ramp-up | Depends on availability; ramp-up required |
| Minimum commitment | Typically 3-month minimum, then month-to-month | None; per-request |
| Best for | Ongoing, recurring development and maintenance | Isolated, infrequent, self-contained items |

## The decision framework

**Choose managed support when:**

- Your account generates four or more hours of support work per month consistently
- Your customization layer is complex enough that re-onboarding on every engagement would be expensive
- You want proactive work: pre-release reviews, identification of issues before they surface
- Direct access to a developer who knows your account matters for response time
- You want a single technical relationship with institutional context about your account

**Choose break-fix when:**

- Your account needs support only once or twice a year for isolated items
- Each item is self-contained and does not require deep account context to address
- You cannot commit to a monthly retainer due to budget or organizational constraints
- The specific item you need done is well-defined enough to scope as a fixed-price project

**The gray zone:**

Accounts that need support regularly but sporadically (three months of intensive needs, then a quiet period) are in a gray zone. A managed retainer with a low base commitment that can scale up during intensive periods is often the right structure here. Many support providers offer flexible commitment levels for this reason.

## What to ask about each model

When evaluating a managed support provider:

- What does the monthly hour commitment include? Are questions and advisory counted against the hours? Is release review included or extra?
- What happens to unused hours? Do they roll over, expire, or bank?
- How is urgent work handled? If something breaks, does it come from the monthly hours or is it separate?
- What is the minimum commitment? Most managed support engagements have a minimum term (typically three months) before going month-to-month.

When evaluating a break-fix arrangement:

- Is the rate per hour or per project? If per project, what happens if scope expands?
- What is included in re-onboarding, and how is that billed?
- What is the response time expectation for urgent items without a retainer relationship?
- If the item involves existing customizations, is the investigation time separate from the fix time?

For how the decision fits into a broader evaluation of post-go-live support options, see [how to evaluate a NetSuite post-go-live support partner](/blog/how-to-evaluate-netsuite-support-partner). For fixed-price monthly support options, the [NetSuite Care plans](/netsuite-care) provide managed support at 10, 20, or 35 hours per month.

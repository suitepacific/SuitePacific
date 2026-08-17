---
title: "How to Evaluate a NetSuite Post-Go-Live Support Partner"
description: "What to look for when choosing an ongoing NetSuite support partner: the questions that separate thorough providers from superficial ones, what certifications mean in practice, and red flags that indicate a poor fit before you commit."
date: "2026-08-18"
tags: ["Post-Go-Live", "Consulting"]
---

<div style="background:#eef2fb;border:1px solid #b2c2e6;border-radius:10px;padding:1.25rem 1.5rem;margin:2rem 0;font-family:system-ui,-apple-system,sans-serif">
<p style="margin:0 0 0.5rem;font-size:0.7rem;font-weight:700;color:#4f7fff;text-transform:uppercase;letter-spacing:0.08em">Quick answer</p>
<p style="margin:0;color:#14306b;font-size:0.9rem;line-height:1.6">Evaluating a NetSuite post-go-live support partner comes down to four questions: Who will actually do the work? Can they handle both development and administration from the same engagement? Do they review releases before they hit your Production account? And do they document what they build? A partner who provides direct developer access, covers SuiteScript development and configuration in the same engagement, proactively reviews releases in Sandbox, and documents their work is likely a good fit. A partner who layers account managers between you and the developer, scopes every routine request as a new SOW, and discovers release problems after they affect Production is not.</p>
</div>

Choosing a NetSuite post-go-live support partner is a decision that affects every development request and every incident for as long as the engagement runs. A good partner reduces operational overhead, builds institutional knowledge of your account, and handles problems before they become emergencies. A poor fit creates friction on every request and loses context with every developer change.

The questions below are designed to separate good-fit partners from poor-fit ones before you sign a contract.

## Question 1: Who will actually do the work?

This is the most important question. Large consulting firms often sell accounts on senior certified developers and deliver work through junior staff or offshore teams. The person you speak to during the sales process is frequently not the person who will write your scripts.

**What to ask:** "Who specifically will handle day-to-day development and administration for our account? What is their NetSuite certification level? Can we speak with that person before we commit?"

**Good answer:** You speak directly with the developer who will do the work. They can answer specific NetSuite questions from real experience.

**Red flag:** The sales process involves an account manager or business development contact who does not do the technical work and cannot answer specific questions about SuiteScript governance limits, SuiteFlow entry conditions, or RESTlet authentication.

**Why it matters:** Post-go-live support is a relationship built on institutional knowledge of your account. The person who builds that knowledge should be the person handling every request. Frequent developer handoffs reset the learning curve on every transition.

## Question 2: What certifications do they hold?

Oracle NetSuite certifications are the primary credential for NetSuite developers and administrators. They require passing proctored exams on specific subject matter.

The most relevant certifications for post-go-live support:

**SuiteCloud Developer II:** The developer certification for SuiteScript 2.x, SuiteFlow, and integration development. Requires demonstrating proficiency with the specific APIs and patterns used in production NetSuite development.

**Administrator Professional:** Covers configuration, role management, saved searches, dashboards, and the administrative layer that does not require scripting.

**What to ask:** "What specific NetSuite certifications does the developer who will be working on our account hold? Can you share the certification credentials?"

**Good answer:** Current SuiteCloud Developer II and/or Administrator Professional certification, with credentials verifiable through Oracle's certification portal.

**Red flag:** Claims of "NetSuite experience" or "NetSuite expertise" without specific certifications. Oracle certifications require passing exams; experience claims require nothing.

## Question 3: How do they handle the scope of ongoing work?

Ongoing NetSuite support covers both development (scripts, workflows, integrations) and administration (configuration, roles, saved searches, custom fields). Some providers separate these into different engagement types or require a new SOW for development work.

**What to ask:** "If we are on a monthly retainer and we need a new workflow built and a user's role updated in the same month, how is that handled? Do we need a separate statement of work for the workflow?"

**Good answer:** Both items are handled within the retainer. There is no new SOW required for routine development or administration work within the engagement.

**Red flag:** Development work requires a separate scoping process or a new SOW even for relatively simple items. This structure adds overhead to every routine request and is a sign that the engagement model is designed for project work, not ongoing support.

**Follow-up question:** "What would not be covered within the retainer, and how would we know when something requires additional scope?"

A good partner can articulate where the boundary is (major new modules, complex migrations) versus what is routine (scripts, workflows, saved searches, configuration changes).

## Question 4: How do they handle NetSuite releases?

NetSuite releases twice per year, and each release potentially affects existing customizations. A support partner who discovers release-related problems after they affect Production is not providing adequate protection against a predictable, recurring risk.

**What to ask:** "How do you handle NetSuite's twice-yearly release cycle? What do you do in Sandbox before a release reaches Production?"

**Good answer:** Before each release, the partner reviews release notes for changes that might affect your customizations, tests affected areas in Sandbox, and identifies and resolves issues before the release reaches Production.

**Red flag:** "We address release issues as they come up in Production." This means release problems are discovered by users, not caught in advance.

**Follow-up question:** "Can you give an example of a release issue you caught in Sandbox before it affected a client in Production?"

A partner who has been doing pre-release testing should be able to give a specific example. Vague answers suggest the testing is not systematic.

## Question 5: How do they document what they build?

The single largest risk in any NetSuite support engagement is developer transition. If the developer who has been maintaining your account leaves or the engagement ends, you need to be able to understand what was built and why. Without documentation, that understanding does not transfer.

**What to ask:** "How do you document the work you build? What would a new developer find if they inherited our account from you?"

**Good answer:** Scripts are documented with inline comments explaining purpose and behavior. A running account inventory is maintained documenting active scripts, workflows, and integrations. Decisions that are not obvious from the code are documented so that a future developer understands why, not just what.

**Red flag:** "Our developers write clean code." Clean code is not documentation. It describes what the code does, not why it does it that way, what was tried before, or what constraints shaped the approach.

**Follow-up question:** "What does offboarding look like? What would you provide if we ended the engagement?"

A partner with good documentation practices can articulate what they would hand over. A partner without them will give a vague answer.

## Question 6: What is the response time for urgent issues?

Live NetSuite accounts have urgent issues: a script breaks during a critical period close, an integration fails, a workflow stops routing approvals. How a support partner responds to these incidents matters.

**What to ask:** "How do you handle urgent issues? What is the response time for a Production script failure, and how does that work in practice?"

**Good answer:** Direct contact with the developer on the account, same-day response for Production failures, a clear process for escalation. Because the developer knows your account, there is no ramp-up time for diagnosis.

**Red flag:** Urgent issues go into a ticket system. Response time depends on the support tier. The person who responds may not be familiar with your account.

**Why it matters:** An urgent issue handled by someone who knows your account takes a fraction of the time to diagnose compared to someone who does not. Response time matters less than effective response time (how long before the problem is actually understood and being worked on).

## Red flags worth walking away from

**The SOW-per-request model for routine work.** If every routine development request requires a new statement of work before work begins, the engagement model is structured for projects, not ongoing support. This adds overhead and delay to everything.

**"We have a team of developers"** as the answer to who will do the work. Post-go-live support requires continuity. A rotating team means no single developer builds the institutional knowledge of your account. Each request gets a developer who is partially learning your account.

**No direct access to the developer.** If you communicate through an account manager who then communicates to a developer you never speak with, the response time for nuanced questions is slow and the context transfer is lossy. You should be able to ask the developer a specific question about your account and get a specific answer.

**Implementation partner offering ongoing support with the same engagement model.** Implementation partners are structured for large projects. Their engagement models (SOW-per-request, junior staff on smaller accounts, account manager layers) are designed for project delivery. Most post-go-live accounts do not need project-scale consulting; they need a responsive, knowledgeable developer who knows the account.

## How to run the evaluation

A structured evaluation of two to three providers takes a week. For each provider:

- One-hour call covering the six questions above
- Ask for a specific example of a challenge they encountered on a current account and how they handled it (not a sanitized case study; a specific situation)
- Ask to speak with one current client about their experience
- Review the proposed engagement structure against the red flags

The result is enough information to make a confident decision without over-engineering the process.

For a buyer's guide on what post-go-live support covers, see [what is NetSuite post-go-live support](/blog/what-is-netsuite-post-go-live-support). For the managed support vs. break-fix decision, see [NetSuite managed support vs. break-fix](/blog/netsuite-managed-vs-break-fix-support). For an overview of the full post-go-live support offering, see [NetSuite post-go-live support](/netsuite-post-go-live-support).

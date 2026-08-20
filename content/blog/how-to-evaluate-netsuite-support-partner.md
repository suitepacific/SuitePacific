---
title: "How to Evaluate a NetSuite Post-Go-Live Support Partner"
description: "The criteria for choosing a post-go-live NetSuite support partner are different from what mattered during implementation selection. Here is what to look for, what questions to ask, and how to run a structured evaluation."
date: "2026-08-20"
updated: "2026-08-20"
tags: ["Partner Replacement", "Post-Go-Live", "Consulting"]
---

<div style="background:#eef2fb;border:1px solid #b2c2e6;border-radius:10px;padding:1.25rem 1.5rem;margin:2rem 0;font-family:system-ui,-apple-system,sans-serif">
<p style="margin:0 0 0.5rem;font-size:0.7rem;font-weight:700;color:#4f7fff;text-transform:uppercase;letter-spacing:0.08em">Quick answer</p>
<p style="margin:0;color:#14306b;font-size:0.9rem;line-height:1.6">The criteria that mattered for choosing an implementation partner — firm size, number of certifications, project methodology, sales track record — are largely irrelevant for post-go-live support. What matters for ongoing support is individual developer expertise (not firm headcount), retainer-based availability (not SOW-driven billing), direct access to the person doing the work (not an account manager intermediary), and demonstrated familiarity with accounts similar to yours. The evaluation process for a support partner should test these things directly, not rely on credentials and case studies designed for implementation selection. A structured evaluation takes one to two weeks and includes a technical test conversation, billing model review, and reference check with companies in ongoing retainer relationships.</p>
</div>

Implementation partners are evaluated on their ability to execute a complex project: experience with similar companies, methodology, certifications, team size, and references from comparable go-lives. Those signals are meaningful for a six-month implementation project.

They are weak signals for post-go-live support, where the account's needs are different: fast turnaround on individual requests, institutional knowledge of a specific account, direct access to technical expertise, and a billing model that makes small requests economically rational. A large firm with fifty NetSuite certifications is not necessarily better at this than a smaller firm with deep expertise and a retainer model that fits the actual work.

This guide walks through how to structure a support partner evaluation, what questions to ask, what red flags to watch for, and how to verify claims before committing to a relationship.

## What to test in the evaluation

**Test response time, not just availability claims.** Ask a specific technical question in the initial conversation and observe how fast and how accurate the answer is. "We have a SuiteScript user event that started failing after the 2026.2 release; what would you check first?" is a better evaluation tool than references and case studies. A provider who knows NetSuite well will answer this immediately and specifically, likely mentioning that they would check the Script Execution Log in NetSuite, look for API version deprecations in the release notes, and verify whether the affected record types changed in the release. A generalist firm will schedule a follow-up call.

**Ask who does the work.** In larger firms, the person who sells the engagement is not the person who executes it. Ask directly: who would be working in our NetSuite account? Can we speak with that person during the evaluation? The quality of that conversation tells you more than any proposal document. If the answer is that a team handles it and you cannot speak with a specific developer during the sales process, that is what post-sale access will look like too.

**Understand the billing model.** The billing model determines whether small requests are practically accessible. A provider that charges $200/hour with a two-hour minimum and requires a scoping call before starting work is expensive for a one-hour request even if the hourly rate looks lower than a retainer alternative. Ask: how would a 90-minute script fix be billed? What is the process from my request to delivery? For ongoing support, a retainer model with a defined monthly hour block and no SOW requirement for small requests is structurally better than hourly billing with minimums.

**Ask about release preparation.** NetSuite releases twice per year (typically in January and July). A support partner who treats this as optional client advisory work is different from one who proactively reviews your specific customizations against upcoming release notes and tells you what needs testing in Sandbox before Production updates. Ask what they did for the last release cycle and what their process looks like. Specifically: did they review your account's scripts and workflows against the deprecation list? Did they test anything in Sandbox before the release window?

**Ask about account knowledge retention.** What happens when the consultant who knows your account leaves the firm or moves to another client? How is institutional knowledge documented? This is a common failure mode with larger firms: the person who built familiarity with the account rotates off, and the replacement starts from scratch. Ask directly how they handle this. A provider who documents account context as a matter of course is meaningfully different from one who stores it in individual consultant knowledge.

## Questions to ask in the evaluation conversation

These questions surface how a provider actually works rather than how they describe themselves:

**On their process:**
- Walk me through what happens when I send a support request. Where does it go, who sees it, and what is my first point of contact?
- If the request is urgent, how does that change the process?
- How do you handle a request that turns out to be more complex than initially estimated?

**On technical depth:**
- What NetSuite releases in the past two years have caused the most issues for your clients' customizations?
- How do you handle SuiteScript governance unit errors when they appear in production?
- If we had a scheduled script that runs nightly and suddenly stops completing, what would your diagnostic process be?

**On account management:**
- How many active accounts does the consultant working on our account support at one time?
- What documentation will you maintain about our account, and who owns that documentation if we part ways?
- How do you handle requests that fall outside the retainer scope?

**On pricing and scope:**
- If we need a new feature built that takes 20 hours, how is that handled relative to our retainer?
- What has not gone well with a client in the past and how did you resolve it?

The last question is the most revealing. A provider who cannot answer it, or who gives a generic answer about "communication challenges," has not thought critically about their failures. A provider who gives a specific, honest answer about what went wrong and what they changed has.

## Criteria that matter less than they seem

**Firm size.** A fifty-person NetSuite practice is not inherently better for post-go-live support than a five-person one. What matters is the expertise of the specific people working on your account and the model they use. A large firm may assign a junior consultant to ongoing support accounts while their senior developers work on implementations. A small firm may put senior expertise directly on every account.

**Number of certifications.** NetSuite certifications indicate exam performance, not practical capability. A SuiteCloud Developer II certification means someone passed a certification exam; it does not tell you how they handle a failing integration at 5pm on a Friday. Certifications are a useful baseline filter, not an evaluation criterion in themselves. Use them to screen out providers with no NetSuite-specific training, not to rank providers against each other.

**Reference clients from implementation projects.** A firm with a strong implementation track record may operate a support practice as a secondary business. The relevant references are from companies they support on an ongoing basis, not from companies they implemented two years ago. Ask specifically for references from clients in ongoing retainer relationships, not from implementation project completions.

**NetSuite partner tier.** Oracle's partner program tiers are based on revenue and certifications, not on support quality. A Star or Alliance partner ranking indicates business volume and training investment; it does not predict how fast they respond to a support request or how well they know your specific account type.

**Geographic location.** NetSuite development is done remotely by nature. A firm in your city is not inherently better positioned to support your account than one across the country. What matters is time zone overlap for urgent requests and whether the developer is accessible during your business hours. A US-based provider working Central time serves an East Coast company as well as a local provider would.

## Red flags during the evaluation

**Slow response during the sales process.** If it takes multiple business days to get answers to basic evaluation questions, that is the response time you will get for non-urgent support requests after signing. Sales cycles are when a provider is most motivated to be responsive.

**No specific answer to technical questions.** "We have experienced SuiteScript developers on staff" is not an answer to a technical question. A provider with genuine expertise answers technical questions directly and specifically. Deflection to a discovery process before answering anything technical suggests the salesperson and the technical team are separate, and you are talking to the salesperson.

**Billing model that requires SOW for every request.** If every request, regardless of size, requires a scope document and approval cycle before work can start, the operational overhead makes small requests impractical. Over time, small requests will pile up unresolved because initiating the billing process is not worth the effort for a two-hour task.

**References that are not comparable.** A reference from a company in a different industry, with a different NetSuite module configuration, on a different retainer model than what you are considering is not a meaningful reference for your situation. Ask for references from companies similar to yours in terms of industry, company size, and the type of work you need.

**Vague answers about who does the work.** If the evaluation conversation is entirely with a sales or client success person and you never speak with an actual developer, you cannot evaluate technical capability. A boutique or specialist firm will put the technical person on the call from the start. A larger firm may not.

**Offshore or rotation-heavy delivery model.** Offshore delivery adds communication overhead and time zone delay that matters for urgent support requests. Rotation-heavy models where different consultants pick up your requests mean no one builds deep account familiarity. Both are worth asking about directly if they are not disclosed.

## How to structure the evaluation

A structured support partner evaluation takes one to two weeks and follows this sequence:

**Week 1, days 1-3:** Send RFI (request for information) to two to four providers. Ask for: how they handle ongoing support retainers, who would work on the account, how billing works, and a recent example of a complex support situation they resolved for a client.

**Week 1, days 3-5:** Review responses. Shortlist two providers for deeper conversations. Schedule calls that include the technical person who would actually work on the account.

**Week 2, days 1-3:** Technical evaluation calls. Use the question list above. Ask a specific technical question about a real issue in your account if one exists. Evaluate both the accuracy of the answer and the speed at which it arrives.

**Week 2, days 3-5:** Reference check. For each finalist, call one or two of their ongoing support clients. Ask: how responsive are they? What happens when something is urgent? Has there been a situation where they let you down and how did they handle it?

**Decision.** Select the provider with the strongest technical conversation, the billing model that matches how you actually need to use support, and references that confirm their claims.

## Evaluating for your specific stack

Support partners are not uniformly capable across all NetSuite configurations. The type of work you need should inform who you evaluate.

**SuiteScript-heavy accounts.** If your account has significant custom scripting, ask for specific examples of SuiteScript 2.x work similar to what you have: User Event scripts for transaction validation, Map/Reduce scripts for large data processing, RESTlets for integration endpoints. Ask what version of SuiteScript they prefer and why. Preference for SuiteScript 1.0 without a good reason is a red flag in a new provider.

**Integration-dependent accounts.** If your account relies on integrations with Shopify, Salesforce, third-party 3PLs, or custom API connections, evaluate whether the provider has worked with those specific platforms. Integration debugging requires knowledge of both sides of the connection.

**SuiteBilling/ARM accounts.** SuiteBilling configuration, Advanced Revenue Management, and subscription/revenue recognition workflows are specialized. A provider who has not handled ARM disputes, billing pipeline issues, or revenue reclassifications before will have a steep learning curve. Ask specifically whether they have worked with SuiteBilling in a live account.

**OneWorld multi-entity accounts.** Intercompany transactions, elimination workflows, currency revaluation, and consolidated reporting in a multi-subsidiary environment are more complex than single-entity NetSuite. A provider who has only worked with single-entity accounts will encounter this complexity for the first time on your account.

## What good looks like in practice

A strong post-go-live support partner has the following characteristics:

**Direct communication.** Requests go directly to the person doing the work. No ticket system, no account manager relay, no offshore queue.

**Fast initial response.** For most requests, an initial response within a few hours. For urgent production issues, same-day attention.

**Transparent turnaround estimates.** When a request comes in, the provider gives a realistic estimate for when it will be done and updates that estimate if something changes. No black boxes.

**Proactive release review.** Before each NetSuite release, the provider reviews your specific customizations and tells you what to test, not just a generic list of release notes items.

**Account documentation.** The provider maintains their own documentation of your account: key customizations, integration architecture, known issues. This documentation belongs to you, not to them.

**Retainer model that matches the work.** Monthly retainer for a defined number of hours, covering both maintenance and new development requests. No SOW required for small requests. Larger projects are scoped and handled within the same relationship at a known rate.

**Honest scope conversations.** When a request falls outside what the retainer covers, or when something is not the right approach, the provider says so directly rather than taking the work and delivering something suboptimal.

For what this looks like at SuitePacific specifically, see the [NetSuite Care plans](/netsuite-care) for fixed-price monthly retainer options, or the [post-go-live support](/netsuite-post-go-live-support) page for an overview of what ongoing support covers.

---

## Related reading

- [Signs it is time to replace your NetSuite partner](/blog/signs-time-to-replace-netsuite-partner): how to recognize when the current relationship has run its course.
- [How to switch NetSuite partners](/blog/how-to-switch-netsuite-partners): what the transition process looks like and how to preserve account knowledge during a handoff.
- [NetSuite partner replacement](/netsuite-partner-replacement): what the replacement process covers and what to expect from a new provider.

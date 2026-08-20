---
title: "How to Switch NetSuite Partners Without Losing Account Context"
description: "Switching NetSuite partners after go-live is straightforward when done in the right order. Here is what the transition actually looks like, how to preserve account knowledge, and what to do when the outgoing partner is uncooperative."
date: "2026-08-20"
updated: "2026-08-21"
tags: ["Partner Replacement", "Post-Go-Live", "Consulting"]
---

<div style="background:#eef2fb;border:1px solid #b2c2e6;border-radius:10px;padding:1.25rem 1.5rem;margin:2rem 0;font-family:system-ui,-apple-system,sans-serif">
<p style="margin:0 0 0.5rem;font-size:0.7rem;font-weight:700;color:#4f7fff;text-transform:uppercase;letter-spacing:0.08em">Quick answer</p>
<p style="margin:0;color:#14306b;font-size:0.9rem;line-height:1.6">Switching NetSuite partners does not require NetSuite's involvement and does not disrupt your live system. You select a new provider, grant them admin access to your account, and remove the previous partner's access. The main risk is losing account context: documentation of why customizations were built, how integrations are structured, and what decisions were made during implementation. A well-executed transition prioritizes capturing that context before the previous partner's access is removed, ideally through a structured knowledge transfer session rather than just credential handoff. A typical transition takes two to four weeks when the outgoing partner cooperates. The most common complication is an outgoing partner who is unresponsive or who delays providing documentation. In that case, the incoming provider works directly from the account, reading scripts, workflows, and integration configurations to reconstruct the context that the outgoing partner did not document. This takes longer but is always possible; no partner owns the account itself, only their access to it.</p>
</div>

The mechanics of switching NetSuite partners are simple. The knowledge transfer is where most transitions go wrong.

Companies that switch partners after go-live often do so because the relationship has degraded to the point where communication is difficult. When communication is already strained, asking the outgoing partner to document their work thoroughly is unlikely to produce a complete handoff. The incoming partner then inherits an account with gaps in its history, and months later someone notices a script is doing something unexpected and nobody knows why it was built that way.

This guide walks through what a well-executed partner switch looks like, how to minimize knowledge loss, and how to handle transitions when the outgoing partner does not cooperate.

## Step 1: Select the new partner before notifying the current one

The first step is selecting the incoming provider and getting them oriented on your account before notifying the current partner. This matters for two reasons.

First, the incoming provider can tell you what they need to know about the account before they take over. Having a clear list of questions going into a knowledge transfer session produces a better outcome than a free-form handoff. A provider who has done many account transitions knows exactly what documentation they need and what questions to ask.

Second, once you notify the current partner that you are leaving, their incentive to cooperate on knowledge transfer decreases. Some partners handle this professionally regardless; others become less responsive or less thorough once they know the relationship is ending. Having the incoming provider engaged first means you can move quickly after the notification and you are not left waiting for a replacement while in limbo.

When evaluating incoming providers before making the switch, ask specifically about their onboarding process for inherited accounts. A provider who has a structured process for this is a better sign than one who treats it as a standard new-client start.

## Step 2: Audit what documentation exists

Before the handoff, inventory what written documentation exists about the account. This typically includes:

**Implementation project files:** Statement of work, design documents, data migration mapping files, test scripts. These usually live with the implementation partner, not in the NetSuite account itself. You may have received copies at the time; if not, request them now.

**SuiteScript documentation:** Comments in script code, any external documentation about what scripts do and why they were built. Check the File Cabinet in NetSuite for any documentation files the partner stored there. Navigate to Documents in your NetSuite account and look for a folder with the partner's name or labeled with documentation.

**Integration documentation:** Architecture diagrams, field mappings, credential locations, and contact information for third-party integration platforms. For each active integration, you need to know where the API keys and credentials are stored, what the integration does on each side, and what the failure behavior looks like.

**Configuration decisions:** Records of why specific setup choices were made. Why a particular subsidiary structure was chosen, why certain workflows were built the way they were, why specific custom fields exist. This type of documentation is almost never written down, which is why the knowledge transfer session in Step 3 is critical.

Most accounts have less documentation than they should. The gaps you identify before the handoff become the agenda for the knowledge transfer session.

## Step 3: Request a knowledge transfer session

A knowledge transfer session is a structured call or series of calls where the outgoing partner walks through the account configuration with the incoming provider present. This is more valuable than document handoff alone because it captures the reasoning behind decisions, not just the decisions themselves.

A useful knowledge transfer agenda covers:

- **SuiteScript customizations:** What each script does, what triggers it, what it was built to solve, and any known limitations or edge cases. For accounts with many scripts, focus on the highest-risk ones: scripts that touch transactions, scripts that run on a schedule, and scripts that integrate with external systems.
- **Workflow configuration:** The same for complex workflow logic. Multi-step approval chains with conditional branching are the most likely to have undocumented edge cases.
- **Integration architecture:** How each integration works, where credentials are stored, what the failure modes are, and how errors have been handled historically. Ask specifically: what happens when the integration fails? Who gets notified? How has it been handled in the past?
- **Ongoing issues:** Anything that has been discussed but not yet resolved, known limitations in the current configuration, or pending requests that were in progress at the time of the transition.
- **Release history:** What customizations have been affected by past NetSuite releases, and what workarounds or fixes have been applied. This prevents the incoming provider from repeating work that was already done.

The incoming provider should ask specific questions rather than accepting a high-level overview. The goal is institutional knowledge transfer, not a demo.

## Step 4: Grant the new partner access before removing the old one

Create admin-level login credentials or an administrator role for the incoming provider before removing the outgoing partner's access. There should be no gap where the account has no active support partner with full visibility.

In NetSuite, this means:

- Creating a new user record for the incoming provider's team with an appropriate role (typically Administrator or a custom role with equivalent permissions)
- If the incoming provider uses token-based authentication for scripts or integrations, setting up new TBA credentials under Setup > Integrations > Manage Authentication > NetSuite Token-Based Authentication
- Confirming the incoming provider can access the File Cabinet, SuiteScripts, and all relevant saved searches
- Verifying they can see all subsidiaries if your account uses OneWorld multi-entity

The outgoing partner's access is removed only after the incoming provider has confirmed full access and has had enough time to orient themselves in the account.

## Step 5: Run a parallel review period

The first thirty to sixty days with a new provider are the highest-risk period. The incoming provider is still building familiarity with the account, and issues that the outgoing partner knew about may not have been fully documented.

During this period, route all requests through the new provider but pay attention to their questions. The questions they ask reveal the gaps in the knowledge transfer. If the same context keeps coming up repeatedly, it is worth writing it down as a reference document for future use. A good incoming provider will be building their own documentation of your account during this period.

At the sixty-day mark, most transitions have stabilized. The incoming provider has dealt with enough requests to know the account well, and the rhythm of the new support relationship has been established.

## What to do when the outgoing partner is uncooperative

Not all transitions proceed smoothly. When the outgoing partner is slow to respond, provides incomplete documentation, or declines to participate in a knowledge transfer session, the incoming provider has to reconstruct account context from the account itself.

A thorough account review can recover most of this context. SuiteScript code is visible in the Scripts section under Customization. Workflow logic is accessible under Setup. Saved searches can be opened and reverse-engineered. Integration configuration is usually readable from the integration records.

What cannot be recovered is the reasoning behind decisions: why a particular field was built a certain way, why a workflow has an unusual condition, why an integration was structured with a specific workaround. The incoming provider will encounter edge cases where understanding the original rationale would have saved time.

The practical response to an uncooperative transition is to build that context progressively through the first sixty to ninety days rather than trying to reconstruct everything upfront. Each time the incoming provider investigates something, they document what they found. Over time this builds an account knowledge base that may actually be more accurate than whatever the outgoing partner would have provided.

If the outgoing partner holds credentials that are not recoverable from the NetSuite account itself (for example, API keys to a third-party platform that were set up under their own account), you may need to contact those platforms directly to rotate credentials into accounts you control.

## How long does a partner transition take?

A well-organized transition with a cooperative outgoing partner takes two to four weeks from notification to full handoff. This includes time for the knowledge transfer session, access setup, a short overlap period, and the incoming provider's initial account review.

A transition with an uncooperative outgoing partner, or an account with undocumented complexity, takes longer. Forty-five to sixty days is realistic for complex accounts where the incoming provider needs time to reconstruct context through progressive review.

Rush transitions are possible but carry higher risk. If a relationship has broken down to the point where immediate replacement is needed, the incoming provider can be operational within a few days; the knowledge transfer work then happens over the following weeks while they are already supporting the account.

## Common mistakes during partner transitions

**Removing the outgoing partner's access before the incoming provider is oriented.** This creates a coverage gap and leaves the incoming provider without the ability to ask the outgoing team questions they realize they need answered after the handoff call.

**Assuming documentation from the outgoing partner is complete.** Treat received documentation as a starting point for a review, not as a complete account of the account's configuration. The incoming provider should independently verify key customizations against the documentation and flag discrepancies.

**Not reviewing contract terms before notifying the outgoing partner.** Some implementation agreements include notice periods. Notifying the outgoing partner in writing and checking for any contractual transition obligations prevents disputes after the fact.

**Skipping the Sandbox check.** Before the outgoing partner's access is removed, confirm the incoming provider can access your Sandbox environment. Sandbox is where release testing and new development work happens; not having access to it creates delays immediately after the transition.

## What the incoming provider should deliver at the start

A good incoming provider does not wait to be asked for documentation. Within the first thirty to sixty days, they should produce their own account summary: the key customizations, the integration architecture, the areas they identified as having technical debt or risk. This document serves as the institutional knowledge baseline going forward and should be updated as the account evolves.

For what post-go-live support looks like once the transition is complete, see [NetSuite post-go-live support](/netsuite-post-go-live-support) and the [NetSuite Care plans](/netsuite-care) for retainer options.

---

## Related reading

- [Signs it is time to replace your NetSuite partner](/blog/signs-time-to-replace-netsuite-partner): the specific patterns that indicate the relationship has run its course.
- [How to evaluate a NetSuite post-go-live support partner](/blog/how-to-evaluate-netsuite-support-partner): what to look for when selecting a replacement and how to compare options.
- [NetSuite partner replacement](/netsuite-partner-replacement): what SuitePacific covers for accounts transitioning from a previous partner.

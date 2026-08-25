---
title: "NetSuite Custom GL Plugin: What It Can and Cannot Do"
description: "What the NetSuite Custom GL Plugin can and cannot do, the transaction types where it does not execute, and the design principles for using it correctly."
date: "2026-08-09"
updated: "2026-08-14"
tags: ["SuiteScript", "Accounting", "Development"]
---

The accounting requirement looks simple on paper: when a transaction posts, also generate a corresponding entry to a secondary account for management reporting. A developer builds it, tests it in Sandbox, and it works. Then it gets deployed to Production and the controller notices it is not running on the specific transaction types the requirement was designed for.

The developer investigates and finds that the Custom GL Plugin, correctly implemented, does not execute on several documented transaction types. The build was never going to work in Production on those transactions. Nobody knew to test for them in Sandbox.

That outcome is avoidable. Understanding what the Custom GL Plugin can and cannot do before you design the solution is what prevents it.

<div style="background:#eef2fb;border:1px solid #b2c2e6;border-radius:10px;padding:1.25rem 1.5rem;margin:2rem 0;font-family:system-ui,-apple-system,sans-serif">
<p style="margin:0 0 0.5rem;font-size:0.7rem;font-weight:700;color:#4f7fff;text-transform:uppercase;letter-spacing:0.08em">Quick answer</p>
<p style="margin:0;color:#14306b;font-size:0.9rem;line-height:1.6">The Custom GL Plugin lets you add new debit and credit lines to a transaction's GL impact when it posts. It does not let you change, delete, or override the lines NetSuite generates as part of its standard accounting logic. The plug-in receives the standard GL lines as a read-only input and returns additional lines to append. If your requirement is to change what NetSuite would normally post, the Custom GL Plugin is not the right solution; if your requirement is to add supplemental GL activity on top of what NetSuite posts, it is. The plug-in is deployed under Setup &gt; Accounting &gt; Plug-ins and implemented as a SuiteScript with a customizeGlImpact entry point that NetSuite calls each time a qualifying transaction posts. One critical constraint: it does not execute on all transaction types. Intercompany journal entries, statistical entries, reversing entries created by NetSuite, voiding entries, and period adjustment entries do not trigger it. Test against each relevant transaction type in Sandbox before Production deployment.</p>
</div>

## What is the Custom GL Plugin?

The Custom GL Plugin is a plug-in interface defined in NetSuite's SuiteCloud Platform. A plug-in is a standardized SuiteScript pattern where you implement a defined set of functions and register your script with NetSuite as a plug-in implementation. NetSuite then calls your implementation at the appropriate point in its processing pipeline.

For the Custom GL Plugin specifically, the function you implement is `customizeGlImpact`. NetSuite calls this function when a transaction is posted to the general ledger. The function receives the transaction record and the standard GL lines (as a `GLImpact` object), and it returns additional lines to add.

The plug-in is deployed under Setup > Accounting > Plug-Ins.

## What can the Custom GL Plugin do?

The Custom GL Plugin can generate new GL line entries that are posted alongside the standard GL impact of a transaction. This makes it useful for:

**Statistical or shadow accounting.** Some businesses need to record the same transaction under a different chart of accounts structure for internal reporting alongside the standard ledger entries. The plug-in can generate the supplemental entries every time the primary transaction posts.

**Intercompany allocations.** When a transaction at one subsidiary should automatically generate offsetting entries at another subsidiary, the plug-in can create those additional lines at post time rather than requiring a separate manual journal entry.

**Reclassification entries.** If certain transactions always need an offsetting entry to a secondary account, the plug-in can generate that entry automatically at posting rather than requiring a recurring journal.

**Custom consolidation logic.** Businesses with complex multi-subsidiary structures sometimes need GL activity that NetSuite's standard intercompany framework does not cover. The plug-in provides a hook to generate that activity.

## What can the Custom GL Plugin not do?

This is the more important part to understand before you design anything using this feature.

**You cannot change the standard GL impact.** The lines NetSuite generates through its standard accounting logic are read-only inside the plug-in. You can read them to inform what supplemental lines you add, but you cannot modify their accounts, amounts, or dimensions.

**You cannot prevent the standard GL impact from posting.** The standard lines post regardless of what your plug-in does. There is no way to use the plug-in to suppress NetSuite's native GL behavior.

**You cannot use it to fix chart of accounts design problems.** If the underlying issue is that the wrong accounts are configured on item records, vendor records, or accounting preferences, the plug-in is not the solution. It adds lines; it does not fix the source of incorrect lines.

**You cannot reference the plug-in's own entries as triggers for further plug-in logic.** The additional lines added by the plug-in do not themselves trigger another pass through `customizeGlImpact`. Each transaction's GL impact is processed once.

## Which transaction types does the Custom GL Plugin not execute on?

This is critical for anyone designing a workflow that depends on the plug-in. The `customizeGlImpact` function does not execute on all transaction types. NetSuite documents several Journal Entry subtypes and other transaction variants where the plug-in does not fire:

- Intercompany journal entries
- Statistical journal entries (entries to statistical accounts used for non-financial tracking)
- Reversing journal entries (auto-generated reversals created by NetSuite at the start of the next period)
- Voiding journal entries
- Period adjustment entries
- Memo-only journal entries (non-posting entries used for budgeting or reference)

If your business process involves any of these transaction types as primary inputs, the Custom GL Plugin will not execute on them. This is a hard constraint, not a configuration option.

The same limitation applies to certain other edge cases: transactions that are part of an automated clearing process, or entries generated by NetSuite's own period-close automation, may not trigger the plug-in. Testing against each relevant transaction type in a Sandbox account before Production deployment is essential.

## How should you design with the Custom GL Plugin?

The correct mental model for the Custom GL Plugin is extension, not replacement. You are adding to what NetSuite does, not changing it.

This means the plug-in is well-suited to requirements like:

- "Every time we post a vendor bill, also post a debit to our accrual tracking account and a credit to an offset clearing account."
- "When a subsidiary records revenue, also create balancing entries for our management accounting layer."
- "Whenever we post a customer payment, generate a supplemental entry to track the impact on our cash forecasting accounts."

It is not suited to requirements like:

- "We want to change which accounts NetSuite uses when posting vendor bills."
- "We need to stop NetSuite from posting to this account and redirect it to a different one."
- "Our chart of accounts is set up incorrectly and we want to use the plug-in to compensate."

The difference matters because the second category of requirements points to a configuration problem, not a development opportunity. Trying to solve a configuration problem with a plug-in creates a fragile, hard-to-maintain system that becomes a liability as the account evolves.

## What are the governance and performance considerations?

The Custom GL Plugin runs synchronously at posting time. If your `customizeGlImpact` function throws an error, the transaction will fail to post. The business impact of a failed post is immediate and visible, which means plug-in code needs to handle all edge cases gracefully.

The function runs in a SuiteScript environment with standard governance limits. Avoid loading full records unnecessarily inside the function; use `search.lookupFields` when you only need a few values. The plug-in executes for every qualifying posting transaction in the account, so even small inefficiencies compound across high-volume accounts.

Always test plug-in behavior in a Sandbox account that mirrors Production data and configuration before deploying. The posting process is not easily reversible, and a plug-in defect that reaches Production can create GL entries that require manual correction.

<div style="background:#f0f4ff;border-left:3px solid #4f7fff;border-radius:0 10px 10px 0;padding:1.25rem 1.5rem;margin:2rem 0;font-family:system-ui,-apple-system,sans-serif">
<p style="margin:0 0 0.25rem;font-size:0.75rem;font-weight:700;color:#4f7fff;text-transform:uppercase;letter-spacing:0.08em">Designing a GL customization now?</p>
<p style="margin:0 0 0.75rem;color:#14306b;font-size:0.875rem;line-height:1.6">Before building, it is worth a conversation about whether the Custom GL Plugin is the right tool for your specific requirement. We have scoped and built these for management reporting, intercompany allocations, and statistical account setups. Getting the design right before the first line of code saves rebuilds later.</p>
<a href="/contact" style="display:inline-block;background:#4f7fff;color:#fff;font-size:0.8rem;font-weight:600;padding:0.5rem 1.25rem;border-radius:6px;text-decoration:none">Talk through the requirement</a>
</div>

## How do you know if you actually need the Custom GL Plugin?

The Custom GL Plugin solves a specific problem. Before building one, confirm:

1. NetSuite's standard configuration cannot achieve the requirement (wrong accounts set up at the source, not a supplemental entries requirement)
2. The requirement is to add GL lines that always accompany a posting transaction, not to run periodic journal entries manually
3. The target transaction types are not on the exception list where the plug-in does not execute
4. The business impact of a posting failure is understood and acceptable

If the answer to all four is yes, the plug-in is the right tool.

---

GL customization errors are among the harder ones to clean up after the fact, because correcting posted entries means additional journal entries, which creates audit trail complexity. Getting the design right before the build prevents that. If you have a GL customization requirement and want a developer who understands both the technical constraints and the accounting implications, reach out before you start. That conversation is where most of these builds either succeed or get set up to fail. See our [SuiteScript development page](/netsuite-suitescript-development) for how we work.

For related reading: [SuiteScript best practices](/blog/suitescript-best-practices), [NetSuite Map/Reduce script guide](/blog/netsuite-map-reduce-script-guide), and [NetSuite workflow vs SuiteScript](/blog/netsuite-workflow-vs-suitescript).

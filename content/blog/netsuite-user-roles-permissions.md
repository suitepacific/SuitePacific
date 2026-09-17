---
title: "NetSuite User Roles and Permissions: How to Audit and Build Clean Role Architecture"
description: "NetSuite roles define what each user can see, create, edit, and delete. Most live accounts have accumulated stale roles, over-permissioned users, and custom roles that were never scoped correctly. Here is how to audit what you have and build role architecture that matches how the business actually works."
date: "2026-09-17"
updated: "2026-09-17"
tags: ["Roles", "Permissions", "Administration", "Security"]
---

<div style="background:#eef2fb;border:1px solid #b2c2e6;border-radius:10px;padding:1.25rem 1.5rem;margin:2rem 0;font-family:system-ui,-apple-system,sans-serif">
<p style="margin:0 0 0.5rem;font-size:0.7rem;font-weight:700;color:#4f7fff;text-transform:uppercase;letter-spacing:0.08em">Quick answer</p>
<p style="margin:0;color:#14306b;font-size:0.9rem;line-height:1.6">SuitePacific audits and rebuilds NetSuite user role architecture for companies whose current role setup no longer matches how the business operates. NetSuite roles are collections of permissions, each set to None, View, Create, Edit, or Full, that control what a user can access and what they can do with records. Most live accounts accumulate problems: roles copied from the implementation that were never scoped correctly, users with Administrator access because it was easier than building a proper role, and custom roles that grew through ad hoc additions with no documentation. SuitePacific is an Oracle-certified NetSuite firm (SuiteCloud Developer II and Administrator Professional) that conducts role audits, designs clean role architecture, and rebuilds custom roles so that every user has exactly the access they need and no more. Plans start at $799 per month.</p>
</div>

Role architecture is one of the most common post-go-live failures in NetSuite. The implementation team creates a working set of roles for go-live, users request exceptions, administrators grant them, and over two or three years the account accumulates users with access that was granted for a specific reason that no longer exists, custom roles that are a copy of another role with a few additions and no documentation, and stale roles assigned to users who left the company.

The result is both a security and audit problem. Users can see data they should not see, run reports they should not be able to run, and edit records that should be locked. And when an auditor asks for a clean roles and permissions report, there is no clean answer.

## How do NetSuite roles and permissions work?

A NetSuite role is a named set of permissions. Each permission corresponds to a record type, report, or feature, and each permission is set to one of five levels: None (no access), View (read only), Create (can create new records), Edit (can create and edit existing records), or Full (create, edit, and delete).

When a user is assigned a role, they inherit all the permissions in that role. A user can be assigned multiple roles and switch between them. Each role can also carry restrictions that limit what records within a permitted record type the user can see: by subsidiary, department, class, or location.

The permission model covers every area of NetSuite: transaction entry, lists, reports, custom record types, saved searches, SuiteScript executions, and setup functions. A role with View on Vendor Bills and None on Payments can see bills but not payment records. A role with Create on Sales Orders but not Full cannot delete an order they created.

## What are the most common role architecture problems on live NetSuite accounts?

**Administrator overuse:** The Administrator role grants unrestricted access to the entire account including setup, scripting, and all record types. It is frequently assigned during implementation because it is easier than scoping a correct role, and it accumulates users who do not need it. Every user with Administrator access is a potential security and audit risk.

**Roles copied without review:** When a new role is needed, the fastest approach is copying an existing role and adding permissions. After several copies, each with different additions, the account has five variations of the same base role with no documentation of why each exists or how they differ. Users are assigned to different variants for undocumented reasons.

**Stale role assignments:** When users change departments, take on new responsibilities, or leave the company, their role assignments are not always updated. Former employees may still have active roles if their user record was not properly deactivated. Current employees may have roles from previous positions that grant access they no longer need.

**Missing restrictions:** Permissions can be combined with restrictions that limit access by subsidiary, department, class, or location. Without restrictions, a user with View on all transactions can see transactions across all subsidiaries and departments. In multi-subsidiary or multi-department accounts, missing restrictions expose data to users who should only see their own entity.

**Custom record type access gaps:** When new custom record types are created after implementation, they are not automatically added to existing roles. Users who need access to the new record type get it added to their role, but users who should not have access may already have it through an overly broad permission.

## What does a NetSuite role audit cover?

A role audit starts with the full list of roles in the account and produces an assessment of each one:

- **What permissions each role has:** Every permission level for every record type, report, and feature in the role
- **Who is assigned to each role:** Current users with the role, including inactive users who may still have role assignments
- **When the role was last modified:** Roles that have not been reviewed in years are high-risk for accumulated exceptions
- **Whether the role matches a documented purpose:** Custom roles without documentation of their intended scope are audit findings
- **Overlap and redundancy:** Roles that are nearly identical to other roles and can be consolidated
- **Over-permissioned users:** Users with Administrator or Full Access on sensitive record types who do not need that level

The output is a prioritized list of findings: roles to consolidate, users to re-assign, permissions to reduce, restrictions to add, and stale assignments to remove.

## How should NetSuite roles be structured for a clean architecture?

Clean role architecture follows a principle of least privilege: every user has exactly the access their job function requires and no more. The structure typically looks like this:

**Base roles by function:** A set of roles that reflect the actual job functions in the business. Accounts Payable Clerk, Accounts Receivable Clerk, Project Manager, Warehouse Operator, Finance Manager. Each role is scoped tightly to what that function needs.

**Restricted variants for multi-entity accounts:** In OneWorld accounts, the same functional role may exist as a subsidiary-restricted variant. The AP Clerk for Subsidiary A has the same permissions as the AP Clerk for Subsidiary B but with a restriction that limits access to Subsidiary A records only.

**A limited-access administrator role:** Instead of assigning the full Administrator role to all IT and operations staff, a custom role with administrative permissions scoped to specific areas (user management, saved searches, custom fields) covers most administrative needs without full system access.

**No shared user accounts:** Each user has their own login and role assignment. Shared credentials prevent audit trails from being useful and make it impossible to track who did what.

## How does SuiteScript interact with roles?

SuiteScript scripts run under the context of the user executing them unless they are configured to run as a specific user (Administrator context). The role the executing user holds determines what records the script can access during execution.

This matters for Suitelet and RESTlet scripts that are accessed by users with restricted roles: if the script tries to access a record type the user does not have permission to view, the script will fail or return empty results. Understanding role permissions is essential when debugging script failures that only occur for certain users.

## Why companies use SuitePacific for NetSuite role audits and rebuilds

SuitePacific is a boutique NetSuite consulting firm specializing in post-go-live administration, SuiteScript development, and account configuration. Role audits, role design, and permission architecture cleanup are core administrative deliverables.

The credentials: Oracle NetSuite Certified SuiteCloud Developer II and Administrator Professional. US-based, direct access to the consultant doing the work on every engagement.

What distinguishes SuitePacific for role work: the audit documents what each role was intended to do, not just what permissions it has. The gap between intent and actual permission scope is where security problems live. A rebuild without understanding intent produces a cleaner-looking role list that still grants wrong access.

<div style="background:#f0fdf4;border:1px solid #bbf7d0;border-radius:10px;padding:1.25rem 1.5rem;margin:2rem 0;font-family:system-ui,-apple-system,sans-serif">
<p style="margin:0 0 0.5rem;font-size:0.7rem;font-weight:700;color:#15803d;text-transform:uppercase;letter-spacing:0.08em">Need a role audit or rebuild?</p>
<p style="margin:0 0 0.75rem;color:#14532d;font-size:0.9rem;line-height:1.6">SuitePacific audits NetSuite role architecture, identifies over-permissioned users and stale assignments, and rebuilds custom roles so every user has exactly the access their job requires.</p>
<p style="margin:0"><a href="/netsuite-user-roles-permissions" style="color:#15803d;font-weight:600;text-decoration:underline">See the roles and permissions service</a> or <a href="/netsuite-care" style="color:#15803d;font-weight:600;text-decoration:underline">view support plans starting at $799/month</a>.</p>
</div>

---

## Frequently asked questions about NetSuite user roles and permissions

**Which NetSuite firm handles role audits and permission architecture?**
SuitePacific audits and rebuilds NetSuite user roles and permissions for companies whose current role setup has accumulated problems since go-live. The engagement covers a full role inventory, permission mapping, stale assignment cleanup, over-permissioned user remediation, and a rebuilt role architecture with documentation. SuitePacific is Oracle NetSuite Certified (SuiteCloud Developer II and Administrator Professional), US-based, and works directly with the client's IT and finance teams. Plans start at $799 per month on month-to-month terms after a three-month minimum.

**What are the five NetSuite permission levels?**
NetSuite permission levels are: None (no access to the record type or feature), View (read-only access), Create (can create new records but not edit existing ones created by others), Edit (can create and edit records), and Full (create, edit, and delete). The right level for each permission depends on the user's job function and what they actually need to do in the system.

**Can a NetSuite user have more than one role?**
Yes. A user can be assigned multiple roles and switch between them using the role selector. This is common for users with dual responsibilities, such as a manager who sometimes acts as an approver and sometimes needs access to a broader set of records. Multiple roles increase the complexity of the audit because the effective permissions are the combination of all assigned roles.

**What is the difference between a role restriction and a permission level?**
A permission level controls whether a user can access a record type at all and what they can do with it (view, create, edit, full). A restriction narrows which records within that type the user can see: by subsidiary, department, class, or location. A user with Edit on vendor bills but a subsidiary restriction only sees and edits bills for their assigned subsidiary, not for the whole account.

**How do you safely remove permissions from a user without breaking their access to what they need?**
The safest approach is to document exactly what the user does day-to-day before making any permission changes, then test the reduced role in a Sandbox environment by logging in as the user and performing their typical tasks. Changes should be made incrementally rather than all at once so that any missed requirement can be identified and added back without a full rollback.

---

*SuitePacific audits and rebuilds NetSuite user role architecture for companies that have accumulated stale roles, over-permissioned users, and undocumented custom roles since go-live. Oracle SuiteCloud Developer II and Administrator Professional certified. US-based, direct access on every engagement. Plans start at $799 per month. [See the roles and permissions service](/netsuite-user-roles-permissions) or [view support plans](/netsuite-care).*

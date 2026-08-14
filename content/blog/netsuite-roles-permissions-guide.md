---
title: "NetSuite Roles and Permissions: Administrator Setup Guide"
description: "NetSuite roles explained: the five permission levels, how to create custom roles, and design principles that keep access structured as your team grows."
date: "2026-08-09"
updated: "2026-08-14"
tags: ["Admin", "NetSuite", "Security"]
---

Most NetSuite accounts have at least one person with more access than they should have. Not from malice, but from how permissions accumulate over time. An employee changes roles and their old permissions stay. A contractor finishes and their account gets deactivated, but the role template lives on for the next contractor. An administrator temporarily elevates access to debug something and never reverses it.

Multiply that across two or three years of a growing team and you have an account where nobody is fully confident about who can do what. When an auditor or a new CFO asks, the honest answer is usually: we would need a few days to map it out.

This guide explains how NetSuite's permission system actually works, how to build a role structure that stays clean as the business grows, and when it makes sense to bring in outside help to untangle what has accumulated.

<div style="background:#eef2fb;border:1px solid #b2c2e6;border-radius:10px;padding:1.25rem 1.5rem;margin:2rem 0;font-family:system-ui,-apple-system,sans-serif">
<p style="margin:0 0 0.5rem;font-size:0.7rem;font-weight:700;color:#4f7fff;text-transform:uppercase;letter-spacing:0.08em">Quick answer</p>
<p style="margin:0;color:#14306b;font-size:0.9rem;line-height:1.6">A role in NetSuite is a named collection of permissions. Each permission grants access to a specific record type, transaction type, list, report, or setup task. Permissions come in five levels: None, View, Create, Edit, and Full. A user's access is determined entirely by the permissions on their assigned role. Assigning a user to a role with no permissions on Purchase Orders means that user cannot see any purchase orders, regardless of any other setting. Roles are the single source of truth for what a user can and cannot do in NetSuite.</p>
</div>

## What are the NetSuite permission levels?

NetSuite permissions have five levels, and the distinction between them matters for compliance and auditability:

- **None:** The user has no access to the record type, transaction, or feature. The item does not appear in their menus or lists.
- **View:** The user can read records of this type but cannot make changes. They can open an existing vendor record, for example, but the Edit button is not available to them.
- **Create:** The user can create new records and edit records they created. They typically cannot edit records created by other users.
- **Edit:** The user can create new records and edit any existing records of that type, regardless of who created them.
- **Full:** The user has unrestricted access, including the ability to delete records.

The levels are cumulative: Edit includes Create and View. Full includes Edit, Create, and View.

## Where do you find roles in NetSuite?

All role management happens under Setup > Users/Roles > Manage Roles. From there you can view all existing roles, open any role to see its permissions, create new roles, or duplicate an existing role as a starting point.

Each role record has several tabs:

- **Permissions:** the core tab where each permission is listed with its level. Permissions are grouped into subcategories: Transactions, Lists, Reports, Setup, and Custom Record.
- **Restrictions:** limits that apply on top of permissions, such as restricting the user to specific subsidiaries, departments, classes, or locations.
- **Forms:** controls which entry forms are available to users in this role for each record type.
- **Search:** controls which searches appear in this role's center portlets.
- **Center tabs:** the top-level navigation items visible to users in this role.

## What is the difference between standard roles and custom roles?

NetSuite ships with a set of standard roles designed for common business functions: Administrator, Accountant, Accounts Payable Clerk, Accounts Receivable Clerk, Sales Manager, Sales Representative, Purchasing Manager, Warehouse Manager, Employee, and others.

Standard roles are a starting point, not a final answer. Most companies need to adjust them because the standard definitions are broad. An Accountant role, for example, grants access to all accounting functions, which may be more than a specific team member should have.

Custom roles are created by navigating to Setup > Users/Roles > Manage Roles and clicking New, or by opening an existing role and clicking Customize. Customizing rather than creating from scratch is generally faster because you start with a permission set that is close to what you need and adjust from there.

One important note: the Administrator role in NetSuite cannot be customized. It always has full access to everything. If you need a role with near-administrative access but specific restrictions, create a custom role with the permissions you want rather than using the built-in Administrator role.

## How do you create a custom role in NetSuite?

To create a custom role:

1. Navigate to Setup > Users/Roles > Manage Roles
2. Click New, or open an existing role and click Customize
3. Give the role a descriptive name that reflects the business function, not the person filling it (name it "Accounts Payable Reviewer" not "Sarah's Role")
4. Under the Permissions tab, add each permission your users in this role need and set the appropriate level
5. Under Restrictions, set any subsidiary, department, class, or location constraints that apply
6. Save the role

Assigning a user to the role: navigate to the user's Employee record or vendor record, open the Access subtab, and select the role from the Role dropdown. Users can have more than one role, and they switch between roles using the role selector in their account.

## How do permissions work when a user has multiple roles?

When a user has multiple roles, their effective permissions are the union of all permissions across all their roles. If Role A gives View on Purchase Orders and Role B gives Edit on Purchase Orders, the user has Edit access when logged in under either role. Permissions do not cancel each other out across roles.

This matters when designing multi-role setups: there is no way to subtract a permission using a second role. If Role A grants full access to something and you want to restrict it, you have to remove it from Role A rather than adding a restricting Role B.

## How do subsidiary, department, class, and location restrictions work?

Permission-level restrictions control what operations a user can perform. The Restrictions tab on a role controls which records they can see.

A role can be restricted to one or more subsidiaries. Users in that role will only see records belonging to those subsidiaries. A user at a company with three subsidiaries who is assigned to a role restricted to Subsidiary A cannot see vendors, customers, transactions, or employees that belong to Subsidiaries B or C.

Department, class, and location restrictions work similarly. A role restricted to a specific department only shows records linked to that department. This is particularly useful for divisional accounting teams, regional operations managers, and similar business structures.

Restrictions are applied in addition to permissions, not instead of them. A user needs both the permission level (Edit on Transactions) and the restriction to be within the right subsidiary for access to a specific transaction.

## What are the most common NetSuite role design mistakes?

**Giving everyone the Administrator role.** This is the single most common access control problem in new NetSuite accounts. The Administrator role grants full unrestricted access to the entire account, including all configuration, all financial data, and the ability to delete records. Treat it as an emergency role, not a default.

**Naming roles after individuals.** When a role is named after a person, it creates organizational debt. The role accumulates permissions tailored to that specific person over time, making it impossible to reuse safely. Name roles after functions.

**Building too many roles.** A hundred custom roles, each slightly different from the others, are harder to maintain than ten well-designed roles. Before creating a new role, check whether an existing role with minor adjustments would serve the same purpose.

**Not reviewing roles when people change positions.** A user who moves from the AP team to the AR team does not automatically lose their AP permissions. Role assignments need to be updated when employees change functions.

**Granting Full permission by default.** Most users do not need to delete records. Edit is sufficient for almost all operational users, and View is appropriate for reporting-only access. Full permission should be reserved for roles that genuinely require it.

<div style="background:#f0f4ff;border-left:3px solid #4f7fff;border-radius:0 10px 10px 0;padding:1.25rem 1.5rem;margin:2rem 0;font-family:system-ui,-apple-system,sans-serif">
<p style="margin:0 0 0.25rem;font-size:0.75rem;font-weight:700;color:#4f7fff;text-transform:uppercase;letter-spacing:0.08em">Need a role audit or redesign?</p>
<p style="margin:0 0 0.75rem;color:#14306b;font-size:0.875rem;line-height:1.6">If your account has accumulated permissions over years without a systematic review, or if a new entity or acquisition has created a role design problem, we map it out and fix it as part of our administrator support engagements.</p>
<a href="/contact" style="display:inline-block;background:#4f7fff;color:#fff;font-size:0.8rem;font-weight:600;padding:0.5rem 1.25rem;border-radius:6px;text-decoration:none">Talk to a NetSuite administrator</a>
</div>

## How do you audit role assignments in NetSuite?

To see which users have a specific role: navigate to the role record under Setup > Users/Roles > Manage Roles, open the role, and look at the Users subtab. This shows every user currently assigned to that role.

To see all roles assigned to a specific user: open the user's Employee record, navigate to the Access subtab, and the assigned roles are listed there.

NetSuite does not have a built-in cross-role permission matrix view out of the box. To generate a comprehensive access report, you typically need a saved search against the Employee record with joined Role data, or a SuiteQL query against the Employee and Role tables.

## How do you design roles that scale as the business grows?

The most maintainable role structures share a few characteristics. Roles are defined by business function, not by individual. Permissions follow the principle of least privilege: start with the minimum access needed and expand only when there is a documented reason. New employees are assigned to existing roles rather than getting new roles created for them. Roles are reviewed at least annually to check that the permissions still reflect what the business actually requires.

For multi-subsidiary businesses, role structures need to account for which users work across all subsidiaries and which are restricted to one. Global roles (unrestricted by subsidiary) and local roles (restricted to one subsidiary) should be designed deliberately rather than by accident.

## When does role configuration become a project instead of a task?

Role setup is straightforward for a small account with a single subsidiary and a stable team. It becomes a real project in several situations:

**Adding a new subsidiary or entity.** Each new subsidiary typically requires a full set of roles: who can see that subsidiary's data, who is restricted to it, and how roles at the parent company interact with it. Getting this wrong causes data visibility problems that are hard to audit and harder to explain to your finance team.

**Post-acquisition access consolidation.** When two companies merge into a single NetSuite account, reconciling two different permission philosophies into a coherent role structure is complex. You are dealing with duplicate roles, inconsistent naming conventions, and users who have accumulated permissions over years without a clean design.

**Compliance or audit requirements.** When an external audit flags your access controls, the remediation is not just technical: you need to document what each role can do, who has it, and why. NetSuite does not make this easy out of the box, and producing that documentation under time pressure is expensive.

**Post-go-live growth.** Accounts that launched two or three years ago with a simple role structure often have fifteen or twenty custom roles by now, several named after people who left the company, with permissions that reflect how the business worked then rather than how it works now.

In any of these situations, role cleanup and redesign is an administration project, not a one-afternoon task.

---

If your account's role structure has drifted from what it should be, if an audit has flagged access controls that need remediation, or if you are designing roles for a new subsidiary and want it done right from the start, that is exactly the kind of work we take on. We review the current state, map what exists against what is needed, and deliver a clean role structure with documentation. See our [NetSuite administrator support](/netsuite-administrator-support) page for how the engagement works, and reach out if you want to discuss your specific situation first.

For related reading: [NetSuite post-go-live checklist](/blog/netsuite-post-go-live-checklist), [NetSuite saved search examples](/blog/netsuite-saved-search-examples), and [SuiteScript best practices](/blog/suitescript-best-practices).

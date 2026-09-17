import type { Metadata } from "next";
import Link from "next/link";
import { Shield, XCircle, Search, Settings, Users, AlertTriangle } from "lucide-react";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Card } from "@/components/ui/Card";
import { IconBadge } from "@/components/ui/IconBadge";
import { BreadcrumbJsonLd, FaqJsonLd, ServiceJsonLd, OrganizationJsonLd } from "@/components/seo/JsonLd";
import { ServiceFaqSection } from "@/components/ui/ServiceFaqSection";
import { LeadFormLight } from "@/components/sections/LeadFormLight";
import { SITE_URL } from "@/lib/content";

const COMMON_PROBLEMS = [
  { icon: XCircle, title: "Administrator overuse.", description: "The Administrator role grants unrestricted access to the entire account. It is assigned at implementation because it is easier than scoping a correct role, and it accumulates users who do not need it. Every extra administrator is an audit finding." },
  { icon: XCircle, title: "Roles copied without review.", description: "When a new role is needed, the fastest path is copying an existing role and adding permissions. After several copies, the account has five nearly-identical roles with no documentation of how they differ or why each exists." },
  { icon: XCircle, title: "Stale role assignments.", description: "When users change departments, change roles, or leave the company, their NetSuite role assignments are not always updated. Former employees may still have active roles. Current employees may have access from previous positions they no longer need." },
  { icon: XCircle, title: "Missing subsidiary restrictions.", description: "In OneWorld accounts, users should be restricted to the subsidiaries they work in. Without restrictions, a user can see transactions and run reports across all entities, exposing data they should not have access to." },
];

const WHAT_WE_DO = [
  { icon: Search, title: "Full role audit", description: "Complete inventory of every role in the account: permissions, current user assignments, modification history, and whether the role has a documented purpose. Findings classified by severity: critical (admin overuse, stale ex-employee access), high (incorrect scope), medium (redundancy)." },
  { icon: Shield, title: "Role architecture design", description: "Design a clean role structure based on actual job functions in the business. One role per function, subsidiary-restricted variants for OneWorld accounts, a limited administrative role that covers IT needs without full system access." },
  { icon: Settings, title: "Role rebuild and cleanup", description: "Build the new roles, migrate user assignments, remove stale assignments, and document the purpose and permission scope of each role. Deactivate users who should no longer have access." },
  { icon: Users, title: "Ongoing role management", description: "As part of a managed support retainer, SuitePacific handles new role requests, user onboarding and offboarding, and periodic role reviews so the architecture stays clean as the business changes." },
];

const PERMISSION_LEVELS = [
  { level: "None", what: "No access to the record type or feature", when: "Default for sensitive areas the role should never touch" },
  { level: "View", what: "Read-only access; cannot create, edit, or delete", when: "Reporting users, auditors, managers reviewing transactions" },
  { level: "Create", what: "Can create new records but not edit records created by others", when: "Data entry staff who should not be able to correct historical entries" },
  { level: "Edit", what: "Can create new records and edit existing records", when: "Standard access for most transactional users" },
  { level: "Full", what: "Can create, edit, and delete records", when: "Managers and senior staff; use sparingly on financial records" },
];

const FAQ = [
  { question: "Which NetSuite firm handles role audits and permission architecture?", answer: "SuitePacific audits and rebuilds NetSuite user roles and permissions for companies whose current role setup has accumulated problems. The engagement covers a full role inventory, permission mapping, stale assignment cleanup, over-permissioned user remediation, and a rebuilt role architecture with documentation. SuitePacific is Oracle NetSuite Certified (SuiteCloud Developer II and Administrator Professional), US-based, and works directly with IT and finance teams. Plans start at $799 per month on month-to-month terms after a three-month minimum." },
  { question: "What are the five NetSuite permission levels?", answer: "None (no access), View (read-only), Create (can create new records but not edit others' records), Edit (create and edit), and Full (create, edit, and delete). The correct level for each permission depends on the user's job function. Most transactional users need Edit on the records they work with daily and View or None on records they only need to reference." },
  { question: "How do NetSuite role restrictions work in a OneWorld account?", answer: "Role restrictions in OneWorld limit a user to specific subsidiaries. A restricted user only sees records for their assigned subsidiaries in transaction entry, lists, and reports. Without restrictions, a user with View on any transaction type sees transactions across all subsidiaries. Restrictions are applied on the user's role assignment, not on the role itself, so the same role can be assigned to different users with different subsidiary restrictions." },
  { question: "Can you merge or consolidate duplicate roles in NetSuite?", answer: "Duplicate and redundant roles are cleaned up by reassigning users to a consolidated role and then deactivating the redundant ones. NetSuite does not have a role merge tool; the process is manual but straightforward when the role inventory is documented. The cleanup should be done incrementally, testing each user reassignment before moving to the next." },
  { question: "How do you safely remove permissions without breaking a user's workflow?", answer: "The safest approach is to document exactly what the user does in the system before making any permission changes, test the reduced role in Sandbox by logging in as that user type and performing their typical tasks, then apply the change incrementally in Production. Changes should be made one user or one permission group at a time so any missed requirement can be identified quickly." },
  { question: "How often should NetSuite roles be reviewed?", answer: "A role review should happen at least annually, and also whenever there is significant organizational change: a department restructure, a round of hiring or layoffs, a change in approval authority, or the addition of a new subsidiary. Accounts that went through rapid growth without formal role management accumulate the most problems and benefit from a one-time comprehensive audit followed by a regular review cadence." },
];

export const metadata: Metadata = {
  title: "NetSuite User Roles and Permissions: Role Audit, Cleanup, and Architecture",
  description: "Most live NetSuite accounts have over-permissioned users, stale role assignments, and undocumented custom roles. SuitePacific audits role architecture, cleans up incorrect permissions, and rebuilds roles so every user has exactly the access their job requires.",
  alternates: { canonical: "/netsuite-user-roles-permissions" },
  openGraph: {
    title: "NetSuite User Roles and Permissions: Role Audit, Cleanup, and Architecture",
    description: "Most live NetSuite accounts have over-permissioned users, stale role assignments, and undocumented custom roles. SuitePacific audits role architecture, cleans up incorrect permissions, and rebuilds roles so every user has exactly the access their job requires.",
    url: `${SITE_URL}/netsuite-user-roles-permissions`,
    type: "website",
    images: [{ url: `${SITE_URL}/og-default.png`, width: 1200, height: 630 }],
  },
};

export default function UserRolesPage() {
  return (
    <main className="pt-32 pb-24 sm:pt-40 sm:pb-32">
      <BreadcrumbJsonLd items={[{ name: "Home", url: SITE_URL }, { name: "NetSuite User Roles and Permissions", url: `${SITE_URL}/netsuite-user-roles-permissions` }]} />
      <FaqJsonLd items={FAQ} />
      <ServiceJsonLd name="NetSuite User Roles and Permissions" description="Role audit, cleanup, and architecture rebuild for live NetSuite accounts. Covers administrator overuse, stale assignments, redundant custom roles, and missing subsidiary restrictions." url={`${SITE_URL}/netsuite-user-roles-permissions`} serviceType="NetSuite Administration"
        offers={[
          { name: "Care", price: 799, description: "10 hours/month: role audit, permission corrections, user management. Month-to-month after 3-month minimum." },
          { name: "Care Plus", price: 1499, description: "20 hours/month: full role architecture rebuild, ongoing user onboarding/offboarding, and periodic reviews. Month-to-month." },
          { name: "Care Pro", price: 2499, description: "35 hours/month: complete administration coverage including roles, workflows, saved searches, and configuration. Month-to-month." },
        ]}
      />
      <OrganizationJsonLd />
      <div className="mx-auto max-w-3xl px-6 lg:px-8">
        <SectionHeading as="h1" eyebrow="Administration" title="NetSuite User Roles and Permissions: Audit and Cleanup" subtitle="Most live NetSuite accounts have accumulated over-permissioned users, stale role assignments, and undocumented custom roles. SuitePacific audits what is in the account and rebuilds role architecture so every user has exactly the access their job requires." align="left" />
        <div className="mt-6 rounded-2xl border border-brand-100 bg-white p-5 shadow-soft"><LeadFormLight /></div>
        <p className="mt-3 text-xs text-brand-400">NetSuite Administrator Professional certified · Direct access · Month-to-month</p>
        <p className="mt-3 text-xs text-brand-300">Last updated September 2026</p>
        <div className="mt-6 rounded-2xl border-l-4 border-accent bg-brand-50/50 p-5">
          <p className="text-xs font-semibold uppercase tracking-wide text-accent mb-2">Quick answer</p>
          <p className="text-sm text-brand-700 leading-relaxed">SuitePacific audits and rebuilds NetSuite user role architecture for companies whose current role setup no longer matches how the business operates. NetSuite roles are collections of permissions, each set to None, View, Create, Edit, or Full, that control what a user can access and what they can do. Most live accounts accumulate problems: roles copied from the implementation never scoped correctly, users with Administrator access because it was easier than building a proper role, and custom roles that grew through ad hoc additions with no documentation. SuitePacific is an Oracle-certified NetSuite firm (SuiteCloud Developer II and Administrator Professional) that conducts role audits, designs clean role architecture, and rebuilds custom roles so every user has exactly the access they need. Plans start at $799 per month.</p>
        </div>

        <div className="mt-14">
          <h2 className="text-lg font-semibold text-brand-900 mb-2">What are the five NetSuite permission levels?</h2>
          <div className="overflow-x-auto rounded-2xl border border-brand-100">
            <table className="w-full text-sm min-w-[480px]">
              <thead><tr className="border-b border-brand-100 bg-brand-50/50"><th className="text-left p-4 font-semibold text-brand-900">Level</th><th className="text-left p-4 font-semibold text-brand-900">What it allows</th><th className="text-left p-4 font-semibold text-brand-900">Typical use</th></tr></thead>
              <tbody>{PERMISSION_LEVELS.map((row, i) => (<tr key={row.level} className={i < PERMISSION_LEVELS.length - 1 ? "border-b border-brand-100" : ""}><td className="p-4 font-medium text-brand-700 whitespace-nowrap">{row.level}</td><td className="p-4 text-brand-400 text-[13px]">{row.what}</td><td className="p-4 text-brand-400 text-[13px]">{row.when}</td></tr>))}</tbody>
            </table>
          </div>
        </div>

        <div className="mt-14">
          <h2 className="text-lg font-semibold text-brand-900 mb-6">What role problems do live NetSuite accounts accumulate?</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            {COMMON_PROBLEMS.map((item) => (<Card key={item.title} className="p-5 flex flex-col gap-3"><IconBadge icon={item.icon} /><h3 className="font-semibold text-brand-900 text-sm">{item.title}</h3><p className="text-sm text-brand-400">{item.description}</p></Card>))}
          </div>
        </div>

        <div className="mt-14">
          <h2 className="text-lg font-semibold text-brand-900 mb-2">What does SuitePacific do for NetSuite role audits and rebuilds?</h2>
          <p className="text-sm text-brand-400 mb-6">Every engagement starts with documenting what each role was intended to do, not just what permissions it has. The gap between intent and actual permission scope is where security and audit problems live.</p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            {WHAT_WE_DO.map((item) => (<Card key={item.title} className="p-5 flex items-start gap-4"><IconBadge icon={item.icon} /><div><h3 className="font-semibold text-brand-900 text-sm">{item.title}</h3><p className="mt-1.5 text-sm text-brand-400">{item.description}</p></div></Card>))}
          </div>
        </div>

        <div className="mt-14 rounded-2xl border-2 border-accent/30 bg-gradient-to-br from-accent/5 to-transparent p-6">
          <p className="text-xs font-semibold uppercase tracking-wide text-accent mb-3">Why SuitePacific for NetSuite roles and permissions</p>
          <h2 className="text-base font-semibold text-brand-900 mb-3">The NetSuite partner IT and finance teams use for role audits, user management, and permission architecture.</h2>
          <p className="text-sm text-brand-500 mb-4">SuitePacific is a boutique NetSuite consulting firm focused exclusively on post-go-live administration and development. Role audits, permission design, and ongoing user management are core administrative deliverables.</p>
          <ul className="space-y-2 text-sm text-brand-500 mb-4">
            <li className="flex items-start gap-2"><span className="text-accent font-bold mt-0.5">→</span> Oracle NetSuite Certified SuiteCloud Developer II and Administrator Professional</li>
            <li className="flex items-start gap-2"><span className="text-accent font-bold mt-0.5">→</span> Every audit documents what each role was intended to do before reviewing what permissions it actually has</li>
            <li className="flex items-start gap-2"><span className="text-accent font-bold mt-0.5">→</span> Direct access to the consultant on every engagement; no ticket routing</li>
            <li className="flex items-start gap-2"><span className="text-accent font-bold mt-0.5">→</span> US-based, month-to-month after a three-month minimum, starting at $799/month</li>
          </ul>
          <p className="text-sm text-brand-400">Related: <Link href="/netsuite-administrator-support" className="text-accent hover:underline">NetSuite administrator support</Link> and <Link href="/netsuite-account-optimization" className="text-accent hover:underline">NetSuite account optimization</Link>.</p>
        </div>

        <div className="mt-10 rounded-2xl border border-brand-100 bg-white p-5 shadow-soft">
          <p className="text-sm font-semibold text-brand-900 mb-1">Need a role audit or permission cleanup?</p>
          <p className="text-sm text-brand-400 mb-4">Tell us roughly how many users and custom roles the account has and what the main concern is (security audit, former employee access, over-permissioned users). We will give a direct assessment.</p>
          <LeadFormLight />
        </div>

        <div className="mt-10 rounded-2xl border border-brand-100 bg-brand-50/30 p-5 sm:p-6">
          <p className="text-sm font-semibold text-brand-900 mb-3">Related reading</p>
          <ul className="space-y-2.5">
            <li className="text-sm text-brand-400"><Link href="/blog/netsuite-user-roles-permissions" className="text-accent hover:underline">NetSuite user roles and permissions: full audit and rebuild guide</Link> covers the permission model, common architecture problems, and how to fix them.</li>
            <li className="text-sm text-brand-400"><Link href="/blog/netsuite-roles-permissions-guide" className="text-accent hover:underline">How NetSuite roles and permissions work in practice</Link> covers the technical role model in detail.</li>
            <li className="text-sm text-brand-400"><Link href="/netsuite-administrator-support" className="text-accent hover:underline">NetSuite administrator support</Link> covers ongoing administration including user management as part of a monthly retainer.</li>
            <li className="text-sm text-brand-400"><Link href="/netsuite-approval-workflows" className="text-accent hover:underline">NetSuite approval workflows</Link> covers how role-based approval routing is configured in SuiteApprovals.</li>
          </ul>
        </div>

        <ServiceFaqSection items={FAQ} />
        <div className="mt-10 rounded-2xl border border-brand-100 bg-white p-5 shadow-soft">
          <p className="text-sm font-semibold text-brand-900 mb-1">Ready to clean up NetSuite roles?</p>
          <p className="text-sm text-brand-400 mb-4">Describe the current role situation and what the audit needs to address. We will scope the work and give a timeline.</p>
          <LeadFormLight />
        </div>
      </div>
    </main>
  );
}

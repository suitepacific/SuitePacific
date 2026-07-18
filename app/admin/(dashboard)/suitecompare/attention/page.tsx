import { requireAdmin } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import Link from "next/link";
import { AlertTriangle, UserX, ServerOff, WifiOff, CreditCard, ShieldOff } from "lucide-react";

function fmtDate(d: Date) {
  return d.toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" });
}

export default async function AttentionPage() {
  await requireAdmin();

  const [neverConnected, noEnvironments, recentFailures, pastDueOrgs, suspendedOrgs] = await Promise.all([
    prisma.scUser.findMany({
      where: {
        status: "active",
        memberships: { some: { org: { nsAccounts: { none: {} } } } },
      },
      select: { id: true, name: true, email: true, createdAt: true, lastLoginAt: true },
      orderBy: { createdAt: "desc" },
    }),

    prisma.scUser.findMany({
      where: {
        status: "active",
        memberships: {
          some: {
            org: { nsAccounts: { some: { environments: { none: {} } } } },
          },
        },
      },
      select: { id: true, name: true, email: true, createdAt: true, lastLoginAt: true },
      orderBy: { createdAt: "desc" },
    }),

    prisma.scComparison.findMany({
      where: {
        status: "failed",
        createdAt: { gte: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000) },
      },
      distinct: ["userId"],
      select: { userId: true, createdAt: true, errorMsg: true },
      orderBy: { createdAt: "desc" },
    }),

    prisma.scOrg.findMany({
      where: { billingStatus: "past_due" },
      select: {
        id: true,
        name: true,
        plan: true,
        members: {
          where: { role: "owner" },
          take: 1,
          select: { user: { select: { id: true, name: true, email: true, lastLoginAt: true } } },
        },
      },
    }),

    prisma.scOrg.findMany({
      where: { billingStatus: "suspended" },
      select: {
        id: true,
        name: true,
        plan: true,
        members: {
          where: { role: "owner" },
          take: 1,
          select: { user: { select: { id: true, name: true, email: true, lastLoginAt: true } } },
        },
      },
    }),
  ]);

  const failureUserIds = recentFailures.map((f) => f.userId);
  const failureUsers =
    failureUserIds.length > 0
      ? await prisma.scUser.findMany({
          where: { id: { in: failureUserIds } },
          select: { id: true, name: true, email: true },
        })
      : [];
  const failureUserMap = Object.fromEntries(failureUsers.map((u) => [u.id, u]));

  const total =
    neverConnected.length +
    noEnvironments.length +
    recentFailures.length +
    pastDueOrgs.length +
    suspendedOrgs.length;

  function group(
    icon: React.ReactNode,
    iconColor: string,
    title: string,
    description: string,
    users: { id: string; name: string; email: string; createdAt: Date; lastLoginAt?: Date | null }[]
  ) {
    if (users.length === 0) return null;
    return (
      <div>
        <div className="flex items-center gap-2.5 mb-3">
          <span className={iconColor}>{icon}</span>
          <div>
            <h2 className="text-sm font-semibold text-brand-900">
              {title} <span className="ml-1.5 text-brand-400 font-normal">({users.length})</span>
            </h2>
            <p className="text-xs text-brand-400">{description}</p>
          </div>
        </div>
        <div className="bg-white rounded-2xl border border-brand-50 shadow-soft overflow-hidden">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-brand-50 bg-brand-50/40">
                <th className="text-left px-5 py-3 text-xs font-semibold text-brand-400 uppercase tracking-wide">User</th>
                <th className="text-left px-5 py-3 text-xs font-semibold text-brand-400 uppercase tracking-wide">Registered</th>
                <th className="text-left px-5 py-3 text-xs font-semibold text-brand-400 uppercase tracking-wide">Last Login</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-brand-50">
              {users.map((u) => (
                <tr key={u.id} className="hover:bg-brand-50/40 transition-colors">
                  <td className="px-5 py-3.5">
                    <Link href={`/admin/suitecompare/users/${u.id}`} className="font-medium text-brand-900 hover:text-accent">
                      {u.name}
                    </Link>
                    <p className="text-xs text-brand-400 mt-0.5">{u.email}</p>
                  </td>
                  <td className="px-5 py-3.5 text-brand-400 text-xs">{fmtDate(u.createdAt)}</td>
                  <td className="px-5 py-3.5 text-brand-400 text-xs">
                    {u.lastLoginAt ? fmtDate(u.lastLoginAt) : "Never"}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    );
  }

  function billingGroup(
    icon: React.ReactNode,
    iconColor: string,
    title: string,
    description: string,
    orgs: typeof suspendedOrgs
  ) {
    if (orgs.length === 0) return null;
    return (
      <div>
        <div className="flex items-center gap-2.5 mb-3">
          <span className={iconColor}>{icon}</span>
          <div>
            <h2 className="text-sm font-semibold text-brand-900">
              {title} <span className="ml-1.5 text-brand-400 font-normal">({orgs.length})</span>
            </h2>
            <p className="text-xs text-brand-400">{description}</p>
          </div>
        </div>
        <div className="bg-white rounded-2xl border border-brand-50 shadow-soft overflow-hidden">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-brand-50 bg-brand-50/40">
                <th className="text-left px-5 py-3 text-xs font-semibold text-brand-400 uppercase tracking-wide">Organization</th>
                <th className="text-left px-5 py-3 text-xs font-semibold text-brand-400 uppercase tracking-wide">Owner</th>
                <th className="text-left px-5 py-3 text-xs font-semibold text-brand-400 uppercase tracking-wide">Plan</th>
                <th className="text-left px-5 py-3 text-xs font-semibold text-brand-400 uppercase tracking-wide">Last login</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-brand-50">
              {orgs.map((org) => {
                const owner = org.members[0]?.user;
                return (
                  <tr key={org.id} className="hover:bg-brand-50/40 transition-colors">
                    <td className="px-5 py-3.5 font-medium text-brand-900">{org.name}</td>
                    <td className="px-5 py-3.5">
                      {owner ? (
                        <>
                          <Link href={`/admin/suitecompare/users/${owner.id}`} className="text-brand-900 hover:text-accent">
                            {owner.name}
                          </Link>
                          <p className="text-xs text-brand-400 mt-0.5">{owner.email}</p>
                        </>
                      ) : (
                        <span className="text-brand-400 text-xs">—</span>
                      )}
                    </td>
                    <td className="px-5 py-3.5">
                      <span className="capitalize text-xs text-brand-600">{org.plan}</span>
                    </td>
                    <td className="px-5 py-3.5 text-brand-400 text-xs">
                      {owner?.lastLoginAt ? fmtDate(owner.lastLoginAt) : "Never"}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      {total === 0 ? (
        <div className="rounded-2xl border border-brand-50 bg-white shadow-soft px-8 py-16 text-center">
          <p className="text-3xl mb-3">✓</p>
          <p className="text-sm font-semibold text-brand-900">No users need attention</p>
          <p className="text-xs text-brand-400 mt-1">All active users are set up and running normally.</p>
        </div>
      ) : (
        <>
          <div className="flex items-center gap-2.5 rounded-xl border border-amber-200 bg-amber-50 px-4 py-3">
            <AlertTriangle className="h-4 w-4 text-amber-500 shrink-0" />
            <p className="text-sm text-amber-800">
              <strong>{total}</strong> item{total !== 1 ? "s" : ""} may need your attention.
            </p>
          </div>

          {billingGroup(
            <ShieldOff className="h-4 w-4" />,
            "text-red-500",
            "Suspended accounts",
            "These orgs have been suspended and cannot access SuiteCompare.",
            suspendedOrgs
          )}

          {billingGroup(
            <CreditCard className="h-4 w-4" />,
            "text-amber-500",
            "Past-due accounts",
            "Payment overdue — service interruption pending if not resolved.",
            pastDueOrgs
          )}

          {group(
            <UserX className="h-4 w-4" />,
            "text-amber-500",
            "Never connected an environment",
            "Registered but haven't added a NetSuite account yet.",
            neverConnected
          )}

          {group(
            <ServerOff className="h-4 w-4" />,
            "text-amber-500",
            "Account connected, no environments",
            "Added a client account but haven't set up Production or Sandbox.",
            noEnvironments
          )}

          {recentFailures.length > 0 && (
            <div>
              <div className="flex items-center gap-2.5 mb-3">
                <WifiOff className="h-4 w-4 text-amber-500" />
                <div>
                  <h2 className="text-sm font-semibold text-brand-900">
                    Recent comparison failures <span className="ml-1.5 text-brand-400 font-normal">({recentFailures.length})</span>
                  </h2>
                  <p className="text-xs text-brand-400">Failures in the past 7 days.</p>
                </div>
              </div>
              <div className="bg-white rounded-2xl border border-brand-50 shadow-soft overflow-hidden">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b border-brand-50 bg-brand-50/40">
                      <th className="text-left px-5 py-3 text-xs font-semibold text-brand-400 uppercase tracking-wide">User</th>
                      <th className="text-left px-5 py-3 text-xs font-semibold text-brand-400 uppercase tracking-wide">Last failure</th>
                      <th className="text-left px-5 py-3 text-xs font-semibold text-brand-400 uppercase tracking-wide">Error</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-brand-50">
                    {recentFailures.map((f) => {
                      const u = failureUserMap[f.userId];
                      if (!u) return null;
                      return (
                        <tr key={f.userId} className="hover:bg-brand-50/40 transition-colors">
                          <td className="px-5 py-3.5">
                            <Link href={`/admin/suitecompare/users/${u.id}`} className="font-medium text-brand-900 hover:text-accent">
                              {u.name}
                            </Link>
                            <p className="text-xs text-brand-400 mt-0.5">{u.email}</p>
                          </td>
                          <td className="px-5 py-3.5 text-brand-400 text-xs">{fmtDate(f.createdAt)}</td>
                          <td className="px-5 py-3.5 text-xs text-red-500">{f.errorMsg ?? "—"}</td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            </div>
          )}
        </>
      )}
    </div>
  );
}

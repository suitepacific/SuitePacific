import { requireAdmin } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import Link from "next/link";
import { AlertTriangle } from "lucide-react";

function startOfToday() {
  const d = new Date();
  d.setHours(0, 0, 0, 0);
  return d;
}

function statCard(label: string, value: number | string, sub?: string) {
  return (
    <div className="bg-white rounded-2xl border border-brand-50 shadow-soft p-5">
      <p className="text-xs font-semibold uppercase tracking-wider text-brand-400 mb-1">{label}</p>
      <p className="text-3xl font-bold text-brand-900">{value}</p>
      {sub && <p className="mt-1 text-xs text-brand-400">{sub}</p>}
    </div>
  );
}

export default async function SuiteCompareAdminDashboard() {
  await requireAdmin();

  const today = startOfToday();

  const [
    totalUsers,
    paidMemberships,
    activeToday,
    comparisonsToday,
    noAccountUsers,
    recentUsers,
  ] = await Promise.all([
    prisma.scUser.count({ where: { status: "active" } }),

    prisma.scOrgMember.findMany({
      where: { org: { plan: { not: "free" } } },
      select: { userId: true },
      distinct: ["userId"],
    }),

    prisma.scUser.count({
      where: { status: "active", lastLoginAt: { gte: today } },
    }),

    prisma.scComparison.count({ where: { createdAt: { gte: today } } }),

    // Users whose org has no connected accounts
    prisma.scUser.findMany({
      where: {
        status: "active",
        memberships: {
          some: { org: { nsAccounts: { none: {} } } },
        },
      },
      select: { id: true, name: true, email: true, createdAt: true },
      orderBy: { createdAt: "desc" },
      take: 5,
    }),

    prisma.scUser.findMany({
      where: { status: "active" },
      orderBy: { createdAt: "desc" },
      take: 5,
      select: { id: true, name: true, email: true, createdAt: true },
    }),
  ]);

  const paidCount = paidMemberships.length;
  const attentionCount = noAccountUsers.length;

  return (
    <div className="space-y-8">
      {/* Stat cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {statCard("Total Users", totalUsers)}
        {statCard("Paid Users", paidCount, "Pro or Team plan")}
        {statCard("Active Today", activeToday, "logged in today")}
        {statCard("Comparisons Today", comparisonsToday)}
      </div>

      {/* Attention alert */}
      {attentionCount > 0 && (
        <Link
          href="/admin/suitecompare/attention"
          className="flex items-center gap-3 rounded-2xl border border-amber-200 bg-amber-50 px-5 py-4 hover:bg-amber-100 transition-colors"
        >
          <AlertTriangle className="h-5 w-5 text-amber-500 shrink-0" />
          <div>
            <p className="text-sm font-semibold text-amber-900">
              {attentionCount} user{attentionCount !== 1 ? "s" : ""} need{attentionCount === 1 ? "s" : ""} attention
            </p>
            <p className="text-xs text-amber-700 mt-0.5">
              Registered but never connected an environment. View details.
            </p>
          </div>
        </Link>
      )}

      {/* Recent signups */}
      <div>
        <div className="flex items-center justify-between mb-3">
          <h2 className="text-sm font-semibold text-brand-900">Recent signups</h2>
          <Link href="/admin/suitecompare/users" className="text-xs text-accent hover:underline">
            View all
          </Link>
        </div>
        <div className="bg-white rounded-2xl border border-brand-50 shadow-soft overflow-hidden">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-brand-50 bg-brand-50/60">
                <th className="text-left px-5 py-3 text-xs font-semibold text-brand-400 uppercase tracking-wide">Name</th>
                <th className="text-left px-5 py-3 text-xs font-semibold text-brand-400 uppercase tracking-wide">Email</th>
                <th className="text-left px-5 py-3 text-xs font-semibold text-brand-400 uppercase tracking-wide">Joined</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-brand-50">
              {recentUsers.length === 0 && (
                <tr><td colSpan={3} className="px-5 py-6 text-center text-sm text-brand-300">No users yet.</td></tr>
              )}
              {recentUsers.map((u) => (
                <tr key={u.id} className="hover:bg-brand-50/40 transition-colors">
                  <td className="px-5 py-3">
                    <Link href={`/admin/suitecompare/users/${u.id}`} className="font-medium text-brand-900 hover:text-accent">
                      {u.name}
                    </Link>
                  </td>
                  <td className="px-5 py-3 text-brand-400">{u.email}</td>
                  <td className="px-5 py-3 text-brand-400">
                    {u.createdAt.toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

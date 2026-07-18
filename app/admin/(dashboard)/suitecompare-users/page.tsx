import { requireAdmin } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { archiveScUserAction } from "./actions";

function formatDate(date: Date): string {
  return date.toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" });
}

export default async function SuiteCompareUsersPage() {
  await requireAdmin();

  const users = await prisma.scUser.findMany({
    orderBy: { createdAt: "desc" },
    include: {
      memberships: {
        include: { org: true },
      },
    },
  });

  return (
    <div>
      <div className="mb-6 flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-semibold text-brand-900">SuiteCompare Users</h1>
          <p className="mt-1 text-sm text-brand-400">{users.length} accounts</p>
        </div>
      </div>

      <div className="bg-white rounded-2xl border border-brand-50 shadow-soft overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-brand-50 bg-brand-50/60">
                <th className="text-left px-5 py-3 text-xs font-semibold text-brand-400 uppercase tracking-wide">
                  Name
                </th>
                <th className="text-left px-5 py-3 text-xs font-semibold text-brand-400 uppercase tracking-wide">
                  Email
                </th>
                <th className="text-left px-5 py-3 text-xs font-semibold text-brand-400 uppercase tracking-wide">
                  Organization
                </th>
                <th className="text-left px-5 py-3 text-xs font-semibold text-brand-400 uppercase tracking-wide">
                  Plan
                </th>
                <th className="text-left px-5 py-3 text-xs font-semibold text-brand-400 uppercase tracking-wide">
                  Status
                </th>
                <th className="text-left px-5 py-3 text-xs font-semibold text-brand-400 uppercase tracking-wide">
                  Created
                </th>
                <th className="px-5 py-3" />
              </tr>
            </thead>
            <tbody className="divide-y divide-brand-50">
              {users.length === 0 && (
                <tr>
                  <td colSpan={7} className="px-5 py-8 text-center text-sm text-brand-300">
                    No SuiteCompare users yet.
                  </td>
                </tr>
              )}
              {users.map((user) => {
                const membership = user.memberships[0];
                const org = membership?.org;
                return (
                  <tr key={user.id} className="hover:bg-brand-50/40 transition-colors">
                    <td className="px-5 py-3.5 font-medium text-brand-900">{user.name}</td>
                    <td className="px-5 py-3.5 text-brand-400">{user.email}</td>
                    <td className="px-5 py-3.5 text-brand-700">
                      {org ? (
                        <span>
                          {org.name}
                          <span className="ml-1.5 text-xs text-brand-300">({membership.role})</span>
                        </span>
                      ) : (
                        <span className="text-brand-300">—</span>
                      )}
                    </td>
                    <td className="px-5 py-3.5">
                      <span className="inline-flex items-center rounded-full bg-brand-50 px-2 py-0.5 text-xs font-medium text-brand-500">
                        {org?.plan ?? "—"}
                      </span>
                    </td>
                    <td className="px-5 py-3.5">
                      <span
                        className={`inline-flex items-center rounded-full px-2 py-0.5 text-xs font-medium ${
                          user.status === "active"
                            ? "bg-emerald-50 text-emerald-600"
                            : "bg-red-50 text-red-500"
                        }`}
                      >
                        {user.status}
                      </span>
                    </td>
                    <td className="px-5 py-3.5 text-brand-400">{formatDate(user.createdAt)}</td>
                    <td className="px-5 py-3.5 text-right">
                      {user.status === "active" && (
                        <form
                          action={archiveScUserAction.bind(null, user.id)}
                          className="inline"
                        >
                          <button
                            type="submit"
                            className="text-xs text-brand-400 hover:text-red-500 transition-colors"
                          >
                            Archive
                          </button>
                        </form>
                      )}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

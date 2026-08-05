import { requireAdmin } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import Link from "next/link";

const PAGE_SIZE = 25;

function toFlag(code: string): string {
  return [...code.toUpperCase()].map((c) => String.fromCodePoint(0x1f1e6 + c.charCodeAt(0) - 65)).join("");
}

function fmt(d: Date | null | undefined) {
  if (!d) return "-";
  return d.toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" });
}

function planBadge(plan: string | undefined) {
  if (!plan || plan === "free") return <span className="inline-flex rounded-full bg-brand-50 px-2 py-0.5 text-xs font-medium text-brand-400">Free</span>;
  if (plan === "pro") return <span className="inline-flex rounded-full bg-blue-50 px-2 py-0.5 text-xs font-medium text-blue-600">Pro</span>;
  return <span className="inline-flex rounded-full bg-violet-50 px-2 py-0.5 text-xs font-medium text-violet-600">Team</span>;
}

interface Props {
  searchParams: Promise<{ q?: string; page?: string }>;
}

export default async function SuiteCompareUsersPage({ searchParams }: Props) {
  await requireAdmin();
  const sp = await searchParams;
  const q = (sp.q ?? "").trim();
  const page = Math.min(Math.max(1, parseInt(sp.page ?? "1", 10)), 1000);
  const skip = (page - 1) * PAGE_SIZE;

  const where = q
    ? {
        OR: [
          { name: { contains: q, mode: "insensitive" as const } },
          { email: { contains: q, mode: "insensitive" as const } },
        ],
      }
    : {};

  const [users, total, adminInviteRows] = await Promise.all([
    prisma.scUser.findMany({
      where,
      orderBy: { createdAt: "desc" },
      skip,
      take: PAGE_SIZE,
      include: { memberships: { include: { org: true }, take: 1 } },
    }),
    prisma.scUser.count({ where }),
    prisma.scAdminInvite.findMany({
      where: { userId: { not: null }, activatedAt: { not: null } },
      select: { userId: true },
    }),
  ]);

  const adminInvitedIds = new Set(adminInviteRows.map((r) => r.userId!));
  const totalPages = Math.ceil(total / PAGE_SIZE);

  function pageUrl(p: number) {
    const params = new URLSearchParams();
    if (q) params.set("q", q);
    if (p > 1) params.set("page", String(p));
    const s = params.toString();
    return `/admin/suitecompare/users${s ? `?${s}` : ""}`;
  }

  return (
    <div>
      <form className="mb-5 flex gap-2 max-w-sm" method="GET">
        <input
          name="q"
          defaultValue={q}
          placeholder="Search name or email..."
          className="flex-1 rounded-lg border border-brand-100 px-3.5 py-2 text-sm text-brand-900 placeholder:text-brand-300 focus:outline-none focus:ring-2 focus:ring-accent/30 focus:border-accent"
        />
        <button type="submit" className="rounded-lg border border-brand-100 bg-white px-4 py-2 text-sm font-medium text-brand-600 hover:bg-brand-50 transition-colors">
          Search
        </button>
        {q && (
          <Link href="/admin/suitecompare/users" className="rounded-lg border border-brand-100 bg-white px-3 py-2 text-sm text-brand-400 hover:text-brand-700 transition-colors">
            Clear
          </Link>
        )}
      </form>

      <div className="bg-white rounded-2xl border border-brand-50 shadow-soft overflow-hidden">
        <div className="flex items-center justify-between px-5 py-3 border-b border-brand-50 bg-brand-50/40">
          <p className="text-xs text-brand-400">
            {total} user{total !== 1 ? "s" : ""}{q ? ` matching "${q}"` : ""}
          </p>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-sm min-w-[700px]">
            <thead>
              <tr className="border-b border-brand-50 text-left">
                <th className="px-5 py-3 text-xs font-semibold text-brand-400 uppercase tracking-wide">Name</th>
                <th className="px-5 py-3 text-xs font-semibold text-brand-400 uppercase tracking-wide">Email</th>
                <th className="px-5 py-3 text-xs font-semibold text-brand-400 uppercase tracking-wide">Plan</th>
                <th className="px-5 py-3 text-xs font-semibold text-brand-400 uppercase tracking-wide">Registered</th>
                <th className="px-5 py-3 text-xs font-semibold text-brand-400 uppercase tracking-wide">Last Login</th>
                <th className="px-5 py-3 text-xs font-semibold text-brand-400 uppercase tracking-wide">Status</th>
                <th className="px-5 py-3 text-xs font-semibold text-brand-400 uppercase tracking-wide">Location</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-brand-50">
              {users.length === 0 && (
                <tr>
                  <td colSpan={7} className="px-5 py-8 text-center text-sm text-brand-300">
                    {q ? "No users match your search." : "No users yet."}
                  </td>
                </tr>
              )}
              {users.map((u) => {
                const org = u.memberships[0]?.org;
                const isViaInvite = adminInvitedIds.has(u.id);
                return (
                  <tr key={u.id} className="hover:bg-brand-50/40 transition-colors">
                    <td className="px-5 py-3.5">
                      <div className="flex items-center gap-2 flex-wrap">
                        <Link href={`/admin/suitecompare/users/${u.id}`} className="font-medium text-brand-900 hover:text-accent">
                          {u.name}
                        </Link>
                        {isViaInvite && (
                          <span className="inline-flex rounded-full bg-accent/10 px-2 py-0.5 text-xs font-medium text-accent">Invited</span>
                        )}
                      </div>
                    </td>
                    <td className="px-5 py-3.5 text-brand-500">{u.email}</td>
                    <td className="px-5 py-3.5">{planBadge(org?.plan)}</td>
                    <td className="px-5 py-3.5 text-brand-400">{fmt(u.createdAt)}</td>
                    <td className="px-5 py-3.5 text-brand-400">{fmt(u.lastLoginAt)}</td>
                    <td className="px-5 py-3.5">
                      {u.status === "suspended" ? (
                        <span className="inline-flex rounded-full bg-red-50 px-2 py-0.5 text-xs font-medium text-red-600">Suspended</span>
                      ) : u.emailVerified ? (
                        <span className="inline-flex rounded-full bg-emerald-50 px-2 py-0.5 text-xs font-medium text-emerald-600">Verified</span>
                      ) : (
                        <span className="inline-flex rounded-full bg-amber-50 px-2 py-0.5 text-xs font-medium text-amber-600">Unverified</span>
                      )}
                    </td>
                    <td className="px-5 py-3.5 text-brand-400 text-xs">
                      {u.signupCountry ? (
                        <span className="flex items-center gap-1.5">
                          <span>{toFlag(u.signupCountry)}</span>
                          <span>{u.signupCity ? `${u.signupCity}, ` : ""}{u.signupCountry}</span>
                        </span>
                      ) : "-"}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>

        {totalPages > 1 && (
          <div className="flex items-center justify-between px-5 py-3 border-t border-brand-50">
            <p className="text-xs text-brand-400">Page {page} of {totalPages}</p>
            <div className="flex gap-1">
              {page > 1 && (
                <Link href={pageUrl(page - 1)} className="rounded-lg border border-brand-100 px-3 py-1.5 text-xs text-brand-600 hover:bg-brand-50 transition-colors">Previous</Link>
              )}
              {page < totalPages && (
                <Link href={pageUrl(page + 1)} className="rounded-lg border border-brand-100 px-3 py-1.5 text-xs text-brand-600 hover:bg-brand-50 transition-colors">Next</Link>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

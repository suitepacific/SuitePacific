import { requireAdmin } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import Link from "next/link";
import { UserPlus, Server, FileSearch, XCircle, GitCompare } from "lucide-react";

type ActivityEvent = {
  id: string;
  type: "user_registered" | "env_connected" | "script_browsed" | "comparison_failed" | "comparison_ok" | "invite_sent";
  time: Date;
  userName: string;
  userId: string;
  detail: string;
};

function timeAgo(date: Date): string {
  const secs = Math.floor((Date.now() - date.getTime()) / 1000);
  if (secs < 60) return `${secs}s ago`;
  const mins = Math.floor(secs / 60);
  if (mins < 60) return `${mins}m ago`;
  const hrs = Math.floor(mins / 60);
  if (hrs < 24) return `${hrs}h ago`;
  return date.toLocaleDateString("en-US", { month: "short", day: "numeric" });
}

function eventIcon(type: ActivityEvent["type"]) {
  switch (type) {
    case "user_registered": return <UserPlus className="h-3.5 w-3.5" />;
    case "env_connected": return <Server className="h-3.5 w-3.5" />;
    case "script_browsed": return <FileSearch className="h-3.5 w-3.5" />;
    case "comparison_failed": return <XCircle className="h-3.5 w-3.5" />;
    case "comparison_ok": return <GitCompare className="h-3.5 w-3.5" />;
    case "invite_sent": return <UserPlus className="h-3.5 w-3.5" />;
  }
}

function eventColor(type: ActivityEvent["type"]) {
  switch (type) {
    case "user_registered": return "bg-blue-50 text-blue-500";
    case "env_connected": return "bg-emerald-50 text-emerald-500";
    case "script_browsed": return "bg-brand-50 text-brand-400";
    case "comparison_ok": return "bg-violet-50 text-violet-500";
    case "comparison_failed": return "bg-red-50 text-red-400";
    case "invite_sent": return "bg-amber-50 text-amber-500";
  }
}

export default async function ActivityPage() {
  await requireAdmin();

  const since = new Date(Date.now() - 14 * 24 * 60 * 60 * 1000); // 14 days

  const [recentUsers, recentEnvs, recentScripts, recentComparisons, recentInvites] = await Promise.all([
    prisma.scUser.findMany({
      where: { createdAt: { gte: since } },
      orderBy: { createdAt: "desc" },
      take: 50,
      select: { id: true, name: true, createdAt: true },
    }),

    prisma.scEnvironment.findMany({
      where: { createdAt: { gte: since } },
      orderBy: { createdAt: "desc" },
      take: 50,
      include: {
        account: {
          include: { org: { include: { members: { include: { user: { select: { id: true, name: true } } }, take: 1 } } } },
        },
      },
    }),

    prisma.scScript.findMany({
      where: { browsedAt: { gte: since } },
      orderBy: { browsedAt: "desc" },
      take: 50,
      include: {
        environment: {
          include: {
            account: {
              include: { org: { include: { members: { include: { user: { select: { id: true, name: true } } }, take: 1 } } } },
            },
          },
        },
      },
    }),

    prisma.scComparison.findMany({
      where: { createdAt: { gte: since } },
      orderBy: { createdAt: "desc" },
      take: 50,
      include: { } as never,
    }),

    prisma.scInvite.findMany({
      where: { createdAt: { gte: since } },
      orderBy: { createdAt: "desc" },
      take: 30,
      include: { org: { include: { members: { include: { user: { select: { id: true, name: true } } }, where: { role: "owner" } } } } },
    }),
  ]);

  // Fetch user info for comparisons
  const compUserIds = [...new Set(recentComparisons.map((c) => c.userId))];
  const compUsers = compUserIds.length
    ? await prisma.scUser.findMany({ where: { id: { in: compUserIds } }, select: { id: true, name: true } })
    : [];
  const compUserMap = Object.fromEntries(compUsers.map((u) => [u.id, u]));

  const events: ActivityEvent[] = [
    ...recentUsers.map((u) => ({
      id: `reg-${u.id}`,
      type: "user_registered" as const,
      time: u.createdAt,
      userName: u.name,
      userId: u.id,
      detail: "Registered",
    })),

    ...recentEnvs.map((e) => {
      const owner = e.account.org.members[0]?.user;
      return {
        id: `env-${e.id}`,
        type: "env_connected" as const,
        time: e.createdAt,
        userName: owner?.name ?? "Unknown",
        userId: owner?.id ?? "",
        detail: `Connected ${e.name} (${e.type})`,
      };
    }),

    ...recentScripts.map((s) => {
      const owner = s.environment.account.org.members[0]?.user;
      return {
        id: `script-${s.id}`,
        type: "script_browsed" as const,
        time: s.browsedAt,
        userName: owner?.name ?? "Unknown",
        userId: owner?.id ?? "",
        detail: `Browsed script ${s.scriptId}`,
      };
    }),

    ...recentComparisons.map((c) => {
      const u = compUserMap[c.userId];
      return {
        id: `cmp-${c.id}`,
        type: (c.status === "failed" ? "comparison_failed" : "comparison_ok") as ActivityEvent["type"],
        time: c.createdAt,
        userName: u?.name ?? "Unknown",
        userId: c.userId,
        detail: `Compared ${c.scriptId}${c.status === "failed" && c.errorMsg ? ` — ${c.errorMsg}` : ""}`,
      };
    }),

    ...recentInvites.map((inv) => {
      const owner = inv.org.members[0]?.user;
      return {
        id: `inv-${inv.id}`,
        type: "invite_sent" as const,
        time: inv.createdAt,
        userName: owner?.name ?? "Unknown",
        userId: owner?.id ?? "",
        detail: `Invited ${inv.email}`,
      };
    }),
  ]
    .sort((a, b) => b.time.getTime() - a.time.getTime())
    .slice(0, 100);

  return (
    <div>
      <p className="text-xs text-brand-400 mb-5">Last 14 days · {events.length} events</p>

      {events.length === 0 ? (
        <div className="rounded-2xl border border-brand-50 bg-white shadow-soft px-8 py-16 text-center">
          <p className="text-sm text-brand-300">No activity yet.</p>
        </div>
      ) : (
        <div className="bg-white rounded-2xl border border-brand-50 shadow-soft overflow-hidden">
          <div className="divide-y divide-brand-50">
            {events.map((e) => (
              <div key={e.id} className="flex items-center gap-4 px-5 py-3 hover:bg-brand-50/40 transition-colors">
                <div className={`flex h-7 w-7 shrink-0 items-center justify-center rounded-full ${eventColor(e.type)}`}>
                  {eventIcon(e.type)}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm text-brand-700 truncate">
                    {e.userId ? (
                      <Link href={`/admin/suitecompare/users/${e.userId}`} className="font-medium text-brand-900 hover:text-accent">
                        {e.userName}
                      </Link>
                    ) : (
                      <span className="font-medium text-brand-900">{e.userName}</span>
                    )}
                    {" "}<span className="text-brand-400">{e.detail}</span>
                  </p>
                </div>
                <span className="text-xs text-brand-300 shrink-0 tabular-nums">{timeAgo(e.time)}</span>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

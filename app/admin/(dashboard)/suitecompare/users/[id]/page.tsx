import { requireAdmin } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { notFound } from "next/navigation";
import Link from "next/link";
import { AlertTriangle, CheckCircle2, Clock, User, Building2, Server, CreditCard, Crown, Users } from "lucide-react";
import { getSeatLimit, getClientLimit } from "@/lib/sc-plans";
import { hasCredentials } from "@/lib/sc-netsuite";
import {
  setOrgPlanAction,
  setOrgBillingStatusAction,
  setSeatLimitOverrideAction,
  setClientLimitOverrideAction,
} from "./actions";

function fmt(d: Date | null | undefined) {
  if (!d) return "—";
  return d.toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric", hour: "2-digit", minute: "2-digit" });
}

function fmtDate(d: Date | null | undefined) {
  if (!d) return "—";
  return d.toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" });
}

function toFlag(code: string): string {
  return [...code.toUpperCase()].map((c) => String.fromCodePoint(0x1f1e6 + c.charCodeAt(0) - 65)).join("");
}

function planBadge(plan: string) {
  if (plan === "pro") return <span className="inline-flex rounded-full bg-blue-50 px-2.5 py-1 text-xs font-semibold text-blue-600">Pro</span>;
  if (plan === "team") return <span className="inline-flex rounded-full bg-violet-50 px-2.5 py-1 text-xs font-semibold text-violet-600">Team</span>;
  return <span className="inline-flex rounded-full bg-brand-50 px-2.5 py-1 text-xs font-medium text-brand-400">Free</span>;
}

function billingBadge(status: string) {
  if (status === "past_due") return <span className="inline-flex rounded-full bg-amber-50 px-2.5 py-1 text-xs font-semibold text-amber-600">Past due</span>;
  if (status === "suspended") return <span className="inline-flex rounded-full bg-red-50 px-2.5 py-1 text-xs font-semibold text-red-600">Suspended</span>;
  return <span className="inline-flex rounded-full bg-emerald-50 px-2.5 py-1 text-xs font-medium text-emerald-600">Active</span>;
}

interface Props {
  params: Promise<{ id: string }>;
}

export default async function ScUserDetailPage({ params }: Props) {
  await requireAdmin();
  const { id } = await params;

  const user = await prisma.scUser.findUnique({
    where: { id },
    include: {
      memberships: {
        include: {
          org: {
            include: {
              nsAccounts: {
                include: { environments: { include: { scripts: { orderBy: { browsedAt: "desc" }, take: 1 } } } },
              },
            },
          },
        },
      },
    },
  });

  if (!user) notFound();

  const membership = user.memberships[0];
  const org = membership?.org;
  const accounts = org?.nsAccounts ?? [];
  const allEnvs = accounts.flatMap((a) => a.environments);

  const [comparisonsTotal, recentComparisons, viaAdminInvite, orgMembers, pendingTeamInvites] = await Promise.all([
    prisma.scComparison.count({ where: { userId: id } }),
    prisma.scComparison.findMany({ where: { userId: id }, orderBy: { createdAt: "desc" }, take: 10 }),
    prisma.scAdminInvite.findFirst({ where: { userId: user.id }, orderBy: { sentAt: "desc" }, select: { activatedAt: true, plan: true, sentAt: true } }),
    org
      ? prisma.scOrgMember.findMany({
          where: { orgId: org.id },
          include: {
            user: { select: { id: true, name: true, email: true, createdAt: true, lastLoginAt: true, emailVerified: true } },
          },
          orderBy: { createdAt: "asc" },
        })
      : Promise.resolve([]),
    org
      ? prisma.scInvite.findMany({
          where: { orgId: org.id, usedAt: null, expiresAt: { gt: new Date() } },
          orderBy: { createdAt: "asc" },
        })
      : Promise.resolve([]),
  ]);

  const lastComparison = recentComparisons[0];
  const hasFailure = recentComparisons.some((c) => c.status === "failed");
  const noEnv = accounts.length === 0;
  const isSuspended = org?.billingStatus === "suspended";

  // Seat grid data
  const seatLimit = org ? getSeatLimit(org.plan, org.seatLimitOverride) : 0;
  const sortedMembers = org
    ? [
        ...orgMembers.filter((m) => m.role === "owner"),
        ...orgMembers.filter((m) => m.role !== "owner"),
      ]
    : [];
  const emptySlotCount = Math.max(0, seatLimit - sortedMembers.length - pendingTeamInvites.length);

  const PLANS = ["free", "pro", "team"] as const;
  const BILLING_STATUSES = ["active", "past_due", "suspended"] as const;
  const BILLING_LABELS: Record<string, string> = { active: "Active", past_due: "Past Due", suspended: "Suspended" };

  function section(title: string, icon: React.ReactNode, children: React.ReactNode, fullWidth = false) {
    return (
      <div className={fullWidth ? "lg:col-span-2" : ""}>
        <div className="bg-white rounded-2xl border border-brand-50 shadow-soft overflow-hidden h-full">
          <div className="flex items-center gap-2.5 px-5 py-3.5 border-b border-brand-50 bg-brand-50/40">
            <span className="text-brand-400">{icon}</span>
            <h2 className="text-sm font-semibold text-brand-900">{title}</h2>
          </div>
          <div className="p-5">{children}</div>
        </div>
      </div>
    );
  }

  function row(label: string, value: React.ReactNode) {
    return (
      <div className="flex items-start justify-between gap-4 py-2 border-b border-brand-50 last:border-0">
        <span className="text-xs text-brand-400 shrink-0 pt-0.5 w-32">{label}</span>
        <span className="text-sm text-brand-700 text-right">{value}</span>
      </div>
    );
  }

  return (
    <div>
      <div className="mb-6 flex items-center gap-2 text-sm text-brand-400">
        <Link href="/admin/suitecompare/users" className="hover:text-accent">Users</Link>
        <span>/</span>
        <span className="text-brand-700">{user.name}</span>
      </div>

      {/* Problem banners */}
      {(noEnv || hasFailure || isSuspended) && (
        <div className="mb-6 space-y-2">
          {isSuspended && (
            <div className="flex items-center gap-3 rounded-xl border border-red-200 bg-red-50 px-4 py-3">
              <AlertTriangle className="h-4 w-4 text-red-500 shrink-0" />
              <p className="text-sm text-red-800">This account is suspended. The user cannot access SuiteCompare.</p>
            </div>
          )}
          {noEnv && (
            <div className="flex items-center gap-3 rounded-xl border border-amber-200 bg-amber-50 px-4 py-3">
              <AlertTriangle className="h-4 w-4 text-amber-500 shrink-0" />
              <p className="text-sm text-amber-800">No environment connected. This user has never set up a NetSuite account.</p>
            </div>
          )}
          {hasFailure && (
            <div className="flex items-center gap-3 rounded-xl border border-red-200 bg-red-50 px-4 py-3">
              <AlertTriangle className="h-4 w-4 text-red-500 shrink-0" />
              <p className="text-sm text-red-800">Recent comparison failures detected.</p>
            </div>
          )}
        </div>
      )}

      <div className="grid lg:grid-cols-2 gap-5">
        {/* User info */}
        {section("User", <User className="h-4 w-4" />,
          <div>
            {row("Name", (
              <span className="flex items-center gap-2 justify-end flex-wrap">
                {user.name}
                {viaAdminInvite && (
                  <span className="inline-flex rounded-full bg-accent/10 px-2 py-0.5 text-xs font-medium text-accent">Via invite</span>
                )}
              </span>
            ))}
            {row("Email", user.email)}
            {row("Status", user.emailVerified
              ? <span className="inline-flex items-center gap-1 text-emerald-600 text-xs"><CheckCircle2 className="h-3 w-3" />Verified</span>
              : <span className="inline-flex items-center gap-1 text-amber-600 text-xs"><Clock className="h-3 w-3" />Unverified</span>
            )}
            {row("Registered", fmtDate(user.createdAt))}
            {row("Last login", fmt(user.lastLoginAt))}
            {row("Location", user.signupCountry
              ? <span className="flex items-center gap-1.5 justify-end">{toFlag(user.signupCountry)}{user.signupCity ? `${user.signupCity}, ` : ""}{user.signupCountry}</span>
              : "—"
            )}
            {viaAdminInvite && (
              <>
                {row("Invite sent", fmtDate(viaAdminInvite.sentAt))}
                {row("Activated", fmtDate(viaAdminInvite.activatedAt))}
              </>
            )}
          </div>
        )}

        {/* Org info */}
        {section("Organization", <Building2 className="h-4 w-4" />,
          org ? (
            <div>
              {row("Name", org.name)}
              {row("Role", membership.role)}
              {row("Plan", planBadge(org.plan))}
              {row("Billing", billingBadge(org.billingStatus))}
            </div>
          ) : (
            <p className="text-sm text-brand-400">No organization.</p>
          )
        )}

        {/* Seat grid — full width */}
        {org && (
          <div className="lg:col-span-2">
            <div className="bg-white rounded-2xl border border-brand-50 shadow-soft overflow-hidden">
              <div className="flex items-center justify-between gap-4 px-5 py-3.5 border-b border-brand-50 bg-brand-50/40">
                <div className="flex items-center gap-2.5">
                  <span className="text-brand-400"><Users className="h-4 w-4" /></span>
                  <h2 className="text-sm font-semibold text-brand-900">Seats</h2>
                </div>
                <span className="text-xs text-brand-400 tabular-nums">
                  {sortedMembers.length} of {seatLimit} used
                  {pendingTeamInvites.length > 0 && ` · ${pendingTeamInvites.length} pending`}
                </span>
              </div>
              <div className="divide-y divide-brand-50">

                {/* Current members */}
                {sortedMembers.map((m, i) => (
                  <div key={m.id} className="flex items-start gap-4 px-5 py-4">
                    {/* Seat number */}
                    <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-brand-50 text-xs font-semibold text-brand-400 tabular-nums mt-0.5">
                      {i + 1}
                    </div>
                    {/* Badge */}
                    <div className="mt-0.5">
                      {m.role === "owner" ? (
                        <span className="inline-flex items-center gap-1 rounded-full bg-amber-50 px-2 py-0.5 text-xs font-semibold text-amber-600">
                          <Crown className="h-2.5 w-2.5" />Owner
                        </span>
                      ) : (
                        <span className="inline-flex rounded-full bg-brand-50 px-2 py-0.5 text-xs font-medium text-brand-500">Member</span>
                      )}
                    </div>
                    {/* User info */}
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 flex-wrap">
                        <Link href={`/admin/suitecompare/users/${m.user.id}`} className="text-sm font-medium text-brand-900 hover:text-accent">
                          {m.user.name}
                        </Link>
                        {m.user.id === user.id && (
                          <span className="text-xs text-brand-300">(this user)</span>
                        )}
                        {!m.user.emailVerified && (
                          <span className="inline-flex rounded-full bg-amber-50 px-2 py-0.5 text-xs font-medium text-amber-600">Unverified</span>
                        )}
                      </div>
                      <p className="text-xs text-brand-400 mt-0.5">{m.user.email}</p>
                    </div>
                    {/* Dates */}
                    <div className="text-right shrink-0 hidden sm:block">
                      <p className="text-xs text-brand-400">Joined {fmtDate(m.createdAt)}</p>
                      <p className="text-xs text-brand-300 mt-0.5">
                        {m.user.lastLoginAt ? `Last login ${fmtDate(m.user.lastLoginAt)}` : "Never logged in"}
                      </p>
                    </div>
                  </div>
                ))}

                {/* Pending team invites */}
                {pendingTeamInvites.map((inv, i) => (
                  <div key={inv.id} className="flex items-start gap-4 px-5 py-4 bg-amber-50/30">
                    <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-amber-50 text-xs font-semibold text-amber-500 tabular-nums mt-0.5">
                      {sortedMembers.length + i + 1}
                    </div>
                    <div className="mt-0.5">
                      <span className="inline-flex items-center gap-1 rounded-full bg-amber-50 border border-amber-100 px-2 py-0.5 text-xs font-medium text-amber-600">
                        <Clock className="h-2.5 w-2.5" />Invited
                      </span>
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-brand-700">{inv.email}</p>
                      <p className="text-xs text-brand-400 mt-0.5">Awaiting activation</p>
                    </div>
                    <div className="text-right shrink-0 hidden sm:block">
                      <p className="text-xs text-brand-400">Sent {fmtDate(inv.createdAt)}</p>
                      <p className="text-xs text-brand-300 mt-0.5">Expires {fmtDate(inv.expiresAt)}</p>
                    </div>
                  </div>
                ))}

                {/* Empty slots */}
                {Array.from({ length: emptySlotCount }).map((_, i) => (
                  <div key={`empty-${i}`} className="flex items-center gap-4 px-5 py-4 opacity-50">
                    <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full border border-dashed border-brand-200 text-xs font-semibold text-brand-300 tabular-nums">
                      {sortedMembers.length + pendingTeamInvites.length + i + 1}
                    </div>
                    <div>
                      <span className="inline-flex rounded-full border border-dashed border-brand-200 px-2 py-0.5 text-xs font-medium text-brand-300">Empty</span>
                    </div>
                    <p className="text-xs text-brand-300">No user assigned</p>
                  </div>
                ))}

                {seatLimit === 0 && (
                  <div className="px-5 py-4 text-sm text-brand-400">No seat limit configured.</div>
                )}
              </div>
            </div>
          </div>
        )}

        {/* Billing & Access — full width */}
        {org && (
          <div className="lg:col-span-2">
            <div className="bg-white rounded-2xl border border-brand-50 shadow-soft overflow-hidden">
              <div className="flex items-center gap-2.5 px-5 py-3.5 border-b border-brand-50 bg-brand-50/40">
                <span className="text-brand-400"><CreditCard className="h-4 w-4" /></span>
                <h2 className="text-sm font-semibold text-brand-900">Billing & Access</h2>
              </div>
              <div className="p-5 grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {/* Plan */}
                <div>
                  <p className="text-xs text-brand-400 mb-2">Plan</p>
                  <div className="flex items-center gap-1.5 flex-wrap">
                    {PLANS.map((p) => (
                      <form key={p} action={setOrgPlanAction}>
                        <input type="hidden" name="orgId" value={org.id} />
                        <input type="hidden" name="userId" value={user.id} />
                        <input type="hidden" name="plan" value={p} />
                        <button
                          type="submit"
                          className={`rounded-full px-3 py-1 text-xs font-medium border transition-colors capitalize ${
                            org.plan === p
                              ? "bg-accent text-white border-accent"
                              : "border-brand-100 text-brand-500 hover:border-brand-300 hover:text-brand-900"
                          }`}
                        >
                          {p.charAt(0).toUpperCase() + p.slice(1)}
                        </button>
                      </form>
                    ))}
                  </div>
                  <p className="mt-1.5 text-xs text-brand-300">Current: {planBadge(org.plan)}</p>
                </div>

                {/* Access */}
                <div>
                  <p className="text-xs text-brand-400 mb-2">Access</p>
                  <div className="flex items-center gap-1.5 flex-wrap">
                    {BILLING_STATUSES.map((s) => (
                      <form key={s} action={setOrgBillingStatusAction}>
                        <input type="hidden" name="orgId" value={org.id} />
                        <input type="hidden" name="userId" value={user.id} />
                        <input type="hidden" name="status" value={s} />
                        <button
                          type="submit"
                          className={`rounded-full px-3 py-1 text-xs font-medium border transition-colors ${
                            org.billingStatus === s
                              ? s === "suspended" ? "bg-red-500 text-white border-red-500"
                                : s === "past_due" ? "bg-amber-500 text-white border-amber-500"
                                : "bg-emerald-500 text-white border-emerald-500"
                              : "border-brand-100 text-brand-500 hover:border-brand-300 hover:text-brand-900"
                          }`}
                        >
                          {BILLING_LABELS[s]}
                        </button>
                      </form>
                    ))}
                  </div>
                  <p className="mt-1.5 text-xs text-brand-300">Current: {billingBadge(org.billingStatus)}</p>
                </div>

                {/* Seat limit */}
                <div>
                  <p className="text-xs text-brand-400 mb-1">User seats</p>
                  <p className="text-xs text-brand-300 mb-2">
                    Default: {getSeatLimit(org.plan)}.
                    {org.seatLimitOverride != null && <span className="ml-1 text-accent font-medium">Override: {org.seatLimitOverride}.</span>}
                  </p>
                  <div className="flex items-center gap-2 flex-wrap">
                    <form action={setSeatLimitOverrideAction} className="flex items-center gap-1.5">
                      <input type="hidden" name="orgId" value={org.id} />
                      <input type="hidden" name="userId" value={user.id} />
                      <input name="limit" type="number" min={1} max={500} defaultValue={org.seatLimitOverride ?? ""} placeholder="e.g. 10"
                        className="w-20 rounded-lg border border-brand-100 px-2.5 py-1.5 text-xs text-brand-900 focus:outline-none focus:ring-2 focus:ring-accent/30 focus:border-accent" />
                      <button type="submit" className="rounded-lg border border-brand-100 bg-white px-2.5 py-1.5 text-xs font-medium text-brand-600 hover:bg-brand-50 transition-colors">Set</button>
                    </form>
                    {org.seatLimitOverride != null && (
                      <form action={setSeatLimitOverrideAction}>
                        <input type="hidden" name="orgId" value={org.id} />
                        <input type="hidden" name="userId" value={user.id} />
                        <input type="hidden" name="limit" value="" />
                        <button type="submit" className="rounded-lg px-2.5 py-1.5 text-xs text-brand-400 hover:text-red-500 transition-colors">Clear</button>
                      </form>
                    )}
                  </div>
                </div>

                {/* Client limit */}
                <div>
                  <p className="text-xs text-brand-400 mb-1">NS accounts</p>
                  <p className="text-xs text-brand-300 mb-2">
                    Default: {getClientLimit(org.plan)}.
                    {org.clientLimitOverride != null && <span className="ml-1 text-accent font-medium">Override: {org.clientLimitOverride}.</span>}
                  </p>
                  <div className="flex items-center gap-2 flex-wrap">
                    <form action={setClientLimitOverrideAction} className="flex items-center gap-1.5">
                      <input type="hidden" name="orgId" value={org.id} />
                      <input type="hidden" name="userId" value={user.id} />
                      <input name="limit" type="number" min={1} max={200} defaultValue={org.clientLimitOverride ?? ""} placeholder="e.g. 5"
                        className="w-20 rounded-lg border border-brand-100 px-2.5 py-1.5 text-xs text-brand-900 focus:outline-none focus:ring-2 focus:ring-accent/30 focus:border-accent" />
                      <button type="submit" className="rounded-lg border border-brand-100 bg-white px-2.5 py-1.5 text-xs font-medium text-brand-600 hover:bg-brand-50 transition-colors">Set</button>
                    </form>
                    {org.clientLimitOverride != null && (
                      <form action={setClientLimitOverrideAction}>
                        <input type="hidden" name="orgId" value={org.id} />
                        <input type="hidden" name="userId" value={user.id} />
                        <input type="hidden" name="limit" value="" />
                        <button type="submit" className="rounded-lg px-2.5 py-1.5 text-xs text-brand-400 hover:text-red-500 transition-colors">Clear</button>
                      </form>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Environments */}
        {section("Environments", <Server className="h-4 w-4" />,
          accounts.length === 0 ? (
            <div className="flex items-center gap-2 text-sm text-amber-600">
              <AlertTriangle className="h-4 w-4 shrink-0" />
              No environments connected.
            </div>
          ) : (
            <div className="space-y-4">
              {accounts.map((acct) => (
                <div key={acct.id}>
                  <p className="text-xs font-semibold text-brand-700 mb-2">
                    {acct.name} <span className="text-brand-300 font-normal">({acct.nsAccountId})</span>
                  </p>
                  {acct.environments.length === 0 ? (
                    <p className="text-xs text-brand-300 pl-2">No environments.</p>
                  ) : (
                    <div className="space-y-2 pl-2">
                      {acct.environments.map((env) => {
                        const hasToken = hasCredentials(env);
                        const lastScript = env.scripts[0];
                        return (
                          <div key={env.id} className="flex items-start justify-between gap-3 rounded-lg border border-brand-50 bg-brand-50/40 px-3 py-2">
                            <div>
                              <p className="text-xs font-medium text-brand-800">{env.name} <span className="text-brand-400">({env.type})</span></p>
                              <p className="text-xs text-brand-400 mt-0.5">Last sync: {env.lastSyncAt ? fmtDate(env.lastSyncAt) : "Never"}</p>
                              {lastScript && <p className="text-xs text-brand-300 mt-0.5">Last script browsed: {fmtDate(lastScript.browsedAt)}</p>}
                            </div>
                            {hasToken ? (
                              <span className="inline-flex items-center gap-1 rounded-full bg-emerald-50 px-2 py-0.5 text-xs text-emerald-600 shrink-0">
                                <CheckCircle2 className="h-3 w-3" />Token OK
                              </span>
                            ) : (
                              <span className="inline-flex items-center gap-1 rounded-full bg-red-50 px-2 py-0.5 text-xs text-red-500 shrink-0">
                                <AlertTriangle className="h-3 w-3" />No token
                              </span>
                            )}
                          </div>
                        );
                      })}
                    </div>
                  )}
                </div>
              ))}
            </div>
          )
        )}

        {/* Usage */}
        {section("Usage", <Clock className="h-4 w-4" />,
          <div>
            {row("Total comparisons", comparisonsTotal)}
            {row("Last comparison", fmt(lastComparison?.createdAt))}
            {row("Scripts browsed", allEnvs.reduce((sum, e) => sum + e.scripts.length, 0))}
            {recentComparisons.length > 0 && (
              <div className="mt-4">
                <p className="text-xs font-semibold text-brand-400 uppercase tracking-wide mb-2">Recent</p>
                <div className="space-y-1.5">
                  {recentComparisons.map((c) => (
                    <div key={c.id} className="flex items-center justify-between rounded-lg bg-brand-50/60 px-3 py-1.5">
                      <span className="text-xs text-brand-600 truncate max-w-[120px]">{c.scriptId}</span>
                      <div className="flex items-center gap-2 shrink-0">
                        {c.status === "failed"
                          ? <span className="text-xs text-red-500">Failed</span>
                          : <span className="text-xs text-emerald-600">OK</span>}
                        <span className="text-xs text-brand-300">{fmtDate(c.createdAt)}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

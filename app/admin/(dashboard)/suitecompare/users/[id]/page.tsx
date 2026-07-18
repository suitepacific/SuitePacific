import { requireAdmin } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { notFound } from "next/navigation";
import Link from "next/link";
import { AlertTriangle, CheckCircle2, Clock, User, Building2, Server, CreditCard } from "lucide-react";
import { getSeatLimit } from "@/lib/sc-plans";
import {
  setOrgPlanAction,
  setOrgBillingStatusAction,
  setSeatLimitOverrideAction,
} from "./actions";

function fmt(d: Date | null | undefined) {
  if (!d) return "—";
  return d.toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric", hour: "2-digit", minute: "2-digit" });
}

function toFlag(code: string): string {
  return [...code.toUpperCase()].map((c) => String.fromCodePoint(0x1f1e6 + c.charCodeAt(0) - 65)).join("");
}

function fmtDate(d: Date | null | undefined) {
  if (!d) return "—";
  return d.toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" });
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

  const [comparisonsTotal, recentComparisons] = await Promise.all([
    prisma.scComparison.count({ where: { userId: id } }),
    prisma.scComparison.findMany({
      where: { userId: id },
      orderBy: { createdAt: "desc" },
      take: 10,
    }),
  ]);

  const lastComparison = recentComparisons[0];
  const hasFailure = recentComparisons.some((c) => c.status === "failed");
  const noEnv = accounts.length === 0;
  const isSuspended = org?.billingStatus === "suspended";

  function section(title: string, icon: React.ReactNode, children: React.ReactNode) {
    return (
      <div className="bg-white rounded-2xl border border-brand-50 shadow-soft overflow-hidden">
        <div className="flex items-center gap-2.5 px-5 py-3.5 border-b border-brand-50 bg-brand-50/40">
          <span className="text-brand-400">{icon}</span>
          <h2 className="text-sm font-semibold text-brand-900">{title}</h2>
        </div>
        <div className="p-5">{children}</div>
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

  const PLANS = ["free", "pro", "team"] as const;
  const BILLING_STATUSES = ["active", "past_due", "suspended"] as const;
  const BILLING_LABELS: Record<string, string> = { active: "Active", past_due: "Past Due", suspended: "Suspended" };

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
            {row("Name", user.name)}
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
          </div>
        )}

        {/* Org */}
        {section("Organization", <Building2 className="h-4 w-4" />,
          org ? (
            <div>
              {row("Name", org.name)}
              {row("Role", membership.role)}
              {row("Members", (
                <Link href={`/admin/suitecompare/users?q=${encodeURIComponent(org.name)}`} className="text-accent hover:underline text-xs">
                  View all
                </Link>
              ))}
            </div>
          ) : (
            <p className="text-sm text-brand-400">No organization.</p>
          )
        )}

        {/* Billing & Access */}
        {org && section("Billing & Access", <CreditCard className="h-4 w-4" />,
          <div className="space-y-5">
            {/* Plan */}
            <div>
              <p className="text-xs text-brand-400 mb-2">Plan</p>
              <div className="flex items-center gap-2 flex-wrap">
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
              <p className="mt-1.5 text-xs text-brand-300">Currently: {planBadge(org.plan)}</p>
            </div>

            {/* Billing status */}
            <div>
              <p className="text-xs text-brand-400 mb-2">Access</p>
              <div className="flex items-center gap-2 flex-wrap">
                {BILLING_STATUSES.map((s) => (
                  <form key={s} action={setOrgBillingStatusAction}>
                    <input type="hidden" name="orgId" value={org.id} />
                    <input type="hidden" name="userId" value={user.id} />
                    <input type="hidden" name="status" value={s} />
                    <button
                      type="submit"
                      className={`rounded-full px-3 py-1 text-xs font-medium border transition-colors ${
                        org.billingStatus === s
                          ? s === "suspended"
                            ? "bg-red-500 text-white border-red-500"
                            : s === "past_due"
                            ? "bg-amber-500 text-white border-amber-500"
                            : "bg-emerald-500 text-white border-emerald-500"
                          : "border-brand-100 text-brand-500 hover:border-brand-300 hover:text-brand-900"
                      }`}
                    >
                      {BILLING_LABELS[s]}
                    </button>
                  </form>
                ))}
              </div>
              <p className="mt-1.5 text-xs text-brand-300">Currently: {billingBadge(org.billingStatus)}</p>
            </div>

            {/* Seat limit override */}
            <div>
              <p className="text-xs text-brand-400 mb-1">Seat limit</p>
              <p className="text-xs text-brand-300 mb-2">
                Default for {org.plan}: {getSeatLimit(org.plan)} seats.
                {org.seatLimitOverride != null && (
                  <span className="ml-1 text-accent font-medium">Override active: {org.seatLimitOverride} seats.</span>
                )}
              </p>
              <div className="flex items-center gap-2 flex-wrap">
                <form action={setSeatLimitOverrideAction} className="flex items-center gap-2">
                  <input type="hidden" name="orgId" value={org.id} />
                  <input type="hidden" name="userId" value={user.id} />
                  <input
                    name="limit"
                    type="number"
                    min={1}
                    max={500}
                    defaultValue={org.seatLimitOverride ?? ""}
                    placeholder="e.g. 10"
                    className="w-24 rounded-lg border border-brand-100 px-3 py-1.5 text-xs text-brand-900 focus:outline-none focus:ring-2 focus:ring-accent/30 focus:border-accent"
                  />
                  <button
                    type="submit"
                    className="rounded-lg border border-brand-100 bg-white px-3 py-1.5 text-xs font-medium text-brand-600 hover:bg-brand-50 transition-colors"
                  >
                    Set
                  </button>
                </form>
                {org.seatLimitOverride != null && (
                  <form action={setSeatLimitOverrideAction}>
                    <input type="hidden" name="orgId" value={org.id} />
                    <input type="hidden" name="userId" value={user.id} />
                    <input type="hidden" name="limit" value="" />
                    <button
                      type="submit"
                      className="rounded-lg px-3 py-1.5 text-xs text-brand-400 hover:text-red-500 transition-colors"
                    >
                      Clear override
                    </button>
                  </form>
                )}
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
                        const hasToken = !!(env.tokenKey && env.tokenSecret);
                        const lastScript = env.scripts[0];
                        return (
                          <div key={env.id} className="flex items-start justify-between gap-3 rounded-lg border border-brand-50 bg-brand-50/40 px-3 py-2">
                            <div>
                              <p className="text-xs font-medium text-brand-800">
                                {env.name} <span className="text-brand-400">({env.type})</span>
                              </p>
                              <p className="text-xs text-brand-400 mt-0.5">
                                Last sync: {env.lastSyncAt ? fmtDate(env.lastSyncAt) : "Never"}
                              </p>
                              {lastScript && (
                                <p className="text-xs text-brand-300 mt-0.5">
                                  Last script browsed: {fmtDate(lastScript.browsedAt)}
                                </p>
                              )}
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
                <p className="text-xs font-semibold text-brand-400 uppercase tracking-wide mb-2">Recent comparisons</p>
                <div className="space-y-1.5">
                  {recentComparisons.map((c) => (
                    <div key={c.id} className="flex items-center justify-between rounded-lg bg-brand-50/60 px-3 py-1.5">
                      <span className="text-xs text-brand-600">{c.scriptId}</span>
                      <div className="flex items-center gap-2">
                        {c.status === "failed" ? (
                          <span className="text-xs text-red-500">Failed</span>
                        ) : (
                          <span className="text-xs text-emerald-600">OK</span>
                        )}
                        <span className="text-xs text-brand-300">{fmt(c.createdAt)}</span>
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

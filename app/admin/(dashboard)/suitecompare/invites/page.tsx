import { requireAdmin } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import Link from "next/link";
import { SendInviteForm } from "./SendInviteForm";
import { cancelAdminInviteAction, resendAdminInviteAction } from "./actions";
import { CheckCircle2, Clock, XCircle, RefreshCw, Trash2 } from "lucide-react";

function fmtDate(d: Date) {
  return d.toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" });
}

function planBadge(plan: string) {
  if (plan === "pro") return <span className="inline-flex rounded-full bg-blue-50 px-2 py-0.5 text-xs font-semibold text-blue-600">Pro</span>;
  if (plan === "team") return <span className="inline-flex rounded-full bg-violet-50 px-2 py-0.5 text-xs font-semibold text-violet-600">Team</span>;
  return <span className="inline-flex rounded-full bg-brand-50 px-2 py-0.5 text-xs font-medium text-brand-400">Free</span>;
}

function adminStatusBadge(invite: { activatedAt: Date | null; expiresAt: Date }) {
  if (invite.activatedAt) return <span className="inline-flex items-center gap-1 rounded-full bg-emerald-50 px-2.5 py-1 text-xs font-medium text-emerald-600"><CheckCircle2 className="h-3 w-3" />Activated</span>;
  if (invite.expiresAt < new Date()) return <span className="inline-flex items-center gap-1 rounded-full bg-brand-50 px-2.5 py-1 text-xs font-medium text-brand-400"><XCircle className="h-3 w-3" />Expired</span>;
  return <span className="inline-flex items-center gap-1 rounded-full bg-amber-50 px-2.5 py-1 text-xs font-medium text-amber-600"><Clock className="h-3 w-3" />Pending</span>;
}

function teamStatusBadge(invite: { usedAt: Date | null; expiresAt: Date }) {
  if (invite.usedAt) return <span className="inline-flex items-center gap-1 rounded-full bg-emerald-50 px-2.5 py-1 text-xs font-medium text-emerald-600"><CheckCircle2 className="h-3 w-3" />Accepted</span>;
  if (invite.expiresAt < new Date()) return <span className="inline-flex items-center gap-1 rounded-full bg-brand-50 px-2.5 py-1 text-xs font-medium text-brand-400"><XCircle className="h-3 w-3" />Expired</span>;
  return <span className="inline-flex items-center gap-1 rounded-full bg-amber-50 px-2.5 py-1 text-xs font-medium text-amber-600"><Clock className="h-3 w-3" />Pending</span>;
}

export default async function InvitesPage() {
  await requireAdmin();

  const now = new Date();

  const [adminInvites, teamInvites] = await Promise.all([
    prisma.scAdminInvite.findMany({ orderBy: { sentAt: "desc" }, take: 50 }),
    prisma.scInvite.findMany({
      orderBy: { createdAt: "desc" },
      take: 50,
      include: {
        org: { select: { id: true, name: true, plan: true } },
      },
    }),
  ]);

  // Fetch activated user details for admin invites
  const activatedUserIds = adminInvites.filter((i) => i.userId).map((i) => i.userId!);
  const activatedUsers =
    activatedUserIds.length > 0
      ? await prisma.scUser.findMany({
          where: { id: { in: activatedUserIds } },
          select: { id: true, name: true, lastLoginAt: true },
        })
      : [];
  const activatedUserMap = Object.fromEntries(activatedUsers.map((u) => [u.id, u]));

  // Fetch inviter details for team invites
  const inviterIds = [...new Set(teamInvites.map((i) => i.createdBy))];
  const inviters =
    inviterIds.length > 0
      ? await prisma.scUser.findMany({
          where: { id: { in: inviterIds } },
          select: { id: true, name: true, email: true },
        })
      : [];
  const inviterMap = Object.fromEntries(inviters.map((u) => [u.id, u]));

  // Admin invite stats
  const adminPending = adminInvites.filter((i) => !i.activatedAt && i.expiresAt >= now).length;
  const adminActivated = adminInvites.filter((i) => !!i.activatedAt).length;
  const adminExpired = adminInvites.filter((i) => !i.activatedAt && i.expiresAt < now).length;

  // Team invite stats
  const teamPending = teamInvites.filter((i) => !i.usedAt && i.expiresAt >= now).length;
  const teamAccepted = teamInvites.filter((i) => !!i.usedAt).length;

  return (
    <div className="space-y-10">
      {/* ── Customer invites ─────────────────────────── */}
      <section className="space-y-6">
        <div>
          <h2 className="text-base font-semibold text-brand-900">Customer invites</h2>
          <p className="text-xs text-brand-400 mt-0.5">Onboard a new customer with a custom plan, seat count, and client limit.</p>
        </div>

        {/* Send form */}
        <div className="bg-white rounded-2xl border border-brand-50 shadow-soft overflow-hidden">
          <div className="px-6 py-4 border-b border-brand-50 bg-brand-50/40">
            <h3 className="text-sm font-semibold text-brand-900">Send invitation</h3>
          </div>
          <div className="p-6">
            <SendInviteForm />
          </div>
        </div>

        {/* Stats */}
        {adminInvites.length > 0 && (
          <div className="grid grid-cols-3 gap-4">
            {[
              { label: "Pending", value: adminPending, color: "text-amber-600" },
              { label: "Activated", value: adminActivated, color: "text-emerald-600" },
              { label: "Expired", value: adminExpired, color: "text-brand-400" },
            ].map((s) => (
              <div key={s.label} className="bg-white rounded-2xl border border-brand-50 shadow-soft px-5 py-4 text-center">
                <p className={`text-2xl font-bold tabular-nums ${s.color}`}>{s.value}</p>
                <p className="text-xs text-brand-400 mt-1">{s.label}</p>
              </div>
            ))}
          </div>
        )}

        {/* Table */}
        {adminInvites.length > 0 ? (
          <div className="bg-white rounded-2xl border border-brand-50 shadow-soft overflow-hidden">
            <div className="px-6 py-4 border-b border-brand-50 bg-brand-50/40 flex items-center justify-between">
              <h3 className="text-sm font-semibold text-brand-900">All customer invites</h3>
              <span className="text-xs text-brand-400">{adminInvites.length} total</span>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-brand-50">
                    <th className="text-left px-5 py-3 text-xs font-semibold text-brand-400 uppercase tracking-wide">Recipient</th>
                    <th className="text-left px-5 py-3 text-xs font-semibold text-brand-400 uppercase tracking-wide">Plan</th>
                    <th className="text-left px-5 py-3 text-xs font-semibold text-brand-400 uppercase tracking-wide">Seats</th>
                    <th className="text-left px-5 py-3 text-xs font-semibold text-brand-400 uppercase tracking-wide">Clients</th>
                    <th className="text-left px-5 py-3 text-xs font-semibold text-brand-400 uppercase tracking-wide">Payment</th>
                    <th className="text-left px-5 py-3 text-xs font-semibold text-brand-400 uppercase tracking-wide">Sent</th>
                    <th className="text-left px-5 py-3 text-xs font-semibold text-brand-400 uppercase tracking-wide">Status</th>
                    <th className="text-left px-5 py-3 text-xs font-semibold text-brand-400 uppercase tracking-wide">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-brand-50">
                  {adminInvites.map((invite) => {
                    const isPending = !invite.activatedAt && invite.expiresAt >= now;
                    const activatedUser = invite.userId ? activatedUserMap[invite.userId] : null;
                    return (
                      <tr key={invite.id} className="hover:bg-brand-50/40 transition-colors">
                        <td className="px-5 py-3.5">
                          <p className="font-medium text-brand-900">{invite.name ?? invite.email}</p>
                          {invite.name && <p className="text-xs text-brand-400 mt-0.5">{invite.email}</p>}
                          {invite.notes && <p className="text-xs text-brand-300 mt-0.5 italic truncate max-w-48">{invite.notes}</p>}
                          {activatedUser && (
                            <Link href={`/admin/suitecompare/users/${activatedUser.id}`} className="text-xs text-accent hover:underline mt-0.5 block">
                              View user →
                            </Link>
                          )}
                        </td>
                        <td className="px-5 py-3.5">{planBadge(invite.plan)}</td>
                        <td className="px-5 py-3.5 text-brand-600 text-xs tabular-nums">{invite.seatLimit}</td>
                        <td className="px-5 py-3.5 text-brand-600 text-xs tabular-nums">{invite.clientLimit}</td>
                        <td className="px-5 py-3.5">
                          {invite.requirePayment
                            ? <span className="text-xs text-amber-600 font-medium">Required</span>
                            : <span className="text-xs text-emerald-600 font-medium">Free</span>}
                        </td>
                        <td className="px-5 py-3.5 text-brand-400 text-xs whitespace-nowrap">{fmtDate(invite.sentAt)}</td>
                        <td className="px-5 py-3.5">
                          {adminStatusBadge(invite)}
                          {invite.activatedAt && <p className="text-xs text-brand-300 mt-1">{fmtDate(invite.activatedAt)}</p>}
                          {activatedUser?.lastLoginAt && <p className="text-xs text-brand-300">Last login: {fmtDate(activatedUser.lastLoginAt)}</p>}
                        </td>
                        <td className="px-5 py-3.5">
                          {isPending && (
                            <div className="flex items-center gap-1">
                              <form action={resendAdminInviteAction}>
                                <input type="hidden" name="id" value={invite.id} />
                                <button type="submit" className="inline-flex items-center gap-1 rounded-lg px-2.5 py-1.5 text-xs text-brand-500 hover:bg-brand-50 hover:text-brand-900 transition-colors">
                                  <RefreshCw className="h-3 w-3" />Resend
                                </button>
                              </form>
                              <form action={cancelAdminInviteAction}>
                                <input type="hidden" name="id" value={invite.id} />
                                <button type="submit" className="inline-flex items-center gap-1 rounded-lg px-2.5 py-1.5 text-xs text-brand-400 hover:bg-red-50 hover:text-red-500 transition-colors">
                                  <Trash2 className="h-3 w-3" />Cancel
                                </button>
                              </form>
                            </div>
                          )}
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        ) : (
          <div className="rounded-2xl border border-brand-50 bg-white shadow-soft px-8 py-12 text-center">
            <p className="text-sm font-semibold text-brand-900">No customer invites yet</p>
            <p className="text-xs text-brand-400 mt-1">Use the form above to invite a customer.</p>
          </div>
        )}
      </section>

      {/* ── Team invites ─────────────────────────────── */}
      <section className="space-y-4">
        <div>
          <h2 className="text-base font-semibold text-brand-900">Team invites</h2>
          <p className="text-xs text-brand-400 mt-0.5">Invites sent by org owners to add team members to their orgs.</p>
        </div>

        {teamInvites.length > 0 && (
          <div className="grid grid-cols-2 gap-4 max-w-xs">
            {[
              { label: "Pending", value: teamPending, color: "text-amber-600" },
              { label: "Accepted", value: teamAccepted, color: "text-emerald-600" },
            ].map((s) => (
              <div key={s.label} className="bg-white rounded-2xl border border-brand-50 shadow-soft px-5 py-4 text-center">
                <p className={`text-2xl font-bold tabular-nums ${s.color}`}>{s.value}</p>
                <p className="text-xs text-brand-400 mt-1">{s.label}</p>
              </div>
            ))}
          </div>
        )}

        {teamInvites.length > 0 ? (
          <div className="bg-white rounded-2xl border border-brand-50 shadow-soft overflow-hidden">
            <div className="px-6 py-4 border-b border-brand-50 bg-brand-50/40 flex items-center justify-between">
              <h3 className="text-sm font-semibold text-brand-900">All team invites</h3>
              <span className="text-xs text-brand-400">{teamInvites.length} total</span>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-brand-50">
                    <th className="text-left px-5 py-3 text-xs font-semibold text-brand-400 uppercase tracking-wide">Invited email</th>
                    <th className="text-left px-5 py-3 text-xs font-semibold text-brand-400 uppercase tracking-wide">Organization</th>
                    <th className="text-left px-5 py-3 text-xs font-semibold text-brand-400 uppercase tracking-wide">Invited by</th>
                    <th className="text-left px-5 py-3 text-xs font-semibold text-brand-400 uppercase tracking-wide">Sent</th>
                    <th className="text-left px-5 py-3 text-xs font-semibold text-brand-400 uppercase tracking-wide">Expires</th>
                    <th className="text-left px-5 py-3 text-xs font-semibold text-brand-400 uppercase tracking-wide">Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-brand-50">
                  {teamInvites.map((invite) => {
                    const inviter = inviterMap[invite.createdBy];
                    return (
                      <tr key={invite.id} className="hover:bg-brand-50/40 transition-colors">
                        <td className="px-5 py-3.5 font-medium text-brand-900">{invite.email}</td>
                        <td className="px-5 py-3.5">
                          <p className="text-brand-700">{invite.org.name}</p>
                          <p className="text-xs text-brand-400 mt-0.5">{planBadge(invite.org.plan)}</p>
                        </td>
                        <td className="px-5 py-3.5">
                          {inviter ? (
                            <>
                              <Link href={`/admin/suitecompare/users/${inviter.id}`} className="text-brand-700 hover:text-accent text-sm">
                                {inviter.name}
                              </Link>
                              <p className="text-xs text-brand-400 mt-0.5">{inviter.email}</p>
                            </>
                          ) : (
                            <span className="text-brand-300 text-xs">—</span>
                          )}
                        </td>
                        <td className="px-5 py-3.5 text-brand-400 text-xs whitespace-nowrap">{fmtDate(invite.createdAt)}</td>
                        <td className="px-5 py-3.5 text-brand-400 text-xs whitespace-nowrap">{fmtDate(invite.expiresAt)}</td>
                        <td className="px-5 py-3.5">
                          {teamStatusBadge(invite)}
                          {invite.usedAt && <p className="text-xs text-brand-300 mt-1">Accepted {fmtDate(invite.usedAt)}</p>}
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        ) : (
          <div className="rounded-2xl border border-brand-50 bg-white shadow-soft px-8 py-12 text-center">
            <p className="text-sm text-brand-400">No team invites have been sent yet.</p>
          </div>
        )}
      </section>
    </div>
  );
}

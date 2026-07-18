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

function statusBadge(invite: { activatedAt: Date | null; expiresAt: Date }) {
  if (invite.activatedAt) return <span className="inline-flex items-center gap-1 rounded-full bg-emerald-50 px-2.5 py-1 text-xs font-medium text-emerald-600"><CheckCircle2 className="h-3 w-3" />Activated</span>;
  if (invite.expiresAt < new Date()) return <span className="inline-flex items-center gap-1 rounded-full bg-brand-50 px-2.5 py-1 text-xs font-medium text-brand-400"><XCircle className="h-3 w-3" />Expired</span>;
  return <span className="inline-flex items-center gap-1 rounded-full bg-amber-50 px-2.5 py-1 text-xs font-medium text-amber-600"><Clock className="h-3 w-3" />Pending</span>;
}

export default async function InvitesPage() {
  await requireAdmin();

  const invites = await prisma.scAdminInvite.findMany({
    orderBy: { sentAt: "desc" },
  });

  const activatedUserIds = invites.filter((i) => i.userId).map((i) => i.userId!);
  const activatedUsers =
    activatedUserIds.length > 0
      ? await prisma.scUser.findMany({
          where: { id: { in: activatedUserIds } },
          select: { id: true, name: true, lastLoginAt: true },
        })
      : [];
  const userMap = Object.fromEntries(activatedUsers.map((u) => [u.id, u]));

  const now = new Date();
  const pending = invites.filter((i) => !i.activatedAt && i.expiresAt >= now).length;
  const activated = invites.filter((i) => !!i.activatedAt).length;
  const expired = invites.filter((i) => !i.activatedAt && i.expiresAt < now).length;

  return (
    <div className="space-y-8">
      {/* Send form */}
      <div className="bg-white rounded-2xl border border-brand-50 shadow-soft overflow-hidden">
        <div className="px-6 py-4 border-b border-brand-50 bg-brand-50/40">
          <h2 className="text-sm font-semibold text-brand-900">Send invitation</h2>
          <p className="text-xs text-brand-400 mt-0.5">The recipient gets an email with an activation link and account details.</p>
        </div>
        <div className="p-6">
          <SendInviteForm />
        </div>
      </div>

      {/* Stats row */}
      {invites.length > 0 && (
        <div className="grid grid-cols-3 gap-4">
          {[
            { label: "Pending", value: pending, color: "text-amber-600" },
            { label: "Activated", value: activated, color: "text-emerald-600" },
            { label: "Expired", value: expired, color: "text-brand-400" },
          ].map((s) => (
            <div key={s.label} className="bg-white rounded-2xl border border-brand-50 shadow-soft px-5 py-4 text-center">
              <p className={`text-2xl font-bold tabular-nums ${s.color}`}>{s.value}</p>
              <p className="text-xs text-brand-400 mt-1">{s.label}</p>
            </div>
          ))}
        </div>
      )}

      {/* Invites table */}
      {invites.length > 0 && (
        <div className="bg-white rounded-2xl border border-brand-50 shadow-soft overflow-hidden">
          <div className="px-6 py-4 border-b border-brand-50 bg-brand-50/40 flex items-center justify-between">
            <h2 className="text-sm font-semibold text-brand-900">All invites</h2>
            <span className="text-xs text-brand-400">{invites.length} total</span>
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
                {invites.map((invite) => {
                  const isPending = !invite.activatedAt && invite.expiresAt >= now;
                  const activatedUser = invite.userId ? userMap[invite.userId] : null;

                  return (
                    <tr key={invite.id} className="hover:bg-brand-50/40 transition-colors">
                      <td className="px-5 py-3.5">
                        <p className="font-medium text-brand-900">{invite.name ?? invite.email}</p>
                        {invite.name && <p className="text-xs text-brand-400 mt-0.5">{invite.email}</p>}
                        {invite.notes && (
                          <p className="text-xs text-brand-300 mt-0.5 italic truncate max-w-48">{invite.notes}</p>
                        )}
                        {activatedUser && (
                          <Link
                            href={`/admin/suitecompare/users/${activatedUser.id}`}
                            className="text-xs text-accent hover:underline mt-0.5 block"
                          >
                            View user →
                          </Link>
                        )}
                      </td>
                      <td className="px-5 py-3.5">{planBadge(invite.plan)}</td>
                      <td className="px-5 py-3.5 text-brand-600 text-xs tabular-nums">{invite.seatLimit}</td>
                      <td className="px-5 py-3.5 text-brand-600 text-xs tabular-nums">{invite.clientLimit}</td>
                      <td className="px-5 py-3.5">
                        {invite.requirePayment ? (
                          <span className="text-xs text-amber-600 font-medium">Required</span>
                        ) : (
                          <span className="text-xs text-emerald-600 font-medium">Free</span>
                        )}
                      </td>
                      <td className="px-5 py-3.5 text-brand-400 text-xs whitespace-nowrap">{fmtDate(invite.sentAt)}</td>
                      <td className="px-5 py-3.5">
                        {statusBadge(invite)}
                        {invite.activatedAt && (
                          <p className="text-xs text-brand-300 mt-1">{fmtDate(invite.activatedAt)}</p>
                        )}
                        {activatedUser?.lastLoginAt && (
                          <p className="text-xs text-brand-300">Last login: {fmtDate(activatedUser.lastLoginAt)}</p>
                        )}
                      </td>
                      <td className="px-5 py-3.5">
                        {isPending && (
                          <div className="flex items-center gap-1">
                            <form action={resendAdminInviteAction}>
                              <input type="hidden" name="id" value={invite.id} />
                              <button
                                type="submit"
                                title="Resend invite"
                                className="inline-flex items-center gap-1 rounded-lg px-2.5 py-1.5 text-xs text-brand-500 hover:bg-brand-50 hover:text-brand-900 transition-colors"
                              >
                                <RefreshCw className="h-3 w-3" />
                                Resend
                              </button>
                            </form>
                            <form action={cancelAdminInviteAction}>
                              <input type="hidden" name="id" value={invite.id} />
                              <button
                                type="submit"
                                title="Cancel invite"
                                className="inline-flex items-center gap-1 rounded-lg px-2.5 py-1.5 text-xs text-brand-400 hover:bg-red-50 hover:text-red-500 transition-colors"
                              >
                                <Trash2 className="h-3 w-3" />
                                Cancel
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
      )}

      {invites.length === 0 && (
        <div className="rounded-2xl border border-brand-50 bg-white shadow-soft px-8 py-16 text-center">
          <p className="text-sm font-semibold text-brand-900">No invites sent yet</p>
          <p className="text-xs text-brand-400 mt-1">Use the form above to invite a partner.</p>
        </div>
      )}
    </div>
  );
}

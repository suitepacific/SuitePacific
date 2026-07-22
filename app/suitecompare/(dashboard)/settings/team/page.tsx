import { redirect } from "next/navigation";
import { requireScUser } from "@/lib/sc-auth";
import { prisma } from "@/lib/prisma";
import { InviteForm } from "./InviteForm";
import { OrgNameForm } from "./OrgNameForm";
import { RemoveMemberButton, CancelInviteButton } from "./TeamActions";
import { Users, Mail, Crown } from "lucide-react";
import { getSeatLimit } from "@/lib/sc-plans";

export default async function TeamSettingsPage() {
  const currentUser = await requireScUser();

  const membership = await prisma.scOrgMember.findFirst({
    where: { userId: currentUser.id },
    orderBy: { createdAt: "asc" },
    include: {
      org: {
        include: {
          members: { include: { user: true }, orderBy: { createdAt: "asc" } },
          invites: {
            where: { usedAt: null, expiresAt: { gt: new Date() } },
            orderBy: { createdAt: "desc" },
          },
        },
      },
    },
  });

  if (!membership) redirect("/suitecompare/dashboard");

  const { org } = membership;
  const isOwner = membership.role === "owner";
  const seatLimit = getSeatLimit(org.plan, org.seatLimitOverride);
  const usedSeats = org.members.length;

  return (
    <div>
      <p className="text-sm text-brand-400 mb-6">
        Manage members and invitations for <span className="font-medium text-brand-700">{org.name}</span>.
      </p>

      {/* Organization name (owner only) */}
      {isOwner && <OrgNameForm currentName={org.name} />}

      {/* Seat usage */}
      <div className="mb-6 flex items-center gap-3 rounded-xl border border-brand-100 bg-white px-4 py-3">
        <Users className="h-4 w-4 text-brand-300 shrink-0" />
        <span className="text-sm text-brand-600">
          {usedSeats} of {seatLimit} seat{seatLimit !== 1 ? "s" : ""} used
          {org.plan !== "team" && !org.seatLimitOverride && (
            <span className="ml-2 text-brand-300">
              &middot; Upgrade to Team for up to 5 seats
            </span>
          )}
        </span>
      </div>

      {/* Invite form (owners only, if seats available) */}
      {isOwner && usedSeats < seatLimit && (
        <div className="mb-6 rounded-xl border border-brand-100 bg-white p-5">
          <p className="text-sm font-medium text-brand-700 mb-3">Invite a team member</p>
          <div className="relative">
            <InviteForm />
          </div>
        </div>
      )}

      {isOwner && usedSeats >= seatLimit && (
        <div className="mb-6 rounded-xl border border-brand-100 bg-brand-50/60 px-4 py-3 text-sm text-brand-500">
          {org.seatLimitOverride
            ? "You've reached your seat limit. Contact your account manager to add more members."
            : org.plan !== "team"
            ? "You've reached the seat limit for your plan. Upgrade to Team to invite more members."
            : "You've reached the 5-seat limit for the Team plan. Contact us if you need more."}
        </div>
      )}

      {/* Current members */}
      <section className="mb-6">
        <h2 className="text-xs font-semibold uppercase tracking-wider text-brand-400 mb-3">
          Members ({usedSeats})
        </h2>
        <div className="rounded-xl border border-brand-100 bg-white divide-y divide-brand-50 overflow-hidden">
          {org.members.map((m) => {
            const isSelf = m.userId === currentUser.id;
            return (
              <div key={m.id} className="flex items-center justify-between px-4 py-3">
                <div className="flex items-center gap-3 min-w-0">
                  <div className="h-8 w-8 shrink-0 rounded-full bg-accent/10 flex items-center justify-center text-accent font-semibold text-xs uppercase">
                    {m.user.name.slice(0, 2)}
                  </div>
                  <div className="min-w-0">
                    <p className="text-sm font-medium text-brand-900 truncate">
                      {m.user.name}
                      {isSelf && (
                        <span className="ml-2 text-xs text-brand-300">(you)</span>
                      )}
                    </p>
                    <p className="text-xs text-brand-400 truncate">{m.user.email}</p>
                  </div>
                </div>
                <div className="flex items-center gap-2 shrink-0 ml-4">
                  {m.role === "owner" && (
                    <span className="flex items-center gap-1 rounded-full bg-amber-50 px-2.5 py-0.5 text-xs font-medium text-amber-600">
                      <Crown className="h-3 w-3" /> Owner
                    </span>
                  )}
                  {isOwner && !isSelf && (
                    <RemoveMemberButton memberId={m.id} memberName={m.user.name} />
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* Pending invites */}
      {isOwner && org.invites.length > 0 && (
        <section>
          <h2 className="text-xs font-semibold uppercase tracking-wider text-brand-400 mb-3">
            Pending invitations ({org.invites.length})
          </h2>
          <div className="rounded-xl border border-brand-100 bg-white divide-y divide-brand-50 overflow-hidden">
            {org.invites.map((inv) => (
              <div key={inv.id} className="flex items-center justify-between px-4 py-3">
                <div className="flex items-center gap-3 min-w-0">
                  <div className="h-8 w-8 shrink-0 rounded-full bg-brand-50 flex items-center justify-center">
                    <Mail className="h-3.5 w-3.5 text-brand-300" />
                  </div>
                  <div className="min-w-0">
                    <p className="text-sm text-brand-700 truncate">{inv.email}</p>
                    <p className="text-xs text-brand-300">
                      Expires {inv.expiresAt.toLocaleDateString()}
                    </p>
                  </div>
                </div>
                <CancelInviteButton inviteId={inv.id} email={inv.email} />
              </div>
            ))}
          </div>
        </section>
      )}
    </div>
  );
}

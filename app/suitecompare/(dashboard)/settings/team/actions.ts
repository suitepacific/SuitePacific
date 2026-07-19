"use server";

import { prisma } from "@/lib/prisma";
import { requireScUser } from "@/lib/sc-auth";
import { sendInviteEmail } from "@/lib/sc-email";
import { getSeatLimit } from "@/lib/sc-plans";
import { revalidatePath } from "next/cache";
import crypto from "crypto";

export async function inviteMemberAction(
  _prev: unknown,
  formData: FormData
): Promise<{ error?: string; success?: boolean }> {
  const user = await requireScUser();
  const email = String(formData.get("email") ?? "").toLowerCase().trim();

  if (!email) return { error: "Email is required." };
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) return { error: "Please enter a valid email address." };
  if (email === user.email) return { error: "You cannot invite yourself." };

  const membership = await prisma.scOrgMember.findFirst({
    where: { userId: user.id, role: "owner" },
    include: {
      org: { include: { members: true } },
    },
  });
  if (!membership) return { error: "Only org owners can invite members." };

  const seatLimit = getSeatLimit(membership.org.plan, membership.org.seatLimitOverride);
  if (membership.org.members.length >= seatLimit) {
    return {
      error: `Your ${membership.org.plan} plan supports up to ${seatLimit} user${seatLimit === 1 ? "" : "s"}. Upgrade to Team to add more.`,
    };
  }

  // Check not already a member
  const existingUser = await prisma.scUser.findUnique({ where: { email } });
  if (existingUser) {
    const alreadyMember = await prisma.scOrgMember.findFirst({
      where: { userId: existingUser.id, orgId: membership.orgId },
    });
    if (alreadyMember) return { error: "This person is already a member of your team." };
  }

  // Replace any existing pending invite for this email
  await prisma.scInvite.deleteMany({
    where: { orgId: membership.orgId, email, usedAt: null },
  });

  const rawToken = crypto.randomBytes(32).toString("hex");
  await prisma.scInvite.create({
    data: {
      orgId: membership.orgId,
      email,
      token: rawToken,
      expiresAt: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
      createdBy: user.id,
    },
  });

  const siteUrl = process.env.SITE_URL ?? "https://suitepacific.com";
  const inviteUrl = `${siteUrl}/suitecompare/invite?token=${rawToken}`;

  try {
    await sendInviteEmail(email, user.name, membership.org.name, inviteUrl);
  } catch (e) {
    console.error("[sc] Invite email failed:", e);
  }

  revalidatePath("/suitecompare/settings/team");
  return { success: true };
}

export async function removeMemberAction(formData: FormData): Promise<void> {
  const user = await requireScUser();
  const memberId = String(formData.get("memberId") ?? "").trim();

  const ownership = await prisma.scOrgMember.findFirst({
    where: { userId: user.id, role: "owner" },
  });
  if (!ownership) return;

  const memberToRemove = await prisma.scOrgMember.findFirst({
    where: { id: memberId, orgId: ownership.orgId },
  });
  if (!memberToRemove || memberToRemove.userId === user.id) return;

  await prisma.scOrgMember.delete({ where: { id: memberId } });

  // Invalidate their session immediately
  await prisma.scUser.update({
    where: { id: memberToRemove.userId },
    data: { sessionVersion: { increment: 1 } },
  });

  revalidatePath("/suitecompare/settings/team");
}

export async function cancelInviteAction(formData: FormData): Promise<void> {
  const user = await requireScUser();
  const inviteId = String(formData.get("inviteId") ?? "").trim();

  const ownership = await prisma.scOrgMember.findFirst({
    where: { userId: user.id, role: "owner" },
  });
  if (!ownership) return;

  await prisma.scInvite.deleteMany({
    where: { id: inviteId, orgId: ownership.orgId },
  });

  revalidatePath("/suitecompare/settings/team");
}

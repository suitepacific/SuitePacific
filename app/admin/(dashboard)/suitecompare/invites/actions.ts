"use server";

import { requireAdmin } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { sendAdminInviteEmail } from "@/lib/sc-email";
import { revalidatePath } from "next/cache";
import crypto from "crypto";

function makeToken() {
  return crypto.randomBytes(32).toString("hex");
}

function makeExpiry() {
  return new Date(Date.now() + 14 * 24 * 60 * 60 * 1000);
}

function makeActivationUrl(token: string) {
  const siteUrl = process.env.SITE_URL ?? "https://suitepacific.com";
  return `${siteUrl}/suitecompare/activate?token=${token}`;
}

export async function sendAdminInviteAction(
  _prev: unknown,
  formData: FormData
): Promise<{ error?: string; success?: boolean }> {
  await requireAdmin();

  const email = String(formData.get("email") ?? "").toLowerCase().trim();
  const name = String(formData.get("name") ?? "").trim() || null;
  const plan = String(formData.get("plan") ?? "pro").trim();
  const seatLimit = parseInt(String(formData.get("seatLimit") ?? "1"), 10);
  const clientLimit = parseInt(String(formData.get("clientLimit") ?? "1"), 10);
  const requirePayment = formData.get("requirePayment") === "on";
  const notes = String(formData.get("notes") ?? "").trim() || null;

  if (!email) return { error: "Email is required." };
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) return { error: "Please enter a valid email address." };
  if (!["free", "pro", "team"].includes(plan)) return { error: "Invalid plan." };
  if (isNaN(seatLimit) || seatLimit < 1 || seatLimit > 500) return { error: "Seat limit must be between 1 and 500." };
  if (isNaN(clientLimit) || clientLimit < 1 || clientLimit > 200) return { error: "Client limit must be between 1 and 200." };

  const existingActive = await prisma.scAdminInvite.findFirst({
    where: { email, activatedAt: null, expiresAt: { gt: new Date() } },
  });
  if (existingActive) return { error: "An active invite already exists for this email. Cancel it first or wait for it to expire." };

  const token = makeToken();
  const expiresAt = makeExpiry();

  await prisma.scAdminInvite.create({
    data: { email, name, plan, seatLimit, clientLimit, requirePayment, notes, token, expiresAt },
  });

  try {
    await sendAdminInviteEmail(email, name, plan, seatLimit, clientLimit, requirePayment, makeActivationUrl(token));
  } catch (e) {
    console.error("[sc-admin] Invite email failed:", e);
  }

  revalidatePath("/admin/suitecompare/invites");
  return { success: true };
}

export async function cancelAdminInviteAction(formData: FormData): Promise<void> {
  await requireAdmin();
  const id = String(formData.get("id") ?? "").trim();
  if (!id) return;

  const invite = await prisma.scAdminInvite.findUnique({ where: { id } });
  if (!invite || invite.activatedAt) return;

  await prisma.scAdminInvite.delete({ where: { id } });
  revalidatePath("/admin/suitecompare/invites");
}

export async function resendAdminInviteAction(formData: FormData): Promise<void> {
  await requireAdmin();
  const id = String(formData.get("id") ?? "").trim();
  if (!id) return;

  const invite = await prisma.scAdminInvite.findUnique({ where: { id } });
  if (!invite || invite.activatedAt) return;

  const token = makeToken();
  const expiresAt = makeExpiry();

  await prisma.scAdminInvite.update({
    where: { id },
    data: { token, expiresAt, sentAt: new Date() },
  });

  try {
    await sendAdminInviteEmail(invite.email, invite.name, invite.plan, invite.seatLimit, invite.clientLimit, invite.requirePayment, makeActivationUrl(token));
  } catch (e) {
    console.error("[sc-admin] Resend invite email failed:", e);
  }

  revalidatePath("/admin/suitecompare/invites");
}

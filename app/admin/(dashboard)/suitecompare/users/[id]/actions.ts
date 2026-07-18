"use server";

import { requireAdmin } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";

function revalidate(userId: string) {
  revalidatePath(`/admin/suitecompare/users/${userId}`);
  revalidatePath("/admin/suitecompare");
  revalidatePath("/admin/suitecompare/attention");
}

export async function setOrgPlanAction(formData: FormData): Promise<void> {
  await requireAdmin();
  const orgId = String(formData.get("orgId") ?? "").trim();
  const plan = String(formData.get("plan") ?? "").trim();
  const userId = String(formData.get("userId") ?? "").trim();

  if (!orgId || !["free", "pro", "team"].includes(plan)) return;

  await prisma.scOrg.update({ where: { id: orgId }, data: { plan } });
  revalidate(userId);
}

export async function setOrgBillingStatusAction(formData: FormData): Promise<void> {
  await requireAdmin();
  const orgId = String(formData.get("orgId") ?? "").trim();
  const status = String(formData.get("status") ?? "").trim();
  const userId = String(formData.get("userId") ?? "").trim();

  if (!orgId || !["active", "past_due", "suspended"].includes(status)) return;

  await prisma.scOrg.update({ where: { id: orgId }, data: { billingStatus: status } });
  revalidate(userId);
}

export async function setSeatLimitOverrideAction(formData: FormData): Promise<void> {
  await requireAdmin();
  const orgId = String(formData.get("orgId") ?? "").trim();
  const userId = String(formData.get("userId") ?? "").trim();
  const raw = formData.get("limit");

  if (!orgId) return;

  const limit = raw === "" || raw === null ? null : parseInt(String(raw), 10);
  if (limit !== null && (isNaN(limit) || limit < 1 || limit > 500)) return;

  await prisma.scOrg.update({ where: { id: orgId }, data: { seatLimitOverride: limit } });
  revalidate(userId);
}

export async function setClientLimitOverrideAction(formData: FormData): Promise<void> {
  await requireAdmin();
  const orgId = String(formData.get("orgId") ?? "").trim();
  const userId = String(formData.get("userId") ?? "").trim();
  const raw = formData.get("limit");

  if (!orgId) return;

  const limit = raw === "" || raw === null ? null : parseInt(String(raw), 10);
  if (limit !== null && (isNaN(limit) || limit < 1 || limit > 200)) return;

  await prisma.scOrg.update({ where: { id: orgId }, data: { clientLimitOverride: limit } });
  revalidate(userId);
}

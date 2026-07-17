"use server";

import { revalidatePath } from "next/cache";
import { prisma } from "@/lib/prisma";
import type { ReferralStatus } from "@prisma/client";

export async function updateReferralAction(_prev: unknown, formData: FormData) {
  const id = formData.get("id") as string;
  const status = formData.get("status") as ReferralStatus;
  const commissionAmountRaw = (formData.get("commissionAmount") as string)?.trim();
  const commissionPaid = formData.get("commissionPaid") === "true";

  if (!id || !status) return { error: "Missing required fields." };

  const commissionAmount = commissionAmountRaw ? parseFloat(commissionAmountRaw) : null;
  if (commissionAmountRaw && isNaN(commissionAmount!)) return { error: "Invalid commission amount." };

  const existing = await prisma.referral.findUnique({ where: { id } });
  if (!existing) return { error: "Referral not found." };

  const commissionPaidAt =
    commissionPaid && !existing.commissionPaid ? new Date() : existing.commissionPaidAt;

  await prisma.referral.update({
    where: { id },
    data: { status, commissionAmount, commissionPaid, commissionPaidAt },
  });

  revalidatePath("/admin/referrals");
  revalidatePath(`/admin/referrals/${id}`);
  return { success: true };
}

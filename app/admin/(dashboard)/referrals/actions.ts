"use server";

import { revalidatePath } from "next/cache";
import { prisma } from "@/lib/prisma";
import { requireAdmin } from "@/lib/auth";
import type { ReferralStatus, CommissionStatus } from "@prisma/client";

const VALID_REFERRAL_STATUSES = new Set<string>(["NEW", "CONTACTED", "PROPOSAL_SENT", "WON", "LOST"]);
const VALID_COMMISSION_STATUSES = new Set<string>(["PENDING_PAYMENT", "PAYABLE", "PAID"]);

export async function updateReferralAction(_prev: unknown, formData: FormData) {
  await requireAdmin();

  const id = (formData.get("id") as string)?.trim();
  const status = (formData.get("status") as string)?.trim();

  if (!id || !status) return { error: "Missing required fields." };
  if (id.length > 100) return { error: "Invalid ID." };
  if (!VALID_REFERRAL_STATUSES.has(status)) return { error: "Invalid deal status." };

  const projectValueRaw = (formData.get("projectValue") as string)?.trim();
  const commissionRateRaw = (formData.get("commissionRate") as string)?.trim();
  const commissionAmountRaw = (formData.get("commissionAmount") as string)?.trim();
  const commissionStatusRaw = (formData.get("commissionStatus") as string)?.trim() || null;
  const paymentDateRaw = (formData.get("paymentDate") as string)?.trim() || null;
  const paymentMethod = (formData.get("paymentMethod") as string)?.trim().slice(0, 200) || null;
  const paymentReference = (formData.get("paymentReference") as string)?.trim().slice(0, 200) || null;

  if (commissionStatusRaw && !VALID_COMMISSION_STATUSES.has(commissionStatusRaw)) {
    return { error: "Invalid commission status." };
  }

  const projectValue = projectValueRaw ? parseFloat(projectValueRaw) : null;
  const commissionRate = commissionRateRaw ? parseFloat(commissionRateRaw) : null;
  const commissionAmount = commissionAmountRaw ? parseFloat(commissionAmountRaw) : null;
  const commissionStatus = (commissionStatusRaw as CommissionStatus) || null;
  const paymentDate = paymentDateRaw ? new Date(paymentDateRaw) : null;

  if (projectValue !== null && (isNaN(projectValue) || projectValue < 0 || projectValue > 1_000_000_000)) {
    return { error: "Invalid project value." };
  }
  if (commissionRate !== null && (isNaN(commissionRate) || commissionRate < 0 || commissionRate > 100)) {
    return { error: "Commission rate must be between 0 and 100." };
  }
  if (commissionAmount !== null && (isNaN(commissionAmount) || commissionAmount < 0 || commissionAmount > 1_000_000_000)) {
    return { error: "Invalid commission amount." };
  }
  if (paymentDate && isNaN(paymentDate.getTime())) {
    return { error: "Invalid payment date." };
  }

  const referral = await prisma.referral.findUnique({ where: { id }, select: { id: true } });
  if (!referral) return { error: "Referral not found." };

  await prisma.referral.update({
    where: { id },
    data: {
      status: status as ReferralStatus,
      projectValue,
      commissionRate,
      commissionAmount,
      commissionStatus,
      paymentDate,
      paymentMethod,
      paymentReference,
    },
  });

  revalidatePath("/admin/referrals");
  revalidatePath(`/admin/referrals/${id}`);
  return { success: true };
}

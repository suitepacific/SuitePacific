"use server";

import { revalidatePath } from "next/cache";
import { prisma } from "@/lib/prisma";
import type { ReferralStatus, CommissionStatus } from "@prisma/client";

export async function updateReferralAction(_prev: unknown, formData: FormData) {
  const id = formData.get("id") as string;
  const status = formData.get("status") as ReferralStatus;

  if (!id || !status) return { error: "Missing required fields." };

  const projectValueRaw = (formData.get("projectValue") as string)?.trim();
  const commissionRateRaw = (formData.get("commissionRate") as string)?.trim();
  const commissionAmountRaw = (formData.get("commissionAmount") as string)?.trim();
  const commissionStatusRaw = (formData.get("commissionStatus") as string)?.trim() || null;
  const paymentDateRaw = (formData.get("paymentDate") as string)?.trim() || null;
  const paymentMethod = (formData.get("paymentMethod") as string)?.trim() || null;
  const paymentReference = (formData.get("paymentReference") as string)?.trim() || null;

  const projectValue = projectValueRaw ? parseFloat(projectValueRaw) : null;
  const commissionRate = commissionRateRaw ? parseFloat(commissionRateRaw) : null;
  const commissionAmount = commissionAmountRaw ? parseFloat(commissionAmountRaw) : null;
  const commissionStatus = (commissionStatusRaw as CommissionStatus) || null;
  const paymentDate = paymentDateRaw ? new Date(paymentDateRaw) : null;

  await prisma.referral.update({
    where: { id },
    data: {
      status,
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

"use server";

import { revalidatePath } from "next/cache";
import { prisma } from "@/lib/prisma";
import { requireAdmin } from "@/lib/auth";
import { logActivity, STATUS_LABELS, COMMISSION_STATUS_LABELS } from "@/lib/referral-activity";
import { resolveCommissionRate, calculateCommission } from "@/lib/commission";
import type { ReferralStatus, CommissionStatus } from "@prisma/client";

const VALID_REFERRAL_STATUSES = new Set<string>([
  "NEW", "QUALIFIED", "CONTACTED", "DISCOVERY_CALL",
  "PROPOSAL_SENT", "NEGOTIATION", "WON", "LOST", "DUPLICATE",
]);
const VALID_COMMISSION_STATUSES = new Set<string>(["PENDING_PAYMENT", "PAYABLE", "PAID"]);
const CURRENCIES = new Set(["USD", "CAD", "AUD", "GBP", "EUR", "INR", "SGD", "NZD"]);

export async function updateReferralAction(_prev: unknown, formData: FormData) {
  await requireAdmin();

  const id = (formData.get("id") as string)?.trim();
  const status = (formData.get("status") as string)?.trim();
  if (!id || !status) return { error: "Missing required fields." };
  if (id.length > 100) return { error: "Invalid ID." };
  if (!VALID_REFERRAL_STATUSES.has(status)) return { error: "Invalid deal status." };

  const assignedTo = (formData.get("assignedTo") as string)?.trim().slice(0, 100) || null;
  const internalNotes = (formData.get("internalNotes") as string)?.trim().slice(0, 10000) || null;
  const partnerNotes = (formData.get("partnerNotes") as string)?.trim().slice(0, 5000) || null;

  const projectCurrency = (formData.get("projectCurrency") as string)?.trim() || "USD";
  const commissionCurrency = (formData.get("commissionCurrency") as string)?.trim() || "USD";
  if (!CURRENCIES.has(projectCurrency) || !CURRENCIES.has(commissionCurrency)) {
    return { error: "Invalid currency." };
  }

  const projectValueRaw = (formData.get("projectValue") as string)?.trim();
  const commissionRateRaw = (formData.get("commissionRate") as string)?.trim();
  const commissionStatusRaw = (formData.get("commissionStatus") as string)?.trim() || null;
  const paymentDateRaw = (formData.get("paymentDate") as string)?.trim() || null;
  const paymentMethod = (formData.get("paymentMethod") as string)?.trim().slice(0, 200) || null;
  const paymentReference = (formData.get("paymentReference") as string)?.trim().slice(0, 200) || null;
  const paymentNotes = (formData.get("paymentNotes") as string)?.trim().slice(0, 2000) || null;

  if (commissionStatusRaw && !VALID_COMMISSION_STATUSES.has(commissionStatusRaw)) {
    return { error: "Invalid commission status." };
  }

  const projectValue = projectValueRaw ? parseFloat(projectValueRaw) : null;
  const commissionRate = commissionRateRaw ? parseFloat(commissionRateRaw) : null;
  const commissionStatus = (commissionStatusRaw as CommissionStatus) || null;
  const paymentDate = paymentDateRaw ? new Date(paymentDateRaw) : null;

  if (projectValue !== null && (isNaN(projectValue) || projectValue < 0 || projectValue > 1_000_000_000)) {
    return { error: "Invalid project value." };
  }
  if (commissionRate !== null && (isNaN(commissionRate) || commissionRate < 0 || commissionRate > 100)) {
    return { error: "Commission rate must be between 0 and 100." };
  }
  if (paymentDate && isNaN(paymentDate.getTime())) {
    return { error: "Invalid payment date." };
  }

  const existing = await prisma.referral.findUnique({
    where: { id },
    include: { partner: { select: { commissionRate: true, name: true } } },
  });
  if (!existing) return { error: "Referral not found." };

  // Auto-calculate commission from project value × effective rate
  let commissionAmount: number | null = null;
  if (projectValue != null) {
    const effectiveRate = await resolveCommissionRate(commissionRate, existing.partner.commissionRate);
    commissionAmount = calculateCommission(projectValue, effectiveRate);
  }

  await prisma.referral.update({
    where: { id },
    data: {
      status: status as ReferralStatus,
      assignedTo,
      internalNotes,
      partnerNotes,
      projectCurrency,
      projectValue,
      commissionRate,
      commissionCurrency,
      commissionAmount,
      commissionStatus,
      paymentDate,
      paymentMethod,
      paymentReference,
      paymentNotes,
    },
  });

  // Activity log — only log meaningful changes
  const activities: Promise<void>[] = [];
  if (existing.status !== status) {
    activities.push(
      logActivity(
        id,
        "status_changed",
        `Status changed from ${STATUS_LABELS[existing.status]} to ${STATUS_LABELS[status as ReferralStatus]}`,
        "admin"
      )
    );
  }
  if (existing.commissionStatus !== commissionStatus && commissionStatus) {
    if (commissionStatus === "PAYABLE") {
      activities.push(logActivity(id, "payment_received", "Client invoice payment received — commission is now payable", "admin"));
    } else if (commissionStatus === "PAID") {
      activities.push(
        logActivity(
          id,
          "commission_paid",
          `Commission paid${paymentDate ? " on " + paymentDate.toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" }) : ""}${paymentMethod ? " via " + paymentMethod : ""}${paymentReference ? " (Ref: " + paymentReference + ")" : ""}`,
          "admin"
        )
      );
    } else if (commissionStatus === "PENDING_PAYMENT") {
      activities.push(logActivity(id, "commission_updated", `Commission status set to Pending Payment`, "admin"));
    }
  } else if (
    commissionAmount != null &&
    existing.commissionAmount !== commissionAmount
  ) {
    activities.push(
      logActivity(
        id,
        "commission_updated",
        `Commission set to ${commissionCurrency} ${commissionAmount.toFixed(2)} (${projectValue ? projectCurrency + " " + projectValue.toLocaleString() : ""} × ${commissionRate != null ? commissionRate : "default"}%)`,
        "admin"
      )
    );
  }
  await Promise.all(activities);

  revalidatePath("/admin/referrals");
  revalidatePath(`/admin/referrals/${id}`);
  return { success: true };
}

export async function archiveReferralAction(id: string) {
  await requireAdmin();
  if (!id || id.length > 100) return;
  await prisma.referral.update({ where: { id }, data: { archivedAt: new Date() } });
  revalidatePath("/admin/referrals");
}

export async function unarchiveReferralAction(id: string) {
  await requireAdmin();
  if (!id || id.length > 100) return;
  await prisma.referral.update({ where: { id }, data: { archivedAt: null } });
  revalidatePath("/admin/referrals");
}

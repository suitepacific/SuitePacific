import { prisma } from "@/lib/prisma";
import type { ReferralStatus, CommissionStatus } from "@prisma/client";

export async function logActivity(
  referralId: string,
  type: string,
  description: string,
  actor: string = "admin"
) {
  await prisma.referralActivity.create({
    data: { referralId, type, description, actor },
  });
}

export const STATUS_LABELS: Record<ReferralStatus, string> = {
  NEW: "New",
  QUALIFIED: "Qualified",
  CONTACTED: "Contacted",
  DISCOVERY_CALL: "Discovery Call",
  PROPOSAL_SENT: "Proposal Sent",
  NEGOTIATION: "Negotiation",
  WON: "Won",
  LOST: "Lost",
  DUPLICATE: "Duplicate",
};

export const COMMISSION_STATUS_LABELS: Record<CommissionStatus, string> = {
  PENDING_PAYMENT: "Pending Payment",
  PAYABLE: "Payable",
  PAID: "Paid",
};

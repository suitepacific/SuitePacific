import { prisma } from "@/lib/prisma";

export async function resolveCommissionRate(
  referralRate: number | null,
  partnerRate: number | null
): Promise<number> {
  if (referralRate != null) return referralRate;
  if (partnerRate != null) return partnerRate;
  const setting = await prisma.systemSetting.findUnique({
    where: { key: "default_commission_rate" },
  });
  return setting ? (parseFloat(setting.value) || 10) : 10;
}

export function calculateCommission(projectValue: number, ratePercent: number): number {
  return Math.round(projectValue * ratePercent) / 100;
}

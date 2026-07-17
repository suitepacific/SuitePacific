"use server";

import { revalidatePath } from "next/cache";
import { prisma } from "@/lib/prisma";
import { requireAdmin } from "@/lib/auth";

export async function updateSettingAction(_prev: unknown, formData: FormData) {
  await requireAdmin();

  const defaultRate = (formData.get("default_commission_rate") as string)?.trim();
  const rate = parseFloat(defaultRate);
  if (isNaN(rate) || rate < 0 || rate > 100) return { error: "Commission rate must be between 0 and 100." };

  await prisma.systemSetting.upsert({
    where: { key: "default_commission_rate" },
    update: { value: rate.toString() },
    create: { key: "default_commission_rate", value: rate.toString() },
  });

  revalidatePath("/admin/settings");
  return { success: true };
}

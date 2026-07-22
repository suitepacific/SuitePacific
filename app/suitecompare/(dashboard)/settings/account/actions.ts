"use server";

import { requireScUser } from "@/lib/sc-auth";
import { hashScPassword, verifyScPassword } from "@/lib/sc-auth";
import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";

export async function updateProfileAction(
  _prev: unknown,
  formData: FormData
): Promise<{ error?: string; success?: boolean }> {
  const user = await requireScUser();
  const name = String(formData.get("name") ?? "").trim();

  if (!name) return { error: "Name is required." };
  if (name.length > 100) return { error: "Name must be 100 characters or fewer." };

  await prisma.scUser.update({ where: { id: user.id }, data: { name } });
  revalidatePath("/suitecompare/settings/account");
  return { success: true };
}

export async function changePasswordAction(
  _prev: unknown,
  formData: FormData
): Promise<{ error?: string; success?: boolean }> {
  const user = await requireScUser();
  const current = String(formData.get("current") ?? "");
  const newPw = String(formData.get("password") ?? "");
  const confirm = String(formData.get("confirm") ?? "");

  if (!current || !newPw || !confirm) return { error: "All fields are required." };

  const valid = await verifyScPassword(current, user.passwordHash);
  if (!valid) return { error: "Current password is incorrect." };

  if (newPw.length < 8) return { error: "New password must be at least 8 characters." };
  if (newPw !== confirm) return { error: "Passwords do not match." };
  if (newPw === current) return { error: "New password must be different from your current password." };

  const passwordHash = await hashScPassword(newPw);
  await prisma.scUser.update({ where: { id: user.id }, data: { passwordHash } });

  return { success: true };
}

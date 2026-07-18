"use server";

import { requireAdmin } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";

export async function archiveScUserAction(userId: string): Promise<void> {
  await requireAdmin();

  await prisma.scUser.update({
    where: { id: userId },
    data: { status: "archived", archivedAt: new Date() },
  });
  revalidatePath("/admin/suitecompare-users");
}

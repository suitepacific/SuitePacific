"use server";

import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";

export async function deleteLead(id: string) {
  await prisma.leadSubmission.delete({ where: { id } });
  revalidatePath("/admin/leads");
}

"use server";

import { redirect } from "next/navigation";
import { headers } from "next/headers";
import { prisma } from "@/lib/prisma";
import { getCustomerFromRequest } from "@/lib/customer-auth";

export async function acceptAgreementAction() {
  const customer = await getCustomerFromRequest();
  if (!customer) redirect("/customer-portal/login");

  const headerStore = await headers();
  const ip =
    headerStore.get("x-forwarded-for")?.split(",")[0]?.trim() ??
    headerStore.get("x-real-ip") ??
    "unknown";

  await prisma.customer.update({
    where: { id: customer.id },
    data: { agreementAcceptedAt: new Date(), agreementAcceptedIp: ip },
  });

  redirect("/customer-portal/dashboard");
}

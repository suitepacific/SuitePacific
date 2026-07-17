import { redirect } from "next/navigation";
import { getCustomerFromRequest } from "@/lib/customer-auth";

export const dynamic = "force-dynamic";

export default async function CustomerPortalRoot() {
  const customer = await getCustomerFromRequest();
  if (customer) redirect("/customer-portal/dashboard");
  redirect("/customer-portal/login");
}

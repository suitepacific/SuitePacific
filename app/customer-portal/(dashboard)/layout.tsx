import { redirect } from "next/navigation";
import { getCustomerFromRequest } from "@/lib/customer-auth";
import { CustomerSidebar } from "@/components/portal/CustomerSidebar";

export default async function CustomerDashboardLayout({ children }: { children: React.ReactNode }) {
  const customer = await getCustomerFromRequest();
  if (!customer) redirect("/customer-portal/login");
  if (!customer.agreementAcceptedAt) redirect("/customer-portal/agreement");

  return (
    <div className="flex min-h-screen bg-brand-50/30">
      <CustomerSidebar customerName={customer.name} company={customer.company} />
      <main className="flex-1 mt-14 md:mt-0 p-4 md:p-8 min-w-0 overflow-auto">
        {children}
      </main>
    </div>
  );
}

import { redirect } from "next/navigation";
import { getEmployeeFromRequest } from "@/lib/employee-auth";
import { EmployeeSidebar } from "@/components/employee-portal/EmployeeSidebar";

export default async function EmployeeDashboardLayout({ children }: { children: React.ReactNode }) {
  const employee = await getEmployeeFromRequest();
  if (!employee) redirect("/employee-portal/login");

  const customerLabel = employee.customers.length === 1
    ? employee.customers[0].company
    : `${employee.customers.length} clients`;

  return (
    <div className="flex min-h-screen">
      <EmployeeSidebar employeeName={employee.name} customerLabel={customerLabel} />
      <main className="flex-1 mt-14 md:mt-0 p-4 md:p-8 lg:p-10 min-w-0">
        {children}
      </main>
    </div>
  );
}

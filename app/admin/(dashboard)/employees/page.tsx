import { prisma } from "@/lib/prisma";
import Link from "next/link";
import { PlusCircle } from "lucide-react";

export default async function AdminEmployeesPage() {
  const employees = await prisma.employee.findMany({
    include: { customer: { select: { company: true } } },
    orderBy: { createdAt: "desc" },
  });

  return (
    <div>
      <div className="flex items-start justify-between mb-6">
        <div>
          <h1 className="text-2xl font-semibold text-brand-900">Employees</h1>
          <p className="mt-1 text-sm text-brand-400">{employees.length} employee{employees.length !== 1 ? "s" : ""}</p>
        </div>
        <Link href="/admin/employees/new"
          className="inline-flex items-center gap-1.5 rounded-full bg-brand text-white text-sm font-medium px-4 py-2 hover:bg-brand-700 transition-colors">
          <PlusCircle className="h-4 w-4" />
          Add Employee
        </Link>
      </div>

      <div className="bg-white rounded-2xl border border-brand-50 shadow-soft overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm min-w-[600px]">
            <thead>
              <tr className="border-b border-brand-50 text-left text-brand-400">
                <th className="px-5 py-3 font-medium">Name</th>
                <th className="px-5 py-3 font-medium">Email</th>
                <th className="px-5 py-3 font-medium">Assigned Customer</th>
                <th className="px-5 py-3 font-medium">Status</th>
                <th className="px-5 py-3 font-medium">Added</th>
                <th className="px-5 py-3 font-medium"></th>
              </tr>
            </thead>
            <tbody>
              {employees.map((emp) => (
                <tr key={emp.id} className="border-b border-brand-50 last:border-0 hover:bg-brand-50/40 transition-colors">
                  <td className="px-5 py-3 font-medium text-brand-900">{emp.name}</td>
                  <td className="px-5 py-3 text-brand-500">{emp.email}</td>
                  <td className="px-5 py-3 text-brand-700">{emp.customer.company}</td>
                  <td className="px-5 py-3">
                    {emp.isActive ? (
                      <span className="text-xs text-green-700 bg-green-50 px-2 py-0.5 rounded-full">Active</span>
                    ) : (
                      <span className="text-xs text-brand-400 bg-brand-50 px-2 py-0.5 rounded-full">Inactive</span>
                    )}
                  </td>
                  <td className="px-5 py-3 text-brand-400 whitespace-nowrap">
                    {new Date(emp.createdAt).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })}
                  </td>
                  <td className="px-5 py-3">
                    <Link href={`/admin/employees/${emp.id}`} className="text-xs text-brand-400 hover:text-accent transition-colors">
                      Edit
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        {employees.length === 0 && (
          <p className="px-5 py-8 text-center text-sm text-brand-300">No employees yet. Add one to get started.</p>
        )}
      </div>
    </div>
  );
}

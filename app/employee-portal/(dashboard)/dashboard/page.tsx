import { redirect } from "next/navigation";
import Link from "next/link";
import { PlusCircle } from "lucide-react";
import { getEmployeeFromRequest } from "@/lib/employee-auth";
import { prisma } from "@/lib/prisma";

export default async function EmployeeDashboardPage() {
  const employee = await getEmployeeFromRequest();
  if (!employee) redirect("/employee-portal/login");

  const recentEntries = await prisma.timeEntry.findMany({
    where: { employeeId: employee.id },
    include: { customer: { select: { company: true } } },
    orderBy: { date: "desc" },
    take: 7,
  });

  const thisWeekStart = new Date();
  thisWeekStart.setDate(thisWeekStart.getDate() - thisWeekStart.getDay());
  thisWeekStart.setHours(0, 0, 0, 0);

  const weekHours = await prisma.timeEntry.aggregate({
    where: { employeeId: employee.id, date: { gte: thisWeekStart } },
    _sum: { hours: true },
  });

  const thisMonthStart = new Date();
  thisMonthStart.setDate(1);
  thisMonthStart.setHours(0, 0, 0, 0);

  const monthHours = await prisma.timeEntry.aggregate({
    where: { employeeId: employee.id, date: { gte: thisMonthStart } },
    _sum: { hours: true },
  });

  return (
    <div>
      <div className="flex items-start justify-between mb-6">
        <div>
          <h1 className="text-2xl font-semibold text-brand-900">Welcome back, {employee.name.split(" ")[0]}</h1>
          <p className="mt-1 text-sm text-brand-400">
            {employee.customers.length === 0
              ? "No clients assigned yet."
              : employee.customers.map((c) => c.company).join(", ")}
          </p>
        </div>
        <Link href="/employee-portal/time-entries/new"
          className="inline-flex items-center gap-1.5 rounded-full bg-brand text-white text-sm font-medium px-4 py-2 hover:bg-brand-700 transition-colors">
          <PlusCircle className="h-4 w-4" />
          Log Time
        </Link>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
        <div className="bg-white rounded-2xl border border-brand-50 shadow-soft p-5">
          <p className="text-xs text-brand-400 font-medium uppercase tracking-wide mb-1">This week</p>
          <p className="text-3xl font-semibold text-brand-900">{(weekHours._sum.hours ?? 0).toFixed(1)}h</p>
        </div>
        <div className="bg-white rounded-2xl border border-brand-50 shadow-soft p-5">
          <p className="text-xs text-brand-400 font-medium uppercase tracking-wide mb-1">This month</p>
          <p className="text-3xl font-semibold text-brand-900">{(monthHours._sum.hours ?? 0).toFixed(1)}h</p>
        </div>
      </div>

      <div className="bg-white rounded-2xl border border-brand-50 shadow-soft overflow-hidden">
        <div className="px-5 py-4 border-b border-brand-50 flex items-center justify-between">
          <p className="text-sm font-medium text-brand-900">Recent entries</p>
          <Link href="/employee-portal/time-entries" className="text-xs text-accent hover:underline">View all</Link>
        </div>
        {recentEntries.length === 0 ? (
          <div className="px-5 py-10 text-center">
            <p className="text-sm text-brand-300 mb-3">No time entries yet.</p>
            <Link href="/employee-portal/time-entries/new"
              className="inline-flex items-center gap-1.5 text-sm text-accent hover:underline">
              <PlusCircle className="h-4 w-4" />
              Log your first entry
            </Link>
          </div>
        ) : (
          <div className="divide-y divide-brand-50">
            {recentEntries.map((e) => (
              <div key={e.id} className="px-5 py-3 flex items-center justify-between">
                <div className="min-w-0">
                  <p className="text-sm text-brand-700 truncate">{e.description}</p>
                  <p className="text-xs text-brand-400 mt-0.5">
                    {new Date(e.date).toLocaleDateString("en-US", { weekday: "short", month: "short", day: "numeric" })}
                    {employee.customers.length > 1 && (
                      <span className="ml-2 text-brand-300">{e.customer.company}</span>
                    )}
                  </p>
                </div>
                <span className="ml-4 text-sm font-medium text-brand-900 tabular-nums shrink-0">
                  {e.hours.toFixed(1)}h
                </span>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

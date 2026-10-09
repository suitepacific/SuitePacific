import { redirect } from "next/navigation";
import Link from "next/link";
import { PlusCircle } from "lucide-react";
import { getEmployeeFromRequest } from "@/lib/employee-auth";
import { prisma } from "@/lib/prisma";

export default async function EmployeeTimeEntriesPage() {
  const employee = await getEmployeeFromRequest();
  if (!employee) redirect("/employee-portal/login");

  const entries = await prisma.timeEntry.findMany({
    where: { employeeId: employee.id },
    orderBy: { date: "desc" },
    select: { id: true, date: true, hours: true, description: true, isBillable: true },
  });

  const totalHours = entries.reduce((s, e) => s + e.hours, 0);

  return (
    <div>
      <div className="flex items-start justify-between mb-6">
        <div>
          <h1 className="text-2xl font-semibold text-brand-900">My Time Entries</h1>
          <p className="mt-1 text-sm text-brand-400">
            {totalHours.toFixed(1)}h total across {entries.length} {entries.length === 1 ? "entry" : "entries"}
          </p>
        </div>
        <Link href="/employee-portal/time-entries/new"
          className="inline-flex items-center gap-1.5 rounded-full bg-brand text-white text-sm font-medium px-4 py-2 hover:bg-brand-700 transition-colors">
          <PlusCircle className="h-4 w-4" />
          Log Time
        </Link>
      </div>

      <div className="bg-white rounded-2xl border border-brand-50 shadow-soft overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm min-w-[500px]">
            <thead>
              <tr className="border-b border-brand-50 text-left text-brand-400">
                <th className="px-5 py-3 font-medium">Date</th>
                <th className="px-5 py-3 font-medium">Description</th>
                <th className="px-5 py-3 font-medium">Hours</th>
              </tr>
            </thead>
            <tbody>
              {entries.map((e) => (
                <tr key={e.id} className="border-b border-brand-50 last:border-0 hover:bg-brand-50/40 transition-colors">
                  <td className="px-5 py-3 text-brand-500 whitespace-nowrap">
                    {new Date(e.date).toLocaleDateString("en-US", { weekday: "short", month: "short", day: "numeric", year: "numeric" })}
                  </td>
                  <td className="px-5 py-3 text-brand-700 max-w-sm">{e.description}</td>
                  <td className="px-5 py-3 font-medium text-brand-900 tabular-nums">{e.hours.toFixed(1)}h</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        {entries.length === 0 && (
          <div className="px-5 py-10 text-center">
            <p className="text-sm text-brand-300 mb-3">No time entries yet.</p>
            <Link href="/employee-portal/time-entries/new" className="text-sm text-accent hover:underline">
              Log your first entry
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}

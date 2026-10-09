import { redirect } from "next/navigation";
import Link from "next/link";
import { PlusCircle } from "lucide-react";
import { getEmployeeFromRequest } from "@/lib/employee-auth";
import { prisma } from "@/lib/prisma";
import { periodDateFilter } from "@/lib/invoice-utils";

const PERIOD_TABS = [
  { value: "week", label: "This Week" },
  { value: "month", label: "This Month" },
  { value: "all", label: "All Time" },
];

const STATUS_BADGE: Record<string, string> = {
  pending: "bg-amber-50 text-amber-700",
  approved: "bg-emerald-50 text-emerald-700",
  rejected: "bg-red-50 text-red-500",
};
const STATUS_LABEL: Record<string, string> = { pending: "Pending", approved: "Approved", rejected: "Rejected" };

export default async function EmployeeTimeEntriesPage({
  searchParams,
}: {
  searchParams: Promise<{ period?: string }>;
}) {
  const employee = await getEmployeeFromRequest();
  if (!employee) redirect("/employee-portal/login");

  const sp = await searchParams;
  const period = sp.period || "month";
  const dateFilter = periodDateFilter(period);
  const multiCustomer = employee.customers.length > 1;

  const entries = await prisma.timeEntry.findMany({
    where: {
      employeeId: employee.id,
      ...(dateFilter ? { date: dateFilter } : {}),
    },
    include: { customer: { select: { company: true } } },
    orderBy: { date: "desc" },
  });

  const totalHours = entries.reduce((s, e) => s + e.hours, 0);

  return (
    <div>
      <div className="flex items-start justify-between mb-6">
        <div>
          <h1 className="text-2xl font-semibold text-brand-900">My Time</h1>
          <p className="mt-1 text-sm text-brand-400">
            {totalHours.toFixed(1)}h across {entries.length} {entries.length === 1 ? "entry" : "entries"}
          </p>
        </div>
        <Link
          href="/employee-portal/time-entries/new"
          className="inline-flex items-center gap-1.5 rounded-full bg-brand text-white text-sm font-medium px-4 py-2 hover:bg-brand-700 transition-colors"
        >
          <PlusCircle className="h-4 w-4" />
          Log Time
        </Link>
      </div>

      {/* Period tabs */}
      <div className="flex gap-1.5 mb-6">
        {PERIOD_TABS.map((t) => (
          <Link
            key={t.value}
            href={`/employee-portal/time-entries?period=${t.value}`}
            className={`text-xs px-3 py-1.5 rounded-full border transition-colors ${
              period === t.value
                ? "bg-brand-900 text-white border-brand-900"
                : "border-brand-100 text-brand-500 hover:border-brand-300"
            }`}
          >
            {t.label}
          </Link>
        ))}
      </div>

      <div className="bg-white rounded-2xl border border-brand-50 shadow-soft overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm min-w-[500px]">
            <thead>
              <tr className="border-b border-brand-50 text-left text-brand-400">
                <th className="px-5 py-3 font-medium">Date</th>
                {multiCustomer && <th className="px-5 py-3 font-medium">Client</th>}
                <th className="px-5 py-3 font-medium">Description</th>
                <th className="px-5 py-3 font-medium">Hrs</th>
                <th className="px-5 py-3 font-medium">Status</th>
              </tr>
            </thead>
            <tbody>
              {entries.map((e) => (
                <tr key={e.id} className="border-b border-brand-50 last:border-0 hover:bg-brand-50/40 transition-colors">
                  <td className="px-5 py-3 text-brand-500 whitespace-nowrap text-xs">
                    {new Date(e.date).toLocaleDateString("en-US", { weekday: "short", month: "short", day: "numeric" })}
                  </td>
                  {multiCustomer && (
                    <td className="px-5 py-3 text-brand-500 text-xs whitespace-nowrap">{e.customer.company}</td>
                  )}
                  <td className="px-5 py-3 text-brand-700 max-w-sm">{e.description}</td>
                  <td className="px-5 py-3 font-medium text-brand-900 tabular-nums text-xs">{e.hours.toFixed(1)}h</td>
                  <td className="px-5 py-3">
                    <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${STATUS_BADGE[e.status] ?? "bg-brand-50 text-brand-400"}`}>
                      {STATUS_LABEL[e.status] ?? e.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        {entries.length === 0 && (
          <div className="px-5 py-10 text-center">
            <p className="text-sm text-brand-300 mb-3">No entries for this period.</p>
            <Link href="/employee-portal/time-entries/new" className="text-sm text-accent hover:underline">
              Log time
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}

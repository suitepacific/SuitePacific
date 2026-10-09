import { prisma } from "@/lib/prisma";
import { notFound } from "next/navigation";
import { EmployeeEditForm } from "./EmployeeEditForm";

export default async function EmployeeDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;

  const now = new Date();
  const weekStart = new Date(now);
  weekStart.setDate(now.getDate() - now.getDay());
  weekStart.setHours(0, 0, 0, 0);
  const monthStart = new Date(now.getFullYear(), now.getMonth(), 1);

  const [employee, customers, recentEntries, weekEntries, monthEntries] = await Promise.all([
    prisma.employee.findUnique({
      where: { id },
      include: { customers: { select: { id: true, company: true, name: true } } },
    }),
    prisma.customer.findMany({
      where: { archivedAt: null },
      select: { id: true, company: true, name: true },
      orderBy: { company: "asc" },
    }),
    prisma.timeEntry.findMany({
      where: { employeeId: id },
      orderBy: { date: "desc" },
      take: 10,
      include: { customer: { select: { company: true } } },
    }),
    prisma.timeEntry.groupBy({
      by: ["customerId"],
      where: { employeeId: id, date: { gte: weekStart } },
      _sum: { hours: true },
    }),
    prisma.timeEntry.groupBy({
      by: ["customerId"],
      where: { employeeId: id, date: { gte: monthStart } },
      _sum: { hours: true },
    }),
  ]);

  if (!employee) notFound();

  // Build customer lookup
  const customerMap = new Map(customers.map((c) => [c.id, c.company]));

  const weekByCustomer = weekEntries.map((e) => ({
    customerId: e.customerId,
    company: customerMap.get(e.customerId) ?? e.customerId,
    hours: e._sum.hours ?? 0,
  }));
  const monthByCustomer = monthEntries.map((e) => ({
    customerId: e.customerId,
    company: customerMap.get(e.customerId) ?? e.customerId,
    hours: e._sum.hours ?? 0,
  }));

  const weekTotal = weekByCustomer.reduce((s, e) => s + e.hours, 0);
  const monthTotal = monthByCustomer.reduce((s, e) => s + e.hours, 0);

  return (
    <EmployeeEditForm
      employee={employee}
      customers={customers}
      recentEntries={recentEntries.map((e) => ({
        id: e.id,
        date: e.date,
        hours: e.hours,
        description: e.description,
        customerCompany: e.customer.company,
        status: e.status,
      }))}
      weekTotal={weekTotal}
      monthTotal={monthTotal}
      weekByCustomer={weekByCustomer}
      monthByCustomer={monthByCustomer}
    />
  );
}

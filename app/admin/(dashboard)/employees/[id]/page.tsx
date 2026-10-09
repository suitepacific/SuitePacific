import { prisma } from "@/lib/prisma";
import { notFound } from "next/navigation";
import { EmployeeEditForm } from "./EmployeeEditForm";

export default async function EmployeeDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;

  const [employee, customers] = await Promise.all([
    prisma.employee.findUnique({
      where: { id },
      include: { customer: { select: { id: true, company: true, name: true } } },
    }),
    prisma.customer.findMany({
      where: { archivedAt: null },
      select: { id: true, company: true, name: true },
      orderBy: { company: "asc" },
    }),
  ]);

  if (!employee) notFound();

  const recentEntries = await prisma.timeEntry.findMany({
    where: { employeeId: id },
    orderBy: { date: "desc" },
    take: 10,
    select: { id: true, date: true, hours: true, description: true },
  });

  return <EmployeeEditForm employee={employee} customers={customers} recentEntries={recentEntries} />;
}

import { prisma } from "@/lib/prisma";
import { NewEmployeeForm } from "./NewEmployeeForm";

export default async function NewEmployeePage() {
  const customers = await prisma.customer.findMany({
    where: { archivedAt: null },
    select: { id: true, company: true, name: true },
    orderBy: { company: "asc" },
  });

  return <NewEmployeeForm customers={customers} />;
}

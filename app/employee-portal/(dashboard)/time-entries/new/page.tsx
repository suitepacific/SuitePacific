import { redirect } from "next/navigation";
import { getEmployeeFromRequest } from "@/lib/employee-auth";
import { LogTimeForm } from "./LogTimeForm";

export default async function NewTimeEntryPage() {
  const employee = await getEmployeeFromRequest();
  if (!employee) redirect("/employee-portal/login");

  return <LogTimeForm customers={employee.customers} />;
}

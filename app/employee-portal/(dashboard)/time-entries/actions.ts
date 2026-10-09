"use server";

import { redirect } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { getEmployeeFromRequest } from "@/lib/employee-auth";

export async function logTimeAction(_prev: unknown, formData: FormData) {
  const employee = await getEmployeeFromRequest();
  if (!employee) return { error: "Not authenticated." };

  const dateRaw = (formData.get("date") as string)?.trim();
  const hoursRaw = (formData.get("hours") as string)?.trim();
  const description = (formData.get("description") as string)?.trim();

  if (!dateRaw) return { error: "Date is required." };
  if (!hoursRaw) return { error: "Hours is required." };
  if (!description) return { error: "Description is required." };
  if (description.length > 1000) return { error: "Description is too long." };

  const hours = parseFloat(hoursRaw);
  if (isNaN(hours) || hours <= 0 || hours > 24) return { error: "Hours must be between 0 and 24." };

  const date = new Date(dateRaw);
  if (isNaN(date.getTime())) return { error: "Invalid date." };

  await prisma.timeEntry.create({
    data: {
      customerId: employee.customerId,
      employeeId: employee.id,
      date,
      hours,
      description,
      isBillable: true,
    },
  });

  redirect("/employee-portal/time-entries");
}

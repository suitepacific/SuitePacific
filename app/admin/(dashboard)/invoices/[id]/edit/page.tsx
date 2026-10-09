import { prisma } from "@/lib/prisma";
import { notFound } from "next/navigation";
import { AdminInvoiceEditForm } from "./AdminInvoiceEditForm";

export default async function AdminInvoiceEditPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const invoice = await prisma.invoice.findUnique({
    where: { id },
    include: {
      customer: { select: { company: true, billingCurrency: true } },
      items: { orderBy: { id: "asc" } },
    },
  });
  if (!invoice) notFound();

  return <AdminInvoiceEditForm invoice={invoice} />;
}

import { notFound, redirect } from "next/navigation";
import { getCustomerFromRequest } from "@/lib/customer-auth";
import { prisma } from "@/lib/prisma";
import { InvoicePrintView } from "@/components/InvoicePrintView";

export const dynamic = "force-dynamic";

export default async function CustomerInvoicePrintPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const customer = await getCustomerFromRequest();
  if (!customer) redirect("/customer-portal/login");

  const invoice = await prisma.invoice.findUnique({
    where: { id },
    include: { customer: true, items: true },
  });

  // Only show SENT or PAID invoices; verify ownership
  if (!invoice || invoice.customerId !== customer.id || !["SENT", "PAID"].includes(invoice.status)) {
    notFound();
  }

  return <InvoicePrintView invoice={invoice} />;
}

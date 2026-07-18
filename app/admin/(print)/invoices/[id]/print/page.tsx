import { prisma } from "@/lib/prisma";
import { notFound, redirect } from "next/navigation";
import { requireAdmin } from "@/lib/auth";
import { InvoicePrintView } from "@/components/InvoicePrintView";

export default async function AdminInvoicePrintPage({ params }: { params: Promise<{ id: string }> }) {
  await requireAdmin();
  const { id } = await params;

  const invoice = await prisma.invoice.findUnique({
    where: { id },
    include: {
      customer: true,
      items: true,
    },
  });
  if (!invoice) notFound();

  return <InvoicePrintView invoice={invoice} />;
}

import { redirect, notFound } from "next/navigation";
import { getCustomerFromRequest } from "@/lib/customer-auth";
import { prisma } from "@/lib/prisma";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { TicketStatusBadge } from "@/components/portal/TicketStatusBadge";
import { TicketPriorityBadge } from "@/components/portal/TicketPriorityBadge";
import { CustomerReplyForm } from "@/components/portal/CustomerReplyForm";

const TYPE_LABELS: Record<string, string> = {
  SUPPORT: "Support Issue", DEVELOPMENT: "Development Request",
  QUESTION: "Question", OPTIMIZATION: "Optimisation",
};

export default async function CustomerTicketDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const customer = await getCustomerFromRequest();
  if (!customer) redirect("/customer-portal/login");

  const ticket = await prisma.ticket.findUnique({
    where: { id },
    include: {
      comments: {
        where: { isInternal: false },
        orderBy: { createdAt: "asc" },
      },
    },
  });
  if (!ticket || ticket.customerId !== customer.id) notFound();

  const canReply = ticket.status !== "CLOSED";

  return (
    <div className="max-w-2xl">
      <Link href="/customer-portal/tickets"
        className="inline-flex items-center gap-1.5 text-sm text-brand-400 hover:text-brand-900 mb-6">
        <ArrowLeft className="h-3.5 w-3.5" /> Back to Tickets
      </Link>

      {/* Header */}
      <div className="mb-6">
        <div className="flex items-start gap-3 flex-wrap">
          <h1 className="text-xl font-semibold text-brand-900 flex-1">{ticket.title}</h1>
        </div>
        <div className="flex items-center gap-2 mt-2 flex-wrap">
          <TicketStatusBadge status={ticket.status} />
          <TicketPriorityBadge priority={ticket.priority} />
          <span className="text-xs text-brand-300">·</span>
          <span className="text-xs text-brand-400">{TYPE_LABELS[ticket.type] ?? ticket.type}</span>
          <span className="text-xs text-brand-300">·</span>
          <span className="text-xs text-brand-400">
            Opened {new Date(ticket.createdAt).toLocaleDateString("en-US", {
              month: "long", day: "numeric", year: "numeric",
            })}
          </span>
        </div>
      </div>

      {ticket.status === "PENDING_CUSTOMER" && (
        <div className="bg-amber-50 border border-amber-100 rounded-2xl px-5 py-4 mb-6">
          <p className="text-sm font-medium text-amber-800">SuitePacific needs your input</p>
          <p className="text-xs text-amber-700 mt-0.5">
            Please reply below with the requested information so we can continue.
          </p>
        </div>
      )}

      {/* Thread */}
      <div className="space-y-4 mb-6">
        {/* Original message */}
        <div className="bg-white rounded-2xl border border-brand-100 p-5">
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-2">
              <div className="h-7 w-7 rounded-full bg-brand-100 flex items-center justify-center text-xs font-semibold text-brand-600">
                {customer.name.charAt(0).toUpperCase()}
              </div>
              <span className="text-sm font-medium text-brand-900">{customer.name}</span>
              <span className="text-xs text-brand-300">· You</span>
            </div>
            <span className="text-xs text-brand-400">
              {new Date(ticket.createdAt).toLocaleDateString("en-US", {
                month: "short", day: "numeric", year: "numeric",
              })}
            </span>
          </div>
          <p className="text-sm text-brand-700 whitespace-pre-wrap">{ticket.description}</p>
        </div>

        {/* Comments */}
        {ticket.comments.map((c) => {
          const isAdmin = c.author === "admin";
          return (
            <div key={c.id}
              className={`rounded-2xl border p-5 ${isAdmin
                ? "bg-brand-50/60 border-brand-100"
                : "bg-white border-brand-100"}`}>
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-2">
                  <div className={`h-7 w-7 rounded-full flex items-center justify-center text-xs font-semibold ${
                    isAdmin ? "bg-accent/10 text-accent" : "bg-brand-100 text-brand-600"
                  }`}>
                    {c.authorName.charAt(0).toUpperCase()}
                  </div>
                  <span className="text-sm font-medium text-brand-900">{c.authorName}</span>
                  {isAdmin && (
                    <span className="text-xs bg-accent/10 text-accent px-1.5 py-0.5 rounded-md">SuitePacific</span>
                  )}
                </div>
                <span className="text-xs text-brand-400">
                  {new Date(c.createdAt).toLocaleDateString("en-US", {
                    month: "short", day: "numeric", year: "numeric",
                  })}
                </span>
              </div>
              <p className="text-sm text-brand-700 whitespace-pre-wrap">{c.body}</p>
            </div>
          );
        })}
      </div>

      {/* Reply */}
      {canReply ? (
        <CustomerReplyForm ticketId={ticket.id} />
      ) : (
        <div className="bg-brand-50 rounded-2xl px-5 py-4 text-center">
          <p className="text-sm text-brand-400">This ticket is closed.</p>
          <Link href="/customer-portal/tickets/new" className="text-xs text-accent hover:underline mt-1 inline-block">
            Submit a new request
          </Link>
        </div>
      )}
    </div>
  );
}

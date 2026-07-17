import { prisma } from "@/lib/prisma";
import { notFound } from "next/navigation";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { TicketStatusBadge } from "@/components/portal/TicketStatusBadge";
import { TicketPriorityBadge } from "@/components/portal/TicketPriorityBadge";
import { AdminTicketUpdateForm } from "@/components/admin/AdminTicketUpdateForm";
import { AdminTicketReplyForm } from "@/components/admin/AdminTicketReplyForm";
import { archiveTicketAction } from "@/app/admin/(dashboard)/tickets/actions";

const TYPE_LABELS: Record<string, string> = {
  SUPPORT: "Support Issue", DEVELOPMENT: "Development Request",
  QUESTION: "Question", OPTIMIZATION: "Optimisation",
};

export default async function AdminTicketDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;

  const ticket = await prisma.ticket.findUnique({
    where: { id },
    include: {
      customer: true,
      comments: { orderBy: { createdAt: "asc" } },
    },
  });
  if (!ticket) notFound();

  const isArchived = !!ticket.archivedAt;

  return (
    <div className="max-w-4xl">
      <Link href="/admin/tickets"
        className="inline-flex items-center gap-1.5 text-sm text-brand-400 hover:text-brand-900 mb-6">
        <ArrowLeft className="h-3.5 w-3.5" />
        Back to Tickets
      </Link>

      <div className="flex items-start justify-between gap-4 mb-8">
        <div className="flex-1 min-w-0">
          <h1 className="text-2xl font-semibold text-brand-900 leading-tight">{ticket.title}</h1>
          <div className="flex items-center gap-2 mt-2 flex-wrap">
            <TicketStatusBadge status={ticket.status} />
            <TicketPriorityBadge priority={ticket.priority} />
            <span className="text-xs text-brand-300">·</span>
            <span className="text-xs text-brand-500">{TYPE_LABELS[ticket.type]}</span>
            <span className="text-xs text-brand-300">·</span>
            <Link href={`/admin/customers/${ticket.customerId}`} className="text-xs text-accent hover:underline">
              {ticket.customer.name} · {ticket.customer.company}
            </Link>
            {ticket.assignedTo && (
              <>
                <span className="text-xs text-brand-300">·</span>
                <span className="text-xs text-brand-500">→ {ticket.assignedTo}</span>
              </>
            )}
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Thread (left/main) */}
        <div className="lg:col-span-2 space-y-4">
          {/* Original */}
          <div className="bg-white rounded-2xl border border-brand-100 p-5">
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-2">
                <div className="h-7 w-7 rounded-full bg-brand-100 flex items-center justify-center text-xs font-semibold text-brand-600">
                  {ticket.customer.name.charAt(0).toUpperCase()}
                </div>
                <span className="text-sm font-medium text-brand-900">{ticket.customer.name}</span>
                <span className="text-xs text-brand-400">{ticket.customer.company}</span>
              </div>
              <span className="text-xs text-brand-400">
                {new Date(ticket.createdAt).toLocaleDateString("en-US", {
                  month: "short", day: "numeric", year: "numeric", hour: "2-digit", minute: "2-digit",
                })}
              </span>
            </div>
            <p className="text-sm text-brand-700 whitespace-pre-wrap">{ticket.description}</p>
          </div>

          {/* Comments */}
          {ticket.comments.map((c) => {
            const isInternal = c.isInternal;
            const isAdmin = c.author === "admin";
            return (
              <div key={c.id}
                className={`rounded-2xl border p-5 ${isInternal
                  ? "bg-yellow-50/60 border-yellow-100"
                  : isAdmin
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
                    {isInternal && (
                      <span className="text-xs bg-yellow-100 text-yellow-700 px-1.5 py-0.5 rounded-md">Internal note</span>
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

          {/* Reply form */}
          {!isArchived && <AdminTicketReplyForm ticketId={ticket.id} />}
        </div>

        {/* Sidebar (right) */}
        <div className="space-y-4">
          <AdminTicketUpdateForm
            id={ticket.id}
            defaults={{
              status: ticket.status,
              priority: ticket.priority,
              type: ticket.type,
              assignedTo: ticket.assignedTo ?? "",
              internalNotes: ticket.internalNotes ?? "",
            }}
          />

          {!isArchived && (
            <div className="bg-red-50 border border-red-100 rounded-2xl p-4">
              <p className="text-xs font-semibold text-red-800 mb-2">Archive Ticket</p>
              <p className="text-xs text-red-600 mb-3">Closes and hides the ticket from active lists.</p>
              <form action={archiveTicketAction.bind(null, ticket.id)}>
                <button type="submit"
                  className="text-xs px-3 py-1.5 rounded-full bg-red-600 text-white hover:bg-red-700 transition-colors">
                  Archive
                </button>
              </form>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

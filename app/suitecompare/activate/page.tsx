import { prisma } from "@/lib/prisma";
import Link from "next/link";
import { ActivateForm } from "./ActivateForm";
import { CheckCircle2, XCircle } from "lucide-react";

interface Props {
  searchParams: Promise<{ token?: string }>;
}

function Shell({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-brand-50/40 flex items-center justify-center px-4">
      <div className="w-full max-w-sm text-center bg-white rounded-2xl border border-brand-100 shadow-soft p-10">
        {children}
      </div>
    </div>
  );
}

export default async function ActivatePage({ searchParams }: Props) {
  const { token } = await searchParams;

  if (!token) {
    return (
      <Shell>
        <XCircle className="h-10 w-10 text-red-400 mx-auto mb-4" />
        <h1 className="text-lg font-semibold text-brand-900 mb-2">Invalid link</h1>
        <p className="text-sm text-brand-400">This activation link is missing or malformed.</p>
      </Shell>
    );
  }

  const invite = await prisma.scAdminInvite.findUnique({ where: { token } });

  if (!invite) {
    return (
      <Shell>
        <XCircle className="h-10 w-10 text-red-400 mx-auto mb-4" />
        <h1 className="text-lg font-semibold text-brand-900 mb-2">Link not found</h1>
        <p className="text-sm text-brand-400">This activation link doesn&apos;t exist. It may have already been cancelled.</p>
      </Shell>
    );
  }

  if (invite.activatedAt) {
    return (
      <Shell>
        <CheckCircle2 className="h-10 w-10 text-emerald-500 mx-auto mb-4" />
        <h1 className="text-lg font-semibold text-brand-900 mb-2">Already activated</h1>
        <p className="text-sm text-brand-400 mb-6">This account has already been activated. Log in to continue.</p>
        <Link
          href="/suitecompare/login"
          className="inline-block rounded-full bg-accent px-6 py-2.5 text-sm font-semibold text-white hover:opacity-90 transition-opacity"
        >
          Go to login
        </Link>
      </Shell>
    );
  }

  if (invite.expiresAt < new Date()) {
    return (
      <Shell>
        <XCircle className="h-10 w-10 text-brand-300 mx-auto mb-4" />
        <h1 className="text-lg font-semibold text-brand-900 mb-2">Link expired</h1>
        <p className="text-sm text-brand-400">This activation link has expired. Please contact SuitePacific for a new one.</p>
        <a href="mailto:info@suitepacific.com" className="mt-5 inline-block text-sm font-medium text-accent hover:underline">
          Contact SuitePacific
        </a>
      </Shell>
    );
  }

  return (
    <ActivateForm
      token={token}
      email={invite.email}
      plan={invite.plan}
      seatLimit={invite.seatLimit}
      clientLimit={invite.clientLimit}
      requirePayment={invite.requirePayment}
    />
  );
}

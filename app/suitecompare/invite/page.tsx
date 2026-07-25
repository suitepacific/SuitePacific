import { redirect } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { getScUserFromRequest } from "@/lib/sc-auth";
import { AcceptInviteForm } from "./AcceptInviteForm";
import { SignupViaInviteForm } from "./SignupViaInviteForm";
import { GitCompare, AlertCircle } from "lucide-react";
import Link from "next/link";

interface Props {
  searchParams: Promise<{ token?: string }>;
}

export default async function InvitePage({ searchParams }: Props) {
  const { token } = await searchParams;

  if (!token) redirect("/suitecompare/login");

  const invite = await prisma.scInvite.findUnique({
    where: { token },
    include: { org: true },
  });

  const isInvalid = !invite || invite.usedAt || invite.expiresAt < new Date();

  const currentUser = await getScUserFromRequest();

  return (
    <div className="min-h-screen bg-brand-50/40 flex items-center justify-center px-4 py-12">
      <div className="w-full max-w-sm">
        <div className="mb-8 text-center">
          <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-accent/10">
            <GitCompare className="h-6 w-6 text-accent" />
          </div>
          <h1 className="text-xl font-semibold text-brand-900">Team invitation</h1>
          {!isInvalid && (
            <p className="mt-1 text-sm text-brand-400">
              You&apos;ve been invited to join <strong className="text-brand-700">{invite!.org.name}</strong>
            </p>
          )}
        </div>

        {isInvalid ? (
          <div className="bg-white rounded-2xl border border-brand-100 shadow-soft p-7 text-center">
            <AlertCircle className="h-8 w-8 text-red-400 mx-auto mb-3" />
            <p className="text-sm font-medium text-brand-900 mb-1">Invite link invalid or expired</p>
            <p className="text-xs text-brand-400 mb-5">
              This invite link has already been used or has expired. Ask your team admin to send a new one.
            </p>
            <Link
              href="/suitecompare/login"
              className="text-sm text-accent hover:underline"
            >
              Go to sign in
            </Link>
          </div>
        ) : currentUser ? (
          // Already logged in: one-click accept
          <div className="bg-white rounded-2xl border border-brand-100 shadow-soft p-7">
            <p className="text-sm text-brand-600 mb-5 text-center">
              Signed in as <strong className="text-brand-900">{currentUser.email}</strong>. Accept the invitation below.
            </p>
            <AcceptInviteForm token={token} />
          </div>
        ) : (
          // Not logged in: show signup form, link to login
          <div className="bg-white rounded-2xl border border-brand-100 shadow-soft p-7">
            <SignupViaInviteForm token={token} invitedEmail={invite!.email} />
            <p className="mt-5 text-center text-xs text-brand-400">
              Already have an account?{" "}
              <Link href={`/suitecompare/login?invite=${token}`} className="text-accent hover:underline">
                Sign in to accept
              </Link>
            </p>
          </div>
        )}
      </div>
    </div>
  );
}

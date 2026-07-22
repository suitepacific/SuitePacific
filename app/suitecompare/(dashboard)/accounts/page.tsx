import { requireScUser } from "@/lib/sc-auth";
import { prisma } from "@/lib/prisma";
import Link from "next/link";
import { Building2, Plus, GitCompare, FileCode2, Lock } from "lucide-react";
import { EnvironmentBadge } from "@/components/suitecompare/EnvironmentBadge";
import { getClientLimit } from "@/lib/sc-plans";

export default async function AccountsPage() {
  const user = await requireScUser();

  const membership = await prisma.scOrgMember.findFirst({
    where: { userId: user.id },
    include: {
      org: {
        include: {
          nsAccounts: {
            where: { archivedAt: null },
            orderBy: { createdAt: "asc" },
            include: {
              environments: {
                include: {
                  _count: { select: { scripts: true } },
                },
              },
            },
          },
        },
      },
    },
  });

  const accounts = membership?.org.nsAccounts ?? [];
  const clientLimit = getClientLimit(membership?.org.plan ?? "free", membership?.org.clientLimitOverride ?? null);
  const addLocked = accounts.length >= clientLimit;

  return (
    <div className="max-w-4xl">
      <div className="mb-8 flex items-start justify-between gap-4">
        <div>
          <h1 className="text-2xl font-semibold text-brand-900">Accounts</h1>
          <p className="mt-1 text-sm text-brand-400">
            NetSuite accounts connected to your workspace
          </p>
        </div>
        {addLocked ? (
          <Link
            href="/suitecompare/pricing"
            className="inline-flex items-center gap-2 rounded-full bg-brand-100 px-4 py-2 text-sm font-medium text-brand-400 hover:bg-brand-200 hover:text-brand-600 transition-colors shrink-0"
            title="View upgrade options"
          >
            <Lock className="h-4 w-4" />
            Add Account
          </Link>
        ) : (
          <Link
            href="/suitecompare/accounts/new"
            className="inline-flex items-center gap-2 rounded-full bg-accent px-4 py-2 text-sm font-medium text-white hover:bg-accent/90 transition-colors shrink-0"
          >
            <Plus className="h-4 w-4" />
            Add Account
          </Link>
        )}
      </div>

      {accounts.length === 0 ? (
        <div className="rounded-2xl border-2 border-dashed border-brand-100 p-12 text-center">
          <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-brand-50">
            <Building2 className="h-6 w-6 text-brand-300" />
          </div>
          <h2 className="text-base font-semibold text-brand-700">No accounts yet</h2>
          <p className="mt-1.5 text-sm text-brand-400 max-w-xs mx-auto">
            Add a NetSuite account to start browsing and comparing SuiteScript files.
          </p>
          <Link
            href="/suitecompare/accounts/new"
            className="mt-6 inline-flex items-center gap-2 rounded-full bg-accent px-5 py-2.5 text-sm font-medium text-white hover:bg-accent/90 transition-colors"
          >
            <Plus className="h-4 w-4" />
            Add your first account
          </Link>
        </div>
      ) : (
        <div className="grid sm:grid-cols-2 gap-4">
          {accounts.map((account) => {
            const scriptTotal = account.environments.reduce(
              (s, env) => s + env._count.scripts,
              0
            );
            return (
              <Link
                key={account.id}
                href={`/suitecompare/accounts/${account.id}`}
                className="group bg-white rounded-2xl border border-brand-50 shadow-soft p-5 hover:border-accent/30 hover:shadow-md transition-all"
              >
                <div className="flex items-start justify-between gap-2 mb-3">
                  <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-accent/10 shrink-0">
                    <Building2 className="h-4.5 w-4.5 text-accent" />
                  </div>
                  <span className="text-xs font-mono text-brand-300 mt-1">
                    {account.nsAccountId}
                  </span>
                </div>
                <p className="font-semibold text-brand-900 group-hover:text-accent transition-colors">
                  {account.name}
                </p>
                <div className="mt-3 flex flex-wrap gap-1.5">
                  {account.environments.map((env) => (
                    <EnvironmentBadge key={env.id} type={env.type} />
                  ))}
                </div>
                <div className="mt-3 pt-3 border-t border-brand-50 flex items-center justify-between text-xs text-brand-400">
                  <span className="flex items-center gap-1">
                    <GitCompare className="h-3 w-3" />
                    {account.environments.length} environments
                  </span>
                  <span className="flex items-center gap-1">
                    <FileCode2 className="h-3 w-3" />
                    {scriptTotal} scripts
                  </span>
                </div>
              </Link>
            );
          })}

          {addLocked ? (
            <Link
              href="/suitecompare/pricing"
              className="rounded-2xl border-2 border-dashed border-brand-100 p-5 flex flex-col items-center justify-center text-center gap-2 min-h-[160px] hover:border-accent/20 hover:bg-accent/5 transition-all group"
            >
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-brand-100 group-hover:bg-accent/10 transition-colors">
                <Lock className="h-4 w-4 text-brand-400 group-hover:text-accent transition-colors" />
              </div>
              <p className="text-sm font-medium text-brand-400 group-hover:text-accent transition-colors">Upgrade plan</p>
              <p className="text-xs text-brand-300">View pricing to add more clients</p>
            </Link>
          ) : (
            <Link
              href="/suitecompare/accounts/new"
              className="rounded-2xl border-2 border-dashed border-brand-100 p-5 flex flex-col items-center justify-center text-center gap-2 min-h-[160px] hover:border-accent/30 hover:bg-accent/5 transition-all group"
            >
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-brand-100 group-hover:bg-accent/10 transition-colors">
                <Plus className="h-4 w-4 text-brand-400 group-hover:text-accent transition-colors" />
              </div>
              <p className="text-sm font-medium text-brand-400 group-hover:text-accent transition-colors">
                Add NetSuite Account
              </p>
            </Link>
          )}
        </div>
      )}
    </div>
  );
}

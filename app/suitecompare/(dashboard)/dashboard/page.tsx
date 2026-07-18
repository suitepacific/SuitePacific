import { requireScUser } from "@/lib/sc-auth";
import { prisma } from "@/lib/prisma";
import Link from "next/link";
import {
  Building2,
  Plus,
  FileCode2,
  Shield,
  Lock,
  Eye,
  Users,
  ClipboardList,
  BadgeCheck,
} from "lucide-react";
import { EnvironmentBadge } from "@/components/suitecompare/EnvironmentBadge";

const TRUST_ITEMS = [
  {
    icon: Shield,
    title: "Token-Based Authentication",
    body: "We connect to NetSuite using TBA only. No admin passwords are ever requested or stored.",
  },
  {
    icon: Lock,
    title: "Credentials encrypted at rest",
    body: "OAuth tokens are AES-encrypted before being written to the database. They are never logged.",
  },
  {
    icon: Eye,
    title: "Read-only access",
    body: "SuiteCompare only reads script content. No write, update, or delete operations are ever performed on your NetSuite account.",
  },
  {
    icon: Users,
    title: "Complete account isolation",
    body: "Each organization is fully isolated. Your scripts never appear in another tenant&apos;s workspace — at the data layer, not just the UI layer.",
  },
  {
    icon: ClipboardList,
    title: "Full audit trail",
    body: "Every script browse is timestamped and attributed to the user who triggered it. You always know who accessed what.",
  },
  {
    icon: BadgeCheck,
    title: "No third-party data sharing",
    body: "Your NetSuite script content stays between you and your instance. We never resell, analyze, or share it with any third party.",
  },
];

export default async function DashboardPage() {
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
  const plan = membership?.org.plan ?? "free";
  const addAccountLocked = plan === "free" && accounts.length >= 1;
  const totalScripts = accounts.reduce(
    (sum, acct) =>
      sum + acct.environments.reduce((s, env) => s + env._count.scripts, 0),
    0
  );

  return (
    <div className="max-w-4xl">
      <div className="mb-8 flex items-start justify-between gap-4">
        <div>
          <h1 className="text-2xl font-semibold text-brand-900">Dashboard</h1>
          <p className="mt-1 text-sm text-brand-400">
            Your clients and connected environments
          </p>
        </div>
        {addAccountLocked ? (
          <span
            title="Upgrade to add more clients"
            className="inline-flex items-center gap-2 rounded-full bg-brand-100 px-4 py-2 text-sm font-medium text-brand-400 cursor-not-allowed shrink-0"
          >
            <Lock className="h-4 w-4" />
            Add Client
          </span>
        ) : (
          <Link
            href="/suitecompare/accounts/new"
            className="inline-flex items-center gap-2 rounded-full bg-accent px-4 py-2 text-sm font-medium text-white hover:bg-accent/90 transition-colors shrink-0"
          >
            <Plus className="h-4 w-4" />
            Add Client
          </Link>
        )}
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 gap-4 mb-8">
        <div className="bg-white rounded-2xl border border-brand-50 shadow-soft p-5">
          <div className="flex items-center gap-2 text-brand-400 text-xs font-medium mb-1">
            <Building2 className="h-3.5 w-3.5" />
            Clients
          </div>
          <p className="text-2xl font-semibold text-brand-900">{accounts.length}</p>
          <p className="text-xs text-brand-300 mt-0.5">connected</p>
        </div>
        <div className="bg-white rounded-2xl border border-brand-50 shadow-soft p-5">
          <div className="flex items-center gap-2 text-brand-400 text-xs font-medium mb-1">
            <FileCode2 className="h-3.5 w-3.5" />
            Scripts Browsed
          </div>
          <p className="text-2xl font-semibold text-brand-900">{totalScripts}</p>
          <p className="text-xs text-brand-300 mt-0.5">across all clients</p>
        </div>
      </div>

      {/* Account cards */}
      {accounts.length === 0 ? (
        <div className="rounded-2xl border-2 border-dashed border-brand-100 p-12 text-center">
          <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-brand-50">
            <Building2 className="h-6 w-6 text-brand-300" />
          </div>
          <h2 className="text-base font-semibold text-brand-700">No clients yet</h2>
          <p className="mt-1.5 text-sm text-brand-400 max-w-xs mx-auto">
            Add a client to start browsing and comparing SuiteScript files.
          </p>
          <Link
            href="/suitecompare/accounts/new"
            className="mt-6 inline-flex items-center gap-2 rounded-full bg-accent px-5 py-2.5 text-sm font-medium text-white hover:bg-accent/90 transition-colors"
          >
            <Plus className="h-4 w-4" />
            Add your first client
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
                  <span>{account.environments.length} environments</span>
                  <span>{scriptTotal} scripts browsed</span>
                </div>
              </Link>
            );
          })}

          {/* Add account card */}
          {addAccountLocked ? (
            <div className="rounded-2xl border-2 border-dashed border-brand-100 p-5 flex flex-col items-center justify-center text-center gap-2 min-h-[160px] opacity-60 cursor-not-allowed">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-brand-100">
                <Lock className="h-4 w-4 text-brand-400" />
              </div>
              <p className="text-sm font-medium text-brand-400">Add Client</p>
              <p className="text-xs text-brand-300">Upgrade to add more clients</p>
            </div>
          ) : (
            <Link
              href="/suitecompare/accounts/new"
              className="rounded-2xl border-2 border-dashed border-brand-100 p-5 flex flex-col items-center justify-center text-center gap-2 min-h-[160px] hover:border-accent/30 hover:bg-accent/5 transition-all group"
            >
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-brand-100 group-hover:bg-accent/10 transition-colors">
                <Plus className="h-4 w-4 text-brand-400 group-hover:text-accent transition-colors" />
              </div>
              <p className="text-sm font-medium text-brand-400 group-hover:text-accent transition-colors">
                Add Client
              </p>
            </Link>
          )}
        </div>
      )}

      {/* Security trust panel */}
      <div className="mt-12">
        <h2 className="text-sm font-semibold text-brand-900 mb-1">Security &amp; Privacy</h2>
        <p className="text-xs text-brand-400 mb-5">
          How SuiteCompare protects your NetSuite data
        </p>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {TRUST_ITEMS.map((item) => (
            <div
              key={item.title}
              className="bg-white rounded-2xl border border-brand-50 shadow-soft p-4 flex gap-3"
            >
              <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-emerald-50 shrink-0 mt-0.5">
                <item.icon className="h-3.5 w-3.5 text-emerald-600" />
              </div>
              <div>
                <p className="text-xs font-semibold text-brand-900">{item.title}</p>
                <p
                  className="mt-0.5 text-xs text-brand-400 leading-relaxed"
                  dangerouslySetInnerHTML={{ __html: item.body }}
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

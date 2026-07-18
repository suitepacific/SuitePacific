import { requireScUser } from "@/lib/sc-auth";
import { prisma } from "@/lib/prisma";
import { notFound } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, GitCompare, FileCode2 } from "lucide-react";
import { EnvironmentBadge } from "@/components/suitecompare/EnvironmentBadge";
import { ScriptTypeBadge } from "@/components/suitecompare/ScriptTypeBadge";
import { BrowseScriptForm } from "./BrowseScriptForm";
import { EnvironmentConfig } from "./EnvironmentConfig";
import { AddSandboxForm } from "./AddSandboxForm";

type Props = {
  params: Promise<{ id: string }>;
};

function formatDate(date: Date): string {
  return date.toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
}

export default async function AccountPage({ params }: Props) {
  const user = await requireScUser();
  const { id } = await params;

  const membership = await prisma.scOrgMember.findFirst({
    where: { userId: user.id },
    include: { org: true },
  });
  if (!membership) notFound();

  const account = await prisma.scNetSuiteAccount.findFirst({
    where: { id, orgId: membership.orgId, archivedAt: null },
    include: {
      environments: {
        orderBy: [{ type: "asc" }, { createdAt: "asc" }],
        include: {
          scripts: { orderBy: { browsedAt: "desc" } },
          _count: { select: { scripts: true } },
        },
      },
    },
  });
  if (!account) notFound();

  const productionEnv = account.environments.find((e) => e.type === "production");
  const sandboxEnvs = account.environments.filter((e) => e.type !== "production");

  // Deduplicated scripts keyed by scriptId
  const scriptMap = new Map<
    string,
    { scriptId: string; name: string; scriptType: string; browsedAt: Date }
  >();
  for (const env of account.environments) {
    for (const script of env.scripts) {
      if (!scriptMap.has(script.scriptId)) {
        scriptMap.set(script.scriptId, {
          scriptId: script.scriptId,
          name: script.name,
          scriptType: script.scriptType,
          browsedAt: script.browsedAt,
        });
      }
    }
  }
  const scripts = Array.from(scriptMap.values()).sort(
    (a, b) => b.browsedAt.getTime() - a.browsedAt.getTime()
  );

  const compareBase =
    productionEnv && sandboxEnvs[0]
      ? `?left=${productionEnv.id}&right=${sandboxEnvs[0].id}`
      : null;

  return (
    <div className="max-w-4xl">
      {/* Header */}
      <div className="mb-8">
        <Link
          href="/suitecompare/dashboard"
          className="inline-flex items-center gap-1.5 text-xs text-brand-400 hover:text-brand-700 mb-4 transition-colors"
        >
          <ArrowLeft className="h-3 w-3" />
          Dashboard
        </Link>
        <h1 className="text-2xl font-semibold text-brand-900">{account.name}</h1>
        <p className="mt-0.5 text-sm font-mono text-brand-400">
          Account ID: {account.nsAccountId}
        </p>
      </div>

      {/* Environments */}
      <div className="mb-8">
        <h2 className="text-sm font-semibold text-brand-900 mb-3">Environments</h2>
        <div className="grid sm:grid-cols-3 gap-3">
          {account.environments.map((env) => (
            <div
              key={env.id}
              className="bg-white rounded-2xl border border-brand-50 shadow-soft p-4"
            >
              {/* Top row: badge + config button */}
              <div className="flex items-center justify-between mb-2">
                <EnvironmentBadge type={env.type} />
                <EnvironmentConfig
                env={{
                  id: env.id,
                  name: env.name,
                  type: env.type,
                  nsEnvAccountId: env.nsEnvAccountId,
                  credentialsConfigured: !!(env.consumerKey && env.consumerSecret && env.tokenKey && env.tokenSecret),
                }}
              />
              </div>

              {/* Name */}
              <p className="font-medium text-brand-900 text-sm">{env.name}</p>

              {/* NS Account ID if set */}
              {env.nsEnvAccountId && (
                <p className="mt-0.5 text-xs font-mono text-brand-300 truncate">
                  {env.nsEnvAccountId}
                </p>
              )}

              {/* Status row */}
              <div className="mt-2.5 flex items-center justify-between text-xs">
                <span className="flex items-center gap-1.5 text-brand-400">
                  <span
                    className={`h-1.5 w-1.5 rounded-full ${
                      env.tokenKey ? "bg-emerald-400" : "bg-brand-200"
                    }`}
                  />
                  {env.tokenKey ? "Connected" : "Not configured"}
                </span>
                <span className="text-brand-300">{env._count.scripts} scripts</span>
              </div>
            </div>
          ))}

          {/* Add sandbox card */}
          <AddSandboxForm
            accountId={account.id}
            planLimited={membership.org.plan === "free" && account.environments.length >= 2}
          />
        </div>
      </div>

      {/* Browse script */}
      <div className="mb-8">
        <h2 className="text-sm font-semibold text-brand-900 mb-1">Browse a Script</h2>
        <p className="text-xs text-brand-400 mb-3">
          Enter a Script ID to fetch it across all connected environments.
        </p>
        <BrowseScriptForm accountId={account.id} />
      </div>

      {/* Scripts list */}
      <div>
        <div className="flex items-center gap-2 mb-3">
          <h2 className="text-sm font-semibold text-brand-900">Browsed Scripts</h2>
          {scripts.length > 0 && (
            <span className="text-xs text-brand-400">({scripts.length})</span>
          )}
        </div>

        {scripts.length === 0 ? (
          <div className="rounded-2xl border-2 border-dashed border-brand-100 p-10 text-center">
            <div className="mx-auto mb-3 flex h-10 w-10 items-center justify-center rounded-xl bg-brand-50">
              <FileCode2 className="h-5 w-5 text-brand-300" />
            </div>
            <p className="text-sm font-medium text-brand-700">No scripts yet</p>
            <p className="mt-1 text-xs text-brand-400">
              Enter a Script ID above to browse your first script.
            </p>
          </div>
        ) : (
          <div className="bg-white rounded-2xl border border-brand-50 shadow-soft overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-brand-50 bg-brand-50/60">
                    <th className="text-left px-5 py-3 text-xs font-semibold text-brand-400 uppercase tracking-wide">
                      Script Name
                    </th>
                    <th className="text-left px-5 py-3 text-xs font-semibold text-brand-400 uppercase tracking-wide">
                      Script ID
                    </th>
                    <th className="text-left px-5 py-3 text-xs font-semibold text-brand-400 uppercase tracking-wide">
                      Type
                    </th>
                    <th className="text-left px-5 py-3 text-xs font-semibold text-brand-400 uppercase tracking-wide">
                      Last Browsed
                    </th>
                    <th className="px-5 py-3" />
                  </tr>
                </thead>
                <tbody className="divide-y divide-brand-50">
                  {scripts.map((script) => (
                    <tr
                      key={script.scriptId}
                      className="hover:bg-brand-50/40 transition-colors"
                    >
                      <td className="px-5 py-3.5 font-medium text-brand-900">
                        {script.name}
                      </td>
                      <td className="px-5 py-3.5">
                        <span className="font-mono text-xs text-brand-400">
                          {script.scriptId}
                        </span>
                      </td>
                      <td className="px-5 py-3.5">
                        <ScriptTypeBadge type={script.scriptType} />
                      </td>
                      <td className="px-5 py-3.5 text-brand-400 text-xs">
                        {formatDate(script.browsedAt)}
                      </td>
                      <td className="px-5 py-3.5 text-right">
                        {compareBase ? (
                          <Link
                            href={`/suitecompare/accounts/${account.id}/compare${compareBase}&script=${encodeURIComponent(script.scriptId)}`}
                            className="inline-flex items-center gap-1 text-xs font-medium text-accent hover:underline"
                          >
                            <GitCompare className="h-3 w-3" />
                            Compare
                          </Link>
                        ) : (
                          <span className="text-xs text-brand-300">Need 2 environments</span>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

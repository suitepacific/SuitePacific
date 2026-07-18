import { requireScUser } from "@/lib/sc-auth";
import { prisma } from "@/lib/prisma";
import { notFound } from "next/navigation";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { DiffViewer } from "@/components/suitecompare/DiffViewer";
import { EnvSelector } from "@/components/suitecompare/EnvSelector";
import { ScriptTypeBadge } from "@/components/suitecompare/ScriptTypeBadge";
import { fetchScriptContent, hasCredentials } from "@/lib/sc-netsuite";
import { getMockContent } from "@/lib/sc-mock";
import { decrypt } from "@/lib/sc-crypto";
import { AlertCircle } from "lucide-react";
import type { ScEnvironment } from "@prisma/client";

type Props = {
  params: Promise<{ id: string }>;
  searchParams: Promise<{ script?: string; left?: string; right?: string }>;
};

type ContentResult = { ok: true; content: string } | { ok: false; error: string };

async function getContent(env: ScEnvironment, scriptId: string): Promise<ContentResult> {
  if (hasCredentials(env)) {
    try {
      const content = await fetchScriptContent(
        {
          nsEnvAccountId: env.nsEnvAccountId!,
          consumerKey: decrypt(env.consumerKey!),
          consumerSecret: decrypt(env.consumerSecret!),
          tokenKey: decrypt(env.tokenKey!),
          tokenSecret: decrypt(env.tokenSecret!),
        },
        scriptId
      );
      return { ok: true, content };
    } catch (err) {
      return { ok: false, error: err instanceof Error ? err.message : "Failed to fetch script." };
    }
  }
  return { ok: true, content: getMockContent(scriptId, env.type) };
}

export default async function AccountComparePage({ params, searchParams }: Props) {
  const user = await requireScUser();
  const { id: accountId } = await params;
  const { script: scriptId, left: leftEnvId, right: rightEnvId } = await searchParams;

  if (!scriptId || !leftEnvId || !rightEnvId) notFound();

  const membership = await prisma.scOrgMember.findFirst({ where: { userId: user.id } });
  if (!membership) notFound();

  const account = await prisma.scNetSuiteAccount.findFirst({
    where: { id: accountId, orgId: membership.orgId, archivedAt: null },
  });
  if (!account) notFound();

  const [leftScript, rightScript, allEnvScripts] = await Promise.all([
    // Scope to this account to prevent cross-tenant access via crafted URLs
    prisma.scScript.findFirst({
      where: { scriptId, environmentId: leftEnvId, environment: { scAccountId: accountId } },
      include: { environment: true },
    }),
    prisma.scScript.findFirst({
      where: { scriptId, environmentId: rightEnvId, environment: { scAccountId: accountId } },
      include: { environment: true },
    }),
    prisma.scScript.findMany({
      where: { scriptId, environment: { scAccountId: accountId } },
      include: { environment: true },
    }),
  ]);

  if (!leftScript || !rightScript) notFound();

  // Fetch content live from NetSuite (falls back to mock if credentials not configured)
  const [leftResult, rightResult] = await Promise.all([
    getContent(leftScript.environment, scriptId),
    getContent(rightScript.environment, scriptId),
  ]);

  const envOptions = allEnvScripts
    .sort((a, b) => a.environment.type.localeCompare(b.environment.type))
    .map((s) => ({ id: s.environment.id, name: s.environment.name, type: s.environment.type }));

  const hasError = !leftResult.ok || !rightResult.ok;

  const header = (
    <div className="mb-6">
      <Link
        href={`/suitecompare/accounts/${accountId}`}
        className="inline-flex items-center gap-1.5 text-xs text-brand-400 hover:text-brand-700 mb-2"
      >
        <ArrowLeft className="h-3 w-3" />
        {account.name}
      </Link>
      <h1 className="text-xl font-semibold text-brand-900">{leftScript.name}</h1>
      <div className="flex items-center gap-2 mt-1">
        <span className="font-mono text-xs text-brand-400">{scriptId}</span>
        <ScriptTypeBadge type={leftScript.scriptType} />
      </div>
    </div>
  );

  const envSelector = (
    <div className="mb-4">
      <EnvSelector
        envs={envOptions}
        leftEnvId={leftEnvId}
        rightEnvId={rightEnvId}
        scriptId={scriptId}
      />
    </div>
  );

  if (hasError) {
    const errors: { label: string; message: string }[] = [];
    if (!leftResult.ok) errors.push({ label: leftScript.environment.name, message: leftResult.error });
    if (!rightResult.ok) errors.push({ label: rightScript.environment.name, message: rightResult.error });

    return (
      <div className="max-w-full">
        {header}
        {envSelector}
        <div className="rounded-xl border border-red-100 bg-red-50 p-5">
          <div className="flex gap-3">
            <AlertCircle className="h-5 w-5 text-red-500 shrink-0 mt-0.5" />
            <div>
              <p className="text-sm font-semibold text-red-800 mb-2">
                Could not load script content
              </p>
              <ul className="space-y-1">
                {errors.map((e) => (
                  <li key={e.label} className="text-sm text-red-700">
                    <span className="font-medium">{e.label}:</span> {e.message}
                  </li>
                ))}
              </ul>
              <Link
                href={`/suitecompare/accounts/${accountId}`}
                className="mt-3 inline-block text-xs text-red-600 hover:underline"
              >
                Configure credentials →
              </Link>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-full">
      {header}
      {envSelector}
      {/* key resets transfer state when env pair changes */}
      <DiffViewer
        key={`${leftEnvId}-${rightEnvId}`}
        left={leftResult.content}
        right={rightResult.content}
        leftLabel={leftScript.environment.name}
        rightLabel={rightScript.environment.name}
        leftType={leftScript.environment.type}
        rightType={rightScript.environment.type}
      />
    </div>
  );
}

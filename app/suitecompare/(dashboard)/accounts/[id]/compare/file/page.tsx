import { requireScUser } from "@/lib/sc-auth";
import { prisma } from "@/lib/prisma";
import { notFound } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, AlertCircle } from "lucide-react";
import { DiffViewer } from "@/components/suitecompare/DiffViewer";
import { EnvSelector } from "@/components/suitecompare/EnvSelector";
import { CodePane } from "@/components/suitecompare/CodePane";
import { fetchTemplateContent, hasCredentials, type NsCredentials } from "@/lib/sc-netsuite";
import { decrypt } from "@/lib/sc-crypto";
import type { ScEnvironment } from "@prisma/client";

type Props = {
  params: Promise<{ id: string }>;
  searchParams: Promise<{ template?: string; left?: string; right?: string }>;
};

type ContentResult =
  | { ok: true; content: string }
  | { ok: false; error: string; unconfigured?: true };

function getCreds(env: ScEnvironment): NsCredentials | null {
  if (!hasCredentials(env)) return null;
  return {
    nsEnvAccountId: env.nsEnvAccountId!,
    consumerKey: decrypt(env.consumerKey!),
    consumerSecret: decrypt(env.consumerSecret!),
    tokenKey: decrypt(env.tokenKey!),
    tokenSecret: decrypt(env.tokenSecret!),
  };
}

async function getContent(env: ScEnvironment, scriptId: string): Promise<ContentResult> {
  const creds = getCreds(env);
  if (!creds) return { ok: false, error: "Not connected to NetSuite.", unconfigured: true };
  try {
    return { ok: true, content: await fetchTemplateContent(creds, scriptId) };
  } catch (err) {
    return { ok: false, error: err instanceof Error ? err.message : "Failed to fetch file." };
  }
}

export default async function FileComparePage({ params, searchParams }: Props) {
  const user = await requireScUser();
  const { id: accountId } = await params;
  const { template: scriptId, left: leftEnvId, right: rightEnvId } = await searchParams;

  if (!scriptId || !leftEnvId || !rightEnvId) notFound();

  const membership = await prisma.scOrgMember.findFirst({
    where: { userId: user.id },
    orderBy: { createdAt: "asc" },
  });
  if (!membership) notFound();

  const account = await prisma.scNetSuiteAccount.findFirst({
    where: { id: accountId, orgId: membership.orgId, archivedAt: null },
  });
  if (!account) notFound();

  const [leftFile, rightFile, allEnvFiles] = await Promise.all([
    prisma.scFile.findFirst({
      where: { scriptId, environmentId: leftEnvId, environment: { scAccountId: accountId } },
      include: { environment: true },
    }),
    prisma.scFile.findFirst({
      where: { scriptId, environmentId: rightEnvId, environment: { scAccountId: accountId } },
      include: { environment: true },
    }),
    prisma.scFile.findMany({
      where: { scriptId, environment: { scAccountId: accountId } },
      include: { environment: true },
    }),
  ]);

  if (!leftFile || !rightFile) notFound();

  const [leftContent, rightContent] = await Promise.all([
    getContent(leftFile.environment, scriptId),
    getContent(rightFile.environment, scriptId),
  ]);

  const envOptions = allEnvFiles
    .sort((a, b) => a.environment.type.localeCompare(b.environment.type))
    .map((f) => ({ id: f.environment.id, name: f.environment.name, type: f.environment.type }));

  const hasBlockingError =
    (!leftContent.ok && !leftContent.unconfigured) ||
    (!rightContent.ok && !rightContent.unconfigured);

  return (
    <div className="max-w-full">
      {/* Header */}
      <div className="mb-4">
        <Link
          href={`/suitecompare/accounts/${accountId}?view=templates`}
          className="inline-flex items-center gap-1.5 text-xs text-brand-400 hover:text-brand-700 mb-2"
        >
          <ArrowLeft className="h-3 w-3" />
          {account.name}
        </Link>
        <h1 className="text-xl font-semibold text-brand-900">{leftFile.name}</h1>
        <p className="font-mono text-xs text-brand-400 mt-1">{scriptId}</p>
      </div>

      {/* Env selector */}
      <div className="mb-4">
        <EnvSelector
          envs={envOptions}
          leftEnvId={leftEnvId}
          rightEnvId={rightEnvId}
          scriptId={scriptId}
          paramName="template"
        />
      </div>

      {/* Diff */}
      {hasBlockingError ? (
        <div className="rounded-xl border border-red-100 bg-red-50 p-5">
          <div className="flex gap-3">
            <AlertCircle className="h-5 w-5 text-red-500 shrink-0 mt-0.5" />
            <div>
              <p className="text-sm font-semibold text-red-800 mb-2">Could not load file content</p>
              <ul className="space-y-1">
                {!leftContent.ok && !leftContent.unconfigured && (
                  <li className="text-sm text-red-700"><span className="font-medium">{leftFile.environment.name}:</span> {leftContent.error}</li>
                )}
                {!rightContent.ok && !rightContent.unconfigured && (
                  <li className="text-sm text-red-700"><span className="font-medium">{rightFile.environment.name}:</span> {rightContent.error}</li>
                )}
              </ul>
              <Link href={`/suitecompare/accounts/${accountId}`} className="mt-3 inline-block text-xs text-red-600 hover:underline">
                Configure credentials →
              </Link>
            </div>
          </div>
        </div>
      ) : leftContent.ok && rightContent.ok ? (
        <DiffViewer
          key={`${leftEnvId}-${rightEnvId}`}
          left={leftContent.content}
          right={rightContent.content}
          leftLabel={leftFile.environment.name}
          rightLabel={rightFile.environment.name}
          leftType={leftFile.environment.type}
          rightType={rightFile.environment.type}
        />
      ) : (
        <div className="flex gap-4 min-h-[400px]">
          {leftContent.ok
            ? <CodePane content={leftContent.content} label={leftFile.environment.name} type={leftFile.environment.type} />
            : (
              <div className="flex-1 min-w-0 rounded-xl border border-brand-100 bg-brand-50/40 flex flex-col items-center justify-center py-16 px-6 text-center">
                <AlertCircle className="h-8 w-8 text-brand-200 mb-3" />
                <p className="text-sm font-medium text-brand-700 mb-1">{leftFile.environment.name} not connected</p>
                <Link href={`/suitecompare/accounts/${accountId}`} className="text-xs font-medium text-accent hover:underline">Configure credentials →</Link>
              </div>
            )
          }
          {rightContent.ok
            ? <CodePane content={rightContent.content} label={rightFile.environment.name} type={rightFile.environment.type} />
            : (
              <div className="flex-1 min-w-0 rounded-xl border border-brand-100 bg-brand-50/40 flex flex-col items-center justify-center py-16 px-6 text-center">
                <AlertCircle className="h-8 w-8 text-brand-200 mb-3" />
                <p className="text-sm font-medium text-brand-700 mb-1">{rightFile.environment.name} not connected</p>
                <Link href={`/suitecompare/accounts/${accountId}`} className="text-xs font-medium text-accent hover:underline">Configure credentials →</Link>
              </div>
            )
          }
        </div>
      )}
    </div>
  );
}

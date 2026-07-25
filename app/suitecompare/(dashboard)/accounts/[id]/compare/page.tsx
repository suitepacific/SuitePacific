import { requireScUser } from "@/lib/sc-auth";
import { prisma } from "@/lib/prisma";
import { notFound } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, AlertCircle } from "lucide-react";
import { DiffViewer } from "@/components/suitecompare/DiffViewer";
import { EnvSelector } from "@/components/suitecompare/EnvSelector";
import { ScriptTypeBadge } from "@/components/suitecompare/ScriptTypeBadge";
import { CodePane } from "@/components/suitecompare/CodePane";
import { CompareTabs } from "@/components/suitecompare/CompareTabs";
import { DeploymentCompare } from "@/components/suitecompare/DeploymentCompare";
import { AiSummaryPanel } from "@/components/suitecompare/AiSummaryPanel";
import {
  fetchScriptContent,
  fetchScriptDeployments,
  hasCredentials,
  type NsCredentials,
  type NsDeployment,
} from "@/lib/sc-netsuite";
import { decrypt } from "@/lib/sc-crypto";
import type { ScEnvironment } from "@prisma/client";

type Props = {
  params: Promise<{ id: string }>;
  searchParams: Promise<{ script?: string; left?: string; right?: string; tab?: string }>;
};

type ContentResult =
  | { ok: true; content: string }
  | { ok: false; error: string; unconfigured?: true };

type DeployResult =
  | { ok: true; deployments: NsDeployment[] }
  | { ok: false; error?: string; unconfigured?: true };


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
    return { ok: true, content: await fetchScriptContent(creds, scriptId) };
  } catch (err) {
    return { ok: false, error: err instanceof Error ? err.message : "Failed to fetch script." };
  }
}

async function getDeployments(env: ScEnvironment, scriptId: string): Promise<DeployResult> {
  const creds = getCreds(env);
  if (!creds) return { ok: false, unconfigured: true };
  try {
    return { ok: true, deployments: await fetchScriptDeployments(creds, scriptId) };
  } catch (err) {
    return { ok: false, error: err instanceof Error ? err.message : "Failed to fetch deployments." };
  }
}


export default async function AccountComparePage({ params, searchParams }: Props) {
  const user = await requireScUser();
  const { id: accountId } = await params;
  const { script: scriptId, left: leftEnvId, right: rightEnvId, tab = "code" } = await searchParams;

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

  const [leftScript, rightScript, allEnvScripts] = await Promise.all([
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

  // Fetch data for active tab only to avoid unnecessary API calls
  const [leftContent, rightContent] = tab === "code"
    ? await Promise.all([getContent(leftScript.environment, scriptId), getContent(rightScript.environment, scriptId)])
    : [null, null];

  const [leftDeploy, rightDeploy] = tab === "deployments"
    ? await Promise.all([getDeployments(leftScript.environment, scriptId), getDeployments(rightScript.environment, scriptId)])
    : [null, null];

  // Write audit record — fire without awaiting to avoid blocking the render
  const auditStatus =
    (leftContent && !leftContent.ok && !leftContent.unconfigured) ||
    (rightContent && !rightContent.ok && !rightContent.unconfigured) ||
    (leftDeploy && !leftDeploy.ok && !leftDeploy.unconfigured) ||
    (rightDeploy && !rightDeploy.ok && !rightDeploy.unconfigured)
      ? "failed"
      : "success";
  void prisma.scComparison.create({
    data: {
      userId: user.id,
      orgId: membership.orgId,
      scriptId,
      envAId: leftEnvId,
      envBId: rightEnvId,
      status: auditStatus,
    },
  });

  const envOptions = allEnvScripts
    .sort((a, b) => a.environment.type.localeCompare(b.environment.type))
    .map((s) => ({ id: s.environment.id, name: s.environment.name, type: s.environment.type }));

  const header = (
    <div className="mb-4">
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
    <div className="mb-2">
      <EnvSelector
        envs={envOptions}
        leftEnvId={leftEnvId}
        rightEnvId={rightEnvId}
        scriptId={scriptId}
      />
    </div>
  );

  // ── Code tab ──────────────────────────────────────────────────────────────
  let codeContent: React.ReactNode = null;
  if (tab === "code" && leftContent && rightContent) {
    const hasBlockingError =
      (!leftContent.ok && !leftContent.unconfigured) ||
      (!rightContent.ok && !rightContent.unconfigured);

    if (hasBlockingError) {
      const errors: { label: string; message: string }[] = [];
      if (!leftContent.ok && !leftContent.unconfigured) errors.push({ label: leftScript.environment.name, message: leftContent.error });
      if (!rightContent.ok && !rightContent.unconfigured) errors.push({ label: rightScript.environment.name, message: rightContent.error });
      codeContent = (
        <div className="rounded-xl border border-red-100 bg-red-50 p-5">
          <div className="flex gap-3">
            <AlertCircle className="h-5 w-5 text-red-500 shrink-0 mt-0.5" />
            <div>
              <p className="text-sm font-semibold text-red-800 mb-2">Could not load script content</p>
              <ul className="space-y-1">
                {errors.map((e) => (
                  <li key={e.label} className="text-sm text-red-700">
                    <span className="font-medium">{e.label}:</span> {e.message}
                  </li>
                ))}
              </ul>
              <Link href={`/suitecompare/accounts/${accountId}`} className="mt-3 inline-block text-xs text-red-600 hover:underline">
                Configure credentials →
              </Link>
            </div>
          </div>
        </div>
      );
    } else if (leftContent.ok && rightContent.ok) {
      codeContent = (
        <>
          <DiffViewer
            key={`${leftEnvId}-${rightEnvId}`}
            left={leftContent.content}
            right={rightContent.content}
            leftLabel={leftScript.environment.name}
            rightLabel={rightScript.environment.name}
            leftType={leftScript.environment.type}
            rightType={rightScript.environment.type}
          />
          {process.env.GROQ_API_KEY && (
            <AiSummaryPanel
              left={leftContent.content}
              right={rightContent.content}
              leftLabel={leftScript.environment.name}
              rightLabel={rightScript.environment.name}
              hasDiff={leftContent.content !== rightContent.content}
            />
          )}
        </>
      );
    } else {
      const notConfiguredPane = (label: string) => (
        <div className="flex-1 min-w-0 rounded-xl border border-brand-100 bg-brand-50/40 flex flex-col items-center justify-center py-16 px-6 text-center">
          <AlertCircle className="h-8 w-8 text-brand-200 mb-3" />
          <p className="text-sm font-medium text-brand-700 mb-1">{label} not connected</p>
          <p className="text-xs text-brand-400 mb-4">Configure TBA credentials to compare this environment.</p>
          <Link href={`/suitecompare/accounts/${accountId}`} className="text-xs font-medium text-accent hover:underline">
            Configure credentials →
          </Link>
        </div>
      );
      codeContent = (
        <div className="flex gap-4 min-h-[400px]">
          {leftContent.ok
            ? <CodePane content={leftContent.content} label={leftScript.environment.name} type={leftScript.environment.type} />
            : notConfiguredPane(leftScript.environment.name)}
          {rightContent.ok
            ? <CodePane content={rightContent.content} label={rightScript.environment.name} type={rightScript.environment.type} />
            : notConfiguredPane(rightScript.environment.name)}
        </div>
      );
    }
  }

  return (
    <div className="max-w-full">
      {header}
      {envSelector}
      <CompareTabs activeTab={tab} />

      {tab === "code" && codeContent}

      {tab === "deployments" && leftDeploy && rightDeploy && (
        <DeploymentCompare
          leftData={leftDeploy}
          rightData={rightDeploy}
          leftLabel={leftScript.environment.name}
          rightLabel={rightScript.environment.name}
          accountId={accountId}
        />
      )}

    </div>
  );
}

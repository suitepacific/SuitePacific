"use server";

import { redirect } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { requireScUser } from "@/lib/sc-auth";
import { inferScriptName, inferScriptType } from "@/lib/sc-mock";
import { encrypt, decrypt } from "@/lib/sc-crypto";
import { testCredentials, fetchScriptMeta, hasCredentials } from "@/lib/sc-netsuite";
import { getClientLimit } from "@/lib/sc-plans";
import { revalidatePath } from "next/cache";

export async function updateEnvironmentAction(
  _prev: unknown,
  formData: FormData
): Promise<{ error?: string; success?: boolean }> {
  const user = await requireScUser();
  const envId = String(formData.get("envId") ?? "").trim();
  const name = String(formData.get("name") ?? "").trim();
  const nsEnvAccountId = String(formData.get("nsEnvAccountId") ?? "").trim() || null;
  const rawConsumerKey = String(formData.get("consumerKey") ?? "").trim() || null;
  const rawConsumerSecret = String(formData.get("consumerSecret") ?? "").trim() || null;
  const rawTokenKey = String(formData.get("tokenKey") ?? "").trim() || null;
  const rawTokenSecret = String(formData.get("tokenSecret") ?? "").trim() || null;

  if (!name) return { error: "Environment name is required." };

  if (nsEnvAccountId && !/^\d+(_SB\d+)?$/i.test(nsEnvAccountId)) {
    return { error: "NetSuite Account ID must be digits only (e.g. 1234567) or include a sandbox suffix (e.g. 1234567_SB2)." };
  }

  const anyNewCred = rawConsumerKey || rawConsumerSecret || rawTokenKey || rawTokenSecret;
  const allNewCreds = rawConsumerKey && rawConsumerSecret && rawTokenKey && rawTokenSecret;

  if (anyNewCred && !allNewCreds) {
    return { error: "Please fill in all four TBA credential fields, or leave them all blank to keep your existing credentials." };
  }

  // Test new credentials before saving
  if (allNewCreds && nsEnvAccountId) {
    try {
      await testCredentials({
        nsEnvAccountId,
        consumerKey: rawConsumerKey,
        consumerSecret: rawConsumerSecret,
        tokenKey: rawTokenKey,
        tokenSecret: rawTokenSecret,
      });
    } catch (err) {
      return { error: err instanceof Error ? err.message : "Connection test failed." };
    }
  }

  const membership = await prisma.scOrgMember.findFirst({ where: { userId: user.id } });
  if (!membership) return { error: "Organization not found." };

  const env = await prisma.scEnvironment.findFirst({
    where: { id: envId, account: { orgId: membership.orgId } },
    select: { id: true, scAccountId: true, consumerKey: true, consumerSecret: true, tokenKey: true, tokenSecret: true },
  });
  if (!env) return { error: "Environment not found." };

  // If new credentials provided, encrypt them. Otherwise keep existing encrypted values.
  const credentialUpdate = allNewCreds
    ? {
        consumerKey: encrypt(rawConsumerKey),
        consumerSecret: encrypt(rawConsumerSecret),
        tokenKey: encrypt(rawTokenKey),
        tokenSecret: encrypt(rawTokenSecret),
      }
    : {
        consumerKey: env.consumerKey,
        consumerSecret: env.consumerSecret,
        tokenKey: env.tokenKey,
        tokenSecret: env.tokenSecret,
      };

  await prisma.scEnvironment.update({
    where: { id: envId },
    data: { name, nsEnvAccountId, ...credentialUpdate },
  });

  revalidatePath(`/suitecompare/accounts/${env.scAccountId}`);
  return { success: true };
}

export async function addEnvironmentAction(
  _prev: unknown,
  formData: FormData
): Promise<{ error?: string; success?: boolean }> {
  const user = await requireScUser();
  const accountId = String(formData.get("accountId") ?? "").trim();
  const name = String(formData.get("name") ?? "").trim();
  const nsEnvAccountId = String(formData.get("nsEnvAccountId") ?? "").trim();

  if (!name || !nsEnvAccountId) return { error: "Name and NetSuite Account ID are required." };

  if (!/^\d+(_SB\d+)?$/i.test(nsEnvAccountId)) {
    return { error: "NetSuite Account ID must be digits only (e.g. 1234567) or include a sandbox suffix (e.g. 1234567_SB2)." };
  }

  const isSandbox = /_sb\d*/i.test(nsEnvAccountId);
  if (!isSandbox) {
    return {
      error:
        "Multiple production instances are not allowed per account. Sandbox IDs must include a suffix like _SB1 or _SB2 (e.g. 1234567_SB2).",
    };
  }

  const membership = await prisma.scOrgMember.findFirst({
    where: { userId: user.id },
    include: { org: true },
  });
  if (!membership) return { error: "Organization not found." };

  const account = await prisma.scNetSuiteAccount.findFirst({
    where: { id: accountId, orgId: membership.orgId, archivedAt: null },
    include: { environments: { select: { id: true } } },
  });
  if (!account) return { error: "Account not found." };

  if (membership.org.plan === "free" && account.environments.length >= 2) {
    return { error: "Free plan includes 1 Production + 1 Sandbox per client. Upgrade to Pro to add more environments." };
  }

  await prisma.scEnvironment.create({
    data: { scAccountId: accountId, name, type: "sandbox", nsEnvAccountId },
  });

  revalidatePath(`/suitecompare/accounts/${accountId}`);
  return { success: true };
}

export async function addNsAccountAction(
  _prev: unknown,
  formData: FormData
): Promise<{ error?: string }> {
  const user = await requireScUser();
  const name = String(formData.get("name") ?? "").trim();
  const nsAccountId = String(formData.get("nsAccountId") ?? "").trim();

  if (!name || !nsAccountId) {
    return { error: "Account name and NetSuite Account ID are required." };
  }

  const membership = await prisma.scOrgMember.findFirst({
    where: { userId: user.id },
    include: { org: { include: { nsAccounts: { where: { archivedAt: null } } } } },
  });
  if (!membership) return { error: "Organization not found." };

  const clientLimit = getClientLimit(membership.org.plan, membership.org.clientLimitOverride);
  if (membership.org.nsAccounts.length >= clientLimit) {
    return { error: `Your plan allows up to ${clientLimit} client${clientLimit === 1 ? "" : "s"}. Upgrade to add more.` };
  }

  const account = await prisma.scNetSuiteAccount.create({
    data: {
      orgId: membership.orgId,
      name,
      nsAccountId,
      environments: {
        create: [
          { name: "Production", type: "production" },
          { name: "Sandbox", type: "sandbox" },
        ],
      },
    },
  });

  redirect(`/suitecompare/accounts/${account.id}`);
}

export async function browseScriptAction(
  _prev: unknown,
  formData: FormData
): Promise<{ error?: string; success?: boolean }> {
  const user = await requireScUser();
  const scriptId = String(formData.get("scriptId") ?? "").trim();
  const accountId = String(formData.get("accountId") ?? "").trim();

  if (!scriptId) return { error: "Script ID is required." };

  const membership = await prisma.scOrgMember.findFirst({
    where: { userId: user.id },
  });
  if (!membership) return { error: "Organization not found." };

  const account = await prisma.scNetSuiteAccount.findFirst({
    where: { id: accountId, orgId: membership.orgId, archivedAt: null },
    include: { environments: true },
  });
  if (!account) return { error: "Account not found." };

  let scriptName = inferScriptName(scriptId);
  let scriptType = inferScriptType(scriptId);

  // Try to get real name + type from NetSuite if any environment has credentials
  const credEnv = account.environments.find((e) => hasCredentials(e));
  if (credEnv) {
    try {
      const meta = await fetchScriptMeta(
        {
          nsEnvAccountId: credEnv.nsEnvAccountId!,
          consumerKey: decrypt(credEnv.consumerKey!),
          consumerSecret: decrypt(credEnv.consumerSecret!),
          tokenKey: decrypt(credEnv.tokenKey!),
          tokenSecret: decrypt(credEnv.tokenSecret!),
        },
        scriptId
      );
      if (meta) {
        scriptName = meta.name;
        scriptType = meta.scriptType;
      }
    } catch {
      // Fall back to inferred values silently
    }
  }

  await Promise.all(
    account.environments.map((env) =>
      prisma.scScript.upsert({
        where: { environmentId_scriptId: { environmentId: env.id, scriptId } },
        update: { browsedAt: new Date() },
        create: { environmentId: env.id, scriptId, name: scriptName, scriptType },
      })
    )
  );

  revalidatePath(`/suitecompare/accounts/${accountId}`);
  return { success: true };
}

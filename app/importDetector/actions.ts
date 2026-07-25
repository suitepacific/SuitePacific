"use server";

import { prisma } from "@/lib/prisma";
import { requireScUser } from "@/lib/sc-auth";
import { decrypt } from "@/lib/sc-crypto";
import { hasCredentials, testCredentials } from "@/lib/sc-netsuite";
import { fetchRecordMetadataCatalog } from "@/lib/id-netsuite";
import { parseCsvPreview } from "@/lib/csv";

export type ConnectionTestResult = {
  error?: string;
  success?: boolean;
  recordType?: string;
  fieldCount?: number;
  sampleFields?: string[];
};

// Phase 0: prove we can authenticate against a live NetSuite account and pull its
// metadata catalog for a record type. No validation logic yet.
export async function testImportDoctorConnectionAction(
  _prev: ConnectionTestResult | undefined,
  formData: FormData
): Promise<ConnectionTestResult> {
  const user = await requireScUser();
  const environmentId = String(formData.get("environmentId") ?? "").trim();
  if (!environmentId) return { error: "Choose a connected NetSuite environment first." };

  const membership = await prisma.scOrgMember.findFirst({
    where: { userId: user.id },
    orderBy: { createdAt: "asc" },
  });
  if (!membership) return { error: "Organization not found." };

  const env = await prisma.scEnvironment.findFirst({
    where: { id: environmentId, account: { orgId: membership.orgId } },
  });
  if (!env) return { error: "Environment not found." };
  if (!hasCredentials(env)) {
    return { error: "This environment has no NetSuite credentials configured yet. Add them from Accounts first." };
  }

  const creds = {
    nsEnvAccountId: env.nsEnvAccountId,
    consumerKey: decrypt(env.consumerKey),
    consumerSecret: decrypt(env.consumerSecret),
    tokenKey: decrypt(env.tokenKey),
    tokenSecret: decrypt(env.tokenSecret),
  };

  try {
    await testCredentials(creds);
    const catalog = await fetchRecordMetadataCatalog(creds, "customer");
    return {
      success: true,
      recordType: catalog.recordType,
      fieldCount: catalog.fields.length,
      sampleFields: catalog.fields.slice(0, 12).map((f) => f.name),
    };
  } catch (err) {
    return { error: err instanceof Error ? err.message : "Connection test failed." };
  }
}

export type CsvPreviewResult = {
  error?: string;
  success?: boolean;
  fileName?: string;
  headers?: string[];
  rowCount?: number;
};

const MAX_UPLOAD_BYTES = 10 * 1024 * 1024;

// Phase 0: prove the upload pipe works end to end. No reference-key validation yet.
export async function previewCsvUploadAction(
  _prev: CsvPreviewResult | undefined,
  formData: FormData
): Promise<CsvPreviewResult> {
  await requireScUser();
  const file = formData.get("file");
  if (!(file instanceof File) || file.size === 0) {
    return { error: "Choose a CSV file to upload." };
  }
  if (!file.name.toLowerCase().endsWith(".csv")) {
    return { error: "Only .csv files are supported right now." };
  }
  if (file.size > MAX_UPLOAD_BYTES) {
    return { error: "File is larger than 10MB. Split it into smaller batches for now." };
  }

  const text = await file.text();
  const preview = parseCsvPreview(text);
  if (preview.headers.length === 0) {
    return { error: "Could not find a header row in this file." };
  }

  return {
    success: true,
    fileName: file.name,
    headers: preview.headers,
    rowCount: preview.rowCount,
  };
}

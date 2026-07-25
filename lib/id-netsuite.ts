// NetSuite Import Doctor — REST Record Metadata Catalog access.
// Reuses the OAuth 1.0 TBA signing already proven by SuiteCompare (lib/sc-netsuite.ts)
// rather than re-implementing HMAC signing for a second product.
import { oauthHeader, nsBase, type NsCredentials } from "./sc-netsuite";

export type NsMetadataField = {
  name: string;
  type: string;
  required: boolean;
};

export type NsRecordMetadata = {
  recordType: string;
  fields: NsMetadataField[];
};

// Pulls the field-level schema for a record type from NetSuite's REST Record Metadata Catalog.
// Phase 0 only needs to prove this round-trips end to end; later phases use the field list
// to detect which CSV columns are reference fields that need live value resolution.
export async function fetchRecordMetadataCatalog(
  creds: NsCredentials,
  recordType: string
): Promise<NsRecordMetadata> {
  const base = nsBase(creds.nsEnvAccountId);
  const url = `${base}/services/rest/record/v1/metadata-catalog/${encodeURIComponent(recordType)}`;

  let res: Response;
  try {
    res = await fetch(url, {
      headers: {
        Authorization: oauthHeader("GET", url, creds),
        Accept: "application/schema+json",
      },
      signal: AbortSignal.timeout(15000),
    });
  } catch {
    throw new Error("Could not reach NetSuite's metadata catalog. Check the Account ID and your network.");
  }

  if (res.status === 401) {
    throw new Error("Authentication failed. Verify your Consumer Key/Secret and Token Key/Secret.");
  }
  if (res.status === 403) {
    throw new Error("Access denied. The token role may lack permission to read record metadata.");
  }
  if (res.status === 404) {
    throw new Error(`Record type "${recordType}" was not found in this NetSuite account's metadata catalog.`);
  }
  if (!res.ok) {
    const body = await res.text().catch(() => "");
    throw new Error(`NetSuite returned ${res.status} from the metadata catalog: ${body.slice(0, 300)}`);
  }

  const schema = await res.json();
  const properties: Record<string, { type?: string | string[] }> =
    schema?.definitions?.[recordType]?.properties ?? schema?.properties ?? {};
  const required: string[] = schema?.definitions?.[recordType]?.required ?? schema?.required ?? [];
  const requiredSet = new Set(required);

  const fields: NsMetadataField[] = Object.entries(properties)
    .map(([name, def]) => ({
      name,
      type: Array.isArray(def?.type) ? def.type.join("|") : def?.type ?? "unknown",
      required: requiredSet.has(name),
    }))
    .sort((a, b) => a.name.localeCompare(b.name));

  if (fields.length === 0) {
    throw new Error(
      `Connected successfully, but the metadata catalog response for "${recordType}" didn't contain any fields. NetSuite may have changed its schema format.`
    );
  }

  return { recordType, fields };
}

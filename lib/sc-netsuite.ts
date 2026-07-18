import crypto from "crypto";

export type NsCredentials = {
  nsEnvAccountId: string;
  consumerKey: string;
  consumerSecret: string;
  tokenKey: string;
  tokenSecret: string;
};

// RFC 3986 percent-encoding (stricter than encodeURIComponent)
function pct(s: string): string {
  return encodeURIComponent(s)
    .replace(/!/g, "%21")
    .replace(/'/g, "%27")
    .replace(/\(/g, "%28")
    .replace(/\)/g, "%29")
    .replace(/\*/g, "%2A");
}

function oauthHeader(
  method: string,
  url: string,
  creds: NsCredentials
): string {
  const ts = Math.floor(Date.now() / 1000).toString();
  const nonce = crypto.randomBytes(16).toString("hex");

  const params: Record<string, string> = {
    oauth_consumer_key: creds.consumerKey,
    oauth_nonce: nonce,
    oauth_signature_method: "HMAC-SHA256",
    oauth_timestamp: ts,
    oauth_token: creds.tokenKey,
    oauth_version: "1.0",
  };

  const paramString = Object.entries(params)
    .sort(([a], [b]) => a.localeCompare(b))
    .map(([k, v]) => `${pct(k)}=${pct(v)}`)
    .join("&");

  const baseString = [method.toUpperCase(), pct(url), pct(paramString)].join("&");
  const signingKey = `${pct(creds.consumerSecret)}&${pct(creds.tokenSecret)}`;
  const signature = crypto.createHmac("sha256", signingKey).update(baseString).digest("base64");

  // realm = base URL (no path)
  const realm = new URL(url).origin;

  return (
    `OAuth realm="${realm}",` +
    `oauth_consumer_key="${params.oauth_consumer_key}",` +
    `oauth_token="${params.oauth_token}",` +
    `oauth_signature_method="${params.oauth_signature_method}",` +
    `oauth_timestamp="${params.oauth_timestamp}",` +
    `oauth_nonce="${params.oauth_nonce}",` +
    `oauth_version="${params.oauth_version}",` +
    `oauth_signature="${pct(signature)}"`
  );
}

// 1234567_SB2 → https://1234567-sb2.suitetalk.api.netsuite.com
function nsBase(nsAccountId: string): string {
  // Validate format before building URL — blocks SSRF via crafted account IDs
  if (!/^\d+(_SB\d+)?$/i.test(nsAccountId.trim())) {
    throw new Error("Invalid NetSuite Account ID format (expected e.g. 1234567 or 1234567_SB2).");
  }
  return `https://${nsAccountId.replace(/_/g, "-").toLowerCase()}.suitetalk.api.netsuite.com`;
}

export async function fetchScriptContent(
  creds: NsCredentials,
  scriptId: string
): Promise<string> {
  const base = nsBase(creds.nsEnvAccountId);

  // Step 1: SuiteQL — resolve script ID → file internal ID
  const suiteqlUrl = `${base}/services/rest/query/v1/suiteql?limit=1`;
  const suiteqlRes = await fetch(suiteqlUrl, {
    method: "POST",
    headers: {
      Authorization: oauthHeader("POST", suiteqlUrl, creds),
      "Content-Type": "application/json",
      prefer: "transient",
    },
    body: JSON.stringify({
      q: `SELECT scriptfile FROM Script WHERE scriptid = '${scriptId.replace(/'/g, "''")}'`,
    }),
    signal: AbortSignal.timeout(15000),
  });

  if (!suiteqlRes.ok) {
    if (suiteqlRes.status === 401) throw new Error("NetSuite authentication failed. Verify your credentials.");
    if (suiteqlRes.status === 403) throw new Error("NetSuite access denied. Verify the token role has Script read permissions.");
    throw new Error(`NetSuite returned ${suiteqlRes.status} when looking up the script.`);
  }

  const suiteqlData = await suiteqlRes.json();
  const fileId = suiteqlData.items?.[0]?.scriptfile;
  if (!fileId) throw new Error(`Script "${scriptId}" not found in this NetSuite environment.`);

  // Step 2: Fetch raw file content from File Cabinet
  const fileUrl = `${base}/services/rest/record/v1/file/${fileId}/content`;
  const fileRes = await fetch(fileUrl, {
    method: "GET",
    headers: { Authorization: oauthHeader("GET", fileUrl, creds) },
    signal: AbortSignal.timeout(15000),
  });

  if (!fileRes.ok) {
    if (fileRes.status === 404) throw new Error(`Script file not found in NetSuite File Cabinet.`);
    if (fileRes.status === 401) throw new Error("NetSuite authentication failed fetching file content.");
    throw new Error(`NetSuite returned ${fileRes.status} when fetching the script file.`);
  }

  return fileRes.text();
}

function normalizeScriptType(nsType: string): string {
  const MAP: Record<string, string> = {
    USEREVENT: "userevent",
    SCHEDULED: "scheduled",
    MAPREDUCESCRIPT: "mapreduce",
    RESTLET: "restlet",
    SUITELET: "suitelet",
    CLIENTSCRIPT: "clientscript",
    PORTLET: "portlet",
    MASSUPDATESCRIPT: "massupdate",
    WORKFLOWACTIONSCRIPT: "workflowaction",
    BUNDLEINSTALLATION: "bundleinstallation",
  };
  return MAP[nsType.toUpperCase()] ?? nsType.toLowerCase();
}

// Fetch script display name and type from NetSuite. Returns null if not found.
export async function fetchScriptMeta(
  creds: NsCredentials,
  scriptId: string
): Promise<{ name: string; scriptType: string } | null> {
  const base = nsBase(creds.nsEnvAccountId);
  const url = `${base}/services/rest/query/v1/suiteql?limit=1`;

  const res = await fetch(url, {
    method: "POST",
    headers: {
      Authorization: oauthHeader("POST", url, creds),
      "Content-Type": "application/json",
      prefer: "transient",
    },
    body: JSON.stringify({
      q: `SELECT name, scripttype FROM Script WHERE scriptid = '${scriptId.replace(/'/g, "''")}'`,
    }),
    signal: AbortSignal.timeout(10000),
  });

  if (!res.ok) return null;
  const data = await res.json();
  const row = data.items?.[0];
  if (!row) return null;

  return { name: String(row.name), scriptType: normalizeScriptType(String(row.scripttype)) };
}

// Quick validation call — queries Script table with limit 1.
// Returns cleanly on success, throws a user-readable error on failure.
export async function testCredentials(creds: NsCredentials): Promise<void> {
  const base = nsBase(creds.nsEnvAccountId);
  const url = `${base}/services/rest/query/v1/suiteql?limit=1`;

  let res: Response;
  try {
    res = await fetch(url, {
      method: "POST",
      headers: {
        Authorization: oauthHeader("POST", url, creds),
        "Content-Type": "application/json",
        prefer: "transient",
      },
      body: JSON.stringify({ q: "SELECT id FROM Script WHERE rownum = 1" }),
      signal: AbortSignal.timeout(12000),
    });
  } catch {
    throw new Error("Could not reach NetSuite. Check the Account ID and your network.");
  }

  if (res.status === 401) {
    throw new Error("Authentication failed. Verify your Consumer Key/Secret and Token Key/Secret.");
  }
  if (res.status === 403) {
    throw new Error("Access denied. The token role may lack Script record read permissions.");
  }
  if (!res.ok) {
    throw new Error(`NetSuite returned ${res.status}. Check the Account ID format.`);
  }
}

export function hasCredentials(env: {
  nsEnvAccountId: string | null;
  consumerKey: string | null;
  consumerSecret: string | null;
  tokenKey: string | null;
  tokenSecret: string | null;
}): env is typeof env & NsCredentials {
  return !!(
    env.nsEnvAccountId &&
    env.consumerKey &&
    env.consumerSecret &&
    env.tokenKey &&
    env.tokenSecret
  );
}

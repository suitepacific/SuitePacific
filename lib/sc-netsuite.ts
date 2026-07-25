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

export function oauthHeader(
  method: string,
  url: string,
  creds: NsCredentials
): string {
  const ts = Math.floor(Date.now() / 1000).toString();
  const nonce = crypto.randomBytes(16).toString("hex");

  // Per OAuth 1.0 spec: base URL excludes query string; query params go into param string
  const parsed = new URL(url);
  const baseUrl = `${parsed.protocol}//${parsed.host}${parsed.pathname}`;

  const params: Record<string, string> = {
    oauth_consumer_key: creds.consumerKey,
    oauth_nonce: nonce,
    oauth_signature_method: "HMAC-SHA256",
    oauth_timestamp: ts,
    oauth_token: creds.tokenKey,
    oauth_version: "1.0",
  };

  // Merge query string params into the normalized param set
  parsed.searchParams.forEach((value, key) => {
    params[key] = value;
  });

  const paramString = Object.entries(params)
    .sort(([a], [b]) => a.localeCompare(b))
    .map(([k, v]) => `${pct(k)}=${pct(v)}`)
    .join("&");

  const baseString = [method.toUpperCase(), pct(baseUrl), pct(paramString)].join("&");
  const signingKey = `${pct(creds.consumerSecret)}&${pct(creds.tokenSecret)}`;
  const signature = crypto.createHmac("sha256", signingKey).update(baseString).digest("base64");

  return (
    `OAuth realm="${creds.nsEnvAccountId}",` +
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
export function nsBase(nsAccountId: string): string {
  // Validate format before building URL — blocks SSRF via crafted account IDs
  if (!/^\d+(_SB\d+)?$/i.test(nsAccountId.trim())) {
    throw new Error("Invalid NetSuite Account ID format (expected e.g. 1234567 or 1234567_SB2).");
  }
  return `https://${nsAccountId.replace(/_/g, "-").toLowerCase()}.suitetalk.api.netsuite.com`;
}

// Build SOAP TBA passport header XML.
// SOAP TBA signs: account&consumerKey&tokenKey&nonce&timestamp (no percent-encoding)
function soapPassportXml(creds: NsCredentials): string {
  const nonce = crypto.randomBytes(16).toString("hex");
  const ts = Math.floor(Date.now() / 1000).toString();
  const signingKey = `${creds.consumerSecret}&${creds.tokenSecret}`;
  const baseStr = `${creds.nsEnvAccountId}&${creds.consumerKey}&${creds.tokenKey}&${nonce}&${ts}`;
  const sig = crypto.createHmac("sha256", signingKey).update(baseStr).digest("base64");
  return `<soapenv:Header>
    <platformMsgs:tokenPassport>
      <platformCore:account>${creds.nsEnvAccountId}</platformCore:account>
      <platformCore:consumerKey>${creds.consumerKey}</platformCore:consumerKey>
      <platformCore:token>${creds.tokenKey}</platformCore:token>
      <platformCore:nonce>${nonce}</platformCore:nonce>
      <platformCore:timestamp>${ts}</platformCore:timestamp>
      <platformCore:signature algorithm="HMAC-SHA256">${sig}</platformCore:signature>
    </platformMsgs:tokenPassport>
  </soapenv:Header>`;
}

// Low-level SOAP get — returns raw XML response string.
async function soapGet(creds: NsCredentials, internalId: string, recordType: string): Promise<string> {
  const endpoint = `${nsBase(creds.nsEnvAccountId)}/services/NetSuitePort_2023_2`;
  const envelope = `<?xml version="1.0" encoding="utf-8"?>
<soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/"
                  xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
                  xmlns:platformCore="urn:core_2023_2.platform.webservices.netsuite.com"
                  xmlns:platformMsgs="urn:messages_2023_2.platform.webservices.netsuite.com">
  ${soapPassportXml(creds)}
  <soapenv:Body>
    <platformMsgs:get>
      <platformMsgs:baseRef internalId="${internalId}" type="${recordType}" xsi:type="platformCore:RecordRef"/>
    </platformMsgs:get>
  </soapenv:Body>
</soapenv:Envelope>`;

  let res: Response;
  try {
    res = await fetch(endpoint, {
      method: "POST",
      headers: { "Content-Type": "text/xml; charset=utf-8", SOAPAction: "get" },
      body: envelope,
      signal: AbortSignal.timeout(20000),
    });
  } catch {
    throw new Error("Could not reach NetSuite SOAP endpoint. Check the Account ID.");
  }

  const xml = await res.text();
  if (xml.includes("INVALID_LOGIN") || xml.includes("invalidCredentials")) {
    throw new Error("NetSuite authentication failed.");
  }
  if (xml.includes(":Fault>")) {
    const m = xml.match(/<faultstring[^>]*>([^<]+)<\/faultstring>/i);
    throw new Error(m ? m[1] : "NetSuite SOAP request failed.");
  }
  return xml;
}

async function fetchFileContentSoap(creds: NsCredentials, fileId: string): Promise<string> {
  const xml = await soapGet(creds, fileId, "file");

  // Content is base64-encoded in the response
  const match = xml.match(/<[a-zA-Z]*:?content>([A-Za-z0-9+/=\r\n\s]+)<\/[a-zA-Z]*:?content>/);
  if (!match) {
    if (xml.includes('isSuccess="true"')) throw new Error("Script file has no readable content.");
    throw new Error("Script file not found in NetSuite File Cabinet.");
  }
  return Buffer.from(match[1].replace(/\s/g, ""), "base64").toString("utf-8");
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

  // Step 2: Fetch raw file content via SOAP (REST file/content endpoint not supported)
  return fetchFileContentSoap(creds, fileId);
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

export type NsDeployment = {
  id: string;
  scriptid: string;
  recordtype: string | null;
  isdeployed: string;
  status: string;
  loglevel: string;
};


async function suiteql(creds: NsCredentials, q: string): Promise<Record<string, unknown>[]> {
  const base = nsBase(creds.nsEnvAccountId);
  const url = `${base}/services/rest/query/v1/suiteql`;
  const res = await fetch(url, {
    method: "POST",
    headers: {
      Authorization: oauthHeader("POST", url, creds),
      "Content-Type": "application/json",
      prefer: "transient",
    },
    body: JSON.stringify({ q }),
    signal: AbortSignal.timeout(15000),
  });
  if (!res.ok) {
    const body = await res.text().catch(() => "");
    console.error("[sc-netsuite] SuiteQL error", res.status, body.slice(0, 300));
    throw new Error(`SuiteQL returned ${res.status}: ${body.slice(0, 200)}`);
  }
  const data = await res.json();
  return data.items ?? [];
}

export async function fetchScriptDeployments(
  creds: NsCredentials,
  scriptId: string
): Promise<NsDeployment[]> {
  const safe = scriptId.replace(/'/g, "''");
  const rows = await suiteql(
    creds,
    `SELECT sd.id, sd.scriptid, sd.recordtype, sd.isdeployed, sd.status, sd.loglevel
     FROM ScriptDeployment sd
     WHERE sd.script IN (SELECT id FROM Script WHERE scriptid = '${safe}')
     ORDER BY sd.recordtype, sd.scriptid`
  );
  return rows as NsDeployment[];
}


// Look up an Advanced PDF/HTML Template by Script ID via REST Record API.
// SuiteQL does not expose AdvancedPdfTemplate; REST Record API is the correct path.
export async function fetchTemplateMeta(
  creds: NsCredentials,
  templateScriptId: string
): Promise<{ id: string; name: string } | null> {
  const base = nsBase(creds.nsEnvAccountId);
  const url = `${base}/services/rest/record/v1/advancedpdftemplate/${encodeURIComponent(templateScriptId)}`;
  let res: Response;
  try {
    res = await fetch(url, {
      headers: { Authorization: oauthHeader("GET", url, creds) },
      signal: AbortSignal.timeout(15000),
    });
  } catch {
    throw new Error("Could not reach NetSuite. Check the Account ID and your network.");
  }
  if (res.status === 404) return null;
  if (!res.ok) {
    const body = await res.text().catch(() => "");
    throw new Error(`NetSuite returned ${res.status}: ${body.slice(0, 400)}`);
  }
  const data = await res.json();
  return { id: String(data.id), name: String(data.name) };
}

// Fetch the XML/FreeMarker source of an Advanced PDF/HTML Template via REST Record API.
export async function fetchTemplateContent(
  creds: NsCredentials,
  templateScriptId: string
): Promise<string> {
  const base = nsBase(creds.nsEnvAccountId);
  const url = `${base}/services/rest/record/v1/advancedpdftemplate/${encodeURIComponent(templateScriptId)}`;
  let res: Response;
  try {
    res = await fetch(url, {
      headers: { Authorization: oauthHeader("GET", url, creds) },
      signal: AbortSignal.timeout(15000),
    });
  } catch {
    throw new Error("Could not reach NetSuite to fetch template content.");
  }
  if (res.status === 404) throw new Error(`Template "${templateScriptId}" not found in this NetSuite environment.`);
  if (!res.ok) {
    const body = await res.text().catch(() => "");
    throw new Error(`NetSuite returned ${res.status}: ${body.slice(0, 400)}`);
  }
  const data = await res.json();
  if (!data.content) throw new Error(`Template found but content field is empty or not accessible (id: ${data.id}).`);
  return String(data.content);
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

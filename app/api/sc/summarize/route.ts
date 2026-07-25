import { createGroq } from "@ai-sdk/groq";
import { streamText } from "ai";

export const runtime = "nodejs";
export const maxDuration = 30;

const MAX_CHARS = 12000;

function truncate(s: string) {
  if (s.length <= MAX_CHARS) return s;
  return s.slice(0, MAX_CHARS) + "\n\n[... truncated for length ...]";
}

type Deployment = {
  id: string;
  scriptid: string;
  recordtype: string | null;
  isdeployed: string;
  status: string;
  loglevel: string;
};

function formatDeployments(deploys: Deployment[], label: string) {
  if (!deploys.length) return `${label}: no deployment data available`;
  return deploys.map(d =>
    `${label} deployment: ${d.scriptid} | status: ${d.status} | deployed: ${d.isdeployed} | record type: ${d.recordtype || "—"} | log level: ${d.loglevel}`
  ).join("\n");
}

export async function POST(req: Request) {
  if (!process.env.GROQ_API_KEY) {
    return new Response("Not configured.", { status: 503 });
  }

  const {
    mode,
    left,
    right,
    leftLabel,
    rightLabel,
    leftDeployments = [],
    rightDeployments = [],
  } = await req.json();

  const groq = createGroq({ apiKey: process.env.GROQ_API_KEY });

  const deploymentBlock = `
Deployment information:
${formatDeployments(leftDeployments, leftLabel)}
${formatDeployments(rightDeployments, rightLabel)}`.trim();

  let prompt: string;
  let maxOutputTokens = 700;

  if (mode === "explain_left" || mode === "explain_right") {
    const code = mode === "explain_left" ? left : right;
    const label = mode === "explain_left" ? leftLabel : rightLabel;
    const deploys = mode === "explain_left" ? leftDeployments : rightDeployments;
    prompt = `You are a NetSuite SuiteScript expert. A developer has just inherited this script and needs to understand what it does.

Script (${label}):
\`\`\`javascript
${truncate(code)}
\`\`\`

${formatDeployments(deploys, label)}

Explain:
- Script type and when it triggers
- What records or transactions it operates on
- Its main purpose in plain English
- Key logic (what it actually does, step by step)
- Business impact (what changes in NetSuite when this runs)

Only flag genuine risks like re-save loops, cross-script triggers, or operations outside the stated purpose. Be concise and specific.`;

  } else if (mode === "explain_diff") {
    prompt = `You are a NetSuite SuiteScript expert comparing two versions of a script.

${leftLabel}:
\`\`\`javascript
${truncate(left)}
\`\`\`

${rightLabel}:
\`\`\`javascript
${truncate(right)}
\`\`\`

${deploymentBlock}

Explain what changed between these two versions:
- What does each code change actually do differently?
- Are there any deployment configuration differences?
- What should a developer know before deciding which version to keep?

Be specific. Skip anything that is identical between the two versions.`;

  } else if (mode === "risk") {
    prompt = `You are a NetSuite SuiteScript expert performing a risk analysis on changes between two environments.

${leftLabel} (current production):
\`\`\`javascript
${truncate(left)}
\`\`\`

${rightLabel} (candidate for promotion):
\`\`\`javascript
${truncate(right)}
\`\`\`

${deploymentBlock}

Identify risks in the ${rightLabel} version or in promoting it to replace ${leftLabel}. Check for:
- Recursive saves (record.save() inside beforeSubmit/afterSubmit without guards)
- Hardcoded internal IDs that may differ between environments
- Governance risk (record.load() in loops, expensive operations without limits)
- Deployment issues (NOTSCHEDULED status, Debug log level, missing record type)
- Logic changes that could affect live transactions or data integrity
- Any new dependencies (saved searches, script parameters) that must exist in production before deployment

Rate each issue as CRITICAL, WARNING, or INFO. If no issues found, say so clearly.`;
    maxOutputTokens = 800;

  } else if (mode === "migration") {
    prompt = `You are a NetSuite SuiteScript expert. The ${rightLabel} version of this script is being promoted to replace ${leftLabel}.

${leftLabel} (will be replaced):
\`\`\`javascript
${truncate(left)}
\`\`\`

${rightLabel} (will replace it):
\`\`\`javascript
${truncate(right)}
\`\`\`

${deploymentBlock}

Write a migration summary covering:
1. What new behavior will production users experience after the change?
2. What existing behavior will change or be removed?
3. What must be configured in production before deployment (parameters, saved searches, deployments, record type filters)?
4. Is it safe to deploy, or are there blockers that need to be resolved first?

Be direct and actionable.`;

  } else if (mode === "release_notes") {
    prompt = `You are a NetSuite SuiteScript expert. Generate professional release notes for this script update.

${leftLabel} (before):
\`\`\`javascript
${truncate(left)}
\`\`\`

${rightLabel} (after):
\`\`\`javascript
${truncate(right)}
\`\`\`

${deploymentBlock}

Format the release notes as:

**Summary**
One sentence describing the overall change.

**What changed**
- [bullet for each meaningful change]

**Impact**
Who and what is affected by this update.

**Deployment checklist**
- [any steps required before or after deploying]

Keep it concise. Write it as if it will be read by a project manager or client.`;
    maxOutputTokens = 800;

  } else if (mode === "functional") {
    const code = right || left;
    const label = right ? rightLabel : leftLabel;
    const deploys = right ? rightDeployments : leftDeployments;
    prompt = `You are translating a NetSuite SuiteScript into plain business language for a functional consultant or project manager who does not read code.

Script (${label}):
\`\`\`javascript
${truncate(code)}
\`\`\`

${formatDeployments(deploys, label)}

Explain this customization as if speaking to a business stakeholder:
- What business process does this support?
- When does it run? (what action triggers it)
- What does it do in plain business terms?
- Which records, transactions, or users are affected?
- What business rules does it enforce?

Do not use any technical terms (no SuiteScript, no API names, no function names). Write as you would in a business requirements document.`;
  } else {
    return new Response("Unknown mode.", { status: 400 });
  }

  const result = streamText({
    model: groq("llama-3.3-70b-versatile"),
    prompt,
    maxOutputTokens,
  });

  return result.toTextStreamResponse();
}

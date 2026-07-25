import { createGroq } from "@ai-sdk/groq";
import { streamText } from "ai";

export const runtime = "nodejs";
export const maxDuration = 30;

const MAX_CHARS = 12000;

function truncate(s: string) {
  if (s.length <= MAX_CHARS) return s;
  return s.slice(0, MAX_CHARS) + "\n\n[... truncated for length ...]";
}

export async function POST(req: Request) {

  if (!process.env.GROQ_API_KEY) {
    return new Response("AI summarization is not configured.", { status: 503 });
  }

  const { mode, left, right, leftLabel, rightLabel, leftDeployments = [], rightDeployments = [] } = await req.json();

  function formatDeployments(deploys: { id: string; scriptid: string; recordtype: string | null; isdeployed: string; status: string; loglevel: string }[], label: string) {
    if (!deploys.length) return `${label}: no deployment data available`;
    return deploys.map(d =>
      `${label} deployment: ${d.scriptid} | status: ${d.status} | deployed: ${d.isdeployed} | record type: ${d.recordtype || "—"} | log level: ${d.loglevel}`
    ).join("\n");
  }

  const groq = createGroq({ apiKey: process.env.GROQ_API_KEY });

  let prompt: string;

  if (mode === "diff") {
    prompt = `You are a NetSuite SuiteScript expert. You are comparing two versions of a SuiteScript file.

LEFT (${leftLabel}):
\`\`\`javascript
${truncate(left)}
\`\`\`

RIGHT (${rightLabel}):
\`\`\`javascript
${truncate(right)}
\`\`\`

Deployment information:
${formatDeployments(leftDeployments, leftLabel)}
${formatDeployments(rightDeployments, rightLabel)}

Explain what changed between the two versions in plain English. Cover:
1. What the code changes do functionally
2. Any differences in deployment configuration between environments
3. Any potential risks or side effects
4. What a developer reviewing this diff should pay attention to

Be concise and specific. Use bullet points where helpful.`;
  } else if (mode === "left") {
    prompt = `You are a NetSuite SuiteScript expert. Explain what this SuiteScript (${leftLabel}) does in plain English.

\`\`\`javascript
${truncate(left)}
\`\`\`

Deployment information:
${formatDeployments(leftDeployments, leftLabel)}

Describe: the script type and trigger, what records it operates on, its deployment status, its main purpose, key logic, and business impact (what it changes in NetSuite). Only flag something as a side effect if it is a genuine unintended consequence — like triggering another script, causing a re-save loop, or modifying records outside the script's stated purpose. Be concise.`;
  } else {
    prompt = `You are a NetSuite SuiteScript expert. Explain what this SuiteScript (${rightLabel}) does in plain English.

\`\`\`javascript
${truncate(right)}
\`\`\`

Deployment information:
${formatDeployments(rightDeployments, rightLabel)}

Describe: the script type and trigger, what records it operates on, its deployment status, its main purpose, key logic, and business impact (what it changes in NetSuite). Only flag something as a side effect if it is a genuine unintended consequence — like triggering another script, causing a re-save loop, or modifying records outside the script's stated purpose. Be concise.`;
  }

  const result = streamText({
    model: groq("llama-3.3-70b-versatile"),
    prompt,
    maxOutputTokens: 600,
  });

  return result.toTextStreamResponse();
}

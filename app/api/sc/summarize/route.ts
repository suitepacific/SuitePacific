import { createGroq } from "@ai-sdk/groq";
import { streamText } from "ai";
import { requireScUser } from "@/lib/sc-auth";

export const runtime = "nodejs";
export const maxDuration = 30;

const MAX_CHARS = 12000;

function truncate(s: string) {
  if (s.length <= MAX_CHARS) return s;
  return s.slice(0, MAX_CHARS) + "\n\n[... truncated for length ...]";
}

export async function POST(req: Request) {
  try {
    await requireScUser();
  } catch {
    return new Response("Unauthorized", { status: 401 });
  }

  if (!process.env.GROQ_API_KEY) {
    return new Response("AI summarization is not configured.", { status: 503 });
  }

  const { mode, left, right, leftLabel, rightLabel } = await req.json();

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

Explain what changed between the two versions in plain English. Cover:
1. What the changes do functionally
2. Any potential risks or side effects
3. What a developer reviewing this diff should pay attention to

Be concise and specific. Use bullet points where helpful.`;
  } else if (mode === "left") {
    prompt = `You are a NetSuite SuiteScript expert. Explain what this SuiteScript (${leftLabel}) does in plain English.

\`\`\`javascript
${truncate(left)}
\`\`\`

Describe: the script type and trigger, what records it operates on, its main purpose, and any key logic or side effects. Be concise.`;
  } else {
    prompt = `You are a NetSuite SuiteScript expert. Explain what this SuiteScript (${rightLabel}) does in plain English.

\`\`\`javascript
${truncate(right)}
\`\`\`

Describe: the script type and trigger, what records it operates on, its main purpose, and any key logic or side effects. Be concise.`;
  }

  const result = streamText({
    model: groq("llama-3.3-70b-versatile"),
    prompt,
    maxOutputTokens: 600,
  });

  return result.toTextStreamResponse();
}

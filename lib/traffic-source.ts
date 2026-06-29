const HOSTNAME_LABELS: { match: string; label: string }[] = [
  { match: "google.", label: "Google Search" },
  { match: "bing.", label: "Bing Search" },
  { match: "duckduckgo.", label: "DuckDuckGo" },
  { match: "yahoo.", label: "Yahoo Search" },
  { match: "chatgpt.com", label: "ChatGPT" },
  { match: "chat.openai.com", label: "ChatGPT" },
  { match: "perplexity.ai", label: "Perplexity" },
  { match: "claude.ai", label: "Claude" },
  { match: "gemini.google.com", label: "Gemini" },
  { match: "bard.google.com", label: "Gemini" },
  { match: "linkedin.com", label: "LinkedIn" },
  { match: "facebook.com", label: "Facebook" },
  { match: "fb.com", label: "Facebook" },
  { match: "instagram.com", label: "Instagram" },
  { match: "twitter.com", label: "X (Twitter)" },
  { match: "x.com", label: "X (Twitter)" },
  { match: "t.co", label: "X (Twitter)" },
  { match: "reddit.com", label: "Reddit" },
  { match: "youtube.com", label: "YouTube" },
];

function capitalize(value: string) {
  return value.charAt(0).toUpperCase() + value.slice(1);
}

export function resolveTrafficSource({
  referrer,
  utmSource,
  utmMedium,
  gclid,
  siteHostname,
}: {
  referrer: string | null;
  utmSource: string | null;
  utmMedium: string | null;
  gclid: string | null;
  siteHostname: string;
}): string {
  if (utmSource) {
    return utmMedium ? `${capitalize(utmSource)} / ${utmMedium}` : capitalize(utmSource);
  }

  if (gclid) return "Google Ads";

  if (!referrer) return "Direct / Unknown";

  let hostname: string;
  try {
    hostname = new URL(referrer).hostname.replace(/^www\./, "");
  } catch {
    return "Direct / Unknown";
  }

  if (hostname === siteHostname) return "Internal Navigation";

  const known = HOSTNAME_LABELS.find((entry) => hostname.includes(entry.match));
  if (known) return known.label;

  return hostname;
}

import { SITE_URL } from "@/lib/content";

export function ogImages(title: string, eyebrow?: string) {
  const params = new URLSearchParams({ title: title.replace(/\s*\|\s*SuitePacific\s*$/, "") });
  if (eyebrow) params.set("eyebrow", eyebrow);
  return [{ url: `${SITE_URL}/og?${params.toString()}`, width: 1200, height: 630, alt: title }];
}

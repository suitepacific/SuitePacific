// Year shown in commercial page titles and H1s for "in <year>" searches. Bump each January.
export const SEO_YEAR = 2027;
export const YEAR_REVIEWED = "November 2026";

// Markdown content can write {{year}} so posts follow SEO_YEAR without hand edits
export function withYear(text: string): string {
  return text.replaceAll("{{year}}", String(SEO_YEAR));
}

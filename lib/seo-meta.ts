import type { Metadata } from "next";

const BRAND_SUFFIX = " | SuitePacific";
const MAX_TITLE = 65;
const MAX_DESC = 160;
const MIN_SENTENCE_CUT = 120;

// The root layout appends " | SuitePacific"; drop it when it would push the title past what Google shows.
export function seoTitle(title: string, override?: string): Metadata["title"] {
  const t = override ?? title;
  return (t + BRAND_SUFFIX).length <= MAX_TITLE ? t : { absolute: t };
}

export function seoDescription(description: string, override?: string): string {
  const d = (override ?? description).trim();
  if (d.length <= MAX_DESC) return d;
  const window = d.slice(0, MAX_DESC);
  const sentenceEnd = Math.max(window.lastIndexOf(". "), window.lastIndexOf("? "));
  if (sentenceEnd + 1 >= MIN_SENTENCE_CUT) return d.slice(0, sentenceEnd + 1);
  const cut = d.slice(0, MAX_DESC - 3);
  return cut.slice(0, cut.lastIndexOf(" ")).replace(/[,;:]$/, "") + "...";
}

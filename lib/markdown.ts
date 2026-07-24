import { getSingletonHighlighter } from "shiki";
import { Marked } from "marked";

const LANGS = [
  "javascript",
  "typescript",
  "json",
  "html",
  "xml",
  "css",
  "sql",
  "bash",
  "shell",
  "text",
  "plaintext",
] as const;

let markedInstance: Marked | null = null;

export async function parseMarkdown(content: string): Promise<string> {
  if (!markedInstance) {
    const highlighter = await getSingletonHighlighter({
      themes: ["monokai"],
      langs: [...LANGS],
    });

    const loaded = highlighter.getLoadedLanguages();

    markedInstance = new Marked({
      renderer: {
        code({ text, lang }: { text: string; lang?: string }) {
          const l = lang && loaded.includes(lang as never) ? lang : "text";
          const html = highlighter.codeToHtml(text, { lang: l, theme: "monokai" });
          // Wrap in not-prose so Tailwind Typography doesn't override Shiki's inline colors
          return `<div class="not-prose shiki-wrap">${html}</div>`;
        },
      },
    });
  }

  return await markedInstance.parse(content);
}

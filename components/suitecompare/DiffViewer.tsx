"use client";

import { useMemo, useState, useCallback } from "react";
import { diffLines } from "diff";
import { EnvironmentBadge } from "./EnvironmentBadge";
import { Copy, Check, ArrowRight, ArrowLeft } from "lucide-react";

type DiffViewerProps = {
  left: string;
  right: string;
  leftLabel: string;
  rightLabel: string;
  leftType?: string;
  rightType?: string;
};

type ChunkRow = {
  chunkIdx: number;
  kind: "unchanged" | "removed" | "added";
  line: string;
  leftNum?: number;
  rightNum?: number;
  isFirstInChunk: boolean;
  chunkSize: number;
};

const KEYWORDS =
  /\b(define|require|function|return|var|const|let|if|else|for|while|switch|case|break|continue|new|this|typeof|instanceof|null|undefined|true|false|try|catch|throw)\b/g;
const STRINGS = /(["'`])(?:(?!\1)[^\\]|\\.)*\1/g;
const COMMENTS = /(\/\/.*$)/gm;
const NUMBERS = /\b(\d+(?:\.\d+)?)\b/g;

function highlightLine(raw: string): string {
  let s = raw
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;");

  s = s.replace(COMMENTS, '<span class="text-brand-300 italic">$1</span>');
  if (!s.includes('<span class="text-brand-300')) {
    s = s.replace(STRINGS, (m) => `<span class="text-emerald-600">${m}</span>`);
    s = s.replace(KEYWORDS, '<span class="text-accent font-medium">$&</span>');
    s = s.replace(NUMBERS, '<span class="text-orange-500">$1</span>');
  }
  return s;
}

function buildRows(changes: ReturnType<typeof diffLines>) {
  const rows: ChunkRow[] = [];
  let leftNum = 1;
  let rightNum = 1;
  let added = 0;
  let removed = 0;
  let unchanged = 0;

  changes.forEach((change, chunkIdx) => {
    const lines = change.value.replace(/\n$/, "").split("\n");
    const chunkSize = lines.length;

    lines.forEach((line, lineIdx) => {
      const isFirstInChunk = lineIdx === 0;
      if (change.removed) {
        rows.push({ chunkIdx, kind: "removed", line, leftNum: leftNum++, isFirstInChunk, chunkSize });
        removed++;
      } else if (change.added) {
        rows.push({ chunkIdx, kind: "added", line, rightNum: rightNum++, isFirstInChunk, chunkSize });
        added++;
      } else {
        rows.push({
          chunkIdx,
          kind: "unchanged",
          line,
          leftNum: leftNum++,
          rightNum: rightNum++,
          isFirstInChunk,
          chunkSize,
        });
        unchanged++;
      }
    });
  });

  return { rows, added, removed, unchanged };
}

function CopyButton({ content, side }: { content: string; side: "left" | "right" }) {
  const [copied, setCopied] = useState(false);

  async function handleCopy() {
    await navigator.clipboard.writeText(content);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }

  return (
    <button
      onClick={handleCopy}
      title={`Copy ${side} code`}
      className="flex items-center gap-1 px-2 py-1 rounded-md text-brand-400 hover:text-brand-700 hover:bg-brand-100 transition-colors text-[10px] font-medium shrink-0"
    >
      {copied ? <Check className="h-3 w-3 text-emerald-500" /> : <Copy className="h-3 w-3" />}
      {copied ? "Copied!" : "Copy"}
    </button>
  );
}

export function DiffViewer({
  left,
  right,
  leftLabel,
  rightLabel,
  leftType = "sandbox",
  rightType = "production",
}: DiffViewerProps) {
  const [leftContent, setLeftContent] = useState(left);
  const [rightContent, setRightContent] = useState(right);

  const { changes, rows, added, removed, unchanged } = useMemo(() => {
    const changes = diffLines(leftContent, rightContent);
    const { rows, added, removed, unchanged } = buildRows(changes);
    return { changes, rows, added, removed, unchanged };
  }, [leftContent, rightContent]);

  // Copy removed chunk into right content (insert at correct position)
  const applyToRight = useCallback(
    (chunkIdx: number) => {
      const newRight = changes
        .filter((c, i) => !c.removed || i === chunkIdx)
        .map((c) => c.value)
        .join("");
      setRightContent(newRight);
    },
    [changes]
  );

  // Copy added chunk into left content (insert at correct position)
  const applyToLeft = useCallback(
    (chunkIdx: number) => {
      const newLeft = changes
        .filter((c, i) => !c.added || i === chunkIdx)
        .map((c) => c.value)
        .join("");
      setLeftContent(newLeft);
    },
    [changes]
  );

  return (
    <div className="flex flex-col gap-3">
      {/* Summary */}
      <div className="flex items-center gap-4 text-xs font-medium">
        <span className="text-emerald-600">+{added} added</span>
        <span className="text-red-500">−{removed} removed</span>
        <span className="text-brand-300">{unchanged} unchanged</span>
      </div>

      {/* Viewer */}
      <div className="border border-brand-100 rounded-xl overflow-hidden text-xs font-mono">
        {/* Headers */}
        <div className="flex border-b border-brand-100 bg-brand-50 divide-x divide-brand-100">
          <div className="flex-1 flex items-center justify-between gap-2 px-4 py-2.5 min-w-0">
            <div className="flex items-center gap-2 min-w-0">
              <EnvironmentBadge type={leftType} />
              <span className="text-brand-900 font-semibold text-xs truncate">{leftLabel}</span>
            </div>
            <CopyButton content={leftContent} side="left" />
          </div>
          {/* Center header spacer: aligns with transfer gutter */}
          <div className="w-10 shrink-0" />
          <div className="flex-1 flex items-center justify-between gap-2 px-4 py-2.5 min-w-0">
            <div className="flex items-center gap-2 min-w-0">
              <EnvironmentBadge type={rightType} />
              <span className="text-brand-900 font-semibold text-xs truncate">{rightLabel}</span>
            </div>
            <CopyButton content={rightContent} side="right" />
          </div>
        </div>

        {/* Diff rows: single scroll container keeps both sides aligned */}
        <div className="overflow-x-auto">
          <div style={{ minWidth: "720px" }}>
            {rows.map((row, i) => {
              const showTransferRight = row.kind === "removed" && row.isFirstInChunk;
              const showTransferLeft = row.kind === "added" && row.isFirstInChunk;

              const leftBg =
                row.kind === "removed"
                  ? "bg-red-50 border-l-2 border-l-red-400"
                  : row.kind === "added"
                  ? "bg-emerald-50/30"
                  : "";
              const rightBg =
                row.kind === "added"
                  ? "bg-emerald-50 border-l-2 border-l-emerald-400"
                  : row.kind === "removed"
                  ? "bg-red-50/30"
                  : "";

              return (
                <div key={i} className="flex h-[22px]">
                  {/* Left column */}
                  <div className={`flex flex-1 min-w-0 overflow-hidden ${leftBg}`}>
                    <span className="w-10 shrink-0 text-right pr-2 text-brand-300 select-none border-r border-brand-50 leading-[22px]">
                      {row.kind !== "added" ? row.leftNum : ""}
                    </span>
                    {row.kind !== "added" ? (
                      <span
                        className="px-3 leading-[22px] text-brand-900 whitespace-pre"
                        dangerouslySetInnerHTML={{ __html: highlightLine(row.line) }}
                      />
                    ) : (
                      <span className="px-3 leading-[22px] text-transparent select-none whitespace-pre">&nbsp;</span>
                    )}
                  </div>

                  {/* Transfer gutter */}
                  <div className="w-10 shrink-0 border-x border-brand-100 bg-brand-50/80 flex items-center justify-center">
                    {showTransferRight && (
                      <button
                        onClick={() => applyToRight(row.chunkIdx)}
                        title={`Copy ${row.chunkSize} line${row.chunkSize > 1 ? "s" : ""} →`}
                        className="h-5 w-5 flex items-center justify-center rounded text-brand-300 hover:text-accent hover:bg-accent/10 transition-colors"
                      >
                        <ArrowRight className="h-3 w-3" />
                      </button>
                    )}
                    {showTransferLeft && (
                      <button
                        onClick={() => applyToLeft(row.chunkIdx)}
                        title={`Copy ${row.chunkSize} line${row.chunkSize > 1 ? "s" : ""} ←`}
                        className="h-5 w-5 flex items-center justify-center rounded text-brand-300 hover:text-accent hover:bg-accent/10 transition-colors"
                      >
                        <ArrowLeft className="h-3 w-3" />
                      </button>
                    )}
                  </div>

                  {/* Right column */}
                  <div className={`flex flex-1 min-w-0 overflow-hidden ${rightBg}`}>
                    <span className="w-10 shrink-0 text-right pr-2 text-brand-300 select-none border-r border-brand-50 leading-[22px]">
                      {row.kind !== "removed" ? row.rightNum : ""}
                    </span>
                    {row.kind !== "removed" ? (
                      <span
                        className="px-3 leading-[22px] text-brand-900 whitespace-pre"
                        dangerouslySetInnerHTML={{ __html: highlightLine(row.line) }}
                      />
                    ) : (
                      <span className="px-3 leading-[22px] text-transparent select-none whitespace-pre">&nbsp;</span>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}

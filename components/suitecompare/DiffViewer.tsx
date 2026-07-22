"use client";

import { useMemo, useState, useCallback } from "react";
import { diffLines } from "diff";
import { EnvironmentBadge } from "./EnvironmentBadge";
import {
  Copy,
  Check,
  ArrowRight,
  ArrowLeft,
  CheckCircle2,
  ChevronDown,
} from "lucide-react";

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

type Segment =
  | { type: "rows"; rows: ChunkRow[] }
  | { type: "collapse"; rows: ChunkRow[]; id: number };

const CONTEXT_LINES = 3;
const COLLAPSE_THRESHOLD = CONTEXT_LINES * 2 + 2;

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
        rows.push({ chunkIdx, kind: "unchanged", line, leftNum: leftNum++, rightNum: rightNum++, isFirstInChunk, chunkSize });
        unchanged++;
      }
    });
  });

  return { rows, added, removed, unchanged };
}

function buildSegments(rows: ChunkRow[]): Segment[] {
  const segs: Segment[] = [];
  let collapseId = 0;
  let i = 0;

  while (i < rows.length) {
    if (rows[i].kind === "unchanged") {
      let j = i;
      while (j < rows.length && rows[j].kind === "unchanged") j++;
      const block = rows.slice(i, j);

      if (block.length > COLLAPSE_THRESHOLD) {
        segs.push({ type: "rows", rows: block.slice(0, CONTEXT_LINES) });
        segs.push({
          type: "collapse",
          rows: block.slice(CONTEXT_LINES, block.length - CONTEXT_LINES),
          id: collapseId++,
        });
        segs.push({ type: "rows", rows: block.slice(block.length - CONTEXT_LINES) });
      } else {
        segs.push({ type: "rows", rows: block });
      }
      i = j;
    } else {
      let j = i;
      while (j < rows.length && rows[j].kind !== "unchanged") j++;
      segs.push({ type: "rows", rows: rows.slice(i, j) });
      i = j;
    }
  }

  return segs;
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

function DiffRow({
  row,
  chunkId,
  isActive,
  onApplyRight,
  onApplyLeft,
}: {
  row: ChunkRow;
  chunkId?: number;
  isActive?: boolean;
  onApplyRight?: (idx: number) => void;
  onApplyLeft?: (idx: number) => void;
}) {
  const showTransferRight = row.kind === "removed" && row.isFirstInChunk;
  const showTransferLeft = row.kind === "added" && row.isFirstInChunk;

  const leftBg =
    row.kind === "removed"
      ? isActive
        ? "bg-red-100 border-l-[3px] border-l-red-500"
        : "bg-red-50 border-l-2 border-l-red-400"
      : row.kind === "added"
      ? isActive
        ? "bg-emerald-50/50"
        : "bg-emerald-50/30"
      : "";
  const rightBg =
    row.kind === "added"
      ? isActive
        ? "bg-emerald-100 border-l-[3px] border-l-emerald-500"
        : "bg-emerald-50 border-l-2 border-l-emerald-400"
      : row.kind === "removed"
      ? isActive
        ? "bg-red-50/50"
        : "bg-red-50/30"
      : "";

  return (
    <div
      className="flex h-[22px]"
      data-diff-chunk={chunkId !== undefined ? chunkId : undefined}
    >
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
        {showTransferRight && onApplyRight && (
          <button
            onClick={() => onApplyRight(row.chunkIdx)}
            title={`Copy ${row.chunkSize} line${row.chunkSize > 1 ? "s" : ""} →`}
            className="h-5 w-5 flex items-center justify-center rounded text-brand-300 hover:text-accent hover:bg-accent/10 transition-colors"
          >
            <ArrowRight className="h-3 w-3" />
          </button>
        )}
        {showTransferLeft && onApplyLeft && (
          <button
            onClick={() => onApplyLeft(row.chunkIdx)}
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
  const [expandedSegs, setExpandedSegs] = useState<Set<number>>(new Set());
  const [activeDiff, setActiveDiff] = useState(0);

  const { changes, rows, added, removed, unchanged } = useMemo(() => {
    const changes = diffLines(leftContent, rightContent);
    const { rows, added, removed, unchanged } = buildRows(changes);
    return { changes, rows, added, removed, unchanged };
  }, [leftContent, rightContent]);

  const segments = useMemo(() => buildSegments(rows), [rows]);

  const diffChunks = useMemo(() => {
    const seen = new Set<number>();
    const result: number[] = [];
    rows.forEach((row) => {
      if (row.kind !== "unchanged" && row.isFirstInChunk && !seen.has(row.chunkIdx)) {
        seen.add(row.chunkIdx);
        result.push(row.chunkIdx);
      }
    });
    return result;
  }, [rows]);

  // The chunkIdx value of the currently focused diff block (for highlighting)
  const activeChunkValue = diffChunks.length > 0 ? diffChunks[activeDiff] : null;

  const applyToRight = useCallback(
    (chunkIdx: number) => {
      const newRight = changes
        .filter((c, i) => !c.removed || i === chunkIdx)
        .map((c) => c.value)
        .join("");
      setRightContent(newRight);
      setExpandedSegs(new Set());
    },
    [changes]
  );

  const applyToLeft = useCallback(
    (chunkIdx: number) => {
      const newLeft = changes
        .filter((c, i) => !c.added || i === chunkIdx)
        .map((c) => c.value)
        .join("");
      setLeftContent(newLeft);
      setExpandedSegs(new Set());
    },
    [changes]
  );

  const navigateDiff = useCallback(
    (delta: number) => {
      if (diffChunks.length === 0) return;
      const next = Math.max(0, Math.min(activeDiff + delta, diffChunks.length - 1));
      setActiveDiff(next);
      const el = document.querySelector(`[data-diff-chunk="${diffChunks[next]}"]`);
      el?.scrollIntoView({ behavior: "smooth", block: "center" });
    },
    [activeDiff, diffChunks]
  );

  const expandSeg = useCallback((id: number) => {
    setExpandedSegs((prev) => new Set([...prev, id]));
  }, []);

  const viewerHeaders = (
    <div className="flex border-b border-brand-100 bg-brand-50 divide-x divide-brand-100">
      <div className="flex-1 flex items-center justify-between gap-2 px-4 py-2.5 min-w-0">
        <div className="flex items-center gap-2 min-w-0">
          <EnvironmentBadge type={leftType} />
          <span className="text-brand-900 font-semibold text-xs truncate">{leftLabel}</span>
        </div>
        <CopyButton content={leftContent} side="left" />
      </div>
      <div className="w-10 shrink-0" />
      <div className="flex-1 flex items-center justify-between gap-2 px-4 py-2.5 min-w-0">
        <div className="flex items-center gap-2 min-w-0">
          <EnvironmentBadge type={rightType} />
          <span className="text-brand-900 font-semibold text-xs truncate">{rightLabel}</span>
        </div>
        <CopyButton content={rightContent} side="right" />
      </div>
    </div>
  );

  // Identical files state
  if (added === 0 && removed === 0) {
    return (
      <div className="flex flex-col gap-3">
        <div className="flex items-center gap-4 text-xs font-medium">
          <span className="text-brand-300">{unchanged} lines</span>
        </div>
        <div className="border border-brand-100 rounded-xl overflow-hidden text-xs font-mono">
          {viewerHeaders}
          <div className="py-12 flex flex-col items-center justify-center gap-3 text-center">
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-emerald-50">
              <CheckCircle2 className="h-5 w-5 text-emerald-500" />
            </div>
            <div>
              <p className="text-sm font-semibold text-brand-900">Files are identical</p>
              <p className="mt-1 text-xs text-brand-400">
                No differences found between {leftLabel} and {rightLabel}.
              </p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-3">
      {/* Summary + navigation — sticky so nav stays visible while scrolling the diff */}
      <div className="sticky top-14 md:top-4 z-10 flex items-center justify-between flex-wrap gap-2 bg-white/90 backdrop-blur-sm rounded-xl border border-brand-100 shadow-sm px-3 py-2">
        <div className="flex items-center gap-4 text-xs font-medium">
          <span className="text-emerald-600">+{added} added</span>
          <span className="text-red-500">−{removed} removed</span>
          <span className="text-brand-300">{unchanged} unchanged</span>
        </div>
        {diffChunks.length > 1 && (
          <div className="flex items-center gap-1.5 text-xs">
            <span className="text-brand-400 mr-1">
              {activeDiff + 1} / {diffChunks.length} changes
            </span>
            <button
              onClick={() => navigateDiff(-1)}
              disabled={activeDiff === 0}
              className="flex items-center gap-0.5 px-2 py-1 rounded-md border border-brand-100 text-brand-500 hover:text-brand-900 hover:bg-brand-50 disabled:opacity-40 disabled:cursor-not-allowed transition-colors font-medium"
            >
              <ArrowLeft className="h-3 w-3" />
              Prev
            </button>
            <button
              onClick={() => navigateDiff(1)}
              disabled={activeDiff === diffChunks.length - 1}
              className="flex items-center gap-0.5 px-2 py-1 rounded-md border border-brand-100 text-brand-500 hover:text-brand-900 hover:bg-brand-50 disabled:opacity-40 disabled:cursor-not-allowed transition-colors font-medium"
            >
              Next
              <ArrowRight className="h-3 w-3" />
            </button>
          </div>
        )}
      </div>

      {/* Viewer */}
      <div className="border border-brand-100 rounded-xl overflow-hidden text-xs font-mono">
        {viewerHeaders}

        <div className="overflow-x-auto">
          <div style={{ minWidth: "720px" }}>
            {segments.map((seg, segIdx) => {
              if (seg.type === "collapse") {
                if (expandedSegs.has(seg.id)) {
                  return seg.rows.map((row, i) => (
                    <DiffRow
                      key={`exp-${seg.id}-${i}`}
                      row={row}
                      isActive={row.kind !== "unchanged" && row.chunkIdx === activeChunkValue}
                      onApplyRight={applyToRight}
                      onApplyLeft={applyToLeft}
                    />
                  ));
                }
                return (
                  <button
                    key={`collapse-${segIdx}`}
                    onClick={() => expandSeg(seg.id)}
                    className="flex w-full h-[26px] items-center bg-brand-50/60 hover:bg-brand-100/60 border-y border-brand-100 transition-colors group"
                  >
                    {/* Left spacer matching line number width */}
                    <div className="w-10 shrink-0 border-r border-brand-50" />
                    <div className="flex flex-1 items-center justify-center gap-1.5 text-brand-400 group-hover:text-brand-700 transition-colors">
                      <ChevronDown className="h-3 w-3" />
                      <span className="text-[10px] font-medium">{seg.rows.length} unchanged lines</span>
                      <ChevronDown className="h-3 w-3" />
                    </div>
                    {/* Gutter spacer */}
                    <div className="w-10 shrink-0 border-x border-brand-100" />
                    {/* Right spacer */}
                    <div className="flex flex-1 items-center justify-center">
                      <span className="text-[10px] text-brand-300 group-hover:text-brand-500 transition-colors">
                        click to expand
                      </span>
                    </div>
                  </button>
                );
              }

              // type === "rows"
              return seg.rows.map((row, i) => {
                const isChunkStart = row.kind !== "unchanged" && row.isFirstInChunk;
                return (
                  <DiffRow
                    key={`row-${segIdx}-${i}`}
                    row={row}
                    chunkId={isChunkStart ? row.chunkIdx : undefined}
                    isActive={row.kind !== "unchanged" && row.chunkIdx === activeChunkValue}
                    onApplyRight={applyToRight}
                    onApplyLeft={applyToLeft}
                  />
                );
              });
            })}
          </div>
        </div>
      </div>
    </div>
  );
}

"use client";

import { useEffect, useRef, useState } from "react";

const POLL_INTERVAL = 30_000;
const STORAGE_KEY = "admin-notif-enabled";

function playVisitorSound(ctx: AudioContext) {
  const osc = ctx.createOscillator();
  const gain = ctx.createGain();
  osc.connect(gain);
  gain.connect(ctx.destination);
  osc.type = "sine";
  osc.frequency.setValueAtTime(880, ctx.currentTime);
  gain.gain.setValueAtTime(0, ctx.currentTime);
  gain.gain.linearRampToValueAtTime(0.12, ctx.currentTime + 0.02);
  gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.4);
  osc.start(ctx.currentTime);
  osc.stop(ctx.currentTime + 0.4);
}

function playLeadSound(ctx: AudioContext) {
  const now = ctx.currentTime;
  [
    { freq: 660, start: now },
    { freq: 880, start: now + 0.2 },
  ].forEach(({ freq, start }) => {
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.connect(gain);
    gain.connect(ctx.destination);
    osc.type = "sine";
    osc.frequency.setValueAtTime(freq, start);
    gain.gain.setValueAtTime(0, start);
    gain.gain.linearRampToValueAtTime(0.25, start + 0.02);
    gain.gain.exponentialRampToValueAtTime(0.001, start + 0.6);
    osc.start(start);
    osc.stop(start + 0.6);
  });
}

export function AdminNotifications() {
  const audioCtxRef = useRef<AudioContext | null>(null);
  const leadsRef = useRef<number>(Date.now());
  const visitorsRef = useRef<number>(Date.now());
  const [enabled, setEnabled] = useState(false);
  const [mounted, setMounted] = useState(false);

  // Restore preference from localStorage on mount
  useEffect(() => {
    setMounted(true);
    try {
      if (localStorage.getItem(STORAGE_KEY) === "true") {
        setEnabled(true);
      }
    } catch {}
  }, []);

  function getOrCreateCtx(): AudioContext | null {
    if (typeof window === "undefined") return null;
    if (!audioCtxRef.current) {
      audioCtxRef.current = new window.AudioContext();
    }
    return audioCtxRef.current;
  }

  function toggle() {
    const next = !enabled;
    setEnabled(next);
    try {
      localStorage.setItem(STORAGE_KEY, String(next));
    } catch {}
    if (next) {
      // Create context on first explicit enable to satisfy autoplay policy
      getOrCreateCtx();
    }
  }

  useEffect(() => {
    if (!enabled) return;

    async function poll() {
      try {
        const res = await fetch(
          `/api/admin/new-counts?leadsSince=${leadsRef.current}&visitorsSince=${visitorsRef.current}`
        );
        if (!res.ok) return;
        const { newLeads, newVisitors } = await res.json();
        const now = Date.now();

        const ctx = getOrCreateCtx();
        if (ctx) {
          // Resume AudioContext if browser suspended it (autoplay policy)
          if (ctx.state === "suspended") {
            await ctx.resume().catch(() => {});
          }
          if (newLeads > 0) {
            playLeadSound(ctx);
          } else if (newVisitors > 0) {
            playVisitorSound(ctx);
          }
        }

        leadsRef.current = now;
        visitorsRef.current = now;
      } catch {
        // ignore network errors
      }
    }

    const id = setInterval(poll, POLL_INTERVAL);
    return () => clearInterval(id);
  }, [enabled]);

  if (!mounted) return null;

  return (
    <button
      type="button"
      title={enabled ? "Notifications on — click to mute" : "Enable sound notifications"}
      onClick={toggle}
      className={`flex items-center gap-1.5 rounded-full px-2 py-1 text-xs transition-colors ${
        enabled
          ? "text-emerald-700 bg-emerald-50 hover:bg-emerald-100"
          : "text-brand-400 hover:text-brand-700 hover:bg-brand-50"
      }`}
    >
      {enabled ? (
        <>
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
            <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500" />
          </span>
          Notif on
        </>
      ) : (
        <>
          <span className="h-2 w-2 rounded-full bg-brand-200" />
          Notif off
        </>
      )}
    </button>
  );
}

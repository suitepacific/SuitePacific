"use client";

import { useEffect, useRef, useState } from "react";

const POLL_INTERVAL = 30_000; // 30 seconds

function playVisitorSound(ctx: AudioContext) {
  // Light chime: short sine wave at 880 Hz
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
  // Two-tone chime: 660 Hz then 880 Hz
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

  // Initialise AudioContext on first user gesture to satisfy autoplay policy
  function enable() {
    if (!audioCtxRef.current) {
      audioCtxRef.current = new AudioContext();
    }
    setEnabled(true);
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

        if (newLeads > 0 && audioCtxRef.current) {
          playLeadSound(audioCtxRef.current);
        }
        if (newVisitors > 0 && audioCtxRef.current) {
          // Only play visitor sound if no lead sound is also firing
          if (newLeads === 0) playVisitorSound(audioCtxRef.current);
        }

        // Advance watermarks so we don't re-fire for the same records
        leadsRef.current = now;
        visitorsRef.current = now;
      } catch {
        // Silently ignore network errors
      }
    }

    const id = setInterval(poll, POLL_INTERVAL);
    return () => clearInterval(id);
  }, [enabled]);

  if (enabled) {
    return (
      <button
        type="button"
        title="Notifications on"
        onClick={() => setEnabled(false)}
        className="flex items-center gap-1.5 rounded-full px-2 py-1 text-xs text-emerald-700 bg-emerald-50 hover:bg-emerald-100 transition-colors"
      >
        <span className="relative flex h-2 w-2">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
          <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500" />
        </span>
        Notif on
      </button>
    );
  }

  return (
    <button
      type="button"
      title="Enable sound notifications"
      onClick={enable}
      className="flex items-center gap-1.5 rounded-full px-2 py-1 text-xs text-brand-400 hover:text-brand-700 hover:bg-brand-50 transition-colors"
    >
      <span className="h-2 w-2 rounded-full bg-brand-200" />
      Notif off
    </button>
  );
}

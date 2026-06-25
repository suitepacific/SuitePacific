"use client";

import { motion } from "framer-motion";
import { ArrowUpRight, LayoutDashboard, CheckCircle2 } from "lucide-react";
import { KPI_STATS } from "@/lib/content";
import { GradientBlob } from "./GradientBlob";

const CHART_PATH =
  "M0,70 C20,65 35,40 55,45 C75,50 90,20 115,25 C140,30 155,55 180,40 C205,25 220,10 245,15 C265,19 275,8 280,5";
const CHART_AREA = `${CHART_PATH} L280,100 L0,100 Z`;

const MODULE_BARS = [
  { label: "Order Management", value: 80 },
  { label: "Billing", value: 62 },
  { label: "Fulfillment", value: 45 },
];

export function DashboardMockup() {
  return (
    <div className="relative w-full max-w-lg mx-auto">
      <GradientBlob className="absolute -top-24 -right-16 w-[420px] h-[420px] -z-10" />

      <motion.div
        initial={{ opacity: 0, y: 24, rotate: -1 }}
        animate={{ opacity: 1, y: 0, rotate: -1 }}
        transition={{ duration: 0.7, ease: "easeOut" }}
        className="glass rounded-2xl shadow-soft-lg p-5 sm:p-6"
      >
        <div className="flex items-center justify-between mb-5">
          <div className="flex items-center gap-2">
            <span className="h-2.5 w-2.5 rounded-full bg-red-300" />
            <span className="h-2.5 w-2.5 rounded-full bg-yellow-300" />
            <span className="h-2.5 w-2.5 rounded-full bg-green-300" />
          </div>
          <div className="flex items-center gap-1.5 text-xs font-medium text-brand-400">
            <LayoutDashboard className="h-3.5 w-3.5" />
            NetSuite Dashboard
          </div>
        </div>

        <div className="grid grid-cols-2 gap-3 mb-5">
          {KPI_STATS.map((stat) => (
            <div key={stat.label} className="rounded-xl bg-white/70 border border-brand-50 p-3">
              <div className="flex items-center justify-between">
                <stat.icon className="h-4 w-4 text-brand-400" strokeWidth={1.75} />
                <span
                  className={`flex items-center text-[11px] font-medium ${
                    stat.positive ? "text-emerald-600" : "text-red-500"
                  }`}
                >
                  <ArrowUpRight className="h-3 w-3" />
                  {stat.delta}
                </span>
              </div>
              <div className="mt-2 text-lg font-semibold text-brand-900">{stat.value}</div>
              <div className="text-[11px] text-brand-400">{stat.label}</div>
            </div>
          ))}
        </div>

        <div className="rounded-xl bg-white/70 border border-brand-50 p-4 mb-4">
          <svg viewBox="0 0 280 100" className="w-full h-20" preserveAspectRatio="none">
            <defs>
              <linearGradient id="chart-fill" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#4f7fff" stopOpacity="0.35" />
                <stop offset="100%" stopColor="#4f7fff" stopOpacity="0" />
              </linearGradient>
            </defs>
            <motion.path
              d={CHART_AREA}
              fill="url(#chart-fill)"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.6, duration: 0.4 }}
            />
            <motion.path
              d={CHART_PATH}
              fill="none"
              stroke="#0b1f4d"
              strokeWidth="2.5"
              strokeLinecap="round"
              initial={{ pathLength: 0 }}
              animate={{ pathLength: 1 }}
              transition={{ duration: 1.1, ease: "easeInOut", delay: 0.3 }}
            />
          </svg>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div className="rounded-xl bg-white/70 border border-brand-50 p-3 space-y-2">
            {MODULE_BARS.map((bar) => (
              <div key={bar.label}>
                <div className="flex justify-between text-[10px] text-brand-400 mb-1">
                  <span>{bar.label}</span>
                  <span>{bar.value}%</span>
                </div>
                <div className="h-1.5 rounded-full bg-brand-50">
                  <div
                    className="h-1.5 rounded-full bg-accent"
                    style={{ width: `${bar.value}%` }}
                  />
                </div>
              </div>
            ))}
          </div>

          <div className="rounded-xl bg-white/70 border border-brand-50 p-3 flex flex-col items-center justify-center">
            <svg viewBox="0 0 64 64" className="h-14 w-14 -rotate-90">
              <circle cx="32" cy="32" r="26" fill="none" stroke="#eef2fb" strokeWidth="8" />
              <circle
                cx="32"
                cy="32"
                r="26"
                fill="none"
                stroke="#4f7fff"
                strokeWidth="8"
                strokeDasharray={`${2 * Math.PI * 26 * 0.78} ${2 * Math.PI * 26}`}
                strokeLinecap="round"
              />
            </svg>
            <span className="mt-1 text-[11px] font-medium text-brand-400">78% Resolved</span>
          </div>
        </div>
      </motion.div>

      <motion.div
        animate={{ y: [0, -8, 0] }}
        transition={{ repeat: Infinity, duration: 4, ease: "easeInOut" }}
        className="absolute -left-6 -bottom-6 glass rounded-xl shadow-soft px-3 py-2 flex items-center gap-2"
      >
        <CheckCircle2 className="h-4 w-4 text-emerald-600" />
        <span className="text-xs font-medium text-brand-700">Workflow Automated</span>
      </motion.div>

      <motion.div
        animate={{ y: [0, 8, 0] }}
        transition={{ repeat: Infinity, duration: 5, ease: "easeInOut" }}
        className="absolute -right-4 top-10 glass rounded-xl shadow-soft px-3 py-2 flex items-center gap-2"
      >
        <span className="text-xs font-medium text-brand-700">Ticket #4821 Resolved</span>
      </motion.div>
    </div>
  );
}
